higiKioskControllers.directive('infoboxPoints', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/finalresults-points.html',
        controller :function($scope){
            $scope.init = function(){
                //Set localization fields
                $scope.infoboxContentPoint1 = "infobox.about.finalresults.points.points01";
                $scope.infoboxContentPoint2 = "infobox.about.finalresults.points.points02";
                $scope.infoboxContentPoint3 = "infobox.about.finalresults.points.points03";


            };

            $scope.init();
        }

    };
}]);


