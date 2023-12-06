 higiKioskControllers.directive('bcWarningImplantModal', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/body-comp-warning-implant.html',
        link :function(scope, elem, attr){
            scope.bcWarningImplant = new Object();
            scope.bcWarningImplant.init = function() {
                //Set localization fields
                scope.bcWarningImplant.begin = "bodycomp.begin";
                scope.bcWarningImplant.questionTwo = "bodycomp.question.two";
                scope.bcWarningImplant.yes = "welcomeModals.yes";
                scope.bcWarningImplant.no = "welcomeModals.no";
            };

            scope.bcWarningImplant.init();
        }

    };
}]);

 