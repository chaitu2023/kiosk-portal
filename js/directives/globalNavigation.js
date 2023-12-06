angular
    .module("higiKioskUi")
    .directive("globalNavigation", ['$q', '$interval', '$route', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskAnimationService' , '$timeout', 'HigiKioskFlow', 'HigiApiService', function($q, $interval, $route, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskAnimationService, $timeout,HigiKioskFlow, HigiApiService) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/global-navigation.html',
        controller: function ($scope, $rootScope) {
            $scope.init = function () {
                $rootScope.ZugECGEmergencySkipClicked = false;
                $scope.isVisibleLanguage = false;
                $rootScope.isVisibleAudio = false;
                $scope.isVisibleAudioSlider = false;
                $rootScope.isVisibleExit = false;
                $rootScope.isVisibleLogin = true;
                $rootScope.isVisibleReg = true;
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleProfileImage = false;
                $rootScope.homeButtonShow = false;
                $rootScope.showPrintButton = false;
                $rootScope.showEmailButton = false;
                $scope.isLoggedInLangClass = "";
                $scope.newUserNoLastCheckinVisible = false;
                $scope.apiNotAvailableTipVisible = false;
                $scope.legOFFStatus = false;
                $scope.emergencyStopStatus = false;      
                $rootScope.registerLabel = 'global.globalnav.register';
                $scope.audioLabel = 'global.audio';
                $scope.exitLabel = 'global.exit';
                $scope.homeLabel = 'global.home';
                $scope.logoutLabel = 'global.signout';
                $scope.loginLabel = 'global.globalnav.login';
                $scope.completeCheckin = 'welcomeModals.complete.to.view.and.edit.profile';
                $scope.apiOffline = "global.api.offline";
                $scope.language_ = "global.language";
                $scope.profile_ = "global.profile";
                $scope.loginMode = {id: 'login', clicked: true};
                $scope.loginMebMode = {id: 'loginMeb', clicked: true};
                $scope.registerMode= {id : 'register' , clicked : true};
                $scope.langLabelSwap();

                $scope.enteryouremailadd = "global.adhar";
                $scope.skipp = "global.skip";

                $scope.telemedicinebuttontitle = 'global.telemedicine.buttontitle';

                $scope.langText = "global.langTextEng";
                $scope.sanjeevaniLabel = "global.sanjeevani";
            };
            $scope.setLanguageClicked = function (file) {
                //Moving to ng-click TODO - remove after 6.14 release
                //JkioskService.beginKioskSession();
                //var lang = (file.label == "Spanish") ? '_esButton' : '_enButton';
                $rootScope.currentlanguage = file.label;
                var lang;
                if(file.label == "English"){
                    lang = '_enButton' ;

                    /*for old language buton*/
                    //$('.imgg').attr('src', 'images/lang_en_icon20150116.png');
                    /*for old language buton*/

                    /*for new language buton*/
                    $('.imgg').attr('src', 'images/united-states.png');
                    $('#langId').css({'margin-top': '5px'});
                    $scope.langText = "global.langTextEng";
                    /*for new language buton*/

                    /* $('link[href="css/style_hindi.css"]').prop('disabled', true);
                    $('link[href="css/style_tamil.css"]').prop('disabled', true);

                    $('link[href="css/style.css"]').prop('disabled', false);

                    $('head').append('<link href="css/style.css" rel="stylesheet" />');*/

                    // $('<link>')
                    // .appendTo('head')
                    // .attr({
                    //     type: 'text/css', 
                    //     rel: 'stylesheet',
                    //     href: 'css/style.css'
                    // });      
                }else if(file.label == "Tamil"){
                    lang = '_tmButton' ;
                    
                    /*for old language buton*/
                    //$('.imgg').attr('src', 'images/indi.png');
                    /*for old language buton*/

                    /*for new language buton*/
                    $('.imgg').attr('src', 'images/india.png');
                    $('#langId').css({'margin-top': '0px'});
                    $scope.langText = "global.langTextTam";
                    /*for new language buton*/

                    /*$('link[href="css/style_hindi.css"]').prop('disabled', true);
                    $('link[href="css/style.css"]').prop('disabled', true);

                    $('link[href="css/style_tamil.css"]').prop('disabled', false);

                    $('head').append('<link href="css/style_tamil.css" rel="stylesheet" />');*/


                    // $('<link>')
                    // .appendTo('head')
                    // .attr({
                    //     type: 'text/css', 
                    //     rel: 'stylesheet',
                    //     href: 'css/style_tamil.css'
                    // });       
                }else if(file.label == "Hindi"){
                    lang = '_hiButton' ;

                    /*for old language buton*/
                    //$('.imgg').attr('src', 'images/indi.png');
                    /*for old language buton*/

                    /*for new language buton*/
                    $('.imgg').attr('src', 'images/india.png');
                    $('#langId').css({'margin-top': '4px'});
                    $scope.langText = "global.langTextHin";
                    /*for new language buton*/

                  /*$('link[href="css/style_tamil.css"]').prop('disabled', true);
                    $('link[href="css/style.css"]').prop('disabled', true);
                    $('link[href="css/style_hindi.css"]').prop('disabled', false);

                    $('head').append('<link href="css/style_hindi.css" rel="stylesheet" />');*/

                    // $('<link>')
                    // .appendTo('head')
                    // .attr({
                    //     type: 'text/css', 
                    //     rel: 'stylesheet',
                    //     href: 'css/style_hindi.css'
                    // });   
                }else if(file.label == "Marathi"){
                    lang = '_miButton' ;

                    /*for old language buton*/
                    //$('.imgg').attr('src', 'images/indi.png');
                    /*for old language buton*/

                    /*for new language buton*/
                    $('.imgg').attr('src', 'images/india.png');
                    $('#langId').css({'margin-top': '4px'});
                    $scope.langText = "global.langTextMar";
                    /*for new language buton*/

                  /*$('link[href="css/style_tamil.css"]').prop('disabled', true);
                    $('link[href="css/style.css"]').prop('disabled', true);
                    $('link[href="css/style_hindi.css"]').prop('disabled', false);

                    $('head').append('<link href="css/style_hindi.css" rel="stylesheet" />');*/

                    // $('<link>')
                    // .appendTo('head')
                    // .attr({
                    //     type: 'text/css', 
                    //     rel: 'stylesheet',
                    //     href: 'css/style_marathi.css'
                    // });   
                }
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + lang, 'button', 'pressed');

                $rootScope.currentLangId = file.buttonId;
                $scope.getLang = file.buttonId.split("language_select_");
                $rootScope.termsAndPrivacyDocLang = $scope.getLang[1];
                
                if ($rootScope.isMEBOrg){
                    $rootScope.loginModelMEBInit(); //trigger the placeholder json file  
                } else {
                     $rootScope.loginModelInit(); //trigger the placeholder json file  
                }
                
                $scope.setLanguage(file);
            };

            $scope.langLabelSwap = function () {
                $scope.lang = true;
                $interval(function () {
                    $scope.lang = !$scope.lang;
                    $scope.englishClass = ($scope.lang) ? 'langFadeIn' : 'langFadeOut';
                    $scope.spanishClass = (!$scope.lang) ? 'langFadeIn' : 'langFadeOut';
                }, 5000);
            };
            $scope.langToggle = function () {
                if ($route.current.$$route.originalPath.search("welcome") != -1) {
                    $rootScope.setKioskADAMode();
                }
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_slideContent_languageButton', 'button', 'pressed');
                $scope.isVisibleLanguage = !$scope.isVisibleLanguage;
                $scope.isVisibleAudioSlider = false;
                
                if ($scope.isVisibleLanguage) {
                    //Setting scroll bar for language container.
                    $timeout(function(){ 
                        let scroller = new FTScroller(document.getElementById('higi_language_content'), {scrollingX: false});
                    },100); 
                }
            };
            $scope.langHideMask = function () {
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_slideContent_languageMask', 'button', 'pressed');
                $scope.isVisibleLanguage = !$scope.isVisibleLanguage;
                $scope.isVisibleAudioSlider = false;
            };
            $scope.toggleAudioSlider = function () {
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_slideContent_volumeButton', 'button', 'pressed');
                $scope.isVisibleAudioSlider = !$scope.isVisibleAudioSlider;
                $scope.isVisibleLanguage = false;
            };

            $scope.hideAudioSlider = function () {
                $scope.isVisibleAudioSlider = false;
            };
            $scope.showLoggedInNav = function () {
                $scope.isVisibleLogin = false;
                $scope.isVisibleReg = false;
                $scope.isVisibleExit = true;
                //$scope.isVisibleProfileImage = true;
            };

            $scope.exitButtonClick = function () {
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitButton', 'button', 'pressed');
                HigiKioskAnimationService.audioStop();

                if ($scope.videoPlaying) {
                    $scope.video.pause();
                    $scope.videoPaused = true;
                    $scope.videoPlaying = false;
                }
                $rootScope.loadModal({id: 'exitconfirm'});
            };
            $scope.ZugECGemergencyStop = function(){
                //alert("Emergency ECG Stop Clicked");
                $("#ecgTestSkippedMessage").show();
                $rootScope.StopLEGHandDetectionCheck();
                $rootScope.ZugECGEmergencySkipClicked = true;
                $rootScope.StopLEGHandDetection = true;
                $rootScope.ecgPoorResult = true;
                $rootScope.stopECGProgress();
                $rootScope.showEcgSlider = true;
            }
            $scope.ECGLegOFFStatusCallbackFunction = function(response){
                $scope.legOFFStatus = response.ecgLegOFFStatus;
                console.log("legoffcallback "+$scope.legOFFStatus);
           };

            $scope.ZugECGemergencyStopCallbackFunction = function(response){
                $scope.emergencyStopStatus = response.Value;
                //$rootScope.ZugECGEmergencySkipClicked = true;
                console.log("Emergency ECG Stop callback "+$scope.emergencyStopStatus);
                JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
                $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
                if($scope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "ECG";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $("#ecgTestSkippedMessage").hide();
                    $timeout(function(){
                        window.location = nextTestPath;
                      },3000);         
                    window.location = nextTestPath;
                }  else if($rootScope.selectedVital.length > 1){
                      var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                      $scope.nextSlide = nextTestPath;
                      $("#ecgTestSkippedMessage").hide();
                      $timeout(function(){
                          window.location =  $scope.nextSlide;
                      },3000);         
                } else {
                      $("#ecgTestSkippedMessage").hide();
                      $timeout(function(){
                         window.location.href="#/finish/forward";
                      },3000);         
                }
            }


            $scope.showLastCheckin = function () {
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_profileButton', 'button', 'pressed');
                if (HigiKioskStorageService.returnSessionData('lastCheckin') != undefined) {
                    HigiKioskAnimationService.audioStop();
                    if ($scope.videoPlaying) {
                        $scope.video.pause();
                        $scope.videoPaused = true;
                    }
                    $rootScope.loadModal({id: 'lastcheckin'});
                }
                else {
                    $timeout.cancel($scope.toolTipTimeout);
                    $scope.newUserNoLastCheckinVisible = !$scope.newUserNoLastCheckinVisible;
                    if ($scope.newUserNoLastCheckinVisible) {
                        $scope.toolTipTimeout = $timeout(function () {
                            $scope.newUserNoLastCheckinVisible = false;
                        }, 5000);
                    }
                }
            };

            $scope.apiAvailableWatch = function (newVal, oldVal) {
                if (newVal != undefined) {
                    $scope.apiAvailable = newVal;
                }
            };
            $scope.loggedInWatch = function (newVal) {
                $scope.loggedIn = newVal;
            };



            HigiKioskStorageService.watchSessionData('apiAvailable',  $scope.apiAvailableWatch);
            HigiKioskStorageService.watchSessionData('logged_in', $scope.loggedInWatch);

            $scope.showLoginModal = function () {
                console.log($rootScope.isMEBOrg);
                $rootScope.eSanjeevaniFlow = false;
                if ($rootScope.isMEBOrg){// == "MEB-Medi Buddy") {
                    $rootScope.loginModelMEBInit(); //trigger the placeholder json file 
                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton', 'button', 'pressed');
                    $rootScope.loadModal($scope.loginMebMode);
                } else {
                    $rootScope.registerModalInit(); //trigger the placeholder json
                    $rootScope.loginModelInit(); //trigger the placeholder json file 
                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton', 'button', 'pressed');
                    $rootScope.loadModal($scope.loginMode);
                }
            };

            $scope.loginButtonClick = function () {
                console.log('callloginButtonClick');
                //alert(HigiKioskStorageService.returnSessionData('logged_in'));
                //alert(HigiKioskUserService.onboardingDone());
                $rootScope.ivtSelectedTest = [];
                if($rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == true && $rootScope.ivtSelectedTest.length == 0){
                    $rootScope.ivtSelectedTest = $rootScope.selectedIvtListArray;
                    localStorage.setItem("ivtSelectedTest",JSON.stringify($rootScope.ivtSelectedTest));
                }
                /** BP and ECG vital test postion change, if user select temperature module */
                if($rootScope.selectedVital.length > 0){
                  /*if($rootScope.selectedVital.includes("temp") && $rootScope.selectedVital.indexOf("temp") != $rootScope.selectedVital.length - 1){
                    if($rootScope.selectedVital.includes("ekg")){
                        let ekgPos = $rootScope.selectedVital.indexOf("ekg");
                        $rootScope.selectedVital[ekgPos] = $rootScope.selectedVital[0]; 
                        $rootScope.selectedVital[0] = "ekg";
                    }
                    if($rootScope.selectedVital.includes("bp")){
                        let bpPos = $rootScope.selectedVital.indexOf("bp");
                        $rootScope.selectedVital[bpPos] = $rootScope.selectedVital[0]; 
                        $rootScope.selectedVital[0] = "bp";
                    }
                    if($rootScope.selectedVital.includes("bp") && $rootScope.selectedVital.includes("ekg")){
                        let bpPos = $rootScope.selectedVital.indexOf("bp");
                        $rootScope.selectedVital[bpPos] = $rootScope.selectedVital[0]; 
                        $rootScope.selectedVital[0] = "bp";
                        let ekgPos = $rootScope.selectedVital.indexOf("ekg");
                        $rootScope.selectedVital[ekgPos] = $rootScope.selectedVital[1]; 
                        $rootScope.selectedVital[1] = "ekg";
                    }
                  } */

                  // temperature test set last, because 'Heart Rate' required for temperature calculation
                  if($rootScope.selectedVital.includes("temp")){
                    let tempPos = $rootScope.selectedVital.indexOf("temp");
                    $rootScope.selectedVital[tempPos] = $rootScope.selectedVital[$rootScope.selectedVital.length-1]; 
                    $rootScope.selectedVital[$rootScope.selectedVital.length-1] = "temp";                    
                  }

                  // invasive test set first.
                  if($rootScope.selectedVital.includes("ivt")){
                    let ivtPos = $rootScope.selectedVital.indexOf("ivt");
                    $rootScope.selectedVital[ivtPos] = $rootScope.selectedVital[0]; 
                    $rootScope.selectedVital[0] = "ivt";                    
                  }


                    /* WE HAVE REMOVE THE WEIGHT TEST IF SELECTED VITALS HAVE BMC */
                    if ($rootScope.selectedVital.includes("w") && $rootScope.selectedVital.includes("bmc")) {
                        if ($rootScope.hardwareAvailability['Body Composition'] || $rootScope.hardwareAvailability['FullBodyCompositionAnalyser']) {
                            let wIndex = $rootScope.selectedVital.indexOf("w");
                            $rootScope.selectedVital.splice(wIndex, 1);
                            $rootScope.weightExcluded = true;
                        } else {
                            let bmcIndex = $rootScope.selectedVital.indexOf("bmc");
                            $rootScope.selectedVital.splice(bmcIndex, 1);
                            $rootScope.bmcExcluded = true;
                        }
                    }
                }

                console.log($rootScope.selectedVital);

                /* Flipkart Health Plus Flow */
                if ($rootScope.flipKartPlus) {
                    window.location.href="#/flipkart-plus-instruction";
                    return 0;
                }

                if (HigiKioskStorageService.returnSessionData('logged_in') == false && HigiKioskUserService.onboardingDone() == false) {
                    $("#login_username_error_newest3").text("");// empty the validation text
                    $rootScope.keyboardHide();
                    //HigiKioskAnimationService.audioStop();
                    //if on splashpage check for ada mode and clear out mode from earlier splash page clicks.
                    if ($route.current.$$route.originalPath.search("welcome") != -1) {
                        $scope.mode = "";
                        $rootScope.setKioskADAMode();
                    }

                    var apiAvailableCallback =function (resp) {
                        //alert(resp.apiStatus);
                        if (resp.apiStatus === "Online") {
                            $rootScope.fingerPrintOrEmailMobile = true;
                            $scope.showLoginModal();
                        } else {
                            if ($rootScope.kioskWithPaymentMode == true && $rootScope.vitalPayment == true) {
                               $("#kioskPaymentOfflineModal").show(); 

                               $timeout(function(){
                                 $("#kioskPaymentOfflineModal").hide();
                               },4000);
                               return;
                            }else{
                                $rootScope.loadModal({id : 'regprompt'});
                                /*$timeout.cancel($scope.apiToolTipTimeout);
                                $scope.apiNotAvailableTipVisible = !$scope.apiNotAvailableTipVisible;
                                if ($scope.apiNotAvailableTipVisible) {
                                    $scope.apiToolTipTimeout = $timeout(function () {
                                        $scope.apiNotAvailableTipVisible = false;
                                    }, 5000);
                                }*/ 
                            }
                        }
                    };

                    JkioskService.apiStatus(apiAvailableCallback);  
                }else if (HigiKioskStorageService.returnSessionData('logged_in') == true && HigiKioskUserService.onboardingDone() == true) {
                    $scope.checkForKioskPaymentFlowOptionsForLoggedInUsers(); 
                }else if (HigiKioskStorageService.returnSessionData('logged_in') == false && HigiKioskUserService.onboardingDone() == true) {
                    if ($rootScope.IHLTeleConsultSelected == true) {
                        $("#login_username_error_newest3").text("");// empty the validation text
                        $rootScope.keyboardHide();
                        //if on splashpage check for ada mode and clear out mode from earlier splash page clicks.
                        if ($route.current.$$route.originalPath.search("welcome") != -1) {
                            $scope.mode = "";
                            $rootScope.setKioskADAMode();
                        }

                        var apiAvailableCallback =function (resp) {
                            //alert(resp.apiStatus);
                            if (resp.apiStatus === "Online") {
                                $rootScope.fingerPrintOrEmailMobile = true;
                                $scope.showLoginModal();
                            } else {
                                $rootScope.loadModal({id : 'regprompt'});
                                /*$timeout.cancel($scope.apiToolTipTimeout);
                                $scope.apiNotAvailableTipVisible = !$scope.apiNotAvailableTipVisible;
                                if ($scope.apiNotAvailableTipVisible) {
                                    $scope.apiToolTipTimeout = $timeout(function () {
                                        $scope.apiNotAvailableTipVisible = false;
                                    }, 5000);
                                }*/

                            }
                        };

                        JkioskService.apiStatus(apiAvailableCallback);  
                    }else{
                        $rootScope.mode = $rootScope.selectedVital[0];
                        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                        $rootScope.lastCheckinModalShow = false;
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
                    }
                    
                }else if (HigiKioskStorageService.returnSessionData('logged_in') == true && HigiKioskUserService.onboardingDone() == false) {
                    if($rootScope.selectedVital.length > 0 && $rootScope.kioskWithPaymentMode && $rootScope.isEmailLoginUserFreeServiceEnable){
                        $scope.checkFreeAccess()
                        .then(() => {
                            $scope.checkForKioskPaymentFlowOptions();
                        })
                        .catch((error) => {
                            console.log(error);
                            $scope.checkForKioskPaymentFlowOptions();
                        });
                    }else{
                        $scope.checkForKioskPaymentFlowOptions()
                    }
                    // $scope.checkForKioskPaymentFlowOptions();
                }
            };

            $scope.checkForKioskPaymentFlowOptionsForLoggedInUsers = function(){
               if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false && $rootScope.paymentTransactionCompleted == false) {
                    //$rootScope.clearModal();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.initializeLoggedInUserVitalTests;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);
                    if(!$rootScope.emailLoginUserFreeServiceAccessGranted){
                        if ($rootScope.checkPreviousPaymentSession() == true && !$rootScope.isVitalTestCompleted) {
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
    
                            $timeout(() => {
                                $rootScope.loadModal({id: 'serviceProvider'});
                            },300);
                        }else{
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
    
                            $timeout(() => {
                                $rootScope.loadModal({id: 'reasonForVisit'});
                            },300);
                        }
                    }else{
                        $scope.initializeLoggedInUserVitalTests();
                    }
                }else{
                    $scope.initializeLoggedInUserVitalTests();
                }
            }

            $scope.initializeLoggedInUserVitalTests  = function(){
                if ($rootScope.IHLTeleConsultSelected == true) {
                    HigiKioskStorageService.saveSessionData('current_mode', "TC");
                    window.location =  "#/ihl-teleconsultation-main-dashboard";
                }else{
                    console.log($rootScope.selectedVital);
                    if (localStorage.getItem("paymentSessionVitalTest") != undefined && localStorage.getItem("paymentSessionVitalTest") != null && $rootScope.invasiveEnable == true) {
                        let paymentSessionVitalTest = JSON.parse(localStorage.getItem("paymentSessionVitalTest"));
                        if(paymentSessionVitalTest.includes("ivt") && $rootScope.ivtIndexRemove == true && !$rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat){// $scope.ivtIndexRemoveFromWelcome -> for payment flow => fianl result => welcome => select ivt test again.
                            const index = paymentSessionVitalTest.indexOf('ivt');
                            if (index > -1) { // only splice array when item is found
                              paymentSessionVitalTest.splice(index, 1); // 2nd parameter means remove one item only
                              $rootScope.selectedVital = paymentSessionVitalTest;
                            }
                        } else {
                            if($rootScope.selectedVital.includes("ivt")){
                                let ivtPos = $rootScope.selectedVital.indexOf("ivt");
                                $rootScope.selectedVital[ivtPos] = $rootScope.selectedVital[0]; 
                                $rootScope.selectedVital[0] = "ivt";
                            }
                            console.log($rootScope.selectedVital);
                        }
                    }

                    $rootScope.mode = $rootScope.selectedVital[0];
                    HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                    $rootScope.lastCheckinModalShow = false;
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
                }
            }

            $scope.checkForKioskPaymentFlowOptions = function(){
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false && $rootScope.paymentTransactionCompleted == false) {
                    //$rootScope.clearModal();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.initializeVitalTests;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);
                    if(!$rootScope.emailLoginUserFreeServiceAccessGranted){
                        if ($rootScope.checkPreviousPaymentSession() == true && !$rootScope.isVitalTestCompleted) {
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
    
                            $timeout(() => {
                                $rootScope.loadModal({id: 'serviceProvider'});
                            },300);
                        }else{
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
    
                            $timeout(() => {
                                $rootScope.loadModal({id: 'reasonForVisit'});
                            },300);
                        }
                    }else{
                        $scope.initializeVitalTests(); 
                    }
                }else if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false && $rootScope.paymentTransactionCompleted == true) {
                    //$rootScope.clearModal();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.initializeVitalTests;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);
                    //To hide the reason for visit close button.
                    //$(".keyboard_class_close_btn").hide();

                    /*$timeout(() => {
                        $rootScope.loadModal({id: 'reasonForVisit'});
                    },150);*/
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                }else{
                   $scope.initializeVitalTests(); 
                }
            }

            $scope.initializeVitalTests  = function(){
                if ($rootScope.IHLTeleConsultSelected == true) {
                    HigiKioskStorageService.saveSessionData('current_mode', "TC");
                    window.location =  "#/onboarding1/forward/enter";
                }else{
                    $rootScope.mode = $rootScope.selectedVital[0];
                    HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                    $rootScope.lastCheckinModalShow = false;
                    window.location =  "#/onboarding1/forward/enter";  
                }
            }

            $scope.registerButtonClick = function(){
				$rootScope.fingerprintRegretSectionNew = false;
                document.getElementById("login_username_error_newest").innerHTML = ""; // Empty the error warning msg.
                document.getElementById("login_username_error_new").innerHTML = ""; // Empty the error warning msg.
                document.getElementById("login_username_error_new2").innerHTML = ""; // Empty the error warning msg.
                            //language place holder
                $("#emailReg2").attr("placeholder", $scope.interfaceLabels['global.enter.your.emailid']);
                $("#emailReg3").attr("placeholder", $scope.interfaceLabels['global.enter.your.emailid']);
                $("#firstname").attr("placeholder", $scope.interfaceLabels['global.enterfir']);
                $("#lastname").attr("placeholder", $scope.interfaceLabels['global.enterlast']);
                $("#passwordReg").attr("placeholder", $scope.interfaceLabels['global.enteryouypasswords']);
                $("#confirmPassNow").attr("placeholder", $scope.interfaceLabels['global.confirmyourpassword']);


                
                //if on splashpage check for ada mode and clear out mode from earlier splash page clicks.
                if($route.current.$$route.originalPath.search("welcome") != -1){
                    $rootScope.mode = "";
                    $rootScope.setKioskADAMode();
                }
				 var apiAvailableCallback =function (resp) {
                    if (resp.apiStatus === "Online") {
						JkioskService.beginKioskSession();
						JkioskService.logEvent($rootScope.higiPageName + '_registerButton', 'button', 'pressed');
						//$rootScope.loadModal($scope.loginMode);
                        setTimeout(function() {
                           $rootScope.loadModal($scope.registerMode);

                        }, 800);
                        
                    } else {
                        $timeout.cancel($scope.apiToolTipTimeout);
                        $scope.apiNotAvailableTipVisible = !$scope.apiNotAvailableTipVisible;
                        if ($scope.apiNotAvailableTipVisible) {
                            $scope.apiToolTipTimeout = $timeout(function () {
                                $scope.apiNotAvailableTipVisible = false;
                            }, 5000);
                        }

                    }
                };
                
                JkioskService.apiStatus(apiAvailableCallback);
				
                
            };

            $scope.telemedicineclick= function() {
                /*if ($rootScope.telemediApiVendor == "genix") {
                    window.location = "#/speciality";
                }else{
                    window.location = "#/specialist"; 
                }       */
                $rootScope.loadModal({id: 'telemedicinemodalbox'});    
            };

            $rootScope.showLoggedInNav = $scope.showLoggedInNav;
            $rootScope.showLastCheckin = $scope.showLastCheckin;
            $scope.init();

            
            $scope.closeLanguageDropdown = function(){
                $scope.isVisibleLanguage = !$scope.isVisibleLanguage;    
            }

            /* E-SANJEEVANI FLOW FUNCTIONALITY START */
            $scope.sanjeevaniButtonClick = function() {
                $rootScope.eSanjeevaniFlow = true;
                $rootScope.loginESanjeevaniModalInit(); //trigger the placeholder json file 
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton', 'button', 'pressed');
                $rootScope.loadModal({id: 'eSanjeevaniFlow'});
                $scope.resetDashboard();
            }

            $scope.resetDashboard = function() {
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
                $rootScope.selectedIvtListArray = [];
                $scope.IHLInvasiveTestButtonClass = "invasive_test_button_deactive";
                // $rootScope.resetIvtDashboard();
                $rootScope.IHLTeleConsultMainButtonClicked = false;
                $rootScope.ihlTeleconsultationSelectDeselect();
            }
            /* E-SANJEEVANI FLOW FUNCTIONALITY END */

            $scope.checkFreeAccess = function() {
                return new Promise((resolve, reject) => {
                    let success = (res) => {
                        let result = res;
                        if(result["status"] == "success" && result["message"] == "Access granted"){
                            $rootScope.emailLoginUserFreeServiceAccessGranted = true;
                            resolve();
                        }else{
                            $rootScope.emailLoginUserFreeServiceAccessGranted = false;
                            reject("Access denied");
                        }
                    }
        
                    let error = (err) => {
                        console.log(err);
                        $rootScope.emailLoginUserFreeServiceAccessGranted = false;
                        reject(err);
                    }
        
                    let json = {
                        "email": HigiKioskStorageService.returnSessionData('email'),
                        "purpose": "vital"
                    }
                    HigiApiService.isEmailLoginUserFreeServiceAvail(JSON.stringify(json), success, error);
                });
            }
        }

    }
}]);