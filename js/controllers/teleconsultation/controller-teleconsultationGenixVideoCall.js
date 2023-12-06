
higiKioskControllers.controller('teleconsultationGenixVideoCallController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', '$sce', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, $sce) {
	
  $scope.init = function() {
    
    $scope.$on("$destroy", function(){
      $rootScope.genixConstants  = function(){ return new GenixConstantsService(); }();
      if ($rootScope.Crossbar != undefined ) {
        $rootScope.Crossbar.unSubscribeToChannel('ihl_send_data_to_user_channel');
        $rootScope.Crossbar.unSubscribeToChannel('ihl_send_data_to_doctor_channel');
        $rootScope.Crossbar.closeConnection();
      }
      //console.log("Genix Video Consultation Page Destroyed");
    });
    $scope.onAfterInit();
  };

  $scope.onAfterInit = function(){
    $rootScope.genixConstants.progressMessage = "Preparing live call.Please wait...";
    if ($rootScope.genixConstants.userBasicDetails == null || $rootScope.genixConstants.userBasicDetails == undefined) {
      $rootScope.genixConstants.progressMessage = "Your basic details are not valid.";
      return;
    };

    if ($rootScope.genixConstants.userBasicDetails.id == null || $rootScope.genixConstants.userBasicDetails.id == undefined) {
      $rootScope.genixConstants.progressMessage = "Your user id is not valid.";
      return;
    };

    if ($rootScope.genixConstants.doctorDetails == null || $rootScope.genixConstants.doctorDetails == undefined) {
      $rootScope.genixConstants.progressMessage = "The selected doctor details are not valid.";
      return;
    };

    if ($rootScope.genixConstants.appointmentId == null || $rootScope.genixConstants.appointmentId == undefined) {
      $rootScope.genixConstants.progressMessage = "Your appointment id is not valid.";
      return;
    };

    if($rootScope.Crossbar == undefined || $rootScope.Crossbar == null){
      $rootScope.genixConstants.progressMessage = 'Error occured while preparing for live call';
      return;
    };

    $rootScope.genixConstants.crossbarClass = $rootScope.Crossbar;
    $rootScope.genixVideoCallAppointmentId = "";

    function onAccept(appointmentId) {
      $scope.callAcceptedByDoctor(appointmentId);
    };

    function onCallEnd() {
      $scope.callEndedByDoctor();
    };

    // Crossbar initialization
    $timeout(()=>{
      $rootScope.genixConstants.initiateCrossbar(onAccept, onCallEnd);
    }, 100);
  };

  $scope.callAcceptedByDoctor = function(appointmentId){
    //mock data
    /*$timeout(()=>{
      $rootScope.genixConstants.genixTeleConsultationVideoCallIframe = false;
      window.location = '#/ihl-teleconsultation-summary'
    },35 * 1000);*/

    $rootScope.genixConstants.genixTeleConsultationVideoCallIframe = true;
    $rootScope.genixConstants.homeButtonVisible = true;
    $rootScope.genixVideoCallAppointmentId = appointmentId;
    let networkLostResponse = ()=>{
      $scope.networkLostInformation();
    };

    $rootScope.genixConstants.videoCallPageNetworkTimeout = setTimeout(()=>{
      $rootScope.genixConstants.checkNetworkAvailabilityStatus($rootScope.genixConstants.networkAvailableStatus, networkLostResponse);
    },15 * 1000);
  };

  $scope.networkLostInformation = function(){
    $rootScope.genixConstants.networkStatusCheckCount = 1;
    $rootScope.genixConstants.genixTeleConsultationVideoCallIframe = false;
    $rootScope.genixConstants.homeButtonVisible = false;
    $rootScope.genixConstants.internetLostForGenixTeleconsultation = true;
    $timeout(()=>{
      $rootScope.genixConstants.internetLostForGenixTeleconsultation = false;
      $rootScope.exitCurrentSession();
    },8 * 1000);
  };

  $rootScope.trustSrcUrl = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $rootScope.genixSignalRTrustSrcUrl = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.callEndedByDoctor = function(){
    $rootScope.teleConsultationVideoCallServiceProvided();
  };

  $scope.init();
}]);