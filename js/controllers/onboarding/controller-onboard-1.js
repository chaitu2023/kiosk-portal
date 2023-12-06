higiKioskControllers.controller('HigiKioskOnboardingController1', ['$scope', '$routeParams', '$rootScope' , 'HigiKioskFlow', 'HigiKioskStorageService', 'HigiKioskAnimationService', '$timeout', 'JkioskService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, HigiKioskStorageService, HigiKioskAnimationService, $timeout, JkioskService) {
	
    $scope.init = function () {
        //Only setup watch on first way through
        $scope.directiveClickable = true;
        if($routeParams.editMode == "enter"){
            $scope.autoPlayNextSlideWatch = $scope.$watch('nextVisible', function(newVal, oldVal){
                if($scope.nextVisible){
                    $scope.autoPlayNextSlide = $timeout(function(){
                            if(!$scope.finishingOnboarding){
                                HigiKioskAnimationService.audioStop();
                                $scope.nextButtonOut();
                            } else {
                                $scope.editMode = true;
                            }
                    }, 500);
                }
            });
        };

        $scope.setSlideDirection($routeParams.direction);
        $scope.finishingOnboarding = false;
        $scope.slideTitle = "global.about.you";
        $scope.nextVisible = false;
        $scope.nextTransitionStyle = 'button-enter-right';
        // $scope.currentOfTotal = $scope.mode == "w" ? 'onboarding.1.of.3' : 'onboarding.1.of.2';
        $scope.currentOfTotal = 'onboarding.1.of.3';
        $scope.isMaleClass = "";
        $scope.isFemaleClass = "";
        $scope.slideSubTitle = "gender01.guy.or.gal";
        $scope.audioFiles = [
            {id: 'global.welcomeback', filename: 'global.welcomeback', delay: 200, callback: $scope.callback1},
            {id: 'gender01_audio01', filename: 'gender01_audio01', delay: 0, callback: $scope.callback1}
        ];
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController1', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController1', $scope);
       
        console.log(links);

        $scope.isvisible = true;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        if (links.previous == null) {
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = true;
        }

        //Only play welcome once
        if($routeParams.editMode != "edit"){
            $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope).promise;
            //$scope.promise
               // .then(function(){return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope).promise;});
        } else {
            $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope).promise;
            $scope.promise
                .then(function(){
                    $scope.editMode = true;
                })
        }
    };

    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.directiveClickable = false;
        $scope.setSlideDirection('forward');
        $scope.nextVisible = false;
        $timeout.cancel($scope.autoPlayNextSlide);
        if($routeParams.editMode == "enter"){
            $scope.autoPlayNextSlideWatch();
        }
        $scope.pageClass = 'slide forward';
        $scope.nextTransitionStyle = '';
        $timeout(function(){
            window.location = $scope.nextSlide;
        }, 100)
    };

    $scope.init();

}]);