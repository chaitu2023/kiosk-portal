higiKioskControllers.controller('mosambeePaymentController' , ['$interval', '$scope', '$http' , '$rootScope', 'HigiKioskStorageService', 'HigiKioskFlow', 'JkioskService', 'HigiKioskUserService', '$controller', 'HigiKioskUtilitiesService', 'HigiKioskAnimationService', '$timeout', function($interval, $scope, $http, $rootScope, HigiKioskStorageService, HigiKioskFlow, JkioskService, HigiKioskUserService, $controller, HigiKioskUtilitiesService, HigiKioskAnimationService, $timeout){
	

	$rootScope.availableVital = [];

	$rootScope.chooseCost = 0;

	$scope.kioskID="1111";
	$scope.cardPaymentDisable = false;
	$scope.disableClass = "";
	$rootScope.paymentMode = "";
	$rootScope.AuthorizationCodeCash = "";
	$rootScope.AuthorizationCodeSkip = "";
	setTimeout(function() {
	   	var jsontext = '{"KioskId": "'+$scope.kioskID+'"}';

        $.ajax({
            url: getSettingsValue('kiosk.api.url') +"/data/Getvitalcost",
            type : "POST", 
            cache: false,
            data: jsontext,
            contentType: 'application/json; charset=UTF-8',  
            headers:{"ApiToken":'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA=='},
            success: function(html){
           
                var jsonStr = JSON.parse(html.replace(/&quot;/g,'"'));
                console.log("jsonStr enabled");
                console.log(jsonStr);


               //$rootScope.AuthorizationCode = jsonStr.fullArray[0].Authorization_Code;
               	$rootScope.AuthorizationCodeCash = jsonStr.fullArray[0].Authorization_Code_Cash;
				$rootScope.AuthorizationCodeSkip = jsonStr.fullArray[0].Authorization_Code_Skip;

               $scope.alltest= jsonStr.fullArray[0].AllTest;
         
               $scope.bmc = jsonStr.fullArray[0].BMC;
           
               $scope.bloodPressure= jsonStr.fullArray[0].BloodPressure;
            
               $scope.ecg= jsonStr.fullArray[0].ECG;
            
               $scope.spo2= jsonStr.fullArray[0].SPO2;
          
               $scope.tempeature= jsonStr.fullArray[0].Tempeature;
          
               $scope.weight= jsonStr.fullArray[0].Weight;

               $rootScope.completeAllTestCost = jsonStr.fullArray[0].AllTest;
               $rootScope.ECGCost = jsonStr.fullArray[0].ECG;
               $rootScope.BMCCost = jsonStr.fullArray[0].BMC;
               $rootScope.BMICost = jsonStr.fullArray[0].Weight;
               $rootScope.BPCost = jsonStr.fullArray[0].BloodPressure;
               $rootScope.Spo2Cost =jsonStr.fullArray[0].SPO2;
               $rootScope.TempCost = jsonStr.fullArray[0].Tempeature;
               $rootScope.gstNumber = jsonStr.fullArray[0].gst_number;
               $rootScope.gstPercent = jsonStr.fullArray[0].gst_percent;
               $rootScope.footerMessage = jsonStr.fullArray[0].footer_message;
               $scope.companyLogoUrl = jsonStr.fullArray[0].company_logo_url;

               $scope.proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        	   $scope.targetUrl = $scope.companyLogoUrl;

	    		$scope.toDataUrl($scope.proxyUrl + $scope.targetUrl, function(myBase64) {
	      			//alert(myBase64);
	      			console.log(myBase64); // myBase64 is the base64 string
	      			$rootScope.printBase64Image = myBase64;
	    		});
           
               $scope.init();
            },

            error : function(xhr, status, error) { 
              //  alert("error");
                console.log(xhr.responseText);
            } 
        });
	}, 100);

	$scope.init = function() {

			/*for mosambee payment-hardware enable/disable (thamarai)*/
			if ($rootScope.mosambeeHardwareEnable == true) {
				//alert("hardware is available");
				$scope.cardPaymentDisable = false;
				$scope.disableClass = "";
			}else{
				//alert("hardware is not available");
				$scope.cardPaymentDisable = true;
				$scope.disableClass = "hardwaredisabled";
			}
			/*for mosambee payment-hardware enable/disable - end (thamarai)*/

			$rootScope.HSelect = [];

			$rootScope.HSelect['Body Composition'] = false;
			$rootScope.HSelect['Weight Scale']  = false;
			$rootScope.HSelect['temperature']  = false;
			$rootScope.HSelect['SPo2']  = false;
			$rootScope.HSelect['Blood Pressure']  = false;
			$rootScope.HSelect['ECG']  = false;

		$scope.kioskConfig = HigiKioskStorageService.returnSessionData('kioskConfigurationResult');
		//alert("inside payment");
		console.log($scope.kioskConfig);

		/*if ($scope.kioskConfig.kioskID == "1") {
			alert("kioskid");
		}*/
		$(".higi_top_nav_ng ").hide();

		  $rootScope.vitalCost = {
          "ECG": $scope.ecg,
          "BMC": $scope.bmc,
          "Weight": $scope.weight,
          "BloodPressure": $scope.bloodPressure,
          "SPO2": $scope.spo2,
          "Tempeature": $scope.tempeature,
          "AllTest": $scope.alltest
        };

        console.log("console.log($rootScope.hardwareAvailability);");
        console.log($rootScope.hardwareAvailability);

        $rootScope.vitalSlect = "";

        //$scope.totalVitalCost = $rootScope.vitalCost["ECG"]+$rootScope.vitalCost["BMC"]+$rootScope.vitalCost["Weight"]+$rootScope.vitalCost["BloodPressure"]+$rootScope.vitalCost["SPO2"]+$rootScope.vitalCost["Tempeature"];

        $scope.totalVitalCost = 0;

      if($rootScope.hardwareAvailability['Body Composition'] == false || $rootScope.hardwareAvailability['ECG'] == false || $rootScope.hardwareAvailability['Weight Scale'] == false || ($rootScope.hardwareAvailability['Blood Pressure'] == false || $rootScope.hardwareAvailability['SPo2'] == false) || $rootScope.hardwareAvailability['temperature'] == false){

          if($rootScope.hardwareAvailability['Body Composition'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["BMC"];
          }
          if($rootScope.hardwareAvailability['ECG'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["ECG"];
          }
          if($rootScope.hardwareAvailability['Weight Scale'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["Weight"];
          }
          if($rootScope.hardwareAvailability['Blood Pressure'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["BloodPressure"];
          }
          if($rootScope.hardwareAvailability['SPo2'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["SPO2"];
          }
          if($rootScope.hardwareAvailability['temperature'] == false){
            $scope.totalVitalCost += $rootScope.vitalCost["Tempeature"];
          }
          $rootScope.vitalCost['AllTest'] = $rootScope.vitalCost['AllTest'] - $scope.totalVitalCost;

          if($rootScope.vitalCost['AllTest'] <= 0){
          	$rootScope.vitalCost['AllTest'] = 0;
			$("#checkbox_bpw").attr("disabled", true);
			$("label[for='checkbox_bpw']").css({"opacity": "0.5"});
			$("label[for='checkbox_bpw']").css({"background-color": "#e2e2e2"});          	
          }
      }




		// enable and disabled the check box functionality
		if($rootScope.hardwareAvailability['SPo2'] == undefined || $rootScope.hardwareAvailability['SPo2'] == false) {
			console.log("spo2 not avaliable");
			$("#checkbox_spo2").attr("disabled", true);
			$("label[for='checkbox_spo2']").css({"opacity": "0.5"});
			$("label[for='checkbox_spo2']").css({"background-color": "#e2e2e2"});
		} else {
			console.log("spo2 avaliable");
		}

		if($rootScope.hardwareAvailability['Blood Pressure'] == undefined || $rootScope.hardwareAvailability['Blood Pressure'] == false) {
			console.log("Blood Pressure not avaliable");
			$("#checkbox_bp").attr("disabled", true);
			$("label[for='checkbox_bp']").css({"opacity": "0.5"});
			$("label[for='checkbox_bp']").css({"background-color": "#e2e2e2"});
		} else {
			console.log("Blood Pressure avaliable");
		}

		if($rootScope.hardwareAvailability['Weight Scale'] == undefined || $rootScope.hardwareAvailability['Weight Scale'] == false) {
			console.log("Weight Scale not avaliable");
			$("#checkbox_bmi").attr("disabled", true);
			$("label[for='checkbox_bmi']").css({"opacity": "0.5"});
			$("label[for='checkbox_bmi']").css({"background-color": "#e2e2e2"});


			$("#checkbox_bmc").attr("disabled", true);
			$("label[for='checkbox_bmc']").css({"opacity": "0.5"});
			$("label[for='checkbox_bmc']").css({"background-color": "#e2e2e2"});
			
		} else {
			console.log("spo2 avaliable");
		}

		if($rootScope.hardwareAvailability['Body Composition'] == undefined || $rootScope.hardwareAvailability['Body Composition'] == false) {
			$("#checkbox_bmc").attr("disabled", true);
			$("label[for='checkbox_bmc']").css({"opacity": "0.5"});
			$("label[for='checkbox_bmc']").css({"background-color": "#e2e2e2"});
		} else {
			console.log("Body Composition avaliable");
		}

		if($rootScope.hardwareAvailability['ECG'] == undefined || $rootScope.hardwareAvailability['ECG'] == false) {
			$("#checkbox_ecg").attr("disabled", true);
			$("label[for='checkbox_ecg']").css({"opacity": "0.5"});
			$("label[for='checkbox_ecg']").css({"background-color": "#e2e2e2"});
		} else {
			console.log("ecg avaliable");
		}

		if($rootScope.hardwareAvailability['temperature'] == undefined || $rootScope.hardwareAvailability['temperature'] == false) {
			$("#checkbox_temp").attr("disabled", true);
			$("label[for='checkbox_temp']").css({"opacity": "0.5"});
			$("label[for='checkbox_temp']").css({"background-color": "#e2e2e2"});
		} else {
			console.log("Body temperature avaliable");
		}

		$scope.getCount("increase");

	}	

	$scope.card_paymentButtonClick = function () {
		//temp,spo2,bmc,bmi,ecg,bp
		if ($rootScope.availableVital.includes("temp")) {
			$rootScope.HSelect['temperature'] = true;
		}else{
			$rootScope.HSelect['temperature'] = false;
		}
		if ($rootScope.availableVital.includes("spo2")) {
			$rootScope.HSelect['SPo2'] = true;	
		}else{
			$rootScope.HSelect['SPo2'] = false;
		}
		if ($rootScope.availableVital.includes("bmc")) {
			$rootScope.HSelect['Body Composition'] = true;
		}else{
			$rootScope.HSelect['Body Composition'] = false;
		}
		if ($rootScope.availableVital.includes("bmi")) {
			$rootScope.HSelect['Weight Scale'] = true;
		}else{
			$rootScope.HSelect['Weight Scale'] = false;
		}
		if ($rootScope.availableVital.includes("ecg")) {
			$rootScope.HSelect['ECG'] = true;
		}else{
			$rootScope.HSelect['ECG'] = false;
		}
		if ($rootScope.availableVital.includes("bp")) {
			$rootScope.HSelect['Blood Pressure'] = true;
		}else{
			$rootScope.HSelect['Blood Pressure'] = false;
		}

		if ($rootScope.availableVital.includes("bpw")) {
			if ($( "#checkbox_bp").prop('checked') == true) {

				$rootScope.HSelect['Blood Pressure'] = true;
			}else{
				$rootScope.HSelect['Blood Pressure'] = false;
			}

			if ($( "#checkbox_temp").prop('checked') == true) {

				$rootScope.HSelect['temperature'] = true;
			}else{
				$rootScope.HSelect['temperature'] = false;
			}

			if ($( "#checkbox_spo2").prop('checked') == true) {

				$rootScope.HSelect['SPo2'] = true;
			}else{
				$rootScope.HSelect['SPo2'] = false;
			}

			if ($( "#checkbox_bmc").prop('checked') == true) {

				$rootScope.HSelect['Body Composition'] = true;
			}else{
				$rootScope.HSelect['Body Composition'] = false;
			}

			if ($( "#checkbox_bmi").prop('checked') == true) {

				$rootScope.HSelect['Weight Scale'] = true;
			}else{
				$rootScope.HSelect['Weight Scale'] = false;
			}

			if ($( "#checkbox_ecg").prop('checked') == true) {

				$rootScope.HSelect['ECG'] = true;
			}else{
				$rootScope.HSelect['ECG'] = false;
			}	
		}
		console.log('ecg'+$rootScope.HSelect['ECG']);
		console.log('weig'+$rootScope.HSelect['Weight Scale']);
		console.log('bodycomp'+$rootScope.HSelect['Body Composition']);
		console.log('bp'+$rootScope.HSelect['Blood Pressure']);
		console.log('temp'+$rootScope.HSelect['temperature']);
		console.log('spo2'+$rootScope.HSelect['SPo2']);

		console.log('available vital '+$rootScope.availableVital);

		$rootScope.paymentMode = "card";
		if($rootScope.chooseCost==0 || $rootScope.chooseCost==undefined || $rootScope.chooseCost==null){
		 $("#paymentForZeroCost").show();
		 $timeout(function(){
		 	$("#paymentForZeroCost").hide();
		 },2500, false);
		}else{
		   $rootScope.paymentMode = "card";
		   $timeout(function(){
       			$rootScope.loadModal({id : 'payment_mobile_credential'});
       			$rootScope.paymentRetrigger();
       	   },100);
	    }
    }

    $scope.upi_paymentButtonClick = function(){
    	//temp,spo2,bmc,bmi,ecg,bp
		if ($rootScope.availableVital.includes("temp")) {
			$rootScope.HSelect['temperature'] = true;
		}else{
			$rootScope.HSelect['temperature'] = false;
		}
		if ($rootScope.availableVital.includes("spo2")) {
			$rootScope.HSelect['SPo2'] = true;	
		}else{
			$rootScope.HSelect['SPo2'] = false;
		}
		if ($rootScope.availableVital.includes("bmc")) {
			$rootScope.HSelect['Body Composition'] = true;
		}else{
			$rootScope.HSelect['Body Composition'] = false;
		}
		if ($rootScope.availableVital.includes("bmi")) {
			$rootScope.HSelect['Weight Scale'] = true;
		}else{
			$rootScope.HSelect['Weight Scale'] = false;
		}
		if ($rootScope.availableVital.includes("ecg")) {
			$rootScope.HSelect['ECG'] = true;
		}else{
			$rootScope.HSelect['ECG'] = false;
		}
		if ($rootScope.availableVital.includes("bp")) {
			$rootScope.HSelect['Blood Pressure'] = true;
		}else{
			$rootScope.HSelect['Blood Pressure'] = false;
		}

		if ($rootScope.availableVital.includes("bpw")) {
			if ($( "#checkbox_bp").prop('checked') == true) {

				$rootScope.HSelect['Blood Pressure'] = true;
			}else{
				$rootScope.HSelect['Blood Pressure'] = false;
			}

			if ($( "#checkbox_temp").prop('checked') == true) {

				$rootScope.HSelect['temperature'] = true;
			}else{
				$rootScope.HSelect['temperature'] = false;
			}

			if ($( "#checkbox_spo2").prop('checked') == true) {

				$rootScope.HSelect['SPo2'] = true;
			}else{
				$rootScope.HSelect['SPo2'] = false;
			}

			if ($( "#checkbox_bmc").prop('checked') == true) {

				$rootScope.HSelect['Body Composition'] = true;
			}else{
				$rootScope.HSelect['Body Composition'] = false;
			}

			if ($( "#checkbox_bmi").prop('checked') == true) {

				$rootScope.HSelect['Weight Scale'] = true;
			}else{
				$rootScope.HSelect['Weight Scale'] = false;
			}

			if ($( "#checkbox_ecg").prop('checked') == true) {

				$rootScope.HSelect['ECG'] = true;
			}else{
				$rootScope.HSelect['ECG'] = false;
			}	
		}
		console.log('ecg'+$rootScope.HSelect['ECG']);
		console.log('weig'+$rootScope.HSelect['Weight Scale']);
		console.log('bodycomp'+$rootScope.HSelect['Body Composition']);
		console.log('bp'+$rootScope.HSelect['Blood Pressure']);
		console.log('temp'+$rootScope.HSelect['temperature']);
		console.log('spo2'+$rootScope.HSelect['SPo2']);

		console.log('available vital '+$rootScope.availableVital);

    	$rootScope.paymentMode = "UPI";
    	if($rootScope.chooseCost==0||$rootScope.chooseCost==undefined || $rootScope.chooseCost==null){
		 $("#paymentForZeroCost").show();
		 $timeout(function(){
		 	$("#paymentForZeroCost").hide();
		 },2500);
		}else{
       		$rootScope.paymentMode = "UPI";
       		$timeout(function(){
				$rootScope.loadModal({id : 'payment_mobile_credential'});
				$rootScope.paymentRetrigger();
       		},100);
       	}
    }	

    $scope.cash_paymentButtonClick = function(){
    	//temp,spo2,bmc,bmi,ecg,bp
		if ($rootScope.availableVital.includes("temp")) {
			$rootScope.HSelect['temperature'] = true;
		}else{
			$rootScope.HSelect['temperature'] = false;
		}
		if ($rootScope.availableVital.includes("spo2")) {
			$rootScope.HSelect['SPo2'] = true;	
		}else{
			$rootScope.HSelect['SPo2'] = false;
		}
		if ($rootScope.availableVital.includes("bmc")) {
			$rootScope.HSelect['Body Composition'] = true;
		}else{
			$rootScope.HSelect['Body Composition'] = false;
		}
		if ($rootScope.availableVital.includes("bmi")) {
			$rootScope.HSelect['Weight Scale'] = true;
		}else{
			$rootScope.HSelect['Weight Scale'] = false;
		}
		if ($rootScope.availableVital.includes("ecg")) {
			$rootScope.HSelect['ECG'] = true;
		}else{
			$rootScope.HSelect['ECG'] = false;
		}
		if ($rootScope.availableVital.includes("bp")) {
			$rootScope.HSelect['Blood Pressure'] = true;
		}else{
			$rootScope.HSelect['Blood Pressure'] = false;
		}

		if ($rootScope.availableVital.includes("bpw")) {
			if ($( "#checkbox_bp").prop('checked') == true) {

				$rootScope.HSelect['Blood Pressure'] = true;
			}else{
				$rootScope.HSelect['Blood Pressure'] = false;
			}

			if ($( "#checkbox_temp").prop('checked') == true) {

				$rootScope.HSelect['temperature'] = true;
			}else{
				$rootScope.HSelect['temperature'] = false;
			}

			if ($( "#checkbox_spo2").prop('checked') == true) {

				$rootScope.HSelect['SPo2'] = true;
			}else{
				$rootScope.HSelect['SPo2'] = false;
			}

			if ($( "#checkbox_bmc").prop('checked') == true) {

				$rootScope.HSelect['Body Composition'] = true;
			}else{
				$rootScope.HSelect['Body Composition'] = false;
			}

			if ($( "#checkbox_bmi").prop('checked') == true) {

				$rootScope.HSelect['Weight Scale'] = true;
			}else{
				$rootScope.HSelect['Weight Scale'] = false;
			}

			if ($( "#checkbox_ecg").prop('checked') == true) {

				$rootScope.HSelect['ECG'] = true;
			}else{
				$rootScope.HSelect['ECG'] = false;
			}	
		}

		console.log('ecg'+$rootScope.HSelect['ECG']);
		console.log('weig'+$rootScope.HSelect['Weight Scale']);
		console.log('bodycomp'+$rootScope.HSelect['Body Composition']);
		console.log('bp'+$rootScope.HSelect['Blood Pressure']);
		console.log('temp'+$rootScope.HSelect['temperature']);
		console.log('spo2'+$rootScope.HSelect['SPo2']);

		console.log('available vital '+$rootScope.availableVital);
       $rootScope.paymentMode = "cash";
	   if($rootScope.chooseCost==0 || $rootScope.chooseCost==undefined || $rootScope.chooseCost==null){
		 $("#paymentForZeroCost").show();
		 $timeout(function(){
		 	$("#paymentForZeroCost").hide();
		 },3000);
		}else{
			$rootScope.paymentMode = "cash";
       		$timeout(function(){       		
       			$rootScope.loadModal({id : 'payment_mobile_credential'});
       			$rootScope.paymentRetrigger();
      		},100);
       	}
    }


	$scope.getCount = function(option){
		if(option == "increase"){
			if($rootScope.vitalSlect  == "bmc"){
				$( "#checkbox_bmc").prop( "checked", true );


				$rootScope.HSelect['Body Composition']=true;
				$rootScope.chooseCost += $rootScope.vitalCost['BMC'];				
				$("#checkbox_bmc_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_bmc_label").css({"background-color": "ghostwhite"});
			} else if($rootScope.vitalSlect  == "bpw"){
				$( "#checkbox_bpw").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['AllTest'];

					$("#checkbox_bpw_label").css({"border": "1px solid #4295d1"});
					$("#checkbox_bpw_label").css({"background-color": "ghostwhite"});


					$rootScope.availableVital = [];
					$rootScope.availableVital.push($rootScope.vitalSlect);

					if($rootScope.hardwareAvailability['Body Composition'] == true){
						$( "#checkbox_bmc").prop( "checked", true );
						$("#checkbox_bmc_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bmc_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['Body Composition']=true;
					}else{
						$rootScope.HSelect['Body Composition']=false;
					}
					if($rootScope.hardwareAvailability['ECG'] == true){
						$( "#checkbox_ecg").prop( "checked", true );
						$("#checkbox_ecg_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_ecg_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['ECG']=true;
					}else{
						$rootScope.HSelect['ECG']=false;
					}
					if($rootScope.hardwareAvailability['Weight Scale'] == true){
						$( "#checkbox_bmi").prop( "checked", true );
						$("#checkbox_bmi_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bmi_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['Weight Scale']=true;
					}else{
						$rootScope.HSelect['Weight Scale']=false;
					}
					if($rootScope.hardwareAvailability['Blood Pressure'] == true){
						$( "#checkbox_bp").prop( "checked", true );
						$("#checkbox_bp_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bp_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['Blood Pressure']=true;
					}else{
						$rootScope.HSelect['Blood Pressure']=false;
					}
					if($rootScope.hardwareAvailability['SPo2'] == true){
						$( "#checkbox_spo2").prop( "checked", true );
						$("#checkbox_spo2_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_spo2_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['SPo2']=true;
					}else{
						$rootScope.HSelect['SPo2']=false;
					}
					if($rootScope.hardwareAvailability['temperature'] == true){
						$( "#checkbox_temp").prop( "checked", true );
						$("#checkbox_temp_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_temp_label").css({"background-color": "ghostwhite"});
						$rootScope.HSelect['temperature']=true;
					}else{
                        $rootScope.HSelect['temperature']=false;
					}

					$rootScope.chooseCost = $rootScope.vitalCost['AllTest'];




			} else if($rootScope.vitalSlect  == "ekg"){
				$( "#checkbox_ecg").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['ECG'];
				$("#checkbox_ecg_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_ecg_label").css({"background-color": "ghostwhite"});
				$rootScope.HSelect['ECG']=true;
			} else if($rootScope.vitalSlect  == "w"){
				$( "#checkbox_bmi").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['Weight'];
				$("#checkbox_bmi_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_bmi_label").css({"background-color": "ghostwhite"});
				$rootScope.HSelect['Weight Scale']=true;
			} else if($rootScope.vitalSlect  == "bp"){
				$( "#checkbox_bp").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['BloodPressure'];
				$("#checkbox_bp_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_bp_label").css({"background-color": "ghostwhite"});
				$rootScope.HSelect['Blood Pressure']=true;
			} else if($rootScope.vitalSlect  == "spo2"){
				$( "#checkbox_spo2").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['SPO2'];
				$("#checkbox_spo2_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_spo2_label").css({"background-color": "ghostwhite"});
				$rootScope.HSelect['SPo2']=true;
			} else if($rootScope.vitalSlect  == "temp"){
				$( "#checkbox_temp").prop( "checked", true );
				$rootScope.chooseCost += $rootScope.vitalCost['Tempeature'];
				$("#checkbox_temp_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_temp_label").css({"background-color": "ghostwhite"});
				$rootScope.HSelect['temperature']=true;
			}

		} else if(option == "decrease"){
			if($rootScope.vitalSlect  == "bmc"){
				$( "#checkbox_bmc").prop( "checked", true );
            $rootScope.HSelect['Body Composition']=false;
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['BMC'];
			} else if($rootScope.vitalSlect  == "bpw"){
				$( "#checkbox_bpw").prop( "checked", true );
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['AllTest'];
			} else if($rootScope.vitalSlect  == "ekg"){
				$( "#checkbox_ecg").prop( "checked", true );
				$rootScope.HSelect['ECG']=false;
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['ECG'];
			} else if($rootScope.vitalSlect  == "w"){
				$( "#checkbox_bmi").prop( "checked", true );
				$rootScope.HSelect['Weight Scale']=false;
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['Weight'];
			} else if($rootScope.vitalSlect  == "bp"){
				$( "#checkbox_bp").prop( "checked", true );
				$rootScope.HSelect['Blood Pressure']=false;
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['BloodPressure'];
			} else if($rootScope.vitalSlect  == "spo2"){
				$( "#checkbox_spo2").prop( "checked", true );
				$rootScope.HSelect['SPo2']=false;
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['SPO2'];
			} else if($rootScope.vitalSlect  == "temp"){
				$( "#checkbox_temp").prop( "checked", true );
				$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['Tempeature'];
				$rootScope.HSelect['temperature']=false;
			}			
		}

		$( document ).ready(function() {
			$('.count').text($rootScope.chooseCost.toString());
			countAnimation();
		});
	}

	function countAnimation(){
			$('.count').each(function () {
			    $(this).prop('Counter',0).animate({
			        Counter: $(this).text()
			    }, {
			        duration: 500,
			        easing: 'swing',
			        step: function (now) {
			            $(this).text(Math.ceil(now));
			        }
			    });
			});
	}

	$scope.checkedVital = function(value){
		console.log($rootScope.hardwareAvailability);

		if(true){ // hardwae avaliablity enable
			if($("#checkbox_"+value).is(":checked")) {
				$("#checkbox_"+value+"_label").css({"border": "1px solid #4295d1"});
				$("#checkbox_"+value+"_label").css({"background-color": "ghostwhite"});
				

				$rootScope.availableVital.push(value);		

				if(value == "bpw"){
					$rootScope.vitalSlect = "bpw";						
				} else if(value == "ecg"){
					$rootScope.vitalSlect = "ekg";
				} else if(value == "bp"){
					$rootScope.vitalSlect = "bp";
				} else if(value == "bmc"){
					$rootScope.vitalSlect = "bmc";
				} else if(value == "spo2"){
					$rootScope.vitalSlect = "spo2";
				} else if(value == "bmi"){
					$rootScope.vitalSlect = "w";
				} else if(value == "temp"){
					$rootScope.vitalSlect = "temp";	
				}

				if(value == "bpw") {
					$rootScope.availableVital = [];
					$rootScope.availableVital.push(value);

					if($rootScope.hardwareAvailability['Body Composition'] == true){
						$( "#checkbox_bmc").prop( "checked", true );
						$("#checkbox_bmc_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bmc_label").css({"background-color": "ghostwhite"});
					}
					if($rootScope.hardwareAvailability['ECG'] == true){
						$( "#checkbox_ecg").prop( "checked", true );
						$("#checkbox_ecg_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_ecg_label").css({"background-color": "ghostwhite"});
					}
					if($rootScope.hardwareAvailability['Weight Scale'] == true){
						$( "#checkbox_bmi").prop( "checked", true );
						$("#checkbox_bmi_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bmi_label").css({"background-color": "ghostwhite"});
					}
					if($rootScope.hardwareAvailability['Blood Pressure'] == true){
						$( "#checkbox_bp").prop( "checked", true );
						$("#checkbox_bp_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_bp_label").css({"background-color": "ghostwhite"});
					}
					if($rootScope.hardwareAvailability['SPo2'] == true){
						$( "#checkbox_spo2").prop( "checked", true );
						$("#checkbox_spo2_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_spo2_label").css({"background-color": "ghostwhite"});
					}
					if($rootScope.hardwareAvailability['temperature'] == true){
						$( "#checkbox_temp").prop( "checked", true );
						$("#checkbox_temp_label").css({"border": "1px solid #4295d1"});
						$("#checkbox_temp_label").css({"background-color": "ghostwhite"});
					}
					$rootScope.chooseCost = 0;
				}

				
				$scope.getCount("increase");


			} else {
				$("#checkbox_"+value+"_label").css({"border": "1px solid #e2e2e2"});
				$("#checkbox_"+value+"_label").css({"background-color": "#f7f7f7"});

					if(value == "bpw"){
						$rootScope.vitalSlect = "bpw";


						$rootScope.availableVital = [];

						if($rootScope.hardwareAvailability['Body Composition'] == true){
							$( "#checkbox_bmc").prop( "checked", false );
							$("#checkbox_bmc_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_bmc_label").css({"background-color": "#f7f7f7"});
						}
						if($rootScope.hardwareAvailability['ECG'] == true){
							$( "#checkbox_ecg").prop( "checked", false );
							$("#checkbox_ecg_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_ecg_label").css({"background-color": "#f7f7f7"});
						}
						if($rootScope.hardwareAvailability['Weight Scale'] == true){
							$( "#checkbox_bmi").prop( "checked", false );
							$("#checkbox_bmi_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_bmi_label").css({"background-color": "#f7f7f7"});
						}
						if($rootScope.hardwareAvailability['Blood Pressure'] == true){
							$( "#checkbox_bp").prop( "checked", false );
							$("#checkbox_bp_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_bp_label").css({"background-color": "#f7f7f7"});
						}
						if($rootScope.hardwareAvailability['SPo2'] == true){
							$( "#checkbox_spo2").prop( "checked", false );
							$("#checkbox_spo2_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_spo2_label").css({"background-color": "#f7f7f7"});
						}
						if($rootScope.hardwareAvailability['temperature'] == true){
							$( "#checkbox_temp").prop( "checked", false );
							$("#checkbox_temp_label").css({"border": "1px solid #e2e2e2"});
							$("#checkbox_temp_label").css({"background-color": "#f7f7f7"});
						}
						





					} else if(value == "ecg"){
						$rootScope.vitalSlect = "ekg";
					} else if(value == "bp"){
						$rootScope.vitalSlect = "bp";
					} else if(value == "bmc"){
						$rootScope.vitalSlect = "bmc";
					} else if(value == "spo2"){
						$rootScope.vitalSlect = "spo2";
					} else if(value == "bmi"){
						$rootScope.vitalSlect = "w";
					} else if(value == "temp"){
						$rootScope.vitalSlect = "temp";	
					}

					if($rootScope.vitalSlect  == "bmc"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['BMC'];
					} else if($rootScope.vitalSlect  == "bpw"){
						$("#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['AllTest'];
					} else if($rootScope.vitalSlect  == "ekg"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['ECG'];
					} else if($rootScope.vitalSlect  == "w"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['Weight'];
					} else if($rootScope.vitalSlect  == "bp"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['BloodPressure'];
					} else if($rootScope.vitalSlect  == "spo2"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['SPO2'];
					} else if($rootScope.vitalSlect  == "temp"){
						$( "#checkbox_bpw").prop( "checked", false );
						$("#checkbox_bpw_label").css({"border": "1px solid #e2e2e2"});
						$("#checkbox_bpw_label").css({"background-color": "#f7f7f7"});
						$scope.sumOfSelectedVital();
						//$rootScope.chooseCost = $rootScope.chooseCost - $rootScope.vitalCost['Tempeature'];
					}			

					$( document ).ready(function() {
						if(value == "bpw"){
							$rootScope.chooseCost = 0;
						}
						$('.count').text($rootScope.chooseCost.toString());
						countAnimation();
					//	alert($rootScope.totalVitalCost);
					});


				$rootScope.availableVital = jQuery.grep($rootScope.availableVital, function(element) {
				  	return element != value;
				});

				$( "#checkbox_"+value).prop( "checked", false );

			}	
		} else {  // hardwae avaliablity disabled			
			// unable to checked that vital box
		}
		console.log("user sected vital list ");
		console.log($rootScope.availableVital);
	}

	$scope.sumOfSelectedVital = function(){
		$rootScope.chooseCost = 0;
		if($("#checkbox_bp").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['BloodPressure'];
		}
		if($("#checkbox_bmi").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['Weight'];
		}
		if($("#checkbox_bmc").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['BMC'];
		}
		if($("#checkbox_ecg").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['ECG'];
		}
		if($("#checkbox_spo2").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['SPO2'];
		}
		if($("#checkbox_temp").is(":checked")){
			$rootScope.chooseCost += $rootScope.vitalCost['Tempeature'];
		}
	}

	$scope.toDataUrl = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result);
          }
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
  	}
	
	$timeout(function() {			
		$scope.init();
	}, 3000);
	
}]);
   