higiKioskControllers.directive('higiModal', ['HigiKioskStorageService', 'HigiKioskFlow', 'HigiKioskUserService', 'HigiKioskAnimationService', '$route', 'JkioskService', '$timeout', '$location', '$interval', function(HigiKioskStorageService, HigiKioskFlow, HigiKioskUserService, HigiKioskAnimationService, $route, JkioskService, $timeout, $location,$interval) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/modal.html',
        controller :function($scope, $rootScope, $timeout){
            $scope.modalVisible = false;
            $scope.modalShowStateClass = "";

            $scope.$watch('modalVisible', function(newVal, oldVal){
                $rootScope.globalModalVisible = newVal;


            });


            $scope.modalShow = function() {
                //If modal show fires before hide timeout, cancel to prevent unintended hiding
                $timeout.cancel($scope.modalDisplayTimeout);
                //$scope.modalShowStateClass = 'modalFadeIn';
                //$scope.modalBgShowStateClass = 'modalBgFadeIn';
                $scope.modalActive = 'modal-wrap';
                $scope.modalVisible = true;
                $scope.fpCheck();
            };
            $scope.setModalNotVisible = function(){
                $scope.modalVisible = false;
                $scope.modalInfoboxVisible = false;
                $scope.resetModalVisible();
            };

            $scope.fpCheck = function(){
                //$rootScope.hardwareAvailability['Fingerprint'] = true;
                if (!$rootScope.hardwareAvailability['Fingerprint']) {
                    $(".login_modal_quick_options_fingerprint_container").css("opacity", "0.5");
                    document.getElementById('fingerprintLogin').disabled = 'disabled';
                    $("#fp-not-connect").show();
                } else {
                    $(".login_modal_quick_options_fingerprint_container").css("opacity", "1");
                    document.getElementById('fingerprintLogin').disabled = '';
                    $("#fp-not-connect").hide();
                }
            }


            $scope.modalHide = function(playRegprompt) {

                var path = $location.path();

                //If confirming terms on splashpage, playRegprompt = true will prevent the select options audio from playing
                JkioskService.logEvent($rootScope.currentKeyboardState + '_closeButton', 'button', 'pressed');
                JkioskService.logStartScreen(HigiKioskStorageService.returnSessionData('higiPageName') + "_modalClose");
                $scope.modalActive = '';
                $timeout.cancel($scope.modalDisplayTimeout);
                var delay = 0;
                $scope.modalDisplayTimeout = $timeout($scope.setModalNotVisible,delay);
                HigiKioskAnimationService.audioResume();
                $rootScope.keyboardHide();
                $rootScope.functionCallAbort = false;
                $rootScope.qrCodeMobileDownload = false;

                if (!playRegprompt && $rootScope.mehtaFlow && $scope.modalList[$scope.modalMehtaUserVisible]) {
                    //$rootScope.mehtaFlow = false;
                    if ($rootScope.mehtaNextSlide != '') {
                        window.location = $rootScope.mehtaNextSlide;
                    }
                    else {
                        $rootScope.mode = $rootScope.selectedVital[0];
                        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                    }
                }

                if($rootScope.isUserSeated) {
                    $rootScope.stopSessionTimeout();
                }
                if(playRegprompt != true){
                    $scope.regPromptStartTest();
                }
                $rootScope.clearTextFields();

                if(document.getElementById("login_username2323")){
                  document.getElementById("login_username2323").style.display = "none";
                }

                document.getElementById("keyboard").style.display = "block";
                if(document.getElementById("fingerprint_not_matched_regret_message")){
                    document.getElementById("fingerprint_not_matched_regret_message").style.display = "none";
                }
                if(document.getElementById("fingerprint_section_login")){
                    document.getElementById("fingerprint_section_login").style.display = "none";
                }
                if(document.getElementById("fingerprint_not_matched_regret_message")){
                    document.getElementById("fingerprint_not_matched_regret_message").style.display = "none";
                }
                if(document.getElementById("fingerprint_section_login_register")){
                    document.getElementById("fingerprint_section_login_register").style.display = "none";
                }
                if(document.getElementById("fingerprint_not_matched_regret_message_new")){
                    document.getElementById("fingerprint_not_matched_regret_message_new").style.display = "none";
                }
                if(document.getElementById("fingerprint_already_exists")){
                    document.getElementById("fingerprint_already_exists").style.display = "none";
                }
                if(document.getElementById("numCircle4")){
                    document.getElementById("numCircle4").classList.add("bg_change_n");
                }
                if (document.getElementById("fingerprint_animation_fornow2")) {
                    document.getElementById("fingerprint_animation_fornow2").style.display = "none";
                }
                if(document.getElementById("login_username1995")){
                    document.getElementById("login_username1995").style.display = "none";
                }
                if(document.getElementById("register-first-screen-text9")){
                    document.getElementById("register-first-screen-text9").innerHTML = "";
                }
                if(document.getElementById("register-first-screen-text7")){
                    document.getElementById("register-first-screen-text7").innerHTML = "";
                }
                //noInternetText
                if(document.getElementById("noInternetText")){
                    document.getElementById("noInternetText").style.display = "none";
                }

                if (document.getElementById("errorMessageFinalPageLogin")){
                    document.getElementById("errorMessageFinalPageLogin").style.display = "none";
                }

                if (document.getElementById("fingerprintAddError")){
                    document.getElementById("fingerprintAddError").style.display = "none";
                }
                if (document.getElementById("affiliatestatuss")) {
                    var dropDown = document.getElementById("affiliatestatuss");
                    dropDown.selectedIndex = 0;
                }
                if (document.getElementsByName("affiliateClick")) {
                    $('input[name=affiliateClick]').attr('checked',false);
                }                
                if($rootScope.mobileNumberValidate == true && path == "/specialist"){
                    $("#teleMedGem3sMobileInputReq").show();
                }

                // For coponcode popup shoe to user on apollo tele consultation flow
                if(path == "/ihl-teleconsultation-summary" && $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO' && $rootScope.couponCodePrinted == false){
                    $rootScope.apolloCouponCodeGenerate();
                }                

                //fingerprint_already_exists
                //$scope.loginModal.loginCreateFingerprintCapturingSection = false;
                //document.getElementById("fingerprint_section_login").style.display = "none";
                if(document.getElementById("signup_mail_placeholder")){
                    var login_placeholder = document.getElementById("signup_mail_placeholder");
                    login_placeholder.innerHTML = ($scope.interfaceLabels[$scope.enteryouremailadd] != undefined) ? $scope.interfaceLabels[$scope.enteryouremailadd] : '';
                    login_placeholder.style.fontSize = "16px";
                    login_placeholder.classList.remove("regMailid");
                    login_placeholder.classList.add("login_placeholder_text");
                }
                if(document.getElementById("numCircle2")){
                    document.getElementById("numCircle2").classList.remove("bg_change2");   
                }
                if(document.getElementById("numCircle5")){
                    document.getElementById("numCircle5").classList.remove("bg_change3");
                }
                if(document.getElementById("numCircle3")){
                    document.getElementById("numCircle3").classList.remove("bg_change3");    
                }
                
                if(document.getElementById("myBar")){
                    document.getElementById("myBar").style.width = 0 +"%";    
                }
                
                if(document.getElementById("fingerprint_capturing_animation_section")){
                    document.getElementById("fingerprint_capturing_animation_section").style.display = "none";
                }
                
                if(document.getElementById("login_username_submit_btn")){
                    var login_next_btn = document.getElementById("login_username_submit_btn");
                    login_next_btn.style.left = "476px";
                    login_next_btn.style.top = "112px";                    
                }

                if(document.getElementById("keyboardbox")){
                    document.getElementById("keyboardbox").style.display = "block";   
                }
                //stop asynchronous calls
                 $timeout.cancel($rootScope.finger_regret_msg_async);
                 $timeout.cancel($rootScope.show_email_section_async); 
                 $timeout.cancel($rootScope.fingerprint_capturing_async); 
                 $timeout.cancel($rootScope.first_email_section_async); 
                 $timeout.cancel($rootScope.second_email_section_async);
                                 
                 if($rootScope.clearRegisterScreens != undefined){
                    $rootScope.clearRegisterScreens();
                 }
                 if($rootScope.clearLoginScreens != undefined){
                    $rootScope.clearLoginScreens();    
                 }
                //  if($rootScope.clearAbhaVerify != undefined){
                //     $rootScope.clearAbhaVerify();
                //  }  
                if( ($rootScope.lastCheckinModalShow !== undefined &&  $rootScope.lastCheckinModalShow == true && $rootScope.lastCheckinModalFirstFlow == undefined ) || $rootScope.mehtaPopupCloseAfterLastCheckin == true){
                    $scope.checkPaymentOption();
                }

                if (($rootScope.flipKartPlus && $rootScope.enableCamera) || $rootScope.shutDownHPod) {
                    window.location = 'index.html';
                }

                if($rootScope.showTimer){
                    $rootScope.showTimer = false;
                    $interval.cancel($rootScope.timerPromise)
                }
            };

            //When closing regrompt modal
            $scope.regPromptStartTest = function(){
                //If logged in, begin selected test
                if(HigiKioskStorageService.returnSessionData('logged_in')){
                    if($scope.mode != "" && $route.current.$$route.originalPath.search("welcome") != -1 && $rootScope.homeBtnClick == false){
                        var onboardingDone = HigiKioskUserService.onboardingDone();
                        if($scope.mode == "bp"){
                            if(onboardingDone){
                                //Logged in, bp mode, and has height and weight defined
                                path = "#/bloodpressure1/forward";
                            } else {
                                //Logged in, bp mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        } else if($scope.mode == "bpw" ){
                            if(onboardingDone){
                                //Logged in, bp and weight mode, and has height and weight defined
                                //path = "#/bloodpressure1/forward";
                                var currenttest;
                                path = HigiKioskFlow.nextTest("bpw",currenttest);
                            } else {
                                //Logged in, bp and weight mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        } else if($scope.mode == "w" ){
                            if(onboardingDone){
                                //Logged in, weight mode, and has height and weight defined
                                path = "#/weight1/forward";
                            } else {
                                //Logged in, weight mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        }else if($scope.mode == "bmc" ){
                            if(onboardingDone){
                                //Logged in, bmc mode, and has height and weight defined
                                path = "#/weight1/forward";
                            } else {
                                //Logged in, bmc mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        }else if($scope.mode == "spo2" ){
                            if(onboardingDone){
                                //Logged in, spo2 mode, and has height and weight defined
                                path = "#/spotwo1/forward";
                            } else {
                                //Logged in, spo2 mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        }else if($scope.mode == "temp" ){
                            if(onboardingDone){
                                //Logged in, thermometer mode, and has height and weight defined
                                path = "#/temp1/forward";
                            } else {
                                //Logged in, thermometer mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        }else if($scope.mode == "ivt" ){
                                if(onboardingDone){
                                    //Logged in, thermometer mode, and has height and weight defined
                                    path = "#/invasiveInstruction/forward";
                                } else {
                                    //Logged in, thermometer mode, but missing data, go to onboarding
                                    path = "#/onboarding1/forward/enter";
                                }
                        }else if($scope.mode == "ekg" ){
                            if(onboardingDone){
                                //Logged in, ekg mode, and has height and weight defined
                                path = "#/zugecgmode/forward";
                            } else {
                                //Logged in, ekg mode, but missing data, go to onboarding
                                path = "#/onboarding1/forward/enter";
                            }
                        }
                        window.location = path;
                    } else {
                        //If on welcome screen play three options audio
                        if($route.current.$$route.originalPath.search("welcome") != -1){
                            HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels['splash_selectoneofthree'], $scope);
                        } else {
                            //Resolve global promise to finish updating interface if logging in on final results screen
                            if( $rootScope.finalResultsCheckinLastCheckinClose != undefined){
                                $rootScope.finalResultsCheckinLastCheckinClose.resolve();
                            }
                        }
                    }
                }
            };

            $scope.modalConfirmShow =  function(){
                $scope.modalVisible = false;
                $scope.modalConfirmVisible = true;
            };
            $scope.modalConfirmHide =  function(){
                $scope.modalConfirmVisible = false;
                $scope.modalHide(true);

            };

            $scope.modalInfoboxHide = function(){
              //  $scope.modalShowStateClass = 'modalFadeOut';
                //$scope.modalBgShowStateClass = 'modalBgFadeOut';
                JkioskService.logEvent($rootScope.currentKeyboardState + '_closeButton', 'button', 'pressed');
                JkioskService.logStartScreen(HigiKioskStorageService.returnSessionData('higiPageName') + "_modalClose");
                $scope.modalInfoboxVisible = false;
            };

            $scope.modalInfoboxHideMask = function(){
                JkioskService.logEvent($rootScope.currentKeyboardState + '_closeButton', 'screen', 'pressed');
                JkioskService.logStartScreen(HigiKioskStorageService.returnSessionData('higiPageName') + "_modalClose");
                //$scope.modalShowStateClass = 'modalFadeOut';
                //$scope.modalBgShowStateClass = 'modalBgFadeOut';
                $scope.modalInfoboxVisible = false;
            };
            $scope.modalInfoboxShow = function() {
                //$scope.modalShowStateClass = 'modalFadeIn';
                //$scope.modalBgShowStateClass = 'modalBgFadeIn';

                $scope.modalInfoboxVisible = true;
            };

            $scope.modalScroller =  $scope.modalScroller || [] ;
            $scope.setIscrollObject = function(id){
                //Make sure content updated before intializing scroller.
                $scope.currentScrollerId = id;
                //Using timeout to ensure content for iscroll has written into div before calling scroller init.
                if($scope.modalScroller[id] == null){
                    $timeout(function(){
                        console.log('loading modal scroller bc currently null - applying modal scrolling ' + id);
                        $scope.$apply();
                        $scope.modalScroller[id] = new iScroll(id, {hScroll:false, scrollbarClass:'iscroll_scrollbar', vScroll : true});
                        console.log($scope.modalScroller[id]);
                        $scope.modalScroller[id].scrollTo(0, 0, 1000, false);
                        $timeout(function(){ $scope.modalScroller[id].refresh();},100);
                    },100);
                } else {
                    console.log("modal exists, refresh iscroll");
                    $timeout(function(){ $scope.modalScroller[id].refresh();},0);
                }

            };

            $scope.setFTscrollObject = function(id){
                 $timeout(function(){
                let scroller = new FTScroller(document.getElementById(id), {scrollingX: false});
                },100);
            }

            $scope.modaliScrollScrollUp = function(){
                console.log("inside the $scope.modaliScrollScrollUp() ");
                scroller = $scope.modalScroller[$scope.currentScrollerId] || $("#login_tos_privacy_confirm_wrapper");
                console.log(scroller);
                pageHeight = 600;
                dest = ((scroller.y + (pageHeight *.75) <= 0) <= 0) ? (scroller.y + (pageHeight *.75)) : 0;
                console.log("dest = "+ dest);
                scroller.scrollTo(0, dest, 400);
            };

            $scope.modaliScrollScrollDown = function(){
                console.log("inside the $scope.modaliScrollScrollDown() ");
                scroller = $scope.modalScroller[$scope.currentScrollerId] || $("#login_tos_privacy_confirm_wrapper");
                console.log(scroller);
                pageHeight = 600;
                dest = ((scroller.scrollerH - (pageHeight  *.75) ) > (scroller.y + pageHeight)) ? (scroller.x - (pageHeight *.75)) : (scroller.scrollerH - pageHeight);
                console.log("dest = "+ dest);
                scroller.scrollTo(0, -1*dest, 400);
            };

            //Attach to rootscope so can be launched externally
            $scope.loadModal = function(mode){
                console.log(mode);
                JkioskService.logStartScreen(HigiKioskStorageService.returnSessionData('higiPageName') + "_modalOpen_" + mode.id);
                
                $(".keyboard_class_close_btn").show();
                if(mode.id == "login") {
                    $scope.setModalVisible($scope.modalLoginVisible);
                    $scope.modalShow();
                    console.log($rootScope.fields.login);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $rootScope.targetFieldSet = $rootScope.fields.login;
                    //initial screen to ensure keyboard focus and method bindings fire
                    //Pass in defaulting flag to indicate there should be no animation
                    $rootScope.loginModalInitScreen(true);
                    $rootScope.keyboardShow();

                } else if(mode.id == "loginMeb") {
                    $scope.setModalVisible($scope.modalMebLoginVisible);
                    $scope.modalShow();
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $rootScope.targetFieldSet = $rootScope.fields.login;
                    //initial screen to ensure keyboard focus and method bindings fire
                    //Pass in defaulting flag to indicate there should be no animation
                    $rootScope.loginModalInitScreen(true);
                    $rootScope.keyboardShow();

                } else if(mode.id == "register"){
                    $scope.setModalVisible($scope.modalRegisterVisible);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $scope.modalShow();
                    $rootScope.targetFieldSet = $rootScope.fields.register;
                    //initial screen to ensure keyboard focus and method bindings fire
                    //Pass in defaulting flag to indicate there should be no animation
                    $rootScope.registerModalInitScreen(true);
                    $rootScope.keyboardShow();

                } else if(mode.id == "abhaVerify"){
                    console.log("load Abha");

                    $scope.setModalVisible($scope.abhaVerifyRegVisible);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $scope.modalShow();
                    // $rootScope.registerModalInitScreen(true);
                    //$rootScope.keyboardShow();
                } else if(mode.id == "abhaCareContext"){
                    console.log("load Abha Care Context");

                    $scope.setModalVisible($scope.abhaCareContextVisible);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $scope.modalShow();
                    // $rootScope.registerModalInitScreen(true);
                    //$rootScope.keyboardShow();
                } else if(mode.id == "memberShip"){
                    console.log("load membership");

                    $scope.setModalVisible($scope.ihlMembershipVisible);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $scope.modalShow();
                }
                else if(mode.id == "emailresults"){
                    $scope.setModalVisible($scope.modalEmailResultsVisible);
                    $(".keyboard_class_close_btn").show();   
                    $scope.modalShow();
                    console.log($rootScope.fields.emailResults);
                    $rootScope.targetFieldSet = $rootScope.fields.emailResults;
                    $rootScope.keyboardShow();
                    $rootScope.setFieldIndexEnd();

                }
                else if(mode.id == "mobilenumbermodal"){
                    $scope.setModalVisible($scope.modalMobileNumberVisible);
                    $rootScope.mobileNumberValidate = true;
                    $scope.modalShow();
                    $rootScope.keyboardShow();   
                }
                else if(mode.id == "waistCircumstancemodal"){
                    $scope.setModalVisible($scope.modalWaistCircumstanceVisible);
                    //$rootScope.mobileNumberValidate = true;
                    $rootScope.targetFieldSet = $rootScope.fields.bcWaistCircumstance;
                    $rootScope.bcWaistCircumstanceInit(true);
                    $scope.modalShow();
                    $rootScope.keyboardShow();   
                }
                else if(mode.id == "offlineqrcode"){
                    $scope.setModalVisible($scope.modalOfflineSaveVisible);
                    $scope.modalShow();

                }
                else if(mode.id == "confirmppolterms"){
                    console.log('loading terms+ppol - modal');
                    $scope.setModalVisible($scope.modalConfirmPpolTerms);

                    $scope.modalConfirmShow();

                    $rootScope.keyboardHide();

                }
                else if(mode.id == "confirmppol"){
                    console.log('loading ppol - modal');
                    $scope.setModalVisible($scope.modalConfirmPpol);
                    $scope.modalConfirmShow();
                    $rootScope.keyboardHide();

                }
                else if(mode.id == "confirmterms"){
                    console.log('loading terms - modal');
                    $scope.setModalVisible($scope.modalConfirmTerms);
                    $scope.modalConfirmShow();
                    $rootScope.keyboardHide();

                }
                else if(mode.id == "accountcreatedchallenge"){
                    console.log('loading terms - modal');
                    $scope.setModalVisible($scope.modalAccountCreatedChallengeVisible);
                    $scope.modalShow();
                    $rootScope.keyboardHide();

                } 
                else if(mode.id == "lastcheckin"){
                    $rootScope.lastCheckinModalShow = true;
                    $scope.setModalVisible($scope.modalLastCheckinVisible);
                    $(".keyboard_class_close_btn").show();  
                    $scope.modalShow();
                    $rootScope.keyboardHide();
                    $rootScope.showLoggedInNav();
                    if(typeof($rootScope.setLastCheckinDisplay) == "function"){
                        $rootScope.setLastCheckinDisplay();
                    }

                    if($scope.modalScroller['keyboard_lastcheckin_content'] == undefined){
                        //$scope.setIscrollObject('keyboard_lastcheckin_content');
                        if(typeof($scope.lastcheckinScrollToTop) != "function"){
                            $scope.lastcheckinScrollToTop = function(){
                                JkioskService.logEvent($rootScope.currentKeyboardState + '_backtotop_btn', 'button', 'pressed');
                                $scope.modalScroller['keyboard_lastcheckin_content'].scrollTo(0, 0, 1000, false);
                            };

                        }
                     }
                     //$scope.setIscrollObject('keyboard_lastcheckin_content');
                     $scope.setFTscrollObject('keyboard_lastcheckin_content');
                    
                    if($scope.playedWelcomeBack != true && $route.current.$$route.originalPath.search("welcome") != -1 ){
                        HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels['keyboard_lastcheckin_audio01'], $scope);
                        $scope.playedWelcomeBack = true;
                    } else {
                        $scope.playedWelcomeBack = true;
                    }
                }
                else if(mode.id == "regprompt"){

                    $scope.setModalVisible($scope.modalRegistrationPromptVisible);
                    $scope.modalShow();
                    //Start modal timer
                    $rootScope.keyboardHide();
                }
                else if(mode.id == "resetpassword"){
                    $scope.setModalVisible($scope.modalResetPasswordVisible);
                    $scope.modalShow();
                    $rootScope.targetFieldSet = $rootScope.fields.passwordReset;
                }


                else if(mode.id == "infoboxweightbodymasscomp"){
                    $scope.setModalVisible($scope.modalinfoboxWeightBodyMassCompVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.isMale = HigiKioskStorageService.returnSessionData('gender') === "m" ? true : false;
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_bmc'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_bmc');
                    } else {
                        $scope.currentScrollerId = 'info_box_scroll_bmc';

                    }*/
                    $scope.setFTscrollObject('info_box_scroll_bmc');
                }
                else if(mode.id == "infoboxbp"){
                    $scope.setModalVisible($scope.modalinfoboxBpVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_bp'] == undefined){
                        //$scope.setIscrollObject('info_box_scroll_bp');
                        $scope.setFTscrollObject('info_box_scroll_bp');
                    } else {
                        $scope.currentScrollerId = 'info_box_scroll_bp';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_bp');
                }
                else if(mode.id == "infoboxbphypertensive"){
                    $scope.setModalVisible($scope.modalinfoboxBpHypertensiveVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_hypertensive'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_hypertensive');
                    }else {
                        $scope.currentScrollerId = 'info_box_scroll_hypertensive';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_hypertensive');
                }
                else if(mode.id == "infoboxbpmultipletests"){
                    $scope.setModalVisible($scope.modalinfoboxBpMultipleTestsVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_bp_multitest'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_bp_multitest');
                    }else {
                        $scope.currentScrollerId = 'info_box_scroll_bp_multitest';
                        $timeout(function(){ $scope.modalScroller['info_box_scroll_bp_multitest'].refresh();},100);

                    }*/
                    $scope.setFTscrollObject('info_box_scroll_bp_multitest');
                }else if(mode.id == 'infoboxpoints'){
                    $scope.setModalVisible($scope.modalinfoboxPointsVisible);
                    $scope.modalInfoboxShow();
                    /*if($scope.modalScroller['info_box_scroll_points'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_points');
                    }else {
                        $scope.currentScrollerId = 'info_box_scroll_points';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_points');
                }else if(mode.id == 'infoboxhigiscore'){

                    $scope.setModalVisible($scope.modalinfoboxHigiScoreVisible);
                    $scope.modalInfoboxShow();
                    /*if($scope.modalScroller['info_box_scroll_higi_score'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_higi_score');
                    }else {
                        $scope.currentScrollerId = 'info_box_scroll_higi_score';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_higi_score');
                } else if(mode.id == 'ecgdisplay') {

                    
                    //perfect working code but model box close button hide issue occure.
                    $scope.modalList[$scope.modalEcgRegretVisible] = false;
                    $rootScope.currentKeyboardState =  $scope.modalExitConfirmVisible;
                    $rootScope.toggleEcgModalVisible();
                     $scope.modalShow();
                    document.getElementById("exit_confirmss25").style.display = "block";
                    document.getElementById("ecg_regret_exit_confirm").style.display = "none";
                    $rootScope.keyboardHide();
                    document.getElementById("higi_keyboard_close_btn").style.display="none";               
                }

                else if(mode.id == "infoboxweight"){
                    $scope.setModalVisible($scope.modalinfoboxWeightVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_weight'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_weight');
                    } else {
                        console.log("modal exists, going to refresh")
                        $timeout(function(){$scope.modalScroller['info_box_scroll_weight'].refresh()}, 0)
                        $scope.currentScrollerId = 'info_box_scroll_weight';

                    }*/
                    $scope.setFTscrollObject('info_box_scroll_weight');
                }

                else if(mode.id == "infoboxSpo2"){
                    $scope.setModalVisible($scope.modalinfoboxSpo2Visible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_spo2'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_spo2');
                    } else {
                        $scope.currentScrollerId = 'info_box_scroll_spo2';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_spo2');
                }

                else if(mode.id == "infoboxThermometer"){
                    $scope.setModalVisible($scope.modalinfoboxThermometerVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();
                    /*if($scope.modalScroller['info_box_scroll_spo2'] == undefined){
                        $scope.setIscrollObject('info_box_scroll_spo2');
                    } else {
                        $scope.currentScrollerId = 'info_box_scroll_spo2';
                    }*/
                    $scope.setFTscrollObject('info_box_scroll_thermometer');
                }
                
                else if(mode.id == "printerInfo"){
                    $scope.setModalVisible($scope.modalinfoboxPrinterVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide();                    
                }
                else if(mode.id == "telemedicinestartmodalbox"){
                    $scope.setModalVisible($scope.modaltelemedicinestartVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                }
                else if(mode.id == "Specialty_question"){
                    $scope.setModalVisible($scope.modaltelemedQuestionaireVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                }else if(mode.id == "genix_Specialty_question"){
                    $scope.setModalVisible($scope.modalGenixtelemedQuestionaireVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                }else if(mode.id == "telemedicinemodalbox"){
                    $scope.setModalVisible($scope.modalinfoboxtelemedicineVisible);
                    $scope.modalInfoboxShow();
                    $rootScope.keyboardHide(); 
                   // $("#higi_keyboard_close_btn" ).css("display", "none");
                                      
                }else if(mode.id == "payment_mobile_credential"){

                    $(".keyboard_class_close_btn").hide();  
                    $scope.setModalVisible($scope.modalpaymentstartVisible);
                    $scope.modalShow(); 
                    //$rootScope.keyboardHide();
                    $rootScope.targetFieldSet = $rootScope.fields.paymentModal;
                    $rootScope.keyboardShow();
                    $rootScope.setFieldIndexEnd();
                }

                else if(mode.id == "regretDialogClose"){
                    
                    $rootScope.toggleEcgModalVisible();
                    $scope.modalHide();
                }
                else if(mode.id == 'ecgRegretDisplay'){
                    
                     $scope.modalList[$scope.modalEcgVisible] = false;
                  
                    $rootScope.toggleEcgRegretModalVisible();
                    
                    $scope.modalShow();
                    document.getElementById("ecg_regret_exit_confirm").style.display = "block";

                    document.getElementById("exit_confirmss25").style.display = "none";

                     $rootScope.keyboardHide();
                   
                   
                    
                  document.getElementById("higi_keyboard_close_btn").style.display="none";
                
                }else if(mode.id == 'exitconfirm'){
                    //If logged in, show logged in message
                    $rootScope.currentKeyboardState =  $scope.modalExitConfirmVisible;
                    $rootScope.toggleExitModalVisible();

                }
                else if(mode.id == 'thirdParty') {
                    //If logged in, show logged in message
                    $('#thirdPartyDiv').show();
                    $rootScope.thirdPartyAjaxcall();
                    //$rootScope.currentKeyboardState =  $scope.modalExitConfirmVisible;
                    //$rootScope.toggleExitModalVisible();

                }else if(mode.id == 'guestUserFlow') {
                   console.log('guestuser flow- modal');
                    $scope.setModalVisible($scope.modalguestUserVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                }else if(mode.id == 'reasonForVisit') {
                    $(".keyboard_class_close_btn").hide();
                    $scope.setModalVisible($scope.modalreasonForVisitVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardShow();
                    $rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                    $rootScope.reasonForVisitInitScreen(true);
                }
                else if(mode.id == 'teleConsultationSummaryBuyMedicine'){
                    $scope.setModalVisible($scope.modalteleConsultationSummaryBuyMedicineVisible);
                    $scope.modalShow();
                }
                else if(mode.id == 'teleConsultationSummaryLabOrder'){
                    $scope.setModalVisible($scope.modalteleConsultationSummaryLabOrderVisible);
                    $scope.modalShow();
                }
                else if(mode.id == 'teleConsultationSummaryRatings'){
                    $scope.setModalVisible($scope.modalteleConsultationSummaryRatingsVisible);
                    $scope.modalShow();
                    $rootScope.keyboardShow();
                    $rootScope.targetFieldSet = $rootScope.fields.ratings;
                    $rootScope.ratingsInitScreen(true);
                }else if(mode.id == 'serviceProvider'){
                    $scope.setModalVisible($scope.modalServiceProviderVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                }else if(mode.id == 'apolloConfirmExit'){
                    $scope.setModalVisible($scope.modalApolloConfirmExitVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                } else if(mode.id == 'ssoUserFlow') {
                    $scope.setModalVisible($scope.modalssoUserVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                } else if(mode.id == 'ivtDashboard') {
                    $scope.setModalVisible($scope.modalIVTdashVisible);
                    $scope.modalShow(); 
                    $rootScope.keyboardHide();
                    $(".keyboard_class_close_btn").hide();
                } else if(mode.id == 'heamoDataEntry'){
                    $scope.setModalVisible($scope.modalHeamoDataEntryVisible);
                    $scope.modalShow();                   
                    $rootScope.keyboardShow();                    
                    //$rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                
                } else if(mode.id == 'glcDataEntry'){
                    $scope.setModalVisible($scope.modalGlcDataEntryVisible);
                    $scope.modalShow();                   
                    $rootScope.keyboardShow();                    
                    //$rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                } else if(mode.id == 'lipDataEntry'){
                    $scope.setModalVisible($scope.modalLipDataEntryVisible);
                    $scope.modalShow();                   
                    $rootScope.keyboardShow();                    
                    //$rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                } else if(mode.id == 'urnDataEntry'){
                    $scope.setModalVisible($scope.modalUrnDataEntryVisible);
                    $scope.modalShow();       
                    $rootScope.keyboardHide();          
                    //$rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                } else if(mode.id == 'ivtTwoParaDataEntry'){
                    $scope.setModalVisible($scope.modalivtTwoParaEntryVisible);
                    $scope.modalShow();                           
                    //$rootScope.targetFieldSet = $rootScope.fields.reasonForVisit;
                } else if(mode.id == 'eSanjeevaniFlow') {
                    $scope.setModalVisible($scope.modalESanjeevaniVisible);
                    $scope.modalShow();
                    console.log($rootScope.fields.login);
                    JkioskService.getChallengeAd(HigiKioskUserService);
                    $rootScope.targetFieldSet = $rootScope.fields.login;
                    $rootScope.keyboardShow();
                } else if(mode.id == "esanjeevaniReqTestList"){
                    $scope.setModalVisible($scope.modalEsanjeevaniReqTestListVisible);
                    $scope.modalShow();                                     
                } else if(mode.id == "flipKartQRCodeScanner") {
                    $scope.setModalVisible($scope.modalFlipKartQRCodeScannerVisible);
                    $scope.modalShow();                                     
                } else if(mode.id == "mehtaUserFlow") {
                    $scope.setModalVisible($scope.modalMehtaUserVisible);
                    $scope.modalShow();
                } else if(mode.id == "shutDownHPodModal") {
                    $scope.setModalVisible($scope.modalShutDownHPodVisible);
                    $scope.modalShow();                                     
                }
                //else if(mode.id == 'sessionexitconfirm'){
                //    //If logged in, show logged in message
                //    $scope.setModalVisible($scope.modalSessionExitConfirmVisible);
                //    $scope.modalShow();
                //}
            };



            $scope.authDisplay = function(mode) {
                mode.timer = (mode.timer != undefined) ? mode.timer : 3000;
                //$scope.modalHide();
                $scope.modalActive = '';
                $scope.modalVisible = false;
                $scope.setModalVisible('modalAuthDialogVisible');
                $rootScope.keyboardHide();

                if(HigiKioskStorageService.returnSessionData('logged_in')){
                    $rootScope.showLoggedInNav();
                }

                if(typeof(mode.callback) === "function"){
                    $scope.authDisplayCallback = mode.callback;
                } else
                {
                    $scope.authDisplayCallback = null;
                }


                $scope.authDisplayHideTimer = $timeout($scope.authDisplayHide, mode.timer);
                $scope.modalAuthDialogTitle = mode.modalAuthDialogTitle;
                $scope.modalAuthDialogTitleClass = mode.modalAuthDialogTitleClass;
                $scope.modalAuthDialogContent = mode.modalAuthDialogContent;
                $scope.modalAuthDialogIconClass = mode.modalAuthDialogIconClass;


            };

            $scope.authDisplayHideClicked = function(){
                $timeout.cancel($scope.authDisplayHideTimer);
                $scope.authDisplayHide();
            };

            $scope.authDisplayHide = function(){
                $scope.modalHide();
                if(typeof($scope.authDisplayCallback) === "function"){
                    $scope.authDisplayCallback();
                }
                console.log('modal hide fired');
            };



            $scope.toggleExitModalVisible = function(){
                $scope.modalList[$scope.modalExitConfirmVisible] =  !$scope.modalList[$scope.modalExitConfirmVisible];
            };

            $rootScope.toggleEcgModalVisible = function(){
                $scope.modalList[$scope.modalEcgVisible] =  !$scope.modalList[$scope.modalEcgVisible];
                

                $scope.modalHide(true);
            };
            $rootScope.toggleEcgRegretModalVisible = function(){
                 $scope.modalList[$scope.modalEcgRegretVisible] =  !$scope.modalList[$scope.modalEcgRegretVisible];
                 


                $scope.modalHide(true);
            }; 
            
            $scope.setModalVisible = function(currentModal){
                $scope.resetModalVisible();
                $scope.modalList[currentModal] = true;

                //To track closing
                $rootScope.currentKeyboardState = currentModal;
            };

            $scope.resetModalVisible = function(){
                $scope.modalList[$scope.modalLoginVisible] = false;
                $scope.modalList[$scope.modalMebLoginVisible] = false;
                $scope.modalList[$scope.modalRegisterVisible] = false;
                $scope.modalList[$scope.abhaVerifyRegVisible] = false;
                $scope.modalList[$scope.abhaCareContextVisible] = false;
                $scope.modalList[$scope.ihlMembershipVisible] = false;
                $scope.modalList[$scope.modalLastCheckinVisible] = false;
                $scope.modalList[$scope.modalAuthDialogVisible] = false;
                $scope.modalList[$scope.modalRegistrationPromptVisible] = false;
                $scope.modalList[$scope.modalResetPasswordVisible] = false;
                $scope.modalList[$scope.modalinfoboxWeightVisible] = false;
                $scope.modalList[$scope.modalinfoboxSpo2Visible] = false;
                $scope.modalList[$scope.modalinfoboxThermometerVisible] = false;
                $scope.modalList[$scope.modalinfoboxPrinterVisible] = false;       
                $scope.modalList[$scope.modalinfoboxWeightBodyMassCompVisible] = false;
                $scope.modalList[$scope.modalinfoboxBpVisible] = false;
                $scope.modalList[$scope.modalinfoboxBpHypertensiveVisible] = false;
                $scope.modalList[$scope.modalinfoboxBpMultipleTestsVisible] = false;
                $scope.modalList[$scope.modalinfoboxPointsVisible] = false;
                $scope.modalList[$scope.modalinfoboxHigiScoreVisible] = false;
                $scope.modalList[$scope.modalExitConfirmVisible] = false;
                $scope.modalList[$scope.modalEcgVisible] = false;
                $scope.modalList[$scope.modalEcgRegretVisible] = false;
                $scope.modalList[$scope.modalEmailResultsVisible] = false;
                $scope.modalList[$scope.modalMobileNumberVisible] = false;
                $scope.modalList[$scope.modalConfirmPpolTerms] = false;
                $scope.modalList[$scope.modalConfirmPpol] = false;
                $scope.modalList[$scope.modalConfirmTerms] = false;
                $scope.modalList[$scope.modalAccountCreatedChallengeVisible] = false;
                $scope.modalList[$scope.modalOfflineSaveVisible] = false;
                $scope.modalList[$scope.modalinfoboxtelemedicineVisible] = false;
                $scope.modalList[$scope.modaltelemedicinestartVisible] = false;
                $scope.modalList[$scope.modaltelemedQuestionaireVisible] = false;
                $scope.modalList[$scope.modalGenixtelemedQuestionaireVisible] = false;
                $scope.modalList[$scope.modalpaymentstartVisible] = false;
                $scope.modalList[$scope.modalguestUserVisible] = false;
                $scope.modalList[$scope.modalreasonForVisitVisible] = false;
                $scope.modalList[$scope.modalteleConsultationSummaryBuyMedicineVisible] = false;
                $scope.modalList[$scope.modalteleConsultationSummaryLabOrderVisible] = false;
                $scope.modalList[$scope.modalteleConsultationSummaryRatingsVisible] = false;
                $scope.modalList[$scope.modalServiceProviderVisible] = false;
                $scope.modalList[$scope.modalApolloConfirmExitVisible] = false;
                $scope.modalList[$scope.modalssoUserVisible] = false;
                $scope.modalList[$scope.modalIVTdashVisible] = false;
                $scope.modalList[$scope.modalHeamoDataEntryVisible] = false;
                $scope.modalList[$scope.modalGlcDataEntryVisible] = false;
                $scope.modalList[$scope.modalLipDataEntryVisible] = false;
                $scope.modalList[$scope.modalUrnDataEntryVisible] = false;
                $scope.modalList[$scope.modalivtTwoParaDataEntryVisible] = false;
                $scope.modalList[$scope.modalESanjeevaniVisible] = false;
                $scope.modalList[$scope.modalEsanjeevaniReqTestListVisible] = false;
                $scope.modalList[$scope.modalFlipKartQRCodeScannerVisible] = false;
                $scope.modalList[$scope.modalMehtaUserVisible] = false;
                $scope.modalList[$scope.modalShutDownHPodVisible] = false;
            };

            $scope.init = function(){
                $scope.modalList = [];
                $scope.modalLoginVisible = 'modalLoginVisible';
                $scope.modalMebLoginVisible = 'modalMebLoginVisible';
                $scope.modalRegisterVisible = 'modalRegisterVisible';
                $scope.abhaVerifyRegVisible = 'abhaVerifyRegVisible';
                $scope.abhaCareContextVisible = 'abhaCareContextVisible';
                $scope.ihlMembershipVisible = 'ihlMembershipVisible';
                $scope.modalLastCheckinVisible = 'modalLastCheckinVisible';
                $scope.modalAuthDialogVisible = 'modalAuthDialogVisible';
                $scope.modalRegistrationPromptVisible = 'modalRegistrationPromptVisible';
                $scope.modalResetPasswordVisible = 'modalResetPasswordVisible';
                $scope.modalinfoboxWeightVisible = 'modalinfoboxWeightVisible';
                $scope.modalinfoboxThermometerVisible = 'modalinfoboxThermometerVisible';
                $scope.modalinfoboxPrinterVisible = 'modalinfoboxPrinterVisible';         
                $scope.modalinfoboxWeightBodyMassCompVisible = 'modalinfoboxWeightBodyMassCompVisible';
                $scope.modalinfoboxBpVisible = 'modalinfoboxBpVisible';
                $scope.modalinfoboxBpHypertensiveVisible = 'modalinfoboxBpHypertensiveVisible';
                $scope.modalinfoboxBpMultipleTestsVisible = 'modalinfoboxBpMultipleTestsVisible';
                $scope.modalinfoboxPointsVisible = 'modalinfoboxPointsVisible';
                $scope.modalinfoboxHigiScoreVisible = 'modalinfoboxHigiScoreVisible';
                $scope.modalExitConfirmVisible = 'modalExitConfirmVisible';
                $scope.modalEcgVisible = 'modalEcgVisible';
                $scope.modalEcgRegretVisible = 'modalEcgRegretVisible';
                $scope.modalEmailResultsVisible = 'modalEmailResultsVisible';
                $scope.modalMobileNumberVisible = 'modalMobileNumberVisible';
                $scope.modalConfirmPpolTerms = 'modalConfirmPpolTerms';
                $scope.modalConfirmPpol = 'modalConfirmPpol';
                $scope.modalConfirmTerms = 'modalConfirmTerms';
                $scope.modalAccountCreatedChallengeVisible = 'modalAccountCreatedChallengeVisible';
                $scope.modalOfflineSaveVisible = 'modalOfflineSaveVisible';
                $scope.modalinfoboxtelemedicineVisible = 'modalinfoboxtelemedicineVisible';
                $scope.modaltelemedicinestartVisible = 'modaltelemedicinestartVisible';
                $scope.modaltelemedQuestionaireVisible = 'modaltelemedQuestionaireVisible';
                $scope.modalGenixtelemedQuestionaireVisible = 'modalGenixtelemedQuestionaireVisible';
                $scope.modalpaymentstartVisible = 'modalpaymentstartVisible';
                $scope.modalguestUserVisible = 'modalguestUserVisible';
                $scope.modalreasonForVisitVisible = 'modalreasonForVisitVisible';
                $scope.modalteleConsultationSummaryBuyMedicineVisible = 'modalteleConsultationSummaryBuyMedicineVisible';
                $scope.modalteleConsultationSummaryLabOrderVisible = 'modalteleConsultationSummaryLabOrderVisible';
                $scope.modalteleConsultationSummaryRatingsVisible = 'modalteleConsultationSummaryRatingsVisible';
                $scope.modalServiceProviderVisible = 'modalServiceProviderVisible';
                $scope.modalApolloConfirmExitVisible = 'modalApolloConfirmExitVisible';
                $scope.modalssoUserVisible = 'modalssoUserVisible';
                $scope.modalIVTdashVisible = 'modalIVTdashVisible';  
                $scope.modalHeamoDataEntryVisible = 'modalHeamoDataEntryVisible'; 
                $scope.modalGlcDataEntryVisible = 'modalGlcDataEntryVisible';  
                $scope.modalLipDataEntryVisible = 'modalLipDataEntryVisible';  
                $scope.modalUrnDataEntryVisible = 'modalUrnDataEntryVisible';
                $scope.modalivtTwoParaDataEntryVisible = 'modalivtTwoParaDataEntryVisible';
                $scope.modalESanjeevaniVisible = 'modalESanjeevaniVisible';      
                $scope.modalEsanjeevaniReqTestListVisible = 'modalEsanjeevaniReqTestListVisible';
                $scope.modalFlipKartQRCodeScannerVisible = 'modalFlipKartQRCodeScannerVisible';
                $scope.modalMehtaUserVisible = 'modalMehtaUserVisible';
                $scope.modalShutDownHPodVisible = 'modalShutDownHPodVisible';      
                $scope.resetModalVisible();

                $scope.modalActive = '';
                $scope.modalVisible = false;
                $scope.modalInfoboxVisible = false;

                $rootScope.toggleExitModalVisible = $scope.toggleExitModalVisible;
                $rootScope.authDisplay = $scope.authDisplay;
                $rootScope.loadModal = $scope.loadModal;
                $rootScope.refreshIScroll = $scope.setIscrollObject;
                $rootScope.clearModal = $scope.modalHide;
                $rootScope.iScrollObjects = $scope.modalScroller;

                //console.log($scope)
                $scope.$parent.$parent.registerMethod({name : 'modalObject.toggleExitModalVisible', fn : $scope.toggleExitModalVisible});
                $scope.$parent.$parent.registerMethod({name : 'modalObject.authDisplay', fn : $scope.authDisplay});
                $scope.$parent.$parent.registerMethod({name : 'modalObject.loadModal', fn : $scope.loadModal});
                $scope.$parent.$parent.registerMethod({name : 'modalObject.setIscrollObject', fn : $scope.setIscrollObject});
                $scope.$parent.$parent.registerMethod({name : 'modalObject.modalHide', fn : $scope.modalHide});


            };

            $scope.checkPaymentOption = function(){
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
                    // While Vital payment is "TRUE"
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.initiateHealthVitalTests;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);

                    if($rootScope.isEmailLoginUserFreeServiceEnable){
                            $rootScope.abhaCloseCheckPaymentFlow();
                            return 0;
                    }

                    if ($rootScope.checkPreviousPaymentSession() == true) {
                        $rootScope.lastCheckinModalShow = false;
                        $rootScope.lastCheckinModalFirstFlow = false;
                        $rootScope.clearModal();
                        //To hide the reason for visit close button.
                        $(".keyboard_class_close_btn").hide();
                        $timeout(() => {
                            $rootScope.loadModal({id: 'serviceProvider'});
                        },300);
                    }
                    else if($rootScope.abhaflowEnable && $rootScope.ABHApopupCalled == false && $rootScope.abhaAccountLinked != true && !$rootScope.mehtaFlow){
                        if(HigiKioskStorageService.returnSessionData('height') == undefined){
                            $rootScope.lastCheckinModalShow = true;
                            $rootScope.lastCheckinModalFirstFlow = undefined;
                        }
                        $rootScope.ABHApopupCalled = true;
                        $rootScope.abhaVerifyModelInit();
                        $rootScope.loadModal({ id: 'abhaVerify' });
                    } 
                    else if ($rootScope.mehtaFlow && HigiKioskStorageService.returnSessionData('logged_in') && $rootScope.mehtaFlowInitiated == false && HigiKioskStorageService.returnSessionData('height') != undefined && $rootScope.IHLTeleConsultSelected == false){
                        if(HigiKioskStorageService.returnSessionData('height') == undefined){
                            $rootScope.lastCheckinModalShow = true;
                            $rootScope.lastCheckinModalFirstFlow = undefined;
                        }
                        $rootScope.mehtaFlowInitiated = true;
                        $rootScope.mehtaFlowInit();
                    }
                    else{
                        $rootScope.lastCheckinModalShow = false;
                        $rootScope.lastCheckinModalFirstFlow = false;
                        $rootScope.clearModal();
                        //To hide the reason for visit close button.
                        $(".keyboard_class_close_btn").hide();
                        $timeout(() => {
                            $rootScope.loadModal({id: 'reasonForVisit'});
                        },300);
                    }
                }else{
                    // While Vital payment is "FALSE"
                    $timeout(() => {
                        if($rootScope.abhaflowEnable && $rootScope.ABHApopupCalled == false && $rootScope.abhaAccountLinked != true && !$rootScope.mehtaFlow){
                            $rootScope.ABHApopupCalled = true;
                            $rootScope.abhaVerifyModelInit();
                            $rootScope.loadModal({ id: 'abhaVerify' });
                        } else if ($rootScope.mehtaFlow && HigiKioskStorageService.returnSessionData('logged_in') && $rootScope.mehtaFlowInitiated == false && HigiKioskStorageService.returnSessionData('height') != undefined && $rootScope.IHLTeleConsultSelected == false){
                            $rootScope.mehtaFlowInit();
                        }
                        else {
                            $rootScope.lastCheckinModalShow = false;
                            $rootScope.lastCheckinModalFirstFlow = false;
                            $scope.initiateHealthVitalTests(); 
                        }
                    },1000 * 1);                   
                }
            }

            $scope.initiateHealthVitalTests = function(){
                if ($rootScope.IHLTeleConsultSelected == true) {
                    HigiKioskStorageService.saveSessionData('current_mode', "TC");
                    if( HigiKioskUserService.onboardingDone()){
                        window.location =  "#/ihl-teleconsultation-main-dashboard";
                        let userData = HigiKioskStorageService.returnSessionData('user');
                        if (userData != undefined && userData != null) {
                            if (userData['teleconsult_last_checkin_service'] != undefined && userData['teleconsult_last_checkin_service'] != null) {
                                if (userData['teleconsult_last_checkin_service']['service_provided'] == false && userData['teleconsult_last_checkin_service']['vendor_name'] == 'APOLLO') {
                                    $rootScope.apolloConsultationLastSessionUncomplete = true;
                                    $rootScope.teleModalboxAppearedOneTime = true;
                                    $rootScope.invoiceIdForApolloTeleconsultationService = userData['teleconsult_last_checkin_service']['invoice_number'];
                                    $(".keyboard_class_close_btn").hide();

                                    $timeout(() => {
                                        $rootScope.loadModal({id: 'serviceProvider'});
                                    },300);
                                }
                            }
                        }
                    }else{
                       window.location =  "#/onboarding1/forward/enter"; 
                    }
                }else{
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

            $scope.init();

        }

    };
}]);
