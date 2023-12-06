 higiKioskControllers.directive('bcWarningPregnantModal', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/body-comp-warning-pregnant.html',
        link :function(scope, elem, attr){
            scope.bcWarningPregnant = new Object();
            scope.bcWarningPregnant.init = function() {
                //Set localization fields
                scope.bcWarningPregnant.selectedVitalIsBMC = false;
                scope.bcWarningPregnant.begin = "bodycomp.begin";
                scope.bcWarningPregnant.questionOne = "bodycomp.question.one";
                scope.bcWarningPregnant.yes = "welcomeModals.yes";
                scope.bcWarningPregnant.no = "welcomeModals.no";
                if(HigiKioskStorageService.returnSessionData('current_mode') == 'bmc'){
                    scope.bcWarningPregnant.selectedVitalIsBMC = true;
                }else{
                    scope.bcWarningPregnant.selectedVitalIsBMC = false;
                }
            };

            scope.bcWarningPregnant.init();
        }

    };
}]);
