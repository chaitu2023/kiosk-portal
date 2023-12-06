higiKioskControllers.directive('registerModal',['$http', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskUserService' , '$route', '$sce', 'HigiKioskUtilitiesService', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, $route, $sce, HigiKioskUtilitiesService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/register.html',
        controller :function($scope, $http, $rootScope){
            $scope.registerModal = new Object();
            $scope.registerModal.watch = $scope.$watch('modalVisible', function(newVal, oldVal){
                if(newVal == false){
                    $scope.registerModal.init();
                }
            });

            $scope.registerModal.init = function(){

                $scope.registerModal.loginEmailSectionClass = "";
                $scope.registerModal.loginTitle = "login.create.an.account";
                $scope.registerModal.loginTitleEmail = "login.enter.your.email";
                $scope.registerModal.loginTitleEmailSpam = "login.email.never.spam";
                $scope.registerModal.loginEmailAddress = "login.email.address";
                $scope.registerModal.loginEmailAddressError = "auth.failure.account.exists";
                $scope.registerModal.loginHaveAccount = "login.login.to.account";
                $scope.registerModal.globalNext = "global.next";
                $scope.registerModal.loginPassword = "login.enter.your.password";
                $scope.registerModal.loginPasswordNote = "login.min.6";
                $scope.registerModal.loginEnterPassword = "login.enter.a.password";
                $scope.registerModal.loginShowPassword = "login.show.password";
                $scope.registerModal.loginForgotPassword = "login.forgot.password";
                $scope.registerModal.loginConfirmPassword = "login.password";
                $scope.registerModal.loginMode = {id : 'login'};
                $scope.registerModal.globalSignup = "global.signup";
                $scope.registerModal.globalBack = "global.back";
                $scope.registerModal.registerDisclaimer = "login.by.clicking.sign.up";
                $scope.registerModal.nextBtnActive = '';
                $scope.registerModal.loginBtnActive = '';
                $scope.registerModal.loginUsernameError = false;
                $scope.registerModal.loginServerErrorVisible = false;
                $scope.registerModal.loginServerError = "global.server.failure";
                $scope.registerModal.submitting = false;
                $scope.registerModal.showPasswordClass = '';

                $scope.registerModal.fields = [
                    {id : "emailReg" , defaultText : $scope.registerModal.loginEmailAddress , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.emailPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "passwordReg" , defaultText : $scope.registerModal.loginEnterPassword , text : '', textMasked : '' , textMaskedDisabled : false, type :'password' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.passwordLengthCheck(this)},
                        focus : function(){$rootScope.focusField(this)}}
                ];
                $rootScope.fields.register = $scope.registerModal.fields;
                $scope.registerModal.loginPasswordSectionClass = "";
                $scope.registerModal.loginEmailSectionClass = "";
                $scope.registerModal.loginCreateConfirmSectionClass = "";
                //Set visibility of panels
                $scope.registerModal.loginPasswordSection = false;
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.loginEmailSection = true;


            };
            $scope.registerModal.removeFocus = function(){
                $scope.registerModal.fields.forEach(function(item, index){
                    document.getElementById(item.id).blur();
                    item.selectedClass = "";
                    console.log(item.id)
                    console.log(index)
                });
            };

            $scope.registerModal.emailPatternCheck = function(field){
                if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.registerModal.emailValid = true;
                    $rootScope.hideEmailExtensionTop();
                    $scope.registerModal.nextBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.emailExistsCheck( $scope.registerModal.fields[0]);};
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                } else{
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            $scope.registerModal.showPasswordToggle = function(field){

                field.textMaskedDisabled =  !field.textMaskedDisabled;
                if(field.textMaskedDisabled){
                    field.type = "text";
                } else {
                    field.type = "password";
                }
                if(field.textMaskedDisabled){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                    $scope.registerModal.showPasswordClass = 'active_btn';
                    field.textMasked = field.text;
                } else {
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                    $scope.registerModal.showPasswordClass = '';
                    var textMasked = '';
                    for(var i = 0; i<field.textMasked.length; i++){
                        textMasked += '&#149;';
                    }
                    field.textMasked = textMasked;
                }
            };

            $scope.registerModal.passwordLengthCheck = function(field){
                var str = field.text;

                if(str.length >= 6){
                    $scope.registerModal.passwordValid = true;
                    $scope.registerModal.loginBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.registerModal.showCreateConfirmSection;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordErrorClear();
                    }
                } else{
                    $scope.registerModal.passwordValid = false;
                    $scope.registerModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordError();
                    }
                }
            };

            $scope.registerModal.showEmailSectionError = function(){

                $timeout(function(){
                    $scope.registerModal.loginServerErrorVisible = false;
                    $scope.registerModal.loginUsernameError = false;
                }, 5000);
            };


            $scope.registerModal.showPasswordError = function(){
                $scope.registerModal.loginPasswordError = true;
                $timeout(function(){
                    $scope.registerModal.loginPasswordError = true;
                    $scope.registerModal.loginServerErrorVisible = false;
                }, 5000);
            };

            $scope.registerModal.showPasswordSection = function(){                
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('registerModal') + '_passoedPage', 'showPasswordSection', 'pressed');
                $timeout(function() {
                    $scope.registerModal.loginTitle ="login.create.an.account";
                    $scope.registerModal.loginPasswordSectionClass = "modal-slide-in-left";
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                    $scope.registerModal.createConfirmClass = "";
                    $scope.registerModal.submitting = false;
                    $scope.registerModal.loginPasswordSection = true;
                    $scope.registerModal.loginCreateConfirmSection = false;
                    $scope.registerModal.showPasswordClass = "";
                    $rootScope.keyboardEnterButtonClass = "";
                    $scope.registerModal.fields[1].textMaskedDisabled = false;
                    $scope.registerModal.fields[1].type = "password";
                    $rootScope.focusField($scope.registerModal.fields[1]);
                    $scope.registerModal.passwordLengthCheck($scope.registerModal.fields[1]);
                    $scope.$apply();
                }, 1000);
            };
            $scope.registerModal.showEmailSection = function(defaulting){
                $scope.registerModal.loginTitle ="login.create.an.account";
                $scope.registerModal.loginPasswordSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginEmailSectionClass = (defaulting) ? "" : "modal-slide-in-left";
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                    $scope.registerModal.loginCreateConfirmSection = false;
                }, 500);
                $scope.registerModal.createConfirmClass = "";
                $scope.registerModal.submitting = false;
                $scope.registerModal.loginEmailSection = true;
                $scope.registerModal.emailPatternCheck($scope.registerModal.fields[0]);
                $rootScope.keyboardShow();
                //Initialize password incase repeating flow (via back button)
                $scope.registerModal.fields[1].text = '';
                document.getElementById($scope.registerModal.fields[1].id).value = $scope.registerModal.fields[1].text;
                $scope.registerModal.fields[1].textMasked = '';
                $rootScope.focusField($scope.registerModal.fields[0]);
            };

            //Register registerModal's initial screen on $rootScope for toggling back
            //from login modals
            $rootScope.registerModalInitScreen = $scope.registerModal.showEmailSection;
            $scope.registerModal.backToEmailSection = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButton', 'button', 'pressed');
                $scope.registerModal.showEmailSection();
            };
            $scope.registerModal.toggleTermsAcceptance = function(){
                $scope.registerModal.termsAccepted = !$scope.registerModal.termsAccepted;
                if($scope.registerModal.termsAccepted){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                    $scope.registerModal.registerButtonClass = 'active_btn';
                } else {
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                    $scope.registerModal.registerButtonClass = '';
                }

            };
            $scope.registerModal.bobble = function(){

                if($scope.registerModal.bobbleState == false){
                    $("#cbox-glow").transition({ scale : 1.8, duration : 1000});
                    $scope.registerModal.bobbleState = true;
                }
                else {
                    $scope.registerModal.bobbleState = false;
                    $("#cbox-glow").transition({ scale : 1.3 , duration : 1000 });
                }

                $timeout($scope.registerModal.bobble, 1500);

            };
            $scope.registerModal.showCreateConfirmSection = function(){
                $scope.registerModal.validatedEmail =  $scope.registerModal.fields[0].text;
                $scope.registerModal.removeFocus();
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_passwordNextButton', 'button', 'pressed');
                $scope.registerModal.loginPasswordSectionClass = "modal-slide-out-left";
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                }, 500);
                $scope.registerModal.createConfirmClass = "confirm-terms-create-account";
                $scope.registerModal.loginCreateConfirmSection = true;
                $scope.registerModal.loginTitle ="login.confirm.account.details";
                $scope.registerModal.bobbleState = false;
                $scope.registerModal.termsAccepted = false;
                $scope.registerModal.registerButtonClass = '';
                $timeout($scope.registerModal.bobble, 1500);


               // $rootScope.keyboardHide();
                //Get terms and ppol
                $http.get('docs/'+ $scope.langClass + '/' + appSettings['terms.filename'] + '.html').success(function(data){
                    $scope.registerModal.termsOfServicePpol = data + '<a id="ppol_anchor" name="privacy"></a>';
                    $http.get('docs/'+ $scope.langClass + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                        $scope.registerModal.termsOfServicePpol += data;
                        $scope.registerModal.termsOfServicePpol = $sce.trustAsHtml($scope.registerModal.termsOfServicePpol);
                        $scope.registerModal.termsScroller = $scope.registerModal.termsScroller || new iScroll("login_tos_privacy_wrapper", {hScroll:false, scrollbarClass:'iscroll_scrollbar' });
                        $scope.registerModal.termsScroller.scrollTo(0, 0, 1000, false);
                        $timeout(function(){
                            $scope.registerModal.termsScroller.refresh();
                            //if both, set up scroller
                            //if both, set up scroller
                            //TODO - figure out offset
                            var scrollerScreenOffset = (HigiKioskUtilitiesService.isHigiGreen()) ? 300 : 600;
                            $(".terms_scroll").click(function(e){
                                $rootScope.keyboardHide();
                                e.preventDefault();
                                var anchor = $(this).attr('href');
                                console.log(anchor + " terms anchor clicked");
                                var offset = (anchor == "#ppol_anchor") ? -1 * ($(anchor).offset().top - scrollerScreenOffset) : 0;
                                $scope.registerModal.termsScroller.scrollTo(0, offset, 1500, false);
                            });
                        },0,false);

                    });
                });

            };


            $scope.registerModal.iScrollScrollUp = function(){
                scroller =  $scope.registerModal.termsScroller;
                pageHeight = 600;
                dest = ((scroller.y + (pageHeight *.75) <= 0)) ? (scroller.y + (pageHeight *.75)) : 0;
                scroller.scrollTo(0, dest, 400);
            };
            $scope.registerModal.iScrollScrollDown = function(){
                scroller =  $scope.registerModal.termsScroller;
                pageHeight = 600;
                dest = ((scroller.scrollerH - (pageHeight  *.75) ) > (scroller.y + pageHeight)) ? (scroller.y - (pageHeight *.75)) : (scroller.scrollerH - pageHeight);
                scroller.scrollTo(0,  dest, 400);
            };

            $scope.registerModal.emailExistsCheck = function(field){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_emailNextButton', 'button', 'pressed');
                $scope.registerModal.submitting = true;
                $rootScope.keyboardEnterButtonFunction = null;
                $rootScope.keyboardEnterButtonClass = '';
                HigiApiService.checkEmailExist(field.text,
                    //Doesn't exist, move forward
                    function () {

                        $scope.registerModal.showPasswordSection();

                    },
                    //Exists, show exists error
                    function () {
                         JkioskService.logEvent(HigiKioskStorageService.returnSessionData('registerModal-1') + '_passwordPage', 'showPasswordSection function call', 'pressed');           
                        $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.emailExistsCheck( $scope.registerModal.fields[0]);};
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        $scope.registerModal.loginUsernameError = true;

                        $scope.registerModal.submitting = false;
                        $scope.registerModal.showEmailSectionError();
                        $scope.$apply();


                    },
                    //Server/connect error returned by http request
                    function () {

                        $scope.registerModal.submitting = false;
                        $scope.registerModal.loginServerErrorVisible = true;
                        $scope.registerModal.showPasswordError();
                        $scope.$apply();
                    });
            };
            $scope.registerModal.showLoginModal = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_iHaveAnAccountButton', 'button', 'pressed');
                $rootScope.fields.login[0].text = $rootScope.targetFieldSet[0].text;
                $rootScope.loadModal($scope.registerModal.loginMode);
                //Toggling to login modal, fire login modal's
                //initial screen to ensure keyboard focus and method bindings fire
                $rootScope.loginModalInitScreen(true);
            };
            $scope.registerModal.createConfirmEmailError = function(){
                //loginCreateConfirmSection
                $rootScope.modalEmailUsedVisible = true;
                //$scope.registerModal.confirmEmailExistsError = true;
                //$scope.registerModal.confirmEmailExistsErrorClass = "error";
                $rootScope.keyboardHide();
                //$timeout($scope.registerModal.createConfirmEmailErrorClear, 5000);
            };
            $scope.registerModal.createConfirmEmailErrorClear = function(){
                //loginCreateConfirmSection
                $scope.registerModal.confirmEmailExistsError = false;
                $scope.registerModal.confirmEmailExistsErrorClass = "";
                $rootScope.modalEmailUsedVisible = false;

            };
            $scope.registerModal.createConfirmPasswordError = function(){
                //loginCreateConfirmSection
                $scope.registerModal.confirmPasswordError = true;
                $scope.registerModal.confirmPasswordErrorClass = "error";
            };
            $scope.registerModal.createConfirmPasswordErrorClear = function(){
                //loginCreateConfirmSection
                $scope.registerModal.confirmPasswordError = false;
                $scope.registerModal.confirmPasswordErrorClass = "";
            };
            $scope.registerModal.register = function(){
                $scope.registerModal.submitting = true;
                if( $scope.registerModal.validatedEmail ==  $scope.registerModal.fields[0].text){
                    $scope.registerModal.registerUser();
                } else {
                    HigiApiService.checkEmailExist($scope.registerModal.fields[0].text,
                        //Doesn't exist, move forward
                        function () {

                            $scope.registerModal.registerUser();

                        },
                        //Exists, show exists error
                        function () {
                            $rootScope.keyboardEnterButtonFunction = null;
                            $rootScope.keyboardEnterButtonClass = '';
                            $scope.registerModal.loginUsernameError = true;
                            $scope.registerModal.createConfirmEmailError();
                            $scope.registerModal.submitting = false;
                            //$scope.registerModal.showEmailSectionError();
                            $scope.$apply();


                        },
                        //Server/connect error returned by http request
                        function () {

                            $scope.registerModal.submitting = false;
                            $scope.registerModal.loginServerErrorVisible = true;
                            //$scope.registerModal.showPasswordError();
                            $scope.$apply();
                        });
                }
            };
            $scope.registerModal.registerUser = function(){
                JkioskService.registerKiosk();
                JkioskService.logEvent($rootScope.currentKeyboardState + '_signUpButton', 'button', 'pressed');
                var userObject = HigiApiService.UserInfoInit(HigiKioskStorageService.returnSessionData);

                //If on final resluts page, save checkin data
                if($route.current.$$route.originalPath.search("finish") != -1){
                    var callback = $rootScope.saveCheckinFinalResultsLogin;
                } else {
                    var callback = null;
                }

                HigiApiService.CreateUserAsync($scope.registerModal.fields[0].text, $scope.registerModal.fields[1].text, HigiKioskStorageService.getSettingsValue('terms.filename'), HigiKioskStorageService.getSettingsValue('privacy.policy.filename'), userObject,
                    function (createResp) {
                        //success
                        //new users id, save it. its needed for saving checkins
                        createResp.id;
                        //token, its required for security
                        createResp.token;
                        //authDisplay('success', 'auth.success.account.created');
                        HigiApiService.qLoginAsync($scope.registerModal.fields[0].text, $scope.registerModal.fields[1].text,
                            function (response) {
                                console.log(response);

                                // success
                                                                // success
                                HigiKioskStorageService.saveSessionData('userEmail', response.User.email);
                                HigiKioskStorageService.saveSessionData('ihl_id', response.User.id);
                                qlogin = response;
                                $rootScope.UserInfo = response.User;
                                $scope.registerModal.watch();
                                var initSession = function(){
                                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                    HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                };
                                if (typeof(response) != 'undefined' && typeof(response.Token) == 'string') {
                                    //If challenge exists, hit earndit for joinUrl
                                    if(HigiKioskStorageService.returnSessionData('challengeModalAd') != undefined){
                                        var challengeObject = {challengeId : HigiKioskStorageService.returnSessionData('challengeModalAd').challengeId};
                                        if(HigiKioskStorageService.returnSessionData('challengeModalAd').joinId){
                                            challengeObject.joinId = HigiKioskStorageService.returnSessionData('challengeModalAd').joinId;
                                        }
                                        var success = function(response){
                                            console.log(response)
                                            var challengeObject = {joinUrl : HigiKioskStorageService.getSettingsValue('kiosk.api.earndit.url') + response.response.joinUrl}
                                            HigiKioskStorageService.saveSessionData('challengeObject', challengeObject);
                                            initSession();
                                        };
                                        var error = function(){
                                            JkioskService.logEvent($rootScope.higiPageName + "_register", "error", "error retrieving challenge");
                                            HigiKioskStorageService.saveSessionData('hasChallenge', false);
                                            HigiKioskStorageService.saveSessionData('challengeModalAd', null);
                                            initSession();

                                        };
                                        HigiApiService.GetEarnditChallengeAnonymous(challengeObject, success, error);
                                    } else {
                                        initSession();
                                    }


                                }
                                else {
                                    //authDisplay('failure', 'auth.failure.account.error');
                                    //enableKeyboardDialogButtons();
                                }
                            },
                            function () {
                                $scope.registerModal.loginServerErrorVisible = true;
                                $scope.registerModal.submitting = false;
                                $timeout(function(){
                                    $scope.registerModal.loginServerErrorVisible = false;
                                }, 5000);
                            });
                    },
                    function () {
                        console.log("Error signing up");
                        $scope.registerModal.loginServerErrorVisible = true;
                        $scope.registerModal.submitting = false;
                        $timeout(function(){
                            $scope.registerModal.loginServerErrorVisible = false;
                        }, 5000);
                    }

                );
            };


            $scope.registerModal.init();
        }

    };
}]);