higiKioskControllers.controller('HigiKioskTempController2' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService', '$location', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService, $location){


//document.getElementById("splash_logo").style.display = "block";
function temperature_reading(skin_temperature){


/*

y = mx + b  //equation of slope

hence 
x = y - b / m;

m = y2-y1 / x2-x1;

b = y - m*x;

where x1,y1 is base of the slop x2,y2 is the peak cordinates of the slope

after experimenting with coffe cup expirement we got 3 different slopes 

less than normal cold skin range slope x1,y1  and x2,y2 = 96.6,88.0 and  97.6,92.2

normal range slop x1,y1  and x2,y2 =  97.6,92.2 and  98.4,95.2

feaver range slope is x1,y1  and x2,y2  98.4,95.2 and 104.3,102.4

Note: y is skin temperature and x is core body temperature


*/

skin_temperature=parseFloat(skin_temperature);
var y=skin_temperature;
var x=0; // denoted core body temperature yet to calculate
var body_core_temperature=0;  // core body temperature yet to calculate
if(skin_temperature<92.2){
//cold skin condition
x=(y+274)/3.75 ; // -274 is b and 3.75 is m; where x is core  body temperature
body_core_temperature= x;
}else if(skin_temperature>=92.2 & skin_temperature<95.2){
// average normal skin temperature condition
x=(y+317.72)/4.2 ; // -317.72 is b and 4.2 is m; where x is core  body temperature
body_core_temperature= x;
}else if (skin_temperature>=95.2){
// feaver skin temperature condition
x=(y+24.64)/1.22 // -24.64 is b and 1.22 is m; where x is core  body temperature
body_core_temperature= x;   
}

if(body_core_temperature<95){
    var remains=getDecimalPart(body_core_temperature);
    body_core_temperature=95+3+remains; 
}
else if(body_core_temperature<96){
    body_core_temperature=body_core_temperature+3; 
}
else if(body_core_temperature<97){
    body_core_temperature=body_core_temperature+2; 
}



if(body_core_temperature>105){
    var remains=getDecimalPart(body_core_temperature);
    body_core_temperature=104+remains; 
}


body_core_temperature=body_core_temperature.toFixed(2);
return body_core_temperature;


}

function getDecimalPart(num) {
  if (Number.isInteger(num)) {
    return 0;
  }

  const decimalStr = num.toString().split('.')[1];
  return Number('0.'+decimalStr);
}


    $scope.termometerSkinResult = function (response) {
        $scope.unit = response.unit;

        localStorage.setItem("termometerGlobalErrorCount", 0);
        HigiKioskStorageService.saveSessionData('termometerErrorCount', 0);
        
        if (typeof response.temperatureSkinValueStatus === 'string') {
           $scope.temperatureSkinValueStatus = parseFloat(response.temperatureSkinValueStatus).toFixed(1);
           $scope.temperatureRoomValueStatus = parseFloat(response.temperatureRoomValueStatus).toFixed(1);
        } else {
            $scope.temperatureSkinValueStatus = response.temperatureSkinValueStatus.toFixed(1);
            $scope.temperatureRoomValueStatus = response.temperatureRoomValueStatus.toFixed(1);
        }

		 $scope.temperatureSkinValueStatus= HigiKioskUtilitiesService.convertToFarrantHeat( $scope.temperatureSkinValueStatus);
         $scope.temperatureSkinValueStatus= temperature_reading($scope.temperatureSkinValueStatus);
         $scope.temperatureSkinValueStatusinCelcius= HigiKioskUtilitiesService.convertToCelsius( $scope.temperatureSkinValueStatus);

        //console.log("skin change temperature "+$scope.temperatureSkinValueStatus);
        
        HigiKioskStorageService.saveSessionData("temperatur",  ($scope.temperatureSkinValueStatus));
        HigiKioskStorageService.saveSessionData("temperaturecelcius",  ($scope.temperatureSkinValueStatusinCelcius));
        HigiKioskStorageService.saveSessionData("roomTemperature", $scope.temperatureRoomValueStatus);

        if(HigiKioskStorageService.returnSessionData("temperatur") != ""){
            if($scope.skipTemp == false){
                $scope.skipTestInFullTest = false;
                $timeout(function(){window.location = $scope.nextSlide;}, 1500);
            }
        }

        $scope.$apply();
    };

    $scope.termometerChangingResult = function (response) {
       // console.log("changing temperature " + response.temperatureChangingValueStatus);
        if(typeof response.temperatureChangingValueStatus === 'string') {
            $scope.temperatureChangingValueStatus = parseFloat(response.temperatureChangingValueStatus).toFixed(1);
        } else {
            $scope.temperatureChangingValueStatus = response.temperatureChangingValueStatus.toFixed(1);
        }

		
		
        $scope.changeTemperatur = HigiKioskUtilitiesService.convertToFarrantHeat($scope.temperatureChangingValueStatus);
		$scope.changeTemperatur = temperature_reading($scope.changeTemperatur);
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

        HigiKioskStorageService.saveSessionData("roomtemperature",  $scope.temperatureRoomValueStatus);
    };


    $scope.startSkinTermometer = function(){

        if($rootScope.temperatureModuleName != "Wrist"){
			 $rootScope.foreheadTempStart = true;          
             $scope.foreheadTempStartCallBack = true;   
             JkioskService.getForeheadSkinTemperatureStatus($scope.foreheadTermometerSkinResult, $scope.foreheadTemperatureStop);
             $scope.forHeadTempTimout = setTimeout(function(){
                if($scope.foreheadTempStartCallBack) {
                    $scope.showTempWarningModalBox = true;
                    $rootScope.higiTopNavHidden = true;
                    $scope.bpwarningModalBoxEnterExit = "enter";
                    $scope.bpModalFadeClass = "adFadeIn"; 
                }
             },2000)
            }else {
            JkioskService.getSkinTemperatureStatus($scope.termometerSkinResult, $scope.termometerRoomResult, $scope.termometerChangingResult);
        } 
        
    };

    var faceDetectCount = 0; 
    $scope.foreheadTermometerSkinResult = function(res){
        $scope.foreheadTempStartCallBack = false;
        clearTimeout($scope.forHeadTempTimout);
        $rootScope.higiTopNavHidden = false;
        $scope.bpwarningModalBoxEnterExit = "exit";
        $scope.bpModalFadeClass = ""; 
        $scope.showTempWarningModalBox = false;
        if(res.faceCaptureForTemp != undefined && res.faceCaptureForTemp == true){ // this condition for jkiosk.mock.js - success scenrio
            $rootScope.faceCaptureForTemp = true;
        }
        
        if($rootScope.faceCaptureForTemp && $rootScope.foreheadTempStart){
			$rootScope.foreheadTempStart = false;
			if (typeof res.temperatureSkinValueStatus === 'string') {
			   $scope.temperatureSkinValueStatus = parseFloat(res.temperatureSkinValueStatus).toFixed(1);
			} else {
				$scope.temperatureSkinValueStatus = res.temperatureSkinValueStatus.toFixed(1);
			}
		
			if(typeof res.temperatureRoomValueStatus === 'string') {
				$scope.temperatureRoomValueStatus = parseFloat(res.temperatureRoomValueStatus).toFixed(1);
			} else {
				$scope.temperatureRoomValueStatus = res.temperatureRoomValueStatus.toFixed(1);
			}
			
            console.log("$scope.temperatureSkinValueStatus = " + $scope.temperatureSkinValueStatus);
            console.log("$scope.temperatureRoomValueStatus = " + $scope.temperatureRoomValueStatus);
			
			// get heart rate for temperature calculation
			var HR = 72;
			if(HigiKioskStorageService.returnSessionData('HRforTemp') != undefined){
				HR = HigiKioskStorageService.returnSessionData('HRforTemp');
			}
			
			var formula = 15.35 + (0.648 * $scope.temperatureSkinValueStatus) - (0.064 * $scope.temperatureRoomValueStatus) + (0.008 * HR) - (0.381 * 0);
            
            var fahrenheitFormula = ((formula * 9 / 5) + 32); 
                        
            // Fever senario handling start
            if(fahrenheitFormula <=96.5) {
                fahrenheitFormula = ((formula * 9 / 5) + 32) + 2; // + 2  for forehead temperature adjustment value
            } else if(fahrenheitFormula <=97.5) {
                fahrenheitFormula = ((formula * 9 / 5) + 32) + 1; // + 1  for forehead temperature adjustment value
            } else if(fahrenheitFormula <=98.5) {
                fahrenheitFormula = ((formula * 9 / 5) + 32) + 0.5; // + 0.5  for forehead temperature adjustment value
            } else {
                fahrenheitFormula = ((formula * 9 / 5) + 32); // + 0  for forehead temperature adjustment value
            }
            // Fever senario handling end
            if(fahrenheitFormula < 96){         
                fahrenheitFormula = 96; 
            } 
            console.log("formula = " + formula);
			
			HigiKioskStorageService.saveSessionData("temperatur", fahrenheitFormula.toFixed(2));
			HigiKioskStorageService.saveSessionData("foreheadTemperaturTempVal", fahrenheitFormula.toFixed(2));
			var celciusFormula = HigiKioskUtilitiesService.convertToCelsius(fahrenheitFormula);
			HigiKioskStorageService.saveSessionData("temperaturecelcius",  celciusFormula);			

			HigiKioskStorageService.saveSessionData("roomTemperature",  $scope.temperatureRoomValueStatus);
			//JkioskService.foreheadTemperatureStop($scope.foreheadTemperatureStop);
			if(HigiKioskStorageService.returnSessionData("temperatur") != ""){
				if($scope.skipTemp == false){
					$scope.skipTestInFullTest = false;
					$timeout(function(){window.location = $scope.nextSlide;}, 1500);
				}
			}
			
        }
        
    }

    $scope.foreheadTemperatureStop = function(res){
		console.log("inside $scope.foreheadTemperatureStop fn");
		console.log(res);
		var path = $location.path();
		console.log();
			if(path == '/temp2/forward' && (HigiKioskStorageService.returnSessionData("foreheadTemperaturTempVal") == "" || HigiKioskStorageService.returnSessionData("foreheadTemperaturTempVal") == undefined)) {
				$rootScope.foreheadTempStart = true;
				$rootScope.faceCaptureForTemp = false;				
				//$rootScope.faceDetectCount = 0; // remove this line because face capture already two times. if we reset the face capure count. it will start the face capture again from 0 count.
				JkioskService.getForeheadSkinTemperatureStatus($scope.foreheadTermometerSkinResult, $scope.foreheadTemperatureStop);		
			} else {
				$rootScope.foreheadTempStart = false;
			}
	}


    $scope.init = function(){

        if($rootScope.temperatureModuleName != "Wrist"){ //forhead
            $scope.audioFiles=[
                {filename : 'temp2_forhead_audio07'},
            ];
          }else{
            $scope.audioFiles = [
                {filename : 'temp2_audio03'}
            ];
          }

           

        $scope.skipTemp = false;
        $scope.foreheadTempStartCallBack = false;
        $scope.forHeadTempTimout;
        console.log("audio is there");
        $scope.slideIntructionOne = 'bloodpressure01.instruction01';
        $scope.slideIntructionTwo = 'bloodpressure01.instruction02';
        
  //Audio Instructions as promises
        $scope.audioInstruction1 = function(){
        
           console.log("the file name isnide audio instruction 1 is"+ $scope.audioFiles[0].filename);
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        };
       

       $scope.audioInstruction = function(audio){
            if($scope.continue) {
                var promiseAudio = HigiKioskAnimationService.playAudioPromise(audio, $scope);
                return promiseAudio.promise;
            }
        };

         $scope.continue = true;
        $scope.q =  $scope.audioInstruction1();



        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskTempController2', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskTempController2', $scope);
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.nextVisible = false;
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.slideTitle = 'temp1.title';
        $scope.skipTest = 'temp2.skip';
        $scope.skipTestInFullTest = true;
        $scope.slideSubTitle = 'temp2.in.progress';
        $scope.intructionText1 = "temp2.intructionText1";
        $scope.intructionText2 = "temp2.intructionText2";

        $scope.animationtxt = "Termometer fetch animation";



       $scope.startSkinTermometer();
				
				// instrunction sprite image perfectly working on latest chrome browser start
                   /* var loop = 120;
                    for(i = 0; i<120; i++){
                        $('#temperatureInProgressAnimation').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#temperatureInProgressAnimation').sprite({ //sets the sprite and animates it immediately
                                    fps:24,
                                    no_of_frames:85,
                                    start_at_frame:0,
                                    play_frames:85
                                });
                            })
                            .delay(0)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 4090, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                $('#temperatureInProgressAnimation').destroy(); //you MUST destroy the sprite if you want it to play again
                            });
                    }*/

				// instrunction sprite image perfectly working on latest chrome browser end


    };

    $scope.skipTestClick = function(){
		if($rootScope.temperatureModuleName != "Wrist" && $rootScope.foreheadTempStart && $scope.foreheadTempStartCallBack == false){
            JkioskService.foreheadTemperatureStop($scope.foreheadTemperatureStop);
		}
        //Breaks promise chain
        $scope.continue = false;
        if(HigiKioskStorageService.returnSessionData("temperaturFarrant") != undefined){
            $rootScope.skipTempCheck = false;
        }else{
            $rootScope.skipTempCheck = true;
        }
        $scope.skipTemp = true;
		$scope.ThermometerSkiporRegretButtonClicked=true;
        if($scope.audioPlaying){
            try{
                HigiKioskAnimationService.audioStop();
            } catch (e){

            }
        }

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

 