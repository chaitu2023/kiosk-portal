higiKioskControllers.directive('eSanjeevaniModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/e-sanjeevani.html',
        controller: function ($scope) {

            $scope.loginESanjeevaniModal = new Object();
            $scope.loginESanjeevaniModal.watch = $scope.$watch('modalVisible', function (newVal, oldVal) {
                if (newVal == false) {
                    $scope.loginESanjeevaniModal.init();
                }
            });
            $scope.loginESanjeevaniModal.labelWatch = $rootScope.$watch('interfaceLabels', function (newVal, oldVal) {
                $scope.loginESanjeevaniModal.init();
            });

            $scope.loginESanjeevaniModal.init = function () {
                $scope.loginESanjeevaniModal.loginEmailSectionClass = "";  
                $scope.loginESanjeevaniModal.globalNext = "eSanjeevani.next";
                $scope.loginESanjeevaniModal.loginPasswordErrorMessage = "eSanjeevani.invalidPassText";
                $scope.loginESanjeevaniModal.loginServerError = "eSanjeevani.serverErrorText";
                $scope.loginESanjeevaniModal.globalLogin = "eSanjeevani.loginText";
                $scope.loginESanjeevaniModal.globalBack = "eSanjeevani.backText";
                $scope.loginESanjeevaniModal.ForgetPass = "eSanjeevani.forgotPassText";
                $scope.loginESanjeevaniModal.requiredInputField = "eSanjeevani.requiredInputField";
                $scope.loginESanjeevaniModal.invalidMobNum = "eSanjeevani.invalidMobNum";
                $scope.loginESanjeevaniModal.invalidOperator = "eSanjeevani.invalidOperator";
                $scope.loginESanjeevaniModal.noPatientAvail = "eSanjeevani.noPatientAvail";
                $scope.loginESanjeevaniModal.sentNewPass = "eSanjeevani.sentNewPass";
                $scope.loginESanjeevaniModal.continueText = "eSanjeevani.continueText";
                $scope.loginESanjeevaniModal.patientListText = "eSanjeevani.patientListText";
                $scope.loginESanjeevaniModal.patientIdText = "eSanjeevani.patientIdText";
                $scope.loginESanjeevaniModal.dobText = "eSanjeevani.dobText";
                $scope.loginESanjeevaniModal.genderText = "eSanjeevani.genderText";

                $scope.loginESanjeevaniModal.fields = [
                    { id: "mobile", placeholder:HigiKioskUtilitiesService.getPlaceholder('welcomeModals.entermobileenumber'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.loginESanjeevaniModal.MobilePatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                    { id: "eSanjeevaniPassword", placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.enteryouypasswords'), defaultText: "", text: "", textMasked: '', type: 'password', visible: true, selectedClass: '', callback: function () { $scope.loginESanjeevaniModal.passwordLengthCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true }
                ];

                $rootScope.fields.login = $scope.loginESanjeevaniModal.fields;

                $scope.loginESanjeevaniModal.mobilefieldIsEmpty = false;
                $scope.loginESanjeevaniModal.invalidMobileNumber = false;
                $scope.loginESanjeevaniModal.loginEmailSection = true;
                $scope.loginESanjeevaniModal.forgotVisible = true;
                $scope.loginESanjeevaniModal.showPatientList = false;
                $scope.loginESanjeevaniModal.showSuccessMsg = false;
                $scope.loginESanjeevaniModal.submitting = false;
                $scope.loginESanjeevaniModal.invalidOperator = false;
                $scope.loginESanjeevaniModal.showForgotLoader = false;
                $scope.loginESanjeevaniModal.showMissingTestRequest = false;
                $scope.loginESanjeevaniModal.noPatientForOperator = false;
                $scope.loginESanjeevaniModal.showTestList = false;
                $scope.loginESanjeevaniModal.EmailAndPasswordDivisionClass = '';
                $scope.loginESanjeevaniModal.loginBtnActive = '';
                $rootScope.clearLoginScreens = $scope.loginESanjeevaniModal.clearAllLoginScreens;
                $scope.loginESanjeevaniModal.patientList = [];
                $scope.loginESanjeevaniModal.vitalParams = [
                    {name: 'BLOOD_PRESSURE', mode: 'bp', hwAvailabilityStr: 'Blood Pressure'},
                    {name: 'HEART_RATE', mode: 'bp', hwAvailabilityStr: 'Blood Pressure'},
                    {name: 'BMI', mode: 'w', hwAvailabilityStr: 'Weight Scale'},
                    {name: 'WEIGHT', mode: 'w', hwAvailabilityStr: 'Weight Scale'},
                    {name: 'ECG', mode: 'ekg', hwAvailabilityStr: 'ECG'},
                    // {name: 'bmc', name: 'bmc'},
                    {name: 'PULSE_OXIMETER', mode: 'spo2', hwAvailabilityStr: 'SPo2'},
                    {name: 'TEMPERATURE', mode: 'temp', hwAvailabilityStr: 'temp'}
                ]
                $scope.loginESanjeevaniModal.invasiveParams = [
                    {name: 'BLOOD_GLUCOSE', mode: 'glc'},
                    {name: 'URINE_CHECKUP', mode: 'urn'},
                    // {name: 'HCV', mode: 'hcv'},
                    {name: 'PREGNANCY', mode: 'preg'},
                    {name: 'DENGUE', mode: 'deng'},
                    {name: 'TROPONIN_1', mode: 'trop'},
                    {name: 'HEMOGLOBIN', mode: 'heamo'},
                    {name: 'MALARIA', mode: 'mal'},
                    {name: 'SYPHILIS', mode: 'syph'},
                    {name: 'LIPID_PROFILE', mode: 'lip'},
                    {name: 'HIV', mode: 'hiv'}
                ]
                $scope.loginESanjeevaniModal.testList = [
                    {name: 'BLOOD_GLUCOSE', isSelected: false},
                    {name: 'BLOOD_PRESSURE', isSelected: false},
                    {name: 'BMI', isSelected: false},
                    {name: 'DENGUE', isSelected: false},
                    {name: 'ECG', isSelected: false},
                    {name: 'HCV', isSelected: false},
                    {name: 'HEART_RATE', isSelected: false},
                    {name: 'HEIGHT', isSelected: false},
                    {name: 'HEMOGLOBIN', isSelected: false},
                    {name: 'HEP_B', isSelected: false},
                    {name: 'HIV', isSelected: false},
                    {name: 'LIPID_PROFILE', isSelected: false},
                    {name: 'MALARIA', isSelected: false},
                    {name: 'PREGNANCY', isSelected: false},
                    {name: 'PULSE_OXIMETER', isSelected: false},
                    {name: 'TEMPERATURE', isSelected: false},
                    {name: 'URINE_CHECKUP', isSelected: false},
                    {name: 'WEIGHT', isSelected: false}
                ]
            }
            
            $rootScope.loginESanjeevaniModalInit = $scope.loginESanjeevaniModal.init;

            /* CHECK MOBILE PATTERN */

            $scope.loginESanjeevaniModal.MobilePatternCheck = function (field) {
                var str = field.text;
                var specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\| ]/;
                if (str.length == 10 && isNaN(str) == false && str != "0000000000" && !specialCharacterPattern.test(str)) {
                    $scope.loginESanjeevaniModal.mobilefieldIsEmpty = false;
                    $scope.loginESanjeevaniModal.invalidMobileNumber = false;
                    if ($scope.loginESanjeevaniModal.fields[1].text.trim().length != 0 && !$scope.loginESanjeevaniModal.invalidMobileNumber)            
                        $scope.loginESanjeevaniModal.loginBtnActive = 'login_modal_password_active_btn';
                    var emailIsThis = "";
                    var mobileIsThis = $scope.loginESanjeevaniModal.fields[0].text;
                    var aadhaarIsThis = "";
                    console.log(mobileIsThis);
                    $rootScope.isOnlinee3 = window.navigator.onLine;
                } else if(str.length == 0){
                    $scope.loginESanjeevaniModal.invalidMobileNumber = false;
                    $scope.loginESanjeevaniModal.loginBtnActive = '';
                } else {
                    $scope.loginESanjeevaniModal.invalidMobileNumber = true;
                    if ($scope.loginESanjeevaniModal.fields[1].text.trim().length != 0 && $scope.loginESanjeevaniModal.invalidMobileNumber)
                        $scope.loginESanjeevaniModal.loginBtnActive = '';
                    $scope.loginESanjeevaniModal.emailValid = false;
                    $scope.loginESanjeevaniModal.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    $scope.loginESanjeevaniModal.mobilefieldIsEmpty = false;
                    document.getElementById("login_mobile_error").innerHTML = "";
                    $(".login_modal_register_forgot_password_button").css({'color': '#4d4d4d', 'background': 'linear-gradient(to bottom,#f7f7f7, #dbdbdb , #c1c1c1)', 'border-top': '2px solid #208ad6bf', 'border-bottom': '2px solid #208ad6bf', 'border-left': '2px solid #208ad6bf', 'box-shadow': '0px 5px 3px #4a4a4ae0', 'border-right': 'none'});
                                            
                }
            };

            $scope.loginESanjeevaniModal.passwordLengthCheck = function (field) {
                var str = field.text;
                console.log(str);

                if ($scope.loginESanjeevaniModal.fields[0].text.trim().length == 0) {
                    $scope.loginESanjeevaniModal.mobilefieldIsEmpty = true;
                    return 0;
                }
                
                if ($scope.loginESanjeevaniModal.fields[0].text.trim().length < 10) {
                    $scope.loginESanjeevaniModal.invalidMobileNumber = true;
                    return 0;
                } 
                if (str.length >= 1 && !$scope.loginESanjeevaniModal.invalidMobileNumber) {
                    $scope.loginESanjeevaniModal.loginBtnActive = 'login_modal_password_active_btn';
                    $rootScope.keyboardEnterButtonFunction = $scope.loginESanjeevaniModal.login;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                } else {
                    $scope.loginESanjeevaniModal.loginBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            $scope.loginESanjeevaniModal.showPasswordToggle = function (field) {
                field.textMaskedDisabled = !field.textMaskedDisabled;
                if (field.textMaskedDisabled) {
                    field.type = "text";
                } else {
                    field.type = "password";
                }
                if (field.textMaskedDisabled) {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                    $scope.loginESanjeevaniModal.showPasswordClass = 'active_eyes';
                    field.textMasked = field.text;
                } else {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                    $scope.loginESanjeevaniModal.showPasswordClass = '';
                    var textMasked = '';
                    for (var i = 0; i < field.textMasked.length; i++) {
                        textMasked += '&#149;';
                    }
                    field.textMasked = textMasked;
                }
            };

            /* E-SANJEEVANI OPERATOR LOGIN FUNCTIONALITY START*/
            $scope.loginESanjeevaniModal.esanjeevaniOperatorLogin = function() {
                $scope.loginESanjeevaniModal.submitting = true;
                $scope.loginESanjeevaniModal.forgotVisible = false;
                $rootScope.operatorPhoneNumber = $scope.loginESanjeevaniModal.fields[0].text;
                $scope.operatorPassword = $scope.loginESanjeevaniModal.fields[1].text;
                var formData = {operatorPhoneNumber: $scope.loginESanjeevaniModal.fields[0].text, operatorPassword: $scope.loginESanjeevaniModal.fields[1].text};
                HigiApiService.esanjeevaniOperatorLogin(formData,
                    function (resp) {
                        console.log(resp);
                        if (resp['success'] == 'true') {
                            //$scope.loginESanjeevaniModal.eSanjeevaniTestRequestList();
                            $rootScope.clearModal();
                            localStorage.setItem("flow", "E-Sanjeevani");
                            let esanjeevaniData = '{"ulo":"'+$rootScope.operatorPhoneNumber+'", "upa":"'+$scope.operatorPassword+'"}';
                            localStorage.setItem("op_lo", esanjeevaniData);
                            window.location="#/esanjeevani-patient-list";
                        } else {
                            $scope.loginESanjeevaniModal.invalidOperator = true;
                            $scope.loginESanjeevaniModal.submitting = false;
                            $scope.loginESanjeevaniModal.forgotVisible = true;

                            $timeout(function() {
                                $scope.loginESanjeevaniModal.invalidOperator = false;
                            }, 3000); 
                        }
                    }
                );
            }
            /* E-SANJEEVANI OPERATOR LOGIN FUNCTIONALITY END */

            /* E-SANJEEVANI TEST REQUEST LIST FUNCTIONALITY START */
            $scope.loginESanjeevaniModal.eSanjeevaniTestRequestList = function() {
                var formData = {operatorPhoneNumber: $scope.loginESanjeevaniModal.fields[0].text};
                HigiApiService.eSanjeevaniTestRequestList(formData,
                    function (resp) {
                        console.log(resp);

                        if (resp['success'] == 'true') {
                            angular.forEach(resp['response'], function(val) {
                                val['dob'] = $scope.loginESanjeevaniModal.epochToDate(val['dob']);
                                $scope.loginESanjeevaniModal.patientList.push(val);
                            });
                            $scope.loginESanjeevaniModal.checkInvasiveSocketConnection();
                            $timeout(function(){ 
                                $scope.loginESanjeevaniModal.showPatientList = true;
                                $scope.loginESanjeevaniModal.loginEmailSection = false;
                                $rootScope.keyboardHide();    
                                $scope.loginESanjeevaniModal.enableScroll();
                            }, 2000);
                        } else {
                            $scope.loginESanjeevaniModal.noPatientForOperator = true;
                            $scope.loginESanjeevaniModal.submitting = false;
                            $scope.loginESanjeevaniModal.forgotVisible = true;

                            $timeout(function() {
                                $scope.loginESanjeevaniModal.noPatientForOperator = false;
                            }, 3000); 
                        }
                        console.log($scope.loginESanjeevaniModal.patientList);
                    }
                );
            }
            /* E-SANJEEVANI TEST REQUEST LIST FUNCTIONALITY END */

            /* E-SANJEEVANI OPERATOR FORGOT PASSWORD FUNCTIONALITY START */
            $scope.loginESanjeevaniModal.esanjeevaniOperatorForgotPassword = function() {
                if ($scope.loginESanjeevaniModal.fields[0].text.trim().length == 0) {
                    $scope.loginESanjeevaniModal.mobilefieldIsEmpty = true;
                    return 0;
                } else if ($scope.loginESanjeevaniModal.fields[0].text.trim().length < 10 || $scope.loginESanjeevaniModal.fields[0].text.trim().length > 10) {
                    $scope.loginESanjeevaniModal.invalidMobileNumber = true;
                    return 0;
                } else {
                    $scope.loginESanjeevaniModal.forgotVisible = false;
                    $scope.loginESanjeevaniModal.showForgotLoader = true;

                    var formData = {operatorPhoneNumber: $scope.loginESanjeevaniModal.fields[0].text};
                    HigiApiService.esanjeevaniOperatorForgotPassword(formData,
                        function (resp) {
                            console.log(resp);
                            if (resp['success'] == 'true') {
                                $scope.loginESanjeevaniModal.showSuccessMsg = true;
                                $scope.loginESanjeevaniModal.showForgotLoader = false;
                                
                                $timeout(function() {
                                    $scope.loginESanjeevaniModal.showSuccessMsg = false;
                                    $scope.loginESanjeevaniModal.forgotVisible = true;
                                }, 5000);

                            } else {
                                $scope.loginESanjeevaniModal.showForgotLoader = false;
                                $scope.loginESanjeevaniModal.invalidOperator = true;

                                $timeout(function() {
                                    $scope.loginESanjeevaniModal.invalidOperator = false;
                                    $scope.loginESanjeevaniModal.forgotVisible = true;
                                }, 5000);
                            }
                        }
                    );
                }
            }
            /* E-SANJEEVANI OPERATOR FORGOT PASSWORD FUNCTIONALITY END */

            $scope.loginESanjeevaniModal.enableScroll = function() {
                $timeout(function(){ 
                    $scope.scroll = new FTScroller(document.getElementById('san_patient_main_container'), {scrollingX: false});
                },100); 
            }

            $scope.loginESanjeevaniModal.fineTunePatientName = function(name) {
                let patientName = name;
                
                if (patientName.search(/&amp;/ig) > -1)
                    patientName =  patientName.replace(/&amp;/ig, " & ").toLowerCase();
                else
                    patientName = patientName.toLowerCase();
                
                if (patientName.length > 27 )
                   return `<span>${patientName}</span>`;
                else
                    return patientName;
            }

            $scope.loginESanjeevaniModal.startTest = function(patientId) {
                $rootScope.externalPatientId = patientId;
                let testRequestListInfo = $scope.loginESanjeevaniModal.patientList.find(x => x.externalPatientId === patientId);

                angular.forEach(testRequestListInfo['testList'], function(val) {
                    let testListData = $scope.loginESanjeevaniModal.testList.find(x => x.name === val);
                    testListData['isSelected'] = true;
                });

                $scope.loginESanjeevaniModal.showPatientList = false;
                $scope.loginESanjeevaniModal.showTestList = true;
            }

            $scope.loginESanjeevaniModal.continueTest = function() {
                $scope.missingTestRequestStr = '';
                $rootScope.operatorPhoneNumber = $scope.loginESanjeevaniModal.fields[0].text;
                $rootScope.testList = [];
                $rootScope.missingTestRequest = [];
                $rootScope.selectedVital = [];
                $rootScope.selectedIvtListArray = [];

                let testRequestList = $scope.loginESanjeevaniModal.patientList.find(x => x.externalPatientId === $rootScope.externalPatientId);
                $rootScope.testList = testRequestList['testList'];
                $rootScope.user.firstName = testRequestList['firstName'];
                let gender = testRequestList['gender'].toLowerCase();
                if( gender == "male"){
                    HigiKioskStorageService.saveSessionData('gender' , 'm');
                } else {
                    HigiKioskStorageService.saveSessionData('gender' , 'f');
                }

                if(testRequestList['dob']){
                    let ihlDOB = testRequestList['dob'].split("/");
                    let ihlDOBFormat = ihlDOB[1]+"/"+ihlDOB[0]+"/"+ihlDOB[2];
                    HigiKioskStorageService.saveSessionData('birthdate' ,ihlDOBFormat);   
                }
                

                /* CHECK WITH NON-INVASIVE PARAMS */
                angular.forEach($scope.loginESanjeevaniModal.vitalParams, function (value, key) {
                    if ($rootScope.hardwareAvailability[value['hwAvailabilityStr']] && $rootScope.testList.includes(value['name']))
                        $rootScope.selectedVital.push(value['mode']);
                    else if ($rootScope.testList.includes(value['name']))
                        $rootScope.missingTestRequest.push(value['name']);
                });


                /* CHECK WITH INVASIVE PARAMS */
                angular.forEach($scope.loginESanjeevaniModal.invasiveParams, function (value, key) {
                    if ($rootScope.invasiveEnable && $rootScope.ivtServerConnection && $rootScope.testList.includes(value['name'])) {
                        $rootScope.selectedIvtListArray.push(value['mode']);
                        $rootScope.selectedIvtVital.push(value['mode']);
                    }
                    else if ($rootScope.testList.includes(value['name'])) {
                        $rootScope.missingTestRequest.push(value['name']);
                    }
                });

                $rootScope.selectedVital = [...new Set($rootScope.selectedVital)];

                if ($rootScope.selectedIvtListArray.length != 0)
                    $rootScope.selectedVital.unshift("ivt");

                $rootScope.clearModal();

                if ($rootScope.selectedVital.length == 0 && $rootScope.selectedIvtListArray.length == 0)
                    $("#eSanTestRequestRegret").show();
                else
                    $scope.loginESanjeevaniModal.continueAsGuestUser();
            }

            $scope.loginESanjeevaniModal.continueAsGuestUser = function() {
                $rootScope.mode = $rootScope.selectedVital[0];
                HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);    
                window.location =  "#/onboarding2/forward/enter";
            }

            $scope.loginESanjeevaniModal.epochToDate = function(epoch) {
                if (epoch < 10000000000)
                    epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
                var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone
                let dt = new Date(epoch);
                return dt.getDate() + '/' + (dt.getMonth()+1) + '/' + dt.getFullYear();
            }

            $scope.loginESanjeevaniModal.checkInvasiveSocketConnection = function() {
                const socket = new WebSocket("ws://localhost:8444/paramWS/");
                socket.onopen = function(e) {
                    $rootScope.ivtServerConnection = true;
                };
            
                socket.onerror = function(error) {
                    if ($rootScope.invasiveMock == true)
                        $rootScope.ivtServerConnection = true;
                    else
                        $rootScope.ivtServerConnection = false;
                }
            }
        }
    }
}]);

