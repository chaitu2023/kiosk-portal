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
        $scope.skipTestInFullTest = true;
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.slideTitle = 'spo2one.spo2';
        $scope.slideSubTitle = 'spo2two.in.progress';
        $scope.skipTest = 'spo2two.skip';

        $scope.animationtxt = "spo2 fetch animation";
        
    };

    $scope.stopSpo2Reading = function (response) {
        console.log("stopSpo2Reading rEsponse received");
        console.log(response);
    }


    $scope.skipTestClick = function(){
        // $rootScope.spO2RequestInitCall = false;
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_skipSpO2', 'button', 'pressed');
        $rootScope.spo2SkipBtn = true;
        // $scope.skipTestInFullTest = false;
        // $scope.movedToRegretCantFindFingerorSkipped=true;
        // JkioskService.callZugSpo2emergencyStopFunction($scope.stopSpo2Reading);
        $timeout(function(){
        if($rootScope.mode == "bpw"){
          var mode = "bpw";
          var currenttest = "SPo2";
          var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
          $scope.nextSlideText = "spo2three.continue";
          $scope.nextSlide = nextTestPath;
          window.location = $scope.nextSlide;
          } else if($rootScope.selectedVital.length > 1){
              var nextTestPath = HigiKioskFlow.UserSelectNextTest();
              $scope.nextSlide = nextTestPath; 
              if ($scope.nextSlide == "#/finish/forward") {
                  $scope.nextSlideText = "spo2three.finalResult";
              }else{
                  $scope.nextSlideText = "spo2three.continue";
              }  
              window.location = $scope.nextSlide;            
          } else{
              $scope.nextSlideText = "spo2three.finalResult";
              $scope.nextSlide = "#/finish/forward";
              window.location = $scope.nextSlide;
              
          }
        },500);      
      };

   
     $scope.init();
     

}]);

 