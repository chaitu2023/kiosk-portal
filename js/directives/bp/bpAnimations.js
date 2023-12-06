//BP Test Animations

angular
    .module("higiKioskUi")
    .directive("bpInstructionArm", ['$q', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/bp-instruction-arm.html',
            link : function(scope, element, attr){
                scope.bpAnimate = scope.bpAnimate || new Object();

                scope.bpAnimate.isHigi = HigiKioskUtilitiesService.isHigiGreen();

                scope.bpAnimate.instructionArm = function(){
                    var q = $q.defer();
                    $("#bp_instruction_arm").css('opacity' , 1);
                    $('#bp_instruction_arm_text').css('color','#585858');
                    $('#bp_instruction_arm_frames').delay(1000)
                        .animate({'backgroundPosition':'left top'}, 1, function () {
                          $('#bp_instruction_arm_frames').sprite({
                                fps: (scope.bpAnimate.isHigi) ?14 : 14,
                                no_of_frames:(scope.bpAnimate.isHigi) ?30 : 30,
                                start_at_frame:(scope.bpAnimate.isHigi) ?1 : 0,
                                play_frames:(scope.bpAnimate.isHigi) ?29: 29

                            })
                        })
                        .delay(1100)
                        .animate({'backgroundPosition':'right top'}, 1, function () {
                            q.resolve();
                            $('#bp_instruction_arm_frames').destroy();

                        });
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }])
    .directive("bpInstructionPalm",[ '$q', function($q) {
        //Weight instruction 1
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/bp-instruction-palm.html',
            link : function(scope, element, attr){
                scope.bpAnimate = scope.bpAnimate || new Object();
                scope.bpAnimate.instructionPalm = function() {
                    var q = $q.defer();
                    $("#bp_instruction_palm").css('opacity', 1);
                    $('#bp_instruction_palm_text').css('color','#585858');
                    $('#bp_instruction_palm_hand').attr({'style': ''});
                    $('#bp_instruction_palm_hand').animate({'top': '-=40px'}, 1200, 'easeInCubic').delay(1000, function () {
                        q.resolve();
                    });
                    return q;
                }
                scope[attr.promisename].resolve();
            }
        }
    }])
    .directive("bpInstructionRelax", ['$q' , function($q) {
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/bp-instruction-relax.html',
            link : function(scope, element, attr){
                scope.bpAnimate = scope.bpAnimate || new Object();
                scope.bpAnimate.instructionRelax = function() {
                    var loops = 0;
                    var q = $q.defer();
                    $("#bp_instruction_relax").css('opacity' , 1)
                    $('#bp_instruction_relax_text').css('color','#585858');
                    var animateBPInstructionRelaxLoop = function() {
                        if (loops < 10) {
                            loops++;

                            $('#bp_instruction_relax_umbrella').css({'transformOrigin': '0px 131px', 'opacity' : 1});
                            $('#bp_instruction_relax_umbrella').transition({ rotate: '-4deg' }, 1200, 'in-out').
                                transition({ rotate: '0deg' }, 1000, 'in-out', animateBPInstructionRelaxLoop);
                            animateBPInstructionRelaxLoop();
                        }
                    };
                    animateBPInstructionRelaxLoop();
                    q.resolve();
                    return q;
                };
                scope[attr.promisename].resolve();
            }
        }
    }])
    .directive("bpGaugeSystolic", function() {
        //Results animation bp-s
        // scope.bpAnimate = scope.bpAnimate || new Object();
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/gauge-systolic.html',
            link : function(scope, elem, attrs){
                $("#result_gauge_arrow_systolic").stop(true, true)
                    .transition({'rotate':(scope.systolicDegrees + 6) + 'deg' }, 1500, 'in')
                    .transition({'rotate':(scope.systolicDegrees - 4) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.systolicDegrees + 2) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.systolicDegrees - 1) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.systolicDegrees) + 'deg' }, 50, 'linear');
            }
        }
    })
    .directive("bpGaugeDiastolic", function() {
        //Results animation bp-d
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/gauge-diastolic.html',
            link : function(scope, elem, attrs){
                $("#result_gauge_arrow_diastolic").stop(true, true)
                    .transition({'rotate':(scope.diastolicDegrees + 6) + 'deg' }, 1500, 'in')
                    .transition({'rotate':(scope.diastolicDegrees - 4) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.diastolicDegrees + 2) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.diastolicDegrees - 1) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.diastolicDegrees) + 'deg' }, 50, 'linear');
            }
        }
    })
    .directive("bpGaugePulse", function() {
        //Results animation bpm
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/gauge-pulse.html',
            link : function(scope, elem, attrs){
                $("#result_gauge_arrow_pulse").stop(true, true)
                    .transition({'rotate':(scope.pulseDegrees + 6) + 'deg' }, 1500, 'in')
                    .transition({'rotate':(scope.pulseDegrees - 4) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.pulseDegrees + 2) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.pulseDegrees - 1) + 'deg' }, 100, 'in')
                    .transition({'rotate':(scope.pulseDegrees) + 'deg' }, 50, 'linear');
            }
        }
    })
    .directive("bpGauge", ['$q', '$rootScope', 'HigiKioskStorageService', '$timeout' , 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, $timeout, HigiKioskUtilitiesService) {
        //Weight Guage
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/bp/bp-gauge.html',
            link : function(scope, elem, attr){
                //Arc Variables    
                scope.bpAnimate = scope.bpAnimate || new Object();
                scope.bpAnimate.isHigi = HigiKioskUtilitiesService.isHigiGreen();
                /*scope.bpAnimate.arcRadius = (scope.bpAnimate.isHigi) ? 124 : 160;
                scope.bpAnimate.xLocation = (scope.bpAnimate.isHigi) ? 400 : 640;
                scope.bpAnimate.yLocation = (scope.bpAnimate.isHigi) ? 300 : 515;*/
                scope.bpAnimate.arcRadius = (scope.bpAnimate.isHigi) ? 124 : 124;
                scope.bpAnimate.xLocation = (scope.bpAnimate.isHigi) ? 400 : 400;
                scope.bpAnimate.yLocation = (scope.bpAnimate.isHigi) ? 300 : 300;
                scope.bpAnimate.arcColor = "#a6ff8f";
                scope.bpAnimate.arcWidth = "25px";
                scope.bpAnimate.arcTimer = 1000; //speed of drawing the arc
                scope.bpAnimate.my_arc = null;

                //Blood Pressure Variables
                scope.bpAnimate.bpStart = 0;
                scope.bpAnimate.bpTotalCircle = 300;
                scope.bpAnimate.bpUpdate = 0;

                //Ad Checking Variables
                scope.bpAnimate.bpAdComplete = false;
                scope.bpAnimate.bpTestComplete = false;

                //Slide Finishing Variables
                scope.bpAnimate.bloodpressure02ForwardTimeout = null;
                scope.bpAnimate.bloodpressure02AdFailsafe = null;

                //Used to record when an ad has played
                scope.bpAnimate.adPlayNotification = null;


                // Custom Arc Attribute, position x&y, value portion of total, total value, Radius
                scope.bpAnimate.archtype = (scope.bpAnimate.isHigi) ? Raphael("bpgauge_arc_gauge", 800, 600) : Raphael("bpgauge_arc_gauge", 1280, 1024);
                scope.bpAnimate.archtype.customAttributes.arc = function (xloc, yloc, value, total, R) {
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
                scope.bpAnimate.my_arc =  scope.bpAnimate.archtype.path().attr({ "stroke": scope.bpAnimate.arcColor, "stroke-width": scope.bpAnimate.arcWidth,
                    arc:[scope.bpAnimate.xLocation, scope.bpAnimate.yLocation, scope.bpAnimate.bpStart, scope.bpAnimate.bpTotalCircle, scope.bpAnimate.arcRadius] });

                scope.bpAnimate.drawBPArc = function(bpUpdate) {
                    //Can't be more than 300 because it animates on access
                    bpUpdate = (bpUpdate > 300) ? 300 : bpUpdate;
                    scope.bpAnimate.my_arc.animate({ arc:[scope.bpAnimate.xLocation, scope.bpAnimate.yLocation, bpUpdate, scope.bpAnimate.bpTotalCircle, scope.bpAnimate.arcRadius]}, scope.bpAnimate.arcTimer);
                };


                scope.bpAnimate.drawGauge= function(bpUpdate){
                    scope.bpAnimate.drawBPArc(bpUpdate);

                };

                $('#bpgauge_container').transition({ perspective:'2500px', rotateY:'180deg'}, 0);


                scope.bpAnimate.init = function(){
                    var q = $q.defer();
                    $('#bpgauge_container_back').show();
                    q.resolve();
                    return q;
                };

                //Rotate Gauge
                scope.bpAnimate.rotateGauge = function(){
                    var q = $q.defer();
                    $('#bpgauge_container_back').show();

                    $('#bpgauge_container')
                        .transition({ perspective:'2500px', rotateY:'0deg' }, 2000, function () {
                            q.resolve();
                        });
                    $('.bpgauge_container_3d_element').fadeIn(50);
                    $('#bpgauge_container_back').delay(550).fadeOut(1);

                    return q;
                };

                //scale back gauge size
                scope.bpAnimate.scaleDown = function(){
                    var downScreen = (scope.bpAnimate.isHigi) ? {y: "360px" , scale :.30} :  {y: "360px", scale :.45};
                    var q = $q.defer();
                    scope.gaugeScaledUp = false;
                    $('#bpgauge_stop_button_message').delay(500).animate({'top':'84px' }, 1000);
                    $('#bpgauge_container').delay(500).transition(downScreen, 3000, function(){

                        q.resolve();

                    });
                    $('#bpgauge_container_cover_bottom').delay(500).fadeOut(3000);
                    return q;
                };

                //scale gauge up
                scope.bpAnimate.scaleUp = function(){
                    var q = $q.defer();
                    $('#bpgauge_stop_button_message').animate({'top':'100px' }, 1000);
                    $('#bpgauge_container').transition({ scale:1, y:'0'  }, 3000, function(){
                        $timeout(function(){

                            q.resolve();}, 1000)

                    });
//                  check if bp has ended. if ad and bp ends, do the logic
                    //bpAdComplete = true;
                    return q;
                };

                scope[attr.promisename].resolve();

            }
        }
    }]);




