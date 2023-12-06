higiKioskControllers.directive('mehtaUserModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService' , '$rootScope','HigiKioskAnimationService', '$route', function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/mehta/mehta-user-flow.html',
        controller :function($scope) {
            $scope.mehtaUserModal = new Object();
            $scope.mehtaUserModal.init = function() {
                $scope.mehtaUserModal.sectionClass = "modal-slide-in-left";
                $scope.mehtaUserModal.invalidPincode = false;
                $scope.pincode = "welcomeModals.pincode";
                $scope.mobilenumber = "welcomeModals.mehtamobileenumber";
                $scope.mehtaUserModal.globalSubmit = "global.submit";
                $scope.mehtaUserModal.plswaitLoader = "welcomeModals.plwait";
                $scope.mehtaUserModal.pinSubmitBtnActive = '';
                $scope.mehtaUserModal.mobileSubmitBtnActive = '';
                $scope.mehtaUserModal.mobileValidationLoader = true;
                $scope.mehtaUserModal.showMobileNumberSection = false;
                $scope.mehtaUserModal.showPinCodeSection = false;
                $scope.mehtaUserModal.showPatientListSection = false;
                $scope.mehtaUserModal.showAreaListDropdown = false;
                $scope.mehtaUserModal.noAreaAvailable = false;
                $scope.mehtaUserModal.showMobileLoader = false;
                $scope.mehtaUserModal.showPinCodeLoader = false;
                $scope.mehtaUserModal.showNoneOfTheAbove = false;
                $scope.mehtaUserModal.mobileServerIssue = false;
                $scope.mehtaUserModal.pinCodeServerIssue = false;
                $scope.mehtaUserModal.patientList = [];
                $scope.mehtaUserModal.areaList = [];
                $scope.mehtaBaseServerUrl = "";

                if(getSettingsValue('kiosk.config.mehta.server') =="live"){
                        // production evvironment
                    $scope.mehtaBaseServerUrl = "https://mehpatapp1.drmehtas.com:8443/MEHTAHMS/TApiQuery";
                } else {
                    // test evvironment
                    // $scope.mehtaBaseServerUrl = "https://mehcoreapp.drmehtas.com:8443/MEHTATEST/TApiQuery";
                    $scope.mehtaBaseServerUrl = "http://182.75.115.94:8081/MEHTAQANEW/TApiQuery"; // QA API Public to parse multiple object
                }

                $scope.mehtaUserModal.fields = [
                    { id: "mehta-mobile", placeholder:HigiKioskUtilitiesService.getPlaceholder('welcomeModals.entermobileenumber'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.mehtaUserModal.MobilePatternCheck(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
                    { id : "mehta-pincode" , placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.pincode'),defaultText : "Enter your pincode" , text : '' , type :'text' , visible : true , selectedClass : '', callback : function(){$scope.mehtaUserModal.pincodePatternCheck(this)}, focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true},
                ];
                
                if ($rootScope.UserInfo.mobileNumber != undefined && $rootScope.UserInfo.mobileNumber != '') {
                    $scope.mehtaUserModal.fields[0].text = $rootScope.UserInfo.mobileNumber;
                    $scope.mehtaUserModal.mobileSubmitBtnActive = 'mobile_active_btn';
                    $scope.mehtaUserModal.getPatientData();
                } else {
                    $scope.mehtaUserModal.mobileValidationLoader = false;
                    $scope.mehtaUserModal.showMobileNumberSection = true;
                    $rootScope.keyboardShow();
                }
            }
            $rootScope.mehtaUserModalMEHInit = $scope.mehtaUserModal.init;
            
            /* MOBILE PATTERN CHECK FUNCTIONALITY START */
            $scope.mehtaUserModal.MobilePatternCheck = function (field) {
                var str = field.text;
                var specialCharacterPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\| ]/;

                if (str.length == 10 && isNaN(str) == false && str != "0000000000" && !specialCharacterPattern.test(str)) {
                    $scope.mehtaUserModal.mobileSubmitBtnActive = 'mobile_active_btn';
                } else if(str.length == 0) {
                    $scope.mehtaUserModal.mobileSubmitBtnActive = '';
                } else {
                    $scope.mehtaUserModal.mobileSubmitBtnActive = '';
                }
            };
            /* MOBILE PATTERN CHECK FUNCTIONALITY END */

            /* PINCODE PATTERN CHECK FUNCTIONALITY START */
            $scope.mehtaUserModal.pincodePatternCheck = function (field) {
                $scope.mehtaUserModal.areaList = [];
                $scope.mehtaUserModal.noAreaAvailable = false;
                
                var str = field.text;
                if (str.length == 6 && isNaN(str) == false && str != "000000") {
                    $scope.mehtaUserModal.invalidPincode = false;
                    $scope.mehtaUserModal.getAreaByPincode();
                } else if(str.length == 0){
                    $scope.mehtaUserModal.invalidPincode = false;
                    $scope.mehtaUserModal.pinSubmitBtnActive = '';
                } else {
                    $scope.mehtaUserModal.invalidPincode = true;
                    $scope.mehtaUserModal.showAreaListDropdown = false;
                    $scope.mehtaUserModal.pinSubmitBtnActive = '';
                }
            };
            /* PINCODE PATTERN CHECK FUNCTIONALITY END */

            /* GET AREA BY PINCODE FUNCTIONALITY START */
            $scope.mehtaUserModal.getAreaByPincode = function() {
                $scope.mehtaUserModal.showPinCodeLoader = true;
                let Pincode = $scope.mehtaUserModal.fields[1].text;
                let data = [{
                    'pin': Pincode
                }];

                $.ajax({
                    url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                    method: 'POST',
                    data: {'FunctionName': 'GetAreaByPincode', 'data': JSON.stringify(data), 'url': $scope.mehtaBaseServerUrl},
                    success: function(data) {
                        $scope.mehtaUserModal.showPinCodeLoader = false;
                        let response = JSON.parse(data);
                        if (response['Status'] == 'S' && response['Data'].length != 0) {
                            $timeout(function() {
                                $scope.mehtaUserModal.areaList = response['Data'];
                                $scope.mehtaUserModal.showAreaListDropdown = true;
                                $scope.mehtaUserModal.enableScroll();
                            }, 2000);
                        } else if (response['Status'] == 'S' && response['Data'].length == 0) {
                            $scope.mehtaUserModal.noAreaAvailable = true;
                        } else {
                            $scope.mehtaUserModal.pinCodeServerIssue = true;
                            $timeout(function() {
                                $scope.mehtaUserModal.pinCodeServerIssue = false;
                            }, 2000);
                        }
                    }, 
                    error: function(data) {
                        console.log(data);
                    }
                });
            }
            /* GET AREA BY PINCODE FUNCTIONALITY END */

            /* GET PATIENT DATA FUNCTIONALITY START */
            $scope.mehtaUserModal.getPatientData = function() {
                $scope.mehtaUserModal.showMobileLoader = true;
                $scope.mehtaUserModal.mobileSubmitBtnActive = '';

                $rootScope.mehtaUserMobileNumber = $scope.mehtaUserModal.fields[0].text;
                let data = [{
                    'ph': $rootScope.mehtaUserMobileNumber
                }];
                $.ajax({
                    url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                    method: 'POST',
                    data: {'FunctionName': 'GetPatientData', 'data': JSON.stringify(data), 'url': $scope.mehtaBaseServerUrl},
                    success: function(data) {
                        console.log(data);
                        $scope.mehtaUserModal.showMobileLoader = false;
                        let response = JSON.parse(data);
                        console.log(response);
                        if (response['Status'] == 'S' && response['Data'].length != 0) {
                            $timeout(function(){
                                $scope.mehtaUserModal.patientList = response['Data'];
                                /* SORTING THE PATIENT BY DESCENDING ORDER */
                                $scope.mehtaUserModal.patientList.sort( (a,b) => b.MRNO - a.MRNO );
                                $scope.mehtaUserModal.showMobileNumberSection = false;
                                $scope.mehtaUserModal.showPatientListSection = true;
                                $scope.mehtaUserModal.mobileValidationLoader = false;

                                /* PATIENT NAME VALIDATION */

                                let ihlPatientName = HigiKioskStorageService.returnSessionData('firstName')+''+HigiKioskStorageService.returnSessionData('lastName');
                                let resSuccess = $scope.mehtaUserModal.patientList.find(x => x.PATIENT_NAME.trim().replace(/\s/g, "").toLowerCase() === ihlPatientName.trim().replace(/\s/g, "").toLowerCase());
                        
                                if (resSuccess != undefined)
                                    $scope.mehtaUserModal.showNoneOfTheAbove = false;
                                else
                                    $scope.mehtaUserModal.showNoneOfTheAbove = true;

                                $rootScope.keyboardHide();
                                $scope.mehtaUserModal.enableScroll(true);
                            }, 2000);
                        } else if (response['Status'] == 'S' && response['Data'].length == 0) {
                            $scope.mehtaUserModal.mobileValidationLoader = false;
                            $scope.mehtaUserModal.showMobileNumberSection = false;
                            $scope.mehtaUserModal.showPinCodePage();
                        } else {
                            $scope.mehtaUserModal.mobileServerIssue = true;
                            $timeout(function() {
                                $scope.mehtaUserModal.mobileServerIssue = false;
                            }, 2000);
                        }
                    }, 
                    error: function(data) {
                        console.log(data);
                    }
                });
            }
            /* GET PATIENT DATA FUNCTIONALITY END */

            $scope.mehtaUserModal.fineTunePatientName = function(name) {
                let patientName = name;
                
                if (patientName.search(/&amp;/ig) > -1)
                    patientName =  patientName.replace(/&amp;/ig, " & ").toLowerCase();
                else
                    patientName = patientName.toLowerCase();
                
                if (patientName.length > 27 )
                   return `<span>${patientName}</span>`;
                else
                    return patientName;
            }

            $scope.mehtaUserModal.enableScroll = function(patientData = false) {
                $timeout(function() {
                    if (patientData) 
                        $scope.scroll = new FTScroller(document.getElementById('mehta_patient_main_container'), {scrollingX: false});
                    else
                        $scope.scroll = new FTScroller(document.getElementById('pincode_area_dropdown_main_container'), {scrollingX: false});
                },100); 
            }

            $scope.mehtaUserModal.showPinCodePage = function() {
                $scope.mehtaUserModal.pinCodeSection = "modal-slide-in-left";
                $scope.mehtaUserModal.showPatientListSection = false;
                $scope.mehtaUserModal.showPinCodeSection = true;
                if ($rootScope.UserInfo.pincode != undefined) {
                    $scope.mehtaUserModal.fields[1].text = $rootScope.UserInfo.pincode;
                    $scope.mehtaUserModal.getAreaByPincode();
                }
                $rootScope.keyboardShow();
            }

            $scope.mehtaUserModal.selectArea = function(selectedAreaId) {
                $rootScope.mehtaSelectedAreaId = selectedAreaId;
                angular.forEach($scope.mehtaUserModal.areaList, function(Item) {
                    Item['isSelected'] = false;

                    if (Item.AREAID == selectedAreaId) {
                        Item['isSelected'] = true;
                        $scope.mehtaUserModal.pinSubmitBtnActive = 'pincode_active_btn';
                    }
                });
            }

            $scope.mehtaUserModal.startTest = function(patientMRNo) {
                $rootScope.mehtaPatientMRNo = patientMRNo;
                if (patientMRNo != ''){
                    $rootScope.mehtaPatientMRNoAvailable = true;
                    if ($rootScope.UserInfo.ihlthirpartyUserId == undefined && $rootScope.UserInfo.ihlthirdpartyVendorName == undefined) {
                        $scope.mehtaLinkedWithHPod();
                    }                      
                }else{
                    if($scope.mehtaUserModal.fields[1].text != ''){
                        $scope.patientRegistrationWithMehta();
                    }
                }
                
                if ($rootScope.IHLTeleConsultSelected == true) {
                    HigiKioskStorageService.saveSessionData('current_mode', "TC");
                } else {
                    $rootScope.mode = $rootScope.selectedVital[0];
                    HigiKioskStorageService.saveSessionData('current_mode', $rootScope.selectedVital[0]);
                }

                // if ($rootScope.hPodRegistrationFlow)
                if($rootScope.mehtaNextSlide != ''){
                    window.location = $rootScope.mehtaNextSlide;
                    $rootScope.mehtaNextSlide = '';
                }
                $rootScope.clearModal(true);
            }

            $scope.patientRegistrationWithMehta = function() {
                var dateArray = HigiKioskStorageService.returnSessionData('birthdate').split('/');
                if (dateArray[1].length == 1)
                  dateArray[1] = '0'+dateArray[1];
            
                if (dateArray[0].length == 1)
                  dateArray[0] = '0'+dateArray[0];
            
                let Dob = dateArray[1]+dateArray[0]+dateArray[2];
            
                let genderArr = {"m": "Male", "f": "Female"};

                let mobileNum = ($rootScope.mehtaUserMobileNumber == '')? $rootScope.UserInfo.mobileNumber : $rootScope.mehtaUserMobileNumber;
            
                let patientData = [{
                  "DT": Dob,
                  "PH": mobileNum,
                  "AREA": $rootScope.mehtaSelectedAreaId,
                  "EMAIL": HigiKioskStorageService.returnSessionData('email'),
                  "SEX": genderArr[HigiKioskStorageService.returnSessionData('gender')],
                  "PT": HigiKioskStorageService.returnSessionData('firstName')+'%20'+HigiKioskStorageService.returnSessionData('lastName')
                }]
                        
                $.ajax({
                  url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                  method: 'POST',
                  data: {'FunctionName': 'PatientRegistrationWithMehta', 'data': JSON.stringify(patientData), 'url': $scope.mehtaBaseServerUrl},
                  success: function(data) {
                    let res = JSON.parse(data);
                    if (res['Status'] == 'S')
                      $scope.getPatientData();
                  },
                  error: function(data) {
                    console.log(data);
                  }
                });
            }

            $scope.getPatientData = function() {
                let mobileNum = ($rootScope.mehtaUserMobileNumber == '')? $rootScope.UserInfo.mobileNumber : $rootScope.mehtaUserMobileNumber;

                let data = [{
                    'ph': mobileNum
                }];
                        
                $.ajax({
                    url: getSettingsValue('kiosk.port')+'/server/mehta/mehtaApi.php',
                    method: 'POST',
                    data: {'FunctionName': 'GetPatientData', 'data': JSON.stringify(data), 'url': $scope.mehtaBaseServerUrl},
                    success: function(data) {
                      let res = JSON.parse(data);
                        if (res['Status'] == 'S' && res['Data'].length != 0) {
                          
                          /* SORTING THE PATIENT BY DESCENDING ORDER FOR GET THE LATEST MRNO */
                          res['Data'].sort( (a,b) => b.MRNO - a.MRNO );
                          $rootScope.mehtaPatientMRNo = res['Data'][0]['MRNO'];
                          $scope.mehtaLinkedWithHPod();
                        } else {
                          console.log('No data');
                        } 
                    }, 
                    error: function(data) {
                        console.log(data);
                    }
                });
              }
        
              /* MEHTA LINKED WITH HPOD FUNCTIONALITY START */
                $scope.mehtaLinkedWithHPod = function() {
                    let parms = {
                    "ihlthirpartyUserId": $rootScope.mehtaPatientMRNo,
                    "ihlthirdpartyVendorName": "mehta"
                    }
        
                    let success = function(data) {
                        console.log(data)
                    }
        
                    let failure = function(data) {
                    console.log(data);
                    }
        
                    HigiApiService.updateIHLuserData($rootScope.UserInfo.id, $rootScope.UserToken, parms, success, failure);
                }
                /* MEHTA LINKED WITH HPOD FUNCTIONALITY END */
        }
    };
}]);