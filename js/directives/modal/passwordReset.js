higiKioskControllers.directive('passwordResetModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/password-reset.html',
        controller :function($scope, $http, $rootScope){
            $scope.passwordResetModal = new Object();
            $scope.passwordResetModal.resetPasswordVisibleWatch = $scope.$watch('modalVisible', function(newVal, oldVal){
                if(newVal == false && $scope.interfaceLabels != undefined){

                     $scope.passwordResetModal.init();
                }
            });

             $scope.passwordResetModal.init = function(){
                //Set localization fields
                 
                 $scope.passwordResetModal.loginTitle = "welcomeModals.reset.password";
                 $scope.passwordResetModal.globalBack = "welcomeModals.back";
                //Set visibility of reset panels

                 $scope.passwordResetModal.resetPassword01Visible = true;
                 $scope.passwordResetModal.resetPassword02Visible = false;
                 $scope.passwordResetModal.resetPassword03Visible = false;
                 $scope.passwordResetModal.resend_otp_forgotpassword = false;
                 $scope.passwordResetModal.otpsend_successfully = false;
                 $scope.passwordResetModal.resetPassword04Visible = false;

                 $scope.passwordResetModal.loginForgotPassword = 'welcomeModals.forgot.your.password';
                 $scope.passwordResetModal.loginResetPassword = 'welcomeModals.reset.password';
                 $scope.passwordResetModal.loginEnterPassword = 'welcomeModals.enter.password';
                 $scope.passwordResetModal.loginResetYourPassword = 'welcomeModals.reset.your.password';
                 $scope.passwordResetModal.loginPasswordFromEmail = 'welcomeModals.password.from.email';
                 $scope.passwordResetModal.loginPasswordNewPassword = 'welcomeModals.enter.password.here';
                 //
                 $scope.passwordResetModal.loginShowPassword = 'welcomeModals.show.password';
                 $scope.passwordResetModal.loginOr = 'welcomeModals.or';
                 $scope.passwordResetModal.loginContinueWithoutLoggingIn = 'welcomeModals.continue.without.logging.in';
                 $scope.passwordResetModal.loginForgotPasswordNeedAccessToEmail = 'welcomeModals.forgot.password.need.access.to.email';
                 $scope.passwordResetModal.loginForgotPasswordStepOneDirection = 'welcomeModals.forgot.password.step.1.direction';
                 $scope.passwordResetModal.loginForgotPasswordStepTwoDirection = 'welcomeModals.forgot.password.step.2.direction';
                 $scope.passwordResetModal.loginForgotPasswordStepThreeDirection = 'welcomeModals.forgot.password.step.3.direction';
                 $scope.passwordResetModal.globalStepOneOfThree = 'welcomeModals.step.1.of.3';
                 $scope.passwordResetModal.globalStepTwoOfThree = 'welcomeModals.step.2.of.3';
                 $scope.passwordResetModal.globalStepThreeOfThree = 'welcomeModals.step.3.of.3';
                 $scope.passwordResetModal.globalEmailAddress = 'welcomeModals.email.address';
                 $scope.passwordResetModal.globalSend = 'welcomeModals.send';
                 $scope.passwordResetModal.loginUsernameError = false;
                 $scope.passwordResetModal.submitting = true;
                 $scope.passwordResetModal.validPasswordErrText = 'welcomeModals.validPasswordErrText';
                 $scope.passwordResetModal.validPasswordErrTextNum = 'welcomeModals.validPasswordErrTextNum';
                 $scope.passwordResetModal.validPasswordErrTextMin = 'welcomeModals.validPasswordErrTextMin';
                 $scope.passwordResetModal.validPasswordErrTextSym = 'welcomeModals.validPasswordErrTextSym';
                 $scope.passwordResetModal.validPasswordErrTextCap = 'welcomeModals.validPasswordErrTextCap';
                 $scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                 $scope.passwordResetModal.loginEmailAddress = "welcomeModals.email.address";
                 $scope.passwordResetModal.email2 = {id : "emailReset" , defaultText : $rootScope.passwordResetEmail , text : $rootScope.passwordResetEmail , type :'text' , visible : true , selectedClass : '', callback : function(){ $scope.passwordResetModal.emailOrMobileOrAadhaarPatternCheck(this)}, focus : function(){$rootScope.focusField(this)}};
                 $scope.passwordResetModal.passwordTemp = {id : "passwordTemp" , defaultText : $scope.passwordResetModal.loginPasswordFromEmail, text : $scope.interfaceLabels[ $scope.passwordResetModal.loginEnterPassword] , textMasked : '' , type :'password' , visible : true , selectedClass : '', callback : function(){$scope.passwordResetModal.passwordLengthCheckTemp(this)}, focus : function(){$rootScope.focusField(this)}};
                 $scope.passwordResetModal.passwordNew = {id : "passwordNew" , defaultText : $scope.passwordResetModal.loginPasswordNewPassword , text : $scope.interfaceLabels[ $scope.passwordResetModal.loginEnterPassword] , textMasked : '' , type :'password' , visible : true , selectedClass : '',  focus : function(){$rootScope.focusField(this)}, callback : function(){ $scope.passwordResetModal.passwordLengthCheckNew(this)}};
                 $scope.passwordResetModal.fields = [  $scope.passwordResetModal.email2,  $scope.passwordResetModal.passwordTemp,  $scope.passwordResetModal.passwordNew ];
                 $rootScope.fields.passwordReset =   $scope.passwordResetModal.fields;
                 $scope.passwordHintText = "welcomeModals.passwordHintText";
                 $scope.passwordHintNum = "welcomeModals.passwordHintNum";
                 $scope.passwordHintCapital = "welcomeModals.passwordHintCapital";
                 $scope.passwordHintSym = "welcomeModals.passwordHintSym";
                 $scope.passwordHintMinchar = "welcomeModals.passwordHintMinchar";

                 $scope.passwordResetModal.setPasswordVisibleClass= function(screen){
                     $scope.passwordResetModal["resetPassword0" + screen + "Visible"] = true;
                     if($scope.passwordResetModal.direction != "back"){
                         var show = "modal-slide-in-right";
                         var hide = "modal-slide-out-left";
                     } else {
                         var show = "modal-slide-in-left";
                         var hide = "modal-slide-out-right";
                     }
                     $scope.passwordResetModal.resetPassword01VisibleClass = (screen == 1) ? show : hide;
                     $scope.passwordResetModal.resetPassword02VisibleClass = (screen == 2) ? show : hide;
                     $scope.passwordResetModal.resetPassword03VisibleClass = (screen == 3) ? show : hide;
                     $scope.passwordResetModal.resetPassword04VisibleClass = (screen == 4) ? show : hide;

                     $timeout(function(){
                         $scope.passwordResetModal.resetPassword01Visible = (screen == 1);
                         $scope.passwordResetModal.resetPassword02Visible = (screen == 2);
                         $scope.passwordResetModal.resetPassword03Visible = (screen == 3);
                         $scope.passwordResetModal.resetPassword04Visible = (screen == 4);
                         //Reset direction
                         $scope.passwordResetModal.direction = "forward";
                     }, 500);
                 };

                 $scope.passwordResetModal.showPasswordPanel1 = function(){
                     $scope.passwordResetModal.setPasswordVisibleClass(1);
                     if($rootScope.restoreKeyboard){

                     } else {
                         $rootScope.keyboardHide();
                     }

                };
                 $scope.passwordResetModal.resetPasswordButton = function(){
                     JkioskService.logEvent( $rootScope.currentKeyboardState + '_startResetPassword', 'button', 'pressed');
                     $scope.passwordResetModal.showPasswordPanel2();
                 };

                $scope.passwordResetModal.showPasswordPanel2 = function(){
                    //$rootScope.focusField($scope.passwordResetModal.fields[0]);
                    
                    //shows default email-id in "enter email id text box" when login with email -thamarai(starts)
                    //else the field is empty
                    if($rootScope.passwordResetEmail.length == 10 && isNaN($rootScope.passwordResetEmail) == false){
                       console.log($rootScope.passwordResetEmail);
                       $scope.passwordResetModal.fields[0].text = $rootScope.passwordResetEmail;
                       $scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                    }else if($rootScope.passwordResetEmail.length == 12 && isNaN($rootScope.passwordResetEmail) == false){
                       console.log($rootScope.passwordResetEmail);
                       $scope.passwordResetModal.fields[0].text = "";
                       $scope.passwordResetModal.nextBtnActive = '';
                    }else {
                        console.log($rootScope.passwordResetEmail);
                        $scope.passwordResetModal.fields[0].text = $rootScope.passwordResetEmail;
                        $scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                    }
                    //shows default email-id in "enter email id text box" when login with email -thamarai(ends)

                     document.getElementById( $scope.passwordResetModal.fields[0].id).value =  $scope.passwordResetModal.fields[0].text;
                     $scope.passwordResetModal.emailOrMobileOrAadhaarPatternCheck($scope.passwordResetModal.fields[0]);
                     $scope.passwordResetModal.setPasswordVisibleClass(2);
                     $scope.passwordResetModal.submitting = false;
                     $rootScope.focusField($scope.passwordResetModal.fields[0]);

                     //Activatekeyboard enter button


                     $rootScope.keyboardShow();
                     $rootScope.keyboardEnterButtonClass = 'enter_active';
                     $rootScope.keyboardEnterButtonFunction = $scope.passwordResetModal.submitReset;
                };
                 $scope.passwordResetModal.showPasswordPanel3 = function(){
                     $scope.passwordResetModal.submitting = false;

                     //Initialize passwordTemp field in the event coming back
                     $scope.passwordResetModal.passwordTemp.text = '';
                     document.getElementById($scope.passwordResetModal.passwordTemp.id).value = $scope.passwordResetModal.passwordTemp.text;
                     $scope.passwordResetModal.passwordLengthCheckTemp($scope.passwordResetModal.fields[1]);
                     $scope.passwordResetModal.passwordTemp.type = 'password';
                     $scope.passwordResetModal.passwordTemp.textMaskedDisabled = false;
                     $scope.passwordResetModal.showPasswordClass = '';
                     $scope.passwordResetModal.showPasswordClass2 = '';
                     //Deactivate keyboard enter button
                     $rootScope.keyboardEnterButtonClass = 'enter_active';
                     //$rootScope.keyboardEnterButtonFunction = null;
                     $rootScope.keyboardEnterButtonFunction = $scope.passwordResetModal.login;

                     $scope.passwordResetModal.loginBtnActive = '';
                     $scope.passwordResetModal.setPasswordVisibleClass(3);
                    //$rootScope.keyboardShow($scope.passwordResetModal.fields[1]);
                    $rootScope.focusField($scope.passwordResetModal.fields[1]);
                };
                 $scope.passwordResetModal.showPasswordPanel4 = function(){
                     $scope.passwordResetModal.submitting = false;
                     $scope.passwordResetModal.showPasswordClass = '';
                     $scope.passwordResetModal.showPasswordClass2 = '';

                     $scope.passwordResetModal.loginBtnActive = '';

                     //Initialize passwordNew field in the event coming back
                     $scope.passwordResetModal.passwordNew.text = '';
                     document.getElementById($scope.passwordResetModal.passwordNew.id).value =  $scope.passwordResetModal.passwordNew.text;
                     $scope.passwordResetModal.passwordNew.textMasked = '';
                     $scope.passwordResetModal.passwordNew.type = 'password';
                     $scope.passwordResetModal.passwordNew.textMaskedDisabled = false;

                     //Deactivate keyboard enter button
                     $rootScope.keyboardEnterButtonClass = '';
                     $rootScope.keyboardEnterButtonFunction = null;
                     $scope.passwordResetModal.setPasswordVisibleClass(4);

                     $rootScope.keyboardShow($scope.passwordResetModal.fields[2]);
                };

                 $scope.passwordResetModal.showPasswordPanel1();
            };

            $scope.passwordResetModal.continueWithoutLoggingIn = function(){
                if ($rootScope.IHLTeleConsultSelected == true || $rootScope.isGuestUserFlowDisable == true) {
                    return;
                }
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_continueWithoutLoggingIn', 'button', 'pressed');
                $rootScope.clearModal();
                $rootScope.loadModal({ id: 'guestUserFlow' });
            };

             $scope.passwordResetModal.goBackToModal = function(){
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButtonChoose', 'button', 'pressed');
                $rootScope.loadModal({id : 'login'});
                //Toggling to login modal, fire login modal's
                //initial screen to ensure keyboard focus and method bindings fire
                $rootScope.loginModalInitScreen();
            };

             $scope.passwordResetModal.goBackToOne = function(){
                 $scope.passwordResetModal.direction = "back";
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButtonEmail', 'button', 'pressed');
                 $scope.passwordResetModal.showPasswordPanel1();
            };

             $scope.passwordResetModal.goBackToTwo = function(){
                 $scope.passwordResetModal.direction = "back";
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButtonLogin', 'button', 'pressed');
                 $scope.passwordResetModal.showPasswordPanel2();
            };

             $scope.passwordResetModal.goBackToThree = function(){
                 $scope.passwordResetModal.direction = "back";
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_backButtonNewPassword', 'button', 'pressed');
                 $scope.passwordResetModal.showPasswordPanel3();
            };
            $scope.passwordResetModal.showPasswordError = function(){
                //$scope.passwordResetModal.loginPasswordError = true;
                $timeout(function(){
                    $scope.passwordResetModal.loginPasswordError = false;
                    $scope.passwordResetModal.loginServerErrorVisible = false;
                }, 5000)
            };
            $scope.passwordResetModal.showEmailError = function(){
                //$scope.passwordResetModal.loginPasswordError = true;
                $timeout(function(){
                    $scope.passwordResetModal.loginEmailAddressError = false;
                    $scope.$apply();
                }, 5000);
            };

            $scope.passwordResetModal.emailPatternCheckReset = function(emailAddress){
                if(HigiKioskUtilitiesService.isValidEmailAddress(emailAddress)){
                    $scope.passwordResetModal.nextBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    $rootScope.hideEmailExtensionTop();
                    $rootScope.keyboardEnterButtonFunction = $scope.passwordResetModal.submitReset;
                } else{
                     $scope.passwordResetModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonClass = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                }
            };


            $scope.passwordResetModal.passwordLengthCheck = function(field){
                var str = field.text;
                //alert("passwordLengthCheck " + str);
                if(str.length >= 1){
                    //alert("you reached man");
                     $scope.passwordResetModal.loginBtnActive = 'change_password_active_btn';
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    return true;
                } else{
                    //alert("why is this happening?");
                     $scope.passwordResetModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonClass = '';
                    return false;
                }
            };

            $scope.passwordResetModal.regexPasswordValidation = function(field){
                var str = field.text;
                var regexExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                //alert("passwordLengthCheck " + str);
                if(regexExp.test(str) == true){
                    //alert("you reached man");
                    $scope.passwordResetModal.loginBtnActive = 'change_password_active_btn';
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    return true;
                } else{
                    //alert("why is this happening?");
                     $scope.passwordResetModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonClass = '';
                    return false;
                }
            };

            //Validates password for reset checkin
            $scope.passwordResetModal.passwordLengthCheckTemp = function(field){
                var str2 = field.text;
                //alert(str2);
                if($scope.passwordResetModal.passwordLengthCheck(field)){
                    //Set keyboard enter button method
                    $rootScope.keyboardEnterButtonFunction = $scope.passwordResetModal.login;
                } else {
                    //Remove keyboard enter button method
                    $rootScope.keyboardEnterButtonFunction = null;
                }
            };

            //Validates password for reset checkin
            $scope.passwordResetModal.passwordLengthCheckNew = function(field){
                var str = field.text;
                if(Boolean(str.match(/\d/))){
                    $('.change_password_new_password_hint_num').css({"color" : 'green'});
                }else{
                    $('.change_password_new_password_hint_num').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[A-Z]/))){
                    $('.change_password_new_password_hint_cap').css({"color" : 'green'});
                }else{
                    $('.change_password_new_password_hint_cap').css({"color" : 'red'});
                }
                if(str.length >= 8){
                    $('.change_password_new_password_hint_min').css({"color" : 'green'});
                }else{
                    $('.change_password_new_password_hint_min').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[@#$&%!~]/))){
                    $('.change_password_new_password_hint_sym').css({"color" : 'green'});
                }else{
                    $('.change_password_new_password_hint_sym').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[a-z]/)) && Boolean(str.match(/\d/)) && Boolean(str.match(/[A-Z]/)) && str.length >= 8 && Boolean(str.match(/[@#$&%!~]/))){
                    $('.change_password_new_password_hint').css({"color" : 'green'});
                }else{
                    $('.change_password_new_password_hint').css({"color" : 'red'});
                }
                if($scope.passwordResetModal.regexPasswordValidation(field)){
                    //Set keyboard enter button method
                    $rootScope.keyboardEnterButtonFunction = $scope.passwordResetModal.setNewPassword;
                } else {
                    //Remove keyboard enter button method
                    $rootScope.keyboardEnterButtonFunction = null;
                }
            };



            $scope.passwordResetModal.emailOrMobileOrAadhaarPatternCheck = function(field)
            {
                var str = field.text;
                //alert(str);
                var emailOrMobileExist = "";
                if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.passwordResetModal.emailValid = true;
                            $rootScope.validEmail = $scope.passwordResetModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            //forgot_password_send_btn
                            //var d = document.getElementById("forgot_password_send_btn");
                            //d.className += " active_btn";
                            $scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.passwordResetModal.aadhaarExistsCheck( $scope.passwordResetModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //alert($scope.registerModal.nextBtnActive);
                            var emailIsThis = $scope.passwordResetModal.fields[0].text;
                            var mobileIsThis = "";
                            var aadhaarIsThis = "";
                            $.ajax({
                  url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                  type : "GET", 
                  cache: false,
                  dataType: 'json',
                  headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                  success: function(html){
                    //////alert('Response sucess');
                    var json = JSON.parse(JSON.stringify(html));
                    var jss=JSON.stringify(json);
                    console.log(json);
                    var token = json.ApiKey;
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "You never registered with this Email ID"){

                                //$scope.passwordResetModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                //$scope.passwordResetModal.nextBtnActive = '';
                                //document.getElementById("login_username_error_newest2").innerHTML = finalString;
                                //$scope.passwordResetModal.loginEmailAddressErrorMessage = finalString;
                                
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                //document.getElementById("login_username_error_newest2").innerHTML = "";
                                //$scope.passwordResetModal.loginEmailAddressErrorMessage = "";
                                //$scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });

                        
               }

               //Disabling of sending temporary password(otp) to mobile number(only to email)
               //for that the below lines are commented - thamarai(starts)
               else if(str.length == 10 && isNaN(str) == false){

                    //alert("you reached man");
                    //alert($scope.registerModal.nextBtnActive);
                    $scope.passwordResetModal.aadhaarValid = true;
                    $rootScope.validEmail = $scope.passwordResetModal.aadhaarValid;
                    $scope.passwordResetModal.nextBtnActive = 'change_password_active_btn';
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.passwordResetModal.aadhaarExistsCheck( $scope.passwordResetModal.fields[0]);};
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //var d = document.getElementById("forgot_password_send_btn");
                            //d.className += " active_btn";
                            var emailIsThis = "";
                            var mobileIsThis = $scope.passwordResetModal.fields[0].text;
                            var aadhaarIsThis = "";
                            $.ajax({
                  url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                  type : "GET", 
                  cache: false,
                  dataType: 'json',
                  headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                  success: function(html){
                    var json = JSON.parse(JSON.stringify(html));
                    var jss=JSON.stringify(json);
                    console.log(json);
                    var token = json.ApiKey;
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "You never registered with this Mobile number"){

                               //$scope.passwordResetModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                //$scope.passwordResetModal.nextBtnActive = '';
                                //document.getElementById("login_username_error_newest2").innerHTML = finalString;
                                //$scope.passwordResetModal.loginEmailAddressErrorMessage = finalString;
                                
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                //document.getElementById("login_username_error_newest2").innerHTML = "";
                                //$scope.passwordResetModal.loginEmailAddressErrorMessage = "";
                                //$scope.passwordResetModal.nextBtnActive = 'active_btn';
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
               }
               //Disabling of sending temporary password(otp) to mobile number(only to email)
               //for that the below lines are commented - thamarai(ends)

               else{
                    $scope.passwordResetModal.emailValid = false;
                    $scope.passwordResetModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    //var element = document.getElementById("forgot_password_send_btn");
                    //element.classList.remove("active_btn");
               }
               
                
            };


             $scope.passwordResetModal.sendResetSubmit = function(){
                 var emailUsed = function(){
                    //Success
                     HigiKioskStorageService.saveSessionData('email', $scope.passwordResetModal.fields[0].text);
                     JkioskService.registerKiosk();
                     HigiApiService.PasswordResetAsync($scope.passwordResetModal.fields[0].text, function(result) {
                         //Success

                         $scope.passwordResetModal.showPasswordPanel3();
                         $scope.$apply();
                     }, function() {
                         $scope.passwordResetModal.submitting = false;
                         //Enable keyboard enter button
                         console.log('password reset netowrk error');
                         $rootScope.keyboardEnterButtonClass = 'enter_active';

                         $scope.passwordResetModal.loginEmailAddressError = true;
                         //alert("if here then");
                         $scope.passwordResetModal.loginEmailAddressErrorMessage = "welcomeModals.server.failure";
                         $scope.passwordResetModal.showEmailError();
                         $scope.$apply();
                     });
                 };
                 var emailNotUsed = function(){
                     $scope.passwordResetModal.submitting = false;
                     //Enable keyboard enter button
                     $rootScope.keyboardEnterButtonClass = 'enter_active';
                     $scope.passwordResetModal.loginEmailAddressError = true;
                     $scope.passwordResetModal.loginEmailAddressErrorMessage = "welcomeModals.failure.account.not.exist_mobile";
                     $scope.passwordResetModal.showEmailError();
                 };
                 HigiApiService.checkEmailExist($scope.passwordResetModal.fields[0].text, emailNotUsed, emailUsed)

            };
            
            $scope.passwordResetModal.resendOTP = function(){
                $('.otpsend_loader').css('display', 'block');
                $scope.passwordResetModal.resend_otp_forgotpassword = false;
                HigiApiService.PasswordResetAsync($scope.passwordResetModal.fields[0].text, function(result) {
                    console.log(result)
                    if(result == 'success'){
                        $('.otpsend_loader').css('display', 'none');
                        $scope.passwordResetModal.otpsend_successfully = true;
                        setTimeout(function(){
                            $scope.passwordResetModal.otpsend_successfully = false;
                        },5000);
                        setTimeout(function(){
                            $scope.passwordResetModal.resend_otp_forgotpassword = true;
                        },30000);
                    }else{
                        $('.otpsend_loader').css('display', 'none');
                    }
                })
            }
            

             $scope.passwordResetModal.submitReset = function(){
                var firstField = $scope.passwordResetModal.fields[0].text;
                $('.otpsend_loader').css('display', 'none');
                setTimeout(function(){
                    $scope.passwordResetModal.resend_otp_forgotpassword = true;
                },30000);
                if(firstField.length == 10 && isNaN(firstField) == false){

                var finalPhone = "";

                
            /*window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('emailReset', {
              'size': 'invisible',
              'callback': function(response) {
              }
            });*/
                var phoneNumber = $scope.passwordResetModal.fields[0].text;
                finalPhone = "+91"+phoneNumber;
                //alert(finalPhone);
                  //var appVerifier = window.recaptchaVerifier;
                /*firebase.auth().signInWithPhoneNumber(finalPhone, appVerifier).then(function(confirmationResult) {
                    window.confirmationResult = confirmationResult; 
                a(confirmationResult); 
                });*/
                //alert("password reset");
                //Showing panel before callback finishes
                 $scope.passwordResetModal.submitting = true;
                 //disable keyboard button
                 $rootScope.keyboardEnterButtonClass = '';
                JkioskService.logEvent($rootScope.currentKeyboardState + '_resetSendEmailButton', 'button', 'pressed');
                 $scope.passwordResetModal.sendResetSubmit();
                 //window.recaptchaVerifier.clear();

            }
            else{
                //alert("password reset");
                //Showing panel before callback finishes
                 $scope.passwordResetModal.submitting = true;
                 //disable keyboard button
                 $rootScope.keyboardEnterButtonClass = '';
                JkioskService.logEvent($rootScope.currentKeyboardState + '_resetSendEmailButton', 'button', 'pressed');
                 $scope.passwordResetModal.sendResetSubmit();
            }
                 
            };



            $scope.passwordResetModal.login = function(){
                
                var inputValue = $scope.passwordResetModal.fields[0].text;

                if(inputValue.length == 10 && isNaN(inputValue) == false){

                    JkioskService.logEvent($rootScope.currentKeyboardState + '_resetLoginButton', 'button', 'pressed');
                    $scope.passwordResetModal.submitting = true;
                    //disable keyboard button
                    $rootScope.keyboardEnterButtonClass = '';
                    JkioskService.registerKiosk();

                    HigiApiService.qLoginAsync( $scope.passwordResetModal.fields[0].text,  $scope.passwordResetModal.fields[1].text,
                    function (resp) {
                        //Server Success
                        if (resp == null) {
                             //...but Error: Password Failure
                             $scope.passwordResetModal.submitting = false;
                             //Enable keyboard enter button
                             $rootScope.keyboardEnterButtonClass = 'enter_active';
                             $scope.passwordResetModal.loginPasswordError = true;
                             //$scope.passwordResetModal.loginEmailAddressError = "auth.failure.account.not.exist";
                             $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                             $scope.passwordResetModal.showPasswordError();
                             $scope.$apply();
                        }

                        else {
                            //Success: Password accepted. Load data from server and into session.
                            //HigiApi.QLogin( $('#login_username_input').text() , $('#login_password_input').text() );
                            console.log(resp);
                            console.log(resp.User);
                            $rootScope.UserInfo = resp.User;
                            HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                             $scope.passwordResetModal.tempUser = resp.User;
                             $scope.passwordResetModal.tempToken = resp.Token;
                             $scope.passwordResetModal.tempLastCheckin = resp.LastCheckin;
                             $scope.passwordResetModal.tempUserData = resp;
                             $scope.passwordResetModal.showPasswordPanel4();
                             $scope.$apply();
                        }
                    },

                           
                    
                    function () {
                        //Enable keyboard enter button

                        //...but Error: Password Failure
                        $scope.passwordResetModal.submitting = false;
                        //Enable keyboard enter button
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        $scope.passwordResetModal.loginPasswordError = true;
                        //alert("in login function");
                        $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.server.failure";
                        $scope.passwordResetModal.showPasswordError();
                        $scope.$apply();

                    });

                    /*window.confirmationResult.confirm($scope.passwordResetModal.fields[1].text) 
                        .then(function(result) {

                            //alert("sussess");

                            $scope.passwordResetModal.showPasswordPanel4();
                             $scope.$apply();
                        },

                         function(error) { 
                        //alert(error); 
                        $scope.passwordResetModal.submitting = false;
                     //Enable keyboard enter button
                     $rootScope.keyboardEnterButtonClass = 'enter_active';
                     $scope.passwordResetModal.loginPasswordError = true;
                     //$scope.passwordResetModal.loginEmailAddressError = "auth.failure.account.not.exist";
                     $scope.passwordResetModal.loginPasswordErrorMessage = "auth.failure.password.incorrect";
                     $scope.passwordResetModal.showPasswordError();
                     $scope.$apply();
                    });*/
                }
                else{

                    JkioskService.logEvent($rootScope.currentKeyboardState + '_resetLoginButton', 'button', 'pressed');
                    $scope.passwordResetModal.submitting = true;
                    //disable keyboard button
                    $rootScope.keyboardEnterButtonClass = '';
                    JkioskService.registerKiosk();

                    HigiApiService.qLoginAsync( $scope.passwordResetModal.fields[0].text,  $scope.passwordResetModal.fields[1].text,
                    function (resp) {
                        //Server Success
                        if (resp == null) {
                             //...but Error: Password Failure
                             $scope.passwordResetModal.submitting = false;
                             //Enable keyboard enter button
                             $rootScope.keyboardEnterButtonClass = 'enter_active';
                             $scope.passwordResetModal.loginPasswordError = true;
                             //$scope.passwordResetModal.loginEmailAddressError = "auth.failure.account.not.exist";
                             $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                             $scope.passwordResetModal.showPasswordError();
                             $scope.$apply();
                        }

                        else {
                            //Success: Password accepted. Load data from server and into session.
                            //HigiApi.QLogin( $('#login_username_input').text() , $('#login_password_input').text() );
                            console.log(resp);
                            console.log(resp.User);
                            $rootScope.UserInfo = resp.User;
                            HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                             $scope.passwordResetModal.tempUser = resp.User;
                             HigiKioskStorageService.saveSessionData('gender',$scope.passwordResetModal.tempUser.gender);
                             HigiKioskStorageService.saveSessionData('birthdate',$scope.passwordResetModal.tempUser.dateOfBirth);
                             HigiKioskStorageService.saveSessionData('height',$scope.passwordResetModal.tempUser.heightMeters);
                             $scope.passwordResetModal.tempToken = resp.Token;
                             $scope.passwordResetModal.tempLastCheckin = resp.LastCheckin;
                             $scope.passwordResetModal.tempUserData = resp;
                             $scope.passwordResetModal.showPasswordPanel4();
                             $scope.$apply();
                        }
                    },

                           
                    
                    function () {
                        //Enable keyboard enter button

                        //...but Error: Password Failure
                        $scope.passwordResetModal.submitting = false;
                        //Enable keyboard enter button
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        $scope.passwordResetModal.loginPasswordError = true;
                        //alert("in login function");
                        $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.server.failure";
                        $scope.passwordResetModal.showPasswordError();
                        $scope.$apply();

                    });
                }
            };

             $scope.passwordResetModal.showPasswordToggle = function(field){
                if (field.id == "passwordTemp") {
                    field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                     if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                         $scope.passwordResetModal.showPasswordClass = 'change_password_active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'unchecked');
                         $scope.passwordResetModal.showPasswordClass = '';
                        var textMasked = '';
                        for(var i = 0; i<field.textMasked.length; i++){
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    }
                }else if (field.id == "passwordNew") {
                    field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                     if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                         $scope.passwordResetModal.showPasswordClass2 = 'change_password_active_eyes2';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'unchecked');
                         $scope.passwordResetModal.showPasswordClass2 = '';
                        var textMasked = '';
                        for(var i = 0; i<field.textMasked.length; i++){
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    }
                }
                
            };

            $scope.passwordResetModal.setNewPassword = function(){
                JkioskService.logEvent($rootScope.currentKeyboardState + '_resetSetNewButton', 'button', 'pressed');
                $scope.passwordResetModal.submitting = true;
                //disable keyboard button
                $rootScope.keyboardEnterButtonClass = '';
                var getEmailVal = $scope.passwordResetModal.fields[0].text;
                var jsontext = '{"email": "'+getEmailVal+'"}';
                $.ajax({
                    url: getSettingsValue('kiosk.api.url') + "/login/qloginFinalForget",
                    type : "POST", 
                    cache: false,
                    data:jsontext,
                    contentType: 'application/json; charset=UTF-8',  
                    dataType: 'json',
                    headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
                    success: function(html){
                        console.log(html);
                        //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                        //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                        //var thisIsFinal = JSON.parse(html.replace(/&quot;/g,'"'));
                        //console.log(thisIsFinal);
                        //console.log(thisIsFinal.returnLogin.User);
                         /*HigiKioskStorageService.saveSessionData('challengeObject', thisIsFinal.returnLogin.ChallengeUserRelation);
                         $scope.passwordResetModal.tempUser = thisIsFinal.returnLogin.User;
                         $scope.passwordResetModal.tempToken = thisIsFinal.returnLogin.Token;
                         $scope.passwordResetModal.tempLastCheckin = thisIsFinal.returnLogin.LastCheckin;
                         $scope.passwordResetModal.tempUserData = thisIsFinal.returnLogin;*/
                         //console.log(thisIsFinal.returnLogin.User);
                        HigiApi.SetPasswordAsync( $scope.passwordResetModal.tempUser.id,  $scope.passwordResetModal.tempToken,  $scope.passwordResetModal.passwordNew.text, function(response) {
                            //Server success
                            console.log(response);
                            if (response  == 'success' || response  == 'fail') {
                                //Success
                                if ($scope.passwordResetModal.tempLastCheckin == undefined || $scope.passwordResetModal.tempLastCheckin == null) {
                                    $rootScope.lastCheckinModalShow = true;
                                    $rootScope.clearModal();
                                }else{
                                    console.log($scope.passwordResetModal.tempLastCheckin);
                                    HigiKioskUserService.initSession( $scope.passwordResetModal.tempUser,  $scope.passwordResetModal.tempLastCheckin, false,  $scope.passwordResetModal.tempToken,  $scope.passwordResetModal.tempUserData);
                                }
                            }
                            else {
                                //Error: Password not set
                                //displayInputError('.forgot_password_direction', '#forgot_password_error', 'auth.failure.password.set', 'validateTempPasswordInput()' );
                                //enableKeyboardDialogButtons();
                                 $scope.passwordResetModal.submitting = false;
                                //Enable keyboard enter button
                                $rootScope.keyboardEnterButtonClass = 'enter_active';
                                 //$scope.passwordResetModal.loginEmailAddressError = "auth.failure.account.not.exist";
                                 $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.failure.password.set";
                                 $scope.passwordResetModal.loginPasswordError = true;

                                 $scope.passwordResetModal.showPasswordError();
                                 $scope.$apply();
                            }
                             }, function() {
                                 $scope.passwordResetModal.submitting = false;
                                 //Enable keyboard enter button
                                 $rootScope.keyboardEnterButtonClass = 'enter_active';
                                 //$scope.passwordResetModal.loginEmailAddressError = "global.server.failure";
                                 //alert("its here");
                                 $scope.passwordResetModal.loginPasswordErrorMessage = "welcomeModals.server.failure";
                                 $scope.passwordResetModal.loginPasswordError = true;

                                 $scope.passwordResetModal.showPasswordError();
                                 $scope.$apply();
                                });
                                     
                    },
                    error : function(xhr, status, error) { 
                        console.log('failures 3'+xhr.responseText);
                    } 
                });    
            };

            $scope.passwordResetModal.interfaceLabelsReady = $scope.$watch('interfaceLabels', function(newVal, oldVal){
                if(newVal != undefined){
                    $scope.passwordResetModal.init();
                    //delete watch
                    $scope.passwordResetModal.interfaceLabelsReady();
                }
            });
        }
    };
}]);

