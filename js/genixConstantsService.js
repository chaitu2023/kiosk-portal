"use strict";
class GenixConstantsService{
  	progressMessage = "";
  	userBasicDetails = null;
  	doctorDetails = null;
  	appointmentDate = "";
  	appointmentFees = 0;
  	appointmentId = undefined;
    genixTeleConsultationVideoCallUrl = "";
    genixTeleConsultationVideoCallIframe = false;
    ondoctorAcceptedCall;
    //ondoctorDeclinedCall;
    onDoctorEndedTheCall;
    liveCallAcceptTimer = undefined;
    internetLostForGenixTeleconsultation = false;
    _isHomeButtonClicked = false;
    networkStatusCheckCount = 1;
    networkStatusTimeout;
    abnormalNetworkStatusTimeout;
    videoCallPageNetworkTimeout;
    homeButtonVisible = false;
    exitButtonVisible = false;
    afterConsultationEndPath = "";
    crossbarClass;
    genixSignalRScriptRun = false;
    genixSignalRScriptRunUrl = "";
    vendorAppointmentId = "";
    _isRejoinCallFlow = false;

	 constructor(){
	 }

	  initiateCrossbar = (callAccepted, callEnded)=>{
		  this.ondoctorAcceptedCall = callAccepted;
		  //this.ondoctorDeclinedCall = callRejected;
		  this.onDoctorEndedTheCall = callEnded;
	    this.crossbarClass.updateUserId(this.userBasicDetails.id);
	      
	    this.crossbarClass.on_connection_established = ()=>{this.onCrossbarConnectionEstablished();}
	    if(this.crossbarClass.is_connected == true){
	      this.crossbarClass.on_connection_established();
	    }else{
	      this.crossbarClass.connect();
	    }
  	};

  	onCrossbarConnectionEstablished = async ()=>{
	    //console.log('Crossbar Connected');
	    let channel_len = this.CHANNEL_LIST.length;
	    for(let i=0; i<channel_len; ++i){
	      let item = this.CHANNEL_LIST[i];
	      let res = this.crossbarClass.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
	      //if(res == false){
       		//console.log('Subscribing Channel: ', item.channel_name);
        	let temp = await (this.crossbarClass.subscribeToChannels([item]));
        	//console.log(temp);
        	//console.log('Subscribed Channel: ', item.channel_name);
	      //}
	    }
	    //console.log('Channels Subcribed');

	    // Validating status by API
	    let doctor_ids = [this.doctorDetails.ihl_consultant_id];
	    HigiApi.getDoctorStatus(doctor_ids, (res)=>{
	      let _res = {'data':JSON.parse((res).replace(/(&quot\;)/g,"\""))};
	      this.validateStatusFromApi(_res['data']);
	    },(err)=>{
	      //console.log(err);
	    });
  	};

  	CHANNEL_LIST = [
      {
        'channel_name': 'ihl_send_data_to_doctor_channel',
        'subscription_handler': (param, sender_id, sender_session_id, receiver_ids) => {  this.ihlSendDataToDoctorChannelSubscription(param, sender_id, sender_session_id, receiver_ids); }
      },
	    {
	      'channel_name': 'ihl_send_data_to_user_channel',
	      'subscription_handler': (param, sender_id, sender_session_id, receiver_ids, cmd) => { this.messageFromSendDataToUserSubscription(param, sender_id, sender_session_id, receiver_ids, cmd); }
	    }
  	];

  	validateStatusFromApi =  (res)=>{
    	//console.log(res);
	    if(res.length != 1){
	      this.progressMessage = 'Error fetching doctor status';
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
	        if(doctor_id != this.doctorDetails.ihl_consultant_id){
	          this.progressMessage = 'Error fetching doctor status';
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
	      this.progressMessage = 'Doctor is Offline. Please try after some time';
	      return;
	    }

	    // Direct flow according to status
	    if(status != 'Online'){
	      this.progressMessage = 'Doctor is not available for call. Please try after some time';
	      return;
	    }
	   

	    // Live call possible
	    if (this._isRejoinCallFlow == false) {
	    	this.genixSignalRScriptRunUrl = "https://apps.indiahealthlink.com/signalr/index.html?vendor_consultant_id="+this.doctorDetails.vendor_consultant_id+"&vendor_appointment_id="+this.vendorAppointmentId+"&vendor_user_name="+this.doctorDetails.user_name;
      	this.genixSignalRScriptRun = true;
      	setTimeout(this.doctorResponseTimeInitiate(), 2000);
	    }else{
	    	this.initiateLiveCallFlow();
	    }

	    return;
  	};

  	initiateLiveCallFlow = () => {
  		this.progressMessage = 'Connecting to doctor.Please wait...';
  		HigiApi.getUrlForLiveCallAppointment(this.appointmentId, (urlResponse)=>{
	      let res = urlResponse.replaceAll("&quot;", '"');
        let parseResponse = JSON.parse(res);
        let url = parseResponse.filter(obj => {
          return obj.Type == "Participant";
        });
        //console.log(url);
        this.genixTeleConsultationVideoCallUrl = url[0]['URL'];
        //console.log(this.genixTeleConsultationVideoCallUrl);
        // Start Genix video call
      	this.ondoctorAcceptedCall(this.appointmentId);
	    },(err)=>{
	    	this.progressMessage = 'Sorry something went wrong.';
	    	//console.log("error occured while generating live call url");
	      //console.log(err);
	      return;
	    });
  	};

  	doctorResponseTimeInitiate = () => { 
  		this.liveCallAcceptTimer = setTimeout(this.noResponseFromCall, 60 * 1000);
		  this.progressMessage = 'Waiting for doctor response';
  		//mock data
  		/*setTimeout(()=>{
  			this.callAcceptedByDoctor("");
  			//this.callDeclinedByDoctor("");
  		},6000);*/
  	};

    ihlSendDataToDoctorChannelSubscription =  (param, sender_id, sender_session_id, receiver_ids) => {
      if(this.doctorDetails.ihl_consultant_id == undefined || this.userBasicDetails.id == undefined) return;
      if('doctor_id' in param == false) return;
      if (Array.isArray(receiver_ids) == false) return;
      if (param.doctor_id != this.doctorDetails.ihl_consultant_id) return;
      if (receiver_ids[0] != this.userBasicDetails.id) return;
      if(sender_id != this.doctorDetails.ihl_consultant_id) return;
      
      if('cmd' in param){
	      switch(param['cmd']){
	        case 'CallAcceptedByDoctor': this.callAcceptedByDoctor(param); break;
	        case 'CallDeclinedByDoctor': this.callDeclinedByDoctor(param); break;
	      }
	    }
    };

  	messageFromSendDataToUserSubscription =  (param, sender_id, sender_session_id, receiver_ids, cmd) => {
    	if(this.doctorDetails.ihl_consultant_id == undefined || this.userBasicDetails.id == undefined) return;
      if('ihl_consultant_id' in param == false) return;
      if('receiver_ids' in param == false) return;
      if (param.ihl_consultant_id != this.doctorDetails.ihl_consultant_id) return;
      if (param.receiver_ids != this.userBasicDetails.id) return;
      if(sender_id != this.doctorDetails.ihl_consultant_id) return;

      if (cmd && cmd != "" && cmd == "AfterCallPrescriptionStatus") {
      	this.afterCallPerscriptionStatus(param);
      }
      
      return;
  	};

  	noResponseFromCall = () => {
  		//console.log('No response of the call');
  		this.progressMessage = 'Doctor is not picking the call. If within time you can join from my appointments page of IHL user portal/mobile application.';
		
  		setTimeout(async ()=>{
  			//console.log('Before call status update');
  			await (this.updateAppointmentCallStatus(this.appointmentId, 'Missed')).catch(err=>{});
  			//console.log('After call status update');
  			await (this.updateAppointmentStatus(this.appointmentId, 'Approved')).catch(err=>{});
  			//console.log('After Appointment status update');
        window.location = '#/ihl-teleconsultation-main-dashboard';
  		}, 8 * 1000);
	  };

  	callAcceptedByDoctor = async (param) => {
    	if(this.liveCallAcceptTimer == undefined) return;
    	if(('room_id' in param) == false || ('doctor_id' in param) == false) return;
    	
    	clearTimeout(this.liveCallAcceptTimer);
    	this.liveCallAcceptTimer = undefined;

    	// Update appointment Status as ongoing
      await (this.updateAppointmentCallStatus(this.appointmentId, 'on_going'));

      this.progressMessage = 'Call accepted by doctor';
      //console.log('Call accepted by doctor');
      this.initiateLiveCallFlow();
    };

    callDeclinedByDoctor = (param) => {
    	if(this.liveCallAcceptTimer == undefined) return;
    	
    	clearTimeout(this.liveCallAcceptTimer);
    	this.liveCallAcceptTimer = undefined;

    	this.progressMessage = 'Doctor declined call';
      //console.log('call decline from doctor');

    	setTimeout(async ()=>{
      	let res = await (this.updateAppointmentCallStatus(this.appointmentId, 'Missed'));
      	let _res = await (this.updateAppointmentStatus(this.appointmentId, 'Rejected'));
      	// Close the crossbar
      	this.crossbarClass.closeConnection();
      	window.location = '#/ihl-teleconsultation-main-dashboard';  
    	}, 5000);
    };

    afterCallPerscriptionStatus = async (param = {}) => {
    	if('perscription_status' in param == false) return;
	    if(param['perscription_status'] == 'true'){
	      await this.updateAppointmentCallStatus(this.appointmentId, 'completed');
	      
	      this.onDoctorEndedTheCall();
	      this.progressMessage = "Doctor has provided some prescription. please wait...";
	      this.homeButtonVisible = false;
	      this.exitButtonVisible = true;
	      this.afterConsultationEndPath = '#/ihl-teleconsultation-summary';
	      setTimeout(this.redirectionAfterConsultationEnd, 2000);
	      return;
	    }
	    if(param['perscription_status'] == 'false'){
	      await this.updateAppointmentCallStatus(this.appointmentId, 'completed');
	      
	      this.onDoctorEndedTheCall();
	      this.progressMessage = "No prescription has been provided by doctor. please wait you are redirecting to home page.";
	      this.homeButtonVisible = false;
	      this.exitButtonVisible = true;
	      this.afterConsultationEndPath = '#/welcome';
	      setTimeout(this.redirectionAfterConsultationEnd, 2000);
	      return;
	    }
  	};

  	redirectionAfterConsultationEnd = () =>{
  		this.genixTeleConsultationVideoCallIframe = false;
    	this.homeButtonVisible = false;
    	this.exitButtonVisible = false;
    	this.clearNetworkTimeout();
    	setTimeout(()=>{
        window.location = this.afterConsultationEndPath;
        return;
      }, 3000);
  	};

    updateAppointmentCallStatus = (appointment_id, call_status) => {
		
     	return new Promise((resolve, reject)=>{
        let sucess_fn = (res) =>{
        	//console.log('in success');
          resolve(res);
          return;
        }
        let error_fn = (err) =>{
          //console.log('in error');
          reject(err);
          return;
        }
        let data = {
        	'appointment_id': appointment_id,
          'call_status': call_status,
        };
      	HigiApi.consultantAppointmentCallStatusUpdate(data, sucess_fn, error_fn);
      })
    };

    updateAppointmentStatus = (appointment_id, appointment_status) =>{
    	return new Promise((resolve, reject)=>{
        let sucess_fn = (res) =>{
        	//console.log('in success');
          resolve(res);
          return;
        }
        let error_fn = (err) =>{
        	//console.log('in error');
          reject(err);
          return;
        }
        let data = {
        	'appointment_id': appointment_id,
          'appointment_status': appointment_status,
        };
      	HigiApi.consultantAppointmentStatusUpdate(data, sucess_fn, error_fn);
      })
    };

    checkNetworkAvailabilityStatus = async (callBack, internetLostResponse) => {
    	try{
    		const online = await window.navigator.onLine;
    		if(online){
    			//console.log("Online");
    			return callBack(true, internetLostResponse);
    		}else{
    			throw "Offline";
    		}
    	}catch(err){
    		//console.log(err);
    		callBack(false, internetLostResponse);
    		return this.networkStatusCheckCount++;
    	}
    };

    networkAvailableStatus = (response, internetLostResponse) => {
    	if (response == true) {
    		this.networkStatusTimeout = setTimeout(()=>{
    			this.networkStatusCheckCount = 1;
    			this.checkNetworkAvailabilityStatus(this.networkAvailableStatus, internetLostResponse);
    		},15*1000);
    	}else{
    		if (this.networkStatusCheckCount > 2) {
          internetLostResponse();
        }else{
          this.abnormalNetworkStatusTimeout = setTimeout(()=>{
            this.checkNetworkAvailabilityStatus(this.networkAvailableStatus, internetLostResponse);
          },15*1000);
        }
    	}
    };

    redirectToHomePage = () => {
    	this.genixTeleConsultationVideoCallIframe = false;
    	this.homeButtonVisible = false;
    	this._isHomeButtonClicked = true;
    	this.clearNetworkTimeout();

    	setTimeout(()=>{
    		this._isHomeButtonClicked = false;
    		window.location = '#/welcome';  
    	}, 8 * 1000);
    };

    clearNetworkTimeout = () =>{
    	if (this.videoCallPageNetworkTimeout != undefined) {
    		clearTimeout(this.videoCallPageNetworkTimeout);
    		this.videoCallPageNetworkTimeout = undefined;
    	}else{
    		this.videoCallPageNetworkTimeout = undefined;
    	}

    	if (this.networkStatusTimeout != undefined) {
    		clearTimeout(this.networkStatusTimeout);
    		this.networkStatusTimeout = undefined;
    	}else{
    		this.networkStatusTimeout = undefined;
    	};

    	if (this.abnormalNetworkStatusTimeout != undefined) {
    		clearTimeout(this.abnormalNetworkStatusTimeout);
    		this.abnormalNetworkStatusTimeout = undefined;
    	}else{
    		this.abnormalNetworkStatusTimeout = undefined;
    	};
    };
}