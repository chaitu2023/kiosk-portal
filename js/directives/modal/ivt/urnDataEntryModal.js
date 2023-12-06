higiKioskControllers.directive('urnDataEntryModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt/urnDataEntryModal.html',
        controller :function($scope){
            $scope.disable_next = "urn_disabled_next";
            $scope.urnData = new Object();

            $scope.urnData.init = function(){
                $scope.urnNext = "urnModal.urnNext"; 
                $scope.urnSlideTitle = "urnModal.urnSlideTitle";
                $scope.selectInput = "urnModal.selectInput";
                $scope.absenceInput = "urnModal.absenceInput";
                $scope.presenceInput = "urnModal.presenceInput";
                $scope.nilInput = "urnModal.nilInput";
                $scope.leukocytesLabel = "urnModal.leukocytesLabel";
                $scope.nitriteLabel = "urnModal.nitriteLabel";
                $scope.urobilinogenLabel = "urnModal.urobilinogenLabel";
                $scope.proteinLabel = "urnModal.proteinLabel";
                $scope.bloodLabel = "urnModal.bloodLabel";
                $scope.ketoneLabel = "urnModal.ketoneLabel";
                $scope.bilirubinLabel = "urnModal.bilirubinLabel";
                $scope.glucoseLabel = "urnModal.glucoseLabel";
                $scope.invalidText = "urnModal.invalidText";
                $scope.pHLabel = "urnModal.pHLabel";
                $scope.specificGravityLabel = "urnModal.specificGravityLabel";

                console.log($scope.urnData.show_urn_parameter_data_set1,$scope.urnData_set1)
                console.log($scope.urnData.show_urn_parameter_data_set2,$scope.urnData_set2)
                $scope.urnData_set1 = "";
                $scope.urnData_set2 = "";
                $scope.urnData.show_urn_parameter_data_set1 = true;//true;
                $scope.urnData.show_urn_parameter_data_set2 = false;
                $scope.urnData.fields = [
                    {id : "leukocytesData" , placeholder : "Enter Leukocytes value", defaultText :"Enter Leukocytes value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.leukocytesDataCheck(this)}, usesPlaceholder : true},
                    {id : "nitriteData" , placeholder : "Enter Nitrite value", defaultText :"Enter Nitrite value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.nitriteDataCheck(this)}, usesPlaceholder : true},
                    {id : "urobilinogenData" , placeholder : "Enter Urobilinogen value", defaultText :"Enter Urobilinogen value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.urobilinogenDataCheck(this)}, usesPlaceholder : true},
                    {id : "proteinData" , placeholder : "Enter Protein value", defaultText :"Enter Protein value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.proteinDataCheck(this)}, usesPlaceholder : true},
                    {id : "bloodData" , placeholder : "Enter Blood value", defaultText :"Enter Blood value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.bloodDataCheck(this)}, usesPlaceholder : true},
                    {id : "ketoneData" , placeholder : "Enter Ketone value", defaultText :"Enter Ketone value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.ketoneDataCheck(this)}, usesPlaceholder : true},
                    {id : "bilirubinData" , placeholder : "Enter Bilirubin value", defaultText :"Enter Bilirubin value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.bilirubinDataCheck(this)}, usesPlaceholder : true},
                    {id : "glucoseData" , placeholder : "Enter Glucose value", defaultText :"Enter Glucose value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.glucoseDataCheck(this)}, usesPlaceholder : true},
                    {id : "pHData" , placeholder : "Enter pH value", defaultText :"Enter pH value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.pHDataCheck(this)}, usesPlaceholder : true},
                    {id : "specificGravityData" , placeholder : "Enter Specific Gravity value", defaultText :"Enter Specific Gravity value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.urnData.specificGravityDataCheck(this)}, usesPlaceholder : true},
                ];
                $scope.urnData.fields[0].text = "";
                $scope.urnData.fields[1].text = "";
                $scope.urnData.fields[2].text = "";
                $scope.urnData.fields[3].text = "";
                $scope.urnData.fields[4].text = "";
                $scope.urnData.fields[5].text = "";
                $scope.urnData.fields[6].text = "";
                $scope.urnData.fields[7].text = "";
                $scope.urnData.fields[8].text = "";
                $scope.urnData.fields[9].text = "";

                $scope.leukocytesValid = true;
                $scope.nitriteValid = true;
                $scope.urobilinogenValid = true;
                $scope.proteinValid = true;
                $scope.pHValid = true;
                $scope.bloodValid = true;
                $scope.specificGravityValid = true;
                $scope.ketoneValid = true;
                $scope.bilirubinValid = true;
                $scope.glucoseValid = true;
                $scope.pHValid = true;
                $scope.specificGravityValid = true;
            };
            
            $scope.urnData.init();

            $rootScope.urnData = $scope.urnData.init;
            // console.log("$rootScope.urnData : ",$rootScope.urnData)

            
            $('.urn_test_result_status_input').change(function() {
                let count = $(".urn_test_result_status_input").filter((i, e) => e.value==="0").length;
                $('#total').val(count);
            });

            $scope.storeUrineParameter = function(data,i){
                if(data.value == "0"){
                    $scope.urnData.fields[i].text = "-";
                }else if(data.value == "1"){
                    $scope.urnData.fields[i].text = "+";
                }else if(data.value == "2"){
                    $scope.urnData.fields[i].text = "";
                }else{
                    // console.log("else");
                }  
            }
            $scope.urnData.leukocytesDataCheck = function(){
                let data = document.getElementById("leukocytesData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);    
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.leukocytesValid = true;
                    $scope.storeUrineParameter(data,0);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.leukocytesValid = false;
                    $scope.checkNextBtnEnable();
                }    
            };

            $scope.urnData.nitriteDataCheck = function(){
                let data = document.getElementById("nitriteData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.nitriteValid = true;
                    $scope.storeUrineParameter(data,1);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.nitriteValid = false;
                    $scope.checkNextBtnEnable();
                }                          
            };

            $scope.urnData.urobilinogenDataCheck = function(){
                let data = document.getElementById("urobilinogenData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.urobilinogenValid = true;
                    $scope.storeUrineParameter(data,2);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.urobilinogenValid = false;
                    $scope.checkNextBtnEnable();
                }                          
            };

            $scope.urnData.proteinDataCheck = function(){
                let data = document.getElementById("proteinData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.proteinValid = true;
                    $scope.storeUrineParameter(data,3);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.proteinValid = false;
                    $scope.checkNextBtnEnable();
                }      
            };

            $scope.urnData.bloodDataCheck = function(){
                let data = document.getElementById("bloodData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.bloodValid = true;
                    $scope.storeUrineParameter(data,4);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.bloodValid = false;
                    $scope.checkNextBtnEnable();
                }
            };
            
            $scope.urnData.ketoneDataCheck = function(){
                let data = document.getElementById("ketoneData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.ketoneValid = true;
                    $scope.storeUrineParameter(data,5);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.ketoneValid = false;
                    $scope.checkNextBtnEnable();
                }          
            };

            $scope.urnData.bilirubinDataCheck = function(){
                let data = document.getElementById("bilirubinData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.bilirubinData = true;
                    $scope.storeUrineParameter(data,6);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.bilirubinData = false;
                    $scope.checkNextBtnEnable();
                }               
            };
            $scope.urnData.glucoseDataCheck = function(){
                let data = document.getElementById("glucoseData");
                // console.log(data);
                // console.log(data.value);
                // console.log(data.options[data.selectedIndex].text);
                if(data.value == 0 || data.value == 1 || data.value == 2){
                    // enable the next button
                    console.log("valid input");
                    $scope.glucoseData = true;
                    $scope.storeUrineParameter(data,7);
                    $scope.checkNextBtnEnable();
                }else{
                    //disable the next button
                    $scope.glucoseData = false;
                    $scope.checkNextBtnEnable();
                }                
            };

            $scope.urnData.pHDataCheck = function(field){
                // console.log(field);
                if(!(isNaN(field.text))){ //if pH value is a number
                    let pHData = parseFloat(field.text);
                    if(pHData >= 1 && pHData <= 14 && !field.text.includes('.')){
                        // enable the next button
                        console.log("valid input");
                        $scope.pHValid = true;
                        $scope.urnData.fields[8].text = field.text;
                        $scope.checkNextBtnEnable();
                        $rootScope.focusField($scope.urnData.fields[9]);
                    }else{
                        //disable the next button
                        console.log("not valid number");
                        $scope.pHValid = false;
                        $scope.checkNextBtnEnable();
                    }
                }else{
                    //disable the next button
                    console.log("NaN");
                    $scope.pHValid = false;
                    $scope.checkNextBtnEnable();
                }                
            };
            $scope.urnData.specificGravityDataCheck = function(field){
                // console.log(field);
                if(!(isNaN(field.text))){ //if specificGravity value is a number
                    let specificGravityData = parseFloat(field.text);
                    if(specificGravityData >= 1 && specificGravityData <= 1.03 && field.text != '1.'){
                        // enable the next button
                        console.log("valid input");
                        $scope.specificGravityValid = true;
                        $scope.urnData.fields[9].text = field.text;
                        $scope.checkNextBtnEnable();
                    }else{
                        //disable the next button
                        console.log("not valid number");
                        $scope.specificGravityValid = false;
                        $scope.checkNextBtnEnable();
                    }
                }else{
                    //disable the next button
                    console.log("NaN");
                    $scope.specificGravityValid = false;
                    $scope.checkNextBtnEnable();
                }                
            };

            $scope.checkNextBtnEnable = function(){
                // console.log( $scope.leukocytesValid);
                // console.log( $scope.nitriteValid);
                // console.log( $scope.urobilinogenValid);
                // console.log( $scope.proteinValid);
                // console.log( $scope.bloodValid);
                // console.log( $scope.ketoneValid);
                // console.log( $scope.bilirubinData);
                // console.log( $scope.glucoseData);
                // console.log( $scope.pHValid);
                // console.log( $scope.specificGravityValid);
                if ($scope.leukocytesValid == true && $scope.nitriteValid == true && $scope.urobilinogenValid == true && $scope.proteinValid == true
                    && $scope.bloodValid == true && $scope.ketoneValid == true && $scope.bilirubinData == true && $scope.glucoseData == true) {
                    $scope.disable_next = "";
                }else if($scope.pHValid == true && $scope.specificGravityValid == true && $scope.urnData.fields[8].text.length != 0
                    && $scope.urnData.fields[9].text.length != 0){
                    $scope.disable_next = "";
                }else{
                    $scope.disable_next = "urn_disabled_next";
                }
            }

            $scope.urnValue = function(){
                // console.log( $scope.urnData.fields[0].text);
                // console.log( $scope.urnData.fields[1].text);
                // console.log( $scope.urnData.fields[2].text);
                // console.log( $scope.urnData.fields[3].text);
                // console.log( $scope.urnData.fields[4].text);
                // console.log( $scope.urnData.fields[5].text);
                // console.log( $scope.urnData.fields[6].text);
                // console.log( $scope.urnData.fields[7].text);
                // console.log( $scope.urnData.fields[8].text);
                // console.log( $scope.urnData.fields[9].text);
                if($scope.urnData.show_urn_parameter_data_set1 == true){
                    $scope.urnData.show_urn_parameter_data_set1 = false;
                    $scope.urnData_set1 = "modal-slide-out-left";
                    $scope.urnData.show_urn_parameter_data_set2 = true;
                    $rootScope.focusField($scope.urnData.fields[8]);
                    $scope.urnData_set2 = "modal-slide-in-right";
                    $scope.leukocytesValid = false;
                    $scope.nitriteValid = false;
                    $scope.urobilinogenValid = false;
                    $scope.proteinValid = false;
                    $scope.bloodValid = false;
                    $scope.ketoneValid = false;
                    $scope.bilirubinData = false;
                    $scope.glucoseData = false;
                    // document.getElementById("keyboardbox").style.display = "block";
                    $rootScope.keyboardShow(); 
                    $scope.checkNextBtnEnable();
                }else if($scope.urnData.show_urn_parameter_data_set2 == true){
                    $scope.urnData.show_urn_parameter_data_set2 = false;
                    $scope.urnData.show_urn_parameter_data_set1 = true;
                    HigiKioskStorageService.saveSessionData('urine_leukocytes', $scope.urnData.fields[0].text);
                    HigiKioskStorageService.saveSessionData('urine_nitrite', $scope.urnData.fields[1].text);
                    HigiKioskStorageService.saveSessionData('urine_urobilinogen', $scope.urnData.fields[2].text);
                    HigiKioskStorageService.saveSessionData('urine_protein', $scope.urnData.fields[3].text );
                    HigiKioskStorageService.saveSessionData('urine_blood', $scope.urnData.fields[4].text);
                    HigiKioskStorageService.saveSessionData('urine_ketone', $scope.urnData.fields[5].text);
                    HigiKioskStorageService.saveSessionData('urine_bilirubin', $scope.urnData.fields[6].text);
                    HigiKioskStorageService.saveSessionData('urine_glucose', $scope.urnData.fields[7].text);
                    HigiKioskStorageService.saveSessionData('urine_ph', $scope.urnData.fields[8].text);
                    HigiKioskStorageService.saveSessionData('urine_specific_gravity', $scope.urnData.fields[9].text);
                    window.location = "#/invasiveResult/forward";
                    $rootScope.clearModal();
                }                  
            }           
        }
    };
}]);
