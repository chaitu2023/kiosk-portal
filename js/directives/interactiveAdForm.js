higiKioskControllers.directive('interactiveAdForm', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/interactive-ad.html',
        link :function(scope, elem, attrs){
            scope.interactiveAdForm = new Object();
            scope.interactiveAdForm = new Object();
            scope.interactiveAdForm.init = function(){

                $rootScope.targetFieldSet = $rootScope.fields.interactiveAdFormFields;
                $rootScope.keyboardShow();
                $rootScope.setFieldIndexEnd();
                scope.interactiveAdForm.title =  scope[attrs.adobject].title;
                scope.interactiveAdForm.subTitle =  scope[attrs.adobject].subTitle;
                scope.interactiveAdForm.endpoint = scope[attrs.adobject].endpoint;
                scope.interactiveAdForm.sendDisclaimer = scope[attrs.adobject].disclosure;
                scope.interactiveAdForm.questions = scope[attrs.adobject].questions;
                scope.interactiveAdForm.continue = scope[attrs.adobject].continue;

                scope.interactiveAdForm.enterEmailLabel = 'emailresults.enter.email';
                scope.interactiveAdForm.sendLabel = 'global.send';
                scope.interactiveAdForm.sendEmailError = 'global.server.failure';
                scope.interactiveAdForm.emailAddress = '';
                scope.interactiveAdForm.nextBtnActive = '';
                scope.interactiveAdForm.registerButtonClass = '';
                scope.interactiveAdForm.termsAccepted = '';

                scope.interactiveAdForm.toggleTermsAcceptance = function(){
                    scope.interactiveAdForm.termsAccepted = !scope.interactiveAdForm.termsAccepted;

                    if(scope.interactiveAdForm.termsAccepted){
                        scope.interactiveAdForm.registerButtonClass = 'active_btn';
                    } else {
                        scope.interactiveAdForm.registerButtonClass = '';
                    }
                    scope.interactiveAdForm.emailPatternCheck(scope.interactiveAdForm.fields[0]);
                };

               scope.interactiveAdForm.bobble = function(){

                    if(scope.interactiveAdForm.bobbleState == false){
                        $("#cbox-glow").transition({ scale : 1.4, duration : 1000});
                        scope.interactiveAdForm.bobbleState = true;
                    }
                    else {
                        scope.interactiveAdForm.bobbleState = false;
                        $("#cbox-glow").transition({ scale : 1.3 , duration : 1000 });
                    }

                    $timeout(scope.interactiveAdForm.bobble, 1500);

                };

                $timeout(scope.interactiveAdForm.bobble, 1500);


            };
            scope.interactiveAdForm.emailPatternCheck = function(emailAddress){
                if(HigiKioskUtilitiesService.isValidEmailAddress(emailAddress) &&  scope.interactiveAdForm.termsAccepted){
                    $rootScope.hideEmailExtensionTop();
                    scope.interactiveAdForm.nextBtnActive = 'active_btn';
                    $rootScope.keyboardEnterButtonFunction = scope.interactiveAdForm.sendInteractiveAdFeedback;
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                } else{
                    scope.interactiveAdForm.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }

            };

            scope.interactiveAdForm.sendSuccess = function(){

                mode = new Object();
                mode.modalAuthDialogTitle = "auth.success.interactive";
                mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                mode.modalAuthDialogContent = "interactive.ad.submitted";
                mode.modalAuthDialogIconClass = "auth_dialog_success";
                mode.loggedin = false;
                mode.timer = 5000;
                mode.callback = function(){
                    scope[attrs.adobject].hideAd();

                }
                $rootScope.authDisplay(mode);
                JkioskService.logInfo("", "Email Results", "");
                HigiKioskUtilitiesService.safeApply(scope);

            };

            scope.interactiveAdForm.skipToResults = function(){
                //hack to ensure keyboard returns if session timeout warns
                //must reset restoreKeyboard to false to session timeout behaves normally
                $rootScope.restoreKeyboard = false;
                scope[attrs.adobject].hideAd();
                $rootScope.keyboardHide();
            };

            scope.interactiveAdForm.sendError = function(){

                scope.interactiveAdForm.sendingErrorVisible = true;
                $timeout(function(){
                    scope.interactiveAdForm.sendingErrorVisible = false;
                }, 5000);
            };

            scope.interactiveAdForm.sendInteractiveAdFeedback = function(){
                    //hack to ensure keyboard returns if session timeout warns
                    //must reset restoreKeyboard to false to session timeout behaves normally
                    $rootScope.restoreKeyboard = false;

                    JkioskService.logAdEvent( 'app|' + scope[attrs.adobject].placementId,   scope[attrs.adobject].interactiveAdEventCategory, 'Submitted');
                    console.log("Submitted - placement id = " + scope[attrs.adobject].placementId);
                    scope.interactiveAdForm.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass  = '';
                    JkioskService.registerKiosk();
                    var emailAddress =  scope.interactiveAdForm.fields[0].text;
                    var label = scope.interactiveAdForm.questions[0].Label;
                    var answers = {"Label" : label, "Answer" : emailAddress};
                    var object = JSON.stringify(HigiApiService.CreateInteractiveAdObject(answers, HigiKioskStorageService.returnSessionData));
                    var request = {
                        url: scope.interactiveAdForm.endpoint,
                        verb: "POST",
                        customHeaders: {
                            "ApiToken":HigiApiKey
                        },
                        body: object
                    };

                    JkioskService.queueHttp(request);
                    scope.interactiveAdForm.sendSuccess();

                };
            scope.interactiveAdForm.fields = [
                {
                    id : "emailres" ,
                    defaultText :  scope.interfaceLabels[scope.interactiveAdForm.enterEmailLabel] ,
                    text : (HigiKioskStorageService.returnSessionData('logged_in')) ? HigiKioskStorageService.returnSessionData('email') : scope.interfaceLabels[scope.interactiveAdForm.emailAddress] ,
                    type :'text' ,
                    visible : true ,
                    selectedClass : '',
                    callback : function(){scope.interactiveAdForm.emailPatternCheck(this)},
                    focus : function(){$rootScope.focusField(this)},
                    usesPlaceholder : true
                }
            ];
            $rootScope.fields.interactiveAdFormFields = scope.interactiveAdForm.fields;

            scope.interactiveAdForm.loggedInWatch = function(newVal){
                if(newVal){
                    document.getElementById(scope.interactiveAdForm.fields[0].id).value =  scope.interactiveAdForm.fields[0].text;
                }
            };

            HigiKioskStorageService.watchSessionData('logged_in', scope.interactiveAdForm.loggedInWatch)
            scope.interactiveAdForm.init();
        }

    };
}]);