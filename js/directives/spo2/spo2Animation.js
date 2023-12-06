
//Weight Guage
angular
    .module("higiKioskUi")
    .directive("spo2InProgress", ['$timeout', '$q', 'HigiKioskStorageService', '$rootScope', 'HigiKioskUtilitiesService',function($timeout, $q, HigiKioskStorageService, $rootScope, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/spo2/spo2-in-progress.html',
            link : function(scope, element, attr){

                    scope.spo2AnimationInit = function(){
                            
                        $('#spo2InProgressAnimation').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#spo2InProgressAnimation').sprite({ //sets the sprite and animates it immediately
                                    fps:24,
                                    no_of_frames:264,
                                    start_at_frame:0,
                                    play_frames:264
                                });
                            })
                            .delay(0)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 4090, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                    scope.spo2AnimationInit();                                    
                                
                                $('#spo2InProgressAnimation').destroy(); //you MUST destroy the sprite if you want it to play again
                            });
                    };

                    scope.spo2AnimationInit();

                    /*for(i = 0; i<15; i++){
                        $('#spo2InProgressAnimation').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#spo2InProgressAnimation').sprite({ //sets the sprite and animates it immediately
                                    fps:24,
                                    no_of_frames:264,
                                    start_at_frame:0,
                                    play_frames:264
                                });
                            })
                            .delay(11000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 4090, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                //q.resolve();
                                $('#spo2InProgressAnimation').destroy(); //you MUST destroy the sprite if you want it to play again
                            });
                   }*/

            }
        }
    }])