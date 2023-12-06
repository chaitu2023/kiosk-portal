higiKioskControllers.controller('HigiKioskBpController1' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService){

    $scope.slideTitle = 'bloodpressure1.title';
    $scope.slideSubTitle = 'text.instructions';
    $scope.slideIntructionOne = 'bloodpressure1.instruction1';
    $scope.slideIntructionTwo = 'bloodpressure1.instruction2';
    $scope.slideIntructionThree = 'bloodpressure1.instruction3';
    $scope.slideIntructionFour = 'bloodpressure1.instruction4';
    $scope.init = function(){
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskBpController1', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskBpController1', $scope);
        //$scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
        $scope.skipTestInFullTest = true;
        $scope.skipTest ="bloodpressure1.skip";
        $scope.instructionMinus = 'bloodpressure1.starttest';
        $scope.slideTitle = 'bloodpressure1.title';
        $scope.slideSubTitle = 'text.instructions';
        $scope.slideIntructionOne = 'bloodpressure1.instruction1';
        $scope.slideIntructionTwo = 'bloodpressure1.instruction2';
        $scope.slideIntructionThree = 'bloodpressure1.instruction3';
        $scope.slideIntructionFour = 'bloodpressure1.instruction4';
        $scope.bpDisclaimer = 'bloodpressure01.disclaimer';
        $scope.bpRedoError = 'bloodpressure01.redo.error';

        $scope.audioFiles = [
            {filename : 'bloodpressure01_audio01'},
            {filename : 'bloodpressure01_audio02'},
            {filename : 'bloodpressure01_audio03'},
            {filename : 'bloodpressure01_audio04'},
            {filename : 'bloodpressure01_audio05'},
            {filename : 'global.welcomeback'}
        ];

        //Audio Instructions as promises
        $scope.audioInstruction1 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        };
        $scope.audioInstruction2 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
        };
        $scope.audioInstruction3 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
        };
        $scope.audioInstruction4 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[3].filename], $scope);
        };

        //Slide instruction audio and animation directive bundles
        $scope.instructionOne = [
            $scope.audioInstruction1
        ];

        $scope.instructionTwo = [
            $scope.audioInstruction2,
            $scope.bpAnimate.instructionArm
        ];
        $scope.instructionThree = [
            $scope.audioInstruction3,
            $scope.bpAnimate.instructionPalm
        ];
        $scope.instructionFour = [
            $scope.audioInstruction4,
            $scope.bpAnimate.instructionRelax
        ];

        $scope.audioInstruction = function(audio){
            if($scope.continue) {
                var promiseAudio = HigiKioskAnimationService.playAudioPromise(audio, $scope);
                return promiseAudio.promise;
            }
        };

        $scope.setSlideDirection($routeParams.direction);
        $scope.retesting = ($routeParams.error == "error");
        $scope.isvisible = true;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        if(links.previous == null){
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        }else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = true;
        }
        $scope.continue = true;
        $scope.q =  $scope.audioInstruction1();
        $scope.q.promise
            .then(function(){
                //Set next button visible
                $scope.nextVisible = true;
                return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue);
            })
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue);})
            .then(function(){return $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[4].filename])});
    };
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.setSlideDirection('forward');
        $scope.continue = false;
        $scope.q.reject();
        HigiKioskAnimationService.audioStop();
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = $scope.nextSlide;
        },500);
    };


    //To skip current test while doing complete Test

    $scope.skipTestClick = function(){

        //Breaks promise chain
        $scope.continue = false;
        $scope.q.reject();

        if($scope.audioPlaying){
            try{
                HigiKioskAnimationService.audioStop();
            } catch (e){

            }
        }
        if($scope.mode == "bpw"){
            //Log event
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_skipWeight', 'button', 'pressed');
            
            //Remove seat watch to prevent audio from playing
            //$scope.seatWatch();
            $timeout(function(){
        var mode = "bpw";

        var currenttest = "Blood Pressure";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        window.location = nextTestPath;
        console.log($scope.nextSlide);
                //window.location = "index.html#/weight1/forward";
              //  window.location = "index.html#/zugecgmode/forward";
            },0,false);
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;
            $timeout(function(){
                window.location =  $scope.nextSlide;
            },500);         
        } else{
            window.location = "#/finish/forward";
        }
    };

    //Wait for directive animations
    $scope.bpAnimationArmReady = $q.defer();
    $scope.bpAnimationPalmReady = $q.defer();
    $scope.bpAnimationRelaxReady = $q.defer();

    $scope.animationsReady = $q.all([$scope.bpAnimationArmReady.promise, $scope.bpAnimationPalmReady.promise, $scope.bpAnimationRelaxReady.promise]);

    //Total number of animations from directives
    //to ensure are all are set and ready
    $scope.animationsReady
    .then(function(){
        if ($rootScope.clearBpWarningModalMessage) {
            $scope.init();
        }else{
           $scope.showBPWarningModalBox = true;
            $timeout(function() {  
                $scope.showBPWarning = true;
            }, 1000);
            $rootScope.higiTopNavHidden = true;
            $scope.bpwarningModalBoxEnterExit = "enter";
            $scope.bpModalFadeClass = "adFadeIn"; 
        }
        
    });

    $scope.bpWarningModalButtonClicked = function(buttonClicked){
        if (buttonClicked == 'skipTest') {
            $scope.bpwarningModalBoxEnterExit = "exit";
            $scope.bpModalFadeClass = "";
            $scope.showBPWarningModalBox = false;
            $scope.showBPWarning = false;
            $rootScope.higiTopNavHidden = false;
            if($rootScope.mode == "bpw"){
                var mode = "bpw";
                var currenttest = "Blood Pressure";
                var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                $scope.nextSlide = nextTestPath;
                $timeout(function(){
                    window.location =  $scope.nextSlide;
                },500);
            } else if($rootScope.selectedVital.length > 1){
                var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                $scope.nextSlide = nextTestPath;
                $timeout(function(){
                    window.location =  $scope.nextSlide;
                },500);         
            } else{
                window.location = "#/finish/forward";
            }
        }else if (buttonClicked == 'continueTest') {
            $scope.bpwarningModalBoxEnterExit = "exit";
            $scope.bpModalFadeClass = "";
            $scope.showBPWarningModalBox = false;
            $scope.showBPWarning = false;
            $rootScope.higiTopNavHidden = false;
            $rootScope.clearBpWarningModalMessage = true;
            $scope.init();
        }
    }


}]);
