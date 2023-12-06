class PrintPrescriptionConstants {
	"use strict";
	logoUrl = "";
	patientFirstName = "";
	patientLastName = "";
	patientAge = "";
	patientGender = "";
	patientEmail = "";
	patientMobileNumber
	consultationDateTime = "";
	physicianName = "";
	physicianMobileNumber = "";
	physicianEmail = "";
	physicianSpeciality = "";
	reasonForVisit = "";
	diagnosis = null;
	consultantInstruction = null;
	ConsultantId = "";
	DynamicConsultantID = "";
	ShowFoodAndNutrition = "";
	medication = [];
	lab = [];
	vitalData = null;
	doctorSignature = "";
	vendorName = "";
	doctorFees = null;
	doctorRmpId = undefined;
	doctorAddress = undefined;
	appointmentId = "";
	prescriptionNum = "";
	weightKg = "";
	RadiologyArr = [];
	Radiology = "";
	AllergyArr = [];
	Allergy = "";
	adviceToPatient = [];
	patientSymptoms = [];
	apolloDiagnosisPrimary = [];
	vitalsShowCondition = [];
	labTestShowCondition = [];
	cheifComplaintsShowCondition = [];
	diagnosisShowCondition = [];
	VendorNameShowCondition = "";
	printPrescriptionConstants = {};

	constructor(consultationObj, uiName, logo) {
		this.printPrescriptionConstants = consultationObj;
		//console.log(consultationObj);		
		this.logoUrl = logo;
		this.doctorFees = consultationObj.message.consultation_fees;	
		this.ConsultantId = consultationObj.message.ihl_consultant_id;
		this.reasonForVisit = consultationObj.message.reason_for_visit;
		this.appointmentId = consultationObj.message.appointment_id;
		this.RadiologyArr = JSON.parse(consultationObj.message.radiology);
		this.AllergyArr = JSON.parse(consultationObj.message.alergy_genix);
		this.vitalsShowCondition = consultationObj.kiosk_checkin_history;
		this.labTestShowCondition = consultationObj.message.lab_tests;
		this.cheifComplaintsShowCondition = consultationObj.message.reason_for_visit;
		this.VendorNameShowCondition = consultationObj.message.vendor_id;
		this.diagnosisShowCondition = consultationObj.message.patient_diagnosis;
		this.prescriptionNum = consultationObj.prescription_num;
		this.doctorRmpId = consultationObj.consultant_details.rmp_id;
		this.doctorAddress = consultationObj.doctorAddress;
		this.doctorSignature = consultationObj.doctorSignature;
		let dateString = consultationObj.message.appointment_start_time.split(' ');
		let date = dateString[0].split('-');
		let time = `${dateString[1]} ${dateString[2]}`;
		this.consultationDateTime = `${date[2]}-${date[1]}-${date[0]} ${time}`;
		this.physicianSpeciality = consultationObj['consultant_speciality'];
		// console.log("llllllllllllllllllllllllllll",this.physicianSpeciality);
		//This Condition Applies Only if The Consultant is Pooja (Nutritionist)
		//  FYI, 335aad6f96454425b25df675d9786b0a is Pooja Mam Consultant Id // azureapi
		//  FYI, eed673ac447f4e26aa467e055629ffec is Manaochitra Consultant Id - username = ManoWGNConsultant  Password = Test@12345// devserver
		this.DynamicConsultantID = (this.ConsultantId == "335aad6f96454425b25df675d9786b0a")?("Nutritionist Name"):("Physician Name");  
		this.ShowFoodAndNutrition = (this.ConsultantId == "335aad6f96454425b25df675d9786b0a")?("Food and Nutrition"):(this.physicianSpeciality);
		// console.log("ShowFoodAndNutrition",this.ShowFoodAndNutrition);

		if(consultationObj['patient_dob'] != "" && date[0] != "") this.calculatePatientAge(consultationObj['patient_dob'], date[0]);
		if(consultationObj.message.prescription != null) this.medication = consultationObj.message.prescription;

		if(consultationObj.message.lab_tests != null) this.lab = JSON.parse(consultationObj.message.lab_tests);
		if(consultationObj.message.advice_to_patient != null) this.adviceToPatient = consultationObj.message.advice_to_patient;
		if(consultationObj.message.patient_symptoms != null) this.patientSymptoms = consultationObj.message.patient_symptoms;
		if(consultationObj.message.patient_diagnosis != null) this.apolloDiagnosisPrimary = consultationObj.message.patient_diagnosis;

		this.physicianEmail = consultationObj.consultant_details.consultant_email;
		this.physicianMobileNumber = consultationObj.consultant_details.consultant_mobile;
		this.patientFirstName = consultationObj.user_details.user_first_name;
		this.patientLastName = consultationObj.user_details.user_last_name;
		this.patientMobileNumber = consultationObj.user_details.user_mobile_number;
		this.patientEmail = consultationObj.user_details.user_email;

		//checking gender
		if(consultationObj['patient_gender'] != "" && consultationObj['patient_gender'] != undefined) {
			if(consultationObj['patient_gender'].toLowerCase() === 'm') this.patientGender = "Male";
			else if(consultationObj['patient_gender'].toLowerCase() === 'f') this.patientGender = "Female";
		}
		
		if(uiName === "lastCheckin") {			
			this.physicianName = consultationObj.consultant_details.consultant_name;
			this.vendorName = consultationObj.consultant_details.vendor_name;
			this.physicianSpeciality = consultationObj.message.specality;
		} 
		else if(uiName === "summaryPage") {
			this.physicianName = consultationObj.message.consultant_name;
			this.vendorName = consultationObj.message.vendor_name;
			this.physicianSpeciality = consultationObj['consultant_speciality'];
			console.log("this.physicianSpeciality",this.physicianSpeciality);
		}

		if(this.vendorName.toLowerCase() == "ihl") {
			this.consultantInstruction = consultationObj.message.consultation_advice_notes;
			this.diagnosis = consultationObj.message.diagnosis;
		} else if(this.vendorName.toLowerCase() == "genix"){
			if(consultationObj.message.notes != null && consultationObj.message.notes != "") {
				let notes = JSON.parse(consultationObj.message.notes);
				if(notes.length != 0) this.consultantInstruction = JSON.parse(consultationObj.message.notes)[0]['Description'];
				else this.consultantInstruction = null;
			}
			this.diagnosis = consultationObj.message.patient_diagnosis;		
		}

		if(consultationObj.kiosk_checkin_history != null) {
			this.vitalData = consultationObj.kiosk_checkin_history;
			if(this.vitalData['weightKG'] != undefined && this.vitalData['weightKG'] != null) {
				this.weightKg = this.vitalData['weightKG'].toFixed(2) + " KG";
			}
		}
		
		this.showHideConsultantNotes();
		this.showHideIHLDiagnosisNotes();
		this.showHideMedicationDetails();
		this.showHideLabDetails();
		this.showHideAdviceDetails();
		this.showHideSymptomsDetails();
		this.showHideApolloDiagnosisTable();
		this.showHideGenixDiagnosisTable();			
		this.showHideSharedVitalData();
		this.ShowRadiologyTests();
		this.ShowAllergyDetails();
		this.ShowBasicDetailsData();
	}
	ShowBasicDetailsData(){
		let logoUrl = document.getElementById('logoUrl')
		if (logoUrl !== null) {
			if (this.logoUrl === undefined || this.logoUrl === null || this.logoUrl === '') {
				this.logoUrl = '';
			}
			logoUrl.innerText += this.logoUrl;	
		}

		let physicianName = document.getElementById('physicianName')
		if (physicianName !== null){
			if (this.physicianName === undefined || this.physicianName === null || this.physicianName === '') {
				this.physicianName = '';
			}
			physicianName.innerText += this.physicianName;
		}
		
		let physicianSpeciality = document.getElementById('physicianSpeciality')
		if(physicianSpeciality !== null){
			if (this.physicianSpeciality === undefined || this.physicianSpeciality === null || this.physicianSpeciality === '') {
				this.physicianSpeciality = '';
			}
			physicianSpeciality.innerText += this.physicianSpeciality;
		}	

		let doctorRmpId = document.getElementById('doctorRmpId')
		if(doctorRmpId !== null){
			if (this.doctorRmpId === undefined || this.doctorRmpId === null || this.doctorRmpId === '') {
				this.doctorRmpId = '';
			}
			doctorRmpId.innerText += this.doctorRmpId;	
		}

		let appointmentId = document.getElementById('appointmentId')
		if(appointmentId !== null){
			if (this.appointmentId === undefined || this.appointmentId === null || this.appointmentId === '') {
				this.appointmentId = '';
			}
			appointmentId.innerText += this.appointmentId;	
		}

		let patientName = document.getElementById('patientName')
		if(patientName !== null){
			if (this.patientFirstName === undefined || this.patientFirstName === null || this.patientFirstName === '') {
				this.patientFirstName = '';
			}
			if (this.patientLastName === undefined || this.patientLastName === null || this.patientLastName === '') {
				this.patientLastName = '';
			}
			patientName.innerText += this.patientFirstName+' '+this.patientLastName;
		}

		let patientMobileNumber = document.getElementById('patientMobileNumber')
		if(patientMobileNumber !== null){
			if (this.patientMobileNumber === undefined || this.patientMobileNumber === null || this.patientMobileNumber === '') {
				this.patientMobileNumber = '';
			}
			patientMobileNumber.innerText += this.patientMobileNumber;	
		}

		let patientAgeAndSex = document.getElementById('patientAgeAndSex')
		if(patientAgeAndSex !== null){
			if (this.patientAge === undefined || this.patientAge === null || this.patientAge === '') {
				this.patientAge = '';
			}
			if (this.patientGender === undefined || this.patientGender === null || this.patientGender === '') {
				this.patientGender = '';
			}
			patientAgeAndSex.innerText += this.patientAge+' & '+this.patientGender;	
		}

		let consultationDateTime = document.getElementById('consultationDateTime')
		if(consultationDateTime !== null){
			if (this.consultationDateTime === undefined || this.consultationDateTime === null || this.consultationDateTime === '') {
				this.consultationDateTime = '';
			}
			consultationDateTime.innerText += this.consultationDateTime;	
		}

		let reasonForVisit = document.getElementById('reasonForVisit')
		if(reasonForVisit !== null){
			if (this.reasonForVisit === undefined || this.reasonForVisit === null || this.reasonForVisit === '') {
				this.reasonForVisit = '';
			}
			reasonForVisit.innerText += this.reasonForVisit;
		}


		let radiology = document.getElementById('radiology')
		if(radiology !== null){
			if (this.RadiologyArr.length !== 0) {
				radiology.closest('.Radiology').style.display = 'block';
			} else {
				radiology.closest('.Radiology').style.display = 'none';
			}		
			for (let i = 0; i < this.RadiologyArr.length; i++) {
				this.Radiology += this.RadiologyArr[i].test_name;
				if (i < this.RadiologyArr.length - 1) {
				  this.Radiology += ", ";
				}
			}
			radiology.innerText += this.Radiology;
		}

		let allergy = document.getElementById('allergy')
		if(allergy !== null){
			if (this.AllergyArr.length !== 0) {
				allergy.closest('.AllergyNotes').style.display = 'block';
			} else {
				allergy.closest('.AllergyNotes').style.display = 'none';
			}
			for (let i = 0; i < this.AllergyArr.length; i++) {
				this.Allergy += this.AllergyArr[i].alergy;
				if (i < this.AllergyArr.length - 1) {
				  this.Allergy += ", ";
				}
			}
			allergy.innerText += this.Allergy;
		}

		let doctorSignature = document.getElementById('doctorSignature')
		if(doctorSignature !== null){
			if (this.doctorSignature === undefined || this.doctorSignature === null || this.doctorSignature === '') {
				this.doctorSignature = '';
			}
			doctorSignature.innerText += this.doctorSignature;	
		}

		let doctorAddress = document.getElementById('doctorAddress')
		if(doctorAddress !== null){
			if (this.doctorAddress === undefined || this.doctorAddress === null || this.doctorAddress === '') {
				this.doctorAddress = '';
			}
			doctorAddress.innerText += this.doctorAddress;	
		}
	}

	showHideSharedVitalData() {
		let vital_table_a4 = document.getElementById('vital_table_a4');
		let vital_table_thermal = document.getElementById('vital_table_thermal');

		if(this.vitalData != null && this.vitalData != "" && this.vendorName.toLowerCase() != "ihl") {
			if(vital_table_a4 != null) {				
				vital_table_a4.style.display = "block";
				this.populateVitalData('vital_header_arr_a4', 'vital_data_arr_a4');
			}
			if(vital_table_thermal != null) {				
				vital_table_thermal.style.display = "block";
				this.populateVitalData('vital_header_arr_thermal', 'vital_data_arr_thermal');
			}
		}
		else {
			if(vital_table_a4 != null) {
				
				vital_table_a4.style.display = "none";
			}
			if(vital_table_thermal != null) {
				
				vital_table_thermal.style.display = "none";
			}
		}
	}

	showHideIHLDiagnosisNotes() {
		let print_diagnosis_thermal = document.getElementById('print_diagnosis_thermal');
		let print_diagnosis_a4 = document.getElementById('print_diagnosis_a4');
		
		if(this.diagnosis != null && this.diagnosis != "" && this.vendorName.toLowerCase() == "ihl") {		
			if(print_diagnosis_thermal != null) print_diagnosis_thermal.style.display = 'block';
			if(print_diagnosis_a4 != null) print_diagnosis_a4.style.display = 'block';
			
		} else {
			if(print_diagnosis_thermal != null) {
				
				print_diagnosis_thermal.style.display = 'none';
			}
			if(print_diagnosis_a4 != null) {
				
				print_diagnosis_a4.style.display = 'none';
			}			
		}
	}

	showHideGenixDiagnosisTable() {
		let genix_diagnosis_table_a4 = document.getElementById('genix_diagnosis_table_a4');
		let genix_diagnosis_table_thermal = document.getElementById('genix_diagnosis_table_thermal');

		if(this.diagnosis != null) {
			if(this.diagnosis.length != 0 && this.vendorName.toLowerCase() == "genix") {
				if(genix_diagnosis_table_a4 != null) {
				genix_diagnosis_table_a4.style.display = 'block';
				this.populateGenixDiagnosisData('genix_diagnosis_header_arr_a4','genix_diagnosis_data_arr_a4');				
				}
				if(genix_diagnosis_table_thermal != null) {
				genix_diagnosis_table_thermal.style.display = 'block';
				this.populateGenixDiagnosisData('genix_diagnosis_header_arr_thermal','genix_diagnosis_data_arr_thermal');
				}
				
			} else {
				if(genix_diagnosis_table_a4 != null) {
					
					genix_diagnosis_table_a4.style.display = 'none';
				}
				if(genix_diagnosis_table_thermal != null) {
					
					genix_diagnosis_table_thermal.style.display = 'none';
				}
				
			}
		}
	}

	showHideApolloDiagnosisTable() {
		let apollo_diagnosis_table_a4 = document.getElementById('apollo_diagnosis_table_a4');
		let apollo_diagnosis_table_thermal = document.getElementById('apollo_diagnosis_table_thermal');

		if(this.apolloDiagnosisPrimary != null) {
			if(this.apolloDiagnosisPrimary.length != 0 && this.vendorName.toLowerCase() == "apollo") {
				if(apollo_diagnosis_table_a4 != null) {
				apollo_diagnosis_table_a4.style.display = 'block';
				this.populateApolloDiagnosisData('apollo_diagnosis_header_arr_a4','apollo_diagnosis_data_arr_a4');				
				}
				if(apollo_diagnosis_table_thermal != null) {
				apollo_diagnosis_table_thermal.style.display = 'block';
				this.populateApolloDiagnosisData('apollo_diagnosis_header_arr_thermal','apollo_diagnosis_data_arr_thermal');
				}
				
			} else {
				if(apollo_diagnosis_table_a4 != null) {
					
					apollo_diagnosis_table_a4.style.display = 'none';
				}
				if(apollo_diagnosis_table_thermal != null) {
					
					apollo_diagnosis_table_thermal.style.display = 'none';
				}
				
			}
		}
	}

	ShowRadiologyTests(){
		  for (let i = 0; i < this.RadiologyArr.length; i++) {
			this.Radiology += this.RadiologyArr[i].test_name;
			if (i < this.RadiologyArr.length - 1) {
			  this.Radiology += ", ";
			}
		  }
		//   console.log(this.Radiology);
	}

	ShowAllergyDetails(){
		for (let i = 0; i < this.AllergyArr.length; i++) {
			this.Allergy += this.AllergyArr[i].alergy;
			if (i < this.AllergyArr.length - 1) {
			  this.Allergy += ", ";
			}
		  }
		//   console.log(this.Allergy);
	}

	calculatePatientAge(dob, appointment_year) {
		let today = new Date();
		let errorList = [null, undefined, ""];		
		if(!errorList.includes(dob) && !errorList.includes(appointment_year)) {
			//let age = today.getFullYear() - dob.split('/')[2];
			let age = appointment_year - dob.split('/')[2];
			this.patientAge = age + " Years Old";
		}
	}

	showHideLabDetails() {
		let genix_lab_table_a4 = document.getElementById('genix_lab_table_a4');
		let genix_lab_table_thermal = document.getElementById('genix_lab_table_thermal');
		// let apollo_lab_table_a4 = document.getElementById('apollo_lab_table_a4');
		let apollo_lab_table_thermal = document.getElementById('apollo_lab_table_thermal');

		if(this.lab.length != 0 && this.vendorName.toLowerCase() == "genix") {
			if(genix_lab_table_a4 != null) {
				genix_lab_table_a4.style.display = 'block';
				this.populateLabData('genix_lab_header_arr_a4','genix_lab_data_arr_a4');
			}
			if(genix_lab_table_thermal != null) {
				genix_lab_table_thermal.style.display = 'block';
				this.populateLabData('genix_lab_header_arr_thermal','genix_lab_data_arr_thermal');
			}
		} 
		else if(this.lab.length != 0 && this.vendorName.toLowerCase() == "apollo") {
			// if(apollo_lab_table_a4 != null) {
			// 	apollo_lab_table_a4.style.display = 'block';
			// 	this.populateLabData('apollo_lab_header_arr_a4','apollo_lab_data_arr_a4');
			// }
			if(apollo_lab_table_thermal != null) {
				// console.log(apollo_lab_table_thermal);
				apollo_lab_table_thermal.style.display = 'block';
				this.populateApolloLabData('apollo_lab_header_arr_thermal','apollo_lab_data_arr_thermal');
			}
		} 
		else {
			if(genix_lab_table_a4 != null) {
				// apollo_lab_table_a4.style.display = 'none';
				genix_lab_table_a4.style.display = 'none';
			}
			if(genix_lab_table_thermal != null) {
				apollo_lab_table_thermal.style.display = 'none';
				genix_lab_table_thermal.style.display = 'none';
			}
		}
	}

	showHideAdviceDetails() {
		// console.log(this.adviceToPatient);
		let apollo_advice_table_a4 = document.getElementById('apollo_advice_table_a4');
		let apollo_advice_table_thermal = document.getElementById('apollo_advice_table_thermal');
 
		if(this.adviceToPatient.length != 0 && this.vendorName.toLowerCase() == "apollo") {
			if(apollo_advice_table_a4 != null) {
				apollo_advice_table_a4.style.display = 'block';
				this.populateAdviceData('apollo_advice_header_arr_a4','apollo_advice_data_arr_a4');
			}
			if(apollo_advice_table_thermal != null) {
				apollo_advice_table_thermal.style.display = 'block';
				this.populateAdviceData('apollo_advice_header_arr_thermal','apollo_advice_data_arr_thermal');
			}
		} 
		else {
			if(apollo_advice_table_thermal != null) {
				apollo_advice_table_thermal.style.display = 'none';
			}
		}
	}

	showHideSymptomsDetails() {
		// console.log(this.patientSymptoms);
		let apollo_symptoms_table_a4 = document.getElementById('apollo_symptoms_table_a4');
		let apollo_symptoms_table_thermal = document.getElementById('apollo_symptoms_table_thermal');
 
		if(this.patientSymptoms.length != 0 && this.vendorName.toLowerCase() == "apollo") {
			if(apollo_symptoms_table_a4 != null) {
				apollo_symptoms_table_a4.style.display = 'block';
				this.populateSymptomsData('apollo_symptoms_header_arr_a4','apollo_symptoms_data_arr_a4');
			}
			if(apollo_symptoms_table_thermal != null) {
				// console.log(apollo_symptoms_table_thermal);
				apollo_symptoms_table_thermal.style.display = 'block';
				this.populateSymptomsData('apollo_symptoms_header_arr_thermal','apollo_symptoms_data_arr_thermal');
			}
		} 
		else {
			if(apollo_symptoms_table_thermal != null) {
				apollo_symptoms_table_thermal.style.display = 'none';
			}
		}
	}

	showHideMedicationDetails() {
		let genix_medication_table_a4 = document.getElementById('genix_medication_table_a4');
		let genix_medication_table_thermal = document.getElementById('genix_medication_table_thermal');
		let apollo_medication_table_a4 = document.getElementById('apollo_medication_table_a4');
		let apollo_medication_table_thermal = document.getElementById('apollo_medication_table_thermal');
		
		if(this.medication.length != 0 && this.vendorName.toLowerCase() == "genix") {
			if(genix_medication_table_a4 != null) {
				genix_medication_table_a4.style.display = 'block';
				this.populateMedicationData('genix_medication_header_arr_a4','genix_medication_data_arr_a4');
			}
			if(genix_medication_table_thermal != null) {
				genix_medication_table_thermal.style.display = 'block';
				this.populateMedicationData('genix_medication_header_arr_thermal','genix_medication_data_arr_thermal');
			}
		} else if(this.medication.length != 0 && this.vendorName.toLowerCase() == "apollo") {
			if(apollo_medication_table_a4 != null) {
				apollo_medication_table_a4.style.display = 'block';
				this.populateMedicationData('apollo_medication_header_arr_a4','apollo_medication_data_arr_a4');
			}
			if(apollo_medication_table_thermal != null) {
				apollo_medication_table_thermal.style.display = 'block';
				this.populateMedicationData('apollo_medication_header_arr_thermal','apollo_medication_data_arr_thermal');
			}
		} else {
			if(genix_medication_table_a4 != null) {
				apollo_medication_table_a4.style.display = 'none';
				genix_medication_table_a4.style.display = 'none';
			}
			if(genix_medication_table_thermal != null) {
				apollo_medication_table_thermal.style.display = 'none';
				genix_medication_table_thermal.style.display = 'none';
			}
		}
	}

	showHideConsultantNotes() {
		let print_ins_thermal = document.getElementById('print_consultant_instruction_thermal');
		let print_ins_a4 = document.getElementById('print_consultant_instruction_a4');
		
		if(this.consultantInstruction == null) {
			if(print_ins_thermal != null) {
				
				print_ins_thermal.style.display = 'none';
			}
			if(print_ins_a4 != null) {
				
				print_ins_a4.style.display = 'none';			
			}
		} else {
			if(print_ins_thermal != null) print_ins_thermal.style.display = 'block';
			if(print_ins_a4 != null) print_ins_a4.style.display = 'block';			
		}
	}

	populateVitalData(thead, tbody) {
		let vital_data_arr = document.getElementById(tbody);
		let vital_header_arr = document.getElementById(thead);

		//erase old data
		vital_header_arr.innerHTML = "";
		vital_data_arr.innerHTML = "";

		//create table body with data
			let data_tr1 = document.createElement("TR");
			let data_tr2 = document.createElement("TR");
			data_tr1.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			data_tr2.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			vital_data_arr.appendChild(data_tr1);
			vital_data_arr.appendChild(data_tr2);
		
		for(const prop in this.vitalData) {				
			let data_td = document.createElement("TD");
			data_td.setAttribute("style", "font-weight:500;padding: 10px;");
			if(this.vendorName.toLowerCase() == "genix") {
				switch(prop) {
					case "heightMeters": {
						data_td.innerHTML = "<span class='vitalTitle'>Height :</span> " + this.vitalData[prop].toFixed(2) + " Metre";
						data_tr1.insertBefore(data_td, data_tr1.children[0]);
						break;
					}
					case "weightKG": {
						data_td.innerHTML = "<span class='vitalTitle'>Weight :</span> " + this.vitalData[prop].toFixed(2) + " KG";
						data_tr1.insertBefore(data_td, data_tr1.children[1]);
						break;
					}
					case "temperature": {
						data_td.innerHTML = "<span class='vitalTitle'>Temperature :</span> " + (+this.vitalData[prop]).toFixed(2) + " °F";
						data_tr1.insertBefore(data_td, data_tr1.children[2]);
						break;
					}
					case "bmi": {
						data_td.innerHTML = "<span class='vitalTitle'>Body Mass Index :</span> " + this.vitalData[prop].toFixed(2);
						data_tr2.insertBefore(data_td, data_tr2.children[0]);
						break;
					}
					case "spo2": {
						data_td.innerHTML = "<span class='vitalTitle'>SpO<sub>2</sub> :</span> " + this.vitalData[prop] + " %";
						data_tr2.insertBefore(data_td, data_tr2.children[1]);
						break;
					}
					case "systolic": {
						data_td.innerHTML = "<span class='vitalTitle'>Blood Pressure :</span> " + this.vitalData['systolic'] +"/"+ this.vitalData['diastolic'] + " mmHg";
						data_tr2.insertBefore(data_td, data_tr2.children[2]);
						break;
					}
				}
			}
		}
	}

	populateGenixDiagnosisData(thead, tbody) {
		let diagnosis_data_arr = document.getElementById(tbody);
		let diagnosis_header_arr = document.getElementById(thead);

		//erase old data
		diagnosis_header_arr.innerHTML = "";
		diagnosis_data_arr.innerHTML = "";

		//create table headers
		let header_tr = document.createElement("TR");
		header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		diagnosis_header_arr.appendChild(header_tr);
		let theader_list = [];
		if(this.vendorName.toLowerCase() == "genix") theader_list = ["Diagnosis Name", "Diagnosis Notes"];
		for(let i=0; i<theader_list.length; i++) {
			let header_td = document.createElement("TD");
			header_td.setAttribute("style", "padding: 10px;");
			header_td.innerHTML = theader_list[i];
			header_tr.insertBefore(header_td, header_tr.children[i]);
		}

		//create table body with data
		this.diagnosis.map(obj => {
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			diagnosis_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "genix") {
					switch(prop) {
					case "diagnosis_name": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "diagnosis_note": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					}
				}
			}
		});
	}

	populateApolloDiagnosisData(thead, tbody) {
		let apollo_diagnosis_data_arr = document.getElementById(tbody);
		let apollo_diagnosis_header_arr = document.getElementById(thead);

		//erase old data
		apollo_diagnosis_header_arr.innerHTML = "";
		apollo_diagnosis_data_arr.innerHTML = "";
		// console.log(this.apolloDiagnosisPrimary);

		//create table headers
		let header_tr = document.createElement("TR");
		header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		apollo_diagnosis_header_arr.appendChild(header_tr);
		let theader_list = [];
		if(this.vendorName.toLowerCase() == "apollo") theader_list = ["Tag", "Disease Name"];
		for(let i=0; i<theader_list.length; i++) {
			let header_td = document.createElement("TD");
			header_td.setAttribute("style", "padding: 10px;");
			header_td.innerHTML = theader_list[i];
			header_tr.insertBefore(header_td, header_tr.children[i]);
		}

		//create table body with data
		this.apolloDiagnosisPrimary.map(obj => {
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			apollo_diagnosis_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "apollo") {
					switch(prop) {
					case "primaryOptions": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "snomedTerm": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					}
				}
			}
		});
	}

	populateApolloLabData(tbody, thead){
		let apollo_lab_data_arr = document.getElementById(tbody);
		let apollo_lab_header_arr = document.getElementById(thead);

		apollo_lab_data_arr.innerHTML = "";
		apollo_lab_header_arr.innerHTML = "";

		// let header_tr = document.createElement("TR");
		// header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		// apollo_lab_header_arr.appendChild(header_tr);
		// let theader_list = [];
		// if(this.vendorName.toLowerCase() == "apollo") theader_list = ["Test Name", "Lab Notes"];
		// for(let i=0; i<theader_list.length; i++) {
		// 	let header_td = document.createElement("TD");
		// 	header_td.setAttribute("style", "padding: 10px;");
		// 	header_td.innerHTML = theader_list[i];
		// 	header_tr.insertBefore(header_td, header_tr.children[i]);
		// }

		this.lab.map(obj => {
			// console.log(obj);
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			apollo_lab_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "apollo") {
					switch(prop) {
					case "adviceType": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					// case "lab_note": {
					// 	if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
					// 	else data_td.innerHTML = "N/A"
					// 	data_tr.insertBefore(data_td, data_tr.children[1]);
					// 	break;
					// }
					}
				}
			}
		});
	}

	populateLabData(thead, tbody) {
		let lab_data_arr = document.getElementById(tbody);
		let lab_header_arr = document.getElementById(thead);

		//erase old data
		lab_header_arr.innerHTML = "";
		lab_data_arr.innerHTML = "";

		//create table headers
		let header_tr = document.createElement("TR");
		header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		lab_header_arr.appendChild(header_tr);
		let theader_list = [];
		if(this.vendorName.toLowerCase() == "genix") theader_list = ["Test Name", "Lab Notes"];
		for(let i=0; i<theader_list.length; i++) {
			let header_td = document.createElement("TD");
			header_td.setAttribute("style", "padding: 10px;");
			header_td.innerHTML = theader_list[i];
			header_tr.insertBefore(header_td, header_tr.children[i]);
		}

		//create table body with data
		this.lab.map(obj => {
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			lab_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "genix") {
					switch(prop) {
					case "test_name": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "lab_note": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					}
				}
			}
		});
	}

	populateAdviceData(thead, tbody) {
		let advice_data_arr = document.getElementById(tbody);
		let advice_header_arr = document.getElementById(thead);

		//erase old data
		advice_header_arr.innerHTML = "";
		advice_data_arr.innerHTML = "";

		//create table headers
		// let header_tr = document.createElement("TR");
		// header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		// advice_header_arr.appendChild(header_tr);
		// let theader_list = [];
		// if(this.vendorName.toLowerCase() == "apollo") theader_list = ["Advice"];
		// for(let i=0; i<theader_list.length; i++) {
		// 	let header_td = document.createElement("TD");
		// 	header_td.setAttribute("style", "padding: 10px;");
		// 	header_td.innerHTML = theader_list[i];
		// 	header_tr.insertBefore(header_td, header_tr.children[i]);
		// }

		//create table body with data
		this.adviceToPatient.map(obj => {
			// console.log(obj);
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			advice_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "apollo") {
					switch(prop) {
					// case "no": {
					// 	data_td.innerHTML = obj[prop];
					// 	data_tr.insertBefore(data_td, data_tr.children[0]);
					// 	break;
					// }
					case "advice": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					}
				}
			}
		});
	}

	populateSymptomsData(thead, tbody){
		let symptoms_data_arr = document.getElementById(tbody);
		let symptoms_header_arr = document.getElementById(thead);

		//erase old data
		symptoms_header_arr.innerHTML = "";
		symptoms_data_arr.innerHTML = "";

		//create table headers
		let header_tr = document.createElement("TR");
		header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		symptoms_header_arr.appendChild(header_tr);
		let theader_list = [];
		if(this.vendorName.toLowerCase() == "apollo") theader_list = ["Symptom", "Severity", "Duration"];
		for(let i=0; i<theader_list.length; i++) {
			let header_td = document.createElement("TD");
			header_td.setAttribute("style", "padding: 10px;");
			header_td.innerHTML = theader_list[i];
			header_tr.insertBefore(header_td, header_tr.children[i]);
		}

		//create table body with data
		this.patientSymptoms.map(obj => {
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			symptoms_data_arr.appendChild(data_tr);
			
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "apollo") {
					switch(prop) {
					case "symptomName": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "severity": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					case "symptomOnsetDuration": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[2]);
						break;
					}
					}
				}
			}
		});
	}

	populateMedicationData(thead, tbody) {
		let medication_data_arr = document.getElementById(tbody);
		let medication_header_arr = document.getElementById(thead);

		//erase old data
		medication_header_arr.innerHTML = "";
		medication_data_arr.innerHTML = "";

		//create table headers 
		let header_tr = document.createElement("TR");
		header_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
		medication_header_arr.appendChild(header_tr);
		let theader_list = [];
		if(this.vendorName.toLowerCase() == "genix") theader_list = ["Medicine Name", "Frequency", "Quantity", "Direction Of Use", "Days"];
		else if(this.vendorName.toLowerCase() == "apollo") theader_list = ["Medicine Name", "Dosage", "Strength", "Frequency", "Notes"];
		for(let i=0; i<theader_list.length; i++) {
			let header_td = document.createElement("TD");
			header_td.setAttribute("style", "padding: 10px;");
			header_td.innerHTML = theader_list[i];
			header_tr.insertBefore(header_td, header_tr.children[i]);
		}

		//create table body with data
		this.medication.map(obj => {
			let data_tr = document.createElement("TR");
			data_tr.setAttribute("style", "border: 1px solid black;border-collapse: collapse;padding:5px;");
			medication_data_arr.appendChild(data_tr);

			let dosage_with_unit = "";
			if(this.vendorName.toLowerCase() == "apollo") dosage_with_unit = obj["dosage"] + " " + obj["units"];
			for(const prop in obj) {
				let data_td = document.createElement("TD");
				data_td.setAttribute("style", "font-weight:500;padding: 10px;");
				if(this.vendorName.toLowerCase() == "genix") {
					switch(prop) {
					case "drug_name": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "SIG": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					case "direction_of_use": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[2]);
						break;
					}
					case "quantity": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[3]);
						break;
					}
					case "days": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[4]);
						break;
					}
					}
				} else if(this.vendorName.toLowerCase() == "apollo") {
					switch(prop) {
					case "drug_name": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[0]);
						break;
					}
					case "dosage": {
						//data_td.innerHTML = obj[prop];
						data_td.innerHTML = dosage_with_unit;
						data_tr.insertBefore(data_td, data_tr.children[1]);
						break;
					}
					case "strength": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[2]);
						break;
					}
					case "frequency": {
						data_td.innerHTML = obj[prop];
						data_tr.insertBefore(data_td, data_tr.children[3]);
						break;
					}
					case "notes": {
						if(obj[prop] != "" && obj[prop] != null) data_td.innerHTML = obj[prop];
						else data_td.innerHTML = "N/A"
						data_tr.insertBefore(data_td, data_tr.children[4]);
						break;
					}
					}
				}
			}
		});
	}
}