higiKioskControllers.controller('teleconsultationLayoutController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService){

    $scope.init = function(){
    	$scope.nextVisible = true;

        HigiApiService.getTeleConsultData("ihl_user_id",
                            function (resp) {
                            	console.log(resp);
                            	alert(resp);
                            });
    }


	$scope.init();
}]);