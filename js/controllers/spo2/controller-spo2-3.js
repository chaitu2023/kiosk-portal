higiKioskControllers.controller('HigiKioskspo2Controller3' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService','HigiKioskVitalReference', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService,HigiKioskVitalReference){

        $scope.showInfoboxSpo2 = function(){
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
            $rootScope.loadModal({id : 'infoboxSpo2'});
        };


        $scope.init = function(){
           $rootScope.showExitButton = true;
           $scope.spo22scale = "spo2three.spo22scale";
                       $scope.audioFiles = [
                {filename : 'spotwo3_audio05'},
                {filename : 'spotwo3_audio06'}
        ];

      console.log("audio is there");
        $scope.slideIntructionOne = 'bloodpressure01.instruction01';
        $scope.slideIntructionTwo = 'bloodpressure01.instruction02';
        
  //Audio Instructions as promises
        $scope.audioInstruction1 = function(){
        
           console.log("the file name isnide audio instruction 1 is"+ $scope.audioFiles[0].filename);
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        };
       
      
/*
        //Slide instruction audio and animation directive bundles
        $scope.instructionOne = [
            $scope.audioInstruction1
        ];

        $scope.instructionTwo = [
            $scope.audioInstruction2
           
        ];
  */     
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
            }, 4000);
           });
            $scope.setSlideDirection($routeParams.direction);

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller3', $scope.mode);
            //var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller3', $scope);
            /*$scope.nextSlide = links.next.link;
            $scope.nextSlideText = links.next.label;*/


     //Sumithra code starts
        if($rootScope.mode == "bpw"){
        var mode = "bpw";
        var currenttest = "SPo2";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        $scope.nextSlideText = "spo2three.continue";
        $scope.nextSlide = nextTestPath;
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath; 
            if ($scope.nextSlide == "#/finish/forward") {
                $scope.nextSlideText = "spo2three.finalResult";
            }else{
                $scope.nextSlideText = "spo2three.continue";
            }              
        } else{
            $scope.nextSlideText = "spo2three.finalResult";
            $scope.nextSlide = "#/finish/forward";
            
        }
        //Sumithra code ends
            $scope.redoSlide = links.previous.link;
            $scope.redoSlideText = links.previous.label;

            $scope.nextVisible = false;
            $scope.nextTransitionStyle = 'button-enter-right';
            $scope.slideTitle = "spo2three.spo2";
            $scope.slideSubTitle = 'spo2three.results';
            $scope.spo2Unit = 'spo2three.spo2.percent';
            $scope.spo2Information = "spo2three.information";
            $scope.spo2Parameter = "spo2three.parameter";
            $scope.spo2Yourscore = "spo2three.yourscore";
            $scope.spo2OverallStatus = "spo2three.OverallStatus";
            $scope.spo2level = "spo2three.spo2level";
            $scope.checkSpo2again = "spo2three.checkSpo2again";
         //   $scope.nextSlide = links.next.link;
            

            $scope.globalSpO2Healthy = "spo2three.status.healthy";
            $scope.globalSpO2Acceptable = "spo2three.status.acceptable";
            $scope.globalSpO2Atrisk = "spo2three.status.atrisk";
            $scope.globalSpO2Low = "spo2three.status.low";
            $scope.globalSpO2CheckHealthcareProvider = "spo2three.status.low";

            $scope.oxygen = HigiKioskStorageService.returnSessionData("oxygen");
            $scope.spo2Risk = HigiKioskVitalReference.calculateSpo2RiskForUI($scope.oxygen);
             $scope.spo2Status = HigiKioskStorageService.saveSessionData("spo2Status", $scope.spo2Risk);

                   if ($scope.spo2Risk == 'Normal' ) {
                        $scope.spo2RiskStatus = 'spo2three.status.healthy';
                    }
                    else if ($scope.spo2Risk == 'acceptable' ) {
                        $scope.spo2RiskStatus = 'spo2three.status.acceptable';
                    }
                    else if ($scope.spo2Risk == 'atrisk' ) {
                        $scope.spo2RiskStatus = 'spo2three.status.atrisk';
                    }
                    else if ($scope.spo2Risk == 'Low' ) {
                        $scope.spo2RiskStatus = 'spo2three.status.low';
                    }
                    else if ($scope.spo2Risk == 'Check with healthcare provider' ) {
                        $scope.spo2RiskStatus = 'spo2three.status.spo2_check_healthcare_provider';
                    }

            $timeout(function() {
                $scope.spo2IsHealthy    = ($scope.spo2Risk == "Normal") ? "spo2_scale_selected" : "";
                $scope.spo2IsAcceptable = ($scope.spo2Risk == "Acceptable") ? "spo2_scale_selected" : "";
                $scope.spo2IsAtrisk     = ($scope.spo2Risk == "At-risk") ? "spo2_scale_selected" : "";
                $scope.spo2IsLow        = ($scope.spo2Risk == "Low") ? "spo2_scale_selected" : "";
                $scope.spo2IsCheckHealthcareProvider = ($scope.spo2Risk == "Check with healthcare provider") ? "spo2_scale_selected" : "";            
            }, 2500);


            $scope.animationtxt = "Result page";
            $scope.redoVisible = true;
            $scope.nextVisible = true;

        };



    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $rootScope.spO2RequestInitCall = true;
        $timeout(function(){window.location =  $scope.nextSlide},500);
    };
    $scope.redoSpo2 = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_redoWeightButton', 'button', 'pressed');
        if(HigiKioskStorageService.returnSessionData('current_mode') != "bpw"){
            HigiKioskStorageService.saveSessionData('current_mode', "spo2");
        }
        $rootScope.spo2SomethingCount = 0;
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $scope.pageClass = 'slide back';
        $rootScope.spO2RequestInitCall = true;
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.init();


}]);

 