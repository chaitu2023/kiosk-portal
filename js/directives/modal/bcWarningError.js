 higiKioskControllers.directive('bcWarningErrorModal', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/body-comp-warning-error.html',
        link :function(scope, elem, attr){
            scope.bcWarningError = new Object();
            scope.bcWarningError.init = function() {
                //Set localization fields
                scope.bcWarningError.error = "bodycomp.error";
                scope.bcWarningError.button = "bodycomp.error.button";
                scope.bcWarningError.yes = "welcomeModals.yes";
                scope.bcWarningError.no = "welcomeModals.no";
            };

            scope.bcWarningError.init();
        }

    };
}]);
