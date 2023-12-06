//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("heightScroller", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout) {
        return {
            restrict : 'E',
            templateUrl : 'components/onboarding/height-scroller.html',
            scope: false,
            link : function (scope, elem, attr) {
                scope.heightScroller = scope.heightScroller || new Object;
                scope.heightScroller.feetWheel = attr.feetwheel;
                scope.heightScroller.inchesWheel = attr.incheswheel;
                scope.heightScroller.feetList = attr.feetlist;
                scope.heightScroller.inchesList = attr.incheslist;
                scope.heightScroller.isSnapping = false;
                scope.heightScroller.tapPixelDiffThreshold = 15;

                scope.heightScroller.heightScrollerTransition = 'adFadeIn';
                scope.heightScroller.showHeightHint = true;
                scope.heightScroller.isHigi = HigiKioskUtilitiesService.isHigiGreen();
                scope.heightScroller.feetScrollerData = [
                    {id : scope.heightScroller.feetList + "_0" , value : 3},
                    {id : scope.heightScroller.feetList + "_1" , value : 4},
                    {id : scope.heightScroller.feetList + "_2" , value : 5},
                    {id : scope.heightScroller.feetList + "_3" , value : 6}


                ];

                scope.heightScroller.inchesScrollerData = [
                    {id : scope.heightScroller.inchesList + "_0" , value : 0},
                    {id : scope.heightScroller.inchesList + "_1" , value : 1},
                    {id : scope.heightScroller.inchesList + "_2" , value : 2},
                    {id : scope.heightScroller.inchesList + "_3" , value : 3},
                    {id : scope.heightScroller.inchesList + "_4" , value : 4},
                    {id : scope.heightScroller.inchesList + "_5" , value : 5},
                    {id : scope.heightScroller.inchesList + "_6" , value : 6},
                    {id : scope.heightScroller.inchesList + "_7" , value : 7},
                    {id : scope.heightScroller.inchesList + "_8" , value : 8},
                    {id : scope.heightScroller.inchesList + "_9" , value : 9},
                    {id : scope.heightScroller.inchesList + "_10" , value : 10},
                    {id : scope.heightScroller.inchesList + "_11" , value : 11}
                ];

                scope.heightScroller.setScrollers = function() {
                    scope.heightScroller.heightScrollMoveCount = 0;
                    scope.heightScroller.heightFeetScroller;
                    scope.heightScroller.heightInchesScroller;
                    scope.heightScroller.heightData;
                    scope.heightScroller.savedFeet;
                    scope.heightScroller.savedInches;
                    scope.heightScroller.mousePositionX = null;
                    scope.heightScroller.mousePositionY = null;
                    scope.heightScroller.feetLabel = 'height01.feet';
                    scope.heightScroller.inchesLabel = 'height01.inches';

                    scope.heightScroller.heightFeetScroller = new iScroll(scope.heightScroller.feetWheel, {
                        hScroll: false, hScrollbar: false, vScrollbar: false,
                        onScrollStart: function () {
                            $rootScope.resetSessionTimeout();
                            scope.heightScroller.hideHandHint();
                            scope.$apply();
                        },
                        onScrollEnd: function () {
                            $rootScope.resetSessionTimeout();
                           $('#' + scope.heightScroller.feetWheel).trigger('scrollEnd');

                        }
                    });

                    scope.heightScroller.heightInchesScroller = new iScroll(scope.heightScroller.inchesWheel, {
                        hScroll: false, hScrollbar: false, vScrollbar: false,
                        onScrollStart: function () {
                            scope.heightScroller.hideHandHint();
                            scope.$apply();
                            $rootScope.resetSessionTimeout();
                        },
                        onScrollEnd: function () {
                            $rootScope.resetSessionTimeout();
                            $('#' + scope.heightScroller.inchesWheel).trigger('scrollEnd');

                        }
                    });


                    scope.heightScroller.getScrollerValue = function(scrollList) {
                        elementHeight = $('#' + scrollList.scroller.id + ' .item').height();
                        console.log("element height = " + elementHeight)
                        scrollPosition = scrollList.y;
                        value = Math.round(-1 * scrollPosition / elementHeight);

                        //        feet starts at 3, which means we have to offset it as 0 == 3
                        if (scrollList.scroller.id == scope.heightScroller.feetList) {
                            value = value + 5;
                        }
                        return value;
                    };

                    scope.heightScroller.setScrollerValue = function(scrollList, number) {

                        var elementHeight = $('#' + scrollList.scroller.id + ' .item').height();
                        if (scrollList.scroller.id == scope.heightScroller.feetList) {
                            number = number - 3;
                        }
                        var snapPosition = Math.round(-1 * number * elementHeight);
                        console.log(scrollList + "===" + number)
                        scrollList.scrollTo(0, snapPosition, 50, false);
                    };
                    scope.heightScroller.nextClickreight = function () {
                        console.log('hs saver')
                        var heightFeet = scope.heightScroller.getScrollerValue(scope.heightScroller.heightFeetScroller) -2 ;
                        var heightInches = scope.heightScroller.getScrollerValue(scope.heightScroller.heightInchesScroller);
                        var heightTotalInches = (heightFeet * 12) + ( heightInches );
                        var heightTotalMeters = heightTotalInches * .0254;
                        HigiKioskStorageService.saveSessionData("height", heightTotalMeters);
                    };



                    scope.heightScroller.hintClicked = function(){
                        scope.heightScroller.heightScrollerTransition = 'adFadeOut';
                        $timeout(function(){
                            scope.heightScroller.showHeightHint = false;
                        },500)

                        scope.nextVisible = true;

                    };

                    scope.heightScroller.height_help_animation = function() {
                        /* scope.heightScroller.heightScrollMoveCount counts how many times the scroller has been set.
                         By default, it gets set twice (one per scroller), so if the scroller hasn't been set more than twice
                         and 5 seconds passes before it does change, we show the help animation */


                        if (scope.heightScroller.heightScrollMoveCount < 3) {
                            $('#height_hint').fadeIn(500);
                            if(scope.heightScroller.isHigi) {
                                //Higi Sized Screen

                                $('#height_hint_hand').stop().delay(500).animate({top: '-=40'}, 300).delay(300).animate({top: '+=80'}, 500, 'swing').delay(700).animate({top: '-=40'}, 500, 'swing').delay(300).animate({left: '+=220'}, 500, 'swing').delay(500).animate({top: '-=40'}, 300).delay(300).animate({top: '+=80'}, 500, 'swing').delay(700).animate({top: '-=40'}, 500, 'swing', function () {
                                    scope.heightScroller.hintClicked();
                                });


                                //});
                            }else {
                                //SH sized screen
                                $('#height_hint_hand').stop().delay(500)
                                    .animate({top: '-=40'}, 300)
                                    .delay(300).animate({top: '+=200'}, 500, 'swing')
                                    .delay(700).animate({top: '-=120'}, 500, 'swing')
                                    .delay(300).animate({left: '+=330'}, 500, 'swing')
                                    .delay(500).animate({top: '-=80'}, 300)
                                    .delay(300).animate({top: '+=120'}, 500, 'swing')
                                    .delay(700).animate({top: '-=80'}, 500, 'swing')
                                    .delay(300).animate({top: '+=120'}, 500, 'swing',
                                    function () {
                                    scope.heightScroller.hintClicked();
                                });
                            }
                            scope.heightScroller.heightScrollMoveCount++;

                        }

                    };




                    //scope.heightScroller.handHint = function() {
                    //
                    //    var q = $q.defer();
                    //    //$('#height_hint').fadeIn(500);
                    //    $('#height_hint_hand').stop().delay(500).animate({top: '-=40'}, 300).delay(300).animate({top: '+=80'}, 500, 'swing').delay(700).animate({top: '-=40'}, 500, 'swing').delay(300).animate({left: '+=220'}, 500, 'swing').delay(500).animate({top: '-=40'}, 300).delay(300).animate({top: '+=80'}, 500, 'swing').delay(700).animate({top: '-=40'}, 500, 'swing', function () {
                    //        scope.heightScroller.hintClicked();
                    //        q.resolve();
                    //    });
                    //
                    //    return q;
                    //};

                    scope.heightScroller.hideHandHint = function(){
                        scope.heightScroller.hintClicked();
                        scope.nextVisible = true;
                    };

                    scope.heightScroller.setHeightScroll = function(){

                        if (HigiKioskStorageService.returnSessionData('height') != undefined) {
                            //parse data
                            scope.heightScroller.heightData = HigiKioskStorageService.returnSessionData('height');
                            conversion = Math.round(scope.heightScroller.heightData * 39.3700787); // in inches
                            scope.heightScroller.savedFeet = Math.floor(conversion / 12.0);
                            scope.heightScroller.savedInches = Math.round(conversion - (scope.heightScroller.savedFeet * 12));

                            //populate data
                            console.log("populate feet scroller - " + scope.heightScroller.heightFeetScroller)
                            console.log("populate feet scroller - " + scope.heightScroller.heightInchesScroller)



                            scope.heightScroller.setScrollerValue(scope.heightScroller.heightFeetScroller, scope.heightScroller.savedFeet);
                            setTimeout(function(){scope.heightScroller.setScrollerValue(scope.heightScroller.heightInchesScroller, scope.heightScroller.savedInches)}, 50);
                        }
                        else {
                            console.log('setting default height scroller');
                            scope.heightScroller.setScrollerValue(scope.heightScroller.heightFeetScroller, 5);
                            setTimeout(function(){scope.heightScroller.setScrollerValue(scope.heightScroller.heightInchesScroller, 7)}, 50);

                        }
                    };



                    $('#' + scope.heightScroller.feetWheel).on('scrollEnd', function () {

                        elementHeight = $('#' + scope.heightScroller.feetWheel + ' .item').height();

                        elementTotalHeight = elementHeight * ( scope.heightScroller.feetScrollerData.length - 1);

                        elementCurrent = scope.heightScroller.heightFeetScroller.y;
                        snapPosition = Math.round(elementCurrent / elementHeight) * elementHeight;

                        if (!scope.heightScroller.isSnapping)
                        {
                            if ((elementCurrent % elementHeight) != 0 && !scope.heightScroller.isSnapping) {
                                //Now here's a hack! There's a 2 pixel issue here, so we compensate for it by adding 2 back into the negative scroll
                                var bounceOffset =  (scope.heightScroller.isHigi) ? 2 : 13;
                                // if (elementCurrent == (( -1 * elementTotalHeight) + bounceOffset)) {
                                if(snapPosition <= elementTotalHeight * -1 + bounceOffset){
                                    //do nothing
                                } else {
                                    scope.heightScroller.heightFeetScroller.scrollTo(0, snapPosition, 100, false);
                                }
                            }
                        }
                        else {
                            scope.heightScroller.heightFeetScroller.scrollTo(0, scope.heightScroller.snapPosition, 220, false);
                        }
                        scope.heightScroller.isSnapping = false;
                    });


                    $('#' + scope.heightScroller.inchesWheel).on('scrollEnd', function () {
                        elementHeight = $('#' + scope.heightScroller.inchesList + ' .item').height();
                        elementTotalHeight = elementHeight * ( scope.heightScroller.inchesScrollerData.length - 1);
                        elementCurrent = scope.heightScroller.heightInchesScroller.y;

                        snapPosition = Math.round(elementCurrent / elementHeight) * elementHeight;
                        if (!scope.heightScroller.isSnapping)
                        {
                            if ((elementCurrent % elementHeight) != 0) {

                                //Now here's a hack! There's a 2 pixel issue here, so we compensate for it by adding 2 back into the negative scroll
                                var bounceOffset =  (scope.heightScroller.isHigi) ? 2 : 13;
                                if(snapPosition <= elementTotalHeight * -1 + bounceOffset) {
                                //do nothing

                                } else {
                                    scope.heightScroller.heightInchesScroller.scrollTo(0, snapPosition, 100, false);

                                }
                            }
                        }
                        else {
                            scope.heightScroller.heightInchesScroller.scrollTo(0, scope.heightScroller.snapPosition, 220, false);
                        }
                        scope.heightScroller.isSnapping = false;
                    });

                    scope.heightScroller.fuzzyCompare = function(a, b, range){
                        range = (range == undefined) ? 30 : range ;
                        if(a < (b + range) && a > (b - range)) {
                            return true;
                        } else {
                            return false;
                        }

                    };



                    /* if you click the number on the scroller, it should rotate to that position.
                     however, if you click AND dragged, it should actually just drag it without moving the position.
                     therefore we need to check if the mouseup location == mouse down location before we go ahead and change numbers.
                     */
                    $('#' + scope.heightScroller.feetList + ' li').mousedown(function (e) {
                        console.log('click reg feet')
                        scope.heightScroller.mousePositionX = e.pageX;
                        scope.heightScroller.mousePositionY = e.pageY;
                        //console.log("x=" + scope.heightScroller.mousePositionX);
                        //console.log("y=" + scope.heightScroller.mousePositionY);
                    }).mouseup(function (e) {
                        //console.log("x=" + e.pageX);
                        //console.log("y=" + e.pageY);
                        elementHeight = $('#' + scope.heightScroller.inchesList + ' .item').height();
                        if (scope.heightScroller.fuzzyCompare( scope.heightScroller.mousePositionX, e.pageX , elementHeight) && scope.heightScroller.fuzzyCompare(scope.heightScroller.mousePositionY, e.pageY , elementHeight)) {
                            if (Math.abs(scope.heightScroller.mousePositionX - e.pageX) <= scope.heightScroller.tapPixelDiffThreshold && Math.abs(scope.heightScroller.mousePositionY - e.pageY) <= scope.heightScroller.tapPixelDiffThreshold)
                            {
                                scope.heightScroller.isSnapping = true;
                            }
                            JkioskService.logEvent('height01_feetScroller', 'scroller', 'clicked');
                            elementId = $(this).attr('id');
                            elementIdNum = elementId.replace(scope.heightScroller.feetList + '_', '');
                            snapPosition = Math.round(-1 * elementIdNum * elementHeight);
                            scope.heightScroller.snapPosition = snapPosition;
                            scope.heightScroller.heightFeetScroller.scrollTo(0, snapPosition, 220, false);
                        }
                    });


                    $('#' + scope.heightScroller.inchesList + ' li').mousedown(function (e) {
                        scope.heightScroller.mousePositionX = e.pageX;
                        scope.heightScroller.mousePositionY = e.pageY;
                    }).mouseup(function (e) {
                        //console.log("x=" + e.pageX);
                        //console.log("y=" + e.pageY);
                        elementHeight = $('#' + scope.heightScroller.inchesList + ' .item').height();
                        if (scope.heightScroller.fuzzyCompare(scope.heightScroller.mousePositionX, e.pageX ,  elementHeight) && scope.heightScroller.fuzzyCompare(scope.heightScroller.mousePositionY, e.pageY ,  elementHeight)) {
                            if (Math.abs(scope.heightScroller.mousePositionX - e.pageX) <= scope.heightScroller.tapPixelDiffThreshold && Math.abs(scope.heightScroller.mousePositionY - e.pageY) <= scope.heightScroller.tapPixelDiffThreshold)
                            {
                                scope.heightScroller.isSnapping = true;
                            }
                            //console.log("jumping")
                            JkioskService.logEvent('height01_inchesScroller', 'scroller', 'clicked');
                            elementId = $(this).attr('id');
                            elementIdNum = elementId.replace(scope.heightScroller.inchesList + '_', '');
                            snapPosition = Math.round(-1 * elementIdNum * elementHeight);
                            scope.heightScroller.snapPosition = snapPosition;
                            scope.heightScroller.heightInchesScroller.scrollTo(0, snapPosition, 220, false);
                        }
                    });

                    if(attr.feetwheel.search('lastCheckin') == -1){
                        scope.heightScroller.height_help_animation();
                    }
                };
                scope[attr.promisename].resolve();


            }
        }
    }]);



