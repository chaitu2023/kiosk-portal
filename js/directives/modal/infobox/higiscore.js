higiKioskControllers.directive('infoboxHigiScore', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/finalresults-higiscore.html',
        controller :function($scope){
            $scope.init = function(){
                //Set localization fields
                $scope.infoboxContentPoint1 = "infobox.about.finalresults.higiscore";
            };
            $scope.init();
        }

    };
}]);
