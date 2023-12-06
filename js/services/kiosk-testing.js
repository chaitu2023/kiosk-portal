var flowModule = angular.module("higiKioskUi");

    /**
     * The `flowModule` service that takes the current slide and returns
     * the next and previous links for the kiosk.
     * @param {*} message Message to be logged.
     */
    flowModule.factory('HigiKioskTesting', ['$http' , '$rootScope', 'HigiKioskUserService', 'JkioskService', 'HigiKioskStorageService', '$timeout', '$interval', function($http, $rootScope, HigiKioskUserService, JkioskService, HigiKioskStorageService, $timeout, $interval) {
        return {
        setTestingData :function(current){
            var onboardingMode = "w";
            var setUserData = function(){
                var height = 1.8;
                var weight = 70;
                if( HigiKioskStorageService.returnSessionData('height') == undefined) {
                    HigiKioskStorageService.saveSessionData('height', height);
                }
                if( HigiKioskStorageService.returnSessionData('weight') == undefined) {
                    HigiKioskStorageService.saveSessionData('weight', weight);
                }
                if( HigiKioskStorageService.returnSessionData('gender') == undefined){
                    HigiKioskStorageService.saveSessionData('gender' , "f");
                }
                //hardstop BMC testing age
                // HigiKioskStorageService.saveSessionData('birthdate' , "08/08/1990");

                HigiKioskStorageService.saveSessionData('birthdate' , "08/08/1979");

                //Set language to spanish
                //$timeout(function(){
                //    $rootScope.setLanguage($rootScope.languages[1]);
                //},5000)
            };


            if(current == "HigiKioskWelcomeController")
            {

            }
            else if(current == "HigiKioskBpController1")
            {

                $scope.mode = ( $scope.mode == "bp" ||  $scope.mode == "bpw") ?  $scope.mode : "bp";
            }
            else  if(current == "HigiKioskBpController2")
            {

                $scope.mode = ( $scope.mode == "bp" ||  $scope.mode == "bpw") ?  $scope.mode : "bp";

            }
            else  if(current == "HigiKioskBpController3")
            {
                setUserData();
                $rootScope.bpError = null;
                $scope.mode = ( $scope.mode == "bp" ||  $scope.mode == "bpw") ?  $scope.mode : "bp";
                var systolic = 120;
                var diastolic = 111;
                var pulse = 60;
                HigiKioskStorageService.saveSessionData('systolic', systolic);
                HigiKioskStorageService.saveSessionData('diastolic', diastolic);
                HigiKioskStorageService.saveSessionData('pulse', pulse);

                $rootScope.systolicArray.push(systolic);
                $rootScope.diastolicArray.push(diastolic);
                $rootScope.pulseArray.push(pulse);
                $rootScope.bpArray.push({systolic : systolic, diastolic : diastolic, pulse : pulse});

                $rootScope.systolicArray.push(systolic);
                $rootScope.diastolicArray.push(diastolic);
                $rootScope.pulseArray.push(pulse);
                $rootScope.bpArray.push({systolic : systolic, diastolic : diastolic, pulse : pulse});

                $rootScope.systolicArray.push(systolic);
                $rootScope.diastolicArray.push(diastolic);
                $rootScope.pulseArray.push(pulse);
                $rootScope.bpArray.push({systolic : systolic, diastolic : diastolic, pulse : pulse});

                $rootScope.systolicArray.push(systolic);
                $rootScope.diastolicArray.push(diastolic);
                $rootScope.pulseArray.push(pulse);
                $rootScope.bpArray.push({systolic : systolic, diastolic : diastolic, pulse : pulse});

                //bpHistory
                HigiKioskStorageService.saveSessionData('systolicHistory', $rootScope.systolicArray);
                HigiKioskStorageService.saveSessionData('diastolicHistory', $rootScope.diastolicArray);

            }
            else  if(current == "HigiKioskWeightController1")
            {
                setUserData();
                $scope.mode = ( $scope.mode == "w" ||  $scope.mode == "bpw") ?  $scope.mode : "w";
            }
            else  if(current == "HigiKioskWeightController2")
            {
                setUserData();
                $scope.mode = ( $scope.mode == "w" ||  $scope.mode == "bpw") ?  $scope.mode : "w";
            }
            else  if(current == "HigiKioskWeightController3")
            {
                setUserData();
                $rootScope.hardwareAvailability["Body Composition"] = true;
                $scope.mode = ( $scope.mode == "w" ||  $scope.mode == "bpw") ?  $scope.mode : "w";
            }
            else  if(current == "HigiKioskWeightController4")
            {
                setUserData();
                $rootScope.hardwareAvailability["Body Composition"] = true;
                $scope.mode = ( $scope.mode == "w" ||  $scope.mode == "bpw") ?  $scope.mode : "w";
            }
            else  if(current == "HigiKioskWeightController5")
            {
                $scope.mode = ( $scope.mode == "w" ||  $scope.mode == "bpw") ?  $scope.mode : "w";
                $rootScope.bmcHandRemoved = null;
                var weight = 55;
                var bodyFat = 32;
                var leanMass = parseInt(weight - bodyFat);
                if( HigiKioskStorageService.returnSessionData('weight') == undefined){
                    HigiKioskStorageService.saveSessionData('weight' , weight);
                }
                if( HigiKioskStorageService.returnSessionData('fatRatio') == undefined){
                    HigiKioskStorageService.saveSessionData('fatRatio', bodyFat);
                }
                if( HigiKioskStorageService.returnSessionData('leanMassKg') == undefined){
                    HigiKioskStorageService.saveSessionData('leanMassKg', leanMass);
                }
                if( HigiKioskStorageService.returnSessionData('bmcOhms') == undefined){
                    HigiKioskStorageService.saveSessionData('bmcOhms', 20);
                }
                if( HigiKioskStorageService.returnSessionData('hydrationPct') == undefined){
                    HigiKioskStorageService.saveSessionData('hydrationPct', 20);
                }
                HigiKioskStorageService.saveSessionData('hardStopTriggered', true);
                $rootScope.hardwareAvailability["Body Composition"] = true;


            }
            else  if(current == "HigiKioskOnboardingController1")
            {
                $scope.mode = onboardingMode;
            }
            else  if(current == "HigiKioskOnboardingController2") {

                $scope.mode = onboardingMode;
            }
            else  if(current == "HigiKioskOnboardingController3")
            {

                $scope.mode = onboardingMode;
            }
            else  if(current == "HigiKioskOnboardingController4")
            {

                $scope.mode = onboardingMode;
            }
            else  if(current == "HigiKioskFinishController")
            {
                //$scope.mode = "bpw";
                //$scope.mode = ($scope.mode == "") ? 'w' : $scope.mode;
                if($scope.mode == 'bp' || $scope.mode == 'bpw'){
                    HigiKioskStorageService.saveSessionData('diastolic', 80);
                    HigiKioskStorageService.saveSessionData('systolic', 120);
                    HigiKioskStorageService.saveSessionData('pulse', 70);
                }

                if($scope.mode == 'w' || $scope.mode == 'bpw') {
                    HigiKioskStorageService.saveSessionData('fatRatio', 22);
                    HigiKioskStorageService.saveSessionData('bmcOhms', 12);
                    HigiKioskStorageService.saveSessionData('hydrationPct', 20);
                    $rootScope.hardwareAvailability["Body Composition"] = true;
                    HigiKioskStorageService.saveSessionData('bmcSkipped', true)
                }
            }

        }


    }

 }]);

