
higiKioskControllers.controller('HigiKioskOnboardingController5', ['$scope', '$routeParams', '$rootScope' , '$http', 'HigiKioskFlow', 'HigiKioskAnimationService', '$q', '$timeout', 'HigiKioskStorageService', 'HigiKioskUserService', 'JkioskService', 'HigiApiService', function ($scope, $routeParams, $rootScope, $http,  HigiKioskFlow, HigiKioskAnimationService, $q, $timeout, HigiKioskStorageService, HigiKioskUserService, JkioskService, HigiApiService) {

    $scope.init = function () {
        
        $scope.directiveClickable = true;
        $rootScope.higiTopNavHidden = true;
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.slideSubTitle = "onboarding.5.tittle";
        $scope.currentOfTotal = 'onboarding.5.subtitle';
        $scope.inputErr = 'onboarding.5.inputErr';
        $scope.inputErr2 = 'onboarding.5.inputErr2';
        $scope.buttonEnterRight = 'button-enter-right';
        $scope.buttonExitRight = 'button-exit-right';
        $scope.buttonEnterLeft = 'button-enter-left';
        $scope.buttonExitLeft = 'button-exit-left';
        $scope.audioFiles = [
            {filename: 'waist_audio'}
        ];
        console.log("starts here");
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode') 
        var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController2',$scope.mode);
        console.log(links);
        $scope.isvisible = true;
        if($rootScope.mode == "bpw"){
        var mode = "bpw";
        var currenttest;
        $scope.nextSlide = HigiKioskFlow.nextTest(mode,currenttest);
        }
        else{
            $scope.nextSlide = links.next.link;
        }
        $scope.nextSlideText = "global.startYourTest";
        if (links.previous == null) {
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
        }
        $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        $scope.q.promise.
        then(function(){
                $scope.prevIsVisible = (links.previous != null);
        });
    };
    $scope.saveUserInfo = function(){
        if(HigiKioskStorageService.returnSessionData('user') != undefined){
            var user = HigiKioskStorageService.returnSessionData('user');
            var userUpdate = HigiKioskUserService.compareUser(user, HigiKioskStorageService.returnSessionData);
            if(HigiKioskStorageService.returnSessionData('logged_in') && userUpdate != null){
                JkioskService.registerKiosk();
                HigiApiService.UpdateUserAsync(user.id, userUpdate,
                    function () {
                        console.log('saving user data after onboard exit');
                    },
                    function () {
                        console.log('failed saving user data after onboard exit');
                    });
            }
        }
    };
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.saveUserInfo();
        $scope.directiveClickable = false;
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide forward';
        $timeout(function(){
        window.location = "#/fullbodybmc1/forward";

        }, 500)

    };
    $scope.backButtonOut = function(){
    	JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_backButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide back';
        HigiKioskStorageService.saveSessionData('waistcircumference',undefined);
        $rootScope.isWaistCircumference = false;
        $timeout(function(){
        window.location = "#/fullbodybmc1/forward";
        }, 500)
    };
    $scope.init();
}]);