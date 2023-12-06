higiKioskControllers.directive('registerModal',['$http', '$window', 'HigiKioskFlow', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskUserService' , '$route', '$sce', 'HigiKioskUtilitiesService', function($http, $window, HigiKioskFlow, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, $route, $sce, HigiKioskUtilitiesService) {

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/register_fingerprint.html',
        controller :function($scope, $http, $rootScope){
            
            if(!$rootScope.fingerprintTrueorFalse){
            $scope.registerModal = new Object();
            $scope.registerModal.fingerprintThereNot = true;
            $scope.registerModal.watch = $scope.$watch('modalVisible', function(newVal, oldVal){
                if(newVal == false){
                    if($rootScope.secondDialog == false){
                        //alert("second dialog false");
                        $scope.registerModal.init();
                    }
                }
            });

            $scope.affiliateValue = "";

            document.getElementById("getTheseHands2").onclick = function(){
                //alert("clicked this register button");
                $scope.registerModal.fingerprintRegretSection = false;
                $scope.registerModal.fingerprintRegretSectionClass = "modal-slide-out-left";
                //numCircle4
                document.getElementById("fingerprint_regret_new").style.display = "none";
                //document,getElementById("numCircle4").style.backgroundColor = "red";
                //document.getElementById("numCircle4").classList.add("bg_change_n");
            }            

            $scope.registerModal.init = function(){
                $scope.registerModal.skipFingerprintCalled = false;
                $scope.registerModal.loginEmailSection = true;
                $scope.passValid = '';
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                $scope.registerModal.loginTitle = "welcomeModals.create.an.account";
                //$scope.registerModal.loginTitleEmail = "login.enter.your.email";
                //$scope.registerModal.loginTitleEmailSpam = "login.email.never.spam";
                //$scope.registerModal.loginEmailAddress = "login.email.address";
                //$scope.registerModal.enteryouremail = "global.enter.your.emailid";
                $scope.registerModal.loginEmailAddressError = "welcomeModals.failure.account.exists";
                $scope.registerModal.loginMobileNumberError = "Mobile number already exists";
                //$scope.registerModal.loginHaveAccount = "login.login.to.account";
                $scope.registerModal.globalNext = "global.next";
                //$scope.registerModal.loginPassword = "login.enter.your.password";
                //$scope.registerModal.loginPasswordNote = "login.min.6";
                /*$scope.registerModal.loginEnterPassword = "login.enter.a.password";
                $scope.registerModal.loginShowPassword = "login.show.password";
                $scope.registerModal.loginForgotPassword = "login.forgot.password";
                $scope.registerModal.loginConfirmPassword = "login.password";*/
                $scope.registerModal.loginMode = {id : 'login'};
                $scope.registerModal.globalSignup = "welcomeModals.signup";
                $scope.registerModal.globalBack = "global.back";
                $scope.registerModal.registerDisclaimer = "welcomeModals.by.clicking.sign.up";
                $scope.registerModal.nextBtnActive = '';
                $scope.registerModal.loginBtnActive = '';
                $scope.registerModal.loginUsernameError = false;
                $scope.registerModal.fingerprintAlreadyExistsSection = false;
                $scope.registerModal.loginServerErrorVisible = false;
                $scope.registerModal.loginServerError = "welcomeModals.server.failure";
                $scope.registerModal.submitting = false;
                $scope.registerModal.showPasswordClass = '';
                $scope.registerModal.showPasswordClass2 = '';
                $rootScope.secondDialog = true;
                $scope.aadharMobileNotLink = false;
                //removeElement

                 $scope.leftregis = "welcomeModals.leftregis";
                 $scope.procreq = "welcomeModals.procreq";
                 $scope.notreq = "welcomeModals.notreq";
                 $scope.alreg = "welcomeModals.alreg";
                 $scope.loggingg ="welcomeModals.loggingg";
                 $scope.pleasewat = 'welcomeModals.pleasewait';
                 $scope.skipfingr = 'welcomeModals.skipfing';
                 $scope.confrmpass = "welcomeModals.confrmpass";
                 $scope.havacc = "welcomeModals.havacc";
                 $scope.enteremail = "welcomeModals.enteremail";
                 $scope.mobino = "welcomeModals.mobino";
                 $scope.frnme = "welcomeModals.frnme";
                 $scope.lnnme = "welcomeModals.lnnme";
                 $scope.validatename = "welcomeModals.validatename";
                 $scope.adha = "welcomeModals.enteradhar";
                 $scope.mmbn = "welcomeModals.entermob";
                 $scope.enteraffiliation = "welcomeModals.enteraffiliation";
                 /*$scope.enfrnme = "global.enterfir";
                 $scope.enlsnme = "global.enterlast";*/
                 $scope.validateemailadd =  "welcomeModals.validatess";
                 $scope.validateadhar = "welcomeModals.validateadhar";
                 $scope.validatemobi ="welcomeModals.validatemobi";
                 $scope.adharrexissts = "welcomeModals.adhaaralreadyexits";
                 $scope.mobilealexissts = "welcomeModals.mobilenumberalreadyexits";
                 $scope.emailIDexissts = "welcomeModals.emailIDexissts";
                 $scope.registersandimage = "welcomeModals.account.creating";
                 $scope.selctAffili = "welcomeModals.selectAffiliate";
                 $scope.sevrerr = "welcomeModals.sevrerr";
                 $scope.passwordPageTitle = "welcomeModals.passwordPageTitle";
                 $scope.validPasswordErrText = "welcomeModals.validPasswordErrText";
                 $scope.validPasswordErrTextNum = "welcomeModals.validPasswordErrTextNum";
                 $scope.validPasswordErrTextCap = "welcomeModals.validPasswordErrTextCap";
                 $scope.validPasswordErrTextSym = "welcomeModals.validPasswordErrTextSym";
                 $scope.validPasswordErrTextMin = "welcomeModals.validPasswordErrTextMin";
                 $scope.tnCpP1 = "welcomeModals.tnCpP1";
                 $scope.tnCpP2 = "welcomeModals.tnCpP2";
                 $scope.tnCpP3 = "welcomeModals.tnCpP3";
                 $scope.tnCpP4 = "welcomeModals.tnCpP4";
                 $scope.addfing = "welcomeModals.addfing";
                 $scope.isLoadingSignup = false;
                 $scope.signupError = false;
                 
                    /*var myEle = document.getElementById("emailReg2");
                    if(myEle){
                        //removeElement(myEle);
                        myEle.remove();
                    }*/
                    /*var myEle = document.getElementById("emailReg3");
                    if(myEle){
                        removeElement(myEle);
                    }*/
                    /*var myEle2 = document.getElementById("mobile_no_focus_new");
                    if(myEle2){
                       // removeElement(myEle2);
                       myEle2.remove();
                    }*/
                $scope.registerModal.fields = [
                    {id : "emailReg2" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.emailOrMobileOrAadhaarPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "emailReg3" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.emailPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}, 
                    {id : "mobile_no_focus_new" , placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.entermobileenumber') ,defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.mobileNoPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "firstname" , placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.frnme'),defaultText : "Enter your first name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.FirstNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "lastname" , placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.lnnme"),defaultText : "Enter your last name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.LastNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "passwordReg" ,placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.enteryouypasswords"),  text : '', textMasked : '' , textMaskedDisabled : false, type :'password' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.passwordLengthCheck(this)},
                        focus : function(){$rootScope.focusField(this)}},
                    {id : "confirmPassNow" ,placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.confrmpass"), defaultText : "Confirm password" , text : '', textMasked : '' , textMaskedDisabled : false, type :'password' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.passwordLengthCheck2(this)},
                        focus : function(){$rootScope.focusField(this)}},
                    {id : "aadharfield1" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField1Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "aadharfield2" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField2Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "aadharfield3" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField3Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "EmpID" , placeholder: "Enter Employee ID",defaultText : "Enter Employee ID" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.EmpIDValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "Otp" , placeholder: "Enter OTP",defaultText : "Enter OTP" , text : '' , type :'text' , visible : true , selectedClass : '',
                    callback : function(){$scope.registerModal.OtpValidation(this)},
                    focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "healthId" , placeholder: "Enter Abha Address",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                    callback : function(){$scope.registerModal.healthIdValidation(this)},
                    focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}                    
                ];
                $rootScope.fields.register = $scope.registerModal.fields;
                $scope.registerModal.loginPasswordSectionClass = "";
                //$scope.registerModal.loginEmailSectionClass = "";
                $scope.registerModal.loginCreateConfirmSectionClass = "";
                $scope.registerModal.loginPasswordSection = false;
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.emailOrMobileOrAadhaar = false;    
                $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                $scope.registerModal.abhaAccAddMobButtonClass = 'abhaAccAddMob_next_active_btn';
                $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                $scope.overallAadharFieldValue = '';
                $scope.mobTextLengthSatisfied = true;
                $scope.adr1TextLengthSatisfied = true;
                $scope.adr2TextLengthSatisfied = true;
                $scope.adr3TextLengthSatisfied = true;
                $scope.emailText = true;
                $scope.adr1FieldText = "";
                $scope.adr2FieldText = "";
                $scope.adr3FieldText = "";
                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                $scope.registerModal.otpSectionNextButtonClass = '';
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
                $rootScope.clearRegisterScreens = $scope.registerModal.clearAllRegisterScreens;
                $scope.abhaQrCardFromToken = '';
                $scope.abhaQrCardFromToken = '';
                $scope.abhaUserDetails = '';
                $scope.user_abha_number = '';
                $scope.registerByAadhar = false;
                $scope.somethingWentWrong = false;

            };

            $rootScope.registerModalInit = $scope.registerModal.init;

            $scope.registerModal.removeFocus = function(){
                $scope.registerModal.fields.forEach(function(item, index){
                    if (item.id !== "emailReg2" && item.id !== "emailReg3")  {
                        document.getElementById(item.id).blur();
                        item.selectedClass = "";
                        console.log(item.id)
                        console.log(index)   
                    }  
                });
            };

            $scope.registerModal.emailPatternCheck = function(field){
                //alert("emailPatternCheck");
                var str = field.text;
                //var str2 = document.getElementById("emailReg2").value;
               //if( str2.length == 12 && isNaN(str2) == false){
                    //$scope.registerModal.nextBtnActive = '';
                //}
                
                var thisText = document.getElementById("login_create_account_email_title2");
                
                //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(starts)
               /* if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.registerModal.emailValid = true;
                    
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("login_username_loading_new5").style.display = "block";
                            $rootScope.validEmail = $scope.registerModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';


                            var emailIsThis = $scope.registerModal.fields[1].text;
                            var mobileIsThis = "";
                            var aadhaarIsThis = "";
                            
                            $rootScope.isOnline4 = window.navigator.onLine;
                            if($rootScope.isOnline4){
                                document.getElementById("login_username_loading_new5").style.display = "block";
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text7").style.color = "#1873A7";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Email ID already exists"){

                                $scope.registerModal.nextBtnActive = '';
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = $scope.interfaceLabels['global.emailalreadyexist'];
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                document.getElementById("login_username_error_new").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                 }
                 else{
                    document.getElementById("register-first-screen-text7").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text7").style.color = "red";
                            document.getElementById("login_username_loading_new5").style.display = "none";
                 }       


                }*/
                //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(ends)

                if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == $scope.interfaceLabels['welcomeModals.aadhaarnumber']){
                    //alert("adharcheck");
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
                    document.getElementById("login_username_loading_new5").style.display = "block";
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';


                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = $scope.registerModal.fields[1].text;
                            $rootScope.isOnline5 = window.navigator.onLine;
                            if($rootScope.isOnline5){
                                document.getElementById("login_username_loading_new5").style.display = "block";
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
                    document.getElementById("register-first-screen-text7").style.color = "#1873A7";
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
                    $rootScope.ApiToken = token;
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Aadhaar number already exists"){
                                //alert("adharcheck finalString");
                                $scope.adharAlreadyExist = true;
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = $scope.interfaceLabels[$scope.adharrexissts];
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("adharcheck finalString_2");
                                $scope.adharAlreadyExist = false;
                                document.getElementById("login_username_error_new").innerHTML = "";
                                if($scope.mobileNumberAlreadyExists == true){
                                    //alert("adharcheck finalString_3");
                                    $scope.registerModal.nextBtnActive = '';
                                }
                                else{
                                    //alert("adharcheck finalString_4");
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                }                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                        }
                        else{
                            document.getElementById("register-first-screen-text7").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text7").style.color = "red";
                            document.getElementById("login_username_loading_new5").style.display = "none";
                        }


               }else if(str.length == 0 && thisText.innerHTML == $scope.interfaceLabels['welcomeModals.aadhaarnumber']){
                 //alert("adharcheck else if");
                  $scope.adharAlreadyExist = false;
                  $scope.registerModal.nextBtnActive = 'active_btn';
               }else
                {
                    document.getElementById("login_username_error_new").innerHTML = "";
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            $scope.registerModal.emailOrMobileOrAadhaarPatternCheck = function(field)
            {
                $scope.registerModal.MobileSectionNextButtonClass = '';
                var str = field.text;
                var emailOrMobileExist = "";
                if($scope.registerModal.fields[0].text.trim().length == 0){
                     $scope.emailText = true;
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4)) ) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                        return;
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        return;
                    }
                }else{
                   if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                        $scope.registerModal.emailValid = true;
                        $rootScope.validEmail = $scope.registerModal.emailValid;
                        $rootScope.hideEmailExtensionTop();                            
                        
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        var emailIsThis = $scope.registerModal.fields[0].text;
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";
                        $rootScope.isOnline = window.navigator.onLine;
                        $(".email_address_validation_loader").show();   
                        $(".email_address_validation_error").hide();                       
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
                                                emailOrMobileExist = JSON.stringify(html);
                                                //alert(emailOrMobileExist);
                                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                                $(".email_address_validation_loader").hide();
                                                if(finalString == "Email ID already exists"){
                                                    $scope.registerModal.MobileSectionNextButtonClass = '';
                                                    //alert("IfemailOrMobileExist"+finalString);
                                                    $scope.registerModal.nextBtnActive = '';
                                                    $(".email_address_validation_error").show();
                                                    $(".email_address_validation_srv_err").hide();
                                                    $scope.emailText = false;
                                                }
                                                else if(finalString == ""){
                                                   // alert("ElseemailOrMobileExist"+finalString);
                                                    $(".email_address_validation_error").hide();
                                                    $(".email_address_validation_srv_err").hide();
                                                    $scope.emailText = true;
                                                    /*if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }*/
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4)) ) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }
                                                    
                                                }
                                            },
                                            error : function(xhr, status, error) { 
                                                $(".email_address_validation_loader").hide();
                                                $(".email_address_validation_error").hide();
                                                $(".email_address_validation_srv_err").show();
                                                $scope.emailText = false;
                                                console.log('failures 3'+xhr.responseText);
                                            } 
                                        });
                                    }
                                });
                            }
                            else{
                                $(".email_address_validation_srv_err").show();
                                $(".email_address_validation_loader").hide();
                                $(".email_address_validation_error").hide();
                                $scope.emailText = false;
                                /*document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                                document.getElementById("register-first-screen-text9").style.color = "red";
                                document.getElementById("login_username_loading_new9").style.display = "none";*/
                            }       
                   }else{
                        $scope.emailText = false; 
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                   }
                }
                /*var str = field.text;
                var emailOrMobileExist = "";
               if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.registerModal.emailValid = true;
                    document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                            $rootScope.validEmail = $scope.registerModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            var emailIsThis = $scope.registerModal.fields[0].text;
                            var mobileIsThis = "";
                            var aadhaarIsThis = "";
                            $rootScope.isOnline = window.navigator.onLine;
                            if($rootScope.isOnline){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
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
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Email ID already exists"){

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels['global.emailalreadyexist'];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                        }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
                        
               }*/

               //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(starts)
              /* else if(str.length == 12 && isNaN(str) == false){
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
                    $scope.registerModal.mobileValid = true;
                    $rootScope.validEmail = $scope.registerModal.mobileValid;
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = $scope.registerModal.fields[0].text;
                            $rootScope.isOnline2 = window.navigator.onLine;
                            if($rootScope.isOnline2){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Aadhaar number already exists"){

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels[ $scope.adharrexissts];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                            }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
               }

               else if(str.length == 10 && isNaN(str) == false){

                    //alert("you reached man");
                    //alert($scope.registerModal.nextBtnActive);
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML =$scope.interfaceLabels[$scope.validatemobi];
                    $scope.registerModal.aadhaarValid = true;
                    $rootScope.validEmail = $scope.registerModal.aadhaarValid;
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = $scope.registerModal.fields[0].text;
                            var aadhaarIsThis = "";
                            $rootScope.isOnline3 = window.navigator.onLine;
                            if($rootScope.isOnline3){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
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

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels['global.mobilenumberalreadyexits'];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                                //console.log(XMLHttpRequest);
                            } 
                        });
                    }
                });
                            }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
               }*/
               //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(ends)
               //else{
                    /*document.getElementById("login_username_error_newest").innerHTML = "";
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';*/
               //}
            };

            $scope.skipFingerprint = function(){
            $rootScope.functionCallAbort = false;
            $scope.registerModal.skipFingerprintCalled = true;
            $scope.registerModal.loginCreateFingerprintSection = false; 
            $scope.loginCreateFingerprintCapturingSection = false;
            //$scope.registerModal.fingerprintRegretSection = true;
            $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
            $scope.registerModal.fingerprintAlreadySkippedSection = true;
            $scope.registerModal.fingerprintAlreadySkippedSectionClass = "modal-slide-in-right";
            document.getElementById("fingerprint_animation_fornow2").style.display = "block";
            $scope.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left"; 
            $scope.registerModal.fingerprintRegretSectionClass = "modal-slide-in-right";
            $("#fingerprint_already_Skipped").css({"top": "65px", "position": "relative"});

            $scope.withoutFingerprint();
            $scope.loginCreateFingerprintCapturingSection = false;
            $scope.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
            //document.getElementById("guy-1").style.display = "none";
            if(document.getElementById("scanning_line")){
                document.getElementById("scanning_line").style.display = "none";                 
            }
           };
           
           $scope.registerModal.redirectToLogin = function(){
                $rootScope.clearModal();
                $rootScope.registerModalInit(); //trigger the placeholder json
                $rootScope.loginModelInit(); //trigger the placeholder json file 
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton', 'button', 'pressed');
                $rootScope.loadModal({id : 'login', clicked: true});
           }
            $scope.registerModal.mobileNoPatternCheck = function(field){
                var str = field.text;
                // $scope.registerModal.abhaMobileNextButtonClass = '';
                $(".mob_no_validation_loader").css('display','none');
                $(".mob_no_validation_error").css('display','none');
                $(".mob_no_validation_srv_err").css('display','none');
                
                $(".aadharLinkMobileNumberHasIHLacc").css('display','none');

                if(str.length == 10 && isNaN(str) == false){
                    var emailIsThis = "";
                    var mobileIsThis = $scope.registerModal.fields[2].text;
                    var aadhaarIsThis = "";
                    $rootScope.PreviouslyGivenMobile = $scope.registerModal.fields[2].text; // 
                    $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                    $rootScope.isOnline6 = window.navigator.onLine;
                    if($rootScope.isOnline6){
                        $(".mob_no_validation_loader").css('display','block');
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
                                $rootScope.ApiToken = token;
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
                        
                                        // if(finalString == "Mobile Number already exists"){
                                        //     //alert(finalString);
                                        //     $scope.mobVerifyIHLExist = true;
                                        //     $scope.registerModal.MobileSectionNextButtonClass = '';
                                        //     $(".mob_no_validation_loader").css('display','none');
                                        //     $(".mob_no_validation_srv_err").css('display','none');
                                        //     $(".mob_no_validation_error").css('display','block');
                                        //     if($scope.registerModal.abhaMobileExist){
                                        //         $(".aadharLinkMobileNumberHasIHLacc").css('display','block');
                                        //         $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                                        //     }
                                        // }
                                        // else if(finalString == ""){
                                            //alert(finalString); 
                                            $scope.mobTextLengthSatisfied = true;
                                            $scope.mobVerifyIHLExist = false;
                                            $(".mob_no_validation_loader").css('display','none');
                                            $(".mob_no_validation_srv_err").css('display','none');
                                            $(".mob_no_validation_error").css('display','none');
                                            
                                            $(".aadharLinkMobileNumberHasIHLacc").css('display','none');
                                            
                                            if($rootScope.registerFlowFirstInput != "email"){
                                                if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4)) ) {
                                                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                }
                                            } else {
                                                if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                }   
                                            } 
                                        // }
                                    },
                                    error : function(xhr, status, error) { 
                                        $scope.mobVerifyIHLExist = false;
                                        console.log('failures 3'+xhr.responseText);
                                    } 
                                });
                            }
                        });
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        $(".mob_no_validation_loader").css('display','none');
                        $(".mob_no_validation_error").css('display','none');
                        $(".mob_no_validation_srv_err").css('display','block');
                        $scope.mobTextLengthSatisfied = false;
                    }
                }else if(str.length == 0){
                    $scope.mobTextLengthSatisfied = true;
                    $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else if((str.length != 10 || isNaN(str) == false) && str != ''){
                    $scope.registerModal.abhaMobileNextButtonClass = '';
                }else{
                    $scope.mobTextLengthSatisfied = false;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');   
                }
            }
            //     else if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == $scope.interfaceLabels['global.aadhaarnumber']){
            //          //alert("mobileNoPatternCheck else if");
            //         //alert("you reached man");
            //         //$scope.registerModal.nextBtnActive = 'active_btn';
            //         //alert($scope.registerModal.nextBtnActive);
            //         document.getElementById("login_username_loading_new8").style.display = "block";
            //     document.getElementById("register-first-screen-text8").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
            //         $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
            //                 $rootScope.keyboardEnterButtonClass = 'enter_active';

            //                 var emailIsThis = "";
            //                 var mobileIsThis = "";
            //                 var aadhaarIsThis = $scope.registerModal.fields[2].text;
            //                 $rootScope.isOnline7 = window.navigator.onLine;
            //                 if($rootScope.isOnline7){
            //                     document.getElementById("login_username_loading_new8").style.display = "block";
            //         document.getElementById("register-first-screen-text8").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
            //         document.getElementById("register-first-screen-text8").style.color = "#1873A7";
            //                 $.ajax({
            //       url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
            //       type : "GET", 
            //       cache: false,
            //       dataType: 'json',
            //       headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
            //       success: function(html){
            //         var json = JSON.parse(JSON.stringify(html));
            //         var jss=JSON.stringify(json);
            //         console.log(json);
            //         var token = json.ApiKey;
            //         $rootScope.ApiToken = token;
            //             $.ajax({
            //                 url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
            //                 type : "GET", 
            //                 cache: false,
            //                 contentType: 'application/json; charset=UTF-8',  
            //                 headers:{"ApiToken":token},
            //                 success: function(html){
            //                     console.log(JSON.stringify(html));
            //                     emailOrMobileExist = JSON.stringify(html);
            //                     //alert(emailOrMobileExist);
            //                     var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
            //                 if(finalString == "Aadhaar number already exists"){
            //                     $scope.adharAlreadyExist = true;
            //                     $scope.registerModal.nextBtnActive = '';
            //                     //alert("IfemailOrMobileExist"+finalString);
            //                     //$scope.registerModal.nextBtnActive = '';
            //                     document.getElementById("login_username_error_new2").innerHTML = $scope.interfaceLabels[ $scope.adharrexissts];
            //                     document.getElementById("login_username_loading_new8").style.display = "none";
            //     document.getElementById("register-first-screen-text8").innerHTML = "";
                                
            //                 }
            //                 else if(finalString == ""){
            //                     $scope.adharAlreadyExist = false;
            //                     //alert("ElseemailOrMobileExist"+finalString);
            //                     document.getElementById("login_username_error_new2").innerHTML = "";
            //                     if($scope.mobileNumberAlreadyExists == true){
            //                         $scope.registerModal.nextBtnActive = '';
            //                     }
            //                     else{
            //                     $scope.registerModal.nextBtnActive = 'active_btn';
            //                     }
            //                     document.getElementById("login_username_loading_new8").style.display = "none";
            //     document.getElementById("register-first-screen-text8").innerHTML = "";
            //                 }
            //                 },
            //                 error : function(xhr, status, error) { 
            //                     console.log('failures 3'+xhr.responseText);
            //                 } 
            //             });
            //         }
            //     });
            //                 }
            //             else{
            //                 document.getElementById("register-first-screen-text8").innerHTML = "There is a problem connecting the server";
            //                 document.getElementById("register-first-screen-text8").style.color = "red";
            //                 document.getElementById("login_username_loading_new8").style.display = "none";
            //             }
            //    }else if(str.length == 0 && document.getElementById("mobile_no_focus_new").placeholder == $scope.interfaceLabels[$scope.mmbn]){
            //       $scope.mobileNumberAlreadyExists = false;
            //       $scope.registerModal.nextBtnActive = 'active_btn';
            //    }
            //     else
            //     {
            //         document.getElementById("login_username_error_new2").innerHTML = "";
            //         $scope.registerModal.emailValid = false;
            //         $scope.registerModal.nextBtnActive = '';
            //         $rootScope.keyboardEnterButtonFunction = null;
            //         $rootScope.keyboardEnterButtonClass = '';
            //     }
            // };

            /*$scope.registerModal.mobileNoPatternCheck = function(mobile)
            {   
               var mobile_no_check = document.getElementById("mobile_no_focus_new").value;
            
               var email_value = document.getElementById("emailReg3").value;*/
               //var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

              /* var valid_email  = true;
               var valid_mobile = true;
               if(email_value != "")
               {


                   if(regexEmail.test(email_value))
                   {
                        ////////alert("valid_email");
                        valid_email = true;
                   }else{
                   
                        valid_email = false;
                   }
                }
                   
               $rootScope.mobile_no = mobile_no_check;
               if(mobile_no_check != "")
               {


                   if(isNaN(mobile_no_check)){
                       // //////alert("it is not a valid number");
                       valid_mobile    = false;
                    }
                    else{
                        
                        if(mobile_no_check.length == 10){
                           // //////alert("it is valid number");
                            valid_mobile    = true;

                            //$scope.registerModal.nextBtnActive = 'active_btn';
                        }else{
                             valid_mobile    = false;
                        }
                    }
                    
                }    
                

                if(valid_mobile == true && valid_email == true )
                {
                    $scope.registerModal.nextBtnActive = 'active_btn';
                }else{
                    $scope.registerModal.nextBtnActive = '';
                }

                   

            };*/

            $scope.registerModal.aadharInputField1Check = function(field){

                var str = field.text;
                $scope.adr1FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField1Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr1TextLengthSatisfied = true;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    $rootScope.focusField($scope.registerModal.fields[8]); 
                    if($rootScope.registerFlowFirstInput != "email"){
                        if($scope.aadharField3Value.length == 4 && $scope.adr2FieldText.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) && $scope.emailText == true){
                            $scope.aadhaarInputFieldValidate();
                        }                        
                    } else {
                        if($scope.aadharField3Value.length == 4 && $scope.adr2FieldText.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true)){
                            $scope.aadhaarInputFieldValidate();   
                        }
                    }
                }else if(str.length == 0){
                    $scope.adr1TextLengthSatisfied = true;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.adr1TextLengthSatisfied = false;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.registerModal.aadharInputField2Check = function(field){

                var str = field.text;
                $scope.adr2FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField2Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr2TextLengthSatisfied = true;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    $rootScope.focusField($scope.registerModal.fields[9]);     
                    if($rootScope.registerFlowFirstInput != "email"){
                        if($scope.aadharField3Value.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) && $scope.emailText == true){
                            $scope.aadhaarInputFieldValidate();
                        }                        
                    } else {
                        if($scope.aadharField3Value.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true)){
                            $scope.aadhaarInputFieldValidate();   
                        }
                    }
                }else if(str.length == 0){
                    $scope.adr2TextLengthSatisfied = true;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    } else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.adr2TextLengthSatisfied = false;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.registerModal.aadharInputField3Check = function(field){

                var str = field.text;
                $scope.adr3FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField3Value = str;
                    $scope.aadhaarInputFieldValidate();
                }else if(str.length == 0){
                    $scope.adr3TextLengthSatisfied = true;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }  else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.adr3TextLengthSatisfied = false;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.aadhaarInputFieldValidate = function(){                
                    $scope.overallAadharFieldValue = '';
                    $scope.overallAadharFieldValue = $scope.aadharField1Value+$scope.aadharField2Value+$scope.aadharField3Value;
                    console.log($scope.overallAadharFieldValue);
                    if($scope.overallAadharFieldValue.length == 12 && isNaN($scope.overallAadharFieldValue) == false ){
                        $(".adr_no_validation_loader").css('display','none');
                        $(".adr_no_validation_error").css('display','none');
                        $(".adr_no_validation_srv_err").css('display','none');
                        var emailIsThis = "";
                        var mobileIsThis = "";
                        var aadhaarIsThis = $scope.overallAadharFieldValue;
                        $rootScope.isOnline5 = window.navigator.onLine;
                        if($rootScope.isOnline5){     
                            $(".adr_no_validation_loader").css('display','block');        
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
                                    $rootScope.ApiToken = token;
                                    $.ajax({
                                        url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                        type : "GET", 
                                        cache: false,
                                        contentType: 'application/json; charset=UTF-8',  
                                        headers:{"ApiToken":token},
                                        success: function(html){
                                            console.log(JSON.stringify(html));
                                            emailOrMobileExist = JSON.stringify(html);
                                            var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                            if(finalString == "Aadhaar number already exists"){
                                                //alert(finalString);
                                                $scope.adr3TextLengthSatisfied = false;
                                                $(".adr_no_validation_loader").css('display','none');
                                                $(".adr_no_validation_error").css('display','block');
                                                $(".adr_no_validation_srv_err").css('display','none');
                                                $scope.registerModal.MobileSectionNextButtonClass = '';
                                            }else if(finalString == ""){
                                                //alert("adharcheck valid");
                                                $scope.adr3TextLengthSatisfied = true;
                                                $(".adr_no_validation_loader").css('display','none');
                                                $(".adr_no_validation_error").css('display','none');
                                                $(".adr_no_validation_srv_err").css('display','none');

                                                if($rootScope.registerFlowFirstInput != "email"){
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }
                                                } else {
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    } 
                                                }
                                            }
                                        },
                                        error : function(xhr, status, error) { 
                                            console.log('failures 3'+xhr.responseText);
                                        } 
                                    });
                                }
                            });
                        }
                        else{
                            $scope.adr3TextLengthSatisfied = false;
                            $scope.registerModal.MobileSectionNextButtonClass = '';
                            $(".adr_no_validation_loader").css('display','none');
                            $(".adr_no_validation_error").css('display','none');
                            $(".adr_no_validation_srv_err").css('display','block'); 
                        }
                    }
            }

            $scope.registerModal.showPasswordToggle = function(field){
                console.log(field);
                if (field.id == "passwordReg") {
                   field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.registerModal.showPasswordClass = 'active_eyes';
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
                }else if (field.id == "confirmPassNow") {
                    field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.registerModal.showPasswordClass2 = 'active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                        $scope.registerModal.showPasswordClass2 = '';
                        var textMasked = '';
                        for(var i = 0; i<field.textMasked.length; i++){
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    } 
                }
                
            };

            /*$scope.registerModal.passwordLengthCheck = function(field){
                var str = field.text;
                ////////alert(str.length);
                if(str.length >= 6){
                    $scope.registerModal.passwordValid = true;
                    //$scope.registerModal.loginBtnActive = 'active_btn';
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

            $scope.registerModal.passwordLengthCheck2 = function(field){
                var str = field.text;

                //if(str.length >= 6){
                 // if(str == $scope.registerModal.fields[6].text){
                    if(str.length >=6 && $scope.registerModal.fields[5].text >=6){
                        if($scope.registerModal.fields[5].text == $scope.registerModal.fields[6].text){
                    ////alert("matched");
                    $scope.registerModal.passwordValid = true;
                   // $scope.registerModal.loginBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.registerModal.showCreateConfirmSection;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordErrorClear();
                    }
                  }
                  else{
                    $scope.registerModal.passwordValid = false;
                    $scope.registerModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordError();
                    }
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
            };*/

/*            $scope.registerModal.passwordLengthCheck = function(field){
                var str = field.text;
                
                if(str.length >= 6){
                  if(str == $scope.registerModal.fields[6].text){
                    $scope.registerModal.passwordValid = true;
                    //$scope.registerModal.loginBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.registerModal.showCreateConfirmSection;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordErrorClear();
                    }
                  }
                  else{
                    $scope.registerModal.passwordValid = false;
                    $scope.registerModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordError();
                    }
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
            };*/

/*            $scope.registerModal.passwordLengthCheck2 = function(field){
                var str = field.text;

                if(str.length >= 6){
                  if(str == $scope.registerModal.fields[5].text){
                    ////alert("matched");
                    $scope.registerModal.passwordValid = true;
                    //$scope.registerModal.loginBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.registerModal.showCreateConfirmSection;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordErrorClear();
                    }
                  }
                  else{
                    $scope.registerModal.passwordValid = false;
                    $scope.registerModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    if($scope.registerModal.loginCreateConfirmSection){
                        $scope.registerModal.createConfirmPasswordError();
                    }
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
            }*/;

            $scope.registerModal.passwordLengthCheck = function(field){
                var str = field.text;
                $scope.passValid = str;
                if(Boolean(str.match(/\d/))){
                    $('.signup_modal_new_password_hint_Num').css({"color" : 'green'});
                }else{
                    $('.signup_modal_new_password_hint_Num').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[A-Z]/))){
                    $('.signup_modal_new_password_hint_Cap').css({"color" : 'green'});
                }else{
                    $('.signup_modal_new_password_hint_Cap').css({"color" : 'red'});
                }
                if(str.length >= 8){
                    $('.signup_modal_new_password_hint_Min').css({"color" : 'green'});
                }else{
                    $('.signup_modal_new_password_hint_Min').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[@#$&%!~]/))){
                    $('.signup_modal_new_password_hint_Sym').css({"color" : 'green'});
                }else{
                    $('.signup_modal_new_password_hint_Sym').css({"color" : 'red'});
                }
                if(Boolean(str.match(/[a-z]/)) && Boolean(str.match(/\d/)) && Boolean(str.match(/[A-Z]/)) && str.length >= 8 && Boolean(str.match(/[@#$&%!~]/))){
                    $('.signup_modal_new_password_hint').css({"color" : 'green'});
                }else{
                    $('.signup_modal_new_password_hint').css({"color" : 'red'});
                }
                $scope.registerModal.termsAccepted = false;
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
            };

            $scope.registerModal.passwordLengthCheck2 = function(field){
                var str = field.text;
                if($scope.passValid === str){
                    $('#confirm_password_text_match').css({'color' : 'green'});
                    document.getElementById('confirm_password_text_match').innerText = 'Password Match';
                }else{
                    $('#confirm_password_text_match').css({'color' : 'red'});
                    document.getElementById('confirm_password_text_match').innerText = "Password don't Match";
                }
                $scope.registerModal.termsAccepted = false;
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
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

            $scope.registerModal.healthIdEntrySection = function(){
                console.log($scope.registerModal.fields[12].text);

                $(".healthId_validation_loader").css('display','block');
                let data = {
                    "method": "checkHealthIdExist",
                    "data": {
                        "healthId" : $scope.registerModal.fields[12].text
                    }
                };

                HigiApiService.getABHASession(data, function(response){
                    var data = JSON.parse(response);
                    console.log(JSON.parse(data.res));

                    if(data.status == 'S'){
                        if(JSON.parse(data.res).status == false){
                            $scope.registerModal.healthIDSectionClass = "modal-slide-out-left";
                            $scope.registerModal.loginCreateConfirmSection = true;
                            $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                            $timeout(function() {
                                $rootScope.focusField($scope.registerModal.fields[5]);
                                $scope.registerModal.healthIDSection = false;
                            },500);
                            $scope.registerModal.showCreateConfirmSection();
                            $(".healthId_validation_loader").css('display','none');
                            $(".signup_modal_progression_dots3").css('background-color','#bbb');
                            $(".signup_modal_progression_dots4").css('background-color','#3887b2');
                        }else{
                            $(".healthId_validation_loader").css('display','none');
                            $('.healthId_exist').css('display', 'block');
                            setTimeout(function(){
                                $('.healthId_exist').css('display', 'none');
                            },3000);
                        }
                    }else{
                        $(".healthId_validation_loader").css('display','none');
                        $('.healthId_exist').css('display', 'block');
                        setTimeout(function(){
                            $('.healthId_exist').css('display', 'none');
                        },3000);
                    }
                }, function(e){
                    console.log(e);
                    $(".healthId_validation_loader").css('display','none');
                    $('.healthId_something_wrong').css('display', 'block');
                    setTimeout(function(){
                        $('.healthId_something_wrong').css('display', 'none');
                    },3000);
                });

            }

            $scope.registerModal.showPasswordSection = function(){

                if($scope.registerAccForAbhaAs == 'aadharReg'){

                    $scope.registerModal.loginNameSectionClass = "modal-slide-out-left";
                    $scope.registerModal.healthIDSection = true;
                    $scope.registerModal.healthIDSectionClass = "modal-slide-in-right";
                    $scope.registerModal.fields[12].text = $scope.registerModal.fields[3].text+$scope.registerModal.fields[2].text;
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[12]);
                        $scope.registerModal.loginNameSection = false;
                    },460);
                }else{

                    $scope.registerModal.loginNameSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = true;
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                    $timeout(function() {
                        $rootScope.focusField($scope.registerModal.fields[5]);
                        $scope.registerModal.loginNameSection = false;
                    },500);
                    $scope.registerModal.showCreateConfirmSection();
                    $(".signup_modal_progression_dots3").css('background-color','#bbb');
                    $(".signup_modal_progression_dots4").css('background-color','#3887b2');
                }
            };

            /*$scope.registerModal.showNameSection = function(){

                var elem = document.getElementById("myBar");   
                  var width = 1;
                  var id = setInterval(frame, 10);
                  function frame() {
                    if (width >= 50) {
                        alert("width is 50");
                      clearInterval(id);
                      document.getElementById("numCircle3").classList.add("bg_change3");
                  
                    } else {
                       alert("width isnot 50"); 
                      width++; 
                      width = $rootScope.add_width + width;
                      elem.style.width = width + '%'; 
                    }
                  }
                $scope.registerModal.loginTitle ="login.create.an.account";
               $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.showCreateConfirmSection();

                $scope.registerModal.submitting = false;
                $scope.registerModal.passwordLengthCheck($scope.registerModal.fields[3]);
                
            };
*/
/*First Name Validation and Last Name Validation done by Sumithra starts
****************
When a character is edited(length is added to 1) or deleted(length is decreased by 1) in middle 
validation was not happening properly for LastName and First Name
****************
*/
            $scope.registerModal.FirstNameValidation = function(field){
                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true){
                    var count = $("#firstname").val().length-1;
                    if ((count > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;

                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#firstname").val().length + 1;
                    if ((count > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;

                }
                else{
                if (($("#firstname").val().length > 2) && ($("#lastname").val().length >= 1) && isNaN($("#firstname").val()) == true ){
                    $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                }
                else{
                    $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                }
                }
                if ($("#firstname").val() != "" && Nameformat.test($("#firstname").val()) == true ) {

                    console.log("first name");

                    document.getElementById("firstname").placeholder= "Enter First Name";
                    
                    $scope.registerModal.loginNameSection = true;
                }
                
            } 

    
            $scope.registerModal.LastNameValidation = function(field){               
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true) {
                    var count = $("#lastname").val().length - 1;
                    if ((count > 2) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;
                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#lastname").val().length + 1;
                    if ((count > 2) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;
                }
                else{
                if (($("#lastname").val().length >= 1) && ($("#firstname").val().length > 2) && isNaN($("#lastname").val()) == true ){
                    $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                }
                else{
                    $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                }
                }
                if ($("#lastname").val() != "" && Nameformat.test($("#lastname").val() == true)) {

                    console.log("last name");

                    document.getElementById("lastname").placeholder="Enter Last Name";;
                    
                    $scope.registerModal.loginNameSection = true;
                }
            }

            // Aadhar number validation by Ashley
            $scope.registerModal.AadharSection = function(field){
                // $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                // $scope.registerModal.healthIDSection = true;
                // $scope.registerModal.healthIDSectionClass = "modal-slide-in-right";
                // $timeout(function(){
                //     $rootScope.focusField($scope.registerModal.fields[12]);
                //     $scope.registerModal.loginEmailSection = false;
                // },460);
                // return;
                // console.log($scope.registerModal.fields[2].text + " " + $scope.registerModal.fields[2].text.length);
                if($scope.registerModal.fields[2].text.length == 10 && isNaN($scope.registerModal.fields[2].text) == false){
                    // Encode mobile number RSA
                    $(".mob_no_validation_loader").css('display','block');
                    $(".mob_no_validation_srv_err").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_invalid_error").css('display','none');
                    var mobileNumber = $scope.registerModal.fields[2].text;
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
                                        $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                                        $scope.registerModal.otpSection = true;
                                        $scope.registerModal.otpSectionClass = "modal-slide-in-right";
                                        $scope.transactionId = mobileValidRes.transactionId;
                                        $timeout(function(){
                                            $rootScope.focusField($scope.registerModal.fields[11]);
                                            $scope.registerModal.loginEmailSection = false;
                                        },460);
                                        $rootScope.otpFromMobileAadhar = 'mobileOtp';

                                        $(".mob_no_validation_loader").css('display','none');
                                        $(".mob_no_validation_srv_err").css('display','none');
                                        $(".mob_no_validation_error").css('display','none');
                                        $(".mob_no_invalid_error").css('display','none');

                                    }else{
                                        $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                                        $scope.registerModal.aadharSection = true;
                                        $scope.registerModal.aadharSectionClass = "modal-slide-in-right";
                                        $timeout(function(){
                                            $rootScope.focusField($scope.registerModal.fields[7]);
                                            $scope.registerModal.loginEmailSection = false;
                                        },460);
                                        $(".signup_modal_progression_dots1").css('background-color','#bbb');
                                        $(".signup_modal_progression_dots2").css('background-color','#3887b2');

                                        $(".mob_no_validation_loader").css('display','none');
                                        $(".mob_no_validation_srv_err").css('display','none');
                                        $(".mob_no_validation_error").css('display','none');
                                        $(".mob_no_invalid_error").css('display','none');

                                    }
                                }else{
                                    // invalid input or otp
                                }

                            }, function(e){
                                console.log(e);
                            });
                        }
                    );
                } else if(($scope.registerModal.fields[2].text.length != 10 || isNaN($scope.registerModal.fields[2].text) == false) && $scope.registerModal.fields[2].text != ''){
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_invalid_error").css('display','block');
                    $timeout(function(){
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        $(".mob_no_validation_loader").css('display','none');
                        $(".mob_no_validation_srv_err").css('display','none');
                        $(".mob_no_validation_error").css('display','none');
                        $(".mob_no_invalid_error").css('display','none');
                    },2000);
                } else{
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.aadharSection = true;
                    $scope.registerModal.aadharSectionClass = "modal-slide-in-right";
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[7]);
                        $scope.registerModal.loginEmailSection = false;
                    },460);
                    $(".signup_modal_progression_dots1").css('background-color','#bbb');
                    $(".signup_modal_progression_dots2").css('background-color','#3887b2');

                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_invalid_error").css('display','none');

                }
            }

            // Skip button to skip from OTP to Adhaar or FName LName.
            $scope.registerModal.skipToAadharFnameLnameSection = function(field){
                if($rootScope.otpFromMobileAadhar == 'mobileOtp'){
                    $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                    $scope.registerModal.aadharSection = true;
                    $scope.registerModal.aadharSectionClass = "modal-slide-in-right";
                    $rootScope.skipfromMobileOtp = true;
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[7]);
                        $scope.registerModal.otpSection = false;
                    },460);
                    $(".signup_modal_progression_dots1").css('background-color','#bbb');
                    $(".signup_modal_progression_dots2").css('background-color','#3887b2');
                }else if($rootScope.otpFromMobileAadhar == 'aadharOtp' && $scope.PreviouslyGivenMobile != undefined){
                    $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                    $scope.registerModal.abhaAccAddMobileConfirmExit = true;
                    $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-in-right";
                    $scope.registerModal.abhaAccAddMobButtonClass = "abhaAccAddMob_next_active_btn";
                    $rootScope.skipfromAadharOtp = true;
                    $scope.aadharMobileNotLink = false;
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.otpSection = false;
                    },460);
                    $rootScope.keyboardHide();
                }else if($rootScope.otpFromMobileAadhar == 'skipAadharOtp' || $rootScope.otpFromMobileAadhar == 'skipNewMobToAdharOtp'){
                    $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.otpSection = false;
                    },460);
                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                }else if($rootScope.mobileRegFromLogIn == true){
                    alert("Yes in")
                    $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginEmailSection = true;
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                    $rootScope.mobileRegFromLogIn == true;
                    $rootScope.otpFromMobileAadhar == 'mobileOtp';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[1]);
                        $scope.registerModal.otpSection = false;
                    },460);
                }else{
                    $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.otpSection = false;
                    },460);
                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                }
            }

            // Resend otp button for Mobile or Aadhar
            $scope.registerModal.resendOtpAbha = function(field){
                $scope.registerModal.otpSectionNextButtonClass = '';
                $scope.registerModal.fields[11].text = '';

                if($rootScope.otpFromMobileAadhar == 'mobileOtp'){

                    if($rootScope.tranIdFromMobLogin != undefined) $scope.transactionId = $rootScope.tranIdFromMobLogin;

                    let data = {
                        method : 'mobileEmailOtpResend', 
                        data : {
                            "transactionId": $scope.transactionId
                        }
                    };

                    // Send otp to the aadhar linked mobile number API
                    HigiApiService.getABHASession(data, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            $scope.aadharValidRes = JSON.parse(data.res);

                            if($scope.aadharValidRes.transactionId != undefined){
                                let snackbar = document.getElementById("snackbar");
                                snackbar.className = "green";
                                $rootScope.snackBarAlertText = "OTP sent";
                                setTimeout(function(){
                                    snackbar.className = snackbar.className.replace("green", ""); 
                                    $rootScope.snackBarAlertText = "";
                                },3000);
                            }
                        }
                    });
                }else if($rootScope.otpFromMobileAadhar == 'aadharOtp'){

                    if($rootScope.txdIdFromAadharLogin != undefined) $scope.aadharValidRes.txnId = $rootScope.txdIdFromAadharLogin;

                    let data = {
                        method : 'aadharOtpResend', 
                        data : {
                            "txnId": $scope.aadharValidRes.txnId
                        }
                    };

                    // Resend otp for mobileEmail validation
                    HigiApiService.getABHASession(data, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            $scope.aadharValidRes = JSON.parse(data.res);

                            if($scope.aadharValidRes.txnId != undefined){
                                $(".otp_resend").css('display','block');
                                setTimeout(function(){
                                    $(".otp_resend").css('display','none');
                                },3000);

                            }
                        }
                    })
                }else if($rootScope.otpFromMobileAadhar == 'skipNewMobToAdharOtp'){
                    let data = {
                        method : 'aadharOtpResend', 
                        data : {
                            "txnId": $scope.aadharValidRes.txnId
                        }
                    };

                    // Resend otp for mobileEmail validation
                    HigiApiService.getABHASession(data, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            $scope.aadharValidRes = JSON.parse(data.res);

                            if($scope.aadharValidRes.txnId != undefined){
                                let snackbar = document.getElementById("snackbar");
                                snackbar.className = "green";
                                $rootScope.snackBarAlertText = "OTP sent";
                                setTimeout(function(){
                                    snackbar.className = snackbar.className.replace("green", ""); 
                                    $rootScope.snackBarAlertText = "";
                                },3000);
                            }
                        }
                    });
                }

            }

// First Name Validation and Last Name Validation done by Sumithra ends

            $scope.registerModal.NameEntrySection = function(field){
                console.log($scope.registerModal.fields[2].text);
                console.log($scope.overallAadharFieldValue);

                $(".adr_no_validation_loader").css('display','block');

                if($rootScope.empIdShowInRegFlow == false && $scope.overallAadharFieldValue == ""){
                    $(".adr_no_validation_loader").css('display','none');
                    $scope.registerModal.aadharSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.aadharSection = false;
                    },460);
                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');


                } else if($scope.overallAadharFieldValue !== "" && isNaN($scope.overallAadharFieldValue) == false){

                    let aadharNumOtp = {
                        method : 'generateAadharOtp', 
                        data : {
                            "aadhaar": $scope.overallAadharFieldValue
                        }
                    };

                    // Send otp to the aadhar linked mobile number API
                    HigiApiService.getABHASession(aadharNumOtp, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            $scope.aadharValidRes = JSON.parse(data.res);
                            $(".adr_no_validation_loader").css('display','none');

                            if($scope.aadharValidRes.txnId != undefined){
                                $scope.registerModal.aadharSectionClass = "modal-slide-out-left";
                                $scope.registerModal.otpSection = true;
                                $scope.registerModal.otpSectionClass = "modal-slide-in-right";
                                $scope.registerModal.fields[11].text = '';
                                $scope.registerModal.otpSectionNextButtonClass = '';
                                $rootScope.otpFromMobileAadhar = 'aadharOtp';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[11]);
                                    $scope.registerModal.aadharSection = false;
                                },460);


                            }else{
                                /*$scope.registerModal.aadharSectionClass = "modal-slide-out-left";
                                $scope.registerModal.loginNameSection = true;
                                $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[3]);
                                    $scope.registerModal.aadharSection = false;
                                },460);
                                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                                $(".signup_modal_progression_dots3").css('background-color','#3887b2');*/

                                $(".adr_no_not_exist").css('display','block');
                                $timeout(function(){
                                    $(".adr_no_not_exist").css('display','none');
                                },2000);

                            }
                        }else{
                            $(".adr_no_validation_loader").css('display','none');
                            // invalid input
                        }
                    },
                    function(err){
                        $(".adr_no_validation_loader").css('display','none');
                    });
                    

                } else {// Below code for EmpID section hide 
                    $scope.registerModal.loginEmpIDSectionClass = "modal-slide-out-left";                  
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.loginEmpIDSection = false;
                    },460);
                    $(".signup_modal_progression_dots3").css('background-color','#bbb');
                    $(".signup_modal_progression_dots4").css('background-color','#3887b2');
                    
                    $(".adr_no_validation_loader").css('display','none');
                    
                }
            };

            $scope.registerModal.EmpIDEntrySection = function(field){

                $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";                  

                $scope.registerModal.loginEmpIDSection = true;
                $scope.registerModal.loginEmpIDSectionClass = "modal-slide-in-right";
                $timeout(function(){
                    $rootScope.focusField($scope.registerModal.fields[10]);
                    $scope.registerModal.loginEmailSection = false;
                },460);
                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_modal_progression_dots3").css('background-color','#3887b2'); 
            };



            $scope.registerModal.EmpIDValidation = function(field){
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
            }

            $scope.registerModal.OtpValidation = function(field){
                var str = field.text;
                $scope.registerModal.otpSectionNextButtonClass = '';
                console.log(str);
                if(str.length > 0 && isNaN(str) == false){
                    $scope.registerModal.otpSectionNextButtonClass = 'otpSection_next_active_btn';
                } else {
                    $scope.registerModal.otpSectionNextButtonClass = '';
                }
            }

            $scope.registerModal.validOtpNextSection = function(field){
                var otp = $scope.registerModal.fields[11].text;
                $('.otp_validation_loader').css('display', 'block');
                if($rootScope.otpFromMobileAadhar == 'mobileOtp'){

                    // Encode mobile number RSA
                    var otpNumber = otp;
                    var encodeOtp = new JSEncrypt();

                    if($rootScope.tranIdFromMobLogin != undefined) $scope.transactionId = $rootScope.tranIdFromMobLogin;

                    HigiApiService.encodeAbhaText(
                        function(res){
                            console.log(res);
                            $scope.publicKey = res;
                            encodeOtp.setPublicKey($scope.publicKey);
                            var inputOtp = encodeOtp.encrypt(otpNumber);
                            console.log(inputOtp);

                            let mobOtpPost = {
                                method : 'mobileEmailPreVerf', 
                                data : {
                                    "otp": inputOtp,
                                    "transactionId": $scope.transactionId
                                }
                            };

                            // Pre verification for mobile OTP API

                            HigiApiService.getABHASession(mobOtpPost, function(response){
                                var data = JSON.parse(response);
                                console.log(JSON.parse(data.res));

                                if(data.status == 'S'){
                                    let mobileVerificationRes = JSON.parse(data.res);

                                    $('.otp_validation_loader').css('display', 'none');

                                    if(mobileVerificationRes.mappedPhrAddress != undefined){
                                        if(mobileVerificationRes.mappedPhrAddress.length > 1){
                                            // open modal for selecting wanted Abha account
                                            
                                        }else{
                                            $rootScope.abhaAccIdLinkToIhl = mobileVerificationRes.mappedPhrAddress[0];
        
                                            $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                            $scope.registerModal.loginNameSection = true;
                                            $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                            $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                            if($rootScope.mobileRegFromLogIn == true) $rootScope.mobileRegFromLogIn = false;$scope.registerModal.loginEmailSection = false;$rootScope.tranIdFromMobLogin = undefined;
                                            $timeout(function(){
                                                $rootScope.focusField($scope.registerModal.fields[3]);
                                                $scope.registerModal.otpSection = false;
                                            },460);
                                            $(".signup_modal_progression_dots1").css('background-color','#bbb');
                                            $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                                            $scope.registerAccForAbhaAs = 'mobileReg';
                                            // $('.otp_validation_loader').css('display', 'none');
        
                                        }
                                    }else{
                                        // $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                        // $scope.registerModal.aadharSection = true;
                                        // $scope.registerModal.aadharSectionClass = "modal-slide-in-right";
                                        $('.otp_validation_loader').css('display', 'none');
                                        $('.otp_no_not_exist').css('display', 'block');
                                        setTimeout(function(){
                                            $('.otp_no_not_exist').css('display', 'none');
                                        },3000);
                                        // $timeout(function(){
                                        //     $rootScope.focusField($scope.registerModal.fields[7]);
                                        //     $scope.registerModal.otpSection = false;
                                        // },460);
                                        // $(".signup_modal_progression_dots1").css('background-color','#bbb');
                                        // $(".signup_modal_progression_dots2").css('background-color','#3887b2');          
                                    }
                                }else{
                                    $('.otp_validation_loader').css('display', 'none');
                                    // invalid section
                                }
                            },
                            function(err){
                                $('.otp_validation_loader').css('display', 'none');
                                // show something went wrong.
                            });


                            
                        }
                    );
                } else if($rootScope.otpFromMobileAadhar == 'aadharOtp'){

                    if($rootScope.txdIdFromAadharLogin != undefined){

                        $scope.aadharOtpPost = {
                            method : 'aadharOtpPreVerf', 
                            data : {
                                "otp": otp,
                                "txnId": $rootScope.txdIdFromAadharLogin
                            }
                        };
                    }else{
                        $scope.aadharOtpPost = {
                            method : 'aadharOtpPreVerf', 
                            data : {
                                "otp": otp,
                                "txnId": $scope.aadharValidRes.txnId
                            }
                        };
                    }


                    // Pre verification for Aadhar linked mobile number

                    HigiApiService.getABHASession($scope.aadharOtpPost, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            $scope.aadharVerificationRes = JSON.parse(data.res);
                            $('.otp_validation_loader').css('display', 'none');

                            if($scope.aadharVerificationRes.txnId != undefined){
                                $rootScope.aadharRegFromLogIn = false;
                                $scope.registerModal.loginEmailSection = false;
                                $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                $scope.registerModal.abhaMobileExist = true;
                                $scope.registerModal.abhaMobileSectionClass = "modal-slide-in-right";
                                // $scope.registerModal.abhaMobileNextButtonClass = '';
                                $scope.registerModal.fields[2].text = '';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[2]);
                                    $scope.registerModal.otpSection = false;
                                },460);

                                // $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                // $scope.registerModal.loginNameSection = true;
                                // $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                // $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                // $timeout(function(){
                                //     $rootScope.focusField($scope.registerModal.fields[3]);
                                //     $scope.registerModal.otpSection = false;
                                // },460);
                                // $(".signup_modal_progression_dots2").css('background-color','#bbb');
                                // $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                            } else {
                                $('.otp_validation_loader').css('display', 'none');
                                $('.otp_no_not_exist').css('display', 'block');
                                setTimeout(function(){
                                    $('.otp_no_not_exist').css('display', 'none');
                                },3000);
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            // error response
                        }
                    },
                    function(err){
                        $('.otp_validation_loader').css('display', 'none');
                    });
                }else if($rootScope.otpFromMobileAadhar == 'skipAadharOtp'){

                    let aadharOtpPost = {
                        method : 'verifyAadharLinkedOtp', 
                        data : {
                            "otp": otp,
                            "txnId": $scope.aadharValidRes.txnId
                        }
                    };

                    // Pre verification for given Aadhar mobile whether liked or not

                    HigiApiService.getABHASession(aadharOtpPost, function(response){
                        var data = JSON.parse(response);
                        // console.log(JSON.parse(data.res));
                        let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
                        if(regexForHTML.test(data.res)) data.status = 'E';

                        if(data.status == 'S'){

                            $('.otp_validation_loader').css('display', 'none');

                            if(JSON.parse(data.res).txnId != undefined){
                                $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                $scope.registerModal.loginNameSection = true;
                                $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[3]);
                                    $scope.registerModal.otpSection = false;
                                },460);
                                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                                $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                                $scope.registerAccForAbhaAs = 'aadharReg';
                            }else{
                                $('.otp_validation_loader').css('display', 'none');
                                $('.otp_no_not_exist').css('display', 'block');
                                setTimeout(function(){
                                    $('.otp_no_not_exist').css('display', 'none');
                                },3000);
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            // error resonse
                        }

                    });
                }else if($rootScope.otpFromMobileAadhar == 'skipNewMobToAdharOtp'){
                    
                    if($rootScope.txdIdFromAadharLogin != undefined){

                        $scope.newMobVeryOtp = {
                            method : 'verifyAadharLinkedOtp', 
                            data : {
                                "otp": otp,
                                "txnId": $rootScope.txdIdFromAadharLogin
                            }
                        };
                    }else{
                        $scope.newMobVeryOtp = {
                            method : 'verifyAadharLinkedOtp', 
                            data : {
                                "otp": otp,
                                "txnId": $scope.aadharValidRes.txnId
                            }
                        };
                    }

                    // Pre verification for newly given Aadhar mobile number

                    HigiApiService.getABHASession($scope.newMobVeryOtp, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){

                            $('.otp_validation_loader').css('display', 'none');

                            if(JSON.parse(data.res).txnId != undefined){
                                $scope.registerModal.otpSectionClass = "modal-slide-out-left";
                                $scope.registerModal.loginNameSection = true;
                                $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[3]);
                                    $scope.registerModal.otpSection = false;
                                },460);
                                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                                $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                                $scope.registerAccForAbhaAs = 'aadharReg';
                            }else{
                                $('.otp_validation_loader').css('display', 'none');
                                $('.otp_no_not_exist').css('display', 'block');
                                setTimeout(function(){
                                    $('.otp_no_not_exist').css('display', 'none');
                                },3000);
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            // error handle
                        }
                    }, function(err){
                        $('.otp_validation_loader').css('display', 'none');
                    });
                }
            }

            $scope.registerModal.aadharLinkMobileNextSection = function(field){

                if($scope.registerModal.fields[2].text != ''){
                    if($scope.mobVerifyIHLExist != true){

                        if($rootScope.txdIdFromAadharLogin != undefined){

                            $scope.checktAndGenMob = {
                                method: 'checkAndGenerateMobileOTP',
                                data: {
                                    "mobile": $scope.registerModal.fields[2].text,
                                    "txnId": $rootScope.txdIdFromAadharLogin
                                }
                            };
                        }else{
                            $scope.checktAndGenMob = {
                                method: 'checkAndGenerateMobileOTP',
                                data: {
                                    "mobile": $scope.registerModal.fields[2].text,
                                    "txnId": $scope.aadharValidRes.txnId
                                }
                            };
                        }
                        

                        // Verify aadhar and mobile linked for Abha API

                        HigiApiService.getABHASession($scope.checktAndGenMob, function(response){
                            var data = JSON.parse(response);
                            console.log(JSON.parse(data.res));

                            if(data.status == 'S'){
                                $scope.verAadharMobLink = JSON.parse(data.res);
                
                                if($scope.verAadharMobLink.mobileLinked == true){
                                    $scope.registerModal.abhaMobileSectionClass = "modal-slide-out-left";
                                    $scope.registerModal.loginNameSection = true;
                                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                                    $timeout(function(){
                                        $rootScope.focusField($scope.registerModal.fields[3]);
                                        $scope.registerModal.abhaMobileExist = false;
                                    },460);
                                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                                    $scope.registerAccForAbhaAs = 'aadharReg';
                                }else{
                                    $scope.registerModal.abhaMobileSectionClass = "modal-slide-out-left";
                                    $scope.registerModal.abhaAccAddMobileConfirmExit = true;
                                    $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-in-right";
                                    $scope.registerModal.abhaAccAddMobButtonClass = "abhaAccAddMob_next_active_btn";
                                    $scope.aadharMobileNotLink = true;
                                    $timeout(function(){
                                        // $rootScope.focusField($scope.registerModal.fields[3]);
                                        $scope.registerModal.abhaMobileExist = false;
                                    },460);
                                    $rootScope.keyboardHide();
                                }
                            }else{
                                // error message
                            }

                        },
                        function(err){
                            
                        });
                    }else{
                        $scope.registerModal.abhaMobileNextButtonClass = '';

                    }
                }else{
                    $scope.registerModal.abhaMobileSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.abhaMobileExist = false;
                    },460);
                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                }
            }

            $scope.registerModal.abhaAccAddMobileSectionYes = function(field){
                if($rootScope.skipfromAadharOtp == true){

                    let data = {
                        method: 'generateAadharLinkedOtp',
                        data: {
                            "mobile": $rootScope.PreviouslyGivenMobile,
                            "txnId": $scope.aadharValidRes.txnId
                        }
                    };
    
                    // Send OTP for already given mobile number to link with Abha API
    
                    HigiApiService.getABHASession(data, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));
    
                        if(data.status == 'S'){
                            if(JSON.parse(data.res).txnId != undefined){
                                $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-out-left";
                                $scope.registerModal.otpSection = true;
                                $scope.registerModal.otpSectionClass = "modal-slide-in-right";
                                $rootScope.otpFromMobileAadhar = 'skipAadharOtp';
                                $scope.registerModal.fields[11].text = '';
                                $timeout(function(){
                                    $rootScope.focusField($scope.registerModal.fields[11]);
                                    $scope.registerModal.abhaAccAddMobileConfirmExit = false;
                                },460);
                            }
                        }else{
                            let snackbar = document.getElementById("snackbar");
                            snackbar.className = "show";
                            $rootScope.snackBarAlertText = "Ivalid OTP";
                            setTimeout(function(){
                                snackbar.className = snackbar.className.replace("show", ""); 
                                $rootScope.snackBarAlertText = "";
                            },3000);
                        }
                    })
                    
                }else if($scope.aadharMobileNotLink = true){
                    // let data = {
                    //     method: 'generateMobileLinkAadharOtp',
                    //     data: {
                    //         "mobile": $rootScope.PreviouslyGivenMobile,
                    //         "txnId": $scope.aadharValidRes.txnId
                    //     }
                    // };

                    $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-out-left";
                    $scope.registerModal.otpSection = true;
                    $scope.registerModal.otpSectionClass = "modal-slide-in-right";
                    $rootScope.otpFromMobileAadhar == 'skipNewMobToAdharOtp'
                    $scope.registerModal.fields[11].text = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[11]);
                        $scope.registerModal.abhaAccAddMobileConfirmExit = false;
                    },460);
                    
                }
            }

            $scope.registerModal.abhaAccAddMobileSectionNo = function(field){
                $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-out-left";
                $scope.registerModal.loginNameSection = true;
                $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                $timeout(function(){
                    $rootScope.focusField($scope.registerModal.fields[3]);
                    $scope.registerModal.abhaAccAddMobileConfirmExit = false;
                },460);
                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_modal_progression_dots3").css('background-color','#3887b2');
            }

            $scope.registerModal.backToAddAadharMobile = function(field){
                $scope.registerModal.abhaAccAddMobileSectionClass = "modal-slide-out-left";
                $scope.registerModal.abhaMobileExist = true;
                $scope.registerModal.abhaMobileSectionClass = "modal-slide-in-right";
                $rootScope.otpFromMobileAadhar == 'skipNewMobToAdharOtp'
                $scope.registerModal.fields[2].text = '';
                $timeout(function(){
                    $rootScope.focusField($scope.registerModal.fields[2]);
                    $scope.registerModal.abhaAccAddMobileConfirmExit = false;
                },460);
            }

            $scope.registerModal.showEmailSection = function(defaulting){

                //var str2 = document.getElementById("emailReg2").value;
                //alert(str2);
                //if( str2.length == 12 && isNaN(str2) == false){
                    //$scope.registerModal.nextBtnActive = '';
                //}


                //$scope.registerModal.loginTitle ="login.create.an.account";
                //$scope.registerModal.loginPasswordSectionClass = "modal-slide-out-right";
                //$scope.registerModal.loginEmailSectionClass = (defaulting) ? "modal-slide-in-right" : "modal-slide-out-left";
                //$scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginEmailSectionClass ="modal-slide-in-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                    $scope.registerModal.loginCreateConfirmSection = false;
                }, 500);


                //$scope.emailText = false;

                $(".email_address_validation_loader").hide();
                $(".email_address_validation_error").hide();
                $(".email_address_validation_srv_err").hide();

                $(".mob_no_validation_loader").css('display','none');
                $(".mob_no_validation_error").css('display','none');
                $(".mob_no_validation_srv_err").css('display','none');

                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if($rootScope.registerFlowFirstInput != "email"){
                   $scope.registerModal.MobileSectionNextButtonClass = ''; 
                   $scope.registerModal.emailOrMobileOrAadhaarPatternCheck($scope.registerModal.fields[0]);
                   $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[0]); 
                    },500);
                   $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                } else {
                    $scope.registerModal.mobileNoPatternCheck($scope.registerModal.fields[2]);
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[2]); 
                    },500);
                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                }
                $scope.registerModal.createConfirmClass = "";
                $scope.registerModal.submitting = false;
                $scope.registerModal.loginEmailSection = true;
                $rootScope.keyboardShow();
                //$scope.registerModal.emailPatternCheck($scope.registerModal.fields[1]);                
                //Initialize password incase repeating flow (via back button)
                /*$scope.registerModal.fields[2].text = '';
                document.getElementById($scope.registerModal.fields[2].id).value = $scope.registerModal.fields[2].text;
                $scope.registerModal.fields[2].textMasked = '';*/
                
                $timeout(function(){
                    $(".signup_modal_progression_dots_main_container").css('visibility','visible');
                    $(".signup_modal_progression_dots1").css('background-color','#3887b2');
                },1110);  
            };


            $scope.registerModal.showEmailOrAadhaarSection = function(defaulting){
                $scope.registerModal.loginTitle ="login.create.an.account";
                $scope.registerModal.emailOrMobileOrAadhaar = false;
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-in-left";
                $scope.registerModal.emailOrMobileOrAadhaar = (defaulting) ? "" : "modal-slide-in-left";
                //$("#numCircle4").css("background-color", "#868282");
                $scope.registerModal.loginEmailSection = false;
                $scope.registerModal.loginEmailSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginPasswordSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginCreateFingerprintSection = false;
                $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginCreateFingerprintCapturingSection = false;
                $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-right";
                
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                //$scope.registerModal.loginEmailSectionClass = "modal-slide-out-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                    $scope.registerModal.loginCreateConfirmSection = false;
                }, 500);
                $scope.registerModal.createConfirmClass = "";
                $scope.registerModal.submitting = false;
                $scope.registerModal.emailOrMobileOrAadhaar = false;
                $scope.registerModal.emailOrMobileOrAadhaarPatternCheck($scope.registerModal.fields[0]);
                $rootScope.keyboardShow();
                
                //Initialize password incase repeating flow (via back button)
                /*$scope.registerModal.fields[1].text = '';
                document.getElementById($scope.registerModal.fields[1].id).value = $scope.registerModal.fields[1].text;
                $scope.registerModal.fields[1].textMasked = '';*/
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
                var regexExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if( (($scope.registerModal.fields[5].text).length  < 6) &&  (($scope.registerModal.fields[5].text).length < 6)) return 0;
                //if(($scope.registerModal.termsAccepted == true) && (regexExp.test($scope.registerModal.fields[5].text) == true) && (regexExp.test($scope.registerModal.fields[6].text) == true) && ($scope.registerModal.fields[5].text == $scope.registerModal.fields[6].text)){
                if(($scope.registerModal.termsAccepted == true)  && ($scope.registerModal.fields[5].text == $scope.registerModal.fields[6].text)){
                    
                    $rootScope.keyboardHide(); // keyboard hide for terms and condition show.
                    
                    //JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                
                    $scope.registerModal.registerTermsAcceptanceClass = 'active_checkmark';
                    $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                } else {
                    //JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                    
                    $scope.registerModal.registerTermsAcceptanceClass = '';
                    $scope.registerModal.signupfinalSubmitButtonClass = '';
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

                //login_create_account_email_title should hide
                //emailReg
               // document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
               //document.getElementsByClassName("regMailid").style.display="none !important";

               //$scope.registerModal.validatedEmail =  $scope.registerModal.fields[0].text;
                //$scope.registerModal.removeFocus();
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_passwordNextButton', 'button', 'pressed');
                //$scope.registerModal.loginPasswordSectionClass = "modal-slide-out-left";
                //$scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                // $timeout(function(){
                //     $scope.registerModal.loginPasswordSection = false;
                // }, 500);


                $scope.registerModal.createConfirmClass = "confirm-terms-create-account";
                //$scope.registerModal.loginCreateConfirmSection = true;
                //$scope.registerModal.loginTitle ="login.confirm.account.details";
                //$scope.registerModal.registerButtonClass = '';
                $scope.registerModal.loginTitle = "login.create.an.account";
                $scope.registerModal.bobbleState = false;
                $scope.registerModal.termsAccepted = false;
                $timeout($scope.registerModal.bobble, 1500);


               // $rootScope.keyboardHide();
                //Get terms and ppol
                $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['terms.filename'] + '.html').success(function(data){
                    $scope.registerModal.termsOfServicePpol = data + '<a id="ppol_anchor" name="privacy"></a>';
                    $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                        $scope.registerModal.termsOfServicePpol += data;
                        $scope.registerModal.termsOfServicePpol = $sce.trustAsHtml($scope.registerModal.termsOfServicePpol);
                        //$scope.registerModal.termsScroller = $scope.registerModal.termsScroller || new iScroll("login_tos_privacy_wrapper", {hScroll:false, scrollbarClass:'iscroll_scrollbar' });
                        //$scope.registerModal.termsScroller.scrollTo(0, 0, 1000, false);
                        $scope.registerModal.scroller = new FTScroller(document.getElementById('login_tos_privacy_wrapper'), {scrollingX: false});
                   

                        $timeout(function(){
                            //$scope.registerModal.termsScroller.refresh();
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
                                //$scope.registerModal.termsScroller.scrollTo(0, offset, 1500, false);
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

            $scope.progressionBar = function(){

                $rootScope.add_width = 0;

                    var elem = document.getElementById("myBar");   
                      var width = 1;
                      var id = setInterval(frame, 10);
                      function frame() {
                        if (width >= 25) {
                          clearInterval(id);
                          document.getElementById("numCircle2").classList.add("bg_change2");
                      
                        } 
                        
                        else {
                          width++; 
                          width = $rootScope.add_width + width;
                          elem.style.width = width + '%'; 
                        }
                      }

                          $rootScope.add_width = width;
            };

         

         $scope.registerModal.aadhaarExistsCheck = function(field){
             
            var str2 = document.getElementById("emailReg2").value;
                //alert(str2);
                if( str2.length == 12 && isNaN(str2) == false){
                    $scope.registerModal.nextBtnActive = '';
                }
            var aadhaar_no_new = document.getElementById("emailReg2").value;
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            var aadhaar_no = false;
            var aadhaar_no_empty = true;
            if(aadhaar_no_new != "" && aadhaar_no_new.length == 10 && !isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML =  $scope.interfaceLabels['welcomeModals.emailidnum'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder= $scope.interfaceLabels['welcomeModals.enter.your.emailid'];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.aadhaarnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.adha];
                $scope.registerModal.loginEmailSection = true;
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                
            }
            else if(aadhaar_no_new != "" && aadhaar_no_new.length == 12 && !isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML = $scope.interfaceLabels['welcomeModals.emailidnum'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder= $scope.interfaceLabels['welcomeModals.enter.your.emailid'];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.mobilnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.mmbn];
                $scope.registerModal.loginEmailSection = true;  
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
            }
            else if(aadhaar_no_new != "" && regexEmail.test(aadhaar_no_new) == true && isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML = $scope.interfaceLabels['welcomeModals.aadhaarnumber'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder=$scope.interfaceLabels[$scope.adha];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.mobilnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.mmbn];
                $scope.registerModal.loginEmailSection = true;  
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                
            }
            else{
                $scope.registerModal.nextBtnActive = '';
                //alert("u r not valid");
            }
               
               
         };

            $scope.registerModal.emailExistsCheck = function(field){

                /*function migrateNext() {
                    //alert('Hello');
                }

                document.getElementById("login_username_submit_btn").addEventListener("click", migrateNext);*/

                /*document.getElementsByClassName("active_btn").onclick = function(){
                        //alert("this is else");
                    $scope.registerModal.loginEmailSection = false;
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = true;
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                }*/

                var str = field.text;
                //alert(str);
                if(str == ""){
                    $scope.registerModal.loginEmailSection = false;
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = true;
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                }
               var email_new = document.getElementById("emailReg3").value;
               var mobile_no_new = document.getElementById("mobile_no_focus_new").value;

               var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

               var email = false;
               var mobile_no = false;
               var aadhaar_no = false;
               var email_empty = true;
               var mobile_no_empty = true;
               var aadhaar_no_empty = true;
               $scope.registerModal.mobileValid = false;

               if(email_new != "" && mobile_no_new != "")
               {
                //////alert("email and mobile no are not empty");
                    //Enters when email and password fields are not empty.
                    if(regexEmail.test(email_new))
                    {
                        //Entering when email field is correct
                        //////alert("valid email address");
                            
                        email = true;
                    }   
                    else
                    {
                        //Entering when invalid email address
                        //////alert("inavlid email address");
                        $scope.registerModal.emailValid = false;
                        var para = document.createElement("p");
                                var node = document.createTextNode("Please enter a valid email address");
                                para.id = "email_custom_error";
                                para.appendChild(node);

                                var higi_text_field = document.getElementsByTagName("higi-text-field")[3];
                                //reset email text box
                                document.getElementById("emailReg3").value = "";

                                higi_text_field.appendChild(para);

                                setTimeout(function () {
                                    para.parentNode.removeChild(para);
                                }, 5000);


                                 $scope.registerModal.submitting = false;

                        email = false;

                    } 
                    if(mobile_no_new.length < 12)
                    {   
                        //Entering when mobile no length is not correct
                        //////alert("Invalid mobile length")
                        mobile_no = false;
                    }
                    else
                    {
                        //Entering when mobile no length  is correct
                        //////alert("Valid mobile length");
                        mobile_no = true; 
                        $scope.registerModal.mobileValid = true;
                    }

                    if(email == true && mobile_no == true)
                    {
                        //////alert("email and mobile nos are true");
                         $scope.registerModal.emailValid = true;
                         $scope.registerModal.mobileValid = true;
                        $scope.progressionBar();

                            HigiApiService.checkEmailExist(field.text,
                                //Doesn't exist, move forward
                                function () {
                                    
                                    $scope.registerModal.showPasswordSection();

                                    //document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
                                    //document.getElementsByClassName("regMailid").style.display="none !important";

                                },
                                //Exists, show exists error
                                function () {

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


                    }
                    if(mobile_no == false)
                    {

                        var para1 = document.createElement("p");
                                var node1 = document.createTextNode("Mobile no should be minimum 10 digit.");
                                para1.id = "mobileno_custom_error";
                                para1.appendChild(node1);

                                var higi_text_field1 = document.getElementsByTagName("higi-text-field")[3];

                                document.getElementById("mobile_no_focus_new").value = "";
                                higi_text_field1.appendChild(para1);

                                setTimeout(function () {
                                    para1.parentNode.removeChild(para1);
                                }, 5000);

                                $scope.registerModal.mobileValid = false;
                                 $scope.registerModal.submitting = false;
                    }
                    if(mobile_no == true)
                    {
                        $scope.registerModal.mobileValid = true;
                        $scope.registerModal.submitting = true;
                    }   
                    if(mobile_no ==true && email == false || mobile_no ==false && email == true)
                    {
                        $scope.registerModal.submitting = false;
                    }

               }
               else if(email_new != "")
               {
                    //Entering inside when email field is not empty
                   // //////alert("email is not empty");

                    if(regexEmail.test(email_new))
                    {
                        //Entering when email field is correct
                       // //////alert("valid email address");
                            
                        email = true;
                    }   
                    else
                    {
                        //Entering when invalid email address
                         $scope.registerModal.emailValid = false;
                        ////////alert("invalid email address");
                        var para = document.createElement("p");
                                var node = document.createTextNode("Please enter a valid email address");
                                para.id = "email_custom_error";
                                para.appendChild(node);

                                var higi_text_field = document.getElementsByTagName("higi-text-field")[3];
                                //reset email text box
                                document.getElementById("emailReg3").value = "";

                                higi_text_field.appendChild(para);

                                setTimeout(function () {
                                    para.parentNode.removeChild(para);
                                }, 5000);


                                 $scope.registerModal.submitting = false;

                        email = false;

                    } 
                    if(email == true)
                    {   

                        $scope.registerModal.emailValid = true;
                        $scope.progressionBar();

                            HigiApiService.checkEmailExist(field.text,
                                //Doesn't exist, move forward
                                function () {
                                    
                                    $scope.registerModal.showPasswordSection();

                                    //document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
                                    //document.getElementsByClassName("regMailid").style.display="none !important";

                                },
                                //Exists, show exists error
                                function () {

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

                    }



                    
               }
               else if(mobile_no_new != "")
               {
                    //Entering when mobile no field is not empty
                    ////////alert("mobile no is not empty");

                    if(mobile_no_new.length < 10)
                    {
                        $scope.registerModal.mobileValid = false;
                         mobile_no = false;
                    }
                    else
                    {
                        $scope.registerModal.mobileValid = true;
                        mobile_no = true;
                    }
                    if(mobile_no == true)
                    {
                        $scope.progressionBar();
                        $scope.registerModal.showPasswordSection();
                        //$scope.registerModal.submitting = true;
                    } 

                    else
                    {
                        var para1 = document.createElement("p");
                                var node1 = document.createTextNode("Mobile no should be minimum 10 digit.");
                                para1.id = "mobileno_custom_error";
                                para1.appendChild(node1);

                                var higi_text_field1 = document.getElementsByTagName("higi-text-field")[3];

                                document.getElementById("mobile_no_focus_new").value = "";
                                higi_text_field1.appendChild(para1);

                                setTimeout(function () {
                                    para1.parentNode.removeChild(para1);
                                }, 5000);


                                 $scope.registerModal.submitting = false;
                    }

                    
               }



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

           $scope.focus_control = function(){
                document.getElementById("mobile_no_focus").focus();
                //document.getElementById("emailReg").blur();
                //emailReg
           };

           $scope.testingFunction = function(){
                console.log("inside testing function");
                $scope.modelCloseBtnShowHide("hide");

                document.getElementById("fingerprint_capturing_animation_section").style.display = "block";

                var quality = 60; //(1 to 100) (recommanded minimum 55)
                var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
                var i = 1; 

                $scope.Capture(quality,timeout);
            };




           $scope.withoutFingerprint = function(){

                var emailGet = "";
                var mobileGet = "";
                var aadhaarGet = "";
                var affiliateGet = "";
                var fieldValueEmail = $scope.registerModal.fields[0].text;
                var fieldValue = $scope.registerModal.fields[2].text;
                var fieldValue2 = $scope.overallAadharFieldValue;
                var firstNameTextBoxValue = $scope.registerModal.fields[3].text;
                var lastNameTextBoxValue = $scope.registerModal.fields[4].text;
                var passwordGet = $scope.registerModal.fields[5].text;
                var EmpID = $scope.registerModal.fields[10].text;
                var txnId = $scope.aadharValidRes.txnId;
                var abhaHealthid = $scope.registerModal.fields[12].text;
                
                if (fieldValueEmail != "" && (isNaN(fieldValueEmail) == true) && fieldValueEmail != null && fieldValueEmail != undefined) {
                    
                    emailGet = fieldValueEmail;
                }else{
                    
                    emailGet = "";
                }
                
                if(fieldValue.length == 10 && (isNaN(fieldValue) == false) && fieldValue != null && fieldValue != undefined){
                    
                    mobileGet = fieldValue;
                }else{
                    
                    mobileGet = "";
                }

                if(fieldValue2.length == 12 && (isNaN(fieldValue2) == false) && fieldValue2 != null && fieldValue2 != undefined){
                    
                    aadhaarGet = fieldValue2;
                }else{
                    
                    aadhaarGet = "";
                }

                if($rootScope.newAccountEmailID != "" && (isNaN($rootScope.newAccountEmailID) == true) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined ){
                    
                    emailGet = $rootScope.newAccountEmailID;
                }else if($rootScope.newAccountEmailID.length == 10 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                    
                    mobileGet = $rootScope.newAccountEmailID;
                }else if($rootScope.newAccountEmailID.length == 12 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                    
                    aadhaarGet = $rootScope.newAccountEmailID;
                }

                if ($scope.affiliateValue != "" && $scope.affiliateValue != null && $scope.affiliateValue != undefined){
                    affiliateGet = $scope.affiliateValue;
                }else{
                    affiliateGet = "";
                }

                if($scope.registerAccForAbhaAs == 'mobileReg'){
                        
                    let getTokenMob = {
                        method : 'getUserTokenForMobEm', 
                        data : {
                            "phrAddress": $rootScope.abhaAccIdLinkToIhl,
                            "transactionId": $scope.transactionId
                        }
                    };

                    HigiApiService.getABHASession(getTokenMob, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            if(JSON.parse(data.res).token != undefined){
                                $scope.tokenForMobEmLog = JSON.parse(data.res).token
                                let getMobUserDetail = {
                                    method : 'getProfileDetailsFromMobileToken', 
                                    data : $scope.tokenForMobEmLog
                                };
                                
                                HigiApiService.getABHASession(getMobUserDetail, function(response){
                                    var data = JSON.parse(response);
                                    console.log(JSON.parse(data.res));

                                    if(data.status == 'S'){
                                        //yes...
                                        if(JSON.parse(data.res).phrAddress != undefined){
                                            $scope.abhaUserDetails = JSON.parse(data.res);
                                            /*{
                                                "phrAddress": "monish1999@sbx",
                                                "fullName": "Monish",
                                                "firstName": "Monish",
                                                "lastName": "",
                                                "middleName": "",
                                                "gender": "M",
                                                "email": "",
                                                "emailVerified": false,
                                                "mobile": "8807705411",
                                                "mobileVerified": true,
                                                "dayOfBirth": "30",
                                                "monthOfBirth": "11",
                                                "yearOfBirth": "1999",
                                                "dateOfBirth": "30-11-1999",
                                                "kycStatus": "PENDING",
                                                "address": {
                                                    "countryName": "INDIA",
                                                    "countryCode": "1",
                                                    "stateCode": "",
                                                    "districtCode": "",
                                                    "addressLine": "",
                                                    "pincode": ""
                                                },
                                                "authMode": [
                                                    "PASSWORD",
                                                    "MOBILE_OTP"
                                                ],
                                                "abhaAddresses": [
                                                    {
                                                        "fullName": "Monish",
                                                        "phrAddress": "monish1999@sbx",
                                                        "profilePhoto": null
                                                    }
                                                ]
                                            }*/

                                            let getAbhaCard = {
                                                method : 'getAbhaCardFromMobToken', 
                                                data : $scope.tokenForMobEmLog
                                            };

                                            HigiApiService.getABHASession(getAbhaCard, function(response){
                                                var data = JSON.parse(response);
                                                console.log(JSON.parse(data.res));
        
                                                if(data.status == 'S'){
                                                    
                                                    $scope.abhaCardGetFromToken = JSON.parse(data.res);

                                                    let getAbhaQrCode = {
                                                        method : 'getAbhaQrCardCode', 
                                                        data : $scope.tokenForMobEmLog
                                                    };
                                                    
                                                    HigiApiService.getABHASession(getAbhaQrCode, function(response){
                                                        var data = JSON.parse(response);
                                                        console.log(JSON.parse(data.res));
                
                                                        if(data.status == 'S'){
                                                            $scope.abhaQrCardFromToken = JSON.parse(data.res);
                                                        }
                                                    },function(err){
                                                        $('#confirm_password_text_match').css({'color' : 'red'});
                                                        document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                        $timeout(function(){
                                                            document.getElementById('confirm_password_text_match').innerText = '';
                                                        },2000);
                                                        $scope.somethingWentWrong = true;
                                                    });
                                                }else{
                                                    $('#confirm_password_text_match').css({'color' : 'red'});
                                                    document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                    $timeout(function(){
                                                        document.getElementById('confirm_password_text_match').innerText = '';
                                                    },2000);
                                                    $scope.somethingWentWrong = true;
                                                }
                                            },function(err){
                                                $('#confirm_password_text_match').css({'color' : 'red'});
                                                document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                $timeout(function(){
                                                    document.getElementById('confirm_password_text_match').innerText = '';
                                                },2000);
                                                $scope.somethingWentWrong = true;
                                            });
                                        }else{
                                            $('#confirm_password_text_match').css({'color' : 'red'});
                                            document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                            $timeout(function(){
                                                document.getElementById('confirm_password_text_match').innerText = '';
                                            },2000);
                                            $scope.somethingWentWrong = true;    
                                        }
                                    }else{
                                        $('#confirm_password_text_match').css({'color' : 'red'});
                                        document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                        $timeout(function(){
                                            document.getElementById('confirm_password_text_match').innerText = '';
                                        },2000);
                                        $scope.somethingWentWrong = true;
                                    }

                                }, function(err){
                                    $('#confirm_password_text_match').css({'color' : 'red'});
                                    document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                    $timeout(function(){
                                        document.getElementById('confirm_password_text_match').innerText = '';
                                    },2000);
                                    $scope.somethingWentWrong = true;
                                });
                                
                            }else{
                                $('#confirm_password_text_match').css({'color' : 'red'});
                                document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                $timeout(function(){
                                    document.getElementById('confirm_password_text_match').innerText = '';
                                },2000);
                                $scope.somethingWentWrong = true;
                            }
                        }else{
                            $('#confirm_password_text_match').css({'color' : 'red'});
                            document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                            $timeout(function(){
                                document.getElementById('confirm_password_text_match').innerText = '';
                            },2000);
                            $scope.somethingWentWrong = true;
                        }
                    }, function(err){
                        $('#confirm_password_text_match').css({'color' : 'red'});
                        document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                        $timeout(function(){
                            document.getElementById('confirm_password_text_match').innerText = '';
                        },2000);
                        $scope.somethingWentWrong = true;
                    });

                }else if($scope.registerAccForAbhaAs == 'aadharReg'){
                    let createAbhaPayload = {
                        method : 'createAbhaNoUsingAadharMob', 
                        data : {
                            "email": emailGet,
                            "firstName": firstNameTextBoxValue,
                            "healthId":  abhaHealthid,
                            "lastName": lastNameTextBoxValue,
                            "middleName": "",
                            "password": passwordGet,
                            "profilePhoto": "",
                            "txnId": txnId
                        }
                    };

                    HigiApiService.getABHASession(createAbhaPayload, function(response){
                        var data = JSON.parse(response);
                        console.log(JSON.parse(data.res));

                        if(data.status == 'S'){
                            if(JSON.parse(data.res).healthId != undefined){
                                $scope.registerByAadhar = true;
                                $scope.abhaUserDetails = JSON.parse(data.res);
                            }else{
                                $('#confirm_password_text_match').css({'color' : 'red'});
                                document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                $timeout(function(){
                                    document.getElementById('confirm_password_text_match').innerText = '';
                                },2000);
                                $scope.somethingWentWrong = true;
                            }
                        }else{
                            $('#confirm_password_text_match').css({'color' : 'red'});
                            document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                            $timeout(function(){
                                document.getElementById('confirm_password_text_match').innerText = '';
                            },2000);
                            $scope.somethingWentWrong = true;
                        }
                    },function(err){
                        $('#confirm_password_text_match').css({'color' : 'red'});
                        document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                        $timeout(function(){
                            document.getElementById('confirm_password_text_match').innerText = '';
                        },2000);
                        $scope.somethingWentWrong = true;
                    });
                }

                if($scope.somethingWentWrong == false){
                    try {  

                        var jsontext9;
    
                        //alert("not empty"+ $scope.affiliateValue);
                        jsontext9   = '{"user":{"employee_id":"'+EmpID+'","email":"'+emailGet+'","fingerprint":"", "mobileNumber": "'+mobileGet+'", "aadhaarNumber":"'+aadhaarGet+'", "firstName":"'+firstNameTextBoxValue+'", "lastName":"'+lastNameTextBoxValue+'", "affiliate":"'+affiliateGet+'", "terms":{"termsFileName":"termsofuse_v9_01122016"},"privacyAgreed":{"privacyFileName":"privacypolicy_v7_08112014"}},"password":"'+passwordGet+'","encryptionVersion":null}';
                        console.log(jsontext9);
                        //return false;
                        var baseUrl2 = "azureapi.indiahealthlink.com";
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
                                $rootScope.ApiToken = token;
                                //for affiliation 
                                $scope.initialToken = json.ApiKey;
                                //for affiliation end
    
                                $.ajax({
                                    url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailGet + "&mobile=" + mobileGet + "&aadhaar=" + aadhaarGet,
                                    type : "GET", 
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',  
                                    headers:{"ApiToken":token},
                                    success: function(html){
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        //alert(emailOrMobileExist);
                                        emailOrMobileExist = emailOrMobileExist.replace(/^"(.*)"$/, '$1');
                                        if(emailOrMobileExist == ""){
                                            var finalInput = "";
                                            /*if(emailGet == "" && aadhaarGet == ""){
                                                finalInput = mobileGet;
                                            }
                                            else if(emailGet == "" && mobileGet == ""){
                                                finalInput = aadhaarGet;
                                            }
                                            else if(aadhaarGet == "" && mobileGet == ""){
                                                finalInput = emailGet;
                                            }
                                            else if(aadhaarGet == ""){
                                                finalInput = emailGet;
                                            }
                                            else if(mobileGet == ""){
                                                finalInput = emailGet;
                                            }
                                            else if(emailGet == ""){
                                                finalInput = emailGet;
                                            }
                                            else{
                                                finalInput = mobileGet;
                                            }*/
                                            finalInput = $rootScope.newAccountEmailID;
                                            $.ajax({
                                                url: getSettingsValue('kiosk.api.url') + "/data/user",
                                                type : "PUT",
                                                cache: false,
                                                data:jsontext9,
                                                contentType: 'application/json; charset=UTF-8',
                                                dataType: 'json',
                                                headers: { 'ApiToken': token },
                                                success: function(html){
                                                    var json3= JSON.parse(JSON.stringify(html));
                                                    var jss3=JSON.stringify(json3);
                                                    console.log(json3);
                                                    //var jsontext2 = '{"email": "'+finalInput+'"}';
                                                    //debugger;
    
                                                    if($scope.abhaQrCardFromToken != undefined || $scope.registerByAadhar){
    
                                                        if($scope.abhaUserDetails.healthId != undefined){
                                                            $scope.user_abha_number = $scope.abhaUserDetails.healthId;
                                                        }else if($scope.abhaUserDetails.phrAddress != undefined){
                                                            $scope.user_abha_number = $scope.abhaUserDetails.healthId;
                                                        }
    
                                                        let storeAbhaDetailsIhl = {
                                                            method: 'storeIhlUserAbhaDetails',
                                                            data: {
                                                                ihl_user_id : json3.id,
                                                                user_email: $scope.abhaUserDetails.email != undefined? $scope.abhaUserDetails.email : '', // optional
                                                                user_mobile: $scope.abhaUserDetails.mobile != undefined? $scope.abhaUserDetails.mobile.toString() : '',  // optional
                                                                user_adhar: aadhaarGet,
                                                                abha_number: $scope.abhaUserDetails.healthIdNumber != undefined? $scope.abhaUserDetails.healthIdNumber.toString() : '',
                                                                abha_address: $scope.user_abha_number,
                                                                self:false,  // optional
                                                                abha_card: $scope.abhaCardGetFromToken,
                                                                abha_qr_code: $scope.abhaQrCardFromToken
                                                            }
                                                        }
    
                                                        HigiApiService.getABHASession(storeAbhaDetailsIhl, function(response){
                                                            var data = JSON.parse(response);
                                                            console.log(JSON.parse(data.res));
                                
                                                            if(data.status == 'S'){
                                                                if(JSON.parse(data.res) != undefined){
                                                                    // to flex as per the response
                                                                }else{
                                                                    $('#confirm_password_text_match').css({'color' : 'red'});
                                                                    document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                                    $timeout(function(){
                                                                        document.getElementById('confirm_password_text_match').innerText = '';
                                                                    },2000);
                                                                    $scope.somethingWentWrong = true;        
                                                                }
                                                            }else{
                                                                $('#confirm_password_text_match').css({'color' : 'red'});
                                                                document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                                $timeout(function(){
                                                                    document.getElementById('confirm_password_text_match').innerText = '';
                                                                },2000);
                                                                $scope.somethingWentWrong = true;
                                                            }
                                                        },function(err){
                                                            $('#confirm_password_text_match').css({'color' : 'red'});
                                                            document.getElementById('confirm_password_text_match').innerText = 'Something went wrong';
                                                            $timeout(function(){
                                                                document.getElementById('confirm_password_text_match').innerText = '';
                                                            },2000);
                                                            $scope.somethingWentWrong = true;
                                                        });
    
                                                    }
    
                                                    var jsontext2 = '{"email": "'+finalInput+'", "password":"'+passwordGet+'", "encryptionVersion": '+null+'}';
                                                    $.ajax({
                                                       // url: getSettingsValue('kiosk.api.url') + "/login/quickUserLoginOnlyEmail",
                                                       url: getSettingsValue('kiosk.api.url') + "/login/qlogin2",
                                                        type : "POST", 
                                                        cache: false,
                                                        data:jsontext2,
                                                        contentType: 'application/json; charset=UTF-8',  
                                                        dataType: 'json',
                                                        headers: { 'ApiToken': token, 'Token':  json3.token},
                                                        success: function(html){
                                                            console.log(html);
                                                            $scope.isLoadingSignup = false;
                                                            $scope.affiliateLoginResponse = html;
    
                                                            $scope.updateAffiliateStatus();
    
                                                            var qlogin = html;
                                                            $rootScope.userToken = qlogin.Token;
                                                            $rootScope.UserInfo = qlogin.User;
                                                            var callback = $rootScope.saveCheckinFinalResultsLogin;
                                                            $scope.registerModal.watch();
                                    
                                                            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                                            HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                                            
                                                            // session storage for telemedi registeration flow start
                                                            //````````````````````````````````````````````````````````````
                                
                                                            HigiKioskStorageService.saveSessionData('telemedloginUserId' , qlogin.User.id);
                                                            HigiKioskStorageService.saveSessionData('qlogin' , qlogin);
    
                                                            $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
    
                                                            HigiKioskStorageService.saveSessionData('loginResp', qlogin);
                                                            var affiliateUserId = qlogin.User.id;
                                                            HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
    
                                                            $rootScope.UserToken = qlogin.Token;
                                    
                                                            HigiKioskStorageService.saveSessionData('telemedUserEmail' , qlogin.User.email);
                                                            HigiKioskStorageService.saveSessionData('telemedUserFirstName' , qlogin.User.firstName);
                                                            HigiKioskStorageService.saveSessionData('telemedUserLastName' , qlogin.User.lastName);
                                    
                                                            if(qlogin.User.dateOfBirth != undefined){
                                                                HigiKioskStorageService.saveSessionData('telemedUserDOB' , qlogin.User.dateOfBirth.replace("/", "-"));
                                                            } else {
                                                                HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                                                            }    
                                                            if(qlogin.User.gender != undefined){
                                                                if(qlogin.User.gender == "m"){                                     
                                                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                                                                } else {
                                                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                                                                }
                                                            } else {
                                                                HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");  // dummy date provide for telemedi registeration
                                                            }
    
                                                            if(qlogin.User.mobileNumber != undefined && qlogin.User.mobileNumber != ""){  // mobile number is optional for ihl registeration flow             
                                                                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , qlogin.User.mobileNumber);
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
                                                            $scope.checkForKioskPaymentOptions();
                                                        },
                                                    });
                                                },
                                                error : function(xhr, status, error) { 
                                                    $scope.isLoadingSignup = false;
                                                    $scope.signupError = true;
                                                    $timeout(function(){
                                                        $scope.signupError = false;
                                                        $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                                                    }, 7000);
                                                } 
                                            });
                                        }
                                        else{
                                            $scope.registerModal.init();
                                            document.getElementById("guy-1").style.display = "none";
                                            document.getElementById("scanning_line").style.display = "none";
                                        }
                                    },error: function(xhr,status,error){
                                        $scope.isLoadingSignup = false;
                                        $scope.signupError = true;
                                        $timeout(function(){
                                            $scope.signupError = false;
                                            $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                                        }, 7000);
                                    }
                                });
                            },error: function(xhr,status,error){
                                $scope.isLoadingSignup = false;
                                $scope.signupError = true;
                                $timeout(function(){
                                    $scope.signupError = false;
                                    $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                                }, 7000);
                            }
                        });
                    }catch (e) {
                    }
                }
                return false;
            };

                        

function dataURItoBlob(dataURI)
{
////////alert('before loop');
    var byteString = atob(dataURI.split(',')[1]);

    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++)
    {
        ia[i] = byteString.charCodeAt(i);
    }
////////alert("after loop");
    var bb = new Blob([ab], { "type": mimeString });
    return bb;
}



//            $scope.Capture = function(quality,timeout)
//            {
//             if($scope.registerModal.skipFingerprintCalled == true){
//                 return;
//             }
//                         var emailGet = "";
//                         var mobileGet = "";
//                         var aadhaarGet = "";
//                         var fieldValue = $scope.registerModal.fields[0].text;
//                         var fieldValue2 = $scope.registerModal.fields[1].text;
//                         var fieldValue3 = $scope.registerModal.fields[2].text;

//       var firstNameTextBoxValue = $scope.registerModal.fields[4].text;
//                         var lastNameTextBoxValue = $scope.registerModal.fields[5].text;
                     

//                         if(isNaN(fieldValue) == true){
//                             emailGet = fieldValue;
//                         }
//                         else if(isNaN(fieldValue2) == true){
//                             emailGet = fieldValue2;
//                         }
//                         else if(isNaN(fieldValue3) == true){
//                             emailGet = fieldValue3;
//                         }
//                         else{
//                             emailGet = "";
//                         }


//                         if(fieldValue.length == 10 && isNaN(fieldValue) == false){
//                             mobileGet = fieldValue;
//                         }
//                         else if(fieldValue2.length == 10 && isNaN(fieldValue2) == false){
//                             mobileGet = fieldValue2;
//                         }
//                         else if(fieldValue3.length == 10 && isNaN(fieldValue3) == false){
//                             mobileGet = fieldValue3;
//                         }
//                         else{
//                             mobileGet = "";
//                         }


//                         if(fieldValue.length == 12 && isNaN(fieldValue) == false){
//                             aadhaarGet = fieldValue;
//                         }
//                         else if(fieldValue2.length == 12 && isNaN(fieldValue2) == false){
//                             aadhaarGet = fieldValue2;
//                         }
//                         else if(fieldValue3.length == 12 && isNaN(fieldValue3) == false){
//                             aadhaarGet = fieldValue3;
//                         }
//                         else{
//                             aadhaarGet = "";
//                         }






                        

//                         var passwordGet = document.getElementById('passwordReg').value;
//                 try {
//                 document.getElementById('myFinalOutput2').src = "data:image/bmp;base64,";
                
                
//                 var res = CaptureFinger(quality, timeout);
//                 res.httpStaus = true;
//                     $scope.registerModal.loginCreateFingerprintSection = false;
//                 $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
               
                    
//                     document.getElementById("fingerprint_animation_fornow").style.display = "block";
//                     document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                    
//                     $scope.registerModal.loginCreateFingerprintCapturingSection = true;
//                     $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-right";
              
//                 if (res.httpStaus) {
//                     if (res.data.ErrorCode == "0") {
//                         document.getElementById('myFinalOutput2').src = "data:image/bmp;base64," + res.data.BitmapData;
//                         var imageinfo = "Quality: " + res.data.Quality + " Nfiq: " + res.data.Nfiq + " W(in): " + res.data.InWidth + " H(in): " + res.data.InHeight + " area(in): " + res.data.InArea + " Resolution: " + res.data.Resolution + " GrayScale: " + res.data.GrayScale + " Bpp: " + res.data.Bpp + " WSQCompressRatio: " + res.data.WSQCompressRatio + " WSQInfo: " + res.data.WSQInfo;
//                         console.log("ISO Template: " + res.data.IsoTemplate);
//                         var myFinalOutput2 = document.getElementById("myFinalOutput2");
//                         myFinalOutput2.setAttribute('src', "data:image/jpg;base64," + res.data.BitmapData);
//                         var finaloutputimage = "data:image/jpg;base64," + res.data.BitmapData;
                        
//                         var formData = new FormData();
// formData.append("machineState", "tamil nadu");
// formData.append("machineCity", "chennai");
// formData.append("machineOrganisation", "srushty");
// formData.append("kioskId", "228857");
// formData.append("email", emailGet);
// formData.append("mobileNumber", mobileGet);
// formData.append("termsFileName", "termsofuse_v9_01122016");
// formData.append("privacyFileName", "privacypolicy_v7_08112014");
// formData.append("password", passwordGet);
// formData.append("encryptionVersion", null);
// formData.append("aadhaarNumber", aadhaarGet);

// formData.append("firstname", firstNameTextBoxValue);
// formData.append("lastname", lastNameTextBoxValue);


// var imageObj = new Image();
//                             var canvass = document.getElementById('myFinalOutput2');
//                             imageObj.id = "pic";
//                             imageObj.src = canvass.toDataURL();
//                         var blob = dataURItoBlob(finaloutputimage);
//                         formData.append("image", blob);


// console.log(canvass.toDataURL());
// var baseUrl2 = "azureapi.indiahealthlink.com";
// //alert("this is the break");
// $.ajax({
//   url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
//   type : "GET", 
//   cache: false,
//   dataType: 'json',
//   headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
//   success: function(html){
//     var json = JSON.parse(JSON.stringify(html));
//     var jss=JSON.stringify(json);
//     console.log(json);
//     var token = json.ApiKey;
//                           $.ajax({
//                             url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + formData.get('email') + "&mobile=" + formData.get('mobileNumber') + "&aadhaar=" + formData.get('aadhaarNumber'),
//                             type : "GET", 
//                             cache: false,
//                             contentType: 'application/json; charset=UTF-8',  
//                             headers:{"ApiToken":token},
//                             success: function(html){
//                                 console.log(JSON.stringify(html));
//                                 emailOrMobileExist = JSON.stringify(html);
//                                 emailOrMobileExist = emailOrMobileExist.replace(/^"(.*)"$/, '$1');
//                                 if(emailOrMobileExist == ""){
//                           var finalInput = "";
//                           if(emailGet == "" && aadhaarGet == ""){
//                             finalInput = mobileGet;
//                           }
//                           else if(emailGet == "" && mobileGet == ""){
//                             finalInput = aadhaarGet;
//                           }
//                           else if(aadhaarGet == "" && mobileGet == ""){
//                             finalInput = emailGet;
//                           }
//                           else if(aadhaarGet == ""){
//                             finalInput = emailGet;
//                           }
//                           else if(mobileGet == ""){
//                             finalInput = emailGet;
//                           }
//                           else{
//                             finalInput = mobileGet;
//                           }
//                       $.ajax({
//                         url: "https://azureapi.indiahealthlink.com/data/CreateNewUserForFingerprint2",
//                         type : "POST", 
//                         data:formData,
//                         processData:false,
//                         contentType: false,
//                         headers: { 'ApiToken': token },
//                             success: function(html){
//                           var json3= JSON.parse(JSON.stringify(html));
//                           var jss3=JSON.stringify(json3);
//                           console.log(json3.status);

//                           if(json3.status == "Matching not found"){


//                             var jsontext2 = 
//                             '{"email": "'+finalInput+'"}';
//                             $.ajax({
//                               url: "https://azureapi.indiahealthlink.com/login/quickUserLoginOnlyEmail",
//                               type : "POST", 
//                               cache: false,
//                               data:jsontext2,
//                                contentType: 'application/json; charset=UTF-8',  
//                                dataType: 'json',
//                             headers: { 'ApiToken': token },
//                               success: function(html){
//                                //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
//                                console.log(html);
  
//                                var qlogin = html;
//                                //////alert(qlogin.Token);
                               
//                                //if($route.current.$$route.originalPath.search("finish") != -1){
//                       var callback = $rootScope.saveCheckinFinalResultsLogin;
//                   //} else {
//                     //  var callback = null;
//                   //}
  
                               
//                                   $scope.registerModal.watch();
                                  
//                                       JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
//                                       HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                  
                              
                              
//                             },
//                             });
//                           }

//                           else{
//                             $scope.registerModal.loginCreateFingerprintCapturingSection = false;
//                             $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
//                               $scope.registerModal.fingerprintAlreadyExistsSection = true;
//                               $scope.registerModal.fingerprintAlreadyExistsSectionClass = "modal-slide-in-right";
//                               document.getElementById("fingerprint_already_exists").style.display = "block";
//                           }
                          
//                           },
//                           error : function(xhr, status, error) { 
//                                 //////alert('failures 3'+xhr.responseText);

//                              } 
//                         });
//                   }
//                   else{
//                     ////////alert($scope.registerModal.loginMobileNumberError);
//                     $scope.registerModal.init();
//                     document.getElementById("guy-1").style.display = "none";
//                     document.getElementById("scanning_line").style.display = "none";
//                   }
// }
// });
// }
// });


                        
//                     }
//                     else{

//                         $scope.registerModal.loginCreateFingerprintCapturingSection = false;
//                         $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                        
//                         $scope.registerModal.fingerprintRegretSectionNew = true;
//                         $scope.registerModal.fingerprintRegretSectionNewClass = "modal-slide-in-right";
                        
//                 setTimeout(
//                     function() {
//                         $scope.registerModal.fingerprintRegretSectionNew = false;
//                         $scope.registerModal.fingerprintRegretSectionNewClass = "modal-slide-out-left";
//                         $scope.registerModal.loginCreateFingerprintSection = true;
//                         $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
//                         $scope.registerModal.register();
//                         }, 5000);
//                     }
//                 }
//                 else {
//                     //////alert("hai" + res.err);
//                 }            
//             }
//             catch (e) {
//                 //////alert("bye" + e);
//             }
//             return false;

//            };

        $scope.Capture = function (quality, timeout) {
        if($scope.registerModal.skipFingerprintCalled == true){
                return;
        }
        else{
            document.getElementById('myFinalOutput2').src = "data:image/bmp;base64,";
            $scope.registerModal.loginCreateFingerprintSection = false;
            $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-out-left";
            if ($rootScope.hardwareAvailability['Fingerprint']) {
              document.getElementById("fingerprint_animation_fornow").style.display = "block";
              document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
              $scope.registerModal.loginCreateFingerprintCapturingSection = true;
              $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-in-right";
              JkioskService.fingerprintCapture($scope.fingerprintCaptureResponse); // fingerprint image capturing
            } else {
                console.log("fingerprint device not detected");
                $scope.modelCloseBtnShowHide("show");
                $scope.fingerprintError = "welcomeModals.fingerprintNotConnected";
                $scope.registerModal.loginCreateFingerprintCapturingSection = false;
                $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";

                $scope.fpErrorInfoTxt = "welcomeModals.fpReaderNotConnected";
                $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_error";
                document.getElementById("fingerprint_section_login_register").style.display = "block";                 
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginTitle = "login.create.an.account";
                $scope.registerModal.loginCreateFingerprintSection = true;
                $scope.registerModal.loginCreateFingerprintSectionClass = "";

                setTimeout(function(){
                    $scope.fpErrorInfoTxt = "welcomeModals.skipFpAndRegister";
                    $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";
                }, 1000 * 6);

              /*$rootScope.fingerprintRegretSectionNew = true;
              $scope.registerModal.fingerprintRegretSectionNewClass = "modal-slide-in-right";*/
            }
        }
      };

    $scope.modelCloseBtnShowHide = function (action) {
        if (action == "show") {
          $(".keyboard_class_close_btn").show();
        } else if (action == "hide") {
          $(".keyboard_class_close_btn").hide();
        } else {
          console.log("action is not getting correctly = " + action);
        }
    }

      $scope.fingerprintCaptureResponse = function (res) {
        console.log("fingerprint response for image capture detect");
        // If Fingerprint is not recognized by the Reader, Device responds with "READ_ERROR"
        if (res.fingerprintImageBase64 == "READ_ERROR") {
          console.log(res.fingerprintImageBase64);
          $scope.fingerprintError = "welcomeModals.fingerprintNotRecognized";
          $scope.registerModal.loginCreateFingerprintCapturingSection = false;
          $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
          /*$rootScope.fingerprintRegretSectionNew = true;
          $scope.registerModal.fingerprintRegretSectionNewClass = "modal-slide-in-right";*/
          $scope.modelCloseBtnShowHide("show");

            $scope.fpErrorInfoTxt = "welcomeModals.loginFingerprintNotRecognized";
            $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_error";
            document.getElementById("fingerprint_section_login_register").style.display = "block";                 
            $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
            $scope.registerModal.loginTitle = "login.create.an.account";
            $scope.registerModal.loginCreateFingerprintSection = true;
            $scope.registerModal.loginCreateFingerprintSectionClass = "";
            setTimeout(function(){
                $scope.fpErrorInfoTxt = "welcomeModals.clickAnyBelowBtn";
                $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";
            }, 1000 * 6);

          /* If Application does not recognize Fingerprint Reader, Device responds with "DEVICE_ERROR 
          and for initialization error device responds with "DEVICE_INIT_ERROR" */
        } else if (res.fingerprintImageBase64 == "DEVICE_ERROR" || res.fingerprintImageBase64 == "DEVICE_INIT_ERROR") {
          console.log(res.fingerprintImageBase64);
          $scope.fingerprintError = "welcomeModals.fingerprintNotConnected";
          $scope.registerModal.loginCreateFingerprintCapturingSection = false;
          $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
          /*$rootScope.fingerprintRegretSectionNew = true;
          $scope.registerModal.fingerprintRegretSectionNewClass = "modal-slide-in-right";*/
          $scope.modelCloseBtnShowHide("show");

                $scope.fpErrorInfoTxt = "welcomeModals.fpReaderNotConnected";
                $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_error";
                document.getElementById("fingerprint_section_login_register").style.display = "block";                 
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginTitle = "login.create.an.account";
                $scope.registerModal.loginCreateFingerprintSection = true;
                $scope.registerModal.loginCreateFingerprintSectionClass = "";
                setTimeout(function(){
                    $scope.fpErrorInfoTxt = "welcomeModals.skipFpAndRegister";
                    $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";
                }, 1000 * 6);

        } else {
          console.log(res.fingerprintImageBase64);
          $scope.modelCloseBtnShowHide("show");
                       /*var emailGet = "";
                        var mobileGet = "";
                        var aadhaarGet = "";
                        var fieldValue = $scope.registerModal.fields[0].text;
                        var fieldValue2 = $scope.registerModal.fields[1].text;
                        var fieldValue3 = $scope.registerModal.fields[2].text;

        var firstNameTextBoxValue = $scope.registerModal.fields[3].text;
                        var lastNameTextBoxValue = $scope.registerModal.fields[4].text;
                     

                        if(isNaN(fieldValue) == true){
                            emailGet = fieldValue;
                        }
                        else if(isNaN(fieldValue2) == true){
                            emailGet = fieldValue2;
                        }
                        else if(isNaN(fieldValue3) == true){
                            emailGet = fieldValue3;
                        }
                        else{
                            emailGet = "";
                        }


                        if(fieldValue.length == 10 && isNaN(fieldValue) == false){
                            mobileGet = fieldValue;
                        }
                        else if(fieldValue2.length == 10 && isNaN(fieldValue2) == false){
                            mobileGet = fieldValue2;
                        }
                        else if(fieldValue3.length == 10 && isNaN(fieldValue3) == false){
                            mobileGet = fieldValue3;
                        }
                        else{
                            mobileGet = "";
                        }


                        if(fieldValue.length == 12 && isNaN(fieldValue) == false){
                            aadhaarGet = fieldValue;
                        }
                        else if(fieldValue2.length == 12 && isNaN(fieldValue2) == false){
                            aadhaarGet = fieldValue2;
                        }
                        else if(fieldValue3.length == 12 && isNaN(fieldValue3) == false){
                            aadhaarGet = fieldValue3;
                        }
                        else{
                            aadhaarGet = "";
                        }






                        

                        var passwordGet = document.getElementById('passwordReg').value;*/

                console.log("email id  "+ $rootScope.newAccountEmailID);
                console.log("mobile no  "+ $scope.registerModal.fields[2].text);
                console.log("aadhar no  "+ $scope.overallAadharFieldValue);
                console.log("first name  "+ $scope.registerModal.fields[3].text);
                console.log("lastname name "+ $scope.registerModal.fields[4].text);
                console.log("password  "+ $scope.registerModal.fields[5].text);
                console.log("cnfrm password "+ $scope.registerModal.fields[6].text);

                var emailGet = "";
                var mobileGet = "";
                var aadhaarGet = "";
                var affiliateGet = "";
                var fieldValueEmail = $scope.registerModal.fields[0].text;
                var fieldValue = $scope.registerModal.fields[2].text;
                var fieldValue2 = $scope.overallAadharFieldValue;
                var firstNameTextBoxValue = $scope.registerModal.fields[3].text;
                var lastNameTextBoxValue = $scope.registerModal.fields[4].text;
                var passwordGet = $scope.registerModal.fields[5].text;
                var EmpID = $scope.registerModal.fields[10].text;

                /*...*/
                if (fieldValueEmail != "" && (isNaN(fieldValueEmail) == true) && fieldValueEmail != null && fieldValueEmail != undefined) {
                    
                    emailGet = fieldValueEmail;
                }else{
                    
                    emailGet = "";
                }
                
                if(fieldValue.length == 10 && (isNaN(fieldValue) == false) && fieldValue != null && fieldValue != undefined){
                    
                    mobileGet = fieldValue;
                }else{
                    
                    mobileGet = "";
                }

                if(fieldValue2.length == 12 && (isNaN(fieldValue2) == false) && fieldValue2 != null && fieldValue2 != undefined){
                    
                    aadhaarGet = fieldValue2;
                }else{
                    
                    aadhaarGet = "";
                }

                if($rootScope.newAccountEmailID != "" && (isNaN($rootScope.newAccountEmailID) == true) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined ){
                    
                    emailGet = $rootScope.newAccountEmailID;
                }else if($rootScope.newAccountEmailID.length == 10 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                    
                    mobileGet = $rootScope.newAccountEmailID;
                }else if($rootScope.newAccountEmailID.length == 12 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                    
                    aadhaarGet = $rootScope.newAccountEmailID;
                }

                if ($scope.affiliateValue != "" && $scope.affiliateValue != null && $scope.affiliateValue != undefined){
                    affiliateGet = $scope.affiliateValue;
                }else{
                    affiliateGet = "";
                }

          var myFinalOutput2 = document.getElementById("myFinalOutput2");
          myFinalOutput2.setAttribute('src', "data:image/jpg;base64," + res.fingerprintImageBase64);
          var finaloutputimage = "data:image/jpg;base64," + res.fingerprintImageBase64;
              var formData = new FormData();
formData.append("machineState", "tamil nadu");
formData.append("machineCity", "chennai");
formData.append("machineOrganisation", "srushty");
formData.append("kioskId", "228857");
formData.append("email", emailGet);
formData.append("mobileNumber", mobileGet);
formData.append("termsFileName", "termsofuse_v9_01122016");
formData.append("privacyFileName", "privacypolicy_v7_08112014");
formData.append("password", passwordGet);
formData.append("encryptionVersion", null);
formData.append("aadhaarNumber", aadhaarGet);
formData.append("machine_org", $rootScope.uniqueKioskId.split('-')[1]);
formData.append("employee_id", EmpID);

formData.append("firstname", firstNameTextBoxValue);
formData.append("lastname", lastNameTextBoxValue);


var imageObj = new Image();
                            var canvass = document.getElementById('myFinalOutput2');
                            imageObj.id = "pic";
                            imageObj.src = canvass.toDataURL();
                        var blob = dataURItoBlob(finaloutputimage);
                        formData.append("image", blob);


//console.log(canvass.toDataURL());
//var baseUrl2 = "azureapi.indiahealthlink.com";
//alert("this is the break");
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
    $rootScope.ApiToken = token;
    //for affiliation 
    $scope.initialToken = json.ApiKey;
    //for affiliation end
                          $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + formData.get('email') + "&mobile=" + formData.get('mobileNumber') + "&aadhaar=" + formData.get('aadhaarNumber'),
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                emailOrMobileExist = emailOrMobileExist.replace(/^"(.*)"$/, '$1');
                                if(emailOrMobileExist == ""){
                          var finalInput = "";
                          /*if(emailGet == "" && aadhaarGet == ""){
                            finalInput = mobileGet;
                          }
                          else if(emailGet == "" && mobileGet == ""){
                            finalInput = aadhaarGet;
                          }
                          else if(aadhaarGet == "" && mobileGet == ""){
                            finalInput = emailGet;
                          }
                          else if(aadhaarGet == ""){
                            finalInput = emailGet;
                          }
                          else if(mobileGet == ""){
                            finalInput = emailGet;
                          }
                          else{
                            finalInput = mobileGet;
                          }*/
                          finalInput = $rootScope.newAccountEmailID;
                        //   console.log("form data",formData);
                      $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/CreateNewUserForFingerprint2",
                        type : "POST", 
                        data:formData,
                        processData:false,
                        contentType: false,
                        headers: { 'ApiToken': token },
                            success: function(html){
                          var json3= JSON.parse(JSON.stringify(html));
                          var jss3=JSON.stringify(json3);
                          console.log(json3.status);
                          if(json3.status == "Matching not found"){

                            //debugger;
                            //var jsontext2 = '{"email": "'+finalInput+'"}';
                            var jsontext2 = '{"email": "'+finalInput+'", "password":"'+passwordGet+'", "encryptionVersion": '+null+'}';
                            passwordGet
                            $.ajax({
                              //url: getSettingsValue('kiosk.api.url') + "/login/quickUserLoginOnlyEmail",
                              url: getSettingsValue('kiosk.api.url') + "/login/qlogin2",
                              type : "POST", 
                              cache: false,
                              data:jsontext2,
                               contentType: 'application/json; charset=UTF-8',  
                               dataType: 'json',
                            headers: { 'ApiToken': token, 'Token':  json3.token },
                              success: function(html){
                               //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                               console.log(html);

                               $scope.affiliateLoginResponse = html;

                               $scope.updateAffiliateStatus();
  
                               var qlogin = html;
                               $rootScope.UserInfo = qlogin.User;
                               //////alert(qlogin.Token);
                               
                               //if($route.current.$$route.originalPath.search("finish") != -1){
                      var callback = $rootScope.saveCheckinFinalResultsLogin;
                  //} else {
                    //  var callback = null;
                  //}
  
                               
                                  $scope.registerModal.watch();
                                  
                                      JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                      HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                  

                                    $scope.checkForKioskPaymentOptions();
                                    
                                // session storage for telemedi registeration flow start
                            //````````````````````````````````````````````````````````````
                            
                                HigiKioskStorageService.saveSessionData('telemedloginUserId' , qlogin.User.id);
                                HigiKioskStorageService.saveSessionData('qlogin' , qlogin);
                                $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
                                $rootScope.UserToken = qlogin.Token;

                                HigiKioskStorageService.saveSessionData('telemedUserEmail' , qlogin.User.email);
                                HigiKioskStorageService.saveSessionData('telemedUserFirstName' , qlogin.User.firstName);
                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , qlogin.User.lastName);
                                
                                if(qlogin.User.dateOfBirth != undefined){
                                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , qlogin.User.dateOfBirth.replace("/", "-"));
                                } else {
                                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                                }    
                                if(qlogin.User.gender != undefined){
                                    if(qlogin.User.gender == "m"){                                     
                                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                                    }
                                } else {
                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");  // dummy date provide for telemedi registeration
                                }

                                if(qlogin.User.mobileNumber != undefined && qlogin.User.mobileNumber != ""){  // mobile number is optional for ihl registeration flow             
                                    HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , qlogin.User.mobileNumber);
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
                              
                              
                              
                            },
                            });
                          }

                          else{
                            $scope.registerModal.loginCreateFingerprintCapturingSection = false;
                            $scope.registerModal.loginCreateFingerprintCapturingSectionClass = "modal-slide-out-left";
                              /*$scope.registerModal.fingerprintAlreadyExistsSection = true;
                              $scope.registerModal.fingerprintAlreadyExistsSectionClass = "modal-slide-in-right";
                              document.getElementById("fingerprint_already_exists").style.display = "block";*/

                                $scope.fpErrorInfoTxt = "welcomeModals.fpAlreadyRegistered";
                                $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_error";
                                document.getElementById("fingerprint_section_login_register").style.display = "block";                 
                                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                                $scope.registerModal.loginTitle = "login.create.an.account";
                                $scope.registerModal.loginCreateFingerprintSection = true;
                                $scope.registerModal.loginCreateFingerprintSectionClass = "";
                                setTimeout(function(){
                                    $scope.fpErrorInfoTxt = "welcomeModals.skipFpAndRegister";
                                    $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";
                                }, 1000 * 6);
                          }
                          
                          },
                          error : function(xhr, status, error) { 
                                //////alert('failures 3'+xhr.responseText);

                             } 
                        });
                  }
                  else{
                    ////////alert($scope.registerModal.loginMobileNumberError);
                    $scope.registerModal.init();
                    document.getElementById("guy-1").style.display = "none";
                    document.getElementById("scanning_line").style.display = "none";
                  }
}
});
}
});


                    
          
        }
      };
      

           
           

            $scope.registerModal.register = function(){
                $rootScope.functionCallAbort = true;
                $rootScope.isOnline00 = window.navigator.onLine;
                $scope.registerModal.signupfinalSubmitButtonClass = '';
                $scope.isLoadingSignup = true;
                if($rootScope.isOnline00){
                    //document.getElementById("keyboard").style.display = "none";
                    //alert("find location");
                    $rootScope.keyboardHide();
                    if(!$rootScope.hardwareAvailability['Fingerprint']) {
                        $scope.withoutFingerprint();
                        return 0;
                    }
                    document.getElementById("fingerprint_section_login_register").style.display = "block";
                    
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = false;

                    $scope.registerModal.loginTitle = "login.create.an.account";
                    $scope.registerModal.loginCreateFingerprintSection = true;

                    $scope.registerModal.loginCreateFingerprintSectionClass = "";
                    $scope.fpErrorInfoTxt = "welcomeModals.clickAnyBelowBtn";                    
                    $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";

                    $scope.registerModal.loginCreateFingerprintSectionClass = "modal-slide-in-right";
                
                    /*if($rootScope.functionCallAbort){
                        setTimeout(function() {
                            if($rootScope.functionCallAbort){
                                $scope.testingFunction();
                            }
                        },5000);
                    }*/
                }else{
                    document.getElementById("noInternetText").style.display = "block";
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
                        //createResp.id;
                        //token, its required for security
                        //createResp.token;
                        //authDisplay('success', 'auth.success.account.created');
                        HigiApiService.qLoginAsync($scope.registerModal.fields[0].text, $scope.registerModal.fields[1].text,
                            function (response) {
                                // success
                                qlogin = response;
                                $scope.registerModal.watch();
                                var initSession = function(){
                                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                    HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                };

                                $rootScope.UserToken = qlogin.Token;
                                $rootScope.UserInfo = qlogin.User;

                                // session storage for telemedi registeration flow start
                            //````````````````````````````````````````````````````````````
                            
                                HigiKioskStorageService.saveSessionData('telemedloginUserId' , qlogin.User.id);
                                HigiKioskStorageService.saveSessionData('qlogin' , qlogin);
                                $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
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

            $scope.registerModal.clearAllRegisterScreens = function (){
                $scope.registerModal.loginEmailSection = false;
                $scope.registerModal.loginNameSection = false;
                $scope.registerModal.loginEmpIDSection = false;
                $scope.registerModal.aadharSection = false;
                $scope.registerModal.otpSection = false;
                $scope.registerModal.healthIDSection = false;
                $rootScope.mobileRegFromLogIn = false;
                $rootScope.tranIdFromMobLogin = undefined;
                $scope.registerModal.abhaMobileExist = false;
                $scope.mobVerifyIHLExist == false;
                $scope.registerModal.abhaAccAddMobileConfirmExit = false;
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.loginCreateFingerprintCapturingSection = false;
                $scope.registerModal.loginCreateFingerprintSection = false;
                $scope.registerModal.fingerprintRegretSection = false;
                $rootScope.fingerprintRegretSectionNew = false;
                $scope.registerModal.fingerprintAlreadyExistsSection = false;
                $scope.registerModal.fingerprintAlreadySkippedSection = false;
                $(".signup_modal_progression_dots1").css('background-color','#bbb');
                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_modal_progression_dots3").css('background-color','#bbb');
                $(".signup_modal_progression_dots4").css('background-color','#bbb');
                $(".signup_modal_progression_dots5").css('background-color','#bbb'); 
                $(".signup_modal_progression_dots_main_container").css('visibility','hidden');
                if ($scope.registerModal.registerTermsAcceptanceClass != undefined) {
                    $scope.registerModal.registerTermsAcceptanceClass = '';
                }

                if ( $scope.registerModal.signupfinalSubmitButtonClass != undefined) {
                    $scope.registerModal.signupfinalSubmitButtonClass = '';
                }
            }


            $scope.registerModal.init();
        }
        else{
            $scope.registerModal = new Object();

            $scope.registerModal.fingerprintThereNot2 = true;
            $scope.registerModal.watch = $scope.$watch('modalVisible', function(newVal, oldVal){
                if(newVal == false){
                    if($rootScope.secondDialog == false){
                        //alert("second dialog false");
                        $scope.registerModal.init();
                    }
                }
            });


                        

            $scope.registerModal.init = function(){
                $scope.fpErrorInfoTxt = "";
                $scope.registerModal.finger_scan_instruction2 = "finger_scan_instruction2_normal";
                $scope.registerModal.loginEmailSection = true;
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                //$scope.registerModal.loginTitle = "login.create.an.account";
                //$scope.registerModal.loginTitleEmail = "login.enter.your.email";
                //$scope.registerModal.loginTitleEmailSpam = "login.email.never.spam";
                //$scope.registerModal.loginEmailAddress = "login.email.address";
                //$scope.registerModal.enteryouremail = "global.enter.your.emailid";
                $scope.registerModal.loginEmailAddressError = "welcomeModals.failure.account.exists";
                $scope.registerModal.loginMobileNumberError = "Mobile number already exists";
                //$scope.registerModal.loginHaveAccount = "login.login.to.account";
                $scope.registerModal.globalNext = "global.next";
                //$scope.registerModal.loginPassword = "login.enter.your.password";
                //$scope.registerModal.loginPasswordNote = "login.min.6";
                /*$scope.registerModal.loginEnterPassword = "login.enter.a.password";
                $scope.registerModal.loginShowPassword = "login.show.password";
                $scope.registerModal.loginForgotPassword = "login.forgot.password";
                $scope.registerModal.loginConfirmPassword = "login.password";*/
                $scope.registerModal.loginMode = {id : 'login'};
                $scope.registerModal.globalSignup = "welcomeModals.signup";
                $scope.registerModal.globalBack = "global.back";
                $scope.registerModal.registerDisclaimer = "welcomeModals.by.clicking.sign.up";
                $scope.registerModal.nextBtnActive = '';
                $scope.registerModal.loginBtnActive = '';
                $scope.registerModal.loginUsernameError = false;
                $scope.registerModal.loginServerErrorVisible = false;
                $scope.registerModal.loginServerError = "welcomeModals.server.failure";
                $scope.registerModal.submitting = false;
                $scope.registerModal.showPasswordClass = '';
                $scope.registerModal.showPasswordClass2 = '';
                $rootScope.secondDialog = true;
                $scope.adharAlreadyExist = false;
                $scope.mobileNumberAlreadyExists = false;
              var fieldLastName = '';
              var fieldFirstName = '';
                
                //removeElement
                /*var myEle = document.getElementById("emailReg3");
                    if(myEle){
                        //alert("myEle.value cleared" + myEle.value);
                        //removeElement(myEle);
                        myEle2.remove(); 
                    }
                    var myEle2 = document.getElementById("mobile_no_focus_new");
                    if(myEle2){
                        //alert("myEle2.value cleared" + myEle2.value);
                        //removeElement(myEle2);
                         myEle.remove(); 
                    }*/
                $scope.registerModal.fields = [
                    {id : "emailReg2" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.emailOrMobileOrAadhaarPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "emailReg3" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.emailPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}, 
                    {id : "mobile_no_focus_new" , placeholder: "Enter Mobile No",defaultText : "Enter your 10 digit mobile no" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.mobileNoPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "firstname" , placeholder: "Enter First Name",defaultText : "Enter your first name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.FirstNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "lastname" , placeholder: "Enter Last Name",defaultText : "Enter your last name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.LastNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "passwordReg" ,placeholder: "Enter Password",  text : '', textMasked : '' , textMaskedDisabled : false, type :'password' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.passwordLengthCheck(this)},
                        focus : function(){$rootScope.focusField(this)}},
                    {id : "confirmPassNow" ,placeholder: "Confirm Password", defaultText : "Confirm password" , text : '', textMasked : '' , textMaskedDisabled : false, type :'password' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.passwordLengthCheck2(this)},
                        focus : function(){$rootScope.focusField(this)}},
                    {id : "aadharfield1" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField1Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "aadharfield2" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField2Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "aadharfield3" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.aadharInputField3Check(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "EmpID" , placeholder: "Enter Employee ID",defaultText : "Enter Employee ID" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){$scope.registerModal.EmpIDValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}
                    
                ];

                $rootScope.fields.register = $scope.registerModal.fields;
                $scope.registerModal.loginPasswordSectionClass = "";
                //$scope.registerModal.loginEmailSectionClass = "";
                $scope.registerModal.loginCreateConfirmSectionClass = "";
                $scope.registerModal.loginPasswordSection = false;
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.emailOrMobileOrAadhaar = false;  
                $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';              
                $scope.overallAadharFieldValue = '';
                $scope.mobTextLengthSatisfied = true;
                $scope.adr1TextLengthSatisfied = true;
                $scope.adr2TextLengthSatisfied = true;
                $scope.adr3TextLengthSatisfied = true;
                $scope.emailText = true;
                $scope.adr1FieldText = "";
                $scope.adr2FieldText = "";
                $scope.adr3FieldText = "";
                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                $scope.registerModal.otpSectionNextButtonClass = '';
                // $scope.registerModal.abhaMobileNextButtonClass = '';
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
                $rootScope.clearRegisterScreens = $scope.registerModal.clearAllRegisterScreens;
            };

            $rootScope.registerModalInit = $scope.registerModal.init;

            $scope.registerModal.removeFocus = function(){
                $scope.registerModal.fields.forEach(function(item, index){
                    if (item.id !== "emailReg2" && item.id !== "emailReg3")  {
                        document.getElementById(item.id).blur();
                        item.selectedClass = "";
                        console.log(item.id)
                        console.log(index)   
                    }  
                });
            };

            $scope.registerModal.emailPatternCheck = function(field){
                var str = field.text;
                //alert(str);
                //alert("email pattern check calling");
                //field = document.getElementById("emailReg2");
                //var str2 = document.getElementById("emailReg2").value;
                //alert(str2);
                //if( str2.length == 12 && isNaN(str2) == false){
                    //$scope.registerModal.nextBtnActive = '';
                //}
                
                var thisText = document.getElementById("login_create_account_email_title2");

                //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(starts)
                /*if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    //alert("field " + field);
                    //alert("str2 " + str);
                    $scope.registerModal.emailValid = true;
                    
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("login_username_loading_new5").style.display = "block";
                            $rootScope.validEmail = $scope.registerModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            //$scope.registerModal.nextBtnActive = 'active_btn';
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //alert($scope.registerModal.nextBtnActive);


                            var emailIsThis = $scope.registerModal.fields[1].text;
                            //alert("emailIsThis " + emailIsThis);
                            var mobileIsThis = "";
                            var aadhaarIsThis = "";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
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

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = $scope.interfaceLabels['global.emailalreadyexist'];
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                //document.getElementById("register-first-screen-text2").innerHTML = "";
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });


                }*/
                //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(ends)

                if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == $scope.interfaceLabels['welcomeModals.aadhaarnumber']){

                    
                    //$scope.registerModal.nextBtnActive = 'active_btn';
                    //alert($scope.registerModal.nextBtnActive);
                    document.getElementById("register-first-screen-text7").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
                    document.getElementById("login_username_loading_new5").style.display = "block";
                    //alert("going here");
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';


                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = $scope.registerModal.fields[1].text;
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
                    $rootScope.ApiToken = token;
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
                                
                            if(finalString == "Aadhaar number already exists"){
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = $scope.interfaceLabels[ $scope.adharrexissts];
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                //document.getElementById("register-first-screen-text3").innerHTML = "";
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });


               }else if(str.length == 0 && thisText.innerHTML == $scope.interfaceLabels['welcomeModals.aadhaarnumber']){
                  $scope.registerModal.nextBtnActive = 'active_btn';
               }
                else
                {
                    document.getElementById("login_username_error_new").innerHTML = "";
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            /*$scope.registerModal.emailOrMobileOrAadhaarPatternCheck = function(field)
            {


                var str = field.text;
                var emailOrMobileExist = "";
               if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.registerModal.emailValid = true;
                    document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML =$scope.interfaceLabels[$scope.validateemailadd];
                            $rootScope.validEmail = $scope.registerModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //alert($scope.registerModal.nextBtnActive);
                            var emailIsThis = $scope.registerModal.fields[0].text;
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
                    $rootScope.ApiToken = token;
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
                                alert("email exit");
                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels['global.emailalreadyexist'];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });

                        
               }

               else{
                    document.getElementById("login_username_error_newest").innerHTML = "";
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
               }
                   
            };
*/
            $scope.registerModal.emailOrMobileOrAadhaarPatternCheck = function(field)
            {
                $scope.registerModal.MobileSectionNextButtonClass = '';
                var str = field.text;
                var emailOrMobileExist = "";
                if($scope.registerModal.fields[0].text.trim().length == 0){
                    $scope.emailText = true;
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                        return;
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        return;
                    }
                }else{
                   if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                        $scope.registerModal.emailValid = true;
                        $rootScope.validEmail = $scope.registerModal.emailValid;
                        $rootScope.hideEmailExtensionTop();                            
                        
                        $rootScope.keyboardEnterButtonClass = 'enter_active';
                        var emailIsThis = $scope.registerModal.fields[0].text;
                        var mobileIsThis = "";
                        var aadhaarIsThis = "";
                        $rootScope.isOnline = window.navigator.onLine;
                        $(".email_address_validation_loader").show();   
                        $(".email_address_validation_error").hide();                       
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
                                                emailOrMobileExist = JSON.stringify(html);
                                                //alert(emailOrMobileExist);
                                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                                $(".email_address_validation_loader").hide();
                                                if(finalString == "Email ID already exists"){
                                                    $scope.registerModal.MobileSectionNextButtonClass = '';
                                                    //alert("IfemailOrMobileExist"+finalString);
                                                    $scope.registerModal.nextBtnActive = '';
                                                    $(".email_address_validation_error").show();
                                                    $(".email_address_validation_srv_err").hide();
                                                    $scope.emailText = false;
                                                }
                                                else if(finalString == ""){
                                                   // alert("ElseemailOrMobileExist"+finalString);
                                                    $(".email_address_validation_error").hide();
                                                    $(".email_address_validation_srv_err").hide();
                                                    $scope.emailText = true;
                                                    /*if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }*/
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }
                                                    
                                                }
                                            },
                                            error : function(xhr, status, error) { 
                                                $(".email_address_validation_loader").hide();
                                                $(".email_address_validation_error").hide();
                                                $(".email_address_validation_srv_err").show();
                                                $scope.emailText = false;
                                                console.log('failures 3'+xhr.responseText);
                                            } 
                                        });
                                    }
                                });
                            }
                            else{
                                $(".email_address_validation_srv_err").show();
                                $(".email_address_validation_loader").hide();
                                $(".email_address_validation_error").hide();
                                $scope.emailText = false;
                                /*document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                                document.getElementById("register-first-screen-text9").style.color = "red";
                                document.getElementById("login_username_loading_new9").style.display = "none";*/
                            }       
                   }else{
                        $scope.emailText = false; 
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                   }
                }
                /*var str = field.text;
                var emailOrMobileExist = "";
               if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    $scope.registerModal.emailValid = true;
                    document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                            $rootScope.validEmail = $scope.registerModal.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            
                            $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            var emailIsThis = $scope.registerModal.fields[0].text;
                            var mobileIsThis = "";
                            var aadhaarIsThis = "";
                            $rootScope.isOnline = window.navigator.onLine;
                            if($rootScope.isOnline){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
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
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Email ID already exists"){

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels['global.emailalreadyexist'];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                        }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
                        
               }*/

               //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(starts)
              /* else if(str.length == 12 && isNaN(str) == false){
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
                    $scope.registerModal.mobileValid = true;
                    $rootScope.validEmail = $scope.registerModal.mobileValid;
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = $scope.registerModal.fields[0].text;
                            $rootScope.isOnline2 = window.navigator.onLine;
                            if($rootScope.isOnline2){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
                            if(finalString == "Aadhaar number already exists"){

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels[ $scope.adharrexissts];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
                            }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
               }

               else if(str.length == 10 && isNaN(str) == false){

                    //alert("you reached man");
                    //alert($scope.registerModal.nextBtnActive);
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML =$scope.interfaceLabels[$scope.validatemobi];
                    $scope.registerModal.aadhaarValid = true;
                    $rootScope.validEmail = $scope.registerModal.aadhaarValid;
                    $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = $scope.registerModal.fields[0].text;
                            var aadhaarIsThis = "";
                            $rootScope.isOnline3 = window.navigator.onLine;
                            if($rootScope.isOnline3){
                                document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[$scope.validateemailadd];
                    document.getElementById("register-first-screen-text9").style.color = "#1873A7";
                            $.ajax({
                  url: "https://azureapi.indiahealthlink.com/login/kioskLogin?id=2936",
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
                            url: "https://azureapi.indiahealthlink.com/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
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

                                $scope.registerModal.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                $scope.registerModal.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = $scope.interfaceLabels['global.mobilenumberalreadyexits'];
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                $scope.registerModal.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new9").style.display = "none";
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                                //console.log(XMLHttpRequest);
                            } 
                        });
                    }
                });
                            }
                        else{
                            document.getElementById("register-first-screen-text9").innerHTML = "There is a problem connecting the server";
                            document.getElementById("register-first-screen-text9").style.color = "red";
                            document.getElementById("login_username_loading_new9").style.display = "none";
                        }
               }*/
               //Adhaar and mobile number registration is DISABLED in first page
               //For that this lines are commented - thamarai(ends)
               //else{
                    /*document.getElementById("login_username_error_newest").innerHTML = "";
                    $scope.registerModal.emailValid = false;
                    $scope.registerModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';*/
               //}
            };

            
           $scope.registerModal.redirectToLogin = function(){
            $rootScope.clearModal();
            $rootScope.registerModalInit(); //trigger the placeholder json
            $rootScope.loginModelInit(); //trigger the placeholder json file 
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_loginButton', 'button', 'pressed');
            $rootScope.loadModal({id : 'login', clicked: true});
           }

            $scope.registerModal.mobileNoPatternCheck = function(field){
                var str = field.text;
                $(".mob_no_validation_loader").css('display','none');
                $(".mob_no_validation_error").css('display','none');
                $(".mob_no_validation_srv_err").css('display','none');

                if(str.length == 10 && isNaN(str) == false){
                    var emailIsThis = "";
                    var mobileIsThis = $scope.registerModal.fields[2].text;
                    var aadhaarIsThis = "";
                    $rootScope.isOnline6 = window.navigator.onLine;
                    if($rootScope.isOnline6){
                        $(".mob_no_validation_loader").css('display','block');
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
                                $rootScope.ApiToken = token;
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
                                            //alert(finalString);
                                            $scope.registerModal.MobileSectionNextButtonClass = '';
                                            $(".mob_no_validation_loader").css('display','none');
                                            $(".mob_no_validation_srv_err").css('display','none');
                                            $(".mob_no_validation_error").css('display','block');
                                        }
                                        else if(finalString == ""){
                                            //alert(finalString); 
                                            $scope.mobTextLengthSatisfied = true;
                                            $(".mob_no_validation_loader").css('display','none');
                                            $(".mob_no_validation_srv_err").css('display','none');
                                            $(".mob_no_validation_error").css('display','none');
                                            
                                            if($rootScope.registerFlowFirstInput != "email"){
                                                if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                }
                                            } else {
                                                if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                }   
                                            } 
                                        }
                                    },
                                    error : function(xhr, status, error) { 
                                        console.log('failures 3'+xhr.responseText);
                                    } 
                                });
                            }
                        });
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        $(".mob_no_validation_loader").css('display','none');
                        $(".mob_no_validation_error").css('display','none');
                        $(".mob_no_validation_srv_err").css('display','block');
                        $scope.mobTextLengthSatisfied = false;
                    }
                }else if(str.length == 0){
                    $scope.mobTextLengthSatisfied = true;
                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.mobTextLengthSatisfied = false;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".mob_no_validation_loader").css('display','none');
                    $(".mob_no_validation_error").css('display','none');
                    $(".mob_no_validation_srv_err").css('display','none');   
                }
            }
            //     else if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == $scope.interfaceLabels['global.aadhaarnumber']){

            //         //alert("you reached man");
            //         //$scope.registerModal.nextBtnActive = 'active_btn';
            //         //alert($scope.registerModal.nextBtnActive);
            //         document.getElementById("login_username_loading_new8").style.display = "block";
            //     document.getElementById("register-first-screen-text8").innerHTML = $scope.interfaceLabels[$scope.validateadhar];
            //         $rootScope.keyboardEnterButtonFunction = function(){$scope.registerModal.aadhaarExistsCheck( $scope.registerModal.fields[0]);};
            //                 $rootScope.keyboardEnterButtonClass = 'enter_active';

            //                 var emailIsThis = "";
            //                 var mobileIsThis = "";
            //                 var aadhaarIsThis = $scope.registerModal.fields[2].text;
            //                 $.ajax({
            //       url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
            //       type : "GET", 
            //       cache: false,
            //       dataType: 'json',
            //       headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
            //       success: function(html){
            //         var json = JSON.parse(JSON.stringify(html));
            //         var jss=JSON.stringify(json);
            //         console.log(json);
            //         var token = json.ApiKey;
            //         $rootScope.ApiToken = token;
            //             $.ajax({
            //                 url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
            //                 type : "GET", 
            //                 cache: false,
            //                 contentType: 'application/json; charset=UTF-8',  
            //                 headers:{"ApiToken":token},
            //                 success: function(html){
            //                     console.log(JSON.stringify(html));
            //                     emailOrMobileExist = JSON.stringify(html);
            //                     //alert(emailOrMobileExist);
            //                     var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                
            //                 if(finalString == "Aadhaar number already exists"){
            //                     $scope.registerModal.nextBtnActive = '';
            //                     //alert("IfemailOrMobileExist"+finalString);
            //                     $scope.registerModal.nextBtnActive = '';
            //                     document.getElementById("login_username_error_new2").innerHTML = $scope.interfaceLabels[ $scope.adharrexissts];
            //                     document.getElementById("login_username_loading_new8").style.display = "none";
            //     document.getElementById("register-first-screen-text8").innerHTML = "";
                                
            //                 }
            //                 else if(finalString == ""){
            //                     //alert("ElseemailOrMobileExist"+finalString);
            //                     document.getElementById("login_username_error_new2").innerHTML = "";
            //                     $scope.registerModal.nextBtnActive = 'active_btn';
            //                     document.getElementById("login_username_loading_new8").style.display = "none";
            //     document.getElementById("register-first-screen-text8").innerHTML = "";
            //                 }
            //                 },
            //                 error : function(xhr, status, error) { 
            //                     console.log('failures 3'+xhr.responseText);
            //                 } 
            //             });
            //         }
            //     });
            //    }else if(str.length == 0 && document.getElementById("mobile_no_focus_new").placeholder == $scope.interfaceLabels[$scope.mmbn]){
            //       $scope.registerModal.nextBtnActive = 'active_btn';
            //    }
            //     else
            //     {
            //         document.getElementById("login_username_error_new2").innerHTML = "";
            //         $scope.registerModal.emailValid = false;
            //         $scope.registerModal.nextBtnActive = '';
            //         $rootScope.keyboardEnterButtonFunction = null;
            //         $rootScope.keyboardEnterButtonClass = '';
            //     }
            // };

            /*$scope.registerModal.mobileNoPatternCheck = function(mobile)
            {   
               var mobile_no_check = document.getElementById("mobile_no_focus_new").value;
            
               var email_value = document.getElementById("emailReg3").value;*/
               //var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

              /* var valid_email  = true;
               var valid_mobile = true;
               if(email_value != "")
               {


                   if(regexEmail.test(email_value))
                   {
                        ////////alert("valid_email");
                        valid_email = true;
                   }else{
                   
                        valid_email = false;
                   }
                }
                   
               $rootScope.mobile_no = mobile_no_check;
               if(mobile_no_check != "")
               {


                   if(isNaN(mobile_no_check)){
                       // //////alert("it is not a valid number");
                       valid_mobile    = false;
                    }
                    else{
                        
                        if(mobile_no_check.length == 10){
                           // //////alert("it is valid number");
                            valid_mobile    = true;

                            //$scope.registerModal.nextBtnActive = 'active_btn';
                        }else{
                             valid_mobile    = false;
                        }
                    }
                    
                }    
                

                if(valid_mobile == true && valid_email == true )
                {
                    $scope.registerModal.nextBtnActive = 'active_btn';
                }else{
                    $scope.registerModal.nextBtnActive = '';
                }

                   

            };*/

            $scope.registerModal.aadharInputField1Check = function(field){

                var str = field.text;
                $scope.adr1FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField1Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr1TextLengthSatisfied = true;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    $rootScope.focusField($scope.registerModal.fields[8]); 
                    if($rootScope.registerFlowFirstInput != "email"){
                        if($scope.aadharField3Value.length == 4 && $scope.adr2FieldText.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) && $scope.emailText == true){
                            $scope.aadhaarInputFieldValidate();
                        } 
                    } else {
                        if($scope.aadharField3Value.length == 4 && $scope.adr2FieldText.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true)){
                            $scope.aadhaarInputFieldValidate();   
                        }
                    }
                }else if(str.length == 0){
                    $scope.adr1TextLengthSatisfied = true;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.adr1TextLengthSatisfied = false;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.registerModal.aadharInputField2Check = function(field){

                var str = field.text;
                $scope.adr2FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField2Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr2TextLengthSatisfied = true;
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    $rootScope.focusField($scope.registerModal.fields[9]);     
                    if($rootScope.registerFlowFirstInput != "email"){
                        if($scope.aadharField3Value.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) && $scope.emailText == true){
                            $scope.aadhaarInputFieldValidate();
                        }                        
                    } else {
                        if($scope.aadharField3Value.length == 4){
                            $scope.adr3TextLengthSatisfied = true;   
                        }
                        if(($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true)){
                            $scope.aadhaarInputFieldValidate();   
                        }
                    }
                }else if(str.length == 0){
                    $scope.adr2TextLengthSatisfied = true;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    }
                }else{
                    $scope.adr2TextLengthSatisfied = false;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.registerModal.aadharInputField3Check = function(field){

                var str = field.text;
                $scope.adr3FieldText = field.text;
                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if(str.length == 4 && isNaN(str) == false){
                    $scope.aadharField3Value = str;
                    $scope.aadhaarInputFieldValidate();
                }else if(str.length == 0){
                    $scope.adr3TextLengthSatisfied = true;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none');
                    
                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0 && $scope.emailText == true) {
                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                    }else{
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                    } 
                }else{
                    $scope.adr3TextLengthSatisfied = false;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.registerModal.MobileSectionNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display','none');
                    $(".adr_no_validation_error").css('display','none');
                    $(".adr_no_validation_srv_err").css('display','none'); 
                }
            }

            $scope.aadhaarInputFieldValidate = function(){                
                    $scope.overallAadharFieldValue = '';
                    $scope.overallAadharFieldValue = $scope.aadharField1Value+$scope.aadharField2Value+$scope.aadharField3Value;
                    console.log($scope.overallAadharFieldValue);
                    if($scope.overallAadharFieldValue.length == 12 && isNaN($scope.overallAadharFieldValue) == false ){
                        $(".adr_no_validation_loader").css('display','none');
                        $(".adr_no_validation_error").css('display','none');
                        $(".adr_no_validation_srv_err").css('display','none');
                        var emailIsThis = "";
                        var mobileIsThis = "";
                        var aadhaarIsThis = $scope.overallAadharFieldValue;
                        $rootScope.isOnline5 = window.navigator.onLine;
                        if($rootScope.isOnline5){     
                            $(".adr_no_validation_loader").css('display','block');        
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
                                    $rootScope.ApiToken = token;
                                    $.ajax({
                                        url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                        type : "GET", 
                                        cache: false,
                                        contentType: 'application/json; charset=UTF-8',  
                                        headers:{"ApiToken":token},
                                        success: function(html){
                                            console.log(JSON.stringify(html));
                                            emailOrMobileExist = JSON.stringify(html);
                                            var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                            if(finalString == "Aadhaar number already exists"){
                                                //alert(finalString);
                                                $scope.adr3TextLengthSatisfied = false;
                                                $(".adr_no_validation_loader").css('display','none');
                                                $(".adr_no_validation_error").css('display','block');
                                                $(".adr_no_validation_srv_err").css('display','none');
                                                $scope.registerModal.MobileSectionNextButtonClass = '';
                                            }else if(finalString == ""){
                                                //alert("adharcheck valid");
                                                $scope.adr3TextLengthSatisfied = true;
                                                $(".adr_no_validation_loader").css('display','none');
                                                $(".adr_no_validation_error").css('display','none');
                                                $(".adr_no_validation_srv_err").css('display','none');

                                                if($rootScope.registerFlowFirstInput != "email"){
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    }
                                                } else {
                                                    if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                        $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                                    } 
                                                }
                                            }
                                        },
                                        error : function(xhr, status, error) { 
                                            console.log('failures 3'+xhr.responseText);
                                        } 
                                    });
                                }
                            });
                        }
                        else{
                            $scope.adr3TextLengthSatisfied = false;
                            $scope.registerModal.MobileSectionNextButtonClass = '';
                            $(".adr_no_validation_loader").css('display','none');
                            $(".adr_no_validation_error").css('display','none');
                            $(".adr_no_validation_srv_err").css('display','block'); 
                        }
                    }
            }

            $scope.registerModal.showPasswordToggle = function(field){
                console.log(field);
                if (field.id == "passwordReg") {
                   field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.registerModal.showPasswordClass = 'active_eyes';
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
                }else if (field.id == "confirmPassNow") {
                    field.textMaskedDisabled =  !field.textMaskedDisabled;
                    if(field.textMaskedDisabled){
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if(field.textMaskedDisabled){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.registerModal.showPasswordClass2 = 'active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                        $scope.registerModal.showPasswordClass2 = '';
                        var textMasked = '';
                        for(var i = 0; i<field.textMasked.length; i++){
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    } 
                }
                
            };

            $scope.registerModal.passwordLengthCheck = function(field){
                var str = field.text;
                $scope.registerModal.termsAccepted = false;
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
            };

            $scope.registerModal.passwordLengthCheck2 = function(field){
                var str = field.text;
                $scope.registerModal.termsAccepted = false;
                $scope.registerModal.registerTermsAcceptanceClass = '';
                $scope.registerModal.signupfinalSubmitButtonClass = '';
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

                $scope.registerModal.loginNameSectionClass = "modal-slide-out-left";
                $scope.registerModal.loginCreateConfirmSection = true;
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                $timeout(function() {
                    $rootScope.focusField($scope.registerModal.fields[5]);
                    $scope.registerModal.loginNameSection = false;
                },500);
                $scope.registerModal.showCreateConfirmSection();
                $(".signup_modal_progression_dots3").css('background-color','#bbb');
                $(".signup_modal_progression_dots4").css('background-color','#3887b2');
            };

/*First Name Validation and Last Name Validation done by Sumithra starts
****************
When a character is edited(length is added to 1) or deleted(length is decreased by 1) in middle 
validation was not happening properly for LastName and First Name
****************
*/
            $scope.registerModal.FirstNameValidation = function(field){
                $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true){
                    var count = $("#firstname").val().length-1;
                    if ((count > 3) && ($("#lastname").val().length > 3) && isNaN($("#firstname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;

                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#firstname").val().length + 1;
                    if ((count > 3) && ($("#lastname").val().length > 3) && isNaN($("#firstname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;

                }
                else{
                    if (($("#firstname").val().length > 3) && ($("#lastname").val().length > 3) && isNaN($("#firstname").val()) == true ){
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else{
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                }
                if ($("#firstname").val() != "" && Nameformat.test($("#firstname").val()) == true ) {

                    console.log("first name");

                    document.getElementById("firstname").placeholder= "Enter First Name";
                    
                    $scope.registerModal.loginNameSection = true;
                }
                
            } 

    
            $scope.registerModal.LastNameValidation = function(field){               
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                if ($rootScope.Deletepressed == true) {
                    var count = $("#lastname").val().length - 1;
                    if ((count > 3) && ($("#firstname").val().length > 3) && isNaN($("#lastname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.Deletepressed = false;
                }
                else if ($rootScope.characterEnteredInMiddle == true) {
                    var count = $("#lastname").val().length + 1;
                    if ((count > 3) && ($("#firstname").val().length > 3) && isNaN($("#lastname").val()) == true) {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else {
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                    $rootScope.characterEnteredInMiddle = false;
                }
                else{
                    if (($("#lastname").val().length > 3) && ($("#firstname").val().length > 3) && isNaN($("#lastname").val()) == true ){
                        $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_first_last_next_active_btn';
                    }
                    else{
                        $scope.registerModal.firstLastNameSectionNextButtonClass = ' ';
                    }
                }
                if ($("#lastname").val() != "" && Nameformat.test($("#lastname").val() == true)) {

                    console.log("last name");

                    document.getElementById("lastname").placeholder="Enter Last Name";;
                    
                    $scope.registerModal.loginNameSection = true;
                }
            }

            // Aadhar number validation by Ashley
            $scope.registerModal.AadharSection = function(field){
                $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";                
                $scope.registerModal.aadharSection = true;
                $scope.registerModal.aadharSectionClass = "modal-slide-in-right";
                $timeout(function(){
                    $rootScope.focusField($scope.registerModal.fields[7]);
                    $scope.registerModal.loginEmailSection = false;
                },460);
                $(".signup_modal_progression_dots1").css('background-color','#bbb');
                $(".signup_modal_progression_dots2").css('background-color','#3887b2');
            }

            // First Name Validation and Last Name Validation done by Sumithra ends

            $scope.registerModal.NameEntrySection = function(field){
                if($rootScope.empIdShowInRegFlow == false){
                    $scope.registerModal.aadharSectionClass = "modal-slide-out-left";                
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.aadharSection = false;
                    },460);
                    $(".signup_modal_progression_dots2").css('background-color','#bbb');
                    $(".signup_modal_progression_dots3").css('background-color','#3887b2');
                } else {
                    // below code in enable the EmpID section
                    $scope.registerModal.loginEmpIDSectionClass = "modal-slide-out-left";                  
                    $scope.registerModal.loginNameSection = true;
                    $scope.registerModal.loginNameSectionClass = "modal-slide-in-right";
                    $scope.registerModal.firstLastNameSectionNextButtonClass = '';
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[3]);
                        $scope.registerModal.loginEmpIDSection = false;
                    },460);
                    $(".signup_modal_progression_dots3").css('background-color','#bbb');
                    $(".signup_modal_progression_dots4").css('background-color','#3887b2');
                }
            };

            $scope.registerModal.EmpIDEntrySection = function(field){

                $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";                  

                $scope.registerModal.loginEmpIDSection = true;
                $scope.registerModal.loginEmpIDSectionClass = "modal-slide-in-right";
                $timeout(function(){
                    $rootScope.focusField($scope.registerModal.fields[10]);
                    $scope.registerModal.loginEmailSection = false;
                },460);
                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_modal_progression_dots3").css('background-color','#3887b2'); 
            };


            $scope.registerModal.EmpIDValidation = function(field){
                $scope.registerModal.firstLastNameSectionNextButtonClass = 'signup_modal_next_active_btn';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    

            }

            $scope.registerModal.showEmailSection = function(defaulting){

                //var str2 = document.getElementById("emailReg2").value;
                //alert(str2);
                //if( str2.length == 12 && isNaN(str2) == false){
                    //$scope.registerModal.nextBtnActive = '';
                //}


                //$scope.registerModal.loginTitle ="login.create.an.account";
                //$scope.registerModal.loginPasswordSectionClass = "modal-slide-out-right";
                //$scope.registerModal.loginEmailSectionClass = (defaulting) ? "modal-slide-in-right" : "modal-slide-out-left";
                //$scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginEmailSectionClass ="modal-slide-in-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                    $scope.registerModal.loginCreateConfirmSection = false;
                }, 500);


                //$scope.emailText = false;

                $(".email_address_validation_loader").hide();
                $(".email_address_validation_error").hide();
                $(".email_address_validation_srv_err").hide();

                $(".mob_no_validation_loader").css('display','none');
                $(".mob_no_validation_error").css('display','none');
                $(".mob_no_validation_srv_err").css('display','none');
                
                $(".aadharLinkMobileNumberHasIHLacc").css('display','none');

                $(".adr_no_validation_loader").css('display','none');
                $(".adr_no_validation_error").css('display','none');
                $(".adr_no_validation_srv_err").css('display','none');

                if($rootScope.registerFlowFirstInput != "email"){
                   $scope.registerModal.MobileSectionNextButtonClass = ''; 
                   $scope.registerModal.emailOrMobileOrAadhaarPatternCheck($scope.registerModal.fields[0]);
                   $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[0]); 
                    },500);
                   $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                } else {
                    $scope.registerModal.mobileNoPatternCheck($scope.registerModal.fields[2]);
                    $timeout(function(){
                        $rootScope.focusField($scope.registerModal.fields[2]); 
                    },500);
                    $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                }
                $scope.registerModal.createConfirmClass = "";
                $scope.registerModal.submitting = false;
                $scope.registerModal.loginEmailSection = true;
                $rootScope.keyboardShow();
                //$scope.registerModal.emailPatternCheck($scope.registerModal.fields[1]);                
                //Initialize password incase repeating flow (via back button)
                /*$scope.registerModal.fields[2].text = '';
                document.getElementById($scope.registerModal.fields[2].id).value = $scope.registerModal.fields[2].text;
                $scope.registerModal.fields[2].textMasked = '';*/
                
                $timeout(function(){
                    $(".signup_modal_progression_dots_main_container").css('visibility','visible');
                    $(".signup_modal_progression_dots2").css('background-color','#3887b2');
                },1110);  
            };


            $scope.registerModal.showEmailOrAadhaarSection = function(defaulting){
                $scope.registerModal.loginTitle ="login.create.an.account";
                $scope.registerModal.emailOrMobileOrAadhaar = false;
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-in-left";
                $scope.registerModal.emailOrMobileOrAadhaar = (defaulting) ? "" : "modal-slide-in-left";
                //$("#numCircle4").css("background-color", "#868282");
                $scope.registerModal.loginEmailSection = false;
                $scope.registerModal.loginEmailSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                $scope.registerModal.loginPasswordSectionClass = "modal-slide-out-right";
                
                
                $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-out-right";
                //$scope.registerModal.loginEmailSectionClass = "modal-slide-out-right";
                $timeout(function(){
                    $scope.registerModal.loginPasswordSection = false;
                    $scope.registerModal.loginCreateConfirmSection = false;
                }, 500);
                $scope.registerModal.createConfirmClass = "";
                $scope.registerModal.submitting = false;
                $scope.registerModal.emailOrMobileOrAadhaar = false;
                $scope.registerModal.emailOrMobileOrAadhaarPatternCheck($scope.registerModal.fields[0]);
                $rootScope.keyboardShow();
                
                //Initialize password incase repeating flow (via back button)
                /*$scope.registerModal.fields[1].text = '';
                document.getElementById($scope.registerModal.fields[1].id).value = $scope.registerModal.fields[1].text;
                $scope.registerModal.fields[1].textMasked = '';*/
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
                var regexExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                if( (($scope.registerModal.fields[5].text).length  < 6) &&  (($scope.registerModal.fields[5].text).length < 6)) return 0;
                //if(($scope.registerModal.termsAccepted == true) && (regexExp.test($scope.registerModal.fields[5].text) == true) && (regexExp.test($scope.registerModal.fields[6].text) == true) && ($scope.registerModal.fields[5].text == $scope.registerModal.fields[6].text)){
                if(($scope.registerModal.termsAccepted == true)  && ($scope.registerModal.fields[5].text == $scope.registerModal.fields[6].text)){
                    
                    $rootScope.keyboardHide(); // keyboard hide for terms and condition show.
                    
                    //JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                
                    $scope.registerModal.registerTermsAcceptanceClass = 'active_checkmark';
                    $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                } else {
                    //JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                    
                    $scope.registerModal.registerTermsAcceptanceClass = '';
                    $scope.registerModal.signupfinalSubmitButtonClass = '';
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

                //login_create_account_email_title should hide
                //emailReg
               // document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
               //document.getElementsByClassName("regMailid").style.display="none !important";

               //$scope.registerModal.validatedEmail =  $scope.registerModal.fields[0].text;
                //$scope.registerModal.removeFocus();
                JkioskService.logEvent( $rootScope.currentKeyboardState + '_passwordNextButton', 'button', 'pressed');
                //$scope.registerModal.loginPasswordSectionClass = "modal-slide-out-left";
                //$scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                // $timeout(function(){
                //     $scope.registerModal.loginPasswordSection = false;
                // }, 500);


                $scope.registerModal.createConfirmClass = "confirm-terms-create-account";
                //$scope.registerModal.loginCreateConfirmSection = true;
                //$scope.registerModal.loginTitle ="login.confirm.account.details";
                //$scope.registerModal.registerButtonClass = '';
                $scope.registerModal.loginTitle = "login.create.an.account";
                $scope.registerModal.bobbleState = false;
                $scope.registerModal.termsAccepted = false;
                $timeout($scope.registerModal.bobble, 1500);


               // $rootScope.keyboardHide();
                //Get terms and ppol
                $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['terms.filename'] + '.html').success(function(data){
                    $scope.registerModal.termsOfServicePpol = data + '<a id="ppol_anchor" name="privacy"></a>';
                    $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                        $scope.registerModal.termsOfServicePpol += data;
                        $scope.registerModal.termsOfServicePpol = $sce.trustAsHtml($scope.registerModal.termsOfServicePpol);
                        //$scope.registerModal.termsScroller = $scope.registerModal.termsScroller || new iScroll("login_tos_privacy_wrapper", {hScroll:false, scrollbarClass:'iscroll_scrollbar' });
                        //$scope.registerModal.termsScroller.scrollTo(0, 0, 1000, false);
                        $scope.registerModal.scroller = new FTScroller(document.getElementById('login_tos_privacy_wrapper'), {scrollingX: false});
                   

                        $timeout(function(){
                            //$scope.registerModal.termsScroller.refresh();
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
                                //$scope.registerModal.termsScroller.scrollTo(0, offset, 1500, false);
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

            $scope.progressionBar = function(){

                $rootScope.add_width = 0;

                    var elem = document.getElementById("myBar");   
                      var width = 1;
                      var id = setInterval(frame, 10);
                      function frame() {
                        if (width >= 25) {
                          clearInterval(id);
                          document.getElementById("numCircle2").classList.add("bg_change2");
                      
                        } 
                        
                        else {
                          width++; 
                          width = $rootScope.add_width + width;
                          elem.style.width = width + '%'; 
                        }
                      }

                          $rootScope.add_width = width;
            };

         

         $scope.registerModal.aadhaarExistsCheck = function(field){
             
            var str2 = document.getElementById("emailReg2").value;
                //alert(str2);
                if( str2.length == 12 && isNaN(str2) == false){
                    $scope.registerModal.nextBtnActive = '';
                }
            var aadhaar_no_new = document.getElementById("emailReg2").value;
            var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
            var aadhaar_no = false;
            var aadhaar_no_empty = true;
            if(aadhaar_no_new != "" && aadhaar_no_new.length == 10 && !isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML = $scope.interfaceLabels['welcomeModals.emailidnum'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder= $scope.interfaceLabels['welcomeModals.enter.your.emailid'];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.aadhaarnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.adha];
                $scope.registerModal.loginEmailSection = true;
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                
            }
            else if(aadhaar_no_new != "" && aadhaar_no_new.length == 12 && !isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML = $scope.interfaceLabels['welcomeModals.emailidnum'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder= $scope.interfaceLabels['welcomeModals.enter.your.emailid'];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.mobilnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.mmbn];
                $scope.registerModal.loginEmailSection = true;  
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
            }
            else if(aadhaar_no_new != "" && regexEmail.test(aadhaar_no_new) == true && isNaN(aadhaar_no_new)){
                console.log("aadhaar exists check triggered");
                //$scope.registerModal.nextBtnActive = 'active_btn';
                $scope.progressionBar();
                $scope.registerModal.emailOrMobileOrAadhaarClass = "modal-slide-out-left";
                document.getElementById("login_create_account_email_title2").innerHTML = $scope.interfaceLabels['welcomeModals.aadhaarnumber'];
                document.getElementById("emailReg2").placeholder= $scope.interfaceLabels["welcomeModals.enteremail"];
                document.getElementById("emailReg3").placeholder=$scope.interfaceLabels[$scope.adha];
                document.getElementById("login_title_mobile1").innerHTML = $scope.interfaceLabels['welcomeModals.mobilnumber'];
                document.getElementById("mobile_no_focus_new").placeholder=$scope.interfaceLabels[$scope.mmbn];
                $scope.registerModal.loginEmailSection = true;  
                $scope.registerModal.loginEmailSectionClass = "modal-slide-in-right";
                
            }
            else{
                $scope.registerModal.nextBtnActive = '';
                //alert("u r not valid");
            }
               
               
         };

            $scope.registerModal.emailExistsCheck = function(field){

                /*function migrateNext() {
                    //alert('Hello');
                }

                document.getElementById("login_username_submit_btn").addEventListener("click", migrateNext);*/

                /*document.getElementsByClassName("active_btn").onclick = function(){
                        //alert("this is else");
                    $scope.registerModal.loginEmailSection = false;
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = true;
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                }*/

                var str = field.text;
                //alert(str);
                if(str == ""){
                    $scope.registerModal.loginEmailSection = false;
                    $scope.registerModal.loginEmailSectionClass = "modal-slide-out-left";
                    $scope.registerModal.loginCreateConfirmSection = true;
                    $scope.registerModal.loginCreateConfirmSectionClass = "modal-slide-in-right";
                }
               var email_new = document.getElementById("emailReg3").value;
               var mobile_no_new = document.getElementById("mobile_no_focus_new").value;

               var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

               var email = false;
               var mobile_no = false;
               var aadhaar_no = false;
               var email_empty = true;
               var mobile_no_empty = true;
               var aadhaar_no_empty = true;
               $scope.registerModal.mobileValid = false;

               if(email_new != "" && mobile_no_new != "")
               {
                //////alert("email and mobile no are not empty");
                    //Enters when email and password fields are not empty.
                    if(regexEmail.test(email_new))
                    {
                        //Entering when email field is correct
                        //////alert("valid email address");
                            
                        email = true;
                    }   
                    else
                    {
                        //Entering when invalid email address
                        //////alert("inavlid email address");
                        $scope.registerModal.emailValid = false;
                        var para = document.createElement("p");
                                var node = document.createTextNode("Please enter a valid email address");
                                para.id = "email_custom_error";
                                para.appendChild(node);

                                var higi_text_field = document.getElementsByTagName("higi-text-field")[3];
                                //reset email text box
                                document.getElementById("emailReg3").value = "";

                                higi_text_field.appendChild(para);

                                setTimeout(function () {
                                    para.parentNode.removeChild(para);
                                }, 5000);


                                 $scope.registerModal.submitting = false;

                        email = false;

                    } 
                    if(mobile_no_new.length < 12)
                    {   
                        //Entering when mobile no length is not correct
                        //////alert("Invalid mobile length")
                        mobile_no = false;
                    }
                    else
                    {
                        //Entering when mobile no length  is correct
                        //////alert("Valid mobile length");
                        mobile_no = true; 
                        $scope.registerModal.mobileValid = true;
                    }

                    if(email == true && mobile_no == true)
                    {
                        //////alert("email and mobile nos are true");
                         $scope.registerModal.emailValid = true;
                         $scope.registerModal.mobileValid = true;
                        $scope.progressionBar();

                            HigiApiService.checkEmailExist(field.text,
                                //Doesn't exist, move forward
                                function () {
                                    
                                    $scope.registerModal.showPasswordSection();

                                    //document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
                                    //document.getElementsByClassName("regMailid").style.display="none !important";

                                },
                                //Exists, show exists error
                                function () {

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


                    }
                    if(mobile_no == false)
                    {

                        var para1 = document.createElement("p");
                                var node1 = document.createTextNode("Mobile no should be minimum 10 digit.");
                                para1.id = "mobileno_custom_error";
                                para1.appendChild(node1);

                                var higi_text_field1 = document.getElementsByTagName("higi-text-field")[3];

                                document.getElementById("mobile_no_focus_new").value = "";
                                higi_text_field1.appendChild(para1);

                                setTimeout(function () {
                                    para1.parentNode.removeChild(para1);
                                }, 5000);

                                $scope.registerModal.mobileValid = false;
                                 $scope.registerModal.submitting = false;
                    }
                    if(mobile_no == true)
                    {
                        $scope.registerModal.mobileValid = true;
                        $scope.registerModal.submitting = true;
                    }   
                    if(mobile_no ==true && email == false || mobile_no ==false && email == true)
                    {
                        $scope.registerModal.submitting = false;
                    }

               }
               else if(email_new != "")
               {
                    //Entering inside when email field is not empty
                   // //////alert("email is not empty");

                    if(regexEmail.test(email_new))
                    {
                        //Entering when email field is correct
                       // //////alert("valid email address");
                            
                        email = true;
                    }   
                    else
                    {
                        //Entering when invalid email address
                         $scope.registerModal.emailValid = false;
                        ////////alert("invalid email address");
                        var para = document.createElement("p");
                                var node = document.createTextNode("Please enter a valid email address");
                                para.id = "email_custom_error";
                                para.appendChild(node);

                                var higi_text_field = document.getElementsByTagName("higi-text-field")[3];
                                //reset email text box
                                document.getElementById("emailReg3").value = "";

                                higi_text_field.appendChild(para);

                                setTimeout(function () {
                                    para.parentNode.removeChild(para);
                                }, 5000);


                                 $scope.registerModal.submitting = false;

                        email = false;

                    } 
                    if(email == true)
                    {   

                        $scope.registerModal.emailValid = true;
                        $scope.progressionBar();

                            HigiApiService.checkEmailExist(field.text,
                                //Doesn't exist, move forward
                                function () {
                                    
                                    $scope.registerModal.showPasswordSection();

                                    //document.getElementById("signup_mail_placeholder ").classList.add("signup_password");
                                    //document.getElementsByClassName("regMailid").style.display="none !important";

                                },
                                //Exists, show exists error
                                function () {

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

                    }



                    
               }
               else if(mobile_no_new != "")
               {
                    //Entering when mobile no field is not empty
                    ////////alert("mobile no is not empty");

                    if(mobile_no_new.length < 10)
                    {
                        $scope.registerModal.mobileValid = false;
                         mobile_no = false;
                    }
                    else
                    {
                        $scope.registerModal.mobileValid = true;
                        mobile_no = true;
                    }
                    if(mobile_no == true)
                    {
                        $scope.progressionBar();
                        $scope.registerModal.showPasswordSection();
                        //$scope.registerModal.submitting = true;
                    } 

                    else
                    {
                        var para1 = document.createElement("p");
                                var node1 = document.createTextNode("Mobile no should be minimum 10 digit.");
                                para1.id = "mobileno_custom_error";
                                para1.appendChild(node1);

                                var higi_text_field1 = document.getElementsByTagName("higi-text-field")[3];

                                document.getElementById("mobile_no_focus_new").value = "";
                                higi_text_field1.appendChild(para1);

                                setTimeout(function () {
                                    para1.parentNode.removeChild(para1);
                                }, 5000);


                                 $scope.registerModal.submitting = false;
                    }

                    
               }



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

           $scope.focus_control = function(){
                document.getElementById("mobile_no_focus").focus();
                //document.getElementById("emailReg").blur();
                //emailReg
           };

           
           $scope.Capture = function()
           {
            if($scope.registerModal.skipFingerprintCalled == true){
                //alert("inside skip");
                return;
            }
            //$scope.registerModal.fields[0].text
                        //var mobileGet = document.getElementById('mobile_no_focus_new').value;
                        //var emailGet = $scope.registerModal.fields[0].text;
                        /*var emailGet = "";
                        var mobileGet = "";
                        var aadhaarGet = "";
                        var fieldValue = $scope.registerModal.fields[0].text;
                        var fieldValue2 = $scope.registerModal.fields[1].text;
                        var fieldValue3 = $scope.registerModal.fields[2].text;
                        var firstNameTextBoxValue = $scope.registerModal.fields[4].text;
                        var lastNameTextBoxValue = $scope.registerModal.fields[5].text;
                     
                        //alert("field1" + fieldValue);
                        //alert("field2" + fieldValue2);
                         //alert("field3" + fieldValue3);



                        if(isNaN(fieldValue) == true){
                            emailGet = fieldValue;
                        }
                        else if(isNaN(fieldValue2) == true){
                            emailGet = fieldValue2;
                        }
                        else if(isNaN(fieldValue3) == true){
                            emailGet = fieldValue3;
                        }
                        else{
                            emailGet = "";
                        }


                        if(fieldValue.length == 10 && isNaN(fieldValue) == false){
                            mobileGet = fieldValue;
                        }
                        else if(fieldValue2.length == 10 && isNaN(fieldValue2) == false){
                            mobileGet = fieldValue2;
                        }
                        else if(fieldValue3.length == 10 && isNaN(fieldValue3) == false){
                            mobileGet = fieldValue3;
                        }
                        else{
                            mobileGet = "";
                        }


                        if(fieldValue.length == 12 && isNaN(fieldValue) == false){
                            aadhaarGet = fieldValue;
                        }
                        else if(fieldValue2.length == 12 && isNaN(fieldValue2) == false){
                            aadhaarGet = fieldValue2;
                        }
                        else if(fieldValue3.length == 12 && isNaN(fieldValue3) == false){
                            aadhaarGet = fieldValue3;
                        }
                        else{
                            aadhaarGet = "";
                        }

                        var passwordGet = document.getElementById('passwordReg').value;*/

            /*...*/
            var emailGet = "";
            var mobileGet = "";
            var aadhaarGet = "";
            var affiliateGet = "";
            var fieldValueEmail = $scope.registerModal.fields[0].text;
            var fieldValue = $scope.registerModal.fields[2].text;
            var fieldValue2 = $scope.overallAadharFieldValue;
            var firstNameTextBoxValue = $scope.registerModal.fields[3].text;
            var lastNameTextBoxValue = $scope.registerModal.fields[4].text;
            var passwordGet = $scope.registerModal.fields[5].text;
            var EmpID = $scope.registerModal.fields[10].text;

            if (fieldValueEmail != "" && (isNaN(fieldValueEmail) == true) && fieldValueEmail != null && fieldValueEmail != undefined) {
                
                emailGet = fieldValueEmail;
            }else{
                
                emailGet = "";
            }
        
            if(fieldValue.length == 10 && (isNaN(fieldValue) == false) && fieldValue != null && fieldValue != undefined){
                
                mobileGet = fieldValue;
            }else{
                
                mobileGet = "";
            }

            if(fieldValue2.length == 12 && (isNaN(fieldValue2) == false) && fieldValue2 != null && fieldValue2 != undefined){
                
                aadhaarGet = fieldValue2;
            }else{
                
                aadhaarGet = "";
            }

            if($rootScope.newAccountEmailID != "" && (isNaN($rootScope.newAccountEmailID) == true) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined ){
                
                emailGet = $rootScope.newAccountEmailID;
            }else if($rootScope.newAccountEmailID.length == 10 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                
                mobileGet = $rootScope.newAccountEmailID;
            }else if($rootScope.newAccountEmailID.length == 12 && (isNaN($rootScope.newAccountEmailID) == false) && $rootScope.newAccountEmailID != null && $rootScope.newAccountEmailID != undefined){
                
                aadhaarGet = $rootScope.newAccountEmailID;
            }


            if ($scope.affiliateValue != "" && $scope.affiliateValue != null && $scope.affiliateValue != undefined){
                affiliateGet = $scope.affiliateValue;
            }else{
                affiliateGet = "";
            }
                        
                try {
                        var formData = new FormData();
formData.append("machineState", "tamil nadu");
formData.append("machineCity", "chennai");
formData.append("machineOrganisation", "srushty");
formData.append("kioskId", "228857");
formData.append("email", emailGet);
formData.append("mobileNumber", mobileGet);
formData.append("termsFileName", "termsofuse_v9_01122016");
formData.append("privacyFileName", "privacypolicy_v7_08112014");
formData.append("password", passwordGet);
formData.append("encryptionVersion", null);
formData.append("aadhaarNumber", aadhaarGet);
formData.append("machine_org", $rootScope.uniqueKioskId.split('-')[1]);
formData.append("employee_id", EmpID);

formData.append("firstname", firstNameTextBoxValue);
formData.append("lastname", lastNameTextBoxValue);

//alert("aadhaar"+aadhaarGet);
//alert("email"+emailGet);
//alert("mobile"+mobileGet);

// Attach file
//formData.append("image", $('input[type=file]')[0].files[0]); 

//var baseUrl2 = "azureapi.indiahealthlink.com";
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
    //////alert('tok  '+json.ApiKey);
    //console.log(hai.user.email);

    //for affiliation 
    $scope.initialToken = json.ApiKey;
    //for affiliation end


                          $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + formData.get('email') + "&mobile=" + formData.get('mobileNumber') + "&aadhaar=" + formData.get('aadhaarNumber'),
                            type : "GET", 
                            cache: false,
                            contentType: 'application/json; charset=UTF-8',  
                            headers:{"ApiToken":token},
                            success: function(html){
                                console.log(JSON.stringify(html));
                                emailOrMobileExist = JSON.stringify(html);
                                //alert(emailOrMobileExist);
                                //emailormobileused?email={email}&mobile={mobile}&aadhaar={aadhaar}
                                ////alert("mobile number" + formData.get('mobileNumber'));
                                
                                //////alert(emailOrMobileExist);
                                emailOrMobileExist = emailOrMobileExist.replace(/^"(.*)"$/, '$1');
                                if(emailOrMobileExist == ""){
                                    ////alert(mobileGet);
                          var finalInput = "";
                          /*if(emailGet == "" && aadhaarGet == ""){
                            finalInput = mobileGet;
                          }
                          else if(emailGet == "" && mobileGet == ""){
                            finalInput = aadhaarGet;
                          }
                          else if(aadhaarGet == "" && mobileGet == ""){
                            finalInput = emailGet;
                          }
                          else if(aadhaarGet == ""){
                            finalInput = emailGet;
                          }
                          else if(mobileGet == ""){
                            finalInput = emailGet;
                          }
                          else{
                            finalInput = mobileGet;
                          }*/
                            //alert("this man" + finalInput);
                        finalInput = $rootScope.newAccountEmailID;
                        // console.log("form data", formData);
                      $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/CreateNewUserForFingerprint2",
                        type : "POST", 
                        data:formData,
                        processData:false,
                        contentType: false,
                        headers: { 'ApiToken': token },
                            success: function(html){


                          //////alert('third Response success');
                          var json3= JSON.parse(JSON.stringify(html));
                          var jss3=JSON.stringify(json3);
                          //////alert('third tok  '+jss3);
                          console.log(json3);

                          
                          //var jsontext2 = '{"email": "'+finalInput+'"}';
                          var jsontext2 = '{"email": "'+finalInput+'", "password":"'+passwordGet+'", "encryptionVersion": '+null+'}';
                          //debugger;
                          //alert(jsontext2);
                          $.ajax({
                            //url: getSettingsValue('kiosk.api.url') + "/login/quickUserLoginOnlyEmail",
                            url: getSettingsValue('kiosk.api.url') + "/login/qlogin2",
                            type : "POST", 
                            cache: false,
                            data:jsontext2,
                             contentType: 'application/json; charset=UTF-8',  
                             dataType: 'json',
                          headers: { 'ApiToken': token, 'Token':  json3.token },
                            success: function(html){
                             //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                             console.log(html);

                             $scope.affiliateLoginResponse = html;

                             $scope.updateAffiliateStatus();

                             var qlogin = html;
                             //////alert(qlogin.Token);
                             
                             //if($route.current.$$route.originalPath.search("finish") != -1){
                    var callback = $rootScope.saveCheckinFinalResultsLogin;
                //} else {
                  //  var callback = null;
                //}

                             
                                $scope.registerModal.watch();
                                
                                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                    HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                
                                    $rootScope.userToken = qlogin.Token;
                                    $rootScope.UserInfo = qlogin.User;
                                // session storage for telemedi registeration flow start
                            //````````````````````````````````````````````````````````````
                            
                                HigiKioskStorageService.saveSessionData('telemedloginUserId' , qlogin.User.id);
                                HigiKioskStorageService.saveSessionData('qlogin' , qlogin);
                                $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
                                HigiKioskStorageService.saveSessionData('telemedUserEmail' , qlogin.User.email);
                                HigiKioskStorageService.saveSessionData('telemedUserFirstName' , qlogin.User.firstName);
                                HigiKioskStorageService.saveSessionData('telemedUserLastName' , qlogin.User.lastName);
                                
                                if(qlogin.User.dateOfBirth != undefined){
                                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , qlogin.User.dateOfBirth.replace("/", "-"));
                                } else {
                                    HigiKioskStorageService.saveSessionData('telemedUserDOB' , "01-30-1800"); // dummy date provide for telemedi registeration
                                }    
                                if(qlogin.User.gender != undefined){
                                    if(qlogin.User.gender == "m"){                                     
                                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");    
                                    } else {
                                        HigiKioskStorageService.saveSessionData('telemedUserGender' , "female");    
                                    }
                                } else {
                                    HigiKioskStorageService.saveSessionData('telemedUserGender' , "male");  // dummy date provide for telemedi registeration
                                }

                                if(qlogin.User.mobileNumber != undefined && qlogin.User.mobileNumber != ""){  // mobile number is optional for ihl registeration flow             
                                    HigiKioskStorageService.saveSessionData('telemedUserMobileNumber' , qlogin.User.mobileNumber);
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
                            
                            
                          },
                          });
                          //HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                          
                          },
                          error : function(xhr, status, error) { 
                                //////alert('failures 3'+xhr.responseText);

                             } 
                        });
                  }
                  else{
                    ////////alert($scope.registerModal.loginMobileNumberError);
                    $scope.registerModal.init();
                    document.getElementById("guy-1").style.display = "none";
                    document.getElementById("scanning_line").style.display = "none";
                  }
}
});
}
});


                        
                    
                         
            }
            catch (e) {
            }
            return false;

           };



           
            $scope.registerModal.register = function(){

                $scope.Capture();
                document.getElementById("login_create_loading").style.display = "block";
                document.getElementById("login_create_submit_btn").style.display = "none";
                $scope.registerModal.submitting = true;
                $scope.registerModal.passwordLengthCheck($scope.registerModal.fields[3]);

                /*
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
                */
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
                                // success
                                qlogin = response;
                                $scope.registerModal.watch();
                                var initSession = function(){
                                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_accountCreated', 'none', 'none');
                                    HigiKioskUserService.initSession(qlogin.User, qlogin.LastCheckin, true, qlogin.Token, qlogin, callback);
                                };
                                
                                $rootScope.UserToken = qlogin.Token;
                                $rootScope.UserInfo = qlogin.User;
                            // session storage for telemedi registeration flow start
                            //````````````````````````````````````````````````````````````
                                

                                HigiKioskStorageService.saveSessionData('telemedloginUserId' , qlogin.User.id);
                                HigiKioskStorageService.saveSessionData('qlogin' , qlogin);
                                $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));
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

            $scope.registerModal.clearAllRegisterScreens = function (){
                $scope.registerModal.loginEmailSection = false;
                $scope.registerModal.loginNameSection = false;
                $scope.registerModal.loginEmpIDSection = false;
                $scope.registerModal.aadharSection = false;
                registerModal.healthIDSection = false;
                $scope.registerModal.loginCreateConfirmSection = false;
                $scope.registerModal.loginCreateFingerprintCapturingSection = false;
                $scope.registerModal.loginCreateFingerprintSection = false;
                $scope.registerModal.fingerprintRegretSection = false;
                $rootScope.fingerprintRegretSectionNew = false;
                $scope.registerModal.fingerprintAlreadyExistsSection = false;
                $scope.registerModal.fingerprintAlreadySkippedSection = false;
                $(".signup_modal_progression_dots2").css('background-color','#bbb');
                $(".signup_modal_progression_dots3").css('background-color','#bbb');
                $(".signup_modal_progression_dots4").css('background-color','#bbb');
                $(".signup_modal_progression_dots_main_container").css('visibility','hidden');

                if ($scope.registerModal.registerTermsAcceptanceClass != undefined) {
                    $scope.registerModal.registerTermsAcceptanceClass = '';
                }

                if ( $scope.registerModal.signupfinalSubmitButtonClass != undefined) {
                    $scope.registerModal.signupfinalSubmitButtonClass = '';
               }
            }


            $scope.registerModal.init();
        }
        //Affiliate status functionality - thamarai
        $scope.onAffiliateChange = function(Affiliatestatusvalue){
            $("#affiliatestatuss").css('border' , '2px solid #3787c0');
            $("#mobile_no_focus_new").css('border' , '2px solid #808080d1');
            $(".signup_modal_mobile_number_cnt_code").css('border' , '2px solid #808080d1');
            $("#aadharfield1").css('border' , '2px solid #808080d1');
            $("#aadharfield2").css('border' , '2px solid #808080d1');
            $("#aadharfield3").css('border' , '2px solid #808080d1');
            //console.log(Affiliatestatusvalue);
            $scope.affiliateValue = Affiliatestatusvalue;

            /*if($rootScope.affiliateListFech.length != 0){
                for (var i = 0; $rootScope.affiliateListFech.length > i; i++) {
                    if($rootScope.affiliateListFech[i].company_name != undefined){
                        if($rootScope.affiliateListFech[i].company_name == $scope.affiliateValue){
                            $scope.affiliateValue = $rootScope.affiliateListFech[i].affiliation_unique_name;
                            break;
                        }
                    }                                
                }
            }*/


            if ($scope.affiliateValue == null || $scope.affiliateValue == undefined || $scope.affiliateValue == "" || $scope.affiliateValue == "None") {
                $scope.affiliateValue = "";
                $rootScope.userSelectAffliateInRegFlow = "";
            } else {
                $rootScope.userSelectAffliateInRegFlow = Affiliatestatusvalue;
                $scope.affiliateValue = $rootScope.affiliateOrgCode;
            }
        }

        $scope.updateAffiliateStatus = function(){
            var token = $scope.initialToken;
            var json = $scope.affiliateLoginResponse;
            

            if (json.User != null && json.User != undefined && json.User != "") {
                if (json.User.affiliate == null || json.User.affiliate == undefined ||  json.User.affiliate == "") {
                    if ($scope.affiliateValue != undefined && $scope.affiliateValue != null && $scope.affiliateValue != "") {
                        json.User["affiliate"] = $scope.affiliateValue;
                    }else{
                        json.User["affiliate"] = "";
                    }
                }else{
                    if ($scope.affiliateValue != undefined && $scope.affiliateValue != null && $scope.affiliateValue != "") {
                        json.User.affiliate = $scope.affiliateValue;
                    }else{
                        json.User.affiliate = "";
                    }
                }
            }

            $.ajax({
                url: getSettingsValue('kiosk.api.url') + "/data/user/"+json.User.id+"",
                type : "POST", 
                cache: false,
                data:JSON.stringify(json.User),
                contentType: 'application/json; charset=UTF-8',  
                dataType: 'json',
                headers: { 'ApiToken': token , 'Token': json.Token},
                success: function(html){
                    // alert("success DELTEE Completed");
                    console.log(html);
                    // alert("delete completed");                          
                },
                error : function(xhr, status, error) { 
                    console.log(error);
                    console.log(status);
                    console.log('failures 3'+xhr.responseText);
                } 
            }); 
        }
        //Affiliate status functionality - ends

        $scope.onAffiliateClickEvent = function(){
            $("#affiliatestatuss").css('border' , '2px solid #3787c0');
            $("#mobile_no_focus_new").css('border' , '2px solid #808080d1');
            $(".signup_modal_mobile_number_cnt_code").css('border' , '2px solid #808080d1');
            $("#aadharfield1").css('border' , '2px solid #808080d1');
            $("#aadharfield2").css('border' , '2px solid #808080d1');
            $("#aadharfield3").css('border' , '2px solid #808080d1');
        }

        $scope.termsAndConditions = function(){
            $timeout(function(){
                $rootScope.keyboardHide();
            },0,false);
        }

        $scope.checkForKioskPaymentOptions = function(){

            $rootScope.lastCheckinModalShow = true;
            /*if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
                $rootScope.clearModal();
                $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.initializeVitalTest;
                let modes = $rootScope.selectedVital;
                localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);
                //To hide the reason for visit close button.
                $(".keyboard_class_close_btn").hide();
            }else{
               $scope.initializeVitalTest(); 
            }*/
        }   

        $scope.initializeVitalTest = function(){
            if ($rootScope.IHLTeleConsultSelected == true) {
                HigiKioskStorageService.saveSessionData('current_mode', "TC");
                $rootScope.clearModal();
                window.location =  "#/onboarding1/forward/enter";
            }else{
                $rootScope.mode = $rootScope.selectedVital[0];
                HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
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
    }

    };
}]);