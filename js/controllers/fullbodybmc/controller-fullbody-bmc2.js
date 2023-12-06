higiKioskControllers.controller('IHLHPodFullBodyBMCResultController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskAnimationService' ,'HigiKioskUtilitiesService' , 'HigiKioskStorageService', 'HigiKioskFlow', '$timeout', 'JkioskService','HigiKioskVitalReference', function($scope, $routeParams, $rootScope, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiKioskFlow, $timeout, JkioskService,HigiKioskVitalReference){
	
//    document.getElementById("splash_logo").style.display = "block";
	$scope.showInfoboxWeightBodyMassComp = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
        $rootScope.loadModal({id : 'infoboxweightbodymasscomp'});
    };

    $scope.redoBmc = function(){
        if(HigiKioskStorageService.returnSessionData('current_mode') != "bpw"){
            HigiKioskStorageService.saveSessionData('current_mode', "bmc");
        }
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_redoButton', 'button', 'pressed');
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
                $timeout(function(){

                    window.location =  $scope.nextSlide},500);
            }
            HigiKioskAnimationService.audioStop();
        }else if ($rootScope.fullBodyBMCTest == false) {
            $scope.nextVisible = false;
            $scope.redoVisible = false;
            $scope.prevIsVisible = false;
            $timeout(function(){

                window.location =  $scope.nextSlide},500);
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
        var links = HigiKioskFlow.slideLinks('IHLHPodFullBodyBMCResultController', $scope.mode);

        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.buttonExitLeft = "button-exit-left";
        $scope.buttonEnterLeft = "button-enter-left";

        //The height of the higi figure in the BMC results
        $scope.charHeightMax = ($scope.isHigi) ? 92 : 146;

        //The minimum amount of height for fat so a portion of the figure's hands have red
        $scope.charHeightMin = ($scope.isHigi) ? 70 : 92;

        
        $scope.slideTitle = 'fullbodybmc1.title';
        $scope.slideSubTitle = 'fullbodybmc2.results';
        $scope.bmcInformation = "fullbodybmc2.information";
        $scope.bmcParameter = "fullbodybmc2.parameter";
        $scope.bmcYourscore = "fullbodybmc2.yourscore";
        $scope.bmcSTATUS = "fullbodybmc2.STATUS";
        $scope.bmcNormalrange = "fullbodybmc2.normalrange";
        

        $scope.bodyFatAnanlysis = "fullbodybmc2.bodyFatAnanlysis";
        $scope.BoneMassAnalysis = "fullbodybmc2.BoneMassAnalysis";
        $scope.TotalBodyWater = "fullbodybmc2.TotalBodyWater";
        $scope.Miscellaneous = "fullbodybmc2.Miscellaneous";
        $scope.BFM = "fullbodybmc2.BFM";
        $scope.BodyFatMass = "fullbodybmc2.BodyFatMass";
        $scope.PBF = "fullbodybmc2.PBF";
        $scope.PercentBodyFat = "fullbodybmc2.PercentBodyFat";
        $scope.SMM = "fullbodybmc2.SMM";
        $scope.SkeletalMuscleMass = "fullbodybmc2.SkeletalMuscleMass";
        $scope.BCM = "fullbodybmc2.BCM";
        $scope.BodyCellMass = "fullbodybmc2.BodyCellMass";
        $scope.VF = "fullbodybmc2.VF";
        $scope.VisceralFat = "fullbodybmc2.VisceralFat"; 

        $scope.BMC ="fullbodybmc2.BMC";
        $scope.BoneMineralContent ="fullbodybmc2.BoneMineralContent";
        $scope.Protein ="fullbodybmc2.Protein";
        $scope.OverallProteinContent ="fullbodybmc2.OverallProteinContent";
        $scope.Mineral ="fullbodybmc2.Mineral";
        $scope.OverallMineralContent ="fullbodybmc2.OverallMineralContent";
        $scope.ICW ="fullbodybmc2.ICW";
        $scope.IntraCellularWater ="fullbodybmc2.IntraCellularWater";
        $scope.ECW ="fullbodybmc2.ECW";
        $scope.ExtraCellularWater ="fullbodybmc2.ExtraCellularWater";
        $scope.WaistHip ="fullbodybmc2.Waist/hip";
        $scope.WaistToHipRatio ="fullbodybmc2.WaistToHipRatio";
        $scope.WaistHeight ="fullbodybmc2.Waist/height";
        $scope.WaistToHeightRatio ="fullbodybmc2.WaistToHeightRatio";
        $scope.BMR ="fullbodybmc2.BMR";
        $scope.BasalMetabolicRate ="fullbodybmc2.BasalMetabolicRate";
        $scope.Above ="fullbodybmc2.Above";
        $scope.BmCheckAgain = "fullbodybmc2.bmc.check.Again";

        $scope.weightBodyFat = 'weight05.body.fat';
        $scope.weightPoundAbbv = 'global.abbv.pounds';
        $scope.weightBodyIconTitle = 'global.bmc.your.body';
        $scope.weightBodyFatScale = 'weight05.body.fat.scale';
        $scope.leanMass = 'global.bmc.lean.mass';
        
        $scope.Z_val250 = 0.00;
        $scope.Z_val50 = 0.00;
        $scope.Z_val625 = 0.00;
        $scope.boneMineralContent = 0.00;
        $scope.protein = 0.00;
        $scope.ecw = 0.00;
        $scope.icw = 0.00;
        $scope.mineral = 0.00;
        $scope.smm = 0.00;
        $scope.bcm = 0.00;
        $scope.fat = 0.00;
        $scope.whpr = 0.00;
        $scope.whtr = 0.00;
        $scope.pbf = 0.00;
        $scope.vf = 0.00;
        $scope.bmr = 0.00;

        $scope.boneMineralContentStatus = "";
        $scope.proteinStatus = "";
        $scope.ecwStatus = "";
        $scope.icwStatus = "";
        $scope.mineralStatus = "";
        $scope.smmStatus = "";
        $scope.bcmStatus = "";
        $scope.fatStatus = "";
        $scope.whprStatus = "";
        $scope.whtrStatus = "";
        $scope.pbfStatus = "";
        $scope.vfStatus = "";
        $scope.bmrStatus = "";
        
        $scope.boneMineralContentStatusText = "";
        $scope.proteinStatusText = "";
        $scope.icwStatusText = "";
        $scope.ecwStatusText = "";
        $scope.mineralStatusText = "";
        $scope.smmStatusText = "";
        $scope.bcmStatusText = "";
        $scope.fatStatusText = "";
        $scope.whprStatusText = "";
        $scope.whtrStatusText = "";
        $scope.pbfStatusText = "";
        $scope.vfStatusText = "";
        $scope.bmrStatusText = "";

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
        var waistCircumference = HigiKioskStorageService.returnSessionData("waistcircumference");
        if(waistCircumference == undefined){
                var json = HigiKioskStorageService.returnSessionData('loginResp');
                if(json != undefined){
                    if(json.User.waistCircumference == undefined){
                        $rootScope.isWaistCircumference = false;
                    }
                else{
                    HigiKioskStorageService.saveSessionData('waistcircumference',json.User.waistCircumference);
                    $rootScope.isWaistCircumference = true;
                }
            }
            else{
                $rootScope.isWaistCircumference = false;
            }
        }
        else{
            $rootScope.isWaistCircumference = true;
        }
        
        $scope.calculateFullBodyBMCOutput = function () {
        var dateOfBirth = HigiKioskStorageService.returnSessionData('birthdate');
        var gender = HigiKioskStorageService.returnSessionData('gender');
        var age = (HigiKioskUtilitiesService.getAge(dateOfBirth));
        var height = HigiKioskStorageService.returnSessionData("height") * 100;

        $scope.Z_val250 = HigiKioskStorageService.returnSessionData('ResistanceAt250');
        $scope.Z_val50 = HigiKioskStorageService.returnSessionData('ResistanceAt50');
        $scope.Z_val625 = HigiKioskStorageService.returnSessionData('ResistanceAt625');
        var weight = HigiKioskStorageService.returnSessionData("weight");
        if($rootScope.waistCircumference == true){
        }
        else{
          waistCircumference = HigiKioskStorageService.returnSessionData("waistcircumference");
        }
        var G;
        if (gender == "Male" || gender == "M" || gender == "m" || gender == "male"){
            G = 1; //If G == 1 Male 
        } else {
            G = 0; //If G == 0 Female
        }
        
        ////
        var height = HigiKioskStorageService.returnSessionData("height") * 100;
        var weight = HigiKioskStorageService.returnSessionData("weight");
        var i =0;
        $rootScope.bcml="20.00";
        $rootScope.bcmh="25.00";
        $rootScope.lowMineral="2.00";
        $rootScope.highMineral="3.00";

        if (HigiKioskStorageService.returnSessionData('gender') != "m") {
            // $rootScope.lowPbfReference = "18.00";
            // $rootScope.highPbfReference = "28.00";
            // $rootScope.acceptableHighPbfReference = "32.00";
            $rootScope.lowPbfReference = "18.00";
            $rootScope.acceptableHighPbfReference = "28.00";
            $rootScope.highPbfReference = "32.00";
            let female_height_weight = [
                [147 , 45  , 59],
                [150 , 45  , 60],[152 , 46  , 62],[155 , 47  , 63],[157 , 49  , 65],[160 , 50  , 67],[162 , 51  , 69],
                [165 , 53  , 70],[167 , 54  , 72],
                [170 , 55  , 74],[172 , 57  , 75],[175 , 58  , 77],[177 , 60  , 78],[180 , 61  , 80]
            ];
            while(female_height_weight[i][0]<= height)
		    {
                i++;
                if(i == 13){
                    break;
                }
		    }
            var wtl, wth;
            if(i == 0){
                wtl=female_height_weight[i][1];   
                wth=female_height_weight[i][2];           
            }
            else{
                wtl=female_height_weight[i-1][1];   
                wth=female_height_weight[i-1][2];           
            }
            $rootScope.lowSmmReference = (0.36*wtl).toFixed(2);
            $rootScope.highSmmReference = (0.36*wth).toFixed(2);
            $rootScope.lowFatReference=(0.18*weight).toFixed(2);
            // $rootScope.highFatReference=(0.28*weight).toFixed(2);
            $rootScope.acceptableFatReference = (0.28*weight).toFixed(2);
            $rootScope.highFatReference=(0.32*weight).toFixed(2);
            $rootScope.lowBmcReference = "1.70";
            $rootScope.highBmcReference = "3.00";
            $rootScope.icll=(0.3*wtl).toFixed(2);
            $rootScope.iclh=(0.3*wth).toFixed(2);		
            $rootScope.ecll=(0.2*wtl).toFixed(2);
            $rootScope.eclh=(0.2*wth).toFixed(2);
            $rootScope.proteinl=(0.116*weight).toFixed(2);
            $rootScope.proteinh=(0.141*weight).toFixed(2);	
            $rootScope.waisttoheightratiolow= "0.35";
            $rootScope.waisttoheightratiohigh= "0.53";	            
        }
        else{
            // $rootScope.lowPbfReference = "10.00";
            // $rootScope.highPbfReference = "20.00";
            // $rootScope.acceptableHighPbfReference = "27.00";
            $rootScope.lowPbfReference = "10.00";
            $rootScope.acceptableHighPbfReference = "20.00";
            $rootScope.highPbfReference = "27.00";
            let male_height_weight = [
                [155,55,66],
                [157,56,67],[160,57,68],[162,58,70],[165,59,72],[167,60,74],[170,61,75],[172,62,77],[175,63,79],
                [177,64,81],[180,65,83],[182,66,85],[185,68,87],[187,69,89],[190,71,91]
            ];
            var i =0;
            while(male_height_weight[i][0]<= height){
                i++;
                if(i==14){
                    break;
                }
            }
            var wtl, wth;
            if(i == 0){
                wtl=male_height_weight[i][1];
                wth=male_height_weight[i][2];   
            }
            else{
                wtl=male_height_weight[i-1][1];
                wth=male_height_weight[i-1][2];   
            }
            $rootScope.lowSmmReference = (0.42*wtl).toFixed(2);
		    $rootScope.higSmmhReference = (0.42*wth).toFixed(2);    
            $rootScope.lowFatReference=(0.10*weight).toFixed(2);
            // $rootScope.highFatReference=(0.20*weight).toFixed(2);
            $rootScope.acceptableFatReference = (0.20*weight).toFixed(2);
            $rootScope.highFatReference=(0.27*weight).toFixed(2);
            $rootScope.lowBmcReference = "1.70";
            $rootScope.highBmcReference = "3.70";
            $rootScope.icll=(0.3*wtl).toFixed(2);
            $rootScope.iclh=(0.3*wth).toFixed(2);            
            $rootScope.ecll=(0.2*wtl).toFixed(2);
            $rootScope.eclh=(0.2*wth).toFixed(2);
            $rootScope.proteinl=(0.109*weight).toFixed(2);
            $rootScope.proteinh=(0.135*weight);
            $rootScope.waisttoheightratiolow= "0.35";
            $rootScope.waisttoheightratiohigh= "0.57";

        }

        var bmcValue = -3.5268 + (2.79 * height / 100) + (0.0145 * weight) + (184 * (height / 100) * (height / 100) / $scope.Z_val50) - (1.08 * (weight * height / 100) * (height / 100) / $scope.Z_val625) - (0.0032 * age - 0.103 * G);
        $scope.boneMineralContent = bmcValue.toFixed(2);
        // $scope.boneMineralContentStatusText = HigiKioskUtilitiesService.calculateFullBodyBMCStatus($scope.boneMineralContent);
        // $scope.boneMineralContentStatus = (HigiKioskUtilitiesService.calculateFullBodyBMCStatus($scope.boneMineralContent) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.boneMineralContentStatusText = HigiKioskVitalReference.calculateBMCRiskForUI($scope.boneMineralContent);
        $scope.boneMineralContentStatus = (HigiKioskVitalReference.calculateBMCRiskForUI($scope.boneMineralContent) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];

        var proteinValue = 0.251 + 0.426 * G + 2.23 * bmcValue - (225 * height / 100 * height / 100) / $scope.Z_val625 + (579 * height / 100 * height / 100) / $scope.Z_val50;
        $scope.protein = proteinValue.toFixed(2);
        // $scope.proteinStatusText = HigiKioskUtilitiesService.calculateFullBodyProteinStatus($scope.protein);
        // $scope.proteinStatus = (HigiKioskUtilitiesService.calculateFullBodyProteinStatus($scope.protein) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.proteinStatusText = HigiKioskVitalReference.calculateProteinRiskForUI($scope.protein);
        if ($scope.proteinStatusText == 'Low') {
            $scope.proteinStatus = $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if($scope.proteinStatusText == 'Normal') {
            $scope.proteinStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else{
           $scope.proteinStatus =  $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var icwValue = 0.548 - (0.106 * $scope.Z_val50 / height / 100) + 2.29 * proteinValue;
        $scope.icw = icwValue.toFixed(2);
        // $scope.icwStatusText =  HigiKioskUtilitiesService.calculateFullBodyICWStatus($scope.icw);
        $scope.icwStatusText =  HigiKioskVitalReference.calculateICWRiskForUI($scope.icw);
        if ($scope.icwStatusText == 'Low') {
            $scope.icwStatus = $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if($scope.icwStatusText == 'Normal') {
            $scope.icwStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else{
           $scope.icwStatus =  $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var ecwValue = -8.71 - (0.157 * G) + (6.62 * height / 100) - (0.0320 * weight) + (0.107 * (weight / (height / 100 * height / 100))) + (371 * (height / 100) * (height / 100) / $scope.Z_val50) + (5.09 * weight * (height / 100) * (height / 100) / $scope.Z_val625) + (0.954 * proteinValue);
        $scope.ecw = ecwValue.toFixed(2);
        // $scope.ecwStatusText = HigiKioskUtilitiesService.calculateFullBodyECWStatus($scope.ecw);
        $scope.ecwStatusText = HigiKioskVitalReference.calculateECWRiskForUI($scope.ecw); 
        if ($scope.ecwStatusText == 'Low') {
            $scope.ecwStatus = $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if ($scope.ecwStatusText == 'Normal') {
            $scope.ecwStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else{
           $scope.ecwStatus =  $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }
        

        var mineralValue = -0.0146 + bmcValue * 0.9960 + icwValue * 0.01778 + 0.0163 * ecwValue - 0.0199 * weight * height / 100 * height / 100 / $scope.Z_val50 + 0.00014 * age;
        $scope.mineral = mineralValue.toFixed(2);
        // $scope.mineralStatusText = HigiKioskUtilitiesService.calculateFullBodyMineralStatus($scope.mineral);
        // $scope.mineralStatus = (HigiKioskUtilitiesService.calculateFullBodyMineralStatus($scope.mineral) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.mineralStatusText = HigiKioskVitalReference.calculateMineralsRiskForUI($scope.mineral);
        $scope.mineralStatus = (HigiKioskVitalReference.calculateMineralsRiskForUI($scope.mineral) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];

        var smmValue = -1.99 + 1.0724 * icwValue + 0.536 * proteinValue;
        $scope.smm = smmValue.toFixed(2);
        // $scope.smmStatusText = HigiKioskUtilitiesService.calculateFullBodySMMStatus($scope.smm);
        // $scope.smmStatus = (HigiKioskUtilitiesService.calculateFullBodySMMStatus($scope.smm) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.smmStatusText = HigiKioskVitalReference.calculateSMMRiskForUI($scope.smm);
        $scope.smmStatus = (HigiKioskVitalReference.calculateSMMRiskForUI($scope.smm) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];

        var bcmValue = 1.948 + 0.9817 * smmValue + 0.35 * proteinValue + 0.00092 * weight;
        $scope.bcm = bcmValue.toFixed(2);
        // $scope.bcmStatusText = HigiKioskUtilitiesService.calculateFullBodyBCMStatus($scope.bcm);
        // $scope.bcmStatus = (HigiKioskUtilitiesService.calculateFullBodyBCMStatus($scope.bcm) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.bcmStatusText = HigiKioskVitalReference.calculateBCMRiskForUI($scope.bcm);
        $scope.bcmStatus = (HigiKioskVitalReference.calculateBCMRiskForUI($scope.bcm) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];

        var fatValue = -2.257+(0.9999*weight)-(0.991*ecwValue)-(1.111*smmValue)-(0.912*mineralValue);
        $scope.fat = fatValue.toFixed(2);
        // $scope.fat = 20.6978.toFixed(2) //hardcore 
        // $scope.fatStatusText = HigiKioskUtilitiesService.calculateFullBodyFATStatus($scope.fat);
        $scope.fatStatusText = HigiKioskVitalReference.calculateBodyFatMassRiskForUI($scope.fat);
        if ($scope.fatStatusText == 'Low') {
            $scope.fatStatus = $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if ($scope.fatStatusText == 'Normal') {
            $scope.fatStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else if($scope.fatStatusText == 'Acceptable'){
            $scope.fatStatus =  $scope.interfaceLabels["fullbodybmc2.acceptableStatus"];
        }else{
           $scope.fatStatus =  $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var whprValue = 0.734 + 0.0104 * weight / (height / 100 * height / 100) + 0.00179 * age + 0.0550 * G - 0.00978 * ecwValue - 0.00310 * $scope.Z_val625 / weight - (5.75 * (height / 100) * (height / 100) / $scope.Z_val250);
        $scope.whpr = whprValue.toFixed(2);
        // $scope.whprStatusText = HigiKioskUtilitiesService.calculateFullBodyWHPRStatus($scope.whpr);
        $scope.whprStatusText = HigiKioskVitalReference.calculateWHPRRiskForUI($scope.whpr);
        if ($scope.whprStatusText == 'Low') {
            $scope.whprStatus = $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if($scope.whprStatusText == 'Normal') {
            $scope.whprStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else{
            $scope.whprStatus =  $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var whtrValue = (waistCircumference / (height));
        var whtrVal = whtrValue; // whtrValue/ 100; // formula fine tuned for VF 
        $scope.whtr = whtrVal.toFixed(2);
        // $scope.whtrStatusText = HigiKioskUtilitiesService.calculateFullBodyWHTRStatus($scope.whtr);
        $scope.whtrStatusText = HigiKioskVitalReference.calculateWHTRRiskForUI($scope.whtr);
        if ($scope.whtrStatusText == 'Low') {
            $scope.whtrStatus =  $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if ($scope.whtrStatusText == 'Normal') {
            $scope.whtrStatus =  $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else{
            $scope.whtrStatus =   $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var pbfvalue = (fatValue / weight) * 100;
        $scope.pbf = pbfvalue.toFixed(2);
        // $scope.pbf = 20.6978.toFixed(2); // hardcore
        // $scope.pbfStatusText = HigiKioskUtilitiesService.calculateFullBodyPBFStatus($scope.pbf);
        $scope.pbfStatusText = HigiKioskVitalReference.calculatePBFRiskForUI($scope.pbf);
        if ($scope.pbfStatusText == 'Low') {
            $scope.pbfStatus =  $scope.interfaceLabels["fullbodybmc2.lowStatus"];
        }else if ($scope.pbfStatusText == 'Normal') {
            $scope.pbfStatus =  $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else if($scope.pbfStatusText == 'Acceptable'){
            $scope.pbfStatus =  $scope.interfaceLabels["fullbodybmc2.acceptableStatus"];
        }else{
            $scope.pbfStatus =   $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var vfValue = 121.12 + (124 * whprValue) + (1.86 * fatValue) + (1.028 * age) + (18468 * (height / 100 * height / 100) / $scope.Z_val250) - (12.4 * G) + (0.90 * pbfvalue) - (18909 * (height / 100 * height / 100) / $scope.Z_val625) - (541 * (whtrValue)) + (3.47 * waistCircumference) - (155 * height / 100); // (541 * (whtrValue / 100)) // formula fine tuned for VF
        $scope.vf = vfValue.toFixed(0);
        // $scope.vf = 169.00.toFixed(0); // hardcore
        // $scope.vfStatus = (HigiKioskUtilitiesService.calculateFullBodyVFStatus($scope.vf) == 'High') ? $scope.interfaceLabels["fullbodybmc2.highStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        $scope.vfStatusText = HigiKioskVitalReference.calculateVisceralFatRiskForUI($scope.vf);
        if($scope.vfStatusText == 'Normal'){
            $scope.vfStatus = $scope.interfaceLabels["fullbodybmc2.normalStatus"];
        }else if($scope.vfStatusText == 'Acceptable'){
            $scope.vfStatus = $scope.interfaceLabels["fullbodybmc2.acceptableStatus"];
        }else if($scope.vfStatusText == 'High'){
            $scope.vfStatus = $scope.interfaceLabels["fullbodybmc2.highStatus"];
        }

        var bmrValue = 369.9 + 18.78 * bcmValue + 21.89 * ecwValue + 21.2 * mineralValue + 9.2 * proteinValue + 0.264 * $scope.Z_val625 / weight - 0.0065 * $scope.Z_val625;
        $scope.bmr = bmrValue.toFixed(0);
        $scope.bmrStatusText = (HigiKioskUtilitiesService.calculateFullBodyBMRStatus($scope.bmr));
        $scope.bmrStatus = (HigiKioskUtilitiesService.calculateFullBodyBMRStatus($scope.bmr) == 'Low') ? $scope.interfaceLabels["fullbodybmc2.lowStatus"] : $scope.interfaceLabels["fullbodybmc2.normalStatus"];

        console.log("BMC\n" + $scope.boneMineralContent + "\n" + "Protein\n" + $scope.protein + "\n" + "ECW\n" + $scope.ecw + "\n" + "ICW" + $scope.icw + "\n" + "Mineral\n" + $scope.mineral +
            "\n" + "SMM\n" + $scope.smm + "\n" + "BCM\n" + $scope.bcm + "\n" + "Fat\n" + $scope.fat + "\n" + "whpr\n" + $scope.whpr + "\n" + "whtr\n" + $scope.whtr + "\n" + "PBF\n" + $scope.pbf +
            "\n" + "VF\n" + $scope.vf + "\n" + "BMR\n" + $scope.bmr);

        HigiKioskStorageService.saveSessionData('bmc', $scope.boneMineralContent);
        HigiKioskStorageService.saveSessionData('Protein', $scope.protein);
        HigiKioskStorageService.saveSessionData('ECW', $scope.ecw);
        HigiKioskStorageService.saveSessionData('ICW', $scope.icw);
        HigiKioskStorageService.saveSessionData('Mineral', $scope.mineral);
        HigiKioskStorageService.saveSessionData('SMM', $scope.smm);
        HigiKioskStorageService.saveSessionData('BCM', $scope.bcm);
        HigiKioskStorageService.saveSessionData('Fat', $scope.fat);
        HigiKioskStorageService.saveSessionData('whpr', $scope.whpr);
        HigiKioskStorageService.saveSessionData('whtr', $scope.whtr);
        HigiKioskStorageService.saveSessionData('PBF', $scope.pbf);
        HigiKioskStorageService.saveSessionData('VF', $scope.vf);
        HigiKioskStorageService.saveSessionData('BMR', $scope.bmr);

        //For UI purpose in language choosen
        HigiKioskStorageService.saveSessionData('boneMineralContentStatus', $scope.boneMineralContentStatus);
        HigiKioskStorageService.saveSessionData('ProteinStatus', $scope.proteinStatus);
        HigiKioskStorageService.saveSessionData('ECWStatus', $scope.ecwStatus);
        HigiKioskStorageService.saveSessionData('ICWStatus', $scope.icwStatus);
        HigiKioskStorageService.saveSessionData('MineralStatus', $scope.mineralStatus);
        HigiKioskStorageService.saveSessionData('SMMStatus', $scope.smmStatus);
        HigiKioskStorageService.saveSessionData('BCMStatus', $scope.bcmStatus);
        HigiKioskStorageService.saveSessionData('FatStatus', $scope.fatStatus);
        HigiKioskStorageService.saveSessionData('whprStatus', $scope.whprStatus);
        HigiKioskStorageService.saveSessionData('whtrStatus', $scope.whtrStatus);
        HigiKioskStorageService.saveSessionData('PBFStatus', $scope.pbfStatus);
        HigiKioskStorageService.saveSessionData('VFStatus', $scope.vfStatus);
        HigiKioskStorageService.saveSessionData('BMRStatus', $scope.bmrStatus);

        // For DB purpose in if any regional language chosen status of test has been stored in english language only
        HigiKioskStorageService.saveSessionData('boneMineralContentStatusForDB', $scope.boneMineralContentStatusText);
        HigiKioskStorageService.saveSessionData('ProteinStatusForDB', $scope.proteinStatusText);
        HigiKioskStorageService.saveSessionData('ECWStatusForDB', $scope.ecwStatusText);
        HigiKioskStorageService.saveSessionData('ICWStatusForDB', $scope.icwStatusText);
        HigiKioskStorageService.saveSessionData('MineralStatusForDB', $scope.mineralStatusText);
        HigiKioskStorageService.saveSessionData('SMMStatusForDB', $scope.smmStatusText);
        HigiKioskStorageService.saveSessionData('BCMStatusForDB', $scope.bcmStatusText);
        HigiKioskStorageService.saveSessionData('FatStatusForDB', $scope.fatStatusText);
        HigiKioskStorageService.saveSessionData('whprStatusForDB', $scope.whprStatusText);
        HigiKioskStorageService.saveSessionData('whtrStatusForDB', $scope.whtrStatusText);
        HigiKioskStorageService.saveSessionData('PBFStatusForDB', $scope.pbfStatusText);
        HigiKioskStorageService.saveSessionData('VFStatusForDB', $scope.vfStatusText);
        HigiKioskStorageService.saveSessionData('BMRStatusForDB', $scope.bmrStatusText);
               
       }
       if($rootScope.fullBodyBMCTest == true){
        // console.log('calling calculateFullBodyBMCOutput');
         $scope.calculateFullBodyBMCOutput();
       }
        if($rootScope.mode == "bpw"){
        var mode = "bpw";
        var currenttest = "Body Composition";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        $scope.nextSlide = nextTestPath;
        } 
        else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;  
            if ($scope.nextSlide == "#/finish/forward") {
                $scope.nextSlideText = "global.finalResult";
            }else{
                $scope.nextSlideText = "global.continue";
            }               
        } else {
            $scope.nextSlide = "#/finish/forward";
            $scope.nextSlideText = "global.finalResult";
        }

        $scope.nextSlideText = "global.nextPageText";
        // change
        $scope.redoSlide = "#/fullbodybmc1/forward";
        //$scope.redoSlide = links.previous.link;
        //$scope.redoSlideText = links.previous.label;



        $scope.audioFiles = [
            {filename : 'weight03_audio01'},
            {filename : 'weight03_audio11'}
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
                    if ($rootScope.fullBodyBMCTest == false) {
                        $scope.nextVisible = true;
                        $scope.redoVisible = true;
                    }
                }, 3000);
                $timeout(function () {
                    return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                }, 1000);
            });

        var hardStopTriggered = HigiKioskStorageService.returnSessionData('hardStopTriggered');
        if(hardStopTriggered) {
            $scope.hardStop = true;
            $rootScope.hardStopShift = ' ';
          //  console.log('hard stop triggered: ' + hardStopTriggered);
        } else {
            $scope.hardStop = false;
            $rootScope.hardStopShift = 'noStop';
          //  console.log('hard stop triggered: ' + hardStopTriggered);
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
        //console.log(evt.currentTarget.className);
        //console.log(evt.currentTarget.parentNode.className);
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