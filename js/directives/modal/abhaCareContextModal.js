higiKioskControllers.directive('abhaCareContextModal', ['$rootScope', 'HigiKioskFlow', 'HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http', function ($rootScope, HigiKioskFlow, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http) {
  return {
    restrict: 'E',
    scope: false,
    templateUrl: 'components/modal/abha-care-context.html',
    link: function ($scope, elem, attrs) {
      $scope.abhaCareContext = new Object();
      $scope.abhaCareContext.init = function () {
        console.log("Comes to the Abha");
        $scope.res = '';
        $scope.overAllData = "";
        $scope.filteredData = "";
        $scope.abhaCareContext.shareVital = '';
        $scope.abhaCareContext.shareVitalArray = [];
        $scope.abhaCareContext.VerifyAndContinueActiveBtn = '';
        $scope.isSelectAll = false;
        $scope.loadingImg = false;
        $rootScope.abhaCareContextPopupEnable = false;
        $scope.abhaCareContext.abhaLinkButtonClass = 'abha_careCon_active_btn';
        $scope.userTestTaken = true;
        $scope.linktestResWithAbha = true;
        $scope.EnableshowAbhaCCInfobox = false;
        $scope.abhaCCInfobackbutton = false;
        $scope.abhaCareContext.selectDeselectText = 'Select All';
        $scope.noDataFound = false;
        $scope.latest_DataShow = true;
        $scope.overAll_DataShow = false;

        /*
        HigiApiService.fetchABHACareContext($rootScope.abhaAddressFetched, function(res){
          console.log(res)
          let arrList = [];
          res = res.data;
          
          if(res != undefined){
            res.forEach(element => {
              if(element['flag_confirm'] == false){
                arrList.push(element);
              }
            });
          }
          $scope.res = arrList;
          $scope.loadingImg = false;
        }, function(err){
          console.log(err);
        })
        */
      };

      $rootScope.abhaCareContextModelInit = $scope.abhaCareContext.init;

      $scope.abhaCareContext.ShareSelectedVitalData = function () {
        let newArray = [];
        $scope.res.forEach(element => {
          if (element.isSelected == true) {
            newArray.push(element);
          }
        });
        $scope.abhaCareContext.shareVitalArray = newArray;
        $scope.abhaCareContext.shareVital = 'active_checkmark';

        if ($scope.isSelectAll == true && ($scope.abhaCareContext.shareVitalArray.length != $scope.res.length)) {
          $scope.isSelectAll = false;
          $scope.abhaCareContext.selectDeselectText = 'Select All';
          document.getElementById('abhaSelectAllVital').checked = false;
        } else if ($scope.abhaCareContext.shareVitalArray.length == $scope.res.length) {
          $scope.isSelectAll = true;
          $scope.abhaCareContext.selectDeselectText = 'Deselect All';
          document.getElementById('abhaSelectAllVital').checked = true;
        } else {
          $scope.abhaCareContext.selectDeselectText = 'Select All';
        }

        if ($scope.abhaCareContext.shareVitalArray.length > 0) {
          $scope.abhaCareContext.VerifyAndContinueActiveBtn = 'active_btn';
        }
        else {
          $scope.abhaCareContext.shareVital = '';
          $scope.abhaCareContext.VerifyAndContinueActiveBtn = '';
        }
      }

      $scope.abhaCareContext.ShareAllVitalData = function () {
        $scope.isSelectAll = !$scope.isSelectAll;
        if (!$scope.isSelectAll) {
          $scope.res.forEach(element => {
            // console.log(element);
            element.isSelected = false;
          });
          $scope.abhaCareContext.shareVitalArray = [];
          $scope.abhaCareContext.shareVital = '';
          $scope.abhaCareContext.selectDeselectText = 'Select All';
          $scope.abhaCareContext.VerifyAndContinueActiveBtn = '';
          return 0;
        }
        console.log($scope.res);
        $scope.res.forEach(element => {
          element.isSelected = true;
        });
        $scope.abhaCareContext.ShareSelectedVitalData();
      }

      $scope.showAbhaCCInfobox = function () {
        $scope.linktestResWithAbha = false;
        $scope.EnableshowAbhaCCInfobox = true;
        $scope.nextVisible = true;
        setTimeout(function () {
          $scope.abhaCCInfobackbutton = true;
          $scope.enableScroll_info();
        }, 1000);
      }
      $scope.enableScroll_info = function () {
        $scope.scroll = new FTScroller(document.getElementById('abha_cc_info_container_scroll'), { scrollingX: false });
      }

      $scope.abhaCCinfobackbutton = function () {
        $scope.abhaCCInfobackbutton = false;
        $scope.EnableshowAbhaCCInfobox = false;
        $scope.nextVisible = false;
        // setTimeout(function(){
        $scope.linktestResWithAbha = true;
        // }, 1);          
      }

      $scope.abhaCareContext.verifyAndContinueFlow = function () {
        $rootScope.abhaCareContextShareVitalArrayList = [];
        $rootScope.shareCareContextEnable = true;
        /* old code starts here
        //filter the 4 property alone in the array list to get success response
        $rootScope.abhaCareContextShareVitalArrayList = $scope.abhaCareContext.shareVitalArray;
        if($rootScope.abhaCareContextShareVitalArrayList.length > 0){
          $rootScope.abhaCareContextShareVitalArrayList.forEach(element => {
            element["patient_abha_address"] = "kumar9600700114@sbx";
            delete element["patient_referrence_num"];
            delete element["patient_abha_id"];
            delete element["user_ihl_id"];
            delete element["dateTimeFormatted"];
            delete element["logged_carecontext"];
            delete element["mobile_no"];
            delete element["$$hashKey"];
            delete element["isSelected"];
          })
        }
        old code ends here
        */
        if ($scope.abhaCareContext.shareVitalArray.length > 0) {
          $scope.abhaCareContext.shareVitalArray.forEach(element => {
            $rootScope.abhaCareContextShareVitalArrayList.push(element);
          });
        }
        $rootScope.abhaVerifyModelInit();
        $rootScope.loadModal({ id: 'abhaVerify' });
      }

      $scope.abhaCareContext.abhaCareContextShareBtn = async function (item) {
        if (item == 'Yes') {
          $scope.linktestResWithAbha = false;
          $rootScope.abhaCareContextPopupEnable = true;
          $scope.loadingImg = true;

          $scope.checkinData = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
          console.log($scope.checkinData);

          console.log(HigiKioskStorageService.returnSessionData('user').id);
          console.log(HigiKioskStorageService.returnSessionData('user').email);

          // let id = 'N6wKpKGxoUS0TlVpoU81tw';
          // $scope.checkinData = {HigiCheckin: {"heightMeters":1.7784552845528456,"LeadMode":0,"temperature":"38.0","roomTemperature":"81.5","gender":"m","dateOfBirth":"10/1/1990","Age":"32","firstName":"test","IHL_ID":"N6wKpKGxoUS0TlVpoU81tw","IHLMachineId":"2709","IHLMachineName":"","IHLMachineLocation":"","IHLMachineDeploymentDate":"","ecg_graph_shown":""}};
          // let email = "abc@indiahealthlink.com";

          $scope.loadingImg = true;
          $scope.previousCheckInString = '';
          if (HigiKioskStorageService.returnSessionData('previousCheckInData')) $scope.previousCheckInString = JSON.stringify(HigiKioskStorageService.returnSessionData('previousCheckInData'));

          $scope.checkinDataString = JSON.stringify($scope.checkinData);

          console.log($scope.previousCheckInString);
          console.log($scope.checkinDataString);
          console.log($scope.checkinDataString !== $scope.previousCheckInString);

          if ($scope.checkinDataString !== $scope.previousCheckInString) {

            HigiKioskStorageService.saveSessionData('previousCheckInData', $scope.checkinData);

            let checkInObj =  {
              'higiCheckin' :$scope.checkinData,
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

            HigiApiService.CreateCheckInGameAsync(HigiKioskStorageService.returnSessionData('user').id, checkInObj, HigiKioskStorageService.returnSessionData('user').email,
              // Success
              function (resp) {
                console.log(resp)
                // $rootScope.abhaAddressFetched = "ashley2000@sbx";
              },
              // Failure
              function (e) {
                console.log(e);
                $scope.loadingImg = false;
                $scope.navigateToHomePage();
              }
            );
          }
          HigiApiService.fetchABHACareContext($rootScope.abhaAddressFetched, function (res) {
            console.log(res)
            if(res.status == 'success'){
              let arrList = [];

              res = res.data;
              if(res.length > 0){
                res.forEach(element => {
                  if (element['flag_confirm'] == false) {
                    arrList.push(element);
                  }
                });
                // hardcore response if any  

                // console.log($scope.res);

                $scope.overAllData = $scope.allVitalData(arrList);
                // console.log($scope.res);

                if($rootScope.UserInfo['abha_hip_link_alert_last_date']){
                  $scope.filteredData = $scope.overAllData.filter((item) => {
                    let match = item.carecontext_detail.Timestamp.match(/\d+/);
                    let timestamp = parseInt(match[0], 10);
                    let storedTime = parseInt($rootScope.UserInfo['abha_hip_link_alert_last_date']);
                    if(new Date(storedTime) < new Date(timestamp)){
                      return item;
                    }
                  });
                }

                console.log($scope.filteredData);
                if($scope.filteredData.length > 0 || $rootScope.UserInfo['abha_hip_link_alert_last_date']){
                  $scope.res = $scope.filteredData;
                }else{
                  $scope.res = $scope.overAllData;
                }

                console.log($scope.res);

                $scope.isSelectAll = !$scope.isSelectAll;
                $scope.res.forEach(element => {
                  element.isSelected = true;
                });
                $scope.abhaCareContext.ShareSelectedVitalData();

                if($scope.res.length == 0){
                  $scope.noDataFound = true;  
                }

                $scope.loadingImg = false;
              }else{
                $scope.noDataFound = true;
                $scope.loadingImg = false;
              }
            }else{
              $scope.noDataFound = true;
              $scope.loadingImg = false;
            }
          }, function (err) {
            $scope.loadingImg = false;
          });
        } else {
          if ($rootScope.UserInfo.mobileNumber != undefined && $rootScope.UserInfo.mobileNumber != '') {
            let data = {
              "method": "PatientSmsNotify",
              "data": $rootScope.UserInfo.mobileNumber
            };

            HigiApiService.getABHASession(data);
          }
          $rootScope.clearModal();
        }
      }

      $scope.allVitalData = function (data) {
        console.log(data.length);
        for (let i = 0; i < data.length; i++) {
          data[i].vitalParam = [];
          if (data[i].carecontext_detail.Timestamp != undefined) {
            var rawdatetime = data[i].carecontext_detail.Timestamp;
            rawdatetime = rawdatetime.replace("/Date(", "");
            rawdatetime = rawdatetime.replace(")/", "");
            var offsetposition = rawdatetime.indexOf('+');
            if (offsetposition > 0) {
              rawdatetime = rawdatetime.substring(0, offsetposition);
            }
            var checkindate = new Date(parseInt(rawdatetime));
            var checkindateformat = dateFormat(checkindate, "longDate");
            var checkintimeformat = dateFormat(checkindate, "h:MM TT");
            data[i].checkInRawDate = checkindate;
            data[i].checkInDate = checkindateformat + ' / ' + checkintimeformat;
          }
          if (data[i].carecontext_detail.BpClass && (data[i].carecontext_detail.FatClass || data[i].carecontext_detail.body_fat_mass) &&
            data[i].carecontext_detail.BmiClass && data[i].carecontext_detail.SpO2Class && data[i].carecontext_detail.Temperature && data[i].carecontext_detail.ECGBpm) {
            data[i].vitalParam.push($rootScope.vital_param_title_8);
          } else {
            if (data[i].carecontext_detail.BpClass) {
              data[i].vitalParam.push($rootScope.vital_param_title_1);
            }
            if (data[i].carecontext_detail.FatClass) {
              data[i].vitalParam.push($rootScope.vital_param_title_2); // normal BMC
            }
            if (data[i].carecontext_detail.BmiClass) {
              data[i].vitalParam.push($rootScope.vital_param_title_3);
            }
            if (data[i].carecontext_detail.SpO2Class) {
              data[i].vitalParam.push($rootScope.vital_param_title_4);
            }
            if (data[i].carecontext_detail.Temperature) {
              data[i].vitalParam.push($rootScope.vital_param_title_5);
            }
            if (data[i].carecontext_detail.body_fat_mass) {
              data[i].vitalParam.push($rootScope.vital_param_title_6); // Full body BMC
            }
            if (data[i].carecontext_detail.ECGBpm) {
              if (data[i].carecontext_detail.ECGBpm != '0') {
                data[i].vitalParam.push($rootScope.vital_param_title_7);
              }
            }
            if (data[i].carecontext_detail.dengue_IgG) {
              data[i].vitalParam.push($rootScope.vital_param_title_9);
            }
            if (data[i].carecontext_detail.malaria_p_f) {
              data[i].vitalParam.push($rootScope.vital_param_title_10);
            }
            if (data[i].carecontext_detail.hiv_I) {
              data[i].vitalParam.push($rootScope.vital_param_title_11);
            }
            if (data[i].carecontext_detail.hcv) {
              data[i].vitalParam.push($rootScope.vital_param_title_12);
            }
            if (data[i].carecontext_detail.pregnancy) {
              data[i].vitalParam.push($rootScope.vital_param_title_13);
            }
            if (data[i].carecontext_detail.troponin) {
              data[i].vitalParam.push($rootScope.vital_param_title_14);
            }
            if (data[i].carecontext_detail.syphilis) {
              data[i].vitalParam.push($rootScope.vital_param_title_15);
            }
            if (data[i].carecontext_detail.glucose_random_class || data[i].carecontext_detail.glucose_fasting_class || data[i].carecontext_detail.glucose_prandial_class) {
              data[i].vitalParam.push($rootScope.vital_param_title_16);
            }
            if (data[i].carecontext_detail.heamoglobin_class) {
              data[i].vitalParam.push($rootScope.vital_param_title_17);
            }
            if (data[i].carecontext_detail.lipid_profile_tc_class) {
              data[i].vitalParam.push($rootScope.vital_param_title_18);
            }
            if (data[i].carecontext_detail.urine_leukocytes) {
              data[i].vitalParam.push($rootScope.vital_param_title_19);
            }
          }


          // console.log("aft filter : ",objList)

        }
        let objList = [];
        data = data.filter((data) => {
          let item = data.carecontext_detail;
          if (item['dengue_IgG'] || item['malaria_p_f'] || item['hiv_I'] || item['hcv'] || item['pregnancy'] || item['urine_leukocytes'] ||
            item['troponin'] || item['syphilis'] || item['glucose_random_class'] || item['heamoglobin_class'] || item['lipid_profile_tc_class'] ||
            item['body_fat_mass'] || item['Temperature'] || item['SpO2Class'] || item['BpClass'] || item['BmiClass'] ||
            (item['ECGBpm'] && item['ECGBpm'] != '0')) {
            objList.push(data);
          }
        })
        return objList.reverse();
      }

      $scope.careContextDataShowTab = function(item){
        if(item == 'overAll_DataShow'){
          $scope.latest_DataShow = false;
          $scope.overAll_DataShow = true;
          $scope.res = $scope.overAllData;
          $scope.isSelectAll = !$scope.isSelectAll;
          $scope.res.forEach(element => {
            element.isSelected = true;
          });
          if($scope.res.length == 0){
            $scope.noDataFound = true;
            $scope.loadingImg = false;
          }else{
            $scope.noDataFound = false;
          }
        }else if(item == 'latest_DataShow'){
          $scope.res = $scope.filteredData;
          $scope.latest_DataShow = true;
          $scope.overAll_DataShow = false;
          $scope.isSelectAll = !$scope.isSelectAll;
          $scope.res.forEach(element => {
            element.isSelected = true;
          });
          if($scope.res.length == 0){
            $scope.noDataFound = true;
            $scope.loadingImg = false;
          }else{
            $scope.noDataFound = false;
          }
        }

        $scope.abhaCareContext.ShareSelectedVitalData();

      }

      $scope.accordionClickVital = function (index) {
        for (var i = 0; i < $scope.res.length; i++) {
          let vitalAccIcon = document.getElementById("vital_accordion_image_" + i);
          if (index == i) {
            $("#panel_" + i).toggle();
            vitalAccIcon.classList.toggle("rotateAccIcon");

          } else {
            $("#panel_" + i).hide();
            vitalAccIcon.classList.remove("rotateAccIcon");
          }
        }

      }

      $scope.abhaCareContext.init();
    }
  }
}]);