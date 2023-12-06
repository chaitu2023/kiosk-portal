higiKioskControllers.controller('HigiKioskWelcomeController' , ['$interval', '$scope', '$http' , '$rootScope', 'HigiKioskStorageService', 'HigiKioskFlow', 'JkioskService', 'HigiKioskUserService', '$controller', 'HigiKioskUtilitiesService', 'HigiKioskAnimationService', '$timeout', 'HigiApiService', function($interval, $scope, $http, $rootScope, HigiKioskStorageService, HigiKioskFlow, JkioskService, HigiKioskUserService, $controller, HigiKioskUtilitiesService, HigiKioskAnimationService, $timeout, HigiApiService){
  
  
  
  $scope.logEvent = function(){
        if($scope.mode == "bp"){
            //Log Bloodpressure test events
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bpTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bpTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        } else if($scope.mode == "w"){
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_wTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_wTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
         else if($scope.mode == "ecg"){
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_ecgTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_ecgTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
         else if($scope.mode == "bmc"){
            //Log bmc test events
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bmcTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bmcTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
        else if($scope.mode == "spo2"){
            //Log bmc test events
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_spo2TestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_spo2TestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
        else if($scope.mode == "temp"){
            //Log bmc test events
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_thermometerTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_thermometerTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
        else if($scope.mode == "ivt"){
          //Log bmc test events
          JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_invasiveTestButton', 'button', 'pressed');
          JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_invasiveTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
      }
        else {

            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bpwTestButton', 'button', 'pressed');
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_bpwTestButton_languageVersion' + $scope.langClass, 'screen', 'display');
        }
    };

                $rootScope.ecgAnimateReplay= function() {
                    var path =  './images/ecgloader.gif';

                    replayGif(path);

                    $('#ecg_ad_video').css("display", "none");
                    $timeout(function(){
                        $('#ecg_ad_video').css("display", "block");
                    }, 5000);
                }


    $scope.setMode = function(button){
 
//        $scope.mode = button.mode;
        $scope.setShared({name : 'mode', value : button.mode});
        //changes scope mode
        $rootScope.mode = button.mode;


        console.log(button.mode);
        HigiKioskStorageService.saveSessionData('current_mode', button.mode );

        $scope.logEvent();
        $rootScope.setKioskADAMode();
        HigiKioskAnimationService.audioStop();

        if(button.mode=="bp"||button.mode=="ekg"||button.mode=="bpw" || button.mode=="bmc" || button.mode=="w" || button.mode=="spo2"|| button.mode=="temp") {
           console.log('button pressed:'+button.mode);
           if(button.mode == "bmc"){
               if (!$rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel == "a3" && $rootScope.hardwareAvailability["Body Composition"]) {
                   
               }
                else if((!$rootScope.hardwareAvailability["Body Composition"] && !$rootScope.hardwareAvailability["FullBodyCompositionAnalyser"]) || !$rootScope.hardwareAvailability["Weight Scale"] || !$rootScope.hardwareAvailability["SwitchHardware"]){
                    return 0;
                }
                else{
                    $scope.startBMC();
                }
           }
           if(button.mode == "ekg"){
            
              if ($rootScope.mosambeePaymentEnable == true) {
                if($rootScope.HSelect['ECG']==false){
                  return;
                } 
              }             
              //window.location = "#/zugecgprogression/forward";
            $rootScope.showLoadScreen = true;
            $rootScope.isVisibleLanguageButton = false;
        $scope.disableECG = false;
       $scope.findECGHardwareAvailability = function(response){
       	   console.log(response);
       	//   alert(response.ZUGECGStatusDuringTest);
                  $scope.ECGAvailable = response.ZUGECGStatusDuringTest;
		console.log("Setting ECGAvailable: " +  $scope.ECGAvailable);
      //  alert("Spo2   "+$scope.ECGAvailable);
        if($scope.ECGAvailable == true && $rootScope.hardwareAvailability["SwitchHardware"]){
          $rootScope.showLoadScreen = false;
       	//alert("ECG On");
 
        	$scope.stopBMC();
              if(HigiKioskStorageService.returnSessionData('user') == undefined) {
          //  alert("Open modal");

                      $rootScope.showLoadScreen = false;

            $rootScope.loadModal({id: 'regprompt', path: button.link, clicked : true});
                        //$rootScope.isVisibleLanguageButton = true;
                        //$rootScope.isVisibleAudio = true;

        } else {
                if( HigiKioskUserService.onboardingDone()){
                 console.log("login onboardingDone if");
                 window.location = "#/zugecgmode/forward";
                }
                else {
                 window.location =  button.link;
                }
            }
            if(document.getElementById('noECG')){
            document.getElementById("noECG").id = "ecg_test_btn";
        }
      }
      else{

        console.log("Checking ECGAvailable: " + $scope.ECGAvailable);
    if( ($scope.ECGAvailable == false) || (!$rootScope.hardwareAvailability["SwitchHardware"])){
            $scope.disableECG = true;
        $rootScope.showLoadScreen = false;

    $("#ECGNotAvailable").show();
    setTimeout(function() {
     
        $("#ECGNotAvailable").hide();  
        if(document.getElementById('ecg_test_btn')){
          document.getElementById("ecg_test_btn").id = "noECG";
        }
    }, 3000);
    }
      }
    }; //end findECGHardwareAvailability

	JkioskService.callFindECGHardwareFunction($scope.findECGHardwareAvailability);
	
    setTimeout(function() {

	console.log("Checking ECGAvailable: " + $scope.ECGAvailable);
    if( ($scope.ECGAvailable == false && $scope.disableECG == false) || (!$rootScope.hardwareAvailability["SwitchHardware"])){
            $scope.disableECG = true;
                    $rootScope.showLoadScreen = false;

    $("#ECGNotAvailable").show();
    setTimeout(function() {
      
        $("#ECGNotAvailable").hide();  
        if(document.getElementById('ecg_test_btn')){
          document.getElementById("ecg_test_btn").id = "noECG";
        }
    }, 3000);
    }
}, 8000);

           }
           if(button.mode == "w" && (!$rootScope.hardwareAvailability["Weight Scale"])){
                    return 0;
            }
            if(button.mode == "bp" && (!$rootScope.hardwareAvailability["Blood Pressure"])){
                    return 0;
            }
            
            if(button.mode == "spo2"){

                if ($rootScope.mosambeePaymentEnable == true) {
                  if($rootScope.HSelect['SPo2']==false){
                    return;
                  }  
                }
                
                var SpO2Available = false;
                $scope.disableSPO2 = false; 
                $rootScope.showLoadScreen = true;
                $rootScope.isVisibleLanguageButton = false;

        
       $scope.findSpO2HardwareAvailability = function(response){
       	   console.log(response);
       	  // alert(response.Spo2StatusDuringTest);
        SpO2Available = response.Spo2StatusDuringTest;
		console.log("Setting SpO2Available: " + SpO2Available);
      //  alert("Spo2   "+$scope.SpO2Available);
        if(SpO2Available == true){
                    $rootScope.showLoadScreen = false;
        	//alert("spo2 on");
              if(HigiKioskStorageService.returnSessionData('user') == undefined) {
          //  alert("Open modal");
                                $rootScope.showLoadScreen = false;

            $rootScope.loadModal({id: 'regprompt', path: button.link, clicked : true});
            //$rootScope.isVisibleLanguageButton = true;
            //$rootScope.isVisibleAudio = true;

        } else {
                if( HigiKioskUserService.onboardingDone()){
                 console.log("login onboardingDone if");
                 window.location = "#/spotwo1/forward";
                }
                else {
                 window.location =  button.link;
                }
            }
            if(document.getElementById('noSpo2')){
            document.getElementById("noSpo2").id = "spo2_test_btn";
          }
        }
        else{
          console.log("Checking SpO2Available: " +SpO2Available);
    if(SpO2Available == false){
      $scope.disableSPO2 = true;
              $rootScope.showLoadScreen = false;

    $("#SpO2NotAvailable").show();
    setTimeout(function() {
      
        $("#SpO2NotAvailable").hide();  
                if(document.getElementById('spo2_test_btn')){
        document.getElementById("spo2_test_btn").id = "noSpo2";
      }
    }, 3000);
    }
        }
    }; //end findSpO2HardwareAvailability
	
	JkioskService.callFindSpO2HardwareFunction($scope.findSpO2HardwareAvailability);
	
    setTimeout(function() {
	console.log("Checking SpO2Available: " +SpO2Available);
    if(SpO2Available == false && $scope.disableSPO2 == false){
      $scope.disableSPO2 = true;
              $rootScope.showLoadScreen = false;
    $("#SpO2NotAvailable").show();
    setTimeout(function() {
       
        $("#SpO2NotAvailable").hide();  
                if(document.getElementById('spo2_test_btn')){
        document.getElementById("spo2_test_btn").id = "noSpo2";
      }
    }, 3000);
    }
}, 5000);




                         
            }
            if(button.mode == "temp" && (!$rootScope.hardwareAvailability["temp"])){
                    return 0;
            }
            
          $scope.explode();

        }
 
       if(HigiKioskStorageService.returnSessionData('user') == undefined) {
        if((button.mode != 'spo2') && (button.mode != 'ekg'))  {
           // alert("condition satisfied");
            $rootScope.loadModal({id: 'regprompt', path: button.link, clicked : true});
        }
        } else {
 if((button.mode != 'spo2') && (button.mode != 'ekg'))  {
           // alert("condition satisfied");
            //$rootScope.loadModal({id: 'regprompt', path: button.link, clicked : true});
              if( HigiKioskUserService.onboardingDone()){
               
                  console.log("login onboardingDone if");
                  console.log("Mode: " + button.mode);
                    //based on mode, send to slide
                   // window.location = (button.mode == "w") ? "#/weight1/forward" : "#/bloodpressure1/forward";//if button.mode==w go to eight page else go to bp page
                    if(button.mode == "w") {
                         window.location = "#/weight1/forward";
                    } else if (button.mode == "bp") {
                         window.location = "#/bloodpressure1/forward";
                    }  else if (button.mode == "bmc") {
                         window.location = "#/weight1/forward";
                    }  else if (button.mode == "temp") {
                         window.location = "#/temp1/forward";
                    }  else if (button.mode == "ivt") {
                          window.location = "#/invasiveInstruction/forward";
                    }
                    else if (button.mode == "bpw") {
                        var currenttest;
                        window.location = HigiKioskFlow.nextTest(button.mode,currenttest);
                    }

                } else {
                    window.location =  button.link;
                }
        }
                // if( HigiKioskUserService.onboardingDone()){
               
                //   console.log("login onboardingDone if");
                //   console.log("Mode: " + button.mode);
                //     //based on mode, send to slide
                //    // window.location = (button.mode == "w") ? "#/weight1/forward" : "#/bloodpressure1/forward";//if button.mode==w go to eight page else go to bp page
                //     if(button.mode == "w") {
                //          window.location = "#/weight1/forward";
                //     } else if (button.mode == "bp") {
                //          window.location = "#/bloodpressure1/forward";
                //     } else if (button.mode == "ekg") {
                //         window.location = "#/zugecgmode/forward";
                //     } else if (button.mode == "bmc") {
                //          window.location = "#/weight1/forward";
                //     } else if (button.mode == "spo2") {
                //          window.location = "#/spotwo1/forward";
                //     } else if (button.mode == "temp") {
                //          window.location = "#/temp1/forward";
                //     } else if (button.mode == "bpw") {
                //         var currenttest;
                //         window.location = HigiKioskFlow.nextTest(button.mode,currenttest);
                //     }

                // } else {
                //     window.location =  button.link;
                // }

          }
    };
        
    $scope.ECGSwitchOnCallbackFunction=function(response){
        $rootScope.switchOnStatus = response.ecgONStatus;
        console.log("BMCONStatus in callback   "+$rootScope.switchOnStatus);
    }

   $scope.startBMC=function(){
        JkioskService.callZugECGSwitchOnFunction($rootScope.ECGSwitchOnCallbackFunction);
    };

    $scope.stopBMC=function(){
        JkioskService.callZugECGSwitchAbortFunction($scope.BMCSwitchOffCallbackfromWelcomebeforeECG);

    };
 $scope.BMCSwitchOffCallbackfromWelcomebeforeECG = function(response){
    console.log("BMC Switch off Callback response from WElcome before ECG");

 }

    $scope.disclaimerButtonClick=function(){
    	angular.element('.dummy_background_wrap').addClass("wrap_active");
    	angular.element('.disclaimer_modal').addClass("modal_active");
    	angular.element(".higi_login_btn,.higi_register_btn,#global_splash_logo").addClass("disclaimer_reference");
    	angular.element(".close_btn_ref").addClass("disc_close_icon");
    	angular.element(".higi_top_container").addClass("top_container_ref");
      angular.element(".higi_top_container").css('z-index', '0');
    };

    $scope.disclaimermodalHide=function(){
      console.log("closing Disclaimer modal");
      angular.element('.dummy_background_wrap').removeClass("wrap_active");
      angular.element('.disclaimer_modal').removeClass("modal_active");
      angular.element(".higi_login_btn,.higi_register_btn,#global_splash_logo").removeClass("disclaimer_reference");
      angular.element(".close_btn_ref").removeClass("disc_close_icon");
      angular.element(".higi_top_container").removeClass("top_container_ref");
      angular.element(".higi_top_container").css('z-index', '11');
    };


    $scope.mvmButtonClick = function(){
        // For MVM flow testing
        /*window.location = "#/mvm"
        $rootScope.MVMAvailable = true;  */
        
        // For A4 printer testing
        /*(var urlStr = "https://blob.medeintegra.dev/blob/mede_blob_7b9b1175-1a61-4ebe-9187-0dc22fe8e4c3.pdf";
        var prescriptionUrl = urlStr.replace("https", "http"); 
        var externalPrinterName = $rootScope.externalPrinterName;
        console.log("apolloA4print welcome ctrl");
        JkioskService.apolloA4print($scope.apolloA4printRes,  prescriptionUrl, externalPrinterName);  */

        // for apollo coupon code flow testing
       // window.location = "#/ihl-teleconsultation-summary";
	   
	   // for foreheaf temp stop callback
	   JkioskService.foreheadTemperatureStop($scope.foreheadTemperatureStop);
    }

    $scope.foreheadTemperatureStop = function(res){
		console.log("inside $scope.foreheadTemperatureStop fn");
		console.log(res);
		
			 $rootScope.foreheadTempStart = false;
	}
	
    $scope.apolloA4printRes = function(res){
        console.log(res);
        //alert("callback res");
    }



    function WebSocketClient() {
                var self=this;
                this.ws;
                this.subscribersArray = [];


                this.findSubscriber = function (topic, constrains, remove) {


                    var len = this.subscribersArray.length;

                      for (var i = 0; i < len; i++) {

                        if (this.subscribersArray[i].topic == topic) {

                            for (var j = 0; j <constrains.length; j++) {


                                if ($.inArray(constrains[j], this.subscribersArray[i].constrains)) {

                                    var temp = this.subscribersArray[i];
                                    break;

                                }

                              }


                             if (remove == true)
                                 this.subscribersArray.splice(i, 1);

                             return temp;


                         }

                    }

                    return null;


                 };



                this.connect = function (WsServerAddress) {

                    var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);
                    if (support == null) {
                        return;

                    }

                    this.ws = new window[support](WsServerAddress);

                    // when data is comming from the server, this metod is called



                    this.ws.onopen = function () {

                        console.log("Websocket Connection Opened " + WsServerAddress);

                    };


                    this.ws.onclose = function () {

                        console.log("Websocket Connection closed");

                    }
                    this.ws.onmessage = function (evt) {
                        //  appendMessage("# " + evt.data + "

                        var request = null;

                        try {

                            var request = JSON.parse(evt.data);

                        } catch (e) {

                            console.log("cannot desirialize json " + evt.data);
                        }

                        if (request != null) {

                            var subscriber = self.findSubscriber(request.Topic, request.Constrains, false);

                            if (subscriber != null)
                                subscriber.callback.call(this, request.Msg);
                        }



                    };



                };




                this.subscribe = function (topic, constrains, callback) {

                    var request = {

                        'RequestType': 'SUBSCRIBE',
                        'Topic': topic,
                        'Constrains': constrains

                    }

                    var requestJson = JSON.stringify(request, null, 4);

                    console.log(requestJson);

                    this.sendMessage(requestJson);

                    var subcriber = { topic: topic, constrains: constrains, callback: callback };

                    this.subscribersArray.push(subcriber);

                };


                this.unsubscribe = function (topic,constrains) {

                    var request = {

                        'RequestType': 'UNSUBSCRIBE',
                        'Topic': topic,
                        'Constrains': constrains

                    }


                    var requestJson = JSON.stringify(request, null, 4);
                    this.sendMessage(requestJson);

                    this.findSubscriber(topic, constrains, "true");

                };


                this.publish = function (topic, constrains, msg) {


                    var request = {

                        'RequestType': 'PUBLISH',
                        'Topic': topic,
                        'Constrains': constrains,
                        'Msg': msg
                    }


                    var requestJson = JSON.stringify(request, null, 4);
                    this.sendMessage(requestJson);





                };

                this.disconnect = function () {

                    if (this.ws) {
                        ws.close();
                    }

                };

                this.sendMessage = function (msg) {

                    if (this.ws) {
                        this.ws.send(msg);

                    }


                };
            }









function convert(mystring){
var resultstring="";


var tempchar="";
var j=0;

    for(var i=0;i<mystring.length;i++){
var thiscar=    mystring.charAt(i);
        if(i==0||i%2==0){
tempchar=thiscar;
        }else{

var hex= tempchar.concat(thiscar);

var mydec=hextodec(hex);
j++;

resultstring=resultstring+""+ mydec+",";

        }


    }

return resultstring;
//document.getElementById('result').innerHTML=resultstring+" total count:"+ j;
}




function hextodec (num) {
   return  parseInt(num, 16).toString(10);

            }



            var noSupportMessage = "Your browser cannot support WebSocket!";
            var ws;

            function appendMessage(message) {
               // $('body').append(message);
            }

            function connectSocketServer() {
                var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);

                if (support == null) {
                    appendMessage("* " + noSupportMessage + "<br/>");
                    return;
                }


                //appendMessage("* Connecting to server ..<br/>");

                // create a new websocket and connect
                ws = new window[support]('ws://localhost:2012/');
var mmk=0;







                // when data is comming from the server, this metod is called
                ws.onmessage = function (evt) {

//data.toString());



                };

                // when the connection is established, this method is called
                ws.onopen = function () {
                   appendMessage('* Connection open<br/>');
                   if($rootScope.mode=="w"||$rootScope.mode=="bmc") {
                	   sendMessage();
                   } else {
                    sendMessage();
                   }

                };

                // when the connection is closed, this method is called
                ws.onclose = function () {
                  appendMessage('* Connection closed<br/>');

                }
            }

            function sendMessage() {
                if (ws) {
                  //  var messageBox = document.getElementById('messageInput');
                     if($rootScope.mode=="w"||$rootScope.mode=="bmc"){
                          ws.send("releaseswitch");
                    }//else if($rootScope.mode=="ekg"||$rootScope.mode=="bpw"){
                         //ws.send("startover");
                    //}
                    else{
                        ws.send("releaseswitch");
                    }
                    //messageBox.value = "";
                }

                // if(skipParams == "ecgSkip")
                // {
                //   ws.send("releaseswitch");
                // }
            }


              function sendNCommand() {
                if (ws) {
                    //var messageBox = document.getElementById('messageInput');
                    ws.send("ecgON");
                    //messageBox.value = "";

                }
            }

            function disconnectWebSocket() {
                if (ws) {
                    ws.close();
                }
            }

            function connectWebSocket() {

                connectSocketServer();

            }

            window.onload = function () {

            }



$scope.explode=function(){
    connectWebSocket();



  // setTimeout(sendMessage, 2000);


 };

    var foo = function(){
/*
//$rootScope.hardwareAvailability["ECG"]=true;
   if(($rootScope.hardwareAvailability["ECG"]) == false || ($rootScope.hardwareAvailability["ECG"]) == undefined)
        {


           document.getElementById("splash_ecg_test_btn").style.display="none";
           document.getElementById("splash_bmc_test_btn").style.marginLeft = "100px";
/*
          function jsDisableElement(id) {
            if ( document.getElementById("splash_ecg_test_btn") ) {
            document.getElementById("splash_ecg_test_btn").removeAttribute("disabled");
            // document.getElementById(id).className = "enabled";
            //document.getElementById(id).disabled = false;
            */

        // document.getElementById("splash_ecg_test_btn").setAttribute("disabled","true");

        //document.getElementById("splash_ecg_test_btn").disabled = false;

/*
        }else{

         //document.getElementById(id).removeAttribute("enabled");
        }
        */
};

 /*$scope.audioFiles = [
            {filename: 'splash_selectoneofthree'},
            {filename : 'global.welcomeback'}
        ];*/

        $scope.audioFiles = [
            {id: 'global.welcomeback', filename: 'global.welcomeback', delay: 200, callback: $scope.callback1},
            {id: 'global.startconsult', filename: 'global.startconsult', delay: 200, callback: $scope.callback1}
        ];


    $scope.init = function(){
      $rootScope.Crossbar.closeConnection();
      $rootScope.higiPageName = "HigiKioskWelcome";

      // socket active for Invasive
      $scope.socketConnEstablished =  false;
      $scope.showInvasiveErrorHint = false;

            $rootScope.showLoadScreen = false;
            $scope.ECGAvailable = false;
$scope.disableECG = false;
$scope.disableSPO2 = false;
      $rootScope.ToDisableECGAlert = true;
        //welcome screen
        //document.getElementById("exitButtonOnTheTop").style.display = "inline-block";
        $scope.saveresultsfail=true;
        $rootScope.onWelcomeScreen = true;
        $rootScope.isVisibleLogo = true;
        $rootScope.isVisibleLanguageButton = false;
        $rootScope.isVisibleLanguage = false;
        $rootScope.selectLangLabel = false;
        $rootScope.isVisibleAudio = false;
        //if (window.location.hash == "#/welcome") {
          //$rootScope.isVisibleExit = false; /* change made here */
        //}
        $rootScope.higiTopNavHidden = false;
        $rootScope.higiTopNavHidden = false;
        $rootScope.reachedFinishScreen = false;
        $rootScope.ekgNotTaken = "ECG Not taken";
        $scope.kioskApiNotAvailableTipVisible = false;
        $rootScope.IHLTeleConsultMainButtonClicked = false;
        $scope.IHLTeleConsultMainButtonClass = "teleconsult_main_button_deactive";
        if($rootScope.selectedIvtListArray.length == 0){
          $scope.IHLInvasiveTestButtonClass = "invasive_test_button_deactive";
        }else{
          $scope.IHLInvasiveTestButtonClass = "invasive_test_button_active";
        }
        $scope.WelcomeButtonStartTest = "welcome.startTest";
        $scope.welcomePageInstructionText = "welcome.Instruction";
        $scope.welcomePageHeadlineText = "welcome.headline";
        $scope.recommendedText = "welcome.recommendedText";
        $scope.telemedTitle = "welcome.telemedicine.buttontitle";
		if($rootScope.hardwareAvailability != undefined){
			if(($rootScope.hardwareAvailability["ECG"]) != true){
				setTimeout(foo, 250);
			}
		}
                     //language button show and hide thamarai
                     if (window.location.hash == "#/welcome") {

                         $rootScope.isVisibleLanguageButton = true;
                         $rootScope.isVisibleAudio = true;
                         $rootScope.isVisibleProfileImage = true;
                         $('.higi_top_nav_ng').show();

                    }else {
                       
                         $rootScope.isVisibleLanguageButton = false;
                         
                    }

        $scope.callFullBodyBMCFootWearStatusCallbackFunction = function(response){
           $rootScope.footWearFolded = response.ecgLeftJackStatus;
           /* We have comment the code as per management request on 09/06/2022 */
           
           /*if($rootScope.footWearFolded == false){
              $("#footWearFoldedError").show();
           }
           else{
           }*/
        }
		if($rootScope.hardwareAvailability != undefined){
			if($rootScope.hardwareAvailability["FullBodyCompositionAnalyser"]){
			  JkioskService.callFullBodyBMCFootWearStatusFunction($scope.callFullBodyBMCFootWearStatusCallbackFunction);
			}
		}

         localStorage.setItem("gender","");
         localStorage.setItem("height","");
         localStorage.setItem("dob","");
         localStorage.setItem("birth", "");


       //console.log("the file name inside welcomectrl audio instruction 1 is"+ $scope.audioFiles[0].filename);
        //$scope.promise
          //  .then(function(){
           // $timeout(function () {
             // console.log("the file name inside welcomectrl audio instruction 2 is"+ $scope.audioFiles[1].filename);
               // return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                // }, 3000);
          //  });
        //Set weight message based on BMC availability

          // $scope.isVisibleLogo=true;

        $scope.ecgButtonClass= '';

        /*if(($rootScope.hardwareAvailability['Body Composition'])){
          if(!hardwareAvaliablity_temp_spo2){
            var weightButtonCopy = 'start01.bmc.weight.and.bmc';
          } else {
            var weightButtonCopy = 'start01.bmc.weight.and.bmc_with_spo2_temp';
          }
          $scope.weightButtonClass = 'bmc-available';
        }else {
          if(!hardwareAvaliablity_temp_spo2){
            var weightButtonCopy = 'start01.check.my.weight';
          } else {
            var weightButtonCopy = 'start01.check.my.weight_with_spo2_temp';
          }
            $scope.weightButtonClass = '';
        }*/
		
		if($rootScope.hardwareAvailability != undefined){
			if(($rootScope.hardwareAvailability['Body Composition']) || ($rootScope.hardwareAvailability['FullBodyCompositionAnalyser'])){          
				var weightButtonCopy = 'start01.bmc.weight.and.bmc_with_spo2_temp';
				$scope.weightButtonClass = 'bmc-available';
			}else {
				var weightButtonCopy = 'start01.check.my.weight_with_spo2_temp';
				$scope.weightButtonClass = '';
			}
		}


         // with spo2 and thermometer
       var ecgButton = 'start09.check.my.ecg_with_spo2_temp';
	   if($rootScope.hardwareAvailability != undefined){
        if (!$rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel == "a3" && $rootScope.hardwareAvailability["Body Composition"]) {
            $scope.bmcStatus = "bmc_test_btn";
        }
        else if((!$rootScope.hardwareAvailability["Body Composition"] && !$rootScope.hardwareAvailability['FullBodyCompositionAnalyser'])|| !$rootScope.hardwareAvailability["Weight Scale"] || !$rootScope.hardwareAvailability["SwitchHardware"]){
            $scope.bmcStatus = "noBMC";
        }
        else
        {
            $scope.bmcStatus = "bmc_test_btn";
        }
if(!$rootScope.hardwareAvailability["ECG"] || !$rootScope.hardwareAvailability["SwitchHardware"]){
            $scope.ecgStatus = "noECG";
        }
        else
        {
            $scope.ecgStatus = "ecg_test_btn";
        }
        if(!$rootScope.hardwareAvailability["Blood Pressure"]){
            $scope.bpStatus = "noBP";
        }
        else
        {
            $scope.bpStatus = "bp_test_btn";
        }
        if(!$rootScope.hardwareAvailability["SPo2"]){
            $scope.spo2Status = "noSpo2";
        }
        else
        {
            $scope.spo2Status = "spo2_test_btn";
        }
        if(!$rootScope.hardwareAvailability["temp"]){
            $scope.temperatureStatus = "noTemperature";
        }
        else
        {
            $scope.temperatureStatus = "temp_test_btn";
        }
        if(!$rootScope.hardwareAvailability["Weight Scale"]){
            $scope.weightStatus = "noWeight";
        }
        else
        {
            $scope.weightStatus = "weight_test_btn";
        }

	   }
        if($rootScope.paymentSessionStarted){

          if($rootScope.HSelect['Body Composition']==false && $rootScope.HSelect['FullBodyCompositionAnalyser'] == false){
            $scope.bmcStatus = "noBMC";
          }

          if($rootScope.HSelect['Body Composition']==false){
            $rootScope.hardwareAvailability['Body Composition']=false;
            $rootScope.hardwareAvailability['FullBodyCompositionAnalyser']=false;
          }

          if($rootScope.HSelect['FullBodyCompositionAnalyser']==false){
            $rootScope.hardwareAvailability['FullBodyCompositionAnalyser']=false;
          }

           if($rootScope.HSelect['Weight Scale']==false){
            $scope.weightStatus = "noWeight";
            $rootScope.hardwareAvailability['Weight Scale']=false;
          }

          if(($rootScope.HSelect['Body Composition']== true || $rootScope.HSelect['FullBodyCompositionAnalyser']==true )&& $rootScope.HSelect['Weight Scale']==false){
            $scope.weightStatus = "yesbmcnoWeight";
            $rootScope.hardwareAvailability['Weight Scale']=true;
          }

           if($rootScope.HSelect['temperature']==false){
            $scope.temperatureStatus = "noTemperature";
            $rootScope.hardwareAvailability['temperature']=false;
          }

           if($rootScope.HSelect['SPo2']==false){
            $scope.spo2Status = "noSpo2";
            $rootScope.hardwareAvailability['SPo2']=false;
          }

           if($rootScope.HSelect['Blood Pressure']==false){
            $scope.bpStatus = "noBP";
            $rootScope.hardwareAvailability['Blood Pressure']=false;
          }

           if($rootScope.HSelect['ECG']==false){
            $scope.ecgStatus = "noECG";
            $rootScope.hardwareAvailability['ECG']=false;
          }
        }

        $scope.buttons = [
            {'label' : 'welcome.fullBodyTest.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'bpw' , 'buttonId' : 'bp_weight_test_btn', 'shake' : '', 'description': '', 'name': 'AllTest', 'price': 0 },
            {'label' : 'welcome.ecg.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'ekg' , 'buttonId' : $scope.ecgStatus, 'shake' : '', 'description': 'welcome.ecg.description', 'name': 'ECG', 'price': 0 },
            {'label' : 'welcome.bmc.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : "bmc" , 'buttonId' : $scope.bmcStatus, 'shake' : '', 'description': 'welcome.bmc.description', 'name': 'BMC', 'price': 0 },
            {'label' : 'welcome.weight.and.bmi', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'w' , 'buttonId' : $scope.weightStatus, 'shake' : '', 'description': 'welcome.bmi.description', 'name': 'Weight', 'price': 0 },
            {'label' : 'welcome.bp.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'bp' , 'buttonId' : $scope.bpStatus, 'shake' : '', 'description': 'welcome.bp.description', 'name': 'BloodPressure', 'price': 0 },
            {'label' : 'welcome.spo2.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'spo2' , 'buttonId' : $scope.spo2Status, 'shake' : '', 'description': 'welcome.spo2.description', 'name': 'SPO2', 'price': 0 },
            {'label' : 'welcome.temp.title', 'link' : '#/onboarding1/forward/enter' , 'mode' : 'temp' , 'buttonId' : $scope.temperatureStatus, 'shake' : '', 'description': 'welcome.temperature.description', 'name': 'Tempeature', 'price': 0 }
        ];
        $scope.mainMessage = "start01.way.to.keep.tabs_with_spo2_temp";
        
        //for kiosk vitals payment
        if ($rootScope.kioskWithPaymentMode == true) {    
          $scope.listPriceForVitalTest();
        }

        //discount option variable
        $rootScope.couponNumber = "";
        $rootScope.discountType = "";

        $scope.chooseOneOption = "start01.choose.one.option";
        $scope.disclaimer = "start01.disclaimer";
        $scope.disclaimerText="welcome.disclaimetitle";
        $scope.disclaimetitle="welcome.disclaimetitle";
        $scope.pay_title = "welcome.pay_title";

        //TODO remove after Daikon release
        //$scope.shaking = 0;
        //$scope.interval = $interval(function() {
        //    $scope.shaking = ($scope.shaking < $scope.buttons.length) ? $scope.shaking += 1 : 0;
        //    $scope.buttons.forEach(function(button, index) {
        //        button.shake = ($scope.shaking == index) ? 'shake' : '';
        //    })
        //}, 7000);

        var minuteCount = 10;
       $scope.intervalApiTime = 10000 ;
        $scope.intervalApi = $interval(function() {
            var q = JkioskService.apiStatus();
        }, $scope.intervalApiTime);
        $scope.$on("$destroy", function(){
            $interval.cancel($scope.intervalApi);
        });
        if(localStorage.getItem("safalPage") == "true"){
          JkioskService.checkWeightService($scope.weight);
        }
        $scope.getAvaliableModuleCount();
        //$scope.apply();

        // To enable when, the vitals are clicked after returning from Invasive test.

        console.log($rootScope.selectedVital.includes('bpw'));
        if($rootScope.selectedVital.includes('bpw') == false || $rootScope.selectedIvtListArray.length !== 0){
          $timeout(function() {
            // if($rootScope.selectedIvtListArray.length !== 0){
              let selectedVitalsArray = $rootScope.selectedVital;
              console.log(selectedVitalsArray);
              selectedVitalsArray.forEach(element => {
                console.log(element);
                $scope.addActiveClass(element);
              })
            // }
          }, 1000);
        }else{
          $scope.nextVisible = false;
        }
    };



    if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == true){
      if (localStorage.getItem("paymentSessionVitalTest") != undefined && localStorage.getItem("paymentSessionVitalTest") != null) {
        $rootScope.selectedVital = [];
        let paymentSessionVitalTest = JSON.parse(localStorage.getItem("paymentSessionVitalTest"));
        let bmcHardWareName = "FullBodyCompositionAnalyser";
        if ($rootScope.hardwareAvailability["Body Composition"] == true) {
          bmcHardWareName = "Body Composition";
        }

        let modulesConfigObj = [
          {hardware: 'ECG', mode: 'ekg', normalClass: 'ecg_test_btn', activeClass: 'ecg_test_btn_active', deActiveClass: 'noECG' },
          {hardware: bmcHardWareName, mode: 'bmc', normalClass: 'bmc_test_btn', activeClass: 'bmc_test_btn_active', deActiveClass: 'noBMC' },
          {hardware: 'Weight Scale', mode: 'w', normalClass: 'weight_test_btn', activeClass: 'weight_test_btn_active', deActiveClass: 'noWeight' },
          {hardware: 'Blood Pressure', mode: 'bp', normalClass: 'bp_test_btn', activeClass: 'bp_test_btn_active', deActiveClass: 'noBP' },
          {hardware: 'SPo2', mode: 'spo2', normalClass: 'spo2_test_btn', activeClass: 'spo2_test_btn_active', deActiveClass: 'noSpo2' },
          {hardware: 'temp', mode: 'temp', normalClass: 'temp_test_btn', activeClass: 'temp_test_btn_active', deActiveClass: 'noTemperature' }
        ];

        if (paymentSessionVitalTest.includes('bpw')) {
          $rootScope.selectedVital = ['bpw'];
          setTimeout(() => {
            modulesConfigObj.forEach(element => {
              if ($rootScope.hardwareAvailability[element.hardware] == true) {
                document.getElementById(element.normalClass).id = element.activeClass;
              }else{
                document.getElementById(element.normalClass).id = element.deActiveClass;
              }
            });
            $scope.nextVisible = true;
            document.getElementById('bp_weight_test_btn').id = 'bp_weight_test_btn_active';
            $scope.IHLTeleConsultMainButtonClass = "teleconsult_main_button_disable";
          },600);
        }else{
          $rootScope.selectedVital = paymentSessionVitalTest;
          setTimeout(() => {
            modulesConfigObj.forEach(element => {
              if ($rootScope.hardwareAvailability[element.hardware] == true && paymentSessionVitalTest.includes(element.mode)) {
                document.getElementById(element.normalClass).id = element.activeClass;
              }else{
                document.getElementById(element.normalClass).id = element.deActiveClass;
              }
            });
            $scope.nextVisible = true;
            document.getElementById('bp_weight_test_btn').id = 'no_bp_weight_test_btn';
            $scope.IHLTeleConsultMainButtonClass = "teleconsult_main_button_disable";
          },600);
        }
      }else{
        $rootScope.selectedVital = [];
        $scope.nextVisible = false;
        $scope.avaliableModuleCount = 0;
      }
    }else{
      if($rootScope.selectedIvtListArray.length == 0 && $rootScope.previousUrl != '/invasive'){
        $rootScope.selectedVital = [];
        $scope.nextVisible = false;
        $scope.avaliableModuleCount = 0;
      }else{
        if($rootScope.selectedIvtListArray.length == 0 && $rootScope.selectedVital.includes('ivt')){
          $rootScope.selectedVital.splice(0, 1);
        }else{
          $scope.nextVisible = true;
        }
      }
    }
    

    $scope.getAvaliableModuleCount = function(){
        if($rootScope.hardwareAvailability['SPo2'] == true){
            $scope.avaliableModuleCount++;
        } 
        if($rootScope.hardwareAvailability['Blood Pressure'] == true){
            $scope.avaliableModuleCount++;
        } 
        if($rootScope.hardwareAvailability['Weight Scale'] == true){
            $scope.avaliableModuleCount++;
        } 
        if($rootScope.hardwareAvailability['Body Composition'] == true){
            $scope.avaliableModuleCount++;
        } 
        if($rootScope.hardwareAvailability['FullBodyCompositionAnalyser'] == true){
          $scope.avaliableModuleCount++;
        }
        if($rootScope.hardwareAvailability['temp'] == true){
            $scope.avaliableModuleCount++;
        } 
        if($rootScope.hardwareAvailability['ECG'] == true){
            $scope.avaliableModuleCount++;
        }
        if($rootScope.MachineModal == 'H-pod d plus'){
          $scope.avaliableModuleCount++;
        }

    }

    $scope.selectMode = function(vital){
      // console.log(vital);
      if(vital == 'ivt'){
        vital = {
          // $$hashKey: "object:334",
          // buttonId: "temp_test_btn",
          // description: "welcome.temperature.description",
          // label: "welcome.temp.title",
          link: "#/onboarding1/forward/enter",
          mode: "ivt",
          name: "IvasiveTest",
          price: 0,
          shake: ""
        }
        if($scope.IHLInvasiveTestButtonClass != "invasive_test_button_active"){
          $scope.cmdSendToserver();
          /*if($scope.socketConnEstablished == true){
            window.location = "#/invasive";
          }else{
            $scope.showInvasiveErrorHint = true;
            $timeout(function() {
              $scope.showInvasiveErrorHint = false;
            }, 2000);
            return;
          }*/
        }
      }

      if(vital.mode == 'bpw' && $rootScope.MachineModal == 'H-pod d plus' && $scope.IHLInvasiveTestButtonClass != "invasive_test_button_active"){
        $scope.cmdSendToserver();
        //window.location = "#/invasive";
      }



      if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == true){
        let paymentSessionVitalTest = JSON.parse(localStorage.getItem("paymentSessionVitalTest"));
        console.log(paymentSessionVitalTest);

        if(paymentSessionVitalTest.includes('bpw')){
          if(vital.mode == 'spo2' && $rootScope.hardwareAvailability['SPo2'] == false){
            return 0;
          } 
          if(vital.mode == 'bp' && $rootScope.hardwareAvailability['Blood Pressure'] == false){
            return 0;
          } 
          if(vital.mode == 'w' && $rootScope.hardwareAvailability['Weight Scale'] == false){
            return 0;
          } 
          if(vital.mode == 'bmc' && $rootScope.hardwareAvailability['Body Composition'] == false && $rootScope.hardwareAvailability["FullBodyCompositionAnalyser"] == false){
            return 0;
          } 
          if(vital.mode == 'temp' && $rootScope.hardwareAvailability['temp'] == false){
            return 0;
          } 
          if(vital.mode == 'ekg' && $rootScope.hardwareAvailability['ECG'] == false){
            return 0;
          }   

          if($rootScope.selectedVital.indexOf(vital.mode) !== -1) {
            let idx = $rootScope.selectedVital.indexOf(vital.mode);
            $rootScope.selectedVital.splice(idx, 1);
            $scope.removeActiveClass(vital.mode);
            if($rootScope.selectedVital.length == 0){
              $scope.nextVisible = false;
            }
          } else {
            if($rootScope.selectedVital.indexOf("bpw") !== -1){
              $scope.removeFullTestActiveCalss(vital.mode);
            } else {
              $rootScope.selectedVital.push(vital.mode); 
              $scope.addActiveClass(vital.mode);
              $scope.nextVisible = true; 
              if($rootScope.selectedVital.length == 1){
                $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;     
              }    
        
              if($scope.avaliableModuleCount == $rootScope.selectedVital.length){
                $rootScope.selectedVital = ['bpw'];
                document.getElementById('bp_weight_test_btn').id = 'bp_weight_test_btn_active';
              }
            }
          }      
          //console.log($rootScope.selectedVital);
        }else{
         if(paymentSessionVitalTest.indexOf(vital.mode) == -1){
          return;
         }else{

            if(vital.mode == 'spo2' && $rootScope.hardwareAvailability['SPo2'] == false){
              return 0;
            } 
            if(vital.mode == 'bp' && $rootScope.hardwareAvailability['Blood Pressure'] == false){
              return 0;
            } 
            if(vital.mode == 'w' && $rootScope.hardwareAvailability['Weight Scale'] == false){
              return 0;
            } 
            if(vital.mode == 'bmc' && $rootScope.hardwareAvailability['Body Composition'] == false && $rootScope.hardwareAvailability["FullBodyCompositionAnalyser"] == false){
              return 0;
            } 
            if(vital.mode == 'temp' && $rootScope.hardwareAvailability['temp'] == false){
              return 0;
            } 
            if(vital.mode == 'ekg' && $rootScope.hardwareAvailability['ECG'] == false){
              return 0;
            }   

            if($rootScope.selectedVital.indexOf(vital.mode) !== -1) {
              let idx = $rootScope.selectedVital.indexOf(vital.mode);
              $rootScope.selectedVital.splice(idx, 1);
              $scope.removeActiveClass(vital.mode);
              if($rootScope.selectedVital.length == 0){
                $scope.nextVisible = false;
              }
            } else {
              if($rootScope.selectedVital.indexOf("bpw") !== -1){
                $scope.removeFullTestActiveCalss(vital.mode);
              } else {
                $rootScope.selectedVital.push(vital.mode); 
                $scope.addActiveClass(vital.mode);
                $scope.nextVisible = true; 
                if($rootScope.selectedVital.length == 1){
                  $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;     
                }    
          
                if($scope.avaliableModuleCount == $rootScope.selectedVital.length){
                  $rootScope.selectedVital = ['bpw'];
                  document.getElementById('bp_weight_test_btn').id = 'bp_weight_test_btn_active';
                }
              }
            }      
            // console.log($rootScope.selectedVital);
          }
        }
      }else{

      console.log(vital.mode);
      //alert(vital.mode);
      //if(vital.mode == 'spo2' || vital.mode == 'bp' || vital.mode == 'w' || vital.mode == 'bmc' || vital.mode == 'temp' || vital.mode == 'ekg'){
      //HigiKioskAnimationService.audioStop();
      //}
      if(vital.mode == 'spo2' && $rootScope.hardwareAvailability['SPo2'] == false){
        return 0;
      } 
      if(vital.mode == 'bp' && $rootScope.hardwareAvailability['Blood Pressure'] == false){
        return 0;
      } 
      if(vital.mode == 'w' && $rootScope.hardwareAvailability['Weight Scale'] == false){
        return 0;
      } 
      if(vital.mode == 'bmc' && $rootScope.hardwareAvailability['Body Composition'] == false && $rootScope.hardwareAvailability["FullBodyCompositionAnalyser"] == false){
        return 0;
      } 
      if(vital.mode == 'temp' && $rootScope.hardwareAvailability['temp'] == false){
        return 0;
      } 
      if(vital.mode == 'ekg' && $rootScope.hardwareAvailability['ECG'] == false){
        return 0;
      } 

      //if($rootScope.selectedVital == 'ekg' );
      /*if($rootScope.selectedVital == 'spo2' || $rootScope.selectedVital == 'bp' || $rootScope.selectedVital == 'w' || $rootScope.selectedVital == 'bmc' || $rootScope.selectedVital == 'temp' || $rootScope.selectedVital == 'ekg'){{
        
      }*/

      if($rootScope.selectedVital.indexOf(vital.mode) !== -1) {
        var idx = $rootScope.selectedVital.indexOf(vital.mode);
        $rootScope.selectedVital.splice(idx, 1);
        $scope.removeActiveClass(vital.mode);
        if($rootScope.selectedVital.length == 0){
          $scope.nextVisible = false;
        }
      } else {
        if($rootScope.selectedVital.indexOf("bpw") !== -1){
          $scope.removeFullTestActiveCalss(vital.mode);
        } else {
          $rootScope.selectedVital.push(vital.mode); 
          $scope.addActiveClass(vital.mode);
          $scope.nextVisible = true; 
          if($rootScope.selectedVital.length == 1){
          $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;     
        }    
          
          if($scope.avaliableModuleCount == $rootScope.selectedVital.length){
              $rootScope.selectedVital = ['bpw'];
              document.getElementById('bp_weight_test_btn').id = 'bp_weight_test_btn_active';
          }
        }
      }      

      // console.log($rootScope.selectedVital);
      $scope.welcomePageInstructionText = "welcome.Instruction.StartTest";
      $rootScope.IHLTeleConsultMainButtonClicked = false;
      $rootScope.ihlTeleconsultationSelectDeselect();

      //for kiosk vitals payment
      if ($rootScope.kioskWithPaymentMode) {
        $scope.getTotalAmountForVitalTest($rootScope.selectedVital);
      }
      }
    }

    $scope.addActiveClass = function(mode){
      console.log(mode);
      if(mode == "bp"){
          document.getElementById('bp_test_btn').id = 'bp_test_btn_active';
      } else if( mode == "w"){
          document.getElementById('weight_test_btn').id = 'weight_test_btn_active';
      } else if( mode == "ekg"){
          document.getElementById('ecg_test_btn').id = 'ecg_test_btn_active';
      } else if( mode == "bmc"){
          document.getElementById('bmc_test_btn').id = 'bmc_test_btn_active';
      } else if( mode == "spo2"){
          document.getElementById('spo2_test_btn').id = 'spo2_test_btn_active';
      } else if( mode == "temp"){
          document.getElementById('temp_test_btn').id = 'temp_test_btn_active';
      } else if(mode == 'ivt'){
        $scope.IHLInvasiveTestButtonClass = "invasive_test_button_active";
      } else if(mode == "bpw"){
          $rootScope.selectedVital = ['bpw'];
          document.getElementById('bp_weight_test_btn').id = 'bp_weight_test_btn_active';
          if(document.getElementById('bp_test_btn') != undefined){
             document.getElementById('bp_test_btn').id = 'bp_test_btn_active';
          }
          if(document.getElementById('weight_test_btn') != undefined){
             document.getElementById('weight_test_btn').id = 'weight_test_btn_active';
          }
          if(document.getElementById('ecg_test_btn') != undefined){
             document.getElementById('ecg_test_btn').id = 'ecg_test_btn_active';
          }
          if(document.getElementById('bmc_test_btn') != undefined){
             document.getElementById('bmc_test_btn').id = 'bmc_test_btn_active';
          }
          if(document.getElementById('spo2_test_btn') != undefined){
             document.getElementById('spo2_test_btn').id = 'spo2_test_btn_active';
          }
          if(document.getElementById('temp_test_btn') != undefined){
             document.getElementById('temp_test_btn').id = 'temp_test_btn_active';
          }
          if($scope.IHLInvasiveTestButtonClass == "invasive_test_button_deactive"){
            $scope.IHLInvasiveTestButtonClass = "invasive_test_button_active";
         }
      }
    }
    $scope.removeActiveClass = function(mode){
      if(mode == "bp"){
          document.getElementById('bp_test_btn_active').id = 'bp_test_btn';
      } else if( mode == "w"){
          document.getElementById('weight_test_btn_active').id = 'weight_test_btn';
      } else if( mode == "ekg"){
          document.getElementById('ecg_test_btn_active').id = 'ecg_test_btn';
      } else if( mode == "bmc"){
          document.getElementById('bmc_test_btn_active').id = 'bmc_test_btn';
      } else if( mode == "spo2"){
          document.getElementById('spo2_test_btn_active').id = 'spo2_test_btn';
      } else if( mode == "temp"){
          document.getElementById('temp_test_btn_active').id = 'temp_test_btn';
      } else if(mode == 'ivt'){
        $scope.IHLInvasiveTestButtonClass = "invasive_test_button_deactive";
        $rootScope.selectedIvtListArray = [];
      } else if(mode == "bpw"){
        $rootScope.selectedVital = [];
        $rootScope.selectedIvtListArray = [];
          document.getElementById('bp_weight_test_btn_active').id = 'bp_weight_test_btn';
          if(document.getElementById('bp_test_btn_active') != undefined){
             document.getElementById('bp_test_btn_active').id = 'bp_test_btn';
          }
          if(document.getElementById('weight_test_btn_active') != undefined){
             document.getElementById('weight_test_btn_active').id = 'weight_test_btn';
          }
          if(document.getElementById('ecg_test_btn_active') != undefined){
             document.getElementById('ecg_test_btn_active').id = 'ecg_test_btn';
          }
          if(document.getElementById('bmc_test_btn_active') != undefined){
             document.getElementById('bmc_test_btn_active').id = 'bmc_test_btn';
          }
          if(document.getElementById('spo2_test_btn_active') != undefined){
             document.getElementById('spo2_test_btn_active').id = 'spo2_test_btn';
          }
          if(document.getElementById('temp_test_btn_active') != undefined){
             document.getElementById('temp_test_btn_active').id = 'temp_test_btn';
          }
          if($scope.IHLInvasiveTestButtonClass == "invasive_test_button_active"){
            $scope.IHLInvasiveTestButtonClass = "invasive_test_button_deactive";
         }
      }
    }

    $scope.removeFullTestActiveCalss = function(mode){
      $rootScope.selectedVital = [];
      document.getElementById('bp_weight_test_btn_active').id = 'bp_weight_test_btn';
      if(mode == "bp"){
          document.getElementById('bp_test_btn_active').id = 'bp_test_btn';
      } else if( mode == "w"){
          document.getElementById('weight_test_btn_active').id = 'weight_test_btn';
      } else if( mode == "ekg"){
          document.getElementById('ecg_test_btn_active').id = 'ecg_test_btn';
      } else if( mode == "bmc"){
          document.getElementById('bmc_test_btn_active').id = 'bmc_test_btn';
      } else if( mode == "spo2"){
          document.getElementById('spo2_test_btn_active').id = 'spo2_test_btn';
      } else if( mode == "temp"){
          document.getElementById('temp_test_btn_active').id = 'temp_test_btn';
      } else if(mode == 'ivt'){
        $scope.IHLInvasiveTestButtonClass = "invasive_test_button_deactive";
      }

      if(document.getElementById('bp_test_btn_active') != undefined){ 
        $rootScope.selectedVital.push("bp");
        $scope.nextVisible = true;
      }
      if(document.getElementById('weight_test_btn_active') != undefined){
        $rootScope.selectedVital.push("w");
        $scope.nextVisible = true;
      }
      if(document.getElementById('ecg_test_btn_active') != undefined){
        $rootScope.selectedVital.push("ekg");
        $scope.nextVisible = true;
      }
      if(document.getElementById('bmc_test_btn_active') != undefined){
        $rootScope.selectedVital.push("bmc");
        $scope.nextVisible = true;
      }
      if(document.getElementById('spo2_test_btn_active') != undefined){
        $rootScope.selectedVital.push("spo2");
        $scope.nextVisible = true;
      }
      if(document.getElementById('temp_test_btn_active') != undefined){
        $rootScope.selectedVital.push("temp");
        $scope.nextVisible = true;
      }
      if($scope.IHLInvasiveTestButtonClass == "invasive_test_button_active"){
        $rootScope.selectedVital.push("ivt");
        $scope.nextVisible = true;
      }
    }

    /*$scope.initiateVitalTests = function () {
      $rootScope.mode = $rootScope.selectedVital[0];
      HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
      if( HigiKioskUserService.onboardingDone()){               
          console.log("login onboardingDone if");
          console.log("Mode: " + $rootScope.mode);
            if($rootScope.mode == "w") {
                 window.location = "#/weight1/forward";
            } else if ($rootScope.mode == "bp") {
                 window.location = "#/bloodpressure1/forward";
            } else if ($rootScope.mode == "ekg") {
                window.location = "#/zugecgmode/forward";
            } else if ($rootScope.mode == "bmc") {
                 window.location = "#/weight1/forward";
            } else if ($rootScope.mode == "spo2") {
                 window.location = "#/spotwo1/forward";
            } else if ($rootScope.mode == "temp") {
                 window.location = "#/temp1/forward";
            } else if ($rootScope.mode == "bpw") {
                var currenttest;
                window.location = HigiKioskFlow.nextTest(rootScope.mode,currenttest);
            }
        } else {
            window.location =  "#/onboarding1/forward/enter";
        }
    }*/

    //select mode end by deepak
$scope.checkHardwareAvailablity =   function(){
    $rootScope.showLoadScreen = true;
    $scope.notResHW = [];
    $scope.hardwareAvaCheckCount = 0;
    $scope.hardwareAvaResCount = 0;
    if($rootScope.selectedVital.includes("bpw")){
        if($rootScope.hardwareAvailability["SPo2"]){
              $scope.hardwareAvaCheckCount++;
              JkioskService.callFindSpO2HardwareFunction($scope.spO2HardwareAvailability);
        }
        if($rootScope.hardwareAvailability["ECG"]){
            $scope.hardwareAvaCheckCount++;
            JkioskService.callFindECGHardwareFunction($scope.ECGHardwareAvailability);
        }
    }

    /*if($rootScope.selectedVital.includes("bmc")){
        $scope.hardwareAvaCheckCount++;
    }*/

    if($rootScope.selectedVital.includes("spo2")){
        $scope.hardwareAvaCheckCount++;
         JkioskService.callFindSpO2HardwareFunction($scope.spO2HardwareAvailability);
    }
    if($rootScope.selectedVital.includes("ekg")){
        $scope.hardwareAvaCheckCount++;
        JkioskService.callFindECGHardwareFunction($scope.ECGHardwareAvailability);
    }

    // if($rootScope.selectedVital.includes("bmc")){
        
    // }
    if( $scope.hardwareAvaCheckCount == 0){
        $scope.initateLoginFlow();
    }
    
}

$scope.spO2HardwareAvailability = function(response){
    //response.Spo2StatusDuringTest = false;
    $scope.hardwareAvaResCount++;
    if(response.Spo2StatusDuringTest == false){    
        $scope.notResHW.push("SpO2");    
        if(!$rootScope.selectedVital.includes("bpw")){
            let idx = $rootScope.selectedVital.indexOf("spo2");
            $rootScope.selectedVital.splice(idx, 1);
        }        
        $scope.removeActiveClass("spo2");
        document.getElementById("spo2_test_btn").id = "noSpo2";
        if($rootScope.selectedVital.length == 0){
           $scope.nextVisible = false;
        }
        $rootScope.hardwareAvailability["SPo2"] = false;
    }
    if($scope.hardwareAvaCheckCount == $scope.hardwareAvaResCount){
        $scope.initateLoginFlow();
    }
}

$scope.ECGHardwareAvailability =  function(response){    
   $scope.hardwareAvaResCount++
    //response.ZUGECGStatusDuringTest = false;    
    if(response.ZUGECGStatusDuringTest == true && $rootScope.hardwareAvailability["SwitchHardware"]){
        //alert("avaiable");
    } else {
        //alert("not avaiable");
        $scope.notResHW.push("ECG");
        if(!$rootScope.selectedVital.includes("bpw")){
            let idx = $rootScope.selectedVital.indexOf("ekg");
            $rootScope.selectedVital.splice(idx, 1);
        }        
        $scope.removeActiveClass("ekg");
        document.getElementById("ecg_test_btn").id = "noECG";
        if($rootScope.selectedVital.length == 0){
           $scope.nextVisible = false;
        }                
         $rootScope.hardwareAvailability["ECG"] = false;
    }
    if($scope.hardwareAvaCheckCount == $scope.hardwareAvaResCount){
        $scope.initateLoginFlow();
    }
}

$scope.initateLoginFlow = function(){
    $rootScope.showLoadScreen = false;
    if($scope.notResHW.length > 0){
        $scope.warningText = $scope.notResHW.toString(); 
        if ($rootScope.kioskWithPaymentMode) {
            $scope.getTotalAmountForVitalTest($rootScope.selectedVital);
        }
        $("#SpO2NotAvailable").show();
        setTimeout(function(){
            $("#SpO2NotAvailable").hide();
            if($rootScope.selectedVital.length > 0){
                setTimeout(function(){
                    $scope.loginButtonClick();
                }, 1* 1000)
            }
        }, 5 * 1000);
    } else {
        $scope.loginButtonClick();
    }    
}
    $scope.weight = function(response){
      console.log("Weight "+response);

    }
    $scope.platformReadyWatch = function(newVal){
        if(newVal !=  undefined){
            $scope.setShared({name : 'isHigi', value : HigiKioskUtilitiesService.isHigiGreen()});      
            setTimeout(function(){
                $scope.init();
            }, 3000);
        }
    };

    $scope.ihlTeleconsultationButtonSelect = function(){
      $rootScope.kioskVitalTestCost = 0;
      var kioskOnlineStatusCheck =function (resp) {          
        if (resp.apiStatus === "Online") {
          $rootScope.IHLTeleConsultMainButtonClicked = !$rootScope.IHLTeleConsultMainButtonClicked;
        } else {
          $timeout.cancel($scope.kioskApiToolTipTimeout);
          $rootScope.IHLTeleConsultMainButtonClicked = false;
          $scope.kioskApiNotAvailableTipVisible = !$scope.kioskApiNotAvailableTipVisible;
          if ($scope.kioskApiNotAvailableTipVisible) {
            $scope.kioskApiToolTipTimeout = $timeout(function () {
              $scope.kioskApiNotAvailableTipVisible = false;
            }, 3000);
          }
        }
      };
      JkioskService.apiStatus(kioskOnlineStatusCheck); 
      $rootScope.ihlTeleconsultationSelectDeselect();
    }

    $rootScope.ihlTeleconsultationSelectDeselect = function(){
      $rootScope.kioskVitalTestCost = 0;
      if ($rootScope.IHLTeleConsultMainButtonClicked) {
        $scope.IHLTeleConsultMainButtonClass = "teleconsult_main_button_active";
        $rootScope.IHLTeleConsultSelected = true;
        $scope.WelcomeButtonStartTest = "welcome.StartConsultNow";
        $scope.welcomePageInstructionText = "welcome.Instruction.StartConsult";
        $scope.nextVisible = true;
        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope).promise;
        var vitalButtons = [
          'bp_test_btn',
          'weight_test_btn',
          'ecg_test_btn',
          'bmc_test_btn',
          'spo2_test_btn',
          'temp_test_btn',
          'bp_weight_test_btn'
        ];
        for (var i = 0; i < vitalButtons.length; i++) {
          if (document.getElementById(vitalButtons[i]+'_active')) {
            console.log(document.getElementById(vitalButtons[i]+'_active').id);
            document.getElementById(vitalButtons[i]+'_active').id = vitalButtons[i];
          }
        }
        $rootScope.selectedVital = [];
      }else{
        $scope.IHLTeleConsultMainButtonClass = "teleconsult_main_button_deactive";
        $rootScope.IHLTeleConsultSelected = false;
        if ($rootScope.selectedVital.length == 0) {
          $scope.nextVisible = false;
          $scope.welcomePageInstructionText = "welcome.Instruction";
        } 
        $scope.WelcomeButtonStartTest = "welcome.startTest";
      } 
    }

    //for kiosk vitals payment
    $scope.listPriceForVitalTest = function(){
      $rootScope.vitalPriceFetching = true;
      if ($rootScope.uniqueKioskId != undefined && String($rootScope.uniqueKioskId).trim().length > 0) {
        //let kioskID="7777";
        let kioskID = $rootScope.uniqueKioskId;
        let objToReceivePriceList = {
          "KioskId": kioskID
        };
        let vitalPriceObjectOfThisKiosk;

        let success_fn = function(res){
          let data = JSON.parse(res.replace(/&quot;/g, '"'));
          console.log(data);
          if (data.fullArray.length > 0) {
            vitalPriceObjectOfThisKiosk = data.fullArray.find(obj => {
              return obj.KioskId == kioskID;
            });
            if(vitalPriceObjectOfThisKiosk['gst_print_external']){
               $rootScope.externalPrinterName = vitalPriceObjectOfThisKiosk['gst_print_external'];
            }
            console.log(vitalPriceObjectOfThisKiosk);
            if(vitalPriceObjectOfThisKiosk['enable_teleconsultaion'] === "true") $rootScope.enableTeleConsultation = true;
            else $rootScope.enableTeleConsultation = false;
            
            if(vitalPriceObjectOfThisKiosk['enable_global_service'] === "true") $rootScope.enableGlobalService = true;
            else $rootScope.enableGlobalService = false;

            $rootScope.hpodAffiliations = (vitalPriceObjectOfThisKiosk['hpod_affiliations'])? JSON.parse(vitalPriceObjectOfThisKiosk['hpod_affiliations'].replace(/(\n)/g,"")) : []; 
            $rootScope.globalServiceTeleConsult = JSON.parse(vitalPriceObjectOfThisKiosk['global_Service']);
            
            $rootScope.GSTno = vitalPriceObjectOfThisKiosk['gst_number'];
            $rootScope.GSTaddress = vitalPriceObjectOfThisKiosk['below_logo_text'];


            if(vitalPriceObjectOfThisKiosk['lab_partner_logo'] != null && vitalPriceObjectOfThisKiosk['lab_partner_name'] != null &&
                vitalPriceObjectOfThisKiosk['lab_partner_logo'] != "" && vitalPriceObjectOfThisKiosk['lab_partner_name'] != "") {
                $rootScope.buyMedLabAndMedicationPartnerObj['lab_partner_logo'] = vitalPriceObjectOfThisKiosk['lab_partner_logo'];                
                $rootScope.buyMedLabAndMedicationPartnerObj['lab_partner_name'] = vitalPriceObjectOfThisKiosk['lab_partner_name'].replace(/&amp;/g, '&');
            } else {
                $rootScope.buyMedLabAndMedicationPartnerObj['lab_partner_logo'] = null;
                $rootScope.buyMedLabAndMedicationPartnerObj['lab_partner_name'] = null;
            }
            if(vitalPriceObjectOfThisKiosk['medication_partner_logo'] != null && vitalPriceObjectOfThisKiosk['medication_partner_name'] != null &&
                vitalPriceObjectOfThisKiosk['medication_partner_logo'] != "" && vitalPriceObjectOfThisKiosk['medication_partner_name'] != "") 
            {
                $rootScope.buyMedLabAndMedicationPartnerObj['medication_partner_logo'] = vitalPriceObjectOfThisKiosk['medication_partner_logo'];
                $rootScope.buyMedLabAndMedicationPartnerObj['medication_partner_name'] = vitalPriceObjectOfThisKiosk['medication_partner_name'].replace(/&amp;/g, '&');;
            } else {
                $rootScope.buyMedLabAndMedicationPartnerObj['medication_partner_logo'] = 'images/teleconsultation/1mg-logo-large.png';
                $rootScope.buyMedLabAndMedicationPartnerObj['medication_partner_name'] = "1MG";
            }         
            
            if(vitalPriceObjectOfThisKiosk['teleconsult_vendor'] != "" && vitalPriceObjectOfThisKiosk['teleconsult_vendor'] != null) {
                if(vitalPriceObjectOfThisKiosk['teleconsult_vendor'].includes(',')) {
                    let vendorList_string = vitalPriceObjectOfThisKiosk['teleconsult_vendor'].split(',');
                    $rootScope.availableVendorList = vendorList_string;                                    
                }
                else {
                    $rootScope.availableVendorList.push(vitalPriceObjectOfThisKiosk['teleconsult_vendor']);
                }
            }

            $rootScope.printingVitalAndPresCostObj = {
                prescription_free_print : vitalPriceObjectOfThisKiosk['prescription_free_print'],
                prescription_print_cost_external : vitalPriceObjectOfThisKiosk['prescription_print_cost_external'],
                prescription_print_cost_inbuilt : vitalPriceObjectOfThisKiosk['prescription_print_cost_inbuilt'],
                vital_free_print : vitalPriceObjectOfThisKiosk['vital_free_print'],
                vital_print_cost_external : vitalPriceObjectOfThisKiosk['vital_print_cost_external'],
                vital_print_cost_inbuilt : vitalPriceObjectOfThisKiosk['vital_print_cost_inbuilt']
            };

            if (vitalPriceObjectOfThisKiosk != undefined && vitalPriceObjectOfThisKiosk != null && Object.keys(vitalPriceObjectOfThisKiosk).length > 0) {
              if($rootScope.vitalPayment) {
                  for (let key in $scope.buttons) {
                      if ($scope.buttons[key]['name'] in vitalPriceObjectOfThisKiosk) {
                          $scope.buttons[key]['price'] = vitalPriceObjectOfThisKiosk[$scope.buttons[key]['name']];
                      }
                  }
              }
              $rootScope.AuthorizationCodeCash = vitalPriceObjectOfThisKiosk['Authorization_Code_Cash'];
              $rootScope.AuthorizationCodeSkip = vitalPriceObjectOfThisKiosk['Authorization_Code_Skip'];
              
              
              if (vitalPriceObjectOfThisKiosk['user_id'] != null && vitalPriceObjectOfThisKiosk['user_id'] != undefined && vitalPriceObjectOfThisKiosk['user_id'].trim().length > 0) {
                $rootScope.kioskPaymentUserId = vitalPriceObjectOfThisKiosk['user_id'];
              }else{
                $rootScope.kioskPaymentUserId = "9866232809";
              }

              if (vitalPriceObjectOfThisKiosk['password'] != null && vitalPriceObjectOfThisKiosk['password'] != undefined && vitalPriceObjectOfThisKiosk['password'].trim().length > 0) {
                $rootScope.kioskPaymentPassword = vitalPriceObjectOfThisKiosk['password'];
              }else{
                $rootScope.kioskPaymentPassword = "5025";
              }

              $("#kioskVitalPriceNotAvailableModal").hide();
              $rootScope.vitalPriceFetching = false;
            }
          }else{
            console.log("Price list array is empty");
            if($rootScope.vitalPayment) {
                $("#kioskVitalPriceNotAvailableModal").show();
            } else {                
                $("#kioskVitalPriceNotAvailableModal").hide();
            }
            $rootScope.vitalPriceFetching = false;
          }
        }
//vitalPayment
            let error_fn = function(err){
            console.log(err);
            if($rootScope.vitalPayment) {
                $("#kioskVitalPriceNotAvailableModal").show();
            } else {                
                $("#kioskVitalPriceNotAvailableModal").hide();
            }
            $rootScope.vitalPriceFetching = false;
        }
        HigiApiService.getKioskVitalTestPrice(objToReceivePriceList, success_fn, error_fn);
      }else{
            console.log("kiosk ID is not available");
            if($rootScope.vitalPayment) {
                $("#kioskVitalPriceNotAvailableModal").show();
            } else {                
                $("#kioskVitalPriceNotAvailableModal").hide();
            }
            $rootScope.vitalPriceFetching = false;
        }
    }
    $rootScope.listPriceForVitalTest = $scope.listPriceForVitalTest;
    
    //for kiosk vitals payment
    $scope.getTotalAmountForVitalTest = function(vitals){
      $rootScope.kioskVitalTestCost = 0;
      $rootScope.totalMrpCost = 0;
      //console.log(vitals);
      let selectedVitals = $scope.buttons.filter(item => vitals.includes(item.mode));
      if (selectedVitals.length > 0) {
        let priceForAllSelectedTest = selectedVitals.map(obj => {return obj.price});
        let totalPriceForAllSelectedTest = priceForAllSelectedTest.reduce((total, value) => {return Number(total) + Number(value)});

        if(vitals.includes('ivt')){
          let from_index = vitals.indexOf('ivt');
          let to_index = 0;
          let el = vitals.splice(from_index, 1)[0];
          vitals.splice(to_index, 0, el);
        }

        console.log(vitals);

        $rootScope.kioskVitalTestCost = totalPriceForAllSelectedTest;
        //discount option variable
        $rootScope.totalMrpCost = totalPriceForAllSelectedTest;
      }
     // console.log($rootScope.kioskVitalTestCost);
    };

      
    HigiKioskStorageService.watchSessionData('kioskConfigurationResult', $scope.platformReadyWatch);
    HigiKioskStorageService.saveSessionData('higiPageName', 'HigiKioskWelcome');

    //For New Multi-Printer Functionality
   /* $scope.sampleFunction = function(){
      
      $rootScope.printerService.getMultiPrinterConfigurationDetails("invoice", //vitalOrPrescription
        (response) =>{//thermal, a4
          //alert("success "+ response);
          let html_template = "<!DOCTYPE html><html><body style='width:372px; box-sizing: border-box;'><p>content</p></body></html>";

          const printerTemplateObject = {
            thermalPrinterTemplate: html_template,
            a4PrinterTemplate: html_template
          }
          $rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
        }, 
        (error) => {//technical_issue, paper_not_available
          //alert("error "+ error);
        }
      );
    }*/



    // var ivt = ['heamo','lip', 'glc','deng','mal','hiv','hcv','syph','trop','preg','urn'];
    var ivtIndex = 0;
    // $rootScope.selectedVital = [ivt, 'w', 'bp'] //all vitals
    
    


    $scope.cmdSendToserver = function(){		
		const socket = new WebSocket("ws://localhost:8444/paramWS/");
      socket.onopen = function(e) {
          //alert("[open] Connection established");
          //alert("Sending to server");  
          //$scope.socketConnEstablished = true;
           window.location = "#/invasive";
      };
	  
		socket.onerror = function(error) {
		  //alert(`[error]`);
			$scope.showInvasiveErrorHint = true;
			$timeout(function() {
			  $scope.showInvasiveErrorHint = false;
			}, 2000);	 
		};
		  
	  
	  
      //$scope.socketConnEstablished = false;
      // $scope.socketConnEstablished = true;
      // return 'apple';

      // if($scope.socketConnEstablished){
      //     var servercmd = HigiKioskUtilitiesService.getCmd($rootScope.selectedVital.ivt[ivtIndex]);
      //     socket.send(servercmd);
      // }else{
      //     alert("some technical issue.. Please try again");//no socket connection established
      // }
    }
    // $scope.init = function(){       

      

    //   socket.onclose = function(event) {
    //       if (event.wasClean) {
    //         alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    //       } else {
    //         alert('[close] Connection died');
    //       }
    //     };
        
    //   socket.onerror = function(error) {
    //       alert(`[error]`);
    //   }; 
    // }



}]);
