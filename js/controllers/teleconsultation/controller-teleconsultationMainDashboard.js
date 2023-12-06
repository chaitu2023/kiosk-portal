higiKioskControllers.controller('teleconsultationMainDashboardController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService',  '$interval', 'fireStore', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, $interval, fireStore) {

    $scope.initSuccess = function() {
        $scope.currentSelectedTab = '';
        $scope.containerMessage = 'Please wait. Data is being loaded';
        $scope.nextVisible = false;
        $scope.showTabs = false; 
        $rootScope.teleconsultationNewFlow = false;      
        $scope.noLastCheckin = HigiKioskStorageService.returnSessionData('nolastCheckin');
        $scope.consultationAppointments = false;
        $scope.doctorStatusMapping = {};
        $scope.appointmentIdMappingWithConsultantId = {};
        $scope.validAppointmentForJoinCall = [];
        $rootScope.teleconsultationUserSelectedData = {};
        $rootScope.dataForAppointmentBooking = {
            "doctorInfo":{},
            "dateAndTime":"",
            "doctorFees":0,
            "reasonForVisit":"",
            "userId":""
        };
        $scope.getUserData();
      
        if ($rootScope.mehtaFlow && $rootScope.mehtaPatientMRNo == '' && $scope.noLastCheckin && $rootScope.mehtaFlowInitiated == false ) { // && $rootScope.mehtaUserMobileNumber == ""
            // $rootScope.mehtaNextSlide = $scope.nextSlide;
            $rootScope.mehtaFlowInit();
        } 
    }

    $scope.initError = function() {
        $scope.containerMessage = "Error Loading Data";
        $scope.showTabs = false;
    }

    $scope.openTab = function(tab_name) {
        if($scope.currentSelectedTab == tab_name){
            $scope.currentSelectedTab = '';                        
            $scope.nextVisible = false;
            $rootScope.selectedTeleconsultationService = '';
            return;
        } else {
            $scope.currentSelectedTab = tab_name;
            $scope.nextVisible = true; 
            $rootScope.selectedTeleconsultationService = tab_name;                       
        }        
    }

    // $scope.mvmButtonClick = function(){
    //     // For MVM flow testing
    //     /*window.location = "#/mvm"
    //     $rootScope.MVMAvailable = true;  */
        
    //     // For A4 printer testing
    //     /*(var urlStr = "https://blob.medeintegra.dev/blob/mede_blob_7b9b1175-1a61-4ebe-9187-0dc22fe8e4c3.pdf";
    //     var prescriptionUrl = urlStr.replace("https", "http"); 
    //     var externalPrinterName = $rootScope.externalPrinterName;
    //     console.log("apolloA4print welcome ctrl");
    //     JkioskService.apolloA4print($scope.apolloA4printRes,  prescriptionUrl, externalPrinterName);  */

    //     // for apollo coupon code flow testing
    //     window.location = "#/ihl-teleconsultation-summary";
    // }

    $scope.nextButtonClick = function() {
        $scope.nextVisible = false;
        $rootScope.currentSelectedTab = $scope.currentSelectedTab;
        $rootScope.teleconsultationNewFlow = true; 
        if($scope.currentSelectedTab == "Member Service" && $rootScope.hpodAffiliations.length != 0) {
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-memberService';
            },500);
        }
        else {
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-dashboard';
            },500);

            if($scope.currentSelectedTab == "Global Service") {
                //setting global service booking and direct call options enabled or not
                if($rootScope.globalServiceTeleConsult[0].book_apppointment == "true") $rootScope.enableGeneralServiceBookAppointmentOption = true;
                else $rootScope.enableGeneralServiceBookAppointmentOption = false;

                if($rootScope.globalServiceTeleConsult[1].direct_Call == "true") $rootScope.enableGeneralServiceDirectCallOption = true;
                else $rootScope.enableGeneralServiceDirectCallOption = false;
            }
        }
        $rootScope.selectedAffiliation = null;
    }

    $scope.getUserData = async ()=>{
        $scope.consultationAppointments = false;
        $scope.doctorStatusMapping = {};
        $scope.appointmentIdMappingWithConsultantId = {};
        $scope.validAppointmentForJoinCall = [];

        HigiApiService.getTeleConsultUserData($rootScope.user.id, async function (resp) {
            // console.log(resp);
            await $scope.getFinetunedAppointmentList(resp.appointments);
        });
    }

    $scope.getFinetunedAppointmentList = function(data){
        let userAppointmentDetail = data.filter(obj => {
          if(obj.call_status == null || obj.call_status == undefined){
            obj['call_status'] = 'Requested';
          } 
          return (obj.appointment_status != undefined && obj.appointment_status.toLowerCase() == "approved") && (obj.call_status.toLowerCase() == "on_going" || obj.call_status.toLowerCase() == "requested");
        });
        // console.log(userAppointmentDetail);
        
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
            console.log("no appmtss");
        }
        // console.log(updatedAppointment);
        
        if (updatedAppointment.length > 0) {
            $scope.checkUpdatedStatus = $interval(function() {
                let dateNow = new Date().getTime();
                let filterCurrentAppointment = updatedAppointment.filter(obj => {
                    return dateNow >= new Date(obj.appointment_start_time).getTime() && dateNow <= new Date(obj.appointment_end_time).getTime();
                });

                if (filterCurrentAppointment.length === 1) {
                    console.log("filterCurrentAppointment : ",filterCurrentAppointment)
                    $scope.consultationAppointments = true;
                    $scope.validAppointmentForJoinCall = filterCurrentAppointment;
                }else{
                    $scope.consultationAppointments = false;
                    $scope.validAppointmentForJoinCall = [];
                }
            },5*1000);

            
            $scope.initiateDoctorStatus(updatedAppointment);
        }  
        $scope.showTabs = true;
    }

    $scope.initiateDoctorStatus = (updatedAppointment)=>{
        if ($rootScope.fireStore) {
            // if($scope.consultationDoctorList.length == 0) return;

            // $scope.consultationDoctorList.forEach(item=>{
            //     $scope.doctorStatusMapping[item.ihl_consultant_id] = 'Offline';
            // });
            //$scope.getDoctorStatusFromApi();
            $scope.initiateFireStore(updatedAppointment);
        } else {
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
    }

    $scope.initiateFireStore = function(updatedAppointment) {
        fireStore.getAll($rootScope.consultantOnlineCollectionName).onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                const res = doc.data();
                console.log(res);
                if(updatedAppointment.length == 0) return;

                updatedAppointment.forEach(item=>{
                    $scope.appointmentIdMappingWithConsultantId[item.appointment_id] = item.ihl_consultant_id;
                    if (item.ihl_consultant_id == res['consultantId']) {
                        $scope.doctorStatusMapping[res['consultantId']] = res['status'];
                        $scope.updateDoctorStatusChannelSubscription(res, res['consultantId'], '');
                        return;
                    }
                });
            });
        });
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
        console.log(res);
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
        
        if (!$rootScope.fireStore) {
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
    }

    $scope.onCrossbarConnectionEstablished = function (){
        // console.log('Connection established');
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
        console.log(param);
        console.log(sender_id);

        if('status' in param == false) return;
        let _doctor = $scope.doctorStatusMapping[sender_id];
        if(_doctor != undefined){
          if(param['status'] == 'Busy' && 'other_data' in param && (param['other_data']['vid_type'] == 'BookAppointmentCall' || param['other_data']['vid_type'] == 'LiveAppointmentCall') && $scope.appointmentIdMappingWithConsultantId[param['other_data']['vid']] == sender_id){
            param['status'] = 'Online';
          }
          $scope.doctorStatusMapping[sender_id] = param['status'];
        }

        console.log($scope.doctorStatusMapping);
    }


    $scope.upcomingAppointmentStatus = function(param, sender_id, sender_session_id){
        if ($scope.checkUpdatedStatus != undefined && $scope.checkUpdatedStatus != null) {
            $interval.cancel($scope.checkUpdatedStatus);
        }
        $scope.getUserData();
    }

    $scope.redirectToVideoCallController = function(initialRes){
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

        $rootScope.teleConsultationNamespace._isRejoinCallFlow = true;
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

    $scope.initSuccess();

}]);