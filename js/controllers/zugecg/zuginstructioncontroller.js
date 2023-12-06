higiKioskControllers.controller('HigiKioskZUGEcgInstructionController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', '$location', function ($scope, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, $location) {

  $scope.audioFiles = [
    { filename: 'zuginstruction01_audio01' },
    { filename: 'zuginstruction01_audio02' },
    { filename: 'zuginstruction01_audio03' },
    { filename: 'zuginstruction01_audio04' },
    { filename: 'zuginstruction01_audio05' },
    { filename: 'zuginstruction01_audio06' },
    { filename: 'zuginstruction01_audio07' },
    { filename: 'zugprogression01_audio01' },
    { filename: 'zugprogression01_audio02' },
    { filename: 'zugprogression01_audio03' },
    { filename: 'zugprogression01_audio04' },
    { filename: 'zuginstruction01_audio08' },
    { filename: 'zuginstruction01_audio09' }
  ];

  $scope.instructions = "text.instructions";

  $scope.sitStraight = "zugEcg1.sitStraight";
  $scope.ecgrestywr = "zugEcg1.restWrist";
  $scope.plleftleg = "zugEcg1.placeleftleg";
  $scope.plbothleg = "zugEcg1.placebothleg";
  $scope.EcgTestWillBegin = "zugEcg1.EcgTestWillBegin";
  $scope.skipTest = 'zugEcg1.skipTest';
  $scope.startTest = 'zugEcg1.startTest';
  $scope.keepHandsProper = "zugEcg1.keepHandsProper";
  $scope.keepLegsProper = "zugEcg1.keepLegsProper";

  $scope.GraphInitalizeExecuted = false;
  $scope.lead1array = new Array();
  $scope.lead2array = new Array();
  $scope.lead3array = new Array();
  $scope.currentGuid = 0;
  $scope.oldGuid = 0;
  $scope.leadOneStatusResult = "";
  $scope.leadTwoStatusResult = "";
  $scope.leadThreeStatusResult = "";
  $scope.SixLeadleadOneStatusResult = "";
  $scope.SixLeadleadTwoStatusResult = "";
  $scope.SixLeadleadThreeStatusResult = "";
  $scope.SixLeadleadFourStatusResult = "";
  $scope.SixLeadleadFiveStatusResult = "";
  $scope.SixLeadleadSixStatusResult = "";
  $rootScope.StoreECGRawDataForAnalysis = []; // for ecg_analysis 

  var rawDataArray = new Array();
  var rawDataArrayLeadIThreeLeadMode = new Array();
  var rawDataArrayLeadIIThreeLeadMode = new Array();
  var rawDataArrayLeadIIIThreeLeadMode = new Array();
  var rawDataArrayLeadI = new Array();
  var rawDataArrayLeadII = new Array();
  var rawDataArrayLeadIII = new Array();
  var rawDataArrayLeadAVR = new Array();
  var rawDataArrayLeadAVF = new Array();
  var rawDataArrayV1 = new Array();
  var rawDataArrayLeadAVL = new Array();
  var rawDataArrayLeadchannel1 = new Array();
  var rawDataArrayLeadchannel2 = new Array();
  var rawDataArrayLeadOneIndex = new Array();
  var rawDataArrayLeadTwoIndex = new Array();
  $scope.instructionExecution = function () {
    if ($scope.leadMode == 1) {
      var currentURL = window.location;
      currentURL = currentURL.toString();
      if (currentURL.indexOf("#/zugecginstruction") != -1) {
        $scope.showInstructions = true;
        $scope.slideTitle = 'zugEcg1.singleLeadecgtitledisp';
        $scope.slideSubTitle = 'text.instructions';
        $scope.continue = true;
        $scope.instructionTransition = '';
        $scope.bmcTestTransition = '';
        $scope.bmcTestVisible = false;
        $("#sample").hide();
        $("#sample1").show();
        if (true) {

          $scope.instructionTwo = [
            $scope.weightInstruction.bmcAnimationOne
          ];
          $scope.instructionThree = [
            $scope.weightInstruction.bmcAnimationTwo
          ];
          $scope.q = $q.defer();
          $timeout(function () { $scope.q.resolve() }, 4000);
          $scope.promise = HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[3].filename], $scope).promise;
          $scope.instructionTwo = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
            },
            $scope.weightInstruction.bmcAnimationOne
          ];

          $scope.instructionThree = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
            },
            $scope.weightInstruction.bmcAnimationTwo
          ];

        }

        $scope.q.promise
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue); })
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue); })
          .then(function () {
            return $scope.bmcHandReadyPromise.promise
          })
          .then(function () {
          });

      } //Audio Animation ends
    }
    else if ($scope.leadMode == 6) {
      $scope.bmcTestWillBegin = 'zugEcg1.EcgTestWillBegin';
      $scope.sixleadLeg = true;
      $scope.threeleadleg = false;
      var currentURL = window.location;
      currentURL = currentURL.toString();
      if (currentURL.indexOf("#/zugecginstruction") != -1) {
        $scope.showInstructions = true;
        $scope.slideTitle = 'zugEcg1.sixLeadecgtitledisp';
        $scope.slideSubTitle = 'text.instructions';
        $scope.continue = true;
        $scope.instructionTransition = '';
        $scope.bmcTestTransition = '';
        $scope.bmcTestVisible = false;
        $("#sample").hide();
        $("#sample1").show();

        if (true) {

          $scope.instructionTwo = [
            $scope.weightInstruction.threeleadecgAnimationOne
          ];
          $scope.instructionThree = [
            $scope.weightInstruction.threeleadecgAnimationTwo
          ];
          $scope.instructionFour = [
            $scope.weightInstruction.threeleadecgAnimationThree
          ];
          $scope.q = $q.defer();
          $timeout(function () { $scope.q.resolve() }, 3000);



          $scope.promise = HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[12].filename], $scope).promise;

          $scope.instructionTwo = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationOne
          ];


          $scope.instructionThree = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationTwo
          ];
          $scope.instructionFour = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[11].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationThree
          ];

        }

        $scope.q.promise
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue); })
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue); })
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue); })

          .then(function () {
            return $scope.bmcHandReadyPromise.promise
          })
          .then(function () {
          });
      }
    }
    else if ($scope.leadMode == 3) {
      $scope.bmcTestWillBegin = 'zugEcg1.EcgTestWillBegin';
      $scope.sixleadLeg = false;
      $scope.threeleadleg = true;
      var currentURL = window.location;
      currentURL = currentURL.toString();
      if (currentURL.indexOf("#/zugecginstruction") != -1) {
        $scope.showInstructions = true;
        $scope.slideTitle = 'zugEcg1.threeLeadecgtitledisp';
        $scope.slideSubTitle = 'text.instructions';


        $scope.continue = true;
        $scope.instructionTransition = '';
        $scope.bmcTestTransition = '';
        $scope.bmcTestVisible = false;
        $("#sample").show();
        $("#sample1").hide();

        if (true) {

          $scope.instructionTwo = [
            $scope.weightInstruction.threeleadecgAnimationOne
          ];
          $scope.instructionThree = [
            $scope.weightInstruction.threeleadecgAnimationTwo
          ];
          $scope.instructionFour = [
            $scope.weightInstruction.threeleadecgAnimationThree
          ];
          $scope.q = $q.defer();
          $timeout(function () { $scope.q.resolve() }, 3000);



          $scope.promise = HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;

          $scope.instructionTwo = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationOne
          ];


          $scope.instructionThree = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationTwo
          ];
          $scope.instructionFour = [
            function () {
              return HigiKioskAnimationService.playAudioPromise($rootScope.interfaceLabels[$scope.audioFiles[6].filename], $scope);
            },
            $scope.weightInstruction.threeleadecgAnimationThree
          ];

        }

        $scope.q.promise
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue); })
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue); })
          .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue); })

          .then(function () {
            return $scope.bmcHandReadyPromise.promise
          })
          .then(function () {
          });
      }
    }
    $scope.nextVisible = true;
  }

  $scope.takeTestButton = function() {
    HigiKioskAnimationService.audioStop();
    console.log("sending command for ECG hand detection from controller");
    $scope.nextVisible = false;
    JkioskService.callZugECGHandDetetectFunction($scope.callbackOfHandDetection, $scope.zugLiveDataCallBack, $scope.leadMode, $scope.leadToRead, $scope.zugValidationResultsCallback, $scope.ZugECGBPMResultsCallBack, $scope.ZugECGReadAbortCompleteCallbackFunction, $scope.ZugECGBadReadAbortCompleteCallbackFunction, $scope.performTimerAbortResponseCallBack, $scope.amplitudeLevelResponseCallBack, $scope.sixLeadLiveDataCallBack);
    if ($scope.leadMode == 3) {
      setTimeout(function () {

        if ($scope.leadToRead == 1 && $rootScope.ZugECGEmergencySkipClicked == false) {
          // lead one starts
          window.location = $scope.nextSlide; // moving to next slide
          if ($scope.leadMode == 3) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[7].filename], $scope);
          } else if ($scope.leadMode == 6) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[10].filename], $scope);
          }
        }
      }, 3000);
      $scope.ECGTimeout = setTimeout(function () {
        if ($scope.handDetected == false && $rootScope.mode == "bpw" && $scope.gotResponseFromZugECGLead3 == false && $rootScope.RedoTestClicked == false) {
          $rootScope.showECGEmergencyStopButton = false;
          $("#profileButtonInWelcomePage").hide();
          $("#RestartModal").show();
        }
        if ($scope.gotResponseFromZugECGLead3 == false) {
          if ($rootScope.StopLEGHandDetection == false) {
            $rootScope.StopLEGHandDetection = true;
            $rootScope.ecgPoorResult = true;
            $("#ZugEcgRegretMessage").show();
            $scope.stopECGwithoutComplete();
            setTimeout(function () {
            }, 2000);
          }
        }
      }, 150000);
    }
    else {
      setTimeout(function () {

        if ($scope.leadToRead == 1) {
          // lead one starts
          window.location = $scope.nextSlide; // moving to next slide
          if ($scope.leadMode == 3) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[7].filename], $scope);
          } else if ($scope.leadMode == 6) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[10].filename], $scope);
          }
        }
      }, 3000);
      $scope.ECGTimeout = setTimeout(function () {
        if ($scope.handDetected == false && $rootScope.lead1PythonSocketSuccess == false & $rootScope.mode == "bpw" && $rootScope.RedoTestClicked == false) {
          $rootScope.showECGEmergencyStopButton = false;
          $("#profileButtonInWelcomePage").hide();
          $("#RestartModal").show();
        }
        if ($rootScope.lead1PythonSocketSuccess == false) {
          if ($rootScope.StopLEGHandDetection == false) {
            $rootScope.StopLEGHandDetection = true;
            $rootScope.ecgPoorResult = true;
            $("#ZugEcgRegretMessage").show();
            $scope.stopECGwithoutComplete();
            setTimeout(function () {
            }, 2000);
          }
        }
      }, 120000);
    }
  }// end of instruction execution function
  $scope.zugECGRegretbtnClick = function () {
    JkioskService.restartOs($scope.restartOsCallback);
  }
  $scope.restartOsCallback = function (jsonResponse) {
    var myJSON = JSON.stringify(jsonResponse);
  }
  var ecgDataFromHardware;
  var ecgDataFromHardwareLeadII;
  var ecgDataFromHardwareLeadIII;
  var ecgDataFromHardwareLeadAVR;
  var ecgDataFromHardwareLeadAVL;
  var ecgDataFromHardwareLeadAVF;
  var ecgDataFromHardwareChannelI;
  var ecgDataFromHardwareChannelII;
  var hundredArraySixLead;


  $scope.sixLeadLiveDataCallBack = function (jsonResponse) {
    if ($rootScope.ZugECGEmergencySkipClicked == true || $rootScope.ecgPoorResult == true || $rootScope.zugECGDataReadingComplete == true) {
      return;
    }
    else {
      var myJSON = JSON.stringify(jsonResponse);
      $scope.data = jsonResponse.data;
      $scope.lead = jsonResponse.lead;

      if ($scope.lead == 1 && $scope.initialRun == false && $rootScope.lead1PythonSocketSuccess == false) {
        ecgDataFromHardware = jsonResponse.data;
        var hundredArraySixLead = ecgDataFromHardware.split(',');
        rawDataArrayLeadI = rawDataArrayLeadI.concat(hundredArraySixLead);
        $scope.ecgLeadOneArrayDataSixLead = rawDataArrayLeadI;
        $scope.ecgLeadOneArrayDataSixLead = $scope.ecgLeadOneArrayDataSixLead;
        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardware);
        }
      }

      else if ($scope.lead == 2) {
        ecgDataFromHardwareLeadII = jsonResponse.data;
        var hundredArrayLeadII = ecgDataFromHardwareLeadII.split(',');
        rawDataArrayLeadII = rawDataArrayLeadII.concat(hundredArrayLeadII);
        $scope.ecgLeadTwoArrayDataSixLead = rawDataArrayLeadII;
        if ($scope.ecgLeadTwoArrayDataSixLead.length == 5000 && $scope.initialRun == false && $rootScope.lead1PythonSocketSuccess == false && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          $scope.leadTwoLiveDataSlicedSixLead = $scope.ecgLeadTwoArrayDataSixLead.slice(1000, 5000);
          $scope.leadOneLiveDataSlicedSixLead = $scope.ecgLeadOneArrayDataSixLead.slice(1000, 5000);
          HigiKioskStorageService.saveSessionData('LeadTwoSixSecondsECGDataSixLead', $scope.leadTwoLiveDataSlicedSixLead);
          HigiKioskStorageService.saveSessionData('LeadOneSixSecondsECGDataSixLead', $scope.leadOneLiveDataSlicedSixLead);
          if ($scope.goodAmplitude > 30 && $scope.leadTwoLiveDataSlicedSixLead != undefined && $scope.errorCount < 3) {
            $scope.goodAmplitude = 0;
            $scope.leadTwoLiveDataSlicedSixLead = $scope.ecgLeadTwoArrayDataSixLead.slice(1000, 5000);
            //       console.log("Third LeadTwoSixSecondsECGDataSixLead   "+$scope.leadTwoLiveDataSlicedSixLead);
            $scope.initialRun = true;
            pythonSocket($scope.leadTwoLiveDataSlicedSixLead.join(), 2);
          }
          rawDataArrayLeadII = rawDataArrayLeadII.slice(rawDataArrayLeadII.length - 5000, 5000);
          $scope.ecgLeadTwoArrayDataSixLead = "";
          rawDataArrayLeadII = new Array();
          $scope.ecgLeadOneArrayDataSixLead = "";
          rawDataArrayLeadI = rawDataArrayLeadI.slice(rawDataArrayLeadI.length - 5000, 5000);
          rawDataArrayLeadI = new Array();
        }
        else {
          $scope.ecgLeadTwoArrayDataSixLead = $scope.ecgLeadTwoArrayDataSixLead;
        }

        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardwareLeadII);
        }
      }

      else if ($scope.lead == 3) {
        ecgDataFromHardwareLeadIII = jsonResponse.data;
        var hundredArrayLeadIII = ecgDataFromHardwareLeadIII.split(',');
        rawDataArrayLeadIII = rawDataArrayLeadIII.concat(hundredArrayLeadIII);
        $scope.ecgLeadThreeArrayDataSixLead = rawDataArrayLeadIII;
        if ($scope.ecgLeadThreeArrayDataSixLead.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          $scope.ecgLeadThreeArrayDataSixLead = "";
          rawDataArrayLeadIII = rawDataArrayLeadIII.slice(rawDataArrayLeadII.length - 5000, 5000);
          rawDataArrayLeadIII = new Array();
        }
        else {
          $scope.ecgLeadThreeArrayDataSixLead = $scope.ecgLeadThreeArrayDataSixLead;
        }

        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardwareLeadIII);
        }
      }

      else if ($scope.lead == 4) {
        ecgDataFromHardwareLeadAVR = jsonResponse.data;
        var hundredArrayLeadAVR = ecgDataFromHardwareLeadAVR.split(',');
        rawDataArrayLeadAVR = rawDataArrayLeadAVR.concat(hundredArrayLeadAVR);
        $scope.ecgLeadFourArrayDataSixLead = rawDataArrayLeadAVR;
        if ($scope.ecgLeadFourArrayDataSixLead.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          $scope.ecgLeadFourArrayDataSixLead = "";
          rawDataArrayLeadAVR = rawDataArrayLeadAVR.slice(rawDataArrayLeadAVR.length - 5000, 5000);
          rawDataArrayLeadAVR = new Array();
        }
        else {
          $scope.ecgLeadFourArrayDataSixLead = $scope.ecgLeadFourArrayDataSixLead;
        }
        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardwareLeadAVR);
        }
      }

      else if ($scope.lead == 5) {
        ecgDataFromHardwareLeadAVL = jsonResponse.data;
        var hundredArrayLeadAVL = ecgDataFromHardwareLeadAVL.split(',');
        rawDataArrayLeadAVL = rawDataArrayLeadAVL.concat(hundredArrayLeadAVL);
        $scope.ecgLeadFiveArrayDataSixLead = rawDataArrayLeadAVL;
        if ($scope.ecgLeadFiveArrayDataSixLead.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          $scope.ecgLeadFiveArrayDataSixLead = "";
          rawDataArrayLeadAVL = rawDataArrayLeadAVL.slice(rawDataArrayLeadAVL.length - 5000, 5000);
          rawDataArrayLeadAVL = new Array();
        }
        else {
          $scope.ecgLeadFiveArrayDataSixLead = $scope.ecgLeadFiveArrayDataSixLead;
        }
        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardwareLeadAVL);
        }
      }

      else if ($scope.lead == 6) {

        ecgDataFromHardwareLeadAVF = jsonResponse.data;
        var hundredArrayLeadAVF = ecgDataFromHardwareLeadAVF.split(',');
        rawDataArrayLeadAVF = rawDataArrayLeadAVF.concat(hundredArrayLeadAVF);
        $scope.ecgLeadSixArrayDataSixLead = rawDataArrayLeadAVF;
        if ($scope.ecgLeadSixArrayDataSixLead.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          $scope.ecgLeadSixArrayDataSixLead = "";
          rawDataArrayLeadAVF = rawDataArrayLeadAVF.slice(rawDataArrayLeadAVF.length - 5000, 5000);
          rawDataArrayLeadAVF = new Array();

        }
        else {
          $scope.ecgLeadSixArrayDataSixLead = $scope.ecgLeadSixArrayDataSixLead;
        }
        if ($scope.GraphInitalizeExecuted == false) {
          execute_graph();
          $scope.GraphInitalizeExecuted = true;
        } else {
          insertFreshNewDatapointsFromHardware($scope.lead, ecgDataFromHardwareLeadAVF);
        }
      }

      else if ($scope.lead == 8) {
        ecgDataFromHardwareChannelI = jsonResponse.data;
        var hundredArrayLeadChannelI = ecgDataFromHardwareChannelI.split(',');
        rawDataArrayLeadchannel1 = rawDataArrayLeadchannel1.concat(hundredArrayLeadChannelI);
        $scope.channel1array = rawDataArrayLeadchannel1;
        if ($scope.channel1array.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          HigiKioskStorageService.saveSessionData('LeadEightSixSecondsECGDataSixLead', $scope.channel1array);
          $scope.channel1array = "";
          rawDataArrayLeadchannel1 = rawDataArrayLeadchannel1.slice(rawDataArrayLeadchannel1.length - 5000, 5000);

          rawDataArrayLeadchannel1 = new Array();
        }
        else {
          $scope.channel1array = $scope.channel1array;
        }

      }
      else if ($scope.lead == 9) {
        ecgDataFromHardwareChannelII = jsonResponse.data;
        var hundredArrayLeadChannelII = ecgDataFromHardwareChannelII.split(',');
        rawDataArrayLeadchannel2 = rawDataArrayLeadchannel2.concat(hundredArrayLeadChannelII);
        $scope.channel2array = rawDataArrayLeadchannel2;
        if ($scope.channel2array.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
          HigiKioskStorageService.saveSessionData('LeadNineSixSecondsECGDataSixLead', $scope.channel2array);
          $scope.channel2array = "";
          rawDataArrayLeadchannel2 = rawDataArrayLeadchannel2.slice(rawDataArrayLeadchannel2.length - 5000, 5000);

          rawDataArrayLeadchannel2 = new Array();
        }
        else {
          $scope.channel2array = $scope.channel2array;
        }

      }

    }
  }

  $scope.callbackOfHandDetection = function (jsonResponse) {
    console.log("callbackOfHandDetection");
    $scope.handDetected = true;
    $scope.errorCount = 0;
    if ($rootScope.ZugECGEmergencySkipClicked == true || $rootScope.ecgPoorResult == true || $rootScope.zugECGDataReadingComplete == true) {
      return;
    }
    else {
      var myJSON = JSON.stringify(jsonResponse);
      $scope.leadSwitching = false;
      setTimeout(function () {

        if ($scope.leadToRead == 1 && $rootScope.ZugECGEmergencySkipClicked == false) {
          // lead one starts
          window.location = $scope.nextSlide; // moving to next slide
          if ($scope.leadMode == 3) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[7].filename], $scope);
          } else if ($scope.leadMode == 6) {
            $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[10].filename], $scope);
          }
        }
      }, 3000);
    }
  }// end of callback of hand detection

  $scope.amplitudeLevelResponseCallBack = function (jsonResponse) {
    if ($rootScope.ZugECGEmergencySkipClicked == true || $rootScope.ecgPoorResult == true || $rootScope.zugECGDataReadingComplete == true) {
      return;
    }
    if ($scope.HandMessageDisplayed == true) {
      $rootScope.showEcgLegMessage = false;
    }
    var myJSON = jsonResponse["amplitudeLow"];

    if (myJSON == true) {
      $scope.badAmplitudeCount++;
    }
    else {
      $scope.badAmplitudeCount = 0;
    }
    if ($scope.badAmplitudeCount > 1) {
      // console.log("Low Amplitude detected");
      $scope.badAmplitudeCount = 0;
      $rootScope.showNormalMessage = false;
      if ($scope.leadMode == 3 && $rootScope.showEcgHandMessage == true) {
        $rootScope.showEcgHandMessage = false;
      }
      $scope.amplitudeLowDetected = true;
      var currentURL = window.location;
      currentURL = currentURL.toString();
      if (currentURL.indexOf("#/zugecginstruction") == -1) {
        if ($rootScope.StopLEGHandDetection == false && $rootScope.recordingOrRegretComplete == false) {
          if ($scope.LegMessageDisplayed == false) {
            $scope.goodAmplitudeCount = 0;
            $scope.goodAmplitude = 0;
            setTimeout(function () {
              if (myJSON == true && $scope.HandMessageDisplayed == false) {
                $scope.LegMessageDisplayed = true;
                if ($scope.leadMode == 3) {
                  $rootScope.showEcgLegMessage = true;
                }
                else {
                  $scope.HandMessageDisplayed = true;
                  $rootScope.showEcgHandMessage = true;
                }
              }
            }, 2000);
          }
        }
      }
    }
    else {
      $scope.goodAmplitude++;
      $scope.goodAmplitudeCount++;
      if ($scope.goodAmplitudeCount > 8) {
        //console.log("High amplitude detected");
        $scope.goodAmplitudeCount = 0;
        $scope.LegMessageDisplayed = false;
        $scope.HandMessageDisplayed = false;
        $rootScope.showEcgLegMessage = false;
        $rootScope.showEcgHandMessage = false;
        $rootScope.showNormalMessage = true;
        $scope.amplitudeLowDetected = false;
      }
    }
  }
  $scope.ZugECGemergencyStopCallbackFunction = function (response) {
    console.log("ZugECGemergencyStopCallbackFunction");
    $scope.emergencyStopStatus = response.Value;
    if ($rootScope.zugECGDataReadingComplete == false) {
      $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
      if ($scope.mode == "bpw") {
        var mode = "bpw";
        var currenttest = "ECG";
        var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
        $("#ZugEcgRegretMessage").hide();
        if ($rootScope.ecgPoorResult) {
          window.location = nextTestPath;
        }

      } else if ($rootScope.selectedVital.length > 1) {
        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
        $scope.nextSlide = nextTestPath;
        $timeout(function () {
          $("#ZugEcgRegretMessage").hide();
          window.location = $scope.nextSlide;
        }, 500);
      } else {
        $("#ZugEcgRegretMessage").hide();
        window.location.href = "#/finish/forward";
      }
    }
  }

  $scope.ZugSuccessStopCallbackFunction = function (response) {
    console.log("clearing timers")
    clearTimeout($scope.ECGTimeout);
    clearInterval($scope.handsKeptInterval);
  }

  $scope.stopECGwithoutComplete = function () {
    console.log("stopECGwithoutComplete");
    HigiKioskAnimationService.audioStop();
    $rootScope.recordingOrRegretComplete = true;
    clearTimeout($scope.ECGTimeout);
    clearInterval($scope.handsKeptInterval);
    $rootScope.showEcgSlider = true;
    $rootScope.showECGEmergencyStopButton = false;
    if ($scope.regretComplete == false & $rootScope.recordingOrRegretComplete == true) {
      console.log("Calling StopECG");
      JkioskService.callZugECGemergencyStopFunction($scope.stopECGReading);
      $rootScope.zugEcgTestWentWrongAttempts = 0;
      $rootScope.recordingOrRegretComplete = true;
      HigiKioskStorageService.saveSessionData('HeartRate', "");
      HigiKioskStorageService.saveSessionData('zugECGCurrentBPMNonZero', "");

      if ($scope.leadMode == 6) {
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead1SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead2SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead3SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead4SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead5SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead6SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead8SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGlead9SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('sixleadZugECGStatus', undefined);
        HigiKioskStorageService.saveSessionData('SixLeadleadTwoStatusResult', undefined);
      }
      else if ($scope.leadMode == 3) {
        HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead1', $scope.leadOneStatusResult);
        HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead2', $scope.leadTwoStatusResult);
        HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead3', $scope.leadThreeStatusResult);
        HigiKioskStorageService.saveSessionData('ZugECGlead1SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('ZugECGlead2SmoothGraph', undefined);
        HigiKioskStorageService.saveSessionData('ZugECGlead3SmoothGraph', undefined);
      }
      $('#ecgLeadIIICompleteDialog').hide();
      $('#ecgLeadIICompleteDialog').hide();
      $('#ecgLeadICompleteDialog').hide();
      $timeout(function () {
        if ($scope.ekgStopStatus == false) {
          console.log("ECG Stop did not responded in stopECGwithoutComplete");
          JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
          $timeout(function () {
            $("#ZugEcgRegretMessage").hide();
            $("#ecgLeadCompleteDialog").hide();
            $("#ecgTestSkippedMessage").hide();
            if ($rootScope.zugECGDataReadingComplete == false) {
				
				var absUrl = $location.absUrl();
				var url = absUrl.split("#");
				if(url[1] != "/zugecginstruction/forward" && url[1] != "/zugecgprogression/forward"){
					return 0;
				}
				
              $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
              if ($scope.mode == "bpw") {
                var mode = "bpw";
                var currenttest = "ECG";
                var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
                if ($rootScope.ecgPoorResult) {
                  $timeout(function () {
                    window.location = nextTestPath;
                  }, 500);
                }
              } else if ($rootScope.selectedVital.length > 1) {
                var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                $scope.nextSlide = nextTestPath;
                $timeout(function () {
                  window.location = $scope.nextSlide;
                }, 500);
              } else {
                $timeout(function () {
                  window.location.href = "#/finish/forward";
                }, 500);
              }
            }
          }, 7000);
        }
        else if ($scope.legOFFStatus == false) {
          console.log("Switch did not responded in stopECGwithoutComplete");
          $("#ZugEcgRegretMessage").hide();
          $("#ecgLeadCompleteDialog").hide();
          $("#ecgTestSkippedMessage").hide();
          if ($rootScope.zugECGDataReadingComplete == false) {
            $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
            if ($scope.mode == "bpw") {
              var mode = "bpw";
              var currenttest = "ECG";
              var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
              if ($rootScope.ecgPoorResult) {
                $timeout(function () {
                  window.location = nextTestPath;
                }, 500);
              }
            } else if ($rootScope.selectedVital.length > 1) {
              var nextTestPath = HigiKioskFlow.UserSelectNextTest();
			        $scope.nextSlide = nextTestPath;
              $timeout(function () {
                window.location = $scope.nextSlide;
              }, 500);
            } else {
              $timeout(function () {
                window.location.href = "#/finish/forward";
              }, 500);
            }
          }
        }
      }, 10000);
    }
    $scope.regretComplete == true;
  }

  var sliced = new Array();
  $scope.lead1array = " ";

  $scope.zugLiveDataCallBack = function (jsonResponse) {
    if ($rootScope.ZugECGEmergencySkipClicked == true || $rootScope.ecgPoorResult == true || $rootScope.zugECGDataReadingComplete == true) {
      return;
    }
    else {
      if ($scope.leadMode == 3) {
        if (!$scope.leadSwitching) {
          var myJSON = JSON.stringify(jsonResponse);
          if ($scope.leadToRead == 1) {
            $("#leadtwo").hide();
            $("#leadthree").hide();
            $("#leadone").show();
          } else if ($scope.leadToRead == 2) {
            $("#leadone").hide();
            $("#leadthree").hide();
            $("#leadtwo").show();
          } else if ($scope.leadToRead == 3) {
            $("#leadone").hide();
            $("#leadtwo").hide();
            $("#leadthree").show();
          }
          if ($scope.leadToRead == 1) {
            var ecgDataFromHardware = jsonResponse["Value"];
            var hundredArray = ecgDataFromHardware.split(',');
            rawDataArrayLeadIThreeLeadMode = rawDataArrayLeadIThreeLeadMode.concat(hundredArray);
            $scope.ecgLeadOneArrayData = rawDataArrayLeadIThreeLeadMode;
            if ($scope.ecgLeadOneArrayData.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
              //$scope.ThreeLeadleadOneLiveDataSliced = $scope.ecgLeadOneArrayData.slice(1000, 5000);
              //HigiKioskStorageService.saveSessionData('LeadOneSixSecondsECGData', $scope.ThreeLeadleadOneLiveDataSliced);
              if ($scope.goodAmplitude > 25 && $scope.errorCount == 0 && $rootScope.lead1PythonSocketSuccess == false) {
                $scope.ThreeLeadleadOneLiveDataSliced = $scope.ecgLeadOneArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadOneSixSecondsECGData', $scope.ThreeLeadleadOneLiveDataSliced);
                // console.log("LeadOneSixSecondsECGData   "+$scope.ThreeLeadleadOneLiveDataSliced);
                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadOneLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadOneLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 1 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadOneLiveDataSliced = $scope.ecgLeadOneArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadOneSixSecondsECGData', $scope.ThreeLeadleadOneLiveDataSliced);
                //    console.log("LeadOneSixSecondsECGData   "+$scope.ThreeLeadleadOneLiveDataSliced);
                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadOneLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadOneLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 2 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadOneLiveDataSliced = $scope.ecgLeadOneArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadOneSixSecondsECGData', $scope.ThreeLeadleadOneLiveDataSliced);
                //  console.log("LeadOneSixSecondsECGData   "+$scope.ThreeLeadleadOneLiveDataSliced);

                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadOneLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadOneLivesDataSliced = "";
              }
              $scope.ecgLeadOneArrayData = "";
              rawDataArrayLeadI = rawDataArrayLeadI.slice(rawDataArrayLeadI.length - 5000, 5000);
              rawDataArrayLeadIThreeLeadMode = new Array();
            }
            else {
              $scope.ecgLeadOneArrayData = $scope.ecgLeadOneArrayData;
            }
          }
          if ($scope.leadToRead == 2) {
            setTimeout(function () {
              if ($scope.lead1CompleteHidden == false) {
                $("#ecgLeadICompleteDialog").hide();
                $scope.lead1CompleteHidden = true;
              }
            }, 5000);
            var ecgDataFromHardware = jsonResponse["Value"];
            var hundredArray = ecgDataFromHardware.split(',');

            rawDataArrayLeadIIThreeLeadMode = rawDataArrayLeadIIThreeLeadMode.concat(hundredArray);
            $scope.ecgLeadTwoArrayData = rawDataArrayLeadIIThreeLeadMode;
            if ($scope.ecgLeadTwoArrayData.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
              //  $scope.ThreeLeadleadTwoLiveDataSliced = $scope.ecgLeadTwoArrayData.slice(1000, 5000);
              //  HigiKioskStorageService.saveSessionData('LeadTwoSixSecondsECGData', $scope.ThreeLeadleadTwoLiveDataSliced);
              if ($scope.goodAmplitude > 25 && $scope.errorCount == 0 && $rootScope.lead2PythonSocketSuccess == false) {
                $scope.ThreeLeadleadTwoLiveDataSliced = $scope.ecgLeadTwoArrayData.slice(1000, 5000)
                HigiKioskStorageService.saveSessionData('LeadTwoSixSecondsECGData', $scope.ThreeLeadleadTwoLiveDataSliced);

                //   console.log("LeadTwoSixSecondsECGData   "+$scope.ThreeLeadleadTwoLiveDataSliced);
                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadTwoLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadTwoLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 1 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadTwoLiveDataSliced = $scope.ecgLeadTwoArrayData.slice(1000, 5000)
                HigiKioskStorageService.saveSessionData('LeadTwoSixSecondsECGData', $scope.ThreeLeadleadTwoLiveDataSliced);
                //  console.log("LeadTwoSixSecondsECGData   "+$scope.ThreeLeadleadTwoLiveDataSliced);
                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadTwoLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadTwoLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 2 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadTwoLiveDataSliced = $scope.ecgLeadTwoArrayData.slice(1000, 5000)
                HigiKioskStorageService.saveSessionData('LeadTwoSixSecondsECGData', $scope.ThreeLeadleadTwoLiveDataSliced);
                // console.log("LeadTwoSixSecondsECGData   "+$scope.ThreeLeadleadTwoLiveDataSliced);
                $scope.goodAmplitude = 0;
                pythonSocket($scope.ThreeLeadleadTwoLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadTwoLiveDataSliced = "";
              }
              $scope.ecgLeadTwoArrayData = "";
              rawDataArrayLeadII = rawDataArrayLeadII.slice(rawDataArrayLeadII.length - 5000, 5000);
              rawDataArrayLeadIIThreeLeadMode = new Array();
            }
            else {
              $scope.ecgLeadTwoArrayData = $scope.ecgLeadTwoArrayData;
            }
          }
          if ($scope.leadToRead == 3) {
            setTimeout(function () {
              if ($scope.lead2CompleteHidden == false) {
                $("#ecgLeadIICompleteDialog").hide();
                $scope.lead2CompleteHidden = true;
              }
            }, 5000);
            var ecgDataFromHardware = jsonResponse["Value"];
            var hundredArray = ecgDataFromHardware.split(',');

            rawDataArrayLeadIIIThreeLeadMode = rawDataArrayLeadIIIThreeLeadMode.concat(hundredArray);
            $scope.ecgLeadThreeArrayData = rawDataArrayLeadIIIThreeLeadMode;
            if ($scope.ecgLeadThreeArrayData.length == 5000 && ($rootScope.StopLEGHandDetection == false || $rootScope.recordingOrRegretComplete == false)) {
              //   $scope.ThreeLeadleadThreeLiveDataSliced = $scope.ecgLeadThreeArrayData.slice(1000, 5000);
              //    HigiKioskStorageService.saveSessionData('LeadThreeSixSecondsECGData', $scope.ThreeLeadleadThreeLiveDataSliced);
              if ($scope.goodAmplitude > 25 && $scope.errorCount == 0 && $rootScope.lead3PythonSocketSuccess == false) {
                $scope.ThreeLeadleadThreeLiveDataSliced = $scope.ecgLeadThreeArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadThreeSixSecondsECGData', $scope.ThreeLeadleadThreeLiveDataSliced);
                //     console.log("LeadThreeSixSecondsECGData   "+$scope.ThreeLeadleadThreeLiveDataSliced);
                $scope.goodAmplitude = 0;
                $scope.gotResponseFromZugECGLead3 = true;
                pythonSocket($scope.ThreeLeadleadThreeLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadThreeLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 1 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadThreeLiveDataSliced = $scope.ecgLeadThreeArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadThreeSixSecondsECGData', $scope.ThreeLeadleadThreeLiveDataSliced);
                //                console.log("LeadThreeSixSecondsECGData   "+$scope.ThreeLeadleadThreeLiveDataSliced);

                $scope.goodAmplitude = 0;
                $scope.gotResponseFromZugECGLead3 = true;
                pythonSocket($scope.ThreeLeadleadThreeLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadThreeLiveDataSliced = "";
              }
              else if ($scope.goodAmplitude > 25 && $scope.errorCount == 2 && $scope.errorOccured == true) {
                $scope.ThreeLeadleadThreeLiveDataSliced = $scope.ecgLeadThreeArrayData.slice(1000, 5000);
                HigiKioskStorageService.saveSessionData('LeadThreeSixSecondsECGData', $scope.ThreeLeadleadThreeLiveDataSliced);
                //       console.log("LeadThreeSixSecondsECGData   "+$scope.ThreeLeadleadThreeLiveDataSliced);

                $scope.goodAmplitude = 0;
                $scope.gotResponseFromZugECGLead3 = true;
                pythonSocket($scope.ThreeLeadleadThreeLiveDataSliced.join(), $scope.leadToRead);
                $scope.ThreeLeadleadThreeLiveDataSliced = "";
              }
              $scope.ecgLeadArrayData = "";
              rawDataArrayLeadIII = rawDataArrayLeadIII.slice(rawDataArrayLeadIII.length - 5000, 5000);
              rawDataArrayLeadIIIThreeLeadMode = new Array();
            }
            else {
              $scope.ecgLeadThreeArrayData = $scope.ecgLeadThreeArrayData;
            }
          }
          if ($scope.GraphInitalizeExecuted == false) {
            execute_graph_three_lead();
            $scope.GraphInitalizeExecuted = true;
          } else {
            insertFreshNewDatapointsFromHardwareThreeLead(ecgDataFromHardware);
          }
        }
      }
    }
  }
  $scope.stopECGReading = function (response) {
    console.log("ECG stopped now calling leg off command for switch");
    $scope.ekgStopStatus = response.Value;
    JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
    /*
    // Handling 45 sec delay to get more data for Uvarani development purpose - ecg analysis starts here
    console.log("started 45 sec time delay for ecg data");
    $timeout(function () {
      JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
    }, 45000);
    // Handling 45 sec delay to get more data for Uvarani development purpose - ecg analysis ends here
    */
  }
  $scope.ecgOff = function (response) {
    console.log("ecgoff called");
    console.log(response);
    $("#ZugEcgRegretMessage").hide();
    $("#ecgLeadCompleteDialog").hide();
    $scope.ekgStopStatus = response.ecgOFFStatus;
    if ($rootScope.zugECGDataReadingComplete == false) {
      $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
      if ($scope.mode == "bpw") {
        var mode = "bpw";
        var currenttest = "ECG";
        var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
        $("#ZugEcgRegretMessage").hide();
        if ($rootScope.ecgPoorResult) {
          window.location = nextTestPath;
        }

      } else if ($rootScope.selectedVital.length > 1) {
        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
        $scope.nextSlide = nextTestPath;
        $timeout(function () {
          $("#ZugEcgRegretMessage").hide();
          window.location = $scope.nextSlide;
        }, 500);
      } else {
        $("#ZugEcgRegretMessage").hide();
        window.location.href = "#/finish/forward";
      }
    }
  }
  $scope.ECGLegOFFStatusCallbackFunction = function (response) {
	$scope.legOFFStatus = response.ecgLegOFFStatus;
    console.log("legoffcallback received step 2 " + $scope.legOFFStatus);
    //JkioskService.callZugECGSwitchAbortFunction($scope.ecgOff);
    $("#ZugEcgRegretMessage").hide();
    $("#ecgLeadCompleteDialog").hide();
    $("#ecgTestSkippedMessage").hide();
    if ($rootScope.zugECGDataReadingComplete == false) {
      $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
      if ($scope.mode == "bpw") {
            var absUrl = $location.absUrl();
            var url = absUrl.split("#");
            if(url[1] == "/zugecginstruction/forward" || url[1] == "/zugecgprogression/forward"){
              var mode = "bpw";
              var currenttest = "ECG";
              var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
              if ($rootScope.ecgPoorResult) {
                $timeout(function () {
                   window.location = nextTestPath;
                }, 500);
            }  
        }
      } else if ($rootScope.selectedVital.length > 1) {
          var absUrl = $location.absUrl();
          var url = absUrl.split("#");
          if(url[1] == "/zugecginstruction/forward" || url[1] == "/zugecgprogression/forward"){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;
            $timeout(function () {
              window.location = nextTestPath;
            }, 500);
          }       
      } else {
        $timeout(function () {
          var absUrl = $location.absUrl();
          var url = absUrl.split("#");
          if(url[1] == "/zugecginstruction/forward" || url[1] == "/zugecgprogression/forward"){
           window.location = "#/finish/forward";
          }
        }, 500);
      }
    }
  };

  $scope.ZugThreeLeadModeLeadICompleted = function () {
    if ($scope.leadMode == 3) {
      if ($scope.leadToRead == 1) {
        $scope.leadOneStatusResult = "Normal";
        $scope.promise3 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[8].filename], $scope);
        $scope.leadToRead = $scope.leadToRead + 1;
        $("#ecgLeadICompleteDialog").show();
        HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead1', $scope.leadOneStatusResult);
        JkioskService.callZugECGHandDetetectFunction($scope.callbackOfHandDetection, $scope.zugLiveDataCallBack, $scope.leadMode, $scope.leadToRead, $scope.zugValidationResultsCallback, $scope.ZugECGBPMResultsCallBack, $scope.ZugECGReadAbortCompleteCallbackFunction, $scope.ZugECGBadReadAbortCompleteCallbackFunction, $scope.performTimerAbortResponseCallBack, $scope.amplitudeLevelResponseCallBack, $scope.sixLeadLiveDataCallBack);
        setTimeout(function () {
          if ($scope.lead1CompleteHidden == false) {
            $("#ecgLeadICompleteDialog").hide();
            $scope.lead1CompleteHidden = true;
          }
        }, 10000);
        $scope.leadSwitching = true;
        if (document.getElementById('current_graph_lead_status')) {
          document.getElementById('current_graph_lead_status').innerHTML = 'Initializing Lead II';
        }
      }

    }
  }

  $scope.ZugThreeLeadModeLeadIICompleted = function () {
    if ($scope.leadMode == 3 && $rootScope.secondLeadValidation == true && $scope.secondLeadHeartRateLessThanThirty == false) {
      $scope.leadTwoStatusResult = "Normal";
    }
    else if ($scope.secondLeadHeartRateLessThanThirty == true) {
      $scope.leadTwoStatusResult = "High Pulse";
    }
    else {
      $scope.leadTwoStatusResult = "Low Pulse";
    }

    if ($scope.leadMode == 3) {
      if ($scope.leadToRead == 2) {
        $scope.promise3 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[9].filename], $scope);
        $scope.leadToRead = $scope.leadToRead + 1;
        $scope.goodECGPQRSCount = 0;
        $scope.badECGPQRSCount = 0;
        $scope.leadSwitching = true;
        $("#ecgLeadIICompleteDialog").show();
        JkioskService.callZugECGHandDetetectFunction($scope.callbackOfHandDetection, $scope.zugLiveDataCallBack, $scope.leadMode, $scope.leadToRead, $scope.zugValidationResultsCallback, $scope.ZugECGBPMResultsCallBack, $scope.ZugECGReadAbortCompleteCallbackFunction, $scope.ZugECGBadReadAbortCompleteCallbackFunction, $scope.performTimerAbortResponseCallBack, $scope.amplitudeLevelResponseCallBack, $scope.sixLeadLiveDataCallBack);
        HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead2', $scope.leadTwoStatusResult);
        setTimeout(function () {
          if ($scope.lead2CompleteHidden == false) {
            $("#ecgLeadIICompleteDialog").hide();
            $scope.lead2CompleteHidden = true;
          }
        }, 10000);
        if (document.getElementById('current_graph_lead_status')) {
          document.getElementById('current_graph_lead_status').innerHTML = 'Initializing Lead III';
        }
      }
    }
  }

  $scope.ZugThreeLeadModeLeadIIICompleted = function () {
    clearInterval($scope.handsKeptInterval);
    $rootScope.StopLEGHandDetection = true;
    $rootScope.recordingOrRegretComplete = true;
    $rootScope.zugECGDataReadingComplete = true;
    if ($scope.leadMode == 3) {
      console.log("clearing timers in 3 lead");
      clearTimeout($scope.ECGTimeout);
      clearInterval($scope.handsKeptInterval);
      $scope.leadThreeStatusResult = "Normal";
      JkioskService.callZugECGemergencyStopFunction($scope.stopECGReading);
      $("#ecgLeadIIICompleteDialog").show();
      HigiKioskStorageService.saveSessionData('zugEcgValidationResultforLead3', $scope.leadThreeStatusResult);
      clearInterval($scope.handsKeptInterval);
      HigiKioskStorageService.saveSessionData('zugECGDataReadingComplete', true);
      setTimeout(function () {
        $('#ecgLeadIIICompleteDialog').hide();
      }, 3000);
      $('#ecgLeadIICompleteDialog').hide();
      $('#ecgLeadICompleteDialog').hide();
      setTimeout(function () {
        window.location = $scope.secondNextSlide;
      }, 3000);
      $timeout(function () {
        if ($scope.ekgStopStatus == false) {
          console.log("ECG Stop did not responded in stopECGwithoutComplete");
          JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
          $timeout(function () {
            $("#ZugEcgRegretMessage").hide();
            $("#ecgLeadCompleteDialog").hide();
            $("#ecgTestSkippedMessage").hide();
            if ($rootScope.zugECGDataReadingComplete == false) {
              $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
              if ($scope.mode == "bpw") {
                var mode = "bpw";
                var currenttest = "ECG";
                var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
                if ($rootScope.ecgPoorResult) {
                  $timeout(function () {
                    window.location = nextTestPath;
                  }, 500);
                }
              } else if ($rootScope.selectedVital.length > 1) {
                var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                $scope.nextSlide = nextTestPath;
                $timeout(function () {
                  window.location = $scope.nextSlide;
                }, 500);
              } else {
                $timeout(function () {
                  window.location.href = "#/finish/forward";
                }, 500);

              }
            }
          }, 7000);
        }
        else if ($scope.legOFFStatus == false) {
          console.log("Switch did not responded in stopECGwithoutComplete");
          $("#ZugEcgRegretMessage").hide();
          $("#ecgLeadCompleteDialog").hide();
          if ($rootScope.zugECGDataReadingComplete == false) {
            $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
            if ($scope.mode == "bpw") {
              var mode = "bpw";
              var currenttest = "ECG";
              var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
              if ($rootScope.ecgPoorResult) {
                $timeout(function () {
                  window.location = nextTestPath;
                }, 500);

              }
            } else if ($rootScope.selectedVital.length > 1) {
              var nextTestPath = HigiKioskFlow.UserSelectNextTest();
              $scope.nextSlide = nextTestPath;
              $timeout(function () {
                window.location = $scope.nextSlide;
              }, 500);
            } else {
              $timeout(function () {
                window.location.href = "#/finish/forward";
              }, 500);

            }
          }
        }
      }, 10000);
    }
    else if ($scope.leadMode == 6) {
      console.log("clearing timers in 6 lead");
      clearTimeout($scope.ECGTimeout);
      clearInterval($scope.handsKeptInterval);
      if ($rootScope.secondLeadValidation == true && $rootScope.secondLeadHeartRateLessThanThirty == false) {
        $scope.leadTwoStatusResult = "Normal";
      }
      else if ($rootScope.secondLeadHeartRateLessThanThirty == true) {
        $scope.leadTwoStatusResult = "High Pulse";
      }
      else {
        $scope.leadTwoStatusResult = "Low Pulse";
      }
      HigiKioskStorageService.saveSessionData('SixLeadleadTwoStatusResult', $scope.leadTwoStatusResult);
      JkioskService.callZugECGemergencyStopFunction($scope.stopECGReading);
      clearInterval($scope.handsKeptInterval);
      HigiKioskStorageService.saveSessionData('zugECGDataReadingComplete', true);
      console.log("Hiding ecgLeadCompleteDialog");
      setTimeout(function () {
        window.location = $scope.secondNextSlide;
      }, 3000);
      $('#ecgLeadIIICompleteDialog').hide();
      $('#ecgLeadIICompleteDialog').hide();
      $('#ecgLeadICompleteDialog').hide();
      $timeout(function () {
        if ($scope.ekgStopStatus == false) {
          console.log("ECG Stop did not responded in stopECGwithoutComplete");
          JkioskService.callZugECGLegOFFStatusFunction($scope.ECGLegOFFStatusCallbackFunction);
          $timeout(function () {
            $("#ZugEcgRegretMessage").hide();
            $("#ecgLeadCompleteDialog").hide();
            if ($rootScope.zugECGDataReadingComplete == false) {
              $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
              if ($scope.mode == "bpw") {
                var mode = "bpw";
                var currenttest = "ECG";
                var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
                if ($rootScope.ecgPoorResult) {
                  $timeout(function () {
                    window.location = nextTestPath;
                  }, 500);

                }

              } else if ($rootScope.selectedVital.length > 1) {
                var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                $scope.nextSlide = nextTestPath;
                $timeout(function () {
                  window.location = $scope.nextSlide;
                }, 500);
              } else {
                $timeout(function () {
                  window.location.href = "#/finish/forward";
                }, 500);

              }
            }
          }, 7000);
        }
        else if ($scope.legOFFStatus == false) {
          console.log("Switch did not responded in stopECGwithoutComplete");
          $("#ZugEcgRegretMessage").hide();
          $("#ecgLeadCompleteDialog").hide();
          if ($rootScope.zugECGDataReadingComplete == false) {
            $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
            if ($scope.mode == "bpw") {
              var mode = "bpw";
              var currenttest = "ECG";
              var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
              if ($rootScope.ecgPoorResult) {
                $timeout(function () {
                  window.location = nextTestPath;
                }, 500);

              }
            } else if ($rootScope.selectedVital.length > 1) {
              var nextTestPath = HigiKioskFlow.UserSelectNextTest();
              $scope.nextSlide = nextTestPath;
              $timeout(function () {
                window.location = $scope.nextSlide;
              }, 500);
            } else {
              $timeout(function () {
                window.location.href = "#/finish/forward";
              }, 500);

            }
          }
        }
      }, 10000);
    }
  }

  $rootScope.StopLEGHandDetectionCheck = function () {
    clearInterval($scope.handsKeptInterval);
  }
  $scope.ZugECGBPMResultsCallBack = function (jsonResponse) {
    if ($rootScope.ZugECGEmergencySkipClicked == true || $rootScope.ecgPoorResult == true || $rootScope.zugECGDataReadingComplete == true) { return; }
    else {
      var myJSON = jsonResponse["Value"];
      if (myJSON != undefined & myJSON < 300 & myJSON >= 15 & $scope.amplitudeLowDetected == false) {
        $scope.currentGuid = guid();
      }
    }
  }
  $scope.init = function () {
    $rootScope.showLoadScreen = false;
    $rootScope.showEcgLeadMode = false;
    $scope.ECGLead1 = "zugEcg3.ecglead1";
    $scope.ECGLead2 = "zugEcg3.ecglead2";
    $scope.ECGLead3 = "zugEcg3.ecglead3";
    $scope.cc = 0;
    $scope.ekgStopStatus = false;
    $scope.errorCount = 0;
    $scope.noPRInterval = false;
    $scope.noQTcInterval = false;
    $scope.noQRSDuration = false;
    $scope.handDetected = false;
    $scope.noHeartRate = false;
    $scope.errorOccured = false;
    $scope.LeadOnesixSecondsECGData = "";
    $scope.LeadTwosixSecondsECGData = "";
    $scope.LeadThreesixSecondsECGData = "";
    $rootScope.showEcgLegMessage = false;
    $rootScope.showEcgHandMessage = false;
    $scope.ecgLeadOneArrayData = "";
    $scope.ecgLeadTwoArrayData = "";
    $scope.ecgLeadThreeArrayData = "";
    $scope.ecgLeadOneArrayDataSixLead = "";
    $scope.ecgLeadTwoArrayDataSixLead = "";
    $scope.ecgLeadThreeArrayDataSixLead = "";
    $scope.ecgLeadFourArrayDataSixLead = "";
    $scope.ecgLeadFiveArrayDataSixLead = "";
    $scope.ecgLeadSixArrayDataSixLead = "";
    $scope.filteredSixLeadModeLeadOneData = "";
    $scope.filteredSixLeadModeLeadTwoData = "";
    $scope.channel2array = "";
    $rootScope.zugECGBadAbortResponse = false;
    rawDataArrayLeadI = new Array();
    rawDataArrayLeadII = new Array();
    $rootScope.showNormalMessage = true;
    $rootScope.lead1PythonSocketSuccess = false;
    $rootScope.lead2PythonSocketSuccess = false;
    $rootScope.lead3PythonSocketSuccess = false;
    $rootScope.lead4PythonSocketSuccess = false;
    $rootScope.lead5PythonSocketSuccess = false;
    $rootScope.lead6PythonSocketSuccess = false;
    $rootScope.zugECGDataReadingComplete = false;
    $rootScope.ecgPoorResult = false;
    $scope.filterRequestFromLiveDatasent = false;
    $rootScope.successCount = 0;
    $scope.responseFromZugECG = false;
    $scope.SixLeadModeLeadOneIndexsent = false;
    $scope.SixLeadModeLeadTwoIndexsent = false;
    $scope.lead1CompleteHidden = false;
    $scope.lead2CompleteHidden = false;
    $scope.LegMessageDisplayed = false;
    $scope.HandMessageDisplayed = false;
    $rootScope.secondLeadValidation = false;
    $scope.leadEightLiveDataSlicedSixLead = 0;
    $scope.leadNineLiveDataSlicedSixLead = 0;
    $scope.leadOneLiveIndexDataSlicedSixLead = 0;
    $scope.leadTwoLiveIndexDataSlicedSixLead = 0;
    $scope.leadSixLiveDataSlicedSixLead = 0;
    $scope.leadFiveLiveDataSlicedSixLead = 0;
    $scope.leadFourLiveDataSlicedSixLead = 0;
    $scope.leadThreeLiveDataSlicedSixLead = 0;
    $scope.leadTwoLiveDataSlicedSixLead = 0;
    $scope.leadOneLiveDataSlicedSixLead = 0;
    $scope.leadOneslicedSixLead = 0;
    $scope.ThreeLeadleadOneLiveDataSliced = 0;
    $scope.ThreeLeadleadTwoLiveDataSliced = 0;
    $scope.ThreeLeadleadThreeLiveDataSliced = 0;
    if ($rootScope.higiTopNavHidden) {
      $rootScope.higiTopNavHidden = false;
    }
    $("#RestartModal").hide();
    $scope.gotResponseFromZugECGLead3 = false;
    $rootScope.ZugECGEmergencySkipClicked = false;
    $rootScope.showECGEmergencyStopButton = true;
    $rootScope.showEcgSlider = false;
    $rootScope.stopECGProgress = $scope.stopECGwithoutComplete;
    $rootScope.StopLEGHandDetection = false;
    $scope.amplitudeLowDetected = false;
    $scope.regretComplete = false;
    $rootScope.recordingOrRegretComplete = false;
    $scope.goodAmplitude = 0;
    $scope.emergencyStopStatus = false;
    $rootScope.secondLeadHeartRateLessThanThirty = false;
    $rootScope.lowpulse = false;
    $rootScope.highpulse = false;
    $scope.stableCount = false;
    $scope.initialRun = false;
    $scope.legOFFStatus = false;
    // console.log('1 here');
    $scope.setSlideDirection($routeParams.direction);

    $scope.testmode = HigiKioskStorageService.returnSessionData('current_mode');
    var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgInstructionController', $scope.testmode);
    //var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgInstructionController', $rootScope.mode);
    $scope.ECGTimeout;
    $scope.leadSwitching = false;
    //$rootScope.showExitButton = false;
    $scope.leadMode = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
    $scope.sixleadLeg = false;
    $scope.threeleadleg = false;
    $scope.leadToRead = 1;
    $scope.badAmplitudeCount = 0;
    $scope.goodAmplitudeCount = 0;
    $scope.sentforFilter = false;

    if ($scope.leadMode == 6) {
      $rootScope.legONStatus = true;
    }
    //  console.log('2 here');
    $scope.handsKeptInterval = setInterval(function () {
      if ($scope.currentGuid == $scope.oldGuid && $rootScope.zugECGDataReadingComplete == false && $rootScope.ZugECGEmergencySkipClicked == false && $rootScope.ecgPoorResult == false) {
        if ($scope.leadMode == 3) {
          if ($rootScope.StopLEGHandDetection == false) {
            if ($rootScope.recordingOrRegretComplete == false) {
              var currentURL = window.location;
              currentURL = currentURL.toString();
              if (currentURL.indexOf("#/zugecginstruction") == -1) {
                $scope.goodAmplitude = 0;
                setTimeout(function () {
                  if ($rootScope.legONStatus == true && $scope.currentGuid == $scope.oldGuid) {
                    $rootScope.showEcgLegMessage = false;
                    $scope.playHandInstructionAudio();
                  }
                  else if ($scope.currentGuid == $scope.oldGuid && $rootScope.showEcgLegMessage == false && $scope.LegMessageDisplayed == false) {
                    $rootScope.showNormalMessage = false;
                    $scope.LegMessageDisplayed = true;
                    $rootScope.showEcgLegMessage = true;
                    $scope.promise2 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[5].filename], $scope);

                  }
                }, 2000);
              }
              else {
                setTimeout(function () {
                  $scope.threeleadecgclass = "modal-slide-out-left";
                }, 1700);
                $scope.myVar = true;
                setTimeout(function () {
                  // console.log($rootScope.legONStatus)
                  if ($rootScope.legONStatus == true) {
                    $scope.legimage = false;
                    $scope.handimage = true;
                    // alert("Hands are not in Position 1")
                    // checking
                    $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLab[$scope.audioFiles[4].filename], $scope);                                                                            
                  }
                  else {
                    $scope.handimage = false;
                    $scope.legimage = true;
                    $scope.promise2 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[5].filename], $scope);
                  }
                }, 3000);
              }
            }
          }
        }
        else if ($scope.leadMode == 6) {
          $rootScope.legONStatus = true;
          if ($rootScope.recordingOrRegretComplete == false && $rootScope.StopLEGHandDetection == false) {
            var currentURL = window.location;
            currentURL = currentURL.toString();

            if (currentURL.indexOf("#/zugecginstruction") == -1 && $scope.currentGuid == $scope.oldGuid) {
              $scope.playHandInstructionAudio();
            }
            else {
              setTimeout(function () {
                $scope.threeleadecgclass = "modal-slide-out-left";
              }, 1700);
              $scope.myVar = true;
              setTimeout(function () {
                $scope.handimage = true;
                // $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[4].filename], $scope);
              }, 3000);
            }
          }
        }
        else {
        }
      }
      $scope.oldGuid = $scope.currentGuid;
    }, 10000);
    // console.log('3 here');
    $scope.leadToRead = 1;
    $scope.instructionExecution();
    $scope.nextSlide = links.next.link;
    $scope.secondNextSlide = links.secondnext.link;
    $scope.skipNext = links.skipNext.link;
  }

  $scope.bmcHandReadyPromise = $q.defer();
  $scope.bmcInstructionAnimationOneReady = $q.defer();
  $scope.bmcInstructionAnimationTwoReady = $q.defer();
  $scope.threeleadecgInstructionAnimationOneReady = $q.defer();
  $scope.threeleadecgInstructionAnimationTwoReady = $q.defer();
  $scope.threeleadecgInstructionAnimationThreeReady = $q.defer();
  $scope.bmcgaugeready = $q.defer();

  if ($scope.leadMode == 3) {
    $scope.animationsReady = $q.all([$scope.threeleadecgInstructionAnimationOneReady.promise, $scope.threeleadecgInstructionAnimationTwoReady.promise, $scope.threeleadecgInstructionAnimationThreeReady.promise]);
  }
  else {
    $scope.animationsReady = $q.all([$scope.threeleadecgInstructionAnimationOneReady.promise, $scope.threeleadecgInstructionAnimationTwoReady.promise, $scope.threeleadecgInstructionAnimationThreeReady.promise]);
  }

  $scope.animationsReady.then(function () {
    $scope.init();
  });

  var liveChart, liveChartLeadI, liveChartLeadII, liveChartLeadIII, liveChartLeadAVR, liveChartLeadAVF, liveChartLeadAVL;

  function execute_graph() {

    var updateInterval = 100;
    var updateIntervalnew = 100;

    liveChartLeadI = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_leadI"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "1000",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'one',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });

    liveChartLeadII = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_leadII"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "1000",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'two',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });
    liveChartLeadIII = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_leadIII"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "0",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'three',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });
    liveChartLeadAVR = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_avr"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "0",
      max: "3000",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'four',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });
    liveChartLeadAVL = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_avl"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "1000",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'five',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });
    liveChartLeadAVF = new Rickshaw.Graph({
      element: document.querySelector("#live_graph_slot_avf"),
      width: "650",
      height: "115",
      renderer: "line",
      min: "1000",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'six',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });

  }

  var per_slot_push_count = 100;
  var current_slot = 0;

  function insertFreshNewDatapointsFromHardware(lead, data) {

    if (lead == 1) {
      var dataFromHardwareArray = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {

        let singleDataPointInNewArrivedSlot = {
          one: dataFromHardwareArray[i]
        };
        liveChartLeadI.series.addData(singleDataPointInNewArrivedSlot);
      }
    }

    if (lead == 2) {

      //console.log("got fresh 6 lead data in 2nd lead")
      var dataFromHardwareArrayLeadII = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {

        let singleDataPointInNewArrivedSlotII = {
          two: dataFromHardwareArrayLeadII[i]
        };
        liveChartLeadII.series.addData(singleDataPointInNewArrivedSlotII);
      }
    }

    if (lead == 3) {
      var dataFromHardwareArrayLeadIII = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {
        let singleDataPointInNewArrivedSlotIII = {
          three: dataFromHardwareArrayLeadIII[i]
        };
        liveChartLeadIII.series.addData(singleDataPointInNewArrivedSlotIII);
      }
    }

    if (lead == 4) {
      var dataFromHardwareArrayLeadAVR = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {
        let singleDataPointInNewArrivedSlotAVR = {
          four: dataFromHardwareArrayLeadAVR[i]
        };
        liveChartLeadAVR.series.addData(singleDataPointInNewArrivedSlotAVR);
      }
    }

    if (lead == 5) {
      var dataFromHardwareArrayLeadAVL = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {
        let singleDataPointInNewArrivedSlotAVL = {
          five: dataFromHardwareArrayLeadAVL[i]
        };
        liveChartLeadAVL.series.addData(singleDataPointInNewArrivedSlotAVL);
      }
    }

    if (lead == 6) {
      var dataFromHardwareArrayLeadAVF = data.split(',');
      for (var i = 0; i < per_slot_push_count; i++) {
        let singleDataPointInNewArrivedSlotAVF = {
          six: dataFromHardwareArrayLeadAVF[i]
        };
        liveChartLeadAVF.series.addData(singleDataPointInNewArrivedSlotAVF);
      }
    }
    liveChartLeadI.render();
    liveChartLeadII.render();
    liveChartLeadIII.render();
    liveChartLeadAVR.render();
    liveChartLeadAVL.render();
    liveChartLeadAVF.render();
  }
  function execute_graph_three_lead() {

    var updateInterval = 100;
    var updateIntervalnew = 100;

    liveChart = new Rickshaw.Graph({
      element: document.querySelector("#live_chart_graph_area"),
      width: "650",
      height: "145",
      renderer: "line",
      min: "1000",
      max: "3500",
      series: new Rickshaw.Series.FixedDuration([{
        name: 'one',
        color: '#000000'
      }], undefined, {
        timeInterval: updateInterval,
        maxDataPoints: 900
      })
    });

  }
  function insertFreshNewDatapointsFromHardwareThreeLead(dataFromHardware) {
    var dataFromHardwareArray = dataFromHardware.split(',');

    for (var i = 0; i < per_slot_push_count; i++) {

      let singleDataPointInNewArrivedSlot = {
        one: dataFromHardwareArray[i]
      };

      liveChart.series.addData(singleDataPointInNewArrivedSlot);
    }

    liveChart.render();
  }

  $scope.playHandInstructionAudio = function () {
    // $rootScope.showNormalMessage = false;
    // alert("here is the ecg audio issue")
    $scope.HandMessageDisplayed = true;
    $rootScope.showEcgHandMessage = true;

    // alert("Hands are not in Position 2")
    $scope.promise1 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[4].filename], $scope);

    setTimeout(function () {
      if ($scope.HandMessageDisplayed == true) {
        $rootScope.showEcgHandMessage = false;
        $scope.HandMessageDisplayed = false;
        if ($scope.LegMessageDisplayed == true) {
          $scope.LegMessageDisplayed = false;
        }
      }
    }, 6000);
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  var leadonedatastring = " ";
  var leadtwodatastring = " ";
  var leadthreedatastring = " ";

  //for replacing All single quotes data coming from pythonFilter into String
  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }

  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return total / grades.length;
  }

  var RRIntervalArrayDiff = [];
  $scope.checkGraphAlignment = function (leadMode) {
    var alignLeadTwo = false;
    var alignLeadOne = false;
    var leadmode = leadMode;
    var RPeakDataofLead1 = HigiKioskStorageService.returnSessionData('RPeakDataLead1');
    var RPeakDataofLead2 = HigiKioskStorageService.returnSessionData('RPeakDataLead2');
    var diff = 0.0;
    if (parseFloat(RPeakDataofLead1[0]) < parseFloat(RPeakDataofLead2[0])) {
      console.log("Align Lead 2");
      alignLeadTwo = true;
      diff = parseFloat(RPeakDataofLead2[0]) - parseFloat(RPeakDataofLead1[0]);
    }
    else {
      console.log("Align Lead 1");
      alignLeadOne = true;
      diff = parseFloat(RPeakDataofLead1[0]) - parseFloat(RPeakDataofLead2[0]);
    }

    if (diff <= 1000 && diff != undefined) {
      $rootScope.secondLeadValidation = true;
      var sixone = HigiKioskStorageService.returnSessionData('sixleadZugECGlead1SmoothGraph');
      var sixtwo = HigiKioskStorageService.returnSessionData('sixleadZugECGlead2SmoothGraph');
      var arrayValue = [];
      var arrayValue1 = [];
      var arrayValue2 = [];
      var arrayValue3 = [];
      var PFDataArray1 = [];
      var PFDataArray2 = [];
      for (var i = 0; i < sixtwo.length; i++) {
        PFDataArray1[i] = sixtwo[i];
        PFDataArray2[i] = sixone[i];
      }
      if (alignLeadTwo == true) {
        PFDataArray1 = PFDataArray1.splice(diff, PFDataArray1.length);
      }
      else if (alignLeadOne == true) {
        PFDataArray2 = PFDataArray2.splice(diff, PFDataArray2.length);
      }
      PFDataArray1 = PFDataArray1.splice(0, 3000);
      PFDataArray2 = PFDataArray2.splice(0, 3000);
      var leadOneData = PFDataArray2.toString();
      var leadTwoData = PFDataArray1.toString();
      HigiKioskStorageService.saveSessionData('sixleadZugECGlead1SmoothGraph', leadOneData.split(","));
      HigiKioskStorageService.saveSessionData('sixleadZugECGlead2SmoothGraph', leadTwoData.split(","));
      var sixtwo = HigiKioskStorageService.returnSessionData('sixleadZugECGlead2SmoothGraph');
      var sixone = HigiKioskStorageService.returnSessionData('sixleadZugECGlead1SmoothGraph');
      for (var i = 0; i < sixone.length; i++) {
        arrayValue[i] = ((sixtwo[i]) - (sixone[i]));
        arrayValue1[i] = -0.5 * ((parseInt(sixone[i])) + (parseInt(sixtwo[i])));
        arrayValue2[i] = ((sixone[i]) - (0.5 * (sixtwo[i])));
        arrayValue3[i] = ((sixtwo[i]) - (0.5 * (sixone[i])));
      }

      HigiKioskStorageService.saveSessionData('sixleadZugECGlead3SmoothGraph', arrayValue);
      HigiKioskStorageService.saveSessionData('sixleadZugECGlead4SmoothGraph', arrayValue1);
      HigiKioskStorageService.saveSessionData('sixleadZugECGlead5SmoothGraph', arrayValue2);
      HigiKioskStorageService.saveSessionData('sixleadZugECGlead6SmoothGraph', arrayValue3);
    }
    else {
      $rootScope.secondLeadValidation = false;
    }
    if (leadmode == 6) {
      console.log("Check align mode 6")
      $scope.ZugThreeLeadModeLeadIIICompleted();
      $("#ecgLeadCompleteDialog").show();
    }
  }
  $scope.stablecount = function (RRIntervalArrayDiff, leadmode) {
    var stableRRIntervalValues = [];
    var avgRRInterval = 0.0;
    if (RRIntervalArrayDiff.length == 0) {
      return 0;
    }
    var dataList = RRIntervalArrayDiff;
    var min = dataList[dataList.length - 1];
    var max = dataList[dataList.length - 1];
    var stableCount = 0;
    var leadmode = leadmode;
    for (var i = dataList.length - 1; i >= 0; i--) {
      if (dataList[i] < min) {
        min = dataList[i];
      }
      else if (dataList[i] > max) {
        max = dataList[i];
      }

      var delta = max - min;
      var pctDelta = delta / min * 100;
      var isStable = (pctDelta < 30);
      if (isStable) {
        stableCount++;
        stableRRIntervalValues.push(dataList[i]);

      }
    }
    //  console.log(stableRRIntervalValues);
    /*if (stableRRIntervalValues.length >= 2) {
      var total = 0;
      for (var i = 0; i < stableRRIntervalValues.length; i++) {
        total += stableRRIntervalValues[i];
      }
      avgRRInterval = total / stableRRIntervalValues.length;
    }
    else {
      avgRRInterval = stableRRIntervalValues[0];
    }*/
    if (stableCount > 2) {
      console.log("Sucessfully got stable ecg data");
      $scope.stableCount = true;
      if (leadmode == 3) {
        $rootScope.secondLeadValidation = true;
      }
    }
    else {
      console.log("Signal strength is low. Unable to process the ECG Graph. Please redo the test");
      $rootScope.secondLeadValidation = true;
      if (leadMode == 6) {
        console.log("stable count else mode 6")
        $scope.ZugThreeLeadModeLeadIIICompleted();
      }
    }
    RRIntervalArrayDiff = [];
  }


  $scope.FilteredDataForECGCallback = function (jsonResponse) {
    var reading_lead = jsonResponse.reading_lead;
    var reading_lead = parseInt(jsonResponse.reading_lead);
    //console.log("Current lead is" + reading_lead+"Count  "+   $scope.cc);
    //jsonResponse.data = "{'RPEAK': '412,796,1178,1549,1932,2319,2696,3082,3471,3853', 'RR': '764.0,742.0,766.0,774.0,754.0,772.0', 'PR': '228.0,242.0,294.0', 'HR': '109.0,530.96,225.0', 'QRSD': '126.0,90.0,118.0', 'QT': '98.0,96.0,94.0', 'QTC': '228.0,206.0,246.0', 'FDATA': '86,90,95,100,105,111,117,123,129,134,137,139,139,137,134,129,123,117,112,109,107,107,107,108,109,108,106,102,97,93,89,88,89,95,103,113,123,132,138,139,135,125,111,95,77,61,48,39,34,32,34,38,42,46,49,51,52,52,52,52,53,55,57,60,62,65,68,71,75,78,81,83,86,87,88,89,89,89,89,90,92,94,95,96,94,90,84,76,67,59,53,50,52,58,68,80,93,105,115,123,127,129,130,131,133,136,140,144,147,147,143,135,122,106,88,70,55,44,39,39,44,52,61,70,76,80,81,78,74,68,63,59,57,56,58,60,63,67,69,71,71,69,67,63,60,58,57,59,64,73,86,100,117,132,146,157,163,165,163,159,154,151,150,152,157,164,171,177,178,173,162,145,123,98,72,48,29,13,3,-2,-5,-6,-7,-9,-13,-18,-23,-29,-34,-37,-39,-39,-39,-38,-38,-39,-42,-45,-50,-55,-59,-64,-70,-75,-82,-91,-100,-110,-118,-122,-117,-100,-66,-13,60,155,269,396,530,662,783,884,956,993,991,951,874,768,641,501,359,224,103,2,-78,-137,-175,-197,-206,-206,-201,-192,-181,-169,-156,-144,-131,-117,-105,-93,-82,-73,-65,-58,-52,-46,-39,-32,-25,-17,-10,-3,4,9,14,18,22,26,30,34,38,43,47,51,56,61,67,74,81,88,94,99,102,102,100,95,89,81,74,68,64,62,63,66,70,76,82,89,96,103,110,116,121,124,126,126,125,122,119,116,115,115,116,118,121,124,124,123,119,112,104,95,87,81,78,78,81,86,93,99,105,110,113,115,117,120,123,128,134,141,147,151,152,149,143,133,120,107,94,83,75,70,70,72,75,79,81,81,78,73,65,56,47,39,33,30,30,32,36,41,47,54,60,67,74,82,89,95,100,102,101,96,88,77,64,52,41,34,32,34,41,52,64,77,87,95,100,101,99,96,93,92,93,97,104,113,122,132,139,144,145,143,138,129,118,106,93,82,72,64,59,57,58,62,68,75,81,87,92,94,94,93,90,88,86,86,88,92,98,104,109,112,112,108,100,90,78,66,55,46,40,37,37,39,42,46,50,55,61,69,78,89,103,117,131,142,151,155,155,150,143,135,128,125,125,130,139,150,160,168,171,168,159,146,129,110,93,77,66,57,51,46,41,34,25,14,1,-12,-23,-32,-37,-39,-39,-38,-38,-39,-44,-51,-61,-72,-81,-88,-91,-91,-87,-83,-79,-78,-80,-85,-93,-98,-98,-86,-58,-9,61,155,267,394,526,657,775,872,942,977,977,942,874,779,666,540,412,287,173,72,-11,-77,-127,-162,-185,-200,-208,-211,-211,-208,-203,-195,-183,-169,-151,-132,-112,-92,-73,-58,-47,-40,-35,-34,-33,-32,-29,-23,-15,-4,9,21,32,40,44,44,42,39,36,35,38,46,58,73,90,107,121,131,135,134,127,117,106,95,86,80,78,79,82,87,91,95,98,99,100,100,101,103,105,108,110,112,113,111,108,103,97,91,86,82,81,82,85,89,95,101,106,110,112,113,112,111,110,109,110,112,117,124,132,140,148,153,156,156,151,143,131,118,104,91,81,75,73,74,79,86,93,98,101,100,96,89,80,72,66,62,62,65,71,78,84,88,89,87,82,75,67,60,56,55,57,61,66,71,74,75,74,70,65,61,58,57,59,62,66,70,72,73,72,70,68,67,68,71,76,82,87,92,94,94,93,90,88,88,91,97,106,115,123,129,130,127,120,111,101,92,87,86,89,96,104,112,117,118,114,106,95,83,71,63,58,57,59,64,70,76,79,80,79,75,70,66,62,60,60,61,64,68,71,74,77,79,80,82,84,87,90,92,95,96,96,94,92,89,87,86,87,91,98,107,118,130,142,153,162,169,174,177,178,176,171,162,151,136,118,98,75,53,31,11,-6,-18,-27,-31,-32,-31,-29,-26,-24,-24,-26,-31,-39,-49,-61,-73,-84,-93,-100,-104,-105,-105,-104,-105,-108,-114,-121,-128,-130,-122,-101,-61,1,86,193,317,451,587,716,827,914,969,990,975,927,851,751,636,513,388,268,158,61,-20,-85,-133,-166,-187,-197,-199,-196,-190,-183,-174,-166,-157,-148,-139,-130,-120,-110,-101,-93,-85,-78,-71,-64,-56,-46,-35,-23,-11,1,12,21,28,33,36,40,44,50,57,66,76,86,96,103,107,109,108,106,103,101,100,101,103,106,108,108,107,104,99,94,89,85,84,85,88,93,97,101,102,101,97,92,86,82,81,83,89,98,109,119,128,134,136,134,129,121,112,103,96,91,89,90,92,95,98,101,103,106,108,111,114,118,121,123,124,122,117,110,100,90,80,71,67,66,70,77,88,99,109,117,121,121,116,108,97,86,76,68,63,62,64,67,71,74,76,75,71,67,61,57,54,54,56,61,68,75,80,83,83,80,75,68,62,57,56,59,66,76,89,101,113,121,124,124,119,110,101,91,83,77,75,76,79,83,88,92,94,95,94,92,90,89,90,93,98,105,112,120,126,130,132,130,126,120,112,103,94,85,76,69,62,55,50,45,42,41,42,45,50,56,64,72,79,86,90,92,93,92,91,91,91,91,93,94,94,94,91,87,81,75,70,66,65,67,70,76,81,85,87,86,83,79,75,74,76,85,99,117,139,161,181,197,206,210,206,198,185,170,155,139,123,107,90,72,53,32,12,-7,-24,-37,-45,-48,-47,-44,-39,-34,-32,-32,-36,-42,-51,-61,-71,-79,-85,-87,-86,-82,-77,-71,-66,-63,-63,-65,-68,-71,-69,-58,-35,7,69,154,260,382,515,649,775,881,959,1002,1006,969,897,794,670,535,397,265,147,46,-35,-96,-139,-167,-183,-190,-190,-188,-184,-180,-176,-173,-169,-166,-161,-155,-148,-139,-128,-116,-104,-91,-79,-68,-57,-46,-35,-24,-12,0,13,26,39,50,60,68,73,77,81,83,85,88,91,93,95,96,95,92,87,81,75,69,63,60,57,57,57,59,62,65,69,74,81,89,99,110,122,133,142,148,150,147,140,130,119,108,99,94,94,98,105,115,125,134,139,140,137,130,120,109,99,91,85,84,85,88,92,97,100,101,101,98,95,92,89,89,91,96,103,112,121,130,136,139,138,133,125,114,102,91,81,74,71,71,74,79,85,89,92,91,87,79,70,59,48,38,30,24,21,20,21,22,25,27,31,35,41,49,58,70,83,97,109,119,126,128,126,119,108,96,82,70,59,52,48,49,52,59,67,76,85,94,102,110,116,121,124,126,126,124,120,114,108,101,95,92,91,93,98,104,112,118,122,123,118,109,96,81,66,52,42,37,38,44,55,68,81,93,102,106,106,101,93,83,72,62,53,47,43,41,43,46,51,59,68,78,88,98,106,110,111,108,101,90,78,67,57,53,54,61,75,93,114,135,154,170,180,185,185,182,177,171,165,160,156,152,147,142,133,122,109,93,75,58,42,29,19,12,10,11,14,19,23,25,25,21,13,1,-13,-28,-43,-57,-69,-77,-82,-83,-83,-81,-79,-79,-80,-83,-88,-94,-102,-107,-110,-106,-93,-67,-26,33,112,209,323,448,577,702,813,901,959,980,962,906,818,703,572,434,299,175,68,-20,-87,-137,-170,-191,-204,-211,-214,-213,-210,-203,-192,-176,-157,-135,-112,-89,-68,-49,-35,-24,-18,-14,-12,-11,-10,-8,-4,1,7,14,20,26,31,34,36,37,36,34,33,32,33,36,41,48,58,70,82,94,105,112,117,117,114,108,100,94,89,87,90,96,104,114,124,130,133,130,122,110,95,80,66,55,49,49,54,65,79,95,111,126,136,143,145,143,138,130,122,114,108,105,105,108,114,120,127,133,137,138,136,132,126,119,113,108,104,102,101,101,101,101,100,97,94,91,88,86,85,85,85,84,83,80,76,71,65,59,55,53,54,58,63,71,78,84,89,91,90,87,82,76,70,63,58,54,52,50,50,51,52,55,58,62,65,68,70,71,70,68,65,62,59,58,58,60,65,71,78,85,92,98,103,107,110,113,115,118,121,125,130,134,138,141,141,138,133,124,112,97,82,66,52,41,34,32,34,41,52,65,79,92,103,111,116,118,118,116,114,111,109,108,106,104,102,99,95,90,85,79,74,69,65,62,60,59,57,55,53,49,45,39,33,27,21,17,15,17,24,35,50,70,92,115,137,158,174,185,190,191,187,180,172,164,157,152,150,150,152,154,156,155,151,143,132,118,102,85,69,55,45,38,34,32,31,29,24,15,2,-14,-32,-50,-65,-76,-82,-82,-78,-71,-63,-56,-54,-56,-63,-74,-88,-101,-113,-121,-125,-124,-119,-110,-95,-73,-43,-1,56,129,220,327,447,571,694,805,895,956,982,972,926,847,743,621,490,358,232,118,20,-61,-124,-170,-200,-217,-223,-220,-211,-198,-184,-168,-154,-141,-130,-119,-110,-101,-92,-81,-69,-57,-45,-33,-22,-13,-5,1,6,10,15,21,27,34,42,49,55,58,59,57,54,49,46,44,46,51,60,73,87,101,114,123,127,126,119,110,97,85,74,65,61,61,64,71,80,90,100,109,116,121,123,123,120,116,110,103,97,91,87,86,87,91,98,106,114,123,130,135,138,138,136,132,127,122,118,113,110,107,106,106,107,109,111,114,115,116,114,111,106,100,93,88,85,86,90,98,109,120,131,138,140,136,126,111,94,76,59,47,39,37,40,45,52,59,63,65,63,59,54,49,46,45,47,51,57,63,69,72,73,72,70,67,66,66,69,76,84,93,101,106,108,105,98,87,75,63,54,49,48,52,60,70,80,89,95,98,99,98,96,94,94,95,98,102,106,109,111,111,109,106,101,96,92,89,87,86,85,86,87,88,90,92,95,97,99,100,100,99,96,91,86,79,73,67,63,60,57,56,54,53,52,51,51,53,57,64,74,86,100,114,127,138,146,149,149,145,139,132,125,119,115,114,115,119,123,128,132,135,135,133,127,119,109,98,85,73,61,49,38,28,18,8,-3,-14,-25,-36,-46,-56,-65,-71,-77,-80,-82,-84,-84,-84,-84,-84,-84,-85,-87,-90,-95,-101,-109,-115,-118,-114,-99,-68,-17,56,151,266,395,533,669,793,896,970,1010,1011,977,909,814,701,577,450,328,215,115,30,-40,-96,-139,-171,-193,-207,-213,-213,-209,-200,-190,-178,-166,-154,-144,-134,-125,-117,-108,-99,-89,-78,-67,-56,-45,-36,-28,-20,-14,-8,-1,7,17,28,40,54,67,79,88,95,97,96,92,85,78,70,64,60,59,60,64,69,75,82,87,92,95,98,100,103,106,111,116,123,129,135,138,138,134,128,119,109,99,91,88,88,92,100,109,119,126,129,129,123,114,103,92,82,75,73,75,81,91,101,112,121,128,131,132,130,127,122,117,112,108,105,103,102,102,103,104,105,105,105,105,103,101,99,98,97,98,99,101,102,103,102,98,91,82,70,58,46,35,28,25,26,31,39,48,57,64,68,69,67,63,58,53,52,53,59,68,79,91,102,111,115,114,109,100,89,78,68,60,56,55,57,61,66,71,76,80,85,89,95,103,111,121,130,137,142,143,140,134,125,116,106,99,95,94,96,100,105,109,110,108,101,92,80,66,53,42,33,28,27,30,37,46,57,68,79,88,94,97,97,94,88,81,73,66,61,57,55,56,58,63,68,75,83,92,102,112,122,132,140,146,148,147,143,136,127,118,111,106,104,106,110,116,122,128,132,133,131,127,122,116,109,104,98,94,90,85,80,74,66,58,47,36,23,10,-4,-17,-31,-43,-53,-62,-69,-73,-76,-79,-81,-84,-88,-94,-101,-108,-116,-122,-127,-129,-128,-123,-113,-98,-75,-42,3,62,139,231,339,459,583,705,816,905,965,990,977,926,843,734,608,475,344,224,120,35,-30,-78,-112,-136,-153,-167,-178,-188,-195,-199,-199,-194,-183,-168,-150,-131,-114,-99,-88,-82,-78,-76,-74,-70,-63,-54,-41,-27,-13,0,11,18,23,25,27,29,32,38,47,57,69,80,89,96,100,101,99,96,93,90,88,88,88,89,91,92,92,91,90,89,89,89,90,93,97,101,106,111,115,118,121,124,125,126,126,126,124,121,117,112,106,100,95,90,88,87,88,91,95,100,105,109,113,115,116,117,116,114,113,111,109,107,105,104,104,104,105,107,110,114,118,121,123,124,122,118,112,103,93,84,75,68,63,61,61,63,65,68,70,70,69,68,66,64,63,64,65,68,71,74,76,77,77,76,75,74,73,72,72,71,69,67,64,59,55,52,49,50,52,57,63,69,75,80,82,82,80,77,75,73,75,78,84,92,101,108,115,119,121,121,120,118,117,116,116,116,116,115,112,108,103,97,90,84,79,76,74,74,75,76,77,76,75,72,68,65,61,59,59,62,67,74,83,93,104,114,122,129,132,133,131,127,121,114,106,98,91,83,77,70,64,57,49,42,34,28,23,20,21,25,33,44,58,74,90,106,120,131,140,146,151,154,158,162,166,172,177,181,183,183,178,170,158,144,128,111,96,82,70,60,53,48,43,39,35,30,25,20,14,7,0,-8,-17,-26,-34,-41,-48,-52,-54,-55,-55,-54,-54,-55,-59,-65,-74,-85,-96,-108,-119,-126,-130,-129,-120,-101,-70,-25,38,120,219,336,464,598,729,848,945,1011,1040,1029,978,890,774,637,490,343,205,83,-20,-101,-161,-201,-226,-238,-241,-239,-233,-225,-215,-205,-194,-182,-170,-156,-142,-128,-114,-99,-85,-71,-56,-41,-27,-11,4,19,33,46,57,65,70,71,69,63,56,48,40,34,30,30,32,38,46,55,64,72,79,84,87,89,90,91,92,93,95,97,99,102,104,106,107,107,107,107,107,107,107,107,107,106,105,104,101,98,95,91,89,88,88,91,97,106,116,127,139,148,155,158,157,152,144,134,122,112,103,98,96,98,101,106,111,114,116,116,115,112,110,108,108,109,111,112,113,112,108,102,93,84,74,67,63,62,65,71,79,86,92,94,92,86,75,63,49,37,28,23,23,27,35,45,57,67,76,83,86,87,86,83,79,75,70,66,63,60,58,58,60,64,69,76,84,91,98,103,106,107,105,101,97,93,91,91,93,97,101,104,105,104,99,91,82,72,64,60,59,62,70,81,94,107,118,127,132,135,136,135,134,133,132,132,132,131,129,126,120,112,103,93,84,76,71,69,70,74,80,87,86,90,95,100,105,111,117,123,129,134,137,139,139,137,134,129,123,117,112,109,107,107,107,108,109,108,106,102,97,93,89,88,89,95,103,113,123,132,138,139,135,125,111,95,77,61,48,39,34,32,34,38,42,46,49,51,52,52,52,52,53,55,57,60,62,65,68,71,75,78,81,83,86,87,88,89,89,89,89,90,92,94,95,96,94,90,84,76,67,59,53,50,52,58,68,80,93,105,115,123,127,129,130,131,133,136,140,144,147,147,143,135,122,106,88,70,55,44,39,39,44,52,61,70,76,80,81,78,74,68,63,59,57,56,58,60,63,67,69,71,71,69,67,63,60,58,57,59,64,73,86,100,117,132,146,157,163,165,163,159,154,151,150,152,157,164,171,177,178,173,162,145,123,98,72,48,29,13,3,-2,-5,-6,-7,-9,-13,-18,-23,-29,-34,-37,-39,-39,-39,-38,-38,-39,-42,-45,-50,-55,-59,-64,-70,-75,-82,-91,-100,-110,-118,-122,-117,-100,-66,-13,60,155,269,396,530,662,783,884,956,993,991,951,874,768,641,501,359,224,103,2,-78,-137,-175,-197,-206,-206,-201,-192,-181,-169,-156,-144,-131,-117,-105,-93,-82,-73,-65,-58,-52,-46,-39,-32,-25,-17,-10,-3,4,9,14,18,22,26,30,34,38,43,47,51,56,61,67,74,81,88,94,99,102,102,100,95,89,81,74,68,64,62,63,66,70,76,82,89,96,103,110,116,121,124,126,126,125,122,119,116,115,115,116,118,121,124,124,123,119,112,104,95,87,81,78,78,81,86,93,99,105,110,113,115,117,120,123,128,134,141,147,151,152,149,143,133,120,107,94,83,75,70,70,72,75,79,81,81,78,73,65,56,47,39,33,30,30,32,36,41,47,54,60,67,74,82,89,95,100,102,101,96,88,77,64,52,41,34,32,34,41,52,64,77,87,95,100,101,99,96,93,92,93,97,104,113,122,132,139,144,145,143,138,129,118,106,93,82,72,64,59,57,58,62,68,75,81,87,92,94,94,93,90,88,86,86,88,92,98,104,109,112,112,108,100,90,78,66,55,46,40,37,37,39,42,46,50,55,61,69,78,89,103,117,131,142,151,155,155,150,143,135,128,125,125,130,139,150,160,168,171,168,159,146,129,110,93,77,66,57,51,46,41,34,25,14,1,-12,-23,-32,-37,-39,-39,-38,-38,-39,-44,-51,-61,-72,-81,-88,-91,-91,-87,-83,-79,-78,-80,-85,-93,-98,-98,-86,-58,-9,61,155,267,394,526,657,775,872,942,977,977,942,874,779,666,540,412,287,173,72,-11,-77,-127,-162,-185,-200,-208,-211,-211,-208,-203,-195,-183,-169,-151,-132,-112,-92,-73,-58,-47,-40,-35,-34,-33,-32,-29,-23,-15,-4,9,21,32,40,44,44,42,39,36,35,38,46,58,73,90,107,121,131,135,134,127,117,106,95,86,80,78,79,82,87,91,95,98,99,100,100,101,103,105,108,110,112,113,111,108,103,97,91,86,82,81,82,85,89,95,101,106,110,112,113,112,111,110,109,110,112,117,124,132,140,148,153,156,156,151,143,131,118,104,91,81,75,73,74,79,86,93,98,101,100,96,89,80,72,66,62,62,65,71,78,84,88,89,87,82,75,67,60,56,55,57,61,66,71,74,75,74,70,65,61,58,57,59,62,66,70,72,73,72,70,68,67,68,71,76,82,87,92,94,94,93,90,88,88,91,97,106,115,123,129,130,127,120,111,101,92,87,86,89,96,104,112,117,118,114,106,95,83,71,63,58,57,59,64,70,76,79,80,79,75,70,66,62,60,60,61,64,68,71,74,77,79,80,82,84,87,90,92,95,96,96,94,92,89,87,86,87,91,98,107,118,130,142,153,162,169,174,177,178,176,171,162,151,136,118,98,75,53,31,11,-6,-18,-27,-31,-32,-31,-29,-26,-24,-24,-26,-31,-39,-49,-61,-73,-84,-93,-100,-104,-105,-105,-104,-105,-108,-114,-121,-128,-130,-122,-101,-61,1,86,193,317,451,587,716,827,914,969,990,975,927,851,751,636,513,388,268,158,61,-20,-85,-133,-166,-187,-197,-199,-196,-190,-183,-174,-166,-157,-148,-139,-130,-120,-110,-101,-93,-85,-78,-71,-64,-56,-46,-35,-23,-11,1,12,21,28,33,36,40,44,50,57,66,76,86,96,103,107,109,108,106,103,101,100,101,103,106,108,108,107,104,99,94,89,85,84,85,88,93,97,101,102,101,97,92,86,82,81,83,89,98,109,119,128,134,136,134,129,121,112,103,96,91,89,90,92,95,98,101,103,106,108,111,114,118,121,123,124,122,117,110,100,90,80,71,67,66,70,77,88,99,109,117,121,121,116,108,97,86,76,68,63,62,64,67,71,74,76,75,71,67,61,57,54,54,56,61,68,75,80,83,83,80,75,68,62,57,56,59,66,76,89,101,113,121,124,124,119,110,101,91,83,77,75,76,79,83,88,92,94,95,94,92,90,89,90,93,98,105,112,120,126,130,132,130,126,120,112,103,94,85,76,69,62,55,50,45,42,41,42,45,50,56,64,72,79,86,90,92,93,92,91,91,91,91,93,94,94,94,91,87,81,75,70,66,65,67,70,76,81,85,87,86,83,79,75,74,76,85,99,117,139,161,181,197,206,210,206,198,185,170,155,139,123,107,90,72,53,32,12,-7,-24,-37,-45,-48,-47,-44,-39,-34,-32,-32,-36,-42,-51,-61,-71,-79,-85,-87,-86,-82,-77,-71,-66,-63,-63,-65,-68,-71,-69,-58,-35,7,69,154,260,382,515,649,775,881,959,1002,1006,969,897,794,670,535,397,265,147,46,-35,-96,-139,-167,-183,-190,-190,-188,-184,-180,-176,-173,-169,-166,-161,-155,-148,-139,-128,-116,-104,-91,-79,-68,-57,-46,-35,-24,-12,0,13,26,39,50,60,68,73,77,81,83,85,88,91,93,95,96,95,92,87,81,75,69,63,60,57,57,57,59,62,65,69,74,81,89,99,110,122,133,142,148,150,147,140,130,119,108,99,94,94,98,105,115,125,134,139,140,137,130,120,109,99,91,85,84,85,88,92,97,100,101,101,98,95,92,89,89,91,96,103,112,121,130,136,139,138,133,125,114,102,91,81,74,71,71,74,79,85,89,92,91,87,79,70,59,48,38,30,24,21,20,21,22,25,27,31,35,41,49,58,70,83,97,109,119,126,128,126,119,108,96,82,70,59,52,48,49,52,59,67,76,85,94,102,110,116,121,124,126,126,124,120,114,108,101,95,92,91,93,98,104,112,118,122,123,118,109,96,81,66,52,42,37,38,44,55,68,81,93,102,106,106,101,93,83,72,62,53,47,43,41,43,46,51,59,68,78,88,98,106,110,111,108,101,90,78,67,57,53,54,61,75,93,114,135,154,170,180,185,185,182,177,171,165,160,156,152,147,142,133,122,109,93,75,58,42,29,19,12,10,11,14,19,23,25,25,21,13,1,-13,-28,-43,-57,-69,-77,-82,-83,-83,-81,-79,-79,-80,-83,-88,-94,-102,-107,-110,-106,-93,-67,-26,33,112,209,323,448,577,702,813,901,959,980,962,906,818,703,572,434,299,175,68,-20,-87,-137,-170,-191,-204,-211,-214,-213,-210,-203,-192,-176,-157,-135,-112,-89,-68,-49,-35,-24,-18,-14,-12,-11,-10,-8,-4,1,7,14,20,26,31,34,36,37,36,34,33,32,33,36,41,48,58,70,82,94,105,112,117,117,114,108,100,94,89,87,90,96,104,114,124,130,133,130,122,110,95,80,66,55,49,49,54,65,79,95,111,126,136,143,145,143,138,130,122,114,108,105,105,108,114,120,127,133,137,138,136,132,126,119,113,108,104,102,101,101,101,101,100,97,94,91,88,86,85,85,85,84,83,80,76,71,65,59,55,53,54,58,63,71,78,84,89,91,90,87,82,76,70,63,58,54,52,50,50,51,52,55,58,62,65,68,70,71,70,68,65,62,59,58,58,60,65,71,78,85,92,98,103,107,110,113,115,118,121,125,130,134,138,141,141,138,133,124,112,97,82,66,52,41,34,32,34,41,52,65,79,92,103,111,116,118,118,116,114,111,109,108,106,104,102,99,95,90,85,79,74,69,65,62,60,59,57,55,53,49,45,39,33,27,21,17,15,17,24,35,50,70,92,115,137,158,174,185,190,191,187,180,172,164,157,152,150,150,152,154,156,155,151,143,132,118,102,85,69,55,45,38,34,32,31,29,24,15,2,-14,-32,-50,-65,-76,-82,-82,-78,-71,-63,-56,-54,-56,-63,-74,-88,-101,-113,-121,-125,-124,-119,-110,-95,-73,-43,-1,56,129,220,327,447,571,694,805,895,956,982,972,926,847,743,621,490,358,232,118,20,-61,-124,-170,-200,-217,-223,-220,-211,-198,-184,-168,-154,-141,-130,-119,-110,-101,-92,-81,-69,-57,-45,-33,-22,-13,-5,1,6,10,15,21,27,34,42,49,55,58,59,57,54,49,46,44,46,51,60,73,87,101,114,123,127,126,119,110,97,85,74,65,61,61,64,71,80,90,100,109,116,121,123,123,120,116,110,103,97,91,87,86,87,91,98,106,114,123,130,135,138,138,136,132,127,122,118,113,110,107,106,106,107,109,111,114,115,116,114,111,106,100,93,88,85,86,90,98,109,120,131,138,140,136,126,111,94,76,59,47,39,37,40,45,52,59,63,65,63,59,54,49,46,45,47,51,57,63,69,72,73,72,70,67,66,66,69,76,84,93,101,106,108,105,98,87,75,63,54,49,48,52,60,70,80,89,95,98,99,98,96,94,94,95,98,102,106,109,111,111,109,106,101,96,92,89,87,86,85,86,87,88,90,92,95,97,99,100,100,99,96,91,86,79,73,67,63,60,57,56,54,53,52,51,51,53,57,64,74,86,100,114,127,138,146,149,149,145,139,132,125,119,115,114,115,119,123,128,132,135,135,133,127,119,109,98,85,73,61,49,38,28,18,8,-3,-14,-25,-36,-46,-56,-65,-71,-77,-80,-82,-84,-84,-84,-84,-84,-84,-85,-87,-90,-95,-101,-109,-115,-118,-114,-99,-68,-17,56,151,266,395,533,669,793,896,970,1010,1011,977,909,814,701,577,450,328,215,115,30,-40,-96,-139,-171,-193,-207,-213,-213,-209,-200,-190,-178,-166,-154,-144,-134,-125,-117,-108,-99,-89,-78,-67,-56,-45,-36,-28,-20,-14,-8,-1,7,17,28,40,54,67,79,88,95,97,96,92,85,78,70,64,60,59,60,64,69,75,82,87,92,95,98,100,103,106,111,116,123,129,135,138,138,134,128,119,109,99,91,88,88,92,100,109,119,126,129,129,123,114,103,92,82,75,73,75,81,91,101,112,121,128,131,132,130,127,122,117,112,108,105,103,102,102,103,104,105,105,105,105,103,101,99,98,97,98,99,101,102,103,102,98,91,82,70,58,46,35,28,25,26,31,39,48,57,64,68,69,67,63,58,53,52,53,59,68,79,91,102,111,115,114,109,100,89,78,68,60,56,55,57,61,66,71,76,80,85,89,95,103,111,121,130,137,142,143,140,134,125,116,106,99,95,94,96,100,105,109,110,108,101,92,80,66,53,42,33,28,27,30,37,46,57,68,79,88,94,97,97,94,88,81,73,66,61,57,55,56,58,63,68,75,83,92,102,112,122,132,140,146,148,147,143,136,127,118,111,106,104,106,110,116,122,128,132,133,131,127,122,116,109,104,98,94,90,85,80,74,66,58,47,36,23,10,-4,-17,-31,-43,-53,-62,-69,-73,-76,-79,-81,-84,-88,-94,-101,-108,-116,-122,-127,-129,-128,-123,-113,-98,-75,-42,3,62,139,231,339,459,583,705,816,905,965,990,977,926,843,734,608,475,344,224,120,35,-30,-78,-112,-136,-153,-167,-178,-188,-195,-199,-199,-194,-183,-168,-150,-131,-114,-99,-88,-82,-78,-76,-74,-70,-63,-54,-41,-27,-13,0,11,18,23,25,27,29,32,38,47,57,69,80,89,96,100,101,99,96,93,90,88,88,88,89,91,92,92,91,90,89,89,89,90,93,97,101,106,111,115,118,121,124,125,126,126,126,124,121,117,112,106,100,95,90,88,87,88,91,95,100,105,109,113,115,116,117,116,114,113,111,109,107,105,104,104,104,105,107,110,114,118,121,123,124,122,118,112,103,93,84,75,68,63,61,61,63,65,68,70,70,69,68,66,64,63,64,65,68,71,74,76,77,77,76,75,74,73,72,72,71,69,67,64,59,55,52,49,50,52,57,63,69,75,80,82,82,80,77,75,73,75,78,84,92,101,108,115,119,121,121,120,118,117,116,116,116,116,115,112,108,103,97,90,84,79,76,74,74,75,76,77,76,75,72,68,65,61,59,59,62,67,74,83,93,104,114,122,129,132,133,131,127,121,114,106,98,91,83,77,70,64,57,49,42,34,28,23,20,21,25,33,44,58,74,90,106,120,131,140,146,151,154,158,162,166,172,177,181,183,183,178,170,158,144,128,111,96,82,70,60,53,48,43,39,35,30,25,20,14,7,0,-8,-17,-26,-34,-41,-48,-52,-54,-55,-55,-54,-54,-55,-59,-65,-74,-85,-96,-108,-119,-126,-130,-129,-120,-101,-70,-25,38,120,219,336,464,598,729,848,945,1011,1040,1029,978,890,774,637,490,343,205,83,-20,-101,-161,-201,-226,-238,-241,-239,-233,-225,-215,-205,-194,-182,-170,-156,-142,-128,-114,-99,-85,-71,-56,-41,-27,-11,4,19,33,46,57,65,70,71,69,63,56,48,40,34,30,30,32,38,46,55,64,72,79,84,87,89,90,91,92,93,95,97,99,102,104,106,107,107,107,107,107,107,107,107,107,106,105,104,101,98,95,91,89,88,88,91,97,106,116,127,139,148,155,158,157,152,144,134,122,112,103,98,96,98,101,106,111,114,116,116,115,112,110,108,108,109,111,112,113,112,108,102,93,84,74,67,63,62,65,71,79,86,92,94,92,86,75,63,49,37,28,23,23,27,35,45,57,67,76,83,86,87,86,83,79,75,70,66,63,60,58,58,60,64,69,76,84,91,98,103,106,107,105,101,97,93,91,91,93,97,101,104,105,104,99,91,82,72,64,60,59,62,70,81,94,107,118,127,132,135,136,135,134,133,132,132,132,131,129,126,120,112,103,93,84,76,71,69,70,74,80,87'}"; var responseString = jsonResponse.data;
    //jsonResponse.data = "{'RPEAK': '119,487,861,1224,1578,1949,2319,2670', 'RR': '736.0,748.0,726.0,708.0,742.0,740.0,702.0', 'PR': '0.0,210.0,264.0,236.0,246.0,214.0,208.0,202.0', 'HR': '81.52,80.21,82.64,84.75,80.86,81.08,85.47', 'QRSD': '90.0,78.0,74.0,72.0,72.0,70.0,70.0,66.0', 'QT': '0.0,0.0,0.0,0.0,0.0,378.0,0.0,0.0', 'QTC': '-160.0,-928.0,-1680.0,-2408.0,-3118.0,-3860.0,-4600.0,-5302.0', 'FDATA': '16,25,33,40,44,46,47,45,43,41,39,37,36,35,34,32,29,26,22,16,11,5,-1,-7,-13,-19,-26,-34,-42,-52,-62,-71,-80,-87,-93,-96,-96,-95,-92,-87,-82,-76,-71,-66,-61,-56,-52,-47,-42,-36,-30,-23,-16,-9,-2,5,12,18,25,31,38,45,52,59,65,71,75,77,77,75,70,64,58,51,46,42,40,40,41,42,42,38,31,19,2,-19,-42,-67,-93,-117,-139,-159,-178,-195,-211,-227,-242,-255,-265,-271,-272,-267,-256,-242,-224,-206,-186,-165,-142,-112,-73,-20,49,137,242,359,480,596,694,766,801,794,745,656,537,396,248,103,-27,-135,-215,-268,-296,-303,-295,-278,-256,-235,-216,-200,-188,-177,-168,-160,-151,-141,-132,-122,-112,-103,-94,-85,-76,-66,-55,-43,-31,-18,-5,7,18,27,35,41,45,48,49,50,49,48,47,45,42,40,37,34,31,28,25,23,20,19,17,16,15,14,13,12,11,9,7,5,4,2,1,0,-1,-2,-2,-3,-3,-3,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,1,1,1,0,-1,-2,-3,-4,-5,-6,-6,-7,-7,-8,-9,-10,-12,-13,-14,-14,-13,-12,-10,-8,-7,-6,-6,-7,-9,-11,-12,-12,-12,-9,-6,-3,0,2,4,6,7,10,15,22,32,43,55,64,70,71,66,56,42,26,11,-1,-10,-14,-14,-11,-9,-9,-11,-17,-25,-35,-43,-50,-53,-56,-59,-66,-78,-97,-123,-152,-179,-196,-197,-175,-126,-51,46,155,265,365,440,483,487,452,383,288,176,60,-51,-148,-227,-284,-321,-339,-341,-330,-310,-282,-247,-206,-162,-115,-68,-23,18,52,78,96,107,111,111,108,104,100,96,92,87,81,73,62,51,38,26,15,7,2,-1,-1,0,2,3,3,3,2,0,-2,-4,-5,-6,-6,-5,-5,-5,-5,-6,-7,-8,-9,-10,-10,-10,-10,-9,-9,-8,-8,-8,-8,-8,-8,-8,-7,-6,-5,-4,-3,-3,-2,-1,-1,0,0,0,1,1,1,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,1,0,0,0,-1,-2,-2,-3,-4,-4,-5,-6,-7,-8,-9,-9,-10,-10,-10,-10,-9,-8,-7,-5,-4,-3,-1,0,1,2,3,4,5,6,8,10,12,14,16,17,19,21,23,25,27,30,32,33,35,35,35,34,31,28,24,20,16,13,10,7,5,4,2,1,-2,-6,-11,-18,-27,-36,-47,-57,-68,-77,-85,-91,-96,-100,-103,-106,-108,-110,-110,-110,-107,-102,-94,-85,-74,-64,-56,-52,-53,-57,-64,-71,-74,-67,-47,-9,46,119,207,301,396,482,551,595,611,597,553,484,397,298,193,89,-8,-97,-175,-240,-294,-335,-366,-385,-393,-391,-381,-365,-344,-321,-298,-276,-257,-239,-221,-202,-178,-150,-115,-74,-31,14,56,93,122,143,155,159,158,153,147,142,137,133,128,123,115,104,91,76,61,47,35,26,21,19,18,19,19,19,16,13,8,3,-1,-5,-8,-9,-10,-11,-11,-12,-13,-14,-16,-17,-18,-19,-19,-18,-18,-17,-16,-16,-15,-15,-15,-15,-14,-14,-13,-11,-10,-9,-7,-6,-5,-5,-4,-3,-3,-2,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,2,3,3,3,3,2,0,-1,-3,-5,-6,-7,-8,-8,-9,-10,-11,-13,-15,-17,-18,-18,-18,-16,-13,-11,-8,-7,-7,-9,-12,-15,-17,-19,-18,-15,-10,-5,1,7,12,16,20,25,32,41,53,68,82,96,106,110,107,98,82,63,42,23,7,-4,-10,-14,-17,-21,-27,-36,-47,-59,-70,-79,-84,-87,-91,-98,-112,-135,-167,-206,-246,-279,-296,-288,-250,-179,-76,49,187,321,439,526,572,575,534,455,350,228,104,-13,-115,-197,-256,-295,-316,-321,-314,-297,-271,-239,-200,-156,-109,-62,-16,24,58,83,98,105,105,100,92,84,76,70,64,58,52,45,37,27,18,9,1,-4,-7,-8,-7,-5,-3,-1,-1,-1,-3,-4,-6,-7,-7,-7,-6,-5,-4,-4,-4,-5,-6,-7,-8,-8,-8,-8,-7,-6,-6,-5,-5,-5,-5,-5,-5,-5,-4,-4,-3,-2,-1,0,0,0,1,1,1,1,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,2,2,2,2,1,0,-2,-3,-5,-6,-7,-8,-8,-9,-9,-10,-12,-13,-15,-16,-16,-16,-14,-12,-10,-8,-7,-7,-8,-10,-13,-15,-17,-17,-14,-10,-5,1,7,13,18,22,27,34,42,53,65,79,92,102,107,106,98,84,66,46,27,11,0,-6,-8,-7,-6,-7,-12,-21,-33,-47,-60,-72,-80,-88,-96,-109,-130,-160,-200,-247,-294,-335,-359,-357,-322,-252,-148,-18,127,274,407,512,580,605,586,529,441,333,216,100,-6,-97,-171,-227,-265,-287,-295,-289,-271,-243,-204,-159,-109,-59,-11,29,60,80,89,88,80,68,55,43,33,27,23,20,18,16,12,7,2,-4,-8,-11,-13,-12,-10,-7,-5,-3,-3,-3,-4,-4,-5,-5,-4,-3,-2,0,0,1,0,0,-1,-2,-2,-3,-2,-1,0,0,1,1,1,0,0,-1,-1,-1,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,0,2,3,5,7,9,10,12,13,14,15,16,17,18,18,19,19,19,18,17,16,14,13,12,12,13,15,16,18,18,17,14,8,-1,-12,-24,-37,-50,-61,-70,-76,-81,-83,-85,-86,-89,-92,-96,-99,-102,-102,-100,-96,-90,-83,-78,-76,-79,-86,-95,-104,-107,-99,-76,-34,29,110,206,309,409,498,567,608,619,598,547,473,382,281,177,76,-18,-102,-176,-238,-289,-329,-358,-375,-380,-375,-361,-340,-316,-291,-268,-249,-236,-226,-217,-207,-192,-170,-139,-100,-55,-6,42,86,121,147,163,169,169,163,155,147,139,132,125,118,109,99,86,72,58,45,34,26,20,18,17,17,18,17,15,12,8,3,-1,-4,-7,-8,-9,-9,-9,-10,-11,-13,-14,-16,-17,-17,-17,-17,-17,-16,-15,-15,-15,-14,-14,-14,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-4,-3,-3,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-3,-4,-4,-5,-5,-6,-6,-6,-7,-7,-8,-9,-9,-9,-9,-7,-6,-4,-3,-2,-3,-4,-6,-8,-11,-13,-13,-12,-10,-6,-1,4,9,14,18,23,29,36,44,54,65,76,86,93,96,95,89,80,69,57,46,37,31,27,25,23,19,13,5,-6,-19,-31,-42,-51,-59,-68,-78,-92,-114,-143,-181,-226,-274,-322,-364,-396,-413,-413,-394,-354,-296,-221,-132,-31,77,188,299,402,494,566,615,634,623,579,506,411,300,185,75,-22,-97,-148,-173,-176,-162,-137,-108,-81,-61,-50,-48,-54,-64,-76,-86,-93,-96,-94,-89,-83,-75,-68,-62,-57,-53,-50,-47,-43,-40,-36,-31,-27,-23,-19,-15,-12,-8,-3,1,6,10,14,17,19,20,20,20,20,19,19,19,19,20,20,20,20,19,19,17,16,15,13,12,11,10,9,8,7,5,3,1,0,-1,-2,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,3,3,2,1,0,-1,-3,-4,-5,-6,-6,-6,-7,-7,-8,-9,-10,-11,-12,-13,-12,-11,-9,-7,-5,-5,-5,-7,-9,-13,-15,-17,-16,-14,-9,-4,3,9,15,21,26,33,40,49,61,74,88,101,110,115,114,108,96,80,63,47,33,23,16,11,8,3,-4,-15,-28,-42,-56,-67,-75,-81,-85,-90,-102,-122,-154,-197,-252,-311,-370,-420,-453,-462,-443,-392,-312,-207,-83,52,188,319,435,531,602,644,656,638,589,514,417,303,181,58,-55,-151,-223,-268,-283,-272,-238,-190,-134,-79,-32,3,24,30,25,11,-7,-25,-41,-52,-59,-61,-59,-55,-51,-48,-45,-43,-42,-41,-40,-38,-35,-32,-28,-24,-19,-15,-10,-6,-1,3,8,12,15,18,20,21,21,20,19,18,17,17,16,17,17,17,16,16,14,13,12,10,8,7,6,5,3,2,1,-1,-3,-5,-6,-8,-9,-9,-10,-10,-9,-9,-9,-9,-8,-8,-8,-8,-7,-7,-7,-6,-6,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-3,-3,-3,-4,-4,-5,-5,-6,-6,-6,-7,-7,-7,-6,-6,-5,-5,-4,-4,-3,-3,-2,-2,-2,-1,0,0,1,2,3,4,4,5,6,7,9,10,11,13,14,15,16,17,17,17,17,17,17,16,16,15,14,12,11,10,9,8,7,7,7,7,7,7,7,7,7,7,8,9,10,11,13,14,14,14,13,12,11,10,10,10,10,11,11,11,10,9,8,6,6,5,6,8,9,10,10,9,6,2,-4,-9,-14,-18,-21,-22,-23,-23,-24,-24,-24,-22,-19,-14,-5,7,20,35,49,61,70,75,77,74,70,63,54,42,25,2,-29,-70,-120,-178,-241,-303,-360,-405,-436,-449,-447,-430,-404,-373,-344,-318,-298,-285,-275,-267,-256,-240,-217,-188,-154,-117,-81,-48,-18,8,32'}";   
    //console.log("Current lead is" + reading_lead + "Data " + jsonResponse.data);
    $scope.cc = 0;
    var JsonString = replaceAll(jsonResponse.data, "'", "\"");
    //console.log("Received Response   " + JsonString);

    if ($rootScope.ZugECGEmergencySkipClicked == false && jsonResponse.data != "ERROR" && jsonResponse.data != "Not enough beats to compute heart rate.ERROR") {
      var FilteredRPeakDataArray = [];
      var JSONData = JSON.parse(JsonString);
      var FilteredRPeakData = JSONData.RPEAK;
      var splitData = FilteredRPeakData.split(',');
      var rPeakLength = splitData.length;
      FilteredRPeakDataArray = FilteredRPeakDataArray.concat(splitData);
      FilteredRPeakDataArrayAsc = FilteredRPeakDataArray.concat(splitData);
      var PFData = JSONData.FDATA;
      var splitPFData = PFData.split(',');
      var floatPFData = splitPFData.map(parseFloat);
      if (reading_lead == 1) {
      }
      if (reading_lead == 2) {
        var RR_DATA = JSONData.RR;
        var RR_DATA_ARRAY = RR_DATA.split(',');
        var RR_ARRAY = [];
        RR_ARRAY = RR_ARRAY.concat(RR_DATA_ARRAY);
        RR_ARRAY = RR_ARRAY.map(parseFloat);
        RR_SEC = [];
        RR_SEC_STRING = "";

        var PR_DATA = JSONData.PR;
        var PR_DATA_ARRAY = PR_DATA.split(',');
        var PR_ARRAY = [];
        PR_ARRAY = PR_ARRAY.concat(PR_DATA_ARRAY);
        PR_ARRAY = PR_ARRAY.map(parseFloat);
        PR_SEC = [];
        PR_SEC_STRING = "";

        var QRSD_DATA = JSONData.QRSD;
        var QRSD_DATA_ARRAY = QRSD_DATA.split(',');
        var QRSD_ARRAY = [];
        QRSD_ARRAY = QRSD_ARRAY.concat(QRSD_DATA_ARRAY);
        QRSD_ARRAY = QRSD_ARRAY.map(parseFloat);
        QRSD_SEC = [];
        QRSD_SEC_STRING = "";
        QTC_SEC = [];
        QTC_SEC_STRING = "";

        var HR_DATA = JSONData.HR;
        var HR_DATA_ARRAY = HR_DATA.split(',');
        var HR_ARRAY = [];
        HR_ARRAY = HR_ARRAY.concat(HR_DATA_ARRAY);
        HR_ARRAY = HR_ARRAY.map(parseFloat);
        HR_SEC = [];
        HR_SEC_STRING = "";

        var QT_DATA = JSONData.QT;
        var QT_DATA_ARRAY = QT_DATA.split(',');
        var QT_ARRAY = [];
        QT_ARRAY = QT_ARRAY.concat(QT_DATA_ARRAY);
        QT_ARRAY = QT_ARRAY.map(parseFloat);
        QT_SEC = [];
        QT_SEC_STRING = "";

        var diffc = (findMaxCealing(floatPFData) - findMinCealing(floatPFData)) / 500;
        var startFrom = 0;
        if (diffc == 4) {
          startFrom = 100;
        } else if (diffc == 3) {
          startFrom = 500;
        } else if (diffc == 2) {
          startFrom = 700;
        }
        var RRIntervalArray = [];
        var QTIntervalArray = [];
        var QTcIntervalArray = [];
        var PRIntervalArray = [];
        var HRIntervalArray = [];
        var QRSDIntervalArray = [];

        var j = 0;
        for (var i = 0; i < RR_ARRAY.length; i++) { if (FilteredRPeakDataArrayAsc[i] > startFrom || $scope.leadMode == 3 || $scope.leadMode == 6) { RR_SEC[i] = RR_ARRAY[i] / 1000; RR_SEC[i] = RR_SEC[i].toFixed(2); RRIntervalArray.push(RR_SEC[i]); if (j == 0) { RR_SEC_STRING = RR_SEC_STRING + RR_SEC[i]; } else { RR_SEC_STRING = RR_SEC_STRING + "," + RR_SEC[i]; } j++; } }
        j = 0;
        for (var i = 0; i < PR_ARRAY.length; i++) { if (FilteredRPeakDataArrayAsc[i] > startFrom || $scope.leadMode == 3 || $scope.leadMode == 6) { PR_SEC[i] = PR_ARRAY[i] / 1000; PR_SEC[i] = PR_SEC[i].toFixed(2); PRIntervalArray.push(PR_SEC[i]); if (j == 0) { PR_SEC_STRING = PR_SEC_STRING + PR_SEC[i]; } else { PR_SEC_STRING = PR_SEC_STRING + "," + PR_SEC[i]; } j++; } }
        j = 0;
        for (var i = 0; i < QRSD_ARRAY.length; i++) { if (FilteredRPeakDataArrayAsc[i] > startFrom || $scope.leadMode == 3 || $scope.leadMode == 6) { QRSD_SEC[i] = QRSD_ARRAY[i] / 1000; QRSD_SEC[i] = QRSD_SEC[i].toFixed(2); QRSDIntervalArray.push(QRSD_SEC[i]); if (j == 0) { QRSD_SEC_STRING = QRSD_SEC_STRING + QRSD_SEC[i]; } else { QRSD_SEC_STRING = QRSD_SEC_STRING + "," + QRSD_SEC[i]; } j++; } }
        j = 0;
        for (var i = 0; i < HR_ARRAY.length; i++) { if (FilteredRPeakDataArrayAsc[i] > startFrom || $scope.leadMode == 3 || $scope.leadMode == 6) { HR_SEC[i] = HR_ARRAY[i]; HR_SEC[i] = HR_SEC[i].toFixed(0); HRIntervalArray.push(HR_SEC[i]); if (j == 0) { HR_SEC_STRING = HR_SEC_STRING + HR_SEC[i]; } else { HR_SEC_STRING = HR_SEC_STRING + "," + HR_SEC[i]; } j++; } }
        j = 0;
        for (var i = 0; i < QT_ARRAY.length; i++) { if (FilteredRPeakDataArrayAsc[i] > startFrom || $scope.leadMode == 3 || $scope.leadMode == 6) { QT_SEC[i] = QT_ARRAY[i] / 1000; QT_SEC[i] = QT_SEC[i].toFixed(2); QTIntervalArray.push(QT_SEC[i]); if (j == 0) { QT_SEC_STRING = QT_SEC_STRING + QT_SEC[i]; } else { QT_SEC_STRING = QT_SEC_STRING + "," + QT_SEC[i]; } j++; } }
        var ModifiedPRIntervalArray = [];
        var ModifiedQRSDIntervalArray = [];
        var ModifiedQTIntervalArray = [];
        var ModifiedHRIntervalArray = [];
        var ModifiedQTcIntervalArray = [];

        for (var h = 0; h < HRIntervalArray.length; h++) {
          if (HRIntervalArray[h] != 0.0 && !(Number.isNaN(HRIntervalArray[h]))) {

            ModifiedHRIntervalArray.push(HRIntervalArray[h]);
          }
        }
        for (var a = 0; a < PRIntervalArray.length; a++) {
          if (PRIntervalArray[a] != 0.0 && !(Number.isNaN(PRIntervalArray[a]))) {

            ModifiedPRIntervalArray.push(PRIntervalArray[a]);
          }
        }
        for (var b = 0; b < QTIntervalArray.length; b++) {
          if (QTIntervalArray[b] != 0.0 && !(Number.isNaN(QTIntervalArray[b]))) {
            ModifiedQTIntervalArray.push(QTIntervalArray[b]);
          }
        }

        for (var c = 0; c < QRSDIntervalArray.length; c++) {
          if (QRSDIntervalArray[c] != 0.0 && !(Number.isNaN(QRSDIntervalArray[c]))) {
            ModifiedQRSDIntervalArray.push(QRSDIntervalArray[c]);
          }
        }
        var sqrtOfRRInterval = 0;
        sqrtOfRRInterval = Math.sqrt(RRIntervalArray[1]);
        for (var i = 0; i < ModifiedQTIntervalArray.length; i++) {
          var QTCInterval = 0;
          QTCInterval = (ModifiedQTIntervalArray[i] / sqrtOfRRInterval).toFixed(2);
          if (QTCInterval != 0.0 && !(Number.isNaN(QTCInterval))) {
            ModifiedQTcIntervalArray.push(QTCInterval);
          }
        }
        /*console.log("ModifiedPRIntervalArray = "+ModifiedPRIntervalArray);
        console.log("ModifiedQRSDIntervalArray = "+ModifiedQRSDIntervalArray);
        console.log("ModifiedQTIntervalArray = "+ModifiedQTIntervalArray);
        console.log("ModifiedHRIntervalArray = "+ModifiedHRIntervalArray);
        console.log("ModifiedQTcIntervalArray = "+ModifiedQTcIntervalArray);*/

        var MaxPRIntervalArray = [];
        var MinPRIntervalArray = [];
        var prMinCount = 0;
        var prMaxCount = 0;
        var MaxQRSDurationArray = [];
        var MinQRSDurationArray = [];
        var QRSDurationMinCount = 0;
        var QRSDurationMaxCount = 0;
        var MaxQTcIntervalArray = [];
        var MinQTcIntervalArray = [];
        var QTcMinCount = 0;
        var QTcMaxCount = 0;
        var MaxHRIntervalArray = [];
        var MinHRIntervalArray = [];
        var HRMinCount = 0;
        var HRMaxCount = 0;
        for (var i = 0; i < ModifiedPRIntervalArray.length; i++) {
          if (ModifiedPRIntervalArray[i] >= 0.12 && ModifiedPRIntervalArray[i] <= 0.20) {
            HigiKioskStorageService.saveSessionData('PRInterval', ModifiedPRIntervalArray[i]);
            $scope.noPRInterval = true;
            break;
          }
          else if (ModifiedPRIntervalArray[i] < 0.12) {
            prMinCount++;
            MinPRIntervalArray.push(ModifiedPRIntervalArray[i]);
          }
          else if (ModifiedPRIntervalArray[i] > 0.20) {
            MaxPRIntervalArray.push(ModifiedPRIntervalArray[i]);
            prMaxCount++;
          }
        }
        if ($scope.noPRInterval == false) {
          const closestPRValue = ModifiedPRIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.12) < Math.abs(a - 0.12) ? b : a;
          });
          const closestPRValue1 = ModifiedPRIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.20) < Math.abs(a - 0.20) ? b : a;
          });
          if (closestPRValue1 - 0.20 > closestPRValue - 0.12) {
            HigiKioskStorageService.saveSessionData('PRInterval', closestPRValue);
          }
          else {
            HigiKioskStorageService.saveSessionData('PRInterval', closestPRValue1);
          }
          $scope.noPRInterval = true;
        }
        if ($scope.noPRInterval == false && prMinCount == 0 && prMaxCount == 0) {
          //HigiKioskStorageService.saveSessionData('PRInterval', 0);
          $rootScope.secondLeadValidation = false;
        }
        else if ($scope.noPRInterval == false && (prMinCount > prMaxCount || prMinCount == prMaxCount)) {
          //HigiKioskStorageService.saveSessionData('PRInterval', Math.max.apply(Math, MinPRIntervalArray));
          var PRValue = Math.max.apply(Math, MinPRIntervalArray);
          if (PRValue < 30) {
            $rootScope.secondLeadValidation = false;
          }
          else {
            HigiKioskStorageService.saveSessionData('PRInterval', PRValue);
          }
        }
        else if ($scope.noPRInterval == false && prMaxCount > prMinCount) {
          //HigiKioskStorageService.saveSessionData('PRInterval', Math.min.apply(Math, MaxPRIntervalArray));
          var PRValue = Math.min.apply(Math, MaxPRIntervalArray);
          if (PRValue > 300) {
            $rootScope.secondLeadValidation = false;
          }
          else {
            HigiKioskStorageService.saveSessionData('PRInterval', PRValue);
          }
        }
        for (var j = 0; j < ModifiedQRSDIntervalArray.length; j++) {
          if (ModifiedQRSDIntervalArray[j] >= 0.08 && ModifiedQRSDIntervalArray[j] <= 0.12) {
            HigiKioskStorageService.saveSessionData('QRSDuration', ModifiedQRSDIntervalArray[j]);
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){
              $scope.noQRSDuration = false;  
            } else{
              $scope.noQRSDuration = true;
            }            
                // check PR interval for graph plot end by deepak 
            break;
          }
          else if (ModifiedQRSDIntervalArray[j] < 0.08) {
            QRSDurationMinCount++;
            MinQRSDurationArray.push(ModifiedQRSDIntervalArray[j]);
          }
          else if (ModifiedQRSDIntervalArray[j] > 0.12) {
            MaxQRSDurationArray.push(ModifiedQRSDIntervalArray[j]);
            QRSDurationMaxCount++;
          }
        }
        if ($scope.noQRSDuration == false) {
          const closestQRSDuration = ModifiedQRSDIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.08) < Math.abs(a - 0.08) ? b : a;
          });
          const closestQRSDuration1 = ModifiedQRSDIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.12) < Math.abs(a - 0.12) ? b : a;
          });
          if (closestQRSDuration1 - 0.12 > closestQRSDuration - 0.08) {
            HigiKioskStorageService.saveSessionData('QRSDuration', closestQRSDuration);
          }
          else {
            HigiKioskStorageService.saveSessionData('QRSDuration', closestQRSDuration1);
          }
                // check PR interval for graph plot start by deepak 
          if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){
            $scope.noQRSDuration = false;  
          } else{
            $scope.noQRSDuration = true;
          }
                // check PR interval for graph plot end by deepak 
        }
        if ($scope.noQRSDuration == false && QRSDurationMinCount == 0 && QRSDurationMaxCount == 0) {
          //HigiKioskStorageService.saveSessionData('QRSDuration', 0);
          $rootScope.secondLeadValidation = false;
        }
        else if ($scope.noQRSDuration == false && (QRSDurationMinCount > QRSDurationMaxCount || QRSDurationMinCount == QRSDurationMaxCount)) {
          //HigiKioskStorageService.saveSessionData('QRSDuration', Math.max.apply(Math, MinQRSDurationArray));
          var QRSValue = Math.max.apply(Math, MinQRSDurationArray);
          if (QRSValue < 20) {
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){              
              $rootScope.secondLeadValidation = true;
              HigiKioskStorageService.saveSessionData('QRSDuration', QRSValue);
            } else{              
              $rootScope.secondLeadValidation = false;
            }  
                // check PR interval for graph plot end by deepak 
          }
          else {
            HigiKioskStorageService.saveSessionData('QRSDuration', QRSValue);
          }
        }
        else if ($scope.noQRSDuration == false && QRSDurationMaxCount > QRSDurationMinCount) {
          //HigiKioskStorageService.saveSessionData('QRSDuration', Math.min.apply(Math, MaxQRSDurationArray));
          var QRSValue = Math.min.apply(Math, MaxQRSDurationArray);
          if (QRSValue > 250) {
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){              
              $rootScope.secondLeadValidation = true;
              HigiKioskStorageService.saveSessionData('QRSDuration', QRSValue);
            } else{              
              $rootScope.secondLeadValidation = false;
            } 
                // check PR interval for graph plot end by deepak 
          }
          else {
            HigiKioskStorageService.saveSessionData('QRSDuration', QRSValue);
          }
        }

        for (var k = 0; k < ModifiedQTcIntervalArray.length; k++) {
          if (ModifiedQTcIntervalArray[k] >= 0.31 && ModifiedQTcIntervalArray[k] <= 0.45) {
            HigiKioskStorageService.saveSessionData('QTCInterval', ModifiedQTcIntervalArray[k]);
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){             
              $scope.noQTcInterval = false;
            } else{              
              $scope.noQTcInterval = true;  
            }          
                // check PR interval for graph plot end by deepak 
            break;
          }
          else if (ModifiedQTcIntervalArray[k] < 0.31) {
            QTcMinCount++;
            MinQTcIntervalArray.push(ModifiedQTcIntervalArray[k]);
          }
          else if (ModifiedQTcIntervalArray[k] > 0.45) {
            MaxQTcIntervalArray.push(ModifiedQTcIntervalArray[k]);
            QTcMaxCount++;
          }
        }
        if ($scope.noQTcInterval == false) {
          const closestQTcInterval = ModifiedQTcIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.31) < Math.abs(a - 0.31) ? b : a;
          });
          const closestQTcInterval1 = ModifiedQTcIntervalArray.reduce((a, b) => {
            return Math.abs(b - 0.45) < Math.abs(a - 0.45) ? b : a;
          });
          if (closestQTcInterval1 - 0.31 > closestQTcInterval - 0.45) {
            HigiKioskStorageService.saveSessionData('QTCInterval', closestQTcInterval);
          }
          else {
            HigiKioskStorageService.saveSessionData('QTCInterval', closestQTcInterval1);
          }
                // check PR interval for graph plot start by deepak 
          if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){             
            $scope.noQTcInterval = false;
          } else{              
            $scope.noQTcInterval = true;  
          }   
                // check PR interval for graph plot end by deepak 
        }
        if ($scope.noQTcInterval == false && QTcMinCount == 0 && QTcMaxCount == 0) {
          //HigiKioskStorageService.saveSessionData('QTCInterval', 0);
          $rootScope.secondLeadValidation = false;
        }
        else if ($scope.noQTcInterval == false && (QTcMinCount > QTcMaxCount || QTcMinCount == QTcMaxCount)) {
          //HigiKioskStorageService.saveSessionData('QTCInterval', Math.max.apply(Math, MinQTcIntervalArray));
          var QTcValue = Math.min.apply(Math, MinQTcIntervalArray);
          if (QTcValue > 120) {
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
              $rootScope.secondLeadValidation = true;
              HigiKioskStorageService.saveSessionData('QTCInterval', QTcValue);
            } else{              
              $rootScope.secondLeadValidation = false;  
            }   
                // check PR interval for graph plot end by deepak 
          }
          else {
            HigiKioskStorageService.saveSessionData('QTCInterval', QTcValue);
          }
        }
        else if ($scope.noQTcInterval == false && QTcMaxCount > QTcMinCount) {
          //HigiKioskStorageService.saveSessionData('QTCInterval', Math.min.apply(Math, MaxQTcIntervalArray));
          var QTcValue = Math.min.apply(Math, MaxQTcIntervalArray);
          if (QTcValue > 700) {
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
              $rootScope.secondLeadValidation = true;
              HigiKioskStorageService.saveSessionData('QTCInterval', QTcValue);
            } else{              
              $rootScope.secondLeadValidation = false;  
            }  
                // check PR interval for graph plot end by deepak 
          }
          else {
            HigiKioskStorageService.saveSessionData('QTCInterval', QTcValue);
          }
        }

        for (var l = 0; l < ModifiedHRIntervalArray.length; l++) {
          if (ModifiedHRIntervalArray[l] >= 60 && ModifiedHRIntervalArray[l] <= 100) {
            HigiKioskStorageService.saveSessionData('HeartRate', ModifiedHRIntervalArray[l]);
                // check PR interval for graph plot start by deepak 
            if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
              $scope.noHeartRate = false;
            } else{              
              $scope.noHeartRate = true;  
            }  
                // check PR interval for graph plot end by deepak 
            break;
          }
          else if (ModifiedHRIntervalArray[l] < 60) {
            HRMinCount++;
            MinHRIntervalArray.push(ModifiedHRIntervalArray[l]);
          }
          else if (ModifiedHRIntervalArray[l] > 100) {
            MaxHRIntervalArray.push(ModifiedHRIntervalArray[l]);
            HRMaxCount++;
          }
        }
        if ($scope.noHeartRate == false) {
          const closestHeartRate = ModifiedHRIntervalArray.reduce((a, b) => {
            return Math.abs(b - 60) < Math.abs(a - 60) ? b : a;
          });
          const closestHeartRate1 = ModifiedHRIntervalArray.reduce((a, b) => {
            return Math.abs(b - 100) < Math.abs(a - 100) ? b : a;
          });
          if (closestHeartRate == closestHeartRate1) {
            if (closestHeartRate < 60 || closestHeartRate1 < 60) {
              $rootScope.lowpulse = true
            }
            else if (closestHeartRate > 100 || closestHeartRate1 < 100) {
              $rootScope.highpulse = true
            }
            $rootScope.secondLeadHeartRateLessThanThirty = true;
            HigiKioskStorageService.saveSessionData('HeartRate', closestHeartRate);

          }
          else if (closestHeartRate >= 30 && closestHeartRate1 <= 220) {
            var apprxHeartRate = closestHeartRate1 - 100;
            var apprxHeartBeat = closestHeartRate - 60
            if ((apprxHeartRate > apprxHeartBeat) || (apprxHeartRate == apprxHeartBeat)) {
              $rootScope.secondLeadHeartRateLessThanThirty = true;
              HigiKioskStorageService.saveSessionData('HeartRate', closestHeartRate);
            }
            else {
              HigiKioskStorageService.saveSessionData('HeartRate', closestHeartRate1);
            }
          }
          else {
            if (HRMinCount == 0 && HRMaxCount == 0) {
              //HigiKioskStorageService.saveSessionData('HeartRate', 0);
                // check PR interval for graph plot start by deepak 
              if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
                $rootScope.secondLeadValidation = true;
              } else{              
                $rootScope.secondLeadValidation = false;  
              }
                // check PR interval for graph plot end by deepak 
            }
            else if (HRMinCount > HRMaxCount || HRMinCount == HRMaxCount) {
              //HigiKioskStorageService.saveSessionData('HeartRate', Math.max.apply(Math, MinHRIntervalArray));
              var HRValue = Math.max.apply(Math, MinHRIntervalArray);
              if (HRValue < 30) {
                // check PR interval for graph plot start by deepak 
                if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
                  HigiKioskStorageService.saveSessionData('HeartRate', HRValue);
                  $rootScope.secondLeadValidation = true;
                } else{              
                  $rootScope.secondLeadValidation = false;  
                }
                // check PR interval for graph plot end by deepak 
              }
              else {
                HigiKioskStorageService.saveSessionData('HeartRate', HRValue);
              }
            }
            else if (HRMaxCount > HRMinCount) {
              //HigiKioskStorageService.saveSessionData('HeartRate', Math.min.apply(Math, MaxHRIntervalArray));
              var HRValue = Math.min.apply(Math, MaxHRIntervalArray);
              if (HRValue > 220) {
                // check PR interval for graph plot start by deepak 
                if($scope.noPRInterval == false && $rootScope.zugSixEcgLeadMode == true){  
                  HigiKioskStorageService.saveSessionData('HeartRate', HRValue);
                  $rootScope.secondLeadValidation = true;
                } else{              
                  $rootScope.secondLeadValidation = false;  
                }
                // check PR interval for graph plot end by deepak
              }
              else {
                HigiKioskStorageService.saveSessionData('HeartRate', HRValue);
              }
            }
          }
        }

      }

      var RRIntervalArrayDiff = [];
      var n = FilteredRPeakDataArray.length;
      for (i = 0; i < n - 1; i++) {
        if (FilteredRPeakDataArray[i] != 0.0) {
          var h = (FilteredRPeakDataArray[i + 1] - FilteredRPeakDataArray[i]);
          RRIntervalArrayDiff.push(h);
        }
      }

      if ($scope.leadMode == 3) {
        if (reading_lead == 1) {
          $rootScope.lead1PythonSocketSuccess = true;
          //Sample Filtered Data
          //PFData = "4,3,3,2,1,0,-1,-2,-3,-4,-4,-4,-4,-4,-3,-2,-2,-1,-1,0,1,1,2,3,4,4,5,6,7,9,10,11,13,14,15,16,17,18,18,18,18,18,18,19,19,20,20,20,20,20,20,20,20,21,22,23,25,26,27,28,28,28,28,28,29,30,32,33,35,35,35,34,32,30,28,27,27,28,30,33,35,35,34,31,26,21,16,12,11,11,14,19,23,26,27,25,21,15,8,2,-2,-3,-1,3,9,16,22,26,28,28,26,24,23,22,23,26,31,36,42,47,51,55,58,61,65,69,74,80,86,91,94,96,96,93,88,81,74,66,58,51,44,37,31,24,17,9,1,-8,-15,-22,-26,-29,-30,-30,-30,-30,-30,-33,-36,-41,-45,-49,-52,-54,-55,-56,-59,-64,-72,-82,-93,-103,-110,-112,-108,-98,-85,-73,-66,-67,-80,-103,-132,-162,-183,-186,-163,-110,-27,82,209,340,463,565,638,676,680,654,604,541,472,403,338,278,222,167,112,54,-4,-61,-113,-155,-186,-204,-209,-203,-190,-173,-157,-143,-132,-123,-117,-110,-102,-91,-79,-66,-54,-45,-40,-39,-42,-47,-53,-58,-60,-60,-58,-54,-50,-46,-44,-43,-43,-43,-43,-43,-41,-37,-33,-28,-23,-20,-17,-15,-14,-13,-12,-11,-9,-6,-3,0,2,5,7,9,10,11,12,13,15,16,18,21,23,26,30,33,36,39,42,44,45,47,49,51,54,57,61,66,70,73,76,76,76,74,71,69,66,65,65,66,68,70,72,74,74,73,71,69,66,65,64,64,65,67,69,70,70,69,67,63,57,51,44,36,28,20,11,2,-7,-16,-26,-36,-45,-54,-62,-69,-74,-79,-82,-85,-87,-89,-90,-93,-95,-98,-101,-103,-106,-107,-108,-108,-106,-104,-101,-97,-93,-89,-85,-82,-78,-75,-72,-68,-64,-59,-55,-49,-44,-38,-33,-27,-21,-15,-9,-2,5,12,19,27,33,39,44,48,50,50,50,48,46,44,42,39,37,35,33,31,28,26,23,20,18,15,13,11,9,7,5,3,0,-3,-5,-8,-11,-13,-15,-16,-16,-16,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-3,-2,0,1,3,4,6,7,9,10,12,14,16,18,20,22,23,24,24,24,24,24,23,23,22,22,21,21,20,20,19,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,19,21,23,25,27,29,31,34,36,39,41,42,44,44,45,45,45,44,44,43,42,41,40,39,38,36,35,34,33,33,32,32,32,31,29,28,26,24,22,20,19,18,16,14,12,9,6,4,2,1,2,4,7,10,12,12,11,8,4,-1,-5,-8,-12,-16,-21,-30,-42,-58,-77,-95,-112,-123,-128,-126,-119,-112,-107,-112,-128,-157,-196,-241,-282,-309,-312,-284,-221,-126,-3,136,278,411,523,608,661,684,680,655,616,567,510,449,381,307,226,140,52,-33,-110,-174,-221,-249,-260,-256,-243,-225,-207,-193,-183,-178,-174,-170,-164,-154,-141,-125,-109,-94,-83,-75,-72,-70,-69,-66,-61,-52,-40,-26,-12,1,11,18,21,21,20,18,17,17,17,19,21,22,23,23,21,19,16,13,11,8,7,6,6,5,5,4,3,0,-3,-7,-11,-14,-16,-17,-15,-12,-7,-1,4,8,10,10,8,6,4,3,6,11,20,30,42,53,63,70,74,77,78,80,84,91,101,113,126,138,149,155,156,154,147,138,128,119,111,105,100,97,93,89,83,75,66,56,46,36,27,19,12,4,-3,-12,-22,-33,-46,-58,-69,-79,-86,-90,-92,-92,-89,-86,-82,-78,-74,-70,-67,-63,-59,-54,-49,-43,-38,-32,-27,-23,-19,-16,-13,-10,-7,-2,2,8,13,19,23,27,30,31,32,33,33,34,35,36,37,37,37,36,34,32,29,27,27,27,29,32,35,38,39,40,38,35,31,27,24,22,23,25,28,33,37,40,41,40,38,34,30,27,24,23,23,23,25,26,27,27,26,24,23,21,20,19,19,20,20,20,20,20,19,18,17,16,16,16,16,16,17,17,17,17,17,16,16,15,15,15,16,16,16,17,17,17,17,17,17,17,18,18,19,19,20,20,20,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,10,9,8,7,6,5,4,2,1,0,-2,-3,-5,-6,-7,-8,-9,-9,-9,-8,-8,-7,-6,-5,-4,-4,-3,-2,-2,-1,0,1,2,3,5,6,7,8,9,11,12,13,14,16,17,19,20,21,21,22,22,21,21,20,19,18,17,17,16,16,16,15,14,13,12,10,9,7,6,5,4,2,1,-1,-3,-5,-7,-9,-11,-12,-13,-13,-12,-10,-8,-6,-5,-3,-2,-1,0,2,4,7,10,13,16,18,19,19,19,19,19,19,21,24,27,31,35,38,39,39,37,35,32,31,31,34,39,46,54,63,71,77,82,83,83,81,78,75,72,69,67,65,62,59,53,46,38,29,20,12,5,0,-3,-5,-5,-5,-5,-5,-6,-7,-7,-7,-6,-4,-1,2,4,4,1,-5,-16,-29,-44,-59,-73,-83,-89,-90,-89,-85,-81,-78,-77,-80,-85,-93,-102,-112,-122,-133,-145,-160,-179,-202,-227,-251,-269,-273,-256,-213,-139,-32,104,261,430,596,745,864,943,975,960,902,808,688,554,417,287,171,71,-11,-77,-128,-167,-197,-220,-237,-247,-252,-252,-247,-239,-230,-220,-212,-206,-203,-201,-200,-197,-191,-181,-167,-150,-129,-108,-87,-69,-54,-43,-36,-32,-30,-30,-30,-31,-31,-30,-30,-30,-31,-32,-33,-34,-35,-34,-33,-30,-26,-21,-16,-11,-5,0,4,9,13,17,21,25,29,32,35,37,39,40,41,41,40,40,40,40,40,40,41,42,43,44,46,49,52,55,59,64,68,74,79,84,89,94,98,101,104,106,107,107,106,104,101,98,94,90,86,81,77,74,70,67,63,60,57,53,49,44,39,34,28,22,15,9,3,-3,-9,-14,-19,-23,-26,-29,-31,-33,-35,-36,-37,-38,-39,-41,-42,-44,-45,-46,-47,-47,-46,-45,-44,-42,-41,-39,-37,-35,-33,-31,-29,-26,-24,-22,-20,-18,-17,-15,-14,-13,-12,-11,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-1,0,2,4,6,8,10,12,14,16,19,21,23,25,26,27,28,28,27,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,11,10,9,9,8,7,6,5,4,3,3,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,14,14,14,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,15,16,16,16,17,17,18,19,19,20,21,21,22,22,23,24,24,25,26,27,27,28,29,30,31,32,34,35,37,38,39,40,41,41,41,41,41,40,40,38,36,34,31,28,25,21,18,15,12,10,7,4,1,-3,-8,-12,-17,-21,-24,-26,-27,-26,-24,-23,-21,-21,-22,-25,-31,-39,-49,-62,-74,-87,-100,-111,-120,-127,-133,-138,-143,-149,-157,-164,-171,-174,-170,-154,-123,-72,-1,91,201,323,451,573,680,764,817,835,816,764,683,582,470,355,246,147,63,-6,-60,-102,-133,-157,-177,-193,-207,-218,-227,-232,-232,-228,-219,-205,-188,-168,-147,-126,-106,-88,-72,-60,-52,-47,-44,-44,-46,-49,-52,-55,-57,-59,-60,-60,-60,-59,-58,-57,-54,-52,-48,-44,-39,-33,-27,-21,-14,-9,-3,2,7,11,15,19,22,24,26,28,30,31,32,33,33,34,35,36,37,38,39,41,42,44,47,49,52,54,57,59,61,64,66,68,70,73,75,77,79,81,83,84,85,86,88,90,92,94,96,99,101,102,102,102,100,97,93,88,83,78,72,67,62,57,51,46,41,35,30,24,19,15,10,6,2,-2,-6,-10,-14,-19,-23,-28,-32,-36,-39,-42,-44,-45,-46,-47,-47,-47,-46,-46,-46,-46,-46,-46,-46,-46,-45,-44,-42,-41,-38,-36,-34,-31,-29,-27,-25,-23,-21,-19,-17,-14,-12,-8,-5,-2,2,5,9,13,17,21,25,30,34,39,43,47,50,52,53,53,53,51,50,48,47,45,43,42,40,39,37,35,33,31,29,28,26,24,23,22,20,19,17,15,13,11,9,8,7,6,5,5,5,6,6,7,8,8,9,9,10,10,11,12,13,14,15,15,16,17,18,18,19,20,21,22,23,24,25,26,27,27,27,28,28,28,28,27,27,27,26,26,26,25,25,25,25,24,24,24,24,24,24,24,24,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,19,19,19,19,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,17,17,17,17,17,17,17,16,15,13,12,11,10,9,7,6,5,3,1,0,-1,-2,-2,-2,-1,1,3,5,7,9,11,12,13,14,15,17,19,22,25,29,33,37,40,44,48,52,57,63,69,76,82,88,93,96,97,96,93,89,85,80,75,71,66,61,55,48,41,33,25,19,13,9,6,4,2,0,-3,-7,-13,-19,-24,-29,-31,-32,-32,-32,-33,-37,-44,-54,-66,-78,-87,-92,-92,-86,-75,-63,-51,-42,-39,-41,-49,-59,-69,-76,-80,-80,-80,-83,-93,-114,-146,-187,-232,-272,-298,-299,-269,-202,-101,28,174,326,469,591,684,743,768,764,735,688,630,564,494,419,341,259,176,94,16,-53,-108,-147,-170,-177,-173,-161,-148,-139,-135,-139,-148,-162,-176,-187,-193,-192,-184,-172,-156,-139,-123,-110,-99,-90,-82,-76,-69,-61,-54,-46,-38,-30,-24,-17,-11,-4,3,10,18,25,31,37,41,43,44,45,44,44,44,44,45,46,47,48,48,48,47,45,43,41,39,37,35,33,31,30,28,26,24,22,20,18,17,16,16,17,19,21,24,27,30,33,35,36,37,37,38,39,42,45,50,56,63,70,77,85,92,99,105,112,118,124,129,134,136,137,136,132,128,121,115,108,101,95,90,85,80,74,68,61,53,45,36,27,19,10,2,-7,-16,-26,-36,-47,-58,-68,-77,-84,-89,-91,-91,-89,-86,-81,-77,-72,-68,-63,-59,-55,-51,-46,-41,-36,-30,-25,-19,-14,-10,-6,-2,3,8,13,18,24,30,36,41,44,47,49,49,49,48,47,46,45,44,43,41,40,39,37,35,33,31,29,27,26,24,23,21,19,18,15,13,11,8,6,5,3,2,2,2,3,3,4,5,6,7,8,9,10,11,12,13,15,16,18,19,21,22,24,25,27,29,30,33,35,37,39,40,41,42,43,43,43,42,42,41,40,40,39,38,38,37,36,35,34,34,33,32,31,31,30,30,29,29,28,27,27,26,25,25,24,24,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,24,25,25,26,27,27,27,27,27,27,26,25,24,22,21,19,18,16,15,13,12,11,10,10,11,13,15,19,23,28,32,37,42,45,49,51,54,57,60,63,67,71,74,77,78,78,76,72,68,64,61,59,59,60,62,64,65,65,62,58,51,44,37,31,27,24,23,22,22,19,15,8,-2,-14,-27,-40,-52,-62,-70,-75,-79,-82,-84,-87,-89,-92,-94,-97,-98,-99,-99,-100,-101,-106,-114,-127,-147,-171,-201,-231,-260,-281,-288,-276,-239,-173,-77,48,194,355,517,667,794,885,933,934,889,803,687,552,410,273,149,46,-34,-92,-131,-153,-164,-167,-167,-164,-161,-157,-154,-151,-149,-148,-149,-150,-152,-153,-151,-146,-137,-122,-104,-83,-60,-40,-22,-10,-2,0,-2,-7,-13,-18,-23,-26,-28,-29,-30,-32,-34,-37,-40,-42,-43,-43,-41,-38,-34,-29,-25,-21,-17,-15,-13,-11,-9,-6,-4,-1,3,6,9,12,14,16,17,18,20,22,23,26,28,31,34,37,41,44,48,52,57,61,66,71,76,82,87,92,97,101,105,108,111,112,113,113,112,111,111,110,110,110,110,110,110,109,108,106,103,100,96,91,87,82,78,73,69,64,60,55,50,45,40,36,31,27,23,19,15,11,7,3,-1,-6,-10,-15,-19,-23,-26,-29,-31,-32,-33,-33,-34,-34,-34,-34,-34,-35,-35,-35,-35,-35,-35,-34,-33,-32,-30,-28,-27,-25,-23,-22,-20,-19,-17,-15,-13,-12,-10,-8,-6,-4,-2,0,1,3,5,7,9,12,14,16,18,19,21,22,24,24,25,26,26,27,27,27,27,27,27,28,28,28,29,29,30,31,31,32,33,35,36,37,39,40,42,43,44,46,46,47,47,47,47,46,46,45,44,43,42,42,41,40,39,38,38,37,36,36,36,35,35,35,35,34,34,34,33,33,33,32,32,32,32,31,31,30,30,30,29,29,29,29,28,28,28,27,27,27,26,26,25,25,24,24,23,22,22,21,20,19,18,18,18,17,17,17,17,17,17,18,18,18,19,20,21,22,22,23,23,22,22,21,21,21,21,21,22,22,21,21,19,18,16,15,15,16,18,20,23,26,28,29,28,27,25,23,22,22,23,26,29,34,38,42,45,47,48,49,50,51,52,55,58,62,66,70,73,74,74,74,72,70,68,66,64,63,62,61,60,58,56,54,52,50,47,45,43,41,40,39,37,35,32,27,22,17,11,7,3,0,0,0,2,4,6,7,9,10,12,16,21,29,37,45,51,51,45,31,11,-16,-44,-73,-97,-116,-128,-135,-137,-139,-144,-154,-170,-191,-213,-231,-241,-237,-216,-177,-119,-46,39,133,230,328,423,513,595,666,722,757,768,751,703,626,524,404,275,149,35,-60,-130,-175,-198,-204,-201,-194,-189,-188,-191,-196,-199,-197,-188,-171,-146,-118,-88,-62,-41,-27,-21,-20,-23,-26,-29,-29,-27,-23,-17,-13,-9,-7,-7,-8,-10,-10,-9,-7,-4,1,6,10,14,17,18,19,20,21,21,23,24,26,27,28,28,28,26,24,20,17,13,10,8,7,7,8,9,11,12,12,12,11,11,12,14,19,27,35,44,53,59,62,62,59,54,51,49,52,59,72,89,109,129,148,162,173,177,178,174,169,163,158,154,151,149,147,145,140,135,127,118,109,100,91,82,75,68,61,54,46,37,28,18,7,-5,-16,-26,-37,-46,-54,-61,-66,-69,-70,-70,-68,-64,-61,-56,-52,-48,-43,-40,-36,-32,-28,-24,-19,-15,-11,-7,-3,0,3,6,10,13,17,21,25,29,33,36,38,40,41,41,41,41,40,40,40,40,39,39,39,38,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,31,31,32,32,32,33,33,34,35,35,36,37,38,38,39,40,41,41,42,42,42,42,41,41,41,41,40,40,39,39,38,38,38,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,39,39,38,38,38,37,37,36,35,35,34,34,33,32,32,31,31,30,29,28,27,27,26,25,24,23,22,21,20,18,17,16,15,14,14,14,13,14,14,14,14,15,15,16,16,17,18,18,19,19,19,19,19,18,17,16,15,14,13,12,11,10,9,8,7,7,7,8,9,11,13,15,18,20,22,24,25,27,28,30,33,35,39,42,46,50,54,58,62,66,70,75,80,86,91,96,100,103,105,106,105,104,102,100,98,96,94,93,91,89,87,85,81,78,74,69,65,60,54,47,40,31,22,13,3,-7,-16,-24,-31,-38,-43,-48,-53,-56,-58,-58,-56,-52,-47,-39,-31,-23,-15,-9,-5,-4,-5,-9,-16,-25,-37,-51,-69,-89,-112,-137,-164,-192,-219,-244,-266,-283,-293,-293,-281,-254,-209,-145,-60,45,168,305,448,588,717,823,899,938,937,898,825,725,607,481,357,241,139,54,-14,-68,-109,-142,-168,-189,-206,-220,-230,-236,-236,-231,-222,-209,-194,-177,-159,-142,-125,-110,-95,-82,-69,-59,-50,-43,-38,-34,-32,-30,-28,-25,-22,-18,-13,-8,-3,2,6,9,12,14,15,17,18,21,23,26,29,32,34,36,36,36,35,33,31,29,27,24,21,18,15,11,7,3,-1,-5,-8,-10,-11,-10,-8,-5,-1,4,8,13,16,19,22,25,28,31,36,42,48,56,64,73,81,90,99,108,118,129,141,153,165,176,186,193,197,197,195,190,183,174,166,157,149,142,135,128,120,112,103,93,83,72,61,51,41,32,22,12,0,-12,-24,-37,-51,-63,-73,-82,-88,-91,-92,-90,-87,-83,-79,-75,-71,-67,-63,-58,-54,-49,-44,-39,-33,-28,-24,-20,-16,-13,-9,-6,-2,3,7,12,17,21,25,29,31,33,34,34,34,33,33,33,32,32,32,31,31,30,29,28,26,25,24,23,22,21,20,19,17,16,14,13,11,9,8,7,7,7,7,8,9,10,12,13,14,15,16,17,18,19,21,22,24,26,28,29,31,33,35,37,39,42,44,47,49,52,54,55,56,57,57,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,44,43,43,42,42,42,41,41,41,40,40,39,39,38,38,38,37,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,27,26,26,25,24,23,22,20,19,18,18,17,17,17,17,18,18,19,19,20,21,21,22,23,24,25,25,26,26,25,24,23,22,21,20,19,19,18,18,18,17,16,16,16,16,17,18,21,24,27,30,32,33,34,33,32,31,31,32,35,41,48,56,65,75,84,92,98,103,106,107,107,107,106,105,104,103,102,101,99,96,93,88,83,76,69,61,53,46,39,33,28,23,20,16,13,9,4,0,-4,-8,-10,-11,-11,-11,-11,-14,-19,-29,-42,-58,-76,-95,-111,-123,-130,-130,-125,-116,-105,-94,-86,-84,-88,-100,-119,-142,-167,-189,-203,-205,-190,-152,-90,-2,110,242,385,531,668,784,869,915,918,877,796,685,553,412,275,151,47,-34,-92,-130,-153,-165,-172,-177,-181,-185,-188,-188,-185,-177,-166,-151,-136,-121,-109,-99,-93,-90,-89,-89,-89,-88,-86,-84,-81,-79,-77,-76,-76,-75,-74,-72,-68,-62,-54,-46,-37,-28,-19,-11,-2,6,14,23,31,40,48,56,62,66,69,70,71,70,69,69,68,69,69,70,70,70,70,69,68,67,66,65,65,65,65,65,65,64,62,60,58,56,54,54,55,57,60,65,70,75,80,85,89,93,97,101,106,111,117,123,127,130,131,129,125,118,111,103,95,88,83,79,76,74,72,69,65,59,53,47,40,34,28,23,19,15,11,7,2,-3,-8,-13,-18,-22,-25,-27,-28,-29,-29,-30,-31,-33,-35,-37,-39,-40,-41,-42,-41,-39,-37,-34,-31,-29,-26,-23,-21,-18,-16,-13,-10,-7,-3,0,4,8,12,16,20,25,29,34,39,44,50,55,61,66,70,74,77,78,79,78,77,76,74,72,71,69,67,66,64,62,60,58,56,54,52,50,48,47,45,44,42,40,38,36,33";
          PFData = PFData.split(",");
          var PFDataArray = [];
          for (var i = 0; i < PFData.length; i++) {
            PFDataArray[i] = PFData[i];
          }
          PFDataArray = PFDataArray.splice(0, 3000);
          var leadOneData = PFDataArray.toString();
          HigiKioskStorageService.saveSessionData('ZugECGlead1SmoothGraph', leadOneData.split(","));
          document.getElementById("ecg_result_one").innerHTML = "";
          var leadFirstData = [];
          leadFirstData = leadOneData.split(",");
          var leadISliced = 0;
          leadISliced = leadFirstData.slice(500, 3000);
          $scope.localResultChart(leadISliced);
          leadISliced = new Array();
          $scope.ZugThreeLeadModeLeadICompleted();
        } else if (reading_lead == 2) {
          $rootScope.lead2PythonSocketSuccess = true;
          //Sample Filtered Data
          //PFData = "4,3,3,2,1,0,-1,-2,-3,-4,-4,-4,-4,-4,-3,-2,-2,-1,-1,0,1,1,2,3,4,4,5,6,7,9,10,11,13,14,15,16,17,18,18,18,18,18,18,19,19,20,20,20,20,20,20,20,20,21,22,23,25,26,27,28,28,28,28,28,29,30,32,33,35,35,35,34,32,30,28,27,27,28,30,33,35,35,34,31,26,21,16,12,11,11,14,19,23,26,27,25,21,15,8,2,-2,-3,-1,3,9,16,22,26,28,28,26,24,23,22,23,26,31,36,42,47,51,55,58,61,65,69,74,80,86,91,94,96,96,93,88,81,74,66,58,51,44,37,31,24,17,9,1,-8,-15,-22,-26,-29,-30,-30,-30,-30,-30,-33,-36,-41,-45,-49,-52,-54,-55,-56,-59,-64,-72,-82,-93,-103,-110,-112,-108,-98,-85,-73,-66,-67,-80,-103,-132,-162,-183,-186,-163,-110,-27,82,209,340,463,565,638,676,680,654,604,541,472,403,338,278,222,167,112,54,-4,-61,-113,-155,-186,-204,-209,-203,-190,-173,-157,-143,-132,-123,-117,-110,-102,-91,-79,-66,-54,-45,-40,-39,-42,-47,-53,-58,-60,-60,-58,-54,-50,-46,-44,-43,-43,-43,-43,-43,-41,-37,-33,-28,-23,-20,-17,-15,-14,-13,-12,-11,-9,-6,-3,0,2,5,7,9,10,11,12,13,15,16,18,21,23,26,30,33,36,39,42,44,45,47,49,51,54,57,61,66,70,73,76,76,76,74,71,69,66,65,65,66,68,70,72,74,74,73,71,69,66,65,64,64,65,67,69,70,70,69,67,63,57,51,44,36,28,20,11,2,-7,-16,-26,-36,-45,-54,-62,-69,-74,-79,-82,-85,-87,-89,-90,-93,-95,-98,-101,-103,-106,-107,-108,-108,-106,-104,-101,-97,-93,-89,-85,-82,-78,-75,-72,-68,-64,-59,-55,-49,-44,-38,-33,-27,-21,-15,-9,-2,5,12,19,27,33,39,44,48,50,50,50,48,46,44,42,39,37,35,33,31,28,26,23,20,18,15,13,11,9,7,5,3,0,-3,-5,-8,-11,-13,-15,-16,-16,-16,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-3,-2,0,1,3,4,6,7,9,10,12,14,16,18,20,22,23,24,24,24,24,24,23,23,22,22,21,21,20,20,19,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,19,21,23,25,27,29,31,34,36,39,41,42,44,44,45,45,45,44,44,43,42,41,40,39,38,36,35,34,33,33,32,32,32,31,29,28,26,24,22,20,19,18,16,14,12,9,6,4,2,1,2,4,7,10,12,12,11,8,4,-1,-5,-8,-12,-16,-21,-30,-42,-58,-77,-95,-112,-123,-128,-126,-119,-112,-107,-112,-128,-157,-196,-241,-282,-309,-312,-284,-221,-126,-3,136,278,411,523,608,661,684,680,655,616,567,510,449,381,307,226,140,52,-33,-110,-174,-221,-249,-260,-256,-243,-225,-207,-193,-183,-178,-174,-170,-164,-154,-141,-125,-109,-94,-83,-75,-72,-70,-69,-66,-61,-52,-40,-26,-12,1,11,18,21,21,20,18,17,17,17,19,21,22,23,23,21,19,16,13,11,8,7,6,6,5,5,4,3,0,-3,-7,-11,-14,-16,-17,-15,-12,-7,-1,4,8,10,10,8,6,4,3,6,11,20,30,42,53,63,70,74,77,78,80,84,91,101,113,126,138,149,155,156,154,147,138,128,119,111,105,100,97,93,89,83,75,66,56,46,36,27,19,12,4,-3,-12,-22,-33,-46,-58,-69,-79,-86,-90,-92,-92,-89,-86,-82,-78,-74,-70,-67,-63,-59,-54,-49,-43,-38,-32,-27,-23,-19,-16,-13,-10,-7,-2,2,8,13,19,23,27,30,31,32,33,33,34,35,36,37,37,37,36,34,32,29,27,27,27,29,32,35,38,39,40,38,35,31,27,24,22,23,25,28,33,37,40,41,40,38,34,30,27,24,23,23,23,25,26,27,27,26,24,23,21,20,19,19,20,20,20,20,20,19,18,17,16,16,16,16,16,17,17,17,17,17,16,16,15,15,15,16,16,16,17,17,17,17,17,17,17,18,18,19,19,20,20,20,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,10,9,8,7,6,5,4,2,1,0,-2,-3,-5,-6,-7,-8,-9,-9,-9,-8,-8,-7,-6,-5,-4,-4,-3,-2,-2,-1,0,1,2,3,5,6,7,8,9,11,12,13,14,16,17,19,20,21,21,22,22,21,21,20,19,18,17,17,16,16,16,15,14,13,12,10,9,7,6,5,4,2,1,-1,-3,-5,-7,-9,-11,-12,-13,-13,-12,-10,-8,-6,-5,-3,-2,-1,0,2,4,7,10,13,16,18,19,19,19,19,19,19,21,24,27,31,35,38,39,39,37,35,32,31,31,34,39,46,54,63,71,77,82,83,83,81,78,75,72,69,67,65,62,59,53,46,38,29,20,12,5,0,-3,-5,-5,-5,-5,-5,-6,-7,-7,-7,-6,-4,-1,2,4,4,1,-5,-16,-29,-44,-59,-73,-83,-89,-90,-89,-85,-81,-78,-77,-80,-85,-93,-102,-112,-122,-133,-145,-160,-179,-202,-227,-251,-269,-273,-256,-213,-139,-32,104,261,430,596,745,864,943,975,960,902,808,688,554,417,287,171,71,-11,-77,-128,-167,-197,-220,-237,-247,-252,-252,-247,-239,-230,-220,-212,-206,-203,-201,-200,-197,-191,-181,-167,-150,-129,-108,-87,-69,-54,-43,-36,-32,-30,-30,-30,-31,-31,-30,-30,-30,-31,-32,-33,-34,-35,-34,-33,-30,-26,-21,-16,-11,-5,0,4,9,13,17,21,25,29,32,35,37,39,40,41,41,40,40,40,40,40,40,41,42,43,44,46,49,52,55,59,64,68,74,79,84,89,94,98,101,104,106,107,107,106,104,101,98,94,90,86,81,77,74,70,67,63,60,57,53,49,44,39,34,28,22,15,9,3,-3,-9,-14,-19,-23,-26,-29,-31,-33,-35,-36,-37,-38,-39,-41,-42,-44,-45,-46,-47,-47,-46,-45,-44,-42,-41,-39,-37,-35,-33,-31,-29,-26,-24,-22,-20,-18,-17,-15,-14,-13,-12,-11,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-1,0,2,4,6,8,10,12,14,16,19,21,23,25,26,27,28,28,27,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,11,10,9,9,8,7,6,5,4,3,3,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,14,14,14,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,15,16,16,16,17,17,18,19,19,20,21,21,22,22,23,24,24,25,26,27,27,28,29,30,31,32,34,35,37,38,39,40,41,41,41,41,41,40,40,38,36,34,31,28,25,21,18,15,12,10,7,4,1,-3,-8,-12,-17,-21,-24,-26,-27,-26,-24,-23,-21,-21,-22,-25,-31,-39,-49,-62,-74,-87,-100,-111,-120,-127,-133,-138,-143,-149,-157,-164,-171,-174,-170,-154,-123,-72,-1,91,201,323,451,573,680,764,817,835,816,764,683,582,470,355,246,147,63,-6,-60,-102,-133,-157,-177,-193,-207,-218,-227,-232,-232,-228,-219,-205,-188,-168,-147,-126,-106,-88,-72,-60,-52,-47,-44,-44,-46,-49,-52,-55,-57,-59,-60,-60,-60,-59,-58,-57,-54,-52,-48,-44,-39,-33,-27,-21,-14,-9,-3,2,7,11,15,19,22,24,26,28,30,31,32,33,33,34,35,36,37,38,39,41,42,44,47,49,52,54,57,59,61,64,66,68,70,73,75,77,79,81,83,84,85,86,88,90,92,94,96,99,101,102,102,102,100,97,93,88,83,78,72,67,62,57,51,46,41,35,30,24,19,15,10,6,2,-2,-6,-10,-14,-19,-23,-28,-32,-36,-39,-42,-44,-45,-46,-47,-47,-47,-46,-46,-46,-46,-46,-46,-46,-46,-45,-44,-42,-41,-38,-36,-34,-31,-29,-27,-25,-23,-21,-19,-17,-14,-12,-8,-5,-2,2,5,9,13,17,21,25,30,34,39,43,47,50,52,53,53,53,51,50,48,47,45,43,42,40,39,37,35,33,31,29,28,26,24,23,22,20,19,17,15,13,11,9,8,7,6,5,5,5,6,6,7,8,8,9,9,10,10,11,12,13,14,15,15,16,17,18,18,19,20,21,22,23,24,25,26,27,27,27,28,28,28,28,27,27,27,26,26,26,25,25,25,25,24,24,24,24,24,24,24,24,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,19,19,19,19,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,17,17,17,17,17,17,17,16,15,13,12,11,10,9,7,6,5,3,1,0,-1,-2,-2,-2,-1,1,3,5,7,9,11,12,13,14,15,17,19,22,25,29,33,37,40,44,48,52,57,63,69,76,82,88,93,96,97,96,93,89,85,80,75,71,66,61,55,48,41,33,25,19,13,9,6,4,2,0,-3,-7,-13,-19,-24,-29,-31,-32,-32,-32,-33,-37,-44,-54,-66,-78,-87,-92,-92,-86,-75,-63,-51,-42,-39,-41,-49,-59,-69,-76,-80,-80,-80,-83,-93,-114,-146,-187,-232,-272,-298,-299,-269,-202,-101,28,174,326,469,591,684,743,768,764,735,688,630,564,494,419,341,259,176,94,16,-53,-108,-147,-170,-177,-173,-161,-148,-139,-135,-139,-148,-162,-176,-187,-193,-192,-184,-172,-156,-139,-123,-110,-99,-90,-82,-76,-69,-61,-54,-46,-38,-30,-24,-17,-11,-4,3,10,18,25,31,37,41,43,44,45,44,44,44,44,45,46,47,48,48,48,47,45,43,41,39,37,35,33,31,30,28,26,24,22,20,18,17,16,16,17,19,21,24,27,30,33,35,36,37,37,38,39,42,45,50,56,63,70,77,85,92,99,105,112,118,124,129,134,136,137,136,132,128,121,115,108,101,95,90,85,80,74,68,61,53,45,36,27,19,10,2,-7,-16,-26,-36,-47,-58,-68,-77,-84,-89,-91,-91,-89,-86,-81,-77,-72,-68,-63,-59,-55,-51,-46,-41,-36,-30,-25,-19,-14,-10,-6,-2,3,8,13,18,24,30,36,41,44,47,49,49,49,48,47,46,45,44,43,41,40,39,37,35,33,31,29,27,26,24,23,21,19,18,15,13,11,8,6,5,3,2,2,2,3,3,4,5,6,7,8,9,10,11,12,13,15,16,18,19,21,22,24,25,27,29,30,33,35,37,39,40,41,42,43,43,43,42,42,41,40,40,39,38,38,37,36,35,34,34,33,32,31,31,30,30,29,29,28,27,27,26,25,25,24,24,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,24,25,25,26,27,27,27,27,27,27,26,25,24,22,21,19,18,16,15,13,12,11,10,10,11,13,15,19,23,28,32,37,42,45,49,51,54,57,60,63,67,71,74,77,78,78,76,72,68,64,61,59,59,60,62,64,65,65,62,58,51,44,37,31,27,24,23,22,22,19,15,8,-2,-14,-27,-40,-52,-62,-70,-75,-79,-82,-84,-87,-89,-92,-94,-97,-98,-99,-99,-100,-101,-106,-114,-127,-147,-171,-201,-231,-260,-281,-288,-276,-239,-173,-77,48,194,355,517,667,794,885,933,934,889,803,687,552,410,273,149,46,-34,-92,-131,-153,-164,-167,-167,-164,-161,-157,-154,-151,-149,-148,-149,-150,-152,-153,-151,-146,-137,-122,-104,-83,-60,-40,-22,-10,-2,0,-2,-7,-13,-18,-23,-26,-28,-29,-30,-32,-34,-37,-40,-42,-43,-43,-41,-38,-34,-29,-25,-21,-17,-15,-13,-11,-9,-6,-4,-1,3,6,9,12,14,16,17,18,20,22,23,26,28,31,34,37,41,44,48,52,57,61,66,71,76,82,87,92,97,101,105,108,111,112,113,113,112,111,111,110,110,110,110,110,110,109,108,106,103,100,96,91,87,82,78,73,69,64,60,55,50,45,40,36,31,27,23,19,15,11,7,3,-1,-6,-10,-15,-19,-23,-26,-29,-31,-32,-33,-33,-34,-34,-34,-34,-34,-35,-35,-35,-35,-35,-35,-34,-33,-32,-30,-28,-27,-25,-23,-22,-20,-19,-17,-15,-13,-12,-10,-8,-6,-4,-2,0,1,3,5,7,9,12,14,16,18,19,21,22,24,24,25,26,26,27,27,27,27,27,27,28,28,28,29,29,30,31,31,32,33,35,36,37,39,40,42,43,44,46,46,47,47,47,47,46,46,45,44,43,42,42,41,40,39,38,38,37,36,36,36,35,35,35,35,34,34,34,33,33,33,32,32,32,32,31,31,30,30,30,29,29,29,29,28,28,28,27,27,27,26,26,25,25,24,24,23,22,22,21,20,19,18,18,18,17,17,17,17,17,17,18,18,18,19,20,21,22,22,23,23,22,22,21,21,21,21,21,22,22,21,21,19,18,16,15,15,16,18,20,23,26,28,29,28,27,25,23,22,22,23,26,29,34,38,42,45,47,48,49,50,51,52,55,58,62,66,70,73,74,74,74,72,70,68,66,64,63,62,61,60,58,56,54,52,50,47,45,43,41,40,39,37,35,32,27,22,17,11,7,3,0,0,0,2,4,6,7,9,10,12,16,21,29,37,45,51,51,45,31,11,-16,-44,-73,-97,-116,-128,-135,-137,-139,-144,-154,-170,-191,-213,-231,-241,-237,-216,-177,-119,-46,39,133,230,328,423,513,595,666,722,757,768,751,703,626,524,404,275,149,35,-60,-130,-175,-198,-204,-201,-194,-189,-188,-191,-196,-199,-197,-188,-171,-146,-118,-88,-62,-41,-27,-21,-20,-23,-26,-29,-29,-27,-23,-17,-13,-9,-7,-7,-8,-10,-10,-9,-7,-4,1,6,10,14,17,18,19,20,21,21,23,24,26,27,28,28,28,26,24,20,17,13,10,8,7,7,8,9,11,12,12,12,11,11,12,14,19,27,35,44,53,59,62,62,59,54,51,49,52,59,72,89,109,129,148,162,173,177,178,174,169,163,158,154,151,149,147,145,140,135,127,118,109,100,91,82,75,68,61,54,46,37,28,18,7,-5,-16,-26,-37,-46,-54,-61,-66,-69,-70,-70,-68,-64,-61,-56,-52,-48,-43,-40,-36,-32,-28,-24,-19,-15,-11,-7,-3,0,3,6,10,13,17,21,25,29,33,36,38,40,41,41,41,41,40,40,40,40,39,39,39,38,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,31,31,32,32,32,33,33,34,35,35,36,37,38,38,39,40,41,41,42,42,42,42,41,41,41,41,40,40,39,39,38,38,38,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,39,39,38,38,38,37,37,36,35,35,34,34,33,32,32,31,31,30,29,28,27,27,26,25,24,23,22,21,20,18,17,16,15,14,14,14,13,14,14,14,14,15,15,16,16,17,18,18,19,19,19,19,19,18,17,16,15,14,13,12,11,10,9,8,7,7,7,8,9,11,13,15,18,20,22,24,25,27,28,30,33,35,39,42,46,50,54,58,62,66,70,75,80,86,91,96,100,103,105,106,105,104,102,100,98,96,94,93,91,89,87,85,81,78,74,69,65,60,54,47,40,31,22,13,3,-7,-16,-24,-31,-38,-43,-48,-53,-56,-58,-58,-56,-52,-47,-39,-31,-23,-15,-9,-5,-4,-5,-9,-16,-25,-37,-51,-69,-89,-112,-137,-164,-192,-219,-244,-266,-283,-293,-293,-281,-254,-209,-145,-60,45,168,305,448,588,717,823,899,938,937,898,825,725,607,481,357,241,139,54,-14,-68,-109,-142,-168,-189,-206,-220,-230,-236,-236,-231,-222,-209,-194,-177,-159,-142,-125,-110,-95,-82,-69,-59,-50,-43,-38,-34,-32,-30,-28,-25,-22,-18,-13,-8,-3,2,6,9,12,14,15,17,18,21,23,26,29,32,34,36,36,36,35,33,31,29,27,24,21,18,15,11,7,3,-1,-5,-8,-10,-11,-10,-8,-5,-1,4,8,13,16,19,22,25,28,31,36,42,48,56,64,73,81,90,99,108,118,129,141,153,165,176,186,193,197,197,195,190,183,174,166,157,149,142,135,128,120,112,103,93,83,72,61,51,41,32,22,12,0,-12,-24,-37,-51,-63,-73,-82,-88,-91,-92,-90,-87,-83,-79,-75,-71,-67,-63,-58,-54,-49,-44,-39,-33,-28,-24,-20,-16,-13,-9,-6,-2,3,7,12,17,21,25,29,31,33,34,34,34,33,33,33,32,32,32,31,31,30,29,28,26,25,24,23,22,21,20,19,17,16,14,13,11,9,8,7,7,7,7,8,9,10,12,13,14,15,16,17,18,19,21,22,24,26,28,29,31,33,35,37,39,42,44,47,49,52,54,55,56,57,57,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,44,43,43,42,42,42,41,41,41,40,40,39,39,38,38,38,37,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,27,26,26,25,24,23,22,20,19,18,18,17,17,17,17,18,18,19,19,20,21,21,22,23,24,25,25,26,26,25,24,23,22,21,20,19,19,18,18,18,17,16,16,16,16,17,18,21,24,27,30,32,33,34,33,32,31,31,32,35,41,48,56,65,75,84,92,98,103,106,107,107,107,106,105,104,103,102,101,99,96,93,88,83,76,69,61,53,46,39,33,28,23,20,16,13,9,4,0,-4,-8,-10,-11,-11,-11,-11,-14,-19,-29,-42,-58,-76,-95,-111,-123,-130,-130,-125,-116,-105,-94,-86,-84,-88,-100,-119,-142,-167,-189,-203,-205,-190,-152,-90,-2,110,242,385,531,668,784,869,915,918,877,796,685,553,412,275,151,47,-34,-92,-130,-153,-165,-172,-177,-181,-185,-188,-188,-185,-177,-166,-151,-136,-121,-109,-99,-93,-90,-89,-89,-89,-88,-86,-84,-81,-79,-77,-76,-76,-75,-74,-72,-68,-62,-54,-46,-37,-28,-19,-11,-2,6,14,23,31,40,48,56,62,66,69,70,71,70,69,69,68,69,69,70,70,70,70,69,68,67,66,65,65,65,65,65,65,64,62,60,58,56,54,54,55,57,60,65,70,75,80,85,89,93,97,101,106,111,117,123,127,130,131,129,125,118,111,103,95,88,83,79,76,74,72,69,65,59,53,47,40,34,28,23,19,15,11,7,2,-3,-8,-13,-18,-22,-25,-27,-28,-29,-29,-30,-31,-33,-35,-37,-39,-40,-41,-42,-41,-39,-37,-34,-31,-29,-26,-23,-21,-18,-16,-13,-10,-7,-3,0,4,8,12,16,20,25,29,34,39,44,50,55,61,66,70,74,77,78,79,78,77,76,74,72,71,69,67,66,64,62,60,58,56,54,52,50,48,47,45,44,42,40,38,36,33";
          PFData = PFData.split(",");
          var PFDataArray = [];
          for (var i = 0; i < PFData.length; i++) {
            PFDataArray[i] = PFData[i];
          }
          PFDataArray = PFDataArray.splice(0, 3000);
          var leadTwoData = PFDataArray.toString();
          HigiKioskStorageService.saveSessionData('ZugECGlead2SmoothGraph', leadTwoData.split(","));
          document.getElementById("ecg_result_two").innerHTML = "";
          var leadSecondData = [];
          leadSecondData = leadTwoData.split(",");
          var leadIISliced = 0;
          leadIISliced = leadSecondData.slice(500, 3000);
          $scope.localResult(leadIISliced);
          leadIISliced = new Array();
          $scope.ZugThreeLeadModeLeadIICompleted();
          $scope.stablecount(RRIntervalArrayDiff, $scope.leadMode);

        } else if (reading_lead == 3) {

          $rootScope.lead3PythonSocketSuccess = true;
          document.getElementById("ecg_result_three").innerHTML = "";
          //Sample Filtered Data
          //PFData = "4,3,3,2,1,0,-1,-2,-3,-4,-4,-4,-4,-4,-3,-2,-2,-1,-1,0,1,1,2,3,4,4,5,6,7,9,10,11,13,14,15,16,17,18,18,18,18,18,18,19,19,20,20,20,20,20,20,20,20,21,22,23,25,26,27,28,28,28,28,28,29,30,32,33,35,35,35,34,32,30,28,27,27,28,30,33,35,35,34,31,26,21,16,12,11,11,14,19,23,26,27,25,21,15,8,2,-2,-3,-1,3,9,16,22,26,28,28,26,24,23,22,23,26,31,36,42,47,51,55,58,61,65,69,74,80,86,91,94,96,96,93,88,81,74,66,58,51,44,37,31,24,17,9,1,-8,-15,-22,-26,-29,-30,-30,-30,-30,-30,-33,-36,-41,-45,-49,-52,-54,-55,-56,-59,-64,-72,-82,-93,-103,-110,-112,-108,-98,-85,-73,-66,-67,-80,-103,-132,-162,-183,-186,-163,-110,-27,82,209,340,463,565,638,676,680,654,604,541,472,403,338,278,222,167,112,54,-4,-61,-113,-155,-186,-204,-209,-203,-190,-173,-157,-143,-132,-123,-117,-110,-102,-91,-79,-66,-54,-45,-40,-39,-42,-47,-53,-58,-60,-60,-58,-54,-50,-46,-44,-43,-43,-43,-43,-43,-41,-37,-33,-28,-23,-20,-17,-15,-14,-13,-12,-11,-9,-6,-3,0,2,5,7,9,10,11,12,13,15,16,18,21,23,26,30,33,36,39,42,44,45,47,49,51,54,57,61,66,70,73,76,76,76,74,71,69,66,65,65,66,68,70,72,74,74,73,71,69,66,65,64,64,65,67,69,70,70,69,67,63,57,51,44,36,28,20,11,2,-7,-16,-26,-36,-45,-54,-62,-69,-74,-79,-82,-85,-87,-89,-90,-93,-95,-98,-101,-103,-106,-107,-108,-108,-106,-104,-101,-97,-93,-89,-85,-82,-78,-75,-72,-68,-64,-59,-55,-49,-44,-38,-33,-27,-21,-15,-9,-2,5,12,19,27,33,39,44,48,50,50,50,48,46,44,42,39,37,35,33,31,28,26,23,20,18,15,13,11,9,7,5,3,0,-3,-5,-8,-11,-13,-15,-16,-16,-16,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-3,-2,0,1,3,4,6,7,9,10,12,14,16,18,20,22,23,24,24,24,24,24,23,23,22,22,21,21,20,20,19,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,19,21,23,25,27,29,31,34,36,39,41,42,44,44,45,45,45,44,44,43,42,41,40,39,38,36,35,34,33,33,32,32,32,31,29,28,26,24,22,20,19,18,16,14,12,9,6,4,2,1,2,4,7,10,12,12,11,8,4,-1,-5,-8,-12,-16,-21,-30,-42,-58,-77,-95,-112,-123,-128,-126,-119,-112,-107,-112,-128,-157,-196,-241,-282,-309,-312,-284,-221,-126,-3,136,278,411,523,608,661,684,680,655,616,567,510,449,381,307,226,140,52,-33,-110,-174,-221,-249,-260,-256,-243,-225,-207,-193,-183,-178,-174,-170,-164,-154,-141,-125,-109,-94,-83,-75,-72,-70,-69,-66,-61,-52,-40,-26,-12,1,11,18,21,21,20,18,17,17,17,19,21,22,23,23,21,19,16,13,11,8,7,6,6,5,5,4,3,0,-3,-7,-11,-14,-16,-17,-15,-12,-7,-1,4,8,10,10,8,6,4,3,6,11,20,30,42,53,63,70,74,77,78,80,84,91,101,113,126,138,149,155,156,154,147,138,128,119,111,105,100,97,93,89,83,75,66,56,46,36,27,19,12,4,-3,-12,-22,-33,-46,-58,-69,-79,-86,-90,-92,-92,-89,-86,-82,-78,-74,-70,-67,-63,-59,-54,-49,-43,-38,-32,-27,-23,-19,-16,-13,-10,-7,-2,2,8,13,19,23,27,30,31,32,33,33,34,35,36,37,37,37,36,34,32,29,27,27,27,29,32,35,38,39,40,38,35,31,27,24,22,23,25,28,33,37,40,41,40,38,34,30,27,24,23,23,23,25,26,27,27,26,24,23,21,20,19,19,20,20,20,20,20,19,18,17,16,16,16,16,16,17,17,17,17,17,16,16,15,15,15,16,16,16,17,17,17,17,17,17,17,18,18,19,19,20,20,20,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,10,9,8,7,6,5,4,2,1,0,-2,-3,-5,-6,-7,-8,-9,-9,-9,-8,-8,-7,-6,-5,-4,-4,-3,-2,-2,-1,0,1,2,3,5,6,7,8,9,11,12,13,14,16,17,19,20,21,21,22,22,21,21,20,19,18,17,17,16,16,16,15,14,13,12,10,9,7,6,5,4,2,1,-1,-3,-5,-7,-9,-11,-12,-13,-13,-12,-10,-8,-6,-5,-3,-2,-1,0,2,4,7,10,13,16,18,19,19,19,19,19,19,21,24,27,31,35,38,39,39,37,35,32,31,31,34,39,46,54,63,71,77,82,83,83,81,78,75,72,69,67,65,62,59,53,46,38,29,20,12,5,0,-3,-5,-5,-5,-5,-5,-6,-7,-7,-7,-6,-4,-1,2,4,4,1,-5,-16,-29,-44,-59,-73,-83,-89,-90,-89,-85,-81,-78,-77,-80,-85,-93,-102,-112,-122,-133,-145,-160,-179,-202,-227,-251,-269,-273,-256,-213,-139,-32,104,261,430,596,745,864,943,975,960,902,808,688,554,417,287,171,71,-11,-77,-128,-167,-197,-220,-237,-247,-252,-252,-247,-239,-230,-220,-212,-206,-203,-201,-200,-197,-191,-181,-167,-150,-129,-108,-87,-69,-54,-43,-36,-32,-30,-30,-30,-31,-31,-30,-30,-30,-31,-32,-33,-34,-35,-34,-33,-30,-26,-21,-16,-11,-5,0,4,9,13,17,21,25,29,32,35,37,39,40,41,41,40,40,40,40,40,40,41,42,43,44,46,49,52,55,59,64,68,74,79,84,89,94,98,101,104,106,107,107,106,104,101,98,94,90,86,81,77,74,70,67,63,60,57,53,49,44,39,34,28,22,15,9,3,-3,-9,-14,-19,-23,-26,-29,-31,-33,-35,-36,-37,-38,-39,-41,-42,-44,-45,-46,-47,-47,-46,-45,-44,-42,-41,-39,-37,-35,-33,-31,-29,-26,-24,-22,-20,-18,-17,-15,-14,-13,-12,-11,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-1,0,2,4,6,8,10,12,14,16,19,21,23,25,26,27,28,28,27,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,11,10,9,9,8,7,6,5,4,3,3,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,14,14,14,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,15,16,16,16,17,17,18,19,19,20,21,21,22,22,23,24,24,25,26,27,27,28,29,30,31,32,34,35,37,38,39,40,41,41,41,41,41,40,40,38,36,34,31,28,25,21,18,15,12,10,7,4,1,-3,-8,-12,-17,-21,-24,-26,-27,-26,-24,-23,-21,-21,-22,-25,-31,-39,-49,-62,-74,-87,-100,-111,-120,-127,-133,-138,-143,-149,-157,-164,-171,-174,-170,-154,-123,-72,-1,91,201,323,451,573,680,764,817,835,816,764,683,582,470,355,246,147,63,-6,-60,-102,-133,-157,-177,-193,-207,-218,-227,-232,-232,-228,-219,-205,-188,-168,-147,-126,-106,-88,-72,-60,-52,-47,-44,-44,-46,-49,-52,-55,-57,-59,-60,-60,-60,-59,-58,-57,-54,-52,-48,-44,-39,-33,-27,-21,-14,-9,-3,2,7,11,15,19,22,24,26,28,30,31,32,33,33,34,35,36,37,38,39,41,42,44,47,49,52,54,57,59,61,64,66,68,70,73,75,77,79,81,83,84,85,86,88,90,92,94,96,99,101,102,102,102,100,97,93,88,83,78,72,67,62,57,51,46,41,35,30,24,19,15,10,6,2,-2,-6,-10,-14,-19,-23,-28,-32,-36,-39,-42,-44,-45,-46,-47,-47,-47,-46,-46,-46,-46,-46,-46,-46,-46,-45,-44,-42,-41,-38,-36,-34,-31,-29,-27,-25,-23,-21,-19,-17,-14,-12,-8,-5,-2,2,5,9,13,17,21,25,30,34,39,43,47,50,52,53,53,53,51,50,48,47,45,43,42,40,39,37,35,33,31,29,28,26,24,23,22,20,19,17,15,13,11,9,8,7,6,5,5,5,6,6,7,8,8,9,9,10,10,11,12,13,14,15,15,16,17,18,18,19,20,21,22,23,24,25,26,27,27,27,28,28,28,28,27,27,27,26,26,26,25,25,25,25,24,24,24,24,24,24,24,24,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,19,19,19,19,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,17,17,17,17,17,17,17,16,15,13,12,11,10,9,7,6,5,3,1,0,-1,-2,-2,-2,-1,1,3,5,7,9,11,12,13,14,15,17,19,22,25,29,33,37,40,44,48,52,57,63,69,76,82,88,93,96,97,96,93,89,85,80,75,71,66,61,55,48,41,33,25,19,13,9,6,4,2,0,-3,-7,-13,-19,-24,-29,-31,-32,-32,-32,-33,-37,-44,-54,-66,-78,-87,-92,-92,-86,-75,-63,-51,-42,-39,-41,-49,-59,-69,-76,-80,-80,-80,-83,-93,-114,-146,-187,-232,-272,-298,-299,-269,-202,-101,28,174,326,469,591,684,743,768,764,735,688,630,564,494,419,341,259,176,94,16,-53,-108,-147,-170,-177,-173,-161,-148,-139,-135,-139,-148,-162,-176,-187,-193,-192,-184,-172,-156,-139,-123,-110,-99,-90,-82,-76,-69,-61,-54,-46,-38,-30,-24,-17,-11,-4,3,10,18,25,31,37,41,43,44,45,44,44,44,44,45,46,47,48,48,48,47,45,43,41,39,37,35,33,31,30,28,26,24,22,20,18,17,16,16,17,19,21,24,27,30,33,35,36,37,37,38,39,42,45,50,56,63,70,77,85,92,99,105,112,118,124,129,134,136,137,136,132,128,121,115,108,101,95,90,85,80,74,68,61,53,45,36,27,19,10,2,-7,-16,-26,-36,-47,-58,-68,-77,-84,-89,-91,-91,-89,-86,-81,-77,-72,-68,-63,-59,-55,-51,-46,-41,-36,-30,-25,-19,-14,-10,-6,-2,3,8,13,18,24,30,36,41,44,47,49,49,49,48,47,46,45,44,43,41,40,39,37,35,33,31,29,27,26,24,23,21,19,18,15,13,11,8,6,5,3,2,2,2,3,3,4,5,6,7,8,9,10,11,12,13,15,16,18,19,21,22,24,25,27,29,30,33,35,37,39,40,41,42,43,43,43,42,42,41,40,40,39,38,38,37,36,35,34,34,33,32,31,31,30,30,29,29,28,27,27,26,25,25,24,24,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,24,25,25,26,27,27,27,27,27,27,26,25,24,22,21,19,18,16,15,13,12,11,10,10,11,13,15,19,23,28,32,37,42,45,49,51,54,57,60,63,67,71,74,77,78,78,76,72,68,64,61,59,59,60,62,64,65,65,62,58,51,44,37,31,27,24,23,22,22,19,15,8,-2,-14,-27,-40,-52,-62,-70,-75,-79,-82,-84,-87,-89,-92,-94,-97,-98,-99,-99,-100,-101,-106,-114,-127,-147,-171,-201,-231,-260,-281,-288,-276,-239,-173,-77,48,194,355,517,667,794,885,933,934,889,803,687,552,410,273,149,46,-34,-92,-131,-153,-164,-167,-167,-164,-161,-157,-154,-151,-149,-148,-149,-150,-152,-153,-151,-146,-137,-122,-104,-83,-60,-40,-22,-10,-2,0,-2,-7,-13,-18,-23,-26,-28,-29,-30,-32,-34,-37,-40,-42,-43,-43,-41,-38,-34,-29,-25,-21,-17,-15,-13,-11,-9,-6,-4,-1,3,6,9,12,14,16,17,18,20,22,23,26,28,31,34,37,41,44,48,52,57,61,66,71,76,82,87,92,97,101,105,108,111,112,113,113,112,111,111,110,110,110,110,110,110,109,108,106,103,100,96,91,87,82,78,73,69,64,60,55,50,45,40,36,31,27,23,19,15,11,7,3,-1,-6,-10,-15,-19,-23,-26,-29,-31,-32,-33,-33,-34,-34,-34,-34,-34,-35,-35,-35,-35,-35,-35,-34,-33,-32,-30,-28,-27,-25,-23,-22,-20,-19,-17,-15,-13,-12,-10,-8,-6,-4,-2,0,1,3,5,7,9,12,14,16,18,19,21,22,24,24,25,26,26,27,27,27,27,27,27,28,28,28,29,29,30,31,31,32,33,35,36,37,39,40,42,43,44,46,46,47,47,47,47,46,46,45,44,43,42,42,41,40,39,38,38,37,36,36,36,35,35,35,35,34,34,34,33,33,33,32,32,32,32,31,31,30,30,30,29,29,29,29,28,28,28,27,27,27,26,26,25,25,24,24,23,22,22,21,20,19,18,18,18,17,17,17,17,17,17,18,18,18,19,20,21,22,22,23,23,22,22,21,21,21,21,21,22,22,21,21,19,18,16,15,15,16,18,20,23,26,28,29,28,27,25,23,22,22,23,26,29,34,38,42,45,47,48,49,50,51,52,55,58,62,66,70,73,74,74,74,72,70,68,66,64,63,62,61,60,58,56,54,52,50,47,45,43,41,40,39,37,35,32,27,22,17,11,7,3,0,0,0,2,4,6,7,9,10,12,16,21,29,37,45,51,51,45,31,11,-16,-44,-73,-97,-116,-128,-135,-137,-139,-144,-154,-170,-191,-213,-231,-241,-237,-216,-177,-119,-46,39,133,230,328,423,513,595,666,722,757,768,751,703,626,524,404,275,149,35,-60,-130,-175,-198,-204,-201,-194,-189,-188,-191,-196,-199,-197,-188,-171,-146,-118,-88,-62,-41,-27,-21,-20,-23,-26,-29,-29,-27,-23,-17,-13,-9,-7,-7,-8,-10,-10,-9,-7,-4,1,6,10,14,17,18,19,20,21,21,23,24,26,27,28,28,28,26,24,20,17,13,10,8,7,7,8,9,11,12,12,12,11,11,12,14,19,27,35,44,53,59,62,62,59,54,51,49,52,59,72,89,109,129,148,162,173,177,178,174,169,163,158,154,151,149,147,145,140,135,127,118,109,100,91,82,75,68,61,54,46,37,28,18,7,-5,-16,-26,-37,-46,-54,-61,-66,-69,-70,-70,-68,-64,-61,-56,-52,-48,-43,-40,-36,-32,-28,-24,-19,-15,-11,-7,-3,0,3,6,10,13,17,21,25,29,33,36,38,40,41,41,41,41,40,40,40,40,39,39,39,38,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,31,31,32,32,32,33,33,34,35,35,36,37,38,38,39,40,41,41,42,42,42,42,41,41,41,41,40,40,39,39,38,38,38,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,39,39,38,38,38,37,37,36,35,35,34,34,33,32,32,31,31,30,29,28,27,27,26,25,24,23,22,21,20,18,17,16,15,14,14,14,13,14,14,14,14,15,15,16,16,17,18,18,19,19,19,19,19,18,17,16,15,14,13,12,11,10,9,8,7,7,7,8,9,11,13,15,18,20,22,24,25,27,28,30,33,35,39,42,46,50,54,58,62,66,70,75,80,86,91,96,100,103,105,106,105,104,102,100,98,96,94,93,91,89,87,85,81,78,74,69,65,60,54,47,40,31,22,13,3,-7,-16,-24,-31,-38,-43,-48,-53,-56,-58,-58,-56,-52,-47,-39,-31,-23,-15,-9,-5,-4,-5,-9,-16,-25,-37,-51,-69,-89,-112,-137,-164,-192,-219,-244,-266,-283,-293,-293,-281,-254,-209,-145,-60,45,168,305,448,588,717,823,899,938,937,898,825,725,607,481,357,241,139,54,-14,-68,-109,-142,-168,-189,-206,-220,-230,-236,-236,-231,-222,-209,-194,-177,-159,-142,-125,-110,-95,-82,-69,-59,-50,-43,-38,-34,-32,-30,-28,-25,-22,-18,-13,-8,-3,2,6,9,12,14,15,17,18,21,23,26,29,32,34,36,36,36,35,33,31,29,27,24,21,18,15,11,7,3,-1,-5,-8,-10,-11,-10,-8,-5,-1,4,8,13,16,19,22,25,28,31,36,42,48,56,64,73,81,90,99,108,118,129,141,153,165,176,186,193,197,197,195,190,183,174,166,157,149,142,135,128,120,112,103,93,83,72,61,51,41,32,22,12,0,-12,-24,-37,-51,-63,-73,-82,-88,-91,-92,-90,-87,-83,-79,-75,-71,-67,-63,-58,-54,-49,-44,-39,-33,-28,-24,-20,-16,-13,-9,-6,-2,3,7,12,17,21,25,29,31,33,34,34,34,33,33,33,32,32,32,31,31,30,29,28,26,25,24,23,22,21,20,19,17,16,14,13,11,9,8,7,7,7,7,8,9,10,12,13,14,15,16,17,18,19,21,22,24,26,28,29,31,33,35,37,39,42,44,47,49,52,54,55,56,57,57,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,44,43,43,42,42,42,41,41,41,40,40,39,39,38,38,38,37,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,27,26,26,25,24,23,22,20,19,18,18,17,17,17,17,18,18,19,19,20,21,21,22,23,24,25,25,26,26,25,24,23,22,21,20,19,19,18,18,18,17,16,16,16,16,17,18,21,24,27,30,32,33,34,33,32,31,31,32,35,41,48,56,65,75,84,92,98,103,106,107,107,107,106,105,104,103,102,101,99,96,93,88,83,76,69,61,53,46,39,33,28,23,20,16,13,9,4,0,-4,-8,-10,-11,-11,-11,-11,-14,-19,-29,-42,-58,-76,-95,-111,-123,-130,-130,-125,-116,-105,-94,-86,-84,-88,-100,-119,-142,-167,-189,-203,-205,-190,-152,-90,-2,110,242,385,531,668,784,869,915,918,877,796,685,553,412,275,151,47,-34,-92,-130,-153,-165,-172,-177,-181,-185,-188,-188,-185,-177,-166,-151,-136,-121,-109,-99,-93,-90,-89,-89,-89,-88,-86,-84,-81,-79,-77,-76,-76,-75,-74,-72,-68,-62,-54,-46,-37,-28,-19,-11,-2,6,14,23,31,40,48,56,62,66,69,70,71,70,69,69,68,69,69,70,70,70,70,69,68,67,66,65,65,65,65,65,65,64,62,60,58,56,54,54,55,57,60,65,70,75,80,85,89,93,97,101,106,111,117,123,127,130,131,129,125,118,111,103,95,88,83,79,76,74,72,69,65,59,53,47,40,34,28,23,19,15,11,7,2,-3,-8,-13,-18,-22,-25,-27,-28,-29,-29,-30,-31,-33,-35,-37,-39,-40,-41,-42,-41,-39,-37,-34,-31,-29,-26,-23,-21,-18,-16,-13,-10,-7,-3,0,4,8,12,16,20,25,29,34,39,44,50,55,61,66,70,74,77,78,79,78,77,76,74,72,71,69,67,66,64,62,60,58,56,54,52,50,48,47,45,44,42,40,38,36,33";
          PFData = PFData.split(",");
          var PFDataArray = [];
          for (var i = 0; i < PFData.length; i++) {
            PFDataArray[i] = PFData[i];
          }
          PFDataArray = PFDataArray.splice(0, 3000);
          var leadThreeDataString = PFDataArray.toString();
          HigiKioskStorageService.saveSessionData('ZugECGlead3SmoothGraph', leadThreeDataString.split(","));
          document.getElementById("ecg_result_three").innerHTML = "";
          var leadThreeData = [];
          leadThreeData = leadThreeDataString.split(",");
          var leadIIIsliced = 0;
          leadIIIsliced = leadThreeData.slice(500, 3000);
          $scope.localResult3(leadIIIsliced);
          leadIIIsliced = new Array();
          $scope.ZugThreeLeadModeLeadIIICompleted();
        }
      } else if ($scope.leadMode == 6) {
        if (reading_lead == 1) {
          $rootScope.lead1PythonSocketSuccess = true;
          //Sample Filtered Data
          //PFData = "4,3,3,2,1,0,-1,-2,-3,-4,-4,-4,-4,-4,-3,-2,-2,-1,-1,0,1,1,2,3,4,4,5,6,7,9,10,11,13,14,15,16,17,18,18,18,18,18,18,19,19,20,20,20,20,20,20,20,20,21,22,23,25,26,27,28,28,28,28,28,29,30,32,33,35,35,35,34,32,30,28,27,27,28,30,33,35,35,34,31,26,21,16,12,11,11,14,19,23,26,27,25,21,15,8,2,-2,-3,-1,3,9,16,22,26,28,28,26,24,23,22,23,26,31,36,42,47,51,55,58,61,65,69,74,80,86,91,94,96,96,93,88,81,74,66,58,51,44,37,31,24,17,9,1,-8,-15,-22,-26,-29,-30,-30,-30,-30,-30,-33,-36,-41,-45,-49,-52,-54,-55,-56,-59,-64,-72,-82,-93,-103,-110,-112,-108,-98,-85,-73,-66,-67,-80,-103,-132,-162,-183,-186,-163,-110,-27,82,209,340,463,565,638,676,680,654,604,541,472,403,338,278,222,167,112,54,-4,-61,-113,-155,-186,-204,-209,-203,-190,-173,-157,-143,-132,-123,-117,-110,-102,-91,-79,-66,-54,-45,-40,-39,-42,-47,-53,-58,-60,-60,-58,-54,-50,-46,-44,-43,-43,-43,-43,-43,-41,-37,-33,-28,-23,-20,-17,-15,-14,-13,-12,-11,-9,-6,-3,0,2,5,7,9,10,11,12,13,15,16,18,21,23,26,30,33,36,39,42,44,45,47,49,51,54,57,61,66,70,73,76,76,76,74,71,69,66,65,65,66,68,70,72,74,74,73,71,69,66,65,64,64,65,67,69,70,70,69,67,63,57,51,44,36,28,20,11,2,-7,-16,-26,-36,-45,-54,-62,-69,-74,-79,-82,-85,-87,-89,-90,-93,-95,-98,-101,-103,-106,-107,-108,-108,-106,-104,-101,-97,-93,-89,-85,-82,-78,-75,-72,-68,-64,-59,-55,-49,-44,-38,-33,-27,-21,-15,-9,-2,5,12,19,27,33,39,44,48,50,50,50,48,46,44,42,39,37,35,33,31,28,26,23,20,18,15,13,11,9,7,5,3,0,-3,-5,-8,-11,-13,-15,-16,-16,-16,-16,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-3,-2,0,1,3,4,6,7,9,10,12,14,16,18,20,22,23,24,24,24,24,24,23,23,22,22,21,21,20,20,19,19,18,17,16,15,14,13,12,11,10,9,8,6,5,4,3,2,1,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,16,17,19,21,23,25,27,29,31,34,36,39,41,42,44,44,45,45,45,44,44,43,42,41,40,39,38,36,35,34,33,33,32,32,32,31,29,28,26,24,22,20,19,18,16,14,12,9,6,4,2,1,2,4,7,10,12,12,11,8,4,-1,-5,-8,-12,-16,-21,-30,-42,-58,-77,-95,-112,-123,-128,-126,-119,-112,-107,-112,-128,-157,-196,-241,-282,-309,-312,-284,-221,-126,-3,136,278,411,523,608,661,684,680,655,616,567,510,449,381,307,226,140,52,-33,-110,-174,-221,-249,-260,-256,-243,-225,-207,-193,-183,-178,-174,-170,-164,-154,-141,-125,-109,-94,-83,-75,-72,-70,-69,-66,-61,-52,-40,-26,-12,1,11,18,21,21,20,18,17,17,17,19,21,22,23,23,21,19,16,13,11,8,7,6,6,5,5,4,3,0,-3,-7,-11,-14,-16,-17,-15,-12,-7,-1,4,8,10,10,8,6,4,3,6,11,20,30,42,53,63,70,74,77,78,80,84,91,101,113,126,138,149,155,156,154,147,138,128,119,111,105,100,97,93,89,83,75,66,56,46,36,27,19,12,4,-3,-12,-22,-33,-46,-58,-69,-79,-86,-90,-92,-92,-89,-86,-82,-78,-74,-70,-67,-63,-59,-54,-49,-43,-38,-32,-27,-23,-19,-16,-13,-10,-7,-2,2,8,13,19,23,27,30,31,32,33,33,34,35,36,37,37,37,36,34,32,29,27,27,27,29,32,35,38,39,40,38,35,31,27,24,22,23,25,28,33,37,40,41,40,38,34,30,27,24,23,23,23,25,26,27,27,26,24,23,21,20,19,19,20,20,20,20,20,19,18,17,16,16,16,16,16,17,17,17,17,17,16,16,15,15,15,16,16,16,17,17,17,17,17,17,17,18,18,19,19,20,20,20,20,20,19,18,18,17,17,16,15,15,14,14,13,13,12,11,10,9,8,7,6,5,4,2,1,0,-2,-3,-5,-6,-7,-8,-9,-9,-9,-8,-8,-7,-6,-5,-4,-4,-3,-2,-2,-1,0,1,2,3,5,6,7,8,9,11,12,13,14,16,17,19,20,21,21,22,22,21,21,20,19,18,17,17,16,16,16,15,14,13,12,10,9,7,6,5,4,2,1,-1,-3,-5,-7,-9,-11,-12,-13,-13,-12,-10,-8,-6,-5,-3,-2,-1,0,2,4,7,10,13,16,18,19,19,19,19,19,19,21,24,27,31,35,38,39,39,37,35,32,31,31,34,39,46,54,63,71,77,82,83,83,81,78,75,72,69,67,65,62,59,53,46,38,29,20,12,5,0,-3,-5,-5,-5,-5,-5,-6,-7,-7,-7,-6,-4,-1,2,4,4,1,-5,-16,-29,-44,-59,-73,-83,-89,-90,-89,-85,-81,-78,-77,-80,-85,-93,-102,-112,-122,-133,-145,-160,-179,-202,-227,-251,-269,-273,-256,-213,-139,-32,104,261,430,596,745,864,943,975,960,902,808,688,554,417,287,171,71,-11,-77,-128,-167,-197,-220,-237,-247,-252,-252,-247,-239,-230,-220,-212,-206,-203,-201,-200,-197,-191,-181,-167,-150,-129,-108,-87,-69,-54,-43,-36,-32,-30,-30,-30,-31,-31,-30,-30,-30,-31,-32,-33,-34,-35,-34,-33,-30,-26,-21,-16,-11,-5,0,4,9,13,17,21,25,29,32,35,37,39,40,41,41,40,40,40,40,40,40,41,42,43,44,46,49,52,55,59,64,68,74,79,84,89,94,98,101,104,106,107,107,106,104,101,98,94,90,86,81,77,74,70,67,63,60,57,53,49,44,39,34,28,22,15,9,3,-3,-9,-14,-19,-23,-26,-29,-31,-33,-35,-36,-37,-38,-39,-41,-42,-44,-45,-46,-47,-47,-46,-45,-44,-42,-41,-39,-37,-35,-33,-31,-29,-26,-24,-22,-20,-18,-17,-15,-14,-13,-12,-11,-10,-9,-9,-8,-7,-6,-6,-5,-4,-3,-1,0,2,4,6,8,10,12,14,16,19,21,23,25,26,27,28,28,27,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,11,10,9,9,8,7,6,5,4,3,3,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9,10,10,10,10,10,10,10,10,11,11,11,11,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,13,13,13,13,13,13,12,12,12,12,11,11,11,11,11,11,11,12,12,12,12,12,13,13,13,14,14,14,15,15,15,15,15,15,15,15,15,16,16,16,16,16,16,15,16,16,16,17,17,18,19,19,20,21,21,22,22,23,24,24,25,26,27,27,28,29,30,31,32,34,35,37,38,39,40,41,41,41,41,41,40,40,38,36,34,31,28,25,21,18,15,12,10,7,4,1,-3,-8,-12,-17,-21,-24,-26,-27,-26,-24,-23,-21,-21,-22,-25,-31,-39,-49,-62,-74,-87,-100,-111,-120,-127,-133,-138,-143,-149,-157,-164,-171,-174,-170,-154,-123,-72,-1,91,201,323,451,573,680,764,817,835,816,764,683,582,470,355,246,147,63,-6,-60,-102,-133,-157,-177,-193,-207,-218,-227,-232,-232,-228,-219,-205,-188,-168,-147,-126,-106,-88,-72,-60,-52,-47,-44,-44,-46,-49,-52,-55,-57,-59,-60,-60,-60,-59,-58,-57,-54,-52,-48,-44,-39,-33,-27,-21,-14,-9,-3,2,7,11,15,19,22,24,26,28,30,31,32,33,33,34,35,36,37,38,39,41,42,44,47,49,52,54,57,59,61,64,66,68,70,73,75,77,79,81,83,84,85,86,88,90,92,94,96,99,101,102,102,102,100,97,93,88,83,78,72,67,62,57,51,46,41,35,30,24,19,15,10,6,2,-2,-6,-10,-14,-19,-23,-28,-32,-36,-39,-42,-44,-45,-46,-47,-47,-47,-46,-46,-46,-46,-46,-46,-46,-46,-45,-44,-42,-41,-38,-36,-34,-31,-29,-27,-25,-23,-21,-19,-17,-14,-12,-8,-5,-2,2,5,9,13,17,21,25,30,34,39,43,47,50,52,53,53,53,51,50,48,47,45,43,42,40,39,37,35,33,31,29,28,26,24,23,22,20,19,17,15,13,11,9,8,7,6,5,5,5,6,6,7,8,8,9,9,10,10,11,12,13,14,15,15,16,17,18,18,19,20,21,22,23,24,25,26,27,27,27,28,28,28,28,27,27,27,26,26,26,25,25,25,25,24,24,24,24,24,24,24,24,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,21,21,21,21,21,21,20,20,20,20,20,20,20,20,20,19,19,19,19,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,17,17,17,17,17,17,17,16,15,13,12,11,10,9,7,6,5,3,1,0,-1,-2,-2,-2,-1,1,3,5,7,9,11,12,13,14,15,17,19,22,25,29,33,37,40,44,48,52,57,63,69,76,82,88,93,96,97,96,93,89,85,80,75,71,66,61,55,48,41,33,25,19,13,9,6,4,2,0,-3,-7,-13,-19,-24,-29,-31,-32,-32,-32,-33,-37,-44,-54,-66,-78,-87,-92,-92,-86,-75,-63,-51,-42,-39,-41,-49,-59,-69,-76,-80,-80,-80,-83,-93,-114,-146,-187,-232,-272,-298,-299,-269,-202,-101,28,174,326,469,591,684,743,768,764,735,688,630,564,494,419,341,259,176,94,16,-53,-108,-147,-170,-177,-173,-161,-148,-139,-135,-139,-148,-162,-176,-187,-193,-192,-184,-172,-156,-139,-123,-110,-99,-90,-82,-76,-69,-61,-54,-46,-38,-30,-24,-17,-11,-4,3,10,18,25,31,37,41,43,44,45,44,44,44,44,45,46,47,48,48,48,47,45,43,41,39,37,35,33,31,30,28,26,24,22,20,18,17,16,16,17,19,21,24,27,30,33,35,36,37,37,38,39,42,45,50,56,63,70,77,85,92,99,105,112,118,124,129,134,136,137,136,132,128,121,115,108,101,95,90,85,80,74,68,61,53,45,36,27,19,10,2,-7,-16,-26,-36,-47,-58,-68,-77,-84,-89,-91,-91,-89,-86,-81,-77,-72,-68,-63,-59,-55,-51,-46,-41,-36,-30,-25,-19,-14,-10,-6,-2,3,8,13,18,24,30,36,41,44,47,49,49,49,48,47,46,45,44,43,41,40,39,37,35,33,31,29,27,26,24,23,21,19,18,15,13,11,8,6,5,3,2,2,2,3,3,4,5,6,7,8,9,10,11,12,13,15,16,18,19,21,22,24,25,27,29,30,33,35,37,39,40,41,42,43,43,43,42,42,41,40,40,39,38,38,37,36,35,34,34,33,32,31,31,30,30,29,29,28,27,27,26,25,25,24,24,24,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,23,23,23,23,23,23,23,23,22,22,22,22,22,22,22,22,22,22,22,22,22,23,23,23,24,25,25,26,27,27,27,27,27,27,26,25,24,22,21,19,18,16,15,13,12,11,10,10,11,13,15,19,23,28,32,37,42,45,49,51,54,57,60,63,67,71,74,77,78,78,76,72,68,64,61,59,59,60,62,64,65,65,62,58,51,44,37,31,27,24,23,22,22,19,15,8,-2,-14,-27,-40,-52,-62,-70,-75,-79,-82,-84,-87,-89,-92,-94,-97,-98,-99,-99,-100,-101,-106,-114,-127,-147,-171,-201,-231,-260,-281,-288,-276,-239,-173,-77,48,194,355,517,667,794,885,933,934,889,803,687,552,410,273,149,46,-34,-92,-131,-153,-164,-167,-167,-164,-161,-157,-154,-151,-149,-148,-149,-150,-152,-153,-151,-146,-137,-122,-104,-83,-60,-40,-22,-10,-2,0,-2,-7,-13,-18,-23,-26,-28,-29,-30,-32,-34,-37,-40,-42,-43,-43,-41,-38,-34,-29,-25,-21,-17,-15,-13,-11,-9,-6,-4,-1,3,6,9,12,14,16,17,18,20,22,23,26,28,31,34,37,41,44,48,52,57,61,66,71,76,82,87,92,97,101,105,108,111,112,113,113,112,111,111,110,110,110,110,110,110,109,108,106,103,100,96,91,87,82,78,73,69,64,60,55,50,45,40,36,31,27,23,19,15,11,7,3,-1,-6,-10,-15,-19,-23,-26,-29,-31,-32,-33,-33,-34,-34,-34,-34,-34,-35,-35,-35,-35,-35,-35,-34,-33,-32,-30,-28,-27,-25,-23,-22,-20,-19,-17,-15,-13,-12,-10,-8,-6,-4,-2,0,1,3,5,7,9,12,14,16,18,19,21,22,24,24,25,26,26,27,27,27,27,27,27,28,28,28,29,29,30,31,31,32,33,35,36,37,39,40,42,43,44,46,46,47,47,47,47,46,46,45,44,43,42,42,41,40,39,38,38,37,36,36,36,35,35,35,35,34,34,34,33,33,33,32,32,32,32,31,31,30,30,30,29,29,29,29,28,28,28,27,27,27,26,26,25,25,24,24,23,22,22,21,20,19,18,18,18,17,17,17,17,17,17,18,18,18,19,20,21,22,22,23,23,22,22,21,21,21,21,21,22,22,21,21,19,18,16,15,15,16,18,20,23,26,28,29,28,27,25,23,22,22,23,26,29,34,38,42,45,47,48,49,50,51,52,55,58,62,66,70,73,74,74,74,72,70,68,66,64,63,62,61,60,58,56,54,52,50,47,45,43,41,40,39,37,35,32,27,22,17,11,7,3,0,0,0,2,4,6,7,9,10,12,16,21,29,37,45,51,51,45,31,11,-16,-44,-73,-97,-116,-128,-135,-137,-139,-144,-154,-170,-191,-213,-231,-241,-237,-216,-177,-119,-46,39,133,230,328,423,513,595,666,722,757,768,751,703,626,524,404,275,149,35,-60,-130,-175,-198,-204,-201,-194,-189,-188,-191,-196,-199,-197,-188,-171,-146,-118,-88,-62,-41,-27,-21,-20,-23,-26,-29,-29,-27,-23,-17,-13,-9,-7,-7,-8,-10,-10,-9,-7,-4,1,6,10,14,17,18,19,20,21,21,23,24,26,27,28,28,28,26,24,20,17,13,10,8,7,7,8,9,11,12,12,12,11,11,12,14,19,27,35,44,53,59,62,62,59,54,51,49,52,59,72,89,109,129,148,162,173,177,178,174,169,163,158,154,151,149,147,145,140,135,127,118,109,100,91,82,75,68,61,54,46,37,28,18,7,-5,-16,-26,-37,-46,-54,-61,-66,-69,-70,-70,-68,-64,-61,-56,-52,-48,-43,-40,-36,-32,-28,-24,-19,-15,-11,-7,-3,0,3,6,10,13,17,21,25,29,33,36,38,40,41,41,41,41,40,40,40,40,39,39,39,38,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,28,28,28,28,29,29,29,29,29,29,29,30,30,30,31,31,32,32,32,33,33,34,35,35,36,37,38,38,39,40,41,41,42,42,42,42,41,41,41,41,40,40,39,39,38,38,38,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,39,39,38,38,38,37,37,36,35,35,34,34,33,32,32,31,31,30,29,28,27,27,26,25,24,23,22,21,20,18,17,16,15,14,14,14,13,14,14,14,14,15,15,16,16,17,18,18,19,19,19,19,19,18,17,16,15,14,13,12,11,10,9,8,7,7,7,8,9,11,13,15,18,20,22,24,25,27,28,30,33,35,39,42,46,50,54,58,62,66,70,75,80,86,91,96,100,103,105,106,105,104,102,100,98,96,94,93,91,89,87,85,81,78,74,69,65,60,54,47,40,31,22,13,3,-7,-16,-24,-31,-38,-43,-48,-53,-56,-58,-58,-56,-52,-47,-39,-31,-23,-15,-9,-5,-4,-5,-9,-16,-25,-37,-51,-69,-89,-112,-137,-164,-192,-219,-244,-266,-283,-293,-293,-281,-254,-209,-145,-60,45,168,305,448,588,717,823,899,938,937,898,825,725,607,481,357,241,139,54,-14,-68,-109,-142,-168,-189,-206,-220,-230,-236,-236,-231,-222,-209,-194,-177,-159,-142,-125,-110,-95,-82,-69,-59,-50,-43,-38,-34,-32,-30,-28,-25,-22,-18,-13,-8,-3,2,6,9,12,14,15,17,18,21,23,26,29,32,34,36,36,36,35,33,31,29,27,24,21,18,15,11,7,3,-1,-5,-8,-10,-11,-10,-8,-5,-1,4,8,13,16,19,22,25,28,31,36,42,48,56,64,73,81,90,99,108,118,129,141,153,165,176,186,193,197,197,195,190,183,174,166,157,149,142,135,128,120,112,103,93,83,72,61,51,41,32,22,12,0,-12,-24,-37,-51,-63,-73,-82,-88,-91,-92,-90,-87,-83,-79,-75,-71,-67,-63,-58,-54,-49,-44,-39,-33,-28,-24,-20,-16,-13,-9,-6,-2,3,7,12,17,21,25,29,31,33,34,34,34,33,33,33,32,32,32,31,31,30,29,28,26,25,24,23,22,21,20,19,17,16,14,13,11,9,8,7,7,7,7,8,9,10,12,13,14,15,16,17,18,19,21,22,24,26,28,29,31,33,35,37,39,42,44,47,49,52,54,55,56,57,57,57,56,56,55,54,53,52,51,50,49,48,47,46,45,44,44,43,43,42,42,42,41,41,41,40,40,39,39,38,38,38,37,37,36,36,35,34,34,34,33,33,33,32,32,31,31,30,29,29,28,27,26,26,25,24,23,22,20,19,18,18,17,17,17,17,18,18,19,19,20,21,21,22,23,24,25,25,26,26,25,24,23,22,21,20,19,19,18,18,18,17,16,16,16,16,17,18,21,24,27,30,32,33,34,33,32,31,31,32,35,41,48,56,65,75,84,92,98,103,106,107,107,107,106,105,104,103,102,101,99,96,93,88,83,76,69,61,53,46,39,33,28,23,20,16,13,9,4,0,-4,-8,-10,-11,-11,-11,-11,-14,-19,-29,-42,-58,-76,-95,-111,-123,-130,-130,-125,-116,-105,-94,-86,-84,-88,-100,-119,-142,-167,-189,-203,-205,-190,-152,-90,-2,110,242,385,531,668,784,869,915,918,877,796,685,553,412,275,151,47,-34,-92,-130,-153,-165,-172,-177,-181,-185,-188,-188,-185,-177,-166,-151,-136,-121,-109,-99,-93,-90,-89,-89,-89,-88,-86,-84,-81,-79,-77,-76,-76,-75,-74,-72,-68,-62,-54,-46,-37,-28,-19,-11,-2,6,14,23,31,40,48,56,62,66,69,70,71,70,69,69,68,69,69,70,70,70,70,69,68,67,66,65,65,65,65,65,65,64,62,60,58,56,54,54,55,57,60,65,70,75,80,85,89,93,97,101,106,111,117,123,127,130,131,129,125,118,111,103,95,88,83,79,76,74,72,69,65,59,53,47,40,34,28,23,19,15,11,7,2,-3,-8,-13,-18,-22,-25,-27,-28,-29,-29,-30,-31,-33,-35,-37,-39,-40,-41,-42,-41,-39,-37,-34,-31,-29,-26,-23,-21,-18,-16,-13,-10,-7,-3,0,4,8,12,16,20,25,29,34,39,44,50,55,61,66,70,74,77,78,79,78,77,76,74,72,71,69,67,66,64,62,60,58,56,54,52,50,48,47,45,44,42,40,38,36,33";
          //perfect 1 s 2 PFData = "24,117,207,288,357,411,447,463,458,434,392,337,273,206,140,80,29,-12,-43,-63,-76,-83,-86,-86,-86,-86,-85,-84,-84,-83,-83,-82,-82,-82,-82,-83,-83,-82,-80,-76,-72,-67,-61,-56,-50,-45,-41,-37,-33,-29,-25,-21,-17,-12,-8,-4,-1,2,5,9,12,17,22,27,32,37,40,42,42,40,36,31,26,22,19,17,17,19,23,27,31,34,36,36,35,33,29,26,22,19,17,15,14,13,12,10,8,5,2,0,-1,-2,0,2,6,10,14,18,21,24,26,28,29,31,34,37,41,45,49,53,56,58,61,63,65,68,71,75,79,83,86,87,87,86,82,78,74,69,65,62,60,58,56,54,51,47,43,37,31,24,17,10,3,-4,-11,-18,-26,-33,-40,-47,-52,-56,-58,-59,-58,-57,-55,-53,-50,-48,-46,-44,-42,-39,-36,-33,-31,-28,-27,-26,-26,-26,-25,-24,-22,-19,-14,-9,-4,1,5,8,9,8,8,7,6,7,9,11,14,16,18,18,16,13,10,8,6,6,8,11,16,21,25,28,29,28,25,22,19,17,16,17,20,24,29,33,36,38,37,35,31,27,23,19,16,15,14,14,14,14,13,12,9,7,4,2,-1,-3,-5,-6,-8,-10,-12,-15,-17,-20,-22,-23,-24,-24,-23,-22,-20,-19,-17,-17,-17,-17,-17,-16,-16,-14,-13,-10,-8,-5,-3,-1,0,1,2,3,4,6,8,11,14,16,18,20,20,20,19,18,16,14,12,10,8,6,4,2,0,-2,-3,-4,-4,-4,-4,-4,-4,-4,-5,-6,-7,-8,-8,-9,-9,-10,-10,-11,-12,-13,-14,-15,-15,-13,-11,-7,-2,3,7,11,14,15,15,13,9,3,-6,-18,-32,-50,-70,-91,-112,-132,-149,-163,-173,-179,-182,-183,-183,-182,-178,-170,-154,-128,-87,-32,39,122,214,308,395,469,524,554,559,539,498,441,374,302,231,163,99,42,-11,-59,-102,-141,-175,-202,-222,-234,-238,-234,-225,-212,-197,-181,-166,-151,-136,-122,-108,-93,-78,-64,-51,-42,-35,-32,-31,-33,-34,-35,-35,-31,-26,-18,-11,-4,1,2,1,-3,-8,-13,-18,-21,-21,-18,-13,-7,-1,4,7,9,8,5,1,-3,-7,-11,-13,-15,-16,-17,-19,-21,-25,-29,-34,-39,-43,-45,-46,-46,-43,-40,-36,-32,-27,-24,-21,-18,-15,-11,-8,-4,1,5,9,13,17,20,24,27,31,36,41,46,51,55,58,61,63,64,66,68,71,75,79,83,85,87,86,84,82,80,80,82,86,92,98,103,105,101,91,74,52,25,-2,-28,-49,-63,-69,-67,-59,-47,-32,-18,-7,1,5,4,1,-4,-10,-17,-22,-27,-32,-36,-40,-43,-46,-48,-50,-51,-51,-50,-50,-50,-52,-55,-59,-64,-69,-73,-76,-76,-74,-70,-63,-56,-49,-42,-37,-34,-33,-33,-35,-37,-38,-39,-39,-38,-35,-31,-27,-22,-16,-11,-7,-3,0,2,4,5,6,7,8,11,14,18,23,28,33,37,39,39,37,33,28,21,15,9,3,-2,-7,-13,-19,-26,-34,-43,-51,-58,-63,-66,-67,-66,-65,-64,-65,-69,-76,-84,-94,-102,-108,-108,-103,-91,-73,-51,-25,2,30,57,82,108,132,155,177,197,212,223,226,220,206,184,154,120,84,47,13,-17,-43,-64,-80,-91,-97,-99,-95,-87,-75,-58,-38,-17,3,20,33,40,42,39,32,25,18,13,11,11,14,16,18,18,14,8,-2,-12,-23,-32,-39,-42,-42,-39,-33,-26,-18,-10,-4,2,5,6,6,4,1,-2,-6,-9,-11,-11,-8,-3,4,13,23,33,43,52,58,61,62,60,56,51,45,39,35,33,32,34,36,39,41,40,36,27,15,-1,-20,-40,-59,-77,-90,-100,-106,-109,-110,-111,-113,-118,-127,-140,-156,-173,-188,-198,-198,-184,-155,-107,-40,45,144,252,363,469,561,633,678,692,675,628,555,462,358,250,147,53,-27,-91,-138,-171,-193,-206,-215,-221,-225,-229,-231,-230,-226,-218,-205,-188,-168,-147,-126,-107,-92,-80,-72,-67,-65,-65,-66,-66,-67,-68,-68,-68,-67,-67,-66,-64,-62,-59,-56,-52,-49,-45,-42,-39,-37,-36,-34,-32,-30,-27,-24,-21,-18,-15,-13,-12,-11,-11,-11,-11,-12,-11,-11,-11,-10,-10,-9,-9,-9,-8,-7,-6,-4,-2,0,2,3,5,5,6,6,7,8,10,12,16,19,23,27,31,35,39,43,47,51,56,61,67,72,77,80,82,82,81,79,76,72,69,66,64,62,60,57,55,52,48,43,38,33,28,22,16,10,4,-4,-11,-20,-28,-37,-45,-53,-59,-64,-67,-69,-70,-70,-70,-68,-66,-64,-60,-56,-52,-47,-43,-40,-37,-35,-35,-35,-35,-35,-34,-32,-29,-25,-20,-16,-12,-9,-7,-7,-7,-7,-8,-9,-9,-9,-8,-7,-6,-4,-2,1,4,8,11,14,16,17,15,12,6,0,-6,-11,-14,-15,-13,-8,-2,6,13,18,22,24,23,21,18,16,14,13,12,13,13,14,14,13,12,10,8,6,4,3,2,1,1,1,1,1,1,1,2,3,4,5,5,5,3,1,-2,-4,-7,-9,-10,-9,-8,-6,-4,-2,-1,0,-1,-2,-4,-5,-7,-8,-9,-9,-8,-7,-6,-5,-4,-3,-2,-1,-1,-1,-1,-2,-3,-6,-9,-13,-18,-24,-28,-32,-33,-33,-30,-25,-18,-10,-2,5,11,13,13,10,6,0,-5,-10,-13,-13,-12,-9,-5,-1,2,3,3,1,-2,-5,-9,-12,-14,-15,-15,-15,-14,-13,-11,-10,-7,-4,0,5,12,18,25,30,34,36,36,35,32,30,28,27,27,28,29,30,30,28,27,24,22,21,22,24,27,30,32,30,25,15,0,-18,-38,-58,-75,-89,-97,-102,-103,-102,-101,-102,-104,-110,-118,-127,-138,-148,-157,-165,-171,-175,-174,-167,-151,-124,-81,-22,53,144,244,347,445,528,590,624,627,598,543,467,378,285,195,114,46,-9,-51,-82,-105,-123,-137,-150,-161,-169,-174,-176,-174,-168,-160,-150,-140,-130,-122,-115,-110,-106,-102,-99,-96,-93,-90,-86,-81,-75,-68,-59,-49,-38,-27,-17,-9,-4,-2,-4,-8,-14,-21,-28,-33,-35,-36,-34,-31,-28,-25,-22,-21,-21,-23,-25,-27,-29,-30,-30,-30,-29,-28,-27,-27,-26,-26,-26,-26,-25,-24,-22,-19,-16,-13,-10,-7,-4,-2,0,2,3,5,7,10,12,15,18,20,21,22,22,21,20,19,19,20,22,26,31,36,42,48,54,60,65,70,76,82,88,95,101,106,110,111,109,105,98,89,78,68,57,46,36,26,16,5,-5,-16,-26,-35,-42,-47,-49,-48,-45,-41,-35,-29,-24,-20,-17,-15,-13,-12,-11,-10,-9,-8,-6,-5,-5,-5,-5,-6,-7,-8,-9,-9,-9,-9,-8,-7,-6,-5,-4,-4,-3,-2,-1,0,1,3,4,5,6,7,8,9,10,11,13,14,15,17,18,20,22,24,26,28,30,31,32,33,33,32,31,30,29,28,27,26,24,23,22,20,18,17,15,14,13,13,12,12,12,12,12,11,10,8,7,6,5,5,5,6,6,6,5,4,2,0,-2,-5,-7,-9,-10,-11,-12,-13,-14,-15,-16,-18,-20,-23,-26,-29,-31,-34,-37,-39,-41,-43,-45,-46,-47,-49,-50,-51,-53,-54,-56,-56,-56,-55,-53,-49,-46,-42,-38,-34,-32,-30,-29,-28,-27,-26,-24,-22,-20,-18,-17,-16,-17,-17,-18,-18,-17,-14,-10,-5,0,3,5,4,0,-5,-12,-17,-22,-23,-22,-17,-11,-4,3,7,9,8,6,2,-1,-3,-4,-2,2,6,10,12,13,11,7,3,-2,-6,-8,-8,-6,-2,2,6,8,9,8,5,0,-7,-14,-23,-31,-39,-46,-53,-58,-62,-65,-67,-69,-71,-73,-77,-81,-85,-89,-92,-92,-90,-85,-79,-74,-71,-74,-84,-102,-127,-156,-185,-206,-213,-200,-163,-98,-7,105,231,360,481,582,654,691,691,654,588,499,399,296,200,117,51,2,-31,-54,-71,-87,-104,-125,-150,-178,-205,-229,-247,-256,-256,-246,-230,-207,-182,-156,-130,-107,-86,-68,-53,-40,-28,-18,-10,-4,1,3,4,3,1,-3,-7,-11,-16,-20,-25,-29,-33,-36,-38,-39,-39,-37,-34,-30,-26,-22,-19,-15,-13,-10,-8,-6,-4,-1,2,5,7,9,10,11,10,9,8,7,6,5,6,7,8,10,12,13,14,16,17,18,20,22,24,27,30,33,36,38,40,42,43,43,43,43,43,42,41,41,40,39,38,38,37,36,35,34,33,32,30,29,29,29,30,33,38,43,48,53,57,59,59,57,53,47,41,35,29,24,19,15,10,3,-5,-14,-25,-36,-45,-53,-57,-59,-57,-53,-49,-45,-42,-41,-43,-46,-49,-51,-52,-49,-44,-36,-27,-19,-12,-8,-7,-10,-14,-19,-24,-28,-29,-28,-25,-21,-17,-13,-11,-10,-11,-12,-12,-12,-11,-8,-3,2,7,11,14,15,15,14,13,12,11,11,12,13,14,15,15,14,13,11,9,8,7,6,7,7,8,8,8,7,5,4,3,2,3,4,5,7,8,8,6,4,1,-1,-4,-5,-5,-3,1,5,8,11,12,12,9,5,1,-3,-7,-8,-8,-6,-3,1,4,6,8,8,7,5,3,1,0,0,0,1,1,2,2,2,2,1,1,1,1,1,1,1,0,-1,-1,-2,-3,-4,-5,-5,-5,-5,-6,-6,-7,-8,-9,-10,-10,-10,-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,2,4,5,6,6,6,6,5,5,5,6,8,10,13,15,17,18,18,16,14,11,8,6,5,5,7,9,12,15,17,18,17,15,11,6,2,-3,-6,-9,-10,-10,-9,-8,-8,-8,-9,-10,-13,-15,-18,-21,-23,-27,-31,-37,-46,-58,-72,-87,-103,-117,-128,-134,-136,-132,-126,-119,-114,-113,-118,-129,-143,-156,-163,-157,-134,-88,-20,68,173,284,392,488,561,605,616,596,546,475,391,300,212,132,63,6,-41,-78,-108,-133,-155,-173,-188,-197,-201,-199,-190,-176,-158,-139,-120,-104,-92,-82,-77,-73,-71,-70,-68,-65,-62,-60,-58,-57,-58,-60,-63,-67,-70,-73,-75,-74,-73,-70,-66,-61,-56,-51,-46,-40,-34,-28,-22,-16,-10,-5,0,4,7,10,12,13,14,14,14,14,13,12,10,9,8,8,7,8,9,10,11,12,13,13,13,12,11,9,9,8,9,10,11,12,14,15,16,17,17,18,18,19,21,23,25,27,29,31,32,33,33,32,31,30,30,30,31,32,34,37,40,42,44,44,43,41,38,34,30,25,21,18,15,13,11,9,7,4,0,-4,-9,-14,-19,-23,-26,-29,-31,-33,-34,-36,-37,-38,-38,-38,-36,-33,-29,-24,-19,-14,-11,-8,-8,-9,-12,-15,-18,-21,-23,-23,-22,-20,-17,-14,-11,-9,-7,-6,-5,-5,-4,-4,-3,-2,-1,1,3,5,7,9,10,11,11,12,11,11,10,9,8,7,7,6,6,5,5,5,4,4,3,3,2,1,1,0,0,-1,-1,-2,-2,-3,-3,-4,-4,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,1,1,2,2,3,3,4,4,4,5,5,6,6,7,7,8,8,8,8,8,8,8,8,8,8,9,9,10,11,11,12,11,11,10,9,7,6,5,4,5,5,6,8,10,12,13,15,16,16,16,15,14,13,12,11,10,10,10,10,10,11,11,10,9,8,5,3,0,-2,-4,-6,-7,-8,-8,-8,-9,-9,-10,-11,-12,-12,-13,-12,-12,-12,-12,-12,-14,-17,-20,-24,-28,-31,-32,-32,-31,-28,-25,-21,-18,-15,-13,-12,-12,-11,-10,-9,-7,-4,-3,-2,-4,-8,-15,-26,-38,-50,-62,-73,-79,-82,-82,-78,-72,-66,-63,-64,-70,-84,-103,-127,-153,-178,-197,-205,-199,-175,-133,-71,7,97,194,289,377,451,505,534,539,519,478,419,348,272,195,122,57,3,-40,-73,-95,-108,-114,-116,-113,-108,-102,-95,-87,-80,-72,-65,-57,-50,-43,-37,-32,-28,-26,-24,-24,-25,-26,-26,-26,-24,-21,-17,-12,-7,-3,-1,-1,-3,-8,-14,-20,-27,-32,-34,-35,-32,-26,-19,-11,-2,6,12,17,20,21,21,21,19,18,17,16,15,14,13,11,10,8,5,2,-2,-6,-10,-14,-18,-21,-24,-26,-27,-28,-28,-27,-27,-26,-25,-25,-24,-23,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-11,-8,-6,-3,1,4,7,10,14,17,21,26,31,36,42,46,50,53,54,53,51,48,45,41,38,36,34,32,31,29,27,24,20,16,10,5,-1,-7,-14,-20,-27,-33,-39,-45,-51,-56,-59,-62,-64,-65,-66,-66,-66,-67,-67,-67,-66,-64,-62,-58,-54,-50,-46,-43,-41,-40,-40,-40,-40,-39,-38,-35,-32,-27,-22,-17,-13,-9,-6,-4,-3,-3,-3,-3,-3,-3,-3,-3,-4,-4,-4,-5,-5,-5,-4,-4,-3,-3,-2,-2,-2,-2,-3,-4,-5,-5,-6,-6,-6,-6,-6,-6,-6,-6,-7,-7,-7,-7,-7,-7,-6,-5,-5,-4,-4,-3,-3,-3,-3,-3,-2,-2,-1,0,1,3,4,4,5,5,6,6,7,8,9,10,12,13,13,13,12,11,9,8,7,7,8,9,11,12,12,11,9,6,3,0,-2,-2,-1,2,5,9,12,14,15,13,10,7,3,0,-1,-2,-1,0,1,1,1,0,-1,-2,-3,-2,-1,1,3,5,6,5,3,0,-2,-4,-4,-2,2,7,12,16,18,17,13,6,-2,-11,-17,-22,-23,-21,-16,-10,-4,1,5,6,5,3,0,-2,-5,-6,-5,-4,-2,1,5,9,13,18,23,29,34,38,41,42,41,37,31,24,16,8,1,-5,-8,-10,-10,-10,-10,-11,-14,-20,-30,-42,-56,-73,-90,-106,-121,-135,-147,-159,-170,-184,-198,-214,-230,-241,-244,-233,-204,-152,-77,21,137,264,391,509,606,675,710,709,674,612,530,437,342,252,171,103,48,3,-33,-63,-90,-115,-138,-159,-178,-193,-205,-212,-215,-214,-209,-202,-192,-180,-166,-150,-133,-116,-99,-84,-70,-60,-52,-46,-42,-40,-38,-36,-33,-30,-27,-22,-18,-13,-8,-3,2,7,12,17,20,21,21,18,13,8,2,-2,-4,-3,0,4,9,13,16,16,12,6,-2,-11,-20,-28,-35,-40,-43,-44,-45,-45,-45,-45,-44,-44,-43,-42,-39,-36,-33,-30,-27,-24,-21,-18,-15,-11,-8,-4,0,5,9,14,19,25,30,36,43,49,55,61,66,70,71,72,71,68,66,63,60,57,55,53,52,50,47,43,39,35,30,25,20,16,12,9,5,1,-3,-8,-14,-20,-26,-32,-36,-40,-42,-43,-43,-43,-42,-40,-39,-38,-38,-37,-36,-35,-33,-31,-29,-27,-25,-23,-21,-20,-19,-18,-18,-18,-17,-16,-15,-14,-12,-11,-10,-9,-8,-8,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-5,-6,-6,-6,-5,-5,-5,-5,-5,-6,-6,-6,-6,-6,-5,-5,-4,-3,-2,-2,-2,-3,-3,-4,-4,-3,-2,0,2,4,5,7,7,7,6,4,3,3,4,5,7,10,12,14,15,15,14,12,10,9,7,7,6,7,7,7,7,6,5,4,3,2,1,0,0,-1,-2,-4,-6,-8,-10,-12,-13,-13,-12,-11,-10,-9,-9,-9,-9,-10,-9,-8,-5,-1,4,8,11,12,11,8,3,-2,-5,-5,-2,6,16,28,40,50,56,57,54,47,37,28,20,15,14,16,20,24,27,27,25,18,10,1,-8,-15,-19,-19,-17,-13,-8,-3,2,6,11,16,22,30,38,46,52,55,53,46,33,15,-6,-28,-49,-66,-79,-87,-92,-95,-98,-103,-111,-123,-136,-150,-164,-174,-181,-184,-186,-188,-193,-203,-219,-239,-262,-280,-289,-281,-249,-192,-106,3,131,268,404,528,631,705,747,756,735,689,624,546,461,375,291,212,139,74,17,-31,-69,-97,-116,-126,-129,-128,-124,-120,-119,-122,-128,-137,-146,-155,-160,-161,-157,-148,-136,-123,-109,-98,-89,-83,-80,-79,-78,-77,-74,-69,-63,-55,-47,-39,-31,-26,-21,-18,-15,-14,-12,-10,-9,-7,-5,-4,-2,-2,-1,0,0,1,2,2,3,3,3,2,0,-2,-4,-7,-10,-13,-16,-19,-22,-24,-27,-30,-32,-34,-35,-35,-35,-33,-31,-29,-26,-23,-20,-18,-16,-14,-12,-10,-7,-5,-2,2,6,11,16,22,28,34,40,46,52,58,63,68,72,75,77,78,77,75,72,69,65,62,58,56,54,53,52,51,49,46,41,35,27,19,9,0,-8,-15,-20,-23,-25,-25,-24,-22,-21,-20,-20,-21,-23,-25,-27,-30,-32,-33,-34,-34,-33,-33,-32,-32,-33,-33,-34,-35,-36,-37,-38,-39,-40,-41,-42,-44,-45,-47,-49,-50,-51,-52,-52,-52,-52,-51,-51,-50,-49,-48,-46,-44,-42,-39,-37,-35,-33,-33,-33,-34,-35,-35,-35,-34,-32,-31,-29,-29,-31,-33,-36,-39,-42,-42,-39,-35,-28,-20,-14,-9,-7,-8,-13,-19,-26,-31,-33,-30,-24,-13,0,13,25,33,38,39,38,36,34,34,37,43,51,61,70,77,82,83,82,78,73,68,63,58,54,50,45,38,31,23,14,7,2,0,1,6,13,21,28,32,33,29,20,7,-8,-25,-41,-54,-64,-70,-72,-70,-65,-58,-51,-44,-38,-33,-29,-26,-25,-23,-22,-21,-19,-17,-15,-13,-10,-7,-5,-2,1,4,7,10,13,16,18,19,20,20,20,20,19,19,19,18,18,18,17,16,15,13,12,11,10,11,12,14,17,20,23,24,25,24,23,21,19,17,16,16,18,20,24,28,32,36,38,40,41,41,40,39,36,33,28,22,14,3,-9,-23,-37,-52,-66,-78,-88,-95,-100,-101,-101,-99,-96,-94,-94,-96,-102,-112,-125,-141,-157,-172,-181,-181,-169,-140,-93,-27,58,158,267,378,483,572,639,676,679,649,588,501,395,280,165,58,-35,-109,-165,-202,-223,-232,-234,-231,-227,-222,-216,-210,-203,-193,-181,-166,-150,-134,-119,-106,-96,-89,-84,-81,-78,-74,-69,-62,-53,-44,-35,-27,-20,-15,-11,-9,-8,-7,-6,-6,-5,-4,-3,-3,-4,-5,-7,-8,-10,-11,-12,-13,-14,-14,-15,-15,-16,-16,-17,-18,-18,-19,-19,-20,-21,-22,-23,-24,-24,-24,-23,-22,-20,-17,-13,-9,-6,-2,1,3,5,6,6,7,7,8,9,10,11,13,15,18,21,24,27,31,36,40,45,49,53,56,57,57,55,52,48,44,40,37,35,35,36,38,40,42,44,45,45,45,44,45,46,48,51,53,55,56,54,50,43,35,24,12,0,-11,-23,-33,-41,-49,-55,-59,-60,-59,-55,-49,-40,-30,-21,-13,-7,-6,-8,-15,-23,-33,-43,-50,-56,-59,-59,-57,-55,-53,-52,-52,-52,-53,-53,-51,-48,-44,-38,-33,-29,-26,-24,-25,-27,-29,-31,-32,-32,-30,-27,-23,-19,-16,-14,-14,-14,-16,-18,-20,-21,-21,-20,-17,-13,-7,1,9,17,24,29,31,30,25,17,7,-4,-13,-20,-23,-21,-15,-5,7,19,30,38,43,44,42,39,35,32,30,29,29,30,32,32,32,31,29,27,24,22,19,17,15,13,11,8,6,4,3,3,4,6,7,9,9,7,4,-1,-7,-13,-18,-23,-26,-27,-26,-24,-20,-17,-12,-8,-4,-1,3,5,8,10,12,13,14,15,17,19,22,25,30,35,39,43,46,47,47,46,45,43,42,41,41,42,43,44,44,43,42,41,39,37,35,34,33,33,33,33,32,31,30,30,29,29,30,30,30,30,29,27,25,22,20,18,17,17,18,18,17,16,12,6,0,-8,-14,-20,-24,-25,-25,-23,-22,-22,-25,-32,-43,-57,-75,-95,-116,-136,-154,-170,-183,-192,-199,-202,-204,-203,-201,-199,-196,-194,-191,-189,-187,-185,-184,-182,-182,-183,-185,-188,-192,-194,-193,-185,-167,-134,-84,-17,67,165,271,378,477,561,621,654,657,631,579,508,424,335,247,167,97,39,-7,-41,-66,-82,-93,-100,-103,-105,-105,-104,-104,-104,-105,-107,-110,-112,-113,-113,-110,-104,-96,-86,-76,-67,-61,-57,-57,-59,-64,-69,-74,-77,-77,-75,-70,-64,-56,-47,-39,-31,-23,-15,-7,0,9,17,25,32,38,42,45,46,46,46,45,45,46,48,50,53,55,57,57,56,54,50,47,43,40,38,37,37,37,38,40,41,42,44,45,46,47,48,48,49,49,48,47,45,44,41,40,38,37,36,36,36,35,35,33,32,29,27,25,23,22,23,25,28,31,36";
          //perfect 2 PFData = "12,10,8,6,4,3,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,7,7,8,9,9,10,11,12,14,15,16,18,19,20,21,22,23,24,24,25,25,26,26,27,27,27,26,26,26,26,26,26,28,29,31,33,35,38,40,43,45,48,50,53,56,59,61,63,64,65,64,63,61,59,58,56,55,54,54,53,53,51,50,47,44,40,36,31,26,21,16,10,3,-3,-11,-18,-25,-32,-38,-42,-45,-46,-46,-44,-42,-38,-34,-31,-26,-22,-18,-14,-9,-5,-1,2,5,7,8,8,8,7,6,5,4,4,3,2,2,1,1,0,-1,-1,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,1,1,1,2,2,2,3,3,4,4,5,5,6,6,7,7,8,9,10,11,13,15,16,18,19,21,21,22,22,22,22,21,21,20,20,19,19,18,17,16,15,14,13,13,12,11,11,10,10,10,9,9,8,8,7,7,6,6,5,5,5,4,4,3,3,2,2,1,1,1,0,0,0,0,-1,-1,-2,-3,-3,-4,-5,-6,-7,-7,-8,-10,-11,-12,-13,-14,-15,-16,-16,-16,-15,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-1,0,1,2,3,4,5,6,6,7,8,9,10,11,12,12,13,12,12,11,10,10,10,11,13,16,19,22,24,25,24,22,18,12,6,-1,-8,-15,-21,-27,-32,-38,-45,-53,-61,-69,-77,-82,-86,-87,-86,-83,-79,-76,-74,-75,-77,-81,-86,-91,-94,-95,-93,-89,-83,-75,-65,-53,-36,-13,18,61,116,183,258,337,413,479,526,548,542,505,442,356,257,153,53,-35,-106,-157,-188,-203,-205,-199,-190,-181,-174,-170,-168,-168,-166,-162,-155,-144,-129,-112,-93,-74,-56,-39,-26,-15,-7,-1,2,3,3,1,-2,-6,-11,-16,-20,-25,-29,-33,-36,-38,-40,-41,-41,-41,-39,-38,-36,-33,-31,-29,-27,-25,-23,-22,-20,-19,-18,-16,-15,-13,-11,-10,-8,-7,-6,-5,-4,-3,-2,0,1,3,6,9,12,15,18,21,25,28,32,35,39,42,46,50,53,56,58,60,61,61,61,60,60,59,60,60,61,62,62,63,62,61,58,55,50,45,40,34,28,22,16,9,3,-4,-11,-18,-24,-29,-34,-37,-39,-41,-41,-41,-41,-41,-41,-41,-42,-43,-43,-43,-43,-42,-41,-39,-37,-35,-33,-30,-28,-25,-22,-19,-16,-12,-9,-5,-2,0,2,3,4,4,4,4,3,3,2,2,1,1,0,0,-1,-2,-2,-3,-4,-4,-4,-5,-5,-5,-6,-6,-7,-7,-8,-8,-9,-9,-9,-9,-9,-9,-9,-8,-8,-8,-7,-7,-7,-6,-6,-6,-5,-5,-4,-4,-3,-2,-1,-1,0,1,1,2,3,3,4,5,6,7,8,8,8,8,7,6,6,5,5,5,6,6,7,7,6,5,4,3,1,0,-1,-1,0,1,2,3,4,4,4,3,1,0,-1,-2,-2,-1,-1,0,1,1,1,0,-2,-3,-4,-4,-4,-3,-2,-1,0,1,1,1,-1,-2,-4,-5,-6,-6,-6,-5,-4,-3,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-1,0,3,5,7,10,12,14,16,17,19,20,21,23,24,25,25,25,24,23,21,20,18,18,18,19,21,24,25,26,24,20,13,3,-9,-24,-39,-54,-68,-80,-88,-95,-99,-102,-105,-108,-112,-116,-120,-123,-124,-122,-117,-109,-98,-87,-76,-66,-56,-46,-33,-14,16,59,116,188,269,355,437,506,553,572,559,514,440,344,237,127,25,-62,-129,-176,-204,-216,-218,-215,-211,-208,-208,-210,-212,-213,-211,-205,-196,-185,-172,-160,-149,-139,-130,-120,-109,-95,-78,-57,-34,-9,14,35,51,63,69,71,70,67,63,59,55,51,48,44,40,36,30,25,20,15,12,9,8,8,9,9,9,9,9,7,6,4,3,2,2,2,2,3,4,5,5,6,6,6,6,6,6,6,7,9,11,13,15,18,21,24,27,31,35,40,45,50,55,60,65,68,70,71,71,70,68,64,61,57,53,49,45,41,37,33,29,25,20,16,12,7,3,-2,-8,-13,-20,-27,-34,-41,-49,-56,-62,-67,-71,-73,-74,-74,-73,-71,-69,-67,-64,-62,-59,-56,-53,-51,-47,-44,-41,-38,-35,-32,-29,-26,-24,-21,-19,-16,-13,-9,-6,-3,1,3,6,7,8,9,9,9,8,7,7,6,5,5,4,3,2,2,1,0,-1,-2,-3,-4,-4,-5,-6,-6,-7,-8,-9,-10,-11,-12,-12,-13,-13,-13,-13,-13,-13,-12,-12,-12,-12,-12,-11,-11,-11,-10,-10,-10,-9,-9,-8,-8,-8,-7,-7,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-4,-4,-4,-5,-5,-5,-6,-5,-5,-5,-4,-3,-3,-2,-2,-1,-1,0,1,2,3,4,4,5,5,5,5,4,4,4,5,5,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,4,1,-2,-6,-9,-13,-15,-16,-16,-14,-11,-7,-3,2,8,14,20,27,35,43,51,58,63,65,62,55,43,27,8,-12,-31,-48,-62,-70,-75,-77,-78,-79,-83,-90,-100,-113,-128,-143,-154,-162,-164,-159,-148,-130,-105,-73,-34,14,71,136,209,286,364,435,495,535,550,537,496,428,341,241,139,41,-43,-108,-154,-180,-188,-185,-175,-161,-149,-140,-134,-131,-129,-127,-124,-119,-112,-104,-96,-90,-85,-82,-81,-81,-81,-81,-79,-76,-72,-68,-63,-59,-55,-52,-49,-46,-43,-39,-35,-30,-25,-19,-14,-9,-4,0,4,8,11,14,17,20,22,23,24,24,24,24,24,24,24,24,24,25,25,24,24,23,23,22,22,21,21,20,19,18,16,15,13,12,11,11,11,13,14,17,19,22,25,28,31,34,38,41,45,49,52,54,55,55,54,52,49,46,43,40,37,34,32,30,27,24,21,17,13,9,5,1,-3,-8,-12,-17,-22,-28,-34,-40,-46,-51,-56,-60,-62,-63,-63,-61,-59,-56,-53,-50,-46,-43,-39,-36,-32,-29,-25,-22,-19,-17,-16,-14,-14,-13,-13,-13,-13,-13,-13,-13,-12,-12,-12,-11,-11,-10,-9,-8,-6,-5,-3,-1,0,2,4,6,8,9,10,11,12,13,13,12,12,11,10,10,9,8,7,6,6,5,4,3,3,2,1,0,0,-1,-2,-3,-3,-4,-5,-6,-6,-7,-8,-9,-9,-9,-9,-9,-9,-8,-8,-7,-7,-6,-6,-5,-5,-5,-4,-4,-4,-3,-2,-2,-1,0,0,0,0,0,0,-1,-1,0,0,1,2,4,4,5,5,5,5,5,4,4,5,5,6,7,8,8,8,8,8,8,8,8,8,9,10,11,11,12,12,11,11,11,11,11,12,12,13,12,11,9,6,2,-2,-6,-9,-11,-12,-12,-11,-10,-9,-8,-7,-6,-5,-3,0,5,10,17,23,28,31,32,29,24,16,6,-7,-20,-33,-46,-58,-68,-77,-84,-89,-92,-95,-96,-97,-97,-96,-95,-94,-93,-92,-91,-89,-86,-81,-72,-59,-38,-8,32,84,146,216,291,364,430,483,515,522,502,456,387,300,204,106,14,-65,-126,-168,-191,-198,-193,-180,-164,-147,-132,-120,-111,-103,-97,-91,-85,-80,-75,-71,-69,-69,-70,-72,-75,-77,-77,-76,-73,-70,-65,-61,-57,-54,-52,-49,-47,-45,-42,-39,-34,-30,-25,-20,-16,-12,-9,-6,-3,-1,1,3,5,7,8,9,10,10,11,11,11,12,12,13,14,15,15,16,17,18,18,19,21,22,23,24,26,27,28,29,30,30,31,31,31,32,32,31,31,30,30,29,29,28,28,28,28,28,28,28,27,27,27,27,28,29,30,31,32,34,34,34,34,32,30,27,23,19,14,9,4,-1,-7,-13,-19,-25,-30,-35,-39,-42,-45,-46,-46,-45,-44,-43,-41,-40,-39,-37,-36,-35,-33,-32,-31,-29,-28,-27,-26,-25,-24,-24,-23,-23,-23,-22,-22,-21,-20,-19,-18,-17,-16,-15,-14,-12,-11,-9,-8,-6,-4,-2,-1,1,3,4,5,6,7,7,7,7,7,7,7,6,6,6,5,5,5,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,5,6,6,7,7,7,7,6,6,6,6,6,5,5,5,4,4,3,2,1,1,1,2,3,5,7,9,10,11,12,13,13,13,13,14,15,17,18,18,17,16,14,11,9,7,6,7,9,12,15,17,16,14,8,0,-11,-23,-35,-47,-58,-68,-76,-84,-92,-99,-106,-113,-118,-121,-121,-119,-114,-107,-100,-94,-90,-89,-93,-99,-106,-112,-114,-107,-90,-60,-16,41,111,190,273,356,432,496,544,570,572,550,505,439,357,266,170,76,-10,-84,-143,-186,-212,-224,-224,-215,-200,-182,-163,-146,-131,-120,-112,-108,-107,-108,-110,-112,-113,-112,-108,-102,-92,-80,-67,-53,-40,-30,-22,-17,-15,-15,-16,-18,-21,-23,-24,-25,-25,-25,-25,-26,-27,-27,-28,-29,-28,-27,-25,-23,-20,-17,-14,-12,-10,-8,-6,-5,-3,-1,1,3,5,7,9,10,11,12,13,13,13,13,14,15,16,19,21,25,29,33,38,43,48,54,60,66,73,80,87,93,98,102,104,104,102,99,94,89,83,78,72,68,63,58,53,48,43,36,30,23,16,9,2,-4,-11,-17,-25,-33,-41,-50,-59,-67,-74,-79,-83,-85,-85,-84,-82,-79,-76,-73,-70,-67,-64,-61,-58,-54,-51,-47,-43,-39,-36,-33,-31,-28,-25,-23,-20,-17,-14,-10,-6,-3,0,2,4,5,6,6,6,6,6,6,5,5,5,4,4,3,3,2,1,1,1,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-4,-4,-4,-4,-4,-4,-4,-4,-4,-4,-5,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-2,-1,-1,-1,-1,-2,-2,-3,-3,-3,-3,-3,-2,-2,-1,-1,-1,-2,-3,-3,-4,-4,-3,-3,-2,-3,-4,-6,-8,-12,-15,-18,-20,-21,-21,-20,-18,-15,-12,-9,-6,-1,3,10,18,27,37,46,55,61,64,62,57,47,33,18,2,-14,-29,-43,-56,-69,-81,-93,-104,-116,-125,-132,-136,-136,-132,-125,-116,-107,-99,-94,-93,-95,-99,-103,-104,-99,-86,-61,-25,24,84,152,225,298,367,428,475,505,516,507,479,432,370,296,215,132,52,-20,-82,-130,-164,-183,-190,-186,-174,-158,-141,-125,-112,-103,-98,-97,-99,-102,-105,-107,-107,-105,-100,-94,-86,-78,-70,-63,-56,-51,-46,-42,-39,-36,-33,-30,-27,-23,-20,-16,-13,-9,-6,-3,0,3,5,7,8,10,11,12,12,13,14,15,16,17,18,18,19,19,18,18,17,16,16,15,15,14,13,13,12,11,10,9,9,8,8,9,10,11,12,13,13,13,13,13,13,13,14,15,16,18,19,21,23,25,27,29,32,35,39,43,47,51,55,57,58,58,56,52,48,42,36,29,22,15,8,0,-7,-15,-22,-29,-35,-40,-44,-47,-48,-49,-49,-48,-48,-47,-47,-47,-47,-47,-47,-47,-46,-46,-44,-43,-41,-40,-38,-37,-36,-35,-34,-33,-31,-30,-28,-27,-25,-22,-20,-17,-15,-12,-9,-6,-3,0,3,7,11,14,18,21,23,25,26,26,26,25,23,22,20,19,19,18,17,17,16,14,12,10,8,6,4,3,2,2,2,3,3,3,2,1,0,-2,-4,-5,-6,-7,-7,-7,-7,-6,-6,-6,-6,-7,-7,-7,-7,-8,-8,-8,-8,-8,-8,-9,-9,-10,-10,-11,-11,-11,-11,-11,-11,-11,-11,-12,-12,-12,-12,-11,-11,-10,-9,-9,-9,-9,-10,-10,-11,-11,-10,-9,-6,-4,-1,2,4,6,8,10,12,14,16,19,21,24,26,26,26,25,23,20,18,16,16,18,21,26,31,35,37,37,33,26,15,2,-13,-29,-44,-58,-70,-79,-85,-90,-94,-98,-103,-108,-114,-121,-127,-132,-135,-134,-129,-120,-107,-89,-66,-39,-6,34,80,134,195,262,330,397,455,501,526,528,504,453,378,286,183,79,-19,-104,-170,-214,-238,-245,-237,-221,-200,-179,-161,-146,-134,-124,-115,-106,-95,-84,-73,-62,-53,-47,-43,-41,-41,-42,-43,-43,-41,-39,-36,-33,-30,-27,-26,-25,-25,-24,-23,-22,-20,-18,-15,-13,-11,-10,-9,-8,-8,-8,-8,-7,-7,-6,-6,-6,-6,-6,-7,-7,-8,-8,-9,-9,-10,-10,-10,-9,-9,-8,-7,-5,-3,-1,1,2,3,4,5,6,7,8,11,14,17,21,25,30,34,38,42,46,51,57,63,69,75,81,84,86,86,83,79,74,69,64,60,57,56,54,53,50,46,40,33,25,16,8,1,-5,-10,-14,-17,-21,-25,-31,-38,-46,-54,-62,-68,-73,-75,-75,-73,-70,-67,-63,-59,-56,-54,-52,-49,-47,-44,-40,-37,-32,-28,-25,-22,-19,-16,-14,-11,-8,-4,0,4,8,12,15,18,19,20,21,20,20,19,19,18,17,16,15,14,13,12,10,9,8,7,6,5,4,3,2,0,-1,-2,-3,-4,-5,-5,-6,-7,-8,-9,-11,-12,-12,-12,-12,-11,-9,-8,-6,-5,-4,-4,-4,-5,-6,-8,-9,-9,-9,-8,-7,-6,-4,-2,-1,0,0,0,0,-1,-1,-1,-2,-1,-1,0,0,1,1,1,0,0,-1,-1,-2,-2,-1,1,2,5,7,10,12,14,15,16,17,18,18,19,20,20,21,22,23,23,24,24,25,25,26,28,29,31,31,30,28,23,16,6,-5,-18,-31,-45,-58,-70,-80,-90,-99,-106,-114,-121,-127,-132,-135,-136,-134,-129,-121,-111,-100,-88,-76,-65,-55,-44,-30,-10,17,54,103,163,231,304,376,440,490,520,526,505,458,389,303,207,109,17,-63,-128,-175,-205,-219,-221,-214,-202,-187,-173,-159,-148,-138,-129,-121,-113,-106,-100,-95,-91,-88,-86,-83,-80,-76,-70,-62,-53,-44,-34,-25,-18,-13,-9,-7,-7,-7,-7,-8,-8,-8,-8,-8,-8,-9,-9,-10,-11,-12,-12,-12,-12,-11,-10,-8,-7,-6,-5,-4,-4,-3,-3,-2,-1,0,1,2,4,5,6,7,8,9,9,9,10,10,11,12,14,17,19,23,27,30,34,39,43,48,53,59,65,70,75,80,83,84,84,83,80,76,71,66,62,57,53,50,46,42,38,33,28,22,15,9,3,-3,-9,-15,-22,-29,-36,-44,-52,-60,-68,-74,-80,-83,-84,-84,-82,-80,-76,-72,-69,-65,-62,-59,-55,-52,-48,-44,-39,-35,-30,-26,-22,-18,-15,-11,-7,-3,2,6,12,17,21,25,29,31,32,33,33,32,31,30,28,27,26,25,23,22,20,19,17,15,14,12,11,10,9,8,7,6,5,3,2,0,-2,-3,-4,-4,-5,-5,-5,-6,-6,-6,-7,-7,-7,-6,-6,-5,-5,-4,-4,-5,-5,-6,-8,-9,-10,-10,-11,-11,-11,-12,-12,-13,-15,-16,-17,-17,-17,-16,-15,-13,-12,-11,-11,-12,-14,-16,-18,-20,-20,-19,-18,-15,-11,-8,-4,0,4,9,15,23,32,42,53,63,72,78,81,80,75,67,57,46,34,22,9,-3,-16,-29,-43,-58,-71,-83,-92,-98,-99,-96,-90,-82,-75,-70,-67,-70,-76,-87,-99,-113,-124,-133,-135,-129,-114,-88,-51,-1,59,129,206,285,362,430,484,519,530,514,473,408,324,228,128,32,-54,-124,-174,-204,-214,-208,-191,-168,-142,-119,-100,-89,-84,-86,-91,-99,-106,-112,-115,-115,-111,-104,-96,-86,-76,-68,-60,-55,-50,-47,-45,-43,-41,-38,-35,-32,-29,-25,-22,-18,-15,-12,-9,-7,-4,-2,0,1,3,4,5,6,7,8,10,11,12,13,14,14,14,13,13,12,12,11,11,11,10,10,9,9,8,7,7,7,7,8,9,10,11,11,12,11,11,10,9,9,9,10,11,14,16,19,22,26,30,34,39,44,50,57,64,70,76,80,83,83,82,78,72,66,58,49,41,32,23,13,4,-5,-14,-23,-30,-37,-42,-46,-48,-49,-49,-49,-49,-48,-49,-49,-50,-50,-51,-51,-51,-50,-49,-48,-46,-44,-43,-41,-40,-39,-38,-37,-35,-34,-32,-30,-27,-25,-22,-20,-17,-14,-11,-8,-4,-1,3,7,11,15,18,21,24,26,27,27,27,26,25,24,23,21,20,19,17,16,15,13,12,11,9,8,7,6,5,4,3,2,1,0,-1,-2,-3,-4,-5,-5,-6,-6,-6,-6,-5,-5,-5,-4,-4,-4,-4,-4,-4,-3,-3,-2,-1,0,0,1,2,2,2,3,3,3,4,4,4,5,5,5,4,4,4,3,3,3,3,4,5,5,6,6,6,5,4,2,-1,-4,-8,-13,-19,-27,-35,-45,-56,-66,-76,-84,-90,-94,-95,-93,-90,-85,-79,-74,-69,-67,-66,-66,-68,-70,-72,-73,-73,-71,-67,-60,-51,-37,-19,5,36,76,124,180,243,308,373,431,478,508,517,503,465,406,329,240,146,55,-28,-98,-151,-188,-209,-216,-213,-205,-194,-184,-175,-168,-164,-160,-156,-151,-143,-133,-121,-108,-94,-82,-70,-61,-54,-48,-44,-41,-39,-38,-37,-37,-37,-38,-40,-42,-45,-47,-49,-51,-51,-51,-49,-47,-44,-40,-36,-32,-28,-24,-19,-15,-11,-7,-3,1,4,7,9,11,12,13,14,15,15,15,15,15,15,15,15,15,17,18,21,23,27,30,34,38,42,47,51,56,61,66,70,74,77,79,79,79,76,74,70,66,63,59,56,54,51,48,45,42,37,33,28,22,17,12,6,1,-5,-11,-17,-24,-30,-37,-44,-49,-54,-58,-60,-61,-60,-59,-58,-56,-54,-52,-51,-50,-48,-47,-45,-43,-40,-38,-35,-32,-30,-27,-25,-22,-19,-17,-13,-10,-7,-3,0,3,5,7,8,9,8,8,7,6,6,5,4,4,3,2,1,0,-1,-2,-4,-5,-6,-7,-8,-9,-10,-11,-12,-14,-16,-17,-19,-20,-21,-21,-21,-21,-21,-20,-19,-19,-18,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-9,-9,-8,-8,-7,-6,-4,-3,-1,1,2,3,3,4,4,4,4,4,5,4,4,2,0,-2,-5,-9,-11,-13,-15,-15,-14,-13,-11,-8,-6,-3,1,5,11,18,26,34,42,49,54,56,54,49,41,31,20,8,-5,-16,-28,-40,-52,-64,-77,-90,-102,-112,-118,-120,-117,-111,-101,-91,-82,-76,-75,-79,-88,-99,-111,-121,-127,-125,-114,-94,-63,-24,23,77,136,198,261,322,380,430,468,492,497,482,445,388,314,229,138,50,-30,-95,-143,-173,-184,-182,-169,-151,-132,-116,-104,-96,-94,-94,-95,-96,-95,-93,-89,-83,-78,-74,-70,-69,-68,-67,-66,-65,-63,-60,-56,-52,-48,-46,-44,-43,-43,-43,-43,-42,-40,-38,-35,-31,-27,-24,-20,-17,-14,-11,-8,-5,-2,1,5,8,12,15,18,21,23,26,29,32,35,38,42,46,50,54,58,61,64,67,69,70,70,70,69,67,66,64,62,61,59,58,57,56,54,53,51,50,49,48,48,50,53,57,62,68,74,79,83,85,85,83,80,75,70,65,61,58,55,52,48,44,38,32,24,15,7,0,-5,-9,-12,-15,-18,-25,-34,-47,-63,-81,-100,-117,-131,-140,-145,-144,-140,-134,-127,-121,-117,-116,-116,-118,-119,-118,-116,-111,-103,-94,-84,-75,-66,-60,-55,-52,-50,-48,-45,-41,-36,-30,-24,-17,-12,-7,-3,1,3,5,6,8,9,10,11,12,13,13,13,12,12,12,12,13,13,14,14,15,16,16,17,19,20,23,25,27,29,31,32,32,33,32,32,32,32,33,33,34,34,34,34,33,32,32,31,32,33,35,38,41,44,47,50,52,55,57,59,62,64,67,70,73,74,74,73,72,69,67,65,63,63,64,65,66,67,67,64,59,52,42,30,16,1,-15,-32,-50,-68,-86,-104,-122,-138,-154,-167,-177,-184,-187,-188,-186,-184,-181,-181,-184,-191,-202,-216,-230,-243,-249,-245,-228,-196,-148,-88,-19,51,117,170,204,215,201,166,113,52";
          //perfect 2 PFData = "27,48,67,83,94,101,103,101,97,93,88,85,83,82,81,79,76,70,61,50,36,21,6,-10,-25,-39,-51,-63,-73,-83,-93,-102,-110,-118,-125,-131,-135,-139,-141,-143,-144,-144,-144,-144,-143,-141,-139,-136,-132,-128,-125,-122,-120,-118,-118,-118,-117,-116,-112,-107,-100,-90,-78,-66,-53,-41,-30,-21,-14,-9,-5,-2,1,4,8,12,18,23,29,35,40,44,48,50,51,51,51,51,50,49,47,46,44,42,40,38,36,34,33,32,31,31,30,30,30,30,29,29,30,30,30,31,32,32,32,32,31,30,29,28,27,26,26,25,25,25,24,24,23,22,21,20,20,21,22,23,24,25,24,23,21,19,16,14,14,14,15,18,21,24,28,31,35,40,45,53,61,71,82,92,100,106,109,108,103,94,83,71,58,45,33,21,9,-3,-15,-27,-38,-48,-56,-61,-63,-62,-59,-54,-49,-45,-45,-50,-59,-73,-91,-109,-127,-140,-145,-139,-117,-78,-22,52,139,236,336,431,512,573,607,609,579,519,434,330,218,106,3,-85,-153,-198,-221,-224,-213,-191,-163,-134,-107,-85,-69,-59,-54,-54,-58,-64,-71,-77,-82,-85,-85,-83,-78,-72,-64,-57,-49,-43,-37,-33,-29,-25,-21,-16,-11,-4,3,11,19,27,34,40,45,49,52,55,57,58,59,60,61,61,61,61,61,61,61,61,61,61,62,62,63,64,64,65,66,67,68,70,71,72,73,74,74,74,74,73,72,71,70,69,67,65,63,62,60,58,57,55,54,53,52,51,50,49,49,48,48,48,48,48,48,48,48,47,47,45,43,41,38,35,31,27,24,20,16,12,8,4,0,-4,-7,-9,-11,-12,-13,-13,-13,-12,-12,-11,-11,-11,-10,-10,-10,-10,-9,-8,-7,-5,-3,-2,0,2,4,5,6,8,9,11,13,15,17,19,21,24,26,28,30,33,35,38,41,44,47,50,53,56,57,59,59,59,58,58,57,56,54,53,52,51,49,48,46,44,43,42,41,40,40,40,39,38,37,35,33,30,28,26,25,25,25,26,27,28,28,28,27,26,24,22,20,20,19,20,20,21,22,23,23,22,22,21,21,21,22,23,24,26,27,28,28,28,28,27,27,28,28,29,30,30,29,27,24,21,18,15,12,12,12,14,16,19,22,26,29,33,37,43,50,59,69,79,87,93,96,94,88,79,66,51,36,21,8,-4,-15,-25,-35,-45,-55,-65,-74,-82,-86,-89,-88,-85,-81,-77,-76,-78,-83,-92,-102,-111,-117,-116,-106,-83,-46,4,66,138,216,294,368,432,481,510,517,501,462,402,326,239,147,56,-27,-98,-153,-190,-209,-211,-199,-177,-147,-115,-84,-57,-35,-21,-13,-12,-15,-23,-31,-40,-48,-53,-57,-58,-56,-54,-51,-48,-46,-44,-43,-41,-40,-39,-37,-34,-31,-27,-23,-20,-16,-13,-10,-7,-4,-2,1,3,6,8,11,13,15,17,19,21,23,25,27,29,31,33,34,36,37,38,38,39,40,41,41,42,42,43,44,45,46,47,49,51,53,56,59,62,65,68,71,74,77,80,83,86,88,91,92,94,95,95,95,95,95,95,95,95,95,96,96,96,95,93,91,87,83,79,74,70,65,61,58,55,52,48,44,39,34,28,21,14,6,-2,-10,-18,-27,-36,-46,-57,-68,-78,-88,-96,-102,-106,-108,-107,-105,-100,-95,-89,-84,-78,-73,-68,-63,-58,-52,-46,-40,-33,-27,-20,-14,-8,-2,3,9,15,22,29,37,44,51,57,62,66,68,68,68,66,64,62,60,58,57,55,53,51,49,46,43,40,37,34,32,30,27,25,22,20,16,13,9,6,3,0,-2,-3,-4,-3,-2,-1,1,2,4,6,7,9,11,13,15,18,20,22,24,26,27,29,30,32,33,35,37,39,41,43,45,46,48,49,49,50,51,52,52,52,52,51,50,48,46,44,43,42,41,40,40,40,39,39,39,38,38,39,41,43,46,49,52,53,52,48,41,31,18,3,-12,-27,-41,-53,-63,-70,-75,-80,-84,-88,-93,-97,-102,-106,-109,-109,-107,-102,-94,-84,-72,-58,-40,-19,7,40,81,131,188,251,317,380,434,475,496,494,469,421,354,274,186,100,22,-44,-93,-126,-142,-144,-138,-126,-112,-100,-91,-86,-83,-83,-83,-83,-82,-80,-77,-74,-70,-66,-64,-61,-59,-56,-53,-48,-43,-37,-30,-24,-19,-14,-10,-8,-6,-4,-2,0,2,4,7,10,13,15,17,18,20,21,23,24,26,28,30,31,33,34,35,35,36,36,37,38,39,41,42,44,46,48,49,51,53,56,58,61,64,66,69,71,72,73,73,72,71,70,68,65,63,61,58,56,54,51,49,47,44,43,41,39,38,37,36,35,34,34,34,34,33,33,32,31,30,28,26,24,22,19,16,13,9,5,1,-3,-7,-11,-14,-17,-20,-21,-22,-22,-21,-20,-18,-16,-13,-11,-9,-6,-4,-2,1,3,5,7,9,10,11,12,13,13,14,14,14,14,15,15,16,16,17,18,19,21,22,24,25,27,29,31,34,36,38,40,42,44,45,46,47,47,46,46,45,44,43,42,42,41,40,39,38,37,35,35,34,33,33,32,32,31,30,29,28,27,26,26,25,25,24,24,24,24,24,23,23,23,24,25,26,27,29,30,31,31,31,30,29,28,27,26,26,26,25,24,22,20,17,14,12,10,9,10,11,14,17,21,24,26,27,28,28,28,28,29,31,34,37,40,42,43,43,41,39,36,33,31,31,32,34,36,39,40,39,36,29,19,6,-9,-24,-39,-52,-63,-71,-75,-78,-78,-78,-79,-82,-86,-91,-98,-104,-108,-109,-104,-93,-73,-44,-6,41,96,160,228,300,371,438,496,539,565,568,547,503,436,351,253,151,50,-42,-120,-181,-222,-245,-252,-246,-231,-212,-191,-170,-151,-134,-119,-105,-92,-79,-67,-56,-47,-39,-34,-31,-30,-30,-32,-34,-36,-37,-38,-39,-40,-40,-40,-40,-38,-36,-33,-28,-22,-16,-8,0,8,16,23,30,37,43,48,53,57,60,63,65,65,65,65,64,62,61,59,58,57,56,55,55,55,56,57,58,60,62,64,67,69,72,75,78,81,83,85,86,87,87,86,84,82,79,76,72,69,65,62,59,56,54,51,48,45,41,38,35,33,30,28,26,24,21,19,17,14,12,9,7,5,3,1,-1,-2,-3,-5,-7,-9,-11,-14,-17,-19,-21,-23,-23,-23,-22,-20,-18,-15,-11,-8,-4,0,4,9,13,17,21,25,28,31,33,34,35,35,35,35,34,34,33,33,32,32,31,31,31,31,31,31,31,32,33,34,35,36,37,38,39,40,41,42,42,42,43,42,42,42,41,40,40,39,38,38,37,36,36,35,34,34,33,33,33,32,32,32,32,31,31,31,30,30,29,29,29,29,29,28,28,28,28,28,28,28,28,29,29,30,31,31,31,30,29,28,27,25,24,22,21,19,18,16,14,11,9,7,6,5,6,7,9,11,14,17,18,20,21,21,22,22,23,25,26,28,30,32,33,34,34,35,36,38,41,45,50,56,60,63,63,60,52,41,28,12,-4,-20,-33,-44,-52,-57,-61,-62,-64,-66,-69,-73,-79,-85,-91,-98,-103,-108,-111,-111,-109,-102,-90,-70,-41,0,53,118,193,275,358,438,506,557,585,587,562,512,440,352,257,162,73,-5,-66,-111,-140,-155,-159,-155,-146,-134,-122,-110,-98,-87,-76,-66,-56,-49,-43,-40,-40,-42,-45,-49,-53,-56,-57,-56,-54,-51,-46,-42,-38,-34,-30,-27,-23,-19,-14,-9,-2,5,12,20,27,33,39,44,49,52,55,58,59,61,61,61,61,61,61,60,60,59,59,59,59,59,59,59,60,60,60,61,61,61,62,62,62,62,62,62,63,63,64,64,65,65,66,66,66,67,68,69,70,71,72,73,73,73,71,69,67,63,60,57,54,51,48,45,43,40,37,33,30,27,23,20,17,15,12,9,6,3,-1,-5,-9,-13,-17,-19,-21,-22,-22,-21,-20,-17,-15,-12,-8,-5,-1,2,6,10,13,16,19,22,24,25,26,26,26,26,26,26,26,26,25,25,25,25,25,26,26,27,28,30,31,33,34,36,37,38,40,41,42,43,43,44,45,45,46,46,46,46,45,45,44,43,41,39,37,35,32,30,28,26,25,24,24,23,22,21,20,18,17,14,13,11,10,9,9,9,10,11,11,12,13,13,14,15,16,18,19,20,21,22,22,22,22,21,21,21,21,22,23,24,24,25,25,25,24,24,24,25,26,28,29,29,29,28,26,23,20,17,15,15,16,19,23,27,33,38,44,50,57,65,74,85,98,110,121,130,134,134,128,117,102,85,67,49,33,18,6,-5,-15,-26,-37,-49,-60,-71,-80,-87,-91,-93,-93,-92,-94,-97,-104,-115,-126,-137,-144,-143,-132,-108,-70,-17,48,123,204,286,363,431,485,521,538,533,508,463,401,327,245,160,78,2,-62,-112,-147,-166,-171,-166,-151,-133,-113,-94,-79,-68,-62,-60,-61,-64,-67,-70,-71,-71,-68,-65,-60,-55,-50,-44,-39,-34,-29,-25,-20,-14,-9,-2,4,11,18,26,33,40,47,53,58,62,64,66,67,68,68,68,68,68,69,69,69,68,68,67,65,64,63,62,61,61,62,62,62,62,62,61,60,59,58,57,57,57,58,58,59,59,58,57,55,52,49,47,45,44,43,43,44,45,46,46,47,47,47,47,48,49,50,52,55,57,59,60,60,59,58,55,52,48,44,40,36,31,26,21,16,11,6,2,-2,-4,-6,-7,-7,-6,-5,-3,-1,0,2,4,5,7,8,10,11,13,14,15,17,17,18,19,19,19,20,20,20,21,22,23,24,25,26,27,29,31,32,34,36,39,41,43,46,48,50,52,53,54,55,55,54,54,53,52,51,50,50,49,48,47,46,45,44,43,42,42,41,40,40,39,38,38,37,36,35,34,33,32,32,31,31,31,31,31,31,31,32,32,32,32,33,33,34,34,34,34,34,34,34,34,33,33,33,33,33,33,33,32,32,32,32,32,33,33,34,34,35,35,35,34,34,33,33,33,33,33,33,34,35,36,38,40,42,45,49,53,57,62,66,70,73,75,77,77,77,75,72,66,60,52,42,32,21,11,2,-6,-12,-16,-19,-19,-19,-18,-15,-13,-9,-6,-1,5,11,18,25,32,38,44,48,52,54,56,56,56,55,53,51,48,44,39,34,30,27,25,24,25,27,31,34,39,44,49,55,63,72,82,93,104,114,120,124,123,117,108,95,81,65,50,35,21,8,-5,-18,-32,-46,-59,-71,-80,-85,-86,-83,-77,-71,-66,-64,-68,-76,-90,-107,-125,-140,-149,-149,-136,-110,-70,-17,48,120,198,276,350,417,473,512,533,533,511,469,407,331,244,154,67,-12,-77,-126,-157,-170,-168,-155,-135,-112,-91,-75,-64,-60,-61,-66,-73,-79,-83,-84,-81,-74,-64,-53,-41,-30,-19,-11,-5,0,3,6,7,9,10,12,14,16,19,21,23,26,28,30,32,34,36,38,40,42,44,45,47,48,49,50,52,53,54,55,57,58,59,60,61,62,63,64,66,67,69,70,72,73,74,75,75,75,74,73,72,70,68,66,64,62,61,59,57,55,53,51,50,48,47,45,44,43,41,40,39,38,37,36,35,34,33,32,30,29,28,26,25,23,22,20,19,17,15,13,11,9,8,7,6,6,6,7,8,9,10,11,13,14,15,17,18,19,21,22,23,24,25,26,26,27,27,27,28,28,28,28,29,29,30,30,31,32,33,34,35,36,37,38,39,41,42,44,45,46,47,48,49,49,49,49,48,48,47,47,46,46,45,44,44,43,42,42,41,41,41,40,40,40,40,40,39,39,39,38,38,38,38,38,38,38,37,37,37,37,37,37,37,38,38,39,39,40,40,39,39,38,38,37,37,36,35,33,31,29,26,24,21,19,18,17,17,18,19,21,23,26,28,31,34,38,42,46,50,54,57,58,58,56,53,48,43,37,31,25,20,15,11,6,2,-2,-7,-11,-15,-19,-22,-24,-27,-29,-32,-35,-39,-44,-49,-55,-60,-65,-67,-67,-64,-57,-47,-32,-13,11,39,74,113,159,209,263,318,372,421,460,486,497,488,461,415,354,280,199,116,36,-35,-96,-143,-177,-198,-208,-210,-205,-195,-184,-171,-157,-143,-128,-111,-94,-76,-58,-41,-25,-12,0,8,14,18,20,20,20,19,17,14,11,8,4,0,-4,-7,-9,-10,-9,-8,-5,-1,3,8,12,17,21,26,30,33,37,40,43,46,48,50,51,52,52,52,52,51,50,50,49,49,49,49,50,51,52,54,57,59,62,66,69,73,77,81,85,89,93,96,98,100,100,99,97,94,91,87,84,80,77,74,72,69,66,62,59,55,51,47,43,39,35,31,27,23,19,14,9,4,-1,-5,-8,-10,-11,-12,-11,-10,-8,-6,-4,-3,-1,1,2,4,6,8,10,13,15,17,19,20,22,24,25,27,29,32,34,36,38,40,42,43,43,44,44,43,43,43,42,41,41,40,39,39,38,37,37,36,36,35,35,34,33,33,32,31,30,29,28,27,27,26,26,25,25,25,25,25,25,25,25,26,26,26,27,27,27,28,28,28,28,28,28,28,28,27,27,27,26,26,25,25,25,25,25,25,26,26,27,28,29,30,32,33,35,36,38,39,40,42,43,44,45,46,47,48,49,50,51,51,52,52,52,52,52,52,53,54,55,57,58,60,61,62,64,65,66,68,69,71,72,73,74,73,71,69,65,60,55,49,43,37,32,27,23,19,16,13,10,6,2,-4,-10,-18,-26,-35,-44,-53,-61,-68,-74,-80,-85,-90,-95,-99,-102,-102,-97,-86,-68,-40,-1,47,105,169,236,302,362,411,445,461,457,432,389,330,260,183,106,32,-32,-86,-126,-153,-169,-175,-175,-171,-165,-159,-154,-148,-141,-130,-114,-93,-66,-34,1,38,72,102,127,144,154,157,156,151,143,135,127,119,111,104,97,89,81,74,68,63,60,59,60,62,66,70,74,78,81,84,86,89,91,93,96,98,99,100,99,98,95,91,87,83,78,74,71,68,66,64,63,63,63,63,64,65,67,68,70,72,73,75,77,79,81,83,84,84,83,82,79,76,72,69,66,65,64,64,64,63,62,58,53,46,38,27,15,3,-11,-25,-39,-55,-71,-88,-105,-122,-138,-152,-163,-171,-176,-176,-174,-169,-162,-154,-146,-138,-131,-124,-117,-110,-102,-94,-85,-76,-67,-59,-51,-44,-37,-31,-24,-17,-10,-2,7,16,25,32,39,43,46,47,46,44,42,39,36,34,33,31,30,28,25,22,19,15,10,6,1,-4,-8,-13,-18,-24,-30,-36,-43,-50,-56,-61,-65,-67,-66,-64,-61,-56,-50,-45,-39,-34,-29,-24,-20,-15,-9,-3,4,11,18,26,33,40,47,54,62,70,79,88,97,107,116,123,130,134,137,138,137,136,134,131,128,126,123,121,118,115,112,110,107,104,101,99,96,95,93,92,90,89,87,85,83,81,79,77,75,74,72,72,71,70,70,70,69,68,67,66,65,64,63,62,61,60,60,59,59,58,57,56,55,54,54,54,54,56,57,57,57,55,51,46,39,31,23,16,11,7,6,6,7,8,8,7,6,3,1,0,0,2,5,8,10,7,0,-12,-29,-49,-67,-80,-81,-68,-36,15,84,168,259,351,435,504,552,575,572,544,493,426,348,264,180,101,29,-33,-83,-121,-147,-160,-163,-157,-143,-125,-104,-84,-68,-56,-50,-50,-54,-62,-70,-77,-82,-82,-79,-71,-61,-49,-37,-26,-16,-8,-3,2,5,9,13,18,24,30,37,45,52,58,64,70,74,78,80,82,83,83,83,83,82,81,81,80,80,79,78,77,76,75,73,71,69,67,65,63,61,58,55,52,49,46,43,41,39,38,38,39,41,42,44,47,50,52,55,59,62,65,68,71,73,75,75,75,74,73,71,69,67,65,64,62,60,59,57,55,53,51,49,47,46,44,43,42,40,39,37,36,34,32,30,29,28,26,25,25,24,24,23,23,23,22,22,21,21,20,20,20,20,20,20,21,22,23,24,25,26,27,28,29,30,30,31,33,34,35,37,38,40,41,43,44,46,48,50,52,54,56,58,59,61,61,62,62,62,61,61,60,59,58,58,57,56,55,55,54,53,52,51,50,50,49,49,48,48,47,46,45,44,43,43,42,41,41,41,41,41,41,41,40,40,40,40,40,40,41,41,41,41,41,41,40,39,39,38,37,37,37,37,37,37,37,36,36,35,35,35,35,36,36,37,37,37,36,35,33,30,29,28,27,28,30,33,37,40,44,48,53,58,64,71,79,87,95,102,107,110,110,106,100,92,82,71,61,50,41,31,22,13,4,-6,-15,-24,-31,-37,-41,-43,-44,-44,-45,-48,-53,-60,-69,-79,-90,-99,-106,-110,-108,-101,-88,-67,-37,0,48,104,168,237,310,380,442,491,522,530,514,475,414,338,252,165,83,12,-45,-84,-108,-118,-118,-111,-102,-91,-82,-75,-70,-65,-60,-55,-49,-44,-38,-34,-32,-32,-34,-37,-39,-40,-40,-37,-32,-25,-17,-8,0,8,14,20,26,31,36,41,47,52,57,61,63,64,65,64,63,62,61,61,60,60,60,60,59,58,56,54,52,51,49,48,47,46,44,43,41,39,37,34,33,31,30,29,29,30,30,31,31,31,32,32,32,33,33,34,34,35,36,37,37,38,39,39,40,41,41,42,43,44,45,46,47,47,48,48,48,48,48,47,47,47,46,46,46,45,45,45,44,44,43,43,42,42,41,40,40,39,39,38,37,36,35,34,34,33,33,33,33,34,34,35,35,36,36,37,37,37,38,38,39,40,41,41,42,43,43,44,45,46,47,48,49,50,51,52,53,54,54,54,54,54,54,54,53,53,52,52,51,50,49,49,48,48,48,48,48,48,49,49,50,50,51,51,52,53,53,54,54,54,54,54,53,51,50,48,46,45,43,42,41,39,38,37,35,33,31,28,26,23,20,18,15,12,9,6,2,-1,-5,-8,-10,-12,-14,-14,-14,-13,-12,-10,-8,-6,-4,-2,-1,1,2,4,6,8,11,15,19,23,28,32,37,41,44,48,50,53,55,57,60,62,64,67,70,72,75,77,78,79,80,80,79,78,76,73,70,65,59,51,41,29,16,3,-11,-23,-33,-41,-46,-47,-47,-46,-45,-46,-49,-54,-61,-68,-74,-77,-74,-64,-45,-17,21,68,123,185,252,322,392,460,521,571,606,621,613,580,521,441,343,234,123,18,-74,-148,-199,-228,-236,-229,-210,-185,-160,-136,-116,-100,-88,-77,-66,-54,-41,-28,-15,-3,6,12,16,17,16,16,16,17,20,25,30,34,38,41,42,43,43,42,43,43,45,47,48,50,51,51,51,50,49,48,47,46,45,45,44,43,42,40,39,36,34,32,30,28,27,26,26,26,27,28,29,30,31,33,34,35,37,38,39,40,42,44,46,49,52,55,58,61,64,68,71,75,79,84,88,92,95,98,99,100,99,97,94,91,88,85,82,80,77,75,72,70,66,63,59,55,51,47,43,39,35,30,26,21,15,10,5,0,-4,-8,-10,-11,-11,-10,-8,-6,-3,0,3,5,8,10,12,14,17,19,22,26,29,33,37,40,43,46,48,51,53,56,59,62,65,69,72,75,77,78,78,77,75,72,69,66,64,62,61,60,60,60,60,60,59,58,56,54,52,50,48,47,46,44,43";
          //corrected PFData = "17,7,1,1,9,27,53,85,121,158,193,224,250,272,290,306,320,335,350,367,385,402,420,436,452,468,485,505,527,550,574,595,606,603,578,527,445,332,190,26,-153,-334,-506,-657,-779,-867,-920,-940,-933,-908,-872,-832,-793,-754,-715,-671,-617,-548,-462,-359,-243,-119,3,115,209,280,326,348,352,341,323,304,286,271,260,250,238,224,205,183,158,132,109,91,77,68,63,60,57,54,49,43,37,32,29,26,25,23,20,14,5,-7,-20,-32,-41,-46,-45,-39,-30,-20,-11,-5,-3,-7,-15,-26,-39,-51,-61,-69,-75,-77,-76,-71,-61,-44,-19,15,57,105,155,202,239,261,264,246,209,156,92,26,-37,-90,-130,-156,-168,-169,-163,-155,-147,-140,-136,-133,-130,-123,-112,-95,-73,-47,-18,9,34,54,69,79,83,83,81,78,73,69,64,59,54,48,41,34,27,20,14,9,4,1,-1,-3,-5,-7,-9,-12,-16,-20,-25,-29,-32,-35,-37,-37,-37,-37,-36,-34,-33,-32,-31,-31,-30,-29,-28,-26,-24,-22,-19,-16,-14,-12,-10,-8,-7,-6,-5,-3,-1,2,5,8,10,13,14,15,16,16,16,16,16,17,18,19,19,19,18,17,16,14,13,14,15,18,21,24,27,29,30,28,26,23,19,18,18,20,25,31,38,45,49,50,48,42,34,25,16,9,4,2,3,7,12,17,21,24,24,22,19,15,12,9,8,8,10,12,15,17,17,16,14,10,6,2,-2,-4,-5,-6,-6,-6,-7,-9,-12,-16,-21,-26,-32,-38,-43,-49,-55,-61,-69,-78,-89,-100,-112,-123,-133,-140,-145,-146,-144,-139,-133,-126,-119,-111,-104,-98,-91,-84,-76,-67,-58,-48,-38,-28,-19,-11,-3,5,14,23,33,45,57,70,83,95,106,115,123,129,133,135,136,135,133,129,124,118,111,103,95,89,84,80,78,78,79,82,86,91,98,107,119,134,151,170,188,205,217,224,223,214,199,177,152,126,102,80,62,48,36,24,10,-8,-33,-64,-100,-141,-183,-223,-261,-293,-319,-339,-354,-364,-372,-377,-379,-379,-375,-366,-352,-332,-308,-280,-250,-221,-195,-172,-151,-133,-114,-94,-71,-44,-13,19,50,78,102,120,134,146,160,178,205,240,283,331,378,417,443,449,434,398,343,276,204,135,74,27,-4,-19,-20,-13,0,13,24,30,32,30,24,18,10,3,-4,-11,-18,-26,-34,-42,-49,-55,-60,-63,-65,-65,-66,-67,-68,-71,-74,-76,-78,-77,-75,-70,-64,-58,-53,-50,-52,-57,-67,-80,-96,-112,-129,-145,-159,-172,-184,-196,-206,-216,-224,-230,-232,-230,-223,-212,-199,-186,-176,-169,-169,-173,-181,-187,-187,-175,-144,-91,-14,84,200,324,448,561,655,721,755,756,727,673,599,514,424,334,250,172,103,41,-12,-58,-96,-126,-148,-160,-165,-161,-152,-138,-122,-107,-94,-84,-78,-75,-75,-78,-82,-87,-94,-102,-110,-119,-128,-135,-141,-143,-141,-136,-127,-116,-104,-93,-83,-77,-73,-72,-73,-74,-74,-73,-69,-63,-55,-45,-35,-26,-17,-8,0,9,19,30,42,55,67,79,89,97,103,107,110,111,112,113,113,113,113,111,109,106,102,98,94,91,89,87,84,80,73,62,46,25,0,-29,-58,-87,-113,-134,-151,-162,-167,-169,-168,-165,-161,-157,-153,-149,-144,-138,-131,-122,-112,-101,-89,-78,-68,-58,-50,-43,-38,-32,-27,-21,-14,-7,2,10,19,28,36,43,49,54,58,60,62,64,65,66,67,69,70,70,70,69,68,68,68,70,74,80,88,98,108,118,126,130,132,130,127,122,118,116,118,124,134,147,162,177,190,198,202,199,190,175,154,130,102,73,44,14,-14,-43,-70,-98,-125,-153,-180,-207,-232,-254,-273,-286,-293,-295,-291,-283,-273,-262,-252,-244,-239,-237,-235,-233,-228,-221,-208,-192,-172,-151,-129,-110,-92,-78,-64,-51,-35,-17,7,35,66,98,128,154,173,185,189,187,180,170,162,155,150,148,148,149,148,145,140,131,121,110,99,89,81,75,69,64,59,54,47,39,31,22,13,5,-2,-8,-13,-17,-20,-22,-23,-25,-26,-27,-29,-30,-32,-33,-35,-36,-36,-35,-34,-32,-30,-27,-24,-21,-18,-15,-10,-5,1,8,15,21,27,30,31,29,25,19,12,5,-2,-7,-11,-13,-15,-17,-19,-21,-24,-28,-33,-39,-47,-58,-72,-89,-109,-132,-157,-182,-206,-227,-245,-260,-270,-277,-280,-279,-272,-257,-233,-196,-145,-80,-2,86,179,271,356,430,489,532,558,569,569,558,538,508,469,417,352,274,184,87,-12,-106,-186,-248,-288,-304,-300,-280,-251,-218,-188,-164,-148,-138,-133,-130,-126,-120,-110,-99,-87,-76,-69,-67,-68,-71,-75,-77,-75,-69,-59,-45,-29,-13,2,13,21,26,28,29,29,29,29,30,30,30,29,28,26,24,22,20,20,19,19,20,19,19,18,16,14,12,11,9,8,7,7,6,6,5,4,3,2,1,1,1,1,1,1,2,2,2,2,2,2,2,1,1,2,2,3,3,3,3,2,1,-1,-3,-4,-5,-6,-5,-3,-1,2,5,8,11,12,13,13,13,12,11,9,8,7,5,3,0,-3,-6,-9,-12,-14,-14,-13,-11,-8,-5,-2,1,3,4,4,3,2,1,0,-1,-1,-1,-1,0,0,0,0,0,-1,-2,-2,-2,-2,-2,-1,-1,0,0,0,0,0,-1,-1,-1,0,0,0,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,1,1,2,2,2,2,2,1,1,0,0,0,0,0,1,2,2,2,3,3,2,2,1,1,0,0,1,1,2,3,4,4,5,5,6,6,5,5,5,4,4,4,4,4,4,3,3,2,2,1,0,0,-1,-1,-1,-1,-1,-2,-2,-3,-4,-6,-7,-9,-11,-13,-15,-16,-17,-17,-17,-16,-14,-13,-11,-10,-10,-9,-10,-10,-11,-11,-11,-10,-8,-6,-3,0,3,6,7,8,9,9,8,8,9,10,12,14,17,19,22,23,24,23,22,20,18,16,15,14,13,12,12,11,10,9,8,7,5,4,3,2,0,-1,-2,-3,-4,-6,-8,-9,-11,-12,-12,-13,-13,-13,-12,-12,-11,-11,-10,-10,-10,-9,-9,-8,-8,-7,-6,-6,-5,-5,-4,-4,-3,-3,-2,-1,0,1,2,3,3,4,4,4,4,4,4,4,4,3,3,3,2,1,1,0,-1,-1,-1,0,1,3,6,8,11,13,14,16,17,18,19,20,21,22,23,23,23,22,20,18,15,13,12,11,12,14,16,17,17,15,9,0,-11,-25,-41,-56,-69,-81,-89,-95,-98,-100,-100,-101,-103,-105,-109,-114,-119,-124,-130,-136,-142,-147,-151,-151,-146,-133,-110,-73,-22,42,119,203,290,371,441,493,521,524,501,454,390,313,231,150,76,11,-42,-85,-117,-140,-158,-170,-178,-182,-181,-176,-166,-152,-134,-115,-96,-79,-65,-57,-52,-52,-55,-58,-61,-61,-60,-56,-50,-42,-34,-27,-20,-15,-12,-10,-8,-7,-6,-6,-6,-6,-7,-8,-10,-11,-12,-12,-12,-12,-11,-9,-8,-7,-7,-7,-7,-6,-6,-5,-3,-1,0,2,3,3,3,2,1,0,0,0,1,3,5,7,8,8,8,7,6,5,5,6,7,9,11,13,15,16,17,17,17,17,18,19,21,23,25,28,30,31,31,29,27,24,21,18,16,15,14,14,14,15,15,15,16,16,16,17,18,19,20,22,24,26,28,29,30,30,30,29,27,25,22,19,14,9,4,-1,-6,-11,-16,-20,-23,-26,-28,-30,-32,-34,-35,-37,-39,-41,-43,-45,-47,-48,-50,-51,-52,-52,-52,-51,-50,-48,-46,-44,-42,-39,-37,-34,-32,-30,-27,-25,-22,-19,-16,-13,-10,-6,-3,1,4,8,12,16,21,25,30,34,38,41,43,45,45,45,45,44,43,42,40,39,37,35,34,32,31,30,29,29,29,30,31,32,34,36,38,40,42,43,45,46,47,47,47,46,44,41,37,32,26,21,15,10,5,1,-3,-7,-11,-16,-22,-28,-36,-44,-52,-60,-66,-71,-74,-77,-80,-83,-87,-92,-98,-106,-113,-120,-125,-129,-131,-131,-131,-131,-133,-137,-143,-150,-158,-165,-169,-168,-162,-150,-133,-111,-87,-61,-35,-9,16,40,64,89,114,140,165,190,212,231,246,256,260,259,254,245,234,221,208,196,185,178,173,172,174,179,184,188,188,182,168,144,112,73,29,-16,-58,-93,-121,-139,-148,-149,-145,-140,-133,-129,-127,-126,-126,-125,-122,-116,-107,-96,-84,-73,-64,-58,-55,-55,-56,-59,-61,-62,-62,-60,-58,-56,-54,-53,-52,-52,-52,-52,-51,-48,-45,-40,-36,-32,-28,-25,-23,-22,-20,-19,-16,-13,-10,-6,-2,2,5,8,11,14,17,21,25,30,34,39,42,45,47,47,47,46,44,42,40,38,37,35,33,32,30,28,25,23,21,19,17,15,14,12,11,9,8,6,4,2,0,-2,-4,-5,-6,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-5,-5,-5,-4,-4,-4,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-2,-2,-2,-2,-3,-3,-3,-4,-4,-4,-5,-5,-5,-5,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,0,0,1,1,1,2,2,3,3,3,4,4,4,5,5,5,5,6,6,6,6,6,6,6,5,5,5,5,5,6,7,8,9,11,12,14,15,17,18,20,22,24,26,27,28,28,28,26,24,22,19,16,14,12,10,9,8,6,4,1,-2,-6,-10,-15,-20,-25,-30,-36,-41,-48,-54,-62,-70,-77,-84,-90,-94,-95,-95,-92,-88,-83,-77,-72,-67,-62,-58,-54,-49,-44,-37,-30,-22,-14,-6,1,9,16,24,32,40,50,59,69,78,86,92,96,99,102,104,108,112,118,124,128,131,130,124,114,100,83,65,49,35,24,18,14,12,11,7,1,-8,-19,-32,-45,-57,-67,-73,-77,-78,-77,-76,-75,-74,-74,-74,-73,-72,-68,-64,-58,-52,-46,-42,-39,-36,-35,-33,-30,-27,-21,-15,-7,0,7,12,17,21,24,27,31,34,37,40,41,42,40,38,34,32,30,30,31,34,38,40,40,37,30,19,5,-12,-28,-44,-59,-70,-80,-87,-92,-96,-99,-102,-106,-109,-114,-119,-127,-136,-147,-158,-166,-168,-161,-138,-98,-39,40,134,238,342,438,514,564,582,565,516,440,345,241,136,40,-43,-109,-158,-191,-212,-223,-229,-231,-232,-230,-226,-220,-209,-195,-177,-156,-134,-111,-91,-72,-57,-45,-36,-29,-24,-21,-18,-15,-12,-10,-7,-3,0,3,6,9,12,15,17,19,21,22,23,24,25,25,26,26,27,27,27,27,26,26,26,26,26,26,26,27,27,27,27,27,27,27,27,27,27,26,25,25,23,22,21,19,18,17,15,14,13,12,11,10,8,7,5,3,2,0,-1,-3,-5,-7,-9,-11,-13,-15,-17,-19,-20,-21,-22,-21,-21,-20,-20,-19,-18,-17,-16,-15,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-6,-5,-5,-4,-3,-2,-1,0,1,1,2,2,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,6,7,8,9,9,9,8,7,6,5,4,4,5,5,5,4,3,0,-2,-5,-7,-8,-8,-8,-6,-5,-5,-6,-9,-12,-16,-20,-22,-22,-21,-19,-16,-14,-14,-18,-23,-31,-38,-43,-45,-42,-34,-22,-9,5,15,21,23,21,16,10,6,3,1,-2,-10,-24,-47,-79,-116,-154,-185,-200,-194,-161,-100,-16,83,188,284,361,409,424,406,359,291,212,132,59,-1,-46,-76,-95,-105,-110,-113,-116,-117,-116,-113,-105,-93,-77,-60,-44,-30,-20,-14,-13,-14,-18,-21,-24,-26,-26,-25,-24,-22,-21,-20,-18,-17,-17,-18,-20,-26,-34,-44,-56,-66,-75,-79,-78,-73,-65,-58,-55,-59,-72,-93,-122,-152,-178,-193,-192,-171,-128,-67,9,92,177,255,322,374,410,430,437,431,414,387,350,303,246,181,109,36,-36,-99,-152,-189,-211,-220,-217,-207,-195,-183,-174,-169,-167,-165,-162,-154,-142,-125,-105,-83,-63,-46,-34,-27,-24,-24,-25,-26,-25,-21,-15,-7,1,8,14,18,20,21,21,21,22,23,24,26,28,31,32,33,34,34,34,33,31,30,28,26,24,24,24,26,29,33,38,42,46,48,48,47,44,40,35,31,27,25,24,23,24,24,24,23,20,17,13,8,3,-1,-4,-6,-8,-10,-12,-15,-20,-26,-35,-44,-53,-61,-67,-70,-70,-68,-63,-58,-53,-49,-47,-47,-49,-51,-52,-52,-49,-44,-37,-28,-20,-13,-8,-5,-4,-3,-2,0,5,12,20,28,35,40,42,41,38,35,33,33,37,45,54,64,72,77,77,71,60,46,32,18,8,2,0,1,5,8,9,8,4,-3,-12,-20,-27,-31,-33,-32,-29,-26,-23,-21,-20,-20,-21,-21,-22,-23,-23,-23,-23,-23,-23,-22,-21,-18,-13,-7,0,6,10,12,10,5,-3,-11,-18,-22,-21,-15,-5,7,21,32,40,41,37,29,17,4,-7,-14,-16,-15,-9,-2,5,9,11,9,4,-2,-8,-12,-12,-8,-1,10,23,34,43,48,48,42,30,15,-3,-21,-38,-52,-62,-67,-67,-61,-51,-38,-22,-6,10,25,37,45,50,51,48,42,33,22,11,1,-8,-15,-18,-17,-12,-4,7,19,33,46,58,67,72,74,72,66,56,43,29,14,-2,-16,-29,-41,-51,-60,-69,-79,-90,-102,-115,-127,-138,-147,-153,-157,-157,-156,-156,-157,-161,-167,-174,-179,-179,-168,-143,-101,-40,36,124,217,308,388,450,489,501,488,452,396,329,255,180,110,47,-7,-52,-88,-116,-136,-151,-159,-162,-160,-154,-144,-130,-115,-100,-84,-69,-55,-43,-32,-23,-15,-10,-5,-3,-2,-2,-3,-5,-7,-8,-8,-8,-7,-7,-6,-6,-7,-9,-11,-12,-13,-13,-11,-9,-6,-3,0,2,3,2,1,-2,-4,-7,-9,-10,-11,-12,-13,-14,-15,-16,-18,-21,-23,-26,-29,-31,-32,-33,-33,-33,-31,-29,-26,-23,-20,-17,-14,-12,-10,-9,-7,-5,-4,-1,1,3,5,5,4,1,-4,-9,-14,-19,-22,-23,-23,-20,-15,-9,-2,5,12,18,25,33,41,51,61,72,83,94,103,109,114,116,115,112,108,102,95,88,80,71,63,55,47,39,33,26,21,17,13,10,7,4,2,0,-2,-4,-5,-6,-7,-9,-11,-14,-18,-23,-29,-36,-44,-52,-61,-70,-80,-92,-104,-118,-131,-144,-156,-165,-170,-172,-169,-163,-153,-142,-130,-118,-108,-98,-90,-82,-74,-65,-55,-43,-30,-16,-2,12,26,39,53,68,84,101,120,140,159,177,193,204,211,214,212,206,198,188,178,167,157,146,134,120,106,90,75,60,48,39,35,33,35,37,38,37,31,21,6,-11,-30,-47,-61,-71,-77,-78,-78,-78,-80,-86,-96,-110,-127,-144,-160,-172,-179,-182,-181,-178,-174,-170,-167,-165,-163,-158,-151,-138,-122,-102,-79,-58,-38,-23,-14,-10,-10,-13,-15,-16,-13,-8,1,10,19,25,29,29,26,23,19,17,18,22,29,37,47,58,68,78,89,100,112,125,137,149,158,164,166,164,158,150,141,132,125,120,117,114,111,106,98,88,76,62,49,36,26,18,12,6,0,-8,-18,-31,-44,-59,-72,-84,-93,-98,-102,-103,-103,-103,-102,-102,-100,-98,-93,-87,-80,-71,-63,-56,-52,-51,-53,-58,-64,-70,-73,-74,-71,-65,-57,-47,-38,-30,-24,-22,-22,-25,-29,-34,-38,-41,-43,-44,-45,-46,-50,-57,-67,-80,-96,-111,-124,-130,-127,-109,-76,-26,40,119,206,294,377,447,498,527,533,514,475,419,352,280,207,137,75,22,-22,-57,-82,-100,-111,-116,-118,-117,-114,-112,-110,-110,-112,-116,-122,-128,-134,-139,-143,-145,-145,-145,-143,-141,-140,-138,-137,-135,-133,-130,-126,-121,-116,-111,-106,-102,-98,-95,-92,-88,-83,-77,-70,-62,-53,-43,-33,-23,-12,-1,10,22,35,48,60,72,82,90,96,99,100,98,95,91,87,82,78,75,71,67,63,59,54,48,43,38,33,28,24,20,16,12,8,3,-2,-7,-12,-18,-22,-25,-27,-28,-28,-27,-24,-22,-20,-17,-16,-14,-13,-12,-10,-8,-5,-2,2,7,13,18,24,29,35,41,47,54,61,69,77,84,90,94,97,97,94,90,84,78,71,65,59,55,50,46,41,35,29,21,12,2,-7,-17,-27,-37,-47,-57,-69,-81,-94,-108,-121,-134,-145,-153,-158,-159,-157,-153,-147,-140,-132,-124,-117,-111,-104,-98,-90,-82,-74,-65,-55,-46,-37,-28,-20,-12,-4,5,15,26,38,49,61,71,80,87,92,95,96,96,94,92,89,86,82,78,73,68,63,58,54,51,49,48,48,47,47,46,44,41,38,35,32,29,28,27,27,27,27,25,23,20,16,12,8,4,1,-1,-2,-3,-4,-6,-8,-12,-17,-22,-29,-35,-42,-49,-55,-63,-70,-79,-88,-98,-107,-116,-123,-128,-130,-130,-126,-121,-114,-106,-99,-91,-85,-79,-73,-68,-62,-55,-46,-37,-27,-16,-5,5,16,26,36,47,58,71,84,98,111,124,136,145,151,153,153,150,145,138,131,123,116,109,102,96,89,82,75,67,59,51,43,35,28,21,13,6,-2,-10,-18,-28,-37,-45,-53,-59,-64,-67,-68,-68,-66,-64,-62,-61,-59,-58,-57,-56,-55,-53,-51,-48,-44,-40,-35,-31,-26,-21,-16,-12,-7,-2,3,8,13,18,23,26,28,28,27,25,22,18,14,11,8,7,6,6,6,6,4,0,-6,-15,-27,-42,-58,-75,-92,-107,-119,-127,-132,-133,-133,-132,-133,-138,-147,-160,-177,-194,-206,-211,-201,-174,-127,-60,23,120,222,321,410,482,531,555,554,528,484,425,357,285,213,145,81,23,-29,-74,-112,-145,-171,-190,-202,-208,-207,-200,-189,-175,-158,-139,-121,-103,-86,-71,-59,-50,-43,-39,-37,-36,-37,-37,-37,-37,-36,-35,-33,-33,-33,-34,-36,-37,-39,-40,-39,-37,-34,-29,-25,-20,-16,-12,-10,-8,-6,-3,-1,2,5,7,9,11,12,13,15,18,23,30,38,45,52,56,57,55,50,42,35,29,26,26,29,35,41,47,49,49,44,37,28,20,14,12,13,16,20,22,21,15,3,-13,-31,-49,-64,-73,-75,-70,-59,-44,-27,-12,-1,7,11,11,11,11,14,18,26,34,43,51,57,59,58,55,51,46,40,36,32,28,24,19,14,8,3,-2,-6,-9,-10,-9,-8,-7,-7,-7,-8,-10,-11,-13,-13,-12,-11,-9,-7,-7,-8,-10,-14,-18,-23,-27,-30,-33,-34,-35,-36,-38,-41,-44,-47,-51,-53,-54,-53,-51,-47,-42,-37,-32,-28,-25,-23,-22,-22,-21,-21,-20,-19,-17,-14,-12,-9,-5,-2,2,5,9,12,14,16,16,16,15,14,14,13,13,14,15,17,18,19,19,18,16,14,12,11,10,9,9,9,9,8,6,3,-1,-5,-9,-12,-15,-16,-16,-15,-14,-12,-10,-9,-8,-7,-7,-7,-7,-6,-6,-5,-3,-2,0,1,3,4,6,7,9,10,12,14,16,18,19,21";
          //perfect 2 s 2 PFData = "18,20,22,23,24,25,25,24,23,22,21,20,18,18,17,16,15,14,12,11,9,7,5,3,1,-1,-2,-4,-6,-7,-9,-12,-14,-16,-18,-20,-21,-21,-21,-20,-18,-16,-14,-12,-9,-8,-6,-5,-4,-2,-1,0,1,3,4,6,8,10,12,14,16,18,20,22,24,26,27,28,28,29,28,28,28,27,27,26,26,25,24,23,22,21,20,20,19,19,18,18,17,16,15,14,12,11,11,10,10,10,10,10,9,8,7,5,4,4,5,7,10,13,17,19,20,20,18,14,11,7,5,4,5,8,13,19,24,29,32,34,33,31,28,25,22,20,19,18,19,20,20,20,19,18,16,15,14,14,15,17,20,23,25,26,26,23,19,14,9,3,-1,-3,-3,-1,2,7,12,16,18,19,18,15,11,6,2,-1,-2,-2,0,3,6,10,13,15,17,18,19,20,20,21,22,23,24,24,24,23,22,20,19,17,17,17,17,18,19,20,20,19,19,17,16,15,14,13,13,13,13,13,13,13,12,11,11,11,10,10,10,10,10,10,9,8,6,5,4,4,4,4,5,5,5,5,5,4,2,0,-1,-3,-4,-5,-6,-7,-9,-11,-13,-16,-19,-22,-25,-27,-28,-29,-28,-26,-24,-22,-19,-16,-13,-9,-6,-2,1,5,8,12,15,17,18,19,18,16,14,10,7,3,0,-2,-4,-5,-5,-4,-3,-3,-3,-4,-6,-8,-11,-14,-16,-17,-17,-15,-13,-10,-7,-5,-5,-7,-11,-17,-25,-34,-45,-55,-65,-75,-84,-93,-103,-112,-122,-133,-143,-153,-159,-161,-155,-140,-114,-75,-24,38,109,184,258,325,378,414,429,420,389,339,275,202,127,57,-3,-51,-84,-103,-111,-111,-107,-101,-98,-97,-101,-106,-114,-120,-125,-126,-122,-115,-104,-90,-75,-59,-45,-33,-22,-15,-9,-6,-5,-5,-6,-8,-9,-11,-12,-12,-12,-12,-12,-11,-11,-11,-11,-12,-12,-12,-11,-9,-7,-5,-2,0,3,4,5,5,4,3,1,-1,-3,-6,-8,-10,-13,-15,-18,-21,-24,-27,-30,-32,-34,-35,-35,-35,-33,-31,-28,-24,-20,-15,-11,-7,-3,1,4,6,9,12,15,19,25,31,39,47,57,67,78,88,98,107,114,120,124,125,125,123,119,114,108,102,96,90,84,78,72,66,59,52,44,36,27,19,11,2,-6,-15,-24,-33,-44,-55,-66,-77,-87,-96,-103,-108,-111,-111,-109,-106,-102,-97,-93,-88,-84,-80,-76,-72,-68,-63,-57,-52,-46,-41,-36,-31,-27,-23,-19,-15,-11,-6,-1,5,10,15,19,23,25,26,27,26,25,24,22,20,19,17,16,15,14,13,12,10,9,8,6,5,3,2,0,-1,-3,-4,-6,-8,-9,-10,-12,-12,-13,-13,-13,-13,-13,-12,-12,-11,-9,-8,-6,-4,-2,-1,-1,-1,-2,-2,-3,-3,-3,-1,1,4,8,12,14,16,16,15,12,9,6,4,4,5,8,12,18,23,28,32,35,34,32,28,22,16,9,3,-3,-8,-11,-13,-13,-12,-10,-7,-4,0,3,7,9,11,11,11,10,9,7,6,4,3,2,2,1,1,1,1,1,1,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-4,-4,-4,-4,-4,-3,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,2,2,2,3,3,3,4,4,4,4,4,4,4,4,5,5,6,7,7,7,7,7,7,7,7,7,8,8,9,9,9,8,7,6,4,3,2,2,3,4,5,5,5,3,1,-3,-8,-13,-17,-21,-22,-23,-21,-19,-17,-16,-16,-17,-21,-26,-32,-38,-45,-50,-53,-54,-53,-49,-44,-37,-29,-22,-15,-11,-8,-8,-11,-17,-24,-32,-38,-41,-38,-26,-6,25,65,114,168,224,277,322,356,374,375,358,323,273,212,144,72,2,-63,-121,-169,-208,-236,-255,-265,-269,-266,-259,-248,-234,-216,-195,-172,-146,-118,-89,-60,-32,-6,16,35,48,56,59,58,52,44,35,26,17,9,3,-1,-5,-7,-10,-11,-13,-15,-16,-18,-18,-19,-19,-19,-20,-21,-23,-24,-26,-27,-28,-27,-25,-22,-19,-15,-13,-12,-12,-13,-15,-17,-19,-19,-18,-15,-10,-4,3,9,14,19,23,26,29,32,35,39,43,47,50,52,54,54,54,53,53,52,52,53,53,52,50,47,43,38,33,29,27,28,31,35,41,47,52,54,55,53,50,48,46,46,50,56,65,73,81,85,84,78,66,49,29,8,-12,-30,-44,-53,-59,-62,-63,-64,-64,-66,-69,-72,-75,-77,-79,-79,-78,-76,-73,-71,-69,-68,-67,-66,-65,-63,-61,-59,-56,-54,-52,-50,-49,-48,-48,-46,-45,-42,-38,-35,-31,-27,-24,-22,-20,-18,-15,-11,-5,1,9,16,23,27,29,27,24,19,14,11,9,11,14,20,26,31,33,33,30,24,16,8,2,-2,-3,-2,1,5,9,12,13,12,9,6,2,0,-1,0,1,4,6,7,7,6,4,2,-1,-3,-3,-3,-2,0,1,3,4,4,3,2,1,0,-1,-1,0,1,2,2,2,2,2,1,1,0,0,0,1,1,2,2,2,2,2,1,1,1,1,1,1,1,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,0,0,1,1,2,2,1,1,0,0,0,0,1,2,4,5,6,5,4,2,0,-2,-4,-4,-4,-1,2,6,9,12,13,13,11,8,4,0,-3,-5,-5,-3,0,3,6,9,11,12,12,12,11,10,10,10,10,10,11,12,14,15,15,16,17,17,17,16,14,12,9,6,2,-1,-3,-5,-6,-6,-5,-5,-4,-5,-7,-10,-14,-20,-27,-34,-41,-48,-54,-58,-61,-63,-63,-63,-61,-60,-58,-56,-55,-53,-51,-49,-47,-46,-44,-45,-46,-48,-51,-53,-52,-46,-32,-8,26,70,123,181,240,294,337,364,372,359,326,275,211,139,65,-4,-65,-114,-149,-170,-179,-178,-170,-157,-143,-129,-118,-109,-103,-100,-98,-97,-94,-90,-83,-73,-59,-43,-25,-7,11,25,36,43,46,46,42,37,31,25,20,15,12,9,6,3,0,-3,-7,-10,-12,-13,-14,-13,-13,-12,-11,-11,-11,-11,-12,-13,-14,-14,-14,-13,-12,-10,-9,-7,-6,-5,-4,-3,-2,-1,0,2,4,6,8,10,12,15,17,19,21,24,26,29,32,35,38,41,43,45,47,48,49,50,50,50,51,51,52,52,52,52,52,51,51,50,49,48,47,46,44,43,41,38,36,34,33,33,33,34,35,35,34,30,25,17,6,-5,-16,-26,-33,-37,-37,-33,-27,-20,-13,-8,-6,-6,-10,-15,-21,-27,-32,-35,-37,-37,-36,-36,-36,-38,-40,-44,-48,-52,-55,-56,-55,-53,-49,-44,-40,-37,-34,-32,-32,-32,-32,-32,-31,-30,-29,-27,-25,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-11,-10,-9,-9,-9,-8,-8,-7,-7,-6,-5,-5,-4,-4,-3,-3,-2,-1,0,1,2,3,4,6,7,8,9,10,11,12,13,13,14,14,15,16,16,16,16,15,14,13,11,10,8,7,5,4,4,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-4,-4,-4,-4,-4,-4,-4,-4,-5,-6,-7,-8,-8,-9,-9,-9,-9,-9,-9,-9,-10,-11,-12,-14,-16,-16,-17,-16,-14,-11,-9,-6,-4,-3,-3,-4,-6,-8,-10,-12,-13,-13,-12,-11,-9,-9,-9,-10,-12,-15,-17,-20,-21,-21,-19,-16,-12,-8,-3,0,3,4,5,4,3,1,0,-1,0,1,2,4,7,10,12,15,18,21,24,28,31,34,37,39,40,41,41,40,39,37,35,32,30,27,25,22,19,16,13,10,8,5,1,-2,-6,-10,-14,-19,-23,-27,-31,-33,-35,-36,-37,-38,-40,-42,-46,-51,-56,-61,-66,-69,-70,-69,-67,-63,-58,-53,-49,-45,-42,-40,-40,-42,-44,-47,-51,-53,-54,-52,-44,-30,-6,27,69,119,175,232,284,328,358,371,363,336,291,232,163,91,20,-44,-98,-140,-170,-189,-198,-198,-194,-185,-174,-161,-147,-131,-115,-99,-83,-67,-52,-39,-29,-20,-14,-9,-6,-2,1,5,10,15,21,26,31,36,39,41,42,42,41,40,38,36,34,31,28,24,19,14,8,3,-2,-7,-10,-13,-14,-15,-14,-14,-12,-11,-10,-9,-7,-6,-4,-2,-1,1,2,3,4,4,4,3,2,2,1,1,1,2,2,2,2,2,2,2,1,2,2,3,4,6,7,8,8,8,8,8,8,8,9,10,12,15,18,23,28,33,40,48,56,64,73,81,88,93,95,95,93,88,81,72,62,50,38,26,13,-1,-14,-27,-40,-51,-61,-68,-73,-76,-76,-74,-71,-67,-63,-59,-56,-52,-49,-46,-42,-39,-36,-33,-30,-27,-26,-25,-25,-25,-26,-27,-27,-28,-27,-27,-27,-26,-25,-24,-22,-21,-19,-17,-15,-12,-10,-7,-4,-2,1,3,6,8,10,11,12,13,13,12,11,10,9,8,8,8,9,10,10,10,9,7,5,3,0,-2,-3,-4,-5,-5,-6,-6,-7,-7,-7,-7,-6,-4,-1,2,5,7,8,7,3,-1,-7,-12,-15,-17,-16,-13,-8,-3,3,7,10,10,7,4,-1,-5,-9,-10,-10,-9,-6,-4,-1,1,2,1,1,0,-2,-2,-2,-2,-2,-1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,4,4,4,4,3,2,1,0,-1,0,1,2,4,5,6,7,6,5,3,2,0,-1,-1,-1,0,1,2,2,2,2,2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,1,1,0,0,0,0,0,1,2,1,0,-1,-4,-7,-10,-12,-12,-11,-9,-5,0,5,8,10,10,7,3,-3,-7,-11,-12,-11,-7,-1,6,14,21,27,30,31,30,28,25,21,19,19,21,25,30,36,43,49,53,55,54,50,44,36,28,20,13,8,6,6,7,10,12,14,14,12,8,2,-5,-12,-18,-24,-28,-30,-32,-33,-34,-35,-37,-39,-42,-44,-45,-44,-42,-37,-30,-22,-13,-4,4,9,12,13,12,9,5,2,-1,-4,-6,-9,-14,-22,-34,-50,-70,-92,-113,-130,-141,-140,-126,-98,-55,1,66,137,208,273,328,368,390,392,376,342,292,232,164,93,24,-39,-94,-138,-170,-190,-197,-195,-186,-171,-154,-137,-120,-106,-93,-83,-74,-66,-58,-50,-41,-33,-25,-19,-14,-11,-11,-11,-13,-16,-19,-21,-23,-26,-28,-32,-37,-44,-51,-60,-69,-78,-85,-90,-93,-93,-91,-87,-82,-76,-70,-64,-59,-54,-50,-45,-41,-36,-30,-24,-17,-10,-3,4,12,19,27,36,45,54,64,75,85,94,102,109,113,116,116,115,112,108,104,99,95,90,86,83,79,75,71,66,62,57,52,47,44,41,38,37,37,37,37,37,36,33,29,24,19,13,8,3,1,-1,0,1,3,4,5,5,3,0,-4,-9,-13,-17,-20,-23,-24,-26,-28,-31,-35,-39,-44,-49,-54,-59,-62,-64,-65,-64,-63,-61,-59,-57,-55,-54,-52,-51,-50,-48,-46,-44,-41,-38,-35,-32,-28,-25,-23,-20,-18,-17,-16,-16,-15,-14,-13,-11,-8,-5,-1,2,5,7,8,7,5,2,-2,-5,-7,-8,-8,-7,-6,-4,-3,-2,-2,-3,-5,-7,-9,-11,-13,-14,-15,-15,-16,-17,-18,-18,-19,-19,-18,-17,-16,-14,-13,-11,-11,-10,-10,-10,-10,-9,-8,-6,-3,1,4,7,9,11,12,12,13,13,14,16,18,21,23,26,28,30,31,31,31,30,29,29,28,27,26,25,24,22,20,17,15,13,11,10,9,9,9,9,10,10,10,9,8,7,5,4,3,2,2,2,3,3,4,3,3,1,-1,-4,-6,-8,-10,-10,-9,-6,-3,1,4,8,10,11,10,9,6,3,-1,-5,-8,-10,-11,-11,-11,-10,-9,-8,-6,-5,-5,-4,-4,-3,-3,-3,-2,-2,-1,-1,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,5,5,4,4,4,3,3,3,2,2,2,1,1,1,1,1,0,0,0,-1,-2,-2,-3,-3,-4,-4,-4,-5,-5,-5,-6,-6,-6,-5,-4,-3,-3,-2,-3,-3,-5,-7,-8,-9,-8,-7,-4,0,4,8,10,9,6,1,-6,-13,-19,-22,-23,-20,-13,-5,5,13,19,21,19,14,7,-1,-8,-13,-15,-13,-8,-2,5,11,16,19,19,18,16,14,12,12,13,16,19,22,24,26,27,27,25,24,22,20,18,17,16,16,16,16,16,15,14,13,10,7,3,-2,-7,-13,-18,-23,-28,-31,-34,-35,-36,-35,-34,-33,-32,-32,-33,-36,-39,-44,-49,-53,-56,-57,-56,-52,-47,-41,-36,-33,-34,-40,-49,-62,-76,-88,-94,-90,-75,-46,-3,53,118,189,260,325,379,418,438,437,417,377,323,257,185,110,38,-28,-87,-135,-174,-202,-221,-233,-237,-236,-230,-220,-207,-190,-171,-150,-128,-106,-85,-67,-50,-38,-28,-21,-17,-15,-13,-13,-13,-13,-13,-15,-17,-20,-24,-29,-33,-37,-40,-41,-40,-38,-34,-30,-25,-20,-16,-11,-6,-2,3,7,12,16,19,22,23,23,23,22,21,19,19,18,18,18,18,18,17,16,14,12,10,9,9,9,11,12,14,16,17,18,18,17,17,17,17,18,19,21,23,25,27,28,29,30,31,32,33,34,36,38,39,41,42,42,42,42,42,42,42,43,45,47,48,50,51,51,50,48,44,40,35,29,23,17,10,3,-5,-13,-21,-28,-36,-43,-49,-53,-56,-58,-59,-59,-58,-57,-56,-54,-53,-52,-52,-51,-50,-48,-47,-46,-44,-42,-41,-39,-38,-37,-36,-35,-34,-33,-32,-31,-30,-28,-27,-25,-22,-20,-18,-15,-13,-10,-7,-4,-1,3,6,9,12,15,17,18,19,20,20,19,18,17,16,14,13,12,11,10,9,8,7,6,4,3,2,1,0,-1,-2,-3,-4,-6,-7,-8,-9,-11,-11,-12,-12,-12,-12,-11,-10,-10,-9,-9,-9,-9,-9,-9,-9,-9,-9,-8,-6,-4,-1,2,5,8,10,12,14,14,14,14,13,12,11,10,10,10,10,10,11,11,12,12,12,11,11,10,9,8,8,8,7,7,7,7,7,6,6,5,4,3,3,3,3,3,2,2,2,1,1,0,0,0,0,0,1,1,2,2,1,0,0,-1,-2,-2,-1,0,1,2,3,2,0,-2,-5,-8,-10,-11,-10,-7,-2,3,7,10,11,9,5,0,-6,-12,-16,-17,-16,-12,-6,1,7,12,14,13,11,6,1,-3,-5,-6,-5,-2,2,5,8,8,8,5,3,0,-2,-2,-1,1,4,7,9,10,10,7,4,1,-3,-5,-6,-6,-5,-3,0,2,3,3,3,2,0,-1,-2,-3,-4,-4,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-2,-2,-3,-3,-5,-6,-9,-11,-13,-14,-14,-13,-11,-8,-5,-2,0,1,1,0,-2,-4,-6,-7,-6,-4,-1,3,7,11,15,18,20,22,23,25,26,29,32,36,40,45,48,50,51,51,49,46,42,38,35,32,30,28,26,25,23,20,16,11,5,-2,-9,-16,-24,-32,-39,-48,-56,-66,-76,-86,-97,-106,-114,-119,-122,-122,-120,-116,-110,-104,-98,-93,-88,-82,-76,-70,-62,-53,-43,-33,-23,-15,-7,-1,6,15,28,47,74,109,154,205,260,315,364,403,428,434,421,388,338,274,201,124,48,-22,-83,-133,-171,-199,-217,-227,-231,-229,-224,-215,-203,-189,-171,-151,-130,-108,-87,-67,-50,-36,-25,-17,-12,-8,-6,-5,-3,-3,-2,-3,-5,-8,-12,-17,-23,-28,-32,-35,-37,-37,-35,-32,-29,-25,-22,-18,-15,-12,-10,-7,-4,-1,2,4,6,8,9,9,9,9,8,8,8,8,9,9,10,10,10,10,9,9,9,10,10,11,12,12,12,11,9,8,6,4,4,5,7,11,16,21,26,30,32,33,33,32,31,31,32,35,41,47,54,61,66,70,70,68,64,59,54,49,46,45,46,48,51,53,54,53,49,44,38,32,26,20,15,11,7,3,-2,-9,-16,-23,-31,-38,-43,-47,-50,-51,-52,-53,-55,-58,-63,-69,-75,-80,-84,-87,-86,-84,-79,-73,-67,-62,-57,-53,-50,-48,-44,-40,-35,-29,-21,-13,-6,0,4,7,9,9,8,8,8,9,11,13,16,18,20,21,22,22,22,22,22,22,22,21,20,19,17,15,13,11,11,11,11,13,14,14,14,13,11,7,4,1,-2,-4,-5,-5,-4,-3,-3,-2,-3,-3,-4,-5,-6,-6,-6,-5,-4,-4,-3,-3,-3,-3,-3,-3,-3,-2,-1,0,1,1,1,0,-2,-4,-5,-6,-6,-4,-2,1,4,6,8,8,6,4,0,-3,-6,-8,-9,-8,-5,-2,1,4,6,6,6,4,2,0,-2,-3,-4,-4,-3,-2,-1,0,1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-2,-2,-3,-3,-4,-4,-4,-3,-3,-3,-3,-3,-4,-4,-4,-5,-4,-4,-3,-2,-1,-1,0,-1,-1,-2,-3,-4,-4,-4,-4,-3,-2,-1,-1,0,0,0,-1,-1,-2,-2,-3,-3,-3,-4,-3,-3,-2,-1,1,3,6,9,12,14,15,14,11,7,1,-5,-11,-16,-19,-20,-19,-16,-11,-6,0,5,9,12,13,12,11,9,7,5,3,2,2,2,2,2,2,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-1,-1,-1,-1,0,0,0,0,-1,-1,-2,-2,-2,-2,-1,0,2,3,5,6,7,7,7,7,7,7,7,8,9,11,12,13,14,13,12,11,9,8,7,6,6,7,8,9,9,9,7,3,-1,-7,-14,-20,-26,-31,-35,-37,-39,-40,-41,-42,-43,-45,-47,-49,-51,-52,-52,-51,-49,-47,-46,-45,-46,-48,-50,-52,-51,-46,-35,-16,12,47,89,135,182,225,262,286,298,294,274,241,196,143,87,30,-24,-72,-111,-143,-165,-179,-186,-187,-182,-173,-161,-147,-132,-116,-100,-85,-72,-60,-50,-41,-34,-27,-21,-15,-9,-3,3,9,14,18,21,23,24,24,24,22,21,19,18,16,14,13,11,10,8,7,6,5,4,3,2,1,0,-2,-4,-6,-8,-10,-12,-13,-14,-14,-15,-15,-15,-14,-14,-13,-12,-10,-9,-7,-6,-4,-2,0,1,3,4,5,6,7,7,7,8,8,8,8,8,8,8,8,8,9,10,12,15,18,22,26,31,36,40,45,48,52,55,57,59,61,64,66,68,70,71,71,70,68,63,57,50,42,33,23,15,7,0,-5,-10,-12,-14,-14,-14,-14,-13,-13,-13,-14,-15,-17,-20,-23,-27,-31,-34,-37,-40,-42,-44,-46,-47,-48,-50,-51,-52,-53,-54,-55,-56,-58,-60,-63,-66,-70,-74,-77,-78,-76,-72,-65,-56,-45,-33,-21,-11,-2,4,7,9,9,10,10,12,15,19,24,30,36,42,47,50,52,53,52,51,48,44,40,36,32,28,26,24,23,23,22,21,19,17,16,15,16,19,26,34,45,57,68,77,82,83,79,72,63,54,46,40,39,40,43,47,50,50,46,39,29,18,7,-2,-8,-12,-13,-13,-14,-17,-23,-33,-46,-60,-74,-86,-93,-97,-96,-92,-86,-79,-74,-72,-71,-73,-76,-79,-81,-80,-77,-72,-65,-58,-51,-46,-42,-39,-37,-35,-32,-28,-23,-18,-12,-7,-3,0,1,0,-1,-2,-3,-3,-2,0,3,6,8,9,10,10,9,8,8,8,8,8,9,9,10,10,10,10,11,12,13,14,16,17,18,18,18,17,16,15,15,15,15,16,17,18,19,20,20,19,19,18,18,18,18,18,19,20,20,21,21,21,21,22,22,23,23,24,25,25,25,25,25,25,25,25,25,26,27,28,29,29,30,29,29,28,27,27,26,26,26,26,26,26,25,24,22,21,20,19,19,19,19,20,21,22,22,23,23,23,23,22,22,23,23,23,24,25,25,25,26,26,26,26,26,27,28,30,32,34";
          //PFData = "32,102,167,225,272,305,322,321,303,270,224,170,113,58,9,-30,-58,-76,-84,-87,-86,-84,-83,-85,-87,-91,-93,-94,-92,-88,-81,-72,-64,-56,-50,-46,-44,-43,-43,-43,-43,-41,-39,-37,-35,-32,-31,-29,-28,-27,-26,-24,-22,-19,-16,-13,-10,-7,-4,-1,2,5,9,12,15,17,19,19,19,19,18,17,17,17,17,17,17,16,14,12,10,8,6,5,5,5,6,6,5,3,0,-5,-10,-16,-21,-24,-26,-26,-24,-21,-17,-14,-11,-10,-10,-11,-12,-12,-12,-11,-9,-6,-3,1,4,7,9,11,13,15,18,22,27,33,40,46,52,57,61,64,65,66,65,64,63,61,59,56,52,48,42,37,31,26,21,17,15,13,13,12,12,11,10,8,6,4,2,1,0,0,1,2,3,3,2,1,-1,-3,-4,-5,-4,-2,0,3,6,9,10,9,7,4,0,-3,-6,-7,-6,-3,1,5,10,13,15,15,14,12,9,6,4,2,2,3,5,7,10,13,15,16,17,17,17,17,16,16,15,15,16,16,17,18,20,21,23,24,25,25,25,25,24,23,23,22,23,24,26,29,32,35,38,40,42,44,45,46,46,45,44,41,38,33,26,18,9,-1,-11,-21,-31,-40,-47,-53,-58,-60,-62,-62,-62,-60,-58,-56,-54,-52,-50,-47,-45,-42,-39,-36,-33,-30,-27,-24,-22,-20,-19,-18,-18,-17,-17,-16,-15,-14,-12,-10,-8,-6,-4,-3,-2,-2,-1,-1,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,0,0,-1,-2,-3,-4,-4,-4,-2,-1,1,4,6,7,6,5,1,-3,-7,-12,-14,-15,-14,-9,-2,6,16,25,34,40,44,46,46,44,41,37,33,29,25,22,18,15,13,10,8,6,4,2,1,-1,-2,-3,-4,-4,-4,-3,-2,-1,0,1,1,0,-3,-6,-10,-15,-20,-25,-29,-32,-35,-39,-42,-46,-51,-55,-58,-61,-61,-60,-56,-52,-46,-42,-39,-39,-42,-49,-58,-69,-80,-89,-95,-96,-90,-77,-56,-26,12,57,108,162,217,269,315,351,374,380,370,342,298,241,176,107,40,-22,-74,-114,-140,-154,-157,-152,-141,-127,-114,-104,-97,-94,-94,-97,-100,-103,-103,-99,-92,-81,-67,-51,-34,-17,-3,9,18,23,25,25,22,18,14,9,5,1,-2,-5,-8,-11,-14,-16,-18,-18,-18,-17,-16,-14,-13,-12,-11,-12,-13,-15,-16,-16,-15,-12,-9,-5,-1,3,5,6,5,2,-1,-4,-7,-8,-7,-5,-1,4,8,13,16,18,20,21,22,23,25,29,33,38,43,47,51,53,53,53,51,49,47,45,44,42,41,40,38,36,34,31,28,25,22,20,18,16,15,14,12,11,9,6,4,1,-1,-3,-5,-6,-7,-8,-9,-9,-10,-11,-11,-11,-12,-12,-11,-11,-11,-11,-11,-12,-12,-13,-13,-14,-15,-15,-16,-17,-18,-20,-21,-22,-24,-25,-26,-26,-27,-26,-26,-25,-24,-24,-23,-22,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-13,-12,-12,-12,-11,-11,-10,-9,-9,-8,-7,-7,-6,-6,-6,-6,-5,-5,-4,-3,-2,-2,-2,-2,-2,-2,-3,-3,-2,-1,0,1,3,4,5,6,6,6,6,6,7,7,8,10,11,13,14,14,14,14,13,12,11,10,9,9,9,9,9,8,8,7,6,4,3,2,1,1,1,1,1,1,1,1,0,-1,-2,-3,-3,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-4,-4,-4,-5,-5,-5,-6,-6,-6,-7,-7,-7,-8,-8,-8,-9,-9,-9,-9,-9,-9,-9,-9,-9,-8,-8,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-6,-6,-5,-4,-3,-2,-1,0,1,2,2,3,3,3,3,2,1,0,0,-1,-2,-3,-4,-6,-7,-8,-9,-10,-10,-10,-10,-9,-8,-7,-6,-5,-4,-4,-5,-5,-6,-6,-6,-7,-7,-7,-6,-6,-7,-7,-8,-8,-8,-7,-5,-2,1,4,6,6,3,-4,-14,-28,-45,-62,-79,-93,-104,-110,-112,-111,-107,-105,-104,-107,-113,-123,-134,-145,-153,-157,-155,-148,-134,-116,-94,-68,-38,-3,39,90,152,223,303,386,465,533,581,604,596,557,490,400,297,190,88,0,-70,-120,-151,-167,-172,-173,-171,-171,-173,-176,-179,-179,-176,-169,-158,-146,-132,-121,-112,-106,-103,-101,-98,-94,-86,-75,-60,-43,-26,-10,3,13,20,23,24,23,22,21,20,19,18,17,16,13,10,6,3,0,-2,-3,-3,-3,-2,-1,0,0,0,-1,-1,-2,-2,-2,-2,-1,-1,0,1,1,2,2,3,3,3,4,4,5,6,7,8,9,10,12,13,15,17,19,22,25,28,31,34,38,41,43,46,47,48,49,49,48,47,46,44,42,40,38,35,32,30,28,26,25,24,23,22,22,21,20,18,17,15,13,11,9,8,8,7,7,6,6,5,3,2,0,-2,-3,-4,-5,-6,-6,-7,-8,-9,-10,-12,-14,-16,-18,-20,-23,-25,-27,-30,-32,-35,-38,-41,-44,-46,-48,-49,-50,-50,-49,-48,-46,-44,-42,-41,-39,-38,-36,-34,-33,-31,-29,-28,-26,-24,-23,-22,-21,-20,-20,-19,-18,-17,-15,-14,-12,-11,-10,-9,-8,-8,-8,-7,-7,-6,-5,-4,-3,-2,-1,0,0,0,0,1,1,2,4,6,7,9,10,10,9,8,7,6,6,7,9,12,16,20,24,28,30,30,29,27,24,20,16,13,10,8,7,7,6,6,6,6,6,5,4,4,4,3,3,3,3,2,2,2,1,1,1,1,1,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,8,7,7,7,7,7,6,6,6,6,6,6,6,6,6,5,5,4,4,4,3,3,3,2,2,1,0,0,-1,-2,-2,-2,-2,-1,0,0,1,1,1,1,1,0,0,0,0,1,2,4,5,6,7,8,8,7,7,6,6,5,6,6,7,8,9,10,11,12,12,12,12,12,11,10,10,10,9,9,9,10,10,11,12,13,14,15,16,17,19,21,23,26,28,31,32,34,34,34,33,31,29,27,25,22,19,16,12,8,5,1,-3,-6,-9,-12,-15,-17,-20,-23,-26,-30,-33,-37,-40,-43,-45,-47,-49,-52,-54,-57,-61,-65,-68,-71,-72,-72,-70,-67,-62,-57,-53,-48,-44,-41,-39,-37,-36,-36,-37,-40,-45,-53,-63,-75,-88,-101,-112,-122,-127,-128,-123,-112,-92,-65,-28,18,75,140,211,286,359,425,478,512,525,512,476,418,344,260,174,92,20,-39,-83,-112,-128,-134,-134,-130,-126,-124,-124,-127,-131,-137,-143,-149,-153,-156,-156,-154,-149,-142,-132,-121,-108,-96,-84,-74,-65,-59,-54,-51,-48,-45,-41,-36,-30,-23,-15,-7,0,7,12,15,18,20,21,22,22,23,24,24,25,25,25,25,24,24,23,23,22,22,22,22,21,21,20,20,19,18,18,17,16,16,15,15,14,14,14,14,14,15,15,15,16,16,16,16,16,16,17,17,17,17,16,16,14,13,12,10,9,8,7,7,7,7,6,5,3,1,-1,-3,-4,-5,-5,-3,-2,0,2,2,2,0,-3,-6,-10,-14,-16,-18,-18,-18,-17,-17,-17,-18,-19,-22,-25,-28,-31,-33,-33,-33,-32,-30,-28,-27,-25,-24,-24,-23,-23,-22,-21,-20,-19,-17,-16,-15,-14,-13,-13,-13,-13,-12,-10,-8,-6,-3,0,2,3,3,2,0,-3,-6,-8,-11,-12,-12,-12,-10,-7,-4,-1,2,5,7,9,9,9,9,9,9,9,9,10,10,12,13,14,15,16,16,16,16,15,14,13,13,12,12,12,12,12,13,12,12,11,9,7,6,4,3,3,3,4,4,5,5,5,4,3,2,0,-1,-2,-2,-2,-2,-1,0,1,1,2,2,2,2,2,2,2,3,3,4,4,5,5,6,6,6,7,7,8,9,9,10,10,10,10,10,10,10,9,9,8,8,8,8,7,7,6,6,5,5,4,4,4,3,3,3,2,2,2,1,0,0,-1,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-6,-6,-7,-7,-8,-8,-8,-8,-8,-7,-6,-5,-4,-3,-3,-4,-5,-6,-7,-8,-9,-8,-7,-4,0,4,9,14,18,21,24,25,26,26,25,23,22,21,19,18,17,17,16,15,14,12,9,6,3,0,-4,-7,-10,-12,-15,-17,-20,-22,-26,-29,-33,-37,-40,-42,-43,-43,-43,-43,-44,-47,-50,-55,-61,-68,-74,-79,-83,-86,-88,-90,-92,-94,-97,-101,-104,-106,-105,-102,-95,-85,-74,-61,-47,-34,-19,-3,17,43,76,116,163,213,264,308,342,362,363,345,311,264,209,152,100,55,21,-2,-15,-21,-23,-24,-26,-30,-36,-43,-49,-54,-57,-57,-56,-53,-51,-50,-51,-53,-56,-60,-63,-65,-64,-62,-59,-54,-51,-48,-46,-46,-46,-47,-47,-47,-45,-42,-38,-34,-30,-26,-22,-19,-16,-13,-10,-6,-2,2,5,9,11,13,14,14,14,13,13,12,12,12,11,11,11,10,9,9,8,7,7,7,7,7,8,8,8,9,9,9,9,9,9,9,9,9,9,8,8,8,7,7,6,6,5,5,5,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,0,-1,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-7,-8,-8,-9,-10,-10,-11,-11,-11,-11,-11,-11,-11,-10,-10,-10,-9,-9,-9,-8,-8,-7,-7,-7,-7,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,2,2,2,3,3,3,3,3,3,3,4,4,4,3,3,3,3,3,3,3,2,3,3,3,3,4,4,5,5,6,7,7,8,8,9,9,10,10,10,10,10,9,8,7,6,5,4,4,3,3,2,2,1,0,-2,-3,-5,-7,-9,-11,-13,-15,-18,-20,-22,-25,-27,-30,-32,-34,-34,-34,-34,-32,-30,-28,-26,-24,-22,-21,-20,-19,-18,-17,-16,-13,-10,-7,-3,1,6,10,14,18,22,26,29,32,35,37,39,41,42,42,42,41,39,37,35,33,30,28,25,23,20,18,15,12,10,8,6,4,3,2,1,0,-1,-2,-3,-5,-6,-8,-9,-10,-10,-10,-10,-10,-9,-8,-8,-7,-7,-7,-7,-6,-6,-5,-4,-3,-1,0,2,4,5,7,9,11,14,16,19,22,25,27,29,29,29,28,26,24,21,19,18,17,16,16,16,16,15,13,10,5,0,-6,-12,-19,-26,-33,-40,-47,-54,-61,-67,-73,-77,-80,-82,-83,-82,-80,-78,-77,-77,-79,-84,-92,-102,-113,-125,-136,-145,-149,-148,-138,-120,-92,-52,-2,58,126,199,273,343,406,454,486,497,486,453,402,335,259,177,97,23,-42,-94,-134,-160,-176,-182,-182,-177,-171,-164,-158,-154,-151,-149,-149,-147,-145,-141,-134,-124,-111,-95,-77,-58,-40,-24,-10,0,7,10,10,8,5,1,-3,-7,-10,-13,-15,-18,-20,-23,-25,-26,-26,-26,-24,-21,-17,-13,-9,-5,-1,3,7,10,13,16,18,20,22,23,23,23,23,21,20,19,17,16,15,14,13,13,12,12,12,13,13,14,15,17,18,20,22,23,25,27,28,30,30,31,30,30,29,27,25,23,22,20,18,17,15,14,12,10,8,6,4,2,-1,-3,-5,-7,-10,-12,-15,-18,-21,-24,-27,-29,-31,-32,-33,-33,-32,-31,-30,-29,-27,-26,-25,-23,-22,-20,-19,-17,-15,-14,-13,-12,-11,-10,-9,-7,-6,-4,-2,0,2,3,5,6,6,6,7,7,7,7,7,8,8,8,8,8,7,7,7,6,6,6,6,6,7,7,7,7,7,8,8,8,9,9,9,10,10,9,9,9,8,8,8,8,7,7,7,6,6,5,4,3,3,3,3,3,3,3,3,2,1,-1,-2,-4,-5,-5,-6,-5,-5,-4,-4,-4,-4,-5,-5,-6,-6,-5,-4,-3,-1,0,0,1,0,-1,-2,-3,-4,-4,-4,-3,-1,1,3,4,5,5,4,3,3,2,1,1,2,2,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,1,1,1,1,2,2,2,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,4,4,4,4,4,3,3,3,3,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,4,4,5,6,6,7,7,7,7,7,7,7,8,8,10,11,13,15,17,19,21,23,26,28,32,35,38,41,43,44,44,43,41,37,33,29,25,20,16,12,7,2,-3,-9,-15,-21,-27,-32,-37,-41,-45,-49,-53,-58,-64,-70,-77,-84,-89,-94,-98,-101,-104,-107,-111,-115,-121,-126,-131,-135,-136,-133,-128,-121,-113,-106,-101,-99,-101,-105,-111,-117,-122,-123,-121,-114,-103,-90,-74,-55,-33,-4,33,80,141,214,298,388,477,558,621,660,667,643,588,506,407,298,190,91,6,-61,-110,-143,-163,-175,-181,-185,-188,-189,-190,-189,-184,-177,-168,-158,-149,-141,-136,-134,-134,-136,-137,-136,-133,-126,-116,-104,-91,-79,-67,-58,-51,-47,-43,-41,-38,-36,-32,-28,-24,-20,-16,-13,-10,-8,-6,-4,-2,0,3,5,7,8,10,10,11,11,12,12,13,13,14,15,16,16,16,16,16,17,17,18,18,19,21,22,23,23,23,23,23,22,22,21,20,20,19,19,18,18,17,16,15,14,13,12,12,11,11,10,10,10,9,9,8,8,7,7,6,6,6,6,5,5,5,4,4,3,3,3,3,3,2,2,2,2,2,1,1,0,0,0,-1,-1,-2,-2,-3,-3,-4,-5,-6,-7,-7,-7,-8,-7,-7,-7,-7,-7,-6,-6,-6,-6,-5,-5,-4,-3,-2,-2,-2,-2,-2,-3,-3,-3,-3,-2,-1,1,2,3,4,3,3,2,1,0,0,0,1,2,3,4,4,4,4,3,2,1,1,1,2,4,5,6,7,7,7,6,5,4,3,2,2,3,4,6,7,8,8,8,8,7,6,5,5,4,5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,5,5,5,5,5,5,4,4,4,4,4,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,0,0,0,-1,-1,-1,-1,-2,-2,-2,-1,-1,-1,-2,-2,-3,-4,-5,-6,-8,-9,-11,-12,-14,-16,-18,-19,-21,-23,-24,-25,-25,-25,-24,-23,-21,-19,-17,-14,-12,-10,-9,-7,-5,-3,-1,1,3,6,10,14,18,22,28,34,40,47,54,61,68,74,78,81,82,81,79,75,71,67,62,57,52,47,42,37,31,26,20,13,8,2,-3,-8,-13,-19,-24,-30,-36,-43,-49,-55,-62,-67,-73,-77,-82,-85,-88,-89,-89,-88,-84,-80,-74,-68,-62,-57,-53,-51,-49,-48,-47,-46,-45,-44,-44,-46,-51,-61,-74,-90,-108,-127,-144,-156,-164,-165,-160,-148,-131,-107,-77,-41,3,55,116,185,259,334,405,464,506,525,518,485,427,351,263,171,84,7,-53,-96,-122,-134,-135,-130,-123,-117,-113,-112,-113,-115,-117,-117,-115,-111,-106,-100,-94,-89,-84,-80,-77,-73,-69,-65,-60,-54,-49,-44,-39,-35,-31,-27,-24,-20,-15,-11,-6,-2,2,5,7,9,9,10,10,11,11,12,13,14,15,16,16,16,15,15,14,13,13,12,12,12,12,11,10,10,9,8,7,6,6,6,6,6,7,7,8,8,8,8,8,8,8,8,8,9,10,12,13,15,16,18,19,21,22,24,26,28,30,32,34,35,36,36,36,35,33,30,28,25,23,21,19,17,15,13,11,9,7,4,1,-2,-5,-8,-11,-14,-17,-20,-23,-26,-30,-33,-36,-39,-40,-42,-42,-41,-39,-37,-35,-33,-31,-30,-29,-28,-28,-27,-26,-24,-21,-17,-14,-10,-7,-4,-3,-3,-4,-5,-6,-6,-5,-3,1,5,9,13,16,18,17,15,13,9,6,4,2,1,2,2,3,4,5,4,4,2,1,-1,-2,-3,-3,-4,-4,-5,-5,-6,-7,-8,-8,-9,-9,-9,-8,-8,-7,-6,-6,-6,-5,-5,-5,-5,-4,-4,-3,-2,-2,-1,0,0,1,1,2,2,3,4,5,6,6,7,7,7,7,7,7,7,6,6,6,5,5,5,5,4,4,3,3,3,2,2,2,1,1,1,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-3,-3,-3,-4,-4,-5,-5,-6,-6,-6,-6,-6,-6,-6,-5,-5,-4,-4,-3,-2,-1,0,1,2,3,3,4,4,4,4,4,4,3,3,2,1,0,-1,-2,-3,-4,-5,-6,-6,-6,-7,-7,-8,-9,-11,-12,-13,-13,-13,-13,-12,-12,-13,-15,-17,-20,-24,-28,-31,-34,-36,-38,-39,-41,-43,-45,-48,-52,-54,-57,-57,-56,-54,-52,-50,-50,-52,-57,-65,-75,-86,-95,-103,-107,-107,-104,-96,-86,-73,-58,-39,-15,15,53,99,154,215,279,341,396,436,458,459,437,394,334,263,187,112,44,-14,-59,-91,-113,-126,-133,-138,-142,-147,-153,-160,-166,-170,-173,-171,-167,-159,-148,-135,-121,-107,-94,-82,-72,-64,-58,-53,-51,-49,-49,-50,-51,-52,-53,-54,-54,-54,-53,-52,-49,-46,-42,-37,-32,-25,-18,-10,-2,7,17,26,35,44,52,59,64,68,71,72,72,70,68,66,63,60,58,55,52,49,47,44,41,39,37,35,33,31,30,29,28,27,26,25,24,22,21,20,19,18,17,16,15,15,15,15,15,15,15,15,15,15,15,15,14,14,14,14,14,14,14,15,15,16,17,18,18,19,19,19,19,19,19,19,19,18,18,18,17,16,16,15,14,13,12,11,11,11,11,11,12,12,12,12,13,13,14,14,15,16,17,17,17,17,16,15,13,11,10,8,6,5,4,3,2,0,-1,-3,-6,-8,-11,-13,-16,-19,-22,-26,-30,-34,-39,-45,-50,-55,-60,-63,-66,-67,-67,-66,-64,-62,-60,-58,-57,-55,-53,-51,-48,-46,-43,-40,-37,-34,-32,-30,-28,-26,-25,-23,-22,-20,-18,-16,-13,-11,-9,-7,-6,-4,-3,-2,-1,-1,0,1,2,3,3,3,4,4,5,5,6,6,7,8,9,10,12,13,14,15,16,18,19,20,22,23,24,25,25,25,25,25,25,24,24,23,23,23,23,23,23,23,22,22,21,20,20,20,19,19,19,20,20,20,20,19,19,19,18,18,18,18,18,19,19,20,21,22,23,23,24,24,25,25,26,26,27,27,28,29,29,30,30,30,31,31,32,32,32,33,33,33,34,34,34,34,34,34,33,33,32,32,32,31,31,31,30,30,29,28,27,26,25,25,24,24,25,26,28,29";
          //PFData = "16,16,16,16,16,16,17,17,17,17,17,17,17,18,18,18,18,18,19,19,19,19,20,20,20,21,21,22,22,23,23,24,24,24,25,25,25,25,24,24,24,24,23,23,23,22,22,21,21,21,20,20,20,19,19,19,19,18,18,18,17,17,17,16,16,16,16,16,15,15,15,15,15,15,15,15,15,14,14,14,14,14,14,14,14,14,14,15,15,15,15,15,16,16,16,17,17,17,17,17,17,16,16,15,15,14,13,13,12,12,11,11,10,9,8,8,7,6,5,4,3,2,1,-1,-2,-3,-4,-6,-7,-8,-8,-9,-9,-9,-9,-8,-8,-7,-7,-6,-5,-5,-4,-4,-3,-3,-2,-1,0,1,3,4,6,7,9,10,11,12,13,14,14,15,16,16,17,17,17,17,17,16,15,15,15,15,16,17,17,18,17,15,11,5,-2,-12,-21,-30,-37,-42,-43,-41,-37,-31,-26,-22,-21,-23,-30,-40,-52,-64,-76,-85,-91,-93,-93,-90,-85,-79,-71,-59,-42,-17,19,66,126,195,269,344,413,467,503,515,502,465,408,335,254,172,94,26,-31,-75,-106,-127,-139,-145,-146,-144,-139,-132,-123,-114,-105,-98,-92,-90,-91,-95,-100,-106,-110,-112,-110,-105,-96,-86,-75,-65,-57,-51,-48,-46,-47,-47,-48,-48,-47,-46,-45,-43,-42,-42,-41,-41,-40,-38,-36,-32,-28,-23,-17,-12,-6,-1,5,10,16,21,26,31,35,39,41,42,41,40,38,36,34,32,30,29,27,25,23,22,20,18,17,16,15,15,15,16,16,16,15,15,14,13,13,13,13,13,13,13,13,12,11,9,7,5,3,1,0,-1,-1,-1,-1,-2,-3,-4,-6,-8,-10,-12,-14,-16,-18,-20,-22,-23,-25,-27,-28,-29,-29,-29,-29,-28,-27,-25,-24,-23,-21,-20,-19,-18,-17,-16,-15,-14,-12,-11,-9,-8,-7,-5,-4,-3,-2,0,1,3,4,6,7,7,8,8,8,8,7,7,6,6,6,5,5,5,4,4,3,3,2,1,1,0,-1,-2,-2,-3,-4,-5,-6,-7,-8,-9,-9,-10,-10,-9,-9,-8,-7,-6,-6,-5,-4,-4,-3,-3,-2,-1,0,1,2,4,5,6,7,8,10,11,13,14,16,18,19,21,22,22,22,22,22,21,21,20,19,19,18,17,17,16,15,14,13,13,12,11,11,10,10,9,8,8,7,6,5,4,4,3,3,3,3,3,3,3,3,4,5,6,7,8,9,10,11,11,11,11,11,10,9,8,7,5,3,0,-3,-7,-10,-14,-18,-21,-23,-25,-26,-26,-26,-25,-25,-24,-22,-20,-18,-14,-10,-5,-1,3,4,3,-3,-12,-25,-41,-58,-75,-90,-102,-110,-115,-117,-117,-117,-119,-122,-128,-135,-143,-149,-153,-152,-144,-130,-108,-79,-42,1,51,108,170,235,304,371,433,486,524,543,539,512,462,393,309,216,123,35,-41,-103,-149,-179,-195,-201,-200,-195,-189,-182,-175,-167,-158,-148,-136,-122,-107,-93,-81,-71,-65,-61,-61,-62,-65,-67,-68,-68,-66,-62,-57,-52,-47,-42,-37,-34,-31,-28,-26,-24,-23,-21,-20,-19,-18,-17,-15,-13,-12,-9,-7,-5,-2,1,3,6,9,12,15,18,22,26,29,32,35,37,38,39,39,39,38,36,35,33,32,30,29,27,26,24,22,21,20,18,17,16,16,15,14,14,13,13,12,11,10,10,9,8,8,7,7,6,5,5,4,4,3,3,2,2,2,1,1,0,0,-1,-2,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-13,-14,-14,-14,-13,-13,-12,-12,-11,-10,-10,-9,-9,-8,-8,-7,-6,-6,-5,-5,-4,-4,-3,-3,-2,-2,-1,-1,0,1,1,2,2,3,3,3,2,2,2,2,1,1,1,1,0,0,0,-1,-1,-2,-2,-2,-3,-3,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-8,-8,-8,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-6,-6,-6,-6,-6,-6,-7,-7,-8,-8,-9,-9,-10,-11,-11,-12,-13,-14,-14,-15,-15,-14,-13,-12,-11,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,2,4,6,8,10,12,14,17,19,22,25,28,32,35,38,40,42,43,42,41,39,37,34,31,28,25,22,18,14,10,5,1,-3,-7,-9,-12,-13,-14,-15,-16,-18,-19,-21,-23,-24,-24,-23,-23,-23,-24,-28,-34,-42,-53,-64,-75,-84,-89,-90,-87,-81,-74,-67,-63,-63,-66,-73,-81,-89,-96,-99,-99,-95,-89,-83,-77,-71,-63,-52,-33,-3,41,100,172,254,337,414,475,512,520,497,444,368,277,180,88,8,-55,-98,-123,-133,-133,-127,-121,-116,-114,-114,-116,-117,-116,-113,-108,-101,-94,-88,-85,-84,-86,-89,-92,-94,-95,-93,-90,-85,-80,-74,-70,-66,-63,-60,-58,-54,-50,-45,-39,-32,-26,-19,-13,-7,-2,3,7,11,14,17,20,22,24,25,25,24,24,23,22,22,21,21,21,21,22,23,23,24,25,27,28,30,32,34,36,38,40,42,43,44,44,44,43,42,40,38,35,33,31,29,27,25,24,22,19,17,15,12,10,7,5,2,0,-3,-5,-8,-11,-14,-17,-20,-23,-25,-26,-27,-27,-26,-26,-25,-24,-22,-21,-20,-19,-18,-17,-16,-15,-14,-12,-11,-10,-8,-7,-6,-5,-4,-3,-2,0,1,3,4,5,6,7,7,7,7,7,6,6,5,5,4,4,4,3,3,2,1,1,0,-1,-1,-2,-3,-3,-4,-5,-6,-7,-8,-8,-9,-10,-11,-11,-11,-11,-11,-11,-10,-10,-9,-9,-9,-8,-8,-7,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-2,-2,-2,-1,-1,0,1,1,1,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,4,3,2,0,-1,-1,-1,0,1,3,6,8,10,11,11,9,6,2,-3,-9,-14,-18,-21,-22,-22,-21,-20,-19,-18,-18,-19,-20,-20,-21,-20,-18,-17,-15,-15,-16,-21,-27,-35,-44,-52,-58,-60,-58,-52,-43,-33,-24,-17,-15,-18,-25,-34,-45,-53,-59,-61,-58,-52,-44,-34,-23,-10,5,26,55,94,145,206,276,348,417,474,512,527,514,475,413,332,241,148,60,-16,-77,-122,-151,-167,-173,-173,-169,-164,-160,-156,-152,-149,-145,-140,-136,-131,-128,-125,-124,-125,-126,-128,-129,-128,-126,-123,-118,-112,-105,-98,-92,-86,-81,-76,-71,-65,-59,-52,-44,-36,-27,-19,-10,-2,5,11,17,21,25,28,30,31,32,32,31,31,30,29,28,27,26,26,26,26,26,27,28,29,30,32,33,35,37,39,40,42,44,45,46,46,46,45,43,41,39,36,34,32,30,28,26,24,22,20,17,15,12,10,7,5,2,0,-2,-5,-8,-11,-14,-17,-20,-22,-24,-25,-26,-26,-26,-25,-24,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-12,-11,-10,-9,-8,-7,-6,-5,-5,-3,-2,-1,0,1,2,3,4,4,4,4,4,4,3,3,3,3,3,2,2,2,1,1,0,0,-1,-1,-2,-2,-3,-4,-4,-5,-6,-7,-8,-8,-9,-9,-10,-9,-9,-9,-8,-8,-7,-7,-6,-5,-5,-4,-4,-3,-2,-1,0,1,2,2,3,4,5,5,6,7,8,8,9,9,9,9,9,9,10,11,13,14,16,17,17,15,12,8,2,-3,-8,-12,-15,-15,-15,-14,-13,-12,-13,-15,-18,-21,-23,-23,-22,-19,-16,-14,-14,-17,-22,-31,-40,-50,-56,-59,-58,-52,-43,-33,-24,-18,-17,-20,-26,-33,-40,-45,-46,-45,-43,-41,-41,-45,-50,-55,-55,-45,-22,19,77,149,229,309,377,427,449,442,405,344,265,180,96,23,-35,-74,-95,-103,-100,-93,-86,-80,-78,-79,-83,-86,-89,-91,-90,-89,-88,-87,-88,-89,-91,-92,-92,-91,-88,-84,-79,-74,-70,-66,-65,-64,-64,-63,-62,-60,-56,-52,-47,-42,-37,-33,-29,-26,-23,-21,-17,-14,-10,-7,-3,0,2,4,5,6,7,7,7,8,9,9,10,11,12,13,14,15,17,19,21,24,27,30,33,36,40,43,46,49,51,53,54,55,54,53,51,48,46,43,41,39,37,35,32,30,27,25,22,20,17,15,12,10,8,6,3,0,-3,-7,-10,-13,-16,-17,-18,-19,-18,-18,-17,-17,-16,-16,-16,-16,-15,-15,-14,-13,-12,-10,-9,-7,-6,-5,-5,-4,-4,-4,-3,-3,-2,-1,0,1,2,3,3,3,3,3,3,3,2,2,2,2,2,2,2,1,1,1,0,-1,-1,-2,-3,-4,-5,-5,-6,-7,-7,-8,-9,-10,-11,-12,-12,-12,-12,-11,-10,-9,-8,-7,-6,-6,-6,-6,-5,-5,-3,-2,0,2,4,6,8,10,11,13,15,18,22,25,29,32,35,36,36,34,31,28,25,21,19,17,15,14,13,11,8,4,-1,-6,-12,-18,-24,-29,-33,-36,-39,-43,-47,-51,-56,-62,-68,-73,-77,-81,-83,-86,-87,-89,-91,-93,-94,-94,-91,-87,-80,-70,-59,-47,-36,-27,-20,-17,-17,-19,-22,-26,-30,-34,-37,-40,-44,-47,-48,-44,-34,-13,22,72,138,216,301,386,462,520,553,555,526,467,385,287,183,84,-4,-75,-127,-159,-175,-179,-175,-167,-158,-149,-141,-133,-125,-115,-105,-94,-84,-76,-71,-70,-73,-79,-86,-92,-97,-99,-98,-94,-88,-82,-76,-71,-67,-64,-63,-61,-58,-55,-50,-44,-37,-29,-22,-15,-10,-5,-1,2,5,7,9,11,13,14,15,15,15,15,15,15,15,15,15,15,15,15,15,15,16,17,18,20,22,23,25,26,27,28,29,30,30,30,29,29,28,27,26,24,23,21,20,19,18,17,16,15,14,12,11,10,9,8,7,6,4,3,2,1,0,-1,-2,-3,-4,-5,-5,-5,-4,-4,-4,-3,-3,-3,-3,-3,-3,-2,-2,-2,-1,0,0,1,1,2,2,3,3,4,5,5,6,7,7,8,8,8,7,7,6,6,5,4,4,3,3,2,2,1,1,0,-1,-2,-3,-4,-5,-6,-8,-9,-10,-11,-13,-14,-16,-17,-18,-19,-20,-20,-20,-20,-19,-18,-18,-17,-16,-16,-15,-15,-14,-13,-13,-12,-11,-10,-9,-9,-8,-7,-7,-6,-5,-3,-2,-1,1,2,3,4,4,4,4,4,4,4,4,3,3,2,1,0,-1,-2,-3,-3,-2,-1,1,3,5,8,10,12,14,16,18,19,20,22,23,24,25,25,24,23,21,19,17,16,16,16,18,20,23,24,25,23,18,10,-2,-18,-36,-55,-74,-92,-108,-121,-131,-138,-144,-149,-154,-160,-166,-172,-176,-178,-177,-170,-157,-139,-115,-87,-54,-17,24,69,120,177,239,305,371,435,489,530,550,546,518,465,391,302,207,112,25,-48,-105,-145,-168,-179,-181,-179,-174,-170,-167,-164,-161,-156,-149,-139,-128,-116,-105,-96,-90,-87,-86,-87,-88,-87,-85,-79,-72,-63,-54,-45,-38,-32,-29,-26,-25,-23,-22,-20,-18,-16,-14,-13,-12,-12,-12,-12,-12,-12,-10,-8,-5,-2,2,6,9,12,16,19,23,26,30,34,37,40,42,42,42,41,40,38,36,34,32,30,29,27,26,24,22,20,18,16,15,13,12,11,10,9,8,7,6,5,3,2,1,0,-1,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-4,-4,-4,-4,-4,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,1,1,2,2,3,4,4,5,5,6,6,7,7,7,7,7,7,6,6,5,4,3,3,2,1,1,0,0,-1,-2,-2,-2,-2,-2,-1,0,2,4,6,8,10,11,11,10,8,5,1,-3,-8,-12,-16,-19,-21,-21,-20,-18,-14,-11,-8,-6,-6,-8,-12,-18,-26,-34,-43,-50,-57,-62,-66,-67,-67,-66,-63,-61,-59,-58,-58,-59,-63,-68,-75,-84,-94,-103,-112,-120,-125,-125,-120,-108,-87,-55,-12,43,109,184,264,345,421,487,536,565,569,549,505,440,361,272,180,92,12,-56,-109,-148,-174,-188,-193,-192,-186,-179,-173,-167,-163,-162,-163,-165,-167,-168,-167,-164,-156,-144,-128,-109,-88,-67,-49,-33,-21,-14,-10,-10,-12,-16,-20,-23,-26,-28,-30,-31,-33,-35,-36,-37,-37,-36,-34,-31,-26,-20,-14,-7,-1,5,11,17,22,27,32,36,39,41,42,42,41,39,37,34,32,29,27,25,23,22,20,18,16,15,13,12,11,10,10,10,9,9,8,8,7,6,5,4,4,4,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1,0,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-4,-4,-5,-5,-5,-6,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,3,4,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,0,0,0,0,0,1,1,0,0,0,0,-1,-1,-1,-2,-2,-1,-1,0,0,1,1,1,1,1,0,-1,-1,-1,-1,-1,0,0,1,1,2,2,1,1,1,1,2,3,4,6,8,9,10,10,9,8,7,5,4,4,3,3,3,3,2,1,-2,-4,-7,-9,-11,-11,-9,-6,-1,4,10,15,19,21,21,21,19,17,15,13,12,12,12,12,11,9,6,3,-1,-4,-6,-7,-7,-7,-6,-7,-11,-18,-29,-43,-58,-74,-89,-100,-108,-111,-111,-109,-106,-105,-106,-111,-119,-128,-136,-143,-146,-145,-140,-131,-121,-108,-94,-77,-53,-21,23,82,155,242,336,429,514,580,619,626,598,538,450,345,233,123,25,-56,-116,-157,-180,-190,-192,-189,-185,-180,-175,-169,-161,-149,-135,-118,-101,-85,-73,-65,-62,-63,-67,-71,-75,-77,-76,-73,-67,-61,-55,-51,-48,-46,-46,-46,-46,-44,-42,-39,-35,-31,-27,-25,-24,-23,-23,-23,-22,-20,-18,-15,-11,-7,-3,0,4,7,11,15,19,23,28,33,36,39,41,41,40,39,37,35,34,33,32,31,30,29,27,25,23,20,18,16,14,13,12,12,11,10,9,8,7,5,3,2,1,0,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,4,4,4,5,5,5,5,5,4,4,4,3,3,2,2,1,1,1,0,0,-1,-1,-2,-3,-3,-4,-5,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-14,-15,-15,-15,-15,-14,-14,-13,-13,-12,-12,-11,-11,-10,-10,-9,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-5,-5,-5,-4,-4,-4,-4,-4,-4,-3,-2,-2,-1,0,1,2,2,3,3,3,3,4,4,5,6,7,8,8,9,10,10,11,11,12,13,13,14,14,15,15,15,15,16,16,16,17,17,18,19,19,19,19,19,19,18,16,15,13,12,10,8,7,5,3,2,0,-1,-3,-4,-5,-5,-6,-6,-5,-5,-4,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,0,1,2,2,2,2,1,0,0,-1,-1,-1,0,1,1,2,1,1,-1,-3,-5,-7,-9,-10,-11,-11,-11,-12,-13,-15,-18,-22,-27,-32,-37,-42,-47,-51,-55,-58,-61,-64,-67,-70,-73,-75,-77,-78,-79,-79,-79,-79,-79,-80,-81,-83,-85,-87,-88,-88,-86,-82,-75,-65,-51,-32,-8,22,59,104,156,216,279,344,406,461,502,526,530,510,468,405,327,239,147,58,-23,-91,-144,-183,-209,-224,-232,-235,-237,-239,-241,-242,-240,-235,-225,-209,-188,-162,-134,-105,-78,-54,-35,-22,-13,-8,-6,-7,-9,-12,-15,-18,-22,-26,-30,-34,-38,-41,-42,-42,-40,-36,-31,-24,-17,-9,-1,8,16,24,32,39,47,53,59,63,66,67,67,66,64,61,58,55,53,50,47,45,43,41,39,37,35,34,34,34,34,35,35,36,37,38,38,38,39,39,39,38,38,37,35,34,32,30,28,26,24,22,21,19,18,16,14,12,10,7,5,3,1,-2,-4,-6,-9,-12,-14,-17,-20,-22,-24,-26,-26,-26,-26,-25,-24,-23,-22,-21,-20,-20,-19,-18,-17,-16,-15,-13,-12,-11,-10,-9,-8,-7,-6,-5,-4,-3,-1,0,1,2,3,4,4,4,3,3,2,1,1,0,0,-1,-1,-2,-3,-4,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-18,-19,-20,-20,-21,-21,-21,-21,-21,-21,-20,-20,-19,-19,-18,-18,-18,-17,-17,-16,-16,-15,-15,-14,-14,-14,-14,-13,-13,-13,-12,-12,-12,-11,-11,-11,-10,-10,-10,-10,-9,-9,-9,-9,-9,-9,-8,-8,-8,-8,-8,-8,-8,-7,-7,-7,-6,-6,-6,-5,-5,-4,-4,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-4,-4,-4,-4,-4,-5,-5,-5,-5,-5,-5,-5,-5,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-6,-6,-6,-6,-5,-5,-4,-3,-2,-1,0,0,0,1,1,1,1,2,2,2,2,2,1,0,-2,-4,-5,-7,-7,-8,-7,-7,-7,-8,-10,-13,-17,-22,-28,-34,-39,-44,-48,-52,-56,-61,-66,-71,-77,-83,-87,-89,-89,-87,-82,-77,-71,-67,-64,-64,-65,-68,-72,-74,-74,-70,-64,-54,-41,-26,-10,9,30,54,83,119,160,207,257,307,353,389,411,417,403,372,324,265,199,132,70,15,-30,-63,-86,-100,-107,-112,-115,-118,-123,-129,-135,-141,-146,-149,-149,-146,-140,-132,-123,-112,-101,-90,-80,-71,-64,-58,-53,-50,-48,-47,-47,-47,-48,-48,-49,-50,-51,-51,-51,-50,-48,-45,-41,-34,-27,-18,-9,0,10,19,27,34,41,46,50,53,56,57,58,58,57,56,54,52,50,48,46,44,42,40,38,37,36,36,35,35,35,35,35,35,35,36,36,36,36,36,36,35,35,34,34,33,32,31,30,29,28,27,26,25,24,24,23,22,21,21,20,19,18,18,17,17,16,16,16,15,15,14,13,13,12,12,12,12,12,12,12,11,11,10,9,9,8,8,8,9,9,10,11,12,12,13,14,15,16,17,19,20,22,23,23,23,22,21,18,16,13,11,9,7,5,4,2,0,-3,-6,-9,-13,-16,-20,-23,-26,-30,-33,-37,-42,-47,-53,-59,-64,-69,-74,-77,-78,-79,-78,-77,-74,-72,-69,-67,-65,-62,-60,-57,-54,-51,-48,-45,-42,-39,-37,-35,-33,-31,-29,-27,-24,-22,-19,-16,-14,-12,-9,-8,-6,-5,-4,-3,-2,-1,0,0,1,1,2,2,2,3,3,4,4,5,6,7,7,8,9,10,12,13,14,15,16,17,18,19,19,20,20,21,21,21,21,21,21,21,20,19,19,18,18,19,20,21,22,23,23,23,23,22,21,20,19,19,19,20,21,22,23,24,25,25,25,25,25,25,25,26,26,27,28,28,29,29,30,30,31,31,32,32,33,33,33,33,33,33,33,33,33,34,34,35,36,36,37,37,37,36,36,36,35,35,35,35,35,35,35,35,35,35,35,34,34,34,34,34,33,33,33";

          var FilteredRPeakDataArray = [];
          var JSONData = JSON.parse(JsonString);
          var FilteredRPeakData = JSONData.RPEAK;
          //var FilteredRPeakData = "195,596,1083,1538,1996,2462,2901,3330,3782";
          //perfect 1 s 2 var FilteredRPeakData = "372,757,1145,1534,1925,2311,2705,3086,3481,3880";
          //perfect 2 var FilteredRPeakData = "354,731,1097,1451,1789,2126,2457,2779,3088,3394,3697";
          //perfect 2 var FilteredRPeakData = "207,526,842,1160,1483,1806,2192,2500,2819,3149,3474,3800";
          //corrected var FilteredRPeakData = "449,883,1338,1639,2134,2538,2934,3327,3732";
          //perfect 2 s 2 var FilteredRPeakData = "338,773,1185,1607,2064,2564,3076,3581,3809";
          //var FilteredRPeakData = "338,773,1185,1607,2064,2564,3076,3581,3809";
          //var FilteredRPeakData = "221,568,907,1227,1513,1804,2105,2431,2874,3268,3651";
          HigiKioskStorageService.saveSessionData('RPeakDataLead1', FilteredRPeakData.split(','));
          HigiKioskStorageService.saveSessionData('sixleadZugECGlead1SmoothGraph', PFData.split(","));
          if ($scope.stableCount == true) {
            $scope.checkGraphAlignment($scope.leadMode);
          }
        }
        else if (reading_lead == 2) {
          //Sample Filtered Data
          //PFData = "7,3,-1,-3,-5,-5,-4,-2,-1,1,2,2,1,-1,-3,-5,-6,-7,-8,-7,-6,-5,-4,-3,-2,-2,-3,-3,-3,-3,-3,-2,-1,0,2,3,4,5,5,6,6,7,8,9,10,12,14,15,16,16,16,17,17,18,19,20,23,25,28,31,34,36,38,39,40,40,40,40,40,40,40,41,41,42,43,43,43,42,42,41,40,39,38,38,39,41,43,45,47,49,51,53,54,55,56,57,58,60,62,63,64,64,63,61,58,54,50,46,43,39,37,35,33,31,29,26,23,19,15,10,6,1,-3,-7,-12,-17,-22,-28,-33,-38,-42,-44,-45,-44,-42,-39,-36,-33,-31,-29,-29,-28,-27,-26,-23,-19,-15,-10,-5,-1,3,5,6,6,6,7,8,11,14,18,22,26,28,29,30,29,28,26,26,26,27,28,30,31,32,32,31,29,27,25,24,23,23,24,26,27,28,29,29,28,26,25,24,23,24,25,27,29,30,31,31,30,28,25,23,20,19,18,19,20,22,25,26,28,28,27,27,25,24,24,24,24,25,26,27,28,28,28,27,27,26,25,24,24,24,23,23,22,21,19,18,17,16,15,15,15,15,15,15,14,14,13,12,12,12,12,13,13,13,13,12,10,9,7,5,4,3,2,1,-1,-3,-5,-8,-11,-13,-14,-13,-10,-7,-3,1,3,3,0,-4,-10,-15,-20,-21,-20,-14,-6,5,17,28,38,44,48,49,48,46,44,43,42,43,45,48,50,52,53,54,53,52,50,48,46,44,42,41,39,38,36,36,36,36,36,36,37,36,36,35,34,33,32,32,32,33,33,34,34,34,34,33,32,31,31,31,30,30,29,29,27,26,25,24,24,25,25,26,27,27,27,25,24,23,23,23,25,27,30,32,33,31,28,24,20,16,14,16,20,26,34,40,45,46,42,35,24,13,4,-2,-4,-1,7,18,29,39,46,49,48,44,38,31,25,22,21,22,26,30,35,39,42,45,46,46,46,46,46,46,46,45,44,43,41,40,38,35,33,31,29,27,24,22,20,17,14,11,8,4,0,-4,-7,-10,-11,-11,-11,-10,-9,-10,-12,-17,-23,-30,-37,-43,-47,-49,-49,-48,-46,-45,-45,-47,-50,-52,-54,-52,-48,-41,-33,-26,-21,-20,-23,-29,-35,-36,-28,-8,27,76,137,203,268,325,367,389,390,371,335,288,235,183,136,95,62,36,14,-5,-22,-38,-53,-66,-74,-78,-77,-70,-61,-50,-39,-31,-26,-24,-25,-28,-32,-35,-36,-36,-34,-31,-28,-25,-23,-21,-21,-21,-20,-20,-20,-20,-19,-19,-19,-18,-18,-17,-16,-14,-11,-8,-5,-2,1,4,6,7,8,9,10,11,12,13,14,14,14,14,14,14,15,15,16,17,18,19,20,21,21,22,23,24,25,27,28,29,31,32,33,34,34,35,36,36,36,36,36,35,34,33,32,31,31,31,31,32,32,33,33,32,32,33,34,36,39,42,46,50,53,55,55,54,51,47,43,39,36,34,32,31,30,29,26,23,19,14,9,5,0,-4,-7,-10,-14,-19,-24,-31,-39,-47,-56,-64,-71,-77,-82,-84,-85,-85,-84,-82,-79,-76,-73,-70,-68,-66,-64,-62,-60,-57,-54,-49,-43,-37,-30,-23,-18,-15,-14,-14,-15,-16,-15,-13,-8,-2,6,13,18,21,21,18,13,8,6,6,11,19,30,41,50,54,53,45,32,15,-2,-18,-29,-34,-34,-29,-21,-13,-7,-4,-5,-10,-17,-25,-32,-36,-38,-37,-34,-31,-27,-25,-24,-24,-26,-28,-29,-30,-29,-28,-25,-22,-19,-17,-16,-16,-16,-16,-16,-16,-15,-13,-11,-9,-7,-5,-4,-4,-4,-5,-7,-9,-11,-12,-13,-13,-12,-11,-11,-11,-11,-13,-16,-20,-24,-27,-29,-29,-29,-27,-26,-26,-28,-31,-36,-42,-47,-50,-50,-47,-41,-35,-29,-25,-25,-30,-39,-51,-62,-70,-72,-67,-55,-38,-17,4,20,31,34,30,20,7,-5,-14,-17,-14,-6,6,19,30,38,41,40,35,28,21,16,12,10,9,10,10,9,6,2,-2,-7,-11,-14,-15,-15,-15,-15,-16,-19,-22,-27,-32,-36,-40,-42,-43,-43,-43,-41,-40,-39,-39,-39,-39,-39,-38,-36,-34,-31,-28,-25,-23,-22,-24,-27,-33,-41,-50,-61,-71,-81,-90,-97,-101,-104,-105,-105,-104,-103,-103,-102,-102,-100,-96,-90,-81,-68,-51,-30,-5,22,53,85,120,155,191,225,256,281,299,307,303,286,257,216,167,112,57,4,-43,-82,-110,-127,-136,-136,-131,-123,-114,-104,-96,-88,-82,-76,-70,-65,-60,-55,-52,-50,-49,-50,-52,-56,-60,-64,-68,-71,-73,-75,-76,-75,-74,-73,-71,-69,-67,-65,-64,-63,-63,-62,-62,-61,-59,-56,-53,-49,-46,-43,-41,-40,-39,-40,-40,-39,-38,-36,-33,-30,-27,-25,-25,-25,-27,-27,-27,-24,-19,-13,-5,2,7,10,9,5,0,-4,-5,-1,8,22,39,57,72,82,84,78,66,50,34,22,16,20,32,52,76,100,122,137,144,144,137,126,114,104,95,90,88,87,85,81,75,67,56,46,36,29,25,24,25,27,28,27,24,18,9,0,-8,-15,-19,-20,-17,-12,-5,4,12,20,27,33,38,43,47,50,54,58,63,69,75,83,93,103,114,126,138,150,160,170,179,185,190,193,193,192,188,184,179,173,168,164,160,156,152,147,141,134,127,120,114,111,109,109,109,107,100,87,68,44,16,-12,-35,-50,-53,-42,-20,11,45,78,103,117,118,107,85,58,31,7,-10,-18,-19,-15,-7,2,9,13,14,14,13,13,15,19,25,31,37,41,42,42,39,36,32,29,27,26,25,24,22,20,17,14,10,7,4,1,-2,-5,-8,-12,-16,-20,-24,-27,-29,-31,-33,-35,-38,-42,-48,-54,-60,-64,-67,-67,-64,-59,-52,-47,-43,-42,-43,-47,-51,-54,-55,-52,-45,-36,-25,-16,-11,-11,-17,-29,-43,-58,-69,-73,-68,-55,-34,-10,13,32,43,43,33,15,-8,-31,-51,-64,-69,-67,-59,-48,-37,-29,-26,-28,-35,-44,-53,-62,-68,-71,-71,-70,-69,-69,-71,-75,-80,-84,-88,-90,-90,-88,-84,-80,-77,-74,-73,-74,-75,-76,-77,-77,-75,-71,-67,-63,-59,-57,-56,-56,-57,-58,-59,-58,-57,-54,-50,-46,-42,-39,-39,-39,-42,-45,-49,-52,-53,-54,-52,-50,-48,-46,-46,-47,-49,-52,-54,-54,-52,-48,-41,-33,-25,-18,-12,-9,-8,-7,-5,1,11,25,43,63,82,97,105,105,96,80,59,36,15,-1,-10,-13,-10,-3,5,12,15,14,9,1,-8,-18,-27,-33,-37,-40,-41,-42,-44,-47,-50,-54,-57,-59,-60,-59,-58,-56,-54,-52,-51,-50,-50,-51,-53,-55,-59,-63,-68,-74,-80,-85,-90,-92,-93,-92,-90,-88,-86,-86,-89,-93,-99,-106,-113,-119,-123,-127,-130,-133,-138,-143,-150,-156,-162,-162,-156,-140,-111,-70,-16,49,122,198,272,339,393,431,449,446,423,382,326,261,193,127,66,15,-24,-53,-71,-82,-87,-91,-94,-99,-105,-111,-117,-122,-123,-121,-116,-107,-97,-87,-78,-70,-64,-60,-56,-53,-49,-44,-39,-34,-29,-25,-23,-23,-24,-26,-29,-31,-33,-34,-33,-33,-32,-32,-33,-35,-37,-39,-40,-40,-39,-36,-33,-28,-24,-21,-19,-18,-18,-18,-19,-20,-20,-19,-17,-14,-11,-8,-5,-3,-1,0,2,3,4,6,9,11,14,17,20,23,26,29,33,38,43,49,54,59,64,67,70,71,71,71,71,70,70,70,69,68,66,63,59,54,48,42,36,32,28,27,26,27,29,32,34,36,38,39,39,39,39,38,36,34,32,29,25,20,14,8,1,-7,-14,-21,-28,-35,-41,-47,-51,-56,-59,-61,-62,-61,-60,-59,-57,-55,-53,-51,-50,-49,-48,-48,-47,-45,-43,-40,-36,-33,-30,-27,-25,-24,-23,-23,-23,-22,-20,-17,-12,-8,-3,2,7,10,12,13,14,15,17,19,22,27,31,36,40,42,43,43,41,38,35,33,31,30,29,29,29,28,27,24,21,17,13,9,6,4,3,2,2,2,1,-1,-3,-5,-9,-12,-14,-17,-18,-18,-18,-17,-16,-14,-13,-12,-11,-11,-10,-10,-9,-8,-8,-7,-6,-5,-4,-3,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,1,2,4,5,6,7,7,7,7,6,5,5,4,4,5,6,7,8,10,11,12,13,13,14,14,15,16,17,18,19,21,22,23,23,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,8,7,5,4,2,1,-1,-2,-4,-6,-9,-11,-13,-15,-17,-18,-19,-19,-19,-18,-17,-16,-15,-14,-12,-11,-10,-8,-7,-5,-4,-2,-1,0,1,2,3,3,4,4,5,6,7,8,8,9,10,11,12,13,14,15,16,17,19,21,23,24,26,27,29,30,31,31,32,33,34,35,37,38,39,40,40,41,41,42,42,43,43,43,43,42,40,37,33,28,22,16,9,3,-3,-8,-13,-18,-23,-27,-32,-38,-43,-49,-54,-60,-65,-70,-75,-81,-87,-93,-99,-106,-111,-115,-118,-119,-120,-119,-118,-118,-118,-119,-121,-122,-123,-122,-119,-114,-108,-103,-100,-99,-101,-104,-107,-107,-99,-78,-43,8,76,158,247,338,423,494,546,573,576,554,510,450,378,301,223,148,79,17,-38,-85,-125,-157,-183,-201,-212,-217,-215,-208,-197,-182,-166,-148,-130,-113,-97,-82,-69,-57,-47,-38,-32,-28,-27,-27,-28,-31,-33,-36,-37,-38,-38,-37,-36,-34,-32,-31,-29,-27,-25,-23,-22,-20,-19,-17,-16,-14,-13,-11,-9,-8,-6,-5,-4,-3,-3,-2,-2,-1,0,2,4,6,8,10,11,11,10,9,8,6,5,3,2,0,-2,-5,-8,-13,-17,-21,-23,-24,-23,-20,-14,-7,2,11,20,29,37,44,52,59,67,75,83,91,98,104,109,112,113,112,110,107,103,98,93,87,81,75,68,61,53,46,39,32,27,22,17,12,7,1,-6,-14,-23,-32,-40,-47,-52,-56,-57,-58,-59,-59,-61,-64,-68,-73,-78,-83,-86,-87,-87,-85,-81,-77,-74,-71,-68,-67,-67,-67,-66,-64,-61,-58,-53,-47,-42,-38,-34,-32,-30,-29,-28,-27,-26,-24,-22,-19,-16,-13,-11,-10,-9,-8,-8,-7,-5,-2,2,7,14,21,29,37,45,53,59,64,67,69,70,69,67,65,62,58,55,51,48,44,40,35,31,26,21,16,12,8,5,3,3,3,4,6,8,9,11,12,12,11,11,10,8,7,6,6,5,5,4,3,2,0,-2,-5,-7,-9,-10,-11,-11,-10,-9,-7,-6,-6,-6,-6,-7,-8,-9,-9,-9,-8,-6,-4,-2,0,2,2,2,2,1,1,0,0,1,2,3,4,5,6,6,5,5,4,3,2,2,2,3,3,4,4,4,3,2,1,0,-1,-2,-2,-2,-1,-1,0,0,-1,-1,-2,-3,-3,-4,-4,-3,-3,-2,-1,-1,0,0,-1,-1,-2,-2,-2,-1,-1,0,1,2,2,3,3,3,3,3,3,3,3,3,4,4,5,5,5,5,6,6,7,7,7,8,8,8,8,7,7,7,7,7,8,9,10,11,12,14,15,16,18,20,22,24,26,29,30,32,33,33,32,31,29,27,24,21,18,16,13,10,6,3,0,-3,-6,-9,-12,-15,-18,-21,-23,-26,-29,-32,-35,-38,-40,-43,-45,-47,-49,-52,-54,-57,-59,-62,-64,-65,-66,-65,-63,-60,-57,-53,-49,-46,-42,-40,-38,-36,-35,-33,-32,-32,-32,-35,-40,-47,-57,-69,-79,-87,-88,-80,-61,-29,17,75,142,214,285,351,405,445,465,467,448,413,363,303,236,167,98,34,-25,-75,-117,-150,-173,-187,-194,-193,-188,-178,-167,-156,-146,-137,-130,-126,-123,-121,-119,-117,-114,-110,-105,-99,-93,-86,-80,-74,-68,-62,-57,-52,-47,-42,-37,-32,-27,-22,-18,-13,-8,-4,1,5,8,11,13,15,16,16,17,17,17,18,18,19,20,20,20,20,20,19,18,17,16,14,13,11,10,9,8,7,7,7,6,6,6,6,6,7,8,9,11,14,17,19,22,24,25,26,26,26,27,28,31,35,41,48,56,65,73,81,89,95,100,103,104,105,103,101,98,94,89,84,79,73,68,63,58,52,47,41,35,28,21,14,6,-1,-9,-16,-24,-33,-42,-51,-61,-70,-79,-87,-93,-98,-100,-100,-99,-96,-93,-89,-85,-81,-77,-74,-70,-67,-63,-59,-54,-50,-45,-41,-37,-34,-31,-29,-26,-23,-20,-17,-13,-9,-5,-2,1,4,5,7,8,8,8,9,9,8,8,8,7,6,5,5,5,6,6,8,9,10,11,11,10,10,9,8,7,7,7,9,10,12,14,15,15,15,14,13,11,9,7,5,4,4,4,5,5,6,7,7,7,7,6,5,3,2,1,0,-1,-1,-1,-1,0,0,0,1,1,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,2,3,3,3,4,4,4,4,5,5,5,5,5,5,5,5,5,6,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,5,5,5,5,4,5,5,5,5,5,4,4,3,2,2,1,1,1,2,2,3,3,2,1,0,-2,-4,-6,-8,-9,-10,-10,-9,-8,-6,-5,-3,-3,-2,-3,-3,-4,-5,-5,-5,-5,-4,-3,-1,1,3,5,7,8,8,9,9,9,9,10,10,11,13,15,16,18,19,20,20,20,19,18,16,15,13,11,9,8,7,7,7,7,8,9,9,8,7,5,3,-1,-4,-7,-9,-11,-12,-12,-11,-10,-10,-10,-11,-12,-13,-15,-16,-15,-14,-12,-9,-6,-4,-4,-5,-8,-12,-18,-25,-30,-34,-36,-36,-34,-31,-27,-23,-21,-21,-22,-25,-29,-34,-39,-43,-47,-50,-53,-56,-60,-64,-68,-73,-76,-78,-77,-72,-62,-47,-27,-1,31,68,109,155,202,250,295,334,364,382,385,371,340,294,234,165,94,24,-40,-92,-132,-158,-171,-173,-167,-156,-144,-132,-122,-115,-110,-107,-104,-100,-95,-88,-80,-71,-61,-52,-44,-36,-30,-25,-21,-17,-14,-12,-11,-11,-12,-13,-16,-20,-23,-27,-30,-33,-34,-34,-33,-31,-30,-28,-27,-26,-26,-27,-28,-28,-28,-28,-27,-26,-24,-21,-19,-17,-16,-15,-14,-13,-12,-10,-9,-7,-5,-2,0,2,4,5,7,9,12,14,17,21,25,28,31,34,37,39,42,44,47,50,53,56,59,62,64,65,65,65,64,64,63,64,65,66,68,70,71,71,70,68,65,61,56,52,48,44,41,38,36,33,30,27,23,18,13,8,3,-3,-8,-12,-17,-22,-26,-31,-36,-42,-47,-52,-56,-60,-63,-65,-66,-67,-67,-68,-68,-69,-70,-71,-73,-74,-75,-76,-75,-74,-72,-69,-66,-62,-58,-55,-52,-50,-48,-46,-44,-42,-38,-34,-29,-24,-18,-13,-8,-3,1,5,9,13,18,23,28,34,39,44,49,52,53,54,52,50,47,44,40,37,34,31,29,27,26,24,23,22,21,20,18,16,14,12,10,7,5,3,2,0,-1,-2,-2,-3,-3,-3,-4,-5,-5,-6,-6,-6,-6,-6,-6,-6,-6,-6,-6,-7,-7,-7,-7,-8,-8,-8,-9,-10,-10,-11,-12,-12,-13,-13,-13,-12,-12,-11,-11,-10,-10,-10,-10,-10,-10,-10,-10,-10,-9,-8,-7,-6,-6,-5,-4,-4,-4,-5,-5,-6,-6,-6,-6,-6,-5,-4,-3,-3,-2,-1,-1,-1,-2,-2,-3,-3,-4,-4,-3,-3,-2,-2,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,-1,-1,-1,-1,0,0,1,2,2,3,3,4,4,5,7,8,10,12,13,14,14,14,13,12,11,9,8,7,7,6,6,5,4,3,1,-1,-3,-4,-5,-6,-7,-7,-6,-6,-5,-5,-5,-4,-4,-5,-6,-7,-8,-10,-11,-12,-13,-13,-12,-11,-9,-7,-5,-3,-2,-1,-1,-1,-2,-4,-7,-11,-18,-26,-37,-48,-60,-71,-80,-86,-89,-90,-89,-89,-90,-94,-101,-111,-122,-131,-135,-132,-120,-97,-65,-24,22,71,120,167,212,254,292,327,358,382,397,400,388,358,310,246,170,86,3,-73,-136,-183,-212,-224,-221,-209,-192,-174,-157,-144,-134,-126,-118,-109,-98,-85,-71,-57,-46,-38,-33,-32,-34,-37,-39,-40,-38,-34,-29,-23,-17,-13,-11,-10,-11,-13,-14,-15,-15,-13,-10,-6,-3,0,1,2,1,-1,-3,-6,-8,-10,-11,-12,-13,-13,-14,-14,-15,-16,-18,-20,-23,-25,-27,-28,-28,-28,-26,-23,-20,-16,-13,-10,-7,-5,-3,-1,1,4,7,11,16,20,25,31,36,42,48,55,62,71,79,88,95,101,104,106,105,102,98,93,88,83,79,76,73,71,67,63,58,51,44,36,28,20,13,7,2,-2,-6,-11,-16,-22,-29,-37,-45,-52,-58,-63,-67,-68,-68,-67,-64,-62,-58,-55,-53,-50,-48,-46,-45,-43,-41,-39,-37,-35,-33,-32,-31,-30,-30,-30,-29,-29,-28,-27,-26,-24,-23,-21,-20,-19,-19,-18,-18,-17,-16,-14,-12,-9,-7,-4,-3,-2,-2,-2,-3,-4,-4,-4,-2,2,6,11,16,21,25,27,28,28,27,25,23,21,20,20,20,20,21,22,22,22,21,20,18,16,14,12,10,8,6,5,4,4,4,4,4,4,3,2,0,-2,-4,-6,-7,-7,-7,-6,-4,-3,-2,-1,-2,-2,-3,-4,-5,-4,-3,-1,2,4,7,8,9,8,7,6,5,4,5,6,8,10,12,13,14,14,14,12,11,9,8,7,7,7,7,7,6,6,5,3,2,0,-1,-3,-4,-5,-6,-8,-9,-11,-13,-15,-17,-18,-20,-20,-20,-20,-19,-18,-16,-15,-14,-13,-12,-11,-10,-10,-9,-7,-6,-4,-2,0,2,4,5,6,7,7,8,9,10,11,13,15,17,19,20,22,22,22,22,20,19,17,16,15,14,14,14,15,15,16,16,15,15,15,15,15,17,19,22,25,28,31,32,32,31,29,26,23,21,19,17,16,16,15,13,11,8,4,0,-3,-7,-9,-11,-11,-12,-12,-13,-15,-18,-23,-28,-33,-37,-41,-43,-44,-44,-44,-43,-43,-42,-42,-42,-41,-40,-38,-35,-31,-26,-22,-18,-14,-12,-10,-10,-10,-13,-17,-23,-33,-45,-59,-75,-91,-107,-120,-130,-136,-136,-131,-121,-107,-89,-66,-38,-5,34,80,132,190,250,311,367,416,452,473,478,465,435,392,337,274,206,138,70,6,-52,-104,-147,-182,-206,-221,-226,-222,-211,-195,-176,-157,-139,-123,-112,-103,-98,-94,-91,-87,-82,-75,-67,-58,-49,-40,-32,-24,-18,-12,-6,0,7,13,19,25,30,34,36,37,36,35,33,32,30,29,28,28,27,26,24,21,17,13,8,2,-3,-9,-15,-21,-28,-35,-44,-52,-61,-70,-78,-84,-89,-91,-90,-88,-84,-78,-72,-66,-60,-55,-50,-44,-39,-33,-26,-19,-11,-3,6,15,24,33,44,56,69,83,98,114,130,145,157,167,174,177,177,175,170,164,157,150,142,133,125,116,107,98,89,79,70,61,52,42,32,22,11,0,-12,-24,-36,-48,-60,-71,-81,-91,-100,-107,-114,-118,-120,-119,-116,-111,-104,-97,-89,-81,-75,-71,-69,-67,-67,-66,-65,-62,-59,-54,-50,-45,-42,-40,-39,-39,-39,-39,-38,-35,-31,-26,-21,-15,-10,-7,-6,-6,-8,-10,-12,-13,-12,-11,-7,-3,1,5,8,11,12,14,15,17,19,22,26,30,34,38,42,45,46,47,47,46,45,44,42,41,40,38,37,35,33,31,29,27,25,23,21,20,18,17,15,14,13,12,11,9,8,7,6,4,3,2,0,-1,-1,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-2,-2,-3,-3,-4,-4,-4,-4,-4,-4,-5,-6,-6,-7,-8,-9,-9,-10,-9,-9,-9,-9,-9,-8,-8,-8,-8,-7,-7,-6,-6,-5,-5,-4,-4,-4,-4,-5,-5,-5,-4,-4,-3,-2,-1,0,0,0,0,0,-1,-1,-2,-2,-2,-2,-1,-1,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,-1,-2,-3,-3,-3,-3,-2,-1,0,1,1,1,0,-1,-2,-3,-4,-5,-5,-4,-3,-2,-1,-1,-1,-2,-2";
          //perfect 1 s 2 PFData = "24,82,144,214,292,373,451,518,566,585,574,533,465,378,282,187,101,30,-25,-63,-88,-105,-117,-129,-141,-153,-165,-174,-179,-178,-172,-161,-148,-135,-123,-115,-110,-108,-108,-107,-105,-101,-94,-84,-73,-60,-48,-37,-27,-19,-12,-6,0,5,10,14,17,20,23,25,26,28,29,31,33,35,37,38,39,39,39,38,37,36,35,34,34,34,33,33,32,31,29,27,24,20,17,13,8,4,0,-4,-7,-10,-12,-13,-14,-16,-17,-19,-22,-25,-29,-33,-37,-39,-40,-37,-32,-24,-13,0,13,27,40,51,59,65,67,67,65,62,58,53,50,46,43,40,38,36,34,32,30,29,29,28,28,29,29,30,31,31,31,31,30,30,29,29,28,27,27,26,24,23,21,20,18,16,14,12,11,9,8,7,7,7,7,8,8,9,10,11,11,11,11,10,10,9,8,8,7,6,6,7,7,9,11,13,16,18,20,22,23,23,22,21,19,17,15,13,11,10,8,6,4,1,-3,-7,-10,-13,-16,-17,-18,-17,-15,-13,-10,-8,-5,-2,0,3,6,9,11,14,16,18,19,19,18,17,16,14,13,11,11,10,9,8,7,6,4,2,0,-2,-3,-3,-4,-4,-5,-6,-9,-11,-14,-17,-20,-22,-22,-21,-19,-17,-14,-12,-11,-11,-12,-14,-16,-17,-18,-18,-16,-13,-10,-6,-3,-1,0,1,0,0,-1,-1,-1,0,0,1,1,1,0,-1,-2,-2,-2,-1,0,0,1,0,-1,-4,-6,-9,-12,-13,-12,-10,-7,-2,3,9,14,18,23,28,33,40,47,55,62,69,73,73,70,64,55,45,35,26,18,12,8,3,-2,-9,-18,-28,-40,-51,-61,-70,-77,-83,-91,-101,-114,-132,-152,-175,-196,-213,-224,-227,-222,-211,-195,-178,-161,-145,-129,-108,-80,-39,20,96,190,296,406,510,597,658,686,678,636,565,473,370,265,166,78,3,-58,-107,-147,-180,-209,-234,-254,-269,-279,-281,-276,-264,-247,-226,-204,-181,-160,-140,-122,-105,-90,-76,-64,-54,-46,-40,-36,-34,-33,-32,-31,-28,-24,-19,-13,-7,-2,3,6,7,8,8,8,9,10,12,14,16,17,18,18,18,17,16,15,15,14,14,14,14,13,13,11,10,9,7,6,5,5,4,4,4,3,3,2,2,1,1,1,0,0,0,0,0,0,0,-1,-1,-2,-2,-2,-3,-3,-3,-4,-4,-4,-5,-5,-5,-6,-6,-6,-6,-5,-5,-5,-4,-4,-4,-4,-4,-5,-5,-5,-4,-4,-3,-3,-2,-1,0,1,3,4,6,7,9,12,14,16,18,20,21,20,19,18,15,12,10,7,6,5,5,6,7,8,10,11,12,12,11,10,9,8,6,5,4,3,3,2,2,1,1,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-1,-2,-2,-1,-1,-1,-1,-1,-1,-2,-2,-2,-3,-2,-2,-2,-1,0,0,0,-1,-2,-3,-4,-4,-3,-2,-1,1,2,4,4,4,3,1,-1,-2,-3,-3,-2,0,2,4,5,6,6,6,4,2,0,-1,-2,-3,-3,-3,-2,-2,-2,-3,-4,-5,-7,-8,-9,-10,-11,-12,-13,-14,-15,-17,-18,-20,-21,-21,-22,-21,-21,-20,-19,-18,-17,-16,-16,-15,-15,-14,-13,-12,-11,-10,-8,-8,-7,-6,-6,-5,-5,-4,-3,-1,0,1,2,3,4,4,4,4,5,6,7,7,8,8,8,6,4,2,-1,-3,-4,-4,-2,1,4,8,12,15,17,19,20,21,23,26,30,34,39,43,45,45,43,39,33,26,20,15,11,10,10,11,12,12,9,4,-5,-15,-28,-42,-56,-70,-85,-99,-113,-128,-143,-156,-169,-178,-184,-185,-181,-172,-159,-141,-119,-93,-62,-25,18,70,131,199,273,348,419,480,526,551,551,527,480,413,334,247,162,83,14,-41,-83,-112,-132,-146,-155,-163,-170,-176,-182,-187,-189,-188,-184,-177,-169,-160,-150,-141,-133,-127,-121,-116,-111,-106,-101,-95,-89,-82,-74,-67,-59,-51,-44,-37,-30,-24,-19,-15,-12,-10,-9,-8,-8,-8,-8,-9,-9,-8,-8,-7,-6,-6,-5,-4,-4,-4,-3,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,0,1,2,4,5,7,8,9,9,8,6,4,2,1,2,4,8,13,19,25,30,33,34,33,30,27,25,24,26,30,36,43,51,57,61,62,59,55,48,41,34,29,25,23,23,23,23,23,22,20,17,13,10,7,5,3,2,1,0,-1,-3,-5,-7,-9,-11,-13,-15,-16,-17,-18,-19,-20,-22,-23,-24,-26,-27,-28,-30,-30,-30,-30,-28,-26,-23,-20,-17,-14,-12,-11,-12,-13,-16,-18,-19,-19,-15,-9,-1,10,21,32,42,48,51,51,47,41,33,25,17,11,6,3,0,-1,-2,-2,-3,-3,-3,-2,-1,1,3,6,9,11,13,13,14,13,12,10,9,7,6,5,5,4,4,4,3,3,3,3,3,3,4,5,6,8,9,11,13,15,17,19,20,20,20,19,17,15,13,10,7,3,-1,-5,-9,-13,-17,-21,-24,-27,-28,-29,-29,-28,-27,-25,-23,-21,-19,-17,-15,-13,-10,-8,-6,-4,-3,-2,-1,-1,-2,-3,-4,-5,-5,-6,-6,-6,-7,-7,-7,-8,-9,-10,-11,-11,-12,-11,-11,-11,-10,-10,-11,-11,-12,-13,-13,-13,-12,-11,-10,-9,-8,-7,-8,-9,-10,-12,-14,-15,-15,-15,-13,-12,-10,-7,-5,-3,-1,2,5,10,15,21,28,34,40,45,49,50,50,47,43,37,30,22,14,8,3,1,1,4,9,15,20,22,21,15,4,-11,-28,-46,-63,-78,-89,-98,-104,-111,-119,-129,-142,-155,-168,-176,-178,-172,-157,-136,-111,-84,-59,-38,-20,-1,22,55,104,171,257,357,463,564,647,700,715,687,618,514,385,246,109,-13,-112,-184,-228,-249,-253,-247,-236,-226,-218,-214,-212,-211,-209,-203,-195,-184,-172,-161,-150,-141,-134,-128,-121,-113,-103,-90,-75,-59,-42,-25,-10,3,14,22,28,31,34,35,36,37,38,38,38,39,39,39,38,37,34,31,27,22,16,10,3,-4,-11,-18,-25,-32,-39,-45,-51,-56,-60,-63,-64,-65,-63,-61,-58,-54,-50,-45,-40,-35,-29,-23,-17,-11,-5,0,4,7,9,10,10,9,9,9,9,10,11,13,14,14,14,14,14,14,14,15,16,18,19,20,20,18,14,9,4,-1,-4,-5,-3,2,11,22,34,46,57,65,71,73,73,70,65,59,52,46,41,37,34,32,31,29,28,26,24,22,18,15,11,6,1,-4,-10,-14,-18,-21,-22,-23,-21,-19,-17,-14,-12,-11,-11,-12,-14,-16,-19,-21,-21,-21,-20,-18,-15,-13,-11,-10,-10,-11,-12,-14,-15,-15,-14,-11,-8,-4,1,6,10,13,16,18,19,20,20,20,19,18,17,16,15,14,14,14,15,16,16,17,17,17,16,15,13,11,9,7,6,6,5,6,6,6,6,6,5,4,3,2,1,0,0,0,0,-1,-1,-1,-2,-3,-4,-5,-5,-6,-6,-6,-6,-6,-7,-7,-8,-9,-10,-10,-11,-11,-12,-12,-12,-13,-14,-14,-15,-15,-16,-16,-16,-15,-14,-14,-13,-13,-13,-14,-14,-15,-15,-15,-15,-14,-13,-12,-11,-9,-8,-7,-5,-3,-1,2,6,9,13,16,18,19,19,18,15,12,8,3,-1,-6,-11,-16,-21,-26,-32,-37,-42,-46,-49,-49,-48,-44,-39,-33,-27,-20,-14,-10,-5,-2,2,5,10,15,21,27,34,39,44,47,48,48,46,42,38,32,26,20,14,7,1,-5,-11,-16,-20,-23,-27,-30,-34,-39,-45,-52,-59,-66,-71,-73,-72,-68,-60,-52,-43,-36,-32,-32,-36,-42,-50,-58,-65,-68,-68,-63,-55,-43,-27,-6,20,53,94,144,200,261,321,376,418,442,443,419,371,302,217,125,34,-48,-116,-165,-196,-210,-210,-200,-186,-172,-160,-152,-149,-150,-153,-156,-158,-157,-154,-146,-135,-121,-103,-85,-65,-46,-28,-13,0,9,14,16,16,14,11,7,4,2,1,0,0,0,-1,-1,-2,-2,-2,-1,0,1,2,3,5,6,6,7,8,9,10,11,12,12,11,8,5,2,-2,-5,-7,-7,-6,-3,1,6,11,15,18,21,22,23,24,24,24,25,26,27,27,27,27,26,25,24,23,22,22,21,22,22,22,22,22,21,20,19,17,16,15,15,15,15,15,15,15,15,15,15,15,14,14,14,15,15,15,15,14,14,13,11,10,8,7,6,5,4,3,3,2,2,0,-1,-3,-5,-7,-10,-12,-15,-18,-21,-24,-27,-31,-35,-39,-43,-46,-48,-49,-49,-47,-44,-40,-34,-28,-20,-12,-5,3,11,17,24,29,33,36,37,38,37,35,32,28,24,20,16,11,7,4,0,-3,-6,-9,-11,-12,-13,-13,-12,-10,-8,-6,-4,-2,-1,0,1,1,1,1,2,2,3,3,3,2,0,-3,-6,-9,-11,-13,-13,-12,-10,-7,-3,1,5,7,9,9,8,6,4,1,-2,-5,-8,-10,-10,-10,-9,-5,-1,4,10,16,22,26,28,28,27,24,19,15,11,8,7,7,8,9,11,12,13,13,12,11,10,8,7,6,6,6,6,6,5,4,3,2,0,-1,-3,-4,-6,-7,-7,-8,-9,-9,-9,-10,-10,-10,-9,-9,-8,-7,-6,-5,-4,-3,-2,-2,-2,-2,-2,-2,-3,-3,-3,-4,-4,-5,-6,-7,-8,-9,-11,-12,-13,-13,-12,-11,-9,-8,-6,-5,-5,-5,-5,-5,-5,-4,-3,-2,0,1,1,0,-2,-5,-7,-9,-9,-8,-5,-2,1,4,4,2,-2,-8,-15,-22,-29,-35,-40,-45,-51,-57,-65,-72,-79,-85,-87,-87,-84,-79,-76,-76,-80,-89,-101,-112,-117,-109,-82,-33,40,134,242,354,459,545,602,624,609,560,484,390,288,188,98,21,-39,-85,-120,-147,-170,-189,-207,-223,-235,-241,-241,-234,-220,-203,-183,-163,-144,-129,-116,-106,-98,-91,-84,-78,-72,-67,-62,-59,-57,-57,-57,-57,-56,-55,-52,-49,-44,-39,-34,-30,-26,-22,-19,-15,-10,-5,0,6,11,16,21,24,27,28,30,30,30,30,30,29,29,27,26,24,21,18,15,12,9,7,4,2,0,-1,-3,-4,-6,-9,-12,-15,-19,-22,-25,-27,-28,-29,-29,-28,-27,-26,-25,-23,-21,-19,-16,-12,-8,-3,3,7,10,12,11,9,5,1,-4,-7,-9,-8,-4,1,9,17,25,32,37,41,42,42,41,38,35,32,30,28,26,25,24,23,22,21,20,18,17,15,14,12,11,11,10,10,10,10,10,9,9,7,6,4,3,1,0,-1,-1,0,1,2,3,3,3,3,2,1,0,-1,-2,-3,-3,-3,-3,-3,-4,-4,-5,-6,-7,-8,-9,-10,-10,-10,-10,-10,-10,-9,-9,-9,-9,-8,-7,-7,-6,-5,-4,-3,-3,-3,-3,-2,-2,-2,-1,-1,0,-1,-2,-3,-5,-8,-10,-12,-13,-12,-9,-5,0,5,11,16,19,21,21,18,15,10,5,0,-3,-6,-7,-7,-5,-3,-1,2,4,5,7,8,8,9,9,9,9,10,10,10,10,9,9,9,8,7,7,7,6,6,5,5,4,3,3,2,1,0,-1,-2,-2,-3,-4,-5,-7,-8,-9,-10,-10,-11,-11,-10,-9,-8,-7,-7,-6,-5,-4,-3,-2,-1,0,1,3,4,5,6,6,7,8,9,11,12,14,16,17,18,19,19,19,19,19,19,20,20,20,19,18,15,12,8,4,0,-2,-4,-4,-4,-3,-3,-3,-5,-7,-11,-15,-19,-23,-26,-27,-28,-28,-29,-31,-34,-39,-45,-53,-60,-67,-73,-78,-81,-83,-84,-85,-85,-85,-85,-85,-86,-86,-86,-86,-85,-84,-81,-75,-65,-48,-24,10,53,105,165,229,294,357,412,455,484,496,489,464,422,365,297,221,142,64,-9,-72,-123,-161,-185,-196,-197,-190,-178,-165,-153,-144,-139,-137,-137,-139,-140,-140,-139,-135,-130,-124,-118,-114,-110,-108,-107,-106,-105,-103,-99,-94,-88,-81,-73,-66,-59,-52,-46,-39,-31,-22,-13,-3,8,20,30,40,48,55,60,62,63,62,61,58,55,52,50,47,45,42,40,36,33,29,25,21,18,14,11,8,5,2,-2,-7,-13,-20,-27,-34,-40,-44,-45,-43,-39,-32,-24,-16,-8,-3,1,1,0,-4,-8,-12,-15,-17,-16,-14,-10,-5,0,5,10,15,18,22,26,30,34,38,42,45,48,50,50,50,48,46,43,41,38,35,31,28,25,22,20,18,16,15,14,13,12,10,7,2,-3,-10,-16,-23,-28,-31,-32,-31,-28,-24,-20,-16,-14,-14,-16,-20,-24,-30,-36,-40,-44,-46,-45,-43,-39,-32,-24,-15,-5,6,16,25,33,38,40,39,36,29,21,11,1,-8,-16,-22,-25,-26,-24,-20,-14,-8,-2,4,10,14,17,19,19,20,19,18,17,16,14,12,10,8,5,2,-1,-3,-6,-8,-9,-10,-11,-12,-12,-13,-14,-14,-15,-15,-14,-13,-11,-7,-3,1,6,9,12,14,14,13,11,8,6,4,3,2,3,4,5,6,6,5,4,2,0,-1,-2,-1,0,2,3,3,2,0,-4,-8,-12,-14,-14,-11,-4,5,15,25,33,38,38,35,28,18,8,-2,-9,-13,-14,-12,-7,-2,3,6,6,5,1,-4,-9,-13,-16,-16,-14,-11,-8,-4,-1,1,2,2,2,3,3,5,6,8,8,7,4,-3,-11,-22,-33,-44,-53,-59,-62,-60,-54,-46,-35,-23,-12,-2,6,11,15,16,17,18,20,23,27,33,41,49,56,63,68,70,70,67,62,56,48,39,30,22,14,5,-3,-11,-20,-28,-36,-43,-49,-53,-56,-59,-62,-66,-71,-80,-92,-106,-121,-137,-151,-162,-169,-169,-164,-152,-134,-111,-83,-49,-9,36,87,142,202,262,319,370,410,435,442,431,401,356,298,234,167,104,47,-1,-39,-68,-90,-106,-120,-132,-145,-157,-168,-178,-184,-185,-181,-172,-158,-142,-123,-106,-90,-77,-68,-63,-60,-58,-57,-56,-52,-48,-41,-34,-27,-20,-14,-9,-7,-5,-5,-4,-4,-3,-2,0,2,5,7,8,9,9,9,9,9,10,11,11,11,11,10,8,5,1,-4,-8,-12,-15,-17,-18,-17,-16,-15,-13,-12,-11,-10,-9,-9,-10,-10,-10,-10,-10,-10,-9,-8,-6,-5,-3,-1,1,2,4,6,7,9,11,12,15,17,19,22,24,26,28,29,30,30,29,29,28,26,25,24,22,21,19,17,16,15,13,12,12,12,11,11,11,11,10,9,8,7,5,4,2,1,0,-1,-2,-3,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-4,-5,-6,-6,-6,-6,-5,-5,-5,-5,-6,-8,-10,-13,-15,-17,-18,-18,-17,-15,-12,-10,-8,-7,-7,-8,-10,-12,-14,-15,-15,-14,-12,-10,-8,-6,-4,-4,-4,-4,-5,-6,-6,-6,-5,-5,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,1,1,1,2,2,3,3,4,4,4,5,5,6,6,7,8,8,9,9,10,10,10,10,10,10,10,9,9,8,8,7,6,6,5,4,4,4,4,5,5,6,7,8,9,11,12,13,15,16,18,19,20,20,19,17,15,12,9,6,2,-1,-4,-7,-9,-12,-14,-17,-19,-22,-24,-26,-27,-27,-27,-26,-25,-23,-22,-21,-20,-20,-20,-21,-21,-21,-19,-17,-13,-8,-3,3,9,15,20,25,30,34,37,41,44,47,49,51,52,52,51,49,47,45,43,42,43,44,45,45,44,40,34,25,14,1,-13,-25,-36,-45,-51,-57,-61,-66,-73,-80,-89,-97,-104,-108,-108,-105,-100,-94,-89,-89,-94,-106,-122,-141,-158,-169,-168,-152,-119,-70,-7,65,141,216,284,343,388,421,441,450,448,436,415,385,346,298,242,180,116,53,-5,-56,-96,-125,-144,-154,-158,-159,-160,-161,-165,-170,-176,-181,-184,-183,-179,-171,-160,-148,-136,-124,-113,-104,-96,-89,-82,-76,-69,-63,-56,-50,-43,-37,-30,-22,-15,-7,1,8,14,19,21,22,21,18,16,13,12,11,12,14,16,18,19,19,18,16,13,9,6,3,1,-1,-3,-4,-6,-8,-11,-14,-17,-21,-24,-26,-27,-27,-26,-24,-22,-19,-17,-15,-14,-14,-13,-13,-12,-10,-8,-5,-1,2,6,9,11,13,14,14,15,16,18,21,24,28,31,35,37,38,39,38,36,34,31,29,27,25,24,23,22,21,21,20,19,18,17,17,16,17,17,18,19,20,21,22,22,22,22,21,19,18,15,13,11,8,5,1,-2,-6,-10,-13,-16,-19,-21,-23,-24,-24,-24,-23,-22,-20,-19,-17,-16,-15,-13,-12,-11,-9,-8,-7,-6,-5,-4,-3,-3,-4,-4,-4,-5,-6,-6,-6,-6,-6,-5,-5,-4,-3,-2,-2,-2,-1,-1,-1,-1,0,0,1,2,3,3,4,4,4,3,3,3,2,2,3,3,4,5,6,7,7,7,6,5,4,2,0,-1,-3,-4,-5,-5,-5,-4,-3,-1,1,3,5,7,8,8,8,7,5,3,1,0,-1,-1,-1,-1,0,1,2,2,2,2,1,1,1,1,1,2,2,3,3,3,3,3,3,3,3,2,2,2,1,1,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-4,-5,-6,-7,-8,-9,-9,-10,-9,-9,-9,-10,-10,-11,-12,-13,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-13,-12,-10,-8,-4,-1,3,7,12,15,19,21,23,23,22,21,18,16,14,13,12,13,14,15,15,15,13,11,7,3,-1,-4,-5,-5,-4,-2,-2,-3,-7,-13,-20,-29,-37,-44,-50,-54,-58,-62,-68,-76,-87,-99,-110,-120,-124,-123,-114,-100,-82,-63,-45,-28,-14,0,18,44,82,134,200,275,353,422,473,496,485,437,356,249,129,7,-102,-189,-248,-276,-276,-256,-223,-186,-152,-126,-109,-100,-97,-96,-93,-88,-78,-66,-52,-39,-29,-22,-20,-20,-22,-23,-22,-19,-14,-7,0,6,10,12,12,11,9,8,7,8,10,12,14,15,15,14,12,9,7,5,4,4,4,5,6,6,6,5,4,2,0,-2,-4,-6,-7,-7,-7,-6,-4,-3,-1,2,3,4,5,4,2,0,-3,-6,-9,-12,-14,-15,-16,-16,-16,-15,-14,-14,-13,-13,-13,-12,-12,-11,-11,-10,-9,-9,-8,-7,-7,-6,-6,-5,-4,-4,-4,-3,-3,-3,-3,-2,-1,0,2,4,6,8,10,12,13,14,15,17,18,20,23,25,27,28,29,29,27,25,23,20,17,15,13,11,10,9,8,7,6,4,2,0,-2,-4,-6,-9,-12,-14,-18,-21,-23,-26,-27,-29,-30,-30,-30,-30,-30,-30,-29,-28,-26,-22,-18,-14,-9,-5,-1,1,1,-1,-4,-8,-13,-17,-21,-23,-25,-27,-27,-28,-28,-27,-26,-23,-18,-12,-3,6,16,26,34,40,43,44,41,37,32,25,19,13,8,2,-3,-9,-15,-21,-25,-28,-29,-26,-21,-13,-3,7,16,24,29,31,30,28,24,20,16,14,13,12,12,12,11,9,6,4,2,0,0,1,2,4,4,4,3,1,-1,-2,-2,-1,3,8,12,16,16,14,7,-2,-14,-25,-35,-40,-41,-37,-28,-16,-2,10,21,27,30,29,26,21,17,14,14,15,17,20,23,25,26,25,24,22,21,20,20,21,21,21,21,19,18,16,14,12,12,13,14,16,17,19,20,21,22,23,25,28,32,37,41,45,47,47,45,42,39,35,33,34,36,41,46,52,56,59,58,56,51,45,37,29,21,13,3,-7,-18,-30,-43,-55,-68,-79,-89,-98,-106,-115,-125,-136,-149,-162,-175,-186,-194,-198,-198,-196,-191,-187,-183,-181,-181,-182,-182,-180,-175,-166,-154,-141,-127,-114,-102,-90,-75,-52,-18,32,99,184,282,387,488,575,639,671,668,630,561,469,364,256,154,65,-6,-60,-98,-123,-138,-148,-155,-159,-161,-160,-155,-147,-134,-120,-105,-90,-79,-71,-67,-66,-68,-70,-71,-72,-72,-70,-69,-67,-67,-67,-67,-68,-68,-66,-63,-58,-51,-44,-38,-32,-28,-24,-21,-18,-13,-7,1,10,20,30,39,46,50,51,50,47,44,40,38,37,37,38,39,40,40,40,38,37,35,34,32,32,31,31,31,30,29,27,25,23,21,20,20,21,22,24,27,29,31,33,35,37,40,42,44,47,49,51,52,52,51,48,45,41,38,34,32,30,29,29,29";
          //perfect 2 PFData = "11,13,15,17,18,20,21,21,22,22,22,22,22,22,21,21,20,20,20,19,19,19,19,19,19,19,19,19,18,18,18,18,18,18,18,17,17,16,14,13,12,11,11,10,9,9,8,7,6,5,3,2,0,-1,-2,-3,-4,-5,-7,-9,-12,-15,-18,-21,-23,-25,-25,-26,-25,-24,-23,-22,-21,-21,-20,-20,-20,-19,-19,-17,-16,-14,-12,-11,-10,-9,-9,-8,-8,-8,-8,-7,-6,-5,-4,-4,-3,-2,-2,-1,-1,-1,0,0,1,2,2,3,3,4,4,4,4,5,5,6,7,7,8,9,10,11,12,13,14,15,16,18,19,20,20,21,21,21,21,20,19,19,18,17,17,16,16,15,14,14,13,12,12,11,10,10,9,9,9,8,8,7,7,6,5,5,5,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,-1,-1,-1,-2,-3,-3,-4,-5,-6,-7,-7,-8,-8,-8,-8,-8,-7,-7,-7,-6,-6,-5,-4,-3,-2,-1,0,1,1,2,2,1,1,1,1,1,2,2,2,2,2,2,2,1,2,2,4,6,8,11,13,15,16,16,16,15,14,14,15,18,21,26,31,36,41,46,50,54,58,63,68,75,83,90,98,104,107,108,105,99,91,81,70,61,53,47,43,39,36,31,23,11,-4,-22,-42,-61,-79,-94,-106,-115,-123,-131,-140,-152,-167,-183,-201,-218,-232,-241,-247,-249,-249,-249,-252,-259,-269,-282,-296,-308,-316,-318,-314,-305,-294,-282,-272,-262,-251,-233,-200,-146,-64,50,194,363,545,729,896,1032,1126,1168,1158,1098,996,864,714,559,407,266,139,28,-69,-152,-223,-285,-336,-377,-406,-424,-431,-425,-409,-384,-351,-311,-268,-221,-174,-128,-84,-46,-13,11,28,36,36,31,21,10,-3,-14,-25,-34,-42,-50,-57,-64,-70,-74,-77,-77,-74,-69,-62,-54,-45,-37,-30,-24,-19,-14,-9,-4,0,5,9,12,14,15,14,12,9,6,4,2,1,1,1,1,1,0,0,0,0,1,2,4,6,8,11,13,15,16,17,18,19,20,20,20,21,20,20,19,18,16,15,14,13,12,12,11,10,10,9,9,8,8,8,7,7,7,7,7,7,7,6,6,6,5,5,5,5,4,4,4,3,3,2,2,2,2,2,1,1,1,0,0,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-7,-7,-8,-8,-8,-7,-7,-6,-6,-5,-5,-6,-6,-6,-6,-6,-5,-5,-4,-3,-2,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-1,-1,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,-1,-1,-1,-1,-1,0,0,1,1,0,0,-1,-2,-4,-4,-5,-5,-5,-5,-5,-5,-5,-6,-7,-8,-9,-10,-10,-11,-10,-10,-9,-8,-8,-7,-7,-7,-6,-6,-6,-5,-4,-4,-3,-2,-2,-2,-2,-2,-2,-1,-1,0,1,3,4,5,6,7,7,7,8,8,9,9,10,10,10,9,8,7,6,5,5,6,8,12,16,22,28,34,40,46,52,58,64,69,74,78,82,85,86,86,83,80,74,68,60,53,47,42,39,38,37,35,32,25,12,-7,-32,-63,-98,-135,-170,-201,-227,-245,-258,-265,-271,-275,-282,-292,-304,-317,-330,-340,-347,-350,-349,-348,-348,-351,-355,-359,-355,-337,-296,-223,-114,33,212,414,624,824,996,1125,1199,1213,1171,1079,950,799,639,484,340,211,99,1,-86,-166,-238,-304,-361,-407,-438,-454,-455,-444,-424,-402,-380,-362,-350,-343,-337,-329,-315,-291,-256,-210,-155,-95,-36,18,64,100,123,135,139,136,129,120,110,100,90,80,68,56,42,28,16,4,-4,-10,-12,-12,-10,-6,-2,2,5,8,10,12,13,15,16,17,18,19,18,17,15,13,10,8,6,4,2,1,0,-1,-3,-4,-5,-7,-8,-8,-9,-9,-8,-8,-7,-7,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-5,-5,-4,-4,-4,-4,-4,-4,-4,-4,-3,-3,-2,-2,-2,-1,-1,0,0,1,1,2,3,3,4,4,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,3,2,2,2,1,1,1,0,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-3,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,1,1,2,2,2,3,3,4,4,4,5,5,4,4,4,4,3,3,3,3,2,2,2,1,1,1,0,0,-1,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-7,-7,-7,-7,-7,-7,-6,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-4,-4,-4,-4,-4,-5,-5,-5,-6,-6,-7,-8,-8,-8,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,4,5,7,9,10,12,13,13,14,13,13,13,14,15,17,18,20,21,22,22,22,21,20,19,20,20,21,22,23,21,18,14,9,3,-2,-6,-7,-6,-4,0,2,4,4,2,0,-1,0,5,12,22,33,41,43,38,24,2,-27,-59,-90,-115,-133,-141,-141,-134,-125,-117,-113,-116,-125,-139,-156,-173,-190,-206,-222,-239,-257,-277,-296,-308,-306,-281,-224,-130,3,170,362,562,753,916,1035,1099,1102,1048,944,804,643,478,320,179,59,-39,-118,-182,-234,-278,-314,-344,-367,-380,-384,-380,-367,-350,-330,-312,-297,-286,-279,-277,-277,-277,-277,-275,-270,-264,-256,-247,-236,-224,-211,-195,-178,-160,-141,-120,-100,-79,-59,-38,-16,7,32,59,86,114,139,162,180,193,201,203,200,195,188,180,173,166,159,152,145,137,128,118,108,98,88,80,73,67,61,55,49,42,34,26,17,8,0,-7,-13,-18,-21,-23,-24,-25,-25,-25,-25,-25,-24,-24,-23,-22,-21,-19,-18,-17,-17,-16,-16,-16,-16,-16,-16,-16,-16,-16,-16,-15,-15,-15,-15,-15,-14,-14,-13,-12,-12,-11,-10,-10,-9,-8,-8,-7,-7,-7,-6,-6,-5,-5,-5,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,2,2,3,3,3,4,4,5,5,5,5,5,5,5,5,4,4,3,3,3,2,2,2,2,1,1,0,-1,-2,-3,-4,-5,-5,-6,-8,-9,-10,-11,-12,-14,-15,-15,-16,-16,-15,-15,-14,-13,-11,-10,-9,-8,-8,-7,-6,-5,-4,-2,-1,1,2,4,5,6,8,9,11,12,14,16,18,20,22,23,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,24,24,24,24,24,23,22,21,19,18,16,15,14,13,13,14,15,16,17,18,19,21,22,24,26,29,31,33,33,32,29,24,17,8,-3,-13,-24,-34,-44,-54,-64,-73,-84,-95,-106,-118,-130,-142,-154,-165,-176,-187,-197,-205,-211,-212,-210,-201,-189,-173,-156,-142,-133,-133,-143,-162,-187,-216,-242,-260,-265,-254,-226,-182,-127,-63,5,74,145,217,293,375,465,562,663,759,843,904,932,921,867,774,648,500,342,188,49,-67,-156,-217,-253,-269,-271,-263,-251,-237,-223,-210,-197,-185,-175,-168,-165,-167,-173,-183,-194,-204,-212,-215,-211,-202,-188,-171,-154,-138,-124,-114,-107,-101,-96,-90,-82,-71,-57,-42,-26,-10,4,17,27,35,41,45,48,51,52,53,53,52,50,48,46,43,41,39,37,35,34,32,30,29,27,25,23,21,20,18,16,15,13,11,9,8,6,5,4,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,2,2,1,1,1,1,1,1,1,1,1,1,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-3,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,-1,-1,-1,-1,-1,-2,-2,-2,-2,-3,-3,-3,-3,-3,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,0,0,0,1,2,2,3,4,4,5,6,7,8,10,11,13,14,16,16,17,17,16,15,15,14,13,12,11,10,9,7,5,3,1,0,0,0,1,3,6,8,10,12,12,12,12,12,12,12,13,14,15,15,14,12,8,2,-3,-9,-14,-18,-21,-22,-23,-24,-27,-32,-40,-52,-67,-84,-103,-121,-137,-149,-157,-160,-157,-151,-141,-132,-123,-119,-120,-127,-142,-162,-187,-213,-239,-262,-279,-289,-293,-288,-276,-256,-225,-182,-123,-46,54,176,321,483,654,825,982,1112,1203,1248,1241,1184,1081,943,780,607,433,270,124,-1,-105,-190,-256,-309,-349,-379,-402,-417,-426,-431,-433,-434,-434,-435,-436,-436,-435,-429,-418,-399,-374,-343,-308,-272,-238,-208,-184,-167,-156,-151,-148,-148,-148,-147,-146,-144,-142,-140,-137,-134,-129,-123,-114,-102,-86,-68,-47,-24,1,26,53,79,106,133,159,183,204,222,234,242,243,240,233,223,211,199,187,176,165,155,145,135,123,112,100,89,79,69,61,54,47,41,33,25,16,6,-3,-13,-21,-28,-33,-36,-38,-39,-38,-38,-37,-37,-36,-36,-35,-34,-32,-30,-28,-26,-25,-23,-22,-22,-21,-21,-21,-21,-20,-19,-18,-18,-17,-16,-15,-15,-14,-14,-13,-13,-12,-11,-10,-10,-9,-8,-8,-7,-7,-7,-6,-6,-5,-5,-5,-4,-4,-3,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-2,-3,-3,-4,-4,-4,-5,-5,-6,-7,-9,-10,-11,-12,-13,-12,-12,-11,-9,-8,-7,-7,-6,-6,-5,-3,-1,2,5,7,9,11,10,9,7,5,4,3,4,6,9,12,14,16,15,13,10,7,5,4,6,10,15,21,27,31,34,34,33,32,31,31,33,36,41,45,48,51,51,52,53,55,60,68,77,87,95,99,97,88,72,50,26,0,-23,-43,-58,-71,-80,-90,-100,-112,-126,-141,-156,-169,-180,-190,-201,-216,-236,-266,-304,-352,-405,-459,-509,-548,-572,-576,-558,-516,-450,-361,-248,-113,44,222,414,617,819,1009,1173,1298,1372,1388,1344,1242,1093,908,704,497,301,125,-23,-144,-238,-311,-367,-412,-448,-479,-505,-524,-536,-540,-537,-527,-513,-495,-476,-455,-432,-408,-382,-352,-318,-283,-247,-211,-179,-150,-126,-106,-88,-70,-51,-28,-2,29,61,94,124,150,170,183,190,192,191,187,183,179,175,172,169,165,159,152,143,133,123,112,103,95,87,80,73,66,58,48,38,26,15,4,-6,-15,-22,-28,-32,-34,-35,-36,-36,-35,-35,-34,-33,-32,-30,-28,-27,-25,-23,-21,-20,-19,-18,-17,-17,-16,-16,-15,-14,-14,-12,-11,-10,-9,-9,-8,-7,-7,-7,-6,-6,-5,-5,-4,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-1,-1,-1,-1,-1,-2,-3,-4,-4,-5,-4,-4,-3,-1,0,0,1,1,0,-1,-2,-3,-3,-3,-3,-3,-2,-1,0,1,1,1,1,1,1,1,1,2,2,3,3,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,1,1,1,0,0,0,-1,-1,-1,-2,-2,-3,-3,-4,-5,-5,-6,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-4,-3,-3,-3,-3,-3,-4,-4,-4,-4,-3,-2,-1,0,1,2,2,2,2,2,3,3,3,4,5,5,5,4,3,1,-1,-3,-4,-3,0,5,11,18,26,34,42,49,55,61,67,73,79,85,91,96,99,100,97,92,84,76,67,60,55,53,53,54,55,53,47,35,17,-7,-37,-70,-105,-141,-176,-209,-240,-269,-295,-318,-339,-357,-372,-384,-394,-402,-410,-418,-426,-433,-438,-438,-427,-401,-354,-283,-184,-59,89,256,431,606,769,911,1022,1097,1133,1128,1085,1009,904,779,640,493,345,202,68,-54,-161,-253,-328,-387,-430,-460,-478,-484,-482,-472,-457,-438,-417,-395,-373,-353,-335,-318,-300,-281,-258,-229,-194,-153,-105,-54,-2,48,93,129,156,173,181,181,174,164,151,138,125,113,101,89,77,66,55,45,36,29,25,22,20,19,19,18,16,14,11,8,5,2,1,-1,-1,-2,-3,-4,-6,-7,-9,-11,-12,-13,-13,-13,-13,-13,-13,-13,-13,-14,-14,-13,-13,-12,-11,-10,-9,-8,-7,-6,-5,-5,-4,-3,-3,-2,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,2,2,2,3,3,3,3,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-3,-3,-4,-4,-5,-6,-7,-8,-8,-9,-10,-10,-11,-11,-11,-11,-10,-10,-10,-10,-9,-8,-7,-6,-4,-3,-2,-2,-1,-1,-2,-3,-3,-3,-3,-2,0,2,4,6,8,10,11,11,10,10,10,10,11,12,14,15,16,17,16,14,11,9,7,7,8,11,17,24,31,39,45,51,56,60,65,70,75,82,89,96,101,104,103,99,92,83,73,63,56,51,49,48,48,47,43,35,22,4,-19,-46,-77,-110,-144,-178,-211,-242,-270,-295,-316,-332,-344,-352,-358,-363,-368,-374,-381,-390,-397,-403,-404,-398,-384,-362,-331,-291,-243,-186,-119,-38,59,175,309,461,625,792,951,1088,1190,1246,1250,1199,1097,953,780,592,403,225,67,-66,-174,-258,-322,-371,-406,-432,-449,-458,-460,-455,-444,-431,-417,-403,-391,-380,-368,-353,-330,-298,-255,-202,-141,-77,-14,42,86,117,134,138,133,122,108,94,82,71,62,53,43,31,18,4,-8,-18,-25,-27,-25,-20,-12,-4,3,9,14,18,20,23,26,29,32,36,38,39,39,36,33,28,24,20,16,13,11,10,8,6,4,2,0,-2,-4,-5,-6,-6,-7,-7,-7,-8,-9,-10,-11,-12,-13,-13,-13,-12,-11,-10,-10,-9,-9,-9,-9,-9,-9,-8,-7,-6,-5,-5,-4,-3,-2,-1,-1,0,1,2,3,5,6,7,8,9,10,10,10,10,10,10,9,9,8,8,7,7,7,6,5,5,4,4,3,3,2,2,1,0,0,-1,-1,-2,-3,-3,-4,-5,-5,-5,-6,-6,-6,-5,-5,-5,-5,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-1,-1,0,1,1,2,2,2,2,3,3,3,3,4,4,5,5,5,4,4,3,3,3,3,4,5,6,7,8,8,7,5,2,-1,-4,-7,-10,-12,-14,-16,-19,-22,-26,-30,-33,-36,-37,-36,-33,-28,-22,-15,-8,-2,3,7,10,13,16,20,26,32,39,46,53,58,63,68,72,77,83,90,98,106,113,117,118,114,107,96,82,66,51,36,23,10,-1,-13,-24,-36,-48,-60,-71,-81,-91,-101,-112,-127,-147,-171,-202,-238,-279,-324,-371,-419,-466,-510,-548,-577,-591,-583,-548,-480,-375,-232,-55,149,368,588,791,965,1095,1175,1200,1174,1104,999,871,729,584,442,306,180,64,-42,-138,-221,-292,-349,-391,-420,-436,-443,-444,-441,-438,-436,-432,-427,-417,-400,-375,-340,-299,-253,-207,-164,-128,-101,-82,-71,-64,-59,-52,-40,-24,-3,21,46,70,90,106,116,121,124,123,123,122,122,123,123,124,123,120,116,110,104,96,89,83,77,72,67,62,57,52,45,38,30,21,13,6,-1,-8,-13,-16,-19,-21,-23,-23,-24,-23,-23,-22,-21,-20,-19,-18,-17,-16,-15,-14,-13,-12,-12,-11,-11,-11,-10,-10,-10,-9,-9,-8,-8,-7,-7,-7,-6,-6,-5,-5,-4,-4,-3,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,0,0,0,0,1,1,1,1,2,2,2,3,3,3,3,3,3,2,2,2,1,1,1,1,1,0,0,0,0,-1,-1,-2,-2,-2,-3,-3,-3,-3,-4,-4,-5,-5,-6,-7,-7,-7,-7,-7,-6,-6,-6,-6,-6,-7,-7,-6,-6,-5,-4,-4,-3,-3,-3,-4,-5,-7,-8,-9,-9,-9,-8,-6,-5,-5,-4,-5,-7,-8,-10,-12,-12,-11,-10,-7,-3,0,3,6,7,8,8,7,7,7,8,11,14,18,22,26,31,34,37,40,43,45,48,50,52,54,54,52,49,45,39,33,26,21,17,14,11,9,6,1,-6,-16,-27,-39,-52,-64,-75,-84,-91,-98,-104,-111,-119,-128,-137,-146,-153,-158,-161,-162,-162,-163,-166,-172,-182,-195,-210,-226,-241,-252,-260,-262,-258,-248,-231,-205,-168,-117,-50,36,142,266,404,548,690,819,926,1002,1041,1042,1005,936,840,727,605,479,356,239,129,26,-69,-157,-237,-308,-369,-419,-455,-480,-492,-493,-486,-472,-455,-435,-413,-391,-369,-345,-321,-298,-274,-252,-233,-218,-208,-201,-199,-199,-201,-203,-204,-202,-198,-191,-182,-171,-159,-147,-134,-119,-103,-84,-62,-36,-5,28,64,101,136,168,195,216,230,238,240,237,232,225,217,210,203,196,189,180,170,157,144,129,114,100,88,77,69,62,56,50,43,36,27,17,6,-4,-14,-23,-30,-35,-38,-41,-42,-42,-42,-41,-41,-40,-39,-37,-36,-34,-33,-31,-29,-28,-26,-25,-24,-23,-23,-22,-21,-20,-19,-19,-18,-17,-16,-15,-14,-14,-13,-12,-12,-11,-11,-10,-10,-10,-9,-9,-8,-8,-8,-8,-7,-8,-8,-8,-9,-9,-10,-11,-11,-12,-13,-14,-15,-16,-16,-17,-18,-18,-18,-17,-16,-15,-14,-13,-11,-10,-9,-8,-7,-6,-5,-4,-3,-1,0,2,4,6,8,9,11,13,15,17,19,21,24,26,27,29,29,30,30,29,28,27,26,26,25,25,26,26,26,26,25,24,23,21,20,19,18,17,17,16,16,16,15,14,13,11,9,8,7,8,9,10,13,16,18,21,23,25,27,28,29,29,30,29,28,25,22,18,12,6,0,-6,-11,-16,-20,-24,-29,-34,-40,-48,-57,-69,-82,-95,-108,-120,-131,-140,-147,-153,-158,-162,-167,-173,-178,-183,-187,-189,-189,-187,-184,-183,-186,-195,-211,-237,-269,-305,-339,-366,-377,-367,-329,-263,-167,-46,93,243,394,536,663,768,849,905,938,949,941,917,878,825,758,677,584,478,364,245,127,14,-90,-179,-253,-310,-352,-381,-399,-409,-413,-413,-408,-400,-387,-368,-345,-316,-284,-250,-216,-185,-157,-134,-117,-105,-97,-93,-90,-88,-85,-81,-76,-70,-63,-55,-48,-41,-34,-28,-23,-18,-14,-10,-7,-3,0,3,5,8,10,12,13,15,17,18,20,21,22,23,24,24,25,26,26,27,28,28,29,29,30,30,29,28,27,25,24,22,21,19,18,17,16,15,14,13,11,9,7,5,3,1,-2,-4,-6,-9,-11,-14,-16,-19,-22,-24,-26,-27,-27,-26,-25,-23,-20,-18,-15,-13,-11,-10,-9,-7,-5,-3,0,3,7,11,15,19,22,26,29,32,36,40,44,49,53,58,61,64,65,65,64,62,59,56,53,50,47,44,42,40,37,35,32,29,26,23,20,18,16,13,11,8,6,3,-1,-4,-7,-10,-12,-14,-15,-16,-17,-17,-18,-18,-18,-18,-18,-17,-17,-16,-15,-15,-15,-16,-18,-19,-22,-24,-26,-29,-31,-33,-34,-36,-38,-41,-43,-45,-46,-46,-45,-42,-38,-34,-28,-24,-19,-16,-15,-13,-13,-11,-9,-4,2,11,22,34,47,60,74,87,101,115,131,148,166,183,200,214,224,229,228,222,211,197,181,165,149,134,120,107,92,75,56,35,11,-15,-41,-68,-94,-120,-147,-177,-209,-245,-285,-328,-372,-415,-453,-485,-510,-527,-538,-546,-552,-562,-576,-596,-623,-652,-681,-706,-719,-719,-700,-662,-606,-534,-451,-361,-271,-185,-109,-45,5,40,63,74,78,78";
          //perfect 2 PFData = "17,21,25,28,31,33,34,35,35,35,35,35,35,34,34,33,33,32,32,31,30,30,30,30,30,29,29,29,29,28,28,27,27,26,26,25,24,23,21,20,18,17,15,14,13,11,10,9,8,6,5,3,1,-2,-4,-6,-9,-11,-14,-17,-20,-23,-26,-29,-32,-35,-37,-38,-38,-38,-38,-37,-36,-34,-32,-31,-30,-28,-27,-26,-24,-23,-21,-20,-18,-16,-15,-13,-12,-10,-9,-8,-7,-6,-5,-4,-3,-1,0,2,3,3,3,3,3,2,2,2,2,3,4,5,6,6,6,5,4,1,-1,-4,-6,-9,-11,-13,-16,-19,-22,-26,-29,-33,-35,-35,-34,-30,-25,-19,-12,-5,0,4,7,9,11,14,19,25,32,40,47,54,59,63,65,67,71,77,86,97,110,122,132,137,137,130,117,101,82,64,47,32,18,6,-8,-24,-43,-64,-85,-105,-121,-133,-139,-142,-145,-150,-161,-181,-210,-248,-292,-337,-379,-413,-438,-452,-456,-449,-431,-402,-358,-295,-208,-92,55,229,423,625,818,984,1106,1170,1170,1105,984,820,631,435,250,88,-42,-139,-205,-248,-274,-291,-305,-317,-329,-340,-348,-350,-347,-338,-325,-309,-292,-275,-260,-247,-234,-220,-205,-189,-171,-153,-134,-117,-101,-86,-73,-59,-44,-27,-8,13,34,55,74,89,101,110,114,116,116,115,113,112,110,108,106,104,100,96,91,85,79,74,68,63,58,53,48,43,37,32,26,20,14,8,2,-4,-9,-14,-19,-22,-24,-25,-24,-23,-21,-19,-16,-15,-13,-13,-12,-12,-13,-13,-12,-12,-11,-10,-9,-8,-7,-7,-7,-7,-6,-6,-6,-6,-5,-4,-3,-2,-2,-1,-1,-1,-1,-1,-2,-2,-2,-2,-1,-1,0,0,1,1,1,1,1,1,1,0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-3,-3,-2,-2,-1,0,0,1,2,3,3,4,4,5,5,6,7,7,8,8,8,8,7,6,5,5,5,5,6,7,8,9,10,9,8,7,4,1,-3,-7,-11,-15,-20,-25,-31,-38,-45,-52,-59,-64,-67,-67,-65,-59,-52,-43,-33,-22,-12,-3,6,15,24,33,43,53,63,71,77,82,83,82,80,78,76,76,77,81,85,89,92,91,86,77,65,50,33,17,2,-11,-22,-32,-41,-49,-57,-65,-73,-80,-88,-95,-103,-112,-123,-138,-157,-181,-209,-242,-277,-313,-349,-383,-412,-434,-446,-442,-418,-370,-292,-183,-43,124,311,505,692,858,988,1071,1101,1075,999,881,734,572,408,254,117,2,-90,-162,-218,-260,-292,-317,-336,-350,-357,-360,-358,-352,-345,-337,-330,-323,-318,-311,-302,-289,-272,-250,-225,-198,-171,-147,-127,-111,-99,-89,-79,-66,-50,-29,-3,25,53,80,101,117,126,130,128,125,120,117,117,118,122,125,128,128,125,118,109,98,87,76,68,61,56,53,50,46,42,36,28,19,10,1,-7,-14,-18,-22,-24,-25,-25,-25,-26,-26,-26,-26,-25,-24,-22,-21,-19,-17,-16,-15,-14,-14,-13,-12,-12,-11,-10,-10,-9,-9,-8,-8,-7,-7,-6,-5,-4,-3,-2,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-1,0,0,1,1,1,1,1,1,1,1,2,2,2,3,3,4,4,3,3,3,2,2,2,1,1,1,2,2,2,1,1,1,0,-1,-1,-2,-2,-3,-3,-4,-4,-5,-6,-7,-8,-9,-10,-10,-11,-11,-11,-11,-10,-9,-9,-8,-7,-6,-5,-5,-4,-3,-2,-1,-1,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,1,1,0,0,-1,-2,-3,-3,-4,-5,-6,-7,-8,-9,-9,-9,-9,-9,-8,-7,-5,-4,-2,-1,1,2,4,5,6,7,9,11,13,15,18,21,25,28,31,34,37,39,42,44,46,48,49,50,51,50,49,46,43,39,35,31,28,26,24,24,23,22,20,15,7,-4,-20,-40,-63,-86,-108,-128,-142,-152,-155,-154,-149,-145,-142,-144,-151,-164,-181,-201,-220,-237,-250,-256,-257,-252,-244,-231,-215,-194,-164,-121,-62,19,121,242,379,521,659,779,870,923,933,898,823,716,586,446,307,176,62,-35,-113,-173,-220,-256,-283,-303,-317,-325,-328,-326,-320,-312,-304,-297,-293,-292,-295,-299,-302,-304,-301,-292,-278,-259,-237,-212,-188,-165,-145,-127,-111,-97,-83,-67,-49,-28,-4,22,49,76,102,125,144,158,168,174,176,174,171,167,162,157,151,145,139,133,125,117,108,99,90,82,74,67,61,55,49,42,34,26,17,8,0,-8,-15,-21,-25,-29,-31,-33,-34,-34,-34,-33,-31,-29,-27,-25,-23,-21,-20,-19,-20,-20,-20,-21,-20,-19,-17,-15,-13,-11,-9,-8,-8,-8,-9,-9,-9,-9,-8,-7,-6,-5,-4,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-1,-1,0,0,0,-1,-1,0,0,0,1,1,1,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-3,-3,-4,-4,-3,-2,-2,-1,0,0,0,-1,-2,-3,-5,-6,-6,-6,-5,-4,-2,-1,-1,-1,-1,-3,-4,-6,-7,-8,-8,-7,-5,-3,-1,2,4,6,8,9,10,11,11,11,12,12,12,12,12,12,12,12,11,11,11,10,10,9,9,9,9,9,11,12,15,17,20,22,24,24,24,23,22,21,20,20,20,20,20,18,16,12,7,3,-1,-2,-2,0,4,6,6,1,-10,-27,-50,-77,-103,-127,-145,-156,-159,-156,-149,-141,-135,-134,-139,-149,-162,-175,-186,-193,-194,-192,-188,-184,-181,-178,-171,-156,-124,-68,18,135,281,448,622,788,927,1025,1068,1054,982,861,705,530,353,189,47,-67,-153,-214,-256,-286,-309,-329,-348,-365,-378,-385,-385,-377,-363,-345,-325,-306,-291,-280,-275,-272,-271,-270,-267,-260,-250,-237,-222,-206,-191,-177,-164,-151,-139,-126,-111,-93,-71,-46,-17,15,48,82,114,144,169,188,201,208,209,205,197,187,176,166,157,150,144,140,136,132,127,121,114,107,99,90,81,72,64,55,46,37,27,17,7,-2,-11,-19,-26,-31,-35,-37,-38,-39,-38,-38,-37,-36,-34,-33,-31,-30,-28,-26,-25,-23,-21,-20,-19,-18,-17,-16,-16,-15,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-6,-5,-5,-5,-4,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-2,-2,-2,-1,-1,-1,-1,-2,-2,-2,-3,-3,-3,-2,-2,-1,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,1,3,6,10,14,19,23,26,27,27,27,26,26,27,30,33,37,41,44,45,43,41,38,36,36,39,44,51,57,61,60,52,37,16,-9,-36,-60,-80,-93,-101,-102,-102,-101,-103,-110,-121,-137,-156,-175,-193,-210,-227,-244,-264,-289,-318,-348,-374,-391,-389,-362,-304,-214,-94,51,210,371,524,656,761,834,874,883,865,824,766,693,607,511,406,293,177,62,-47,-145,-226,-288,-329,-350,-355,-348,-335,-321,-310,-304,-303,-307,-313,-319,-323,-324,-320,-312,-301,-287,-272,-255,-238,-220,-201,-182,-161,-141,-120,-100,-81,-62,-43,-24,-4,18,42,67,93,117,139,158,171,180,183,183,179,173,166,158,151,145,138,132,125,117,109,101,93,85,78,71,64,58,51,44,36,27,17,8,-2,-10,-17,-22,-26,-28,-30,-30,-31,-31,-31,-31,-31,-30,-29,-28,-26,-24,-22,-20,-19,-17,-16,-16,-15,-15,-15,-14,-13,-12,-11,-10,-9,-8,-7,-6,-6,-6,-5,-5,-4,-4,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-4,-4,-4,-5,-5,-5,-6,-6,-6,-6,-6,-6,-5,-5,-4,-4,-3,-3,-3,-3,-2,-2,-2,-1,0,1,2,3,4,5,6,7,9,10,11,13,14,16,17,18,18,18,18,17,16,15,13,12,11,10,9,9,8,7,5,4,2,0,-1,-3,-5,-7,-9,-10,-13,-15,-18,-21,-23,-26,-28,-30,-30,-30,-30,-29,-28,-26,-25,-23,-21,-20,-18,-16,-14,-11,-9,-7,-5,-4,-3,-3,-3,-2,-2,-1,0,1,3,4,5,5,6,6,7,8,10,13,16,19,22,24,24,24,23,22,21,21,22,25,29,33,37,41,44,47,50,53,57,63,70,78,84,89,91,88,81,69,55,39,23,8,-5,-16,-25,-33,-41,-50,-59,-69,-80,-90,-99,-108,-118,-129,-143,-161,-186,-218,-256,-299,-347,-396,-443,-485,-517,-536,-536,-513,-462,-380,-266,-120,54,249,453,655,839,992,1102,1161,1167,1120,1028,900,749,587,426,275,140,23,-76,-157,-224,-278,-321,-355,-380,-397,-407,-410,-407,-400,-390,-378,-365,-352,-336,-319,-300,-278,-254,-229,-204,-181,-160,-142,-126,-112,-99,-85,-69,-50,-28,-3,22,46,68,87,102,112,119,123,125,126,126,126,125,124,122,119,115,110,104,98,91,85,80,74,69,64,59,53,46,40,32,25,17,10,3,-4,-10,-15,-19,-23,-25,-27,-28,-27,-26,-25,-24,-22,-21,-20,-19,-18,-18,-17,-16,-15,-13,-12,-10,-8,-7,-7,-7,-8,-9,-10,-10,-10,-8,-6,-3,-1,2,4,4,4,3,1,-1,-3,-4,-4,-4,-3,-1,0,1,2,2,2,1,0,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,1,2,3,3,4,4,5,5,4,4,4,4,5,5,6,7,8,8,8,7,5,4,3,2,1,1,1,2,3,4,4,3,2,-1,-3,-7,-10,-13,-16,-19,-21,-24,-26,-27,-28,-29,-29,-27,-24,-20,-16,-10,-5,-1,3,5,6,6,5,5,7,10,15,22,31,39,47,52,55,53,47,37,25,11,-3,-16,-26,-34,-38,-40,-41,-39,-38,-36,-34,-33,-31,-29,-26,-22,-17,-12,-7,-3,0,2,3,3,3,4,6,9,13,17,22,27,30,32,33,33,32,31,30,30,30,29,28,24,19,12,4,-3,-9,-13,-14,-11,-6,1,8,15,21,27,32,39,47,58,72,86,100,110,116,114,105,90,71,50,30,13,1,-8,-15,-22,-32,-46,-65,-87,-109,-129,-145,-155,-161,-164,-170,-183,-206,-241,-288,-341,-396,-445,-480,-497,-494,-471,-429,-375,-311,-240,-162,-74,26,142,277,428,589,751,900,1020,1098,1125,1096,1014,887,729,555,382,221,83,-29,-117,-183,-234,-276,-314,-349,-381,-409,-431,-444,-446,-437,-419,-394,-365,-333,-302,-271,-241,-213,-185,-158,-133,-110,-90,-73,-60,-50,-41,-32,-22,-10,5,22,41,58,73,85,92,96,97,95,93,91,90,91,91,92,92,91,88,83,78,71,66,60,56,53,49,46,42,38,32,25,18,11,5,-1,-6,-10,-13,-15,-16,-17,-18,-18,-18,-18,-17,-17,-16,-15,-14,-13,-12,-11,-10,-10,-9,-9,-9,-8,-8,-8,-8,-7,-7,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-1,-1,-1,-1,-1,0,0,0,0,1,1,1,1,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,2,2,2,2,1,1,1,1,1,1,0,0,-1,-2,-2,-3,-3,-4,-4,-4,-5,-6,-6,-7,-8,-8,-8,-8,-8,-8,-7,-7,-6,-6,-6,-6,-6,-6,-6,-6,-6,-5,-4,-3,-2,-1,0,1,2,4,6,8,10,12,15,17,18,19,19,19,18,16,14,12,9,7,4,1,-2,-4,-7,-9,-12,-13,-15,-16,-16,-15,-13,-11,-8,-5,-3,-1,0,1,1,2,2,3,6,9,12,16,20,23,25,26,27,26,26,26,27,28,29,30,29,27,22,15,7,-2,-9,-15,-18,-19,-18,-18,-18,-20,-26,-36,-48,-62,-78,-93,-107,-120,-133,-145,-157,-170,-182,-193,-200,-203,-202,-195,-186,-176,-169,-165,-166,-170,-173,-167,-144,-99,-24,81,214,367,529,685,819,919,975,983,943,862,751,620,481,346,220,108,11,-72,-142,-202,-253,-294,-327,-350,-363,-366,-362,-352,-339,-327,-317,-311,-309,-309,-309,-308,-304,-296,-284,-270,-255,-240,-228,-217,-209,-203,-196,-189,-178,-165,-149,-131,-112,-93,-74,-57,-40,-23,-5,15,37,60,86,112,136,159,178,192,202,206,207,204,199,192,185,177,169,160,151,142,133,123,113,103,94,86,78,71,63,56,49,41,32,23,13,4,-5,-14,-21,-27,-31,-34,-36,-37,-37,-37,-37,-36,-35,-34,-32,-31,-29,-27,-25,-24,-22,-21,-20,-19,-18,-18,-17,-16,-15,-14,-13,-12,-11,-11,-10,-9,-9,-8,-7,-6,-5,-4,-4,-4,-3,-4,-4,-4,-4,-4,-3,-2,-2,-1,-1,-1,-1,-2,-2,-3,-3,-3,-2,-1,0,1,2,1,0,-1,-3,-5,-6,-6,-5,-4,-1,1,3,5,5,4,3,0,-2,-4,-5,-5,-5,-3,-2,0,2,2,3,2,2,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,-1,-1,-2,-3,-4,-5,-5,-6,-7,-8,-8,-9,-10,-11,-12,-12,-12,-11,-10,-9,-7,-6,-4,-3,-1,0,1,3,4,6,7,9,10,11,12,13,13,14,15,16,17,18,20,21,22,22,23,23,23,23,23,22,21,20,18,17,14,11,8,5,1,-2,-5,-8,-10,-11,-12,-13,-14,-14,-13,-12,-10,-6,-2,4,10,14,16,13,5,-10,-31,-57,-86,-115,-142,-164,-181,-191,-196,-198,-202,-208,-220,-237,-257,-277,-290,-292,-276,-238,-176,-92,12,128,250,370,480,576,653,709,743,757,751,726,684,625,552,466,370,267,162,61,-32,-113,-179,-229,-263,-285,-297,-303,-306,-307,-309,-311,-313,-312,-309,-302,-292,-280,-266,-252,-240,-230,-222,-217,-213,-208,-203,-197,-188,-177,-165,-152,-138,-125,-112,-99,-87,-74,-61,-46,-28,-9,12,34,58,82,105,126,144,159,171,178,181,181,178,173,166,159,152,145,138,131,125,118,110,103,94,86,78,70,63,56,49,43,36,29,22,13,5,-3,-11,-18,-24,-28,-31,-33,-33,-33,-32,-31,-30,-30,-29,-28,-27,-25,-23,-21,-19,-17,-15,-13,-12,-11,-11,-10,-9,-7,-5,-2,0,3,5,6,7,7,6,6,5,4,4,4,4,4,5,5,5,4,3,1,0,-2,-4,-5,-6,-6,-7,-8,-9,-11,-13,-15,-18,-20,-22,-23,-24,-25,-24,-24,-23,-22,-21,-20,-19,-19,-18,-17,-16,-15,-14,-12,-11,-9,-7,-6,-5,-4,-3,-2,-2,-1,0,0,1,3,4,5,6,7,8,8,9,9,10,10,11,12,14,15,16,17,18,18,18,18,18,17,16,14,12,10,8,5,3,0,-2,-5,-7,-9,-11,-12,-13,-13,-13,-12,-11,-10,-8,-7,-5,-3,-2,0,2,3,5,6,6,6,6,5,4,3,2,0,-1,-2,-4,-5,-7,-8,-8,-8,-7,-5,-1,4,10,16,22,27,32,36,40,43,47,51,55,59,62,64,64,62,57,51,44,38,33,30,29,30,31,30,27,19,8,-7,-23,-38,-50,-59,-62,-62,-59,-57,-57,-61,-69,-80,-92,-103,-110,-114,-113,-112,-113,-121,-140,-171,-215,-267,-321,-372,-410,-430,-426,-398,-346,-272,-181,-78,34,152,274,399,524,646,760,858,932,973,977,938,859,744,602,446,287,138,8,-99,-181,-239,-280,-309,-331,-351,-371,-390,-408,-422,-431,-431,-425,-411,-391,-368,-342,-316,-289,-263,-237,-211,-184,-158,-134,-111,-90,-73,-57,-43,-28,-13,5,26,48,72,95,115,132,144,151,153,152,148,144,139,135,132,129,126,122,117,111,104,96,88,80,73,67,61,56,50,44,37,29,20,11,3,-5,-12,-18,-22,-25,-27,-29,-29,-29,-29,-28,-27,-26,-24,-23,-22,-20,-19,-18,-17,-16,-15,-15,-14,-13,-13,-12,-11,-11,-10,-9,-9,-8,-7,-6,-6,-5,-4,-4,-4,-4,-4,-4,-4,-3,-3,-2,-1,0,0,0,-1,-2,-3,-4,-5,-5,-4,-3,-2,0,2,3,3,3,1,0,-2,-3,-5,-5,-5,-4,-3,-2,-1,0,1,1,0,0,-1,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-3,-3,-3,-3,-3,-3,-4,-4,-4,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-3,-3,-3,-3,-4,-4,-5,-7,-8,-10,-12,-14,-15,-16,-16,-15,-13,-11,-8,-6,-4,-2,-1,0,0,-1,-3,-4,-5,-4,-3,0,5,11,19,27,34,42,49,56,63,70,79,88,98,109,117,123,124,120,110,96,79,61,45,32,24,20,19,19,17,11,0,-18,-40,-66,-92,-118,-142,-166,-190,-219,-254,-298,-351,-410,-470,-525,-567,-590,-586,-556,-500,-422,-328,-226,-122,-20,78,173,269,368,472,581,692,798,889,954,985,975,922,828,700,549,389,230,85,-40,-140,-216,-269,-306,-331,-348,-361,-372,-379,-383,-380,-371,-355,-332,-304,-273,-242,-213,-187,-167,-152,-140,-131,-123,-114,-102,-87,-68,-47,-23,0,23,42,58,69,75,78,78,77,75,75,76,78,81,84,86,86,83,78,72,64,56,49,44,40,37,35,34,32,28,24,19,13,7,1,-3,-7,-10,-12,-14,-15,-16,-16,-17,-16,-16,-15,-15,-14,-13,-13,-13,-12,-12,-11,-10,-8,-6,-4,-3,-2,-2,-3,-4,-6,-7,-8,-7,-6,-3,0,4,7,9,10,9,7,4,1,-1,-2,-3,-2,-1,1,3,4,4,4,3,2,1,0,0,0,0,0,1,1,1,1,0,0,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,2,2,2,2,2,3,3,3,4,4,4,5,5,5,5,4,4,4,3,3,3,3,3,2,2,2,2,1,1,0,0,-1,-1,-2,-2,-3,-3,-4,-5,-6,-7,-7,-8,-9,-9,-9,-9,-9,-8,-8,-8,-7,-7,-7,-7,-6,-6,-5,-5,-4,-4,-4,-3,-3,-4,-4,-4,-3,-3,-2,0,1,2,3,3,4,4,4,4,4,5,6,7,7,7,6,5,3,1,-1,-1,0,3,7,13,19,26,32,37,43,47,52,58,64,71,77,83,87,89,88,84,78,71,63,56,51,48,46,45,43,38,31,21,7,-9,-27,-46,-66,-87,-108,-132,-157,-185,-213,-240,-265,-286,-302,-313,-319,-325,-330,-339,-353,-370,-388,-404,-410,-402,-374,-323,-250,-157,-48,69,189,306,415,515,606,687,758,818,865,894,900,878,825,741,627,492,344,195,54,-69,-168,-242,-292,-322,-338,-346,-351,-355,-359,-363,-365,-364,-357,-347,-332,-315,-297,-279,-261,-243,-222,-197,-166,-130,-88,-43,2,44,79,106,123,131,130,124,115,104,93,82,73,64,55,46,38,31,25,21,19,20,22,26,31,36,40,44,47,51,55,59,63,67,70,72,72,70,67,62,56,50,44,39,35,31,27,23,18,13,7,2,-3,-7,-12,-15,-20,-25,-31,-38,-46,-55,-63,-71,-77,-82,-84,-84,-82,-79,-76,-73,-70,-68,-66,-65,-63,-61,-58,-54,-49,-44,-38,-33,-28,-23,-19,-15,-11,-8,-3,2,8,14,21,28,34,38,42,44,45,44,42,40,38,37,35,34,34,33,32,29,27,23,19,15,11,7,3,-1,-5,-9,-15,-22,-30,-39,-48,-56,-64,-69,-73,-74,-73,-70,-66,-62,-58,-54,-51,-47,-44,-41,-38,-34,-30,-26,-21,-17,-12,-8,-4,-1,3,6,9,13,16,20,24,28";
          //corrected PFData = "18,17,17,16,16,16,17,18,21,24,27,31,33,34,34,32,28,22,17,11,7,4,3,5,8,13,17,22,26,30,31,32,32,31,30,29,28,27,27,26,25,23,21,20,18,16,14,13,13,13,13,14,15,17,18,20,22,24,26,27,28,28,27,25,23,21,19,18,18,19,21,24,27,29,31,32,32,32,31,30,29,30,31,33,34,35,33,29,23,14,4,-7,-17,-25,-31,-35,-37,-37,-38,-39,-41,-45,-51,-56,-61,-65,-66,-65,-62,-58,-55,-54,-56,-59,-65,-71,-75,-75,-69,-56,-35,-6,31,74,123,176,232,291,350,408,461,504,535,549,541,512,460,389,303,209,114,25,-52,-113,-156,-182,-195,-199,-197,-194,-191,-190,-190,-190,-187,-179,-166,-148,-126,-101,-78,-57,-41,-31,-26,-26,-29,-32,-35,-37,-36,-35,-32,-31,-30,-32,-35,-38,-42,-45,-46,-44,-39,-31,-21,-10,1,12,22,31,38,45,51,56,61,65,68,69,70,69,66,64,60,57,53,51,48,46,44,42,39,37,33,30,27,24,21,19,17,15,12,9,7,3,0,-2,-5,-6,-6,-6,-4,-2,0,3,5,7,9,11,12,14,16,19,22,25,28,31,34,37,39,42,44,47,51,54,58,62,66,69,71,72,72,71,70,68,65,63,61,58,56,54,51,48,45,41,38,35,32,30,28,27,25,23,21,18,14,9,3,-3,-8,-13,-17,-19,-20,-20,-18,-17,-15,-13,-11,-10,-8,-7,-6,-4,-3,-1,1,4,6,7,9,10,11,12,13,13,14,15,17,18,20,21,22,24,25,25,26,26,27,27,27,27,27,27,27,27,27,27,28,28,29,29,30,31,32,32,33,34,35,37,38,39,40,41,41,42,41,41,40,39,38,37,36,35,34,34,33,32,31,30,29,27,26,25,24,22,21,20,19,17,16,14,13,11,10,8,7,7,6,6,7,7,8,8,9,10,10,11,12,12,13,13,14,15,16,17,18,18,19,20,21,21,22,23,24,24,25,26,27,27,27,28,28,27,27,26,26,25,25,24,24,24,24,24,23,23,22,21,20,19,18,17,16,15,14,13,11,10,9,7,7,6,7,8,10,12,14,16,18,19,19,18,16,14,13,12,12,13,16,20,24,29,34,40,45,49,54,58,62,65,69,72,74,75,76,75,74,71,68,64,60,55,51,46,41,36,30,24,17,8,-2,-12,-24,-36,-48,-59,-71,-82,-92,-102,-112,-121,-129,-136,-140,-142,-138,-129,-115,-94,-70,-44,-17,6,26,40,49,56,64,77,100,135,184,247,320,396,470,531,573,589,577,536,471,386,290,192,98,16,-51,-101,-136,-157,-169,-174,-176,-177,-178,-179,-179,-178,-175,-170,-164,-156,-149,-142,-135,-129,-123,-115,-105,-93,-78,-60,-41,-21,-2,15,28,38,44,47,47,46,44,41,38,35,32,29,26,22,18,15,12,10,8,8,9,10,13,15,18,21,23,26,28,30,32,33,34,35,34,34,32,30,27,24,21,17,13,9,5,1,-3,-5,-7,-7,-6,-4,-1,3,8,14,19,25,31,36,42,48,54,60,65,68,71,72,71,69,67,64,61,59,57,56,56,55,54,52,50,46,42,39,35,33,33,33,35,38,41,43,44,44,42,39,35,32,29,26,25,25,26,27,29,30,30,30,29,27,26,25,24,23,22,22,22,21,21,20,18,17,15,14,12,11,10,9,9,9,9,9,9,10,10,11,11,12,13,14,15,16,17,18,19,19,20,20,21,21,22,23,24,25,27,28,28,29,29,29,29,29,30,31,32,33,34,35,34,33,31,28,26,24,23,24,26,28,32,35,37,38,37,35,32,29,26,23,23,23,25,27,30,32,33,33,32,31,29,27,26,25,26,27,28,29,30,30,29,28,26,24,22,21,21,22,24,25,27,29,30,30,29,27,25,24,22,21,20,20,21,22,23,24,24,25,24,24,23,22,22,21,21,21,21,21,20,20,19,18,17,16,15,14,14,13,13,14,14,14,15,15,16,17,18,19,21,22,24,26,28,30,31,32,32,33,33,33,33,33,34,34,35,36,37,38,39,40,41,43,44,46,47,49,51,52,53,53,53,51,49,46,42,39,35,30,26,21,16,11,5,-2,-8,-15,-22,-28,-34,-39,-43,-47,-51,-55,-60,-65,-70,-75,-80,-83,-85,-86,-87,-87,-88,-90,-91,-92,-92,-89,-82,-71,-55,-35,-12,14,41,68,98,130,166,208,257,312,371,430,484,526,549,548,521,468,391,298,195,93,-2,-81,-142,-184,-207,-216,-214,-208,-199,-190,-183,-175,-166,-153,-136,-114,-87,-59,-30,-4,17,32,42,45,44,40,34,27,21,15,9,4,-2,-7,-12,-17,-20,-21,-21,-20,-17,-13,-9,-6,-2,0,2,4,6,9,12,15,19,22,25,28,29,29,29,28,26,25,24,24,24,24,25,26,27,27,28,29,30,31,33,35,37,39,41,44,46,49,50,52,53,54,54,54,54,53,52,51,50,49,48,47,46,45,44,43,43,42,41,40,38,37,35,34,33,32,32,32,32,33,34,34,34,34,33,32,31,30,29,28,28,28,28,27,27,26,25,24,22,21,20,19,19,20,20,20,18,16,13,10,7,4,2,1,2,4,6,9,11,12,13,12,10,8,6,5,6,7,9,11,14,16,18,19,19,18,18,17,17,18,18,20,21,22,23,23,24,24,23,23,24,24,24,25,26,26,26,26,26,26,26,26,26,26,27,27,28,28,29,29,30,30,30,31,31,32,32,33,33,34,34,34,33,33,33,33,32,32,32,31,31,31,31,31,30,30,30,29,29,28,28,27,27,27,27,27,27,27,26,26,25,25,24,24,24,24,24,25,26,26,27,27,27,27,27,27,27,27,28,28,29,30,30,31,31,31,31,31,32,32,33,34,35,35,35,35,33,32,31,30,30,30,31,32,33,34,34,33,31,29,25,22,20,18,17,18,19,20,21,22,21,20,18,15,12,11,10,11,12,15,18,20,21,21,19,16,13,11,10,10,13,18,24,31,38,45,50,54,57,60,63,67,72,79,86,93,99,103,104,103,98,90,82,73,64,56,49,44,38,32,26,19,11,2,-7,-17,-28,-41,-54,-69,-85,-101,-117,-132,-142,-148,-148,-144,-135,-125,-116,-109,-107,-110,-118,-128,-136,-139,-133,-115,-83,-36,23,94,172,255,338,419,494,561,615,653,673,671,645,594,519,424,314,197,81,-27,-119,-190,-239,-265,-272,-264,-245,-222,-197,-174,-154,-137,-123,-111,-100,-90,-82,-74,-68,-64,-62,-61,-59,-57,-53,-48,-40,-31,-20,-10,-1,7,13,18,22,24,25,26,26,26,25,24,23,24,25,27,31,35,39,43,45,44,42,38,33,27,23,21,21,23,27,30,33,33,32,27,21,14,6,1,-3,-3,-1,3,9,16,23,30,35,40,43,45,47,47,48,48,48,47,47,48,49,50,53,56,59,62,64,65,65,63,61,58,55,53,51,50,49,49,48,48,47,45,43,41,39,37,36,34,33,31,29,26,22,18,14,11,9,9,9,12,15,20,24,27,30,31,31,30,28,26,24,22,21,20,20,20,21,23,24,26,28,29,31,32,33,34,35,35,35,35,35,35,35,35,35,36,36,36,36,36,36,35,35,34,34,34,33,33,33,33,33,33,33,32,32,32,31,31,31,31,31,31,31,30,30,30,31,31,31,31,31,31,31,31,31,31,31,31,31,32,32,32,32,32,32,32,32,31,31,31,31,32,32,33,33,33,33,33,33,33,32,32,32,32,33,33,33,33,33,33,33,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,35,35,35,35,35,35,35,35,35,35,35,35,36,36,36,35,35,35,34,34,34,34,34,34,34,34,34,34,33,32,31,30,29,29,28,28,28,27,26,25,24,23,23,22,22,23,23,24,25,24,23,21,19,15,12,9,8,7,9,12,16,21,25,29,32,34,36,37,39,42,46,52,60,68,75,79,79,75,67,54,38,23,9,-1,-6,-6,-1,7,15,20,20,14,1,-16,-37,-57,-75,-89,-98,-102,-103,-102,-102,-101,-101,-98,-88,-69,-37,11,76,154,240,328,410,477,524,545,540,510,459,393,317,238,161,91,28,-26,-70,-106,-134,-153,-165,-169,-166,-156,-141,-122,-104,-86,-72,-63,-60,-61,-65,-71,-76,-79,-78,-73,-64,-52,-39,-25,-12,-2,7,12,16,18,19,19,20,22,24,26,29,32,34,37,38,40,41,42,42,43,43,44,45,45,46,46,45,45,44,43,42,42,42,42,42,42,41,39,37,33,29,24,19,15,12,10,9,10,12,14,16,17,18,18,18,18,18,18,19,20,22,25,27,30,33,35,36,38,40,41,43,46,48,51,55,58,61,63,65,67,68,68,68,68,67,66,65,64,62,61,60,58,57,56,54,53,52,50,49,48,47,46,45,45,44,44,43,43,42,41,40,39,38,36,35,35,34,33,33,32,32,32,31,31,30,29,29,28,27,26,25,24,23,22,21,19,18,16,14,13,11,10,8,8,7,7,7,7,8,9,9,10,11,12,13,14,15,16,17,18,19,19,20,20,20,21,22,23,23,24,25,26,26,26,27,27,27,28,28,29,29,30,30,29,29,29,29,30,31,33,34,35,35,34,33,30,28,27,26,28,31,36,41,46,50,51,50,46,40,34,27,23,21,22,26,32,39,45,49,51,50,47,42,36,32,29,27,28,30,32,35,37,38,38,36,35,33,32,31,32,32,33,34,34,34,34,33,32,31,30,30,30,30,31,31,31,31,30,29,28,27,26,26,26,26,26,26,26,26,26,25,25,24,24,24,24,24,25,25,25,25,25,24,23,23,22,21,21,22,24,27,31,36,41,47,52,56,61,65,68,72,75,79,81,83,83,82,79,75,70,64,59,55,53,53,53,54,54,52,47,37,24,7,-13,-33,-53,-72,-90,-105,-119,-132,-144,-155,-166,-176,-183,-187,-186,-181,-172,-159,-143,-125,-104,-81,-51,-14,33,94,170,259,359,464,567,657,727,769,777,748,684,590,474,346,214,90,-20,-110,-178,-223,-248,-256,-250,-235,-215,-191,-166,-140,-115,-92,-69,-49,-32,-17,-7,0,4,5,3,0,-3,-7,-12,-16,-20,-25,-31,-37,-43,-50,-55,-59,-61,-61,-59,-55,-49,-44,-39,-35,-33,-32,-32,-33,-33,-33,-31,-27,-22,-15,-7,0,7,13,18,21,23,24,24,24,23,22,19,16,12,8,3,-2,-6,-9,-10,-10,-9,-6,-3,0,2,4,5,5,5,5,5,6,7,10,13,16,20,23,27,29,32,33,34,35,36,37,37,38,38,38,38,37,37,36,35,34,33,32,32,32,33,34,36,37,39,40,41,42,42,43,43,44,45,47,49,51,53,53,53,52,50,47,44,41,38,36,35,34,33,32,31,30,29,27,25,23,20,18,16,13,10,7,4,0,-3,-5,-6,-7,-6,-4,-2,1,2,4,4,3,2,1,0,1,3,6,10,15,19,23,25,26,26,25,24,23,24,25,28,31,35,39,41,42,42,41,39,37,35,35,36,38,40,43,45,45,44,42,39,35,32,30,30,31,34,36,38,39,38,36,32,28,26,24,25,27,31,36,41,44,45,43,40,35,31,27,25,26,28,33,38,44,48,50,50,49,47,44,42,41,42,44,47,50,53,55,55,54,53,51,49,48,49,50,52,55,58,60,61,61,60,58,57,56,55,55,56,58,60,63,65,67,68,69,69,70,70,71,71,72,72,73,73,72,72,72,72,72,72,73,74,75,75,76,76,75,74,72,69,66,61,56,50,44,37,30,23,17,12,8,6,7,9,14,21,29,39,49,60,72,83,93,101,109,114,118,120,120,119,117,115,112,109,106,102,98,92,87,80,74,67,61,55,49,42,35,26,15,3,-10,-23,-35,-45,-52,-57,-59,-60,-62,-65,-71,-79,-88,-97,-104,-106,-101,-89,-70,-46,-18,12,42,72,103,136,175,222,279,345,415,485,548,594,617,611,574,508,420,317,210,108,21,-47,-92,-116,-124,-120,-110,-100,-94,-92,-95,-100,-106,-110,-111,-109,-103,-97,-90,-84,-81,-79,-78,-77,-74,-69,-61,-51,-40,-28,-16,-7,0,5,8,10,11,13,16,19,24,28,32,36,39,41,43,44,46,47,49,50,51,52,52,52,51,51,50,50,50,51,53,55,57,59,60,61,62,61,60,57,53,49,44,39,35,33,32,33,37,41,47,53,58,62,64,65,64,62,61,60,60,60,61,62,63,62,60,57,55,53,53,55,59,65,71,77,81,83,81,75,68,60,52,46,43,44,48,54,61,67,71,72,70,65,58,50,44,39,37,37,40,44,48,51,52,51,48,43,36,30,24,21,19,21,24,28,32,36,37,37,34,29,24,19,17,17,20,26,34,42,50,55,56,55,50,43,35,28,23,22,23,27,32,38,43,47,49,48,46,44,41,39,38,38,38,38,38,38,38,37,37,38,39,41,44,47,49,51,52,52,52,50,49,48,46,45,45,44,43,41,40,40,40,41,43,45,47,50,51,51,49,46,43,39,36,34,34,35,37,40,43,44,45,44,42,39,37,36,35,36,37,39,41,42,42,40,38,35,31,29,27,26,26,28,31,34,37,39,41,42,42,41,40,38,37,37,37,39,41,45,48,51,54,54,52,47,40,31,21,11,2,-6,-11,-14,-15,-13,-11,-9,-6,-4,-2,-1,1,4,8,13,19,25,32,38,43,47,50,51,52,53,52,52,51,50,48,46,44,41,39,37,36,36,37,39,42,46,50,54,59,64,69,75,81,87,92,97,100,102,102,100,97,92,87,82,77,73,71,69,68,68,67,65,61,56,47,36,22,5,-14,-34,-54,-73,-91,-108,-123,-136,-147,-158,-167,-174,-181,-184,-185,-181,-171,-156,-133,-102,-64,-18,35,96,162,233,306,380,449,511,560,593,605,593,558,500,422,330,228,126,28,-59,-131,-185,-222,-241,-247,-241,-229,-212,-193,-173,-153,-134,-114,-95,-77,-59,-42,-28,-17,-9,-4,-2,-1,0,2,6,13,22,31,41,49,54,55,54,49,43,37,33,32,34,40,48,57,65,72,75,74,70,64,57,50,45,42,42,43,46,49,51,51,50,46,42,37,32,28,27,26,28,32,36,41,46,50,53,54,53,51,48,44,39,35,32,31,31,32,34,37,39,41,41,39,36,33,30,27,27,28,31,35,40,45,49,51,51,50,48,45,43,41,40,41,43,45,48,51,54,56,58,60,61,61,60,59,56,52,47,41,35,30,25,21,19,18,19,21,23,26,28,30,31,31,32,32,32,33,34,35,36,37,39,39,40,39,39,38,38,37,37,38,38,39,40,41,42,42,42,42,41,40,40,39,39,40,41,42,43,43,44,43,43,41,40,38,37,36,35,34,33,32,32,31,31,30,31,31,33,35,38,41,43,46,47,47,47,45,43,40,38,35,33,32,32,32,33,34,35,36,37,37,38,38,38,38,39,39,39,39,39,39,39,39,40,39,39,39,39,38,38,38,38,38,38,38,38,38,38,37,37,36,36,36,36,36,36,36,36,36,35,34,34,33,33,34,35,36,37,38,38,37,36,34,33,32,32,34,36,39,42,44,45,44,42,39,35,31,29,28,29,32,36,40,43,45,45,44,42,39,37,37,38,41,46,51,56,59,61,59,56,50,43,36,30,26,25,26,29,34,40,47,53,58,63,65,67,66,64,61,57,52,48,45,42,41,41,42,42,42,40,36,29,20,10,0,-10,-18,-25,-30,-34,-37,-42,-47,-54,-61,-67,-72,-73,-70,-64,-55,-47,-41,-40,-45,-57,-74,-93,-110,-121,-123,-112,-88,-50,-2,54,115,177,240,302,362,422,480,534,581,618,637,635,607,552,472,372,260,145,38,-54,-124,-169,-190,-192,-180,-161,-143,-129,-124,-127,-136,-148,-159,-167,-167,-161,-148,-130,-109,-89,-70,-55,-43,-34,-28,-23,-19,-16,-12,-9,-5,-3,-1,0,0,1,1,2,3,6,9,12,16,20,24,28,32,37,41,47,52,57,62,66,70,72,74,74,74,73,71,70,69,67,66,65,64,63,61,59,57,54,52,50,48,47,46,45,45,44,43,41,40,38,36,34,33,32,32,32,32,33,33,34,34,34,34,34,35,36,37,38,40,41,42,42,42,42,42,42,44,46,49,53,57,60,63,65,65,64,62,60,57,55,54,53,54,55,56,57,57,57,56,54,51,49,47,45,43,42,41,41,40,39,38,36,34,32,29,27,26,25,25,24,25,25,25,26,26,26,27,27,28,29,31,32,33,34,35,35,34,34,33,33,34,35,37,40,43,46,48,49,49,47,45,42,40,38,37,38,39,42,44,47,49,50,49,48,46,43,41,39,37,37,37,38,39,40,41,42,43,43,43,44,43,43,42,41,40,38,36,34,33,32,32,32,33,35,37,39,41,42,43,44,44,44,43,43,43,42,42,42,42,43,43,43,44,44,44,44,44,44,43,43,42,42,42,43,43,44,45,45,45,44,43,42,41,40,39,39,40,41,42,43,44,45,44,43,41,40,38,38,39,40,42,44,45,46,44,42,38,35,32,30,30,33,37,42,47,51,53,52,49,44,37,32,27,25,25,28,32,38,43,48,50,51,49,46,43,39,35,33,31,30,29,30,30,32,33,35,37,39,42,44,47,49,51,53,56,59,63,66,70,72,72,71,68,63,58,54,51,49,50,53,56,59,60,58,54,48,39,30,20,9,-1,-13,-26,-43,-63,-86,-110,-133,-154,-169,-177,-178,-172,-161,-147,-132,-116,-99,-78,-49,-10,45,115,200,297,398,494,577,638,670,671,640,582,504,413,318,226,143,71,12,-34,-71,-100,-122,-139,-152,-160,-164,-162,-155,-144,-130,-114,-97,-81,-65,-52,-41,-32,-24,-18,-13,-9,-7,-4,-3,-1,1,3,5,8,10,12,13,13,12,11,9,8,8,10,13,17,22,26,30,33,35,36,36,35,35,35,35,36,36,37,37,36,35,34,32,31,30,29,29,28,28,28,28,27,27,27,27,29,31,33,36,39,41,42,43,43,43,44,44,45,47,50,53,56,59,62,64,66,68,69,71,73,74,76,77,78,79,79,78,77,76,75,73,72,71,69,68,66,64,62,59,57,55,53,53,53,53,54,56,56,57,56,55,53,50,48,46,44,43,42,43,43,44,45,46,46,46,45,44,43,42,41,40,39,39,38,37,37,36,35,35,34,33,32,31,31,30,29,28,28,28,28,28,29,30,31,32,33,33,34,35,35,36,36,37,37,38,38,39,39,40,40,40,41,41,41,42,42,43,43,43,44,44,44,44,44,44,44,44,45,45,45,45,45,45,45,45,45,46,46,46,46,47,47,47,48,48,48,48,49,49,49,49,49,49,49,49,49,48,48,48,48,48,48,47,47,47,47,47,46,46,46,46,46,46,46,46,45,45,45";
          //perfect 2 s 2 PFData = "22,29,34,36,34,28,17,4,-10,-24,-37,-47,-54,-59,-61,-62,-63,-64,-66,-69,-72,-75,-77,-77,-76,-72,-67,-61,-55,-48,-43,-39,-36,-35,-34,-33,-32,-30,-28,-24,-21,-18,-16,-15,-15,-17,-19,-21,-22,-22,-21,-17,-12,-5,2,10,17,24,29,32,35,36,37,37,38,38,39,39,40,40,40,40,40,39,38,37,36,35,34,32,31,30,28,27,25,23,22,21,19,18,16,15,13,11,8,6,4,2,1,0,0,0,1,3,4,6,8,10,12,13,13,13,13,12,12,11,11,11,12,14,16,18,21,23,26,28,29,30,31,32,33,33,33,34,34,34,33,33,32,31,30,29,28,27,27,27,26,26,25,23,22,21,20,19,19,19,19,19,19,18,17,15,14,13,12,12,13,14,16,17,17,16,13,10,6,2,-1,-3,-2,1,6,12,18,24,28,30,31,29,26,22,19,16,14,13,13,13,13,12,11,9,7,6,6,6,8,11,13,15,15,13,9,4,-2,-7,-11,-12,-11,-6,1,10,18,24,27,25,20,10,-1,-14,-25,-33,-37,-37,-31,-23,-12,-1,9,16,19,19,15,10,4,-1,-4,-5,-4,0,4,9,12,14,14,13,11,9,8,7,8,10,12,14,17,19,22,24,27,30,34,39,44,49,54,57,59,59,56,52,45,37,28,17,6,-7,-20,-33,-45,-56,-66,-73,-78,-80,-80,-79,-77,-74,-72,-70,-69,-67,-64,-61,-55,-48,-40,-33,-27,-23,-24,-30,-41,-56,-76,-97,-119,-139,-157,-171,-181,-189,-196,-202,-210,-220,-231,-242,-249,-250,-239,-214,-171,-110,-32,60,161,266,367,459,536,595,633,651,649,629,593,544,484,413,336,253,168,84,4,-67,-128,-174,-206,-224,-229,-225,-214,-201,-188,-176,-168,-162,-158,-154,-150,-144,-137,-129,-120,-111,-104,-98,-94,-90,-87,-84,-79,-72,-65,-56,-48,-40,-33,-28,-25,-23,-22,-21,-20,-18,-17,-14,-13,-11,-10,-10,-10,-11,-11,-12,-12,-12,-12,-12,-12,-13,-14,-16,-19,-21,-24,-26,-28,-28,-27,-26,-24,-21,-18,-15,-12,-9,-7,-5,-3,-1,1,4,8,12,17,22,28,35,42,49,57,65,74,83,92,100,109,116,123,129,133,137,139,141,142,142,141,139,135,129,121,111,99,85,71,57,43,32,22,13,6,-1,-9,-18,-28,-41,-55,-70,-84,-98,-110,-119,-125,-128,-128,-127,-124,-121,-117,-113,-109,-105,-101,-97,-92,-87,-82,-76,-69,-62,-55,-48,-40,-34,-28,-23,-19,-15,-12,-9,-5,0,6,13,21,28,34,39,41,41,39,34,29,23,19,15,13,13,13,14,14,14,12,10,7,3,0,-3,-5,-6,-7,-8,-10,-12,-14,-16,-19,-21,-22,-23,-23,-22,-20,-19,-17,-16,-15,-14,-13,-12,-12,-11,-10,-8,-7,-5,-4,-2,-1,1,2,4,5,7,9,10,12,14,15,15,15,15,14,13,11,11,11,12,14,17,21,26,29,31,31,28,23,15,7,-3,-11,-16,-19,-19,-16,-10,-3,4,10,14,16,16,15,12,9,7,5,5,5,6,7,7,8,7,6,4,3,1,0,-1,-1,-1,-1,0,0,0,1,1,1,2,2,2,1,0,-1,-3,-4,-5,-5,-5,-3,-1,1,2,4,5,4,3,2,0,-2,-4,-5,-6,-6,-7,-7,-7,-8,-9,-11,-13,-14,-16,-17,-17,-17,-16,-14,-12,-10,-7,-5,-3,-2,0,2,3,5,7,9,11,15,18,22,26,31,35,40,44,49,54,59,64,69,75,80,84,87,88,87,83,76,66,54,40,25,11,-2,-13,-21,-26,-29,-31,-31,-31,-32,-34,-37,-40,-43,-45,-46,-45,-42,-39,-36,-35,-36,-41,-49,-59,-71,-83,-92,-98,-99,-96,-90,-82,-75,-70,-70,-75,-85,-101,-121,-144,-167,-190,-210,-225,-233,-231,-217,-187,-140,-73,12,113,227,345,461,565,649,707,735,731,698,639,561,470,373,276,181,91,9,-67,-134,-193,-243,-282,-308,-323,-324,-313,-292,-264,-232,-200,-171,-146,-128,-115,-108,-106,-106,-108,-111,-114,-116,-119,-121,-122,-121,-120,-116,-111,-105,-97,-89,-81,-75,-69,-64,-60,-56,-52,-47,-41,-33,-26,-18,-11,-4,1,5,8,9,10,11,12,13,14,16,17,17,18,19,20,21,22,24,26,29,31,35,38,41,43,46,48,50,52,53,54,55,56,56,57,58,59,60,61,62,63,64,64,64,65,65,65,65,65,65,65,65,66,66,67,68,69,71,73,75,76,77,77,76,74,70,64,58,50,42,34,26,17,8,0,-9,-17,-26,-34,-42,-50,-56,-62,-67,-71,-76,-80,-84,-89,-94,-99,-105,-110,-115,-118,-121,-122,-121,-119,-116,-112,-107,-102,-97,-93,-88,-84,-80,-76,-71,-66,-60,-54,-48,-41,-34,-28,-21,-15,-9,-2,5,13,22,30,39,46,52,56,58,57,54,51,47,43,41,40,41,43,44,45,44,40,34,26,17,8,0,-5,-7,-6,-3,2,7,10,11,8,3,-5,-13,-21,-28,-32,-33,-31,-27,-21,-16,-11,-8,-6,-6,-6,-7,-8,-8,-8,-6,-4,-2,1,2,3,4,5,6,6,8,9,11,13,14,15,16,16,15,15,16,16,17,18,20,21,23,24,24,24,24,24,23,22,21,19,17,15,12,9,5,0,-5,-10,-14,-18,-22,-24,-24,-22,-18,-12,-4,4,13,21,26,29,28,23,16,7,-3,-12,-19,-23,-24,-22,-19,-15,-12,-9,-9,-10,-12,-14,-15,-14,-11,-6,0,6,11,15,16,14,10,5,-1,-4,-6,-5,-2,4,10,17,22,27,29,31,33,34,37,42,47,54,60,66,71,74,75,75,73,70,67,63,59,55,50,44,36,29,20,12,4,-3,-8,-13,-18,-23,-31,-41,-53,-69,-86,-105,-124,-141,-155,-167,-175,-180,-182,-183,-183,-183,-183,-184,-184,-185,-185,-185,-185,-186,-186,-186,-185,-183,-177,-167,-151,-128,-97,-58,-11,44,104,169,237,306,376,443,507,564,611,646,666,667,648,608,548,472,382,285,185,89,1,-76,-138,-186,-221,-244,-257,-264,-266,-265,-262,-257,-249,-239,-226,-211,-192,-173,-152,-132,-114,-98,-86,-78,-74,-72,-73,-76,-80,-83,-86,-87,-88,-87,-85,-83,-80,-76,-72,-68,-62,-55,-47,-38,-29,-20,-13,-7,-5,-5,-9,-15,-22,-29,-36,-39,-39,-36,-29,-20,-9,2,12,21,27,30,31,29,27,25,23,23,24,26,30,35,41,48,54,60,64,67,69,69,68,66,63,62,62,65,70,78,89,101,114,126,136,143,146,146,143,139,133,127,122,117,113,108,102,94,84,72,58,44,31,21,14,10,9,9,9,8,4,-4,-15,-27,-40,-51,-58,-61,-59,-52,-43,-34,-25,-20,-19,-24,-32,-43,-55,-66,-76,-83,-86,-87,-86,-84,-82,-80,-79,-78,-77,-76,-74,-71,-67,-63,-58,-54,-51,-49,-48,-48,-49,-50,-50,-49,-48,-45,-41,-37,-32,-28,-25,-22,-19,-17,-16,-15,-14,-12,-11,-11,-10,-10,-9,-10,-10,-10,-10,-10,-10,-9,-8,-7,-6,-4,-3,-2,-1,1,3,5,8,11,15,18,21,24,26,28,30,31,31,31,32,32,31,30,29,27,24,21,19,16,14,13,13,14,15,16,17,17,16,14,11,9,6,4,2,2,2,3,4,5,6,6,5,4,3,1,0,-1,-2,-2,-2,-2,-2,-2,-2,-3,-4,-5,-5,-6,-6,-7,-7,-8,-9,-10,-11,-12,-13,-14,-14,-15,-15,-15,-15,-15,-15,-15,-15,-14,-14,-13,-12,-12,-11,-11,-11,-11,-12,-13,-15,-16,-18,-20,-21,-23,-25,-27,-29,-31,-33,-34,-35,-36,-35,-33,-30,-27,-24,-20,-17,-14,-12,-9,-7,-5,-2,2,6,10,15,20,26,31,37,44,51,59,68,78,87,96,104,110,114,115,113,110,105,99,92,85,78,71,63,55,47,37,28,18,9,0,-7,-15,-22,-29,-38,-47,-58,-70,-83,-94,-105,-113,-119,-123,-125,-128,-131,-135,-141,-148,-155,-161,-165,-165,-161,-154,-145,-135,-126,-120,-119,-123,-132,-144,-158,-172,-185,-194,-200,-200,-193,-178,-154,-117,-66,0,84,183,295,415,536,649,746,818,859,864,831,765,668,550,418,282,151,32,-71,-154,-217,-260,-286,-298,-299,-291,-278,-261,-243,-224,-206,-190,-176,-166,-159,-156,-155,-155,-156,-155,-151,-144,-133,-119,-103,-86,-71,-57,-46,-39,-35,-32,-31,-29,-26,-22,-16,-9,-2,4,8,9,7,3,-2,-8,-13,-15,-15,-12,-7,0,7,14,19,23,26,26,26,25,23,22,21,20,20,19,17,16,13,9,5,1,-4,-8,-12,-14,-15,-14,-12,-9,-4,1,7,13,19,25,32,38,44,51,57,64,69,75,79,83,85,87,89,90,93,96,99,104,108,112,115,117,116,114,109,103,94,85,73,61,47,33,19,4,-11,-25,-38,-50,-60,-68,-74,-78,-81,-82,-83,-83,-83,-83,-83,-82,-82,-82,-81,-81,-80,-79,-77,-75,-73,-70,-67,-64,-62,-60,-58,-57,-56,-55,-54,-51,-47,-42,-35,-28,-21,-14,-9,-6,-5,-5,-7,-9,-10,-11,-10,-6,-1,6,14,23,32,41,50,58,64,68,69,66,60,50,37,21,5,-10,-22,-30,-34,-32,-27,-20,-11,-3,2,4,3,-1,-6,-13,-18,-22,-23,-23,-20,-17,-14,-11,-10,-10,-11,-12,-14,-14,-14,-13,-11,-8,-6,-4,-3,-2,-2,-2,-2,-2,-1,0,2,4,6,7,8,9,9,9,9,9,9,8,8,8,7,6,4,2,1,-1,-2,-2,-1,0,2,5,8,11,14,16,17,17,17,15,13,10,7,5,2,0,-2,-3,-4,-5,-5,-5,-4,-4,-3,-2,0,2,4,6,8,9,10,9,8,6,4,2,1,0,-1,-1,0,1,2,2,2,1,0,-1,-2,-2,-2,-1,0,1,1,2,1,0,-1,-2,-3,-4,-5,-5,-5,-6,-8,-10,-14,-18,-22,-26,-29,-30,-29,-27,-23,-19,-14,-11,-9,-8,-8,-10,-11,-12,-12,-10,-7,-1,5,11,17,23,28,32,36,40,44,50,56,64,72,80,87,92,96,98,98,97,94,91,87,83,78,73,66,58,50,41,32,23,16,10,6,2,0,-2,-5,-8,-12,-17,-23,-28,-33,-37,-40,-42,-45,-48,-51,-56,-61,-66,-71,-74,-74,-72,-67,-62,-55,-50,-47,-47,-49,-55,-62,-71,-80,-90,-101,-113,-127,-146,-167,-193,-220,-247,-271,-289,-298,-296,-281,-253,-213,-162,-100,-31,46,128,215,305,396,484,566,637,691,724,733,716,674,607,522,423,317,211,110,18,-62,-128,-180,-219,-246,-264,-273,-276,-273,-265,-254,-240,-224,-208,-190,-173,-157,-142,-128,-115,-103,-93,-85,-78,-72,-68,-65,-63,-62,-60,-59,-57,-54,-51,-47,-44,-42,-40,-38,-37,-36,-35,-32,-28,-23,-16,-9,-2,5,10,12,13,12,10,6,3,1,0,2,5,10,16,22,28,31,32,32,29,25,21,18,16,16,18,21,25,29,32,34,34,33,31,29,27,27,29,31,35,38,41,44,47,49,53,58,65,73,82,90,96,98,97,91,82,71,61,52,47,47,50,56,61,64,63,56,44,28,9,-9,-24,-35,-40,-41,-38,-33,-29,-28,-30,-37,-47,-59,-70,-80,-87,-90,-90,-87,-82,-78,-74,-71,-69,-68,-67,-65,-63,-60,-57,-53,-50,-48,-46,-45,-45,-44,-43,-41,-38,-34,-31,-28,-25,-23,-23,-22,-23,-23,-22,-21,-19,-18,-16,-15,-15,-15,-17,-19,-21,-22,-22,-21,-19,-16,-14,-12,-11,-12,-14,-18,-22,-27,-31,-33,-35,-34,-33,-30,-27,-24,-22,-20,-19,-19,-19,-19,-18,-17,-16,-13,-11,-8,-5,-3,0,2,4,6,9,12,15,19,23,27,32,35,39,42,45,47,49,50,50,50,50,48,46,44,42,39,37,35,34,33,32,31,29,27,25,22,19,17,15,14,14,15,16,17,17,17,15,12,8,4,0,-3,-4,-3,-1,1,4,6,5,3,-1,-6,-12,-16,-18,-17,-13,-7,2,10,17,22,23,21,15,8,-1,-9,-15,-19,-21,-21,-19,-17,-15,-14,-14,-13,-13,-11,-8,-5,-1,3,6,6,4,0,-5,-11,-15,-17,-15,-9,-1,9,19,27,31,30,25,17,7,-3,-11,-15,-15,-11,-4,4,12,17,20,19,15,10,4,-1,-4,-5,-4,-1,2,5,6,6,3,-1,-6,-10,-13,-14,-13,-11,-7,-3,1,3,4,3,0,-3,-7,-10,-13,-13,-13,-11,-8,-5,-2,0,1,1,0,-3,-6,-9,-12,-14,-15,-16,-17,-16,-16,-16,-15,-15,-14,-13,-11,-10,-7,-5,-3,-1,0,1,2,3,4,6,9,13,17,22,26,31,34,37,40,43,46,49,53,58,63,68,72,73,73,70,65,59,51,44,37,31,26,22,18,14,9,3,-5,-14,-23,-32,-39,-44,-46,-46,-43,-39,-35,-31,-29,-30,-34,-43,-55,-71,-89,-107,-124,-138,-147,-150,-145,-134,-118,-98,-80,-65,-57,-60,-72,-94,-124,-156,-186,-208,-218,-213,-190,-150,-95,-27,50,132,215,297,376,449,514,570,612,639,646,632,596,538,461,369,268,166,68,-19,-91,-147,-187,-213,-227,-233,-233,-231,-227,-221,-215,-206,-196,-184,-172,-159,-148,-139,-134,-131,-132,-134,-137,-140,-140,-139,-135,-129,-122,-114,-107,-100,-93,-87,-81,-76,-69,-63,-56,-49,-41,-33,-25,-17,-9,-1,6,12,17,20,23,24,25,25,25,25,25,25,25,24,24,23,22,21,21,21,23,25,27,29,30,30,28,25,22,18,16,15,17,21,27,34,42,50,56,61,65,68,70,73,77,83,89,96,104,111,116,120,122,123,121,118,115,111,106,102,97,92,85,78,70,62,53,44,35,27,19,12,5,-3,-11,-20,-30,-40,-50,-60,-70,-78,-84,-89,-92,-94,-95,-95,-95,-97,-99,-102,-106,-111,-116,-120,-123,-123,-121,-117,-109,-99,-87,-75,-62,-49,-39,-31,-27,-25,-26,-30,-35,-40,-45,-48,-48,-46,-41,-34,-25,-15,-5,3,10,14,16,17,16,15,14,13,13,14,15,17,19,20,21,22,22,21,21,20,19,18,17,16,14,12,9,6,3,-1,-4,-8,-11,-15,-18,-21,-24,-26,-28,-29,-29,-29,-27,-25,-23,-21,-20,-18,-17,-17,-16,-15,-14,-13,-10,-7,-3,1,6,10,14,18,21,23,25,26,27,27,28,28,29,29,29,30,29,29,29,28,27,27,26,25,23,22,21,20,19,18,17,16,15,15,14,13,12,11,10,9,8,7,6,5,5,4,4,3,3,3,2,2,2,2,2,2,2,2,2,1,1,1,0,0,-1,-1,-2,-2,-3,-3,-4,-5,-5,-6,-7,-7,-7,-7,-7,-7,-6,-6,-5,-5,-4,-4,-4,-4,-4,-3,-3,-2,-1,0,1,1,2,2,2,2,3,3,4,5,6,7,7,8,8,8,8,7,7,6,6,6,6,6,7,6,6,6,5,4,3,3,2,2,2,2,3,3,3,3,2,2,2,1,1,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,-1,-1,-2,-3,-4,-5,-6,-7,-9,-11,-13,-15,-17,-20,-22,-24,-25,-26,-26,-25,-23,-21,-18,-15,-12,-8,-5,-1,2,5,7,9,10,10,10,11,12,14,18,24,32,41,51,61,71,79,85,90,92,92,91,88,85,81,77,72,67,62,56,49,42,34,27,19,10,2,-6,-14,-22,-30,-38,-46,-54,-61,-68,-74,-81,-87,-93,-100,-106,-113,-120,-127,-134,-143,-151,-160,-169,-177,-182,-185,-185,-180,-172,-162,-151,-142,-135,-133,-135,-141,-148,-152,-149,-135,-106,-60,4,83,174,271,368,460,540,605,651,677,682,667,633,581,513,432,340,242,142,45,-45,-122,-182,-226,-251,-260,-256,-243,-226,-208,-191,-178,-169,-163,-158,-153,-146,-139,-130,-122,-114,-108,-105,-105,-107,-110,-114,-117,-119,-118,-115,-111,-106,-101,-96,-91,-86,-81,-76,-70,-63,-55,-46,-37,-28,-19,-11,-4,2,7,11,15,17,20,22,23,24,25,26,26,26,27,27,28,28,29,29,29,29,29,28,27,25,23,19,15,11,7,4,1,0,1,3,7,12,18,25,33,40,49,57,66,76,86,97,106,115,122,127,129,129,127,123,119,115,112,109,107,106,104,102,99,94,88,81,72,63,53,43,33,22,12,1,-11,-23,-35,-48,-61,-72,-82,-91,-97,-102,-104,-105,-105,-104,-103,-102,-102,-102,-102,-103,-103,-103,-102,-100,-97,-93,-89,-85,-81,-78,-76,-74,-73,-71,-68,-65,-61,-57,-51,-46,-40,-34,-29,-24,-19,-14,-8,-2,5,13,21,28,35,40,44,47,48,48,48,47,46,44,43,41,38,35,32,28,25,22,19,18,18,18,18,18,18,16,12,8,3,-2,-6,-10,-11,-11,-10,-7,-5,-2,-1,-1,-2,-4,-7,-10,-13,-15,-15,-15,-13,-11,-8,-5,-3,-2,-1,-2,-3,-4,-5,-6,-7,-7,-6,-5,-4,-4,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,0,-1,-1,-1,-1,0,0,0,0,0,1,1,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-2,-2,-2,-2,-2,-3,-3,-3,-4,-4,-4,-4,-5,-5,-5,-5,-6,-6,-6,-6,-6,-6,-5,-5,-4,-4,-4,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,2,2,3,3,4,4,5,5,5,5,5,5,5,5,5,6,6,7,8,9,10,10,9,9,8,8,8,8,8,9,9,10,9,8,7,6,5,4,4,5,7,8,9,10,10,8,5,1,-3,-6,-8,-9,-8,-5,-1,3,7,10,12,11,9,6,2,-2,-5,-6,-6,-4,-1,2,6,9,12,14,16,17,19,21,24,28,33,37,42,46,49,50,50,48,45,40,35,29,23,16,8,1,-7,-15,-22,-30,-36,-42,-48,-54,-59,-65,-71,-76,-81,-85,-87,-87,-84,-79,-73,-67,-63,-60,-61,-65,-72,-81,-91,-99,-106,-111,-113,-115,-116,-117,-119,-122,-123,-120,-110,-91,-60,-17,39,105,178,254,327,394,452,496,528,545,549,540,518,484,437,379,310,232,148,62,-23,-100,-167,-219,-256,-277,-284,-280,-269,-253,-237,-222,-209,-199,-190,-183,-175,-167,-158,-148,-137,-127,-118,-109,-102,-95,-89,-83,-76,-70,-63,-56,-50,-45,-40,-37,-33,-30,-26,-23,-19,-14,-11,-9,-8,-9,-12,-17,-22,-28,-34,-39,-43,-45,-46,-46,-44,-42,-40,-37,-34,-31,-28,-24,-21,-17,-12,-8,-3,2,7,12,17,22,27,31,35,38,41,44,46,48,50,52,55,59,63,67,72,77,83,88,94,99,103,107,110,112,113,113,113,113,113,114,116,119,121,124,127,128,128,125,121,115,108,98,86,72,56,37,16,-7,-32,-58,-82,-103,-121,-132,-138,-138,-132,-122,-110,-98,-86,-77,-71,-68,-68,-69,-72,-74,-76,-76,-76,-74,-71,-68,-64,-60,-56,-52,-49,-45,-41,-38,-35,-33,-32,-32,-31,-31,-31,-31,-29,-27,-24,-21,-17,-13,-9,-5,-2,1,3,6,9,12,15,18,22,25,29,33,36,39,42,43,44,43,41,38,35,31,27,24,22,21,22,23,25,27,29,30,30,30,30,29,29,30,32,35,38,41,43,44,44,42,39,35,31,28,25,23,21,20,19,18,15,11,7,2,-3,-8,-13,-16,-19,-22,-26,-29,-34,-40,-47,-54,-61,-67,-72,-75,-76,-76,-75,-72,-70,-68,-65,-63,-62,-60,-58,-55,-52,-48,-45,-41,-38,-34,-32,-29,-27,-25,-23,-21,-18,-15,-12,-9,-6,-4,-1,1,3,5,5,6,6,5,5,5,5,5,6,8,9,11,11,11,9,7,4,1,-1,-2,-2,1,5,10,15,19,21,21,18,14,9,4,-1,-3,-3,-1,3,8,13,17,20,21,20,18,15,12,10,10,10,11,13,14,16,17,17,17,16,15,15,15,16,17,18,19,19,20,20,20,21,22,23,25,26,28,29,30,30,31,31,31,33,34,36,38,40,41,41,41,39,37,35,34,35,37,41,46,52,57,62,64,65,63,60,56,53,51,51,53,58,64,70,77,82,85,85,83,79,73,66,58,49,41,33";
          //PFData = "26,84,141,196,247,294,335,369,396,413,419,413,395,363,319,266,205,142,80,23,-25,-62,-89,-105,-112,-113,-111,-107,-103,-100,-98,-97,-96,-94,-92,-88,-85,-81,-78,-76,-75,-75,-75,-75,-74,-71,-66,-60,-53,-45,-38,-31,-26,-21,-17,-13,-10,-6,-1,5,11,17,24,30,35,40,44,47,48,49,49,48,47,45,44,42,41,39,38,36,34,32,30,28,25,23,20,17,15,12,10,7,4,1,-3,-6,-9,-12,-14,-15,-16,-16,-15,-14,-12,-11,-9,-7,-6,-5,-4,-2,-1,1,3,6,8,11,13,15,18,20,23,25,28,32,35,38,41,44,46,47,48,48,47,46,44,43,41,39,38,37,35,33,32,30,28,26,24,23,21,19,18,16,15,13,11,9,7,5,3,1,0,-1,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,0,0,0,1,1,2,2,2,2,3,3,3,3,3,3,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,4,4,4,4,4,4,4,4,4,4,5,6,7,7,8,7,7,6,4,3,2,1,0,1,1,2,4,4,4,4,2,0,-3,-5,-7,-9,-9,-9,-8,-8,-7,-7,-8,-10,-12,-13,-15,-16,-17,-16,-15,-14,-13,-12,-12,-12,-13,-14,-14,-14,-14,-13,-12,-11,-10,-9,-8,-8,-8,-8,-8,-9,-9,-8,-8,-8,-7,-6,-6,-6,-6,-5,-5,-5,-5,-5,-5,-5,-5,-4,-4,-3,-3,-2,-2,-2,-3,-3,-3,-3,-3,-2,-2,-1,0,0,0,0,-1,-1,-2,-2,-1,0,2,5,7,8,9,8,6,3,0,-3,-5,-5,-3,1,5,10,15,18,21,21,21,19,17,16,15,16,18,21,24,28,30,31,31,29,27,23,19,16,13,12,11,10,10,10,8,6,2,-3,-9,-16,-24,-31,-39,-47,-55,-64,-72,-81,-89,-97,-104,-108,-110,-110,-106,-100,-93,-86,-78,-73,-69,-68,-68,-69,-70,-69,-66,-60,-51,-39,-23,-3,20,48,80,119,163,212,264,317,367,410,439,452,446,420,374,311,237,157,76,1,-64,-118,-158,-185,-202,-210,-213,-212,-209,-204,-199,-191,-181,-168,-152,-133,-111,-88,-64,-41,-20,-1,15,28,38,45,49,50,50,47,43,38,32,25,18,11,5,-1,-6,-10,-13,-15,-16,-16,-15,-14,-12,-10,-8,-6,-5,-3,-2,-1,0,0,1,1,1,1,1,1,1,0,0,-1,-1,-2,-2,-3,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,0,1,1,2,2,3,3,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,2,1,1,0,0,0,1,1,2,3,4,4,4,4,3,3,2,2,2,2,2,2,2,2,1,1,1,1,0,0,0,-1,-1,-1,-1,-1,-2,-2,-3,-3,-4,-4,-5,-5,-5,-6,-6,-6,-6,-7,-7,-7,-6,-6,-6,-6,-5,-5,-5,-5,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,1,1,0,0,0,0,1,1,2,2,2,3,3,3,3,3,3,3,3,3,4,5,5,6,6,5,4,3,2,1,0,0,0,0,1,2,2,3,3,2,1,0,-1,-2,-2,-3,-3,-3,-3,-3,-3,-3,-3,-4,-4,-4,-3,-3,-2,-2,-1,-1,-1,-1,-2,-2,-1,-1,0,1,2,3,4,4,4,4,3,3,3,3,4,5,6,7,9,10,10,10,9,7,6,5,3,3,2,2,2,3,3,3,3,2,1,1,0,0,0,0,0,0,0,0,0,0,-1,-2,-3,-3,-4,-4,-4,-4,-4,-4,-4,-5,-5,-5,-6,-6,-7,-8,-8,-9,-9,-9,-10,-10,-10,-11,-11,-12,-12,-13,-13,-13,-13,-13,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-14,-13,-13,-12,-11,-9,-8,-6,-4,-2,-1,0,0,0,0,0,0,0,1,2,3,4,4,3,2,0,0,0,2,5,8,11,13,11,5,-5,-19,-34,-51,-66,-77,-84,-87,-86,-82,-79,-78,-79,-84,-91,-99,-106,-111,-111,-108,-102,-97,-94,-95,-99,-105,-108,-103,-84,-45,16,100,200,311,421,519,593,635,641,610,546,457,354,246,145,56,-16,-70,-106,-129,-143,-150,-155,-157,-158,-158,-156,-152,-145,-136,-127,-119,-112,-108,-106,-105,-105,-105,-102,-97,-90,-79,-68,-55,-43,-33,-24,-18,-13,-10,-9,-8,-7,-7,-7,-8,-9,-11,-13,-15,-17,-19,-20,-21,-22,-22,-21,-20,-19,-17,-16,-15,-13,-12,-11,-9,-8,-7,-6,-5,-4,-3,-2,-1,-1,-1,0,-1,-1,-1,-1,-2,-2,-1,0,0,2,3,4,5,6,8,9,10,12,14,15,18,20,21,23,24,25,26,25,25,24,23,22,21,20,19,18,18,17,16,15,13,12,12,11,10,10,10,10,10,9,9,8,8,7,6,6,6,5,5,5,4,4,3,2,1,0,-1,-1,-1,-1,-1,-1,-1,-2,-3,-5,-7,-9,-11,-12,-13,-13,-13,-12,-12,-13,-14,-16,-18,-21,-23,-25,-26,-26,-25,-23,-20,-17,-14,-12,-10,-10,-10,-10,-11,-12,-12,-12,-12,-11,-10,-8,-7,-5,-4,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,5,6,6,6,6,5,5,5,4,4,4,5,5,5,6,6,5,5,4,4,3,2,2,2,2,2,2,2,2,2,1,1,0,0,0,0,0,0,0,1,1,1,2,2,2,2,2,3,3,3,3,4,4,5,5,6,6,7,7,8,8,9,10,10,11,11,12,12,13,13,12,12,11,10,10,9,9,9,9,9,9,9,8,7,6,5,4,3,2,2,2,2,2,3,2,2,1,0,-1,-2,-4,-5,-5,-5,-5,-4,-3,-2,0,1,2,2,2,2,2,1,0,-1,-1,-1,-1,0,1,2,2,3,3,3,3,2,2,1,1,2,2,3,4,5,5,5,5,5,4,4,4,5,6,7,8,10,12,13,15,17,19,22,26,29,33,36,38,40,41,41,39,37,35,32,28,25,21,18,14,10,6,2,-2,-6,-10,-14,-18,-22,-26,-31,-35,-39,-43,-47,-50,-54,-57,-61,-65,-69,-74,-78,-82,-84,-85,-85,-84,-82,-79,-77,-76,-75,-74,-74,-72,-69,-65,-59,-53,-46,-41,-38,-37,-40,-45,-52,-59,-67,-75,-82,-87,-91,-93,-92,-85,-72,-48,-13,36,99,173,256,341,421,491,544,575,581,563,522,463,391,312,230,152,80,17,-37,-81,-115,-142,-161,-173,-181,-184,-185,-185,-185,-185,-186,-187,-188,-189,-187,-182,-173,-162,-147,-132,-116,-101,-89,-79,-73,-68,-65,-62,-58,-53,-47,-40,-31,-23,-15,-7,-1,3,7,10,12,14,16,17,18,19,20,20,21,21,20,20,19,19,18,18,17,17,17,17,16,16,15,14,13,12,10,9,8,8,8,8,9,9,10,10,9,9,7,6,5,5,5,5,6,8,9,10,10,10,9,7,6,4,2,1,0,-1,-1,-2,-2,-3,-3,-4,-4,-4,-5,-4,-4,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-3,-3,-4,-5,-5,-6,-6,-6,-5,-5,-4,-4,-4,-5,-6,-8,-9,-10,-11,-10,-9,-8,-6,-4,-2,-1,0,0,-1,-2,-4,-5,-5,-5,-5,-4,-3,-2,-1,0,0,-1,-1,-2,-2,-2,-2,-1,-1,0,1,1,1,1,1,1,1,0,0,1,1,2,3,4,5,5,6,6,7,7,7,7,7,7,7,7,8,9,10,11,12,12,12,12,11,10,9,7,6,5,4,4,4,5,6,7,7,7,7,6,4,3,1,0,-1,-1,-1,0,0,0,0,0,-1,-2,-3,-4,-4,-3,-2,0,2,4,6,6,6,4,2,0,-2,-3,-3,-3,-1,2,5,8,11,13,14,14,13,11,9,7,5,3,3,3,4,6,7,9,10,11,11,9,8,5,3,1,-1,-2,-2,-1,0,1,2,3,3,3,2,0,-1,-2,-3,-3,-2,-2,-1,-1,-1,-2,-3,-4,-6,-7,-8,-8,-7,-7,-6,-5,-4,-5,-5,-7,-9,-12,-14,-16,-18,-19,-20,-21,-21,-21,-20,-20,-20,-19,-19,-18,-17,-16,-15,-13,-12,-10,-9,-8,-7,-6,-5,-4,-2,-1,1,3,5,8,10,12,15,17,20,22,23,24,25,25,24,23,21,18,16,13,10,7,5,1,-2,-5,-8,-12,-15,-18,-21,-23,-25,-27,-29,-30,-31,-32,-33,-33,-33,-34,-35,-36,-38,-42,-48,-55,-63,-71,-80,-87,-92,-94,-94,-91,-87,-82,-78,-76,-76,-78,-82,-86,-88,-88,-83,-73,-58,-38,-13,15,47,82,120,162,206,253,301,348,390,423,442,446,431,397,346,282,210,137,67,6,-42,-77,-98,-107,-109,-106,-101,-96,-94,-94,-95,-97,-99,-100,-99,-98,-96,-94,-92,-91,-91,-92,-92,-92,-91,-89,-86,-82,-78,-75,-71,-68,-66,-63,-60,-56,-51,-45,-39,-32,-26,-20,-14,-9,-5,0,4,8,13,17,20,23,24,24,23,21,18,16,13,12,11,11,11,12,13,14,15,14,14,13,12,12,11,11,11,12,12,13,13,13,13,13,12,11,11,10,10,9,9,8,8,7,7,6,6,5,5,5,4,4,4,4,4,4,4,3,3,3,3,3,3,3,3,2,2,2,1,1,1,1,1,1,1,1,1,1,0,0,-1,-1,-2,-2,-2,-3,-3,-3,-3,-4,-4,-5,-5,-6,-6,-7,-7,-7,-7,-7,-6,-6,-6,-6,-6,-5,-5,-5,-5,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-3,-2,-2,-2,-2,-2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,-1,-1,-1,-1,-1,0,0,0,-1,-1,-1,-2,-2,-2,-1,-1,0,0,0,0,-1,-2,-2,-3,-3,-3,-2,-1,0,1,1,1,0,-2,-4,-6,-7,-7,-6,-4,-2,1,3,5,5,4,3,0,-2,-4,-6,-6,-5,-4,-3,-1,0,1,1,0,0,-1,-2,-2,-2,-2,-1,-1,-1,0,-1,-1,-1,-1,-1,-1,-1,-1,0,0,0,0,-1,-1,-1,-2,-2,-2,-1,-1,0,0,0,0,0,0,0,-1,-1,-2,-2,-1,-1,0,1,2,3,4,4,4,3,3,2,2,3,4,5,7,9,10,12,13,13,13,13,14,14,15,16,17,17,16,15,13,10,8,6,6,6,8,10,11,11,9,5,0,-7,-14,-21,-25,-28,-30,-31,-33,-36,-42,-49,-58,-66,-71,-73,-70,-63,-53,-42,-33,-29,-31,-39,-53,-70,-87,-100,-108,-108,-100,-86,-68,-46,-21,6,38,76,123,180,246,318,389,451,496,515,503,458,381,279,161,40,-73,-168,-237,-279,-294,-286,-262,-229,-196,-167,-145,-131,-125,-123,-123,-122,-119,-111,-99,-83,-65,-46,-27,-9,7,20,32,40,46,50,50,49,46,41,36,30,24,19,14,9,5,0,-3,-7,-10,-12,-13,-14,-14,-13,-12,-11,-11,-10,-10,-11,-11,-11,-11,-11,-11,-11,-11,-11,-11,-10,-10,-10,-9,-8,-7,-6,-6,-5,-5,-5,-6,-6,-5,-4,-2,0,3,7,10,13,16,18,19,20,20,20,20,20,21,21,21,20,20,19,18,16,15,14,13,12,12,11,11,11,10,9,9,8,7,7,6,6,6,6,6,6,5,4,3,2,1,0,-1,-1,0,0,1,2,3,3,3,2,1,-1,-3,-4,-6,-7,-8,-8,-7,-6,-6,-5,-5,-5,-6,-7,-9,-11,-13,-15,-15,-15,-14,-13,-11,-9,-7,-5,-5,-4,-5,-6,-6,-7,-7,-7,-7,-6,-5,-4,-3,-3,-3,-3,-3,-3,-3,-3,-2,-2,-1,-1,0,0,0,0,-1,-1,-1,-2,-2,-2,-1,-1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,1,1,1,1,0,0,0,0,1,1,1,1,1,0,0,-1,-1,-1,-1,0,0,1,1,1,0,0,-1,-2,-3,-3,-3,-2,-1,0,2,3,3,3,2,1,-1,-2,-3,-4,-4,-3,-2,-1,0,1,1,1,0,-1,-2,-3,-3,-2,-2,-1,0,1,1,1,0,-1,-2,-3,-4,-4,-3,-2,0,1,3,4,4,4,3,2,1,0,-1,-1,0,1,2,3,3,4,4,4,3,3,2,1,1,1,1,1,1,1,1,1,1,0,0,-1,-1,-1,-2,-2,-2,-3,-3,-4,-4,-5,-5,-5,-6,-5,-5,-5,-5,-5,-4,-4,-3,-3,-3,-2,-2,-2,-1,-1,-1,0,0,1,1,2,2,3,3,3,4,4,4,5,5,6,6,7,7,7,7,7,6,6,6,5,5,5,5,6,6,6,5,5,4,4,3,3,2,2,2,2,2,1,1,0,-1,-1,-1,-1,0,1,2,3,4,4,4,4,3,3,3,3,4,6,8,11,13,15,17,19,20,22,24,26,29,32,35,38,41,42,42,42,40,37,34,31,27,23,18,13,8,2,-3,-8,-13,-18,-21,-25,-28,-31,-35,-40,-45,-50,-55,-59,-62,-65,-66,-67,-69,-71,-75,-81,-89,-97,-106,-114,-120,-123,-124,-122,-117,-112,-106,-100,-96,-93,-91,-91,-90,-91,-91,-91,-91,-91,-90,-87,-82,-72,-56,-32,1,43,95,155,222,293,365,432,493,542,576,592,589,565,522,460,383,295,201,106,14,-69,-140,-196,-237,-263,-275,-275,-266,-251,-231,-210,-189,-169,-153,-140,-130,-124,-120,-117,-116,-114,-112,-107,-100,-91,-81,-70,-58,-48,-39,-33,-29,-26,-25,-24,-24,-22,-20,-18,-14,-11,-8,-6,-4,-4,-4,-5,-5,-5,-4,-2,1,4,7,10,13,14,15,15,14,14,13,12,11,11,12,12,13,13,14,14,13,13,12,12,11,11,11,11,10,10,10,10,9,8,8,7,7,7,7,6,6,6,6,5,5,4,4,3,3,3,3,4,4,4,4,4,3,3,2,1,1,0,0,0,1,1,1,1,1,1,1,0,0,-1,-1,-1,-1,-1,-1,-1,-1,-2,-3,-4,-5,-6,-7,-8,-8,-8,-7,-6,-5,-4,-4,-3,-4,-4,-5,-6,-6,-6,-6,-5,-4,-3,-2,-1,0,0,-1,-1,-2,-2,-2,-2,-1,0,1,2,2,2,1,0,-1,-2,-2,-2,-1,0,2,4,5,7,7,7,6,4,3,2,1,1,2,3,5,6,7,8,9,9,9,9,9,9,9,9,9,9,9,9,9,9,8,8,7,7,7,7,7,7,7,6,6,6,6,5,5,5,4,4,4,4,4,4,4,4,3,3,3,3,2,2,3,3,3,3,3,3,3,3,2,2,2,2,2,3,3,3,4,3,3,1,0,-1,-2,-2,-2,-1,0,2,3,4,5,4,4,2,1,-1,-2,-2,-1,-1,0,2,3,3,3,3,3,3,2,2,2,3,3,4,5,5,5,5,5,4,4,4,4,4,4,4,4,3,3,2,2,1,1,1,1,1,2,2,2,2,1,0,-1,-1,-2,-3,-3,-3,-3,-3,-2,-3,-3,-3,-3,-4,-4,-4,-4,-4,-3,-3,-3,-3,-3,-3,-4,-4,-5,-6,-7,-7,-8,-9,-10,-11,-12,-14,-15,-16,-17,-17,-17,-17,-16,-14,-13,-12,-11,-10,-8,-8,-7,-5,-4,-3,-1,1,3,5,7,9,12,15,18,23,28,33,38,44,49,53,56,57,58,56,54,52,49,46,43,40,37,34,31,27,22,18,13,9,5,1,-2,-4,-6,-9,-12,-17,-22,-28,-34,-40,-45,-49,-52,-53,-55,-55,-56,-58,-58,-59,-57,-54,-49,-41,-31,-22,-13,-6,-2,-2,-5,-10,-17,-25,-32,-38,-45,-52,-62,-76,-93,-114,-137,-158,-174,-183,-183,-171,-150,-120,-85,-47,-8,30,67,105,146,192,242,297,352,402,441,462,460,433,382,309,223,132,44,-33,-93,-133,-155,-161,-157,-148,-139,-132,-131,-133,-138,-142,-144,-142,-135,-124,-110,-96,-83,-71,-63,-58,-54,-50,-47,-42,-36,-30,-23,-16,-9,-4,0,4,7,10,14,18,22,26,29,30,31,31,30,28,27,26,25,25,25,25,24,23,22,20,18,16,13,11,10,8,7,5,3,1,-1,-4,-6,-8,-10,-11,-11,-11,-10,-9,-9,-8,-8,-7,-7,-7,-7,-7,-6,-6,-4,-3,-2,0,1,1,2,2,1,1,1,1,2,3,4,6,7,8,9,9,9,8,7,6,5,5,4,4,4,4,4,4,4,4,3,3,2,2,2,2,2,2,3,3,3,3,3,2,1,0,0,-1,-1,-2,-1,-1,-1,-1,-1,-1,-1,-2,-3,-4,-4,-5,-6,-6,-6,-7,-7,-8,-9,-10,-11,-12,-13,-13,-14,-14,-15,-15,-15,-15,-14,-14,-13,-13,-12,-12,-11,-10,-10,-10,-9,-9,-9,-8,-8,-7,-6,-6,-5,-5,-5,-6,-6,-7,-7,-7,-6,-5,-4,-3,-1,0,0,0,0,-1,-1,-2,-2,-3,-2,-1,0,1,2,3,3,4,4,4,4,5,5,6,7,8,9,10,10,11,11,11,11,10,10,10,9,9,9,8,8,8,7,7,6,6,5,5,4,4,3,3,3,2,2,1,0,-1,-1,-2,-2,-3,-3,-3,-3,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-2,-1,-1,0,0,1,1,2,3,3,3,3,3,2,2,1,1,1,2,3,5,7,8,9,9,8,6,4,2,0,-2,-2,-2,0,1,4,6,7,8,8,7,6,6,5,6,7,8,9,11,12,12,12,11,10,9,8,7,7,6,6,5,4,2,1,-1,-3,-4,-5,-5,-5,-5,-6,-8,-11,-14,-18,-23,-27,-30,-32,-34,-35,-35,-35,-35,-35,-36,-37,-38,-38,-38,-37,-35,-33,-30,-29,-28,-28,-30,-33,-36,-38,-41,-42,-43,-43,-43,-42,-42,-42,-43,-44,-45,-45,-44,-43,-42,-41,-41,-43,-47,-53,-61,-70,-80,-90,-99,-106,-111,-113,-112,-108,-99,-85,-65,-37,-3,40,89,144,203,263,322,375,422,459,486,500,502,492,469,435,389,334,272,203,131,59,-11,-74,-129,-175,-209,-234,-249,-256,-257,-255,-250,-244,-237,-229,-219,-208,-196,-183,-168,-153,-139,-127,-116,-107,-101,-97,-94,-91,-89,-86,-82,-78,-72,-66,-60,-53,-46,-39,-32,-25,-18,-11,-4,4,12,20,29,38,46,55,62,69,74,78,79,79,78,76,73,69,66,63,60,57,54,51,48,44,39,35,30,26,22,18,14,10,6,2,-3,-8,-13,-18,-23,-28,-31,-33,-34,-33,-32,-30,-27,-25,-23,-21,-19,-17,-15,-13,-10,-7,-3,0,4,7,10,13,16,19,23,27,32,38,43,48,53,56,58,59,60,59,58,57,55,54,52,51,49,47,44,41,38,35,33,31,30,29,28,28,27,26,25,23,21,20,19,18,17,16,16,15,14,12,10,8,6,4,2,0,-1,-3,-4,-5,-7,-9,-12,-14,-16,-19,-21,-23,-26,-29,-33,-37,-42,-48,-53,-58,-62,-65,-66,-67,-66,-64,-63,-61,-60,-58,-57,-55,-53,-51,-48,-45,-41,-38,-36,-34,-32,-31,-30,-29,-28,-26,-23,-20,-16,-13,-10,-8,-6,-5,-5,-4,-4,-3,-2,-1,0,1,3,3,3,3,3,3,2,3,3,4,5,7,8,9,10,11,11,11,11,12,12,13,14,15,16,18,19,20,20,20,20,19,18,17,17,16,17,17,18,19,19,19,19,18,17,16,15,15,15,16,18,20,21,22,22,22,20,18,16,15,14,14,15,17,20,23,25,27,28,28,28,27,26,26,26,26,27,28,29,30,31,32,32,32,32,32,32,33,33,34,35,35,36,36,36,36,35,35,35,35,35,35,34,34,34,34,33,33,33,33,33,33,33,33,33,32,32,31";
          //PFData = "7,-4,-16,-29,-44,-60,-75,-87,-96,-99,-98,-92,-83,-73,-65,-60,-60,-62,-67,-73,-77,-77,-72,-59,-39,-10,27,73,129,194,269,353,442,533,619,693,746,771,763,719,640,531,401,260,119,-12,-124,-211,-272,-309,-325,-325,-317,-304,-290,-276,-263,-249,-233,-213,-190,-164,-136,-108,-82,-61,-44,-33,-27,-24,-24,-25,-26,-27,-29,-32,-35,-40,-45,-52,-58,-64,-68,-70,-69,-66,-61,-55,-48,-42,-35,-29,-24,-19,-14,-9,-4,1,6,10,13,15,16,17,17,17,16,16,16,16,16,17,17,17,18,18,18,19,21,22,24,26,28,30,31,33,34,36,37,39,40,42,43,45,46,47,48,49,50,52,53,55,57,58,60,61,62,62,61,59,58,55,53,50,47,44,42,39,36,33,30,27,25,23,21,19,18,16,15,13,11,9,7,5,3,1,-1,-2,-3,-3,-3,-2,-1,0,1,2,4,5,7,9,11,14,16,17,19,20,21,22,22,22,22,22,22,22,22,22,21,21,20,20,20,20,20,21,22,23,25,26,27,28,29,29,29,30,30,31,32,33,35,35,35,35,33,31,28,25,22,20,19,18,18,18,17,16,15,13,10,6,2,-2,-7,-11,-15,-19,-23,-26,-30,-33,-35,-36,-36,-35,-33,-30,-26,-21,-17,-13,-9,-5,-2,1,5,9,14,19,25,31,37,42,48,53,59,65,70,77,83,90,96,101,106,109,111,112,111,110,109,108,107,106,106,106,105,105,104,102,99,94,88,80,70,58,46,32,18,3,-11,-25,-39,-52,-65,-78,-89,-100,-108,-115,-118,-119,-116,-112,-107,-101,-96,-92,-90,-88,-86,-83,-78,-72,-64,-56,-49,-46,-47,-53,-63,-77,-91,-104,-113,-119,-120,-118,-115,-112,-110,-106,-97,-78,-41,20,108,224,365,519,675,816,925,988,997,947,842,694,517,329,148,-10,-137,-225,-278,-298,-296,-280,-259,-239,-224,-216,-213,-213,-212,-210,-204,-195,-184,-172,-162,-153,-148,-145,-143,-141,-138,-133,-125,-115,-103,-90,-75,-60,-46,-31,-16,-2,12,25,37,47,56,63,68,71,73,74,75,76,77,77,78,78,77,76,74,72,70,68,66,64,63,62,61,60,58,57,55,53,50,48,46,44,42,41,41,40,40,39,39,39,38,37,37,36,36,35,35,35,35,36,36,37,38,38,39,40,42,43,45,47,48,50,52,53,53,53,53,52,50,48,45,43,40,37,34,31,29,26,23,20,18,16,14,13,12,12,12,12,12,12,12,12,12,12,11,11,11,11,11,12,12,13,14,14,15,15,16,16,16,16,16,17,17,18,20,21,23,25,26,28,30,32,33,35,37,39,41,42,43,44,44,43,42,40,38,36,35,33,32,31,31,30,29,27,25,22,18,14,10,5,1,-3,-8,-12,-17,-22,-28,-34,-39,-44,-47,-49,-48,-46,-42,-37,-32,-26,-21,-17,-13,-10,-7,-3,1,7,14,22,30,39,47,55,63,72,81,92,103,116,129,142,153,162,169,171,171,167,161,153,145,137,129,122,115,108,101,92,82,71,60,48,36,25,14,4,-5,-14,-23,-32,-43,-53,-64,-75,-85,-95,-104,-111,-117,-122,-126,-129,-131,-132,-132,-130,-125,-118,-109,-98,-86,-74,-63,-54,-49,-46,-46,-48,-51,-54,-56,-56,-56,-54,-53,-50,-46,-39,-24,0,40,96,172,264,371,483,592,686,756,793,790,746,665,552,418,274,131,-1,-113,-202,-265,-305,-323,-324,-312,-291,-264,-233,-201,-168,-137,-109,-85,-67,-55,-50,-49,-52,-58,-63,-66,-68,-66,-61,-55,-48,-42,-37,-33,-31,-29,-26,-23,-19,-14,-7,-1,5,11,15,18,20,21,23,25,27,29,32,35,37,39,40,40,40,40,41,41,42,43,44,45,45,46,45,45,45,45,45,45,45,45,46,46,46,46,46,46,45,45,45,44,43,43,42,41,40,38,37,36,36,36,36,36,36,37,38,38,40,41,43,45,47,49,51,53,54,55,54,53,51,48,45,41,37,32,27,22,17,12,7,3,-1,-5,-7,-9,-9,-9,-8,-6,-4,-2,1,3,6,8,10,12,14,15,17,18,18,19,19,19,19,18,18,17,17,16,16,16,15,15,15,15,16,16,16,16,17,17,17,17,17,17,17,17,17,18,18,18,18,19,19,20,21,22,23,25,26,28,29,30,31,32,32,33,33,33,33,32,31,30,28,25,23,20,18,17,16,16,18,20,23,27,32,38,44,52,60,68,77,86,93,100,106,110,112,112,111,109,105,100,93,85,77,68,58,49,40,32,25,19,14,9,5,0,-4,-8,-12,-14,-14,-13,-10,-6,-3,0,-1,-5,-12,-23,-36,-50,-64,-78,-90,-101,-111,-120,-129,-138,-147,-153,-158,-159,-158,-155,-150,-146,-143,-141,-139,-133,-117,-88,-38,35,132,249,378,508,626,719,775,787,751,673,559,423,279,141,20,-77,-146,-189,-212,-220,-221,-220,-220,-224,-230,-236,-237,-232,-220,-200,-174,-144,-113,-85,-61,-42,-28,-18,-12,-8,-4,1,6,11,16,22,27,31,35,39,43,47,50,53,56,58,59,60,59,59,58,57,57,57,57,56,56,55,53,51,48,45,42,39,37,34,31,28,25,21,18,14,11,9,7,6,6,7,8,10,11,13,14,15,16,17,19,20,22,24,26,29,31,33,35,37,40,42,45,48,52,55,58,62,64,66,67,67,67,66,65,63,61,60,58,57,55,53,52,50,48,46,43,41,39,37,36,34,32,30,28,26,23,21,18,16,14,12,11,10,10,10,10,10,11,11,11,12,12,12,13,13,14,14,15,15,16,16,16,16,17,17,17,17,18,18,19,19,20,20,20,20,19,19,19,18,18,18,19,19,19,19,19,18,18,18,18,18,19,19,20,20,21,21,20,19,18,17,17,17,17,19,21,24,27,32,36,41,46,52,58,65,72,79,86,92,98,102,104,105,105,104,102,99,95,91,87,82,76,71,65,59,53,47,42,38,35,32,29,26,23,20,17,15,13,11,10,9,7,4,-3,-12,-25,-41,-60,-79,-99,-117,-132,-146,-157,-167,-177,-187,-199,-211,-223,-233,-240,-241,-237,-228,-214,-196,-177,-157,-135,-109,-75,-29,36,122,231,361,505,653,791,906,983,1012,988,911,787,628,449,267,97,-49,-163,-241,-288,-307,-306,-294,-278,-263,-250,-241,-233,-225,-214,-201,-184,-166,-149,-134,-124,-117,-115,-115,-115,-114,-109,-101,-89,-74,-58,-43,-30,-20,-14,-10,-8,-6,-5,-4,-2,1,3,5,6,6,5,3,3,3,4,6,10,14,19,25,29,34,38,43,47,52,57,61,66,69,72,74,74,74,73,71,68,66,64,62,61,59,57,56,54,52,51,49,49,48,48,48,48,49,49,50,50,50,50,50,50,50,50,49,49,48,46,45,44,42,41,40,39,37,37,35,34,33,32,30,28,27,25,23,21,20,18,16,14,12,10,8,6,5,4,3,3,4,5,5,7,8,9,10,11,11,12,13,14,15,16,18,19,20,21,22,23,24,25,26,27,28,30,31,32,33,33,34,33,33,33,32,31,31,31,30,30,31,31,30,30,29,28,26,24,22,20,18,16,14,12,10,7,5,2,0,-3,-4,-4,-4,-2,0,3,7,10,13,15,17,19,21,23,25,29,33,38,43,48,54,59,65,71,77,84,91,100,108,117,124,130,134,136,135,133,128,122,115,108,101,93,86,77,69,60,51,41,32,23,15,8,1,-6,-12,-19,-26,-34,-41,-48,-54,-59,-63,-67,-71,-76,-84,-94,-106,-121,-135,-148,-157,-161,-160,-153,-142,-130,-118,-108,-103,-103,-106,-111,-116,-118,-116,-110,-100,-88,-78,-69,-62,-54,-42,-19,22,87,179,297,437,588,737,869,967,1019,1017,959,849,699,522,335,156,-2,-130,-222,-280,-307,-309,-296,-273,-247,-222,-199,-178,-159,-142,-125,-109,-95,-85,-79,-77,-79,-84,-90,-95,-98,-97,-93,-85,-75,-64,-54,-45,-39,-34,-31,-28,-25,-21,-16,-9,-1,7,15,22,28,33,37,40,43,46,48,51,53,54,55,55,55,54,54,53,53,53,53,53,53,53,53,53,53,53,52,52,53,53,53,54,54,54,54,54,54,53,53,52,51,50,50,49,48,48,47,46,45,45,44,43,43,42,42,41,41,40,40,39,39,38,38,37,37,36,36,35,35,35,34,34,34,34,34,34,34,34,34,34,34,33,33,33,33,33,33,33,32,32,32,31,31,31,30,30,30,29,29,29,29,29,29,29,29,29,30,30,30,30,30,30,30,31,31,31,31,32,33,33,34,34,35,36,36,37,38,39,40,41,41,42,42,42,41,41,40,39,38,37,36,36,35,34,33,32,31,30,29,28,27,25,24,23,22,20,18,17,15,13,11,9,8,7,6,6,6,6,7,8,9,10,12,13,15,17,18,20,21,22,23,24,24,24,24,24,24,23,23,22,21,20,19,18,18,19,20,22,25,29,34,39,44,48,53,57,61,64,68,71,74,78,81,84,87,90,92,93,93,94,94,95,96,97,98,98,97,95,90,82,71,58,43,28,13,0,-10,-17,-21,-22,-22,-21,-22,-24,-29,-36,-44,-53,-62,-69,-75,-78,-79,-79,-78,-77,-76,-77,-77,-76,-74,-70,-64,-56,-47,-40,-36,-36,-43,-56,-74,-96,-120,-141,-155,-158,-146,-117,-67,2,91,195,311,432,551,660,750,814,847,845,805,731,627,500,360,215,77,-47,-149,-225,-274,-298,-301,-287,-263,-235,-208,-186,-171,-163,-161,-164,-168,-171,-170,-165,-155,-139,-119,-97,-74,-52,-33,-17,-6,2,6,7,7,5,3,0,-3,-5,-8,-11,-13,-15,-17,-18,-17,-15,-11,-6,0,7,15,22,30,38,45,53,60,66,73,78,83,86,88,88,88,86,84,81,79,76,74,72,70,68,67,66,65,65,65,65,65,66,67,69,70,72,74,75,77,78,79,79,79,79,79,78,76,74,73,71,69,67,65,64,62,61,59,57,56,54,52,50,48,46,44,43,41,39,37,35,33,30,29,27,26,25,25,26,26,27,27,28,29,29,29,30,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,46,47,48,49,50,50,50,50,49,48,47,46,45,44,43,42,41,40,39,37,36,34,33,31,29,28,26,24,22,20,18,15,13,11,8,7,5,4,4,4,4,5,6,7,8,9,10,11,12,14,15,16,18,19,19,20,21,21,22,22,23,24,25,25,26,27,27,28,29,29,30,31,32,32,33,34,34,35,35,35,35,35,35,36,37,38,40,41,42,43,44,45,45,46,47,48,50,51,53,54,55,56,56,56,55,55,54,53,53,52,51,51,50,49,49,48,47,47,46,46,45,45,45,45,44,44,44,44,43,43,43,42,42,42,42,41,41,40,40,39,39,38,38,38,38,38,37,37,36,36,35,34,34,33,32,32,31,30,30,29,28,27,26,25,24,24,24,24,24,24,25,25,26,26,27,27,28,28,28,29,29,30,30,30,30,30,29,29,29,28,28,28,28,28,28,28,28,28,28,28,29,30,30,31,32,33,34,35,35,36,37,38,38,40,41,42,43,45,47,49,51,54,57,60,64,66,69,70,71,72,71,70,69,67,66,64,63,61,59,56,53,50,47,44,41,39,38,37,36,35,33,31,27,24,20,17,14,12,10,9,8,5,2,-2,-6,-11,-14,-16,-16,-13,-8,-2,4,9,11,12,9,5,0,-7,-13,-20,-27,-38,-52,-70,-95,-123,-155,-185,-212,-230,-237,-231,-209,-174,-127,-70,-6,63,137,214,295,381,470,560,648,728,792,834,847,827,772,683,567,431,286,142,9,-105,-195,-261,-303,-325,-331,-328,-319,-307,-295,-283,-270,-258,-243,-227,-210,-191,-173,-157,-142,-129,-119,-111,-104,-98,-91,-84,-77,-70,-63,-57,-53,-49,-47,-45,-43,-41,-38,-34,-30,-25,-20,-15,-11,-7,-3,0,3,5,8,11,14,17,19,22,23,25,26,27,28,28,29,31,32,33,34,36,36,37,38,38,38,38,38,38,38,38,38,38,38,37,37,37,36,36,36,36,37,37,38,38,39,39,40,41,42,43,44,45,46,47,48,48,48,48,47,46,46,45,44,43,43,42,42,41,40,39,39,38,37,37,36,36,35,35,35,34,34,34,33,32,32,32,31,31,30,30,30,30,29,29,29,28,28,28,28,28,27,27,27,27,26,26,25,25,24,24,23,22,22,21,20,20,19,18,18,18,17,18,18,18,18,19,19,20,20,20,20,21,21,22,22,22,23,23,24,24,24,25,25,26,26,26,27,27,28,28,28,29,29,29,29,29,29,28,28,28,28,27,27,27,27,27,26,26,26,26,26,25,25,25,24,24,24,23,23,23,22,22,22,22,22,22,22,22,22,22,22,23,23,23,24,24,24,24,24,24,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,25,26,26,26,27,27,27,28,28,28,29,29,30,30,31,31,31,31,30,30,30,30,30,30,30,30,30,30,29,29,29,29,30,31,32,33,34,35,36,37,37,37,38,38,39,40,42,44,46,48,51,54,57,60,63,67,71,76,81,85,89,91,93,94,93,92,89,86,82,77,72,67,62,56,50,45,40,35,31,27,22,18,14,9,5,0,-4,-7,-10,-12,-14,-16,-18,-21,-26,-31,-37,-43,-48,-52,-55,-56,-56,-55,-54,-53,-52,-51,-50,-48,-44,-39,-33,-26,-20,-15,-14,-16,-24,-37,-54,-76,-99,-123,-144,-161,-169,-165,-145,-105,-41,47,159,291,436,587,730,853,944,993,994,946,850,717,556,383,211,53,-80,-182,-252,-290,-302,-293,-270,-241,-211,-183,-160,-143,-130,-122,-116,-113,-110,-109,-107,-106,-103,-101,-97,-93,-87,-81,-75,-68,-61,-54,-47,-40,-33,-26,-19,-11,-3,5,13,21,29,35,41,45,49,52,55,58,60,62,63,65,66,67,68,69,69,70,70,70,71,71,71,71,71,70,70,70,70,69,69,69,69,68,68,67,67,67,66,66,65,65,64,64,64,63,63,63,62,62,62,61,61,61,60,60,60,60,59,59,59,59,59,59,58,58,58,58,58,58,58,58,58,59,59,59,59,59,59,59,59,59,60,60,60,61,61,62,62,62,63,63,63,64,64,64,65,65,65,66,65,65,65,64,63,63,62,62,62,62,62,62,62,61,60,59,58,56,55,53,51,49,47,45,43,41,38,35,33,31,29,29,29,30,32,34,37,39,42,44,46,48,50,52,54,57,60,63,66,70,73,76,79,83,87,91,96,100,105,110,115,118,121,123,124,124,123,122,120,118,115,112,109,105,102,99,96,93,91,89,87,86,86,85,85,85,85,86,87,89,91,92,93,93,92,89,85,79,71,63,54,45,36,28,19,10,0,-9,-19,-28,-37,-45,-51,-56,-60,-63,-65,-67,-70,-74,-78,-83,-88,-93,-97,-100,-100,-100,-97,-95,-91,-89,-86,-84,-83,-81,-80,-77,-74,-71,-66,-61,-57,-52,-49,-45,-43,-40,-38,-36,-33,-30,-27,-23,-20,-16,-13,-11,-8,-6,-4,-2,0,2,4,6,7,9,10,11,12,13,14,16,17,19,21,23,25,27,29,31,34,36,39,41,44,46,49,51,53,54,56,57,58,59,59,60,59,59,59,58,58,58,58,59,60,61,62,63,63,64,65,66,67,69,71,73,76,78,79,80,80,79,78,77,75,74,73,72,70,68,65,60,56,51,46,42,39,38,37,36,34,31,27,23,17,13,10,9,10,13,16,19,19,15,7,-5,-19,-33,-46,-54,-58,-56,-51,-43,-36,-30,-27,-26,-28,-29,-29,-26,-20,-12,-3,6,12,18,25,38,63,106,172,262,374,503,636,761,863,929,949,920,843,725,579,420,262,119,0,-89,-149,-183,-196,-195,-186,-175,-163,-153,-143,-132,-119,-103,-85,-66,-47,-30,-17,-7,-2,0,-1,-2,-3,-4,-4,-3,-3,-4,-5,-7,-10,-11,-12,-11,-8,-4,2,9,17,24,31,37,44,49,55,62,68,73,79,83,86,88,89,89,88,87,85,84,83,82,81,80,79,78,77,76,75,75,75,75,75,76,76,77,78,78,78,78,78,79,79,79,79,79,78,78,77,76,75,74,73,72,71,71,70,70,69,69,68,68,68,67,67,67,66,66,66,66,66,66,65,65,65,64,64,64,63,63,62,62,61,61,61,60,60,59,59,58,58,57,57,56,55,55,54,53,52,52,51,50,49,48,48,47,46,46,45,45,45,45,46,46,46,46,47,47,47,47,47,48,48,48,48,49,49,49,49,49,49,50,50,50,50,50,50,51,51,51,51,51,51,51,51,50,50,50,50,50,50,50,50,49,49,49,49,49,49,48,48,48,48,48,48,48,48,48,48,48,47,47,47,47,47,47,47,47,46,46,46,46,46,46,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,45,44,44,43,43,43,42,43,43,43,43,43,43,43,43,42,41,40,40,39,39,39,39,39,39,38,38,38,37,36,36,36,35,35,35,35,36,36,36,36,36,36,36,36,36,36,37,37,37,37,37,37,37,37,37,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,38,37,37,37,37,37,37,37,36,36,36,36,35,35,35,35,35,35,35,34,34,34,34,34,34,34,35,35,35,36,36,36,36,36,35,35,35,36,37,38,39,40,42,44,46,48,50,52,54,55,57,58,58,58,58,58,58,57,57,56,55,54,53,51,51,50,50,51,52,53,52,48,41,30,14,-5,-27,-48,-66,-79,-86,-86,-81,-72,-63,-57,-56,-64,-78,-99,-123,-146,-163,-173,-171,-158,-134,-100,-60,-13,38,96,160,233,315,404,497,586,663,718,741,726,670,573,444,293,135,-17,-147,-247,-310,-337,-332,-303,-261,-216,-176,-147,-132,-128,-133,-143,-153,-160,-160,-155,-145,-132,-118,-105,-93,-82,-73,-64,-54,-43,-30,-16,-2,11,22,31,36,38,38,37,35,33,32,32,32,31,30,29,27,24,20,17,15,13,13,13,14,16,17,18,19,19,19,18,17,17,16,15,15,16,16,17,18,18,19,20,21,21,22,22,23,23,24,25,27,28,29,31,32,34,36,38,39,41,44,46,47,49,51,52,52,53,53,52,52,51,51,50,50,50,49,49,48,48,47,47,46,45,44,44,43,43,42,41,41,40,39,38,37,37,36,36,36,36,37,38,39,39,40,41,42,42,43,44,44,45,46,48,49,50,51,52,53,55,56,57,59,61,62,64,65,67,68,68,69,69,68,68,67,67,66,66,65,64,64,63,62,61,61,60,59,59,58,58,58,57,57,57,56,56,55,55,54,54,53,53,53,52,52,52,51,51,51,50,50,50,50,49,49,49,49,48,48,47,47,46,45,45,44,43,43,42,41,40,40,39,38,38,38,38,38,39,39,39,40,40,41,41,41,42,42,43,43,43,44,44,45,45,45,46,46,46,47,47,47,48,48,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,49,48,48,48,48,48,48,48,48,48,48,48,48,48,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,48";
          $rootScope.lead2PythonSocketSuccess = true;
          HigiKioskStorageService.saveSessionData('sixleadZugECGlead2SmoothGraph', PFData.split(","));
          $scope.stablecount(RRIntervalArrayDiff, $scope.leadMode);
          if ($scope.errorCount < 3) {
            var CommaseperatedString1 = HigiKioskStorageService.returnSessionData('LeadOneSixSecondsECGDataSixLead');
            pythonSocket(CommaseperatedString1.join(), 1);
          }
          $rootScope.lead6PythonSocketSuccess = true;
          $rootScope.lead5PythonSocketSuccess = true;
          $rootScope.lead4PythonSocketSuccess = true;
          $rootScope.lead3PythonSocketSuccess = true;
          var FilteredRPeakDataArray = [];
          var JSONData = JSON.parse(JsonString);
          var FilteredRPeakData = JSONData.RPEAK;
          //var FilteredRPeakData = "370,685,982,1274,1579,1919,2388,2800,3240,3674";
          //perfect 1 s 2 var FilteredRPeakData = "372,758,1145,1537,1925,2312,2707,3087,3482,3880";
          //perfect 2 var FilteredRPeakData = "355,732,1098,1453,1790,2129,2457,2782,3089,3395,3697";
          //perfect 2 var FilteredRPeakData = "209,528,845,1162,1484,1809,2195,2502,2821,3154,3477,3804";
          //corrected var FilteredRPeakData = "539,934,1338,1740,2136,2539,2935,3329,3733";
          //perfect 2 s 2 var FilteredRPeakData = "341,776,1189,1611,2068,2569,3079,3585";
          //var FilteredRPeakData = "418,859,1329,1770,2209,2732,3220,3652";
          HigiKioskStorageService.saveSessionData('RPeakDataLead2', FilteredRPeakData.split(','));
          var CommaseperatedString8 = HigiKioskStorageService.returnSessionData('LeadEightSixSecondsECGDataSixLead').join();
          HigiKioskStorageService.saveSessionData('sixleadZugECGlead8SmoothGraph', CommaseperatedString8);
          var CommaseperatedString9 = HigiKioskStorageService.returnSessionData('LeadNineSixSecondsECGDataSixLead').join();
          HigiKioskStorageService.saveSessionData('sixleadZugECGlead9SmoothGraph', CommaseperatedString9);
        }
      }
    }
    else {
      console.log("Error occured in filter python callback");
      $scope.cc++;
      $scope.errorCount++;
      $scope.initialRun = false;
      $scope.errorOccured = true;
      if ($scope.errorCount == 3) {
        $scope.initialRun = true;
        $scope.errorCount = 0;
        $scope.errorOccured = false;
        $scope.ZugThreeLeadModeLeadIIICompleted();
      }
    }
  }

  function pythonSocket(full_data, readingLead) {
    $scope.responseFromZugECG = true;
    $scope.leadMode = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
    if ($scope.leadMode == 6 && readingLead == 2) {
      console.log("ECGLead2RawData of 6 leadmode");
      //console.log(full_data);
      //console.log(readingLead);
      let sixLead2RawECGData = {
        "full_data":full_data,
        "readingLead":readingLead
      }
      $rootScope.StoreECGRawDataForAnalysis.push(sixLead2RawECGData);
    }
    else if ($scope.leadMode == 6 && readingLead == 1) {
      console.log("ECGLead1RawData of 6 leadmode");
      //console.log(full_data);
      //console.log(readingLead);
      let sixLead1RawECGData = {
        "full_data":full_data,
        "readingLead":readingLead
      }
      $rootScope.StoreECGRawDataForAnalysis.push(sixLead1RawECGData);
    }
    else if ($scope.leadMode == 3 && readingLead == 1) {
      console.log("ECGLead1RawData of 3 leadmode");
      //console.log(full_data);
      //console.log(readingLead);
      let threeLead1RawECGData = {
        "full_data":full_data,
        "readingLead":readingLead
      }
      $rootScope.StoreECGRawDataForAnalysis.push(threeLead1RawECGData);
    }
    else if ($scope.leadMode == 3 && readingLead == 2) {
      console.log("ECGLead2RawData of 3 leadmode");
      //console.log(full_data);
      //console.log(readingLead);
      let threeLead2RawECGData = {
        "full_data":full_data,
        "readingLead":readingLead
      }
      $rootScope.StoreECGRawDataForAnalysis.push(threeLead2RawECGData);
    }
    else if ($scope.leadMode == 3 && readingLead == 3) {
      console.log("ECGLead3RawData of 3 leadmode");
      //console.log(full_data);
      //console.log(readingLead);
      let threeLead3RawECGData = {
        "full_data":full_data,
        "readingLead":readingLead
      }
      $rootScope.StoreECGRawDataForAnalysis.push(threeLead3RawECGData);
    }
    JkioskService.FilteredDataForECG($scope.FilteredDataForECGCallback, full_data, readingLead);
  }

  var xAxisStripLinesArray = [];
  var yAxisStripLinesArray = [];
  var xAxisStripLinesArray1 = [];
  var yAxisStripLinesArray1 = [];

  var dps = [];
  var dps1 = [];

  var dataPointsArray = new Array();
  var dataPointsArray1 = new Array();

  $scope.localResultChart = function (leadonedatastring) {
    // alert("localResultChart");
    var chart = new CanvasJS.Chart("ecg_result_one",
      {
        backgroundColor: "#ffffff",
        title: {
          text: $scope.interfaceLabels[$scope.ECGLead1],
        },
        axisY: {
          stripLines: yAxisStripLinesArray,
          gridThickness: 1.5,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 500,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }

        },
        axisX: {
          stripLines: xAxisStripLinesArray,
          gridThickness: 2,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 100,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }
        },
        data: [
          {
            type: "spline",
            color: "black",
            dataPoints: dps,
            lineThickness: 1
          }
        ]
      });
    for (var h = 0; h < leadonedatastring.length; h++) {
      dataPointsArray.push(parseFloat(leadonedatastring[h]));
    }

    chart.options.axisY.maximum = findMaxCealing(dataPointsArray);
    chart.options.axisY.minimum = findMinCealing(dataPointsArray);

    var diffceal = (findMaxCealing(dataPointsArray) - findMinCealing(dataPointsArray)) / 500;
    if (diffceal == 2) {
      chart.options.axisX.minimum = 700;
      chart.options.axisX.maximum = 1500;
    } else if (diffceal == 3) {
      chart.options.axisX.minimum = 500;
      chart.options.axisX.maximum = 1500;
    } else if (diffceal == 4) {
      chart.options.axisX.minimum = 100;
      chart.options.axisX.maximum = 1500;
    }
    addDataPointsAndStripLines();
    chart.render();
  }

  function addDataPointsAndStripLines() {

    for (var i = 0; i < dataPointsArray.length; i++) {
      dps.push({ y: dataPointsArray[i] });
    }

    //StripLines
    for (var i = -1000; i < 3000; i = i + 100) {
      if (i % 500 != 0)
        yAxisStripLinesArray.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
    for (var i = -1000; i < 2500; i = i + 20) {
      if (i % 100 != 0)
        xAxisStripLinesArray.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
  }
  function addDataPointsAndStripLines1() {

    for (var i = 0; i < dataPointsArray1.length; i++) {
      dps1.push({ y: dataPointsArray1[i] });
    }

    //StripLines
    for (var i = -1000; i < 3000; i = i + 100) {
      if (i % 500 != 0)
        yAxisStripLinesArray1.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
    for (var i = -1000; i < 2500; i = i + 20) {
      if (i % 100 != 0)
        xAxisStripLinesArray1.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
  }
  var xAxisStripLines = [];
  var yAxisStripLines = [];
  var dp = [];
  var dataPoint = new Array();
  var xAxisStripLines1 = [];
  var yAxisStripLines1 = [];
  var dp1 = [];
  var dataPoint1 = new Array();

  function arrayMin(arr) {
    return arr.reduce(function (p, v) {
      return (p < v ? p : v);
    });
  }

  function arrayMax(arr) {
    return arr.reduce(function (p, v) {
      return (p > v ? p : v);
    });
  }

  function findMinCealing(dataPoint) {
    // finding minimum and maximum number from array

    var minnum = arrayMin(dataPoint);

    // cealing to nearest max  and min

    var clealedmin = Math.ceil(minnum / 500) * 500;

    //adjusting the ceailing to max and min of 500

    if (clealedmin > minnum) {
      clealedmin = clealedmin - 500;
    } else {
      clealedmin = clealedmin;
    }
    return clealedmin;
  }

  function findMaxCealing(dataPoint) {
    // finding minimum and maximum number from array
    var maxnum = arrayMax(dataPoint);
    // cealing to nearest max  and min
    var clealedmax = Math.ceil(maxnum / 500) * 500;
    //adjusting the ceailing to max and min of 500
    if (clealedmax < maxnum) {
      clealedmax = clealedmax + 500;
    } else {
      clealedmax = clealedmax;
    }
    return clealedmax;
  }
  $scope.localResult = function (leadtwodatastring) {
    // alert("localResultChart");
    var chart2 = new CanvasJS.Chart("ecg_result_two",
      {
        backgroundColor: "#ffffff",
        title: {
          text: $scope.interfaceLabels[$scope.ECGLead2],
        },
        axisY: {
          stripLines: yAxisStripLinesArray,
          gridThickness: 1.5,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 500,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }

        },
        axisX: {
          stripLines: xAxisStripLinesArray,
          gridThickness: 2,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 100,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }
        },
        data: [
          {
            type: "spline",
            color: "black",
            dataPoints: dp,
            lineThickness: 1
          }
        ]
      });
    for (var h = 0; h < leadtwodatastring.length; h++) {

      dataPoint.push(parseFloat(leadtwodatastring[h]));
    }

    // setting the max min to the chart
    chart2.options.axisY.maximum = findMaxCealing(dataPoint);
    chart2.options.axisY.minimum = findMinCealing(dataPoint);

    var diffceal = (findMaxCealing(dataPoint) - findMinCealing(dataPoint)) / 500;
    if (diffceal == 2) {
      chart2.options.axisX.minimum = 700;
      chart2.options.axisX.maximum = 1500;
    } else if (diffceal == 3) {
      chart2.options.axisX.minimum = 500;
      chart2.options.axisX.maximum = 1500;
    } else if (diffceal == 4) {
      chart2.options.axisX.minimum = 100;
      chart2.options.axisX.maximum = 1500;
    }
    addDataPointsAndStrip();
    chart2.render();
  }

  function addDataPointsAndStrip() {

    for (var i = 0; i < dataPoint.length; i++) {
      dp.push({ y: dataPoint[i] });
    }
    //StripLines
    for (var i = -1000; i < 3000; i = i + 100) {
      if (i % 500 != 0)
        yAxisStripLines.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
    for (var i = -1000; i < 2500; i = i + 20) {
      if (i % 100 != 0)
        xAxisStripLines.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
  }
  function addDataPointsAndStrip1() {
    for (var i = 0; i < dataPoint1.length; i++) {
      dp1.push({ y: dataPoint1[i] });
    }
    //StripLines
    for (var i = -1000; i < 3000; i = i + 100) {
      if (i % 500 != 0)
        yAxisStripLines1.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
    for (var i = -1000; i < 2500; i = i + 20) {
      if (i % 100 != 0)
        xAxisStripLines1.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
  }
  var xAxisStrip = [];
  var yAxisStrip = [];

  var dps3 = [];
  var data3 = new Array();

  $scope.localResult3 = function (leadthreedatastring) {
    // alert("localResultChart");
    var chart3 = new CanvasJS.Chart("ecg_result_three",
      {
        backgroundColor: "#ffffff",
        title: {
          text: $scope.interfaceLabels[$scope.ECGLead3],
        },
        axisY: {
          stripLines: yAxisStripLinesArray,
          gridThickness: 1.5,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 500,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }

        },
        axisX: {
          stripLines: xAxisStripLinesArray,
          gridThickness: 2,
          gridColor: "#f495c2",
          lineColor: "#f495c2",
          interval: 100,
          tickColor: "#f495c2",
          labelFontColor: "#f495c2",
          labelFormatter: function () { return " "; }
        },
        data: [
          {
            type: "spline",
            color: "black",
            dataPoints: dps3,
            lineThickness: 1
          }
        ]
      });

    for (var h = 0; h < leadthreedatastring.length; h++) {
      data3.push(parseFloat(leadthreedatastring[h]));
    }

    chart3.options.axisY.maximum = findMaxCealing(data3);
    chart3.options.axisY.minimum = findMinCealing(data3);

    var diffceal = (findMaxCealing(data3) - findMinCealing(data3)) / 500;
    if (diffceal == 2) {
      chart3.options.axisX.minimum = 700;
      chart3.options.axisX.maximum = 1500;
    } else if (diffceal == 3) {
      chart3.options.axisX.minimum = 500;
      chart3.options.axisX.maximum = 1500;
    } else if (diffceal == 4) {
      chart3.options.axisX.minimum = 100;
      chart3.options.axisX.maximum = 1500;
    }
    addDataPoints();
    chart3.render();
  }

  function addDataPoints() {
    for (var i = 0; i < data3.length; i++) {
      dps3.push({ y: data3[i] });
    }
    //StripLines
    for (var i = -1000; i < 3000; i = i + 100) {
      if (i % 500 != 0)
        yAxisStrip.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
    for (var i = -1000; i < 2500; i = i + 20) {
      if (i % 100 != 0)
        xAxisStrip.push({ value: i, thickness: 0.5, color: "#f495c2" });
    }
  }

}]);
