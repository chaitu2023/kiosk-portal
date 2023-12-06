higiKioskControllers.directive('emailResultsModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/email-results.html',
        controller :function($scope){
            $scope.emailResults = new Object();
            var checkin;

            $scope.emailResults.init = function(){
                
                $scope.emailResults.neverSpamLabel = "finishModal.email.never.spam";
                $scope.emailResults.enterEmailLabel = 'emailresults.enter.email';
                $scope.emailResults.sendLabel = 'global.send';                
                $scope.normal_send_email = true;
                $scope.abha_send_email = false;
                $scope.emailResults.emailAddress = '';
                $rootScope.fields.emailResults = $scope.emailResults.fields;
                $scope.emailResults.submitting = false;
                $scope.emailResults.nextBtnActive = (HigiKioskStorageService.returnSessionData('logged_in')) ? 'email_my_results_submit_active_btn' : '';
                $scope.emailResults.fields = [
                    {id : "emailres" , placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.emailaddress'), defaultText: "", text : $rootScope.defaultEmail , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.emailResults.emailPatternCheck(this)}, focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}
                ];
                $scope.emailResults.fields[0].text = (HigiKioskStorageService.returnSessionData('logged_in')) ? HigiKioskStorageService.returnSessionData('email') : '';
                if($rootScope.sendEmailPurpose == 'abha'){
                    $scope.normal_send_email = false;
                    $scope.abha_send_email = true;
                    $scope.emailResults.title = "emailresults.enter.email.to.send.abharesults";;
                    $scope.emailResults.sendDisclaimer = 'emailresults.by.clicking.abhasend';
                    $scope.emailResults.sendEmailError = 'welcomeModals.sevrerr';
                    $timeout(function(){
                        $scope.continuevisible = true;
                    }, 5000);
                }else{
                    $scope.normal_send_email = true;
                    $scope.abha_send_email = false;
                    $scope.continuevisible = false;
                    $scope.emailResults.title = "emailresults.enter.email.to.send.results";
                    $scope.emailResults.sendDisclaimer = 'emailresults.by.clicking.send';
                    $scope.emailResults.sendEmailError = 'welcomeModals.sevrerr';
                    $scope.continuevisible = false;                   
                }
            };

            $rootScope.emailResultInit = $scope.emailResults.init;
            //Listen for email address getting set by login
            $scope.emailResults.loggedInWatch = $scope.$watch('modalVisible', function(newVal,oldVal){
               //When showing modal, if you're showing the email results, set the fields.

                if(newVal && $scope.$parent.$parent.modalList['modalEmailResultsVisible']){
                    $scope.emailResults.fields[0].text = (HigiKioskStorageService.returnSessionData('logged_in')) ? HigiKioskStorageService.returnSessionData('email') : '';
                    document.getElementById($scope.emailResults.fields[0].id).value =  $scope.emailResults.fields[0].text;
                    $scope.emailResults.nextBtnActive = (HigiKioskStorageService.returnSessionData('logged_in')) ? 'email_my_results_submit_active_btn' : '';
                    $rootScope.fields.emailResults = $scope.emailResults.fields;
                    $scope.emailResults.emailPatternCheck($scope.emailResults.fields[0]);
                }
            });

            $scope.emailResults.emailPatternCheck = function(emailAddress){
                if(HigiKioskUtilitiesService.isValidEmailAddress(emailAddress)){
                    $rootScope.keyboardEnterButtonClass = 'enter_active';
                    $rootScope.keyboardEnterButtonFunction = $scope.emailResults.sendCheckinEmail;
                    $scope.emailResults.nextBtnActive = 'email_my_results_submit_active_btn';
                    $rootScope.hideEmailExtensionTop();
                } else{
                    $scope.emailResults.nextBtnActive = '';
                    $rootScope.keyboardEnterButtonFunction = null;
                    $rootScope.keyboardEnterButtonClass = '';
                }
            };

            $scope.emailResults.sendSuccess = function(){

                mode = new Object();
                mode.modalAuthDialogTitle = "welcomeModals.success";
                mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                mode.modalAuthDialogContent = "emailresults.email.sent";
                mode.modalAuthDialogIconClass = "auth_dialog_success";
                mode.loggedin = false;
                mode.timer = 5000;
                mode.callback = function(){
                    $rootScope.clearModal();
                };
                $scope.emailResults.submitting = false;
                $rootScope.authDisplay(mode);
                JkioskService.logInfo("", "Email Results", "");
                HigiKioskUtilitiesService.safeApply($rootScope);
            };

            $scope.emailResults.sendError = function(){
                console.log("email error");
                console.log(checkin);
                $scope.noIVTdata = false; 
                if((checkin.dengue_IgG == undefined || checkin.dengue_IgM == undefined) && (checkin.malaria_p_v == undefined || checkin.malaria_p_f == undefined) && checkin.heamoglobin == undefined && (checkin.hiv_I == undefined || checkin.hiv_II == undefined) && checkin.hcv == undefined && checkin.troponin == undefined && checkin.syphilis == undefined && checkin.pregnancy == undefined && checkin.glucose_random == undefined && checkin.glucose_fasting == undefined && checkin.glucose_post_prandial == undefined && checkin.lipid_profile_tc == undefined && checkin.urine_leukocytes == undefined){
                    $scope.noIVTdata = true;
                }
                if( (checkin.weightKG == "" || checkin.weightKG == undefined) && (checkin.systolic == "" || checkin.systolic == undefined) && (checkin.bmcOhms == "" || checkin.bmcOhms == undefined) && (checkin.Spo2 == "" || checkin.Spo2 == undefined) && (checkin.temperature == undefined || checkin.temperature =="")  && (checkin.ECGBpm == "" || !(checkin.hasOwnProperty('ECGBpm'))) && $scope.noIVTdata){
                   $scope.emailResults.sendEmailError = 'global.requird.test'; // atleat one test is required for email
                }
                 
                $scope.emailResults.sendingErrorVisible = true;
                $timeout(function(){
                    $scope.emailResults.sendingErrorVisible = false;
                    $scope.emailResults.submitting = false;
                    $scope.abha_send_email = true;
                }, 5000);
            };

            $scope.emailResults.sendCheckinEmail = async function(){
                $scope.emailResults.submitting = true;
                JkioskService.logEvent('keyboard_emailresults_sendButton', 'button', 'pressed');
                $scope.emailResults.nextBtnActive = '';
                $rootScope.keyboardEnterButtonFunction = null;
                $rootScope.keyboardEnterButtonClass  = '';
                JkioskService.registerKiosk();
                var emailAddress =  $scope.emailResults.fields[0].text;
                checkin = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
                var userObject = HigiKioskStorageService.returnSessionData('user');

                let checkInObj =  {
                    'checkin' :checkin,
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
                // This is added for new Payload API
                checkInObj['email'] = emailAddress;

                console.log(checkInObj);

                if ((typeof (userObject) != 'undefined') && (typeof (userObject.id) != 'undefined')) {
                    //$scope.emailResults.submitting = false;
                    checkInObj['id'] = userObject.id;
                    HigiApiService.EmailUserCheckInAsync(userObject.id, emailAddress, checkInObj, $scope.emailResults.sendSuccess, $scope.emailResults.sendError);
                }
                else {
                    //$scope.emailResults.submitting = false;
                    HigiApiService.EmailCheckInAsync(emailAddress, checkInObj, $scope.emailResults.sendSuccess, $scope.emailResults.sendError);
                }
            };
            $scope.abha_skip_continue = function(){
                $rootScope.abha_payment_reason_for_visit = true;
                $rootScope.abhaCloseCheckPaymentFlow();
            }

            $scope.abha_card_send_mail = function(){
                $scope.abha_send_email = false;
                $('.abha_auth_mode_loader').css('display', 'block');
                $scope.abhamaildata = {}; 
                $scope.abhamaildata.user_name = $rootScope.username_for_email_card;
                $scope.abhamaildata.user_email = $scope.emailResults.fields[0].text;
                $scope.abhamaildata.abha_card = $rootScope.abha_card_for_email;
                HigiApiService.Abhacardsendmail($scope.abhamaildata, function(res){
                    if(res.status == "success"){
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.emailResults.sendSuccess();
                    }else{
                        $('.abha_auth_mode_loader').css('display', 'none');
                        $scope.emailResults.sendError();
                    }
                  }, function(err){
                    console.log(err);
                  })
            };

            $scope.emailResults.init();

        }

    };
}]);