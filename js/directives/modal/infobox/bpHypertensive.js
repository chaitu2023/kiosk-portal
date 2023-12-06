higiKioskControllers.directive('infoboxBpHypertensive', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/bp-hypertensive.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields
                $scope.infoboxContentTitle = "infobox.about.bp.hc";
                $scope.infoboxContentSubTitle = "infobox.about.bp.subtitle";
                $scope.infoboxBpUnit = "global.mmHg";
                $scope.infoboxAboutSystolic = "infobox.about.bp.systolic";
                $scope.infoboxAboutDiastolic = "infobox.about.bp.diastolic";

                $scope.infoboxAboutBpPoint1 = "infobox.about.bp.hc.point01";
                $scope.infoboxAboutBpPoint2 = "infobox.about.bp.hc.point02";
                $scope.infoboxAboutBpPoint3 = "infobox.about.bp.hc.point03";
                $scope.infoboxAboutBpPoint4 = "infobox.about.bp.hc.point04";

                $scope.infoboxAboutBpHcDisclaimer = "infobox.about.bp.hc.disclaimer";


            };

            $scope.init();
        }

    };
}]);
