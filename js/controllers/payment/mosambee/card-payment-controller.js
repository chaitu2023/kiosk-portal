higiKioskControllers.controller('IHLHPodCardPaymentController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', '$interval', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval){


	$scope.init = function(){

		$(".higi_top_nav_ng ").hide();

		function CardPayInterfaceLabels(){
 			this.title = "cardPayment.title";
 			this.instruction_1 = "cardPayment.instruction_1";
 			this.instruction_2 = "cardPayment.instruction_2";
 		};

 		$scope.cardPayInterfaceLabels = new CardPayInterfaceLabels();
	};
	//end of init func
  
	$scope.init(); 

}]);