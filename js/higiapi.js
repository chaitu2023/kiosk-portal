HigiBaseUrl = null;
HigiProxyBypassUrl = null;
HigiApiKey = null;
HigiUserToken = null;
ihlUserToken = null;
HigiAdSessionToken = null;
HigiLoginInProgress = false;

$.ajaxOriginal = $.ajax;

function AjaxRetry(req) {
    return AjaxRetry_Impl(req, 0)
}

function AjaxRetry_Impl(req, tryCount) {

    if (!tryCount) tryCount = 0;
    if (req.tryCount === undefined ) req.tryCount = 3;

    var thisTryCount = tryCount; //copy to avoid closure issues

    var recursiveResp = null;

    var jqReq = {};

    for (var field in req) {
        jqReq[field] = req[field];
    }

    jqReq.error = function (x,t,m) {
            if (thisTryCount >= req.tryCount || t != "timeout" ) {
                if(req.error)
                    req.error(x,t,m);
            }
            else {

                console.log('Error t is : ' + t + ' retrying ajax call: thisTryCount' );
                setTimeout( function(){ recursiveResp = AjaxRetry_Impl(req, thisTryCount + 1)}, 2000 );
            }
    }

    if(recursiveResp != null)
        return recursiveResp;

    var resp =  $.ajaxOriginal(jqReq);
    return resp;
}

$.ajax = AjaxRetry;


///////////////////////////////////////////////////////////////////////////////
// User defintion

function HigiUser() {
}

HigiUser.prototype.id = null;
HigiUser.prototype.photo = null; //string base64 image.
HigiUser.prototype.photo = null; //string base64 image.
HigiUser.prototype.photofmt = null; //jpg,gif,png,bmp
HigiUser.prototype.firstName = null;
HigiUser.prototype.lastName = null;
HigiUser.prototype.dateOfBirth = null;
HigiUser.prototype.email = null;
HigiUser.prototype.gender = null;
HigiUser.prototype.higiScore = null;
HigiUser.prototype.accountCreated = null;
HigiUser.prototype.terms = null;
HigiUser.prototype.privacyAgreed = null;
HigiUser.prototype.LastCheckin = null;

function CompareUser(onServer, getSessionData) {
    var user = new HigiUser();
    var boolChanged = false;

    if (onServer.gender != getSessionData('gender')) {
        user.gender = getSessionData('gender');
        boolChanged = true;
    }

    if (onServer.heightMeters != getSessionData('height')) {
        user.heightMeters = getSessionData('height');
        boolChanged = true;
    }

    if (!onServer.dateOfBirth) {
        user.dateOfBirth = getSessionData('birthdate');
        boolChanged = true;
    }

    if (!boolChanged) {
        return null;
    }

    return user;
}

function UserInfoInit(getSessionData) {
    var user = new HigiUser();

    if (getSessionData('gender') != undefined) {
        user.gender = getSessionData('gender');
    }

    if (getSessionData('height') != undefined) {
        user.heightMeters = getSessionData('height');
    }

    if (getSessionData('birthdate') != undefined) {
        user.dateOfBirth = getSessionData('birthdate');
    }

    return user;
}

///////////////////////////////////////////////////////////////////////////////
// Checkin defintion

function HigiCheckin() {

}

HigiCheckin.prototype.id = "";
HigiCheckin.prototype.dateTime = "";
HigiCheckin.prototype.weightKG = 0;
HigiCheckin.prototype.heightMeters = 0;
HigiCheckin.prototype.bmi = 0;
HigiCheckin.prototype.fatRatio = 0;
HigiCheckin.prototype.hydrationPct = 0;
HigiCheckin.prototype.bmcOhms = 0;
HigiCheckin.prototype.systolic = 0;
HigiCheckin.prototype.diastolic = 0;
HigiCheckin.prototype.pulseBpm = 0;
HigiCheckin.prototype.gender = "";
HigiCheckin.prototype.dateOfBirth = "";
HigiCheckin.prototype.score = 0;    //server generated, if the value is submitted it is ignored
HigiCheckin.prototype.bloodPressures = null;
HigiCheckin.prototype.ECGData = "";
HigiCheckin.prototype.ECGData2 = "";
HigiCheckin.prototype.ECGData3 = "";/* 
HigiCheckin.prototype.ECGDataAVL = "";
HigiCheckin.prototype.ECGDataAVR = "";
HigiCheckin.prototype.ECGDataAVF = ""; */
HigiCheckin.prototype.LeadMode = 0;
HigiCheckin.prototype.leadOneStatus = "";
HigiCheckin.prototype.leadTwoStatus = "";
HigiCheckin.prototype.leadThreeStatus = "";
HigiCheckin.prototype.ECGRawFullData = "";
HigiCheckin.prototype.ECGBpm = null;
HigiCheckin.prototype.IHLMachineId = null;
HigiCheckin.prototype.firstName = "";
HigiCheckin.prototype.IHL_ID = "";
HigiCheckin.prototype.IHLMachineName = null;
HigiCheckin.prototype.IHLMachineLocation = null;
HigiCheckin.prototype.IHLMachineDeploymentDate = null;
HigiCheckin.prototype.dateOfBirthDateTime = null;
HigiCheckin.prototype.Age = null;
HigiCheckin.prototype.KioskSerialNumber = null;
HigiCheckin.prototype.SpO2 = null;
HigiCheckin.prototype.temperature = null;
HigiCheckin.prototype.bone_mineral_content = "";
HigiCheckin.prototype.protien = "";
HigiCheckin.prototype.extra_cellular_water = "";
HigiCheckin.prototype.intra_cellular_water = "";
HigiCheckin.prototype.mineral = "";
HigiCheckin.prototype.skeletal_muscle_mass = "";
HigiCheckin.prototype.body_fat_mass = "";
HigiCheckin.prototype.body_cell_mass = "";
HigiCheckin.prototype.waist_hip_ratio = "";
HigiCheckin.prototype.percent_body_fat = "";
HigiCheckin.prototype.waist_height_ratio = "";
HigiCheckin.prototype.visceral_fat = "";
HigiCheckin.prototype.basal_metabolic_rate = "";



///////////////////////////////////////////////////////////////////////////////
// InteractiveAd response defintion
function InteractiveAdObject(){
    this.UserId = "";
    this.Answers = new Array();
}


///////////////////////////////////////////////////////////////////////////////
// Charge defintion
function HigiCharge() {

}

HigiCharge.prototype.amount = 0;
HigiCharge.prototype.cardReaderString = "";
HigiCharge.prototype.id = "";

///////////////////////////////////////////////////////////////////////////////
// Terms defintion

function HigiTerms(termsAgreedDate, termsFileName) {
    return {
        termsAgreedDate:termsAgreedDate,
        termsFileName:termsFileName
    };
}

function HigiTerms(termsFileName) {
    return {
        termsFileName:termsFileName
    };
}

///////////////////////////////////////////////////////////////////////////////
// Terms defintion

function HigiPpol(privacyAgreedDate, privacyFileName) {
    return {
        privacyAgreedDate:privacyAgreedDate,
        privacyFileName:privacyFileName
    };
}

function HigiPpol(privacyFileName) {
    return {
        privacyFileName:privacyFileName
    };
}


///////////////////////////////////////////////////////////////////////////////
// Quick Login

function QuickLogin(token, user, lastcheckin) {

    if ((typeof user == "undefined") || (user === null) || (user == null)) {
        user = new HigiUser();
    }

    if ((typeof lastcheckin == "undefined") || (lastcheckin === null) || (lastcheckin == null)) {
        lastcheckin = new HigiCheckin();
    }

    return {
        Token:token,
        User:user,
        LastCheckin:lastcheckin
    };
}

///////////////////////////////////////////////////////////////////////////////
// 

function CreateUserResponse() {
    return {
        id:"",
        token:""
    };
}

///////////////////////////////////////////////////////////////////////////////
// Api Class Definition

function GetProfileImage(user) {

    var m = "images/profile_img_male_110x110_20120522.png";
    var f = "images/profile_img_female_110x110_20120522.png";

    var img = new Image();

    if (user != null) {

        if ((typeof (user.photo) == 'string') && (typeof (user.photofmt) == 'string')) {
            img.src = "data:image/" + user.photofmt + ";base64," + user.photo;
//            img.src = HigiBaseUrl + '/view/'+ user.id +'/profile.png'; //new method, but isn't finished
        }
        else if (user.gender == "m") {
            img.src = m;
        }
        else if (user.gender == "f") {
            img.src = f;
        }
        else {
            img.src = m;
        }
    }
    else {
        img.src = f;
    }

    return img;

}
//Below is closure function in javascript.It loads one time only when page loads.
HigiApi = (function () {
    this.LogAdEventAsync = function (sessionId, senderId, eventCategory, eventName, userId) {
        if (!sessionId) sessionId = "null";
        jkiosk.logEvent(sessionId, senderId, eventCategory, eventName, userId);
    };

    this.LogEventAsync = function (sessionId, senderId, eventCategory, eventName) {

        if (!sessionId) sessionId = "null";

        if (!HigiUserToken) HigiUserToken = null;

        jkiosk.logEvent(sessionId, senderId, eventCategory, eventName, HigiUserToken);
    };

    this.EmailUsedAsync = function (email, success, emailInUse, error) {
	
		var url = HigiBaseUrl + '/data/emailused/' + encodeURIComponent(email);
		jkiosk.apiProxy(url, 'GET', '', 
			function(response) {
				//Look inside response text
                //If === true, email exists
				if (response === true) {
					success();
				}
                //If === false, email does not exist
                else if (response === false){
					emailInUse();
				}
                //Successful http request but unexpected response, throw error
                else {
                    error();
                }
			}, 
			function() {
				error();
			});
    };
	
    this.checkConnection = function () {
		var url = HigiBaseUrl + '/data/checkconnection';
		jkiosk.apiProxy(url, 'GET', '', 
			function() { 
				console.log('check connection warm up success'); 
			}, 
			function() { 
				console.log('check connection warm up fail'); 
			}
			);
    };

    //user is a HigiUser and is optional, value may be null
    this.CreateUserAsync = function (email, password, termsFileName, privacyPolicyFileName, user, success, error) {

        if ((typeof user == "undefined") || (user === null) || (user == null)) {
            user = new HigiUser();
        }

        user.email = email;
        user.terms = new HigiTerms(termsFileName);
        user.privacyAgreed = new HigiPpol(privacyPolicyFileName);
		
		jkiosk.encrypt(password, function(encryptResult) {
			var putData = JSON.stringify({user: user, password: encryptResult.cipherText, encryptionVersion: encryptResult.keyVersion});
		
			var url = HigiBaseUrl + '/data/user';
			jkiosk.apiProxy(url, 'PUT', putData, success, error);
		});
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Checkin Methods
    this.CreateCheckInGameAsync = function (higiId,bmiTemp,bmiRiskTemp,bodyfatclassTemp,bpClassTemp,tempClassTemp,pulseClassTemp,ECGRawData,ECGFilterData, checkin, email, success, error) {
		
        console.log("login user");
        console.log(checkin);
        var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId) + "/activities/checkIn/v2/";
       
		var ECGMixedData = ECGRawData +";"+ECGFilterData; 
		//console.log("ECG Mixed Data" + ECGMixedData);
		
		var fatClass = "";
		var genderTemp = "";
		
		
		if(checkin.gender == "m")
		{
			genderTemp = "Male";
		}
		else{
			genderTemp = "Female";
		}
		
		
		if(checkin.fatRatio != undefined)
		{	
                if (checkin.gender == "m")
                {
					if (checkin.fatRatio == null)
					{
						fatClass = null;
					}	

					if (checkin.fatRatio >= 25)
					{
						fatClass = "atrisk";
					}
					else if (checkin.fatRatio >= 18)
					{
						fatClass = "acceptable";
					}
					else
					{
						fatClass = "healthy";
					}
					
                   
                }
                else { 
					  if (checkin.fatRatio == null)
					  {
						  fatClass = null;
					  }	 

					  if (checkin.fatRatio >= 32)
					  {
						fatClass = "atrisk";
					  }
					  else if (checkin.fatRatio >= 25)
					  {
						fatClass = "acceptable";
					  }
					  else
					  {
						fatClass = "healthy";
					  }
					
				}
		}		
		
	
	
	
	/*$.ajax({
        type: "POST",
        url: "http://indiahealthlink.com/higi_php_api/insert.php",
        crossDomain: true, 
        data: "str_type=all_data&name=guest&weight=" + checkin.weightKG + "&bmi2=" + bmiTemp + "&bmistatus=" +bmiRiskTemp + "&bodyfat=" + checkin.fatRatio + "&bmcstatus="+ bodyfatclassTemp + "&pulse=" + checkin.pulseBpm + "&pulsestatus=" + pulseClassTemp + "&systolic=" + checkin.systolic + "&diastolic=" + checkin.diastolic + "&bpstatus=" + bpClassTemp + "&gender=" + checkin.gender + "&dob=N/A" + "&height=" + checkin.heightMeters + "&ekg=" + ECGMixedData + "&email=guest&machine_id" + checkin.IHLMachineId,
        success: function (data) {
			console.log("success user analytics data" + data);
	
            // do something with server response data
        },
        error: function (err) {
			console.log("error in user analytics data storing");
            // handle your error logic here
		
        }
    });*/

		
		
	  
        if (typeof (email) == 'string') {
            url += "?email=" + encodeURIComponent(email);
        }
		//console.log(JSON.stringify(checkin));
		if(HigiUserToken == null){
			HigiUserToken = ihlUserToken
		}
		jkiosk.apiProxy(url, 'PUT', JSON.stringify(checkin), success, error, {"Token":HigiUserToken, "ApiToken":HigiApiKey});
    };


     this.CreateCheckInGameAsyncGuest = function ( checkin, success, error) {
        console.log("Guest user");
        console.log(checkin);
        var url = HigiBaseUrl + "/data/user/Guest/checkIn/";
        console.log("Inside CreateCheckInGameAsync guest user checkin function");
      
		var ECGMixedData = ECGRawData +";"+ECGFilterData;
		//console.log("ECG Mixed Data" + ECGMixedData);
		var fatClass = "";
		var genderTemp = "";
		
		if(checkin.gender == "m")
		{
			genderTemp = "Male";
		}
		else{
			genderTemp = "Female";
		}
		
		
		if(checkin.fatRatio != undefined)
		{	
                if (checkin.gender == "m")
                {
					if (checkin.fatRatio == null)
					{
						fatClass = null;
					}	

					if (checkin.fatRatio >= 25)
					{
						fatClass = "atrisk";
					}
					else if (checkin.fatRatio >= 18)
					{
						fatClass = "acceptable";
					}
					else
					{
						fatClass = "healthy";
					}
					
                   
                }
                else { 
					  if (checkin.fatRatio == null)
					  {
						  fatClass = null;
					  }	 

					  if (checkin.fatRatio >= 32)
					  {
						fatClass = "atrisk";
					  }
					  else if (checkin.fatRatio >= 25)
					  {
						fatClass = "acceptable";
					  }
					  else
					  {
						fatClass = "healthy";
					  }
					
				}
		}		
		
	
	
	
	/*$.ajax({
        type: "POST",
        url: "http://indiahealthlink.com/higi_php_api/insert.php",
        crossDomain: true,
        data: "str_type=all_data&name=guest&weight=" + checkin.weightKG + "&bmi2=" + bmiTemp + "&bmistatus=" +bmiRiskTemp + "&bodyfat=" + checkin.fatRatio + "&bmcstatus="+ bodyfatclassTemp + "&pulse=" + checkin.pulseBpm + "&pulsestatus=" + pulseClassTemp + "&systolic=" + checkin.systolic + "&diastolic=" + checkin.diastolic + "&bpstatus=" + bpClassTemp + "&gender=" + checkin.gender + "&dob=N/A" + "&height=" + checkin.heightMeters + "&ekg=" + ECGMixedData + "&email=guest&machine_id" + checkin.IHLMachineId,
        success: function (data) {
			console.log("successully saved user analytics data for Guest user" + data);
			
            // do something with server response data
        },
        error: function (err) {
			console.log("error in user analytics data storing");
            // handle your error logic here
			
        }
    });*/

		

       
        if (typeof (email) == 'string') {
            url += "?email=" + encodeURIComponent("guest@guest.com");
        }
        
        jkiosk.apiProxy(url, 'PUT', JSON.stringify(checkin), success, error, {"Token":HigiUserToken});
    };

    this.fetch_terms_condition_from_config = function (uniqueKioskId, success, error) {
		var url = HigiBaseUrl + "/consult/fetch_kiosk_terms_and_condition?kiosk_id="+uniqueKioskId;
		jkiosk.apiProxy(url, 'GET', '', success, error, {"Token":HigiUserToken});
    };

    this.save_parameters = function(parameters, success, error){
        // console.log(parameters[0])
        var url = getSettingsValue('kiosk.port')+"/server/offlinedatastore/offline_user_data_save.php";
        jkiosk.apiProxy(url, 'POST', {"parameters":JSON.stringify(parameters[0])}, success, error, {"Token":HigiUserToken});
    };

    this.offile_users_data = function(uniqueKioskId, success, error){
        var url = getSettingsValue('kiosk.port')+"/server/offlinedatastore/fetch_offline_user_data.php";
        // console.log(url)
        jkiosk.apiProxy(url, 'GET', {"uniqueKioskId":JSON.stringify(uniqueKioskId)}, success, error, {"Token":HigiUserToken});
        // console.log(success)
    };

    this.delete_offile_users_data = function(index, uniqueKioskId, success, error){
        var url = getSettingsValue('kiosk.port')+"/server/offlinedatastore/deleteParameter.php";     
        jkiosk.apiProxy(url, 'POST',{"index":JSON.stringify(index),"uniqueKioskId":JSON.stringify(uniqueKioskId)}, success, error, {"Token":HigiUserToken});
    };

    this.CreateCheckInEmail = function (higiId, checkin, email) {
        return CreateCheckIn(higiId, checkin, email);
    };

    this.CreateCheckInAsync = function (higiId, checkin, success, error) {
		var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId) + "/checkIn/";
		
		jkiosk.apiProxy(url, 'PUT', JSON.stringify(checkin), success, error, {"Token":HigiUserToken});
    };

    this.CreateCheckInEmailAsync = function (higiId, checkin, email, success, error) {
        var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId) + "/checkIn/v2/";
        if (typeof (email) == 'string') {
            url += "?email=" + encodeURIComponent(email);
        }

		jkiosk.apiProxy(url, 'PUT', JSON.stringify(checkin), success, error, {"Token":HigiUserToken});
    };

    this.EmailUserCheckInAsync = function (userId, email, checkin, success, error) {
        if (typeof (email) != 'string') {
            throw "email required";
        }
        var url = HigiBaseUrl + "/data/v2/emailUserCheckIn";

		jkiosk.apiProxy(url, 'POST', JSON.stringify(checkin), success, error, {"Token":HigiUserToken});
    };

    this.EmailCheckInAsync = function (email, checkin, success, error) {
    	console.log(checkin);
        if (typeof (email) != 'string') {
            throw "email required";
        }

        var url = HigiBaseUrl + "/data/v2/emailCheckIn";

		jkiosk.apiProxy(url, 'POST', JSON.stringify(checkin), success, error);
    };
	   
    this.GetEarnditPointsAsync = function(higiId, success, error){
        var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId) + "/earndIt/points";
		
		jkiosk.apiProxy(url, 'GET', '', 
			function(result) {
                try{
                    success(result.points);
                } catch(e){
                    error();
                }
			},
			function() { 
				error();
			},
			{"Token":HigiUserToken}
		);
    };

    this.GetEarnditChallenge = function(challengeObject, success, error){
        var url = getSettingsValue('kiosk.api.earndit.url') + "/api/challenges/" + challengeObject.challengeId;
        //If joinId add to url
        console.log("calling earndit")
        url += (challengeObject.joinId == undefined) ? "" : "?joinCode=" + challengeObject.joinId;
        jkiosk.apiProxy(url, 'GET', '', success, error, {"Token":HigiUserToken});

    };

    this.GetEarnditChallengeAnonymous = function(challengeObject, success, error){
        var url = getSettingsValue('kiosk.api.earndit.url') + "/api/challenges/" + challengeObject.challengeId;
        //If joinId add to url
        console.log("calling earndit")
        url += (challengeObject.joinId == undefined) ? "" : "?joinCode=" + challengeObject.joinId;
        jkiosk.apiProxy(url, 'GET', '', success, error);

    };

    this.JoinEarnditChallenge = function(data, success, error){
        //var url = getSettingsValue('kiosk.api.earndit.url') + data.joinUrl + "?sendEmail=1";
        var url = data.joinUrl + "?sendEmail=1";
        var postData = {
            userId: data.userId
        };
        if(data.joinCode !=  undefined){
            postData.joinCode = data.joinCode;
        }
        jkiosk.apiProxy(url, 'POST', JSON.stringify(postData), success, error, {"Token":HigiUserToken, "ApiToken":HigiApiKey});

    };

    this.SaveUnauthCheckInAsync = function (checkin, success, error) {

		if (!HigiApiKey)
			return;	
	
        var url = HigiProxyBypassUrl + "/data/unauthCheckin?time=" + new Date().getTime();

		var request = {
			url: url,
			verb: "POST",
			customHeaders: {
				"ApiToken":HigiApiKey
			},
			contentType:"application/json",
			body:JSON.stringify(checkin)
		};
		
		jkiosk.queueHttp(request);
		
		success();
    };

    this.GetCheckInsAsync = function (higiId, success, error) {
		var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId) + "/checkIn";
		jkiosk.apiProxy(url, 'GET', '', success, error, {"Token":HigiUserToken});
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Update User
    this.UpdateUserAsync = function (higiId, user, success, error) {

		var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId);
		jkiosk.apiProxy(url, 'POST', JSON.stringify(user), success, error, {"Token":HigiUserToken});

    };

    this.updateIHLuserData = function (higiId, token, user, success, error) {
		var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId);
		jkiosk.apiProxy(url, 'POST', JSON.stringify(user), success, error, {"Token":token});    	
    }

    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Update User using memqueue
    this.MemoryQueueUpdateUserAsync = function (higiId, user, success, error) {

        var url = HigiBaseUrl + "/data/user/" + encodeURIComponent(higiId);
        var httpRequest = {
            url: url,
            verb: "POST",
            customHeaders: {
                "Token":HigiUserToken,
                "ApiToken" : HigiApiKey
            },
            body:  JSON.stringify(user)
        };
        jkiosk.memoryQueueHttp(httpRequest, success, success)

    };


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Login Methods

    this.PasswordResetAsync = function (email, success, error) {
		var url = HigiBaseUrl + "/login/passreset?email=" + encodeURIComponent(email);
		
		jkiosk.apiProxy(url, 'GET', '', success, error);
    };


    this.SetPasswordAsync = function (id, token, password, success, error) {
		jkiosk.encrypt(password, function(encryptResult) {
			var postData = JSON.stringify({id:id, password:encryptResult.cipherText, encryptionVersion:encryptResult.keyVersion});
			var url = HigiBaseUrl + "/login/setpassword";
		
			jkiosk.apiProxy(url, 'POST', postData, success, error, {"Token":token});
		});
    };


    //returns a QuickLogin object
    this.QLoginAsync = function (email, password, challengeObj, success, error) {
		jkiosk.encrypt(password, function(encryptResult) {

            var data = {email:email, password:encryptResult.cipherText, encryptionVersion:encryptResult.keyVersion};

            //If challenge exists, get user's relationship to the challenge when logging in
            if(challengeObj.challengeId != null){
                data.challengeId = challengeObj.challengeId;
            }
            if(challengeObj.joinId != null && challengeObj.joinId != undefined){
                data.joinCode = challengeObj.joinId;
            }

            var postData = JSON.stringify(data);
			var url = HigiBaseUrl + "/login/qlogin2";
			jkiosk.apiProxy(url, 'POST', postData, success, error);
		});
    };


    /////////////////////////////////////////////////////////////////////////////////////////////////////
    // Kiosk Methods
    this.GetPrinterSettings = function (response, success, error) {
        var url = HigiBaseUrl + "/data/kiosk/settings";

		jkiosk.apiProxy(url, 'GET', '', success, error);
    }

    // Age bump
    this.DeleteAccountAge13Async = function (userId, dateOfBirth, success, error) {
        var url = HigiBaseUrl + "/data/deleteAccountAge13?userId=" + userId + "&dob=" + encodeURIComponent(dateOfBirth);
	
		jkiosk.apiProxy(url, 'GET', '', success, error, {"Token":HigiUserToken});
    };

    this.getTeleConsultData = function( ihl_id, success, error){
        //data = JSON.stringify({'ihl_id':ihl_id})
        data = JSON.stringify({'ihl_id':ihl_id, 'cache': 'true', 'request_from':'Kiosk'});
        var url = HigiBaseUrl + "/consult/GetPlatfromData";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
        //var url ="teleconsult.json";
        //jkiosk.apiProxy(url, 'Get', '', success, error);
    };

    this.getClassImages = function(data, success, error){
        let body = JSON.stringify(data);
        console.log(body);
        let url = HigiBaseUrl+"/consult/courses_image_fetch";
        jkiosk.apiProxy(url, 'POST', body, success, error, {'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.getConsultantsProfilePicList = function(data, success, error) {
    	let body = JSON.stringify(data);
    	let url = HigiBaseUrl + "/consult/profile_image_fetch";
    	jkiosk.apiProxy(url, 'POST', body, success, error, {'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.getDoctorAvailabilityData = function(ihl_consultant_id, vendor_id, success, error){
        let url = HigiBaseUrl+"/consult/consultant_timings_live_availablity?ihl_consultant_id="+ihl_consultant_id+"&vendor_id="+vendor_id;
        let apiToken = "tNfJTkJafsrzhJB3KQteyk2caz5Ye2OukglXvXr+ez8pB33+C2D+w+zHEHJ7UgboKrrf50P/jE8+On1IOVlObEsDyK/Gtf6iItpBPAwOcc0BAA==";
        let token = "9Jk4Kqbm4qVOwRbftbg2s9Qu7tXxxiPvKcdLl/kPwbckzpWyrZc6OLaJ6KbiGBDDCSCHayHvYnDmxHqk9sND9uhRNhjflKmXsxnDes/YHSdBhka4Msh5zoheHPRCiPtyvtRHVz6yxBOpUBexiFIRCZJDswg7j198BH9+6ITZoNZhwe3RV9+43FlbbMlPkaFDAQA=";
        let contentType = "application/json";
        jkiosk.apiProxy(url, 'GET', '', success, error, {'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getAppointmentConfirm = function(bookingData, success, error){
        let url = HigiBaseUrl + "/consult/BookAppointment";
        let data = JSON.stringify(bookingData);
        let apiToken = 'IWkzkviYuwJqJ2S/F858AdtNyyP3iIDEwJVW4lnn4itl9MOJ9rgTGN2uCRr2ymWQ4qC8ufGtabVjJxZr1o+t1ji4Qk7kFnO4HLtabbdPPFsBAA==';
        let token = 'GKsshZNXO3CzNge63IrpY0W8YNBUMzpbYlvxZ3whkPEUKbk4Oy3KewiOmD3ehOjOi/4hvCSVy8Yuhr31pG76R28OA5j3/Sh6W7JymgFvNN63wY9NaTsFYi2yYtTvelpbxEmIV27w51tT97kizP0C1Ey76NK6BKZy+y7DML12Qv4o1/DqpHx5iqVlXsAcCg50AQA=';
        let contentType = "application/json";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    // this.paymentTransInit = function(paymentData, success, error){
    //     let url = HigiBaseUrl+"/consult/create_payment_transaction";
    //     jkiosk.apiProxy( url, 'POST', JSON.stringify(paymentData), success, error);
    // };

    // this.paymentRequestIdGenerate = function(endpoint,ihlID, success, error){
    //     let getTimeStamp = new Date().getTime();
    //     return endpoint+"_"+ihlID+"_"+getTimeStamp;
    // };

    // this.getPaymentOrderID = function(requestId, amt, success, error){
    //     let timestamp = Date.now();
    //     let order_rcptid = "web"+timestamp;
    //     let url = "https://cors-anywhere.herokuapp.com/"+HigiBaseUrl+"/payment/tele_consult/pay.php?paymentLiveMode=false&receipt="+order_rcptid+"&amount="+amt;
    //     jkiosk.apiProxy(url, 'GET', '', success, error) 
    // }

    // this.paymentTransUpdate = function(jsonDataUpdate, success, error){
    //     let data = JSON.stringify(jsonDataUpdate);
    //     let url = HigiBaseUrl+"/consult/update_payment_transaction";
    //     jkiosk.apiProxy( url, 'POST', data, success, error);
    // };

    this.getDoctorAppointmentDetails = function(doctor_id,startIndex, endIndex, success, error){
        //let id = doctor_id.toString();
        let data = {  
         "consultant_id": doctor_id.toString(),
         "start_index":startIndex,
         "end_index": endIndex         
        };
        //let url = HigiBaseUrl + "/consult/view_all_book_appointment?ihl_consultant_id="+id;
        let url = HigiBaseUrl + "/consult/view_all_book_appointment_pagination";
        let apiToken = "tNfJTkJafsrzhJB3KQteyk2caz5Ye2OukglXvXr+ez8pB33+C2D+w+zHEHJ7UgboKrrf50P/jE8+On1IOVlObEsDyK/Gtf6iItpBPAwOcc0BAA==";
        let token = "9Jk4Kqbm4qVOwRbftbg2s9Qu7tXxxiPvKcdLl/kPwbckzpWyrZc6OLaJ6KbiGBDDCSCHayHvYnDmxHqk9sND9uhRNhjflKmXsxnDes/YHSdBhka4Msh5zoheHPRCiPtyvtRHVz6yxBOpUBexiFIRCZJDswg7j198BH9+6ITZoNZhwe3RV9+43FlbbMlPkaFDAQA=";
        jkiosk.apiProxy(url, 'POST', JSON.stringify(data), success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getConsultationCallSummary = function(appointment_id, success, error) {
        let url = HigiBaseUrl+"/consult/get_appointment_details?appointment_id="+appointment_id;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.createSubscription = function(data, success, error) {
        let dataObj = JSON.stringify(data);
        let url = HigiBaseUrl+"/consult/createsubscription";
        let apiToken = "tNfJTkJafsrzhJB3KQteyk2caz5Ye2OukglXvXr+ez8pB33+C2D+w+zHEHJ7UgboKrrf50P/jE8+On1IOVlObEsDyK/Gtf6iItpBPAwOcc0BAA==";
        let token = "9Jk4Kqbm4qVOwRbftbg2s9Qu7tXxxiPvKcdLl/kPwbckzpWyrZc6OLaJ6KbiGBDDCSCHayHvYnDmxHqk9sND9uhRNhjflKmXsxnDes/YHSdBhka4Msh5zoheHPRCiPtyvtRHVz6yxBOpUBexiFIRCZJDswg7j198BH9+6ITZoNZhwe3RV9+43FlbbMlPkaFDAQA=";
        jkiosk.apiProxy(url, 'POST', dataObj, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.postDoctorReview = function(obj, success, error){
        let dataObj = JSON.stringify(obj);
        let url = HigiBaseUrl + "/consult/insert_telemed_reviews";
        jkiosk.apiProxy(url, 'POST', dataObj, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getDoctorStatus = function(doctor_ids, success, error){
        let dataObj = {
            'consultant_id': doctor_ids
        };
        let url = HigiBaseUrl + '/consult/getConsultantLiveStatus';
        jkiosk.apiProxy(url, 'POST', JSON.stringify(dataObj), success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.consultantAppointmentCallStatusUpdate = function(data, success, error){
        let url = HigiBaseUrl + '/consult/update_call_status?';
        url += 'appointment_id=' + data.appointment_id;
        url += '&call_status=' + data.call_status;
        jkiosk.apiProxy(url, 'Get', '',()=>{success()}, ()=>{error();},{'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.consultantAppointmentStatusUpdate = function(data, success, error){
        let url = HigiBaseUrl + '/consult/update_appointment_status?';
        url += 'appointment_id=' + data.appointment_id;
        url += '&appointment_status=' + data.appointment_status;
        jkiosk.apiProxy(url, 'Get', '',()=>{success()}, ()=>{error();},{'Content-Type':'application/json', "Token":HigiUserToken});
    }

    this.getTeleConsultUserData = function( ihl_id, success, error){
        data = JSON.stringify({'ihl_id':ihl_id})
        var url = HigiBaseUrl + "/consult/get_user_details";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
        //var url ="teleconsult.json";
        //jkiosk.apiProxy(url, 'Get', '', success, error);
    };

    this.updateCallLogDetails = function(data, success, error){
        var url = HigiBaseUrl + "/consult/call_log?by=" + data.host +"&user_id="+ data.hostId + "&action=" + data.action + "&reference_id=" + data.refId + "&course_id=" + data.courseId;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});    
    };

    this.getKioskVitalTestPrice = function(data, success, error){
        let dataObj = JSON.stringify(data);
        let token = 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==';
        var url = HigiBaseUrl + "/data/Getvitalcost";
        jkiosk.apiProxy(url, 'POST', dataObj, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.storeUserPaidServiceAsProvided = function(invoiceId, success, error){
        let value = invoiceId;
        let token = '32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==';
        var url = HigiBaseUrl + "/data/serviceProvided?invoice_id="+value+"";
        jkiosk.apiProxy(url, 'POST', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.generateTokenForApolloTeleconsultation = function(data, success, error){
        let value = JSON.stringify(data);
        var url = "https://iam.test.medeintegra.dev/oauth/token";
        if (HigiBaseUrl == "https://azureapi.indiahealthlink.com") {
        	var url = "https://iam.medeintegra.dev/oauth/token";
        }
        jkiosk.apiProxy(url, 'POST', value, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.updateApolloCaseSheetId = function(data, success, error){
        let value = JSON.stringify(data);
        var url = HigiBaseUrl + "/consult/update_apollo_casesheet_id"
        jkiosk.apiProxy(url, 'POST', value, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getapolloTeleConsultUserData = function(ihl_id, success, error){
        data = JSON.stringify({'ihl_id':ihl_id})
        var url = HigiBaseUrl + "/consult/get_user_details";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.sharePrescriptionTo1mg = function(data, success, error){
        var url = HigiBaseUrl + "/login/sendPrescription";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.updatePaymentTransactionData = function(data, success, error){
        var url = HigiBaseUrl + "/consult/update_payment_transaction";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.updateFreeConsultationDetails = function(data, success, error){
        var url = HigiBaseUrl + "/data/paymenttransaction";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.updateHealthVitalsData = function(data, success, error){
        var url = HigiBaseUrl + "/consult/share_vital_to_apollo";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getAllMedicalFiles = function(data, success, error){
        var url = HigiBaseUrl + "/consult/view_user_medical_document";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getUrlForLiveCallAppointment = function(apmtId, success, error){
        var url = HigiBaseUrl + "/consult/get_existing_appointment_url_for_genix?ihl_appointment_id="+apmtId;
        let apiToken = "tNfJTkJafsrzhJB3KQteyk2caz5Ye2OukglXvXr+ez8pB33+C2D+w+zHEHJ7UgboKrrf50P/jE8+On1IOVlObEsDyK/Gtf6iItpBPAwOcc0BAA==";
        let token = "9Jk4Kqbm4qVOwRbftbg2s9Qu7tXxxiPvKcdLl/kPwbckzpWyrZc6OLaJ6KbiGBDDCSCHayHvYnDmxHqk9sND9uhRNhjflKmXsxnDes/YHSdBhka4Msh5zoheHPRCiPtyvtRHVz6yxBOpUBexiFIRCZJDswg7j198BH9+6ITZoNZhwe3RV9+43FlbbMlPkaFDAQA=";
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getDoctorSignature = function(id, success, error){
        //let id2 = "355b25949ed8405dba88c07e9705082a";
        var url = HigiBaseUrl + "/consult/getGenixDoctorSign?ihl_consultant_id="+id;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getbase64Pdf = function(data, success, error){
        var url = HigiBaseUrl + "/consult/html_to_pdfbase64";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getPrescriptionLogoUrl = function(id, success, error){
        //let id2 = "355b25949ed8405dba88c07e9705082a";
        var url = HigiBaseUrl + "/consult/get_logo_url?accountId="+id;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getPrescriptionNum = function(ihl_userId, success, error){
        var url = HigiBaseUrl+"/consult/user_transaction_from_ihl_id?ihl_id="+ihl_userId;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.generateRazorPayQr = function(amount, purpose, paymentMode, success, error){
        var url = HigiBaseUrl+"/consult/generate_razorpay_qr?amount="+amount+"&purpose="+purpose+"&payment_mode="+paymentMode;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.CheckUpiTransactionStatus = function(id, success, error){
        var url = HigiBaseUrl+"/consult/get_qr_payment_details?razor_qr_code_id="+id;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.getApolloOnlineSpecialities = function(success, error){
        var url = HigiBaseUrl + "/consult/apollo_speciality_online";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', '', success, error,{'Content-Type': 'application/json; charset=UTF-8', "Token":HigiUserToken});
    };

    this.couponCodeGenerate = function (data, success, error) {
    	var url = HigiBaseUrl + "/consult/generate_follow_coupon";
        let token = "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type': 'application/json; charset=UTF-8', "Token":HigiUserToken});	
    }

    this.sendPrescriptionToUser = function (data, success, error) {
    	var url = HigiBaseUrl + "/login/sendPrescriptionToUser";
        let ApiToken = "EB246fKm/c+4SJoWoZG2Qg/Ml6eu5WTdu1+OfEqju9JW7YbKiL2UaW8cXp58I2yhQE6QDb75BbAc9aHPWU22acVoHFNe0pgi4PhXZnEISI8BAA==";
        let token = "tzpAM4cY3YUrSRngZ7GbiBS+bQ7CVoF4MuJ0Ot+cz/Cl1GmQHpPgBZd7eePphZGqB2q5O2IVlt4tCjqY9+tWQl9MU9pcqmI3BINBCS0TJ1JMwt/4e7kV3QBLMEqtOEa/4+tw+ZV3a83h8BjQlnr6NxY94D0032BEB6oNefR4B0b2VMjkJhjEX3JdFnnfIawoAQA="
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type': 'application/json; charset=UTF-8', "Token":token,"ApiToken":ApiToken});	
    }

    this.getUserDetails = function(ihl_id, token, success, error){
        data = JSON.stringify({'id':ihl_id})
        var url = HigiBaseUrl + "/login/get_user_login";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json', "Token":token});
    };

    this.storeLoginUserRecord = function(ihl_id, type, success, error){
        data = JSON.stringify({
            "ihl_user_id": ihl_id,  //mandatory
            "login_type": type,   // sso, password  //mandatory
            "login_source": "kiosk"    // web, moblie, kiosk    //mandatory      
          })
        var url = HigiBaseUrl + "/ihlanalytics/store_and_update_login_user_record";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json'});
    };


    this.getAccessToken = function(kioskID, timestamp, success, error){
        var url = HigiBaseUrl+"/login/kioskLogin?id="+kioskID+"&_="+timestamp; 
        let token = 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==';
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "ApiToken": token});    	
    };

    this.createAccount = function(userGivenData, userToken, success, error){
			var putData = JSON.stringify(userGivenData);
			var url = HigiBaseUrl + '/data/user';
			jkiosk.apiProxy(url, 'PUT', putData, success, error, {'Content-Type':'application/json', "Token":userToken});
    }

    this.esanjeevaniOperatorLogin = function(data, success, error) {
        var postData = JSON.stringify(data);
        var url = HigiBaseUrl + "/esanjeevani/esanjeevaniOperatorLogin";
        jkiosk.apiProxy(url, 'POST', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.esanjeevaniOperatorForgotPassword = function(data, success, error) {
        var postData = JSON.stringify(data);
        var url = HigiBaseUrl + "/esanjeevani/esanjeevaniOperatorForgotPassword";
        jkiosk.apiProxy(url, 'POST', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.eSanjeevaniTestRequestList = function(data, success, error) {
        var postData = JSON.stringify(data);
        var url = HigiBaseUrl + "/esanjeevani/esanjeevaniTestRequestList";
        jkiosk.apiProxy(url, 'POST', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.esanjeevaniServiceProvidedUpdate = function(data, success, error) {
        var postData = JSON.stringify(data);
        var url = HigiBaseUrl + "/esanjeevani/esanjeevaniServiceProvidedUpdate";
        jkiosk.apiProxy(url, 'POST', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.checkFlipKartAccountExists = function(data, success, error) {
        var url = HigiBaseUrl + "/ihlthirdpartyuser/ihlthirdparty_account_exists?ihlThirdPartyUserId="+data['ihlThirdPartyUserId']+"&ihlThirdpartyVendorName="+data['ihlThirdpartyVendorName'];
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.registerFlipKartUserIntoHPod = function(data, success, error) {
        var postData = JSON.stringify(data);
        console.log(postData);
        var url = HigiBaseUrl + "/ihlthirdpartyuser/create_new_user_ihlthirdparty";
        jkiosk.apiProxy(url, 'PUT', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };

    this.loginFlipKartUserIntoHPod = function(data, success, error) {
        var postData = JSON.stringify(data);
        var url = HigiBaseUrl + "/ihlthirdpartyuser/login_ihlthirdparty_user_account";
        jkiosk.apiProxy(url, 'POST', postData, success, error,{'Content-Type':'application/json', "Token":HigiUserToken});
    };
    this.doctorNextAvailabilityNew = function(docId, vendorId, status, success, error){
        var url = HigiBaseUrl + "/consult/busy_availability_check_new"+"?ihl_consultant_id="+docId+"&vendor_id="+vendorId+"&status="+status;
        jkiosk.apiProxy(url, 'GET', '', success, error,{'Content-Type':'application/json'})
    }

    ////************************************************************////
    ////**********************ABHA API START***********************////

    this.fetchDatafromAbhaRes = function(data, success, error){
        var url = HigiBaseUrl + "/ihlabha/fetch_abha_data?request_id="+data['requestId']+"&url_end_point="+data['mode'];
        jkiosk.apiProxy(url, 'GET', '', success, error);
    }

    this.AbhaValidation = function(data, success, error){
        if (data.includes('@')){
            var url = HigiBaseUrl + "/ihlabha/ihlabha_address_or_number_is_exist?abha_address="+data;
        }
        else{
            var url = HigiBaseUrl + "/ihlabha/ihlabha_address_or_number_is_exist?abha_number="+data;
        }
        jkiosk.apiProxy(url, 'GET', '', success, error);
    }

    this.Abhacardsendmail = function(data, success, error){
        var url = HigiBaseUrl + "/ihlabha/abha_card_attachment";
        var postData = {
            "user_name" : data.user_name,
            "user_email": data.user_email,
            "abha_card":data.abha_card
        }
        jkiosk.apiProxy(url, 'POST', JSON.stringify(postData), success, error, {'Content-Type':'application/json'});
    }

    this.fetchABHACareContext = function(data, success, error){
        var abhaAddress = data;
        /*if(!abhaAddress.includes('@sbx')){
        abhaAddress= abhaAddress + '@sbx';    
        }*/
        var postData = {
            "patient_abha_address" : abhaAddress
        }
        var url = HigiBaseUrl + "/ihlabha/ihlabha_carecontext_hip_init_fetch";
        jkiosk.apiProxy(url, 'POST', JSON.stringify(postData), success, error, {'Content-Type':'application/json'});
    }

    this.shareABHACareContext = function(data, success, error){
        var url = HigiBaseUrl + "/ihlabha/ihlabha_carecontext_hip_init_edit";
        jkiosk.apiProxy(url, 'POST', JSON.stringify(data), success, error, {'Content-Type':'application/json'});
    }

    ////**********************ABHA API END***********************////
    ////********************************************************////

    this.isEmailLoginUserFreeServiceAvail = function(data, success, error){
        var url = HigiBaseUrl + "/access_service/check_email_or_domain_access";
        jkiosk.apiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json'});
    }

     ////**********************Recent vital count****************/////
     this.getRecentBCAData = function(id, success, error){
        let postData = {
            "count":5,
            "user_id": id,
            "vital_names":["bmi", "vf", "weight", "pbf"]
        };

        var url = HigiBaseUrl + "/data/get_recent_vital_data_by_count";

        jkiosk.apiProxy(url, 'POST', JSON.stringify(postData), success, error, {'Content-Type':'application/json'});

    };

    ////********************************************************////

    return this;

})();