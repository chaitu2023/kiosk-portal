higiKioskControllers.directive("uiTesting", ['$rootScope', '$timeout', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$route', function($rootScope, $timeout, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $route) {
        return {
            restrict : 'E',
            templateUrl: 'components/modal/ui-testing.html',
            scope : false,
            link : function(scope, element, attr){
                scope.uiTesting = scope.uiTesting || new Object();
                scope.uiTesting.buttonVisible = $rootScope.testingMode;
                scope.uiTesting.gender = HigiKioskStorageService.returnSessionData('gender');
                scope.uiTesting.bpErrorObject = {stopReason : "UserStop"};
                scope.dragableWatch = $rootScope.$watch('uiTestingPanelVisible', function(newVal, oldVal){
                    if(newVal){
                        $timeout(function(){
                            $("#ui-testing-panel").drags();
                        }, 500);
                    }
                });
                scope.uiTesting.showUiTestingPanel = function(){
                    $rootScope.uiTestingPanelVisible = true;


                };

                scope.uiTesting.shortcuts = [
                 {label : "Splash page", url : "index.html"},
                 {label : "Splash page (testing mode)", url : "index.html#/welcome/testing"},
                 {label : "BP test", url : "#/bloodpressure1/forward/testing"},
                 {label : "BP results", url : "#/bloodpressure3/forward/testing"},
                 {label : "BMI test", url : "#/weight1/forward/testing"},
                 {label : "BMC test (starts at BMI results)", url : "#/weight3/forward/testing"},
                 {label : "BMC results", url : "#/weight5/forward/testing"},
                 {label : "Final results (Completed all tests)", url : "#/finish/forward/testing"}
                ];

                scope.uiTesting.startUiTestingPress = function(){
                    scope.uiTesting.pressTimer = $timeout(function(){
                        window.location = "index.html#/welcome/testing";
                        scope.uiTesting.buttonVisible = true;
                    }, 5000);
                };
                scope.uiTesting.endUiTestingPress = function(){
                    if( $rootScope.testingMode != true){
                        $timeout.cancel( scope.uiTesting.pressTimer);
                    }
                };

                scope.uiTesting.toggleStand = function(){
                    $rootScope.isUserSeated = !$rootScope.isUserSeated;
                    if($rootScope.isUserSeated){
                        scope.uiTesting.standButtonClass = '';
                        $rootScope.kioskADAMode = false;
                    }else {
                        scope.uiTesting.standButtonClass = 'standing';
                        $rootScope.kioskADAMode = false;
                    }
                };

                scope.uiTesting.setGender = function(sex){
                  if(sex == "m"){
                      HigiKioskStorageService.saveSessionData("gender", "m");
                      scope.uiTesting.genderClassMale = 'active';
                      scope.uiTesting.genderClassFemale = '';

                  }  else {
                      HigiKioskStorageService.saveSessionData("gender", "f");
                      scope.uiTesting.genderClassMale = '';
                      scope.uiTesting.genderClassFemale = 'active';
                  }
                };

                scope.uiTesting.showBpErrorButton = typeof($rootScope.bpError) == "function";
                scope.uiTesting.showHandRemovedButton = typeof($rootScope.bmcHandRemoved) == "function";
                $rootScope.$watch('bpError', function(newVal, oldVal){
                    scope.uiTesting.showBpErrorButton = typeof($rootScope.bpError) == "function";
                });
                $rootScope.$watch('bmcHandRemoved', function(newVal, oldVal){
                    scope.uiTesting.showHandRemovedButton = typeof($rootScope.bmcHandRemoved) == "function";
                });
                $rootScope.$watch('sessionData.gender', function(newVal, oldVal){
                    scope.uiTesting.setUserData();
                });
                $rootScope.$watch('sessionData.height', function(newVal, oldVal){
                    scope.uiTesting.setUserData();
                });
                $rootScope.$watch('sessionData.birthdate', function(newVal, oldVal){
                    scope.uiTesting.setUserData();
                });
                scope.uiTesting.simulateBpError = function(){
                    $rootScope.bpError(scope.uiTesting.bpErrorObject);
                };
                scope.uiTesting.simulateBmcHandRemoved = function(){
                    //Cancel mock data timeouts
                    clearTimeout(window.t);
                    $rootScope.bmcHandRemoved();
                };
                scope.uiTesting.toggleUiTestingPanel = function(){
                        $rootScope.uiTestingPanelVisible = !$rootScope.uiTestingPanelVisible;
                };

                scope.uiTesting.setUserData = function(){
                    scope.uiTesting.gender = HigiKioskStorageService.returnSessionData('gender');
                    scope.uiTesting.height = HigiKioskStorageService.returnSessionData('height');
                    scope.uiTesting.birthdate = HigiKioskStorageService.returnSessionData('birthdate');
                };

                scope.uiTesting.setUiLanguage = function(lang){
                    //0 = english, 1 = spanish
                    $rootScope.setLanguage( $rootScope.languages[lang])
                };

                scope.init = function(){
                    (function($) {
                        $.fn.drags = function(opt) {

                            opt = $.extend({handle:"",cursor:"move"}, opt);

                            if(opt.handle === "") {
                                var $el = this;
                            } else {
                                var $el = this.find(opt.handle);
                            }

                            return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
                                if(opt.handle === "") {
                                    var $drag = $(this).addClass('draggable');
                                } else {
                                    var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
                                }
                                var z_idx = $drag.css('z-index'),
                                    drg_h = $drag.outerHeight(),
                                    drg_w = $drag.outerWidth(),
                                    pos_y = $drag.offset().top + drg_h - e.pageY,
                                    pos_x = $drag.offset().left + drg_w - e.pageX;
                                $drag.css('z-index', 1000).parents().on("mousemove", function(e) {
                                    $('.draggable').offset({
                                        top:e.pageY + pos_y - drg_h,
                                        left:e.pageX + pos_x - drg_w
                                    }).on("mouseup", function() {
                                        $(this).removeClass('draggable').css('z-index', z_idx);
                                    });
                                });
                                e.preventDefault(); // disable selection
                            }).on("mouseup", function() {
                                if(opt.handle === "") {
                                    $(this).removeClass('draggable');
                                } else {
                                    $(this).removeClass('active-handle').parent().removeClass('draggable');
                                }
                            });

                        }
                    })(jQuery);

                }

                scope.init();
            }
        }
    }]);


