higiKioskControllers.controller('HigiKioskTempController1' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){

    $scope.getRoomTemperature = "";
    $scope.getBodyTemperature = "";
    $scope.countWristPlace = 0;
    $scope.keepWristAlert = "";
    $scope.tempskipcheck = false;
	
	$scope.ThermometerSkiporRegretButtonClicked=false;
	
//	document.getElementById("splash_logo").style.display = "block";
    $scope.termometerSkinResult = function (response) {
        console.log("termometerSkinResult fn inside");
		
		 if($scope.ThermometerSkiporRegretButtonClicked==false){
        $scope.unit = response.unit;


        if (typeof response.temperatureSkinValueStatus === 'string') {
           $scope.temperatureSkinValueStatus = parseFloat(response.temperatureSkinValueStatus).toFixed(1);
           $scope.temperatureRoomValueStatus = parseFloat(response.temperatureRoomValueStatus).toFixed(1);
        } else {
            $scope.temperatureSkinValueStatus = response.temperatureSkinValueStatus.toFixed(1);
            $scope.temperatureRoomValueStatus = response.temperatureRoomValueStatus.toFixed(1);
        }

        HigiKioskStorageService.saveSessionData("roomTemperature", $scope.temperatureRoomValueStatus);
        //console.log("skin change temperature "+$scope.temperatureSkinValueStatus);

        //HigiKioskStorageService.saveSessionData("temperatur",  ($scope.temperatureSkinValueStatus));
        $scope.getBodyTemperature = $scope.temperatureSkinValueStatus;

        if($scope.temperatureRoomValueStatus != "" && $scope.getBodyTemperature != ""){

            if(typeof $scope.getBodyTemperature === "string"){
                $scope.getBodyTemperature = parseFloat($scope.getBodyTemperature);
            }

            if(typeof $scope.temperatureRoomValueStatus === "string"){
                $scope.temperatureRoomValueStatus = parseFloat($scope.temperatureRoomValueStatus);
            }

            if($scope.getBodyTemperature > $scope.temperatureRoomValueStatus) {
                    console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                    console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
					
                    window.location = $scope.nextSlide;
            } else {
                //$scope.loopCount();
                  console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature); 
                   console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
                  window.location = $scope.nextSlide;
            }

           /* if($scope.getBodyTemperature > $scope.temperatureRoomValueStatus) {

                            console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                            console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);

                if (($scope.getBodyTemperature - 2) < $scope.temperatureRoomValueStatus) {
                    console.log("if condition true success");
                    $scope.loopCount();
                } else {
                    console.log("if condition true failed");
                    window.location = $scope.nextSlide;
                }

            } else if($scope.getBodyTemperature < $scope.temperatureRoomValueStatus) {

                if (($scope.getBodyTemperature + 2) > $scope.temperatureRoomValueStatus){
                    console.log("else if condition true success");
                            console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                            console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
                    $scope.loopCount();
                } else {
                    console.log("else if condition true failed");
                            console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                            console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
                    window.location = $scope.nextSlide;
                }
            } else if($scope.getBodyTemperature == $scope.temperatureRoomValueStatus) {
                window.location = $scope.nextSlide;
            }
            else {
                alert("issue occured.. Please check the functionality");
            }*/
        }


        $scope.$apply();
		 }
    };

    $scope.loopCount = function(){
        $scope.countWristPlace++;
        if($scope.countWristPlace > 3){

            if($scope.ThermometerSkipDisable){
                //$scope.keepWristAlert = "We regret.. ! We are unable to continue your test.";
                $('#temperaturegHnot').hide();
                $('#temperatureRegret').show();
            }
			$scope.ThermometerSkiporRegretButtonClicked==true;
            $timeout(function(){
                $('#temperatureHnot').hide();
                $('#temperatureRegret').hide();
                window.location = "#/finish/forward";
            },3000);
        } else {
            $('#temperatureHnot').show();
            $('#temperatureRegret').hide();
            //$scope.keepWristAlert = "Please keep your wrist on the thermometer handle";
            $timeout(function(){$scope.startSkinTermometer();},3000);
        }
    }

    $scope.termometerChangingResult = function (response) {
       // console.log("changing temperature " + response.temperatureChangingValueStatus);
        if(typeof response.temperatureChangingValueStatus === 'string') {
            $scope.temperatureChangingValueStatus = parseFloat(response.temperatureChangingValueStatus).toFixed(1);
        } else {
            $scope.temperatureChangingValueStatus = response.temperatureChangingValueStatus.toFixed(1);
        }

        //$scope.changeTemperatur = (HigiKioskUtilitiesService.convertToFarrantHeat($scope.temperatureChangingValueStatus)).toFixed(1);

        $scope.$apply();
    };

    $scope.termometerRoomResult = function (response) {
        //console.log(response);
        //console.log("Room temperature "+response.temperatureRoomValueStatus);
        if(typeof response.temperatureRoomValueStatus === 'string') {
            $scope.temperatureRoomValueStatus = parseFloat(response.temperatureRoomValueStatus).toFixed(1);
        } else {
            $scope.temperatureRoomValueStatus = response.temperatureRoomValueStatus.toFixed(1);
        }

        $scope.getRoomTemperature = $scope.temperatureRoomValueStatus;


       // HigiKioskStorageService.saveSessionData("Roomtemperature",  $scope.temperatureRoomValueStatus);
    };


    $scope.startSkinTermometer = function(){
        $('#temperatureHnot').hide();
        $('#temperatureRegret').hide();
        //$scope.keepWristAlert = "";
        $scope.nextVisible = true;
        // JkioskService.getSkinTemperatureProgress($scope.termometerSkinResult, $scope.termometerRoomResult, $scope.termometerChangingResult);
    };

    $scope.takeTestButton = function() {
        window.location = $scope.nextSlide;
        
        $scope.nextVisible = false;
        $scope.skipTestInFullTest = false;
        if($rootScope.temperatureModuleName != "Wrist"){
             
			HigiKioskStorageService.saveSessionData("foreheadTemperaturTempVal", "");
            window.location = $scope.nextSlide;
        }      
    };

    $scope.init = function(){
      $rootScope.showExitButton = false;
	  $scope.ThermometerSkiporRegretButtonClicked=false;
      $scope.slideTitle = 'temp1.title';
      $scope.start = 'temp1.startTest';
      $scope.slideSubTitle = 'temp1.instructions';
      $scope.gentleholdha = "temp1.holdhands";
      $scope.restwritt = "temp1.restwristt"; 
      $scope.slideIntructionFour = 'temp1.testWillBegin';
      $scope.tempForeheadText1 = "temp1.tempForeheadText1";
      $scope.tempForeheadText2 = "temp1.tempForeheadText2";

      if($rootScope.temperatureModuleName != "Wrist"){ //forhead
        $scope.audioFiles=[
            {filename : 'temp1_forhead_audio06'},
        ];
      }else{
        $scope.audioFiles=[
            {filename : 'temp1_audio01'},
            {filename : 'temp1_audio02'}
        ];
      }

         console.log("audio is there");
        $scope.slideIntructionOne = 'bloodpressure01.instruction01';
        $scope.slideIntructionTwo = 'bloodpressure01.instruction02';

  //Audio Instructions as promises
        $scope.audioInstruction1 = function(){

           console.log("the file name isnide audio instruction 1 is"+ $scope.audioFiles[0].filename);
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        };
        $scope.audioInstruction2 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
        };

       $scope.audioInstruction = function(audio){
            if($scope.continue) {
                var promiseAudio = HigiKioskAnimationService.playAudioPromise(audio, $scope);
                return promiseAudio.promise;
            }
        };


         $scope.continue = true;
        $scope.q =  $scope.audioInstruction1();
         $scope.q.promise
            .then(function(){
// this point of time audio instruction 1 is complete
                console.log("audio played sucessfylly and thgen function is called");
                 $timeout(function() {
                $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[1].filename])
                }, 1000);
            });



        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskTempController1', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskTempController1', $scope);

        $scope.skipTest = 'temp1.skip';
        $scope.ThermometerSkipDisable = true;

        $scope.showInstructions = true;
        //if bpw, set skip test button visible
        $scope.isBpw = ($scope.mode == "bpw") ? true : false;

        //$scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
        $scope.skipTestInFullTest = true;


       $scope.nextSlide = links.next.link;
       $scope.nextSlideText = links.next.label;

        $scope.bmcPlaceHands = '';
        $scope.bmcStillHands = '';
        $scope.continue = true;

                    $('.temperature_instructions_circle_container_1').css('opacity', 0.6);
                    $('.temperature_instructions_circle_container_2').css('opacity', 0.6);

                        $timeout(function() {
                            $('.temperature_instructions_circle_container_1').css('opacity', 1); $('.temperature_instructions_text_1').css('color','#585858');
                        }, 2000);

                        $timeout(function() {
                                $('#temperature_instructions_circle1_place_frames').delay(50)//we don't want to use a timeout, so we use a delay
                                .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                    $('#temperature_instructions_circle1_place_frames').sprite({ //sets the sprite and animates it immediately
                                        fps:18,
                                        no_of_frames:30,
                                        start_at_frame:0,
                                        play_frames:30
                                    });
                                })
                            .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 2050, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                $('#temperature_instructions_circle1_place_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                            });

                        }, 3000);



                        $timeout(function() {
                            $('.temperature_instructions_circle_container_2').css('opacity', 1); $('.temperature_instructions_text_2').css('color','#585858');
                        }, 5000);

                        $timeout(function() {
                            $('#temperature_instructions_circle2_place_frames').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#temperature_instructions_circle2_place_frames').sprite({ //sets the sprite and animates it immediately
                                    fps:18,
                                    no_of_frames:30,
                                    start_at_frame:0,
                                    play_frames:30
                                });
                            })
                            .delay(3000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 2050, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                $('#temperature_instructions_circle2_place_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                            });
                        }, 6000);

                        $timeout(function() {
                        if($scope.tempskipcheck==false)
                        {
                            $scope.startSkinTermometer();
                        }
                        }, 7000);


    };


    /*$scope.foreheadTermometerSkinResult = function(res){
        console.log("foreheadTermometerSkinResult res");
        console.log(res);
        window.location = $scope.nextSlide;
    }

    $scope.foreheadTermometerRoomResult = function(res){
        console.log("foreheadTermometerRoomResult res");
        console.log(res);
    }

    $scope.foreheadTermometerChangingResult = function(res){
        console.log("foreheadTermometerChangingResult res");
        console.log(res);
    }*/

    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.setSlideDirection('forward');
        $scope.continue = false;
        $scope.q.reject();
        HigiKioskAnimationService.audioStop();
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = $scope.nextSlide;
        },1000);
    };


    //To skip current test while doing complete Test

    $scope.skipTestClick = function(){

        //Breaks promise chain
        HigiKioskAnimationService.audioStop();
        $scope.continue = false;
		$scope.ThermometerSkiporRegretButtonClicked=true;
        // if($scope.audioPlaying){
        //     try{
        //         HigiKioskAnimationService.audioStop();
        //     } catch (e){

        //     }
        // }

        if($scope.mode == "bpw"){
            $scope.tempskipcheck = true;
            //Log event
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_skipThermometer', 'button', 'pressed');
            $scope.ThermometerSkipDisable = false;
            $scope.countWristPlace = 4;
            //Remove seat watch to prevent audio from playing
            $timeout(function(){


                window.location = "index.html#/finish/forward";
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
$scope.init();

}]);
