/*
jKiosk
*/

(function(){
    var preservedConsoleLog = console.log;

    console.log = function() {
        preservedConsoleLog.apply(console, arguments);
		jkiosk.javaScriptConsole(arguments);
    }  	
})();

(function (jkiosk) {
	"use strict";
	var callbacks = {};
	callbacks["internalPlatformReady"] = platformReady;
		
	var timeouts = [];
	
	var socket = new WebSocket('ws://localhost:8081');
	socket.onmessage = socketMessage;
	socket.onerror = socketError;
	socket.onclose = socketError;
	socket.onopen = socketOpen;
	
	var isClosing = false;
	
	var heartbeatInterval = setInterval(heartbeat, 1000 * 10);
	
	function heartbeat() {
		socket.send(JSON.stringify({method: "socketHeartbeat"}));
	}
	
	function platformReady(message) {
		if (message.isReady) {
			var onPlatformReady = callbacks["onPlatformReady"];
			if (onPlatformReady) {
				window.onerror = function(message, url, lineNumber) { 				
				  jkiosk.javaScriptError(arguments);
				  return false;
				};				
				onPlatformReady();
			}		
		}
		else {
			setTimeout(function() {
				socket.send(JSON.stringify({method: "platformReady"}));
			}, 1000);			
		}
	}	
	
	function socketOpen(evt) {
		$.ajax({
			url: "manifest.json",
			success: function(data, textStatus, jqXHR) {
				var parsed = JSON.parse(data);
				parsed["method"] = "manifest";
				socket.send(JSON.stringify(parsed));
			}
		});		
		
		socket.send(JSON.stringify({method: "platformReady"}));
	}
	
	function socketError(evt) {
		if (!isClosing) {
			// Continuously attempt reconnect
			socket = new WebSocket('ws://localhost:8081');
			socket.onclose = socketError;
			socket.onmessage = socketMessage;
			socket.onopen = socketOpen;
		}
	}
	
	function socketMessage(message) {
		var response = JSON.parse(message.data);
		var callback = callbacks[response.method];
		if (callback) {
			callback(response);
		}	
	}
	
	// Not normally called by apps. Used to help switch between mock and live scripts.
	jkiosk.close = function() {
		isClosing = true;
		clearInterval(heartbeatInterval);
		socket.close();
	}
	
	// Configuration
	jkiosk.getKioskConfiguration = function(configurationResultCallback) { 
		callbacks["kioskConfigurationResult"] = configurationResultCallback;
		
		socket.send(JSON.stringify({method: "getKioskConfiguration"}));
	}
	
	// higi API
	jkiosk.higiLogin = function(higiLoginResultCallback) {
		callbacks["higiLoginResult"] = higiLoginResultCallback;
		
		socket.send(JSON.stringify({method: "higiLogin"}));	
	}
	
	jkiosk.getAvailableModules = function(availableModulesCallback) {
		var response = {
			method: "availableModules",
			"Blood Pressure": true,
			"Weight Scale": true,
			"Body Composition": true
		};
		
		availableModulesCallback(response);	
	};
	
	// Life Cycle
	jkiosk.onPlatformReady = function(onPlatformReadyCallback) {
		callbacks["onPlatformReady"] = onPlatformReadyCallback;
	};
	
	jkiosk.startSession = function() {
		socket.send(JSON.stringify({method: "startSession"}));
	};
	
	jkiosk.endSession = function() {
		socket.send(JSON.stringify({method: "endSession"}));
		sessionStats = { };
	};
	
	jkiosk.startScreen = function(theScreenID) {
		try {
			socket.send(JSON.stringify({method: "startScreen", screenID: theScreenID}));
		}
		catch (err) {
			// No-op, socket probably not ready
		}	
	};
	
	// Ads
	jkiosk.getAd = function(callback, adSpotId, state) {
		callbacks["getAdResult"] = callback;
		socket.send(JSON.stringify({method: "getAd", adSpot: adSpotId, appState: state}));
	};	
	
	jkiosk.getAdConcurrent = function(callback, adSpotId, state) {
		callbacks["getAdResult-" + adSpotId] = callback;
		socket.send(JSON.stringify({method: "getAdConcurrent", adSpot: adSpotId, appState: state}));
	};		
	
	jkiosk.sessionAdPlayed = function(adEvent) {
		socket.send(JSON.stringify({method: "sessionAdPlayed", playNotificationEvent: adEvent.playNotificationEvent	}));
	};	
	
	// Cursor
	jkiosk.hideCursor = function() {
		socket.send(JSON.stringify({method: "hideCursor"}));
	};
	
	jkiosk.showCursor = function() {
		socket.send(JSON.stringify({method: "showCursor"}));
	};	
	
	// Crypto
	jkiosk.encrypt = function(text, callback) {
		callbacks["encryptResult"] = callback;
		socket.send(JSON.stringify({method: "encrypt", plainText: text}));
	};	
	
	// NOT cryptographically secure. Used to prevent reverse engineering of QR code.
	jkiosk.obfuscateCheckin = function(checkin, callback) {
		callbacks["obfuscateCheckinResult"] = callback;
		checkin.method = "obfuscateCheckin";
		socket.send(JSON.stringify(checkin));
	}

	// API Proxy
	jkiosk.apiProxy = function(url, method, body, onSuccess, onFailure, headers) {
		callbacks["apiProxyResult+" + url] = function(result) {
			if (result.success) {
				if (result.response) {
					onSuccess(JSON.parse(result.response));
				}
				else {
					onSuccess();
				}
			}
			else {
				onFailure(result);
			}
		};
		socket.send(JSON.stringify({method: "apiProxy", url: url, verb: method, body: body, attempts: 3, attemptTimeoutSeconds: 15, headers: headers}));
	};
	
	// API Status
	jkiosk.apiStatus = function(callback) {
		callbacks["apiStatusResult"] = callback;
		socket.send(JSON.stringify({method: "getApiStatus"}));
	};	
	
	// Analytics
	jkiosk.logEvent = function(in_sessionId, in_senderId, in_eventCategory, in_eventName, in_userId) {
		socket.send(JSON.stringify({
			method: "recordUiEvent",
			time: new Date().getTime(),
			sessionId: in_sessionId,
			senderId: in_senderId,
			eventCategory: in_eventCategory,
			eventName: in_eventName,
			userId: in_userId
		}));
	};	
	
	jkiosk.logClick = function(theSenderID) {
		socket.send(JSON.stringify({method: "log", level: "Info", senderID: theSenderID, action: "Click", details: theSenderID}));
	};
	
	// Not called directly from app
	jkiosk.javaScriptConsole = function(logInfo) {
		socket.send(JSON.stringify({method: "javaScriptConsole", logData: logInfo}));
	};

	// Not called directly from app
	jkiosk.javaScriptError = function(logInfo) {
		socket.send(JSON.stringify({method: "javaScriptError", logData: logInfo}));
	};		
	
	jkiosk.logInfo = function(theSenderID,theAction,theDetails) {
		socket.send(JSON.stringify({method: "log", level: "Info", senderID: theSenderID, action: theAction, details: theDetails}));
	};
	
	jkiosk.logWarn = function(theSenderID,theAction,theDetails) {
		socket.send(JSON.stringify({method: "log", level: "SystemWarn", senderID: theSenderID, action: theAction, details: theDetails}));
	};	
	
	jkiosk.logError = function(theSenderID,theAction,theDetails) {
		socket.send(JSON.stringify({method: "log", level: "Error", senderID: theSenderID, action: theAction, details: theDetails}));
	};
	
	jkiosk.logFatal = function(theSenderID,theAction,theDetails) {
		socket.send(JSON.stringify({method: "log", level: "Fatal", senderID: theSenderID, action: theAction, details: theDetails}));
	};
	
	// Queued HTTP
	jkiosk.queueHttp = function(httpRequest) {
		socket.send(JSON.stringify({method: "queueHttp", request: httpRequest}));
	};
	
	jkiosk.memoryQueueHttp = function(httpRequest, completeCallack, queuedCallback) {
		callbacks["memoryHttpQueued"] = completeCallack;
		callbacks["memoryHttpCompleted"] = queuedCallback;
		socket.send(JSON.stringify({method: "memoryQueueHttp", request: httpRequest}));
	};
	
	// Audio
	jkiosk.mute = function() {
		socket.send(JSON.stringify({method: "mute"}));
	};
	
	jkiosk.unmute = function() {
		socket.send(JSON.stringify({method: "unmute"}));
	};
	
	jkiosk.setVolume = function(volumeLevel) {
		socket.send(JSON.stringify({method: "setVolume", level: volumeLevel}));
	};
	
	jkiosk.getVolume = function(volumeResult) {
		callbacks["getVolumeResult"] = volumeResult;
		socket.send(JSON.stringify({method: "getVolume"}));
	};	
	
	// Printer
	jkiosk.print = function(htmlContent, onJobComplete, onJobFailed) {
		callbacks["printerJobComplete"] = onJobComplete;
		callbacks["printerJobDidNotComplete"] = onJobFailed;
		socket.send(JSON.stringify({method: "print", html: htmlContent}));
	};		
	
	jkiosk.getPrinterStatus = function(onStatusResult) {
		callbacks["printerStatusResult"] = onStatusResult;
		
		socket.send(JSON.stringify({method: "getPrinterStatus"}));
	};
	
		jkiosk.getPrinterSettings = function(onPrinterResult) {
		callbacks["GetPrinterSettings"] = onPrinterResult;
		socket.send(JSON.stringify({method: "GetPrinterSettings"}));
	};

	// Body composition
	jkiosk.startBodyComposition = function (birthDate, heightCm, weightKg, isMale, activityLevel, 
											handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {
		var t = setTimeout(function() { handsDetectedCallback({
			method: "bodyCompHandsDetected"
			}) }, 2000);		
		var t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "20",
			}) }, 2500);
		var t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "40",
			}) }, 3000);
		var t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "60",
			}) }, 3500);
		var t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "80",
			}) }, 4000);				
		var t = setTimeout(function() { testResultCallback({
			method: "bodyCompResult",
			hydrationPct: 3.5,
			bodyFatPct: 20.3,
			bmi: 23.2,
			leanMassKg: 40.29,
			leanMassLb: 88.83,
			hardStopTriggered: false,
			ohms : 123
			}) }, 4500);	

		/*var t = setTimeout(function() { handsDetectedCallback({
			method: "bodyCompTimeout"
			}) }, 10000);*/			
	};	
	
	// Start button
	jkiosk.monitorStartButton = function (buttonCallback) {	
		//var t = setTimeout(function() { buttonCallback({
		//	method: "startButtonPressed"
		//	}) }, 2000);
		$( "body" ).keypress(function( event ) {

			if (event.which == 122) {
				console.log(event.which + "was pressed. simulating start button pressed.");
				event.preventDefault();
				var t = setTimeout(function() { buttonCallback({
					method: "startButtonPressed"
					}) }, 2000);
			}
		});	
	};		
	
	// Card Swipe
	jkiosk.startCardSwipe = function(onCardSwipeResult, onCardSwipeError) {
		callbacks["cardSwipeResult"] = onCardSwipeResult;
		callbacks["cardSwipeError"] = onCardSwipeError;
	
		socket.send(JSON.stringify({method: "startCardSwipe"}));
	};
	
	jkiosk.stopCardSwipe = function() {
		socket.send(JSON.stringify({method: "stopCardSwipe"}));
	};	
	
	jkiosk.getCardSwipeStatus = function(onStatusCallback) {
		callbacks["cardSwipeStatusResult"] = onStatusCallback;
	
		socket.send(JSON.stringify({method: "getCardSwipeStatus"}));
	};
	
	// BP
	jkiosk.startBP = function(onPressureChangeCallback, onResultCallback, onMeasurementErrorCallback) {
		var t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "10"
			}) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "90"
			}) }, 2000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "160"
			}) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "140"
			}) }, 4000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "70"
			}) }, 5000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "30"
			}) }, 6000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange", 
			pressure: "10"
			}) }, 7000);
		timeouts.push(t);
		
		t = setTimeout(function() { onResultCallback({
			method: "bpResult", 
			systolic: "123", 
			diastolic: "82", 
			pulse: "75"
			}) }, 8000);
		timeouts.push(t);
	};
	
	jkiosk.stopBP = function() {
		socket.send(JSON.stringify({method: "stopBP"}));
	};
	
	jkiosk.getBPStatus = function(onStatusCallback) {
		onStatusCallback({method: "bpStatus", isAvailable: true});
	};
	
	// Pulse Oximeter
	jkiosk.startPulseOximeter = function(onResultCallback) {
		callbacks["pulseOximeterResult"] = onResultCallback;
		
		socket.send(JSON.stringify({method: "startPulseOximeter"}));
	};
	
	jkiosk.stopPulseOximeter = function() {
		socket.send(JSON.stringify({method: "stopPulseOximeter"}));
	}
	
	jkiosk.getPulseOximeterStatus = function(onStatusCallback) {
		callbacks["pulseOximeterStatus"] = onStatusCallback;
		
		socket.send(JSON.stringify({method: "getPulseOximeterStatus"}));
	}
	
	/************************************
		Weight Scale
	************************************/
	/*
		Weight change callback occurs continuous once started, result callback once the
		user has sat still long enough to get a reading.
		
		If there is no weight on the scale, you will receive 0's on the weightChangeCallback
		and never get called on the onResultCallback. Clients are advised to set a timeout
		that can cancel the weight operation (call stopWeightScale).
	
		onWeightChangeCallback will fire multiple times per start call. onResultCallback will
		only fire once.
	
		Last changed: 0.1
	*/
	jkiosk.startWeightScale = function(onWeightChangeCallback, onResultCallback) {
		var t = setTimeout(function() { onWeightChangeCallback(JSON.parse('{"method": "weightScaleChange", "weight": "152", "unit": "lbs"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onWeightChangeCallback(JSON.parse('{"method": "weightScaleChange", "weight": "149", "unit": "lbs"}')) }, 2000);
		timeouts.push(t);
		t = setTimeout(function() { onWeightChangeCallback(JSON.parse('{"method": "weightScaleChange", "weight": "150", "unit": "lbs"}')) }, 3000);
		timeouts.push(t);
		
		t = setTimeout(function() { onResultCallback(JSON.parse('{"method": "weightScaleResult", "weight": "150", "unit": "lbs"}')) }, 4000);
		timeouts.push(t);
	};
	
	/*
		Device is normally configured to stop automatically when it gets a result.
		Last changed: 0.1
	*/	
	jkiosk.stopWeightScale = function() {
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}
	
	/*
		onStatusCallback will only fire once per call.
	
		Last changed: 0.2 [name change, status sent once instead of continuous, return fields changed]
	*/
	jkiosk.getWeightScaleStatus = function(onStatusCallback) {
		onStatusCallback({method: "weightScaleStatus", isAvailable: true});
	}
	
	/*
		The callback will be invoked when the weight scale indicates a user
		has sat down. 
		
		onHasWeightCallback can be fired multiple times.
		
		Last changed: 0.5 [new]
	*/	
	jkiosk.onHasWeight = function(onHasWeightCallback) {
		console.log("onHasWeight called");
		
		//var t = setTimeout(function() { onHasWeightCallback() }, 3000);
		//timeouts.push(t);
	};
	
	/*
		The callback will be invoked when the weight scale indicates a user
		has stood up.
		
		onNoWeightCallback can be fired multiple times.
		
		Last changed: 0.5 [new]
	*/		
	jkiosk.onNoWeight = function(onNoWeightCallback) {
		console.log("onNoWeight called");
		
		//var t = setTimeout(function() { onNoWeightCallback() }, 7000);
		//timeouts.push(t);
	};
	
	/*
		Queries once for whether or not there is weight on the scale.
		
		getHasWeightCallback is only fired ONCE per call to this method. It will
		contian the attribute: hasWeight (boolean).
		
		Last changed: 0.7 [new]
	*/	
	jkiosk.checkWeight = function(checkWeightCallback) {
		checkWeightCallback({hasWeight: true});
	};
	
	jkiosk.feetOnBar = function(callback) {
		callback({feetOnBar: false});
	};	
	
	// Seat door
	jkiosk.getSeatDoorPosition = function(onSeatDoorResult) {	
		callbacks["seatDoorPositionResult"] = onSeatDoorResult;
		
		socket.send(JSON.stringify({method: "getSeatDoorPosition"}));
	}		

	jkiosk.onSeatDoorChanged = function(onSeatDoorOpened, onSeatDoorClosed) {
		callbacks["onSeatDoorOpened"] = onSeatDoorOpened;
		callbacks["onSeatDoorClosed"] = onSeatDoorClosed;
	};	
	
	jkiosk.onSeatDoorButtonPressed = function(buttonPressedCallback) {
		callbacks["onSeatDoorButtonPressed"] = buttonPressedCallback;
	};
	
	// Barcode Scanner
	jkiosk.startBarcodeScanner = function(onScannerResult) {	
		callbacks["codeScanned"] = onScannerResult;
	};

	// RFID
	// This is implemented almost entirely in javascript since the RFID reader
	// is emulating a keyboard. This assumes the RFID reader emits an Enter (code 13)
	// key press at the end of the tag read. There is still some communication over
	// web socket for things like recording Cycle, see comments in platform code.
	var rfidArmed = false;
	var rfidTagInProgress = [];
	document.onkeypress = function (e) {
		if (rfidArmed) {
			if (e.keyCode === 13) { // Enter key. This is what RFID uses to indicate end of tag ID.
				var newTag = rfidTagInProgress.join("");
				callbacks["RFIDResult"]({tagId: newTag});
				rfidArmed = false;
				rfidTagInProgress.length = 0;
				socket.send(JSON.stringify({method: "RFIDCycle"}));
			}		
			else {
				rfidTagInProgress.push(String.fromCharCode(e.charCode));
			}
		}
	};
	
	jkiosk.startRFID = function(onRFIDResult) {	
		callbacks["RFIDResult"] = onRFIDResult;
		rfidArmed = true;
	}		

	jkiosk.stopRFID = function() {
		rfidArmed = false;
		rfidTagInProgress.length = 0;
	}	
	
	// Generic Statistics
	var sessionStats = { };
	jkiosk.statisticPassPerSession = function(key, continuation) {
		if (!sessionStats[key]) {
			sessionStats[key] = 'pass';
			jkiosk.statisticPass(key, continuation);
		}
		else if (continuation) {
			continuation();
		}
	};
	jkiosk.statisticFailPerSession = function(key, continuation) {
		if (!sessionStats[key]) {
			sessionStats[key] = 'fail';
			jkiosk.statisticFail(key, continuation);
		}
		else if (continuation) {
			continuation();
		}
	};
	jkiosk.statisticPass = function(key, continuation) {
		socket.send(JSON.stringify({method: "statisticPass", statKey: key}));
		if (continuation) {
			continuation();
		}
	};	
	jkiosk.statisticFail = function(key, continuation) {
		socket.send(JSON.stringify({method: "statisticFail", statKey: key}));
		if (continuation) {
			continuation();
		}
	};
	
	// Bluetooth
	jkiosk.watchForBluetooth = function(connectionRequestCallback) {
		console.log("watchForBluetooth method called");
	};
	
	jkiosk.allowBluetoothConnection = function() {
		console.log("allowBluetoothConnection method called");
	};
	
	jkiosk.rejectBluetoothConnection = function() {
		console.log("rejectBluetoothConnection method called");
	};

}(this.jkiosk = this.jkiosk || {}));