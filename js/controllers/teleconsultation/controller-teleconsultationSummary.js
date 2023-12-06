
higiKioskControllers.controller('teleconsultationSummaryController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.consultantName = "";
    $scope.consultantType = "";
    $scope.consultantSpeciality = "";
    $scope.consultantFee;
    $scope.consultantInstruction = "";
    $scope.appointmentDuration;
    $scope.vendorName = "";
    $scope.vendorID;
    $scope.appointmentMode;
    $scope.paymentMode = "";
    $scope.startTime;
    $scope.endTime;
    $scope.followupAvailability;
    $scope.diagnosis = "";
    $scope.isLoading = false;
    $scope.userData = $rootScope.user;
    $scope.userName = $rootScope.user['firstName']+" "+$rootScope.user['lastName'];
    $scope.userMail = $rootScope.user['email'];
    $scope.userAge;
    $scope.userGender;
    $scope.userMobNumber = $rootScope.user['mobileNumber'];
    $scope.logoURLForMedPrint = "";
    $scope.presNumForMedPrint = "";
    $scope.logoURLForLabPrint = "";
    $scope.presNumForLabPrint = "";
    $scope.reasonForVisit;
    $scope.appointment_duration;
    $scope.call_type;
    $scope.vendor_id;
    $scope.appointment_start_time;
    $scope.appointment_end_time;
    $scope.consultation_fees;
    $scope.mode_of_payment;
    $scope.consultation_advice_notes;
    $scope.prevIsVisible = false;
    $scope.nextVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $scope.presc_obj = null;
    $scope.shwMsg = true;
    $scope.doctorSignature = "";
    $scope.prescriptionDataFetch = false;
    $scope.showPrintButton = false;
    $scope.containerMessage = 'Please wait. Preparing your prescription.';
    $scope.consultantNoteOrPrescriptionObj = {};
    $scope.labTests = [];
    $scope.radiologies = [];
    $scope.mehtaBaseServerUrl = "";
    /*
    $rootScope.teleconsultationUserSelectedData = {
        'tele-consultation-selected-doctor':{
            'vendor_id': 'APOLLO'
        },
        'tele-consultation-selected-type': 'Medical Consultation',
    };
    $rootScope.genixConstants.appointmentId = "333ee98cf526248818f382668767735d5";*/
    $scope.init = function () {
        $(".higi_top_nav_ng ").show();
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        let appointment_id = "";
        
        // data hardcode for developemet purpose start
        // $rootScope.teleconsultationUserSelectedData = [];
        // $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = [];
        // $rootScope.selected_speciality = "Cardiology";
        // $rootScope.selectedTeleconsultationService = "global_services"; //ihl_care;
        // HigiKioskStorageService.saveSessionData('affiliateUserId',"6CFPAJk7DUid0VKoNIjqLA")
        // $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] = 'GENIX';
        // // $rootScope.apolloTeleConsultationSourceDetails['appointmentId'] = "092ef1fa05dc4c09acb949eac6a72e1f";
        // $rootScope.genixVideoCallAppointmentId = "7d2d36a5b24b4d369def2846a1e58bbe";
        // data hardcode for developemet purpose end // 

        //date for coupon code print start
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var yyyy = today.getFullYear();
        let shortMonth = today.toLocaleString('en-us', { month: 'short' }); /* Jun */
        $rootScope.today = shortMonth + ' ' + dd + ' ' + yyyy;
        //date for coupon code print end
        console.log($rootScope.teleconsultationUserSelectedData);
        
        if ($rootScope.teleconsultationUserSelectedData != undefined && Object.keys($rootScope.teleconsultationUserSelectedData).length != 0) {
            if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'GENIX') {
                appointment_id = $rootScope.genixVideoCallAppointmentId;
            } else if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO') {
                appointment_id = $rootScope.apolloTeleConsultationSourceDetails['appointmentId'];           
            } else {
                appointment_id = $rootScope.teleConsultationNamespace.prescription_obj['appointment_id'];
            }
        } else {
            appointment_id = $rootScope.teleConsultationNamespace.prescription_obj['appointment_id'];
        }

        //console.log( $rootScope.teleconsultationUserSelectedData);
        //console.log($rootScope.user);
        
        setTimeout(()=>{
            $rootScope.teleConsultationVideoCallServiceProvided();
        },500);
        //33ee98cf526248818f382668767735d5 --> Apollo //"443cfa3892a241bfa35fca590f4d723e" --> Genix
        HigiApiService.getConsultationCallSummary(appointment_id,
            function (resp) {
                //console.log(resp);
                let data = resp.replace(/(&quot\;)/g,"\"");
                let api_res = JSON.parse(data);
                //console.log(api_res);
                //debugger;
                $scope.presc_obj = api_res;

                let accountName = ""; 
                if($rootScope.dataForAppointmentBooking != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"] != undefined ){
                    accountName = $scope.convertCharcterEntityNew($rootScope.dataForAppointmentBooking["doctorInfo"].account_name);
                }
                // Send consultation data to Mehta
                if($rootScope.mehtaFlow && accountName != "" && (accountName == "Dr Mehta's Hospitals Chennai" || accountName == "Dr Mehta's  Hospitals Chennai")){  //&& $rootScope.dataForAppointmentBooking["doctorInfo"] != undefined && $rootScope.dataForAppointmentBooking["doctorInfo"].account_name == "Dr Mehta's Hospitals Chennai"
                    if(getSettingsValue('kiosk.config.mehta.server') =="live"){
                        // production evvironment
                        $scope.mehtaBaseServerUrl = "https://mehpatapp1.drmehtas.com:8443/MEHTAHMS/TApiQuery";
                    } else {
                        // test evvironment
                        // $scope.mehtaBaseServerUrl = "https://mehcoreapp.drmehtas.com:8443/MEHTATEST/TApiQuery";
                        $scope.mehtaBaseServerUrl = "http://182.75.115.94:8081/MEHTAQANEW/TApiQuery"; // QA API Public to parse multiple object
                    }
                  $scope.sendPrescriptionDetailsToMehta();
                }              
                
                if (typeof (api_res) === "object") {
                    $scope.initSuccess(api_res);
                }
                else {
                    $scope.initError();
                }
            });
    }

    $scope.initError = function() {
        $scope.containerMessage = 'Error loading data';
    };

    $scope.initSuccess = function (receivedData) {
        // console.log(" After Consultation receivedData" +receivedData);
        $scope.shwMsg = false;
        $scope.containerMessage = '';
        $rootScope.isVisibleAudio = true;
        $rootScope.homeButtonShow = true;
        $rootScope.isVisibleLanguageButton = false;
        
        $scope.showPrintButton = true;

        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] == 'Health Consultation') {$scope.nextVisible = false;}
        else if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] == 'Medical Consultation') {$scope.nextVisible = true;}

        $scope.isPerscriptionGiven = true;
        $scope.consultantNoteOrPrescriptionObj = receivedData;
        $rootScope.callSummary = receivedData;

        $scope.consultantName = receivedData['message'].consultant_name;
        $scope.consultantType = receivedData['message'].consultant_type;
        $scope.consultantSpeciality = receivedData['message'].specality;
        $scope.consultantFee = receivedData['message'].consultation_fees;
        $scope.consultantInstruction = receivedData['message'].consultation_advice_notes;
        $scope.appointmentDuration = receivedData['message'].appointment_duration;
        $scope.vendorName = receivedData['message'].vendor_name;
        $scope.vendorID = receivedData['message'].vendor_id;
        $scope.appointmentMode = receivedData['message'].appointment_model;
        $scope.paymentMode = receivedData['message'].mode_of_payment;
        $scope.followupAvailability = receivedData['message'].followup_availablity_till_date;
        $scope.diagnosis = receivedData['message'].diagnosis;
        $scope.formatDate(new Date(receivedData['message'].appointment_start_time), new Date(receivedData['message'].appointment_end_time));
        $scope.isLoading = false;
        $scope.reasonForVisit = receivedData['message'].reason_for_visit;
        $scope.appointment_duration = receivedData['message'].appointment_duration;
        $scope.call_type = receivedData['message'].call_type;
        $scope.vendor_id = receivedData['message'].vendor_id;
        $scope.appointment_start_time = receivedData['message'].appointment_start_time;
        $scope.appointment_end_time = receivedData['message'].appointment_end_time;
        $scope.consultation_fees = receivedData['message'].consultation_fees;
        $scope.mode_of_payment = receivedData['message'].mode_of_payment;
        $scope.consultation_advice_notes = receivedData['message'].consultation_advice_notes;
        $scope.medications = receivedData['message'].prescription;
        $scope.adviceToPatient = receivedData['message'].advice_to_patient;
        $scope.patientDiagnosis = receivedData['message'].patient_diagnosis;
        $scope.patientSymptoms = receivedData['message'].patient_symptoms;
        $scope.diagnosticTest = JSON.parse(receivedData['message'].lab_tests);
        $scope.consultantEmail = receivedData['consultant_details'].consultant_email;
        $scope.consultantMobile = receivedData['consultant_details'].consultant_mobile;        
        $scope.reasonForVisit = receivedData['message'].reason_for_visit;
        $scope.callStartTime = receivedData['message'].call_start_time;
        $scope.userEmail = receivedData['user_details'].user_email;
        $scope.appointmentIdForMedPrint = receivedData['message'].appointment_id;
        $scope.instructionNotes = [];

        // for apollo couponcode print start
        if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO') {
            $rootScope.couponDataPrintObj = {};
            $rootScope.couponDataPrintObj.consultantName = receivedData['message'].consultant_name;
            $rootScope.couponDataPrintObj.speciality = receivedData['message'].specality;
            $rootScope.couponDataPrintObj.consultantEmail = ""; //receivedData['consultant_details'].consultant_email;
            $rootScope.couponDataPrintObj.consultantMobile = receivedData['consultant_details'].consultant_mobile;
            let userBasicDetails = HigiKioskStorageService.returnSessionData('user');
            $rootScope.couponDataPrintObj.patientFirstName = (userBasicDetails.firstName != undefined && userBasicDetails.firstName != null && userBasicDetails.firstName.trim().length > 0) ? userBasicDetails.firstName : "";
            $rootScope.couponDataPrintObj.patientLastName =  (userBasicDetails.lastName != undefined && userBasicDetails.lastName != null && userBasicDetails.lastName.trim().length > 0) ? userBasicDetails.lastName : "";
            $rootScope.couponDataPrintObj.patientEmail = (userBasicDetails.email != undefined && userBasicDetails.email != null && userBasicDetails.email.trim().length > 0) ? userBasicDetails.email : "";
            $rootScope.couponDataPrintObj.patientMobileNumber = (userBasicDetails.mobileNumber != undefined && userBasicDetails.mobileNumber != null && userBasicDetails.mobileNumber.trim().length == 10) ? userBasicDetails.mobileNumber : "";      
            if(userBasicDetails['gender'] != "" && userBasicDetails['gender'] != undefined) {
                if(userBasicDetails['gender'].toLowerCase() === 'm') $rootScope.couponDataPrintObj.patientGender = "Male";
                else if(userBasicDetails['gender'].toLowerCase() === 'f') $rootScope.couponDataPrintObj.patientGender = "Female";
            }
            let dateString = $scope.appointment_start_time.split(' ');
            let date = dateString[0].split('-');
            let time = `${dateString[1]} ${dateString[2]}`;
            $rootScope.couponDataPrintObj.consultationDateTime = `${date[2]}-${date[1]}-${date[0]} ${time}`;
            if(userBasicDetails['dateOfBirth'] != "" && date[0] != "") $rootScope.couponDataPrintObj.patientAge = $scope.calculatePatientAge(userBasicDetails['dateOfBirth'], date[0]);
            $rootScope.couponDataPrintObj.logoUrl = $rootScope.printTemplateLogo;
        }
        // for apollo couponcode print end

        if(receivedData.message.lab_tests != null && receivedData.message.lab_tests != "") $scope.lab = JSON.parse(receivedData.message.lab_tests);
        if(receivedData.message.notes != undefined && receivedData.message.notes != null && receivedData.message.notes != "" && receivedData.message.notes.trim().length > 0){
            $scope.instructionNotes = JSON.parse(receivedData.message.notes);
        }
        if (receivedData.message.lab_tests != null && receivedData.message.lab_tests != undefined && receivedData.message.lab_tests.trim().length > 0 ) {
            if ((JSON.parse(receivedData.message.lab_tests)).length > 0) {
                $scope.labTests = JSON.parse(receivedData.message.lab_tests);
            }
        }
        if (receivedData.message.radiology != null && receivedData.message.radiology != undefined && receivedData.message.radiology.trim().length > 0 ) {
            if ((JSON.parse(receivedData.message.radiology)).length > 0) {
                $scope.radiologies = JSON.parse(receivedData.message.radiology);
            }
        }
        if(receivedData['consultant_details'].rmp_id != undefined) $scope.consultantRmpId = receivedData['consultant_details'].rmp_id;
        else $scope.consultantRmpId = "";
       /*$scope.medications = [
            {
                "drug_name": "Paracetamol 250mg/5ml Syrup",
                "dosage": 12,
                "units": "ML",
                "strength": "250mg/5ml",
                "frequency": "Once in the week",
                "whenToTake": "N/A",
                "notes": "",
                "startDate": 1605465000,
                "endDate": 1605551399
            },
            {
                "drug_name": "colopol",
                "dosage": 2,
                "units": "mg",
                "strength": "250mg/5ml",
                "frequency": "Once in the week",
                "whenToTake": "N/A",
                "notes": "Paragraphs are the building blocks of papers. ",
                "startDate": 1605465000,
                "endDate": 1605551399
            }
        ]*/

        $timeout(function(){
            $rootScope.loadModal({id: 'teleConsultationSummaryRatings'});
        }, 0000);
        
        /*$timeout(function(){
            $scope.scroll = new iScroll('tele_consultation_summary_main_container', {hScroll:false, scrollbarClass:'tele_consultation_summary_scroll_bar', vScroll : true, vScrollbar:true});
            if($scope.scroll['vScrollbarWrapper'] == undefined){
                $timeout(function(){$scope.scroll.refresh();},2000);
            }
        },0000);*/
        $timeout(function(){ 
            let scroller = new FTScroller(document.getElementById('tele_consultation_summary_main_container'), {scrollingX: false});
        },100);

        HigiApiService.getDoctorSignature(receivedData['message'].ihl_consultant_id, 
        function(data) {
            //console.log(data);
            $scope.prescriptionDataFetch = true;
             if(data.trim().length > 0){
                let imageDataObj = JSON.parse(data.replace(/(&quot\;)/g,"\""));
                //console.log(imageDataObj);
                $scope.doctorSignature = "data:"+imageDataObj.ContentType+";base64,"+ imageDataObj.Content;
                //console.log($scope.doctorSignature);
                if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] != 'IHL') {
                    $scope.getbase64PdfData();
                    $scope.getbase64PdfLabTemplate();
                };
            }else{
                if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] != 'IHL') {
                    $scope.getbase64PdfData();
                    $scope.getbase64PdfLabTemplate();
                };
            }
        }, 
        function(error) {
            //console.log(error);
            $scope.prescriptionDataFetch = true;
            //console.log(error);
            $scope.doctorSignature = '';
            if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] != 'IHL') {
                $scope.getbase64PdfData();
                $scope.getbase64PdfLabTemplate();
            };
        });   
    }

    $scope.printPerscription = function(){
        // Disabling the print button //
        $scope.disabling_print_btn = 'disable'
		setTimeout(function () {
            $scope.disabling_print_btn = ''
		}, 10000)
        // Disabling the print button END //
        //console.log($scope.presc_obj);
        //window.print();
        $rootScope.isVisibleAudio = true;
        //$rootScope.homeButtonShow = true;
        if($scope.vendorName != "APOLLO"){
            //let content = document.getElementById('teleConsulationSummaryprintPerscription').innerHTML;
            //let html_template = "<!DOCTYPE html><html><body style='width:372px; box-sizing: border-box;'>" + content + "</body></html>";
            $scope.printConsultationNoteOrPrescription();
        } else if($scope.vendorName == "APOLLO") {
            if($rootScope.externalPrinterName == ""){
                let content = document.getElementById('teleConsulationSummaryprintPerscription').innerHTML;
                let html_template = "<!DOCTYPE html><html><body style='width:372px; box-sizing: border-box;'>" + content + "</body></html>";
                $scope.printConsultationNoteOrPrescription();
            } else {
                //$rootScope.apolloPrescriptionUrl = "https://blob.medeintegra.dev/blob/mede_blob_7b9b1175-1a61-4ebe-9187-0dc22fe8e4c3.pdf";           
                if($rootScope.apolloPrescriptionUrl != ""){
                    var urlStr = $rootScope.apolloPrescriptionUrl;
                    var prescriptionUrl = urlStr.replace("https", "http"); 
                    var externalPrinterName = $rootScope.externalPrinterName;
                    JkioskService.apolloA4print($scope.apolloA4printRes,  prescriptionUrl, externalPrinterName);
                } else {
                    console.log("$rootScope.apolloPrescriptionUrl = " + $rootScope.apolloPrescriptionUrl);
                }   
            }
        }

    }

    $scope.labOrderBtnClick = function() {
        $rootScope.terms_condition = false;
        $rootScope.showByMedUI = false;
        $rootScope.showLabOrderUI = true;
        $rootScope.loadModal({id: 'teleConsultationSummaryLabOrder'});
    }

    $scope.nextButtonClick = function () {
        $rootScope.terms_condition = false;
        $rootScope.showByMedUI = true;
        $rootScope.showLabOrderUI = false;
        $rootScope.loadModal({id: 'teleConsultationSummaryBuyMedicine'});
    }

    $scope.prevButtonClick = function () {
        // window.location = '#/ihl-teleconsultation-book-appointment';
    }

    let basicInfo = HigiKioskStorageService.returnSessionData('userBasicInfo');
    if ($rootScope.user != undefined && $rootScope.user != null && $rootScope.user['gender'] != undefined && $rootScope.user['gender'] != null && $rootScope.user['gender'].trim().length > 0) {
       if($rootScope.user['gender'] == "m") {
            $scope.userGender = "Male";
        } else {
            $scope.userGender = "Female";
        } 
    }else if (basicInfo != undefined && basicInfo != null && basicInfo['gender'] != undefined && basicInfo['gender'] != null && basicInfo['gender'].trim().length > 0) {
        if(basicInfo['gender'] == "m") {
            $scope.userGender = "Male";
        } else {
            $scope.userGender = "Female";
        } 
    }else{
        $scope.userGender = "";
    }


    $scope.calculateAge = function() {
        let currentDate = new Date();
        let dob = "";
        let calculatedAge = "";
        let basicInfo = HigiKioskStorageService.returnSessionData('userBasicInfo');

        if ($rootScope.user != undefined && $rootScope.user != null && $rootScope.user['dateOfBirth'] != undefined && $rootScope.user['dateOfBirth'] != null && $rootScope.user['dateOfBirth'].trim().length > 0) {
            dob = $rootScope.user['dateOfBirth'].split('/');
            calculatedAge = currentDate.getFullYear() - parseInt(dob[2]);
        }else if (basicInfo != undefined && basicInfo != null && basicInfo['dateOfBirth'] != undefined && basicInfo['dateOfBirth'] != null && basicInfo['dateOfBirth'].trim().length > 0) {
            dob = basicInfo['dateOfBirth'].split('/');
            calculatedAge = currentDate.getFullYear() - parseInt(dob[2]);
        }else{
           calculatedAge = ""; 
        }
       
        $scope.userAge = calculatedAge;
    }
    $scope.calculateAge();

    //calculate date - getting user friendly date format
    $scope.formatDate = function(start_time, end_time) {
        //calculate startTime & appointmentDate
        let splitDateTime = start_time.toString().split(' ');
        $scope.appointmentDate = splitDateTime[2] + "-" + splitDateTime[1] + "-" + splitDateTime[3];
        $scope.startTime = start_time.toLocaleString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        //calculate endTime
        $scope.endTime = end_time.toLocaleString('en-IN', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
        //console.log(start_time);
    };

    $scope.getbase64PdfData = async function(){
        $scope.presNumForMedPrint = "Not Available";
        $scope.logoURLForMedPrint = "";
        await (PrescriptionLogoUrl()).then(val=>{
            $scope.logoURLForMedPrint = val;
        });
        //await (prescriptionNum()).then(val => $scope.presNumForMedPrint = val);
        $scope.presNumForMedPrint = $rootScope.prescriptionNumberFor1mg;

        let content = document.getElementById('teleConsulationSummaryprintPerscription').innerHTML;
        let html_template = "<!DOCTYPE html><html><body>" + content + "</body></html>";
        let jsonData = {
            "htmlstring": html_template
        };
        jsonData = JSON.stringify(jsonData);

        //console.log(html_template);
        // for Prescription share to third party (buy prescrtion)
        const promise_base64 = ()=> {
            return new Promise((resolve, reject)=>{
                HigiApiService.getbase64Pdf(jsonData, 
                    function(data) {
                        //console.log(data);
                        $rootScope.prescriptionObjectFor1mg = data;
                        $rootScope._is_base64_pdf_available = true;
                        resolve("success");
                    }, 
                    function(error) {
                        //console.log(error);
                        $rootScope.prescriptionObjectFor1mg = "";
                        $rootScope._is_base64_pdf_available = false;
                        resolve("error");
                    }
                ); 
            }); 
        }
         
        
        //for send the lab & prescription data to user email sstart
        let prescription_num = "Not Available";
        let logoUrlValue = "";
        await (PrescriptionLogoUrl()).then(val=>{
            logoUrlValue = val;
        });
        //await (prescriptionNum()).then(val => prescription_num = val);
        prescription_num = $rootScope.prescriptionNumberFor1mg;

        $scope.consultantNoteOrPrescriptionObj.patient_gender = HigiKioskStorageService.returnSessionData('gender');
        $scope.consultantNoteOrPrescriptionObj.patient_dob = HigiKioskStorageService.returnSessionData('birthdate');
        $scope.consultantNoteOrPrescriptionObj.consultant_speciality = $rootScope.selected_speciality;
        $scope.consultantNoteOrPrescriptionObj.prescription_num = $rootScope.prescriptionNumberFor1mg;
        //$scope.consultantNoteOrPrescriptionObj.rmpId = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['RMP_ID'];
        $scope.consultantNoteOrPrescriptionObj.doctorAddress = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['consultant_address'];
        $scope.consultantNoteOrPrescriptionObj.doctorSignature = $scope.doctorSignature;
        
        $rootScope.printPrescriptionConstants = new PrintPrescriptionConstants($scope.consultantNoteOrPrescriptionObj, "summaryPage", logoUrlValue);

        let emailContent = document.getElementById('ihl-genix-pres-print-template-a4paper').innerHTML;
        let email_html_template = "<!DOCTYPE html><html><body>" + emailContent + "</body></html>";
        let emailData = {
            "htmlstring": email_html_template
        };
        emailData = JSON.stringify(emailData);

        const promise_lab_medication_email_base64 = ()=> {
            return new Promise((resolve, reject)=>{
                HigiApiService.getbase64Pdf(emailData, 
                    function(data) {
                        //console.log(data);
                        $scope.prescrionEmailData = data;
                        resolve("success");
                    }, 
                    function(error) {
                        $scope.prescrionEmailData = "";
                        resolve("error");
                    }
                ); 
            }); 
        }
        //for send the lab & prescription data to user email end

        await promise_lab_medication_email_base64().then(val=>{
            console.log(val);
            // $scope.sharePerscription();
            $scope.sharePerscriptionToUser();
        })
    };
    $scope.sharePerscriptionToUser = function(){        
        let userDetails = HigiKioskStorageService.returnSessionData('user');
        user_first_name = (userDetails.firstName != undefined && userDetails.firstName != null && userDetails.firstName.trim().length > 0) ? userDetails.firstName : "";
        user_last_name =  (userDetails.lastName != undefined && userDetails.lastName != null && userDetails.lastName.trim().length > 0) ? userDetails.lastName : "";
        user_email = (userDetails.email != undefined && userDetails.email != null && userDetails.email.trim().length > 0) ? userDetails.email : "";
        user_MobileNumber = (userDetails.mobileNumber != undefined && userDetails.mobileNumber != null && userDetails.mobileNumber.trim().length == 10) ? userDetails.mobileNumber : "";      

        let jsonData = {
            "first_name": user_first_name,
            "last_name": user_last_name,
            "email": user_email,
            "mobile": user_MobileNumber,
            "prescription_number": $rootScope.prescriptionNumberFor1mg,
            "prescription_base64": $scope.prescrionEmailData,
            "security_hash": "",
            "kiosk_id": "",
            "affiliation_unique_name": "",
            "order_type": ""
        };

        console.log(jsonData)

        jsonData = JSON.stringify(jsonData);

        HigiApiService.sendPrescriptionToUser(jsonData, 
        function(data) {
            console.log(data);
            console.log(data.status)
        }, 
        function(error) {
            console.log(error);
        }); 
    }

    $scope.getbase64PdfLabTemplate = async function(){
        $scope.presNumForLabPrint = "Not Available";
        $scope.logoURLForLabPrint = "";
        await (PrescriptionLogoUrl()).then(val=>{
            $scope.logoURLForLabPrint = val;
        });
        //await (prescriptionNum()).then(val => $scope.presNumForLabPrint = val);
        $scope.presNumForLabPrint = $rootScope.prescriptionNumberFor1mg;

        let content = document.getElementById('teleConsulationSummaryLabReports').innerHTML;
        let html_template = "<!DOCTYPE html><html><body>" + content + "</body></html>";
        let jsonData = {
            "htmlstring": html_template
        };
        jsonData = JSON.stringify(jsonData);

        //console.log(html_template);

        HigiApiService.getbase64Pdf(jsonData, 
        function(data) {
            //console.log(data);
            $rootScope.labObjectFor1mg = data;
            $rootScope._is_base64_labpdf_available = true;
        }, 
        function(error) {
            //console.log(error);
            $rootScope.labObjectFor1mg = "";
            $rootScope._is_base64_labpdf_available = false;
        });   
    };

    $scope.printConsultationNoteOrPrescription = async function() {
        let prescription_num = "Not Available";
        let logoUrlValue = "";
        await (PrescriptionLogoUrl()).then(val=>{
            logoUrlValue = val;
        });
        //await (prescriptionNum()).then(val => prescription_num = val);
        prescription_num = $rootScope.prescriptionNumberFor1mg;

        $scope.consultantNoteOrPrescriptionObj.patient_gender = HigiKioskStorageService.returnSessionData('gender');
        $scope.consultantNoteOrPrescriptionObj.patient_dob = HigiKioskStorageService.returnSessionData('birthdate');
        $scope.consultantNoteOrPrescriptionObj.consultant_speciality = $rootScope.selected_speciality;
        $scope.consultantNoteOrPrescriptionObj.prescription_num = $rootScope.prescriptionNumberFor1mg;
        //$scope.consultantNoteOrPrescriptionObj.rmpId = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['RMP_ID'];
        $scope.consultantNoteOrPrescriptionObj.doctorAddress = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['consultant_address'];
        $scope.consultantNoteOrPrescriptionObj.doctorSignature = $scope.doctorSignature;
        
        $rootScope.printPrescriptionConstants = new PrintPrescriptionConstants($scope.consultantNoteOrPrescriptionObj, "summaryPage", logoUrlValue);

        console.log($rootScope.printPrescriptionConstants);
        console.log($scope.vendorName);
        console.log($rootScope.externalPrinterName);

        setTimeout(()=>{
            if($scope.vendorName == "GENIX" && $rootScope.externalPrinterName == ''){

                console.log("$scope.vendorName == GENIX && $rootScope.externalPrinterName");
                let content = document.getElementById('ihl-genix-pres-print-template-a4paper').innerHTML;
                let thermal_template = document.getElementById("ihl-genix-pres-print-template-thermalpaper").innerHTML;
                // let html_template = "<!DOCTYPE html><html><body style='box-sizing: border-box;'>" + content + "</body></html>";
                // console.log(html_template);
                // console.log(thermal_template);
                console.log(content);
                var externalPrinterName = $rootScope.externalPrinterName;
                //console.log(externalPrinterName,"486");
                //JkioskService.genixA4print(scope.genixA4printRes,  html_template, externalPrinterName);

                let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;box-sizing: border-box;'>"+content+"</body></html>";
                let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;box-sizing: border-box;'>"+thermal_template+"</body></html>";

                console.log(a4_html_template);
                console.log(thermal_html_template);

                const printerTemplateObject = { 
                    thermalPrinterTemplate: thermal_html_template,
                    a4PrinterTemplate: a4_html_template
                  };
                //coding for genix template makes conflicts for passing dynamic data in printPerscription() so made changes here for externalA4printer for Genix
                // html_template = a4_html_template;
              // console.log("a4_html_template inside func : ",a4_html_template);
      
              var externalPrinterName = $rootScope.externalPrinterName; 
              // console.log("$scope.genixA4printRes : ",$scope.genixA4printRes);  
              // JkioskService.genixA4print(scope.genixA4printRes, html_template, externalPrinterName);
              // var element = document.getElementById("A4TemplateForInvasiveParametersForExternalPrinters");
              var element = printerTemplateObject['a4PrinterTemplate'];

              var opt = {
                margin:       0,
                filename:     'myfile.pdf',
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                // pagebreak:    { mode: 'avoid-all', before: '#page2el' },
                // pagebreak: {
                //     mode: ['avoid-all', 'css', 'legacy']
                // },
                jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' } //letter
              };
            
              // alert("starts pdf downloaded");
              // New Promise-based usage:
              // html2pdf().set(opt).from(element).save();
              html2pdf().from(element).outputPdf().then(function(pdf) {
                // This logs the right base64
                // console.log("btoa(pdf)");
               // alert("btoa(pdf)");
                // console.log(btoa(pdf));
                var jsonData = {"base64": btoa(pdf)};
                console.log(jsonData);
                $.ajax({
                //   url: "http://localhost/ihl_kiosk_ui_invasive/server/Base64ToPDF.php",  //Dev Server
                  url: "http://localhost:9000/server/Base64ToPDF.php",   // Kiosk Machine 
  
                  type: "POST",
                  cache: false,
                  dataType: 'json',
                  data:jsonData,
                  headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                  success: function (html) {
                      // console.log(html);
                      //var jsonData = JSON.parse(html);                
                      if(html['status'] == "S"){                  
                        //   var pdfFilePath = "file:///D:/Xampp/htdocs/ihl_kiosk_ui_invasive/server/test.pdf";  // Dev Server
                          var pdfFilePath = "file:///C:/kiosk/Apps/Almond_IHL_UI/server/test.pdf";   // Kiosk Machine
     
                          var externalPrinterName = $rootScope.externalPrinterName;
                          console.log("apolloA4print welcome ctrl");
                          JkioskService.apolloA4print($scope.apolloA4printRes,  pdfFilePath, externalPrinterName);
                      } else {
                          console.log("pdf file not created.. Someting went wrong");
                          // alert("Something Went wrong")
                          $rootScope.a4SnackBarAlertText = "Something Went Wrong. Some Technical Issue";
                          let snackbar = document.getElementById("snackbar");
                          setTimeout(function(){
                              snackbar.className = "show";
                          },2000);
                          setTimeout(function(){
                              snackbar.className = snackbar.className.replace("show", ""); 
                              $rootScope.a4SnackBarAlertText = "";
                          },6000);
                        }
                  },
                  error: function(err){    
                      console.log(err);
                      console.log("unable to connect server");
                      // alert("Unable to connect the server");
                      $rootScope.a4SnackBarAlertText = "Something Went Wrong. Some Technical Issue";
                      let snackbar = document.getElementById("snackbar");
                          setTimeout(function(){
                              snackbar.className = "show";
                          },2000);
                          setTimeout(function(){
                              snackbar.className = snackbar.className.replace("show", ""); 
                              $rootScope.a4SnackBarAlertText = "";
                          },6000);
                  }
              });
              });
                
            }else{
              $rootScope.printerService.getMultiPrinterConfigurationDetails("vitalOrPrescription", //invoice
                (response) =>{//thermal, a4, //multiPrinter --> if both available.
                  //alert("success "+ response);
                  let a4_template = "";
                  let thermal_template = "";
                  if($scope.consultantNoteOrPrescriptionObj.consultant_details.vendor_name != "APOLLO") {
                      a4_template = document.getElementById("ihl-genix-pres-print-template-a4paper").innerHTML;
                      thermal_template = document.getElementById("ihl-genix-pres-print-template-thermalpaper").innerHTML;
                    //   console.log("ihl-genix-pres-print-template-thermalpaperconsoleValue",thermal_template);
                  } else if($scope.consultantNoteOrPrescriptionObj.consultant_details.vendor_name == "APOLLO") {
                      a4_template = document.getElementById("apollo-prescription-template-a4paper").innerHTML;
                      thermal_template = document.getElementById("apollo-prescription-template-thermalpaper").innerHTML;
                  }

                  let a4_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='height:470px;margin-left:0px;box-sizing: border-box;'>"+a4_template+"</body></html>";
                  let thermal_html_template = "<!DOCTYPE html><html><head><meta http-equiv='Content-type' content='text/html;charset=UTF-8'></head><body style='width:372px;height:500px;margin-left:13px;box-sizing: border-box;'>"+thermal_template+"</body></html>";

                  const printerTemplateObject = {
                    thermalPrinterTemplate: thermal_html_template,
                    a4PrinterTemplate: a4_html_template
                  };

                  if (response == "multiPrinter") {
                    $rootScope.printerService.printerTemplateObject = printerTemplateObject;
                    //document.getElementById("kiosk_modal_popup").style.visibility = "hidden";
                    $('#multiPrinterAvailabilityPopupVisible').show();
                  }else{
                    $rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                  }
                  
                  //$rootScope.printerService.invokeJkioskPrinterService(response, printerTemplateObject);
                }, 
                (error) => {//technical_issue, paper_not_available
                    if(error == "technical_issue"){
                        $rootScope.snackBarAlertText = "Sorry! No printer has been detected.";
                    }else{
                        $rootScope.snackBarAlertText = "Sorry! Paper is not available in printer.";
                    }
                    let snackbar = document.getElementById("snackbar");
                    setTimeout(function(){
                        snackbar.className = "show";
                    },2000);
                    setTimeout(function(){
                        snackbar.className = snackbar.className.replace("show", ""); 
                        $rootScope.snackBarAlertText = "";
                    },6000);
                }
              );
          }
        },1500);
    }

    function PrescriptionLogoUrl(){
        let account_id = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['account_id'] || "123456";
        console.log(account_id);
        let logo = $rootScope.printTemplateLogo; 
        return new Promise((resolve, reject)=>{
            let success = (res) =>{
                //console.log(res);
                if (res == "invalid accountId") {
                    resolve(logo);
                }else{
                    resolve(res);
                }
            }

            let error = (err) =>{
                //console.log(err);
                resolve(logo);
            }

            HigiApiService.getPrescriptionLogoUrl(account_id.toString(), success, error);
        })
    }

    function prescriptionNum() {
        return new Promise((resolve, reject)=>{
            let success = (res) =>{
                //console.log(res);
                if(res != null) {
                    if(res.length != 0) {
                        let obj = res.filter(data => {
                            if(data.ihl_appointment_id === $scope.consultantNoteOrPrescriptionObj.message.appointment_id) return data;
                        });
                        if(obj[0]['invoice_number'] != undefined) resolve(obj[0]['invoice_number']);                            
                        else resolve("Not Available");
                    }
                }                
            }

            let error = (err) =>{
                console.log(err);
                resolve("Not Available");
            }

            HigiApiService.getPrescriptionNum($scope.consultantNoteOrPrescriptionObj.message.user_ihl_id, success, error);                
        })
    }

    $scope.calculatePatientAge=function(dob, appointment_year) {
		// let today = new Date();
		let errorList = [null, undefined, ""];		
		if(!errorList.includes(dob) && !errorList.includes(appointment_year)) {
			//let age = today.getFullYear() - dob.split('/')[2];
			let age = appointment_year - dob.split('/')[2];
            return age;
		}
	}

    $scope.sharePerscription = function(){
        console.log("inside sharePrescription function");
        console.log($scope.prescrionEmailData);
        let prescriptionObject = $scope.prescrionEmailData;
        console.log(prescriptionObject.toString());
        let userDetails = HigiKioskStorageService.returnSessionData('user');
        let salt = "f1nd1ngn3m0";
        
        let patientFirstName = "";
        let patientLastName = "";
        let patientEmail = "";
        let patientMobileNumber = "";
       
        patientFirstName = (userDetails.firstName != undefined && userDetails.firstName != null && userDetails.firstName.trim().length > 0) ? userDetails.firstName : "";
        patientLastName =  (userDetails.lastName != undefined && userDetails.lastName != null && userDetails.lastName.trim().length > 0) ? userDetails.lastName : "";
        patientEmail = (userDetails.email != undefined && userDetails.email != null && userDetails.email.trim().length > 0) ? userDetails.email : "";
        patientMobileNumber = (userDetails.mobileNumber != undefined && userDetails.mobileNumber != null && userDetails.mobileNumber.trim().length == 10) ? userDetails.mobileNumber : "";      

        let dataToFindHash = patientEmail + patientMobileNumber + salt;

        let encodedPrescription = prescriptionObject;
        let stringHash = $scope.SHA256(dataToFindHash);
        //console.log(encodedPrescription);
        //console.log(stringHash);

        let prescriptionObjectWithDetails = {
          "first_name": patientFirstName,
          "last_name": patientLastName,
          "email": patientEmail,
          "mobile": patientMobileNumber,
          "prescription_number": $rootScope.prescriptionNumberFor1mg,
          "prescription_base64": encodedPrescription.toString(),
          "security_hash": stringHash.toString(),
          "kiosk_id": $rootScope.uniqueKioskId || "",
          "affiliation_unique_name": "",
          "order_type": "user",
          "affiliation_code": ""
        }

        console.log(prescriptionObjectWithDetails);

        let success = (response)=>{
          console.log(response);
        };
        let error = (error)=>{
          console.log(error);
        };

        HigiApiService.sharePrescriptionTo1mg(JSON.stringify(prescriptionObjectWithDetails), success, error);
    }

    //code of SHA256 function 
    $scope.SHA256 = function(s){
        var chrsz=8;var hexcase=0;function safe_add(x,y){var lsw=(x&0xFFFF)+(y&0xFFFF);var msw=(x>>16)+(y>>16)+(lsw>>16);return(msw<<16)|(lsw&0xFFFF);} 
        function S(X,n){return(X>>>n)|(X<<(32-n));} 
        function R(X,n){return(X>>>n);} 
        function Ch(x,y,z){return((x&y)^((~x)&z));} 
        function Maj(x,y,z){return((x&y)^(x&z)^(y&z));} 
        function Sigma0256(x){return(S(x,2)^S(x,13)^S(x,22));} 
        function Sigma1256(x){return(S(x,6)^S(x,11)^S(x,25));} 
        function Gamma0256(x){return(S(x,7)^S(x,18)^R(x,3));} 
        function Gamma1256(x){return(S(x,17)^S(x,19)^R(x,10));} 
        function core_sha256(m,l){var K=new Array(0x428A2F98,0x71374491,0xB5C0FBCF,0xE9B5DBA5,0x3956C25B,0x59F111F1,0x923F82A4,0xAB1C5ED5,0xD807AA98,0x12835B01,0x243185BE,0x550C7DC3,0x72BE5D74,0x80DEB1FE,0x9BDC06A7,0xC19BF174,0xE49B69C1,0xEFBE4786,0xFC19DC6,0x240CA1CC,0x2DE92C6F,0x4A7484AA,0x5CB0A9DC,0x76F988DA,0x983E5152,0xA831C66D,0xB00327C8,0xBF597FC7,0xC6E00BF3,0xD5A79147,0x6CA6351,0x14292967,0x27B70A85,0x2E1B2138,0x4D2C6DFC,0x53380D13,0x650A7354,0x766A0ABB,0x81C2C92E,0x92722C85,0xA2BFE8A1,0xA81A664B,0xC24B8B70,0xC76C51A3,0xD192E819,0xD6990624,0xF40E3585,0x106AA070,0x19A4C116,0x1E376C08,0x2748774C,0x34B0BCB5,0x391C0CB3,0x4ED8AA4A,0x5B9CCA4F,0x682E6FF3,0x748F82EE,0x78A5636F,0x84C87814,0x8CC70208,0x90BEFFFA,0xA4506CEB,0xBEF9A3F7,0xC67178F2);var HASH=new Array(0x6A09E667,0xBB67AE85,0x3C6EF372,0xA54FF53A,0x510E527F,0x9B05688C,0x1F83D9AB,0x5BE0CD19);var W=new Array(64);var a,b,c,d,e,f,g,h,i,j;var T1,T2;m[l>>5]|=0x80<<(24-l % 32);m[((l+64>>9)<<4)+15]=l;for(var i=0;i<m.length;i+=16){a=HASH[0];b=HASH[1];c=HASH[2];d=HASH[3];e=HASH[4];f=HASH[5];g=HASH[6];h=HASH[7];for(var j=0;j<64;j++){if(j<16)W[j]=m[j+i];else W[j]=safe_add(safe_add(safe_add(Gamma1256(W[j-2]),W[j-7]),Gamma0256(W[j-15])),W[j-16]);T1=safe_add(safe_add(safe_add(safe_add(h,Sigma1256(e)),Ch(e,f,g)),K[j]),W[j]);T2=safe_add(Sigma0256(a),Maj(a,b,c));h=g;g=f;f=e;e=safe_add(d,T1);d=c;c=b;b=a;a=safe_add(T1,T2);} 
        HASH[0]=safe_add(a,HASH[0]);HASH[1]=safe_add(b,HASH[1]);HASH[2]=safe_add(c,HASH[2]);HASH[3]=safe_add(d,HASH[3]);HASH[4]=safe_add(e,HASH[4]);HASH[5]=safe_add(f,HASH[5]);HASH[6]=safe_add(g,HASH[6]);HASH[7]=safe_add(h,HASH[7]);} 
        return HASH;} 
        function str2binb(str){var bin=Array();var mask=(1<<chrsz)-1;for(var i=0;i<str.length*chrsz;i+=chrsz){bin[i>>5]|=(str.charCodeAt(i/chrsz)&mask)<<(24-i % 32);} 
        return bin;} 
        function Utf8Encode(string){string=string.replace(/\r\n/g,'\n');var utftext='';for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);} 
        else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);} 
        else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}} 
        return utftext;} 
        function binb2hex(binarray){var hex_tab=hexcase?'0123456789ABCDEF':'0123456789abcdef';var str='';for(var i=0;i<binarray.length*4;i++){str+=hex_tab.charAt((binarray[i>>2]>>((3-i % 4)*8+4))&0xF)+ 
        hex_tab.charAt((binarray[i>>2]>>((3-i % 4)*8))&0xF);} 
        return str;} 
        s=Utf8Encode(s);return binb2hex(core_sha256(str2binb(s),s.length*chrsz));
    }

    $scope.sendPrescriptionDetailsToMehta = async function(){
        // $rootScope.mehtaPatientMRNo = 88602; // for testing purpose
        $rootScope.mehtaPatientMRNo = ($rootScope.mehtaPatientMRNo != "")?$rootScope.mehtaPatientMRNo : "";
        try{
            let sentRadiology = "";
            if($scope.presc_obj["message"]["radiology"] !=[] && $scope.presc_obj["message"]["radiology"] !="[]" && $scope.presc_obj["message"]["radiology"].length > 0){
                sentRadiology = await $scope.sendRadiologyToMehta();
            }
          
            let sentDiagnosis = "";
            if($scope.presc_obj["message"]["patient_diagnosis"] != [] && $scope.presc_obj["message"]["patient_diagnosis"].length > 0){
                sentDiagnosis = await $scope.sendDiagnosisToMehta();
            }
             let sentMediPrescription = "";
            if($scope.presc_obj["message"]["prescription"] != [] && $scope.presc_obj["message"]["prescription"].length > 0){
                sentMediPrescription = await $scope.sendMediPrescriptionToMehta();
            }
             let sentLab = "";
            if($scope.presc_obj["message"]["lab_tests"] != [] && $scope.presc_obj["message"]["lab_tests"] != "[]" && $scope.presc_obj["message"]["lab_tests"].length > 0){
                sentLab = await $scope.sendLabToMehta()
            }

            let sentAllergy = "";
            if($scope.presc_obj["message"]["alergy_genix"] != "" && $scope.presc_obj["message"]["alergy_genix"] != null && $scope.presc_obj["message"]["alergy_genix"] != "[]"){
                sentAllergy = await $scope.sendAllergyToMehta();
            }

            let sentNotesToMehta = "";
            if($scope.presc_obj["message"]["notes"] != "" && $scope.presc_obj["message"]["notes"] != null && $scope.presc_obj["message"]["notes"] != "[]" && $scope.presc_obj["message"]["notes"] != []){
                sentNotesToMehta = await $scope.sendNotesToMehta();
            }
            let sentUserDetailToMehta = await $scope.sendUserDetailToMehta();
            let sentPrescriptionToMehta = await $scope.sendPrescriptionToMehta();
            let sentconsultantDetailToMehta = await $scope.sendConsultantDetailToMehta();
            
            let sentKioskDtlToMehta = "";
            if($scope.presc_obj["message"]["kiosk_checkin_history"] != "" && $scope.presc_obj["message"]["kiosk_checkin_history"] != {} && $scope.presc_obj["message"]["kiosk_checkin_history"] != "{}"){
                sentKioskDtlToMehta = await $scope.sendKioskDtlToMehta();
            }
        }catch(error){
          console.log(error)
        }
    }
  
    $scope.sendRadiologyToMehta = function() {
        let arrList = $scope.presc_obj["message"]["radiology"];
        arrList = JSON.parse(arrList)

        arrList.forEach((elem) =>{
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
        });
        let jsonText = (JSON.stringify(arrList)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendRadiologyToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},

                success: function(data) {
                    // console.log(data);
                    resolve(data)
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });            
        });
    }

    $scope.sendDiagnosisToMehta = function(){
        let arrList = $scope.presc_obj["message"]["patient_diagnosis"];
        arrList.forEach((elem) =>{
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
            if(elem["$$hashKey"] != undefined){
                delete elem["$$hashKey"];
            }       
        });
        let jsonText = (JSON.stringify(arrList)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendDiagnosisToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.sendMediPrescriptionToMehta = function(){
        let arrList = $scope.presc_obj["message"]["prescription"];     
        arrList.forEach((elem) =>{
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
            if(elem["$$hashKey"] != undefined){
                delete elem["$$hashKey"];
            }
        });
        let jsonText = (JSON.stringify(arrList)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendMediPrescriptionToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.sendLabToMehta = function() {
        let arrList = $scope.presc_obj["message"]["lab_tests"];
        arrList = JSON.parse(arrList)
        arrList.forEach((elem) =>{
            console.log(elem);
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
            if(elem.test_name != undefined){
                elem.test_name = $scope.removeSpecialCharcters(elem.test_name);
            }
        });

        let jsonText = (JSON.stringify(arrList)).replace(/\\n/g,'').replace(/ /g, '%20'); //JSON.stringify(arrList);         
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendLabToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},

                success: function(data) {
                    // console.log(data);
                    resolve(data)
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });            
        });
    }

    $scope.sendAllergyToMehta = function() {
        let arrList = $scope.presc_obj["message"]["alergy_genix"];
        arrList = JSON.parse(arrList);
        arrList.forEach((elem) =>{
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
        });
        let jsonText = (JSON.stringify(arrList)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendAllergyToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},

                success: function(data) {
                    // console.log(data);
                    resolve(data)
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });            
        });
    }

    $scope.sendUserDetailToMehta = function() {
        let mobileNum = "";
        if($scope.presc_obj["user_details"]["user_mobile_number"] != ""){
            mobileNum = $scope.presc_obj["user_details"]["user_mobile_number"];
        }else if($rootScope.UserInfo.mobileNumber != ""){
            mobileNum = $rootScope.UserInfo.mobileNumber;
        }else{
            mobileNum = 0;
        }
        let obj = [{
            "appointment_id": $scope.presc_obj["message"]["appointment_id"],
            "user_first_name": $scope.presc_obj["user_details"]["user_first_name"],
            "user_last_name": $scope.presc_obj["user_details"]["user_last_name"],
            "user_mobile_number": mobileNum,
            "user_email": $scope.presc_obj["user_details"]["user_email"],
            "mrno": $rootScope.mehtaPatientMRNo
        }];
        let jsonText = (JSON.stringify(obj)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendUserDetailToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},

                success: function(data) {
                    // console.log(data);
                    resolve(data)
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });            
        });
    }

    $scope.removeSpecialCharcters = function(data){
        /*//remove all special characters
        let inputValue =data;
        let regex = /^[a-zA-Z0-9]*$/;
        if(!regex.test(inputValue)){
            inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');
        }
        return inputValue;  
        */
        // //remove all special character excluding space
        let inputValue = data;
        let regex = /^[a-zA-Z0-9\s]*$/; // Including \s to allow spaces
        if (!regex.test(inputValue)) {
            inputValue = inputValue.replace(/[#&%^]/g, ''); // Replace #, &, %, and ^ with an empty string
        }
        return inputValue; 
    }


    $scope.sendNotesToMehta = function(){
        let arrList = $scope.presc_obj["message"]["notes"];
        arrList = JSON.parse(arrList);
        arrList.forEach((elem) =>{
            elem["appointment_id"] = $scope.presc_obj["message"]["appointment_id"];
            elem["mrno"] = $rootScope.mehtaPatientMRNo;
            elem["notes"] = $scope.decodeHtmlEntities(elem["Description"]);
            delete elem["Description"];
        });
        let jsonText = (JSON.stringify(arrList)).replace(/\u00a0/g, ' ').replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendNotesToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.sendPrescriptionToMehta = function(){
        let obj = [{
            "booked_date_time": $scope.presc_obj["message"]["booked_date_time"],
            "appointment_id": $scope.presc_obj["message"]["appointment_id"],
            "vendor_appointment_id": $scope.presc_obj["message"]["vendor_appointment_id"],
            // "user_ihl_id": $scope.presc_obj["message"]["user_ihl_id"],
            "consultant_name": $scope.presc_obj["message"]["consultant_name"],
            "vendor_consultant_id": $scope.presc_obj["message"]["vendor_consultant_id"],
            "ihl_consultant_id": $scope.presc_obj["message"]["ihl_consultant_id"],
            "vendor_id": $scope.presc_obj["message"]["vendor_id"],
            "consultant_type": "Medical Consultation",
            "specality": $scope.presc_obj["message"]["specality"],
            "consultation_fees": $scope.presc_obj["message"]["consultation_fees"],
            "mode_of_payment": null,
            "followup_availablity_till_date": null,
            "follow_up_cost": null,
            "appointment_start_time": $scope.presc_obj["message"]["appointment_start_time"],
            "appointment_date_format": $scope.presc_obj["message"]["appointment_date_format"],
            "appointment_end_time": $scope.presc_obj["message"]["appointment_end_time"],
            "appointment_duration": $scope.presc_obj["message"]["appointment_duration"],
            "appointment_status": $scope.presc_obj["message"]["appointment_status"],
            "call_status": $scope.presc_obj["message"]["call_status"],
            "call_start_time": $scope.presc_obj["message"]["call_start_time"],
            "call_end_time": $scope.presc_obj["message"]["call_end_time"],
            "consultation_internal_notes": null,
            "consultation_advice_notes": null,
            "diagnosis": null,
            "appointment_model": $scope.presc_obj["message"]["appointment_model"],
            "vendor_name": $scope.presc_obj["message"]["vendor_name"],
            "medication": null,
            "advice_to_patient": null,
            "advice": null,
            "symptoms": null,
            "patient_symptoms": null,
            "encounter_id": $scope.presc_obj["message"]["encounter_id"],
            "doctor_cancelled_reason": null,
            "document_id": null,
            "direct_call": $scope.presc_obj["message"]["direct_call"],
            "affiliation_unique_name": $scope.presc_obj["message"]["affiliation_unique_name"],
            "kiosk_id": $scope.presc_obj["message"]["kiosk_id"],
            // "PartitionKey": $scope.presc_obj["message"]["PartitionKey"],
            // "RowKey": $scope.presc_obj["message"]["RowKey"],
            // "ihlTimestamp": $scope.presc_obj["message"]["ihlTimestamp"],
            // "ETag": $scope.presc_obj["message"]["ETag"],
            "reason_for_visit": $scope.presc_obj["message"]["reason_for_visit"],
            "alergy": null,
            "mrno": $rootScope.mehtaPatientMRNo
        }];
       
        let jsonText = (JSON.stringify(obj)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendPrescriptionToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.convertCharcterEntity = function(data){
        let inputValue =data;
        let regex = /&[#a-zA-Z0-9]+;/g;
        let filteredData = inputValue.replace(/&amp;nbsp;/g, ' ').replace(regex, '');
        return filteredData;        
    }

    $scope.sendConsultantDetailToMehta = function(){
        let obj = [{
            "appointment_id": $scope.presc_obj["message"]["appointment_id"],
            "consultant_email": $scope.presc_obj["consultant_details"]["consultant_email"],
            "consultant_name": $scope.presc_obj["consultant_details"]["consultant_name"],
            "consultant_mobile": $scope.presc_obj["consultant_details"]["consultant_mobile"],
            "vendor_name": $scope.presc_obj["consultant_details"]["vendor_name"],
            "education": $scope.presc_obj["consultant_details"]["education"],
            "description": $scope.convertCharcterEntity($scope.presc_obj["consultant_details"]["description"]),
            "rmp_id": $scope.presc_obj["consultant_details"]["rmp_id"],
            "account_id": $scope.presc_obj["consultant_details"]["account_id"],
            "provider": $scope.presc_obj["consultant_details"]["provider"],
            "mrno": $rootScope.mehtaPatientMRNo
        }];
        let jsonText = (JSON.stringify(obj)).replace(/\\n/g,'').replace(/ /g, '%20');          
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendConsultantDetailToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.convertCharcterEntityNew = function(data){
        // Input character or string  
        const inputSentence = data; 
  
        // Create a new HTML element  
        const element = document.createElement("div");       
  
        // Set the innerHTML of the element with the input sentence  
        element.innerHTML = inputSentence;       
  
        // Retrieve the decoded text from the element  
        const decodedSentence = element.innerText;       
  
        // Output the decoded sentence  
        // console.log(decodedSentence);  
        return decodedSentence;  
    }

    $scope.sendKioskDtlToMehta = function(){
        let arrList = $scope.presc_obj["message"]["kiosk_checkin_history"];
        arrList = JSON.parse(arrList);

        let obj = [{ 
            "appointment_id": $scope.presc_obj["message"]["appointment_id"], 
            "weightKG": arrList["weight"] || arrList["weightKG"] || "", 
            "heightMeters": arrList["height"] || arrList["heightMeters"] || "", 
            "leadTwoStatus": "", 
            "systolic": arrList["systolic"] || "",
            "diastolic": arrList["diastolic"] || "", 
            "bmi": arrList["bmi"] || "", 
            "dateTimeFormatted": arrList["dateTime"], 
            "bmiClass": "", 
            "bpClass": "", 
            "dateTime": arrList["dateTime"], 
            "mrno": $rootScope.mehtaPatientMRNo 
        }];  

        console.log(obj);
        let jsonText = (JSON.stringify(obj)).replace(/\\n/g,'').replace(/ /g, '%20');
       
        return new Promise((resolve, reject) => {
            $.ajax({
                url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                method: 'POST',
                data: {'FunctionName': 'sendKioskDtlToMehta', 'data': jsonText, 'url': $scope.mehtaBaseServerUrl},
                success: function(data) {
                    // console.log(data);
                    resolve(data);
                },
                error: function(data) {
                    // console.log(data);
                    reject(data);
                }
            });      
        });
    }

    $scope.decodeHtmlEntities= function(input) {
        console.log(input);
        // Extract the HTML from the JSON data
        let htmlString = input;
        
        // Function to decode HTML entities
        function decodeEntities(encodedString) {
            return encodedString.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
        }
        
        // Decode HTML entities in the HTML string
        let decodedHtmlString = decodeEntities(htmlString);
        
        // Create a temporary element to remove HTML tags
        let tempElement = document.createElement('div');
        tempElement.innerHTML = decodedHtmlString;
        
        // Extract the text content
        let plainText = $scope.removeSpecialCharcters(tempElement.textContent);        
        return plainText;
    }

    $scope.init();
}]);