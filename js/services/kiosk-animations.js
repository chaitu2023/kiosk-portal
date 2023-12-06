var higiServices = angular.module("higiKioskUi");

higiServices.factory('HigiKioskAnimationService', ['$http' , '$rootScope', '$q', '$timeout', 'HigiKioskUtilitiesService', function($http, $rootScope, $q, $timeout, HigiKioskUtilitiesService) {
    var audio = new Audio();
    var audioPlaying = false;
    var audioPaused = false;
    return {
        playAudioPromise :function(src, scope){
            //Audio player. Returns promise that resovles on the audio end.
            //console.log("scope: " + scope);    
            aprom = $q.defer();
            //$rootScope.audio = null;
            audio = audio || new Audio();
            audio.pause();
            audio.src = src;
            audio.id = "audioclip" + $rootScope.audioCount;

            audioResolver = function(){

                if(!$rootScope.isUserSeated)
                {
                    $rootScope.resetSessionTimeout();
                } else {
                    //console.log('not restarting, user sitting');
                }
                audio.removeEventListener('ended' ,  audioResolver);
                audioPlaying = false;
                audioPaused = false;
                //console.log('finished audio player ' + src);                 
                aprom.resolve('ended');
            };


            //document.getElementById("higi_language_dialog").setAttribute("style", "width:288px;height:224px; z-index: 0;position: absolute;top: 70px;left: 126px;");

            audioPlayClip = function() {
                //console.log('start audio player ' + src);
                $rootScope.stopSessionTimeout();
                audio.removeEventListener('canplaythrough' , audioPlayClip);
                audio.volume =  scope.getGlobalVolume();
                //console.log(audio.volume);
                audioPlaying = true;
                $timeout(function(){
                    audio.play();
                }, 100);

            };
            audio.load();
            audio.addEventListener('ended', audioResolver);
            audio.addEventListener('canplaythrough', audioPlayClip);
            return aprom;
             
        },
        playAdPromise :function (src, destination, scope){
            var q = $q.defer();
            scope.video = null;
            scope.video = destination;
            scope.autoplay = true;
            
            //Force chrome to ignore cache for video
            scope.video.src = src + "?x=" + HigiKioskUtilitiesService.generateSessionId();
            scope.adResolver = function() {
                //console.log("video play finished fired " + src);
                scope.videoPlaying = false;
                scope.video.removeEventListener('ended' ,  scope.adResolver);
                scope.video.currentTime = 1;
                if(!$rootScope.isUserSeated)
                {
                    $rootScope.resetSessionTimeout();
                } else {
                    //console.log('not restarting, user sitting');
                }
                q .resolve('ended');
            };
            scope.adPlayClip = function(){
                scope.video.currentTime = 1;
                scope.videoPlaying = true;
                scope.stopSessionTimeout();
                scope.video.volume = $rootScope.getGlobalVolume();
                scope.video.removeEventListener('canplaythrough' ,  scope.adPlayClip );
                //console.log("video play started fired " + src)
                scope.video.play();
            };
            scope.video.load();
            scope.video.addEventListener('ended',scope.adResolver);
            scope.video.addEventListener('canplaythrough', scope.adPlayClip);

            //Profiler events for debugging
            //$rootScope.video.addEventListener('abort' , function(){console.log('abort video fired')});
            //$rootScope.video.addEventListener('canplay' , function(){console.log('canplay video fired')});
            //$rootScope.video.addEventListener('durationchange' , function(){console.log('durationchange video fired')});
            //$rootScope.video.addEventListener('emptied' , function(){console.log('emptied video fired')});
            //$rootScope.video.addEventListener('error' , function(){console.log('error video fired')});
            //$rootScope.video.addEventListener('loadeddata' , function(){console.log('loadeddata video fired')});
            //$rootScope.video.addEventListener('loadedmetadata' , function(){console.log('loadedmetadata video fired')});
            //$rootScope.video.addEventListener('loadstart' , function(){console.log('loadstart video fired')});
            //$rootScope.video.addEventListener('pause' , function(){console.log('pause video fired')});
            //$rootScope.video.addEventListener('play' , function(){console.log('play video fired')});
            //$rootScope.video.addEventListener('playing' , function(){console.log('playing video fired')});
            //$rootScope.video.addEventListener('progress' , function(){console.log('progress video fired')});
            //$rootScope.video.addEventListener('ratechange' , function(){console.log('ratechange video fired')});
            //$rootScope.video.addEventListener('seeked' , function(){console.log('seeked video fired')});
            //$rootScope.video.addEventListener('seeking' , function(){console.log('seeking video fired')});
            //$rootScope.video.addEventListener('stalled' , function(){console.log('stalled video fired')});
            //$rootScope.video.addEventListener('suspend' , function(){console.log('absuspendort video fired')});
            //$rootScope.video.addEventListener('timeupdate' , function(){console.log('timeupdate video fired')});
            //$rootScope.video.addEventListener('volumechange	' , function(){console.log('volumechange video fired')});
            //$rootScope.video.addEventListener('waiting' , function(){console.log('waiting video fired')});
            //

            return q;
        },
        audioStop : function() {
            if(audioPlaying){
                audioPaused = true;
            }
            try{
                audio.pause();
                audioPlaying = false;
            }catch(e){

            }

        },
        audioResume : function(){
            if(audioPaused){
                audio.play()
                audioPaused = false;
                audioPlaying = true;
            }
        },
        videoStop : function(scope) {
            if(scope.videoPlaying){
                scope.video.pause();
                scope.videoPlaying = false;
            }
        },
        onboardingAnimations : {
            height : {
                handhint : function(){
                    var q = $q.defer();
                    $('#height_hint').fadeIn(500);
                    $('#height_hint_hand').stop().delay(500).animate({top:'-=40'}, 300).delay(300).animate({top:'+=80'}, 500, 'swing').delay(700).animate({top:'-=40'}, 500, 'swing').delay(300).animate({left:'+=220'}, 500, 'swing').delay(500).animate({top:'-=40'}, 300).delay(300).animate({top:'+=80'}, 500, 'swing').delay(700).animate({top:'-=40'}, 500, 'swing', function () {
                        $('#height_hint').fadeOut(500);
                        q.resolve();
                    });
                    return q;
                }
            }
        },
        countUp : function(target, start, end, precision, duration, opts, angVar) {
           opts = opts
                || {
               useEasing : true, // toggle easing
               useGrouping : true, // 1,000,000 vs 1000000
               separator : ',', // character to use as a separator
               decimal : '.', // character to use as a decimal
               angVar : angVar
           };
            $rootScope.interfaceSounds.play("higiScoreSnd");
           var numAnim = new countUp(target, start, end, precision, duration, opts);
           return numAnim;
        },
        
        writeGuage : function(id, size, stroke, higiScore, text, fill, playSound, scope) {
            //Takes element id, size attrs and the score
            //if score is > 1000 or undefined assumes full circle and drops mask

                // remove instances incase this is a reload
                //Clear out existing element
                var archtype = Raphael(document.getElementById(id), size, size);
                archtype.customAttributes.arc = function(centerX, centerY, value, total, radius){
                    var
                        angle = value / total * 359.99,
                        absAngle = Math.abs(angle),
                        a = Math.PI / 180 * (90 - angle),
                        x = centerX + radius * Math.cos(a),
                        y = centerY - radius * Math.sin(a),
                        sweep = +(value >= 0),
                        path;

                    path = [
                        ['M', centerX, centerY - radius],
                        ['A', radius, radius, 0, +(absAngle > 180), sweep, x, y]
                    ];

                    return { 'path': path };
                };
                //var profileImg = "url(" +$('#' + id).data('profile-img') + ")" || 'none';
                arc_one = archtype.path().attr({
                    "stroke": "#76c045",
                    "stroke-width": stroke,
                    "stroke-linecap": "round"
                });

                arc_two = archtype.path().attr({
                    "stroke": "#eae8e8",
                    "stroke-width": stroke,
                    "fill" : (typeof(fill) == "undefined" || fill == "") ? "none" : fill
                });
                if(typeof(text) != "undefined" && text != ""){
                    archtype.text(size/2, size/4, text).attr({'fill' : '#76c044' , "font-size": 15 });
                }
                //If score not defined, assume fill disc and skip mask.
                bodyPosition = (typeof(higiScore) != 'undefined') ? higiScore : 1000;
                var value = Math.round((bodyPosition/999) * 100);
				
                var init_arc = 0;
                var arc_animate = function(){
                    init_arc++;


                    new_arc = arc_one.animate({
                        arc: [size/2, size/2, init_arc, 100, (size - stroke) /2]
                    });


                    if(init_arc < value){
                        setTimeout(arc_animate, 10);

                    }else {
                        //applyTransform();

                        $("body").trigger('scoreRendered');
                    }
                }

                if(bodyPosition != 1000){
                    setTimeout(function(){
                        arc_animate();
                        if(playSound == true){
                            xpBarLevelUpSnd.volume = $rootScope.getGlobalVolume();
                            xpBarLevelUpSnd.play();
                        }
                    }, 100);
                }else{
                    new_arc = arc_one.animate({
                        arc: [size/2, size/2, value, 100, (size - stroke) /2]
                    });

                }

                background_arc = arc_two.toBack().animate({
                    arc: [size/2, size/2, 100, 100, (size - stroke) /2]
                });

                if(bodyPosition < 999){
                    arc_three = archtype.path().attr({
                        "stroke": "#eae8e8",
                        "stroke-width": stroke
                    });
                    mask_arc = arc_three.animate({
                        arc: [(size/2), (size/2), -5, 100, (size - stroke) /2]
                    });

                }
                var applyTransform = function(){
                    arc_one.transform("t" + size + "," + size + "r-180");
                    mask_arc.transform("t" + size + "," + size + "r-180");
                }
            }

        }

}]);

higiServices.factory('HigiKioskPromiseService', ['$http' , '$rootScope', '$q', function($http, $rootScope, $q) {
    return {
        promisePackage :function(calls, running){
            //Calls takes an array of calls that return deferments
            //running is a scope flag to see whether the deferment should be rejected.
            var q = $q.defer();
            var promises = [];
            if(running) {
                calls.forEach(function (call) {
                    var ap = call();
                    promises.push(ap.promise)
                });
                var all = $q.all(promises);
                all.then(function(){
                    q.resolve();
                })
            }
            else {
                q.reject();
            }

            return q.promise;
        },
        defermentPackage :function(calls, running){
            //Calls takes an array of calls that return deferments
            //running is a scope flag to see whether the deferment should be rejected.
            //Returns deferment to be rejected if need be
            var q = $q.defer();
            var promises = [];
            //console.log(running);
            if(running) {
                calls.forEach(function (call) {
                    var ap = call();
                    promises.push(ap.promise)
                });
                var all = $q.all(promises);
                all.then(function(){
                    q.resolve();
                })
            }
            else {
                q.reject();
            }

            return q;
        }
    }

}]);