higiKioskControllers.controller('razorPayUPIPaymentController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService','HigiKioskUtilitiesService', '$interval', 'HigiApiService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiKioskUtilitiesService, $interval, HigiApiService){

 	$scope.bharatQR = "";
 	var CheckUPITransaction;
	var CheckUPIStatusRequest = 0;
	$scope.CheckUPIStatusStop = false;
	$scope.PaymentSuccess = false;
	$scope.PaymentFailed = false;
	$scope.sessionEnd = false;
	var pageRedirectStop = true;
	$scope.invoiceNumber = "NA";

	$scope.CheckUPIStatusCallbackResCount = 0;
 	$scope.init = function(){

 		function UpiInterfaceLabels(){
 			this.title = "upiPayment.title";
 			this.instruction_1 = "upiPayment.instruction_1";
 			this.instruction_2 = "upiPayment.instruction_2";
 			this.timeout_msg_1 = "upiPayment.timeout_msg_1";
 			this.timeout_msg_2 = "upiPayment.timeout_msg_2";
 			this.success_msg_1 = "upiPayment.success_msg_1";
 			this.success_msg_2 = "upiPayment.success_msg_2";
 			this.failure_msg_1 = "upiPayment.failure_msg_1";
 			this.failure_msg_2 = "upiPayment.failure_msg_2";
 		};

 		$scope.upiInterfaceLabels = new UpiInterfaceLabels();

		$(".higi_top_nav_ng ").hide();

	   	console.log($rootScope.bharatQR);

	   	if ($rootScope.dataForAppointmentBooking != undefined && $rootScope.IHLTeleConsultSelected == true) {
 			$scope.consultCost = $rootScope.dataForAppointmentBooking["doctorFees"];
 			//$scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
 		}

	   	$scope.QRCodeInstruction = true;
	   	$scope.PaymentSuccess = false;
	   	$scope.PaymentFailed = false;
	   	$scope.sessionEnd = false;

	   	$scope.bharatQR = $rootScope.bharatQR;
	   	console.log($scope.bharatQR);

	   	if($rootScope.qrId != undefined){
	   		CheckUPIStatus();
	   	}
	    
	   
	    //$timeout(function(){
	    CheckUPITransaction = $interval(CheckUPIStatus, 5000);
	    //},100);
	    


		/*var bharatQRPayemntApiTrigger = null;
		var bharatQRPayemntApiTriggerReq = 0;
		$scope.bharatQRPayemntStop = false;*/
           

		/*$scope.bharatQRPayemntApiTriggerRes = function(Res){
			if(Res.staus){
				var jsonRes = JSON.parse(Res.response);
				if(jsonRes.status == "success"){
					// refirect to welcome screen
					//$scope.bharatQRPayemntStop = true;
					bharatQRPayemntApiTriggerReq = 0;
					$("#payment_success").show();
				} else if(jsonRes.status == "faild") {
					// redirect to payment page.
					$("#payment_failed").show();
					$scope.bharatQRPayemntStop = true;
					bharatQRPayemntApiTriggerReq = 0;
				} else {
					bharatQRPayemntApiTriggerReq++;			
					if(bharatQRPayemntApiTriggerReq >= 180){
						bharatQRPayemntApiTriggerReq = 0;
						// redirect to payment apge.
					}
				}
			} else {

			}
		}*/

		/*function bharatQRPayemntApiTriggerReq(){
			bharatQRPayemntApiTriggerReq++;
			var jsonReq = {
				"invoice" : "123432",
				"transaction_type":"upi"
			};
			if($scope.bharatQRPayemntStop == true){
				$interval.cancel(bharatQRPayemntApiTrigger);
			} else {
				JkioskService.bharatQRPayemntApiTrigger($scope.bharatQRPayemntApiTriggerRes, jsonReq);
			}
		}*/
	   /*$scope.prevIsVisible = true;
	   $scope.payment = true;*/
	   //alert($scope.payment);
   		/*if($scope.payment)
		{
			$("#payment_success").hide();
			$("#payment_failed").show();
			
		}
		else{
			$("#payment_failed").hide();
			$("#payment_success").show();
			
		}	*/

   
        // 10 minutes from now
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
					//window.location = '#/mosambeePayment';
				}
			}
			update_clock(); // run function once at first to avoid delay
			var timeinterval = setInterval(update_clock,1000);
		}
		run_clock('clockdiv',deadline);

		$scope.$on("$destroy", function(){
			if (CheckUPITransaction != undefined) {
				$interval.cancel(CheckUPITransaction);
			}
			if(CheckUPIStatus != undefined){
				CheckUPIStatus = undefined;
			}
			$rootScope.qrId = undefined;
			$rootScope.bharatQR = undefined;
			$scope.bharatQR = "";
 			CheckUPITransaction;
			CheckUPIStatusRequest = 0;
			$scope.CheckUPIStatusStop = false;
			$scope.PaymentSuccess = false;
			$scope.PaymentFailed = false;
			$scope.sessionEnd = false;
			pageRedirectStop = true;
			$scope.CheckUPIStatusCallbackResCount = 0;
      console.log("destroying upi controller ");
    });
  };
 	//end of init func

   /*$scope.paymentStatus = function(){
	
	  $("#qr_code_instru").hide();
	  $("#payment_success").show();
	  $("#payment_failed").hide();
    }*/
   /* $scope.backButtonOut = function(){
    	JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_backButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide back';
        $timeout(function(){
            window.location = '#/mosambeePayment';
        }, 500)
    };*/
    $scope.checkPrinterPaperStatus = function() {
      //alert("prtsd1");
        JkioskService.callPrintPaperStatusFunction($scope.checkPrinterPaperStatusCallbackResponse);
    }

     $scope.checkPrinterPaperStatusCallbackResponse = function(response) {
      //alert("prtsd2");
        var paperStatusResponse = response.printerPaperStatus;
        //console.log(paperStatusResponse);
        if(!paperStatusResponse) {
            //alert("No Paper");
            if($rootScope.teleConsulationVideoCallToggle !== true){
              $rootScope.paperAvailable = false;
              $rootScope.loadModal({id : 'printerInfo'});
            }else{
              $rootScope.paperAvailable = false;
              alert("paper not available");
            }
            
        } else {
          //  alert("Paper available");
          if($rootScope.teleConsulationVideoCallToggle !== true){
            $rootScope.paperAvailable = true;
            $rootScope.loadModal({id : 'printerInfo'});
          }else{
            $rootScope.paperAvailable = true;
            $rootScope.printCheckinResultsConfirmation();
          }
        }
    }
     $scope.printCheckinResults = function(){
      //alert("prtsd3");
        //JkioskService.logEvent($rootScope.higiPageName + '_printResultsButton', 'button', 'pressed');
        $scope.checkPrinterPaperStatus();
        //$rootScope.loadModal({id : 'printerInfo'});
       /* jkiosk.getPrinterSettings(function(respo){
            HigiKioskStorageService.saveSessionData('printerSettingsResult', respo);
            $scope.continuePrintCheckinResults();
        }); */
    };

    $rootScope.printCheckinResultsConfirmation = function(){
      //alert("prtsd4");
        jkiosk.getPrinterSettings(function(respo){
            HigiKioskStorageService.saveSessionData('printerSettingsResult', respo);
            //$scope.continuePrintCheckinResults();
            $scope.newprintercheckinresults();
        });
    }

     $scope.newprintercheckinresults = function(){
      ///alert("prtsd5");
      $scope.printerSettingsResult=HigiKioskStorageService.returnSessionData('printerSettingsResult');

     
	   if($rootScope.user.firstName != undefined){
	        if($rootScope.user.firstName != undefined){
	            var printUser = $rootScope.user.firstName;
	        } else {
	        printUser = "Valid User";
	        }
	    } else {
	         printUser = "Guest User"; 
	    }   

	    if($rootScope.user['email'] != undefined){
	    	$scope.printEmail = $rootScope.user['email'];
	    }else{
			$scope.printEmail = "N/A";
	    }
	    if($rootScope.user['mobileNumber'] != undefined){
	    	$scope.printMobilnum = $rootScope.user['mobileNumber'];
	    }else{
	    	$scope.printMobilnum = "N/A";
	    }
	    if($rootScope.IHLTeleConsultSelected == true){
		    if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'] != undefined){
				$scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
		    }else{
		    	$scope.consultantName = "N/A";
		    }
	    }
	     //$scope.printEmail = $rootScope.user['email'];
	     //$scope.printMobilnum = $rootScope.user['mobileNumber'];
	     //console.log($rootScope.user['name']);
	     console.log($rootScope.user['email']);
	     console.log($rootScope.user['mobileNumber']);
	     console.log($scope.consultantName);
	     $scope.today = new Date();
	     var today = $scope.today;
	     var trimDate = today.toString();
	     var trimmedDate = trimDate.slice(0,25);
	     //alert(trimmedDate);
	     //console.log(typeof($rootScope.kioskVitalTestCost));
	     var InVvalue = Math.floor((Math.random()*999999999)+1);
				
		 //var invoiceVal = "IHL/2021-22/0000"+InVvalue+"";
		   var invoiceVal = $scope.invoiceNumber;
	     //gst calc

	    $scope.finalKioskVitalTestCost = ($rootScope.kioskVitalTestCost - ((18*1/100) * $rootScope.kioskVitalTestCost));
	    $scope.igstAmtVitcost = (18*1/100) * $rootScope.kioskVitalTestCost;
	    	
	    $scope.finalKioskVitalTestCost = +$scope.finalKioskVitalTestCost.toFixed(2);
	    $scope.finalConsultCost = ($scope.consultCost - ((18*1/100) * $scope.consultCost));
	    $scope.igstAmtConcost = (18*1/100) * $scope.consultCost;

 

    if($rootScope.IHLTeleConsultSelected == false){

           if($scope.printerSettingsResult.PaperWidth == 827){ 

            //console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:76px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
            }else if($scope.printerSettingsResult.PaperWidth == 315){ // Thermal or Regular Printer check 
                //alert("Thermal Printer condition satisfied");          
                //console.log("Thermal Printer condition satisfied");

             var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:400px;height:470px;margin-left:0px;margin-top:-50px;font-size:11px;'><img style ='position: relative; top: 50px; left:120px;width: 25%;' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"


            }else
            {
                //alert("Regular Printer");
                //console.log("Regular Printer");
            var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:99px; height: 71px; width: 174px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"  

            }

            $rootScope.final_print_resultss = common_details_prints;


            $scope.printMerge = "";

                
                  //alert("BP not taken");
                  
                  //if($scope.printerSettingsResult.PaperWidth == 827){
                  	if(true){
                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"UPI/Net Banking"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST 18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
    }else{


                	if($scope.printerSettingsResult.PaperWidth == 827){ 
                   // console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:76px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
            }else if($scope.printerSettingsResult.PaperWidth == 315){ // Thermal or Regular Printer check 
                //alert("Thermal Printer condition satisfied");          
                //console.log("Thermal Printer condition satisfied");

             var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:400px;height:470px;margin-left:0px;margin-top:-50px;font-size:11px;'><img style ='position: relative; top: 50px; left:120px;width: 25%;' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"


            }else
            {
                //alert("Regular Printer");
                //console.log("Regular Printer");
            var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:99px; height: 71px; width: 174px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"  

            }

            $rootScope.final_print_resultss = common_details_prints;


            $scope.printMerge = "";

                	//if($scope.printerSettingsResult.PaperWidth == 827){
                		if(true){
                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"UPI/Net Banking"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>--------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
                }
                //}
                $scope.print =  $rootScope.final_print_resultss;
                //  console.log( "PrintResult"+ $scope.print);

             jkiosk.print($scope.print,"onJobPrintComplete", "onJobPrintFailed");
            }

   $scope.TransactionStatusRes = function(res){
   		console.log(res);
   		var transactionResponse = res;

   		$scope.CheckUPIStatusCallbackResCount++;

/*if($scope.CheckUPIStatusCallbackResCount > 10){
	transactionResponse.TransactionStatus = "Transaction Success";
}*/
   		if (transactionResponse != null && transactionResponse != undefined && transactionResponse != "") {
   			if (transactionResponse.status == true) {
   				if (transactionResponse.TransactionStatus != "" && transactionResponse.TransactionStatus != undefined && transactionResponse.TransactionStatus != null) {
   					//var upiResponse = JSON.parse(transactionResponse.TransactionStatus);
   					//if (upiResponse.transactionResponse == "Approved") {
   					if (transactionResponse.TransactionStatus == "Transaction Success") {
   						$scope.CheckUPIStatusStop = true; 
   						CheckUPIStatusRequest = 0;
   						$scope.QRCodeInstruction = false;
   						$scope.PaymentSuccess = true;
   						$scope.PaymentFailed = false;
   						$scope.sessionEnd = false;
   						$rootScope.paymentTransactionCompleted = true;
   						//$scope.printCheckinResultsConfirmation();

   						let serviceToProvide;
   						let userIhlId = "";
   						let purposeOfVisit = "";
                  		let vendorName = "";
   						if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false) {
   							$rootScope.userPaidServices["invoice_id"] = $rootScope.unique_invoice_no;
   							serviceToProvide = JSON.stringify($rootScope.kioskVitalTestToProvide());
   							userIhlId = "";
   							purposeOfVisit = "vital";
   						}

   						if ($rootScope.IHLTeleConsultSelected == true) {
            				serviceToProvide = JSON.stringify($rootScope.userPaidServices);
            				userIhlId = "";
            				purposeOfVisit = "teleconsult";
		                    let selectedDoctor = $rootScope.teleconsultationUserSelectedData;
		                    vendorName = selectedDoctor['tele-consultation-selected-doctor']['vendor_id'];
          				}

   						var today = new Date(); 
          				var dd = today.getDate(); 
          				var mm = today.getMonth() + 1; 
          				var yyyy = today.getFullYear(); 
        
          				if (dd < 10) { 
            				dd = '0' + dd; 
          				} 
          				if (mm < 10) { 
            				mm = '0' + mm; 
          				} 
          				var today = mm + '/' + dd + '/' + yyyy; 
          				var today = today.toString();

          				//alert(today);

   						var status="approved";
          				var acquire="";
          				var applable="";
          				var applicationid="";
          				var approvalcode="";
          				var batchnumber ="";
          				var billnumber="";
          				var cardnumber="";
          				var cardtype ="";
          				var Cid="";
          				var Currency="";
          				var ddate= today;
          				var merchantid ="";
          				var retrieval ="";
          				var Stan="";
          				var statuscode="";
          				var terminalid="";
          				var Time="";
          				var transactionid ="";
          				var transactionmode ="";
          				var Tsi ="";
          				var Tvr="";
          				var MobileNumberGet =  $rootScope.upiUniqueMobileNumber;
          				var invoiceNumber = $rootScope.unique_invoice_no;
          				$rootScope.invoiceIdForApolloTeleconsultationService = $rootScope.unique_invoice_no;
          				//var Totalamount = $rootScope.upiUniqueAmount;
          				let Totalamount = "0";
				        let MRPCost = "0";
				        // let Discounts = "0";
						let Discounts = "";
				        let DiscountType = "";
				        let CouponNumber = "";
				        let ConsultantID = "";
				        let ConsultantName = "";
				        let AppointmentID = "";
				        let PurposeDetails = "";
				        let SourceDevice = "kiosk";
				        let Service_Provided = "false";
				        $rootScope.paymentTransactionIdValue = "";
						let mobileNum = $rootScope.upiUniqueMobileNumber;
						let principalAmt = "";
						let gstAmt = "";
						let userState = $rootScope.stateforpayment;
						let accountName = "";

				        if ($rootScope.IHLTeleConsultSelected == true) {
				        	Totalamount = $rootScope.dataForAppointmentBooking["doctorFees"].toString();
				        	ConsultantID = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
                    		ConsultantName = $rootScope.dataForAppointmentBooking["doctorInfo"]["name"];
                    		PurposeDetails = JSON.stringify($rootScope.bookAppointmentObject());
				        }
				        if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false) {
				        	Totalamount = $rootScope.kioskVitalTestCost.toString();
				        }
          				var UsageType = "upi";
          				var machine_id = $rootScope.IHLMachineNumber.toString();
          				let kioskId = $rootScope.uniqueKioskId.toString();
          				let orgCode = kioskId.split("-")[1];
          				MRPCost = ($rootScope.totalMrpCost).toString();
				        Discounts = Number(MRPCost - Totalamount).toString();
				        DiscountType = $rootScope.discountType;
				        CouponNumber = $rootScope.couponNumber;
								var jsontext = "";
          				if (HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null) {
          					userIhlId = HigiKioskStorageService.returnSessionData('user').id.toString();
							let emailID = HigiKioskStorageService.returnSessionData('user').email;
							if(Number(Totalamount) > 0){
								principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
								gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
							}
          					//var jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": "'+JSON.stringify(PurposeDetails)+'", "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'"}';
          					
          					if(PurposeDetails == ""){
          						jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": "", "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
          					} else {
          						jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
          					}

          					if ($rootScope.IHLTeleConsultSelected == false) {
				              let parseData = JSON.parse(jsontext);
				              if ('vendor_name' in parseData) {
				                delete parseData['vendor_name'];
				              }
							  /*Initially declared service provided as 'no' is deleted here. so commented for payment portal
				              if('Service_Provided' in parseData){
				              	delete parseData['Service_Provided'];
				              }*/
				              jsontext = JSON.stringify(parseData);
				            }
          				}else{
							let emailID = "";
							if(Number(Totalamount) > 0){
								principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
								gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
							}
          					//var jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": "'+JSON.stringify(PurposeDetails)+'", "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'"}';
          					if(PurposeDetails == ""){
          						jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": "", "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
          					} else {
          						jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'", "user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';		
          					}

          					if ($rootScope.IHLTeleConsultSelected == false) {
				              let parseData = JSON.parse(jsontext);
				              if ('vendor_name' in parseData) {
				                delete parseData['vendor_name'];
				              }
							  /*Initially declared service provided as 'no' is deleted here. so commented for payment portal
				              if('Service_Provided' in parseData){
				              	delete parseData['Service_Provided'];
				              }*/
				              jsontext = JSON.stringify(parseData);
				            }
          				}
          				
          				//new params
          				// console.log(jsontext);
          				// console.log("prefore parse data");
          				let parsedData = JSON.parse(jsontext);
          				// console.log(parsedData);
          				parsedData["vendor_name"] = vendorName;
          				// parsedData["account_name"] = "default account";

						if (!$rootScope.IHLTeleConsultSelected) {
							let userName = 'Guest User';
							if (HigiKioskStorageService.returnSessionData('logged_in')) {
								userName = HigiKioskStorageService.returnSessionData('user').firstName+' '+HigiKioskStorageService.returnSessionData('user').lastName;
							} 
							parsedData['vitalPurposeDetails'] = {'name': userName};
						}
						
          				if ($rootScope.dataForAppointmentBooking != undefined && $rootScope.dataForAppointmentBooking != null && $rootScope.IHLTeleConsultSelected == true && $rootScope.dataForAppointmentBooking["dateAndTime"].toString().trim().length > 0) {
          					let splittedStartDate = $rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[0].split('/');
        					let service_provided_date = `${splittedStartDate[2]}-${splittedStartDate[0]}-${splittedStartDate[1]} ${$rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[1]} ${$rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[2]}`;
          					parsedData["service_provided_date"] = service_provided_date;
							if($rootScope.dataForAppointmentBooking["doctorInfo"] != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"].account_name != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"].account_name != ""){
								accountName = $rootScope.dataForAppointmentBooking["doctorInfo"].account_name;
							}
							parsedData["account_name"] = accountName;
          				}else{
				            let date = new Date();
				            let service_prv_date = `${date.getFullYear()}-${(date.getMonth()+1)}-${date.getDate()} ${date.toLocaleTimeString("en-us")}`;
				            parsedData["service_provided_date"] = service_prv_date;
							parsedData["account_name"] = "";
          				}
          				parsedData["mode_of_payment"] = "Online"; // razorpay payment identification purpose value is given as "Online"
						parsedData["payment_status"] = "completed";
						parsedData["razorpay_order_id"] = transactionResponse['razorpay_order_id'];
          				parsedData["razorpay_payment_id"] = transactionResponse['razorpay_payment_id'];
          				parsedData["razorpay_signature"] = transactionResponse['razorpay_signature'];

						console.log(parsedData);
          				jsontext = JSON.stringify(parsedData);
          				console.log(jsontext);
				         $.ajax({
				            url: getSettingsValue('kiosk.api.url') +"/data/paymenttransaction",
				            type : "POST", 
				            cache: false,
				            data: jsontext,
				            contentType: 'application/json; charset=UTF-8',  
				            headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
				            success: function(html){
				              //alert("success");
				              //var jsonStr = JSON.parse(html.replace(/&quot;/g,'"'));
				              console.log(html);
				              if (html.status == "inserted") {
                  				$scope.invoiceNumber = html.invoice_number;
                  				$rootScope.prescriptionNumberFor1mg = html.invoice_number;
                  				$rootScope.paymentTransactionIdValue = html.transaction_id;
                			  }else{
                  				$scope.invoiceNumber = "NA";
                			  }
                			  $scope.printCheckinResultsConfirmation();
				            },
				            error : function(xhr, status, error) { 
				              console.log(xhr.responseText);
				              $scope.invoiceNumber = "NA";
                			  $scope.printCheckinResultsConfirmation();
				            } 
				         }); 


   						/*$timeout(function(){
   							//$rootScope.isVisibleLogin = true;
            				//$rootScope.isVisibleReg = true;
            				$(".higi_top_nav_ng ").show();
            				$rootScope.paymentSessionStarted=true;
   							$scope.PaymentSuccess = false;
   							$rootScope.paymentSessionActive = true;
   							window.location = '#/welcome';
   						},3000)*/

   						$timeout(function(){
				   			if ($rootScope.IHLTeleConsultSelected == true) {
					   			/*if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'My Consultant') {
					   				 $rootScope.ispaymentSuccesFailureContent = true;
					   				 $rootScope.loadModal({id: 'exitconfirm'});
					   				 $rootScope.teleConsultDashboardOption = '';
					   				 $scope.PaymentSuccess = false;
					   			}else{
					   				$scope.PaymentSuccess = false;
					   				window.location = '#/ihl-teleconsultation-video-call';
									$rootScope.teleConsultDashboardOption = '';
					   			}*/
					   			if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                					$rootScope.bookUserAppointment();
                					$rootScope.teleConsultDashboardOption = '';
              					}else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                					$rootScope.subscribeClass();
                					$rootScope.teleConsultDashboardOption = '';
              					} else {
                  					window.location = '#/ihl-teleconsultation-main-dashboard';
              					}
				   			}

				   			if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false){
				   				$scope.PaymentSuccess = false;
				   				$(".higi_top_nav_ng ").show();
				   				$(".keyboard_class_close_btn").show();
				   				$rootScope.proceedToVitalTestAfterKioskVitalPayment();
				   			}
				   			
				   		},2800);
   						
   					//}else if(upiResponse.transactionResponse == "Declined") {
   					} /* else if(transactionResponse.TransactionStatus == "failed") {
					
//{method: "UPITransactionStatus", TransactionStatus: "{result:failed,message:s54X7YE4JpqTSwLeWu8jV6RnPel…ZefdhMzlKaUSPJsXd/gvhHF/jgw32d2SpPM7/Fht0cnSdEyP}", status: true}TransactionStatus: "{result:failed,message:s54X7YE4JpqTSwLeWu8jV6RnPeljl3aO6S7eDDlheiu+6Pxb8+ZrugJIeDbE3c2UC9s1fci8C1Ge/TUzozHFtP5l/5qGDzh4/837rR/BPiV4F8FBhQ8djkieE0h8TUX14zj/IOA6IDKrSw0wE5h6hpDRoHY6jtfJcQjMOqv/MkXuUrsLdAsOUxISccJ/eznYiDziDTmqRnFZIrrPaOUXwlC+pmBn2ZYee3L+szMy/rZB8xOZEwyrAQAUMYbdpC8qWV2C90j+lGargES+n1h3UnKVocrBz59N6/DWU0+wiUqMRFcx7HuVGxdpFmi21emQ1KU3ceUKQ57ExQAD1M5xjXOvvHj/hcRQo0hd+73rTgQ81WjJne71sjLUaAap8hG19T0eEJq+jmyzD1nsj4pxGOdruBX1+vCVQGcmrLn5gazOpA0sF70SH1kSagcwW/iYUxXZ0d0T7ZyI5Eow1guprNTcOkWm8fk5nHHxIsNaJyXXGr3rMxb6EtL9KRumDMRUT8qixSZws7aVwGLAxiOeBfx8+tP+x22ljqtlqgMA6NbZBZSW94rAUW5pcxA+YXPjRvO2aMRSjheJOiVKZ7nF15wu+61AZOsKFV3vUJ1dUffPU42ZqQp0OXPadz6qCfp1tsWrECaFkJeYgSCbX0SgEHXXXTHGrZY9oz1jfqY2uODlEG/8h8elUDYxJ0BF/j+XwjiyzbyOizBSRLAqbbP35KaueMqr9qOIqLBxgx6V6G/IeNevyJG/h2I/kpyupYXQujzXH8LsCPym2e7QdIlbG0EWUKAZLy4dOo0DWficp/lbrMj+2CSxAxZYBLzK3Zfm/GCn9DxuKKPkfdKqMiipzcI4ss28josw/EW9WhD27Tln6xh8sxtILytrSdAwrTQzKbvexgUN5gUIliEj3dRbhZJd+3SUxbP9mJU57Xy4e8blPxblYtsH6nr3I3TlU4fWSXZnxm9vjDT7W/FMhhn6diY8NYO/DLSaYaIghU4by00mrVYbkig70LUMdptLuaFuYcrEjVjadofo4o1QZefdhMzlKaUSPJsXd/gvhHF/jgw32d2SpPM7/Fht0cnSdEyP}"method: "UPITransactionStatus"status: true__proto__: Object

						// redirect to payment page.
						$scope.CheckUPIStatusStop = true; 
   						CheckUPIStatusRequest = 0;
   						$scope.QRCodeInstruction = false;
   						$scope.PaymentSuccess = false;
   						$scope.PaymentFailed = true;
   						$scope.sessionEnd = false;

   						$timeout(function(){
   							//$rootScope.isVisibleLogin = false;
            				//$rootScope.isVisibleReg = false;
            				$(".higi_top_nav_ng ").hide();
            				$rootScope.paymentSessionStarted=false;
   							$scope.PaymentFailed = false;
   							//window.location = '#/mosambeePayment';
   							window.location = '#/welcome';
   						},3000)
					} */ else {

						/*if(pageRedirectStop){
							setTimeout(function(){
   								if($scope.PaymentSuccess != true){									
									$scope.CheckUPIStatusStop = true;
									$scope.QRCodeInstruction = false;
		   							$scope.PaymentSuccess = false;
		   							$scope.PaymentFailed = true;
		   							$scope.sessionEnd = false;
		   							pageRedirectStop = false;

	            					$(".higi_top_nav_ng ").hide();
	            					$rootScope.paymentSessionStarted=false;
	   								$scope.PaymentSuccess = false;
	   								$rootScope.kioskVitalTestCost = 0;
	   								if($scope.CheckUPIStatusCallbackResCount == $scope.CheckUPIStatusCallbackReqCount && $scope.CheckUPIStatusStop == true){
	   									$scope.CheckUPIStatusCallbackResCount = 0;
	   									$scope.CheckUPIStatusCallbackReqCount = 0;
	   									window.location = '#/welcome';
	   								}
   								}
   							}, 1000 * 10);
						}*/ //console.log("$scope.CheckUPIStatusCallbackResCount = " + $scope.CheckUPIStatusCallbackResCount);
						if($scope.PaymentSuccess == false && $scope.CheckUPIStatusCallbackResCount == 24){
							
   								if($scope.PaymentSuccess != true){
									setTimeout(function(){		   							
		   								$scope.sessionEnd = false;	
		   								$scope.PaymentFailed = true;	
									}, 1000 * 5);  		
									setTimeout(function(){
		            					$(".higi_top_nav_ng ").hide();
		            					$rootScope.paymentSessionStarted=false;
		   								$scope.PaymentSuccess = false;
		   								$rootScope.kioskVitalTestCost = 0;
		   								$rootScope.totalMrpCost = 0;
		   								$rootScope.selectedVital = [];
		   								$scope.CheckUPIStatusCallbackResCount = 0;
										$rootScope.enableESanjeevani = false;
		   								window.location = '#/welcome';	 
   									}, 1000 * 10);  								
   								}

						} else {
							/*console.log("$scope.lateResponseAvoid = "+ $scope.lateResponseAvoid);
							console.log("$scope.PaymentSuccess = " + $scope.PaymentSuccess);
							console.log("$scope.CheckUPIStatusCallbackResCount = "+ $scope.CheckUPIStatusCallbackResCount);*/
						}

						/*CheckUPIStatusRequest++;	
						console.log("CheckUPIStatusRequest = "+CheckUPIStatusRequest);		
						if(CheckUPIStatusRequest >= 40 && CheckUPIStatusRequest < 50){
							$scope.QRCodeInstruction = false;
   							$scope.PaymentSuccess = false;
   							$scope.PaymentFailed = false;
   							$scope.sessionEnd = true;
						}else if (CheckUPIStatusRequest >= 50) {
							CheckUPIStatusRequest = 0;
							$scope.CheckUPIStatusStop = true;
							$scope.QRCodeInstruction = false;
   							$scope.PaymentSuccess = false;
   							$scope.PaymentFailed = true;
   							$scope.sessionEnd = false;

   							$timeout(function(){
   								//$rootScope.isVisibleLogin = false;
            					//$rootScope.isVisibleReg = false;
            					$(".higi_top_nav_ng ").hide();
            					$rootScope.paymentSessionStarted=false;
   								$scope.PaymentSuccess = false;
   								window.location = '#/welcome';
   								//window.location = '#/mosambeePayment';
   							},10000)
							//window.location = '#/mosambeePayment';
							}*/
   						}		
   			    	}
   		    	}
   			}
        };
	

   var CheckUPIStatus = function CheckUPIStatusRequest(){
   	if($rootScope.qrId != undefined){
			if($scope.CheckUPIStatusStop == true){
				$interval.cancel(CheckUPITransaction);
			} else {			
				//JkioskService.CheckUPITransactionStatus($scope.TransactionStatusRes);
				let res_pending = {
	        "status": true,
	        "TransactionStatus": "Transaction Pending"
	      }
				let success_fn = function(response){
	        if (response && response instanceof Object) {
	          if ("razor_payment_detail" in response) {
	            let paymentDetail = response.razor_payment_detail;
	            console.log(paymentDetail);
	            if(paymentDetail.length > 0){
	            	let _paymentCompleted = paymentDetail.some(element => {
	            		return element.payment_status == "captured";
	            	});

	            	if(_paymentCompleted == true){
						if(paymentDetail[0]['razorpay_order_id'] == undefined){
							paymentDetail[0]['razorpay_order_id'] = "";
						}
						if(paymentDetail[0]['razor_payment_id'] == undefined){
							paymentDetail[0]['razor_payment_id'] = "";
						}
						if(paymentDetail[0]['razorpay_signature'] == undefined){
							paymentDetail[0]['razorpay_signature'] = "";
						}
	            		let res = {
	            			"status": true,
	            			"TransactionStatus": "Transaction Success",
							"razorpay_order_id": paymentDetail[0]['razorpay_order_id'],
							"razorpay_payment_id": paymentDetail[0]['razor_payment_id'],
							"razorpay_signature": paymentDetail[0]['razorpay_signature']
	            		}
	            		$scope.TransactionStatusRes(res);
	            	}else{
	            		$scope.TransactionStatusRes(res_pending);
	            	}
	            }else{
	            	$scope.TransactionStatusRes(res_pending);
	            }
	            
	          }else{
	          	$scope.TransactionStatusRes(res_pending);
	          }
	        }else{
	        	$scope.TransactionStatusRes(res_pending);
	        }
	      };
				HigiApiService.CheckUpiTransactionStatus($rootScope.qrId, success_fn);
				setTimeout(function(){
					$scope.CheckUPIStatusStop = true; 

					$scope.QRCodeInstruction = false;
	   				$scope.PaymentSuccess = false;
	   				$scope.PaymentFailed = false;
					$scope.sessionEnd = true;


				}, 1000 * 120);
			}
		}
	}



	/*payment original code-uncomment this*/
  	/*$scope.init(); */
  	/*payment original code end-uncomment this*/

  	/*payment duplicate code-comment this*/
  	$scope.duplicateInit = function(){
  		$("#teleMedLoad").hide();
  		$(".higi_top_nav_ng ").hide();

  		if ($rootScope.dataForAppointmentBooking != undefined && $rootScope.IHLTeleConsultSelected == true) {
 			$scope.consultCost = $rootScope.dataForAppointmentBooking["doctorFees"];
 			$scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
 		}
	   	$scope.QRCodeInstruction = true;
	   	$scope.PaymentSuccess = false;
	   	$scope.PaymentFailed = false;
	   	$scope.sessionEnd = false;

	   	$scope.bharatQR = "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";
  		
  		// 1.5 minutes from now
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
					//window.location = '#/mosambeePayment';
				}
			}
			update_clock(); // run function once at first to avoid delay
			var timeinterval = setInterval(update_clock,1000);
		}
		run_clock('clockdiv',deadline);

		$scope.checkPrinterPaperStatus = function() {
      //alert("prtsd1");
        JkioskService.callPrintPaperStatusFunction($scope.checkPrinterPaperStatusCallbackResponse);
    }

     $scope.checkPrinterPaperStatusCallbackResponse = function(response) {
      //alert("prtsd2");
        var paperStatusResponse = response.printerPaperStatus;
        //console.log(paperStatusResponse);
        if(!paperStatusResponse) {
            //alert("No Paper");
            if($rootScope.teleConsulationVideoCallToggle !== true){
              $rootScope.paperAvailable = false;
              $rootScope.loadModal({id : 'printerInfo'});
            }else{
              $rootScope.paperAvailable = false;
              //alert("paper not available");
            }
            
        } else {
          //  alert("Paper available");
          if($rootScope.teleConsulationVideoCallToggle !== true){
            $rootScope.paperAvailable = true;
            $rootScope.loadModal({id : 'printerInfo'});
          }else{
            $rootScope.paperAvailable = true;
            $rootScope.printCheckinResultsConfirmation();
          }
        }
    }
     $scope.printCheckinResults = function(){
      //alert("prtsd3");
        //JkioskService.logEvent($rootScope.higiPageName + '_printResultsButton', 'button', 'pressed');
        $scope.checkPrinterPaperStatus();
        //$rootScope.loadModal({id : 'printerInfo'});
       /* jkiosk.getPrinterSettings(function(respo){
            HigiKioskStorageService.saveSessionData('printerSettingsResult', respo);
            $scope.continuePrintCheckinResults();
        }); */
    };

    $rootScope.printCheckinResultsConfirmation = function(){
      //alert("prtsd4");
        jkiosk.getPrinterSettings(function(respo){
            HigiKioskStorageService.saveSessionData('printerSettingsResult', respo);
            //$scope.continuePrintCheckinResults();
            $scope.newprintercheckinresults();
        });
    }

     $scope.newprintercheckinresults = function(){
      ///alert("prtsd5");
      $scope.printerSettingsResult=HigiKioskStorageService.returnSessionData('printerSettingsResult');

     
	   if($rootScope.user.firstName != undefined){
	        if($rootScope.user.firstName != undefined){
	            var printUser = $rootScope.user.firstName;
	        } else {
	        printUser = "Valid User";
	        }
	    } else {
	         printUser = "Guest User"; 
	    }   

	    if($rootScope.user['email'] != undefined){
	    	$scope.printEmail = $rootScope.user['email'];
	    }else{
			$scope.printEmail = "N/A";
	    }
	    if($rootScope.user['mobileNumber'] != undefined){
	    	$scope.printMobilnum = $rootScope.user['mobileNumber'];
	    }else{
	    	$scope.printMobilnum = "N/A";
	    }
	    if($rootScope.IHLTeleConsultSelected == true){
		    if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'] != undefined){
				$scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
		    }else{
		    	$scope.consultantName = "N/A";
		    }
	    }
	     //$scope.printEmail = $rootScope.user['email'];
	     //$scope.printMobilnum = $rootScope.user['mobileNumber'];
	     //console.log($rootScope.user['name']);
	     console.log($rootScope.user['email']);
	     console.log($rootScope.user['mobileNumber']);
	     console.log($scope.consultantName);
	     $scope.today = new Date();
	     var today = $scope.today;
	     var trimDate = today.toString();
	     var trimmedDate = trimDate.slice(0,25);

	     //alert($rootScope.unique_invoice_no);
	     
	         //$scope.invoiceNo = 1;
			//while ($scope.invoiceNo <= 100000) {
				 //$rootScope.incrementvvalue = $rootScope.incrementvalue+1;
				var InVvalue = Math.floor((Math.random()*999999999)+1);
				
					//var invoiceVal = "IHL/2021-22/0000"+InVvalue+"";
					var invoiceVal = $scope.invoiceNumber;
					//alert(invoiceVal);
				//}	 
			///  console.log($scope.invoiceNo);
			//  $scope.invoiceNo++;
			//$rootScope.incrementvvalue++;
			//}
	     
	     //console.log(typeof($rootScope.kioskVitalTestCost));

	     //gst calc

	    $scope.finalKioskVitalTestCost = ($rootScope.kioskVitalTestCost - ((18*1/100) * $rootScope.kioskVitalTestCost));
	    $scope.igstAmtVitcost = (18*1/100) * $rootScope.kioskVitalTestCost;
	    	
	    $scope.finalKioskVitalTestCost = +$scope.finalKioskVitalTestCost.toFixed(2);
	    $scope.finalConsultCost = ($scope.consultCost - ((18*1/100) * $scope.consultCost));
	    $scope.igstAmtConcost = (18*1/100) * $scope.consultCost;


    if($rootScope.IHLTeleConsultSelected == false){
           if($scope.printerSettingsResult.PaperWidth == 827){ 
            //console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:76px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
            }else if($scope.printerSettingsResult.PaperWidth == 315){ // Thermal or Regular Printer check 
                //alert("Thermal Printer condition satisfied");          
                //console.log("Thermal Printer condition satisfied");

             var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:400px;height:470px;margin-left:0px;margin-top:-50px;font-size:11px;'><img style ='position: relative; top: 50px; left:120px;width: 25%;' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"


            }else
            {
                //alert("Regular Printer");
                //console.log("Regular Printer");
            var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:99px; height: 71px; width: 174px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"  

            }

            $rootScope.final_print_resultss = common_details_prints;


            $scope.printMerge = "";

                
                  //alert("BP not taken");
                  
                  if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"UPI/Net Banking"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+ $scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
    }else{


                	if($scope.printerSettingsResult.PaperWidth == 827){ 
                    //console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:76px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
            }else if($scope.printerSettingsResult.PaperWidth == 315){ // Thermal or Regular Printer check 
                //alert("Thermal Printer condition satisfied");          
                //console.log("Thermal Printer condition satisfied");

             var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:400px;height:470px;margin-left:0px;margin-top:-50px;font-size:11px;'><img style ='position: relative; top: 50px; left:120px;width: 25%;' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"


            }else
            {
                //alert("Regular Printer");
                //console.log("Regular Printer");
            var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:99px; height: 71px; width: 174px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"  

            }

            $rootScope.final_print_resultss = common_details_prints;


            $scope.printMerge = "";

                	if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"UPI/Net Banking"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
                }
                //}
                $scope.print =  $rootScope.final_print_resultss;
                //  console.log( "PrintResult"+ $scope.print);

             jkiosk.print($scope.print,"onJobPrintComplete", "onJobPrintFailed");
            }

		$timeout(function(){
			$scope.QRCodeInstruction = false;
	   		$scope.PaymentSuccess = true;
	   		//alert("success sandip");
	   		$scope.printCheckinResultsConfirmation();
	   		$timeout(function(){
	   			if ($rootScope.IHLTeleConsultSelected == true) {
		   			/*if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'My Consultant') {
		   				 $rootScope.ispaymentSuccesFailureContent = true;
		   				 $rootScope.loadModal({id: 'exitconfirm'});
		   				 $rootScope.teleConsultDashboardOption = '';
		   				 $scope.PaymentSuccess = false;
		   			}else{
		   				$scope.PaymentSuccess = false;
		   				window.location = '#/ihl-teleconsultation-video-call';
						$rootScope.teleConsultDashboardOption = '';
		   			}*/
		   			if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                		$rootScope.bookUserAppointment();
                		$rootScope.teleConsultDashboardOption = '';
              		}else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                		$rootScope.subscribeClass();
                		$rootScope.teleConsultDashboardOption = '';
              		} else {
                  		window.location = '#/ihl-teleconsultation-main-dashboard';
              		}
	   			}

	   			if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false){
	   				$scope.PaymentSuccess = false;
	   				$(".higi_top_nav_ng ").show();
	   				$(".keyboard_class_close_btn").show();
	   				$rootScope.proceedToVitalTestAfterKioskVitalPayment();
	   			}
	   			
	   		},2800);
		},10000);
  	}
  	/*payment duplicate code end-comment this*/


	if(!$rootScope.paymentMock){
		$scope.init(); // mosambee live payment flow
	} else {
		$scope.duplicateInit(); // mock payment flow
	}
}]);