/************************************************************************************
 jkiosk - Mock Implementation
 Purpose: Provide an example of how to interact with the jkiosk API and mimic
 an actual Kiosk.
 Version: 1.9

 General notes:
 - It is invalid to call any methods until the platformReady callback is sent unless they
 specify otherwise.
 - For any method which has a callback, see the mock implementation for what parameters
 to expect back.
 - Most hardware components provide the same statusX method which indicates if the
 hardware is available or not. Available meaning the device is connected and appears
 to be functioning. For example, a printer that is out of paper will report false. A blood
 pressure cuff that is in the process of being used will still report true (availability does
 not relate to in use). The status reply is sent once, not continuously.
 ************************************************************************************/
var kioskStatus = {apiStatus: "Online"};

(function (jkiosk) {
	"use strict";

	// User does not need to be concerned with these. Pay no attention to the man
	// behind the curtain.
	var callbacks = {};
	var timeouts = [];
	var systemVolume = 0.3;

	// Not normally called by apps. Used to help switch between mock and live scripts.
	jkiosk.close = function() {
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}

	/************************************
	 Configuration
	 ************************************/
	/*
	 Callback will contain the following fields:
	 kioskID

	 Last changed: 0.3 [new]
	 */
	jkiosk.getKioskConfiguration = function(callback) {
		var response = {
			method: "kioskConfigurationResult",
			kioskID: "1111",
			series: (window.outerWidth > 820) ? "SH650" : "SZZT",
			address1: "Srushty Office",
			address2: "Mock",
			city: "Chennai",
			state: "TN",
			zip: "60020",
			organizations: ["Org1","Org2"],
			serialNumber: "2709",
			storeDivision: "WEW-Wework", // MEB-Medi Buddy || IHL-IHL Care || WEW-We Work,
			dateofdeployment: "27-09-2018",
			storeNumber:"C-IHL-19-0003"
		};

		callback(response);
	};

	/****************************
	telemedi gem3s
	****************************/	
	jkiosk.teleMediOnReady = function() {
		var teleSetting = '{"telemedi":true,"vendor":"gem3s","deviceid":"55c3389cb5ddd720dc0297617f3561c43a36218a277c974c8d43d545a643f45c","questionnaireEnable":true}';
		var response = {"method":"TeleMedListener","isApiCallSucess":true,"response": teleSetting};	
		jkiosk.onTeleMedTriggerCallback(response);
	};
	jkiosk.gen3slogin=function(gen3sloginRes, payload){
		var strJsonRes = '{"success": true,"msg": "Login Successfully","data": {"User": {"id": "cb3f9c46-922b-414a-b8a4-5e65ec22ae95","username": "ihl_patient","email": "patient@ihl.com","password": "GnHYQTuKSivQLpv8UEA7DhNuPYSCkz+Fkk2SzbYpK5M=","status": 1,"hospital_id": "6c33ed70-b6de-444b-a7f3-c52484071e8b"},"PatientProfile": {"id": "a83f91f3-e8e1-4146-857c-38ac4a1bd0c2","user_id": "cb3f9c46-922b-414a-b8a4-5e65ec22ae95","salute": "","first_name": "test","middle_name": "","last_name": "patient","suffix": "","display_name": "test patient","gender": "male","dob": "10-02-1990","alternate_email": "","sys_language_id": "","ssno": "","profile_picture": "https://avaya.instapract.com/web/images/profileimages/patientavatar_male.png","height": "","weight": "","bmi": "","linkedin_url": "","website_url": "","note": "","sys_ethnicity_id": "","sys_race_id": "","sys_time_zone_id": "","insurance_front_side": "","insurance_back_side": "","driving_licence": "","preferedlanguageid": "","preferedlanguagename": ""},"PatientProfileLocation": {"id": "39c49432-95b0-47a9-a3a2-7f036fa961d3","user_id": "cb3f9c46-922b-414a-b8a4-5e65ec22ae95","door_no": "","street_name": "","landmark": "","locality": "","postal_code": "60002","phone1": "","phone2": "", "notes": "","country_id": "4faa4fbc-1d00-4297-b3b0-1f05fbd7849c","country_name": "United States of America (USA)","state_id": "a4957d5a-0ee1-47e5-99a4-59561d21b143","state_name": "Alaska","city_id": "20ecd670-d7ed-da7a-c73b-6f762f5ce306","city_name": "Adak"},"NotitificationDetails": {"totalpush": 0,"unread": 0,"read": 0,"unnotified": 0,"notified": 0,"totalappointment": 0,"totalcall": 0},"access_token": "-F9o_","userType": "patient","device": {"status": "Your device is activated.","device_id": "55c3389cb5ddd720dc0297617f3561c43a36218a277c974c8d43d545a643f45c","os_id": "82d10438-70e9-4b75-842c-13df79aeb720","voip_token": ""},"pushStatus": {"Apple Iphone": {"55c3389cb5ddd720dc0297617f3561c43a36218a277c974c8d43d545a643f45c": "Apple push successfully delivered"}}}}';
		var response = {"isApiCallSucess":true, "method":"LoginInfo", "token": strJsonRes};
		gen3sloginRes(response);
	
	};
	jkiosk.gem3sPatientReg=function(patientregisterRes, patientreg){
		var RegJsonRes ='{"success": true,"msg": "Patient Registered successfully","data": {"User": {"id": "9f743adb-78b6-4344-977e-7602f5cb5afd","username": "testacc","email": "smohanraj12@gem3s.in","password": "GnHYQTuKSivQLpv8UEA7DhNuPYSCkz+Fkk2SzbYpK5M=","status": 2,"hospital_id": "6c33ed70-b6de-444b-a7f3-c52484071e8b"},"PatientProfile": {"id": "fac6319f-7ea3-4ef4-a9d2-b3cd5dfe0bde","user_id": "9f743adb-78b6-4344-977e-7602f5cb5afd","salute": "","first_name": "Mohan12","middle_name": "","last_name": "S","suffix": "","display_name": "Mohan12 S","gender": "male","dob": "12-08-1990","alternate_email": "","sys_language_id": "","ssno": "","profile_picture": "https://avaya.instapract.com/web/images/profileimages/patientavatar_male.png","height": "","weight": "","bmi": "","linkedin_url": "","website_url": "", "note": "","sys_ethnicity_id": "","sys_race_id": "","sys_time_zone_id": "","insurance_front_side": "", "insurance_back_side": "","driving_licence": "","preferedlanguageid": "","preferedlanguagename": ""},"PatientProfileLocation": {"id": "e01307d1-a366-47cd-b0bd-c8a125252c22","user_id": "9f743adb-78b6-4344-977e-7602f5cb5afd","door_no": "","street_name": "test","landmark": "","locality": "","postal_code": "87456", "phone1": "9677779935","phone2": "", "notes": "","country_id": "4faa4fbc-1d00-4297-b3b0-1f05fbd7849c","country_name": "United States of America (USA)","state_id": "a4957d5a-0ee1-47e5-99a4-59561d21b143","state_name": "Alaska","city_id": "20ecd670-d7ed-da7a-c73b-6f762f5ce306","city_name": "Adak"},"NotitificationDetails": {"totalpush": 0,"unread": 0,"read": 0,"unnotified": 0,"notified": 0,"totalappointment": 0,"totalcall": 0},"access_token": "Xe-zC","userType": "patient","device": {"status": "Your device is activated.","device_id": "55c3389cb5ddd720dc0297617f3561c43a36218a277c974c8d43d545a643f45c","os_id": "82d10438-70e9-4b75-842c-13df79aeb720","voip_token": ""}}}';
		var response = {"isApiCallSucess":true, "method":"RegInfo", "token": RegJsonRes};	
		patientregisterRes(response);
	};

	jkiosk.gem3slistofspecilality=function(gem3slistofspecilalityRes,token){
		var SpecialityJsonRes =	 '{"success": true, "msg": "No of Speciality : 3","data": [{"id": "5051eee4-91ad-48dd-98e6-234e67cb52c3","name": "Pediatrics","description": "", "sort_order": 0,"webicon_file": "https://avaya.instapract.com/web/images/uploads/specialityIcon/Jw4CTG8yWZuElkZ08qFW3kisRA6ScgGa.png","mobicon_file": ""},{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Family Medicine","description": "","sort_order": 0,"webicon_file": "https://avaya.instapract.com/web/images/uploads/specialityIcon/nNB-bIg43Q6VeHF5d2gHbj2Mw2zEz6_J.png","mobicon_file": ""},{"id": "9c339b68-4e8c-4210-bb2a-bf739b31bd69","name": "Cardiologist","description": "","sort_order": 0,"webicon_file": "https://avaya.instapract.com/web/images/uploads/specialityIcon/JCrn_HS_cnoYONGGtb2JCPBMYIh1_l8H.png","mobicon_file": ""}]}';
	    var response = {"isApiCallSucess":true, "method":"SpecialityInfo", "response": SpecialityJsonRes};	
		gem3slistofspecilalityRes(response);
	};
	jkiosk.resspecilaitylist=function(speciallistRes,token){
		// callbacks["ListofSpecialityInfo"]= speciallistRes;
		// socket.send(JSON.stringify({method:"ListOfSpecialityGem3Api",tokenid:token }));
	};
	jkiosk.gem3sDoctorBasedSapeciality=function(gem3sDoctorBasedSapecialityRes, doctorspecial,token){		
		var DoctorJsonRes= '{"success": true,"msg": "Total No Of Doctor  : 6","data": [{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b3","email": "doctor@ihl.com","specialty": [{"id": "9c339b68-4e8c-4210-bb2a-bf739b31bd69","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc1","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "online","busy_on": "2018-12-03 15:17:16","rating": 3,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b1","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc2","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "available","busy_on": "2018-12-03 15:17:16","rating": 5,"fixed_charge": "25","additional_minutes": "17","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test", "name": "Dr. test doc3","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_female.png","online_status": "online","busy_on": "2018-12-03 15:17:16","rating": 2,"fixed_charge": "15","additional_minutes": "12", "fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b3","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc4","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_female.png","online_status": "available","busy_on": "2018-12-03 15:17:16","rating": 3,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b1","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc5","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "available","busy_on": "2018-12-03 15:17:16","rating": 1,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist" }],"first_name": "test","name": "Dr. test doc6","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "online","busy_on": "2018-12-03 15:17:16","rating": 3,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b3","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc7","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_female.png","online_status": "available","busy_on": "2018-12-03 15:17:16","rating": 3,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b1","email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc8","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "available","busy_on": "2018-12-03 15:17:16","rating": 1,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"},{"id": "10098f4a-ec4d-4eb1-bc37-b6405bf22a6b", "email": "doctor@ihl.com","specialty": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Cardiologist"}],"first_name": "test","name": "Dr. test doc9","profile_picture": "https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","online_status": "online","busy_on": "2018-12-03 15:17:16","rating": 3,"fixed_charge": "15","additional_minutes": "12","fixed_duration": "10","favourite": "No"}]}';
		var response = {"isApiCallSucess":true, "method":"DoctorInfo", "response": DoctorJsonRes};	
		gem3sDoctorBasedSapecialityRes(response);
	};

	jkiosk.gem3sDoctorAvailabile=function(Doctoravailabilitylistres, doctoravail,token){		
		var DoctoravailJsonRes= '{"success":true,"msg":"Total No Of Doctor  : 1","data":[{"id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","email":"doctor@ihl.com","specialty":[{"id":"5051eee4-91ad-48dd-98e6-234e67cb52c3","name":"Pediatrics"},{"id":"9c339b68-4e8c-4210-bb2a-bf739b31bd69","name":"Cardiologist"}],"first_name":"Victor","name":"Dr. Victor Zeno","profile_picture":"https:\/\/avaya.instapract.com\/web\/images\/profileimages\/doctoravatar_male.png","online_status":"online","busy_on":"2019-09-18 10:43:00","rating":0,"fixed_charge":"15","additional_minutes":"12","fixed_duration":"10","favourite":"No"},{"id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","email":"doctor@ihl.com","specialty":[{"id":"9c339b68-4e8c-4210-bb2a-bf739b31bd69","name":"Cardiologist"}],"first_name":"Michael","name":"Dr. Michael","profile_picture":"https:\/\/avaya.instapract.com\/web\/images\/profileimages\/doctoravatar_male.png","online_status":"offline","busy_on":"2019-09-18 10:43:00","rating":0,"fixed_charge":"15","additional_minutes":"12","fixed_duration":"10","favourite":"No"},{"id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","email":"doctor@ihl.com","specialty":[{"id":"40a7138d-b335-d799-916e-61a7f9b659ca","name":"Family Medicine"}],"first_name":"Daniel","name":"Dr. Daniel","profile_picture":"https:\/\/avaya.instapract.com\/web\/images\/profileimages\/doctoravatar_male.png","online_status":"offline","busy_on":"2019-09-18 10:43:00","rating":0,"fixed_charge":"15","additional_minutes":"12","fixed_duration":"10","favourite":"No"}]}';
		var response = {"isApiCallSucess":true, "method":"DoctoravailInfo", "response": DoctoravailJsonRes};	
		Doctoravailabilitylistres(response);
	};

	jkiosk.gem3sSpecilalityquestion=function(gem3sSpecilalityquestionRes,specialqusion,token){
		var QuestionJsonRes = '{"success": true,"msg": "No of Question Types : 4","data": {"speciality": [{"id": "40a7138d-b335-d799-916e-61a7f9b659ca","name": "Family Medicine","description": "","sort_order": 0,"webicon_file": "https://avaya.instapract.com/web/images/uploads/specialityIcon/nNB-bIg43Q6VeHF5d2gHbj2Mw2zEz6_J.png","mobicon_file": ""}],"questionType": [{"id": "e2e8cecb-cae1-4937-8d22-f561ca042245","name": "Reason for the visit","description": "","sort_order": 1,"webicon_file": "","mobicon_file": "","questions": [{"id": "89c4d12f-53e1-4b98-8959-47b25581c5a6","hos_spec_id": "e2e8cecb-cae1-4937-8d22-f561ca042245","name": "What is the reason for your visit?","label": "", "default_value": "","input_type": "textbox","placeholder": "","is_required": "no","answer": ""},{"id": "e74a118b-a088-49a9-bec6-9164b9db8c62","hos_spec_id": "e2e8cecb-cae1-4937-8d22-f561ca042245","name": "When was your last visit to a Doctor?","label": "","default_value": "","input_type": "date","placeholder": "","is_required": "no","answer": ""},{"id": "8ac60312-734b-44ed-a2bf-516d2e715708","hos_spec_id": "e2e8cecb-cae1-4937-8d22-f561ca042245","name": "Do you smoke or consume Alcohol?","label": "","default_value": "","input_type": "radio","placeholder": "","is_required": "no","answer": ""}]},{"id": "7c35325a-663a-42a0-8b13-087668ce1fa7","name": "Medical History","description": "","sort_order": 2,"webicon_file": "","mobicon_file": "","questions": [{"id": "92c791a0-313e-4fac-a2e1-b17c6d6c9aa0","hos_spec_id": "7c35325a-663a-42a0-8b13-087668ce1fa7","name": "Have you had any surgeries done previously","label": "","default_value": "","input_type": "radio","placeholder": "","is_required": "no","answer": ""},{"id": "ea889b21-529e-42ad-a839-f79388cad275","hos_spec_id": "7c35325a-663a-42a0-8b13-087668ce1fa7","name": "Do you take any prescription drugs for any chronic illness?","label": "","default_value": "","input_type": "radio","placeholder": "","is_required": "no","answer": ""},{"id": "7634caa4-824a-42fd-b2f1-35b64b581c06","hos_spec_id": "7c35325a-663a-42a0-8b13-087668ce1fa7","name": "Please choose the immunizations done from the list below","label": "","default_value": "Tetanus, Diphtheria, Pertussis, Polio, Hepatitis B, Measles","input_type": "checkbox","placeholder": "","is_required": "no","answer": ""}]},{"id": "49282e4b-ecb8-481a-82fd-4ed5be0ab553","name": "Vitals","description": "","sort_order": 3,"webicon_file": "","mobicon_file": "","questions": [{"id": "db8f1fd1-520a-4595-af51-4f2999e1c187","hos_spec_id": "49282e4b-ecb8-481a-82fd-4ed5be0ab553","name": "What is your height?","label": "Height","default_value": "","input_type": "textbox","placeholder": "Enter you height","is_required": "yes","answer": ""},{"id": "199ea386-5e8c-49c4-933c-c9c705689f19","hos_spec_id": "49282e4b-ecb8-481a-82fd-4ed5be0ab553","name": "What is your weight?","label": "Weight","default_value": "","input_type": "textbox","placeholder": "Enter your weight","is_required": "yes","answer": ""},{"id": "a50d358d-1d27-46f9-9a0b-906e72ce0eb5","hos_spec_id": "49282e4b-ecb8-481a-82fd-4ed5be0ab553","name": "What is your Blood pressure?","label": "Blood pressure","default_value": "","input_type": "textbox","placeholder": "Enter Blood pressure","is_required": "no","answer": ""}]},{"id": "03e44a5d-e8d4-4d7b-91b9-063adeba5010","name": "Symptoms","description": "","sort_order": "","webicon_file": "","mobicon_file": "","questions": [{"id": "ab5ec54a-1b07-4702-a24c-0965a8b54414","hos_spec_id": "03e44a5d-e8d4-4d7b-91b9-063adeba5010","name": "Kindly list out your Symptoms on the box below","label": "","default_value": "","input_type": "textarea","placeholder": "","is_required": "no","answer": ""},{"id": "0632a410-2304-402e-895f-0031f0df234f","hos_spec_id": "03e44a5d-e8d4-4d7b-91b9-063adeba5010","name": "Choose you allergies from the list below.","label": "","default_value": "Milk, Peanut, Pine Nuts, Walnuts, Shellfish","input_type": "checkbox","placeholder": "","is_required": "no","answer": ""}]}]}}';
		var response = {"isApiCallSucess":true, "method":"QuestionInfo", "response": QuestionJsonRes};	
		gem3sSpecilalityquestionRes(response);
	};
    jkiosk.gem3sanswersubmission=function(gem3sanswersubmissionRes,answersubmission,token){
		 var AnswerJsonRes = '{"success":true,"msg":"Video Precall details saved Successfully","data":{"CallDetail":[{"id":"https://www.youtube.com/embed/tgbNymZ7vqY","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"9aadbe72-b454-4be7-a36d-aebc3fde4ac1","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"6e6dd7a8-17a8-4e67-b85c-427ad74af92b","start_date":"2019-09-18 10:41:30","start_time":"10:41:30","end_time":"10:41:30","call_status":"missed_call","practitioner_notes":"","waiting_token":1,"is_published":"no"}]}}';
	     var response = {"isApiCallSucess":true, "method":"AnswerInfo", "response": AnswerJsonRes};	
		 gem3sanswersubmissionRes(response);
	};
	var startcallResCount = 0;
	jkiosk.gem3sStartcallStatus=function(startcallRes,startcal,token){
		 var StartJsonRes = "";
		 startcallResCount++;
		 if(startcallResCount == 6){
		 	StartJsonRes = '{"success":true,"msg":"Call details updated Successfully","data":{"CallDetail":[{"id":"https://www.youtube.com/embed/tgbNymZ7vqY","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"9aadbe72-b454-4be7-a36d-aebc3fde4ac1","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"6e6dd7a8-17a8-4e67-b85c-427ad74af92b","start_date":"2019-09-18 10:41:30","start_time":"10:41:36","end_time":"10:41:36","call_status":"completed","practitioner_notes":"","waiting_token":1,"is_published":"no"}],"CallAttachment":{"New_CallAttachment":[],"CallAttachment":[]}}}';
		 } else {
		 	StartJsonRes = '{"success":true,"msg":"Call details updated Successfully","data":{"CallDetail":[{"id":"https://www.youtube.com/embed/tgbNymZ7vqY","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"9aadbe72-b454-4be7-a36d-aebc3fde4ac1","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"6e6dd7a8-17a8-4e67-b85c-427ad74af92b","start_date":"2019-09-18 10:41:30","start_time":"10:41:36","end_time":"10:41:36","call_status":"on_going","practitioner_notes":"","waiting_token":1,"is_published":"no"}],"CallAttachment":{"New_CallAttachment":[],"CallAttachment":[]}}}';
		 }
	     //var StartJsonRes = setTimeout(function() {'{"success":true,"msg":"Call details updated Successfully","data":{"CallDetail":[{"id":"http://www.w3schools.com/html/mov_bbb.mp4","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"9aadbe72-b454-4be7-a36d-aebc3fde4ac1","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"6e6dd7a8-17a8-4e67-b85c-427ad74af92b","start_date":"2019-09-18 10:41:30","start_time":"10:43:01","end_time":"10:43:01","call_status":"completed","practitioner_notes":"","waiting_token":1,"is_published":"no"}],"CallAttachment":{"New_CallAttachment":[],"CallAttachment":[]}}}'},5000);

	     var response = {"isApiCallSucess":true, "method":"AnswerInfo", "response": StartJsonRes};	

		 startcallRes(response);

	};
	jkiosk.resPrescription=function(PrescriptionRes, callid,token){
		 var PrintJsonRes = '{"success":true,"msg":"Call View","data":{"callData":{"id":"55fc480c-ba21-43cf-88ad-5ce9c366d818","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"80fc7905-827f-462f-8062-8de871bc27c5","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"aa4d47f3-5158-4d4b-87a3-2d35580e3ff0","start_date":"2019-09-11 09:34:54","start_time":"9:37:20 am","end_time":"9:37:25 am","call_status":"completed","hos_speciality_data":[{"id":"40a7138d-b335-d799-916e-61a7f9b659ca","name":"Family Medicine"}],"pre_call":{"questionType":[{"id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"Reason for the visit","description":"","sort_order":1,"webicon_file":"","mobicon_file":"","questions":[{"id":"89c4d12f-53e1-4b98-8959-47b25581c5a6","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"What is the reason for your visit?","label":"","default_value":"","input_type":"textbox","placeholder":"","is_required":"no","answer":"test"},{"id":"e74a118b-a088-49a9-bec6-9164b9db8c62","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"When was your last visit to a Doctor?","label":"","default_value":"","input_type":"date","placeholder":"","is_required":"no","answer":"12/12/2019"},{"id":"8ac60312-734b-44ed-a2bf-516d2e715708","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"Do you smoke or consume Alcohol?","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":"yes"}]},{"id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Medical History","description":"","sort_order":2,"webicon_file":"","mobicon_file":"","questions":[{"id":"92c791a0-313e-4fac-a2e1-b17c6d6c9aa0","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Have you had any surgeries done previously","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":"yes"},{"id":"ea889b21-529e-42ad-a839-f79388cad275","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Do you take any prescription drugs for any chronic illness?","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":""},{"id":"7634caa4-824a-42fd-b2f1-35b64b581c06","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Please choose the immunizations done from the list below","label":"","default_value":"Tetanus, Diphtheria, Pertussis, Polio, Hepatitis B, Measles","input_type":"checkbox","placeholder":"","is_required":"no","answer":"Tetanus, Diphtheria"}]},{"id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"Vitals","description":"","sort_order":3,"webicon_file":"","mobicon_file":"","questions":[{"id":"db8f1fd1-520a-4595-af51-4f2999e1c187","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your height?","label":"Height","default_value":"","input_type":"textbox","placeholder":"Enter you height","is_required":"yes","answer":"14"},{"id":"199ea386-5e8c-49c4-933c-c9c705689f19","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your weight?","label":"Weight","default_value":"","input_type":"textbox","placeholder":"Enter your weight","is_required":"yes","answer":"123"},{"id":"a50d358d-1d27-46f9-9a0b-906e72ce0eb5","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your Blood pressure?","label":"Blood pressure","default_value":"","input_type":"textbox","placeholder":"Enter Blood pressure","is_required":"no","answer":"123"}]},{"id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Symptoms","description":"","sort_order":"","webicon_file":"","mobicon_file":"","questions":[{"id":"ab5ec54a-1b07-4702-a24c-0965a8b54414","hos_spec_id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Kindly list out your Symptoms on the box below","label":"","default_value":"","input_type":"textarea","placeholder":"","is_required":"no","answer":"456"},{"id":"0632a410-2304-402e-895f-0031f0df234f","hos_spec_id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Choose you allergies from the list below.","label":"","default_value":"Milk, Peanut, Pine Nuts, Walnuts, Shellfish","input_type":"checkbox","placeholder":"","is_required":"no","answer":"Milk, Peanut"}]}]},"survey":[],"practitioner_notes":"","documentation_notes":"","consultation_doc":"","referal_notes":"","rating":0,"addendum_notes":"","is_published":"yes","coupon_id":"","waiting_token":1},"waiting_time":{"hours":0,"minutes":"15"},"fromUser":{"salute":"","name":"Guest User null","gender":"Male","dob":"01-01-2000","profile_picture":"https://avaya.instapract.com/web/images/profileimages/male_avatar.png","email":"test22@gmail.com","address":"test,","address1":"test","address2":"","city":"Adak","state":"Alaska","postal_code":"87456","phone":"8888888888"},"toUser":{"salute":"Dr.","name":"Dr. Victor zeno","gender":"male","dob":"02-07-1992","email":"doctor@ihl.com","profile_picture":"https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","signature":"","dea_no":"AB001234532","npi_no":"","address":"181, 2nd floor, right wing, victor ave,","stateid":"a4957d5a-0ee1-47e5-99a4-59561d21b143","cityid":"20ecd670-d7ed-da7a-c73b-6f762f5ce306","postal_code":"60001","phone_no":"","city":"Adak","state":"Alaska"},"patientUser":{"name":"Guest User null","email":"test22@gmail.com","alternate_email":"test22","profile_picture":"https://avaya.instapract.com/web/images/profileimages/male_avatar.png","gender":"Male","dob":"01-01-2000","height":"","weight":"","bmi":""},"icdCode":[],"absenceForm":[],"prescriptions":[{"id":"1c972fe3-b289-4a30-bb20-c87f4f28115f","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"9df81880-5fd7-43cd-b86b-e62a3e901250","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"},{"id":"0898a06b-cdda-48c5-aae3-7b9e40253ef2","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"6f5f5c6e-5797-40d9-bc7a-b77c24283cce","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"}],"call_duration":"00:00:05","CallAttachment":[],"CallPrescription":[{"id":"1c972fe3-b289-4a30-bb20-c87f4f28115f","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"9df81880-5fd7-43cd-b86b-e62a3e901250","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"},{"id":"0898a06b-cdda-48c5-aae3-7b9e40253ef2","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"6f5f5c6e-5797-40d9-bc7a-b77c24283cce","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"}],"CallPayment":{"id":"1874fbd8-fd13-4530-8ce1-0d364acc0b04","amount":0,"coupon_info":[],"payment_status":"Not paid","is_copay":"No","copay_notes":"","commission_info":[]},"couponInfo":"","callForm":{"callXrayForm":"","CallMriForm":"","CallLabtestForm":"","CallSpecialityreferralForm":"","CallMedicalmarijuanaForm":""}}}';
	     var response = {"status":true, "method":"ConsultInfo", "response": PrintJsonRes};	
		 setTimeout(function() {PrescriptionRes(response)},1000);
	};
	jkiosk.gem3sConsultationDetails=function(gem3sConsultationDetailsRes, callid,token){
		 var ConsultJsonRes = '{"success":true,"msg":"Call View","data":{"callData":{"id":"55fc480c-ba21-43cf-88ad-5ce9c366d818","hospital_id":"6c33ed70-b6de-444b-a7f3-c52484071e8b","from_user_id":"80fc7905-827f-462f-8062-8de871bc27c5","to_user_id":"10098f4a-ec4d-4eb1-bc37-b6405bf22a6b","patient_profile_id":"aa4d47f3-5158-4d4b-87a3-2d35580e3ff0","start_date":"2019-09-11 09:34:54","start_time":"9:37:20 am","end_time":"9:37:25 am","call_status":"completed","hos_speciality_data":[{"id":"40a7138d-b335-d799-916e-61a7f9b659ca","name":"Family Medicine"}],"pre_call":{"questionType":[{"id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"Reason for the visit","description":"","sort_order":1,"webicon_file":"","mobicon_file":"","questions":[{"id":"89c4d12f-53e1-4b98-8959-47b25581c5a6","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"What is the reason for your visit?","label":"","default_value":"","input_type":"textbox","placeholder":"","is_required":"no","answer":"test"},{"id":"e74a118b-a088-49a9-bec6-9164b9db8c62","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"When was your last visit to a Doctor?","label":"","default_value":"","input_type":"date","placeholder":"","is_required":"no","answer":"12/12/2019"},{"id":"8ac60312-734b-44ed-a2bf-516d2e715708","hos_spec_id":"e2e8cecb-cae1-4937-8d22-f561ca042245","name":"Do you smoke or consume Alcohol?","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":"yes"}]},{"id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Medical History","description":"","sort_order":2,"webicon_file":"","mobicon_file":"","questions":[{"id":"92c791a0-313e-4fac-a2e1-b17c6d6c9aa0","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Have you had any surgeries done previously","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":"yes"},{"id":"ea889b21-529e-42ad-a839-f79388cad275","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Do you take any prescription drugs for any chronic illness?","label":"","default_value":"","input_type":"radio","placeholder":"","is_required":"no","answer":""},{"id":"7634caa4-824a-42fd-b2f1-35b64b581c06","hos_spec_id":"7c35325a-663a-42a0-8b13-087668ce1fa7","name":"Please choose the immunizations done from the list below","label":"","default_value":"Tetanus, Diphtheria, Pertussis, Polio, Hepatitis B, Measles","input_type":"checkbox","placeholder":"","is_required":"no","answer":"Tetanus, Diphtheria"}]},{"id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"Vitals","description":"","sort_order":3,"webicon_file":"","mobicon_file":"","questions":[{"id":"db8f1fd1-520a-4595-af51-4f2999e1c187","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your height?","label":"Height","default_value":"","input_type":"textbox","placeholder":"Enter you height","is_required":"yes","answer":"14"},{"id":"199ea386-5e8c-49c4-933c-c9c705689f19","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your weight?","label":"Weight","default_value":"","input_type":"textbox","placeholder":"Enter your weight","is_required":"yes","answer":"123"},{"id":"a50d358d-1d27-46f9-9a0b-906e72ce0eb5","hos_spec_id":"49282e4b-ecb8-481a-82fd-4ed5be0ab553","name":"What is your Blood pressure?","label":"Blood pressure","default_value":"","input_type":"textbox","placeholder":"Enter Blood pressure","is_required":"no","answer":"123"}]},{"id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Symptoms","description":"","sort_order":"","webicon_file":"","mobicon_file":"","questions":[{"id":"ab5ec54a-1b07-4702-a24c-0965a8b54414","hos_spec_id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Kindly list out your Symptoms on the box below","label":"","default_value":"","input_type":"textarea","placeholder":"","is_required":"no","answer":"456"},{"id":"0632a410-2304-402e-895f-0031f0df234f","hos_spec_id":"03e44a5d-e8d4-4d7b-91b9-063adeba5010","name":"Choose you allergies from the list below.","label":"","default_value":"Milk, Peanut, Pine Nuts, Walnuts, Shellfish","input_type":"checkbox","placeholder":"","is_required":"no","answer":"Milk, Peanut"}]}]},"survey":[],"practitioner_notes":"","documentation_notes":"","consultation_doc":"","referal_notes":"","rating":0,"addendum_notes":"","is_published":"yes","coupon_id":"","waiting_token":1},"waiting_time":{"hours":0,"minutes":"15"},"fromUser":{"salute":"","name":"Guest User null","gender":"Male","dob":"01-01-2000","profile_picture":"https://avaya.instapract.com/web/images/profileimages/male_avatar.png","email":"test22@gmail.com","address":"test,","address1":"test","address2":"","city":"Adak","state":"Alaska","postal_code":"87456","phone":"8888888888"},"toUser":{"salute":"Dr.","name":"Dr. Victor zeno","gender":"male","dob":"02-07-1992","email":"doctor@ihl.com","profile_picture":"https://avaya.instapract.com/web/images/profileimages/doctoravatar_male.png","signature":"","dea_no":"AB001234532","npi_no":"","address":"181, 2nd floor, right wing, victor ave,","stateid":"a4957d5a-0ee1-47e5-99a4-59561d21b143","cityid":"20ecd670-d7ed-da7a-c73b-6f762f5ce306","postal_code":"60001","phone_no":"","city":"Adak","state":"Alaska"},"patientUser":{"name":"Guest User null","email":"test22@gmail.com","alternate_email":"test22","profile_picture":"https://avaya.instapract.com/web/images/profileimages/male_avatar.png","gender":"Male","dob":"01-01-2000","height":"","weight":"","bmi":""},"icdCode":[],"absenceForm":[],"prescriptions":[{"id":"1c972fe3-b289-4a30-bb20-c87f4f28115f","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"9df81880-5fd7-43cd-b86b-e62a3e901250","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"},{"id":"0898a06b-cdda-48c5-aae3-7b9e40253ef2","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"6f5f5c6e-5797-40d9-bc7a-b77c24283cce","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"}],"call_duration":"00:00:05","CallAttachment":[],"CallPrescription":[{"id":"1c972fe3-b289-4a30-bb20-c87f4f28115f","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"9df81880-5fd7-43cd-b86b-e62a3e901250","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"},{"id":"0898a06b-cdda-48c5-aae3-7b9e40253ef2","sys_drug_id":"","drug_name":"medicine1","dosage":"120","frequency":"1-1-1","days":"2","notes":"after food"},{"id":"6f5f5c6e-5797-40d9-bc7a-b77c24283cce","sys_drug_id":"","drug_name":"medicine2","dosage":"150","frequency":"1-0-1","days":"2","notes":"after ffod"}],"CallPayment":{"id":"1874fbd8-fd13-4530-8ce1-0d364acc0b04","amount":0,"coupon_info":[],"payment_status":"Not paid","is_copay":"No","copay_notes":"","commission_info":[]},"couponInfo":"","callForm":{"callXrayForm":"","CallMriForm":"","CallLabtestForm":"","CallSpecialityreferralForm":"","CallMedicalmarijuanaForm":""}}}';
	     var response = {"status":true, "method":"ConsultInfo", "response": ConsultJsonRes};	
		 gem3sConsultationDetailsRes(response);
		
	};
    jkiosk.reslogout=function(logoutRes,token){
		/*callbacks["LogouttInfo"]= logoutRes;
		socket.send(JSON.stringify({method:"LogOutGem3sApi",tokenid:token }));*/
	};

	jkiosk.paymentOnReady = function(){
		var response = {"isPaymentEnable":false, "paymentLiveMode":false };
		jkiosk.onPaymentTriggerCallback(response);
	}

	jkiosk.fingerprintOnReady = function(){
		var response = {"isDeviceDetected":true};
		jkiosk.onFingerprintTriggerCallback(response);		
	}

    jkiosk.onFingerprintTriggerCallback = function(response) {
        console.log(response);
        console.log(response.isDeviceDetected);
    }

    jkiosk.isMosambeeOnReady = function(){
		var response = {"mosambeeHardwareEnable":false,
						"mosambeePaymentEnable" : true,
						"vitalPayment": true,
						"paymentMock" : false,
						"affiliateEnableOnRegFlow": true,
						"userAddToAffiliate" : false,
						"externalBillOrgList": "IHL",
						"empIdEnableInRegFlow": true,
						"languageEnable" : true,
						"sixLeadECGonly" : true,
						"invasiveEnable" : true,
						"invasiveMock": true
					};
		jkiosk.onMosambeeTriggerCallback(response);		
	}

    jkiosk.onMosambeeTriggerCallback = function(response) {
        console.log("inside mosambee");
        console.log(response.mosambeePaymentEnable);
        console.log(response.mosambeeHardwareEnable);

        if (response.mosambeePaymentEnable == true) {
          $rootScope.mosambeePaymentEnable = true;
        }else{
          $rootScope.mosambeePaymentEnable = false;
        }

        if (response.mosambeeHardwareEnable == true) {
          $rootScope.mosambeeHardwareEnable = true;
        }else{
          $rootScope.mosambeeHardwareEnable = false;
        }

        console.log("mosambeePaymentEnable   "+$rootScope.mosambeePaymentEnable);
        console.log("mosambeeHardwareEnable   "+$rootScope.mosambeeHardwareEnable);

        if ($rootScope.mosambeePaymentEnable) {
          window.location.href="#/mosambeePayment";
        }else{
          window.location.href="#/welcome";
        }
    };

    jkiosk.barcodeReaderOnReady = function(){
		var response = {"status":false,
						"shutdownCode":false};
		jkiosk.onBarcodeReaderTriggerCallback(response);
	};

    jkiosk.onBarcodeReaderTriggerCallback = function(Res) {
        console.log(Res);
        $rootScope.BarcodeReaderDevice = Res.status;
        $rootScope.shutdownCode = Res.shutdownCode;
        //alert("$rootScope.BarcodeReaderDevice = "+ $rootScope.BarcodeReaderDevice);
        //alert("$rootScope.shutDownCode = "+ $rootScope.shutdownCode);
    }

	jkiosk.isTemperatureOnReady = function(){
		var response = {"TemperatureStatus":true};
		jkiosk.onTemperatureTriggerCallback(response);
	}

	jkiosk.getTemperatureModuleName = function(temperatureModuleNameRes) {
		var response = {"HardwareType":"Forehead"};	// Forehead || Wrist
		temperatureModuleNameRes(response);	
	}

	jkiosk.isSpo2OnReady = function(){	
		var response = {"Spo2Status":true};
		jkiosk.onSpo2TriggerCallback(response);
	}
	jkiosk.isZUGECGOnReady =function() {
		var response={"ZUGECGStatus":true};
		jkiosk.onZUGECGTriggerCallback(response);
	}
jkiosk.SwitchIdentifyReady = function(){	
		var response = {"SwitchHardwareStatus":true};
		jkiosk.SwitchIdentifyTriggerCallback(response);
	}
 jkiosk.mvmOnReady = function() {
               var response = {"MvmStatus":true};
               jkiosk.onMvmTriggerCallback(response);
       };

/*	jkiosk.onTemperatureTriggerCallback = function(){
		alert("test");
		var response = '{"TemperatureStatus":"123", "age":31, "city":"New York"}';
		return response;
	}*/
	/*
	 Call to determine if a hardware module is available. Calling other methods on an unavailable module may not ever returns a response.
	 If a module value is false, the kiosk normally has that module but it is currently having an issue. If a module key is not present,
	 the kiosk has never had that module.

	 Last changed: 1.4 [new]
	 */
	jkiosk.getAvailableModules = function(callback) {

		if(window.outerWidth > 850){
			var response = {
				"Blood Pressure": true,
				"Weight Scale": true,
				"Body Composition": false,
				"FullBodyCompositionAnalyser":true,
				"ECG": true,
				"SPo2": true,
				"temp": true,
				"SwitchHardware" : true,
				"MVM" : true
			};

		} else {
			var response = {
				"Blood Pressure": true,
				"Weight Scale": true,
				"Body Composition": false,
			    "FullBodyCompositionAnalyser":true,
				"ECG": true,
				"SPo2": true,
				"temp": true,
				"SwitchHardware" : true,
				"MVM" : true
			};
		}


		callback(response);
	};



	/************************************
	 higi API
	 ************************************/
	/*
	 Callback will contain the following fields:
	 serverResponse

	 Last changed: 1.0 [new]
	 */
	jkiosk.higiLogin = function(higiLoginResultCallback) {
		// This needs to call the higi server. Cannot just send back anything
		var mergeId = 2936;

		$.ajax({
			async:false, timeout:40000,
			url: HigiBaseUrl + "/login/kioskLogin?id=" + mergeId,
			type:'GET',
			success:function (result) {
				setTimeout(function() {
					var wrapped = {
						serverResponse: JSON.stringify(result)
					};
					higiLoginResultCallback(wrapped);
				}, 1000);
			},
			headers:{
				"ApiToken":"hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA=="
			}
		});
	}
	//new   SNyQ+xKMWA2ws/OYz7ZeaZyZYEBtJaKiy0e/D6bkzTQyH6ATXQgIATFfX6LdAsZ0UXbsYfatki4i/ipg97EPwHa1sqazi8vXPETyN9qqUWgBAA==		
	//old  hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==
	/************************************
	 Life cycle
	 ************************************/

	/* 
	 Use this method to register a callback to be informed when jkiosk is ready. It is invalid to
	 call any other jkiosk method until this callback returns. This will potentially return before
	 the page is drawn. If you perform UI operations in response, do not call this until document load.

	 onPlatformReadyCallback is only fired once per full page load.

	 Last changed: 0.9 [added setTimeout to better simulate real conditions]
	 */
	jkiosk.onPlatformReady = function(onPlatformReadyCallback) {
		setTimeout(onPlatformReadyCallback, 1000);
	};

	/* 
	 Call when a user starts a session. Analytics are logged with the session ID. Suggest
	 calling whenever the app navigates away from the attract content.
	 Last changed: 0.2 [new]
	 */
	jkiosk.startSession = function() {
		console.log("startSession called");
	};

	/*
	 Suggest calling whenever attract content is loaded. No harm is done if endSession is called
	 on application start as a result of that approach.

	 WARNING: if the kiosk is configured to restart the browser at end of session, calling this
	 method will quickly halt your application. Do not have any code after a call to EndSession that
	 needs to be run.

	 Last changed: 0.8 [comments updated]
	 */
	jkiosk.endSession = function() {
		console.log("endSession called");
		sessionStats = { };
	};

	/*
	 Call for each screen that is loaded by the application. Used by metrics system to track time
	 spent on a page. Also call startScreen from your attract content so that the last screen a user
	 visits will be considered ended.
	 Last changed: 0.2 [new]
	 */
	jkiosk.startScreen = function(theScreenID) {
		console.log("startScreen called");
	};

	/************************************
	 System Volume
	 ************************************/

	jkiosk.setVolume = function(volume){
		console.log('setting system volume');
	};

	jkiosk.getVolume = function(callback){
		var volume = {volume :.5};
		callback(volume);
	};


	/************************************
	 Ads
	 ************************************/
	/*
	 Call to determine what ad to play. Can only make one concurrent call to this method. See
	 getAdConcurrent if you need to make concurrent calls for different ad spots.
	 Last changed: 1.0 [new]
	 */

	jkiosk.getAd = function(callback, adSpotId, state) {

		//B1C104F7-885F-4E02-BA49-01F1104D4025
		//062E8669-A73C-422A-B175-023084CDC004
		//287BFA2A-2334-4BB1-BB56-03013B816007
		//5FE53AD3-9DAB-42A5-9351-044C98246645
		//EC0D3C0B-6024-4A65-9882-05FD55784DEF
		//1D6434F7-344C-44EE-A1A9-060EB8BDE613
		//0BDB242D-C8A8-42C1-9E05-07DEF1621439
		//0C6FEB0C-FAB6-41FD-B90A-09B1E24CF3D2
		//BFE35F6F-CD70-4CA4-875B-0B479ECB9FF9
		//C5FDE9B3-0046-46E1-A497-100D154B7275
		var challengeObject = {challengeId : "3049", joinId : "em3ml"};

		var questionnaireTemplate = {
			"Heading":"Learn more about xyz company",
			"Subheading" : "Get more information about exciting offers from XYZ",
			"Questions":[
				{
					"_Type":"FreeTextQuestion",
					"Type":"FreeText",
					"Label":"Email2",
					"Text":"Enter your email address",
					"ValidationTypes":[
						"EmailAddress"
					]
				}
			],
			"Disclaimer":"By entering your email, you agree to sign away your life. Most just want to win the game they came to win. They want to come out ahead.",
			"Url":"http://addev1.superbuddytime.com/svc/placementSets/73849159-2025-448f-80bd-ba2a5de9146c/questionnaireResponse",
			"Button1Text":"Learn More",
			"Button2Text":"Return to Results",
			"Button3Text":"Continue to Results",
			"PlacementId" : "C5FDE9B3-0046-46E1-A497-100D154B7275"
		};


		if(adSpotId == "kv1_regprompts") {
			//../images/regprompt_mac_iphone.png
			if(window.innerWidth > 800){
				//2014-01-09-stayhealthy-regprompt-ad.jpg
				callback({method: "getAdRegPrompt", hasAd: "true", path: "images/2014-01-09-stayhealthy-regprompt-ad.png", playNotificationUrl: "http://localhost", mimeType: "image/png"});
			} else {
				callback({method: "getAdRegPrompt", hasAd: "true", path: "images/regprompt_mac_iphone.png", playNotificationUrl: "http://localhost", mimeType: "image/png"});
			}
			//callback({method: "getAdRegPrompt", hasAd: "true", path: "images/regprompt_mac_iphone.png", playNotificationUrl: "http://localhost", mimeType: "image/png"});
		} else if(adSpotId == "kv1_final"){
			//callback({hasAd : "false"});
			callback(
				{
					method: "getAdResult",
					hasAd: 'true',
					path: "http://www.w3schools.com/html/mov_bbb.mp4",
					playNotificationUrl: "http://localhost",
					mimeType: "video/mp4",
					questionnaireTemplate : questionnaireTemplate
				});

			//callback(
			//   {
			//       method: "getAdResult",
			//       hasAd: 'true',
			//       path: "images/finalresults_ad_defaultad_authenticated20130430.png",
			//       playNotificationUrl: "http://localhost",
			//       mimeType: "image/png",
			//       questionnaireTemplate : questionnaireTemplate
			//   });

			//images/finalresults_ad_defaultad_authenticated20130430.png
		}
		else if(adSpotId == "kv1_bp"){

			callback(
				{
					method: "getAdResult",
					hasAd: "false",
					path: "http://www.w3schools.com/html/mov_bbb.mp4",
					playNotificationUrl: "http://localhost",
					mimeType: "video/mp4",
					//   path: "images/finalresults_ad_defaultad_authenticated20130430.png",
					//   playNotificationUrl: "http://localhost",
					//   mimeType: "image/png",

					questionnaireTemplate : questionnaireTemplate
				}
			);

			//callback(
			//   {
			//       method: "getAdResult",
			//       hasAd: 'true',
			//       path: "images/finalresults_ad_defaultad_authenticated20130430.png",
			//       playNotificationUrl: "http://localhost",
			//       mimeType: "image/png"
			//    });

		}

		
		else if(adSpotId == "challenge_post_login"){
			callback(
				{
					method: "getAdResult",
					hasAd: 'false',
					path: "docs/challenges/last-checkin-default-message.jpg",
					playNotificationUrl: "http://localhost",
					challengeId : challengeObject.challengeId,
					joinId : challengeObject.joinId,
					mimeType: "image/png"
				});
		}
		else if(adSpotId == "challenge_rules"){
			callback(
				{
					method: "getAdResult",
					hasAd: 'true',
					path: "docs/challenges/challenge-terms.png",
					playNotificationUrl: "http://localhost",
					mimeType: "image/png"
				});
		}
		//finalresults_challenge_joined
		else if(adSpotId == "challenge_final"){
			callback(
				{
					method: "getAdResult",
					hasAd: 'true',
					path: "docs/challenges/final-results-ad-challenge.png",
					playNotificationUrl: "http://localhost",
					mimeType: "image/png",
					adType : "challenge",
					challenge : challengeObject
				});
		}
		//else if(adSpotId == "finalresults_challenge_joined"){
		//	callback(
		//		{
		//			method: "getAdResult",
		//			hasAd: 'true',
		//			path: "docs/challenges/final-results-ad-challenge-joined.png",
		//			playNotificationUrl: "http://localhost",
		//			mimeType: "image/png",
		//			adType : "challenge",
		//			challenge : challengeObject
		//		});
		//}

		//else if(adSpotId == "newuser_challenge"){
		//	callback(
		//	   {
		//	       method: "getAdResult",
		//	       hasAd: 'true',
		//	       path: "images/last-checkin-default-message.png",
		//	       playNotificationUrl: "http://localhost",
		//	       mimeType: "image/png",
		//		   adType : "challenge",
		//		   challenge : {challengeId : "ch2owqu", joinId : "e7otj"}
		//	    });
		//}
		////finalresults_challenge_joined
		//else if(adSpotId == "finalresults_challenge"){
		//	callback(
		//		{
		//			method: "getAdResult",
		//			hasAd: 'true',
		//			path: "images/final-results-ad-challenge.png",
		//			playNotificationUrl: "http://localhost",
		//			mimeType: "image/png",
		//			adType : "challenge",
		//			challenge : {challengeId : "ch2owqu", joinId : "e7otj"}
		//		});
		//}
		//else if(adSpotId == "finalresults_challenge_joined"){
		//	callback(
		//		{
		//			method: "getAdResult",
		//			hasAd: 'true',
		//			path: "images/final-results-ad-challenge-joined.png",
		//			playNotificationUrl: "http://localhost",
		//			mimeType: "image/png",
		//			adType : "challenge",
		//			challenge : {challengeId : "ch2owqu", joinId : "e7otj"}
		//		});
		//}
		else {
			callback({method: "getAdResult", hasAd: "false"});

		}

		//callback({method: "getAdResult", hasAd: "false"});
	};

	/*
	 Last changed: 1.8 [new]
	 If more than one ad needs to be obtained concurrently, use this method.
	 Cannot make two concurrent calls to the same ad spot.
	 */

	jkiosk.getAdConcurrent = function(callback, adSpotId, state) {
		var questionnaireTemplate = {
			"Heading":"Learn more about xyz company",
			"Subheading" : "Get more information about exciting offers from XYZ",
			"Questions":[
				{
					"_Type":"FreeTextQuestion",
					"Type":"FreeText",
					"Label":"Email2",
					"Text":"Enter your email address",
					"ValidationTypes":[
						"EmailAddress"
					]
				}
			],
			"Disclaimer":"By entering your email, you agree to sign away your life. Most just want to win the game they came to win. They want to come out ahead.",
			"Url":"http://addev1.superbuddytime.com/svc/placementSets/73849159-2025-448f-80bd-ba2a5de9146c/questionnaireResponse",
			"Button1Text":"Learn More",
			"Button2Text":"Return to Results",
			"Button3Text":"Continue to Results",
			"PlacementId" : "C5FDE9B3-0046-46E1-A497-100D154B7275"
		};
		var challengeObject = {challengeId : "3049", joinId : "em3ml"};
		if(adSpotId == "challenge_post_login"){
			callback(
				{
					method: "getAdResult",
					hasAd: 'true',
					path: "docs/challenges/last-checkin-default-message.jpg",
					playNotificationUrl: "http://localhost",
					challengeId : challengeObject.challengeId,
					joinId : challengeObject.joinId,
					mimeType: "image/png"
				});
		}
		else if(adSpotId == "challenge_rules"){
			callback(
				{
					challengeId : challengeObject.challengeId,
					method: "getAdResult",
					hasAd: 'true',
					path: "docs/challenges/challenge-terms.png",
					playNotificationUrl: "http://localhost",
					mimeType: "image/png"
				});
		}
		//finalresults_challenge_joined
		else if(adSpotId == "challenge_final"){
			callback(
				{
					challengeId : challengeObject.challengeId,
					method: "getAdResult",
					hasAd: 'true',
					path: "docs/challenges/final-results-ad-challenge.png",
					playNotificationUrl: "http://localhost",
					mimeType: "image/png",
					adType : "challenge",
					challenge : challengeObject
				});
		} else if(adSpotId == "kv1_final"){
			//callback({hasAd : "false"});
			callback(
				{
					method: "getAdResult",
					hasAd: 'true',
					path: "http://www.w3schools.com/html/mov_bbb.mp4",
					playNotificationUrl: "http://localhost",
					mimeType: "video/mp4",
					questionnaireTemplate : questionnaireTemplate
				});

			//callback(
			//   {
			//       method: "getAdResult",
			//       hasAd: 'true',
			//       path: "images/finalresults_ad_defaultad_authenticated20130430.png",
			//       playNotificationUrl: "http://localhost",
			//       mimeType: "image/png",
			//       questionnaireTemplate : questionnaireTemplate
			//   });

			//images/finalresults_ad_defaultad_authenticated20130430.png
		}
		else if(adSpotId == "kv1_bp"){

			callback(
				{
					method: "getAdResult",
					hasAd: "false",
					path: "http://www.w3schools.com/html/mov_bbb.mp4",
					playNotificationUrl: "http://localhost",
					mimeType: "video/mp4",
					//   path: "images/finalresults_ad_defaultad_authenticated20130430.png",
					//   playNotificationUrl: "http://localhost",
					//   mimeType: "image/png",

					questionnaireTemplate : questionnaireTemplate
				}
			);

			//callback(
			//   {
			//       method: "getAdResult",
			//       hasAd: 'true',
			//       path: "images/finalresults_ad_defaultad_authenticated20130430.png",
			//       playNotificationUrl: "http://localhost",
			//       mimeType: "image/png"
			//    });

		}

		else {
			callback({method: "getAdResult-" + adSpotId, hasAd: "false"});
		}
	};

	/*
	 Last changed: 1.1 [new]
	 */
	jkiosk.sessionAdPlayed = function(adEvent) {
		console.log('called session ad played');
		//socket.send(JSON.stringify({method: "sessionAdPlayed", playNotificationEvent: adEvent.playNotificationEvent	}));
	};

	/************************************
	 Cursor

	 All applications should call either show or hide. Do not assume the system is in the correct
	 state when your page is started. Another app may have changed the cursor setting.

	 When working with jkiosk mock, the cursor will not actually hide.
	 ************************************/
	/*
	 Hides the mouse cursor system wide.
	 Last changed: 0.5 [new]
	 */
	jkiosk.hideCursor = function() {
		console.log("hideCursor called (will not actually hide when using jkiosk mock)");
	};

    jkiosk.callZugECGLegONStatusFunction =function(ZugECGLegONStatusCallbackFunction){
 var t = setTimeout(function() { ZugECGLegONStatusCallbackFunction(JSON.parse('{"method": "ECGLegONStatus", "ecgLegONStatus": '+true+'}')) }, 1000);
		timeouts.push(t);
	}
	
jkiosk.callZugECGLegOFFStatusFunction =function(ZugECGLegOFFStatusCallbackFunction){
 var t = setTimeout(function() { ZugECGLegOFFStatusCallbackFunction(JSON.parse('{"method": "ECGLegOFFStatus", "ecgLegOFFStatus": '+true+'}')) }, 500);
		timeouts.push(t);
	}	
	 jkiosk.callFindECGHardwareFunction =function(findECGHardwareAvailability){
 var t = setTimeout(function() { findECGHardwareAvailability(JSON.parse('{"method": "isZUGECGReadyDuringTest", "ZUGECGStatusDuringTest": '+true+'}')) }, 1000);
		timeouts.push(t);
	}
	 jkiosk.callFindSpO2HardwareFunction =function(findSpO2HardwareAvailability){
 var t = setTimeout(function() { findSpO2HardwareAvailability(JSON.parse('{"method": "isSpo2ReadyDuringTest", "Spo2StatusDuringTest": '+true+'}')) }, 1000);
		timeouts.push(t);
	}
	jkiosk.callZugECGSwitchOnFunction =function(ECGSwitchOnCallbackFunction){
	var t = setTimeout(function() { ECGSwitchOnCallbackFunction(JSON.parse('{"method": "ECGSwitchON", "ecgONStatus": '+true+'}')) }, 500);
		timeouts.push(t);
	};

jkiosk.callZugECGSwitchAbortFunction =function(ZugECGSwitchAbortCompleteCallbackFunction){
	var t = setTimeout(function() { ZugECGSwitchAbortCompleteCallbackFunction(JSON.parse('{"method": "ECGSwitchOFF", "ecgOFFStatus": '+true+'}')) }, 500);
		timeouts.push(t);
	}
	jkiosk.callFullBodyBMCFootWearStatusFunction =function(ZugECGLeftJackStatusCallbackFunction){
		var t = setTimeout(function() { ZugECGLeftJackStatusCallbackFunction(JSON.parse('{"method": "ECGLeftJackStatus", "ecgLeftJackStatus": '+true+'}')) }, 500);
		timeouts.push(t);
	};

	jkiosk.callZugECGRightJackStatusFunction =function(ZugECGRightJackStatusCallbackFunction){
	var t = setTimeout(function() { ZugECGRightJackStatusCallbackFunction(JSON.parse('{"method": "ECGRightJackStatus", "ecgRightJackStatus": '+false+'}')) }, 500);
		timeouts.push(t);
	};
jkiosk.FilteredDataForECG= function (FilteredDataForECGCallback, full_data, readingLead){
		
		//  var fjson="{'RPEAK': '417,973,1213', 'RR': '1112.0,480.0', 'PR': '228.0,242.0,294.0', 'HR': '53.96,125.0', 'QRSD': '126.0,90.0,118.0', 'QT': '98.0,96.0,94.0', 'QTC': '228.0,206.0,246.0', 'FDATA': '81.86,80.85,80.53,81.44,83.81,87.51,92.06,96.67,100.42,102.42,102.0,98.87,93.2,85.65,77.29,69.49,63.63,60.94,62.23,67.76,77.13,89.31,102.78,115.71,126.27,132.91,134.59,130.96,122.46,110.24,95.97,81.62,69.09,59.98,55.28,55.27,59.48,66.81,75.75,84.63,91.97,96.68,98.25,96.79,92.96,87.82,82.57,78.32,75.89,75.65,77.49,80.9,85.07,89.11,92.22,93.85,93.77,92.12,89.3,85.9,82.51,79.64,77.58,76.4,75.94,75.91,75.98,75.88,75.49,74.88,74.3,74.08,74.58,76.07,78.62,82.06,85.96,89.72,92.67,94.18,93.83,91.51,87.47,82.3,76.84,72.04,68.76,67.61,68.83,72.22,77.19,82.87,88.27,92.54,95.11,95.82,94.96,93.2,91.4,90.43,90.98,93.34,97.37,102.49,107.85,112.5,115.62,116.71,115.69,112.9,109.05,104.96,101.43,98.99,97.77,97.53,97.71,97.56,96.41,93.83,89.74,84.49,78.74,73.34,69.12,66.7,66.36,68.0,71.19,75.31,79.71,83.89,87.59,90.84,93.86,96.96,100.36,104.08,107.82,111.04,113.06,113.22,111.12,106.79,100.75,94.02,87.93,83.9,83.19,86.57,94.21,105.57,119.51,134.49,148.83,161.01,169.91,175.0,176.31,174.38,170.1,164.42,158.2,152.04,146.19,140.57,134.89,128.76,121.83,113.91,105.0,95.3,85.17,75.0,65.18,56.03,47.79,40.62,34.6,29.83,26.36,24.17,23.16,23.06,23.41,23.56,22.76,20.27,15.55,8.44,-0.75,-11.16,-21.46,-30.05,-35.3,-35.91,-31.12,-20.97,-6.27,11.45,30.23,48.01,63.01,74.02,80.61,83.16,82.71,80.76,78.87,78.41,80.27,84.77,91.65,100.19,109.46,118.5,126.57,133.2,138.26,141.91,144.42,146.12,147.24,147.91,148.15,147.99,147.54,147.08,147.13,148.38,151.61,157.53,166.62,178.96,194.16,211.36,229.31,246.56,261.69,273.5,281.24,284.7,284.23,280.62,274.98,268.46,262.04,256.3,251.34,246.7,241.51,234.59,224.78,211.14,193.21,171.13,145.72,118.37,90.83,64.92,42.29,24.07,10.72,1.98,-3.09,-5.87,-7.96,-10.9,-15.88,-23.63,-34.31,-47.62,-62.87,-79.18,-95.59,-111.19,-125.16,-136.74,-145.26,-150.1,-150.73,-146.85,-138.47,-126.13,-110.91,-94.45,-78.77,-65.96,-57.78,-55.25,-58.27,-65.48,-74.33,-81.45,-83.16,-76.23,-58.5,-29.42,9.71,55.84,104.61,151.06,190.47,219.13,234.96,237.83,229.48,213.14,192.86,172.81,156.52,146.38,143.33,146.87,155.34,166.35,177.32,185.96,190.62,190.53,185.73,176.99,165.54,152.78,140.0,128.22,118.11,109.92,103.62,98.98,95.69,93.49,92.18,91.66,91.9,92.86,94.43,96.38,98.33,99.77,100.11,98.85,95.6,90.28,83.18,74.96,66.59,59.29,54.25,52.51,54.68,60.89,70.62,82.86,96.17,108.96,119.71,127.22,130.82,130.39,126.41,119.76,111.59,103.07,95.16,88.55,83.54,80.08,77.89,76.56,75.66,74.88,74.02,72.97,71.7,70.15,68.18,65.56,62.04,57.37,51.45,44.4,36.65,28.86,21.9,16.65,13.83,13.84,16.58,21.46,27.42,33.13,37.17,38.28,35.61,28.81,18.06,4.03,-12.29,-29.77,-47.25,-63.63,-77.81,-88.55,-94.3,-93.07,-82.35,-59.35,-21.26,34.15,107.85,198.99,304.39,418.42,533.26,639.61,727.75,788.81,816.08,806.02,758.9,678.85,573.36,452.22,326.15,205.37,98.26,10.52,-55.28,-99.53,-124.99,-135.88,-136.87,-132.22,-125.13,-117.53,-110.09,-102.65,-94.61,-85.45,-75.02,-63.69,-52.22,-41.56,-32.49,-25.42,-20.14,-15.94,-11.71,-6.26,1.33,11.47,23.9,37.71,51.49,63.66,72.78,77.89,78.67,75.53,69.5,62.0,54.52,48.34,44.23,42.42,42.52,43.78,45.31,46.39,46.74,46.65,47.04,49.21,54.58,64.29,78.82,97.75,119.67,142.38,163.23,179.74,190.12,193.8,191.68,186.06,180.28,177.95,182.18,194.69,215.25,241.45,268.9,292.01,304.95,302.85,282.85,244.77,191.32,127.74,60.88,-1.96,-54.35,-91.73,-112.19,-116.49,-107.77,-90.65,-70.23,-51.04,-36.26,-27.29,-23.79,-24.09,-25.82,-26.58,-24.59,-18.95,-9.77,2.08,15.35,28.76,41.37,52.71,62.74,71.66,79.69,86.8,92.67,96.7,98.21,96.73,92.23,85.29,77.12,69.36,63.77,61.81,64.32,71.31,81.87,94.39,106.88,117.38,124.39,127.13,125.68,120.86,114.03,106.71,100.28,95.64,93.14,92.56,93.3,94.57,95.64,96.06,95.67,94.64,93.29,91.99,90.94,90.13,89.33,88.16,86.26,83.44,79.74,75.55,71.48,68.22,66.38,66.31,67.96,70.87,74.31,77.39,79.33,79.66,78.32,75.65,72.34,69.16,66.77,65.46,65.1,65.08,64.53,62.56,58.57,52.49,44.94,37.21,31.03,28.25,30.42,38.38,52.01,70.14,90.72,111.17,128.85,141.55,147.98,147.97,142.5,133.5,123.42,114.7,109.33,108.39,111.92,118.92,127.67,136.05,142.06,144.21,141.79,134.99,124.76,112.58,100.11,88.8,79.68,73.16,69.06,66.75,65.39,64.16,62.53,60.34,57.8,55.47,53.99,53.95,55.75,59.42,64.71,71.13,78.08,85.0,91.51,97.42,102.73,107.54,111.93,115.82,118.96,120.91,121.15,119.2,114.84,108.26,100.05,91.28,83.27,77.4,74.87,76.43,82.2,91.66,103.71,116.84,129.44,140.01,147.49,151.31,151.5,148.58,143.41,136.95,130.09,123.51,117.54,112.23,107.36,102.62,97.69,92.35,86.56,80.46,74.37,68.64,63.67,59.74,57.01,55.44,54.79,54.67,54.53,53.78,51.87,48.36,43.07,36.07,27.79,18.98,10.59,3.69,-0.73,-1.97,0.26,5.74,13.75,23.14,32.61,40.87,46.99,50.53,51.66,51.13,50.11,49.89,51.65,56.11,63.42,73.07,84.03,94.91,104.33,111.14,114.67,114.82,112.03,107.12,101.06,94.74,88.77,83.42,78.63,74.17,69.86,65.71,62.1,59.75,59.65,62.82,70.07,81.74,97.54,116.57,137.36,158.22,177.45,193.76,206.43,215.45,221.46,225.59,229.13,233.29,238.89,246.23,255.07,264.7,274.16,282.43,288.62,292.17,292.78,290.48,285.47,278.02,268.4,256.78,243.31,228.07,211.17,192.78,173.13,152.45,130.94,108.68,85.68,61.85,37.14,11.65,-14.27,-39.91,-64.31,-86.34,-104.93,-119.4,-129.63,-136.22,-140.42,-143.91,-148.42,-155.23,-164.8,-176.42,-188.23,-197.41,-200.72,-195.14,-178.54,-150.27,-111.41,-64.74,-14.32,35.14,79.14,114.11,138.03,150.66,153.45,149.13,141.05,132.53,126.17,123.54,124.98,129.82,136.71,144.1,150.63,155.5,158.49,159.91,160.34,160.37,160.31,160.07,159.19,156.97,152.79,146.3,137.71,127.76,117.7,108.98,102.94,100.52,101.92,106.57,113.18,119.98,125.09,126.88,124.36,117.3,106.36,92.91,78.75,65.81,55.75,49.71,48.16,50.86,57.0,65.38,74.69,83.7,91.49,97.52,101.62,103.96,104.9,104.9,104.38,103.72,103.18,102.92,103.05,103.64,104.68,106.12,107.8,109.41,110.49,110.44,108.66,104.58,97.9,88.68,77.42,65.1,53.06,42.81,35.75,32.92,34.71,40.76,49.89,60.32,69.94,76.72,79.13,76.43,68.94,58.0,45.74,34.72,27.44,25.85,30.95,42.58,59.44,79.37,99.71,117.83,131.63,139.87,142.36,139.91,134.11,126.88,120.13,115.34,113.32,114.14,117.27,121.73,126.47,130.63,133.71,135.68,136.94,138.09,139.75,142.36,145.92,150.03,153.86,156.31,156.23,152.61,144.81,132.63,116.45,97.1,75.85,54.21,33.76,15.98,2.09,-7.14,-11.51,-11.38,-7.74,-2.06,3.9,8.33,9.7,7.02,0.13,-10.26,-22.65,-34.98,-45.1,-51.22,-52.39,-48.85,-42.03,-34.42,-28.97,-28.39,-34.34,-46.7,-63.12,-79.05,-88.13,-83.18,-57.43,-5.88,73.42,178.53,303.35,438.02,570.02,685.78,772.57,820.4,823.51,781.26,698.32,583.92,450.51,311.87,181.18,69.12,-17.38,-75.83,-108.0,-119.11,-116.41,-107.66,-99.52,-96.4,-99.86,-108.6,-119.11,-126.63,-126.45,-115.0,-90.67,-54.19,-8.41,42.29,92.92,138.87,176.73,204.83,223.34,233.99,239.46,242.65,245.96,250.76,257.17,264.19,270.02,272.6,270.16,261.64,246.91,226.78,202.75,176.67,150.36,125.28,102.32,81.8,63.55,47.15,32.08,17.97,4.64,-7.9,-19.5,-30.03,-39.43,-47.79,-55.3,-62.2,-68.62,-74.55,-79.69,-83.57,-85.57,-85.11,-81.77,-75.46,-66.42,-55.25,-42.77,-29.88,-17.38,-5.83,4.53,13.8,22.32,30.55,38.91,47.63,56.68,65.69,74.01,80.85,85.35,86.83,84.86,79.44,71.03,60.53,49.2,38.5,29.9,24.64,23.54,26.79,33.95,43.91,55.1,65.72,74.06,78.79,79.29,75.73,69.08,60.95,53.24,47.8,46.02,48.55,55.13,64.71,75.63,85.99,94.1,98.85,99.93,97.94,94.21,90.57,88.87,90.67,96.86,107.5,121.81,138.34,155.23,170.55,182.6,190.13,192.46,189.51,181.71,169.9,155.18,138.8,122.12,106.51,93.27,83.62,78.47,78.37,83.33,92.68,105.14,118.86,131.64,141.3,145.99,144.55,136.73,123.29,105.85,86.67,68.23,52.81,42.11,37.02,37.51,42.73,51.28,61.52,71.91,81.25,88.9,94.72,99.0,102.23,104.93,107.46,109.86,111.94,113.26,113.34,111.8,108.44,103.32,96.79,89.34,81.58,74.04,67.16,61.21,56.33,52.56,49.9,48.37,48.02,48.89,50.98,54.17,58.16,62.46,66.45,69.44,70.84,70.27,67.69,63.42,58.1,52.63,47.91,44.71,43.47,44.17,46.33,49.08,51.31,51.95,50.12,45.42,37.94,28.32,17.58,6.93,-2.55,-10.07,-15.43,-18.98,-21.55,-24.21,-27.89,-32.95,-38.81,-43.73,-44.74,-37.91,-18.86,16.51,71.21,146.29,240.24,348.68,464.5,578.43,680.07,759.18,807.1,817.99,789.73,724.34,627.75,509.05,379.17,249.46,130.2,29.28,-48.49,-101.72,-132.09,-143.62,-141.63,-131.71,-118.75,-106.3,-96.36,-89.42,-84.87,-81.54,-78.17,-73.82,-68.1,-61.14,-53.43,-45.6,-38.19,-31.47,-25.45,-19.92,-14.63,-9.42,-4.32,0.43,4.45,7.4,9.1,9.73,9.8,10.12,11.64,15.2,21.37,30.23,41.39,54.01,66.95,79.05,89.29,97.01,101.98,104.39,104.82,104.05,103.0,102.52,103.39,106.23,111.46,119.26,129.53,141.86,155.47,169.23,181.79,191.73,197.86,199.44,196.48,189.83,181.11,172.5,166.27,164.28,167.5,175.62,186.97,198.69,207.24,209.04,201.25,182.4,152.76,114.4,70.9,26.64,-13.92,-47.02,-70.28,-82.93,-85.79,-80.93,-71.05,-58.85,-46.5,-35.32,-25.68,-17.25,-9.31,-1.22,7.3,16.0,24.21,31.03,35.73,38.06,38.45,38.01,38.26,40.82,46.88,56.84,70.12,85.18,99.83,111.67,118.68,119.69,114.67,104.79,92.13,79.28,68.74,62.39,61.13,64.72,71.94,80.93,89.64,96.35,100.0,100.4,98.17,94.49,90.75,88.19,87.59,89.11,92.33,96.41,100.35,103.28,104.61,104.2,102.25,99.23,95.64,91.89,88.15,84.36,80.33,75.86,70.92,65.74,60.88,57.1,55.24,55.97,59.66,66.2,75.03,85.2,95.55,104.98,112.58,117.82,120.57,121.05,119.62,116.7,112.57,107.3,100.8,92.94,83.65,73.18,62.09,51.33,42.07,35.52,32.64,33.9,39.18,47.69,58.15,69.05,78.96,86.82,92.22,95.38,97.1,98.5,100.67,104.33,109.61,115.94,122.18,126.85,128.56,126.34,119.97,110.12,98.26,86.38,76.57,70.57,69.36,72.92,80.21,89.38,98.2,104.51,106.73,104.21,97.37,87.65,77.13,68.16,62.82,62.51,67.66,77.69,91.14,106.03,120.2,131.8,139.54,142.85,141.91,137.49,130.68,122.6,114.26,106.35,99.22,93.02,87.74,83.4,80.1,78.07,77.55,78.78,81.77,86.32,91.91,97.86,103.4,107.87,110.88,112.41,112.83,112.75,112.91,113.91,116.03,119.12,122.54,125.35,126.46,124.92,120.21,112.36,102.06,90.54,79.34,70.03,63.86,61.49,62.85,67.12,72.91,78.52,82.32,83.07,80.23,74.04,65.51,56.27,48.21,43.16,42.49,46.85,56.06,69.06,84.14'}";
 var dbs="abc";
    var t = setTimeout(function() { FilteredDataForECGCallback(JSON.parse('{"method": "FilteredResponse", "data": "'+dbs+'", "reading_lead": "'+readingLead+'"}')) }, 1000);
		timeouts.push(t);
};	/*
	 Shows the mouse cursor system wide.
	 Last changed: 0.5 [new]
	 */
	jkiosk.showCursor = function() {
		console.log("showCursor called");
	};

	/************************************
	 Crypto
	 ************************************/
	/*
	 Performs symmetric key encryption
	 Last changed: 1.6 [new]
	 */
	jkiosk.encrypt = function(text, encryptResult) {
		encryptResult({cipherText: text, keyVersion: null});
	};

	/*
	 NOT cryptographically secure. Used to prevent reverse engineering of QR code.

	 Last changed: 1.7 [new]
	 */
	jkiosk.obfuscateCheckin = function(checkin, callback) {

		// Format of everything here must match C# QrCodeCheckin::QrSerialize

		var d = new Date();
		var stringDate = "" + d.getFullYear() +
			("0" + (d.getMonth() + 1)).slice(-2) +
			("0" + d.getDate()).slice(-2) +
			("0" + d.getHours()).slice(-2) +
			("0" + d.getMinutes()).slice(-2) +
			("0" + d.getSeconds()).slice(-2);

		// The first zero tells the server that this is not obfuscated data
		// The "1" is the kiosk ID
		var encoded = "0" + "1" + "*" +
			(checkin["systolic"] || "") + "*" +
			(checkin["diastolic"] || "") + "*" +
			(checkin["pulseBmp"] || "") + "*" +
			(checkin["weightKG"] || "") + "*" +
			(checkin["heightMeters"] || "") + "*" +
			(checkin["fatRatio"] || "") + "*" +
			(checkin["hydrationPct"] || "") + "*" +
			(checkin["bmcOhms"] || "") + "*" +
			stringDate;

		callback({result: encoded});
	}

	/************************************
	 API Proxy
	 ************************************/
	/*
	 Proxies API requests
	 Last changed: 1.7 [new]
	 */
	jkiosk.apiProxy = function(url, method, body, onSuccess, onFailure, headers) {
		if (!headers) {
			headers = { };
		}

		if(headers["ApiToken"] == undefined){
			headers["ApiToken"] = HigiApiKey;
		}

		

		$.ajax({
			url:url,
			type:method,
			data:body,
			success:function (result, response, jqXHR) {
				onSuccess(result);
			},
			error:function (result) {
				onFailure();
			},
			headers:headers
		});
	};

	// Abha API proxy
	jkiosk.abhaApiProxy = function(url, method, body, onSuccess, onFailure, headers) {

		$.ajax({
			url:url,
			type:method,
			data:body,
			success:function (result) {
				onSuccess(result);
			},
			error:function (result) {
				onFailure();
			},
			headers:headers
		});
	};

	jkiosk.getAffiliates = function(success, error){
		var url = HigiBaseUrl + '/consult/get_list_of_affiliation';
		jkiosk.apiProxy(url, 'GET', '', success, error);
	}


	/*
	 Asks for status of network connection to API
	 Callback will receive
	 apiStatus: [Online|Offline|Intermittent]
	 Last changed: 1.7 [new]
	 */
	jkiosk.apiStatus = function(callback) {
		callback(kioskStatus);
		//callback({apiStatus: "Online"});
	};

	/************************************
	 Event Logging
	 ************************************/
	/*
	 More explicit log method for UI events that will queue and batch.
	 Last changed: 1.3 [new]
	 */
	jkiosk.logEvent = function(in_sessionId, in_senderId, in_eventCategory, in_eventName, in_userId) {
		console.log("logEvent called " + in_sessionId + " , " + in_senderId + " , " + in_eventCategory + " , " + in_eventName + " , " + in_userId);
	};

	/************************************
	 Analytics

	 The following are all automatically recorded for you when you log something:
	 Kiosk ID
	 Session ID
	 Current Screen (as set by startScreen calls)
	 Timestamp

	 Parameters found in analytics methods:
	 senderID: identifies the control that is sending the event, such as couponButton
	 action: the activity that is being performed. Advise not including dynamically changing text.
	 For example, log the action "Coupon Printed" and not "Printed Coupon #1234".
	 details: the appropriate place to include dynamically changing text or longer descriptions
	 of an action.
	 ************************************/
	/*
	 Handy shortcut for logging clicks, just pass an identifier for what was clicked.
	 Last changed: 0.2 [new]
	 */
	jkiosk.logClick = function(theSenderID) {
		console.log("logClick called");
	};

	/*
	 Log metrics with this method. This is NOT intended to be a debug log. Messages
	 are sent to an analytics server.

	 Last changed: 0.2 [new]
	 */
	jkiosk.logInfo = function(theSenderID,theAction,theDetails) {
		console.log("logInfo called");
	};

	/*
	 Last changed: 0.2 [new]
	 */
	jkiosk.logWarn = function(theSenderID,theAction,theDetails) {
		console.log("logWarn called " + theSenderID + " " + theAction + " " + theDetails);
	};

	/*
	 Last changed: 0.2 [new]
	 */
	jkiosk.logError = function(theSenderID,theAction,theDetails) {
		console.log("logError called");
	};

	/*
	 Last changed: 0.2 [new]
	 */
	jkiosk.logFatal = function(theSenderID,theAction,theDetails) {
		console.log("logFatal called");
	};

	/************************************
	 Queued HTTP Requests
	 ************************************/
	/*
	 Last changed: 1.0 [new]
	 */
	jkiosk.queueHttp = function(httpRequest) {
		console.log("queueHttp called");
	};

	/*
	 Tries to make the request immediately. If it fails it will be retained
	 in memory and retried.

	 completeCallback fires if the request was able to be done immediately.
	 queuedCallback fires if the request failed or is taking to long (will keep trying)

	 Do not make overlapping calls to this method. Must wait for one callback to return
	 before making another call. Otherwise the callbacks get mixed up.

	 Last changed: 1.9 [new]
	 */
	jkiosk.memoryQueueHttp = function(httpRequest, completeCallack, queuedCallback) {
		$.ajax({
			url: httpRequest.url,
			method: httpRequest.verb,
			data: httpRequest.body,
			headers: httpRequest.customHeaders,
			contentType: httpRequest.contentType,
			done: function() {completeCallack();},
			fail: function() {queuedCallback();},
		});
	};

	/************************************
	 Audio
	 ************************************/
	/*
	 Last changed: 0.3 [new]
	 */
	jkiosk.mute = function() {
		console.log("mute called");
	};

	/*
	 Last changed: 0.3 [new]
	 */
	jkiosk.unmute = function() {
		console.log("unmute called");
	};

	/*
	 Level is a float between 0.0 and 1.0

	 Last changed: 0.3 [new]
	 */
	jkiosk.setVolume = function(volumeLevel) {
		console.log("setVolume called");
		systemVolume = volumeLevel;
	};

	jkiosk.getVolume = function(volumeResult) {
		volumeResult({volume: systemVolume});
	};

	/************************************
	 Printing
	 ************************************/
	/*
	 Prints the provided HTML content. Pass in the whole content as a string,
	 not a file path or URL. See the provided printing.html example for an approach
	 to injecting dynamic values into a static HTML file before calling this method.

	 Rendering is done by an internally by Internet Explorer, not by the
	 browser being used to run the HTML5 app.

	 HTML content cannot contain references to images stored on disk or relative
	 paths. Can contain absolute path to outside HTTP server or an image
	 that is base64 encoded into the tag's src.

	 Either onJobComplete or onJobFailed will fire once for each call to print.
	 onJobComplete fires very soon after the paper physically comes out. If a print
	 job fails, it will take some time for onJobFailed to occur - about 10 seconds
	 depending on the length of your printout.

	 Last changed: 0.9 [added onJobComplete, onJobFailed]
	 */
	jkiosk.print = function(htmlContent, onJobComplete, onJobFailed) {
		console.log("print called");

		setTimeout(function() { onJobComplete() }, 3000);
	};

	/*
	 Last changed: 0.2 [return field name changed for consistency with other devices]
	 */
	jkiosk.getPrinterStatus = function(onStatusResult) {
		callbacks["printerStatusResult"] = onStatusResult;

		onStatusResult({isAvailable: true});
	}
/*jkiosk.getKioskConfiguration = function(callback) {
		var response = {
			method: "kioskConfigurationResult",
			kioskID: "1111",
			series: (window.outerWidth > 820) ? "SH650" : "SZZT",
			address1: "Srushty Office",
			address2: "Mock",
			city: "Chennai",
			state: "Tamil Nadu",
			zip: "60020",
			organizations: ["Org1","Org2"],
			serialNumber: "IHLSRU121800030",
			storeDivision: "MEB-Medi Buddy", // MEB-Medi Buddy || IHL-IHL Care,
			dateofdeployment: "27-09-2018",
			storeNumber:"C-IHL-19-0003"
		};

		callback(response);
	};*/
		jkiosk.getPrinterSettings = function(onPrinterResult) {
		//callbacks["printerSettingsResult"] = onPrinterResult;
		var printresponse = {
			method: "printerSettingsResult",
			Name: "Thermal",
			PaperType: "Custom",
			PaperHeight: "700",
			PaperWidth: "827"
		};
		console.log(printresponse);

		onPrinterResult(printresponse);
	};

	/************************************
	 Body Composition
	 ************************************/
	/*
	 Parameters:
	 birthDate: MM/DD/YYYY
	 heightCm: height in centimetes (decimal)
	 weightKg: weight in kilograms (decimal)
	 isMale: true if the user is male
	 activityLevel: one of {Active|Normal|Athlete}
	 Callbacks (each is called at most once)
	 handsDetectedCallback: fired when sensor has detected above zero reading, indicating user has their hands on the device
	 handsRemovedCallback: fired if a user places their hands on the device and then removes them before the test is complete. This may
	 indicate user did not understand instructions.
	 progressCallback: contains a progress indication as the test is running (value of 40 indicates 40%)
	 testResultCallback: fired when we have test results. Return object has attributes:
	 hydrationPct: % hydration
	 bodyFatPct: % body fat
	 bmi: body mass index
	 leanMassKg: lean body mass in kilograms
	 leanMassLb: lean body mass in pounds
	 hardStopTriggered: if this is true, it means the users height or weight was outside the algorithm limits. An answer is still
	 provided, but it is calculated using the maximum possible value.
	 timeoutCallback: did not get an answer back from hardware within allotted time

	 Last changed: 1.5 [new]
	 */
	jkiosk.startBodyComposition = function (birthDate, heightCm, weightKg, isMale, activityLevel,
											handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {



		$( "body" ).keypress(function( event ) {
			if (event.which == 62) {
				clearTimeout(window.t);
				event.preventDefault();
				handsRemovedCallback({method: "handsRemoved"});
			}
		});

		window.t = setTimeout(function() { handsDetectedCallback({
			method: "bodyCompHandsDetected"
		}) }, 2000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "20"
		}) }, 2500);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "40"
		}) }, 3000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "60"
		}) }, 3500);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "80"
		}) }, 4000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "90"
		}) }, 8000);


		window.t = setTimeout(function() { testResultCallback({
			method: "bodyCompResult",
			hydrationPct: "3.5",
			bodyFatPct: "17.3",
			bmi: "23.2",
			leanMassKg: "40.29",
			leanMassLb: "88.83",
			hardStopTriggered: false,
			ohms : 123
		}) }, 9000);

	};
	// Full Body BMC Communication Call backs with Mock Data
	jkiosk.setBmcFrequency250 =function(setBmcFrequency250CallbackFunction){

	var t = setTimeout(function() { setBmcFrequency250CallbackFunction(JSON.parse('{"method": "Frequency250Set", "Setfrequency250Status": '+true+'}')) }, 1000);
		timeouts.push(t);
	};

	jkiosk.setBmcFrequency50 =function(setBmcFrequency50CallbackFunction){

	var t = setTimeout(function() { setBmcFrequency50CallbackFunction(JSON.parse('{"method": "Frequency50Set", "Setfrequency50Status": '+true+'}')) }, 1000);
		timeouts.push(t);
	};

	jkiosk.setBmcFrequency625 =function(setBmcFrequency625CallbackFunction){

	var t = setTimeout(function() { setBmcFrequency625CallbackFunction(JSON.parse('{"method": "Frequency625Set", "Setfrequency625Status": '+true+'}')) }, 1000);
		timeouts.push(t);
	};

	jkiosk.stopReadResistance = function (stopReadResistanceCallbackFunction) {
		var t = setTimeout(function() { stopReadResistanceCallbackFunction(JSON.parse('{"method": "stopReadResistance", "stopReadResistanceStatus": '+true+'}')) }, 1000);
		timeouts.push(t);
	};
    
	jkiosk.readResistance = function (handsDetectedCallback, handsRemovedCallback, progressCallback, testResultCallback, timeoutCallback) {

		$( "body" ).keypress(function( event ) {
			if (event.which == 62) {
				clearTimeout(window.t);
				event.preventDefault();
				handsRemovedCallback({method: "handsRemoved"});
			}
		});

		window.t = setTimeout(function() { handsDetectedCallback({
			method: "bodyCompHandsDetected"
		}) }, 2000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "20"
		}) }, 2500);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "40"
		}) }, 3000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "60"
		}) }, 3500);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "80"
		}) }, 4000);
		window.t = setTimeout(function() { progressCallback({
			method: "bodyCompProgress",
			progress: "90"
		}) }, 8000);

		window.t = setTimeout(function() { testResultCallback({
			method: "bodyCompResult",
			ohms: 450,
		}) }, 9000);

	};

	/************************************
	 Start button
	 ************************************/
	/*
	 Callback fires for each user press of the button. This could happen at any time after registering the handler.

	 Last changed: 1.5 [new]
	 */
	jkiosk.monitorStartButton = function (buttonCallback) {
		//Press "Z" to simulate
		$( "body" ).keypress(function( event ) {

			if (event.which == 122) {
				console.log(event.which + "was pressed. simulating start button pressed.");
				event.preventDefault();
				var t = setTimeout(function() { buttonCallback({
					method: "startButtonPressed"
				}) }, 2000);
			}
		});

	};

	/************************************
	 Card Swipe
	 ************************************/
	/*
	 Callbacks will only fire once per start card swipe.

	 Last changed: 0.1
	 */
	jkiosk.startCardSwipe = function(onCardSwipeResult, onCardSwipeError) {
		var response = {
			method: "cardSwipeResult",
			firstName: "John",
			lastName: "Smith",
			middleName: "A",
			cardNumber: "1111222233334444",
			expirationMonth: "01",
			expirationYear: "15",
			track1: "%B1111222233334444^JOHN/SMITH A^1505101000000000000000000000000234001000?",
			track2: ";1111222233334444=15011010000023400100?",
			track3: ""
		};

		setTimeout(function() { onCardSwipeResult(response) }, 1000);
	};

	/*
	 Not strictly required, but if you want your app to not receive callbacks if a user
	 swipes a card sometime later, call stop.

	 Last changed: 0.1
	 */
	jkiosk.stopCardSwipe = function() {
		console.log("stopCardSwipe called");
	};

	/*
	 onStatusCallback will only fire once per call.

	 Last changed: 0.2 [new]
	 */
	jkiosk.getCardSwipeStatus = function(onStatusCallback) {
		onStatusCallback({method: "cardSwipeStatus", isAvailable: true});
	};


	/************************************
	 Printer paper avaialable check
	 ************************************/
	
	jkiosk.getPrinterPaperStatus = function(onPrinterPaperStatus){
		onPrinterPaperStatus({printerPaperStatus: false});
	}


	/************************************
	 Blood Pressure
	 ************************************/
	/*
	 Callbacks:
	 Pressure changed (as the device pumps up and down):
	 pressure
	 Result callback:
	 systolic
	 diastolic
	 pulse
	 Error callback:
	 stopReason: [Fatal | UserStop | UserError]

	 For stopReason, fatal indicates a hardware problem that is not likely to be fixed
	 by the user trying again. userStop indicates user pressed the abort button. userError
	 indicates something that might be recoverable if user tries again (i.e. user was
	 moving around too much).

	 onPressureChangeCallback fires multiple times per BP start. onResultCallback and
	 onErrorCallback will fire once per BP start.

	 Last changed: 0.4 [error callback API change]
	 */
	jkiosk.startBP = function(onPressureChangeCallback, onResultCallback, onErrorCallback) {
		console.log("startBP called");

		callbacks["bpMeasurementError"] = onErrorCallback;

		$( "body" ).keypress(function( event ) {

			if (event.which == 63) { //"?" is the key
				onErrorCallback({stopReason : "UserError"});
			}else if (event.which == 47) {  //"/" is the key
				onErrorCallback({stopReason : "UserStop"});
			}
			else {
				console.log(event.which);
			}
		});

		var t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "10"
		}) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "90"
		}) }, 2000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "160"
		}) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "140"
		}) }, 4000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "70"
		}) }, 5000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "30"
		}) }, 6000);
		timeouts.push(t);
		t = setTimeout(function() { onPressureChangeCallback({
			method: "bpPressureChange",
			pressure: "20"
		}) }, 7000);
		timeouts.push(t);

		t = setTimeout(function() { onResultCallback({
			method: "bpResult",
			systolic: "119",
			diastolic: "79",
			pulse: "72"
		}) }, 8000);
		timeouts.push(t);
	};

	/*
	 Call if you have a software-based stop button. Will result in the error callback in
	 the startBP method being called with isFatal set to false.
	 Last changed: 0.1
	 */
	jkiosk.stopBP = function() {
		console.log("stopBP called");
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
		callbacks["bpMeasurementError"]({method: "bpMeasurementError", isFatal: false});
	};


	jkiosk.isZugBPOnReady = function() {
		var response = {method: "bpStatus", isAvailable: true, ZUGBPAvailable: true};		
		jkiosk.isZugBPOnReadyRes(response);	
	};

	/*
	 DEPRECATED, use jkiosk.isAvailable

	 onStatusCallback will only fire once per call.

	 Last changed: 0.2 [new]
	 */
	jkiosk.getBPStatus = function(onStatusCallback) {
		onStatusCallback({method: "bpStatus", isAvailable: true});
	};

	/************************************
	 Pulse Oximeter
	 ************************************/
	jkiosk.getPulseOximeterHandDetect = function(changeValueCallBack, LiveValueReached, getPulseOximeterFinalResultKiosk, spo2HandsNotDetectedCallBack) {

		var t = setTimeout(function() { changeValueCallBack(JSON.parse('{"method": "getPulseOximeterHandDetect", "handDetectStatus": '+true+', "changeValueStatus": "95"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { LiveValueReached(JSON.parse('{"method": "getPulseOximeterHandDetect", "LiveValueStatus": "96"}')) }, 2000);
		timeouts.push(t);
		t = setTimeout(function() { LiveValueReached(JSON.parse('{"method": "getPulseOximeterHandDetect", "LiveValueStatus": "98"}')) }, 2000);
		timeouts.push(t);

		t = setTimeout(function() { LiveValueReached(JSON.parse('{"method": "getPulseOximeterHandDetect", "LiveValueStatus": "100"}')) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { getPulseOximeterFinalResultKiosk(JSON.parse('{"method": "getPulseOximeterHandDetect", "finalValueStatus": "100"}')) }, 5000);
		timeouts.push(t);
	}

	/************************/
	      //ZUG_ECG
	/************************/
	var data= [2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186];
	//var data= [2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048,2048];

     var data2 =  
     [2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186];	

   var data3 =
[2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186];	

//6leaddata

var data4 =
 [2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186,2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186,2076,2071,2061,2049,2037,2032,2044,2063,2080,2091,2097,2104,2107,2113,2123,2132,2139,2143,2139,2126,2110,2106,2109,2108,2109,2116,2126,2138,2148,2156,2164,2169,2167,2162,2154,2150,2150,2152,2157,2150,2131,2115,2111,2110,2113,2118,2121,2116,2102,2088,2079,2074,2072,2073,2070,2060,2053,2056,2053,2041,2029,2016,2003,1995,1993,1987,1981,1980,1985,1986,1990,1999,2009,2004,1997,1993,1988,1986,1994,2004,2002,1985,1966,1963,1979,2002,2014,2013,2008,2002,2003,2014,2024,2023,2018,2018,2025,2030,2033,2034,2027,2010,1990,1982,1991,2005,2007,2000,1992,1987,1991,2006,2021,2026,2023,2021,2028,2038,2046,2046,2035,2021,2012,2006,2004,2011,2017,2017,2021,2030,2039,2048,2054,2040,2023,2016,2021,2033,2036,2050,2057,2053,2038,2019,2009,2009,2012,2015,2018,2025,2039,2054,2063,2058,2038,2021,2016,2013,2005,1999,1997,2004,2020,2038,2048,2047,2045,2048,2049,2048,2052,2057,2054,2046,2038,2029,2022,2025,2034,2044,2047,2039,2027,2021,2018,2018,2022,2023,2021,2022,2029,2038,2043,2046,2049,2055,2056,2049,2043,2044,2051,2065,2070,2062,2053,2048,2046,2048,2047,2031,2020,2017,2022,2031,2036,2036,2040,2050,2051,2032,2032,2044,2060,2077,2086,2088,2088,2084,2070,2053,2046,2048,2052,2048,2043,2054,2068,2075,2077,2078,2082,2094,2109,2116,2118,2122,2127,2123,2112,2100,2098,2102,2106,2103,2097,2088,2080,2081,2091,2096,2092,2086,2079,2073,2067,2062,2056,2052,2046,2033,2020,2014,2015,2017,2018,2017,2015,2015,2020,2029,2040,2043,2036,2028,2029,2032,2030,2025,2021,2013,2003,1999,2000,2003,1999,1988,1979,1980,1994,2017,2070,2102,2143,2193,2257,2334,2422,2499,2548,2574,2585,2581,2555,2511,2454,2380,2299,2227,2167,2119,2081,2051,2031,2015,2001,1990,1988,1999,2013,2022,2021,2013,2002,1986,1977,1988,2004,2007,1999,1990,1987,1989,1990,1985,1978,1977,1981,1987,1985,1975,1972,1982,1997,2008,2018,2022,2020,2021,2028,2029,2024,2023,2031,2036,2032,2027,2022,2018,2021,2032,2038,2041,2035,2024,2021,2029,2036,2034,2026,2027,2036,2046,2050,2055,2052,2054,2064,2082,2095,2102,2102,2100,2100,2097,2082,2066,2066,2082,2102,2115,2127,2150,2169,2182,2192,2197,2188,2163,2130,2105,2100,2110,2128,2149,2172,2188,2189,2177,2160,2146,2141,2138,2130,2120,2113,2108,2104,2097,2091,2087,2086,2085,2074,2054,2035,2019,2021,2037,2051,2063,2071,2077,2075,2061,2039,2024,2019,2015,2005,1994,1989,1988,1983,1980,1982,1984,1983,1983,1982,1972,1954,1949,1955,1962,1970,1986,2003,2016,2012,1997,1985,1982,1979,1980,1983,1987,2001,2011,2004,1987,1975,1983,2005,2022,2030,2033,2025,2009,1999,2001,2009,2022,2037,2035,2021,2003,1993,1995,2005,2011,2009,1998,1988,1991,2008,2018,2006,1982,1976,1992,2014,2034,2043,2039,2030,2025,2023,2017,2013,2011,2010,2006,2002,2004,2013,2031,2053,2065,2065,2056,2044,2027,2008,1994,1992,2004,2020,2027,2020,2007,2004,2012,2023,2032,2032,2027,2025,2025,2026,2025,2022,2019,2018,2016,2005,1987,1977,1981,1990,1991,1991,1995,2004,2014,2023,2024,2023,2025,2030,2040,2052,2069,2080,2069,2046,2026,2011,2003,2005,2006,2003,2003,2009,2015,2018,2018,2019,2023,2030,2037,2043,2032,2018,1998,1982,1976,1986,2010,2036,2051,2060,2064,2063,2059,2055,2048,2034,2026,2026,2031,2034,2035,2038,2047,2062,2080,2094,2101,2096,2085,2078,2087,2112,2126,2113,2106,2100,2092,2079,2066,2053,2041,2033,2032,2038,2037,2019,1998,1988,1995,2007,2018,2026,2025,2017,2016,2020,2025,2029,2032,2032,2030,2025,2019,2014,2012,2015,2021,2014,1998,1994,2003,2008,2007,2006,2007,2014,2023,2017,1989,1959,1947,1963,2001,2052,2103,2153,2211,2275,2349,2427,2498,2546,2565,2561,2533,2489,2436,2380,2321,2259,2201,2150,2112,2084,2054,2019,1993,1980,1974,1978,1987,1996,2002,2000,1991,1983,1983,1987,1990,1986,1975,1960,1948,1942,1940,1942,1944,1951,1956,1961,1964,1967,1977,1980,1971,1968,1972,1974,1974,1978,1988,2001,2009,2005,1996,1982,1969,1969,1983,1990,1988,1984,1984,1990,2005,2022,2035,2040,2037,2028,2018,2014,2016,2023,2035,2045,2050,2054,2053,2049,2048,2053,2059,2061,2063,2064,2065,2069,2073,2081,2091,2100,2107,2116,2126,2129,2128,2130,2131,2129,2122,2117,2118,2125,2128,2123,2121,2122,2129,2137,2143,2141,2139,2140,2144,2146,2141,2128,2110,2094,2081,2072,2067,2067,2068,2063,2057,2058,2067,2076,2072,2052,2029,2006,1987,1974,1974,1986,1999,2005,2006,2000,1990,1987,1995,2002,1997,1986,1980,1980,1987,1996,2002,2002,1998,1994,1993,1993,1991,1987,1977,1971,1974,1985,1993,1998,2003,2007,2005,1997,1982,1974,1977,1988,1995,1999,1999,1990,1983,1976,1969,1968,1980,2001,2012,2015,2017,2018,2014,2011,2013,2022,2026,2021,2014,2004,1992,2006,2026,2041,2047,2047,2045,2036,2031,2027,2019,2010,2000,1995,1999,2013,2026,2028,2023,2018,2019,2022,2021,2016,2016,2023,2044,2064,2065,2047,2027,2005,1985,1985,2003,2017,2022,2023,2020,2012,2002,1999,2009,2022,2028,2027,2025,2024,2019,2016,2020,2034,2047,2048,2041,2029,2023,2025,2031,2035,2035,2025,2015,2015,2013,2011,2011,2011,2013,2024,2038,2043,2033,2022,2011,2004,2004,2013,2027,2034,2034,2033,2032,2033,2036,2041,2037,2026,2019,2020,2026,2031,2037,2037,2028,2022,2026,2034,2048,2063,2076,2086,2094,2096,2092,2076,2057,2048,2055,2072,2085,2085,2083,2088,2093,2093,2095,2091,2080,2074,2075,2081,2084,2075,2062,2054,2049,2047,2047,2046,2049,2058,2063,2061,2058,2056,2050,2035,2016,2007,2010,2018,2023,2021,2019,2014,2003,1998,2006,2016,2020,2019,2013,2001,1990,1993,2007,2024,2033,2030,2025,2017,2001,1986,1977,1972,1964,1951,1950,1973,2018,2069,2117,2166,2226,2390,2490,2569,2603,2597,2575,2549,2518,2480,2430,2363,2292,2228,2173,2123,2077,2037,2007,1989,1975,1957,1951,1958,1972,1987,2003,2014,2020,2012,1989,1968,1954,1937,1918,1909,1918,1935,1949,1959,1967,1974,1983,1990,1991,1987,1982,1979,1984,2000,2014,2014,2002,1988,1985,1992,2003,2011,2013,2009,2001,1996,2003,2026,2028,2012,1999,1994,1994,1998,1999,1996,1994,1996,2004,2018,2069,2084,2081,2076,2073,2075,2080,2086,2086,2082,2078,2082,2091,2098,2096,2096,2102,2111,2116,2118,2121,2120,2117,2124,2144,2163,2168,2163,2159,2162,2165,2163,2156,2147,2139,2132,2128,2127,2129,2129,2130,2131,2128,2122,2109,2097,2084,2067,2053,2049,2053,2061,2076,2086,2079,2056,2034,2023,2027,2032,2029,2021,2015,2014,2020,2024,2024,2023,2017,2001,1977,1964,1967,1976,1979,1978,1986,2003,2011,2009,2003,2000,2000,1994,1987,1987,1990,1987,1979,1973,1972,1978,1988,1993,1988,1975,1965,1968,1983,1996,2002,1997,1992,1991,1998,2006,2010,2009,2016,2030,2038,2037,2033,2033,2036,2037,2031,2025,2020,2015,2006,1996,1999,2014,2026,2030,2028,2022,2012,2005,2006,2017,2025,2021,2018,2027,2037,2036,2026,2023,2031,2043,2048,2044,2032,2020,2019,2024,2031,2030,2025,2022,2022,2024,2028,2030,2033,2040,2044,2041,2030,2019,2013,2015,2023,2033,2044,2048,2049,2048,2048,2046,2041,2033,2025,2021,2019,2016,2016,2020,2028,2033,2034,2032,2035,2039,2047,2053,2059,2060,2058,2055,2053,2050,2047,2045,2041,2037,2036,2036,2040,2051,2055,2024,2019,2022,2026,2034,2048,2065,2075,2071,2064,2061,2060,2057,2050,2038,2038,2035,2029,2029,2035,2040,2044,2051,2061,2060,2050,2044,2041,2048,2059,2069,2069,2066,2069,2080,2090,2091,2092,2095,2099,2100,2092,2082,2080,2087,2097,2105,2110,2112,2116,2119,2115,2116,2129,2140,2142,2143,2144,2135,2121,2105,2090,2076,2071,2071,2066,2051,2044,2051,2057,2054,2048,2038,2031,2036,2047,2051,2050,2046,2041,2033,2028,2029,2030,2033,2035,2034,2032,2028,2027,2029,2030,2029,2026,2016,2004,1994,1991,1996,2004,2016,2034,2056,2088,2132,2183,2236,2303,2392,2491,2576,2626,2641,2631,2601,2556,2501,2442,2380,2316,2247,2182,2135,2098,2061,2032,2013,2002,2002,2009,2017,2028,2041,2048,2041,2025,2016,2010,1995,1977,1964,1959,1966,1981,1993,1996,1995,1994,2000,2016,2024,2016,1999,1988,1994,2011,2028,2041,2043,2035,2025,2013,2005,2007,2012,2012,2010,2009,2013,2020,2028,2037,2046,2051,2051,2048,2051,2056,2054,2048,2047,2050,2052,2053,2056,2060,2068,2080,2087,2086,2084,2089,2093,2093,2088,2084,2090,2103,2108,2104,2103,2113,2128,2138,2146,2154,2164,2169,2171,2170,2170,2169,2167,2167,2170,2179,2191,2195,2185,2168,2156,2146,2136,2135,2147,2157,2155,2146,2131,2121,2120,2124,2125,2118,2108,2100,2099,2107,2120,2129,2121,2094,2062,2034,2014,2001,1990,1987,1997,2016,2034,2044,2045,2046,2047,2046,2041,2028,2008,1990,1983,1986,1994,2002,2015,2028,2029,2016,1994,1980,1982,1990,1996,2003,2010,2015,2012,2015,2019,2018,2012,2007,1999,1989,1988,1997,2011,2024,2036,2041,2035,2024,2023,2029,2025,2014,2005,2003,2009,2018,2028,2036,2037,2033,2029,2024,2022,2018,2013,2009,2009,2015,2030,2048,2068,2079,2078,2075,2076,2071,2053,2031,2017,2015,2020,2024,2026,2025,2022,2023,2029,2035,2041,2047,2046,2030,2008,1997,1997,2000,2011,2024,2025,2015,2010,2022,2037,2043,2044,2043,2037,2026,2019,2024,2034,2035,2033,2031,2032,2035,2040,2044,2045,2043,2041,2037,2054,2062,2062,2059,2056,2055,2049,2036,2021,2019,2026,2033,2040,2038,2028,2016,2012,2018,2026,2029,2033,2038,2038,2031,2021,2009,2004,2008,2018,2025,2027,2024,2019,2022,2033,2046,2056,2066,2067,2056,2043,2038,2044,2052,2050,2039,2034,2027,2030,2049,2048,2048,2048,2044,2040,2039,2041,2046,2048,2055,2068,2076,2075,2071,2065,2056,2050,2054,2065,2077,2086,2086,2083,2083,2091,2097,2098,2098,2097,2095,2093,2093,2093,2088,2080,2072,2068,2062,2050,2041,2035,2039,2051,2065,2068,2056,2024,1999,1974,1968,1983,2006,2021,2025,2022,2019,2014,2003,1993,1992,1995,1994,1992,1997,2008,2016,2014,2007,2000,1993,1994,1998,1997,1988,1986,2007,2046,2093,2141,2194,2256,2328,2406,2479,2526,2543,2540,2528,2507,2472,2423,2363,2295,2222,2154,2101,2063,2038,2016,1997,1981,1972,1972,1978,1987,1998,2005,2004,1996,1987,1977,1975,1974,1972,1964,1963,1969,1973,1969,1958,1947,1940,1938,1943,1950,1958,1965,1970,1973,1982,1998,2008,2011,2008,2001,1991,1987,1991,1997,1995,1985,1977,1974,1978,1987,1993,1997,2006,2018,2020,2010,2011,2023,2033,2039,2044,2041,2030,2023,2029,2035,2035,2035,2041,2046,2048,2048,2052,2060,2072,2081,2081,2072,2069,2072,2077,2082,2088,2091,2091,2091,2098,2114,2138,2154,2153,2145,2138,2139,2138,2135,2134,2125,2112,2103,2104,2106,2107,2106,2105,2102,2094,2085,2081,2080,2079,2074,2062,2052,2046,2041,2040,2043,2039,2037,2041,2043,2033,2017,2000,1990,1983,1975,1960,1945,1936,1928,1927,1946,1977,2007,2031,2038,2028,2012,2000,1991,1980,1969,1963,1960,1960,1966,1984,2008,2022,2011,1984,1958,1943,1932,1924,1929,1943,1955,1967,1978,1994,2013,2022,2021,2018,2009,1995,1983,1978,1975,1968,1965,1975,1989,1998,1999,1992,1984,1989,2009,2029,2040,2037,2026,2016,2016,2024,2031,2029,2020,2013,2011,2012,2012,2013,2009,2007,2009,2011,2006,1991,1982,1989,2003,2010,2008,2006,2010,2013,2004,1987,1972,1972,1983,1996,2007,2014,2014,2006,2001,2004,2009,2010,2011,2015,2019,2020,2013,2010,2013,2017,2014,2009,2007,2010,2014,2019,2023,2026,2030,2027,2017,2010,2007,2009,2013,2016,2020,2020,2014,2009,2010,2003,1987,1972,1970,1983,2004,2022,2033,2039,2039,2027,2009,1993,1984,1984,1985,1988,2000,2018,2030,2034,2041,2048,2052,2047,2036,2028,2027,2028,2026,2027,2030,2031,2034,2045,2057,2066,2068,2066,2058,2044,2031,2025,2034,2048,2058,2058,2054,2055,2069,2083,2087,2082,2080,2079,2078,2080,2086,2091,2094,2091,2081,2073,2069,2059,2045,2036,2036,2044,2053,2059,2060,2060,2058,2057,2049,2033,2014,2001,1998,2001,2009,2025,2043,2054,2049,2030,2006,1991,1987,1989,1998,2005,2007,2010,2017,2025,2027,2017,1998,1976,1958,1951,1950,1954,1961,1971,1989,2023,2067,2120,2182,2246,2299,2357,2431,2507,2559,2578,2571,2547,2516,2477,2416,2342,2273,2219,2179,2146,2109,2069,2043,2032,2016,1997,1989,1989,1990,1988,1983,1974,1968,1974,1986,1992,1985,1974,1969,1973,1984,1992,1995,1993,1983,1967,1956,1954,1957,1963,1973,1981,1980,1972,1965,1968,1974,1981,1991,2004,2014,2016,2010,2003,2004,2008,2012,2014,2018,2017,2007,2000,2003,2010,2016,2020,2023,2027,2031,2032,2030,2033,2049,2063,2069,2070,2073,2077,2074,2066,2060,2060,2063,2063,2063,2066,2069,2072,2079,2089,2094,2094,2100,2112,2127,2146,2159,2159,2146,2127,2116,2120,2135,2155,2170,2178,2178,2171,2160,2153,2150,2150,2145,2132,2115,2104,2096,2087,2077,2080,2090,2088,2079,2077,2078,2069,2056,2047,2038,2031,2026,2024,2022,2020,2020,2017,2007,2007,2001,1988,1981,1983,1991,2001,2006,2006,2004,2006,2008,2006,1995,1984,1980,1978,1975,1976,1983,1994,2011,2014,2005,1997,1989,1975,1966,1965,1966,1967,1967,1968,1971,1973,1969,1972,1980,1988,1989,1991,2000,2012,2019,2021,2023,2025,2020,2009,1999,1997,1998,2001,2008,2015,2018,2019,2023,2028,2028,2023,2020,2021,2025,2031,2038,2039,2031,2018,2007,2003,2012,2031,2039,2029,2008,1994,1987,1980,1978,1981,1995,2015,2033,2040,2033,2015,1997,1987,1992,2009,2027,2041,2047,2047,2043,2045,2054,2059,2048,2027,2010,2001,2001,2002,2005,2009,2008,2010,2021,2028,2023,2007,1987,1970,1958,1969,2002,2034,2050,2051,2045,2034,2024,2016,2010,2014,2025,2031,2030,2030,2029,2029,2034,2039,2040,2033,2019,2004,1993,1993,2006,2020,2028,2033,2041,2051,2065,2073,2066,2055,2044,2027,2010,2008,2016,2028,2039,2036,2027,2026,2037,2045,2046,2049,2058,2066,2068,2065,2060,2052,2047,2049,2055,2063,2067,2074,2084,2093,2104,2113,2118,2116,2106,2094,2086,2083,2079,2074,2070,2067,2060,2054,2049,2047,2040,2031,2024,2025,2030,2029,2022,2018,2017,2015,2013,2014,2014,2011,2012,2018,2025,2032,2036,2025,1998,1966,1948,1949,1959,1974,1996,2019,2033,2036,2024,1981,1971,1965,1957,1954,1965,1988,2025,2079,2147,2219,2295,2379,2463,2541,2600,2621,2608,2578,2540,2492,2428,2349,2270,2206,2159,2122,2084,2047,2014,1989,1979,1980,1985,1987,1988,1988,1988,1988,1985,1980,1976,1975,1970,1960,1950,1947,1951,1957,1966,1975,1978,1974,1964,1956,1951,1946,1946,1961,1987,2003,1999,1987,1979,1976,1976,1984,2003,2023,2034,2032,2023,2014,2011,2009,2004,2000,2001,2007,2017,2020,2016,2018,2027,2038,2050,2065,2073,2070,2059,2049,2044,2043,2044,2048,2048,2043,2039,2048,2061,2074,2080,2079,2080,2091,2107,2113,2109,2106,2107,2109,2112,2118,2121,2129,2145,2163,2176,2183,2191,2198,2199,2190,2170,2151,2137,2129,2123,2120,2125,2131,2135,2131,2122,2109,2093,2083,2079,2075,2070,2070,2073,2068,2057,2051,2053,2054,2052,2038,2019,2009,2014,2013,1999,1986,1983,1987,1994,2001,2006,2010,2015,2019,2012,1993,1971,1958,1963,1972,1975,1977,1981,1992,2007,2019,2025,2019,2007,1996,1992,1995,2002,2004,2005,2004,1997,1982,1970,1969,1975,1986,2004,2017,2017,2012,2009,2009,2011,2019,2025,2019,2005,1993,1987,1995,2015,2037,2049,2047,2035,2034,2039,2052,2055,2048,2031,2017,2017,2019,2018,2017,2023,2034,2044,2048,2047,2043,2035,2029,2030,2027,2029,2030,2022,2013,2019,2027,2030,2027,2021,2011,1999,1991,1993,1999,2004,2011,2024,2032,2031,2030,2043,2057,2066,2070,2068,2063,2054,2046,2045,2048,2046,2036,2026,2020,2017,2014,2016,2024,2030,2036,2039,2041,2041,2036,2029,2033,2046,2053,2048,2041,2038,2036,2030,2022,2014,2010,2008,2007,2013,2030,2050,2058,2054,2044,2038,2038,2043,2051,2054,2049,2048,2053,2062,2068,2071,2070,2063,2054,2049,2054,2062,2070,2080,2095,2110,2115,2117,2117,2116,2117,2117,2116,2114,2107,2096,2094,2101,2111,2111,2100,2085,2074,2066,2061,2057,2050,2040,2034,2035,2038,2039,2046,2038,2027,2021,2020,2024,2029,2033,2034,2032,2027,2024,2027,2028,2024,2019,2012,2007,2009,2013,2017,2024,2033,2035,2027,2014,2002,1993,1991,1998,2004,2011,2028,2055,2093,2144,2206,2277,2351,2427,2490,2529,2553,2569,2567,2537,2484,2419,2348,2270,2195,2137,2097,2069,2049,2036,2020,2005,1996,2001,2015,2023,2018,2007,1996,1988,1985,1983,1983,1983,1982,1990,2006,2022,2030,2025,2012,1999,1971,1961,1966,1978,1980,1979,1980,1982,1984,1988,1995,2001,2003,2009,2019,2032,2039,2037,2032,2023,2011,2005,2007,2012,2016,2025,2040,2050,2054,2058,2060,2057,2048,2044,2044,2048,2049,2047,2045,2048,2057,2071,2084,2090,2088,2083,2080,2081,2088,2102,2118,2124,2118,2106,2095,2094,2099,2100,2106,2121,2137,2146,2147,2137,2125,2123,2132,2146,2158,2168,2176,2174,2158,2145,2133,2119,2110,2111,2121,2132,2128,2112,2097,2084,2071,2065,2071,2077,2074,2064,2051,2043,2037,2030,2024,2023,2023,2025,2023,2014,2002,1995,1998,2002,2002,2004,2006,2004,1990,1969,1946,1933,1939,1951,1966,1983,1999,2006,2012,2018,2020,2019,2014,2006,1993,1978,1970,1966,1960,1951,1946,1956,1977,1996,2000,1992,1983,1980,1989,2000,2003,2000,2000,1998,1994,1998,2002,2000,1990,1983,1982,1981,1980,1988,2004,2018,2025,2031,2035,2035,2036,2031,2012,1999,2004,2020,2033,2037,2032,2029,2032,2035,2038,2039,2036,2030,2023,2017,2010,2000,1993,2000,2015,2017,2008,1995,1983,1977,1984,2001,2017,2024,2025,2024,2021,2022,2026,2023,2013,2010,2022,2035,2035,2023,2011,2006,2010,2010,2007,2000,1993,1990,2016,2022,2019,2022,2029,2030,2018,2000,1987,1987,1998,2014,2024,2027,2031,2041,2049,2051,2049,2050,2050,2053,2054,2055,2051,2048,2046,2051,2065,2080,2082,2080,2083,2088,2087,2083,2079,2078,2079,2075,2068,2063,2063,2064,2062,2057,2050,2040,2027,2012,1997,1987,1977,1966,1962,1972,1995,2021,2036,2031,2021,2017,2017,2014,2011,2006,2003,2001,1990,1976,1971,1977,1983,1990,2000,2011,2018,2019,2012,2002,1993,1983,1977,1968,1957,1949,1948,1963,1995,2032,2065,2111,2176,2259,2347,2431,2497,2537,2549,2540,2517,2486,2447,2398,2338,2264,2183,2114,2069,2045,2028,2016,2004,1992,1984,1984,1990,1997,2002,2001,1991,1982,1971,1960,1950,1943,1938,1934,1937,1951,1967,1977,1974,1967,1958,1956,1956,1958,1958,1962,1966,1968,1972,1975,1974,1973,1974,1972,1968,1967,1966,1969,1975,1982,1993,2007,2015,2013,2011,2013,2014,2017,2022,2024,2021,2013,2006,2003,2006,2016,2020,2020,2024,2029,2031,2035,2051,2051,2043,2048,2057,2068,2080,2093,2101,2102,2099,2099,2098,2096,2103,2118,2129,2131,2125,2114,2109,2112,2120,2126,2127,2124,2122,2123,2125,2119,2108,2100,2095,2095,2101,2109,2109,2104,2100,2099,2096,2089,2073,2055,2041,2026,2011,1996,1983,1978,1988,2008,2024,2038,2045,2040,2029,2018,2014,2009,2005,2013,2009,1988,1969,1957,1952,1955,1959,1961,1960,1957,1948,1940,1946,1960,1971,1977,1980,1983,1986,1988,1989,1991,1997,1999,1995,1992,1991,1989,1984,1981,1983,1994,2005,2006,2005,2002,1996,1992,1994,2000,2007,2011,2011,2008,2007,2004,1999,1989,1985,1988,1993,2003,2014,2022,2023,2015,2010,2009,2010,2015,2019,2020,2020,2023,2027,2024,2016,2016,2022,2026,2020,2012,2009,2007,2002,2000,2002,2005,2009,2007,1998,1993,2001,2015,2028,2035,2041,2036,2033,2030,2024,2023,2021,2016,2014,2020,2024,2021,2016,2015,2023,2036,2047,2048,2043,2043,2047,2047,2045,2044,2038,2026,2012,2003,2004,2011,2026,2039,2049,2059,2066,2063,2054,2048,2049,2052,2057,2065,2081,2095,2108,2117,2114,2096,2078,2072,2076,2080,2080,2077,2072,2067,2071,2080,2087,2089,2081,2064,2045,2033,2026,2024,2029,2034,2028,2012,1995,1988,1984,1982,1987,1996,2001,2005,2008,2008,2004,2000,1998,2000,2001,2000,2001,2003,2011,2028,2045,2051,2047,2029,2003,1982,1966,1953,1947,1955,1985,2025,2063,2107,2161,2225,2299,2386,2478,2556,2606,2621,2608,2576,2527,2463,2392,2319,2252,2195,2145,2100,2059,2027,2005,1994,1987,1980,1976,1980,1992,2006,2013,2010,1995,1982,1982,1986,1985,1981,1980,1976,1965,1955,1959,1968,1975,1981,1978,1972,1970,1971,1971,1972,1979,1987,1998,2002,1996,1981,1970,1970,1973,1978,1989,1999,1999,2001,2009,2016,2013,2007,2002,2004,2010,2017,2024,2034,2033,2025,2032,2047,2058,2068,2068,2053,2039,2036,2046,2064,2084,2096,2097,2096,2096,2098,2107,2119,2120,2113,2104,2101,2112,2129,2135,2127,2118,2116,2125,2142,2156,2158,2148,2135,2125,2123,2127,2133,2141,2145,2143,2134,2116,2089,2065,2060,2070,2081,2082,2078,2078,2079,2081,2079,2072,2070,2072,2067,2054,2033,2030,2025,2021,2013,1997,1982,1975,1983,2001,2015,2020,2022,2023,2018,2016,2009,1996,1985,1988,1999,2008,2015,2021,2027,2032,2030,2013,1990,1972,1959,1956,1961,1968,1975,1985,1992,1993,1991,1989,1989,1993,1996,1995,1990,1990,2002,2020,2028,2024,2022,2031,2041,2045,2046,2047,2046,2047,2046,2038,2031,2028,2024,2023,2025,2030,2036,2048,2057,2046,2022,2014,2024,2040,2044,2036,2027,2022,2022,2022,2021,2015,2009,2008,2011,2011,2007,2003,2003,2013,2030,2040,2033,2028,2028,2030,2033,2040,2052,2061,2068,2066,2056,2046,2044,2048,2046,2041,2044,2048,2046,2035,2026,2020,2016,2015,2021,2027,2023,2014,2005,1999,1996,1996,1998,2007,2016,2023,2030,2034,2035,2035,2038,2034,2029,2025,2022,2027,2039,2051,2062,2066,2063,2063,2071,2083,2089,2082,2071,2059,2050,2048,2049,2059,2080,2099,2106,2108,2115,2128,2133,2130,2125,2119,2110,2100,2085,2076,2066,2059,2063,2068,2070,2070,2067,2055,2039,2031,2029,2026,2022,2018,2015,2015,2016,2015,2015,2019,2020,2017,2021,2034,2044,2028,2011,2001,1999,2002,2012,2021,2017,2008,2006,2012,2024,2040,2046,2036,2012,1982,1961,1958,1974,2007,2053,2108,2163,2218,2274,2337,2418,2503,2565,2587,2582,2566,2543,2508,2458,2398,2332,2263,2192,2127,2080,2050,2031,2014,1998,1981,1976,1984,1988,1988,1999,2017,2027,2029,2025,2013,1999,1989,1980,1967,1945,1926,1922,1933,1951,1971,1985,1995,2002,2001,1994,1983,1976,1976,1984,1997,2008,2012,2006,1996,1995,1997,1994,1988,1989,1998,2009,2010,2007,2011,2020,2027,2034,2039,2037,2025,2011,2012,2030,2052,2065,2075,2082,2083,2075,2063,2052,2043,2032,2022,2020,2033,2061,2087,2102,2111,2116,2117,2116,2111,2106,2107,2119,2134,2142,2145,2146,2147,2146,2146,2142,2133,2125,2124,2123,2116,2108,2102,2112,2133,2150,2154,2151,2149,2150,2153,2150,2140,2130,2126,2122,2114,2098,2074,2050,2043,2046,2048,2044,2032,2017,2000,1992,1995,2006,2018,2022,2021,2018,2010,2003,2001,2005,2011,2014,2010,2003,2003,2007,2014,2019,2012,1998,1985,1974,1975,1988,2006,2022,2026,2019,2012,2005,1998,1989,1983,1982,1980,1977,1975,1977,1986,2000,2011,2017,2020,2020,2017,2014,2012,2013,2020,2028,2030,2024,2021,2030,2043,2048,2043,2037,2034,2040,2049,2057,2054,2021,2006,1999,1999,2007,2020,2029,2028,2019,2014,2018,2026,2035,2045,2036,2029,2024,2025,2032,2035,2028,2018,2008,2004,2011,2021,2026,2024,2029,2033,2029,2018,2014,2020,2024,2024,2029,2038,2040,2041,2043,2043,2045,2046,2044,2038,2036,2035,2033,2025,2010,1995,1989,1995,2011,2027,2035,2035,2032,2040,2060,2079,2083,2071,2051,2032,2014,2004,2005,2011,2021,2028,2029,2026,2028,2032,2037,2047,2059,2064,2055,2039,2029,2032,2039,2046,2053,2054,2051,2048,2043,2038,2048,2055,2063,2060,2047,2034,2027,2024,2023,2030,2038,2044,2047,2050,2057,2066,2082,2094,2099,2098,2091,2082,2072,2064,2062,2067,2075,2084,2086,2077,2074,2089,2111,2130,2139,2138,2130,2119,2108,2098,2089,2083,2079,2068,2060,2063,2069,2070,2066,2059,2061,2070,2076,2074,2062,2046,2032,2031,2038,2036,2019,2002,2001,2011,2017,2014,2007,2007,2009,2012,2020,2031,2038,2040,2037,2031,2034,2044,2048,2040,2022,1997,1973,1956,1955,1974,2010,2060,2120,2180,2236,2299,2375,2456,2526,2569,2585,2583,2562,2527,2479,2418,2349,2276,2206,2142,2092,2061,2030,2017,2004,1998,2004,2017,2023,2017,2005,1996,1993,1995,1998,1996,1993,1988,1982,1972,1967,1970,1976,1982,1986,1986,1986,1985,1982,1978,1978,1987,1997,2000,1997,1993,1991,1997,2003,2002,2004,2007,2012,2021,2027,2026,2023,2019,2016,2016,2017,2018,2020,2026,2034,2037,2032,2029,2035,2041,2048,2056,2068,2074,2075,2074,2068,2068,2074,2084,2097,2099,2089,2083,2079,2073,2071,2074,2077,2082,2092,2103,2113,2117,2118,2122,2128,2131,2132,2137,2145,2149,2149,2149,2147,2142,2140,2142,2138,2132,2132,2134,2138,2145,2154,2156,2144,2127,2112,2100,2082,2064,2060,2066,2067,2059,2051,2048,2046,2037,2021,2006,2002,2009,2022,2030,2023,2001,1982,1980,1989,1993,1986,1980,1986,2002,2008,2000,1988,1974,1967,1968,1967,1960,1961,1971,1988,2003,2012,2017,2015,2006,2003,2005,2008,2005,1998,1993,1992,1986,1979,1972,1969,1975,1983,1986,1989,1997,2009,2013,2017,2020,2024,2023,2020,2024,2035,2047,2050,2045,2037,2027,2016,2001,1987,1981,1991,2004,2018,2033,2038,2025,2015,2024,2040,2039,2022,2002,1988,1987,1995,2004,2006,1999,1996,2007,2022,2027,2022,2017,2019,2021,2018,2016,2021,2031,2038,2039,2038,2034,2028,2022,2019,2019,2020,2016,2012,2009,2007,2010,2016,2019,2019,2016,2011,2004,2001,2004,2007,2007,2012,2023,2030,2026,2017,2010,2012,2016,2019,2023,2020,2011,1995,1982,1985,1999,2013,2018,2013,2003,1998,2001,2014,2029,2038,2040,2048,2055,2061,2064,2066,2065,2062,2049,2030,2012,2006,2006,2013,2026,2027,2027,2026,2028,2036,2046,2053,2056,2056,2057,2059,2055,2048,2048,2054,2064,2075,2082,2085,2084,2074,2067,2072,2083,2085,2077,2063,2052,2050,2055,2067,2080,2092,2098,2096,2085,2074,2066,2055,2034,2007,1985,1973,1977,1993,2007,2013,2012,2013,2020,2027,2027,2018,2005,1989,1977,1972,1981,1996,2005,2006,2000,1991,1986,1980,1974,1967,1956,1944,1942,1948,1955,1960,1973,2005,2055,2116,2179,2252,2338,2432,2516,2569,2589,2582,2561,2528,2479,2420,2358,2293,2226,2167,2114,2069,2044,2033,2027,2015,2002,2000,2011,2021,2024,2016,1994,1963,1939,1930,1928,1928,1930,1933,1942,1957,1973,1985,1984,1971,1959,1954,1956,1962,1969,1979,1988,1991,1988,1985,1986,1984,1974,1962,1951,1952,1967,1983,1994,1996,1998,2007,2012,2011,2008,2015,2030,2041,2045,2045,2043,2044,2038,2027,2025,2032,2034,2031,2032,2032,2026,2023,2025,2031,2047,2068,2085,2086,2076,2065,2061,2062,2067,2075,2090,2109,2122,2127,2119,2105,2093,2087,2084,2080,2085,2097,2108,2124,2148,2167,2177,2180,2170,2149,2121,2096,2088,2097,2113,2118,2117,2116,2114,2107,2096,2084,2069,2055,2048,2050,2052,2054,2053,2051,2047,2037,2028,2020,2013,2004,1992,1982,1978,1981,1981,1980,1983,1985,1980,1977,1976,1978,1974,1966,1966,1969,1972,1977,1989,2002,2006,2003,1998,1998,2000,1996,1985,1972,1967,1973,1985,1997,2008,2017,2018,2004,1993,1982,1977,1982,1995,2007,2012,2009,2005,2003,1998,1992,1989,1990,1994,1995,1990,1987,1993,2009,2025,2041,2048,2043,2028,2015,2015,2028,2047,2063,2070,2063,2050,2041,2032,2022,2017,2014,2010,2003,1994,1983,1974,1979,2002,2024,2036,2038,2034,2030,2027,2017,1998,1983,1978,1981,1989,2007,2032,2046,2045,2038,2033,2025,2012,1997,1982,1977,1984,2003,2033,2063,2084,2085,2072,2057,2049,2040,2021,2005,2002,2008,2016,2024,2036,2048,2056,2058,2049,2029,2007,1996,1991,1984,1985,1997,2014,2022,2017,2009,2007,2020,2047,2071,2080,2070,2054,2043,2036,2024,2016,2025,2050,2050,2051,2053,2059,2061,2065,2065,2052,2027,2007,1998,1998,2005,2020,2034,2040,2037,2031,2028,2031,2039,2044,2046,2048,2051,2062,2076,2084,2085,2080,2082,2096,2114,2125,2123,2114,2107,2101,2100,2103,2107,2111,2111,2104,2081,2056,2052,2062,2072,2069,2055,2039,2028,2028,2030,2032,2034,2029,2017,2011,2016,2020,2018,2014,2019,2029,2027,2018,2016,2020,2015,2005,2004,2013,2025,2032,2033,2024,2006,1991,1982,1974,1964,1952,1943,1940,1951,1983,2026,2071,2121,2172,2225,2287,2361,2445,2525,2584,2611,2607,2584,2545,2495,2440,2375,2301,2224,2160,2113,2084,2062,2041,2020,2009,2005,1996,1983,1979,1986,1997,2008,2022,2025,2009,1985,1964,1953,1955,1961,1967,1970,1975,1985,1992,1992,1991,1982,1971,1965,1971,1983,1992,1997,1998,1993,1989,1992,1998,2003,2008,2013,2014,2002,1989,1985,1990,2003,2016,2013,2001,1997,2000,2008,2017,2030,2047,2063,2073,2072,2069,2066,2063,2063,2065,2069,2068,2059,2049,2046,2048,2058,2076,2092,2095,2092,2092,2094,2096,2099,2111,2126,2131,2122,2112,2109,2111,2116,2122,2130,2145,2170,2190,2194,2181,2165,2154,2152,2156,2162,2162,2150,2131,2114,2111,2117,2115,2098,2077,2062,2056,2057,2067,2078,2086,2088,2082,2073,2061,2047,2030,2010,2000,1998,2000,2008,2017,2016,2003,1988,1984,1990,2003,2014,2013,1998,1986,1985,1990,1990,1991,1995,1996,1998,2001,2008,2014,2018,2019,2007,1986,1971,1971,1973,1971,1972,1979,1989,2002,2015,2020,2011,1999,1993,1994,2006,2026,2048,2056,2053,2048,2028,2015,2006,2001,2001,2004,2005,2001,1998,2000,2000,1998,2002,2009,2014,2017,2022,2033,2041,2048,2058,2066,2064,2055,2046,2035,2016,1994,1981,1985,2006,2024,2028,2025,2026,2030,2036,2040,2041,2041,2046,2049,2050,2049,2029,2014,2003,1999,1995,1993,2010,2039,2055,2052,2031,2020,2015,2014,2011,2007,2006,2005,2006,2009,2013,2019,2022,2020,2011,2008,2016,2035,2056,2074,2076,2067,2060,2058,2055,2049,2041,2032,2024,2018,2012,2009,2009,2011,2019,2028,2027,2024,2027,2036,2045,2051,2048,2031,2014,2015,2024,2038,2052,2065,2074,2063,2044,2025,2011,2005,2001,2004,2017,2035,2051,2056,2051,2046,2043,2040,2038,2031,2014,2000,2005,2030,2060,2081,2083,2068,2053,2047,2047,2051,2061,2072,2082,2084,2071,2054,2050,2055,2064,2076,2089,2099,2104,2107,2104,2100,2099,2096,2088,2087,2096,2106,2115,2123,2123,2121,2114,2106,2100,2096,2097,2101,2100,2093,2081,2063,2048,2040,2038,2039,2033,2019,2008,2009,2015,2022,2026,2024,2019,2021,2027,2030,2029,2025,2015,2000,1990,1993,2008,2029,2037,2032,2026,2024,2026,2027,2024,2013,2001,1996,2008,2035,2079,2139,2206,2280,2365,2454,2536,2592,2618,2616,2588,2546,2501,2455,2405,2345,2277,2210,2155,2122,2100,2073,2038,2002,1973,1956,1954,1961,1966,1975,1991,2006,2015,2011,1998,1988,1979,1970,1967,1975,1987,1997,2004,2009,2009,2001,1982,1965,1957,1954,1955,1961,1976,1995,2011,2019,2020,2016,2014,2016,2016,2015,2010,2002,2004,2017,2029,2027,2013,2001,2004,2022,2046,2064,2074,2072,2063,2060,2062,2057,2044,2034,2025,2024,2029,2039,2053,2068,2076,2083,2092,2103,2118,2133,2139,2134,2126,2125,2128,2129,2127,2134,2147,2149,2134,2116,2107,2111,2122,2132,2137,2136,2133,2132,2139,2152,2161,2171,2177,2174,2168,2166,2160,2148,2132,2121,2123,2129,2126,2114,2099,2086,2078,2075,2065,2055,2057,2064,2066,2063,2054,2046,2038,2033,2023,2008,1995,1989,1993,2001,2003,2002,2005,2013,2009,1995,1988,1993,1996,1994,1993,1994,1997,2007,2026,2040,2043,2041,2031,2005,1983,1969,1960,1966,1979,1987,1985,1985,1993,2004,2015,2026,2029,2026,2023,2024,2024,2019,2016,2022,2032,2036,2031,2024,2020,2016,2010,2005,2005,2013,2027,2040,2045,2038,2032,2028,2028,2035,2044,2050,2050,2047,2035,2019,2008,2013,2030,2041,2035,2021,2010,2009,2017,2030,2047,2060,2067,2063,2045,2027,2020,2029,2039,2044,2041,2040,2044,2048,2050,2048,2048,2055,2056,2043,2022,2005,1999,2000,2005,2010,2012,2017,2021,2025,2025,2017,2015,2025,2034,2039,2041,2040,2037,2027,2018,2019,2027,2036,2039,2036,2030,2025,2028,2043,2060,2061,2045,2023,2015,2020,2023,2025,2034,2044,2048,2047,2043,2039,2033,2030,2040,2057,2070,2069,2067,2067,2067,2070,2068,2056,2048,2048,2052,2059,2058,2048,2038,2041,2058,2073,2076,2066,2052,2048,2056,2062,2071,2092,2120,2140,2150,2146,2133,2116,2099,2086,2078,2074,2065,2056,2055,2060,2067,2069,2064,2062,2062,2059,2051,2046,2043,2041,2035,2029,2026,2027,2028,2026,2018,2008,2003,2003,2008,2020,2039,2057,2065,2063,2059,2049,2034,2025,2023,2024,2019,2011,2001,1993,1990,1992,1989,1981,1973,1977,1996,2028,2069,2128,2206,2299,2394,2476,2535,2564,2567,2553,2526,2427,2358,2288,2224,2173,2139,2115,2090,2063,2040,2024,2013,2005,2004,2009,2012,2004,1988,1975,1979,1995,2005,1999,1987,1985,1987,1985,1987,2000,2015,2020,2011,2002,2000,2001,1995,1986,1985,1990,1996,2003,2007,2005,2001,2001,2009,2024,2037,2041,2036,2023,2007,1995,1999,2021,2048,2065,2065,2048,2025,2008,2004,2010,2022,2026,2024,2032,2044,2051,2063,2076,2084,2083,2079,2078,2076,2073,2070,2070,2075,2084,2095,2096,2091,2092,2103,2120,2132,2133,2132,2138,2144,2144,2141,2141,2137,2131,2129,2131,2131,2127,2123,2124,2129,2135,2139,2136,2127,2121,2120,2125,2139,2150,2148,2133,2112,2093,2080,2071,2062,2051,2039,2027,2020,2020,2023,2026,2029,2024,2009,1992,1982,1984,1992,1994,1988,1983,1986,1994,2003,2010,2013,2007,1994,1977,1964,1959,1963,1969,1975,1981,1991,1998,1997,1992,1985,1978,1972,1969,1971,1978,1985,1990,1992,1991,1980,1961,1940,1932,1944,1958,1963,1968,1981,1997,2007,2008,2005,2006,2014,2018,2008,1990,1976,1974,1980,1992,2008,2022,2031,2029,2025,2021,2018,2015,2012,2011,2014,2012,2002,1995,1998,2008,2014,2015,2011,2010,2012,2017,2016,2006,1992,1987,1991,2005,2019,2027,2025,2016,2010,2012,2017,2020,2019,2013,2008,2002,2003,2010,2018,2023,2024,2019,2015,2013,2010,2007,2003,1997,1992,1995,2007,2027,2030,2027,2018,2011,2009,2011,2015,2013,2001,1994,1999,2014,2026,2035,2039,2038,2035,2034,2026,2022,2029,2038,2040,2041,2045,2048,2053,2064,2074,2074,2070,2070,2074,2077,2079,2080,2076,2068,2061,2061,2064,2072,2081,2086,2085,2082,2072,2060,2049,2047,2050,2060,2058,2041,2023,2012,2008,2015,2024,2025,2019,2010,2003,2002,2002,2001,1998,1991,1986,1986,1986,1993,2004,2014,2014,2002,1988,1989,1997,1998,1990,1978,1969,1966,1969,1974,1980,1986,1983,1969,1967,1988,2022,2065,2122,2194,2277,2367,2453,2523,2573,2599,2602,2584,2547,2490,2421,2345,2263,2177,2099,2049,2029,2021,2005,1981,1964,1959,1964,1978,1994,2002,2005,2005,2001,1993,1986,1984,1977,1970,1967,1958,1940,1930,1938,1952,1959,1963,1965,1963,1959,1958,1962,1966,1965,1969,1972,1977,1978,1979,1986,1996,1997,1991,1980,1971,1971,1985,2002,2008,2005,2000,1998,2004,2014,2018,2014,2010,2010,2013,2011,2003,2000,2005,2020,2036,2039,2040,2049,2067,2083,2095,2100,2096,2088,2081,2074,2067,2063,2060,2057,2055,2064,2082,2098,2111,2120,2127,2137,2143,2141,2132,2121,2115,2118,2123,2131,2143,2157,2162,2155,2143,2132,2121,2107,2097,2088,2078,2074,2077,2078,2072,2064,2064,2069,2070,2064,2058,2052,2037,2021,2019,2025,2026,2016,1998,1985,1985,1990,1994,1998,2000,1998,1989,1980,1973,1972,1978,1987,1997,2001,1996,1984,1952,1946,1953,1967,1981,1987,1985,1985,1986,1987,1995,2009,2020,2020,2008,1990,1981,1998,2026,2037,2031,2014,1992,1970,1955,1957,1975,1993,2004,2013,2020,2022,2021,2021,2025,2030,2031,2024,2017,2013,2010,2006,2008,2014,2016,2013,2017,2032,2047,2043,2023,2013,2032,2054,2054,2039,2018,2005,2004,2016,2036,2051,2053,2041,2030,2030,2029,2026,2022,2022,2017,2007,1997,1993,2001,2016,2029,2037,2038,2026,2014,2014,2023,2034,2041,2037,2030,2024,2017,2005,1990,1986,1994,2003,2009,2020,2030,2034,2036,2043,2052,2063,2073,2079,2071,2054,2048,2048,2048,2048,2049,2053,2057,2060,2063,2067,2071,2075,2082,2089,2095,2096,2094,2093,2096,2099,2097,2086,2074,2066,2059,2056,2060,2065,2065,2063,2063,2064,2064,2064,2060,2045,2027,2014,2005,1994,1982,1975,1973,1972,1976,1990,2010,2028,2034,2031,2023,2019,2019,2023,2024,2019,2014,2012,2003,1992,1985,1984,1985,1986,1985,1981,1973,1963,1963,1972,1995,2028,2069,2115,2167,2235,2318,2404,2484,2543,2577,2590,2587,2566,2527,2470,2403,2327,2247,2177,2131,2105,2088,2076,2060,2040,2017,2001,2001,2008,2012,2007,1996,1985,1974,1958,1945,1943,1940,1936,1932,1934,1941,1948,1957,1969,1982,1994,2000,1997,1987,1975,1967,1966,1969,1974,1976,1977,1977,1972,1963,1956,1964,1977,1984,1994,2029,2039,2038,2034,2033,2030,2027,2027,2031,2029,2022,2010,1999,1993,1997,2009,2025,2039,2047,2049,2051,2056,2071,2094,2109,2112,2105,2093,2084,2082,2085,2090,2092,2086,2075,2074,2090,2113,2128,2135,2134,2130,2128,2132,2136,2137,2135,2128,2119,2116,2123,2136,2141,2137,2132,2119,2103,2094,2095,2098,2103,2108,2112,2111,2105,2096,2085,2078,2068,2057,2047,2033,2017,2006,2006,2009,2015,2022,2025,2016,2010,2009,2008,2006,2003,2002,2000,1996,1991,1991,1993,1998,1997,1990,1979,1968,1959,1955,1962,1973,1985,1990,1987,1979,1974,1975,1978,1978,1979,1985,1990,1994,2000,2004,2005,2000,1989,1984,1993,2006,2015,2020,2020,2011,2003,2007,2016,2016,2008,1999,2001,2008,2012,2015,2018,2023,2036,2047,2051,2056,2052,2041,2031,2025,2023,2021,2011,1996,1984,1977,1975,1981,1996,2015,2039,2050,2048,2043,2049,2055,2051,2037,2034,2031,2031,2032,2026,2014,2006,2011,2016,2013,2013,2020,2027,2026,2023,2023,2025,2027,2032,2037,2040,2040,2039,2041,2039,2034,2033,2028,2017,2008,2010,2024,2039,2035,2029,2028,2030,2032,2033,2034,2034,2041,2044,2035,2022,2022,2033,2040,2040,2043,2048,2055,2066,2075,2077,2075,2073,2074,2079,2087,2089,2086,2087,2095,2098,2094,2087,2089,2095,2099,2099,2092,2082,2079,2085,2095,2098,2090,2072,2051,2037,2034,2027,2017,2002,1990,2004,2009,2007,2003,1996,1989,1991,2003,2011,2014,2017,2021,2021,2023,2030,2038,2041,2033,2021,2011,2003,1998,1997,1994,1987,1976,1973,1980,1986,1998,2028,2072,2123,2181,2245,2312,2388,2468,2534,2574,2585,2582,2570,2539,2487,2420,2348,2274,2210,2160,2129,2105,2078,2048,2024,2008,2000,1992,1988,1990,1997,2004,2009,2013,2013,2000,1976,1958,1954,1959,1958,1956,1963,1974,1982,1989,1995,1994,1988,1982,1975,1966,1961,1958,1962,1974,1992,2011,2018,2014,2017,2031,2038,2037,2035,2030,2023,2018,2015,2017,2020,2015,2007,2008,2016,2025,2034,2041,2034,2021,2021,2033,2048,2048,2050,2062,2077,2090,2096,2096,2092,2084,2072,2064,2068,2083,2098,2110,2115,2113,2108,2112,2129,2152,2166,2170,2168,2164,2160,2154,2147,2139,2137,2141,2147,2156,2166,2165,2155,2149,2152,2156,2147,2131,2122,2124,2133,2134,2124,2107,2091,2074,2057,2048,2033,2027,2036,2049,2055,2051,2047,2047,2046,2041,2036,2032,2027,2025,2025,2024,2016,2008,2007,2006,1998,1991,1992,2003,2014,2020,2024,2023,2018,2011,2004,1999,1996,1991,1987,1987,1991,1995,2002,2009,2014,2016,2011,2007,2017,2035,2043,2029,2005,1987,1984,1986,1981,1973,1977,1994,2014,2024,2025,2026,2030,2033,2035,2034,2031,2027,2022,2020,2029,2041,2049,2056,2060,2056,2048,2045,2038,2031,2031,2039,2034,2028,2032,2041,2048,2053,2053,2050,2041,2027,2011,2003,1999,1997,2000,2004,2012,2026,2034,2035,2036,2039,2046,2050,2053,2053,2049,2044,2035,2024,2017,2017,2028,2044,2050,2033,2032,2036,2051,2060,2069,2071,2057,2035,2018,2007,2008,2017,2028,2038,2043,2043,2044,2044,2044,2045,2048,2031,2023,2012,1999,1992,1998,2009,2025,2041,2055,2064,2066,2059,2048,2047,2061,2076,2073,2063,2062,2068,2068,2060,2057,2059,2065,2068,2068,2075,2087,2089,2081,2078,2082,2089,2090,2089,2089,2090,2089,2093,2098,2108,2124,2134,2130,2112,2086,2066,2057,2054,2051,2049,2046,2049,2059,2071,2076,2081,2083,2073,2053,2031,2009,1998,1996,1996,1994,1986,1973,1963,1967,1985,2006,2025,2040,2046,2047,2048,2048,2040,2027,2019,2021,2027,2026,2019,2011,2001,1983,1970,1982,2003,2017,2033,2061,2107,2176,2257,2341,2421,2495,2552,2581,2582,2558,2518,2471,2422,2365,2231,2167,2103,2049,2013,1993,1983,1981,1985,1997,2010,2018,2017,2014,2013,2019,2023,2020,2006,1989,1979,1975,1979,1994,2013,2024,2022,2010,1998,1990,1982,1971,1965,1967,1970,1978,1986,1993,1997,2001,2007,2015,2020,2022,2021,2017,2013,2014,2021,2028,2033,2036,2030,2016,2007,2009,2015,2016,2014,2009,2007,2020,2041,2048,2049,2048,2045,2045,2051,2059,2069,2078,2084,2089,2088,2084,2083,2091,2098,2105,2107,2116,2133,2144,2147,2146,2141,2128,2109,2093,2082,2078,2089,2108,2125,2137,2143,2143,2140,2135,2134,2134,2131,2120,2103,2093,2088,2087,2095,2104,2107,2103,2098,2094,2089,2084,2074,2066,2061,2054,2048,2041,2038,2035,2030,2022,2013,2008,2001,1996,1994,1990,1983,1982,1984,1986,1989,1996,2001,1995,1983,1971,1959,1948,1942,1947,1963,1980,1989,1989,1989,1986,1985,1984,1976,1965,1963,1972,1986,2000,2010,2019,2030,2038,2036,2023,2009,1997,1986,1983,1988,1997,1999,1995,1991,1988,1987,1986,1985,1984,1985,1984,1983,1990,2009,2026,2030,2027,2022,2017,2016,2012,2008,2007,2012,2022,2035,2040,2036,2023,2009,2003,2002,2004,2010,2022,2035,2043,2048,2049,2044,2028,2014,2014,2023,2032,2028,2014,2000,1995,1999,2003,2006,2008,2006,1998,1993,1996,2007,2017,2018,2015,2014,2011,2005,2006,2015,2027,2033,2029,2018,2008,2002,2005,2008,2008,2002,1990,1982,1994,2024,2047,2049,2037,2022,2019,2026,2032,2030,2024,2019,2016,2020,2025,2024,2016,2010,2018,2029,2032,2025,2023,2029,2029,2015,1998,1993,2000,2010,2022,2035,2045,2044,2034,2022,2018,2020,2017,2011,2007,2007,2017,2033,2048,2054,2048,2036,2030,2026,2020,2016,2021,2035,2051,2065,2075,2082,2086,2082,2075,2081,2103,2126,2134,2124,2103,2084,2071,2068,2069,2069,2066,2058,2048,2043,2045,2050,2049,2041,2032,2035,2038,2034,2025,2015,2008,2006,2006,2002,2000,2008,2019,2014,1997,1983,1980,1989,2005,2018,2029,2034,2035,2029,2015,2001,1996,2002,2012,2019,2016,2008,2003,2000,1997,1992,1982,1974,1974,1979,1995,2026,2072,2130,2200,2280,2362,2440,2505,2548,2561,2549,2525,2493,2446,2387,2321,2248,2176,2118,2079,2057,2047,2034,2022,2006,1993,1990,1999,2006,2001,1989,1982,1978,1974,1969,1969,1972,1977,1974,1960,1945,1947,1960,1967,1970,1976,1983,1985,1980,1978,1982,1990,1995,1995,1988,1982,1976,1973,1976,1975,1974,1970,1965,1963,1972,1990,2000,1997,1984,1975,1983,2001,2009,2009,2017,2034,2048,2050,2043,2032,2023,2022,2028,2032,2033,2031,2031,2035,2037,2039,2048,2067,2086,2098,2100,2096,2089,2085,2086,2089,2090,2093,2095,2092,2093,2103,2117,2130,2136,2136,2141,2151,2159,2164,2169,2171,2158,2134,2117,2111,2116,2128,2134,2131,2121,2114,2111,2115,2118,2092,2070,2052,2041,2034,2039,2048,2057,2060,2059,2053,2039,2022,2012,2009,2004,1991,1982,1980,1985,1992,2004,2016,2018,2013,2005,1996,1993,2004,2020,2022,2008,1987,1975,1975,1983,1993,2001,2001,1994,1982,1971,1961,1965,1985,2004,2005,1995,1992,1997,2003,2005,2001,1998,1995,1994,1991,1991,1994,1998,1995,1984,1981,1992,2010,2024,2033,2036,2040,2041,2036,2025,2017,2016,2018,2016,2008,2010,2021,2031,2038,2041,2036,2028,2029,2032,2029,2019,2013,2017,2028,2038,2046,2053,2053,2040,2026,2018,2021,2029,2025,2016,2008,2000,1994,1993,1996,2000,2007,2022,2036,2043,2041,2038,2034,2028,2018,2009,2006,2005,2005,2007,2016,2029,2040,2047,2048,2048,2047,2041,2039,2045,2044,2040,2038,2037,2031,2022,2017,2015,2016,2024,2029,2029,2025,2020,2013,2012,2022,2035,2036,2030,2021,2012,2009,2018,2033,2048,2052,2049,2046,2044,2036,2020,2008,2004,2005,2010,2019,2029,2033,2037,2043,2046,2045,2050,2057,2061,2066,2070,2068,2055,2044,2037,2035,2034,2031,2024,2024,2033,2041,2035,2025,2026,2031,2035,2036,2037,2041,2047,2047,2044,2045,2051,2057,2057,2041,2035,2034,2036,2035,2036,2034,2027,2018,2017,2026,2028,2017,2005,2007,2014,2028,2048,2063,2069,2073,2076,2077,2077,2079,2082,2080,2078,2084,2091,2089,2082,2079,2081,2078,2070,2066,2067,2071,2077,2080,2088,2098,2105,2111,2113,2103,2089,2079,2078,2081,2084,2085,2087,2093,2099,2093,2080,2071,2065,2060,2051,2037,2025,2019,2017,2019,2027,2040,2044,2040,2039,2040,2039,2040,2044,2038,2028,2027,2030,2022,2006,1999,2006,2013,2017,2015,2009,2008,2011,2006,1991,1972,1960,1956,1972,2005,2048,2083,2115,2151,2203,2284,2380,2469,2539,2583,2596,2584,2562,2528,2481,2427,2369,2308,2244,2184,2134,2095,2062,2039,2022,2013,2011,2012,2007,1996,1984,1972,1966,1977,1999,2015,2017,2004,1987,1975,1976,1983,1986,1977,1961,1944,1924,1911,1914,1937,1973,2000,2011,2011,2008,2006,2005,2002,1997,1997,1998,1997,1993,1995,2004,2017,2026,2025,2018,2014,2016,2015,2010,2010,2015,2025,2037,2046,2048,2038,2026,2022,2031,2044,2047,2046,2054,2072,2088,2085,2077,2079,2083,2080,2073,2067,2067,2074,2080,2087,2094,2103,2113,2116,2113,2117,2126,2134,2139,2143,2143,2141,2145,2152,2159,2152,2141,2136,2134,2134,2132,2132,2130,2123,2115,2107,2100,2095,2099,2109,2115,2116,2118,2117,2106,2092,2086,2080,2066,2048,2034,2032,2036,2035,2029,2028,2027,2021,2011,2006,2002,1997,1989,1978,1971,1971,1977,1983,1988,1991,1987,1974,1968,1976,1986,1990,1991,1994,1998,1998,2003,2011,2012,2004,1996,1991,1993,1992,1984,1977,1978,1983,1988,1998,2013,2024,2027,2025,2030,2038,2040,2035,2022,2008,2000,1993,1983,1975,1980,1999,2022,2035,2036,2039,2043,2038,2027,2017,2013,2017,2018,2016,2020,2033,2047,2056,2055,2039,2023,2010,2006,2010,2017,2026,2035,2044,2049,2053,2050,2040,2028,2018,2010,2006,2009,2017,2029,2040,2046,2046,2046,2048,2048,2045,2037,2033,2032,2035,2035,2030,2024,2031,2041,2041,2038,2040,2047,2051,2045,2040,2039,2035,2026,2020,2022,2023,2013,2004,2003,2008,2016,2032,2048,2060,2069,2068,2063,2063,2068,2065,2048,2028,2020,2030,2041,2046,2049,2051,2049,2047,2048,2049,2047,2039,2034,2024,2014,2017,2031,2041,2048,2057,2064,2057,2050,2043,2037,2033,2032,2033,2036,2043,2049,2055,2057,2053,2034,2034,2041,2055,2070,2070,2057,2044,2036,2038,2046,2050,2049,2043,2034,2027,2032,2045,2056,2061,2064,2064,2061,2061,2064,2064,2057,2048,2044,2044,2043,2041,2041,2041,2040,2038,2048,2054,2059,2060,2060,2060,2059,2056,2054,2051,2052,2059,2060,2056,2051,2053,2059,2066,2067,2057,2044,2032,2030,2045,2066,2081,2081,2070,2060,2060,2065,2070,2072,2068,2061,2058,2072,2085,2089,2086,2081,2082,2099,2118,2124,2126,2131,2135,2136,2131,2117,2102,2094,2091,2093,2101,2102,2092,2085,2091,2102,2105,2100,2089,2078,2071,2066,2057,2032,2033,2034,2031,2036,2045,2041,2023,2005,2007,2024,2048,2041,2028,2021,2020,2021,2023,2024,2019,2010,2002,1995,1994,1996,1998,1996,1993,2001,2038,2098,2169,2236,2304,2379,2461,2534,2583,2608,2616,2609,2580,2526,2452,2369,2286,2215,2155,2113,2088,2069,2048,2021,1997,1988,1995,1999,1994,1999,2011,2014,2010,2008,2007,2001,1990,1983,1982,1984,1988,1993,2001,2015,2025,2023,2011,2001,1991,1977,1967,1975,1992,2008,2019,2024,2022,2018,2014,2010,2005,2001,1998,2001,2008,2021,2032,2034,2028,2023,2024,2030,2034,2036,2034,2033,2037,2040,2046,2058,2070,2075,2077,2075,2073,2078,2088,2093,2086,2069,2057,2058,2070,2091,2112,2123,2123,2118,2108,2102,2100,2096,2092,2095,2109,2126,2143,2156,2165,2176,2183,2175,2160,2155,2154,2144,2133,2131,2140,2154,2163,2159,2145,2128,2114,2103,2099,2103,2110,2113,2110,2108,2111,2111,2104,2095,2086,2077,2069,2060,2052,2045,2033,2022,2015,2003,1986,1975,1973,1986,2010,2029,2033,2024,2016,2014,1993,1981,1974,1974,1972,1968,1964,1965,1969,1977,1990,2003,2012,2008,1993,1978,1974,1982,1996,2007,2000,1987,1978,1978,1979,1980,1984,1996,2017,2035,2038,2029,2016,2011,2009,2006,2000,2000,2004,2004,2014,2032,2039,2033,2029,2033,2034,2026,2012,2004,2010,2013,2004,1996,1996,2006,2020,2031,2041,2044,2041,2038,2038,2036,2032,2023,2011,2008,2017,2028,2037,2044,2041,2030,2022,2025,2032,2033,2027,2020,2014,2015,2026,2039,2048,2047,2036,2024,2014,2007,2000,1997,2005,2022,2036,2028,2004,1984,1983,1997,2011,2018,2024,2027,2027,2028,2038,2050,2052,2047,2039,2030,2013,2000,2000,2004,2010,2020,2027,2026,2024,2027,2031,2032,2037,2043,2048,2048,2037,2020,2012,2012,2017,2024,2027,2025,2023,2021,2018,2015,2010,1998,1983,1980,1994,2015,2038,2062,2085,2097,2087,2061,2036,2018,2009,2003,1998,1999,2005,2012,2017,2025,2039,2046,2044,2036,2032,2031,2030,2027,2026,2032,2053,2063,2065,2050,2032,2023,2024,2030,2029,2015,1999,1997,2008,2024,2035,2038,2038,2046,2059,2068,2071,2070,2069,2066,2062,2066,2073,2072,2062,2050,2039,2030,2026,2027,2034,2046,2059,2068,2079,2089,2101,2118,2131,2132,2121,2101,2082,2063,2048,2039,2037,2050,2070,2086,2090,2080,2064,2052,2049,2052,2049,2039,2024,2010,2005,2010,2019,2030,2037,2050,2039,2024,2017,2013,2026,2008,2003,2015,2021,2019,2013,2010,2011,2012,2012,2007,2000,1996,1995,1992,1994,2005,2022,2034,2038,2036,2033,2027,2019,2012,2008,2014,2026,2038,2045,2041,2027,2008,1995,1996,2008,2018,2019,2014,2009,2010,2017,2025,2029,2030,2025,2023,2032,2040,2039,2034,2027,2025,2030,2035,2034,2028,2020,2013,2011,2012,2012,2016,2019,2019,2020,2024,2039,2055,2057,2050,2039,2029,2032,2039,2036,2026,2016,2014,2024,2040,2055,2065,2072,2069,2060,2053,2053,2053,2056,2059,2056,2057,2062,2063,2058,2053,2052,2056,2071,2099,2127,2139,2131,2119,2106,2093,2086,2086,2086,2085,2083,2079,2076,2074,2071,2070,2069,2065,2067,2073,2069,2050,2028,2011,2003,2000,2000,1998,1999,2001,2002,2004,2008,2009,2008,2005,2003,2001,2003,2009,2013,2018,2024,2026,2022,2014,2009,2004,1995,1985,1982,1992,2009,2027,2051,2087,2132,2182,2234,2293,2363,2444,2520,2574,2594,2582,2552,2514,2468,2414,2350,2279,2207,2146,2105,2085,2070,2049,2025,2006,1988,1974,1969,1968,1969,1974,1981,1986,1989,1989,1984,1978,1981,1987,1985,1979,1975,1975,1976,1982,1985,1981,1977,1977,1978,1978,1983,1991,1997,1994,1988,1985,1993,2005,2014,2020,2020,2016,2011,2009,2016,2022,2024,2019,2011,2003,2003,2009,2016,2020,2022,2024,2024,2018,2015,2026,2032,2034,2057,2082,2101,2100,2090,2085,2087,2095,2103,2109,2115,2118,2110,2103,2107,2113,2121,2127,2127,2121,2118,2125,2137,2148,2157,2168,2170,2157,2142,2137,2138,2138,2131,2125,2130,2143,2151,2148,2139,2132,2129,2125,2120,2112,2107,2107,2106,2100,2091,2086,2088,2091,2085,2072,2057,2050,2046,2040,2024,2000,1980,1976,1989,2012,2030,2031,2022,2022,2029,2028,2020,2010,1996,1983,1970,1966,1970,1972,1973,1978,1979,1972,1958,1945,1940,1948,1970,1991,2001,2000,1998,2001,2007,2010,2009,2007,2008,2011,2006,1997,1992,1991,1990,1991,1994,2002,2014,2021,2023,2023,2019,2017,2016,2017,2018,2017,2015,2019,2030,2043,2051,2055,2051,2039,2027,2022,2020,2013,1999,1985,1983,1995,2017,2040,2051,2046,2030,2013,2007,2012,2021,2024,2028,2059,2061,2047,2026,2014,2015,2019,2021,2021,2019,2019,2024,2030,2032,2030,2031,2032,2036,2044,2044,2034,2023,2021,2028,2041,2054,2058,2047,2032,2021,2013,2004,1999,2001,2005,2005,2001,2006,2018,2028,2033,2039,2047,2054,2063,2068,2064,2055,2040,2024,2013,2012,2019,2029,2040,2044,2041,2040,2048,2049,2046,2043,2040,2036,2031,2021,2007,2001,2008,2021,2032,2038,2047,2058,2067,2060,2045,2034,2030,2031,2035,2039,2041,2040,2036,2038,2049,2065,2071,2069,2071,2077,2077,2068,2053,2048,2053,2063,2070,2077,2090,2104,2113,2120,2129,2127,2120,2111,2103,2100,2097,2089,2076,2061,2053,2056,2066,2069,2064,2053,2039,2030,2037,2055,2068,2066,2056,2052,2055,2054,2047,2032,2015,2000,1992,1992,1996,1997,1995,1998,2003,2006,2008,2013,2021,2028,2030,2028,2023,2016,2009,2002,1995,1995,2000,2001,2006,2017,2033,2057,2100,2164,2239,2318,2397,2476,2541,2575,2576,2520,2480,2434,2386,2331,2276,2223,2171,2125,2094,2077,2068,2060,2037,2005,1980,1966,1965,1978,1994,2007,2017,2017,2005,1988,1973,1959,1945,1931,1921,1919,1926,1939,1953,1964,1974,1984,1999,2017,2022,2014,2002,1990,1979,1974,1980,1981,1976,1974,1981,1990,1998,2002,2006,2015,2028,2040,2041,2045,2059,2078,2081,2066,2045,2021,1998,1985,1986,1998,2016,2038,2054,2059,2052,2040,2038,2048,2060,2072,2081,2087,2094,2103,2111,2108,2094,2075,2070,2078,2089,2096,2106,2118,2128,2130,2128,2133,2148,2167,2178,2180,2179,2178,2170,2160,2162,2178,2186];
//var data7 = ["True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True","True"];
var data7 = ["False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False","False"];
	
	
	jkiosk.callZugECGHandDetetectFunction = function(callbackOfHandDetection,zugLiveDataCallBack,LeadMode,leadToRead,zugValidationResultsCallback,ZugECGBPMResultsCallBack,ZugECGReadAbortCompleteCallbackFunction, ZugECGBadReadAbortCompleteCallbackFunction,performTimerAbortResponseCallBack,amplitudeLevelResponseCallBack,sixLeadLiveDataCallBack){


	var t = setTimeout(function() { callbackOfHandDetection(JSON.parse('{"method": "zugHandDetectResponse", "handDetectStatus": '+true+', "changeValueStatus": "95"}')) 

    if(LeadMode==3){
        if(leadToRead==1){
         var c= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);
    
	    var hundred_data = new Array();
	    var hundred_amplitudeValue = new Array();
	    var k=0;
		var j = 0;
		var dataReadComplete=false;
		var sent_data_controller=0;
		var s= setInterval(function(){

				for (var i = (100*sent_data_controller)+1; i < data.length; i++) 
				{
					k=i;
					hundred_data[j]= data[i];
					hundred_amplitudeValue[j]= data7[i];
					if (i%100==0)
					{
					   sent_data_controller++;
						j=0;

			            var	send_data = hundred_data.join();
			            var	amplitude_data = hundred_amplitudeValue.join();

				
					    zugLiveDataCallBack(JSON.parse('{"method": "ZugLiveDataResponse", "Value": "'+send_data.toString()+'"}')) 
					    amplitudeLevelResponseCallBack(JSON.parse('{"method": "amplitudeLevelResponse", "Value": "'+amplitude_data.toString()+'"}'))
					    //send 100 data.

					     
					    hundred_data = [];
					    break;
					}
				   
					j++;

				}
				if(k>=data.length-20){
					if(dataReadComplete==false){
						dataReadComplete=true;

                 /*ZugECGReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGReadAbortCompleteResponse", "Value": '+true+'}'))*/

                // ZugECGBadReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGBadReadAbortCompleteResponse", "Value": '+true+'}'))

                // ZugECGemergencyStopCallbackFunction(JSON.parse('{"method": "ecgSTOPStatusCallback", "value": '+true+'}'))

                 /*performTimerAbortResponseCallBack(JSON.parse('{"method": "performTimerAbortResponse", "Value": '+true+'}'))*/

                 clearInterval(s);

                 }

				}

        
				
		 }, 200);	
	   }

	   if(leadToRead==2){
		/*var a= setInterval(function() {
		 zugValidationResultsCallback(JSON.parse('{"method": "ZugValidationResultsResponse", "Value": "22"}'))
		  }, 1000);

         var b= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);*/

         var c= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);

     
	    var hundred_data = new Array();
	    var hundred_amplitudeValue = new Array();
	    var k=0;
		var j = 0;
		var dataReadComplete=false;
		var sent_data_controller=0;
		var s= setInterval(function(){

				for (var i = (100*sent_data_controller)+1; i < data2.length; i++) 
				{
					k=i;
					hundred_data[j]= data2[i];
					hundred_amplitudeValue[j]= data7[i];
					if (i%100==0)
					{
					   sent_data_controller++;
						j=0;

			            var	send_data = hundred_data.join();
						var	amplitude_data = hundred_amplitudeValue.join();

						zugLiveDataCallBack(JSON.parse('{"method": "ZugLiveDataResponse", "Value": "'+send_data.toString()+'"}')) 
					    amplitudeLevelResponseCallBack(JSON.parse('{"method": "amplitudeLevelResponse", "Value": "'+amplitude_data.toString()+'"}'))

					    //send 100 data.

					     
					    hundred_data = [];
					    break;
					}
				   
					j++;

				}
				if(k>=data2.length-20){
					if(dataReadComplete==false){
						dataReadComplete=true;

                 /*ZugECGReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGReadAbortCompleteResponse", "Value": '+true+'}'))*/

                // ZugECGBadReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGBadReadAbortCompleteResponse", "Value": '+true+'}'))

                 //ZugECGemergencyStopCallbackFunction(JSON.parse('{"method": "ecgSTOPStatusCallback", "value": '+true+'}'))

                 /*performTimerAbortResponseCallBack(JSON.parse('{"method": "performTimerAbortResponse", "Value": '+true+'}'))*/

                 clearInterval(s);

                 }

				}

        
				
		 }, 200);	
	   }

	   if(leadToRead==3){
		/*var a= setInterval(function() {
		 zugValidationResultsCallback(JSON.parse('{"method": "ZugValidationResultsResponse", "Value": "22"}'))
		  }, 1000);

         var b= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);*/

         var c= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);

	    var hundred_data = new Array();
	    var hundred_amplitudeValue = new Array();
	    var k=0;
		var j = 0;
		var dataReadComplete=false;
		var sent_data_controller=0;
		var s= setInterval(function(){

				for (var i = (100*sent_data_controller)+1; i < data3.length; i++) 
				{
					k=i;
					hundred_data[j]= data3[i];
					hundred_amplitudeValue[j]= data7[i];
					if (i%100==0)
					{
					   sent_data_controller++;
						j=0;

			            var	send_data = hundred_data.join();
						var	amplitude_data = hundred_amplitudeValue.join();
					    zugLiveDataCallBack(JSON.parse('{"method": "ZugLiveDataResponse", "Value": "'+send_data.toString()+'"}')) 
					    amplitudeLevelResponseCallBack(JSON.parse('{"method": "amplitudeLevelResponse", "Value": "'+amplitude_data.toString()+'"}'))					    
					    //send 100 data.

					     
					    hundred_data = [];
					    break;
					}
				   
					j++;

				}
				if(k>=data3.length-20){
					if(dataReadComplete==false){
						dataReadComplete=true;

                 /*ZugECGReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGReadAbortCompleteResponse", "Value": '+true+'}'))*/

                 //ZugECGBadReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGBadReadAbortCompleteResponse", "Value": '+true+'}'))

                 //ZugECGemergencyStopCallbackFunction(JSON.parse('{"method": "ecgSTOPStatusCallback", "value": '+true+'}'))

                 /*performTimerAbortResponseCallBack(JSON.parse('{"method": "performTimerAbortResponse", "Value": '+true+'}'))*/

                 clearInterval(s);

                 }

				}

        
				
		 }, 200);	
	   }
	 }

else if(LeadMode==6){
 
 
	var t = setTimeout(function() {
		/*var a= setInterval(function() {
		 zugValidationResultsCallback(JSON.parse('{"method": "ZugValidationResultsResponse", "Value": "22"}'))
		  }, 1000);

         var b= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);*/

         var c= setInterval(function() {
		 ZugECGBPMResultsCallBack(JSON.parse('{"method": "ZugECGBPMResponse", "Value": 70}'))
		  }, 1000);

   
	    var hundred_data = new Array();
	    var hundred_amplitudeValue = new Array();
	    var k=0;
		var j = 0;
		var dataReadComplete=false;
		var sent_data_controller=0;
		var s= setInterval(function(){

				for (var i = (100*sent_data_controller)+1; i < data4.length; i++) 
				{
					k=i;
					hundred_data[j]= data4[i];
										hundred_amplitudeValue[j]= data7[i];


					if (i%100==0)
					{
					   sent_data_controller++;
						j=0;

			            var	send_data = hundred_data.join();
										var	amplitude_data = hundred_amplitudeValue.join();

        var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":1}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":2}')) 
					   					    amplitudeLevelResponseCallBack(JSON.parse('{"method": "amplitudeLevelResponse", "Value": "'+amplitude_data.toString()+'"}'))					    

					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":3}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":4}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":5}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":6}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":8}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

	    var timeo = setTimeout(function () {
	                        sixLeadLiveDataCallBack(JSON.parse('{"method": "zugEcgSixLeadLiveData", "data": "'+send_data.toString()+'","lead":9}')) 
					    //send 100 data.
        }, 10);
	    timeouts.push(timeo);

					   
					     
					    hundred_data = [];
					    break;
					}
				   
					j++;

				}
				if(k>=data4.length-20){
					if(dataReadComplete==false){
						dataReadComplete=true;

                 //ZugECGReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGReadAbortCompleteResponse", "Value": '+true+'}'))

                 /*ZugECGBadReadAbortCompleteCallbackFunction(JSON.parse('{"method": "ZugECGBadReadAbortCompleteResponse", "Value": '+true+'}'))*/

                 /*ZugECGemergencyStopCallbackFunction(JSON.parse('{"method": "ecgSTOPStatusCallback", "value": '+true+'}'))*/

                 /*performTimerAbortResponseCallBack(JSON.parse('{"method": "performTimerAbortResponse", "Value": '+true+'}'))*/

                 clearInterval(s);

                 }

				}

       
				
		 }, 100);
		 }, 0);
		timeouts.push(t);	
	   

}
		  }, 0);

};
	
		
	jkiosk.callZugECGemergencyStopFunction =function(ZugECGemergencyStopCallbackFunction){

	var t = setTimeout(function() { ZugECGemergencyStopCallbackFunction(JSON.parse('{"method": "ecgSTOPStatusCallback", "value": '+true+'}')) }, 1000);
		timeouts.push(t);
	};
	jkiosk.callZugSpo2emergencyStopFunction =function(ZugSpo2emergencyStopCallbackFunction){

	var t = setTimeout(function() { ZugSpo2emergencyStopCallbackFunction(JSON.parse('{"method": "Spo2STOPStatusCallback", "value": '+true+'}')) }, 1000);
		timeouts.push(t);
	};

	jkiosk.stopBodyComposition =function(stopBodyCompCallbackFunction){

	var t = setTimeout(function() { stopBodyCompCallbackFunction(JSON.parse('{"method": "stopBodyComp", "stopBodyCompValue": '+true+'}')) }, 1000);
		timeouts.push(t);
	};

	     
	/*
	 Device is normally configured to stop automatically when it gets a result.
	 Last changed: 0.1
	 */
	/*jkiosk.stopPulseOximeter = function() {
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}*/

	/*
	 onStatusCallback is only fired once per call.

	 Last changed: 0.2 [name change, status sent once instead of continuous, return fields changed]
	 */
/*	jkiosk.getPulseOximeterStatus = function(onStatusCallback) {
		onStatusCallback({method: "pulseOximeterStatus", isAvailable: true});
	}
*/
	/************************************
	 Body Temperature
	 ************************************/
	/*
	 onResultCallback fires multiple times per call to start.

	 Last changed: 0.1
	 */
	 
	/*
	 Device is normally configured to stop automatically when it gets a result.
	 Last changed: 0.1
	 */
	jkiosk.stopTermometer = function() {
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}

	
	jkiosk.getSkinTemperatureStatus = function(onSkinTemperatureCallback, onRoomTemperatureCallback, onChangeTemperatureCallback) {

		var t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "33.05344"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.045643"}')) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.045643"}')) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "37.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onRoomTemperatureCallback(JSON.parse('{"method": "termometerRoom", "temperatureRoomValueStatus": "25.434"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "termometerResult", "temperatureSkinValueStatus": "34.0", "temperatureRoomValueStatus":"25.434"}')) }, 5000);
		timeouts.push(t);
	}

	jkiosk.getForeheadSkinTemperatureStatus = function(onSkinTemperatureCallback, foreheadTemperatureStop) {
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32"}')) }, 1000);
		timeouts.push(t);
		var t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "tempSkinValueDetect", "temperatureRoomValueStatus": "27.4611111", "temperatureSkinValueStatus" : "32", "faceCaptureForTemp": '+true+'}')) }, 1000);
		timeouts.push(t);

		t = setTimeout(function() { foreheadTemperatureStop(JSON.parse('{"method": "tempSkinValueStop", "temperatureRoomValueStatus": '+true+'}')) }, 2000);
		timeouts.push(t);
	}
	
	jkiosk.getSkinTemperatureProgress = function(onSkinTemperatureCallback, onRoomTemperatureCallback, onChangeTemperatureCallback) {

		var t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "33.05344"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.045643"}')) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.045643"}')) }, 3000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "37.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "35.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onChangeTemperatureCallback(JSON.parse('{"method": "termometerChange", "temperatureChangingValueStatus": "36.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onRoomTemperatureCallback(JSON.parse('{"method": "termometerRoom", "temperatureRoomValueStatus": "30.04356678"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onSkinTemperatureCallback(JSON.parse('{"method": "termometerResult", "temperatureSkinValueStatus": "34.0", "temperatureRoomValueStatus":"25.434"}')) }, 5000);
		timeouts.push(t);
	}

	/*
	 onStatusCallback is only fired once per call.

	 Last changed: 0.2 [name change, status sent once instead of continuous, return fields changed]
	 */
	jkiosk.getTermometerStatus = function(onStatusCallback) {
		onStatusCallback({method: "termometerStatus", isAvailable: true});
	}


	/************************************
	 Weight Scale
	 ************************************/
	/*
	 Weight change callback occurs continuous once started, result callback once the
	 user has sat still long enough to get a reading.

	 If there is no weight on the scale, you will receive 0's on the weightChangeCallback
	 and never get called on the onResultCallback. Clients are advised to set a timeout
	 that can cancel the weight operation (call stopWeightScale).

	 onWeightChangeCallback will fire multiple times per start call. onResultCallback will
	 only fire once.

	 Last changed: 0.1
	 */
	jkiosk.startWeightScale = function(onWeightChangeCallback, onResultCallback) {
		var t = setTimeout(function() { onWeightChangeCallback(JSON.parse('{"method": "weightScaleChange", "weight": "152", "unit": "lbs"}')) }, 1000);
		timeouts.push(t);
		t = setTimeout(function() { onWeightChangeCallback(JSON.parse('{"method": "weightScaleChange", "weight": "149", "unit": "lbs"}')) }, 2000);
		timeouts.push(t);
		t = setTimeout(function() { onResultCallback(JSON.parse('{"method": "weightScaleResult", "weight": "218", "unit": "lbs"}')) }, 3000);
		timeouts.push(t);
	};

	/*
	 Device is normally configured to stop automatically when it gets a result.
	 Last changed: 0.1
	 */
	jkiosk.stopWeightScale = function() {
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}

	/*
	 onStatusCallback will only fire once per call.

	 Last changed: 0.2 [name change, status sent once instead of continuous, return fields changed]
	 */
	jkiosk.getWeightScaleStatus = function(onStatusCallback) {
		onStatusCallback({method: "weightScaleStatus", isAvailable: true});
	}

	/*
	 The callback will be invoked when the weight scale indicates a user
	 has sat down.

	 onHasWeightCallback can be fired multiple times.

	 Last changed: 0.5 [new]
	 */
	jkiosk.onHasWeight = function(onHasWeightCallback) {
		console.log("onHasWeight called");
		$( "body" ).keypress(function( event ) {

			if (event.which == 33) {
				console.log(event.which + "was pressed. simulating sit.");
				event.preventDefault();
				var t = setTimeout(function() { onHasWeightCallback({
					method: "startButtonPressed"
				}) }, 2000);
			}else {
				console.log(event.which);
			}
		});
		//var t = setTimeout(function() { onHasWeightCallback() }, 3000);
		//timeouts.push(t);
	};

	/*
	 The callback will be invoked when the weight scale indicates a user
	 has stood up.

	 onNoWeightCallback can be fired multiple times.

	 Last changed: 0.5 [new]
	 */
	jkiosk.onNoWeight = function(onNoWeightCallback) {
		console.log("onNoWeight called");
		$( "body" ).keypress(function( event ) {

			if (event.which == 45) {
				console.log(event.which + "was pressed. simulating stand.");
				event.preventDefault();
				var t = setTimeout(function() { onNoWeightCallback({
					method: "startButtonPressed"
				}) }, 2000);
			}else {
				console.log(event.which);
			}
		});
		//var t = setTimeout(function() { onNoWeightCallback() }, 7000);
		//timeouts.push(t);
	};

	/*
	 Queries once for whether or not there is weight on the scale.

	 getHasWeightCallback is only fired ONCE per call to this method. It will
	 contian the attribute: hasWeight (boolean).

	 Last changed: 0.7 [new]
	 */
	jkiosk.checkWeight = function(checkWeightCallback) {
		checkWeightCallback({hasWeight: true});
	};

	/*
	 Queries once for whether or not the user has their feet on the bar.
	 This is a best guess, not definitive

	 Last changed: 1.7 [new]
	 */
	jkiosk.feetOnBar = function(callback) {
		callback({feetOnBar: false});
	};

	/************************************
	 Seat Door
	 ************************************/
	/*
	 Queries for the seat door position. You will only get one reply. See
	 onSeatDoorChanged to get ongoing events.

	 Callback will be passed object containing:
	 isOpen: true|false

	 onSeatDoorResult will only fire once per call.

	 Last changed: 0.6 [new]
	 */
	jkiosk.getSeatDoorPosition = function(onSeatDoorResult) {
		onSeatDoorResult({isOpen: false});
	}

	/*
	 Register handlers to get ongoing feedback of door changes.

	 onSeatDoorOpened and onSeatDoorClosed can fire multiple times.

	 Last changed: 0.6 [new]
	 */
	jkiosk.onSeatDoorChanged = function(onSeatDoorOpened, onSeatDoorClosed) {
		console.log("onSeatDoorChanged called");

		//var t = setTimeout(function() { onSeatDoorOpened() }, 3000);
		//timeouts.push(t);

		//var t = setTimeout(function() { onSeatDoorClosed() }, 6000);
		//timeouts.push(t);		
	};

	/*
	 Register handler to be notified of when the seat door button is pressed. Handler
	 will fire for each button press without calling this method again.

	 Last changed: 0.9 [new]
	 */
	jkiosk.onSeatDoorButtonPressed = function(onSeatDoorButtonPressed) {
		console.log("onSeatDoorButtonPressed called");
	};

	/************************************
	 RFID
	 ************************************/
	/*
	 Starts the RFID reader. If the RFID reader is a keyboard emulator, the screen on which
	 you run the RFID reader must not have any text box input fields (unless you want to see
	 the tag ID on the screen, unlikely).

	 Callback will be passed object containing:
	 tagId: the ID of the RFID tag

	 onRFIDResult will only fire once per call.

	 Last changed: 0.9 [new]
	 */
	jkiosk.startRFID = function(onRFIDResult) {
		console.log("startRFID called");

		var t = setTimeout(function() { onRFIDResult({tagId: "123456"}); }, 1000);
		timeouts.push(t);
	}

	/*
	 The RFID reader will stop itself once a tag is read. But if a user navigates away
	 from the page before reading and you want to not get the tag read event if the
	 user attempts it later, call stop.

	 Last changed: 0.9 [new]
	 */
	jkiosk.stopRFID = function() {
		console.log("stopRFID called");
		$.each(timeouts, function(i, v) {
			clearTimeout(v);
		});
	}

	/************************************
	 Extensions
	 ************************************/
	/*
	 Calls extensions developed in C#. On the C# side, this results in the triggering of event MessageFromApp.

	 Last changed: 0.9 [new]
	 */
	jkiosk.callExtension = function(methodName,payload) {
		console.log("extension method called: " + methodName);
	};

	/*
	 If your C# extension will be sending data to your App, register with this method. From C#, you would write
	 a call like the following to trigger the Javascript callback to fire:
	 platform.SendToApp("methodName", payload);

	 Last changed: 0.9 [new]
	 */
	jkiosk.onExtensionMessage = function(methodName, callback) {
		console.log("onExtensionMessage called with method name: " + methodName);
		setTimeout(callback({mock:"reply"}), 1000);
	};

	/************************************
	 Generic Statistics
	 ************************************/
	/*
	 For a pass/fail statistic (like a network attempt working/not working). The key identifies the statistic.

	 PerSession methods will only record stats once in a given session.

	 Last changed: 1.2 [new]
	 */
	var sessionStats = { };
	jkiosk.statisticPassPerSession = function(key, continuation) {
		if (!sessionStats[key]) {
			sessionStats[key] = 'pass';
			jkiosk.statisticPass(key, continuation);
		}
		else if (continuation) {
			continuation();
		}
	};
	jkiosk.statisticFailPerSession = function(key, continuation) {
		if (!sessionStats[key]) {
			sessionStats[key] = 'fail';
			jkiosk.statisticFail(key, continuation);
		}
		else if (continuation) {
			continuation();
		}
	};
	jkiosk.statisticPass = function(key, continuation) {
		console.log("statisticPass method called: " + key);
		if (continuation) {
			continuation();
		}
	};
	jkiosk.statisticFail = function(key, continuation) {
		console.log("statisticFail method called: " + key);
		if (continuation) {
			continuation();
		}
	};
	
	/************************************
		Bluetooth
	************************************/	
	/*
		Call this once to be notified of any subsequent Bluetooth connection requests. Callback will get:
			ageYears: users age in years (whole number). If empty, the user was too old or two young for the data
					  to pass over Bluetooth and not be considered PHI. UI will need to prompt the user for their age.
			heightMeters: decimal number
			isMale: true|false
	
		Last changed: 1.10 [new]
	*/	
	jkiosk.watchForBluetooth = function(connectionRequestCallback) {
		console.log("watchForBluetooth method called");
	};
	
	/*
		Call this after the connectionRequestCallback fires to allow the Bluetooth connection.
		Last changed: 1.10 [new]
	*/
	jkiosk.allowBluetoothConnection = function() {
		console.log("allowBluetoothConnection method called");
	};
	
	/*
		Call this after the connectionRequestCallback fires to reject the Bluetooth connection.
		For example, if the UI is already in a session with another user or the user rejected a pop-up
		request to connect.
		Last changed: 1.10 [new]
	*/
	jkiosk.rejectBluetoothConnection = function() {
		console.log("rejectBluetoothConnection method called");
	};


	//mvm mockfunctionality
    jkiosk.getMvmStockList = function(getMvmStockList, ihl_machineid) {
		
   var product = '[{"id":0,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-31","rotatorNumber":1,"stockLevel":80,"productCost":50,"medicineId":"0000001"}, {"id":1,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-05-29","rotatorNumber":2,"stockLevel":89,"productCost":5,"medicineId":"0000002"},{"id":2,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-22","rotatorNumber":3,"stockLevel":0,"productCost":5,"medicineId":"0000003"},{"id":3,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-18","rotatorNumber":4,"stockLevel":93,"productCost":5,"medicineId":"0000004"},{"id":4,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-31","rotatorNumber":5,"stockLevel":0,"productCost":5,"medicineId":"0000005"},{"id":8,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-25","rotatorNumber":9,"stockLevel":199,"productCost":5,"medicineId":"0000009"},{"id":9,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-08-22","rotatorNumber":10,"stockLevel":19,"productCost":5,"medicineId":"0000010"},{"id":10,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-08-22","rotatorNumber":11,"stockLevel":198,"productCost":5,"medicineId":"0000011"},{"id":11,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-08-08","rotatorNumber":12,"stockLevel":198,"productCost":5,"medicineId":"0000012"},{"id":12,"productName":"dolo650","productUnit":"1","materialType":"Tablet","expiryDate":"2019-08-28","rotatorNumber":13,"stockLevel":197,"productCost":5,"medicineId":"0000013"},{"id":13,"productName":"Lactulose","productUnit":"1","materialType":" Syrup","expiryDate":"2019-08-21","rotatorNumber":14,"stockLevel":496,"productCost":472,"medicineId":"0000014"},{"id":14,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-08-21","rotatorNumber":15,"stockLevel":100,"productCost":472,"medicineId":"0000015"},{"id":15,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-08-21","rotatorNumber":16,"stockLevel":490,"productCost":472,"medicineId":"0000016"},{"id":16,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-11-14","rotatorNumber":17,"stockLevel":493,"productCost":472,"medicineId":"0000017"},{"id":17,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-09-26","rotatorNumber":18,"stockLevel":494,"productCost":472,"medicineId":"0000018"},{"id":18,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-09-18","rotatorNumber":19,"stockLevel":494,"productCost":472,"medicineId":"0000019"},{"id":19,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-09-19","rotatorNumber":20,"stockLevel":493,"productCost":472,"medicineId":"0000020"},{"id":20,"productName":"Lactulose","productUnit":"1","materialType":"Syrup","expiryDate":"2019-08-21","rotatorNumber":21,"stockLevel":496,"productCost":472,"medicineId":"0000021"},{"id":21,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-09-25","rotatorNumber":22,"stockLevel":230,"productCost":110,"medicineId":"0000022"},{"id":22,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-07-24","rotatorNumber":23,"stockLevel":97,"productCost":110,"medicineId":"0000023"},{"id":23,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-08-22","rotatorNumber":24,"stockLevel":230,"productCost":110,"medicineId":"0000024"},{"id":24,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-08-15","rotatorNumber":25,"stockLevel":230,"productCost":110,"medicineId":"0000025"},{"id":25,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-08-29","rotatorNumber":26,"stockLevel":229,"productCost":110,"medicineId":"0000026"},{"id":26,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-08-22","rotatorNumber":27,"stockLevel":230,"productCost":110,"medicineId":"0000027"},{"id":27,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-09-27","rotatorNumber":28,"stockLevel":230,"productCost":110,"medicineId":"0000028"},{"id":28,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-09-27","rotatorNumber":29,"stockLevel":230,"productCost":110,"medicineId":"0000029"},{"id":29,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-09-26","rotatorNumber":30,"stockLevel":30,"productCost":110,"medicineId":"0000030"},{"id":30,"productName":"Luliconazole ","productUnit":"1","materialType":"oinment","expiryDate":"2019-08-26","rotatorNumber":31,"stockLevel":493,"productCost":110,"medicineId":"0000031"},{"id":31,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-07-18","rotatorNumber":32,"stockLevel":488,"productCost":236,"medicineId":"0000032"},{"id":32,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-07-17","rotatorNumber":33,"stockLevel":97,"productCost":236,"medicineId":"0000033"},{"id":33,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-08-20","rotatorNumber":34,"stockLevel":40,"productCost":236,"medicineId":"0000034"},{"id":34,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-08-22","rotatorNumber":35,"stockLevel":98,"productCost":236,"medicineId":"0000035"},{"id":35,"productName":"gutclear","productUnit":"9","materialType":"Tonic","expiryDate":"2019-08-28","rotatorNumber":36,"stockLevel":591,"productCost":236,"medicineId":"0010333"},{"id":36,"productName":"gutclear","productUnit":"12","materialType":"Tonic","expiryDate":"2019-08-22","rotatorNumber":37,"stockLevel":496,"productCost":236,"medicineId":"0010566"},{"id":37,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-08-15","rotatorNumber":38,"stockLevel":477,"productCost":236,"medicineId":"0000038"},{"id":38,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-09-19","rotatorNumber":39,"stockLevel":97,"productCost":236,"medicineId":"0000039"},{"id":39,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-09-11","rotatorNumber":40,"stockLevel":99,"productCost":236,"medicineId":"0000040"},{"id":40,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-09-27","rotatorNumber":41,"stockLevel":99,"productCost":236,"medicineId":"0000041"},{"id":41,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-07-25","rotatorNumber":42,"stockLevel":98,"productCost":236,"medicineId":"0000042"},{"id":42,"productName":"gutclear","productUnit":"1","materialType":"Tonic","expiryDate":"2019-09-26","rotatorNumber":43,"stockLevel":597,"productCost":236,"medicineId":"0000043"},{"id":43,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-11","rotatorNumber":44,"stockLevel":597,"productCost":25,"medicineId":"0000044"},{"id":44,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-24","rotatorNumber":45,"stockLevel":598,"productCost":25,"medicineId":"0000045"},{"id":45,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-11","rotatorNumber":46,"stockLevel":597,"productCost":25,"medicineId":"0000046"},{"id":46,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-10","rotatorNumber":47,"stockLevel":597,"productCost":25,"medicineId":"0000047"},{"id":47,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-07-17","rotatorNumber":48,"stockLevel":99,"productCost":25,"medicineId":"0000048"},{"id":48,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-26","rotatorNumber":49,"stockLevel":97,"productCost":25,"medicineId":"0000049"},{"id":49,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-20","rotatorNumber":50,"stockLevel":599,"productCost":25,"medicineId":"0000050"},{"id":50,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-20","rotatorNumber":50,"stockLevel":598,"productCost":25,"medicineId":"0000051"},{"id":51,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-08-21","rotatorNumber":51,"stockLevel":200,"productCost":26,"medicineId":"0000052"},{"id":52,"productName":"crocin","productUnit":"1","materialType":"Tablet","expiryDate":"2019-06-26","rotatorNumber":52,"stockLevel":100,"productCost":25,"medicineId":"0000053"}]';

		var t = setTimeout(function() { getMvmStockList({
			"method": "mvmStockList","mvmStockListRes":product}) }, 1000);
		
		timeouts.push(t);
	};

	jkiosk.medicineDetailsJson = function(medi){
		

	};

	jkiosk.rotatorRequest = function(postMediDescrRes, medi){
		
	  var productdispense = '[{"Status":"Success","Reason":"Please collect your medicine","Data":null,"mediId":"'+medi.Id+'","barcodeImage":null}]'
	    var t = setTimeout(function() { postMediDescrRes({
             "method": "dispensiveResponseMethod","dispensiveResponse":productdispense}) }, 10000);
	    timeouts.push(t);
	};

	/********************************************
	 New Multi-Printer Functionality (thermal/a4)
	*********************************************/
	/*
	 Callback will contain the following fields:
	 thermalPrinterConnectedStatus,
     thermalPrinterPaperStatus,
     a4PrinterConnectedStatus,
     a4PrinterPaperStatus.

	 Last changed: 1.0 [new]
	*/

	jkiosk.multiPrinterConfigurationDetails = function(getConfigurationDetails){
		/*class Details{
			thermalPrinterConnectedStatus = true;
			thermalPrinterPaperStatus = false;
			a4PrinterConnectedStatus = true;
			a4PrinterPaperStatus = true
		};*/
		class Details{
			printerName_0 = "EPSON TM-m30 Receipt";
			isInError_0 = "False";
			IsNotAvailable_0 = "True";
			isOutOfPaper_0 = "False";
			isOffline_0 = "False";
			isBusy_0 = "False";

			printerName_1 = "HP DJ 2300 series PCL3";
			isInError_1 = "False";
			IsNotAvailable_1 = "True";
			isOutOfPaper_1 = "False";
			isOffline_1 = "False";
			isBusy_1 = "False";

			printerName_2 = "EPSON TM-m30II Receipt";
			isInError_2 = "False";
			IsNotAvailable_2 = "False";
			isOutOfPaper_2 = "False";
			isOffline_2 = "False";
			isBusy_2 = "False";
		}
		let details = new Details();

		getConfigurationDetails(details);
	};

	jkiosk.getTopScreenVideoByKioskId = function(topScreenVideoRes, Id){
		console.log(Id);
	}

	jkiosk.fetchKioskMachineLogo = function(kiosk_id, success, error) {
		var url = HigiBaseUrl + '/consult/fetch_Kiosk_Machine_Partner_Logo_Images';
		var data = {'kiosk_id': kiosk_id};
		jkiosk.apiProxy(url, 'GET', data, success, error);
	};

	jkiosk.printPDFFile = function(printPDFFileRes, prescriptionUrl, externalPrinterName){
		console.log("inisde printPDFFile() in jkiosk-Mock.js");
    };


}(this.jkiosk = this.jkiosk || {}));


