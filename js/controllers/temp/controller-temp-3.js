higiKioskControllers.controller('HigiKioskTempController3' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService', 'HigiKioskVitalReference' , function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService, HigiKioskVitalReference ){



//        document.getElementById("splash_logo").style.display = "block";
        $scope.showInfoboxThermometer = function(){
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
            $rootScope.loadModal({id : 'infoboxThermometer'});
        };

        $scope.tempStatusImage = "";
       // $scope.temperaturStatus = "";

    $scope.init = function(){
      $rootScope.showExitButton = true;
      $scope.temperatureAccuracy = "temperature.accuracy";


        setTimeout(function(){          
            $scope.temperatur = HigiKioskStorageService.returnSessionData("temperatur");  
            $scope.roomTemperatureCelsius = HigiKioskStorageService.returnSessionData("roomTemperature");
            $scope.roomTemperature = HigiKioskUtilitiesService.convertToFarrantHeat($scope.roomTemperatureCelsius);

            // $scope.temperaturStatus = HigiKioskUtilitiesService.calculateTempRisk($scope.roomTemperatureCelsius, HigiKioskStorageService.returnSessionData("temperatur"));
            $scope.temperaturStatus = HigiKioskVitalReference.calculateTempRiskForUI(HigiKioskStorageService.returnSessionData("temperatur"));          
            HigiKioskStorageService.saveSessionData("temperaturFarrant",$scope.temperatur);
            HigiKioskStorageService.saveSessionData("roomTemperature",$scope.roomTemperature);
            HigiKioskStorageService.saveSessionData("temperaturStatus", $scope.temperaturStatus);

             // var bodyTempCalc = HigiKioskUtilitiesService.calculateTempRisk($scope.roomTemperatureCelsius,$scope.temperatur);
             var bodyTempCalc = HigiKioskVitalReference.calculateTempRiskForUI($scope.temperatur);
             // alert(bodyTempCalc);
              $scope.tempStatus = HigiKioskStorageService.saveSessionData('tempStatus', bodyTempCalc);
            
            if (bodyTempCalc == 'Normal' ) {
                $scope.bpRiskClass = 'result_risk normal';
                $scope.bodyTempCalc = 'temp3.status.healt';

            }
            else if (bodyTempCalc == 'Acceptable' ) {
                $scope.bpRiskClass = 'result_risk normal';
                $scope.bodyTempCalc = 'temp3.status.accep';
            }
            else if (bodyTempCalc== 'Fever') {
                $scope.bpRiskClass = 'result_risk atrisk';
                $scope.bodyTempCalc = 'temp3.status.fever';
            }
            else if (bodyTempCalc== 'High Fever') {
                $scope.bpRiskClass = 'result_risk high';
                $scope.bodyTempCalc = 'temp3.status.highfever';
            }else if(bodyTempCalc == 'Low'){
                $scope.bpRiskClass = 'result_risk low';
                $scope.bodyTempCalc = 'global.lowbp';
            }else if(bodyTempCalc == 'High'){
                $scope.bpRiskClass = 'result_risk high';
                $scope.bodyTempCalc = 'global.highpulse';
            }

            
            $rootScope.TempRisk = bodyTempCalc;

        }, 500);        
        

        $scope.audioFiles = [
            {filename : 'temp3_audio04'},
            {filename : 'temp3_audio05'}
        ];

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
        $scope.q.promise
            .then(function(){ 
                $timeout(function () {
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
        }, 2000);
           });

                 


        //alert($scope.roomTemperatureCelsius);
        //alert($scope.temperatur);
        
        $scope.setSlideDirection($routeParams.direction);

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskTempController3', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskTempController3', $scope);
        /*$scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;*/

        $scope.redoSlide = links.previous.link;
        $scope.redoSlideText = links.previous.label;

        $scope.nextVisible = false;
        $scope.tempStatus1 = "temp3.status.healt";
        $scope.tempStatus2 = "temp3.status.accep";
        $scope.tempStatus3 = "temp3.status.fever";
        $scope.tempStatus4 = "temp3.status.highfever";
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.slideTitle = 'temp1.title';
        $scope.slideSubTitle = 'temp3.results';
        $scope.slideTitleScale = 'temp3.tempScale';
        $scope.roomTemp = 'temp3.roomTemp';
        $scope.wristTemp = 'temp3.wristTemp';
        $scope.temperature = "temp3.temperature";
        $scope.bodytemperature = "temp3.bodyTemp";
        $scope.tempInformation = "temp3.information";
        $scope.tempParameter = "temp3.parameter";
        $scope.tempYourscore = "temp3.yourscore";
        $scope.tempOverallStatus = "temp3.OverallStatus";
        $scope.checkTempagain = "temp3.checkTempagain";
        $scope.tempStatus5 = "global.lowbp";
        $scope.tempStatus6 = "global.highpulse";
        $scope.nextSlide = links.next.link;
        

        if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;     
            if ($scope.nextSlide == "#/finish/forward") {
                $scope.nextSlideText = "global.finalResult";
            }else{
                $scope.nextSlideText = "global.continue";
            }        
        } else{
            $scope.nextSlide = "#/finish/forward";
            $scope.nextSlideText = links.next.label;
        }

        $scope.animationtxt = "Result page";
        $scope.redoVisible = true;
        $scope.nextVisible = true;

       //$scope.temperaturCelsius = HigiKioskStorageService.returnSessionData("temperatur");
       // $scope.temperatur = HigiKioskUtilitiesService.convertToFarrantHeat($scope.temperaturCelsius);
	   
	   
    };



    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $timeout(function(){window.location =  $scope.nextSlide},500);
    };
    $scope.redoTemperature = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_redoWeightButton', 'button', 'pressed');
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $scope.pageClass = 'slide back';
		
		if($rootScope.temperatureModuleName != "Wrist"){
			$rootScope.foreheadTempStart = false;
			$rootScope.faceCaptureForTemp = false;	
			HigiKioskStorageService.saveSessionData("foreheadTemperaturTempVal", "");		
			$rootScope.faceDetectCount = 0;
		}
		
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.init();


}]);
