higiKioskControllers.controller('HigiKioskBpController3' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiKioskAnimationService', 'JkioskService', '$timeout','HigiKioskVitalReference', function($scope, $routeParams, $rootScope, HigiKioskFlow, HigiKioskStorageService, HigiKioskUtilitiesService, HigiKioskAnimationService, JkioskService, $timeout,HigiKioskVitalReference){
    $scope.setSlideDirection($routeParams.direction);
    $scope.systolic = HigiKioskStorageService.returnSessionData('systolic');
    $scope.diastolic = HigiKioskStorageService.returnSessionData('diastolic');
    $scope.pulse = HigiKioskStorageService.returnSessionData('pulse');

    $rootScope.infoBoxSystolic = $scope.systolic;
    $rootScope.infoBoxDiastolic = $scope.diastolic;


    $scope.averageSystolic = HigiKioskUtilitiesService.averageArray($scope.systolicArray);
    $scope.averageDiastolic = HigiKioskUtilitiesService.averageArray($scope.diastolicArray);
    $scope.averagePulse = HigiKioskUtilitiesService.averageArray($scope.pulseArray);
    $scope.averageButtonActive = '';


    $scope.setBpToAverage = function(){
        $scope.systolic = $scope.averageSystolic.avg;
        $scope.diastolic = $scope.averageDiastolic.avg;
        $scope.pulse = $scope.averagePulse.avg;

        HigiKioskStorageService.saveSessionData('systolic', $scope.systolic);
        HigiKioskStorageService.saveSessionData('diastolic', $scope.diastolic);
        HigiKioskStorageService.saveSessionData('pulse', $scope.pulse);
        HigiKioskStorageService.saveSessionData('averageBPResults', true);
		HigiKioskStorageService.saveSessionData('HRforTemp', $scope.pulse);
    };

    $scope.setBpToLastTest = function(){
        $scope.systolic = $scope.systolicArray[$scope.systolicArray.length -1];
        $scope.diastolic = $scope.diastolicArray[$scope.diastolicArray.length -1];
        $scope.pulse = $scope.pulseArray[$scope.pulseArray.length -1];

        HigiKioskStorageService.saveSessionData('systolic', $scope.systolic);
        HigiKioskStorageService.saveSessionData('diastolic', $scope.diastolic);
        HigiKioskStorageService.saveSessionData('pulse', $scope.pulse);
        HigiKioskStorageService.saveSessionData('averageBPResults', false);
		HigiKioskStorageService.saveSessionData('HRforTemp', $scope.pulse);
    };

    $scope.toggleAverage = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_averageBloodpressureResults', 'checkbox', 'checked');
        if( $scope.averageButtonActive == ''){
            $scope.averageButtonActive = 'active_btn';
            $scope.setBpToAverage();
        }
        else {

            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_showAllAverageButton', 'button', 'pressed');
            $scope.averageButtonActive = '';
            $scope.setBpToLastTest();
        }
    };


    $scope.showAllBpResults = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_showAllAverageButton', 'button', 'pressed')
        $rootScope.loadModal({id : 'infoboxbpmultipletests'});
    };

    $scope.bpAverageIsVisible = ($scope.systolicArray.length > 1) ? true : false;

    $scope.infoBox = {id: 'infoboxbp'};

    $scope.showInfoboxBp = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_infoButton', 'button', 'pressed');
        $rootScope.loadModal($scope.infoBox);
    };
    $scope.init = function(){
        if($rootScope.higiTopNavHidden){
            $timeout(function(){
                $rootScope.higiTopNavHidden = false;
                $rootScope.slideInNav = "slideIn";
            },1000);
        }
        $scope.buttonExitRight = "button-exit-right";
        $scope.buttonEnterRight = "button-enter-right";
        $scope.buttonExitLeft = "button-exit-left";
        $scope.buttonEnterLeft = "button-enter-left";


        var calculateSystolicDegrees = function (systolicInput) {
            if (systolicInput > 150) {
                systolicDegrees = 80; //max degrees
            }
            else if (systolicInput < 110) {
                systolicDegrees = -80 //min degrees
            }
            else {
                systolicDegrees = (systolicInput * 4) - 520; //from 120 to 140, degrees -80 to 80
            }
            return systolicDegrees;
        };
        var calculateDiastolicDegrees = function (diastolicInput) {
            if (diastolicInput > 95) {
                diastolicDegrees = 80; //max degrees
            }
            else if (diastolicInput < 75) {
                diastolicDegrees = -80	//min degrees
            }
            else {
                diastolicDegrees = (diastolicInput * 8) + -680; // from 75 to 95, degrees -80 to 80
            }
            return diastolicDegrees;
        };
        var calculatePulseDegrees = function (pulseInput) {
            if (pulseInput > 120) {
                pulseDegrees = 80; //max degrees
            }
            else if (pulseInput < 40) {
                pulseDegrees = -80	//min degrees
            }
            else {
                pulseDegrees = (pulseInput * 2) + -160; // from 60 to 100, degrees -80 to 80
            }
            return pulseDegrees;
        };



        var pulseRisk = HigiKioskVitalReference.calculatePulseRiskForUI($scope.pulse );
        $scope.pulseStatus = HigiKioskStorageService.saveSessionData('pulseStatus', pulseRisk);

        if ( pulseRisk == 'High') {
            $scope.pulseRiskClass = 'high';
            $scope.pulseRisk = 'global.highpulse';
        }
        else if ( pulseRisk == 'Low') {
            $scope.pulseRiskClass = 'low';
            $scope.pulseRisk = 'global.lowbp';

        }
        else if (pulseRisk == 'Normal') {
                $scope.pulseRiskClass = 'normal';
                $scope.pulseRisk = 'global.acceptable';

        }
        else if (pulseRisk == 'Check with healthcare provider') {
            $scope.pulseRiskClass = 'high';
            $scope.pulseRisk = 'global.check_healthcare_provider';

        }
        else {
            $scope.pulseRiskClass = 'Normal';
            $scope.pulseRisk = 'global.normalbp';
        }

        var bpRisk = HigiKioskVitalReference.calculateBpRiskForUI( $scope.systolic , $scope.diastolic);
          $scope.bpStatus = HigiKioskStorageService.saveSessionData('bpStatus', bpRisk);
        
        /*if (bpRisk == 'high' ) {
            $scope.bpRiskClass = 'result_risk high';
            $scope.bpRisk = 'global.highbp';

        }
        else if (bpRisk == 'atrisk' ) {
            $scope.bpRiskClass = 'result_risk atrisk';
            $scope.bpRisk = 'global.atriskbp';
        }
        else if (bpRisk== 'normal') {
            $scope.bpRiskClass = 'result_risk normal';
            $scope.bpRisk = 'global.normalbp';
        }
        else if (bpRisk== 'low') {
            $scope.bpRiskClass = 'result_risk low';
            $scope.bpRisk = 'global.lowbp';
        }
        else if (bpRisk== 'acceptable') {
            $scope.bpRiskClass = 'result_risk bp_acceptable';
            $scope.bpRisk = 'global.atriskbp';
        }
        else if (bpRisk== 'isolated diastolic hypertension') {
            $scope.bpRiskClass = 'result_risk atrisk';
            $scope.bpRisk = 'global.isolated_diastolic';
        }
        else if (bpRisk== 'isolated systolic hypertension') {
            $scope.bpRiskClass = 'result_risk atrisk';
            $scope.bpRisk = 'global.isolated_systolic';
        } */

        if(bpRisk == 'Normal') {
            $scope.bpRiskClass = 'result_risk normal';
            $scope.bpRisk = 'global.normalbp';
        } 
        else if(bpRisk == 'Acceptable') {
            $scope.bpRiskClass = 'result_risk bp_acceptable';
            $scope.bpRisk = 'global.atriskbp';
        }
        else if(bpRisk == 'stage 1 hypertension') {
            $scope.bpRiskClass = 'result_risk high';
            $scope.bpRisk = 'global.stage_1_hypertension';
        }
        else if(bpRisk == 'stage 2 hypertension') {
            $scope.bpRiskClass = 'result_risk high';
            $scope.bpRisk = 'global.stage_2_hypertension';
        }
        else if(bpRisk == 'Clinical Screening Recommended') {
            $scope.bpRiskClass = 'result_risk high';
            $scope.bpRisk = 'global.recheck_consult_healthcare_provider';
        }

        $scope.audioFiles = [
            {filename : 'bloodpressure03_audio01'},
            {filename : 'bloodpressure03_audio10'}
        ];

        $scope.slideTitle = 'bloodpressure1.title';
        $scope.slideSubTitle = 'bloodpressure3.results';
        $scope.bpSystolic = 'bloodpressure3.systolic';
        $scope.bpDiastolic = 'bloodpressure3.diastolic';
        $scope.bpPulse = 'bloodpressure3.pulse';
        $scope.bpUnits = 'bloodpressure3.mmhg';
        $scope.bpBpm = 'bloodpressure3.bpm';

        $scope.bp03AverageMyResults = "bloodpressure3.average.my.results";
        $scope.bp03ShowAllResults = "bloodpressure3.show.all.results";
        
        $scope.bpInformation = "bloodpressure3.information";
        $scope.bpParameter = "bloodpressure3.parameter";
        $scope.bpYourscore = "bloodpressure3.yourscore";
        $scope.bpSTATUS = "bloodpressure3.STATUS";
        $scope.bpNormalrange = "bloodpressure3.normalrange";
        $scope.bpOverallStatus = "bloodpressure3.OverallStatus";
        
        $scope.bpNORMAL = "bloodpressure3.normal";
        $scope.bpACCEPTABLE = "bloodpressure3.acceptable";
        $scope.bpHIGH = "bloodpressure3.high";
        $scope.bpLOW = "bloodpressure3.low";
        $scope.bpTestAgain = "bloodpressure3.checkagain";
        $scope.bp1stageHyper = "bloodpressure3.bp1stageHyper";
        $scope.bp2stageHyper = "bloodpressure3.bp2stageHyper";
        $scope.recheck_consult_healthcare_provider = "bloodpressure3.recheck_consult_healthcare_provider";
        
		
        $rootScope.bpRiskTemp = bpRisk;
		
        $rootScope.pulseRiskClassTemp = $scope.pulseRiskClass;

        $scope.systolicDegrees = calculateSystolicDegrees($scope.systolic);
        $scope.diastolicDegrees = calculateDiastolicDegrees($scope.diastolic);
        $scope.pulseDegrees = calculatePulseDegrees($scope.pulse);

        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        var links = HigiKioskFlow.slideLinks('HigiKioskBpController3', $scope.mode);
        //var links = HigiKioskFlow.slideLinks('HigiKioskBpController3', $scope);

        $scope.setSlideDirection($routeParams.direction);
        $scope.isvisible = true;

         //Sumithra code starts
        if($rootScope.mode == "bpw"){
                    var mode = "bpw";

        var currenttest = "Blood Pressure";
        var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
        $scope.nextSlide = nextTestPath;
        $scope.nextSlideText = "global.continue"; 
        console.log($scope.nextSlide);
        } else if($rootScope.selectedVital.length > 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;   
            if ($scope.nextSlide == "#/finish/forward") {
                $scope.nextSlideText = "global.finalResult";
            }else{
                $scope.nextSlideText = "global.continue";
            }      
        } else{
            $scope.nextSlide = "#/finish/forward";
            $scope.nextSlideText = "global.finalResult";
        }
        //$scope.nextSlide = links.next.link;
        //Sumithra code ends

        $scope.redoVisible = false;
        $scope.nextVisible = false;

        $scope.redoSlideText = 'globalbp.redo';
        $scope.redoSlide = '#/bloodpressure1/back';
        if(links.previous == null){
            $scope.prevIsVisible = false;
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        }else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
            $scope.prevIsVisible = false;
        }




        $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);
        /*$timeout(function () {
      $scope.promise2 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
    }, 3000);*/
        $scope.q.promise
            .then(function(){
                $scope.showBp = true;
                $timeout(function(){
                    $scope.showPulse = true;
                    $scope.redoVisible = true;
                    $scope.nextVisible = true;
                    //If emergency threshold, show emergency modal
                    $scope.testEmergencyThreshold();
                },750)
                $timeout(function () {
                return HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
                 }, 1000);
            });
    };

    $scope.testEmergencyThreshold = function(){
        if($scope.systolic >= HigiKioskStorageService.getSettingsValue('bp.emergency.threshold.systolic') || $scope.diastolic >= HigiKioskStorageService.getSettingsValue('bp.emergency.threshold.diastolic') ) {
            JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_hypertensiveWarning', 'app', 'rendered');
            $timeout(function(){
                $rootScope.loadModal( {id: 'infoboxbphypertensive'});
            }, 500);
        }
    };

    $scope.redoBp = function(){
        if(HigiKioskStorageService.returnSessionData('current_mode') != "bpw"){
            HigiKioskStorageService.saveSessionData('current_mode', "bp");
        }
        $scope.redoVisible = false;
        $scope.nextVisible = false;
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + 'redoBp_Button', 'button', 'pressed');
        $scope.pageClass = 'slide back';
        $timeout(function(){window.location =  $scope.redoSlide},500);
    };
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.redoVisible = false;
        $scope.setSlideDirection('forward');
        HigiKioskAnimationService.audioStop();
        $timeout(function(){window.location =  $scope.nextSlide},500);

    };

    if($scope.systolic >= 180 || $scope.diastolic >= 110) {
        $scope.showInfoboxBp();
    }

    $scope.getDiastolicClassName = function() {
        // if($scope.diastolic < 80) return 'bp_status_normal';
        // else if($scope.diastolic >= 80 && $scope.diastolic < 90) return 'bp_status_acceptable';
        // else if(($scope.diastolic >= 90 && $scope.diastolic < 100) || $scope.diastolic >= 100) return 'bp_status_high';
        // else return '';
        return '';
    }

    $scope.getSystolicClassName = function() {
        // if($scope.systolic < 130) return 'bp_status_normal';
        // else if($scope.systolic >= 130 && $scope.systolic < 140) return 'bp_status_acceptable';
        // else if(($scope.systolic >= 140 && $scope.systolic < 160) || $scope.systolic >= 160) return 'bp_status_high';
        // else return '';       
        if($scope.systolic <= 139) return "bp_status_acceptable";
        else if($scope.systolic >= 140) return "bp_status_high";            
    }

    $scope.getSystolicRange = function() {
        // if($scope.systolic < 130) return 'bp_sys_status_normal';
        // else if($scope.systolic >= 130 && $scope.systolic < 140) return 'bp_sys_status_acceptable';
        // else if(($scope.systolic >= 140 && $scope.systolic < 160) || $scope.systolic >= 160) return 'bp_sys_status_high';
        // else return '';               
        if($scope.systolic <= 120) return "bp_new_status_acceptable";
        else if($scope.systolic <= 139 && $scope.systolic > 120) return "bp_new_status_neutral";
        else if($scope.systolic >= 140) return "bp_new_status_recheck";            
    }

    $scope.getDiastolicRange = function() {
        if($scope.diastolic < 80) return 'bp_dia_status_normal';
        else if($scope.diastolic >= 80 && $scope.diastolic < 90) return 'bp_dia_status_acceptable';
        else if(($scope.diastolic >= 90 && $scope.diastolic < 100) || $scope.diastolic >= 100) return 'bp_dia_status_high';
        else return '';                
    }

    $scope.init();

}]);