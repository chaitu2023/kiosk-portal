higiKioskControllers.directive('flipKartQrCodeScannerModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', '$sce', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route, $sce) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/flipkartplus/flipkart-qrcode-scanner.html',
        controller: function ($scope) {
            $scope.registerModal = new Object();
            $scope.registerModal.loginNameSectionClass = "modal-slide-in-left";
            $scope.registerModal.globalSignup = "welcomeModals.signup";
            $scope.registerModal.registerTermsAcceptanceClass = '';
            $scope.registerModal.signupfinalSubmitButtonClass = '';
            $scope.registerModal.termsAccepted = false;
            $scope.isLoadingSignup = false;
            $scope.registrationFlow = false;
            $scope.userTransactionId = '';
            $scope.ihlThirdPartyUserId = '';
            $scope.tnCpP1 = "welcomeModals.tnCpP1";
            $scope.tnCpP2 = "welcomeModals.tnCpP2";
            $scope.tnCpP3 = "welcomeModals.tnCpP3";
            $scope.tnCpP4 = "welcomeModals.tnCpP4";
            $scope.frnme = "welcomeModals.frnme";
            $scope.lnnme = "welcomeModals.lnnme";
            $scope.validatename = "welcomeModals.validatename";

            window.addEventListener('message', async function(event) {
                console.log(event.data);
                if ($rootScope.flipKartPlus) {
                    /* FOR DECRYPT THE USER ID */
                    // let userEncId = 'U2FsdGVkX18YvUGciYMFGiGUX+xVOHvDpWUiHKMIWpctzOJ1u3/2S+8B0X1KUdyO';
                    // let userEncId = event.data;
                    // let userDecryptVal = $scope.aesDecryption(userEncId);
                    // console.log(userDecryptVal);
                    // $scope.ihlThirdPartyUserId = JSON.parse(userDecryptVal)['user_id'];
                    $scope.showTermsAndConditionsInfo();
                    $scope.registerModal.checkFlipKartAccountExists();
                    $scope.ihlThirdPartyUserId = 'b84adv4s458797';
                }
            });

            $scope.registerModal.fields = [
                {id : "firstname" , placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.frnme'),defaultText : "Enter your first name" , text : '' , type :'text' , visible : true , selectedClass : '',
                    callback : function(){$scope.registerModal.FirstNameValidation(this)},
                    focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                {id : "lastname" , placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.lnnme"),defaultText : "Enter your last name" , text : '' , type :'text' , visible : true , selectedClass : '',
                    callback : function(){$scope.registerModal.LastNameValidation(this)},
                    focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
            ];

            $scope.registerModal.FirstNameValidation = function(field) {
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


                    document.getElementById("firstname").placeholder= "Enter First Name";
                    
                    $scope.registerModal.loginNameSection = true;
                }
            }
            
            $scope.registerModal.LastNameValidation = function(field) {
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


                    document.getElementById("lastname").placeholder="Enter Last Name";;
                    
                    $scope.registerModal.loginNameSection = true;
                }
            }

            $scope.registerModal.toggleTermsAcceptance = function(){
                $scope.registerModal.termsAccepted = !$scope.registerModal.termsAccepted;
                $rootScope.keyboardHide(); // keyboard hide for terms and condition show.
                var firstNameCount = $("#firstname").val().length;
                var lastNameCount = $("#lastname").val().length;
    
                if ($scope.registerModal.termsAccepted && (firstNameCount > 3) && (lastNameCount > 3) && isNaN($("#firstname").val()) == true && isNaN($("#firstname").val()) == true) {
                    $scope.registerModal.registerTermsAcceptanceClass = 'active_checkmark';
                    $scope.registerModal.signupfinalSubmitButtonClass = 'signup_modal_create_active_btn';
                }
                else {
                    $scope.registerModal.registerTermsAcceptanceClass = '';
                    $scope.registerModal.signupfinalSubmitButtonClass = '';
                }
            };

            $scope.termsAndConditions = function() {
                $scope.showTermsAndConditionsInfo();
                $timeout(function() {
                    $rootScope.keyboardHide();
                },0,false);
            }

            $scope.showTermsAndConditionsInfo = function() {
                $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['terms.filename'] + '.html').success(function(data){
                    $scope.registerModal.termsOfServicePpol = data + '<a id="ppol_anchor" name="privacy"></a>';
                    $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                        $scope.registerModal.termsOfServicePpol += data;
                        $scope.registerModal.termsOfServicePpol = $sce.trustAsHtml($scope.registerModal.termsOfServicePpol);
                        
                        $timeout(function() {
                            $scope.scroll = new FTScroller(document.getElementById('terms_main_container'), {scrollingX: false});
                        }, 1000); 
                    });
                });
            }

            $scope.registerModal.checkFlipKartAccountExists = function() {
                var formData = {'ihlThirdPartyUserId': $scope.ihlThirdPartyUserId, 'ihlThirdpartyVendorName': 'flipkartplus'}

                HigiApiService.checkFlipKartAccountExists(formData,
                    function (resp) {
                        if (resp != '') {
                            $scope.userTransactionId = resp.split(':')[1];
                            $scope.registrationFlow = true;
                            $rootScope.focusField($scope.registerModal.fields[0]);
                        } else {
                            $scope.registerModal.loginFlipKartUserIntoHPod();
                        }
                    }
                );
            }

            $scope.registerModal.registerFlipKartUserIntoHPod = function() {
                $scope.registerModal.signupfinalSubmitButtonClass = '';
                $scope.isLoadingSignup = true;

                var formData = {
                    "user": {
                        "ihlthirpartyUserId": $scope.userTransactionId,
                        "ihlthirdpartyVendorName":"flipkartplus",
                        "userInputWeightInKG": "",
                        "firstName": $scope.registerModal.fields[0].text.trim(),
                        "lastName": $scope.registerModal.fields[1].text.trim(),
                        // "dateOfBirth": "",
                        "gender": "",
                        "heightMeters": "",
                        "fingerprint": "",
                        "affiliate": "",
                        "terms": {
                            "termsFileName": "termsofuse_v9_01122016"
                        },
                        "privacyAgreed": {
                            "privacyFileName": "privacypolicy_v7_08112014"
                        }
                    },
                    "encryptionVersion": null
                }

                HigiApiService.registerFlipKartUserIntoHPod(formData,
                    function (resp) {
                        if (resp != null) {
                            $scope.registerModal.loginFlipKartUserIntoHPod($scope.ihlThirdPartyUserId);
                        }
                    }
                );
            }

            $scope.registerModal.loginFlipKartUserIntoHPod = function() {
                var loginParms = {
                    "ihlthirpartyUserId": $scope.ihlThirdPartyUserId,
                    "ihlthirdpartyVendorName":"flipkartplus"
                }
                HigiApiService.loginFlipKartUserIntoHPod(loginParms, function(resp) {
                    if ('Token' in resp) {
                        $rootScope.enableCamera = false;
                        $rootScope.clearModal();
                        $scope.isLoadingSignup = false;
                        var userId = resp.User.id;
                        var token = resp.Token;

                        if ($route.current.$$route.originalPath.search("finish") != -1) {
                            var callback = $rootScope.saveCheckinFinalResultsLogin;
                        } else {
                            var callback = null;
                        }

                        if (resp != null) {
                            $scope.getPastKioskVitalData(resp);
                        }
        
                        if (resp != null) {     
                            $rootScope.UserToken = resp.Token;
                            $rootScope.logged_mail = resp.User.email;

                            HigiApiService.storeLoginUserRecord(resp.User.id, 'flipkartQR', function(res){
                                console.log('storeLoginUserRecord', res)
                                $rootScope.hideESanjeevaniBtn = false;
                            }, function(err){
                                console.log('storeLoginUserRecord', err);
                                $rootScope.hideESanjeevaniBtn = true;
                            })
        
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
                            $scope.showLoginAlertMsg = true;
                            $timeout(() => {
                                $scope.showLoginAlertMsg = false;
                            }, 5000);
                        }
                        else {
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
                                    console.log(resp.LastCheckin.dateOfBirth);
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
                        $scope.isLoadingSignup = false;
                    }
                });
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

            $scope.filteredVitalData = function(lastCheckinVital) {
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
                
                if ("weightKG" in lastCheckinVital && lastCheckinVital["weightKG"] != null && lastCheckinVital["weightKG"] != undefined && !isNaN(lastCheckinVital["weightKG"])) {
                    lastCheckinVital["weightKG"] = Math.round(+lastCheckinVital["weightKG"]);
                }
                if ("heightMeters" in lastCheckinVital && lastCheckinVital["heightMeters"] != null && lastCheckinVital["heightMeters"] != undefined && !isNaN(lastCheckinVital["heightMeters"])) {
                    lastCheckinVital["heightMeters"] = Math.round(+lastCheckinVital["heightMeters"]);
                }
                
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
            }

            $scope.aesDecryption = function(data) {
                let key = getSettingsValue('kiosk.fkQrCodeSecretKey');
                let decrypted = CryptoJS.AES.decrypt(data, key, 
                    {
                        mode:CryptoJS.mode.CBC,
                        padding:CryptoJS.pad.Pkcs7 
                    }
                );
                return decrypted.toString(CryptoJS.enc.Utf8);
            }
        }
    }
}])