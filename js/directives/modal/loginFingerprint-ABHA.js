
higiKioskControllers.directive('loginModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/login.html',
        controller: function ($scope) {
            //$scope.fingerprintTrue = HigiKioskStorageService.returnSessionData("fingerprintTrue");
            //var getBpplVal = localStorage.getItem("fingerprintTrueorFalse");

            //alert("$rootScope.fingerprintTrueorFalse "+$rootScope.fingerprintTrueorFalse);

            if (!$rootScope.fingerprintTrueorFalse) {

                $scope.loginModal = new Object();
                $scope.loginModal.watch = $scope.$watch('modalVisible', function (newVal, oldVal) {
                    if (newVal == false) {
                        $scope.loginModal.init();
                    }
                });
                $scope.loginModal.labelWatch = $rootScope.$watch('interfaceLabels', function (newVal, oldVal) {
                    $scope.loginModal.init();
                });

                $scope.loginModal.init = function () {
                    //Set localization fields
                    $rootScope.fpWarningTxt = "welcomeModals.loginFingerprintNotRecognized";
                    $scope.loginModal.loginEmailSectionClass = "";
                    /*$scope.loginModal.loginTitle = "login.to.your.account";
                    $scope.loginModal.loginTitleEmail = "login.enter.your.email.or.mobile";
                    $scope.loginModal.loginEmailAddress = "login.email.address";
                    $scope.loginModal.loginEmailAddressError = "auth.failure.account.not.exist";
                    $scope.loginModal.loginCreateAccount = "login.create.a.new.account";*/
                    $scope.loginModal.globalNext = "global.next";
                    /*$scope.loginModal.loginPassword = "login.enter.your.password";
                    $scope.loginModal.loginPasswordNote = "login.min.6";
                    $scope.loginModal.loginEnterPassword = "login.enter.a.password";
                    $scope.loginModal.loginShowPassword = "login.show.password";
                    $scope.loginModal.loginForgotPassword = "login.forgot.password";*/
                    $scope.loginModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                    $scope.loginModal.loginServerError = "welcomeModals.server.failure";
                    $scope.loginModal.globalLogin = "welcomeModals.login";
                    $scope.loginModal.globalBack = "global.back";
                    /*$scope.loginModal.loginType = "global.loginType";
                    $scope.loginModal.emailTypeLogin = "global.adharLogin";
                    $scope.loginModal.fingerPrintTypeLogin = "global.fingerPrintLogin";*/
                    $scope.loginModal.nextBtnActive = '';
                    $scope.loginModal.loginBtnActive = '';
                    $scope.loginModal.loginUsernameError = false;
                    $scope.loginModal.loginMode = { id: 'register' };
                    $scope.loginModal.submitting = false;
                    $scope.loginModal.loginUsernameError = false;
                    $scope.loginModal.loginPasswordError = false;
                    $scope.loginModal.loginServerErrorVisible = false;

                    $scope.Showpass = 'welcomeModals.Showpas';
                    $scope.leftthumblogin = 'welcomeModals.leftlogin';
                    $scope.pleasewait = 'welcomeModals.pleasewait';
                    $scope.skipfinger = 'welcomeModals.skipfing';
                    $scope.enterpass = "welcomeModals.enterpasss";
                    $scope.fingernot = 'welcomeModals.Fingerprintnot';
                    $rootScope.neverregister = 'welcomeModals.neverregiste';
                    $scope.valada = "welcomeModals.validateadhar";
                    $scope.valmobno = "welcomeModals.validatemobi";
                    //$scope.loginModal.enteryouremailadd = "global.adhar";

                    $scope.loginModal.sevrerr = "welcomeModals.sevrerr";
                    $scope.loginModal.otheraccCred = "welcomeModals.otheraccCred";
                    $scope.loginModal.quickLoginOp = "welcomeModals.quickLoginOp";
                    $scope.loginModal.CreatAcc = "welcomeModals.CreatAcc";
                    $scope.loginModal.CreatAccbuttonTxt = "welcomeModals.CreatAccbuttonTxt";
                    $scope.loginModal.reserPass = "welcomeModals.reserPass";
                    $scope.loginModal.ForgetPass = "welcomeModals.ForgetPass";
                    $scope.loginModal.scanFinger = "welcomeModals.scanFinger";
                    $scope.loginModal.devicenotConn = "welcomeModals.devicenotConn";
                    $scope.loginModal.guestUser = "welcomeModals.guestUser";
                    $scope.loginModal.ssoLogin = "welcomeModals.ssoLogin";
                    $rootScope.validates = "global.validatess";
                    //$scope.loginModal.enteremailplaceholder = "";
                    //$scope.loginModal.enterpasswordplaceholder = "";
                    //setTimeout(function(){
                     //$scope.loginModal.enteremailplaceholder = $scope.interfaceLabels['global.adhar'];
                     //$scope.loginModal.enterpasswordplaceholder = $scope.interfaceLabels['login.enter.your.password'];

                     //alert($scope.loginModal.enteremailplaceholder);
                     //alert($scope.loginModal.enterpasswordplaceholder);
                     
                   //},1000);
                    

                    $scope.loginModal.fields = [
                        { id: "email", placeholder:HigiKioskUtilitiesService.getPlaceholder('welcomeModals.emailormobile'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.loginModal.emailOrMobileOrAadhaarPatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                        { id: "password", placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.enteryouypasswords'), defaultText: "", text: "", textMasked: '', type: 'password', visible: true, selectedClass: '', callback: function () { $scope.loginModal.passwordLengthCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true }
                    ];

                    $rootScope.fields.login = $scope.loginModal.fields;



                    //Set visibility of panels
                    $scope.loginModal.loginPasswordSectionClass = "";
                    $scope.loginModal.loginEmailSectionClass = "";
                    $scope.loginModal.loginPasswordSection = false;
                    //$scope.loginModal.loginEmailSection = true;
                    //$scope.loginModal.loginCreateFingerprintSection = true;
                    $scope.loginModal.loginPasswordSectionClass = "";
                    $scope.loginModal.loginEmailSectionClass = "";
                    $scope.loginModal.loginPasswordSection = false;
                    $scope.loginModal.fingerprintRegretSectionClass = "";
                    $scope.loginModal.fingerprintRegretSection = false;

                    $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "";
                    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    $scope.loginModal.selectLogin = true;
                    $scope.loginModal.selectLoginClass = true;
                    $scope.loginModal.loginEmailSection = false;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $scope.loginModal.EmailAndPasswordDivisionClass = '';
                    $rootScope.clearLoginScreens = $scope.loginModal.clearAllLoginScreens;
                    $scope.loginModal.resetPassword = function () {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_forgotPasswordButton', 'input', 'selected');
                        $rootScope.passwordResetEmail = $scope.loginModal.fields[0].text;
                        $rootScope.keyboardHide();
                        $rootScope.loadModal({ id: 'resetpassword' });
                    }
                };

                $rootScope.loginModelInit = $scope.loginModal.init;

                $scope.loginModal.showPasswordToggle = function (field) {
                    field.textMaskedDisabled = !field.textMaskedDisabled;
                    if (field.textMaskedDisabled) {
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if (field.textMaskedDisabled) {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.loginModal.showPasswordClass = 'active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                        $scope.loginModal.showPasswordClass = '';
                        var textMasked = '';
                        for (var i = 0; i < field.textMasked.length; i++) {
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    }
                };

                $scope.loginModal.showEmailSectionError = function () {
                    //$scope.loginModal.loginUsernameError = true;
                    $timeout(function () {
                        $scope.loginModal.loginServerErrorVisible = false;
                        $scope.loginModal.loginUsernameError = false;
                    }, 5000)
                };
                $scope.loginModal.showPasswordError = function () {
                    //$scope.loginModal.loginPasswordError = true;
                    $timeout(function () {
                        $scope.loginModal.loginPasswordError = false;
                        $scope.loginModal.loginServerErrorVisible = false;
                    }, 5000)
                };


                $scope.loginModal.emailPatternCheck = function (field) {

                    var str = field.text;

                    if (str.length == 10) {
                        if (isNaN(str)) {
                            //not a number


                        } else {
                            //number as well as exact 10 digit mobile number.
                            $scope.loginModal.nextBtnActive = 'active_btn';

                        }
                    }
                    if (str.length < 10) {
                        $scope.loginModal.nextBtnActive = '';
                    }

                    if (str.length > 10) {

                        if (HigiKioskUtilitiesService.isValidEmailAddress(field)) {
                            $rootScope.hideEmailExtensionTop();
                            $scope.loginModal.nextBtnActive = 'active_btn';
                            $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.emailExistsCheck($scope.loginModal.fields[0]) };
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            $rootScope.hideEmailExtensionTop();
                        } else {
                            $scope.loginModal.nextBtnActive = '';
                            $rootScope.keyboardEnterButtonFunction = null;
                            $rootScope.keyboardEnterButtonClass = '';
                        }


                    }

                };

                $scope.loginModal.aadhaarExistsCheck = function (field) {
                    var aadhaar_no_new = document.getElementById("email").value;
                    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    var aadhaar_no = false;
                    var aadhaar_no_empty = true;
                    if (aadhaar_no_new != "" && aadhaar_no_new.length == 10 && !isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";

                    }
                    else if (aadhaar_no_new != "" && aadhaar_no_new.length == 12 && !isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";
                    }
                    else if (aadhaar_no_new != "" && regexEmail.test(aadhaar_no_new) == true && isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";

                    }
                    else {
                        $scope.loginModal.nextBtnActive = '';
                        //alert("u r not valid");
                    }


                };


                $scope.loginModal.emailOrMobileOrAadhaarPatternCheck = function (field) {
                    var str = field.text;
                    if(str.length <= 1 ){ // validation text removed
                        document.getElementById("login_username_error_newest3").innerHTML = "";
                        $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                    }                    
                    var emailOrMobileExist = "";
                    if (HigiKioskUtilitiesService.isValidEmailAddress(field)) {
                        $scope.loginModal.emailValid = true;
                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                        $rootScope.validEmail = $scope.loginModal.emailValid;
                        $rootScope.hideEmailExtensionTop();

                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        //alert($scope.registerModal.nextBtnActive);
                        var emailIsThis = $scope.loginModal.fields[0].text;
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";
                        $rootScope.isOnlinee1 = window.navigator.onLine;
                        if ($rootScope.isOnlinee1) {
                            document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                            document.getElementById("register-first-screen-text").style.color = "#1873A7";
                            document.getElementById("login_username_loading_new").style.display = "block";
                            $.ajax({
                                url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                                type: "GET",
                                cache: false,
                                dataType: 'json',
                                headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                                success: function (html) {
                                    var json = JSON.parse(JSON.stringify(html));
                                    var jss = JSON.stringify(json);
                                    console.log(json);
                                    var token = json.ApiKey;
                                    $rootScope.ApiToken = token;
                                    $.ajax({
                                        url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                        type: "GET",
                                        cache: false,
                                        contentType: 'application/json; charset=UTF-8',
                                        headers: { "ApiToken": token },
                                        success: function (html) {
                                            console.log(JSON.stringify(html));
                                            emailOrMobileExist = JSON.stringify(html);
                                            //alert(emailOrMobileExist);
                                            var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                            if (finalString == "You never registered with this Email ID") {

                                                $scope.loginModal.nextBtnActive = '';
                                                //alert("IfemailOrMobileExist"+finalString);
                                                $scope.loginModal.nextBtnActive = '';
                                                //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                                $("#login_username_error_newest3").css({'top':'-11px','left':'410px','width':'117px','font-size':'13px'});
                                                document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregisterd'];

                                                $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                            }
                                            else if (finalString == "") {
                                                //alert("ElseemailOrMobileExist"+finalString);
                                                document.getElementById("login_username_error_newest3").innerHTML = "";
                                                $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                                $scope.loginModal.nextBtnActive = 'active_btn';
                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                                $scope.loginModal.showPasswordSection();
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.log('failures 3' + xhr.responseText);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            document.getElementById("register-first-screen-text").innerHTML = "Server error!";
                            document.getElementById("register-first-screen-text").style.color = "red";
                            document.getElementById("login_username_loading_new").style.display = "none";
                        }


                    }


                    else if (str.length == 12 && isNaN(str) == false) {


                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$scope.valada];
                        $scope.loginModal.mobileValid = true;
                        $rootScope.validEmail = $scope.loginModal.mobileValid;
                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';

                        var emailIsThis = "";
                        var mobileIsThis = "";
                        var aadhaarIsThis = $scope.loginModal.fields[0].text;
                        $rootScope.isOnlinee2 = window.navigator.onLine;
                        if ($rootScope.isOnlinee2) {
                            document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                            document.getElementById("register-first-screen-text").style.color = "#1873A7";
                            document.getElementById("login_username_loading_new").style.display = "block";
                            $.ajax({
                                url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                                type: "GET",
                                cache: false,
                                dataType: 'json',
                                headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                                success: function (html) {
                                    var json = JSON.parse(JSON.stringify(html));
                                    var jss = JSON.stringify(json);
                                    console.log(json);
                                    var token = json.ApiKey;
                                    $rootScope.ApiToken = token;
                                    $.ajax({
                                        url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                        type: "GET",
                                        cache: false,
                                        contentType: 'application/json; charset=UTF-8',
                                        headers: { "ApiToken": token },
                                        success: function (html) {
                                            console.log(JSON.stringify(html));
                                            emailOrMobileExist = JSON.stringify(html);
                                            var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                            if (finalString == "You never registered with this Aadhaar number") {

                                                $scope.loginModal.nextBtnActive = '';
                                                $scope.loginModal.nextBtnActive = '';
                                                //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                                $("#login_username_error_newest3").css({'top':'-5px','left':'400px','width':'125px','font-size':'13px'});
                                                document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregadhar'];

                                                $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                            }
                                            else if (finalString == "") {
                                                document.getElementById("login_username_error_newest3").innerHTML = "";
                                                $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                                $scope.loginModal.nextBtnActive = 'active_btn';
                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                                $scope.loginModal.showPasswordSection();
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.log('failures 3' + xhr.responseText);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            document.getElementById("register-first-screen-text").innerHTML = "Server error!";
                            document.getElementById("register-first-screen-text").style.color = "red";
                            document.getElementById("login_username_loading_new").style.display = "none";
                        }
                    }

                    else if (str.length == 10 && isNaN(str) == false) {
                        $scope.loginModal.aadhaarValid = true;
                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$scope.valmobno];
                        $rootScope.validEmail = $scope.loginModal.aadhaarValid;
                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';

                        var emailIsThis = "";
                        var mobileIsThis = $scope.loginModal.fields[0].text;
                        var aadhaarIsThis = "";
                        $rootScope.isOnlinee3 = window.navigator.onLine;
                        if ($rootScope.isOnlinee3) {
                            document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                            document.getElementById("register-first-screen-text").style.color = "#1873A7";
                            document.getElementById("login_username_loading_new").style.display = "block";
                            $.ajax({
                                url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                                type: "GET",
                                cache: false,
                                dataType: 'json',
                                headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                                success: function (html) {
                                    var json = JSON.parse(JSON.stringify(html));
                                    var jss = JSON.stringify(json);
                                    console.log(json);
                                    var token = json.ApiKey;
                                    $rootScope.ApiToken = token;
                                    $.ajax({
                                        url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                        type: "GET",
                                        cache: false,
                                        contentType: 'application/json; charset=UTF-8',
                                        headers: { "ApiToken": token },
                                        success: function (html) {
                                            console.log(JSON.stringify(html));
                                            emailOrMobileExist = JSON.stringify(html);
                                            //alert(emailOrMobileExist);
                                            var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                            if (finalString == "You never registered with this Mobile number") {

                                                $scope.loginModal.nextBtnActive = '';
                                                //alert("IfemailOrMobileExist"+finalString);
                                                $scope.loginModal.nextBtnActive = '';
                                                //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                                $("#login_username_error_newest3").css({'top':'-5px','left':'400px','width':'125px','font-size':'13px'});
                                                document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregpass'];

                                                $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                            }
                                            else if (finalString == "") {
                                                //alert("ElseemailOrMobileExist"+finalString);
                                                document.getElementById("login_username_error_newest3").innerHTML = "";
                                                $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                                $scope.loginModal.nextBtnActive = 'active_btn';
                                                document.getElementById("login_username_loading_new").style.display = "none";
                                                document.getElementById("register-first-screen-text").innerHTML = "";
                                                $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                                $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                                $scope.loginModal.showPasswordSection();
                                            }
                                        },
                                        error: function (xhr, status, error) {
                                            console.log('failures 3' + xhr.responseText);
                                        }
                                    });
                                }
                            });
                        }
                        else {
                            document.getElementById("register-first-screen-text").innerHTML = "Server error!";
                            document.getElementById("register-first-screen-text").style.color = "red";
                            document.getElementById("login_username_loading_new").style.display = "none";
                        }
                    }
                    else {
                        $scope.loginModal.emailValid = false;
                        $scope.loginModal.nextBtnActive = '';
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                    }


                };
                

                $scope.loginModal.passwordLengthCheck = function (field) {
                    var str = field.text;

                    if (str.length >= 1) {
                        $scope.loginModal.loginBtnActive = 'login_modal_password_active_btn';
                        $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                    } else {
                        $scope.loginModal.loginBtnActive = '';
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                    }
                };

                var functionCall = true;

                $scope.loginModal.emailExistsCheck = function (field) {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_emailNextButton', 'button', 'pressed');
                    $scope.loginModal.submitting = true;
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';

                    //alert($("#email").val());
                    var getEmailVal = $("#email").val();
                    var jsontext =
                        '{"email": "' + getEmailVal + '"}';
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/login/qloginFinal",
                        type: "POST",
                        cache: false,
                        data: jsontext,
                        contentType: 'application/json; charset=UTF-8',
                        dataType: 'json',
                        headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
                        success: function (html) {
                            //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                            console.log(html);




                            if (html == true) {

                                //alert("what is the xstatus " + functionCall);
                                HigiApiService.checkEmailExist(field.text,

                                    function () {
                                        //Error: No such email
                                        $scope.loginModal.submitting = false;
                                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.emailExistsCheck($scope.loginModal.fields[0]) };
                                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                                        $scope.loginModal.loginUsernameError = true;
                                        $scope.loginModal.showEmailSectionError();


                                    },
                                    //Success: Email Exists, show password form
                                    function () {

                                        //$scope.loginModal.showPasswordSection();
                                        //document.getElementById("keyboardbox").style.display = "none";
                                        $rootScope.keyboardHide();
                                        $scope.loginModal.loginEmailSection = false;
                                        $scope.loginModal.loginCreateFingerprintSection = true;
                                        $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
                                        $scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";

                                        $("#toggleSkip").hide();
                                        $("#togglePass").show();

                                        //alert("what is the xstatus " + functionCall);
                                        functionCall = true;
                                        if (functionCall) {

                                            setTimeout(
                                                function () {
                                                    if (functionCall) {
                                                        $scope.testingFunction();
                                                    }

                                                }, 5000);
                                        }
                                        //document.getElementById('togglePass').onclick = enterPassword;
                                        //$scope.enterPassword();
                                    },




                                    /*function(){
                                        //Error: Request responded with a error
                                        $scope.Capture();
                                    },*/
                                    function () {
                                        $scope.loginModal.submitting = false;
                                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.emailExistsCheck($scope.loginModal.fields[0]) };
                                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                                        $scope.loginModal.loginServerErrorVisible = true;
                                        $scope.loginModal.showEmailSectionError();


                                    });
                            } else {
                                ////alert("10 digit mobile number");
                                ////alert("so we should validate this mobile number exists or not in database");
                                $scope.loginModal.showPasswordSection();
                                //alert("comes here");

                            }
                        },

                        error: function (xhr, status, error) {
                            //alert('failures 3'+xhr.responseText);
                        }
                    });
                };




                $scope.loginModal.login = function () {
                    $rootScope.isOnlinee00 = window.navigator.onLine;
                    if ($rootScope.isOnlinee00) {
                        if($scope.loginModal.fields[0].text != "demouser@ihl.com"){
                            JkioskService.logEvent($rootScope.currentKeyboardState + '_loginButton', 'button', 'pressed');
                            $scope.loginModal.submitting = true;
                            $rootScope.keyboardEnterButtonFunction = null;
                            $rootScope.keyboardEnterButtonClass = '';
                            JkioskService.registerKiosk();
                            if ($route.current.$$route.originalPath.search("finish") != -1) {
                                var callback = $rootScope.saveCheckinFinalResultsLogin;
                            } else {
                                var callback = null;
                            }

                            HigiApiService.qLoginAsync($scope.loginModal.fields[0].text, $scope.loginModal.fields[1].text,
                                function (resp) {
                                console.log("response received");

                                console.log(resp);

                                    if(resp != null) {
                                        $scope.getPastKioskVitalData(resp);
                                    }


                                    if (resp != null) {
                                        console.log(resp.User.id);     
                                        $rootScope.UserToken = resp.Token;
                                        $rootScope.logged_mail = resp.User.email;
                                        $rootScope.UserInfo = resp.User;

                                        if($rootScope.abhaflowEnable){

                                            let data = {
                                                method : 'abhaDetailFetchIhlId',
                                                data : $rootScope.UserInfo.id
                                            };

                                            HigiApiService.getABHASession(data, function(res){
                                                var data = JSON.parse(res);
                                                console.log(data.res);
                                                var abhaDetail = JSON.parse(data.res)[0];

                                                if(data.status == 'S'){
                                                    if(abhaDetail.abha_address){
                                                        $rootScope.abhaAddressFetched = abhaDetail.abha_address;
                                                        $rootScope.abhaAccountLinked = true;
                                                    }

                                                }
                                            })
                                        }

                                        //for telemedicine agreement enabling and disabling.(search with this comment line)
                                        var telemediagreementresponse = resp.User.isTeleMedPolicyAgreed;
                                        HigiKioskStorageService.saveSessionData('telemediAgreementResponse', telemediagreementresponse);

                                        //for affiliation
                                        var loginResp = resp;
                                        HigiKioskStorageService.saveSessionData('loginResp', loginResp);

                                        if (resp.User != null && resp.User != undefined && resp.User != "") {
                                            var affiliateUserId = resp.User.id;
                                            HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                                            if (resp.User.affiliate != undefined && resp.User.affiliate != null) {
                                                //alert("affiliate");
                                                $rootScope.updateAffiliate = true;
                                            }else{
                                                //alert("not a affiliate");
                                                $rootScope.updateAffiliate = false;
                                            }
                                        }
                                        //for affiliation ends
                                    }
                                    if (resp == null) {
                                        $scope.loginModal.submitting = false;
                                        $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                                        $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);
                                        $scope.loginModal.loginEmailAddressError = "welcomeModals.failure.account.not.exist";
                                        $scope.loginModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                                        $scope.loginModal.loginPasswordError = true;
                                        if (document.getElementById("error_message_login") != undefined && document.getElementById("error_message_login") != null) {
                                            document.getElementById("error_message_login").style.display = "block";
                                        }
                                        
                                        $rootScope.resetSessionTimeout();
                                        $scope.loginModal.showPasswordError();
                                    }
                                    else {
                                        $scope.loginModal.watch();
                                        console.log("here is your id :" + resp.User.id);

                                        //for affiliation
                                        var loginResp = resp;
                                        HigiKioskStorageService.saveSessionData('loginResp', loginResp);

                                        if (resp.User != null && resp.User != undefined && resp.User != "") {
                                            var affiliateUserId = resp.User.id;
                                            HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                                            if (resp.User.affiliate != undefined && resp.User.affiliate != null) {
                                                //alert("affiliate");
                                                $rootScope.updateAffiliate = true;
                                            }else{
                                                //alert("not a affiliate");
                                                $rootScope.updateAffiliate = false;
                                            }
                                        }
                                        //for affiliation ends


                                        // session storage for telemedi registeration flow start
                                        //````````````````````````````````````````````````````````````

                                        HigiKioskStorageService.saveSessionData('telemedloginUserId' , resp.User.id);
                                        HigiKioskStorageService.saveSessionData('qlogin' , resp);

                                        $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));

                                        if (resp.LastCheckin != undefined) {
                                            HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);

                                            if (resp.LastCheckin.gender == "m") {
                                                HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                                            }

                                            if (resp.User.firstName == undefined) {
                                                if (resp.LastCheckin.firstName != undefined) {  // old user can't come inside the user object                                   
                                                    HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.LastCheckin.firstName);
                                                } else {
                                                    HigiKioskStorageService.saveSessionData('telemedUserFirstName', "Gusest User");
                                                }
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                                            }

                                            if (resp.User.lastName != undefined) {  // old user can't have a last name                                  
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.User.lastName);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                                            }

                                            if (resp.LastCheckin.dateOfBirth != undefined) {
                                                var dob = resp.LastCheckin.dateOfBirth.split(" ");
                                                if (dob.length > 1) {
                                                    dob = dob[0].replace(/\//g, '-') + dob[1].replace(/\//g, '-') + dob[2].replace(/\//g, '-') + dob[3].replace(/\//g, '-') + dob[4].replace(/\//g, '-');
                                                    HigiKioskStorageService.saveSessionData('telemedUserDOB', dob);
                                                } else {
                                                    HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.LastCheckin.dateOfBirth.replace(/\//g, '-'));
                                                }
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                                            }

                                            if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', "");
                                            }

                                        } else {
                                            // first time login user
                                            HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);
                                            HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                                            if (resp.User.lastName != undefined) {
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.User.lastName);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                                            }
                                            if (resp.User.dateOfBirth != undefined) {
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.User.dateOfBirth.replace("/", "-"));
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                                            }
                                            if (resp.User.gender != undefined) {
                                                if (resp.User.gender == "m") {
                                                    HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                                                } else {
                                                    HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                                                }
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserGender', "male");  // dummy date provide for telemedi registeration
                                            }

                                            if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', ""); // dummy mobile number provided for telemedi registeration
                                            }

                                        }
                                        // session storage for telemedi registeration flow end
                                        //````````````````````````````````````````````````````````````

                                        //to make telemedicine button available after login
                                        if ($rootScope.telemediSetting) {
                                            $rootScope.telemedicineButtonAvailable = true;
                                            var telemedEmailId = $("#email").val();
                                            HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail', telemedEmailId);
                                        }

                                        HigiKioskStorageService.saveSessionData('sampleText', resp.User.id);
                                        if (resp.ChallengeUserRelation !== undefined) {
                                            HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                                        } else {
                                        }

                                        $rootScope.resetSessionTimeout();
                                        HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);
                                        //  $(".higi_login_btn_profile").show();
                                        $('.higi_top_nav_ng').show();


                                        if(resp.LastCheckin == undefined && $rootScope.kioskWithPaymentMode){
                                            $rootScope.lastCheckinModalShow = true;
                                            $scope.modalHide();
                                        }
                                        

                                    }

                                    if (HigiKioskStorageService.returnSessionData('logged_in')) {
                                        HigiApiService.GetCheckInsAsync(HigiKioskStorageService.returnSessionData('affiliateUserId'), function(data) {
                                          console.log(data);
                                          $rootScope.overAllCheckInData = data;
                                        });
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

                            if (!HigiKioskStorageService.returnSessionData('logged_in')) {
                                var path = $location.path();
                                if (path == "/welcome") {
                                    $rootScope.isVisibleExit = false;
                                    //$rootScope.showExitButton = false;
                                    $rootScope.isVisibleAudio = true;
                                    $rootScope.isVisibleReg = true;
                                }
                                else if (path == "/finish/forward") {
                                    $rootScope.isVisibleExit = true;
                                    $rootScope.isVisibleReg = false;
                                }
                            } else {
                                $rootScope.isVisibleExit = false;
                                $rootScope.isVisibleReg = true;
                                $rootScope.isVisibleAudio = true;
                            }
                        } else {
                            document.getElementById("errorMessageForLoginAccount").style.display = "block";
                        }
                    } else {
                        document.getElementById("errorMessageFinalPageLogin").style.display = "block";
                    }
                };

                

               /* $scope.getPastKioskVitalData = function(resp) {
                    if(resp != null) {
                        if (resp != undefined && resp != null &&  resp.length != 0) {
                            if (resp['LastCheckin'] != undefined && resp['LastCheckin'] != null) {
                              let healthData = resp['LastCheckin'];
                              $scope.filteredVitalData(healthData);
                            }
                          }else{
                            let healthData = [];
                            $scope.filteredVitalData(healthData);
                        }
                    }
                }

                $scope.filteredVitalData = function(lastCheckinVital){
                    $rootScope.pastKioskVitalData = {};
                    let lastCheckin = {};
                    $scope.vitalToShare = {};
                    let vitalToShare = {
                        bmi: '', 
                        bmiClass: '', 
                        dateTime: '', 
                        diastolic: '', 
                        ecgBpm: '', 
                        fatRatio: '', 
                        height: '', 
                        lead2Status: '',
                        pulseBpm: '',
                        spo2: '',
                        systolic: '',
                        temperature: '',
                        weight: ''
                    };
                    console.log(lastCheckinVital);
                    console.log(vitalToShare)
                    for (let key in vitalToShare) {
                      if (key in lastCheckinVital) {
                        if (lastCheckinVital[key] != undefined && lastCheckinVital[key] != null && 
                            lastCheckinVital[key] != NaN && lastCheckinVital[key] != "-" && lastCheckinVital[key] != "") {
                          lastCheckin[key] = lastCheckinVital[key];
                        }
                      }
                    }
                    $rootScope.pastKioskVitalData = lastCheckin;
                    console.log($rootScope.pastKioskVitalData);
                    if(lastCheckinVital['weightKG'] != undefined && lastCheckinVital['weightKG'] != null) $rootScope.userWeightInKg = lastCheckinVital['weightKG'];
                }*/



                $scope.loginModal.showPasswordSection = function () {


                    //Before passowrd section. we should check whether the fingerprint is present or not for that user.
                    //if present fingerprint slide should show. should show password slide ,if not.
                    //check fingerprint present, using api call.

                    // $rootScope.fingerprint_present = true;//temporarily
                    $rootScope.fingerprint_present = false;//temporarily
                    if ($rootScope.fingerprint_present) {
                        //Enters inside if fingerprint present for current user.

                        $rootScope.fingerPrintOrEmailMobile = true;
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                        $scope.loginModal.submitting = false;

                        $scope.loginModal.loginEmailSection = false;
                        $scope.loginModal.loginCreateFingerprintSection = true;
                        $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
                        $scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";


                        $rootScope.second_email_section_async = $timeout(function () {

                            // $scope.loginModal.showEmailSection(true);
                        }, 5000);

                    } else {

                        //Enters inside if fingerprint is not present for current user.
                        //var login_next_btn = document.getElementById("login_password_submit_btn");
                        //login_next_btn.style.top = "114px";

                        //var next_element_for_password = document.getElementById('password').nextElementSibling; //finding next sibling element
                        //next_element_for_password.innerHTML = "";

                        //document.getElementById('password').placeholder = $scope.interfaceLabels[$scope.enterpass];
                        //document.getElementById('password').style.fontSize = "22px";
                        $scope.loginModal.accountVisible = false;

                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                        $scope.loginModal.submitting = false;
                        $scope.loginModal.loginPasswordSection = true;
                        //$scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";
                        //$scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";
                        $scope.loginModal.showPasswordClass = '';
                        $scope.loginModal.fields[1].type = 'password';
                        $scope.loginModal.fields[1].textMaskedDisabled = false;
                        $rootScope.focusField($scope.loginModal.fields[1]);
                        $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);

                        $timeout(function(){
                            $scope.loginModal.forgotVisible = true;
                        },500);
                    }

                };








                //if fingerprint match qlogin will happen otherwise. It will move into regret message..
                //Then we should show email or mobile no login screen
                //temporarily we assume fingerprint is not matching




                //$rootScope.login_fingerprint_match = false;




                //var file = document.getElementById('imgFinger').files[0];
                //append file data       


                /*var imageBmp = document.getElementById('imgFinger');
                               var imageBmp2 = imageBmp.value;
                             ////alert(imageBmp2);
                               console.log(imageBmp2);*/
                //var formData = new FormData();


                //var form = document.createElement('form');
                //form.enctype = "application/x-www-form-urlencoded";

                //FormData object to store all form key/values

                //var file = $("#imgFinger input[type='file']")[0];
                //var file = $('#imgFinger').get(0).files[0];


                //var file = document.getElementById("imgFinger").files[0];

                //console.log(file); 

                //formData.append("image", file);




                /*console.log($("#imagefile").prop('files')[0]);*/
                /*formData.append("image", $('input[type=image]')[0].val());
                console.log($('input[type=image]')[0].val());*/


                /*if($rootScope.login_fingerprint_match){
                    //Enters here if fingerprint match
                  ////alert($rootScope.login_fingerprint_match);

                        $scope.loginModal.loginCreateFingerprintCapturingSection = true;
                        $scope.loginModal.fingerprintRegretSection = false;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-left";
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-right";


                }else{
                  ////alert($rootScope.login_fingerprint_match);
                    $rootScope.finger_regret_msg_async = $timeout(function(){
                      
                        ////alert("fingerprint is not matched");
                        //Enters here if not fingerprint match
                        ////alert("asynchronous call");
                        $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                        $scope.loginModal.fingerprintRegretSection = true;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                                    
                    }, 5000);
                    
                  $rootScope.show_email_section_async =  $timeout(function(){
                        $scope.loginModal.fingerprintRegretSection = false;
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-left-custom";
                        ////alert(i);
                        i++;
                         $rootScope.fingerPrintOrEmailMobile = false;
                         $scope.loginModal.showEmailSection(true);
                     }, 10000);

                }*/

                //};

                function dataURItoBlob(dataURI) {
                    ////alert('before loop');
                    var byteString = atob(dataURI.split(',')[1]);

                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    ////alert("after loop");
                    var bb = new Blob([ab], { "type": mimeString });
                    return bb;
                }


                document.getElementById("getTheseHands").onclick = function () {
                    // //alert("here comes");
                    // //document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                    // document.getElementById("togglePass").style.display = "none";
                    // document.getElementById("toggleSkip").style.display = "block";
                    // $timeout(function(){
                    //     //alert("inside timeout");
                    //     document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                    //     $scope.loginModal.loginCreateFingerprintCapturingSection = true;
                    //     $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-right";
                    //     $scope.loginModal.loginCreateFingerprintSection = false;
                    //     $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
                    //     //document.getElementById("fingerprint_animation_fornow").style.display = "block";
                    //     //loginCreateFingerprintCapturingSection
                    // }, 3000);

                }
                $scope.modelCloseBtnShowHide = function (action) {
                    if (action == "show") {
                        $(".keyboard_class_close_btn").show();
                    } else if (action == "hide") {
                        $scope.loginClosed = true;
                        $(".keyboard_class_close_btn").hide();
                    } else {
                        console.log("action is not getting correctly = " + action);
                    }
                }
                // finger print image capture start deepak
                $scope.fingerprintCaptureRes = function (response) {
                    console.log("fingerprint response for image capture detect");
                    console.log(response.fingerprintImageBase64);
                    // If Fingerprint is not recognized by the Reader, Device responds with "READ_ERROR"
                    if ($scope.loginClosed == false && response.fingerprintImageBase64 == "READ_ERROR" || response.fingerprintImageBase64 == null) {
                        // Move to email and password slide. 
                        console.log(response.fingerprintImageBase64);
                        $scope.modelCloseBtnShowHide("show");
                        $("#fpWarning").show();
                        $rootScope.fpWarningTxt = "welcomeModals.loginFingerprintNotRecognized";     

                        setTimeout(function(){
                            $("#fpWarning").hide();   
                            $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                            $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                            $scope.loginModal.clearAllLoginScreens();    
                            $scope.loginModal.showEmailSection();  
                            setTimeout(function(){
                                $scope.loginModal.quickLoginOptionSelected();
                            }, 1000 * 1);                                    
                        }, 1000 * 10);

                        // show error info modal box and redirect to login modal box with quick login options
                        
                        

                        /*$scope.loginFingerprintError = "global.loginFingerprintNotRecognized";
                        $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        document.getElementById("fingerprint_not_matched_regret_message").style.display = "block";
                        if (document.getElementById("getTheseHands")) {
                            //  document.getElementById("getTheseHands").style.display = "none";
                        }
                        $scope.loginModal.fingerprintRegretSection = true;
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                        setTimeout(function () {
                            $scope.modelCloseBtnShowHide("show");
                        }, 2000);*/
                        /* If Application does not recognize Fingerprint Reader, Device responds with "DEVICE_ERROR 
                        and for initialization error device responds with "DEVICE_INIT_ERROR" */
                    } else if ($scope.loginClosed == false && response.fingerprintImageBase64 == "DEVICE_ERROR" || response.fingerprintImageBase64 == "DEVICE_INIT_ERROR") {
                        console.log(response.fingerprintImageBase64);
                        
                        $scope.modelCloseBtnShowHide("show");
                        $("#fpWarning").show();
                        $rootScope.fpWarningTxt = "welcomeModals.fingerprintNotConnected";     

                        setTimeout(function(){
                            $("#fpWarning").hide();   
                            $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                            $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                            $scope.loginModal.clearAllLoginScreens();    
                            $scope.loginModal.showEmailSection();                                    
                        }, 1000 * 10);

                        /*$scope.loginFingerprintError = "global.fingerprintNotConnected";
                        $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        document.getElementById("fingerprint_not_matched_regret_message").style.display = "block";
                        $scope.loginModal.fingerprintRegretSection = true;
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                        $scope.modelCloseBtnShowHide("show");*/
                        // Move to email and password slide. 
                    } else {
                        // if image is found call the login api 
                        var myFinalOutput = document.getElementById("myFinalOutput");
                        myFinalOutput.setAttribute('src', "data:image/jpg;base64," + response.fingerprintImageBase64);

                        var finaloutputimage2 = "data:image/jpg;base64," + response.fingerprintImageBase64;

                        var formData = new FormData();
                        formData.append("challengeId", "4010");
                        formData.append("joinCode", "j93ia");
                        formData.append("ttl", "");
                        formData.append("machine_org", $rootScope.uniqueKioskId.split('-')[1]);

                        var imageObj = new Image();
                        var canvass = document.getElementById('myFinalOutput');
                        imageObj.id = "pic";
                        imageObj.src = canvass.toDataURL();
                        document.getElementById('finalImage').appendChild(imageObj);

                        var blob = dataURItoBlob(finaloutputimage2);
                        formData.append("image", blob);
                        console.log(formData);
                        if(window.navigator.onLine){
                            $.ajax({
                                url: getSettingsValue('kiosk.api.url') + "/login/qloginForOnlyImage",
                                type: "POST",
                                cache: false,
                                data: formData,
                                processData: false,
                                contentType: false,
                                async: false,
                                contentType: 'application/json; charset=UTF-8',
                                dataType: 'json',
                                headers: {
                                    'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="
                                },
                                success: function (html) {
                                    console.log(html);
                                    var resp = html;
                                    $rootScope.thisIsAjaxOp = html;
                                    if ($rootScope.thisIsAjaxOp == null) {

                                        $scope.modelCloseBtnShowHide("show");
                                        $("#fpWarning").show();
                                        $rootScope.fpWarningTxt = "welcomeModals.loginFingerprintNotRecognized";     

                                        setTimeout(function(){
                                            $("#fpWarning").hide();   
                                            $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                                            $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                                            $scope.loginModal.clearAllLoginScreens();    
                                            $scope.loginModal.showEmailSection();  
                                            setTimeout(function(){
                                                $scope.loginModal.quickLoginOptionSelected();
                                            }, 1000 * 1);                                    
                                        }, 1000 * 10);
                                        /*$rootScope.finger_regret_msg_async = $timeout(function () {
                                            alert("fingerprint is not matched");
                                            $scope.loginFingerprintError = "global.loginFingerprintNotRecognized";
                                            $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                                            $scope.loginModal.fingerprintRegretSection = true;
                                            $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                                            $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                                            document.getElementById("fingerprint_not_matched_regret_message").style.display = "block";
                                            //Exit button disappears if Login in Final result page with unregistered FP starts
                                            var path = $location.path();
                                            if (path == "/finish/forward") {
                                                $rootScope.isVisibleExit = true;
                                                $rootScope.showExitButton = true;
                                            }
                                            $scope.modelCloseBtnShowHide("show");
                                            //Exit button disappears if Login in Final result page with unregistered FP ends

                                        }, 5000);
                                        $rootScope.show_email_section_async = $timeout(function () {
                                           // $scope.loginModal.fingerprintRegretSection = false;
                                           // $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-left-custom";
                                            $rootScope.fingerPrintOrEmailMobile = false;
                                            // $scope.loginModal.showEmailSection(true);
                                        }, 10000);*/
                                    }
                                    else {
                                        //alert("Response is not null");
                                        HigiKioskStorageService.saveSessionData('sampleText', resp.User.id);
                                         var affiliateUserId = resp.User.id;
                                        HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                                        var loginResp = resp;
                                        HigiKioskStorageService.saveSessionData('loginResp', loginResp);
                                        var callback = $rootScope.saveCheckinFinalResultsLogin;
                                        $scope.loginModal.watch();
                                        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('logged_in'));
                                        $rootScope.isVisibleExit = false;
                                        $rootScope.isVisibleReg = true;
                                        $rootScope.isVisibleAudio = true;
                                        HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);
                                        $rootScope.keyboardHide();

                                        if(resp.LastCheckin == undefined && $rootScope.kioskWithPaymentMode){
                                            $rootScope.lastCheckinModalShow = true;
                                            $scope.modalHide();
                                        }
                                        
                                        if ($rootScope.telemediSetting) {
                                            $rootScope.telemedicineButtonAvailable = true;
                                            var telemedEmailId = $("#email").val();
                                            HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail', telemedEmailId);
                                           
                                           //for telemedicine agreement enabling and disabling.(search with this comment line)
                                            var telemediagreementresponse = null;
                                            var isTeleMedUser = null;
                                            var teleMedVendorName = null;
                                            
                                            if(resp.User.privacyAgreed.isTeleMedPolicyAgreed != undefined){
                                                telemediagreementresponse = resp.User.privacyAgreed.isTeleMedPolicyAgreed;
                                            }

                                            if(resp.User.privacyAgreed.isTeleMedUser != undefined){
                                                isTeleMedUser = resp.User.privacyAgreed.isTeleMedUser;
                                            }

                                            if(resp.User.privacyAgreed.teleMedVendorName != undefined){
                                                teleMedVendorName = resp.User.privacyAgreed.teleMedVendorName;
                                            }
                                            
                                            HigiKioskStorageService.saveSessionData('telemediAgreementResponse' , telemediagreementresponse);                          
                                            HigiKioskStorageService.saveSessionData('isTeleMedUser' , isTeleMedUser);                          
                                            HigiKioskStorageService.saveSessionData('teleMedVendorName' , teleMedVendorName);                          



                                        // session storage for telemedi registeration flow start
                                        //````````````````````````````````````````````````````````````
                                        HigiKioskStorageService.saveSessionData('telemedloginUserId' , resp.User.id);
                                        HigiKioskStorageService.saveSessionData('qlogin' , resp);
                                        $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
                                        $rootScope.UserToken = resp.Token;
                                        $rootScope.ApiToken = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";

                                        if(resp.LastCheckin != undefined){
                                            HigiKioskStorageService.saveSessionData('telemedUserEmail' , resp.User.email);

                                            if(resp.LastCheckin.gender == "m"){                                     
                                                HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                                            }


                                            if(resp.User.firstName == undefined){
                                                if(resp.LastCheckin.firstName != undefined){  // old user can't come inside the user object                                   
                                                    HigiKioskStorageService.saveSessionData('telemedUserFirstName' , resp.LastCheckin.firstName);
                                                } else {
                                                    HigiKioskStorageService.saveSessionData('telemedUserFirstName' , "Gusest User");
                                                }                                     
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserFirstName' , resp.User.firstName);
                                            }

                                            if(resp.User.lastName != undefined){  // old user can't have a last name                                  
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , resp.User.lastName);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , "null");
                                            }                              
                                                                     
                                            
                                            if(resp.LastCheckin.dateOfBirth != undefined){
                                                var dob = resp.LastCheckin.dateOfBirth.split(" ");
                                                if(dob.length > 1){
                                                   dob =  dob[0].replace(/\//g, '-')+dob[1].replace(/\//g, '-')+dob[2].replace(/\//g, '-')+dob[3].replace(/\//g, '-')+dob[4].replace(/\//g, '-');
                                                   HigiKioskStorageService.saveSessionData('telemedUserDOB' , dob);
                                                } else {
                                                   HigiKioskStorageService.saveSessionData('telemedUserDOB' , resp.LastCheckin.dateOfBirth.replace(/\//g, '-'));                                    
                                                }
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                                            }    
                                            
                                            if(resp.User.mobileNumber != undefined){  // mobile number is optional for ihl registeration flow             
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , resp.User.mobileNumber);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , "");
                                            }
                                            
                                        } else {
                                            // first time login user
                                            HigiKioskStorageService.saveSessionData('telemedUserEmail' , resp.User.email);
                                            HigiKioskStorageService.saveSessionData('telemedUserFirstName' , resp.User.firstName);
                                            if(resp.User.lastName != undefined){                                    
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , resp.User.lastName);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , "null");
                                            }
                                            if(resp.User.dateOfBirth != undefined){
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB' , resp.User.dateOfBirth.replace("/", "-"));
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                                            }    
                                            if(resp.User.gender != undefined){
                                                if(resp.User.gender == "m"){                                     
                                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                                                } else {
                                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                                                }
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");  // dummy date provide for telemedi registeration
                                            }

                                            if(resp.User.mobileNumber != undefined && resp.User.mobileNumber != ""){  // mobile number is optional for ihl registeration flow             
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , resp.User.mobileNumber);
                                            } else {
                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , ""); // dummy mobile number provided for telemedi registeration
                                            }                            
                                        }

                                        if($rootScope.telemediSetting) {
                                            $rootScope.telemedicineButtonAvailable = true;
                                            var telemedEmailId = $("#email").val();
                                            HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail' , telemedEmailId);
                                        }
                                        // session storage for telemedi registeration flow end
                                        //````````````````````````````````````````````````````````````

                                        }

                                        $scope.getPastKioskVitalData(resp);
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.log("qloginForOnlyImage   " + error);
                                    $scope.modelCloseBtnShowHide("show");

                                }
                            });
                        } else {
                            // show worning text to user
                            $scope.modelCloseBtnShowHide("show");
                            $("#fpWarning").show();
                            $rootScope.fpWarningTxt = "welcomeModals.kiosk_offline";     

                            setTimeout(function(){
                                $("#fpWarning").hide();   
                                $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                                $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                                $scope.loginModal.clearAllLoginScreens();    
                                $scope.loginModal.showEmailSection();                                    
                            }, 1000 * 10);
                        }                        
                    }
                };

                $scope.Capture = function (quality, timeout) {
                    document.getElementById('myFinalOutput').src = "data:image/bmp;base64,";
                    $scope.loginModal.loginCreateFingerprintSection = false;
                    $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";

                    document.getElementById("fingerprint_animation_fornow").style.display = "block";
                    document.getElementById("fingerprint_capturing_animation_section").style.display = "block";

                    $scope.loginModal.loginCreateFingerprintCapturingSection = true;
                    $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-right";

                    /*jkiosk.getKioskConfiguration(function (resp) {
                        HigiKioskStorageService.saveSessionData('kioskConfigurationResult', resp);
                        console.log(resp.city);
                    });*/
                    $scope.loginClosed = false;
                    if ($rootScope.hardwareAvailability['Fingerprint']) {
                        JkioskService.fingerprintCapture($scope.fingerprintCaptureRes); // fingerprint image capturing
                    } else {
                        if ($scope.loginClosed == false) {

                            console.log("fingerprint not detected");
                            $scope.modelCloseBtnShowHide("show");
                            $scope.loginFingerprintError = "welcomeModals.fingerprintNotConnected";
                            $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                            $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                            document.getElementById("fingerprint_not_matched_regret_message").style.display = "block";
                            $scope.loginModal.fingerprintRegretSection = true;
                            $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                        }
                    }
                }
                // finger print image capture end deepak         


                /*  $scope.Capture = function(quality,timeout)
                  {
       
                   //alert("insidfe capture");
       
                       try {
                       //document.getElementById('txtStatus').value = "";
                       document.getElementById('myFinalOutput').src = "data:image/bmp;base64,";
                       
                       //document.getElementById('txtIsoTemplate').value = "";
       
                       var res = CaptureFinger(quality, timeout);
                       res.httpStaus = true;
                       //res.data.ErrorCode = "0";
                       //alert("line no 816"+res);
                       console.log(res);
                       //$('#weight_instruction_seat_frames_new').destroy();
                       $scope.loginModal.loginCreateFingerprintSection = false;
                       $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
                      
                           
                           document.getElementById("fingerprint_animation_fornow").style.display = "block";
                           document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                           
                           $scope.loginModal.loginCreateFingerprintCapturingSection = true;
                           $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-right";
                           //alert("finished scanning");
                           
                           
       
                     
                       if (res.httpStaus) {
       
                           //document.getElementById('txtStatus').value = "ErrorCode: " + res.data.ErrorCode + " ErrorDescription: " + res.data.ErrorDescription;
                           jkiosk.getKioskConfiguration(function(resp){
                           HigiKioskStorageService.saveSessionData('kioskConfigurationResult', resp);
                           ////alert(HigiKioskStorageService.returnSessionData('kioskConfigurationResult'));
                           ////alert(resp);
                           console.log(resp.city);
                           //console.log(res.data.ErrorCode);
                           });
                           
                           if (res.data.ErrorCode == "0") {
       
                               document.getElementById('myFinalOutput').src = "data:image/bmp;base64," + res.data.BitmapData;
                               var imageinfo = "Quality: " + res.data.Quality + " Nfiq: " + res.data.Nfiq + " W(in): " + res.data.InWidth + " H(in): " + res.data.InHeight + " area(in): " + res.data.InArea + " Resolution: " + res.data.Resolution + " GrayScale: " + res.data.GrayScale + " Bpp: " + res.data.Bpp + " WSQCompressRatio: " + res.data.WSQCompressRatio + " WSQInfo: " + res.data.WSQInfo;
                              
                               //alert("ISO Template" + res.data.IsoTemplate);
                               console.log("ISO Template: " + res.data.IsoTemplate);
                               //alert(res.data.BitmapData);
                               var myFinalOutput = document.getElementById("myFinalOutput");
                               myFinalOutput.setAttribute('src', "data:image/jpg;base64," + res.data.BitmapData);
                               //console.log("data:image/jpg;base64," + res.data.BitmapData);
                               var finaloutputimage2 = "data:image/jpg;base64," + res.data.BitmapData;
                               //document.getElementById('txtIsoTemplate').value = res.data.IsoTemplate;
       
                               
                               var formData = new FormData();
                                 formData.append("challengeId", "4010");
                                 formData.append("joinCode", "j93ia");
                                 formData.append("ttl", "");
       
                                 var imageObj = new Image();
                                   var canvass = document.getElementById('myFinalOutput');
                                   imageObj.id = "pic";
                                   imageObj.src = canvass.toDataURL();
                                   document.getElementById('finalImage').appendChild(imageObj);
                                 
                               var blob = dataURItoBlob(finaloutputimage2);
                                 formData.append("image", blob);
                                 
                                 $.ajax({
                                   url: "https://azureapi.indiahealthlink.com/login/qloginForOnlyImage",
                                   type : "POST", 
                                   cache: false,
                                   data:formData,
                               processData:false,
                               contentType: false,
                               async: false,
                                    contentType: 'application/json; charset=UTF-8',  
                                    dataType: 'json',
                                 headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
                                   success: function(html){
                                    //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                                    console.log(html);
                                    var resp = html;
                                    //alert("here you go " + resp.User.id);
                                    HigiKioskStorageService.saveSessionData('sampleText', resp.User.id);
                                    var callback = $rootScope.saveCheckinFinalResultsLogin;
                                    $rootScope.thisIsAjaxOp = html;
                                    $scope.loginModal.watch();
                                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('logged_in'));
                                    $rootScope.isVisibleExit = false;
                           $rootScope.isVisibleReg = true;
                           $rootScope.isVisibleAudio = false;
                           HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);
                                   
                                 },
                                 error : function(xhr, status, error) { 
                                       ////alert('failures 3'+xhr.responseText);
       
       
                                    } 
                               });
                       }
                        else{
                           //alert("we cant find your finger");
                           //$rootScope.isVisibleExit = true;
                           //alert($rootScope.isVisibleExit);
                           //.style.setProperty("background-color", "red", "important");
                           if (window.location.hash == "#/welcome") {
                               //alert("you are in welcome page");
                               document.getElementById("exitButtonOnTheTop").style.setProperty("display", "none", "important");
                           }
                           else{
                               //alert("you are in final result page");
                               document.getElementById("higi_keyboard_close_btn").style.display="none";
                               //document.getElementById("exitButtonOnTheTop").style.setProperty("display", "inline-block", "important");
                           }
                       }
                   }
                       else {
                           //alert(res.err);
                           console.log(res.err);
                       }            
                   }
                   catch (e) {
                       ////alert(e);
                   }
                   return false;
       
                  }; */

                // $scope.testingFunction = function()
                // {
                //  console.log("inside testingFunction");
                //      //document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                //      var quality = 60; //(1 to 100) (recommanded minimum 55)
                //      var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
                //      var i = 1; 
                //      $scope.modelCloseBtnShowHide("hide");

                //      $scope.Capture(quality,timeout);
                //      //alert("line 549 " + $rootScope.thisIsAjaxOp);
                //      ////alert($scope.loginModal.fields[1].text);

                //  };
                $scope.proceedFingerPrintLogin = function () {
                    if (!$rootScope.hardwareAvailability['Fingerprint']) {
                      return;
                    } 
                    document.getElementById('fingerprintLogin').disabled = 'disabled';
                    setTimeout(function () {
                        document.getElementById('fingerprintLogin').disabled = '';
                    }, 5000);
                    console.log("inside proceedFingerPrintLogin");
                    $scope.loginModal.selectLogin = false;
                    //hiding close icon to prevent user to close the screen 
                    $scope.modelCloseBtnShowHide("hide");
                    if ($rootScope.fingerPrintOrEmailMobile) {
                        //alert("you getting here?");
                        $rootScope.keyboardHide();
                        //document.getElementById("keyboard").style.display = "none";
                        //alert("show fingerprint section");
                        $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        $scope.loginModal.EmailAndPasswordDivisionClass = "modal-slide-out-left";
                        $scope.loginModal.loginEmailSection = false;
                        $scope.loginModal.quickOptionButton = false;
                        $scope.loginModal.quickLoginOptions = false;
                        $scope.loginModal.accountVisible = false;
                        $scope.loginModal.forgotVisible = false;
                        $scope.loginModal.submitting = false;
                        //document.getElementById("fingerprint_section_login_today").style.display = "block";
                        //document.getElementById("keyboardbox").style.display = "none";
                        $scope.loginModal.fingerprintRegretSection = false;
                        $scope.loginModal.fingerprintRegretSectionClass = "";
                        $scope.loginModal.loginCreateFingerprintSection = true;
                        $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
                        document.getElementById("fingerprint_section_login").style.display = "block";
                        //document.getElementById("login_username_error_newest3").style.display = "none";
                        var quality = 60; //(1 to 100) (recommanded minimum 55)
                        var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
                        var i = 1;
                        setTimeout(function () {
                            $scope.Capture(quality, timeout);
                        }, 3000);
                    }
                };


                $scope.skipFingerprint = function () {
                    ////alert("skip fingerprint");
                    functionCall = false;
                    $timeout.cancel($rootScope.fingerprint_capturing_async);
                    $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
                    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                    document.getElementById("fingerprint_animation_fornow").style.display = "none";
                    $scope.loginModal.loginCreateFingerprintSection = false;
                    $rootScope.fingerPrintOrEmailMobile = false;
                    $scope.loginModal.showEmailSection(true);
                    //document.getElementById("weight_instruction_seat_frames_new").style.display = "none";
                    document.getElementById("toggleSkip").style.display = "block";
                };
                $scope.enterPassword = function () {

                    //var login_next_btn = document.getElementById("login_password_submit_btn");
                    //login_next_btn.style.top = "114px";
                    functionCall = false;
                    $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
                    $scope.loginModal.loginCreateFingerprintSection = false;
                    $rootScope.fingerPrintOrEmailMobile = false;
                    $scope.loginModal.showPasswordSection();
                    /*$scope.loginModal.loginPasswordSection = true;
                    $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-right";*/

                    document.getElementById("togglePass").style.display = "block";



                };

                $scope.loginModal.showEmailSection = function (defaulting) {
                    $scope.loginModal.selectLogin = false;
                    var path = $location.path();
                    if (path == "/finish/forward") {
                        document.getElementById("higi_keyboard_close_btn").style.display = "block";
                        $rootScope.isVisibleExit = true;
                        $rootScope.isVisibleReg = false;
                    }

                    // if($rootScope.fingerPrintOrEmailMobile)
                    // {
                    //    //alert("show fingerprint section");
                    //    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    //    $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                    //    $scope.loginModal.loginEmailSection = false;
                    //    $scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";
                    //    $scope.loginModal.submitting = false;
                    //    document.getElementById("fingerprint_section_login").style.display = "block";
                    //    document.getElementById("keyboardbox").style.display = "none";
                    //    $scope.loginModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
                    //    $scope.loginModal.loginCreateFingerprintSection = true; 
                    //    $scope.loginModal.fingerprintRegretSection = false;
                    //    $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-left";   


                    //    // $rootScope.fingerprint_capturing_async =  $timeout(function(){
                    //    //      $scope.testingFunction();

                    //    //              }, 5000);

                    // }else{
                    //alert("show email and password section");
                    document.getElementById("keyboardbox").style.display = "block";
                    $scope.loginModal.loginPasswordSectionClass = "modal-slide-out-right";
                    $scope.loginModal.loginEmailSectionClass = (defaulting) ? "" : "modal-slide-in-left";
                    $scope.loginModal.submitting = false;
                    $rootScope.first_email_section_async = $timeout(function () {
                        $scope.loginModal.loginPasswordSection = false;
                    }, 500);
                    $scope.loginModal.loginEmailSection = true;
                    $scope.loginModal.EmailAndPasswordDivisionClass = 'modal-slide-in-left';
                    $rootScope.focusField($scope.loginModal.fields[0]);
                    $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                    $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});
                    $scope.loginModal.emailOrMobileOrAadhaarPatternCheck($scope.loginModal.fields[0]);
                    //Initialize password incase repeating flow (via back button)
                    $scope.loginModal.fields[1].text = '';
                    document.getElementById($scope.loginModal.fields[1].id).value = $scope.loginModal.fields[1].text;
                    $scope.loginModal.fields[1].textMasked = '';
                    //alert($scope.loginModal.fields[1].text);
                    $timeout(function(){
                        $scope.loginModal.accountVisible = true;
                        $scope.loginModal.quickOptionButton = true;
                    },1000);
                };
                //Register loginModal's initial screen on $rootScope for toggling back
                //from password reset and registration modals
                $rootScope.loginModalInitScreen = $scope.loginModal.showEmailSection;
                $scope.loginModal.backToEmailSection = function () {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_backButton', 'button', 'pressed');
                    $scope.loginModal.showEmailSection();
                };
                $scope.loginModal.showRegistrationModal = function () {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_iNeedAnAccountButton', 'button', 'pressed');
                    $rootScope.fields.register[0].text = $rootScope.targetFieldSet[0].text;
                    $rootScope.loadModal($scope.loginModal.loginMode);
                    $rootScope.registerModalInitScreen(true);
                };

                $scope.loginModal.quickLoginOptionSelected = function(){
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $timeout(function(){
                        $rootScope.keyboardHide();
                        $scope.loginModal.quickLoginOptions = true;
                    },600);
                }

                $scope.loginModal.disableQuickLoginOptionSection = function(id , section){
                    if ($scope.loginModal.quickLoginOptions == true) {
                        if(document.getElementById(id).style.pointerEvents !== "none"){
                            $scope.loginModal.quickLoginOptions = false;
                            //$rootScope.keyboardShow();
                            if (section == 'login_modal_userId_section') {
                                $rootScope.focusField($scope.loginModal.fields[0]);
                                $scope.loginModal.accountVisible = true;
                                $scope.loginModal.quickOptionButton = true;
                                $scope.loginModal.forgotVisible = false;
                            }else if(section == 'login_modal_passwrd_section'){
                                $rootScope.focusField($scope.loginModal.fields[1]);
                                $scope.loginModal.forgotVisible = true;
                                $scope.loginModal.quickOptionButton = true;
                                $scope.loginModal.accountVisible = false;
                            }
                        }
                    }else if ($scope.loginModal.quickLoginOptions == false) {
                        if (section == 'login_modal_userId_section') {
                            $rootScope.focusField($scope.loginModal.fields[0]);
                            $scope.loginModal.forgotVisible = false;
                            $scope.loginModal.quickOptionButton = true;
                            $timeout(function(){
                                $scope.loginModal.accountVisible = true;
                            },600);
                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                            $("#login_password").css({'border': '2px solid gray' , 'pointer-events' : 'none'});
                            $scope.loginModal.loginBtnActive = '';
                        }else if(section == 'login_modal_passwrd_section'){
                            $rootScope.focusField($scope.loginModal.fields[1]);
                            $scope.loginModal.accountVisible = false;
                            $scope.loginModal.quickOptionButton = true;
                            $timeout(function(){
                                $scope.loginModal.forgotVisible = true;
                            },600);
                            $("#login_password").css({'border': '2px solid gray' , 'pointer-events' : 'auto'});
                            $("#login_password").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                        }
                    }
                }

                $scope.loginModal.createNewIHLAccount = function(field){
                    $rootScope.registerModalInit(); //trigger the placeholder json file 
                    console.log(field);
                    var str = field.text;
                    var emailOrMobileExist = "";
                    document.getElementById("login_username_loading_new").style.display = "block";
                    if(HigiKioskUtilitiesService.isValidEmailAddress(field) || ($scope.loginModal.fields[0].text.length == 10 && !isNaN(str)) || ($scope.loginModal.fields[0].text.length == 12 && !isNaN(str))){
                        
                        var emailIsThis = "";
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";

                        if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                            emailIsThis = $scope.loginModal.fields[0].text;
                        } else if($scope.loginModal.fields[0].text.length == 10 && !isNaN(str)){
                            mobileIsThis = $scope.loginModal.fields[0].text;
                        } else if($scope.loginModal.fields[0].text.length == 12 && !isNaN(str)){
                            aadhaarIsThis = $scope.loginModal.fields[0].text;
                        }

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
                                    url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type : "GET", 
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',  
                                    headers:{"ApiToken":token},
                                    success: function(html){
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                        if(finalString == "Email ID already exists"){
                                            document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.emailalreadyexist'];
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'100px','font-size':'16px'});
                                        } else if(finalString == "Mobile Number already exists"){
                                            document.getElementById("login_username_error_newest3").innerHTML = "Mobile number already exists";
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'120px','font-size':'16px'});
                                        } else if(finalString == "Aadhaar number already exists"){
                                            document.getElementById("login_username_error_newest3").innerHTML = "Aadhar number already exists";
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'120px','font-size':'16px'});
                                        }
                                        else if(finalString == ""){
                                            //alert(accepted);
                                            document.getElementById("login_username_error_newest3").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $rootScope.newAccountEmailID = $scope.loginModal.fields[0].text;
                                            $scope.loginModal.quickOptionButton = false;
                                            $scope.loginModal.quickLoginOptions = false;
                                            $scope.loginModal.accountVisible = false;
                                            $scope.loginModal.forgotVisible = false;
                                            $scope.loginModal.EmailAndPasswordDivisionClass = 'modal-slide-out-right';
                                            $scope.loginModal.loginEmailSection = false;
                                            // $rootScope.keyboardHide();
                                            //$timeout(function(){
                                                if(emailIsThis != ""){
                                                    $rootScope.registerFlowFirstInput = "email";
                                                    $rootScope.loadModal({ id: 'register' });
                                                } else if(mobileIsThis != ""){
                                                    $rootScope.registerFlowFirstInput = "mobile";

                                                    var mobileNumber = mobileIsThis;
                                                    var encodeNum = new JSEncrypt();

                                                    HigiApiService.encodeAbhaText(
                                                        function(res){
                                                            console.log(res);
                                                            $scope.publicKey = res;
                                                            encodeNum.setPublicKey($scope.publicKey);
                                                            var inputMobile = encodeNum.encrypt(mobileNumber);
                                                            console.log(inputMobile);

                                                            // Send otp to the current mobile number API

                                                            let data = {
                                                                "method": "mobileEmailLoginOtp",
                                                                "data": {
                                                                    "input" : inputMobile
                                                                }
                                                            };

                                                            HigiApiService.getABHASession(data, function(response){
                                                                var data = JSON.parse(response);
                                                                console.log(JSON.parse(data.res));

                                                                if(data.status == 'S'){
                                                                    let mobileValidRes = JSON.parse(data.res);

                                                                    if(mobileValidRes.transactionId != undefined){
                                                                        $rootScope.otpFromMobileAadhar = 'mobileOtp';
                                                                        $rootScope.mobileRegFromLogIn = true;
                                                                        $rootScope.tranIdFromMobLogin = mobileValidRes.transactionId;
                                                                        $rootScope.loadModal({ id: 'register' });
                                                                    }else{
                                                                        $rootScope.loadModal({ id: 'register' });    
                                                                    }
                                                                }else{
                                                                    $rootScope.loadModal({ id: 'register' });
                                                                }
                                                            },
                                                            function (err){
                                                                // error handle
                                                            }
                                                            );
                                                        },
                                                        function (err){
                                                            // error handle
                                                        }
                                                    );

                                                } else if(aadhaarIsThis != ""){
                                                    $rootScope.registerFlowFirstInput = "aadhar";

                                                    var aadharNumber = aadhaarIsThis;
                                                    var encodeNum = new JSEncrypt();

                                                        // Send otp to the current mobile number API

                                                        let data = {
                                                            "method": "generateAadharOtp",
                                                            "data": {
                                                                "aadhaar" : aadharNumber
                                                            }
                                                        };

                                                        HigiApiService.getABHASession(data, function(response){
                                                            var data = JSON.parse(response);
                                                            console.log(JSON.parse(data.res));

                                                            if(data.status == 'S'){
                                                                let aadharValidRes = JSON.parse(data.res);

                                                                if(aadharValidRes.txnId != undefined){
                                                                    $rootScope.otpFromMobileAadhar = 'aadharOtp';
                                                                    $rootScope.aadharRegFromLogIn = true;
                                                                    $rootScope.txdIdFromAadharLogin = aadharValidRes.txnId;
                                                                    $rootScope.loadModal({ id: 'register' });
                                                                }else{
                                                                    // $rootScope.loadModal({ id: 'register' });
                                                                    $("#login_username_went_wrong").css({'top':'-11px','left':'410px','width':'117px','font-size':'13px'});
                                                                    document.getElementById("login_username_went_wrong").innerHTML = 'Something went wrong';
                                                                }
                                                            }else{
                                                                // $rootScope.loadModal({ id: 'register' });
                                                                $("#login_username_went_wrong").css({'top':'-11px','left':'410px','width':'117px','font-size':'13px'});
                                                                document.getElementById("login_username_went_wrong").innerHTML = 'Something went wrong';
                                                            }
                                                        },
                                                        function (err){
                                                            // error handle
                                                            $("#login_username_went_wrong").css({'top':'-11px','left':'410px','width':'117px','font-size':'13px'});
                                                            document.getElementById("login_username_went_wrong").innerHTML = 'Something went wrong';
                                                        }
                                                    );
                                                }
                                            //},300);
                                            
                                            //alert($rootScope.newAccountEmailID);
                                        }
                                    },
                                    error : function(xhr, status, error) { 
                                        console.log('failures 3'+xhr.responseText);
                                    } 
                                });
                            }
                        });     
                    } else {
                        document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['global.invalidregdemailformat'];
                        document.getElementById("login_username_loading_new").style.display = "none";
                        document.getElementById("register-first-screen-text").innerHTML = "";
                        $("#login_username_error_newest3").css({'top':'0px','left':'380px','width':'150px','font-size':'16px'});
                    }  
                };

                $scope.loginModal.guestUserLogin = function(){
                    if ($rootScope.IHLTeleConsultSelected == true) {
                        return;
                    }
                    $scope.loginModal.loginEmailSection = false;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $rootScope.loadModal({ id: 'guestUserFlow' });
                }

                $scope.loginModal.clearAllLoginScreens = function(){
                    $scope.loginModal.loginEmailSection = false;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    $scope.loginModal.loginCreateFingerprintSection = false;
                    $scope.loginModal.fingerprintRegretSection = false;
                    if ($("#myFinalOutput")) {
                        $("#myFinalOutput").css('display','none');
                    }
                    if ($("#finalImage")) {
                        $("#finalImage").css('display','none');
                    }  
                }

                $scope.loginModal.init();
            }

            else {


                $scope.loginModal = new Object();
                $scope.loginModal.watch = $scope.$watch('modalVisible', function (newVal, oldVal) {
                    if (newVal == false) {
                        $scope.loginModal.init();
                    }
                });
                $scope.loginModal.labelWatch = $rootScope.$watch('interfaceLabels', function (newVal, oldVal) {
                    $scope.loginModal.init();
                });

                $scope.loginModal.init = function () {
                    //Set localization fields
                    $scope.loginModal.loginEmailSectionClass = "";
                    /*$scope.loginModal.loginTitle = "login.to.your.account";
                    $scope.loginModal.loginTitleEmail = "login.enter.your.email.or.mobile";
                    $scope.loginModal.loginEmailAddress = "login.email.address";
                    $scope.loginModal.loginEmailAddressError = "auth.failure.account.not.exist";
                    $scope.loginModal.loginCreateAccount = "login.create.a.new.account";*/
                    $scope.loginModal.globalNext = "global.next";
                   /* $scope.loginModal.loginPassword = "login.enter.your.password";
                    $scope.loginModal.loginPasswordNote = "login.min.6";
                    $scope.loginModal.loginEnterPassword = "login.enter.a.password";
                    $scope.loginModal.loginShowPassword = "login.show.password";
                    $scope.loginModal.loginForgotPassword = "login.forgot.password";*/
                    $scope.loginModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                    $scope.loginModal.loginServerError = "welcomeModals.server.failure";
                    $scope.loginModal.globalLogin = "welcomeModals.login";
                    $scope.loginModal.globalBack = "global.back";
                    $scope.loginModal.nextBtnActive = '';
                    $scope.loginModal.loginBtnActive = '';
                    $scope.loginModal.loginUsernameError = false;
                    $scope.loginModal.loginMode = { id: 'register' };
                    $scope.loginModal.submitting = false;
                    $scope.loginModal.loginUsernameError = false;
                    $scope.loginModal.loginPasswordError = false;
                    $scope.loginModal.loginServerErrorVisible = false;
                    $scope.loginModal.loginPasswordSectionClass = "";
                    $scope.loginModal.loginEmailSectionClass = "";
                    $scope.loginModal.loginPasswordSection = false;
                    $scope.loginModal.fingerprintRegretSectionClass = "";
                    $scope.loginModal.fingerprintRegretSection = false;

                    $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "";
                    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    $scope.loginModal.selectLogin = true;
                    $scope.loginModal.selectLoginClass = true;
                    $scope.loginModal.loginEmailSection = false;
                    //$scope.loginModal.enteryouremailadd = "global.adhar";

                    $scope.Showpass = 'welcomeModals.Showpas';
                    $scope.leftthumblogin = 'welcomeModals.leftlogin';
                    $scope.pleasewait = 'welcomeModals.pleasewait';
                    $scope.skipfinger = 'welcomeModals.skipfing';
                    $scope.enterpass = "welcomeModals.enterpasss";
                    $scope.fingernot = 'welcomeModals.Fingerprintnot';
                    $rootScope.neverregister = 'welcomeModals.neverregiste';
                    $scope.valada = "welcomeModals.validateadhar";
                    $scope.valmobno = "welcomeModals.validatemobi";
                    //$scope.loginModal.enteryouremailadd = "global.adhar";

                    $scope.loginModal.sevrerr = "welcomeModals.sevrerr";
                    $scope.loginModal.otheraccCred = "welcomeModals.otheraccCred";
                    $scope.loginModal.quickLoginOp = "welcomeModals.quickLoginOp";
                    $scope.loginModal.CreatAcc = "welcomeModals.CreatAcc";
                    $scope.loginModal.CreatAccbuttonTxt = "welcomeModals.CreatAccbuttonTxt";
                    $scope.loginModal.reserPass = "welcomeModals.reserPass";
                    $scope.loginModal.ForgetPass = "welcomeModals.ForgetPass";
                    $scope.loginModal.scanFinger = "welcomeModals.scanFinger";
                    $scope.loginModal.devicenotConn = "welcomeModals.devicenotConn";
                    $scope.loginModal.guestUser = "welcomeModals.guestUser";
                    $rootScope.validates = "global.validatess";

                    $scope.loginModal.fields = [
                        { id: "email",placeholder:"Email or Phone No. or Aadhar No.", defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.loginModal.emailOrMobileOrAadhaarPatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                        { id: "password",placeholder:"Enter Your Password", defaultText: "", text: "", textMasked: '', type: 'password', visible: true, selectedClass: '', callback: function () { $scope.loginModal.passwordLengthCheck(this) }, focus: function () { $rootScope.focusField(this) } }
                    ];

                    $rootScope.fields.login = $scope.loginModal.fields;



                    //Set visibility of panels
                    $scope.loginModal.loginPasswordSectionClass = "";
                    $scope.loginModal.loginEmailSectionClass = "";
                    $scope.loginModal.loginPasswordSection = false;
                    //$scope.loginModal.loginEmailSection = true;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $scope.loginModal.EmailAndPasswordDivisionClass = '';
                    $rootScope.clearLoginScreens = $scope.loginModal.clearAllLoginScreens;
                    $scope.loginModal.resetPassword = function () {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_forgotPasswordButton', 'input', 'selected');
                        $rootScope.passwordResetEmail = $scope.loginModal.fields[0].text;
                        $rootScope.keyboardHide();
                        $rootScope.loadModal({ id: 'resetpassword' });
                    }


                };

                $scope.loginModal.showPasswordToggle = function (field) {

                    field.textMaskedDisabled = !field.textMaskedDisabled;
                    if (field.textMaskedDisabled) {
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if (field.textMaskedDisabled) {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.loginModal.showPasswordClass = 'active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                        $scope.loginModal.showPasswordClass = '';
                        var textMasked = '';
                        for (var i = 0; i < field.textMasked.length; i++) {
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    }
                };

                $scope.loginModal.showEmailSectionError = function () {
                    //$scope.loginModal.loginUsernameError = true;
                    $timeout(function () {
                        $scope.loginModal.loginServerErrorVisible = false;
                        $scope.loginModal.loginUsernameError = false;
                    }, 5000)
                };
                $scope.loginModal.showPasswordError = function () {
                    //$scope.loginModal.loginPasswordError = true;
                    $timeout(function () {
                        $scope.loginModal.loginPasswordError = false;
                        $scope.loginModal.loginServerErrorVisible = false;
                    }, 5000)
                };


                $scope.loginModal.emailPatternCheck = function (field) {

                    var str = field.text;

                    if (str.length == 10) {
                        if (isNaN(str)) {
                            //not a number


                        } else {
                            //number as well as exact 10 digit mobile number.
                            $scope.loginModal.nextBtnActive = 'active_btn';

                        }
                    }
                    if (str.length < 10) {
                        $scope.loginModal.nextBtnActive = '';
                    }

                    if (str.length > 10) {

                        if (HigiKioskUtilitiesService.isValidEmailAddress(field)) {
                            $rootScope.hideEmailExtensionTop();
                            $scope.loginModal.nextBtnActive = 'active_btn';
                            $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.emailExistsCheck($scope.loginModal.fields[0]) };
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            $rootScope.hideEmailExtensionTop();
                        } else {
                            $scope.loginModal.nextBtnActive = '';
                            $rootScope.keyboardEnterButtonFunction = null;
                            $rootScope.keyboardEnterButtonClass = '';
                        }


                    }

                };

                $scope.loginModal.aadhaarExistsCheck = function (field) {
                    var aadhaar_no_new = document.getElementById("email").value;
                    var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                    var aadhaar_no = false;
                    var aadhaar_no_empty = true;
                    if (aadhaar_no_new != "" && aadhaar_no_new.length == 10 && !isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";

                    }
                    else if (aadhaar_no_new != "" && aadhaar_no_new.length == 12 && !isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";
                    }
                    else if (aadhaar_no_new != "" && regexEmail.test(aadhaar_no_new) == true && isNaN(aadhaar_no_new)) {
                        $scope.loginModal.nextBtnActive = 'active_btn';
                        $scope.loginModal.loginPasswordSection = true;
                        $scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";

                    }
                    else {
                        $scope.loginModal.nextBtnActive = '';
                        //alert("u r not valid");
                    }


                };


                $scope.loginModal.emailOrMobileOrAadhaarPatternCheck = function (field) {
                    var str = field.text;
                    //alert(str);
                    var emailOrMobileExist = "";
                    if (HigiKioskUtilitiesService.isValidEmailAddress(field)) {
                        $scope.loginModal.emailValid = true;
                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                        $rootScope.validEmail = $scope.loginModal.emailValid;
                        $rootScope.hideEmailExtensionTop();

                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        //alert($scope.registerModal.nextBtnActive);
                        var emailIsThis = $scope.loginModal.fields[0].text;
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                            type: "GET",
                            cache: false,
                            dataType: 'json',
                            headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                            success: function (html) {
                                //////alert('Response sucess');
                                var json = JSON.parse(JSON.stringify(html));
                                var jss = JSON.stringify(json);
                                console.log(json);
                                var token = json.ApiKey;
                                $rootScope.ApiToken = token;
                                $.ajax({
                                    url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type: "GET",
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',
                                    headers: { "ApiToken": token },
                                    success: function (html) {
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                        if (finalString == "You never registered with this Email ID") {

                                            $scope.loginModal.nextBtnActive = '';
                                            //alert("IfemailOrMobileExist"+finalString);
                                            $scope.loginModal.nextBtnActive = '';
                                            //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                            $("#login_username_error_newest3").css({'top':'-11px','left':'410px','width':'117px','font-size':'13px'});
                                            document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregisterd'];
                                            
                                            $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                        }
                                        else if (finalString == "") {
                                            //alert("ElseemailOrMobileExist"+finalString);
                                            document.getElementById("login_username_error_newest3").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            $scope.loginModal.nextBtnActive = 'active_btn';
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                            $scope.loginModal.showPasswordSection();
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.log('failures 3' + xhr.responseText);
                                    }
                                });
                            }
                        });


                    }


                    else if (str.length == 12 && isNaN(str) == false) {

                        /*
        
                                    $scope.registerModal.emailValid = true;
                                    $rootScope.validEmail = $scope.registerModal.emailValid;
                                    $rootScope.hideEmailExtensionTop();
                                    
                                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                                    $rootScope.keyboardEnterButtonClass = 'enter_active';
        
                        */

                        //alert("you reached man");
                        //alert($scope.registerModal.nextBtnActive);
                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$scope.valada];
                        $scope.loginModal.mobileValid = true;
                        $rootScope.validEmail = $scope.loginModal.mobileValid;
                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';

                        var emailIsThis = "";
                        var mobileIsThis = "";
                        var aadhaarIsThis = $scope.loginModal.fields[0].text;
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                            type: "GET",
                            cache: false,
                            dataType: 'json',
                            headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                            success: function (html) {
                                var json = JSON.parse(JSON.stringify(html));
                                var jss = JSON.stringify(json);
                                console.log(json);
                                var token = json.ApiKey;
                                $rootScope.ApiToken = token;
                                $.ajax({
                                    url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type: "GET",
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',
                                    headers: { "ApiToken": token },
                                    success: function (html) {
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                        if (finalString == "You never registered with this Aadhaar number") {

                                            $scope.loginModal.nextBtnActive = '';
                                            //alert("IfemailOrMobileExist"+finalString);
                                            $scope.loginModal.nextBtnActive = '';
                                            //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                            $("#login_username_error_newest3").css({'top':'-5px','left':'400px','width':'125px','font-size':'13px'});
                                            document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregadhar'];

                                            $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                        }
                                        else if (finalString == "") {
                                            //alert("ElseemailOrMobileExist"+finalString);
                                            document.getElementById("login_username_error_newest3").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            $scope.loginModal.nextBtnActive = 'active_btn';
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                            $scope.loginModal.showPasswordSection();
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.log('failures 3' + xhr.responseText);
                                    }
                                });
                            }
                        });
                    }

                    else if (str.length == 10 && isNaN(str) == false) {

                        //alert("you reached man");
                        //alert($scope.registerModal.nextBtnActive);
                        $scope.loginModal.aadhaarValid = true;
                        document.getElementById("login_username_loading_new").style.display = "block";
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$scope.valmobno];
                        $rootScope.validEmail = $scope.loginModal.aadhaarValid;
                        $rootScope.keyboardEnterButtonFunction = function () { $scope.loginModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                        $rootScope.keyboardEnterButtonClass = 'enter_active';

                        var emailIsThis = "";
                        var mobileIsThis = $scope.loginModal.fields[0].text;
                        var aadhaarIsThis = "";
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                            type: "GET",
                            cache: false,
                            dataType: 'json',
                            headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                            success: function (html) {
                                var json = JSON.parse(JSON.stringify(html));
                                var jss = JSON.stringify(json);
                                console.log(json);
                                var token = json.ApiKey;
                                $rootScope.ApiToken = token;
                                $.ajax({
                                    url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type: "GET",
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',
                                    headers: { "ApiToken": token },
                                    success: function (html) {
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                        if (finalString == "You never registered with this Mobile number") {

                                            $scope.loginModal.nextBtnActive = '';
                                            //alert("IfemailOrMobileExist"+finalString);
                                            $scope.loginModal.nextBtnActive = '';
                                            //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                            $("#login_username_error_newest3").css({'top':'-5px','left':'400px','width':'125px','font-size':'13px'});
                                            document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregpass'];
                                            
                                            $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});

                                        }
                                        else if (finalString == "") {
                                            //alert("ElseemailOrMobileExist"+finalString);
                                            document.getElementById("login_username_error_newest3").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            $scope.loginModal.nextBtnActive = 'active_btn';
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
                                            $scope.loginModal.showPasswordSection();
                                        }
                                    },
                                    error: function (xhr, status, error) {
                                        console.log('failures 3' + xhr.responseText);
                                    }
                                });
                            }
                        });
                    }
                    else {
                        $scope.loginModal.emailValid = false;
                        $scope.loginModal.nextBtnActive = '';
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                    }

                    /*if(HigiKioskUtilitiesService.isValidEmailAddress(field))
                    {
                        $scope.registerModal.emailValid = true;
                        $rootScope.validEmail = $scope.registerModal.emailValid;
                        $rootScope.hideEmailExtensionTop();
                        $scope.registerModal.nextBtnActive = 'active_btn';
                        $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        //alert($scope.registerModal.nextBtnActive);
                    } 
                    else
                    {
                        $scope.registerModal.emailValid = false;
                        $scope.registerModal.nextBtnActive = '';
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                    }*/


                };

                $scope.loginModal.passwordLengthCheck = function (field) {
                    var str = field.text;

                    if (str.length >= 1) {
                        $scope.loginModal.loginBtnActive = 'login_modal_password_active_btn';
                        $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                    } else {
                        $scope.loginModal.loginBtnActive = '';
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                        document.getElementById("error_message_login").style.display = "none";
                    }
                };

                var functionCall = true;

                $scope.loginModal.emailExistsCheck = function (field) {

                    $scope.loginModal.showPasswordSection();
                };




                $scope.loginModal.login = function () {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_loginButton', 'button', 'pressed');
                    $scope.loginModal.submitting = true;
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    JkioskService.registerKiosk();
                    if ($route.current.$$route.originalPath.search("finish") != -1) {
                        var callback = $rootScope.saveCheckinFinalResultsLogin;
                    } else {
                        var callback = null;
                    }

                    HigiApiService.qLoginAsync($scope.loginModal.fields[0].text, $scope.loginModal.fields[1].text,
                        function (resp) {
                            
                            //alert("response received");
                            console.log("response received");

                            console.log(resp);


                            //console.log(resp.User.id);

                            //console.log(resp.User.email);
                            //console.log(resp.User.email);
                            //Server Success
                            if (resp == null) {
                                //alert("but Error: Password Failure");
                                //...but Error: Password Failure
                                $scope.loginModal.submitting = false;
                                $rootScope.keyboardEnterButtonFunction = $scope.loginModal.login;
                                $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);
                                $scope.loginModal.loginEmailAddressError = "welcomeModals.failure.account.not.exist";
                                $scope.loginModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                                $scope.loginModal.loginPasswordError = true;
                                document.getElementById("error_message_login").style.display = "block";
                                $rootScope.resetSessionTimeout();
                                $scope.loginModal.showPasswordError();
                            }
                            else {
                                //Success: Password accepted. Load data from server and into session.

                                //Remove watch that resets modal view
                                $scope.loginModal.watch();
                                console.log("here is your id :" + resp.User.id);
                                //alert("here is your id :" + resp.User.id);

                                //for affiliation
                                var loginResp = resp;
                                HigiKioskStorageService.saveSessionData('loginResp', loginResp);

                                $rootScope.UserToken = resp.Token;
                                $rootScope.UserInfo = resp.User;
                                
                                if (resp.User != null && resp.User != undefined && resp.User != "") {
                                    var affiliateUserId = resp.User.id;
                                    HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                                    if (resp.User.affiliate != undefined && resp.User.affiliate != null) {
                                        //alert("affiliate");
                                        $rootScope.updateAffiliate = true;
                                    }else{
                                        //alert("not a affiliate");
                                        $rootScope.updateAffiliate = false;
                                    }
                                }
                                //for affiliation ends


                                // session storage for telemedi registeration flow start
                                //````````````````````````````````````````````````````````````
                                HigiKioskStorageService.saveSessionData('telemedloginUserId' , resp.User.id);
                                HigiKioskStorageService.saveSessionData('qlogin' , resp);
                                $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
                                if (resp.LastCheckin != undefined) {
                                    HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);

                                    if (resp.LastCheckin.gender == "m") {
                                        HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                                    }


                                    if (resp.User.firstName == undefined) {
                                        if (resp.LastCheckin.firstName != undefined) {  // old user can't come inside the user object                                   
                                            HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.LastCheckin.firstName);
                                        } else {
                                            HigiKioskStorageService.saveSessionData('telemedUserFirstName', "Gusest User");
                                        }
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                                    }

                                    if (resp.User.lastName != undefined) {  // old user can't have a last name                                  
                                        HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.User.lastName);
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                                    }


                                    if (resp.LastCheckin.dateOfBirth != undefined) {
                                        var dob = resp.LastCheckin.dateOfBirth.split(" ");
                                        if (dob.length > 1) {
                                            dob = dob[0].replace(/\//g, '-') + dob[1].replace(/\//g, '-') + dob[2].replace(/\//g, '-') + dob[3].replace(/\//g, '-') + dob[4].replace(/\//g, '-');
                                            HigiKioskStorageService.saveSessionData('telemedUserDOB', dob);
                                        } else {
                                            HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.LastCheckin.dateOfBirth.replace(/\//g, '-'));
                                        }
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                                    }

                                    if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                                        HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', "");
                                    }

                                } else {
                                    // first time login user
                                    HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);
                                    HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                                    if (resp.User.lastName != undefined) {
                                        HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.LastCheckin.lastName);
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                                    }
                                    if (resp.User.dateOfBirth != undefined) {
                                        HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.User.dateOfBirth.replace("/", "-"));
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                                    }
                                    if (resp.User.gender != undefined) {
                                        if (resp.User.gender == "m") {
                                            HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                                        } else {
                                            HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                                        }
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserGender', "male");  // dummy date provide for telemedi registeration
                                    }

                                    if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                                        HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', ""); // dummy mobile number provided for telemedi registeration
                                    }
                                }

                                if ($rootScope.telemediSetting) {
                                    $rootScope.telemedicineButtonAvailable = true;
                                    var telemedEmailId = $("#email").val();
                                    HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail', telemedEmailId);
                                }
                                // session storage for telemedi registeration flow end
                                //````````````````````````````````````````````````````````````





                                HigiKioskStorageService.saveSessionData('sampleText', resp.User.id);
                                //Ensure challenge ID was valid and ChallengeUserRelation was recieved
                                if (resp.ChallengeUserRelation !== undefined) {
                                    HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                                } else {
                                    //HigiKioskStorageService.saveSessionData('hasChallenge', false);
                                    //HigiKioskStorageService.saveSessionData('challengeModalAd', null);
                                    //JkioskService.logEvent($rootScope.higiPageName + "_login", "error", "error retrieving challenge");
                                }

                                $rootScope.resetSessionTimeout();
                                HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);
                                //  $(".higi_login_btn_profile").show(); 
                                //     $('.higi_top_nav_ng').show();
                                $scope.getPastKioskVitalData(resp);
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

                    if (!HigiKioskStorageService.returnSessionData('logged_in')) {
                        $rootScope.isVisibleExit = true;
                        $rootScope.isVisibleReg = false;
                        $rootScope.isVisibleAudio = true;
                    } else {
                        $rootScope.isVisibleExit = false;
                        $rootScope.isVisibleReg = true;
                        $rootScope.isVisibleAudio = true;
                    }
                };



                $scope.loginModal.showPasswordSection = function () {



                    //Enters inside if fingerprint is not present for current user.
                    //var login_next_btn = document.getElementById("login_password_submit_btn");
                    //login_next_btn.style.top = "114px";

                    //var next_element_for_password = document.getElementById('password').nextElementSibling; //finding next sibling element
                    //next_element_for_password.innerHTML = "";

                    //document.getElementById('password').placeholder = $scope.interfaceLabels[$scope.enterpass];
                    //document.getElementById('password').style.fontSize = "22px";


                    $scope.loginModal.accountVisible = false;
                    
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    $scope.loginModal.submitting = false;
                    $scope.loginModal.loginPasswordSection = true;
                    //$scope.loginModal.loginPasswordSectionClass = "modal-slide-in-left";
                    //$scope.loginModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.loginModal.showPasswordClass = '';
                    $scope.loginModal.fields[1].type = 'password';
                    $scope.loginModal.fields[1].textMaskedDisabled = false;
                    $rootScope.focusField($scope.loginModal.fields[1]);
                    $scope.loginModal.passwordLengthCheck($scope.loginModal.fields[1]);

                    $timeout(function(){
                        $scope.loginModal.forgotVisible = true;
                    },500);
                };








                //if fingerprint match qlogin will happen otherwise. It will move into regret message..
                //Then we should show email or mobile no login screen
                //temporarily we assume fingerprint is not matching




                //$rootScope.login_fingerprint_match = false;




                //var file = document.getElementById('imgFinger').files[0];
                //append file data       


                /*var imageBmp = document.getElementById('imgFinger');
                               var imageBmp2 = imageBmp.value;
                             ////alert(imageBmp2);
                               console.log(imageBmp2);*/
                //var formData = new FormData();


                //var form = document.createElement('form');
                //form.enctype = "application/x-www-form-urlencoded";

                //FormData object to store all form key/values

                //var file = $("#imgFinger input[type='file']")[0];
                //var file = $('#imgFinger').get(0).files[0];


                //var file = document.getElementById("imgFinger").files[0];

                //console.log(file); 

                //formData.append("image", file);




                /*console.log($("#imagefile").prop('files')[0]);*/
                /*formData.append("image", $('input[type=image]')[0].val());
                console.log($('input[type=image]')[0].val());*/


                /*if($rootScope.login_fingerprint_match){
                    //Enters here if fingerprint match
                  ////alert($rootScope.login_fingerprint_match);
 
                        $scope.loginModal.loginCreateFingerprintCapturingSection = true;
                        $scope.loginModal.fingerprintRegretSection = false;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-left";
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-right";
 
 
                }else{
                  ////alert($rootScope.login_fingerprint_match);
                    $rootScope.finger_regret_msg_async = $timeout(function(){
                      
                        ////alert("fingerprint is not matched");
                        //Enters here if not fingerprint match
                        ////alert("asynchronous call");
                        $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                        $scope.loginModal.fingerprintRegretSection = true;
                        $scope.loginModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-in-right";
                                    
                    }, 5000);
                    
                  $rootScope.show_email_section_async =  $timeout(function(){
                        $scope.loginModal.fingerprintRegretSection = false;
                        $scope.loginModal.fingerprintRegretSectionClass = "modal-slide-out-left-custom";
                        ////alert(i);
                        i++;
                         $rootScope.fingerPrintOrEmailMobile = false;
                         $scope.loginModal.showEmailSection(true);
                     }, 10000);
 
                }*/

                //};











                $scope.loginModal.showEmailSection = function (defaulting) {

                    $scope.loginModal.selectLogin = false;
                    document.getElementById("keyboardbox").style.display = "block";
                    $scope.loginModal.loginPasswordSectionClass = "modal-slide-out-right";
                    $scope.loginModal.loginEmailSectionClass = (defaulting) ? "" : "modal-slide-in-left";
                    $scope.loginModal.submitting = false;
                    $rootScope.first_email_section_async = $timeout(function () {
                        $scope.loginModal.loginPasswordSection = false;
                    }, 500);
                    $scope.loginModal.loginEmailSection = true;
                    $scope.loginModal.EmailAndPasswordDivisionClass = 'modal-slide-in-left';
                    $rootScope.focusField($scope.loginModal.fields[0]);
                    $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                    $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});
                    $scope.loginModal.emailOrMobileOrAadhaarPatternCheck($scope.loginModal.fields[0]);
                    //Initialize password incase repeating flow (via back button)
                    $scope.loginModal.fields[1].text = '';
                    document.getElementById($scope.loginModal.fields[1].id).value = $scope.loginModal.fields[1].text;
                    $scope.loginModal.fields[1].textMasked = '';

                    $timeout(function(){
                        $scope.loginModal.accountVisible = true;
                        $scope.loginModal.quickOptionButton = true;
                    },1000);
                };
                //Register loginModal's initial screen on $rootScope for toggling back
                //from password reset and registration modals
                $rootScope.loginModalInitScreen = $scope.loginModal.showEmailSection;
                $scope.loginModal.backToEmailSection = function () {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_backButton', 'button', 'pressed');
                    $scope.loginModal.showEmailSection();
                };
                $scope.loginModal.showRegistrationModal = function () {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_iNeedAnAccountButton', 'button', 'pressed');
                    $rootScope.fields.register[0].text = $rootScope.targetFieldSet[0].text;
                    $rootScope.loadModal($scope.loginModal.loginMode);
                    $rootScope.registerModalInitScreen(true);
                };

                $scope.loginModal.quickLoginOptionSelected = function(){
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $timeout(function(){
                        $rootScope.keyboardHide();
                        $scope.loginModal.quickLoginOptions = true;
                    },600);
                }

                $scope.loginModal.disableQuickLoginOptionSection = function(id , section){
                    if ($scope.loginModal.quickLoginOptions == true) {
                        if(document.getElementById(id).style.pointerEvents !== "none"){
                            $scope.loginModal.quickLoginOptions = false;
                            //$rootScope.keyboardShow();
                            if (section == 'login_modal_userId_section') {
                                $rootScope.focusField($scope.loginModal.fields[0]);
                                $scope.loginModal.accountVisible = true;
                                $scope.loginModal.quickOptionButton = true;
                                $scope.loginModal.forgotVisible = false;
                            }else if(section == 'login_modal_passwrd_section'){
                                $rootScope.focusField($scope.loginModal.fields[1]);
                                $scope.loginModal.forgotVisible = true;
                                $scope.loginModal.quickOptionButton = true;
                                $scope.loginModal.accountVisible = false;
                            }
                        }
                    }else if ($scope.loginModal.quickLoginOptions == false) {
                        if (section == 'login_modal_userId_section') {
                            $rootScope.focusField($scope.loginModal.fields[0]);
                            $scope.loginModal.forgotVisible = false;
                            $scope.loginModal.quickOptionButton = true;
                            $timeout(function(){
                                $scope.loginModal.accountVisible = true;
                            },600);
                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                            $("#login_password").css({'border': '2px solid gray' , 'pointer-events' : 'none'});
                            $scope.loginModal.loginBtnActive = '';
                        }else if(section == 'login_modal_passwrd_section'){
                            $rootScope.focusField($scope.loginModal.fields[1]);
                            $scope.loginModal.accountVisible = false;
                            $scope.loginModal.quickOptionButton = true;
                            $timeout(function(){
                                $scope.loginModal.forgotVisible = true;
                            },600);
                            $("#login_password").css({'border': '2px solid gray' , 'pointer-events' : 'auto'});
                            $("#login_password").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                        }
                    }
                }

                $scope.loginModal.createNewIHLAccount = function(field){
                    $rootScope.registerModalInit(); //trigger the placeholder json file 

                    var str = field.text;
                    var emailOrMobileExist = "";
                    document.getElementById("login_username_loading_new").style.display = "block";
                    if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                        
                        var emailIsThis = $scope.loginModal.fields[0].text;
                        var mobileIsThis = "";
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
                                    url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type : "GET", 
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',  
                                    headers:{"ApiToken":token},
                                    success: function(html){
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                                        if(finalString == "Email ID already exists"){
                                            //alert(finalString);
                                            document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['welcomeModals.emailalreadyexist'];
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'100px','font-size':'16px'});
                                        }
                                        else if(finalString == ""){
                                           //alert(accepted);
                                            document.getElementById("login_username_error_newest3").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $rootScope.newAccountEmailID = $scope.loginModal.fields[0].text;
                                            $scope.loginModal.quickOptionButton = false;
                                            $scope.loginModal.quickLoginOptions = false;
                                            $scope.loginModal.accountVisible = false;
                                            $scope.loginModal.forgotVisible = false;
                                            $scope.loginModal.EmailAndPasswordDivisionClass = 'modal-slide-out-left';
                                            $scope.loginModal.loginEmailSection = false;
                                            $rootScope.keyboardHide();
                                            //$timeout(function(){
                                                $rootScope.loadModal({ id: 'register' });
                                            //},300);
                                            
                                            //alert($rootScope.newAccountEmailID);
                                        }
                                    },
                                    error : function(xhr, status, error) { 
                                        console.log('failures 3'+xhr.responseText);
                                    } 
                                });
                            }
                        });     
                    }else{
                        document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['global.invalidregdemailformat'];
                        document.getElementById("login_username_loading_new").style.display = "none";
                        document.getElementById("register-first-screen-text").innerHTML = "";
                        $("#login_username_error_newest3").css({'top':'0px','left':'380px','width':'150px','font-size':'16px'});
                    } 
                };

                $scope.loginModal.guestUserLogin = function(){
                    if ($rootScope.IHLTeleConsultSelected == true) {
                        return;
                    }
                    $scope.loginModal.loginEmailSection = false;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $rootScope.loadModal({ id: 'guestUserFlow' });
                }

                $scope.loginModal.clearAllLoginScreens = function(){
                    $scope.loginModal.loginEmailSection = false;
                    $scope.loginModal.quickOptionButton = false;
                    $scope.loginModal.quickLoginOptions = false;
                    $scope.loginModal.accountVisible = false;
                    $scope.loginModal.forgotVisible = false;
                    $scope.loginModal.loginCreateFingerprintCapturingSection = false;
                    $scope.loginModal.loginCreateFingerprintSection = false;
                    $scope.loginModal.fingerprintRegretSection = false;
                    if ($("#myFinalOutput")) {
                        $("#myFinalOutput").css('display','none');
                    }
                    if ($("#finalImage")) {
                        $("#finalImage").css('display','none');
                    }  
                }

                $scope.loginModal.init();
            }

            $scope.getPastKioskVitalData = function(resp) {
                if(resp != null) {
                    if (resp != undefined && resp != null &&  resp.length != 0) {
                        if (resp['LastCheckin'] != undefined && resp['LastCheckin'] != null) {
                          let healthData = resp['LastCheckin'];
                          $scope.filteredVitalData(healthData);
                        }
                      }else{
                        let healthData = [];
                        $scope.filteredVitalData(healthData);
                    }
                }
            }

            $scope.filteredVitalData = function(lastCheckinVital){
                $rootScope.pastKioskVitalData = {};
                let lastCheckin = {};
                $scope.vitalToShare = {};
                let vitalToShare = {
                    bmi: '', 
                    bmiClass: '', 
                    dateTime: '', 
                    diastolic: '', 
                    ECGBpm: '', 
                    fatRatio: '', 
                    heightMeters: '', 
                    leadTwoStatus: '',
                    pulseBpm: '',
                    spo2: '',
                    systolic: '',
                    temperature: '',
                    weightKG: '',
                    body_fat_mass: '',
                    percent_body_fat: '',
                    skeletal_muscle_mass:'',
                    body_cell_mass:'',
                    visceral_fat:'',
                    bone_mineral_content: '',
                    protien: '',
                    mineral: '',
                    intra_cellular_water: '',
                    extra_cellular_water: '',
                    waist_hip_ratio: '',
                    waist_height_ratio: '',
                    basal_metabolic_rate: ''
                };
                //console.log(vitalToShare)
                if ("weightKG" in lastCheckinVital && lastCheckinVital["weightKG"] != null && lastCheckinVital["weightKG"] != undefined && !isNaN(lastCheckinVital["weightKG"])) {
                    lastCheckinVital["weightKG"] = Math.round(+lastCheckinVital["weightKG"]);
                }
                if ("heightMeters" in lastCheckinVital && lastCheckinVital["heightMeters"] != null && lastCheckinVital["heightMeters"] != undefined && !isNaN(lastCheckinVital["heightMeters"])) {
                    lastCheckinVital["heightMeters"] = Math.round(+lastCheckinVital["heightMeters"]);
                }
                console.log(lastCheckinVital);
                for (let key in vitalToShare) {
                  if (key in lastCheckinVital) {
                    if (lastCheckinVital[key] != undefined && lastCheckinVital[key] != null && 
                        lastCheckinVital[key] != NaN && lastCheckinVital[key] != "-" && lastCheckinVital[key] != "") {
                      lastCheckin[key] = lastCheckinVital[key];
                    }
                  }
                }
                $rootScope.pastKioskVitalData = lastCheckin;
                if ("temperature" in $rootScope.pastKioskVitalData && $rootScope.pastKioskVitalData["temperature"] != null && $rootScope.pastKioskVitalData["temperature"] != undefined &&  $rootScope.pastKioskVitalData["temperature"].toString().trim().length > 0 && !isNaN($rootScope.pastKioskVitalData["temperature"])) {
                    $rootScope.pastKioskVitalData["temperature"] = (parseFloat($rootScope.pastKioskVitalData["temperature"]) * 9 / 5 + 32).toFixed(1);
                }
                console.log($rootScope.pastKioskVitalData);
            }

            $scope.loginModal.ssoUserLogin = function() {
                /*if ($rootScope.IHLTeleConsultSelected == true) {
                    return;
                }*/
                $scope.loginModal.loginEmailSection = false;
                $scope.loginModal.quickOptionButton = false;
                $scope.loginModal.quickLoginOptions = false;
                $scope.loginModal.accountVisible = false;
                $scope.loginModal.forgotVisible = false;
                $rootScope.loadModal({ id: 'ssoUserFlow' });
            }
        }
    };

}]);

