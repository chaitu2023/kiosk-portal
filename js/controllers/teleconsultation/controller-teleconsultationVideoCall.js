
higiKioskControllers.controller('teleconsultationVideoCallController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', 'fireStore', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, fireStore) {
	
	$scope.flow_type = undefined; // TODO: to be handled differently
	// $scope.selectedDoctor = {'ihl_consultant_id':'540d68d4347744299b3f16f5f5ae83b7'};
	$scope.selectedDoctorId = undefined;
	$rootScope.teleConsultationNamespace.displayMessage = 'Preparing live call...';

    $scope.init = function () {
		if($rootScope.teleConsultationNamespace._isOngoingCall == true){
			$rootScope.teleConsultationNamespace.displayMessage = 'Call in Process';
			return;
		}
    	if($rootScope.teleConsultationNamespace.appointment_id == undefined || $rootScope.teleConsultationNamespace.appointment_id == ''){
    		$rootScope.teleConsultationNamespace.displayMessage = 'Invalid Appointment Id';
    		return;
    	}
    	// if(!$scope.selectedDoctor || !$scope.selectedDoctor.ihl_consultant_id){
    	// 	$rootScope.teleConsultationNamespace.displayMessage = 'Invalid Doctor';
    	// 	return;
    	// }
    	if($rootScope.Crossbar == undefined && !$rootScope.fireStore){
    		$rootScope.teleConsultationNamespace.displayMessage = 'Crossbar is undefined';
    		return;
		}
		$scope.flow_type = $rootScope.teleConsultationNamespace.flow_type;
		$scope.selectedDoctorId = $rootScope.teleConsultationNamespace.selectedDoctorId;
		if($scope.selectedDoctorId == undefined || $scope.selectedDoctorId == ''){
			$rootScope.teleConsultationNamespace.displayMessage = 'Invalid Doctor Id';
			return;
		}
		if(($scope.flow_type == 'LiveAppointemnt' || $scope.flow_type == 'BookAppointment') == false){
			$rootScope.teleConsultationNamespace.displayMessage = 'Invalid Configuration';
			return;
		}
		if($scope.flow_type == 'LiveAppointemnt' && $rootScope.Crossbar.is_connected == false && !$rootScope.fireStore){
			console.log('LiveAppointemnt');
			$rootScope.teleConsultationNamespace.displayMessage = 'Crossbar is not initialized1';
			return;
		}

		if($scope.flow_type == 'BookAppointment' && $rootScope.Crossbar.is_connected == false && !$rootScope.fireStore){
			console.log('BookAppointment');
			$rootScope.teleConsultationNamespace.displayMessage = 'Crossbar is not initialized2';
			return;
		}

		// Crossbar initialization
		$timeout(()=>{
			if ($rootScope.fireStore)
				$scope.initiateFireStore();
			else
				$scope.initiateCrossbar();
			// console.log('initiating jitsi');
			// $rootScope.teleConsultationNamespace.initateLiveCallJitsi('12345aaihl');
		}, 1000)

        // Code for functionality in controller-base.js
        // HTML code in index.html
        // $rootScope.teleConsulationVideoCallStartCall();
    }
	
	$scope.onCrossbarConnectionEstablished = async function(){
		//console.log('Before Channels Subscribed');
		let channel_len = $scope.CHANNEL_LIST.length;
		for(let i=0; i<channel_len; ++i){
			let item = $scope.CHANNEL_LIST[i];
			let res = $rootScope.Crossbar.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
            if(res == false){
            	//console.log('Subscribing Channel: ', item.channel_name);
                let temp = await ($rootScope.Crossbar.subscribeToChannels([item]));
				//console.log(temp);
				//console.log('Subscribed Channel: ', item.channel_name);
            }
		}

    	// $scope.CHANNEL_LIST.forEach(async (item)=>{
        //     let res = $rootScope.Crossbar.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
        //     if(res == false){
        //     	console.log('Subscribing Channel: ', item.channel_name);
        //         let temp = await $rootScope.Crossbar.subscribeToChannels([item]);
		// 		console.log(temp);
		// 		console.log('Subscribed Channel: ', item.channel_name);
        //     }
        // });
        //console.log('Channels Subcribed');

		// Validating status by API
		
		let doctor_ids = [$scope.selectedDoctorId];
        HigiApiService.getDoctorStatus(doctor_ids, function(res){
            let _res = {'data':JSON.parse((res).replace(/(&quot\;)/g,"\""))};
            $scope.validateStatusFromApi(_res['data']);
        }, function(err){
            //console.error(err);
        });
    

		if($scope.flow_type == 'LiveAppointemnt'){
			$scope.initiateLiveCallFlow();
			return;
		}

		if($scope.flow_type == 'BookAppointment'){
			$scope.initiateBookAppointmentCall();
			return;
		}
	}
	
    $scope.validateStatusFromApi = function (res){
        //console.log(res);
		if(res.length != 1){
			$scope.displayMessage = 'Error fetching status from API';
			return;
		}
		let status = 'Offline';
		try{
			let _api_date = new Date(res[0]['timestamp']);
			let cur_date = new Date();
			if((cur_date - _api_date) >= (15*60*1000)){
				status = 'Offline';
			}else{
				let doctor_id = res[0]['consultant_id'];
				if(doctor_id != $scope.selectedDoctorId){
					$scope.displayMessage = 'Error fetching doctor status';
					return;
				}
				status = res[0]['status'];
				if(status == undefined || status == null) _status = 'Offline';
			}
		}catch(err){
			//console.log(err);
			status = 'Offline';
		}
		if(status == 'Offline'){
			$scope.displayMessage = 'Doctor is Offline. Please try after some time';
			return;
		}
		// Direct flow according to status
		if($scope.flow_type == 'LiveAppointemnt'){
			if(status != 'Online'){
				$scope.displayMessage = 'Doctor is not available for call. Please try after some time';
				return;
			}
			// Live call possible
			$scope.initiateLiveCallFlow();
			return;
		}

		if($scope.flow_type == 'BookAppointment'){
			if(status != 'Online'){
				$scope.displayMessage = 'Doctor is not available for call. Please try after some time';
				return;
			}
			$scope.initiateBookAppointmentCall();
			return;
		}
    }

	
    $scope.initiateCrossbar = function(){
    	if('Crossbar' in $rootScope == false) return;
    	if($rootScope.Crossbar instanceof CrossbarClass == false) return;
    	
    	$rootScope.Crossbar.updateUserId($rootScope.user.id);
    	//console.log($rootScope.user.id);
    	
    	$rootScope.Crossbar.on_connection_established = ()=>{$scope.onCrossbarConnectionEstablished();}
    	if($rootScope.Crossbar.is_connected == true){
    	    $rootScope.Crossbar.on_connection_established();
    	}else{
    	    $rootScope.Crossbar.connect();
    	}
    }

    $scope.initiateLiveCallFlow = function () {
		if($rootScope.teleConsultationNamespace._isOngoingCall == true) return;
		if($rootScope.teleConsultationNamespace.appointment_id == undefined || $rootScope.teleConsultationNamespace.appointment_id == null) return;
		if($rootScope.teleConsultationNamespace.liveCallAcceptTimer != undefined) return;
		
		$rootScope.teleConsultationNamespace._isOngoingCall = true;
		$rootScope.teleConsultationNamespace._isCallEndedByDoctor = false;
		$rootScope.teleConsultationNamespace.displayMessage = 'Initiating call';
		
		if ($rootScope.fireStore) {
			let _data = {
				'data': {cmd: 'NewLiveAppointment', appointment_id: $rootScope.teleConsultationNamespace.appointment_id, username: $rootScope.user.firstName+" "+$rootScope.user.lastName},
				'receiver_ids': [$rootScope.teleConsultationNamespace.selectedDoctorId],
				'sender_id': $rootScope.user.id,
				'published': true
			};
			fireStore.create($rootScope.teleConsultationNamespace.appointment_id, $rootScope.teleConsultationCollectionName, _data);
		} else {
			// Send Message to doctor about call throught crossbar
			let _data = {
				'cmd':'NewLiveAppointment',
				'appointment_id': $rootScope.teleConsultationNamespace.appointment_id,
				'username': $rootScope.user.firstName+" "+$rootScope.user.lastName, // TODO
			}
			$rootScope.Crossbar.publishToChannel('ihl_send_data_to_doctor_channel',_data,{receiver_ids:[$rootScope.teleConsultationNamespace.selectedDoctorId]});    
		}
		
		$rootScope.teleConsultationNamespace.liveCallAcceptTimer = $timeout(()=>{
			if($rootScope.teleConsultationNamespace._isOngoingCall == false) return;
			$timeout.cancel($rootScope.teleConsultationNamespace.liveCallAcceptTimer);
			// Handle no response
			$rootScope.teleConsultationNamespace.liveCallAcceptTimer = undefined;
			$scope.noResponseFromCall();
		}, $rootScope.teleConsultationNamespace.USER_RING_TIME);
		$rootScope.teleConsultationNamespace.displayMessage = 'Waiting for doctor response';
	}

	$scope.noResponseFromCall = function(){
		//console.log('No response of the call');
		$rootScope.teleConsultationNamespace._isOngoingCall = false;
		$rootScope.teleConsultationNamespace.displayMessage = 'Doctor is not picking the call. If within time you can join from my appointments page of IHL user portal/mobile application.';
		
		$timeout(async ()=>{
			//console.log('Before call status update');
			await ($rootScope.teleConsultationNamespace.updateAppointmentCallStatus($rootScope.teleConsultationNamespace.appointment_id, 'Missed')).catch(err=>{});
			//console.log('After call status update');
			await ($rootScope.teleConsultationNamespace.updateAppointmentStatus($rootScope.teleConsultationNamespace.appointment_id, 'Approved')).catch(err=>{});
			//console.log('After Appointment status update');
            window.location = '#/ihl-teleconsultation-main-dashboard';
		}, 8 * 1000);
	}

	$scope.initiateBookAppointmentCall = function(){
    	if($rootScope.teleConsultationNamespace._isOngoingCall == true) return;
    	if($rootScope.teleConsultationNamespace.appointment_id == undefined || $rootScope.teleConsultationNamespace.appointment_id == null) return;
		if($rootScope.teleConsultationNamespace.liveCallAcceptTimer != undefined) return;
		
		$rootScope.teleConsultationNamespace._isOngoingCall = true;
		$rootScope.teleConsultationNamespace._isCallEndedByDoctor = false;
		$rootScope.teleConsultationNamespace.displayMessage = 'Initiating call';
      	
      	$rootScope.teleConsultationNamespace.initateBookApppointmentCallJitsi();
    }

    $scope.CHANNEL_LIST = [
    	{
    		'channel_name': 'ihl_send_data_to_user_channel',
    		'subscription_handler':(param, sender_id, sender_session_id)=>{$rootScope.teleConsultationNamespace.messageFromSendDataToUserSubscription(param, sender_id, sender_session_id);}
    	}
    ];

	$scope.initiateFireStore = function() {
		console.log('initiateFireStore');
        console.log($rootScope.user.id);
        // let userId = 'hWlnMH4raUC2CheBISO4oQ';
		let callCmd = ['CallAcceptedByDoctor', 'CallDeclinedByDoctor', 'CallEndedByDoctor', 'AfterCallPrescriptionStatus', 'AfterCallPrescription'];

		fireStore.getDocumentByID($rootScope.teleConsultationNamespace.appointment_id, $rootScope.teleConsultationCollectionName).onSnapshot(function(doc) {
			if (doc.exists) {
				console.log("Document found");
			  	const res = doc.data();
				console.log(res);
				console.log($rootScope.teleConsultationNamespace._isRejoinCallFlow);
					
				if ('data' in res && ('cmd' in res['data'])) {

					if (res['sender_id'] == $rootScope.user.id && res['data']['cmd'] == 'GenerateNotification') {
						if ($rootScope.teleConsultationNamespace._isRejoinCallFlow)
							$scope.initiateCallFlow();
					}

					if (res['receiver_ids'][0] == $rootScope.user.id) {
						if ($rootScope.teleConsultationNamespace._isRejoinCallFlow) {
							$scope.initiateCallFlow();
						}
						else {
							$rootScope.teleConsultationNamespace.messageFromSendDataToUserSubscription(res['data'], res['sender_id'], '');
							return;
						}
					}
				}
			} else {
			  console.log("Document not found");
			}
		});

		let doctor_ids = [$scope.selectedDoctorId];
        HigiApiService.getDoctorStatus(doctor_ids, function(res){
            let _res = {'data':JSON.parse((res).replace(/(&quot\;)/g,"\""))};
            $scope.validateStatusFromApi(_res['data']);
        }, function(err){
            //console.error(err);
        });
    
		/*if($scope.flow_type == 'LiveAppointemnt'){
			$scope.initiateLiveCallFlow();
			return;
		}

		if($scope.flow_type == 'BookAppointment'){
			$scope.initiateBookAppointmentCall();
			return;
		}*/
    }

	$scope.initiateCallFlow = function() {
		$rootScope.teleConsultationNamespace._isRejoinCallFlow = false;
		if ($scope.flow_type == 'LiveAppointemnt') {
			$scope.initiateLiveCallFlow();
			return;
		}
		if ($scope.flow_type == 'BookAppointment') {
			$scope.initiateBookAppointmentCall();
			return;
		}
	}

    $scope.init();
}]);