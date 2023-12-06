higiKioskControllers.directive('confirmPpolTerms',['$http', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskUserService' , '$route', '$rootScope', '$sce', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, $route, $rootScope, $sce) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/terms/confirm-ppol-and-terms.html',
        link :function(scope, elem, attr){
            scope.termsUpdate = scope.termsUpdate || new Object();
            scope.termsUpdate.serverErrorMessage = "welcomeModals.server.failure";
            attr.toconfirm;
            if (attr.toconfirm == "both") {

                var filename = HigiKioskStorageService.getSettingsValue('terms.filename');


                $http.get('docs/' + scope.langClass + '/' + filename + '.html').success(function (data) {
                    scope.termsOfServicePpol = data + '<a id="ppol_anchor" name="privacy"></a>';
                    filename = HigiKioskStorageService.getSettingsValue('privacy.policy.filename');
                    $http.get('docs/' + scope.langClass + '/' +  filename + '.html').success(function (data) {

                        scope.termsOfServicePpol += data;
                        scope.termsOfServicePpol = $sce.trustAsHtml(scope.termsOfServicePpol);
                        scope.termsScroller = null;
                        scope.termsScroller = new iScroll("login_tos_privacy_confirm_wrapper", {
                            hScroll: false,
                            scrollbarClass: 'iscroll_scrollbar'
                        });
                        scope.termsScroller.scrollTo(0, 0, 1000, false);

                        $timeout(function () {
                            scope.termsScroller.refresh();

                            //if both, set up scroller
                            $(".terms_scroll").click(function(e){
                                e.preventDefault();
                                var anchor = $(this).attr('href');
                                console.log(anchor)
                                var offset = (anchor == "#ppol_anchor") ? -1 * ($(anchor).offset().top - 160) : 0;
                                scope.termsScroller.scrollTo(0, offset, 1500, false);
                            });

                        }, 0)
                    });
                });

                scope.termsUpdate.title = 'welcomeModals.terms.of.service.privacy.policy.changed';
                scope.termsUpdate.cancel = "welcomeModals.terms.of.service.privacy.policy.changed.cancel";
                scope.termsUpdate.accept = "welcomeModals.terms.of.service.privacy.policy.changed.accept";
                scope.termsUpdate.saving = false;

            } else if (attr.toconfirm == "terms") {

                var filename = HigiKioskStorageService.getSettingsValue('terms.filename');
                $http.get('docs/' + scope.langClass + '/' + filename + '.html').success(function (data) {
                    scope.termsOfServicePpol = data;
                    scope.termsOfServicePpol = $sce.trustAsHtml(scope.termsOfServicePpol);
                    scope.termsScroller = null;
                    scope.termsScroller = new iScroll("login_tos_privacy_confirm_wrapper", {
                        hScroll: false,
                        scrollbarClass: 'iscroll_scrollbar'
                    });
                    scope.termsScroller.scrollTo(0, 0, 1000, false);

                    $timeout(function () {
                        scope.termsScroller.refresh();
                    }, 0)
                });
                scope.termsUpdate.title = 'welcomeModals.terms.of.service.changed';
                scope.termsUpdate.cancel = "welcomeModals.terms.of.service.changed.cancel";
                scope.termsUpdate.accept = "welcomeModals.terms.of.service.changed.accept";
                scope.termsUpdate.saving = false;

            } else if (attr.toconfirm == "ppol") {

                filename = HigiKioskStorageService.getSettingsValue('privacy.policy.filename');
                $http.get('docs/' + scope.langClass + '/' + filename + '.html').success(function (data) {
                    scope.termsOfServicePpol = data;
                    scope.termsOfServicePpol = $sce.trustAsHtml(scope.termsOfServicePpol);
                    scope.termsScroller = null;
                    scope.termsScroller = new iScroll("login_tos_privacy_confirm_wrapper", {
                        hScroll: false,
                        scrollbarClass: 'iscroll_scrollbar'
                    });
                    scope.termsScroller.scrollTo(0, 0, 1000, false);

                    $timeout(function () {
                        scope.termsScroller.refresh();
                    }, 0)
                });
                scope.termsUpdate.title = 'welcomeModals.privacy.policy.changed';
                scope.termsUpdate.cancel = "welcomeModals.privacy.policy.changed.cancel";
                scope.termsUpdate.accept = "welcomeModals.privacy.policy.changed.accept";
                scope.termsUpdate.saving = false;


            }

            scope.termsUpdate.iScrollScrollUp = function(){
                scroller =  scope.termsScroller;
                pageHeight = 600;
                dest = ((scroller.y + (pageHeight *.75) <= 0)) ? (scroller.y + (pageHeight *.75)) : 0;
                scroller.scrollTo(0, dest, 400);
            };
            scope.termsUpdate.iScrollScrollDown = function(){
                scroller =  scope.termsScroller;
                pageHeight = 600;
                dest = ((scroller.scrollerH - (pageHeight  *.75) ) > (scroller.y + pageHeight)) ? (scroller.y - (pageHeight *.75)) : (scroller.scrollerH - pageHeight);
                scroller.scrollTo(0,  dest, 400);
            };

            scope.termsUpdate.declineTerms = function () {
                if(attr.toconfirm == "both"){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_tos_and_privacyButton_Decline', 'button', 'pressed');
                } else if (attr.toconfirm == "terms") {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_tosButton_Decline', 'button', 'pressed');
                } else {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_privacyButton_Decline', 'button', 'pressed');
                }
                window.location = "index.html";
            };
            scope.termsUpdate.showServerError = function(){
                scope.termsUpdate.serverError = true;
                $timeout(function(){
                    scope.$apply(function(){
                        scope.termsUpdate.saving = false;
                        scope.termsUpdate.serverError = false;
                    });

                }, 5000);
            };
            scope.termsUpdate.acceptTerms = function(){
                //logEvent(keyboard_current_state + '_acceptTermsCheckbox', 'checkbox', 'checked');
                //No longer checkbox, just buttons so modifying

                if(attr.toconfirm == "both"){
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_tos_and_privacyButton_Accept', 'button', 'pressed');
                } else if (attr.toconfirm == "terms") {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_tosButton_Accept', 'button', 'pressed');
                } else {
                    JkioskService.logEvent($rootScope.currentKeyboardState + '_privacyButton_Accept', 'button', 'pressed');
                }

                scope.termsUpdate.saving = true;
                var updatedUser = HigiKioskStorageService.returnSessionData('user');

                console.log("Accepting terms - " + updatedUser.terms.termsFileName);
                console.log("Accepting privacy - " + updatedUser.privacyAgreed.privacyFileName);

                updatedUser.terms.termsFileName = HigiKioskStorageService.getSettingsValue('terms.filename');
                if(typeof(updatedUser.privacyAgreed == "undefined")){
                    updatedUser.privacyAgreed = {'privacyFileName' : HigiKioskStorageService.getSettingsValue('privacy.policy.filename')};
                }else {
                    updatedUser.privacyAgreed.privacyFileName = HigiKioskStorageService.getSettingsValue('privacy.policy.filename');
                }

                HigiKioskStorageService.saveSessionData( 'user', updatedUser );
                //Check onboarding finished, if so, lastcheckin else close modal
                if(HigiKioskStorageService.returnSessionData('gender') != undefined && HigiKioskStorageService.returnSessionData('birthdate') != undefined  && HigiKioskStorageService.returnSessionData('height') != undefined){
                    var success = function(e){

                        scope.modalConfirmHide();
                        scope.loadModal({id : "lastcheckin"});

                    };
                }
                else {
                    var success = function(e){
                        scope.modalConfirmHide();
                        $rootScope.showLoggedInNav();
                        $rootScope.clearModal();
                    };

                }
                var failure = function(){
                    scope.termsUpdate.showServerError();
                };
                HigiApiService.UpdateUserAsync(updatedUser.id, updatedUser, success, failure);
            }
        }

    };
}]);