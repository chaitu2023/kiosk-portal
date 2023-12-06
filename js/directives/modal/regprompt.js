higiKioskControllers.directive('registrationPromptModal', ['HigiKioskStorageService', 'JkioskService', 'HigiKioskUserService', '$q', 'HigiKioskFlow', function(HigiKioskStorageService, JkioskService, HigiKioskUserService, $q, HigiKioskFlow) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/register-prompt.html',
        controller :function($scope, $rootScope){
            $scope.init = function(){
                
            };

            $scope.continueWithGuestUser =  function(){
                $rootScope.mode = $rootScope.selectedVital[0];
                HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                $rootScope.lastCheckinModalShow = false;
                $rootScope.clearModal();
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
                    } else if ($rootScope.mode == "ivt") {
                        window.location = "#/invasiveInstruction/forward";
                    } else if ($rootScope.mode == "bpw") {
                        var currenttest;
                        window.location = HigiKioskFlow.nextTest($rootScope.mode,currenttest);
                    }
                } else {
                    window.location =  "#/onboarding1/forward/enter";
                }
            }
        }
    };
}]);



/*higiKioskControllers.directive('registrationPromptModal', ['HigiKioskStorageService', 'JkioskService', 'HigiKioskUserService', '$q', 'HigiKioskFlow', function(HigiKioskStorageService, JkioskService, HigiKioskUserService, $q, HigiKioskFlow) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/register-prompt.html',
        controller :function($scope, $rootScope){
            $scope.getRegPromptAd = function(){
                var apiPromise = JkioskService.apiStatus(function(response){
                    $scope.apiStatus = (response.apiStatus == "Online");
                });
                apiPromise.promise
                    .then(function(){
                        if(!HigiKioskStorageService.returnSessionData('apiAvailable')){
                            $scope.apiStatus = false;
                            $scope.playOfflineAd();
                        }
                        else if (HigiKioskStorageService.getSettingsValue('kiosk.ads.regprompt.enabled')) {
                            var adDataObject = HigiKioskUserService.getAdDataObjectForSlide("slide_regprompt");
                            JkioskService.getAdConcurrent($scope.regPromptAdSetAd, "kv1_regprompt", adDataObject);
                        }
                        else {
                            $scope.playDefaultRegPromptAd();
                        }
                    });
            };

            $scope.regPromptAdSetAd = function(resp){

                if(resp.hasAd !== 'false'){
                    if(resp.adSessionToken != undefined) {
                        HigiKioskStorageService.saveSessionData('adToken', resp.adSessionToken);
                    }
                    $scope.registrationPromptValuePropAd = resp.path;
                } else {
                    $scope.playDefaultRegPromptAd();
                }


                $scope.init();
            };

            $scope.playDefaultRegPromptAd = function(){
                $scope.defaultRegPrompt ={method: "getAdRegPrompt", hasAd: "true", path: "images/regprompt_mac_iphone-" + ($scope.langClass == undefined ? "en_us" : $scope.langClass) + ".png", playNotificationUrl: "http://localhost", mimeType: "image/png"}
                $scope.regPromptAdSetAd($scope.defaultRegPrompt);
            };
            $scope.playOfflineAd = function(){
                $scope.defaultRegPrompt ={method: "getAdRegPrompt", hasAd: "true", path: "images/regprompt_offline-" + ($scope.langClass == undefined ? "en_us" : $scope.langClass) + ".png", playNotificationUrl: "http://localhost", mimeType: "image/png"}
                $scope.regPromptAdSetAd($scope.defaultRegPrompt);
            };

            $scope.init = function(){
                $scope.registrationPromptMessage = "regprompt.value.prop";
                $scope.registrationPromptValueProp = "regprompt_valueprop";
                $scope.registrationPromptUpperText1 = "regprompt_UpperText1";
                $scope.registrationPromptUpperText2 = "regprompt_UpperText2";
                $scope.registrationPromptLowerText = "regprompt_LowerText";
                $scope.registrationPromptSkip = "global.skip";
                $scope.registrationPromptLogin = "global.login";
                $scope.registrationOfflineBegin = "global.continue.to.tests";
                $scope.registrationPromptCreateAccount = "regprompt.create.my.free.account";
                $scope.loginMode = {id : 'login'};
                $scope.registerMode = {id : 'register'};

            };

            $scope.logEvent = function(action){
                //setting kioskSplashMessageVersion arbitrarily
                var kioskSplashMessageVersion = 0;
                JkioskService.logEvent(action , 'session', 'started');
                JkioskService.logEvent(action, 'button', 'pressed');
                JkioskService.logEvent(action + '_messageVersion' + kioskSplashMessageVersion, 'screen', 'display');
                JkioskService.logEvent(action + '_languageVersion' + $scope.langClass , 'screen', 'display');
                //Moving to ng-click TODO - remove after 6.14 release
                //JkioskService.beginKioskSession();
                JkioskService.getChallengeAd(HigiKioskUserService, $q.defer());
            };

            $scope.regPromptLogin = function(){
                $rootScope.clearModal();
                $scope.logEvent($scope.mode + '_' + HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton');
                $rootScope.fingerPrintOrEmailMobile = true;

                $rootScope.loadModal($scope.loginMode);
            };
            $scope.regPromptRegister = function(){
                $rootScope.clearModal();
                $scope.logEvent($scope.mode + '_' + HigiKioskStorageService.returnSessionData('higiPageName') + '_signUpButton');
                $rootScope.loadModal($scope.registerMode);

                 //language place holder
                $("#emailReg2").attr("placeholder", $scope.interfaceLabels['global.enter.your.emailid']);
                $("#emailReg3").attr("placeholder", $scope.interfaceLabels['global.enter.your.emailid']);
                $("#firstname").attr("placeholder", $scope.interfaceLabels['global.enterfir']);
                $("#lastname").attr("placeholder", $scope.interfaceLabels['global.enterlast']);
                $("#passwordReg").attr("placeholder", $scope.interfaceLabels['global.enteryouypasswords']);
                $("#confirmPassNow").attr("placeholder", $scope.interfaceLabels['global.confirmyourpassword']);
            };
            $scope.regPromptSkip = function(){
                $scope.logEvent($scope.mode + '_' + HigiKioskStorageService.returnSessionData('higiPageName') + '_startButton');
                $rootScope.clearModal();
                $rootScope.setKioskADAMode();


                                var onboardingDone = HigiKioskUserService.onboardingDone();

                if(onboardingDone){                       
                        if($scope.mode == "bp"){
                            path = "#/bloodpressure1/forward";
                        } else if($scope.mode == "bpw" ){
                            var currenttest;
                            path = HigiKioskFlow.nextTest("bpw",currenttest);
                            //path = "#/bloodpressure1/forward";
                        } else if($scope.mode == "w" ){
                            path = "#/weight1/forward";
                        }else if($scope.mode == "bmc" ){
                            path = "#/weight1/forward";
                        }else if($scope.mode == "spo2" ){
                            path = "#/spotwo1/forward";
                        }else if($scope.mode == "temp" ){
                            path = "#/temp1/forward";
                        }else if($scope.mode == "ekg" ){
                            path = "#/zugecgmode/forward";
                        }
                        window.location = path;

                    } else {
                        if($scope.mode == "bp"){
                            path = "#/onboarding1/forward/enter";
                        } else if($scope.mode == "#/onboarding1/forward/enter"){
                            path = "#/bloodpressure1/forward";
                        } else {
                            path = "#/onboarding1/forward/enter";
                        }

                        window.location = path;                        
                    }

            };
            $scope.apiAvailableWatch = function(newVal){
                $scope.apiStatus = newVal;
                $scope.getRegPromptAd();
            };
            HigiKioskStorageService.watchSessionData('apiAvailable', $scope.apiAvailableWatch);
            $scope.languageWatcher = $rootScope.$watch('langClass', function(newVal, oldVal){
                console.log('reloading regprompt ad based on language change');
                if(newVal != undefined){
                    $scope.getRegPromptAd();
                }
            });
        }

    };
}]);*/