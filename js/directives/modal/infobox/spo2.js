higiKioskControllers.directive('infoboxSpo2Modal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/spo2.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields
                $scope.infoboxContentTitle = "infobox.about.spo2";
                $scope.infoboxContentSubTitle = "infobox.about.spo2.subtitle";
                $scope.infoboxAboutSpo2Point1 = "infobox.about.spo2.point01";
                $scope.infoboxAboutSpo2Point2 = "infobox.about.spo2.point02";
                $scope.infoboxAboutSpo2Point3 = "infobox.about.spo2.point03";
                $scope.infoboxAboutSpo2Point4 = "infobox.about.spo2.point04";
                $scope.infoboxAboutSpo2Point5 = "infobox.about.spo2.point05";
                $scope.infoboxAboutSpo2Point6 = "infobox.about.spo2.point06";
                $scope.infoboxAboutSpo2Point7 = "infobox.about.spo2.point07";
                $scope.infoboxAboutSpo2Point8 = "infobox.about.spo2.point08";
                $scope.infoboxAboutSpo2Point9 = "infobox.about.spo2.point09";
                $scope.globalSpO2Healthy = "spo2.status.healthy";
                $scope.globalSpO2Acceptable = "spo2.status.acceptable";
                $scope.globalSpO2Atrisk = "spo2.status.atrisk";
                $scope.globalSpO2Low = "spo2.status.low";
                $scope.globalSpO2CheckHealthcareProvider = "spo2three.status.low";
            };

            $scope.init();
        }

    };
}]);
