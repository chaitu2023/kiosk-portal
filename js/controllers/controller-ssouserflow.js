higiKioskControllers.controller('ssoUserFlowController', ['$timeout', 'HigiApiService', '$scope', '$rootScope', 'HigiKioskFlow', 'HigiKioskAnimationService', 'JkioskService', 'HigiKioskStorageService', '$route', 'HigiKioskUserService', '$location', 'fireStore', function($timeout, HigiApiService, $scope, $rootScope, HigiKioskFlow, HigiKioskAnimationService, JkioskService, HigiKioskStorageService, $route, HigiKioskUserService, $location, fireStore) {
    $scope.ssoUserModal = new Object();
    $scope.ssoUserModal.qrCodeMsg = 'welcomeModals.qrCodeMsg';
    $scope.ssoUserModal.installApp = 'welcomeModals.installApp';
    $scope.ssoUserModal.backToLogin = 'welcomeModals.backToLogin';
    $scope.ssoUserModal.loginAlertMsg = 'welcomeModals.loginAlertMsg';
    $rootScope.qrCodeMobileDownload = false;
    $scope.showLoginAlertMsg = false;

    $scope.init = function() {
        let encKioskId = $scope.aesEncryption($rootScope.uniqueKioskId);
        
        /* GENERATE QR CODE FOR SSO LOGIN */

        $scope.ssoUserModal.qrCodeWebKey = HigiKioskStorageService.getSettingsValue("kiosk.qrCodeWebKey"); 
        $scope.ssoUserModal.qrCodeMobileKey = HigiKioskStorageService.getSettingsValue("kiosk.qrCodeMobileKey");
        $scope.ssoUserModal.qrCodeWebIv = HigiKioskStorageService.getSettingsValue("kiosk.qrCodeWebIv");
        $scope.ssoUserModal.qrCodeMobileIv = HigiKioskStorageService.getSettingsValue("kiosk.qrCodeMobileIv");

        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            data: encKioskId,
            dotsOptions: {
              type: "square"
            }
        });
        qrCode.append(document.getElementById("canvas"));
        
        if ($rootScope.fireStore)
            $scope.initiateFireStore();
        else
            $scope.initiateCrossbar();
    };
    
    $scope.ssoUserModal.showMobileApp = function() {
        $rootScope.qrCodeMobileDownload = true;
    }

    $scope.ssoUserModal.backToQrCodePage = function() {
        $rootScope.qrCodeMobileDownload = false;
    }

    $scope.getUserInfoFromSubscription = function(param, sender_id, sender_session_id, receiver_id) {
        let token = $scope.aesDecryption(param['token']);
        let userId = $scope.aesDecryption(sender_id);
        let kioskId = $scope.aesDecryption(receiver_id);

        console.log(param);
        console.log(sender_id);

        /* LOGIN PROCESS BY IHL ID */

        if (kioskId == $rootScope.uniqueKioskId) {

            if ($route.current.$$route.originalPath.search("finish") != -1) {
                var callback = $rootScope.saveCheckinFinalResultsLogin;
            } else {
                var callback = null;
            }

            HigiApiService.getUserDetails(userId, token, function (resp) {
                $rootScope.UserInfo = resp.User;

                HigiApiService.storeLoginUserRecord(userId, "ihlQR", function(res){
                    console.log('storeLoginUserRecord', res);
                    $rootScope.hideESanjeevaniBtn = false;
                }, function(err){
                    console.log('storeLoginUserRecord', err);
                    $rootScope.hideESanjeevaniBtn = true;
                });

                if (resp != null) {
                    $scope.getPastKioskVitalData(resp);
                }
                if($rootScope.abhaflowEnable){
                    $scope.ABHACardLinkCheck();    
                }
                if (resp != null) {     
                    $rootScope.UserToken = resp.Token;
                    $rootScope.logged_mail = resp.User.email;

                    //for telemedicine agreement enabling and disabling.(search with this comment line)
                    var telemediagreementresponse = resp.User.isTeleMedPolicyAgreed;
                    HigiKioskStorageService.saveSessionData('telemediAgreementResponse', telemediagreementresponse);

                    //for affiliation
                    var loginResp = resp;
                    HigiKioskStorageService.saveSessionData('loginResp', loginResp);

                    if (resp.User != null && resp.User != undefined && resp.User != "") {
                        var affiliateUserId = resp.User.id;
                        HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                        if (resp.User.affiliate != undefined && resp.User.affiliate != null) {
                            //alert("affiliate");
                            $rootScope.updateAffiliate = true;
                        }else{
                            //alert("not a affiliate");
                            $rootScope.updateAffiliate = false;
                        }
                    }
                    //for affiliation ends
                }

                if (resp == null) {
                    $scope.showLoginAlertMsg = true;
                    $timeout(() => {
                        $scope.showLoginAlertMsg = false;
                    }, 5000);
                }
                else {
                    //for affiliation
                    var loginResp = resp;
                    HigiKioskStorageService.saveSessionData('loginResp', loginResp);

                    if (resp.User != null && resp.User != undefined && resp.User != "") {
                        var affiliateUserId = resp.User.id;
                        HigiKioskStorageService.saveSessionData('affiliateUserId', affiliateUserId);
                        if (resp.User.affiliate != undefined && resp.User.affiliate != null) {
                            //alert("affiliate");
                            $rootScope.updateAffiliate = true;
                        }else{
                            //alert("not a affiliate");
                            $rootScope.updateAffiliate = false;
                        }
                    }
                    //for affiliation ends


                    // session storage for telemedi registeration flow start
                    //````````````````````````````````````````````````````````````

                    HigiKioskStorageService.saveSessionData('telemedloginUserId' , resp.User.id);
                    HigiKioskStorageService.saveSessionData('qlogin' , resp);

                    $rootScope.kioskOrgBasedAffliateAdd(HigiKioskStorageService.returnSessionData('qlogin'));

                    if (resp.LastCheckin != undefined) {
                        HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);

                        if (resp.LastCheckin.gender == "m") {
                            HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                        }

                        if (resp.User.firstName == undefined) {
                            if (resp.LastCheckin.firstName != undefined) {  // old user can't come inside the user object                                   
                                HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.LastCheckin.firstName);
                            } else {
                                HigiKioskStorageService.saveSessionData('telemedUserFirstName', "Gusest User");
                            }
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                        }

                        if (resp.User.lastName != undefined) {  // old user can't have a last name                                  
                            HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.User.lastName);
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                        }

                        if (resp.LastCheckin.dateOfBirth != undefined) {
                            var dob = resp.LastCheckin.dateOfBirth.split(" ");
                            if (dob.length > 1) {
                                dob = dob[0].replace(/\//g, '-') + dob[1].replace(/\//g, '-') + dob[2].replace(/\//g, '-') + dob[3].replace(/\//g, '-') + dob[4].replace(/\//g, '-');
                                HigiKioskStorageService.saveSessionData('telemedUserDOB', dob);
                            } else {
                                HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.LastCheckin.dateOfBirth.replace(/\//g, '-'));
                            }
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                        }

                        if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                            HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', "");
                        }

                    } else {
                        // first time login user
                        HigiKioskStorageService.saveSessionData('telemedUserEmail', resp.User.email);
                        HigiKioskStorageService.saveSessionData('telemedUserFirstName', resp.User.firstName);
                        if (resp.User.lastName != undefined) {
                            HigiKioskStorageService.saveSessionData('telemedUserLastName', resp.User.lastName);
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserLastName', "null");
                        }
                        if (resp.User.dateOfBirth != undefined) {
                            HigiKioskStorageService.saveSessionData('telemedUserDOB', resp.User.dateOfBirth.replace("/", "-"));
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserDOB', "01-30-1800"); // dummy date provide for telemedi registeration
                        }
                        if (resp.User.gender != undefined) {
                            if (resp.User.gender == "m") {
                                HigiKioskStorageService.saveSessionData('telemedUserGender', "male");
                            } else {
                                HigiKioskStorageService.saveSessionData('telemedUserGender', "female");
                            }
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserGender', "male");  // dummy date provide for telemedi registeration
                        }

                        if (resp.User.mobileNumber != undefined) {  // mobile number is optional for ihl registeration flow             
                            HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', resp.User.mobileNumber);
                        } else {
                            HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', ""); // dummy mobile number provided for telemedi registeration
                        }

                    }
                    // session storage for telemedi registeration flow end
                    //````````````````````````````````````````````````````````````

                    //to make telemedicine button available after login
                    if ($rootScope.telemediSetting) {
                        $rootScope.telemedicineButtonAvailable = true;
                        var telemedEmailId = $("#email").val();
                        HigiKioskStorageService.saveSessionData('telemedAuthorizedEmail', telemedEmailId);
                    }

                    HigiKioskStorageService.saveSessionData('sampleText', resp.User.id);
                    if (resp.ChallengeUserRelation !== undefined) {
                        HigiKioskStorageService.saveSessionData('challengeObject', resp.ChallengeUserRelation);
                    } else {
                    }

                    $rootScope.resetSessionTimeout();
                    HigiKioskUserService.initSession(resp.User, resp.LastCheckin, false, resp.Token, resp, callback);
                    //  $(".higi_login_btn_profile").show();
                    $('.higi_top_nav_ng').show();

                    if(resp.LastCheckin == undefined && $rootScope.kioskWithPaymentMode){
                        $rootScope.lastCheckinModalShow = true;
                        $scope.modalHide();
                    }
                }

                if (!HigiKioskStorageService.returnSessionData('logged_in')) {
                    var path = $location.path();
                    if (path == "/welcome") {
                        $rootScope.isVisibleExit = false;
                        //$rootScope.showExitButton = false;
                        $rootScope.isVisibleAudio = true;
                        $rootScope.isVisibleReg = true;
                    }
                    else if (path == "/finish/forward") {
                        $rootScope.isVisibleExit = true;
                        $rootScope.isVisibleReg = false;
                    }
                } else {
                    $rootScope.isVisibleExit = false;
                    $rootScope.isVisibleReg = true;
                    $rootScope.isVisibleAudio = true;
                }
            });
        }
    }

    $scope.getPastKioskVitalData = function(resp) {
        if(resp != null) {
            if (resp != undefined && resp != null &&  resp.length != 0) {
                if (resp['LastCheckin'] != undefined && resp['LastCheckin'] != null) {
                  let healthData = resp['LastCheckin'];
                  $scope.filteredVitalData(healthData);
                }
              }else{
                let healthData = [];
                $scope.filteredVitalData(healthData);
            }
        }
    }

    $scope.filteredVitalData = function(lastCheckinVital) {
        $rootScope.pastKioskVitalData = {};
        let lastCheckin = {};
        $scope.vitalToShare = {};
        let vitalToShare = {
            bmi: '', 
            bmiClass: '', 
            dateTime: '', 
            diastolic: '', 
            ECGBpm: '', 
            fatRatio: '', 
            heightMeters: '', 
            leadTwoStatus: '',
            pulseBpm: '',
            spo2: '',
            systolic: '',
            temperature: '',
            weightKG: '',
            body_fat_mass: '',
            percent_body_fat: '',
            skeletal_muscle_mass:'',
            body_cell_mass:'',
            visceral_fat:'',
            bone_mineral_content: '',
            protien: '',
            mineral: '',
            intra_cellular_water: '',
            extra_cellular_water: '',
            waist_hip_ratio: '',
            waist_height_ratio: '',
            basal_metabolic_rate: ''
        };
        
        if ("weightKG" in lastCheckinVital && lastCheckinVital["weightKG"] != null && lastCheckinVital["weightKG"] != undefined && !isNaN(lastCheckinVital["weightKG"])) {
            lastCheckinVital["weightKG"] = Math.round(+lastCheckinVital["weightKG"]);
        }
        if ("heightMeters" in lastCheckinVital && lastCheckinVital["heightMeters"] != null && lastCheckinVital["heightMeters"] != undefined && !isNaN(lastCheckinVital["heightMeters"])) {
            lastCheckinVital["heightMeters"] = Math.round(+lastCheckinVital["heightMeters"]);
        }
        
        for (let key in vitalToShare) {
          if (key in lastCheckinVital) {
            if (lastCheckinVital[key] != undefined && lastCheckinVital[key] != null && 
                lastCheckinVital[key] != NaN && lastCheckinVital[key] != "-" && lastCheckinVital[key] != "") {
              lastCheckin[key] = lastCheckinVital[key];
            }
          }
        }
        $rootScope.pastKioskVitalData = lastCheckin;
        if ("temperature" in $rootScope.pastKioskVitalData && $rootScope.pastKioskVitalData["temperature"] != null && $rootScope.pastKioskVitalData["temperature"] != undefined &&  $rootScope.pastKioskVitalData["temperature"].toString().trim().length > 0 && !isNaN($rootScope.pastKioskVitalData["temperature"])) {
            $rootScope.pastKioskVitalData["temperature"] = (parseFloat($rootScope.pastKioskVitalData["temperature"]) * 9 / 5 + 32).toFixed(1);
        }
    }

    $scope.aesEncryption = function(kioskId) {
        let key = CryptoJS.enc.Utf8.parse($scope.interfaceLabels[$scope.ssoUserModal.qrCodeWebKey]);
        let iv = CryptoJS.enc.Utf8.parse($scope.interfaceLabels[$scope.ssoUserModal.qrCodeWebIv]);

        let encrypted = CryptoJS.AES.encrypt(kioskId, key,
            {
                iv:iv,
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7
            }
        )

        return encrypted.toString();
    }

    $scope.aesDecryption = function(data) {
        let mobileKey = CryptoJS.enc.Utf8.parse($scope.interfaceLabels[$scope.ssoUserModal.qrCodeMobileKey]);
        let mobileIv = CryptoJS.enc.Utf8.parse($scope.interfaceLabels[$scope.ssoUserModal.qrCodeMobileIv]);

        let decrypted = CryptoJS.AES.decrypt(data, mobileKey, 
            {
                iv: mobileIv,
                mode:CryptoJS.mode.CBC,
                padding:CryptoJS.pad.Pkcs7 
            }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
    }

    $scope.initiateCrossbar = function() {
        if ('Crossbar' in $rootScope == false) return;
        if ($rootScope.Crossbar instanceof CrossbarClass == false) return;

        let userId = 'LoginByQR';

        $rootScope.Crossbar.updateUserId(userId);
        
        $rootScope.Crossbar.on_connection_established = () => { $scope.onCrossbarConnectionEstablished(); }
        
        if ($rootScope.Crossbar.is_connected == true) {
            $rootScope.Crossbar.on_connection_established();
        } else {
            $rootScope.Crossbar.connect();
        }
    }

    $scope.onCrossbarConnectionEstablished = async function() {
        let channel_subscription_list = [
            {
                'channel_name': 'ihl_kiosk_login_channel',
                'subscription_handler':(param, sender_id, sender_session_id, receiver_id)=>{$scope.getUserInfoFromSubscription(param, sender_id, sender_session_id, receiver_id);}
            }
        ];

        channel_subscription_list.forEach(async (item)=>{
            let res = $rootScope.Crossbar.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
            if(res == false){
                await $rootScope.Crossbar.subscribeToChannels([item]);
            }
        });

        // $scope.$on("$destroy", function(){
        //     if ($rootScope.Crossbar != undefined ) {
        //         $rootScope.Crossbar.unSubscribeToChannel('ihl_kiosk_login_channel');
        //         $rootScope.Crossbar.closeConnection();
        //     }
        // });
    }

    $scope.initiateFireStore = function() {
        fireStore.getAll($rootScope.teleConsultationCollectionName).onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                const res = doc.data();
                if ('data' in res && ('cmd' in res['data'])) {
                    if ((res['data']['cmd'] == 'LoginByQR') && res['published']) {
                        $scope.getUserInfoFromSubscription(res['data'], res['sender_id'], '', res['receiver_ids']);
						return;
                    }
                }
            });
        });
    }

    $scope.ABHACardLinkCheck = function(){
        let data = {
            method : 'abhaDetailFetchIhlId',
            data : $rootScope.UserInfo.id
        };

        HigiApiService.getABHASession(data, function(res){
            console.log(res);
            var data = JSON.parse(res);

            if(data.status == 'S'){
                if(data.res == "[]"){
                    $rootScope.abhaAccountLinked = false;
                } else {
                    console.log(typeof(data.res));
                    var abhaDetail = JSON.parse(data.res)[0];
                    console.log(abhaDetail);
                    $rootScope.abhaAddressFetched = abhaDetail.abha_address;
                    $rootScope.abhaAccountLinked = true;
                }                                              
            } else {
                // faild response
                $rootScope.abhaAccountLinked = false;
            }
        }, function(res){
            console.log("error");
            console.log(res);
            $rootScope.abhaAccountLinked = false;
        })
    }

    $timeout(() => {
      $scope.init();
    }, 5000);
}]);