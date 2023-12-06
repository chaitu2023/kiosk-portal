higiKioskControllers.controller('HigiKioskspo2Controller2' , ['$scope', '$routeParams' , '$rootScope', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){
   

    $scope.init = function(){

    if($rootScope.spo2SkipBtn == true){
      return;
    }


        
    $scope.audioFiles=[
           {filename : 'spotwo2_audio03'},
           {filename : 'spotwo2_audio04'}
     ];

         console.log("audio is there");
        $scope.slideIntructionOne = 'bloodpressure01.instruction01';
        $scope.slideIntructionTwo = 'bloodpressure01.instruction02';
        
  //Audio Instructions as promises
        $scope.audioInstruction1 = function(){
         
           console.log("the file name isnide audio instruction 1 is"+ $scope.audioFiles[0].filename);
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        };
        $scope.audioInstruction2 = function(){
            return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
        };
  
       $scope.audioInstruction = function(audio){
            if($scope.continue) {
                var promiseAudio = HigiKioskAnimationService.playAudioPromise(audio, $scope);
                return promiseAudio.promise;
            }
        };

       
         $scope.continue = true;
        $scope.q =  $scope.audioInstruction1();
        $scope.q.promise
            .then(function(){
// this point of time audio instruction 1 is complete
                console.log("audio played sucessfylly and thgen function is called"); 
                 $timeout(function() {
                $scope.audioInstruction($scope.interfaceLabels[$scope.audioFiles[1].filename])
                   
                }, 3000);               


                return 
                // sudio instruction 2 is started 

            });

        $rootScope.spO2RequestInitCall = false;
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller2', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller2', $scope);
        $scope.nextSlide = links.next.link;
        $scope.nextSlideText = links.next.label;
        $scope.nextVisible = false;
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.slideTitle = 'spo2one.spo2';
        $scope.slideSubTitle = 'spo2two.in.progress';

        $scope.animationtxt = "spo2 fetch animation";
        
    };

   
     $scope.init();
     

}]);

 