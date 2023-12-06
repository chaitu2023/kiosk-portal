higiKioskControllers.directive('bpWarningModalBox', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/bp-warning-message.html',
        link :function(scope, elem, attr){
            scope.bpWarningMessageModal = new Object();
            scope.bpWarningMessageModal.init = function() {
                //Set localization fields
                scope.bpWarningMessageModal.warning = "bloodpressure01.warningheading";
                scope.bpWarningMessageModal.contents = "bloodpressure01.disclaimer";
                scope.bpWarningMessageModal.skip = "bloodpressure01.warningskip";
                scope.bpWarningMessageModal.continue = "bloodpressure01.warningcontinue";
            };

            scope.bpWarningMessageModal.init();
        }

    };
}]);

 