higiKioskControllers.directive('infoboxPrinterModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/printConfirm.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields
                $scope.printwarning = "finishModal.printwarning";
                $scope.makesure = "finishModal.makesure";
                $scope.printinstruct = "finishModal.printinstruct";
                $scope.notavail = "finishModal.notavail";
                $scope.printRes = "finishModal.printRes";
                $scope.papernot = "finishModal.papernot";
                $scope.refill = "finishModal.refill";
                $scope.okayy = "finishModal.okayy";
                $scope.printEcgraph ="finishModal.printEcgraph";
                $scope.printIInvasiveResult = "finish.printerInvasiveResultTitle";
            };

            $scope.init();
        }

    };
}]);
