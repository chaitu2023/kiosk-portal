higiKioskControllers.directive('eSanjeevaniReqTestListModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/e-sanjeevani-req-test-list.html',
        controller: function ($scope) {

             $scope.vitalParams = [
                    {name: 'BLOOD_PRESSURE', mode: 'bp', hwAvailabilityStr: 'Blood Pressure'},
                    {name: 'HEART_RATE', mode: 'bp', hwAvailabilityStr: 'Blood Pressure'},
                    {name: 'BMI', mode: 'w', hwAvailabilityStr: 'Weight Scale'},
                    {name: 'WEIGHT', mode: 'w', hwAvailabilityStr: 'Weight Scale'},
                    {name: 'ECG', mode: 'ekg', hwAvailabilityStr: 'ECG'},
                    // {name: 'bmc', name: 'bmc'},
                    {name: 'PULSE_OXIMETER', mode: 'spo2', hwAvailabilityStr: 'SPo2'},
                    {name: 'TEMPERATURE', mode: 'temp', hwAvailabilityStr: 'temp'}
                ]
                $scope.invasiveParams = [
                    {name: 'BLOOD_GLUCOSE', mode: 'glc'},
                    {name: 'URINE_CHECKUP', mode: 'urn'},
                    {name: 'HCV', mode: 'hcv'},
                    {name: 'PREGNANCY', mode: 'preg'},
                    {name: 'DENGUE', mode: 'deng'},
                    {name: 'TROPONIN_1', mode: 'trop'},
                    {name: 'HEMOGLOBIN', mode: 'heamo'},
                    {name: 'MALARIA', mode: 'mal'},
                    {name: 'SYPHILIS', mode: 'syph'},
                    {name: 'LIPID_PROFILE', mode: 'lip'},
                    {name: 'HIV', mode: 'hiv'}
                ]

            $scope.continueTest = function() {
                $rootScope.testList = [];
                $rootScope.missingTestRequest = [];
                $rootScope.selectedVital = [];
                $rootScope.selectedIvtListArray = [];

                let testRequestList = $rootScope.patientList.find(x => x.externalPatientId === $rootScope.externalPatientId);
                $rootScope.testList = testRequestList['testList'];
                $rootScope.user.firstName = testRequestList['firstName'];
                let gender = testRequestList['gender'].toLowerCase();
                if( gender == "male"){
                    HigiKioskStorageService.saveSessionData('gender' , 'm');
                } else {
                    HigiKioskStorageService.saveSessionData('gender' , 'f');
                }

                if(testRequestList['dob']){
                    let ihlDOB = testRequestList['dob'].split("/");
                    let ihlDOBFormat = ihlDOB[1]+"/"+ihlDOB[0]+"/"+ihlDOB[2];
                    HigiKioskStorageService.saveSessionData('birthdate' ,ihlDOBFormat);   
                }
                

                /* CHECK WITH NON-INVASIVE PARAMS */
                angular.forEach($scope.vitalParams, function (value, key) {
                    if ($rootScope.hardwareAvailability[value['hwAvailabilityStr']] && $rootScope.testList.includes(value['name']))
                        $rootScope.selectedVital.push(value['mode']);
                    else if ($rootScope.testList.includes(value['name']))
                        $rootScope.missingTestRequest.push(value['name']);
                });

                

                /* CHECK WITH INVASIVE PARAMS */
                angular.forEach($scope.invasiveParams, function (value, key) {
                    if ($rootScope.invasiveEnable && $rootScope.ivtServerConnection && $rootScope.testList.includes(value['name'])) {
                        $rootScope.selectedIvtListArray.push(value['mode']);
                        $rootScope.selectedIvtVital.push(value['mode']);
                    }
                    else if ($rootScope.testList.includes(value['name'])) {
                        $rootScope.missingTestRequest.push(value['name']);
                    }
                });

                console.log($rootScope.selectedVital);

                $rootScope.selectedVital = [...new Set($rootScope.selectedVital)];

                if ($rootScope.selectedIvtListArray.length != 0)
                    $rootScope.selectedVital.unshift("ivt");

                $rootScope.clearModal();

                if ($rootScope.selectedVital.length == 0 && $rootScope.selectedIvtListArray.length == 0)
                    $("#eSanTestRequestRegret").show();
                else
                    $scope.continueAsGuestUser();
            }

             $scope.continueAsGuestUser = function() {
                $rootScope.mode = $rootScope.selectedVital[0];
                HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);    
                window.location =  "#/onboarding2/forward/enter";
            }

        }
    }
}])