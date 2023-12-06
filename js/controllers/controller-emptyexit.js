higiKioskControllers.controller('HigiKioskEmptyExitController', ['$timeout', '$scope' , '$rootScope', 'HigiKioskFlow', 'HigiKioskAnimationService', 'JkioskService', function($timeout , $scope, $rootScope, HigiKioskFlow, HigiKioskAnimationService, JkioskService) {
    //Cancel standup timeout on exit screen.
    $rootScope.stopSessionTimeout();
    $rootScope.bodyHide = false;

    $timeout(function(){
        window.location = "index.html";
    }, 1000);
}]);