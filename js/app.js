var higiKioskUi = angular.module('higiKioskUi', [
    'ngRoute',
    'ngSanitize',
    'higiKioskControllers',
    'truncate',
    'qrCodeModel2',
    'firebase'
])

higiKioskUi.run(['$rootScope', '$http', 'JkioskService', 'HigiKioskUserService', 'HigiKioskFlow', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', '$q', function ($rootScope, $http, JkioskService, HigiKioskUserService, HigiKioskFlow, HigiKioskStorageService, HigiKioskUtilitiesService, $q) {


    //$rootScope.loadingModalVisible = true;
    $rootScope.bodyHide = true;
    $rootScope.loggedIn = false;
    $rootScope.uiTestingEnabled = false;
    $rootScope.screenSize = window.innerWidth;
    $rootScope.onWelcomeScreen = true;
    $rootScope.sessionExitConfirmVisible = false;
    $rootScope.timeoutsReady = $q.defer();
    $rootScope.loggedEvents = $rootScope.loggedEvents || [];
    $rootScope.systolicArray = [];
    $rootScope.diastolicArray = [];
    $rootScope.pulseArray = [];
    $rootScope.bpArray = [];
    $rootScope.emailExtensionEnabled = false;

    $rootScope.paymentSessionActive = false;
    $rootScope.fireStore = false;
    $rootScope.storeECGRawData = true;

    HigiKioskStorageService.loadSettings();
    HigiKioskStorageService.loadPlaceholder();

    localStorage.setItem("cuser_kgweight", "");
    localStorage.setItem("cuser_pulse", "");
    localStorage.setItem("cuser_diastolic", "");
    localStorage.setItem("cuser_systolic", "");
    localStorage.setItem("cuser_pressure", "");
    localStorage.setItem("cuser_bodyfat", "");
    localStorage.setItem("cuser_leanMassKg", "");
    localStorage.setItem("cuser_usrbmi", "");
    localStorage.setItem("cuser_full_ekg_data", "");
    localStorage.setItem("cuser_height", "");
    localStorage.setItem("cuser_gender", "");
    localStorage.setItem("cuser_dob", "");

    localStorage.setItem("cuser_email", "");

    localStorage.setItem("cuser_ecgimageid", "");

    localStorage.setItem("cuser_ecgfulldata", "");

    localStorage.setItem("gender", "");
    localStorage.setItem("height", "");
    localStorage.setItem("dob", "");

    localStorage.setItem("weight", "");

    //changes here addded below  functions
    // $rootScope.getGlobalVolume =function(){
    //     return $rootScope.isAudioMuted ? 0 :  $rootScope.globalAudioVolume;
    // };


    $rootScope.setLanguage = function (langFile) {
        if (langFile == undefined) {
            langFile = $rootScope.languages[0];
        }
        $rootScope.interfaceLabels = new Object();
        langFile.files.forEach(function (item) {
            $http.get(langFile.path + item).success(function (data) {
                angular.extend($rootScope.interfaceLabels, data)
                $rootScope.isVisibleLanguage = false;
                if (langFile.path.search('es_us') != -1) {
                    $rootScope.langClass = 'es_us';
                } else {
                    $rootScope.langClass = 'en_us';
                }
            });

        });
    };

}])

higiKioskUi
    .config(['$routeProvider', '$provide', function ($routeProvider) {
        $routeProvider.
            when('/welcome', {
                templateUrl: 'views/welcome.html',
                controller: 'HigiKioskWelcomeController'
            }).
            when('/welcome/:testing', {
                templateUrl: 'views/welcome.html',
                controller: 'HigiKioskWelcomeController'
            }).
            when('/invasive', {
                templateUrl: 'views/invasiveTest.html',
                controller: 'HigiKioskInvasiveController'
            }).
            when('/ecg1/:direction', {
                templateUrl: 'views/ecg.html',
                controller: 'HigiKioskEcgController'
            }).
            when('/ecg_graph/:direction', {
                templateUrl: 'views/ecg_graph.html',
                controller: 'HigiKioskEcgGraphController'
            }).
            when('/zugecgmode/:direction', {
                templateUrl: 'views/zugModeControllerEcg.html',
                controller: 'HigiKioskZUGEcgModeController'
            }).
            when('/zugecginstruction/:direction', {
                templateUrl: 'views/threeleadecginstruction.html',
                controller: 'HigiKioskZUGEcgInstructionController'
            }).
            when('/zugecgprogression/:direction', {
                templateUrl: 'views/zug_ecg_progression.html',
                controller: 'HigiKioskZUGEcgProgressionController'
            }).
            when('/zugecgresult/:direction', {
                templateUrl: 'views/ecgInterimResult.html',
                controller: 'HigiKioskZUGEcgInterimResultController'
            }).
            when('/onboarding1/:direction/:editMode', {
                templateUrl: 'views/onboarding1.html',
                controller: 'HigiKioskOnboardingController1'
            })
            .when('/onboarding1/:direction/:editMode/:testing', {
                templateUrl: 'views/onboarding1.html',
                controller: 'HigiKioskOnboardingController1'
            }).
            when('/onboarding2/:direction/:editMode', {
                templateUrl: 'views/onboarding2.html',
                controller: 'HigiKioskOnboardingController2'
            })
            .when('/onboarding2/:direction/:editMode/:testing', {
                templateUrl: 'views/onboarding2.html',
                controller: 'HigiKioskOnboardingController2'
            }).
            when('/onboarding3/:direction/:editMode', {
                templateUrl: 'views/onboarding3.html',
                controller: 'HigiKioskOnboardingController3'
            })
            .when('/onboarding3/:direction/:editMode/:testing', {
                templateUrl: 'views/onboarding3.html',
                controller: 'HigiKioskOnboardingController3'
            }).
            when('/onboarding4/:direction', {
                templateUrl: 'views/onboarding4.html',
                controller: 'HigiKioskOnboardingController4'
            }).
            when('/onboarding4/:direction/:testing', {
                templateUrl: 'views/onboarding4.html',
                controller: 'HigiKioskOnboardingController4'
            }).
              when('/onboarding5/:direction', {
                templateUrl: 'views/onboarding5.html',
                controller: 'HigiKioskOnboardingController5'
            }).
            when('/onboarding5/:direction/:testing', {
                templateUrl: 'views/onboarding5.html',
                controller: 'HigiKioskOnboardingController5'
            }).
            when('/bloodpressure1/:direction', {
                templateUrl: 'views/bloodpressure1.html',
                controller: 'HigiKioskBpController1'
            }).
            when('/bloodpressure1/:direction/:testing', {
                templateUrl: 'views/bloodpressure1.html',
                controller: 'HigiKioskBpController1'
            }).
            when('/bloodpressure1/:direction/:testing/:error', {
                templateUrl: 'views/bloodpressure1.html',
                controller: 'HigiKioskBpController1'
            }).
            when('/bloodpressure2/:direction', {
                templateUrl: 'views/bloodpressure2.html',
                controller: 'HigiKioskBpController2'
            }).
            when('/bloodpressure2/:direction/:testing', {
                templateUrl: 'views/bloodpressure2.html',
                controller: 'HigiKioskBpController2'
            }).
            when('/bloodpressure3/:direction', {
                templateUrl: 'views/bloodpressure3.html',
                controller: 'HigiKioskBpController3'
            }).
            when('/bloodpressure3/:direction/:testing', {
                templateUrl: 'views/bloodpressure3.html',
                controller: 'HigiKioskBpController3'
            }).
            when('/weight1/:direction', {
                templateUrl: 'views/weight1.html',
                controller: 'HigiKioskWeightController1'
            }).
            when('/weight1/:direction/:testing', {
                templateUrl: 'views/weight1.html',
                controller: 'HigiKioskWeightController1'
            }).
            when('/weight2/:direction', {
                templateUrl: 'views/weight2.html',
                controller: 'HigiKioskWeightController2'
            }).
            when('/weight2/:direction/:testing', {
                templateUrl: 'views/weight2.html',
                controller: 'HigiKioskWeightController2'
            }).
            when('/weight3/:direction', {
                templateUrl: 'views/weight3.html',
                controller: 'HigiKioskWeightController3'
            }).
            when('/weight3/:direction/:testing', {
                templateUrl: 'views/weight3.html',
                controller: 'HigiKioskWeightController3'
            }).
            when('/weight4/:direction', {
                templateUrl: 'views/weight4.html',
                controller: 'HigiKioskWeightController4'
            }).
            when('/weight4/:direction/:retesting', {
                templateUrl: 'views/weight4.html',
                controller: 'HigiKioskWeightController4'
            })
            .when('/weight4/:direction/:retesting/:testing', {
                templateUrl: 'views/weight4.html',
                controller: 'HigiKioskWeightController4'
            }).
            when('/weight5/:direction', {
                templateUrl: 'views/weight5.html',
                controller: 'HigiKioskWeightController5'
            }).
            when('/weight5/:direction/:testing', {
                templateUrl: 'views/weight5.html',
                controller: 'HigiKioskWeightController5'
            }).
            when('/fullbodybmc1/:direction', {
                templateUrl: 'views/fullbodybmc1.html',
                controller: 'IHLHPodFullBodyBMCController'
            })
            .when('/fullbodybmc1/:direction/:testing', {
                templateUrl: 'views/fullbodybmc1.html',
                controller: 'IHLHPodFullBodyBMCController'
            }).
            when('/fullbodybmc2/:direction', {
                templateUrl: 'views/fullbodybmc2.html',
                controller: 'IHLHPodFullBodyBMCResultController'
            }).
            when('/fullbodybmc2/:direction/:testing', {
                templateUrl: 'views/fullbodybmc2.html',
                controller: 'IHLHPodFullBodyBMCResultController'
            }).
            when('/spotwo1/:direction', {
                templateUrl: 'views/spotwo1.html',
                controller: 'HigiKioskspo2Controller1'
            }).
            when('/spotwo1/:direction/:testing', {
                templateUrl: 'views/spotwo1.html',
                controller: 'HigiKioskspo2Controller1'
            }).
            when('/spotwo2/:direction', {
                templateUrl: 'views/spotwo2.html',
                controller: 'HigiKioskspo2Controller2'
            }).
            when('/spotwo2/:direction/:testing', {
                templateUrl: 'views/spotwo2.html',
                controller: 'HigiKioskspo2Controller2'
            }).
            when('/spotwo3/:direction', {
                templateUrl: 'views/spotwo3.html',
                controller: 'HigiKioskspo2Controller3'
            }).
            when('/spotwo3/:direction/:testing', {
                templateUrl: 'views/spotwo3.html',
                controller: 'HigiKioskspo2Controller3'
            }).
            when('/tempcount/:direction', {
                templateUrl: 'views/temp_count_down.html',
                controller: 'HigiKioskTempCountDownController'
            }).
            when('/temp0/:direction', {
                templateUrl: 'views/temp0.html',
                controller: 'HigiKioskTempController0'
            }).
            when('/temp0/:direction/:testing', {
                templateUrl: 'views/temp0.html',
                controller: 'HigiKioskTempController0'
            }).
            when('/temp1/:direction', {
                templateUrl: 'views/temp1.html',
                controller: 'HigiKioskTempController1'
            }).
            when('/temp1/:direction/:testing', {
                templateUrl: 'views/temp1.html',
                controller: 'HigiKioskTempController1'
            }).
            when('/temp2/:direction', {
                templateUrl: 'views/temp2.html',
                controller: 'HigiKioskTempController2'
            }).
            when('/temp2/:direction/:testing', {
                templateUrl: 'views/temp2.html',
                controller: 'HigiKioskTempController2'
            }).
            when('/temp3/:direction', {
                templateUrl: 'views/temp3.html',
                controller: 'HigiKioskTempController3'
            }).
            when('/temp3/:direction/:testing', {
                templateUrl: 'views/temp3.html',
                controller: 'HigiKioskTempController3'
            }).
            when('/invasiveInstruction/:direction', {
                templateUrl: 'views/invasiveInstruction.html',
                controller: 'HigiKioskInvasiveInstructionController'
            }).
            when('/invasiveProcess/:direction', {
                templateUrl: 'views/invasiveProcess.html',
                controller: 'HigiKioskInvasiveProcessController'
            }).
            when('/invasiveResult/:direction', {
                templateUrl: 'views/invasiveResult.html',
                controller: 'HigiKioskInvasiveResultController'
            }).
            when('/finish/:direction', {
                templateUrl: 'views/finish.html',
                controller: 'HigiKioskFinishController'
            }).
            when('/finish/:direction/:testing/:noad', {
                templateUrl: 'views/finish.html',
                controller: 'HigiKioskFinishController'
            }).
            when('/finish/:direction/:testing', {
                templateUrl: 'views/finish.html',
                controller: 'HigiKioskFinishController'
            }).
            when('/comebacksoon', {
                templateUrl: 'views/comebacksoon.html',
                controller: 'HigiKioskComebackSoonController'
            }).
            when('/comebacksoon', {
                templateUrl: 'views/comebacksoon.html',
                controller: 'HigiKioskComebackSoonController'
            }).
            when('/emptyexit', {
                templateUrl: 'views/emptyexitview.html',
                controller: 'HigiKioskEmptyExitController'
            }).
            when('/mvm', {
                templateUrl: 'views/mvm/mvm.html',
                controller: 'MvmController'
            }).
            when('/doctorlist', {
                templateUrl: 'views/telemedicine/gem3s/doctorlist.html',
                controller: 'IHLHPodDoctorListController'
            }).
            when('/specialist', {
                templateUrl: 'views/telemedicine/gem3s/specialist.html',
                controller: 'IHLHPodSpeciaListController'
            }).
            when('/telemedicine', {
                templateUrl: 'views/telemedicine/gem3s/telemedicineprescription.html',
                controller: 'telemedicineprescriptioncontroller'
            }).
            when('/speciality', {
                templateUrl: 'views/telemedicine/genix/genixspecialist.html',
                controller: 'IHLHPodGenixSpeciaListController'
            }).
            when('/providerlist', {
                templateUrl: 'views/telemedicine/genix/genixdoctorlist.html',
                controller: 'IHLHPodGenixDoctorListController'
            }).
            when('/teleconsultation', {
                templateUrl: 'views/telemedicine/genix/genixprescription.html',
                controller: 'GenixTeleConsultationController'
            }).
            when('/mosambeePayment', {
                templateUrl: 'views/payment/mosambee/mosambeePayment.html',
                controller: 'mosambeePaymentController'
            }).
            when('/paymentbycard', {
                templateUrl: 'views/payment/mosambee/cardpayment.html',
                controller: 'IHLHPodCardPaymentController'
            }).
            when('/paymentbyupi', {
                templateUrl: 'views/payment/mosambee/upipayment.html',
                controller: 'IHLHPodUPIPaymentController'
            }).
            when('/cardpaymentpin', {
                templateUrl: 'views/payment/mosambee/cardpinNumber.html',
                controller: 'IHLHPodCardPaymentPinController'
            }).
            when('/ihl-teleconsultation-layout', {
                templateUrl: 'views/teleconsultation/layout.html',
                controller: 'teleconsultationLayoutController'
            }).
            when('/ihl-teleconsultation-main-dashboard', {
                templateUrl: 'views/teleconsultation/teleconsultation-main-dashboard.html',
                controller: 'teleconsultationMainDashboardController'
            }).
            when('/ihl-teleconsultation-memberService', {
                templateUrl: 'views/teleconsultation/teleconsultation-member-service.html',
                controller: 'teleconsultationMemberServiceController'
            }).
            when('/ihl-teleconsultation-dashboard', {
                templateUrl: 'views/teleconsultation/dashboard.html',
                controller: 'teleconsultationDashboardController'
            }).
            when('/ihl-teleconsultation-type', {
                templateUrl: 'views/teleconsultation/consultationType.html',
                controller: 'teleconsultationTypeController'
            }).
            when('/ihl-teleconsultation-speciality', {
                templateUrl: 'views/teleconsultation/consultationSpeciality.html',
                controller: 'teleconsultationSpecialityController'
            }).
            when('/ihl-teleconsultation-doctor-list', {
                templateUrl: 'views/teleconsultation/consultationDoctorList.html',
                controller: 'teleconsultationDoctorListController'
            }).
            when('/ihl-teleconsultation-class-list', {
                templateUrl: 'views/teleconsultation/consultationClassList.html',
                controller: 'teleconsultationClassListController'
            }).
            when('/ihl-teleconsultation-video-call', {
                templateUrl: 'views/teleconsultation/consultationVideoCall.html',
                controller: 'teleconsultationVideoCallController'
            }).
            when('/ihl-teleconsultation-book-appointment', {
                templateUrl: 'views/teleconsultation/consultationBookAppointment.html',
                controller: 'teleconsultationBookAppointmentController'
            }).
            when('/ihl-teleconsultation-subscribe-class', {
                templateUrl: 'views/teleconsultation/consultationSubscribeClass.html',
                controller: 'teleconsultationSubscribeClassController'
            }).
            when('/ihl-teleconsultation-summary', {
                templateUrl: 'views/teleconsultation/consultationSummary.html',
                controller: 'teleconsultationSummaryController'
            }).
            when('/ihl-teleconsultation-my-consultant', {
                templateUrl: 'views/teleconsultation/consultationMyConsultant.html',
                controller: 'teleconsultationMyConsultantController'
            }).
            when('/apollo-teleconsultation-video-call', {
                templateUrl: 'views/teleconsultation/apolloConsultationVideoCall.html',
                controller: 'teleconsultationApolloVideoCallController'
            }).
            when('/genix-teleconsultation-video-call', {
                templateUrl: 'views/teleconsultation/genixConsultationVideoCall.html',
                controller: 'teleconsultationGenixVideoCallController'
            }).
            when('/payment-by-razorPayupi', {
                templateUrl: 'views/payment/razorPay/razorpayUpipayment.html',
                controller: 'razorPayUPIPaymentController'
            }).
            when('/esanjeevani-patient-list', {
                templateUrl: 'views/esanjeevaniPatientList.html',
                controller: 'esanjeevaniPatientListController'
            }).
            when('/flipkart-plus-instruction', {
                templateUrl: 'views/flipkartplus/flipkartplusinstruction.html',
                controller: 'flipkartPlusInstructionController'
            }).
            when('/developer-testing-page', {
                templateUrl: 'views/developerTestingPage.html',
                controller: 'developerTestingPageController'
            }).
            otherwise({
                redirectTo: '/welcome'
            });
    }]);