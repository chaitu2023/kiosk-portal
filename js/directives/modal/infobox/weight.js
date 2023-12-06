higiKioskControllers.directive('infoboxWeightModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/weight.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields
                $scope.infoboxContentTitle = "infobox.about.bmi";
                $scope.infoboxContentSubTitle = "infobox.about.bmi.subtitle";
                $scope.infoboxAboutBmiPoint1 = "infobox.about.bmi.point01";
                $scope.infoboxAboutBmiPoint2 = "infobox.about.bmi.point02";
                $scope.infoboxAboutBmiPoint3 = "infobox.about.bmi.point03";
                $scope.infoboxAboutBmiPoint4 = "infobox.about.bmi.point04";
                $scope.infoboxAboutBmiPoint5 = "infobox.about.bmi.point05";
                $scope.infoboxAboutBmiPoint6 = "infobox.about.bmi.point06";
                $scope.infoboxAboutBmiPoint7 = "infobox.about.bmi.point07";
                $scope.infoboxAboutBmiPoint8 = "infobox.about.bmi.point08";
                $scope.globalWeightUnder = "weightBmiModals.underweight";
                $scope.globalWeightNormal = "weightBmiModals.normalweight";
                $scope.globalWeightOver = "weightBmiModals.overweight";
                $scope.globalWeightObese = "weightBmiModals.obese";

            };

            $scope.init();
        }

    };
}]);
