var higiKioskControllers = angular.module('higiKioskControllers' , ['ngAnimate', 'ngSanitize']);

higiKioskControllers.controller('HigiKioskBaseController' , ['$scope', '$interval', '$timeout', 'HigiKioskStorageService', '$rootScope', '$q', '$http', 'HigiKioskAnimationService', 'HigiKioskUtilitiesService','HigiApiService', 'JkioskService', 'HigiKioskFlow', '$location', 'fireStore', function($scope, $interval, $timeout, HigiKioskStorageService, $rootScope, $q, $http, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiApiService, JkioskService, HigiKioskFlow, $location, fireStore){
    HigiKioskStorageService.saveSessionData('logged_in', false);
    $scope.onWelcomeScreen = true;
    $rootScope.isVisibleLogo = true;
    //$rootScope.isVisibleLanguageButton = true;
    $scope.isVisibleLanguage = false;
    $scope.selectLangLabel = true;
    $rootScope.isVisibleAudio = false;
    $rootScope.isVisibleExit = false;
    $scope.welcomeLangSelectClass = "welcome";
    //$scope.isVisibleProfileImage = (HigiKioskStorageService.returnSessionData('logged_in') != undefined) ? HigiKioskStorageService.returnSessionData('logged_in') : false;
    $rootScope.isVisibleLogin = false;
    $rootScope.isVisibleReg = false;
    $rootScope.isVisibleProfileImage = false;
    $rootScope.skipTempCheck = false;
    $rootScope.skipWeightCheck = false;
    $rootScope.homeButtonShow = false;
    $rootScope.ECGSkipBtn = false;
    $rootScope.switchOnStatus = false;
    $rootScope.paymentSessionStarted = false;
    $rootScope.checkinasloggedin = true;
    $rootScope.TemperatureAvalibale = false;
    $rootScope.Spo2Avalibale = false;
    $rootScope.MVMAvailable = false;
    $rootScope.spo2SomethingCount = 0;
    $rootScope.homeBtnClick = false;
    $rootScope.externalPrinterName = "";
    $rootScope.termsAndPrivacyDocLang = "en_us";
    $rootScope.userSelectAffliateInRegFlow = "";
    $rootScope.empIdShowInRegFlow = false;
    $rootScope.languageEnable = false;
    $rootScope.sixLeadECGonly = false;

    $rootScope.SwitchAvailable = false;
    $rootScope.ecgSwitchedtoBmc = false;
    $rootScope.ZUGECGAvalibale = false;
    $rootScope.ECGModeAvalibale = false;
    $rootScope.ZUGECGLeftJackAvalibale = false;
    $rootScope.ZUGECGRightJackAvalibale =  false;
    $rootScope.zugBPavaliable = false;
    $rootScope.ZUGECGLegPlaced = false;
    $rootScope.zugEcgTestWentWrongAttempts = 0;
    $rootScope.showExitButton = true;
    $rootScope.showECGEmergencyStopButton = false;
    $rootScope.StopLEGHandDetection = false;
    $rootScope.isWaistCircumference = false;
    $rootScope.lowpulse = false;
    $rootScope.highpulse = false;
     
    $rootScope.teleMediDoctorcall =  false;
    $rootScope.floatingWindowLoaded = false;
    $rootScope.triggeredDoctorGem3s = false;
    $rootScope.mobileNumberValidate = false;
    $rootScope.currentCouponCode = ""; // apollo consultation coupon code
    $rootScope.couponCodePrinted = false; // avoid model box open
    $rootScope.currentlanguage = "English";
    $rootScope.previousUrl = '';
    $rootScope.selectedIvtListArray = [];
    $rootScope.recordingOrRegretComplete = false;
    $rootScope.RedoTestClicked = false;

    $rootScope.mosambeePaymentEnable = false;
    $rootScope.mosambeeHardwareEnable = false;
    $rootScope.invasiveEnable = true;
    $rootScope.invasiveMock = false;
    $rootScope.externalBillOrgList = [];
    $rootScope.disableExitLogout = false;
    $rootScope.fullBodyBMCTest = false;
    $rootScope.IHLTeleConsultSelected = false;
    $rootScope.ispaymentSuccesFailureContent = false;
    $rootScope.internetDropped = false;
    $rootScope.userIdForLogDetails = "";

    $rootScope.registerFlowFirstInput = "";
    $rootScope.radioValue = "";

    $rootScope.GSTno = "06AADC12816A1Z7";
    $rootScope.GSTaddress = "394, New Grain Market, Karnal Haryana";

    //$rootScope.hardwareAvailability = [];
    $rootScope.selectedVital = [];
    $rootScope.selectedIvtVital = [];
    $rootScope.temperatureModuleName = "Wrist";
    $rootScope.faceCaptureForTemp == false;
	$rootScope.foreheadTempStart = false;
	$rootScope.faceDetectCount = 0; 
	$rootScope.userinPosition = false;
	$rootScope.userCloser = false;
	$rootScope.userFarAway = false;


    //vital data printing variables
    $rootScope.paymentFlowForVitalPrinting = false;
    $rootScope.vitalPrintingCost = 0;
    $rootScope.printVitalDataOfUser;
    $rootScope.tempVitalDataForVitalPrint = {};
    $rootScope.tempDietRecommendForVitalPrint = {};
    $rootScope.printingVitalAndPresCostObj = {};

    //prescripton data printing variables
    $rootScope.paymentFlowForPrescriptionPrinting = false;
    $rootScope.prescriptionPrintingCost = 0;
    $rootScope.printPrescriptionDataOfUser;
    $rootScope.selected_speciality = "";

    $rootScope.userWeightInKg;

    //payment mode
    $rootScope.vitalPayment = false;
    $rootScope.kioskWithPaymentMode = false;
    $rootScope.paymentMock = false;
    $rootScope.kioskVitalTestCost = 0;
    $rootScope.kioskNonInvasiveTestCost = 0;
    $rootScope.kioskInvasiveTestCost = 0;
    $rootScope.totalMrpCost = 0;
    $rootScope.couponAmt = 0;
    $rootScope.proceedToVitalTestAfterKioskVitalPayment;
    $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat = false;
    $rootScope.kioskPaymentUserId = "9866232809";
    $rootScope.kioskPaymentPassword = "5025";
    $rootScope.paymentTransactionCompleted = false;
    $rootScope.isAllServicesProvidedToUser = false;
    $rootScope.unique_invoice_no = "";
    $rootScope.uniqueKioskId ="";
    $rootScope.vitalPriceFetching = false;
    $rootScope.userPaidServices = {
      "weight": false,
      "bp": false,
      "bmc": false,
      "bmc_full": false,
      "ecg": false,
      "spo2": false,
      "temperature": false,
      "service_provided": false,
      "invoice_id": ""
    };
    $rootScope.overallAffiliates = [];
    $rootScope.affiliateListFech = [];
    $rootScope.affiliateFromAdminPortal = [];
    $rootScope.affiliateEnableOnRegFlow = false;
    $rootScope.userAddToAffiliate = false;
    $rootScope.apolloTeleConsultationPopup = {
      'videoCallIframe': false
    };
    $rootScope.apolloTeleConsultationSourceDetails = {
      'userBasicDetails': null,
      'specialityId': undefined,
      'appointmentId': undefined,
      'apolloTeleConsultationVideoCallUrl':"",
      'message':"",
      'casesheetId': "",
      'doctorInformation': null
    };
    $rootScope.apolloCofirmGoHomeButtonClicked = false;
    $rootScope.invoiceIdForApolloTeleconsultationService = "";
    $rootScope.apolloConsultationLastSessionUncomplete = false;
    $rootScope.discountPaymentMethodSelected = false;
    $rootScope.prescriptionObjectFor1mg = "";
    $rootScope._is_base64_pdf_available = false;
    $rootScope.labObjectFor1mg = "";
    $rootScope._is_base64_labpdf_available = false;
    $rootScope.prescriptionNumberFor1mg = "";
    $rootScope.reasonForVisitText = "";

    //Kiosk Vital Sharing
    //$rootScope.shareHealthVitalsToDoctor = false;
    //$rootScope.userHealthVitalDataToShare;
    $rootScope.currentHealthVitalData;

    //discount option variable
    $rootScope.totalMrpCost = 0;
    $rootScope.couponNumber = "";
    $rootScope.discountType = "";
    $rootScope.paymentTransactionIdValue = "";

    //vital to tele-consultation dashboard
    $rootScope.showCompleteTeleServiceModalBox = true;
    $rootScope.isVitalTestCompleted = false;
    $rootScope.teleModalboxAppearedOneTime = false;

    //teleconsultation enable or disable & member service
    $rootScope.enableTeleConsultation = false;
    $rootScope.enableGlobalService = false;
    $rootScope.hpodAffiliations = [];
    $rootScope.globalServiceTeleConsult = [];
    $rootScope.selectedTeleconsultationService = "";
    $rootScope.enableGeneralServiceBookAppointmentOption = false;
    $rootScope.enableGeneralServiceDirectCallOption = false;
    $rootScope.availableVendorList = [];
    $rootScope.selectedAffiliation = {};
    $rootScope.selectedCategory = "";
    $rootScope.useralredyinTeleflow = false;
    //medication & lab partner obj
    $rootScope.buyMedLabAndMedicationPartnerObj = {};

    //show hide ecg print button
    $rootScope.showEcgPrintBtn = false;

    //SnackBar alert Variable
    $rootScope.snackBarAlertText = "";

    $rootScope.errorGeneratingQr = false;
    $rootScope.hideESanjeevaniBtn = true;
    $rootScope.comeBackScreenText1 = "";
    $rootScope.comeBackScreenText2 = "";
    $rootScope.kioskStateLocation = "";
    $rootScope.mehtaFlowInitiated = false;
    $rootScope.mehtaPopupCloseAfterLastCheckin = false;
    
    //language
     $scope.lead1comp = "global.lead1comp";
     $scope.move2 = "global.move2";
     $scope.lead2comp = "global.lead2comp";
     $scope.move3 = "global.move3";
     $scope.lead3comp = "global.lead3comp";
     $scope.sixleadcomp = "global.sixleadcomp";
     $scope.keepsame = "global.keepsame";
     $scope.movres = "global.movres";
     $scope.movres2 = "global.movres2";
     $scope.ecgreccom = "global.ecgreccom";
     $scope.movcomm = "global.movcomm";
     $scope.somrong = "global.somwrong";
     $scope.keepproper = "global.keepproper";
     $scope.reggret = "global.reggret";
     $scope.ecgtestfail = "global.ecgtestfail";
     $scope.weareunable = "global.weareunable";
     $scope.gentleplace = "global.gentleplace";
     $scope.bmctechissue = "global.bmctechissue";
     $scope.plugjack = "global.plugjack";
     $scope.poors = "global.poors";
     $scope.unableconclude = "global.unableconclude";
     $scope.letstry = "global.letstry";
     $scope.switchonecg = "global.switchonecg";
     $scope.ECGSkipped = "global.ecgskipped";
     $scope.plwait = "global.plwait";
     $scope.techECG = "global.techECG";
     $scope.techSpo2 = "global.techSpo2";
     $scope.loadinginstrustion = "global.loadinginstrustion";
     $scope.internetconn = "global.internetconn";
     $scope.tpserverntresp = "global.tpserverntresp";
     $scope.hpodseverntresp = "global.hpodseverntresp";
     $rootScope.affPlwait = "global.affilateUpdatePlwait";
     $rootScope.affilateUpdateProcess = "global.affilateUpdateProcess";
     $scope.PayNotAllowedHeader = "global.PayNotAllowedHeader";
     $scope.PayNotAllowedMessage = "global.PayNotAllowedMessage";
     $scope.doctorcallnotpickin = "global.telemedi.doctorcallnotpickin";
     $scope.callagain = "global.telemedi.callagain";
     $scope.cancel = "global.telemedi.cancel";
     $scope.techissuedoctorside = "global.telemedi.techissuedoctorside";
     $scope.mobreqtelemedi = "global.telemedi.mobreqtelemedi";
     $scope.OK = "global.telemedi.OK";
     $scope.docpreppresc = "global.telemedi.docpreppresc";
     $scope.Noprescthanksvisit = "global.telemedi.Noprescthanksvisit";
     $scope.BMCretryMsg = "global.retryBca";
     $scope.BMCskipMsg = "global.skipBca";
     $scope.infoboxReasonMsgBMC = "infobox.bca.warn.reason";
     $rootScope.checkingAvailabilitiyWait = "global.plwait";
     $rootScope.checkingAvailabilitiy = "global.checkDoctorAvail";
     $rootScope.internetLostTitle = "global.userInternetLost";
     $rootScope.internetLostInformation = "global.internetLostInformation";
     $rootScope.vitalNetworkConnectionLost = "global.vitalNetworkConnectionLost";
     $rootScope.vitalAmountNotFoundText = "global.vitalAmountNotFoundText";
     $rootScope.vitalAmountNotFoundRetryText = "global.vitalAmountNotFoundRetryText";
     $rootScope.bmcFootRestFoldedText = "global.bmcFootRestFoldedText";
     $rootScope.lowSpeedInternetText = "global.lowSpeedInternetText";
     $rootScope.lowSpeedInternetTextOK = "global.lowSpeedInternetTextOK";
     $rootScope.eSanTestRequestText = "global.eSanTestRequestText";
     $rootScope.eSanTestRequestTextOk = "global.eSanTestRequestTextOk";
     $rootScope.eSanPleasewait = "global.eSanPleasewait";
     $rootScope.unableToTakeVitalText = "global.unableToTakeVitalText";
     $rootScope.failedText = "global.failedText";
     $rootScope.succSentResultText = "global.succSentResultText";
     $rootScope.successText = "global.successText";
     $rootScope.moreDetailText = "global.moreDetailText";
     $rootScope.dataSyncFailText = "global.dataSyncFailText";
     $rootScope.weRegretText = "global.weRegretText";
     $rootScope.somethingWentWrongText = "global.somethingWentWrongText";
     $rootScope.tempSelectedText = "global.tempSelectedText";
     $rootScope.testNotAvailText = "global.testNotAvailText";
     $rootScope.isMEBOrg = false;
     $rootScope.enableESanjeevani = false;
     $rootScope.eSanjeevaniFlow = false;
     $rootScope.ivtServerConnection = false;
     $rootScope.eSanTestResultMsg = "";
     $rootScope.eSanTestResultFailedMsg = "";
     $rootScope.eSanSendResponseBtn = false;
     $rootScope.kioskMachineLogo = "";
     $rootScope.printTemplateLogo = "";
     $rootScope.weightExcluded = false;
     $rootScope.bmcExcluded = false;
     $rootScope.flipKartPlus = false;
     $rootScope.shutDownHPod = false;
     $rootScope.enableCamera = false;
     $rootScope.teleMedDisabled = false;
     $rootScope.abhaflowEnable = false;     
     $rootScope.ABHApopupCalled = false;
     $rootScope.mehtaFlow = false;
     $rootScope.ihlMembershipEnable = false;
     $rootScope.mehtaPatientMRNoAvailable = false;
     $rootScope.mehtaPatientMRNo = "";
     $rootScope.mehtaSelectedAreaId = "";
     $rootScope.mehtaUserMobileNumber = "";
     $rootScope.mehtaNextSlide = "";
     $rootScope.isRegFlowMobileMandatory = false;
     $rootScope.isGuestUserFlowDisable = false;
     $rootScope.isEmailLoginUserFreeServiceEnable = false;
     $rootScope.emailLoginUserFreeServiceAccessGranted = false;
    //  $rootScope.hPodRegistrationFlow = false;
    $rootScope.teleConsultationCollectionName = "/testteleconsultationServices";
    $rootScope.consultantOnlineCollectionName = "/testconsultantOnlineStatus";
    $rootScope.medicalDocUploadCollectionName = "/testMedicalDocUploadFromKiosk";
    $rootScope.vitalPriceObjectOfThisKiosk = "";

      if (getSettingsValue('kiosk.api.url') == 'https://azureapi.indiahealthlink.com/') {
        $rootScope.teleConsultationCollectionName = '/teleconsultationServices';
        $rootScope.consultantOnlineCollectionName = '/consultantOnlineStatus';
        $rootScope.medicalDocUploadCollectionName = "/medicalDocUploadFromKiosk";
      }

      jkiosk.fingerprintCallBack = function(response){
        console.log("fingerprintCallBack is triggered");
        var hardwareDetectFingerprint = response.hardwareDetect;
        console.log("fingerprintCallBack value " + response.hardwareDetect);
        //HigiKioskStorageService.saveSessionData("fingerprintTrue",  response.hardwareDetect);
        if(response.hardwareDetect){
            //alert("true");
            $rootScope.fingerprintTrueorFalse = true;
            //localStorage.setItem("fingerprintTrueorFalse", "true");
        }
        else{
            //alert("false");
            $rootScope.fingerprintTrueorFalse = false;
            //localStorage.setItem("fingerprintTrueorFalse", "false");
        }
    };
    
     //payemt ifram show hide global declartion
    $rootScope.paymentGateway = false;
    jkiosk.onPaymentTriggerCallback = function(response) {
        console.log(response);
        $rootScope.paymentGateway = response.isPaymentEnable;
        localStorage.setItem("paymentLiveMode", response.paymentLiveMode);
        if($rootScope.paymentGateway == true){
            paymentpageInit();
        }
    };

     /*for mosambee payment and payment-hardware enable/disable (thamarai)*/
    jkiosk.onMosambeeTriggerCallback = function(response) {
        console.log("inside mosambee");
        console.log(response.mosambeePaymentEnable);
        console.log(response.mosambeeHardwareEnable);
        console.log(response.externalBillOrgList)
        
        if(response.vitalPayment === true) $rootScope.vitalPayment = true;
        else $rootScope.vitalPayment = false;
        
        if(response.affiliateEnableOnRegFlow === true) $rootScope.affiliateEnableOnRegFlow = true;
        else $rootScope.affiliateEnableOnRegFlow = false;

        if(response.userAddToAffiliate === true) $rootScope.userAddToAffiliate = true;
        else $rootScope.userAddToAffiliate = false;
        
        if(response.externalBillOrgList.indexOf(",")){
                $rootScope.externalBillOrgList = response.externalBillOrgList.split(",");
            } else {
                $rootScope.externalBillOrgList = [response.externalBillOrgList];
            }

        if(response.paymentMock == true){
          $rootScope.paymentMock = true;  
        }

        if (response.mosambeePaymentEnable == true) {
          $rootScope.mosambeePaymentEnable = false;
          $rootScope.kioskWithPaymentMode = true;
        } else {
          $rootScope.mosambeePaymentEnable = false;
          $rootScope.kioskWithPaymentMode = false;
        }

        if (response.mosambeeHardwareEnable == true) {
          $rootScope.mosambeeHardwareEnable = true;
        } else {
          $rootScope.mosambeeHardwareEnable = false;
        }
        
        if (response.empIdShowInRegFlow == true) {
          $rootScope.empIdShowInRegFlow = true;
        } else {
          $rootScope.empIdShowInRegFlow = false;
        }
        
        if (response.languageEnable == true) {
          $rootScope.languageEnable = true;
        } else {
          $rootScope.languageEnable = false;
        }
        
        if (response.sixLeadECGonly == true) {
          $rootScope.sixLeadECGonly = true;
        } else {
          $rootScope.sixLeadECGonly = false;
        }
        
        if(response.invasiveEnable == true){
          $rootScope.invasiveEnable = true;
        } else {
          $rootScope.invasiveEnable = false;
        }

        if(response.invasiveMock == true){
          $rootScope.invasiveMock = true;
        } else {
          $rootScope.invasiveMock = false;
        }

        if (response.shutDownCode != undefined)
          $rootScope.shutdownCode = response.shutDownCode;

        console.log("mosambeePaymentEnable   "+response.mosambeePaymentEnable);
        console.log("mosambeeHardwareEnable   "+response.mosambeeHardwareEnable);

        /*if ($rootScope.mosambeePaymentEnable) {
          window.location.href="#/mosambeePayment";
        }else{
          window.location.href="#/welcome";
        }*/
        $scope.offline_data_check_start();
    };
    /*for mosambee payment and payment-hardware enable/disable - end (thamarai)*/

    jkiosk.onSpo2TriggerCallback = function(response) {
        $rootScope.Spo2Avalibale = response.Spo2Status;
    };
      jkiosk.onZUGECGTriggerCallback = function(response) {
        $rootScope.ZUGECGAvalibale = response.ZUGECGStatus;
    };
    jkiosk.onTemperatureTriggerCallback = function(response) {
        $rootScope.TemperatureAvalibale = response.TemperatureStatus;
        if($rootScope.TemperatureAvalibale){
            JkioskService.getTemperatureModuleName($scope.temperatureModuleNameRes);
        }

    };
    jkiosk.onMvmTriggerCallback = function(response){
        $rootScope.MVMAvailable = response.MvmStatus;
    };

    jkiosk.isZugBPOnReadyRes = function(response){ 
        if(response.ZUGBPAvailable == undefined) return 0;
        if(response.ZUGBPAvailable == true){         
            $rootScope.zugBPavaliable = true;   
        }
    }

    jkiosk.onTeleMedTriggerCallback = function(Res){
      console.log(Res);
      var TeleMedSetting;
      if(Res.isApiCallSucess){
          TeleMedSetting = JSON.parse(Res.response); 
          $rootScope.telemediApiVendor = TeleMedSetting.vendor;
          $rootScope.telemediSetting = TeleMedSetting.telemedi;
          $rootScope.telemediDeviceId = TeleMedSetting.deviceid;
          $rootScope.questionnaireEnable = TeleMedSetting.questionnaireEnable;
      }
    };

    $scope.intervalID;
    $scope.offileDataIntervalStart = true;
    
    $scope.OfflineDataindex = 0;
    $scope.offline_data_check_start = function() {
      $scope.intervalID = setInterval($scope.offilnedata, 90000);
    }
    // Clear the interval
    $scope.stopInterval = function() {
      $scope.offileDataIntervalStart  = false;
      clearInterval($scope.intervalID);
    }
    $scope.offilnedata = function() {
      // Check if the user is on the "welcome" page
      $scope.path = $location.path();

      if(navigator.onLine && $scope.path=="/welcome" && $rootScope.isUserSeated == false) 
      {
        $scope.stopInterval();
        console.log("Device is in Online , Page is in Welcome and Seated is False");
        $scope.fetchDataAndSendToAPI();
      } 
      else {
        if($scope.offileDataIntervalStart == false){
          $scope.offline_data_check_start();
        }
      }
    }
    
    $scope.fetchDataAndSendToAPI = function() {
      // console.log("000000000000000000000000000000")
      // console.log($rootScope.uniqueKioskId)
      HigiApiService.offile_users_data($rootScope.uniqueKioskId,
        //Success
        function(resp) {
          // console.log(resp);
          console.log(typeof(resp));
          var jsonArray = JSON.parse(resp);
          console.log(jsonArray);
          console.log(typeof(jsonArray));
          if ($scope.OfflineDataindex < jsonArray.length) {
            const checkin = jsonArray[$scope.OfflineDataindex];
            // Send the item to the specific API
            // console.log(checkin)
            $scope.sendDataToAPI(checkin);
          }
          else{
            console.log("There is no data")
          }
        },
        //Failure
        function(e) {
          console.log('Error:', e);
        }
      )
    }

    $scope.sendDataToAPI = function(data) {
      HigiApiService.CreateCheckInGameAsyncGuest(data,
        //Success
        function(resp) {
          HigiApiService.delete_offile_users_data($scope.OfflineDataindex,$rootScope.uniqueKioskId,
            //Success
            function(resp) {
              console.log(resp);
              $scope.offilnedata();
            },
            //Failure
            function(e) {
              /* console.log("Error occurred while deleting the parameter.");
              $scope.OfflineDataindex  = index_no + 1;
              console.log($scope.OfflineDataindex)
              $scope.fetchDataAndSendToAPI($scope.OfflineDataindex); */
            }
          )
        },
        //Failure
        function(e) {
          $scope.OfflineDataindex  =  $scope.OfflineDataindex + 1;
          // console.log($scope.OfflineDataindex)
          $scope.offilnedata();
        }
      );
    }

    localStorage.removeItem("checkStartStatus");

    $scope.temperatureModuleNameRes = function(res){
        console.log(res);
        if("HardwareType" in res){
            $rootScope.temperatureModuleName = res.HardwareType
        }
    }

  $rootScope.teleMediCheckin = function() {

  var kioskConfig = HigiKioskStorageService.returnSessionData('kioskConfigurationResult');

    var checkin = new HigiCheckin();
    checkin.IHLMachineId = kioskConfig.serialNumber;
    checkin.dateOfBirth = HigiKioskStorageService.returnSessionData('telemedUserDOB');
    checkin.telemed_call_attended = true;
    checkin.telemed_vendor_name = $rootScope.telemediApiVendor;
    checkin.telemed_call_duration = $rootScope.callDuration;
    checkin.telemed_doctor_name = HigiKioskStorageService.returnSessionData("doctors_lists_id");
    checkin.telemed_payment_amount = "0";
    checkin.telemed_doctor_precription_given = $rootScope.telemed_doctor_precription_given;
    checkin.telemed_doctor_precription_details = $rootScope.prescriptionsDataStore;


    console.log(checkin);
    var IHLUserToken = $rootScope.UserToken;
    var myCheckin = JSON.stringify(checkin);
    //alert(IHLUserToken);
    console.log(myCheckin);


    var qlogin = HigiKioskStorageService.returnSessionData('qlogin');

    $.ajax({
        //  url: "https://testserver.indiahealthlink.com/data/user/"+HigiKioskStorageService.returnSessionData('telemedloginUserId')+"/checkIn/?email=" + encodeURIComponent("test322@yahoo.com"),
        url: getSettingsValue('kiosk.api.url') + "/data/user/" + qlogin.User.id + "/checkIn/?email=" + encodeURIComponent(qlogin.User.email),
        type: "PUT",
        cache: false,
        data: myCheckin,
        contentType: 'application/json; charset=UTF-8',
        dataType: 'json',
        headers: {
            'ApiToken': $rootScope.ApiToken,
            'Token': $rootScope.UserToken
        },
        success: function(html) {
            //alert("success response 3");
            console.log(html);

            var qlogin = html;
            //alert("checkin completed");
        },
        error: function(xhr, status, error) {
            console.log(error);
            console.log(status);
            console.log('failures 3' + xhr.responseText);
        }
    });

}


    $rootScope.kioskOrgBasedAffliateAdd = function(qloginData){
        if(!$rootScope.userAddToAffiliate && $rootScope.userSelectAffliateInRegFlow == "") return 0;
        $scope.affiliateFromAdminPortal = "";
        if($rootScope.userSelectAffliateInRegFlow.includes("Embassy Boulevard")){
            if($rootScope.userSelectAffliateInRegFlow.includes("Residence")){
                $scope.affiliateFromAdminPortal = "Embassy Boulevard";
            } else {
                $scope.affiliateFromAdminPortal = "Embassy Boulevard Staff";
            }
        } else if($rootScope.userSelectAffliateInRegFlow.includes("Wework")){
            if($rootScope.userSelectAffliateInRegFlow.includes("Member")){
                $scope.affiliateFromAdminPortal = "Wework Member";
            } else {
                $scope.affiliateFromAdminPortal = "Wework Employee";
            }
        } else if($rootScope.userSelectAffliateInRegFlow.includes("Mehta Hospital")) {
            if($rootScope.userSelectAffliateInRegFlow.includes("Clinicians")){
                $scope.affiliateFromAdminPortal = "Mehta Clinicians";
            } else if($rootScope.userSelectAffliateInRegFlow.includes("Nursing")){
                $scope.affiliateFromAdminPortal = "Mehta Nursing";
            } else if($rootScope.userSelectAffliateInRegFlow.includes("Para")){
                $scope.affiliateFromAdminPortal = "Mehta Para";
            } else if($rootScope.userSelectAffliateInRegFlow.includes("Support")){
                $scope.affiliateFromAdminPortal = "Mehta Support";
            }            
        } else {
           $scope.affiliateFromAdminPortal = $rootScope.affiliateFromAdminPortal[0];
        }
        //return 0;
        $scope.qloginData = qloginData;
        console.log($rootScope.affiliateListFech);
        console.log("company name = " + $scope.affiliateFromAdminPortal); // India Health Link

        if($rootScope.affiliateListFech.length > 0){ // 
            $scope.findKioskAffliate = $rootScope.affiliateListFech.filter(function(obj){
                if(obj.company_name == $scope.affiliateFromAdminPortal){
                    return obj;
                }
                //return obj.message
            });
            console.log($scope.findKioskAffliate);
            if($scope.findKioskAffliate.length > 0){
                $scope.qloginData = HigiKioskStorageService.returnSessionData('qlogin')
                $scope.affliate_identifier_id = "";
                if(qloginData.employee_id != undefined && qloginData.employee_id != ''){
                    $scope.affliate_identifier_id = qloginData.employee_id;
                }
                $scope.affiliateDataFormat = {
                    "affilate_unique_name": $scope.findKioskAffliate[0].affiliation_unique_name, //"housing_society",
                    "affilate_name": $scope.findKioskAffliate[0].company_name, // "Housing Society",
                    "affilate_email": $scope.qloginData.User.email,
                    "affilate_mobile": $scope.qloginData.User.mobileNumber || "",
                    "affliate_identifier_id": ""
                }
                //console.log($scope.affiliateDataFormat);
                var success = function(e){
                    console.log(e);
                };
                var failure = function(e){
                    console.log(e);
                };
                if("user_affiliate" in $scope.qloginData.User){
                    if(Object.keys($scope.qloginData.User.user_affiliate).length > 0){
                        if(Object.keys($scope.qloginData.User.user_affiliate).length == 9){
                          //alert("max limit reached");
                          return;  
                        }

                        $scope.affiliateIsExist = false;
                        var ExistAffiliateObj = $scope.qloginData.User.user_affiliate; 
                        for(var i = 0; Object.keys(ExistAffiliateObj).length > i ; i++){
                            var AffiliateIndex = i + 1;
                            //console.log(ExistAffiliateObj["af_no"+AffiliateIndex]);
                            if(ExistAffiliateObj["af_no"+AffiliateIndex] != undefined){
                                if(ExistAffiliateObj["af_no"+AffiliateIndex].affilate_name == $scope.affiliateFromAdminPortal){
                                    $scope.affiliateIsExist = true;            
                                }
                            }
                        }

                        
                        //console.log("$scope.affiliateIsExist = " + $scope.affiliateIsExist);
                        if(!$scope.affiliateIsExist){
                            var objIndex = (Object.keys($scope.qloginData.User.user_affiliate).length) + 1;
                            $scope.qloginData.User.user_affiliate["af_no" + objIndex] = $scope.affiliateDataFormat;
                            HigiApiService.updateIHLuserData($scope.qloginData.User.id, $scope.qloginData.Token, $scope.qloginData.User, success, failure);
                        } else {
                            //alert("affiliate already exists");
                        }          
                    } else {
                        // add the first object "af_01"    
                        $scope.qloginData.User.user_affiliate = {};
                        $scope.qloginData.User.user_affiliate.af_no1 = $scope.affiliateDataFormat;
                        HigiApiService.updateIHLuserData($scope.qloginData.User.id, $scope.qloginData.Token, $scope.qloginData.User, success, failure);
                    }
                } else {
                    // add the first object "af_01"
                    $scope.qloginData.User.user_affiliate = {};
                    $scope.qloginData.User.user_affiliate.af_no1 = $scope.affiliateDataFormat;
                    HigiApiService.updateIHLuserData($scope.qloginData.User.id, $scope.qloginData.Token, $scope.qloginData.User, success, failure);
                }

                //console.log($scope.qloginData);
                //alert("check log");
                
                    
            }
        }
    }
   /* $rootScope.organization = "safal";
    $rootScope.bpcEnable = true;
    
    if($rootScope.bpcEnable){
      if($rootScope.organization == "safal") {
        if (localStorage.getItem("safalPage") === null || localStorage.getItem("safalPage") === undefined) {
            localStorage.setItem("safalPage", true);  
        }
        if(localStorage.getItem("safalPage") === "true"){
            window.location = 'initpage.html';
        }
      }      
    }*/
     $rootScope.bpcEnable = true;
/*
 if(localStorage.getItem("safalPage") === "true"){
            window.location = 'initpage.html';
            $rootScope.bpcEnable = true;
    
    }
*/
    var promise;
    function paymentpageInit(){
        console.log("payemt init fn call");
        console.log($rootScope.paymentGateway);
        if($rootScope.paymentGateway){
            console.log(" paymentGateway true;")
           promise = $interval(checkStartStatus, 3000);
        }
    }

    function checkStartStatus() {
        console.log("interval call");
        if(localStorage.getItem("checkStartStatus") == "yes"){
            console.log("interval");
            $interval.cancel(promise);
            $rootScope.paymentGateway = false;
        }
    }

    // ecg warning model box hide
    $('#ekgHnot').hide();
    $('#bmcRegret').hide();
    $('#bmcsignallost').hide();   // this is for bmc hand & leg is not in proper
    $('#bmcconcluderesult').hide();   // this is for 3 times page is loaded


    $("#teleMedWait").hide();
    $("#teleMedClose").hide();
    $("#teleMedLoad").hide();


    $('#spo2Hnot').hide();
    $('#spo2Regret').hide();
    $('#temperatureHnot').hide();
    $('#temperatureRegret').hide();
    

    $('#ekgRegret').hide();
       $('#ecgLegMessageInstruction').hide();
    $('#ecgOnlyLegMessageInstruction').hide();

    $("#ecgTestSkippedMessage").hide();
    $("#ecgHandMessageInstruction").hide();
    $("#ecgPlaceLegProperMessageInstruction").hide();
    $("#ecgTestRedoMessageInstruction").hide();
    $("#ecgSwitchOnMessageInstruction").hide();
    $("#ecgLeadICompleteDialog").hide();
    $("#ecgLeadIICompleteDialog").hide();
    $("#ecgLeadIIICompleteDialog").hide();
    $("#ecgRecordingComplete").hide();
    $("#ZugEcgRegretMessage").hide();
    $("#ecgLeadCompleteDialog").hide();
    $("#SpO2NotAvailable").hide();
    $("#ECGNotAvailable").hide();
    
    $("#teleMedGem3sInternet").hide();
    $("#teleMedGem3sServer").hide();
    $("#teleMedHpodServer").hide();
    $("#teleMedGem3sDoctorUnava").hide();
    $("#teleMedGem3sCallAgain").hide();    
    $("#teleMedGem3sMobileInputReq").hide();

    $("#affiliateUpdatingModal").hide();
    $("#paymentForZeroCost").hide();
    $("#doctorAvailabilityCheck").hide();

    $("#fpWarning").hide();
    $("#footWearFoldedError").hide();
    $("#kioskPaymentOfflineModal").hide();
    $("#kioskVitalPriceNotAvailableModal").hide();
    $('#lowSpeedInternetModal').hide();
    $('#multiPrinterAvailabilityPopupVisible').hide();
    
   $('#ApolloCouponCode').hide();
   $('#couponCodeErrorModal').hide();

   //E-SANJEEVANI TEST REQUEST
    $("#eSanTestRequestRegret").hide();
    $('#eSanTestRequestSuccess').hide();
    $('#eSanTestRequestFailed').hide();
    $('#eSanTestRequestSuccessFailed').hide();
    $('#eSanTestRequestFailedInfo').hide();
    $('#eSanSendResponseModal').hide();

   // $scope.loadingScreenMessage ="loadingscreen.message";
    $scope.loadingScreenMessage ="It may take upto 10 mins, Please wait.";
    $rootScope.fpWarningTxt = null;
    $rootScope.loadingModalVisible = true;
    $rootScope.teleMediLoadingVisible = false;
    $rootScope.loadingModalVisiblee = true;

    
    //$rootScope.ToDisableECGAlert = true;
    $rootScope.bodyHide = true;
    //$rootScope.loggedIn = false;
    $rootScope.uiTestingEnabled = false;
    $rootScope.screenSize = window.innerWidth;
    $rootScope.sessionExitConfirmVisible = false;
    $rootScope.timeoutsReady = $q.defer();
    $rootScope.loggedEvents = $rootScope.loggedEvents || [];
    $scope.systolicArray = [];
    $scope.diastolicArray = [];
    $scope.pulseArray = [];
    $scope.bpArray = [];
    $rootScope.emailExtensionEnabled = false;
    $rootScope.testCompleted = false;
    $scope.thirdPartyData = {};

    HigiKioskStorageService.loadSettings();
    HigiKioskStorageService.saveSessionData('sessionId', HigiKioskUtilitiesService.generateSessionId());

// barcode reader device to shoutdown hpod start
    jkiosk.onBarcodeReaderTriggerCallback = function(Res) {
        console.log(Res);
        $rootScope.BarcodeReaderDevice = Res.status;
        $rootScope.shutdownCode = Res.shutdownCode;
        //alert("$rootScope.BarcodeReaderDevice = "+ $rootScope.BarcodeReaderDevice);
        //alert("$rootScope.shutDownCode = "+ $rootScope.shutdownCode);
    }
const shutdownHpod = document.getElementById('global_splash_logo');
//console.log(shutdownHpod);

shutdownHpod.addEventListener('click', event => {
    if (event.detail === 3) {
        //alert("trible click");
        var path = $location.path();
        if (path == "/welcome") {
            //alert("initShutdown callback");
            //JkioskService.initShutdown($scope.initShutdownRes);
            $rootScope.flipKartPlus = false;
            $rootScope.shutDownHPod = true;
            $rootScope.loadModal({id: 'shutDownHPodModal'});
        } else {
            console.log("not allowed for shutdowmn process");
        }
        //window.scroll(0,0);
    }
});

    $scope.initShutdownRes = function(Res){
        //alert("response recived");
        //alert(JSON.stringify(Res));
        console.log(Res);
        //alert(Res.status);
        if(Res.status){
          var ret = Res.barcodeData.replace('\u0006','');
          //alert(ret);
          if(ret == $rootScope.shutdownCode){
            //alert("execute shutdown exc");
            JkioskService.shutdownExeTrigger();            
          } else {
            //alert("faild");
          }
        } else {
          console.log("barcode not readed (Res.status)= "+ Res.status);
        }        
    }
// barcode reader device to shoutdown hpod end

    $rootScope.initShutDownHPodByQRCode = function(qrCodeVal) {
      console.log(qrCodeVal);
      console.log($rootScope.shutdownCode);
      if (qrCodeVal == $rootScope.shutdownCode) {
        //alert("execute shutdown exc");
        console.log('Success');
        JkioskService.shutdownHPodExeTrigger();            
      } else {
        //alert("faild");
        console.log('Failed');
      }
    }

  $rootScope.thirdPartyAjaxcall = function(){
            var checkResp = 0;

            $scope.thirdPartyData = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
            $scope.thirdPartyData.userEmail =  HigiKioskStorageService.returnSessionData('userEmail');
            if(HigiKioskStorageService.returnSessionData('ihl_id') != undefined){
                $scope.thirdPartyData.IHL_ID = HigiKioskStorageService.returnSessionData('ihl_id');
            }

            $scope.thirdPartyData.Bmi, $scope.thirdPartyData.BpClass, $scope.thirdPartyData.FatClass, $scope.thirdPartyData.PulseClass  = "";
            $scope.thirdPartyData.BmiClass = "";


            if($scope.thirdPartyData.weightKG != undefined){
                $scope.thirdPartyData.Bmi = HigiKioskUtilitiesService.calculateBmi($scope.thirdPartyData.weightKG,$scope.thirdPartyData.heightMeters);
                $scope.thirdPartyData.BmiClass = HigiKioskUtilitiesService.calculateBmiRisk($scope.thirdPartyData.Bmi);
            }

            if($scope.thirdPartyData.systolic != undefined || $scope.thirdPartyData.systolic != ''){
                $scope.thirdPartyData.BpClass = HigiKioskUtilitiesService.calculateBpRisk($scope.thirdPartyData.systolic,$scope.thirdPartyData.diastolic);
            }

            if($scope.thirdPartyData.bmcOhms != undefined || $scope.thirdPartyData.bmcOhms !=''){
                $scope.thirdPartyData.FatClass = HigiKioskUtilitiesService.calculateBmcRisk($scope.thirdPartyData.bmcOhms, $scope.thirdPartyData.gender);
            }

            if($scope.thirdPartyData.pulseBpm != undefined || $scope.thirdPartyData.pulseBpm !=''){
                $scope.thirdPartyData.PulseClass = HigiKioskUtilitiesService.calculatePulseRisk($scope.thirdPartyData.pulseBpm);
            }

            console.log($scope.thirdPartyData);
            var now = new Date;
            var timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() ,
                now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());

        if(($scope.thirdPartyData.weightKG != undefined ||
                $scope.thirdPartyData.Bmi != undefined ||  $scope.thirdPartyData.BmiClass != "" ||
                $scope.thirdPartyData.bmcOhms != undefined || $scope.thirdPartyData.pulseBpm != undefined ||
                $scope.thirdPartyData.systolic != undefined || $scope.thirdPartyData.diastolic != undefined ||
                $scope.thirdPartyData.ECGRawFullData != "" || $scope.thirdPartyData.FatClass !="" ||
                $scope.thirdPartyData.PulseClass != "" || $scope.thirdPartyData.BpClass != "") && ($scope.thirdPartyData.IHL_ID != "Guest") ) {
            var dataString = '{"TransactionID": "'+ timestamp+'", "UserEmail": "'+$scope.thirdPartyData.userEmail+'", "Weight": "'+$scope.thirdPartyData.weightKG+'", "Bmi": "'+$scope.thirdPartyData.Bmi+'", "BmiClass": "'+$scope.thirdPartyData.BmiClass+'", "FatRatio": "'+$scope.thirdPartyData.fatRatio+'", "PulseBpm": "'+$scope.thirdPartyData.pulseBpm+'", "Systolic": "'+$scope.thirdPartyData.systolic+'", "Diastolic": "'+$scope.thirdPartyData.diastolic+'", "Gender": "'+$scope.thirdPartyData.gender+'", "Age": "'+$scope.thirdPartyData.Age+'", "HeightMeters": "'+$scope.thirdPartyData.heightMeters+'", "ECGDataFiltered": "'+$scope.thirdPartyData.ECGData+'", "ECGRawFullData": "'+$scope.thirdPartyData.ECGRawFullData+'", "FatClass": "'+$scope.thirdPartyData.FatClass+'", "PulseClass": "'+$scope.thirdPartyData.PulseClass+'", "BpClass": "'+$scope.thirdPartyData.BpClass+'", "IHLID": "'+$scope.thirdPartyData.IHL_ID+'", "TimeStamp": "'+timestamp+'", "AcessToken": "'+timestamp+'" }' ;
               //console.log(dataString);
               //return 0;
                  $.ajax({
                      url: getSettingsValue('kiosk.api.url') + "/login/thirdParty",
                     // url : "https://azureapi.indiahealthlink.com/login/thirdParty",
                      type : "POST",
                      cache: false,
                     //data: $scope.thirdPartyData,
                     data: dataString,
                      contentType: 'application/json; charset=UTF-8',

                      dataType: 'json',
                      headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
                      success: function(Res) {
                        //console.log(JSON.parse(Res.replace(/&quot;/g,'"')));
                        var output = JSON.parse(Res.replace(/&quot;/g,'"'));
                        if(output['response'] === 'S'){
                            checkResp++;
                            if(checkResp > 1){
                                //JkioskService.logEvent('slide_finalresults01_higiscorePanel', 'button', 'pressed');
                                JkioskService.logEvent('thirdPartyData_ajax_call', 'success', 'ihlAzureAnalytic3_table');
                                $scope.comebackSoon();
                            }
                        } else {
                            //console.log("ajax azure data response error");
                            JkioskService.logEvent('thirdPartyData_ajax_call', 'error', 'ihlAzureAnalytic3_table');
                            $scope.comebackSoon();
                        }
                      },
                      error: function(Error) {
                          //console.log(Error);
                        $scope.comebackSoon();
                      }
                  });


//var dataString = '{"TransactionID": "", "UserEmail": "", "Weight": "", "Bmi": "", "BmiClass": "", "FatRatio": "", "PulseBpm": "", "Systolic": "", "Diastolic": "", "Gender": "", "Age": "", "HeightMeters": "", "ECGDataFiltered": "", "ECGRawFullData": "", "FatClass": "", "PulseClass": "", "BpClass": "", "IHLID": "", "TimeStamp": "", "AcessToken": "" }' ;

var payload = { authToken : 'Basic cGVyc2lzdGVudF9paGxfdGVzdDozS1pVWTBXVU94VEVmNEc3UDljWEVHdlNSMk1oVGM=' ,
                data : dataString };
$.ajax({
  type: "POST",
  url: "https://idoctor.persistent.co.in/api/vitals/setUserVital",
  dataType: 'json',
  async: true,
  data:payload,
  success: function (data,resp,xhqr){
   //console.log(data,resp,xhqr)
     checkResp++;
    if(checkResp > 1){
        JkioskService.logEvent('thirdPartyData_ajax_call', 'success', 'persistent_data_sent');
        $scope.comebackSoon();
    }
  },
  error : function(xhr, status, error) {
        //alert('Response Failure '+xhr.responseText);
        JkioskService.logEvent('thirdPartyData_ajax_call', 'error', 'persistent_data_sent');
        $scope.comebackSoon();
   }
});

} else {
    $scope.comebackSoon();
}

}


$scope.comebackSoon = function(){
    $('#thirdPartyDiv').hide();
    $rootScope.loadModal({id: 'ratingconfirm'});
    window.location = "#/comebacksoon";
}
    $rootScope.getGlobalVolume =function(){
        var volume;
        if($scope.isAudioMuted){
            volume = 0;
        } else if($scope.globalAudioVolume == undefined){
            volume = HigiKioskStorageService.getSettingsValue('global.default.audio.volume');
        } else {
            volume = $scope.globalAudioVolume;
        }
        return volume;
    };

    $scope.redirectedToDoctorListPage = function(){
        $("#teleMedGem3sCallAgain").hide();
    }

    //close - slow internet model box
    $scope.closeLowSpeedInternetModal = function() {
        $('#lowSpeedInternetModal').hide();
        return;
    }

    $scope.callFullBodyBMCFootWearStatusCallbackFunction = function(response){
      $rootScope.footWearFolded = response.ecgLeftJackStatus;
        /* We have comment the code as per management request on 09/06/2022 */

        /*if($rootScope.footWearFolded == false){
          $("#footWearFoldedError").show();
        }
        else{
        }*/
    }

    $scope.footrestButtonClick = function(){
      $("#footWearFoldedError").hide();
      JkioskService.callFullBodyBMCFootWearStatusFunction($scope.callFullBodyBMCFootWearStatusCallbackFunction);
    }
    $scope.homeButtonClick = function(){
      $("#teleMedGem3sInternet").hide();
      $("#teleMedGem3sServer").hide();
      $("#teleMedHpodServer").hide();
      $("#teleMedGem3sCallAgain").hide();
      $("#teleMedGem3sMobileInputReq").hide();

        $('#ApolloCouponCode').hide();
        $('#couponCodeErrorModal').hide();
        $('.apollo-coupon-print-button').hide();
        $('#couponCodeBind').text("*********");
            
      $rootScope.hideESanjeevaniBtn = false;
      $rootScope.homeBtnClick = true;
      $rootScope.homeButtonShow = false;
      $rootScope.isVisibleExit = true;
      $rootScope.showExitButton = true;
      $rootScope.showPrintButton = false;
      $rootScope.showEmailButton = false;
      $rootScope.ispaymentSuccesFailureContent = false;
      $rootScope.discountPaymentMethodSelected = false;
      // $rootScope.clearActiveIvtTest();  // Invasive payment enabled so no need to clear the ivt test
      $rootScope.clearModal();
      $(".keyboard_class_close_btn").show();
      //$rootScope.isVisibleReg = false;
      //$rootScope.isVisibleAudio = true;

      //for kiosk payment mode
      if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false) {
        $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat = true;
        if(localStorage.getItem("ivtSelectedTest")) {
          $rootScope.ivtSelectedTest = JSON.parse(localStorage.getItem("ivtSelectedTest"));
          $rootScope.selectedIvtListArray = $rootScope.ivtSelectedTest;
        }else if(localStorage.getItem("ivtListArr") != true){
          $rootScope.selectedIvtListArray = JSON.parse(localStorage.getItem("ivtListArr"));
        }
      }

      if ($rootScope.IHLTeleConsultSelected == true) {
        $rootScope.IHLTeleConsultSelected = false;
        $rootScope.paymentTransactionCompleted = false;
        $scope.reInitializeTeleconsultationNamespaceObject();
      }
      
                
      if($rootScope.telemediSetting && (HigiKioskStorageService.returnSessionData('logged_in'))) {      
        $rootScope.teleMediDoctorcall =  false;
        $rootScope.floatingWindowLoaded = false;
        $rootScope.telemedicineButtonAvailable = true;
      }
      if(HigiKioskStorageService.returnSessionData('logged_in')){          
        $(".higi_login_btn_profile").show(); 
      } else {
        $(".higi_login_btn_profile").hide(); 
      }
      $rootScope.couponAmt = 0;

      $rootScope.teleconsultationUserSelectedData = {};
      $rootScope.dataForAppointmentBooking = {
        "doctorInfo":{},
        "dateAndTime":"",
        "doctorFees":0,
        "reasonForVisit":"",
        "userId":""
      };
      $rootScope.prescriptionObjectFor1mg = "";
      $rootScope._is_base64_labpdf_available = false;
      $rootScope.labObjectFor1mg = "";
      $rootScope._is_base64_pdf_available = false;
      $rootScope.prescriptionNumberFor1mg = "";
      $rootScope.reasonForVisitText = "";
      //discount option variable
      $rootScope.totalMrpCost = 0;
      $rootScope.couponNumber = "";
      $rootScope.discountType = "";
      $rootScope.paymentTransactionIdValue = "";
      // $rootScope.selectedIvtListArray = [];
      if($rootScope.weightExcluded){
        $rootScope.selectedVital.push("w");
        /*
        //Issue Explanation
        a)Full body test taken except invasive moved to final result page. Then click home button sees all test css selected.
        b). If unselected any of the test and taken the test which is selected and then moved to final result page. Then click home button, now u can see the test which is in selceted alone can retake the test others are disabled.
        */
        let paymentSessionVitalTest = JSON.parse(localStorage.getItem("paymentSessionVitalTest"));
        paymentSessionVitalTest.push("w");
        localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(paymentSessionVitalTest));// Here updating the localstorage is creating the issue
      }

      /* code commented for continue invasive test repeatedly when home button is clicked
      if($rootScope.selectedVital.includes("ivt")){
        $rootScope.ivtIndexRemove = true; // flag need for payment flow enable & disable the ivt
        const index = $rootScope.selectedVital.indexOf('ivt');
        if (index > -1) { // only splice array when item is found
          $rootScope.selectedVital.splice(index, 1); // 2nd parameter means remove one item only
        }
      }
      */
      
      if(localStorage.getItem("op_lo")){
        window.location.href="index.html";
      } else {
        window.location.href="#/welcome";        
      }
      
      //loadcssfile(cssFilesArr) ////dynamically load and add this css file
      //document.getElementById("splash_logo").style.display = "block";
                
      //language
      /*if($rootScope.currentlanguage == "English"){
          
        $('<link>')
        .appendTo('head')
        .attr({
          type: 'text/css', 
          rel: 'stylesheet',
          href: 'css/style.css'
        });      
      }else if($rootScope.currentlanguage  == "Tamil"){
           
        $('<link>')
        .appendTo('head')
        .attr({
          type: 'text/css', 
          rel: 'stylesheet',
          href: 'css/style_tamil.css'
        });            
      }else if($rootScope.currentlanguage  == "Hindi"){
           
        $('<link>')
        .appendTo('head')
        .attr({
          type: 'text/css', 
          rel: 'stylesheet',
          href: 'css/style_hindi.css'
        });   
      }else if($rootScope.currentlanguage  == "Marathi"){
           
        $('<link>')
        .appendTo('head')
        .attr({
          type: 'text/css', 
          rel: 'stylesheet',
          href: 'css/style_marathi.css'
        });   
      }*/
    }

    $scope.setLanguage = function(langFile){

        if(langFile == undefined){
            if($rootScope.languages != undefined){
                langFile = $rootScope.languages[0];
            } else {
                return null;
            }
        }            

        $rootScope.currentLangId = langFile.buttonId;
        $scope.interfaceLabels =  new Object();
        langFile.files.forEach(function(item){
            $http.get(langFile.path + item).success(function(data){
                angular.extend( $scope.interfaceLabels, data);
                $scope.isVisibleLanguage = false;
                switch(langFile.path){
                  case "json/hi_in/":{
                     $scope.langClass = 'hi_in';
                     //($scope.langClass);
                    HigiKioskStorageService.saveSessionData('langClass', 'hi_in');
                    break;
                  }
                  case "json/tm_in/":{
                    $scope.langClass = 'tm_in';
                    //alert($scope.langClass);
                    HigiKioskStorageService.saveSessionData('langClass', 'tm_in');
                    break;
                  }
                  default:{
                     $scope.langClass = 'en_us';
                     //alert($scope.langClass);
                    HigiKioskStorageService.saveSessionData('langClass', 'en_us');
                    break;
                  }
                }
                // if(langFile.path.search('es_us') != -1){
                //     $scope.langClass = 'es_us';
                //     HigiKioskStorageService.saveSessionData('langClass', 'es_us');
                // }else {
                //     $scope.langClass = 'en_us';
                //     HigiKioskStorageService.saveSessionData('langClass', 'en_us');
                // }
            });

        });       
    };
    HigiKioskStorageService.watchSessionData('languages',function(newVal){
        if(newVal != undefined){
            $scope.setLanguage(newVal[0]);
        }
    });

    $rootScope.mode = "";
    $rootScope.pageClass = 'slide forward';
    //Define slide direction
    $scope.setSlideDirection = function(direction) {
        if(direction == "back"){
            $rootScope.pageClass = 'slide back';
        } else {
            $rootScope.pageClass = 'slide forward';
        }
    };
    $scope.registerMethod = function(obj){
        if($scope[obj.name] != undefined){
            console.log('Overwriting ' + obj.name);
        }
        $scope[obj.name] = obj.fn;
    };
    $scope.setShared = function(obj) {
        if($scope[obj.name] != undefined) {
            console.log('Overwriting ' + obj.name);
        }
        HigiKioskStorageService.saveSessionData(obj.name,  obj.value);
        $scope[obj.name] = obj.value;
    };

    // teleconsulatation video call
    $rootScope.teleConsulationVideoCallToggle = false;
    $rootScope.teleConsultationVideoCallData = {
      'video_call_api_url': 'https://youtube.com/embed/CptYICtnKkY',
      'screen_width':'760px',
      'screen_height':'575px',
    };
    $rootScope.teleConsulationVideoCallStartCall = function(){
      $rootScope.teleConsulationVideoCallToggle = true;
      let api_url = $rootScope.teleConsultationVideoCallData['video_call_api_url'];
      // $('#tele-consultation-video-call-url').attr('src',api_url);
      // alert('aa');
    }
    $rootScope.teleConsulationVideoCallTakeTest = function(){
        $rootScope.teleConsulationVideoCallToggle = true;
        $rootScope.useralredyinTeleflow = true; // to hide "consult Doctor Now" button in final result of take test flow
        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO'){
            $(".apollo-iframe-button").hide();
            $("#apolloMainIframeContainer>iframe").css({"height":"230px","width":"230px"});
            $("#apolloMainIframeContainer").css({"left":"20px"});
        } else {
            $rootScope.teleConsultationVideoCallData['screen_width'] = '150px';
            $rootScope.teleConsultationVideoCallData['screen_height'] = '150px';            
        }

      $rootScope.mode = 'bpw';      
      HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
      var currenttest;
      window.location = HigiKioskFlow.nextTest($rootScope.mode,currenttest);
    }
    // $rootScope.teleConsulationVideoCallStartEnd = function(){
    //   $rootScope.teleConsulationVideoCallToggle = false;
    //   $('#tele-consultation-video-call-url').attr('src','');
    //   window.location = '#/ihl-teleconsultation-summary';
    //   // window.location = '#/telemedicine';
    // }
    // teleconsulatation video call ends
    $scope.reInitializeTeleconsultationNamespaceObject = function(){
    $rootScope.Crossbar = function(){ return new CrossbarClass();}();
    $rootScope.Jitsi = function(){ return new TeleconsultationJitsiService();}();
    
    // Creating Teleconsultation Namspace; All the teleconsulation crossbar, video call, jitsi information is stored in this namespace
    $rootScope.teleConsultationNamespace = {};

    //For Genix Teleconsultation.
    $rootScope.genixConstants  = function(){ return new GenixConstantsService(); }();

    // Constants
    
    $rootScope.teleConsultationNamespace.USER_RING_TIME = 50 * 1000;
    $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_PERSCRIPTION_STATUS_TO_RECEIVE = 1*60*1000 + 10*1000;// 1 minute + 10 secs( 10 secs for network delay)
    $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_PERSCRIPTION_TO_RECEIVE = 5*60*1000; //5 Minutes
    $rootScope.teleConsultationNamespace. WAIT_TIME_FOR_END_CALL_CROSSBAR_EVENT_TO_RECEIVE = 1*60*1000; // 1 Minute
    
    $rootScope.teleConsultationNamespace._isOngoingCall = false;
    $rootScope.teleConsultationNamespace._isOngoingCallValid = false;
    $rootScope.teleConsultationNamespace._isCallEndedByDoctor = false;
    $rootScope.teleConsultationNamespace._isRejoinCallFlow = false;
    
    $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
    
    $rootScope.teleConsultationNamespace.selectedDoctorId = undefined;
    $rootScope.teleConsultationNamespace.selectedDoctorSessionId = '';
    $rootScope.teleConsultationNamespace.displayMessage = '';
    $rootScope.teleConsultationNamespace.appointment_call_status = '';
    $rootScope.teleConsultationNamespace.appointment_id = undefined;
    $rootScope.teleConsultationNamespace.flow_type = undefined;
    $rootScope.teleConsultationNamespace.prescription_obj = {};
    $rootScope.teleconsultationAbnormalCallEndedData = null;

    // Teleconsultation timers
    $rootScope.teleConsultationNamespace.liveCallAcceptTimer = undefined;
    $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;

    $rootScope.teleConsultationNamespace.messageFromSendDataToUserSubscription = function (param, sender_id, sender_session_id){
      if(sender_id != $rootScope.teleConsultationNamespace.selectedDoctorId) return;
    //   this._selectedDoctorId = sender_session_id;
      $rootScope.teleConsultationNamespace.selectedDoctorSessionId = sender_session_id;
      if('cmd' in param){
        switch(param['cmd']){
          case 'CallAcceptedByDoctor': $rootScope.teleConsultationNamespace.callAcceptedByDoctor(param); break;
          case 'CallDeclinedByDoctor': $rootScope.teleConsultationNamespace.callDeclinedByDoctor(param); break;
          case 'CallEndedByDoctor': $rootScope.teleConsultationNamespace.callEndedByDoctor(param); break;
          case 'AfterCallPrescriptionStatus': $rootScope.teleConsultationNamespace.afterCallPerscriptionStatus(param); break;
          case 'AfterCallPrescription': $rootScope.teleConsultationNamespace.afterCallPerscriptionReceived(param); break;
        }
      }
    }

    $rootScope.teleConsultationNamespace.maximizeJitsiScreen = function(){
      if($rootScope.teleConsultationNamespace._isOngoingCall == false) return;
      if($rootScope.teleConsulationVideoCallToggle == false) return;
      $rootScope.teleConsultationVideoCallData['screen_width'] = '760px';
      $rootScope.teleConsultationVideoCallData['screen_height'] = '575px';
      
    }

    $rootScope.teleConsultationNamespace.callAcceptedByDoctor = async function(param){
      if($rootScope.teleConsultationNamespace.liveCallAcceptTimer == undefined) return;
      if($rootScope.teleConsultationNamespace._isOngoingCall == false) return;
      if(('room_id' in param) == false || ('doctor_id' in param) == false) return;
      
      $timeout.cancel($rootScope.teleConsultationNamespace.liveCallAcceptTimer);
      $rootScope.teleConsultationNamespace.liveCallAcceptTimer = undefined;

      // Update appointment Status as ongoing
      await ($rootScope.teleConsultationNamespace.updateAppointmentCallStatus($rootScope.teleConsultationNamespace.appointment_id, 'on_going'));
      
      $rootScope.teleConsultationNamespace.displayMessage = 'Call accepted by doctor';
      //console.log('Call accepted by doctor');
      
      // Start Jitsi call
      $rootScope.teleConsultationNamespace.initateLiveCallJitsi(param['room_id']);
    };

    $rootScope.teleConsultationNamespace.callDeclinedByDoctor = function(param){
      //console.log('call decline from doctor');
      if($rootScope.teleConsultationNamespace.liveCallAcceptTimer == undefined) return;
      if($rootScope.teleConsultationNamespace._isOngoingCall == false) return;
      $timeout.cancel($rootScope.teleConsultationNamespace.liveCallAcceptTimer);
      $rootScope.teleConsultationNamespace.liveCallAcceptTimer = undefined;
      // $timeout.cancel($rootScope.teleConsultationNamespace._callAcceptTimer);
      $rootScope.teleConsultationNamespace.displayMessage = 'Doctor declined call';
      $rootScope.teleConsultationNamespace._isOngoingCall = false;
      // $rootScope.teleConsultationNamespace._callAcceptTimer = undefined;
      

      $timeout(async ()=>{
        let res = await ($rootScope.teleConsultationNamespace.updateAppointmentCallStatus($rootScope.teleConsultationNamespace.appointment_id, 'Missed'));
        let _res = await ($rootScope.teleConsultationNamespace.updateAppointmentStatus( $rootScope.teleConsultationNamespace.appointment_id,'Rejected'));
        // Close the crossbar
        $rootScope.Crossbar.closeConnection();
        window.location = '#/ihl-teleconsultation-main-dashboard';  
      }, 4500);
    };
    
    $rootScope.teleConsultationNamespace.initateLiveCallJitsi = function(room_id){

      $rootScope.teleConsultationNamespace._isOngoingCallValid = true;
      $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = true;

      $rootScope.Jitsi._jitsi_onHangup = async ()=>{
        //console.log($rootScope.teleConsultationNamespace._isOngoingCallValid);
        $rootScope.teleConsultationNamespace._isOngoingCall = false;    
        if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer){
          $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer);
          $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
        }
        if($rootScope.teleConsultationNamespace._isOngoingCallValid == false){
          // Not marked as completed
          $rootScope.teleConsultationNamespace.displayMessage = 'Call ended abornamlly. If within time, you can reconnect from My Appointments page. Sorry for Inconvenience';
          $timeout(()=>{
            $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
            // this.router.navigate(['/teleconsultation']);
            return;
          },3500)
          return;
        }
        //console.log('Call ended by User and informing to doctor');
        if($rootScope.teleConsultationNamespace._isCallEndedByDoctor == false){
          // Update to doctor

          if ($rootScope.fireStore) {
            let _data = {
              'data': {cmd: 'CallEndedByUser', vid: $rootScope.teleConsultationNamespace.appointment_id, vid_type: 'LiveAppointmentCall'},
              'receiver_ids': [$rootScope.teleConsultationNamespace.selectedDoctorId],
              'sender_id': $rootScope.user.id,
              'published': true
            };
            fireStore.create($rootScope.teleConsultationNamespace.appointment_id, $rootScope.teleConsultationCollectionName, _data);
          } else {
            let _data = {
              'cmd':'CallEndedByUser',
              'vid':$rootScope.teleConsultationNamespace.appointment_id,
              'vid_type':'LiveAppointmentCall',
            };
            let _options = {
              'receiver_ids':[$rootScope.teleConsultationNamespace.selectedDoctorId],
              //'eligible': [$rootScope.teleConsultationNamespace.selectedDoctorSessionId]
              'eligible': []
            }
            $rootScope.Crossbar.publishToChannel('ihl_send_data_to_doctor_channel', _data, _options);
          }
          $scope.updateCallLog('user', $rootScope.userIdForLogDetails, 'exit', $rootScope.teleConsultationNamespace.appointment_id);
        }
        await ($rootScope.teleConsultationNamespace.updateAppointmentCallStatus($rootScope.teleConsultationNamespace.appointment_id, 'completed'));
        $rootScope.teleConsultationNamespace.initiateAfterCallEndPerscriptionFlow();
        $rootScope.teleConsultationNamespace._isOngoingCallValid = false;
        $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
      }

      // Some times fired twice for each set of users...like  n events for n users, then again repeated n events for n users
      $rootScope.Jitsi._jitsi_onParticipantLeft = async (res)=>{
        // Set timeout for crossbar event for call cut from other side
        if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer == undefined){
          $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = $timeout(()=>{
            // No hangup event from other side is received. Consider other user has abnormally left the call. Now do not mark the call as completed.
            // Call completed only if this user is still in call and other re joins the call (need to be handled)
            // Call completed if both the users joins the call again
            // If this user lefts the call, call will be still on_going
            $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
            if($rootScope.teleConsultationNamespace._isCallEndedByDoctor == false){ // Double check for receiving crossbar event
              if($rootScope.Jitsi._is_videoConferenceLeftFired == true){
                // This is the device which is facing some issues
                //alert('Looks like Network Issue. If within time, You can rejoin from My Appointments page');
                $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
                $rootScope.internetDropped = true;
                if ($rootScope.Jitsi != undefined) {
                  $rootScope.Jitsi.jitsiMeetExternalAPI.dispose();
                }
                $timeout(()=>{
                  $rootScope.internetDropped = false;
                  $rootScope.exitCurrentSession();
                  //$rootScope.clearCurrentSession();
                },5000);
                return;
              }

              $rootScope.teleConsultationNamespace._isOngoingCallValid = false;
              //alert('Other side seems to face some technical issue. Please wait for sometime');
              $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
              $rootScope.internetLostTitle = "global.doctorInternetLost";
              $rootScope.internetDropped = true;
              if ($rootScope.Jitsi != undefined) {
                $rootScope.Jitsi.jitsiMeetExternalAPI.dispose();
              }
              $timeout(()=>{
                $rootScope.internetDropped = false;
                $rootScope.exitCurrentSession();
                //$rootScope.clearCurrentSession();
              },5000);
            }
          },
          $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_END_CALL_CROSSBAR_EVENT_TO_RECEIVE)
        }
      }
      $rootScope.Jitsi._jitsi_onParticipantJoined = async (res)=>{
        if($rootScope.Jitsi.getNumberOfParticipants() == 2){
          $rootScope.teleConsultationNamespace._isOngoingCallValid = true;
        }
      }
      $rootScope.Jitsi._jitsi_onVideoConferenceJoined = async (res)=>{
        $scope.updateCallLog('user', $rootScope.userIdForLogDetails, 'join', $rootScope.teleConsultationNamespace.appointment_id);
        $rootScope.Jitsi._jitsi_onParticipantJoined();
      }
      let _options = {
        room_id:room_id,
        displayName:$rootScope.user.firstName+" "+$rootScope.user.lastName,
      }
      $timeout(()=>$rootScope.Jitsi.init(_options), 0);
    }

    $rootScope.teleConsultationNamespace.initateBookApppointmentCallJitsi  = function(){
      $rootScope.teleConsultationNamespace._isOngoingCallValid = true;
      if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer){
        $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer);
        $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
      }

      let room_id = 'IHLTeleConsult' + $rootScope.teleConsultationNamespace.appointment_id;
      $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = true;
      $rootScope.Jitsi._jitsi_onHangup = async ()=>{
        $rootScope.teleConsultationNamespace._isOngoingCall = false;    
        if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer){
          $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer);
          $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
        }
        //alert($rootScope.teleConsultationNamespace.appointment_call_status);
        //if($rootScope.teleConsultationNamespace.appointment_call_status  == 'on_going'){
          if($rootScope.teleConsultationNamespace._isOngoingCallValid == false){
            // Not marked as completed
            $rootScope.teleConsultationNamespace.displayMessage = 'Call ended abornamlly. If within time, you can reconnect from My Appointments page. Sorry for Inconvenience';
            $timeout(()=>{
              $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
              // this.router.navigate(['/teleconsultation']);
              return;
            },3500)
            return;
          }

          //console.log('Call ended by User and informing to doctor');
          if($rootScope.teleConsultationNamespace._isCallEndedByDoctor == false){
            // Update to doctor

            if ($rootScope.fireStore) {
              let _data = {
                'data': {cmd: 'CallEndedByUser', vid: $rootScope.teleConsultationNamespace.appointment_id, vid_type: 'BookAppointmentCall'},
                'receiver_ids': [$rootScope.teleConsultationNamespace.selectedDoctorId],
                'sender_id': $rootScope.user.id,
                'published': true
              };
              fireStore.create($rootScope.teleConsultationNamespace.appointment_id, $rootScope.teleConsultationCollectionName, _data);
            } else {
              let _data = {
                'cmd':'CallEndedByUser',
                'vid':$rootScope.teleConsultationNamespace.appointment_id,
                'vid_type':'BookAppointmentCall',
              };
              let _options = {
                'receiver_ids':[$rootScope.teleConsultationNamespace.selectedDoctorId],
                'eligible': []
              }
              $rootScope.Crossbar.publishToChannel('ihl_send_data_to_doctor_channel', _data, _options);
            }
            $scope.updateCallLog('user', $rootScope.userIdForLogDetails, 'exit', $rootScope.teleConsultationNamespace.appointment_id);
          }
          await ($rootScope.teleConsultationNamespace.updateAppointmentCallStatus($rootScope.teleConsultationNamespace.appointment_id, 'completed'));
          $rootScope.teleConsultationNamespace.initiateAfterCallEndPerscriptionFlow();
          $rootScope.teleConsultationNamespace._isOngoingCallValid = false;
          $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
        // }else{
        //   $rootScope.teleConsultationNamespace.displayMessage = 'Call Ended. Redirecting to Home Page';
        //   setTimeout(()=>{
        //     $rootScope.exitCurrentSession();
        //     $rootScope.clearCurrentSession();
        //   }, 3000);
        // }
      }

      // Some times fired twice for each set of users...like  n events for n users, then again repeated n events for n users
      $rootScope.Jitsi._jitsi_onParticipantLeft = async (res)=>{
        // Set timeout for crossbar event for call cut from other side
        if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer == undefined){
          $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = $timeout(()=>{
            // No hangup event from other side is received. Consider other user has abnormally left the call. Now do not mark the call as completed.
            // Call completed only if this user is still in call and other re joins the call (need to be handled)
            // Call completed if both the users joins the call again
            // If this user lefts the call, call will be still on_going
            $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
            if($rootScope.teleConsultationNamespace._isCallEndedByDoctor == false){ // Double check for receiving crossbar event
              if($rootScope.Jitsi._is_videoConferenceLeftFired == true){
                // This is the device which is facing some issues
                //alert('Looks like Network Issue. If within time, You can rejoin from My Appointments page');
                $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
                $rootScope.internetDropped = true;
                if ($rootScope.Jitsi != undefined) {
                  $rootScope.Jitsi.jitsiMeetExternalAPI.dispose();
                }
                $timeout(()=>{
                  $rootScope.internetDropped = false;
                  $rootScope.exitCurrentSession();
                  //$rootScope.clearCurrentSession();
                },5000);
                return;
              }

              $rootScope.teleConsultationNamespace._isOngoingCallValid = false;
              //alert('Other side seems to face some technical issue. Please wait for sometime');
              $rootScope.teleConsultationNamespace.teleConsulationVideoCallToggle = false;
              $rootScope.internetLostTitle = "global.doctorInternetLost";
              $rootScope.internetDropped = true;
              if ($rootScope.Jitsi != undefined) {
                $rootScope.Jitsi.jitsiMeetExternalAPI.dispose();
              }
              $timeout(()=>{
                $rootScope.internetDropped = false;
                $rootScope.exitCurrentSession();
                //$rootScope.clearCurrentSession();
              },5000);
            }
          },
          $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_END_CALL_CROSSBAR_EVENT_TO_RECEIVE)
        }
      }

      $rootScope.Jitsi._jitsi_onParticipantJoined = async (res)=>{
        if($rootScope.Jitsi.getNumberOfParticipants() == 2){
          $rootScope.teleConsultationNamespace._isOngoingCallValid = true;
        }
      }
      $rootScope.Jitsi._jitsi_onVideoConferenceJoined = async (res)=>{
        $scope.updateCallLog('user', $rootScope.userIdForLogDetails, 'join', $rootScope.teleConsultationNamespace.appointment_id);
        $rootScope.Jitsi._jitsi_onParticipantJoined();
      }
      let _options = {
        room_id:room_id,
        displayName:$rootScope.user.firstName+" "+$rootScope.user.lastName,
      }
      $timeout(()=>$rootScope.Jitsi.init(_options), 0);
    }

    $rootScope.teleConsultationNamespace.callEndedByDoctor = function(param){
      if($rootScope.teleConsultationNamespace._isOngoingCall == false) return;
      if('vid' in param == false) return;
      if('vid_type' in param == false) return;
      if(param['vid'] != $rootScope.teleConsultationNamespace.appointment_id) return;
      if($rootScope.teleConsultationNamespace.flowType == 'LiveAppointemnt' && param['vid_type'] != 'LiveAppointmentCall') return;
      if($rootScope.teleConsultationNamespace.flowType == 'BookAppointment' && param['vid_type'] != 'BookAppointmentCall') return;
      $rootScope.teleConsultationNamespace._isOngoingCall = false;
      if($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer) {
        $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer);
        $rootScope.teleConsultationNamespace._isWaitForEndCallCrossbarEventTimer = undefined;
      }
      $rootScope.teleConsultationNamespace.displayMessage = 'Call ended by doctor';
      //console.log('Call ended by doctor. End jiti');
      $rootScope.teleConsultationNamespace._isCallEndedByDoctor = true;
      $rootScope.teleConsultationNamespace._isOngoingCallValid = true; // Marking the call as valid, beacuse sometimes due to traffic or slow internet, event may be recieved slow
      $rootScope.Jitsi.endJitsiCall();
    }

      
    $rootScope.teleConsultationNamespace.initiateAfterCallEndPerscriptionFlow = async function(){
      $rootScope.teleConsultationNamespace.displayMessage = 'Waiting for prescription or additional information';
      $rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer = $timeout(()=>{
        $rootScope.teleConsultationNamespace.afterCallPerscriptionStatus({'perscription_status':false});
      }, $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_PERSCRIPTION_STATUS_TO_RECEIVE);
    }

    $rootScope.teleConsultationNamespace.afterCallPerscriptionStatus = async function(param = {}){
      if(('perscription_status' in param) == false) return;
      
      if($rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer == undefined) return;
      $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer);
      $rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer = undefined;
      $rootScope.teleConsultationNamespace._isRedirectToWelcomePageTimer = undefined;

      if(param['perscription_status'] == true){
        $rootScope.teleConsultationNamespace.displayMessage = 'Doctor is providing some prescription or vital information. Please wait few minutes';
        
        $rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer = $timeout(()=>{
          $rootScope.Crossbar.closeConnection();          
          $rootScope.teleConsultationNamespace.displayMessage = 'Sorry for Inconvenience. Prescription will be updated as it is received. You can also view from Consultation History page';
          setTimeout(()=>{
            $rootScope.teleConsultationVideoCallServiceProvided();
          },500);
          $rootScope.teleConsultationNamespace._isRedirectToWelcomePageTimer = $timeout(()=>{
            window.location = '#/ihl-teleconsultation-main-dashboard';
            return;
          }, 5000);

        }, $rootScope.teleConsultationNamespace.WAIT_TIME_FOR_PERSCRIPTION_TO_RECEIVE);
      }

      if(param['perscription_status'] == false){
        $rootScope.teleConsultationNamespace.displayMessage = 'No prescription to be provided. Redirecting to Dashboard';
        setTimeout(()=>{
          $rootScope.teleConsultationVideoCallServiceProvided();
        },500);
        $timeout(()=>{
          window.location = '#/ihl-teleconsultation-main-dashboard';
          return;
        }, 5000);
        return;
      }
    }

    $rootScope.teleConsultationNamespace.afterCallPerscriptionReceived = async function(param){
      if($rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer != undefined){
        $timeout.cancel($rootScope.teleConsultationNamespace._isWaitForPrescriptionTimer);
        $timeout.cancel($rootScope.teleConsultationNamespace._isRedirectToWelcomePageTimer);
      }
      let perscription_obj = param['perscription_obj'];
      $rootScope.teleConsultationNamespace.prescription_obj = perscription_obj;
      //console.log($rootScope.teleConsultationNamespace.prescription_obj)
      $rootScope.teleConsultationNamespace.displayMessage = 'Prescription or additional information received. Redirecting to Call Summary page';

      $timeout(()=>{
        // this.hideModal();
        window.location = '#/ihl-teleconsultation-summary';
        return;
      }, 3000);
    }



    $rootScope.teleConsultationNamespace.updateAppointmentCallStatus = function(appointment_id, call_status){
        
      return new Promise((resolve, reject)=>{
        let sucess_fn = function(res){
          //console.log('in success');
          $rootScope.teleConsultationNamespace.appointment_call_status = call_status;
          resolve(res);
          return;
        }
        let error_fn = function(err){
          //console.log('in error');
          reject(err);
          return;
        }
        let data = {
          'appointment_id': appointment_id,
          'call_status': call_status,
        };
        HigiApiService.consultantAppointmentCallStatusUpdate(data, sucess_fn, error_fn);
      })
    }

    $rootScope.teleConsultationNamespace.updateAppointmentStatus = function(appointment_id, appointment_status){
      return new Promise((resolve, reject)=>{
        let sucess_fn = function(res){
          //console.log('in success');
          resolve(res);
          return;
        }
        let error_fn = function(err){
          //console.log('in error');
          reject(err);
          return;
        }
        let data = {
          'appointment_id': appointment_id,
          'appointment_status': appointment_status,
        };
        HigiApiService.consultantAppointmentStatusUpdate(data, sucess_fn, error_fn);
      })
    }
    }
    $scope.reInitializeTeleconsultationNamespaceObject();

    $scope.updateCallLog = async function(host, hostId, action, refId){
      let logObj = {
        "host": host,
        "hostId": hostId,
        "action": action,
        "refId": refId,
        "courseId": ""
      }
      //console.log(logObj);
      HigiApiService.updateCallLogDetails(logObj, async function (resp) {
        //console.log(resp);
      });
    }

    $rootScope.teleConsultationVideoCallServiceProvided =  async function(){
      let promise =  await new Promise((resolve, reject)=>{
        let successFn = (resp)=>{
          resolve(resp);
        }
        let errorFn = (resp)=>{
          resolve("error updating apollo service provider");
        }

        let data = $rootScope.invoiceIdForApolloTeleconsultationService;
        let reason = "medicalConsultation";
        jQuery.ajax({
          url: getSettingsValue('kiosk.api.url') +"/data/TeleconsultServiceProvided?invoice_id=" + data +"&reason_if_any="+reason,
          type : "GET",
          headers:{
            "ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==",
            "Content-Type": "application/json"
          },
          success: function(res){
            successFn(res)
          },
          error : function(error) { 
            errorFn(error)
          } 
        });
        console.log("$rootScope.couponNumber = " + $rootScope.couponNumber);
        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO' && $rootScope.couponNumber.length == 9){ // apollo coupon code usage status update
            let ConsultantID = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
            $.ajax({
                url: getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$rootScope.couponNumber+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+HigiKioskStorageService.returnSessionData('user').id.toString()+"&source=kiosk"+"&consultant_id="+ConsultantID+"&purpose=teleconsultation",
                type : "GET", 
                cache: false,
                contentType: 'application/json; charset=UTF-8',  
                headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
                success: function(res){
                    console.log(res);
                },
                error : function (err) {
                    console.log(err);
                }
            });
        }
      });  

      //console.log(promise);   
    }

$rootScope.apolloCouponCodeGenerate = function(){
        $('#couponCodeErrorModal').show();        
        $('.apollo-coupon-print-button').hide();
        $('#couponCodeBind').text("*********");
     
        var sucess_fn = function(res){
            //console.log('in success');
            //console.log(res);
            if(res == "no discount available"){
                $('#couponCodeErrorModal').hide();    
                $('.apollo-coupon-print-button').hide();
                $('#couponCodeBind').text("*********");
                $('#ApolloCouponCode').hide();
            } else {
                $('#couponCodeErrorModal').hide();    
                $('#ApolloCouponCode').show();
                var couponCode = res.split("=");
                $('#couponCodeBind').text(couponCode[1]);
                $rootScope.currentCouponCode = couponCode[1];
                $('.apollo-coupon-print-button').show();  
            }          
        }

        var error_fn = function(err){
          //console.log('in error');
          //console.log(err);
            $('#couponCodeErrorModal').hide();    
            $('.apollo-coupon-print-button').hide();
            $('#couponCodeBind').text("*********");
            $('#ApolloCouponCode').hide();

          // unable to generate the coupon code "connectig to server"

        }

        //"ihl_user_id": HigiKioskStorageService.returnSessionData('affiliateUserId'), // hardcode ihl_id
        // "ihl_user_id": HigiKioskStorageService.returnSessionData('user').id.toString(), // dynamic ihk_id
        var data = {
            "ihl_user_id": HigiKioskStorageService.returnSessionData('user').id.toString(),
            "appointment_id": $rootScope.apolloTeleConsultationSourceDetails['appointmentId'],
            "affiliation_unique_name": $rootScope.selectedTeleconsultationService == "Member Service"? $rootScope.selectedAffiliation : "global_services", // global services or org name
            "speciality_name":$rootScope.selected_speciality
        };

        HigiApiService.couponCodeGenerate(JSON.stringify(data), sucess_fn, error_fn)
}

$scope.couponPrintAndCloseModel = function() {
    $('#couponCodeErrorModal').hide();    
    $('.apollo-coupon-print-button').hide();
    $('#couponCodeBind').text("*********");
    $('#ApolloCouponCode').hide();
    $rootScope.couponCodePrinted = true;
    let a4_template = document.getElementById("apollo-coupon-code-thermal").innerHTML;
    let thermal_template = document.getElementById("apollo-coupon-code-thermal").innerHTML;

    let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;box-sizing: border-box;'>"+a4_template+"</body></html>";
    let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;box-sizing: border-box;'>"+thermal_template+"</body></html>";

    const printerTemplateObject = {
        thermalPrinterTemplate: thermal_html_template,
        a4PrinterTemplate: a4_html_template
    };

    $rootScope.printerService.invokeJkioskPrinterService('thermal', printerTemplateObject);    
}

    
   
    //For Apollo Teleconsultation & Forehead temperature 
    window.addEventListener('message', async function(event) {
      var path = $location.path();
      if ($rootScope.flipKartPlus)
         return 0;
      if ($rootScope.apolloTeleConsultationPopup['videoCallIframe'] == true) {
        if (typeof(event.data) != 'undefined'){
          console.log(event.data);
          let apolloPrescriptionData = event.data;
          $rootScope.apolloTeleConsultationSourceDetails.message = 'Doctor is preparing some prescription. Please wait... ';
          $rootScope.apolloTeleConsultationPopup['videoCallIframe'] = false;
          await ($rootScope.genixConstants.updateAppointmentCallStatus($rootScope.apolloTeleConsultationSourceDetails.appointmentId, 'completed'));
          if (apolloPrescriptionData.appointmentId != undefined && apolloPrescriptionData.appointmentId != null) {
            
            $rootScope.apolloTeleConsultationSourceDetails.casesheetId = apolloPrescriptionData.appointmentId;
          }else{
            console.log("Apollo appointment Id is undefined");
          }
          if (apolloPrescriptionData.prescriptionUrl != undefined && apolloPrescriptionData.prescriptionUrl != null) {
            if (apolloPrescriptionData.prescriptionUrl.trim().length > 0) {
                $rootScope.apolloPrescriptionUrl = apolloPrescriptionData.prescriptionUrl;
                $rootScope.convertPrescriptionPdfUrlToBase64(apolloPrescriptionData.prescriptionUrl);
            } else {
              console.log("Apollo Prescription pdf url is empty");
            }
          } else {
            console.log("Apollo Prescription pdf url is undefined");
          }
          $rootScope.updateApolloCaseSheetData();
        }
      } else if($rootScope.mode=="temp" || path == "/temp2/forward"){
        if (typeof(event.data) != 'undefined'){
          console.log(event.data);
		      var data = JSON.parse(event.data)
          if(data.cmd == "faceDetecte"){
            if(data.status == "C" && data.distance >= 30 && data.distance <= 70){
                $rootScope.userinPosition = true;
                $rootScope.userCloser = false;
                $rootScope.userFarAway = false;
                if($rootScope.faceDetectCount == 3){
                    $rootScope.faceCaptureForTemp = true;
                }
                $rootScope.faceDetectCount++;
            } else if (data.status == "C" && data.distance < 30) {
              $rootScope.userinPosition = false;
              $rootScope.userCloser = true;
              $rootScope.userFarAway = false;
            } else if (data.status == "C" && data.distance > 70) {
              $rootScope.userinPosition = false;
              $rootScope.userCloser = false;
              $rootScope.userFarAway = true;
            }else {
                $rootScope.faceCaptureForTemp = false;
                $rootScope.faceDetectCount = 0;
                $rootScope.userinPosition = false;
                $rootScope.userCloser = false;
                $rootScope.userFarAway = false;
            }
          }
        }
      }
    });

    $rootScope.convertPrescriptionPdfUrlToBase64 = function(pdfUrl){
      let url = pdfUrl;

      // Initialize the XMLHttpRequest and wait until file is loaded
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
        // Create a Uint8Array from ArrayBuffer
        let codes = new Uint8Array(xhr.response);

        // Get binary string from UTF-16 code units
        let bin = String.fromCharCode.apply(null, codes);

        // Convert binary to Base64
        let b64 = btoa(bin);
        if (b64 != undefined && b64 != null && b64.trim().length > 0) {
          $rootScope.prescriptionObjectFor1mg = b64;
          $rootScope._is_base64_pdf_available = true;
        }else{
          $rootScope.prescriptionObjectFor1mg = "";
          $rootScope._is_base64_pdf_available = false;
        }
      };

      // Send HTTP request and fetch file as ArrayBuffer
      xhr.open('GET', url);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    }

    //For New Multi-Printer Functionality
    $rootScope.printerService = function(){
      return new PrinterServiceClass();
    }();

    $scope.closeTestRequestModal = function(nav = true) {
      $("#eSanTestRequestRegret").hide();
      $("#eSanTestRequestSuccess").hide();
      $('#eSanTestRequestFailed').hide();
      $('#eSanTestRequestSuccessFailed').hide();
      $('#eSanTestRequestFailedInfo').hide();
      if (nav)
        window.location =  "#/comebacksoon";
    }

    $scope.showTestResultInfo = function() {
      console.log('call');
      $('#eSanTestRequestSuccessFailed').hide();
      $('#eSanTestRequestFailedInfo').show();
    }

    $rootScope.mehtaFlowInit = function() {
      let gender = HigiKioskStorageService.returnSessionData('gender');
      let dob = HigiKioskStorageService.returnSessionData('birthdate');
      let height = HigiKioskStorageService.returnSessionData('height');
      $rootScope.mehtaFlowInitiated = true;
      if (gender != undefined && dob != undefined && height != undefined) {
          if ($rootScope.UserInfo.ihlthirpartyUserId != undefined && $rootScope.UserInfo.ihlthirdpartyVendorName != undefined) {
              if ($rootScope.UserInfo.ihlthirpartyUserId != '' && $rootScope.UserInfo.ihlthirdpartyVendorName == 'mehta') {
                  $rootScope.mehtaPatientMRNo = $rootScope.UserInfo.ihlthirpartyUserId;
                  $rootScope.mehtaPatientMRNoAvailable = true;
                  $rootScope.abhaCloseCheckPaymentFlow();
              } else {
                  $rootScope.loadModal({id: 'mehtaUserFlow'});
                  $rootScope.mehtaUserModalMEHInit();
                  return;
              }
          } else {
              $rootScope.loadModal({id: 'mehtaUserFlow'});
              $rootScope.mehtaUserModalMEHInit();
              return;
          }
      }
    }

    /*$rootScope.invokeJkioskMultiPrinterCallbackService = function(){
      if ("printerService" in $rootScope == false) return;
      if ($rootScope.printerService instanceof PrinterServiceClass == false) return;
      if ($rootScope.printerService.kioskMultiPrinterFunctionalityEnable){
        function PrinterDetails(){
          this.thermalPrinterConnectedStatus = true;
          this.thermalPrinterPaperStatus = true;
          this.a4PrinterConnectedStatus = true;
          this.a4PrinterPaperStatus = true;
        };
        let details = new PrinterDetails();
        //jkiosk service call
        setTimeout(()=>{
          //call the below function if call back is success or failure.
          $rootScope.printerService.getAllPrinterDetails(details);
        },2*1000);
      }
      return;
    }();*/
}]);
