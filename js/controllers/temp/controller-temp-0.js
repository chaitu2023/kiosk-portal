higiKioskControllers.controller('HigiKioskTempController0' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){


    $scope.getRoomTemperature = "";
    $scope.getBodyTemperature = "";
    $scope.countCalibrateLoop = 0;

    $scope.termometerSkinResult = function (response) {
       // alert("$scope.termometerSkinResult fn inside");
        console.log(JSON.stringify(response));
        $scope.unit = response.unit;

        
        if (typeof response.temperatureSkinValueStatus === 'string') {
           $scope.temperatureSkinValueStatus = parseFloat(response.temperatureSkinValueStatus).toFixed(1);
           $scope.temperatureRoomValueStatus = parseFloat(response.temperatureRoomValueStatus).toFixed(1);
        } else {
            $scope.temperatureSkinValueStatus = response.temperatureSkinValueStatus.toFixed(1);
            $scope.temperatureRoomValueStatus = response.temperatureRoomValueStatus.toFixed(1);
        }


        //console.log("skin change temperature "+$scope.temperatureSkinValueStatus);
        
        $scope.getBodyTemperature = $scope.temperatureSkinValueStatus;
       $timeout(function(){window.location = $scope.nextSlide;}, 1500);    
      // console.log($scope.getRoomTemperature +" - " + $scope.getBodyTemperature );

         /*   if($scope.temperatureRoomValueStatus != "" && $scope.getBodyTemperature != ""){
                // count set for loop
                console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);


                if(typeof $scope.getBodyTemperature === "string"){
                    $scope.getBodyTemperature = parseFloat($scope.getBodyTemperature);
                }

                if(typeof $scope.temperatureRoomValueStatus === "string"){
                    $scope.temperatureRoomValueStatus = parseFloat($scope.temperatureRoomValueStatus);
                }

                if($scope.getBodyTemperature > $scope.temperatureRoomValueStatus) { 
                    
                    if (($scope.getBodyTemperature - 2) < $scope.temperatureRoomValueStatus) {
                        console.log("if condition true success");
                        window.location = $scope.nextSlide;   
                    } else {
                        console.log("if condition true failed");
                        $scope.loopCount();
                    }

                } else if($scope.getBodyTemperature < $scope.temperatureRoomValueStatus) {

                    if (($scope.getBodyTemperature + 2) > $scope.temperatureRoomValueStatus){
                        console.log("else if condition true success");
                                console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                                console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
                        window.location = $scope.nextSlide;   
                    } else {
                        console.log("else if condition true failed");
                                console.log("$scope.getBodyTemperature = "+ $scope.getBodyTemperature);
                                console.log("$scope.temperatureRoomValueStatus = "+ $scope.temperatureRoomValueStatus);
                        $scope.loopCount();
                    }
                } else if($scope.getBodyTemperature == $scope.temperatureRoomValueStatus) {
                    window.location = $scope.nextSlide;    
                }
                else {
                    alert("issue occured.. Please check the functionality");
                }
            } */

        $scope.$apply();
    };

    $scope.loopCount = function(){               
        $scope.countCalibrateLoop++;
        if($scope.countCalibrateLoop <= 20){
            //alert("again start the functionality - " + $scope.countCalibrateLoop)
            $scope.startSkinTermometer();
        } else {
            if($scope.ThermometerSkipDisable){ 
                $('#ekgRegret').show();
                $('.ecg_warning_txt').text("Technical issue is detected on temperature device readyness.. Please try again later.");            
                //alert("Technical issue is detected on temperature device readyness.. Please try again later");   
            }
            $timeout(function(){
                $('#ekgRegret').hide(); 
                window.location = "#/finish/forword";
            }, 5000);   
        }
    }

    $scope.termometerChangingResult = function (response) {
        //console.log("changing temperature " + response.temperatureChangingValueStatus);
        if(typeof response.temperatureChangingValueStatus === 'string') {
            $scope.temperatureChangingValueStatus = parseFloat(response.temperatureChangingValueStatus).toFixed(1);
        } else {
            $scope.temperatureChangingValueStatus = response.temperatureChangingValueStatus.toFixed(1);
        }

        //$scope.changeTemperatur = (HigiKioskUtilitiesService.convertToFarrantHeat($scope.temperatureChangingValueStatus)).toFixed(1);

        $scope.$apply();
    };

    $scope.termometerRoomResult = function (response) {
        //alert("termometerRoomResult fn inside");
        //console.log(response);
        //console.log("Room temperature "+response.temperatureRoomValueStatus);
        if(typeof response.temperatureRoomValueStatus === 'string') {
            $scope.temperatureRoomValueStatus = parseFloat(response.temperatureRoomValueStatus).toFixed(1);
        } else {
            $scope.temperatureRoomValueStatus = response.temperatureRoomValueStatus.toFixed(1);
        }
        
        $scope.getRoomTemperature = $scope.temperatureRoomValueStatus;
       // alert("$scope.getRoomTemperature = " +$scope.getRoomTemperature);
        

       // HigiKioskStorageService.saveSessionData("Roomtemperature",  $scope.temperatureRoomValueStatus);
    };


    $scope.startSkinTermometer = function() {
       // alert("startSkinTermometer fn inside");
        JkioskService.getSkinTemperatureProgress($scope.termometerSkinResult, $scope.termometerRoomResult, $scope.termometerChangingResult);
    };


       $scope.init = function(){
        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskTempController0', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskTempController0', $scope);
        
        $scope.nextVisible = true;

        //if bpw, set skip test button visible
        $scope.isBpw = ($scope.mode == "bpw") ? true : false;

        $scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
        

        $scope.skipTestInFullTest = true;

       $scope.nextSlide = links.next.link;
       $scope.nextSlideText = links.next.label;
       $scope.ThermometerSkipDisable = true;
        $scope.startSkinTermometer();
                var loop = 120;

                    for(i = 0; i<loop; i++) {
                        $('#temperatureCalibrationAnimation').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#temperatureCalibrationAnimation').sprite({ //sets the sprite and animates it immediately
                                    fps:24,
                                    no_of_frames:54,
                                    start_at_frame:0,
                                    play_frames:54
                                });
                            })
                            .delay(0)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 2050, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                $('#temperatureCalibrationAnimation').destroy(); //you MUST destroy the sprite if you want it to play again
                            });
                    }



        /*$timeout(function(){
            window.location = $scope.nextSlide;
        },1000);*/
        $scope.skipTest = 'global.skip';
        $scope.slideTitle = 'global.temp';
        $scope.slideSubTitle = 'global.calibration';
        $scope.spo2Fingerprobably = 'global.placeYourFingerProbably';
        $scope.continue = true;

    };

   $scope.init();

    $scope.skipTestClick = function(){
        //Breaks promise chain
        $scope.continue = false;
        
        if($scope.audioPlaying){
            try{
                HigiKioskAnimationService.audioStop();
            } catch (e){

            }
        }
        $scope.ThermometerSkipDisable = false;
        $scope.countCalibrateLoop = 8; // 

        /*if($scope.mode == "bpw" || $scope.mode == "temp"){            //Log event
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_skipThermometer', 'button', 'pressed');

            $timeout(function(){
                window.location = "index.html#/finish/forward";
            },0,false);
        }*/
    };

}]);