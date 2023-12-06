higiKioskControllers.directive('abhaVerifyRegModal', ['$rootScope', 'HigiKioskFlow', 'HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http', 'fireStore','$interval', function ($rootScope, HigiKioskFlow, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http, fireStore, $interval) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/abha-verify-reg.html',
        link: function ($scope, elem, attrs) {
            $scope.abhaVerifyReg = new Object();
            $scope.abhaVerifyReg.init = function () {
                console.log("Comes to the Abha");
                let docRef;
                $scope.abhaAuthDropvalue = 'yes';
                $scope.continuevisible = false;
                $scope.abha_verify = true;
                $scope.abha_address_selected_loader = false;
                $rootScope.abha_payment_reason_for_visit = false;
                $scope.abhaVerifyReg.half_declaration = false;
                $scope.abhabackbutton = false;
                $scope.quickverifybackbutton = false;
                $scope.nextVisible = false;
                $scope.abhaVerifyReg.abha_quick_verify_button = false;
                $scope.ShowInvalidDob = false;
                $scope.abhaVerifyReg.abhasbx = false;
                $scope.abha_already_exist = false;
                $scope.abhaVerifyReg.directlinknext = false;
                $scope.abhaVerifyReg.globalSubmit = 'Submit';
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                $scope.abhaAuthMode = '';
                $scope.abhaLinkFetchCard = '';
                $scope.newMobileNumAddAbhaforRegisterOTP = false;
                $scope.selectedAuth = '';
                $scope.abhaAddress = '';
                $scope.fetchAuthVerifyRes = '';
                $scope.fetchAuthPorpose = '';
                $scope.initAuthVerifyRes = '';
                $scope.abhaGender = '';
                $scope.abhaName = '';
                $scope.abhaOTP = '';
                $scope.otpSectionTitle = '';
                $scope.abhaTxnId = '';
                $scope.mobileNumber = '';
                $scope.passValid = '';
                $scope.abhaUserRegDetails = '';
                $scope.abhaUserDetails = '';
                $scope.abhaVerifyReg.checkinAbhaEnable = true; // enable befoe commit
                $scope.EnableshowAbhaInfobox = false;
                $scope.abhaVerifyReg.abhaCareContextShare = false;
                $rootScope.shareCareContextNotLinked = false;
                $rootScope.abhaVerifyShow = false;
                $rootScope.abhaRegShow = false;
                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false; // abha link mode
                $scope.acceptPass = false;
                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                $scope.abhaVerifyReg.abhaDemographicForm = false;
                $scope.abhaVerifyReg.abhaOTPSection = false;
                $scope.abhaVerifyReg.patientDetailsShow = false;
                $scope.abhaVerifyReg.abhaAccountProcess = false;
                $scope.abhaVerifyReg.abhaPassword = false;
                $scope.abhaVerifyReg.aadharNumShow = false;
                $scope.storeWhileLinkCardOnly = false;
                $scope.abhaVerifyReg.showAadhaarnumberClass = '';
                $scope.abhaVerifyReg.abhaAuthModeFetched = [];
                $scope.abhaVerifyReg.otpSectionNextButtonClass = '';
                $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = '';
                $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                $scope.newMobileNumAddAbha = false;
                $scope.wait_for_minutes = false;
                $scope.abhaAddressSuggArray = '';
                $scope.typeAbhaAddress = true;
                $scope.abhaHealthId = '';
                $scope.fetchedVerifyAbhaToken = '';
                $scope.accountAlreadyLinked = false;
                $scope.formatedDOB = '';
                $scope.qrCodeVerify = false;
                $scope.showPatientDetails = true;
                $scope.abhaCardFetchOnly = false;
                $scope.docUpdated = false;

                $scope.abhaVerifyReg.abhaAccAddMobileNew = false;
                $scope.abhaVerifyReg.healthIDSection = false;
                $scope.abhaVerifyReg.abhaCardDisplay = false;
                $scope.abhaVerifyReg.abhaMobileVerify = false;
                $scope.abhaVerifyReg.abhaCarecontextDataShared = false;
                $scope.abhaVerifyReg.abhaCardDetails = false;
                $scope.abhaVerifyReg.abhaCardDetailsObj = {};


                $scope.abhaVerifyReg.authLinkDropDown = false;

                $scope.abhaVerifyReg.abhaCreateRetry = false;
                $scope.abhaVerifyReg.abhaLinkRetry = false;
                $scope.abhaVerifyReg.abhaCardRetry = false;
                $scope.abhaVerifyReg.abhaIhlLinkRetry = false;
                $scope.abhaMobileValid = true;

                $scope.abhaUserToken = '';
                $scope.abhaCardBase64 = '';
                $scope.abhaUserFetchDetails = '';
                $scope.ihlStorePayload = '';

                // abha Declaration
                $scope.abhaVerifyReg.dclarationAccepted = '';
                $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                $scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass = 'disable_full_check_box';
                $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass = '';
                $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass = '';

                $scope.abhaVerifyReg.abhaAadharOTP = false;

                $scope.abhaVerifyReg.abhaIntermedCardShow = '';
                $scope.abhaVerifyReg.abhaHealthProgressState = '';
                $scope.abhaVerifyReg.abhaCardProgressState = '';
                $scope.abhaVerifyReg.abhaIhlLinkProgressState = '';
                $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                $scope.abhaVerifyReg.abhaFinishcontinueBtn = '';
                $scope.abhaVerifyReg.abhaOtpSubmit = '';
                $scope.infoVisible = false;
                $scope.adr1FieldText = "";
                $scope.adr2FieldText = "";
                $scope.adr3FieldText = "";
                $scope.adr1TextLengthSatisfied = false;
                $scope.adr2TextLengthSatisfied = false;
                $scope.adr3TextLengthSatisfied = false;
                $scope.overallAadharFieldValue = '';
                $scope.aadharField1Value = '';
                $scope.aadharField3Value = '';
                $scope.adr2FieldText = '';
                $scope.gender = '';
                $scope.resendOTPEnable = false;
                $scope.abhaVerifyReg.abhaQRsection = false;
                $scope.dd = '';
                $scope.mm = '';
                $scope.yyy = '';
                $scope.gender = '';
                $scope.abhaVerifyReg.brigdeDataToABHAInfo = false;
                $scope.abhaVerifyReg.brigdeDataToABHASuccessInfo = false;
                $scope.abhaVerifyReg.brigdeDataToABHAFailureInfo = false;
                $rootScope.showTimer = false;
                $scope.timerValue;
                $rootScope.timerPromise;
                console.log(HigiKioskStorageService.returnSessionData('birthdate'))
                if (HigiKioskStorageService.returnSessionData('birthdate') != undefined) {
                    let birthDateArray = HigiKioskStorageService.returnSessionData('birthdate').split('/');
                    if(birthDateArray[1].length != 2) birthDateArray[1] = '0' + birthDateArray[1];
                    $scope.dd = birthDateArray[1];
                    $scope.mm = birthDateArray[0];
                    $scope.yyy = birthDateArray[2];
                }
                if (HigiKioskStorageService.returnSessionData('gender') != undefined) {
                    $scope.gender = HigiKioskStorageService.returnSessionData('gender');
                }

                if ($scope.gender != 'm' || $scope.gender != 'f') {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }

                $scope.abhaVerifyReg.abhaVerifyButtonClass = 'abha_verify_active_btn';
                // Abha auth drop down.
                $scope.abhaAuthDropOptions = [{ auth_id: 'MOBILE_OTP', auth: "Mobile OTP" }, { auth_id: 'AADHAAR_OTP', auth: "Aadhaar OTP" }, { auth_id: 'DONT_KNOW', auth: "Don't Know" }, { auth_id: 'Yes', auth: "yes" }, { auth_id: 'DO_IT_LATER', auth: "Do it Later" }];  //, {auth_id : 'DONT_KNOW', auth : "Don't Know"}
                $scope.abhaLinkDropOptions = [{ auth_id: 'MOBILE_OTP', auth: "Mobile OTP" }, { auth_id: 'AADHAAR_OTP', auth: "Aadhaar OTP" }];

                $scope.abhaVerifyReg.fields = [
                    {
                        id: "abhaAddress", placeholder: "Enter ABHA address or number", defaultText: "Enter ABHA address or number", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.abhaAddressValidate(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaName", placeholder: "Enter your Name", defaultText: "Enter your Name", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.abhaNameValidate(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaOtp", placeholder: "Enter OTP", defaultText: "Enter OTP", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.abhaOTPValidate(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    // {id : "abhaAadharfield1" , placeholder: "",defaultText : "" , text : '' , type :'text' , visible : true , selectedClass : '',
                    //     callback : function(){$scope.abhaVerifyReg.aadharInputField1Check(this)},
                    //     focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {
                        id: "AadhaarNumber", placeholder: "Enter your Aadhaar Number", text: '', textMasked: '', textMaskedDisabled: false, type: 'password', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.AadhaarNumberLengthCheck(this) },
                        // focus : function(){$rootScope.focusField(this)}},
                        focus: function () { $scope.enable_half_declartion() }
                    },
                    {
                        id: "abhaAadharfield2", placeholder: "", defaultText: "", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.aadharInputField2Check(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaAadharfield3", placeholder: "", defaultText: "", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.aadharInputField3Check(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "OTP", placeholder: "Enter OTP", defaultText: "Enter OTP", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.OtpValidation(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaMobileNum", placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.entermobileenumber'), defaultText: "", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.mobileNoPatternCheck(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaHealthId", placeholder: "Enter Abha Address", defaultText: "", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.healthIdValidation(this) },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaPasswordReg", placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.enteryouypasswords"), text: '', textMasked: '', textMaskedDisabled: false, type: 'password', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.passwordLengthCheck(this) },
                        focus: function () { $rootScope.focusField(this) }
                    },
                    {
                        id: "abhaConfirmPassNow", placeholder: HigiKioskUtilitiesService.getPlaceholder("welcomeModals.confrmpass"), defaultText: "Confirm password", text: '', textMasked: '', textMaskedDisabled: false, type: 'password', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.passwordLengthCheck2(this) },
                        focus: function () { $rootScope.focusField(this) }
                    },
                    {
                        id: "dayfield", placeholder: "DD", defaultText: "", text: $scope.dd, type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.dayInputFieldCheck() },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "monthfield", placeholder: "MM", defaultText: "", text: $scope.mm, type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.monthInputFieldCheck() },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "yearfield", placeholder: "YYYY", defaultText: "", text: $scope.yyy, type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.yearInputFieldCheck() },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },
                    {
                        id: "abhaDemographicFormMobile", placeholder: "Enter Your Mobile Number", defaultText: "", text: '', type: 'text', visible: true, selectedClass: '',
                        callback: function () { $scope.abhaVerifyReg.abhaMobileInputFieldCheck() },
                        focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true
                    },

                ];


                $scope.monthArr = [
                    { 'Month': '01', 'Days': '31' },
                    { 'Month': '02', 'Days': '28' },
                    { 'Month': '02L', 'Days': '29' },
                    { 'Month': '03', 'Days': '31' },
                    { 'Month': '04', 'Days': '30' },
                    { 'Month': '05', 'Days': '31' },
                    { 'Month': '06', 'Days': '30' },
                    { 'Month': '07', 'Days': '31' },
                    { 'Month': '08', 'Days': '31' },
                    { 'Month': '09', 'Days': '30' },
                    { 'Month': '10', 'Days': '31' },
                    { 'Month': '11', 'Days': '30' },
                    { 'Month': '12', 'Days': '31' },
                ]

                $scope.currentYear = new Date().getFullYear();
                $scope.previousYear = $scope.currentYear - 120;
                $scope.totalDays = 31;
                // $rootScope.clearAbhaVerify = $scope.abhaVerifyReg.clearAllAbhaVerify;


                if ($rootScope.shareCareContextEnable) {
                    // $scope.abhaVerifyReg.abhaCareContextShare = true;
                    $scope.loadingImg = true;
                    $scope.abhaVerifyReg.checkinAbhaEnable = false;
                    $scope.abhaVerifyReg.abhaCareContextShareBtn('Yes');
                    // $rootScope.abhaVerifyShow = true;
                    // $rootScope.abhaRegShow = false;
                    // $scope.abhaAuthMode = 'DONT_KNOW';
                    // $scope.abhaAddress = $rootScope.abhaAddressFetched;
                    // $scope.abhaVerifyReg.abhaAuthModeFetched = $rootScope.CareConFetchedAuth.modes;
                    // $scope.fetchAuthPorpose = $rootScope.CareConFetchedAuth.purpose;
                    // $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                    // $scope.abhaVerifyReg.abhaDemographicForm = false;
                    // $scope.abhaVerifyReg.abhaChooseAuthMode = true;
                    // $scope.abhaVerifyReg.abhaOTPSection = false;
                    // $rootScope.keyboardHide();
                }

            };

            $scope.abhaVerifyReg.buttonenable = function (field) {
                $scope.continuevisible = true;
            }
            $scope.abhainfobackbutton = function (field) {
                $scope.EnableshowAbhaInfobox = true;
                $scope.nextVisible = false;
                setTimeout(function () {
                    $scope.abhaVerifyReg.checkinAbhaEnable = true;
                }, 1);
                $scope.continuevisible = false;
            }
            $scope.abhaVerifyReg.quickverifybackbutton = function (field) {
                // $scope.EnableshowAbhaInfobox = true;
                // $scope.nextVisible = false;
                // setTimeout(function(){
                //     $scope.abhaVerifyReg.checkinAbhaEnable = true;                
                // },1);          
                // $scope.continuevisible = false;    
                // $scope.abhaVerifyReg.abhaQRsection = false;
                // $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
                // $rootScope.keyboardShow();
                if ($rootScope.shareCareContextEnable) {
                    $scope.abhaVerifyReg.abhaCareContextShareBtn('Yes');
                    // $scope.abhaVerifyReg.abhaQRsection = false;
                } else {
                    $scope.abhaVerifyReg.abhaQRsection = false;
                    $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
                    $rootScope.keyboardShow();
                }
                /*
                //ABHA care context M2 integration starts here
                if($rootScope.shareCareContextEnable){
                    $scope.abhaVerifyReg.abhaCareContextShareBtn('Yes');
                    // $scope.abhaVerifyReg.abhaQRsection = false;
                }else{
                    $scope.abhaVerifyReg.abhaQRsection = false;
                    $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
                    $rootScope.keyboardShow();
                }
                //ABHA care context M2 integration ends here
                */
            }
            $scope.showAbhaInfobox = function (field) {
                $scope.abhaVerifyReg.checkinAbhaEnable = false;
                $scope.EnableshowAbhaInfobox = true;
                $scope.nextVisible = true;
                setTimeout(function () {
                    $scope.abhabackbutton = true;
                    $scope.abhaVerifyReg.enableScroll_info();
                }, 1000);
                $scope.continuevisible = false;
            }
            $scope.abhaVerifyReg.enableScroll_info = function () {
                $scope.scroll = new FTScroller(document.getElementById('abha_info_container_scroll'), { scrollingX: false });
            }
                        $rootScope.abhaVerifyModelInit = $scope.abhaVerifyReg.init;

            $scope.abhaVerifyReg.AadhaarNumberLengthCheck = function (field) {
                // console.log(field)
                var str = field.text;
                $scope.passValid = str;
                $scope.adr1TextLengthSatisfied = true;
                $scope.adr2TextLengthSatisfied = true;
                $scope.adr3TextLengthSatisfied = true;
                $scope.aadharFieldfullValue = str;
                $scope.aadhaarInputFieldValidate();
            };
            $scope.enable_half_declartion = function () {
                $scope.abhaVerifyReg.half_declaration = true;
                $scope.abhaVerifyReg.full_declaration = false;
                $rootScope.focusField($scope.abhaVerifyReg.fields[3]);
            }
            $scope.abhaVerifyReg.toggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    $scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    // $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                }
                else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass = '';
                    // $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass = '';
                }
            };
            $scope.abhaVerifyReg.firstcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.secondcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    // $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    // $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.thirdcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.fourthcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.fifthcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.sixthcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                }
            };
            $scope.abhaVerifyReg.seventhcheckboxtoggleDeclarationAcceptance = function () {
                if ((($scope.abhaVerifyReg.fields[3].text).length < 12) || !isNaN($scope.abhaVerifyReg.fields[3])) { return 0; }
                $scope.abhaVerifyReg.dclarationAccepted = !$scope.abhaVerifyReg.dclarationAccepted;
                if (($scope.abhaVerifyReg.dclarationAccepted == true)) {
                    $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass = 'active_checkmark';
                    if ($scope.abhaVerifyReg.firstcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.secondcheckboxFullDeclarationAcceptanceClass && $scope.abhaVerifyReg.thirdcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fourthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.fifthcheckboxFullDeclarationAcceptanceClass != '' && $scope.abhaVerifyReg.sixthcheckboxFullDeclarationAcceptanceClass != '') {
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        $scope.abhaVerifyReg.DeclarationAcceptanceClass = 'active_checkmark';
                    }
                } else {
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.seventhcheckboxFullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $scope.abhaVerifyReg.FullDeclarationAcceptanceClass = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $scope.abhaVerifyReg.FullDeclarationAcceptanceClass = '';
                }
            };
            $scope.declaration = function () {
                $scope.keyboardHide();
                $scope.abhaVerifyReg.half_declaration = false;
                $scope.abhaVerifyReg.full_declaration = true;
                if ($rootScope.UserInfo.firstName == '') { firstName = '' } else { firstName = $rootScope.UserInfo.firstName };
                if ($rootScope.UserInfo.lastName == '') { lastName = '' } else { lastName = $rootScope.UserInfo.lastName };
                $scope.abhaVerifyReg.declarationusername = firstName + '' + lastName;
                $timeout(function () {
                    $scope.abhaVerifyReg.enableScroll_declaration();
                }, 2000);
            }
            $scope.abhaVerifyReg.enableScroll_declaration = function () {
                $scope.scroll = new FTScroller(document.getElementById('abha_main_container_scroll'), { scrollingX: false });
            }
            $scope.abhaVerifyReg.showAadhaarnumberToggle = function (field) {
                console.log(field);
                if (field.id == "AadhaarNumber") {
                    field.textMaskedDisabled = !field.textMaskedDisabled;
                    if (field.textMaskedDisabled) {
                        field.type = "text";
                    } else {
                        field.type = "password";
                    }
                    if (field.textMaskedDisabled) {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'checked');
                        $scope.abhaVerifyReg.showAadhaarnumberClass = 'active_eyes';
                        field.textMasked = field.text;
                    } else {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_showPasswordCheckbox', 'checkbox', 'uncheked');
                        $scope.abhaVerifyReg.showAadhaarnumberClass = '';
                        var textMasked = '';
                        for (var i = 0; i < field.textMasked.length; i++) {
                            textMasked += '&#149;';
                        }
                        field.textMasked = textMasked;
                    }
                }
            };

            $scope.abhaVerifyReg.abhaCareContextShareBtn = function (item) {
                if (item == 'Yes') {
                    if ($rootScope.abhaAccountLinked) {
                        // new flow for verification
                        // $rootScope.abhaAddressFetched = 'ashley2000@sbx';
                        // alert($rootScope.abhaAddressFetched);
                        let data = {
                            method: 'fetchAuthModeVerify',
                            data: $rootScope.abhaAddressFetched
                        };

                        HigiApiService.getABHASession(data, function (res) {
                            var data = JSON.parse(res);
                            console.log({
                                'resp': data.res,
                                'url': data.url,
                                'body': data.body,
                                'status': data.code
                            });

                            if (data.status == 'S') {
                                let JSONData = {
                                    "requestId": data.res,
                                    "mode": 'on-fetch-modes'
                                }
                                let abhaCallBackCount = 0;
                                let abhaCallBackMaxCount = 5;

                                //let abhaCallBack = setInterval(function(){
                                HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                                    console.log(res);
                                    $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'abhaCareContextShareBtn');
                                    /*abhaCallBackCount++;
                                    console.log(res);
                                    if(res.error_message == undefined){
                                      clearInterval(abhaCallBack);
                                      abhaCallBackCount = 0;
                                      let response = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                                      console.log(response);
                                      if(response != null && response != undefined){
                                        $rootScope.CareConFetchedAuth = response;
                                        $rootScope.shareCareContextNotLinked = true;
                                        $scope.abhaVerifyReg.abhaCareContextShare = false;
                                        $scope.abhaVerifyReg.checkinAbhaEnable = false;
                                        $rootScope.abhaVerifyShow = true;
                                        $rootScope.abhaRegShow = false;
                                        $scope.abhaAuthMode = 'DONT_KNOW';
                                        $scope.abhaAddress = $rootScope.abhaAddressFetched;
                                        $scope.abhaVerifyReg.fields[0].text = $scope.abhaAddress;
                                        $scope.abhaVerifyReg.abhaAuthModeFetched = $rootScope.CareConFetchedAuth.modes;
                                        $scope.fetchAuthPorpose = $rootScope.CareConFetchedAuth.purpose;
                                        $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                                        // $rootScope.loadModal({ id: 'abhaVerify' }); // ABHA care context Enable
                                        $scope.abhaVerifyReg.abhaChooseAuthMode = true;
                                        $scope.abhaVerifyReg.abhaOTPSection = false;
                                        $rootScope.abhaCareContextPopupEnable = false; // ABHA care context Enable
                                        $scope.abhaVerifyReg.abhaQRsection = false; // ABHA care context Enable
                                        $rootScope.keyboardHide();
                                      }
                    
                                    }else{
                                      if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message != "invalid request id or URL endpoint"){                                                
                                        clearInterval(abhaCallBack);
                                        abhaCallBackCount = 0;      
                                      }
                                    }*/
                                }, function (res) {
                                    // clearInterval(abhaCallBack);
                                    // abhaCallBackCount = 0;
                                });
                                //}, 2000);
                            } else {
                                // error
                            }
                        }, function (err) {
                            // error
                        });
                    } else {
                        $scope.abhaVerifyReg.abhaCareContextShare = false;
                        $scope.abhaVerifyReg.checkinAbhaEnable = true;
                        // $rootScope.loadModal({ id: 'abhaVerify' });
                    }
                } else {
                    $scope.abhaVerifyReg.abhaCareContextShare = false;
                    $scope.abhaVerifyReg.checkinAbhaEnable = false;
                    $rootScope.shareCareContextEnable = false;
                    $rootScope.clearModal();
                }
            }

            $scope.abhaVerifyReg.qrSection = function () {
                $scope.abhaAuthMode = 'QR_Flow';
                $timeout(function () {
                    $scope.quickverifybackbutton = true;
                }, 2000);
                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                $scope.abhaVerifyReg.abhaQRsection = true;
                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                $rootScope.keyboardHide();
                $scope.abhaVerifyReg.abhaOTPSection = false;
                $scope.abhaVerifyReg.abhaDemographicForm = false;
                /* ABHA Care Context M2 integration starts here
                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                $rootScope.keyboardHide();
                $scope.abhaVerifyReg.abhaOTPSection = false;
                $scope.abhaVerifyReg.abhaDemographicForm = false;
                ABHA Care Context M2 integration ends here */
                //Show loading icon
                //call api

                let data = {
                    "method": "getRquestIDforQR",
                    "data": {}
                };

                if ($("#abhaQR > canvas")) {
                    $("#abhaQR > canvas").remove();
                }

                HigiApiService.getABHASession(data, function (response) {
                    console.log(response);
                    console.log(typeof response);
                    var data = JSON.parse(response);
                    console.log(data);
                    $("#ABHAqrInfo").text("Please Wait..");
                    if (data.status == 'S') {
                        console.log(data.res)
                        $scope.request_id = data.res
                        const qrCode = new QRCodeStyling({
                            width: 200,
                            height: 200,
                            data: 'https://phrsbx.abdm.gov.in/share-profile?hip-id=ihlcare_2022&counter-id=' + $scope.request_id,
                            dotsOptions: {
                                type: "square"
                            }
                        });
                        qrCode.append(document.getElementById("abhaQR"));
                        $("#ABHAqrInfo").text("Initate & verify your ABHA Address");

                        // $scope.mode_for_qr('share-on-confirm');
                        $scope.mode_for_qr('share');

                    } else {
                        console.log("error");
                        console.log(response);
                    }
                });
                $rootScope.keyboardHide();
            }
            $scope.mode_for_qr = function (mode) {
                $scope.qrCodeVerify = true;
                let JSONData = {
                    "requestId": $scope.request_id,
                    "mode": mode
                }

                //   let abhaCallBack = setInterval(function(){
                HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                    $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], JSONData['mode']);
                    // if($scope.abhaVerifyReg.abhaQRsection == false){
                    //     clearInterval(abhaCallBack);
                    //     return 0;
                    //     }
                    // HigiApiService.fetchDatafromAbhaRes(JSONData, function(res){
                    //   console.log(res);
                    //   if(mode == 'share'){
                    //     $scope.abhaUserFetchDetails = JSON.parse(res.status.body.replaceAll('&quot;','"')).profile.patient;
                    //     var patientDetails = $scope.abhaUserFetchDetails;
                    //   }
                    //   else{
                    //     $scope.abhaUserFetchDetails = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                    //     var patientDetails = $scope.abhaUserFetchDetails.patient;
                    //   }
                    //     if((patientDetails.id != null || patientDetails.healthId != null) && patientDetails.healthIdNumber != null){
                    //       if($scope.abhaUserFetchDetails != null){
                    //           clearInterval(abhaCallBack);
                    //           $scope.abhaUserToken = $scope.abhaUserFetchDetails.accessToken;
                    //           if(!$rootScope.shareCareContextNotLinked){
                    //               $scope.abhaVerifyReg.abhaQRsection = false;
                    //               $scope.abhaVerifyReg.abhaOTPSection = false;
                    //               $scope.abhaVerifyReg.abhaAccountProcess = true;
                    //               $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                    //               let patientMobile = "";
                    //               let patientAadharNumber = "";
                    //               if(patientDetails.identifiers != null && patientDetails.identifiers.length > 0){
                    //                   if(patientDetails.identifiers[0] != undefined){
                    //                       patientMobile = patientDetails.identifiers[0].value;
                    //                   }
                    //                   if(patientDetails.identifiers[1] != undefined){
                    //                       patientAadharNumber = patientDetails.identifiers[1].value;
                    //                   }
                    //               }   
                    //               $scope.ihlStorePayload = {
                    //                   ihl_user_id : $rootScope.UserInfo.id,
                    //                   user_email: '',
                    //                   user_mobile: patientMobile,
                    //                   user_adhar: patientAadharNumber,
                    //                   abha_number: patientDetails.healthIdNumber .replace(/-/g, ''),
                    //                   abha_address: patientDetails.id != null ? patientDetails.id : patientDetails.healthId,
                    //                   self:false,  // optional
                    //                   abha_card: '',
                    //                   abha_qr_code: ''
                    //               };                                                        
                    //               $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                    //           }
                    //       }
                    //     }
                    //     else{
                    //         $scope.mode_for_qr('share')
                    //     }
                    // }, function(res){
                    // clearInterval(abhaCallBack);
                    // }); 
                }, function (err) {
                    // clearInterval(abhaCallBack);
                });
            }
            // Abha Verify Modal
            $scope.abhaVerifyReg.abhaVerifySection = function (field) {
                console.log(field);
                $scope.abhaVerifyReg.checkinAbhaEnable = false;
                if (field == 'Yes') {
                    $rootScope.abhaVerifyShow = true;
                    $rootScope.abhaRegShow = false;
                    if ($rootScope.UserInfo.aadhaarNumber) $rootScope.UserAadharNumber = $rootScope.UserInfo.aadhaarNumber;
                    $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
                    $rootScope.keyboardShow();
                    $timeout(function () {
                        $scope.abhaVerifyReg.abha_quick_verify_button = true;
                    }, 2000);
                    //$rootScope.abhaVerifyModelInit();
                    //$rootScope.loadModal({ id: 'abhaVerify' });
                } else if (field == 'No') {
                    console.log($rootScope.UserInfo);
                    if ($rootScope.UserInfo.aadhaarNumber) $rootScope.UserAadharNumber = $rootScope.UserInfo.aadhaarNumber;
                    console.log($rootScope.UserAadharNumber);
                    $rootScope.abhaVerifyShow = false;
                    $rootScope.abhaRegShow = true;


                    $scope.abhaVerifyReg.aadharNumShow = true;
                    $rootScope.focusField($scope.abhaVerifyReg.fields[3]);

                    /*if ($rootScope.UserAadharNumber != '') {
                        $scope.overallAadharFieldValue = $rootScope.UserAadharNumber; //'537144707686'
                        if ($scope.overallAadharFieldValue.length == 12) {
                            $scope.abhaVerifyReg.fields[3].text = $scope.overallAadharFieldValue.slice(0, 4).toString();
                            $scope.abhaVerifyReg.fields[4].text = $scope.overallAadharFieldValue.slice(4, 8).toString();
                            $scope.abhaVerifyReg.fields[5].text = $scope.overallAadharFieldValue.slice(8, 12).toString();
                            $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                        }
                    }*/
                    //$rootScope.abhaVerifyModelInit();
                    //$rootScope.loadModal({ id: 'abhaVerify' });
                } else {
                    $rootScope.abha_payment_reason_for_visit = true;
                    $rootScope.abhaCloseCheckPaymentFlow();
                }
            }

            // $scope.abhaVerifyReg.clearAllAbhaVerify = function(){
            //     $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
            //     $scope.abhaVerifyReg.abhaChooseAuthMode = false;
            //     $scope.abhaVerifyReg.abhaDemographicForm = false;
            //     $scope.abhaVerifyReg.abhaOTPSection = false;
            // }

            $scope.abhaVerifyReg.abhaAddressValidate = function (field) {
                $('.abha_auth_mode_loader').css('display', 'block');
                var str = field.text;
                var str_integerValue = parseInt(str);
                $scope.abhaVerifyReg.abhasbx = false;
                $scope.abha_already_exist = false;
                console.log(str_integerValue)
                console.log(str.length)
                if (str.length == 14 && str_integerValue != NaN) {
                    $scope.abhaVerifyReg.abhasbx = false;
                    $scope.abhaAddress = $scope.abhaVerifyReg.fields[0].text;
                    $scope.isUserGaveABHAnumber = true;
                }
                if (isNaN(str_integerValue) && str.length != 0 && str.length <= 18) {
                    $scope.isUserGaveABHAnumber = false;
                    $scope.abhaVerifyReg.abhasbx = true;
                    $scope.abhaAddress = $scope.abhaVerifyReg.fields[0].text;
                    $scope.abhaAddress += "@sbx";
                }
                if ($scope.abhaAddress.endsWith("@@sbx") || $scope.abhaAddress.endsWith("@s@sbx") || $scope.abhaAddress.endsWith("@sb@sbx") || $scope.abhaAddress.endsWith("@sbx@sbx")) {
                    $scope.abhaVerifyReg.abhasbx = false;
                    $scope.isUserGaveABHAnumber = false;
                    if ($scope.abhaAddress.endsWith("@@sbx")) {
                        $scope.abhaAddress = $scope.abhaAddress.replace("@", "");
                    }
                    if ($scope.abhaAddress.endsWith("@s@sbx")) {
                        $scope.abhaAddress = $scope.abhaAddress.replace("@s", "");
                    }
                    if ($scope.abhaAddress.endsWith("@sb@sbx")) {
                        $scope.abhaAddress = $scope.abhaAddress.replace("@sb", "");
                    }
                    if ($scope.abhaAddress.endsWith("@sbx@sbx")) {
                        $scope.abhaAddress = $scope.abhaAddress.replace("@sbx", "");
                    }
                }
                /*if (str.length > 0){
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
                else{
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                }*/
                // if(str.length > 0 && $scope.abhaAuthMode != ''){
                //     $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                // }else{
                //     $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                // }
                if ($scope.abhaAddress != '') {
                    console.log($scope.abhaAddress)
                    var data = $scope.abhaAddress;
                    HigiApiService.AbhaValidation(data, function (res) {
                        //sucess response
                        console.log(res)
                        if (res.is_exist == true) {
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abha_already_exist = true;
                            $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                        } else {
                            $scope.abha_already_exist = false;
                            $('.abha_auth_mode_loader').css('display', 'none');
                            if (str.length != 0) {
                                $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                                $scope.onAbhaAuthChange($scope.abhaAuthDropvalue);
                            } else {
                                $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                            }
                        }
                    }, function (res) {
                        //failure response
                        console.log(res)
                    });
                }

            }

            $scope.abhaVerifyReg.abhaNameValidate = function (field) {
                var str = field.text;
                console.log(str);
                $scope.abhaName = $scope.abhaVerifyReg.fields[1].text;



                if (($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined)) {
                    $scope.DobValidate = false;
                } else {
                    $scope.DobValidate = true;
                }

                if ($scope.abhaGender != '' && $scope.abhaName.length > 1 && $scope.DobValidate && $scope.abhaMobileValid) {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                }
            }

            $scope.abhaVerifyReg.abhaMobileInputFieldCheck = function (field) {
                $scope.abhaMobile = $scope.abhaVerifyReg.fields[14].text;

                if ($scope.abhaMobile.length == 10 && !isNaN($scope.abhaMobile)) {
                    $scope.abhaMobileValid = true;
                } else if ($scope.abhaMobile.length == 0) {
                    $scope.abhaMobileValid = true;
                } else {
                    $scope.abhaMobileValid = false;
                }

                if (($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined)) {
                    $scope.DobValidate = false;
                } else {
                    $scope.DobValidate = true;
                }

                if ($scope.abhaGender != '' && $scope.abhaName.length > 1 && $scope.DobValidate && $scope.abhaMobileValid) {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                }


            }

            $scope.abhaVerifyReg.abhaOTPValidate = function (field) {
                var str = field.text;
                $scope.abhaOTP = $scope.abhaVerifyReg.fields[2].text;
                if (str.length > 0) {
                    $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                } else {
                    $scope.abhaVerifyReg.abhaOtpSubmit = '';
                }
            }

            $scope.abhaVerifyReg.aadharInputField1Check = function (field) {

                var str = field.text;
                $scope.adr1FieldText = field.text;
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                $(".adr_no_validation_loader").css('display', 'none');
                $(".adr_no_validation_error").css('display', 'none');
                $(".adr_no_not_exist").css('display', 'none');
                $(".adr_no_validation_srv_err").css('display', 'none');

                if (str.length == 4 && isNaN(str) == false) {
                    $scope.aadharField1Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr1TextLengthSatisfied = true;
                    $rootScope.focusField($scope.abhaVerifyReg.fields[4]);
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    if ($scope.aadharField3Value.length == 4 && $scope.adr2FieldText.length == 4) {
                        $scope.adr3TextLengthSatisfied = true;
                    }
                    if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) {
                        $scope.aadhaarInputFieldValidate();
                    }
                } else if (str.length == 0) {
                    $scope.adr1TextLengthSatisfied = true;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');

                    // if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) {
                    //     console.log("comes here");
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    // }else{
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    // }

                } else {
                    $scope.adr1TextLengthSatisfied = false;
                    $scope.overallAadharFieldValue = '';
                    $scope.aadharField1Value = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');
                }
            }

            $scope.abhaVerifyReg.aadharInputField2Check = function (field) {

                var str = field.text;
                $scope.adr2FieldText = field.text;
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                $(".adr_no_validation_loader").css('display', 'none');
                $(".adr_no_validation_error").css('display', 'none');
                $(".adr_no_not_exist").css('display', 'none');
                $(".adr_no_validation_srv_err").css('display', 'none');

                if (str.length == 4 && isNaN(str) == false) {
                    $scope.aadharField2Value = str;
                    $scope.overallAadharFieldValue = '';
                    $scope.adr2TextLengthSatisfied = true;
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $rootScope.focusField($scope.abhaVerifyReg.fields[5]);
                    if ($scope.aadharField3Value.length == 4) {
                        $scope.adr3TextLengthSatisfied = true;
                    }
                    if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true) {
                        $scope.aadhaarInputFieldValidate();
                    }
                } else if (str.length == 0) {
                    $scope.adr2TextLengthSatisfied = true;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');

                    // if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) {
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    // } else{
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    // }

                } else {
                    $scope.adr2TextLengthSatisfied = false;
                    $scope.aadharField2Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');
                }
            }
            $scope.emailCheckinResults = function () {
                $rootScope.sendEmailPurpose = 'abha';
                $rootScope.emailResultInit();
                $rootScope.loadModal({id : 'emailresults'});
            };
            $scope.printabhacard = function () {    
                $scope.abhaCardBase64 = $scope.abhaCardBase64;
                let abha_a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body><img src='data:image/png;base64," + $scope.abhaCardBase64 + "' width='700' height='500'/></body></html>";
                let abha_card_thremal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body><img style='width:368px;height:500px;margin-left:13px;margin-top:-40px;box-sizing: border-box;margin-right:10px' src='data:image/png;base64," + $scope.abhaCardBase64 + "'/></body></html>";
                console.log(abha_a4_html_template)  
                console.log(abha_card_thremal_html_template) 
                if ($rootScope.externalPrinterName != '') {
                    var opt = {
                        margin: 0,
                        filename: 'abhacard.pdf',
                        image: { type: 'png', quality: 0.98 },
                        html2canvas: { scale: 2 },
                        // jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' } 
                    };
                    html2pdf().from(abha_a4_html_template).outputPdf().then(function (pdf) {
                        var jsonData = { "base64": btoa(pdf) };
                        $.ajax({
                          url: "http://localhost/get_repo/ihl_kiosk_ui_invasive/server/AbhaPNGToPDF.php",  //Dev Server  
                        //   url: "http://localhost:9000/server/AbhaPNGToPDF.php",   // Kiosk Machine     
                          type: "POST",
                          cache: false,
                          dataType: 'json',
                          data: jsonData,
                          headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                          success: function (html) {              
                              if (html['status'] == "S") {                  
                                  var pdfFilePath = "file:///D:/Xampp/htdocs/get_repo/ihl_kiosk_ui_invasive/server/abhacard.pdf";  // Dev Server
                                //   var pdfFilePath = "file:///C:/kiosk/Apps/Almond_IHL_UI/server/test.pdf";   // Kiosk Machine
                                  var externalPrinterName = $rootScope.externalPrinterName;
                                  JkioskService.apolloA4print($scope.apolloA4printRes, pdfFilePath, externalPrinterName);
                                }
                            },
                          error: function (err) {    
                            console.log(err);
                            console.log("unable to connect server");
                          }
                        })
                    });
                } else if ($rootScope.externalPrinterName == '') {
                    $rootScope.printerService.invokeJkioskPrinterService('thermal', abha_card_thremal_html_template);    
                }
            };
            $scope.abhaVerifyReg.aadharInputField3Check = function (field) {

                var str = field.text;
                $scope.adr3FieldText = field.text;
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                $(".adr_no_validation_loader").css('display', 'none');
                $(".adr_no_validation_error").css('display', 'none');
                $(".adr_no_not_exist").css('display', 'none');
                $(".adr_no_validation_srv_err").css('display', 'none');

                if (str.length == 4 && isNaN(str) == false) {
                    $scope.aadharField3Value = str;
                    $scope.aadhaarInputFieldValidate();
                } else if (str.length == 0) {
                    $scope.adr3TextLengthSatisfied = true;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');

                    // if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) {
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    // }  else{
                    //     $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    // }

                } else {
                    $scope.adr3TextLengthSatisfied = false;
                    $scope.aadharField3Value = '';
                    $scope.overallAadharFieldValue = '';
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');
                }
            }

            $scope.aadhaarInputFieldValidate = function () {
                $scope.overallAadharFieldValue = '';
                $scope.overallAadharFieldValue = $scope.aadharFieldfullValue;
                // console.log($scope.overallAadharFieldValue);
                if ($scope.overallAadharFieldValue.length == 12 && isNaN($scope.overallAadharFieldValue) == false) {
                    // $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    return;
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'none');
                    var emailIsThis = "";
                    var mobileIsThis = "";
                    var aadhaarIsThis = $scope.overallAadharFieldValue;
                    $rootScope.isOnline5 = window.navigator.onLine;
                    if ($rootScope.isOnline5) {
                        $(".adr_no_validation_loader").css('display', 'block');
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
                                    url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type: "GET",
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',
                                    headers: { "ApiToken": token },
                                    success: function (html) {
                                        console.log(JSON.stringify(html));
                                        emailOrMobileExist = JSON.stringify(html);
                                        var finalString = emailOrMobileExist.replace(/['"]+/g, '');
                                        if (finalString == "Aadhaar number already exists") {
                                            //alert(finalString);
                                            $scope.adr3TextLengthSatisfied = false;
                                            $(".adr_no_validation_loader").css('display', 'none');
                                            $(".adr_no_validation_error").css('display', 'block');
                                            $(".adr_no_not_exist").css('display', 'none');
                                            $(".adr_no_validation_srv_err").css('display', 'none');
                                            $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                                        } else if (finalString == "") {
                                            //alert("adharcheck valid");
                                            $scope.adr3TextLengthSatisfied = true;
                                            $(".adr_no_validation_loader").css('display', 'none');
                                            $(".adr_no_validation_error").css('display', 'none');
                                            $(".adr_no_not_exist").css('display', 'none');
                                            $(".adr_no_validation_srv_err").css('display', 'none');

                                            if ($rootScope.registerFlowFirstInput != "email") {
                                                if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                    $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                                                }
                                            } else {
                                                if ($scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                    $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                                                }
                                            }
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
                        $scope.adr3TextLengthSatisfied = false;
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                        $(".adr_no_validation_loader").css('display', 'none');
                        $(".adr_no_validation_error").css('display', 'none');
                        $(".adr_no_not_exist").css('display', 'none');
                        $(".adr_no_validation_srv_err").css('display', 'block');
                    }
                } else {
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                    $scope.abhaVerifyReg.DeclarationAcceptanceClass = '';
                }
            }
            $scope.abhaVerifyReg.aadharValidate = function () {
                $scope.abhaVerifyReg.half_declaration = false;
                console.log($scope.overallAadharFieldValue);
                $(".adr_no_validation_loader").css('display', 'block');
                $(".adr_no_validation_error").css('display', 'none');
                $(".adr_no_not_exist").css('display', 'none');
                $(".adr_no_validation_srv_err").css('display', 'none');
                $scope.abhaVerifyReg.aadharValidNextButtonClass = '';

                let data = {
                    method: 'generateAadharOtp',
                    data: {
                        "aadhaar": $scope.overallAadharFieldValue
                    }
                };

                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).txnId) {
                            $rootScope.txdIdFromAadhar = JSON.parse(data.res).txnId;
                            $rootScope.showTimer = true;
                            $scope.abhaVerifyReg.startTimer();
                            $(".adr_no_validation_loader").css('display', 'none');
                            $(".adr_no_validation_error").css('display', 'none');
                            $(".adr_no_not_exist").css('display', 'none');
                            $(".adr_no_try_later").css('display', 'none');
                            $(".adr_no_validation_srv_err").css('display', 'none');
                            $rootScope.focusField($scope.abhaVerifyReg.fields[6]);
                            $scope.abhaVerifyReg.aadharNumShow = false;
                            $scope.abhaVerifyReg.abhaAadharOTP = true;
                            $scope.abhaVerifyReg.full_declaration = false;
                            $scope.abhaVerifyReg.half_declaration = false;
                            $scope.newMobileNumAddAbhaforRegisterOTP = true;
                            setTimeout(function () {
                                $scope.newMobileNumAddAbhaforRegisterOTP = false;
                            }, 60000);
                        } else if(JSON.parse(data.res).details[0].code == "HIS-2017"){
                            $(".adr_no_validation_loader").css('display', 'none');
                            $(".adr_no_validation_error").css('display', 'none');
                            $(".adr_no_try_later").css('display', 'block');
                            $(".adr_no_not_exist").css('display', 'none');
                            $(".adr_no_validation_srv_err").css('display', 'none');

                            $timeout(() => {
                                $(".adr_no_try_later").css('display', 'none');
                            }, 2000);
                            $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                        } else {
                            $(".adr_no_validation_loader").css('display', 'none');
                            $(".adr_no_validation_error").css('display', 'none');
                            $(".adr_no_not_exist").css('display', 'block');
                            $(".adr_no_try_later").css('display', 'none');
                            $(".adr_no_validation_srv_err").css('display', 'none');

                            $timeout(() => {
                                $(".adr_no_not_exist").css('display', 'none');
                            }, 2000);
                            // $scope.abhaVerifyReg.fields[3].text = '';
                            // $scope.abhaVerifyReg.fields[4].text = '';
                            // $scope.abhaVerifyReg.fields[5].text = '';
                            // $scope.overallAadharFieldValue = '';
                            // $rootScope.focusField($scope.abhaVerifyReg.fields[3]);
                            $scope.abhaVerifyReg.aadharValidNextButtonClass = '';
                        }
                    } else {
                        $(".adr_no_validation_loader").css('display', 'none');
                        $(".adr_no_validation_error").css('display', 'none');
                        $(".adr_no_not_exist").css('display', 'block');
                        $(".adr_no_try_later").css('display', 'none');
                        $(".adr_no_validation_srv_err").css('display', 'none');
                        $timeout(() => {
                            $(".adr_no_not_exist").css('display', 'none');
                        }, 2000);
                        $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                    }
                }, function (err) {
                    $(".adr_no_validation_loader").css('display', 'none');
                    $(".adr_no_validation_error").css('display', 'none');
                    $(".adr_no_not_exist").css('display', 'none');
                    $(".adr_no_try_later").css('display', 'none');
                    $(".adr_no_validation_srv_err").css('display', 'block');
                    $timeout(() => {
                        $(".adr_no_validation_srv_err").css('display', 'none');
                    }, 2000);
                    $scope.abhaVerifyReg.aadharValidNextButtonClass = 'aadhar_valid_next_active_btn';
                });
            }

            $scope.abhaVerifyReg.aadharLinkMobileNextSection = function () {
                $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = '';
                $('.mob_no_validation_loader').css('display', 'block');
                $scope.mobileNumber = $scope.abhaVerifyReg.fields[7].text;

                let data = {
                    method: 'checkAndGenerateMobileOTP',
                    data: {
                        "mobile": $scope.mobileNumber,
                        "txnId": $rootScope.txdIdFromAadhar
                    }
                };

                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).mobileLinked) {
                            $rootScope.showTimer = true;
                            $scope.abhaVerifyReg.startTimer();
                            // $rootScope.focusField($scope.abhaVerifyReg.fields[8]);
                            // $scope.abhaVerifyReg.fields[8].text = $rootScope.UserInfo.firstName + $scope.mobileNumber;
                            // $scope.abhaVerifyReg.abhaMobileVerify = false;
                            // $scope.abhaVerifyReg.healthIDSection = true;
                            // $scope.abhaVerifyReg.abhaAccountProcess = true;
                            $scope.abhaVerifyReg.abhaAccountCreate();
                        } else {
                            $('.mob_no_validation_loader').css('display', 'none');
                            $rootScope.txdIdFromMobile = JSON.parse(data.res).txnId;
                            $scope.abhaVerifyReg.fields[6].text = '';
                            $scope.newMobileNumAddAbha = true;
                            $scope.abhaVerifyReg.abhaMobileVerify = false;
                            $scope.abhaVerifyReg.abhaAadharOTP = true;
                            // $rootScope.showTimer = true;
                            // $scope.abhaVerifyReg.startTimer();
                            $rootScope.focusField($scope.abhaVerifyReg.fields[6]);
                        }
                    } else {
                        $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';                        
                        $('.mob_no_validation_loader').css('display', 'none');
                        $('.mob_no_srv_error').css('display', 'block');
                        $timeout(function () {
                            $('.mob_no_srv_error').css('display', 'none');
                        }, 3000);
                    }
                }, function (err) {
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                    $('.mob_no_validation_loader').css('display', 'none');
                    $('.mob_no_srv_error').css('display', 'block');
                    $timeout(function () {
                        $('.mob_no_srv_error').css('display', 'none');
                    }, 3000);
                });
            }

            $scope.abhaVerifyReg.resendOTP = function () {
                $('.otp_validation_loader').css('display', 'block');
                $scope.resendOTPEnable = true;

                $scope.newMobileNumAddAbha = true;
                $timeout(function () {
                    if ($scope.abhaVerifyReg.abhaOTPSection == true) {
                        $scope.newMobileNumAddAbha = false;
                        $scope.wait_for_minutes = false;
                    }
                }, 30000);
                if ($scope.abhaAuthMode == 'DONT_KNOW' && !$scope.abhaCardFetchOnly) {
                    let tab_name = $scope.selectedAuth;
                    $scope.selectedAuth = '';
                    $scope.openTab(tab_name);
                } else {
                    $scope.abhaVerifyReg.fetchModesForAbha();
                }
            }
            $scope.directlinknext = function (auth) {

                $scope.abhaAuthMode = auth;
                $scope.directlinknext = auth;
                // $scope.abhaVerifyReg.directlinknext = true;
                $scope.abhaVerifyReg.fetchModesForAbha();

            }

            $scope.abhaVerifyReg.fetchModesForAbha = function () {
                $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                if ($scope.abhaAddress != '' && $scope.abhaAuthMode == 'DONT_KNOW') {
                    $('.abha_auth_mode_loader').css('display', 'block');
                    let data = {
                        method: 'fetchAuthModeVerify',
                        data: $scope.abhaAddress
                    };

                    //  Condition to enable abha api flow.
                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                            // 'resp': data.res,
                            'url': data.url,
                            'body': data.body,
                            'status': data.code
                        });

                        // data.status = 'S';
                        // var mockRes = {
                        //     "requestId": "53fbd218-b1f2-4755-b6c7-d3d384c796a3",
                        //     "url": "/Newfolder/index.php/v0.5/users/auth/on-fetch-modes",
                        //     "body": "{&quot;requestId&quot;:&quot;c05a07fa-58f2-446b-b0f6-12f615d84a9f&quot;,&quot;timestamp&quot;:&quot;2023-06-08T07:25:33.293271886&quot;,&quot;auth&quot;:{&quot;purpose&quot;:&quot;KYC_AND_LINK&quot;,&quot;modes&quot;:[&quot;MOBILE_OTP&quot;,&quot;DEMOGRAPHICS&quot;,&quot;PASSWORD&quot;]},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;53fbd218-b1f2-4755-b6c7-d3d384c796a3&quot;}}"
                        // }

                        if (data.status == 'S') {
                            let JSONData = {
                                "requestId": data.res,
                                "mode": 'on-fetch-modes'
                            }
                            let abhaCallBackCount = 0;
                            let abhaCallBackMaxCount = 5;

                            //let abhaCallBack = setInterval(function(){
                            $('.otp_validation_loader').css('display', 'block');
                            HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                                $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'fetchModesForAbha');
                                // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn'; 
                                //abhaCallBackCount++;
                                // res = {
                                //     "status": {
                                //         "requestId": "0975b11b-adea-4445-bd4d-cb1e85d8109c",
                                //         "url": "/v0.5/users/auth/on-fetch-modes",
                                //         "body": "{\r\n  &quot;requestId&quot;: &quot;ec1f2b7d-8aeb-414b-ab91-939b05bb9188&quot;,\r\n  &quot;timestamp&quot;: &quot;2023-07-01T09:11:35.9888171Z&quot;,\r\n  &quot;auth&quot;: {\r\n    &quot;purpose&quot;: &quot;KYC_AND_LINK&quot;,\r\n    &quot;modes&quot;: [\r\n      &quot;PASSWORD&quot;,\r\n      &quot;MOBILE_OTP&quot;,\r\n      &quot;DEMOGRAPHICS&quot;\r\n    ]\r\n  },\r\n  &quot;error&quot;: null,\r\n  &quot;resp&quot;: {\r\n    &quot;requestId&quot;: &quot;0975b11b-adea-4445-bd4d-cb1e85d8109c&quot;\r\n  }\r\n}"
                                //     }
                                // }
                                /*console.log(res);
                                if(res.error_message == undefined){
                                    clearInterval(abhaCallBack);
                                    abhaCallBackCount = 0;
                                    $('.otp_validation_loader').css('display', 'none');
                                    $scope.fetchAuthVerifyRes = JSON.parse(res.status.body.replaceAll('&quot;','"'));

                                    $scope.abhaVerifyReg.abhaAuthModeFetched = $scope.fetchAuthVerifyRes.auth.modes;
                                    $scope.fetchAuthPorpose = $scope.fetchAuthVerifyRes.auth.purpose;
                                    console.log($scope.abhaVerifyReg.abhaAuthModeFetched);
                                    if($scope.abhaVerifyReg.abhaAuthModeFetched.includes("DEMOGRAPHICS")){
                                        $scope.openTab('DEMOGRAPHICS');
                                    }
                                    $scope.abhaVerifyReg.directlinknext = false;  
                                    $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                    $scope.abhaVerifyReg.abhaDemographicForm = false;
                                    $scope.abhaVerifyReg.abhaChooseAuthMode = true;
                                    $scope.abhaVerifyReg.abhaOTPSection = false;
                                    $rootScope.keyboardHide();
                                }else{
                                    if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                        clearInterval(abhaCallBack);
                                        abhaCallBackCount = 0;
                                        $('.otp_validation_loader').css('display', 'none');
                                        $('.abha_auth_server_error').css('display', 'block');
                                        $timeout(function(){
                                            $('.abha_auth_server_error').css('display', 'none');
                                        }, 3000);
                                        $('.abha_auth_mode_loader').css('display', 'none');
                                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';        
                                    }
                                }*/
                            }, function (res) {
                                // clearInterval(abhaCallBack);
                                // abhaCallBackCount = 0;
                                $('.otp_validation_loader').css('display', 'none');
                                $('.abha_auth_server_error').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_auth_server_error').css('display', 'none');
                                }, 3000);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            });
                            //}, 2000);
                            // }else{
                            //     $('.abha_auth_address_error').css('display', 'block');
                            //     $timeout(function(){
                            //         $('.abha_auth_address_error').css('display', 'none');
                            //     }, 3000);
                            //     $('.abha_auth_mode_loader').css('display', 'none');
                            //     $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';    
                            // }

                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }, function (err) {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    });
                } else if ($scope.abhaAddress != '' && $scope.abhaAuthMode == 'MOBILE_OTP') {
                    $('.abha_auth_mode_loader').css('display', 'block');
                    let data = {
                        method: 'searchByHealthIdVerify',
                        data: $scope.abhaAddress
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                           'resp': data.res,
                           'url': data.url,
                           'body': data.body,
                           'status': data.code
                        });

                        if (data.status == 'S') {
                            if (JSON.parse(data.res).healthId || JSON.parse(data.res).healthIdNumber) {

                                let data = {
                                    method: 'initMobileOtpVerify',
                                    data: {
                                        "authMethod": $scope.abhaAuthMode,
                                        "healthid": $scope.abhaAddress
                                    }
                                };

                                $scope.abhaVerifyReg.initOTPMobile(data);
                                // $('.abha_auth_mode_loader').css('display', 'none');
                            } else {
                                $('.abha_auth_address_error').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_auth_address_error').css('display', 'none');
                                }, 3000);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            }
                        } else {
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }, function (res) {
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    });
                } else if ($scope.abhaAddress != '' && $scope.abhaAuthMode == 'AADHAAR_OTP') {
                    $('.abha_auth_mode_loader').css('display', 'block');
                    let data = {
                        method: 'searchByHealthIdVerify',
                        data: $scope.abhaAddress
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                            'resp': data.res,
                            'url': data.url,
                            'body': data.body,
                            'status': data.code
                         });

                        if (data.status == 'S') {
                            if (JSON.parse(data.res)) {
                                if (JSON.parse(data.res).healthId || JSON.parse(data.res).healthIdNumber) {

                                    let data = {
                                        method: 'initMobileOtpVerify',
                                        data: {
                                            "authMethod": $scope.abhaAuthMode,
                                            "healthid": $scope.abhaAddress
                                        }
                                    };
                                    $scope.abhaVerifyReg.initOTPAadhar(data);

                                } else {
                                    $('.abha_auth_address_error').css('display', 'block');
                                    $timeout(function () {
                                        $('.abha_auth_address_error').css('display', 'none');
                                    }, 3000);
                                    $('.abha_auth_mode_loader').css('display', 'none');
                                    $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                                }
                            } else {
                                $('.abha_auth_server_error').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_auth_server_error').css('display', 'none');
                                }, 3000);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            }
                        } else {
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }, function (err) {
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    });
                } else if ($scope.abhaAddress != '' && $scope.abhaAuthMode == 'Yes') {
                    $scope.abhaVerifyReg.directlinknext = true;
                    $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                    $rootScope.keyboardHide();
                }
            }

            // $scope.abhaVerifyReg.mobileNoPatternCheck = function(field){
            //     if(field.text.length == 10){
            //         $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
            //     }else{
            //         $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = '';
            //     }
            // }

            $scope.abhaVerifyReg.initOTPMobile = function (data) {
                HigiApiService.getABHASession(data, function (res) {
                    // $('.otp_validation_loader').css('display', 'none');
                    var data = JSON.parse(res);
                    // $('.abha_auth_mode_loader').css('display', 'none');
                    console.log({
                        'resp': data.res,
                        'url': data.url,
                        'body': data.body,
                        'status': data.code
                     });
                    if (data.status == 'S') {
                        if (JSON.parse(data.res).txnId) {
                            $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                            $rootScope.showTimer = true;
                            $scope.abhaVerifyReg.startTimer();
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.abha_auth_mode_end_loader').css('display', 'none');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');

                            $scope.abhaTxnId = JSON.parse(data.res).txnId;

                            $scope.otpSectionTitle = 'Mobile OTP';
                            $scope.abhaVerifyReg.directlinknext = false;
                            $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                            $scope.abhaVerifyReg.abhaAccountProcess = false;
                            $scope.abhaVerifyReg.abhaDemographicForm = false;
                            $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                            $scope.abhaVerifyReg.abhaOTPSection = true;
                            $scope.newMobileNumAddAbha = true;
                            setTimeout(function () {
                                $scope.newMobileNumAddAbha = false;
                            }, 60000);
                            if ($scope.resendOTPEnable == true) {
                                $('.otp_validation_loader').css('display', 'none');
                                $('.otp_resend').css('display', 'block');
                                setTimeout(function () {
                                    $(".otp_resend").css('display', 'none');
                                }, 3000);
                            }
                            $rootScope.keyboardShow();
                        } else if (JSON.parse(data.res).code == "HIS-422") {
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.otp_validation_loader').css('display', 'none');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                            $scope.newMobileNumAddAbha = true;
                            $scope.wait_for_minutes = true;
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.abha_auth_mode_end_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }
                    else {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                        $scope.abhaAuthMode = auth;
                        $scope.directlinknext = auth;
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $('.abha_auth_mode_end_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    }
                }, function (err) {
                    $('.otp_validation_loader').css('display', 'none');
                    $('.abha_auth_server_error').css('display', 'block');
                    $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                    $timeout(function () {
                        $('.abha_auth_server_error').css('display', 'none');
                    }, 3000);
                    $('.abha_auth_mode_loader').css('display', 'none');
                    $('.abha_auth_mode_end_loader').css('display', 'none');
                    $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                });
            }


            $scope.abhaVerifyReg.initOTPAadhar = function (data) {
                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).txnId) {
                            $scope.abhaVerifyReg.directlinknext = false;
                            $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                            $rootScope.showTimer = true;
                            $scope.abhaVerifyReg.startTimer();
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.abha_auth_mode_end_loader').css('display', 'none');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                            $scope.abhaTxnId = JSON.parse(data.res).txnId;

                            $scope.otpSectionTitle = 'Aadhar OTP';
                            $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                            $scope.abhaVerifyReg.abhaAccountProcess = false;
                            $scope.abhaVerifyReg.abhaDemographicForm = false;
                            $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                            $scope.abhaVerifyReg.abhaOTPSection = true;
                            $scope.newMobileNumAddAbha = true;
                            setTimeout(function () {
                                $scope.newMobileNumAddAbha = false;
                            }, 60000);
                            if ($scope.resendOTPEnable == true) {
                                $('.otp_validation_loader').css('display', 'none');
                                $('.otp_resend').css('display', 'block');
                                setTimeout(function () {
                                    $(".otp_resend").css('display', 'none');
                                }, 3000);
                            }
                            $rootScope.keyboardShow();
                        } else if (JSON.parse(data.res).code == "HIS-422") {
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.otp_validation_loader').css('display', 'none');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                            $scope.newMobileNumAddAbha = true;
                            $scope.wait_for_minutes = true;
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $('.abha_auth_mode_end_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            $('.abha_tab_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_tab_server_error').css('display', 'none');
                            }, 3000);
                        }
                    } else {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $('.abha_auth_mode_end_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        $('.abha_tab_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_tab_server_error').css('display', 'none');
                        }, 3000);
                    }
                }, function (err) {
                    $('.otp_validation_loader').css('display', 'none');
                    $('.abha_auth_server_error').css('display', 'block');
                    $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                    $timeout(function () {
                        $('.abha_auth_server_error').css('display', 'none');
                    }, 3000);
                    $('.abha_auth_mode_loader').css('display', 'none');
                    $('.abha_auth_mode_end_loader').css('display', 'none');
                    $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                });
            }

            $scope.abhaVerifyReg.OtpValidation = function (field) {
                console.log(field);
                if (field.text.length > 0) {
                    $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                } else {
                    $scope.abhaVerifyReg.otpSectionNextButtonClass = '';
                }

            }

            $scope.abhaVerifyReg.healthIdValidation = function (field) {

                $scope.abhaHealthId = $scope.abhaVerifyReg.fields[8].text;
                if ($scope.abhaHealthId.length >= 8 && $scope.abhaHealthId.length <= 18) {
                    $scope.abhaHealthId += "@sbx";
                    $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                    if ($scope.abhaHealthId.endsWith("@@sbx") || $scope.abhaHealthId.endsWith("@s@sbx") || $scope.abhaHealthId.endsWith("@sb@sbx") || $scope.abhaHealthId.endsWith("@sbx@sbx")) {
                        if ($scope.abhaHealthId.endsWith("@@sbx")) {
                            $scope.abhaHealthId = $scope.abhaHealthId.replace("@", "");
                        }
                        if ($scope.abhaHealthId.endsWith("@s@sbx")) {
                            $scope.abhaHealthId = $scope.abhaHealthId.replace("@s", "");
                        }
                        if ($scope.abhaHealthId.endsWith("@sb@sbx")) {
                            $scope.abhaHealthId = $scope.abhaHealthId.replace("@sb", "");
                        }
                        if ($scope.abhaHealthId.endsWith("@sbx@sbx")) {
                            $scope.abhaHealthId = $scope.abhaHealthId.replace("@sbx", "");
                        }
                    }

                    HigiApiService.AbhaValidation($scope.abhaHealthId, function (res) {
                        //sucess response
                        console.log(res)
                        if (res.is_exist == true) {
                            $('.healthId_exist_ihl').css('display', 'block');
                            $timeout(() => {
                                $('.healthId_exist_ihl').css('display', 'none');
                            }, 3000);
                            $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                        } else {
                            $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                        }
                    }, function (res) {
                        //failure response
                        $('.healthId_something_wrong').css('display', 'block');
                        $timeout(() => {
                            $('.healthId_something_wrong').css('display', 'none');
                        }, 3000);
                        console.log(res)
                    });

                } else {
                    $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                }
            }

            $scope.abhaVerifyReg.validOtpNextSection = function () {
                // $scope.abhaVerifyReg.half_declaration = false;
                var otp = $scope.abhaVerifyReg.fields[6].text;
                $('.otp_validation_loader').css('display', 'block');
                $scope.abhaVerifyReg.otpSectionNextButtonClass = '';

                if (!$scope.newMobileNumAddAbha) {
                    let data = {
                        method: 'aadharOtpPreVerf',
                        data: {
                            "otp": otp,
                            "txnId": $rootScope.txdIdFromAadhar
                        }
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log(JSON.parse(data.res));

                        if (data.status == 'S') {
                            if (JSON.parse(data.res).txnId != undefined) {
                                // if($rootScope.abhaRegShow){
                                $rootScope.showTimer = false;
                                $interval.cancel($rootScope.timerPromise)
                                $('.otp_validation_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaAadharOTP = false;
                                $scope.abhaVerifyReg.abhaMobileVerify = true;
                                $rootScope.focusField($scope.abhaVerifyReg.fields[7]);
                                // }else{
                                // $('.otp_validation_loader').css('display', 'none');
                                // $scope.abhaVerifyReg.abhaAadharOTP = false;
                                // $scope.abhaVerifyReg.abhaDropSelectAuthMode = true;
                                // }
                            } else {
                                $('.otp_validation_loader').css('display', 'none');
                                $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                                $('.abha_otp_no_not_exist').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_otp_no_not_exist').css('display', 'none');
                                }, 2000);
                            }
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function () {
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                        }
                    }, function (err) {
                        $('.otp_validation_loader').css('display', 'none');
                        $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                        $('.otp_srv_err').css('display', 'block');
                        $timeout(function () {
                            $('.otp_srv_err').css('display', 'none');
                        }, 3000);
                    });
                } else {
                    let data = {
                        method: 'verifyAadharLinkedOtp',
                        data: {
                            "otp": otp,
                            "txnId": $rootScope.txdIdFromMobile
                        }
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log(JSON.parse(data.res));

                        if (data.status == 'S') {
                            if (JSON.parse(data.res).txnId != undefined) {
                                // $rootScope.focusField($scope.abhaVerifyReg.fields[8]);
                                // $scope.abhaVerifyReg.fields[8].text = $rootScope.UserInfo.firstName + $scope.mobileNumber;
                                // $scope.abhaVerifyReg.abhaAadharOTP = false;
                                // $scope.abhaVerifyReg.healthIDSection = true;
                                $rootScope.showTimer = false;
                                $interval.cancel($rootScope.timerPromise)
                                $scope.abhaVerifyReg.abhaAccountCreate();

                            } else {
                                $('.otp_validation_loader').css('display', 'none');
                                $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                                $('.abha_otp_no_not_exist').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_otp_no_not_exist').css('display', 'none');
                                }, 2000);
                            }
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.abhaVerifyReg.otpSectionNextButtonClass = 'abha_otpSection_next_active_btn';
                        }
                    });
                }
            }

            $scope.abhaVerifyReg.resendOtpAbha = function () {
                $scope.newMobileNumAddAbhaforRegisterOTP = true;
                // show 60 sec timer in UI
                $rootScope.showTimer = true;
                $scope.abhaVerifyReg.startTimer();
                setTimeout(function() {
                    $scope.newMobileNumAddAbhaforRegisterOTP = false;
                }, 60000);                
                $('.otp_validation_loader').css('display', 'block');
                let data = {
                    method: 'aadharOtpResend',
                    data: {
                        "txnId": $rootScope.txdIdFromAadhar
                    }
                };

                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        $('.otp_validation_loader').css('display', 'none');
                        if (JSON.parse(data.res).txnId) {
                            $('.otp_resend').css('display', 'block');
                            setTimeout(function () {
                                $(".otp_resend").css('display', 'none');
                            }, 3000);
                        } else if (JSON.parse(data.res).code) { //  in no flow, msg return after 30 min request OTP info shown as please try again later
                            $('.otp_srv_try_later').css('display', 'block');
                            setTimeout(function () {
                                $(".otp_srv_try_later").css('display', 'none');
                            }, 3000);
                        } else {
                            $('.otp_srv_err').css('display', 'block');
                            setTimeout(function () {
                                $(".otp_srv_err").css('display', 'none');
                            }, 3000);
                        }
                    } else {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.otp_srv_err').css('display', 'block');
                        setTimeout(function () {
                            $(".otp_srv_err").css('display', 'none');
                        }, 3000);
                    }
                });
            }

            $scope.abhaVerifyReg.healthIdEntrySection = function () {
                $scope.abha_address_selected_loader = true;
                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                if (!$scope.typeAbhaAddress) {

                    // let abhaHealthIdCheck = $scope.abhaHealthId.replace("@sbx", '');

                    // let validHealthId = $scope.abhaVerifyReg.hasSpecialCharacters(abhaHealthIdCheck);
                    // if (validHealthId) {
                    //     $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                    //     $('.healthId_no_special_char').css('display', 'block');
                    //     setTimeout(function () {
                    //         $('.healthId_no_special_char').css('display', 'none');
                    //     }, 3000);
                    //     return 0;
                    // }

                    $(".healthId_validation_loader").css('display', 'block');

                    $scope.abhaVerifyReg.abhaAddressValidation($scope.abhaHealthId);
                } else {
                    $scope.abhaVerifyReg.createAbhaPhrAddress();
                }

            }

            $scope.abhaVerifyReg.abhaAddressValidation = function (item) {
                let data = {
                    "method": "abhaAddressValidation",
                    "data": item
                };

                HigiApiService.getABHASession(data, function (response) {
                    var data = JSON.parse(response);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).status == 'valid abha address') {
                            let data = {
                                "method": "abhaPhrAddressExist",
                                "data": $scope.abhaHealthId
                            };

                            HigiApiService.getABHASession(data, function (response) {
                                var data = JSON.parse(response);
                                console.log(JSON.parse(data.res));

                                if (data.status == 'S') {
                                    if (JSON.parse(data.res) == false) {

                                        $scope.abhaVerifyReg.createAbhaPhrAddress();

                                        // $scope.abhaVerifyReg.healthIDSection = false;
                                        // $rootScope.focusField($scope.abhaVerifyReg.fields[9]);
                                        // $scope.abhaVerifyReg.abhaPassword = true;
                                        // $scope.abhaVerifyReg.abhaAccountCreate();

                                    } else if (JSON.parse(data.res) == true) {
                                        $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                                        $(".healthId_validation_loader").css('display', 'none');
                                        $('.healthId_exist').css('display', 'block');
                                        setTimeout(function () {
                                            $('.healthId_exist').css('display', 'none');
                                        }, 3000);
                                    } else {
                                        $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                                        $(".healthId_validation_loader").css('display', 'none');
                                        $('.healthId_something_wrong').css('display', 'block');
                                        setTimeout(function () {
                                            $('.healthId_something_wrong').css('display', 'none');
                                        }, 3000);
                                    }
                                } else {
                                    $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                                    $(".healthId_validation_loader").css('display', 'none');
                                    $('.healthId_something_wrong').css('display', 'block');
                                    setTimeout(function () {
                                        $('.healthId_something_wrong').css('display', 'none');
                                    }, 3000);
                                }
                            }, function (e) {
                                console.log(e);
                                $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                                $(".healthId_validation_loader").css('display', 'none');
                                $('.healthId_something_wrong').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_something_wrong').css('display', 'none');
                                }, 3000);
                            });
                        } else if (JSON.parse(data.res).status == 'invalid abha address') {
                            let abhaHealthIdCheck = $scope.abhaHealthId.replace("@sbx", '');

                            let validHealthId = $scope.abhaVerifyReg.hasSpecialCharacters(abhaHealthIdCheck);
                            if (validHealthId == true) {
                                return;
                            }else if(validHealthId == 'specialChar'){
                                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                                $('.healthId_no_special_char').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_special_char').css('display', 'none');
                                }, 3000);
                                return 0;
                            }else if(validHealthId == 'dotUderscorePosition'){
                                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                                $('.healthId_no_dotUp_position').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_dotUp_position').css('display', 'none');
                                }, 3000);
                                return 0;
                            }else if(validHealthId == 'dotUnderScoreLength'){
                                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                                $('.healthId_no_dotUp_length').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_dotUp_length').css('display', 'none');
                                }, 3000);
                                return 0;
                            }else if(validHealthId == 'maximumExceed'){
                                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                                $('.healthId_no_max').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_max').css('display', 'none');
                                }, 3000);
                                return 0;
                            }else if(validHealthId == 'minimumDiscreed'){
                                $scope.abhaVerifyReg.healthIdNextButtonClass = '';
                                $('.healthId_no_min').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_min').css('display', 'none');
                                }, 3000);
                                return 0;
                            }else{
                                $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                                $(".healthId_validation_loader").css('display', 'none');
                                $('.healthId_no_invalid').css('display', 'block');
                                setTimeout(function () {
                                    $('.healthId_no_invalid').css('display', 'none');
                                }, 3000);
                                return 0;
                            }
                        } else {
                            $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                            $(".healthId_validation_loader").css('display', 'none');
                            $('.healthId_something_wrong').css('display', 'block');
                            setTimeout(function () {
                                $('.healthId_something_wrong').css('display', 'none');
                            }, 3000);
                        }
                    } else {
                        $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                        $(".healthId_validation_loader").css('display', 'none');
                        $('.healthId_something_wrong').css('display', 'block');
                        setTimeout(function () {
                            $('.healthId_something_wrong').css('display', 'none');
                        }, 3000);
                    }
                }, function (res) {
                    console.log(res);
                    $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                    $(".healthId_validation_loader").css('display', 'none');
                    $('.healthId_something_wrong').css('display', 'block');
                    setTimeout(function () {
                        $('.healthId_something_wrong').css('display', 'none');
                    }, 3000);
                });
            }

            $scope.abhaVerifyReg.hasSpecialCharacters = function(address) {
                // Rule 1: Minimum length - 8 characters
                if (address.length < 8) {
                  return 'minimumDiscreed';
                }
              
                // Rule 2: Maximum length - 18 characters
                if (address.length > 18) {
                  return 'maximumExceed';
                }
              
                // Rule 3: Special characters allowed - 1 dot (.) and/or 1 underscore (_), if present
                const underscoreCount = (address.match(/_/g) || []).length;
                const dotCount = (address.match(/\./g) || []).length;
                if (underscoreCount > 1 || dotCount > 1) {
                  return 'dotUnderScoreLength';
                }
              
                // Rule 4: Special character dot and underscore should be in between.
                // Special characters cannot be in the beginning or at the end
                if (address[0] === '.' || address[0] === '_' || address[address.length - 1] === '.' || address[address.length - 1] === '_') {
                  return 'dotUderscorePosition';
                }
              
                // Rule 5: Alphanumeric - only numbers, only letters, or any combination of numbers and letters is allowed.
                if (!/^[a-zA-Z0-9._]+$/.test(address)) {
                  return 'specialChar';
                }
              
                // All rules passed
                return true;
              }

            $scope.abhaVerifyReg.abhaAccountCreate = function () {

                console.log($rootScope.UserInfo);
                let email = $rootScope.UserInfo.email;
                let firstName = $rootScope.UserInfo.firstName;
                let lastName = $rootScope.UserInfo.lastName;
                let abhaHealthid = $rootScope.UserInfo.firstName + $scope.mobileNumber;
                // let password = $scope.passValid;
                let password = '';
                // if($scope.newMobileNumAddAbha){
                let txnId = $rootScope.txdIdFromAadhar;
                // }
                let abhaCreatePayload = {
                    method: 'createAbhaNoUsingAadharMob',
                    //    data : {
                    //         "email": email,
                    //         "firstName": firstName,
                    //         "healthId": abhaHealthid,
                    //         "lastName": lastName.replace(/[^a-zA-Z\s]/g, ''),
                    //         "middleName": "",
                    //         "password": password,
                    //         "profilePhoto": "",
                    //         "txnId": txnId
                    //     }

                    data: {
                        "txnId": txnId
                    }
                };
                console.log(abhaCreatePayload)
                HigiApiService.getABHASession(abhaCreatePayload, function (response) {
                    var data = JSON.parse(response);
                    console.log(data)
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).healthId != undefined || JSON.parse(data.res).healthIdNumber != undefined) {
                            $scope.abhaUserRegDetails = JSON.parse(data.res);

                            HigiApiService.AbhaValidation($scope.abhaUserRegDetails.healthIdNumber.replace(/-/g, ''), function (res) {
                                if (res.is_exist == false) {
                                    // $rootScope.keyboardHide();
                                    // $scope.abhaVerifyReg.abhaPassword = false;
                                    $scope.abhaVerifyReg.abhaHealthProgressState = 'abha_accCreate_done';
                                    $scope.abhaUserToken = $scope.abhaUserRegDetails.token;
                                    // $scope.abhaVerifyReg.abhaAccountProcess = true;

                                    $scope.abhaVerifyReg.abhaProfileDetailsFetch($scope.abhaUserToken);
                                    // $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserToken);
                                } else {
                                    $scope.abhaVerifyReg.abhaMobileVerify = true;
                                    $rootScope.keyboardHide();
                                    $scope.accountAlreadyLinked = true;
                                    $scope.abhaVerifyReg.abhaAadharOTP = false;
                                    $('.mob_no_validation_loader').css('display', 'none');
                                    // $scope.abhaVerifyReg.init();
                                    // $scope.abhaVerifyReg.abhaVerifySection('No');
                                    // $scope.enable_half_declartion();
                                }
                            });

                        } else if (JSON.parse(data.res).message == "Request is invalid. Please enter the correct data.") {
                            $('.mob_no_validation_loader').css('display', 'none');
                            $(".abha_weak_password").css('display', 'block');
                            $timeout(function () {
                                $(".abha_weak_password").css('display', 'none');
                            }, 3000);
                        } else {
                            $('.mob_no_validation_loader').css('display', 'none');
                            $('#abha_confirm_password_text_match').css({ 'color': 'red' });
                            document.getElementById('abha_confirm_password_text_match').innerText = 'Something went wrong';
                            $timeout(function () {
                                document.getElementById('abha_confirm_password_text_match').innerText = '';
                            }, 3000);
                            $scope.somethingWentWrong = true;
                        }
                    } else {
                        $('.mob_no_validation_loader').css('display', 'none');
                        $('#abha_confirm_password_text_match').css({ 'color': 'red' });
                        document.getElementById('abha_confirm_password_text_match').innerText = 'Something went wrong';
                        $timeout(function () {
                            document.getElementById('abha_confirm_password_text_match').innerText = '';
                        }, 2000);
                        $scope.somethingWentWrong = true;
                    }
                }, function (err) {
                    $('.mob_no_validation_loader').css('display', 'none');
                    $('#abha_confirm_password_text_match').css({ 'color': 'red' });
                    document.getElementById('abha_confirm_password_text_match').innerText = 'Something went wrong';
                    $timeout(function () {
                        document.getElementById('abha_confirm_password_text_match').innerText = '';
                    }, 2000);
                    $scope.somethingWentWrong = true;
                });
            }

            $scope.abhaVerifyReg.goBackTOAadhaarSection = function(){
                $scope.accountAlreadyLinked = false;
                $scope.abhaVerifyReg.init();
                $scope.abhaVerifyReg.abhaVerifySection('No');
                $scope.enable_half_declartion();
            }

            $scope.abhaVerifyReg.abhaProfileDetailsFetch = function (token) {
                let abhaProfileDetailPayload = {
                    method: 'abhaProfileDetailsFetch',
                    data: {
                        "authToken": token
                    }
                };

                HigiApiService.getABHASession(abhaProfileDetailPayload, function (response) {
                    var data = JSON.parse(response);
                    console.log(data.res);
                    var profileData = JSON.parse(data.res);
                    $scope.phrProfileTransId = profileData.transactionId;
                    $('.mob_no_validation_loader').css('display', 'none');

                    if (data.status == 'S') {
                        if (profileData.transactionId) {
                            let abhaAddressSuggPayload = {
                                method: 'phrAbhaAddressSuggestion',
                                data: {
                                    "transactionId": $scope.phrProfileTransId
                                }
                            };
                            $('.mob_no_validation_loader').css('display', 'block');

                            HigiApiService.getABHASession(abhaAddressSuggPayload, function (response) {
                                var data = JSON.parse(response);
                                console.log(data.res);
                                $('.mob_no_validation_loader').css('display', 'none');

                                if (data.status == 'S' && JSON.parse(data.res).length > 0) {
                                    console.log(JSON.parse(data.res));
                                    $scope.abhaAddressSuggArray = JSON.parse(data.res);
                                    $scope.abhaVerifyReg.healthIDSection = true;
                                    $scope.abhaVerifyReg.abhaMobileVerify = false;
                                    $scope.abhaVerifyReg.abhaAadharOTP = false;
                                    $scope.slectedAbhaadress = true;
                                    $rootScope.showAbhaExtension($scope.abhaAddressSuggArray);
                                }else{
                                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                                    $('.mob_no_validation_loader').css('display', 'none');
                                    $('.mob_no_srv_error').css('display', 'block');
                                    $timeout(function () {
                                        $('.mob_no_srv_error').css('display', 'none');
                                    }, 3000);
                                }
                            }, function(res){
                                $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                                $('.mob_no_validation_loader').css('display', 'none');
                                $('.mob_no_srv_error').css('display', 'block');
                                $timeout(function () {
                                    $('.mob_no_srv_error').css('display', 'none');
                                }, 3000);
                            });
                        }else{
                            $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                            $('.mob_no_validation_loader').css('display', 'none');
                            $('.mob_no_srv_error').css('display', 'block');
                            $timeout(function () {
                                $('.mob_no_srv_error').css('display', 'none');
                            }, 3000);
                        }
                    }else{
                        $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                        $('.mob_no_validation_loader').css('display', 'none');
                        $('.mob_no_srv_error').css('display', 'block');
                        $timeout(function () {
                            $('.mob_no_srv_error').css('display', 'none');
                        }, 3000);
                    }
                }, function(res){
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                    $('.mob_no_validation_loader').css('display', 'none');
                    $('.mob_no_srv_error').css('display', 'block');
                    $timeout(function () {
                        $('.mob_no_srv_error').css('display', 'none');
                    }, 3000);
                });
            }

            $scope.abhaVerifyReg.abhaCardFetch = function (token) {
                let abhaCardGetPayload = {
                    method: 'getAbhaCardPng',
                    data: token
                };

                HigiApiService.getABHASession(abhaCardGetPayload, function (response) {
                    var data = JSON.parse(response);
                    console.log(data.res); //ABHA PNG here

                    if (data.status == 'S') {
                        var abhaCardBase64Res = data.res;
                        // $timeout(function(){
                        //     $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_done';    
                        // }, 5000);
                        if ($scope.abhaLinkFetchCard != '') {
                            $scope.abhaVerifyReg.abhaAccountProcess = false;
                            $scope.storeWhileLinkCardOnly = true;
                        } else {
                            $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_done';
                        }
                        $scope.abhaCardBase64 = abhaCardBase64Res;

                        $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.abhaCardBase64);
                    } else {
                        if ($scope.abhaLinkFetchCard == '') {
                            $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_fail';
                            $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                            $scope.abhaVerifyReg.abhaCardRetry = true;
                        }
                    }
                }, function (err) {
                    if ($scope.abhaLinkFetchCard == '') {
                        $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_fail';
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                        $scope.abhaVerifyReg.abhaCardRetry = true;
                    }
                });
            }

            $scope.abhaVerifyReg.storeAbhaDetailsInIHL = function (item) {
                var abhaCard = '';
                if ($scope.abhaUserRegDetails != '') {
                    abhaCard = item;
                    var storeAbhaDetailsIhl = {
                        method: 'storeIhlUserAbhaDetails',
                        data: {
                            ihl_user_id: $rootScope.UserInfo.id,
                            user_email: $scope.abhaUserRegDetails.email,
                            user_mobile: $scope.abhaUserRegDetails.mobile,
                            user_adhar: $scope.abhaUserRegDetails.aadhaar,
                            abha_number: $scope.abhaUserRegDetails.healthIdNumber.replace(/-/g, ''),
                            abha_address: $scope.abhaHealthId,
                            dob: $scope.abhaUserRegDetails.yearOfBirth + '-' + $scope.abhaUserRegDetails.monthOfBirth + '-' + $scope.abhaUserRegDetails.dayOfBirth,
                            gender: $scope.abhaUserRegDetails.gender,
                            abha_card: abhaCard,
                            abha_qr_code: ''
                        }
                    }
                } else if ($scope.abhaUserFetchDetails != '' && $scope.storeWhileLinkCardOnly == false) {
                    /*if($scope.isUserGaveABHAnumber){ // need to handle the flow in demographic flow
                        item['abha_number'] = item['abha_address'];
                        item['abha_address'] = "";
                    }*/
                    var storeAbhaDetailsIhl = {
                        method: 'storeIhlUserAbhaDetails',
                        data: item
                    }
                } else if ($scope.abhaLinkFetchCard != '' && $scope.storeWhileLinkCardOnly == true) {
                    abhaCard = item;
                    var storeAbhaDetailsIhl = {
                        method: 'updateIhlUserAbhaDetails',
                        data: {
                            ihl_user_id: $rootScope.UserInfo.id,
                            abha_number: $scope.abhaUserDetails.healthIdNumber.replace(/-/g, ''),
                            abha_address: $scope.abhaUserDetails.healthId,
                            abha_card: abhaCard,
                        }
                    }
                } else {
                    abhaCard = item;
                    console.log($scope.abhaUserDetails);
                    var storeAbhaDetailsIhl = {
                        method: 'storeIhlUserAbhaDetails',
                        data: {
                            ihl_user_id: $rootScope.UserInfo.id,
                            user_email: $scope.abhaUserDetails.email ? $scope.abhaUserDetails.email : '',
                            user_mobile: $scope.abhaUserDetails.mobile ? $scope.abhaUserDetails.mobile : '',
                            user_adhar: $scope.overallAadharFieldValue,
                            abha_number: $scope.abhaUserDetails.healthIdNumber ? $scope.abhaUserDetails.healthIdNumber.replace(/-/g, '') : '',
                            abha_address: $scope.abhaUserDetails.healthId,
                            dob: $scope.abhaUserDetails.yearOfBirth + '-' + $scope.abhaUserDetails.monthOfBirth + '-' + $scope.abhaUserDetails.dayOfBirth,
                            gender: $scope.abhaUserDetails.gender,
                            abha_card: abhaCard,
                            abha_qr_code: ''
                        }
                    }
                }

                HigiApiService.getABHASession(storeAbhaDetailsIhl, function (response) {
                    var data = JSON.parse(response);
                    // console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (data.res == "successful") {
                            // $timeout(function(){
                            //     $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_done';    
                            // }, 10000);
                            if ($scope.abhaUserRegDetails != '') {
                                $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_done';
                                $scope.abhaVerifyReg.abhaCardDisplay = true;

                                $scope.abhaVerifyReg.abhaFinishcontinueBtn = 'abha_close_continue_active';
                            } else if ($scope.abhaUserFetchDetails != '') {
                                $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_done';
                                $scope.abhaVerifyReg.authLinkDropDown = true;
                            } else {
                                $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_done';
                                $scope.abhaVerifyReg.abhaCardDisplay = true;
                                $scope.abhaVerifyReg.abhaFinishcontinueBtn = 'abha_close_continue_active';

                            }
                            if (abhaCard != '') $scope.abhaVerifyReg.abhaIntermedCardShow = 'data:image/png;base64, ' + abhaCard;
                            $rootScope.username_for_email_card = $rootScope.UserInfo.firstName;
                            $rootScope.email_for_abha_card = $rootScope.UserInfo.email;
                            $rootScope.abha_card_for_email = abhaCard;
                        } else if (data.res == 'update success') {
                            $('.otp_validation_loader').css('display', 'none');
                            // $rootScope.abha_payment_reason_for_visit = true;
                            // $rootScope.abhaCloseCheckPaymentFlow();
                            if (abhaCard != '') $scope.abhaVerifyReg.abhaIntermedCardShow = 'data:image/png;base64, ' + abhaCard;
                            $rootScope.abha_card_show_last_link = true;
                            $scope.abhaVerifyReg.abhaOTPSection = false;
                        } else if(data.res == 'abha address already linked with ihl id'){
                            $scope.abhaVerifyReg.abhaFinishcontinueBtn = 'abha_close_continue_active';
                            $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                            $scope.abhaVerifyReg.authLinkDropDown = false;
                            $('.errro_txt_abhaLink').css('display', 'block');
                        } else if(data.res == 'abha number already linked'){
                            $scope.abhaVerifyReg.abhaFinishcontinueBtn = 'abha_close_continue_active';
                            $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                            $scope.abhaVerifyReg.authLinkDropDown = false;
                        } else if(data.res == 'failed') {
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.newMobileNumAddAbha = false;
                            $scope.abhaVerifyReg.abhaOTPSection = true;
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(() => {
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                        }else {
                            $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                            $scope.abhaVerifyReg.abhaIhlLinkRetry = true;
                        }
                    } else {
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                        $scope.abhaVerifyReg.abhaIhlLinkRetry = true;
                    }
                }, function (err) {
                    $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                    $scope.abhaVerifyReg.abhaIhlLinkRetry = true;
                });
            }
            $scope.closeabhafullmodule = function () {
                $rootScope.abha_payment_reason_for_visit = true;
                $rootScope.abhaCloseCheckPaymentFlow();
            }

            $scope.abhaVerifyReg.retryAbhaStore = function (item) {
                switch (item) {
                    case 'create':
                        $scope.abhaVerifyReg.abhaCreateRetry = false;
                        $scope.abhaVerifyReg.abhaHealthProgressState = '';
                        $scope.abhaVerifyReg.abhaCardProgressState = '';
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = '';
                        $scope.abhaVerifyReg.abhaAccountCreate();
                        break;
                    case 'link':
                        $scope.abhaVerifyReg.abhaLinkRetry = false;
                        $scope.abhaVerifyReg.abhaLinkProgressState = '';
                        $scope.abhaVerifyReg.abhaCardProgressState = '';
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = '';
                        if ($scope.abhaAuthMode == 'DONT_KNOW') {
                            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirm($scope.abhaUserToken);
                        } else {
                            $scope.abhaVerifyReg.getProfileDetails($scope.abhaUserToken);
                        }
                        break;
                    case 'card':
                        $scope.abhaVerifyReg.abhaCardRetry = false;
                        $scope.abhaVerifyReg.abhaCardProgressState = '';
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = '';
                        $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserToken);
                        break;
                    case 'ihlLink':
                        $scope.abhaVerifyReg.abhaIhlLinkRetry = false;
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = '';
                        if ($scope.abhaUserFetchDetails != '') {
                            $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                        } else {
                            $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.abhaCardBase64);
                        }
                        break;

                }
            }

            $scope.onAbhaAuthChange = function (auth) {
                console.log(auth)
                if ($scope.abhaUserFetchDetails == '') {
                    let abhaAuth_id = $scope.abhaAuthDropOptions.find((item) => item.auth === auth)?.auth_id;
                    $scope.abhaAuthMode = abhaAuth_id;
                    if ($scope.abhaAuthMode == 'DO_IT_LATER') {
                        $rootScope.abha_payment_reason_for_visit = true;
                        $rootScope.abhaCloseCheckPaymentFlow();
                    }
                    if ($scope.abhaAuthMode != '' && $scope.abhaAddress.length > 0 && $scope.abhaAuthMode != 'DO_IT_LATER') {
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    } else {
                        $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                    }
                } else {
                    let abhaAuth_id = $scope.abhaAuthDropOptions.find((item) => item.auth === auth)?.auth_id;
                    $scope.abhaLinkFetchCard = abhaAuth_id;
                    $scope.abhaVerifyReg.abhaFinishcontinueBtn = 'abha_close_continue_active';
                    $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                }
            }

            $scope.onAbhaAuthClickEvent = function () {
                $("#abhaAuthSelect").css('border', '2px solid #3787c0');
            }

            $scope.onAbhaGenderChange = function (item) {
                $scope.abhaGender = item;
                $scope.abhaName = $scope.abhaVerifyReg.fields[1].text;


                if (($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined)) {
                    $scope.DobValidate = false;
                } else {
                    $scope.DobValidate = true;
                }

                if ($scope.abhaGender != '' && $scope.abhaName.length > 1 && $scope.DobValidate && $scope.abhaMobileValid) {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                }
            }

            $scope.onAbhaGenderClickEvent = function () {
                $("#abhaGenderSelect").css('border', '2px solid #3787c0');
            }

            $scope.openTab = function (tab_name) {
                $(".abha_auth_mode_loader").css('display', 'block');
                if ($scope.selectedAuth == tab_name) {
                    $scope.selectedAuth = '';
                    return;
                } else {

                    $scope.selectedAuth = tab_name;
                    /*
                    let data = {
                        method : 'initAuthModeVerify', 
                        data : {
                            "abhaAddress" : $scope.abhaAddress,
                            "purpose" : $scope.fetchAuthPorpose,
                            "authMode" : $scope.selectedAuth
                        }
                    };

                    HigiApiService.getABHASession(data, function(res){
                        var data = JSON.parse(res);
                        console.log(data);

                        // data.status = 'S';
                        // var mockRes = {
                        //     "requestId": "576b03d4-3cb2-400e-afd3-9b9c51bc0f2a",
                        //     "url": "/healthinfo/index.php/v0.5/users/auth/on-init",
                        //     "body": "{&quot;requestId&quot;:&quot;1d5b2cba-1f09-4059-93f3-26f21cd0aef1&quot;,&quot;timestamp&quot;:&quot;2023-04-10T06:10:55.402686602&quot;,&quot;auth&quot;:{&quot;transactionId&quot;:&quot;1b855a87-d61a-4493-87f6-50ddf816f38f&quot;,&quot;mode&quot;:&quot;AADHAAR_OTP&quot;,&quot;meta&quot;:{&quot;hint&quot;:null,&quot;expiry&quot;:&quot;2023-04-10T08:10:55.402688555&quot;}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;576b03d4-3cb2-400e-afd3-9b9c51bc0f2a&quot;}}"
                        // }

                        if(data.status == 'S'){
                            let JSONData = {
                                "requestId" : data.res,
                                "mode": 'on-init'
                            }

                            let abhaCallBackCount = 0;
                            let abhaCallBackMaxCount = 5;
                            //let abhaCallBack = setInterval(function(){
                                HigiApiService.fetchDatafromAbhaRes(JSONData, function(res){
                                    $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'openTab');
                                    /*abhaCallBackCount++;
                                    if(res.status){
                                        $scope.initAuthVerifyRes = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                                        console.log($scope.initAuthVerifyRes);

                                        console.log($scope.selectedAuth);
                                        if($scope.initAuthVerifyRes != null){
                                            clearInterval(abhaCallBack);
                                            abhaCallBackCount = 0;
                                            if($scope.initAuthVerifyRes.mode == 'DEMOGRAPHICS'){
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = true;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = false;
                                                if($scope.abhaVerifyReg.fields[1].text.length <= 3 ||
                                                 HigiKioskStorageService.returnSessionData('gender') == undefined ||
                                                 HigiKioskStorageService.returnSessionData('birthdate') == undefined){
                                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";    
                                                } else {
                                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "checkin_abhaDemo_submit_active_btn";    
                                                }
                                                $rootScope.keyboardShow();
                                            }else if($scope.initAuthVerifyRes.mode == 'MOBILE_OTP'){
                                                $scope.otpSectionTitle = 'Mobile OTP';
                                                $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = false;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = true;
                                                if($scope.resendOTPEnable == true){
                                                    $('.otp_validation_loader').css('display', 'none');
                                                    $('.otp_resend').css('display', 'block');
                                                    setTimeout(function(){
                                                        $(".otp_resend").css('display','none');
                                                    },3000);
                                                }
                                                $rootScope.keyboardShow();
                                                $scope.abhaAuthMode == 'MOBILE_OTP';
                                            }else if($scope.initAuthVerifyRes.mode == 'AADHAAR_OTP'){
                                                $scope.otpSectionTitle = 'Aadhar OTP';
                                                $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = false;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = true;
                                                if($scope.resendOTPEnable == true){
                                                    $('.otp_validation_loader').css('display', 'none');
                                                    $('.otp_resend').css('display', 'block');
                                                    setTimeout(function(){
                                                        $(".otp_resend").css('display','none');
                                                    },3000);
                                                }
                                                $rootScope.keyboardShow();
                                            }
                                        }else{
                                            if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                                clearInterval(abhaCallBack);
                                                abhaCallBackCount = 0;
                                                $scope.selectedAuth = '';
                                                $(".abha_tab_server_error").css('display' , 'block');
                                                $timeout(function(){
                                                    $(".abha_tab_server_error").css('display' , 'none');
                                                },2000);  
                                            }  
                                        }
                                    }else{
                                        if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                            clearInterval(abhaCallBack);
                                            abhaCallBackCount = 0;
                                            $scope.selectedAuth = '';
                                            $(".abha_tab_server_error").css('display' , 'block');
                                            $timeout(function(){
                                                $(".abha_tab_server_error").css('display' , 'none');
                                            },2000);
                                        }
                                    }
                                }, function(err){
                                    // clearInterval(abhaCallBack);
                                    // abhaCallBackCount = 0;
                                    $scope.selectedAuth = '';
                                    $(".abha_tab_server_error").css('display' , 'block');
                                    $timeout(function(){
                                        $(".abha_tab_server_error").css('display' , 'none');
                                    },2000);
                                });
                            //}, 2000);

                        }else{
                            $scope.selectedAuth = '';
                            $(".abha_tab_server_error").css('display' , 'block');
                            $timeout(function(){
                                $(".abha_tab_server_error").css('display' , 'none');
                            },2000);
                        }
                    }, function(err){
                        $scope.selectedAuth = '';
                        $(".abha_tab_server_error").css('display' , 'block');
                        $timeout(function(){
                            $(".abha_tab_server_error").css('display' , 'none');
                        },2000);
                    });*/
                    // ABHA Care Context M2 integration starts here
                    if (tab_name == "QRCODE") {
                        $scope.abhaVerifyReg.qrSection();
                    } else {
                        let data = {
                            method: 'initAuthModeVerify',
                            data: {
                                "abhaAddress": $scope.abhaAddress,
                                "purpose": $scope.fetchAuthPorpose,
                                "authMode": $scope.selectedAuth
                            },
                            url: getSettingsValue('kiosk.api.url')
                        };

                        HigiApiService.getABHASession(data, function (res) {
                            var data = JSON.parse(res);
                            console.log({
                                'resp': data.res,
                                'url': data.url,
                                'body': data.body,
                                'status': data.code
                            });

                            // data.status = 'S';
                            // var mockRes = {
                            //     "requestId": "576b03d4-3cb2-400e-afd3-9b9c51bc0f2a",
                            //     "url": "/healthinfo/index.php/v0.5/users/auth/on-init",
                            //     "body": "{&quot;requestId&quot;:&quot;1d5b2cba-1f09-4059-93f3-26f21cd0aef1&quot;,&quot;timestamp&quot;:&quot;2023-04-10T06:10:55.402686602&quot;,&quot;auth&quot;:{&quot;transactionId&quot;:&quot;1b855a87-d61a-4493-87f6-50ddf816f38f&quot;,&quot;mode&quot;:&quot;AADHAAR_OTP&quot;,&quot;meta&quot;:{&quot;hint&quot;:null,&quot;expiry&quot;:&quot;2023-04-10T08:10:55.402688555&quot;}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;576b03d4-3cb2-400e-afd3-9b9c51bc0f2a&quot;}}"
                            // }

                            if (data.status == 'S') {
                                let JSONData = {
                                    "requestId": data.res,
                                    "mode": 'on-init'
                                }

                                let abhaCallBackCount = 0;
                                let abhaCallBackMaxCount = 5;
                                // let abhaCallBack = setInterval(function(){
                                HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                                    // console.log("Verify 01 on-init",res)
                                    // res = { //For Mobile selection
                                    //     "status": {
                                    //         "requestId": "0b6de78b-6850-4397-b13b-ff0831714b03",
                                    //         "url": "/Newfolder/index.php/v0.5/users/auth/on-init",
                                    //         "body": "{&quot;requestId&quot;:&quot;7bc02964-e4a3-4d7d-89c3-f370cfb122b1&quot;,&quot;timestamp&quot;:&quot;2023-06-09T06:25:36.506997515&quot;,&quot;auth&quot;:{&quot;transactionId&quot;:&quot;08941df2-81a0-413d-badd-c259638ab933&quot;,&quot;mode&quot;:&quot;MOBILE_OTP&quot;,&quot;meta&quot;:{&quot;hint&quot;:null,&quot;expiry&quot;:&quot;2023-06-09T08:25:36.50699941&quot;}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;0b6de78b-6850-4397-b13b-ff0831714b03&quot;}}"
                                    //     }
                                    // }


                                    // res = { //For Demographic selection
                                    //     "status": {
                                    //         "requestId": "a46fb49a-779e-427a-bb98-4d4788dfb31f",
                                    //         "url": "/auth/on-init",
                                    //         "body": "{&quot;requestId&quot;:&quot;3fdb53a1-8f37-4917-b14b-86567dba715d&quot;,&quot;timestamp&quot;:&quot;2023-08-09T10:44:10.701403158&quot;,&quot;auth&quot;:{&quot;transactionId&quot;:&quot;f36a253a-852d-4e50-9a83-c735298e88c5&quot;,&quot;mode&quot;:&quot;DEMOGRAPHICS&quot;,&quot;meta&quot;:{&quot;hint&quot;:null,&quot;expiry&quot;:&quot;2023-08-09T12:44:10.701415356&quot;}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;a46fb49a-779e-427a-bb98-4d4788dfb31f&quot;}}"
                                    //     }
                                    // }
                                    // console.log(res)
                                    // $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'openTab');
                                    // /*
                                    $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'openTab');
                                    /*abhaCallBackCount++;
                                    if(res.status){
                                        $scope.initAuthVerifyRes = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                                        console.log($scope.initAuthVerifyRes);
 
                                        console.log($scope.selectedAuth);
                                        if($scope.initAuthVerifyRes != null){
                                            clearInterval(abhaCallBack);
                                            abhaCallBackCount = 0;
                                            if($scope.initAuthVerifyRes.mode == 'DEMOGRAPHICS'){
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = true;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = false;
                                                if($scope.abhaVerifyReg.fields[1].text.length <= 3 ||
                                                HigiKioskStorageService.returnSessionData('gender') == undefined ||
                                                HigiKioskStorageService.returnSessionData('birthdate') == undefined){
                                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";    
                                                } else {
                                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "checkin_abhaDemo_submit_active_btn";    
                                                }
                                                $rootScope.keyboardShow();
                                            }else if($scope.initAuthVerifyRes.mode == 'MOBILE_OTP'){
                                                $scope.otpSectionTitle = 'Mobile OTP';
                                                $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = false;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = true;
                                                if($scope.resendOTPEnable == true){
                                                    $('.otp_validation_loader').css('display', 'none');
                                                    $('.otp_resend').css('display', 'block');
                                                    setTimeout(function(){
                                                        $(".otp_resend").css('display','none');
                                                    },3000);
                                                }
                                                $rootScope.keyboardShow();
                                                $scope.abhaAuthMode == 'MOBILE_OTP';
                                            }else if($scope.initAuthVerifyRes.mode == 'AADHAAR_OTP'){
                                                $scope.otpSectionTitle = 'Aadhar OTP';
                                                $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                                                $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                                                $scope.abhaVerifyReg.abhaDemographicForm = false;
                                                $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                                                $scope.abhaVerifyReg.abhaOTPSection = true;
                                                if($scope.resendOTPEnable == true){
                                                    $('.otp_validation_loader').css('display', 'none');
                                                    $('.otp_resend').css('display', 'block');
                                                    setTimeout(function(){
                                                        $(".otp_resend").css('display','none');
                                                    },3000);
                                                }
                                                $rootScope.keyboardShow();
                                            }
                                        }else{
                                            if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                                clearInterval(abhaCallBack);
                                                abhaCallBackCount = 0;
                                                $scope.selectedAuth = '';
                                                $(".abha_tab_server_error").css('display' , 'block');
                                                $timeout(function(){
                                                    $(".abha_tab_server_error").css('display' , 'none');
                                                },2000);  
                                            }  
                                        }
                                    }else{
                                        if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                            clearInterval(abhaCallBack);
                                            abhaCallBackCount = 0;
                                            $scope.selectedAuth = '';
                                            $(".abha_tab_server_error").css('display' , 'block');
                                            $timeout(function(){
                                                $(".abha_tab_server_error").css('display' , 'none');
                                            },2000);
                                        }
                                    }*/

                                }, function (err) {
                                    console.log(err)
                                    clearInterval(abhaCallBack);
                                    abhaCallBackCount = 0;
                                    $scope.selectedAuth = '';
                                    $(".abha_tab_server_error").css('display', 'block');
                                    $timeout(function () {
                                        $(".abha_tab_server_error").css('display', 'none');
                                    }, 2000);
                                });
                                // }, 2000);

                            } else {
                                $scope.selectedAuth = '';
                                $(".abha_auth_mode_loader").css('display', 'none');
                                $(".abha_authMode_loader").css('display', 'none');
                                $(".abha_tab_server_error").css('display', 'block');
                                $timeout(function () {
                                    $(".abha_tab_server_error").css('display', 'none');
                                }, 2000);
                            }
                        }, function (err) {
                            $scope.selectedAuth = '';
                            $(".abha_authMode_loader").css('display', 'none');
                            $(".abha_tab_server_error").css('display', 'block');
                            $timeout(function () {
                                $(".abha_tab_server_error").css('display', 'none');
                            }, 2000);
                        });
                    }
                    // ABHA Care context M2 intgration ends here */  
                }
            }

            $scope.abhaVerifyReg.mobileNoPatternCheck = function (field) {
                var str = field.text;
                // $scope.registerModal.abhaMobileNextButtonClass = '';
                $(".mob_no_validation_loader").css('display', 'none');
                $(".mob_no_validation_error").css('display', 'none');
                $(".mob_no_validation_srv_err").css('display', 'none');

                $(".aadharLinkMobileNumberHasIHLacc").css('display', 'none');

                if (str.length == 10 && isNaN(str) == false) {
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                    return;
                    var emailIsThis = "";
                    var mobileIsThis = $scope.registerModal.fields[2].text;
                    var aadhaarIsThis = "";
                    $rootScope.PreviouslyGivenMobile = $scope.registerModal.fields[2].text; // 
                    $scope.registerModal.abhaMobileNextButtonClass = 'abhaMobileExist_next_active_btn';
                    $rootScope.isOnline6 = window.navigator.onLine;
                    if ($rootScope.isOnline6) {
                        $(".mob_no_validation_loader").css('display', 'block');
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
                                    url: getSettingsValue('kiosk.api.url') + "/data/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                    type: "GET",
                                    cache: false,
                                    contentType: 'application/json; charset=UTF-8',
                                    headers: { "ApiToken": token },
                                    success: function (html) {
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
                                        $(".mob_no_validation_loader").css('display', 'none');
                                        $(".mob_no_validation_srv_err").css('display', 'none');
                                        $(".mob_no_validation_error").css('display', 'none');

                                        $(".aadharLinkMobileNumberHasIHLacc").css('display', 'none');

                                        if ($rootScope.registerFlowFirstInput != "email") {
                                            if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && $scope.emailText == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                            }
                                        } else {
                                            if ($scope.mobTextLengthSatisfied == true && $scope.adr1TextLengthSatisfied == true && $scope.adr2TextLengthSatisfied == true && $scope.adr3TextLengthSatisfied == true && (($scope.adr1FieldText.length == 0 && $scope.adr2FieldText.length == 0 && $scope.adr3FieldText.length == 0) || ($scope.adr1FieldText.length == 4 && $scope.adr2FieldText.length == 4 && $scope.adr3FieldText.length == 4))) {
                                                $scope.registerModal.MobileSectionNextButtonClass = 'signup_modal_next_active_btn';
                                            }
                                        }
                                        // }
                                    },
                                    error: function (xhr, status, error) {
                                        $scope.mobVerifyIHLExist = false;
                                        console.log('failures 3' + xhr.responseText);
                                    }
                                });
                            }
                        });
                    } else {
                        $scope.registerModal.MobileSectionNextButtonClass = '';
                        $(".mob_no_validation_loader").css('display', 'none');
                        $(".mob_no_validation_error").css('display', 'none');
                        $(".mob_no_validation_srv_err").css('display', 'block');
                        $scope.mobTextLengthSatisfied = false;
                    }
                } else if (str.length == 0) {
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = 'abha_mobileVerify_next_active_btn';
                    $(".mob_no_validation_loader").css('display', 'none');
                    $(".mob_no_validation_error").css('display', 'none');
                    $(".mob_no_validation_srv_err").css('display', 'none');
                } else if ((str.length != 10 || isNaN(str) == false) && str != '') {
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = '';
                } else {
                    $scope.abhaVerifyReg.abhaMobileVerifyNextButtonClass = '';
                    $(".mob_no_validation_loader").css('display', 'none');
                    $(".mob_no_validation_error").css('display', 'none');
                    $(".mob_no_validation_srv_err").css('display', 'none');
                }
            }

            $scope.abhaVerifyReg.submitAbhaDemoDetails = function () {
                console.log($scope.abhaGender);
                console.log($scope.abhaName);
                console.log($scope.initAuthVerifyRes);
                $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                /* ABHA care context Enable
                if($rootScope.abhaCareContextShareVitalArrayList.length > 0){
                    $rootScope.abhaCareContextShareVitalArrayList.forEach(element => {
                        if(element.isSelected != undefined){
                            delete element['isSelected'];
                        }
                    });
                }
        
                if($rootScope.shareCareContextEnable){ 
                    let data = {
                        method : 'abhaCareContextVitalLink',
                        data : $rootScope.abhaCareContextShareVitalArrayList
                    };
                    console.log(data)
                    HigiApiService.getABHASession(data, function(resp){
                        console.log(resp);
                        let response = JSON.parse(resp).res
                        
                        if(response.status == 'sucessfully linked'){
                            $scope.abhaVerifyReg.abhaDemographicFormSubmit = '';
                            $scope.abhaVerifyReg.abhaCareContextShare = false;
                            $scope.abhaVerifyReg.checkinAbhaEnable = false;
                            $rootScope.shareCareContextEnable = false;
                            $rootScope.clearModal();
                        }else{
                            $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                            //no data found
                            $('.abha_no_data_server').css('display', 'block');
                            $timeout(function(){
                                $('.abha_no_data_server').css('display', 'none');
                            }, 3000);
                        }
                    }, function(err){
                        $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                        //invalid input
                        $('.abha_wrng_addr').css('display', 'block');
                        $timeout(function(){
                            $('.abha_wrng_addr').css('display', 'none');
                        }, 3000);
                    })
                }else{
                */
                $scope.formatedDOB = ($scope.abhaVerifyReg.fields[13].text + "-" + $scope.abhaVerifyReg.fields[12].text + "-" + $scope.abhaVerifyReg.fields[11].text).toString();
                console.log($scope.formatedDOB);
                let data = {
                    method: 'confirmAuthModeVerify',
                    data: {
                        "transactionId": $scope.initAuthVerifyRes.transactionId,
                        "name": $scope.abhaName,
                        "gender": $scope.abhaGender,
                        "dateOfBirth": $scope.formatedDOB,
                        "mobile": $scope.abhaVerifyReg.fields[14].text
                    }
                };

                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(data);

                    // data.status = 'S';
                    // var mockRes = {
                    //     "requestId": "e7bdf5f5-1c23-4abc-a82d-909abfaf963a",
                    //     "url": "/Newfolder/index.php/v0.5/users/auth/on-confirm",
                    //     "body": "{&quot;requestId&quot;:&quot;abc49271-8268-41eb-af18-a276e138a725&quot;,&quot;timestamp&quot;:&quot;2023-06-08T10:34:23.072797223&quot;,&quot;auth&quot;:{&quot;accessToken&quot;:&quot;eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJtb25pY2EyMDIzQHNieCIsInJlcXVlc3RlclR5cGUiOiJISVAiLCJyZXF1ZXN0ZXJJZCI6ImlobF95b2cxMl8yMDIyIiwicGF0aWVudElkIjoibW9uaWNhMjAyM0BzYngiLCJzZXNzaW9uSWQiOiI2NmI4NWU1ZC03MjQwLTQxNTMtOWIxZC04Y2FlMzE1YjE5ZjUiLCJleHAiOjE2ODYzMDY4NjMsImlhdCI6MTY4NjIyMDQ2M30.c_ta5D_CxDdiEg716AqvP9xua8uWP9E28QXuXv7CKkXRMiusJ4IqQGBOYTEKLLa5nMNzwTa4mywTA3QXnBmrEE8a0gV5NXHAfvc8yCtMwcZBc2lgcOa-tMxPFWiT_eBUDqMz_jgqp3l69e5VKn5vB6RYgCM4zuvqfxs4LWqhXiWPwRanHooT1AkrLOLsUxQ-HmtYETEKIJMztufNm0Xj-pr5ErIwJb6fKXbbfM-j5sMvqB5YGMarsaphw7rDgrlsuU49_GekAJejR0vBiIwio1IhocwIx0Efr8bXjkn-qSriz2LW5dum6xrIAg5ELXDzBVqN4biVXmdgMIuvIvF-2g&quot;,&quot;patient&quot;:{&quot;id&quot;:null,&quot;name&quot;:&quot;nb monica&quot;,&quot;gender&quot;:&quot;F&quot;,&quot;yearOfBirth&quot;:1999,&quot;monthOfBirth&quot;:6,&quot;dayOfBirth&quot;:26,&quot;address&quot;:null,&quot;identifiers&quot;:null}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;e7bdf5f5-1c23-4abc-a82d-909abfaf963a&quot;}}"
                    // }

                    if (data.status == 'S') {
                        let JSONData = {
                            "requestId": data.res,
                            "mode": 'on-confirm'
                        }
                        let abhaCallBackCount = 0;
                        let abhaCallBackMaxCount = 5;

                        //let abhaCallBack = setInterval(function(){
                        HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                            $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'submitAbhaDemoDetails');
                            // abhaCallBackCount++;
                            //ABHA Care context M2 integration ends here
                            /*else if(res.status){                                    
                                clearInterval(abhaCallBack);
                                abhaCallBackCount = 0;
                                $scope.abhaUserFetchDetails = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                                console.log($scope.abhaUserFetchDetails);
                                if($scope.abhaUserFetchDetails != null){
                                // if($scope.abhaUserFetchDetails != ''){
                                    $rootScope.keyboardHide();
                                    // $scope.abhaVerifyReg.authLinkDropDown = true;
                                    $scope.abhaVerifyReg.abhaDemographicForm = false;
                                    $scope.abhaVerifyReg.abhaAccountProcess = true;
                                    $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                                    var patientDetails = $scope.abhaUserFetchDetails.patient;
                                    let patientMobile = "";
                                    let patientAbhaNumber = "";
                                    if(patientDetails.identifiers != null && patientDetails.identifiers.length > 0){
                                        if(patientDetails.identifiers[0] != undefined){
                                            patientMobile = patientDetails.identifiers[0].value;
                                        }
                                        if(patientDetails.identifiers[1] != undefined){
                                            patientAbhaNumber = patientDetails.identifiers[1].value;
                                        }
                                    }   
                                    var demo_abhaAddress = '';
                                    var demo_abhaNumber = '';
                                    if ($scope.abhaAddress.length == 14) {
                                        demo_abhaNumber = $scope.abhaAddress;
                                    } else if($scope.abhaAddress.length != 14 && $scope.abhaAddress.length != ''){
                                        demo_abhaAddress = $scope.abhaAddress;
                                    }
                                    $scope.ihlStorePayload = {
                                        ihl_user_id : $rootScope.UserInfo.id,
                                        user_email: '',
                                        user_mobile: patientMobile,
                                        user_adhar: '',
                                        abha_number: demo_abhaNumber != '' ? demo_abhaNumber : '',
                                        abha_address: patientDetails.id != null ? patientDetails.id : demo_abhaAddress,
                                        self:false,  // optional
                                        abha_card: '',
                                        abha_qr_code: ''
                                    };
                                    $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);

                                    // $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserFetchDetails.accessToken);
                                }else{
                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                                    $('.abha_demo_cred_error').css('display', 'block');
                                    $timeout(function(){
                                        $('.abha_demo_cred_error').css('display', 'none');
                                    }, 3000);
                                }
                            }
                            else{
                                if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                                    clearInterval(abhaCallBack);
                                    abhaCallBackCount = 0;
                                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                                    $('.abha_demo_cred_error').css('display', 'block');
                                    $timeout(function(){
                                        $('.abha_demo_cred_error').css('display', 'none');
                                    }, 3000);
                                }
                            }*/
                        }, function (err) {
                            // clearInterval(abhaCallBack);
                            // abhaCallBackCount = 0;
                            $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                            $('.abha_demo_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_demo_server_error').css('display', 'none');
                            }, 3000);
                        });
                        //}, 2000);

                        // let mockResBody = JSON.parse(mockRes.body.replaceAll('&quot;','"')).auth;
                        // console.log(mockResBody);
                    }
                }, function (err) {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                    $('.abha_demo_server_error').css('display', 'block');
                    $timeout(function () {
                        $('.abha_demo_server_error').css('display', 'none');
                    }, 3000);
                });
                // }
            }

            $scope.abhaVerifyReg.submitOTP = function () {
                console.log($scope.abhaOTP);
                console.log($scope.abhaAuthMode);
                // $scope.abhaAuthMode = "MOBILE_OTP";// ABHA Care Context M2 integration
                $('.otp_validation_loader').css('display', 'block');
                $scope.abhaVerifyReg.abhaOtpSubmit = '';
                $scope.abhaDontKnowTxnId = $scope.initAuthVerifyRes.transactionId;

                if ($scope.abhaAuthMode == 'DONT_KNOW' && $scope.abhaLinkFetchCard == '') {
                    let data = {
                        method: 'confirmAuthModeVerify',
                        data: {
                            "otp": true,
                            "transactionId": $scope.abhaDontKnowTxnId,
                            "authCode": $scope.abhaOTP
                        }
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                            'resp': data.res,
                            'url': data.url,
                            'body': data.body,
                            'status': data.code
                        });

                        // data.status = 'S';
                        // var mockRes = {
                        //     "requestId": "d212ddb4-b72e-4964-851d-9aaa93781e31",
                        //     "url": "/Newfolder/index.php/v0.5/users/auth/on-confirm",
                        //     "body": "{&quot;requestId&quot;:&quot;0bb32da0-44a0-4437-ab00-aeb2e7ff4e44&quot;,&quot;timestamp&quot;:&quot;2023-06-09T06:35:04.011019533&quot;,&quot;auth&quot;:{&quot;accessToken&quot;:&quot;eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiJwcmFkZWVwOTdAc2J4IiwicmVxdWVzdGVyVHlwZSI6IkhJUCIsInJlcXVlc3RlcklkIjoiaWhsX3lvZzEyXzIwMjIiLCJwYXRpZW50SWQiOiJwcmFkZWVwOTdAc2J4Iiwic2Vzc2lvbklkIjoiNzhiZDVmZmMtYjRlZi00OTM4LWFiODQtNTkzMzdlNDAzODZhIiwiZXhwIjoxNjg2Mzc4OTAzLCJpYXQiOjE2ODYyOTI1MDN9.Is-BzkP_UchycJQvE3mujIeILeqlF_g01_T5coJc-JfSwJ44lF5oiZW5amIs7TSNl7vNuCy17VwgoCJCfIi6CMhcV1Lpg9B1Z_mb2JQUkLgGZtOaUoSl1Hnul_rkTI8SlbhRgBYmd_9P2ZRsRn6ydpRPNBD0uGsS9Dp_eI4vzlU942LmboCW6a1mc_6CbaF6iU-p-z9SSZUr2KSP6D013PVHm4R7rujj_8E0F4z748VO-Estb7UV2zs9SfYK8zIQHP0E1yDkIMqyeZYrdjw8PIMJzMHIFXoSoSRjpzrJldkmpTYI6cyj6pEYMgugEJOM91hboSRy5WBCIhjf5LKo9g&quot;,&quot;patient&quot;:{&quot;id&quot;:&quot;pradeep97@sbx&quot;,&quot;name&quot;:&quot;Pradeep Kumar A&quot;,&quot;gender&quot;:&quot;M&quot;,&quot;yearOfBirth&quot;:1997,&quot;monthOfBirth&quot;:3,&quot;dayOfBirth&quot;:23,&quot;address&quot;:{&quot;line&quot;:null,&quot;district&quot;:&quot;MEERUT&quot;,&quot;state&quot;:&quot;TAMIL NADU&quot;,&quot;pincode&quot;:null},&quot;identifiers&quot;:[{&quot;type&quot;:&quot;MOBILE&quot;,&quot;value&quot;:&quot;7502994186&quot;},{&quot;type&quot;:&quot;HEALTH_NUMBER&quot;,&quot;value&quot;:&quot;91-5887-4738-6609&quot;}]}},&quot;error&quot;:null,&quot;resp&quot;:{&quot;requestId&quot;:&quot;d212ddb4-b72e-4964-851d-9aaa93781e31&quot;}}"
                        // }             

                        if (data.status == 'S') {
                            // $('.otp_validation_loader').css('display', 'none');
                            // $scope.abhaVerifyReg.fields[2].text = '';
                            // $rootScope.keyboardHide();
                            $rootScope.showTimer = false;
                            $interval.cancel($rootScope.timerPromise)
                            $scope.abhaUserToken = data.res;
                            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirm(data.res);
                            // $scope.abhaVerifyReg.abhaOTPSection = false;
                            // $scope.abhaVerifyReg.abhaAccountProcess = true;
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function () {
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                            $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                        }
                    }, function (err) {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.otp_srv_err').css('display', 'block');
                        $timeout(function () {
                            $('.otp_srv_err').css('display', 'none');
                        }, 3000);
                        $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                    });
                } else if ($scope.abhaAuthMode == 'MOBILE_OTP' || $scope.abhaLinkFetchCard == 'MOBILE_OTP') {
                    let data = {
                        method: 'confirmAuthMobileOtpVerify',
                        data: {
                            "otp": $scope.abhaOTP,
                            "txnId": $scope.abhaTxnId
                        }
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                            'resp': data.res,
                            'url': data.url,
                            'body': data.body,
                            'status': data.code
                         });

                        if (data.status == 'S') {
                            if (data.res != '') {
                                if (JSON.parse(data.res).token) {
                                    $scope.abhaVerifyReg.fields[2].text = '';
                                    // $('.otp_validation_loader').css('display', 'none');
                                    let abhaToken = JSON.parse(data.res).token;
                                    $scope.abhaUserToken = abhaToken;
                                    $rootScope.showTimer = false;
                                    $interval.cancel($rootScope.timerPromise)
                                    $rootScope.keyboardHide();
                                    //ABHA Care Context M2 integration starts here
                                    if ($rootScope.shareCareContextEnable) {
                                        $scope.abhaVerifyReg.abhaOTPSection = false;
                                        $scope.abhaVerifyReg.storeCareContextRefNumToAbha();
                                    } else {
                                        $scope.abhaVerifyReg.getProfileDetails($scope.abhaUserToken);
                                        /*if ($scope.abhaLinkFetchCard == '') {
                                            $scope.abhaVerifyReg.abhaOTPSection = false;
                                            $scope.abhaVerifyReg.abhaAccountProcess = true;
                                        }*/
                                    }
                                    // ABHA Care Context M2 integration ends here 
                                    // $scope.abhaVerifyReg.getProfileDetails($scope.abhaUserToken);
                                    // if($scope.abhaLinkFetchCard == ''){
                                    //     $scope.abhaVerifyReg.abhaOTPSection = false;
                                    //     $scope.abhaVerifyReg.abhaAccountProcess = true;
                                    // }
                                } else {
                                    $('.abha_otp_no_not_exist').css('display', 'block');
                                    $timeout(function () {
                                        $('.abha_otp_no_not_exist').css('display', 'none');
                                    }, 3000);
                                    $('.otp_validation_loader').css('display', 'none');
                                    $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                                }
                            } else {
                                $('.otp_srv_err').css('display', 'block');
                                $timeout(function () {
                                    $('.otp_srv_err').css('display', 'none');
                                }, 3000);
                                $('.otp_validation_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                            }
                        } else {
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function () {
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                        }
                    }, function (err) {
                        $('.otp_srv_err').css('display', 'block');
                        $timeout(function () {
                            $('.otp_srv_err').css('display', 'none');
                        }, 3000);
                        $('.otp_validation_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                    });
                } else if ($scope.abhaAuthMode == 'AADHAAR_OTP' || $scope.abhaLinkFetchCard == 'AADHAAR_OTP') {
                    let data = {
                        method: 'confirmAuthAadharOtpVerify',
                        data: {
                            "otp": $scope.abhaOTP,
                            "txnId": $scope.abhaTxnId
                        }
                    };

                    HigiApiService.getABHASession(data, function (res) {
                        var data = JSON.parse(res);
                        console.log({
                            'resp': data.res,
                            'url': data.url,
                            'body': data.body,
                            'status': data.code
                         });

                        if (data.status == 'S') {
                            if (JSON.parse(data.res).token) {
                                $scope.abhaVerifyReg.fields[2].text = '';
                                $('.otp_validation_loader').css('display', 'none');
                                let abhaToken = JSON.parse(data.res).token;
                                $rootScope.showTimer = false;
                                $interval.cancel($rootScope.timerPromise)
                                $scope.abhaUserToken = abhaToken;
                                $rootScope.keyboardHide();
                                if ($rootScope.shareCareContextEnable) {
                                    $scope.abhaVerifyReg.abhaOTPSection = false;
                                    $scope.abhaVerifyReg.storeCareContextRefNumToAbha();
                                } else {
                                $scope.abhaVerifyReg.getProfileDetails($scope.abhaUserToken);
                                /*if ($scope.abhaLinkFetchCard == '') {
                                    $scope.abhaVerifyReg.abhaOTPSection = false;
                                    $scope.abhaVerifyReg.abhaAccountProcess = true;
                                }*/
                                }
                            } else {
                                $('.abha_otp_no_not_exist').css('display', 'block');
                                $timeout(function () {
                                    $('.abha_otp_no_not_exist').css('display', 'none');
                                }, 3000);
                                $('.otp_validation_loader').css('display', 'none');
                                $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                            }
                        } else {
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function () {
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                        }
                    }, function (err) {
                        $('.otp_srv_err').css('display', 'block');
                        $timeout(function () {
                            $('.otp_srv_err').css('display', 'none');
                        }, 3000);
                        $('.otp_validation_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                    });
                }

            }

            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirm = function (item) {
                let JSONData = {
                    "requestId": item,
                    "mode": 'on-confirm'
                }
                let abhaCallBackCount = 0;
                let abhaCallBackMaxCount = 5;

                //let abhaCallBack = setInterval(function() {
                $('.otp_validation_loader').css('display', 'block');
                HigiApiService.fetchDatafromAbhaRes(JSONData, function (res) {
                    $scope.abhaVerifyReg.initiateFireStore(JSONData['requestId'], 'fetchAbhaDataAsOnConfirm');
                    // if($rootScope.shareCareContextEnable){
                    //     $scope.abhaVerifyReg.storeCareContextRefNumToAbha(); 
                    // }
                    /*
                    //ABHA Care Context starts here
                    if($rootScope.shareCareContextEnable){
                        $scope.abhaVerifyReg.storeCareContextRefNumToAbha(); 
                    }
                    //ABHA Care Context ends here
                    abhaCallBackCount++;
                    console.log(res);
                    if(res.status) {
                        clearInterval(abhaCallBack);
                        abhaCallBackCount = 0;
                        $scope.abhaUserFetchDetails = JSON.parse(res.status.body.replaceAll('&quot;','"')).auth;
                        console.log($scope.abhaUserFetchDetails);
                        if($scope.abhaUserFetchDetails != null){
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.abhaUserToken = $scope.abhaUserFetchDetails.accessToken;
                            if(!$rootScope.shareCareContextNotLinked){
                                $scope.abhaVerifyReg.abhaOTPSection = false;
                                $scope.abhaVerifyReg.abhaAccountProcess = true;
                                $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                                var patientDetails = $scope.abhaUserFetchDetails.patient;
                                $scope.ihlStorePayload = {
                                    ihl_user_id : $rootScope.UserInfo.id,
                                    user_email: '',
                                    user_mobile: patientDetails.identifiers != null ? patientDetails.identifiers[0].value : '',
                                    user_adhar: '',
                                    abha_number: patientDetails.identifiers != null ? patientDetails.identifiers[1].value.replace(/-/g, '') : '',
                                    abha_address: patientDetails.id,
                                    self:false,  // optional
                                    abha_card: '',
                                    abha_qr_code: ''
                                };
                                // $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserToken);
                                $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                            }else{
                                $scope.abhaVerifyReg.abhaOTPSection = false;
                                $rootScope.abhaVerifyShow = false;
                                $rootScope.abhaRegShow = false;
                                $rootScope.abhaCareContextModelInit();
                                $rootScope.loadModal({ id: 'abhaCareContext' });
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_otp_no_not_exist').css('display', 'block');
                            $timeout(function(){
                                $('.abha_otp_no_not_exist').css('display', 'none');
                            }, 3000);
                            $rootScope.keyboardShow();
                            $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                        }
                    } else {
                        if(abhaCallBackCount > abhaCallBackMaxCount || res.error_message!="invalid request id or URL endpoint"){                                                
                            clearInterval(abhaCallBack);
                            abhaCallBackCount = 0;
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_otp_no_not_exist').css('display', 'block');
                            $timeout(function(){
                                $('.abha_otp_no_not_exist').css('display', 'none');
                            }, 3000);
                            $rootScope.keyboardShow();
                            $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                        }
                    }*/

                }, function (err) {
                    // clearInterval(abhaCallBack);
                    // abhaCallBackCount = 0;
                    $('.otp_srv_err').css('display', 'block');
                    $timeout(function () {
                        $('.otp_srv_err').css('display', 'none');
                    }, 3000);
                    $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                });
                //}, 2000);
            }

            $scope.abhaVerifyReg.getProfileDetails = function (abhaToken) {
                let data = {
                    method: 'getProfileDetailsFromMobileToken',
                    data: abhaToken
                };

                HigiApiService.getABHASession(data, function (res) {
                    var data = JSON.parse(res);
                    console.log(JSON.parse(data.res));

                    if (data.status == 'S') {
                        if (JSON.parse(data.res).healthId || JSON.parse(data.res).healthIdNumber) {
                            $scope.abhaUserDetails = JSON.parse(data.res);
                            if ($scope.abhaLinkFetchCard == '') {
                                $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                            }
                            // $scope.abhaVerifyReg.abhaCardDetails = true;
                            
                            // $('.otp_validation_loader').css('display', 'none');
                            if(!$scope.abhaCardFetchOnly){
                                $scope.abhaVerifyReg.abhaOTPSection = false;
                                $rootScope.keyboardHide();
                                $scope.abhaVerifyReg.getAbhaCardDetails($scope.abhaUserDetails);
                                $scope.abhaVerifyReg.abhaAccountProcess = true;
                                $scope.abhaVerifyReg.patientDetailsShow = true;
                                setTimeout(function () {
                                    $scope.abhaVerifyReg.abhalinkscroll();
                                }, 1000);
                            }
                            $scope.fetchedVerifyAbhaToken = abhaToken;
                            $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserToken);
                            // $scope.abhaVerifyReg.abhaCardFetch(abhaToken);
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(() => {
                                $('.otp_srv_err').css('display', 'none');
                            });
                        }
                    } else {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.otp_srv_err').css('display', 'block');
                        $timeout(() => {
                            $('.otp_srv_err').css('display', 'none');
                        });
                        if ($scope.abhaLinkFetchCard == '') {
                            $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_fail';
                            $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_fail';
                            $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                            $scope.abhaVerifyReg.abhaLinkRetry = true;
                        }
                    }
                }, function (err) {
                    if ($scope.abhaLinkFetchCard == '') {
                        $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_fail';
                        $scope.abhaVerifyReg.abhaCardProgressState = 'abha_accCard_fail';
                        $scope.abhaVerifyReg.abhaIhlLinkProgressState = 'abha_ihlLink_fail';
                        $scope.abhaVerifyReg.abhaLinkRetry = true;
                    }
                    $('.otp_validation_loader').css('display', 'none');
                    $('.otp_srv_err').css('display', 'block');
                    $timeout(() => {
                        $('.otp_srv_err').css('display', 'none');
                    });
                });
            }

            $scope.abhaVerifyReg.passwordLengthCheck = function (field) {
                var str = field.text;
                $scope.passValid = str;
                if (Boolean(str.match(/\d/))) {
                    $('.abha_modal_new_password_hint_Num').css({ "color": 'green' });
                } else {
                    $('.abha_modal_new_password_hint_Num').css({ "color": 'red' });
                }
                if (Boolean(str.match(/[A-Z]/))) {
                    $('.abha_modal_new_password_hint_Cap').css({ "color": 'green' });
                } else {
                    $('.abha_modal_new_password_hint_Cap').css({ "color": 'red' });
                }
                if (str.length >= 8) {
                    $('.abha_modal_new_password_hint_Min').css({ "color": 'green' });
                } else {
                    $('.abha_modal_new_password_hint_Min').css({ "color": 'red' });
                }
                if (Boolean(str.match(/[@#$&%!~]/))) {
                    $('.abha_modal_new_password_hint_Sym').css({ "color": 'green' });
                } else {
                    $('.abha_modal_new_password_hint_Sym').css({ "color": 'red' });
                }
                if (str.length == 0) {
                    $('.abha_modal_new_password_hint_consecutiveNum').css({ "color": 'red' });
                } else {
                    if ($scope.checkForConsecutiveNum(str)) {
                        $('.abha_modal_new_password_hint_consecutiveNum').css({ "color": 'red' });
                    } else {
                        $('.abha_modal_new_password_hint_consecutiveNum').css({ "color": 'green' });
                    }
                }
                /*$scope.acceptPass makes password match appears even two confirmpassword input field has same characters 
                comments starts here
                if(Boolean(str.match(/[a-z]/)) && Boolean(str.match(/\d/)) && Boolean(str.match(/[A-Z]/)) && str.length >= 8 && Boolean(str.match(/[@#$&%!~]/)) && !$scope.checkForConsecutiveNum(str)){
                    $scope.acceptPass = true;
                    $('.abha_modal_new_password_hint').css({"color" : 'green'});
                }else{
                    $scope.acceptPass = false;
                    $('.abha_modal_new_password_hint').css({"color" : 'red'});
                }
                comment ends here
                */
                $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = '';
            };

            $scope.checkForConsecutiveNum = function (string) {
                var digits = string.replace(/\D/g, '');

                // If there are no digits in the string, return false
                if (digits.length === 0) {
                    return false;
                }

                var sortedDigits = [...digits].sort().join('');

                let prevDigit = parseInt(sortedDigits[0]);
                for (let i = 1; i < sortedDigits.length; i++) {
                    var currentDigit = parseInt(sortedDigits[i]);
                    if (currentDigit !== prevDigit + 1) {
                        return false;
                    }
                    prevDigit = currentDigit;
                }

                return true;
            }

            $scope.abhaVerifyReg.passwordLengthCheck2 = function (field) {
                var str = field.text;
                /* Password mismatched red color error pops-up even though both field password are same issue code
                comment starts here
                if($scope.passValid === str && $scope.acceptPass){
                    $('#abha_confirm_password_text_match').css({'color' : 'green'});
                    document.getElementById('abha_confirm_password_text_match').innerText = 'Password Match';
                    $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = 'abha_password_next_active_btn';
                }else if($scope.passValid === str && !$scope.acceptPass){
                    $('#abha_confirm_password_text_match').css({'color' : 'red'});
                    document.getElementById('abha_confirm_password_text_match').innerText = "Password Invalid";
                    $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = '';
                }else{
                    $('#abha_confirm_password_text_match').css({'color' : 'red'});
                    document.getElementById('abha_confirm_password_text_match').innerText = "Password don't Match";
                    $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = '';
                }
                comment ends here
                */
                if ($scope.passValid === str) {
                    $('#abha_confirm_password_text_match').css({ 'color': 'green' });
                    document.getElementById('abha_confirm_password_text_match').innerText = 'Password Match';
                    $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = 'abha_password_next_active_btn';
                } else {
                    $('#abha_confirm_password_text_match').css({ 'color': 'red' });
                    document.getElementById('abha_confirm_password_text_match').innerText = "Password don't Match";
                    $scope.abhaVerifyReg.abhaCreateSubmitButtonClass = '';
                }
            };

            $scope.abhaVerifyReg.abhaCreateSubmitBtn = function () {
                console.log("create ABHA");
                $scope.abhaVerifyReg.abhaAccountCreate();
            }

            $scope.abhaVerifyReg.closeAbha = function () {
                // $(".abha_demo_auth_mode_end_loader").css('display','block');
                if ($scope.abhaAddress != '') {
                    $scope.abhaAddress = $scope.abhaAddress;
                } else {
                    $scope.abhaAddress = $scope.abhanumber;
                }
                if (!$rootScope.shareCareContextEnable) {
                    $scope.abhaCardFetchOnly = true;
                    if ($scope.abhaLinkFetchCard == 'MOBILE_OTP') {
                        let data = {
                            method: 'initMobileOtpVerify',
                            data: {
                                "authMethod": $scope.abhaLinkFetchCard,
                                "healthid": $scope.abhaAddress
                            }
                        };
                        $(".abha_demo_auth_mode_end_loader").css('display', 'block');
                        $scope.abhaVerifyReg.initOTPMobile(data);
                    } else if ($scope.abhaLinkFetchCard == 'AADHAAR_OTP') {
                        let data = {
                            method: 'initMobileOtpVerify',
                            data: {
                                "authMethod": $scope.abhaLinkFetchCard,
                                "healthid": $scope.abhaAddress
                            }
                        };
                        $(".abha_demo_auth_mode_end_loader").css('display', 'block');
                        $scope.abhaVerifyReg.initOTPAadhar(data);
                    } else {
                        $rootScope.abha_payment_reason_for_visit = true;
                        $rootScope.abhaCloseCheckPaymentFlow();
                    }
                } else {
                    $rootScope.abhaAddressFetched = $scope.abhaAddress;
                    $scope.abhaVerifyReg.abhaAccountProcess = false;
                    $rootScope.abhaVerifyShow = false;
                    $rootScope.abhaRegShow = false;
                    $rootScope.abhaCareContextModelInit();
                    $rootScope.loadModal({ id: 'abhaCareContext' });
                }
            }

            // DOB flow start

            $scope.dayInputFieldCheck = function () {
                /*if ($scope.abhaVerifyReg.fields[11].text == '' || isNaN($scope.abhaVerifyReg.fields[11].text)) {
                    $scope.abhaVerifyReg.fields[11].text = '01';
                }*/
                var day = $scope.abhaVerifyReg.fields[11].text;
                var int_of_day = parseInt(day, 10);
                if (isNaN(int_of_day) || int_of_day > 31 || int_of_day.toString().length > 2) {
                    $scope.ShowInvalidDob = true;
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                }
                if ($scope.abhaVerifyReg.fields[12].text != '') {
                    $scope.ShowInvalidDob = false;
                    let resSuccess = $scope.monthArr.find(x => x.Month === $scope.abhaVerifyReg.fields[12].text);
                    $scope.totalDays = resSuccess['Days'];
                } else if (day.length == 2 && !isNaN(day) && day <= $scope.totalDays) {
                    $scope.ShowInvalidDob = false;
                    $rootScope.focusField($scope.abhaVerifyReg.fields[12]);
                } else if (day.length == 2 && !isNaN(day) && day > $scope.totalDays) {
                    $scope.ShowInvalidDob = true;
                    var monthObject = $scope.monthArr.find(function (month) {
                        return month.Month === $scope.abhaVerifyReg.fields[12].text;
                    })
                } else if (isNaN(day)) {
                    $scope.ShowInvalidDob = true;
                    var monthObject = $scope.monthArr.find(function (month) {
                        return month.Month === $scope.abhaVerifyReg.fields[12].text;
                    })
                } else if (day == '') {
                    $scope.ShowInvalidDob = true;
                    var monthObject = $scope.monthArr.find(function (month) {
                        return month.Month === $scope.abhaVerifyReg.fields[12].text;
                    })
                }

                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.monthInputFieldCheck = function () {
                /*if ($scope.abhaVerifyReg.fields[12].text == '' || isNaN($scope.abhaVerifyReg.fields[12].text)) {
                    $scope.abhaVerifyReg.fields[12].text = '01';
                }*/
                var month = $scope.abhaVerifyReg.fields[12].text;
                if (month.length == 2 && !isNaN(month) && month <= 12) {
                    $scope.ShowInvalidDob = false;
                    $rootScope.focusField($scope.abhaVerifyReg.fields[13]);
                    $scope.calculateTotalDays(month);
                } else if (month.length == 2 && !isNaN(month) && month > 12) {
                    $scope.ShowInvalidDob = true;
                } else if (isNaN(month)) {
                    $scope.ShowInvalidDob = true;
                } else if (month == '') {
                    $scope.ShowInvalidDob = true;
                }

                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.yearInputFieldCheck = function () {
                /*if ($scope.abhaVerifyReg.fields[13].text == '' || isNaN($scope.abhaVerifyReg.fields[13].text)) {
                    $scope.abhaVerifyReg.fields[13].text = '1903';
                }*/
                var year = $scope.abhaVerifyReg.fields[13].text;
                if (year.length == 4 && !isNaN(year) && year >= $scope.previousYear && year <= $scope.currentYear) {
                    $scope.ShowInvalidDob = false;
                    if ($scope.checkLeapYear($scope.abhaVerifyReg.fields[13].text)) {
                        $scope.calculateTotalDays('02L');
                    }
                } else if (year.length == 4 && !isNaN(year) && (year > $scope.currentYear || year < $scope.previousYear)) {
                    $scope.ShowInvalidDob = true;
                    // $scope.abhaVerifyReg.fields[13].text = 1903
                } else if (isNaN(year)) {
                    $scope.ShowInvalidDob = true;
                    // $scope.abhaVerifyReg.fields[13].text = 1903
                } else if (year == '') {
                    $scope.ShowInvalidDob = true;
                    // $scope.abhaVerifyReg.fields[13].text = 1903
                }

                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.upArrowBtnClick = function (actionFrom) {
                switch (actionFrom) {
                    case 'D':
                        $scope.dayIncreaseDecrease('UP');
                        break;
                    case 'M':
                        $scope.monthIncreaseDecrease('UP');
                        break;
                    case 'Y':
                        $scope.yearIncreaseDecrease('UP');
                        break;
                    default:
                        break;
                }
            }

            $scope.downArrowBtnClick = function (actionFrom) {
                switch (actionFrom) {
                    case 'D':
                        $scope.dayIncreaseDecrease('DOWN');
                        break;
                    case 'M':
                        $scope.monthIncreaseDecrease('DOWN');
                        break;
                    case 'Y':
                        $scope.yearIncreaseDecrease('DOWN');
                        break;
                    default:
                        break;
                }
            }

            $scope.dayIncreaseDecrease = function (action) {
                if (action == 'UP') {
                    if ($scope.abhaVerifyReg.fields[11].text != '' && !isNaN($scope.abhaVerifyReg.fields[11].text)) {
                        console.log($scope.abhaVerifyReg.fields[11].text);
                        let increaseVal = 0;
                        increaseVal = parseInt($scope.abhaVerifyReg.fields[11].text) + 1;

                        if (increaseVal > $scope.totalDays)
                            return 0;

                        if (increaseVal < 10)
                            $scope.abhaVerifyReg.fields[11].text = '0' + increaseVal.toString();
                        else
                            $scope.abhaVerifyReg.fields[11].text = increaseVal.toString();
                    } else if ($scope.abhaVerifyReg.fields[11].text == '' || isNaN($scope.abhaVerifyReg.fields[11].text)) {
                        $scope.abhaVerifyReg.fields[11].text = '01';
                    }

                } else {
                    if ($scope.abhaVerifyReg.fields[11].text != '' && !isNaN($scope.abhaVerifyReg.fields[11].text)) {
                        let decreaseVal = 0;
                        decreaseVal = parseInt($scope.abhaVerifyReg.fields[11].text) - 1;

                        if (decreaseVal < 1)
                            return 0;

                        if (decreaseVal < 10)
                            $scope.abhaVerifyReg.fields[11].text = '0' + decreaseVal.toString();
                        else
                            $scope.abhaVerifyReg.fields[11].text = decreaseVal.toString();
                    } else if (isNaN($scope.abhaVerifyReg.fields[11].text)) {
                        $scope.abhaVerifyReg.fields[11].text = '01';
                    }
                }

                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.monthIncreaseDecrease = function (action) {
                if (action == 'UP') {
                    if ($scope.abhaVerifyReg.fields[12].text != '' && !isNaN($scope.abhaVerifyReg.fields[12].text)) {
                        console.log($scope.abhaVerifyReg.fields[12].text);
                        let increaseVal = 0;
                        increaseVal = parseInt($scope.abhaVerifyReg.fields[12].text) + 1;

                        if (increaseVal > 12)
                            return 0;

                        if (increaseVal < 10)
                            $scope.abhaVerifyReg.fields[12].text = '0' + increaseVal.toString();
                        else
                            $scope.abhaVerifyReg.fields[12].text = increaseVal.toString();

                        if ($scope.abhaVerifyReg.fields[12].text == '02' && $scope.abhaVerifyReg.fields[13].text != '' && $scope.checkLeapYear($scope.abhaVerifyReg.fields[13].text))
                            $scope.calculateTotalDays('02L');
                        else
                            $scope.calculateTotalDays($scope.abhaVerifyReg.fields[12].text);
                    } else if ($scope.abhaVerifyReg.fields[12].text == '' || isNaN($scope.abhaVerifyReg.fields[12].text)) {
                        $scope.abhaVerifyReg.fields[12].text = '01';
                    }
                } else {
                    if ($scope.abhaVerifyReg.fields[12].text != '' && !isNaN($scope.abhaVerifyReg.fields[12].text)) {
                        let decreaseVal = 0;
                        decreaseVal = parseInt($scope.abhaVerifyReg.fields[12].text) - 1;

                        if (decreaseVal < 1)
                            return 0;

                        if (decreaseVal < 10)
                            $scope.abhaVerifyReg.fields[12].text = '0' + decreaseVal.toString();
                        else
                            $scope.abhaVerifyReg.fields[12].text = decreaseVal.toString();
                        if ($scope.abhaVerifyReg.fields[12].text == '02' && $scope.abhaVerifyReg.fields[13].text != '' && $scope.checkLeapYear($scope.abhaVerifyReg.fields[13].text))
                            $scope.calculateTotalDays('02L');
                        else
                            $scope.calculateTotalDays($scope.abhaVerifyReg.fields[12].text);
                    } else if (isNaN($scope.abhaVerifyReg.fields[12].text)) {
                        $scope.abhaVerifyReg.fields[12].text = '01';
                    }
                }

                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.yearIncreaseDecrease = function (action) {
                if (action == 'UP') {
                    if ($scope.abhaVerifyReg.fields[13].text != '' && !isNaN($scope.abhaVerifyReg.fields[13].text)) {
                        console.log($scope.abhaVerifyReg.fields[13].text);
                        let increaseVal = 0;
                        increaseVal = parseInt($scope.abhaVerifyReg.fields[13].text) + 1;

                        if (increaseVal > $scope.currentYear)
                            return 0;

                        $scope.abhaVerifyReg.fields[13].text = increaseVal.toString();
                        if ($scope.abhaVerifyReg.fields[12].text == '02' && $scope.checkLeapYear($scope.abhaVerifyReg.fields[13].text))
                            $scope.calculateTotalDays('02L');
                        else
                            $scope.calculateTotalDays($scope.abhaVerifyReg.fields[12].text);
                    } else if ($scope.abhaVerifyReg.fields[13].text == '' || isNaN($scope.abhaVerifyReg.fields[13].text)) {
                        $scope.abhaVerifyReg.fields[13].text = $scope.previousYear;
                    }
                } else {
                    if ($scope.abhaVerifyReg.fields[13].text != '' && !isNaN($scope.abhaVerifyReg.fields[13].text)) {
                        let decreaseVal = 0;
                        decreaseVal = parseInt($scope.abhaVerifyReg.fields[13].text) - 1;

                        if (decreaseVal < 1)
                            return 0;

                        $scope.abhaVerifyReg.fields[13].text = decreaseVal.toString();
                        if ($scope.abhaVerifyReg.fields[12].text == '02' && $scope.checkLeapYear($scope.abhaVerifyReg.fields[13].text))
                            $scope.calculateTotalDays('02L');
                        else
                            $scope.calculateTotalDays($scope.abhaVerifyReg.fields[12].text);
                    } else if (isNaN($scope.abhaVerifyReg.fields[13].text)) {
                        $scope.abhaVerifyReg.fields[13].text = $scope.previousYear;
                    }
                }


                if ($scope.abhaName.length == 0 || ($scope.abhaVerifyReg.fields[11].text == "" || $scope.abhaVerifyReg.fields[11].text == undefined) || ($scope.abhaVerifyReg.fields[12].text == "" || $scope.abhaVerifyReg.fields[12].text == undefined) || ($scope.abhaVerifyReg.fields[13].text == "" || $scope.abhaVerifyReg.fields[13].text == undefined) || $scope.abhaGender == "") {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                } else {
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                }
            }

            $scope.checkLeapYear = function (year) {
                return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
            }

            $scope.calculateTotalDays = function (month) {
                let res = $scope.monthArr.find(x => x.Month === month);
                $scope.totalDays = res['Days'];

                if ($scope.abhaVerifyReg.fields[11].text > $scope.totalDays)
                    $scope.abhaVerifyReg.fields[11].text = $scope.totalDays;
            }

            // DOB flow End

            /* FIRESTORE FUNCTIONALITY START */
            $scope.abhaVerifyReg.initiateFireStore = function (requestId, method) {
                let currentMethod;
                let currentRequestId;

                currentRequestId = requestId;
                currentMethod = method;
                console.log(requestId);
                $scope.requestIdSent = requestId;
                console.log(method);

                const db = firebase.firestore();
                docRef = db.collection("abhacallbackstatus").doc(currentRequestId);

                $timeout(() => {
                    if (currentMethod == 'abhaCareContextShareBtn' && !$scope.docUpdated){
                        $rootScope.abhaCareContextModelInit();
                        $rootScope.loadModal({ id: 'abhaCareContext' });
                        $rootScope.snackBarAlertText = 'Something went wrong... Please try again.'
                        let snackbar = document.getElementById('snackbar');
                        snackbar.className = 'show';
                        $timeout(() => {
                            snackbar.className = 'hide';
                        }, 3000);
                        return;
                    } else if(currentMethod == 'fetchModesForAbha' && !$scope.docUpdated){
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $(".abha_demo_auth_mode_end_loader").css('display', 'none');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $('.abha_auth_mode_end_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    }
                }, 60000*3);

                docRef.onSnapshot((docSnapshot) => {
                    if (docSnapshot.exists) {
                        $scope.docUpdated = true;
                        console.log("Document updated:", docSnapshot.data());
                        if (docSnapshot.data().body.includes("Please wait for 30 seconds before sending another OTP request.")) {
                            $('.otp_validation_loader').css('display', 'none');
                            $scope.newMobileNumAddAbha = true;
                            $scope.wait_for_minutes = true;
                        } else {
                            $scope.newMobileNumAddAbha = false;
                            $scope.wait_for_minutes = false;
                        }
                        const res = docSnapshot.data();
                        if (currentMethod == 'fetchModesForAbha') {
                            $scope.abhaVerifyReg.fetchModesForAbhaHandle(res);
                        } else if (currentMethod == 'abhaCareContextShareBtn') {
                            $scope.abhaVerifyReg.abhaCareContextHandle(res);
                        } else if (currentMethod == 'openTab') {
                            $scope.abhaVerifyReg.openTabHandle(res);
                        } else if (currentMethod == 'submitAbhaDemoDetails') {
                            $scope.abhaVerifyReg.submitAbhaDemoDetailsHandle(res);
                        } else if (currentMethod == 'fetchAbhaDataAsOnConfirm') {
                            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirmHandle(res);
                        } else if (currentMethod == 'share') {
                            $scope.abhaVerifyReg.fetchAbhaDataAsOnShare(res);
                        }
                    } else {
                        console.log("Document deleted");
                    }
                });
                /*fireStore.getAll('/abhacallbackstatus').onSnapshot(snapshot => {
                    
                    snapshot.docs.forEach(doc => {
                        const res = doc.data();
                        if (currentMethod == 'fetchModesForAbha' && res['requestId'] == currentRequestId)
                            $scope.abhaVerifyReg.fetchModesForAbhaHandle(res);
                        else if (currentMethod == 'abhaCareContextShareBtn' && res['requestId'] == currentRequestId)
                            $scope.abhaVerifyReg.abhaCareContextHandle(res);
                        else if (currentMethod == 'openTab' && res['requestId'] == currentRequestId)
                            $scope.abhaVerifyReg.openTabHandle(res);
                        else if (currentMethod == 'submitAbhaDemoDetails' && res['requestId'] == currentRequestId)
                            $scope.abhaVerifyReg.submitAbhaDemoDetailsHandle(res);
                        else if (currentMethod == 'fetchAbhaDataAsOnConfirm' && res['requestId'] == currentRequestId)
                            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirmHandle(res);
                    });
                });*/
            }

            $scope.abhaVerifyReg.fetchModesForAbhaHandle = function (res) {
                console.log(res)
                if (res.error_message == undefined) {
                    $('.otp_validation_loader').css('display', 'none');
                    $scope.fetchAuthVerifyRes = JSON.parse(res.body.replaceAll('&quot;', '"'));
                    if ($scope.fetchAuthVerifyRes['error'] == undefined) {
                        $scope.abhaVerifyReg.abhaAuthModeFetched = $scope.fetchAuthVerifyRes.auth.modes;
                        $scope.fetchAuthPorpose = $scope.fetchAuthVerifyRes.auth.purpose;
                        console.log($scope.abhaVerifyReg.abhaAuthModeFetched);
                        if ($scope.abhaVerifyReg.abhaAuthModeFetched.length > 0) {
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaChooseAuthMode = true;
                            $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                            $rootScope.keyboardHide();
                        } else {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function () {
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                        /*if ($scope.abhaVerifyReg.abhaAuthModeFetched.includes("DEMOGRAPHICS")) {
                            //fireStore.delete(res.requestId);
                            if(docRef) {
                              docRef.onSnapshot(() => {}); // Detach the listener
                            }  
                            $scope.openTab('DEMOGRAPHICS');
                        }*/
                    } else {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    }
                } else {
                    if (res.error_message != "invalid request id or URL endpoint") {
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function () {
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    }
                }
            }

            $scope.abhaVerifyReg.abhaCareContextHandle = function (res) {
                // console.log(res);

                if (res.error_message == undefined) {
                    let response = JSON.parse(res.body.replaceAll('&quot;', '"')).auth;
                    console.log(response);
                    if (response != null && response != undefined) {
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.loadingImg = false;
                        $rootScope.CareConFetchedAuth = response;
                        $rootScope.shareCareContextNotLinked = true;
                        $scope.abhaVerifyReg.abhaCareContextShare = false;
                        $scope.abhaVerifyReg.checkinAbhaEnable = false;
                        $rootScope.abhaVerifyShow = true;
                        $rootScope.abhaRegShow = false;
                        $scope.abhaAuthMode = 'DONT_KNOW';
                        $scope.abhaAddress = $rootScope.abhaAddressFetched;
                        $scope.abhaVerifyReg.abhaAuthModeFetched = $rootScope.CareConFetchedAuth.modes;
                        $scope.fetchAuthPorpose = $rootScope.CareConFetchedAuth.purpose;
                        $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                        $scope.abhaVerifyReg.abhaChooseAuthMode = true;
                        $scope.abhaVerifyReg.abhaOTPSection = false;
                        $rootScope.keyboardHide();
                    }
                }
            }

            $scope.abhaVerifyReg.openTabHandle = function (res) {
                // alert('openTabHandle');
                $scope.initAuthVerifyRes = JSON.parse(res.body.replaceAll('&quot;', '"')).auth;
                console.log($scope.selectedAuth);
                if ($scope.initAuthVerifyRes != null) {
                    if ($scope.initAuthVerifyRes.mode == 'DEMOGRAPHICS') {
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                        $scope.abhaVerifyReg.abhaDemographicForm = true;
                        $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                        $scope.abhaVerifyReg.abhaOTPSection = false;
                        if ($scope.abhaVerifyReg.fields[0].text.length <= 3 ||
                            HigiKioskStorageService.returnSessionData('gender') == undefined ||
                            HigiKioskStorageService.returnSessionData('birthdate') == undefined) {
                            $scope.abhaVerifyReg.abhaDemographicFormSubmit = "";
                        }
                        $rootScope.keyboardShow();
                    } else if ($scope.initAuthVerifyRes.mode == 'MOBILE_OTP') {
                        $scope.otpSectionTitle = 'Mobile OTP';
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                        $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                        $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                        $scope.abhaVerifyReg.abhaOTPSection = true;
                        $rootScope.showTimer = true;
                        $scope.abhaVerifyReg.startTimer();
                        $scope.newMobileNumAddAbha = true;
                        setTimeout(function () {
                            $scope.newMobileNumAddAbha = false;
                        }, 60000);
                        if ($scope.resendOTPEnable == true) {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.otp_resend').css('display', 'block');
                            setTimeout(function () {
                                $(".otp_resend").css('display', 'none');
                            }, 3000);
                        }
                        $rootScope.keyboardShow();
                        $scope.abhaAuthMode == 'MOBILE_OTP';
                    } else if ($scope.initAuthVerifyRes.mode == 'AADHAAR_OTP') {
                        $scope.otpSectionTitle = 'Aadhar OTP';
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $rootScope.focusField($scope.abhaVerifyReg.fields[2]);
                        $scope.abhaVerifyReg.abhaDropSelectAuthMode = false;
                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                        $scope.abhaVerifyReg.abhaChooseAuthMode = false;
                        $scope.abhaVerifyReg.abhaOTPSection = true;
                        $rootScope.showTimer = true;
                        $scope.abhaVerifyReg.startTimer();
                        $scope.newMobileNumAddAbha = true;
                        setTimeout(function () {
                            $scope.newMobileNumAddAbha = false;
                        }, 60000);
                        if ($scope.resendOTPEnable == true) {
                            $('.otp_validation_loader').css('display', 'none');
                            $('.otp_resend').css('display', 'block');
                            setTimeout(function () {
                                $(".otp_resend").css('display', 'none');
                            }, 3000);
                        }
                        $rootScope.keyboardShow();
                    }
                } else {
                    if (res.error_message != "invalid request id or URL endpoint") {
                        $scope.selectedAuth = '';
                        $(".abha_tab_server_error").css('display', 'block');
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $timeout(function () {
                            $(".abha_tab_server_error").css('display', 'none');
                        }, 2000);
                    }
                }
            }

            $scope.abhaVerifyReg.submitAbhaDemoDetailsHandle = function (res) {
                $scope.abhaUserFetchDetails = JSON.parse(res.body.replaceAll('&quot;', '"')).auth;
                console.log($scope.abhaUserFetchDetails);
                if ($scope.abhaUserFetchDetails != null) {
                    if (!$rootScope.shareCareContextEnable) {
                        $rootScope.keyboardHide();
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                        $scope.abhaVerifyReg.abhaAccountProcess = true;
                        $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                        var patientDetails = $scope.abhaUserFetchDetails.patient;
                        if ($scope.abhaAddress.includes('@')) {
                            $scope.abhaAddress = $scope.abhaAddress;
                            $scope.abhanumber = '';
                        }
                        else {
                            $scope.abhanumber = $scope.abhaAddress;
                            $scope.abhaAddress = '';
                        }
                        console.log($scope.abhanumber)
                        console.log($scope.abhaAddress)
                        $scope.ihlStorePayload = {
                            ihl_user_id: $rootScope.UserInfo.id,
                            user_email: '',
                            user_mobile: patientDetails.identifiers != null ? patientDetails.identifiers[0].value : '',
                            user_adhar: '',
                            abha_number: patientDetails.identifiers != null ? patientDetails.identifiers[1].value.replace(/-/g, '') : $scope.abhanumber,
                            abha_address: patientDetails.id != null ? patientDetails.id : $scope.abhaAddress,
                            dob: $scope.formatedDOB,
                            gender: $scope.abhaGender,
                            abha_card: '',
                            abha_qr_code: ''
                        };
                        console.log($scope.ihlStorePayload);
                        $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                    } else {
                        // $scope.abhaVerifyReg.getAbhaCardDetails()
                        // $scope.abhaVerifyReg.abhaCardDetails = true;
                        $rootScope.keyboardHide();
                        $scope.abhaVerifyReg.abhaDemographicForm = false;
                        $scope.loadingImg = true;
                        $scope.abhaVerifyReg.storeCareContextRefNumToAbha();
                    }
                } else {
                    $('.abha_auth_mode_loader').css('display', 'none');
                    $scope.abhaVerifyReg.abhaDemographicFormSubmit = 'checkin_abhaDemo_submit_active_btn';
                    $('.abha_demo_cred_error').css('display', 'block');
                    $timeout(function () {
                        $('.abha_demo_cred_error').css('display', 'none');
                    }, 3000);
                }
            }
            $scope.abhaVerifyReg.fetchAbhaDataAsOnShare = function (res) {
                $scope.abhaUserFetchDetails = JSON.parse(res.body.replaceAll('&quot;', '"')).profile.patient;
                var patientDetails = $scope.abhaUserFetchDetails;
                if ((patientDetails.healthId != null) && patientDetails.healthIdNumber != null) {
                    $scope.abhaVerifyReg.abhaQRsection = false;
                    $scope.abhaVerifyReg.abhaOTPSection = false;
                    $scope.abhaVerifyReg.abhaAccountProcess = true;
                    if(!$scope.qrCodeVerify){
                        setTimeout(function () {
                            $scope.abhaVerifyReg.abhalinkscroll();
                        }, 1000);
                    }else{
                        $scope.abhaVerifyReg.authLinkDropDown = true;
                    }                 
                    $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                    let patientMobile = "";
                    if (patientDetails.identifiers != null && patientDetails.identifiers.length > 0) {
                        if (patientDetails.identifiers[0] != undefined) {
                            patientMobile = patientDetails.identifiers[0].value;
                        }
                    }
                    $scope.ihlStorePayload = {
                        ihl_user_id: $rootScope.UserInfo.id,
                        user_email: '',
                        user_mobile: patientMobile,
                        user_adhar: '',
                        abha_number: patientDetails.healthIdNumber.replace(/-/g, ''),
                        abha_address: patientDetails.id != null ? patientDetails.id : patientDetails.healthId,
                        self: false,  // optional
                        abha_card: '',
                        abha_qr_code: ''
                    };
                    $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                }
            }

            $scope.abhaVerifyReg.abhaIdSuggSelect = function (item) {
                console.log(item);
                $scope.abhaHealthId = item;
                $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
            }

            $scope.abhaVerifyReg.abhaHealthIdInputShow = function () {
                $scope.abhaHealthId = '';
                $scope.abhaVerifyReg.fields[8].text = '';
                $rootScope.focusField($scope.abhaVerifyReg.fields[8]);
                $scope.typeAbhaAddress = false;
                $rootScope.abhaAddressforkeyboard = true;
                $scope.abhaVerifyReg.healthIdNextButtonClass = '';

            }
            $rootScope.sendAbhaAddress= function(value){
                console.log(value)
                $scope.abhaVerifyReg.fields[8].text = value;
                console.log($scope.abhaVerifyReg.fields[8].text);
                $scope.abhaVerifyReg.healthIdValidation();
                $scope.slectedAbhaadress = false;
            }
            $scope.abhaVerifyReg.createAbhaPhrAddress = function () {
                let abhaCreatePhrAddress = {
                    method: 'createAbhaPhrAddress',
                    data: {
                        "phrAddress": $scope.abhaHealthId,
                        "transactionId": $scope.phrProfileTransId
                    }
                };
                HigiApiService.getABHASession(abhaCreatePhrAddress, function (response) {
                    var data = JSON.parse(response);
                    console.log(JSON.parse(data.res));
                    if (data.status == 'S') {
                        if (JSON.parse(data.res).token != undefined) {
                            $(".healthId_validation_loader").css('display', 'none');
                            $scope.abhaHealthId = JSON.parse(data.res).phrAdress;
                            $rootScope.keyboardHide();
                            $scope.abhaVerifyReg.healthIDSection = false;
                            $scope.abhaVerifyReg.abhaAccountProcess = true;
                            $scope.abhaVerifyReg.abhaCardFetch(JSON.parse(data.res).token);
                            $scope.abha_address_selected_loader = false;
                        } else {
                            $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                            $(".healthId_validation_loader").css('display', 'none');
                            $('.healthId_something_wrong').css('display', 'block');
                            setTimeout(function () {
                                $('.healthId_something_wrong').css('display', 'none');
                            }, 3000);
                        }
                    } else {
                        $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                        $(".healthId_validation_loader").css('display', 'none');
                        $('.healthId_something_wrong').css('display', 'block');
                        setTimeout(function () {
                            $('.healthId_something_wrong').css('display', 'none');
                        }, 3000);
                    }
                }, function (res) {
                    $scope.abhaVerifyReg.healthIdNextButtonClass = 'abha_health_id_active_btn';
                    $(".healthId_validation_loader").css('display', 'none');
                    $('.healthId_something_wrong').css('display', 'block');
                    setTimeout(function () {
                        $('.healthId_something_wrong').css('display', 'none');
                    }, 3000);
                });
            }

            $scope.abhaVerifyReg.fetchAbhaDataAsOnConfirmHandle = function (res) {
                $scope.abhaUserFetchDetails = JSON.parse(res.body.replaceAll('&quot;', '"')).auth;
                console.log($scope.abhaUserFetchDetails);
                if ($scope.abhaUserFetchDetails != null) {
                    // $('.otp_validation_loader').css('display', 'none');
                    $('.abha_auth_mode_loader').css('display', 'none');
                    $scope.abhaUserToken = $scope.abhaUserFetchDetails.accessToken;
                    if (!$rootScope.shareCareContextNotLinked) {
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $('.otp_validation_loader').css('display', 'none');
                        $scope.abhaVerifyReg.fields[2].text = '';
                        $rootScope.keyboardHide();
                        $scope.abhaVerifyReg.abhaOTPSection = false;
                        $scope.abhaVerifyReg.abhaAccountProcess = true;
                        $scope.abhaVerifyReg.authLinkDropDown = true;
                        $scope.abhaVerifyReg.abhaLinkProgressState = 'abha_accLink_done';
                        var patientDetails = $scope.abhaUserFetchDetails.patient;
                        $scope.ihlStorePayload = {
                            ihl_user_id: $rootScope.UserInfo.id,
                            user_email: '',
                            user_mobile: patientDetails.identifiers[0].value != null ? patientDetails.identifiers[0].value : '',
                            user_adhar: '',
                            abha_number: patientDetails.identifiers[1].value != null ? patientDetails.identifiers[1].value.replace(/-/g, '') : '',
                            abha_address: patientDetails.id,
                            dob: '',
                            gender: patientDetails.gender,
                            abha_card: '',
                            abha_qr_code: ''
                        };
                        // $scope.abhaVerifyReg.abhaCardFetch($scope.abhaUserToken);
                        $scope.abhaVerifyReg.storeAbhaDetailsInIHL($scope.ihlStorePayload);
                    } else {
                        $rootScope.abhaAddressFetched = $scope.abhaAddress;
                        $scope.abhaVerifyReg.abhaOTPSection = false;
                        $(".otp_validation_loader").css('display','none');
                        $rootScope.keyboardHide();

                        var fetchedPatientDetails = $scope.abhaUserFetchDetails.patient;
                        var patientDetails = {
                            healthIdNumber: fetchedPatientDetails.identifiers[1].value != null ? fetchedPatientDetails.identifiers[1].value.replace(/-/g, '') : '',
                            healthId: fetchedPatientDetails.id,
                            mobile: fetchedPatientDetails.identifiers[0].value != null ? fetchedPatientDetails.identifiers[0].value : '',
                            name: fetchedPatientDetails.name,
                            yearOfBirth: fetchedPatientDetails.yearOfBirth,
                            dayOfBirth: fetchedPatientDetails.dayOfBirth,
                            monthOfBirth: fetchedPatientDetails.monthOfBirth,
                            gender: fetchedPatientDetails.gender,
                            pincode: fetchedPatientDetails.address['pincode'],
                            address: fetchedPatientDetails.address['line'],
                            stateName: fetchedPatientDetails.address['state'],
                            districtName: fetchedPatientDetails.address['district']
                        }

                        // $scope.loadingImg = true;
                        // $scope.abhaVerifyReg.storeCareContextRefNumToAbha();

                        $scope.abhaVerifyReg.getAbhaCardDetails(patientDetails)
                        $scope.abhaVerifyReg.abhaCardDetails = true;
                        // $('.abha_auth_mode_loader').css('display', 'none');
                        // $scope.abhaVerifyReg.abhaOTPSection = false;
                        // $rootScope.abhaVerifyShow = false;
                        // $rootScope.abhaRegShow = false;
                        // $rootScope.abhaCareContextModelInit();
                        // $rootScope.loadModal({ id: 'abhaCareContext' });
                    }
                } else {
                    $('.abha_auth_mode_loader').css('display', 'none');
                    $('.otp_validation_loader').css('display', 'none');
                    $('.abha_otp_no_not_exist').css('display', 'block');
                    $timeout(function () {
                        $('.abha_otp_no_not_exist').css('display', 'none');
                    }, 3000);
                    $rootScope.keyboardShow();
                    $scope.abhaVerifyReg.abhaOtpSubmit = 'checkin_abhaOtp_submit_active_btn';
                }
            }

            /* FIRESTORE FUNCTIONALITY END */

            $scope.abhaVerifyReg.storeCareContextRefNumToAbha = function () {
                if ($rootScope.abhaCareContextShareVitalArrayList.length > 0) {
                    let careContextNumList = [];
                    $rootScope.abhaCareContextShareVitalArrayList.forEach(item => {
                        console.log(item);
                        if (item.carecontext_referrence_num != '') {
                            careContextNumList.push(item.carecontext_referrence_num);
                        }
                    });

                    let data = {
                        "patient_abha_address": $rootScope.abhaAddressFetched,
                        // "patient_abha_number": "91651031126857",
                        "carecontext_referrence_num": careContextNumList,
                        "confirm_request_id": $scope.requestIdSent,
                        "Hip_or_phr": "Value 1",
                        "flag_init": true,
                        "flag_confirm": true,
                        "hip_id": "HIP ID 1"
                    }

                    console.log(data);
                    HigiApiService.shareABHACareContext(data, function (resp) {
                        console.log(resp);
                        $scope.loadingImg = false;
                        $scope.abhaVerifyReg.abhaCarecontextDataShared = true;
                        if (resp.status != undefined) {
                            $rootScope.keyboardHide();
                            $scope.abhaVerifyReg.abhaCareContextShare = false;
                            $scope.abhaVerifyReg.checkinAbhaEnable = false;
                            $scope.abhaVerifyReg.abhaDemographicForm = false;
                            $scope.abhaVerifyReg.brigdeDataToABHASuccessInfo = true;

                            let currentTime = Date.now();
                            let data = {
                                "abha_hip_link_alert_last_date": currentTime.toString()
                            }

                            HigiApiService.updateIHLuserData($rootScope.UserInfo.id, $rootScope.UserToken, data, function (success) {
                                console.log(success);
                            }, function (failure) {
                                console.log(failure);
                            });
                        } else if (resp.error_message != undefined) {
                            $rootScope.keyboardHide();
                            $scope.abhaVerifyReg.abhaCareContextShare = false;
                            $scope.abhaVerifyReg.checkinAbhaEnable = false;
                            $scope.abhaVerifyReg.abhaDemographicForm = false;
                            $scope.abhaVerifyReg.brigdeDataToABHAFailureInfo = true;
                        }
                    })
                }
            }

            /* GET ABHA CARD DETAILS FUNCTIONALITY START */

            $scope.abhaVerifyReg.getAbhaCardDetails = function (abhaCardDetailsReponse) {
                console.log(abhaCardDetailsReponse)
                let genderObj = { 'M': 'Male', 'F': 'Female', 'T': 'Transgender' };
                /*let abhaCardDetailsReponse = {
                    'status': 'S',
                    'res': '{\"healthIdNumber\":\"91-3452-7645-6414\",\"healthId\":\"test7200577690@sbx\",\"mobile\":\"7200577690\",\"firstName\":\"Deepakraja\",\"middleName\":\"\",\"lastName\":\"Bhaskaran\",\"name\":\"Deepakraja Bhaskaran\",\"yearOfBirth\":\"1990\",\"dayOfBirth\":\"14\",\"monthOfBirth\":\"5\",\"gender\":\"M\",\"email\":\"r@yahoo.com\",\"stateCode\":\"33\",\"districtCode\":\"\",\"subDistrictCode\":null,\"villageCode\":null,\"townCode\":null,\"wardCode\":null,\"pincode\":\"600063\",\"address\":\"C/O Deepak Raja Bhaskaran S1, No 9, Aksha Apartment, Manimegalai Street, Srinivasa Nagar, Peerkankaranai, New Perungulattur PEERKANKARANAI\",\"kycPhoto\":null,\"stateName\":\"Tamil Nadu\",\"districtName\":\"Kancheepuram\",\"subdistrictName\":null,\"villageName\":null,\"townName\":\"PEERKANKARANAI\",\"wardName\":null,\"authMethods\":[\"AADHAAR_OTP\",\"DEMOGRAPHICS\",\"MOBILE_OTP\",\"AADHAAR_BIO\"],\"tags\":{},\"kycVerified\":true,\"verificationStatus\":null,\"verificationType\":null,\"clientId\":\"SBX_001197\",\"phrAddress\":[\"test7200577690@sbx\"],\"new\":false,\"emailVerified\":false}'
                }
                const abhaCardDetailsString = JSON.stringify(abhaCardDetailsReponse);
                const abhaCardDetailsObject = JSON.parse(abhaCardDetailsString);
                const abhaCardDetailsData = JSON.parse(abhaCardDetailsObject['res']);*/

                const abhaCardDetailsData = abhaCardDetailsReponse;

                $scope.abhaVerifyReg.abhaCardDetailsObj = {
                    'PatientName': '',
                    'Age': '',
                    'Gender': '',
                    'DOB': '',
                    'ABHANumber': '',
                    'ABHAAddress': '',
                    'MobileNumber': '',
                    'State': '',
                    'Address': '',
                    'City': '',
                    'Pincode': ''
                }

                console.log(abhaCardDetailsData);

                if (abhaCardDetailsData.hasOwnProperty('name'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['PatientName'] = abhaCardDetailsData['name'];

                if (abhaCardDetailsData.hasOwnProperty('gender')) {
                    if (genderObj.hasOwnProperty(abhaCardDetailsData['gender']))
                        $scope.abhaVerifyReg.abhaCardDetailsObj['Gender'] = genderObj[abhaCardDetailsData['gender']];
                    else
                        $scope.abhaVerifyReg.abhaCardDetailsObj['Gender'] = abhaCardDetailsData['gender'];
                }

                if (abhaCardDetailsData.hasOwnProperty('dayOfBirth') && abhaCardDetailsData.hasOwnProperty('monthOfBirth') && abhaCardDetailsData.hasOwnProperty('yearOfBirth'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['DOB'] = abhaCardDetailsData['dayOfBirth'] + '/' + abhaCardDetailsData['monthOfBirth'] + '/' + abhaCardDetailsData['yearOfBirth'];

                if ($scope.abhaVerifyReg.abhaCardDetailsObj['DOB'] != '') {
                    let dob = abhaCardDetailsData['yearOfBirth'] + '-' + abhaCardDetailsData['monthOfBirth'] + '-' + abhaCardDetailsData['dayOfBirth'];
                    $scope.abhaVerifyReg.abhaCardDetailsObj['Age'] = $scope.calculateAge(dob);
                }

                if (abhaCardDetailsData.hasOwnProperty('healthIdNumber'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['ABHANumber'] = abhaCardDetailsData['healthIdNumber'];

                if (abhaCardDetailsData.hasOwnProperty('healthId'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['ABHAAddress'] = abhaCardDetailsData['healthId'];

                if (abhaCardDetailsData.hasOwnProperty('mobile'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['MobileNumber'] = abhaCardDetailsData['mobile'];

                if (abhaCardDetailsData.hasOwnProperty('stateName'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['State'] = abhaCardDetailsData['stateName'];

                if (abhaCardDetailsData.hasOwnProperty('address'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['Address'] = abhaCardDetailsData['address'];

                if (abhaCardDetailsData.hasOwnProperty('districtName'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['City'] = abhaCardDetailsData['districtName'];

                if (abhaCardDetailsData.hasOwnProperty('pincode'))
                    $scope.abhaVerifyReg.abhaCardDetailsObj['Pincode'] = abhaCardDetailsData['pincode'];
            }

            $scope.calculateAge = function (dateOfBirth) {
                console.log(dateOfBirth);
                const dob = new Date(dateOfBirth);
                const currentDate = new Date();

                let age = currentDate.getFullYear() - dob.getFullYear();

                if (
                    currentDate.getMonth() < dob.getMonth() ||
                    (currentDate.getMonth() === dob.getMonth() &&
                        currentDate.getDate() < dob.getDate())
                ) {
                    age--;
                }

                console.log(age);

                return age;
            }

            /* GET ABHA CARD DETAILS FUNCTIONALITY END */

            $scope.abhaVerifyReg.checkProfileDetailsYes = function () {
                $scope.abhaVerifyReg.abhaCardDetails = false;
        
                $scope.loadingImg = true;
                $('.abha_auth_mode_loader').css('display', 'none');
                $scope.abhaVerifyReg.abhaOTPSection = false;
                $scope.abhaVerifyReg.storeCareContextRefNumToAbha();
                
            }

            $scope.abhaVerifyReg.abhalinkscroll = function () {
                $scope.scroll = new FTScroller(document.getElementById('abha_link_container_scroll'), { scrollingX: false });
            }

            $scope.abhaVerifyReg.startTimer = function(){
                if($rootScope.showTimer){
                    let timerValue = 60;
                    $scope.timerValue = timerValue;
                    $rootScope.timerPromise =  $interval(function(){
                        // console.log($rootScope.timerPromise)
                        // console.log("timerValue : ",$scope.timerValue)    
                        if($scope.timerValue > -1 && $scope.timerValue < 61)
                            $scope.timerValue --;
                        
                        if($scope.timerValue === 0){
                            $rootScope.showTimer = false;
                            $interval.cancel($rootScope.timerPromise);
                        }
                    },1000)
                }
            }

            $scope.$on('$destroy',function(){
                if(angular.isDefined($rootScope.timerPromise)){
                    $interval.cancel($rootScope.timerPromise);
                }
            })
            $scope.abhaVerifyReg.init();
        }
    }
}]);