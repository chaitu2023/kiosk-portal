var higiServices = angular.module("higiKioskUi");

higiServices.factory('HigiApiService', ['$http' , '$rootScope', '$route', 'HigiKioskStorageService', 'HigiKioskUtilitiesService' , function($http, $rootScope, $route, HigiKioskStorageService, HigiKioskUtilitiesService) {
    return {
        checkEmailExist : function(field, emailExists, emailDoesNotExist, error){
            $rootScope.stopSessionTimeout();
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.EmailUsedAsync(field, emailDoesNotExist, emailExists, error);

        },
        UserInfoInit : function (getSessionData) {
            var user = new HigiUser();

            if (getSessionData('gender') != undefined) {
                user.gender = getSessionData('gender');
            }

            if (getSessionData('height') != undefined) {
                user.heightMeters = getSessionData('height');
            }

            if (getSessionData('birthdate') != undefined) {
                user.dateOfBirth = getSessionData('birthdate');
            }

            return user;
        },

        qLoginAsync : function(username, password, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            //Check for final results screen, if so, create checkin to go with
            $rootScope.stopSessionTimeout();
            if(HigiKioskStorageService.returnSessionData('challengeModalAd') != undefined){
                var challengeId = HigiKioskStorageService.returnSessionData('challengeModalAd').challengeId;
                var joinId = HigiKioskStorageService.returnSessionData('challengeModalAd').joinId;
                var challengeObj = {"challengeId" : challengeId, "joinId" : joinId};
            } else {
                var challengeObj = {"challengeId" : null, "joinId" : null};
            }
            HigiApi.QLoginAsync(username,password, challengeObj, success, error);
        },

        getTeleConsultData : function(ihl_id, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getTeleConsultData(ihl_id, success, error);
        },

        getDoctorAvailabilityData : function(ihl_consultant_id, vendor_id, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getDoctorAvailabilityData(ihl_consultant_id, vendor_id, success, error);
        },

        getDoctorStatus: function(doctor_ids, success, error){
            HigiApi.getDoctorStatus(doctor_ids, success, error);
        },

        consultantAppointmentCallStatusUpdate: function(data = {}, success, error){
            HigiApi.consultantAppointmentCallStatusUpdate(data, success, error);
        },

        consultantAppointmentStatusUpdate: function(data = {}, success, error){
            HigiApi.consultantAppointmentStatusUpdate(data, success, error);
        },

        CreateUserAsync : function(username_input, password_input, terms_filename, privacy_policy_filename, userObject, success, error){
            $rootScope.stopSessionTimeout();
            HigiApi.CreateUserAsync(username_input, password_input, terms_filename, privacy_policy_filename , userObject, success, error);
        },
        CreateEarnditUser : function(data, success, error){
            HigiApi.CreateEarnditUser(data, success, error);
        },
        GetEarnditChallenge : function(challengeObject, success, error){
            $rootScope.cachedChallengeObject = $rootScope.cachedChallengeObject || new Object;
            if($rootScope.cachedChallengeObject.response != undefined){
                success($rootScope.cachedChallengeObject);
            }else {
                var successCallback = function(response){
                    $rootScope.cachedChallengeObject = response;
                    success(response);
                };
                HigiApi.GetEarnditChallenge(challengeObject, successCallback, error);
            }

        },GetEarnditChallengeAnonymous : function(challengeObject, success, error){
            $rootScope.cachedAnonymousChallengeObject = $rootScope.cachedAnonymousChallengeObject || new Object;
            if($rootScope.cachedAnonymousChallengeObject.response != undefined){
                success($rootScope.cachedChallengeObject);
            }else {
                var successCallback = function(response){
                    $rootScope.cachedAnonymousChallengeObject = response;
                    success(response);
                };
                //HigiApi.GetEarnditChallenge(challengeObject, successCallback, error);
                HigiApi.GetEarnditChallengeAnonymous(challengeObject, success, error);
            }

        },
        JoinEarnditChallenge : function(data, success, error){
            HigiApi.JoinEarnditChallenge(data, success, error);
        },
        logEvent : function(senderId, eventCategory, eventName){
            if ($rootScope.kioskADAMode == true) {
                senderId = 'ADA_' + senderId;
            }

            //Send everything else to our API
            HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, eventCategory, eventName);

        },
        getEarnditPoints : function(id, success, error){
           return HigiApi.GetEarnditPointsAsync(id, success, error);
        } ,

        getProfileImage : function(user) {
            return HigiApi.GetProfileImage(user)
        },
        PasswordResetAsync : function(username, success, error) {
            error = typeof(error) == "function" ? error  :  function () {console.log("password reset error " + error);};
            return HigiApi.PasswordResetAsync(username, success, error);
        },
        SetPasswordAsync : function(id, token, text, callback) {
            callback = typeof(callback) == "function" ? callback  :  function () {console.log("password set callback " + callback);};
            return HigiApi.SetPasswordAsync(id, token, text, callback);
        },
        CreateCheckin : function (getSessionData) {
            var checkin = new HigiCheckin();
            checkin.heightMeters = getSessionData('height');
            checkin.weightKG = getSessionData('weight');
            checkin.pulseBpm = getSessionData('pulse');
            checkin.fatRatio = getSessionData('fatRatio');
            checkin.hydrationPct = getSessionData('hydrationPct');
            checkin.bmcOhms = getSessionData('bmcOhms');
            checkin.systolic = getSessionData('systolic');
            checkin.diastolic = getSessionData('diastolic');
            checkin.score = getSessionData('higi_points');
            checkin.adToken = getSessionData('adToken');
            
			if(getSessionData('dengue_IgG') !== undefined){
                checkin.dengue_IgG = getSessionData('dengue_IgG');
				checkin.dengue_IgM = getSessionData('dengue_IgM');
            }
			
			if(getSessionData('malaria_p_v') !== undefined){
                checkin.malaria_p_v = getSessionData('malaria_p_v');
                checkin.malaria_p_f = getSessionData('malaria_p_f');
            }

            if(getSessionData('heamoglobin') !== undefined){
                checkin.heamoglobin = getSessionData('heamoglobin');
                checkin.heamoglobin_class = getSessionData('heamoglobin_class');
            }

            if(getSessionData('hiv_I') !== undefined){
                checkin.hiv_I = getSessionData('hiv_I');
                checkin.hiv_II = getSessionData('hiv_II');
            }

            if(getSessionData('hcv') !== undefined){
                checkin.hcv = getSessionData('hcv');
            }

            if(getSessionData('troponin') !== undefined){
                checkin.troponin = getSessionData('troponin');
            }

            if(getSessionData('syphilis') !== undefined){
                checkin.syphilis = getSessionData('syphilis');
            }

            if(getSessionData('pregnancy') !== undefined){
                checkin.pregnancy = getSessionData('pregnancy');
            }

            if(getSessionData('glucose_random') !== undefined){
                checkin.glucose_random = parseFloat(getSessionData('glucose_random'));
                checkin.glucose_random_class = getSessionData('glucose_random_class');
            }

            if(getSessionData('glucose_fasting') !== undefined){
                checkin.glucose_fasting = parseFloat(getSessionData('glucose_fasting'));
                checkin.glucose_fasting_class = getSessionData('glucose_fasting_class');
            }

            if(getSessionData('glucose_post_prandial') !== undefined){
                checkin.glucose_post_prandial = parseFloat(getSessionData('glucose_post_prandial'));
                checkin.glucose_post_prandial_class = getSessionData('glucose_post_prandial_class');
            }

            if(getSessionData('lipid_profile_tc') !== undefined){
                checkin.lipid_profile_tc = parseFloat(getSessionData('lipid_profile_tc'));
                checkin.lipid_profile_tc_class = getSessionData('lipid_profile_tc_class');

                checkin.lipid_profile_hg = parseFloat(getSessionData('lipid_profile_hg'));
                checkin.lipid_profile_hg_class = getSessionData('lipid_profile_hg_class');

                checkin.lipid_profile_tg = parseFloat(getSessionData('lipid_profile_tg'));
                checkin.lipid_profile_tg_class = getSessionData('lipid_profile_tg_class');

                checkin.lipid_profile_ldl = parseFloat(getSessionData('lipid_profile_ldl'));
                checkin.lipid_profile_ldl_class = getSessionData('lipid_profile_ldl_class');
            }

            if(getSessionData('urine_leukocytes') !== undefined){
                checkin.urine_leukocytes = getSessionData('urine_leukocytes');
                checkin.urine_nitrite = getSessionData('urine_nitrite');
                checkin.urine_urobilinogen = getSessionData('urine_urobilinogen');
                checkin.urine_protein = getSessionData('urine_protein');
                checkin.urine_ph = getSessionData('urine_ph');
                checkin.urine_blood = getSessionData('urine_blood');
                checkin.urine_specific_gravity = getSessionData('urine_specific_gravity');
                checkin.urine_ketone = getSessionData('urine_ketone');
                checkin.urine_bilirubin = getSessionData('urine_bilirubin');
                checkin.urine_glucose = getSessionData('urine_glucose');
            }
			
            //checkin.ECGData = getSessionData("ekg_fulldata");
			/*var ECGtestData = getSessionData("ekg_fulldata");
             if(ECGtestData==undefined){ECGtestData="";}
			checkin.ECGData = ECGtestData.toString();
            var ECGBpmData = getSessionData("ECG_bpm_value");

            if(ECGBpmData==undefined){ECGBpmData="";}
            checkin.ECGBpm = ECGBpmData.toString();

			var ECGRawData = getSessionData('ekg_fulldataRaw');
			if(ECGRawData == undefined){ECGRawData=""}
			checkin.ECGRawFullData = ECGRawData.toString();*/
       var leadModestatus = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');

       if(leadModestatus == 1){
        var ECGLead1data= getSessionData('ZugECGlead1SmoothGraph');
        var ECGData1Result = getSessionData('zugEcgValidationResultforLead1');
        if(ECGLead1data != null || ECGLead1data != undefined){
            checkin.ECGData = ECGLead1data.toString();
            checkin.leadOneStatus = ECGData1Result;
        }else{

        }
         }

        var leadModestatus = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
         var instantLeadMode = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
         if (instantLeadMode == undefined || instantLeadMode == null) {
             instantLeadMode = 0;
         } else {
             instantLeadMode = instantLeadMode;
         }
         checkin.LeadMode = instantLeadMode;
        if(leadModestatus == 3 && $rootScope.ZugECGEmergencySkipClicked == false){

            var ECGLead1data= getSessionData('ZugECGlead1SmoothGraph');
            var ECGLead2data= getSessionData('ZugECGlead2SmoothGraph');
            var ECGLead3data= getSessionData('ZugECGlead3SmoothGraph');
            var ECGData1Result = getSessionData('ECGStatus');
            var ECGData2Result = getSessionData('ECGStatus');
            var ECGData3Result = getSessionData('ECGStatus');
            if (ECGData1Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData1Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData1Result = "High Pulse";
            }
            if (ECGData2Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData2Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData2Result = "High Pulse";
            }
            if (ECGData3Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData3Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData3Result = "High Pulse";
            }
         if($rootScope.ecgPoorResult == false && (ECGLead1data != null || ECGLead1data != undefined && ECGLead2data != null || ECGLead2data != undefined && ECGLead3data  != null || ECGLead3data != undefined )){
           checkin.ECGData = ECGLead1data.toString();
           checkin.ECGData2 = ECGLead2data.toString();
           checkin.ECGData3 = ECGLead3data.toString();


            checkin.leadOneStatus = ECGData1Result;
            checkin.leadTwoStatus = ECGData2Result;
            checkin.leadThreeStatus = ECGData3Result;
            var ECGBpmData = getSessionData("HeartRate");
            if($rootScope.ecgPoorResult== false && ECGBpmData !=undefined && ECGBpmData !=0 && ECGBpmData !="0" && ECGBpmData !=null ){          
               checkin.ECGBpm = ECGBpmData.toString();
               console.log("ECGBpmData  "+ECGBpmData);
               let prIntervalval = "";
               let QRSDurationVal = "";
               let QTCIntervalVal = "";
               if(typeof getSessionData('PRInterval') == "string") prIntervalval = (parseFloat(getSessionData('PRInterval')) * 1000).toString();
               else prIntervalval = (getSessionData('PRInterval') * 1000).toString();
               if(typeof getSessionData('QRSDuration') == "string") QRSDurationVal = (parseFloat(getSessionData('QRSDuration')) * 1000).toString();
               else QRSDurationVal = (getSessionData('QRSDuration') * 1000).toString();
               if(typeof getSessionData('QTCInterval') == "string") QTCIntervalVal = (parseFloat(getSessionData('QTCInterval')) * 1000).toString();
               else QTCIntervalVal = (getSessionData('QTCInterval') * 1000).toString();
               checkin.ECG_PR_interval = prIntervalval;
               checkin.ECG_QRS_duration = QRSDurationVal;
               checkin.ECG_QTC_duration = QTCIntervalVal;
              }else if($rootScope.ecgPoorResult == true || ECGBpmData ==undefined || ECGBpmData ==0 || ECGBpmData =="0" || ECGBpmData ==null){
                ECGBpmData="";
                console.log("ECGBpmData else "+ECGBpmData);
               let prIntervalval = "";
               let QRSDurationVal = "";
               let QTCIntervalVal = "";
               if(typeof getSessionData('PRInterval') == "string") prIntervalval = (parseFloat(getSessionData('PRInterval')) * 1000).toString();
               else prIntervalval = (getSessionData('PRInterval') * 1000).toString();
               if(typeof getSessionData('QRSDuration') == "string") QRSDurationVal = (parseFloat(getSessionData('QRSDuration')) * 1000).toString();
               else QRSDurationVal = (getSessionData('QRSDuration') * 1000).toString();
               if(typeof getSessionData('QTCInterval') == "string") QTCIntervalVal = (parseFloat(getSessionData('QTCInterval')) * 1000).toString();
               else QTCIntervalVal = (getSessionData('QTCInterval') * 1000).toString();
               checkin.ECG_PR_interval = prIntervalval;
               checkin.ECG_QRS_duration = QRSDurationVal;
               checkin.ECG_QTC_duration = QTCIntervalVal;
                checkin.ECGBpm = ECGBpmData.toString();
              }
          
         }
        }else{

            /*checkin.ECGData2 = "";



            checkin.ECGData3 = "";

            checkin.leadTwoStatus = "";


            checkin.leadThreeStatus =  "";*/
        }

        if (leadModestatus == 6 && $rootScope.ZugECGEmergencySkipClicked == false) {
            var ECGLead1data = getSessionData('sixleadZugECGlead1SmoothGraph');
            var ECGLead2data = getSessionData('sixleadZugECGlead2SmoothGraph');
            var ECGLead8data = getSessionData('sixleadZugECGlead8SmoothGraph');
            var ECGLead9data = getSessionData('sixleadZugECGlead9SmoothGraph');
            var ECGData1Result = getSessionData('ECGStatus');
            var ECGData2Result = getSessionData('ECGStatus');
            var ECGData3Result = getSessionData('ECGStatus');
            if (ECGData1Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData1Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData1Result = "High Pulse";
            }
            if (ECGData2Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData2Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData2Result = "High Pulse";
            }
            if (ECGData3Result == "Normal Sinus Rhythm"){ 
                if("सामान्य साइनस लय" || "सामान्य सायनस ताल") {
                    ECGData3Result = "Normal Sinus Rhythm";
                }
                else{
                    ECGData1Result = "Normal Sinus Rhythm";
                }
            }
            else{
            ECGData3Result = "High Pulse";
            }
            if ($rootScope.ecgPoorResult == false && (ECGLead1data != null || ECGLead1data != undefined && ECGLead2data != null || ECGLead2data != undefined)) {
                    checkin.ECGData = ECGLead1data.toString();
                    checkin.ECGData2 = ECGLead2data.toString();
                    checkin.ECGData3 = "";
                    if (ECGData1Result == null || ECGData1Result == undefined){
                        ECGData1Result = "";
                    }
                    else{
                        ECGData1Result = ECGData1Result;
                    }
                    if (ECGData2Result == null || ECGData2Result == undefined) {
                        ECGData2Result = "";
                    }
                    else{
                        ECGData2Result = ECGData2Result;
                    }
                    if (ECGData3Result == null || ECGData3Result == undefined) {
                        ECGData3Result = "";
                    }
                    else{
                        ECGData3Result = ECGData3Result;
                    }
                    checkin.leadOneStatus = ECGData1Result;
                    checkin.leadTwoStatus = ECGData2Result;
                    checkin.leadThreeStatus = ECGData3Result;
                       var ECGBpmData = getSessionData("HeartRate");
            if($rootScope.ecgPoorResult== false && ECGBpmData !=undefined && ECGBpmData !=0 && ECGBpmData !="0" && ECGBpmData !=null ){
           
               checkin.ECGBpm = ECGBpmData.toString();
               console.log("ECGBpmData  "+ECGBpmData);
               let prIntervalval = "";
               let QRSDurationVal = "";
               let QTCIntervalVal = "";
               if(typeof getSessionData('PRInterval') == "string") prIntervalval = (parseFloat(getSessionData('PRInterval')) * 1000).toString();
               else prIntervalval = (getSessionData('PRInterval') * 1000).toString();
               if(typeof getSessionData('QRSDuration') == "string") QRSDurationVal = (parseFloat(getSessionData('QRSDuration')) * 1000).toString();
               else QRSDurationVal = (getSessionData('QRSDuration') * 1000).toString();
               if(typeof getSessionData('QTCInterval') == "string") QTCIntervalVal = (parseFloat(getSessionData('QTCInterval')) * 1000).toString();
               else QTCIntervalVal = (getSessionData('QTCInterval') * 1000).toString();
               checkin.ECG_PR_interval = prIntervalval;
               checkin.ECG_QRS_duration = QRSDurationVal;
               checkin.ECG_QTC_duration = QTCIntervalVal;
              }else if($rootScope.ecgPoorResult == true || ECGBpmData ==undefined || ECGBpmData ==0 || ECGBpmData =="0" || ECGBpmData ==null){
                ECGBpmData="";
                console.log("ECGBpmData else "+ECGBpmData);
                checkin.ECGBpm = ECGBpmData.toString();
                let prIntervalval = "";
               let QRSDurationVal = "";
               let QTCIntervalVal = "";
               if(typeof getSessionData('PRInterval') == "string") prIntervalval = (parseFloat(getSessionData('PRInterval')) * 1000).toString();
               else prIntervalval = (getSessionData('PRInterval') * 1000).toString();
               if(typeof getSessionData('QRSDuration') == "string") QRSDurationVal = (parseFloat(getSessionData('QRSDuration')) * 1000).toString();
               else QRSDurationVal = (getSessionData('QRSDuration') * 1000).toString();
               if(typeof getSessionData('QTCInterval') == "string") QTCIntervalVal = (parseFloat(getSessionData('QTCInterval')) * 1000).toString();
               else QTCIntervalVal = (getSessionData('QTCInterval') * 1000).toString();
               checkin.ECG_PR_interval = prIntervalval;
               checkin.ECG_QRS_duration = QRSDurationVal;
               checkin.ECG_QTC_duration = QTCIntervalVal;
              }
                
            }
        }
        else{

        }



            // var ECGBpmData = getSessionData("HeartRate");
            // alert("ECGBpmData  "+ECGBpmData);
            // if($rootScope.ecgPoorResult== false && ECGBpmData !=undefined && ECGBpmData !=0 && ECGBpmData !="0" && ECGBpmData !=null ){
           
            //    checkin.ECGBpm = ECGBpmData.toString();
            //    alert("Success "+checkin.ECGBpm);
            //   }else if($rootScope.ecgPoorResult == true || ECGBpmData ==undefined || ECGBpmData ==0 || ECGBpmData =="0" || ECGBpmData ==null){
            //     ECGBpmData="";
            //     checkin.ECGBpm = ECGBpmData.toString();
            //     alert("Failure "+checkin.ECGBpm);
            //   }
            checkin.Spo2 = getSessionData('oxygen');
            checkin.temperature = getSessionData('temperaturecelcius');
            //checkin.temperature = HigiKioskStorageService.returnSessionData("temperaturFarrant");
            //alert(checkin.temperature);
            if(checkin.temperature != ""){
                checkin.roomTemperature = getSessionData('roomTemperature');
            }

            checkin.gender = getSessionData('gender');
			var DOB = HigiKioskStorageService.returnSessionData('birthdate');

			checkin.dateOfBirth = getSessionData('birthdate');

			checkin.Age = (HigiKioskUtilitiesService.getAge(checkin.dateOfBirth)).toString();
            
			$rootScope.ageforPrint = checkin.Age;

			var userName = $rootScope.lastCheckin.firstName;
			if(userName == undefined)
			{
				checkin.firstName ="Guest User";
			}
			else{
				checkin.firstName = $rootScope.lastCheckin.firstName;
			}


			//var lastCheckin_for_id = HigiKioskStorageService.returnSessionData('lastCheckin');



			if($rootScope.user.id == undefined)
			{
				checkin.IHL_ID = "Guest";//This is dummy. actual storage in server code
			}else{
				checkin.IHL_ID = $rootScope.user.id;
			}
			checkin.IHLMachineId = ihl_machineid;
			checkin.IHLMachineName = machine_name;
			checkin.IHLMachineLocation = machine_location;
            checkin.IHLMachineDeploymentDate = machine_deployment_date;
            if($rootScope.isMEBOrg){
                checkin.organization  = 'MEB';
            }

        /*    $rootScope.kioskConfigurationResult=HigiKioskStorageService.returnSessionData('kioskConfigurationResult');
            //checkin.IHLMachineId = ihl_machineid;
			//checkin.IHLMachineName = machine_name;
            checkin.IHLMachineName = $rootScope.kioskConfigurationResult.address1;
           // alert("Machine Name" +$rootScope.kioskConfigurationResult.address1);
			//checkin.IHLMachineLocation = machine_location;
            checkin.IHLMachineLocation = $rootScope.kioskConfigurationResult.city;
           // alert("Machine Location" +$rootScope.kioskConfigurationResult.city);

            checkin.IHLMachineId = $rootScope.kioskConfigurationResult.serialNumber;
            //alert("Machine ID" +$rootScope.kioskConfigurationResult.serialNumber);

			checkin.IHLMachineDeploymentDate = $rootScope.kioskConfigurationResult.dateofdeployment;
           // alert("Deployment Date" +$rootScope.kioskConfigurationResult.dateofdeployment);
        */
			if($rootScope.ecg_graph_shown == undefined)
			{
				checkin.ecg_graph_shown = "";
			}else{
				checkin.ecg_graph_shown = $rootScope.ecg_graph_shown;
			}

            if (getSessionData('averageBPResults') == true) {
                checkin.bloodPressures = new Array();
                for (var i = 0; i < getSessionData('systolicHistory').length; i++) {
                    var bpObject = new Object();
                    bpObject.systolic = getSessionData('systolicHistory')[i];
                    bpObject.diastolic = getSessionData('diastolicHistory')[i];
                    checkin.bloodPressures.push(bpObject);
                }
            }
            
            if($rootScope.fullBodyBMCTest == true){
            checkin.bone_mineral_content = HigiKioskStorageService.returnSessionData('bmc');
            checkin.protien = HigiKioskStorageService.returnSessionData('Protein');
            checkin.extra_cellular_water = HigiKioskStorageService.returnSessionData('ECW');
            checkin.intra_cellular_water = HigiKioskStorageService.returnSessionData('ICW');
            checkin.mineral = HigiKioskStorageService.returnSessionData('Mineral');
            checkin.skeletal_muscle_mass = HigiKioskStorageService.returnSessionData('SMM');
            checkin.body_fat_mass = HigiKioskStorageService.returnSessionData('Fat');
            checkin.body_cell_mass = HigiKioskStorageService.returnSessionData('BCM');
            checkin.waist_hip_ratio = HigiKioskStorageService.returnSessionData('whpr');
            checkin.percent_body_fat = HigiKioskStorageService.returnSessionData('PBF');
            checkin.waist_height_ratio = HigiKioskStorageService.returnSessionData('whtr');
            checkin.visceral_fat = HigiKioskStorageService.returnSessionData('VF');
            checkin.basal_metabolic_rate = HigiKioskStorageService.returnSessionData('BMR');

            // To avoid regional language stored in dB
            // checkin.bone_mineral_content_status = HigiKioskStorageService.returnSessionData('boneMineralContentStatusForDB');
            // checkin.protien_status  = HigiKioskStorageService.returnSessionData('ProteinStatus');
            // checkin.extra_cellular_water_status = HigiKioskStorageService.returnSessionData('ECWStatus');
            // checkin.intra_cellular_water_status = HigiKioskStorageService.returnSessionData('ICWStatus');
            // checkin.mineral_status = HigiKioskStorageService.returnSessionData('MineralStatus');
            // checkin.skeletal_muscle_mass_status = HigiKioskStorageService.returnSessionData('SMMStatus');
            // checkin.body_fat_mass_status = HigiKioskStorageService.returnSessionData('FatStatus');
            // checkin.body_cell_mass_status = HigiKioskStorageService.returnSessionData('BCMStatus');
            // checkin.waist_hip_ratio_status = HigiKioskStorageService.returnSessionData('whprStatus');    
            // checkin.percent_body_fat_status = HigiKioskStorageService.returnSessionData('PBFStatus');
            // checkin.waist_height_ratio_status = HigiKioskStorageService.returnSessionData('whtrStatus');
            // checkin.visceral_fat_status = HigiKioskStorageService.returnSessionData('VFStatus');
            // checkin.basal_metabolic_rate_status = HigiKioskStorageService.returnSessionData('BMRStatus');

            // To avoid regional language test status stored in dB
            checkin.bone_mineral_content_status = HigiKioskStorageService.returnSessionData('boneMineralContentStatusForDB');
            checkin.protien_status  = HigiKioskStorageService.returnSessionData('ProteinStatusForDB');
            checkin.extra_cellular_water_status = HigiKioskStorageService.returnSessionData('ECWStatusForDB');
            checkin.intra_cellular_water_status = HigiKioskStorageService.returnSessionData('ICWStatusForDB');
            checkin.mineral_status = HigiKioskStorageService.returnSessionData('MineralStatusForDB');
            checkin.skeletal_muscle_mass_status = HigiKioskStorageService.returnSessionData('SMMStatusForDB');
            checkin.body_fat_mass_status = HigiKioskStorageService.returnSessionData('FatStatusForDB');
            checkin.body_cell_mass_status = HigiKioskStorageService.returnSessionData('BCMStatusForDB');
            checkin.waist_hip_ratio_status = HigiKioskStorageService.returnSessionData('whprStatusForDB');    
            checkin.percent_body_fat_status = HigiKioskStorageService.returnSessionData('PBFStatusForDB');
            checkin.waist_height_ratio_status = HigiKioskStorageService.returnSessionData('whtrStatusForDB');
            checkin.visceral_fat_status = HigiKioskStorageService.returnSessionData('VFStatusForDB');
            checkin.basal_metabolic_rate_status = HigiKioskStorageService.returnSessionData('BMRStatusForDB');

            // For UI represntation of storing regional language test status
            checkin.bone_mineral_content_statusForUI = HigiKioskStorageService.returnSessionData('boneMineralContentStatus');
            checkin.protien_statusForUI = HigiKioskStorageService.returnSessionData('ProteinStatus');
            checkin.extra_cellular_water_statusForUI = HigiKioskStorageService.returnSessionData('ECWStatus');
            checkin.intra_cellular_water_statusForUI = HigiKioskStorageService.returnSessionData('ICWStatus');
            checkin.mineral_statusForUI = HigiKioskStorageService.returnSessionData('MineralStatus');
            checkin.skeletal_muscle_mass_statusForUI = HigiKioskStorageService.returnSessionData('SMMStatus');
            checkin.body_fat_mass_statusForUI = HigiKioskStorageService.returnSessionData('FatStatus');
            checkin.body_cell_mass_statusForUI = HigiKioskStorageService.returnSessionData('BCMStatus');
            checkin.waist_hip_ratio_statusForUI = HigiKioskStorageService.returnSessionData('whprStatus');    
            checkin.percent_body_fat_statusForUI = HigiKioskStorageService.returnSessionData('PBFStatus');
            checkin.waist_height_ratio_statusForUI = HigiKioskStorageService.returnSessionData('whtrStatus');
            checkin.visceral_fat_statusForUI = HigiKioskStorageService.returnSessionData('VFStatus');
            checkin.basal_metabolic_rate_statusForUI = HigiKioskStorageService.returnSessionData('BMRStatus');
            
        }
            return checkin;
        },
        CreateInteractiveAdObject : function(answers, getSessionData){
            var object = new InteractiveAdObject();
            object.UserId = HigiKioskStorageService.returnSessionData('logged_in') ? getSessionData("user").id : "";
            object.Answers.push(answers);

            return object;
        },
        GetCheckInsAsync : function(id, success,fail){
            return HigiApi.GetCheckInsAsync(id, success, fail);
        },
        CreateCheckInGameAsync : function(id,checkinData, email, success, fail){
//console.log(checkinData);
//console.log(email);
			var bmiTemp=$rootScope.bmiTemp;
			var bmiRiskTemp=$rootScope.bmiRiskTemp;
			var bodyfatclassTemp=$rootScope.BodyFatClassTemp;
			var bpClassTemp=$rootScope.bpRiskTemp;
            var tempClassTemp=$rootScope.TempRisk;
			var pulseClassTemp=$rootScope.pulseRiskClassTemp;
			var dummyECGRaw = HigiKioskStorageService.returnSessionData('ekg_fulldataRaw');
			if(dummyECGRaw == undefined){dummyECGRaw = "";}

			ECGRawData=dummyECGRaw.toString();

			var dummyECGFilterData = HigiKioskStorageService.returnSessionData('ekg_filterData');
			if(dummyECGFilterData == undefined){dummyECGFilterData="";}

			ECGFilterData = dummyECGFilterData.toString();



            HigiApi.CreateCheckInGameAsync(id,bmiTemp,bmiRiskTemp,bodyfatclassTemp,bpClassTemp,tempClassTemp,pulseClassTemp,ECGRawData,ECGFilterData,checkinData, email, success, fail)
            //higiId,bmiTemp,bmiRiskTemp,bodyfatclassTemp,bpClassTemp,tempClassTemp,pulseClassTemp,ECGRawData,ECGFilterData, checkin, email, success, error
        },

    CreateCheckInGameAsyncGuest : function(checkinData, success, fail){

			var bmiTemp=$rootScope.bmiTemp;
			var bmiRiskTemp=$rootScope.bmiRiskTemp;
			var bodyfatclassTemp=$rootScope.BodyFatClassTemp;
			var bpClassTemp=$rootScope.bpRiskTemp;
            var tempClassTemp=$rootScope.TempRisk;
			var pulseClassTemp=$rootScope.pulseRiskClassTemp;
			var dummyECGRaw = HigiKioskStorageService.returnSessionData('ekg_fulldataRaw');
			if(dummyECGRaw == undefined){dummyECGRaw = "";}

			ECGRawData=dummyECGRaw.toString();

			var dummyECGFilterData = HigiKioskStorageService.returnSessionData('ekg_filterData');
			if(dummyECGFilterData == undefined){dummyECGFilterData="";}

			ECGFilterData = dummyECGFilterData.toString();

            HigiApi.CreateCheckInGameAsyncGuest(checkinData, success, fail)
        },

        fetch_terms_condition_from_config : function(uniqueKioskId, success, fail){
            HigiApi.fetch_terms_condition_from_config(uniqueKioskId, success, fail);
        },

        save_parameters : function(data, success, fail){
            HigiApi.save_parameters(data, success, fail);
        },

        offile_users_data : function(data, success, fail){
            HigiApi.offile_users_data(data, success, fail);
        },

        delete_offile_users_data : function(index, uniqueKioskId, success, fail){
            HigiApi.delete_offile_users_data(index, uniqueKioskId, success, fail);
        },


        SaveUnauthCheckInAsync : function(checkin, success, fail){
            HigiApi.SaveUnauthCheckInAsync(checkin, success, fail);
        },

        EmailUserCheckInAsync : function(userId, email, checkin, success, error){
            HigiApi.EmailUserCheckInAsync(userId, email, checkin, success, error);
        },
        EmailCheckInAsync :  function(email, checkin, success, error){
            HigiApi.EmailCheckInAsync(email, checkin, success, error);
        },
        DeleteAccountAge13Async : function(id, dateOfBirth){
            var success = function() {
                console.log(' Success : coppa account deleted');
                window.location = "index.html";
            };
            var fail = function () {
                console.log(' Failure : coppa no action taken');
                window.location = "index.html";
            };
            HigiApi.DeleteAccountAge13Async(id, dateOfBirth, success, fail);
        },

        UpdateUserAsync : function(higiId, user, success, error){
            HigiApi.UpdateUserAsync(higiId, user, success, error);
        },
        updateIHLuserData : function(higiId, token, user, success, error){
          HigiApi.updateIHLuserData(higiId, token, user, success, error);  
        },
        MemoryQueueUpdateUserAsync : function(higiId, user, success, error){
            HigiApi.MemoryQueueUpdateUserAsync(higiId, user, success, error);
        },

        getClassImages : function(data, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getClassImages(data, success, error);
        },

        getConsultantsProfilePicList : function(data, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getConsultantsProfilePicList(data, success, error);
        },

        createSubscription : function(data, success, error) {
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.createSubscription(data, success, error);
        },

        getAppointmentConfirm : function(bookingData, success, error){
            //error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getAppointmentConfirm(bookingData, success, error);
        },

        paymentTransInit : function(paymentData, success, error) {
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.paymentTransInit(paymentData, success, error);
        },

        getDoctorAppointmentDetails : function(doctor_id, startIndex, endIndex, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getDoctorAppointmentDetails(doctor_id, startIndex, endIndex, success, error);
        },

        getPaymentOrderID:function(requestId, amt, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getPaymentOrderID(requestId, amt, success, error);
        },

        paymentTransUpdate(jsonDataUpdate, success, error){
            error = typeof(error) == "function" ? error : function() {console.log(error);};
            HigiApi.paymentTransUpdate(jsonDataUpdate, success, error)
        },

        paymentRequestIdGenerate : function(endpoint,ihlID){
            HigiApi.paymentRequestIdGenerate(endpoint,ihlID);
        },

        getConsultationCallSummary : function(appointment_id, success, error){
            error = typeof(error) == "function" ? error : function() {console.log(error);};
            HigiApi.getConsultationCallSummary(appointment_id, success, error);
        },

        postDoctorReview : function(obj, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.postDoctorReview(obj, success, error);
        },

        getTeleConsultUserData : function(ihl_id, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getTeleConsultUserData(ihl_id, success, error);
        },

        updateCallLogDetails : function(data, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.updateCallLogDetails(data, success, error);
        },

        getKioskVitalTestPrice :  function(data, success, error){
            //error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getKioskVitalTestPrice(data, success, error);
        },

        storeUserPaidServiceAsProvided :  function(invoiceId, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.storeUserPaidServiceAsProvided(invoiceId, success, error);
        },

        generateTokenForApolloTeleconsultation :  function(data, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.generateTokenForApolloTeleconsultation(data, success, error);
        },

        updateApolloCaseSheetId :  function(data, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.updateApolloCaseSheetId(data, success, error);
        }, 

        getapolloTeleConsultUserData : function(ihl_id, success, error){
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.getapolloTeleConsultUserData(ihl_id, success, error);
        },

        sharePrescriptionTo1mg : function(data, success, error){
            HigiApi.sharePrescriptionTo1mg(data, success, error);
        },

        updatePaymentTransactionData : function(data, success, error){
            HigiApi.updatePaymentTransactionData(data, success, error);
        },
        
        updateFreeConsultationDetails : function(data, success, error){
            HigiApi.updateFreeConsultationDetails(data, success, error);
        },

        updateHealthVitalsData : function(data, success, error){
            HigiApi.updateHealthVitalsData(data, success, error);
        },

        getAllMedicalFiles : function(data, success, error){
            HigiApi.getAllMedicalFiles(data, success, error);
        },

        getUrlForLiveCallAppointment : function(apmtId, success, error){
            HigiApi.getUrlForLiveCallAppointment(apmtId, success, error);
        },

        getDoctorSignature : function(id, success, error){
            HigiApi.getDoctorSignature(id, success, error);
        },

        getbase64Pdf : function(data, success, error){
            HigiApi.getbase64Pdf(data, success, error);
        },

        getPrescriptionLogoUrl : function(data, success, error){
            HigiApi.getPrescriptionLogoUrl(data, success, error);
        },

        getPrescriptionNum : function(data, success, error) {
            HigiApi.getPrescriptionNum(data, success, error);
        },

        generateRazorPayQr : function(amount, purpose, paymentMode, success, error) {
            HigiApi.generateRazorPayQr(amount, purpose, paymentMode, success, error);
        },

        CheckUpiTransactionStatus : function(id, success, error) {
            error = typeof(error) == "function" ? error  :  function () {console.log(error);};
            HigiApi.CheckUpiTransactionStatus(id, success, error);
        },

        getApolloOnlineSpecialities : function(success, error) {
            HigiApi.getApolloOnlineSpecialities(success, error);
        },

        couponCodeGenerate : function(data, success, error) {
            HigiApi.couponCodeGenerate(data, success, error);
        },

        sendPrescriptionToUser : function(data, success, error) {
            HigiApi.sendPrescriptionToUser(data, success, error);
        },

        getUserDetails : function(id, token, success, error) {
            HigiApi.getUserDetails(id, token, success, error);
        },

        storeLoginUserRecord : function(ihl_id, type, success, error) {
            HigiApi.storeLoginUserRecord(ihl_id, type, success, error);
        },

        getAccessToken : function(kioskID, timestamp, success, error) {
            HigiApi.getAccessToken(kioskID, timestamp, success, error);            
        },
        
        createAccount: function(userGivenData, userToken, success, error) {
            HigiApi.createAccount(userGivenData, userToken, success, error);               
        },

        esanjeevaniOperatorLogin : function(data, success, error) {
            HigiApi.esanjeevaniOperatorLogin(data, success, error);
        },

        esanjeevaniOperatorForgotPassword : function(data, success, error) {
            HigiApi.esanjeevaniOperatorForgotPassword(data, success, error);
        },

        eSanjeevaniTestRequestList : function(data, success, error) {
            HigiApi.eSanjeevaniTestRequestList(data, success, error);
        },

        esanjeevaniServiceProvidedUpdate: function(data, success, error) {
            HigiApi.esanjeevaniServiceProvidedUpdate(data, success, error);
        },
        
        abhaSessionToken: function(success, error){
            AbhaApi.abhaSessionToken(success, error);               
        },
   
        encodeAbhaText: function(success, error){
            AbhaApi.encodeAbhaText(success, error);               
        },

        getABHASession: function(JSONData, success_fn, error_fn){
            AbhaApi.getABHASession(JSONData, success_fn, error_fn);  
        },

        fetchDatafromAbhaRes: function(data, success, error){
            HigiApi.fetchDatafromAbhaRes(data, success, error);
        },

        AbhaValidation: function(data, success, error){
            HigiApi.AbhaValidation(data, success, error);
        },

        Abhacardsendmail: function(data, success, error){
            HigiApi.Abhacardsendmail(data, success, error);
        },

        fetchABHACareContext: function(data, success, error){
            HigiApi.fetchABHACareContext(data, success, error);
        },

        shareABHACareContext: function(data, success, error){
            HigiApi.shareABHACareContext(data, success, error);
        },

        checkFlipKartAccountExists : function(data, success, error) {
            HigiApi.checkFlipKartAccountExists(data, success, error);
        },

        registerFlipKartUserIntoHPod : function(data, success, error) {
            HigiApi.registerFlipKartUserIntoHPod(data, success, error);
        },

        loginFlipKartUserIntoHPod : function(data, success, error) {
            HigiApi.loginFlipKartUserIntoHPod(data, success, error);
        },

        doctorNextAvailabilityNew : function(docId, vendorId, status, success, error) {
            HigiApi.doctorNextAvailabilityNew(docId, vendorId, status, success, error);
        },

        isEmailLoginUserFreeServiceAvail : function(data, success, error) {
            HigiApi.isEmailLoginUserFreeServiceAvail(data, success, error);
        },

        getRecentBCAData : function(data, success, error){
            HigiApi.getRecentBCAData(data, success, error);
        }
    }
}]);
