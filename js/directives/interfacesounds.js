//Global audio volume controller

angular
    .module("higiKioskUi")
    .directive("interfaceSounds", [ '$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            scope : '=',
            link : function (scope, element, attr) {
                // Sounds; Volume controls are required to be set in beginKioskSession() also
                $rootScope.interfaceSounds = {
                    sounds : {
                        typeSnd : new Audio("sounds/type_tap.wav"),
                        clickSnd : new Audio("sounds/click.mp3"),
                        earnditCountupSnd: new Audio("sounds/medal_earned.wav"),
                        higiScoreSnd : new Audio("sounds/ribbon_levelup.wav")
                    },
                    enabled : true,
                    stop : function(){
                        this.sounds.typeSnd.pause();
                        this.sounds.clickSnd.pause();
                        this.sounds.earnditCountupSnd.pause();
                        this.sounds.higiScoreSnd.pause();
                        this.enabled = false;
                    },
                    play : function(sound) {
                        if(this.enabled){
                            this.sounds[sound].pause();
                            this.sounds[sound].currentTime = 0;
                            this.sounds[sound].volume = $rootScope.getGlobalVolume();
                            this.sounds[sound].play();
                        }
                    }
                };
            }
        }
}]);



