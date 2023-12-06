higiKioskControllers.controller('HigiKioskWeightController3' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskAnimationService' ,'HigiKioskUtilitiesService' , 'HigiKioskStorageService', 'HigiKioskFlow', 'JkioskService', '$timeout','HigiKioskVitalReference', function($scope, $routeParams, $rootScope, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiKioskFlow, JkioskService, $timeout,HigiKioskVitalReference){
    //weight03_audio01
    $scope.audioFiles = [
        {filename : 'weight03_audio01'},
        {filename : 'weight03_audio10'}
    ];

    $scope.showInfoboxWeight = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
        $rootScope.loadModal({id : 'infoboxweight'});
    };


    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $timeout(function(){window.location =  $scope.nextSlide},500);
    };
    $scope.redoWeight = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_redoWeightButton', 'button', 'pressed');
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $scope.pageClass = 'slide back';
        HigiKioskStorageService.saveSessionData('current_mode', 'w');
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };


    $scope.init = function(){

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskWeightController3', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskWeightController3', $scope);
        // age hard stop ////////////////////
        if(HigiKioskUtilitiesService.getAge(HigiKioskStorageService.returnSessionData('birthdate')) < 18){
            HigiKioskStorageService.saveSessionData('bmcSkipped' , true);
            //alert("$rootScope.selectedVital.length "+$rootScope.selectedVital.length);
            if($rootScope.mode == "bpw"){
                    var mode = "bpw";

                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    $scope.nextSlideText = "global.continue";
                    } else if($rootScope.selectedVital.length > 1){
                        //alert("weight controller else if");
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;   
                        if ($scope.nextSlide == "#/finish/forward") {
                            $scope.nextSlideText = "global.finalResult";
                        }else{
                            $scope.nextSlideText = "global.continue";
                        }              
                    } else { 
                        //alert("weight controller else");
                        $scope.nextSlide = "#/finish/forward";
                        $scope.nextSlideText = "global.finalResult";

                    }
            $scope.hardStop = true;
        } else {
         if($rootScope.hardwareAvailability['FullBodyCompositionAnalyser'] == true){
                var json = HigiKioskStorageService.returnSessionData('loginResp');
                if(json != undefined){
                    if((json.User.waistCircumference != undefined || json.User.waistCircumference != "") && (json.User.waistCircumference)){
                        HigiKioskStorageService.saveSessionData('waistcircumference',json.User.waistCircumference);
                        $scope.nextSlide = "#/fullbodybmc1/forward"; 
                    }
                else{
                    $scope.nextSlide = "#/onboarding5/forward";
                }
            }
            else{
                $scope.nextSlide = "#/onboarding5/forward";
            }
        }
        else{
            $scope.nextSlide = "#/weight4/forward";
        }
        if($rootScope.mode == "bpw"){
                    var mode = "bpw";

                var currenttest = "Weight Scale";
                if($rootScope.hardwareAvailability['FullBodyCompositionAnalyser'] == false){
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                }
                $scope.nextSlideText = "global.continue";
        }
        else if($rootScope.mode == "bmc"){
           $scope.nextSlideText = "global.continue";
        }
		else{
            /*alert("finish");
		    $scope.nextSlide = "#/finish/forward";
            $scope.nextSlideText = "global.finalResult";*/

            if($rootScope.mode == "bpw"){
                    var mode = "bpw";

                    var currenttest = "Body Composition";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    $scope.nextSlide = nextTestPath;
                    $scope.nextSlideText = "global.continue";
                    } else if($rootScope.selectedVital.length > 1){
                        //alert("weight controller else if");
                        var nextTestPath = HigiKioskFlow.UserSelectNextTest();
                        $scope.nextSlide = nextTestPath;   
                        if ($scope.nextSlide == "#/finish/forward") {
                            $scope.nextSlideText = "global.finalResult";
                        }else{
                            $scope.nextSlideText = "global.continue";
                        }              
                    } else { 
                        //alert("weight controller else");
                        $scope.nextSlide = "#/finish/forward";
                        $scope.nextSlideText = "global.finalResult";

                    }
		}
        //$scope.nextSlide = links.next.link;            
            $scope.hardStop = false;
        }


        $scope.redoSlide = links.previous.link;
        $scope.redoSlideText = links.previous.label;
        $scope.slideTitle = 'weight1.title';
        $scope.slideSubTitle = 'weight3.results';
        $scope.wbmiInformation = "weight3.information";
        $scope.wbmiParameter = "weight3.parameter";
        $scope.wbmiYourscore = "weight3.yourscore";
        $scope.wbmiOverallStatus = "weight3.OverallStatus";
        $scope.wbmiunderweight = "weight3.underweight";
        $scope.wbminormalweight = "weight3.normalweight";
        $scope.wbmioverweight = "weight3.overweight";
        $scope.wbmiobese = "weight3.obese";

        $scope.weightTitle = 'weight3.weight';
        $scope.heightTitle = 'weight3.height';
        $scope.bmiPTitle = "weight3.parameter.bmi.title";
        $scope.bodymassindex = "weight3.body.mass.index";
        $scope.bmiScale = "weight3.bmi.scale";
        $scope.checkwbmiAgain = "weight3.check.Again";

        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.buttonExitLeft = "button-exit-left";
        $scope.buttonEnterLeft = "button-enter-left";
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.redoTransitionStyle = 'button-enter-left';
        $scope.kgUnit = 'weight3.kgUnit';
        $scope.feetUnit = 'weight3.feetUnit';
        $scope.samplebmirisk = "";
        var height = HigiKioskUtilitiesService.convertToFeetFoot(HigiKioskStorageService.returnSessionData('height') || 1.7) + "'" + HigiKioskUtilitiesService.convertToFeetInches(HigiKioskStorageService.returnSessionData('height') || 1.7) + "\"";
        var SplitHeight = height.split("'");
        var chars = [];
        if(SplitHeight[0].length === 2){
        	chars = SplitHeight[0].split('');
        	$scope.height = chars[0]+"'"+ SplitHeight[1];
        } else if(SplitHeight[0].length === 3){
        	chars = SplitHeight[0].split('');
        	$scope.height = chars[0]+"'"+ SplitHeight[1];
        } else {
        	$scope.height = height;
        }       
        
        $scope.redoVisible = false;

        $scope.setSlideDirection($routeParams.direction);
        
        var kgweight=   Math.round((HigiKioskStorageService.returnSessionData('weight'))* 100) / 100;
		
        $scope.weight = typeof(HigiKioskStorageService.returnSessionData('weight')) != "undefined" ?  kgweight : "NA";
        //$scope.weight = typeof(HigiKioskStorageService.returnSessionData('weight')) != "undefined" ? Math.round(HigiKioskUtilitiesService.convertToPounds(parseFloat(HigiKioskStorageService.returnSessionData('weight')))) : "NA";
        $scope.bmi = HigiKioskUtilitiesService.calculateBmi(parseFloat(HigiKioskStorageService.returnSessionData('weight')),  HigiKioskStorageService.returnSessionData('height'), 2);
		$rootScope.bmiTemp = $scope.bmi;
        $scope.bmiRisk = HigiKioskVitalReference.calculateBMIRiskForUI($scope.bmi);
        $scope.bmiStatus = HigiKioskStorageService.saveSessionData('bmiStatus', $scope.bmiRisk);
		$rootScope.bmiRiskTemp=$scope.bmiRisk;
        

        if ($scope.bmiRisk == 'Low' ) {
            //$scope.bmiRiskClass = 'result_risk low';
            //$scope.bmiRisk = 'global.underweight';
            $scope.bmiRiskStatus = 'global.underweight';

        }
        else if ($scope.bmiRisk == 'Normal' ) {
            //$scope.bmiRiskClass = 'result_risk normal';
            //$scope.bmiRisk = 'global.normalweight';
            $scope.bmiRiskStatus = 'global.normalweight';

        }
        else if ($scope.bmiRisk == 'overweight' ) {
            //$scope.bmiRiskClass = 'result_risk atrisk';
           // $scope.bmiRisk = 'global.overweight';
            $scope.bmiRiskStatus = 'global.overweight';
        }
        else if ($scope.bmiRisk == 'High' ) {
            //$scope.bmiRiskClass = 'result_risk high';
            //$scope.bmiRisk = 'global.obese';
            $scope.bmiRiskStatus = 'global.obese';
        }
		

        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;
        $scope.promise
            .then(function(){
                $scope.showWeight = true;
                $timeout(function(){
                    $scope.showHeight = true;
                }, 750);
                $timeout(function(){
                    $scope.showBmi = true;
                }, 1500);
                $timeout(function(){
                    $scope.bmiIsObese = ($scope.bmiRisk == "obese") ? "bmi_scale_selected" : "";
                    $scope.bmiIsOverWeight = ($scope.bmiRisk == "overweight") ? "bmi_scale_selected" : "";
                    $scope.bmiIsNormal = ($scope.bmiRisk == "normal") ? "bmi_scale_selected" : "";
                    $scope.bmiIsUnderWeight = ($scope.bmiRisk == "underweight") ? "bmi_scale_selected" : "";
                    $scope.showWHeight = true;
                    $scope.nextVisible = true;
                    $scope.redoVisible = true;
                }, 2500);
                $timeout(function () {
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                 }, 2000);
            });

    };
    $scope.init();


}]);