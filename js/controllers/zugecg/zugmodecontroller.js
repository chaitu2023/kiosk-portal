higiKioskControllers.controller('HigiKioskZUGEcgModeController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', function ($scope, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService) {

  $rootScope.ZugECGRightJackStatusCallbackFunction = function (response) {
    $scope.gotSwitchRsponse = true;
    console.log("RightJack Callback is " + response.ecgRightJackStatus);
    $rootScope.rightJackStatus = response.ecgRightJackStatus;
    if($rootScope.sixLeadECGonly == true){
        $rootScope.zugSixEcgLeadMode = true;
        $rootScope.rightJackStatus = true;
        HigiKioskStorageService.saveSessionData('zugEcgLeadMode', 6);
    } else {
      if ($rootScope.rightJackStatus) {
        $rootScope.zugSixEcgLeadMode = true;
        HigiKioskStorageService.saveSessionData('zugEcgLeadMode', 6);
      }
      else {
        $scope.checkLegON();
        $rootScope.zugThreeEcgLeadMode = true;
        HigiKioskStorageService.saveSessionData('zugEcgLeadMode', 3);
      }
    }

    if(!$rootScope.isTookECGorBCA){
      $scope.showWarning = true;
      $scope.showImplantTest = true;
      $scope.showPregTest = false;
      $scope.showSkipTest = false;
    } else {
      setTimeout(function() {
        window.location = $scope.nextSlide;        
      }, 2000);      
    }
  }

  $scope.ZugECGLegONStatusCallbackFunction = function (response) {
    $rootScope.legONStatus = response.ecgLegONStatus;
  }

  $scope.isJackPlugged = function () {
    JkioskService.callZugECGRightJackStatusFunction($rootScope.ZugECGRightJackStatusCallbackFunction);
    setTimeout(function() {
        $rootScope.showEcgLeadMode= false;
        $rootScope.showLoadScreen = false;
      if ($scope.gotSwitchRsponse == false) {
        console.log("No response from switch");
        $("#ECGNotAvailable").show();
        setTimeout(function() {
        $("#ECGNotAvailable").hide();       
        if ($rootScope.mode == "bpw") {
          var mode = "bpw";
          var currenttest = "ECG";
          var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
          window.location = nextTestPath;
        }
        else {
          window.location = "#/finish/forward";
        }  
        }, 3000);    
      }
    }, 10000);
  }

  $scope.checkLegON = function () {
    JkioskService.callZugECGLegONStatusFunction($scope.ZugECGLegONStatusCallbackFunction);
  }
 
  $scope.init = function () {
    $rootScope.ecgLeadMode = "ecg.mode"; 
    $rootScope.showLoadScreen = true;
    $rootScope.showEcgLeadMode= true;
    var zugEcgLeadMode = "";
    $rootScope.alertLegOut = 0;
    $rootScope.zugsixEcgLeadMode = false;
    $rootScope.zugthreeEcgLeadMode = false;
    $rootScope.zugsingleEcgLeadMode = false;
    $rootScope.showExitButton = false;
    $scope.ZugECGONStatus = false;
    $rootScope.rightJackStatus = false;
    $rootScope.legONStatus = false;
    $scope.gotSwitchRsponse = false;
    $scope.setSlideDirection($routeParams.direction);

    HigiKioskFlow.setGlobalNav('HigiKioskZUGEcgModeController');
    
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgModeController', $scope.mode);
    //var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgModeController', $rootScope.mode);
    $scope.isJackPlugged();

    $scope.isBpw = ($scope.mode == "bpw") ? true : false;
    $scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
    $scope.skipTest = "global.skip";
    $scope.nextSlide = links.next.link;
  };

  $scope.init();

     $scope.bmcConfirmNoDevice = function () {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_implant_false", 'button', 'pressed');
        if (HigiKioskStorageService.returnSessionData('gender') != "m") {
            $scope.showImplantTest = false;
            $scope.showPregTest = true;
            $scope.showSkipTest = false;
            $scope.pregnantTransitionClass = "enter";
            $scope.implantTransitionClass = "exit";
            $scope.waistCirTransitionClass = "exit";
            $scope.errorTransitionClass = "";
        } else {
            $scope.ecgConfirmModalAccept();
        }
    };
    $scope.ImplantorPregnantSkipZugECGSwitchAbortCallbackFunction = function (response) {
        $scope.showSkipTest = true;
        $scope.showImplantTest = false;
        $scope.showPregTest = false;
        $scope.pregnantTransitionClass = "exit";
        $scope.implantTransitionClass = "exit";
        $scope.errorTransitionClass = "enter";

    }
    $scope.bmcConfirmSkipTest = function (condition) {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_true", 'button', 'pressed');
        HigiKioskStorageService.saveSessionData('bmcSkipped', true);
        $scope.showSkipTest = true;
        $scope.showImplantTest = false;
        $scope.showPregTest = false;
        $scope.pregnantTransitionClass = "exit";
        $scope.implantTransitionClass = "exit";
        $scope.errorTransitionClass = "enter";

    };
     $scope.ecgConfirmModalAccept = function (condition) {        
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_false", 'button', 'pressed');
            $scope.modalFadeClass = "";
            $scope.showImplantTest = false;
            $scope.showPregTest = false;
            $scope.showSkipTest = false;
            $scope.showWarning = false;
            $rootScope.bmcWarningsCleared = true;
            $rootScope.isTookECGorBCA = true;
            setTimeout(function() {
              window.location = $scope.nextSlide;        
            }, 500);
            
    };

    $scope.bmcConfirmModalAccept = function(condition){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_false", 'button', 'pressed');
        $scope.modalFadeClass = "";
        $scope.showImplantTest = false;
        //$scope.showWaistInput = false;
        $scope.showPregTest = false;
        $scope.showSkipTest = false;
        $scope.showWarning = false;
        $rootScope.bmcWarningsCleared = true;
        $rootScope.isTookECGorBCA = true;
        setTimeout(function() {
          window.location = $scope.nextSlide;        
        }, 500);
    };

    $scope.skipBMCOnly = function() {
      $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
      if ($scope.mode == "bpw") {
        var mode = "bpw";
        var currenttest = "ECG";
        var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
        //if ($rootScope.ecgPoorResult) {
          $timeout(function () {
            window.location = nextTestPath;
          }, 500);
        //}
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


}]);
