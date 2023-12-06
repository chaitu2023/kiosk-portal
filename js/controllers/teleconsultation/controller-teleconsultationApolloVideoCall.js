
higiKioskControllers.controller('teleconsultationApolloVideoCallController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', '$sce', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, $sce) {
	

    $scope.init = function () {
    	$scope.apolloTeleConsultationVideoCallFlowStart();
      $scope.checkAttempt = 0;

      $scope.$on("$destroy", function(){
        $scope.checkNetworkAvailability = undefined;
        $scope.apolloTeleConsultationVideoCallFlowStart = undefined;  
        $rootScope.trustSrc = undefined;
      });
    }

   	$scope.apolloTeleConsultationVideoCallFlowStart = function(){
   		$rootScope.apolloTeleConsultationSourceDetails.message = 'Preparing live call...';
      	let userDetails = $rootScope.apolloTeleConsultationSourceDetails.userBasicDetails;
      	let specialityId = $rootScope.apolloTeleConsultationSourceDetails.specialityId;
      	let appointmentId = $rootScope.apolloTeleConsultationSourceDetails.appointmentId;
      	let updatedMobileNumber = (HigiKioskStorageService.returnSessionData('updatedMobileNumber') != undefined && HigiKioskStorageService.returnSessionData('updatedMobileNumber') != null ) ? HigiKioskStorageService.returnSessionData('updatedMobileNumber') : "";
        $scope.updatedUserBasicInfo = (HigiKioskStorageService.returnSessionData('userBasicInfo') != undefined && HigiKioskStorageService.returnSessionData('userBasicInfo') != null) ? HigiKioskStorageService.returnSessionData('userBasicInfo') : "";
        let patientId = "";
      	let patientMobileNumber = "";
      	let patientFirstName = "";
      	let patientLastName = "";
      	let patientDOB = "";
      	let patientEmail = "";
      	let patientGender = "";
      	let accessToken = "";
                
      	if (userDetails == undefined || userDetails == null || specialityId == undefined || specialityId == null || appointmentId == undefined || appointmentId == null) {
        
        	$rootScope.apolloTeleConsultationSourceDetails.message = 'Invalid Appointment Details';
        	return;
      	}else{

	        if (userDetails.id == undefined || userDetails.id == null) {
	          $rootScope.apolloTeleConsultationSourceDetails.message = 'Invalid User Id';
	          return;
	        }

  	    	patientMobileNumber = (updatedMobileNumber.trim().length == 10) ? updatedMobileNumber : ((userDetails.mobileNumber != undefined && userDetails.mobileNumber != null && userDetails.mobileNumber.trim().length == 10) ? userDetails.mobileNumber : "");
  	    	patientEmail = (userDetails.email != undefined && userDetails.email != null && userDetails.email.trim().length > 0) ? userDetails.email : "";
  	    	patientId = userDetails.id;
  	    	patientFirstName = (userDetails.firstName != undefined && userDetails.firstName != null && userDetails.firstName.trim().length > 0) ? userDetails.firstName : "";
  	    	patientLastName =  (userDetails.lastName != undefined && userDetails.lastName != null && userDetails.lastName.trim().length > 0) ? userDetails.lastName : "";
  	    	patientDOB = $scope.userEpochAge(userDetails.dateOfBirth);
  	    	patientGender = $scope.userGender(userDetails); 
      	} 
         
        let data = {};
        let apolloVideoCallUrl = "";
        
        if (getSettingsValue('kiosk.api.url') == "https://azureapi.indiahealthlink.com") {
          data = {
            "grant_type":"client_credentials",
            "audience":"https://medeintegra.dev",
            "client_id":"ec493916-8f14-45b7-ba4b-1e0f58683e94",
            "client_secret":"4e2482f1-e953-4c60-b376-478d1008934517397d52-f024-4169-8a0a-40d9f3434c1d"
          }; 
          apolloVideoCallUrl = "https://myconsult.medeintegra.app/book/i?phone=";  
        }else{
          data = {
            "grant_type":"client_credentials",
            "audience":"https://test.medeintegra.dev",
            "client_id":"df7546c7-6b27-442c-b0a5-caa36273270b@ihl",
            "client_secret":"e4708f58-bf18-4f6a-96e8-18524b49efba70bb15be-db73-44e0-ad23-bda72a551ecb"
          };  
          apolloVideoCallUrl = "https://myconsult.test.medeintegra.app/book/i?phone=";         
        }
          
      	HigiApiService.generateTokenForApolloTeleconsultation(data,function (resp) {
        
        	if (resp.message == "Token Obtained Successfully") {
        		accessToken = resp.access_token;
           	let urlValue = apolloVideoCallUrl + patientMobileNumber + "&email=" + patientEmail + "&patientId=" + patientId + "&firstName=" + patientFirstName + "&lastName=" + patientLastName + "&ageInEpoch=" + patientDOB + "&gender=" + patientGender + "&doctorSpecialityId=" + specialityId + "&accessToken=" + accessToken + "";
	        	$rootScope.apolloTeleConsultationSourceDetails.message = 'You Are Redirecting. Please wait... ';

            $rootScope.trustSrc(urlValue).then(async (srcUrl)=>{
              $rootScope.apolloTeleConsultationSourceDetails.apolloTeleConsultationVideoCallUrl = srcUrl;
              console.log($rootScope.apolloTeleConsultationSourceDetails.apolloTeleConsultationVideoCallUrl);
              $rootScope.apolloTeleConsultationPopup['videoCallIframe'] = true;
              await ($rootScope.genixConstants.updateAppointmentCallStatus($rootScope.apolloTeleConsultationSourceDetails.appointmentId, 'on_going'));
              
              //invoke call back function repeatedly to check network online or offline status. 
              $timeout(() => {
                $scope.checkNetworkAvailability(function repeat(callBackValue){
                  if ($scope.checkNetworkAvailability != undefined) {
                    if (callBackValue == true) {
                      $scope.checkNetworkAvailability(repeat);
                    }else{
                      if ($scope.checkAttempt > 2) {
                        $scope.checkAttempt = 0;
                        $rootScope.apolloTeleConsultationPopup['videoCallIframe'] = false;
                        $rootScope.internetLostInformation = "global.internetLostInformationApollo";
                        $rootScope.internetDropped = true;
                        $timeout(()=>{
                          $rootScope.exitCurrentSession();
                          $rootScope.internetDropped = false;
                        },7000);
                      }else{
                        $scope.checkNetworkAvailability(repeat);
                        $scope.checkAttempt++;
                      }
                    }
                  }else{
                    console.log("checkNetworkAvailability Function is made undefined to prevent later callbeacks");
                  }
                });
              },5000);
            });

            //mock data
	        	/*$timeout(function(){
	        		$rootScope.apolloTeleConsultationSourceDetails.message = 'Doctor is preparing some prescription. Please wait... ';
            	$rootScope.apolloTeleConsultationPopup['videoCallIframe'] = false;
            	$rootScope.convertPrescriptionPdfUrlToBase64("https://blob.test.medeintegra.dev/blob/mede_blob_6de34040-744c-49c3-8430-f2466b4e6e70.pdf");
              $rootScope.updateApolloCaseSheetData();
	        	},30*1000);*/
          		//casesheet_a511f001-f809-43b2-a103-0f7009221614
        	}
      	});
    }

    $rootScope.updateApolloCaseSheetData = function(){
    	let data = {
    		'ihl_appointment_id': $rootScope.apolloTeleConsultationSourceDetails.appointmentId,
    		'apollo_case_sheet_id': $rootScope.apolloTeleConsultationSourceDetails.casesheetId
    	};
    	console.log(data);
    	//mock data
    	/*let data = {
    		'ihl_appointment_id': $rootScope.apolloTeleConsultationSourceDetails.appointmentId,
    		'apollo_case_sheet_id': "mede_appointment_0fa3fb80-b856-46c7-bdf5-88df403531a4"
    	};*/
    	HigiApiService.updateApolloCaseSheetId(data,function (resp) {
        if (resp.status == 'Updated') {
        	window.location = '#/ihl-teleconsultation-summary';
        }
        console.log(resp);
      });
    };

    $scope.userEpochAge = function (dob) {
        if (dob == undefined || dob == null || dob.trim().length == 0) {
          if($scope.updatedUserBasicInfo != ""){
            if ("dateOfBirth" in $scope.updatedUserBasicInfo) {
              if ($scope.updatedUserBasicInfo['dateOfBirth'] != undefined && $scope.updatedUserBasicInfo['dateOfBirth'] != null && $scope.updatedUserBasicInfo['dateOfBirth'] != "") {
                return (new Date($scope.updatedUserBasicInfo['dateOfBirth']).getTime() / 1000).toString();
              }else{
                return "";
              }
              
            }else{
              return "";
            }
          }else{
            return "";
          }
        }else{
          let dateOfBirth = dob;

          return (new Date(dateOfBirth).getTime() / 1000).toString();
        }
    }

    $scope.userGender = function(userDetail){
      if (userDetail != undefined && userDetail != null) {
        if (userDetail.gender != undefined && userDetail.gender != null && userDetail.gender.trim().length > 0) {
          if (userDetail.gender == 'm' || userDetail.gender.toLowerCase() == 'male') {
            return 'Male';
          }else{
            return 'Female';
          }
        }
      }

      if ($scope.updatedUserBasicInfo != "") {
        if ("gender" in $scope.updatedUserBasicInfo) {
          if ($scope.updatedUserBasicInfo['gender'] != undefined && $scope.updatedUserBasicInfo['gender'] != null && $scope.updatedUserBasicInfo['gender'].trim().length > 0) {
            if ($scope.updatedUserBasicInfo['gender'] == 'm' || $scope.updatedUserBasicInfo['gender'].toLowerCase() == 'male') {
              return 'Male';
            }else{
              return 'Female';
            }
          }else{
            return "";
          }
        }else{
          return "";
        }
      }

      return "";
    }

    $rootScope.trustSrc = async function(src) {
      return new Promise((resolve)=>{
        let newUrl = $sce.trustAsResourceUrl(src);
        resolve(newUrl);
      });
    }

    $scope.checkNetworkAvailability = async (callback)=>{
      //let urlStausCode = await fetch("./images/splash_ihl_logo.png");//HigiBaseUrl
      let online = await window.navigator.onLine;
      console.log("online status "+ online);
      if (online){
        $timeout(()=>{
          $scope.checkAttempt = 0;
          return callback(true);
        },15 * 1000);
      }else{
        $timeout(()=>{
          return callback(false);
        },15 * 1000);
      }
    }

    $rootScope.openApolloConfirmExitModal = function(){
      document.getElementById("apolloMainIframeContainer").style.visibility = "hidden";
      //To hide the reason for visit close button.
      $(".keyboard_class_close_btn").hide();
      $rootScope.loadModal({id: 'apolloConfirmExit'});
    }


    $scope.init();
}]);