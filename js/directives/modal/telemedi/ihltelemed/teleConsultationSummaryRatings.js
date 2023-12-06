higiKioskControllers.directive('teleconsultationsummaryratings', ['$http', 'HigiKioskFlow' ,'$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService'  , '$route' , function($http, HigiKioskFlow, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $route) {
    return{
      restrict: 'E',
      scope: true,
      templateUrl: 'components/modal/telemedi/ihltelemed/teleConsultation-summary-ratings.html',
      controller :function($scope, $http, $rootScope){
        $scope.ratings = new Object();
        $scope.ratingsStarArray = [0,0,0,0,0];
        $scope.selectedStar = -1;

        $scope.validInput = false;
        $scope.validStarRatings = false;
        $scope.summaryDisabled = false;
        $scope.ratings.init = function(){
            $scope.ratings.fields = [
                {
                    id : "teleConsultationSummaryRatings" , 
                    defaultText : "Review about doctor" , 
                    text : "" ,
                    placeholder:'Review about doctor',
                    type :'text' , 
                    visible : true , 
                    selectedClass : '', 
                    callback : function(){$scope.ratings.characterValidation(this)}, 
                    focus : function(){$rootScope.focusField(this)}, usesPlaceholder : true}
            ];
            $rootScope.fields.ratings = $scope.ratings.fields;
        }
        $scope.ratings.characterValidation = function(obj){
            let text = obj.text;
            let len = text.length;
            if(len>=4 && len <= 200) $scope.validInput = true;
            else $scope.validInput = false;
        }
        

        $scope.updateRatingsStar = function(star_num){
            if($scope.selectedStar == star_num){
                $scope.selectedStar = -1;
                $scope.validStarRatings = false;
            }else{
                $scope.selectedStar = star_num;
                $scope.validInput = true;
                $scope.validStarRatings = true;
            }
            $scope.updateRatings($scope.selectedStar);
        }

        $scope.updateRatings = function(star_num){
            let a =[0,0,0,0,0];

            for(i=0; i<star_num; i++){
                a[i] = 1;
            }
            $scope.ratingsStarArray = a;
        }

        $scope.sumbitRatingResponse = function(){
            //$rootScope.clearModal();
            let selectedData = $rootScope.teleconsultationUserSelectedData;
            let selectedDoctor =  selectedData['tele-consultation-selected-doctor'];
            
            if (selectedDoctor == undefined || selectedDoctor == null) {
                selectedDoctor = $rootScope.teleconsultationAbnormalCallEndedData;
            }

            let userId = HigiKioskStorageService.returnSessionData('user').id.toString();
            let doctorRates = $scope.ratingsStarArray.reduce((total,value) =>{
                return total + value;
            });
            let doctorText = $scope.ratings.fields[0].text;
            $scope.summaryDisabled = true;
            let obj = { 
                        "user_ihl_id": userId, 
                        "consultant_name": (selectedDoctor['name'] == undefined || selectedDoctor['name'] == null) ? selectedDoctor['consultant_name'] : selectedDoctor['name'], 
                        "ihl_consultants_id": selectedDoctor['ihl_consultant_id'], 
                        "vendor_consultatation_id": selectedDoctor['vendor_consultant_id'], 
                        "ratings":doctorRates.toString(),  
                        "review_text":doctorText.toString(),   
                        "vendor_name":selectedDoctor['vendor_id']
                    };
                    //console.log(obj);

            HigiApiService.postDoctorReview(obj,function (data) {
                //console.log(data);
                //console.log(status);
                if (typeof (data) === "object") {
                    $scope.summaryDisabled = false;
                    $scope.ratingsStarArray = [0,0,0,0,0];
                    $scope.selectedStar = -1;
                    $scope.validInput = false;
                    $scope.validStarRatings = false;
                    $scope.summaryDisabled = false;
                    $rootScope.clearModal();
                }else{
                    $scope.summaryDisabled = false;
                }
            });
            if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_id'] == 'APOLLO'){
                $rootScope.apolloCouponCodeGenerate();    
            }
            
        }

        $scope.ratingsFieldocus = function(defaultMethod){
            $rootScope.focusField($scope.ratings.fields[0]);
            // $scope.reasonForVisit.nextBtnActive = "";
            // $scope.reasonForVisit.paymentMethodenable = false;
            // $scope.reasonForVisit.purposeVisitenable = true;
          }
        $rootScope.ratingsInitScreen = $scope.ratingsFieldocus;
      
        // $rootScope.ratingsModal = function(){

        // }


        $scope.ratings.init();
      }
    };
  }]);
  
  