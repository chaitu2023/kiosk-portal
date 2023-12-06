class CrossbarClass{
	"use strict";
	#_session = {};
	#_session_id = "";
	#_connection = {};
	#_realm = "";
	#_wsurl = "";
	#_subscription_channels_list = [];
	#_is_connected = null;
	#_user_id = "";
	// #_is_initialized;
	
	on_connection_established;
	on_connection_closed; 
	on_error;

	constructor(){
		this.#resetEvents();
		this.#resetInstances();
		//console.log('In crossbar contructor');
	}

	// initialize(user_id, subscription_channels_list, _options = {}){
	//   try{
	//     if(this.#_is_connected == true) throw 'Initialization not allowed during connection';
	//     this.#_is_initialized = false;
	//     if(user_id == undefined || user_id == null || (user_id).length == 0) throw 'In valid user id';
	//     if(subscription_channels_list == undefined || subscription_channels_list == null) throw 'In valid Subscription Channel List';
	    
	//     for(let i=0; i<subscription_channels_list.length; i++){
	//       if(subscription_channels_list[i].channel_name.trim() == '' || subscription_channels_list[i]. subscription_handler == undefined) throw 'In Valid Subscription Channel list item: index: ' + i;
	//       subscription_channels_list[i].subscription = undefined;
	//     }
	//     this.#_user_id = user_id;
	//     this.#_subscription_channels_list = subscription_channels_list;
	    
	//     this.#_is_initialized = true;

	//   }catch(err){
	//     this.#_on_error(err);
	//     return;
	//   }
	// }

	updateUserId(user_id){
		if(user_id == 0){
			user_id = localStorage.getItem('userId') || undefined;
		}
		if(user_id == undefined || user_id == null) return false;
		this.#_user_id = user_id;
		return true;
	}

	connect(){
	  try{
	    if(this.#_is_connected == true) throw 'Connection already exist';
	    if(this.#_user_id == undefined || this.#_user_id == null) throw 'User Id is undefined';
	    // Initiating Autobahn object
	    if(autobahn == undefined){
	    	throw 'Autobahn is undefined';
	    }
	    this.#_connection = new autobahn.Connection({transports: [{'type': 'websocket','url': this.#_wsurl}],realm: this.#_realm});
	    this.#_connection.onopen = (session, details)=>{
	      this.#_session = session;
	      this.#_session_id = session.id;
	      try{
	      	this.#_is_connected = true;
	      	this.on_connection_established();
	      }catch(err){
	      	//console.error(err);
	      }
	      
	    }
	    this.#_connection.onclose = (reason, details)=>{
	        this.#_is_connected = false;
	        //if(this.on_connection_closed instanceof 'function') this.on_connection_closed();
	        if(typeof(this.on_connection_closed) == 'function') this.on_connection_closed();
	    }
	  
	    this.#_connection.open();
	  }catch(err){
	    this.#_on_error(err);
	    return;
	  }
	}

	subscribeToChannels(subscription_channels_list = []){
		console.log(subscription_channels_list);
		return new Promise((resolve,reject)=>{
			// Check if channel already exist, then update its handler: TODO
			Promise.all(
			    subscription_channels_list.map(item=>{ return this.#_subscribeToChannel(item.channel_name, item.subscription_handler); })
			)
			.then(res=>{
				let _len = res.length;
				for(let i=0; i < _len; ++i){
					this.#_subscription_channels_list.push({
						channel_name:subscription_channels_list[i].channel_name,
						subscription:res[i],
						subscription_handler:subscription_channels_list[i].subscription_handler,
					});
				}
				resolve(true);
				//console.log(this.#_subscription_channels_list,res);
			})
			.catch(err=>{
				reject(err);
			})
		});
	  // return new Promise((resolve, reject)=>{
	  //   Promise.all(
	  //     subscription_channels_list.map(item=>{ return this.#_subscribeToChannel(item.channel_name, item.subscription_handler); })
	  //   )
	  //   .then(res=>{
	  //     let _len = res.length;
	  //     for(let i=0; i<_len; i++){
	  //       subscription_channels_list[i].subscription = res[i];
	  //     }
	  //     resolve(true);
	  //   })
	  //   .catch(err=>{
	  //     resolve(false);
	  //   })
	  // })
	}

	publishToChannel(channel_name, _data = {}, _options = {}){
	  if(this.#_is_connected == false || this.#_session == undefined) return;
	  let _user_id = this.#_user_id;
	  let _session_id = this.#_session_id;
	  let options = {};
	  if('exclude' in _options && _options['exclude'].length != 0) options['exclude'] = _options['exclude'];
	  if('eligible' in _options && _options['eligible'].length != 0) options['eligible'] = _options['eligible'];
	  
	  let _crossbarDataSharing = {
	    'sender_id':_user_id,
	    'sender_session_id':_session_id
	  };
	  if('receiver_ids' in _options && _options['receiver_ids'].length != 0) _crossbarDataSharing['receiver_ids'] = _options['receiver_ids'];
	  _crossbarDataSharing['data'] = _data;
	  this.#_session.publish(channel_name, [_crossbarDataSharing], {}, options);
	}


	#_subscribeToChannel(channel_name, subscrition_handler){
	  return new Promise((resolve, reject)=>{
		let _loginByQRCode = false;
		if (channel_name == 'ihl_kiosk_login_channel')
			_loginByQRCode = true;
	    this.#_session.subscribe(channel_name, (res)=>{this.#_onMessageFromSubscription(res, subscrition_handler, _loginByQRCode)})
	    .then(res=>{
	      resolve(res);
	    })
	    .catch(err=>{
	      return undefined;
	    });
	  })
	}

	#_onMessageFromSubscription(res, subscription_handler, loginByQRCode){
	  if (!loginByQRCode) {
		if(res.length != 1) return;
		let receiver_id = [];
		let cmd = "";
		if ('receiver_ids' in res[0]) {
			receiver_id = res[0]['receiver_ids'];
			if (Array.isArray(res[0]['receiver_ids'])) {
				if('receiver_ids' in res[0] && (res[0]['receiver_ids']|| []).find(item=>{return item == this.#_user_id}) == undefined){
					return;
				}
			}else{
				let a  = [];
				a = [res[0]['receiver_ids']];
				if('receiver_ids' in res[0] && (a|| []).find(item=>{return item == this.#_user_id}) == undefined){
					return;
				}
			}	
		}

		if ('cmd' in res[0]) {
			cmd = res[0]['cmd'];
		}

		let parms = res[0]['data'] || {};
		let sender_id = res[0]['sender_id'] || undefined;
		if(sender_id == undefined || sender_id == null || sender_id == '') return;
		let sender_session_id = res[0]['sender_session_id'] || undefined;
		subscription_handler(parms, sender_id, sender_session_id, receiver_id, cmd);
	  } else {
		let parms = res[0]['data'];
		let sender_id = res[0]['sender_id'];
		let sender_session_id = res[0]['sender_session_id'];
		let receiver_id = res[0]['receiver_ids'];
		subscription_handler(parms, sender_id, sender_session_id, receiver_id);
	  }
	}
	
	subscribeToUploadFile(channel_name,msg){
		// console.log("msg sent : "+channel_name,msg);
		
		this.#_session.subscribe(channel_name,msg).then(
			function(subscription){
				// console.log("success : "+msg);
			},
			function(error){
				// console.log("Error : "+reason);
			}
		);
	}

	publishToUploadFileLogin(channel_name,msg){
		// console.log("msg publish : "+channel_name,msg);
		this.#_session.publish(channel_name,[msg]);
	}

	unSubscribeToChannel(channel_name){
	  if(this.#_is_connected == false) return Promise.resolve(false);

	  let _sub_obj = undefined;
	  this.#_subscription_channels_list = this.#_subscription_channels_list.filter((item)=>{
	    if(item.channel_name == channel_name){
	      _sub_obj = item;
	      return false;
	    }
	    return true;
	  });
	  if(_sub_obj == undefined || _sub_obj.subscription == undefined || _sub_obj.subscription == null){
	    return Promise.resolve(true);
	  }
	  if(this.#_session == undefined || this.#_session == null) return Promise.resolve(false);
	  return this.#_unSubscribeToChannel(_sub_obj.subscription);
	}

	#_unSubscribeToChannel(subscription){
	  return new Promise((resolve, reject)=>{
	    this.#_session.unsubscribe(subscription).then(res=>{ resolve(true);}).catch(err=>{resolve(false);})
	  });
	}
	
	/*
	  Description: Closes the Websocket connection by first closing the exisiting subscription
	*/
	closeConnection(){
		//console.log('in close crossbar 1');
	  if(this.#_session == undefined || this.#_connection == undefined || this.#_is_connected == false) return;
	  let _arr = [];
	  _arr = this.#_subscription_channels_list.map(item=>{return this.#_unSubscribeToChannel(item.subscription);});
	  this.#_is_connected = false;
	  //console.log('in close crossbar');
	  // this._is_initialized = false;
	  if(_arr.length == 0){
	    this.#_connection.close();
	  }else{
	    Promise.all(_arr).then(res=>{this.#_connection.close()})
	  }
	}

	/*
	  Return: Boolean. True if channel name found alse false
	  @param channel_name: Mandatory, name of the channel
	  @param subscription_handler: Optional
	  Description: Update subscription function for the channel name
	*/
	updateSubscriptionFunctionHandler(channel_name, subscription_handler){
		console.log(channel_name, subscription_handler);
	  if(subscription_handler == undefined) subscription_handler = ()=>{}
	  let _channel = this.#_subscription_channels_list.find(item=>{return item.channel_name == channel_name});
	  if(_channel == undefined) return false;
	  _channel.subscription_handler = subscription_handler;
	  return true;
	}

	get user_id(){
		return this.#_user_id;
	}
	get is_connected(){
		return this.#_is_connected == true;
	}
	#_on_error(err){
		//console.log(err);
		this.on_error(err);
	}

	#resetEvents(){
		this.on_connection_established = ()=>{};
		this.on_connection_closed = ()=>{};
		this.on_error = (err)=>{};
	}
	#resetInstances(){
		this.#_session = undefined;
		this.#_session_id = undefined;
		this.#_connection = undefined;
		this.#_realm = 'crossbardemo';
		this.#_wsurl = 'wss://testing.indiahealthlink.com:9080/ws';
		this.#_subscription_channels_list = [];
		this.#_is_connected = false;
		this.#_user_id = undefined;
		// this.#_is_initialized = false;
	}
}


/******************************************** JITSI CLASS ********************************************/

class TeleconsultationJitsiService{
	
    #_is_connected = false;
    jitsiMeetExternalAPI = undefined;
    
    // Events
    _jitsi_onload = undefined;
    _jitsi_onHangup = undefined;
    _jitsi_onParticipantJoined = ()=>{};
    _jitsi_onVideoConferenceJoined = ()=>{};
    _jitsi_onParticipantLeft = ()=>{};
    
    _is_videoConferenceLeftFired = false;
	
	displayName = 'Ihl Kiosk User';
    constructor(){}

    init(options){
      if(this.#_is_connected == true) return;
      if(JitsiMeetExternalAPI == undefined || JitsiMeetExternalAPI == undefined || typeof(JitsiMeetExternalAPI) != 'function'){
        //console.error('JitsiMeetExternalAPI is not defined or not valid');
      }
      if('room_id' in options == false || options['room_id'].length == 0) return;
      if('displayName' in options == false || options['displayName'].length == 0) return;
	  if(options['displayName'] && options['displayName'].trim().length != 0){
		  this.displayName = options['displayName'].trim();
	  }
      if('onload' in options){
        this._jitsi_onload = ()=>{
          this.#_is_connected = true; 
          document.getElementById('teleConsultationVideoCallFrameMessage').style.display = 'none';
          options['onload']();
        }
      }else{
        this._jitsi_onload = ()=>{
          this.#_is_connected = true;
          document.getElementById('teleConsultationVideoCallFrameMessage').style.display = 'none';

        }
      }
      let _options = {
        roomName: options['room_id'],
        parentNode : document.getElementById('teleConsultationVideoCallFrame'),
        width: '100%',
        height: '100%',
        onload: ()=>{this._jitsi_onload()},
        userInfo : {
          displayName: this.displayName,
        },
        interfaceConfigOverwrite:{
			JITSI_WATERMARK_LINK: 'https://www.indiahealthlink.com',
			NATIVE_APP_NAME: 'India Health Link Meet',
			TOOLBAR_BUTTONS:['hangup','microphone','camera','fullscreen','videoquality'],
			HIDE_INVITE_MORE_HEADER: true,
			RECENT_LIST_ENABLED: false,
        },
        configOverwrite: {
			startAudioOnly: false,
			apiLogLevels: [],
        }
      }
	  
	  this._is_videoConferenceLeftFired = false;
      this.jitsiMeetExternalAPI = new JitsiMeetExternalAPI(this.domain, _options);
      this.jitsiMeetExternalAPI.executeCommand('subject', ' ');
      this.jitsiMeetExternalAPI.on('readyToClose', ()=>{
		//console.log('Jitsi disconnected');
		this.jitsiMeetExternalAPI.dispose();
        this.jitsiMeetExternalAPI = undefined;
        this.#_is_connected = false;
        this._jitsi_onParticipantJoined = ()=>{};
        this._jitsi_onVideoConferenceJoined = ()=>{};
        this._jitsi_onParticipantLeft = ()=>{};
        if(this._jitsi_onHangup != undefined && typeof this._jitsi_onHangup == "function"){
          this._jitsi_onHangup();
        }
      });
      this.jitsiMeetExternalAPI.on('participantJoined', (res)=>{
        //console.error('----->Participant Joinded', res);
        this._jitsi_onParticipantJoined(res);
      });
      this.jitsiMeetExternalAPI.on('videoConferenceJoined', (res)=>{
        //console.error('-------> Video Coonference joined ', res);
		this._jitsi_onVideoConferenceJoined(res);
		this.jitsiMeetExternalAPI.executeCommand('displayName', this.displayName);
      });
      this.jitsiMeetExternalAPI.on('participantLeft', (res)=>{
        //console.error('----->Participant Left', res);
        this._jitsi_onParticipantLeft(res);
      })
      this.jitsiMeetExternalAPI.on('videoConferenceLeft', (res)=>{
        this._is_videoConferenceLeftFired = true;
      })
      //console.error(this.jitsiMeetExternalAPI);
    }
    
    endJitsiCall(){
      //console.log('Disconnecting Jitsi');
      if(this.jitsiMeetExternalAPI == undefined) return;
      this.jitsiMeetExternalAPI.executeCommand('hangup');
    }
    
    async getParticipantsList(){
      return new Promise(async (resolve, reject)=>{
        if(this.is_connected == false || this.jitsiMeetExternalAPI == undefined || this.jitsiMeetExternalAPI._myUserID == undefined){
          resolve([]);
        } 
        resolve(await this.jitsiMeetExternalAPI.getParticipantsInfo());
      });
    }
    
    
    getNumberOfParticipants(){
      if(this.is_connected == false || this.jitsiMeetExternalAPI == undefined || this.jitsiMeetExternalAPI._myUserID == undefined){
        return 0;
      } 
      return (this.jitsiMeetExternalAPI.getNumberOfParticipants());
    }

    getMyJitsiId(){
      if(this.is_connected == false || this.jitsiMeetExternalAPI == undefined) return '';
      return this.jitsiMeetExternalAPI._myUserId;
    }
    
    get is_connected(){
      return this.#_is_connected;
    }
    get domain(){
      return 'meet.indiahealthlink.com';
    //   return 'meet.jit.si';
    }
}