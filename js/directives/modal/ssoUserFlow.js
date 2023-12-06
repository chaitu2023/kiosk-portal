higiKioskControllers.directive('ssoUserModal', ['$http', 'HigiKioskFlow' ,'$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , '$route' , function($http, HigiKioskFlow, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $route) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/sso-user.html',
        controller: "ssoUserFlowController"
    };
}]);

