 higiKioskControllers.directive('ivtDashboardModal', ['$rootScope', 'HigiKioskFlow', 'HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http', function( $rootScope, HigiKioskFlow, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService,HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/ivt-dashboard.html',
        link :function(scope, elem, attrs){
           
          scope.init = function(){
            scope.prevSlideText = "global.back";
            scope.AddIvasiveSelectedTest = "global.continue";
            scope.invasive = "ivtDash.invasive";
            scope.ivtDashSubTitle = "ivtDash.ivtDashSubTitle";
            scope.glucose = "ivtDash.glucose";
            scope.urine = "ivtDash.urine";
            scope.hcv = "ivtDash.hcv";
            scope.pregnancy = "ivtDash.pregnancy";
            scope.dengue = "ivtDash.dengue";
            scope.troponin = "ivtDash.troponin";
            scope.heamoglobin = "ivtDash.heamoglobin";
            scope.malaria = "ivtDash.malaria";
            scope.syphilis = "ivtDash.syphilis";
            scope.lipid = "ivtDash.lipid";
            scope.hiv = "ivtDash.hiv";
            scope.offlineText = "ivtDash.offlineText";
            $rootScope.ivtSelected = true;
            $rootScope.ivtNextVisible = false;
            scope.ivtDashboardBackVisible = true;
            console.log($rootScope.selectedVital);
            // $rootScope.selectedIvtListArray = [];
            scope.count = 0;
 
            if($rootScope.vitalPriceObjectOfThisKiosk.fullArray.length > 0){
               scope.glucosePrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['blood_glucose']);
               scope.urinePrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['urine']);
               scope.hcvPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['hcv']);
               scope.pregnancyPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['pregnancy']);
               scope.denguePrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['dengue']);
               scope.troponinPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['troponin']);
               scope.heamoglobinPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['haemoglobin']);
               scope.malariaPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['malaria']);
               scope.syphilisPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['syphilis']);
               scope.lipidPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['lipid_profile']);
               scope.hivPrice = Number($rootScope.vitalPriceObjectOfThisKiosk.fullArray[0]['hiv']);
             }
 
             scope.invasiveBtn = [
              { 'label': scope.glucose, 'mode': 'glc', 'buttonId': 'glucose_ivt_btn', 'description': '', 'name': 'Glucose', 'price': scope.glucosePrice },
              { 'label': scope.urine, 'mode': 'urn', 'buttonId': 'urine_ivt_btn', 'description': '', 'name': 'Urine Test', 'price': scope.urinePrice },
              { 'label': scope.hcv, 'mode': 'hcv', 'buttonId': 'hcv_ivt_btn', 'description': '', 'name': 'HCV', 'price': scope.hcvPrice },
              { 'label': scope.pregnancy, 'mode': 'preg', 'buttonId': 'pregnancy_ivt_btn', 'description': '', 'name': 'Pregnancy Test', 'price': scope.pregnancyPrice },
              { 'label': scope.dengue, 'mode': 'deng', 'buttonId': 'dengue_ivt_btn', 'description': '', 'name': 'Dengue', 'price': scope.denguePrice },
              { 'label': scope.troponin, 'mode': 'trop', 'buttonId': 'troponin_ivt_btn', 'description': '', 'name': 'Troponin', 'price': scope.troponinPrice },
              { 'label': scope.heamoglobin, 'mode': 'heamo', 'buttonId': 'heamoglobin_ivt_btn', 'description': '', 'name': 'Heamoglobin', 'price': scope.heamoglobinPrice },
              { 'label': scope.malaria, 'mode': 'mal', 'buttonId': 'malaria_ivt_btn', 'description': '', 'name': 'Malaria', 'price': scope.malariaPrice },
              { 'label': scope.syphilis, 'mode': 'syph', 'buttonId': 'syphilis_ivt_btn', 'description': '', 'name': 'Syphilis', 'price': scope.syphilisPrice },
              { 'label': scope.lipid, 'mode': 'lip', 'buttonId': 'lipid_ivt_btn', 'description': '', 'name': 'Lipid Profile', 'price': scope.lipidPrice },
              { 'label': scope.hiv, 'mode': 'hiv', 'buttonId': 'hiv_ivt_btn', 'description': '', 'name': 'HIV', 'price': scope.hivPrice },
            ];
          }

          $rootScope.ivtDashBoardInit = scope.init;
                     
          scope.selectIvtTest = function(ivt_sub){
            console.log(ivt_sub);
            let mode = ivt_sub.mode;
            scope.resetIVTArray();
            
            if($rootScope.selectedIvtListArray.indexOf(mode) !== -1){
              let idx = $rootScope.selectedIvtListArray.indexOf(mode);
              $rootScope.selectedIvtListArray.splice(idx, 1);
              scope.removeIvasiveSubTest(mode);
              if($rootScope.selectedIvtListArray.length == 0){
                $rootScope.ivtNextVisible = false;
              }
            } else {
              $rootScope.selectedIvtListArray.push(mode);
              scope.addIvasiveSubTest(mode);
              $rootScope.ivtNextVisible = true;
            }

            if ($rootScope.kioskWithPaymentMode) {
              if (localStorage.getItem("ivtListArr") != true && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false) {
                localStorage.setItem("ivtListArr", JSON.stringify($rootScope.selectedIvtListArray));
              }
              scope.getTotalAmountForVitalTest($rootScope.selectedIvtListArray);
            }
          }

           scope.addIvasiveSubTest = function(mode){
             if(mode == "glc"){
               document.getElementById('glucose_ivt_btn').id = 'glucose_ivt_btn_active';
             } else if( mode == "urn"){
               document.getElementById('urine_ivt_btn').id = 'urine_ivt_btn_active';
             } else if( mode == "hcv"){
               document.getElementById('hcv_ivt_btn').id = 'hcv_ivt_btn_active';
             } else if( mode == "preg"){
               document.getElementById('pregnancy_ivt_btn').id = 'pregnancy_ivt_btn_active';
             } else if( mode == "deng"){
               document.getElementById('dengue_ivt_btn').id = 'dengue_ivt_btn_active';
             } else if( mode == "trop"){
               document.getElementById('troponin_ivt_btn').id = 'troponin_ivt_btn_active';
             } else if(mode == 'heamo'){
               document.getElementById('heamoglobin_ivt_btn').id = 'heamoglobin_ivt_btn_active';
             } else if(mode == 'mal'){
               document.getElementById('malaria_ivt_btn').id = 'malaria_ivt_btn_active';
             } else if(mode == 'syph'){
               document.getElementById('syphilis_ivt_btn').id = 'syphilis_ivt_btn_active';
             } else if(mode == 'lip'){
               document.getElementById('lipid_ivt_btn').id = 'lipid_ivt_btn_active';
             } else if(mode == 'hiv'){
               document.getElementById('hiv_ivt_btn').id = 'hiv_ivt_btn_active';
             }
           }

           scope.removeIvasiveSubTest = function(mode){
             if(mode == "glc"){
               document.getElementById('glucose_ivt_btn_active').id = 'glucose_ivt_btn';
             } else if( mode == "urn"){
               document.getElementById('urine_ivt_btn_active').id = 'urine_ivt_btn';
             } else if( mode == "hcv"){
               document.getElementById('hcv_ivt_btn_active').id = 'hcv_ivt_btn';
             } else if( mode == "preg"){
               document.getElementById('pregnancy_ivt_btn_active').id = 'pregnancy_ivt_btn';
             } else if( mode == "deng"){
               document.getElementById('dengue_ivt_btn_active').id = 'dengue_ivt_btn';
             } else if( mode == "trop"){
               document.getElementById('troponin_ivt_btn_active').id = 'troponin_ivt_btn';
             } else if(mode == 'heamo'){
               document.getElementById('heamoglobin_ivt_btn_active').id = 'heamoglobin_ivt_btn';
             } else if(mode == 'mal'){
               document.getElementById('malaria_ivt_btn_active').id = 'malaria_ivt_btn';
             } else if(mode == 'syph'){
               document.getElementById('syphilis_ivt_btn_active').id = 'syphilis_ivt_btn';
             } else if(mode == 'lip'){
               document.getElementById('lipid_ivt_btn_active').id = 'lipid_ivt_btn';
             } else if(mode == 'hiv'){
               document.getElementById('hiv_ivt_btn_active').id = 'hiv_ivt_btn';
             }
           }

           scope.backButtonOut = function(){
             if ($rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false) $rootScope.kioskInvasiveTestCost = 0;
             $rootScope.selectedIvtListArray = [];
             $rootScope.ivtNextVisible = false;
             console.log("$rootScope.selectedVital.length = " + $rootScope.selectedVital.length);
             console.log("$rootScope.selectedVital[0] = " + $rootScope.selectedVital[0]);
             if($rootScope.selectedVital.length == 1 && $rootScope.selectedVital[0] == 'ivt'){
               $rootScope.ivtBackBtn();
             } else {
               $rootScope.selectedVital.splice($rootScope.selectedVital.indexOf('ivt'), 1 );
               $rootScope.ivtBackBtnWithNonIVT();
             }
             $rootScope.kioskVitalTestCost = $rootScope.kioskNonInvasiveTestCost + $rootScope.kioskInvasiveTestCost;
             $rootScope.clearModal();
           }

           scope.selectedIvtTestList = function(){            
              if($rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == true){
                  // $rootScope.ivtIndexRemove = false;
              }
              $rootScope.ivtContinueBtn();
              $rootScope.clearModal();
             //$rootScope.previousUrl = window.location.href.split('#')[1];
             //window.location = "#/welcome";
           }

           //for kiosk vitals payment
          scope.getTotalAmountForVitalTest = function (vitals) {
            console.log(vitals);
            // debugger
            let selectedVitals = scope.invasiveBtn.filter(item => vitals.includes(item.mode));
            console.log(selectedVitals);
            if (selectedVitals.length > 0 && $rootScope.vitalPayment) {
              let priceForAllSelectedTest = selectedVitals.map(obj => { return obj.price });
              let totalPriceForAllSelectedTest = priceForAllSelectedTest.reduce((total, value) => { return Number(total) + Number(value) });
              if ($rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false) $rootScope.kioskInvasiveTestCost = totalPriceForAllSelectedTest;
            }
            if (selectedVitals.length == 0 && $rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == false) $rootScope.kioskInvasiveTestCost = 0;
            $rootScope.kioskVitalTestCost = $rootScope.kioskNonInvasiveTestCost + $rootScope.kioskInvasiveTestCost;

          };

          scope.resetIVTArray = function(){
            if($rootScope.kioskPaymentmodeVitalTestHomePageClickRepeat == true && scope.count == 0){
              $rootScope.selectedIvtListArray = [];
              scope.count++;
              return;
            }
          }

        }
     }

  }]);