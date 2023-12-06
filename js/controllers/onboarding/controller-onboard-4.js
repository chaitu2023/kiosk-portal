higiKioskControllers.controller('HigiKioskOnboardingController4', ['$scope', '$routeParams', '$rootScope' , 'HigiKioskFlow', 'HigiKioskAnimationService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'JkioskService', '$timeout', 'HigiApiService', 'HigiKioskUserService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskStorageService, JkioskService, $timeout, HigiApiService, HigiKioskUserService) {
    $scope.init = function () {
        $scope.slideTitle = "global.about.you";
        $scope.slideSubTitle = "aboutyou01.sound.like.you";
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.nextVisible = true;
        $scope.sexLabel = "aboutyou01.sex";
        $scope.heightLabel = "aboutyou01.height";
        $scope.ageLabel = "aboutyou01.age";

        $scope.gender = (HigiKioskStorageService.returnSessionData('gender') == 'm') ? 'welcomeModals.printmalegender' : 'welcomeModals.printfemalegender';
        $scope.height = HigiKioskUtilitiesService.convertToFeetFoot(HigiKioskStorageService.returnSessionData('height')) + "&#146;" + HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height')) + "&#148;";
        $scope.age = HigiKioskUtilitiesService.getAge(HigiKioskStorageService.returnSessionData('birthdate'));

        $scope.editGender = function(){
            JkioskService.logEvent('aboutyou01_genderButton', 'button', 'pressed');
            $scope.pageClass = 'slide back';
            $timeout(function(){window.location = "#/onboarding1/back/edit"},100);

        };
        $scope.editHeight = function(){
            JkioskService.logEvent('aboutyou01_genderButton', 'button', 'pressed');
            $scope.pageClass = 'slide back';
            $timeout(function(){window.location = "#/onboarding2/back/edit";},100);
        };
        $scope.editAge = function(){
            JkioskService.logEvent('aboutyou01_genderButton', 'button', 'pressed');
            $scope.pageClass = 'slide back';
            $timeout(function(){window.location = "#/onboarding3/back/edit";},100);
        };

        $rootScope.isVisibleLogo = false;
        $scope.setSlideDirection($routeParams.direction);
        $scope.audioFiles = [
            {id: 'aboutyou01_audio01', filename: 'aboutyou01_audio01', delay: 2000, callback: $scope.callback1}
        ];

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController4', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController4', $scope);
        $scope.isvisible = true;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.hasHeight = true;

        if (links.previous == null) {
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = true;
        }
        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
    };

    $scope.coppaFail = function(){

        //Prevent audio from playing after coppa fail
        $scope.audio.mute = true;
        exitSessionInProgress = true;
        currentlyPlayingMedia = null;
        JkioskService.endSession();

        //Failsafe to prevent UI hanging if kiosk loses connectivity
        $scope.coppaFailCallbackTimer = $timeout(function(){
            window.location = 'index.html'
        }, 17000);


        mode = new Object();
        mode.modalAuthDialogTitle = "welcomeModals.coppa";
        mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
        mode.modalAuthDialogContent = "";
        mode.modalAuthDialogIconClass = "auth_dialog_failure";
        mode.loggedin = false;
        mode.timer = 7000;
        mode.callback = function(){
            if (HigiKioskStorageService.returnSessionData('logged_in')) {
                HigiApiService.DeleteAccountAge13Async(HigiKioskStorageService.returnSessionData('user').id, HigiKioskStorageService.returnSessionData('birthdate'));
            } else {
                window.location = "index.html";
            }
        };
        //Hide slide UI and navigation
        $scope.coppFailHide = true;
        $rootScope.higiTopNavHidden = false;
        $rootScope.slideInNav = "slideOut";

        $rootScope.authDisplay(mode);
    };

    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.nextVisible = false;
        if(HigiKioskUtilitiesService.getAge(HigiKioskStorageService.returnSessionData('birthdate')) < 13){
            $scope.coppaFail();
        }else {

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

            $scope.nextTransitionStyle = 'button-exit-right';

            window.location = $scope.nextSlide;
        }
    };
    $scope.init();
}]);