higiKioskControllers.controller('flipkartPlusInstructionController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService){

    $scope.slideTitle = 'flipkart.title';
    $scope.instruction = 'flipkart.instruction';
    
    $scope.init = function() {
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('flipkartPlusInstructionController', $scope.mode);
        $scope.slideTitle = 'flipkart.title';
        $scope.instruction = 'flipkart.instruction';
        $scope.backText = 'flipkart.backText';
        $scope.continueText = 'flipkart.continueText';

        $scope.isvisible = true;
        $scope.nextVisible = true;
        $scope.prevIsVisible = true;
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        if(links.previous == null){
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        }else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = true;
        }
        $scope.continue = true;
    };

    $scope.nextButtonOut = function() {
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $rootScope.enableCamera = true;
        $rootScope.loadModal({id: 'flipKartQRCodeScanner'});
    };

    $scope.backButtonOut = function() {
        $timeout(function(){
            window.location = '#/welcome';
        },500);
    }
}]);
