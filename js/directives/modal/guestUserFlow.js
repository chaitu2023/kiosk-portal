higiKioskControllers.directive('guestUserModal', ['$http', 'HigiKioskFlow' ,'$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , '$route' , function($http, HigiKioskFlow, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $route) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/guest-user.html',
        controller :function($scope, $http, $rootScope){
            $scope.guestUserModal = new Object();

            $scope.guestUserModal.init = function(){

             $scope.guestUserModal.benefitsofRegn = "welcomeModals.benefitsofRegn";
             $scope.guestUserModal.borPoint1 = "welcomeModals.borPoint1";
             $scope.guestUserModal.borPoint2 = "welcomeModals.borPoint2";
             $scope.guestUserModal.borPoint3 = "welcomeModals.borPoint3";
             $scope.guestUserModal.borPoint4 = "welcomeModals.borPoint4";
             $scope.guestUserModal.areyouSure = "welcomeModals.areyouSure";
             $scope.guestUserModal.guestUser2 = "welcomeModals.guestUser2";
             $scope.guestUserModal.yesContinue = "welcomeModals.yesContinue";
             $scope.guestUserModal.noRegister = "welcomeModals.noRegister";

             //scroll bar for benifit of reg. window
             $timeout(function() {$scope.scroll = new FTScroller(document.getElementById('benefitConatainerID'), {scrollingX: false});}, 2000);
            };

            $rootScope.guestUserModalInit = $scope.guestUserModal.init;

            $scope.guestUserModal.continueAsGuestUser = function(){
              $rootScope.mode = $rootScope.selectedVital[0];
              HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
              $rootScope.clearModal();
              if( HigiKioskUserService.onboardingDone()){               
                  console.log("login onboardingDone if");
                  console.log("Mode: " + $rootScope.mode);
                    if($rootScope.mode == "w") {
                         window.location = "#/weight1/forward";
                    } else if ($rootScope.mode == "bp") {
                         window.location = "#/bloodpressure1/forward";
                    } else if ($rootScope.mode == "ekg") {
                        window.location = "#/zugecgmode/forward";
                    } else if ($rootScope.mode == "bmc") {
                         window.location = "#/weight1/forward";
                    } else if ($rootScope.mode == "spo2") {
                         window.location = "#/spotwo1/forward";
                    } else if ($rootScope.mode == "temp") {
                         window.location = "#/temp1/forward";
                    } else if ($rootScope.mode == "ivt") {
                        window.location = "#/invasiveInstruction/forward";
                    } else if ($rootScope.mode == "bpw") {
                        var currenttest;
                        window.location = HigiKioskFlow.nextTest($rootScope.mode,currenttest);
                    }
                } else {
                    window.location =  "#/onboarding1/forward/enter";
                }
            }

            $scope.guestUserModal.checkForKioskPaymentMode = function(){
                if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
                    $rootScope.clearModal();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment = $scope.guestUserModal.continueAsGuestUser;
                    let modes = $rootScope.selectedVital;
                    localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                    //HigiKioskStorageService.saveSessionData('paymentSessionVitalTest', modes);
                    //To hide the reason for visit close button.
                    $(".keyboard_class_close_btn").hide();

                    $timeout(() => {
                        $rootScope.loadModal({id: 'reasonForVisit'});
                    },150);
                }else{
                   $scope.guestUserModal.continueAsGuestUser(); 
                }
            }

           $scope.guestUserModal.init(); 
        }
    };
}]);

