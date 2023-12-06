 higiKioskControllers.directive('qrModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService' , '$rootScope','HigiKioskAnimationService', '$route', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/qr-modal.html',
        controller :function($scope) {
            $scope.showOverlay = false;
            $scope.title = "global.api.offline.qr.save";
            $scope.subTitle = "global.api.offline.qr.save.subtitle";
            $scope.instruction1Title = "global.api.offline.qr.instruction1.title";
            $scope.instruction1SubTitle = "global.api.offline.qr.instruction1.subTitle";
            $scope.instruction2Title = "global.api.offline.qr.instruction2.title";
            $scope.instruction2SubTitle = "global.api.offline.qr.instruction2.subTitle";
            $scope.qrDone = "global.api.offline.qr.done";
            $scope.qrBack = "global.back";
            $scope.troubleScanning = "global.api.offline.having.trouble.scanning";
            $scope.noAppEndSession = "finalresults.finish";//"global.api.offline.dont.have.app";
            $scope.showOverlayQr = function(){
                $scope.showOverlay = true;
            };
            $scope.hideOverlayQr = function(){
                $scope.showOverlay = false;
            };
            $scope.endSession = function(){
                $rootScope.clearModal();
                window.location = "#/comebacksoon";
            };
        }

    };
}]);