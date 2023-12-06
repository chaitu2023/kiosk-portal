//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("nameEntry", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiApiService', 'JkioskService', 'HigiKioskUserService', '$http', '$sce', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, HigiApiService, JkioskService, HigiKioskUserService, $http, $sce,  $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/name-entry.html',
            link: function (scope, element, attr) {

                scope.nameEntry = new Object();
                scope.nameEntry.joinButton = "global.join.challenge";
                scope.nameEntry.firstName = "global.first.name";
                scope.nameEntry.lastName = "global.last.name";
                scope.nameEntry.officialRules = "global.challenge.official.rules";
                scope.nameEntry.registerDisclaimer = "global.challenge.terms.agree";
                scope.nameEntry.alreadyJoined = "global.join.challenge.joined";
                scope.nameEntry.disclaimerText = "";
                scope.nameEntry.submitting = false;
                scope.nameEntry.nameValid = false;
                scope.nameEntry.fields = [
                    {id : "firstName" , defaultText : scope.nameEntry.firstName , text : '' , type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.nameEntry.validateName()},
                        focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                    {id : "lastName" , defaultText : scope.nameEntry.lastName , text : '', textMasked : '' , textMaskedDisabled : false, type :'text' , visible : true , selectedClass : '',
                        callback : function(){scope.nameEntry.validateName()},
                        focus : function(){$rootScope.focusField(this)}}
                ];
                $rootScope.fields.nameEntry = scope.nameEntry.fields;
                scope.nameEntry.validateName = function(){
                    scope.nameEntry.nameValid = scope.nameEntry.fields[0].text != "" &&  scope.nameEntry.fields[1].text != "";
                };
                scope.nameEntry.toggleTermsAcceptance = function(){
                    scope.nameEntry.termsAccepted = !scope.nameEntry.termsAccepted;
                    if(scope.nameEntry.termsAccepted){
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'checked');
                        scope.nameEntry.registerButtonClass = 'active_btn';
                    } else {
                        JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreeToTermsCheckbox', 'checkbox', 'unchecked');
                        scope.nameEntry.registerButtonClass = '';
                    }
                };
                scope.nameEntry.bobble = function(){

                    if(scope.nameEntry.bobbleState == false){
                        $(".cbox-glow-name-entry").transition({ scale : 1.6, duration : 1000});
                        scope.nameEntry.bobbleState = true;
                    }
                    else {
                        scope.nameEntry.bobbleState = false;
                        $(".cbox-glow-name-entry").transition({ scale : 1.3 , duration : 1000 });
                    }
                    $timeout(scope.nameEntry.bobble, 1500);
                };
                scope.nameEntry.bobble();

                scope.nameEntry.saveName = function(){
                    //Update
                    JkioskService.logEvent('challenge_JoinChallengeSaveName', 'button', 'pressed');
                    $rootScope.lastCheckin.firstName = scope.nameEntry.fields[0].text;
                    $rootScope.lastCheckin.lastName = scope.nameEntry.fields[1].text;
                    $rootScope.lastCheckin.nameShow = true;
                    HigiKioskStorageService.saveSessionData('firstName', $rootScope.lastCheckin.firstName);
                    HigiKioskStorageService.saveSessionData('lastName', $rootScope.lastCheckin.lastName);
                    //$rootScope.lastCheckin.name = $rootScope.firstName + " " + $rootScope.lastName;
                    scope.nameEntry.submitting = true;
                    scope.nameEntry.onServer = HigiKioskStorageService.returnSessionData('user');
                    scope.nameEntry.userUpdate = HigiKioskUserService.compareUser(scope.nameEntry.onServer,HigiKioskStorageService.returnSessionData);
                    //TODO log event for editing name or joing challenge
                    //"/higiApi/challenges/ch2owqu/participants"
                    //JkioskService.logEvent($rootScope.currentKeyboardState + '_genderSaveBtn', 'button', 'pressed');
                    if ((HigiKioskStorageService.returnSessionData('logged_in') == true) && (scope.nameEntry.userUpdate != null)) {

                        JkioskService.registerKiosk();
                        HigiApiService.UpdateUserAsync(scope.nameEntry.onServer.id, scope.nameEntry.userUpdate,
                            function () {
                                scope.nameEntry.onServer.firstName = HigiKioskStorageService.returnSessionData('firstName');
                                scope.nameEntry.onServer.lastName = HigiKioskStorageService.returnSessionData('lastName');
                                //scope.nameEntry.submitting = false;
                                console.log('updated users name');
                                //var joinUrl = scope.nameEntry.challengeResponse.userRelation.joinUrl || scope.nameEntry.challengeResponse.participantsUrl;
                                //getting URL anonymously so won't have userRelation
                                //var joinUrl = scope.nameEntry.challengeResponse.participantsUrl;
                                var joinUrl =  HigiKioskStorageService.returnSessionData('challengeObject').joinUrl;
                                $rootScope.earnditEnabled = true;
                                var success = function(result){
                                    mode = new Object();
                                    mode.modalAuthDialogTitle = "auth.challenge.success";
                                    mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                                    mode.modalAuthDialogContent = "auth.challenge.joined.challenge";
                                    mode.modalAuthDialogIconClass = "auth_dialog_success";
                                    mode.loggedin = true;
                                    mode.timer = 5000;
                                    HigiKioskStorageService.saveSessionData("userInChallenge", true);
//                                    $rootScope.userInChallenge = true;
                                    $rootScope.authDisplay(mode);
                                };
                                var error = function(error){
                                    mode = new Object();
                                    mode.modalAuthDialogTitle = "auth.challenge.failed";
                                    mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                                    mode.modalAuthDialogContent = "auth.challenge.joined.challenge.failed";
                                    mode.modalAuthDialogIconClass = "auth_dialog_failure";
                                    mode.loggedin = true;
                                    mode.timer = 5000;
                                    HigiKioskStorageService.saveSessionData("userInChallenge", false);
                                    $rootScope.authDisplay(mode);
                                };
                                var data = {
                                    userId : HigiKioskStorageService.returnSessionData('user').id,
                                    joinUrl : joinUrl,
                                    joinCode : HigiKioskStorageService.returnSessionData('challengeModalAd').joinId
                                };
                                HigiApiService.JoinEarnditChallenge(data, success, error);
                            },
                            function () {
                                scope.nameEntry.submitting = false;
                               console.log('user update failed')
                        });


1
                    } else {
                        console.log('no change found')
                    }


                };
                scope.nameEntry.viewTerms = function(){
                    $rootScope.keyboardHide();
                    scope.nameEntry.termsScroller.refresh();
                    console.log(scope.nameEntry.termsScroller)
                };



                var success = function(response) {
                    scope.nameEntry.challengeResponse = response.response;
                    scope.nameEntry.disclaimerText = $sce.getTrustedHtml(scope.nameEntry.challengeResponse.terms);
                    scope.nameEntry.termsScroller = new iScroll("join_challenge_terms_wrapper", {hScroll:false, scrollbarClass:'iscroll_scrollbar' });
                    $rootScope.challengeScroller = scope.nameEntry.termsScroller;
                    $timeout(function(){
                        scope.nameEntry.termsScroller.refresh();
                    }, 2000, false);
                };
                var error = function(){
                    console.log('could not load challenge terms');
                };
                //var challengeObject = {"challengeId" : $rootScope.challengeModalAd.challenge.challengeId}
                //if($rootScope.challengeModalAd.challenge.joinId != undefined){
                //    challengeObject.joinId = $rootScope.challengeModalAd.challenge.joinId;
                //}

                //HigiApiService.GetEarnditChallengeAnonymous(challengeObject, success, error);

                scope.nameEntry.termsScroller = new iScroll("join_challenge_terms_wrapper", {hScroll:false, scrollbarClass:'iscroll_scrollbar' });
                $rootScope.challengeScroller = scope.nameEntry.termsScroller;
                $timeout(function(){
                    scope.nameEntry.termsScroller.refresh();
                }, 2000, false);
                scope.nameEntry.termsPath = HigiKioskStorageService.returnSessionData('challengeAdTerms').path;
                $rootScope.targetFieldSet = $rootScope.fields.nameEntry;
                $rootScope.focusField($rootScope.fields.nameEntry[0]);

            }
        }
    }]);



