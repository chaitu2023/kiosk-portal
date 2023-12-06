//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("challengeGet", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiApiService', 'JkioskService', 'HigiKioskUserService', '$http', '$sce', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, HigiApiService, JkioskService, HigiKioskUserService, $http, $sce,  $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/challenges/challenge-get.html',
            link: function (scope) {
                scope.challengeGet = scope.challengeGet || new Object();
                scope.challengeGet.init = function(){
                    if(HigiKioskStorageService.returnSessionData('challengeAdTerms') != undefined){
                        scope.challengeGet.termsPath = HigiKioskStorageService.returnSessionData('challengeAdTerms').path;
                        //clear off terms watch
                        scope.challengeGet.termsWatch();
                    }
                    if(HigiKioskStorageService.returnSessionData('challengeModalAd') != undefined){
                        scope.challengeGet.challengeBanner = HigiKioskStorageService.returnSessionData('challengeModalAd').path;
                        scope.challengeGet.adWatch();
                    }
                };
                scope.challengeGet.adWatch = HigiKioskStorageService.watchSessionData('challengeModalAd', function(){
                    scope.challengeGet.init();
                });
                scope.challengeGet.termsWatch = HigiKioskStorageService.watchSessionData('challengeAdTerms', function(){
                    scope.challengeGet.init();
                });
            }
        }
    }]);



