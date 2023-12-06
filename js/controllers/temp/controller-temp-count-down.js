higiKioskControllers.controller('HigiKioskTempCountDownController' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService){


//    document.getElementById("splash_logo").style.display = "block";
    $scope.init = function(){
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskTempCountDownController', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskTempCountDownController', $scope);
        $scope.nextSlide = links.next.link;
        var timeleft = 3;
        var temperatureTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(temperatureTimer);
            $timeout(function(){window.location =  $scope.nextSlide},500);
        } else {
            document.getElementById("countDownTime").innerHTML = timeleft;
        }
            timeleft -= 1;
        }, 1000);
    };

    $scope.init();

}]);
