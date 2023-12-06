var higiServices = angular.module("higiKioskUi");

higiServices.factory('JkioskService', ['$http' , '$rootScope', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', '$route', '$q', '$timeout', function($http, $rootScope, HigiKioskUtilitiesService, HigiKioskStorageService, $route, $q, $timeout) {
    return {
        /*
         *
         * Logging and Analytics
         *
         */


        logStartScreen: function (screenName) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                screenName = 'ADA_' + screenName;
            }
            console.log("start screen: " + screenName);
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), 'app', 'screenDisplayed', screenName);
            $rootScope.loggedEvents.unshift({sessionId : HigiKioskStorageService.returnSessionData('sessionId'), senderId :'app', eventCategory : 'screenDisplayed', eventName : screenName});
        },

        logStartSession: function () {
            console.log("start session");
            jkiosk.startSession();
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), 'app', 'session', 'started');

        },

        logEndSession: function () {
            console.log("end session");
            jkiosk.endSession();
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), 'app', 'session', 'ended');
        },
        logEvent: function (senderId, eventCategory, eventName) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }

            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, eventCategory, eventName);
            $rootScope.loggedEvents.unshift({sessionId : HigiKioskStorageService.returnSessionData('sessionId'), senderId : senderId, eventCategory : eventCategory, eventName : eventName});
            console.log(HigiKioskStorageService.returnSessionData('sessionId') + " , " + senderId + " , " + eventCategory + " , " + eventName);

        },
        logAdEvent: function (senderId, eventCategory, eventName) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
           
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }
            //Send everything else to our API
            var userId = (HigiKioskStorageService.returnSessionData('user') != undefined) ? HigiKioskStorageService.returnSessionData('user').id : "";
            console.log(HigiKioskStorageService.returnSessionData('sessionId') + " , " + senderId + " , " + eventCategory + " , " + eventName);
            HigiApi.LogAdEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, eventCategory, eventName, userId);
            console.log("last in logAdEvent");    

        },


        logInfo: function (senderId, actionName, message) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }
            jkiosk.logInfo(senderId, actionName, message);
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, 'info', actionName);
        },

        logWarn: function (senderId, actionName, message) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }
            jkiosk.logWarn(senderId, actionName, "theDetails : " + message);
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, 'warn', actionName);
        },

        logError: function (senderId, actionName, message) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }
            jkiosk.logError(senderId, actionName, message);
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, 'error', actionName);
        },
        apiStatus : function(callback){
            var q = $q.defer();
            if(typeof(callback) === "function"){
                var apiAvailableCallback = function(response){
                    callback(response);
                    HigiKioskStorageService.saveSessionData('apiAvailable', (response.apiStatus === "Online"));
                    q.resolve();
                };

            } else {
                var apiAvailableCallback = function(response){
                    HigiKioskStorageService.saveSessionData('apiAvailable', (response.apiStatus === "Online"));
                    q.resolve();
                };
            }

            jkiosk.apiStatus(apiAvailableCallback);
            return q;
        },

        logFatal: function (senderId, actionName, message) {
            //Prefix 'ADA_' if the kiosk is in ADA Mode
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }
            jkiosk.logFatal(senderId, actionName, message);
            HigiApi.LogEventAsync(HigiKioskStorageService.returnSessionData('sessionId'), senderId, 'fatal', actionName);
        },


        sessionAdPlayed : function(request){
            jkiosk.sessionAdPlayed(request);
        },
        getWeightScaleStatus: function (weightScaleChange, weightScaleResult) {
            var __this = this;
            jkiosk.getWeightScaleStatus(function (status) {
                if (status.isAvailable) {
                    startMilliseconds = new Date().valueOf();

                    // The function we want to be called when we get a result
                    jkiosk.startWeightScale(weightScaleChange, weightScaleResult);
                }
                else {
                    __this.logEvent('weightScale_2', 'error', 'unavailable');

//                    clearAllTimeouts();
//                    displayErrorDialog(function () {
//                        errorDialogClosed();
//                    });
                }
            });

        },
        startWeightScale: function (weightScaleChange, weightScaleResult) {
            jkiosk.startWeightScale(weightScaleChange, weightScaleResult);

        },

        //printer
        callPrintPaperStatusFunction: function (onPrinterPaperStatus){
            jkiosk.getPrinterPaperStatus(onPrinterPaperStatus);
        },

        // fingerprint start
        fingerprintCapture: function(fingerprintCaptureRes){
            jkiosk.fingerprintCapture(fingerprintCaptureRes);
        },
        // fingerprint end

        getPulseOximeterFinalResult: function (finalValueTriggerCallback) {
            jkiosk.getPulseOximeterFinalResult(finalValueTriggerCallback);

        }, 

        getPulseOximeterHandDetect: function (changeValueCallBack, LiveValueReached, getPulseOximeterFinalResultKiosk, spo2HandsNotDetectedCallBack) {
            jkiosk.getPulseOximeterHandDetect(changeValueCallBack, LiveValueReached, getPulseOximeterFinalResultKiosk, spo2HandsNotDetectedCallBack);
        },
        callFindSpO2HardwareFunction: function (findSpO2HardwareAvailability) {
           // alert("kiosk jkiosk");
            jkiosk.callFindSpO2HardwareFunction(findSpO2HardwareAvailability);
        },
        callZugSpo2emergencyStopFunction: function (ZugSpo2emergencyStopCallbackFunction){  //new
            jkiosk.callZugSpo2emergencyStopFunction(ZugSpo2emergencyStopCallbackFunction);
        },
         callFindECGHardwareFunction: function (findECGHardwareAvailability) {
           // alert("kiosk jkiosk");
            jkiosk.callFindECGHardwareFunction(findECGHardwareAvailability);
        },
        getPulseOximeterStatus: function (pulseOximeterChange, pulseOximeterResult) {
            var __this = this;
            jkiosk.getPulseOximeterStatus(function (status) {
                if (status.isAvailable) {
                    startMilliseconds = new Date().valueOf();

                    // The function we want to be called when we get a result
                    jkiosk.startPulseOximeter(pulseOximeterChange, pulseOximeterResult);
                }
                else {
                    __this.logEvent('pulseOximeter_2', 'error', 'unavailable');

//                    clearAllTimeouts();
//                    displayErrorDialog(function () {
//                        errorDialogClosed();
//                    });
                }
            });

        },

        startPulseOximeter: function (pulseOximeterChange, pulseOximeterResult) {
            jkiosk.startPulseOximeter(pulseOximeterChange, pulseOximeterResult);

        },

        getTermometerStatus: function (termometerChange, termometerResult) {
            var __this = this;
            jkiosk.getTermometerStatus(function (status) {
                if (status.isAvailable) {
                    startMilliseconds = new Date().valueOf();

                    // The function we want to be called when we get a result
                    jkiosk.startTermometer(termometerChange, termometerResult);
                }
                else {
                    __this.logEvent('termometer_2', 'error', 'unavailable');

//                    clearAllTimeouts();
//                    displayErrorDialog(function () {
//                        errorDialogClosed();
//                    });
                }
            });

        },
        startTermometer: function (termometerChange, termometerResult) {
            jkiosk.startTermometer(termometerChange, termometerResult);
        },
        callZugECGReadAbortFunction: function (ZugECGReadAbortCompleteCallbackFunction){
            jkiosk.callZugECGReadAbortFunction(ZugECGReadAbortCompleteCallbackFunction);
        },
        callZugECGSwitchOnFunction: function (ECGSwitchOnCallbackFunction){  
            jkiosk.callZugECGSwitchOnFunction(ECGSwitchOnCallbackFunction);
        },
        callZugECGSwitchOffFunction: function (ECGSwitchOffCallbackFunction){
            jkiosk.callZugECGSwitchOffFunction(ECGSwitchOffCallbackFunction);
        },
        callZugECGemergencyStopFunction: function (ZugECGemergencyStopCallbackFunction){  //new
            jkiosk.callZugECGemergencyStopFunction(ZugECGemergencyStopCallbackFunction);
        },
        callFullBodyBMCFootWearStatusFunction: function (ZugECGLeftJackStatusCallbackFunction){
            jkiosk.callFullBodyBMCFootWearStatusFunction(ZugECGLeftJackStatusCallbackFunction);
        },
        callZugECGRightJackStatusFunction: function (ZugECGRightJackStatusCallbackFunction){
            jkiosk.callZugECGRightJackStatusFunction(ZugECGRightJackStatusCallbackFunction);
        },
        callZugECGLegONStatusFunction: function (ZugECGLegONStatusCallbackFunction){
            jkiosk.callZugECGLegONStatusFunction(ZugECGLegONStatusCallbackFunction);
        },
        callZugECGLegOFFStatusFunction: function (ZugECGLegOFFStatusCallbackFunction){
            console.log("legoffkioskjkiosk");

            jkiosk.callZugECGLegOFFStatusFunction(ZugECGLegOFFStatusCallbackFunction);
        },
        callZugECGHandDetetectFunction: function (callbackOfHandDetection, zugLiveDataCallBack,LeadMode,leadToRead, zugValidationResultsCallback, ZugECGBPMResultsCallBack, ZugECGReadAbortCompleteCallbackFunction, ZugECGBadReadAbortCompleteCallbackFunction,performTimerAbortResponseCallBack,amplitudeLevelResponseCallBack,sixLeadLiveDataCallBack) {
            console.log("line 247 sending command for ECG hand detection from kiosk-jkiosk");  

            jkiosk.callZugECGHandDetetectFunction(callbackOfHandDetection, zugLiveDataCallBack, LeadMode, leadToRead, zugValidationResultsCallback, ZugECGBPMResultsCallBack, ZugECGReadAbortCompleteCallbackFunction, ZugECGBadReadAbortCompleteCallbackFunction,performTimerAbortResponseCallBack,amplitudeLevelResponseCallBack,sixLeadLiveDataCallBack);
        },

        FilteredDataForECG:function(FilteredDataForECGCallback,full_data,readingLead){
            jkiosk.FilteredDataForECG(FilteredDataForECGCallback,full_data,readingLead);
        },

        callZugECGSwitchAbortFunction: function (ZugECGSwitchAbortCompleteCallbackFunction){
            jkiosk.callZugECGSwitchAbortFunction(ZugECGSwitchAbortCompleteCallbackFunction);
        },
        getSkinTemperatureStatus: function (skintemperatureCallBack, roomtemperatureCallBack, changetemperatureCallBack) {
            jkiosk.getSkinTemperatureStatus(skintemperatureCallBack, roomtemperatureCallBack, changetemperatureCallBack);
        },

        getForeheadSkinTemperatureStatus: function (onSkinTemperatureCallback, foreheadTemperatureStop) {
            jkiosk.getForeheadSkinTemperatureStatus(onSkinTemperatureCallback, foreheadTemperatureStop);
        },
		
		foreheadTemperatureStop: function(onSkinTemperatureStopCallback) {
            jkiosk.foreheadTemperatureStop(onSkinTemperatureStopCallback);
		},

        getSkinTemperatureProgress: function (skintemperatureCallBack, roomtemperatureCallBack, changetemperatureCallBack) {
            jkiosk.getSkinTemperatureProgress(skintemperatureCallBack, roomtemperatureCallBack, changetemperatureCallBack);
        },

        startBodyComposition : function(birthDate, heightCm, weightKg, isMale, activityLevel, handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback){
            jkiosk.startBodyComposition(birthDate, heightCm, weightKg, isMale, activityLevel, handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback);
        },

        stopBodyComposition : function(stopBodyCompCallbackFunction){
            console.log("kiosk-jkiosk - StopBMC");
            jkiosk.stopBodyComposition(stopBodyCompCallbackFunction);
        },

        setBmcFrequency250: function (setBmcFrequency250CallbackFunction) {
            jkiosk.setBmcFrequency250(setBmcFrequency250CallbackFunction);
        },

        setBmcFrequency50: function (setBmcFrequency50CallbackFunction) {
           jkiosk.setBmcFrequency50(setBmcFrequency50CallbackFunction);
        },

        setBmcFrequency625: function (setBmcFrequency625CallbackFunction) {
            jkiosk.setBmcFrequency625(setBmcFrequency625CallbackFunction);
        },
        readResistance: function (handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {
            jkiosk.readResistance(handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback);
        },
        stopReadResistance: function (stopReadResistanceCallback) {
            jkiosk.stopReadResistance(stopReadResistanceCallback);
        },

        restartOs : function(reStartCallbackFunction){
            console.log("kiosk-jkiosk - restartOs");
            jkiosk.restartOs(reStartCallbackFunction);
        },
        getBPStatus: function (onStatusCallback) {
            jkiosk.getBPStatus(onStatusCallback);
        },

        startBp: function (change, result, error) {
            jkiosk.startBP(change, result, error);

        },

        zugBPstop: function(zugBPStop){
            jkiosk.stopBP(zugBPStop);            
        },

        getAd: function (callback, adSpotId, state) {
            jkiosk.getAd(callback, adSpotId, state);
        },

        getAdConcurrent: function (callback, adSpotId, state, promise) {

            //if promise passed in, combine promise resovle with callback
            if(promise != undefined){
                var temp = callback;
                callback = function(resp){
                    temp(resp);
                    promise.resolve(resp.hasAd);
                }
            }
            jkiosk.getAdConcurrent(callback, adSpotId, state);
        },

        getChallengeAd : function(HigiKioskUserService, q){

            if(HigiKioskStorageService.returnSessionData('challengeAdTerms') == undefined || HigiKioskStorageService.returnSessionData('challengeModalAd') == undefined){
                //Get challenge at terms if they exist.
                var _this = this;



                var setChallengeAdTerms = function(result){
                    if(result.hasAd == 'true'){
                        //Set challenge terms object
                        HigiKioskStorageService.saveSessionData('challengeAdTerms', result);
                        //Get challenge ad if they exist.
                    }
                    else {
                        HigiKioskStorageService.saveSessionData('hasChallenge', false);
                    }
                    termsPromise.resolve();
                };

                var setChallengeAd = function(result){
                    if(result.hasAd == 'true'){
                        HigiKioskStorageService.saveSessionData('challengeModalAd', result);

                        //Ensure challengeId exists
                        if(result.challengeId != null && result.challengeId != undefined && result.challengeId != ""){
							
                            HigiKioskStorageService.saveSessionData('hasChallenge', false);
                        } else {
                            _this.logEvent($rootScope.higiPageName + "_get_challenge_ad", "error", "challengeId is " + result.challengeId.toString() );
                            HigiKioskStorageService.saveSessionData('hasChallenge', false);
                        }
                    } else {
                        HigiKioskStorageService.saveSessionData('hasChallenge', false);
                    }
                    postLoginPromise.resolve();
                };
                var setChallengeAdFinal = function(result){
                    if(result.hasAd == 'true'){
                        HigiKioskStorageService.saveSessionData('challengeModalAdFinal', result);
                        //Ensure challengeId exists
                        if(result.challengeId != null && result.challengeId != undefined && result.challengeId != ""){
                            HigiKioskStorageService.saveSessionData('hasChallenge', true);
                        } else {
                            _this.logEvent($rootScope.higiPageName + "_get_challenge_ad_final", "error", "challengeId is " + result.challengeId.toString() );
                            HigiKioskStorageService.saveSessionData('hasChallenge', false);
                        }
                    }
                    else {
                        HigiKioskStorageService.saveSessionData('hasChallenge', false);
                    }
                    finalResultsPromise.resolve();
                };

                var termsPromise =  $q.defer();
                var postLoginPromise = $q.defer();
                var finalResultsPromise = $q.defer();

                _this.getAdConcurrent(setChallengeAd, "challenge_post_login", HigiKioskUserService.getAdDataObjectForSlide("slide_challenge_post_login"));
                //_this.getAdConcurrent(setChallengeAdFinal, "challenge_final", HigiKioskUserService.getAdDataObjectForSlide("slide_challenge_final"));
                _this.getAdConcurrent(setChallengeAdTerms, "challenge_rules", HigiKioskUserService.getAdDataObjectForSlide("slide_challenge_rules"));

                var adsDone = $q.all([termsPromise.promise, postLoginPromise.promise]);
                //var adsDone = $q.all([termsPromise.promise, postLoginPromise.promise, finalResultsPromise.promise]);
                adsDone.then(function(){
                    if(q != undefined){
                        q.resolve();
                    }
                });

            } else {
                if(q != undefined){
                    q.resolve();
                }
            }


        },
        queueHttp : function(request){
            jkiosk.queueHttp(request)
        },


        /**********************************************
         shutdown Hpod using barcodeReader device start
        ***********************************************/     
        initShutdown:function(initShutdownRes){
            //alert("test2");
            jkiosk.initShutdown(initShutdownRes);        
        },
        shutdownExeTrigger:function(){
            jkiosk.shutdownExeTrigger();                    
        },
        shutdownHPodExeTrigger:function(){
            jkiosk.shutdownHPodExeTrigger();                    
        },
        /**********************************************
         shutdown Hpod using barcodeReader device end
        ***********************************************/ 

    
        /******************************
         telemedi for gem3s start
        *******************************/ 
        gen3slogin:function(gen3sloginRes, payload){
            jkiosk.gen3slogin(gen3sloginRes, payload);        
        },
        
        gem3sPatientReg:function(patientregisterRes, patientreg){
            jkiosk.gem3sPatientReg(patientregisterRes, patientreg);
        },

        gem3slistofspecilality: function(gem3slistofspecilalityRes,token){        
            jkiosk.gem3slistofspecilality(gem3slistofspecilalityRes,token);
        },
        gem3sDoctorBasedSapeciality:function(gem3sDoctorBasedSapecialityRes, doctorspecial,token){
            jkiosk.gem3sDoctorBasedSapeciality(gem3sDoctorBasedSapecialityRes, doctorspecial,token);        
        },

        gem3sDoctorAvailabile:function(Doctoravailabilitylistres, doctoravail,token){
            jkiosk.gem3sDoctorAvailabile(Doctoravailabilitylistres, doctoravail,token);        
        },
        
        gem3sSpecilalityquestion:function(gem3sSpecilalityquestionRes,specialqusion,token) {
            jkiosk.gem3sSpecilalityquestion(gem3sSpecilalityquestionRes,specialqusion,token);
        },

        gem3sanswersubmission:function(gem3sanswersubmissionRes,answersubmission,token) {
            jkiosk.gem3sanswersubmission(gem3sanswersubmissionRes,answersubmission,token);
        },
        BeforeStartCallGem3sApi:function(beforeStartCallGem3sApiRes, startcal, token){
            jkiosk.BeforeStartCallGem3sApi(beforeStartCallGem3sApiRes,startcal,token);
        },
        gem3sStartcallStatus:function(startcallRes,startcal,token) {
            jkiosk.gem3sStartcallStatus(startcallRes,startcal,token);
        },
        CancelCallGem3sApi:function(CancelCallGem3sApiRes,startcal,token){
            jkiosk.CancelCallGem3sApi(CancelCallGem3sApiRes,startcal,token);            
        },
        EndconsultationGem3sApi:function(EndconsultationGem3sApiRes,startcal,token){
            jkiosk.EndconsultationGem3sApi(EndconsultationGem3sApiRes,startcal,token);            
        },
        Prescription:function(PrescriptionRes, Prescription,token) {
            jkiosk.resPrescription(PrescriptionRes, Prescription,token);
        },
        
        gem3sConsultationDetails:function(gem3sConsultationDetailsRes, callId, token) {
            console.log(" kiosk jkiosk inside gem3sConsultationDetails fn");
            jkiosk.gem3sConsultationDetails(gem3sConsultationDetailsRes, callId, token);
        },        
        gem3sLogout:function(logoutRes,token) {
            jkiosk.reslogout(logoutRes,token);
        },

        /******************************
         telemedi for genix start
        *******************************/ 

        GenixAuthentication: function(AuthenticationRes,inputparam){
            jkiosk.GenixAuthentication(AuthenticationRes,inputparam);   
        },
        
        UserLogin: function(UserLoginRes,inputparam,tokenid){
            jkiosk.UserLogin(UserLoginRes,inputparam,tokenid); 
        },

        Addpatient: function(AddpatientRes,inputparam,tokenid){
            jkiosk.Addpatient(AddpatientRes,inputparam,tokenid);   
        },

        genixSpeciality: function(genixListofSpecilalityRes,tokenid){
            jkiosk.genixSpeciality(genixListofSpecilalityRes,tokenid); 
        },

        genixQuestionnaireModalBox: function(genixSpecilalityquestionRes,inputparam,tokenid){
            jkiosk.genixQuestionnaireModalBox(genixSpecilalityquestionRes,inputparam,tokenid); 
        },

        genixAnswerSubmit: function(genixAnswerSubmitRes,inputparam,tokenid){
            jkiosk.genixAnswerSubmit(genixAnswerSubmitRes,inputparam,tokenid); 
        }, 
        Provider: function(ProviderRes,tokenid){
            jkiosk.Provider(ProviderRes,tokenid); 
        },
        genixEncounterType: function(genixEncounterTypeRes,tokenid){
            jkiosk.genixEncounterType(genixEncounterTypeRes,tokenid);   
        },

        genixInitiateEncounter: function(genixInitiateEncounterRes,inputparam,tokenid){
            jkiosk.genixInitiateEncounter(genixInitiateEncounterRes,inputparam,tokenid); 
        }, 

        genixConnectProvider: function(genixConnectProviderRes,inputparam,tokenid){
            jkiosk.genixConnectProvider(genixConnectProviderRes,inputparam,tokenid); 
        },
        Consultation: function(ConsultationRes,inputparam,tokenid){
            jkiosk.Consultation(ConsultationRes,inputparam,tokenid); 
            },
            
        genixA4print: function(genixA4printRes, html_template, externalPrinterName){
            // console.log("genixA4print kiosk.jkiosk");
          jkiosk.genixA4print(genixA4printRes, html_template, externalPrinterName);  
        },

        /******************************
               payment module
        *******************************/ 

        login: function(loginRes){
            console.log("called");
            jkiosk.login(loginRes);   

        },

        //get allCredentials
        TransactionInitialize:function( SwapCardRes, PinInputRes, ResultRes, ihl_login_id,ihllogin_pass,invoice_number,Totalamount,MobileNumber){
            console.log("TransactionInitialize called");
            jkiosk.TransactionInitialize( SwapCardRes, PinInputRes, ResultRes, ihl_login_id,ihllogin_pass,invoice_number,Totalamount,MobileNumber);
        },

        //upi QRGenerate
        BharatQRGenerate:function(BharatQRRes,amount,invoice,customerMobNum, ihl_login_id, ihllogin_pass){
            jkiosk.BharatQRGenerate(BharatQRRes,amount,invoice,customerMobNum, ihl_login_id, ihllogin_pass);
        },

         //upi Transaction status
        CheckUPITransactionStatus:function(TransactionStatusRes){
            jkiosk.CheckUPITransactionStatus(TransactionStatusRes);
        },


        getAvailableInterface: function () {

            // telemedi settings start
           /* $rootScope.telemediSetting = HigiKioskStorageService.getSettingsValue("kiosk.telemedi");
            if($rootScope.telemediSetting){
                $rootScope.telemediApiVendor = HigiKioskStorageService.getSettingsValue("kiosk.telemedi.api.vendor");
                if($rootScope.telemediApiVendor == "gem3s"){
                    $rootScope.telemediDeviceId = HigiKioskStorageService.getSettingsValue("kiosk.telemedi.gem3s.device.id");
                }                
            } else {
                $rootScope.telemediApiVendor = null;
            }*/
            // telemedi settings end

            var __this =  this;
            var files = ["appResources_global.json", "appResources_diet.json", "welcome.json", "bloodpressure1.json", "bloodpressure2.json", "bloodpressure3.json", "weight1.json", "weight2.json", "weight3.json", "weight4.json", "weight5.json", "zugecginstruction.json", "zugecgprogression.json", "zugecgresult.json", "spotwo1.json", "spotwo2.json", "spotwo3.json", "temp1.json", "temp2.json", "temp3.json", "finish.json", "onboarding1.json", "onboarding2.json",
        "onboarding3.json", "onboarding4.json", "onboarding5.json", "fullbodybmc1.json", "fullbodybmc2.json", "comebacksoon.json", "welcomeModals.json", "bpModals.json","bmcModals.json", "ecgModals.json", "weightBmiModals.json", "spo2Modals.json", "tempModals.json", "finishModals.json", "placeholder.json", "flipKartPlus.json", "invasiveInstruction.json", "invasiveProcess.json", "invasiveResult.json", "invasiveInstructionModal.json", "upiPayment.json", "paymentbycard.json", "cardpaymentpin.json", "esanjeevaniPatientList.json"];
            var hardwareReady = $q.defer();
            var maintenanceMode = false;
            if(!$rootScope.loadingModalVisible){
                jkiosk.getKioskConfiguration(function(resp){
                    HigiKioskStorageService.saveSessionData('kioskConfigurationResult', resp);

                   //storeDivision 
                    //alert(resp.giveMeKioskModel);
                    console.log("org_details configuration result");
                    console.log(resp);
                    console.log(resp.serialNumber);
                    //alert(resp.serialNumber);
                    console.log("Serial Number");
                    console.log("serialnumber  " + resp.serialNumber);
                    console.log("State");
                    console.log("State  " + resp.state);
                     ihl_machineid=resp.serialNumber;
                     $rootScope.IHLMachineNumber = resp.serialNumber;
                     console.log("dateofdeployment");
                     machine_deployment_date=resp.dateofdeployment;
                     console.log("Machine name");
                     machine_name=resp.address1;
                     machine_location=resp.city;
                     $rootScope.kioskStateLocation = resp.state.replace(/\s/g, '').toLowerCase();
                     
                     $rootScope.uniqueKioskId = resp.storeNumber;
                     //$rootScope.uniqueKioskId = "C-IHL-19-0003";

                     if (resp.state == 'AD'){$rootScope.stateforpayment = 'andhrapradesh';}
                     if (resp.state == 'AR'){$rootScope.stateforpayment = 'arunachalpradesh';}
                     if (resp.state == 'AS'){$rootScope.stateforpayment = 'assam';}
                     if (resp.state == 'BR'){$rootScope.stateforpayment = 'bihar';}
                     if (resp.state == 'CG'){$rootScope.stateforpayment = 'chattisgarh';}
                     if (resp.state == 'DL'){$rootScope.stateforpayment = 'delhi';}
                     if (resp.state == 'GA'){$rootScope.stateforpayment = 'goa';}
                     if (resp.state == 'GJ'){$rootScope.stateforpayment = 'gujarat';}
                     if (resp.state == 'HR'){$rootScope.stateforpayment = 'haryana';}
                     if (resp.state == 'HP'){$rootScope.stateforpayment = 'himachalpradesh';}
                     if (resp.state == 'JK'){$rootScope.stateforpayment = 'jammuandkashmir';}
                     if (resp.state == 'JH'){$rootScope.stateforpayment = 'jharkhand';}
                     if (resp.state == 'KA'){$rootScope.stateforpayment = 'karnataka';}
                     if (resp.state == 'KL'){$rootScope.stateforpayment = 'kerala';}
                     if (resp.state == 'LD'){$rootScope.stateforpayment = 'lakshadweepislands';}
                     if (resp.state == 'MP'){$rootScope.stateforpayment = 'madhyapradesh';}
                     if (resp.state == 'MH'){$rootScope.stateforpayment = 'maharashtra';}
                     if (resp.state == 'MN'){$rootScope.stateforpayment = 'manipur';}
                     if (resp.state == 'ML'){$rootScope.stateforpayment = 'meghalaya';}
                     if (resp.state == 'MZ'){$rootScope.stateforpayment = 'mizoram';}
                     if (resp.state == 'NL'){$rootScope.stateforpayment = 'nagaland';}
                     if (resp.state == 'OD'){$rootScope.stateforpayment = 'odisha';}
                     if (resp.state == 'PY'){$rootScope.stateforpayment = 'pondicherry';}
                     if (resp.state == 'PB'){$rootScope.stateforpayment = 'punjab';}
                     if (resp.state == 'RJ'){$rootScope.stateforpayment = 'rajasthan';}
                     if (resp.state == 'SK'){$rootScope.stateforpayment = 'sikkim';}
                     if (resp.state == 'TN'){$rootScope.stateforpayment = 'tamilnadu';}
                     if (resp.state == 'TS'){$rootScope.stateforpayment = 'telangana';}
                     if (resp.state == 'TR'){$rootScope.stateforpayment = 'tripura';}
                     if (resp.state == 'UP'){$rootScope.stateforpayment = 'uttarpradesh';}
                     if (resp.state == 'UK'){$rootScope.stateforpayment = 'uttarakhand';}
                     if (resp.state == 'WB'){$rootScope.stateforpayment = 'westbengal';}
                     if (resp.state == 'AN'){$rootScope.stateforpayment = 'andamanandnicobarislands';}
                     if (resp.state == 'CH'){$rootScope.stateforpayment = 'chandigarh';}
                     if (resp.state == 'DNHDD'){$rootScope.stateforpayment = 'dadra&nagarhavelianddaman&diu';}
                     if (resp.state == 'LA'){$rootScope.stateforpayment = 'ladakh';}
                     if (resp.state == 'OT'){$rootScope.stateforpayment = 'otherterritory';}


                    if ($rootScope.uniqueKioskId != undefined) {

						let success_fn = function(res){

                        console.log("check log api response");
                        console.log(res['status']);
							if (res['status'] != undefined) {
								$rootScope.poweredByIHLShow = true;
								$rootScope.kioskMachineLogo = res['status'];
                                $rootScope.printTemplateLogo = res['status'];
							} else {
								if (resp.storeDivision == 'MEB-Medi Buddy') {
									$rootScope.poweredByIHLShow = true;
									$rootScope.isMEBOrg = true;
									$('#global_splash_logo').css({'background': 'url(images/medibuddy-corportate-logo.png) no-repeat', 'object-fit': 'cover', 'width': '250px'});
								} else {
									$rootScope.poweredByIHLShow = false;
									$('#global_splash_logo').css({'background': 'url(images/splash_ihl_logo.png) no-repeat'});
								}
							}
						}
						let error_fn = function(res){if (resp.storeDivision == 'MEB-Medi Buddy') {
							$rootScope.isMEBOrg = true;
							$rootScope.poweredByIHLShow = true;
								$('#global_splash_logo').css({'background': 'url(images/medibuddy-corportate-logo.png) no-repeat', 'object-fit': 'cover', 'width': '250px'});
							} else {
								$rootScope.poweredByIHLShow = false;
								$('#global_splash_logo').css({'background': 'url(images/splash_ihl_logo.png) no-repeat'});
							}
						}

						jkiosk.fetchKioskMachineLogo($rootScope.uniqueKioskId, success_fn, error_fn);

					} else {
						if (resp.storeDivision == 'MEB-Medi Buddy') {
							$rootScope.poweredByIHLShow = true;
							$rootScope.isMEBOrg = true;
							$('#global_splash_logo').css({'background': 'url(images/medibuddy-corportate-logo.png) no-repeat', 'object-fit': 'cover', 'width': '250px'});
						} else {
							$rootScope.poweredByIHLShow = false;
							$('#global_splash_logo').css({'background': 'url(images/splash_ihl_logo.png) no-repeat'});
						}
					}

                    if($rootScope.kioskMachineLogo == ""){
                        $rootScope.printTemplateLogo = ihlPrintLogo; // for print template logo
                        console.log("check log");
                        console.log($rootScope.printTemplateLogo);
                    } 

                     var organisationName = resp.organizations;
                     //alert(organisationName[0]);
                     localStorage.setItem("safalPage", "false");  
                     for (var i = 0; i < organisationName.length; i++) {
                         if (organisationName[i] == "BPC") {
                           // window.location = 'initpage.html';

                            localStorage.setItem("safalPage", "true");  
                         }

                     }
                     
                    $rootScope.giveMeKioskModel = resp.giveMeKioskModel;
                    if(localStorage.getItem("safalPage") != "false" && localStorage.getItem("fromInitPage") != "true"){

            			window.location = 'initpage.html';
            			$rootScope.bpcEnable = true;  
   					 }
                    //$rootScope.giveMeKioskModel = "a3";
                    
                    
                    // affiliate fetch from kiosk admin portal for registeration flow start
                    var affiliates = resp.storeDivision;
                    if (affiliates == null || affiliates == "" || affiliates == undefined) {
                        //$rootScope.affiliationShow = false;
                        $rootScope.affiliateFromAdminPortal[$rootScope.affiliateFromAdminPortal.length] = "None";
                    }else{
                        var affiliateList =  affiliates.split("-");
                        $rootScope.affiliateOrgCode = affiliateList[0]; // affiliate org code form DB store
                        if(affiliateList[1] == "Embassy Boulevard"){
                            $rootScope.affiliateFromAdminPortal[0] = affiliateList[1] + " - Residence"; // affiliate company name for user view
                            $rootScope.affiliateFromAdminPortal[1] = affiliateList[1] + " - Staff";
                        } else if(affiliateList[1] == "Wework") {
                            $rootScope.affiliateFromAdminPortal[0] = affiliateList[1] + " Employee"; // affiliate company name for user view
                            $rootScope.affiliateFromAdminPortal[1] = affiliateList[1] + " Member";
                        } else if(affiliateList[1] == "Mehta Hospital"){
                            $rootScope.affiliateFromAdminPortal[0] = affiliateList[1] + " Clinicians"; // affiliate company name for user view
                            $rootScope.affiliateFromAdminPortal[1] = affiliateList[1] + " Nursing Staff";     
                            $rootScope.affiliateFromAdminPortal[2] = affiliateList[1] + " Para Medical";     
                            $rootScope.affiliateFromAdminPortal[3] = affiliateList[1] + " Support Staff";     
                        } else {
                            $rootScope.affiliateFromAdminPortal[0] = affiliateList[1];
                        }
                        $rootScope.affiliateFromAdminPortal[$rootScope.affiliateFromAdminPortal.length] = "None";    
                        console.log($rootScope.affiliateFromAdminPortal);
                        //$rootScope.affiliationShow = true;
                    }
                    // affiliate fetch from kiosk admin portal for registeration flow end


                    jkiosk.getAffiliates(function(res){
                        console.log(res);
                        $rootScope.affiliateListFech = res;
                        if(res.length == 0 || res == undefined){
                            $rootScope.affiliationShow = false;
                        } else {                            
                            var index = 0;
                            for (var i = 0; res.length > i; i++) {
                                if(res[i].company_name != undefined){
                                    $rootScope.overallAffiliates[index] = res[i].company_name;    
                                    index++;
                                }                                
                            }
                            
                            /*if($rootScope.overallAffiliates.includes("IHL Care")){
                                $rootScope.overallAffiliates[$rootScope.overallAffiliates.length] = "None";    
                            } else {
                                $rootScope.overallAffiliates[$rootScope.overallAffiliates.length] = "IHL Care";
                                $rootScope.overallAffiliates[$rootScope.overallAffiliates.length] = "None";
                            }*/
                        }
                        console.log($rootScope.overallAffiliates);
                    });




                });
                  jkiosk.getAvailableModules(function(resp){
                    
                    $rootScope.hardwareAvailability = resp; 
                    console.log($rootScope.hardwareAvailability);
                    
                    if($rootScope.hardwareAvailability["ForeheadTemperature"] == true){
                        $rootScope.hardwareAvailability["temp"] = true;
                    }
                   /* $rootScope.hardwareAvailability["Blood Pressure"] = true;
                    $rootScope.hardwareAvailability["Weight Scale"] = true;
                    $rootScope.hardwareAvailability["Body Composition"] = true;
                    $rootScope.hardwareAvailability["SPo2"] = true;
                    $rootScope.hardwareAvailability["temp"] = true;
                    $rootScope.hardwareAvailability["ECG"] = true; 
                    $rootScope.hardwareAvailability["SwitchHardware"] = true;
                    $rootScope.hardwareAvailability['Fingerprint'] = true;*/

                    hardwareReady.resolve();
                });
            }

            hardwareReady.promise
                .then(function(){
                    if ($rootScope.hardwareAvailability["Blood Pressure"] != undefined) {
                        if($rootScope.hardwareAvailability["Blood Pressure"] == false){
                             //$rootScope.hardwareError = true;
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "BP hardware unavailable");
                            console.log("BP hardware unavailable - setting maintenanceMode");
                        } else {
                            files.push("appResources_bp.json");
                        }
                    } else {
                        //Bloodpressure cuff is not reporting at all
                        console.log("Bloodpressure cuff not reported - setting maintenanceMode");
                       //$rootScope.hardwareError = true;
                        __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "BP hardware not not registering connected");
                    }
                    if ($rootScope.hardwareAvailability["Weight Scale"]  != undefined) {
                        if($rootScope.hardwareAvailability["Weight Scale"] == false){
                         //$rootScope.hardwareError = true;
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "Weight hardware unavailable");
                            console.log("Weight hardware unavailable error - setting maintenanceMode");
                        } else {
                            files.push("appResources_weight.json");
                        }

                    } else {
                        //Scale cuff is not reporting at all
                        //$rootScope.hardwareError = true;
                        console.log("Weight hardware not registering connected - setting maintenanceMode");
                        __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "Weight hardware not registering connected");
                    }

                    if ($rootScope.hardwareAvailability["Body Composition"]  != undefined) {
                        if($rootScope.hardwareAvailability["Body Composition"] == false){
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "BMC hardware unavailable");
                            console.log("BMC hardware unavailable error - not setting maintenanceMode");
                        } else {
                            //Load appropriate BMC interface language
                            if(HigiKioskUtilitiesService.isHigiGreen() && !HigiKioskStorageService.getSettingsValue("kiosk.allow.bmc.higi.green")){
                                //Disable BMC functionality on higi green
                                //https://higidev.atlassian.net/browse/KUI-1612

                                //Don't add interface language for BMC
                                //files.push("appResources_bodycomp_higi.json");
                               // $rootScope.hardwareAvailability["Body Composition"] = undefined;

                                files.push("appResources_bodycomp.json");

                            } else {
                                files.push("appResources_bodycomp.json");
                            }

                        }

                    }
                
                    if ($rootScope.hardwareAvailability["FullBodyCompositionAnalyser"]  != undefined) {
                        if($rootScope.hardwareAvailability["FullBodyCompositionAnalyser"] == false){
                            $rootScope.fullBodyBMCTest = true;
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "Full Body BMC hardware unavailable");
                            console.log("Full Body BMC hardware unavailable error - not setting maintenanceMode");
                        } else {
                            if(HigiKioskUtilitiesService.isHigiGreen() && !HigiKioskStorageService.getSettingsValue("kiosk.allow.bmc.higi.green")){
                                files.push("appResources_bodycomp.json");

                            } else {
                                files.push("appResources_bodycomp.json");
                            }

                        }

                    }
                   //$rootScope.hardwareAvailability["SPO2"] = true;
                    if ($rootScope.hardwareAvailability["SPo2"]  != undefined) {
                        if($rootScope.hardwareAvailability["SPo2"] == false){
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "SPO2 hardware unavailable");
                            console.log("SPO2 hardware unavailable error - not setting maintenanceMode");
                        } else {
                            //Load appropriate BMC interface language
                            if(HigiKioskUtilitiesService.isHigiGreen() && !HigiKioskStorageService.getSettingsValue("kiosk.allow.bmc.higi.green")){
                               // $rootScope.hardwareAvailability["SPO2"] = undefined;
                                files.push("appResources_spo2.json");
                            } else {
                                files.push("appResources_spo2.json");
                            }
                        }
                    }

                    
                    //$rootScope.hardwareAvailability["temp"] = true;
                    if ($rootScope.hardwareAvailability["temperature"]  != undefined) {
                        if($rootScope.hardwareAvailability["temperature"] == false){
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "temp hardware unavailable");
                            console.log("temp hardware unavailable error - not setting maintenanceMode");
                        } else {
                            //Load appropriate BMC interface language
                            if(HigiKioskUtilitiesService.isHigiGreen() && !HigiKioskStorageService.getSettingsValue("kiosk.allow.bmc.higi.green")){
                               // $rootScope.hardwareAvailability["temp"] = undefined;
                                files.push("appResources_temp.json");
                            }else {
                                files.push("appResources_temp.json");
                            }
                        }
                    }else {
                        files.push("appResources_temp.json");
                    }


                     if ($rootScope.hardwareAvailability["ECG"]  != undefined) {
                        if($rootScope.hardwareAvailability["ECG"] == false){
                            __this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), "error", "ECG hardware unavailable");
                            console.log("ECG hardware unavailable error - not setting maintenanceMode");
                        } else {
                            //Load appropriate BMC interface language
                            if(HigiKioskUtilitiesService.isHigiGreen() && !HigiKioskStorageService.getSettingsValue("kiosk.allow.bmc.higi.green")){
                               // $rootScope.hardwareAvailability["ECG"] = undefined;
                                files.push("appResources_Ecg.json");
                            }else {
                                files.push("appResources_Ecg.json");
                            }
                        }
                    }else{
                        files.push("appResources_Ecg.json");
                    }
                    
           

                     $rootScope.languages = [
                        {label: 'English', displayLabel: 'English', path: 'json/en_us/', files: files, buttonId: 'language_select_en_us'},
                        {label: 'Hindi', displayLabel: 'Hindi', path: 'json/hi_in/', files: files, buttonId: 'language_select_hi_in'},
                        {label: 'Assamese', displayLabel: 'Assamese', path: 'json/assamese/', files: files, buttonId: 'language_select_assamese'},
                        {label: 'Bengali', displayLabel: 'Bengali', path: 'json/bengali/', files: files, buttonId: 'language_select_bengali' },
                        {label: 'Gujarati', displayLabel: 'Gujarati', path: 'json/gujarati/', files: files, buttonId: 'language_select_gujarati' },
                        {label: 'Kannada', displayLabel: 'Kannada', path: 'json/kannada/', files: files, buttonId: 'language_select_kannada'},
                        {label: 'Malayalam', displayLabel: 'Malayalam', path: 'json/malayalam/', files: files, buttonId: 'language_select_malayalam' },
                        {label: 'Marathi', displayLabel: 'Marathi', path: 'json/mi_in/', files: files, buttonId: 'language_select_mi_in' },
                        {label: 'Odia', displayLabel: 'Odia', path: 'json/odia/', files: files, buttonId: 'language_select_odia' },
                        {label: 'Punjabi', displayLabel: 'Punjabi', path: 'json/punjabi/', files: files, buttonId: 'language_select_punjabi'},
                        {label: 'Tamil', displayLabel: 'Tamil', path: 'json/tm_in/', files: files, buttonId: 'language_select_tm_in' },
                        {label: 'Telugu', displayLabel: 'Telugu', path: 'json/telugu/', files: files, buttonId: 'language_select_telugu' }

                        /*{label: 'Bodo', displayLabel: 'Bodo', path: 'json/bodo/', files: files, buttonId: 'language_select_bodo' },
                        {label: 'Dogri', displayLabel: 'Dogri', path: 'json/dogri/', files: files, buttonId: 'language_select_dogri' },
                        {label: 'Kashmiri', displayLabel: 'Kashmiri', path: 'json/kashmiri/', files: files, buttonId: 'language_select_kashmiri' },
                        {label: 'Konkani', displayLabel: 'Konkani', path: 'json/konkani/', files: files, buttonId: 'language_select_konkani' },
                        {label: 'Maithili', displayLabel: 'Maithili', path: 'json/maithili/', files: files, buttonId: 'language_select_maithili' },
                        {label: 'Manipuri', displayLabel: 'Manipuri', path: 'json/manipuri/', files: files, buttonId: 'language_select_manipuri' },
                        {label: 'Nepali', displayLabel: 'Nepali', path: 'json/nepali/', files: files, buttonId: 'language_select_nepali'},
                        {label: 'Santhali', displayLabel: 'Santhali', path: 'json/santhali/', files: files, buttonId: 'language_select_santhali'},
                        {label: 'Sindhi', displayLabel: 'Sindhi', path: 'json/sindhi/', files: files, buttonId: 'language_select_sindhi' },
                        {label: 'Urdu', displayLabel: 'Urdu', path: 'json/urdu/', files: files, buttonId: 'language_select_urdu' } */
                    ];
                    HigiKioskStorageService.saveSessionData('languages', $rootScope.languages);


                }).then(function(){
                    $rootScope.setLanguage();
                    if($rootScope.hardwareError == true){
                        __this.displayMaintenance();
                    }
                })

        },
        sessionAdPlayed: function (adEvent) {
            jkiosk.sessionAdPlayed(adEvent);
        },

        beginKioskSession : function() {

            if (!HigiKioskStorageService.returnSessionData('session_active'))
            {

                this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'session', 'started');

                //Session id generated when UI loads. session status keyed by session_active
                //TODO remove after 6.14 release
                //HigiKioskStorageService.saveSessionData('sessionId', HigiKioskUtilitiesService.generateSessionId());

                // register the kiosk with the api
                //this.registerKiosk();
                this.logStartSession();

                //Log if the kiosk is in ADA Mode
                if ($rootScope.kioskADAMode == true) {
                    this.logEvent('Kiosk_ADA_Mode', 'hardware', 'active');
                }
                HigiKioskStorageService.saveSessionData('session_active', true);
            }

            //API status will be evaluated by methods as needed
            // TODO remove after 6.14 release
            //var q = this.apiStatus();
            //
            //return  q;
        },
        obfuscateCheckin : function(checkin, callback){
            jkiosk.obfuscateCheckin(checkin, callback);
        },
        registerKiosk : function(){
            this.apiStatus();
            if (!HigiApiKey && !HigiLoginInProgress) {
			
                //Set earndit points to app settings default, callback will overwrite on success
                HigiKioskStorageService.saveSessionData('earndItPointsForCheckin',HigiKioskStorageService.getSettingsValue("kiosk.earndIt.earndItPointsForCheckin") );
                jkiosk.higiLogin(function(loginResponse) {
                    HigiApiResponse = JSON.parse(loginResponse.serverResponse);

                    if (HigiApiResponse.ApiKey) {
                        HigiApiKey = HigiApiResponse.ApiKey;
                    }
                    if (typeof(HigiApiResponse.Organizations) != 'undefined' && HigiApiResponse.Organizations != null) {
                        HigiKioskStorageService.saveSessionData("KioskOrganizations", HigiApiResponse.Organizations);
                    }
                    if (typeof(HigiApiResponse.printingEnabled) != 'undefined' && HigiApiResponse.printingEnabled != null) {
                        HigiKioskStorageService.saveSessionData('printEnabled', HigiApiResponse.printingEnabled);
                    }
                    if (typeof(HigiApiResponse.printingCost) != 'undefined' && HigiApiResponse.printingCost != null) {
                        HigiKioskStorageService.saveSessionData('printPrice', HigiApiResponse.printingCost);
                    }
                    if (typeof(HigiApiResponse.earndItPointsForCheckin) != 'undefined' && HigiApiResponse.earndItPointsForCheckin != null && $rootScope.apiAvailable) {
                        HigiKioskStorageService.saveSessionData('earndItPointsForCheckin', HigiApiResponse.earndItPointsForCheckin);
                    } else {
                        HigiKioskStorageService.saveSessionData('earndItPointsForCheckin',HigiKioskStorageService.getSettingsValue("kiosk.earndIt.earndItPointsForCheckin") );
                    }
                    if (typeof(HigiApiResponse.printingCurrency) != 'undefined' && HigiApiResponse.printingCurrency != null) {
                        HigiKioskStorageService.saveSessionData('printCurrency', HigiApiResponse.printingCurrency);
                    }
                    if (HigiApiResponse.appUiConfig != null && typeof(HigiApiResponse.appUiConfig.bpTestSkipRegPrompt) != 'undefined' && HigiApiResponse.appUiConfig.bpTestSkipRegPrompt != null) {
                        HigiKioskStorageService.saveSessionData('bpTestSkipRegPrompt', HigiApiResponse.appUiConfig.bpTestSkipRegPrompt);
                    }
                    else {
                        localStorage.removeItem('bpTestSkipRegPrompt');
                    }

                    if (HigiApiKey) {
                        // First time system starts up, the first call to HTTPS will take longer while Chrome validates the certificate.
                        // Don't want that to be a user trying to login, warm it up in the background
                        //HigiApi.WakeUpSsl();

                        HigiApi.GetPrinterSettings(HigiApiKey,
                            function (response) {
                                if (response) {
                                    if (response.printingEnabled) {
                                        HigiKioskStorageService.saveSessionData('printEnabled', response.printingEnabled);
                                    }
                                    if (response.printingCost) {
                                        HigiKioskStorageService.saveSessionData('printPrice', response.printingCost);
                                    }
                                    if (response.printingCurrency) {
                                        HigiKioskStorageService.saveSessionData('printCurrency', response.printingCurrency);
                                    }
                                }
                            },
                            function (response) {
                                if (localStorage.getItem('printEnabled') == undefined) {
                                    HigiKioskStorageService.saveSessionData('printEnabled', false);
                                }
                            }
                        )
                    }

                });
            }
        },

        getMvmStockList : function(mvmStockResonse, ihl_machineid){
            jkiosk.getMvmStockList(mvmStockResonse, ihl_machineid);
        },
        
        rotatorRequest : function(postMediDescrRes, medi){
            jkiosk.rotatorRequest(postMediDescrRes, medi);
        },

        medicineDetailsJson: function(medi){
            jkiosk.medicineDetailsJson(medi);
        },

        QRSocketRequest: function(QRSocketResponse, data){
            jkiosk.QRSocketRequest(QRSocketResponse, data);  
        },
        checkWeightService : function(checkWeight){
          jkiosk.checkWeight(checkWeight);	
        },

        apolloA4print: function(apolloA4printRes, prescriptionUrl, externalPrinterName){
            //console.log("apolloA4print kiosk.jkiosk");
          jkiosk.apolloA4print(apolloA4printRes, prescriptionUrl, externalPrinterName);  
        },
        
        printPDFFile: function(printPDFFileRes, prescriptionUrl, externalPrinterName){
            // console.log("printPDFFile kiosk.jkiosk");
          jkiosk.printPDFFile(printPDFFileRes, prescriptionUrl, externalPrinterName);  
        },
        
        getTemperatureModuleName: function(temperatureModuleNameRes){
          jkiosk.getTemperatureModuleName(temperatureModuleNameRes);  
        },
        
        onPlatformReady: function (onUserSit, onUserStand, checkWeight) {
            var __this =  this;
            var q = $q.defer();
            jkiosk.onPlatformReady(function () {
                //jkiosk.mvmOnReady();
                //jkiosk.teleMediOnReady();
                jkiosk.isZugBPOnReady();
                jkiosk.barcodeReaderOnReady();
                jkiosk.isMosambeeOnReady();
                jkiosk.fingerprintOnReady();
                jkiosk.paymentOnReady();
                jkiosk.isSpo2OnReady();
                jkiosk.isZUGECGOnReady();
                jkiosk.isTemperatureOnReady();
				jkiosk.hideCursor();
                jkiosk.onHasWeight(onUserSit);
                jkiosk.onNoWeight(onUserStand);
                jkiosk.checkWeight(checkWeight);
                jkiosk.monitorStartButton(function(){__this.startButtonPressed()});
                __this.getAvailableInterface();
                __this.registerKiosk();
                __this.checkForMaintenance();
                __this.preloader();
                $rootScope.$apply();
                q.resolve();
            });
            return q.promise;
        },
        preloader : function(){
            var __this =  this;
            try {
                $http.get('json/preloadassets.json').success(function (data) {
                    var assets = new Object();
                    angular.extend(assets, data);
                    if (assets.images != undefined) {
                        var preloaded = [];
                        assets.images.forEach(function (item, index) {
                            preloaded[index] = new Image();
                            preloaded[index].src = item;
                        });
                    }
                    if (assets.audio != undefined) {
                        var preloaded = [];
                        assets.audio.forEach(function (item, index) {
                            preloaded[index] = new Audio();
                            preloaded[index].src = item;console.log("preloading " + item);
                        });
                    }
                    __this.hideLoadingModal();

                });
            } catch (e){
                console.log("Async preloder failed");
                __this.hideLoadingModal();
            }
        },
        startButtonPressed:function(){
            //Set mode to bp
            this.beginKioskSession();
            //SH series kiosk has start button press
            this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'hardware start button', 'session started via hardware button');

            if($route.current.$$route.originalPath.search("welcome") != -1 && !$rootScope.globalModalVisible && HigiKioskStorageService.returnSessionData('logged_in') != true) {
                $scope.mode = "bp";
                if(HigiKioskStorageService.returnSessionData('gender') != undefined && HigiKioskStorageService.returnSessionData('birthdate') != undefined  && HigiKioskStorageService.returnSessionData('height') != undefined){
                    window.location = 'index.html#/bloodpressure1/forward/enter';
                } else {
                    window.location = 'index.html#/onboarding1/forward/enter';
                }

            } else {
                console.log('button pressed - not on welcome screen');
            }

        },
        endSession : function(higiPageName){
            this.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'session', 'ended');
            currentlyPlayingMedia = null;
            this.logEndSession();
            higi_pageIndex = 0;
            $('body').removeData();
            currentUserProfileImage = null;
            HigiUserToken = null;
        },
        checkForMaintenance : function(){
            var numWeightScaleGlobalErrors = localStorage.getItem("weightScaleGlobalErrorCount");
            if (numWeightScaleGlobalErrors == undefined) {
                numWeightScaleGlobalErrors = 0;
            }
            var numBpGlobalErrors = localStorage.getItem("bpGlobalErrorCount");
            if (numBpGlobalErrors == undefined) {
                numBpGlobalErrors = 0;
            }

            if (numBpGlobalErrors >= 3 || numWeightScaleGlobalErrors >= 3|| $rootScope.hardwareError) {
                console.log("numBpGlobalErrors = " + numBpGlobalErrors + " numWeightScaleGlobalErrors = " + numWeightScaleGlobalErrors + " $rootScope.hardwareError = " +  $rootScope.hardwareError);
                this.displayMaintenance();
            }
            else {
                this.hideMaintenance();
            } //By entering your email, you agree to sign away your life to sign away your life
        },
        displayMaintenance : function(){
            var __this = this;
            $rootScope.loadingModalVisible = false;
            $rootScope.higiMaintence = true;
            console.log('displayMaintenance : Kiosk has entered maintenance mode');
            __this.logEvent('application', 'Maintenance Mode', 'Kiosk has entered maintenance mode');

            $timeout(function(){
                console.log('displayMaintenance : Firing timeout to reload UI when in maintenance mode');
                __this.logEvent('application', 'Maintenance Mode', 'Firing timeout to reload UI when in maintenance mode');
                window.location = "index.html";
            }, HigiKioskStorageService.getSettingsValue('session.maintenance.retry.time'));
        },
        hideMaintenance : function(){
            $rootScope.higiMaintence = false;

        },
        hideLoadingModal : function(){
            var __this = this;
            if($rootScope.hardwareError){
                console.log("hideLoadingModal : hardwareError set to true.");
                __this.displayMaintenance();
            }else {
                
                $timeout(function(){
                    console.log('cancel loadingModalTimeout + loadingModalTimeoutReloadTimeout timeout');
                    $timeout.cancel($rootScope.loadingModalTimeout);
                    $timeout.cancel($rootScope.loadingModalTimeoutReloadTimeout);

                    console.log('Hiding loading modal ' + HigiKioskUtilitiesService.generateSessionId());
                    $rootScope.loadingModalVisible = false;

                    __this.getAvailableInterface();
                    $rootScope.$apply();
                }, 1000);
            }
            $rootScope.bodyHide = false;

        },
        getVolume : function(callback){
            jkiosk.getVolume(callback);
        },
        setVolume : function(systemVolume){
            jkiosk.setVolume(systemVolume);
        },
        getTopScreenVideoByKioskId : function(topScreenVideoRes, Id){
            jkiosk.getTopScreenVideoByKioskId(topScreenVideoRes, Id);
        }

    }

}]);