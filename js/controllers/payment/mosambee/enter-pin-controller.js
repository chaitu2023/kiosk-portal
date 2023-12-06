higiKioskControllers.controller('IHLHPodCardPaymentPinController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', '$interval', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval){


 $scope.init = function(){

  // $scope.payment_transacted = true;

   $(".higi_top_nav_ng ").hide();

   //alert($scope.payment);
  /* if($scope.payment_transacted)
		{
			$("#payment_success").hide();
			$("#payment_failed").show();
			
		}
		else{
			$("#payment_failed").hide();
			$("#payment_success").show();
			
		}*/
		function CardPayPinInterfaceLabels(){
 			this.title = "cardPaymentPin.title";
 			this.instruction_1 = "cardPaymentPin.instruction_1";
 			this.instruction_2 = "cardPaymentPin.instruction_2";
 			this.instruction_3 = "cardPaymentPin.instruction_3";
 			this.instruction_4 = "cardPaymentPin.instruction_4";
 			this.success_msg_1 = "cardPaymentPin.success_msg_1";
 			this.failure_msg_1 = "cardPaymentPin.failure_msg_1";
 			this.failure_msg_2 = "cardPaymentPin.failure_msg_2";
 		};

 		$scope.cardPayPinInterfaceLabels = new CardPayPinInterfaceLabels();
		
};
//end of init func

    

  	$scope.paymentStatus = function(){
  	
  	$("#pinNumber_instruction").hide();
  	$("#payment_success").show();
  	$("#payment_failed").hide();
  }



 $scope.init(); 

	}]);