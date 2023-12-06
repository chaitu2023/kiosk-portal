higiKioskControllers.directive('temperatureTechnicalIssueMsg', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/temperature-Technical-Issue-Message.html',
        link :function(scope, elem, attr){
            scope.temperatureTechIssueMessageModal = new Object();
            scope.temperatureTechIssueMessageModal.init = function() {
                //Set localization fields
                scope.temperatureTechnicalIssueMessage = "Device not connected properly"; // message to be shown in UI
                scope.temperatureSkipButton = "global.telemedi.OK";
            };

            scope.temperatureTechIssueMessageModal.init();
        }

    };
}]);

 