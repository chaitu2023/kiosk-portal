higiKioskControllers.directive('accountCreatedChallenge', ['$rootScope','HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http', function( $rootScope, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService,HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/account-created-challenge.html',
        link :function(scope, elem, attrs){
            scope.challengePrompt = new Object();
            scope.challengePrompt.challengeIdWatch = function(newVal, oldVal){
                if(newVal){
                    if( HigiKioskStorageService.returnSessionData('challengeModalAd') != undefined){
                        scope.challengePrompt.challengeId = HigiKioskStorageService.returnSessionData('challengeModalAd').challengeId;
                    }
                }
            };
            HigiKioskStorageService.watchSessionData('logged_in',scope.challengePrompt.challengeIdWatch )
            scope.challengePrompt.title = "global.challenge.account.created.title"; //your account is ready
            scope.challengePrompt.subtitle = "global.challenge.account.created.subtitle"; //you're on your way
            scope.challengePrompt.joinButton = "global.join.challenge"; //join the challenge
            scope.challengePrompt.noThanksButton = "global.no.thanks.challenge"; //join the challenge
            scope.challengePrompt.yourName = "global.enter.your.name";


            scope.challengePrompt.editNameVisible = false;
            scope.challengePrompt.showEditName = function(){
                JkioskService.logEvent('challenge_JoinChallengeShowEnterName', 'button', 'pressed');
                scope.challengePrompt.editNameVisible = true;
            };
            scope.challengePrompt.skipChallengeJoin = function(){
                $rootScope.clearModal();
            };
        }

    };
}]);