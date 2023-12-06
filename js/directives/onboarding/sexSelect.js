//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("sexSelect", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiApiService', 'JkioskService', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, HigiApiService, JkioskService) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/sex-select.html',
            link: function (scope, element, attr) {
                scope.sexSelect = new Object();
                //Check for set gender for cases when
                //Users might have only partially finished onboarding (bp only with
                //account creation on final results)
                if(HigiKioskStorageService.returnSessionData('gender') != undefined) {
                    scope[attr.genderset] = true;
                    scope[attr.onboardingredo] = true;
                    var gender = HigiKioskStorageService.returnSessionData('gender');
                    if (gender == "m") {

                        scope.sexSelect.isMaleClass = "active";
                        scope.sexSelect.isFemaleClass = "";
                        scope.sexSelect.isTransgenderClass = "";
                    } else if(gender == "t"){
                        scope.sexSelect.isMaleClass = "";
                        scope.sexSelect.isFemaleClass = "";
                        scope.sexSelect.isTransgenderClass = "active";
                    }
                    else{

                        scope.sexSelect.isTransgenderClass = "";
                        scope.sexSelect.isMaleClass = "";
                        scope.sexSelect.isFemaleClass = "active";
                    }
                }
                scope.sexSelect.genderPick = function(gender){
                    scope[attr.genderset] = true;
                    if(gender == "m"){
                        JkioskService.logEvent('gender01_maleButton', 'button', 'pressed');
                        scope.sexSelect.isMaleClass = "active";
                        // scope.sexSelect.isMaleClass = "active_gender_btn";
                        scope.sexSelect.isFemaleClass = "";
                        scope.sexSelect.isTransgenderClass = "";
                    }
                    else if (gender == "t"){
                        JkioskService.logEvent('gender01_transgenderButton', 'button', 'pressed');
                        scope.sexSelect.isMaleClass = "";
                        scope.sexSelect.isFemaleClass = "";
                        scope.sexSelect.isTransgenderClass = "active";
                    }
                    else {
                        JkioskService.logEvent('gender01_femaleButton', 'button', 'pressed');
                        scope.sexSelect.isMaleClass = "";
                        scope.sexSelect.isFemaleClass = "active";
                        scope.sexSelect.isTransgenderClass = "";
                    }
                    HigiKioskStorageService.saveSessionData('gender' , gender);
                };

            }
        }
    }]);



