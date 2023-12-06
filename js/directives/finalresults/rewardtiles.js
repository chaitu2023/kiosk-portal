higiKioskControllers.directive('finalResultsRewardTiles',['$http', '$timeout', 'HigiApiService' ,'JkioskService', 'HigiKioskStorageService' ,'HigiKioskAnimationService' , 'HigiKioskUserService' , '$rootScope', '$q', 'HigiKioskUtilitiesService',function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskAnimationService, HigiKioskUserService, $rootScope, $q, HigiKioskUtilitiesService) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/finalresults/reward-tiles.html',
        link : function(scope, elem, attr){
            //Inline reward tile definitions
            scope.rewardsAd = scope.rewardsAd || new Object();
            scope.rewardsAd.challengeAdPlacement = "challenge_final";
            scope.rewardsAd.isHigi = HigiKioskUtilitiesService.isHigiGreen();
            scope.rewardsAd.challengeJoinedAdPlacement = "challenge_final_joined";
            scope.rewardsAd.init = function () {
                scope.rewardsAd.authenticated_en_us = (scope.rewardsAd.isHigi) ? 'images/final-results-ad-authenticated-higi-en-us.png' : 'images/final-results-ad-authenticated-en-us.png';
                scope.rewardsAd.authenticated_es_us =  (scope.rewardsAd.isHigi) ? 'images/final-results-ad-authenticated-higi-es-us.png' : 'images/final-results-ad-authenticated-es-us.png';
                scope.rewardsAd.unauthenticated_en_us =  (scope.rewardsAd.isHigi) ? 'images/final-results-ad-unauthenticated-higi-en-us.png' : 'images/final-results-ad-unauthenticated-en-us.png';
                scope.rewardsAd.unauthenticated_es_us =  (scope.rewardsAd.isHigi) ? 'images/final-results-ad-unauthenticated-higi-es-us.png' : 'images/final-results-ad-unauthenticated-es-us.png';
                scope.rewardsAd.apiAvailable = HigiKioskStorageService.returnSessionData('apiAvailable');
                scope.rewardsAd.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                scope.rewardsAd.loggedIn = HigiKioskStorageService.returnSessionData('loggedIn');
                if(scope.rewardsAd.apiAvailable){
                    scope.rewardsAd.setChallengeAds();
                }else {
                    scope.rewardsAd.offline_es_us = 'images/final-results-ad-offline-es-us.png';
                    scope.rewardsAd.offline_en_us =  'images/final-results-ad-offline-en-us.png';
                }

                scope.rewardsAd.setChallengeJoined();
                scope.rewardsAd.setAdVisible();
                scope[attr.promisename].resolve();
            };

            scope.rewardsAd.setChallengeJoined = function(){
                scope.rewardsAd.hasChallenge = HigiKioskStorageService.returnSessionData('hasChallenge');
                scope.rewardsAd.challengeJoined = (HigiKioskStorageService.returnSessionData("userInChallenge") === undefined) ? false : HigiKioskStorageService.returnSessionData("userInChallenge");
            };
            scope.rewardsAd.setChallengeAds = function(){

                if(HigiKioskStorageService.returnSessionData('hasChallenge') === true){

                    var challengeJoinedAdDataObject = HigiKioskUserService.getAdDataObjectForSlide("finalresults_challenge_joined");
                    var challengeAdDataObject = HigiKioskUserService.getAdDataObjectForSlide("finalresults_challenge");
                    var promiseArray = [];
                    if(HigiKioskStorageService.returnSessionData('challengeAdFinalJoined') == undefined){
                        var challengeJoinedPromise = $q.defer();
                        promiseArray.push(challengeJoinedPromise);
                        JkioskService.getAdConcurrent(scope.rewardsAd.challengeJoinedAdFound,scope.rewardsAd.challengeJoinedAdPlacement, challengeJoinedAdDataObject, challengeJoinedPromise);
                    }
                    if(HigiKioskStorageService.returnSessionData('challengeModalAdFinal') == undefined){
                        var challengeAdPromise = $q.defer();
                        promiseArray.push(challengeAdPromise);
                        JkioskService.getAdConcurrent(scope.rewardsAd.challengeAdFound,scope.rewardsAd.challengeAdPlacement, challengeAdDataObject, challengeAdPromise);
                    } else {
                        scope.rewardsAd.challengeAdFound(HigiKioskStorageService.returnSessionData('challengeModalAdFinal'));
                    }
                    if(promiseArray.length != 0){
                        var q = $q.all(promiseArray);
                        q.then(
                            function(hasAd){
                                console.log("Has challenge ad final " + hasAd);
                            }
                        );
                    }


                } else if(HigiKioskStorageService.returnSessionData('hasChallenge') === undefined) {
                    //Has challenge undefined, make sure challenge doesn't exist
                    var q = $q.defer();
                    JkioskService.getChallengeAd(HigiKioskUserService, q);
                    q.promise.
                        then(function(){
                            scope.rewardsAd.setChallengeJoined();
                            scope.rewardsAd.setChallengeAds();
                            scope.rewardsAd.setAdVisible();
                        });
                } else {
                    //No challenge, go ahead and set challenges avail to false
                    scope.rewardsAd.challengeAdFound({"hasAd" : "false" });
                    scope.rewardsAd.challengeJoinedAdFound({"hasAd" : "false" });
                }

            };

            scope.rewardsAd.challengeJoinedAdFound = function(response){
                HigiKioskStorageService.saveSessionData('challengeAdFinalJoined', response);
                if(response.hasAd == "true"){
                    scope.rewardsAd.challengeJoinedAd = response.path;
                } else {
                    scope.rewardsAd.challengeJoinedAd = (scope.langClass == "en_us") ? scope.rewardsAd.authenticated_en_us : scope.rewardsAd.authenticated_es_us
                }
            };

            scope.rewardsAd.challengeAdFound = function(response){
                HigiKioskStorageService.saveSessionData('challengeModalAdFinal', response);
                if(response.hasAd == "true"){
                    scope.rewardsAd.challengeAd = response.path;
                } else {
                    scope.rewardsAd.challengeAd = (scope.langClass == "en_us") ? scope.rewardsAd.authenticated_en_us : scope.rewardsAd.authenticated_es_us;
                }
            };

            scope.rewardsAd.setAdVisible = function(){
                scope.rewardsAd.setChallengeJoined();
                scope.rewardsAd.unauthEs = (scope.langClass == 'es_us' && !HigiKioskStorageService.returnSessionData('logged_in'));
                scope.rewardsAd.unauthEn = (scope.langClass == 'en_us' && !HigiKioskStorageService.returnSessionData('logged_in'));
                scope.rewardsAd.authEs = (scope.langClass == 'es_us' && HigiKioskStorageService.returnSessionData('logged_in'));
                scope.rewardsAd.authEn = (scope.langClass == 'en_us' && HigiKioskStorageService.returnSessionData('logged_in'));
            };

            scope.rewardsAd.joinChallenge = function(){
                if(HigiKioskStorageService.returnSessionData('logged_in')){
                    if($rootScope.earnditEnabled){
                        $rootScope.loadModal({id: 'lastcheckin'});
                    } else {
                        $rootScope.loadModal({id: 'accountcreatedchallenge'});
                    }

                } else {
                    $rootScope.loadModal({id: 'register'});
                }
            };

            scope.rewardsAd.loggedInWatch = function(newVal, oldVal){
                scope.rewardsAd.setAdVisible();
                scope.rewardsAd.loggedIn = HigiKioskStorageService.returnSessionData('logged_in');
            };
            scope.rewardsAd.userInChallengeWatch = function(newVal){
                scope.rewardsAd.setAdVisible();
                if(newVal == true){
                    //Clean off watch
                    scope.rewardsAd.userInChallengeWatch();
                }
            };

            HigiKioskStorageService.watchSessionData('logged_in', scope.rewardsAd.loggedInWatch);
            HigiKioskStorageService.watchSessionData('userInChallenge', scope.rewardsAd.userInChallengeWatch);
            scope.rewardsAd.init();

        }
    };
}]);