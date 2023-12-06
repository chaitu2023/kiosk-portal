higiKioskControllers.controller('HigiKioskWeightController5' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskAnimationService' ,'HigiKioskUtilitiesService' , 'HigiKioskStorageService', 'HigiKioskFlow', '$timeout', 'JkioskService', function($scope, $routeParams, $rootScope, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiKioskFlow, $timeout, JkioskService){
	
//    document.getElementById("splash_logo").style.display = "block";
	$scope.showInfoboxWeightBodyMassComp = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
        $rootScope.loadModal({id : 'infoboxweightbodymasscomp'});
    };

    $scope.redoBmc = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_redoButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.redoVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide back';
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        if($rootScope.fullBodyBMCTest == true){
            if (document.getElementById("fatAnalysis").style.display == "block") {
                document.getElementById("fatAnls").classList.remove("childs_active");
                document.getElementById("fatAnls").parentNode.classList.remove("parent_active");
                document.getElementById("massAnls").classList.add("childs_active");
                document.getElementById("massAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "none";
                document.getElementById("waterAnalysis").style.display = "none";
                document.getElementById("miscellaneous").style.display = "none";
                document.getElementById("massAnalysis").style.display = "block";
                $scope.prevSlideText = "global.previousPageText";
                $scope.nextSlideText = "global.nextPageText";
                $scope.prevIsVisible = true;
                $scope.nextVisible = true;
                $scope.redoVisible = true; 
                $("#massAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});
                $("#fatAnls").css({"border-right" : "2px solid transparent"});
                $("#massAnls").css({"border" : "none"});
                $("#waterAnls").css({"border-right" : " 2px solid #999999cf"});
                $("#mislAnls").css({"border" : "none"});
            }else if(document.getElementById("massAnalysis").style.display == "block"){
                document.getElementById("massAnls").classList.remove("childs_active");
                document.getElementById("massAnls").parentNode.classList.remove("parent_active");
                document.getElementById("waterAnls").classList.add("childs_active");
                document.getElementById("waterAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "none";
                document.getElementById("massAnalysis").style.display = "none";
                document.getElementById("miscellaneous").style.display = "none";
                document.getElementById("waterAnalysis").style.display = "block";
                $scope.prevSlideText = "global.previousPageText";
                $scope.nextSlideText = "global.nextPageText";
                $scope.prevIsVisible = true;
                $scope.nextVisible = true;
                $scope.redoVisible = true;
                $("#waterAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});

                $("#fatAnls").css({"border-right" : "2px solid #999999cf"});
                $("#massAnls").css({"border-right" : " 2px solid transparent"});
                $("#waterAnls").css({"border" : "none"});
                $("#mislAnls").css({"border" : "none"});
            }else if(document.getElementById("waterAnalysis").style.display == "block"){
                document.getElementById("waterAnls").classList.remove("childs_active");
                document.getElementById("waterAnls").parentNode.classList.remove("parent_active");
                document.getElementById("mislAnls").classList.add("childs_active");
                document.getElementById("mislAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "none";
                document.getElementById("massAnalysis").style.display = "none";
                document.getElementById("waterAnalysis").style.display = "none";
                document.getElementById("miscellaneous").style.display = "block";
                $scope.prevSlideText = "global.previousPageText";
                if($rootScope.mode == "bpw"){
                    $scope.nextSlideText = "global.continue";
                } else if($rootScope.selectedVital.length > 1){
                    if ($scope.nextSlide == "#/finish/forward") {
                        $scope.nextSlideText = "global.finalResult";
                    }else{
                        $scope.nextSlideText = "global.continue";
                    }    
                }else{
                    $scope.nextSlideText = "global.finalResult";
                }
                //$scope.nextSlideText = "global.continue";
                $scope.prevIsVisible = true;
                $scope.nextVisible = true;
                $scope.redoVisible = true;
                $("#miscellaneous").css({"borderTopLeftRadius": "10px", "width": "738px" , "margin-left": "19px"});
                
                $("#fatAnls").css({"border-right" : "2px solid #999999cf"});
                $("#massAnls").css({"border-right" : "2px solid #999999cf"});
                $("#waterAnls").css({"border-right" : " 2px solid transparent"});
                $("#mislAnls").css({"border" : "none"});
            }else if(document.getElementById("miscellaneous").style.display == "block"){
                // document.getElementById("mislAnls").className.replace(" active", "");
                // document.getElementById("mislAnls").parentNode.className.replace(" parent_active", "");
                // document.getElementById("waterAnls").className += " active";
                // document.getElementById("waterAnls").parentNode.className += " parent_active";

                // document.getElementById("fatAnalysis").style.display = "none";
                // document.getElementById("massAnalysis").style.display = "none";
                // document.getElementById("waterAnalysis").style.display = "none";
                // document.getElementById("miscellaneous").style.display = "none";
                $scope.nextVisible = false;
                $scope.redoVisible = false;
                $scope.prevIsVisible = false;
                $timeout(function(){window.location =  $scope.nextSlide},500);
            }
            HigiKioskAnimationService.audioStop();
        }else if ($rootScope.fullBodyBMCTest == false) {
            $scope.nextVisible = false;
            $scope.redoVisible = false;
            $scope.prevIsVisible = false;
            $timeout(function(){window.location =  $scope.nextSlide},500);
            HigiKioskAnimationService.audioStop();
        } 
    };

    $scope.backButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_backButton', 'button', 'pressed');
        if($rootScope.fullBodyBMCTest == true){
            $scope.nextVisible = false;
            $scope.redoVisible = false;
            $scope.prevIsVisible = false;
            if(document.getElementById("miscellaneous").style.display == "block"){
                document.getElementById("mislAnls").classList.remove("childs_active");
                document.getElementById("mislAnls").parentNode.classList.remove("parent_active");
                document.getElementById("waterAnls").classList.add("childs_active");
                document.getElementById("waterAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "none";
                document.getElementById("massAnalysis").style.display = "none";
                document.getElementById("waterAnalysis").style.display = "block";
                document.getElementById("miscellaneous").style.display = "none";
                $scope.prevSlideText = "global.previousPageText";
                $scope.nextSlideText = "global.nextPageText";
                $scope.prevIsVisible = true;
                $scope.nextVisible = true;
                $scope.redoVisible = true;
                $("#waterAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});
               

                $("#fatAnls").css({"border-right" : "2px solid #999999cf"});
                $("#massAnls").css({"border-right" : " 2px solid transparent"});
                $("#waterAnls").css({"border" : "none"});
                $("#mislAnls").css({"border" : "none"});
            }else if(document.getElementById("waterAnalysis").style.display == "block"){
                document.getElementById("waterAnls").classList.remove("childs_active");
                document.getElementById("waterAnls").parentNode.classList.remove("parent_active");
                document.getElementById("massAnls").classList.add("childs_active");
                document.getElementById("massAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "none";
                document.getElementById("massAnalysis").style.display = "block";
                document.getElementById("waterAnalysis").style.display = "none";
                document.getElementById("miscellaneous").style.display = "none";
                $scope.prevSlideText = "global.previousPageText";
                $scope.nextSlideText = "global.nextPageText";
                $scope.prevIsVisible = true;
                $scope.nextVisible = true;
                $scope.redoVisible = true;
                $("#massAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});
                

                $("#fatAnls").css({"border-right" : " 2px solid transparent"});
                $("#massAnls").css({"border" : "none"});
                $("#waterAnls").css({"border-right" : "2px solid #999999cf"});
                $("#mislAnls").css({"border" : "none"});
            }else if(document.getElementById("massAnalysis").style.display == "block"){
                document.getElementById("massAnls").classList.remove("childs_active");
                document.getElementById("massAnls").parentNode.classList.remove("parent_active");
                document.getElementById("fatAnls").classList.add("childs_active");
                document.getElementById("fatAnls").parentNode.classList.add("parent_active");

                document.getElementById("fatAnalysis").style.display = "block";
                document.getElementById("massAnalysis").style.display = "none";
                document.getElementById("waterAnalysis").style.display = "none";
                document.getElementById("miscellaneous").style.display = "none";
                $scope.prevSlideText = "global.previousPageText";
                $scope.nextSlideText = "global.nextPageText";
                $scope.prevIsVisible = false;
                $scope.nextVisible = true;
                $scope.redoVisible = true;
                $("#fatAnalysis").css({"borderTopRightRadius": "10px" , "width": "738px" , "margin-left": "25px"});
                
                $("#fatAnls").css({"border" : "none"});
                $("#massAnls").css({"border-right" : "2px solid #999999cf"});
                $("#waterAnls").css({"border-right" : "2px solid #999999cf"});
                $("#mislAnls").css({"border" : "none"});
            }

            HigiKioskAnimationService.audioStop();
            //$timeout(function(){window.location =  $scope.nextSlide},500);
        }

    };

    $scope.init = function(){
        $scope.setSlideDirection($routeParams.direction);

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskWeightController5', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskWeightController5', $scope);

        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.buttonExitLeft = "button-exit-left";
        $scope.buttonEnterLeft = "button-enter-left";

        //The height of the higi figure in the BMC results
        $scope.charHeightMax = ($scope.isHigi) ? 92 : 146;

        //The minimum amount of height for fat so a portion of the figure's hands have red
        $scope.charHeightMin = ($scope.isHigi) ? 70 : 92;

        $scope.slideTitle = 'weight04.bmc.body.composition';
        $scope.slideSubTitle = 'global.results';
        $scope.bmcInformation = "global.information";
        $scope.bmcParameter = "global.parameter";
        $scope.bmcYourscore = "global.yourscore";
        $scope.bmcNormalrange = "global.normalrange";
        $scope.checkwbmcAgain = "global.bmc.check.Again";
        $scope.bmcOverallStatus = "global.OverallStatus";
        $scope.bodyComp = "global.bodyComp";

        $scope.bodyFatAnanlysis = "global.bodyFatAnanlysis";
        $scope.BoneMassAnalysis = "global.BoneMassAnalysis";
        $scope.TotalBodyWater = "global.TotalBodyWater";
        $scope.Miscellaneous = "global.Miscellaneous";

        $scope.weightTitle = 'global.weight';
        $scope.weightBodyFat = 'weight05.body.fat';

        $scope.weightPoundAbbv = 'global.abbv.pounds';


        $scope.weightBodyIconTitle = 'global.bmc.your.body';
        $scope.weightBodyFatScale = 'weight05.body.fat.scale';

        $scope.leanMass = 'global.bmc.lean.mass';
        $scope.kgUnit = 'global.kgUnit';
        $scope.feetUnit = 'global.feetUnit';
        
        
        var kgweight=   Math.round((HigiKioskStorageService.returnSessionData('weight'))* 100) / 100;
        $scope.weightLbs = typeof(HigiKioskStorageService.returnSessionData('weight')) != "undefined" ? kgweight : "NA";
        //$scope.weightLbs = HigiKioskStorageService.returnSessionData('bmcOhms');

        //$scope.weightLbs = typeof(HigiKioskStorageService.returnSessionData('weight')) != "undefined" ? Math.round(HigiKioskUtilitiesService.convertToPounds(parseFloat(HigiKioskStorageService.returnSessionData('weight')))) : "NA";
        $scope.bodyFat = (parseFloat(HigiKioskStorageService.returnSessionData('fatRatio'))).toFixed(2);
        $scope.leanMassKg = HigiKioskStorageService.returnSessionData('leanMassKg');
        $scope.leanMassPercent = (100 - parseFloat($scope.bodyFat)).toFixed(2);
        $scope.hydrationPct = HigiKioskStorageService.returnSessionData('hydrationPct');

        $scope.leanMassLbs = Math.round(HigiKioskUtilitiesService.convertToPounds($scope.leanMassKg));
        $scope.fatMassLbs = $scope.weightLbs -  $scope.leanMassLbs;

        
        $scope.nextTransitionStyle = 'button-enter-right';
        $scope.mode = $scope.mode;
        $scope.leanMassKg = HigiKioskStorageService.returnSessionData('leanMassKg');

        $scope.charHeight = (parseInt($scope.charHeightMax - (($scope.bodyFat/100) * $scope.charHeightMax)) > $scope.charHeightMin) ? $scope.charHeightMin : parseInt($scope.charHeightMax - (($scope.bodyFat/100) * $scope.charHeightMax));
        $scope.hydrationPct = HigiKioskStorageService.returnSessionData('hydrationPct');



        $scope.isMale = HigiKioskStorageService.returnSessionData('gender') === "m" ? true : false;
        //$scope.femaleScaleClass = $scope.isMale ? "" : "female";
        $scope.femaleScaleClass = $scope.isMale ? "weight_scale_m" : "weight_scale_f";


        $scope.weightBodyFatAtRisk = "weight05.bmc.at.risk";
        $scope.weightBodyFatAcceptable = "weight05.bmc.acceptable";
        $scope.weightBodyFatHealthy =  "weight05.bmc.healthy";

        $scope.weightBodyFatPercent = 'weight03.body.fat.percent';

        $scope.hardStopMessage = "weight05.bmc.hardstop.message";
        $scope.hardStopWeightRange = "weight05.bmc.hardstop.weight.range";
        $scope.hardStopHeightRange = "weight05.bmc.hardstop.height.range";

        $scope.hardStopHeightBottomFemale = "weight05.bmc.hardstop.height.range.bottom.female";
        $scope.hardStopHeightTopFemale = "weight05.bmc.hardstop.height.range.top.female";

        $scope.hardStopWeightBottomFemale = "weight05.bmc.hardstop.weight.range.bottom.female";
        $scope.hardStopWeightTopFemale = "weight05.bmc.hardstop.weight.range.top.female";

        $scope.hardStopHeightBottomMale = "weight05.bmc.hardstop.height.range.bottom.male";
        $scope.hardStopHeightTopMale = "weight05.bmc.hardstop.height.range.top.male";

        $scope.hardStopWeightBottomMale = "weight05.bmc.hardstop.weight.range.bottom.male";
        $scope.hardStopWeightTopMale = "weight05.bmc.hardstop.weight.range.top.male";

//Sumithra code starts
        if($rootScope.mode == "bpw"){
                    var mode = "bpw";

        var currenttest = "Body Composition";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        $scope.nextSlide = nextTestPath;
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;            
        } else {
            $scope.nextSlide = "#/finish/forward";
        }
        //Sumithra code ends

        $scope.nextSlideText = "global.nextPageText";
        $scope.redoSlide = links.previous.link;
        //$scope.redoSlideText = links.previous.label;

        $scope.audioFiles = [
            {filename : 'weight03_audio01'},
            {filename : 'bmc01_audio05'}
        ];
        $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;
        $scope.promise
            .then(function(){
                $scope.showWeight = true;
                $timeout(function(){
                    $scope.showBodyFat = true;
                }, 750);
                $timeout(function(){
                    $scope.showLeanMass = true;
                }, 1500);
                $timeout(function(){
                    $scope.showBmcCharacter = true;
                }, 2250);
                $timeout(function(){
                    //$scope.weightBodyFatRisk = HigiKioskUtilitiesService.calculateBmcRisk($scope.bodyFat,(($scope.isMale) ? "m" : "f"));
                	$scope.weightBodyFatRisk = HigiKioskUtilitiesService.calculateBmcRisk($scope.bodyFat,(($scope.isMale) ? "Male" : "Female"));
					$scope.bmcRisk = HigiKioskStorageService.saveSessionData('bmcRisk', $scope.weightBodyFatRisk);    
                    $rootScope.BodyFatClassTemp = $scope.weightBodyFatRisk;

                    if ($scope.weightBodyFatRisk == 'healthy' ) {
                        //$scope.bmiRiskClass = 'result_risk low';
                        //$scope.bmiRisk = 'global.underweight';
                        $scope.bmiRiskStatus = 'weight05.bmc.healthy';

                    }
                    else if ($scope.weightBodyFatRisk == 'acceptable' ) {
                        //$scope.bmiRiskClass = 'result_risk normal';
                        //$scope.bmiRisk = 'global.normalweight';
                        $scope.bmiRiskStatus = 'weight05.bmc.acceptable';

                    }
                    else if ($scope.weightBodyFatRisk == 'at-risk' ) {
                        //$scope.bmiRiskClass = 'result_risk atrisk';
                       // $scope.bmiRisk = 'global.overweight';
                        $scope.bmiRiskStatus = 'weight05.bmc.at.risk';
                    }
                    

                    if ($rootScope.fullBodyBMCTest == false) {
                        $scope.nextVisible = true;
                        $scope.redoVisible = true;
                    }
                }, 3000);
                $timeout(function () {
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                 }, 4000);
            });

        var hardStopTriggered = HigiKioskStorageService.returnSessionData('hardStopTriggered');
        if(hardStopTriggered) {
            $scope.hardStop = true;
            $rootScope.hardStopShift = ' ';
            console.log('hard stop triggered: ' + hardStopTriggered);
        } else {
            $scope.hardStop = false;
            $rootScope.hardStopShift = 'noStop';
            console.log('hard stop triggered: ' + hardStopTriggered);
        };

        if($rootScope.fullBodyBMCTest == true){
            $timeout(function() {
                $scope.nextVisible = true;
                $scope.redoVisible = true;
            }, 1000);
            $scope.prevIsVisible = false;
        }else if ($rootScope.fullBodyBMCTest == false) {
            /*$timeout(function() {
                $scope.nextVisible = true;
                $scope.redoVisible = true;
            }, 1000);*/
            $scope.prevIsVisible = false;
            if($rootScope.mode == "bpw"){
                $scope.nextSlideText = "global.continue";
            } else if($rootScope.selectedVital.length > 1){
                if ($scope.nextSlide == "#/finish/forward") {
                    $scope.nextSlideText = "global.finalResult";
                }else{
                    $scope.nextSlideText = "global.continue";
                }    
            }else{
                $scope.nextSlideText = "global.finalResult";
            }
        }
    };

    $scope.init();

    $scope.openTabs = function (evt, analysis) {
        // console.log(evt);
        // console.log(analysis);
        console.log(evt.currentTarget.className);
        console.log(evt.currentTarget.parentNode.className);
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("BMCHealth_results_tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }

        tablinks = document.getElementsByClassName("BMCHealth_results_tablinks");
        for (j = 0; j < tablinks.length; j++) {
            tablinks[j].className = tablinks[j].className.replace(" childs_active", "");
            tablinks[j].parentNode.className = tablinks[j].parentNode.className.replace(" parent_active", "");
        }

        document.getElementById(analysis).style.display = "block";
        evt.currentTarget.className += " childs_active";
        evt.currentTarget.parentNode.className += " parent_active";

        if (document.getElementById("fatAnalysis").style.display == "block") {
            $("#fatAnalysis").css({"borderTopRightRadius": "10px" , "width": "738px" , "margin-left": "25px"});
            $scope.prevSlideText = "global.previousPageText";
            $scope.nextSlideText = "global.nextPageText";
            $scope.prevIsVisible = false;
            $scope.nextVisible = true;
            $scope.redoVisible = true;
        }

        if (document.getElementById("massAnalysis").style.display == "block") {
            $("#massAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});
            $("#fatAnls").css({"border-right" : " 2px solid transparent"});
            $scope.prevSlideText = "global.previousPageText";
            $scope.nextSlideText = "global.nextPageText";
            $scope.prevIsVisible = true;
            $scope.nextVisible = true;
            $scope.redoVisible = true;
        }else{
            $("#fatAnls").css({"border-right" : " 2px solid #999999cf"});
        }

        if (document.getElementById("waterAnalysis").style.display == "block") {
            $("#waterAnalysis").css({"borderTopRightRadius": "10px" , "borderTopLeftRadius":"10px" , "width": "743px" ,"margin-left": "19px"});
            $("#massAnls").css({"border-right" : " 2px solid transparent"});
            $scope.prevSlideText = "global.previousPageText";
            $scope.nextSlideText = "global.nextPageText";
            $scope.prevIsVisible = true;
            $scope.nextVisible = true;
            $scope.redoVisible = true;
        }else{
            $("#massAnls").css({"border-right" : " 2px solid #999999cf"});
        }

        if (document.getElementById("miscellaneous").style.display == "block") {
            $("#miscellaneous").css({"borderTopLeftRadius": "10px", "width": "738px" , "margin-left": "19px"});
            $("#waterAnls").css({"border-right" : " 2px solid transparent"});
            $scope.prevSlideText = "global.previousPageText";
            if($rootScope.mode == "bpw"){
                $scope.nextSlideText = "global.continue";
            } else if($rootScope.selectedVital.length > 1){
                if ($scope.nextSlide == "#/finish/forward") {
                    $scope.nextSlideText = "global.finalResult";
                }else{
                    $scope.nextSlideText = "global.continue";
                }    
            }else{
                $scope.nextSlideText = "global.finalResult";
            }
            //$scope.nextSlideText = "global.continue";
            $scope.prevIsVisible = true;
            $scope.nextVisible = true;
            $scope.redoVisible = true;
        }else{
            $("#waterAnls").css({"border-right" : " 2px solid #999999cf"});
        }
    }


}]);