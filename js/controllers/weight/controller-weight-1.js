higiKioskControllers.controller('HigiKioskWeightController1' , ['$scope', '$routeParams' , '$location', '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $location ,$rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){
    
    $scope.init = function(){
            $scope.skipWeightClicked = false;

        $scope.skipTest = "global.skip";

        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskWeightController1', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskWeightController1', $scope);

        

        //if bpw, set skip test button visible
        $scope.isBpw = ($scope.mode == "bpw") ? true : false;

        //$scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
        $scope.skipTestInFullTest = true;
        
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;

        $scope.slideTitle = 'weight1.title';
        $scope.slideSubTitle = 'text.instructions'; 
        $scope.skipTest = "weight1.skip";
        $scope.weightSitInMiddle = 'weight1.sit.in.middle';
        $scope.weightFeetOnBar = 'weight1.feet.on.the.bar';
        $scope.handsOnLap = 'weight1.hands.on.the.lap';
        $scope.clickInstruction = 'weight1.click.instruction';
        $scope.checkweightbuttonText = 'weight1.check.button.text';
        $scope.continue = true;
        $scope.switchResponseReceived = false;

        $scope.mode = $scope.mode;
        $scope.pReject = function(code){
            console.log(code + " reject fired")
        };
        $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        $scope.q.promise
            .then(function(){
                //Set button visible
                return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue);})
            .then(function(){return $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[3].filename])});

    };

    $scope.replayWeightAnimation = function(){
        $scope.init();
    };

    $scope.nextButtonOut = function(){
        if($scope.skipWeightClicked == true){}
        else{          
        $scope.skipTestInFullTest = false;
        document.getElementById('weight_skip_button').disabled = 'disabled';         
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.setSlideDirection('forward');
        $scope.continue = false;
        $scope.q.reject();
        HigiKioskAnimationService.audioStop();
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = $scope.nextSlide;
        },1000);
    }
    };

    $scope.audioInstruction = function(audio){
        var q = $q.defer();
        if($scope.continue){
            var promiseAudio =  HigiKioskAnimationService.playAudioPromise(audio, $scope);
            var all = $q.all([promiseAudio.promise]);
            all.then(function(data){
                $scope.nextVisible =  $rootScope.isUserSeated;
                q.resolve();
            });
        }
        else{
            $q.reject()
        }
        return q.promise;
    };

    //To skip current test while doing complete Test
    $scope.skipTestClick = function(){

        if(!$scope.skipWeightClicked){
        $scope.skipWeightClicked = true;
         var path = $location.path();
         var elem = document.querySelector('#weight_continue_next_button');
         if(path == "/weight1/forward"){
            elem.style.opacity = 0.7;
         }         
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
            $scope.seatWatch();
             if ($rootScope.hardwareAvailability["SwitchHardware"]){
             JkioskService.callZugECGSwitchAbortFunction($scope.AlltestSkipZugECGSwitchAbortCallbackFunctionfromWeight);      
            }
              else{
                var mode = "bpw";
                var currenttest = "Body Composition"; // Weight Test Skipped, So BMC should be skipped
                var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                window.location = nextTestPath;
                console.log($scope.nextSlide);        
            }
            setTimeout(function() {
                if($scope.switchResponseReceived == false){
                 var mode = "bpw";
                var currenttest = "Body Composition"; // Weight Test Skipped, So BMC should be skipped
                var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                window.location = nextTestPath;
                console.log($scope.nextSlide);   
                }     
            }, 10000);   
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            if(nextTestPath == "#/weight1/forward"){
                $rootScope.mode = "bmc";
                $scope.nextSlide =  HigiKioskFlow.UserSelectNextTest();
                $timeout(function(){
                    window.location =  $scope.nextSlide;
                },500);
            } else {             
                $scope.nextSlide = nextTestPath;
                $timeout(function(){
                    window.location =  $scope.nextSlide;
                },500);            
            }
        } else{
            window.location = "#/finish/forward";
        }
    }

    };
 $scope.AlltestSkipZugECGSwitchAbortCallbackFunctionfromWeight = function(response){
    $scope.switchResponseReceived = true;
    var mode = "bpw";
        var currenttest = "Body Composition"; // Weight Test Skipped, So BMC should be skipped
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        window.location = nextTestPath;
        console.log($scope.nextSlide);        
        
   
    }

    $scope.resetAnimations = function(){
        $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        $scope.q.promise
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue);})
            .then(function(){return $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[3].filename])});

    };
    $scope.setAnimations = function(){

        $scope.weightInstructionAnimationOneReady = $q.defer();
        $scope.weightInstructionAnimationTwoReady = $q.defer();
        $scope.weightInstructionAnimationThreeReady = $q.defer();

        $scope.animationsReady = $q.all([$scope.weightInstructionAnimationOneReady.promise , $scope.weightInstructionAnimationTwoReady.promise , $scope.weightInstructionAnimationThreeReady]);

        $scope.animationsReady
            .then(function(){
                
                //alert("animations are ready");
                //Call arrays for promises that have animation and audio
                $scope.instructionTwo = [
                    function(){
                        return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                    },
                    $scope.weightInstruction.animationOne

                ];
                $scope.instructionThree = [
                    function(){
                        return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
                    },
                    $scope.weightInstruction.animationTwo
                ];
                
                $scope.instructionFour = [
                    function(){
                        
                        return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[4].filename], $scope);
                    },
                     function(){
                    
                         $('#weight_instruction_feet2').css('opacity', 1)
                         $('#weight_instruction_feet2_text').css('opacity',1)
                         $('#weight_instruction_feet2_text').css('color','#585858');
                         $('#weight_instruction_feet_frames2').delay(50)//we don't want to use a timeout, so we use a delay
                         .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#weight_instruction_feet_frames2').sprite({ //sets the sprite and animates it immediately
                                fps: 24 ,
                                no_of_frames:29 ,
                                start_at_frame:0,
                                play_frames: 29 
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                          
                          $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[3].filename])
                            $('#weight_instruction_feet_frames2').destroy(); //you MUST destroy the sprite if you want it to play again
                        });
                    
                    }
                    
                    
                    
                ];
                
                $scope.nextVisible = $rootScope.isUserSeated;
                $scope.seatWatch = $rootScope.$watch('isUserSeated', function(newValue, oldValue) {
                    console.log('watch (controllerWeight1) triggered. isUserSeated = ' + $rootScope.isUserSeated);
                    $scope.nextVisible = $rootScope.isUserSeated ;
                });
                $scope.init();
            });

    };
    $scope.audioFiles = [
        {filename : 'weight01_audio01'},
        {filename : 'weight01_audio02'},
        {filename : 'weight01_audio03'},
        {filename : 'weight01_audio04'},
        {filename : 'weight01_audiolap'}
        
        
    ];


    $scope.setAnimations();

}]);