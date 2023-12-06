
higiKioskControllers.directive('loginMebModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/medibuddy/login.html',
        controller: function ($scope) {
            $scope.loginMEBModal = new Object();

            $scope.loginMEBModal.init = function() {

                $rootScope.fpWarningTxt = "welcomeModals.loginFingerprintNotRecognized";
                $scope.loginMEBModal.loginEmailSectionClass = "";
                /*$scope.loginModal.loginTitle = "login.to.your.account";
                $scope.loginModal.loginTitleEmail = "login.enter.your.email.or.mobile";
                $scope.loginModal.loginEmailAddress = "login.email.address";
                $scope.loginModal.loginEmailAddressError = "auth.failure.account.not.exist";
                $scope.loginModal.loginCreateAccount = "login.create.a.new.account";*/
                $scope.loginMEBModal.globalNext = "global.next";
                /*$scope.loginModal.loginPassword = "login.enter.your.password";
                $scope.loginModal.loginPasswordNote = "login.min.6";
                $scope.loginModal.loginEnterPassword = "login.enter.a.password";
                $scope.loginModal.loginShowPassword = "login.show.password";
                $scope.loginModal.loginForgotPassword = "login.forgot.password";*/
                $scope.loginMEBModal.loginPasswordErrorMessage = "welcomeModals.failure.password.incorrect";
                $scope.loginMEBModal.loginServerError = "welcomeModals.server.failure";
                $scope.loginMEBModal.globalLogin = "welcomeModals.login";
                $scope.loginMEBModal.globalBack = "global.back";
                /*$scope.loginModal.loginType = "global.loginType";
                $scope.loginModal.emailTypeLogin = "global.adharLogin";
                $scope.loginModal.fingerPrintTypeLogin = "global.fingerPrintLogin";*/
                $scope.loginMEBModal.nextBtnActive = '';
                $scope.loginMEBModal.loginBtnActive = '';
                $scope.loginMEBModal.loginUsernameError = false;
                $scope.loginMEBModal.loginMode = { id: 'register' };
                $scope.loginMEBModal.submitting = false;
                $scope.loginMEBModal.loginUsernameError = false;
                $scope.loginMEBModal.loginPasswordError = false;
                $scope.loginMEBModal.loginServerErrorVisible = false;

                $scope.Showpass = 'welcomeModals.Showpas';
                $scope.leftthumblogin = 'welcomeModals.leftlogin';
                $scope.pleasewait = 'welcomeModals.pleasewait';
                $scope.skipfinger = 'welcomeModals.skipfing';
                $scope.enterpass = "welcomeModals.enterpasss";
                $scope.fingernot = 'welcomeModals.Fingerprintnot';
                $rootScope.neverregister = 'welcomeModals.neverregiste';
                $scope.valada = "welcomeModals.validateadhar";
                $scope.valmobno = "welcomeModals.validatemobi";
                 $scope.frnme = "welcomeModals.frnme";
                 $scope.lnnme = "welcomeModals.lnnme";
                $scope.loginMEBModal.globalSignup = "welcomeModals.signup";
                //$scope.loginModal.enteryouremailadd = "global.adhar";
                 $scope.emailIDexissts = "welcomeModals.emailIDexissts";

                $scope.loginMEBModal.sevrerr = "welcomeModals.sevrerr";
                $scope.loginMEBModal.otheraccCred = "welcomeModals.otheraccCred";
                $scope.loginMEBModal.quickLoginOp = "welcomeModals.quickLoginOp";
                $scope.loginMEBModal.CreatAcc = "welcomeModals.CreatAcc";
                $scope.loginMEBModal.CreatAccbuttonTxt = "welcomeModals.CreatAccbuttonTxt";
                $scope.loginMEBModal.reserPass = "welcomeModals.reserPass";
                $scope.loginMEBModal.ForgetPass = "welcomeModals.ForgetPass";
                $scope.loginMEBModal.scanFinger = "welcomeModals.scanFinger";
                $scope.loginMEBModal.devicenotConn = "welcomeModals.devicenotConn";
                $scope.loginMEBModal.guestUser = "welcomeModals.guestUser";
                $scope.loginMEBModal.ssoLogin = "welcomeModals.ssoLogin";
                $rootScope.validates = "global.validatess";
                //$scope.loginModal.enteremailplaceholder = "";
                //$scope.loginModal.enterpasswordplaceholder = "";
                //setTimeout(function(){
                 //$scope.loginModal.enteremailplaceholder = $scope.interfaceLabels['global.adhar'];
                 //$scope.loginModal.enterpasswordplaceholder = $scope.interfaceLabels['login.enter.your.password'];

                 //alert($scope.loginModal.enteremailplaceholder);
                 //alert($scope.loginModal.enterpasswordplaceholder);
                 
               //},1000);
                

                $scope.loginMEBModal.fields = [
                    { id: "mobile", placeholder:HigiKioskUtilitiesService.getPlaceholder('welcomeModals.entermobileenumber'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.loginMEBModal.MobilePatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                    
                    {id : "emailReg2" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.loginMEBModal.emailPatternCheck(this)}, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true},

                    {id : "firstname" , placeholder: "Enter First Name",defaultText : "Enter your first name" , text : '' , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.loginMEBModal.FirstNameValidation(this)}, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true},

                    {id : "lastname" , placeholder: "Enter Last Name",defaultText : "Enter your last name" , text : '' , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.loginMEBModal.LastNameValidation(this)}, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true}
                ];

                $rootScope.fields.login = $scope.loginMEBModal.fields;

                //$rootScope.focusField($scope.loginMEBModal.fields[0]);

                //Set visibility of panels
                $scope.loginMEBModal.loginPasswordSectionClass = "";
                $scope.loginMEBModal.loginEmailSectionClass = "";
                $scope.loginMEBModal.loginPasswordSection = false;
                //$scope.loginModal.loginEmailSection = true;
                //$scope.loginModal.loginCreateFingerprintSection = true;
                $scope.loginMEBModal.loginPasswordSectionClass = "";
                $scope.loginMEBModal.loginEmailSectionClass = "";
                $scope.loginMEBModal.loginPasswordSection = false;
                $scope.loginMEBModal.fingerprintRegretSectionClass = "";
                $scope.loginMEBModal.fingerprintRegretSection = false;

                $scope.loginMEBModal.loginCreateFingerprintCapturingSectionClass = "";
                $scope.loginMEBModal.loginCreateFingerprintCapturingSection = false;
                $scope.loginMEBModal.selectLogin = true;
                $scope.loginMEBModal.selectLoginClass = true;
                $scope.loginMEBModal.loginEmailSection = false;
                $scope.loginMEBModal.quickOptionButton = false;
                $scope.loginMEBModal.quickLoginOptions = false;
                $scope.loginMEBModal.accountVisible = true;
                $rootScope.clearLoginScreens = $scope.loginMEBModal.clearAllLoginScreens;
            

                $("#meb_login_username_loading_new").hide();
                $("#meb_reg_username_loading_new").hide();      
                $scope.loginMEBModal.mobilefieldIsEmpty = false;
                $scope.loginMEBModal.emailSection = false;     
                $scope.loginMEBModal.loginNameSection = false;             
                $scope.loginMEBModal.EmailAndPasswordDivisionClass = '';
                document.getElementById("login_mobile_error").innerHTML = "";
                $scope.loginMEBModal.loginNameSectionClass = "";
                document.getElementById("reg_error_info").innerHTML = "";

                $scope.tempMobileNo = "";
                $scope.tempEmailID = "";
                $scope.tempFirstName = "";
                $scope.tempLastName = "";
                $scope.emailFineTune = true;

                     //   document.getElementById("login_username_loading_new").style.display = "block";

            }

            $rootScope.loginModelMEBInit = $scope.loginMEBModal.init;

            $scope.loginMEBModal.MobilePatternCheck = function (field) {
                var str = field.text;
                
                var emailOrMobileExist = "";
                
                if (str.length == 10 && isNaN(str) == false && str != "0000000000") {
                    $("#meb_login_username_loading_new").show();
                    $scope.loginMEBModal.mobilefieldIsEmpty = false;
                    console.log($scope.interfaceLabels);
                    $scope.loginMEBModal.aadhaarValid = true;
                    //document.getElementById("login_username_loading_new").style.display = "block";
                    document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$scope.valmobno];
                    $rootScope.validEmail = $scope.loginMEBModal.aadhaarValid;
                    $rootScope.keyboardEnterButtonFunction = function () { $scope.loginMEBModal.aadhaarExistsCheck($scope.loginModal.fields[0]); };
                    $rootScope.keyboardEnterButtonClass = 'enter_active';

                    var emailIsThis = "";
                    var mobileIsThis = $scope.loginMEBModal.fields[0].text;
                    var aadhaarIsThis = "";
                    console.log(mobileIsThis);
                    $rootScope.isOnlinee3 = window.navigator.onLine;
                    if ($rootScope.isOnlinee3) {
                        document.getElementById("register-first-screen-text").innerHTML = $scope.interfaceLabels[$rootScope.validates];
                        document.getElementById("register-first-screen-text").style.color = "#1873A7";
                        //document.getElementById("login_username_loading_new").style.display = "block";
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
                                        $("#meb_login_username_loading_new").hide();
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                        
                                        $rootScope.keyboardEnterButtonFunction = $scope.loginMEBModal.login;
                                        $rootScope.keyboardEnterButtonClass = 'enter_active';

                                        console.log(finalString);

                                        if (finalString == "You never registered with this Mobile number") {
                                            console.log($scope.interfaceLabels['welcomeModals.youneverregpass']);
                                            $scope.loginMEBModal.nextBtnActive = '';
                                            //alert("IfemailOrMobileExist"+finalString);
                                            $scope.loginMEBModal.nextBtnActive = '';
                                            //$("#login_username_error_newest3").css({'top':'-13px','left':'410px','width':'80px','font-size':'17px'});
                                            
                                            $("#login_mobile_error").css({'top':'-4px','left':'400px','font-size':'13px'});
                                            document.getElementById("login_mobile_error").innerHTML = $scope.interfaceLabels['welcomeModals.youneverregpass'];

                                            $(".login_modal_register_forgot_password_button").css({'color': '#fff', 'background': 'linear-gradient(to bottom,#5aa4d9d1,#3989c3de, #0261c2f2)', 'border-top': '3px solid #5dbcff', 'border-left': '3px solid #5fa4d4bf', 'border-bottom': '3px solid #50a4e0bf', 'border-right': 'none', 'box-shadow': '4px 5px 3px #4a4a4ae0'});

                                            //document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border': '2px solid #3787c0' , 'pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid gray','pointer-events' : 'none'});
                                            $scope.loginMEBModal.mobilefieldIsEmpty = false;
                                            $scope.tempMobileNo = field.text;
                                        }
                                        else if (finalString == "") {
                                            //alert("ElseemailOrMobileExist"+finalString);
                                            $scope.loginMEBModal.loginBtnActive = 'login_modal_password_active_btn';
                                            $scope.loginMEBModal.mobilefieldIsEmpty = false;
                                            document.getElementById("login_mobile_error").innerHTML = "";
                                            $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            $scope.loginMEBModal.nextBtnActive = 'active_btn';
                                            //document.getElementById("login_username_loading_new").style.display = "none";
                                            document.getElementById("register-first-screen-text").innerHTML = "";
                                            $("#login_username").css({'border' : '2px solid gray','pointer-events' : 'auto'});
                                            $("#login_password").css({'border' : '2px solid #3787c0','pointer-events' : 'auto'});
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
                        $("#meb_login_username_loading_new").hide();
                        document.getElementById("register-first-screen-text").innerHTML = "Server error!";
                        document.getElementById("register-first-screen-text").style.color = "red";
                        //document.getElementById("login_username_loading_new").style.display = "none";
                    }
                }
                else {                    
                    $("#meb_login_username_loading_new").hide();
                    $scope.loginMEBModal.loginBtnActive = '';
                    $scope.loginMEBModal.emailValid = false;
                    $scope.loginMEBModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    $scope.loginMEBModal.mobilefieldIsEmpty = false;
                    document.getElementById("login_mobile_error").innerHTML = "";
                    $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            
                }
            };

            /*$scope.loginMEBModal.fields = [
                { id: "email", placeholder:HigiKioskUtilitiesService.getPlaceholder('welcomeModals.emailormobile'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.loginModal.emailOrMobileOrAadhaarPatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                { id: "password", placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.enteryouypasswords'), defaultText: "", text: "", textMasked: '', type: 'password', visible: true, selectedClass: '', callback: function () { $scope.loginModal.passwordLengthCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true }
            ];*/

            $rootScope.fields.login = $scope.loginMEBModal.fields;

            $scope.loginMEBModal.createNewIHLAccount = function(field){


                if($scope.loginMEBModal.fields[0].text.trim().length == 0){
                    $scope.loginMEBModal.mobilefieldIsEmpty = true;
                    return 0;
                }

                //$rootScope.registerModalInit(); //trigger the placeholder json file 
                console.log(field);
                var str = field.text;
                var emailOrMobileExist = "";
                //document.getElementById("login_username_loading_new").style.display = "block";
                if($scope.loginMEBModal.fields[0].text.length == 10 && !isNaN(str) && str != "0000000000") {
                    
                    var emailIsThis = "";
                    var mobileIsThis = $scope.loginMEBModal.fields[0].text;
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
                                    if(finalString == "Mobile Number already exists"){
                                        document.getElementById("login_username_error_newest3").innerHTML = "Mobile number already exists";
                                        //document.getElementById("login_username_loading_new").style.display = "none";
                                        document.getElementById("register-first-screen-text").innerHTML = "";
                                        $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'120px','font-size':'16px'});
                                    } else if(finalString == "Aadhaar number already exists"){
                                        document.getElementById("login_username_error_newest3").innerHTML = "Aadhar number already exists";
                                        //document.getElementById("login_username_loading_new").style.display = "none";
                                        document.getElementById("register-first-screen-text").innerHTML = "";
                                        $("#login_username_error_newest3").css({'top':'-10px','left':'401px','width':'120px','font-size':'16px'});
                                    }
                                    else if(finalString == ""){
                                        //alert(accepted);
                                        document.getElementById("login_username_error_newest3").innerHTML = "";
                                        $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                        //document.getElementById("login_username_loading_new").style.display = "none";
                                        document.getElementById("register-first-screen-text").innerHTML = "";
                                        $rootScope.newAccountEmailID = $scope.loginMEBModal.fields[0].text;
                                        $scope.loginMEBModal.quickOptionButton = false;
                                        $scope.loginMEBModal.quickLoginOptions = false;
                                        $scope.loginMEBModal.accountVisible = false;
                                        $scope.loginMEBModal.forgotVisible = false;
                                        $scope.loginMEBModal.EmailAndPasswordDivisionClass = 'modal-slide-out-right';
                                        $scope.loginMEBModal.loginEmailSection = false;
                                        $scope.tempMobileNo = mobileIsThis;
                                        $rootScope.keyboardHide();

                                        $scope.loginMEBModal.showEmailSection();

                                        //$timeout(function(){
                                            /*if(emailIsThis != ""){
                                                $rootScope.registerFlowFirstInput = "email";
                                            } else if(mobileIsThis != ""){
                                                $rootScope.registerFlowFirstInput = "mobile";
                                            } else if(aadhaarIsThis != ""){
                                                $rootScope.registerFlowFirstInput = "aadhar";
                                            }*/


                                           // $rootScope.loadModal({ id: 'register' });
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
                    $scope.loginMEBModal.mobilefieldIsEmpty = true;

                    document.getElementById("login_username_error_newest3").innerHTML = $scope.interfaceLabels['global.invalidregdemailformat'];
                    //document.getElementById("login_username_loading_new").style.display = "none";
                    document.getElementById("register-first-screen-text").innerHTML = "";
                    $("#login_username_error_newest3").css({'top':'0px','left':'380px','width':'150px','font-size':'16px'});
                }  
            };

            $scope.loginMEBModal.showEmailSection = function(){
                $scope.loginMEBModal.emailSection = true;
                $scope.loginMEBModal.loginEmailSectionClass ="modal-slide-in-right";

                $(".email_meb_address_validation_loader").hide();
                $(".email_meb_address_validation_error").hide();
                $(".email_meb_address_validation_srv_err").hide();
                   
                $rootScope.focusField($scope.loginMEBModal.fields[1]); 
                $rootScope.keyboardShow();

                $scope.loginMEBModal.emailPatternCheck($scope.loginMEBModal.fields[1]);
                $scope.loginMEBModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';

                $scope.loginMEBModal.createConfirmClass = "";
                $scope.loginMEBModal.submitting = false;
                $scope.loginMEBModal.loginEmailSection = true;

                $(".signup_meb_modal_progression_dots2").css('background-color','#3887b2');

            }

            $scope.loginMEBModal.emailPatternCheck = function(field){
                $scope.loginMEBModal.MobileSectionNextButtonClass = '';
                var str = field.text;
                var emailExist = "signup_modal_next_active_btn";
                /*if($scope.loginMEBModal.fields[1].text.trim().length == 0){
                    $scope.emailText = true;
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                        $scope.loginMEBModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                        return;
                    }else{
                        $scope.loginMEBModal.MobileSectionNextButtonClass = '';
                        return;
                    }
                }else{*/
                   if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                        $scope.loginMEBModal.emailValid = true;
                        $rootScope.validEmail = $scope.loginMEBModal.emailValid;
                        $rootScope.hideEmailExtensionTop();                            
                        
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        var emailIsThis = $scope.loginMEBModal.fields[1].text;
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";
                        $rootScope.isOnline = window.navigator.onLine;
                        $(".email_meb_address_validation_loader").show();   
                        $(".email_meb_address_validation_error").hide();                       
                        $scope.emailText = false;              

                        if($rootScope.isOnline){
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
                                    $rootScope.ApiToken = token;
                                        $.ajax({
                                            url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                            type : "GET", 
                                            cache: false,
                                            contentType: 'application/json; charset=UTF-8',  
                                            headers:{"ApiToken":token},
                                            success: function(html){
                                                console.log(JSON.stringify(html));
                                                emailExist = JSON.stringify(html);
                                                //alert(emailOrMobileExist);
                                                var finalString = emailExist.replace(/['"]+/g, '');
                                                $(".email_meb_address_validation_loader").hide();
                                                if(finalString == "Email ID already exists"){
                                                    $scope.loginMEBModal.MobileSectionNextButtonClass = '';
                                                    //alert("IfemailOrMobileExist"+finalString);
                                                    $scope.loginMEBModal.nextBtnActive = '';
                                                    $(".email_meb_address_validation_error").show();
                                                    $(".email_meb_address_validation_srv_err").hide();
                                                    $scope.emailText = false;
                                                }
                                                else if(finalString == ""){
                                                   // alert("ElseemailOrMobileExist"+finalString);
                                                    $(".email_meb_address_validation_error").hide();
                                                    $(".email_meb_address_validation_srv_err").hide();
                                                    $scope.emailText = true;
                                                    if($scope.emailFineTune == true){ // firstname focus field issue is affecting the email value
                                                        $scope.tempEmailID = $scope.loginMEBModal.fields[1].text;
                                                    }
                                                    /*if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) {
                                                        $scope.loginMEBModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }*/
                                                   
                                                    $scope.loginMEBModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    
                                                }
                                            },
                                            error : function(xhr, status, error) { 
                                                $(".email_meb_address_validation_loader").hide();
                                                $(".email_meb_address_validation_error").hide();
                                                $(".email_meb_address_validation_srv_err").show();
                                                $scope.emailText = false;
                                                console.log('failures 3'+xhr.responseText);
                                            } 
                                        });
                                    }
                                });
                            }
                            else{
                                $(".email_meb_address_validation_srv_err").show();
                                $(".email_meb_address_validation_loader").hide();
                                $(".email_meb_address_validation_error").hide();
                                $scope.emailText = false;
                                /*document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                                document.getElementById("register-first-screen-text9").style.color = "red";
                                document.getElementById("login_username_loading_new9").style.display = "none";*/
                            }       
                   }else if(str.trim().length == 0){     
                        $scope.emailText = false;               
                        $scope.loginMEBModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                   } else {
                        $scope.emailText = false; 
                        $scope.loginMEBModal.MobileSectionNextButtonClass = '';
                   }
                //}
            };


            $scope.loginMEBModal.NameEntrySection = function(field){

                $scope.emailFineTune = false;
                $scope.loginMEBModal.loginEmailSectionClass = "modal-slide-out-left";             

                $scope.loginMEBModal.loginNameSection = true;
                $scope.loginMEBModal.loginNameSectionClass = "modal-slide-in-right";
                $scope.loginMEBModal.firstLastNameSectionNextButtonClass = '';
                $scope.loginMEBModal.emailSection = false;


                $(".signup_meb_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_meb_modal_progression_dots3").css('background-color','#3887b2');
                
            };


            $scope.loginMEBModal.FirstNameValidation = function(field){
                document.getElementById("reg_error_info").innerHTML = "";          
                $scope.loginMEBModal.firstLastNameSectionNextButtonClass = '';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true){
                    var count = $("#firstname").val().length-1;
                    if ((count > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true) {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;

                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#firstname").val().length + 1;
                    if ((count > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true) {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;

                }
                else{
                if (($("#firstname").val().length > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true ){
                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                }
                else{
                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                }
                }
                if ($("#firstname").val() != "" && Nameformat.test($("#firstname").val()) == true ) {

                    console.log("first name");

                    document.getElementById("firstname").placeholder= "Enter First Name";
                    
                    $scope.loginMEBModal.loginNameSection = true;
                }
                
            } 

    
            $scope.loginMEBModal.LastNameValidation = function(field){     
                document.getElementById("reg_error_info").innerHTML = "";          
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true) {
                    var count = $("#lastname").val().length - 1;
                    if ((count > 2) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true) {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;
                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#lastname").val().length + 1;
                    if ((count > 2) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true) {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;
                }
                else{
                if (($("#lastname").val().length >= 1) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true ){
                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                }
                else{
                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = ' ';
                }
                }
                if ($("#lastname").val() != "" && Nameformat.test($("#lastname").val() == true)) {

                    console.log("last name");

                    document.getElementById("lastname").placeholder="Enter Last Name";;
                    
                    $scope.loginMEBModal.loginNameSection = true;
                }
            }

            $scope.loginMEBModal.createAccount = function(){
                $("#meb_reg_username_loading_new").show();                
                $scope.loginMEBModal.firstLastNameSectionNextButtonClass = '';
                var kioskID = "2936";
                var timestamp = new Date().getTime();
                HigiApiService.getAccessToken(kioskID, timestamp,
                    function(token){
                        let userGivenData = {
                                "user": {
                                    "email": $scope.tempEmailID,
                                    "fingerprint": "",
                                    "mobileNumber": $scope.tempMobileNo,
                                    "aadhaarNumber": "",
                                    "firstName": $scope.loginMEBModal.fields[2].text,
                                    "lastName": $scope.loginMEBModal.fields[3].text,
                                    "affiliate": "",
                                    "terms": {
                                        "termsFileName": HigiKioskStorageService.getSettingsValue('terms.filename')
                                    },
                                    "privacyAgreed": {
                                        "privacyFileName": HigiKioskStorageService.getSettingsValue('privacy.policy.filename')
                                    }
                                },
                                "password": $scope.tempMobileNo,
                                "encryptionVersion": null
                            };

                            HigiApiService.createAccount(userGivenData, token.ApiKey,
                            function(res){
                                console.log(res);
                                HigiApiService.qLoginAsync($scope.tempMobileNo, $scope.tempMobileNo,
                                function (successRes) {
                                    console.log(successRes);
                                    $("#meb_reg_username_loading_new").hide();
                                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                                    $scope.loginMEBModal.afterRecciveLoginRes(successRes, true);
                                },function (errorRes) {
                                    console.log(errorRes);
                                    $("#meb_reg_username_loading_new").hide();
                                    $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                                    document.getElementById("reg_error_info").innerHTML = "Unable to connect to the server, Try again";
                                    //alert("unable to connect server, Please try again..")
                                })

                            },
                            function(errRes){
                                console.log(errRes);
                                $("#meb_reg_username_loading_new").hide();
                                $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                                document.getElementById("reg_error_info").innerHTML = "Unable to connect to the server, Try again";
                                //alert("unable to connect server, Please try again..")
                            });
                    },
                    function(errorRes){
                        console.log(errorRes);
                        $("#meb_reg_username_loading_new").hide();   
                        $scope.loginMEBModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                        document.getElementById("reg_error_info").innerHTML = "Unable to connect to the server, Try again";
                        //alert("unable to connect server, Please try again..")
                    }
                )

               /* HigiApiService.CreateUserAsync($scope.loginMEBModal.fields[0].text, $scope.registerModal.fields[0].text, HigiKioskStorageService.getSettingsValue('terms.filename'), HigiKioskStorageService.getSettingsValue('privacy.policy.filename'), userObject,
                    function (createResp) {
                    })*/
            }

            $scope.loginMEBModal.login = function(){
                //login_mobile_error
                //return 0;
                $("#meb_login_username_loading_new").css({'left':'565px'});
                $("#meb_login_username_loading_new").show();
                $scope.loginMEBModal.loginBtnActive = '';
                HigiApiService.qLoginAsync($scope.loginMEBModal.fields[0].text, $scope.loginMEBModal.fields[0].text,
                function (successRes) {
                    console.log(successRes);
                    $("#meb_login_username_loading_new").hide();
                    $scope.loginMEBModal.loginBtnActive = 'login_modal_password_active_btn';
                    if(successRes == null){
                       document.getElementById("login_mobile_error").innerHTML = "Sorry, Your not a 'Medi Buddy' user";
                    } else {
                        $scope.loginMEBModal.afterRecciveLoginRes(successRes, false);    
                    }
                    
                },
                function (errorRes) {
                    console.log(errorRes);
                    $("#meb_login_username_loading_new").hide();
                    $scope.loginMEBModal.loginBtnActive = 'login_modal_password_active_btn';
                    document.getElementById("login_mobile_error").innerHTML = "Unable to connect to the server.";
                    //alert("unable to connect server, Please try again..")
                })
            }


            $scope.loginMEBModal.afterRecciveLoginRes = function(response, isRegUser){

                //If on final resluts page, save checkin data
                if($route.current.$$route.originalPath.search("finish") != -1){
                    var callback = $rootScope.saveCheckinFinalResultsLogin;
                } else {
                    var callback = null;
                }

                var initSession = function(){
                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                    HigiKioskUserService.initSession(response.User, response.LastCheckin, isRegUser, response.Token, response, callback);

                        if(response.LastCheckin == undefined){
                            $rootScope.lastCheckinModalShow = true;
                            $scope.modalHide();
                        }
                };

                $rootScope.UserToken = response.Token;


                // session storage for telemedi registeration flow start
            //````````````````````````````````````````````````````````````
            
                HigiKioskStorageService.saveSessionData('telemedloginUserId' , response.User.id);
                HigiKioskStorageService.saveSessionData('response' , response);
                HigiKioskStorageService.saveSessionData('telemedUserEmail' , response.User.email);
                HigiKioskStorageService.saveSessionData('telemedUserFirstName' , response.User.firstName);
                HigiKioskStorageService.saveSessionData('telemedUserLastName' , response.User.lastName);
                
                if(response.User.dateOfBirth != undefined){
                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , response.User.dateOfBirth.replace("/", "-"));
                } else {
                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                }    
                if(response.User.gender != undefined){
                    if(response.User.gender == "m"){                                     
                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                    } else {
                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                    }
                } else {
                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");  // dummy date provide for telemedi registeration
                }

                if(response.User.mobileNumber != undefined){  // mobile number is optional for ihl registeration flow             
                    HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , response.User.mobileNumber);
                } else {
                    HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , ""); // dummy mobile number provided for telemedi registeration
                }    

                if($rootScope.telemediSetting) {
                    $rootScope.telemedicineButtonAvailable = true;
                    var telemedEmailId = $("#email").val();
                    HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail' , telemedEmailId);
                }
                
            // session storage for telemedi registeration flow end
            //````````````````````````````````````````````````````````````





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
            }

        }}
}]);
