//Global audio
angular
    .module("higiKioskUi")
    .directive("finalResultsAd", ['$q', 'HigiKioskUserService', 'JkioskService', 'HigiApiService', 'HigiKioskStorageService', '$sce' , '$rootScope', 'HigiKioskAnimationService', '$timeout', '$routeParams', function($q, HigiKioskUserService, JkioskService, HigiApiService, HigiKioskStorageService,  $sce, $rootScope, HigiKioskAnimationService, $timeout, $routeParams) {
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/finalresults/finalresults-ad.html',
            link : function(scope, element, attr){
                scope.finalResultsAd = new Object();
                scope.finalResultsAd.replayVideo = "replay.ad.video";
                scope.finalResultsAd.replayVideoButtonVisible = false;
                scope.finalResultsAd.showTimer = false;
                scope.finalResultsAd.interactiveButtonsVisible = false;
                scope.finalResultsAd.adVideoInfo = {currentTime : 0, duration: 0, remaining : "00:00"};
                scope.finalResultsAd.adVideoSrc = "";
                scope.finalResultsAd.adImageSrc = "";
                scope.finalResultsAd.adTransitionClass = 'adFadeIn';
                scope.finalResultsAd.adVisible = true;
                scope.finalResultsAd.calcHigiScore = "finalresults.calc.higiscore";
                scope.finalResultsAd.adPlacement = "kv1_final";
                scope.finalResultsAd.interactiveAdEventCategory = "questionnaire";
                scope.finalResultsAd.defaultAdImageUnauth = (scope.langClass == 'es_us') ? 'images/finalresults_ad_defaultad_unauthenticated20150207-es.png' : 'images/finalresults_ad_defaultad_unauthenticated20150207-en.png';
                scope.finalResultsAd.defaultAdImageAuth = (scope.langClass == 'es_us') ? 'images/finalresults_ad_defaultad_authenticated20150207-es.png' : 'images/finalresults_ad_defaultad_authenticated20150207-en.png';
                scope.finalResultsAd.newAd1 = "global.newAd1";
                scope.finalResultsAd.newAd2Part1 = "global.newAd2Part1";
                scope.finalResultsAd.newAd2Part2 = "global.newAd2Part2";
                scope.finalResultsAd.newAd2Part3 = "global.newAd2Part3";

                scope.finalResultsAd.adFailSafe = function(){
                    scope.finalResultsAd.adFailSafeTimer = $timeout(function(){
                        scope.finalResultsAd.hideAd();
                        JkioskService.logWarn("kv_final", "Ad image error fired", scope.finalResultsAd.adImageSrc);
                        console.log('image ad failsafe fired');
                    }, HigiKioskStorageService.getSettingsValue('kiosk.ads.interactive.failsafe') || 30000);
                };

                scope.finalResultsAd.adPlaybackError = function(){
                    scope.finalResultsAd.enableSkipButton = true;
                    scope.finalResultsAd.hideAd();
                    JkioskService.logWarn("kv_final", "Ad Failed To Play", scope.finalResultsAd.videoAdPath);
                    console.log('video ad error fired');
                    scope.video.removeEventListener('error');

                };

                scope.finalResultsAd.checkImageAvailable = function(){
                    var img = new Image();
                    img.addEventListener('error', function(e){
                        JkioskService.logWarn("kv_final", "Ad Failed To Play", scope.finalResultsAd.adImageSrc);
                        scope.finalResultsAd.adVisibleImage = false;
                        scope.finalresults_New_adtext1 = false;
                        scope.finalresults_New_adtext2 = false;
                        scope.$apply();
                    });
                    img.src = scope.finalResultsAd.adImageSrc;
                };

                //If ad video has paused or not otherwise moving forward, fire hide ad.
                scope.finalResultsAd.adPlaybackTimeout = function(){


                    scope.finalResultsAd.adPlaybackTimeoutTimer = $timeout( function(){
                        JkioskService.logWarn("kv_final", "Ad playback timeout fired", scope.finalResultsAd.videoAdPath);
                        console.log('video ad timeout fired');
                        scope.finalResultsAd.hideAd();
                    }, HigiKioskStorageService.getSettingsValue('kiosk.ads.interactive.failsafe') || 30000);
                };

                //Log adEvent played
                scope.finalResultsAd.logFinalAdPlayNotification = function(){
                    if (scope.finalResultsAd.finalAdPlayNotification) {
                        var request = {
                            playNotificationEvent: scope.finalResultsAd.finalAdPlayNotification
                        };
                        JkioskService.sessionAdPlayed(request);
                    }
                };

                scope.finalResultsAd.createAdVideo = function(){
                    //Create a video element
                    scope.finalResultsAd.videoPlayer = document.createElement('video');
                    scope.finalResultsAd.videoPlayer.id = "finalresults_ad_video";
                    document.getElementById("finalresultsad-video-wrapper").appendChild(scope.finalResultsAd.videoPlayer);


                };


                scope.finalResultsAd.adFound = function(result) {
                    if(result.adSessionToken != undefined){
                        HigiKioskStorageService.saveSessionData('adToken', result.adSessionToken);
                    }
                    scope.finalResultsAd.isInteractive = (typeof(result.questionnaireTemplate) == "object");
                    //todo set values in appsettings for fallback based on interactive type
                    var q = scope.saveCheckin(); // depends on adToken
                    if (result.hasAd === "true" && result.mimeType != undefined && (result.mimeType.indexOf("image/") || result.mimeType.indexOf("video/"))) {
                        scope.finalResultsAd.finalAdPlayNotification = result.playNotificationEvent;

                        console.log('Final results ad found ' + result.path);
                        scope.finalResultsAd.activeClass = "";

                        // determine if video or image based on mime type
                        var mimeElements = result.mimeType.split("/");
                        scope.finalResultsAd.adType = mimeElements[0];
                        if ( scope.finalResultsAd.adType == "image") {
                            $rootScope.adIsPlaying = true;
                            if(scope.finalResultsAd.isInteractive){
                                scope.finalResultsAd.placementId = result.placementId;
                                scope.finalResultsAdObject = result;
                                scope.finalResultsAd.setInteractiveFormValues();
                                scope.finalResultsAd.adVisibleVideo = false;
                                scope.finalResultsAd.adVisibleImage = true;
                                scope.finalresults_New_adtext1 = true;
                                scope.finalresults_New_adtext2 = true;
                                scope.finalResultsAd.adImageSrc = result.path;
                                scope.finalResultsAd.checkImageAvailable();
                                // hide the ad after 7 seconds
                                $timeout(function(){
                                    $timeout.cancel(scope.finalResultsAd.adFailSafeTimer);
                                    scope.finalResultsAd.adFailSafeTimer = null;
                                    scope.finalResultsAd.interactiveButtonsVisible = true;
                                    scope.finalResultsAd.enableSkipButton = true;
                                    scope.finalResultsAd.showTimer = false;
                                    scope.finalResultsAd.activeClass = "active";
                                    scope.finalResultsAd.logFinalAdPlayNotification();
                                    JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Displayed');
                                    console.log("Displayed - placement id = " + scope.finalResultsAd.placementId);
                                    scope.finalResultsAd.timeout = $timeout(function(){
                                        JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Timeout');
                                        console.log("Timeout - placement id = " + scope.finalResultsAd.placementId);
                                        scope.finalResultsAd.hideAd();
                                    }, HigiKioskStorageService.getSettingsValue('kiosk.ads.interactive.autoskip') || 8000);
                                }, 7000);


                            } else {
                                scope.finalResultsAd.adVisibleVideo = false;
                                scope.finalResultsAd.adVisibleImage = true;
                                scope.finalresults_New_adtext1 = true;
                                scope.finalresults_New_adtext2 = true;
                                scope.finalResultsAd.adImageSrc = result.path;
                                scope.finalResultsAd.checkImageAvailable();
                                // hide the ad after 7 seconds
                                $timeout(function(){
                                    scope.finalResultsAd.logFinalAdPlayNotification();
                                    scope.finalResultsAd.enableSkipButton = true;
                                    scope.finalResultsAd.hideAd();
                                }, 7000);
                            }
                            scope.finalResultsAd.adFailSafe();

                        }

                        else if ( scope.finalResultsAd.adType == "video"){
                            $rootScope.adIsPlaying = true;
                            scope.finalResultsAd.createAdVideo();
                            if(scope.finalResultsAd.isInteractive){
                                scope.finalResultsAd.placementId = result.questionnaireTemplate.placementId;
                                scope.finalResultsAdObject = result;
                                scope.finalResultsAd.setInteractiveFormValues();

                                scope.finalResultsAd.showTimer = true;
                                scope.finalResultsAd.adVisibleVideo = true;
                                scope.finalResultsAd.videoAdClass = 'adFadeIn';
                                scope.finalResultsAd.adVisibleImage = false;
                                scope.finalresults_New_adtext1 = false;
                                scope.finalresults_New_adtext2 = false;
                                scope.finalResultsAd.enableSkipButton = false;
                                scope.finalResultsAd.videoAdPath = result.path;

                                scope.finalResultsAd.replayAdVideo = function(){
                                    //Cancel interactive ad button form timeout
                                    $timeout.cancel(scope.finalResultsAd.timeout);

                                    //Cancel ad video failsafe timeout
                                    $timeout.cancel(scope.finalResultsAd.adPlaybackTimeoutTimer);

                                    //Cancel ad video failsafe timeout
                                    scope.finalResultsAd.adPlaybackTimeout();

                                    scope.finalResultsAd.replayVideoButtonVisible = false;
                                    scope.finalResultsAd.videoAdClass = 'adFadeOut';
                                    $timeout(function(){
                                        scope.finalResultsAd.videoAdClass = 'adFadeIn';
                                    }, 1000);
                                    $timeout(function(){

                                        scope.finalResultsAd.showTimer = true;
                                        var ad = HigiKioskAnimationService.playAdPromise(scope.finalResultsAd.videoAdPath, scope.finalResultsAd.player, scope);
                                        ad.promise
                                            .then(function(){
                                                scope.finalResultsAd.replayVideoButtonVisible = true;
                                                scope.finalResultsAd.showTimer = false;

                                                //Restart timeout to hide interactive buttons
                                                scope.finalResultsAd.timeout = $timeout(function(){
                                                    JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Timeout');
                                                    console.log("Timeout - placement id = " + scope.finalResultsAd.placementId);
                                                    scope.finalResultsAd.hideAd();
                                                }, HigiKioskStorageService.getSettingsValue('kiosk.ads.interactive.autoskip') || 8000);
                                            });
                                    }, 999);

                                };
                                $timeout(function () {

                                    scope.finalResultsAd.player = document.getElementById("finalresults_ad_video");



                                    var ad = HigiKioskAnimationService.playAdPromise(scope.finalResultsAd.videoAdPath, scope.finalResultsAd.player, scope);
                                    ad.promise
                                        .then(function(){
                                            scope.finalResultsAd.interactiveButtonsVisible = true;
                                            scope.finalResultsAd.replayVideoButtonVisible = true;
                                            scope.finalResultsAd.enableSkipButton = true;
                                            scope.finalResultsAd.showTimer = false;
                                            scope.finalResultsAd.activeClass = "active";
                                            scope.finalResultsAd.logFinalAdPlayNotification();
                                            JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Displayed');
                                            console.log("Displayed - placement id = " + scope.finalResultsAd.placementId);
                                            scope.finalResultsAd.timeout = $timeout(function(){
                                                JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Timeout');
                                                console.log("Timeout - placement id = " + scope.finalResultsAd.placementId);
                                                scope.finalResultsAd.hideAd();
                                            }, HigiKioskStorageService.getSettingsValue('kiosk.ads.interactive.autoskip') || 8000);
                                        });


                                    scope.finalResultsAd.adTransitionClass = '';
                                    scope.video.removeEventListener('timeupdate');
                                    scope.video.addEventListener('error',  scope.finalResultsAd.adPlaybackError);
                                    scope.video.addEventListener('timeupdate', function() {
                                        scope.$apply(function() {
                                            var time =  parseInt(scope.finalResultsAd.player.duration || 0) - parseInt(scope.finalResultsAd.player.currentTime || 0);
                                            var minutes = Math.floor(time / 60);
                                            time -= minutes * 60;

                                            var seconds = parseInt(time % 60, 10);

                                            scope.finalResultsAd.adVideoInfo.remaining = ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
                                        });
                                    });
                                    //If error with video not registered by HTML attribute, timeout and hide ad anyway
                                    scope.finalResultsAd.adPlaybackTimeout();

                                },1000);

                            } else {
                                scope.finalResultsAd.adVisibleVideo = true;
                                scope.finalResultsAd.videoAdClass = 'adFadeIn';
                                scope.finalResultsAd.adVisibleImage = false;
                                scope.finalresults_New_adtext1 = false;
                                scope.finalresults_New_adtext2 = false;
                                scope.finalResultsAd.showTimer = true;
                                $timeout(function () {
                                    scope.finalResultsAd.player = document.getElementById("finalresults_ad_video");
                                    var ad = HigiKioskAnimationService.playAdPromise(result.path, scope.finalResultsAd.player, scope);
                                    ad.promise
                                        .then(function(){
                                            scope.finalResultsAd.logFinalAdPlayNotification();
                                            scope.finalResultsAd.enableSkipButton = true;
                                            scope.finalResultsAd.hideAd();
                                        });
                                    //If error with video not registered by HTML attribute, timeout and hide ad anyway
                                    scope.finalResultsAd.adPlaybackTimeout();

                                    scope.finalResultsAd.adTransitionClass = '';
                                    scope.video.addEventListener('error',  scope.finalResultsAd.adPlaybackError);
                                    scope.video.removeEventListener('timeupdate');
                                    scope.video.addEventListener('timeupdate', function() {
                                        scope.$apply(function() {
                                            var time =  parseInt(scope.finalResultsAd.player.duration || 0) - parseInt(scope.finalResultsAd.player.currentTime || 0);
                                            var minutes = Math.floor(time / 60);
                                            time -= minutes * 60;

                                            var seconds = parseInt(time % 60, 10);

                                            scope.finalResultsAd.adVideoInfo.remaining = ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
                                        });
                                    });
                                    //If error with video not registered by HTML attribute, timeout and hide ad anyway
                                    scope.finalResultsAd.adPlaybackTimeout();
                                },1000);
                            }

                        }

                    } else {
                        scope.finalResultsAd.isInteractive = false;
                        scope.finalResultsAd.loadFinalResultsAdDefault('#finalresults01_adbox_rounded_corners');
                        scope.finalResultsAd.adFailSafe();
                    }
                };

                scope.finalResultsAd.setInteractiveFormValues = function(){
                    scope.finalResultsAd.acceptLabel =  scope.finalResultsAdObject.questionnaireTemplate.Button1Text;
                    scope.finalResultsAd.skipLabel =  scope.finalResultsAdObject.questionnaireTemplate.Button2Text;
                    scope.finalResultsAd.endpoint =  scope.finalResultsAdObject.questionnaireTemplate.Url;
                    scope.finalResultsAd.title =  scope.finalResultsAdObject.questionnaireTemplate.Heading ;
                    scope.finalResultsAd.subTitle = scope.finalResultsAdObject.questionnaireTemplate.Subheading ;
                    scope.finalResultsAd.disclosure =  scope.finalResultsAdObject.questionnaireTemplate.Disclaimer ;
                    scope.finalResultsAd.questions =  scope.finalResultsAdObject.questionnaireTemplate.Questions;
                    scope.finalResultsAd.continue =  scope.finalResultsAdObject.questionnaireTemplate.Button3Text;

                };
//
                scope.finalResultsAd.loadInteractiveForm = function(){
                    //Restore keyboard if session timeout fires and interactive form still visible
                    $rootScope.restoreKeyboard = true;

                    //Cancel video failsafe
                    $timeout.cancel(scope.finalResultsAd.adPlaybackTimeoutTimer);

                    //Cancel image ad failsafe
                    $timeout.cancel(scope.finalResultsAd.adFailSafeTimer);

                    //Cancel button timeout
                    $timeout.cancel(scope.finalResultsAd.timeout);

                    //Ad is over, if user stands allow timeout to start
                    $rootScope.adIsPlaying = false;

                    JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Accepted');
                    console.log("Accepted - placement id = " + scope.finalResultsAd.placementId);
                    scope.finalResultsAd.showInteractiveForm = true;
                    $rootScope.targetFieldSet =  $rootScope.fields.interactiveAdForm;
                    if( scope.finalResultsAd.adType == "video"){
                        scope.finalResultsAd.player.pause();
                    }


                };
                scope.finalResultsAd.loadFinalResultsAdDefault = function() {

                    scope.finalResultsAd.adVisibleVideo = false;
                    scope.finalResultsAd.adVisibleImage = true;
                    scope.finalresults_New_adtext1 = true;
                    scope.finalresults_New_adtext2 = true;
                    if (HigiKioskStorageService.returnSessionData('logged_in') == true) {
                        //Ads Off, authenticated ad
                        scope.finalResultsAd.adImageSrc = scope.finalResultsAd.defaultAdImageAuth;
                    } else {
                        //Ads Off, unauthenticated ad
                        scope.finalResultsAd.adImageSrc =scope.finalResultsAd.defaultAdImageUnauth;
                    }

                    // hide the final results ad after 15 seconds
                    $timeout(function(){

                        scope.finalResultsAd.enableSkipButton = true;
                        scope.finalResultsAd.hideAd();
                        scope.$apply();
                    }, 7000);
                };

                scope.finalResultsAd.loadFinalResultsAd = function() {
                    //Picking and choose the ad or loading screen

                    scope.finalResultsAd.finalResultAdPromise = $q.defer();
                    $rootScope.higiTopNavHidden = true;
                    $rootScope.slideInNav = "slideOut";

                    if (HigiKioskStorageService.getSettingsValue('kiosk.ads.finalresult.enabled') && $routeParams.noad != "noad") {
                        var adDataObject = HigiKioskUserService.getAdDataObjectForSlide("slide_finalresults01");
                        //saveCheckin waits until after getting an ad, otherwise we won't have ad token in session state
                        //JkioskService.getAdConcurrent(scope.finalResultsAd.adFound, scope.finalResultsAd.adPlacement, adDataObject);
                        scope.finalResultsAd.loadFinalResultsAdDefault('#finalresults01_adbox_rounded_corners');
                    }
                    else {
                        //ads are disabled
                        scope.finalResultsAd.loadFinalResultsAdDefault();
                        //saveCheckin();
                    }
                    return scope.finalResultsAd.finalResultAdPromise;
                };



                scope.finalResultsAd.hideAd = function(){


                    //Cancel video failsafe
                    $timeout.cancel(scope.finalResultsAd.adPlaybackTimeoutTimer);

                    //Cancel image ad failsafe
                    $timeout.cancel(scope.finalResultsAd.adFailSafeTimer);

                    //Cancel button timeout
                    $timeout.cancel(scope.finalResultsAd.timeout);


                    $rootScope.adIsPlaying = false;

                    //Reset session timeout to prevent countdown appearing between
                    //Ad hide and results message start
                    $rootScope.resetSessionTimeout();
                    
                    // if ($rootScope.eSanjeevaniFlow && $rootScope.eSanTestResultMsg != '' && $rootScope.missingTestRequest.length == 0)
                    //     $("#eSanTestRequestSuccess").show();

                    // if ($rootScope.eSanjeevaniFlow && $rootScope.eSanTestResultMsg != '' && $rootScope.missingTestRequest.length != 0)
                    //     $("#eSanTestRequestSuccessFailed").show();

                    // if ($rootScope.eSanjeevaniFlow && $rootScope.eSanTestResultFailedMsg != '')
                    //     $("#eSanTestRequestFailed").show();

                    HigiKioskAnimationService.videoStop(scope);
                    scope.finalResultsAd.adVisible = false;
                    scope.finalResultsAd.adTransitionClass = 'adFadeOut';
                    scope.finalResultsAd.videoAdClass = 'adFadeOut';
                    $timeout.cancel(scope.finalResultsAd.adPlaybackTimeoutTimer);
                    $timeout.cancel(scope.finalResultsAd.adFailSafeTimer);
                    $timeout(function(){
                        $rootScope.higiTopNavHidden = false;
                        $rootScope.slideInNav = "slideIn";
                        scope.finalResultsAd.finalResultAdPromise.resolve();
                    }, 1000);

                };
                scope.finalResultsAd.declinedAd = function(){
                    $timeout.cancel(scope.finalResultsAd.timeout);
                    JkioskService.logAdEvent("app|" + scope.finalResultsAd.placementId,  scope.finalResultsAd.interactiveAdEventCategory, 'Declined');
                    console.log("Declined - placement id = " + scope.finalResultsAd.placementId);
                    scope.finalResultsAd.hideAd();
                };
                //
                scope.finalResultsAd.displayFinalResultsAd = function(){
                    scope.finalResultsAd.adVisible = true;
                    scope.finalResultsAd.adTransitionClass = 'adFadeIn';
                };

                scope[attr.promisename].resolve();

            }
        }
    }]);



