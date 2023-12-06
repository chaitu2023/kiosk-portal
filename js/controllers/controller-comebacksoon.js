higiKioskControllers.controller('HigiKioskComebackSoonController', ['$timeout', '$scope', '$rootScope', 'HigiKioskFlow', 'HigiKioskAnimationService', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', 'HigiKioskUtilitiesService', function($timeout , $scope, $rootScope, HigiKioskFlow, HigiKioskAnimationService, JkioskService, HigiKioskStorageService, HigiApiService, HigiKioskUtilitiesService) {
    $scope.slideTitle = 'comebacksoon.goodbye';
    $scope.slideSubTitle = 'comebacksoon.subtitle';
    $scope.comenbackThanks = 'comebacksoon.thanks.for.visiting';
    $scope.comenbackThanksMEB = 'comebacksoon.thanks.for.visiting.MEB';
    $scope.comenbackCheckUsOut = 'comebacksoon.check.us.out';
    $rootScope.isVisibleLogo = false;
    $rootScope.higiTopNavHidden = true;
    $rootScope.slideInNav = "slideOut";
    $scope.showSandClock = true;
    $scope.isRefund = false;
    $scope.noDataForCheckin = false;
    $scope.userTestTaken = false;

    $scope.setSlideDirection('forward');
    setTimeout(function(){
        localStorage.clear();   // clear e-sanjeevani localStorage          
        $rootScope.clearModal();
    }, 350);
    
    
    // if ($rootScope.comeBackScreenText1 != '')
    //   $scope.comenbackThanks = "Thanks for visiting<br />"+$rootScope.comeBackScreenText1;

    // if ($rootScope.comeBackScreenText2 != '')
    //   $scope.comenbackCheckUsOut = "For More information, Visit<br />"+ $rootScope.comeBackScreenText2;
        

    //Wrap up session
    $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels['comebacksoon01_audio01'], $scope);
    HigiKioskFlow.setGlobalNav('HigiKioskComebackSoonController', $scope.$parent);
    //Cancel standup timeout on exit screen.
    $rootScope.stopSessionTimeout();
    localStorage.setItem("fromInitPage" , "false");
    
    $("#teleMedLoad").hide();
    $("#teleMedClose").hide();
    $("#teleMedWait").hide();
    $("#teleMedGem3sInternet").hide();
    $("#teleMedGem3sServer").hide();
    $("#teleMedHpodServer").hide();
    
    $scope.gem3sLogoutRes = function(Res){
        console.log(Res);
        if(Res.status != undefined){
            if(Res.status){
              if(Res.response != undefined){
                  if(Res.response == "internet"){
                    console.log("internet connection not avaliable");                          
                  } else {
                    console.log("Gem3s user logout successfully..");      
                  }
              } else {
                  console.log("need to check platform code");      
              }
            } else {
              console.log("gem3s api not response properly");    
            }

        } else {
          console.log("need to check platform code");
        }
    }

    $scope.CancelCallGem3sApiRes = function(Res){
        console.log(Res);
        if(Res.status != undefined){
            if(Res.status){
              if(Res.response != undefined){
                  if(Res.response == "internet"){
                    console.log("internet connection not avaliable");                          
                  } else {
                    JkioskService.gem3sLogout( $scope.gem3sLogoutRes, HigiKioskStorageService.returnSessionData("telemediAccessToken"));
                    var dataRes = JSON.parse(Res.response);                    
                    console.log("call terminated from patient side = "+ dataRes.data.CallDetail[0].call_status);
                  }
              } else {
                  console.log("need to check platform code");      
              }
            } else {
              console.log("gem3s api not response properly");    
            }

        } else {
          console.log("need to check platform code");
        }

    }
    $scope.EndconsultationGem3sApiRes = function(Res){
        console.log(Res);
        JkioskService.gem3sLogout( $scope.gem3sLogoutRes, HigiKioskStorageService.returnSessionData("telemediAccessToken"));                    
    }


    if($rootScope.telemediSetting) {
        if($rootScope.telemediApiVendor == "gem3s") {// gem3s logout callback
            $rootScope.teleMediDoctorcall =  false;
            $rootScope.floatingWindowLoaded = false;

            if($rootScope.triggerBeforeStartCallFinal == false){
            var startcal = { id : HigiKioskStorageService.returnSessionData("telecallId") };
                JkioskService.CancelCallGem3sApi( $scope.CancelCallGem3sApiRes, startcal, HigiKioskStorageService.returnSessionData("telemediAccessToken"));
            } else {
                console.log("$rootScope.triggerBeforeStartCallFinal else = "+ $rootScope.triggerBeforeStartCallFinal);
            }

            if($rootScope.triggeredLiveCallFinal == false && $rootScope.triggerBeforeStartCallFinal == true){
                $rootScope.teleMediCheckin();
                var startcal = { id : HigiKioskStorageService.returnSessionData("telecallId") };
                JkioskService.EndconsultationGem3sApi( $scope.EndconsultationGem3sApiRes, startcal, HigiKioskStorageService.returnSessionData("telemediAccessToken"));
            } else {
                console.log("$rootScope.triggeredLiveCallFinal = "+ $rootScope.triggeredLiveCallFinal +" ; $rootScope.triggerBeforeStartCallFinal = "+ $rootScope.triggerBeforeStartCallFinal);
            }
            
        } else {
            // other vendor extend below.
            //alert("gem3sLogout service callback error");
        }
    }



    /*if ($rootScope.unique_invoice_no != null && $rootScope.unique_invoice_no != undefined && $rootScope.unique_invoice_no != "") {
        var invoice = $rootScope.unique_invoice_no;
        var json = $.ajax({
          url:getSettingsValue('kiosk.api.url') +"/data/serviceProvided?invoice_id="+invoice+"",
          type : "POST", 
          cache: false,
          contentType: 'application/json; charset=UTF-8',
          dataType: 'json',
          headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
          success: function(html){
                //alert("success");
                var json2 = JSON.parse(JSON.stringify(html));
                console.log(json2);
                var jss2=JSON.stringify(json2);
                console.log(jss2);           
            }
        });
    }*/

    //Mute all interface sounds
    $rootScope.interfaceSounds.stop();

    //Failsafe in the event to prevent sticking on comeback soon screen.
    var threshold = setTimeout(function(){
        try{
            $scope.q.reject();
        }catch(e){

        }
        jkiosk.endSession();
        //Allow time for endsession sockets to close
        setTimeout(function(){
            window.location = 'index.html'
        }, 5000);
    }, 7000);

    $scope.q.promise.then(function(){

        HigiKioskFlow.higiExit();

        //Cancel failsafe
        clearTimeout(threshold);
        let jsonObjAllTest = {
          "ecg":HigiKioskStorageService.returnSessionData('ECGStatus'),
          "spo2":HigiKioskStorageService.returnSessionData('oxygen'),
          "systolic":HigiKioskStorageService.returnSessionData('systolic'),
          "diastolic":HigiKioskStorageService.returnSessionData('diastolic'),
          "pulse":HigiKioskStorageService.returnSessionData('pulse'),
          "w":HigiKioskStorageService.returnSessionData('weight'),
          "intraCellularWater":HigiKioskStorageService.returnSessionData('ICW'),
          "extraCellularWater" : HigiKioskStorageService.returnSessionData('ECW'),
          "bodyFatMass" : HigiKioskStorageService.returnSessionData('Fat'),
          "percentBodyFat" : HigiKioskStorageService.returnSessionData('PBF'),
          "skeletalMuscleMass" : HigiKioskStorageService.returnSessionData('SMM'),
          "bodyCellMass" : HigiKioskStorageService.returnSessionData('BCM'),
          "boneMineralContent" : HigiKioskStorageService.returnSessionData('bmc'),
          "proteinContent" : HigiKioskStorageService.returnSessionData('Protein'),
          "mineralContent" : HigiKioskStorageService.returnSessionData('Mineral'),
          "waistToHipRatio" : HigiKioskStorageService.returnSessionData('whpr'),
          "waistToHeightRatio" : HigiKioskStorageService.returnSessionData('whtr'),
          "basalMetabolicRate" : HigiKioskStorageService.returnSessionData('BMR'),
          "visceralFat" : HigiKioskStorageService.returnSessionData('VF'),
          "roomTemperature":HigiKioskStorageService.returnSessionData('roomTemperature'),
          "bodyTemperature" : HigiKioskStorageService.returnSessionData("temperaturFarrant"),
          "PRInterval" : HigiKioskStorageService.returnSessionData('PRInterval'),
          "QRSInterval" : HigiKioskStorageService.returnSessionData('QRSDuration'),
          "QTCInterval" : HigiKioskStorageService.returnSessionData('QTCInterval'),
          //"heartRate" : HigiKioskStorageService.returnSessionData("HeartRate"),
          "glucose_random" : HigiKioskStorageService.returnSessionData('glucose_random'),
          "glucose_fasting" :HigiKioskStorageService.returnSessionData('glucose_fasting'),
          "glucose_post_prandial" :HigiKioskStorageService.returnSessionData('glucose_post_prandial'),
          "hemoglobin" : HigiKioskStorageService.returnSessionData('heamoglobin'),
          "lipid_profile_tc" : HigiKioskStorageService.returnSessionData('lipid_profile_tc'),
          "lipid_profile_hg" : HigiKioskStorageService.returnSessionData('lipid_profile_hg'),
          "lipid_profile_ldl" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl'),
          "lipid_profile_tg" : HigiKioskStorageService.returnSessionData('lipid_profile_tg'),
          "urine_leukocytes" : HigiKioskStorageService.returnSessionData('urine_leukocytes'),
          "urine_nitrite" : HigiKioskStorageService.returnSessionData('urine_nitrite'),
          "urine_urobilinogen" : HigiKioskStorageService.returnSessionData('urine_urobilinogen'),
          "urine_protein" : HigiKioskStorageService.returnSessionData('urine_protein'),
          "urine_ph" : HigiKioskStorageService.returnSessionData('urine_ph'),
          "urine_blood" : HigiKioskStorageService.returnSessionData('urine_blood'),
          "urine_specific_gravity" : HigiKioskStorageService.returnSessionData('urine_specific_gravity'),
          "urine_ketone" : HigiKioskStorageService.returnSessionData('urine_ketone'),
          "urine_bilirubin" : HigiKioskStorageService.returnSessionData('urine_bilirubin'),
          "urine_glucose" : HigiKioskStorageService.returnSessionData('urine_glucose '),
          "dengue_IgG" : HigiKioskStorageService.returnSessionData('dengue_IgG'),
          "dengue_IgM" : HigiKioskStorageService.returnSessionData('dengue_IgM'),
          "malaria_p_v" : HigiKioskStorageService.returnSessionData('malaria_p_v'),
          "malaria_p_f" : HigiKioskStorageService.returnSessionData('malaria_p_f'),
          "hiv_I" : HigiKioskStorageService.returnSessionData('hiv_I'),
          "hiv_II" : HigiKioskStorageService.returnSessionData('hiv_II'),
          "hcv" : HigiKioskStorageService.returnSessionData('hcv'),
          "troponin" : HigiKioskStorageService.returnSessionData('troponin'),
          "syphilis" : HigiKioskStorageService.returnSessionData('syphilis'),
          "pregnancy" : HigiKioskStorageService.returnSessionData('pregnancy')
        }

        // if($rootScope.selectedVital.length > 0){ // commented To avoid checkin Api called in teleconsultation flow alone.
          // If any vitals selected
          $scope.userTestTaken = Object.values(jsonObjAllTest).every((k) => k === undefined);
          // console.log($scope.userTestTaken);
        // }


        // if ($rootScope.previousUrl != "finish/forward") {
            $scope.checkinData = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
            console.log($scope.checkinData);

            //  check and update the service provided to user if kiosk with payment mode.
            if ($rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0 && ($rootScope.isAllServicesProvidedToUser == false || $rootScope.isVitalTestCompleted)) {
              $scope.checkAndUpdateServiceProvidedToUser();
            };
            
            if (HigiKioskStorageService.returnSessionData("HeartRate") != undefined || HigiKioskStorageService.returnSessionData("oxygen") != undefined || HigiKioskStorageService.returnSessionData('weight') != undefined || HigiKioskStorageService.returnSessionData('diastolic') != undefined || HigiKioskStorageService.returnSessionData("temperaturFarrant") != undefined || HigiKioskStorageService.returnSessionData('bmc') != undefined || HigiKioskStorageService.returnSessionData('fatRatio') != undefined || HigiKioskStorageService.returnSessionData('dengue_IgG') != undefined || HigiKioskStorageService.returnSessionData('malaria_p_v') != undefined || HigiKioskStorageService.returnSessionData('hiv_I') != undefined || HigiKioskStorageService.returnSessionData('hcv') != undefined || HigiKioskStorageService.returnSessionData('troponin') != undefined || HigiKioskStorageService.returnSessionData('syphilis') != undefined || HigiKioskStorageService.returnSessionData('pregnancy') != undefined || HigiKioskStorageService.returnSessionData('heamoglobin') != undefined || HigiKioskStorageService.returnSessionData('lipid_profile_tc') != undefined || HigiKioskStorageService.returnSessionData('urine_leukocytes') != undefined) {
                // console.log($rootScope._isAllServicesProvidedToUser);
                // console.log($rootScope.paymentMode);

                // Check for payment method and return if no payment
                $scope.paymentIdentMethod();
            } else if(HigiKioskStorageService.returnSessionData("HeartRate") == undefined || HigiKioskStorageService.returnSessionData("oxygen") == undefined || HigiKioskStorageService.returnSessionData('weight') == undefined || HigiKioskStorageService.returnSessionData('diastolic') == undefined || HigiKioskStorageService.returnSessionData("temperaturFarrant") == undefined || HigiKioskStorageService.returnSessionData('bmc') == undefined || HigiKioskStorageService.returnSessionData('fatRatio') == undefined || HigiKioskStorageService.returnSessionData('dengue_IgG') == undefined || HigiKioskStorageService.returnSessionData('malaria_p_v') == undefined || HigiKioskStorageService.returnSessionData('hiv_I') == undefined || HigiKioskStorageService.returnSessionData('hcv') == undefined || HigiKioskStorageService.returnSessionData('troponin') == undefined || HigiKioskStorageService.returnSessionData('syphilis') == undefined || HigiKioskStorageService.returnSessionData('pregnancy') == undefined || HigiKioskStorageService.returnSessionData('heamoglobin') == undefined || HigiKioskStorageService.returnSessionData('lipid_profile_tc') == undefined || HigiKioskStorageService.returnSessionData('urine_leukocytes') == undefined && $rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
                //Reload after 5 seconds
                $scope.noDataForCheckin = true;
                $scope.paymentIdentMethod();
            } else {
              //Reload after 5 seconds
              $scope.showSandClock = false;
              $scope.isRefund = false;
              $timeout(function(){
                  window.location = 'index.html'
              }, 5000);
          }
        // }
    });

    // identify the payment method and initiate refund
    $scope.paymentIdentMethod = async function() {
      let loggedIn = HigiKioskStorageService.returnSessionData('logged_in');
      if (loggedIn){
        if($scope._isAllServicesProvidedToUser != undefined && !$scope._isAllServicesProvidedToUser && ($rootScope.paymentMode == 'card' || $rootScope.paymentMode == 'UPI')){
          let response = await ($scope.callRefundApi());
          console.log(response);
          if(response.status == "refund initiated" || response.status == "cancel_success"){
            //alert("condition satisfies");
            $scope.showSandClock = false;
            $scope.isRefund = true;
          } else {
            // if refund not initated or any error recived from server.. we write the log file for this api.(future refernece)
            $scope.showSandClock = false;
            $scope.isRefund = false;
            $scope.registerUser($scope.checkinData, HigiKioskStorageService.returnSessionData('user').email);
          }
        }else{
          $scope.showSandClock = false;
          $scope.isRefund = false;
          $scope.registerUser($scope.checkinData, HigiKioskStorageService.returnSessionData('user').email);
        }
      }else{
        if($scope._isAllServicesProvidedToUser != undefined && !$scope._isAllServicesProvidedToUser && ($rootScope.paymentMode == 'card' || $rootScope.paymentMode == 'UPI')){
          let response = await ($scope.callRefundApi());
          console.log(response);
          if(response.status == "refund initiated" || response.status == "cancel_success"){
            $scope.showSandClock = false;
            $scope.isRefund = true;
          }
        }else{
          $scope.showSandClock = false;
          $scope.isRefund = false;
          $scope.guestUser($scope.checkinData);
        }
      }
    }

    // close modal popup for refund initiated 
    $scope.amountRefundOk = function(){
      $scope.showSandClock = false;
      $scope.isRefund = false;
      if($scope.noDataForCheckin){
        $scope.showSandClock = false;
        $scope.isRefund = false;
        $timeout(function(){
          window.location = 'index.html'
        }, 2000);
      } else if(HigiKioskStorageService.returnSessionData('logged_in')){
        $timeout(function() {
          $scope.registerUser($scope.checkinData, HigiKioskStorageService.returnSessionData('user').email);
        }, 1000);
      } else{
        $timeout(function() {
          $scope.guestUser($scope.checkinData);
        }, 1000);
      }
    }

    // refund initiate api
    $scope.callRefundApi = function(){
      return new Promise((resolve, reject) => {
        let response = '';
        let json = {
          "transaction_id" : $rootScope.paymentTransactionIdValue,
          "invoice_number": "",
          "canceled_by": "user",
          "reason": "Test not taken"
        }

        $.ajax({
          url: getSettingsValue('kiosk.api.url') +"/consult/kisok_cancel_refund",
          type : "POST", 
          data: JSON.stringify(json),
          contentType: 'application/json; charset=UTF-8',
          success: function(resp){
            console.log(resp);
            response = resp;
            resolve(response);
          },
          error : function(error) { 
            console.log(error);
            response = "error";
            resolve(response);
          } 
        });
      });
    }

    $scope.registerUser = async function(checkInData, email) {
      if($scope.userTestTaken){ //user not taken any test
        console.log("inisde if")
        $scope.navigateToHomePage();
        return 0;
      }

      let checkInObj =  {
        'higiCheckin' :checkInData,
      }

      /* NON-INVASIVE AND ECG */
      if (!HigiKioskUtilitiesService.checkNonInvasiveTestResult()) {
        let nonInvasiveRes = await ($rootScope.initFinishPageVitalTest('non-invasive'));
        if (nonInvasiveRes.hasOwnProperty('base64'))
          checkInObj['vital_email_attachment'] = nonInvasiveRes['base64'];
      }
      
      /* INVASIVE */
      
      if (!HigiKioskUtilitiesService.checkInvasiveTestResult()) {
        let invasiveRes = await ($rootScope.initFinishPageVitalTest('invasive'));
        if (invasiveRes.hasOwnProperty('base64'))
          checkInObj['ecg_email_attachment'] = invasiveRes['base64'];
      }
      
      console.log(checkInObj);
      
      HigiApiService.CreateCheckInGameAsync(HigiKioskStorageService.returnSessionData('user').id, checkInObj, email,
        //Success
        function(resp) {
          $scope.navigateToHomePage();
        },
        //Failure
        function(e) {
          $scope.navigateToHomePage();
        }
      );
    }

    $scope.guestUser = function(checkInData) {
      console.log(checkInData);
      if($scope.userTestTaken){ //user not taken any test
        console.log("inisde if")
        $scope.navigateToHomePage();
        return 0;
      }
      HigiApiService.CreateCheckInGameAsyncGuest(checkInData,
        //Success
        function(resp) {
          $scope.navigateToHomePage();
        },
        //Failure
        function(e) {
          const currentTime = new Date().toISOString();
          console.log(currentTime);

          checkInData.status = "Failure";
          checkInData.dateTime = currentTime;
          checkInData.file_name = $rootScope.uniqueKioskId;

          const parameters = [checkInData];
          HigiApiService.save_parameters(parameters,
            //Success
            function(resp) {
              console.log(resp)
              console.log("Parameters are saved")
              $scope.navigateToHomePage();
            },
            //Failure
            function(e) {
              console.log("Parameters are not saved")
              $scope.navigateToHomePage();
            }
          )
          $scope.navigateToHomePage();
        }
      );
    }

    $scope.checkAndUpdateServiceProvidedToUser = function() {
        
        let ecgValues = [
          HigiKioskStorageService.returnSessionData('ECGStatus')
        ];
    
        let halfBodyBMCValues = [
          HigiKioskStorageService.returnSessionData('fatRatio')
        ];
    
        let fullBodyBMCValues = [
          HigiKioskStorageService.returnSessionData('bmc'),
          HigiKioskStorageService.returnSessionData('Protein'),
          HigiKioskStorageService.returnSessionData('ECW'),
          HigiKioskStorageService.returnSessionData('ICW'),
          HigiKioskStorageService.returnSessionData('Mineral'),
          HigiKioskStorageService.returnSessionData('SMM'),
          HigiKioskStorageService.returnSessionData('BCM'),
          HigiKioskStorageService.returnSessionData('Fat'),
          HigiKioskStorageService.returnSessionData('whpr'),
          HigiKioskStorageService.returnSessionData('whtr'),
          HigiKioskStorageService.returnSessionData('PBF'),
          HigiKioskStorageService.returnSessionData('VF'),
          HigiKioskStorageService.returnSessionData('BMR')
        ];
    
        let weightValues = [
          HigiKioskStorageService.returnSessionData('weight')
        ];
    
        let bpValues = [
          HigiKioskStorageService.returnSessionData('bpStatus')
        ];
    
        let spo2Values = [
          HigiKioskStorageService.returnSessionData("oxygen")
        ];
    
        let tempValues = [
          HigiKioskStorageService.returnSessionData("temperaturFarrant")
        ];
    
        //By default set to full body bmc test.
        let bmcHardWareName = "FullBodyCompositionAnalyser";
        let bmcServiceName = "bmc_full";
        let bmcServiceValues = fullBodyBMCValues
    
        //declare the necessary variable as half body bmc if fatio present.
        if (HigiKioskStorageService.returnSessionData('fatRatio') != undefined || $rootScope.hardwareAvailability["Body Composition"] == true) {
          bmcHardWareName = "Body Composition";
          bmcServiceName = "bmc";
          bmcServiceValues = halfBodyBMCValues;
        }
    
        let modulesConfigObj = [
          {hardware: 'ECG', mode: 'ekg', serviceProvideName: "ecg", serviceProvideValues: ecgValues, _isServiceProvided: false},
          {hardware: bmcHardWareName, mode: 'bmc', serviceProvideName: bmcServiceName, serviceProvideValues: bmcServiceValues, _isServiceProvided: false},
          {hardware: 'Weight Scale', mode: 'w', serviceProvideName: "weight", serviceProvideValues: weightValues, _isServiceProvided: false},
          {hardware: 'Blood Pressure', mode: 'bp', serviceProvideName: "bp", serviceProvideValues: bpValues, _isServiceProvided: false},
          {hardware: 'SPo2', mode: 'spo2', serviceProvideName: "spo2", serviceProvideValues: spo2Values, _isServiceProvided: false},
          {hardware: 'temp', mode: 'temp', serviceProvideName: "temperature", serviceProvideValues: tempValues, _isServiceProvided: false}
        ];
    
        let servicesTOProvide = [];
    
        //Contains the all the services either true or false.
        let userPaidServices = $rootScope.userPaidServices;
    
        //1)Fetching only the service to provide to user.
        for(let key in userPaidServices){
          if (key != 'service_provided' && key != 'invoice_id') {
            if (userPaidServices[key] == true) {
              servicesTOProvide.push(key);
            }
          }
        }
        console.log(servicesTOProvide);
    
        //2)Filter the service from modulesConfigObj which must be provide to user. 
        if (servicesTOProvide.length > 0) {
          let filteredServicesToProvide = modulesConfigObj.filter(obj => servicesTOProvide.includes(obj.serviceProvideName));
          console.log(filteredServicesToProvide);
    
          //3)Checking  the return session values for a providing services are present are not. And changing values to true if service provided.
          if (filteredServicesToProvide != undefined && filteredServicesToProvide.length > 0) {
            let changeServiceProvidedStatus = filteredServicesToProvide.map(item => {
              let isProvided = item.serviceProvideValues.every(element => {
                 return (element != undefined && element != null);
              });
    
              item['_isServiceProvided'] = isProvided;
    
              return item;
            });
    
            console.log(changeServiceProvidedStatus);
    
            //4)Checking all services are provided or not.
            $scope._isAllServicesProvidedToUser = changeServiceProvidedStatus.every(element => {
              return element['_isServiceProvided'] == true;
            });
    
            console.log("_isAllServicesProvidedToUser "+ $scope._isAllServicesProvidedToUser);
    
            //5)calling the service provider api if only all services are true.
            if ($scope._isAllServicesProvidedToUser != undefined && $scope._isAllServicesProvidedToUser == true) {
              //alert($rootScope.userPaidServices["invoice_id"]);
              let uniqueInvoiceNumber = $rootScope.userPaidServices["invoice_id"].toString();
              if (uniqueInvoiceNumber == undefined ) {
                uniqueInvoiceNumber ="";
              }
              
              HigiApiService.storeUserPaidServiceAsProvided(uniqueInvoiceNumber, function (resp) {
                console.log(resp);
                if (resp == "stored") {
                  $rootScope.isAllServicesProvidedToUser = true;
                  $rootScope.isVitalTestCompleted = true;
                }
              },
              //Failure
              function(e) {
                //Reload after 5 seconds
                $scope.showSandClock = false;
                $scope.isRefund = false;
                $timeout(function() {
                  window.location = 'index.html'
                }, 5000);
              });
            }else{
              return;
            }
          }else{
            return;
          }
        }else{
          return;
        }
    }

    $scope.navigateToHomePage = function() {
        $timeout(function(){
            window.location = 'index.html'
        }, 2000);
    }

    // /* REGISTERED USER EMAIL ATTACHMENT WITH BASE64 START */

    // $scope.vitalSharedData = {};

    // $scope.initFinishPageVitalTest = function(vitalType) {
    //   $scope.initFinishPageDietRecommendation('vital', true, vitalType); // vitalType - invasive, non-invasive
    //   return new Promise((resolve, reject) => {
    //     const intervalId = setInterval(() => {
    //       if ($scope.checkVitalSharedData()) {
    //           clearInterval(intervalId);
    //           resolve($scope.vitalSharedData);
    //           $scope.vitalSharedData = {};
    //       }
    //     }, 2000);
    //   });
    // }

    // $scope.checkVitalSharedData = function() {
    //   if (Object.keys($scope.vitalSharedData).length != 0)
    //     return true;
    //   return false;
    // }

    // $scope.initFinishPageDietRecommendation = function(value, purposeForEmail = false, vitalType = 'non-invasive'){
    //   console.log("value : ",value);
    //   let thisGender= HigiKioskStorageService.returnSessionData('gender');
    //   let thisBP = HigiKioskStorageService.returnSessionData('bpStatus');
    //   let thisPulse = HigiKioskStorageService.returnSessionData('pulseStatus');
    //   let thisBmi = HigiKioskStorageService.returnSessionData('bmiStatus');
    //   let thisBmc = HigiKioskStorageService.returnSessionData('bmcRisk');
    //   let thisSpo2 = HigiKioskStorageService.returnSessionData("spo2Status");
    //   let thisTemp = HigiKioskStorageService.returnSessionData("temperaturStatus");
    //   let dataToPrint = value;
  
    //   if(thisGender.toLowerCase() == 'm' || thisGender.toLowerCase() == 'male'){
    //     thisGender = 'male';
    //   }else if(thisGender.toLowerCase() == 'f' || thisGender.toLowerCase() == 'female'){
    //     console.log(thisGender);
    //       thisGender = 'female';
    //   }else{
    //     thisGender = 'male';
    //   };
  
    //   if(thisBP != undefined && thisBP != null){
    //     console.log(thisBP);
    //     if(thisBP.toLowerCase() == 'low'){
    //       thisBP = 'Low';
    //     }else if(thisBP.toLowerCase() == 'normal'){
    //       thisBP = 'Normal';     
    //     }else if(thisBP.toLowerCase() == 'acceptable'){
    //       thisBP = 'Acceptable';
    //     }else if(thisBP.toLowerCase() == 'high'){
    //       thisBP = 'High';
    //     }else{
    //       thisBP = '';
    //     }
    //   }else{
    //     thisBP = '';
    //   };
  
    //   if(thisPulse != undefined && thisPulse != null){
    //     console.log(thisPulse);
    //     if(thisPulse.toLowerCase() == 'high'){
    //       thisPulse = 'High';
    //     }else if(thisPulse.toLowerCase() == 'low'){
    //       thisPulse = 'Low';
    //     }else if(thisPulse.toLowerCase() == 'normal'){
    //       thisPulse = 'Normal';
    //     }else if(thisPulse.toLowerCase() == 'check with healthcare provider'){
    //       thisPulse = 'Check with Healthcare Provider';
    //     }else{
    //       thisPulse = '';
    //     }
    //   }else{
    //     thisPulse = '';
    //   };
  
    //   if(thisBmi != undefined && thisBmi != null){
    //     console.log(thisBmi);
    //     if(thisBmi.toLowerCase() == 'underweight'){
    //       thisBmi = 'Under weight';
    //     }else if(thisBmi.toLowerCase() == 'normal'){
    //       thisBmi = 'Normal';
    //     }else if(thisBmi.toLowerCase() == 'overweight'){
    //       thisBmi = 'Over weight';
    //     }else if(thisBmi.toLowerCase() == 'obese'){
    //       thisBmi = 'Obese';
    //     }else{
    //       thisBmi = '';
    //     }
    //   }else{
    //     thisBmi = '';
    //   };
  
    //   if(thisBmc != undefined && thisBmc != null){
    //     console.log(thisBmc);
    //     if(thisBmc.toLowerCase() == 'at-risk' || thisBmc.toLowerCase() == 'high' || thisBmc.toLowerCase() == 'atrisk'){
    //       thisBmc = 'High';
    //     }else if(thisBmc.toLowerCase() == 'acceptable'){
    //       thisBmc = 'Acceptable';
    //     }else if(thisBmc.toLowerCase() == 'healthy'){
    //       thisBmc = 'Normal';
    //     }else if(thisBmc.toLowerCase() == 'low'){
    //       thisBmc = 'Low';
    //     }else{
    //       thisBmc = '';
    //     }
    //   }else{
    //     thisBmc = '';
    //   };
        
    //   if(thisSpo2 != undefined && thisSpo2 != null){
    //     console.log(thisSpo2);
    //     if(thisSpo2.toLowerCase() == 'low'){
    //       thisSpo2 = 'Low';
    //     }else if(thisSpo2.toLowerCase() == 'at-risk' || thisSpo2.toLowerCase() == 'atrisk'){
    //       thisSpo2 = 'At-risk';
    //     }else if(thisSpo2.toLowerCase() == 'acceptable'){
    //       thisSpo2 = 'Acceptable';
    //     }else if(thisSpo2.toLowerCase() == 'healthy'){
    //       thisSpo2 = 'Healthy';
    //     }else if(thisSpo2.toLowerCase() == 'check with healthcare provider'){
    //       thisSpo2 = 'Check With Healthcare Provider';
    //     }else{
    //       thisSpo2 = '';
    //     }
    //   }else{
    //     thisSpo2 = '';
    //   };
  
    //   if(thisTemp != undefined && thisTemp != null){
    //     console.log(thisTemp);
    //     if(thisTemp.toLowerCase() == 'normal'){
    //       thisTemp = 'Normal';
    //     }else if(thisTemp.toLowerCase() == 'acceptable'){
    //       thisTemp = 'Acceptable'; 
    //     }else if(thisTemp.toLowerCase() == 'fever'){
    //       thisTemp = 'Fever'; 
    //     }else if(thisTemp.toLowerCase() == 'high fever'){
    //       thisTemp = 'High Fever'; 
    //     }else if(thisTemp.toLowerCase() == 'low'){
    //       thisTemp = 'Low'; 
    //     }else{
    //       thisTemp = '';
    //     }
    //   }else{
    //     thisTemp = '';
    //   };
    //   let printChildContants =  new PrintChildContants().suitableDietRecommendFilter(thisGender, thisBP, thisPulse, thisBmi, thisBmc, thisSpo2, thisTemp)
    //   .then(res => {
    //     console.log(res);
    //     let dietRecommend = res;
    //     $scope.finishPageVitalDataCollection(dataToPrint, dietRecommend, purposeForEmail, vitalType);
    //   });
    // };

    // $scope.finishPageVitalDataCollection = function(dataToPrint, dietRecommend, purposeForEmail, vitalType) {
    //   console.log("check log");
    //   console.log(dataToPrint,dietRecommend);
    //   //User Basic Details.
    //   let basicDetails = {
    //     "userFirstName" : $rootScope.user?.firstName || "Guest User",
    //     "userLastName" : $rootScope.user?.lastName || "",
    //     "userHeight" : HigiKioskStorageService.returnSessionData('height'),
    //     "userGender" : HigiKioskStorageService.returnSessionData('gender'),
    //     "userAge" : HigiKioskStorageService.returnSessionData('birthdate'),
    //     "userEmail" : HigiKioskStorageService.returnSessionData('email'),
    //     "userMobileNumber" : $rootScope.user?.mobileNumber || HigiKioskStorageService.returnSessionData('updatedMobileNumber') || "N/A",
    //     "date" : new Date(),
    //     "printLogo" : $rootScope.printTemplateLogo
    //   };
  
    //   //User Basic Vital Details.
    //   let basicVitalDetails = {
    //     "weight" : HigiKioskStorageService.returnSessionData('weight'),
    //     "systolic" : HigiKioskStorageService.returnSessionData('systolic'),
    //     "diastolic" : HigiKioskStorageService.returnSessionData('diastolic'),
    //     "pulse" : HigiKioskStorageService.returnSessionData('pulse'),
    //     "oxygenLevel" : HigiKioskStorageService.returnSessionData("oxygen"),
    //     "bodyTemperature" : HigiKioskStorageService.returnSessionData("temperaturFarrant"),
    //     "fatPercent" : HigiKioskStorageService.returnSessionData('fatRatio')
    //   };
  
    //   //User Full Body BMC Vital Details.
    //   let fullBodyBMCDetails = {
    //     "intraCellularWater" : HigiKioskStorageService.returnSessionData('ICW'),
    //     "extraCellularWater" : HigiKioskStorageService.returnSessionData('ECW'),
    //     "bodyFatMass" : HigiKioskStorageService.returnSessionData('Fat'),
    //     "percentBodyFat" : HigiKioskStorageService.returnSessionData('PBF'),
    //     "skeletalMuscleMass" : HigiKioskStorageService.returnSessionData('SMM'),
    //     "bodyCellMass" : HigiKioskStorageService.returnSessionData('BCM'),
    //     "boneMineralContent" : HigiKioskStorageService.returnSessionData('bmc'),
    //     "proteinContent" : HigiKioskStorageService.returnSessionData('Protein'),
    //     "mineralContent" : HigiKioskStorageService.returnSessionData('Mineral'),
    //     "waistToHipRatio" : HigiKioskStorageService.returnSessionData('whpr'),
    //     "waistToHeightRatio" : HigiKioskStorageService.returnSessionData('whtr'),
    //     "basalMetabolicRate" : HigiKioskStorageService.returnSessionData('BMR'),
    //     "visceralFat" : HigiKioskStorageService.returnSessionData('VF')
    //   };
  
    //   // User Invasive Parameter Details.
    //   let invasiveTestResults = {
    //     "glucose_random" : HigiKioskStorageService.returnSessionData('glucose_random'),
    //     "glucose_fasting" :HigiKioskStorageService.returnSessionData('glucose_fasting'),
    //     "glucose_post_prandial" :HigiKioskStorageService.returnSessionData('glucose_post_prandial'),
    //     "hemoglobin" : HigiKioskStorageService.returnSessionData('heamoglobin'),
    //     "lipid_profile_tc" : HigiKioskStorageService.returnSessionData('lipid_profile_tc'),
    //     "lipid_profile_hg" : HigiKioskStorageService.returnSessionData('lipid_profile_hg'),
    //     "lipid_profile_ldl" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl'),
    //     "lipid_profile_tg" : HigiKioskStorageService.returnSessionData('lipid_profile_tg'),
    //     "urine_leukocytes" : HigiKioskStorageService.returnSessionData('urine_leukocytes'),
    //     "urine_nitrite" : HigiKioskStorageService.returnSessionData('urine_nitrite'),
    //     "urine_urobilinogen" : HigiKioskStorageService.returnSessionData('urine_urobilinogen'),
    //     "urine_protein" : HigiKioskStorageService.returnSessionData('urine_protein'),
    //     "urine_ph" : HigiKioskStorageService.returnSessionData('urine_ph'),
    //     "urine_blood" : HigiKioskStorageService.returnSessionData('urine_blood'),
    //     "urine_specific_gravity" : HigiKioskStorageService.returnSessionData('urine_specific_gravity'),
    //     "urine_ketone" : HigiKioskStorageService.returnSessionData('urine_ketone'),
    //     "urine_bilirubin" : HigiKioskStorageService.returnSessionData('urine_bilirubin'),
    //     "urine_glucose" : HigiKioskStorageService.returnSessionData('urine_glucose'),
    //     "dengue_IgG" : HigiKioskStorageService.returnSessionData('dengue_IgG'),
    //     "dengue_IgM" : HigiKioskStorageService.returnSessionData('dengue_IgM'),
    //     "malaria_p_v" : HigiKioskStorageService.returnSessionData('malaria_p_v'),
    //     "malaria_p_f" : HigiKioskStorageService.returnSessionData('malaria_p_f'),
    //     "hiv_I" : HigiKioskStorageService.returnSessionData('hiv_I'),
    //     "hiv_II" : HigiKioskStorageService.returnSessionData('hiv_II'),
    //     "hcv" : HigiKioskStorageService.returnSessionData('hcv'),
    //     "troponin" : HigiKioskStorageService.returnSessionData('troponin'),
    //     "syphilis" : HigiKioskStorageService.returnSessionData('syphilis'),
    //     "pregnancy" : HigiKioskStorageService.returnSessionData('pregnancy')
    //   }

    //   //User ECG Common Vital Details.
    //   let ecgCommonDetails = {
    //     "PRInterval" : HigiKioskStorageService.returnSessionData('PRInterval'),
    //     "QRSInterval" : HigiKioskStorageService.returnSessionData('QRSDuration'),
    //     "QTCInterval" : HigiKioskStorageService.returnSessionData('QTCInterval'),
    //     "heartRate" : HigiKioskStorageService.returnSessionData("HeartRate")
    //   };

    //   //User ECG Three Lead Details.
    //   let ecgThreeLeadDetails = {
    //     "threeLead1GraphImage" : HigiKioskStorageService.returnSessionData('ThreeLeadECGLeadOneGraphPrint'),
    //     "threeLead2GraphImage" : HigiKioskStorageService.returnSessionData('ThreeLeadECGLeadTwoGraphPrint'),
    //     "threeLead3GraphImage" : HigiKioskStorageService.returnSessionData('ThreeLeadECGLeadThreeGraphPrint')
    //   };

    //   //User ECG Six Lead Details.
    //   let ecgSixLeadDetails = {
    //     "sixLead1GraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadOneGraphPrint'),
    //     "sixLead2GraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadTwoGraphPrint'),
    //     "sixLead3GraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadThreeGraphPrint'),
    //     "sixLeadAVRGraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadFourGraphPrint'),
    //     "sixLeadAVLGraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadFiveGraphPrint'),
    //     "sixLeadAVFGraphImage" : HigiKioskStorageService.returnSessionData('SixLeadECGLeadSixGraphPrint')
    //   };

    //   //User Diet Recommendation Details.
    //   let dietRecommendationDetails = {
    //     "dietPlan" : dietRecommend
    //   };

    //   let vitalDynamicScalBar = {
    //     "Spo2_Reference_Value" : HigiKioskUtilitiesService.Spo2_Reference_Value(),
    //     "BMI_Reference_Value" : HigiKioskUtilitiesService.BMI_Reference_Value(),
    //     "Body_Temperature_Reference_Value" : HigiKioskUtilitiesService.Body_Temperature_Reference_Value(),
    //     "Systolic_Reference_Value" : HigiKioskUtilitiesService.Systolic_Reference_Value(),
    //     "Diastolic_Reference_Value" : HigiKioskUtilitiesService.Diastolic_Reference_Value(),
    //     "Pulse_Reference_Value" : HigiKioskUtilitiesService.Pulse_Reference_Value(),
    //     "Percent_Body_Fat_Reference_Value" : HigiKioskUtilitiesService.Percent_Body_Fat_Reference_Value(),
    //     "Skeletal_Muscle_Mass_Reference_Value" : HigiKioskUtilitiesService.Skeletal_Muscle_Mass_Reference_Value(),
    //     "Body_Fat_Mass_Reference_Value" : HigiKioskUtilitiesService.Body_Fat_Mass_Reference_Value(),
    //     "Intra_Cellular_Water_Reference_Value" : HigiKioskUtilitiesService.Intra_Cellular_Water_Reference_Value(),
    //     "Extra_Cellular_Water_Reference_Value" : HigiKioskUtilitiesService.Extra_Cellular_Water_Reference_Value(),
    //     "Protein_Content_Reference_Value" : HigiKioskUtilitiesService.Protein_Content_Reference_Value(),
    //     "Minerals_Content_Reference_Value" : HigiKioskUtilitiesService.Minerals_Content_Reference_Value(),
    //     "Body_Cell_Mass_Reference_Value" : HigiKioskUtilitiesService.Body_Cell_Mass_Reference_Value(),
    //     "Bone_Mineral_Content_Reference_Value" : HigiKioskUtilitiesService.Bone_Mineral_Content_Reference_Value(),
    //     "Waist_to_Height_Ratio_Reference_Value" : HigiKioskUtilitiesService.Waist_to_Height_Ratio_Reference_Value(),
    //     "Waist_to_Hip_Ratio_Reference_Value" : HigiKioskUtilitiesService.Waist_to_Hip_Ratio_Reference_Value(),
    //     "Visceral_Fat_Reference_Value" : HigiKioskUtilitiesService.Visceral_Fat_Reference_Value(),
    //     "Random_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.Random_Blood_Glucose_Reference_Value(),
    //     "Fasting_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.Fasting_Blood_Glucose_Reference_Value(),
    //     "PostPrandial_Blood_Glucose_Reference_Value" : HigiKioskUtilitiesService.PostPrandial_Blood_Glucose_Reference_Value(),
    //     "Heamoglobin_Reference_Value" : HigiKioskUtilitiesService.Heamoglobin_Reference_Value(),
    //     "TotalCholestrolReferenceValues" : HigiKioskUtilitiesService.TotalCholestrolReferenceValues(),
    //     "HDLCholestrolReferenceValues" : HigiKioskUtilitiesService.HDLCholestrolReferenceValues(),
    //     "LDLCholestrolReferenceValues" : HigiKioskUtilitiesService.LDLCholestrolReferenceValues(),
    //     "TriglyceridesReferenceValues" : HigiKioskUtilitiesService.TriglyceridesReferenceValues(),
    //   };

    //   let invasiveTestStatus = {
    //     "glucose_random_class" : HigiKioskStorageService.returnSessionData('glucose_random_class'),
    //     "glucose_fasting_class" : HigiKioskStorageService.returnSessionData('glucose_fasting_class'),
    //     "glucose_post_prandial_class" : HigiKioskStorageService.returnSessionData('glucose_post_prandial_class'),
    //     "heamoglobin_class" : HigiKioskStorageService.returnSessionData('heamoglobin_class'),
    //     "lipid_profile_tc_class" : HigiKioskStorageService.returnSessionData('lipid_profile_tc_class'),
    //     "lipid_profile_hgl_class" : HigiKioskStorageService.returnSessionData('lipid_profile_hg_class'),
    //     "lipid_profile_ldl_class" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl_class'),
    //     "lipid_profile_tg_class" : HigiKioskStorageService.returnSessionData('lipid_profile_tg_class'),
    //   }

    //   function OverAllPrintDetails(){
    //     this.basicDetails = basicDetails;
    //     this.basicVitalDetails = basicVitalDetails;
    //     this.fullBodyBMCDetails = fullBodyBMCDetails;
    //     this.ecgCommonDetails = ecgCommonDetails;
    //     this.ecgThreeLeadDetails = ecgThreeLeadDetails;
    //     this.ecgSixLeadDetails = ecgSixLeadDetails;
    //     this.dietRecommendationDetails = dietRecommendationDetails.dietPlan;
    //     this.invasiveTestResults = invasiveTestResults;
    //     this.vitalDynamicScalBar = vitalDynamicScalBar;
    //     this.invasiveTestStatus = invasiveTestStatus;
    //   };

    //   $rootScope.printConstants =  new PrintConstants("vitals", new OverAllPrintDetails());
    // // console.log(" 1 = " + $rootScope.printConstants);
    // setTimeout(()=>{
    //   $rootScope.printerService.getMultiPrinterConfigurationDetails("vitalOrPrescription", //invoice
    //     (response) =>{//thermal, a4, //multiPrinter --> if both available.

    //   // New A4 Template
    //   let a4_templateId = document.getElementById("VitalsA4TemplateV2").innerHTML;
    //   let a4_invasive_templateId = document.getElementById("A4TemplateForInvasiveParametersForExternalPrinters").innerHTML;
    //   // console.log("NewA4_templateIdMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM",a4_templateId);
    //   //Old Thermal Printout
    //   // let thermalTemplateId = document.getElementById("healthVitalsPrintTemplateForThermalPrintPaper").innerHTML;
    //       // console.log("OldthermalTemplateIdMMMMMMMMMMMMMMMMMMMM", thermalTemplateId);
    //   // New Thermal Printout
    //   let thermalTemplateId = document.getElementById("healthVitalsPrintNewTemplateForThermalPrintPaper").innerHTML;
    //         // console.log("NewthermalTemplateIdMMMMMMMMMMMMMMMMMMMM", thermalTemplateId);
    //         let thermalEcgTemplateId = document.getElementById("ecgPrintTemplateForThermalPrintPaper").innerHTML;
    //         // console.log("ECG Thermal Printout", thermalEcgTemplateId);
    //         let invasivetemplateId = document.getElementById("invasiveTemplateForThermalPrintPaper").innerHTML;
    //         // console.log("Invasive Thermal Template", invasivetemplateId);
    //       // console.log("3 = " + invasivetemplateId);
    //         // let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;margin-top:-40px;box-sizing: border-box;'>"+a4_templateId+"</body></html>";
    //         let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:100%;width:100%;'>"+a4_templateId+"</body></html>"; //margin-left:2px;margin-top:-40px;margin-bottom: -40px;margin-right: -15px;
    //         let a4_invasive_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:100%;width:100%;'>"+a4_invasive_templateId+"</body></html>"; //margin-left:2px;margin-top:-40px;margin-bottom: -40px;margin-right: -15px;
    //         // console.log("a4_html_template : ",a4_html_template);
    //         // console.log("$rootScope.externalPrinterName : ",$rootScope.externalPrinterName);
    //         let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:368px;height:500px;margin-left:13px;margin-top:-40px;box-sizing: border-box;margin-right:10px'>"+thermalTemplateId+"</body></html>";
    //         // console.log("thermal_html_template : ",thermal_html_template);
    //         let thermal_ecg_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;margin-top:-40px;box-sizing: border-box;'>"+thermalEcgTemplateId+"</body></html>";
    //         let invasive_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:368px;height:500px;margin-left:13px;margin-top:-40px;box-sizing: border-box;margin-right:10px'>"+invasivetemplateId+"</body></html>";
    //         // console.log("invasive_html_template : ",invasive_html_template);
    //         //let printInvasiveThermal = true; // variable used for printing invasive thermal printout
    //         let printerTemplateObject = {
    //           thermalPrinterTemplate: "",
    //           a4PrinterTemplate: "",
    //         };
  
    //         if(dataToPrint == "ecg"){
    //           printerTemplateObject['thermalPrinterTemplate'] = thermal_ecg_html_template;
    //           printerTemplateObject['a4PrinterTemplate'] = thermal_ecg_html_template;
    //         }else if(dataToPrint == "invasive" || vitalType == 'invasive'){ /* VITAL TYPE USED FOR EMAIL ATTACHMENT */
    //             // console.log("dataToPrint : ",dataToPrint);
    //             // console.log("Invasive Printout button is Clicked")
    //             printerTemplateObject['thermalPrinterTemplate'] = invasive_html_template;
    //             printerTemplateObject['a4PrinterTemplate'] = a4_invasive_html_template;
    //         }else{ 
    //           // console.log("Non-Invasive Printout button is Clicked")
    //             printerTemplateObject['thermalPrinterTemplate'] = thermal_html_template;
    //             printerTemplateObject['a4PrinterTemplate'] = a4_html_template;
    //         }
    

		//       //*/
    //         /*A4 printer Works starts */
    //         // if($rootScope.externalPrinterName != ''){    
    //         //   console.log("$rootScope.externalPrinterName : ",$rootScope.externalPrinterName);   
    //         //   html_template = a4_html_template;  
    //         //   var externalPrinterName = $rootScope.externalPrinterName; 
    //         //   console.log("$scope.genixA4printRes : ",$scope.genixA4printRes);  
    //         //   JkioskService.genixA4print($scope.genixA4printRes, html_template, externalPrinterName);
    //         // }
    //               /* A4 printer Works ends*/
            
    //       //   ///*worked for multiprinter logic, many challenges faced -->so stops the logic work
    //         if (response == "multiPrinter") {
    //           $rootScope.printerService.printerTemplateObject = printerTemplateObject;
    //           //document.getElementById("kiosk_modal_popup").style.visibility = "hidden";
    //           $('#multiPrinterAvailabilityPopupVisible').show();
    //         }
    //         if($rootScope.externalPrinterName != '' || purposeForEmail){    
    //           console.log("$rootScope.externalPrinterName : ",$rootScope.externalPrinterName);
    //           html_template = a4_html_template;
      
    //           var externalPrinterName = $rootScope.externalPrinterName; 
    //           var element = printerTemplateObject['a4PrinterTemplate'];

    //           var opt = {
    //             margin:       0,
    //             filename:     'myfile.pdf',
    //             image:        { type: 'jpeg', quality: 0.98 },
    //             html2canvas:  { scale: 2 },
    //             // pagebreak:    { mode: 'avoid-all', before: '#page2el' },
    //             // pagebreak: {
    //             //     mode: ['avoid-all', 'css', 'legacy']
    //             // },
    //             jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' } //letter
    //           };

    //           html2pdf().from(element).outputPdf().then(function(pdf) {
    //             var jsonData = {"base64": btoa(pdf)};
    //             console.log(jsonData);
    //             if (purposeForEmail) {
    //               $scope.vitalSharedData = jsonData;
    //               return 0;
    //             }
    //           });
    //         }
    //       },
    //     );
    //   },1500);
    // }

    // /* REGISTERED USER EMAIL ATTACHMENT WITH BASE64 END */
}]);