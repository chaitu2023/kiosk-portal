 higiKioskControllers.directive('loginModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService' , '$rootScope','HigiKioskAnimationService', '$route', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/login.html',
        controller :function($scope){

            $scope.loginModal = new Object();
            $scope.loginModal.watch = $scope.$watch('modalVisible', function(newVal, oldVal){
                if(newVal == false){
                    $scope.loginModal.init();
                }
            });
            $scope.loginModal.labelWatch = $rootScope.$watch('interfaceLabels', function(newVal, oldVal){
                    $scope.loginModal.init();
            });
            $scope.loginModal.init = function(){
                //Set localization fields
                $scope.loginModal.loginEmailSectionClass = "";
                $scope.loginModal.loginTitle = "login.to.your.account";
                $scope.loginModal.loginTitleEmail = "login.enter.your.email";
                $scope.loginModal.loginEmailAddress = "login.email.address";
                $scope.loginModal.loginEmailAddressError = "auth.failure.account.not.exist";
                $scope.loginModal.loginCreateAccount = "login.create.a.new.account";
                $scope.loginModal.globalNext = "global.next";
                $scope.loginModal.loginPassword = "login.enter.your.password";
                $scope.loginModal.loginPasswordNote = "login.min.6";
                $scope.loginModal.loginEnterPassword = "login.enter.a.password";
                $scope.loginModal.loginShowPassword = "login.show.password";
                $scope.loginModal.loginForgotPassword = "login.forgot.password";
                $scope.loginModal.loginPasswordErrorMessage = "auth.failure.password.incorrect";
                $scope.loginModal.loginServerError = "global.server.failure";
                $scope.loginModal.globalLogin = "global.login";
                $scope.loginModal.globalBack = "global.back";
                $scope.loginModal.nextBtnActive = '';
                $scope.loginModal.loginBtnActive = '';
                $scope.loginModal.loginUsernameError = false;
                $scope.loginModal.loginMode = {id : 'register'};
                $scope.loginModal.submitting = false;
                $scope.loginModal.loginUsernameError = false;
                $scope.loginModal.loginPasswordError = false;
                $scope.loginModal.loginServerErrorVisible = false;

                $scope.loginModal.fields = [
                    {id : "email" , defaultText : $scope.loginModal.loginEmailAddress , text : "" , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.loginModal.emailPatternCheck(this)}, focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "password" , defaultText : $scope.loginModal.loginEnterPassword , text : "" , textMasked : '' , type :'password' , visible : true , selectedClass : '',  callback : function(){$scope.loginModal.passwordLengthCheck(this)}, focus : function(){$rootScope.focusField(this)}}
                ];

                $rootScope.fields.login = $scope.loginModal.fields;



                //Set visibility of panels
                $scope.loginModal.loginPasswordSectionClass = "";
                $scope.loginModal.loginEmailSectionClass = "";
                $scope.loginModal.loginPasswordSection = false;
                $scope.loginModal.loginEmailSection = true;
                $scope.loginModal.resetPassword = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_forgotPasswordButton', 'input', 'selected');
                    $rootScope.passwordResetEmail = $scope.loginModal.fields[0].text;
                    $rootScope.keyboardHide();
                    $rootScope.loadModal({id : 'resetpassword'});
                }


            };

            $scope.loginModal.showPasswordToggle = function(field){
                field.textMaskedDisabled =  !field.textMaskedDisabled;
                if(field.textMaskedDisabled){
                    field.type = "text";
                } else {
                    field.type = "password";
                }
                if(field.textMaskedDisabled){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                    $scope.loginModal.showPasswordClass = 'active_btn';
                    field.textMasked = field.text;
                } else {
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                    $scope.loginModal.showPasswordClass = '';
                    var textMasked = '';
                    for(var i = 0; i<field.textMasked.length; i++){
                        textMasked += '&#149;';
                    }
                    field.textMasked = textMasked;
                }
            };

            $scope.loginModal.showEmailSectionError = function(){
                //$scope.loginModal.loginUsernameError = true;
                $timeout(function(){
                    $scope.loginModal.loginServerErrorVisible = false;
                    $scope.loginModal.loginUsernameError = false;
                }, 5000)
            };
            $scope.loginModal.showPasswordError = function(){
                //$scope.loginModal.loginPasswordError = true;
                $timeout(function(){
                    $scope.loginModal.loginPasswordError = false;
                    $scope.loginModal.loginServerErrorVisible = false;
                }, 5000)
            };


            $scope.loginModal.emailPatternCheck = function(field){
                if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $rootScope.hideEmailExtensionTop();
                    $scope.loginModal.nextBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.loginModal.emailExistsCheck($scope.loginModal.fields[0])};
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    $rootScope.hideEmailExtensionTop();
                } else{
                    $scope.loginModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }

            };

            $scope.loginModal.passwordLengthCheck = function(field){
                var str = field.text;

                if(str.length >= 1){
                    $scope.loginModal.loginBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                } else{
                    $scope.loginModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            $scope.loginModal.emailExistsCheck = function(field){
                if(field['text'] != undefined || field['text'] != ''){
                    HigiKioskStorageService.saveSessionData('userEmail', field['text']);
                }
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_emailNextButton', 'button', 'pressed');
                $scope.loginModal.submitting = true;
                $rootScope.keyboardEnterButtonFunction = null;
                $rootScope.keyboardEnterButtonClass = '';
                HigiApiService.checkEmailExist(field.text,

                    function () {
                        //Error: No such email
                        $scope.loginModal.submitting = false;
                        $rootScope.keyboardEnterButtonFunction = function(){$scope.loginModal.emailExistsCheck($scope.loginModal.fields[0])};
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        $scope.loginModal.loginUsernameError = true;
                        $scope.loginModal.showEmailSectionError();
                    },
                        //Success: Email Exists, show password form
                    function () {
                         JkioskService.logEvent(HigiKioskStorageService.returnSessionData('loginModal') + '_passwordPage', 'showPasswordSection function call', 'pressed');           
                        $scope.loginModal.showPasswordSection();

                    },
                        //Error: Request responded with a error
                    function () {
                        $scope.loginModal.submitting = false;
                        $rootScope.keyboardEnterButtonFunction = function(){$scope.loginModal.emailExistsCheck($scope.loginModal.fields[0])};
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        $scope.loginModal.loginServerErrorVisible = true;
                        $scope.loginModal.showEmailSectionError();

                    });
            };

            $scope.loginModal.login = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_loginButton', 'button', 'pressed');
                $scope.loginModal.submitting = true;
                $rootScope.keyboardEnterButtonFunction = null;
                $rootScope.keyboardEnterButtonClass = '';
                JkioskService.registerKiosk();
                if($route.current.$$route.originalPath.search("finish") != -1){
                    var callback = $rootScope.saveCheckinFinalResultsLogin;
                } else {
                    var callback = null;
                }

                HigiApiService.qLoginAsync($scope.loginModal.fields[0].text, $scope.loginModal.fields[1].text,
                    function (resp) {
                        //Server Success
                        if (resp == null) {
                            //...but Error: Password Failure
                            $scope.loginModal.submitting = false;
                            $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                            $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);
                            $scope.loginModal.loginEmailAddressError = "auth.failure.account.not.exist";
                            $scope.loginModal.loginPasswordErrorMessage = "auth.failure.password.incorrect";
                            $scope.loginModal.loginPasswordError = true;
                            $rootScope.resetSessionTimeout();
                            $scope.loginModal.showPasswordError();
                        }
                        else {
                            //Success: Password accepted. Load data from server and into session.

                            //Remove watch that resets modal view
                            $scope.loginModal.watch();

                            //Ensure challenge ID was valid and ChallengeUserRelation was recieved
                            if(resp.ChallengeUserRelation !== undefined) {
                                HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                            } else {
                                //HigiKioskStorageService.saveSessionData('hasChallenge', false);
                                //HigiKioskStorageService.saveSessionData('challengeModalAd', null);
                                //JkioskService.logEvent($rootScope.higiPageName + "_login", "error", "error retrieving challenge");
                            }

                            $rootScope.resetSessionTimeout();
                            HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);

                        }
                    },
                    function () {
                        $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);
                        $scope.loginModal.submitting = false;
                        $scope.loginModal.loginServerErrorVisible = true;
                        $rootScope.resetSessionTimeout();
                        $scope.loginModal.showPasswordError();
                    }
                );
                
                /*if(!HigiKioskStorageService.returnSessionData('logged_in')){
                    $rootScope.isVisibleExit = true;
                    $rootScope.isVisibleReg = false;
                    $rootScope.isVisibleAudio = true;
                } else {
                    $rootScope.isVisibleExit = false;
                    $rootScope.isVisibleReg = true;
                    $rootScope.isVisibleAudio = false;
                }*/
            };


            $scope.loginModal.showPasswordSection = function(){     
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('loginModal') + '_passwordPage', 'showPasswordSection', 'pressed');           
                $timeout(function() {
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    $scope.loginModal.submitting = false;
                    $scope.loginModal.loginPasswordSection = true;
                    $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";
                    $scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.loginModal.showPasswordClass = '';
                    $scope.loginModal.fields[1].type = 'password';
                    $scope.loginModal.fields[1].textMaskedDisabled = false;
                    $rootScope.focusField($scope.loginModal.fields[1]);
                    $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);
                    $scope.$apply();
                }, 1000);
            };

            $scope.loginModal.showEmailSection = function(defaulting){
                $scope.loginModal.loginPasswordSectionClass = "modal-slide-out-right";
                $scope.loginModal.loginEmailSectionClass = (defaulting) ? "" : "modal-slide-in-left";
                $scope.loginModal.submitting = false;
                $timeout(function(){
                    $scope.loginModal.loginPasswordSection = false;
                }, 500);
                $scope.loginModal.loginEmailSection = true;
                $rootScope.focusField($scope.loginModal.fields[0]);
                $scope.loginModal.emailPatternCheck($scope.loginModal.fields[0]);
                //Initialize password incase repeating flow (via back button)
                $scope.loginModal.fields[1].text = '';
                document.getElementById($scope.loginModal.fields[1].id).value = $scope.loginModal.fields[1].text;
                $scope.loginModal.fields[1].textMasked = '';
            };
            //Register loginModal's initial screen on $rootScope for toggling back
            //from password reset and registration modals
            $rootScope.loginModalInitScreen = $scope.loginModal.showEmailSection;
            $scope.loginModal.backToEmailSection = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButton', 'button', 'pressed');
                $scope.loginModal.showEmailSection();
            };
            $scope.loginModal.showRegistrationModal = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_iNeedAnAccountButton', 'button', 'pressed');
                $rootScope.fields.register[0].text = $rootScope.targetFieldSet[0].text;
                $rootScope.loadModal($scope.loginModal.loginMode);
                $rootScope.registerModalInitScreen(true);
            };



            $scope.loginModal.init();
        }

    };
}]);

