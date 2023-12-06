higiKioskControllers.controller('HigiKioskOnboardingController3', ['$scope', '$routeParams', '$rootScope' , 'HigiKioskFlow', 'HigiKioskStorageService', 'HigiKioskAnimationService', 'HigiKioskUtilitiesService', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskUserService', '$location', '$window', function ($scope, $routeParams, $rootScope, HigiKioskFlow, HigiKioskStorageService, HigiKioskAnimationService, HigiKioskUtilitiesService, $timeout, HigiApiService, JkioskService, HigiKioskUserService, $location, $window) {

    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.directiveClickable = false;
        $scope.setSlideDirection('forward');
        $scope.pageClass = 'slide forward';
        HigiKioskStorageService.saveSessionData("birthdate", $scope.dateSubmitted);
        $scope.nextTransitionStyle = 'button-exit-right';
        $scope.redoTransitionStyle = 'button-exit-left';
        $scope.nextVisible = false;
        HigiKioskAnimationService.audioStop();
        console.log("user input birthdate"+HigiKioskStorageService.returnSessionData('birthdate'));
            if(HigiKioskUtilitiesService.getAge(HigiKioskStorageService.returnSessionData('birthdate')) < 13){
                $scope.coppaFail();
            }
            else {
                HigiKioskStorageService.saveSessionData("birthdate", $scope.dateSubmitted);
                //If bp only, try to save data. Other modes will try to save data after height is entered.
                if($scope.mode == "bp"){
                    $scope.saveUserInfo();
                }
                $timeout(function(){
                    window.location = $scope.nextSlide;
                }, 500);
            }
     };
     
    $scope.backButtonOut = function(){
    	JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_backButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide back';
        $scope.nextTransitionStyle = 'button-exit-right';
        $scope.redoTransitionStyle = 'button-exit-left';
        $timeout(function(){
            window.location = $scope.prevSlide;
        }, 500)
    };

    $scope.saveUserInfo = function(){
        if(HigiKioskStorageService.returnSessionData('user') != undefined){
            var user = HigiKioskStorageService.returnSessionData('user');
            var userUpdate = HigiKioskUserService.compareUser(user, HigiKioskStorageService.returnSessionData);
            //Update user if logged in and data has changed
            if(HigiKioskStorageService.returnSessionData('logged_in') && userUpdate != null){
                JkioskService.registerKiosk();
                //HigiApiService.UpdateUserAsync(user.id, userUpdate,
                //    function () {
                //        console.log('saving user data after onboard exit');
                //    },
                //    function () {
                //        console.log('failed saving user data after onboard exit');
                //    });
                 HigiApiService.MemoryQueueUpdateUserAsync(user.id, userUpdate,
                 function () {
                        console.log('saving user data after onboard exit');
                    },
                 function () {
                        console.log('failed saving user data after onboard exit');
                    }
                 );

            }
        }
    };

    $scope.coppaFail = function(){
        //Hide slide UI and navigation
        $scope.coppFailHide = true;
        $rootScope.higiTopNavHidden = true;
        $rootScope.slideInNav = "slideOut";


        //Prevent audio from playing after coppa fail
        //$scope.audio.mute = true;
        HigiKioskAnimationService.audioStop();
        exitSessionInProgress = true;
        currentlyPlayingMedia = null;
        JkioskService.endSession();

        //Failsafe to prevent UI hanging if kiosk loses connectivity
        $scope.coppaFailCallbackTimer = $timeout(function(){
            $rootScope.bodyHide = true;
            window.location = 'index.html'
        }, 17000);

        mode = new Object();
        mode.modalAuthDialogTitle = "welcomeModals.coppa";
        mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
        mode.modalAuthDialogContent = "";
        mode.modalAuthDialogIconClass = "auth_dialog_failure";
        mode.loggedin = false;
        mode.timer = 4000;
        mode.callback = function(){
            //$rootScope.bodyHide = true;
            if (HigiKioskStorageService.returnSessionData('logged_in')) {
                HigiApiService.DeleteAccountAge13Async(HigiKioskStorageService.returnSessionData('user').id, HigiKioskStorageService.returnSessionData('birthdate'));
            } else {
               $location.path('/emptyexit');
            }
        };
        $rootScope.authDisplay(mode);
    };

    $scope.init = function () {
        $scope.nextVisible = false;
        $scope.directiveClickable = true;
        $scope.setSlideDirection($routeParams.direction);
        $scope.slideTitle = "global.about.you";
        $scope.slideSubTitle = "age01.how.young";
        // $scope.currentOfTotal = $scope.mode == "w" ? 'onboarding.2.of.3' : 'onboarding.2.of.2';
        $scope.currentOfTotal = 'onboarding.2.of.3';
        $scope.redoTransitionStyle = 'button-enter-left';
        $scope.audioFiles = [
            {filename: 'age01_audio01'}
        ];

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController3', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController3', $scope);
        $scope.isvisible = true;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.nextTransitionStyle = 'button-enter-right';
        if (links.previous == null) {
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
        }


        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        $scope.promise.promise.
            then(function(){
                $scope.prevIsVisible = (links.previous != null);
                $scope.validateAge();
            })

    };

    $scope.init();
}]);