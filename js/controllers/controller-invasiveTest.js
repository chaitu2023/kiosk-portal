higiKioskControllers.controller('HigiKioskInvasiveController' , ['$interval', '$scope', '$http' , '$rootScope', 'HigiKioskStorageService', 'HigiKioskFlow', 'JkioskService', 'HigiKioskUserService', '$controller', 'HigiKioskUtilitiesService', 'HigiKioskAnimationService', '$timeout', 'HigiApiService', function($interval, $scope, $http, $rootScope, HigiKioskStorageService, HigiKioskFlow, JkioskService, HigiKioskUserService, $controller, HigiKioskUtilitiesService, HigiKioskAnimationService, $timeout, HigiApiService){

  $scope.prevSlideText = "global.back";
  $scope.AddIvasiveSelectedTest = "global.continue";
  $scope.ivtOfflineText = "ivtDash.ivtOfflineText";
  ivtDash.offlineText
  $rootScope.ivtSelected = false;
  $scope.ivtNextVisible = false;
  console.log($rootScope.selectedVital);
  // $rootScope.selectedIvtListArray = [];
  $scope.invasiveBtn = [
    {'label' : 'Glucose', 'mode' : 'glc' , 'buttonId' : 'glucose_ivt_btn', 'description': '', 'name': 'Glucose' },
    {'label' : 'Urine Test', 'mode' : 'urn' , 'buttonId' : 'urine_ivt_btn', 'description': '', 'name': 'Urine Test' },
    {'label' : 'HCV', 'mode' : 'hcv' , 'buttonId' : 'hcv_ivt_btn', 'description': '', 'name': 'HCV' },
    {'label' : 'Pregnancy Test', 'mode' : 'preg' , 'buttonId' : 'pregnancy_ivt_btn', 'description': '', 'name': 'Pregnancy Test' },
    {'label' : 'Dengue', 'mode' : 'deng' , 'buttonId' : 'dengue_ivt_btn', 'description': '', 'name': 'Dengue' },
    {'label' : 'Troponin', 'mode' : 'trop' , 'buttonId' : 'troponin_ivt_btn', 'description': '', 'name': 'Troponin' },
    {'label' : 'Heamoglobin', 'mode' : 'heamo' , 'buttonId' : 'heamoglobin_ivt_btn', 'description': '', 'name': 'Heamoglobin' },
    {'label' : 'Malaria', 'mode' : 'mal' , 'buttonId' : 'malaria_ivt_btn', 'description': '', 'name': 'Malaria' },
    {'label' : 'Syphilis', 'mode' : 'syph' , 'buttonId' : 'syphilis_ivt_btn', 'description': '', 'name': 'Syphilis' },
    {'label' : 'Lipid Profile', 'mode' : 'lip' , 'buttonId' : 'lipid_ivt_btn', 'description': '', 'name': 'Lipid Profile' },
    {'label' : 'HIV', 'mode' : 'hiv' , 'buttonId' : 'hiv_ivt_btn', 'description': '', 'name': 'HIV' },
  ];

  $scope.selectIvtTest = function(ivt_sub){
    // console.log(ivt_sub);
    let mode = ivt_sub.mode;
    if($rootScope.selectedIvtListArray.indexOf(mode) !== -1){
      let idx = $rootScope.selectedIvtListArray.indexOf(mode);
      $rootScope.selectedIvtListArray.splice(idx, 1);
      $scope.removeIvasiveSubTest(mode);
      if($rootScope.selectedIvtListArray.length == 0){
        $scope.ivtNextVisible = false;
      }
    } else {
      $rootScope.selectedIvtListArray.push(mode);
      $scope.addIvasiveSubTest(mode);
      $scope.ivtNextVisible = true;
    }
  }

  $scope.addIvasiveSubTest = function(mode){
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

  $scope.removeIvasiveSubTest = function(mode){
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

  $scope.backButtonOut = function(){
    $rootScope.selectedIvtListArray = [];
    $rootScope.previousUrl = window.location.href.split('#')[1];
    console.log($rootScope.previousUrl);
    window.location = "#/welcome";
  }

  $scope.selectedIvtTestList = function(){
	$rootScope.ivtSelected = true;
    $rootScope.previousUrl = window.location.href.split('#')[1];
    window.location = "#/welcome";
  }

}]);
