higiKioskControllers.directive('bcWarningDisclaimerModal', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/body-comp-warning-disclaimer.html',
        link :function(scope, elem, attr){
            scope.bcWarningDisclaimer = new Object();
            scope.bcWarningDisclaimer.init = function() {
            };
            scope.bcWarningDisclaimer.init();
        }

    };
}]);
