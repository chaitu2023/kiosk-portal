higiKioskControllers.controller('HigiKioskWeightController2' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskStorageService' , 'HigiKioskUtilitiesService', 'JkioskService','$timeout' , 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', function($scope, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService){

    $scope.weightScaleChange = function(response) {
        $scope.$apply();
        $scope.weightGauge.drawGauge(response.weight);
        //$scope.changeWeight = response.weight;
        $scope.changeWeight =  Math.round((response.weight*0.45359237)* 100) / 100;
        $scope.changeUnit = response.unit;

    };

    $scope.weightScaleResult = function (response) {
        $scope.weight = response.weight;
        $scope.unit = response.unit;
        //$scope.nextVisible = true;
        $timeout(function(){
            if($scope.skipWeightClicked == false){                                              
                $scope.skipTestInFullTest = false;
                $timeout(function(){
                    window.location = $scope.nextSlide;
                }, 1500);
                HigiKioskStorageService.saveSessionData("weight",  HigiKioskUtilitiesService.convertToKilograms(response.weight));
            }
        }, 3000);
        localStorage.setItem("weightScaleGlobalErrorCount", 0);
        HigiKioskStorageService.saveSessionData('weightScaleErrorCount', 0);

        $scope.$apply();

    };
    $scope.startWeightScale = function(){
        JkioskService.getWeightScaleStatus($scope.weightScaleChange, $scope.weightScaleResult);

    };
    $scope.nextButtonOut = function() {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        //Remove seat watch for animation control
        $scope.seatWatch();
        $scope.promise = null;
        $scope.nextTransitionStyle = 'button-exit-right';
        $scope.nextVisible = false;
    };

    $scope.init = function(){

        console.log("hi there at last this is visible!");

    $scope.audioFiles = [
        {filename : 'weight01_audio05'}
    ];
        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;
         $scope.promise
            .then(function(){
               // completed audio
               console.log("audio played back of weight progress sucessfully");

            });

            
        $rootScope.changeWeight = 0;
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskWeightController2', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskWeightController2', $scope);
        $scope.nextSlide = links.next.link;
        console.log($scope.nextSlide);
        $scope.nextSlideText = links.next.label;
        $scope.nextVisible = false;
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.slideTitle = 'weight1.title';
        $scope.skipTest = 'weight2.skip';
        $scope.slideSubTitle = 'weight2.in.progress';
        $scope.startWeightScale();

    };

    $scope.AlltestSkipZugECGSwitchAbortCallbackFunctionfromWeight = function(response){
        $scope.switchResponseReceived = true;
        var mode = "bpw";
            var currenttest = "Body Composition"; // Weight Test Skipped, So BMC should be skipped
            var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
            window.location = nextTestPath;
            console.log($scope.nextSlide);        
            
       
    }

    $scope.skipTestCheck = function(){

        if(!$scope.skipWeightClicked){
        $scope.skipWeightClicked = true;
        $rootScope.skipWeightCheck = true;
        //Breaks promise chain
        $scope.continue = false;
        // $scope.q.reject();
        // $scope.skipTestInFullTest = false;
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
            // $scope.seatWatch();
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
            }, 500);   
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
    }};

    $scope.weightgaugeready = $q.defer();
    $scope.skipWeightClicked = false;
    $scope.skipTestInFullTest = true;
    $scope.switchResponseReceived = false;
    $scope.weightgaugeready.promise
        .then(function(){
            $scope.init();
        })
}]);