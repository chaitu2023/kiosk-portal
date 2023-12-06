higiKioskControllers.directive('lipDataEntryModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt/lipDataEntryModal.html',
        controller :function($scope){
            $scope.disable_next = "lip_disabled_next";
            $scope.lipData = new Object();

            $scope.lipData.init = function(){
                $scope.lipData.NEXT = "global.next"; 
                $scope.lipSlideText = "lipModal.lipSlideText";
                $scope.lipTcText = "lipModal.lipTcText";
                $scope.lipTgText = "lipModal.lipTgText";
                $scope.lipLdlText = "lipModal.lipLdlText";
                $scope.lipHdlText = "lipModal.lipHdlText";
                $scope.lipErrorText = "lipModal.lipErrorText";
                $scope.lipData.fields = [
                    {id : "tcData" , placeholder : "Enter Total Cholesterol value", defaultText :"Enter Total Cholesterol value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.lipData.tcDataCheck(this)}, usesPlaceholder : true},
                    {id : "tgData" , placeholder : "Enter Triglycerides value", defaultText :"Enter Triglycerides value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.lipData.tgDataCheck(this)}, usesPlaceholder : true},
                    {id : "ldlData" , placeholder : "Enter Low Density Lipoprotein Choleterol value", defaultText :"Enter Low Density Lipoprotein Choleterol value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.lipData.ldlDataCheck(this)}, usesPlaceholder : true},
                    {id : "hdlData" , placeholder : "Enter High Density Lipoprotein Choleterol value", defaultText :"Enter High Density Lipoprotein Choleterol value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.lipData.hdlDataCheck(this)}, usesPlaceholder : true}
                ];
                $scope.lipData.fields[0].text = "";
                $scope.lipData.fields[1].text = "";
                $scope.lipData.fields[2].text = "";
                $scope.lipData.fields[3].text = "";

                $scope.tcValid = true;
                $scope.tgValid = true;
                $scope.ldlValid = true;
                $scope.hdlValid = true;
            };
            
            $scope.lipData.init();

            $rootScope.lipData = function() {
                $rootScope.focusField($scope.lipData.fields[0]);
                $scope.lipData.init;
            }

            $scope.lipData.tcDataCheck = function(field){
                //console.log(field);
                if(!(isNaN(field.text))){
                    var tcData = parseInt(field.text);

                    if (field.text.includes('.')) {
                        $scope.tcValid = false;
                        $scope.checkNextBtnEnable();
                    } else if(tcData >= 50 && tcData <= 300  ) {
                        // enable the next button
                        console.log("valid input");
                        $rootScope.focusField($scope.lipData.fields[1]);
                        $scope.tcValid = true;
                        $scope.checkNextBtnEnable();
                    } else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.tcValid = false;
                        $scope.checkNextBtnEnable();
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.tcValid = false;
                    $scope.checkNextBtnEnable();
                }
            };
            $scope.lipData.tgDataCheck = function(field){
                //console.log(field);
                if(!(isNaN(field.text))){
                    var tgData = parseInt(field.text);
                    if (field.text.includes('.')) {
                        $scope.tgValid = false;
                        $scope.checkNextBtnEnable();
                    } else if(tgData >= 50 && tgData <= 300  ){
                        // enable the next button
                        console.log("valid input");
                        $rootScope.focusField($scope.lipData.fields[2]);
                        $scope.tgValid = true;
                        $scope.checkNextBtnEnable();
                    } else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.tgValid = false;
                        $scope.checkNextBtnEnable();
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.tgValid = false;
                    $scope.checkNextBtnEnable();
                }
            };
            $scope.lipData.ldlDataCheck = function(field){
                //console.log(field);
                if(!(isNaN(field.text))){
                    var ldlData = parseInt(field.text);

                    if (field.text.includes('.')) {
                        $scope.ldlValid = false;
                        $scope.checkNextBtnEnable();
                    } else if(ldlData >= 20 && ldlData <= 200  ) {
                        // enable the next button
                        console.log("valid input");
                        $rootScope.focusField($scope.lipData.fields[3]);
                        $scope.ldlValid = true;
                        $scope.checkNextBtnEnable();
                    } else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.ldlValid = false;
                        $scope.checkNextBtnEnable();
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.ldlValid = false;
                    $scope.checkNextBtnEnable();
                }
            };
            $scope.lipData.hdlDataCheck = function(field){
                //console.log(field);
                if(!(isNaN(field.text))){
                    var hdlData = parseInt(field.text);

                    if (field.text.includes('.')) {
                        $scope.hdlValid = false;
                        $scope.checkNextBtnEnable();
                    } else if(hdlData >= 20 && hdlData <= 100  ) {
                        // enable the next button
                        console.log("valid input");
                        $scope.hdlValid = true;
                        $scope.checkNextBtnEnable();
                    } else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.hdlValid = false;
                        $scope.checkNextBtnEnable();
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.hdlValid = false;
                    $scope.checkNextBtnEnable();
                }
            };

            $scope.checkNextBtnEnable = function(){
                if($scope.hdlValid == true && $scope.ldlValid == true && $scope.tgValid == true && $scope.tcValid == true
                    &&  $scope.lipData.fields[0].text.length != 0 && $scope.lipData.fields[1].text.length != 0 && $scope.lipData.fields[2].text.length != 0 && $scope.lipData.fields[3].text.length != 0){
                    $scope.disable_next = "";
                } else {
                    $scope.disable_next = "lip_disabled_next";
                }
            }

            $scope.lipValue = function(){
                $scope.lipData.fields[0].text = (parseInt($scope.lipData.fields[0].text).toFixed(1)).toString();
                $scope.lipData.fields[1].text = (parseInt($scope.lipData.fields[1].text).toFixed(1)).toString();
                $scope.lipData.fields[2].text = (parseInt($scope.lipData.fields[2].text).toFixed(1)).toString();
                $scope.lipData.fields[3].text = (parseInt($scope.lipData.fields[3].text).toFixed(1)).toString();
                // console.log( "tc : ",$scope.lipData.fields[0].text);
                // console.log( "hg : ",$scope.lipData.fields[1].text);
                // console.log( "tg : ",$scope.lipData.fields[2].text);
                // console.log( "ldl : ",$scope.lipData.fields[3].text);
                HigiKioskStorageService.saveSessionData('lipid_profile_tc', $scope.lipData.fields[0].text);
                HigiKioskStorageService.saveSessionData('lipid_profile_hg', $scope.lipData.fields[3].text);
                HigiKioskStorageService.saveSessionData('lipid_profile_tg', $scope.lipData.fields[1].text);
                HigiKioskStorageService.saveSessionData('lipid_profile_ldl', $scope.lipData.fields[2].text );
                window.location = "#/invasiveResult/forward";
                $rootScope.clearModal();
            }    
        }
    };
}]);
