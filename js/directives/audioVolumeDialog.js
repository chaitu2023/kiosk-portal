//Global audio volume controller

angular
    .module("higiKioskUi")
    .directive("audioVolumeDialog", [ '$rootScope', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService', '$timeout', '$route', function($rootScope, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService, $timeout, $route) {
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/audio-volume-dialog.html',
            link : function (scope, element, attr) {
                var sliderTimeout;
                scope.volume = scope.volume || new Object();
                scope.volume.isLoggedInClass = HigiKioskStorageService.returnSessionData('logged_in') ? "logged-in" : "";

                scope.volume.sliderTimeout = {};
                scope.volume.dialogPointSize = {points : 30, width: 500};
                scope.volume.loggedInWatch =  function(newVal, oldVal) {
                    scope.volume.isLoggedInClass = HigiKioskStorageService.returnSessionData('logged_in') ? "logged-in" : "";
                };
                HigiKioskStorageService.watchSessionData('logged_in',  scope.volume.loggedInWatch)

                scope.volume.hideAudioSlider = function(){
                    scope.isVisibleAudioSlider = false;
                };

                scope.volume.volumeMaskClicked = function(){
                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_slideContent_volumeMask', 'button', 'pressed');
                    scope.volume.hideAudioSlider();
                };

                scope.volume.setVolume = function(newVolume) {
                    // update the volume
                    scope.globalAudioVolume = newVolume / scope.volume.dialogPointSize.width;
                    if(scope.audio != undefined) {
                        scope.audio.volume = scope.globalAudioVolume;
                    }
                    if(scope.video != undefined){
                        scope.video.volume = scope.globalAudioVolume;
                    }
                    $timeout.cancel(sliderTimeout);
                    sliderTimeout = $timeout(scope.volume.hideAudioSlider,0);
                    //HigiKioskUtilitiesService.safeApply(scope);
                };
                scope.volume.setVolumeLights = function(newVolume) {
                    var threshold = Math.ceil(scope.volume.dialogPointSize.width / scope.volume.dialogPointSize.points);
                    for (var i = 0; i < scope.volume.dialogPointSize.points; i++) {
                        if (newVolume >= (i * threshold)) {
                            scope.volume.dialogPoints[i].onClass = 'audio_slider_tick_on';
                        }
                        else {
                            scope.volume.dialogPoints[i].onClass = '';
                        }
                    }
                    HigiKioskUtilitiesService.safeApply(scope);
                };

                scope.volume.getDialogPoints= function(){
                    var points = [];
                    for(var i=0 ; i < scope.volume.dialogPointSize.points ; i++){
                        points.push({id : 'audio_slider_tick_' + i  , class : 'audio_slider_tick' , onClass : ''});
                    }
                    return points;
                };

                scope.volume.dialogPoints = scope.volume.getDialogPoints();

                scope.volume.setDefaultVolume = function() {
                    $rootScope.isAudioMuted = false;
                    scope.volume.isMutedClass = '';


                    // set volume based on global value to default slider position
                    var defaultVolumePct = HigiKioskStorageService.getSettingsValue('global.default.audio.volume');
                    var initialVolume = scope.volume.dialogPointSize.width * defaultVolumePct;
                    scope.volume.setVolume(initialVolume);
                    scope.volume.setVolumeLights(initialVolume);

                };
                scope.volume.tickDown = function(){
                    var newVolume = parseInt($('#audio_slider').val());
                    newVolume = (newVolume >= (scope.volume.dialogPointSize.width/scope.volume.dialogPointSize.points)) ? newVolume - (scope.volume.dialogPointSize.width/scope.volume.dialogPointSize.points) : 0;
                    $('#audio_slider').val(newVolume);
                    scope.volume.setVolume(newVolume);
                    scope.volume.setVolumeLights(newVolume);

                };

                scope.volume.tickUp = function(){
                    var newVolume = parseInt($('#audio_slider').val());
                    newVolume = (newVolume <= scope.volume.dialogPointSize.width) ? newVolume + (scope.volume.dialogPointSize.width/scope.volume.dialogPointSize.points): scope.volume.dialogPointSize.width;
                    $('#audio_slider').val(newVolume);
                    scope.volume.setVolume(newVolume);
                    scope.volume.setVolumeLights(newVolume);
                };

                scope.volume.muteToggle = function(operation){
                    JkioskService.logEvent('audioDialog_muteButton', 'button', 'pressed');
                    if(operation == 'mute'){
                        JkioskService.logEvent('audioDialog_muteButton', 'audio', 'muted');
                        $('.audio_mute_btn_left').css({"background" : "url(./images/audio-volume-dialog/speaker-icon-26.png) no-repeat", "background-size": "35px 40px", "background-position": "10px 5px"});
                        $('.audio_mute_btn_right').css({"background" : "url(./images/audio-volume-dialog/Icons-09.png) no-repeat", "background-size": "30px 30px", "background-position": "10px 10px"});
                        scope.isAudioMuted = true;
                        scope.audio.volume = 0;
                        if(scope.video != undefined){
                            scope.video.volume = 0;
                        }
                    } else {
                        JkioskService.logEvent('audioDialog_muteButton', 'audio', 'unmuted');
                        $('.audio_mute_btn_left').css({"background": "url(./images/audio-volume-dialog/Icons-26.png) no-repeat", "background-size": "35px 40px", "background-position": "10px 5px"});
                        $('.audio_mute_btn_right').css({"background" : "url(./images/audio-volume-dialog/speaker-icon-09.png) no-repeat", "background-size": "30px 30px", "background-position": "10px 10px"});
                        scope.isAudioMuted = false;
                        scope.audio.volume = scope.globalAudioVolume;
                        if(scope.video != undefined){
                            scope.video.volume = scope.globalAudioVolume;
                        }
                    }
                    
                    /*JkioskService.logEvent('audioDialog_muteButton', 'button', 'pressed');
                    if (scope.isAudioMuted) {
                    	JkioskService.logEvent('audioDialog_muteButton', 'audio', 'unmuted');
                        scope.isAudioMuted = false;
                        scope.volume.isMutedClass = '';
                        scope.audio.volume = scope.globalAudioVolume;
                        if(scope.video != undefined){
                            scope.video.volume = scope.globalAudioVolume;
                        }
                    }
                    else {
                        JkioskService.logEvent('audioDialog_muteButton', 'audio', 'muted');
                        console.log('muting volume');
                        scope.isAudioMuted = true;
                        scope.volume.isMutedClass = 'audio_mute_btn_pressed';
                        scope.audio.volume = 0;
                        if(scope.video != undefined){
                            scope.video.volume = 0;
                        }
                    }*/
                };

                scope.volume.init = function(){
//
                    $('#audio_slider').noUiSlider({
                        start : [scope.volume.dialogPointSize.width * Number($rootScope.getGlobalVolume())],
                        range: {
                            'min': [  0 ],
                            'max': [ scope.volume.dialogPointSize.width ]
                        }

                    });
                    $('#audio_slider').on(
                        {
                            set : function () {
                                JkioskService.logEvent('audioDialog_volumeSlider', 'audio', 'volume changed');
                                var value =  $('#audio_slider').val();

                                scope.volume.setVolume(value);
                            },
                            slide : function(){
                                var value =   $('#audio_slider').val();
                                scope.volume.setVolumeLights(value);
                            }
                        }
                    );

                    scope.volume.setDefaultVolume();
                };

                scope.volume.init();

            }
        }
}]);



