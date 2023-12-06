
higiKioskControllers.controller('GenixTeleConsultationController' , ['$scope', '$interval', '$routeParams' , '$rootScope', '$location', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', 'HigiKioskUtilitiesService' , function($scope, $interval, $routeParams, $rootScope , $location, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService, HigiKioskUtilitiesService){
	
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
		//alert("ihl_machineid = " + ihl_machineid);
        
	    //$("#teleMedWait").show();
        $scope.gohomelabel = "global.gohomelabel";
		HigiKioskFlow.setGlobalNav('telemedicineprescriptioncontroller');
		
		//stopGem3sConsultationDetails =  $interval(triggerLiveCallConsultationDetails, 5000);
	  
	}


	/*var triggerLiveCallConsultationDetails  = function() {
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
*/
	    $scope.dummy = {
						"info": {
							"_postman_id": "39044a18-700c-4703-a24e-57ebfd32924c",
							"name": "SUMMARY",
							"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
						},
						"item": [
							{
								"name": "https://ksapi.genixtec.com/api/THConsultationSummary?EncounterId=531ed3a1-dd1d-47d0-a293-231fc8362ea0",
								"protocolProfileBehavior": {
									"disableBodyPruning": true
								},
								"request": {
									"method": "GET",
									"header": [
										{
											"key": "Authorization",
											"value": "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImUzMmNlMzE1LTY3OWQtNDE3MS1iMWM3LTAzNjU2OTE4Mzk1OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJJSExEZXZpY2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI3YmM4ODdkNi1hNWU3LTRiYzYtODVhMS1hMzI2OThjMmJiODYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiI1ZWFhMzYzYS04YTdiLTQ5NTAtYjg2Mi1hNzc4ZGQ2NzY1MGNfOTZiMjY4MmMtMjVlOC00MGEyLWEzMzgtOTQ5NjcwYWE1NGMzXzllMTNjMmEwLTNlMTgtNDA5Zi1hMTQ3LWU2NTIwZTI3N2IwNCIsIkZURSI6IjEiLCJuYmYiOjE1NzM1NTU0NjIsImV4cCI6MTU3MzU3NzA2MiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTgyMiIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.y8EYEF0RmPQE7BOJbvmf5DrhFFhD9f1fTIVs41wyEAg",
											"type": "text"
										},
										{
											"key": "DeviceId",
											"value": "213123",
											"type": "text"
										},
										{
											"key": "Origin",
											"value": "ks.genixtec.com",
											"type": "text"
										},
										{
											"key": "Content-Type",
											"name": "Content-Type",
											"value": "application/x-www-form-urlencoded",
											"type": "text"
										}
									],
									"body": {
										"mode": "urlencoded",
										"urlencoded": [
											{
												"key": "FirstName",
												"value": "Vijay",
												"type": "text"
											},
											{
												"key": "MiddleName",
												"value": "",
												"type": "text"
											},
											{
												"key": "LastName",
												"value": "M",
												"type": "text"
											},
											{
												"key": "DOB",
												"value": "12/12/2011",
												"type": "text"
											},
											{
												"key": "Gender",
												"value": "M",
												"type": "text"
											},
											{
												"key": "ContactNumber",
												"value": "7856268911",
												"type": "text"
											}
										]
									},
									"url": {
										"raw": "https://ksapi.genixtec.com/api/THConsultationSummary?EncounterId=531ed3a1-dd1d-47d0-a293-231fc8362ea0",
										"protocol": "https",
										"host": [
											"ksapi",
											"genixtec",
											"com"
										],
										"path": [
											"api",
											"THConsultationSummary"
										],
										"query": [
											{
												"key": "EncounterId",
												"value": "531ed3a1-dd1d-47d0-a293-231fc8362ea0"
											}
										]
									}
								},
								"response": []
							}
						],
						"protocolProfileBehavior": {}
					}


					console.log($scope.dummy);
					console.log($scope.dummy.item[0].request.body.urlencoded[0].value);
					console.log($scope.dummy.item[0].request.body.urlencoded[1].value);
					console.log($scope.dummy.item[0].request.body.urlencoded[2].value);
					console.log($scope.dummy.item[0].request.body.urlencoded[3].value);
					console.log($scope.dummy.item[0].request.body.urlencoded[4].value);
					console.log($scope.dummy.info);


					$scope.patientName = $scope.dummy.item[0].request.body.urlencoded[0].value + $scope.dummy.item[0].request.body.urlencoded[1].value;
		            $scope.patientdob = $scope.dummy.item[0].request.body.urlencoded[3].value;
		            console.log($scope.patientdob);
		            $scope.patientgender = $scope.dummy.item[0].request.body.urlencoded[4].value;
		            
		            $scope.doctorname =	HigiKioskStorageService.returnSessionData('genixSpecialist');
		   
		            	console.log($scope.doctorname);
		            console.log($rootScope.Speciality_name);



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


   /* $scope.PrescriptionRes = function(Res){
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

		        
		// for tele print table create
		$scope.telemedicinePrescriptionTable = "<table id='table'><tr><th>Drug Name</th><th>Dosage</th><th>Frequency</th><th>Instructions</th></tr>";

		        if($scope.consultationRes.data.prescriptions.length > 0)
		        {

		        	prescription_list = $scope.consultationRes.data.prescriptions;
		            console.log(prescription_list);

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


                $scope.printprescriptions();

            } else {
                $("#teleMedLoad").hide();
                window.location = "#/comebacksoon";   
            }            
        } else {
            console.log("prescription not generated");
        	$("#teleMedLoad").hide();
        	window.location = "#/comebacksoon";   
        }
    }*/
	

	/*$scope.internetConnectionCheck = function(){		
          $.ajax({
            url: "http://azureapi.indiahealthlink.com/",
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
*/
	
	$scope.init();

   $scope.goHome = function(){
	 window.location = "#/comebacksoon";
   }

   $scope.printprescriptions = function(){
   
//console.log(Top_Static);
//document.write(Top_Static);

                           /* var dummy = {
   "updated":{
      "diagnosis":{
         "prognosis":[
            {
               "dosage":{
                  "dosage1":"3 days",
                  "dosage2":"3 days",
                  "dosage3":"10 days"
               },
               "drugType":{
                  "drugType1":"null",
                  "drugType2":"null",
                  "drugType3":"null"
               },
               "drugs":{
                  "drugs1":"Fexofenadine (120mg)",
                  "drugs2":"Tab - Paracetamol 500 mg",
                  "drugs3":"Cap Becozyme C forte"
               },
               "frequency":{
                  "frequency1":"0----0----1",
                  "frequency2":"1----1----1",
                  "frequency3":"0----1----0"
               },
               "instructions":{
                  "instructions1":"Take Steam Inhalation",
                  "instructions2":"Avoid cold foods and drinks",
                  "instructions3":"Cover your nose while Sneezing",
                  "instructions4":"Avoid congested places",
                  "instructions5":"Ensure adequate rest",
                  "instructions6":"hydration and nutricious diet"
               }
               
            }
         ]
         
      },
"doctorData":{
"contactNo": "9865471235",
"degreeAchived": "MD Surgery",
"emailId": "pratap_sanap@persistent.com",
"fullName": "Dr. Arun Jamkar",
"registrationNumber": "2007062565",
"signetureImageName":"0"
},
"userData":{
"userAge": "27",
"userFirstName": "Thamarai",
"userGender": "MALE"
}
   }
} */
  
var part_1 ="<!DOCTYPE html><html><head><title></title><style> table {  font-family: arial, sans-serif;  border-collapse: collapse;  width: 90%;} td, th {  border: 1px solid #dddddd;text-align: left; font-size: 14px; padding: 5px;}</style></head>  <body style='width:372px'><div style='width: 100%;'><img style ='position: relative; top: 32px; left:1px; height: 70px; width: 150px' src='"+$rootScope.printTemplateLogo+"' style='width:70px; height:70px;'><p style='width:52%;margin-left: 72px;margin-top: -72px;'><span> Patient Name:- "+ $scope.patientName +" </span><br><span> Age:-" + $scope.patienAge + "</span><br><span> Gender:-" + $scope.patientgender + "</span><br><span> Date:-" + $scope.dateTime + "</span></p></div><hr>";

 	var DoctorsSign = "<span style='font-size: 18px;font-family: Arial,bold'>Doctor's Signature:-</span>";
 	$scope.print =  part_1+$scope.telemedicinePrescriptionTable+DoctorsSign
 
 	jkiosk.print($scope.print,"onJobPrintComplete", "onJobPrintFailed");
    console.log(part_1+$scope.telemedicinePrescriptionTable+DoctorsSign);
 }



}]);
