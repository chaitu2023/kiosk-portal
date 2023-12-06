higiKioskControllers.directive('paymentStartModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'components/modal/payment/mosambee/paymentStart.html',
    controller :function($scope,$rootScope){
      $scope.paymentModal = new Object();
      $scope.authcodeNotValid = false;
      $rootScope.paymentMobileTextField = true;
      $scope.disabled_next = "disabled_next";
      $rootScope.bookingAppointment = false;
      $scope.invoiceNumber = "NA";
      $rootScope.authShowPasswordClass = '';
      $rootScope.couponNumber = "";
      $rootScope.discountType = "";
      $scope.paymentModal.init = function(){
        $scope.paymentModal.NEXT = "global.next";
        $scope.paymentModal.entermobnum =  "welcomeModals.payment.entermobnum";
        $scope.paymentModal.enterauthcode = "welcomeModals.payment.enterauthcode";
        $rootScope.authShowPasswordClass = '';
       //alert("init called");
        $scope.paymentModal.fields = [
          {id : "mobilenum1", defaultText:$scope.paymentModal.entermobnum, text: $scope.defaultmob, textMasked: '',  type :'text' ,visible : true , selectedClass : '',callback : function(){$scope.paymentModal.mobileLengthCheck(this)}, focus : function(){$rootScope.focusField(this)} },
          {id : "authcode", defaultText:$scope.paymentModal.enterauthcode, text: "", textMasked: '',type :'password' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)}}
          
        ];
        $rootScope.fields.paymentModal = $scope.paymentModal.fields;
      };
      
      $scope.paymentModal.watch = $scope.$watch('modalVisible', function(newVal,oldVal){
        if(HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null && HigiKioskStorageService.returnSessionData('user') != "" ) {
          if (HigiKioskStorageService.returnSessionData('user').mobileNumber != undefined && HigiKioskStorageService.returnSessionData('user').mobileNumber != null && HigiKioskStorageService.returnSessionData('user').mobileNumber != "") {
            $scope.userProvidedMobile = true;
            $scope.telemedPayemntMobileNumber = HigiKioskStorageService.returnSessionData('user').mobileNumber;
          }else{
            $scope.userProvidedMobile = false;
          }
        }else{
          $scope.userProvidedMobile = false;
        }

        if(newVal && $scope.$parent.$parent.modalList['modalpaymentstartVisible']){
          $scope.paymentModal.fields[0].text = ($scope.userProvidedMobile) ? $scope.telemedPayemntMobileNumber : '';
          document.getElementById($scope.paymentModal.fields[0].id).value =  $scope.paymentModal.fields[0].text;
          $scope.disabled_next = ($scope.userProvidedMobile) ? '' : 'disabled_next';
          $rootScope.fields.paymentModal = $scope.paymentModal.fields;
          $scope.paymentModal.mobileLengthCheck($scope.paymentModal.fields[0]);
        }
      });

   /* $scope.payemntModuleRetrigger = function(){
        $rootScope.paymentModals = $scope.paymentModal.fields;
        console.log($rootScope.paymentModals[0]);
        $rootScope.focusField($rootScope.paymentModals[0]);
      
    }
    if($rootScope.payemntModuleRetriggerBool){
      $rootScope.payemntModuleRetrigger = $scope.payemntModuleRetrigger;      
    }*/

    $rootScope.paymentRetrigger = function(){
        $rootScope.paymentMobileTextField = true;
        $scope.disabled_next = "disabled_next";
        $("#mobilenum1").val("");
        $("#authcode").val("");
        $scope.paymentModal.init();
        $timeout(function(){
          $("#mobilenum1").focus();
        },100);
        $rootScope.keyboardShow();
    }


      $scope.paymentModal.mobileLengthCheck = function(field){
        var specialCharacterPattern = /[. ]/;
        if (field.text.length == 10 && field.text != "" && !(isNaN(field.text)) && field.text != null && !specialCharacterPattern.test(field.text)) {
          $scope.disabled_next = "";
        }else{
          $scope.disabled_next = "disabled_next";
        }
      };

      $scope.paymentMobileNumberValue = function(){
        //alert("paymentMobileNumberValue called");
        console.log($scope.paymentModal.fields[0].text);
        console.log($scope.paymentModal.fields[1].text);

        $scope.customerMobNum = $scope.paymentModal.fields[0].text;
        HigiKioskStorageService.saveSessionData('updatedMobileNumber', $scope.paymentModal.fields[0].text);
        //$scope.customerAuthCode = $scope.paymentModal.fields[1].text;
        //alert($scope.customerMobNum);
        //alert($rootScope.paymentMode);
        if($rootScope.paymentMode == "card"){

          if($rootScope.paymentMock == true) {
          /*Telemed Payment code.It is temporary code, use the below commented code & comment this when needed*/
          //if ($rootScope.IHLTeleConsultSelected == true) {
            $scope.modalHide();
            window.location = "#/paymentbycard";
            $timeout(function(){
              window.location = "#/cardpaymentpin";
              $timeout(function(){
                $("#pinNumber_instruction").hide();
                $("#payment_failed").hide();
                $("#payment_success").show();
                $timeout(function(){
                  $("#payment_failed").hide();
                  $("#payment_success").hide();
                  //alert($rootScope.teleConsultDashboardOption);
                  if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                      //$rootScope.ispaymentSuccesFailureContent = true;
                      //$rootScope.loadModal({id: 'exitconfirm'});
                      $rootScope.bookUserAppointment();
                      $rootScope.printCheckinResultsConfirmation();
                      $rootScope.teleConsultDashboardOption = '';
                    }else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                      //$scope.PaymentSuccess = false;
                      //window.location = '#/ihl-teleconsultation-video-call';
                      $rootScope.subscribeClass();
                      $rootScope.teleConsultDashboardOption = '';
                    } else {
                      window.location = '#/ihl-teleconsultation-main-dashboard';
                    }
                  }

                  if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
                    $(".keyboard_class_close_btn").show();
                    $(".higi_top_nav_ng ").show();
                    $rootScope.printCheckinResultsConfirmation();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                  }

                  if ($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
                    $(".keyboard_class_close_btn").show();
                    $(".higi_top_nav_ng ").show();
                    $rootScope.printVitalDataOfUser();
                  }

                  if ($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
                    $(".keyboard_class_close_btn").show();
                    $(".higi_top_nav_ng ").show();
                    $rootScope.printPrescriptionDataOfUser();
                  }

                },2800);
              },5000, false);
            },5000, false);
          //}
          /*Telemed Payment code temporary code-end*/
          } else {
            /*Original payment code-uncomment this*/
            //$scope.modalHide();
            //$("#teleMedLoad").show();
            $scope.unique_invoice_no = generateUUID();

           //var ihl_login_id ="9866232809";
           //var ihllogin_pass ="5025";
            let ihl_login_id = $rootScope.kioskPaymentUserId;
            let ihllogin_pass = $rootScope.kioskPaymentPassword;
            var invoice_number= $scope.unique_invoice_no;
            //var Totalamount =$rootScope.chooseCost;
            //var Totalamount = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021
            //var Totalamount ="100";
            var MobileNumber=$scope.customerMobNum;

            let amount = 0;
            $scope.modalHide();
            $("#teleMedLoad").show();

            if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
              amount = $rootScope.dataForAppointmentBooking["doctorFees"];
            }
            
            if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
              amount = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021
            }

            amount= amount.toString();
            console.log("inisde $scope.paymentMobileNumberValue() ->card payment()");
            console.log("$rootScope.kioskWithPaymentMode : ",$rootScope.kioskWithPaymentMode,"\n","$rootScope.kioskVitalTestCost : ",$rootScope.kioskVitalTestCost,"\n","$rootScope.IHLTeleConsultSelected : ",$rootScope.IHLTeleConsultSelected,"\n","$rootScope.paymentFlowForVitalPrinting : ",$rootScope.paymentFlowForVitalPrinting,"\n","$rootScope.paymentFlowForPrescriptionPrinting : ",$rootScope.paymentFlowForPrescriptionPrinting);
            console.log("invoice_number : ",invoice_number,"\n","amount : ",amount,"\n","MobileNumber: ",MobileNumber);
            if(amount > 0){
              console.log("insde if call back called");
              JkioskService.TransactionInitialize($scope.SwapCardRes, $scope.PinInputRes, $scope.ResultRes, ihl_login_id,ihllogin_pass,invoice_number,amount,MobileNumber); 
            }
            else{
              console.log("inisde else no call back called returning");
              return;
            }
              /*Original payment code-uncomment this-end*/
          }

        }else if($rootScope.paymentMode == "UPI"){
          console.log("inisde paymentMobileNumberValue fn -> else if->$rootScope.paymentMode == UPI payment");
          //alert(" UPI called");
          if($rootScope.paymentMock == true) {
            /*Telemed Payment code.It is temporary code, use the below commented code & comment this when needed*/
            if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
              $scope.modalHide();
              $("#teleMedLoad").show();
              //window.location = "#/paymentbyupi";
              window.location = "#/payment-by-razorPayupi";
              /*if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                //$rootScope.ispaymentSuccesFailureContent = true;
                //$rootScope.loadModal({id: 'exitconfirm'});
                $rootScope.bookUserAppointment();
                $rootScope.teleConsultDashboardOption = '';
              }else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                //$scope.PaymentSuccess = false;
                //window.location = '#/ihl-teleconsultation-video-call';
                $rootScope.subscribeClass();
                $rootScope.teleConsultDashboardOption = '';
              } else {
                  window.location = '#/ihl-teleconsultation-dashboard';
              }*/
              
            }

            if($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
              $scope.modalHide();
              //$("#teleMedLoad").show();
              //alert("call printing vital info");
              //window.location = "#/paymentbyupi";
            }

            if($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
              $scope.modalHide();
              //$("#teleMedLoad").show();
              //alert("call printing vital info");
              //window.location = "#/paymentbyupi";
            }

            if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
              $scope.modalHide();
              $("#teleMedLoad").show();
              //window.location = "#/paymentbyupi";
            }            
            /*Telemed Payment code temporary code-end*/

          } else {
            /*Original payment code-uncomment this*/
            //$scope.modalHide();
            //$("#teleMedLoad").show();
            var customerMobNum = $scope.paymentModal.fields[0].text;
            var invoice = generateUUID();
            let amount = 0;
            let purpose = "";
            let paymentMode = "live";
            //var amount = $rootScope.chooseCost; // old variable before Dec 2020 year
            $scope.modalHide();
            $("#teleMedLoad").show();
            
            if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
              amount = $rootScope.dataForAppointmentBooking["doctorFees"];
              purpose = "for_tele_consultation";
            }

            if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
              amount = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021
              purpose = "for_vital_test";
            }
            
            amount = amount.toString();

            $rootScope.upiUniqueMobileNumber = customerMobNum;
            $rootScope.unique_invoice_no = invoice;
            $rootScope.upiUniqueAmount = amount;
            let ihl_login_id = $rootScope.kioskPaymentUserId;
            let ihllogin_pass = $rootScope.kioskPaymentPassword;
            console.log("$rootScope.kioskWithPaymentMode : ",$rootScope.kioskWithPaymentMode,"\n","$rootScope.kioskVitalTestCost : ",$rootScope.kioskVitalTestCost,"\n","$rootScope.IHLTeleConsultSelected : ",$rootScope.IHLTeleConsultSelected,"\n","$rootScope.paymentFlowForVitalPrinting : ",$rootScope.paymentFlowForVitalPrinting,"\n","$rootScope.paymentFlowForPrescriptionPrinting : ",$rootScope.paymentFlowForPrescriptionPrinting);
            console.log("amount : ",amount ,"\n","purpose : ",purpose,"\n","paymentMode : ",paymentMode,"\n","customerMobNum : ",customerMobNum);
            $scope.getRazorPayQrCode(amount, purpose, paymentMode, customerMobNum);
            //JkioskService.BharatQRGenerate($scope.BharatQRRes,amount,invoice,customerMobNum, ihl_login_id, ihllogin_pass);
            /*Original payment code-uncomment this-end*/
          }         

        } else if($rootScope.paymentMode == "cash" || $rootScope.paymentMode == "coupon"){
          //alert("cash called");
          if($rootScope.paymentMode == "cash"){
            $scope.paymentModal.authcodeNotValid = "welcomeModals.payment.authcodemessage";
          } else {
            $scope.paymentModal.authcodeNotValid = "welcomeModals.payment.couponcodemessage";
          }

          console.log($scope.paymentModal.fields[0].text);
          $rootScope.focusField($scope.paymentModal.fields[1]);
          $rootScope.paymentMobileTextField = false;
          //$scope.paymentAuthorizationValue();
          $("#authcode").focus();
          console.log($scope.paymentModal.fields[1]);

          //$rootScope.fieldFocus($scope.paymentModal.fields[1]);

          /*var AuthorizCode = $scope.paymentModal.fields[1].text;;
          var MobileNumber = $scope.paymentModal.fields[0].text;*/
             
          /*var AuthCode;
            var MobileNo;
            var AuthorizationCode = AuthorizCode;
            var jsontext1 = '{"Authorization_Code": "'+AuthorizationCode+'"}';
            $.ajax({
              url: "https://127.255.0.0:446/data/getAuthorizationCode",
              type : "POST", 
              cache: false,
              data: jsontext1,
              contentType: 'application/json; charset=UTF-8',  
              headers:{"ApiToken":'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA=='},
              success: function(html){
                alert("success");
                var jsonStr = JSON.parse(html.replace(/&quot;/g,'"'));
                
                console.log(jsonStr);
                AuthCode= jsonStr.fullArray[0].Authorization_Code;
                $('#Authorization_Code').val(AuthCode);
                MobileNo= jsonStr.fullArray[0].MobileNumber;
                $('#MobileNumber').val(MobileNo);
                alert(AuthCode);
                alert(MobileNo);

              },

              error : function(xhr, status, error) { 
                alert("error");
                console.log(xhr.responseText);
              } 
            });
            if(AuthorizCode == AuthCode)
            {
              window.location = "#/welcome";
            }else{

            }*/      
        }
        //$scope.modalHide();                   
      } 

      $scope.paymentAuthorizationValue = function(){
        //alert("paymentAuthorizationValue called");
        let purpose = '';
        let consultantId = '';

        if (HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null) {
          userIDValue = HigiKioskStorageService.returnSessionData('user').id.toString();
        }else{
          userIDValue = 'GUEST';
          //getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$scope.paymentModal.fields[1].text+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+userIDValue
        }

        if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
          purpose = "vital";
        }
        if($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
          purpose = "teleconsultation";
          consultantId = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
        }
        if($rootScope.paymentMock == true) {
              $.ajax({
                url: getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$scope.paymentModal.fields[1].text+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+userIDValue+"&source=kiosk"+"&consultant_id="+consultantId+"&course_id="+""+"&purpose="+purpose,
                type : "GET", 
                cache: false,
                contentType: 'application/json; charset=UTF-8',  
                headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
                success: function(html){
                  console.log(html);
                  console.log(html);
                  if(html.status == "access_allowed"){
                    if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                      $rootScope.bookingAppointment = true;
                      if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                        //$rootScope.ispaymentSuccesFailureContent = true;
                        //$rootScope.loadModal({id: 'exitconfirm'});
                        $rootScope.bookUserAppointment();
                        $rootScope.printCheckinResultsConfirmation();
                        $rootScope.teleConsultDashboardOption = '';
                      }else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                        //$scope.PaymentSuccess = false;
                        //window.location = '#/ihl-teleconsultation-video-call';
                        $rootScope.subscribeClass();
                        $rootScope.teleConsultDashboardOption = '';
                      } else {
                          window.location = '#/ihl-teleconsultation-main-dashboard';
                      }
                      
                    }

                    if ($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
                      $(".keyboard_class_close_btn").show();
                      $(".higi_top_nav_ng ").show();
                      $rootScope.printVitalDataOfUser();
                    }

                    if ($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
                      $(".keyboard_class_close_btn").show();
                      $(".higi_top_nav_ng ").show();
                      $rootScope.printPrescriptionDataOfUser();
                    }

                    if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
                      $scope.modalHide();
                      $(".higi_top_nav_ng ").show();
                      $(".keyboard_class_close_btn").show();
                      $rootScope.printCheckinResultsConfirmation();
                      $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                    } 
                  } else {
                    $scope.authcodeNotValid = true;
                    $timeout(function(){
                      $scope.authcodeNotValid = false;
                    },3000);
                  }
                },
                error: function(){
                    $scope.authcodeNotValid = true;
                    $timeout(function(){
                      $scope.authcodeNotValid = false;
                    },3000);
                }
            });

          /*if($rootScope.paymentMode == 'cash'){
          } else if($rootScope.paymentMode == 'coupon'){
          }*/
          
     
        } else{
          // let userIDValue = "";
          // if (HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null) {
          //   userIDValue = HigiKioskStorageService.returnSessionData('user').id.toString();
          // }else{
          //   userIDValue = 'GUEST';
          //   //getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$scope.paymentModal.fields[1].text+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+userIDValue
          // }
          //console.log(getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$scope.paymentModal.fields[1].text+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+userIDValue);
          
          // coupon code validate start
          /*if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] != undefined){

          } */      
          
          if($rootScope.paymentMode == "coupon" && ($scope.paymentModal.fields[1].text === $rootScope.AuthorizationCodeCash || $scope.paymentModal.fields[1].text === $rootScope.AuthorizationCodeSkip)){
            $scope.authcodeNotValid = true;
            $timeout(function(){
              $scope.authcodeNotValid = false;
            },3000);
            return 0;
          } else if($rootScope.paymentMode == "cash"){ // cash or skip mode selcted by user then user type the coupon code flow restricted
            $scope.cashSkipFlowEnable = false;
            if($scope.paymentModal.fields[1].text == $rootScope.AuthorizationCodeCash){
              $scope.cashSkipFlowEnable = true;
            } else if($scope.paymentModal.fields[1].text == $rootScope.AuthorizationCodeSkip){
              $scope.cashSkipFlowEnable = true;
            }
            if($scope.cashSkipFlowEnable == false){
              $scope.authcodeNotValid = true;
              $timeout(function(){
                $scope.authcodeNotValid = false;
              },3000);
              return 0;
            }
          }

          var apolloCouponCodeValidate = false;
          if($rootScope.teleconsultationUserSelectedData != undefined && Object.keys($rootScope.teleconsultationUserSelectedData).length != 0 && ($scope.paymentModal.fields[1].text).length == 9 && $rootScope.paymentMode == "coupon"){
            if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO'){
              apolloCouponCodeValidate = true;
            }
          }
          var URL ="";
          if(apolloCouponCodeValidate){
            URL = getSettingsValue('kiosk.api.url') +"/consult/validate_follow_coupon?access_code="+$scope.paymentModal.fields[1].text+"&ihl_user_id="+userIDValue; // For Apollo tele consultation only 
            apolloCouponCodeValidate = false;
          } else {
            URL = getSettingsValue('kiosk.api.url') +"/data/check_access_code?code="+$scope.paymentModal.fields[1].text+"&kiosk_id="+$rootScope.uniqueKioskId.toString()+"&ihl_id="+userIDValue+"&source=kiosk"+"&consultant_id="+consultantId+"&course_id="+""+"&purpose="+purpose
          }

           $.ajax({
              url: URL,
              type : "GET", 
              cache: false,
              contentType: 'application/json; charset=UTF-8',  
              headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
              success: function(html){
                console.log(html);
                  //alert('success');
                  //let html = {'status': 'access_allowed', 'amount':'200', 'coupon_type': 'discount'};
                if(html.status == "access_allowed"){ //
                  //alert("valid");
                  let couponType = html.coupon_type;
                  if($rootScope.paymentMode == 'coupon'){

                    $scope.externalBill = false;
                    if(html.isNotBillableToIhl){
                      if($rootScope.externalBillOrgList.length > 0){
                        if($rootScope.externalBillOrgList.indexOf($rootScope.affiliateOrgCode) !== -1) {  
                          $scope.externalBill = true;          
                        } else {
                          $scope.authcodeNotValid = true;
                          $timeout(function(){
                            $scope.authcodeNotValid = false;
                          },3000);
                          console.log("this kiosk is not allow the external bill coupon code");
                          return 0;
                        }
                      } else {
                          $scope.authcodeNotValid = true;
                          $timeout(function(){
                            $scope.authcodeNotValid = false;
                          },3000);
                          console.log("externalBillOrgList is missing in kiosk.xml file ");
                          return 0;
                      }
                    } /* Flow works fyn commented due to length check flow is not required due to field man is not follow the coupon code digit pattern created issue by misunderstanding.
                    else {                      
                        if($scope.paymentModal.fields[1].text.length != 7 && $scope.paymentModal.fields[1].text.length != 9){                      
                          $scope.authcodeNotValid = true;
                          $timeout(function(){
                            $scope.authcodeNotValid = false;
                          },3000);
                          return 0;
                        }                      
                    } */


                    if(apolloCouponCodeValidate){
                      if(html.speciality_name != undefined){
                        if(html.speciality_name != $rootScope.selected_speciality)
                          $scope.authcodeNotValid = true;
                          $timeout(function(){
                            $scope.authcodeNotValid = false;
                          },3000);
                        return 0;
                      }
                    }

                    

                    $rootScope.couponNumber = $scope.paymentModal.fields[1].text;
                    $rootScope.discountType = html.coupon_type;

                    if (couponType == "discount") {
                      $rootScope.discountPaymentMethodSelected = true;
                      if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                        if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                          $scope.modalHide();
                          /* Issue in code -- going for 2nd payment model as default for teleconsultation. Therefore, code commented starts here
                          $rootScope.dataForAppointmentBooking["doctorFees"] = html.amount;
                          $timeout(function(){
                            $(".keyboard_class_close_btn").hide();
                            $rootScope.loadModal({id: 'reasonForVisit'});
                          },300);
                          Issue in code -- going for 2nd payment model as default for teleconsultation. Therefore, code commented ends here */

                          $scope.userPayAmt = $rootScope.dataForAppointmentBooking["doctorFees"] - html.amount;
                          if($scope.userPayAmt < 0) $scope.userPayAmt = 0;
                          $rootScope.dataForAppointmentBooking["doctorFees"] = $scope.userPayAmt;
                          if($rootScope.dataForAppointmentBooking["doctorFees"] > 0){
                            $timeout(function(){
                              $(".keyboard_class_close_btn").hide();
                              $rootScope.loadModal({id: 'reasonForVisit'});
                            },300);
                          }
                        }else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                         $scope.modalHide();
                         console.log("fitness class");
                        } else {
                          $scope.modalHide();
                          window.location = '#/ihl-teleconsultation-main-dashboard';
                        }
                      }

                      if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
                        $scope.modalHide();
                        $scope.userPayAmt = $rootScope.kioskVitalTestCost - html.amount
                        if($scope.userPayAmt < 0) $scope.userPayAmt = 0
                        $rootScope.kioskVitalTestCost = $scope.userPayAmt;
                        if($rootScope.kioskVitalTestCost > 0) {
                          $timeout(function(){
                            $(".keyboard_class_close_btn").hide();
                            $rootScope.loadModal({id: 'reasonForVisit'});
                          },300);
                        }                         
                      } 
                      if($rootScope.kioskVitalTestCost > 0 || $rootScope.dataForAppointmentBooking["doctorFees"] > 0){ //kioskvitalcost greter than couponamt flow (2nd set of payment)
                        return;
                      }
                      // return;
                    }
                  }

                  $rootScope.paymentTransactionCompleted = true;
                  $scope.unique_invoice_no = generateUUID();
                  $rootScope.unique_invoice_no = $scope.unique_invoice_no;
                  
                  let serviceToProvide;
                  let userIhlId = "";
                  let purposeOfVisit = "";
                  let vendorName = "";
                  if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    $rootScope.userPaidServices["invoice_id"] = $rootScope.unique_invoice_no;
                    serviceToProvide = JSON.stringify($rootScope.kioskVitalTestToProvide());
                    userIhlId = "";
                    purposeOfVisit = "vital";
                  }

                  if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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
                  var ddate = today;
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
                  // var MobileNumberGet = $scope.paymentModal.fields[0].text;
                  var MobileNumberGet = $scope.customerMobNum;
                  var invoiceNumber = $rootScope.unique_invoice_no;
                  $rootScope.invoiceIdForApolloTeleconsultationService = $rootScope.unique_invoice_no;
                  //var Totalamount = $rootScope.chooseCost;
                  //var Totalamount = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021
                  var machine_id = $rootScope.IHLMachineNumber.toString();
                  let kioskId = $rootScope.uniqueKioskId.toString();
                  let orgCode = kioskId.split("-")[1];
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
                  // let emailID = HigiKioskStorageService.returnSessionData('user').email;
                  // let mobileNum = $scope.paymentModal.fields[0].text;
                  let mobileNum = $scope.customerMobNum;
                  let principalAmt = "";
                  let gstAmt = "";
                  let userState = $rootScope.stateforpayment;
                  let accountName = "";

                  if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    Totalamount = $rootScope.dataForAppointmentBooking["doctorFees"].toString();
                    ConsultantID = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
                    ConsultantName = $rootScope.dataForAppointmentBooking["doctorInfo"]["name"];
                    PurposeDetails = JSON.stringify($rootScope.bookAppointmentObject());
                  }
                  if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    Totalamount = $rootScope.kioskVitalTestCost.toString();
                  }
                  if($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    Totalamount = $rootScope.printingVitalAndPresCostObj["vital_print_cost_inbuilt"];
                    $rootScope.totalMrpCost = $rootScope.printingVitalAndPresCostObj["vital_print_cost_inbuilt"];
                  }

                  if($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting) {
                    Totalamount = $rootScope.printingVitalAndPresCostObj["prescription_print_cost_inbuilt"];
                    $rootScope.totalMrpCost = $rootScope.printingVitalAndPresCostObj["prescription_print_cost_inbuilt"];
                  }

                  if ($scope.paymentModal.fields[1].text == $rootScope.AuthorizationCodeCash) {
                    var UsageType = "cash"; 
                  }else if ($scope.paymentModal.fields[1].text == $rootScope.AuthorizationCodeSkip) {
                    var UsageType = "skip"; 
                    Service_Provided = "true";
                  } else {
                    var UsageType = "coupon";
                    if(html.amount != undefined){
                        $rootScope.couponAmt = html.amount;
                        if(couponType == "discount"){
                          Totalamount = $scope.userPayAmt;
                        }else{
                          Totalamount = (html.amount).toString();
                        }
                    } else {
                        $rootScope.couponAmt = 0;
                        Totalamount = 0;  
                    }                    
                  }

                  MRPCost = ($rootScope.totalMrpCost).toString();
                  Discounts = Number(MRPCost - Totalamount).toString();
                  DiscountType = $rootScope.discountType;
                  CouponNumber = $rootScope.couponNumber;
                  

                  
                  if (HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null) {
                    userIhlId = HigiKioskStorageService.returnSessionData('user').id.toString();
                    let emailID = HigiKioskStorageService.returnSessionData('user').email;
                    if(Number(Totalamount) > 0){
                      principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
                      gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
                    }
                    var jsontext = "";
                    if(serviceToProvide == undefined){
                      serviceToProvide = "";
                      jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": "'+serviceToProvide+'", "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
                    } else {
                      jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
                    }
                    
                    if ($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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
                    var jsontext = "";
                    let emailID = "";
                    if(Number(Totalamount) > 0){
                      principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
                      gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
                    }
                    if(serviceToProvide == undefined){
                      serviceToProvide = "";
                      jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": "'+serviceToProvide+'", "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
                    } else {
                      jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoiceNumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
                    }
                    // console.log(jsontext);
                    if ($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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
                  let parsedData = JSON.parse(jsontext);
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

                  if($scope.externalBill){
                    parsedData["isNotIhlBillable"] = true; 
                  }
                  
                  jsontext = JSON.stringify(parsedData);

                  //console.log(jsontext);
                  //console.log(JSON.parse(jsontext));
                  
                  $.ajax({
                    url: getSettingsValue('kiosk.api.url') +"/data/paymenttransaction",
                    type : "POST", 
                    cache: false,
                    data: jsontext,
                    contentType: 'application/json; charset=UTF-8',  
                    headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
                    success: function(html){
                      //alert("successs");
                      //var jsonStr = JSON.parse(html.replace(/&quot;/g,'"'));
                      console.log(html);
                      if (html.status == "inserted") {
                        $scope.invoiceNumber = html.invoice_number;
                        $rootScope.prescriptionNumberFor1mg = html.invoice_number;
                        $rootScope.paymentTransactionIdValue = html.transaction_id; 
                      }else{
                        $scope.invoiceNumber = "NA";
                      }
                      if (couponType != "prepaid" && couponType != "discount" && UsageType != "skip" && !$scope.externalBill) {
                        $rootScope.printCheckinResultsConfirmation();
                      }
                      
                      if (UsageType != "coupon") {
                        if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                          HigiApiService.storeUserPaidServiceAsProvided(invoiceNumber, function (resp) {
                            console.log(resp);
                            if (resp == "stored") {
                              $rootScope.isAllServicesProvidedToUser = true;
                              $rootScope.isVitalTestCompleted = true;
                            }
                          });
                        }
                      }
                    },
                    error : function(xhr, status, error) { 
                      //alert("error");
                      console.log(xhr.responseText);
                      $scope.invoiceNumber = "NA";
                      if (couponType != "prepaid" && couponType != "discount" && UsageType != "skip") {
                        $rootScope.printCheckinResultsConfirmation();
                      }
                    } 
                  });
                  //$rootScope.paymentPrintFunction();

                  //$scope.modalHide();
                  //$rootScope.isVisibleLogin = true;
                  //$rootScope.isVisibleReg = true;
                  // $rootScope.paymentSessionStarted=true;
                  // $(".higi_top_nav_ng ").show();
                  // $rootScope.paymentSessionActive = true;
                  // window.location = "#/welcome";

                  if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
                    $rootScope.bookingAppointment = true;
                    if ($rootScope.teleConsultDashboardOption == 'Book Appointment' || $rootScope.teleConsultDashboardOption == 'Start Call Now') {
                      //$rootScope.ispaymentSuccesFailureContent = true;
                      //$rootScope.loadModal({id: 'exitconfirm'});
                      $rootScope.bookUserAppointment();
                      $rootScope.teleConsultDashboardOption = ''; 
                    }else if($rootScope.teleConsultDashboardOption == 'Fitness Class'){
                      //$scope.PaymentSuccess = false;
                      //window.location = '#/ihl-teleconsultation-video-call';
                      $rootScope.subscribeClass();
                      $rootScope.teleConsultDashboardOption = '';
                    } else {
                        window.location = '#/ihl-teleconsultation-main-dashboard';
                    }
                  }

                  if ($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
                    $(".keyboard_class_close_btn").show();
                    $(".higi_top_nav_ng ").show();
                    $rootScope.printVitalDataOfUser();
                  }

                  if ($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
                    $(".keyboard_class_close_btn").show();
                    $(".higi_top_nav_ng ").show();
                    $rootScope.printPrescriptionDataOfUser();
                  }

                  if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost >= 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
                    $scope.modalHide();
                    $(".higi_top_nav_ng ").show();
                    $(".keyboard_class_close_btn").show();
                    $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                  } 

                } else {
                  //alert("invalid");
                  $scope.authcodeNotValid = true;
                  $timeout(function(){
                    $scope.authcodeNotValid = false;
                  },3000);
                }
              },
              error: function(err){
                console.log(err);
                  //alert("error");
                  $scope.authcodeNotValid = true;
                  $timeout(function(){
                    $scope.authcodeNotValid = false;
                  },3000);
              }
            });

          /*if($rootScope.paymentMode == 'cash'){
          } else if($rootScope.paymentMode == 'coupon'){
            alert("api integration");
          }*/
         
        }
      }

      $scope.SwapCardRes = function(Response){
        console.log(Response);
        $("#teleMedLoad").hide();
        if(Response.isApiCallSuccess){
            if(Response.respose == "please input/swap the card"){
              //JkioskService.PinInput($scope.PinInputRes);
              window.location = "#/paymentbycard";
            }    
        }else{
          $("#payment_failed").show();
          $timeout(function(){
            window.location = "#/welcome";
          },3000, false);
        }   
        //JkioskService.PinInput($scope.PinInputRes);
      }

      $scope.PinInputRes = function(Response){
        console.log(Response);
        if(Response.isApiCallSuccess){
          window.location = "#/cardpaymentpin";
          
          $timeout(function(){
            if( $rootScope.paymentSessionStarted!=true){
              $("#pinNumber_instruction").hide();
              $("#payment_success").hide();
              $("#payment_failed").show();
              $timeout(function(){
                $rootScope.paymentSessionStarted=false;
                //window.location = "#/mosambeePayment";
                window.location = "#/welcome";
              },3000, false);
            }
          },60000, false); 
        }else{
          $("#payment_failed").show();
          $timeout(function(){
            //window.location = "#/mosambeePayment";

            window.location = "#/welcome";
          },3000, false);
        }  
       // JkioskService.Result($scope.ResultRes);
      }

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

      if($rootScope.paymentMode == 'coupon'){
        if ($rootScope.dataForAppointmentBooking != undefined && $rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
          $rootScope.dataForAppointmentBooking["doctorFees"] = $rootScope.couponAmt;
        }
        /*$scope.userPayAmt = $rootScope.kioskVitalTestCost - $rootScope.couponAmt;
        if($scope.userPayAmt <= 0) $scope.userPayAmt = 0;
        $rootScope.kioskVitalTestCost = $scope.userPayAmt;
        alert( $rootScope.kioskVitalTestCost);*/

        $rootScope.kioskVitalTestCost = $rootScope.couponAmt;
      }
     
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
      if($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'] != undefined){
        $scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
        }else{
          $scope.consultantName = "N/A";
        }
      }
      if ($rootScope.dataForAppointmentBooking != undefined && $rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
          $scope.consultCost = $rootScope.dataForAppointmentBooking["doctorFees"];
          if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'] != undefined) {
              $scope.consultantName = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['name'];
          }
      }
       //$scope.printEmail = $rootScope.user['email'];
       //$scope.printMobilnum = $rootScope.user['mobileNumber'];
       //console.log($rootScope.user['name']);
       //console.log($rootScope.user['email']);
       //console.log($rootScope.user['mobileNumber']);
       //console.log($scope.consultantName);
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
      $scope.finalConsultCost = +$scope.finalConsultCost.toFixed(2);
      $scope.igstAmtConcost = (18*1/100) * $scope.consultCost;

 

    if($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){

           if($scope.printerSettingsResult.PaperWidth == 827){ 

            //console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:10px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b>"+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
            }else if($scope.printerSettingsResult.PaperWidth == 315){ // Thermal or Regular Printer check 
                //alert("Thermal Printer condition satisfied");          
                //console.log("Thermal Printer condition satisfied");

             var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:400px;height:470px;margin-left:0px;margin-top:-50px;font-size:11px;'><img style ='position: relative; top: 50px; left:120px;width: 25%;' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"


            }else
            {
                //alert("Regular Printer");
                //console.log("Regular Printer");
            var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:75px; height: 71px; width: 174px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>----------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>----------------------</td></tr></table><table style='width: 100%;'><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>------------------------</td></tr></tr>"  

            }

            $rootScope.final_print_resultss = common_details_prints;


            $scope.printMerge = "";

              if($rootScope.paymentMode == "cash"){ 
                  //alert("BP not taken");
                  
                 //if($scope.printerSettingsResult.PaperWidth == 827){
                  if (true) {
                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Cash Collected"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST 18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }else{
                  if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Cash Collected"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST 18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
                }
              }else{
                //if($scope.printerSettingsResult.PaperWidth == 827){
                  if (true) {
                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Card Swipe"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST 18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }else{
                  if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Vitals Test</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Card Swipe"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalKioskVitalTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST 18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtVitcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$rootScope.kioskVitalTestCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>-----------------------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }
                }
              }
    }else{


                  if($scope.printerSettingsResult.PaperWidth == 827){ 
                    //console.log($scope.printerSettingsResult);
                //alert("New Printer condition satisfied");
               // console.log("New Printer condition satisfied");

               var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:10px; height: 71px; width: 150px' src='"+$rootScope.printTemplateLogo+"' alt='IHL_logo'><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='';>Contact: +91 8047485152</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'>Email: info@indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='gender'>Web: indiahealthlink.com</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: left;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='age'>Address: "+$rootScope.GSTaddress+"</td></tr><tr><td colspan='2'>-------------------------------------</td></tr><tr><td colspan='2' style='font-family:'segoe', 'Roboto', arial;text-align: center;color:black;background-color: white;font-size:15px;padding:5px 20px;font-weight:bold'><b>Payment Receipt</b></td></tr><tr><td colspan='2'>-------------------------------------</td></tr></table><table style='width: 100%;'><tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Invoice No:</b> "+invoiceVal+"</td></tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Name:</b> "+printUser+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Date:</b> "+trimmedDate+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Phone Number:</b> "+$scope.printMobilnum+"</td></tr><tr><td style='width:50%;, font-family:segoe;text-align: left;font-size:15px;white-space:nowrap'><b>GSTIN:</b> "+$rootScope.GSTno+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Email:</b> "+$scope.printEmail+"</td></tr><tr><td style='width:50%; font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Consultant/Doctor Name:</b> "+$scope.consultantName+"</td></tr></table><table style='width: 100%;'><tr><tr><td colspan='2'>---------------------------------------</td></tr><td style='width:40%; font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'><b>Item Description</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Payment Method</b></td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;padding: 5px 5px;'><b>Amount</b></td><tr><td colspan='2'>---------------------------------------</td></tr></tr>"  
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

                if($rootScope.paymentMode == "cash"){ 
                  //alert("BP not taken");
                  
                  if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Cash Collected"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>--------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }else{
                  $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Cash Collected"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>--------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay;
                }
              }else{
                  if($scope.printerSettingsResult.PaperWidth == 827){

                    $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Card Swipe"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>--------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay; 
                }else{
                  $scope.printMergepay = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Video Consultation Fees</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>"+"Card Swipe"+"</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.finalConsultCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>IGST @18%</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+$scope.igstAmtConcost.toFixed(2)+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'>"+""+"</td><td style='font-size:15px;text-align: left;font-family:segoe;padding: 5px 5px;'>Total</td><td style='font-size:15px;text-align: left;font-family:segoe;text-transform: capitalize;padding: 5px 5px;'>"+"Rs "+$scope.consultCost+"(Incl. of all taxes"+"</td></tr><tr><td colspan='2'>--------------------------</td></tr><tr><td colspan='2'style='text-align: left;font-size:15px;'><b>Note:</b>This is an electronic receipt</td></tr></table></table></body></html>";
                  $rootScope.final_print_resultss += $scope.printMergepay;
                }
              }
                }
                //}
                $scope.print =  $rootScope.final_print_resultss;
                  //console.log( "PrintResult"+ $scope.print);

             jkiosk.print($scope.print,"onJobPrintComplete", "onJobPrintFailed");
      }

      $scope.ResultRes = function(res){
        console.log(res);
        if(res.isApiCallSuccess == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
          var result = JSON.parse(res.respose);
          //console.log(result);

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
          
          //$scope.unique_invoice_no = generateUUID();
          $rootScope.unique_invoice_no = $scope.unique_invoice_no;

          let serviceToProvide;
          let userIhlId = "";
          let purposeOfVisit = "";
          let vendorName = "";
          if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
            $rootScope.userPaidServices["invoice_id"] = $rootScope.unique_invoice_no;
            serviceToProvide = JSON.stringify($rootScope.kioskVitalTestToProvide());
            userIhlId = "";
            purposeOfVisit = "vital";
          }

          if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
            serviceToProvide = JSON.stringify($rootScope.userPaidServices);
            userIhlId = "";
            purposeOfVisit = "teleconsult";
            let selectedDoctor = $rootScope.teleconsultationUserSelectedData;
            vendorName = selectedDoctor['tele-consultation-selected-doctor']['vendor_id'];
          }


          var status="approved";
          var acquire= result.acquirerName;
          //console.log(acquire);
          var applable=result.appLabel;
          var applicationid=result.applicationId;
          var approvalcode=result.approvalCode;
          var batchnumber = result.batchNumber;
          var billnumber=result.billNumber;
          var cardnumber=result.cardNumber;
          var cardtype = result.cardType;
          var Cid=result.cid;
          var Currency=result.currency;
          var ddate= today;
          var invoicenumber=$rootScope.unique_invoice_no;
          $rootScope.invoiceIdForApolloTeleconsultationService = $rootScope.unique_invoice_no;
          var merchantid = result.merchantId;
          var retrieval = result.retrievalReferenceNumber;
          var Stan=result.stan;
          var statuscode=result.statusCode;
          var terminalid=result.terminalId;
          var Time=result.time;
          var transactionid = result.transactionId;
          var mosambeeTransactionid = result.transactionId;
          var transactionmode = result.transactionMode;
          var Tsi = result.tsi;
          var Tvr=result.tvr;
          var MobileNumberGet = $scope.customerMobNum;
          //var Totalamount = $rootScope.chooseCost;
          //var Totalamount = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021
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
          // let emailID = HigiKioskStorageService.returnSessionData('user').email;
          let mobileNum = $scope.customerMobNum;
          let principalAmt = "";
          let gstAmt = "";
          let userState = $rootScope.stateforpayment;
          let accountName = "";

          if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
            Totalamount = $rootScope.dataForAppointmentBooking["doctorFees"].toString();
            ConsultantID = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
            ConsultantName = $rootScope.dataForAppointmentBooking["doctorInfo"]["name"];
            PurposeDetails = JSON.stringify($rootScope.bookAppointmentObject());
          }
          if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
            Totalamount = $rootScope.kioskVitalTestCost.toString();
          }
          if($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
            Totalamount = $rootScope.printingVitalAndPresCostObj["vital_print_cost_inbuilt"];
            $rootScope.totalMrpCost = $rootScope.printingVitalAndPresCostObj["vital_print_cost_inbuilt"];
          }
          var UsageType = "card";
          var machine_id = $rootScope.IHLMachineNumber.toString();
          let kioskId = $rootScope.uniqueKioskId.toString();
          let orgCode = kioskId.split("-")[1];
          MRPCost = ($rootScope.totalMrpCost).toString();
          Discounts = Number(MRPCost - Totalamount).toString();
          DiscountType = $rootScope.discountType;
          CouponNumber = $rootScope.couponNumber;
          

          if (HigiKioskStorageService.returnSessionData('user') != undefined && HigiKioskStorageService.returnSessionData('user') != null) {
            userIhlId = HigiKioskStorageService.returnSessionData('user').id.toString();
            let emailID = HigiKioskStorageService.returnSessionData('user').email;
            var jsontext = "";
            if(Number(Totalamount) > 0){
              principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
              gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
            }

            if(serviceToProvide == undefined){
              serviceToProvide = "";
              jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoicenumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","mosambee_transaction_id":"'+mosambeeTransactionid+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": "'+serviceToProvide+'", "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
            } else {
              jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoicenumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","mosambee_transaction_id":"'+mosambeeTransactionid+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "user_ihl_id": "'+userIhlId+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
            }
            
            if ($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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
            var jsontext = "";
            let emailID = "";
            if(Number(Totalamount) > 0){
              principalAmt = Number(Totalamount/1.18).toFixed(2).toString();
              gstAmt = Number((principalAmt*18)/100).toFixed(2).toString();
            }
            if(serviceToProvide == undefined){
              serviceToProvide = "";
              jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoicenumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","mosambee_transaction_id":"'+mosambeeTransactionid+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": "'+serviceToProvide+'", "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
            } else {
              jsontext = '{"MobileNumber": "'+MobileNumberGet+'","Status":"'+status+'","acquirerName":"'+acquire+'","appLable":"'+applable+'","applicationId":"'+applicationid+'","approvalCode":"'+ approvalcode+'","batchNumber":"'+ batchnumber+'","billNumber":"'+ billnumber +'","cardNumber":"'+ cardnumber+'","cardType":"'+ cardtype+'","cid":"'+ Cid+'","currency":"'+Currency+'","date":"'+ddate+'","invoiceNumber":"'+ invoicenumber+'","merchantId":"'+merchantid+'","retrievalReferenceNumber":"'+retrieval+'","stan":"'+Stan+'","statusCode":"'+statuscode+'","terminalId":"'+ terminalid+'","time":"'+Time+'","mosambee_transaction_id":"'+mosambeeTransactionid+'","transactionId":"'+transactionid+'","transactionMode":"'+transactionmode+'","tsi":"'+Tsi+'","tvr":"'+Tvr+'","TotalAmount":"'+Totalamount+'","UsageType":"'+UsageType+'","machine_id": "'+machine_id+'", "last_checkin_services": '+serviceToProvide+', "KioskID": "'+kioskId+'", "vendor_name": "'+vendorName+'", "purpose": "'+purposeOfVisit+'", "MRPCost": "'+MRPCost+'", "Discounts": "'+Discounts+'", "DiscountType": "'+DiscountType+'", "CouponNumber": "'+CouponNumber+'", "ConsultantID": "'+ConsultantID+'", "ConsultantName": "'+ConsultantName+'", "AppointmentID": "'+AppointmentID+'", "PurposeDetails": '+JSON.stringify(PurposeDetails)+', "SourceDevice": "'+SourceDevice+'", "Service_Provided": "'+Service_Provided+'", "user_email": "'+emailID+'","user_mobile_number":"'+mobileNum+'", "OrganizationCode":"'+orgCode+'", "principal_amount":"'+principalAmt+'", "gst_amount":"'+gstAmt+'", "state":"'+userState+'"}';
            }
            
            if ($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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
          let parsedData = JSON.parse(jsontext);
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

          parsedData["payment_status"] = "completed";
          
          jsontext = JSON.stringify(parsedData);

          $.ajax({
            url: getSettingsValue('kiosk.api.url') +"/data/paymenttransaction",
            type : "POST", 
            cache: false,
            data: jsontext,
            contentType: 'application/json; charset=UTF-8',  
            headers:{"ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA=="},
            success: function(html){
              //alert(html);
              //var jsonStr = JSON.parse(html.replace(/&quot;/g,'"'));
              //console.log(html);
              if (html.status == "inserted") {
                $scope.invoiceNumber = html.invoice_number;
                $rootScope.prescriptionNumberFor1mg = html.invoice_number;
                $rootScope.paymentTransactionIdValue = html.transaction_id;
              }else{
                $scope.invoiceNumber = "NA";
              }
              $rootScope.printCheckinResultsConfirmation();
            },
            error : function(xhr, status, error) { 
              //alert("error");
              //console.log(xhr.responseText);
              $scope.invoiceNumber = "NA";
              $rootScope.printCheckinResultsConfirmation();
            } 
          });

          $("#pinNumber_instruction").hide();
          $("#payment_success").show();
          $("#payment_failed").hide(); 
          //alert("card payment print calling");
          $rootScope.paymentTransactionCompleted = true;
          $timeout(function(){
            //$rootScope.isVisibleLogin = true;
            //$rootScope.isVisibleReg = true;
            $(".higi_top_nav_ng ").show();
            $rootScope.paymentSessionStarted=true;
            $rootScope.paymentSessionActive = true;
            //window.location = "#/welcome";  


            // initiate vital test or onboarding page
              //$timeout(function(){
                if ($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting) {
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

                if ($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
                  $(".keyboard_class_close_btn").show();
                  $(".higi_top_nav_ng ").show();
                  $rootScope.printVitalDataOfUser();
                }

                if ($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
                  $(".keyboard_class_close_btn").show();
                  $(".higi_top_nav_ng ").show();
                  $rootScope.printPrescriptionDataOfUser();
                }

                if($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && $rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
                  $scope.PaymentSuccess = false;
                  $(".higi_top_nav_ng ").show();
                  $(".keyboard_class_close_btn").show();
                  $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                }
                
              //},2800);
          },3000, false);
        }else{
          $("#pinNumber_instruction").hide();
          $("#payment_success").hide();
          $("#payment_failed").show();
          $timeout(function(){
            $rootScope.paymentSessionStarted=false;
            $rootScope.kioskVitalTestCost = 0;
            $rootScope.totalMrpCost = 0;
            //window.location = "#/mosambeePayment";

            window.location = "#/welcome";
          },3000, false);
        }
      }

      $scope.BharatQRRes = function(res){
        //console.log(res);
        if(res.status == true && res.BharatQRGenerator != "" && res.BharatQRGenerator != null){
          $rootScope.bharatQR = res.BharatQRGenerator;
          $("#teleMedLoad").hide();
          window.location = "#/paymentbyupi"; 
        }else{
          $("#teleMedLoad").hide();
          //alert("Not able to generate QR");
        }
      }

      $scope.getRazorPayQrCode = function(amount, purpose, paymentMode, customerMobNum){
        $rootScope.bharatQR = undefined;
        $rootScope.qrId = undefined;
        let success_fn = undefined;
        let error_fn = undefined;
        success_fn = function(response){
          console.log("response 1407 : ",response);
          $("#teleMedLoad").hide();
          if (response && response instanceof Object) {
            if ("qr_image_base64" in response) {
              $rootScope.bharatQR = response.qr_image_base64;
              $rootScope.qrId = response.qr_id;
              window.location = "#/payment-by-razorPayupi";
            }else{
              $("#teleMedLoad").hide();
              $rootScope.errorGeneratingQr = true;
              $timeout(function(){
                $rootScope.paymentSessionStarted=false;
                $rootScope.kioskVitalTestCost = 0;
                $rootScope.totalMrpCost = 0;
                $rootScope.errorGeneratingQr = false;

                window.location = "#/welcome";
              },4000);
            }
          } else {
            $("#teleMedLoad").hide();
            $rootScope.errorGeneratingQr = true;
            $timeout(function(){
              $rootScope.paymentSessionStarted=false;
              $rootScope.kioskVitalTestCost = 0;
              $rootScope.totalMrpCost = 0;
              $rootScope.errorGeneratingQr = false;

              window.location = "#/welcome";
            },4000);
          }
        };

        error_fn = function(error){
          $("#teleMedLoad").hide();
          $rootScope.errorGeneratingQr = true;
          $timeout(function(){
            $rootScope.paymentSessionStarted=false;
            $rootScope.kioskVitalTestCost = 0;
            $rootScope.totalMrpCost = 0;
            $rootScope.errorGeneratingQr = false;

            window.location = "#/welcome";
          },4000);
        };
        HigiApiService.generateRazorPayQr((Number(amount) * 100), purpose, paymentMode, success_fn, error_fn);
      }

      function generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-PaidVitalxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if(d > 0){//Use timestamp until depleted
                r = (d + r)%16 | 0;
                d = Math.floor(d/16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r)%16 | 0;
                d2 = Math.floor(d2/16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }

      $rootScope.paymentPrintFunction = function(){
        var completeAllTestInitialCost = $rootScope.completeAllTestCost;
        var ECGInitialCost = $rootScope.ECGCost;
        var BMCInitialCost = $rootScope.BMCCost;
        var BMIInitialCost = $rootScope.BMICost;
        var BPInitialCost = $rootScope.BPCost;
        var Spo2InitialCost = $rootScope.Spo2Cost;
        var TempInitialCost = $rootScope.TempCost;
        var gstNumber = $rootScope.gstNumber;
        var gstPercent =  $rootScope.gstPercent;
        var footerMessage =  $rootScope.footerMessage;
        var paymentMode = $rootScope.paymentMode;
        var customerMobileNumber  = $scope.paymentModal.fields[0].text;
        var printBase64Image = $rootScope.printBase64Image;
        var subTotalInitial = [];
        var percentageArray = [];
        var interState = true;

        var completeAllTestInitialGst = Number(completeAllTestInitialCost) - Number(completeAllTestInitialCost*gstPercent)/100;
        var completeAllTestInitial = completeAllTestInitialGst.toFixed(2).toString();
        var completeAllTestCost = completeAllTestInitial;
        
        var ECGInitialGst = Number(ECGInitialCost) - Number(ECGInitialCost*gstPercent)/100;
        var ECGTestInitial = ECGInitialGst.toFixed(2).toString();
        var ECGCost = ECGTestInitial;
        
        var BMCInitialGst = Number(BMCInitialCost) - Number(BMCInitialCost*gstPercent)/100;
        var BMCTestInitial = BMCInitialGst.toFixed(2).toString();
        var BMCCost = BMCTestInitial;
        
        var BMIInitialGst = Number(BMIInitialCost) - Number(BMIInitialCost*gstPercent)/100;
        var BMITestInitial = BMIInitialGst.toFixed(2).toString();
        var BMICost = BMITestInitial;
        
        var BPInitialGst = Number(BPInitialCost) - Number(BPInitialCost*gstPercent)/100;
        var BPTestInitial = BPInitialGst.toFixed(2).toString();
        var BPCost = BPTestInitial;
        
        var Spo2InitialGst = Number(Spo2InitialCost) - Number(Spo2InitialCost*gstPercent)/100;
        var Spo2TestInitial = Spo2InitialGst.toFixed(2).toString();
        var Spo2Cost = Spo2TestInitial;
       
        var TempInitialGst = Number(TempInitialCost) - Number(TempInitialCost*gstPercent)/100;
        var TempTestInitial = TempInitialGst.toFixed(2).toString();
        var TempCost = TempTestInitial;

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

        var timeNow = new Date(); 
        var hours = timeNow.getHours();
        var minutes = timeNow.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;

        var common_details_prints = "<!DOCTYPE html><html><head><title></title></head><body style='width:372px;height:470px;margin-left:0px;margin-top:-40px;'><img style ='position: relative; top: 0px; left:76px; height: 71px; width: 150px' src="+printBase64Image+" alt='IHL_logo'><br><br><br><br><br><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>Company Name:   </b>India Health Link</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>GST Number:   </b>"+gstNumber+"</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>Customer Mobile Number:   </b>"+customerMobileNumber+"</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>Date:   </b>"+today+"</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>Time:   </b>"+strTime+"</td></tr><tr><td style='font-family:'segoe', 'Roboto', arial;text-align: right;color:black;background-color: white;font-size:15px;padding:5px 20px;' width='50%' mc:edit='date_time'><b>Payment Mode:   </b>"+paymentMode+"</td></tr><tr><td>*****************************</td></tr></table><table style='width: 50%;'><tr><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;'>Test Name</td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;visibility:hidden'>****</td><td style=' font-weight: bold;font-family:segoe;text-align: left;font-size:15px;white-space:nowrap;visibility:hidden'>********</td><td style=' font-weight: bold;font-family:segoe;text-align: right;font-size:15px;white-space:nowrap;padding: 5px 5px;'>Amount</td></tr>";
       
        $scope.finalPrintResults = common_details_prints;

        if ($( "#checkbox_bpw").prop('checked') == true){

          //var  overAllInitialCost = $rootScope.chooseCost;
          var overAllInitialCost = $rootScope.kioskVitalTestCost; // new var after 2Jan 2021

          var value1 = Number(overAllInitialCost);
          var res1 = overAllInitialCost.toString().split(".");
          if(res1.length == 1 || res1[1].length < 3) { 
            value1 = value1.toFixed(2);
            var overAllCost = String(value1);
          }else{
            var overAllCost = overAllInitialCost;
          }

          $scope.Bpwcost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>All Test</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+completeAllTestCost+"</td></tr>";
          
          $scope.finalPrintResults += $scope.Bpwcost;

          if (interState == true) {
            var overAllAmount = Number(completeAllTestCost);
            var gstPercentage = Number(completeAllTestInitialCost);
            var percentageCalculate = gstPercentage-overAllAmount;
            var NetTotalGST = percentageCalculate.toFixed(2).toString();

            $scope.completeresult = "<table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table style='width: 50%;'><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SubTotal:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>*************</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+completeAllTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>IGST&#64;"+gstPercent+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>**********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+NetTotalGST+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>Total:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>**********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+overAllCost+"</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>****************************</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='visibility: hidden;'>*******</td><td>"+footerMessage+"</td><td style='visibility: hidden;'>****************</td></tr></table></body></html>";
        
            $scope.finalPrintResults += $scope.completeresult;
          }else{
            var overAllAmount = Number(completeAllTestCost);
            var gstPercentage = Number(completeAllTestInitialCost);
            var percentageCalculate = gstPercentage-overAllAmount;
            //var NetTotalGST = percentageCalculate.toFixed(2).toString();

            var CGSTCostInitial = percentageCalculate/2;
            var CGSTCost = CGSTCostInitial.toString();
            var CGSTCost = CGSTCostInitial.toFixed(2);
            var SGSTCostInitial = percentageCalculate/2;
            var SGSTCost = SGSTCostInitial.toString();
            var SGSTCost = SGSTCostInitial.toFixed(2);
            var CGST = gstPercent/2;
            var SGST = gstPercent/2;
            $scope.completeresult = "<table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table style='width: 50%;'><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SubTotal:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>*************</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+completeAllTestCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>CGST&#64;"+CGST+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>**********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+CGSTCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SGST&#64;"+SGST+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>**********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+SGSTCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>Total:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>**********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+overAllCost+"</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>****************************</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='visibility: hidden;'>*******</td><td>"+footerMessage+"</td><td style='visibility: hidden;'>****************</td></tr></table></body></html>";
        
            $scope.finalPrintResults += $scope.completeresult;
          }  

        //  console.log($scope.finalPrintResults);
        }else{
          if ($( "#checkbox_ecg").prop('checked') == true) {
            $scope.Ecgcost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>ECG</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+ECGCost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.Ecgcost;  

            subTotalInitial.push(Number(ECGCost));

            var EcgAmount = Number(ECGCost);
            var EcgGstPercentage = Number(ECGInitialCost);
            var EcgpercentageCalculate = EcgGstPercentage-EcgAmount;
            var EcgNetTotalGST = Number(EcgpercentageCalculate);
            
            percentageArray.push(EcgNetTotalGST);
          }

          if ($( "#checkbox_bmc").prop('checked') == true) {
            $scope.Bmccost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>BMC</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+BMCCost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.Bmccost; 

            subTotalInitial.push(Number(BMCCost));

            var BMCAmount = Number(BMCCost);
            var BMCGstPercentage = Number(BMCInitialCost);
            var BMCpercentageCalculate = BMCGstPercentage-BMCAmount;
            var BMCNetTotalGST = Number(BMCpercentageCalculate);
            
            percentageArray.push(BMCNetTotalGST);
          }

          if ($( "#checkbox_bmi").prop('checked') == true) {
            $scope.Bmicost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Weight</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+BMICost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.Bmicost; 

            subTotalInitial.push(Number(BMICost));

            var BMIAmount = Number(BMICost);
            var BMIGstPercentage = Number(BMIInitialCost);
            var BMIpercentageCalculate = BMIGstPercentage-BMIAmount;
            var BMINetTotalGST = Number(BMIpercentageCalculate);
            
            percentageArray.push(BMINetTotalGST);
          }

          if ($( "#checkbox_bp").prop('checked') == true) {
            $scope.Bpcost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>BP</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+BPCost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.Bpcost;

            subTotalInitial.push(Number(BPCost));

            var BPAmount = Number(BPCost);
            var BPGstPercentage = Number(BPInitialCost);
            var BPpercentageCalculate = BPGstPercentage-BPAmount;
            var BPNetTotalGST = Number(BPpercentageCalculate);
            
            percentageArray.push(BPNetTotalGST);
          }

          if ($( "#checkbox_spo2").prop('checked') == true) {
            $scope.Spo2cost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>SpO<sub>2</sub></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+Spo2Cost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.Spo2cost;

            subTotalInitial.push(Number(Spo2Cost));

            var Spo2Amount = Number(Spo2Cost);
            var Spo2GstPercentage = Number(Spo2InitialCost);
            var Spo2percentageCalculate = Spo2GstPercentage-Spo2Amount;
            var Spo2NetTotalGST = Number(Spo2percentageCalculate);
            
            percentageArray.push(Spo2NetTotalGST);
          }

          if ($( "#checkbox_temp").prop('checked') == true) {
            $scope.tempcost = "<tr><td style='font-size:15px;text-align: left;font-family:segoe;'>Temp</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***</td><td style='font-size:15px;text-align: right;font-family:segoe;padding: 5px 5px;'>&#x20B9; "+TempCost+"</td></tr>";
          
            $scope.finalPrintResults += $scope.tempcost;

            subTotalInitial.push(Number(TempCost));

            var TempAmount = Number(TempCost);
            var TempGstPercentage = Number(TempInitialCost);
            var TemppercentageCalculate = TempGstPercentage-TempAmount;
            var TempNetTotalGST = Number(TemppercentageCalculate);
            
            percentageArray.push(TempNetTotalGST);

          }
          if (interState == true) {
            var overAllCost1 =  subTotalInitial.reduce((a, b) => a + b, 0);
            var overAllCost =  overAllCost1.toString();
            var overAllCost =  overAllCost1.toFixed(2);
            var NetTotalGST1 = percentageArray.reduce((a, b) => a + b, 0);
            var NetTotalGST = NetTotalGST1.toString();
            var NetTotalGST = NetTotalGST1.toFixed(2);
            var NetTotalAmount1 = overAllCost1 + NetTotalGST1;
            var NetTotalAmount = NetTotalAmount1.toString();
            var NetTotalAmount = NetTotalAmount1.toFixed(2);
            $scope.completeresult = "<table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table style='width: 50%;'><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SubTotal:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>************</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+overAllCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>IGST&#64;"+gstPercent+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+NetTotalGST+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>Total:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+NetTotalAmount+"</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='visibility: hidden;'>*******</td><td>"+footerMessage+"</td><td style='visibility: hidden;'>****************</td></tr></table></body></html>";
        
            $scope.finalPrintResults += $scope.completeresult;

          //  console.log($scope.finalPrintResults);
          }else{
            var overAllCost1 =  subTotalInitial.reduce((a, b) => a + b, 0);
            var overAllCost =  overAllCost1.toString();
            var overAllCost =  overAllCost1.toFixed(2);
            var NetTotalGST1 = percentageArray.reduce((a, b) => a + b, 0);
            var CGSTCostInitial = NetTotalGST1/2;
            var CGSTCost = CGSTCostInitial.toString();
            var CGSTCost = CGSTCostInitial.toFixed(2);
            var SGSTCostInitial = NetTotalGST1/2;
            var SGSTCost = SGSTCostInitial.toString();
            var SGSTCost = SGSTCostInitial.toFixed(2);
            var CGST = gstPercent/2;
            var SGST = gstPercent/2;
            var NetTotalAmount1 = overAllCost1 + NetTotalGST1;
            var NetTotalAmount = NetTotalAmount1.toString();
            var NetTotalAmount = NetTotalAmount1.toFixed(2);
            $scope.completeresult = "<table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table style='width: 50%;'><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SubTotal:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>************</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+overAllCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>CGST&#64;"+CGST+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+CGSTCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>SGST&#64;"+SGST+"&#37;:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+SGSTCost+"</td></tr><tr><td style='font-size:15px;text-align: left;font-family:segoe;'><b>Total:</b></td><td style='font-size:15px;text-align: left;font-family:segoe;visibility: hidden;'>***********</td><td style='font-size:15px;text-align: right;font-family:segoe;text-transform: capitalize;white-space:nowrap;'>&#x20B9; "+NetTotalAmount+"</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td>*****************************</td></tr></table><table width='100%' style='border-collapse: collapse; border-spacing: 0px;'><tr><td style='visibility: hidden;'>*******</td><td>"+footerMessage+"</td><td style='visibility: hidden;'>****************</td></tr></table></body></html>";
        
            $scope.finalPrintResults += $scope.completeresult;

          //  console.log($scope.finalPrintResults);
          } 
        }
      }

      $rootScope.kioskVitalTestToProvide = function(){

        //Getting User Selected Vitals.
        let userSelectedVitals = $rootScope.selectedVital;

        //Setting Full Body Bmc By Default
        let bmcHardWareName = "FullBodyCompositionAnalyser";
        let bmcServiceName = "bmc_full";

        //Override If Half  Body Bmc Hardware Available
        if ($rootScope.hardwareAvailability["Body Composition"] == true) {
          bmcHardWareName = "Body Composition";
          bmcServiceName = "bmc";
        }

        let modulesConfigObj = [
          {hardware: 'ECG', mode: 'ekg', serviceProvideName: "ecg"},
          {hardware: bmcHardWareName, mode: 'bmc', serviceProvideName: bmcServiceName},
          {hardware: 'Weight Scale', mode: 'w', serviceProvideName: "weight"},
          {hardware: 'Blood Pressure', mode: 'bp', serviceProvideName: "bp"},
          {hardware: 'SPo2', mode: 'spo2', serviceProvideName: "spo2"},
          {hardware: 'temp', mode: 'temp', serviceProvideName: "temperature"}
        ];


        if (userSelectedVitals.includes('bpw')) {
          //Making all services as true if complete all test true.
          modulesConfigObj.forEach(element => {
            $rootScope.userPaidServices[element.serviceProvideName] = true;
          });
        }else{
          //Making true only selected services.
          modulesConfigObj.forEach(element => {
            if (userSelectedVitals.includes(element.mode)) {
              $rootScope.userPaidServices[element.serviceProvideName] = true;
            }
          });
        }

        return $rootScope.userPaidServices;
      }

      $scope.paymentModal.showAuthToggle = function (field) {
        field.textMaskedDisabled = !field.textMaskedDisabled;
        if (field.textMaskedDisabled) {
          field.type = "text";
        } else {
          field.type = "password";
        }
        if (field.textMaskedDisabled) {
          $rootScope.authShowPasswordClass = 'active_eyes';
          field.textMasked = field.text;
        } else {
          $rootScope.authShowPasswordClass = '';
          var textMasked = '';
          for (var i = 0; i < field.textMasked.length; i++) {
            textMasked += '&#149;';
          }
          field.textMasked = textMasked;
        }
      };

    $scope.paymentModal.init();
    }
  };   
}]);