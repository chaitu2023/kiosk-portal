 higiKioskControllers.directive('serviceProviderModal', ['$rootScope' , 'HigiKioskStorageService' , 'JkioskService' , 'HigiKioskAnimationService', '$location', '$timeout', 'HigiApiService', function($rootScope, HigiKioskStorageService, JkioskService, HigiKioskAnimationService, $location, $timeout, HigiApiService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/service-provider.html',
        link :function(scope, elem, attr){
            scope.serviceProvider = new Object();
            scope.serviceProvider.lastSessionNotCompletedText = "global.lastSessionNotCompletedText";
            scope.serviceProvider.wishToContinuePreviousSession = "global.wishToContinuePreviousSession";
            scope.serviceProvider.wishToContinuePreviousSessionButtonYes = "global.wishToContinuePreviousSessionButtonYes";
            scope.serviceProvider.wishToContinuePreviousSessionButtonNo = "global.wishToContinuePreviousSessionButtonNo";
            scope.serviceProvider.pleaseWaitText = "global.affilateUpdatePlwait";
            scope.serviceProvider.initiateLiveCallText = "global.initiateLiveCallText";

            scope.serviceProvider.init = function() {
                scope.serviceProvider.isTeleconsultationConfirmModalShow = true;
            };

            scope.serviceProvider.proceedToCurrentSession = function(){
                $rootScope.userPaidServices = {
                  "weight": false,
                  "bp": false,
                  "bmc": false,
                  "bmc_full": false,
                  "ecg": false,
                  "spo2": false,
                  "temperature": false,
                  "service_provided": false,
                  "invoice_id": ""
                };

                if($rootScope.abhaflowEnable && $rootScope.ABHApopupCalled == false && $rootScope.abhaAccountLinked != true && !$rootScope.mehtaFlow){
                    $rootScope.lastCheckinModalShow = true;
                    $rootScope.lastCheckinModalFirstFlow = undefined;
                    $rootScope.ABHApopupCalled = true;
                    $rootScope.abhaVerifyModelInit();
                    $rootScope.loadModal({ id: 'abhaVerify' });
                } 
                else if ($rootScope.mehtaFlow && HigiKioskStorageService.returnSessionData('logged_in') && $rootScope.mehtaFlowInitiated == false && HigiKioskStorageService.returnSessionData('height') != undefined && $rootScope.IHLTeleConsultSelected == false){
                    $rootScope.lastCheckinModalShow = true;
                    $rootScope.lastCheckinModalFirstFlow = undefined;
                    $rootScope.mehtaFlowInitiated = true;
                    $rootScope.mehtaFlowInit();
                }
                else{
                    $rootScope.lastCheckinModalShow = false;
                    $rootScope.lastCheckinModalFirstFlow = false;
                    $rootScope.clearModal();
                    //To hide the reason for visit close button.
                    $(".keyboard_class_close_btn").hide();
                    $timeout(() => {
                        $rootScope.loadModal({id: 'reasonForVisit'});
                    },300);
                }
                // $(".keyboard_class_close_btn").hide();
                // $timeout(() => {
                //     $rootScope.loadModal({id: 'reasonForVisit'});
                // },300);
            }

            scope.serviceProvider.proceedToPreviousSession = function(){
                let userPreviousServices = $rootScope.userPaidServices;
                let filterServiceToProvide = [];
                let kioskVitalList = ['ekg', 'bmc', 'w', 'bp', 'spo2', 'temp'];
                let vitalTestTOProvide = [];
                let modulesConfigObj = [
                  {hardware: 'ECG', mode: 'ekg', serviceProvideName: 'ecg'},
                  {hardware: 'Body Composition', mode: 'bmc', serviceProvideName: 'bmc'},
                  {hardware: 'FullBodyCompositionAnalyser', mode: 'bmc', serviceProvideName: 'bmc_full'},
                  {hardware: 'Weight Scale', mode: 'w', serviceProvideName: 'weight'},
                  {hardware: 'Blood Pressure', mode: 'bp', serviceProvideName: 'bp'},
                  {hardware: 'SPo2', mode: 'spo2', serviceProvideName: 'spo2'},
                  {hardware: 'temp', mode: 'temp', serviceProvideName: 'temperature'}
                ];

                //Filter the previous session selected service of user.
                for (let key in userPreviousServices) {
                    if (key != 'service_provided' && key != 'invoice_id') {
                        if (userPreviousServices[key] == true) {
                            filterServiceToProvide.push(key);
                        }
                    }
                }
                console.log(filterServiceToProvide);

                //Filter the previous session selected service of user.
                if (filterServiceToProvide.length > 0) {
                    let servicesToProvideAgain = modulesConfigObj.filter(obj => filterServiceToProvide.includes(obj.serviceProvideName));
                    if (servicesToProvideAgain.length > 0) {
                        
                        let checkHardWareAvailability = servicesToProvideAgain.filter(obj =>{
                            return $rootScope.hardwareAvailability[obj.hardware] == true;
                        });
                        console.log(checkHardWareAvailability);
                        if (checkHardWareAvailability != undefined && checkHardWareAvailability.length > 0) {
                            let vitalModesForPreviousService = checkHardWareAvailability.map(obj => {return obj.mode});
                            for (var i = 0; i < kioskVitalList.length; i++) {
                                if (vitalModesForPreviousService.includes(kioskVitalList[i])) {
                                    vitalTestTOProvide.push(kioskVitalList[i]);
                                }
                            }

                            if (JSON.stringify(vitalTestTOProvide) == JSON.stringify(kioskVitalList)) {
                                $rootScope.selectedVital = ['bpw'];
                                let modes = $rootScope.selectedVital;
                                localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                                $rootScope.clearModal();
                                $(".keyboard_class_close_btn").show();
                                $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                            }else{
                                $rootScope.selectedVital = vitalTestTOProvide;
                                let modes = $rootScope.selectedVital;
                                localStorage.setItem("paymentSessionVitalTest",  JSON.stringify(modes));
                                $rootScope.clearModal();
                                $(".keyboard_class_close_btn").show();
                                $rootScope.proceedToVitalTestAfterKioskVitalPayment();
                            }
                        }else{
                            $rootScope.clearModal();
                            $rootScope.exitCurrentSession();
                            return;
                        }
                    }else{
                        $rootScope.clearModal();
                        $rootScope.exitCurrentSession();
                        return;
                    }
                }else{
                    $rootScope.clearModal();
                    $rootScope.exitCurrentSession();
                    return;
                }
            }

            $rootScope.checkPreviousPaymentSession =  function(){
                //By default all values in userPaidServices is false. Later it updated from lastcheckin
                let userServices = $rootScope.userPaidServices;
                
                let _isServiceProvide = false;
                let _isRefundInitiated = false;
                let _isPaidVitalsExists = false;

                //filter only service provided value.
                let checkIsServiceProvide = () => {
                    let filterService = userServices;

                    if ('service_provided' in filterService) {
                        return _isServiceProvide = filterService['service_provided'];
                    } 
                };
                checkIsServiceProvide();

                //filter only refund initiated value.
                let checkIsRefundInitiated = () => {
                    let filterService = userServices;

                    if ('refund_initiated' in filterService) {
                        return _isRefundInitiated = filterService['refund_initiated'];
                    } 
                };
                checkIsRefundInitiated();


                //check any of vital services are true
                let checkIsPaidVitalsExists = () => {
                    for (let key in userServices) {
                        if (key != 'service_provided' && key != 'invoice_id') {
                            if (userServices[key] == true) {
                                return _isPaidVitalsExists = true;
                            }
                        }
                    }
                };
                checkIsPaidVitalsExists();

                console.log("_isServiceProvide "+ _isServiceProvide);
                console.log("_isRefundInitiated "+ _isRefundInitiated);
                console.log("_isPaidVitalsExists "+ _isPaidVitalsExists);

                if (_isServiceProvide == false && _isPaidVitalsExists == true && _isRefundInitiated == false) {
                    return true;
                }else{
                    $rootScope.userPaidServices = {
                      "weight": false,
                      "bp": false,
                      "bmc": false,
                      "bmc_full": false,
                      "ecg": false,
                      "spo2": false,
                      "temperature": false,
                      "service_provided": false,
                      "invoice_id": ""
                    };
                    return false;
                }
            }

            scope.serviceProvider.proceedToCurrentTeleconsultationSession = function(){
                $(".keyboard_class_close_btn").show();
                $rootScope.clearModal();
                let invoiceId = $rootScope.invoiceIdForApolloTeleconsultationService;
                scope.serviceProvider.apolloTeleConsultationServiceProvided(invoiceId);
                $rootScope.invoiceIdForApolloTeleconsultationService = "";
                $rootScope.apolloConsultationLastSessionUncomplete = false;
            }

            scope.serviceProvider.proceedToPreviousTeleconsultationSession = function(){
                scope.serviceProvider.isTeleconsultationConfirmModalShow = false;
                HigiApiService.getapolloTeleConsultUserData($rootScope.user.id, function (resp) {
                    console.log(resp);
                    scope.serviceProvider.getLastAppoinmentDetails(resp.appointments);
                });
            }

            scope.serviceProvider.getLastAppoinmentDetails = function(resp){
                let appointments = resp;
                let latestAppointment = "";
                let apolloConsultationDetails = appointments.filter(obj => {
                    if (obj.vendor_id != undefined &&  obj.vendor_id != null)  {
                        if (obj.vendor_id.trim().length != 0 && obj.vendor_id == 'APOLLO') {
                            return obj;
                        }
                    }
                });

                if (apolloConsultationDetails.length > 0) {
                    if (apolloConsultationDetails.length > 1) {
                        apolloConsultationDetails.sort((a, b) => {
                            return (new Date(b.appointment_start_time).getTime()) - (new Date(a.appointment_start_time).getTime());
                        });
                        console.log(apolloConsultationDetails[0]);
                        $rootScope.apolloTeleConsultationSourceDetails.userBasicDetails = HigiKioskStorageService.returnSessionData('user');
                        $rootScope.apolloTeleConsultationSourceDetails.specialityId = apolloConsultationDetails[0]['vendor_consultant_id'];
                        $rootScope.apolloTeleConsultationSourceDetails.appointmentId = apolloConsultationDetails[0]['appointment_id'];
                        let consultantDetail = {
                            'consultant_name':  apolloConsultationDetails[0]['consultant_name'],
                            'ihl_consultant_id':  apolloConsultationDetails[0]['ihl_consultant_id'],
                            'vendor_consultant_id':  apolloConsultationDetails[0]['vendor_consultant_id'],
                            'vendor_id': ( apolloConsultationDetails[0]['vendor_id'] || "")
                        };
                        $rootScope.teleconsultationUserSelectedData = {};
                        //$timeout(() => {
                            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = consultantDetail;
                            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Medical Consultation';
                        //},5 * 1000);

                        $(".keyboard_class_close_btn").show();
                        $rootScope.clearModal();
                        window.location = '#/apollo-teleconsultation-video-call';
                        $rootScope.apolloConsultationLastSessionUncomplete = false;
                        scope.serviceProvider.isTeleconsultationConfirmModalShow = true;
                    }else{
                        console.log(apolloConsultationDetails[0]);
                        $rootScope.apolloTeleConsultationSourceDetails.userBasicDetails = HigiKioskStorageService.returnSessionData('user');
                        $rootScope.apolloTeleConsultationSourceDetails.specialityId = apolloConsultationDetails[0]['vendor_consultant_id'];
                        $rootScope.apolloTeleConsultationSourceDetails.appointmentId = apolloConsultationDetails[0]['appointment_id'];
                        let consultantDetail = {
                            'consultant_name':  apolloConsultationDetails[0]['consultant_name'],
                            'ihl_consultant_id':  apolloConsultationDetails[0]['ihl_consultant_id'],
                            'vendor_consultant_id':  apolloConsultationDetails[0]['vendor_consultant_id'],
                            'vendor_id': ( apolloConsultationDetails[0]['vendor_id'] || "")
                        };
                        $rootScope.teleconsultationUserSelectedData = {};
                        //$timeout(() => {
                            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = consultantDetail;
                            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Medical Consultation';
                        //},5 * 1000);

                        $(".keyboard_class_close_btn").show();
                        $rootScope.clearModal();
                        window.location = '#/apollo-teleconsultation-video-call';
                        $rootScope.apolloConsultationLastSessionUncomplete = false;
                        scope.serviceProvider.isTeleconsultationConfirmModalShow = true;
                    }
                }
            }

            scope.serviceProvider.apolloTeleConsultationServiceProvided =  async function(invoice){
                let promise =  await new Promise((resolve, reject)=>{
                  let successFn = (resp)=>{
                    resolve(resp);
                  }
                  let errorFn = (resp)=>{
                    resolve("error updating apollo service provider");
                  }

                  let data = $rootScope.invoiceIdForApolloTeleconsultationService;
                  let reason = "medicalConsultation";
                  jQuery.ajax({
                    url: getSettingsValue('kiosk.api.url') +"/data/TeleconsultServiceProvided?invoice_id=" + data +"&reason_if_any="+reason,
                    type : "GET",
                    headers:{
                      "ApiToken":"32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==",
                      "Content-Type": "application/json"
                    },
                    success: function(res){
                      successFn(res)
                    },
                    error : function(error) { 
                      errorFn(error)
                    } 
                  });
                });  

                console.log(promise);   
            }



            scope.serviceProvider.init();
        }
    };
}]);

