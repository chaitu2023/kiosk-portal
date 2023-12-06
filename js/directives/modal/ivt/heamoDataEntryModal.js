higiKioskControllers.directive('heamoDataEntryModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt/heamoDataEntryModal.html',
        controller :function($scope){

            $scope.heamoData = new Object();
            $scope.heamoData.init = function(){
            $scope.disable_heamo_next = "heamo_disabled_next";
                $scope.heamoData.NEXT = "global.next"; 
                $scope.heamoNext = "ivtHeamo.heamoNext";
                $scope.heamoSlideTitle = "ivtHeamo.heamoSlideTitle";
                $scope.heamoDataError = "ivtHeamo.heamoDataError";
                $scope.heamoData.fields = [
                    {id : "heamoData" , placeholder : "Enter heamogobin value", defaultText :"Enter Heamoglobin value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.heamoData.heamoDataCheck(this)}, usesPlaceholder : true}
                ];
                $scope.heamoData.fields[0].text = "";

            };
            
            $scope.heamoData.init();

            $rootScope.heamoData = function() {
                $rootScope.focusField($scope.heamoData.fields[0]);
                $scope.heamoData.init;
            } 

            $scope.heamoData.heamoDataCheck = function(field){
                //console.log(field);
                if(!(isNaN(field.text))){
                    var heamoData = parseFloat(field.text);

                    if (field.text.includes('.')) {
                        $scope.disable_heamo_next = "heamo_disabled_next";
                        const decimalVal = field.text.toString().split('.')[1];
                        
                        if (decimalVal != undefined && decimalVal.length == 1)
                            $scope.disable_heamo_next = "";
                        else
                            $scope.disable_heamo_next = "heamo_disabled_next";
                    } else if(heamoData >= 2 && heamoData <= 20  ){
                        // enable the next button
                        console.log("valid input");
                        $scope.disable_heamo_next = "";  
                    } else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.disable_heamo_next = "heamo_disabled_next";
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.disable_heamo_next = "heamo_disabled_next";
                }
            };

            $scope.heamoValue = function(){
                console.log( $scope.heamoData.fields[0].text);
                HigiKioskStorageService.saveSessionData('heamoglobin', $scope.heamoData.fields[0].text);
                $scope.heamoClass =  HigiKioskUtilitiesService.calculateInvasiveHeamoglobin(HigiKioskStorageService.returnSessionData('gender'), $scope.heamoData.fields[0].text);                
                HigiKioskStorageService.saveSessionData('heamoglobin_class',$scope.heamoClass);

                window.location = "#/invasiveResult/forward";
                $rootScope.clearModal();

                /* if($rootScope.selectedIvtListArray.length == 1){
                    $rootScope.selectedIvtListArray = [];   
                } else {
                    $rootScope.selectedIvtListArray.splice(0, 1);
                    $rootScope.currentIvtTest = $rootScope.selectedIvtListArray[0];
                }
        
                if($rootScope.selectedIvtListArray.length > 0){
                    $scope.nextSlide = '#/invasiveInstruction/forward'; 
                } else if($rootScope.selectedIvtListArray.length == 0 && $rootScope.selectedVital.includes('ivt') && $rootScope.selectedVital.length == 1){
                    $scope.nextSlide = '#/finish/forward';
                } else { 
                    if($rootScope.selectedVital.includes('bpw')){
                        $rootScope.mode = "bpw";
                        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
                        if($rootScope.hardwareAvailability["Blood Pressure"] == true){
                            $scope.nextSlide = "#/bloodpressure1/forward";
                        } else if($rootScope.hardwareAvailability["Weight Scale"] == true){
                            $scope.nextSlide = "#/weight1/forward";
                        } else if($rootScope.hardwareAvailability["Body Composition"] == true && $rootScope.hardwareAvailability["SwitchHardware"] == true){
                            $scope.nextSlide = "#/weight1/forward";
                        } else if($rootScope.hardwareAvailability["SPo2"] == true){
                            $scope.nextSlide = "#/spotwo1/forward";
                        } else if($rootScope.hardwareAvailability["temp"] == true){
                            $scope.nextSlide = "#/temp1/forward";
                        } else if($rootScope.hardwareAvailability["ECG"] == true && $rootScope.hardwareAvailability["SwitchHardware"] == true){
                            $scope.nextSlide = "#/zugecgmode/forward";
                        }
                        
                    } else {
                        $rootScope.mode = $rootScope.selectedVital[1];          
                        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
                        if($rootScope.mode == "w") {
                            $scope.nextSlide = "#/weight1/forward";
                        } else if ($rootScope.mode == "bp") {
                           $scope.nextSlide = "#/bloodpressure1/forward";
                        } else if ($rootScope.mode == "ekg") {
                            $scope.nextSlide = "#/zugecgmode/forward";
                        } else if ($rootScope.mode == "bmc") {
                            $scope.nextSlide = "#/weight1/forward";
                        } else if ($rootScope.mode == "spo2") {
                            $scope.nextSlide = "#/spotwo1/forward";
                        } else if ($rootScope.mode == "temp") {
                            $scope.nextSlide = "#/temp1/forward";
                        }
                    }
                }
                window.location = $scope.nextSlide;
                $rootScope.clearModal(); */
            }    
        }
    };
}]);
