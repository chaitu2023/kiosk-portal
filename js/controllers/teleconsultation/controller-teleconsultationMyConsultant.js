higiKioskControllers.controller('teleconsultationMyConsultantController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {
    $rootScope.isVisibleLanguageButton = false;
    $scope.init = function () {
        $scope.nextVisible = false;
        $timeout(function(){
            $scope.prevIsVisible = true;
        },600);
    }

    $scope.prevButtonClick = function(){
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-dashboard';
        },500);
    }

    $scope.nextButtonClick = function(){
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
    }

    $scope.init();
}]);