//Global audio

angular
    .module("higiKioskUi")
    .directive("platformHandlers", ['$q', 'JkioskService', '$rootScope', '$timeout', '$route', 'HigiKioskStorageService', function($q, JkioskService, $rootScope, $timeout, $route, HigiKioskStorageService) {
        return {
            restrict : 'E',

            scope : false,
            link : function(scope, element, attr){
                scope.platformHandlers = scope.platformHandlers || new Object();
                scope.platformHandlers.init = function(){

                    $rootScope.isUserSeated = false;
                    $rootScope.timeoutsReady.promise
                        .then(function(){
                           return JkioskService.onPlatformReady(
                                scope.platformHandlers.onUserSit,
                                scope.platformHandlers.onUserStand,
                                scope.platformHandlers.checkWeight);
                        }).then(
                        function(){
                            //scope.setLanguage()
                        }
                    );
                };
                scope.platformHandlers.onUserSit = function(){
                    console.log('onUserSit callback fired');
                    $rootScope.stopSessionTimeout();
                    $rootScope.kioskADAMode = false;
                    $rootScope.isUserSeated = true;
                    scope.$apply();
                };
                scope.platformHandlers.onUserStand = function(){
                    console.log("onUserStand callback firing.");                    

                     if(localStorage.getItem("safalPage") == "true"){
                        $rootScope.startSessionTimeout();                        
                    } else {
                        if($rootScope.mosambeePaymentEnable){

                            if(($route.current.$$route.originalPath.search("mosambeePayment") != -1 && $rootScope.globalModalVisible)){
                                //Modal is visible on splash page. User stood up. Start  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if(HigiKioskStorageService.returnSessionData('logged_in') == true){
                                //User is logged in. User stood up. Start  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if($route.current.$$route.originalPath.search("mosambeePayment") == -1 && $rootScope.paymentSessionActive == true){
                                //UI is not on splash page. User stood up.  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if (HigiKioskStorageService.returnSessionData('session_active') != undefined){
                                //Session is open. User stood up. Start session timeout
                                $rootScope.startSessionTimeout();
                            }

                        }else{
                            if(($route.current.$$route.originalPath.search("welcome") != -1 && $rootScope.globalModalVisible)){
                                //Modal is visible on splash page. User stood up. Start  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if(HigiKioskStorageService.returnSessionData('logged_in') == true){
                                //User is logged in. User stood up. Start  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if($route.current.$$route.originalPath.search("welcome") == -1 ){
                                //UI is not on splash page. User stood up.  Start session timeout
                                $rootScope.startSessionTimeout();
                            } else if (HigiKioskStorageService.returnSessionData('session_active') != undefined){
                                //Session is open. User stood up. Start session timeout
                                $rootScope.startSessionTimeout();
                            }

                        }
                    }

                    $rootScope.isUserSeated = false;
                    scope.$apply();
                };
                scope.platformHandlers.checkWeight = function (response) {
                    if (response.hasWeight == true) {
                        scope.platformHandlers.onUserSit();
                    }
                    else {
                        scope.platformHandlers.onUserStand();
                    }
                    //JkioskService.registerKiosk();
                };
                $rootScope.seatStatus = function() {
                    console.log("Seated = " + $rootScope.isUserSeated);
                    console.log("Seat open = " + $rootScope.isSeatOpen);
                };
                $rootScope.setKioskADAMode = function() {
                    if(!$rootScope.isUserSeated){
                        $rootScope.kioskADAMode = true;
                        JkioskService.logEvent('Kiosk_ADA_Mode', 'hardware', 'active');
                    }else {
                        $rootScope.kioskADAMode = false;
                    }
                    console.log("Setting ada mode = " + $rootScope.kioskADAMode)
                };

                scope.platformHandlers.init();
            }
        }
    }]);
