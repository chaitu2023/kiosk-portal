higiKioskControllers.directive('infoboxBpMultipleTests', ['$http' , 'HigiKioskStorageService', function($http, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/bp-multiple-tests.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                $scope.infoboxContentTitle = "infobox.bp.average.title";
                $scope.infoboxContentSubTitle = "infobox.bp.multiple.tests";
                $scope.infoboxBpUnit = "global.mmhg";
                $scope.infoboxBpBpm = 'global.bpm';
                $scope.infoboxBloodPressure = 'global.blood.pressure';
                $scope.infoboxPulse = 'global.pulse';
            };

            $scope.init();
        }

    };
}]);
