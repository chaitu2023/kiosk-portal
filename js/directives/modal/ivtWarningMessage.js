higiKioskControllers.directive('ivtWarningModalBox', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt-warning-message.html',
        link :function(scope, elem, attr){

            scope.ivtWarningMessageModal = new Object();
            scope.ivtWarningMessageModal.init = function() {
                //Set localization fields
                
                scope.ivtWarningMessageModal.contents = "Please connect the device properly.";
                
                scope.ivtWarningMessageModal.ok = "Ok";
            };

            scope.ivtWarningMessageModal.init();
        }

    };
}]);

 