higiKioskControllers.directive('infoboxTelemedicineModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', '$route', '$sce', 'HigiKioskUtilitiesService'  , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService,  $route, $sce,HigiKioskUtilitiesService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/telemedi/gem3s/telemedicine.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){        
                //Set localization fields
                //alert("telemedicineModal");
                $scope.telemedicinetitles = "global.telemedicine.buttontitle";
                $scope.consultdoctormessage = "global.telemedicine.consultdoctormessage";
                $scope.acceptdoctor = "global.telemedicine.acceptdoctor";
                $scope.declinedoctor = "global.telemedicine.declinedoctor";
               
            };

            $scope.Doctorconsultdeclinemodalbox = function() {  
                $rootScope.loadModal({id: 'exitconfirm'});      
            };

          $scope.Doctorconsultacceptmodalbox = function(){
                
                $scope.teleMedicineAgreement = HigiKioskStorageService.returnSessionData('telemediAgreementResponse');
                
                if($scope.teleMedicineAgreement == undefined || $scope.teleMedicineAgreement == null ){
                    $scope.teleMedicineAgreement = false;
                }

                //for telemedicine agreement enabling and disabling.(search with this comment line)
                /*if($scope.teleMedicineAgreement == false){
                    $rootScope.loadModal({id: 'telemedicinestartmodalbox'});
                } else {
                    window.location = "#/specialist";
                }*/

                window.location = "#/specialist";

          };


            $scope.init();

        }

    };
}]);
