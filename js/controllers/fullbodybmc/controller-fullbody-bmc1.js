higiKioskControllers.controller('IHLHPodFullBodyBMCController', ['$scope', '$location', '$routeParams', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', function ($scope, $location, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService) {

    $scope.showinstructpage = 0; // this for to skip while the count is at 3

    $scope.nextButtonOut = function () {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.nextTransitionStyle = 'button-exit-right';
        $scope.nextVisible = false;
    };

    $scope.audioFiles = [
        { filename: 'bmc01_audio01' },
        { filename: 'bmc01_audio02' },
        { filename: 'bmc01_audio03' },
        { filename: 'bmc01_audio04' },
        { filename: 'bmc01_audio06' },
    ];

    $scope.ECGSwitchOnCallbackFunction = function (response) {
        
        $scope.switchOnStatus = response.ecgONStatus;
       // console.log("BMCONStatus in callback   " + $scope.switchOnStatus);
        if ($scope.switchOnStatus) {
        }
    }

    $scope.startBMC = function () {   
        if($scope.autocheckAgain == undefined){    
            $scope.nextVisible = true;
            $scope.autocheckAgain = false;
            // JkioskService.stopReadResistance($scope.stopReadResistanceInitialResponse);
        }else{
            $scope.nextVisible = false; 
            JkioskService.stopReadResistance($scope.stopReadResistanceInitialResponse);
        }
    };

    $scope.takeTestButton = function () {
        $scope.nextVisible = false;
        HigiKioskAnimationService.audioStop();
        $scope.showBodyCompStatus();
        JkioskService.stopReadResistance($scope.stopReadResistanceInitialResponse);
    };


    $rootScope.init = function () {
        JkioskService.callZugECGSwitchOnFunction($scope.ECGSwitchOnCallbackFunction);
        $scope.switchOffStatus = false;
        $scope.switchOnStatus = false;
        $scope.skipBMCClicked = false;
        $rootScope.fullBodyBMCTest = true;
        $scope.Z_val250 = 0.0;
        $scope.Z_val50 = 0.0;
        $scope.Z_val625 = 0.0;

        $scope.skipbmc = "fullbodybmc1.skip";
        $scope.startTest = "fullbodybmc1.startTest";
        $scope.gentleholdhan = "fullbodybmc1.holdhands";
        $scope.restwristt = "fullbodybmc1.restwristt";
        $scope.restLegsOnfootPads = "fullbodybmc1.restLegsOnfootPads";
        $scope.bmcProgress = "fullbodybmc1.bmc.progress";
        $("#bmc_skip").show();
        if ($rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel != "a3" && ($rootScope.hardwareAvailability["FullBodyCompositionAnalyser"])) {
            $scope.startBMC();         
        }
        $timeout(function () {
            $rootScope.higiTopNavHidden = false;
            $rootScope.slideInNav = "slideIn";
        }, 1000);
        //$scope.nextSlideLink = $scope.links.next.link;
        $scope.slideSubTitleInProgress = 'global.in.progress';
        $scope.continue = true;
        $scope.instructionTransition = '';
        $scope.bmcTestTransition = '';
        $scope.skipBtnBMC = false;
        $scope.skipTestInFullTest = true;        
        $scope.showinstructpage++;    
        // logic start for warning popup box 
        if ($scope.showinstructpage > 1) {            
            if ($scope.showinstructpage == 4) {
                $('#bmcconcluderesult').show();
                setTimeout(function() {
                    $('#bmcconcluderesult').hide();
                }, 6000);             
                $scope.showinstructpage = 0; 
                // $scope.skipBMCOnly();
                if($rootScope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide; 
                } else if($rootScope.selectedVital.length > 1){
                    var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                    $scope.nextSlide = nextTestPath;  
                    window.location = $scope.nextSlide;             
                } else { 
                    window.location = "#/finish/forward";
                }           
                return 0;
            } else {

                $('#bmcsignallost').show();
                setTimeout(function() {
                    $('#bmcsignallost').hide();
                }, 6000);        
            }
        }
        // logic end for warning popup box 

        $scope.bmcTestVisible = false;

        $scope.pReject = function (code) {
          //  console.log(code + " reject fired")
        };

        //Call arrays for promises that have animation and audio
        if ($scope.retesting) {
          //  console.log('BMC retesting');
            $scope.instructionTwo = [
                $scope.weightInstruction.fullBodyBmcAnimationOne
            ];
            $scope.instructionThree = [
                $scope.weightInstruction.fullBodyBmcAnimationTwo
            ];
            $scope.instructionFour = [
                $scope.weightInstruction.fullBodyBmcAnimationThree
            ];
            $scope.q = $q.defer();
            $timeout(function () { $scope.q.resolve() }, 1000)

        } else {
            $scope.instructionTwo = [
                function () {
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                },
                $scope.weightInstruction.fullBodyBmcAnimationOne
            ];

            $scope.instructionThree = [
                function () {
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
                },
                $scope.weightInstruction.fullBodyBmcAnimationTwo
            ];

            $scope.instructionFour = [
                function () {
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[4].filename], $scope);
                },
                $scope.weightInstruction.fullBodyBmcAnimationThree               
            ];

            $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);

        }

        $scope.q.promise
            .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue); })
            .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue); })
            .then(function () { return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue); })
            .then(function () {
                return $scope.bmcHandReadyPromise.promise
            })
            .then(function () {
                $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[3].filename], $scope);
                $scope.showBodyCompStatus()
            });
    };

       $scope.skipBMCOnly = function()
    {
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
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
                    } else if($rootScope.selectedVital.length > 1){
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;  
                        window.location = $scope.nextSlide;               
                    } else { 
                        setTimeout(function () {
                            window.location = "#/finish/forward";
                        }, 3000);
                    }
        }
        else{
            //JkioskService.stopBodyComposition($scope.SkipBMCAbort);    
            JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunction);
            setTimeout(function () {
   
                if($scope.switchOffStatus !=true){
                    JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
                
                    var url = $location.url();
                    if(url === "/fullbodybmc1/forward" || url === "/fullbodybmc2/forward"){
                        if($rootScope.mode == "bpw"){
                            var mode = "bpw";
                            var currenttest = "Body Composition";
                            var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                            $scope.nextSlide = nextTestPath;
                            window.location = $scope.nextSlide; 
                        } else if($rootScope.selectedVital.length > 1){
                            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                            $scope.nextSlide = nextTestPath;  
                            window.location = $scope.nextSlide;              
                        } else { 
                            setTimeout(function () {
                                window.location = "#/finish/forward";
                            }, 3000);
                        }
                    }
                    
                }
            }, 10000);
        }
      }
    }
    $scope.bmcConfirmModal = function () {
        //$scope.bmcConfirmModalAccept();
    };

    $scope.bmcConfirmNoDevice = function () {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_implant_false", 'button', 'pressed');
        if (HigiKioskStorageService.returnSessionData('gender') != "m") {
            $scope.showImplantTest = false;
            $scope.showPregTest = true;
            $scope.showSkipTest = false;
            $scope.showDisclaimer = false;
            $scope.pregnantTransitionClass = "enter";
            $scope.implantTransitionClass = "exit";
            $scope.waistCirTransitionClass = "exit";
            $scope.errorTransitionClass = "";
        } else {
            $scope.showImplantTest = false;
            $scope.showPregTest = false;
            $scope.showSkipTest = false;
            $scope.showDisclaimer = true;
            $scope.disclaimerTransitionClass = "enter";
            $scope.implantTransitionClass = "exit";
            $scope.waistCirTransitionClass = "exit";
            $scope.errorTransitionClass = "";

            // $scope.bmcConfirmModalAccept();
        }
    };
    $scope.bmcNoPregranent = function () {
        $scope.showImplantTest = false;
        $scope.showPregTest = false;
        $scope.showSkipTest = false;
        $scope.showDisclaimer = true;
        $scope.disclaimerTransitionClass = "enter";
        $scope.implantTransitionClass = "exit";
        $scope.waistCirTransitionClass = "exit";
        $scope.errorTransitionClass = "";
    };    

    $scope.ImplantorPregnantSkipZugECGSwitchAbortCallbackFunction = function (response) {
        $scope.showSkipTest = true;
        $scope.showImplantTest = false;
        $scope.showDisclaimer = false;
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
        $scope.showDisclaimer = false;
        $scope.pregnantTransitionClass = "exit";
        $scope.implantTransitionClass = "exit";
        $scope.errorTransitionClass = "enter";

    };

    $scope.bmcDisclamerOk = function (condition) {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_true", 'button', 'pressed');
        $scope.bmcConfirmModalAccept();
    };

    $scope.SkipBMCAbort = function (response) {
        JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunction);
    }

    $scope.skipFullBodyBMCOnly = function () {
        $("#bmc_skip").hide();
        HigiKioskStorageService.saveSessionData('bmc', undefined);
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
        if (!$scope.skipBMCClicked) {
            $scope.skipBMCClicked = true;
            $scope.skipBtnBMC = true;
            // If HPod is A3 no switch will be there . So no switching off BMC
            if ($rootScope.giveMeKioskModel == "a3") {
                if ($rootScope.mode == "bpw") {
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide;
                  //  console.log($scope.nextSlide);
                } else if ($rootScope.selectedVital.length > 1) {
                    var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                    $scope.nextSlide = nextTestPath;
                    $timeout(function () {
                      window.location = $scope.nextSlide;
                    }, 500);
                  } else {
                    window.location = "#/finish/forward";
                  }
            } else {
                JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunction);
                setTimeout(function () {
   
         if($scope.switchOffStatus !=true){
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
         if($rootScope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide; 
                    } else if($rootScope.selectedVital.length > 1){
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;  
                        window.location = $scope.nextSlide;     
                    } else { 
                        setTimeout(function () {
                            window.location = "#/finish/forward";
                        }, 3000);
                    }
            
        }
         }, 10000);
               JkioskService.stopBodyComposition($scope.SkipBMCAbort);
            }
        }
    }

    $scope.bmcConfirmModalAccept = function (condition) {
        
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + "_" + condition + "_false", 'button', 'pressed');
            $scope.modalFadeClass = "";
            $scope.showImplantTest = false;
            $scope.showDisclaimer = false;
            $scope.showPregTest = false;
            $scope.showSkipTest = false;
            $scope.showWarning = false;
            $rootScope.bmcWarningsCleared = true;            
            $rootScope.isTookECGorBCA = true;
            $rootScope.init();
    };

    $scope.bmcHandReady = function () {
       // console.log("Hand Ready");
        // document.getElementById("bmc_skip").style.display = "none";
        //callback passed into jkiosk to tell when to transfer to testing phase
        $scope.bmcHandReadyPromise.resolve();
    };
    $scope.bmcHandRemoved = function () {
       // console.log("Hand Removed");
        $scope.bmcInstructionTransition = 'bmc-enter back';
        $scope.bmcTestTransition = 'bmc-leave back';
        $scope.$apply();
        $scope.retesting = false;
        var path = $location.path();
        // Remove this during realtime testing from below line
       /* if (path == "/weight1/forward" ) {
            JkioskService.stopReadResistance($scope.stopReadResponse);
        }*/
        // Remove this during realtime testing till above line  
        
        if (path == "/fullbodybmc1/forward") {
            $scope.autocheckAgain = true;
            $rootScope.init();
        }
        else if (path == "/finish/forward") {
            $rootScope.showExitButton = true;
        }
    };

    //If in testing mode, register hands removed method to be accessible by testing panel
    if ($routeParams.testing == "testing" || $rootScope.testingMode) {
        $rootScope.bmcHandRemoved = $scope.bmcHandRemoved;
    }

    $scope.bmcProgressUpdate = function (resp) {
      //  console.log("Hand Progress");
        $scope.bmcTestProgressValue = resp.progress;
        $scope.$apply();
    };
    $scope.nextSlide = function () {
        if($scope.skipBtnBMC == false){
            $scope.skipTestInFullTest = false;
            $timeout(function () {
            //  window.location = $scope.nextSlideLink;
            window.location = "#/fullbodybmc2/forward";

            }, 5000);
        }else{
            // console.log("Else for full bmc", $scope.skipBtnBMC);
            $scope.skipBtnBMC = false;
        }
    };
    $scope.ZugECGSwitchAbortCallbackFunction = function (response) {
        var myJSON = response.ecgOFFStatus;
       // console.log("BMC Switched OFF")
        $scope.switchOffStatus = response.ecgOFFStatus;
        $scope.nextSlide();
        $scope.$apply();
    }


    $scope.AlltestSkipZugECGSwitchAbortCallbackFunction = function (response) {
        $scope.switchOffStatus = response.ecgOFFStatus;
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);

        var url = $location.url();
        if(url === "/fullbodybmc1/forward" || url === "/fullbodybmc2/forward"){
            if($rootScope.mode == "bpw"){
                var mode = "bpw";
                var currenttest = "Body Composition";
                var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                $scope.nextSlide = nextTestPath;
                window.location = $scope.nextSlide; 
            } else if($rootScope.selectedVital.length > 1){
                var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                $scope.nextSlide = nextTestPath;  
                window.location = $scope.nextSlide;            
            } else { 
                setTimeout(function () {
                    // alert("15");
                    window.location = "#/finish/forward";
                }, 3000);
            }
        }
    }

    // Full body BMC API calls starts

    $scope.getBodyCompositionParametersResponse = function (response) {
        var BMCoutput = JSON.stringify(response);
        alert(BMCoutput);
    }

    $scope.stopReadResponse = function (response) {
        $rootScope.init();
    }
    $scope.stopReadResistanceInitialResponse = function (response) {
        if ($scope.switchOnStatus != true) {
            $('#bmcRegret').show();
            setTimeout(function () {
                $('#bmcRegret').hide();
                  if($rootScope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide; 
                    } else if($rootScope.selectedVital.length > 1){
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;  
                        window.location = $scope.nextSlide; 
                        if ($scope.nextSlide == "#/finish/forward") {
                        }else{
                        }              
                    } else { 
                        setTimeout(function () {
                            window.location = "#/finish/forward";
                        }, 3000);
                    }
                }, 3000);
                //JkioskService.stopBodyComposition($scope.SkipBMCAbort);  
                    JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunction);
                     setTimeout(function () {
   
         if($scope.switchOffStatus !=true){
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
         if($rootScope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide; 
                    } else if($rootScope.selectedVital.length > 1){
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;  
                        window.location = $scope.nextSlide; 
                        if ($scope.nextSlide == "#/finish/forward") {
                        }else{
                        }              
                    } else { 
                        setTimeout(function () {
                            window.location = "#/finish/forward";
                        }, 3000);
                    }
            
        }
         }, 10000);
            }
            else{
               JkioskService.setBmcFrequency250($scope.setBmcFrequency250Response);         
            }
    }

    $scope.stopReadResistanceSkipResponse = function (response) {
      //  console.log('fullBodyBMCStopped during skip');
    }

    $scope.stopReadResistanceResponse = function (response) {
      //  console.log('fullBodyBMCStopped Reading');
        if ($scope.frequency250Set == true) {
            $scope.frequency250Set = false;
            JkioskService.setBmcFrequency50($scope.setBmcFrequency50Response);
        }
        else if ($scope.frequency50Set == true) {
            $scope.frequency50Set = false;
            JkioskService.setBmcFrequency625($scope.setBmcFrequency625Response);
        }
        else if ($scope.frequency625Set == true) {
            $scope.frequency625Set = false;
            $scope.setSlideDirection('forward');
            JkioskService.callZugECGSwitchAbortFunction($scope.ZugECGSwitchAbortCallbackFunction);
             setTimeout(function () {
   
         if($scope.switchOffStatus !=true){
        JkioskService.stopReadResistance($scope.stopReadResistanceSkipResponse);
         if($rootScope.mode == "bpw"){
                    var mode = "bpw";
                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    window.location = $scope.nextSlide; 
                    } else if($rootScope.selectedVital.length > 1){
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;  
                        window.location = $scope.nextSlide; 
                        if ($scope.nextSlide == "#/finish/forward") {
                        }else{
                        }              
                    } else { 
                        setTimeout(function () {
                            window.location = "#/finish/forward";
                        }, 3000);
                    }
            
        }
         }, 10000);
        }
    }

    $scope.setBmcFrequency625Response = function (response) {
        $scope.frequency625Set = true;
        JkioskService.readResistance($scope.bmcHandReady,
            $scope.bmcHandRemoved,
            $scope.bmcProgressUpdate,
            $scope.bmcResult,
            $scope.bmcHandRemoved)
    }

    $scope.setBmcFrequency50Response = function (response) {
        $scope.frequency50Set = true;
        JkioskService.readResistance($scope.bmcHandReady,
            $scope.bmcHandRemoved,
            $scope.bmcProgressUpdate,
            $scope.bmcResult,
            $scope.bmcHandRemoved);
    }

    $scope.setBmcFrequency250Response = function (response) {
        $scope.frequency250Set = true;
       // console.log('calling read resistance');
        JkioskService.readResistance($scope.bmcHandReady,
            $scope.bmcHandRemoved,
            $scope.bmcProgressUpdate,
            $scope.bmcResult,
            $scope.bmcHandRemoved)
    }

    $scope.bmcResult = function (resp) {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'bmcResult', 'true');
        $scope.bmcResultResp = resp;
            if ($scope.frequency250Set == true) {
                $scope.Z_val250 = $scope.bmcResultResp.ohms;
                console.log("250KHZ resistance");
                console.log($scope.Z_val250);
                HigiKioskStorageService.saveSessionData('ResistanceAt250', $scope.Z_val250);
            }
            else if ($scope.frequency50Set == true) {
                $scope.Z_val50 = $scope.bmcResultResp.ohms;
                console.log("50KHZ resistance");
                console.log($scope.Z_val50);
                HigiKioskStorageService.saveSessionData('ResistanceAt50', $scope.Z_val50);
            }
            else if ($scope.frequency625Set == true) {
                $scope.Z_val625 = $scope.bmcResultResp.ohms;
                console.log("625KHZ resistance");
                console.log($scope.Z_val625);
                HigiKioskStorageService.saveSessionData('ResistanceAt625', $scope.Z_val625);
            }
            JkioskService.stopReadResistance($scope.stopReadResistanceResponse);
        
        $rootScope.showExitButton = true;
    };

    $scope.showBodyCompStatus = function () {
        $scope.bmcInstructionTransition = 'bmc-leave';
        $scope.bmcTestTransition = 'bmc-enter';
        $scope.bmcTestVisible = true;
        $rootScope.disableExitLogout = true;
        // $("#bmc_skip").hide();

    };

    $scope.bmcHandReadyPromise = $q.defer();
    $scope.fullbodybmcInstructionAnimationOneReady = $q.defer();
    $scope.fullbodybmcInstructionAnimationTwoReady = $q.defer();
    $scope.fullbodybmcInstructionAnimationThreeReady = $q.defer();
    $scope.bmcgaugeready = $q.defer();
    $scope.skipTest = 'bodycomp.error.button';

    $scope.showImplantTest = true;
    $scope.showPregTest = false;
    $scope.showSkipTest = false;
    $scope.showDisclaimer = false;

    $scope.pregnantTransitionClass = "";
    $scope.implantTransitionClass = "";
    $scope.errorTransitionClass = "";
    $scope.waistCirTransitionClass = "";

    $scope.mode = HigiKioskStorageService.returnSessionData('current_mode');
    $scope.links = HigiKioskFlow.slideLinks('IHLHPodFullBodyBMCController', $scope.mode);
    $scope.animationsReady = $q.all([$scope.fullbodybmcInstructionAnimationOneReady.promise, $scope.fullbodybmcInstructionAnimationTwoReady.promise, $scope.fullbodybmcInstructionAnimationThreeReady.promise]); //, $scope.bmcgaugeready.promise]);
  //  console.log("after animation");
    $scope.animationsReady
        .then(function () {
            $rootScope.showInstructions = true;
            $scope.slideTitle = 'fullbodybmc1.title';
            $scope.slideSubTitle = 'text.instructions';
            $scope.bmcPlaceHands = 'weight04.bmc.place.hands';
            $scope.bmcStillHands = 'weight04.bmc.still.hands';
            $scope.bmcTestWillBegin = 'fullbodybmc1.will.begin';
            $scope.bmcRemainStill = 'weight04.bmc.test.remain.still';
            $scope.bmcHandsRemovedWarning = 'weight04.bmc.hands.removed.warning';
            
            if ($rootScope.bmcWarningsCleared && $rootScope.isTookECGorBCA) {
                $rootScope.init();
            } else {
                $timeout(function () {
                    $scope.showWarning = ($scope.showImplantTest || $scope.showPregTest || $scope.showSkipTest || $scope.showDisclaimer);
                }, 1000);
                $rootScope.higiTopNavHidden = true;
                $scope.modalFadeClass = "adFadeIn";
                $scope.bmcConfirmModal();
            }
        });
}]);