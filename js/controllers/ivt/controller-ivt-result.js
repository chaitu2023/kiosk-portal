higiKioskControllers.controller('HigiKioskInvasiveResultController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiKioskUtilitiesService){

    $scope.init = function(){
        console.log("Result");

		$scope.ivtnxtBtnTxt = "global.continue";
		$scope.redo = "ivtResult.redo";
		$scope.test = "ivtResult.test";
		$scope.parameter = "ivtResult.parameter";
		$scope.yourScore = "ivtResult.yourScore";
		$scope.dengParmTitle1 = "ivtResult.dengParmTitle1";
    	$scope.dengParmSub1 = "ivtResult.dengParmSub1";
		$scope.dengParmTitle2 = "ivtResult.dengParmTitle2";
    	$scope.dengParmSub2 = "ivtResult.dengParmSub2";
		$scope.malParmTitle1 = "ivtResult.malParmTitle1";
    	$scope.malParmSub1 = "ivtResult.malParmSub1";
		$scope.malParmTitle2 = "ivtResult.malParmTitle2";
    	$scope.malParmSub2 = "ivtResult.malParmSub2";
		$scope.hivI = "ivtResult.hivI";
		$scope.hivII = "ivtResult.hivII";
		$scope.imageText = "ivtResult.imageText";
		$scope.heamoglobinText = "ivtResult.heamoglobin";
		$scope.testName = "ivtResult.testName";
		$scope.testResult = "ivtResult.testResult";
		$scope.scaleText = "ivtResult.scaleText";
		$scope.normalText = "ivtResult.normalText";
		$scope.lowText = "ivtResult.lowText";
		$scope.highText = "ivtResult.highText";
		$scope.preDiabetesText = "ivtResult.preDiabetesText";
		$scope.diabetesText = "ivtResult.diabetesText";
		$scope.resultText = "ivtResult.resultText";
		$scope.statusText = "ivtResult.statusText";
		$scope.normalRange = "ivtResult.normalRange";
		$scope.tcText = "ivtResult.tcText";
		$scope.hdlText = "ivtResult.hdlText";
		$scope.ldlText = "ivtResult.ldlText";
		$scope.tgText = "ivtResult.tgText";
		$scope.totalCholesText = "ivtResult.totalCholesText";
		$scope.highDensText = "ivtResult.highDensText";
		$scope.lowDensText = "ivtResult.lowDensText";
		$scope.triglyText = "ivtResult.triglyText";
		$scope.glcRanText = "ivtResult.glcRanText";
		$scope.glcFastText = "ivtResult.glcFastText";
		$scope.glcPPText = "ivtResult.glcPPText";
		$scope.leukoText = "ivtResult.leukoText";
		$scope.nitriteText = "ivtResult.nitriteText";
		$scope.urobiliText = "ivtResult.urobiliText";
		$scope.proteinText = "ivtResult.proteinText";
		$scope.phText = "ivtResult.phText";
		$scope.bloodText = "ivtResult.bloodText";
		$scope.specificGravText = "ivtResult.specificGravText";
		$scope.ketoneText = "ivtResult.ketoneText";
		$scope.bilirubText = "ivtResult.bilirubText";
		$scope.glcText = "ivtResult.glcText";
		$scope.positiveText = "ivtResult.positiveText";
		$scope.healthyText = "ivtResult.healthyText";
		$scope.consultDrText = "ivtResult.consultDrText";
		$scope.negativeText = "ivtResult.negativeText"

		console.log($rootScope.currentIvtTest);
		console.log($rootScope.selectedIvtListArray[$rootScope.selectedIvtListArray.length-1]);
		console.log($rootScope.selectedVital.length);
		if($rootScope.currentIvtTest == $rootScope.selectedIvtListArray[$rootScope.selectedIvtListArray.length-1] && $rootScope.selectedVital.length == 1){
				$scope.ivtnxtBtnTxt = "ivtResult.finalResult";
		}
		
		$scope.overallStatusResult = '';
		$scope.overallStatusResultText = "";
		$scope.gender = HigiKioskStorageService.returnSessionData('gender');
		/*
		$scope.ivtLipResult = [
            {'label' : 'TC', 'name': 'Total Cholesterol', 'value' : '', 'unit' : 'mg/dL'},
            {'label' : 'HDL', 'name': 'High density lipoprotein Choleterol', 'value' : '', 'unit' : 'mg/dL'},
            {'label' : 'LDL', 'name': 'Low density lipoprotein Choleterol', 'value' : '', 'unit' : 'mg/dL'},
            {'label' : 'TG', 'name': 'Triglycerides', 'value' : '', 'unit' : 'mg/dL'}
        ];*/
        $scope.ivtLipResult = [
            {'id': 'tc', 'label' : $scope.tcText, 'name': $scope.totalCholesText, 'value' : '', 'unit' : 'mg/dL', 'status' : '', 'nrfRange' : 'Below 200'},
            {'id': 'hdl', 'label' : $scope.hdlText, 'name': $scope.highDensText, 'value' : '', 'unit' : 'mg/dL', 'status' : '', 'nrfRange' : 'Above 60'},
            {'id': 'ldl', 'label' : $scope.ldlText, 'name': $scope.lowDensText, 'value' : '', 'unit' : 'mg/dL', 'status' : '', 'nrfRange' : 'Below 100'},
            {'id': 'tg', 'label' : $scope.tgText, 'name': $scope.triglyText, 'value' : '', 'unit' : 'mg/dL', 'status' : '', 'nrfRange' : 'Below 150'}
        ];
        $scope.ivtGlcResult = [
            {'label' : $scope.glcRanText, 'value' : 'Not Taken', 'unit' : 'mg/dL'},
            {'label' : $scope.glcFastText, 'value' : 'Not Taken', 'unit' : 'mg/dL'},
            {'label' : $scope.glcPPText, 'value' : 'Not Taken', 'unit' : 'mg/dL'}
        ];
    
        $scope.ivtUrnResultTable1 = [
            {'label' : $scope.leukoText, 'value' : '', 'unit' : 'Leu/µL'},
            {'label' : $scope.nitriteText, 'value' : '', 'unit' : ''},
            {'label' : $scope.urobiliText, 'value' : '', 'unit' : 'mg/dL'},
            {'label' : $scope.proteinText, 'value' : '', 'unit' : 'mg/dL'},
            {'label' : $scope.phText, 'value' : '', 'unit' : ''},
        ];
    
        $scope.ivtUrnResultTable2 = [
            {'label' : $scope.bloodText, 'value' : '', 'unit' : 'Ery/µL'},
            {'label' : $scope.specificGravText, 'value' : '', 'unit' : ''},
            {'label' : $scope.ketoneText, 'value' : '', 'unit' : 'mg/dL'},
            {'label' : $scope.bilirubText, 'value' : '', 'unit' : 'mg/dL'},
            {'label' : $scope.glcText, 'value' : '', 'unit' : 'mg/dL'},
        ];
		
		console.log($rootScope.cassetImageSrc);
		//alert("Result Img");
		
		$scope.dengue_IgG = HigiKioskStorageService.returnSessionData('dengue_IgG');
		$scope.dengue_IgM = HigiKioskStorageService.returnSessionData('dengue_IgM');
		
		$scope.Malaria_pv = HigiKioskStorageService.returnSessionData('malaria_p_v');
		$scope.Malaria_pf = HigiKioskStorageService.returnSessionData('malaria_p_f');
		
		$scope.hiv_I = HigiKioskStorageService.returnSessionData('hiv_I');
		$scope.hiv_II = HigiKioskStorageService.returnSessionData('hiv_II');
		
		$scope.hcv = HigiKioskStorageService.returnSessionData('hcv');
		
		$scope.troponin = HigiKioskStorageService.returnSessionData('troponin');
		
		$scope.syphilis = HigiKioskStorageService.returnSessionData('syphilis');
		$scope.Preg = HigiKioskStorageService.returnSessionData('pregnancy');
		
		if($rootScope.currentIvtTest == "deng" && $scope.dengue_IgG !== undefined){
			if($scope.dengue_IgG === "Positive" && $scope.dengue_IgM === "Positive"  ){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else if($scope.dengue_IgG === "Negative" && $scope.dengue_IgM === "Negative"){
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			} else {
				$scope.overallStatusResult = 'CONSULT Dr.';
				$scope.overallStatusResultText = $scope.consultDrText;
			}
		}
			
		if($rootScope.currentIvtTest == "mal" && $scope.Malaria_pv !== undefined){
			if($scope.Malaria_pv === "Positive" && $scope.Malaria_pf === "Positive"  ){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else if($scope.Malaria_pv === "Negative" && $scope.Malaria_pf === "Negative"){
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			} else {
				$scope.overallStatusResult = 'CONSULT Dr.';
				$scope.overallStatusResultText =  $scope.consultDrText;
			}
		}
		
		if($rootScope.currentIvtTest == "hiv" && $scope.hiv_I !== undefined){
			if($scope.hiv_I === "Positive" && $scope.hiv_II === "Positive"  ){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else if($scope.hiv_I === "Negative" && $scope.hiv_II === "Negative"){
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			} else {
				$scope.overallStatusResult = 'CONSULT Dr.';
				$scope.overallStatusResultText =  $scope.consultDrText;
			}
		}
		
		if($rootScope.currentIvtTest == "hcv" && $scope.hcv !== undefined){
			if($scope.hcv === "Positive"){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else {
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			}
		}
		
		if($rootScope.currentIvtTest == "trop" && $scope.troponin !== undefined){
			if($scope.troponin === "Positive"){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else {
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			}
		}
		
		if($rootScope.currentIvtTest == "syph" && $scope.syphilis !== undefined){
			if($scope.syphilis === "Positive"){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else {
				$scope.overallStatusResult = 'HEALTHY';
				$scope.overallStatusResultText = $scope.healthyText;
			}
		}
		
		if($rootScope.currentIvtTest == "preg" && $scope.Preg !== undefined){
			if($scope.Preg === "Positive"){
				$scope.overallStatusResult = 'POSITIVE';
				$scope.overallStatusResultText = $scope.positiveText;
			} else {
				$scope.overallStatusResult = 'NEGATIVE';
				$scope.overallStatusResultText = $scope.negativeText;
			}
		}
		$scope.heamoglobin = HigiKioskStorageService.returnSessionData('heamoglobin');
        if($rootScope.currentIvtTest == "heamo" && $scope.heamoglobin !== undefined){
			var classValue = HigiKioskUtilitiesService.calculateInvasiveHeamoglobin($scope.gender, $scope.heamoglobin);
			let bindValue = '';
			if(classValue == 'Very Low') bindValue = 'Very Low';
			if(classValue == 'Low') bindValue = $scope.lowText;
			if(classValue == 'Normal') bindValue = $scope.normalText;
			if(classValue == 'Acceptable') bindValue = 'Acceptable';
			if(classValue == 'High') bindValue = $scope.highText;
			$scope.overallStatusResult = classValue;
			$scope.overallStatusResultText = bindValue;
            $scope.heamoglobinValue = $scope.heamoglobin;
			$scope.heamoStatus = classValue;
			HigiKioskStorageService.saveSessionData('heamoglobin_class',classValue);
        }

        $scope.lipTc = HigiKioskStorageService.returnSessionData('lipid_profile_tc');
        $scope.liphg = HigiKioskStorageService.returnSessionData('lipid_profile_hg');
        $scope.liptg = HigiKioskStorageService.returnSessionData('lipid_profile_tg');
        $scope.lipldl = HigiKioskStorageService.returnSessionData('lipid_profile_ldl');

        /*
        if($scope.lipTc != undefined){
            $scope.ivtLipResult[0]['value'] = $scope.lipTc;
            $scope.ivtLipResult[1]['value'] = $scope.liphg;
            $scope.ivtLipResult[2]['value'] = $scope.liptg;
            $scope.ivtLipResult[3]['value'] = $scope.lipldl;
        }
        */
        if($rootScope.currentIvtTest == "lip" && $scope.lipTc != undefined){
            $scope.ivtLipResult[0]['value'] = $scope.lipTc;
            $scope.ivtLipResult[0]['status'] = HigiKioskUtilitiesService.calculateInvasiveTotalCholestrol($scope.lipTc);
			HigiKioskStorageService.saveSessionData('lipid_profile_tc_class',$scope.ivtLipResult[0]['status']);

            $scope.ivtLipResult[1]['value'] = $scope.liphg;
            $scope.ivtLipResult[1]['status'] = HigiKioskUtilitiesService.calculateInvasiveHDL($scope.liphg);
			HigiKioskStorageService.saveSessionData('lipid_profile_hg_class',$scope.ivtLipResult[1]['status']);			

            // $scope.ivtLipResult[2]['value'] = $scope.liptg;
            // $scope.ivtLipResult[2]['status'] = HigiKioskUtilitiesService.calculateInvasiveTriglycerides($scope.liptg);
			// HigiKioskStorageService.saveSessionData('lipid_profile_tg_class',$scope.ivtLipResult[1]['status']);

            $scope.ivtLipResult[2]['value'] = $scope.lipldl;
            $scope.ivtLipResult[2]['status'] = HigiKioskUtilitiesService.calculateInvasiveLDL($scope.lipldl);
			HigiKioskStorageService.saveSessionData('lipid_profile_ldl_class',$scope.ivtLipResult[2]['status']);

			$scope.ivtLipResult[3]['value'] = $scope.liptg;
            $scope.ivtLipResult[3]['status'] = HigiKioskUtilitiesService.calculateInvasiveTriglycerides($scope.liptg);
			HigiKioskStorageService.saveSessionData('lipid_profile_tg_class',$scope.ivtLipResult[3]['status']);	
        }
		
		$scope.glucose_fasting = HigiKioskStorageService.returnSessionData('glucose_fasting');
		$scope.glucose_post_prandial = HigiKioskStorageService.returnSessionData('glucose_post_prandial');
		$scope.glucose_random = HigiKioskStorageService.returnSessionData('glucose_random');
		if($rootScope.currentIvtTest == "glc"){
		    if($scope.glucose_fasting != undefined){
				var classValue = HigiKioskUtilitiesService.calculateInvasiveGlucoseFasting($scope.glucose_fasting);
				let bindValue = '';
				if(classValue == 'Normal') bindValue = $scope.normalText;
				if(classValue == 'Acceptable') bindValue = 'Acceptable';
				if(classValue == 'High') bindValue = $scope.highText;
				$scope.overallStatusResult = classValue;
				$scope.overallStatusResultText = bindValue;
				$scope.gluStatus = classValue;
		        $scope.ivtGlcResult[1]['value'] = $scope.glucose_fasting;
				HigiKioskStorageService.saveSessionData('glucose_fasting_class',classValue);
		    } else if($scope.glucose_post_prandial != undefined){
				var classValue = HigiKioskUtilitiesService.calculateInvasiveGlucosePrandial($scope.glucose_post_prandial);
				let bindValue = '';
				if(classValue == 'Normal') bindValue = $scope.normalText;
				if(classValue == 'Pre-Diabetes') bindValue = $scope.preDiabetesText;
				if(classValue == 'Diabetic') bindValue = $scope.diabetesText;
				$scope.overallStatusResult = classValue;
				$scope.overallStatusResultText = bindValue;
				$scope.gluStatus = classValue;
		        $scope.ivtGlcResult[2]['value'] = $scope.glucose_post_prandial;
				HigiKioskStorageService.saveSessionData('glucose_post_prandial_class',classValue);
		    } else if($scope.glucose_random != undefined){
				var classValue = HigiKioskUtilitiesService.calculateInvasiveGlucoseRandom($scope.glucose_random);
				let bindValue = '';
				if(classValue == 'Normal') bindValue = $scope.normalRange;
				if(classValue == 'Pre-Diabetes') bindValue = $scope.preDiabetesText;
				if(classValue == 'Diabetic') bindValue = $scope.diabetesText;
				$scope.overallStatusResult = classValue;
				$scope.overallStatusResultText = bindValue;
				$scope.gluStatus = classValue;
		        $scope.ivtGlcResult[0]['value'] = $scope.glucose_random;
				HigiKioskStorageService.saveSessionData('glucose_random_class',classValue);
		    }
    	}

        $scope.urine_leukocytes = HigiKioskStorageService.returnSessionData('urine_leukocytes');
        $scope.urine_nitrite = HigiKioskStorageService.returnSessionData('urine_nitrite');
        $scope.urine_urobilinogen = HigiKioskStorageService.returnSessionData('urine_urobilinogen');
        $scope.urine_protein = HigiKioskStorageService.returnSessionData('urine_protein');
        $scope.urine_ph = HigiKioskStorageService.returnSessionData('urine_ph');
        $scope.urine_blood = HigiKioskStorageService.returnSessionData('urine_blood');
        $scope.urine_specific_gravity = HigiKioskStorageService.returnSessionData('urine_specific_gravity');
        $scope.urine_ketone = HigiKioskStorageService.returnSessionData('urine_ketone');
        $scope.urine_bilirubin = HigiKioskStorageService.returnSessionData('urine_bilirubin');
        $scope.urine_glucose = HigiKioskStorageService.returnSessionData('urine_glucose');

        if($rootScope.currentIvtTest == "urn" && $scope.urine_leukocytes != undefined){
            $scope.ivtUrnResultTable1[0]['value'] = this.urineTestValueFineTune($scope.urine_leukocytes);
            $scope.ivtUrnResultTable1[1]['value'] = this.urineTestValueFineTune($scope.urine_nitrite);
            $scope.ivtUrnResultTable1[2]['value'] = this.urineTestValueFineTune($scope.urine_urobilinogen);
            $scope.ivtUrnResultTable1[3]['value'] = this.urineTestValueFineTune($scope.urine_protein);
            $scope.ivtUrnResultTable1[4]['value'] = this.urineTestValueFineTune($scope.urine_ph);

            $scope.ivtUrnResultTable2[0]['value'] = this.urineTestValueFineTune($scope.urine_blood);
            $scope.ivtUrnResultTable2[1]['value'] = this.urineTestValueFineTune($scope.urine_specific_gravity);
            $scope.ivtUrnResultTable2[2]['value'] = this.urineTestValueFineTune($scope.urine_ketone);
            $scope.ivtUrnResultTable2[3]['value'] = this.urineTestValueFineTune($scope.urine_bilirubin);
            $scope.ivtUrnResultTable2[4]['value'] = this.urineTestValueFineTune($scope.urine_glucose);
        }
	
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
        console.log($scope.mode);
        var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveResultController', $scope.mode);
       
        console.log(links);
        // $scope.nextSlide = links.next.link;

    }
	$scope.urineTestValueFineTune = function(urineTestVal){
		let fintueValue = "";
		if(urineTestVal != undefined){
		  if(urineTestVal.includes("+")){
			fintueValue = "Present";
		  } else if(urineTestVal.includes("-")){
			fintueValue = "Absent";
		  } else if(urineTestVal.trim().length == 0){ 
			fintueValue = "Nil";
		  } else {
			fintueValue = urineTestVal;
		  }
		}else {
		  fintueValue = "Nil";
		}
		return fintueValue;
	}
    $scope.nextButtonOut = function(){
		//$rootScope.removeActiveIvt($rootScope.selectedIvtListArray[0]);
        /*$rootScope.selectedIvtListArray.splice(0, 1);
        if($rootScope.selectedVital.length > 1 || $rootScope.selectedVital.includes('bpw')){
            if($rootScope.selectedIvtListArray.length > 0){
        
                console.log($rootScope.selectedIvtListArray);
                $scope.nextSlide = '#/invasiveInstruction/forward';
            }else{
                //var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveResultController', $scope.mode);
                //var nextTestPath = links.next.link;
                // if(nextTestPath == '#/finish/forward'){
                    // $scope.nextSlide = nextTestPath;
                // }else{
                    //$scope.nextSlide = nextTestPath;
                // }
                	if($rootScope.selectedVital.includes('bpw')){
                		var currenttest;
                        $scope.nextSlide = HigiKioskFlow.nextTest($rootScope.mode,currenttest);
                	} else {
                		$rootScope.mode = $rootScope.selectedVital[1];
                		if($rootScope.mode == "w") {
                            $scope.nextSlide = "#/weight1/forward";
                        } else if ($rootScope.mode == "bp") {
                           $scope.nextSlide = "#/bloodpressure1/forward";
                        } else if ($rootScope.mode == "ekg") {
                            $scope.nextSlide = "#/zugecgmode/forward";
                        } else if ($rootScope.mode == "bmc") {
                            $scope.nextSlide = "#/weight1/forward";
                        } else if ($rootScope.mode == "spo2") {
                            $scope.nextSlide = "#/spotwo1/forward";
                        } else if ($rootScope.mode == "temp") {
                            $scope.nextSlide = "#/temp1/forward";
                        }
                	}

            }
        }else if($rootScope.selectedIvtListArray.length > 0){
            console.log($rootScope.selectedIvtListArray);
            window.location = '#/invasiveInstruction/forward';
        }
        else{
            window.location = '#/finish/forward';
        }
        //window.location =  $scope.nextSlide;
*/
    	if($rootScope.selectedIvtListArray.length == 1){
    		$rootScope.selectedIvtListArray = [];	
    	} else {
    		$rootScope.selectedIvtListArray.splice(0, 1);
    	}
		
        if($rootScope.selectedIvtListArray.length > 0){
        	$scope.nextSlide = '#/invasiveInstruction/forward';	
        } else if($rootScope.selectedIvtListArray.length == 0 && $rootScope.selectedVital.includes('ivt') && $rootScope.selectedVital.length == 1){
        	$scope.nextSlide = '#/finish/forward';
        } else { 
        	if($rootScope.selectedVital.includes('bpw')){
        		$rootScope.mode = "bpw";
        		HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
        		if($rootScope.hardwareAvailability["Blood Pressure"] == true){
        			$scope.nextSlide = "#/bloodpressure1/forward";
        		} else if($rootScope.hardwareAvailability["Weight Scale"] == true){
					$scope.nextSlide = "#/weight1/forward";
        		} else if($rootScope.hardwareAvailability["Body Composition"] == true && $rootScope.hardwareAvailability["SwitchHardware"] == true){
        			$scope.nextSlide = "#/weight1/forward";
        		} else if($rootScope.hardwareAvailability["SPo2"] == true){
        			$scope.nextSlide = "#/spotwo1/forward";
        		} else if($rootScope.hardwareAvailability["temp"] == true){
        			$scope.nextSlide = "#/temp1/forward";
        		} else if($rootScope.hardwareAvailability["ECG"] == true && $rootScope.hardwareAvailability["SwitchHardware"] == true){
        			$scope.nextSlide = "#/zugecgmode/forward";
        		}
        		
	        	/*var currenttest = "";
	        	alert($rootScope.mode);
	        	alert(currenttest);
	           	$scope.nextSlide = HigiKioskFlow.nextTest($rootScope.mode,currenttest);
	           	alert("next page url = " + $scope.nextSlide); */
        	} else {
        		$rootScope.mode = $rootScope.selectedVital[1];        	
		        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
				if($rootScope.mode == "w") {
		            $scope.nextSlide = "#/weight1/forward";
		        } else if ($rootScope.mode == "bp") {
		           $scope.nextSlide = "#/bloodpressure1/forward";
		        } else if ($rootScope.mode == "ekg") {
		            $scope.nextSlide = "#/zugecgmode/forward";
		        } else if ($rootScope.mode == "bmc") {
		            $scope.nextSlide = "#/weight1/forward";
		        } else if ($rootScope.mode == "spo2") {
		            $scope.nextSlide = "#/spotwo1/forward";
		        } else if ($rootScope.mode == "temp") {
		            $scope.nextSlide = "#/temp1/forward";
		        }
        	}
        }
        window.location = $scope.nextSlide;
    }

    $scope.redoIvt = function(){
        window.location =  '#/invasiveInstruction/forward';
    }


    $scope.init();

}]);
