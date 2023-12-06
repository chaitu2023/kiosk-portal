
higiKioskControllers.controller('telemedicineprescriptioncontroller' , ['$scope', '$interval', '$routeParams' , '$rootScope', '$location', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService' , function($scope, $interval, $routeParams, $rootScope , $location, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService){
	
	$scope.Check = "Good";
	$scope.dispenseMediAllObj = {};	
	$scope.dispenseMediAllBtnEnable = false;
	var medi_Id;
	$scope.mvmStatus = false;
	$scope.progressTxt = false;
	$scope.checkStockBtn = false;
	$scope.offlineInfo = false;
	$(".offlineInfoTxt").text(""); 
	$scope.goHomeShow = false; 

    $scope.consultationIsPublished = false;
	//$scope.dispenseAllEanble = false;
	var publishCheckCount = 0;

	$scope.init = function(){
		$scope.DOCTORNAME = "global.telemedi.DOCTORNAME";
		$scope.GENDER = "global.telemedi.GENDER";
		$scope.EMAIL = "global.telemedi.EMAIL";
		$scope.USERNAME = "global.telemedi.USERNAME";
		$scope.AGE = "global.telemedi.AGE";
		$scope.GENDER = "global.telemedi.GENDER";
		$scope.DATE = "global.telemedi.DATE";
		$scope.DrugName = "global.telemedi.DrugName";
		$scope.Dosage = "global.telemedi.Dosage";
		$scope.Frequency = "global.telemedi.Frequency";
		$scope.Instructions = "global.telemedi.Instructions";
		$scope.drsignature = "global.telemedi.doctorsign";
		$scope.logout = "global.telemedi.logout";
		$scope.print = "global.telemedi.print";
		//alert("ihl_machineid = " + ihl_machineid);        
	    $("#teleMedWait").show();
        $scope.gohomelabel = "global.gohomelabel";
		HigiKioskFlow.setGlobalNav('telemedicineprescriptioncontroller');		
		stopGem3sConsultationDetails =  $interval(triggerLiveCallConsultationDetails, 5000);	  
	}


	var triggerLiveCallConsultationDetails  = function() {
        if($scope.consultationIsPublished){
            $interval.cancel(stopGem3sConsultationDetails);
        } else {
        	JkioskService.gem3sConsultationDetails($scope.consultationDetailsRes, HigiKioskStorageService.returnSessionData("telecallId"),HigiKioskStorageService.returnSessionData("telemediAccessToken"));
        }
    }; 


    $scope.consultationDetailsRes = function(Res){
        console.log("$scope.consultationDetailsRes response receied");
        console.log(Res);

        if(Res.status) {
            console.log(JSON.parse(Res.response));
            var consultationData = JSON.parse(Res.response);
            if(consultationData.data.callData.is_published == "yes") {
            	$("#teleMedWait").hide();
        		$("#teleMedClose").hide();  
                $scope.consultationIsPublished = true;
                $interval.cancel(stopGem3sConsultationDetails);   
                $rootScope.teleMediDoctorcall =  false;
                $rootScope.floatingWindowLoaded = false;
                $("#teleMedLoad").show();
        		JkioskService.Prescription($scope.PrescriptionRes, HigiKioskStorageService.returnSessionData("telecallId"),HigiKioskStorageService.returnSessionData("telemediAccessToken"));     		
        		 
            } else {
            	publishCheckCount++;
	        	if(publishCheckCount == 12) {
	        		$interval.cancel(stopGem3sConsultationDetails);  
	                $rootScope.teleMediDoctorcall =  false;
	                $rootScope.floatingWindowLoaded = false;


	        		//$("#teleMedWait").hide();

	        		$("#teleMedClose").show();

	        		setTimeout(function() {
	        			$("#teleMedClose").hide();
			        	window.location = "#/comebacksoon";
	        		}, 3000);	        		
			        //waiting screen hide
	        	} else if(publishCheckCount < 12){
	        		//$("#teleMedWait").show();
	        		$("#teleMedClose").hide();
	        	} else {
	        		$("#teleMedWait").hide();
	        		$("#teleMedClose").hide();
	        	// waiting screen show
                	console.log("is_published response " + consultationData.data.callData.is_published);
	        	}
	        }

        } else {
            $interval.cancel(stopGem3sConsultationDetails);
            console.log("data not loaded");
        }
    }

	//deepak start

    $scope.PrescriptionRes = function(Res){
    	console.log(Res);
        if(Res.status){
            $scope.consultationRes = JSON.parse(Res.response);
            if($scope.consultationRes.data.prescriptions != undefined &&  $scope.consultationRes.data.prescriptions != []){
            	$scope.prescriptionLists = [];
		        var prescription_list = null;

		        fromUser_Lists = $scope.consultationRes.data.fromUser;
		           
	            $scope.patientName = $scope.consultationRes.data.fromUser.name;
	            $scope.patientdob = $scope.consultationRes.data.fromUser.dob;
	            console.log($scope.patientdob);
	            $scope.patientgender = $scope.consultationRes.data.fromUser.gender;
	            $scope.patientemail = $scope.consultationRes.data.fromUser.email;


		        toUser_Lists = $scope.consultationRes.data.toUser;
		           

	            $scope.doctorname = $scope.consultationRes.data.toUser.name;
	            $scope.doctorspec = $scope.consultationRes.data.toUser.gender;
	            $scope.doctoremail = $scope.consultationRes.data.toUser.email;
	            $scope.doctorsign = $scope.consultationRes.data.toUser.signature;

		        
				// for tele print table create
				$scope.telemedicinePrescriptionTable = "<table id='table'><tr><th>Drug Name</th><th>Dosage</th><th>Frequency</th><th>Instructions</th></tr>";

		        if($scope.consultationRes.data.prescriptions.length > 0)
		        {
		        	prescription_list = $scope.consultationRes.data.prescriptions;
		            console.log(prescription_list);

		        	$rootScope.telemed_doctor_precription_given = true;
		        	$rootScope.prescriptionsDataStore = JSON.stringify(prescription_list);
		        	$rootScope.teleMediCheckin();

		            for(var i=0; i<prescription_list.length; i++)
		            {		            
		                $scope.prescriptionLists[i] = {};
		                $scope.prescriptionLists[i].drug_name = prescription_list[i].drug_name;
		                $scope.prescriptionLists[i].dosage   = prescription_list[i].dosage;
		                $scope.prescriptionLists[i].frequency  = prescription_list[i].frequency;
		                $scope.prescriptionLists[i].days =  prescription_list[i].days;
		                $scope.prescriptionLists[i].sys_drug_id =  prescription_list[i].sys_drug_id;
		                $scope.prescriptionLists[i].notes =  prescription_list[i].notes;
		                $scope.prescriptionLists[i].id =  prescription_list[i].id;

		                $scope.telemedicinePrescriptionTable += "<tr><td style='word-break: break-all'>"+prescription_list[i].drug_name+"</td><td style='word-break: break-all'>"+prescription_list[i].dosage+"</td><td style='word-break: break-all'>"+prescription_list[i].frequency+"</td><td style='word-break: break-all'>"+prescription_list[i].notes+"</td></tr>";

		            }
		            $scope.telemedicinePrescriptionTable += "</table><hr>";		           
		            
		            $timeout(function(){
		            	$("#teleMedLoad").hide();
		            },3000)
                	
		            console.log(" print prescriptions = " + $scope.telemedicinePrescriptionTable);

		        }
		        else
		        {
		        	$rootScope.telemed_doctor_precription_given = false;
		        	$rootScope.prescriptionsDataStore = "";
		        	$rootScope.teleMediCheckin();

		        	window.location = "#/comebacksoon";
		        }
		        console.log($scope.prescriptionLists);


				//$timeout(function() { $scope.getMvmStock(); }, 3000);

				var today = new Date();
		        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
		    	
		    	function formatAMPM(date) {
				    var hours = date.getHours();
				    var minutes = date.getMinutes();
				    var ampm = hours >= 12 ? 'pm' : 'am';
				    hours = hours % 12;
				    hours = hours ? hours : 12;
				    minutes = minutes < 10 ? '0'+minutes : minutes;
				    var strTime = hours + ':' + minutes + ' ' + ampm;
				    return strTime;
			    }

				$scope.dateTime = date+' @ '+formatAMPM(new Date);
				$scope.dob = $scope.patientdob;
				$scope.dobFormat = $scope.dob.replace("-", "/");
				$scope.patienAge = HigiKioskUtilitiesService.getAge($scope.dobFormat);

            } else {
                $("#teleMedLoad").hide();
	        	$rootScope.telemed_doctor_precription_given = false;
	        	$rootScope.prescriptionsDataStore = "";
	        	$rootScope.teleMediCheckin();
                window.location = "#/comebacksoon";   
            }            
        } else {
            console.log("prescription not generated");
        	$("#teleMedLoad").hide();
	    	$rootScope.telemed_doctor_precription_given = false;
	    	$rootScope.prescriptionsDataStore = "";
	    	$rootScope.teleMediCheckin();
        	window.location = "#/comebacksoon";   
        }
    }

	$scope.internetConnectionCheck = function(){		
        $.ajax({
            url: getSettingsValue('kiosk.api.url') +"/",
            type: 'GET',
            crossDomain: true,
            success: function(result) {
             	$scope.offlineInfo = true;
             	$(".offlineInfoTxt").text("You are in offline"); 
            },
            error: function(res) {
                $scope.offlineInfo = false;
                $(".offlineInfoTxt").text(""); 
            }
        });
	}

	$scope.init();

    $scope.goHome = function(){    	
    	$rootScope.loadModal({id: 'exitconfirm'});
		//window.location = "#/comebacksoon";
    }

  	 $scope.printprescriptions = function(){
 		var part_1 ="<!DOCTYPE html><html><head><title></title><style> table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 90%;} td, th {  border: 1px solid #dddddd;text-align: left; font-size: 14px; padding: 5px;}</style></head>  <body style='width:372px'><div style='width: 100%;'><img style ='position: relative; top: 32px; left:1px; height: 70px; width: 150px' src='"+$rootScope.printTemplateLogo+"' style='width:70px; height:70px;'><p style='width:52%;margin-left: 72px;margin-top: -72px;'><span> Patient Name:- "+ $scope.patientName +" </span><br><span> Age:-" + $scope.patienAge + "</span><br><span> Gender:-" + $scope.patientgender + "</span><br><span> Date:-" + $scope.dateTime + "</span></p></div><hr>";

 		var DoctorsSign = "<span style='font-size: 18px;font-family: Arial,bold'>Doctor's Signature:- <br> <img src='"+$scope.doctorsign+"' /> </span>";
 		$scope.printFinal =  part_1+$scope.telemedicinePrescriptionTable+DoctorsSign
 
 		jkiosk.print($scope.printFinal,"onJobPrintComplete", "onJobPrintFailed");
    	console.log(part_1+$scope.telemedicinePrescriptionTable+DoctorsSign);
 	}


}]);
