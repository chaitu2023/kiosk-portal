 higiKioskControllers.directive('exitConfirmModal', ['$rootScope' , 'HigiKioskStorageService' , 'JkioskService' , 'HigiKioskAnimationService', '$location', function($rootScope, HigiKioskStorageService, JkioskService, HigiKioskAnimationService, $location) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/exit-confirm.html',
        link :function(scope, elem, attr){
            scope.exitConfirm = new Object();
            scope.exitConfirm.init = function() {
                //Set localization fields
                scope.exitConfirm.ExitSure = "welcomeModals.are.you.sure.exit";
                scope.exitConfirm.ExitYes = "welcomeModals.exit.yes";
                scope.exitConfirm.ExitSureLoggedIn = "welcomeModals.are.you.sure.exit.logout";
                scope.exitConfirm.ExitYesLoggedIn =  "welcomeModals.exit.yes.logout";
                scope.exitConfirm.ExitNo = "welcomeModals.exit.no";
            };

            scope.exitConfirm.returnSession = function(){


                                /*---------------------------
                perfect working code v 2.2 commend by deepak 
                reason : exit flow changed 
                explantion : click the 'No, Go Back' button to redirect the home page 
                ----------------------------------------------*/
                /*JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitConfirmation_noButton', 'button', 'pressed');
                HigiKioskAnimationService.audioResume();
                $rootScope.toggleExitModalVisible(); 
                /* ------------------------------------- */ 

                // HOME PAGE REDIRECTION FLOW WRITTEN BY DEEPAK 1ST NOV 2018
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitConfirmation_noButton', 'button', 'pressed');          
                $rootScope.toggleExitModalVisible();  
                var url = $location.url();
                if(url === "#/finish/forward"){
                    $rootScope.homeBtnClick = true;
                    $rootScope.isVisibleLogin = true;
                    $rootScope.isVisibleReg = true;
                    $rootScope.paymetIdealCheck = true;
                    $rootScope.homeButtonShow = false;      

                    $("#teleMedGem3sInternet").hide();
                    $("#teleMedGem3sServer").hide();
                    $("#teleMedHpodServer").hide();
                    $("#teleMedGem3sCallAgain").hide();
                    $("#teleMedGem3sMobileInputReq").hide();    

                    if($rootScope.telemediSetting && (HigiKioskStorageService.returnSessionData('logged_in'))) {          
                        $rootScope.teleMediDoctorcall =  false;
                        $rootScope.floatingWindowLoaded = false;
                        $rootScope.telemedicineButtonAvailable = true;
                    }                
                    window.location = "#/welcome";

                }                

                if(url === "#/cardpaymentpin" || url === "#/payment-by-razorPayupi"){
                    $rootScope.homeBtnClick = true;
                    $rootScope.isVisibleLogin = true;
                    $rootScope.isVisibleReg = true;
                    $rootScope.paymetIdealCheck = true;
                    $rootScope.homeButtonShow = false;      

                    $("#teleMedGem3sInternet").hide();
                    $("#teleMedGem3sServer").hide();
                    $("#teleMedHpodServer").hide();
                    $("#teleMedGem3sCallAgain").hide();
                    $("#teleMedGem3sMobileInputReq").hide();    

                    if($rootScope.telemediSetting && (HigiKioskStorageService.returnSessionData('logged_in'))) {          
                        $rootScope.teleMediDoctorcall =  false;
                        $rootScope.floatingWindowLoaded = false;
                        $rootScope.telemedicineButtonAvailable = true;
                    }                
                    window.location = "#/ihl-teleconsultation-main-dashboard";

                }                
                
            };

			function connectSocketServerExit() {

            
					var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);

                
					var ws3 = new window[support]('ws://localhost:2012/');

               
					// when data is comming from the server, this metod is called
					ws3.onmessage = function (evt) {
					
					}	

					ws3.onopen = function () {          
						ws3.send("ecgoff");
                  
					};

					// when the connection is closed, this method is called
					ws3.onclose = function () {
					//  appendMessage('* Connection closed<br/>');
                 
					}
				}		
			
            scope.exitConfirm.exitSession = function(){
                //alert(HigiKioskStorageService.returnSessionData('userEmail'));
                $rootScope.Crossbar.closeConnection();
                if(HigiKioskStorageService.returnSessionData('userEmail') != undefined){
                //login user exit
                if($rootScope.mode == "ekg" || $rootScope.mode == "bpw") {
                    connectSocketServerExit();
                }
                $rootScope.ToDisableECGAlert = false;
                //scope.azureData = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitConfirmation_yesButton', 'button', 'pressed');
                //console.log(scope.azureData);
                scope.kioskConfigurationResult=HigiKioskStorageService.returnSessionData('kioskConfigurationResult');
                //alert(scope.kioskConfigurationResult.organizations[0]);
                // if(machine_name == 'Developer machine') 

                if(scope.kioskConfigurationResult.organizations[0] == 'Persistent Systems') {   
                     // third party check  
                    // alert("$rootScope.testCompleted - " + $rootScope.testCompleted);                    

                    if($rootScope.testCompleted == true){    
                   // alert("$rootScope.testCompleted - " + $rootScope.testCompleted);                    
                        $rootScope.loadModal({id: 'thirdParty'});
                        $rootScope.toggleExitModalVisible();
                        $rootScope.clearModal();
                    }   else { 
                    // alert("$rootScope.testCompleted - false"); 
                        $rootScope.toggleExitModalVisible();
                        $rootScope.clearModal();
                        window.location = "#/comebacksoon";      

                    } 
                } else {
                   // alert(" Other KIOSK user");
                    $rootScope.toggleExitModalVisible();
                    $rootScope.clearModal();
                    window.location = "#/comebacksoon";
                }
            } else {
               // alert("guestuser");
                // guest user exit
                if($rootScope.mode == "ekg" || $rootScope.mode == "bpw")
                {
                    connectSocketServerExit();
                }

                $rootScope.ToDisableECGAlert = false;
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitConfirmation_yesButton', 'button', 'pressed');
                $rootScope.toggleExitModalVisible();
                $rootScope.clearModal();
                window.location = "#/comebacksoon";
            }
			/*
			if($rootScope.mode == "ekg" || $rootScope.mode == "bpw")
			{
					connectSocketServerExit();
			}
                $rootScope.ToDisableECGAlert = false;
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_exitConfirmation_yesButton', 'button', 'pressed');
                $rootScope.toggleExitModalVisible();
                $rootScope.clearModal();
                window.location = "#/comebacksoon";*/
                $rootScope.ispaymentSuccesFailureContent = false;
                localStorage.clear();
            };

            $rootScope.exitCurrentSession = scope.exitConfirm.exitSession;

            scope.exitConfirm.init();
        }

    };
}]);

