higiKioskControllers.directive("systemVolume", ['$rootScope', '$timeout', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', function($rootScope, $timeout, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService) {
        return {
            restrict : 'E',
            templateUrl: 'components/modal/system-volume.html',
            scope : false,
            link : function(scope, element, attr){
                scope.systemVolume = scope.systemVolume || new Object();
                //jkiosk.getVolume(callback)
                scope.systemVolume.minimumVolume = HigiKioskStorageService.getSettingsValue('system.minimum.volume');
                scope.systemVolume.title = "System volume set to ";
                scope.systemVolume.getVolume = function(){
                    JkioskService.getVolume(function(resp){
                        $rootScope.systemVolumeLevel = resp.volume;
                        scope.systemVolume.setVolumeLights(($rootScope.systemVolumeLevel/1) * 500);

                        }
                    );
                };
                scope.systemVolume.hideSystemVolume = function(){
                    $rootScope.systemVolumeVisible = false;
                };
                scope.systemVolume.showSystemVolume = function(){
                    scope.systemVolume.startTimer();
                    $rootScope.systemVolumeVisible = true;
                };

                scope.systemVolume.setVolume = function(volume){
                    $timeout.cancel(scope.systemVolume.chimeTimeout);

                    //Restart the hiding timer
                    scope.systemVolume.startTimer();
                    volume = Number((volume/scope.systemVolume.dialogPointSize.width).toFixed(1));
                    if(volume !=  $rootScope.systemVolumeLevel){
                        volume = (scope.systemVolume.minimumVolume <= volume ) ? volume : scope.systemVolume.minimumVolume;
                        JkioskService.setVolume(volume);
                    }
                    scope.systemVolume.chimeTimeout = $timeout(function(){
                        scope.systemVolume.getVolume();
                        scope.systemVolume.chime();
                        scope.systemVolume.formattedVolume = (100 * volume) + "%";
                    }, 100);

                };
                //kiosk.setVolume and pass in a float between 0 and 1 where 0.1 is 10%.



                scope.systemVolume.startSystemAudioPress = function(){
                    scope.systemVolume.pressTimer = $timeout(scope.systemVolume.showSystemVolume, 5000);
                };
                scope.systemVolume.endSystemAudioPress = function(){
                    if($rootScope.systemVolumeVisible != true){
                        $timeout.cancel(scope.systemVolume.pressTimer);
                    }
                };


                scope.systemVolume.sliderTimeout = {};
                scope.systemVolume.dialogPointSize = {points : 30, width: 500};

                scope.systemVolume.hideAudioSlider = function(){
                    $rootScope.isVisibleAudioSlider = false;
                };

                scope.systemVolume.volumeMaskClicked = function(){
                    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_slideContent_volumeMask', 'button', 'pressed');
                    scope.systemVolume.hideAudioSlider();
                };

                scope.systemVolume.setVolumeLights = function(newVolume) {


                    var threshold = Math.ceil(scope.systemVolume.dialogPointSize.width / scope.systemVolume.dialogPointSize.points);
                    for (var i = 0; i < scope.systemVolume.dialogPointSize.points; i++) {
                        if (newVolume >= (i * threshold)) {
                            scope.systemVolume.dialogPoints[i].onClass = 'audio_slider_tick_on';
                        }
                        else {
                            scope.systemVolume.dialogPoints[i].onClass = '';
                        }
                    }
                    HigiKioskUtilitiesService.safeApply(scope);
                };

                scope.systemVolume.getDialogPoints= function(){
                    var points = [];
                    for(var i=0 ; i < scope.systemVolume.dialogPointSize.points ; i++){
                        points.push({id : 'audio_slider_tick_' + i  , class : 'audio_slider_tick' , onClass : ''});
                    }
                    return points;
                };

                scope.systemVolume.dialogPoints = scope.systemVolume.getDialogPoints();

                scope.systemVolume.setDefaultVolume = function(resp) {
                    var initialVolume = resp.volume;

                    scope.systemVolume.setVolumeLights(500 * (initialVolume/1));

                };

                scope.systemVolume.tickDown = function(){
                    var newVolume = parseInt($('#audio_slider').val());
                    newVolume = (newVolume >= (scope.systemVolume.dialogPointSize.width/scope.systemVolume.dialogPointSize.points)) ? newVolume - (scope.systemVolume.dialogPointSize.width/scope.systemVolume.dialogPointSize.points) : 0;
                    $('#audio_slider').val(newVolume);
                    scope.systemVolume.setVolume(newVolume);
                    scope.systemVolume.setVolumeLights(newVolume);

                };

                scope.systemVolume.tickUp = function(){
                    var newVolume = parseInt($('#audio_slider').val());
                    newVolume = (newVolume <= scope.systemVolume.dialogPointSize.width) ? newVolume + (scope.systemVolume.dialogPointSize.width/scope.systemVolume.dialogPointSize.points): scope.systemVolume.dialogPointSize.width;
                    $('#audio_slider').val(newVolume);
                    scope.systemVolume.setVolume(newVolume);
                    scope.systemVolume.setVolumeLights(newVolume);
                };

                scope.systemVolume.chime = function(){
                    JkioskService.logEvent('audioDialog_muteButton', 'button', 'pressed');
                    $rootScope.interfaceSounds.play("higiScoreSnd");

                };

                scope.systemVolume.init = function(resp){
                    $rootScope.systemVolumeLevel = resp.volume;
                    scope.systemVolume.setVolumeLights(resp.volume);
                    scope.systemVolume.setVolumeLights(($rootScope.systemVolumeLevel/1) * 500);
                    scope.systemVolume.formattedVolume = (100 * resp.volume) + "%";
                    $('#system_audio_slider').noUiSlider({
                        start : [scope.systemVolume.dialogPointSize.width * Number($rootScope.systemVolumeLevel)],
                        range: {
                            'min': [  0 ],
                            'max': [ scope.systemVolume.dialogPointSize.width ]
                        }

                    });
                    $('#system_audio_slider').on(
                        {
                            set : function () {
                                JkioskService.logEvent('audioDialog_volumeSlider', 'audio', 'volume changed');
                                var value =  $('#system_audio_slider').val();
                                scope.systemVolume.setVolume(value);
                                //$rootScope.interfaceSounds.higiScoreSnd.volume = $rootScope.getGlobalVolume();
                                $rootScope.interfaceSounds.play("higiScoreSnd");
                            },
                            slide : function(){
                                var value =   $('#system_audio_slider').val();
                                scope.systemVolume.setVolumeLights(value);
                            }
                        }
                    );

                };

                scope.systemVolume.startTimer = function(){
                    if( scope.systemVolume.hideTimer != undefined){
                        $timeout.cancel(scope.systemVolume.hideTimer)
                    }
                    //if timer exists, cancel it
                    scope.systemVolume.hideTimer = $timeout(scope.systemVolume.hideSystemVolume, 20000);
                    //create new timer

                };

                JkioskService.getVolume(scope.systemVolume.init);


            }
        }
    }]);