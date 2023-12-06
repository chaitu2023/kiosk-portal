higiKioskControllers.directive('infoboxThermometerModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/thermometer.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields
                $scope.temptile = "global.temptile";
                $scope.conten = "global.conten";
                $scope.conten2 = "global.conten2";

            };

            $scope.init();
        }

    };
}]);
