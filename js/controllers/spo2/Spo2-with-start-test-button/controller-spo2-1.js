higiKioskControllers.controller('HigiKioskspo2Controller1' , ['$scope', '$routeParams' , '$rootScope', '$location', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $location, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){
$scope.testcount = 0;

    $scope.handDetectTrue = false;
    $scope.fingerDetect = 0;
    var fingerDetectInterval = null;
    $rootScope.spo2SkipBtn = false;
    $rootScope.spO2RequestInitCall = true;
    $scope.regretIdentify = false;
$scope.movedToRegretCantFindFingerorSkipped=false;
    $scope.getPulseOximeterHandDetectKiosk = function(response) {

        if($scope.movedToResult==true){return;}
        if($rootScope.spo2SkipBtn == false){
            $scope.handDetectTrue = response.handDetectStatus; // boolean
            $rootScope.changingValue = response.changeValueStatus; //95,65...
        if($scope.movedToRegretCantFindFingerorSkipped==false){
            if($scope.handDetectTrue == true){
              if($scope.movedToResult == false && response.changeValueStatus > 69 && response.changeValueStatus < 101){
                  $timeout(function(){
                     window.location = $scope.nextSlide;
                  },1000);
                }
      }
            }
        }
    };
    //getPulseOximeterTimerTrigger
   /* $scope.getPulseOximeterFinalResultKiosk = function(response) {
        if($scope.spo2SkipBtn == false){
            $scope.oxygen = response.finalValueStatus;
            HigiKioskStorageService.saveSessionData("oxygen",  response.finalValueStatus);

            $timeout(function(){
                window.location = $scope.secondnext;
            },3000);
        }
    };
*/




/*
 //getPulseOximeterTimerTrigger
    $scope.getPulseOximeterFinalResultKiosk = function(response) {
        if($scope.spo2SkipBtn == false){
        if($scope.movedToRegretCantFindFingerorSkipped==false){
            $scope.oxygen = response.finalValueStatus;
          if ( $scope.oxygen < 90) {
               $('#spo2Hnot').show();
                $timeout(function() {
                    $('#spo2Hnot').hide();
                }, 2000);
                $scope.regretIdentify = true;

            JkioskService.getPulseOximeterHandDetect($scope.getPulseOximeterHandDetectKiosk, $scope.LiveValueReached, $scope.getPulseOximeterFinalResult2,$scope.spo2HandsNotDetectedCallBack);
          }else{

             HigiKioskStorageService.saveSessionData("oxygen",  response.finalValueStatus);

            $timeout(function(){
                window.location = $scope.secondnext;
            },1000);

          }   
    }
        }
    };



*/





$scope.getPulseOximeterFinalResultKiosk = function(response) {
              if($scope.movedToResult == true){ 
              //alert("value of moved to result in getPulseOximeterFinalResultKiosk   "+ $scope.movedToResult );
              return;}

        if($rootScope.spo2SkipBtn == false){
                if($scope.movedToRegretCantFindFingerorSkipped==false){
            $scope.oxygen = response.finalValueStatus;
           // alert("Final Result   "+$scope.oxygen);
          if ( $scope.oxygen < 60) {
             //  alert("Result is less tha 90 first time");
               $('#spo2Hnot').show();
                $timeout(function() {
                    $('#spo2Hnot').hide();
                    $rootScope.spo2SomethingCount++;
                    $scope.init();
                }, 2000);
                //$scope.regretIdentify = true;
            if($scope.testcount == 0){
                $scope.testcount++;
              //  alert("Calling getPulseOximeterHandDetect once more with testcount increased");
          $scope.movedToResult = false;
          window.location = "#/spotwo1/back";

           // JkioskService.getPulseOximeterHandDetect($scope.getPulseOximeterHandDetectKiosk, $scope.LiveValueReached, $scope.getPulseOximeterFinalResultKiosk,$scope.spo2HandsNotDetectedCallBack);
            }
            else{
               // alert("Testcount > 0");
              

             setTimeout(function() {
                  $scope.movedToResult = true;
                      HigiKioskStorageService.saveSessionData("oxygen",  response.finalValueStatus);
         
                window.location = $scope.secondnext; 
            }, 0);     
           
           }
          }else{
           //  alert("Else of Result is less tha 90 first time");
           
            $timeout(function(){
                  $scope.movedToResult = true;
                     HigiKioskStorageService.saveSessionData("oxygen",  response.finalValueStatus);

                window.location = $scope.secondnext;
            },0);

          }   
        }
        }
    };


    $scope.LiveValueReached = function(response){
          if($scope.movedToResult == true){
           //alert("value of moved to result in LiveValueReached   "+ $scope.movedToResult );
           return;}
    
      HigiKioskStorageService.saveSessionData("spo2LiveValue",  response.LiveValueStatus);
        $scope.$apply();

      var spo2OxygenLevelResultDisplay = document.getElementById("spo2OxygenLevelResultDisplay");
        if(spo2OxygenLevelResultDisplay != null && spo2OxygenLevelResultDisplay != undefined){
          spo2OxygenLevelResultDisplay.innerHTML = response.LiveValueStatus;
        }
        console.log(HigiKioskStorageService.returnSessionData("spo2LiveValue"));
      console.log(JSON.stringify(response));
    }

  $scope.spo2HandsNotDetectedCallBack = function(response){
       /* alert("Hands not detected callback");
        alert("Hand Detect status   "+response.handDetecteStatus+ "response.occurredLocation   "+response.occurredLocation);
        alert("Skip Status   "+$scope.spo2SkipBtn);
        alert("$scope.movedToRegretCantFindFingerorSkipped status    "+$scope.movedToRegretCantFindFingerorSkipped);
        alert("$scope.fingerDetect   "+$scope.fingerDetect);
       */
        if($scope.movedToResult == true){ 
          //  alert("value of moved to result"+ $scope.movedToResult );
            return;}
            if($rootScope.spo2SkipBtn == false && $rootScope.spo2SomethingCount >2){
              $rootScope.spO2RequestInitCall = false;
              $rootScope.spo2SomethingCount = 0;
               $('#spo2Regret').show();
                        $scope.movedToRegretCantFindFingerorSkipped=true;
                    $scope.regretIdentify = true;                  
                    $timeout(function() {
                        $('#spo2Regret').hide();
                        if($scope.mode == "bpw"){
                          $scope.movedToResult = true;
                         //   $scope.movedToResult = true;
                            window.location = "#/temp1/forword";
                        } else {
                             $scope.movedToResult = true;
                         //   $scope.movedToResult = true;test
                            window.location = "#/finish/forword";
                        }
                    }, 3000);
            }
            else{
    console.log("inside spo2HandsNotDetectedCallBack fn");
    console.log(JSON.stringify(response));
                        $scope.fingerDetect++;
    if(response.handDetecteStatus == false && $rootScope.spo2SkipBtn == false && $scope.movedToRegretCantFindFingerorSkipped==false){
               // alert("Cleared all false statements");
            if(response.occurredLocation != "terminate"){
               // alert("No terminate received");
           if($scope.fingerDetect < 2 ){
                    $scope.movedToResult = false;
          var absUrl = $location.absUrl();
          var url = absUrl.split("#");

          if(url[1] == "/spotwo2/forward"){
                         
            window.location = "#/spotwo1/back";

          }

            $('#spo2Hnot').show();
                $timeout(function() {
                  $('#spo2Hnot').hide();
                  $rootScope.spo2SomethingCount++;
                $scope.init();
          }, 3000);

        
        } else {
              //  alert("fingerDetect Terminate");
                    $('#spo2Regret').show();
                        $scope.movedToRegretCantFindFingerorSkipped=true;
                    $scope.regretIdentify = true;                  
                    $timeout(function() {
                        $('#spo2Regret').hide();
                        if($scope.mode == "bpw"){
                         //   $scope.movedToResult = true;
                            $scope.movedToResult = true;
                             window.location = "#/temp1/forword";
                        } else {
                         //   $scope.movedToResult = true;test
                            $scope.movedToResult = true;
                             window.location = "#/finish/forword";
                        }
                    }, 3000);
                }
            }
            else {
               // $scope.movedToResult = true;
              //  alert("Terminate Received");
            $('#spo2Regret').show();
        $scope.regretIdentify = true;
              $timeout(function() {
                $('#spo2Regret').hide();
                    if($scope.mode == "bpw"){
                         $scope.movedToResult = true;
                        window.location = "#/temp1/forword";
                    } else {
                         $scope.movedToResult = true;
                         window.location = "#/finish/forword";
                    }
              }, 0);
      }

           
    }
  }
  }

    $scope.getPulseOximeterHandDetect = function() {

        if($rootScope.spO2RequestInitCall && $scope.movedToResult == false && $rootScope.spo2SkipBtn == false) {
            $scope.fingerDetect= 0;
            $scope.regretIdentify = false;
            $scope.movedToResult = false;
            JkioskService.getPulseOximeterHandDetect($scope.getPulseOximeterHandDetectKiosk, $scope.LiveValueReached, $scope.getPulseOximeterFinalResultKiosk, $scope.spo2HandsNotDetectedCallBack);
        }
    };

    $scope.init = function(){

      // return 0;

 setTimeout(function() {
      $("#ecgTestSkippedMessage").hide();
    }, 3000);
    $scope.testcount = 0;

    $scope.handDetectTrue = false;
    $scope.fingerDetect = 0;
    var fingerDetectInterval = null;
    $rootScope.spo2SkipBtn = false;
    $rootScope.spO2RequestInitCall = true;
    $scope.regretIdentify = false;

        // user redo the test again false the before check the moveToResult flag start by deepak
        if($rootScope.spO2RequestInitCall) {
          $scope.movedToResult = false; 
        }
        // user redo the test again false the before check the moveToResult flag end by deepak

        // If the test is completed and move to local reslt page restricted the init call start by deepak
        if($scope.movedToResult == true){ 
          return;
        }
        // If the test is completed and move to local reslt page restricted the init call end by deepak
      $rootScope.showECGEmergencyStopButton = false;
      $rootScope.showExitButton = false;
      
      $scope.insertfinger = "spo2one.insertfinger";
      $scope.fingerinplace = "spo2one.fingerinplace";
      $scope.instruct = "spo2one.instruct";
      $scope.startTest = "spo2one.startTest";
$scope.movedToResult = false;
    $scope.audioFiles=[
           {filename : 'spotwo1_audio01'},
           {filename : 'spotwo1_audio02'}
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


      $timeout(function(){
        $scope.nextVisible = true;
      }, 3000);
      $scope.handDetectTrue = false;
      // HigiKioskStorageService.saveSessionData("oxygen",undefined);
        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.setSlideDirection($routeParams.direction);

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller1', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskspo2Controller1', $scope);

        $scope.getPulseOximeterHandDetect();

        //if bpw, set skip test button visible
        $scope.isBpw = ($scope.mode == "bpw") ? true : false;
        //$scope.skipTestInFullTest = ($scope.mode == "bpw") ? true : false;
        $scope.skipTestInFullTest = true;
      $scope.skipTest = "spo2one.skip";

       $scope.nextSlide = links.next.link;
       $scope.secondnext = links.secondnext.link;
       $scope.nextSlideText = links.next.label;

        $scope.slideTitle = "spo2one.spo2";
        $scope.slideSubTitle = "text.instructions";
        $scope.spo2Fingerprobably = "spo2one.placeYourFingerProbably";
        $scope.continue = true;

          $scope.pReject = function(code){
            console.log(code + " reject fired")
        };
    };


    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        JkioskService.getPulseOximeterHandDetect($scope.getPulseOximeterHandDetectKiosk, $scope.LiveValueReached, $scope.getPulseOximeterFinalResultKiosk, $scope.spo2HandsNotDetectedCallBack);
        $scope.nextVisible = false;
        $scope.skipTestInFullTest = false;
    };


    $scope.stopSpo2Reading = function (response) {
      console.log("stopSpo2Reading rEsponse received");
      console.log(response);
    }
    
    //To skip current test while doing complete Test
    $scope.skipTestClick = function(){
      $rootScope.spO2RequestInitCall = false;
      JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_skipSpO2', 'button', 'pressed');
      $rootScope.spo2SkipBtn = true;
      $scope.movedToRegretCantFindFingerorSkipped=true;
      JkioskService.callZugSpo2emergencyStopFunction($scope.stopSpo2Reading);
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
      },3000);      
    };


    $scope.setAnimations = function(){

     $timeout(function(){
      // sprite image functionality perfectly working on latest chrome browser.
       /* $('#spo2InstructionAnimation').css("opacity", "1");
        $('#spo2InstructionAnimation').delay(50)//we don't want to use a timeout, so we use a delay
            .animate({'backgroundPosition':'left top'}, 1, function () { //a dummy function to "restart" the animation at first frame AND have a callback where we set the sprite
                $('#spo2InstructionAnimation').sprite({ //sets the sprite and animates it immediately
                    fps:24,
                    no_of_frames:115,
                    start_at_frame:0,
                    play_frames:115
                });
            })
            .delay(0)//a delay to wait until the sprite animation is completed. this number needs to be equal to how long the sprite animates
            .animate({'backgroundPosition':'right top'}, 4090, function () { //a dummy function to house the callback, but also to make sure the animation is at the last frame
                //q.resolve();
                $('#spo2InstructionAnimation').destroy(); //you MUST destroy the sprite if you want it to play again
        }); */

    },3000);

    $scope.init();
    };

     $scope.setAnimations();

     // On press of Repeat Animation button in spotwo1.html
     $scope.repeatAnimation = function(){
       console.log('Animation repeated');
       let image_url = $('#spo2InstructionAnimationGif').css('background-image');
       $('#spo2InstructionAnimationGif').css('background-image', image_url);
     }

}]);
