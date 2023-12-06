higiKioskControllers.directive('finalResultsScoreGauge',['$http', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskAnimationService' , '$q',  '$rootScope', 'HigiKioskUtilitiesService', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskAnimationService, $q, $rootScope, HigiKioskUtilitiesService) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/finalresults/higiscore-gauge.html',
        link : function(scope, elem, attr){
            //Inline reward tile definitions
            scope.higiGauge = new Object();

            scope.higiGauge.badgeCountId = 'point-score';
            scope.higiGauge.badgeInitPoints = 0;
            scope.higiGauge.finalResultsPointScore = "";
            scope.higiGauge.sparkleClass = '';
            scope.higiGauge.pointsBadgeTitle = 'finalresults.points.token.guage.title';
            scope.higiGauge.pointsBadgeUnits = 'finalresults.points.token.guage.points';
            scope.higiGauge.pointsBadgeLabel = 'finalresults.points.token.guage.label';
            scope.higiGauge.pointsVisible = !HigiKioskStorageService.returnSessionData('logged_in');
            scope.higiGauge.scoreVisible = !scope.higiGauge.pointsVisible;
            scope.higiGauge.isHigi = HigiKioskUtilitiesService.isHigiGreen();;

            scope.higiGauge.radius = (!scope.higiGauge.isHigi) ? {points : 220 , score : 205 } : {points : 205 , score : 140 };


            scope.higiGauge.countUpBadgeCallback = function(val){
                HigiKioskUtilitiesService.safeApply(scope, function(){
                    scope.higiGauge.finalResultsPointScore = val;
                });
            };

            scope.higiGauge.showPointBadge = function(badgePromise) {

                scope.higiGauge.earnedPoints = scope.mode == "bpw" ? HigiKioskStorageService.returnSessionData('earndItPointsForCheckin') : (HigiKioskStorageService.returnSessionData('earndItPointsForCheckin')/2);
                scope.higiGauge.pointsVisible = true;
                scope.higiGauge.scoreVisible = false;
                scope.higiGauge.pointCountUp = HigiKioskAnimationService.countUp('point-score', scope.higiGauge.badgeInitPoints,  scope.higiGauge.earnedPoints + scope.higiGauge.badgeInitPoints, 0, 5, null,  scope.higiGauge.countUpBadgeCallback);


                scope.higiGauge.sparkleClass = 'blurpulse';
                scope.higiGauge.pointCountUp.start(function(){
                    console.log('Point countup finished');
                    if(typeof(badgePromise) != "undefined") {
                        badgePromise.resolve();
                        return badgePromise;
                    }
                });

            };

            scope.higiGauge.showHigiScore = function(badgePromise) {

                    scope.higiGauge.scoreBadgeTitle = 'finalresults.higi.score';
                    scope.higiGauge.finalResultsPointScore = $rootScope.higiScore;
                    scope.higiGauge.pointsVisible = false;
                    scope.higiGauge.scoreVisible = true;

                    document.getElementById("score-gauge-badge").innerHTML = '';

                    HigiKioskAnimationService.writeGuage("score-gauge-badge",  scope.higiGauge.radius.score, scope.higiGauge.isHigi ? 20 : 25, scope.higiGauge.finalResultsPointScore);  // parseInt($rootScope.higiScore));
                    if(typeof(badgePromise) != "undefined") {
                        badgePromise.resolve();
                        return badgePromise;
                    }

            };

            scope[attr.promisename].resolve();

        }
    };
}]);