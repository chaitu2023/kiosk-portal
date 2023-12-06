 higiKioskControllers.directive('sessionExitConfirmModal', ['$rootScope' , '$location', 'HigiKioskStorageService' , '$interval', '$timeout', '$route', 'HigiKioskUserService', 'JkioskService', 'HigiKioskFlow' , function($rootScope, $location, HigiKioskStorageService, $interval, $timeout, $route, HigiKioskUserService, JkioskService, HigiKioskFlow) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/session-timeout.html',
        link :function(scope, elem, attr){
            scope.sessionExitConfirm = new Object();
            scope.sessionExitConfirm.init = function() {
                //alert("sessionExitConfirm.init");
                //Set localization fields
                //$rootScope.sessionTimeoutOccurred = false;
                scope.sessionExitConfirm.title = "timeout.are.you.still.there";
                scope.sessionExitConfirm.subTitle = "timeout.your.session.is.about.to.time.out";
                scope.sessionExitConfirm.message = "timeout.want.to.continue";
                scope.sessionExitConfirm.cancel = "global.continue";
                scope.sessionExitConfirm.standupTimer = HigiKioskStorageService.getSettingsValue('session.timeout.seat.time');
                scope.sessionExitConfirm.AdaTimer = HigiKioskStorageService.getSettingsValue('session.timeout.ada.time');
                scope.sessionExitConfirm.timeLeft = HigiKioskStorageService.getSettingsValue('session.timeout.warning.time.seconds');

                $rootScope.timeoutsReady.resolve();
            };

            scope.sessionExitConfirm.countDown = function(){
               // alert("sessionExitConfirm.countDown");
                //If audio, video or image ad playing, restart the timeout.
                if(scope.videoPlaying == true || scope.audioPlaying == true ||  scope.adIsPlaying == true || $rootScope.bpTestRunning == true) {
                    scope.sessionExitConfirm.restartTimeout();
                }else {
                    var path = $location.path();
                    if(!$rootScope.eSanjeevaniFlow) { 
                        $timeout.cancel(scope.sessionExitConfirm.sessionTimeout.timer);
                        $rootScope.sessionExitConfirmVisible = true;

                        scope.sessionExitConfirm.interval =  $interval(function(){
                            scope.sessionExitConfirm.timeLeft = scope.sessionExitConfirm.timeLeft -1;
                            if(scope.sessionExitConfirm.timeLeft <= 0){
                                $interval.cancel(scope.sessionExitConfirm.interval);
                                scope.sessionExitConfirm.exitSession();
                            }
                        },1000);
                    }                   
                }
            };

            scope.sessionExitConfirm.returnSession = function(){
               // alert("sessionExitConfirm.returnSession");
                $interval.cancel(scope.sessionExitConfirm.interval);
                scope.sessionExitConfirm.timeLeft = HigiKioskStorageService.getSettingsValue('session.timeout.warning.time.seconds');
                $rootScope.sessionExitConfirmVisible = false;
                scope.sessionExitConfirm.restartTimeout();
            };

            scope.sessionExitConfirm.exitSession = function(){
                //alert("sessionExitConfirm.exitSession");
                JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName'), 'session', 'timed out');
                scope.sessionExitConfirm.removeTimeout();
                $rootScope.clearModal();
                $rootScope.sessionExitConfirmVisible = false;
                var path = $location.path();
                // Sumithra - ECG Leg instruction pops up on top of goodbye screen starts
                if((path == "/zugecgprogression/forward")  || (path == "/zugecginstruction/forward")){
                    $rootScope.StopLEGHandDetection = true;
                    console.log("Session timeout occured while in ECG   "+path);
                    $rootScope.stopECGProgress();
                }
                setTimeout(function() {
                   window.location = "#/comebacksoon"           
                }, 500);  
                localStorage.clear();
                // Sumithra - ECG Leg instruction pops up on top of goodbye screen ends          
            };

            scope.sessionExitConfirm.removeTimeout = function(){
                ///alert("sessionExitConfirm.removeTimeout");
                try{
                    if(scope.sessionExitConfirm.sessionTimeout.timer) {
                        $timeout.cancel(scope.sessionExitConfirm.sessionTimeout.timer);
                        scope.sessionExitConfirm.sessionTimeout.timer = null;
                        //console.log('removing timeout');
                    }else {
                        //console.log('no timer to delete');
                    }
                }catch (e){
                       //console.log('no timer to delete');
                }
            };


            scope.sessionExitConfirm.restartTimeout = function() {
                //alert("sessionExitConfirm.restartTimeout");
                scope.sessionExitConfirm.removeTimeout();
                try{
                    //if not seated, and not already on exit screen - restart timer
                    if(!$rootScope.isUserSeated && $route.current.$$route.originalPath.search("comebacksoon") == -1){
                        scope.sessionExitConfirm.startTimeout();
                    }

                }catch(e){

                }

            };

            scope.sessionExitConfirm.startTimeout = function(){
                
               console.log('starting timer');
               $rootScope.sessionTimeoutOccurred = true;
                
                scope.sessionExitConfirm.sessionTimeout =  scope.sessionExitConfirm.sessionTimeout || new Object();
                scope.sessionExitConfirm.sessionTimeout.timeoutRunning = true;
                $rootScope.timeoutRunning = true;
                if(scope.sessionExitConfirm.sessionTimeout.timer){
                    $timeout.cancel(scope.sessionExitConfirm.sessionTimeout.timer);
                    scope.sessionExitConfirm.sessionTimeout.timer = null;
                }

                var timeout = ($rootScope.kioskADAMode) ?  scope.sessionExitConfirm.AdaTimer :  scope.sessionExitConfirm.standupTimer;
                scope.sessionExitConfirm.sessionTimeout.timer = $timeout(scope.sessionExitConfirm.countDown, timeout);
            
            };


            $rootScope.startSessionTimeout = scope.sessionExitConfirm.startTimeout;
            $rootScope.resetSessionTimeout = scope.sessionExitConfirm.restartTimeout;
            $rootScope.stopSessionTimeout = scope.sessionExitConfirm.removeTimeout;
            $rootScope.timeoutCountdown = scope.sessionExitConfirm.countDown;
            $rootScope.clearCurrentSession = scope.sessionExitConfirm.exitSession
            scope.sessionExitConfirm.init();
            

        }

    };
}]);
