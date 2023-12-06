higiKioskControllers.controller('HigiKioskBpController2' , ['$scope', '$routeParams' , '$rootScope', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskStorageService', 'HigiKioskUserService', 'JkioskService', function($scope, $routeParams, $rootScope, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskStorageService, HigiKioskUserService, JkioskService){
    $scope.pressureDone = $q.defer();

    $scope.bpPressureChange = function(response) {
        $scope.bpAnimate.drawGauge(response.pressure);
        $scope.pressure = response.pressure ;
        $scope.$apply();
    };

    $scope.bpResult = function(response) {
        if($scope.noBpAdExists){
            if($scope.noAdAudio != null){
                $scope.noAdAudioContinue = false;
                console.log($scope.noAdAudio);
                console.log("audio done");

            }

            $rootScope.resetSessionTimeout();
        }
        $rootScope.bpTestRunning = false;
        $scope.diastolic = response.diastolic;
        $scope.systolic = response.systolic;
        $scope.pulse = response.pulse;
        $scope.saveBpData();
        $scope.bpTestDone = true;
        $scope.pressureDone.resolve();
    };

    //Checks if BP ad is available
    $scope.findBpAd = function(){
        $scope.findAdPromise = $q.defer();
        var adDataObject = HigiKioskUserService.getAdDataObjectForSlide("slide_bloodpressure02");
        JkioskService.getAdConcurrent($scope.bpAdFoundCall, $scope.bpAd.adPlacement, adDataObject);
        return $scope.findAdPromise;
    };

    //Callback for getAd. Sets path or sets noAd and prevents scaling animation of guage
    $scope.bpAdFoundCall = function (result) {
        if(result.adSessionToken != undefined) {
            HigiKioskStorageService.saveSessionData('adToken', result.adSessionToken);
        }
        if (result.hasAd === "true") {
            $scope.bpAdObject = result;
            if (typeof(result.questionnaireTemplate) == "object"){
                $scope.bpAd.title = result.questionnaireTemplate.Heading ;
                $scope.bpAd.subTitle = result.questionnaireTemplate.Subheading ;
                $scope.bpAd.disclosure = result.questionnaireTemplate.Disclaimer ;
                $scope.bpAd.endpoint = result.questionnaireTemplate.Url;
                $scope.bpAd.questions = result.questionnaireTemplate.Questions;
                $scope.bpAd.continue = result.questionnaireTemplate.Button3Text;
                $scope.bpAd.placementId = result.placementId;
                console.log("PlacementId = " + $scope.bpAd.placementId);
                console.log(result.questionnaireTemplate);

            }
        }
        else {
            $scope.noBpAdExists = true;
        }
        $scope.findAdPromise.resolve();
    };

    $scope.scaleUpGauge = function(){
        if(!$scope.gaugeScaledUp){
            console.log('scaling up bp gauge')
            $scope.gaugeScaledUp = true;
            return $scope.bpAnimate.scaleUp();
        } else {
            console.log('done scaling up gauge')
            var promise = $q.defer();
            $timeout(function(){
                promise.resolve();
            }, 3000);
            return promise;
        }

    };

    //Plays BP video ad and signals completion
    $scope.playBpAd = function(){
        $scope.bpAdFound = $q.defer();
        $scope.bpAdDone = $q.defer();
        if($scope.noBpAdExists){
            $scope.bpPlayNoAdAudio();
            $scope.bpAdDone.resolve();
        }else {
            $scope.bpAdFound.resolve($scope.bpAdObject || null);
            $scope.bpAdFound.promise
                .then(function(result){
                    if(result){
                        $rootScope.adIsPlaying = true;
                        $scope.bpAd.adPlayNotification = result.playNotificationEvent;
                        $scope.bpAd.adType = result.mimeType.split("/")[0];
                        if($scope.bpAd.adType == "video"){
                            $scope.bpAd.createAdVideo();
                            $scope.bpAd.adVisibleVideo = true;
                            $scope.bpAd.adVisibleImage =false;
                            $scope.bpAd.isInteractive = (typeof(result.questionnaireTemplate) == "object" && $scope.systolicArray.length < 1);
                            $scope.bpAd.adTargetElement = document.getElementById($scope.bpAd.videoTarget);
                            $scope.bpAd.adVisible = true;
                            $scope.bpAd.adPath = result.path;
                            var bpAd = HigiKioskAnimationService.playAdPromise( $scope.bpAd.adPath, $scope.bpAd.adTargetElement, $scope);
                            $scope.bpAd.adVideoTimer();
                            $scope.bpAd.adVideoError(bpAd);
                        }
                        else if($scope.bpAd.adType == "image"){
                            $scope.bpAd.isInteractive = (typeof(result.questionnaireTemplate) == "object" && $scope.systolicArray.length < 1);
                            $scope.bpAd.showTimer = false;
                            $scope.bpAd.adVisibleVideo = false;
                            $scope.bpAd.adVisibleImage = true;
                            $scope.bpAd.adVisible = true;
                            $scope.bpAd.adImageSrc = result.path;
                            var bpAd = $q.defer();
                            $timeout(function(){
                                bpAd.resolve();
                            },7000);
                            $scope.bpAd.checkImageAvailable(result.path);
                        }
                    }else {
                        var bpAd = $q.defer();
                        bpAd.reject();
                    }
                    return bpAd.promise;
                })
                .then(function(){
                    //Remove non-error video timeout
                    $timeout.cancel($scope.bpAd.adPlaybackTimeoutTimer);
                    //Remove playback error listner.
                    try{
                        $scope.video.removeEventListener('error', $scope.bpAd.adVideoErrorListener);
                    }catch(e) { //Images won't have errors error listeners
                    }

                    //Set global adIsPlaying to prevent timeout on ads that do not have media (audio or video) playing
                    $rootScope.adIsPlaying = false;
                    JkioskService.logEvent("slide_bloodpressure02_adEnded_" + $scope.langClass , 'ad', 'ended');
                    if ($scope.bpAd.adPlayNotification) {
                        var request = {
                            playNotificationEvent: ($scope.bpAd.adPlayNotification) ? $scope.bpAd.adPlayNotification : new Object()
                        };
                        JkioskService.sessionAdPlayed(request);
                    }
                    if($scope.bpAd.isInteractive){
                        JkioskService.logAdEvent("app|" + $scope.bpAd.placementId,  $scope.bpAd.interactiveAdEventCategory, 'Displayed');
                        console.log("Displayed - placement id = " + $scope.bpAd.placementId);
                        $scope.bpAd.acceptLabel = $scope.bpAdObject.questionnaireTemplate.Button1Text;
                        $scope.bpAd.skipLabel = $scope.bpAdObject.questionnaireTemplate.Button2Text;

                        $scope.bpAd.activeClass = "";
                        $scope.bpAd.interactiveButtonsVisible =  true;
                        $scope.bpAd.replayVideoButtonVisible = ($scope.bpAd.adType == "video");
                        $scope.bpAd.showTimer = false;

                    }else {
                        //$scope.hideAd();
                        $scope.scaleUpGauge();
                        $scope.bpAd.adTransitionClass = 'adFadeOut';
                        $scope.bpAd.adVisible = false;

                        $scope.bpAdDone.resolve();
                    }

                }, function(){$scope.bpAdDone.resolve();});
        }
        return $scope.bpAdDone;
    };

    $scope.bpPlayNoAdAudio = function(){

        var timer = HigiKioskStorageService.getSettingsValue('bp.noad.audio.timer') || 6000;

        $scope.bpNoAudioInstructions = new Object();
        var delay = function(){
            var q = $q.defer();
            $timeout(function(){q.resolve();}, timer);
            return q;
        };

        $scope.bpNoAudioInstructions.clipOne = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipTwo = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[2].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipThree = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[3].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipFour = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[4].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipFive = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[5].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipSix = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[6].filename], $scope);
            },
            delay
        ];
        $scope.bpNoAudioInstructions.clipSeven = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[7].filename], $scope);
            },
            delay
        ];

        $scope.noAdAudioContinue = true;
        $scope.noAdAudioCurrentPromise = null;
        $scope.noAdAudio = HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipOne, $scope.noAdAudioContinue);
        $scope.noAdAudio
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipTwo, $scope.noAdAudioContinue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipThree, $scope.noAdAudioContinue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipFour, $scope.noAdAudioContinue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipFive, $scope.noAdAudioContinue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipSix, $scope.noAdAudioContinue);})
            .then(function(){return HigiKioskPromiseService.promisePackage($scope.bpNoAudioInstructions.clipSeven, $scope.noAdAudioContinue);})



    };

    $scope.bpError = function(response) {
        console.log('bp-error-fire')
        console.log(response);
        //Remove non-error video timeout
        $timeout.cancel($scope.bpAd.adPlaybackTimeoutTimer);
        //Remove playback error listner.
        try{
            $scope.video.removeEventListener('error', $scope.bpAd.adVideoErrorListener);
        }catch(e) { //Images won't have errors error listeners
        }
        //Set ad playing and audio playing flags to false.
        $rootScope.adIsPlaying = false;
        $scope.audioPlaying = false;
        $scope.fadeOutCancel = "adFadeOut";
        $timeout(function(){
            HigiKioskAnimationService.videoStop($scope);
            $rootScope.resetSessionTimeout();
        }, 1000);

        if($scope.noAdAudio != null){
            console.log($scope.noAdAudio)
            $scope.noAdAudioContinue = false;
            $scope.noAdAudio = null;
        }

        $rootScope.bpTestRunning = false;

        if(response.stopReason == "UserError" ){
            $timeout($scope.redoBpAuto, 2000);
        } else {
           $timeout(function(){
               $scope.testCanceled = true;
               $scope.redoVisible = true;
               $scope.fadeOutCancel = "adFadeOut";
               $scope.continue = false;
               $scope.redoVisible = true;
               $scope.bpClassOverride = "";
               $rootScope.isVisibleExit = true;
               $scope.slideTitle = 'bloodpressure1.title';
               $scope.slideSubTitle = 'global.universal.error.subtitle';
               $scope.bpCancelText = 'bloodpressure02.warning';
               if (response.stopReason == "Fatal") {
                   var bpErrorEvent = ['bloodpressure02_bpcuff', 'error', 'fatal error'];
               } else  if (response.stopReason == "UserStop") {
                   HigiKioskStorageService.saveSessionData('bpStoppedManually', true);
                   var bpErrorEvent = ['bloodpressure02_bpcuff', 'error', 'user stop'];
               }
               else {
                   var bpErrorEvent = ['bloodpressure02_bpcuff', 'error', 'error'];
               }
               JkioskService.logEvent(bpErrorEvent[0] , bpErrorEvent[1] , bpErrorEvent[2] );
           },1000);
        }
    };

    if($rootScope.testingMode){
        $rootScope.bpError = $scope.bpError;
    }

    $scope.setBpStatus = function(){
        $scope.bpIsAvailable = $q.defer();
        JkioskService.getBPStatus(function (status) {
            if (status.isAvailable) {
                $scope.bpIsAvailable.resolve();
            } else {
                JkioskService.logWarn("slide_bloodpressure02", "bp cuff unavailable", "BP cuff status is unavailable");
                JkioskService.logEvent('bloodpressure02_bpcuff', 'error', 'unavailable');
                $scope.bpError();
                $scope.bpIsAvailable.reject();
            }
        });
        return  $scope.bpIsAvailable.promise;
    };

    $scope.startBp = function(){
        if($scope.noBpAdExists){
            $rootScope.stopSessionTimeout();
        }
        $rootScope.bpTestRunning = true;
        JkioskService.startBp($scope.bpPressureChange, $scope.bpResult, $scope.bpError);
        return $scope.pressureDone;
    };



    $scope.init = function() {
        $scope.guageScaledUp = true;
        $scope.redoSlideText = 'global.redo';
        $scope.redoSlide = '#/bloodpressure1/back';
        $scope.bpAd.showTimer = true;
        $scope.bpAd.isInteractive = false;
        $scope.bpAd.interactiveButtonsVisible = false;
        $scope.bpAd.replayVideoButtonVisible = false;
        $scope.bpAd.replayVideo = "replay.ad.video";

        $scope.bpAd.adVideoInfo = {currentTime : 0, duration: 0, remaining : "00:00"};
        $scope.bpAd.adVideoSrc = "";
        $scope.bpAd.adImageSrc = "";
        $scope.bpAd.adTransitionClass = 'adFadeIn';
        $scope.bpAd.adVisible = false;
        $scope.zugBPStopAck = false;


        //$scope.adVisible = false;
        //$scope.adTransitionClass = 'adFadeIn';
        $scope.slideTitle = 'bloodpressure1.title';
        $scope.slideSubTitle = 'global.in.progress';
        $scope.bpClassOverride = "instruction-override";
        $scope.bpTestAgain = "bloodpressure3.checkagain";
        $scope.emergencyBtnText = "bloodpressure02.emergencyBtnText"
        $scope.audioFiles = [
            {filename: 'bloodpressure02_cancel_warning'},
            {filename: 'bloodpressure02_audio01'},
            {filename: 'bloodpressure02_audio02'},
            {filename: 'bloodpressure02_audio03'},
            {filename: 'bloodpressure02_audio04'},
            {filename: 'bloodpressure02_audio05'},
            {filename: 'bloodpressure02_audio06'},
            {filename: 'bloodpressure02_audio07'},
            {filename: 'bloodpressure02_audio09'}
        ];
        $scope.pressure = 0;
        $scope.bpCancelText = 'bloodpressure02.test.cancelled';
        $scope.bpWarning = 'bloodpressure02.warning';

        //Overriding subtitle interface to display bp instructions
        if($rootScope.zugBPavaliable){
            $scope.slideSubTitle = "";    
        } else {            
            $scope.slideSubTitle = $scope.bpWarning;
        }

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskBpController2', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskBpController2', $scope);
        $scope.setSlideDirection($routeParams.direction);
        $scope.isvisible = false;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;

        $scope.instructionOne = [
            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
            },
            $scope.bpAnimate.init,
            $scope.findBpAd
        ];
        $scope.instructionTwo = [

            $scope.bpAnimate.rotateGauge
        ];

        $scope.instructionThreeNoAd = [
            function(){
                var q = $q.defer();
                q.resolve();
                return q;
            }
        ];

        $scope.instructionThree = [
            $scope.bpAnimate.scaleDown
        ];



        $scope.instructionFour = [

            $scope.playBpAd,
            $scope.startBp

        ];

        $scope.instructionFive = [
            $scope.scaleUpGauge,

            function(){
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[8].filename], $scope);
            },
            function(){
                var q = $q.defer();
                q.resolve();
                return q;
            }

        ];
        $scope.saveBpData = function(){
            HigiKioskStorageService.saveSessionData('systolic', $scope.systolic);
            HigiKioskStorageService.saveSessionData('diastolic', $scope.diastolic);
            HigiKioskStorageService.saveSessionData('pulse', $scope.pulse);

            $scope.systolicArray.push($scope.systolic);
            $scope.diastolicArray.push($scope.diastolic);
            $scope.pulseArray.push($scope.pulse);
            $scope.bpArray.push({systolic : $scope.systolic, diastolic : $scope.diastolic, pulse : $scope.pulse});

            //bpHistory
            HigiKioskStorageService.saveSessionData('systolicHistory', $scope.systolicArray);
            HigiKioskStorageService.saveSessionData('diastolicHistory', $scope.diastolicArray);
        };
        $scope.continue = true;
        $scope.q =  $scope.setBpStatus();

        $scope.q
            .then(function () {

                return HigiKioskPromiseService.promisePackage($scope.instructionOne, $scope.continue);
            })
            .then(function () {
                return HigiKioskPromiseService.promisePackage($scope.instructionTwo, $scope.continue);
            })
            .then(function () {
                if($scope.noBpAdExists){
                    return HigiKioskPromiseService.promisePackage($scope.instructionThreeNoAd, $scope.continue);
                }else {
                    return HigiKioskPromiseService.promisePackage($scope.instructionThree, $scope.continue);
                }

            })
            .then(function () {
                return HigiKioskPromiseService.promisePackage($scope.instructionFour, $scope.continue);
            })
            .then(function (result) {
                if(!result){
                    return HigiKioskPromiseService.promisePackage($scope.instructionFive, $scope.continue);
                }
            })
            .then(function () {
                window.location = "#/bloodpressure3/forward";
            }, function(){
                console.log('rejecting bpPromise');
            });




        if (links.previous == null) {
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = true;
        }
        
        if($rootScope.zugBPavaliable){       
            setTimeout(function(){
                $scope.emergencyBtnShow = true;
            }, 5 * 1000 );
        }
        
    };

    $scope.bpGaugeReady = $q.defer();
    $scope.bpAd = new Object();
    $scope.bpAd.videoTarget = "bloodpressure_ad_video";
    $scope.bpAd.adPlacement = 'kv1_bp';
    $scope.bpAd.interactiveAdEventCategory = "questionnaire";
    $scope.bpAd.showInteractiveForm = false;
    $scope.bpAd.loadInteractiveForm = function(){
        //If user session hits timeout warning while interactive ad is visible,
        //Restore keyboard in the event that the user returns
        //Interactive ad directive will set flag to false on send or continue

        $rootScope.restoreKeyboard = true;
        JkioskService.logAdEvent("app|" + $scope.bpAd.placementId,  $scope.bpAd.interactiveAdEventCategory, 'Accepted');
        console.log("Accepted - placement id = " + $scope.bpAd.placementId);
        $scope.bpAd.showInteractiveForm = true;
        if($scope.bpAd.adType == "video") {
            $scope.video.pause();
        }
        $rootScope.targetFieldSet =  $rootScope.fields.interactiveAdForm;
        $rootScope.higiTopNavHidden = true;
        $scope.bpAd.adVisible = false;
        $scope.bpAd.adTransitionClass = '';

    };
    
    $scope.bpAd.createAdVideo = function(){
        //Create a video element
        $scope.bpAd.videoPlayer = document.createElement('video');
        $scope.bpAd.videoPlayer.id = $scope.bpAd.videoTarget;
        document.getElementById("bpad-video-wrapper").appendChild($scope.bpAd.videoPlayer);


    };

    $scope.bpAd.adVideoTimer = function(){
        $scope.video.addEventListener('timeupdate', function() {
            $scope.$apply(function() {
                var time =  parseInt($scope.video.duration || 0) - parseInt($scope.video.currentTime || 0);
                var minutes = Math.floor(time / 60);
                time -= minutes * 60;

                var seconds = parseInt(time % 60, 10);

                $scope.bpAd.adVideoInfo.remaining = ((minutes < 10) ? "0" + minutes : minutes) + ":" + ((seconds < 10) ? "0" + seconds : seconds);
            });
        });
    };

    $scope.bpAd.adVideoError = function(promise){
        $scope.bpAd.adVideoErrorListener =  function() {
            JkioskService.logWarn("kv_bp1", "Ad Failed To Play",  $scope.bpAd.adPath);
            promise.resolve();
            $scope.video.removeEventListener('error', $scope.bpAd.adVideoErrorListener);
            //Remove video stuck timeout
            $timeout.cancel($scope.bpAd.adPlaybackTimeoutTimer);
        };
        $scope.video.addEventListener('error', $scope.bpAd.adVideoErrorListener);

        //If ad video has paused or not otherwise moving forward, fire hide ad.
        $scope.bpAd.adPlaybackTimeoutTimer = $timeout( function(){
            JkioskService.logWarn("kv1_bp", "Ad playback timeout fired",  $scope.bpAd.adPath);
            console.log('video ad timeout fired - bp');
            promise.resolve();
        }, HigiKioskStorageService.getSettingsValue('kiosk.ads.bp.ad.failsafe') || 70000);

    };
    $scope.bpAd.checkImageAvailable = function(path){
        var img = new Image();
        img.addEventListener('error', function(e){
            JkioskService.logWarn("kv_bp1", "Ad Failed To Play",  $scope.bpAd.adPath);
            $scope.bpAd.adVisibleImage = false;
            $scope.$apply();
        });
        img.src = path;
    };

    $scope.bpAd.replayAdVideo = function(){
        $scope.bpAd.adTransitionClass = 'adFadeOut';
        $scope.bpAd.replayVideoButtonVisible = false;
        $timeout(function(){
            $scope.bpAd.adTransitionClass = 'adFadeIn';
        },1000);
        $timeout(function(){
            $scope.bpAd.showTimer = true;
            var q = HigiKioskAnimationService.playAdPromise($scope.bpAdObject.path, $scope.bpAd.adTargetElement, $scope);
            q.promise
                .then(function(){
                    $scope.bpAd.replayVideoButtonVisible = true;
                    $scope.bpAd.showTimer = false;
                });
        },999);
    };

    $scope.bpAd.hideAd = function(){
        $scope.continue = false;
        $scope.bpAdDone.resolve();
        $scope.bpAd.adTransitionClass = 'adFadeOut';
        $scope.bpAd.adVisible = false;
        $scope.bpAd.interactiveButtonsVisible =  true;
        $scope.bpAd.replayVideoButtonVisible = true;
        window.location = "#/bloodpressure3/forward";

    };

    $scope.bpAd.declineAd = function(){
        JkioskService.logAdEvent("app|" + $scope.bpAd.placementId,  $scope.bpAd.interactiveAdEventCategory, 'Declined');
        console.log("Declined - placement id = " + $scope.bpAd.placementId);
        $scope.bpAd.hideAd();
    };

    $scope.redoBp = function(){
        $scope.redoVisible = false;
        JkioskService.logEvent('redoBp_Button', 'button', 'pressed');
        $scope.redoSlide = '#/bloodpressure1/back';
        $scope.pageClass = 'slide back';
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.redoBpAuto = function(){
        $scope.redoVisible = false;
        JkioskService.logEvent('redoBp_userError_autoRedo', 'event', 'fired');
        $scope.redoSlide = '#/bloodpressure1/back/false/error';
        $scope.pageClass = 'slide back';
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.skipBP = function(){
        if($rootScope.mode == "bpw"){
            var mode = "bpw";
            var currenttest = "Blood Pressure";
            var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
            $scope.nextSlide = nextTestPath;
            $timeout(function(){
                window.location =  $scope.nextSlide;
            },500);
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;
            $timeout(function(){
                window.location =  $scope.nextSlide;
            },500);         
        } else{
            window.location = "#/finish/forward";
        }
    }

    $scope.bpGaugeReady.promise
        .then(function(msg){
            //console.log('Msg = ' + msg);
            $scope.init();

        });

    $scope.stopBPresponse = function(response){
        console.log("insde stopresponse() response",response);
        $scope.zugBPStopAck = true;
        //{method: "bpMeasurementError", isFatal: false}
        if(response.isFatal == false){
            $scope.bpError({stopReason : "UserStop"});
        }      
    }
    $scope.stopBP = function(){
        $scope.emergencyBtnShow = false;
        JkioskService.zugBPstop($scope.stopBPresponse);
        setTimeout(function(){
            if($scope.zugBPStopAck == false){
                $scope.skipBP();
            }
        },5*1000)
    }
}]);