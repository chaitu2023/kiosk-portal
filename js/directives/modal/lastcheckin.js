higiKioskControllers.directive('lastCheckinModal', ['$rootScope', 'HigiKioskFlow', 'HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http','HigiKioskVitalReference', function( $rootScope, HigiKioskFlow, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService,HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http,HigiKioskVitalReference) {    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/last-checkin.html',
        link :function(scope, elem, attrs){
            $rootScope.lastCheckin = new Object();
            //alert("$rootScope.fingerprintTrueorFalse "+$rootScope.fingerprintTrueorFalse);
            if(!$rootScope.fingerprintTrueorFalse){
                //alert("fingerprintTrueorFalse is true");
                //keyboard_lastcheckin_box_fingerprint
                //.setProperty("background-color", "red", "important");
                scope.lastCheckin.fingerprintThereNot3 = true;
                //document.getElementById("keyboard_lastcheckin_box_fingerprint").style.setProperty("display", "block", "important");
            scope.init = function(){

                // Abha account linked or not
                // $rootScope.abhaAccountLinked = false;

                //class name for vital history
                $rootScope.UserAadharNumber = '';
                scope.spo2StatusClassName = '';
                scope.tempStatusClassName = '';
                scope.bpStatusClassName = '';
                scope.pulseStatusClassName = '';
                scope.bmiStatusClassName = '';
                scope.ecgStatusClassName = '';
                scope.bmcStatusClassName = '';
                scope.ecgadvice = '';
                scope.bmcstatusInfo = '';
                scope.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                scope.lastCheckin.title = "welcomeModals.lastcheckin.good.to.see.you";
                scope.lastCheckin.yourResults = "welcomeModals.last.checkin.results";
                scope.lastCheckin.logoutLabel = "global.signout";
                scope.lastCheckin.higiScoreTitle = "finalresults.higi.score";
                scope.lastCheckin.aboutYouSex = "aboutyou01.sex";
                scope.lastCheckin.aboutYouHeight = "aboutyou01.height";
                scope.lastCheckin.ageTitle = "aboutyou01.age";
                scope.lastCheckin.loginLast = "welcomeModals.last.checkin";
                scope.lastCheckin.bp = "welcomeModals.blood.pressure";
                scope.lastCheckin.mmhg = "welcomeModals.mmhg";
                scope.lastCheckin.rating = "welcomeModals.rating";
                scope.lastCheckin.pulse = "welcomeModals.pulse";
                scope.lastCheckin.bpm = "welcomeModals.bpm";
                scope.lastCheckin.weight = "welcomeModals.weight";
                scope.lastCheckin.abbvPounds = "welcomeModals.abbv.pounds";
                scope.lastCheckin.abbvPercent = "welcomeModals.abbv.percent";
                scope.lastCheckin.bmi = "welcomeModals.body.mass.index";
                scope.lastCheckin.bodyFat = "welcomeModals.body.fat";
                scope.lastCheckin.ECG = "welcomeModals.ecgtitledisp";
                scope.lastCheckin.ECGBpmUnit = "welcomeModals.ECGBpm.unit";
                scope.lastCheckin.lastEarnings = "lastcheckin.last.earnings";
                scope.lastCheckin.lastEarndit = "global.higiCheckin";
                scope.lastCheckin.backToTop = "welcomeModals.back.to.top";
                scope.lastCheckin.continue = "welcomeModals.continue";
                scope.lastCheckin.confirm = "welcomeModals.confirm";
                scope.lastCheckin.howTall = "height01.how.tall";
                scope.lastCheckin.guyOrGal = "gender01.guy.or.gal";
                scope.lastCheckin.yourName = "global.enter.your.name";
                scope.lastCheckin.officialRules = "global.challenge.official.rules";
                scope.lastCheckin.alreadyJoined = "global.join.challenge.joined";
                scope.lastCheckin.joinChallengeNoLastcCheckinTitle = "global.challenge.account.created.subtitle"; //join the challenge
                scope.lastCheckin.messagesTab = "global.messages";
                scope.lastCheckin.resultsTab = "global.results";
                scope.lastCheckin.SpO2 = "welcomeModals.body.spo2";
                scope.lastCheckin.temp = "welcomeModals.body.temp";

                scope.lastCheckin.oxyLevel = "welcomeModals.oxyLevel";
                scope.lastCheckin.BodyMassindexTitle = "welcomeModals.body.mass.index";
                scope.lastCheckin.Bodytemp = "welcomeModals.body.temp";
                scope.lastCheckin.bodyFatPercentage = "welcomeModals.bmc.body.fat.percentage"; 
                scope.lastCheckin.sysDia = "welcomeModals.sysDia";
                scope.lastCheckin.pulserate = "welcomeModals.pulserate";
                scope.lastCheckin.weight = "welcomeModals.weight";
                scope.lastCheckin.heartrate = "welcomeModals.heartrate";

                scope.lastCheckin.BodyFatMass = "welcomeModals.BodyFatMass";
                scope.lastCheckin.PercentBodyFat = "welcomeModals.PercentBodyFat";
                scope.lastCheckin.SkeletalMuscleMass = "welcomeModals.SkeletalMuscleMass";
                scope.lastCheckin.BodyCellMass = "welcomeModals.BodyCellMass";
                scope.lastCheckin.VisceralFat = "welcomeModals.VisceralFat";
                scope.lastCheckin.BoneMineralContent = "welcomeModals.BoneMineralContent";
                scope.lastCheckin.ProteinContent = "welcomeModals.ProteinContent";
                scope.lastCheckin.MineralContent = "welcomeModals.MineralContent";
                scope.lastCheckin.IntraCellularWater = "welcomeModals.IntraCellularWater";
                scope.lastCheckin.ExtraCellularWater = "welcomeModals.ExtraCellularWater";
                scope.lastCheckin.WaistToHipRatio = "welcomeModals.WaistToHipRatio";
                scope.lastCheckin.WaistToHeightRatio = "welcomeModals.WaistToHeightRatio";
                scope.lastCheckin.BasalMetabolicRate = "welcomeModals.BasalMetabolicRate";


                scope.lastCheckin.selectYourAffiliate = "global.selectYourAffiliate";
                scope.lastCheckin.registerButtonClass = "";
                scope.lastCheckin.checkinDataVisible = true;
                scope.lastCheckin.loginEmailSection = false;
                scope.lastCheckin.checkinEditSexVisible = false;
                scope.lastCheckin.loginCreateFingerprintSection = false;
                scope.lastCheckin.showLoadingAnimationFingerprint = false;
                scope.lastCheckin.checkinEditHeightVisible = false;
                scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                scope.lastCheckin.checkinAbhaEnable = false;
                scope.lastCheckin.checkinAbhaCardShow = false;
                scope.lastCheckin.checkinEditNameVisible = false;
                scope.lastCheckin.submitting = false;
                scope.lastCheckin.abhaNoCardToshow = false;

                scope.checkinEditSexButtonActive = false;
                scope.lastCheckin.checkinEditSexButtonActiveClass = "";

                scope.checkinEditHeightButtonActive = false;
                scope.checkinEditWaistCircumferenceButtonActive = false;
                scope.lastCheckin.AnimationFingerprintPng = false;
                scope.checkinEditHeightButtonActiveClass = '';
                scope.checkinEditWaistCircumferenceButtonActiveClass = '';

                scope.lastCheckin.resultsActiveClass = "";
                scope.lastCheckin.messagesActiveClass = "active";
                scope.lastCheckin.resultsVisible = true;
                scope.lastCheckin.messagesVisible = false;
                scope.lastCheckin.checkinAffiliateVisible = false;
                scope.lastCheckin.fingerprintBackbutton = false;

                scope.lastCheckin.earnditPointsVisible = (HigiKioskStorageService.returnSessionData('earnditPoints') != undefined);
                scope.lastCheckin.earnditPoints = HigiKioskStorageService.returnSessionData('earnditPoints');
                scope.lastCheckin.noLastCheckin = HigiKioskStorageService.returnSessionData('nolastCheckin');
                scope.lastCheckin.registerDisclaimer = "global.challenge.terms.agree";
                scope.lastCheckin.joinButton = "global.join.challenge";
                scope.lastCheckin.challengeBanner = "images/last-checkin-default-message.png";
                //earnditPoints
                $rootScope.wab = "welcomeModals.weightandbmi";
                $rootScope.validates = "global.validatess";
                $rootScope.addfinge = "welcomeModals.addfingepr";
                $rootScope.edprofile = "welcomeModals.edprofile";
                $rootScope.loadpleaswait = "welcomeModals.lpleasewait";
                $rootScope.somewrong = "welcomeModals.wrongwent";
                $rootScope.alreadregister = "welcomeModals.alreadregisterr";
                $rootScope.addleftthumb = "welcomeModals.addleftthumb";
                $rootScope.scanwill = "welcomeModals.scanwill";
                $rootScope.canc = "welcomeModals.canc";
                $rootScope.emaill = "global.emaill";
                $rootScope.mobno = "global.mobno";
                $rootScope.aadhno = "global.aadhno";
                $rootScope.firstnames = "global.firstnames";
                $rootScope.lastnames = "global.lastnames";
                $rootScope.successadfp = "welcomeModals.successadfp";
                $rootScope.youarealread = "welcomeModals.youarealread";
                $rootScope.proce =  "welcomeModals.proced";
                $rootScope.sub =  "welcomeModals.sub";
                $rootScope.enteradhar =  "global.enteradhaarnumber";
                $rootScope.enteremail =  "welcomeModals.enteremail";
                $rootScope.entermob =  "welcomeModals.entermobileenumber";
                $rootScope.enterfir =  "global.enterfir";
                $rootScope.enterlast =  "global.enterlast";
                $rootScope.selectAffiliate = "global.selectAffiliate";
                scope.printPresOrConsultationNotesObj = {};
                scope.userinfo_loading = false;
                scope.medAPIerror = false;                       
                scope.consultantApiDataErr = false;

                scope.waist_cir_title = "lastcheckin.waist_cir_title";
                scope.waist_cir_title_small = "lastcheckin.waist_cir_title_small";
                scope.abhaTitleText = "lastcheckin.abhaTitleText";
                scope.waist_cir_question = "onboarding.5.tittle";
                scope.waist_cir_question_sub_title = "onboarding.5.subtitle";
                scope.last_checkin_title = "lastcheckin.last_checkin_title";
                scope.last_checkin_vital_history_title = "lastcheckin.last_checkin_vital_history_title";
                scope.last_checkin_medication_history_title = "lastcheckin.last_checkin_medication_history_title";
                scope.progress_message = "lastcheckin.progress_message";
                scope.progress_message_2 = "lastcheckin.progress_message_2";
                scope.progress_failure_message = "lastcheckin.progress_failure_message";
                scope.your_vital_history = "lastcheckin.your_vital_history";
                scope.your_consult_history = "lastcheckin.your_consult_history";
                scope.consult_history_subtitle_1 = "lastcheckin.consult_history_subtitle_1";
                scope.consult_history_subtitle_2 = "lastcheckin.consult_history_subtitle_2";
                scope.consult_history_subtitle_3 = "lastcheckin.consult_history_subtitle_3";
                scope.test_taken_on_title = "lastcheckin.test_taken_on_title";
                scope.blood_pressure_title = "lastcheckin.blood_pressure_title";
                scope.pulse_title = "welcomeModals.pulse";
                scope.body_fat_title = "lastcheckin.body_fat_title";
                scope.spo2_title = "lastcheckin.spo2_title";
                scope.temperature_title = "welcomeModals.body.temp";
                scope.ecg_title = "welcomeModals.ecgtitledisp";
                scope.weight_bmi_title = "lastcheckin.weight_bmi_title";
                scope.blood_pressure_sub_title = "welcomeModals.sysDia";
                scope.pulse_sub_title = "welcomeModals.pulserate";
                scope.body_fat_sub_title = "welcomeModals.bmc.body.fat.percentage";
                scope.spo2_sub_title = "welcomeModals.oxyLevel";
                scope.temperature_sub_title = "lastcheckin.vital_param_title_5";
                scope.ecg_sub_title = "lastcheckin.ecg_sub_title";
                scope.weight_sub_title = "welcomeModals.weight";
                scope.bmi_sub_title = "lastcheckin.vital_param_title_3";
                scope.body_fat_sub_title_1 = "lastcheckin.body_fat_sub_title_1";
                scope.body_fat_sub_title_2 = "welcomeModals.body.fat";
                scope.body_fat_sub_title_3 = "lastcheckin.body_fat_sub_title_3";
                scope.body_fat_sub_title_4 = "lastcheckin.body_fat_sub_title_4";
                scope.body_fat_sub_title_5 = "welcomeModals.VisceralFat";
                scope.body_fat_sub_title_6 = "lastcheckin.body_fat_sub_title_6";
                scope.body_fat_sub_title_7 = "lastcheckin.body_fat_sub_title_7";
                scope.body_fat_sub_title_8 = "lastcheckin.body_fat_sub_title_8";
                scope.body_fat_sub_title_9 = "welcomeModals.IntraCellularWater";
                scope.body_fat_sub_title_10 = "lastcheckin.body_fat_sub_title_10";
                scope.body_fat_sub_title_11 = "lastcheckin.body_fat_sub_title_11";
                scope.body_fat_sub_title_12 = "lastcheckin.body_fat_sub_title_12";
                scope.body_fat_sub_title_13 = "welcomeModals.BasalMetabolicRate";
                scope.bp_status_info = '';
                scope.pulse_status_info = '';
                scope.spo2_status_info = '';
                scope.temperature_status_info = "";
                scope.basal_metabolic_rate_status_info = '';
                scope.body_cell_mass_status_info = '';
                scope.body_fat_mass_status_info = '';
                scope.bone_mineral_content_status_info = '';
                scope.extra_cellular_water_status_info = '';
                scope.intra_cellular_water_status_info = '';
                scope.mineral_status_info = '';
                scope.percent_body_fat_status_info = '';
                scope.protien_status_info = '';
                scope.skeletal_muscle_mass_status_info = '';
                scope.visceral_fat_status_info = '';
                scope.waist_height_ratio_status_info = '';
                scope.waist_hip_ratio_status_info = '';
                scope.bmi_status_info = '';
                $rootScope.print_vital = "lastcheckin.print_vital";
                $rootScope.print_prescription_1 = "lastcheckin.print_prescription_1";
                $rootScope.print_prescription_2 = "lastcheckin.print_prescription_2";
                $rootScope.vital_param_title_1 = "lastcheckin.vital_param_title_1";
                $rootScope.vital_param_title_2 = "lastcheckin.vital_param_title_2";
                $rootScope.vital_param_title_3 = "lastcheckin.vital_param_title_3";
                $rootScope.vital_param_title_4 = "lastcheckin.vital_param_title_4";
                $rootScope.vital_param_title_5 = "lastcheckin.vital_param_title_5";
                $rootScope.vital_param_title_6 = "lastcheckin.vital_param_title_6";
                $rootScope.vital_param_title_7 = "welcomeModals.ecgtitledisp";
                $rootScope.vital_param_title_8 = "lastcheckin.vital_param_title_8";
                $rootScope.vital_param_title_9 = "lastcheckin.vital_param_title_9";
                $rootScope.vital_param_title_10 = "lastcheckin.vital_param_title_10";
                $rootScope.vital_param_title_11 = "lastcheckin.vital_param_title_11";
                $rootScope.vital_param_title_12 = "lastcheckin.vital_param_title_12";
                $rootScope.vital_param_title_13 = "lastcheckin.vital_param_title_13";
                $rootScope.vital_param_title_14 = "lastcheckin.vital_param_title_14";
                $rootScope.vital_param_title_15 = "lastcheckin.vital_param_title_15";
                $rootScope.vital_param_title_16 = "lastcheckin.vital_param_title_16";
                $rootScope.vital_param_title_17 = "lastcheckin.vital_param_title_17";
                $rootScope.vital_param_title_18 = "lastcheckin.vital_param_title_18";
                $rootScope.vital_param_title_19 = "lastcheckin.vital_param_title_19";
                scope.consultant_name_title = "lastcheckin.consultant_name_title";
                scope.speciality_name_title = "lastcheckin.speciality_name_title";
                scope.consultant_fees_title = "lastcheckin.consultant_fees_title";
                scope.consultant_advice_notes_title = "lastcheckin.consultant_advice_notes_title";
                scope.consultant_diagnosis_title = "lastcheckin.consultant_diagnosis_title";
                scope.consultant_reason_for_visit_title = "lastcheckin.consultant_reason_for_visit_title";
                scope.consultant_medicine_name_title = "lastcheckin.consultant_medicine_name_title";
                scope.consultant_frequency_title = "lastcheckin.consultant_frequency_title";
                scope.consultant_instruction_title = "lastcheckin.consultant_instruction_title";
                scope.consultant_quantity_title = "lastcheckin.consultant_quantity_title";
                scope.consultant_no_days_title = "lastcheckin.consultant_no_days_title";

                scope.lastCheckin.abhaVerifyButtonClass = 'abha_verify_active_btn';

                scope.abhaAuthMode = '';
                scope.lastCheckin.abhaCardOTPSection = false;
                scope.cardOtpSectionTitle = '';
                scope.abhaTxnId = '';
                scope.lastCheckin.abhaCardOtpSubmit = '';
                scope.abhaCardOTP = '';
                scope.abhaLinkDropOptions = [{auth_id : 'MOBILE_OTP', auth : "Mobile OTP"}, {auth_id : 'AADHAAR_OTP', auth : "Aadhaar OTP"},{auth_id : 'DO_IT_LATER', auth : "Do it Later"}];

                scope.lastCheckin.fields = [


                    {id : "emaillog2" , placeholder: "Enter your Aadhaar number",defaultText : "Enter your Aadhaar number" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.emailOrMobileOrAadhaarPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "emaillog3" , placeholder: "Enter your Email Id",defaultText : "Enter your Email Id" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.emailPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}, 
                    {id : "mobile_no_login_edit" , placeholder: "Enter your mobile no",defaultText : "Enter your 10 digit mobile no" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.mobileNoPatternCheck(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "firstnameADDlogin" , placeholder: "Enter your first name",defaultText : "Enter your first name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.FirstNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "lastnameADDlogin" , placeholder: "Enter your last name",defaultText : "Enter your last name" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.LastNameValidation(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "abhaAdress" , placeholder: "Enter your Abha address",defaultText : "Enter your Abha address" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.abhaAddressValidate(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "cardOtp" , placeholder: "Enter OTP",defaultText : "Enter OTP" , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.lastCheckin.abhaCardOtp(this)},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}

                ];   


                scope.onAbhaCardAuthClickEvent = function(){
                    $("#abhaCardSelect").css('border' , '2px solid #3787c0');
                }

                scope.onAbhaCardAuthChange = function(auth){

                    let abhaAuth_id = scope.abhaLinkDropOptions.find((item) => item.auth === auth)?.auth_id;

                    scope.abhaAuthMode = abhaAuth_id;
                    scope.abhaFinishcontinueBtn = 'abha_close_continue_active';
                }

                scope.lastCheckin.getAbhaCard = function(){
                    $(".last_checkin_abha_demo_auth_mode_end_loader").css('display','block');
                    // $scope.abhaVerifyReg.abhaFetchNextBtn = '';
                    // $('.abha_auth_mode_loader').css('display', 'block');
    
                    if(scope.abhaAuthMode == 'MOBILE_OTP'){
                        let data = {
                            method : 'initMobileOtpVerify', 
                            data : {
                                "authMethod": scope.abhaAuthMode,
                                "healthid": $rootScope.abhaAddressFetched
                            }
                        };
    
                        scope.lastCheckin.initOTPMobile(data);
                    }else if(scope.abhaAuthMode == 'AADHAAR_OTP'){
                        let data = {
                            method : 'initMobileOtpVerify', 
                            data : {
                                "authMethod": scope.abhaAuthMode,
                                "healthid": $rootScope.abhaAddressFetched
                            }
                        };
    
                        scope.lastCheckin.initOTPAadhar(data);
                    }else if(scope.abhaAuthMode == 'DO_IT_LATER'){
                        $rootScope.abha_payment_reason_for_visit = true;
                        $rootScope.abhaCloseCheckPaymentFlow();
                    }
                }

                scope.lastCheckin.initOTPMobile = function(data){
                    HigiApiService.getABHASession(data, function(res){
                        var data = JSON.parse(res);
                        console.log(JSON.parse(data.res));
                        $(".last_checkin_abha_demo_auth_mode_end_loader").css('display','none');
                        if(data.status == 'S'){
                            $('.otp_validation_loader').css('display', 'none');
                            if(JSON.parse(data.res).txnId){
                                $rootScope.focusField(scope.lastCheckin.fields[6]);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                scope.abhaTxnId = JSON.parse(data.res).txnId;
                                scope.lastCheckin.abhaCardOTPSection = true;
                                scope.cardOtpSectionTitle = 'Mobile OTP';
                                scope.lastCheckin.checkinAbhaCardShow = false;
                                $rootScope.keyboardShow();
                            }else{
                                $('.otp_validation_loader').css('display', 'none');
                                $('.abha_auth_server_error').css('display', 'block');
                                $timeout(function(){
                                    $('.abha_auth_server_error').css('display', 'none');
                                }, 3000);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function(){
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }, function(err){
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function(){
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    });
                }
    
    
                scope.lastCheckin.initOTPAadhar = function(data){
                    HigiApiService.getABHASession(data, function(res){
                        var data = JSON.parse(res);
                        console.log(JSON.parse(data.res));
    
                        if(data.status == 'S'){
                            $(".last_checkin_abha_demo_auth_mode_end_loader").css('display','none');
                            if(JSON.parse(data.res).txnId){
                                $rootScope.focusField(scope.lastCheckin.fields[6]);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                scope.abhaTxnId = JSON.parse(data.res).txnId;
    
                                scope.cardOtpSectionTitle = 'Aadhar OTP';
                                scope.lastCheckin.abhaCardOTPSection = true;
                                scope.lastCheckin.checkinAbhaCardShow = false;
                                $rootScope.keyboardShow();
                            }else{
                                $('.otp_validation_loader').css('display', 'none');
                                $('.abha_auth_server_error').css('display', 'block');
                                $timeout(function(){
                                    $('.abha_auth_server_error').css('display', 'none');
                                }, 3000);
                                $('.abha_auth_mode_loader').css('display', 'none');
                                // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                            }
                        }else{
                            $('.otp_validation_loader').css('display', 'none');
                            $('.abha_auth_server_error').css('display', 'block');
                            $timeout(function(){
                                $('.abha_auth_server_error').css('display', 'none');
                            }, 3000);
                            $('.abha_auth_mode_loader').css('display', 'none');
                            // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                        }
                    }, function(err){
                        $('.otp_validation_loader').css('display', 'none');
                        $('.abha_auth_server_error').css('display', 'block');
                        $timeout(function(){
                            $('.abha_auth_server_error').css('display', 'none');
                        }, 3000);
                        $('.abha_auth_mode_loader').css('display', 'none');
                        // $scope.abhaVerifyReg.abhaFetchNextBtn = 'checkin_abhaFetch_next_active_btn';
                    });
                }

                scope.lastCheckin.abhaCardOtp = function(field){
                    var str = field.text;
                    scope.abhaCardOTP = scope.lastCheckin.fields[6].text;
                    if(str.length > 0){
                        scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                    }else{
                        scope.lastCheckin.abhaCardOtpSubmit = '';
                    }
                }

                scope.lastCheckin.abhaCardSubmitOTP = function(){
                    console.log(scope.abhaCardOTP);
    
                    $('.otp_validation_loader').css('display', 'block');
                    scope.lastCheckin.abhaCardOtpSubmit = '';
    
                    if(scope.abhaAuthMode == 'MOBILE_OTP'){
                        let data = {
                            method : 'confirmAuthMobileOtpVerify', 
                            data : {
                                "otp": scope.abhaCardOTP,
                                "txnId": scope.abhaTxnId
                            }
                        };
    
                        HigiApiService.getABHASession(data, function(res){
                            var data = JSON.parse(res);
                            // console.log(JSON.parse(data.res));
    
                            if(data.status == 'S'){
                                if(data.res != ''){
                                    if(JSON.parse(data.res).token){
                                        let abhaToken =  JSON.parse(data.res).token;
                                        scope.abhaUserToken = abhaToken;
                                        scope.lastCheckin.abhaCardFetch(scope.abhaUserToken);
                                    }else{
                                        $('.abha_otp_no_not_exist').css('display', 'block');
                                        $timeout(function(){
                                            $('.abha_otp_no_not_exist').css('display', 'none');
                                        }, 3000);
                                        $('.otp_validation_loader').css('display', 'none');
                                        scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                                    }
                                }else{
                                    $('.otp_srv_err').css('display', 'block');
                                    $timeout(function(){
                                        $('.otp_srv_err').css('display', 'none');
                                    }, 3000);
                                    $('.otp_validation_loader').css('display', 'none');
                                    scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                                }
                            }else{
                                $('.otp_srv_err').css('display', 'block');
                                $timeout(function(){
                                    $('.otp_srv_err').css('display', 'none');
                                }, 3000);
                                $('.otp_validation_loader').css('display', 'none');
                                scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                            }
                        }, function(err){
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function(){
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                            $('.otp_validation_loader').css('display', 'none');
                            scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                        });                
                    } else if(scope.abhaAuthMode == 'AADHAAR_OTP'){
                        let data = {
                            method : 'confirmAuthAadharOtpVerify', 
                            data : {
                                "otp": scope.abhaCardOTP,
                                "txnId": scope.abhaTxnId
                            }
                        };
    
                        HigiApiService.getABHASession(data, function(res){
                            var data = JSON.parse(res);
                            console.log(JSON.parse(data.res));
    
                            if(data.status == 'S'){
                                if(JSON.parse(data.res).token){
                                    let abhaToken =  JSON.parse(data.res).token;
                                    scope.abhaUserToken = abhaToken;
                                    scope.lastCheckin.abhaCardFetch(scope.abhaUserToken);
                                }else{
                                    $('.abha_otp_no_not_exist').css('display', 'block');
                                    $timeout(function(){
                                        $('.abha_otp_no_not_exist').css('display', 'none');
                                    }, 3000);
                                    $('.otp_validation_loader').css('display', 'none');
                                    scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                                }
                            }else{
                                $('.otp_srv_err').css('display', 'block');
                                $timeout(function(){
                                    $('.otp_srv_err').css('display', 'none');
                                }, 3000);
                                $('.otp_validation_loader').css('display', 'none');
                                scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                            }
                        }, function(err){
                            $('.otp_srv_err').css('display', 'block');
                            $timeout(function(){
                                $('.otp_srv_err').css('display', 'none');
                            }, 3000);
                            $('.otp_validation_loader').css('display', 'none');
                            scope.lastCheckin.abhaCardOtpSubmit = 'checkin_abhaCardOtp_submit_active_btn';
                        });                
                    }
    
                }

                scope.lastCheckin.abhaCardFetch = function(token){
                    let abhaCardGetPayload = {
                        method : 'getAbhaCardPng', 
                        data : token
                    };
    
                    HigiApiService.getABHASession(abhaCardGetPayload, function(response){
                        var data = JSON.parse(response);
                        console.log(data.res);
    
                        if(data.status == 'S'){
                            var abhaCardBase64Res = data.res;
                            scope.abhaCardBase64 = abhaCardBase64Res;
    
                            scope.lastCheckin.storeAbhaDetailsInIHL(scope.abhaCardBase64);
                        }else{
                            //
                        }
                    }, function(err){
                        //
                    });
                }

                scope.lastCheckin.storeAbhaDetailsInIHL = function(item){
                    var abhaCard = item;
                    var storeAbhaDetailsIhl = {
                        method: 'updateIhlUserAbhaDetails',
                        data: {
                            ihl_user_id : $rootScope.UserInfo.id,
                            abha_address: $rootScope.abhaAddressFetched,
                            abha_card: abhaCard,
                        }
                    }
        
                    HigiApiService.getABHASession(storeAbhaDetailsIhl, function(response){
                        var data = JSON.parse(response);
                        // console.log(JSON.parse(data.res));
        
                        if(data.status == 'S'){
                            if(data.res == 'update success'){
                                $('.otp_validation_loader').css('display', 'none');
                                scope.lastCheckin.abhaCardOTPSection = false;
                                scope.lastCheckin.checkinAbhaCardShow = true;
                                scope.lastCheckin.abhaNoCardToshow = false;
                                scope.lastCheckin.abhaCard = 'data:image/png;base64, ' + abhaCard;
                                $rootScope.keyboardHide();
                            }else{
                                //
                            }
                        }else{
                            //
                        }
                    }, function(err){
                        //
                    });
                }
                

                scope.lastCheckin.emailPatternCheck = function(field){
                var str = field.text;
                //alert(str);
                //alert("email pattern check calling");
                //field = document.getElementById("emailReg2");
                var str2 = document.getElementById("emaillog2").value;
                //alert(str2);
                if( str2.length != 12 && isNaN(str2) == true){
                    scope.lastCheckin.nextBtnActive = '';
                    document.getElementById("Aadhaar_validating_messege").innerHTML = "Invalid Aadhaar number... Please enter valid aadhaar no..";
                }
                else{
                    document.getElementById("Aadhaar_validating_messege").innerHTML = "";
                }
                
                var thisText = document.getElementById("login_create_account_email_title2");
                if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    //alert("field " + field);
                    //alert("str2 " + str);
                    scope.lastCheckin.emailValid = true;
                    
                    document.getElementById("register-first-screen-text7").innerHTML =  $scope.interfaceLabels[ $rootScope.validates];
                    document.getElementById("login_username_loading_new5").style.display = "block";
                            $rootScope.validEmail = scope.lastCheckin.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            //scope.lastCheckin.nextBtnActive = 'active_btn';
                            $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //alert(scope.lastCheckin.nextBtnActive);


                            var emailIsThis = scope.lastCheckin.fields[1].text;
                            //alert("emailIsThis " + emailIsThis);
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

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = finalString;
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
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


                }
                else if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == "Aadhaar no"){

                    
                    //scope.lastCheckin.nextBtnActive = 'active_btn';
                    //alert(scope.lastCheckin.nextBtnActive);
                    document.getElementById("register-first-screen-text7").innerHTML = "Validating Aadhaar number. Please Wait..";
                    document.getElementById("login_username_loading_new5").style.display = "block";
                    //alert("going here");
                    $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';


                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = scope.lastCheckin.fields[1].text;
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
                                
                            if(finalString == "Aadhaar number already exists"){

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_new").innerHTML = finalString;
                                document.getElementById("register-first-screen-text7").innerHTML = "";
                                document.getElementById("login_username_loading_new5").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
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


               }
                else
                {
                    scope.lastCheckin.emailValid = false;
                    scope.lastCheckin.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            scope.lastCheckin.emailOrMobileOrAadhaarPatternCheck = function(field)
            {
                 var str2 = document.getElementById("emaillog2").value;
                //alert(str2);
                if( str2.length != 12 && isNaN(str2) == true){
                    //scope.lastCheckin.nextBtnActive = '';
                    document.getElementById("Aadhaar_validating_messege").innerHTML = "Invalid Aadhaar number... Please enter valid aadhaar no..";
                }
                else{
                    document.getElementById("Aadhaar_validating_messege").innerHTML = "";
                }
                var str = field.text;
                var emailOrMobileExist = "";
               if(HigiKioskUtilitiesService.isValidEmailAddress(field)){
                    scope.lastCheckin.emailValid = true;
                    document.getElementById("login_username_loading_new9").style.display = "block";
                    document.getElementById("register-first-screen-text9").innerHTML = $scope.interfaceLabels[ $rootScope.validates];                    
                            $rootScope.validEmail = scope.lastCheckin.emailValid;
                            $rootScope.hideEmailExtensionTop();
                            
                            $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';
                            //alert(scope.lastCheckin.nextBtnActive);
                            var emailIsThis = scope.lastCheckin.fields[0].text;
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

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = finalString;
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
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

               
               else if(str.length == 12 && isNaN(str) == false){

               
                    //alert("you reached man");
                    //alert(scope.lastCheckin.nextBtnActive);
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML = "Validating Aadhaar number. Please Wait..";
                    scope.lastCheckin.mobileValid = true;
                    $rootScope.validEmail = scope.lastCheckin.mobileValid;
                    $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = scope.lastCheckin.fields[0].text;
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
                                
                            if(finalString == "Aadhaar number already exists"){

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = finalString;
                                document.getElementById("Aadhaar_validating_messege").innerHTML = finalString;
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
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

               else if(str.length == 10 && isNaN(str) == false){

                    //alert("you reached man");
                    //alert(scope.lastCheckin.nextBtnActive);
                document.getElementById("login_username_loading_new9").style.display = "block";
                document.getElementById("register-first-screen-text9").innerHTML = "Validating Mobile number. Please Wait..";
                    scope.lastCheckin.aadhaarValid = true;
                    $rootScope.validEmail = scope.lastCheckin.aadhaarValid;
                    $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = scope.lastCheckin.fields[0].text;
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

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_newest").innerHTML = finalString;
                                document.getElementById("register-first-screen-text9").innerHTML = "";
                                document.getElementById("login_username_loading_new9").style.display = "none";
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_newest").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
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
                    scope.lastCheckin.emailValid = false;
                    scope.lastCheckin.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    //document.getElementById("Aadhaar_validating_messege").innerHTML = "";
               }

                       
                
            };
 scope.lastCheckin.mobileNoPatternCheck = function(field){
                ////////alert("email pattern check calling");
                var str = field.text;
                ////alert(str);
                var str2 = document.getElementById("mobile_no_login_edit").value;
                //alert(str2);
                if( str2.length != 10 && isNaN(str2) == true){
                    //scope.lastCheckin.nextBtnActive = '';
                    document.getElementById("MobileNo_validating_messege").innerHTML = "Invalid Mobile number... Please enter valid one";
                }
                else{
                    document.getElementById("MobileNo_validating_messege").innerHTML = "";
                }
                var thisText = document.getElementById("login_title_mobile1");
                if(str.length == 10 && isNaN(str) == false){

                    //alert("you reached man");
                    //scope.lastCheckin.nextBtnActive = 'active_btn';
                    //alert(scope.lastCheckin.nextBtnActive);
                    document.getElementById("login_username_loading_new8").style.display = "block";
                    document.getElementById("register-first-screen-text8").innerHTML = "Validating Mobile number. Please Wait..";
                
                    $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = scope.lastCheckin.fields[2].text;
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

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_new2").innerHTML = finalString;
                                document.getElementById("MobileNo_validating_messege").innerHTML = finalString;
                                document.getElementById("login_username_loading_new8").style.display = "none";
                                document.getElementById("register-first-screen-text8").innerHTML = "";
                                
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new2").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new8").style.display = "none";
                                document.getElementById("register-first-screen-text8").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
               }
                else if(str.length == 12 && isNaN(str) == false && thisText.innerHTML == "Aadhaar no"){

                    //alert("you reached man");
                    //scope.lastCheckin.nextBtnActive = 'active_btn';
                    //alert(scope.lastCheckin.nextBtnActive);
                    document.getElementById("login_username_loading_new8").style.display = "block";
                document.getElementById("register-first-screen-text8").innerHTML = "Validating Aadhaar number. Please Wait..";
                 $rootScope.keyboardEnterButtonFunction = function(){scope.lastCheckin.aadhaarExistsCheck( scope.lastCheckin.fields[0]);};
                            $rootScope.keyboardEnterButtonClass = 'enter_active';

                            var emailIsThis = "";
                            var mobileIsThis = "";
                            var aadhaarIsThis = scope.lastCheckin.fields[2].text;
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
                                
                            if(finalString == "Aadhaar number already exists"){

                                scope.lastCheckin.nextBtnActive = '';
                                //alert("IfemailOrMobileExist"+finalString);
                                scope.lastCheckin.nextBtnActive = '';
                                document.getElementById("login_username_error_new2").innerHTML = finalString;
                                document.getElementById("login_username_loading_new8").style.display = "none";
                document.getElementById("register-first-screen-text8").innerHTML = "";
                                
                            }
                            else if(finalString == ""){
                                //alert("ElseemailOrMobileExist"+finalString);
                                document.getElementById("login_username_error_new2").innerHTML = "";
                                scope.lastCheckin.nextBtnActive = 'active_btn';
                                document.getElementById("login_username_loading_new8").style.display = "none";
                document.getElementById("register-first-screen-text8").innerHTML = "";
                            }
                            },
                            error : function(xhr, status, error) { 
                                console.log('failures 3'+xhr.responseText);
                            } 
                        });
                    }
                });
               }
                else
                {
                    scope.lastCheckin.emailValid = false;
                    scope.lastCheckin.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                    //document.getElementById("MobileNo_validating_messege").innerHTML = "";
                }
            };

           

 scope.lastCheckin.FirstNameValidation = function(field){
                scope.lastCheckin.nextBtnActive = '';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                var fstn = document.getElementById("firstname").value;
                if( fstn.length >=3  && isNaN(fstn) == true ){

                    scope.lastCheckin.nextBtnActive = '';

                }

                if (fstn != ""  &&  Nameformat.test(fstn) == true ) {

                    console.log("first name");

                    document.getElementById("firstname").placeholder="Enter your First name";
                    
                    scope.lastCheckin.loginNameSection = true;
                }
                
            }

            scope.lastCheckin.LastNameValidation = function(field){
                scope.lastCheckin.nextBtnActive = '';
                var Nameformat = /^[a-zA-Z ]{2,30}$/;    
                var lstn = document.getElementById("lastname").value;
                if( lstn.length >=1 && isNaN(lstn) == true && scope.lastCheckin.fields[3].text != '' && scope.lastCheckin.fields[4].text != ''){

                    scope.lastCheckin.nextBtnActive = 'active_btn';

                }


                if (lstn != ""  && Nameformat.test(lstn == true)) {

                    console.log("last name");

                    document.getElementById("lastname").placeholder="Enter your last name";
                    
                    scope.lastCheckin.loginNameSection = true;
                }

            }

                scope.lastCheckin.pointWatch = function(newVal, oldVal){
                    scope.lastCheckin.loggedIn = HigiKioskStorageService.returnSessionData('logged_in');
                    scope.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                    scope.lastCheckin.earnditPointsVisible = (HigiKioskStorageService.returnSessionData('earnditPoints') != undefined);
                    scope.lastCheckin.earnditPoints = HigiKioskStorageService.returnSessionData('earnditPoints');
                    scope.lastCheckin.challengeReqInProgress = true;
                    if(HigiKioskStorageService.returnSessionData('logged_in')){
                        if(HigiKioskStorageService.returnSessionData('hasChallenge')){
                            scope.lastCheckin.challengeBanner = HigiKioskStorageService.returnSessionData('challengeModalAd').path;
                            var success = function(result){


                                    var init = function(){
                                        var q = $q.defer();
                                        scope.loadingChallenge = false;
                                        scope.challengeResponse = result;
                                        if(scope.challengeResponse.joinUrl == undefined) {
                                            scope.lastCheckin.showSection("results");
                                            scope.lastCheckin.joinedChallenge = true;
                                        } else {
                                            scope.lastCheckin.joinedChallenge = false;
                                        }
                                        q.resolve();
                                        return q;
                                    };
                                    var promise = init();
                                    promise.promise
                                        .then(function(){
                                            $timeout(function(){$rootScope.refreshIScroll("keyboard_lastcheckin_content"); 
                                            },100, false);
                                        });



                            };
                            var error = function(error){
                                console.log(error);
                            };
                            if($rootScope.earnditEnabled){
                                if(HigiKioskStorageService.returnSessionData('challengeObject') != undefined) {
                                    success(HigiKioskStorageService.returnSessionData('challengeObject') );
                                }
                            }else {
                                scope.lastCheckin.joinedChallenge = false;
                                scope.lastCheckin.registerButtonClass = "active_btn";
                            }
                        }

                    }
                };


                scope.lastCheckin.challengeWatch = function(newVal){
                    if(newVal){
                        scope.lastCheckin.resultsVisible = false;
                        scope.lastCheckin.messagesVisible = true;
                   } else {
                        scope.lastCheckin.resultsVisible = true;
                        scope.lastCheckin.messagesVisible = false;
                    }
                };
                scope.lastCheckin.userChallengeWatch = function(newVal){
                    scope.lastCheckin.joinedChallenge = newVal;
                    if(newVal){
                        //scope.lastCheckin.userChallengeWatch();
                    }
                };
                scope.lastCheckin.nolastCheckinWatch = function(newVal){

                        scope.lastCheckin.noLastCheckin = newVal;
                };
                //    lastCheckin


                scope.$watch('checkinEditSexButtonActive' , function(){
                    if(scope.checkinEditSexButtonActive){
                        scope.lastCheckin.checkinEditSexButtonActiveClass = 'active_btn';
                    }
                });
                scope.$watch('checkinEditHeightButtonActive' , function(newVal, oldVal){
                    if(newVal){
                        scope.lastCheckin.checkinEditHeightButtonActiveClass = 'active_btn';
                    } else {
                        scope.lastCheckin.checkinEditHeightButtonActiveClass = '';
                    }
                });

                scope.$watch('checkinEditWaistCircumferenceButtonActive' , function(newVal, oldVal){
                    if(newVal){
                        scope.lastCheckin.checkinEditWaistCircumferenceButtonActiveClass = 'active_btn';
                    } else {
                        scope.lastCheckin.checkinEditWaistCircumferenceButtonActiveClass = '';
                    }
                });

                HigiKioskStorageService.watchSessionData('logged_in',  scope.lastCheckin.pointWatch);
                HigiKioskStorageService.watchSessionData('hasChallenge',  scope.lastCheckin.challengeWatch);
                HigiKioskStorageService.watchSessionData('userInChallenge',  scope.lastCheckin.userChallengeWatch);
                HigiKioskStorageService.watchSessionData('nolastCheckin',  scope.lastCheckin.nolastCheckinWatch);

                scope.lastCheckin.bobble = function(){
                    if(scope.lastCheckin.bobbleState == false){
                        $(".cbox-glow").transition({ scale : 1.6, duration : 1000});
                        scope.lastCheckin.bobbleState = true;
                    }
                    else {
                        scope.lastCheckin.bobbleState = false;
                        $(".cbox-glow").transition({ scale : 1.3 , duration : 1000 });
                    }
                    $timeout(scope.lastCheckin.bobble, 1500);
                };
                scope.lastCheckin.bobble();


                scope.lastCheckin.showEditSex = function(){
                    
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editSexButton', 'button', 'pressed');
                    if(HigiKioskStorageService.returnSessionData('gender') != undefined){
                        var gender = HigiKioskStorageService.returnSessionData('gender');
                        if(gender == "m"){

                            scope.sexSelect.isMaleClass = "active";
                            scope.sexSelect.isFemaleClass = "";
                            scope.sexSelect.isTransgenderClass = "";
                        }else if(gender == 'f') {

                            scope.sexSelect.isMaleClass = "";
                            scope.sexSelect.isFemaleClass = "active";
                            scope.sexSelect.isTransgenderClass = "";
                        }
                        else{
                            scope.sexSelect.isMaleClass = "";
                            scope.sexSelect.isFemaleClass = "";
                            scope.sexSelect.isTransgenderClass = "active";
                        }
                        scope.lastCheckin.checkinEditSexButtonActiveClass = 'active_btn';
                    }

                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditSexVisible = true;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                scope.lastCheckin.backToCheckinModal = function(){
                    scope.lastCheckin.checkinDataVisible = true;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                scope.lastCheckin.showEditHeight = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editHeightButton', 'button', 'pressed');
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = true;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                scope.lastCheckin.showAbhaVerfy = function(){
                    if($rootScope.abhaAccountLinked){
                        // Show Abha card (or) Select the abha id.
                        let data = {
                            method : 'abhaCardFetchIhlId',
                            data : {
                                "ihl_user_id": $rootScope.UserInfo.id,
                                "abha_address": $rootScope.abhaAddressFetched
                            }
                        };

                        HigiApiService.getABHASession(data, function(res){
                            console.log(res);
                            var data = JSON.parse(res);
                            console.log(data);
                            console.log(JSON.parse(data.res));

                            if(data.status == 'S' && JSON.parse(data.res) != 'abha card not found'&& JSON.parse(data.res) != 'invalid input'){
                                scope.lastCheckin.abhaCard = JSON.parse(data.res);
                                scope.lastCheckin.checkinDataVisible = false;
                                scope.lastCheckin.checkinEditSexVisible = false;
                                scope.lastCheckin.loginCreateFingerprintSection = false;
                                scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                                scope.lastCheckin.checkinEditHeightVisible = false;
                                scope.lastCheckin.checkinAbhaEnable = false;
                                scope.lastCheckin.checkinAbhaCardShow = true;
                                scope.lastCheckin.checkinEditNameVisible = false;
                                scope.lastCheckin.checkinAffiliateVisible = false;
                            } else {
                                scope.lastCheckin.abhaNoCardToshow = true;
                                scope.lastCheckin.checkinDataVisible = false;
                                scope.lastCheckin.checkinEditSexVisible = false;
                                scope.lastCheckin.loginCreateFingerprintSection = false;
                                scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                                scope.lastCheckin.checkinEditHeightVisible = false;
                                scope.lastCheckin.checkinAbhaEnable = false;
                                scope.lastCheckin.checkinAbhaCardShow = true;
                                scope.lastCheckin.checkinEditNameVisible = false;
                                scope.lastCheckin.checkinAffiliateVisible = false;
                            }
                        }, function(err){
                            console.log(err);
                            // coundn't connect to the server
                        })

                    }else{

                        $rootScope.abhaVerifyModelInit();
                        $rootScope.loadModal({ id: 'abhaVerify' });

                        // $rootScope.keyboardShow();
                        /*scope.lastCheckin.checkinDataVisible = false;
                        scope.lastCheckin.checkinEditSexVisible = false;
                        scope.lastCheckin.loginCreateFingerprintSection = false;
                        scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                        scope.lastCheckin.checkinEditHeightVisible = false;
                        scope.lastCheckin.checkinAbhaEnable = true;
                        scope.lastCheckin.checkinAbhaCardShow = false;
                        scope.lastCheckin.checkinEditNameVisible = false;
                        scope.lastCheckin.checkinAffiliateVisible = false;*/
                    }
                }

                scope.urineTestValueFineTune = function(urineTestVal){
                    let fintueValue = "";
                    if(urineTestVal != undefined){
                      if(urineTestVal.includes("+")){
                        fintueValue = "Present";
                      } else if(urineTestVal.includes("-")){
                        fintueValue = "Absent";
                      } else if(urineTestVal.trim().length == 0){ 
                        fintueValue = "Nil";
                      } else {
                        fintueValue = urineTestVal;
                      }
                    }else {
                      fintueValue = "Nil";
                    }
                    return fintueValue;
                }

                scope.lastCheckin.showEditWaistCircumference = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editHeightButton', 'button', 'pressed');
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = true;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                function dataURItoBlob(dataURI)
                {
                ////alert('before loop');
                    var byteString = atob(dataURI.split(',')[1]);

                    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < byteString.length; i++)
                    {
                        ia[i] = byteString.charCodeAt(i);
                    }
                ////alert("after loop");
                    var bb = new Blob([ab], { "type": mimeString });
                    return bb;
                }

                

                scope.modelCloseBtnShowHide = function(action) {
                    if(action == "show"){
                        $(".keyboard_class_close_btn").show();                        
                    } else if(action == "hide"){
                        $(".keyboard_class_close_btn").hide();                        
                    } else {
                        console.log("action is not getting correctly = "+ action);
                    }
                }
                $rootScope.modelCloseBtnShowHide = scope.modelCloseBtnShowHide;
               //fingerprintAddError
                scope.lastCheckin.showAddFingerprint = function(){

                    scope.modelCloseBtnShowHide("hide");
        
                    if (window.navigator.onLine) {
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_editHeightButton', 'button', 'pressed');



                        scope.lastCheckin.checkinDataVisible = false;
                        scope.lastCheckin.checkinEditSexVisible = false;
                        scope.lastCheckin.checkinEditHeightVisible = false;
                        scope.lastCheckin.checkinAbhaEnable = false;
                        scope.lastCheckin.checkinAbhaCardShow = false;
                        scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                        //scope.lastCheckin.loginCreateFingerprintSection = true;
                        scope.lastCheckin.checkinEditNameVisible = false;
                        scope.lastCheckin.checkinAffiliateVisible = false;

                        scope.sampleText = HigiKioskStorageService.returnSessionData('sampleText');
                        document.getElementById("fingerprint_animation_fornow").style.display = "block";

                       
                        scope.lastCheckin.showLoadingAnimationFingerprint = true;
                        scope.lastCheckin.AnimationFingerprintPng = true;                  

                        scope.lastCheckin.showLoadingAnimationFingerprintClass = "modal-slide-in-left";
                        console.log(scope.sampleText);
                        var jsontext =
                            '{"email": "' + scope.sampleText + '"}';
                        $.ajax({
                            url: getSettingsValue('kiosk.api.url') + "/login/qloginFinalWithId",
                            type: "POST",
                            cache: false,
                            data: jsontext,
                            contentType: 'application/json; charset=UTF-8',
                            dataType: 'json',
                            headers: {
                                'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="
                            },
                            success: function (html) {
                                //console.log(JSON.parse(html.replace(/&quot;/g,'"')));
                                console.log(html);
                                                                                                                   
                                //true -> already have fingerprint

                                if (html == true) {
                                    //alert("html is true");
                                    
                                     scope.modelCloseBtnShowHide("show");

                                    scope.lastCheckin.showLoadingAnimationFingerprint = false;
                                    scope.lastCheckin.AnimationFingerprintPng = false;
                                    scope.lastCheckin.showLoadingAnimationFingerprintClass = "modal-slide-out-left";
                                    scope.lastCheckin.loginCreateFingerprintSection = false;              
                                    scope.lastCheckin.fingerprintRegretSectionNew = true;


                                } else if (html == false) {
                                    

                                    scope.lastCheckin.showLoadingAnimationFingerprint = false;
                                    scope.lastCheckin.AnimationFingerprintPng = false;
                                    scope.lastCheckin.showLoadingAnimationFingerprintClass = "modal-slide-out-left";                                   
                                    scope.lastCheckin.loginCreateFingerprintSection = true;


                                    setTimeout(
                                        function () {
                                        scope.testingFunction();
                                        }, 5000);
                                
                                }
                            },
                            error: function (xhr, status, error) {
                                ////alert('failures 3'+xhr.responseText);


                            }
                        });
                    }
                    else{
                        document.getElementById("fingerprintAddError").style.display = "block";
                        document.getElementById("fingerprintAddError").innerHTML = "There was an error contacting the server";
                    }
                };


                scope.lastCheckin.showEditProfile = function(){
                    scope.lastCheckin.checkinDataVisible = false;
                    //scope.lastCheckin.checkinAffiliateVisible = false;
                    /*scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditNameVisible = false; */         
                 scope.lastCheckin.loginEmailSection = true;
                 document.getElementById("login_username2323").style.display = "block";
                 document.getElementById("emaillog3").value = $rootScope.logged_mail;
                 
                }

                scope.lastCheckin.fingerprintWentback = function(){
                    scope.lastCheckin.fingerprintBackbutton = false;
                    scope.lastCheckin.somethingWentWrong = false;
                    scope.lastCheckin.checkinDataVisible = true
                }
                scope.lastCheckin.goCapture = function(){              

                    scope.modelCloseBtnShowHide("hide");

                    scope.lastCheckin.fingerprintRegretSectionNew = false;        
                    scope.lastCheckin.loginCreateFingerprintSection = true;


                    setTimeout(
                    function() {
                    scope.testingFunction();
                    }, 5000);

                    //scope.lastCheckin.showAddFingerprint();
                                    
                };

//Sumithra - Added Fingerprint integration from Backend for Add/Edit Fingerprint in LastCheckin Starts        
            scope.fingerprintCallbackResponse = function (response) {
                console.log("Fingerprint callback response while Add Fingerprint in LastCheckin");
                console.log(response);
                if (response.fingerprintImageBase64 == "READ_ERROR" || response.fingerprintImageBase64 == "DEVICE_ERROR" || response.fingerprintImageBase64 == "DEVICE_INIT_ERROR") {
                    console.log(response.fingerprintImageBase64);
                    scope.lastCheckin.somethingWentWrong = false;
                    scope.lastCheckin.fingerprintRegretSection2fp = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.loginCreateFingerprintCapturingSection = true;
                    setTimeout(function() {  
                        scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                        scope.lastCheckin.somethingWentWrong = true;
                        scope.lastCheckin.fingerprintBackbutton = true;
                        scope.modelCloseBtnShowHide("show");
                        scope.lastCheckin.loginCreateFingerprintSection = false;
                    }, 6000);
                } if (response.fingerprintImageBase64 == "DEVICE_ERROR" || response.fingerprintImageBase64 == "DEVICE_INIT_ERROR") {
                    console.log(response.fingerprintImageBase64);
                    $rootScope.somewrong = "global.fingerprintdeviceerror";
                    scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                    scope.lastCheckin.somethingWentWrong = true;
                    scope.lastCheckin.fingerprintBackbutton = true;
                    scope.modelCloseBtnShowHide("show");
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                }else {     
                var myFinalOutput = document.getElementById("myFinalOutput");
                myFinalOutput.setAttribute('src', "data:image/jpg;base64," + response.fingerprintImageBase64);
                var finaloutputimage2 = "data:image/jpg;base64," + response.fingerprintImageBase64;
                scope.sampleText = HigiKioskStorageService.returnSessionData('sampleText');
                var formData = new FormData();
                formData.append("challengeId", "4010");
                formData.append("joinCode", "j93ia");
                formData.append("ttl", "");
                formData.append("id", scope.sampleText);
                formData.append("machine_org", $rootScope.uniqueKioskId.split('-')[1]);
                var imageObj = new Image();
                var canvass = document.getElementById('myFinalOutput');
                imageObj.id = "pic";
                imageObj.src = canvass.toDataURL();
                var blob = dataURItoBlob(finaloutputimage2);
                formData.append("image", blob);
                $.ajax({
                    url: getSettingsValue('kiosk.api.url') + "/login/addFingerprint",
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
                        console.log(html);
                        $rootScope.thisIsAjaxOp2 = html;
                        if($rootScope.thisIsAjaxOp2 != null){
                            //alert("congrats man");
                        } else{
                            $rootScope.somewrong = "global.fingerprintdeviceerror";
                            scope.lastCheckin.somethingWentWrong = true;
                            scope.lastCheckin.fingerprintBackbutton = true;
                            scope.modelCloseBtnShowHide("show");
                            scope.lastCheckin.fingerprintRegretSectionNew = false;
                            scope.lastCheckin.fingerprintRegretSection = false;
                            scope.lastCheckin.checkinEditHeightVisible = false;
                            scope.lastCheckin.checkinAbhaEnable = false;
                            scope.lastCheckin.checkinAbhaCardShow = false;
                            scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                            scope.lastCheckin.checkinEditNameVisible = false;
                            scope.lastCheckin.loginCreateFingerprintSection = false;
                        }
                        if(html == "inserted new fingerprint" || html == "merged new fingerprint"){    
                            scope.lastCheckin.somethingWentWrong = false;
                            scope.lastCheckin.fingerprintRegretSection2fp = false;
                            scope.lastCheckin.loginCreateFingerprintSection = false;
                            scope.lastCheckin.loginCreateFingerprintCapturingSection = true;
                            setTimeout(function() {
                                scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                                scope.lastCheckin.fingerprintRegretSection = true;
                                scope.modelCloseBtnShowHide("show");
                                scope.lastCheckin.loginCreateFingerprintSection = false;
                            }, 6000);
                        }
                        else if(html == "failed adding fingerprint"){
                            scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                            scope.lastCheckin.fingerprintRegretSection2fp = true;
                            scope.modelCloseBtnShowHide("show");
                            scope.lastCheckin.loginCreateFingerprintSection = false;
                         }else{    
                            scope.lastCheckin.somethingWentWrong = false;
                            scope.lastCheckin.fingerprintRegretSection2fp = false;
                            scope.lastCheckin.loginCreateFingerprintSection = false;
                            scope.lastCheckin.loginCreateFingerprintCapturingSection = true;
                            setTimeout(function() {   
                                scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                                scope.lastCheckin.somethingWentWrong = true;
                                scope.lastCheckin.fingerprintBackbutton = true;
                                scope.modelCloseBtnShowHide("show");
                                scope.lastCheckin.loginCreateFingerprintSection = false;
                            }, 6000);
                        }
                             
                    },
                    error : function(xhr, status, error) { 
                        console.log('failures 3'+xhr.responseText);
                    } 
                });
                }
            }

            scope.Capture = function(quality,timeout)
            {
                jkiosk.getKioskConfiguration(function(resp){
                    HigiKioskStorageService.saveSessionData('kioskConfigurationResult', resp);
                    console.log(resp.city);
                });
                 if ($rootScope.hardwareAvailability['Fingerprint']) {
                     JkioskService.fingerprintCapture(scope.fingerprintCallbackResponse); 
                 } else {
                    console.log("Fingerprint Device not detected");
                    $rootScope.somewrong = "global.fingerprintdevicenotconnected";
                    scope.lastCheckin.loginCreateFingerprintCapturingSection = false;
                    scope.lastCheckin.somethingWentWrong = true;
                    scope.lastCheckin.fingerprintBackbutton = true;
                    scope.modelCloseBtnShowHide("show");
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                 }
            }
//Sumithra - Added Fingerprint integration from Backend for Add/Edit Fingerprint in LastCheckin Ends        
           
           scope.testingFunction = function()
           {
                //document.getElementById("fingerprint_capturing_animation_section").style.display = "block";
                var quality = 60; //(1 to 100) (recommanded minimum 55)
                var timeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
                var i = 1; 
                scope.Capture(quality,timeout);
            };

                scope.lastCheckin.showLastCheckin = function(){

                    scope.lastCheckin.checkinDataVisible = true;

                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    //somethingWentWrong
                    scope.lastCheckin.somethingWentWrong = false;
                    scope.lastCheckin.fingerprintRegretSection2fp = false;
                    scope.lastCheckin.fingerprintRegretSectionNew = false;
                    scope.lastCheckin.fingerprintRegretSection = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false; 
                    scope.lastCheckin.checkinAffiliateVisible = false;

                    
                    
                };
                scope.lastCheckin.showEditName = function(){
                    scope.lastCheckin.checkinEditNameVisible = true;
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                    $rootScope.targetFieldSet = $rootScope.fields.nameEntry;
                    $timeout(function(){
                        $rootScope.challengeScroller.refresh();
                    }, 0, false);

                };

                scope.lastCheckin.showAffiliate = function(){
                    scope.lastCheckin.checkinAffiliateVisible = true;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    $rootScope.radioValue = $rootScope.lastCheckin.affiliate;
                    if($rootScope.lastCheckin.affiliate == "" || $rootScope.lastCheckin.affiliate == undefined){
                        $rootScope.radioValue = 'None';
                    }
                    var $radios = $('input:radio[name=affiliateClick]');
                    $radios.filter('[value='+$rootScope.radioValue+']').prop('checked', true);
                    angular.element("#confirm_btn_aff").addClass("active_btn");
                };


                scope.lastCheckin.continueCloseLastCheckin = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_continue_btn', 'button', 'pressed');
                    $rootScope.clearModal();
                    document.getElementById("higi_language_dialog").setAttribute("style", "width:288px;height:224px; z-index: 0;position: absolute;top: 70px;left: 126px;");
                };

                scope.lastCheckin.initiateVitalTests = function () {
                    console.log($rootScope.lastCheckinModalFirstFlow);
                  /*if ($rootScope.lastCheckinModalFirstFlow == undefined) {
                        $rootScope.lastCheckinModalShow = false;
                        $rootScope.lastCheckinModalFirstFlow = false;*/
                        if ($rootScope.IHLTeleConsultSelected == true) {
                            HigiKioskStorageService.saveSessionData('current_mode', "TC");
                            if(HigiKioskUserService.onboardingDone()){
                                // window.location =  "#/ihl-teleconsultation-dashboard";
                                window.location =  "#/ihl-teleconsultation-main-dashboard";
                                $rootScope.clearModal();
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
                                $rootScope.clearModal();
                                window.location =  "#/onboarding1/forward/enter";
                            }
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
                    /*}else{
                        JkioskService.logEvent($rootScope.currentKeyboardState + '_continue_btn', 'button', 'pressed');
                        $rootScope.clearModal();
                    }*/
                }

                scope.lastCheckin.checkPaymentFlow = function(){
                    if($rootScope.selectedVital.length > 0 && $rootScope.kioskWithPaymentMode && $rootScope.isEmailLoginUserFreeServiceEnable){
                        scope.lastCheckin.checkFreeAccess()
                        .then(() => {
                            scope.lastCheckin.getPaymentFlow();
                        })
                        .catch((error) => {
                            scope.lastCheckin.getPaymentFlow();
                        });
                    }else{
                        scope.lastCheckin.getPaymentFlow();
                    }                    
                }

                $rootScope.abhaCloseCheckPaymentFlow = scope.lastCheckin.checkPaymentFlow;

                scope.lastCheckin.saveUpdatedSex = function(){
                    $rootScope.lastCheckin.gender = (HigiKioskStorageService.returnSessionData('gender') == "m") ? 'welcomeModals.printmalegender' :  ((HigiKioskStorageService.returnSessionData('gender') == "f") ? 'welcomeModals.printfemalegender' : 'global.trans');
                    scope.lastCheckin.onServer = HigiKioskStorageService.returnSessionData('user');
                    scope.lastCheckin.userUpdate = HigiKioskUserService.compareUser(scope.lastCheckin.onServer,HigiKioskStorageService.returnSessionData);
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_genderSaveBtn', 'button', 'pressed');
                    if ((HigiKioskStorageService.returnSessionData('logged_in') == true) && (scope.lastCheckin.userUpdate != null)) {

                        JkioskService.registerKiosk();
                        HigiApiService.UpdateUserAsync(scope.lastCheckin.onServer.id, scope.lastCheckin.userUpdate,
                            function () {
                                scope.lastCheckin.onServer.gender = HigiKioskStorageService.returnSessionData('gender');
                                $rootScope.lastCheckin.gender = (HigiKioskStorageService.returnSessionData('gender') == "m") ? 'welcomeModals.printmalegender' : ((HigiKioskStorageService.returnSessionData('gender') == "f") ? 'welcomeModals.printfemalegender' : 'global.trans');
                                console.log('updated gender')
                                if($rootScope.user.photo == undefined){
                                    if($rootScope.lastCheckin.gender == "welcomeModals.printmalegender")
                                    {
                                        $rootScope.lastCheckin.userImg = 'images/userprofile.png';
                                        $rootScope.disabledUserProfile = 'images/disableduserprofile.png';
                                    }else
                                    {
                                        $rootScope.lastCheckin.userImg = 'images/userprofilefemale.png';
                                        $rootScope.disabledUserProfile = 'images/disableduserprofilefemale.png';
                                    }
                                }
                                
                            },
                            function () {
                                //alert('failed')
                            });
                    }
                    scope.lastCheckin.showLastCheckin();
                };
                scope.lastCheckin.saveUpdatedHeight = function(){
                    HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height'));
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_heightSaveBtn', 'button', 'pressed');
                    scope.lastCheckin.onServer = HigiKioskStorageService.returnSessionData('user');
                    scope.lastCheckin.userUpdate = HigiKioskUserService.compareUser(scope.lastCheckin.onServer,HigiKioskStorageService.returnSessionData);
                    if ((HigiKioskStorageService.returnSessionData('logged_in') == true) && (scope.lastCheckin.userUpdate != null)) {
                        JkioskService.registerKiosk();
                        HigiApiService.UpdateUserAsync(scope.lastCheckin.onServer.id, scope.lastCheckin.userUpdate,
                            function () {
                                console.log('height update saved');
                            },
                            function () {
                                console.log('height update failed update failed');
                            });
                    }
                    scope.lastCheckin.height = HigiKioskUtilitiesService.convertToFeetFoot(HigiKioskStorageService.returnSessionData('height')) + '&#146;' + HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height')) + '&#148;';
                    scope.lastCheckin.showLastCheckin();
                };

                scope.lastCheckin.saveUpdatedWaistCircumference = function(){
                    var userId = HigiKioskStorageService.returnSessionData('affiliateUserId');
                    var json = HigiKioskStorageService.returnSessionData('loginResp');
                    var waistcircumference = HigiKioskStorageService.returnSessionData('waistcircumference');
                    console.log(userId);
                    console.log(json);
                    json.User.waistCircumference = waistcircumference;
                    HigiKioskStorageService.saveSessionData('waistcircumference',waistcircumference);
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/user/"+userId+"",
                        type : "POST", 
                        cache: false,
                        data:JSON.stringify(json.User),
                        contentType: 'application/json; charset=UTF-8',  
                        dataType: 'json',
                        headers: { 'ApiToken': HigiApiKey , 'Token': json.Token},
                        success: function(html){
                            console.log(html);
                            $rootScope.lastCheckin.waistCircumference = waistcircumference;
                        },
                        error : function(xhr, status, error) { 
                            console.log(error);
                            console.log(status);
                            console.log('failures 3'+xhr.responseText);
                        } 
                    });
                    scope.lastCheckin.waistCircumference = HigiKioskStorageService.returnSessionData('waistcircumference');
                    scope.lastCheckin.showLastCheckin();
                };
                
                scope.lastCheckin.saveUpdatedAffiliate = function(){

                    //alert(HigiApiKey);
                    //alert($rootScope.user.id);

                    var userId = HigiKioskStorageService.returnSessionData('affiliateUserId');
                    var json = HigiKioskStorageService.returnSessionData('loginResp');
                    console.log(userId);
                    console.log(json);
                    if($rootScope.affiliatedOrg == "None"){
                        $rootScope.affiliatedOrg = "";
                    }
                    json.User.affiliate = $rootScope.affiliatedOrg;
                    $("#affiliateUpdatingModal").show();
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/user/"+userId+"",
                        type : "POST", 
                        cache: false,
                        data:JSON.stringify(json.User),
                        contentType: 'application/json; charset=UTF-8',  
                        dataType: 'json',
                        headers: { 'ApiToken': HigiApiKey , 'Token': json.Token},
                        success: function(html){
                            // alert("success DELTEE Completed");
                            console.log(html);
                            $rootScope.lastCheckin.affiliate = $rootScope.affiliatedOrg;

                            $timeout(function(){
                               $rootScope.affPlwait = "global.affilateUpdateYeah";
                               $rootScope.affilateUpdateProcess = "global.affilateUpdateSuccess";
                            },100);  

                            $timeout(function(){
                               $("#affiliateUpdatingModal").hide();
                            },2000);
                            // alert("delete completed");                          
                        },
                        error : function(xhr, status, error) { 
                            console.log(error);
                            console.log(status);
                            console.log('failures 3'+xhr.responseText);

                            $timeout(function(){
                               $rootScope.affPlwait = "global.affilateUpdateOops";
                               $rootScope.affilateUpdateProcess = "global.affilateUpdateFailed";
                            },100);  

                            $timeout(function(){
                               $("#affiliateUpdatingModal").hide();
                            },2000);
                        } 
                    });
                    scope.lastCheckin.showLastCheckin();
                    $('input[name=affiliateClick]').attr('checked',false);
                    $rootScope.affPlwait = "global.affilateUpdatePlwait";
                    $rootScope.affilateUpdateProcess = "global.affilateUpdateProcess";
                };



                $rootScope.setLastCheckinDisplay = scope.lastCheckin.showLastCheckin;


                HigiKioskUserService.setLastCheckinData();
                //$http.get('docs/challenge_terms/challenge_terms.html').success(function(data){
                //    scope.lastCheckin.disclaimerText = $sce.getTrustedHtml(data);
                //});
                scope.showCheckIn("last_checkin");
            };

            /*$rootScope.checkinCheck = function(){
                scope.showCheckIn("all_checkin");
            }*/

            scope.showCheckIn = function(section){
                //alert("inside the showCheckIn fn = " + section);
                if(section == "last_checkin"){
                    scope.last_checkin = true;
                    scope.all_checkin = false;
                    scope.last_medication = false;                    
                    let last_checkin_tab_scroll = document.getElementById("last_checkin_id");
                    last_checkin_tab_scroll.scrollTo({top: 0, behavior: 'smooth'});
                    
                } else if(section == "all_checkin"){
                    scope.last_checkin = false;
                    scope.all_checkin = true;
                    scope.last_medication = false;

                    scope.loadingImg = true;
                    
                    // load the old data
                    if(scope.allCheckinData){
                        scope.loadingImg = false;                      
                    } else {
                        if(HigiKioskStorageService.returnSessionData('logged_in')){
                            HigiApiService.GetCheckInsAsync(HigiKioskStorageService.returnSessionData('affiliateUserId'), function(data) {
                                if(Array.isArray(data) && data.length > 0){                                
                                    data.map(data => {
                                        if(data != null) {
                                            if(data.temperature != "" && data.temperature != null) {
                                                let temp = HigiKioskUtilitiesService.convertToFarrantHeat(data.temperature);
                                                data.temperatureInFaranheit = temp;
                                            }
                                        }
                                    });
                                    scope.allCheckinData = scope.allCheckInDataSplit(data);
                                    /*scope.allCheckinData = scope.allCheckinData.filter((item) => {
                                        if(item['spo2'] != undefined || item['pulseBpm'] != undefined || item['systolic'] != undefined || item['bmi'] != undefined || item['temperature'] != undefined || item['body_fat_mass'] != undefined || item['ECGBpm'] != undefined){
                                            return item;
                                        }
                                    })*/
                                } else {
                                   // alert("unable to fetch the data");
                                }
                                scope.loadingImg = false;                          
                            });
                        }                         
                    }
                    let vital_history_tab_scroll = document.getElementById("all_checkin_id");
                    vital_history_tab_scroll.scrollTo({top: 0, behavior: 'smooth'});

                } else if(section == "last_medication"){
                    scope.last_checkin = false;
                    scope.all_checkin = false;
                    scope.last_medication = true;
                    
                    scope.medicationLoadingImg = true;
                    scope.medAPIerror = false;                       
                    
                    // load the old data
                    if(scope.medicationData){
                        scope.medicationLoadingImg = false; 
                        scope.medAPIerror = false;                       
                    } else {
                        HigiApiService.getTeleConsultUserData(HigiKioskStorageService.returnSessionData('affiliateUserId'), function(data) {
                            console.log(data);
                            console.log(typeof data);
                            if(typeof data === 'object'){
                                if(data.consultation_history != undefined){
                                    scope.medicationData = data.consultation_history;
                                    scope.medicationData.sort((a,b) => {
                                        return new Date(b.appointment_details.appointment_start_time) - new Date(a.appointment_details.appointment_start_time);
                                    });
                                    scope.medicationData.map(data => {
                                        let value = data.appointment_details.appointment_start_time;
                                        data.appointment_details.appointment_start_time = new Date(value.split(' ')[0]).toString().split(' ');

                                        const date = new Date(value);
                                        const formattedTime = date.toLocaleString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
                                        data.appointment_details.start_time = formattedTime;
                                        //naming the print button labels
                                        let errorList = [null, undefined, ""];
                                        if(data.consultant_details.vendor_id.toLowerCase() === "ihl") {
                                            if(errorList.includes(data.consultant_notes.advice_to_patient) || errorList.includes(data.consultant_notes.diagnosis)) data.hidePrintBtn = true;
                                            else data.hidePrintBtn = false;
                                            data.printBtnLabel = $rootScope.print_prescription_2;
                                        }
                                        else if(data.consultant_details.vendor_id.toLowerCase() === "apollo" || data.consultant_details.vendor_id.toLowerCase() === "genix") {
                                            if(data.consultant_notes.medication.length == 0 || data.consultant_notes.medication == null) data.hidePrintBtn = true;
                                            else data.hidePrintBtn = false;
                                            data.printBtnLabel = $rootScope.print_prescription_1;
                                        }
                                        else data.printBtnLabel = $rootScope.print_vital;
                                    });  
                                } else {
                                    scope.medicationData = [];
                                }
                            } else {
                                //alert("unable to fetch the data");
                                scope.medicationData = [];
                            }
                            scope.medicationLoadingImg = false;                            
                            scope.medAPIerror = false;
                        }, function(error) {
                            scope.medicationLoadingImg = false;   
                            scope.medAPIerror = true;                         
                        }); 
                    } 
                    let med_history_tab_scroll = document.getElementById("last_medication_id");
                    med_history_tab_scroll.scrollTo({top: 0, behavior: 'smooth'});
                }
            }            

            scope.accordionClick = function(index) {
                for (var i = 0; i < scope.allCheckinData.length; i++) {
                    let vitalAccIcon = document.getElementById("vital_accordion_image_"+i);                                                            
                    if(index == i){
                        $("#panel_"+i).toggle();             
                        vitalAccIcon.classList.toggle("rotateAccIcon");                                    
                    } else {                  
                        $("#panel_"+i).hide();                        
                        vitalAccIcon.classList.remove("rotateAccIcon");
                    }                    
                }       
                //adding class name to the vital status

                // Ivt Dengue
                if(scope.allCheckinData[index].dengue_IgG != undefined) {

                    if(scope.allCheckinData[index].dengue_IgG.toLowerCase() == 'positive' && scope.allCheckinData[index].dengue_IgM.toLowerCase() == 'positive'){
                        scope.dengueIgGClassName = 'den_mal_risk';
                        scope.dengueIgMClassName = 'den_mal_risk';
                        scope.dengueStatusClassName = 'den_mal_risk';
                        scope.dengueStatus = 'Positive';
                    } else if(scope.allCheckinData[index].dengue_IgG.toLowerCase() == 'positive' && scope.allCheckinData[index].dengue_IgM.toLowerCase() == 'negative'){
                        scope.dengueIgGClassName = 'den_mal_risk';
                        scope.dengueIgMClassName = 'den_mal_healthy';
                        scope.dengueStatusClassName = 'den_mal_consult';
                        scope.dengueStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].dengue_IgG.toLowerCase() == 'negative' && scope.allCheckinData[index].dengue_IgM.toLowerCase() == 'positive'){
                        scope.dengueIgGClassName = 'den_mal_healthy';
                        scope.dengueIgMClassName = 'den_mal_risk';
                        scope.dengueStatusClassName = 'den_mal_consult';
                        scope.dengueStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].dengue_IgG.toLowerCase() == 'negative' && scope.allCheckinData[index].dengue_IgM.toLowerCase() == 'negative'){
                        scope.dengueIgGClassName = 'den_mal_healthy';
                        scope.dengueIgMClassName = 'den_mal_healthy';
                        scope.dengueStatusClassName = 'den_mal_healthy';
                        scope.dengueStatus = 'Negative';
                    }
                }

                // Ivt Malaria
                if(scope.allCheckinData[index].malaria_p_f != undefined) {

                    if(scope.allCheckinData[index].malaria_p_f.toLowerCase() == 'positive' && scope.allCheckinData[index].malaria_p_v.toLowerCase() == 'positive'){
                        scope.malariaPfClassName = 'den_mal_risk';
                        scope.malariaPvClassName = 'den_mal_risk';
                        scope.malariaStatusClassName = 'den_mal_risk';
                        scope.malariaStatus = 'Positive';
                    } else if(scope.allCheckinData[index].malaria_p_f.toLowerCase() == 'positive' && scope.allCheckinData[index].malaria_p_v.toLowerCase() == 'negative'){
                        scope.malariaPfClassName = 'den_mal_risk';
                        scope.malariaPvClassName = 'den_mal_healthy';
                        scope.malariaStatusClassName = 'den_mal_consult';
                        scope.malariaStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].malaria_p_f.toLowerCase() == 'negative' && scope.allCheckinData[index].malaria_p_v.toLowerCase() == 'positive'){
                        scope.malariaPfClassName = 'den_mal_healthy';
                        scope.malariaPvClassName = 'den_mal_risk';
                        scope.malariaStatusClassName = 'den_mal_consult';
                        scope.malariaStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].malaria_p_f.toLowerCase() == 'negative' && scope.allCheckinData[index].malaria_p_v.toLowerCase() == 'negative'){
                        scope.malariaPfClassName = 'den_mal_healthy';
                        scope.malariaPvClassName = 'den_mal_healthy';
                        scope.malariaStatusClassName = 'den_mal_healthy';
                        scope.malariaStatus = 'Negative';
                    }
                }

                // Ivt HIV
                if(scope.allCheckinData[index].hiv_I != undefined) {

                    if(scope.allCheckinData[index].hiv_I.toLowerCase() == 'positive' && scope.allCheckinData[index].hiv_II.toLowerCase() == 'positive'){
                        scope.hivIClassName = 'den_mal_risk';
                        scope.hivIIClassName = 'den_mal_risk';
                        scope.hivStatusClassName = 'den_mal_risk';
                        scope.hivStatus = 'Positive';
                    } else if(scope.allCheckinData[index].hiv_I.toLowerCase() == 'positive' && scope.allCheckinData[index].hiv_II.toLowerCase() == 'negative'){
                        scope.hivIClassName = 'den_mal_risk';
                        scope.hivIIClassName = 'den_mal_healthy';
                        scope.hivStatusClassName = 'den_mal_consult';
                        scope.hivStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].hiv_I.toLowerCase() == 'negative' && scope.allCheckinData[index].hiv_II.toLowerCase() == 'positive'){
                        scope.hivIClassName = 'den_mal_healthy';
                        scope.hivIIClassName = 'den_mal_risk';
                        scope.hivStatusClassName = 'den_mal_consult';
                        scope.hivStatus = 'Consult Dr.';
                    } else if(scope.allCheckinData[index].hiv_I.toLowerCase() == 'negative' && scope.allCheckinData[index].hiv_II.toLowerCase() == 'negative'){
                        scope.hivIClassName = 'den_mal_healthy';
                        scope.hivIIClassName = 'den_mal_healthy';
                        scope.hivStatusClassName = 'den_mal_healthy';
                        scope.hivStatus = 'Negative';
                    }
                }

                // Ivt HCV
                if(scope.allCheckinData[index].hcv != undefined) {

                    if(scope.allCheckinData[index].hcv.toLowerCase() == 'positive'){
                        scope.hcvStatusClassName = 'den_mal_risk';
                        scope.hcvStatus = 'Positive';
                    } else if(scope.allCheckinData[index].hcv.toLowerCase() == 'negative'){
                        scope.hcvStatusClassName = 'den_mal_healthy';
                        scope.hcvStatus = 'Negative';
                    }
                }

                // Ivt Pregnancy
                if(scope.allCheckinData[index].pregnancy != undefined) {

                    if(scope.allCheckinData[index].pregnancy.toLowerCase() == 'positive'){
                        scope.pregStatusClassName = 'den_mal_healthy';
                        scope.pregStatus = 'Positive';
                    } else if(scope.allCheckinData[index].pregnancy.toLowerCase() == 'negative'){
                        scope.pregStatusClassName = 'den_mal_risk';
                        scope.pregStatus = 'Negative';
                    }
                }

                // Ivt Troponin
                if(scope.allCheckinData[index].troponin != undefined) {

                    if(scope.allCheckinData[index].troponin.toLowerCase() == 'positive'){
                        scope.tropStatusClassName = 'den_mal_risk';
                        scope.tropStatus = 'Positive';
                    } else if(scope.allCheckinData[index].troponin.toLowerCase() == 'negative'){
                        scope.tropStatusClassName = 'den_mal_healthy';
                        scope.tropStatus = 'Negative';
                    }
                }

                // Ivt Syphilis
                if(scope.allCheckinData[index].syphilis != undefined) {

                    if(scope.allCheckinData[index].syphilis.toLowerCase() == 'positive'){
                        scope.syphStatusClassName = 'den_mal_risk';
                        scope.syphStatus = 'Positive';
                    } else if(scope.allCheckinData[index].syphilis.toLowerCase() == 'negative'){
                        scope.syphStatusClassName = 'den_mal_healthy';
                        scope.syphStatus = 'Negative';
                    }
                }

                // Ivt Glucose Random
                if(scope.allCheckinData[index].glucose_random_class != undefined) {
                    scope.glcResult = scope.allCheckinData[index].glucose_random;
                    scope.glcResultText = "Glucose Random";

                    if(scope.allCheckinData[index].glucose_random_class.toLowerCase() == 'normal'){
                        scope.glcStatusClassName = 'den_mal_healthy';
                        scope.glcStatus = 'Normal';
                    } else if(scope.allCheckinData[index].glucose_random_class.toLowerCase() == 'diabetes'){
                        scope.glcStatusClassName = 'den_mal_risk';
                        scope.glcStatus = 'Diabetes';
                    }
                }

                // Ivt Glucose Fasting
                if(scope.allCheckinData[index].glucose_fasting_class != undefined) {
                    scope.glcResult = scope.allCheckinData[index].glucose_fasting;
                    scope.glcResultText = "Glucose Random";

                    if(scope.allCheckinData[index].glucose_fasting_class.toLowerCase() == 'normal'){
                        scope.glcStatusClassName = 'den_mal_healthy';
                        scope.glcStatus = 'Normal';
                    } else if(scope.allCheckinData[index].glucose_fasting_class.toLowerCase() == 'diabetes'){
                        scope.glcStatusClassName = 'den_mal_risk';
                        scope.glcStatus = 'Diabetes';
                    } else if(scope.allCheckinData[index].glucose_fasting_class.toLowerCase() == 'pre-diabetes'){
                        scope.glcStatusClassName = 'den_mal_consult';
                        scope.glcStatus = 'Pre-Diabetes';
                    }
                }

                // Ivt Glucose Prandial
                if(scope.allCheckinData[index].glucose_prandial_class != undefined) {
                    scope.glcResult = scope.allCheckinData[index].glucose_prandial;
                    scope.glcResultText = "Glucose Prandial";

                    if(scope.allCheckinData[index].glucose_prandial_class.toLowerCase() == 'normal'){
                        scope.glcStatusClassName = 'den_mal_healthy';
                        scope.glcStatus = 'Normal';
                    } else if(scope.allCheckinData[index].glucose_prandial_class.toLowerCase() == 'diabetes'){
                        scope.glcStatusClassName = 'den_mal_risk';
                        scope.glcStatus = 'Diabetes';
                    } else if(scope.allCheckinData[index].glucose_prandial_class.toLowerCase() == 'pre-diabetes'){
                        scope.glcStatusClassName = 'den_mal_consult';
                        scope.glcStatus = 'Pre-Diabetes';
                    }
                }

                // Ivt Heamoglobin
                if(scope.allCheckinData[index].heamoglobin_class != undefined) {

                    if(scope.allCheckinData[index].heamoglobin_class.toLowerCase() == 'normal'){
                        scope.heamoStatusClassName = 'den_mal_healthy';
                        scope.heamoStatus = 'Normal';
                    } else if(scope.allCheckinData[index].heamoglobin_class.toLowerCase() == 'high'){
                        scope.heamoStatusClassName = 'den_mal_risk';
                        scope.heamoStatus = 'High';
                    } else if(scope.allCheckinData[index].heamoglobin_class.toLowerCase() == 'low'){
                        scope.heamoStatusClassName = 'den_mal_consult';
                        scope.heamoStatus = 'Low';
                    } else if(scope.allCheckinData[index].heamoglobin_class.toLowerCase() == 'acceptable'){
                        scope.heamoStatusClassName = 'den_mal_consult';
                        scope.heamoStatus = 'Acceptable';
                    } else if(scope.allCheckinData[index].heamoglobin_class.toLowerCase() == 'very low'){
                        scope.heamoStatusClassName = 'den_mal_consult';
                        scope.heamoStatus = 'Very Low';
                    }
                }

                // Ivt Lipid
                if(scope.allCheckinData[index].lipid_profile_tc_class != undefined) {

                    if(scope.allCheckinData[index].lipid_profile_tc_class.toLowerCase() == 'normal'){
                        scope.lipTcStatusClassName = 'den_mal_healthy';
                        scope.lipTcStatus = 'Normal';
                    } else if(scope.allCheckinData[index].lipid_profile_tc_class.toLowerCase() == 'high'){
                        scope.lipTcStatusClassName = 'den_mal_risk';
                        scope.lipTcStatus = 'High';
                    } else if(scope.allCheckinData[index].lipid_profile_tc_class.toLowerCase() == 'borderline high'){
                        scope.lipTcStatusClassName = 'den_mal_borderline';
                        scope.lipTcStatus = 'Borderline High';
                    }

                    if(scope.allCheckinData[index].lipid_profile_hg_class.toLowerCase() == 'normal'){
                        scope.lipHgStatusClassName = 'den_mal_healthy';
                        scope.lipHgStatus = 'Normal';
                    } else if(scope.allCheckinData[index].lipid_profile_hg_class.toLowerCase() == 'low'){
                        scope.lipHgStatusClassName = 'den_mal_risk';
                        scope.lipHgStatus = 'Low';
                    } else if(scope.allCheckinData[index].lipid_profile_hg_class.toLowerCase() == 'borderline low'){
                        scope.lipHgStatusClassName = 'den_mal_borderline';
                        scope.lipHgStatus = 'Borderline Low';
                    }

                    if(scope.allCheckinData[index].lipid_profile_tg_class.toLowerCase() == 'normal'){
                        scope.lipTgStatusClassName = 'den_mal_healthy';
                        scope.lipTgStatus = 'Normal';
                    } else if(scope.allCheckinData[index].lipid_profile_tg_class.toLowerCase() == 'high'){
                        scope.lipTgStatusClassName = 'den_mal_risk';
                        scope.lipTgStatus = 'High';
                    } else if(scope.allCheckinData[index].lipid_profile_tg_class.toLowerCase() == 'borderline high'){
                        scope.lipTgStatusClassName = 'den_mal_borderline';
                        scope.lipTgStatus = 'Borderline High';
                    }

                    if(scope.allCheckinData[index].lipid_profile_ldl_class.toLowerCase() == 'high'){
                        scope.lipLdlStatusClassName = 'den_mal_risk';
                        scope.lipLdlStatus = 'High';
                    } else if(scope.allCheckinData[index].lipid_profile_ldl_class.toLowerCase() == 'borderline high'){
                        scope.lipLdlStatusClassName = 'den_mal_borderline';
                        scope.lipLdlStatus = 'Borderline High';
                    }else {
                        scope.lipLdlStatusClassName = 'den_mal_healthy';
                        scope.lipLdlStatus = 'Normal';
                    }

                }

                //spo2
                if(scope.allCheckinData[index].spo2Class != undefined){
                    /*if (HigiKioskUtilitiesService.calculateSpO2Risk(scope.allCheckinData[index].spo2) == 'Healthy') {
                        scope.allCheckinData[index].spo2StatusClassName = 'spo2_healthy';
                        scope.allCheckinData[index].spo2_status_info = "lastcheckin.spo2_status_acceptable";
                    }
                    else if (HigiKioskUtilitiesService.calculateSpO2Risk(scope.allCheckinData[index].spo2) == 'Check With Healthcare Provider') {
                        scope.allCheckinData[index].spo2StatusClassName = 'spo2_atrisk';
                        scope.allCheckinData[index].spo2_status_info = "lastcheckin.spo2_status_check_healthcare_provider";
                    }*/
                    if(scope.allCheckinData[index].spo2Class.toLowerCase() == 'healthy') {
                        scope.spo2StatusClassName = 'spo2_healthy';
                        scope.spo2_status_info = "lastcheckin.bodyfat_status_healthy";
                    } 
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == "normal") {
                        scope.spo2StatusClassName = 'spo2_healthy';
                        scope.spo2_status_info = "lastcheckin.basal_metabolic_rate_status_normal";
                    }
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == 'acceptable') {
                        scope.spo2StatusClassName = 'spo2_acceptable';
                        scope.spo2_status_info = "lastcheckin.bp_status_acceptable";
                    }
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == 'at-risk') {
                        scope.spo2StatusClassName = 'spo2_atrisk';
                        scope.spo2_status_info = "lastcheckin.bp_status_atrisk";
                    }
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == 'low') {
                        scope.spo2StatusClassName = 'spo2_low';
                        scope.spo2_status_info = "lastcheckin.bp_status_low";
                    }
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == "it’s beyond range please check with health provider") {
                        scope.spo2StatusClassName = 'spo2_atrisk';
                        // scope.spo2_status_info = "lastcheckin.spo2_status_check_healthcare_provider";
                        scope.spo2_status_info = "lastcheckin.bp_status_atrisk";
                    }
                    else if(scope.allCheckinData[index].spo2Class.toLowerCase() == 'check with healthcare provider') {
                        scope.spo2StatusClassName = 'spo2_atrisk';
                        // scope.spo2_status_info = "lastcheckin.spo2_status_check_healthcare_provider";
                        scope.spo2_status_info = "lastcheckin.bp_status_atrisk";
                    }
                    else {
                        scope.spo2StatusClassName = '';
                        scope.spo2_status_info = '';
                    }
                }

                //temperature
                if(scope.allCheckinData[index].temperatureClass != undefined){
                    if(scope.allCheckinData[index].temperatureClass == ""){
                        scope.allCheckinData[index].temperatureClass = HigiKioskVitalReference.calculateTempRiskForUI("", HigiKioskUtilitiesService.convertToFarrantHeat(scope.allCheckinData[index].temperature));                    }
                    /*if (scope.allCheckinData[index].temperatureClass =='Acceptable') {
                        scope.tempStatusClassName = 'temp_acceptable';
                        scope.temperature_status_info = "lastcheckin.temp_status_acceptable";
                    }
                    else if (scope.allCheckinData[index].temperatureClass =='Fever') {
                        scope.tempStatusClassName = 'temp_fever';
                        scope.temperature_status_info = "lastcheckin.temp_status_fever";
                    }*/
                    if(scope.allCheckinData[index].temperatureClass == 'Normal'){
                        scope.tempStatusClassName = 'temp_normal';
                        scope.temperature_status_info = "welcomeModals.status.normal";
                    }else if(scope.allCheckinData[index].temperatureClass =='Acceptable'){
                        scope.tempStatusClassName = 'temp_acceptable';
                        scope.temperature_status_info = "lastcheckin.bp_status_acceptable";
                    }else if(scope.allCheckinData[index].temperatureClass =='Fever'){
                        scope.tempStatusClassName = 'temp_fever';
                        scope.temperature_status_info = "lastcheckin.temp_status_fever";
                    }else if(scope.allCheckinData[index].temperatureClass =='High'){
                        scope.tempStatusClassName = 'temp_highfever';
                       scope.temperature_status_info = "lastcheckin.temp_status_highfever";
                    }else if(scope.allCheckinData[index].temperatureClass =='Low'){
                        scope.tempStatusClassName = 'temp_acceptable';
                        scope.temperature_status_info = "lastcheckin.spo2_status_low";
                    }
                    else {
                        scope.tempStatusClassName = '';
                        scope.temperature_status_info = "";
                    }    
                }
                
                    //blood pressure
                    /* if(scope.allCheckinData[index].systolic != undefined){
                        if (HigiKioskUtilitiesService.calculateBpRisk(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'acceptable') {
                            scope.allCheckinData[index].bpStatusClassName = 'normal';
                            scope.allCheckinData[index].bp_status_info = 'lastcheckin.bp_status_acceptable';
                        } else if(HigiKioskUtilitiesService.calculateBpRisk(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'recheck or consult a healthcare provider'){
                            scope.allCheckinData[index].bpStatusClassName = 'high';
                            scope.allCheckinData[index].bp_status_info = 'lastcheckin.recheck_consult_healthcare_provider';
                        } else {
                            scope.allCheckinData[index].bpStatusClassName = 'empty';
                            scope.allCheckinData[index].bp_status_info = 'empty';
                        }    
                    }*/
                    
                    if(scope.allCheckinData[index].systolic != undefined){
                        if (HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'high') {
                            scope.all.bpStatusClassName = 'high';
                            scope.bp_status_info = 'lastcheckin.bp_status_high';
                        }
                        else if (HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'atrisk') {
                            scope.bpStatusClassName = 'atrisk';
                            scope.bp_status_info = 'lastcheckin.bp_status_atrisk';
                        }
                        else if (HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'Normal') {
                            scope.bpStatusClassName = 'normal';
                            scope.bp_status_info = 'welcomeModals.status.normal';
                        }
                        else if (HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'low') {
                            scope.bpStatusClassName = 'low';
                            scope.bp_status_info = 'lastcheckin.bp_status_low';

                        }
                        else if (HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'acceptable') {
                            scope.bpStatusClassName = 'bp_acceptable';
                            scope.bp_status_info = 'lastcheckin.bp_status_acceptable';
                        }
                        else if(HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'stage 1 hypertension') {
                            scope.bpStatusClassName = 'high';
                            scope.bp_status_info = 'lastcheckin.bp_status_stage_1_hypertension';
                        }
                        else if(HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'stage 2 hypertension') {
                            scope.bpStatusClassName = 'high';
                            scope.bp_status_info = 'lastcheckin.bp_status_stage_2_hypertension';
                        }
                        else if(HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == "beyond reference range , recheck or consult a healthcare provider") {
                            scope.bpStatusClassName = 'high';
                            // scope.bp_status_info = 'lastcheckin.recheck_consult_healthcare_provider';
                            scope.bp_status_info = 'lastcheckin.bp_status_high';
                        }
                        else if(HigiKioskVitalReference.calculateBpRiskForUI(scope.allCheckinData[index].systolic, scope.allCheckinData[index].diastolic) == 'recheck or consult a healthcare provider') {
                            scope.bpStatusClassName = 'high';
                            // scope.bp_status_info = 'lastcheckin.recheck_consult_healthcare_provider';
                            scope.bp_status_info = 'lastcheckin.bp_status_high';
                        }
                        else {
                            scope.bpStatusClassName = '';
                            scope.bp_status_info = '';
                        }
                    }
                    //pulse

                    /* if (scope.allCheckinData[index].pulseBpm != undefined) {
                        if (HigiKioskUtilitiesService.calculatePulseRisk(scope.allCheckinData[index].pulseBpm) == 'acceptable') {
                            scope.allCheckinData[index].pulseStatusClassName = 'normal';
                            scope.allCheckinData[index].pulse_status_info = 'lastcheckin.pulse_status_acceptable';
                        }
                        else if (HigiKioskUtilitiesService.calculatePulseRisk(scope.allCheckinData[index].pulseBpm) == 'check with healthcare provider') {
                            scope.allCheckinData[index].pulseStatusClassName = 'high';
                            scope.allCheckinData[index].pulse_status_info = 'lastcheckin.pulse_status_check_healthcare_provider';
                        }
                    }*/

                    if (scope.allCheckinData[index].pulseBpm != undefined) {
                        if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == 'High') {
                            scope.allCheckinData.pulseStatusClassName = 'high';
                            scope.allCheckinData.pulse_status_info = 'lastcheckin.bp_status_high';
                        }
                        else if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == 'Low') {
                            scope.allCheckinData[index].pulseStatusClassName = 'low';
                            scope.allCheckinData[index].pulse_status_info = 'lastcheckin.bp_status_low';
                        }
                        else if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == 'Normal') {
                            scope.allCheckinData[index].pulseStatusClassName = 'normal';
                            scope.allCheckinData[index].pulse_status_info = 'welcomeModals.status.normal';
                        }
                        else if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == "acceptable") {
                            scope.allCheckinData[index].pulseStatusClassName = 'normal';
                            scope.allCheckinData[index].pulse_status_info = 'welcomeModals.status.normal';
                        }
                        else if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == "beyond range , please check with health care provider") {
                            scope.allCheckinData[index].pulseStatusClassName = 'high';
                            scope.allCheckinData[index].pulse_status_info = 'lastcheckin.pulse_status_check_healthcare_provider';
                        }
                        else if (HigiKioskVitalReference.calculatePulseRiskForUI(scope.allCheckinData[index].pulseBpm) == 'check with healthcare provider') {
                            scope.allCheckinData[index].pulseStatusClassName = 'high';
                            // scope.pulse_status_info = 'lastcheckin.pulse_status_check_healthcare_provider';
                            scope.allCheckinData[index].pulse_status_info = 'lastcheckin.bp_status_high';
                        } 
                        else {
                            scope.allCheckinData[index].pulseStatusClassName = '';
                            scope.allCheckinData[index].pulse_status_info = '';
                        }
                    }
                    //bmi
                    if (scope.allCheckinData[index].bmiClass == 'Low') {
                        scope.bmiStatusClassName = 'atrisk';
                        scope.bmi_status_info = 'lastcheckin.bmi_status_underweight';
                    }
                    else if (scope.allCheckinData[index].bmiClass == 'Normal') {
                        scope.bmiStatusClassName = 'normal';
                        scope.bmi_status_info = 'welcomeModals.status.normal';
                    }
                    else if (scope.allCheckinData[index].bmiClass == 'overweight') {
                        scope.bmiStatusClassName = 'atrisk';
                        scope.bmi_status_info = 'lastcheckin.bmi_status_overweight';
                    }
                    else if (scope.allCheckinData[index].bmiClass == 'High') {
                        scope.bmiStatusClassName = 'high';
                        scope.bmi_status_info = 'lastcheckin.waist_hip_ratio_status_high';
                    } else {
                        scope.bmiStatusClassName = '';
                        scope.bmi_status_info = '';
                    }
                    //ecg 
                    if (scope.allCheckinData[index].ECGData != undefined && scope.allCheckinData[index].ECGData != 0 && scope.allCheckinData[index].ECGData != null) {
                        if(scope.allCheckinData[index].leadTwoStatus == "High Pulse" || scope.allCheckinData[index].leadTwoStatus == "Low Pulse" || scope.allCheckinData[index].leadTwoStatus == "Low" || scope.allCheckinData[index].leadTwoStatus == "High"){
                            scope.ecgStatusClassName = 'req_doc_attention';
                            //scope.ecgadvice = 'Req. Doctor Consult';
                            scope.ecgadvice = 'lastcheckin.ecg_status_atten_need';
                        } else if(scope.allCheckinData[index].leadTwoStatus == "Normal" || scope.allCheckinData[index].leadTwoStatus == "Normal Sinus Rhythm"){
                            scope.ecgStatusClassName = 'ECG_Normal';
                            //scope.ecgadvice = 'Normal';
                            scope.ecgadvice = 'welcomeModals.status.normal';
                        } else {
                            scope.ecgStatusClassName = '';
                            scope.ecgadvice = '';
                        }
                    } else {
                        scope.ecgStatusClassName = '';
                        scope.ecgadvice = '';
                    }
                    //bmc
                    if (scope.allCheckinData[index].fatClass == 'atrisk') {
                        scope.bmcStatusClassName = 'vitalhistory_bodyfat_at_risk';
                        //scope.bmcstatusInfo = 'At Risk';
                        scope.bmcstatusInfo = 'lastcheckin.bp_status_atrisk';
                    }
                    else if (scope.allCheckinData[index].fatClass == 'acceptable') {
                        scope.bmcStatusClassName = 'vitalhistory_bodyfat_acceptable';
                        //scope.bmcstatusInfo = 'Acceptable';
                        scope.bmcstatusInfo = 'lastcheckin.bp_status_acceptable';
                    }
                    else if (scope.allCheckinData[index].fatClass == 'healthy') {
                        scope.bmcStatusClassName = 'vitalhistory_bodyfat_healthy';
                        //scope.bmcstatusInfo = 'Healthy';
                        scope.bmcstatusInfo = 'lastcheckin.bodyfat_status_healthy';
                    } else {
                        scope.bmcStatusClassName = '';
                        scope.bmcstatusInfo = '';
                    }                
                    //full body bmc status
                    scope.vitalHistorybasalMetabolicRateStatus = HigiKioskUtilitiesService.calculateFullBodyBMRStatus(scope.allCheckinData[index].basal_metabolic_rate);
                    scope.vitalHistorybodyCellMassStatus = HigiKioskVitalReference.calculateBCMRiskForUI(scope.allCheckinData[index].body_cell_mass);
                    scope.vitalHistorybodyFatMassStatus = HigiKioskVitalReference.calculateBodyFatMassRiskForUI(scope.allCheckinData[index].body_fat_mass);
                    scope.vitalHistoryboneMineralContentStatus = HigiKioskVitalReference.calculateBMCRiskForUI(scope.allCheckinData[index].bone_mineral_content);
                    scope.vitalHistoryextraCellularWaterStatus = HigiKioskVitalReference.calculateECWRiskForUI(scope.allCheckinData[index].extra_cellular_water);
                    scope.vitalHistoryintraCellularWaterStatus = HigiKioskVitalReference.calculateICWRiskForUI(scope.allCheckinData[index].intra_cellular_water);
                    scope.vitalHistorymineralStatus = HigiKioskVitalReference.calculateMineralsRiskForUI(scope.allCheckinData[index].mineral);
                    scope.vitalHistorypercentBodyFatStatus = HigiKioskVitalReference.calculatePBFRiskForUI(scope.allCheckinData[index].percent_body_fat);
                    scope.vitalHistoryprotienStatus = HigiKioskVitalReference.calculateProteinRiskForUI(scope.allCheckinData[index].protien, scope.allCheckinData[index].weightKG);
                    scope.vitalHistoryskeletalMuscleMassStatus = HigiKioskVitalReference.calculateSMMRiskForUI(scope.allCheckinData[index].skeletal_muscle_mass);
                    scope.vitalHistoryvisceralFatStatus = HigiKioskVitalReference.calculateVisceralFatRiskForUI(scope.allCheckinData[index].visceral_fat);
                    scope.vitalHistorywaistHeightRatioStatus = HigiKioskVitalReference.calculateWHTRRiskForUI(scope.allCheckinData[index].waist_height_ratio);
                    scope.vitalHistorywaistHipRatioStatus = HigiKioskVitalReference.calculateWHPRRiskForUI(scope.allCheckinData[index].waist_hip_ratio);
                    //full body bmc status
                    if (scope.vitalHistorybasalMetabolicRateStatus == 'Low') {
                        scope.basal_metabolic_rate_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorybasalMetabolicRateStatus == 'Normal') {
                        scope.basal_metabolic_rate_status_info = 'welcomeModals.status.normal';
                    } else{
                        scope.basal_metabolic_rate_status_info = '';
                    }

                    if (scope.vitalHistorybodyCellMassStatus == 'Low') {
                        scope.body_cell_mass_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorybodyCellMassStatus == 'Normal') {
                        scope.body_cell_mass_status_info = 'welcomeModals.status.normal';
                    }else{
                        scope.body_cell_mass_status_info = '';
                    }

                    if (scope.vitalHistorybodyFatMassStatus == 'Low') {
                        scope.body_fat_mass_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorybodyFatMassStatus == 'Normal') {
                        scope.body_fat_mass_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistorybodyFatMassStatus == 'Acceptable') {
                        scope.body_fat_mass_status_info = 'lastcheckin.bp_status_acceptable';
                    }else if (scope.vitalHistorybodyFatMassStatus == 'High') {
                        scope.body_fat_mass_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.body_fat_mass_status_info = '';
                    }

                    if (scope.vitalHistoryboneMineralContentStatus == 'Low') {
                        scope.bone_mineral_content_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryboneMineralContentStatus == 'Normal') {
                        scope.bone_mineral_content_status_info = 'welcomeModals.status.normal';
                    }else{
                        scope.bone_mineral_content_status_info = '';
                    }

                    if (scope.vitalHistoryextraCellularWaterStatus == 'Low') {
                        scope.extra_cellular_water_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryextraCellularWaterStatus == 'Normal') {
                        scope.extra_cellular_water_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistoryextraCellularWaterStatus == 'High') {
                        scope.extra_cellular_water_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.extra_cellular_water_status_info = '';
                    }

                    if (scope.vitalHistoryintraCellularWaterStatus == 'Low') {
                        scope.intra_cellular_water_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryintraCellularWaterStatus == 'Normal') {
                        scope.intra_cellular_water_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistoryintraCellularWaterStatus == 'High') {
                        scope.intra_cellular_water_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.intra_cellular_water_status_info = '';
                    }

                    if (scope.vitalHistorymineralStatus == 'Low') {
                        scope.mineral_status_info= 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorymineralStatus == 'Normal') {
                       scope.mineral_status_info = 'welcomeModals.status.normal';
                    }else{
                        scope.mineral_status_info = '';
                    }

                    if (scope.vitalHistorypercentBodyFatStatus == 'Low') {
                        scope.percent_body_fat_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorypercentBodyFatStatus == 'Normal') {
                        scope.percent_body_fat_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistorypercentBodyFatStatus == 'Acceptable') {
                        scope.percent_body_fat_status_info = 'lastcheckin.bp_status_acceptable';
                    }else if (scope.vitalHistorypercentBodyFatStatus == 'High') {
                        scope.percent_body_fat_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.percent_body_fat_status_info = '';
                    }

                    if (scope.vitalHistoryprotienStatus == 'Low') {
                        scope.protien_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryprotienStatus == 'Normal') {
                       scope.protien_status_info = 'welcomeModals.status.normal';
                    }else{
                        scope.protien_status_info = '';
                    }

                    if (scope.vitalHistoryskeletalMuscleMassStatus == 'Low') {
                        scope.skeletal_muscle_mass_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryskeletalMuscleMassStatus == 'Normal') {
                        scope.skeletal_muscle_mass_status_info = 'welcomeModals.status.normal';
                    }else{
                        scope.skeletal_muscle_mass_status_info = '';
                    }

                    if (scope.vitalHistoryvisceralFatStatus == 'Low') {
                        scope.visceral_fat_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistoryvisceralFatStatus == 'Normal') {
                        scope.visceral_fat_status_info = 'welcomeModals.status.normal';
                    } else if (scope.vitalHistoryvisceralFatStatus == 'Acceptable') {
                        scope.visceral_fat_status_info = 'fullbodybmc2.acceptableStatus';
                    } else if (scope.vitalHistoryvisceralFatStatus == 'High') {
                        scope.visceral_fat_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.visceral_fat_status_info = '';
                    }
                    
                    if (scope.vitalHistorywaistHeightRatioStatus == 'Low') {
                        scope.waist_height_ratio_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorywaistHeightRatioStatus == 'Normal') {
                        scope.waist_height_ratio_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistorywaistHeightRatioStatus == 'High') {
                        scope.waist_height_ratio_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.waist_height_ratio_status_info = '';
                    }

                    if (scope.vitalHistorywaistHipRatioStatus == 'Low') {
                        scope.waist_hip_ratio_status_info = 'lastcheckin.bp_status_low';
                    } else if (scope.vitalHistorywaistHipRatioStatus == 'Normal') {
                        scope.waist_hip_ratio_status_info = 'welcomeModals.status.normal';
                    }else if (scope.vitalHistorywaistHipRatioStatus == 'High') {
                        scope.waist_hip_ratio_status_info = 'lastcheckin.bp_status_high';
                    }else{
                        scope.waist_hip_ratio_status_info = '';
                    }            
                    
            }

            scope.medicationAccordionClick = function(index, appointment_id){
                for (var i = 0; i < scope.medicationData.length; i++) {                    
                    let medAccIcon = document.getElementById("med_accordion_image_"+i);
                    if(index == i){
                        $("#medicationPanel_"+i).toggle(); 
                        medAccIcon.classList.toggle("rotateAccIcon");
                        //alert(appointment_id);
                        scope.userinfo_loading = true;
                        scope.consultantApiDataErr = false;
                        HigiApiService.getConsultationCallSummary(appointment_id,  //apollo_appointment_id for testing "072853e5b94f408f95fe6ec354bcf03f"
                        function (resp) {
                            console.log(resp);
                            let data = resp.replace(/(&quot\;)/g,"\"");
                            let api_res = JSON.parse(data);
                            console.log(api_res);
                            scope.printPresOrConsultationNotesObj = api_res;
                            scope.userinfo_loading = false;
                            scope.consultantApiDataErr = false;
                            //debugger;
                            scope.presc_obj = api_res;
                            if (typeof (api_res) === "object") {
                                //$scope.initSuccess(api_res);

                            }
                            else {
                                //$scope.initError();                                
                            }
                        }, 
                        function(error) {
                            scope.userinfo_loading = false;
                            scope.consultantApiDataErr = true;
                        }); 
                    } else {                  
                        $("#medicationPanel_"+i).hide();    
                        medAccIcon.classList.remove("rotateAccIcon");                    
                    }
                } 

            }

            scope.allCheckInDataSplit = function(data) {
                for(let i = 0; i < data.length; i++) {
                    data[i].vitalParam = [];
                    if(data[i].dateTime != undefined){
                        var rawdatetime = data[i].dateTime;
                        rawdatetime = rawdatetime.replace("/Date(", "");
                        rawdatetime = rawdatetime.replace(")/", "");
                        var offsetposition = rawdatetime.indexOf('+');
                        if (offsetposition > 0) {
                            rawdatetime = rawdatetime.substring(0, offsetposition);
                        }
                        var checkindate = new Date(parseInt(rawdatetime));
                        var checkindateformat = dateFormat(checkindate, "longDate");
                        var checkintimeformat = dateFormat(checkindate, "h:MM TT");
                        data[i].checkInRawDate = checkindate;
                        data[i].checkInDate = checkindateformat + ' / ' + checkintimeformat;
                    }
                    if(data[i].bpClass != undefined && (data[i].fatClass != undefined || data[i].body_fat_mass != undefined ) && 
                        data[i].bmiClass != undefined && data[i].spo2Class != undefined && data[i].temperatureClass != undefined && data[i].ECGBpm != undefined){
                        data[i].vitalParam.push($rootScope.vital_param_title_8);
                    } else {
                        if(data[i].bpClass != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_1);
                        }
                        if(data[i].fatClass != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_2); // normal BMC
                        }
                        if(data[i].bmiClass != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_3);
                        }
                        if(data[i].spo2Class != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_4);
                        }
                        if(data[i].temperatureClass != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_5);
                        }
                        if(data[i].body_fat_mass != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_6); // Full body BMC
                        }
                        if(data[i].ECGBpm != undefined){
                            if(data[i].ECGBpm != '0'){
                                data[i].vitalParam.push($rootScope.vital_param_title_7);
                            } 
                        }
                        if(data[i].dengue_IgG != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_9);
                        }
                        if(data[i].malaria_p_f != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_10);
                        }
                        if(data[i].hiv_I != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_11);
                        }
                        if(data[i].hcv != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_12);
                        }
                        if(data[i].pregnancy != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_13);
                        }
                        if(data[i].troponin != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_14);
                        }
                        if(data[i].syphilis != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_15);
                        }
                        if(data[i].glucose_random_class != undefined || data[i].glucose_fasting_class != undefined || data[i].glucose_prandial_class != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_16);
                        }
                        if(data[i].heamoglobin_class != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_17);
                        }
                        if(data[i].lipid_profile_tc_class != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_18);
                        }
                        if(data[i].urine_leukocytes != undefined){
                            data[i].vitalParam.push($rootScope.vital_param_title_19);
                        }
                    }
                }
                console.log("bfr filter : ",data)
                let objList = [];
                data = data.filter((item) => {
                    if(item['dengue_IgG'] != undefined || item['malaria_p_f'] != undefined || item['hiv_I'] != undefined || item['hcv'] != undefined || item['pregnancy'] != undefined || item['urine_leukocytes'] != undefined || 
                    item['troponin'] != undefined || item['syphilis'] != undefined || item['glucose_random_class'] != undefined || item['heamoglobin_class'] != undefined || item['lipid_profile_tc_class'] != undefined ||
                    item['body_fat_mass'] != undefined || item['temperatureClass'] != undefined || item['spo2Class'] != undefined || item['bpClass'] != undefined || item['bmiClass'] != undefined ||  
                        (item['ECGBpm'] != undefined && item['ECGBpm'] != '0')){
                            objList.push(item);
                    }
                })
                console.log("aft filter : ",objList)

                return objList.reverse();
                // return data.reverse();
            }

            scope.lastCheckin.showSection = function(section){
                if(section == "results"){
                    scope.lastCheckin.resultsActiveClass = "active";
                    scope.lastCheckin.messagesActiveClass = "";
                    scope.lastCheckin.resultsVisible = true;
                    scope.lastCheckin.messagesVisible = false;

                }else{
                    scope.lastCheckin.resultsActiveClass = "";
                    scope.lastCheckin.messagesActiveClass = "active";
                    scope.lastCheckin.resultsVisible = false;
                    scope.lastCheckin.messagesVisible = true;

                }
                $timeout(function(){
                    $rootScope.refreshIScroll("keyboard_lastcheckin_content");
                },100);
            };
            scope.lastCheckin.toggleChallengeTermsAcceptance = function(){
                scope.lastCheckin.termsAccepted = !scope.lastCheckin.termsAccepted;
                if(scope.lastCheckin.termsAccepted){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                    scope.lastCheckin.registerButtonClass = 'active_btn';
                } else {
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                    scope.lastCheckin.registerButtonClass = '';
                }
            };
            scope.lastCheckin.viewChallengeTerms = function(){
                var scrollOffset = (HigiKioskUtilitiesService.isHigiGreen()) ? 290 : 383;
                $rootScope.iScrollObjects["keyboard_lastcheckin_content"].scrollTo(0, (-1 * scrollOffset),500);
            };
            scope.lastCheckin.joinChallenge = function(){

                if($rootScope.earnditEnabled && scope.challengeResponse.joinUrl != undefined){//var joinUrl = scope.challengeResponse.userRelation.joinUrl || scope.challengeResponse.participantsUrl;
                    JkioskService.logEvent('challenge_JoinChallenge', 'button', 'pressed');
                    scope.lastCheckin.submitting = true;
                    var joinUrl = HigiKioskStorageService.returnSessionData('challengeObject').joinUrl;
                    var data = {
                        userId : HigiKioskStorageService.returnSessionData('user').id,
                        joinUrl : joinUrl,
                        joinCode : HigiKioskStorageService.returnSessionData('challengeModalAd').joinId
                    };
                    HigiApiService.JoinEarnditChallenge(data,
                        function(result){
                            scope.lastCheckin.submitting = false;
                            var mode = new Object();
                            mode.modalAuthDialogTitle = "auth.challenge.success";
                            mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                            mode.modalAuthDialogContent = "auth.challenge.joined.challenge";
                            mode.modalAuthDialogIconClass = "auth_dialog_success";
                            mode.loggedin = true;
                            mode.timer = 5000;
                            HigiKioskStorageService.saveSessionData("userInChallenge", true);
//                            $rootScope.userInChallenge = true;
                            $rootScope.authDisplay(mode);
                        },
                        function(result){
                            scope.lastCheckin.submitting = false;
                            mode = new Object();
                            mode.modalAuthDialogTitle = "auth.challenge.failed";
                            mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                            mode.modalAuthDialogContent = "auth.challenge.joined.challenge.failed";
                            mode.modalAuthDialogIconClass = "auth_dialog_failure";
                            mode.loggedin = true;
                            mode.timer = 5000;
                            HigiKioskStorageService.saveSessionData("userInChallenge", false);
//                          $rootScope.userInChallenge = false;
                            $rootScope.authDisplay(mode);
                        });

                } else {
                    JkioskService.logEvent('challenge_JoinChallengeShowEnterName', 'button', 'pressed');
                   scope.lastCheckin.showEditName();
                }
            };

            $rootScope.lastCheckin.logout = function(){
                JkioskService.logEvent($rootScope.currentKeyboardState + '_exitButton', 'button', 'pressed');
                $rootScope.loadModal({id: 'exitconfirm'});
            };

            //New Health Vitals Print Functionality.
            scope.lastCheckin.collectPrintDetails = function(data){
                initDietRecommendation(data);
            };

            //Print Consultation notes/Medication details from med. history
            scope.lastCheckin.printPresOrConsultationNotes = function() { 

                console.log("2980Function");
                //$rootScope.paymentFlowForPrescriptionPrinting = true;             
                // if(parseInt($rootScope.printingVitalAndPresCostObj['prescription_free_print']) > 0) scope.lastCheckin.collectPresOrConsultationData();
                // else scope.lastCheckin.checkPaymentFlow();
                scope.lastCheckin.collectPresOrConsultationData();
            }

            scope.init();
            $rootScope.lastCheckinInit = scope.init;
        }
        else{
            //alert("no");
            scope.lastCheckin.fingerprintThereNot4 = true;
            scope.init = function(){
                scope.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                scope.lastCheckin.title = "lastcheckin.good.to.see.you";
                scope.lastCheckin.yourResults = "login.last.checkin.results";
                scope.lastCheckin.logoutLabel = "global.signout";
                scope.lastCheckin.higiScoreTitle = "finalresults.higi.score";
                scope.lastCheckin.aboutYouSex = "aboutyou01.sex";
                scope.lastCheckin.aboutYouHeight = "aboutyou01.height";
                scope.lastCheckin.ageTitle = "aboutyou01.age";
                scope.lastCheckin.loginLast = "login.last.checkin";
                scope.lastCheckin.bp = "global.blood.pressure";
                scope.lastCheckin.mmhg = "global.mmhg";
                scope.lastCheckin.rating = "global.rating";
                scope.lastCheckin.pulse = "global.pulse";
                scope.lastCheckin.bpm = "global.bpm";
                scope.lastCheckin.weight = "global.weight";
                scope.lastCheckin.abbvPounds = "global.abbv.pounds";
                scope.lastCheckin.abbvPercent = "global.abbv.percent";
                scope.lastCheckin.bmi = "global.body.mass.index";
                scope.lastCheckin.bodyFat = "global.body.fat";
                scope.lastCheckin.ECG = "global.ECG";
                scope.lastCheckin.ECGBpmUnit = "global.ECGBpm.unit";
                scope.lastCheckin.lastEarnings = "lastcheckin.last.earnings";
                scope.lastCheckin.lastEarndit = "global.higiCheckin";
                scope.lastCheckin.backToTop = "global.back.to.top";
                scope.lastCheckin.continue = "global.continue";
                scope.lastCheckin.confirm = "global.confirm";
                scope.lastCheckin.howTall = "height01.how.tall";
                scope.lastCheckin.guyOrGal = "gender01.guy.or.gal";
                scope.lastCheckin.yourName = "global.enter.your.name";
                scope.lastCheckin.officialRules = "global.challenge.official.rules";
                scope.lastCheckin.alreadyJoined = "global.join.challenge.joined";
                scope.lastCheckin.joinChallengeNoLastcCheckinTitle = "global.challenge.account.created.subtitle"; //join the challenge
                scope.lastCheckin.messagesTab = "global.messages";
                scope.lastCheckin.resultsTab = "global.results";
                scope.lastCheckin.selectYourAffiliate = "global.selectYourAffiliate";
                scope.lastCheckin.registerButtonClass = "";
                scope.lastCheckin.checkinDataVisible = true;
                scope.lastCheckin.checkinEditSexVisible = false;
                scope.lastCheckin.checkinEditHeightVisible = false;
                scope.lastCheckin.checkinAbhaEnable = false;
                scope.lastCheckin.checkinAbhaCardShow = false;
                scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                scope.lastCheckin.checkinEditNameVisible = false;
                scope.lastCheckin.submitting = false;

                scope.checkinEditSexButtonActive = false;
                scope.lastCheckin.checkinEditSexButtonActiveClass = "";

                scope.checkinEditHeightButtonActive = false;
                scope.checkinEditWaistCircumferenceButtonActive = false;
                scope.checkinEditHeightButtonActiveClass = '';
                scope.checkinEditWaistCircumferenceButtonActiveClass = false;

                scope.lastCheckin.resultsActiveClass = "";
                scope.lastCheckin.messagesActiveClass = "active";
                scope.lastCheckin.resultsVisible = true;
                scope.lastCheckin.messagesVisible = false;
                scope.lastCheckin.checkinAffiliateVisible = false;

                scope.lastCheckin.earnditPointsVisible = (HigiKioskStorageService.returnSessionData('earnditPoints') != undefined);
                scope.lastCheckin.earnditPoints = HigiKioskStorageService.returnSessionData('earnditPoints');
                scope.lastCheckin.noLastCheckin = HigiKioskStorageService.returnSessionData('nolastCheckin');
                scope.lastCheckin.registerDisclaimer = "global.challenge.terms.agree";
                scope.lastCheckin.joinButton = "global.join.challenge";
                scope.lastCheckin.challengeBanner = "images/last-checkin-default-message.png";
                //earnditPoints

                scope.waist_cir_title = "lastcheckin.waist_cir_title";
                scope.waist_cir_title_small = "lastcheckin.waist_cir_title_small";
                scope.waist_cir_question = "onboarding.5.tittle";
                scope.waist_cir_question_sub_title = "onboarding.5.subtitle";
                scope.last_checkin_title = "lastcheckin.last_checkin_title";
                scope.last_checkin_vital_history_title = "lastcheckin.last_checkin_vital_history_title";
                scope.last_checkin_medication_history_title = "lastcheckin.last_checkin_medication_history_title";
                scope.progress_message = "lastcheckin.progress_message";
                scope.progress_message_2 = "lastcheckin.progress_message_2";
                scope.progress_failure_message = "lastcheckin.progress_failure_message";
                scope.your_vital_history = "lastcheckin.your_vital_history";
                scope.your_consult_history = "lastcheckin.your_consult_history";
                scope.consult_history_subtitle_1 = "lastcheckin.consult_history_subtitle_1";
                scope.consult_history_subtitle_2 = "lastcheckin.consult_history_subtitle_2";
                scope.consult_history_subtitle_3 = "lastcheckin.consult_history_subtitle_3";
                scope.test_taken_on_title = "lastcheckin.test_taken_on_title";
                scope.blood_pressure_title = "lastcheckin.blood_pressure_title";
                scope.pulse_title = "welcomeModals.pulse";
                scope.body_fat_title = "lastcheckin.body_fat_title";
                scope.spo2_title = "lastcheckin.spo2_title";
                scope.temperature_title = "welcomeModals.body.temp";
                scope.ecg_title = "welcomeModals.ecgtitledisp";
                scope.weight_bmi_title = "lastcheckin.weight_bmi_title";
                scope.blood_pressure_sub_title = "welcomeModals.sysDia";
                scope.pulse_sub_title = "welcomeModals.pulserate";
                scope.body_fat_sub_title = "welcomeModals.bmc.body.fat.percentage";
                scope.spo2_sub_title = "welcomeModals.oxyLevel";
                scope.temperature_sub_title = "lastcheckin.vital_param_title_5";
                scope.ecg_sub_title = "lastcheckin.ecg_sub_title";
                scope.weight_sub_title = "welcomeModals.weight";
                scope.bmi_sub_title = "lastcheckin.vital_param_title_3";
                scope.body_fat_sub_title_1 = "lastcheckin.body_fat_sub_title_1";
                scope.body_fat_sub_title_2 = "welcomeModals.body.fat";
                scope.body_fat_sub_title_3 = "lastcheckin.body_fat_sub_title_3";
                scope.body_fat_sub_title_4 = "lastcheckin.body_fat_sub_title_4";
                scope.body_fat_sub_title_5 = "welcomeModals.VisceralFat";
                scope.body_fat_sub_title_6 = "lastcheckin.body_fat_sub_title_6";
                scope.body_fat_sub_title_7 = "lastcheckin.body_fat_sub_title_7";
                scope.body_fat_sub_title_8 = "lastcheckin.body_fat_sub_title_8";
                scope.body_fat_sub_title_9 = "welcomeModals.IntraCellularWater";
                scope.body_fat_sub_title_10 = "lastcheckin.body_fat_sub_title_10";
                scope.body_fat_sub_title_11 = "lastcheckin.body_fat_sub_title_11";
                scope.body_fat_sub_title_12 = "lastcheckin.body_fat_sub_title_12";
                scope.body_fat_sub_title_13 = "welcomeModals.BasalMetabolicRate";
                scope.bp_status_info = '';
                scope.pulse_status_info = '';
                scope.spo2_status_info = '';
                scope.temperature_status_info = "";
                scope.basal_metabolic_rate_status_info = '';
                scope.body_cell_mass_status_info = '';
                scope.body_fat_mass_status_info = '';
                scope.bone_mineral_content_status_info = '';
                scope.extra_cellular_water_status_info = '';
                scope.intra_cellular_water_status_info = '';
                scope.mineral_status_info = '';
                scope.percent_body_fat_status_info = '';
                scope.protien_status_info = '';
                scope.skeletal_muscle_mass_status_info = '';
                scope.visceral_fat_status_info = '';
                scope.waist_height_ratio_status_info = '';
                scope.waist_hip_ratio_status_info = '';
                scope.bmi_status_info = '';
                $rootScope.print_vital = "lastcheckin.print_vital";
                $rootScope.print_prescription_1 = "lastcheckin.print_prescription_1";
                $rootScope.print_prescription_2 = "lastcheckin.print_prescription_2";
                $rootScope.vital_param_title_1 = "lastcheckin.vital_param_title_1";
                $rootScope.vital_param_title_2 = "lastcheckin.vital_param_title_2";
                $rootScope.vital_param_title_3 = "lastcheckin.vital_param_title_3";
                $rootScope.vital_param_title_4 = "lastcheckin.vital_param_title_4";
                $rootScope.vital_param_title_5 = "lastcheckin.vital_param_title_5";
                $rootScope.vital_param_title_6 = "lastcheckin.vital_param_title_6";
                $rootScope.vital_param_title_7 = "welcomeModals.ecgtitledisp";
                $rootScope.vital_param_title_8 = "lastcheckin.vital_param_title_8";
                scope.consultant_name_title = "lastcheckin.consultant_name_title";
                scope.speciality_name_title = "lastcheckin.speciality_name_title";
                scope.consultant_fees_title = "lastcheckin.consultant_fees_title";
                scope.consultant_advice_notes_title = "lastcheckin.consultant_advice_notes_title";
                scope.consultant_diagnosis_title = "lastcheckin.consultant_diagnosis_title";
                scope.consultant_reason_for_visit_title = "lastcheckin.consultant_reason_for_visit_title";
                scope.consultant_medicine_name_title = "lastcheckin.consultant_medicine_name_title";
                scope.consultant_frequency_title = "lastcheckin.consultant_frequency_title";
                scope.consultant_instruction_title = "lastcheckin.consultant_instruction_title";
                scope.consultant_quantity_title = "lastcheckin.consultant_quantity_title";
                scope.consultant_no_days_title = "lastcheckin.consultant_no_days_title";

                scope.lastCheckin.pointWatch = function(newVal, oldVal){
                    scope.lastCheckin.loggedIn = HigiKioskStorageService.returnSessionData('logged_in');
                    scope.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                    scope.lastCheckin.earnditPointsVisible = (HigiKioskStorageService.returnSessionData('earnditPoints') != undefined);
                    scope.lastCheckin.earnditPoints = HigiKioskStorageService.returnSessionData('earnditPoints');
                    scope.lastCheckin.challengeReqInProgress = true;
                    if(HigiKioskStorageService.returnSessionData('logged_in')){
                        if(HigiKioskStorageService.returnSessionData('hasChallenge')){
                            scope.lastCheckin.challengeBanner = HigiKioskStorageService.returnSessionData('challengeModalAd').path;
                            var success = function(result){


                                    var init = function(){
                                        var q = $q.defer();
                                        scope.loadingChallenge = false;
                                        scope.challengeResponse = result;
                                        if(scope.challengeResponse.joinUrl == undefined) {
                                            scope.lastCheckin.showSection("results");
                                            scope.lastCheckin.joinedChallenge = true;
                                        } else {
                                            scope.lastCheckin.joinedChallenge = false;
                                        }
                                        q.resolve();
                                        return q;
                                    };
                                    var promise = init();
                                    promise.promise
                                        .then(function(){
                                            $timeout(function(){$rootScope.refreshIScroll("keyboard_lastcheckin_content");
                                            },100, false);
                                        });



                            };
                            var error = function(error){
                                console.log(error);
                            };
                            if($rootScope.earnditEnabled){
                                if(HigiKioskStorageService.returnSessionData('challengeObject') != undefined) {
                                    success(HigiKioskStorageService.returnSessionData('challengeObject') );
                                }
                            }else {
                                scope.lastCheckin.joinedChallenge = false;
                                scope.lastCheckin.registerButtonClass = "active_btn";
                            }
                        }

                    }
                };


                scope.lastCheckin.challengeWatch = function(newVal){
                    if(newVal){
                        scope.lastCheckin.resultsVisible = false;
                        scope.lastCheckin.messagesVisible = true;
                   } else {
                        scope.lastCheckin.resultsVisible = true;
                        scope.lastCheckin.messagesVisible = false;
                    }
                };
                scope.lastCheckin.userChallengeWatch = function(newVal){
                    scope.lastCheckin.joinedChallenge = newVal;
                    if(newVal){
                        //scope.lastCheckin.userChallengeWatch();
                    }
                };
                scope.lastCheckin.nolastCheckinWatch = function(newVal){

                        scope.lastCheckin.noLastCheckin = newVal;
                };
                //    lastCheckin


                scope.$watch('checkinEditSexButtonActive' , function(){
                    if(scope.checkinEditSexButtonActive){
                        scope.lastCheckin.checkinEditSexButtonActiveClass = 'active_btn';
                    }
                });
                scope.$watch('checkinEditHeightButtonActive' , function(newVal, oldVal){
                    if(newVal){
                        scope.lastCheckin.checkinEditHeightButtonActiveClass = 'active_btn';
                    } else {
                        scope.lastCheckin.checkinEditHeightButtonActiveClass = '';
                    }
                });

                scope.$watch('checkinEditWaistCircumferenceButtonActive' , function(newVal, oldVal){
                    if(newVal){
                        scope.lastCheckin.checkinEditWaistCircumferenceButtonActiveClass = 'active_btn';
                    } else {
                        scope.lastCheckin.checkinEditWaistCircumferenceButtonActiveClass = '';
                    }
                });

                HigiKioskStorageService.watchSessionData('logged_in',  scope.lastCheckin.pointWatch);
                HigiKioskStorageService.watchSessionData('hasChallenge',  scope.lastCheckin.challengeWatch);
                HigiKioskStorageService.watchSessionData('userInChallenge',  scope.lastCheckin.userChallengeWatch);
                HigiKioskStorageService.watchSessionData('nolastCheckin',  scope.lastCheckin.nolastCheckinWatch);

                scope.lastCheckin.bobble = function(){
                    if(scope.lastCheckin.bobbleState == false){
                        $(".cbox-glow").transition({ scale : 1.6, duration : 1000});
                        scope.lastCheckin.bobbleState = true;
                    }
                    else {
                        scope.lastCheckin.bobbleState = false;
                        $(".cbox-glow").transition({ scale : 1.3 , duration : 1000 });
                    }
                    $timeout(scope.lastCheckin.bobble, 1500);
                };
                scope.lastCheckin.bobble();


                scope.lastCheckin.showEditSex = function(){
                    
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editSexButton', 'button', 'pressed');
                    if(HigiKioskStorageService.returnSessionData('gender') != undefined){
                        var gender = HigiKioskStorageService.returnSessionData('gender');
                        if(gender == "m"){

                            scope.sexSelect.isMaleClass = "active";
                            scope.sexSelect.isFemaleClass = "";
                            scope.sexSelect.isTransgenderClass = "";
                        }else if(gender == "f"){

                            scope.sexSelect.isMaleClass = "";
                            scope.sexSelect.isFemaleClass = "active";
                            scope.sexSelect.isTransgenderClass = "";
                        }
                        else{
                            scope.sexSelect.isMaleClass = "";
                            scope.sexSelect.isFemaleClass = "";
                            scope.sexSelect.isTransgenderClass = "active";
                        }
                        scope.lastCheckin.checkinEditSexButtonActiveClass = 'active_btn';
                    }

                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = true;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                scope.lastCheckin.showEditHeight = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editHeightButton', 'button', 'pressed');
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = true;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };
                
                scope.lastCheckin.showEditWaistCircumference = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_editHeightButton', 'button', 'pressed');
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.loginCreateFingerprintSection = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = true;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                };

                scope.lastCheckin.showLastCheckin = function(){
                    scope.lastCheckin.checkinDataVisible = true;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;

                };
                scope.lastCheckin.showEditName = function(){
                    scope.lastCheckin.checkinEditNameVisible = true;
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;
                    scope.lastCheckin.checkinAffiliateVisible = false;
                    $rootScope.targetFieldSet = $rootScope.fields.nameEntry;
                    $timeout(function(){
                        $rootScope.challengeScroller.refresh();
                    }, 0, false);

                };

                scope.lastCheckin.showAffiliate = function(){
                    scope.lastCheckin.checkinAffiliateVisible = true;
                    scope.lastCheckin.checkinEditNameVisible = false;
                    scope.lastCheckin.checkinDataVisible = false;
                    scope.lastCheckin.checkinEditSexVisible = false;
                    scope.lastCheckin.checkinEditHeightVisible = false;
                    scope.lastCheckin.checkinAbhaEnable = false;
                    scope.lastCheckin.checkinAbhaCardShow = false;
                    scope.lastCheckin.checkinEditWaistCircumferenceVisible = false;

                    $rootScope.radioValue = $rootScope.lastCheckin.affiliate;
                    if($rootScope.lastCheckin.affiliate == "" || $rootScope.lastCheckin.affiliate == undefined){
                        $rootScope.radioValue = 'None';
                    }
                    var $radios = $('input:radio[name=affiliateClick]');
                    $radios.filter('[value='+$rootScope.radioValue+']').prop('checked', true);
                    angular.element("#confirm_btn_aff").addClass("active_btn");
                };



                scope.lastCheckin.continueCloseLastCheckin = function(){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_continue_btn', 'button', 'pressed');
                    $rootScope.clearModal();
                };
                scope.lastCheckin.saveUpdatedSex = function(){
                    $rootScope.lastCheckin.gender = (HigiKioskStorageService.returnSessionData('gender') == "m") ? 'welcomeModals.printmalegender' :  ((HigiKioskStorageService.returnSessionData('gender') == "f") ? 'welcomeModals.printfemalegender' : 'global.trans');
                    scope.lastCheckin.onServer = HigiKioskStorageService.returnSessionData('user');
                    scope.lastCheckin.userUpdate = HigiKioskUserService.compareUser(scope.lastCheckin.onServer,HigiKioskStorageService.returnSessionData);
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_genderSaveBtn', 'button', 'pressed');
                    if ((HigiKioskStorageService.returnSessionData('logged_in') == true) && (scope.lastCheckin.userUpdate != null)) {

                        JkioskService.registerKiosk();
                        HigiApiService.UpdateUserAsync(scope.lastCheckin.onServer.id, scope.lastCheckin.userUpdate,
                            function () {
                                scope.lastCheckin.onServer.gender = HigiKioskStorageService.returnSessionData('gender');
                                $rootScope.lastCheckin.gender = (HigiKioskStorageService.returnSessionData('gender') == "m") ? 'welcomeModals.printmalegender' :  ((HigiKioskStorageService.returnSessionData('gender') == "f") ? 'welcomeModals.printfemalegender' : 'global.trans');
                                console.log('updated gender')
                                if($rootScope.user.photo == undefined){
                                    if($rootScope.lastCheckin.gender == "welcomeModals.printmalegender")
                                    {
                                        $rootScope.lastCheckin.userImg = 'images/userprofile.png';
                                        $rootScope.disabledUserProfile = 'images/disableduserprofile.png';
                                    }else
                                    {
                                        $rootScope.lastCheckin.userImg = 'images/userprofilefemale.png';
                                        $rootScope.disabledUserProfile = 'images/disableduserprofilefemale.png';
                                    }                                    
                                }
                                
                            },
                            function () {
                                //alert('failed')
                            });
                    }
                    scope.lastCheckin.showLastCheckin();
                };
                scope.lastCheckin.saveUpdatedHeight = function(){
                    HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height'));
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_heightSaveBtn', 'button', 'pressed');
                    scope.lastCheckin.onServer = HigiKioskStorageService.returnSessionData('user');
                    scope.lastCheckin.userUpdate = HigiKioskUserService.compareUser(scope.lastCheckin.onServer,HigiKioskStorageService.returnSessionData);
                    if ((HigiKioskStorageService.returnSessionData('logged_in') == true) && (scope.lastCheckin.userUpdate != null)) {
                        JkioskService.registerKiosk();
                        HigiApiService.UpdateUserAsync(scope.lastCheckin.onServer.id, scope.lastCheckin.userUpdate,
                            function () {
                                console.log('height update saved');
                            },
                            function () {
                                console.log('height update failed update failed');
                            });
                    }
                    scope.lastCheckin.height = HigiKioskUtilitiesService.convertToFeetFoot(HigiKioskStorageService.returnSessionData('height')) + '&#146;' + HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height')) + '&#148;';
                    scope.lastCheckin.showLastCheckin();
                };

                
                scope.lastCheckin.saveUpdatedWaistCircumference = function(){
                    var userId = HigiKioskStorageService.returnSessionData('affiliateUserId');
                    var json = HigiKioskStorageService.returnSessionData('loginResp');
                    var waistcircumference = HigiKioskStorageService.returnSessionData('waistcircumference');
                    console.log(userId);
                    console.log(json);
                    json.User.waistCircumference = waistcircumference;
                    
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/user/"+userId+"",
                        type : "POST", 
                        cache: false,
                        data:JSON.stringify(json.User),
                        contentType: 'application/json; charset=UTF-8',  
                        dataType: 'json',
                        headers: { 'ApiToken': HigiApiKey , 'Token': json.Token},
                        success: function(html){
                            console.log(html);
                            $rootScope.lastCheckin.waistCircumference = waistcircumference;
                        },
                        error : function(xhr, status, error) { 
                            console.log(error);
                            console.log(status);
                            console.log('failures 3'+xhr.responseText);
                        } 
                    });
                    scope.lastCheckin.waistCircumference = HigiKioskStorageService.returnSessionData('waistcircumference');
                    scope.lastCheckin.showLastCheckin();
                };
                

                scope.lastCheckin.saveUpdatedAffiliate = function(){

                    //alert(HigiApiKey);
                    //alert($rootScope.user.id);

                    var userId = HigiKioskStorageService.returnSessionData('affiliateUserId');
                    var json = HigiKioskStorageService.returnSessionData('loginResp');
                    console.log(userId);
                    console.log(json);
                    if($rootScope.affiliatedOrg == 'None'){
                        $rootScope.affiliatedOrg = "";
                    }
                    json.User.affiliate = $rootScope.affiliatedOrg;
                    $("#affiliateUpdatingModal").show();
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/data/user/"+userId+"",
                        type : "POST", 
                        cache: false,
                        data:JSON.stringify(json.User),
                        contentType: 'application/json; charset=UTF-8',  
                        dataType: 'json',
                        headers: { 'ApiToken': HigiApiKey , 'Token': json.Token},
                        success: function(html){
                            // alert("success DELTEE Completed");
                            console.log(html);
                            $rootScope.lastCheckin.affiliate = $rootScope.affiliatedOrg;

                            $timeout(function(){
                               $rootScope.affPlwait = "global.affilateUpdateYeah";
                               $rootScope.affilateUpdateProcess = "global.affilateUpdateSuccess";
                            },100);  

                            $timeout(function(){
                               $("#affiliateUpdatingModal").hide();
                            },2000);
                            // alert("delete completed");                          
                        },
                        error : function(xhr, status, error) { 
                            console.log(error);
                            console.log(status);
                            console.log('failures 3'+xhr.responseText);

                            $timeout(function(){
                               $rootScope.affPlwait = "global.affilateUpdateOops";
                               $rootScope.affilateUpdateProcess = "global.affilateUpdateFailed";
                            },100);  

                            $timeout(function(){
                               $("#affiliateUpdatingModal").hide();
                            },2000);
                        } 
                    });
                    scope.lastCheckin.showLastCheckin();
                    $('input[name=affiliateClick]').attr('checked',false);
                    $rootScope.affPlwait = "global.affilateUpdatePlwait";
                    $rootScope.affilateUpdateProcess = "global.affilateUpdateProcess";
                };



                $rootScope.setLastCheckinDisplay = scope.lastCheckin.showLastCheckin;


                HigiKioskUserService.setLastCheckinData();
                //$http.get('docs/challenge_terms/challenge_terms.html').success(function(data){
                //    scope.lastCheckin.disclaimerText = $sce.getTrustedHtml(data);
                //});
            };

            scope.lastCheckin.showSection = function(section){
                if(section == "results"){
                    scope.lastCheckin.resultsActiveClass = "active";
                    scope.lastCheckin.messagesActiveClass = "";
                    scope.lastCheckin.resultsVisible = true;
                    scope.lastCheckin.messagesVisible = false;

                }else{
                    scope.lastCheckin.resultsActiveClass = "";
                    scope.lastCheckin.messagesActiveClass = "active";
                    scope.lastCheckin.resultsVisible = false;
                    scope.lastCheckin.messagesVisible = true;

                }
                $timeout(function(){
                    $rootScope.refreshIScroll("keyboard_lastcheckin_content"); 
                },100);
            };
            scope.lastCheckin.toggleChallengeTermsAcceptance = function(){
                scope.lastCheckin.termsAccepted = !scope.lastCheckin.termsAccepted;
                if(scope.lastCheckin.termsAccepted){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                    scope.lastCheckin.registerButtonClass = 'active_btn';
                } else {
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                    scope.lastCheckin.registerButtonClass = '';
                }
            };
            scope.lastCheckin.viewChallengeTerms = function(){
                var scrollOffset = (HigiKioskUtilitiesService.isHigiGreen()) ? 290 : 383;
                $rootScope.iScrollObjects["keyboard_lastcheckin_content"].scrollTo(0, (-1 * scrollOffset),500);
            };
            scope.lastCheckin.joinChallenge = function(){

                if($rootScope.earnditEnabled && scope.challengeResponse.joinUrl != undefined){//var joinUrl = scope.challengeResponse.userRelation.joinUrl || scope.challengeResponse.participantsUrl;
                    JkioskService.logEvent('challenge_JoinChallenge', 'button', 'pressed');
                    scope.lastCheckin.submitting = true;
                    var joinUrl = HigiKioskStorageService.returnSessionData('challengeObject').joinUrl;
                    var data = {
                        userId : HigiKioskStorageService.returnSessionData('user').id,
                        joinUrl : joinUrl,
                        joinCode : HigiKioskStorageService.returnSessionData('challengeModalAd').joinId
                    };
                    HigiApiService.JoinEarnditChallenge(data,
                        function(result){
                            scope.lastCheckin.submitting = false;
                            var mode = new Object();
                            mode.modalAuthDialogTitle = "auth.challenge.success";
                            mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                            mode.modalAuthDialogContent = "auth.challenge.joined.challenge";
                            mode.modalAuthDialogIconClass = "auth_dialog_success";
                            mode.loggedin = true;
                            mode.timer = 5000;
                            HigiKioskStorageService.saveSessionData("userInChallenge", true);
//                            $rootScope.userInChallenge = true;
                            $rootScope.authDisplay(mode);
                        },
                        function(result){
                            scope.lastCheckin.submitting = false;
                            mode = new Object();
                            mode.modalAuthDialogTitle = "auth.challenge.failed";
                            mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                            mode.modalAuthDialogContent = "auth.challenge.joined.challenge.failed";
                            mode.modalAuthDialogIconClass = "auth_dialog_failure";
                            mode.loggedin = true;
                            mode.timer = 5000;
                            HigiKioskStorageService.saveSessionData("userInChallenge", false);
//                          $rootScope.userInChallenge = false;
                            $rootScope.authDisplay(mode);
                        });

                } else {
                    JkioskService.logEvent('challenge_JoinChallengeShowEnterName', 'button', 'pressed');
                   scope.lastCheckin.showEditName();
                }
            };

            $rootScope.lastCheckin.logout = function(){
                JkioskService.logEvent($rootScope.currentKeyboardState + '_exitButton', 'button', 'pressed');
                $rootScope.loadModal({id: 'exitconfirm'});
            };

            //New Health Vitals Print Functionality.
            scope.lastCheckin.collectPrintDetails = function(data){
                initDietRecommendation(data);
            };

            //Print Consultation notes/Medication details from med. history
            scope.lastCheckin.printPresOrConsultationNotes = function() {
                console.log("3607Function")
                //$rootScope.paymentFlowForPrescriptionPrinting = true;             
                // if(parseInt($rootScope.printingVitalAndPresCostObj['prescription_free_print']) > 0) scope.lastCheckin.collectPresOrConsultationData();
                // else scope.lastCheckin.checkPaymentFlow();
                scope.lastCheckin.collectPresOrConsultationData();
            }

            scope.init();
            
            $rootScope.lastCheckinInit = scope.init;
        }

        function initDietRecommendation(data){
            let vitalData = data;
            //console.log(vitalData);
            let gender = vitalData?.gender || "";
            let bpStatus = vitalData?.bpClass;
            let pulseStatus = vitalData?.pulseClass;
            let bmiStatus = vitalData?.bmiClass;
            let bmcStatus = vitalData?.fatClass;
            let spo2Status = vitalData?.spo2Class;
            let temperaturStatus = vitalData?.temperatureClass;
            
            if(gender.toLowerCase() == 'm' || gender.toLowerCase() == 'male'){
                gender = 'male';
            }else if(gender.toLowerCase() == 'f' || gender.toLowerCase() == 'female'){
                gender = 'female';
            }else{
                gender = 'male';
            };

            if(bpStatus != undefined && bpStatus != null){
                if(bpStatus.toLowerCase() == 'low'){
                    bpStatus = 'Low';
                }else if(bpStatus.toLowerCase() == 'normal'){
                    bpStatus = 'Normal';     
                }else if(bpStatus.toLowerCase() == 'acceptable'){
                    bpStatus = 'Acceptable';
                }else if(bpStatus.toLowerCase() == 'high' || bpStatus.toLowerCase() == 'atrisk'){
                    bpStatus = 'High';
                }else if(bpStatus.toLowerCase() == 'stage 1 hypertension'){
                    bpStatus = 'Stage 1 Hypertension';
                }else if(bpStatus.toLowerCase() == 'stage 2 hypertension'){
                    bpStatus = 'Stage 2 Hypertension';
                }else if(bpStatus.toLowerCase() == 'recheck or consult a healthcare provider'){
                    bpStatus = 'Recheck or Consult a Healthcare Provider';
                }else{
                    bpStatus = '';
                }
            }else{
                bpStatus = '';
            };

            if(pulseStatus != undefined && pulseStatus != null){
                if(pulseStatus.toLowerCase() == 'high'){
                    pulseStatus = 'High';
                }else if(pulseStatus.toLowerCase() == 'low'){
                    pulseStatus = 'Low';
                }else if(pulseStatus.toLowerCase() == 'normal'){
                    pulseStatus = 'Normal';
                }
                else if(pulseStatus.toLowerCase() == 'check with healthcare provider'){
                    pulseStatus = 'Check with Healthcare Provider';
                }else{
                    pulseStatus = '';
                }
            }else{
                pulseStatus = '';
            };

            if(bmiStatus != undefined && bmiStatus != null){
                if(bmiStatus.toLowerCase() == 'underweight'){
                    bmiStatus = 'Under weight';
                }else if(bmiStatus.toLowerCase() == 'normal'){
                    bmiStatus = 'Normal';
                }else if(bmiStatus.toLowerCase() == 'overweight'){
                    bmiStatus = 'Over weight';
                }else if(bmiStatus.toLowerCase() == 'obese'){
                    bmiStatus = 'Obese';
                }else{
                    bmiStatus = '';
                }
            }else{
                bmiStatus = '';
            };

            if(bmcStatus != undefined && bmcStatus != null){
                if(bmcStatus.toLowerCase() == 'atrisk' || bmcStatus.toLowerCase() == 'at-risk' || bmcStatus.toLowerCase() == 'high'){
                    bmcStatus = 'High';
                }else if(bmcStatus.toLowerCase() == 'acceptable'){
                    bmcStatus = 'Acceptable';
                }else if(bmcStatus.toLowerCase() == 'healthy'){
                    bmcStatus = 'Normal';
                }else if(bmcStatus.toLowerCase() == 'low'){
                    bmcStatus = 'Low';
                }else{
                    bmcStatus = '';
                }
            }else{
                bmcStatus = '';
            };

            if(spo2Status != undefined && spo2Status != null){
                if(spo2Status.toLowerCase() == 'low'){
                    spo2Status = 'Low';
                }else if(spo2Status.toLowerCase() == 'at-risk' || spo2Status.toLowerCase() == 'atrisk'){
                    spo2Status = 'At-risk';
                }else if(spo2Status.toLowerCase() == 'acceptable'){
                    spo2Status = 'Acceptable';
                }else if(spo2Status.toLowerCase() == 'healthy'){
                    spo2Status = 'Healthy';
                }else if(spo2Status.toLowerCase() == 'check with healthcare provider'){
                    spo2Status = 'Check With Healthcare Provider';
                }else{
                    spo2Status = '';
                }
            }else{
                spo2Status = '';
            };

            if(temperaturStatus != undefined && temperaturStatus != null){
                if(temperaturStatus.toLowerCase() == 'normal'){
                    temperaturStatus = 'Normal';
                }else if(temperaturStatus.toLowerCase() == 'acceptable'){
                    temperaturStatus = 'Acceptable'; 
                }else if(temperaturStatus.toLowerCase() == 'fever'){
                    temperaturStatus = 'Fever'; 
                }else if(temperaturStatus.toLowerCase() == 'high fever'){
                    temperaturStatus = 'High Fever'; 
                }else if(temperaturStatus.toLowerCase() == 'low'){
                    temperaturStatus = 'Low'; 
                }else{
                    temperaturStatus = '';
                }
            }else{
                temperaturStatus = '';
            };

            let printChildContants =  new PrintChildContants().suitableDietRecommendFilter(gender, bpStatus, pulseStatus, bmiStatus, bmcStatus, spo2Status, temperaturStatus)
            .then(res => {
                //console.log(res);
                let dietRecommend = res;
                $rootScope.tempVitalDataForVitalPrint = {...vitalData};
                $rootScope.tempDietRecommendForVitalPrint = {...dietRecommend};
                //scope.lastCheckin.lastCheckinVitalDataCollection(vitalData, dietRecommend);
                //$rootScope.paymentFlowForVitalPrinting = true;

                //below code to check vital cost to be print
                //if(parseInt($rootScope.printingVitalAndPresCostObj['vital_free_print']) > 0) scope.lastCheckin.lastCheckinVitalDataCollection();
                //else scope.lastCheckin.checkPaymentFlow();
                scope.lastCheckin.lastCheckinVitalDataCollection();
            });
        };

        scope.lastCheckin.lastCheckinVitalDataCollection = function(){
            //$rootScope.clearModal();
            //console.log(data);
            let vitalData = $rootScope.tempVitalDataForVitalPrint;
            //User Basic Details.
            let basicDetails = {
                "userFirstName" : vitalData?.firstName || "Guest User",
                "userLastName" : vitalData?.lastName || "",
                "userHeight" : vitalData?.heightMeters?.toString() || "0",
                "userGender" : vitalData?.gender || "",
                "userAge" : vitalData?.dateOfBirth || "",
                "userEmail" : HigiKioskStorageService.returnSessionData('email'),
                "userMobileNumber" : $rootScope.user?.mobileNumber || HigiKioskStorageService.returnSessionData('updatedMobileNumber') || "N/A",
                "date" : ((vitalData?.dateTime)? new Date(parseInt(vitalData.dateTime.match(/\d+/)[0])) : new Date())
            };

            //User Basic Vital Details.
            let basicVitalDetails = {
                "weight" : vitalData?.weightKG?.toString() || undefined,
                "systolic" : vitalData?.systolic?.toString() || undefined,
                "diastolic" : vitalData?.diastolic?.toString() || undefined,
                "pulse" : vitalData?.pulseBpm?.toString() || undefined,
                "oxygenLevel" : vitalData?.spo2?.toString() || undefined,
                "bodyTemperature" : (vitalData?.temperature != undefined && vitalData?.temperature != null && vitalData?.temperature != "" )? (HigiKioskUtilitiesService.convertToFarrantHeat(parseFloat(vitalData.temperature).toFixed(1))).toString() : undefined, 
                "fatPercent" : vitalData?.fatRatio?.toString() || undefined
            };

            //User Full Body BMC Vital Details.
            let fullBodyBMCDetails = {
                "intraCellularWater" : vitalData?.intra_cellular_water?.toString() || undefined,
                "extraCellularWater" : vitalData?.extra_cellular_water?.toString() || undefined,
                "bodyFatMass" : vitalData?.body_fat_mass?.toString() || undefined,
                "percentBodyFat" : vitalData?.percent_body_fat?.toString() || undefined,
                "skeletalMuscleMass" : vitalData?.skeletal_muscle_mass?.toString() || undefined,
                "bodyCellMass" : vitalData?.body_cell_mass?.toString() || undefined,
                "boneMineralContent" : vitalData?.bone_mineral_content?.toString() || undefined,
                "proteinContent" : vitalData?.protien?.toString() || undefined,
                "mineralContent" : vitalData?.mineral?.toString() || undefined,
                "waistToHipRatio" : vitalData?.waist_hip_ratio?.toString() || undefined,
                "waistToHeightRatio" : vitalData?.waist_height_ratio?.toString() || undefined,
                "basalMetabolicRate" : vitalData?.basal_metabolic_rate?.toString() || undefined,
                "visceralFat" : vitalData?.visceral_fat?.toString() || undefined
            };

            //User ECG Common Vital Details.
            let ecgCommonDetails = {
                "PRInterval" : vitalData?.PRInterval?.toString() || undefined,
                "QRSInterval" : vitalData?.QRSInterval?.toString() || undefined,
                "QTCInterval" : vitalData?.QTCInterval?.toString() || undefined,
                "heartRate" : vitalData?.ECGBpm?.toString() || undefined
            };

            //User ECG Three Lead Details.
            let ecgThreeLeadDetails = {
                "threeLead1GraphImage" : undefined,
                "threeLead2GraphImage" : undefined,
                "threeLead3GraphImage" : undefined
            };

            //User ECG Six Lead Details.
            let ecgSixLeadDetails = {
                "sixLead1GraphImage" : undefined,
                "sixLead2GraphImage" : undefined,
                "sixLead3GraphImage" : undefined,
                "sixLeadAVRGraphImage" : undefined,
                "sixLeadAVLGraphImage" : undefined,
                "sixLeadAVFGraphImage" : undefined
            };

            //User Diet Recommendation Details.
            let dietRecommendationDetails = {
                "dietPlan" : $rootScope.tempDietRecommendForVitalPrint
            };

            let vitalDynamicScalBar = {
                "Spo2_Reference_Value" : HigiKioskUtilitiesService.Spo2_Reference_Value(),
                "BMI_Reference_Value" : HigiKioskUtilitiesService.BMI_Reference_Value(),
                "Body_Temperature_Reference_Value" : HigiKioskUtilitiesService.Body_Temperature_Reference_Value(),
                "Systolic_Reference_Value" : HigiKioskUtilitiesService.Systolic_Reference_Value(),
                "Diastolic_Reference_Value" : HigiKioskUtilitiesService.Diastolic_Reference_Value(),
                "Pulse_Reference_Value" : HigiKioskUtilitiesService.Pulse_Reference_Value(),
                "Percent_Body_Fat_Reference_Value" : HigiKioskUtilitiesService.Percent_Body_Fat_Reference_Value(),
                "Skeletal_Muscle_Mass_Reference_Value" : HigiKioskUtilitiesService.Skeletal_Muscle_Mass_Reference_Value(),
                "Body_Fat_Mass_Reference_Value" : HigiKioskUtilitiesService.Body_Fat_Mass_Reference_Value(),
                "Intra_Cellular_Water_Reference_Value" : HigiKioskUtilitiesService.Intra_Cellular_Water_Reference_Value(),
                "Extra_Cellular_Water_Reference_Value" : HigiKioskUtilitiesService.Extra_Cellular_Water_Reference_Value(),
                "Protein_Content_Reference_Value" : HigiKioskUtilitiesService.Protein_Content_Reference_Value(),
                "Minerals_Content_Reference_Value" : HigiKioskUtilitiesService.Minerals_Content_Reference_Value(),
                "Body_Cell_Mass_Reference_Value" : HigiKioskUtilitiesService.Body_Cell_Mass_Reference_Value(),
                "Bone_Mineral_Content_Reference_Value" : HigiKioskUtilitiesService.Bone_Mineral_Content_Reference_Value(),
                "Waist_to_Height_Ratio_Reference_Value" : HigiKioskUtilitiesService.Waist_to_Height_Ratio_Reference_Value(),
                "Waist_to_Hip_Ratio_Reference_Value" : HigiKioskUtilitiesService.Waist_to_Hip_Ratio_Reference_Value(),
                "Visceral_Fat_Reference_Value" : HigiKioskUtilitiesService.Visceral_Fat_Reference_Value(),
                "Random_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.Random_Blood_Glucose_Reference_Value(),
                "Fasting_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.Fasting_Blood_Glucose_Reference_Value(),
                "PostPrandial_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.PostPrandial_Blood_Glucose_Reference_Value(),
                "Heamoglobin_Reference_Value" : HigiKioskUtilitiesService.Heamoglobin_Reference_Value(),
                "TotalCholestrolReferenceValues" : HigiKioskUtilitiesService.TotalCholestrolReferenceValues(),
                "HDLCholestrolReferenceValues" : HigiKioskUtilitiesService.HDLCholestrolReferenceValues(),
                "LDLCholestrolReferenceValues" : HigiKioskUtilitiesService.LDLCholestrolReferenceValues(),
                "TriglyceridesReferenceValues" : HigiKioskUtilitiesService.TriglyceridesReferenceValues(),
            };

              // User Invasive Parameter Details.
            let invasiveTestResults = {
                "glucose_random" : HigiKioskStorageService.returnSessionData('glucose_random'),
                "glucose_fasting" :HigiKioskStorageService.returnSessionData('glucose_fasting'),
                "glucose_post_prandial" :HigiKioskStorageService.returnSessionData('glucose_post_prandial'),
                "hemoglobin" : HigiKioskStorageService.returnSessionData('heamoglobin'),
                "lipid_profile_tc" : HigiKioskStorageService.returnSessionData('lipid_profile_tc'),
                "lipid_profile_hg" : HigiKioskStorageService.returnSessionData('lipid_profile_hg'),
                "lipid_profile_ldl" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl'),
                "lipid_profile_tg" : HigiKioskStorageService.returnSessionData('lipid_profile_tg'),
                "urine_leukocytes" : HigiKioskStorageService.returnSessionData('urine_leukocytes'),
                "urine_nitrite" : HigiKioskStorageService.returnSessionData('urine_nitrite'),
                "urine_urobilinogen" : HigiKioskStorageService.returnSessionData('urine_urobilinogen'),
                "urine_protein" : HigiKioskStorageService.returnSessionData('urine_protein'),
                "urine_ph" : HigiKioskStorageService.returnSessionData('urine_ph'),
                "urine_blood" : HigiKioskStorageService.returnSessionData('urine_blood'),
                "urine_specific_gravity" : HigiKioskStorageService.returnSessionData('urine_specific_gravity'),
                "urine_ketone" : HigiKioskStorageService.returnSessionData('urine_ketone'),
                "urine_bilirubin" : HigiKioskStorageService.returnSessionData('urine_bilirubin'),
                "urine_glucose" : HigiKioskStorageService.returnSessionData('urine_glucose'),
                "dengue_IgG" : HigiKioskStorageService.returnSessionData('dengue_IgG'),
                "dengue_IgM" : HigiKioskStorageService.returnSessionData('dengue_IgM'),
                "malaria_p_v" : HigiKioskStorageService.returnSessionData('malaria_p_v'),
                "malaria_p_f" : HigiKioskStorageService.returnSessionData('malaria_p_f'),
                "hiv_I" : HigiKioskStorageService.returnSessionData('hiv_I'),
                "hiv_II" : HigiKioskStorageService.returnSessionData('hiv_II'),
                "hcv" : HigiKioskStorageService.returnSessionData('hcv'),
                "troponin" : HigiKioskStorageService.returnSessionData('troponin'),
                "syphilis" : HigiKioskStorageService.returnSessionData('syphilis'),
                "pregnancy" : HigiKioskStorageService.returnSessionData('pregnancy')
            }
            
            function OverAllPrintDetails(){
                this.basicDetails = basicDetails;
                this.basicVitalDetails = basicVitalDetails;
                this.fullBodyBMCDetails = fullBodyBMCDetails;
                this.ecgCommonDetails = ecgCommonDetails;
                this.ecgThreeLeadDetails = ecgThreeLeadDetails;
                this.ecgSixLeadDetails = ecgSixLeadDetails;
                this.dietRecommendationDetails = dietRecommendationDetails.dietPlan;
                this.vitalDynamicScalBar = vitalDynamicScalBar;
                this.invasiveTestResults = invasiveTestResults;
            };
            // alert("PopulateDetails");
            $rootScope.printConstants =  new PrintConstants("vitals", new OverAllPrintDetails());
            // alert("AfterrootScope");
            // console.log($rootScope.printConstants);
            setTimeout(()=>{
              $rootScope.printerService.getMultiPrinterConfigurationDetails("vitalOrPrescription", //invoice
                (response) =>{//thermal, a4, //multiPrinter --> if both available.
                //  alert("success "+ response);
                //   let a4_templateId = document.getElementById("healthVitalsPrintTemplateForA-4PrintPaper").innerHTML;
                  let a4_templateId = document.getElementById("healthVitalsPrintforNonInvasiveNewTemplateForA4PrintPaper").innerHTML;
                  let A4InvasiveTemplate = document.getElementById("A4TemplateForInvasiveParametersForExternalPrinters");
                  let thermalTemplateId = document.getElementById("healthVitalsPrintNewTemplateForThermalPrintPaper").innerHTML;

                  let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;margin-top:-40px;box-sizing: border-box;'>"+a4_templateId+"</body></html>";
                  let a4_html_templateforInvasive = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;margin-top:-40px;box-sizing: border-box;'>"+A4InvasiveTemplate+"</body></html>";
                  let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;margin-top:-40px;box-sizing: border-box;'>"+thermalTemplateId+"</body></html>";
                  
                  const printerTemplateObject = {
                    thermalPrinterTemplate: thermal_html_template,
                    a4PrinterTemplate: a4_html_template,
                    a4PrinterTemplate: a4_html_templateforInvasive,
                  };
                    // console.log("response",response);
                    // alert("response");
                  if (response == "multiPrinter") {
                    $rootScope.printerService.printerTemplateObject = printerTemplateObject;
                    document.getElementById("kiosk_modal_popup").style.visibility = "hidden";
                    $('#multiPrinterAvailabilityPopupVisible').show();
                  }else{
                    $rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                  }

                  //$rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                  $rootScope.paymentFlowForVitalPrinting = false;
                  $rootScope.vitalPrintingCost = 0;
                  $rootScope.lastCheckinModalShow = true;
                  $rootScope.loadModal({id: 'lastcheckin'});
                }, 
                (error) => {//technical_issue, paper_not_available
                    if(error == "technical_issue"){
                        $rootScope.snackBarAlertText = "Sorry! No printer has been detected.";
                    }else{
                        $rootScope.snackBarAlertText = "Sorry! Paper is not available in printer.";
                    }
                    let snackbar = document.getElementById("snackbar");
                    setTimeout(function(){
                        snackbar.className = "show";
                    },2000);
                    setTimeout(function(){
                        snackbar.className = snackbar.className.replace("show", ""); 
                        $rootScope.snackBarAlertText = "";
                    },6000);
                }
              );
            },1500);
        };

        // Abha Verify Modal
        scope.lastCheckin.abhaVerifySection = function(field){
            console.log(field);
            if(field == 'Yes'){
                $rootScope.abhaVerifyShow = true;
                $rootScope.abhaRegShow = false;
                if($rootScope.UserInfo.aadhaarNumber) $rootScope.UserAadharNumber = $rootScope.UserInfo.aadhaarNumber;
                $rootScope.abhaVerifyModelInit();
                $rootScope.loadModal({ id: 'abhaVerify' });
            }else {
                console.log($rootScope.UserInfo);
                if($rootScope.UserInfo.aadhaarNumber) $rootScope.UserAadharNumber = $rootScope.UserInfo.aadhaarNumber;
                console.log($rootScope.UserAadharNumber);
                $rootScope.abhaVerifyShow = false;
                $rootScope.abhaRegShow = true;
                $rootScope.abhaVerifyModelInit();
                $rootScope.loadModal({ id: 'abhaVerify' });
            }
        }

        scope.lastCheckin.collectPresOrConsultationData = async function() {
            let logoUrlValue = "";
            let prescription_num = "Not Available";
            console.log("value");
            await (PrescriptionLogoUrl()).then(val=>{
                logoUrlValue = val;
            });
            await (prescriptionNum()).then(val => {
                prescription_num = val;
            });

            scope.printPresOrConsultationNotesObj.patient_gender = HigiKioskStorageService.returnSessionData('gender');
            scope.printPresOrConsultationNotesObj.patient_dob = HigiKioskStorageService.returnSessionData('birthdate');
            scope.printPresOrConsultationNotesObj.prescription_num = prescription_num;
            $rootScope.printPrescriptionConstants = new PrintPrescriptionConstants(scope.printPresOrConsultationNotesObj, "lastCheckin", logoUrlValue);
            setTimeout(()=>{
              $rootScope.printerService.getMultiPrinterConfigurationDetails("vitalOrPrescription", //invoice
                (response) =>{//thermal, a4, //multiPrinter --> if both available.
                  //alert("success "+ response);
                  let a4_template = "";
                  let thermal_template = "";
                  console.log(scope.printPresOrConsultationNotesObj.consultant_details);
                  if(scope.printPresOrConsultationNotesObj.consultant_details.vendor_name != "APOLLO") {
                      a4_template = document.getElementById("ihl-genix-pres-print-template-a4paper").innerHTML;
                      thermal_template = document.getElementById("ihl-genix-pres-print-template-thermalpaper").innerHTML;
                  } else if(scope.printPresOrConsultationNotesObj.consultant_details.vendor_name == "APOLLO") {
                      a4_template = document.getElementById("apollo-prescription-template-a4paper").innerHTML;
                      thermal_template = document.getElementById("apollo-prescription-template-thermalpaper").innerHTML;
                  }

                  let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;box-sizing: border-box;'>"+a4_template+"</body></html>";
                  let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;box-sizing: border-box;'>"+thermal_template+"</body></html>";

                  const printerTemplateObject = {
                    thermalPrinterTemplate: thermal_html_template,
                    a4PrinterTemplate: a4_html_template
                  };

                  if (response == "multiPrinter") {
                    console.log("if");
                    $rootScope.printerService.printerTemplateObject = printerTemplateObject;
                    // document.getElementById("kiosk_modal_popup").style.visibility = "hidden";
                    $('#multiPrinterAvailabilityPopupVisible').show();
                  }if($rootScope.externalPrinterName != ''){    
                    console.log("$rootScope.externalPrinterName : ",$rootScope.externalPrinterName);
                    html_template = a4_html_template;
                    // console.log("a4_html_template inside func : ",a4_html_template);
            
                    var externalPrinterName = $rootScope.externalPrinterName; 
                    // console.log("$scope.genixA4printRes : ",$scope.genixA4printRes);  
                    // JkioskService.genixA4print(scope.genixA4printRes,  html_template, externalPrinterName);
                    // console.log("scope.genixA4printRes",scope.genixA4printRes);
                    // var element = document.getElementById("A4TemplateForInvasiveParametersForExternalPrinters");
                    var element = printerTemplateObject['a4PrinterTemplate'];   
      
                    var opt = {
                      margin:       0,
                      filename:     'myfile.pdf',
                      image:        { type: 'jpeg', quality: 0.98 },
                      html2canvas:  { scale: 2 },
                      // pagebreak:    { mode: 'avoid-all', before: '#page2el' },
                      // pagebreak: {
                      //     mode: ['avoid-all', 'css', 'legacy']
                      // },
                      jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' } //letter
                    };
                  
                    // alert("starts pdf downloaded");
                    // New Promise-based usage:
                    // html2pdf().set(opt).from(element).save();
                    html2pdf().from(element).outputPdf().then(function(pdf) {
                      // This logs the right base64
                      console.log("btoa(pdf)");
                     // alert("btoa(pdf)");
                      // console.log(btoa(pdf));
                      var jsonData = {"base64": btoa(pdf)};
                      $.ajax({
                        // url: "http://localhost/ihl_kiosk_ui_invasive/server/Base64ToPDF.php",  //Dev Server
                        url: "http://localhost:9000/server/Base64ToPDF.php",   // Kiosk Machine 
        
                        type: "POST",
                        cache: false,
                        dataType: 'json',
                        data:jsonData,
                        headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                        success: function (html) {
                            // console.log(html);
                            //var jsonData = JSON.parse(html);                
                            if(html['status'] == "S"){                  
                                // var pdfFilePath = "file:///D:/Xampp/htdocs/ihl_kiosk_ui_invasive/server/test.pdf";  // Dev Server
                                var pdfFilePath = "file:///C:/kiosk/Apps/Almond_IHL_UI/server/test.pdf";   // Kiosk Machine
           
                                var externalPrinterName = $rootScope.externalPrinterName;
                                console.log("apolloA4print welcome ctrl");
                                JkioskService.apolloA4print(scope.apolloA4printRes,  pdfFilePath, externalPrinterName);
                                // console.log("scope.apolloA4printRes", scope.apolloA4printRes);
                            } else {
                                console.log("pdf file not created.. Someting went wrong");
                                // alert("Something Went wrong")
                                $rootScope.a4SnackBarAlertText = "Something Went Wrong. Some Technical Issue";
                                let snackbar = document.getElementById("snackbar");
                                setTimeout(function(){
                                    snackbar.className = "show";
                                },2000);
                                setTimeout(function(){
                                    snackbar.className = snackbar.className.replace("show", ""); 
                                    $rootScope.a4SnackBarAlertText = "";
                                },6000);
                              }
                        },
                        error: function(err){    
                            console.log(err);
                            console.log("unable to connect server");
                            // alert("Unable to connect the server");
                            $rootScope.a4SnackBarAlertText = "Something Went Wrong. Some Technical Issue";
                            let snackbar = document.getElementById("snackbar");
                                setTimeout(function(){
                                    snackbar.className = "show";
                                },2000);
                                setTimeout(function(){
                                    snackbar.className = snackbar.className.replace("show", ""); 
                                    $rootScope.a4SnackBarAlertText = "";
                                },6000);
                        }
                    });
                    });
                
                    // Old monolithic-style usage:
                    //html2pdf(element, opt);
                    //let prescriptionUrl = "file:///C:/Users/ihlkioskuser/Downloads/myfile.pdf";
                          //html2pdf(element);
                    //JkioskService.apolloA4print($scope.apolloA4printRes, prescriptionUrl, externalPrinterName);
            
                  }else{
                    console.log("else");
                    $rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                  }
                  
                  //$rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                  $rootScope.paymentFlowForPrescriptionPrinting = false;
                  $rootScope.prescriptionPrintingCost = 0;
                  $rootScope.lastCheckinModalShow = true;
                  $rootScope.loadModal({id: 'lastcheckin'});
                }, 
                (error) => {//technical_issue, paper_not_available
                    if(error == "technical_issue"){
                        $rootScope.snackBarAlertText = "Sorry! No printer has been detected.";
                    }else{
                        $rootScope.snackBarAlertText = "Sorry! Paper is not available in printer.";
                    }
                    let snackbar = document.getElementById("snackbar");
                    setTimeout(function(){
                        snackbar.className = "show";
                    },2000);
                    setTimeout(function(){
                        snackbar.className = snackbar.className.replace("show", ""); 
                        $rootScope.snackBarAlertText = "";
                    },6000);
                }
              );
            },1500);
        }

        scope.apolloA4printRes = function(res){
            console.log(res);
        }

        function PrescriptionLogoUrl(){
            let account_id = scope.printPresOrConsultationNotesObj.consultant_details.account_id || "123456";
            let logo = $rootScope.printTemplateLogo;
            
            return new Promise((resolve, reject)=>{
                let success = (res) =>{
                    console.log(res);
                    if (res == "invalid accountId") {
                        resolve(logo);
                    }else{
                        resolve(res);
                    }
                }

                let error = (err) =>{
                    console.log(err);
                    resolve(logo);
                }

                HigiApiService.getPrescriptionLogoUrl(account_id.toString(), success, error);
            })
        }

        function prescriptionNum() {
            return new Promise((resolve, reject)=>{
                let success = (res) =>{
                    //console.log(res);
                    if(res != null) {
                        if(res.length != 0) {
                            let obj = res.filter(data => {
                                if(data.ihl_appointment_id === scope.printPresOrConsultationNotesObj.message.appointment_id) return data;
                            });
                            if(obj[0]['invoice_number'] != undefined) resolve(obj[0]['invoice_number']);                            
                            else resolve("Not Available");
                        }
                    }                
                }

                let error = (err) =>{
                    console.log(err);
                    resolve("Not Available");
                }

                HigiApiService.getPrescriptionNum(scope.printPresOrConsultationNotesObj.message.user_ihl_id, success, error);                
            })
        }

        scope.lastCheckin.checkFreeAccess = function() {
            return new Promise((resolve, reject) => {
                let success = (res) => {
                    let result = res;
                    if(result["status"] == "success" && result["message"] == "Access granted"){
                        $rootScope.emailLoginUserFreeServiceAccessGranted = true;
                        resolve();
                    }else{
                        $rootScope.emailLoginUserFreeServiceAccessGranted = false;
                        reject("Access denied");
                    }
                }
    
                let error = (err) => {
                    console.log(err);
                    $rootScope.emailLoginUserFreeServiceAccessGranted = false;
                    reject(err);
                }
    
                let json = {
                    "email": HigiKioskStorageService.returnSessionData('email'),
                    "purpose": "vital"
                }
                HigiApiService.isEmailLoginUserFreeServiceAvail(JSON.stringify(json), success, error);
            });
        }

        scope.lastCheckin.getPaymentFlow = function(){

            /* MEHTA FLOW FUNCTIONALITY START */
            if ($rootScope.mehtaFlow && $rootScope.mehtaPatientMRNo == '' && HigiKioskStorageService.returnSessionData('logged_in')) {
                // $rootScope.clearModal();
                $rootScope.mehtaFlowInit();
                return;
            }
    
            if ($rootScope.lastCheckinModalFirstFlow == undefined && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                $rootScope.lastCheckinModalShow = false;
                $rootScope.lastCheckinModalFirstFlow = false;
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
                    $rootScope.clearModal();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = scope.lastCheckin.initiateVitalTests;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', $rootScope.selectedVital);
                    if(!$rootScope.emailLoginUserFreeServiceAccessGranted){
                        if ($rootScope.checkPreviousPaymentSession() == true) {
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
        
                            $timeout(() => {
                                $rootScope.loadModal({id: 'serviceProvider'});
                            },300);
                        }else{
                            //To hide the reason for visit close button.
                            $(".keyboard_class_close_btn").hide();
        
                            $timeout(() => {
                                $rootScope.loadModal({id: 'reasonForVisit'});
                            },300);
                        }
                    }else{
                        scope.lastCheckin.initiateVitalTests();
                    }   
                }else{                                       
                    scope.lastCheckin.initiateVitalTests(); 
                }
            }else if($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                $rootScope.vitalPrintingCost = $rootScope.printingVitalAndPresCostObj['vital_print_cost_inbuilt']; 
                $rootScope.lastCheckinModalShow = false;
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.vitalPrintingCost > 0) {
                    $rootScope.clearModal();
                    $rootScope.printVitalDataOfUser = scope.lastCheckin.lastCheckinVitalDataCollection;
                    $timeout(() => {
                        $rootScope.loadModal({id: 'reasonForVisit'});
                    },300); 
                }
    
            } else if($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting) {
                $rootScope.prescriptionPrintingCost = $rootScope.printingVitalAndPresCostObj['prescription_print_cost_inbuilt']; 
                $rootScope.lastCheckinModalShow = false;
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.prescriptionPrintingCost > 0) {
                    $rootScope.clearModal();
                    $rootScope.printPrescriptionDataOfUser = scope.lastCheckin.collectPresOrConsultationData;
                    $timeout(() => {
                        $rootScope.loadModal({id: 'reasonForVisit'});
                    },300); 
                }
            } 
            else{
                JkioskService.logEvent($rootScope.currentKeyboardState + '_continue_btn', 'button', 'pressed');
                if($rootScope.isEmailLoginUserFreeServiceEnable && $rootScope.emailLoginUserFreeServiceAccessGranted){
                    scope.lastCheckin.initiateVitalTests();
                }                        
                $rootScope.clearModal();
            }
        }   
    }


    }
}]);