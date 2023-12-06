
higiKioskControllers.controller('teleconsultationDashboardController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService',  '$interval', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, $interval) {

    $scope.currentSelectedTab = '';
    $scope.containerMessage = 'Please wait. Data is being loaded';
    $scope.showTabs = false;
    $rootScope.isVisibleLanguageButton = false;
    $scope.consultationAppointments = false;
    $scope.doctorStatusMapping = {};
    $scope.appointmentIdMappingWithConsultantId = {};
    $scope.validAppointmentForJoinCall = [];
    $scope.prevIsVisible = false;
    $scope.overAllConsultantList = [];
    $rootScope.affConsultantListWithCategory = [];
    $scope.init = function () {
        $scope.nextVisible = false;
        $scope.prevIsVisible = true;
        /*if( 'teleconsultationUserSelectedData' in $rootScope){
            $scope.initSuccess();
            $scope.getUserData();
        }
        else{*/
            HigiApiService.getTeleConsultData("ihl_user_id",function (resp) {
                //console.log(resp);
                if (typeof (resp) === "object") {
                    $scope.populateGetPlatformDataResponse(resp);
                    //$rootScope.teleconsultationData = resp;
                    //$scope.initSuccess();
                    //$scope.getUserData();
                }
                else {
                    $scope.initError();
                }
            });

            //  let ihl_user_id = '{"ihl_id" : "abcd"}';
            // HigiApiService.getTeleConsultData(ihl_user_id,
            //     function (resp) {
            //         console.log(resp);
            //         if (typeof (resp) === "object") {
            //             $rootScope.teleconsultationData = {};
            //             $rootScope.teleconsultationData['consultation_platfrom_data'] = resp;
            //             $scope.initSuccess();
            //         }
            //         else {
            //             $scope.initError();
            //         }
            //     });
        /*}*/
    }

    $scope.initError = function () {
        $scope.containerMessage = 'Error loading data';
    }

    $scope.populateGetPlatformDataResponse = async function(resp){
        if ("consult_type" in resp) {
            let getPlatformDataResponse = resp;

            //Remove specialities which has empty consultant list.
            getPlatformDataResponse['consult_type'] = removeEmptySpecialities(getPlatformDataResponse);

            //Filter specialities based on vendor list.
            if ($rootScope.availableVendorList.length > 0) {
                //Filter consultants only in available vendors list($rootScope.availableVendorList).
                getPlatformDataResponse['consult_type'] = filterAvailableVendors(getPlatformDataResponse);

                //Remove specialities which has empty consultant list.
                getPlatformDataResponse['consult_type'] = removeEmptySpecialities(getPlatformDataResponse);
            }

            //Filter apollo online specialities based on vendor list.
            if ($rootScope.availableVendorList && $rootScope.availableVendorList.length > 0) {
                let availableVendorList = $rootScope.availableVendorList.map(item => { return item.toLowerCase() });
                if (availableVendorList.includes("apollo")) {
                    //Filter only apollo online specialities.
                    getPlatformDataResponse['consult_type'] = await filterApolloOnlineSpecialities(getPlatformDataResponse);

                    //Remove specialities which has empty consultant list.
                    getPlatformDataResponse['consult_type'] = removeEmptySpecialities(getPlatformDataResponse);
                }
            }

            //Filter specialities based on member service.
            if($rootScope.selectedTeleconsultationService != "" && $rootScope.selectedTeleconsultationService == "Member Service" && $rootScope.selectedAffiliation && $rootScope.selectedAffiliation.affilate_unique_name) {
                //Filter only selected affiliated consultants.
                getPlatformDataResponse['consult_type'] = filterAffiliatedConsultants(getPlatformDataResponse);

                //Remove specialities which has empty consultant list.
                getPlatformDataResponse['consult_type'] = removeEmptySpecialities(getPlatformDataResponse);
                
                /* uncomment for 4 pillar category starts here
                getPlatformDataResponse['consult_type'].forEach(obj => {
                    let speciality = obj['specality'];
                    if(obj['consultation_type_name'] != "Fitness Class"){
                        if(speciality.length != 0){
                            speciality.forEach(consultantList => {
                                if(consultantList['consultant_list'].length != 0){
                                    consultantList['consultant_list'].forEach(element => {
                                        $scope.overAllConsultantList.push(element) // should get 92 in length
                                    });
                                }
                            });
                        }
                    }
                });
                $rootScope.affConsultantListWithCategory = $scope.overAllConsultantList;
                uncomment for 4 pillar category ends here */
            }

            $rootScope.teleconsultationData = getPlatformDataResponse;
            $scope.initSuccess();
            $scope.getUserData();

            if($rootScope.teleconsultationNewFlow == true){ //please add this in if condition -> && $rootScope.selectedTeleconsultationService == "Global Service"
                $timeout(function(){
                    console.log("navigating to speacality page")
                    window.location = '#/ihl-teleconsultation-speciality';
                },500); 
            }
            /* uncomment for 4 pillar category starts here
            else if($rootScope.selectedTeleconsultationService == "Member Service" && $scope.overAllConsultantList.length != 0){
                $timeout(function(){
                    console.log("navigating to doctor list page")
                    window.location = '#/ihl-teleconsultation-doctor-list';
                },500); 
            }
            uncomment for 4 pillar category ends here */
        }
    }

    function removeEmptySpecialities(obj){
        let platformData = obj;
        platformData['consult_type'] = platformData['consult_type'].map(object =>{
            if(object['consultation_type_name'] != "Fitness Class"){
                object['specality'] = object['specality'].filter(item => {
                    return item.consultant_list && item.consultant_list.length > 0;
                });
                return object;
            }else{
                return object;
            }
        });

        return platformData['consult_type'];
    }

    function filterAvailableVendors(obj){
        let platformData = obj;
        let availableVendorList = $rootScope.availableVendorList.map(item => { return item.toLowerCase() });
        //let availableVendorList = ['genix', 'ihl'];
        platformData['consult_type'] = platformData['consult_type'].map(object =>{
            if(object['consultation_type_name'] != "Fitness Class"){
                object['specality'] = object['specality'].map(element => {
                    element['consultant_list'] = element['consultant_list'].filter(item => {
                        return availableVendorList.includes(item.vendor_id.toLowerCase());
                    });

                    return element;
                });
                return object;
            }else{
                return object;
            }
        });

        return platformData['consult_type'];
    }

    function filterApolloOnlineSpecialities(obj){
        let platformData = obj;
        return new Promise((resolve, reject)=>{
            let success_fn = function(response){
                let apolloOnlineSpecialitiesList = response.appollo_specalities.map(item => { return item.toLowerCase() });
                //let apolloOnlineSpecialitiesList = ['hand surgery', 'head &amp; neck surgery'];
                platformData['consult_type'] = platformData['consult_type'].map(object =>{
                    if(object['consultation_type_name'] != "Fitness Class"){
                        object['specality'] = object['specality'].map(element => {
                            element['consultant_list'] = element['consultant_list'].filter(item => {
                                return (item.vendor_id.toLowerCase() != "apollo") || (item.vendor_id.toLowerCase() == "apollo" && apolloOnlineSpecialitiesList.includes(element['specality_name'].toLowerCase()));
                            });
                            //console.log(element['consultant_list']);
                            return element;
                        });
                        return object;
                    }else{
                        return object;
                    }
                });
                resolve(platformData['consult_type']);
                 
            };

            let error_fn = function(error){
                resolve(platformData['consult_type']);
            };

            HigiApiService.getApolloOnlineSpecialities(success_fn, error_fn);
        });
    }

    function filterAffiliatedConsultants(obj){
        let platformData = obj;
        let affilate_unique_name = $rootScope.selectedAffiliation.affilate_unique_name;
        platformData['consult_type'] = platformData['consult_type'].map(object =>{
            if(object['consultation_type_name'] != "Fitness Class"){
                object['specality'] = object['specality'].map(element => {
                    element['consultant_list'] = element['consultant_list'].filter(item => {
                        return item.affilation_excusive_data && item.affilation_excusive_data.affilation_array && item.affilation_excusive_data.affilation_array.some(elem => {return elem.affilation_unique_name == affilate_unique_name});
                    });

                    return element;
                });
                return object;
            }else{
                return object;
            }
        });

        return platformData['consult_type'];
    }

    $scope.initSuccess = function () {
        //console.log($rootScope.user);
        /*if('teleconsultationUserSelectedData' in $rootScope 
            && 'tele-consultation-selected-dashboard' in $rootScope.teleconsultationUserSelectedData
            && $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] != ''){
            $scope.currentSelectedTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'];
            console.log($scope.currentSelectedTab);
            $timeout(function(){
                $scope.nextVisible = true;
            },600);
        }
        else{
            $rootScope.teleconsultationUserSelectedData = {};
        }*/
        $rootScope.teleconsultationUserSelectedData = {};
        $scope.currentSelectedTab = '';
        $rootScope.teleConsultDashboardOption = '';
        $scope.showTabs = true;
        $scope.containerMessage = '';
        $rootScope.dataForAppointmentBooking = {
            "doctorInfo":{},
            "dateAndTime":"",
            "doctorFees":0,
            "reasonForVisit":"",
            "userId":""
        };
        $rootScope.userIdForLogDetails = HigiKioskStorageService.returnSessionData('user').id.toString();
        $rootScope.discountPaymentMethodSelected = false;
        $rootScope.prescriptionObjectFor1mg = "";
        $rootScope.labObjectFor1mg = "";
        $rootScope._is_base64_pdf_available = false;
        $rootScope._is_base64_labpdf_available = false;
        $rootScope.prescriptionNumberFor1mg = "";
        $rootScope.reasonForVisitText = "";
        $rootScope.alertsToShow(true, false, false, false);
        $rootScope.alertsToLabUIShow(true, false, false, false);
        //discount option variable
        $rootScope.totalMrpCost = 0;
        $rootScope.couponNumber = "";
        $rootScope.discountType = "";
        $rootScope.paymentTransactionIdValue = "";

        //For Genix Teleconsultation.
        $rootScope.genixConstants  = function(){ return new GenixConstantsService(); }();
    }

    $scope.selectTeleconsultationDashboardTab = function (tab_name) {
        //checking internet speed (download bandwidth)
        if(tab_name === 'Start Call Now') {
            if(window.navigator.connection.downlink < 5) {
                $('#lowSpeedInternetModal').show();
                setTimeout(function(){
                    $('#lowSpeedInternetModal').hide();
                }, 1000 * 3);                               
            } else {
                $('#lowSpeedInternetModal').hide();
            }
        }

        if($scope.currentSelectedTab == tab_name){
            $scope.currentSelectedTab = '';
            $rootScope.teleConsultDashboardOption = '';
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] = '';
            $scope.nextVisible = false;
            return;
        }


        if ($rootScope.apolloCofirmGoHomeButtonClicked == true) {
            $(".keyboard_class_close_btn").hide();
            $rootScope.loadModal({id: 'apolloConfirmExit'});
        }else{
            $scope.currentSelectedTab = tab_name;
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] = tab_name;
            $scope.nextVisible = true;
            $rootScope.teleConsultDashboardOption = tab_name;
            //console.log($rootScope.teleconsultationUserSelectedData) 
            $rootScope.apolloTeleConsultationPopup = {
                'videoCallIframe': false
            };

            $rootScope.apolloTeleConsultationSourceDetails = {
              'userBasicDetails': null,
              'specialityId': undefined,
              'appointmentId': undefined,
              'apolloTeleConsultationVideoCallUrl':"",
              'message':"",
              'casesheetId': "",
              'doctorInformation': null
            };
            $rootScope.apolloCofirmGoHomeButtonClicked = false; 
        }
    }

    $scope.nextButtonClick = function () {
        if ($rootScope.teleConsultDashboardOption == 'Fitness Class') {
            $scope.nextVisible = false;
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-speciality';
            },500);
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Fitness Class';
        }else{
            $scope.nextVisible = false;
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-type';
            },500);
        }
        $scope.prevIsVisible = false;
        
    }

    $scope.getUserData = async ()=>{
        $scope.consultationAppointments = false;
        $scope.doctorStatusMapping = {};
        $scope.appointmentIdMappingWithConsultantId = {};
        $scope.validAppointmentForJoinCall = [];

        HigiApiService.getTeleConsultUserData($rootScope.user.id, async function (resp) {
            //console.log(resp);
            await $scope.getFinetunedAppointmentList(resp.appointments);
        });
    }

    $scope.getFinetunedAppointmentList = function(data){
        let userAppointmentDetail = data.filter(obj => {
          if(obj.call_status == null || obj.call_status == undefined){
            obj['call_status'] = 'Requested';
          } 
          return obj.appointment_status.toLowerCase() == "approved" && obj.call_status.toLowerCase() == "on_going";
        });
        //console.log(userAppointmentDetail);
        
        let updatedAppointment = [];
        if (userAppointmentDetail.length > 0 && userAppointmentDetail !== undefined && userAppointmentDetail !== null) {
          userAppointmentDetail.forEach(element => {
            //console.log(element);
            if (element.appointment_end_time !== "NaN-NaN-NaN NaN:NaN undefined" && element.appointment_end_time !== undefined && element.appointment_end_time !== null) {
              let todayDate = new Date();
              let bookedDate = new Date(element.appointment_end_time);
              if (bookedDate.getTime() > todayDate.getTime()) {
                updatedAppointment.push(element);
              }
            }
          });
        }else{
            //console.log("no appmtss");
            return;
        }
        //console.log(updatedAppointment);
        
        if (updatedAppointment.length > 0) {
            $scope.checkUpdatedStatus = $interval(function() {
                let dateNow = new Date().getTime();
                let filterCurrentAppointment = updatedAppointment.filter(obj => {
                    return dateNow >= new Date(obj.appointment_start_time).getTime() && dateNow <= new Date(obj.appointment_end_time).getTime();
                });

                if (filterCurrentAppointment.length === 1) {
                    $scope.consultationAppointments = true;
                    $scope.validAppointmentForJoinCall = filterCurrentAppointment;
                }else{
                    $scope.consultationAppointments = false;
                    $scope.validAppointmentForJoinCall = [];
                }
            },5*1000);

            if (!$rootScope.fireStore)
                $scope.initiateDoctorStatus(updatedAppointment);
        }  
    }

    $scope.initiateDoctorStatus = (updatedAppointment)=>{
        if('Crossbar' in $rootScope == false) return;
        if($rootScope.Crossbar instanceof CrossbarClass == false) return;
        // Prepare Doctor Status Mapping
        if(updatedAppointment.length == 0) return;

        updatedAppointment.forEach(item=>{
            $scope.doctorStatusMapping[item.ihl_consultant_id] = 'Offline';
            $scope.appointmentIdMappingWithConsultantId[item.appointment_id] = item.ihl_consultant_id;
        });
        $scope.getDoctorStatusFromApi();
        $rootScope.Crossbar.updateUserId($rootScope.user.id);
        
        $rootScope.Crossbar.on_connection_established = ()=>{
            $scope.onCrossbarConnectionEstablished();
            $scope.getDoctorStatusFromApi();
        }

        if($rootScope.Crossbar.is_connected == true){
            // Already Connected
            // Update Handlers and subscribe to needed channels
            $scope.onCrossbarConnectionEstablished();
        }else{
            $rootScope.Crossbar.connect();
        }
        // console.log($rootScope.Crossbar.is_connected);
    }

    $scope.getDoctorStatusFromApi = function (){
        let doctor_ids = Object.keys($scope.doctorStatusMapping);
        //console.log(HigiApiService);
        HigiApiService.getDoctorStatus(doctor_ids, function(res){
            let _res = {'data':JSON.parse((res).replace(/(&quot\;)/g,"\""))};
            $scope.validateStatusFromApi(_res['data']);
        }, function(err){
            //console.error(err);
        });
    }

    $scope.validateStatusFromApi = function (res){
        //console.log(res);
        let n = res.length;
        let busy_ids = [];
        for(let i=0; i<n; i++){
          try{
            let _api_date = new Date(res[i]['timestamp']);
            let cur_date = new Date();
            if((cur_date - _api_date) >= (15*60*1000)) continue;
            let doctor_id = res[i]['consultant_id'];
            // let doctor_obj = this.doctorStatusMappingList.find(item=>{return item.ihl_consultant_id == doctor_id});
            let doctor_obj = $scope.doctorStatusMapping[doctor_id];
            if(doctor_obj != undefined){
              let _status = res[i]['status'];
              if(_status == undefined || _status == null) _status = 'Offline';
              if(_status == 'Busy') busy_ids.push(doctor_id);
              $scope.doctorStatusMapping[doctor_id] = _status;
            }
          }catch(err){
              //console.log(err);
            continue;
          }
        }

        if(busy_ids.length == 0) return;
        // Crossbar event to busy ids
    
        let channel_name = 'ihl_get_doctor_status_channel';
        let _data = {
        };
        let _options = {
          'receiver_ids':busy_ids,
          'exclude':[],
          'eligible':[],
        };
        $rootScope.Crossbar.publishToChannel(channel_name, _data, _options);
    }

    $scope.onCrossbarConnectionEstablished = function (){
        //console.log('Connection established');
        // Subcribe to channels here
        let channel_subscription_list = [
            {
                'channel_name': 'ihl_update_doctor_status_channel',
                'subscription_handler': (param, sender_id, sender_session_id)=>{ $scope.updateDoctorStatusChannelSubscription(param, sender_id, sender_session_id);}
            },
            {
                'channel_name':'IHL_CALL_AND_CLASS_STATUS',
                'subscription_handler':(param, sender_id, sender_session_id)=>{ $scope.upcomingAppointmentStatus(param, sender_id, sender_session_id);},
            }
        ];
        // Need to think: Do we need to diconnect from the not required subscription
        // First check if already exist
        channel_subscription_list.forEach(async (item)=>{
            let res = $rootScope.Crossbar.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
            if(res == false){
                await $rootScope.Crossbar.subscribeToChannels([item]);
            }
        });

        $scope.$on("$destroy", function(){
            if ($rootScope.Crossbar != undefined ) {
                $rootScope.Crossbar.unSubscribeToChannel('ihl_update_doctor_status_channel');
                $rootScope.Crossbar.unSubscribeToChannel('IHL_CALL_AND_CLASS_STATUS');
            }
            //console.log("destroying dashboard url");
        });
    }

    $scope.updateDoctorStatusChannelSubscription = function (param, sender_id, sender_session_id){
        //console.log(param);
        //console.log(sender_id);
        if('status' in param == false) return;
        let _doctor = $scope.doctorStatusMapping[sender_id];
        if(_doctor != undefined){
          if(param['status'] == 'Busy' && 'other_data' in param && (param['other_data']['vid_type'] == 'BookAppointmentCall' || param['other_data']['vid_type'] == 'LiveAppointmentCall') && $scope.appointmentIdMappingWithConsultantId[param['other_data']['vid']] == sender_id){
            param['status'] = 'Online';
          }
          $scope.doctorStatusMapping[sender_id] = param['status'];
        }

        //console.log($scope.doctorStatusMapping);
    }


    $scope.upcomingAppointmentStatus = function(param, sender_id, sender_session_id){
        if ($scope.checkUpdatedStatus != undefined && $scope.checkUpdatedStatus != null) {
            $interval.cancel($scope.checkUpdatedStatus);
        }
        $scope.getUserData();
    }

    $scope.redirectToVideoCallController = function(initialRes){
        //console.log(initialRes);
        let consultantDetail = {
            'consultant_name': initialRes['consultant_name'],
            'ihl_consultant_id': initialRes['ihl_consultant_id'],
            'vendor_consultant_id': initialRes['vendor_consultant_id'],
            'vendor_id': (initialRes['vendor_id'] || "")
        };
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = consultantDetail;
        
        if (initialRes['vendor_id'] === "GENIX") {
            $rootScope.genixConstants.userBasicDetails = HigiKioskStorageService.returnSessionData('user');
            $rootScope.genixConstants.doctorDetails = Object.assign({}, consultantDetail);
            //$rootScope.genixConstants.appointmentDate = initialRes['appointment_start_time'];
            $rootScope.genixConstants.appointmentFees = parseInt(initialRes['consultation_fees']);
            $rootScope.genixConstants.appointmentId = initialRes['appointment_id'] || undefined;
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Medical Consultation';
            $rootScope.genixConstants._isRejoinCallFlow = true;
            
            window.location = '#/genix-teleconsultation-video-call';
            if ($rootScope.invoiceIdForApolloTeleconsultationService.trim().length == 0) {
                let userData = HigiKioskStorageService.returnSessionData('user');
                if (userData != undefined && userData != null) {
                    if (userData['teleconsult_last_checkin_service'] != undefined && userData['teleconsult_last_checkin_service'] != null) {
                        if (userData['teleconsult_last_checkin_service']['service_provided'] == false && userData['teleconsult_last_checkin_service']['vendor_name'] == 'GENIX') {
                            $rootScope.invoiceIdForApolloTeleconsultationService = userData['teleconsult_last_checkin_service']['invoice_number'];
                        }
                    }
                }
            };
            return;
        }

        $rootScope.teleConsultationNamespace._isOngoingCall = false;
        $rootScope.teleConsultationNamespace.appointment_id = initialRes['appointment_id'] || undefined;
        $rootScope.teleConsultationNamespace.flow_type = 'BookAppointment';
        $rootScope.teleConsultationNamespace.selectedDoctorId = initialRes['ihl_consultant_id'] || undefined;
        $rootScope.teleconsultationAbnormalCallEndedData = initialRes;
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Health Consultation';

        window.location = '#/ihl-teleconsultation-video-call';
        if ($rootScope.invoiceIdForApolloTeleconsultationService.trim().length == 0) {
            let userData = HigiKioskStorageService.returnSessionData('user');
            if (userData != undefined && userData != null) {
                if (userData['teleconsult_last_checkin_service'] != undefined && userData['teleconsult_last_checkin_service'] != null) {
                    if (userData['teleconsult_last_checkin_service']['service_provided'] == false && userData['teleconsult_last_checkin_service']['vendor_name'] == 'IHL') {
                        $rootScope.invoiceIdForApolloTeleconsultationService = userData['teleconsult_last_checkin_service']['invoice_number'];
                    }
                }
            }
        };
    }


    $scope.backButtonOut = function() {
        if($rootScope.selectedTeleconsultationService != "" && $rootScope.selectedTeleconsultationService == "Member Service") {
            $timeout(()=>{
                window.location = "#/ihl-teleconsultation-memberService";
            }, 500);
        }       
        else {
            $timeout(()=>{
                window.location = "#/ihl-teleconsultation-main-dashboard";
            }, 500);
        } 
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
    }


    $scope.init();
}]);