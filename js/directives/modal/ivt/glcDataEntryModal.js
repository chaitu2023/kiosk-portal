higiKioskControllers.directive('glcDataEntryModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt/glcDataEntryModal.html',
        controller :function($scope){
            $scope.glcData = new Object();

            $scope.glcData.init = function(){
                $scope.disable_next = "";
                $scope.glcNext = "global.next"; 
                $scope.glcSlideTitile = "glcModal.glcSlideTitile";
                $scope.glcError = "glcModal.glcError";
                $scope.glcData.fields = [
                    {id : "glcData" , placeholder : "Enter glucose value", defaultText :"Enter Glucose value", text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.glcData.glcDataCheck(this)}, usesPlaceholder : true}
                ];
                $scope.glcData.fields[0].text = "";
            };
            
            $scope.glcData.init();

            $rootScope.glcData =  function() {
                $rootScope.focusField($scope.glcData.fields[0]);
                $scope.glcData.init;
            }

            $scope.glcData.glcDataCheck = function(field){
                // console.log(field);
                if(!(isNaN(field.text)) && !field.text.includes('.')){
                    var glcData = parseInt(field.text);
                    // if(glcData >= 20 && glcData <= 700  ){
                    //     // enable the next button
                    //     console.log("valid input");
                    //     $scope.disable_next = "";
                    // } else {
                    //     // disable the next button
                    //     console.log("not valid number");
                    //     $scope.disable_next = "glc_disabled_next";
                    // }
                    if($rootScope.glcCustomOption == 'glcRan' && glcData >= 80){
                        // enable the next button
                        console.log("valid input");
                        $scope.disable_next = "";
                    }else if($rootScope.glcCustomOption == 'glcFas' && glcData >= 70){
                        // enable the next button
                        console.log("valid input");
                        $scope.disable_next = "";
                    }else if($rootScope.glcCustomOption == 'glcpos' && glcData >= 20){
                        // enable the next button
                        console.log("valid input");
                        $scope.disable_next = "";
                    }else {
                        // disable the next button
                        console.log("not valid number");
                        $scope.disable_next = "glc_disabled_next";
                    }
                } else {
                    //disable the next button
                    console.log("NaN");
                    $scope.disable_next = "glc_disabled_next";
                }
            };

            $scope.glcValue = function(){
                console.log( $scope.glcData.fields[0].text);

                if($rootScope.glcCustomOption == 'glcRan'){
                    $scope.glucose_random = HigiKioskStorageService.saveSessionData('glucose_random', $scope.glcData.fields[0].text);
                    HigiKioskUtilitiesService.calculateInvasiveGlucoseRandom($scope.glucose_random);
                } else if($rootScope.glcCustomOption == 'glcFas'){
                    $scope.glucose_fasting = HigiKioskStorageService.saveSessionData('glucose_fasting', $scope.glcData.fields[0].text);
                    HigiKioskUtilitiesService.calculateInvasiveGlucoseFasting($scope.glucose_fasting);
                } else if($rootScope.glcCustomOption  == "glcpos"){
                    $scope.glucose_post_prandial = HigiKioskStorageService.saveSessionData('glucose_post_prandial', $scope.glcData.fields[0].text);
                    HigiKioskUtilitiesService.calculateInvasiveGlucosePrandial($scope.glucose_post_prandial);
                }

                window.location = "#/invasiveResult/forward";
                $rootScope.clearModal();
            }    
        }
    };
}]);
