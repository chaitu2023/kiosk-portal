higiKioskControllers.controller('HigiKioskZUGEcgProgressionController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', function ($scope, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService) {

   $rootScope.zugEcgRequestInitCall = true;

   $scope.audioFiles = [

      { filename: 'zugprogression01_audio01' }

   ];
   $scope.leads = [
      { 'leadId': 'ecg_graph_one', 'leadLabel': 'lead_leadI', 'liveGraphSlotId': 'live_graph_slot_leadI' },
      { 'leadId': 'ecg_graph_two', 'leadLabel': 'lead_leadII', 'liveGraphSlotId': 'live_graph_slot_leadII' },
      { 'leadId': 'ecg_graph_three', 'leadLabel': 'lead_leadIII', 'liveGraphSlotId': 'live_graph_slot_leadIII' },
      { 'leadId': 'ecg_graph_avr', 'leadLabel': 'lead_avr', 'liveGraphSlotId': 'live_graph_slot_avr' },
      { 'leadId': 'ecg_graph_avl', 'leadLabel': 'lead_avf', 'liveGraphSlotId': 'live_graph_slot_avl' },
      { 'leadId': 'ecg_graph_avf', 'leadLabel': 'lead_avl', 'liveGraphSlotId': 'live_graph_slot_avf' }
   ];

   $scope.init = function () {      
      if ($rootScope.rightJackStatus) {
         $("#three_lead_ecg").hide();
         $("#five_lead_ecg").show();
          $scope.slideTitle = 'zugEcg1.sixLeadecgtitledisp';
      }
      else {
          $scope.slideTitle = 'zugEcg1.threeLeadecgtitledisp';
         $("#three_lead_ecg").show();
         $("#five_lead_ecg").hide();
      }


      $scope.realTimeGraphShow = false;
      $scope.realTimeGraphEnable = function(){
         $scope.realTimeGraphShow = !$scope.realTimeGraphShow;
      }

      $rootScope.showECGEmergencyStopButton = true;
      $scope.bpUnits = 'global.mmhg';
      $scope.bpPulse = 'global.pulse';
      $scope.bpBpm = 'global.bpm';
      
      $scope.emergencyStop = "zugEcg1.skipTest";
      $scope.ecgProgress = "zugEcg2.inProgress";    
      $scope.ecgLegMsg = "zugEcg1.keepLegsProper";
      $scope.ecgHandMsg = "zugEcg1.keepHandsProper";
      $scope.bpBpm = 'global.bpm';
      $scope.pulse = '75';
      $scope.bpBpmUnit = 'bpm';
      $scope.ecgWaveValidationResult = 'Normal Sinus Rythm';
      document.getElementById("ecg_result_one").innerHTML = $scope.interfaceLabels[$scope.ecglead1];
      document.getElementById("ecg_result_two").innerHTML = $scope.interfaceLabels[$scope.ecglead2];
      document.getElementById("ecg_result_three").innerHTML = $scope.interfaceLabels[$scope.ecglead3];
      $scope.showPulse = true;
      $scope.HeartRateTitle = 'Heart Rate';
      $scope.showValidationResults = true;
      $scope.setSlideDirection($routeParams.direction);
      
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgProgressionController', $scope.mode);
      //var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgProgressionController', $rootScope.mode);
      $scope.nextSlide = links.next.link;

      $scope.bpmandStatusUpdateInterval = setInterval(function () {
         if ($rootScope.showNormalMessage == true && $rootScope.showEcgHandMessage == false && $rootScope.showEcgLegMessage == false) {
            if ($rootScope.rightJackStatus == true) {
               document.getElementById("ecgMessageSixLead").innerHTML = "";
               document.getElementById("ecgMessageSixLead").style.color = "#58B11B";
               document.getElementById("ecgMessageSixLead").innerHTML = $scope.interfaceLabels[$scope.ecgProgress];
            }
            else {
               document.getElementById("ecgMessage").innerHTML = "";
               document.getElementById("ecgMessage").style.color = "#58B11B";
               document.getElementById("ecgMessage").innerHTML = $scope.interfaceLabels[$scope.ecgProgress];
            }
         }
         else if ($rootScope.showNormalMessage == false && $rootScope.showEcgHandMessage == true && $rootScope.showEcgLegMessage == false) {
            if ($rootScope.rightJackStatus == true) {
               document.getElementById("ecgMessageSixLead").innerHTML = "";
               document.getElementById("ecgMessageSixLead").style.color = "red";
               document.getElementById("ecgMessageSixLead").innerHTML = $scope.interfaceLabels[$scope.ecgHandMsg];
            }
            else {
               document.getElementById("ecgMessage").innerHTML = "";
               document.getElementById("ecgMessage").style.color = "red";
               document.getElementById("ecgMessage").innerHTML = $scope.interfaceLabels[$scope.ecgHandMsg];;
            }

         }
         else if ($rootScope.showNormalMessage == false && $rootScope.showEcgLegMessage == true && $rootScope.showEcgHandMessage == false) {
            if ($rootScope.rightJackStatus == true) {
               document.getElementById("ecgMessageSixLead").innerHTML = "";
               document.getElementById("ecgMessageSixLead").style.color = "red";
               document.getElementById("ecgMessageSixLead").innerHTML = $scope.interfaceLabels[$scope.ecgLegMsg];
            }
            else {
               document.getElementById("ecgMessage").innerHTML = "";
               document.getElementById("ecgMessage").style.color = "red";
               document.getElementById("ecgMessage").innerHTML = $scope.interfaceLabels[$scope.ecgLegMsg];
            }
         }
         if ($rootScope.StopLEGHandDetection) {
            //  alert("Progression Controller - Clear Interval and stop showing Leg and Hand Message");
            $rootScope.StopLEGHandDetectionCheck();
         }
         var goodECGcount = HigiKioskStorageService.returnSessionData('zugGoodECGPQRSCount');
         var badECGCOunt = HigiKioskStorageService.returnSessionData('zugBadECGPQRSCount');
         var currentBPM = HigiKioskStorageService.returnSessionData('zugECGCurrentBPM');
         var isZugReadingComplete = $rootScope.recordingOrRegretComplete;
         var signalStrength = HigiKioskStorageService.returnSessionData('zugECGSignalStrength');
         if (currentBPM == undefined) { currentBPM = 0; }
         if (currentBPM > 300) { currentBPM = 0; }
         if (goodECGcount == undefined) { goodECGcount = 0; }
         if (badECGCOunt == undefined) { badECGCOunt = 0; }
         if (isZugReadingComplete) {
            clearInterval($scope.bpmandStatusUpdateInterval);
         }
      }, 1000);
   };
   $scope.init();
}]);
