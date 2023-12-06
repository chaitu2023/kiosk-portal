
//Weight Guage
angular
    .module("higiKioskUi")
    .directive("weightInstructionOne", ['$timeout', '$q', 'HigiKioskStorageService', '$rootScope', 'HigiKioskUtilitiesService',function($timeout, $q, HigiKioskStorageService, $rootScope, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/weight/weight-instruction-1.html',
            link : function(scope, element, attr){
                    scope.weightInstruction = scope.weightInstruction || new Object();
                    scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen()
                    scope.weightInstruction.animationOne = function(){
                        var q = $q.defer();
                        $('#weight_instruction_seat').css('opacity', 1);
                        $('#weight_instruction_seat_text').css('opacity',1);
                        $('#weight_instruction_seat_text').css('color','#585858');
                        $('#weight_instruction_seat_frames').delay(50)//we don't want to use a timeout, so we use a delay
                            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                                $('#weight_instruction_seat_frames').sprite({ //sets the sprite and animates it immediately
                                    fps:24,
                                    no_of_frames:(scope.weightInstruction.isHigi) ? 25 : 33,
                                    start_at_frame:0,
                                    play_frames:(scope.weightInstruction.isHigi) ? 25 : 33
                                });
                            })
                            .delay(1100)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                            .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                                q.resolve();
                                $('#weight_instruction_seat_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                            });

                        return q;
                    };
                    scope[attr.promisename].resolve();


            }
        }
    }])
    .directive("weightInstructionTwo", ['$q' ,'HigiKioskStorageService', '$rootScope', 'HigiKioskUtilitiesService', function($q, HigiKioskStorageService, $rootScope, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : "=",
            templateUrl : 'components/weight/weight-instruction-2.html',
            link : function (scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.animationTwo = function() {
            //  alert("inside promise package 2 animation function");
                    var q = $q.defer();
                    $('#weight_instruction_feet').css('opacity', 1);
                    $('#weight_instruction_feet_text').css('opacity',1);
                    $('#weight_instruction_feet_text').css('color','#585858');
                    $('#weight_instruction_feet_frames').delay(100)
                        .animate({'backgroundPosition': 'left top'}, 1, function () {
                            $('#weight_instruction_feet_frames').sprite({
                                fps: 24,
                                no_of_frames: (scope.weightInstruction.isHigi) ? 27 : 25,
                                start_at_frame: 1,
                                play_frames: (scope.weightInstruction.isHigi) ? 26 : 23
                            })
                        })
                        .delay(1100)
                        .animate({'backgroundPosition': 'right top'}, 1, function () {
                            q.resolve();
                            $('#weight_instruction_feet_frames').destroy();
                        });
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }])
    
    
    
    .directive("weightInstructionThree", ['HigiKioskStorageService', '$rootScope', 'HigiKioskUtilitiesService', function(HigiKioskStorageService, $rootScope, HigiKioskUtilitiesService) {
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/weight/weight-instruction-3.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi = HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.animationThree = function(){/*
                    var q = $q.defer();
                    $('#weight_instruction_feet2').css('opacity', 1);
                    $('#weight_instruction_feet_frames2').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#weight_instruction_feet_frames2').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#weight_instruction_feet_frames2').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                    
                    */
                    
                    alert("got inside animation theree");
                    return null;
                };
                scope[attr.promisename].resolve();

            }
        }
    }])
    
    
    .directive("weightGuage", ['HigiKioskStorageService', '$rootScope', 'HigiKioskUtilitiesService', function(HigiKioskStorageService, $rootScope, HigiKioskUtilitiesService) {
        //Weight Guage
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/weight/weight-guage.html',
            link : function (scope, elements, attr) {
                scope.weightGauge = scope.weightGauge || new Object();
                scope.weightGauge.isHigi = HigiKioskUtilitiesService.isHigiGreen();
                //Arc Variables
                scope.weightGauge.arcRadius = (scope.weightGauge.isHigi) ? 116 : 116; //in pixels
                scope.weightGauge.xLocation = (scope.weightGauge.isHigi) ? 397 : 397;
                scope.weightGauge.yLocation = (scope.weightGauge.isHigi) ? 302 : 302;
                scope.weightGauge.arcColor = "#a6ff8f";
                scope.weightGauge.arcWidth = (scope.weightGauge.isHigi) ? "18px" : "25px";
                scope.weightGauge.arcTimer = 700; //speed of drawing the arc
                scope.weightGauge.transformCoords = "t-101,176r240"; //moves it into position since weight starts at an angle
                scope.weightGauge.my_arc = null;

                //Weight Variables
                scope.weightGauge.weightStart = 0; // where on the meter should it start
                scope.weightGauge.weightTotalCircle = 600; //if the scale measurement went full circle (end to end), what would the max be? it's a little less cause the gauge starts at zero, and each flat number (50, 100, 150) it hits has to actually draw the arc past it to light it up
                scope.weightGauge.startMilliseconds = 0;


                // Custom Arc Attribute, position x&y, value portion of total, total value, Radius
                scope.weightGauge.archtype = Raphael("weightgauge_arc_gauge", 800, 600);
                scope.weightGauge.archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
                    var alpha = (360 / total) * value,
                        a = (90 - alpha) * Math.PI / 180,
                        x = xloc + R * Math.cos(a),
                        y = yloc - R * Math.sin(a),
                        path;
                    if (total == value) {
                        path = [
                            ["M", xloc, yloc - R],
                            ["A", R, R, 0, 1, 1, xloc - 0.01, yloc - R]
                        ];
                    } else {
                        path = [
                            ["M", xloc, yloc - R],
                            ["A", R, R, 0, +(alpha > 180), 1, x, y]
                        ];
                    }
                    return {
                        path:path
                    };
                };
                scope.weightGauge.my_arc = scope.weightGauge.archtype.path().attr({ "stroke":scope.weightGauge.arcColor, "stroke-width":scope.weightGauge.arcWidth,
                    arc:[scope.weightGauge.xLocation, scope.weightGauge.yLocation, scope.weightGauge.weightStart, scope.weightGauge.weightTotalCircle, scope.weightGauge.arcRadius] }).transform(scope.weightGauge.transformCoords);

                scope.weightGauge.drawArc = function (weightUpdate) {
                    scope.weightGauge.weightUpdateMod = ( parseInt(weightUpdate) + 5); //we add 5 artificially because on the exact weight, it only partially fills the gauge's 'dot'. the extra 5 pushes it over for the visual effect
                    scope.weightGauge.my_arc.animate({ arc:[scope.weightGauge.xLocation, scope.weightGauge.yLocation, scope.weightGauge.weightUpdateMod, scope.weightGauge.weightTotalCircle, scope.weightGauge.arcRadius]}, scope.weightGauge.arcTimer);
                };
                scope.weightGauge.drawGauge = function(weightUpdate) {
                    scope.weightGauge.drawArc(weightUpdate);

                };
                scope[attr.promisename].resolve();
            }
        }
    }])
    .directive("bmcInstructionOne",['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService',function($q, $rootScope, HigiKioskStorageService,HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/weight/ecg-instruction-1.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.bmcAnimationOne = function(){
                    var q = $q.defer();
                    $('.BMCHealth_instructions_circle_container_1').css('opacity', 1);
                    $('.BMCHealth_instructions_text_1').css('color','#585858');
                    $('#BMCHealth_instructions_circle1_place_frames').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#BMCHealth_instructions_circle1_place_frames').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#BMCHealth_instructions_circle1_place_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                };
                scope[attr.promisename].resolve();

            }
        }
    }]).directive("bmcInstructionTwo", ['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : "=",
            templateUrl : 'components/weight/ecg-instruction-2.html',
            link : function (scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();
                scope.weightInstruction.bmcAnimationTwo = function() {

                    var q = $q.defer();
                    $('.BMCHealth_instructions_circle_container_2').css('opacity', 1);
                    $('.BMCHealth_instructions_text_2').css('color','#585858');
                    $('#BMCHealth_instructions_circle2_place_frames').delay(100)
                        .animate({'backgroundPosition': 'left top'}, 1, function () {
                            $('#BMCHealth_instructions_circle2_place_frames').sprite({
                                fps: 24,
                                no_of_frames: (scope.weightInstruction.isHigi) ? 30 : 23,
                                start_at_frame: 0,
                                play_frames: (scope.weightInstruction.isHigi) ? 30 : 23
                            })
                        })
                        .delay(3000)
                        .animate({'backgroundPosition': 'right top'}, 1, function () {
                            q.resolve();
                            $('#BMCHealth_instructions_circle2_place_frames').destroy();
                        });
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }]).directive("fullBodyBmcInstructionOne",['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService',function($q, $rootScope, HigiKioskStorageService,HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/full-body-bmc-instruction-one.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.fullBodyBmcAnimationOne = function(){
                    var q = $q.defer();
                    $('.FullBodyBMCHealth_instructions_circle_container_1').css('opacity', 1);
                    $('.BMCHealth_instructions_text_1').css('color','#585858');
                    $('#BMCHealth_instructions_circle1_place_frames').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#BMCHealth_instructions_circle1_place_frames').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#BMCHealth_instructions_circle1_place_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                };
                scope[attr.promisename].resolve();

            }
        }
    }]).directive("fullBodyBmcInstructionTwo", ['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : "=",
            templateUrl : 'components/full-body-bmc-instruction-two.html',
            link : function (scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();
                scope.weightInstruction.fullBodyBmcAnimationTwo = function() {
                    var q = $q.defer();
                    $('.FullBodyBMCHealth_instructions_circle_container_2').css('opacity', 1);
                    $('.BMCHealth_instructions_text_2').css('color','#585858');
                    $('#BMCHealth_instructions_circle2_place_frames').delay(100)
                        .animate({'backgroundPosition': 'left top'}, 1, function () {
                            $('#BMCHealth_instructions_circle2_place_frames').sprite({
                                fps: 24,
                                no_of_frames: (scope.weightInstruction.isHigi) ? 30 : 23,
                                start_at_frame: 0,
                                play_frames: (scope.weightInstruction.isHigi) ? 30 : 23
                            })
                        })
                        .delay(3000)
                        .animate({'backgroundPosition': 'right top'}, 1, function () {
                            q.resolve();
                            $('#BMCHealth_instructions_circle2_place_frames').destroy();
                        });
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }]).directive("fullBodyBmcInstructionThree", ['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : "=",
            templateUrl : 'components/full-body-bmc-instruction-three.html',
            link : function (scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();
                scope.weightInstruction.fullBodyBmcAnimationThree = function() {
                    var q = $q.defer();
                    $('.BMCHealth_instructions_circle_container_3').css('opacity', 1);
                    $('.BMCHealth_instructions_text_3').css('color','#585858');
                    $('#BMCHealth_instructions_circle3_place_frames').delay(100)
                        .animate({'backgroundPosition': 'left top'}, 1, function () {
                            $('#BMCHealth_instructions_circle3_place_frames').sprite({
                                fps: 24,
                                no_of_frames: 1,
                                start_at_frame: 1,
                                play_frames:  1
                            })
                        })
                        .delay(3000)
                        .animate({'backgroundPosition': 'right top'}, 1, function () {
                            q.resolve();
                            $('#BMCHealth_instructions_circle3_place_frames').destroy();
                        });
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }])
      .directive("threeleadecgInstructionOne",['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService',function($q, $rootScope, HigiKioskStorageService,HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/threeleadinstruction1.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.threeleadecgAnimationOne = function(){
                    var q = $q.defer();
                    $('.threeleadecg_instruction_place').css('opacity', 1);
                    $('.threeleadecg_instruction_place').css('color','#585858');
                    $('#threeleadecg_instruction_place_frames').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#threeleadecg_instruction_place_frames').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#threeleadecg_instruction_place_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                };
                scope[attr.promisename].resolve();

            }
        }
    }])
      .directive("threeleadecgInstructionTwo",['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService',function($q, $rootScope, HigiKioskStorageService,HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/threeleadinstruction2.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.threeleadecgAnimationTwo = function(){
                    var q = $q.defer();
                    $('.threeleadecg_instruction_still').css('opacity', 1);
                    $('.threeleadecg_instruction_still').css('color','#585858');
                    $('#threeleadecg_instruction_still_frames').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#threeleadecg_instruction_still_frames').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#threeleadecg_instruction_still_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                };
                scope[attr.promisename].resolve();

            }
        }
    }])
         .directive("threeleadecgInstructionThree",['$q' , '$rootScope',  'HigiKioskStorageService', 'HigiKioskUtilitiesService',function($q, $rootScope, HigiKioskStorageService,HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/threeleadinstruction3.html',
            link : function(scope, element, attr){
                scope.weightInstruction = scope.weightInstruction || new Object();
                scope.weightInstruction.isHigi= HigiKioskUtilitiesService.isHigiGreen();

                scope.weightInstruction.threeleadecgAnimationThree = function(){
                    var q = $q.defer();
                    $('.threeleadecg_instruction_leg').css('opacity', 1);
                    $('.threeleadecg_instruction_leg').css('color', '#585858');
                    $('#threeleadecg_instruction_leg_frames').delay(50)//we don't want to use a timeout, so we use a delay
                        .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                            $('#threeleadecg_instruction_leg_frames').sprite({ //sets the sprite and animates it immediately
                                fps:(scope.weightInstruction.isHigi) ? 24 : 18,
                                no_of_frames:(scope.weightInstruction.isHigi) ? 24 : 18,
                                start_at_frame:0,
                                play_frames:(scope.weightInstruction.isHigi) ? 24 : 18
                            });
                        })
                        .delay(2000)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
                        .animate({'backgroundPosition':'right top'}, 1, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                            q.resolve();
                            $('#threeleadecg_instruction_leg_frames').destroy(); //you MUST destroy the sprite if you want it to play again
                        });

                    return q;
                };
                scope[attr.promisename].resolve();

            }
        }
    }])
    .directive("bmcGuage", function($rootScope) {
        //Weight Guage
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/weight/bmc-gauge.html',
            link : function (scope, elements, attr) {

                scope.$watch(attr.progress, function(newValue, oldValue) {

                    newValue = typeof(newValue) != "undefined" ? parseInt(newValue) : 0;
                    console.log("updating bmc progress - " + newValue)
                    var top = 400 - (newValue/100 * 400);

                    $('.bmc-gauge-bg-wave-container').animate({top : top + 'px'}, 1000);



                });
                var loop = function(){
                    $('.bmc-gauge-bg-wave').css('left', '-600px');
                    $('.bmc-gauge-bg-wave').animate({left : 0 + 'px'}, 3000, loop);
                }
                //loop();
                $('.bmc-gauge-bg-wave-container').animate({top : '0px'}, 20000);
                scope[attr.promisename].resolve();
            }
        }
    });




