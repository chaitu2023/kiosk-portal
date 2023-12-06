higiKioskControllers.directive('notificationBar',['$rootScope', '$http', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskAnimationService' , 'HigiKioskUtilitiesService' , function($rootScope, $http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskAnimationService, HigiKioskUtilitiesService) {
    return {
        restrict: 'E',
            scope: false,
            templateUrl : 'components/notificationbar.html',
            link : function (scope, element, attrs) {
                HigiKioskStorageService.watchSessionData('logged_in', function(newValue, oldValue) {
                    if(newValue == true && oldValue == false){
                        scope.notificationBar.hideNotificationBar();
                    }
                });
                scope.notificationBar = new Object();
                scope.notificationBar.notifbarTitleOffline = "global.api.offline";
                scope.notificationBar.notificationVisible = false;
                scope.notificationBar.barClass = '';
                scope.notificationBar.offline = !HigiKioskStorageService.returnSessionData('apiAvailable');

                scope.notificationBar.countUpTotalCallback = function(val){
                    HigiKioskUtilitiesService.safeApply(scope, function(){
                        scope.finalResultsPointTotal = val;
                    });
                };
                scope.notificationBar.offlineNotification = function(promise) {
                    scope.notificationBar.offlineMessage = true;
                    scope.notificationBar.notifbarPinnedClass = 'notifications_bar_title_pinned';
                    scope.notificationBar.showNotificationBar();
                    promise.resolve();

                }
                scope.notificationBar.checkinPointsNotification = function(promise){
                    scope.notificationBar.earnedPoints = scope.mode == "bpw" ? HigiKioskStorageService.getSettingsValue('kiosk.earndIt.earndItPointsForCheckinFull') : HigiKioskStorageService.getSettingsValue('kiosk.earndIt.earndItPointsForCheckin');
                    scope.notificationBar.loginMessage = HigiKioskStorageService.returnSessionData('logged_in');
                    scope.notificationBar.pointMessage = !scope.notificationBar.loginMessage;
                    scope.notificationBar.notifbarPinnedClass = '';
                    scope.notificationBar.showNotificationBar();
                    $timeout(function(){
                        scope.notificationBar.hideNotificationBar(promise);
                        if(!HigiKioskStorageService.returnSessionData('logged_in')){
                            $timeout(function(){
                                scope.notificationBar.pointMessage = false;
                                scope.notificationBar.loginMessage = true;
                                scope.notificationBar.checkinPointsNotificationUnauth();}
                            , 500);
                        }else {
                            $("#point-token").effect('puff', "easeInOutElastic");
                            scope.notificationBar.pointMessage = true;
                            scope.notificationBar.loginMessage = false;
                            //scope.finalResultsPointTotal = (HigiApiService.getEarnditPoints(HigiKioskStorageService.returnSessionData('user').id)) ? HigiApiService.getEarnditPoints(HigiKioskStorageService.returnSessionData('user').id).points : 0;
                            scope.notificationBar.pointCountUp = HigiKioskAnimationService.countUp("point-total", scope.finalResultsPointTotal, scope.notificationBar.earnedPoints + scope.finalResultsPointTotal, 0, 5, null, scope.notificationBar.countUpTotalCallback);
                            scope.notificationBar.pointCountUp.start(function(){
                           })
                        }
                    }, 2000);

                };

                scope.notificationBar.checkinPointsNotificationUnauth = function(promise){
                    scope.notificationBar.notifbarPinnedClass = 'notifications_bar_title_pinned';
                    scope.notificationBar.showNotificationBar(promise);
                };

                scope.notificationBar.checkinPointsNotificationFinalResultsLogin = function(promise){
                    scope.notificationBar.notifbarPinnedClass = '';
                    scope.notificationBar.pointMessage = true;
                    scope.notificationBar.loginMessage = false;
                    $("#point-score-auth-icon").addClass('blurpulse');
                    var hasPoints = function(points){
                        scope.finalResultsPointTotal = points;
                        scope.notificationBar.pointCountUp = HigiKioskAnimationService.countUp("point-total", scope.finalResultsPointTotal, scope.notificationBar.earnedPoints + scope.finalResultsPointTotal, 0, 5, null, scope.notificationBar.countUpTotalCallback);
                        scope.notificationBar.pointCountUp.start(function(){

                        });
                        scope.notificationBar.showNotificationBar(promise);
                    };
                    var noPoints = function(){
                        scope.finalResultsPointTotal = 0;
                        scope.notificationBar.pointCountUp = HigiKioskAnimationService.countUp("point-total", scope.finalResultsPointTotal, scope.notificationBar.earnedPoints + scope.finalResultsPointTotal, 0, 5, null, scope.notificationBar.countUpTotalCallback);
                        scope.notificationBar.pointCountUp.start(function(){

                        });
                        scope.notificationBar.showNotificationBar(promise);
                    };
                    HigiApiService.getEarnditPoints(HigiKioskStorageService.returnSessionData('user').id, hasPoints, noPoints);
                };

                scope.notificationBar.showNotificationBar = function(promise){
                    //You earned <span class=\"points_icon\" id=\"point-token\">50</span> points for your higi Check-in
                    scope.notificationBar.notifbarTitleAuthOneOfTwo = "finalresults.points.earned.notificationbar.one.of.two";
                    scope.notificationBar.earnedPoints =   scope.mode == "bpw" ? HigiKioskStorageService.returnSessionData('earndItPointsForCheckin') : HigiKioskStorageService.returnSessionData('earndItPointsForCheckin')/2;
                    scope.notificationBar.notifbarTitleAuthTwoOfTwo = "finalresults.points.earned.notificationbar.two.of.two";

                    if(HigiKioskStorageService.returnSessionData('logged_in')){
                        scope.notificationBar.notifbarTitle = 'finalresults.points.earned.notificationbar' ;
                    } else {
                        scope.notificationBar.notifbarTitle = 'finalresults.unauth.notificationbar';
                    }


                    scope.notificationBar.barClass = 'notification-bar-up';
                    scope.notificationBar.notificationVisible = true;

                    $rootScope.interfaceSounds.play("earnditCountupSnd");

                    if(typeof(promise) != "undefined"){
                        setTimeout(function(){promise.resolve()}, 3000);
                    }
                };
                scope.notificationBar.hideNotificationBar = function(promise){
                    scope.notificationBar.barClass = 'notification-bar-down';
                    scope.notificationBar.notificationVisible = false;
                    if(typeof(promise) != 'undefined'){
                        promise.resolve();
                    }
                };

                scope[attrs.promisename].resolve();
            }
        }
    }]);



