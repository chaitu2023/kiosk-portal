higiKioskControllers.directive('reasonForVisitModal', ['$http', 'HigiKioskFlow' ,'$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , '$route' , '$interval' , '$sce' , 'fireStore', function($http, HigiKioskFlow, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $route, $interval, $sce, fireStore) {
  return{
    restrict: 'E',
    scope: true,
    templateUrl: 'components/modal/telemedi/ihltelemed/reason-for-visit.html',
    controller :function($scope, $http, $rootScope){
      $scope.reasonForVisit = new Object();

      $scope.reasonForVisit.init = function(){
        $scope.reasonForVisit.title = "reasonForVisit.title";
        $scope.reasonForVisit.mentionReason = "reasonForVisit.mentionReason";
        $scope.reasonForVisit.disclaimer= "reasonForVisit.disclaimer";
        $scope.reasonForVisit.enterReason = "reasonForVisit.enterReason";
        $scope.reasonForVisit.next = "reasonForVisit.next";
        $scope.reasonForVisit.paymentMethodTitle = "reasonForVisit.paymentMethodTitle";
        $scope.reasonForVisit.cardPaymentText = "global.cardPaymentText";
        $scope.reasonForVisit.upiPaymentText = "global.upiPaymentText";
        $scope.reasonForVisit.cashPaymentText = "global.cashPaymentText";
        $scope.reasonForVisit.couponPaymentText = "global.couponPaymentText";
        $scope.reasonForVisit.termsAcceptPaymentText = "global.termsAcceptPaymentText";
        $scope.reasonForVisit.cardDeviceNotFoundText = "global.cardDeviceNotFoundText";
        $scope.reasonForVisit.shareYourHealthVitals = "welcomeModals.shareHealthVitals";
        $scope.reasonForVisit.shareYourMedicalFiles = "welcomeModals.shareMedicalFiles";

        $scope.reasonForVisit.fields = [
          {id : "reasonForVis" , defaultText : $scope.reasonForVisit.enterReason , text : "" , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.reasonForVisit.characterValidation(this)}, focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}
        ];
        $rootScope.fields.reasonForVisit = $scope.reasonForVisit.fields;
        $scope.reasonForVisit.nextBtnActive = "";
        $scope.reasonForVisit.nextBtnActiveHealthVital = "";
        $scope.reasonForVisit.nextBtnActiveMedicalFiles = "";
        $scope.reasonForVisit.paymentMethodenable;
        $scope.reasonForVisit.purposeVisitenable;
        $scope.reasonForVisit.purposeVisitSectionClass = "";
        $scope.paymentDisabled = false;
        $scope.doctorFees = 0;
        $scope.paymentTransactionId = null;
        if ($rootScope.mosambeeHardwareEnable == false) {
          $scope.cardPaymentDisabled = 'card_disabled';
        }else{
          $scope.cardPaymentDisabled = '';
        }
        $scope.reasonForVisit.paymentMethodSectionClass = "";
        $scope.reasonForVisit.showVital = "";
        $scope.reasonForVisit.sendHealthVitalsToDoctor = "";
        $scope.reasonForVisit.togglesendVitalDataToDoctor = false;
        $scope.reasonForVisit.selectedHealthVitals = false;
        $scope.reasonForVisit.selectedMedicalFiles = false;
        $scope.reasonForVisit.medicalFilesShareStatus = true;
        $scope.reasonForVisit.reasonText = false;

        //declare kiosk health Vital sharing variables
        $scope.reasonForVisit.declareKioskHealthVitalSharingVariables();

        //declare kiosk medical document sharing variables
        $scope.reasonForVisit.declareMedicalDocumentsSharingVariables();

        //declare tele-consultation terms & conditions variables
        $scope.reasonForVisit.declareTeleConsultationTermsAndConditionsVariables();
      };

      $scope.reasonForVisit.characterValidation = function(obj){
        //console.log(obj);
        var reasonText = obj.text;
        if (isNaN(reasonText) && reasonText.length >=4) {
          $scope.reasonForVisit.nextBtnActive = "reason_for_visit_next_active_btn";
          $scope.reasonForVisit.reasonText = true;
        }else{
          $scope.reasonForVisit.nextBtnActive = "";
          $scope.reasonForVisit.reasonText = false;
        }
      }

      $scope.reasonForVisit.submitButtonClicked = function(text){
        //console.log(text);
        fireStore.delete($rootScope.user.id, $rootScope.medicalDocUploadCollectionName);
        var reasonText = text;
        if (isNaN(reasonText) && reasonText.length >=4) {
          $rootScope.dataForAppointmentBooking['reasonForVisit'] = reasonText.toString();
          let height = HigiKioskStorageService.returnSessionData('height');
          let dateTime = `/Date(${new Date().getTime()})/`;
          let vital_data = {
            'heightMeters' : Math.round(parseFloat(height)),
            'dateTime': dateTime
          };

          let weightArr = [];
          let lastCheckInWeight = '';

          angular.forEach($rootScope.overAllCheckInData, function(Item) {
            if ("weightKG" in Item && Item['weightKG'] != '')
              weightArr.push(Item['weightKG']);
          });

          if ($scope.reasonForVisit.sendHealthVitalsToDoctor != '' && $scope.reasonForVisit.sendHealthVitalsToDoctor.hasOwnProperty('bmi'))
            $scope.reasonForVisit.sendHealthVitalsToDoctor['bmi'] = Math.round($scope.reasonForVisit.sendHealthVitalsToDoctor['bmi']);

          if (weightArr.length != 0)
            lastCheckInWeight = weightArr[weightArr.length -1];
          
          if (lastCheckInWeight != '')
            vital_data['weight'] = Math.round(lastCheckInWeight);
          else if ("userInputWeightInKG" in $rootScope.UserInfo && $rootScope.UserInfo['userInputWeightInKG'] != undefined && $rootScope.UserInfo['userInputWeightInKG'] != '')
            vital_data['weight'] = $rootScope.UserInfo['userInputWeightInKG'];
          
          //$rootScope.dataForAppointmentBooking['lastCheckIn'] = ($rootScope.pastKioskVitalData)? $rootScope.pastKioskVitalData : vital_data;
          $rootScope.dataForAppointmentBooking['lastCheckIn']=($scope.reasonForVisit.sendHealthVitalsToDoctor)? $scope.reasonForVisit.sendHealthVitalsToDoctor : vital_data;
          $rootScope.reasonForVisitText = reasonText;
          $scope.reasonForVisit.checkFreeAccess()
          .then(() => {
            $scope.reasonForVisit.collectBookingData();
          })
          .catch(() => {
            console.log("Access denied or error");
            $scope.reasonForVisit.collectBookingData();
          });        
        }else{
          console.log("4 characters required");
        }
      }

      $scope.reasonForVisit.enableHealthVitalsShare = function(){
        $scope.reasonForVisit.selectedHealthVitals = !$scope.reasonForVisit.selectedHealthVitals;
        let selectedData = $rootScope.teleconsultationUserSelectedData;
        if(selectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO'){
          console.log('call1');
          $scope.reasonForVisit.showVital = $scope.reasonForVisit.userHealthVitalDataToShare;
          // console.log($scope.reasonForVisit.showVital);
          $scope.reasonForVisit.toggleHealthVitalsSharing();
        }else{
          console.log('call2');
          $scope.fineTunePastKioskVitalData = {}; 
          let filterObject = {};
          const keysToKeep = Object.keys($rootScope.pastKioskVitalData).filter(
            (key)=> {
              if($rootScope.pastKioskVitalData[key] != "Not Available"){
                filterObject[key] = $rootScope.pastKioskVitalData[key]
                //return pastKioskVitalData[key];
              }
          });
          $scope.reasonForVisit.showVital = filterObject;
          // console.log($scope.reasonForVisit.showVital); 
          $scope.reasonForVisit.showVital['heightMeters'] = $rootScope.UserInfo['heightMeters']; //lastcheckin height has not been updated.Handled temporarily soln
          $scope.reasonForVisit.nextBtnActiveHealthVital = "reason_for_visit_next_active_btn";
          $scope.reasonForVisit.showUserHealthVitalDetails();
        }
      }

      $scope.reasonForVisit.sendVitalsToDoctor = function(){
        $scope.reasonForVisit.togglesendVitalDataToDoctor = !$scope.reasonForVisit.togglesendVitalDataToDoctor;
        let snackbar = document.getElementById("snackbar");
        //condition for showing Health Vitals to doctor are shared or not when clicks "share vitals" button
        if($scope.reasonForVisit.togglesendVitalDataToDoctor){
          $scope.reasonForVisit.sendHealthVitalsToDoctor = $scope.reasonForVisit.showVital;
          // console.log($scope.reasonForVisit.sendHealthVitalsToDoctor);
          //setTimeout(function () {
            snackbar.className = "green";
            $rootScope.snackBarAlertText = "Your Vitals are shared ";
          //}, 2000);
          setTimeout(function () {
            snackbar.className = snackbar.className.replace("green", "");
          }, 5000);
        }else{
            //setTimeout(function () {
              snackbar.className = "gray";
              $rootScope.snackBarAlertText = "Your Vitals are not shared";
            //}, 2000);
            setTimeout(function () {
              snackbar.className = snackbar.className.replace("gray", "");
              $rootScope.snackBarAlertText = "";
          }, 5000);
        }
      }
      
      $scope.reasonForVisit.focusReasonForVisitInput = function(defaultMethod){
        if($rootScope.IHLTeleConsultSelected == true && !$rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting){
          if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] == "Fitness Class") {
            $scope.reasonForVisit.paymentMethodenable = true;
            $scope.reasonForVisit.purposeVisitenable = false;
            //angular.element('.payment_method_main_container').addClass('adjust_payment_ui');
            $scope.doctorFees = $rootScope.course_obj['course_fees'];
            $scope.keyboardHide();
          }
          else {
            /*if(angular.element('.payment_method_main_container').hasClass('adjust_payment_ui')) {
              angular.element('.payment_method_main_container').removeClass('adjust_payment_ui');
            }*/
            $rootScope.focusField($scope.reasonForVisit.fields[0]);
            $scope.reasonForVisit.nextBtnActive = "";
            $scope.reasonForVisit.paymentMethodenable = false;
            $scope.reasonForVisit.purposeVisitenable = true;
            $scope.reasonForVisit.purposeVisitSectionClass = "modal-slide-in-left";
            $scope.paymentDisabled = false;
            if ($rootScope.reasonForVisitText != undefined && $rootScope.reasonForVisitText != null && $rootScope.reasonForVisitText.trim().length > 3) {
              $scope.reasonForVisit.purposeVisitenable = false;
              $scope.reasonForVisit.fields[0].text = $rootScope.reasonForVisitText;
              $scope.reasonForVisit.characterValidation($scope.reasonForVisit.fields[0]);
              $scope.reasonForVisit.submitButtonClicked($scope.reasonForVisit.fields[0].text);
            }else{
              $scope.reasonForVisit.declareKioskHealthVitalSharingVariables();
              $scope.reasonForVisit.declareMedicalDocumentsSharingVariables();
              $scope.reasonForVisit.initializeHealthVitalDataSharingOption();
              $scope.reasonForVisit.declareTeleConsultationTermsAndConditionsVariables();
            }
          }
        }

        if ($rootScope.IHLTeleConsultSelected == false && !$rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode == true && $rootScope.kioskVitalTestCost > 0) {
          $scope.reasonForVisit.paymentMethodSectionClass = "";
          $scope.reasonForVisit.purposeVisitSectionClass = "";
          $scope.reasonForVisit.purposeVisitenable = false;
          $scope.reasonForVisit.termsConditionsContainerClass = "";
          $scope.reasonForVisit.termsConditionsContainerEnable = false;
          $scope.reasonForVisit.paymentMethodenable = true;
          $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-in-left";
          //angular.element('.payment_method_main_container').addClass('adjust_payment_ui');
          //alert($rootScope.kioskVitalTestCost);
          $scope.keyboardHide();
        }

        //payment flow for printing vital info
        if ($rootScope.paymentFlowForVitalPrinting && !$rootScope.paymentFlowForPrescriptionPrinting && $rootScope.kioskWithPaymentMode && $rootScope.vitalPrintingCost > 0) {
          $scope.reasonForVisit.purposeVisitSectionClass = "";
          $scope.reasonForVisit.purposeVisitenable = false;
          $scope.reasonForVisit.termsConditionsContainerClass = "";
          $scope.reasonForVisit.termsConditionsContainerEnable = false;
          $scope.reasonForVisit.paymentMethodenable = true;
          $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-in-left";
          $scope.keyboardHide();
        }

        //payment flow for printing pres info
        if ($rootScope.paymentFlowForPrescriptionPrinting && !$rootScope.paymentFlowForVitalPrinting && $rootScope.kioskWithPaymentMode && $rootScope.prescriptionPrintingCost > 0) {
          $scope.reasonForVisit.purposeVisitSectionClass = "";
          $scope.reasonForVisit.purposeVisitenable = false;
          $scope.reasonForVisit.termsConditionsContainerClass = "";
          $scope.reasonForVisit.termsConditionsContainerEnable = false;
          $scope.reasonForVisit.paymentMethodenable = true;
          $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-in-left";
          $scope.keyboardHide();
        }
      }

      $rootScope.reasonForVisitInitScreen = $scope.reasonForVisit.focusReasonForVisitInput;
      
      $scope.reasonForVisit.card_upiPaymentClick = function(pay_type){
        if (pay_type == 'card' && $rootScope.mosambeeHardwareEnable == false) {
          return;
        }
        $rootScope.paymentMobileInit(); // mobile directive initate for text binding
        $rootScope.paymentMode = "";
        $rootScope.paymentMobileTextField = true;
        //$(".keyboard_class_close_btn").show();
        $scope.reasonForVisit.paymentMethodenable = false;
        $scope.reasonForVisit.purposeVisitenable = false;
        $rootScope.paymentMode = pay_type;
        $scope.modalHide();
        $timeout(function(){
          $rootScope.loadModal({id : 'payment_mobile_credential'});
          //$rootScope.paymentRetrigger();
        },150);
      }

      
      $scope.reasonForVisit.collectBookingData = function(){
        let selectedData = $rootScope.teleconsultationUserSelectedData;
        //console.log(selectedData);
        $rootScope.dataForAppointmentBooking["doctorInfo"] =  selectedData['tele-consultation-selected-doctor'];
        if ($rootScope.selectedTeleconsultationService == 'Member Service' && $rootScope.selectedAffiliation != null) {
          $scope.doctorFees = $rootScope.dataForAppointmentBooking["doctorInfo"].affilation_excusive_data.affilation_array[0].affilation_price;
        }else{
          $scope.doctorFees = ($rootScope.dataForAppointmentBooking["doctorInfo"].consultation_fees != null && $rootScope.dataForAppointmentBooking["doctorInfo"].consultation_fees != undefined)? $rootScope.dataForAppointmentBooking["doctorInfo"].consultation_fees : '0';
          // $scope.doctorFees = 0;
        }
        if($rootScope.emailLoginUserFreeServiceAccessGranted && $rootScope.kioskWithPaymentMode && $rootScope.isEmailLoginUserFreeServiceEnable){
          $scope.doctorFees = 0;
        }
        //console.log(HigiKioskStorageService.returnSessionData('user'));
        $rootScope.dataForAppointmentBooking["userId"] = HigiKioskStorageService.returnSessionData('user').id.toString();
        if (selectedData['tele-consultation-selected-dashboard'] === "Start Call Now" && $scope.doctorFees == 0){
          //alert("case 1");
          $scope.paymentDisabled = true;
          let dates = new Date();
          //$rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getStartDateTime(dates);
          $rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getStartCallFlowDateTime();
          if ($rootScope.discountPaymentMethodSelected == false) {
            $rootScope.dataForAppointmentBooking["doctorFees"] = $scope.doctorFees;
            //discount option variable
            $rootScope.totalMrpCost = $scope.doctorFees;
          }
          $rootScope.storeFreeConsultationDetails();
          $rootScope.bookUserAppointment();
        }else if(selectedData['tele-consultation-selected-dashboard'] === "Start Call Now" && $scope.doctorFees > 0){
          //alert("case 2");
          let dates = new Date();
          $rootScope.keyboardHide();
          //$scope.reasonForVisit.vitalSectionClass = "modal-slide-out-left";
          $scope.reasonForVisit.termsConditionsContainerClass = "modal-slide-out-right";
          $scope.reasonForVisit.paymentMethodenable = true;
          $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-in-left";
          $timeout(function(){ 
            //$scope.reasonForVisit.vitalSectionEnable = false;
            $scope.reasonForVisit.termsConditionsContainerEnable = false;
          },500);
          //$rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getStartDateTime(dates);
          $rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getStartCallFlowDateTime();
          if ($rootScope.discountPaymentMethodSelected == false) {
            $rootScope.dataForAppointmentBooking["doctorFees"] = $scope.doctorFees;
            //discount option variable
            $rootScope.totalMrpCost = $scope.doctorFees;
          }
        }else if(selectedData['tele-consultation-selected-dashboard'] === "Book Appointment" && $scope.doctorFees == 0){
          //alert("case 3");
          $scope.paymentDisabled = true;
          //$rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getBookApmtDateTime();
          $rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getBookApmtFlowDateTime();
          if ($rootScope.discountPaymentMethodSelected == false) {
            $rootScope.dataForAppointmentBooking["doctorFees"] = $scope.doctorFees;
            //discount option variable
            $rootScope.totalMrpCost = $scope.doctorFees;
          }
          $rootScope.storeFreeConsultationDetails();
          $rootScope.bookUserAppointment();
        }else if(selectedData['tele-consultation-selected-dashboard'] === "Book Appointment" && $scope.doctorFees > 0){
          //alert("case 4");
          $rootScope.keyboardHide();
          //$scope.reasonForVisit.vitalSectionClass = "modal-slide-out-left";
          $scope.reasonForVisit.termsConditionsContainerClass = "modal-slide-out-right";
          $scope.reasonForVisit.paymentMethodenable = true;
          $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-in-left";
          $timeout(function(){ 
            //$scope.reasonForVisit.vitalSectionEnable = false;
            $scope.reasonForVisit.termsConditionsContainerEnable = false;
          },500);
          //$rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getBookApmtDateTime();
          $rootScope.dataForAppointmentBooking["dateAndTime"] = $scope.getBookApmtFlowDateTime();
          if ($rootScope.discountPaymentMethodSelected == false) {
            $rootScope.dataForAppointmentBooking["doctorFees"] = $scope.doctorFees;
            //discount option variable
            $rootScope.totalMrpCost = $scope.doctorFees;
          }
        }else{
          //alert("no cases matched");
          $scope.paymentDisabled = false;
        }
      }

      $scope.getStartCallFlowDateTime = function(){
        if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'GENIX') {
          let addTime = new Date().getTime() + 3*60*1000;
          var d = new Date(addTime);
        }else{
          var d = new Date();
        }
        
        d = new Date(d.getTime());
        let date_format_str = d.getFullYear().toString()+"-"+((d.getMonth()+1).toString().length==2?(d.getMonth()+1).toString():"0"+(d.getMonth()+1).toString())+"-"+(d.getDate().toString().length==2?d.getDate().toString():"0"+d.getDate().toString())+" "+(d.getHours().toString().length==2?d.getHours().toString():"0"+d.getHours().toString())+":"+(((d.getMinutes())).toString().length==2?((d.getMinutes())).toString():"0"+((d.getMinutes())).toString())+":00";
       
        let appointmentBookedOn = date_format_str;//2020-12-11 15:21:00
        let splitDateAndTime = appointmentBookedOn.split(" ");
        let splitDate = splitDateAndTime[0].split("-");
        let dateStart = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0];
        let timeStart = $scope.ConvertTo12Hrs(splitDateAndTime[1]);
        let startDateTime = dateStart+' '+timeStart;
        return startDateTime;
      }

      $scope.getBookApmtFlowDateTime = function(){
        let apmtDate = $rootScope.appmtDate;
        let apmtTime = $rootScope.appmtTime;
        let bookedDateTime = null;

        if(apmtDate == 'today'){
          bookedDateTime = $scope.getTodayDate("today")+" "+apmtTime;
        } else if(apmtDate == "tomorrow"){
          bookedDateTime = $scope.getTodayDate("tomorrow")+" "+apmtTime;
        } else {
          let date = apmtDate.split(" ");
          let getDate = date[0].split(/(\d+)/);
          let bookDate =  getDate[1];
          let monthArr = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];         
          let month = monthArr.indexOf((date[1].toLowerCase()).substring(0, 3)) + 1;
          let bookMonth = "";
          if(month <= 9){
            bookMonth = "0"+month;
          } else {
            bookMonth = month.toString();
          }
          let d = new Date();
          let year = d.getFullYear();
          bookedDateTime = year+"-"+bookMonth+"-"+bookDate+" "+apmtTime;
        }

        let appointmentBookedOn = bookedDateTime;//2020-12-11 03:21 PM
        let splitDateAndTime = appointmentBookedOn.split(" ");
        let splitDate = splitDateAndTime[0].split("-");
        let dateStart = splitDate[1] + "/" + splitDate[2] + "/" + splitDate[0];
        let timeStart = splitDateAndTime[1] + " " + splitDateAndTime[2];
        let startDateTime = dateStart+' '+timeStart;
        return startDateTime;
      }

      $scope.getTodayDate = function(getDay){
        var d, month, day, year; 
        if(getDay == "today"){
          d = new Date(), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        } else {
          d = new Date(Date.now() + 24 * 60 * 60 * 1000), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
        }
          if (month.length < 2) 
            month = '0' + month;
          if (day.length < 2) 
            day = '0' + day;

          return [year, month, day].join('-');
      }

      $scope.getEndDateTime = function(startTime){
        let a = new Date(startTime);
        let b = a.getTime() + 30*60*1000;
        let c = new Date(b);
        let date_string = (c.getMonth()+1) + '/' + c.getDate() + '/' + c.getFullYear();
        let time_string = '';
        if(c.getHours() < 10) time_string = '0' + c.getHours();
        else time_string = '' + c.getHours();
        time_string += ':';
        if(c.getMinutes() < 10) time_string += '0' + c.getMinutes();
        else time_string += c.getMinutes();
        time_string += ':00'; 
        return  date_string + ' ' + $scope.ConvertTo12Hrs(time_string);
      }  

      $scope.ConvertTo12Hrs = function (time) {
        // Check correct time format and split into components
        time = time.toString().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
      
        if (time.length > 1) { // If time format correct
          time = time.slice (1);  // Remove full string match value
          time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
          time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        //console.log(time.join (''));
        let assableTime = (time.join ('')).split(":"); // return adjusted time or original string    
        
        let hrs = assableTime[0]; 
        let min = assableTime[1];
        //console.log(min);
        //console.log(assableTime);
        if(assableTime[0].length == 1){
          hrs = "0"+hrs;
        } 
        if(assableTime[1].length == 1){
          min = "0"+min;
        }
        return hrs+":"+min + " "+ time[5];
      }

      /*$scope.getStartDateTime = function(start_time){
        console.log(start_time)
        let startTime = new Date(start_time);
        let year = startTime.getFullYear();
        let month = (startTime.getMonth()+1 < 10) ? "0"+(startTime.getMonth()+1) : (startTime.getMonth()+1);
        let curDate = (startTime.getDate() < 10) ? "0"+(startTime.getDate()) : startTime.getDate();
        //let curDate = startTime.getDate();
        let time = $scope.formatAMPM(startTime);
        // let hour = date.getHours();
        // let minute = date.getMinutes();
        //let dateTime = year+"-"+month+"-"+curDate+" "+hour+":"+minute;
        let timeStart = year+"-"+month+"-"+curDate+" "+time;
        console.log(timeStart.toString());
        return timeStart.toString();
      }*/

      /*$scope.getEndDateTime = function(end_time){
        let endDateTime = new Date(end_time);
        endDateTime.setMinutes(endDateTime.getMinutes() + 30);
        let year = endDateTime.getFullYear();
        let month = (endDateTime.getMonth()+1 < 10) ? "0"+(endDateTime.getMonth()+1) : (endDateTime.getMonth()+1);
        let curDate = (endDateTime.getDate() < 10) ? "0"+(endDateTime.getDate()) : endDateTime.getDate();
        //let curDate = endDateTime.getDate();
        let time = $scope.formatAMPM(endDateTime);
        // let hour = endDateTime.getHours();
        // let minute = endDateTime.getMinutes();
        // let timeEnd = year+"-"+month+"-"+curDate+" "+hour+":"+minute;
        let timeEnd = year+"-"+month+"-"+curDate+" "+time;
        console.log(timeEnd.toString());
        return timeEnd.toString();
      }*/

      /*$scope.formatAMPM = function(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          hours = hours < 10 ? '0'+hours : hours;
          minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
      } */ 

      /*$scope.getBookApmtDateTime = function(){
        let apmtDate = $rootScope.appmtDate;
        let apmtTime = $rootScope.appmtTime;
        console.log(apmtDate)
        console.log(apmtTime)
        if(apmtDate == "today" || apmtDate == "tomorrow") {
          let curDate;
          if(apmtDate == "today") {curDate = new Date();}
          else {
            let today = new Date();
            curDate = new Date();
            curDate.setDate(today.getDate()+1);
          }
          let splittedDate = curDate.toLocaleString().split(',')[0].split('/');
          let time = $scope.getConvertTime12to24(apmtTime);
          let bookedDateTime = splittedDate[2]+"-"+splittedDate[0]+"-"+splittedDate[1]+" "+time;

          return bookedDateTime;
        }

        if(apmtDate != ("today" || "tomorrow")){
          let splittedDate = apmtDate.split(" ");
          let getDate = splittedDate[0].split(/(\d+)/);
          //let bookDate =  (getDate[1]  < 10) ? "0"+(getDate[1]) : getDate[1];
          let bookDate =  getDate[1];
          let monthArr = ["jan", "feb", "mar", "Apr", "may", "jun", "jly", "aug", "sep", "oct", "nov", "dec"];      
          let monthslt = monthArr.indexOf((splittedDate[1].toLowerCase()).substring(0, 3)) + 1;
          let bookMonth = "";
          if(monthslt <= 9){
            bookMonth = "0"+monthslt;
          } else {
            bookMonth = monthslt.toString();
          }
          let d = new Date();
          let bookYear = d.getFullYear();
          let time = $scope.getConvertTime12to24(apmtTime);
          let bookedDateTime = bookYear+"-"+bookMonth+"-"+bookDate+" "+time;

          return bookedDateTime;
        }else{
          return "";
        }
      }*/


      /*$scope.getConvertTime12to24 = function(getTime12h){
        const convertTime12to24 = (time12h) => {
          const [time, modifier] = time12h.split(' ');    
          let [hours, minutes] = time.split(':');    
          if (hours === '12') {
            hours = '00';
          }    
          if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
          }    
          return `${hours}:${minutes}`;
        }
        return convertTime12to24(getTime12h);
      }*/


      $rootScope.bookAppointmentObject = function(){
        let userName = HigiKioskStorageService.returnSessionData('user').firstName+' '+HigiKioskStorageService.returnSessionData('user').lastName;
        let affUniqueName = $rootScope.selectedAffiliation != null ? $rootScope.selectedAffiliation['affilate_unique_name'] : "global_services";
        let book={
          "user_ihl_id": $rootScope.dataForAppointmentBooking["userId"],
          "name": userName,
          "consultant_name": $rootScope.dataForAppointmentBooking["doctorInfo"]["name"],
          "vendor_consultant_id":$rootScope.dataForAppointmentBooking["doctorInfo"]['vendor_consultant_id'],
          "ihl_consultant_id": $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"],
          "vendor_id": $rootScope.dataForAppointmentBooking["doctorInfo"]["vendor_id"],
          //"specality": $rootScope.dataForAppointmentBooking["doctorInfo"]["consultant_speciality"].toString(),
          "specality": $rootScope.selected_speciality,
          "consultation_fees": parseInt($rootScope.dataForAppointmentBooking["doctorFees"]),
          "reason_for_visit": $rootScope.dataForAppointmentBooking['reasonForVisit'],
          "alergy": "",
          "kiosk_checkin_history": $rootScope.dataForAppointmentBooking['lastCheckIn'],
          "appointment_start_time": $rootScope.dataForAppointmentBooking["dateAndTime"],
          "appointment_end_time":$scope.getEndDateTime($rootScope.dataForAppointmentBooking["dateAndTime"]),
          "appointment_duration": "30 Min",
          "appointment_model": "appointment",
          "vendor_name": $rootScope.dataForAppointmentBooking["doctorInfo"]["vendor_id"],
          "appointment_status":"Requested",
          "notes":"",
          "direct_call": false,
          "kiosk_id": $rootScope.uniqueKioskId || "",
          "affiliation_unique_name": affUniqueName,
          "document_id":$scope.reasonForVisit.medicalFilesShareToDoctor
        };
        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] === "Start Call Now"){
          book['appointment_status'] = "Approved";
          book['direct_call'] = true;
        }
        console.log(book);

        return book;
      }
 

      $rootScope.bookUserAppointment = function(){
        //alert("bookUserAppointment called");
        
        /*let book={
          "user_ihl_id": $rootScope.dataForAppointmentBooking["userId"],
          "consultant_name": $rootScope.dataForAppointmentBooking["doctorInfo"]["name"],
          "vendor_consultant_id":$rootScope.dataForAppointmentBooking["doctorInfo"]['vendor_consultant_id'],
          "ihl_consultant_id": $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"],
          "vendor_id": $rootScope.dataForAppointmentBooking["doctorInfo"]["vendor_id"],
          "specality": $rootScope.dataForAppointmentBooking["doctorInfo"]["consultant_speciality"].toString(),
          "consultation_fees": parseInt($rootScope.dataForAppointmentBooking["doctorFees"]),
          "reason_for_visit": $rootScope.dataForAppointmentBooking['reasonForVisit'],
          "mode_of_payment": "online",
          "alergy": "",
          "kiosk_checkin_history": $rootScope.dataForAppointmentBooking['lastCheckIn'],
          "appointment_start_time": $rootScope.dataForAppointmentBooking["dateAndTime"],
          "appointment_end_time":$scope.getEndDateTime($rootScope.dataForAppointmentBooking["dateAndTime"]),
          "appointment_duration": "30 Min",
          "appointment_model": "appointment",
          "vendor_name": $rootScope.dataForAppointmentBooking["doctorInfo"]["vendor_name"],
          "appointment_status":"requested",
          "notes":""
        };
        console.log(book);*/
        //return;
        /*if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] === "Start Call Now"){
            book['appointment_status'] = "Approved";
        }*/
        HigiApiService.getAppointmentConfirm($rootScope.bookAppointmentObject(),function (resp) { 
          //alert('response came');
          let selectedData = $rootScope.teleconsultationUserSelectedData;
          let initialRes = JSON.parse(resp.replace(/&quot;/g,'"'));
          //console.log(initialRes);
          if(initialRes['status'] ==  "success"){ 
            //alert("Your Appointment Booked Successfully!");           
            if(selectedData['tele-consultation-selected-dashboard'] === "Start Call Now"){
              $scope.modalHide();
              if (selectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO') {
                
                $rootScope.apolloTeleConsultationSourceDetails.userBasicDetails = HigiKioskStorageService.returnSessionData('user');
                $rootScope.apolloTeleConsultationSourceDetails.specialityId = $rootScope.dataForAppointmentBooking["doctorInfo"]['vendor_consultant_id'];
                $rootScope.apolloTeleConsultationSourceDetails.appointmentId = initialRes['appointment_id'];
                $rootScope.apolloTeleConsultationSourceDetails.doctorInformation = $rootScope.dataForAppointmentBooking["doctorInfo"];
                window.location = '#/apollo-teleconsultation-video-call';
              }else if (selectedData['tele-consultation-selected-doctor']['vendor_id'] == 'GENIX') {
                
                $rootScope.genixConstants.userBasicDetails = HigiKioskStorageService.returnSessionData('user');
                $rootScope.genixConstants.doctorDetails = $rootScope.dataForAppointmentBooking["doctorInfo"];
                $rootScope.genixConstants.appointmentDate = $rootScope.dataForAppointmentBooking["dateAndTime"];
                $rootScope.genixConstants.appointmentFees = parseInt($rootScope.dataForAppointmentBooking["doctorFees"]);
                $rootScope.genixConstants.appointmentId = initialRes['appointment_id'];
                $rootScope.genixConstants.vendorAppointmentId = initialRes['vendor_appointment_id'];
                window.location = '#/genix-teleconsultation-video-call';
              }else{
                $rootScope.teleConsultationNamespace._isOngoingCall = false;
                $rootScope.teleConsultationNamespace.appointment_id = initialRes['appointment_id'] || undefined;
                $rootScope.teleConsultationNamespace.flow_type = 'LiveAppointemnt';
                $rootScope.teleConsultationNamespace.selectedDoctorId = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"] || undefined;
                //console.log($rootScope.teleConsultationNamespace.selectedDoctorId);

                window.location = '#/ihl-teleconsultation-video-call';
              }

              $rootScope.teleConsultDashboardOption = '';
              $rootScope.bookingAppointment = false;
              
              if ($rootScope.dataForAppointmentBooking["doctorFees"] != undefined) {
                var startCallTransactionCheck = $interval(checkStartCallPaymentTransactionIdValue, 3000);
              }

              function checkStartCallPaymentTransactionIdValue() {
                if ($rootScope.paymentTransactionIdValue != undefined && $rootScope.paymentTransactionIdValue.trim().length > 0){
                  $interval.cancel(startCallTransactionCheck);
                  let jsonData = {
                    "appointment_id": (initialRes['appointment_id']).toString(), 
                    "ihl_id": ($rootScope.dataForAppointmentBooking["userId"]).toString(),
                    "transactionId": ($rootScope.paymentTransactionIdValue).toString(),
                    "payment_status": "completed",
                    "payment_for": "teleconsultation"
                  };

                  let success = function(data){
                    //console.log(data);
                    $rootScope.paymentTransactionIdValue = "";
                  }

                  let error = function(data){
                    //console.log(data);
                    $rootScope.paymentTransactionIdValue = "";
                  }
                  HigiApiService.updatePaymentTransactionData(JSON.stringify(jsonData), success, error);
                }
              }
            } else if (selectedData['tele-consultation-selected-dashboard'] === "Book Appointment") {

              if (selectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO') {
                return;
              }

              if ($rootScope.fireStore) {
                let receiver_id = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"] || undefined;
                let receiverIdArr = [];

                if(receiver_id != undefined)
                  receiverIdArr = [receiver_id];

                let _data = {
                  'data': {cmd: 'GenerateNotification', notification_domain: 'BookAppointment'},
                  'receiver_ids': receiverIdArr,
                  'sender_id': $rootScope.user.id,
                  'published': true
                };
                fireStore.create(initialRes['appointment_id'], $rootScope.teleConsultationCollectionName, _data);
              } else {
                if ($rootScope.Crossbar && $rootScope.Crossbar.is_connected == true) {
                  let _data = {
                    'cmd':'GenerateNotification',
                    'notification_domain':'BookAppointment',
                  };
                  let receiver_id = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"] || undefined;
                  //console.log(receiver_id);
                  if(receiver_id != undefined){
                    let _options = {
                      receiver_ids:[receiver_id],
                    };
                    $rootScope.Crossbar.publishToChannel('ihl_send_data_to_doctor_channel',_data,_options);
                  }
                }
              }

              if ($rootScope.dataForAppointmentBooking["doctorFees"] != undefined) {
                var bookAppointmentTransactionCheck = $interval(checkPaymentTransactionIdValue, 3000);
              }else{
                $rootScope.ispaymentSuccesFailureContent = true;
                $scope.modalHide();
                $timeout(function(){
                  $rootScope.loadModal({id: 'exitconfirm'});
                  //$rootScope.paymentRetrigger();
                },150);
                $rootScope.teleConsultDashboardOption = '';
                $rootScope.bookingAppointment = false;
                $rootScope.paymentTransactionIdValue = "";
              }

              function checkPaymentTransactionIdValue() {
                if ($rootScope.paymentTransactionIdValue != undefined && $rootScope.paymentTransactionIdValue.trim().length > 0){
                  $interval.cancel(bookAppointmentTransactionCheck);
                  let jsonData = {
                    "appointment_id": (initialRes['appointment_id']).toString(), 
                    "ihl_id": ($rootScope.dataForAppointmentBooking["userId"]).toString(),
                    "transactionId": ($rootScope.paymentTransactionIdValue).toString(),
                    "payment_status": "completed",
                    "payment_for": "teleconsultation",
                  };
                  // {"appointment_id": initialRes['appointment_id'], "ihl_id": this.userData.id,"total_amount": this.doctorFees/100, "payment_status": "completed",  "transactionId": this.paymentTransactionId, "payment_for": "teleconsultation", "MobileNumber":this.contactDetailsMobileNumber,  "payment_mode":"Online" };

                  let success = function(data){
                    //console.log(data);
                    $rootScope.ispaymentSuccesFailureContent = true;
                    $scope.modalHide();
                    $timeout(function(){
                      $rootScope.loadModal({id: 'exitconfirm'});
                      //$rootScope.paymentRetrigger();
                    },150);
                    $rootScope.teleConsultDashboardOption = '';
                    $rootScope.bookingAppointment = false;
                    $rootScope.paymentTransactionIdValue = "";
                  }

                  let error = function(data){
                    //console.log(data);
                    $rootScope.ispaymentSuccesFailureContent = true;
                    $scope.modalHide();
                    $timeout(function(){
                      $rootScope.loadModal({id: 'exitconfirm'});
                      //$rootScope.paymentRetrigger();
                    },150);
                    $rootScope.teleConsultDashboardOption = '';
                    $rootScope.bookingAppointment = false;
                    $rootScope.paymentTransactionIdValue = "";
                  }
                  HigiApiService.updatePaymentTransactionData(JSON.stringify(jsonData), success, error);
                }
              }
            } 

            if ($scope.reasonForVisit.enableHealthVitalSharingOption == true && $scope.reasonForVisit.shareHealthVitalsToDoctor == true) {
              let success = function(data){
                //console.log(data);
              }

              let error = function(data){
                //console.log(data);
              }
              let jsonData = $scope.reasonForVisit.userHealthVitalDataToShare;
              HigiApiService.updateHealthVitalsData(JSON.stringify(jsonData), success, error);
            } 
          }else{
            //alert("Your Appointment Booked failed!");
            $rootScope.snackBarAlertText = (initialRes['status_message'])? initialRes['status_message'] : "Sorry! Something went wrong.";
            let snackbar = document.getElementById("snackbar");
            setTimeout(function(){
              snackbar.className = "show";
            }, 2 * 1000);
            setTimeout(function(){
              snackbar.className = snackbar.className.replace("show", ""); 
              $rootScope.snackBarAlertText = "";
              $rootScope.ispaymentSuccesFailureContent = false;
              $rootScope.bookingAppointment = false;
              $rootScope.clearModal();
              $scope.homeButtonClick();
            }, 7 * 1000);

            /*$rootScope.ispaymentSuccesFailureContent = false;
            $scope.modalHide();
            $timeout(function(){
              $rootScope.loadModal({id: 'exitconfirm'});
              //$rootScope.paymentRetrigger();
            },150);*/
          }
          setTimeout(function(){
            $(".keyboard_class_close_btn").show();
          }, 2 * 1000);
        },function (err){
          $rootScope.snackBarAlertText = "Sorry! Something went wrong.";
          let snackbar = document.getElementById("snackbar");
          setTimeout(function(){
            snackbar.className = "show";
          }, 2 * 1000);
          setTimeout(function(){
            snackbar.className = snackbar.className.replace("show", ""); 
            $rootScope.snackBarAlertText = "";
            $rootScope.ispaymentSuccesFailureContent = false;
            $rootScope.bookingAppointment = false;
            $rootScope.clearModal();
            $(".keyboard_class_close_btn").show();
            $scope.homeButtonClick();
          }, 6 * 1000);
        });
      }

      $rootScope.subscribeClass = function() {
        let class_data = {
          "user_ihl_id":$rootScope.user['id'],
          "course_id":$rootScope.course_obj['course_id'],
          "name":$rootScope.user['firstName']+" "+$rootScope.user['lastName'],
          "email":$rootScope.user['email'],
          "mobile_number":$rootScope.user['mobileNumber'],
          "course_type":$rootScope.course_obj['course_type'],
          "course_time":$rootScope.timeSelected,
          "provider":$rootScope.course_obj['provider'],
          "fees_for":$rootScope.course_obj['fees_for'],
          "consultant_name":$rootScope.course_obj['consultant_name'],
          "course_duration":$rootScope.courseDatePeriod,
          "course_fees":$rootScope.course_obj['course_fees'],
          "consultation_id":$rootScope.course_obj['consultant_id']
        };
        //console.log(class_data);
        HigiApiService.createSubscription(class_data, function(data){
          let res = JSON.parse(data.replace(/&quot;/g,'"'));
          //console.log(res)
           if (res.status == "Subscription Added") {
             //alert('Subscribed Successfully.');
             $rootScope.ispaymentSuccesFailureContent = true;
             $scope.modalHide();
             $timeout(function(){
               $rootScope.loadModal({id: 'exitconfirm'});
             },150);
           }
           else {
             //alert('Sorry something went wrong!');
             $rootScope.ispaymentSuccesFailureContent = false;
             $scope.modalHide();
             $timeout(function(){
               $rootScope.loadModal({id: 'exitconfirm'});
             },150);
           }
           $(".keyboard_class_close_btn").show();
        });
      }

      $scope.reasonForVisit.logoutExit = function(){
        $rootScope.exitCurrentSession();
      }

      $scope.reasonForVisit.declareKioskHealthVitalSharingVariables = function(){
        $scope.reasonForVisit.enableHealthVitalSharingOption = false;
        $scope.reasonForVisit.vitalSectionEnable = false;
        $scope.reasonForVisit.vitalSectionClass = "";
        $scope.reasonForVisit.shareHealthVitalsToDoctor = false;
        $scope.reasonForVisit.healthVitalSharingCheckboxClass = "";
        $scope.reasonForVisit.healthVitalDataToShow = [];
        $scope.reasonForVisit.userHealthVitalDataToShare;
      }

      $scope.reasonForVisit.toggleHealthVitalsSharing = function(){
        $scope.reasonForVisit.shareHealthVitalsToDoctor = !$scope.reasonForVisit.shareHealthVitalsToDoctor;
        $scope.reasonForVisit.medicalDocumentsEnable = false;
        $scope.reasonForVisit.medicalDocumentsUploadEnable = false;
        if ($scope.reasonForVisit.shareHealthVitalsToDoctor) {
          // $scope.reasonForVisit.healthVitalSharingCheckboxClass = "accept_checkmark";
          $scope.reasonForVisit.nextBtnActiveHealthVital = "reason_for_visit_next_active_btn"
          $scope.reasonForVisit.showUserHealthVitalDetails();
        }else{
          $scope.reasonForVisit.healthVitalSharingCheckboxClass = "";
          $scope.reasonForVisit.nextBtnActiveHealthVital = "";
        }
      }

      $scope.reasonForVisit.showUserHealthVitalDetails = function(){
        $rootScope.keyboardHide();
        $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsUploadClass = "modal-slide-out-right";
        $scope.reasonForVisit.vitalSectionEnable = true;
        $scope.reasonForVisit.vitalSectionClass = "modal-slide-in-left";
        $timeout(function(){
          $scope.reasonForVisit.medicalDocumentsEnable = false;
          $scope.reasonForVisit.medicalDocumentsUploadEnable = false;
          $scope.reasonForVisit.paymentMethodenable = false;
        },500);
        
        $timeout(function(){ 
          let scroller = new FTScroller(document.getElementById('health_vital_details'), {scrollingX: false});
        },100);
      }

      $scope.reasonForVisit.initializeHealthVitalDataSharingOption = function(){
        let lastCheckinObject = HigiKioskStorageService.returnSessionData('lastCheckin');
        let currentCheckinObject = $rootScope.currentHealthVitalData;
        let userId = HigiKioskStorageService.returnSessionData('user').id.toString();
        let updatedUserBasicInfo = HigiKioskStorageService.returnSessionData('userBasicInfo');
        let userData = HigiKioskStorageService.returnSessionData('user');

        if (currentCheckinObject != undefined && currentCheckinObject != null && userId != undefined &&  userId != null) {
          $scope.reasonForVisit.populateHealthVitalDataSharingOption(currentCheckinObject, userId);
          return;
        }

        if (lastCheckinObject != undefined && lastCheckinObject != null && userId != undefined &&  userId != null) {
          lastCheckinObject['heightMeters'] = $rootScope.UserInfo['heightMeters']; //lastcheckin height has not been updated.Handled temporarily soln.
          $scope.reasonForVisit.populateHealthVitalDataSharingOption(lastCheckinObject, userId);
          return;
        }

        if (updatedUserBasicInfo != undefined && updatedUserBasicInfo != null && userId != undefined &&  userId != null) {
          $scope.reasonForVisit.populateHealthVitalDataSharingOption(updatedUserBasicInfo, userId);
          return;
        }

        if (userData != undefined && userData != null && userId != undefined &&  userId != null) {
          $scope.reasonForVisit.populateHealthVitalDataSharingOption(userData, userId);
          return;
        }

        return;
      }

      $scope.reasonForVisit.populateHealthVitalDataSharingOption = function(checkinData, id){
        if (checkinData != undefined && checkinData != null && id != undefined &&  id != null) {
          let userCheckinData = checkinData;
          let userId = id;
          let bodyReadings = {};
          let bloodPressureReadings = {};
          let temperatureReadings = {};
          let spo2Readings = {};
          let ECGBpm;
          let bcaReadings = {};

          if ('heightMeters' in userCheckinData) {
            let value = userCheckinData['heightMeters'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bodyReadings['height'] = Math.round(Number(value.toFixed(2)) * 100);
              }else{
                bodyReadings['height'] = 0;
              }
            }else{
              bodyReadings['height'] = 0;
            }
          }else{
            bodyReadings['height'] = 0;
          }

          if ('weightKG' in userCheckinData) {
            let value = userCheckinData['weightKG'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bodyReadings['weight'] = Math.round(Number(value));
              }else{
                bodyReadings['weight'] = 0;
              }
            }else{
              bodyReadings['weight'] = 0;
            }
          }else{
            bodyReadings['weight'] = 0;
          }

          if ('bmi' in userCheckinData) {
            let value = userCheckinData['bmi'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bodyReadings['bmi'] = Number(value.toFixed(1));
              }else{
                bodyReadings['bmi'] = 0.0;
              }
            }else{
              bodyReadings['bmi'] = 0.0;
            }
          }else{
            bodyReadings['bmi'] = 0.0;
          }

          if ('fat' in userCheckinData) {
            let value = userCheckinData['fat'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bodyReadings['fat'] = Math.round(Number(value));
              }else{
                bodyReadings['fat'] = 0;
              }
            }else{
              bodyReadings['fat'] = 0;
            }
          }else{
            bodyReadings['fat'] = 0;
          }

          if ('systolic' in userCheckinData) {
            let value = userCheckinData['systolic'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bloodPressureReadings['systolic'] = Math.round(Number(value));
              }else{
                bloodPressureReadings['systolic'] = 0;
              }
            }else{
             bloodPressureReadings['systolic'] = 0; 
            }
          }else{
            bloodPressureReadings['systolic']  = 0;
          }

          if ('diastolic' in userCheckinData) {
            let value = userCheckinData['diastolic'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bloodPressureReadings['diastolic'] = Math.round(Number(value));
              }else{
                bloodPressureReadings['diastolic'] = 0;
              }
            }else{
             bloodPressureReadings['diastolic'] = 0; 
            }
          }else{
            bloodPressureReadings['diastolic']  = 0;
          }

          if ('pulseBpm' in userCheckinData) {
            let value = userCheckinData['pulseBpm'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                bloodPressureReadings['pulse'] = Math.round(Number(value));
                spo2Readings['pulse']  = Math.round(Number(value));
              }else{
                bloodPressureReadings['pulse'] = 0;
                spo2Readings['pulse']  = 0;
              }
            }else{
             bloodPressureReadings['pulse'] = 0; 
             spo2Readings['pulse']  = 0;
            }
          }else{
            bloodPressureReadings['pulse']  = 0;
            spo2Readings['pulse']  = 0;
          }

          bloodPressureReadings['irrPulse']  = false;

          if ('temperature' in userCheckinData) {
            let value = userCheckinData['temperature'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                temperatureReadings['temperature'] = Math.round(Number(HigiKioskUtilitiesService.convertToFarrantHeat(value)));
              }else{
                temperatureReadings['temperature'] = 0;
              }
            }else{
             temperatureReadings['temperature'] = 0; 
            }
          }else{
            temperatureReadings['temperature']  = 0;
          }

          if ('spo2' in userCheckinData) {
            let value = userCheckinData['spo2'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                spo2Readings['spo2'] = Math.round(Number(value));
              }else{
                spo2Readings['spo2'] = 0;
              }
            }else{
             spo2Readings['spo2'] = 0; 
            }
          }else{
            spo2Readings['spo2']  = 0;
          }

          if ('ECGBpm' in userCheckinData) {
            let value = userCheckinData['ECGBpm'];
            if (value != undefined && value != null) {
              if (!isNaN(value) && value > 0) {
                ECGBpm  = value;
              }else{
                ECGBpm = 0;
              }
            }else{
             ECGBpm = 0; 
            }
          }else{
            ECGBpm  = 0;
          }

          if ('body_fat_mass' in userCheckinData && 'percent_body_fat' in userCheckinData && 'skeletal_muscle_mass' in userCheckinData && 'body_cell_mass' in userCheckinData && 'visceral_fat' in userCheckinData && 'bone_mineral_content' in userCheckinData && 'protien' in userCheckinData && 'mineral' in userCheckinData && 'intra_cellular_water' in userCheckinData && 'extra_cellular_water' in userCheckinData && 'waist_hip_ratio' in userCheckinData && 'waist_height_ratio' in userCheckinData && 'basal_metabolic_rate' in userCheckinData) {
            // let value = userCheckinData['body_fat_mass'];
            let bfm = userCheckinData['body_fat_mass'], pbf = userCheckinData['percent_body_fat'], smm = userCheckinData['skeletal_muscle_mass'], bcm = userCheckinData['body_cell_mass'], vf = userCheckinData['visceral_fat'], bmc = userCheckinData['bone_mineral_content'], pr = userCheckinData['protien'], mn = userCheckinData['mineral'], icw = userCheckinData['intra_cellular_water'], ecw = userCheckinData['extra_cellular_water'], whr = userCheckinData['waist_hip_ratio'], whtr = userCheckinData['waist_height_ratio'], bmtc = userCheckinData['basal_metabolic_rate'];
            if (bfm != undefined && bfm != null && pbf != undefined && pbf != null && smm != undefined && smm != null && bcm != undefined && bcm != null && vf != undefined && vf != null && bmc != undefined && bmc != null && pr != undefined && pr != null && mn != undefined && mn != null && icw != undefined && icw != null && ecw != undefined && ecw != null && whr != undefined && whr != null && whtr != undefined && whtr != null && bmtc != undefined && bmtc != null) {
              if (!isNaN(bfm) && bfm > 0 && !isNaN(pbf) && pbf > 0 && !isNaN(smm) && smm > 0 && !isNaN(bcm) && bcm > 0 && !isNaN(vf) && vf > 0 && !isNaN(bmc) && bmc > 0 && !isNaN(pr) && pr > 0 && !isNaN(mn) && mn > 0 && !isNaN(icw) && icw > 0 && !isNaN(ecw) && ecw > 0 && !isNaN(whr) && whr > 0 && !isNaN(whtr) && whtr > 0 && !isNaN(bmtc) && bmtc > 0) {
                
                bcaReadings['body_fat_mass'] = Math.round(Number(bfm.toFixed(2))), bcaReadings['percent_body_fat'] = Math.round(Number(pbf.toFixed(2))), bcaReadings['skeletal_muscle_mass'] = Math.round(Number(smm.toFixed(2))), bcaReadings['body_cell_mass'] = Math.round(Number(bcm.toFixed(2))), bcaReadings['visceral_fat'] = Math.round(Number(vf.toFixed(2))), bcaReadings['bone_mineral_content'] = Math.round(Number(bmc.toFixed(2))), bcaReadings['protien'] = Math.round(Number(pr.toFixed(2))), bcaReadings['mineral'] = Math.round(Number(mn.toFixed(2))), bcaReadings['intra_cellular_water'] = Math.round(Number(icw.toFixed(2))), bcaReadings['extra_cellular_water'] = Math.round(Number(ecw.toFixed(2))), bcaReadings['waist_hip_ratio'] = Math.round(Number(whr.toFixed(2))), bcaReadings['waist_height_ratio'] = Math.round(Number(whtr.toFixed(2))), bcaReadings['basal_metabolic_rate'] = Math.round(Number(bmtc.toFixed(2)));
              }else{
                bcaReadings['body_fat_mass'] = 0, bcaReadings['percent_body_fat'] = 0, bcaReadings['skeletal_muscle_mass'] = 0, bcaReadings['body_cell_mass'] = 0, bcaReadings['visceral_fat'] = 0, bcaReadings['bone_mineral_content'] = 0, bcaReadings['protien'] = 0, bcaReadings['mineral'] = 0, bcaReadings['intra_cellular_water'] = 0, bcaReadings['extra_cellular_water'] = 0, bcaReadings['waist_hip_ratio'] = 0, bcaReadings['waist_height_ratio'] = 0, bcaReadings['basal_metabolic_rate'] = 0;
              }
            }else{
              bcaReadings['body_fat_mass'] = 0, bcaReadings['percent_body_fat'] = 0, bcaReadings['skeletal_muscle_mass'] = 0, bcaReadings['body_cell_mass'] = 0, bcaReadings['visceral_fat'] = 0, bcaReadings['bone_mineral_content'] = 0, bcaReadings['protien'] = 0, bcaReadings['mineral'] = 0, bcaReadings['intra_cellular_water'] = 0, bcaReadings['extra_cellular_water'] = 0, bcaReadings['waist_hip_ratio'] = 0, bcaReadings['waist_height_ratio'] = 0, bcaReadings['basal_metabolic_rate'] = 0;
            }
          }else{
            bcaReadings['body_fat_mass'] = 0, bcaReadings['percent_body_fat'] = 0, bcaReadings['skeletal_muscle_mass'] = 0, bcaReadings['body_cell_mass'] = 0, bcaReadings['visceral_fat'] = 0, bcaReadings['bone_mineral_content'] = 0, bcaReadings['protien'] = 0, bcaReadings['mineral'] = 0, bcaReadings['intra_cellular_water'] = 0, bcaReadings['extra_cellular_water'] = 0, bcaReadings['waist_hip_ratio'] = 0, bcaReadings['waist_height_ratio'] = 0, bcaReadings['basal_metabolic_rate'] = 0;
          }

          let healthVitalDataToShow = [
            {"image":"images/height.png", "vital_name":"Height", "value": bodyReadings['height'], "unit":"cm"},
            {"image":"images/Icons-28.png", "vital_name":"Weight", "value": bodyReadings['weight'], "unit":"kg"},
            {"image":"images/Icons-02.png", "vital_name":"Bmi", "value": bodyReadings['bmi'], "unit":""},
            {"image":"images/Icons-32.png", "vital_name":"Blood Pressure", "value": (bloodPressureReadings['systolic'] != 0 && bloodPressureReadings['diastolic'] != 0) ? (bloodPressureReadings['systolic']+'/'+bloodPressureReadings['diastolic']) : 0, "unit":"mmhg"},
            {"image":"images/Icons-33.png", "vital_name":"Pulse", "value": bloodPressureReadings['pulse'], "unit":"bpm"},
            {"image":"images/spo2/Icons-35.png", "vital_name":"Spo2", "value": spo2Readings['spo2'], "unit":"%"},
            {"image":"images/Icons-34.png", "vital_name":"Temperature", "value": temperatureReadings['temperature'], "unit":"°F"},
            {"image":"images/Icons-30.png", "vital_name":"Ecg", "value": ECGBpm, "unit":"bpm"},
            {"image":"images/Icons-29.png", "vital_name":"Body Fat Mass", "value": bcaReadings['body_fat_mass'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Percent Body Fat", "value": bcaReadings['percent_body_fat'], "unit":"%"},
            {"image":"images/Icons-29.png", "vital_name":"Skeletal Muscle Mass", "value": bcaReadings['skeletal_muscle_mass'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Body Cell Mass", "value": bcaReadings['body_cell_mass'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Visceral Fat", "value": bcaReadings['visceral_fat'], "unit":"cm.sq"},
            {"image":"images/Icons-29.png", "vital_name":"Bone Mineral", "value": bcaReadings['bone_mineral_content'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Protein Content", "value": bcaReadings['protien'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Mineral Content", "value": bcaReadings['mineral'], "unit":"kg"},
            {"image":"images/Icons-29.png", "vital_name":"Intra Cellular Water ", "value": bcaReadings['intra_cellular_water'], "unit":"ltr"},
            {"image":"images/Icons-29.png", "vital_name":"Extra Cellular Water ", "value": bcaReadings['extra_cellular_water'], "unit":"ltr"},
            {"image":"images/Icons-29.png", "vital_name":"Waist/Hip Ratio ", "value": bcaReadings['waist_hip_ratio'], "unit":""},
            {"image":"images/Icons-29.png", "vital_name":"Waist/Height Ratio ", "value": bcaReadings['waist_height_ratio'], "unit":""},
            {"image":"images/Icons-29.png", "vital_name":"Basal Metabolic Rate ", "value": bcaReadings['basal_metabolic_rate'], "unit":"kcal"},
          ];

          /*let healthVitalDataToShare = {
            "patientId": userId,
            "readings": [
              {
                "readingType": "body",
                "body": bodyReadings
              },
              {
                "readingType":"blood_pressure",
                "bloodPressure": bloodPressureReadings
              },
              {
                "readingType":"temperature",
                "temperature": temperatureReadings
              },
              {
                "readingType":"spo2",
                "spo2": spo2Readings
              },
              {
                "readingType": "ecg",
                "ecg": ecgReadings
              }
            ]
          };*/
          let checkinVitals = {
            "weightKG": bodyReadings['weight'].toString(),
            "bmi": bodyReadings['bmi'].toString(),
            "fatRatio": "0",
            "systolic": bloodPressureReadings['systolic'].toString(),
            "diastolic": bloodPressureReadings['diastolic'].toString(),
            "pulseBpm": bloodPressureReadings['pulse'].toString(),
            "spo2": spo2Readings['spo2'].toString(),
            "temperature": temperatureReadings['temperature'].toString(),
            "ecg": ECGBpm.toString()
          };

          let healthVitalDataToShare = {
            "user_ihl_id": userId,
            "height": bodyReadings['height'],
            "checkin": checkinVitals
          };

          $scope.reasonForVisit.healthVitalDataToShow = healthVitalDataToShow.filter(obj => {
            if(!isNaN(obj.value)){
              return obj.value > 0;
            }else{
              return obj.value.length >  0;
            }
          });
          //console.log($scope.reasonForVisit.healthVitalDataToShow);
          //console.log(healthVitalDataToShare);

          if ($scope.reasonForVisit.healthVitalDataToShow.length > 0) {
            $scope.reasonForVisit.enableHealthVitalSharingOption = true;
            $scope.reasonForVisit.userHealthVitalDataToShare = healthVitalDataToShare;
          }
          return;
        }
      };

      $scope.reasonForVisit.declareTeleConsultationTermsAndConditionsVariables = function(){
        $scope.reasonForVisit.enableTermsAndConditionOption = false;
        $scope.reasonForVisit.termsConditionsContainerEnable = false;
        $scope.reasonForVisit.termsConditionsContainerClass = "";
        //$scope.reasonForVisit.isTermsConditionsOptionAgreed = false;
        $scope.reasonForVisit.termsConditionsOptionCheckboxClass = "";
        $scope.reasonForVisit.acceptedTermsAndConditionClass = "";

        //Get terms and ppol
        $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['terms.filename'] + '.html').success(function(data){
          
          HigiApiService.fetch_terms_condition_from_config($rootScope.uniqueKioskId,
            //Success
            function(resp) {
              if (resp.error_message){
                $scope.data_from_config = '';
              } 
              else{
                var base64String = resp.terms_and_condition;
                $scope.data_from_config = atob(base64String);
              }
              $scope.reasonForVisit.termsOfServicePpol = data + $scope.data_from_config + '<a id="ppol_anchor" name="privacy"></a>';
              $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                $scope.reasonForVisit.termsOfServicePpol += data;
                $scope.reasonForVisit.termsOfServicePpol = $sce.trustAsHtml($scope.reasonForVisit.termsOfServicePpol);
                $timeout(function(){ 
                  let scroller = new FTScroller(document.getElementById('terms_conditions_privacy_policy_wrapper'), {scrollingX: false});
                },150);
              });
            },
            //Failure
            function(e) {
              $scope.data_from_config = '';
              $scope.reasonForVisit.termsOfServicePpol = data + $scope.data_from_config + '<a id="ppol_anchor" name="privacy"></a>';
              $http.get('docs/'+ $rootScope.termsAndPrivacyDocLang + '/' + appSettings['privacy.policy.filename'] + '.html').success(function(data){
                $scope.reasonForVisit.termsOfServicePpol += data;
                $scope.reasonForVisit.termsOfServicePpol = $sce.trustAsHtml($scope.reasonForVisit.termsOfServicePpol);
                $timeout(function(){ 
                  let scroller = new FTScroller(document.getElementById('terms_conditions_privacy_policy_wrapper'), {scrollingX: false});
                },150);
              });
            }
          )
        });
      }

      $scope.reasonForVisit.showTermsAndConditionOption = function(){
        /*if ($scope.reasonForVisit.isTermsConditionsOptionAgreed) {
          return;
        };*/

        if ($rootScope.fireStore) {
          // let _data = {
          //   'data': {cmd: 'MedicalDocUploadLogout'},
          //   'published': true
          // };
          // fireStore.create(_data);
        }
        else {
          $rootScope.Crossbar.publishToUploadFileLogin('ihl-med-doc-upload-logout',['logout']);
        }
        $rootScope.keyboardHide(); 
        $scope.reasonForVisit.vitalSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsClass = "modal-slide-out-right";
        $scope.reasonForVisit.purposeVisitSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsUploadClass = "modal-slide-out-right";
        $scope.reasonForVisit.enableTermsAndConditionOption = true;
        $scope.reasonForVisit.termsConditionsContainerEnable = true;
        $scope.reasonForVisit.termsConditionsContainerClass = "modal-slide-in-left";
        $timeout(function(){ 
          let scroller = new FTScroller(document.getElementById('terms_conditions_privacy_policy_wrapper'), {scrollingX: false});
        },150);
        $timeout(function(){
          $scope.reasonForVisit.vitalSectionEnable = false;
          $scope.reasonForVisit.medicalDocumentsEnable = false;
          $scope.reasonForVisit.purposeVisitenable = false;
          $scope.reasonForVisit.medicalDocumentsUploadEnable = false;
        },500);
        
        /*$timeout(function(){ 
          let scroller = new FTScroller(document.getElementById('terms_conditions_privacy_policy_wrapper'), {scrollingX: false});
        },100);*/
      }

      $scope.reasonForVisit.toggleTermsAndConditionsOption = function(text, isAgreed){
        let termsAgreed = isAgreed;
        let inputText = text;
        if (termsAgreed) {
          //$scope.reasonForVisit.termsConditionsOptionCheckboxClass = "accept_checkmark";
          //$scope.reasonForVisit.acceptedTermsAndConditionClass = "disable_element";
          $scope.reasonForVisit.submitButtonClicked(inputText);
        }else{
          //$scope.reasonForVisit.termsConditionsOptionCheckboxClass = "";
          $rootScope.clearModal();
          $scope.homeButtonClick();
        }
      }

      $rootScope.storeFreeConsultationDetails = function(){
        let userDetails = HigiKioskStorageService.returnSessionData('user');
        let mobileNumber = "";
        let userIhlId = "";
        let ConsultantID = "";
        let ConsultantName = "";
        let PurposeDetails = "";
        let invoice = generateInvoiceId();
        let invoiceNumber = invoice;
        let vendorName = "";
        let selectedDoctor = $rootScope.teleconsultationUserSelectedData; 
        $rootScope.invoiceIdForApolloTeleconsultationService = invoice;
        let orgCode = $rootScope.uniqueKioskId.split("-")[1];
        let affUniqueName = $rootScope.selectedAffiliation != null ? $rootScope.selectedAffiliation['affilate_unique_name'] : "global_services";
        let email = "";
        let accountName = "";
        if (userDetails != undefined && userDetails != null) {
          mobileNumber = (userDetails.mobileNumber != undefined && userDetails.mobileNumber != null && userDetails.mobileNumber.trim().length == 10) ? userDetails.mobileNumber : "";
          email = (userDetails.email != undefined && userDetails.email != null && userDetails.email != "") ? userDetails.email : ""; 
          userIhlId = userDetails.id;
        }

        if ($rootScope.dataForAppointmentBooking != undefined) {
          if ($rootScope.dataForAppointmentBooking["doctorInfo"] != undefined) {
            if ($rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"] != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"] != null) {
              ConsultantID = $rootScope.dataForAppointmentBooking["doctorInfo"]["ihl_consultant_id"];
            }

            if ($rootScope.dataForAppointmentBooking["doctorInfo"]["name"] != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"]["name"] != null) {
              ConsultantName = $rootScope.dataForAppointmentBooking["doctorInfo"]["name"];
            }
            
            if($rootScope.dataForAppointmentBooking["doctorInfo"].account_name != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"].account_name != ""){
              accountName = $rootScope.dataForAppointmentBooking["doctorInfo"].account_name;
            }
          }
        }
        if (selectedDoctor != undefined) {
          vendorName = selectedDoctor['tele-consultation-selected-doctor']['vendor_id'];
        }
        
        PurposeDetails = JSON.stringify($rootScope.bookAppointmentObject());

        let splittedStartDate = $rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[0].split('/');
        let service_provided_date = `${splittedStartDate[2]}-${splittedStartDate[0]}-${splittedStartDate[1]} ${$rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[1]} ${$rootScope.dataForAppointmentBooking["dateAndTime"].split(' ')[2]}`;

        let freeConsultDetails = {
          "MobileNumber": mobileNumber,
          "UsageType": "Free",
          "user_ihl_id": userIhlId,
          // "MRPCost": "0",
          "TotalAmount": "0",
          // "Discounts": "0",
          "ConsultantID": ConsultantID,
          "ConsultantName": ConsultantName,
          "PurposeDetails": PurposeDetails,
          "AppointmentID": "",
          "SourceDevice": "kiosk",
          "Service_Provided": "false",
          "purpose": "teleconsult",
          "payment_status": "completed",
          "payment_for": "teleconsultation",
          "vendor_name": vendorName,
          "invoiceNumber": invoiceNumber,
          // "account_name": "default account",
          "service_provided_date": service_provided_date,
          "KioskID": $rootScope.uniqueKioskId.toString(),
          "affiliation_unique_name": affUniqueName,
          "OrganizationCode": orgCode,
          // "principal_amount":"0", 
          // "gst_amount":"0",
          "state": $rootScope.kioskStateLocation.toString(),
          "MRPCost": "FREE",
          "Discounts": "",
          "account_name": accountName,
          "principal_amount":"", 
          "gst_amount":"",
        }
        //console.log(freeConsultDetails);

        let success = function(data){
          //console.log(data);
          $rootScope.prescriptionNumberFor1mg = data.invoice_number;
          $rootScope.paymentTransactionIdValue = data.transaction_id; 
        }

        let error = function(data){
          //console.log(data);
        }
        HigiApiService.updateFreeConsultationDetails(JSON.stringify(freeConsultDetails), success, error);
      }

      function generateInvoiceId() { // Public Domain/MIT
        let d = new Date().getTime();//Timestamp
        let d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
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

      $scope.reasonForVisit.declareMedicalDocumentsSharingVariables = function(){
         $scope.reasonForVisit.medicalDocumentsEnable = false;
         $scope.reasonForVisit.medicalDocumentsClass = "";
         $scope.reasonForVisit.shareMedicalDocumentsToDoctor = false;
         $scope.reasonForVisit.medicalDocumentsSharingCheckboxClass = "";
        //  $scope.reasonForVisit.medicalDocumentsDataToShow = [];
         $scope.reasonForVisit.medicalFilesDataToSharedFromApi = [];
      }

      $scope.reasonForVisit.toggleMedicalDocumentsSharing = function(){
        $scope.reasonForVisit.selectedMedicalFiles = !$scope.reasonForVisit.selectedMedicalFiles;
        $scope.reasonForVisit.shareMedicalDocumentsToDoctor = !$scope.reasonForVisit.shareMedicalDocumentsToDoctor;
        $scope.reasonForVisit.medicalFilesShareToDoctor = [];
        $scope.reasonForVisit.vitalSectionEnable = false;
        $scope.reasonForVisit.showUserMedicalDocumentsDetails();
      
        // if ($scope.reasonForVisit.shareMedicalDocumentsToDoctor) {
        //   console.log('call1');
        //   $scope.reasonForVisit.showUserMedicalDocumentsDetails();
        // }else{
        //   console.log('call2');
        //   $scope.reasonForVisit.medicalDocumentsSharingCheckboxClass = "";
        // }
        if ($scope.reasonForVisit.medicalFilesDataToSharedFromApi.length == 0)
          $scope.reasonForVisit.initializeMedicalDocumentsSharingOption();
      }

      $scope.reasonForVisit.showUserMedicalDocumentsDetails = function(){
        $rootScope.keyboardHide();
        $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.vitalSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsUploadClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsEnable = true;
        $scope.reasonForVisit.medicalDocumentsClass = "modal-slide-in-left";
        $timeout(function(){
          $scope.reasonForVisit.vitalSectionEnable = false;
          $scope.reasonForVisit.paymentMethodenable = false;
          $scope.reasonForVisit.medicalDocumentsUploadEnable = false;
        },500);
        
        $timeout(function(){ 
          let scroller = new FTScroller(document.getElementById('medical_documents_details'), {scrollingX: false});
        },100);
      }
 
      $scope.reasonForVisit.initializeMedicalDocumentsSharingOption = function(){
        let getUserId = HigiKioskStorageService.returnSessionData('user');
        let medicalFilesDataToShow = {
          "ihl_user_id": getUserId['id']
        };
        
        let success = function(data){
          // console.log(data);
          angular.forEach(data, function(value) {
              value['isSelected'] = false;
          });
          $scope.reasonForVisit.medicalFilesDataToSharedFromApi = data;
        }

        let error = function(data){
          // console.log(data);
        }
  
        let jsonData = medicalFilesDataToShow;
        console.log(jsonData);
        HigiApiService.getAllMedicalFiles(JSON.stringify(jsonData),success,error);
      }

      $scope.reasonForVisit.init();
      
      $scope.reasonForVisit.onSelectDocument = function(value, splice = true){
        $scope.reasonForVisit.isChecked  = false;
        $scope.reasonForVisit.nextBtnActiveMedicalFiles = "reason_for_visit_next_active_btn";
        let getSelectedFileId = {};
        getSelectedFileId = value; 

        angular.forEach($scope.reasonForVisit.medicalFilesDataToSharedFromApi, function(item) {
          if (item.document_id == value)
            item['isSelected'] = true;
        });

        if($scope.reasonForVisit.medicalFilesShareToDoctor.length > 0){
          for(var i=0;i<$scope.reasonForVisit.medicalFilesShareToDoctor.length;i++){
            if($scope.reasonForVisit.medicalFilesShareToDoctor[i] == getSelectedFileId){
              if (splice) {
                var index = $scope.reasonForVisit.medicalFilesShareToDoctor.indexOf(getSelectedFileId);
                $scope.reasonForVisit.medicalFilesShareToDoctor.splice(index,1);
              }
              $scope.reasonForVisit.isChecked = true;
            }
          }
        } 
              
        if($scope.reasonForVisit.isChecked == false){
          $scope.reasonForVisit.medicalFilesShareToDoctor.push(getSelectedFileId);
          console.log($scope.reasonForVisit.medicalFilesShareToDoctor);    
        }
        
        if ($scope.reasonForVisit.medicalFilesShareToDoctor.length != 0)
          $scope.reasonForVisit.selectedMedicalFiles = true;
        else
          $scope.reasonForVisit.selectedMedicalFiles = false;
      }
   
      $scope.reasonForVisit.sendFilesToDoctor = function(){
        // $scope.reasonForVisit.medicalFilesShareToDoctor;
        console.log($scope.reasonForVisit.medicalFilesShareToDoctor);
      }

      $scope.reasonForVisit.shareVitalsToDoctor = function() {
        let snackbar = document.getElementById("snackbar");

        let timeOfVital = $scope.reasonForVisit.showVital.dateTime.match(/\(([^)]+)\)/);
        let timeOfVitalLocal = parseInt(timeOfVital[1]) + (330 * 60 * 1000);
        $scope.reasonForVisit.showVital.dateTime = "/Date("+timeOfVitalLocal+")/"; // Add 330 minutes in milliseconds


        $scope.reasonForVisit.sendHealthVitalsToDoctor = $scope.reasonForVisit.showVital;
        snackbar.className = "green";
        $scope.reasonForVisit.nextBtnActive = '';

        if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] === "Start Call Now")
          $rootScope.snackBarAlertText = "Your vitals will share once consultant/doctor pick up the call";
        else
          $rootScope.snackBarAlertText = "Your vitals will share once appointment is confirmed by consultant/doctor";

        setTimeout(function () {
          snackbar.className = snackbar.className.replace("green", "");
          // $rootScope.keyboardShow();
          if ($scope.reasonForVisit.reasonText)
            $scope.reasonForVisit.nextBtnActive = 'reason_for_visit_next_active_btn';
        }, 3000);
      }

      $scope.reasonForVisit.cancelVitalsToDoctor = function() {
        let snackbar = document.getElementById("snackbar");
        $scope.reasonForVisit.sendHealthVitalsToDoctor = '';
        snackbar.className = "red";
        $rootScope.snackBarAlertText = "Your vitals will not be shared ";
        $scope.reasonForVisit.nextBtnActive = '';

        setTimeout(function () {
          snackbar.className = snackbar.className.replace("red", "");
          $rootScope.keyboardShow();
          if ($scope.reasonForVisit.reasonText)
            $scope.reasonForVisit.nextBtnActive = 'reason_for_visit_next_active_btn';
        }, 3000);
      }

      $scope.reasonForVisit.shareMedFilesToDoctor = function() {
        let snackbar = document.getElementById("medical-snackbar");
        snackbar.className = "green";
        $scope.reasonForVisit.nextBtnActive = '';

        if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] === "Start Call Now")
          $rootScope.medicalSnackBarAlertText = "Your medical files will share once consultant/doctor pick up the call";
        else
          $rootScope.medicalSnackBarAlertText = "Your medical files will share once appointment is confirmed by consultant/doctor";

        setTimeout(function () {
          snackbar.className = snackbar.className.replace("green", "");
          // $rootScope.keyboardShow();
          if ($scope.reasonForVisit.reasonText)
            $scope.reasonForVisit.nextBtnActive = 'reason_for_visit_next_active_btn';
        }, 3000);
      }

      $scope.reasonForVisit.cancelMedFilesToDoctor = function() {
        angular.forEach($scope.reasonForVisit.medicalFilesDataToSharedFromApi, function(value) {
          if (value['isSelected'])
            value['isSelected'] = false;
        });
        $scope.reasonForVisit.medicalFilesShareToDoctor = [];
        $scope.reasonForVisit.medicalFilesShareStatus = false;
        let snackbar = document.getElementById("medical-snackbar");
        snackbar.className = "red";
        $rootScope.medicalSnackBarAlertText = "Your medical files will not be shared ";
        $scope.reasonForVisit.nextBtnActive = '';
        
        setTimeout(function () {
          snackbar.className = snackbar.className.replace("red", "");
          $rootScope.keyboardShow();
          if ($scope.reasonForVisit.reasonText)
            $scope.reasonForVisit.nextBtnActive = 'reason_for_visit_next_active_btn';
        }, 3000);
      }

      $scope.initiateCrossbar = function(){
       
        evt = function(argmt){
          $scope.reasonForVisit.showUserMedicalDocumentsDetails();
          $scope.reasonForVisit.initializeMedicalDocumentsSharingOption();
          $timeout(() => {
            if($scope.reasonForVisit.medicalFilesShareToDoctor.length > 0){
              for(var i = 0; i < $scope.reasonForVisit.medicalFilesShareToDoctor.length; i++){
                angular.forEach($scope.reasonForVisit.medicalFilesDataToSharedFromApi,function(itemresp){
                  if(itemresp.document_id == $scope.reasonForVisit.medicalFilesShareToDoctor[i]){
                    itemresp['isSelected'] = true;
                  }
                })
              }
            }
            
              $scope.reasonForVisit.onSelectDocument(argmt[0]['body']['document_id']);

          }, 1000);
          
        }    


        $rootScope.Crossbar.subscribeToUploadFile('ihl-med-doc-upload',evt);
      }

      $scope.initiateFireStore = function() {
        fireStore.getDocumentByID($rootScope.user.id, $rootScope.medicalDocUploadCollectionName).onSnapshot(function(doc) {
          if (doc.exists) {
            const existDoc = doc.data();
            
            if (existDoc.published) {
              fireStore.update($rootScope.user.id, $rootScope.medicalDocUploadCollectionName, {'published': false})
              $scope.reasonForVisit.initializeMedicalDocumentsSharingOption();

              $timeout(() => {
                $scope.reasonForVisit.showUserMedicalDocumentsDetails();
                $scope.medicalDocumentStatusUpdate();

                existDoc.data.document_ids.forEach(function(id) {
                  $scope.reasonForVisit.onSelectDocument(id, false);
                });
              }, 1000);
            }
          }
        });
      }

      $scope.medicalDocumentStatusUpdate = function() {
        if ($scope.reasonForVisit.medicalFilesShareToDoctor.length > 0) {
          for (var i = 0; i < $scope.reasonForVisit.medicalFilesShareToDoctor.length; i++) {
            angular.forEach($scope.reasonForVisit.medicalFilesDataToSharedFromApi,function(itemresp) {
              if (itemresp.document_id == $scope.reasonForVisit.medicalFilesShareToDoctor[i]) {
                itemresp['isSelected'] = true;
              }
            })
          }
        }
      }

      $scope.reasonForVisit.showDocumentUploadQrCodePage = function() {
        // console.log('call');
        $scope.reasonForVisit.qrCodeGenerationForDocUpload();
        $rootScope.keyboardHide();
        $scope.reasonForVisit.paymentMethodSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.vitalSectionClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsClass = "modal-slide-out-right";
        $scope.reasonForVisit.medicalDocumentsUploadEnable = true;
        $scope.reasonForVisit.medicalDocumentsUploadClass = "modal-slide-in-left";
        $timeout(function(){
          $scope.reasonForVisit.vitalSectionEnable = false;
          $scope.reasonForVisit.paymentMethodenable = false;
           $scope.reasonForVisit.medicalDocumentsEnable = false;
        },500);
        
        $timeout(function(){ 
          let scroller = new FTScroller(document.getElementById('medical_documents_upload'), {scrollingX: false});
        },100);

        $timeout(() => {
            if ($rootScope.fireStore)
              $scope.initiateFireStore();
            else
              $scope.initiateCrossbar();
        }, 7000);
      }

      $scope.reasonForVisit.qrCodeGenerationForDocUpload = function() {

        let getUserId = HigiKioskStorageService.returnSessionData('user');
        let userId = getUserId['id'];
        let timeStamp = new Date().getTime();      
        var url = "";
        if (HigiKioskStorageService.getSettingsValue("kiosk.api.url") == "https://azureapi.indiahealthlink.com") {
          url ="https://apps.indiahealthlink.com/medi_doc_upload?id="+userId+"/&"+timeStamp; // url for live
        } else {
          url = "https://apps.indiahealthlink.com/qa/medi_doc_upload?id="+userId+"/&"+timeStamp; // url for QA team
        }
        //url = "http://localhost:4201/medi_doc_upload?id="+userId+"/&"+timeStamp;

         console.log("QR Code url : "+url);
        /* GENERATE QR CODE FOR SSO LOGIN */

        const qrCode = new QRCodeStyling({
            width: 180,
            height: 180,
            data: url,
            dotsOptions: {
              type: "square"
            }
        });

        const element = $("#medical-doc-upload-qrcode > canvas"); //document.getElementById("medical-doc-upload-qrcode");
        element.remove();

        qrCode.append(document.getElementById("medical-doc-upload-qrcode"));
      }
      // regeneration of QR code for every 2 min time interval
      setInterval(function(){
        if($scope.reasonForVisit.medicalDocumentsUploadEnable == true){
          $scope.reasonForVisit.qrCodeGenerationForDocUpload();
        }
      },120000);

      $scope.aesEncryption = function(userId) {
        let key = CryptoJS.enc.Utf8.parse( HigiKioskStorageService.getSettingsValue("kiosk.qrCodeWebKey"));
        let iv = CryptoJS.enc.Utf8.parse( HigiKioskStorageService.getSettingsValue("kiosk.qrCodeWebIv"));

        let encrypted = CryptoJS.AES.encrypt(userId, key,
            {
                iv:iv,
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
            }
        )

        return encrypted.toString();
    }

      $scope.reasonForVisit.showMedicalDocumentDetails = function() {
        $scope.reasonForVisit.medicalDocumentsUploadEnable = false;
        $scope.reasonForVisit.showUserMedicalDocumentsDetails();
      }

      $scope.reasonForVisit.checkFreeAccess = function() {
        return new Promise((resolve, reject) => {
          let success = (res) => {
            console.log(res)
            let result = res;
            if(result["status"] == "success" && result["message"] == "Access granted"){
              $rootScope.emailLoginUserFreeServiceAccessGranted = true;
              resolve();
            }else {
              $rootScope.emailLoginUserFreeServiceAccessGranted = false;
              reject("Access denied"); 
            }
          }

          let error = (err) => {
            console.log(err);
            $rootScope.emailLoginUserFreeServiceAccessGranted = false;
            reject();
          }

          let purpose = $rootScope.selected_speciality.toLowerCase();
          // console.log(purpose)
          let json = {
            "email": HigiKioskStorageService.returnSessionData('email'),
            "purpose": purpose
          }
          HigiApiService.isEmailLoginUserFreeServiceAvail(JSON.stringify(json), success, error);
        });
      }
    }
  };
}]);

// alergy: "Corn allergy"
// appointment_duration: "30 Min"
// appointment_end_time: "2020-06-19 14:30:00"
// appointment_start_time: "2020-06-19 14:00"
// appointment_status: "requested"
// consultant_name: "Dr Marimuthu"
// consultant_type: "medical"
// consultation_fees: 400
// ihl_consultant_id: "b7f1ce5a722e4c239aa9453b1444ad14"
// kiosk_checkin_history: (23) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// mode_of_payment: "razorpay"
// specality: "General,cardiology"
// user_ihl_id: "6JnHkzHO8UaHCRfpykp7Cg"
// vendor_consultant_id: "abc"
// vendor_id: "GENIX"
// vendor_name: "GENIX"