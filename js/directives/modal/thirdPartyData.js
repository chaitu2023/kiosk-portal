 higiKioskControllers.directive('thirdPartyDataModal', ['$rootScope' , 'HigiKioskStorageService' , 'JkioskService' , 'HigiKioskAnimationService', function($rootScope, HigiKioskStorageService, JkioskService, HigiKioskAnimationService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/third-party-data.html',
        link :function(scope, elem, attr){
            scope.thirdParty = new Object();
            scope.thirdParty.init = function() {
            };



            
            scope.thirdParty.init();
        }

    };
}]);

