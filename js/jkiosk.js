/*
jKiosk
*/

//doesConnectionExist();
/*var online;
// check whether this function works (online only)
try {
  var x = google.maps.MapTypeId.TERRAIN;
  online = true;
  var kioskStatus = {apiStatus: "Online"};
} catch (e) {
  online = false;
  var kioskStatus = {apiStatus: "Offline"};
}
console.log(online);
*/

//var kioskStatus = {apiStatus: "Offline"};

/*
function doesConnectionExist() {
    var xhr = new XMLHttpRequest();
    var file = "https://www.indiahealthlink.com/blank.png";
    var randomNum = Math.round(Math.random() * 10000);

    xhr.open('HEAD', file + "?rand=" + randomNum, true);
    xhr.send();

    xhr.addEventListener("readystatechange", processRequest, false);

    function processRequest(e) {
      if (xhr.readyState == 4) {
        if (xhr.status >= 200 && xhr.status < 304) {
      kioskStatus = {apiStatus: "Online"};

        } else {
       kioskStatus = {apiStatus: "Offline"};
        }
      }
    }
}
/*
(function(){
    var preservedConsoleLog = console.log;

    console.log = function() {
        preservedConsoleLog.apply(console, arguments);
		jkiosk.javaScriptConsole(arguments);
    }
})();*/

(function (jkiosk) {
	"use strict";
	var callbacks = {};
	callbacks["bpPressureChange"] = validatePressure;
	callbacks["internalPlatformReady"] = platformReady;

	// Created in onPlatformReady
	var socket = {};

	var isClosing = false;

	var bpPressureCallback;

	var heartbeatInterval = setInterval(heartbeat, 1000 * 10);

	function heartbeat() {
		socket.send(JSON.stringify({method: "socketHeartbeat"}));
	}

	/*function platformReady(message) { // old working code
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
	}	*/

	function platformReady(message) {// wrote by sumithra mam on 5th May 2018 for loading screen time reduce.
		console.log("Inside platformReady");

		if (message.isReady) {
			console.log("isReady true");

			var onPlatformReady = callbacks["onPlatformReady"];
			if (onPlatformReady) {

				// Do not wire up console logs or window errors until platform ready. Otherwise,
				// web socket handshake can be broken if UI writes to console log during startup.
				window.onerror = function(message, url, lineNumber) {
				  jkiosk.javaScriptError(arguments);
				  return false;
				};

				var preservedConsoleLog = console.log;

				console.log = function() {
					preservedConsoleLog.apply(console, arguments);
					jkiosk.javaScriptConsole(arguments);
				}

				console.log("Web socket ready");

				onPlatformReady();
			}
			else {
				console.log("onPlatformReady is not registered");
			}
		}
		else {
			console.log("Platform not ready");
			setTimeout(function() {
				console.log("Re-sending platformReady");
				socket.send(JSON.stringify({method: "platformReady"}));
			}, 1000);
		}
	}

	function socketOpen(evt) {
		console.log("Socket open");

		$.ajax({
			url: "manifest.json",
			success: function(data, textStatus, jqXHR) {
				var parsed = JSON.parse(data);
				parsed["method"] = "manifest";
				socket.send(JSON.stringify(parsed));
			}
		});

		console.log("Requesting platformReady");
		socket.send(JSON.stringify({method: "platformReady"}));
	}

	function socketError(evt) {
		if (!isClosing) {
			console.log("Socket error " + evt);

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



    /**********************************************
     shutdown Hpod using barcodeReader device start
    ***********************************************/   
	jkiosk.barcodeReaderOnReady = function(){
		callbacks["barcodeReaderOnReadyRes"] = jkiosk.onBarcodeReaderTriggerCallback;
		socket.send(JSON.stringify({method: "isBarcodeReaderReady"}));		
	};

    jkiosk.initShutdown = function(initShutdownRes){    
    	//alert("test3"); 
        callbacks["initShutdownRes"] = initShutdownRes;
        socket.send(JSON.stringify({method: "initShutdown"}));  
    };

    jkiosk.shutdownExeTrigger = function(){
        //callbacks["initShutdownRes"] = initShutdownRes;
        socket.send(JSON.stringify({method: "shutdownExeTrigger"}));      	
    } 

	jkiosk.shutdownHPodExeTrigger = function(){
        //callbacks["initShutdownRes"] = initShutdownRes;
        socket.send(JSON.stringify({method: "shutdownHPodExeTrigger"}));      	
    }

    /**********************************************
     shutdown Hpod using barcodeReader device end
    ***********************************************/   


	
	/****************************
	telemedi gem3s
	****************************/	
	jkiosk.teleMediOnReady = function(){
		callbacks["TeleMedListener"] = jkiosk.onTeleMedTriggerCallback;
		socket.send(JSON.stringify({method: "isTeleMedReady"}));		
	};
	jkiosk.gen3slogin=function(gen3sloginRes, payload){
		callbacks["LoginCompleteListener"]= gen3sloginRes;
		socket.send(JSON.stringify({method:"LoginGem3Api", parmData: payload}));	
	};
	jkiosk.gem3sPatientReg=function(patientregisterRes, patientreg){
		callbacks["PatientRegisterInfo"]= patientregisterRes;
		socket.send(JSON.stringify({method:"PatientRegisterGem3sApi", parmData: patientreg}));	
	};

	jkiosk.gem3slistofspecilality=function(gem3slistofspecilalityRes,token){
		callbacks["ListofSpecialityInfo"]= gem3slistofspecilalityRes;
		socket.send(JSON.stringify({method:"ListOfSpecialityGem3sApi",tokenid:token }));	
	};
	jkiosk.resspecilaitylist=function(speciallistRes,token){
		callbacks["ListofSpecialityInfo"]= speciallistRes;
		socket.send(JSON.stringify({method:"ListOfSpecialityGem3Api",tokenid:token }));
	};
	jkiosk.gem3sDoctorBasedSapeciality=function(gem3sDoctorBasedSapecialityRes, doctorspecial,token){		
		callbacks["listOfDoctortInfo"]= gem3sDoctorBasedSapecialityRes;
		socket.send(JSON.stringify({method:"ListOfDoctorGem3sApi", parmData: doctorspecial,tokenid:token }));
	};

	jkiosk.gem3sDoctorAvailabile=function(Doctoravailabilitylistres, doctoravail,token){		
		callbacks["listOfDoctortInfo"]= Doctoravailabilitylistres;
		socket.send(JSON.stringify({method:"ListOfDoctorGem3sApi", parmData: doctoravail,tokenid:token }));
	};

	jkiosk.gem3sSpecilalityquestion=function(gem3sSpecilalityquestionRes,specialqusion,token){
		callbacks["specialityquestionInfo"]= gem3sSpecilalityquestionRes;
		socket.send(JSON.stringify({method:"SpacialtyQuestionGem3sApi",parmData: specialqusion,tokenid:token }));
	};
    jkiosk.gem3sanswersubmission=function(gem3sanswersubmissionRes,answersubmission,token){
		callbacks["AnswerSubmissionInfo"]= gem3sanswersubmissionRes;
		socket.send(JSON.stringify({method:"AnswersubmissionGem3sApi",parmData: answersubmission,tokenid:token }));
	};
	jkiosk.BeforeStartCallGem3sApi = function(beforeStartCallGem3sApiRes, startcal, token){
		callbacks["BeforeStartCallInfo"]= beforeStartCallGem3sApiRes;
		socket.send(JSON.stringify({method:"BeforeStartCallGem3sApi",parmData:startcal,tokenid:token }));
	};
	jkiosk.gem3sStartcallStatus=function(startcallRes,startcal,token){
		callbacks["StartCallInfo"]= startcallRes;
		socket.send(JSON.stringify({method:"StartCallGem3sApi",parmData:startcal,tokenid:token }));
	};
	jkiosk.CancelCallGem3sApi= function(CancelCallGem3sApiRes,startcal,token){
		callbacks["CancelcallInfo"]= CancelCallGem3sApiRes;
		socket.send(JSON.stringify({method:"CancelCallGem3sApi",parmData:startcal,tokenid:token }));
	};
	jkiosk.EndconsultationGem3sApi= function(EndconsultationGem3sApiRes,startcal,token){
		callbacks["EndConsultationInfo"]= EndconsultationGem3sApiRes;
		socket.send(JSON.stringify({method:"EndconsultationGem3sApi",parmData:startcal,tokenid:token }));
	};
	jkiosk.resPrescription=function(PrescriptionRes, callid,token){
		callbacks["PrescriptiontInfo"]= PrescriptionRes;
		socket.send(JSON.stringify({method:"PrescriptiontGem3sApi",callid:callid,tokenid:token}));
	};
	jkiosk.gem3sConsultationDetails=function(gem3sConsultationDetailsRes, callid,token){
		console.log(" jkiosk inside gem3sConsultationDetails fn");
		callbacks["ConsultationDetailsInfo"]= gem3sConsultationDetailsRes;
		socket.send(JSON.stringify({method:"consultationDetailsGem3sApi",callid:callid,tokenid:token}));
	};
	jkiosk.reslogout=function(logoutRes,token){
		callbacks["LogouttInfo"]= logoutRes;
		socket.send(JSON.stringify({method:"LogOutGem3sApi",tokenid:token }));
	};

	/****************************
	telemedi genix
	****************************/

	jkiosk.GenixAuthentication = function(AuthenticationRes,inputparam) {
		callbacks["initCompleteListener"] = AuthenticationRes;
		socket.send(JSON.stringify({method: "InitializeGenixApi", parmData: inputparam}));
	};


	jkiosk.UserLogin = function(UserLoginRes,inputparam,tokenid) {
		callbacks["userlogininfo"] = UserLoginRes;
		socket.send(JSON.stringify({method: "UserLoginGenixApi",parmData: inputparam,tokenid:tokenid}));
	};

	jkiosk.Addpatient = function(AddpatientRes,inputparam,tokenid) {
		callbacks["AddpatientInfo"] = AddpatientRes;
		socket.send(JSON.stringify({method: "addPatientGenixApi", parmData:inputparam, tokenid:tokenid}));
	};

	jkiosk.genixSpeciality = function(genixListofSpecilalityRes,tokenid) {
		callbacks["SpecialityInfo"] = genixListofSpecilalityRes;
		socket.send(JSON.stringify({method: "SpecialityGenixApi",tokenid:tokenid}));

	};

	jkiosk.genixQuestionnaireModalBox = function(genixSpecilalityquestionRes,inputparam,tokenid) {
		callbacks["QuestionsetInfo"] = genixSpecilalityquestionRes;
		socket.send(JSON.stringify({method: "QuestionsetGenixApi", parmData: inputparam,tokenid:tokenid}));

	};

	jkiosk.genixAnswerSubmit = function(genixAnswerSubmitRes,inputparam,tokenid) {
		callbacks["QuestionsetpostInfo"] = genixAnswerSubmitRes;
		socket.send(JSON.stringify({method: "QuestionsetPostGenixApi", parmData: inputparam,tokenid:tokenid}));
	};
	jkiosk.Provider = function(ProviderRes,tokenid) {
		callbacks["ProviderInfo"] = ProviderRes;
		socket.send(JSON.stringify({method: "ProviderGenixApi", tokenid:tokenid}));

	};	
	jkiosk.genixEncounterType = function(genixEncounterTypeRes,tokenid) {
		callbacks["EncounterTypeInfo"] = genixEncounterTypeRes;
		socket.send(JSON.stringify({method: "EncounterTypeGenixApi",tokenid:tokenid}));
	};

	jkiosk.genixInitiateEncounter = function(genixInitiateEncounterRes,inputparam,tokenid) {
		callbacks["InitiateEncounterInfo"] = genixInitiateEncounterRes;
		socket.send(JSON.stringify({method:"InitiateEncounterGenixApi", parmData: inputparam,tokenid:tokenid}));
	};

	jkiosk.genixConnectProvider = function(genixConnectProviderRes,inputparam,tokenid) {
		callbacks["ConnectProviderInfo"] = genixConnectProviderRes;
		socket.send(JSON.stringify({method: "ConnectProviderGenixApi", parmData: inputparam,tokenid:tokenid}));
	};
	jkiosk.Consultation = function(ConsultationRes,inputparam,tokenid) {
		callbacks["consulationinfo"] = ConsultationRes;
		socket.send(JSON.stringify({method: "ConsulationSummaryGenixApi",parmData: inputparam,tokenid:tokenid}));
	};

	jkiosk.genixA4print = function(genixA4printRes, html_template, externalPrinterName){
        callbacks["genixA4printCallback"] = genixA4printRes;
        console.log(genixA4printRes,"jkiosk.js");
        socket.send(JSON.stringify({method: "genixA4printRequest", "html_template" : html_template, "externalPrinterName": externalPrinterName}));      
    };

	/*************************************
			payment module start
	*************************************/
	jkiosk.login = function(loginRes) {
		console.log(" login call reached");
		callbacks["LoginListener"] = loginRes;
		socket.send(JSON.stringify({method: "Login"}));
	};


  	//get allCredentials
    jkiosk.TransactionInitialize = function( SwapCardRes, PinInputRes, ResultRes,ihl_login_id,ihllogin_pass,invoice_number,Totalamount,MobileNumber) {
		
		console.log(" TransactionInitialize reached");
		
		callbacks["SwapCardListener"] = SwapCardRes;
		callbacks["PinInputListener"] = PinInputRes;
		callbacks["ResultListener"] = ResultRes;
		
		socket.send(JSON.stringify({method: "TransactionStart" ,ihl_login_id,ihllogin_pass,invoice_number,Totalamount,MobileNumber}));
	
	};

	//To generate QRCode
    jkiosk.BharatQRGenerate = function(BharatQRRes,amount,invoice,customerMobNum, ihl_login_id, ihllogin_pass) {
		
		callbacks["BharatQRGenerator"] = BharatQRRes;
		
		socket.send(JSON.stringify({method: "BharatQRGenerateStart",amount,invoice,customerMobNum, ihl_login_id, ihllogin_pass}));
	};

	//To check Transaction Status
    jkiosk.CheckUPITransactionStatus = async function(TransactionStatusRes) {
		
		callbacks["UPITransactionStatus"] = await TransactionStatusRes;
		
		socket.send(JSON.stringify({method: "CheckUPITransaction"}));
	};



	// Configuration
	jkiosk.getKioskConfiguration = function(configurationResultCallback) {
		callbacks["kioskConfigurationResult"] = configurationResultCallback;

		socket.send(JSON.stringify({method: "getKioskConfiguration"}));
	}

	jkiosk.getAvailableModules = function(availableModulesCallback) {
		callbacks["availableModules"] = availableModulesCallback;

		socket.send(JSON.stringify({method: "getAvailableModules"}));
	};

	// higi API
	jkiosk.higiLogin = function(higiLoginResultCallback) {
		//callbacks["higiLoginResult"] = higiLoginResultCallback;

		//socket.send(JSON.stringify({method: "higiLogin"}));
		callbacks["higiLoginResult"] = higiLoginResultCallback;
		socket.send(JSON.stringify({method: "higiLogin"}));

		//This needs to call the higi server. Cannot just send back anything
		/*var mergeId = 2936;

		$.ajax({
			async:false, timeout:40000,
			url: HigiBaseUrl + "/login/kioskLogin?id=" + mergeId,
			type:'GET',
			success:function (result) {
				setTimeout(function() {
					var wrapped = {
						serverResponse: JSON.stringify(result)
					};
					higiLoginResultCallback(wrapped);
				}, 1000);
			},
			headers:{
				"ApiToken":"hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA=="
			}
		});
		*/

	}

	// Life Cycle
	jkiosk.onPlatformReady = function(onPlatformReadyCallback) {
		console.log("Registered onPlatformReady");
		callbacks["onPlatformReady"] = onPlatformReadyCallback;

		socket = new WebSocket('ws://localhost:8081');
		socket.onmessage = socketMessage;
		socket.onerror = socketError;
		socket.onclose = socketError;
		socket.onopen = socketOpen;
	};

	// MVM start
	jkiosk.mvmOnReady = function() {
		callbacks["MvmReadyCallback"] = jkiosk.onMvmTriggerCallback;
		socket.send(JSON.stringify({method: "isMvmReady"}));
	};

	jkiosk.getMvmStockList = function(getMvmStockList, ihl_machineid) {
		callbacks["mvmStockList"] = getMvmStockList;
		socket.send(JSON.stringify({method: "mvmStockList", ihl_machineid: ihl_machineid}));
	};

	jkiosk.rotatorRequest = function(postMediDescrRes, medi){
		callbacks["dispensiveResponseMethod"] = postMediDescrRes;
		socket.send(JSON.stringify({method: "rotatorActiveRequest", mediId : medi.Id, rotId : medi.Rotator, quantity : medi.quantity}));
	};

	jkiosk.medicineDetailsJson = function(medi){
		//callbacks['GetMedicineDetailResponseMethod'] = GetMedicineDetail;
		socket.send(JSON.stringify({method: "medicineDetailsJson", mediDetails : medi}));
	};
 	jkiosk.QRSocketRequest = function(QRSocketResponse, data) {
		callbacks["QRSocketResponse"] = QRSocketResponse;
		socket.send(JSON.stringify({method: "QRSocketRequest", QRsocketParm : data}));
    };

    jkiosk.apolloA4print = function(apolloA4printRes, prescriptionUrl, externalPrinterName){
		callbacks["apolloA4printRes"] = apolloA4printRes;
		socket.send(JSON.stringify({method: "apolloA4printRequest", "prescriptionUrl" : prescriptionUrl, "externalPrinterName": externalPrinterName}));    	
    };

	jkiosk.printPDFFile = function(printPDFFileRes, prescriptionUrl, externalPrinterName){
		callbacks["printPDFFileRes"] = printPDFFileRes;
		socket.send(JSON.stringify({method: "printPDFFileRequest", "prescriptionUrl" : prescriptionUrl, "externalPrinterName": externalPrinterName}));    	
    };

	//Payment Gateway

	jkiosk.paymentOnReady = function() {
		callbacks["paymentEnabledStatus"] = jkiosk.onPaymentTriggerCallback;
		socket.send(JSON.stringify({method: "isPaymentEnabled"}));
	};

	jkiosk.isTemperatureOnReady = function() {
		callbacks["TemperatureReadyCallback"] = jkiosk.onTemperatureTriggerCallback;
		socket.send(JSON.stringify({method: "isTemperatureReady"}));
	};

	jkiosk.getTemperatureModuleName = function(temperatureModuleNameRes) {
		callbacks["TemperatureHardwareTypeCallback"] = temperatureModuleNameRes;
		socket.send(JSON.stringify({method: "getTemperatureHardwareType"}));		
	}

	jkiosk.isMosambeeOnReady = function(){
		callbacks["mosambeeTriggerStatus"] = jkiosk.onMosambeeTriggerCallback;
		socket.send(JSON.stringify({method: "isMosambeeReady"}));
	}

	jkiosk.isSpo2OnReady = function() {
		callbacks["Spo2ReadyCallback"] = jkiosk.onSpo2TriggerCallback;
		socket.send(JSON.stringify({method: "isSpo2Ready"}));
	};
	
	jkiosk.callFindSpO2HardwareFunction = function(findSpO2HardwareAvailability){
		//alert("jkiosk");
		callbacks["Spo2ReadyCallbackDuringTest"] = findSpO2HardwareAvailability;
		socket.send(JSON.stringify({method: "isSpo2ReadyDuringTest"}));
	};
jkiosk.callFindECGHardwareFunction = function(findECGHardwareAvailability){
		//alert("jkiosk");
		callbacks["ZUGECGReadyCallbackDuringTest"] = findECGHardwareAvailability;
		socket.send(JSON.stringify({method: "isZUGECGReadyDuringTest"}));
	};
	jkiosk.callZugSpo2emergencyStopFunction =function(ZugSpo2emergencyStopCallbackFunction){//new
  		console.log("Spo2 Emergency Stop kiosk-jkiosk");
		callbacks["Spo2STOPStatusCallback"] = ZugSpo2emergencyStopCallbackFunction;
		socket.send(JSON.stringify({method: "Spo2EmergencyStop" }));
	};

/*------------------------------------------
--------- finger print start deepak-------
-------------------------------------------*/
	jkiosk.fingerprintOnReady = function(){
		callbacks["fingerprintDeviceDetectionResponse"] = jkiosk.onFingerprintTriggerCallback;
		socket.send(JSON.stringify({method: "fingerprintDetectStatus"}));		
	}

    jkiosk.onFingerprintTriggerCallback = function(response) {
        console.log(response);
        console.log(response.isDeviceDetected);
    };

    jkiosk.fingerprintCapture = function(fingerprintCaptureRes){
		callbacks["fingerprintReadingResponse"] = fingerprintCaptureRes;
		socket.send(JSON.stringify({method: "startReadingFingerPrint"}));		
	}
/*------------------------------------------
--------- finger print end deepak-------
-------------------------------------------*/


		//Sumithra Switch Hardware Code Starts
	/*
	jkiosk.SwitchIdentifyReady = function() {
		callbacks["SwitchHardwareStatusCallback"] = jkiosk.SwitchIdentifyTriggerCallback;
		socket.send(JSON.stringify({method: "SwitchIdentify"}));
	};
*/
	jkiosk.callZugECGSwitchOnFunction =function(ECGSwitchOnCallbackFunction){
	callbacks["ecgONStatusCallback"] = ECGSwitchOnCallbackFunction;
	socket.send(JSON.stringify({method: "ECGSwitchON" }));
	};

	jkiosk.callZugECGSwitchOffFunction =function(ECGSwitchOFFCallbackFunction){

	callbacks["ecgOFFStatusCallback"] = ECGSwitchOFFCallbackFunction;
	socket.send(JSON.stringify({method: "ECGSwitchOFF" }));
	};

	jkiosk.callFullBodyBMCFootWearStatusFunction =function(ZugECGLeftJackStatusCallbackFunction){
	callbacks["ecgLeftJackStatusCallback"] = ZugECGLeftJackStatusCallbackFunction;
	socket.send(JSON.stringify({method: "ECGLeftJackStatus" }));
	};

	jkiosk.callZugECGRightJackStatusFunction =function(ZugECGRightJackStatusCallbackFunction){
	callbacks["ecgRightJackStatusCallback"] = ZugECGRightJackStatusCallbackFunction;
	socket.send(JSON.stringify({method: "ECGRightJackStatus" }));
	};

	jkiosk.callZugECGLegONStatusFunction =function(ZugECGLegONStatusCallbackFunction){
	callbacks["ecgLegONStatusCallback"] = ZugECGLegONStatusCallbackFunction;
	socket.send(JSON.stringify({method: "ECGLegONStatus" }));
	};

	jkiosk.callZugECGLegOFFStatusFunction =function(ZugECGLegOFFStatusCallbackFunction){
	console.log("legoffjkiosk");
	callbacks["ecgLegOFFStatusCallback"] = ZugECGLegOFFStatusCallbackFunction;
	socket.send(JSON.stringify({method: "ECGLegOFFStatus" }));
	};

	//Sumithra Switch Hardware Code Ends
    jkiosk.callZugECGHandDetetectFunction = function(callbackOfHandDetection,zugLiveDataCallBack,LeadMode,leadToRead,zugValidationResultsCallback,ZugECGBPMResultsCallBack,ZugECGReadAbortCompleteCallbackFunction, ZugECGBadReadAbortCompleteCallbackFunction,performTimerAbortResponseCallBack,amplitudeLevelResponseCallBack,sixLeadLiveDataCallBack) {
		console.log("sending command for ECG hand detection from jkiosk");
		callbacks["amplitudeLevelResponse"] = amplitudeLevelResponseCallBack;

		callbacks["zugHandDetectResponse"] = callbackOfHandDetection;

		callbacks["ZugLiveDataResponse"] =	zugLiveDataCallBack;

		callbacks["ZugValidationResultsResponse"] =		zugValidationResultsCallback;

		callbacks["ZugECGBPMResponse"] =		ZugECGBPMResultsCallBack;

		callbacks["ZugECGReadAbortCompleteResponse"] =	ZugECGReadAbortCompleteCallbackFunction;
			callbacks["ZugECGBadReadAbortCompleteResponse"] =	ZugECGBadReadAbortCompleteCallbackFunction;
				callbacks["performTimerAbortResponse"] =		performTimerAbortResponseCallBack;

			callbacks["zugEcgSixLeadLiveData"] = sixLeadLiveDataCallBack;

		socket.send(JSON.stringify({method: "getZugEcgHandDetectandStartReadData", Lead: LeadMode , CurrentLead: leadToRead }));
	};

	jkiosk.FilteredDataForECG =function(FilteredDataForECGCallback,full_data,readingLead){
		console.log("BeforeEcgDataFilteringRequestinJkiosk");
	callbacks["FilteredResponse"] =		FilteredDataForECGCallback;
	socket.send(JSON.stringify({method: "FilterECG" ,ECGDATA:full_data, READINGLEAD:readingLead}));

	};





		jkiosk.callZugECGSwitchAbortFunction =function(ZugECGSwitchAbortCompleteCallbackFunction){

	callbacks["ecgOFFStatusCallback"] =		ZugECGSwitchAbortCompleteCallbackFunction;
	socket.send(JSON.stringify({method: "ECGSwitchOFF" }));

	};
	jkiosk.callZugECGemergencyStopFunction =function(ZugECGemergencyStopCallbackFunction){//new
  console.log("Emergency Stop kiosk-jkiosk");
	callbacks["ecgSTOPStatusCallback"] = ZugECGemergencyStopCallbackFunction;
	socket.send(JSON.stringify({method: "EcgEmergencyStop" }));

	};
	jkiosk.isZUGECGOnReady = function() {
		callbacks["ZUGECGReadyCallback"] = jkiosk.onZUGECGTriggerCallback;
		socket.send(JSON.stringify({method: "isZUGECGReady"}));
	};
jkiosk.isZUGECGLeftJackOnReady = function() {
		callbacks["EcgLeftJackStatusCallback"] = jkiosk.onZUGECGLeftJackTriggerCallback;
		socket.send(JSON.stringify({method: "isZUGECGLeftJackReady"}));

	};

jkiosk.isZUGECGRightJackOnReady = function() {
		callbacks["EcgRightJackStatusCallback"] = jkiosk.onZUGECGRightJackTriggerCallback;
		socket.send(JSON.stringify({method: "isZUGECGRightJackReady"}));

	};
    jkiosk.isZUGECGRightJackOnReady = function() {
		callbacks["EcgRightJackStatusCallback"] = jkiosk.onZUGECGRightJackTriggerCallback;
		socket.send(JSON.stringify({method: "isZUGECGRightJackReady"}));

	};
	jkiosk.isZUGECGLegPlacedReady = function() {
		callbacks["EcgLegPlacedStatusCallback"] = jkiosk.onZUGECGLegPlacedTriggerCallback;
		socket.send(JSON.stringify({method: "isECGLegPlaced"}));

	};
	// OS Control
	jkiosk.restartOs =function(reStartCallbackFunction){
	console.log("jkiosk - reStartCallbackFunction");
	callbacks["restartCallback"] = reStartCallbackFunction;
	socket.send(JSON.stringify({method: "restartOs" }));
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
		console.log("getAdConcurrent request called to c#");
		callbacks["getAdResult-" + adSpotId] = callback;
		socket.send(JSON.stringify({method: "getAdConcurrent", adSpot: adSpotId, appState: state}));
	};

	jkiosk.sessionAdPlayed = function(adEvent) {
		socket.send(JSON.stringify({method: "sessionAdPlayed", playNotificationEvent: adEvent.playNotificationEvent	}));
	};

	jkiosk.getTopScreenVideoByKioskId = function(topScreenVideoRes, Id){
		callbacks["topScreenVideoTriggerStatus"] = topScreenVideoRes;
		socket.send(JSON.stringify({method: "getTopScreenVideoByKioskId", KioskId: Id}));
	};

	// Cursor
	jkiosk.hideCursor = function() {
		//socket.send(JSON.stringify({method: "hideCursor"}));
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
	/*	jkiosk.apiProxy  = function(url, method, body, onSuccess, onFailure, headers) {
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
	}; */
	jkiosk.apiProxy = function(url, method, body, onSuccess, onFailure, headers) {
		if (!headers) {
			headers = { };
		}
		if(headers["ApiToken"] == undefined){
			headers["ApiToken"] = HigiApiKey;
		}		

		$.ajax({
			url:url,
			type:method,
			data:body,
			success:function (result, response, jqXHR) {
				onSuccess(result);
			},
			error:function (result) {
				onFailure();
			},
			headers:headers
		});
	};

	// Abha API proxy
	jkiosk.abhaApiProxy = function(url, method, body, onSuccess, onFailure, headers) {

		$.ajax({
			url:url,
			type:method,
			data:body,
			success:function (result) {
				onSuccess(result);
			},
			error:function (result) {
				onFailure();
			},
			headers:headers
		});
	};
	
	jkiosk.getAffiliates = function(success, error){
		var url = HigiBaseUrl + '/consult/get_list_of_affiliation';
		jkiosk.apiProxy(url, 'GET', '', success, error);
	};

	// API Status
	jkiosk.apiStatus = function(callback) {
		callbacks["apiStatusResult"] = callback;
		socket.send(JSON.stringify({method: "getApiStatus"}));
		//callback(kioskStatus);
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
    jkiosk.getPrinterPaperStatus = function(onPrinterPaperStatus){
		callbacks["printerPaperStatusCallback"] = onPrinterPaperStatus;
		socket.send(JSON.stringify({method: "getPrinterPaperStatus"}));
	}


	jkiosk.getPrinterStatus = function(onStatusResult) {
		callbacks["printerStatusResult"] = onStatusResult;

		socket.send(JSON.stringify({method: "getPrinterStatus"}));
	};

	jkiosk.getPrinterSettings = function(onPrinterResult) {
		callbacks["printerSettingsResult"] = onPrinterResult;
		console.log(onPrinterResult);
		socket.send(JSON.stringify({method: "getPrinterSettings"}));
	};

	jkiosk.multiPrinterConfigurationDetails = function(getConfigurationDetails){
		callbacks["printerSettingsResult"] = getConfigurationDetails;
		socket.send(JSON.stringify({method: "getPrinterSettings"}));
	};

	jkiosk.print = function(htmlContent, onJobComplete, onJobFailed) {
		callbacks["printerJobComplete"] = onJobComplete;
		callbacks["printerJobDidNotComplete"] = onJobFailed;
		socket.send(JSON.stringify({method: "print", html: htmlContent}));
	};

	// Body Composition
	jkiosk.startBodyComposition = function (birthDate, heightCm, weightKg, isMale, activityLevel,
											handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {
		callbacks["bodyCompResult"] = testResultCallback;
		callbacks["bodyCompHandsDetected"] = handsDetectedCallback;
		callbacks["bodyCompProgress"] = progressCallback;
		callbacks["bodyCompHandsRemoved"] = handsRemovedCallback;
		callbacks["bodyCompTimeout"] = timeoutCallback;

		socket.send(JSON.stringify({
			method: "startBodyComp",
			birthDate: birthDate,
			heightCm: heightCm,
			weightKg: weightKg,
			isMale: isMale,
			activityLevel: activityLevel
		}));
	};

	jkiosk.stopBodyComposition =function(stopBodyCompCallbackFunction){
	console.log("jkiosk - StopBMC");
	callbacks["stopBodyCompCallback"] = stopBodyCompCallbackFunction;
	socket.send(JSON.stringify({method: "stopBodyComp" }));
	};

	jkiosk.setBmcFrequency250 = function (setBmcFrequency250CallbackFunction) {
		callbacks["Setfrequency250Callback"] = setBmcFrequency250CallbackFunction;
		socket.send(JSON.stringify({
			method: "Frequency250Set"
		}));

	};
	jkiosk.setBmcFrequency50 = function (setBmcFrequency50CallbackFunction) {
		callbacks["Setfrequency50Callback"] = setBmcFrequency50CallbackFunction;
		socket.send(JSON.stringify({
			method: "Frequency50Set"
		}));
	};
	jkiosk.setBmcFrequency625 = function (setBmcFrequency625CallbackFunction) {
		callbacks["Setfrequency625Callback"] = setBmcFrequency625CallbackFunction;
		socket.send(JSON.stringify({
			method: "Frequency625Set"
		}));
	};
	jkiosk.stopReadResistance = function (stopReadResistanceCallbackFunction) {
		callbacks["stopReadResistanceCallback"] = stopReadResistanceCallbackFunction;
		socket.send(JSON.stringify({
			method: "stopReadResistance"
		}));
	};
    
	jkiosk.readResistance = function (handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {
		callbacks["bodyCompResult"] = testResultCallback;
		callbacks["bodyCompHandsDetected"] = handsDetectedCallback;
		callbacks["bodyCompProgress"] = progressCallback;
		callbacks["bodyCompHandsRemoved"] = handsRemovedCallback;
		callbacks["bodyCompTimeout"] = timeoutCallback;
		socket.send(JSON.stringify({
			method: "readResistance",
		}));
	};

	// Start button
	jkiosk.monitorStartButton = function (buttonCallback) {
		callbacks["startButtonPressed"] = buttonCallback;
	};

	//fingerprint
	jkiosk.getHardwareDetect = function() {
    	console.log("Inside Fingerprint detect callback");
		callbacks["hardwareTrueOrFalseResult"] = jkiosk.fingerprintCallBack;
		socket.send(JSON.stringify({method: "getHardwareDetect"}));
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
		bpPressureCallback = onPressureChangeCallback;
		callbacks["bpResult"] = onResultCallback;
		callbacks["bpMeasurementError"] = onMeasurementErrorCallback;

		socket.send(JSON.stringify({method: "startBP"}));
	};

	function validatePressure(result) {
		if (result.pressure > 500)
		{
			// KUI-1105, KUI-1374: when stop button is pressed, SunTech BP module
			// returns readings beyond 500 while it restarts. Ignore these.
			return;
		}

		if (bpPressureCallback) {
			bpPressureCallback(result);
		}
	};

	jkiosk.stopBP = function(bpStopResponse) {
		callbacks["bpStatusResult"] = bpStopResponse;
		socket.send(JSON.stringify({method: "stopBP"}));
	};

	jkiosk.getBPStatus = function(onStatusCallback) {
		callbacks["bpStatusResult"] = onStatusCallback;
		socket.send(JSON.stringify({method: "getBPStatus"}));
	};


	jkiosk.isZugBPOnReady = function() {
		callbacks["bpStatusResult"] = jkiosk.isZugBPOnReadyRes;
		socket.send(JSON.stringify({method: "getBPStatus"}));
	};


	// Pulse Oximeter
	jkiosk.startPulseOximeter = function(onPulseOximeterChangeCallback, onResultCallback) {
		callbacks["pulseOximeterChange"] = onPulseOximeterChangeCallback;
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

	jkiosk.getPulseOximeterAvgStatus = function(onAverageTriggerCallback) {
		callbacks["pulseOximeterAverageTrigger"] = onAverageTriggerCallback;

		socket.send(JSON.stringify({method: "getPulseOximeterAvgStatus"}));
	}

	jkiosk.getPulseOximeterHandDetect = function(changeValueCallBack, LiveValueReached, getPulseOximeterFinalResultKiosk, spo2HandsNotDetectedCallBack) {
		callbacks["changeValueDetect"] = changeValueCallBack;
		callbacks["LiveValueReached"] = LiveValueReached;
		callbacks["pulseOximeterFinalValue"] = getPulseOximeterFinalResultKiosk;
		callbacks["spo2HandsNotDetected"] = spo2HandsNotDetectedCallBack;

		socket.send(JSON.stringify({method: "getPulseOximeterHandDetect"}));
	}

	jkiosk.getPulseOximeterFinalResult = function(onFinalValueTriggerCallback) {
		callbacks["pulseOximeterFinalValue"] = onFinalValueTriggerCallback;

		socket.send(JSON.stringify({method: "getPulseOximeterFinalResult"}));
	}

	// Body Temperature
	jkiosk.startTermometer = function(onTermometerChangeCallback, onResultCallback) {
		callbacks["termometerChange"] = onTermometerChangeCallback;
		callbacks["termometerResult"] = onResultCallback;

		socket.send(JSON.stringify({method: "startTermometer"}));
	};

	jkiosk.stopTermometer = function() {
		socket.send(JSON.stringify({method: "stopTermometer"}));
	}

	jkiosk.getSkinTemperatureStatus = function(onSkinTemperatureCallback, onRoomTemperatureCallback, onChangeTemperatureCallback) {
		callbacks["temperatureSkinValueDetect"] = onSkinTemperatureCallback;
		callbacks["temperatureRoomValueDetect"] = onRoomTemperatureCallback;
		callbacks["temperatureChangingValueDetect"] = onChangeTemperatureCallback;
		socket.send(JSON.stringify({method: "getSkinTemperatureStatus"}));
	}

	jkiosk.getForeheadSkinTemperatureStatus = function(onSkinTemperatureCallback, foreheadTemperatureStop) {
		console.log("get temperature request send from UI jkiosk.JS");
		callbacks["tempSkinValueDetect"] = onSkinTemperatureCallback;
		callbacks["tempSkinValueStop"] = foreheadTemperatureStop;
		socket.send(JSON.stringify({method: "getSkinTemperatureStatus"})); 
	}
	
	jkiosk.foreheadTemperatureStop = function(onSkinTemperatureStopCallback) {
		console.log("stop temperature value send to platform");
		callbacks["tempSkinValueStop"] = onSkinTemperatureStopCallback;
		socket.send(JSON.stringify({method: "stopSkinTemperatureProgress"}));
	}

	jkiosk.getSkinTemperatureProgress = function(onSkinTemperatureCallback, onRoomTemperatureCallback, onChangeTemperatureCallback) {
		callbacks["temperatureSkinValueDetect"] = onSkinTemperatureCallback;
		callbacks["temperatureRoomValueDetect"] = onRoomTemperatureCallback;
		callbacks["temperatureChangingValueDetect"] = onChangeTemperatureCallback;
		socket.send(JSON.stringify({method: "getSkinTemperatureProgress"}));
	}

	jkiosk.getTermometerStatus = function(onStatusCallback) {
		callbacks["termometerStatus"] = onStatusCallback;

		socket.send(JSON.stringify({method: "getTermometerStatus"}));
	}

	// Weight Scale
	jkiosk.startWeightScale = function(onWeightChangeCallback, onResultCallback) {
		callbacks["weightScaleChange"] = onWeightChangeCallback;
		callbacks["weightScaleResult"] = onResultCallback;

		socket.send(JSON.stringify({method: "startWeightScale"}));
	}

	jkiosk.stopWeightScale = function() {
		socket.send(JSON.stringify({method: "stopWeightScale"}));
	}

	jkiosk.getWeightScaleStatus = function(onStatusCallback) {
		callbacks["weightScaleStatus"] = onStatusCallback;

		socket.send(JSON.stringify({method: "getWeightScaleStatus"}));
	}

	jkiosk.onHasWeight = function(onHasWeightCallback) {
		callbacks["onHasWeight"] = onHasWeightCallback;
	};




	jkiosk.onNoWeight = function(onNoWeightCallback) {
		callbacks["onNoWeight"] = onNoWeightCallback;
	};




	jkiosk.checkWeight = function(checkWeightCallback) {
		callbacks["checkWeightResult"] = checkWeightCallback;

		socket.send(JSON.stringify({method: "checkWeight"}));
	};

	jkiosk.feetOnBar = function(callback) {
		callbacks["feetOnBarResult"] = callback;

		socket.send(JSON.stringify({method: "feetOnBar"}));
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
		callbacks["bluetoothConnectionRequest"] = connectionRequestCallback;
	};

	jkiosk.allowBluetoothConnection = function() {
		socket.send(JSON.stringify({method: "allowBluetoothConnection"}));
	};

	jkiosk.rejectBluetoothConnection = function() {
		socket.send(JSON.stringify({method: "rejectBluetoothConnection"}));
	};

	jkiosk.fetchKioskMachineLogo = function(kiosk_id, success, error) {
		var url = HigiBaseUrl + '/consult/fetch_Kiosk_Machine_Partner_Logo_Images';
		var data = {'kiosk_id': kiosk_id};
		jkiosk.apiProxy(url, 'GET', data, success, error);
	};

}(this.jkiosk = this.jkiosk || {}));
