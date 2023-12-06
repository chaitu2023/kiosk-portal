higiKioskControllers.controller('HigiKioskWeightController4' , ['$scope', '$location','$routeParams' , '$rootScope', 'HigiKioskStorageService' , 'HigiKioskUtilitiesService', 'JkioskService','$timeout' , 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', function($scope, $location, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService ){

    
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.nextTransitionStyle = 'button-exit-right';
        $scope.nextVisible = false;
    };

    $scope.audioFiles = [
        {filename : 'bmc01_audio01'},
        {filename : 'bmc01_audio02'},
        {filename : 'bmc01_audio03'},
        {filename : 'bmc01_audio04'}
    ];

$scope.ECGSwitchOnCallbackFunction=function(response){
        $scope.switchOnStatus = response.ecgONStatus;
        console.log("BMCONStatus in callback   "+$scope.switchOnStatus);
        if($scope.switchOnStatus){
            $scope.startBodyComp();
        }
        else{
            $('#bmcRegret').show();
            setTimeout(function() {
            $('#bmcRegret').hide();
                window.location = "#/finish/forward";
            }, 2000);
        }
    }

   $scope.startBMC=function(){
        $scope.nextVisible = true;
        // JkioskService.callZugECGSwitchOnFunction($scope.ECGSwitchOnCallbackFunction);
    };

    $scope.takeTestButton = function () {
        $scope.nextVisible = false;
        JkioskService.callZugECGSwitchOnFunction($scope.ECGSwitchOnCallbackFunction);
    }


    $rootScope.init = function(){
//        document.getElementById("splash_logo").style.display = "block";
        //$rootScope.showExitButton = false;
       $scope.skipBMCClicked = false;
       $rootScope.fullBodyBMCTest = false;
       $scope.skipbm = "global.skip";
       $scope.gentleholdhan = "global.holdhands";
       $scope.restwristt = "global.restwristt"; 
       $("#bmc_skip").show();

          
          if ($rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel != "a3" && $rootScope.hardwareAvailability["Body Composition"]) {
            //  alert("about to call startBMC");
            $scope.startBMC();
          }
          else if (!$rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel == "a3" && $rootScope.hardwareAvailability["Body Composition"]) {

              $scope.startBodyComp();
          }
        //  setTimeout(function() {
        //     if(!$scope.switchOnStatus){
        //       $('#bmcRegret').show();
        //     setTimeout(function() {
        //         $('#bmcRegret').hide();
        //         window.location = "#/finish/forward";
        //     }, 2000);
        //     }
        //  }, 15000);

        $timeout(function(){
            $rootScope.higiTopNavHidden = false;
            $rootScope.slideInNav = "slideIn";
        },1000);
        //$('.higi_top_nav_ng').show();
        $scope.nextSlideLink =  $scope.links.next.link;
        $scope.slideSubTitleInProgress = 'global.in.progress';
        $scope.continue = true;
        $scope.instructionTransition = '';
        $scope.bmcTestTransition = '';
        $scope.bmcTestVisible = false;

        $scope.pReject = function(code){
            console.log(code + " reject fired")
        };

        //Call arrays for promises that have animation and audio
        if($scope.retesting){
            console.log('BMC retesting');
            $scope.instructionTwo = [
                $scope.weightInstruction.bmcAnimationOne
            ];
            $scope.instructionThree = [
                $scope.weightInstruction.bmcAnimationTwo
            ];
            $scope.q = $q.defer();
            $timeout(function(){ $scope.q.resolve()}, 1000)

        } else {
            $scope.instructionTwo = [
                function(){
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                },
                $scope.weightInstruction.bmcAnimationOne
            ];


            $scope.instructionThree = [
                function(){
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
                },
                $scope.weightInstruction.bmcAnimationTwo
            ];
            $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);

        }



        $scope.q.promise
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue);})
            .then(function(){

               // $scope.startBodyComp();
                return $scope.bmcHandReadyPromise.promise})
            .then(function(){
$scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[3].filename], $scope);
                $scope.showBodyCompStatus()
            });
     };
    $scope.bmcConfirmModal = function(){
        //Loads confirmation modal
        //$scope.bmcConfirmModalAccept();

    };

    $scope.bmcConfirmNoDevice = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_implant_false", 'button', 'pressed');
        if(HigiKioskStorageService.returnSessionData('gender') != "m") {
            $scope.showImplantTest = false;
            //$scope.showWaistInput = false;
            $scope.showPregTest = true;
            $scope.showSkipTest = false;
            $scope.pregnantTransitionClass = "enter";
            $scope.implantTransitionClass = "exit";
            $scope.waistCirTransitionClass = "exit";
            $scope.errorTransitionClass = "";
        } else {
            $scope.bmcConfirmModalAccept();
        }
    };
    $scope.ImplantorPregnantSkipZugECGSwitchAbortCallbackFunction = function(response){
        $scope.showSkipTest = true;
        $scope.showImplantTest = false;
        //$scope.showWaistInput = false;
        $scope.showPregTest = false;
        $scope.pregnantTransitionClass = "exit";
        $scope.implantTransitionClass = "exit";
        $scope.waistCirTransitionClass = "exit";
        $scope.errorTransitionClass = "enter";
  
    }
    $scope.bmcConfirmSkipTest = function(condition) {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_true", 'button', 'pressed');
        HigiKioskStorageService.saveSessionData('bmcSkipped' , true);
        $scope.showSkipTest = true;
        $scope.showImplantTest = false;
        //$scope.showWaistInput = false;
        $scope.showPregTest = false;
        $scope.pregnantTransitionClass = "exit";
        $scope.implantTransitionClass = "exit";
        $scope.waistCirTransitionClass = "exit";
        $scope.errorTransitionClass = "enter";

    };

    /*$scope.bmcGetWaistValue = function(condition) {
         JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_waist_valueGot", 'button', 'pressed');
        if(HigiKioskStorageService.returnSessionData('gender') != "m") {
            $scope.showImplantTest = false;
            $scope.showWaistInput = false;
            $scope.showPregTest = true;
            $scope.showSkipTest = false;
            $scope.pregnantTransitionClass = "enter";
            $scope.implantTransitionClass = "exit";
            $scope.waistCirTransitionClass = "exit";
            $scope.errorTransitionClass = "";
        } else {
            $scope.bmcConfirmModalAccept();
        }
    }*/
    
    $scope.SkipBMCAbort = function(){
        JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunction);      
    }

    $scope.skipBMCOnly = function()
    {
        console.log("Skip btn clicked");
        if(!$scope.skipBMCClicked){
        $scope.skipBMCClicked = true;
        // If HPod is A3 no switch will be there . So no switching off BMC
		if($rootScope.giveMeKioskModel == "a3"){
		  if($rootScope.mode == "bpw"){
				var mode = "bpw";
				var currenttest = "Body Composition";
				var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
				$scope.nextSlide = nextTestPath;
				window.location = $scope.nextSlide;
				console.log($scope.nextSlide);
			}
			else
			{
                console.log("Else for skip");
				window.location = "#/finish/forward";
			}
		}
		else{
			JkioskService.stopBodyComposition($scope.SkipBMCAbort);    
		}			
      }
    }

    $scope.bmcConfirmModalAccept = function(condition){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_false", 'button', 'pressed');
        $scope.modalFadeClass = "";
        $scope.showImplantTest = false;
        //$scope.showWaistInput = false;
        $scope.showPregTest = false;
        $scope.showSkipTest = false;
        $scope.showWarning = false;
        $rootScope.bmcWarningsCleared = true;
        $rootScope.init(); 
    };

    $scope.bmcHandReady = function(){
        
        // document.getElementById("bmc_skip").style.display = "none";
        //callback passed into jkiosk to tell when to transfer to testing phase
        $scope.bmcHandReadyPromise.resolve();
        //$scope.$apply();
    };
    $scope.bmcHandRemoved = function() {
        $scope.bmcInstructionTransition = 'bmc-enter back';
        $scope.bmcTestTransition = 'bmc-leave back';
        $scope.$apply();
        $scope.retesting = false;
        var path = $location.path();
        if(path == "/weight4/forward"){
            $rootScope.init();
        }
        else if(path == "/finish/forward") {
            $rootScope.showExitButton = true;
        }
    };

    //If in testing mode, register hands removed method to be accessible by testing panel
    if($routeParams.testing == "testing" || $rootScope.testingMode) {
        $rootScope.bmcHandRemoved = $scope.bmcHandRemoved;
    }

    $scope.bmcProgressUpdate = function(resp) {
        //$('.higi_top_nav_ng').hide();
        $scope.bmcTestProgressValue = resp.progress;
        $scope.$apply();
    };
    $scope.nextSlide = function() {
        if($scope.skipBMCClicked == false){
            $timeout(function(){
                window.location = $scope.nextSlideLink;
            }, 5000);
        }else{
            // console.log("Came out");
            $scope.skipBMCClicked = false;
        }
    };
    $scope.ZugECGSwitchAbortCallbackFunction = function(response){
        var myJSON = response.ecgOFFStatus;
       // if(myJSON == true){
          // alert("BMC Switched OFF  "+myJSON);
            console.log("BMC Switched OFF")
            $scope.nextSlide();
            $scope.$apply();
      //  }
    }

   
  $scope.AlltestSkipZugECGSwitchAbortCallbackFunction = function(response){
              //  alert("BMC SwitchOFF Callback");

        if($rootScope.mode == "bpw"){

      var mode = "bpw";
        var currenttest = "Body Composition";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        $scope.nextSlide = nextTestPath;
        window.location = $scope.nextSlide;
        console.log($scope.nextSlide);
    }
    else
    {
        window.location = "#/finish/forward";
    }
}

    $scope.bmcResult = function(resp) {

        $scope.setSlideDirection('forward');
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'bmcResult', 'true');
        $scope.bmcResultResp = resp;
        HigiKioskStorageService.saveSessionData('fatRatio', resp.bodyFatPct);
        HigiKioskStorageService.saveSessionData('leanMassKg', resp.leanMassKg);
        HigiKioskStorageService.saveSessionData('hydrationPct', resp.hydrationPct);
        HigiKioskStorageService.saveSessionData('hardStopTriggered', resp.hardStopTriggered);
        HigiKioskStorageService.saveSessionData('bmcOhms', resp.ohms);
        $rootScope.showExitButton = true;
       // alert("Body Fat is   "+resp.bodyFatPct);
        //https://higidev.atlassian.net/browse/KP-435
        // If HPod is A3 no switch will be there . So moving to nextslide without switching off BMC
		if($rootScope.giveMeKioskModel == "a3"){
		  $scope.nextSlide();
		}
		else{
        JkioskService.callZugECGSwitchAbortFunction($scope.ZugECGSwitchAbortCallbackFunction);   
		}
    };

    $scope.showBodyCompStatus = function() {
        $scope.bmcInstructionTransition = 'bmc-leave';
        $scope.bmcTestTransition = 'bmc-enter';
        $scope.bmcTestVisible = true;
        $rootScope.disableExitLogout = true;
        // $("#bmc_skip").hide();

    };

    $scope.startBodyComp = function(){

        //jkiosk.startBodyComposition = function (birthDate, heightCm, weightKg, isMale, activityLevel, handsDetectedCallback, testResultCallback, timeoutCallback)
        console.log("birthDate inside bmc1 controller"  + HigiKioskStorageService.returnSessionData('birthdate'));
        JkioskService.startBodyComposition(
            HigiKioskStorageService.returnSessionData('birthdate'),
            HigiKioskStorageService.returnSessionData("height")*100,
            HigiKioskStorageService.returnSessionData("weight"),
            (HigiKioskStorageService.returnSessionData("gender") == "m" ),
            "Normal",
            $scope.bmcHandReady,
            $scope.bmcHandRemoved,
            $scope.bmcProgressUpdate,
            $scope.bmcResult,
            $scope.bmcHandRemoved
        )
    };

    /*$scope.waistvalue = function(){
        setTimeout(function(){
           $rootScope.targetFieldSet =$rootScope.fields.waist;
                $rootScope.showWaistCirInitScreen(true);
                $rootScope.keyboardShow();
        }, 1000);
                };*/


    $scope.bmcHandReadyPromise = $q.defer();
    $scope.bmcInstructionAnimationOneReady = $q.defer();
    $scope.bmcInstructionAnimationTwoReady = $q.defer();
    $scope.bmcgaugeready = $q.defer();
    $scope.skipTest = 'bodycomp.error.button';
    $scope.startTest = 'fullbodybmc1.startTest';
    /*if($rootScope.fullBodyBMCTest == true){
        //$rootScope.bcWaistCircumstanceInit();
        $rootScope.loadModal({id : 'waistCircumstancemodal'});
        //$scope.showWaistInput = true;
        //$scope.waistvalue();
    }else{
        $rootScope.showImplantTest = true;
    }*/
    $scope.showImplantTest = true;
    $scope.showPregTest = false;
    $scope.showSkipTest = false;

    $scope.pregnantTransitionClass = "";
    $scope.implantTransitionClass = "";
    $scope.errorTransitionClass = "";
    $scope.waistCirTransitionClass = "";
    //set links first to have correct pagename applied to modal events
    
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        $scope.links  = HigiKioskFlow.slideLinks('HigiKioskWeightController4', $scope.mode);
    //$scope.links = HigiKioskFlow.slideLinks('HigiKioskWeightController4', $scope);
    $scope.animationsReady = $q.all([$scope.bmcInstructionAnimationOneReady.promise , $scope.bmcInstructionAnimationTwoReady.promise]); //, $scope.bmcgaugeready.promise]);
    console.log("after animation");
    $scope.animationsReady
        .then(function(){
            //Set slide
            $rootScope.showInstructions = true;
            $scope.slideTitle = 'weight04.bmc.body.composition';
            $scope.slideSubTitle = 'global.instructions';
            $scope.bmcPlaceHands = 'weight04.bmc.place.hands';
            $scope.bmcStillHands = 'weight04.bmc.still.hands';
            $scope.bmcTestWillBegin = 'weight04.bmc.test.will.begin';
            $scope.bmcRemainStill = 'weight04.bmc.test.remain.still';
            $scope.bmcHandsRemovedWarning = 'weight04.bmc.hands.removed.warning';
            $scope.bmcTestProgress = "weight04.bmc.test.progress";


            
            if($rootScope.bmcWarningsCleared) {
                $rootScope.init();
            } else {
                $timeout(function() {
                    
                    $scope.showWarning = ($scope.showImplantTest || $scope.showPregTest || $scope.showSkipTest);
                }, 1000);
                $rootScope.higiTopNavHidden = true;
                $scope.modalFadeClass = "adFadeIn";
                $scope.bmcConfirmModal();
            }
        });

}]);