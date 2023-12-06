higiKioskControllers.controller('HigiKioskInvasiveProcessController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskUtilitiesService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService){
    let socket;

        socket = new WebSocket("ws://localhost:8444/paramWS/");
		let urnResultCmd =  false;
    $scope.init = function(){
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
		$rootScope.modalWarningContent = 'Please connect the device properly.';
		$scope.while_processing_partOne = true;

		$scope.processing = "ivtProcess.processing";
		$scope.waitProcess = "ivtProcess.waitProcess";
		$scope.skipTest = 'global.skip';

        console.log($scope.mode);
        var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveProcessController', $scope.mode);
       
        console.log($rootScope.currentIvtTest);
        console.log(links);
        $scope.nextSlide = links.next.link;
		
		$rootScope.cassetImageSrc = '';

		
		socket.onopen = function(e) {
			//alert("[open] Connection established");
			//alert("Sending to server");  
			//$scope.socketConnEstablished = true;
            if($rootScope.selectedIvtListArray.length  == 0){
                return;
            }else{                 
				socket.send("connectKitFirstTime");			
            }
		};
		
		socket.onerror = function(error) {
		  //alert(`[error]`);
			if($rootScope.invasiveMock == true){
				HigiKioskStorageService.saveSessionData('dengue_IgG', "Positive");
				HigiKioskStorageService.saveSessionData('dengue_IgM', "Negative");

				HigiKioskStorageService.saveSessionData('malaria_p_v', "Negative");
				HigiKioskStorageService.saveSessionData('malaria_p_f', "Positive");

				HigiKioskStorageService.saveSessionData('hiv_I', "Negative");
				HigiKioskStorageService.saveSessionData('hiv_II', "Positive");

				HigiKioskStorageService.saveSessionData('glucose_random', "122");

				HigiKioskStorageService.saveSessionData('troponin', "Negative");

				window.location =  $scope.nextSlide;
			} else {
				$scope.showIvtWarningModalBox = true;
	            $rootScope.modalWarningContent = "Sorry, Couldn't find the device";                        
				$scope.openIvtModal = true;
				$scope.ivtModalFadeClass = "adFadeIn";
			}
		};

		var time_in_minutes = 2;
		var current_time = Date.parse(new Date());
		var deadline = new Date(current_time + time_in_minutes*60*1000);

		function time_remaining(endtime){
			var t = Date.parse(endtime) - Date.parse(new Date());
			var seconds = Math.floor( (t/1000) % 60 );
			var minutes = Math.floor( (t/1000/60) % 60 );
			var hours = Math.floor( (t/(1000*60*60)) % 24 );
			var days = Math.floor( t/(1000*60*60*24) );
			return {'total':t, 'days':days, 'hours':hours, 'minutes':minutes, 'seconds':seconds};
		}
		function run_clock(id,endtime){
			var clock = document.getElementById(id);
			function update_clock(){
				var t = time_remaining(endtime);
				clock.innerHTML = t.minutes+' '+ 'min'+' '+ t.seconds+' '+'secs';
				if(t.total<=0){ 
					clearInterval(timeinterval);
					$scope.terminateTest();
					$scope.showIvtWarningModalBox = true;
					$rootScope.modalWarningContent = "Time-out please try again..";//Time Over. Please insert tray/strip in less than 30 seconds              
					$scope.openIvtModal = true;
					$scope.ivtModalFadeClass = "adFadeIn";
				}
			}
			update_clock(); // run function once at first to avoid delay
			var timeinterval = setInterval(update_clock,1000);
		}

		
        socket.onmessage = function(event) {
            console.log("response receive from server successfully..");
            console.log(event.data);
            if(event.data){
            	if(event.data == "kitStatusCheck~1001"){
					if(($rootScope.batchCode == "" || $rootScope.batchCode == undefined || $rootScope.batchCode == null) && $rootScope.currentIvtTest == 'heamo'){
						//showing Modal popup For batch code not available in costOfVital api
						$scope.terminateTest();
						$scope.showIvtWarningModalBox = true;
						$rootScope.modalWarningContent = 'Technical Issue, Cannot recognize the device batch code';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";		
					}
					var servercmd = HigiKioskUtilitiesService.getCmd($rootScope.currentIvtTest);// $rootScope.selectedVital.ivt[ivtIndex]);
					socket.send(servercmd);	
					return 0;            		
            	}
				//alert(event.data);
                var res;
				if(urnResultCmd == true){
					//alert("urn test");
					res	= HigiKioskUtilitiesService.getRes("urnCmdForResult", event.data); 
					urnResultCmd = false;
				} else {
					//alert("fetch the response = " + event.data);
					res	= HigiKioskUtilitiesService.getRes($rootScope.currentIvtTest, event.data); 
				}
				
				//alert(res);
                if(res != ''){
                    //alert(res);
                    if($rootScope.currentIvtTest == 'urn' && res == 'urine_test_init_from_jar~Success'){
						$scope.while_processing_partOne = false;
						run_clock('clockdiv',deadline);
                        socket.send(HigiKioskUtilitiesService.getCmd("urnCmdForResult"));	
						urnResultCmd = true;						
                    }
					
					//if($rootScope.currentIvtTest != 'lip' && $rootScope.currentIvtTest != 'glc' && $rootScope.currentIvtTest != 'heamo'){
						//if(res.includes("img:")){
							var searchImg = "img:";
							var searchHeamo = "heamo";
							var searchLip = "lip";
							var searchGlc = "glc";
							var searchUrn = "urn";
							console.log("res");
							console.log(res);
							//alert("new RegExp('\\b'+searchImg+'\\b', 'i').test(res) = " + new RegExp('\\b'+searchImg+'\\b', 'i').test(res));
						if(new RegExp('\\b'+searchImg+'\\b', 'i').test(res))	{
							let baseImage = res.split("img:")[1];
							res = res.split("img:")[0].trim();
							$rootScope.cassetImageSrc = baseImage;
							console.log($rootScope.cassetImageSrc);
							// alert("Base64");
						}	
						
						console.log("after fine tune the res");
						console.log(res);
					//}
					if(res == "CR"){
						// test in-progress
					} else if(res == "IT"){ // Invalid Test
                    	$scope.terminateTest();
                        $scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = 'Invalid Test, Place the caset properly inside the tray';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";

					} //else if(res.includes('heamo')){
						else if(new RegExp('\\b'+searchHeamo+'\\b', 'i').test(res)){
						var heamoResult = res.split(" ")[1];
						HigiKioskStorageService.saveSessionData('heamoglobin', heamoResult);
						// move to result page
						$scope.terminateTest();
						window.location =  $scope.nextSlide;
					}//else if(res.includes('lip')){
						else if(new RegExp('\\b'+searchLip+'\\b', 'i').test(res)){
							//alert("inside the lip data store part");
						var lipResult = (res.split("lip ")[1]).split();
						console.log(lipResult);
						console.log(typeof lipResult);
						var LipFinalRes =  JSON.parse(lipResult);
					
						HigiKioskStorageService.saveSessionData('lipid_profile_tc', (LipFinalRes[0].toFixed(1)).toString());
                        HigiKioskStorageService.saveSessionData('lipid_profile_hg', (LipFinalRes[2].toFixed(1)).toString());
                        HigiKioskStorageService.saveSessionData('lipid_profile_tg', (LipFinalRes[1].toFixed(1)).toString());
                        HigiKioskStorageService.saveSessionData('lipid_profile_ldl', (LipFinalRes[3].toFixed(1)).toString());
                        $scope.terminateTest();
						// move to result page lipid_profile_tc lipid_profile_hg lipid_profile_ldl lipid_profile_tg
						window.location =  $scope.nextSlide;
					} //else if(res.includes('glc')){
						else if(new RegExp('\\b'+searchGlc+'\\b', 'i').test(res)){
						var glcResult = res.split(" ")[1];
                        if($rootScope.glcCustomOption === 'glcFas'){
                            HigiKioskStorageService.saveSessionData('glucose_fasting', glcResult);
                        } else if($rootScope.glcCustomOption === 'glcpos'){
                            HigiKioskStorageService.saveSessionData('glucose_post_prandial', glcResult);
                        } else{
                            HigiKioskStorageService.saveSessionData('glucose_random', glcResult);
                        }
                        $scope.terminateTest();
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "Dengue_IgG Negative & Dengue_IgM Positive" || res == "Dengue_IgG Positive & Dengue_IgM Negative" || res == "Dengue_IgG Negative & Dengue_IgM Negative" || res == "Dengue_IgG Positive & Dengue_IgM Positive"){
						var split = res.split(" & ");
						var Dengue_IgG =  split[0].split(" ");
						var Dengue_IgM =  split[1].split(" ");
						HigiKioskStorageService.saveSessionData('dengue_IgG', Dengue_IgG[1]);
						HigiKioskStorageService.saveSessionData('dengue_IgM', Dengue_IgM[1]);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "P.v Positive & P.f Positive" || res == "P.v Negative & P.f Negative" || res == "P.v Positive & P.f Negative" || res == "P.v Negative & P.f Positive"){
						var split = res.split(" & ");
						var Malaria_pv =  split[0].split(" ");
						var Malaria_pf =  split[1].split(" ");
						HigiKioskStorageService.saveSessionData('malaria_p_v', Malaria_pv[1]);
						HigiKioskStorageService.saveSessionData('malaria_p_f', Malaria_pf[1]);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "HIV-I Positive & HIV-II Positive" || res == "HIV-I Negative & HIV-II Negative" || res == "HIV-I Positive & HIV-II Negative" || res == "HIV-I Negative & HIV-II Positive"){
						var split = res.split(" & ");
						var Hiv_1 =  split[0].split(" ");
						var Hiv_2 =  split[1].split(" ");
						HigiKioskStorageService.saveSessionData('hiv_I', Hiv_1[1]);
						HigiKioskStorageService.saveSessionData('hiv_II', Hiv_2[1]);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "HEPA_HCV is Positive" || res == "HEPA_HCV is Negative"){
						var split = res.split(" is ");
						var Hcv =  split[1];
						HigiKioskStorageService.saveSessionData('hcv', Hcv);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "Troponin is Positive" || res == "Troponin is Negative"){
						var split = res.split(" is ");
						var Trop =  split[1];
						HigiKioskStorageService.saveSessionData('troponin', Trop);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "Syphilis is Positive" || res == "Syphilis is Negative"){
						var split = res.split(" is ");
						var Syph =  split[1];
						HigiKioskStorageService.saveSessionData('syphilis', Syph);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == "Pregnancy is Positive" || res == "Pregnancy is Negative"){
						//alert("split the value before move to result page");
						var split = res.split(" is ");
						var Preg =  split[1];
						HigiKioskStorageService.saveSessionData('pregnancy', Preg);
						// move to result page
						window.location =  $scope.nextSlide;
					}// else if(res.includes('urn')){
						else if(new RegExp('\\b'+searchUrn+'\\b', 'i').test(res))	{
						var split = res.split("urn ")[1];
						var urine_leukocytes = split.split(',')[0].split(' : ')[1].split(' ')[0];
                        var urine_nitrite = split.split(',')[1].split(' : ')[1].split(' ')[0];
                        var urine_urobilinogen = split.split(',')[2].split(' : ')[1].split(' ')[0];
                        var urine_protein = split.split(',')[3].split(' : ')[1].split(' ')[0];
                        var urine_ph = split.split(',')[4].split(' : ')[1].split(' ')[0];
                        var urine_blood = split.split(',')[5].split(' : ')[1].split(' ')[0];
                        var urine_specific_gravity = split.split(',')[6].split(' : ')[1].split(' ')[0];
                        var urine_ketone = split.split(',')[7].split(' : ')[1].split(' ')[0];
                        var urine_bilirubin = split.split(',')[8].split(' : ')[1].split(' ')[0];
                        var urine_glucose = split.split(',')[9].split(' : ')[1].split(' ')[0];
                        
                        HigiKioskStorageService.saveSessionData('urine_leukocytes', urine_leukocytes);
                        HigiKioskStorageService.saveSessionData('urine_nitrite', urine_nitrite);
                        HigiKioskStorageService.saveSessionData('urine_urobilinogen', urine_urobilinogen);
                        HigiKioskStorageService.saveSessionData('urine_protein', urine_protein);
                        HigiKioskStorageService.saveSessionData('urine_ph', urine_ph);
                        HigiKioskStorageService.saveSessionData('urine_blood', urine_blood);
                        HigiKioskStorageService.saveSessionData('urine_specific_gravity', urine_specific_gravity);
                        HigiKioskStorageService.saveSessionData('urine_ketone', urine_ketone);
                        HigiKioskStorageService.saveSessionData('urine_bilirubin', urine_bilirubin);
                        HigiKioskStorageService.saveSessionData('urine_glucose', urine_glucose);
						// move to result page
						window.location =  $scope.nextSlide;
					} else if(res == 'DE'){
						$scope.terminateTest();
                        $scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = 'Please connect the device properly.';                        
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
                        
                    } else if(res == "PP"){
						$scope.showIvtWarningModalBox = true;
						$scope.avoidPageRedirect = true;
						$rootScope.modalWarningContent = 'Press the device power button and follow the deivice instrunction';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";						
					}else if(res == 'DC'){
                    	$scope.terminateTest();
                        $scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = 'Please plug-out & plug-in the device.';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
                        
                    }else if(res == 'T_ON'){
						console.log("rootScope.currentIvtTest = " + $rootScope.currentIvtTest);
						if($rootScope.currentIvtTest == "lip" || $rootScope.currentIvtTest == "glc" ){
	                        $scope.showIvtWarningModalBox = true;
	                        $scope.avoidPageRedirect = false;
	                        $rootScope.modalWarningContent = "Sorry, Couldn't find the device";
							$scope.openIvtModal = true;
							$scope.ivtModalFadeClass = "adFadeIn";
                    	} else {
	                    	$scope.terminateTest();
	                        $scope.showIvtWarningModalBox = true;
	                        $rootScope.modalWarningContent = "Sorry, Couldn't find the device";
							$scope.openIvtModal = true;
							$scope.ivtModalFadeClass = "adFadeIn";
                        }                        
                    }else if(res == 'NO_IMG'){
                    	$scope.terminateTest();
                        $scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = 'Some technical issue...Please try again.';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
                        
                    }else if(res == 'PPR_SLIDEIN'){
                    	$scope.terminateTest();
                        $scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = 'Please check the optical reader tray & fix it properly.';
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
                        
                    } else if(res == 'RD'){
						$scope.terminateTest();
						$scope.showIvtWarningModalBox = true;
                        $rootScope.modalWarningContent = "Result couldn't be processed... Please try again ";              
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
					}else if(res == 'S-ON'){
						$scope.terminateTest();
						$scope.showIvtWarningModalBox = true;
						$rootScope.modalWarningContent = "Switch-ON the device Again";//Time Over. Please insert tray/strip in less than 30 seconds              
						$scope.openIvtModal = true;
						$scope.ivtModalFadeClass = "adFadeIn";
					}
                }else{
                    //alert("Some technical issue...Please try again");
                }
            }
        };


        /*$scope.changePage = setTimeout(function() {
            window.location =  $scope.nextSlide;
        }, 4000);*/

    }

    $scope.terminateTest = function(){
    	if($rootScope.currentIvtTest == "lip" || $rootScope.currentIvtTest == "glc"){
    		//socket.send("closeGlucoseLipidPort");
    	} else if($rootScope.currentIvtTest == "heamo"){
    		socket.send("turnOFFHb");
    	} else {
    		//optical reader deivce not required
    	}
    } 

    $scope.skipTestClick = function(){
        
        if($scope.mode == "bpw"){
            $timeout(function(){
                if($rootScope.selectedIvtListArray.length == 1){
                    var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveResultController', $scope.mode);
                   // clearTimeout($scope.changePage);
				   //socket.onclose = function(){}
                    window.location = links.next.link;
                }else {
                    var mode = "bpw";
                    var currenttest = "ivt";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    console.log(nextTestPath);
                    $rootScope.selectedIvtListArray.splice(0, 1);
                    //clearTimeout($scope.changePage);
					//socket.onclose = function(){}
                    window.location = nextTestPath;
                    
                }
            },0,false);
        } else if($rootScope.selectedVital.length > 1 && $rootScope.selectedIvtListArray.length == 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            
            $timeout(function(){
                //clearTimeout($scope.changePage);
				//socket.onclose = function(){}
                window.location =  nextTestPath;
            },500);         
        } else if($rootScope.selectedVital.length <= 1 && $rootScope.selectedIvtListArray.length > 1){
            $timeout(function(){
                $rootScope.selectedIvtListArray.splice(0, 1);
               // clearTimeout($scope.changePage);
			   //socket.onclose = function(){}
                window.location = '#/invasiveInstruction/forward';
            },0,false);
        } else{
            console.log("End");
           // clearTimeout($scope.changePage);
		   //socket.onclose = function(){}
            window.location = "#/finish/forward";
        }
    }
	
	$scope.ivtWarningModalButtonClicked = function(){
        if($scope.avoidPageRedirect){
        	$scope.avoidPageRedirect = false;
        	$scope.openIvtModal = false;
        }else if($rootScope.currentIvtTest == 'heamo' && $rootScope.modalWarningContent == 'Technical Issue, Cannot recognize the device batch code'){
			// $scope.openIvtModal = false;
			$scope.nextButtonOut();
		}else {
        	$scope.openIvtModal = false;
        	window.location = '#/invasiveInstruction/forward';
    	}
    }

	$scope.nextButtonOut = function(){
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

    $scope.init();
}]);
