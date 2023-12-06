class PrintConstants{
	"use strict";
	kioskUtilities = {};
	day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	// Kolors Template Protein Scalbar
	convertProteinHighValue = "";
	ProteinStatus = "";
	TotalBodyWaterStatus = "";
	BodyFatMassStatus = "";

	// Dynamic Body Weigh Stick Value
	WeightX1Value = 50;
	WeightX2Value = 100;

	// To Calculate The Low Normal And High Values
	TotalBodyWaterWaterLow = '';
	TotalBodyWaterWaterNormal = '';
	TotalBodyWaterWaterHigh = '';

	// Global Variable
	BCAVitalHistory = "";
	findweightDifference = "";
	weightDifference = "";
	findVfDifference = "";
	vfDifference = "";
	findPbfDifference = "";
	pbfDifference = "";
	findBmiDifference = "";
	bmiDifference = "";


	// Find Ideal Body Weight
	idealBodyWeight = "";
	heightInInches = "";
	IdealBodyWeightForMale = "";
	heightInInchesForFemale = "";
	IdealBodyWeightForFemale = "";
	WeighttoReduce = "";
	WeightToGain = "";

	// Other Parameters Not Taken Scenario for Kolors Template

	KolorsICWresult = "";
	KolorsECWresult = "";
	KolorsWHipRatioResult = "";
	KolorsBodyCellMassResult = "";
	KolorsBoneMineralContentresult = "";
	KolorsWHeightRatioresult = "";
	BasalMetabolicRate = "";

	// Kolors Height Conversion from Iches to Cms
	converionoffeetocms = "";
	KolorsUserheightInCms = "";
	KolorsHeightUnit = "";

	// Body Composition History Data Display Variables

	BCAHistorylength = "";
	BCAHistorypbflength = "";
	BCAHistoryWeightLength = "";
	BCAHistoryBMILength = "";

	// Date and Time
	localDate0 = "";
	localTime0 = "";
	localDate1 = "";
	localTime1 = "";
	localDate2 = "";
	localTime2 = "";
	localDate3 = "";
	localTime3 = "";
	localDate4 = "";
	localTime4 = "";

	// Weight
	WeightMinValue = 0;
	WeightMaxValue  = 0;
	WeightYAxis = [];
	WeightHistory0thIndex = "";
	WeightHistory1stIndex = "";
	WeightHistory2ndIndex = "";
	WeightHistory3rdIndex = "";
	WeightHistory4thIndex = "";

	// VF
	VisceralFatMinValue = 0;
	VisceralFatMaxValue = 0;
	VfYaxis = [];
	VisceralFatHistory0thIndex = "";
	VisceralFatHistory1stIndex = "";
	VisceralFatHistory2ndIndex = "";
	VisceralFatHistory3rdIndex = "";
	VisceralFatHistory4thIndex = "";

	// PBF
	PercentBodyFatMinValue = 0;
	PercentBodyFatMaxValue  = 0;
	pbfYAxis = [];
	PercentBodyFatHistory0thIndex = "";
	PercentBodyFatHistory1stIndex = "";
	PercentBodyFatHistory2ndIndex = "";
	PercentBodyFatHistory3rdIndex = "";
	PercentBodyFatHistory4thIndex = "";

	// BMI
	BMIMinValue = 0;
	BMIMaxValue  = 0;
	BMIYAxis = [];
	BMIHistory0thIndex = "";
	BMIHistory1stIndex = "";
	BMIHistory2ndIndex = "";
	BMIHistory3rdIndex = "";
	BMIHistory4thIndex = "";

	// Total Body Water

	TotalBodyWaterSumpupICW = "";
	TotalBodyWaterSumupECW = "";
	TotalBodyWater="";
	
	//User basic details properties.
	userName = "";
    userHeight = "";
    userGender = "";
    userAge = "";
    userEmailId = "";
    userMobileNumber = "";
    date = "";
    printLogo = "";
	userWeight = "";

	//vital Spo2 dynamic scalebar properties
	oxyScalBar = "";

	// Vital BMI Dynamic Scalebar Properties
	BMIScalebar ="";
	BMIUnderWeight = "";
	BMINormalWeight = "";
	BMIOverWeight = "";
	BMIObeseWeight = "";
	BMIEndValue = "";

	// Vital Body Temperature Dynamic Scalebar Properties
	BodyTempWidthInd = "";
	LowBodyTemperatureValue = "";
	NormalBodyTemperatureValue = "";
	HighBodyTemperatureValue = "";
	EndBodyTemperatureValue = "";

	// systolic Scalebar Properties
	SystolicWidthInd = "";
	SystolicStartValue = "";
	SystolicAcceptableValue = "";
	SystolicHighValue = "";
	SystolicEndValue = "";


	// Diastolic Scalebar Properties
	DiastolicWidthInd = "";
	DiastolicLowValue = "";
	DiastolicNormalValue = "";
	DiastolicHighValue = "";

	//Pulse Scalebar Properties
	PulseEndValue = "";
	PulseWidthInd = "";
	PulseLowValue = "";
	PulseNormalValue = "";
	PulseHighValue = "";

	// Percent Body Fat Scalebar Properties
	PercentBodyFatWidthInd = "";
	PercentBodyFatLowValue = "";
	PercentBodyFatNormalValue = "";
	PercentBodyFatAcceptableValue = "";
	PercentBodyFatHighValue = "";
	PercentBodyFatEndValue = "";

	// Skeletal Muscle Value Scalebar Properties
	SkeletalMuscleMassWidthInd = "";
	SkeletalMuscleMassLowValue = "";
	SkeletalMuscleMassNormalValue = "";
	SkeletalMuscleMassHighValue = "";

	// Body Fat Mass Scalebar Properties
	BodyFatMassWidthInd = "";
	BodyFatMassLowValue = "";
	BodyFatMassNormalValue = "";
	BodyFatMassAcceptableValue = "";
	BodyFatMassHighValue = "";
	BodyFatMassEndValue = "";

	// Intra Cellular Water Scalebar Properties
	IntraCellularWaterWidthInd = "";
	ICWLowValue = "";
	ICWNormalValue = "";
	ICWHighValue = "";
	ICWEndValue = "";

	// Extra Cellular Water Scalebar Properties
	ExtraCellularWaterWidthInd = "";
	ECWLowValue = "";
	ECWNormalValue = "";
	ECWHighValue = "";
	ECWEndValue = "";

	//Protein Content Scalebar Properties
	ProteinWidthInd = "";
	ProteinLowValue = "";
	ProteinNormalValue = "";
	ProteinHighValue = "";
	proteinEndValue = "";

	// Mineral Content Scalebar Properties
	MineralsContentWidthInd = "";
	MineralContentLowValue = "";
	MineralContentNormalValue = "";
	MineralContentHighValue = "";

	// Body Cell Mass Scalebar Properties
	BodyCellMassWidthInd = "";
	BodyCellMassLowValue = "";
	BodyCellMassNormalValue ="";
	BodyCellMassHighValue = "";

	// Bone Mineral Content Scalebar Properties
	BoneMineralContentWidthInd = "";
	BoneMineralContentLowValue = "";
	BoneMineralContentNormalValue = "";
	BoneMineralContentHighValue = "";

	// Waist to Height Ratio Scalebar Properties
	WTHeightRWidthInd = "";
	WTHeightRLowValue = "";
	WTHeightRNormalValue = "";
	WTHeightRHighValue = "";
	WTHeightREndValue = "";

	// Waist to Hip Ratio Scalebar Properties
	WTHipRWidthInd = "";
	WTHipRLowValue = "";
	WTHipRNormalValue = "";
	WTHipRHipHighValue = "";
	WTHipREndValue = "";

	// Visceral Fat Scalebar Properties
	VisceralFatWidthInd = "";
	VisceralFatLowValue = "";
	VisceralFatNormalValue = "";
	VisceralFatAcceptableValue = "";
	VisceralFatHighValue = "";

	// Hemoglobin Scalebar Properties
	HemoglobinWidthInd = "";


	// Random Glucose Scalebar Properties
	RandomGlucoseScalebar = "";
	
	// Fasting Glucose Scalebar Properties
	FastingGlucoseWidthInd = "";

	// Post Prandial Glucose Scalebar Properties
	PostPrandialGlucoseWidthInd = "";

	// Kolors Newly Added Ranges for Invasive

	// TG
	TcStartValue = "";
	TcNormalValue = "";
	TcAcceptableValue = "";
	TcBorderlineHighValue = "";
	TcHighValue = "";
	TcEndValue = "";

	// HDL
	HDLStartValue = "";
	HDLLowValue = "";
	HDLBorderlineLowValue = "";
	HDLNormalValue = "";
	HDLEndValue = "";

	// LDL

	LDLStartValue = "";
	LDLNormalValue = "";
	LDLAcceptableValue = "";
	LDLBorderlineHighValue = "";
	LDLHighValue = "";
	LDLEndValue = "";

	// TG

	TGStartValue = "";
	TGNormalValue = "";
	TGAcceptableValue = "";
	TGBorderlineHighValue = "";
	TGHighValue = "";
	TGEndValue = "";

	// Hemoglobin

	HemoglobinStartValue = "";
	HemoglobinVeryLowValue = "";
	HemoglobinLowValue = "";
	HemoglobinAcceptableValue = "";
	HemoglobinNormalValue = "";
	HemoglobinHighValue = "";
	HemoglobinEndValue = "";

	// Glucose

	// Random

	RandomGlucoseStartValue = "";
	RandomGlucoseNormalValue = "";
	RandomGlucosePreDiabetesValue = "";
	RandomGlucoseDiabetesValue = "";
	RandomGlucoseEndValue = "";

	// Fasting

	FastingGlucoseStartValue = "";
	FastingGlucoseNormalValue = "";
	FastingGlucoseAcceptableValue = "";
	FastingGlucoseHighValue = "";
	FastingGlucoseEndValue = "";

	// Post Prandial

	PostPrandialGlucoseStartValue = "";
	PostPrandialGlucoseNormalValue = "";
	PostPrandialGlucosePreDiabetesValue = "";
	PostPrandialGlucoseDiabetesValue = "";
	PostPrandialGlucoseEndValue = "";


	// Tests Not Taken Functionality
	Spo2NotTaken = "";
	bodyTemperatureNotTaken = "";
	BMINotTaken = "";
	BloodPressureNotTaken = "";
	FullBodyBMCNotTaken = "";
	ECGTestNotTaken = "";

	// Invasive Test Status
	GlucoseRandomTestStatus = "";
	GlucoseFastingTestStatus = "";
	GlucosePostPrandialTestStatus = "";
	HemoglobinTestStatus = "";
	TotalCholesterolTestStatus = "";
	HDLTestStatus = "";
	LDLTestStatus = "";
	TriglyceridesTestStatus = "";

    //basic vital details properties.
    weight = "";
    targetWeight = "";
    weightControl = "";
    weightTestTaken = false;
    bmi = "";
    bmiTestTaken = false;
	systolic = "";
	diastolic = "";
	pulse = "";
	bpTestTaken = false;
	oxygenLevel = "";
	spo2TestTaken = false;
	bodyTemperature = "";
	temperatureTestTaken = false;
	fatPercent = "";
	halfBodyBmcTestTaken = false;
	
	// invasiveTesttaken =  false;
	// hemoglobinTestTaken = false;
	// lipidTestTaken = false;
	// glucoseTestTaken = false;
	// dengueTestTaken = false;
	// malariaTestTaken = false;
	// hivTestTaken = false;
	// hcvTestTaken = false;
	// syphilisTestTaken = false;
	// troponinTestTaken = false;
	// pregnancyTestTaken = false;

	glucoseTestTaken = false;
	glucose_random = "";
	glucose_fasting = "";
	glucose_post_prandial = "";
	hemoglobinTestTaken = false;
	hemoglobin = "";
	// dengue_result = "";
	// malaria = "";
	// hiv = "";
	dengueTestTaken =  false;
	dengue_IgG = "";
	dengue_IgM = "";
	malariaTestTaken = false;
	malaria_p_v = "";
	malaria_p_f = "";
	hivTestTaken = false;
	hiv_I = "";
	hiv_II = "";
	hcvTestTaken = false;
	hcv = "";
	troponinTestTaken = false;
	troponin = "";
	syphilisTestTaken = false;
	syphilis = "";
	pregnancyTestTaken = false;
	pregnancy = "";
	lipid_profileTestTaken = false;
	lipid_profile_tc = "";
	lipid_profile_hg = "";
	lipid_profile_ldl = "";
	lipid_profile_tg = "";
	urineTestTaken = false;
	urine_leukocytes = "";
	urine_nitrite = "";
	urine_urobilinogen = "";
	urine_protein = "";
	urine_ph = "";
	urine_blood = "";
	urine_specific_gravity = "";
	urine_ketone = "";
	urine_bilirubin = "";
	urine_glucose = "";

	//full body bmc vital details properties.
	basalMetabolicRate = "";
	bodyCellMass = "";
	bodyFatMass = "";
	boneMineralContent = "";
	extraCellularWater = "";
	intraCellularWater = "";
	mineralContent = "";
	percentBodyFat = "";
	proteinContent = "";
	skeletalMuscleMass = "";
	visceralFat = "";
	waistToHeightRatio = "";
	waistToHipRatio = "";
	fullBodyBmcTestTaken = false;

	//Ecg common details properties.
	PRInterval = "";
	QRSInterval = "";
	QTCInterval = "";
	heartRate = "";
	
	//Ecg three lead properties.
	threeLead1GraphImage = "";
	threeLead2GraphImage = "";
	threeLead3GraphImage = "";
	ecgThreeLeadTestTaken = false;

	//Ecg six lead properties.
	sixLead1GraphImage = "";
	sixLead2GraphImage = "";
	sixLead3GraphImage = "";
	sixLeadAVRGraphImage = "";
	sixLeadAVLGraphImage = "";
	sixLeadAVFGraphImage = "";
	ecgSixLeadTestTaken = false;

	//status bar properties.
	bmiStatusBarValue = 0;
	systolicStatusBarValue = 0;
	dystolicStatusBarValue = 0;
	pulseStatusBarValue = 0;
	oxygenLevelStatusBarValue = 0;
	temperatureStatusBarValue = 0;
	halfBodyBmcStatusBarValue = 0;
	fullBodyBmcStatusBarValue = 0;
	extraCellularWaterStatusBarValue = 0;
	intraCellularWaterStatusBarValue = 0;
	mineralContentStatusBarValue = 0;
	proteinContentStatusBarValue = 0;

	//Vital Value Units & normal range.
	weightUnits = "";
	bodyCellMassUnits = "";
	skeletalMuscleMassUnits = "";
	boneMineralContentUnits = "";
	waistToHeightRatioUnits = "";
	waistToHipRatioUnits = "";
	basalMetabolicRateUnits = "";
	visceralFatUnits = "";
	bodyFatMassUnits = "";
	bodyCellMassNR = "";
	skeletalMuscleMassNR = "";
	boneMineralContentNR = "";
	waistToHeightRatioNR = "";
	waistToHipRatioNR = "";
	basalMetabolicRateNR = "";
	visceralFatNR = "";
	bodyFatMassNR = "";
	PRIntervalUnits = "";
	QRSIntervalUnits = "";
	QTCIntervalUnits = "";
	heartRateUnits = "";
	PRIntervalNR = "";
	QRSIntervalNR = "";
	QTCIntervalNR = "";
	heartRateNR = "";
	hemoglobinUnits = "";
	glucose_randomUnits = "";
	lipid_profileUnits = "";
	urine_leukocytesUnits = "";
	urine_bloodUnits = "";
	urineUnits = "";
	hemoglobinNR = "";
	glucoseNR = "";
	lipid_profile_tcNR = "";
	lipid_profile_ldlNR = "";
	lipid_profile_hgNR = "";
	lipid_profile_tgNR = "";

	//Diet Recommendation Properties.
	exerciseType = "";
	energyNeeded = "";
	exerciseTypeTitle = "";
	energyNeededTitle = "print.energyneeded";
	dietRecommended = "";
	otherRecommendation = "";
	restrictions = "";
	importantNotesTitle = "print.note";
	importantNotesDetail = "print.noteDetails";

	//Others
	disclaimerNotes = "print.disclaimer";
	ihlLogo = new PrintChildContants().logo;

	constructor(value, data){
		console.log(value,data);
		let filterServiceObjects = higiServices._invokeQueue.map(item => { return item.filter(item => { return typeof item == "object" })});
		for (let key in filterServiceObjects) {
			let obj = filterServiceObjects[key].find(item => {return item});
			if (obj[0] == "HigiKioskUtilitiesService") {
				let obj2 = obj[1].find(item => { return typeof item =="function" });
				this.kioskUtilities = obj2();
				break;
			};
		};
		console.log(this.kioskUtilities);
		switch(value){
			case "vitals":
				this.initVitalsPrint(data);
				break;
			case "prescriptions":
				this.initPrescriptionsPrint(data);
				break;
			case "invoice":
				this.initInvoicePrint(data);
				break;
			default:
				console.log("No cases matched for print constants initiate");
				break;
		};
	};

	initVitalsPrint(data){
		console.log(data);
		this.populateUserBasicDetails(data);
		this.populateBasicVitalDetails(data);
		this.populateFullBodyBMCDetails(data);
		this.populateEcgCommonDetails(data);
		this.populateEcgThreeLeadDetails(data);
		this.populateSixLeadDetails(data);
		this.populateStatusBarValues(data);
		this.populateDietRecommendationDetails(data);
		this.populateInvasiveDetails(data);
	};

	// This is For Kolors A4Template
	energyNeedUnitFineTune(value){
		console.log(value);
		if(value.includes("Kcals")){
			// console.log("InsideIF");
			value = value.replace("Kcals", " Cal");
		}else{
			// console.log("Insideelse");
		}
		console.log(value);
		return value;
	};

	populateUserBasicDetails(obj){
		let basicDetails = obj.basicDetails;

		// let idealBodyWeight = obj.idealBodyWeight;
		let BCAHistory = obj.bcaVitalHistory;
		this.BCAVitalHistory = obj.bcaVitalHistory;
		console.log(BCAHistory);


		if(BCAHistory != "" && BCAHistory != undefined){
			if(BCAHistory.weight.length > 0){
				this.BCAHistoryWeightLength = BCAHistory['weight'].length;
	
				this.WeightMaxValue = BCAHistory.weight[0];
				this.WeightMinValue = BCAHistory.weight[0];
				for (var i = 0; i < BCAHistory.weight.length; i++) {
					if(i == 0){
						this.userWeight = parseFloat(BCAHistory.weight[0]).toFixed(2);
						// console.log(this.userWeight)
					}
					if(typeof(BCAHistory.weight[i]) == "string"){
						BCAHistory.weight[i] = parseFloat(BCAHistory.weight[i]).toFixed(2);
					}else{
						BCAHistory.weight[i] = (BCAHistory.weight[i]).toFixed(2);
					}
	
					
					if(this.WeightMaxValue <= BCAHistory.weight[i]){
						this.WeightMaxValue = BCAHistory.weight[i];
					}
					if(this.WeightMinValue >= BCAHistory.weight[i]){
						this.WeightMinValue = BCAHistory.weight[i];
					}
				}

				this.findweightDifference = this.WeightMaxValue - this.WeightMinValue;
				this.weightDifference = this.findweightDifference.toFixed(2);

				if(typeof(this.WeightMinValue) == "string"){
					this.WeightMinValue = parseInt(this.WeightMinValue);
				}
				if(typeof(this.WeightMaxValue) == "string"){
					this.WeightMaxValue = parseInt(this.WeightMaxValue);
				}
				if( this.weightDifference >0 && this.weightDifference <= 5 ){				
						this.WeightMinValue = this.WeightMinValue - 30;
						this.WeightMaxValue = this.WeightMaxValue + 30;
				}else if(this.weightDifference >5 && this.weightDifference <= 10){
						this.WeightMinValue = this.WeightMinValue - 30;
						this.WeightMaxValue = this.WeightMaxValue + 30;
				}else if(this.weightDifference >10 && this.weightDifference <= 15){
						this.WeightMinValue = this.WeightMinValue - 50;
						this.WeightMaxValue = this.WeightMaxValue + 50;
				}else if(this.weightDifference >15 && this.weightDifference <= 20){
						this.WeightMinValue = this.WeightMinValue - 70;
						this.WeightMaxValue = this.WeightMaxValue + 70;
				}else if(this.weightDifference >20){
						this.WeightMinValue = this.WeightMinValue - 90;
						this.WeightMaxValue = this.WeightMaxValue + 90;
				}
				
			}else{
			this.BCAHistoryWeightLength = 0;
		}
		
		if(BCAHistory.vf.length > 0){
			// alert(BCAHistory.vf.length);
			this.BCAHistorylength = BCAHistory['vf'].length;
			// console.log(this.BCAHistorylength); 
			this.VisceralFatMaxValue = BCAHistory.vf[0];
			this.VisceralFatMinValue = BCAHistory.vf[0];
			for (var i = 0; i < BCAHistory.vf.length; i++) {
				BCAHistory.vf[i] = parseFloat(BCAHistory.vf[i]).toFixed(2);
				if(this.VisceralFatMaxValue <= BCAHistory.vf[i]){
					this.VisceralFatMaxValue = BCAHistory.vf[i];
				}
				if(this.VisceralFatMinValue >= BCAHistory.vf[i]){
					this.VisceralFatMinValue = BCAHistory.vf[i];
				}
			}

			this.findVfDifference = this.VisceralFatMaxValue - this.VisceralFatMinValue;
			this.vfDifference = this.findVfDifference.toFixed(2);

			if(typeof(this.VisceralFatMinValue) == "string"){
				this.VisceralFatMinValue = parseInt(this.VisceralFatMinValue);
			}

			if(typeof(this.VisceralFatMaxValue) == "string"){
				this.VisceralFatMaxValue = parseInt(this.VisceralFatMaxValue);
			}

			if( this.vfDifference >0 && this.vfDifference <= 5 ){			
				this.VisceralFatMinValue = this.VisceralFatMinValue - 30;
				this.VisceralFatMaxValue = this.VisceralFatMaxValue + 30;
			}else if(this.vfDifference >5 && this.vfDifference <= 10){
				this.VisceralFatMinValue = this.VisceralFatMinValue - 50;
				this.VisceralFatMaxValue = this.VisceralFatMaxValue + 50;
			}else if(this.vfDifference >10 && this.vfDifference <= 15){
				this.VisceralFatMinValue = this.VisceralFatMinValue - 70;
				this.VisceralFatMaxValue = this.VisceralFatMaxValue + 70;
			}else if(this.vfDifference >15 && this.vfDifference <= 20){
				this.VisceralFatMinValue = this.VisceralFatMinValue - 90;
				this.VisceralFatMaxValue = this.VisceralFatMaxValue + 90;
			}else if(this.vfDifference >20){
				this.VisceralFatMinValue = this.VisceralFatMinValue - 90;
				this.VisceralFatMaxValue = this.VisceralFatMaxValue + 90;
			}
		}else{
			this.BCAHistorylength = 0;
		}

		if(BCAHistory.pbf.length > 0){
			// alert(BCAHistory.pbf.length);
			// this.BCAHistorypbflength = BCAHistory['pbf'].length;
			// console.log(this.BCAHistorypbflength); 
			// this.PercentBodyFatMinValue = Math.min(BCAHistory.pbf)-30;
			// this.PercentBodyFatMaxValue = Math.max(BCAHistory.pbf)+30;

			this.BCAHistorypbflength = BCAHistory['pbf'].length;

			this.PercentBodyFatMaxValue = BCAHistory.pbf[0];
			this.PercentBodyFatMinValue = BCAHistory.pbf[0];
			for (var i = 0; i < BCAHistory.pbf.length; i++) {
				BCAHistory.pbf[i] = parseFloat(BCAHistory.pbf[i]).toFixed(2);
				if(this.PercentBodyFatMaxValue <= BCAHistory.pbf[i]){
					this.PercentBodyFatMaxValue = BCAHistory.pbf[i];
				}
				if(this.PercentBodyFatMinValue >= BCAHistory.pbf[i]){
					this.PercentBodyFatMinValue = BCAHistory.pbf[i];
				}
			}

			this.findPbfDifference = this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue;
			this.pbfDifference = this.findPbfDifference.toFixed(2);

			if(typeof(this.PercentBodyFatMinValue) == "string"){
				this.PercentBodyFatMinValue = parseInt(this.PercentBodyFatMinValue);
			}
			if(typeof(this.PercentBodyFatMaxValue) == "string"){
				this.PercentBodyFatMaxValue = parseInt(this.PercentBodyFatMaxValue);
			}

			
			if( this.pbfDifference >0 && this.pbfDifference <= 5 ){				
				this.PercentBodyFatMinValue = this.PercentBodyFatMinValue - 30;
				this.PercentBodyFatMaxValue = this.PercentBodyFatMaxValue + 30;
			}else if(this.pbfDifference >5 && this.pbfDifference <= 10){
				this.PercentBodyFatMinValue = this.PercentBodyFatMinValue - 30;
				this.PercentBodyFatMaxValue = this.PercentBodyFatMaxValue + 30;
			}else if(this.pbfDifference >10 && this.pbfDifference <= 15){
				this.PercentBodyFatMinValue = this.PercentBodyFatMinValue - 50;
				this.PercentBodyFatMaxValue = this.PercentBodyFatMaxValue + 50;
			}else if(this.pbfDifference >15 && this.pbfDifference <= 20){
				this.PercentBodyFatMinValue = this.PercentBodyFatMinValue - 70;
				this.PercentBodyFatMaxValue = this.PercentBodyFatMaxValue + 70;
			}else if(this.pbfDifference >20){
				this.PercentBodyFatMinValue = this.PercentBodyFatMinValue - 90;
				this.PercentBodyFatMaxValue = this.PercentBodyFatMaxValue + 90;
			}

		}else{
			this.BCAHistorypbflength = 0;
		}

		if(BCAHistory.bmi.length > 0){
			// alert(BCAHistory.bmi.length);

			// this.BCAHistoryBMILength = BCAHistory['bmi'].length;
			// for (var i = 0; i < BCAHistory.bmi.length; i++) {
			// 	BCAHistory.bmi[i] = BCAHistory.bmi[i].toFixed(1);
			// }
			// console.log(this.BCAHistoryBMILength); 
			// this.BMIMinValue = Math.min(BCAHistory.bmi)-70;
			// this.BMIMaxValue =  Math.max(BCAHistory.bmi)+70;

			this.BCAHistoryBMILength = BCAHistory['bmi'].length;

			this.BMIMaxValue = BCAHistory.bmi[0];
			this.BMIMinValue = BCAHistory.bmi[0];
			for (var i = 0; i < BCAHistory.bmi.length; i++) {
				BCAHistory.bmi[i] = parseFloat(BCAHistory.bmi[i]).toFixed(2);
				if(this.BMIMaxValue <= BCAHistory.bmi[i]){
					this.BMIMaxValue = BCAHistory.bmi[i];
				}
				if(this.BMIMinValue >= BCAHistory.bmi[i]){
					this.BMIMinValue = BCAHistory.bmi[i];
				}
			}

			this.findBmiDifference = this.BMIMaxValue -  this.BMIMinValue;
			this.bmiDifference = this.findBmiDifference.toFixed(2);

			if(typeof(this.BMIMinValue) == "string"){
				this.BMIMinValue = parseInt(this.BMIMinValue);
			}

			if(typeof(this.BMIMaxValue) == "string"){
				this.BMIMaxValue = parseInt(this.BMIMaxValue);
			}

			if( this.bmiDifference >0 && this.bmiDifference <= 5 ){				
				this.BMIMinValue = this.BMIMinValue - 30;
				this.BMIMaxValue = this.BMIMaxValue + 30;
			}else if(this.bmiDifference >5 && this.bmiDifference <= 10){
				this.BMIMinValue = this.BMIMinValue - 30;
				this.BMIMaxValue = this.BMIMaxValue + 30;
			}else if(this.bmiDifference >10 && this.bmiDifference <= 15){
				this.BMIMinValue = this.BMIMinValue - 50;
				this.BMIMaxValue = this.BMIMaxValue + 50;
			}else if(this.bmiDifference >15 && this.bmiDifference <= 20){
				this.BMIMinValue = this.BMIMinValue - 70;
				this.BMIMaxValue = this.BMIMaxValue + 70;
			}else if(this.bmiDifference >20){
				this.BMIMinValue = this.BMIMinValue - 90;
				this.BMIMaxValue = this.BMIMaxValue + 90;
			}


		}else{
			this.BCAHistoryBMILength = 0;
		}
	}

		this.userName = `${basicDetails['userFirstName']} ${basicDetails['userLastName']}`;
		this.userHeight = (basicDetails['userHeight'] && !isNaN(basicDetails['userHeight'])) ?  `${this.kioskUtilities.convertToFeetFoot(basicDetails['userHeight'])}.${this.kioskUtilities.convertToFeetInches(basicDetails['userHeight'])}` : "N/A";
		this.userGender = (basicDetails['userGender'] && basicDetails['userGender'].trim().length > 0) ? ((basicDetails['userGender'].toLowerCase() == 'm' || basicDetails['userGender'].toLowerCase() == 'male') ? 'Male' : 'Female') : "N/A";
		this.userAge = (basicDetails['userAge'] && basicDetails['userAge'].toString().trim().length > 0) ? `${this.kioskUtilities.getAge(basicDetails['userAge'])}` : "N/A";
		this.userEmailId = (basicDetails['userEmail'] && basicDetails['userEmail'].toString().trim().length > 0) ? basicDetails['userEmail'] : "N/A";
		this.userMobileNumber = (basicDetails['userMobileNumber'] && !isNaN(basicDetails['userMobileNumber']) && basicDetails['userMobileNumber'].toString().trim().length == 10) ? basicDetails['userMobileNumber'] : "N/A";
		this.date = (basicDetails['date'])? (`${this.day[new Date(basicDetails['date']).getDay()]} ${this.month[new Date(basicDetails['date']).getMonth()]} ${`${new Date(basicDetails['date']).getDate()}`.padStart(2, '0')} ${new Date(basicDetails['date']).getFullYear()} ${new Date(basicDetails['date']).toLocaleTimeString('en-US')}`) : "N/A";
		this.printLogo = basicDetails['printLogo'];
		// console.log("gender "+this.userGender);
		/*console.log("name "+this.userName);
		console.log("height "+this.userHeight);
		console.log("gender "+this.userGender);
		console.log("age "+this.userAge);
		console.log("email "+this.userEmailId);
		console.log("mob "+this.userMobileNumber);
		console.log("date "+this.date);*/


		// This Below part is For Kolors Template 

		// Ideal Body Weight
		this.idealBodyWeight = this.kioskUtilities.getHeightInInches(basicDetails['userHeight'],basicDetails['userGender']);


		// Converting Foot to Cms for Kolors Organization A4 Template
		let convertfoot = this.kioskUtilities.convertToFeetFoot(basicDetails['userHeight']) * 12;
		let addingRemainingInches = convertfoot + this.kioskUtilities.convertToFeetInches(basicDetails['userHeight']);
		this.converionoffeetocms = addingRemainingInches * 2.54;
		this. KolorsUserheightInCms = Math.round(this.converionoffeetocms);
		this.KolorsHeightUnit = "Cms";

		// This is For User's Body Composition History Details 

		// 0th index Recent Test  [ Index is shown like the ascending order of the previous tests i.e 0 is previous test and 4th index is last 5th test ]

		if(BCAHistory != "" && BCAHistory != undefined){
			if(BCAHistory['dateTime']['0'] != undefined){
				let Dateof0thindex = BCAHistory['dateTime']['0'];
				// console.log(Dateof0thindex);
	
				let SplitDate0 = Dateof0thindex.split(" ");
	
				// Extract the local date components
				this.localDate0 = SplitDate0[0] + " " + SplitDate0[1] + " " + SplitDate0[2];
	
				// Extract the local time components
				this.localTime0 = SplitDate0[3] + " " + SplitDate0[4];
			}else{
				this.localDate0 = "";
				this.localTime0 = "";
			}
				
	
				// 1st Index Date
	
				if(BCAHistory['dateTime']['1'] != undefined){
					let Dateof1stindex = BCAHistory['dateTime']['1'];
				// console.log(Dateof1stindex);
				
				let SplitDate1 = Dateof1stindex.split(" ");
	
				// Extract the local date components
				this.localDate1 = SplitDate1[0] + " " + SplitDate1[1] + " " + SplitDate1[2];
	
				// Extract the local time components
				this.localTime1 = SplitDate1[3] + " " + SplitDate1[4];
					
				}else{
					this.localDate1 = "";
					this.localTime1 = "";
				}
	
				// 2nd Index Date
	
				if(BCAHistory['dateTime']['2'] != undefined){
					let Dateof2ndindex = BCAHistory['dateTime']['2'];
					// console.log(Dateof2ndindex);
				
					let SplitDate2 = Dateof2ndindex.split(" ");
	
				// Extract the local date components
				this.localDate2 = SplitDate2[0] + " " + SplitDate2[1] + " " + SplitDate2[2];
	
				// Extract the local time components
				this.localTime2 = SplitDate2[3] + " " + SplitDate2[4];
	
				}else{
					this.localDate2 = "";
					this.localTime2 = "";
				}
	
				if(BCAHistory['dateTime']['3'] != undefined){
					let Dateof3rdindex = BCAHistory['dateTime']['3'];
				// console.log(Dateof3rdindex);
				
				
					let SplitDate3 = Dateof3rdindex.split(" ");
	
				// Extract the local date components
				this.localDate3 = SplitDate3[0] + " " + SplitDate3[1] + " " + SplitDate3[2];
	
				// Extract the local time components
				this.localTime3 = SplitDate3[3] + " " + SplitDate3[4];
	
				}else{
					this.localDate3 = "";
					this.localTime3 = "";
				}
	
				// 4th Index Date
	
				if(BCAHistory['dateTime']['4'] != undefined){
					let Dateof4thindex = BCAHistory['dateTime']['4'];
					// console.log(Dateof4thindex);
	
					let SplitDate4 = Dateof4thindex.split(" ");
	
				// Extract the local date components
				this.localDate4 = SplitDate4[0] + " " + SplitDate4[1] + " " + SplitDate4[2];
	
				// Extract the local time components
				this.localTime4 = SplitDate4[3] + " " + SplitDate4[4];
	
				}else{
					this.localDate4 = "";
					this.localTime4 = "";
				}
		

			// End of Test Taken Date and Time Filtration ////////////////////////

			// Start of Weight History Value

			if(BCAHistory['weight']['0'] != undefined){
				this.WeightHistory0thIndex = BCAHistory['weight']['0'];
				if(typeof(this.WeightHistory0thIndex) == "string"){
					this.WeightHistory0thIndex = parseInt(this.WeightHistory0thIndex);
				}
				let findYAxisforWeight = ((this.WeightMaxValue - this.WeightMinValue) / 10);
				this.WeightYAxis[0] = 100 - Math.abs(((this.WeightMinValue - this.WeightHistory0thIndex) / findYAxisforWeight * 10))
				// console.log(this.WeightHistory0thIndex);
				// console.log(this.WeightYAxis[0]);
				// console.log(typeof(this.WeightHistory0thIndex));
				// console.log(typeof this.WeightYAxis[0]);
			}else{
				this.WeightYAxis[0] = 0;
			}

			if(BCAHistory['weight']['1'] != undefined){
				this.WeightHistory1stIndex = BCAHistory['weight']['1'];
				if(typeof(this.WeightHistory1stIndex) == "string"){
					this.WeightHistory1stIndex = parseInt(this.WeightHistory1stIndex);
				}
				let findYAxisforWeight = ((this.WeightMaxValue - this.WeightMinValue) / 10);
				this.WeightYAxis[1] = 100 - Math.abs(((this.WeightMinValue - this.WeightHistory1stIndex) / findYAxisforWeight * 10))
			}else{
				this.WeightYAxis[1] = 0;
			}

			if(BCAHistory['weight']['2'] != undefined){
				this.WeightHistory2ndIndex = BCAHistory['weight']['2'];
				if(typeof(this.WeightHistory2ndIndex) == "string"){
					this.WeightHistory2ndIndex = parseInt(this.WeightHistory2ndIndex);
				}
				let findYAxisforWeight = ((this.WeightMaxValue - this.WeightMinValue) / 10);
				this.WeightYAxis[2] = 100 - Math.abs(((this.WeightMinValue - this.WeightHistory2ndIndex) / findYAxisforWeight * 10))
			}else{
				this.WeightYAxis[2] = 0;
			}

			if(BCAHistory['weight']['3'] != undefined){
				this.WeightHistory3rdIndex = BCAHistory['weight']['3'];
				if(typeof(this.WeightHistory3rdIndex) == "string"){
					this.WeightHistory3rdIndex = parseInt(this.WeightHistory3rdIndex);
				}
				let findYAxisforWeight = ((this.WeightMaxValue - this.WeightMinValue) / 10);
				this.WeightYAxis[3] = 100 - Math.abs(((this.WeightMinValue - this.WeightHistory3rdIndex) / findYAxisforWeight * 10))
			}else{
				this.WeightYAxis[3] = 0;
			}

			if(BCAHistory['weight']['4'] != undefined){
				this.WeightHistory4thIndex = BCAHistory['weight']['4'];
				if(typeof(this.WeightHistory4thIndex) == "string"){
					this.WeightHistory4thIndex = parseInt(this.WeightHistory4thIndex);
				}
				let findYAxisforWeight = ((this.WeightMaxValue - this.WeightMinValue) / 10);
				this.WeightYAxis[4] = 100 - Math.abs(((this.WeightMinValue - this.WeightHistory4thIndex) / findYAxisforWeight * 10))
			}else{
				this.WeightYAxis[4] = 0;
			}

			// Start of Visceral Fat History Value

			if(BCAHistory['vf']['0'] != undefined){
				this.VisceralFatHistory0thIndex = BCAHistory['vf']['0'];
				if(typeof(this.VisceralFatHistory0thIndex) == "string"){
					this.VisceralFatHistory0thIndex = parseInt(this.VisceralFatHistory0thIndex);
				}
				// console.log(this.VisceralFatHistory0thIndex);
				// console.log(typeof(this.VisceralFatHistory0thIndex));
				let findYAxisforVf = ((this.VisceralFatMaxValue - this.VisceralFatMinValue) / 10);
				// console.log(typeof(findYAxisforVf));
				// console.log(typeof(this.VisceralFatMaxValue));
				// console.log(typeof(this.VisceralFatMinValue));

				// console.log(findYAxisforVf);
				// console.log(this.VisceralFatMaxValue);
				// console.log(this.VisceralFatMinValue);

				// console.log(findYAxisforVf * 10);
				// console.log((this.VisceralFatMinValue - this.VisceralFatMaxValue));
				// console.log(((this.VisceralFatMinValue - this.VisceralFatHistory0thIndex) / findYAxisforVf * 10));
				this.VfYaxis[0] = 100 - Math.abs(((this.VisceralFatMinValue - this.VisceralFatHistory0thIndex) / findYAxisforVf * 10))

				// console.log(this.VfYaxis[0]);
				// console.log("this.VfYaxis",this.VfYaxis[0]);

				// console.log("this.VisceralFatHistory0thIndex",this.VisceralFatHistory0thIndex);
			}else{
				this.VfYaxis[0] = 0;
			}



			if(BCAHistory['vf']['1'] != undefined){
				this.VisceralFatHistory1stIndex = BCAHistory['vf']['1'];

				if(typeof(this.VisceralFatHistory1stIndex) == "string"){
					this.VisceralFatHistory1stIndex = parseInt(this.VisceralFatHistory1stIndex);
				}

				let findYAxisforVf = ((this.VisceralFatMaxValue - this.VisceralFatMinValue) / 10);

				this.VfYaxis[1] = 100 - Math.abs(((this.VisceralFatMinValue - this.VisceralFatHistory1stIndex) / findYAxisforVf * 10))
				// console.log("this.VfYaxis",this.VfYaxis[1]);

				// console.log("this.VisceralFatHistory1stIndex",this.VisceralFatHistory1stIndex);
			}else{
				this.VfYaxis[1] = 0;
			}

			if(BCAHistory['vf']['2'] != undefined){
				this.VisceralFatHistory2ndIndex = BCAHistory['vf']['2'];

				if(typeof(this.VisceralFatHistory2ndIndex) == "string"){
					this.VisceralFatHistory2ndIndex = parseInt(this.VisceralFatHistory2ndIndex);
				}

				let findYAxisforVf = ((this.VisceralFatMaxValue - this.VisceralFatMinValue) / 10);

				this.VfYaxis[2] = 100 - Math.abs(((this.VisceralFatMinValue - this.VisceralFatHistory2ndIndex) / findYAxisforVf * 10))
				// console.log("this.VfYaxis",this.VfYaxis[2]);

				// console.log("this.VisceralFatHistory2ndIndex",this.VisceralFatHistory2ndIndex);
			}else{
				this.VfYaxis[2] = 0;
			}

			if(BCAHistory['vf']['3'] != undefined){
				this.VisceralFatHistory3rdIndex = BCAHistory['vf']['3'];

				if(typeof(this.VisceralFatHistory3rdIndex) == "string"){
					this.VisceralFatHistory3rdIndex = parseInt(this.VisceralFatHistory3rdIndex);
				}

				let findYAxisforVf = ((this.VisceralFatMaxValue - this.VisceralFatMinValue) / 10);

				this.VfYaxis[3] = 100 - Math.abs(((this.VisceralFatMinValue - this.VisceralFatHistory3rdIndex) / findYAxisforVf * 10))
				// console.log("this.VfYaxis",this.VfYaxis[3]);

				// console.log("this.VisceralFatHistory3rdIndex",this.VisceralFatHistory3rdIndex);
			}else{
				this.VfYaxis[3] = 0;
			}

			if(BCAHistory['vf']['4'] != undefined){
				this.VisceralFatHistory4thIndex = BCAHistory['vf']['4'];

				if(typeof(this.VisceralFatHistory4thIndex) == "string"){
					this.VisceralFatHistory4thIndex = parseInt(this.VisceralFatHistory4thIndex);
				}

				let findYAxisforVf = ((this.VisceralFatMaxValue - this.VisceralFatMinValue) / 10);
				this.VfYaxis[4] = 100 - Math.abs(((this.VisceralFatMinValue - this.VisceralFatHistory4thIndex) / findYAxisforVf * 10))
			}else{
				this.VfYaxis[4] = 0;
			}

			// Start of Percent Body Fat History Value

			if(BCAHistory['pbf']['0'] != undefined){
				this.PercentBodyFatHistory0thIndex = BCAHistory['pbf']['0'];

				if(typeof(this.PercentBodyFatHistory0thIndex) == "string"){
					this.PercentBodyFatHistory0thIndex = parseInt(this.PercentBodyFatHistory0thIndex);
				}

				let findYAxisforpbf = ((this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue)/10);
				this.pbfYAxis[0] = 100 - Math.abs(((this.PercentBodyFatMinValue - this.PercentBodyFatHistory0thIndex) / findYAxisforpbf * 10))
			}else{
				this.pbfYAxis[0] = 0;
			}

			if(BCAHistory['pbf']['1'] != undefined){
				this.PercentBodyFatHistory1stIndex = BCAHistory['pbf']['1'];

				if(typeof(this.PercentBodyFatHistory1stIndex) == "string"){
					this.PercentBodyFatHistory1stIndex = parseInt(this.PercentBodyFatHistory1stIndex);
				}

				let findYAxisforpbf = ((this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue)/10);
				this.pbfYAxis[1] = 100 - Math.abs(((this.PercentBodyFatMinValue - this.PercentBodyFatHistory1stIndex) / findYAxisforpbf * 10))
			}else{
				this.pbfYAxis[1] = 0;
			}

			if(BCAHistory['pbf']['2'] != undefined){
				this.PercentBodyFatHistory2ndIndex = BCAHistory['pbf']['2'];

				if(typeof(this.PercentBodyFatHistory2ndIndex) == "string"){
					this.PercentBodyFatHistory2ndIndex = parseInt(this.PercentBodyFatHistory2ndIndex);
				}

				let findYAxisforpbf = ((this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue)/10);
				this.pbfYAxis[2] = 100 - Math.abs(((this.PercentBodyFatMinValue - this.PercentBodyFatHistory2ndIndex) / findYAxisforpbf * 10))
			}else{
				this.pbfYAxis[2] = 0;
			}

			if(BCAHistory['pbf']['3'] != undefined){
				this.PercentBodyFatHistory3rdIndex = BCAHistory['pbf']['3'];

				if(typeof(this.PercentBodyFatHistory3rdIndex) == "string"){
					this.PercentBodyFatHistory3rdIndex = parseInt(this.PercentBodyFatHistory3rdIndex);
				}

				let findYAxisforpbf = ((this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue)/10);
				this.pbfYAxis[3] = 100 - Math.abs(((this.PercentBodyFatMinValue - this.PercentBodyFatHistory3rdIndex) / findYAxisforpbf * 10))
			}else{
				this.pbfYAxis[3] = 0;
			}

			if(BCAHistory['pbf']['4'] != undefined){
				this.PercentBodyFatHistory4thIndex = BCAHistory['pbf']['4'];

				if(typeof(this.PercentBodyFatHistory4thIndex) == "string"){
					this.PercentBodyFatHistory4thIndex = parseInt(this.PercentBodyFatHistory4thIndex);
				}

				let findYAxisforpbf = ((this.PercentBodyFatMaxValue - this.PercentBodyFatMinValue)/10);
				this.pbfYAxis[4] = 100 - Math.abs(((this.PercentBodyFatMinValue - this.PercentBodyFatHistory4thIndex) / findYAxisforpbf * 10))
			}else{
				this.pbfYAxis[4] = 0;
			}

			// Start of BMI History Value

			if(BCAHistory['bmi']['0'] != undefined){
				this.BMIHistory0thIndex = BCAHistory['bmi']['0'];

				if(typeof(this.BMIHistory0thIndex) == "string"){
					this.BMIHistory0thIndex = parseInt(this.BMIHistory0thIndex);
				}

				let findYAxisforbmi = ((this.BMIMaxValue - this.BMIMinValue)/10);
				this.BMIYAxis[0] = 100 - Math.abs(((this.BMIMinValue - this.BMIHistory0thIndex) / findYAxisforbmi * 10));
			}else{
				this.BMIYAxis[0] = 0;
			}


			if(BCAHistory['bmi']['1'] != undefined){
				this.BMIHistory1stIndex = BCAHistory['bmi']['1'];

				if(typeof(this.BMIHistory1stIndex) == "string"){
					this.BMIHistory1stIndex = parseInt(this.BMIHistory1stIndex);
				}

				let findYAxisforbmi = ((this.BMIMaxValue - this.BMIMinValue)/10);
				this.BMIYAxis[1] = 100 - Math.abs(((this.BMIMinValue - this.BMIHistory1stIndex) / findYAxisforbmi * 10));
			}else{
				this.BMIYAxis[1] = 0;
			}

			if(BCAHistory['bmi']['2'] != undefined){
				this.BMIHistory2ndIndex = BCAHistory['bmi']['2'];

				if(typeof(this.BMIHistory2ndIndex) == "string"){
					this.BMIHistory2ndIndex = parseInt(this.BMIHistory2ndIndex);
				}

				let findYAxisforbmi = ((this.BMIMaxValue - this.BMIMinValue)/10);
				this.BMIYAxis[2] = 100 - Math.abs(((this.BMIMinValue - this.BMIHistory2ndIndex) / findYAxisforbmi * 10));
			}else{
				this.BMIYAxis[2] = 0;
			}

			if(BCAHistory['bmi']['3'] != undefined){
				this.BMIHistory3rdIndex = BCAHistory['bmi']['3'];

				if(typeof(this.BMIHistory3rdIndex) == "string"){
					this.BMIHistory3rdIndex = parseInt(this.BMIHistory3rdIndex);
				}

				let findYAxisforbmi = ((this.BMIMaxValue - this.BMIMinValue)/10);
				this.BMIYAxis[3] = 100 - Math.abs(((this.BMIMinValue - this.BMIHistory3rdIndex) / findYAxisforbmi * 10));
			}else{
				this.BMIYAxis[3] = 0;
			}

			if(BCAHistory['bmi']['4'] != undefined){
				this.BMIHistory4thIndex = BCAHistory['bmi']['4'];

				if(typeof(this.BMIHistory4thIndex) == "string"){
					this.BMIHistory4thIndex = parseInt(this.BMIHistory4thIndex);
				}

				let findYAxisforbmi = ((this.BMIMaxValue - this.BMIMinValue)/10);
				this.BMIYAxis[4] = 100 - Math.abs(((this.BMIMinValue - this.BMIHistory4thIndex) / findYAxisforbmi * 10));
			}else{
				this.BMIYAxis[4] = 0;
			}
		}else{

			this.localDate0 = "";
			this.localTime0 = "";

			this.localDate1 = "";
			this.localTime1 = "";

			this.localDate2 = "";
			this.localTime2 = "";

			this.localDate3 = "";
			this.localTime3 = "";

			this.localDate4 = "";
			this.localTime4 = "";

			this.WeightYAxis[0] = 0;
			this.WeightYAxis[1] = 0;
			this.WeightYAxis[2] = 0;
			this.WeightYAxis[3] = 0;
			this.WeightYAxis[4] = 0;

			this.VfYaxis[0] = 0;
			this.VfYaxis[1] = 0;
			this.VfYaxis[2] = 0;
			this.VfYaxis[3] = 0;
			this.VfYaxis[4] = 0;

			this.pbfYAxis[0] = 0;
			this.pbfYAxis[1] = 0;
			this.pbfYAxis[2] = 0;
			this.pbfYAxis[3] = 0;
			this.pbfYAxis[4] = 0;
			
			this.BMIYAxis[0] = 0;
			this.BMIYAxis[1] = 0;
			this.BMIYAxis[2] = 0;
			this.BMIYAxis[3] = 0;
			this.BMIYAxis[4] = 0;
		}
	};

	populateBasicVitalDetails(obj){
		let basicVitalDetails = obj.basicVitalDetails;
		let vitalDynamicScalBar = obj.vitalDynamicScalBar;
		if (basicVitalDetails['weight'] && basicVitalDetails['weight'].toString().trim().length > 0 && !isNaN(basicVitalDetails['weight'])) {
			this.weight = parseFloat(basicVitalDetails['weight']).toFixed(2);
			this.targetWeight = this.kioskUtilities.calculateTargetWeight(obj.basicDetails['userHeight']);
			this.weightControl = this.kioskUtilities.calculateWeightControl(basicVitalDetails['weight'], this.kioskUtilities.calculateTargetWeight(obj.basicDetails['userHeight']));
			this.bmi = this.kioskUtilities.calculateBmi(parseFloat(basicVitalDetails['weight']),  obj.basicDetails['userHeight'], 2);

			this.WeightX1Value = this.kioskUtilities.calculateWeightRisk(this.KolorsUserheightInCms/100,22.9);
			this.WeightX2Value = this.kioskUtilities.calculateWeightRisk(this.KolorsUserheightInCms/100,18.5);

			// BMI Scalebar Properties
			this.BMIUnderWeight = vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'];
			this.BMINormalWeight = vitalDynamicScalBar['BMI_Reference_Value']['BMI_Normal_Value'];
			this.BMIOverWeight = vitalDynamicScalBar['BMI_Reference_Value']['BMI_Over_Weight_Value'];
			this.BMIObeseWeight = vitalDynamicScalBar['BMI_Reference_Value']['BMI_Obese_Value'];
			this.BMIEndValue = vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value'];

			this.WeightX1Value = this.bmi

			// Health Indicator Dynamic Width
			this.BMIUW = {
				width: this.findDynamicWidth(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value']))+"%"
			}

			this.BMINormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Normal_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_Over_Weight_Value'], this.getXaisPoint(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value']))+"%"
			}

			this.BMIHigh = {
				width: this.findDynamicWidth(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Over_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value']))+"%"
			}

			// this.BMIObese = {
			// 	width: this.findDynamicWidth(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Obese_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'], vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value']))+"%"
			// }
			

			// For BMI Width Indicator
			
			this.BMIScalebar = this.findDynamicWidth(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'],this.bmi,this.getXaisPoint(vitalDynamicScalBar['BMI_Reference_Value']['BMI_Under_Weight_Value'],vitalDynamicScalBar['BMI_Reference_Value']['BMI_High_Reference_Value']));

			if(this.BMIScalebar >= 100){
				this.BMIScalebar = 100
			}

			this.BMIArrow = {
				marginLeft : this.BMIScalebar+"%"
			};

			// For A4 Printout Functionality
			this.DynamicBMIValueMovement = {
				marginLeft : this.BMIScalebar+"%"
			}

			// Kolors Functionality
			
			// Ideal Body Weight Scenario
			this.WeighttoReduce = Math.round(this.weight - this.idealBodyWeight);

			
			// console.log("this.WeighttoReduce",this.WeighttoReduce);
			
			this.weightUnits = "kg";
			this.weightTestTaken = true;
			this.bmiTestTaken = true;
		}else{
			this.targetWeight = "Not Taken";
			this.weightControl = "Not Taken";
			this.weightUnits = "";
 			this.BMINotTaken = "Weight & BMI, "
		};

		if (basicVitalDetails['systolic'] && basicVitalDetails['diastolic'] && basicVitalDetails['pulse'] && basicVitalDetails['systolic'].toString().trim().length > 0 && basicVitalDetails['diastolic'].toString().trim().length > 0 && basicVitalDetails['pulse'].toString().trim().length > 0 && !isNaN(basicVitalDetails['systolic']) && !isNaN(basicVitalDetails['diastolic']) && !isNaN(basicVitalDetails['pulse'])) {
			this.systolic = basicVitalDetails['systolic'];
			this.diastolic = basicVitalDetails['diastolic'];
			this.pulse = basicVitalDetails['pulse'];

			// Systolic Scalebar Properties
			this.SystolicStartValue = vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'];
			this.SystolicAcceptableValue = vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Acceptable_Value'];
			this.SystolicHighValue = vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_High_Reference_Value'];
			this.SystolicEndValue = vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value'];

			// Health Indicator Dynamic Width
			this.SystolicNormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Acceptable_Value'], this.getXaisPoint(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value']))+"%"
			}

			this.SystolicAcceptable = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Acceptable_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value']))+"%"
			}

			this.SystolicHigh = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_High_Reference_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'], vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value']))+"%"
			}
			

			this.SystolicWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'],this.systolic,this.getXaisPoint(vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_Start_Reference_Value'],vitalDynamicScalBar['Systolic_Reference_Value']['Systolic_End_Reference_Value']));

			if(this.SystolicWidthInd >= 100){
				this.SystolicWidthInd = 100
			}

			this.SystolicArrow = {
				marginLeft : this.SystolicWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicSystolicValueMovement = {
				marginLeft : this.SystolicWidthInd + "%"
			}

			// Diastolic Scalebar Properties
			this.DiastolicLowValue = vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'];
			this.DiastolicNormalValue = vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Normal_Value'];
			this.DiastolicHighValue = vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_High_Reference_Value'];

			// Health Indicator Dynamic Width
			this.DiastolicNormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'], vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'], vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_High_Reference_Value']))+"%"
			}

			this.DiastolicHigh = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Normal_Value'], vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'], vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_High_Reference_Value']))+"%"
			}

			// Diastolic Health Indicator
			this.DiastolicWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'],this.diastolic,this.getXaisPoint(vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_Low_Reference_Value'],vitalDynamicScalBar['Diastolic_Reference_Value']['Diastolic_High_Reference_Value']));

			if(this.DiastolicWidthInd >= 100){
				this.DiastolicWidthInd = 100
			}

			this.DiastolicArrow = {
				marginLeft: this.DiastolicWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicDiastolicValueMovement = {
				marginLeft : this.DiastolicWidthInd + "%"
			}

			//Pulse Scalebar Properties
			this.PulseLowValue = vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'];
			this.PulseNormalValue = vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Normal_Value'];
			this.PulseHighValue = vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_High_Reference_Value'];
			this.PulseEndValue = vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value'];

			// Health Indicator Dynamic Width
			this.Pulse_Low = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value']))+"%"
			}

			this.Pulse_Normal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Normal_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value']))+"%"
			}

			this.Pulse_High = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_High_Reference_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'], vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value']))+"%"
			}

			this.PulseWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'],this.pulse,this.getXaisPoint(vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_Low_Reference_Value'],vitalDynamicScalBar['Pulse_Reference_Value']['Pulse_End_Reference_Value']));

			if(this.PulseWidthInd >= 100){
				this.PulseWidthInd = 100
			}

			this.PulseArrow = {
				marginLeft: this.PulseWidthInd + "%"
			}

			// This is A4 Printout Functionality
			this.DynamicPulseValueMovement = {
				marginLeft : this.PulseWidthInd + "%"
			}

			this.bpTestTaken = true;

		}else{
			this.BloodPressureNotTaken = "BP, ";
		};

		if (basicVitalDetails['oxygenLevel'] && basicVitalDetails['oxygenLevel'].toString().trim().length > 0 && !isNaN(basicVitalDetails['oxygenLevel'])) {
			this.oxygenLevel = basicVitalDetails['oxygenLevel'];

			// This is for the declared values on the top
			this.LowValueSpo2 = vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'];
			this.HighValueSpo2 = vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_High_Reference_Value'];
			this.HealthyValueSpo2 = vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Healthy_Value'];

			// This is for Spo2's Width, Arrow Indicator and Percentage Indicator
			this.oxyScalBar = this.findDynamicWidth(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'], this.oxygenLevel, this.getXaisPoint(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'], vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_High_Reference_Value']));

			// Health Indicator Dynamic Width
			this.Spo2Low = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'], vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Healthy_Value'], this.getXaisPoint(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'], vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_High_Reference_Value']))+"%"
			}

			this.Spo2Healthy = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Healthy_Value'], vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_Low_Reference_Value'], vitalDynamicScalBar['Spo2_Reference_Value']['Spo2_High_Reference_Value']))+"%"
			}

			this.Spo2Arrow = {
					marginLeft : this.oxyScalBar+"%"
				};

			// For A4 Printout Functionality
			this.DynamicSpo2ValueMovement = {
				marginLeft : this.oxyScalBar+"%"
			};

			this.spo2TestTaken = true;
		}else{
			this.Spo2NotTaken = "Spo2, ";
		};

		if (basicVitalDetails['bodyTemperature'] && basicVitalDetails['bodyTemperature'].toString().trim().length > 0 && !isNaN(basicVitalDetails['bodyTemperature'])) {
			this.bodyTemperature = basicVitalDetails['bodyTemperature'];

			// Body Temperature Scalebar Property
			this.LowBodyTemperatureValue = vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'];
			this.NormalBodyTemperatureValue = vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Normal_Reference_Value'];
			this.HighBodyTemperatureValue = vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_High_Value'];
			this.EndBodyTemperatureValue = vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value'];

			// This is for Body Temperature's Width

			this.BodyTempWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'],this.bodyTemperature,this.getXaisPoint(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'],vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value']));

			// Health Indicator Dynamic Width
			this.TemperatureCold = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value']))+"%"
			}	

			this.TemperatureNormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Normal_Reference_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value']))+"%"
			}

			this.TemperatureFever = {
				width: this.findDynamicWidth(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_High_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_Low_Reference_Value'], vitalDynamicScalBar['Body_Temperature_Reference_Value']['Body_Temperature_End_Reference_Value']))+"%"
			}

			if(this.BodyTempWidthInd >= 100){
				this.BodyTempWidthInd = 100
			}


			this.TemperatureArrow = {
				marginLeft : this.BodyTempWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicTemperatureValueMovement = {
				marginLeft : this.BodyTempWidthInd + "%"
			}

			this.temperatureTestTaken = true;
		}else{
			this.bodyTemperatureNotTaken = "Body Temperature, "
		};

		if (basicVitalDetails['fatPercent'] && basicVitalDetails['fatPercent'].toString().trim().length > 0 && !isNaN(basicVitalDetails['fatPercent'])) {
			this.fatPercent = (parseFloat(basicVitalDetails['fatPercent'])).toFixed(2);
			this.halfBodyBmcTestTaken = true;
			this.fullBodyBmcTestTaken = false;
		};

		/*console.log("weight "+this.weight);
		console.log("targetWeight "+this.targetWeight);
		console.log("weightControl "+this.weightControl);
		console.log("bmi "+this.bmi);
		console.log("systolic "+this.systolic);
		console.log("diastolic "+this.diastolic);
		console.log("pulse "+this.pulse);
		console.log("oxygenLevel "+this.oxygenLevel);
		console.log("bodyTemperature "+this.bodyTemperature);
		console.log("fatPercent "+this.fatPercent);*/
	};

	IdealBodyWeightLooseGainText(){
		if(this.weight != ""){
			if(this.WeighttoReduce >= 0){
				// this.WeighttoReduce = Math.round(this.weight - this.idealBodyWeight);
				return "Weight to loose    -    " + this.WeighttoReduce + this.weightUnits;
			}else if (this.WeighttoReduce < 0) {
				this.WeightToGain = Math.abs(Math.round(this.weight - this.idealBodyWeight));
				return "Weight To Gain    -    " + this.WeightToGain + this.weightUnits;
			}
		}else{
			return "Weight to loose    -    N/A";
		}
	};

	// For All Indicators Width
	getXaisPoint(low, high) {
		return ((high - low) / 10);
	}
	findDynamicWidth(low, findWidthFor, xAxisPoint) {
		return Math.abs(((low - findWidthFor) / xAxisPoint * 10));
	}

	populateFullBodyBMCDetails(obj){
		let fullBodyBMCDetails = obj.fullBodyBMCDetails;
		let vitalDynamicScalBar = obj.vitalDynamicScalBar;
		if (fullBodyBMCDetails['bodyFatMass'] && fullBodyBMCDetails['bodyFatMass'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['bodyFatMass'])) {
			this.bodyFatMass = fullBodyBMCDetails['bodyFatMass'];
			this.bodyFatMassUnits = "Kg";
			this.bodyFatMassNR = "(6.40 ~ 12.79)";

		// Body Fat Mass Scalebar Properties
		this.BodyFatMassLowValue = vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value']; 
		this.BodyFatMassNormalValue = vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Normal_Reference_Value']; 
		this.BodyFatMassAcceptableValue = vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Acceptable_Reference_Value']
		this.BodyFatMassHighValue = vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_High_Value']; 
		this.BodyFatMassEndValue = vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value'];

		// Health Indicator Dynamic Width
		this.Body_Fat_Mass_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value']))+"%"
		}

		this.Body_Fat_Mass_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Normal_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Acceptable_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value']))+"%"
		}

		this.Body_Fat_Mass_Acceptable = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Acceptable_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value']))+"%"
		}

		this.Body_Fat_Mass_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_High_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value']))+"%"
		}

		// Body Fat Mass Width Indicator
		this.BodyFatMassWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'],this.bodyFatMass,this.getXaisPoint(vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_Low_Reference_Value'],vitalDynamicScalBar['Body_Fat_Mass_Reference_Value']['Body_Fat_Mass_End_Reference_Value']));

		if(this.BodyFatMassWidthInd >= 100){
			this.BodyFatMassWidthInd = 100
		}

		this.Body_Fat_MassArrow = {
			marginLeft : this.BodyFatMassWidthInd + "%"
		}

		// This is A4 Printout Functionality
		this.DynamicBodyFatMassValueMovement = {
			marginLeft : this.BodyFatMassWidthInd + "%"
		}

		// Kolors Dynamic Scalbar 
		this.BodyFatMassStatus = this.calculateFullBodyFATStatus(this.BodyFatMassLowValue, this.BodyFatMassAcceptableValue, this.BodyFatMassHighValue, this.bodyFatMass);
		var BFMscalebarLowVale = 0;
		var BFMscalebarHighVale = 0;
		if(this.BodyFatMassStatus == "Normal"){
			BFMscalebarLowVale = this.BodyFatMassLowValue;
			BFMscalebarHighVale = this.BodyFatMassAcceptableValue;
		} else if(this.BodyFatMassStatus == "Low"){			
			BFMscalebarLowVale = 0;
			BFMscalebarHighVale = this.BodyFatMassLowValue;
		}else if(this.BodyFatMassStatus == "Acceptable"){			
			BFMscalebarLowVale = this.BodyFatMassAcceptableValue;
			BFMscalebarHighVale = this.BodyFatMassHighValue;
		} else { // HIGH
			BFMscalebarLowVale = this.BodyFatMassHighValue;
			BFMscalebarHighVale = this.BodyFatMassEndValue;
		}
		// console.log("BFMscalebarLowVale",BFMscalebarLowVale);
		// console.log("BFMscalebarHighVale",BFMscalebarHighVale);
		this.BFMScalebarLength = this.findScalebarLength(this.BodyFatMassStatus,BFMscalebarLowVale, BFMscalebarHighVale, this.bodyFatMass,1.5, 4);
		// console.log("this.BFMScalebarLength",this.BFMScalebarLength);


		}else{
			this.bodyFatMass = "Not Taken";
			this.FullBodyBMCNotTaken = "BCA, ";
		};

		if (fullBodyBMCDetails['percentBodyFat'] && fullBodyBMCDetails['percentBodyFat'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['percentBodyFat'])) {
			this.percentBodyFat = fullBodyBMCDetails['percentBodyFat'];
		
		// Percent Body Fat Scalebar Properties
		this.PercentBodyFatLowValue = vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value']; 
		this.PercentBodyFatNormalValue = vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Normal_Reference_Value']; 
		this.PercentBodyFatAcceptableValue  = vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Acceptable_Reference_Value'];
		this.PercentBodyFatHighValue = vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_High_Value']; 
		this.PercentBodyFatEndValue = vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']; 

		// Health Indicator Dynamic Width
		this.PercentBodyFatLow = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']))+"%"
		}

		this.PercentBodyFatNormal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Normal_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Acceptable_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']))+"%"
		}

		this.PercentBodyFatAcceptable = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Acceptable_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']))+"%"
		}

		this.PercentBodyFatHigh = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_High_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'], vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']))+"%"
		}

		this.PercentBodyFatWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'],this.percentBodyFat,this.getXaisPoint(vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_Low_Reference_Value'],vitalDynamicScalBar['Percent_Body_Fat_Reference_Value']['Percent_Body_Fat_End_Reference_Value']));

		if(this.PercentBodyFatWidthInd >= 100){
			this.PercentBodyFatWidthInd = 100
		}

		this.PercentBodyFatArrow = {
			marginLeft : this.PercentBodyFatWidthInd + "%"
		}

		// This is A4 Print Functionality
		this.DynamicPercentBodyFatValueMovement = {
			marginLeft : this.PercentBodyFatWidthInd + "%"
		}

			this.fullBodyBmcTestTaken = true;
			this.halfBodyBmcTestTaken = false;
		}else{
			this.percentBodyFat = "Not Taken";
		};

		if (fullBodyBMCDetails['basalMetabolicRate'] && fullBodyBMCDetails['basalMetabolicRate'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['basalMetabolicRate'])) {
			this.basalMetabolicRate = fullBodyBMCDetails['basalMetabolicRate'];
			this.basalMetabolicRateUnits = "Kcal";
			this.basalMetabolicRateNR = "(>1200)";


		}else{
			this.basalMetabolicRate = "Not Taken";
		};

		// Body Cell Mass Scalebar Properties
		this.BodyCellMassLowValue = vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value']; 
		this.BodyCellMassNormalValue = vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Normal_Value'];
		this.BodyCellMassHighValue = vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_High_Reference_Value'];
		

		if (fullBodyBMCDetails['bodyCellMass'] && fullBodyBMCDetails['bodyCellMass'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['bodyCellMass'])) {
			this.bodyCellMass = fullBodyBMCDetails['bodyCellMass'];
			this.bodyCellMassUnits = "Kg";
			this.bodyCellMassNR = "(>20.00)";


		// Health Indicator Dynamic Width
		this.Body_Cell_Mass_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_High_Reference_Value']))+"%"
		}

		this.Body_Cell_Mass_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Normal_Value'], vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value'], vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_High_Reference_Value']))+"%"
		}

		this.BodyCellMassWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value'],this.bodyCellMass,this.getXaisPoint(vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_Low_Reference_Value'],vitalDynamicScalBar['Body_Cell_Mass_Reference_Value']['Body_Cell_Mass_High_Reference_Value']));

		if(this.BodyCellMassWidthInd >= 100){
			this.BodyCellMassWidthInd = 100
		}

		this.Body_Cell_MassArrow = {
			marginLeft : this.BodyCellMassWidthInd + "%"
		}
		// This is A4 Prinout Functionality
		this.DynamicBodyCellMassValueMovement = {
			marginLeft : this.BodyCellMassWidthInd + "%"
		}

		}else{
			this.bodyCellMass = "Not Taken";
		};

		// Bone Mineral Content Scalebar Properties
		this.BoneMineralContentLowValue = vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value']; 
		this.BoneMineralContentNormalValue = vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Normal_Reference_Value']; 
		this.BoneMineralContentHighValue = vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_End_Reference_Value']; 	

		if (fullBodyBMCDetails['boneMineralContent'] && fullBodyBMCDetails['boneMineralContent'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['boneMineralContent'])) {
			this.boneMineralContent = fullBodyBMCDetails['boneMineralContent'];
			this.boneMineralContentUnits = "Kg";
			this.boneMineralContentNR = "(>2.00)";


		// Health Indicator Dynamic Width
		this.Bone_Mineral_ContentLow = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value'], vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value'], vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_End_Reference_Value']))+"%"
		}

		this.Bone_Mineral_ContentNormal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Normal_Reference_Value'], vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value'], vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_End_Reference_Value']))+"%"
		}


		this.BoneMineralContentWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value'],this.boneMineralContent,this.getXaisPoint(vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_Low_Reference_Value'],vitalDynamicScalBar['Bone_Mineral_Content_Reference_Value']['Bone_Mineral_Content_End_Reference_Value']));

		if(this.BoneMineralContentWidthInd >= 100){
			this.BoneMineralContentWidthInd = 100
		}

		this.Bone_Mineral_ContentArrow = {
			marginLeft : this.BoneMineralContentWidthInd + "%"
		}

		// This is A4 Printout Functionality
		this.DynamicBoneMineralContentValueMovement ={
			marginLeft : this.BoneMineralContentWidthInd + "%"
		}

		}else{
			this.boneMineralContent = "Not Taken";
		};

		// Extra Cellular Water Scalebar Properties
		this.ECWLowValue = vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value']; 
		this.ECWNormalValue = vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Normal_Reference_Value']; 
		this.ECWHighValue = vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_High_Value']; 
		this.ECWEndValue = vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value']; 

		if (fullBodyBMCDetails['extraCellularWater'] && fullBodyBMCDetails['extraCellularWater'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['extraCellularWater'])) {
			this.extraCellularWater = fullBodyBMCDetails['extraCellularWater'];


		// Health Indicator Dynamic Width
		this.ECW_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.ECW_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Normal_Reference_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.ECW_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_High_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.ExtraCellularWaterWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'],this.extraCellularWater,this.getXaisPoint(vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_Low_Reference_Value'],vitalDynamicScalBar['Extra_Cellular_Water_Reference_Value']['Extra_Cellular_Water_End_Reference_Value']));

		if(this.ExtraCellularWaterWidthInd >= 100){
			this.ExtraCellularWaterWidthInd = 100
		}

		this.ECWArrow = {
			marginLeft : this.ExtraCellularWaterWidthInd + "%"
		}
		// This is A4 Prinout Functionality
		this.DynamicECWValueMovement = {
			marginLeft : this.ExtraCellularWaterWidthInd + "%"
		}

		}else{
			this.extraCellularWater = "Not Taken";
		};


		// Intra Cellular Water Scalebar Properties
		this.ICWLowValue = vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value']; 
		this.ICWNormalValue = vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Normal_Reference_Value']; 
		this.ICWHighValue = vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_High_Value']; 
		this.ICWEndValue = vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value'];


		if (fullBodyBMCDetails['intraCellularWater'] && fullBodyBMCDetails['intraCellularWater'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['intraCellularWater'])) {
			this.intraCellularWater = fullBodyBMCDetails['intraCellularWater'];


		// Health Indicator Dynamic Width
		this.ICW_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.ICW_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Normal_Reference_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.ICW_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_High_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'], vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value']))+"%"
		}

		this.IntraCellularWaterWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'],this.intraCellularWater,this.getXaisPoint(vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_Low_Reference_Value'],vitalDynamicScalBar['Intra_Cellular_Water_Reference_Value']['Intra_Cellular_Water_End_Reference_Value']));

		if(this.IntraCellularWaterWidthInd >= 100){
			this.IntraCellularWaterWidthInd = 100
		}

		this.ICWArrow = {
			marginLeft : this.IntraCellularWaterWidthInd + "%"
		}

		// For A4 Printout Functionality
		this.DynamicICWValueMovement = {
			marginLeft : this.IntraCellularWaterWidthInd + "%"
		}

		}else{
			this.intraCellularWater = "Not Taken";
		};

		// Total Body Water Dynamic Ranges
		this.TotalBodyWaterWaterLow = this.ICWLowValue + this.ECWLowValue;
		this.TotalBodyWaterWaterNormal = this.ICWNormalValue + this.ECWNormalValue;
		this.TotalBodyWaterWaterHigh = this.ICWHighValue + this.ECWHighValue;

		let TBWLowValue= this.ICWLowValue + this.ECWLowValue;
		this.TotalBodyWaterWaterLow = parseFloat(TBWLowValue).toFixed(2);
		// console.log("this.TotalBodyWaterWaterLow",this.TotalBodyWaterWaterLow)
		 let TBWNormalValue = this.ICWNormalValue + this.ECWNormalValue;
		 this.TotalBodyWaterWaterNormal = parseFloat(TBWNormalValue).toFixed(2);
		//  console.log("this.TotalBodyWaterWaterNormal",this.TotalBodyWaterWaterNormal);
		 let TBWHighValue = this.ICWHighValue + this.ECWHighValue;
		 this.TotalBodyWaterWaterHigh = parseFloat(TBWHighValue).toFixed(2);
		//  console.log("this.TotalBodyWaterWaterHigh",this.TotalBodyWaterWaterHigh);
		
		
		// Total Body Water Calculation
		this.TotalBodyWaterSumpupICW = parseFloat(this.intraCellularWater);
		this.TotalBodyWaterSumupECW = parseFloat(this.extraCellularWater);

			this.TotalBodyWater = (this.TotalBodyWaterSumpupICW + this.TotalBodyWaterSumupECW).toFixed(2);
			// console.log("this.TotalBodyWater",this.TotalBodyWater);


			// Kolors Dynamic Scalbar 
		this.TotalBodyWaterStatus = this.calculateTotalBodyWaterStatus(this.TotalBodyWaterWaterLow, this.TotalBodyWaterWaterHigh, this.TotalBodyWater);
		var TBWscalebarLowVale = 0;
		var TBWscalebarHighVale = 0;
		if(this.TotalBodyWaterStatus == "Normal"){
			TBWscalebarLowVale = this.TotalBodyWaterWaterLow;
			TBWscalebarHighVale = this.TotalBodyWaterWaterHigh;
		} else if(this.TotalBodyWaterStatus == "Low"){			
			TBWscalebarLowVale = 0;
			TBWscalebarHighVale = this.TotalBodyWaterWaterLow;
		} else { // HIGH
			TBWscalebarLowVale = this.TotalBodyWaterWaterHigh;
			TBWscalebarHighVale = 42;
		}
		// console.log("TBWscalebarLowVale",TBWscalebarLowVale);
		// console.log("TBWscalebarHighVale",TBWscalebarHighVale);
		this.TotalBodyWaterLength = this.findScalebarLength(this.TotalBodyWaterStatus,TBWscalebarLowVale, TBWscalebarHighVale, this.TotalBodyWater,2, 3);
		// console.log("this.TotalBodyWaterLength",this.TotalBodyWaterLength);


		if (fullBodyBMCDetails['mineralContent'] && fullBodyBMCDetails['mineralContent'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['mineralContent'])) {
			this.mineralContent = fullBodyBMCDetails['mineralContent'];

		// Mineral Content Scalebar Properties
		this.MineralContentLowValue = vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value']; 
		this.MineralContentNormalValue = vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Normal_Value']; 
		this.MineralContentHighValue = vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_High_Reference_Value']; 

		// Health Indicator Dynamic Width
		this.Minerals_Content_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value'], vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value'], vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_High_Reference_Value']))+"%"
		}

		this.Minerals_Content_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Normal_Value'], vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value'], vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_High_Reference_Value']))+"%"
		}

		this.MineralsContentWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value'],this.mineralContent,this.getXaisPoint(vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_Low_Reference_Value'],vitalDynamicScalBar['Minerals_Content_Reference_Value']['Minerals_Content_High_Reference_Value']));

		if(this.MineralsContentWidthInd >= 100){
			this.MineralsContentWidthInd = 100
		}

		this.Minerals_ContentArrow = {
			marginLeft : this.MineralsContentWidthInd + "%"
		}

		// This is A4 Printout Functionality
		this.DynamicMineralsContentValueMovement = {
			marginLeft : this.MineralsContentWidthInd + "%"
		}

		}else{
			this.mineralContent = "Not Taken";
		};

		if (fullBodyBMCDetails['proteinContent'] && fullBodyBMCDetails['proteinContent'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['proteinContent'])) {
			this.proteinContent = fullBodyBMCDetails['proteinContent'];

		//Protein Content  Scalebar Properties
		this.ProteinLowValue = vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value']; 
		this.ProteinNormalValue = vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Healthy_Value']; 
		this.ProteinHighValue =  vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_High_Reference_Value'];
		this.convertProteinHighValue = parseFloat(this.ProteinHighValue).toFixed(2); 
		this.proteinEndValue = vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value'];

		// Health Indicator Dynamic Width
		this.Protein_ContentLow = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Healthy_Value'], this.getXaisPoint(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value']))+"%"
		}

		this.Protein_ContentNormal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Healthy_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value']))+"%"
		}

		this.Protein_ContentHigh = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_High_Reference_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'], vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value']))+"%"
		}

		this.ProteinWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'],this.proteinContent,this.getXaisPoint(vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_Low_Reference_Value'],vitalDynamicScalBar['Protein_Content_Reference_Value']['Protein_Content_End_Reference_Value']));

		if(this.ProteinWidthInd >= 100){
			this.ProteinWidthInd = 100
		}


		this.Protein_ContentArrow = {
			marginLeft : this.ProteinWidthInd + "%"
		}

		// This is A4 Prinout Functionality
		this.DynamicProteinContentValueMovement = {
			marginLeft : this.ProteinWidthInd + "%"
		}

		// Kolors Dynamic Scalbar 
		this.ProteinStatus = this.calculateFullBodyProteinStatus(this.ProteinLowValue, this.ProteinHighValue, this.proteinContent);
		var scalebarLowVale = 0;
		var scalebarHighVale = 0;
		if(this.ProteinStatus == "Normal"){
			scalebarLowVale = this.ProteinLowValue;
			scalebarHighVale = this.ProteinHighValue;
		} else if(this.ProteinStatus == "Low"){			
			scalebarLowVale = 0;
			scalebarHighVale = this.ProteinLowValue;
		} else { // HIGH
			scalebarLowVale = this.ProteinHighValue;
			scalebarHighVale = this.proteinEndValue;
		}
		// console.log("scalebarLowVale",scalebarLowVale);
		// console.log("scalebarHighVale",scalebarHighVale);
		this.ProteinScalebarLength = this.findScalebarLength(this.ProteinStatus,scalebarLowVale, scalebarHighVale, this.proteinContent,2, 3);
		// console.log("this.ProteinScalebarLength",this.ProteinScalebarLength);



		}else{
			this.proteinContent = "Not Taken";
		};


		// Skeletal Muscle Value Scalebar Properties
		this.SkeletalMuscleMassLowValue = vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value']; 
		this.SkeletalMuscleMassNormalValue = vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Normal_Value']; 
		this.SkeletalMuscleMassHighValue = vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_High_Reference_Value']; 

		if (fullBodyBMCDetails['skeletalMuscleMass'] && fullBodyBMCDetails['skeletalMuscleMass'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['skeletalMuscleMass'])) {
			this.skeletalMuscleMass = fullBodyBMCDetails['skeletalMuscleMass'];
			this.skeletalMuscleMassUnits = "Kg";
			this.skeletalMuscleMassNR = "(>26.88)";


		// Health Indicator Dynamic Width
		this.Skeletal_Muscle_MassLow = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value'], vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Normal_Value'], this.getXaisPoint(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value'], vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_High_Reference_Value']))+"%"
		}

		this.Skeletal_Muscle_MassNormal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Normal_Value'], vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value'], vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_High_Reference_Value']))+"%"
		}

		this.SkeletalMuscleMassWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value'],this.skeletalMuscleMass,this.getXaisPoint(vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_Low_Reference_Value'],vitalDynamicScalBar['Skeletal_Muscle_Mass_Reference_Value']['Skeletal_Muscle_Mass_High_Reference_Value']));

		this.Skeletal_Muscle_MassArrow = {
			marginLeft : this.SkeletalMuscleMassWidthInd + "%"
		}

		// For A4 Printout Functionality
		this.DynamicSkeletalMuscleMassValueMovement = {
			marginLeft : this.SkeletalMuscleMassWidthInd + "%"
		}

		}else{
			this.skeletalMuscleMass = "Not Taken";
		};

		// Visceral Fat Scalebar Properties
		this.VisceralFatNormalValue = vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'];
		this.VisceralFatAcceptableValue = vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Acceptable_Value']; 
		this.VisceralFatHighValue = vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_High_Reference_Value'];
		this.VisceralFatEndValue = vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value']; 

		if (fullBodyBMCDetails['visceralFat'] && fullBodyBMCDetails['visceralFat'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['visceralFat'])) {
			this.visceralFat = fullBodyBMCDetails['visceralFat'];
			this.visceralFatUnits = "Cm.Sq";
			this.visceralFatNR = "(0 ~ 100)";

		// Health Indicator Dynamic Width
		this.VisceralFat_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Acceptable_Value'], this.getXaisPoint(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value']))+"%"
		}

		this.VisceralFat_Acceptable = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Acceptable_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value']))+"%"
		}

		this.VisceralFat_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_High_Reference_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'], vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value']))+"%"
		}

		this.VisceralFatWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'],this.visceralFat,this.getXaisPoint(vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_Normal_Value'],vitalDynamicScalBar['Visceral_Fat_Reference_Value']['Visceral_Fat_End_Reference_Value']));

		if(this.VisceralFatWidthInd >= 100){
			this.VisceralFatWidthInd = 100
		}

		this.VisceralFatArrow = {
			marginLeft : this.VisceralFatWidthInd + "%"
		}

		// This is A4 Orintout Functionality
		this.DynamicVisceralFatValueMovement = {
			marginLeft : this.VisceralFatWidthInd + "%"
		}

		}else{
			this.visceralFat = "Not Taken"; 
		};


		// Waist to Height Ratio Scalebar Properties
		this.WTHeightRLowValue = vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value']; 
		this.WTHeightRNormalValue = vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Normal_Reference_Value']; 
		this.WTHeightRHighValue = vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_High_Value']; 
		this.WTHeightREndValue = vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value']; 


		if (fullBodyBMCDetails['waistToHeightRatio'] && fullBodyBMCDetails['waistToHeightRatio'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['waistToHeightRatio'])) {
			this.waistToHeightRatio = fullBodyBMCDetails['waistToHeightRatio'];
			//this.waistToHeightRatioUnits = "Ms";
			this.waistToHeightRatioUnits = "N/A";
			this.waistToHeightRatioNR = "(0.35 ~ 0.57)";


		// Health Indicator Dynamic Width
		this.WaistToHeightRatio_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value']))+"%"
		}

		this.WaistToHeightRatio_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Normal_Reference_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_High_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value']))+"%"
		}

		this.WaistToHeightRatio_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_High_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value']))+"%"
		}

		// Waist to Height Width Indicator
		this.WTHeightRWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'],this.waistToHeightRatio,this.getXaisPoint(vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_Low_Reference_Value'],vitalDynamicScalBar['Waist_to_Height_Ratio_Reference_Value']['Waist_to_Height_Ratio_End_Reference_Value']));

		if(this.WTHeightRWidthInd >= 100){
			this.WTHeightRWidthInd = 100
		}

		this.WaistToHeightRatioArrow = {
			marginLeft : this.WTHeightRWidthInd + "%"
		}

		// This is A4 Printout Functionality
		this.DynamicWTHeightRatioValueMovement = {
			marginLeft : this.WTHeightRWidthInd + "%"
		}

		}else{
			this.waistToHeightRatio = "Not Taken";
		};


		// Waist to Hip Ratio
		this.WTHipRLowValue = vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value']; 
		this.WTHipRNormalValue = vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Normal_Reference_Value']; 
		this.WTHipRHipHighValue = vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_High_Reference_Value']; 
		this.WTHipREndValue = vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value']; 


		if (fullBodyBMCDetails['waistToHipRatio'] && fullBodyBMCDetails['waistToHipRatio'].toString().trim().length > 0 && !isNaN(fullBodyBMCDetails['waistToHipRatio'])) {
			this.waistToHipRatio = fullBodyBMCDetails['waistToHipRatio'];
			//this.waistToHipRatioUnits = "Ms";
			this.waistToHipRatioUnits = "N/A";
			this.waistToHipRatioNR = "(0.80 ~ 0.90)";

		// Health Indicator Dynamic Width
		this.WaistToHipRatio_Low = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Normal_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value']))+"%"
		}

		this.WaistToHipRatio_Normal = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Normal_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_High_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value']))+"%"
		}

		this.WaistToHipRatio_High = {
			width: this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_High_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value'], this.getXaisPoint(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'], vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value']))+"%"
		}

		// Waist to Hip Width Indicator
		this.WTHipRWidthInd = this.findDynamicWidth(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'],this.waistToHipRatio,this.getXaisPoint(vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_Low_Reference_Value'],vitalDynamicScalBar['Waist_to_Hip_Ratio_Reference_Value']['Waist_Hip_Ratio_End_Reference_Value']));

		if(this.WTHipRWidthInd >= 100){
			this.WTHipRWidthInd = 100
		}

		this.WaistToHipRatioArrow = {
			marginLeft : this.WTHipRWidthInd + "%"
		}

		// This is A4 Printout Functionaity
		this.DynamicWTHipRatioValueMovement = {
			marginLeft : this.WTHipRWidthInd + "%"
		}

		}else{
			this.waistToHipRatio = "Not Taken";
		};

		/*console.log("basalMetabolicRate "+this.basalMetabolicRate);
		console.log("bodyCellMass "+this.bodyCellMass);
		console.log("bodyFatMass "+this.bodyFatMass);
		console.log("boneMineralContent "+this.boneMineralContent);
		console.log("extraCellularWater "+this.extraCellularWater);
		console.log("intraCellularWater "+this.intraCellularWater);
		console.log("mineralContent "+this.mineralContent);
		console.log("percentBodyFat "+this.percentBodyFat);
		console.log("proteinContent "+this.proteinContent);
		console.log("skeletalMuscleMass "+this.skeletalMuscleMass);
		console.log("visceralFat "+this.visceralFat);
		console.log("waistToHeightRatio "+this.waistToHeightRatio);
		console.log("waistToHipRatio "+this.waistToHipRatio);*/
	};

	checkAbnormalValue(vitalValue, normalRange, highRange){
		if(vitalValue<=highRange && vitalValue >= normalRange){
			return false;
		}else{
			return true;
		}
	};

	calculateFullBodyProteinStatus( lowRange, HighRange, vitalvalue){
		if (parseFloat(vitalvalue) < lowRange) {
			return 'Low';
		}
		else if (parseFloat(vitalvalue) >= lowRange && parseFloat(vitalvalue) <= HighRange ) {
			return 'Normal';
		}else{
			return 'High';
		}
	};
	calculateFullBodyFATStatus( lowRange, AcceptableRange ,HighRange, vitalvalue ){
		if (parseFloat(vitalvalue) < lowRange) {
            return 'Low';
        }
        else if (parseFloat(vitalvalue) >= lowRange && parseFloat(vitalvalue) <= AcceptableRange) {
            return 'Normal';
        }
        else if(parseFloat(vitalvalue) > AcceptableRange && parseFloat(vitalvalue) <= HighRange){
            return 'Acceptable';
        }
        else if (parseFloat(vitalvalue) > HighRange) {
            return 'High';
        }
	};
	calculateTotalBodyWaterStatus( lowRange, HighRange, vitalvalue){
		if (parseFloat(vitalvalue) < lowRange) {
			return 'Low';
		}
		else if (parseFloat(vitalvalue) >= lowRange && parseFloat(vitalvalue) <= HighRange ) {
			return 'Normal';
		}else{
			return 'High';
		}
	};

	// checkAbnormalValue(vitalValue, normalRange, highRange){
	// 	if(vitalValue<=highRange && vitalValue >= normalRange){
	// 		return false;
	// 	}else{
	// 		return true;
	// 	}
	// };
	findScalebarLength(vitalStatus, lowValue, highValue, vitalValue, scaleBox, vitalRanges){
		var xInterval = (highValue-lowValue)/scaleBox;
		var xAxislength = (vitalValue-lowValue)/xInterval;
		if(vitalRanges == 3) {
			if(vitalStatus == "Normal"){
				xAxislength = xAxislength+ (scaleBox * 1);
			}else if(vitalStatus == "High"){
				xAxislength = xAxislength+ (scaleBox * 2);
			}
		} else {			
			if(vitalStatus == "Normal"){
				xAxislength = xAxislength+(scaleBox * 1);
			}if(vitalStatus == "Acceptable"){
				xAxislength = xAxislength+(scaleBox * 2);
			}else if(vitalStatus == "High"){
				xAxislength = xAxislength+ (scaleBox * 3);
			}
		}
		return xAxislength;
	};
	// This is Html Dynamic Scalbars
	getProteinScalebarBox(){
		if(this.ProteinScalebarLength <= 1){	
			return 'One';
		}else if(this.ProteinScalebarLength > 1 && this.ProteinScalebarLength <= 2){
			// alert('ProteinScale');
			return 'Two';
		}else if (this.ProteinScalebarLength > 2 && this.ProteinScalebarLength <= 3){
			return 'Three';
		}else if (this.ProteinScalebarLength > 3 && this.ProteinScalebarLength <= 4){
			return 'Four';
		}else if (this.ProteinScalebarLength > 4 && this.ProteinScalebarLength <= 5){
			return 'Five';
		}else if (this.ProteinScalebarLength > 5 && this.ProteinScalebarLength <= 6){
			return 'Six';
		}
	};
	getTotalBodyWaterBox(){
		if(this.TotalBodyWaterLength <= 1){	
			return 'One';
		}else if(this.TotalBodyWaterLength > 1 && this.TotalBodyWaterLength <= 2){
			return 'Two';
		}else if (this.TotalBodyWaterLength > 2 && this.TotalBodyWaterLength <= 3){
			return 'Three';
		}else if (this.TotalBodyWaterLength > 3 && this.TotalBodyWaterLength <= 4){
			return 'Four';
		}else if (this.TotalBodyWaterLength > 4 && this.TotalBodyWaterLength <= 5){
			return 'Five';
		}else if (this.TotalBodyWaterLength > 5){
			return 'Six';
		}
	};
	getBodyFatMassBox(){
		if(this.BFMScalebarLength <= 1) {
			return 'One';
		} else if (this.BFMScalebarLength > 1 && this.BFMScalebarLength <= 2) {
			return 'Two';
		} else if (this.BFMScalebarLength > 2 && this.BFMScalebarLength <= 3) {
			return 'Three';
		} else if (this.BFMScalebarLength > 3 && this.BFMScalebarLength <= 4) {
			return 'Four';
		} else if (this.BFMScalebarLength > 4 && this.BFMScalebarLength <= 5) {
			return 'Five';
		} else if (this.BFMScalebarLength > 5 && this.BFMScalebarLength <= 6) {
			return 'Six';
		} else if (this.BFMScalebarLength > 6 && this.BFMScalebarLength <= 7) {
			return 'Seven';
		} else if (this.BFMScalebarLength > 7 && this.BFMScalebarLength <= 8) {
			return 'Eight';
		}
	};


	populateEcgCommonDetails(obj){
		let ecgCommonDetails = obj.ecgCommonDetails;
		if (ecgCommonDetails['PRInterval'] && ecgCommonDetails['PRInterval'].toString().trim().length > 0 && !isNaN(ecgCommonDetails['PRInterval'])) {
			this.PRInterval = ecgCommonDetails['PRInterval']  * 1000;
			this.PRIntervalUnits = "Ms";
			this.PRIntervalNR = "(120 ~ 200)";
		}else{
			// this.PRInterval = "N/A";
			this.PRInterval = "Not Taken";
			this.ECGTestNotTaken = "ECG";
		};

		if (ecgCommonDetails['QRSInterval'] && ecgCommonDetails['QRSInterval'].toString().trim().length > 0 && !isNaN(ecgCommonDetails['QRSInterval'])) {
			this.QRSInterval = ecgCommonDetails['QRSInterval']  * 1000;
			this.QRSIntervalUnits = "Ms";
			this.QRSIntervalNR = "(80 ~ 120)";
		}else{
			// this.QRSInterval = "N/A";
			this.QRSInterval = "Not Taken";
		};

		if (ecgCommonDetails['QTCInterval'] && ecgCommonDetails['QTCInterval'].toString().trim().length > 0 && !isNaN(ecgCommonDetails['QTCInterval'])) {
			this.QTCInterval = ecgCommonDetails['QTCInterval']  * 1000;
			this.QTCIntervalUnits = "Ms";
			this.QTCIntervalNR = "(350 ~ 450)";
		}else{
			// this.QTCInterval = "N/A";
			this.QTCInterval = "Not Taken";
		};

		if (ecgCommonDetails['heartRate'] && ecgCommonDetails['heartRate'].toString().trim().length > 0 && !isNaN(ecgCommonDetails['heartRate'])) {
			this.heartRate = ecgCommonDetails['heartRate'];
			this.heartRateUnits = "BPM";
			this.heartRateNR = "(60 ~ 100)";
		}else{
			// this.heartRate = "N/A";
			this.heartRate = "Not Taken";
		};

		/*console.log("PRInterval "+this.PRInterval);
		console.log("QRSInterval "+this.QRSInterval);
		console.log("QTCInterval "+this.QTCInterval);
		console.log("heartRate "+this.heartRate);*/
	};

	populateEcgThreeLeadDetails(obj){
		let ecgThreeLeadDetails = obj.ecgThreeLeadDetails;
		if (ecgThreeLeadDetails['threeLead1GraphImage'] && ecgThreeLeadDetails['threeLead2GraphImage'] && ecgThreeLeadDetails['threeLead3GraphImage'] && ecgThreeLeadDetails['threeLead1GraphImage'].toString().trim().length > 0 && ecgThreeLeadDetails['threeLead2GraphImage'].toString().trim().length > 0 && ecgThreeLeadDetails['threeLead3GraphImage'].toString().trim().length > 0) {
			this.threeLead1GraphImage = ecgThreeLeadDetails['threeLead1GraphImage'];
			this.threeLead2GraphImage = ecgThreeLeadDetails['threeLead2GraphImage'];
			this.threeLead3GraphImage = ecgThreeLeadDetails['threeLead3GraphImage'];
			this.ecgThreeLeadTestTaken = true;
			this.ecgSixLeadTestTaken = false;
		};

		/*console.log("threeLead1GraphImage "+this.threeLead1GraphImage);
		console.log("threeLead2GraphImage "+this.threeLead2GraphImage);
		console.log("threeLead3GraphImage "+this.threeLead3GraphImage);*/
	};

	populateSixLeadDetails(obj){
		let ecgSixLeadDetails = obj.ecgSixLeadDetails;
		if (ecgSixLeadDetails['sixLead1GraphImage'] && ecgSixLeadDetails['sixLead2GraphImage'] && ecgSixLeadDetails['sixLead3GraphImage'] && ecgSixLeadDetails['sixLeadAVRGraphImage'] && ecgSixLeadDetails['sixLeadAVLGraphImage'] && ecgSixLeadDetails['sixLeadAVFGraphImage'] &&
		 ecgSixLeadDetails['sixLead1GraphImage'].toString().trim().length > 0 && ecgSixLeadDetails['sixLead2GraphImage'].toString().trim().length > 0 && ecgSixLeadDetails['sixLead3GraphImage'].toString().trim().length > 0 && ecgSixLeadDetails['sixLeadAVRGraphImage'].toString().trim().length > 0 && ecgSixLeadDetails['sixLeadAVLGraphImage'].toString().trim().length > 0 && ecgSixLeadDetails['sixLeadAVFGraphImage'].toString().trim().length > 0) {
			this.sixLead1GraphImage = ecgSixLeadDetails['sixLead1GraphImage'];
			this.sixLead2GraphImage = ecgSixLeadDetails['sixLead2GraphImage'];
			this.sixLead3GraphImage = ecgSixLeadDetails['sixLead3GraphImage'];
			this.sixLeadAVRGraphImage = ecgSixLeadDetails['sixLeadAVRGraphImage'];
			this.sixLeadAVLGraphImage = ecgSixLeadDetails['sixLeadAVLGraphImage'];
			this.sixLeadAVFGraphImage = ecgSixLeadDetails['sixLeadAVFGraphImage'];
			this.ecgSixLeadTestTaken = true;
			this.ecgThreeLeadTestTaken = false;
		};

		/*console.log("sixLead1GraphImage "+this.sixLead1GraphImage);
		console.log("sixLead2GraphImage "+this.sixLead2GraphImage);
		console.log("sixLead3GraphImage "+this.sixLead3GraphImage);
		console.log("sixLeadAVRGraphImage "+this.sixLeadAVRGraphImage);
		console.log("sixLeadAVLGraphImage "+this.sixLeadAVLGraphImage);
		console.log("sixLeadAVFGraphImage "+this.sixLeadAVFGraphImage);*/
	};

	populateStatusBarValues(obj){
		if (this.bmiTestTaken) {
			if(this.bmi < 18 ){
            	this.bmiStatusBarValue =  20;
        	} else if(this.bmi >= 18 && this.bmi <= 20){
            	this.bmiStatusBarValue =  45;
        	} else if(this.bmi >= 20 && this.bmi <= 24){
           		this.bmiStatusBarValue =  55;
        	} else if(this.bmi > 24){
            	this.bmiStatusBarValue =  90;
        	}
		};

		if (this.bpTestTaken) {           
        	if(this.systolic < 100){
            	this.systolicStatusBarValue =  25;
            } else if(this.systolic >= 100 && this.systolic <= 105){
            	this.systolicStatusBarValue =  40;
            } else if(this.systolic >= 105 && this.systolic <= 110){
            	this.systolicStatusBarValue =  50;
            } else if(this.systolic >= 110 && this.systolic <= 120){
            	this.systolicStatusBarValue =  60;
            } else if(this.systolic > 120){
            	this.systolicStatusBarValue =  90;
            }

            if(this.diastolic < 60){
            	this.dystolicStatusBarValue =  25;
            } else if(this.diastolic >= 65 && this.diastolic <= 70){
            	this.dystolicStatusBarValue =  45;
            } else if(this.diastolic >= 70 && this.diastolic <= 80){
            	this.dystolicStatusBarValue =  55;
            } else if(this.diastolic > 80){
            	this.dystolicStatusBarValue =  90;
            }

            if(this.pulse < 60){
            	this.pulseStatusBarValue =  25;
            } else if(this.pulse >= 60 && this.pulse <= 70){
            	this.pulseStatusBarValue =  40;
            } else if(this.pulse >= 70 && this.pulse <= 80){
            	this.pulseStatusBarValue =  50;
            } else if(this.pulse >= 80 && this.pulse <= 100){
            	this.pulseStatusBarValue =  60;
            } else if(this.pulse > 100){
            	this.pulseStatusBarValue =  90;
            }
		};

		if (this.spo2TestTaken) {             
        	if(this.oxygenLevel < 95 ){
          		this.oxygenLevelStatusBarValue =  20;
        	} else if(this.oxygenLevel > 95 && this.oxygenLevel < 99){
          		this.oxygenLevelStatusBarValue =  50;
        	} else if(this.oxygenLevel > 99){
          		this.oxygenLevelStatusBarValue =  80;
        	} 
		};

		if (this.temperatureTestTaken) { 
			if(this.bodyTemperature < 96 ){
	        	this.temperatureStatusBarValue =  25;
	        } else if(this.bodyTemperature >= 96 && this.bodyTemperature <= 97){
	        	this.temperatureStatusBarValue =  45;
	        } else if(this.bodyTemperature >= 97 && this.bodyTemperature <= 99){
	        	this.temperatureStatusBarValue =  55;
	        } else if(this.bodyTemperature > 99){
	        	this.temperatureStatusBarValue =  95;
	        }
		};

		if (this.halfBodyBmcTestTaken) {
			if(this.fatPercent < 10){
            	this.halfBodyBmcStatusBarValue =  25;
          	} else if(this.fatPercent >= 10 && this.fatPercent <= 18){
            	this.halfBodyBmcStatusBarValue =  50;
          	} else if(this.fatPercent >= 18 && this.fatPercent <= 28){
            	this.halfBodyBmcStatusBarValue =  70;
          	} else if(this.fatPercent > 28){
            	this.halfBodyBmcStatusBarValue =  95;
          	}
		};

		if (this.fullBodyBmcTestTaken) {
			if (this.percentBodyFat && !isNaN(this.percentBodyFat)) {
				if(this.percentBodyFat < 10){
            		this.fullBodyBmcStatusBarValue =  25;
          		} else if(this.percentBodyFat >= 10 && this.percentBodyFat <= 18){
            		this.fullBodyBmcStatusBarValue =  50;
          		} else if(this.percentBodyFat >= 18 && this.percentBodyFat <= 28){
            		this.fullBodyBmcStatusBarValue =  70;
          		} else if(this.percentBodyFat > 28){
            		this.fullBodyBmcStatusBarValue =  95;
          		}
			};

			if (this.extraCellularWater && !isNaN(this.extraCellularWater)) {
				if(this.extraCellularWater < 11 ){
                	this.extraCellularWaterStatusBarValue =  20;
              	} else if(this.extraCellularWater > 11 && this.extraCellularWater < 13){
                	this.extraCellularWaterStatusBarValue =  60;
              	} else if(this.extraCellularWater > 13){
                	this.extraCellularWaterStatusBarValue =  95;
              	}
			};

			if (this.intraCellularWater && !isNaN(this.intraCellularWater)) {
				if(this.intraCellularWater < 16 ){
                    this.intraCellularWaterStatusBarValue =  20;
                } else if(this.intraCellularWater > 16 && this.intraCellularWater < 20){
                    this.intraCellularWaterStatusBarValue =  60;
               	} else if(this.intraCellularWater > 20){
                    this.intraCellularWaterStatusBarValue =  95;
                };
			};

			if (this.proteinContent && !isNaN(this.proteinContent)) {
				if(this.proteinContent < 8){
                	this.proteinContentStatusBarValue =  30;
                } else if(this.proteinContent > 8 && this.proteinContent < 20){
                	this.proteinContentStatusBarValue = 70;
                } else if(this.proteinContent > 20){
                	this.proteinContentStatusBarValue =  95;
                };
			};

			if (this.mineralContent && !isNaN(this.mineralContent)) {
                if(this.mineralContent < 2.5){
                	this.mineralContentStatusBarValue =  30;
                } else if(this.mineralContent > 2.5 && this.mineralContent < 4){
                	this.mineralContentStatusBarValue =  70;
                } else if(this.mineralContent > 4){
                	this.mineralContentStatusBarValue =  95;
                }
			};
		};

		/*console.log("bmiStatusBarValue "+this.bmiStatusBarValue);
		console.log("systolicStatusBarValue "+this.systolicStatusBarValue);
		console.log("dystolicStatusBarValue "+this.dystolicStatusBarValue);
		console.log("pulseStatusBarValue "+this.pulseStatusBarValue);
		console.log("oxygenLevelStatusBarValue "+this.oxygenLevelStatusBarValue);
		console.log("temperatureStatusBarValue "+this.temperatureStatusBarValue);
		console.log("halfBodyBmcStatusBarValue "+this.halfBodyBmcStatusBarValue);
		console.log("fullBodyBmcStatusBarValue "+this.fullBodyBmcStatusBarValue);
		console.log("extraCellularWaterStatusBarValue "+this.extraCellularWaterStatusBarValue);
		console.log("intraCellularWaterStatusBarValue "+this.intraCellularWaterStatusBarValue);
		console.log("mineralContentStatusBarValue "+this.mineralContentStatusBarValue);
		console.log("proteinContentStatusBarValue "+this.proteinContentStatusBarValue);*/
	};

	populateDietRecommendationDetails(obj){
		let dietRecommendationDetails = obj.dietRecommendationDetails;
		if(this.userAge >= 13 && this.userAge <= 35) {
        	this.exerciseTypeTitle = "print.intens";
        	this.exerciseType = dietRecommendationDetails.exercise_intense;
    	} else if(this.userAge >= 36 && this.userAge <= 60) {
        	this.exerciseTypeTitle = "print.moderat";
        	this.exerciseType =  dietRecommendationDetails.exercise_moderate;
    	} else if(this.userAge >= 61) {
        	this.exerciseTypeTitle = "print.ligh";
       		this.exerciseType =  dietRecommendationDetails.exercise_light;
       	}else{
       		this.exerciseTypeTitle = "print.moderat";
       		this.exerciseType =  dietRecommendationDetails.exercise_moderate;
       	};

       	if (dietRecommendationDetails.Recomedation && dietRecommendationDetails.Recomedation.trim().length > 0) {
       		this.otherRecommendation = dietRecommendationDetails.Recomedation;
       	}else{
       		this.otherRecommendation = "N/A";
       	};

       	if (dietRecommendationDetails.restrictions && dietRecommendationDetails.restrictions.trim().length > 0) {
       		this.restrictions = dietRecommendationDetails.restrictions;
       	}else{
       		this.restrictions = "N/A";
       	};

       	this.energyNeeded = dietRecommendationDetails.energy_needed;
       	this.dietRecommended = dietRecommendationDetails.recommedation;

       	/*console.log("exerciseType "+this.exerciseType);
		console.log("energyNeeded "+this.energyNeeded);
		console.log("dietRecommended "+this.dietRecommended);
		console.log("otherRecommendation "+this.otherRecommendation);
		console.log("restrictions "+this.restrictions);

		console.log("weightTestTaken "+this.weightTestTaken);
		console.log("bmiTestTaken "+this.bmiTestTaken);
		console.log("bpTestTaken "+this.bpTestTaken);
		console.log("spo2TestTaken "+this.spo2TestTaken);
		console.log("temperatureTestTaken "+this.temperatureTestTaken);
		console.log("halfBodyBmcTestTaken "+this.halfBodyBmcTestTaken);
		console.log("fullBodyBmcTestTaken "+this.fullBodyBmcTestTaken);
		console.log("ecgThreeLeadTestTaken "+this.ecgThreeLeadTestTaken);
		console.log("ecgSixLeadTestTaken "+this.ecgSixLeadTestTaken);*/
    };


	populateInvasiveDetails(obj){
		console.log(obj);
        let invasiveParameters = obj.invasiveTestResults;
		let vitalDynamicScalBar = obj.vitalDynamicScalBar;
		let invasiveTestStatus = obj.invasiveTestStatus;

		if(invasiveParameters['hemoglobin'] && invasiveParameters['hemoglobin'].toString().trim().length > 0 && !isNaN(invasiveParameters['hemoglobin'])){

			// This is for A4 Invasive Data Binding
			this.hemoglobin = invasiveParameters['hemoglobin'];

			this.HemoglobinStatus = obj.invasiveTestStatus['heamoglobin_class'];
			
			// Ranges for Hemoglobin

			this.HemoglobinStartValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinStartValue'];
			this.HemoglobinVeryLowValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'];
			this.HemoglobinLowValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinLowValue'];
			this.HemoglobinAcceptableValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinAcceptableValue'];
			this.HemoglobinNormalValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinNormalValue'];
			this.HemoglobinHighValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinHighValue'];
			this.HemoglobinEndValue = vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue'];


			// This is for Hemoglobin Width

			this.HemoglobinWidthInd = this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'],this.hemoglobin,this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'],vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']));

			// Health Indicator Dynamic Width

			this.VeryLowHemoglobin = {
				width: this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinLowValue'], this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']))+"%"
			}

			this.LowHemoglobin = {
				width: this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinAcceptableValue'], this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']))+"%"
			}

			this.AcceptableHemoglobin = {
				width: this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinAcceptableValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinNormalValue'], this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']))+"%"
			}

			this.NormalHemoglobin = {
				width: this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinNormalValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinHighValue'], this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']))+"%"
			}

			this.HighHemoglobin = {
				width: this.findDynamicWidth(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinHighValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue'], this.getXaisPoint(vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinVeryLowValue'], vitalDynamicScalBar['HeamoglobinNewReferenceRanges']['HemoglobinEndValue']))+"%"
			}

			if(this.HemoglobinWidthInd >= 100){
				this.HemoglobinWidthInd = 100
			}


			this.HemoglobinArrow = {
				marginLeft : this.HemoglobinWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicHemoglobinValueMovement = {
				marginLeft : this.HemoglobinWidthInd + "%"
			}


			this.hemoglobinUnits = "g/dl";
			// console.log(this.userGender);


			if(this.userGender == 'Male'){
				this.hemoglobinNR = "(13.5 ~ 18)";
			}else{
				this.hemoglobinNR = "(12 ~ 16)";
			}


			this.hemoglobinTestTaken = true;
		}else{
			this.hemoglobin = 'Not Taken';
		}


		if(invasiveParameters['glucose_random'] && invasiveParameters['glucose_random'].toString().trim().length > 0 && !isNaN(invasiveParameters['glucose_random'])){

			this.glucose_random = invasiveParameters['glucose_random'];
			this.glucose_randomUnits = "g/dl";
			this.glucoseNR = "(< 200)";
			// This is for A4 Invasive Data Binding
			this.GlucoseRandomTestStatus = obj.invasiveTestStatus['glucose_random_class'];	


			
			// Ranges For Random Glucose

			this.RandomGlucoseStartValue = vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseStartValue'];
			this.RandomGlucoseNormalValue = vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'];
			this.RandomGlucosePreDiabetesValue  = vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucosePreDiabetesValue'];
			this.RandomGlucoseDiabetesValue  = vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseDiabetesValue'];
			this.RandomGlucoseEndValue  = vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue'];
			
			// This is for Random Glucose Width, Arrow Indicator and Percentage Indicator
			this.RandomGlucoseScalebar = this.findDynamicWidth(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], this.glucose_random, this.getXaisPoint(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue']));

			// Health Indicator Dynamic Width for ng dynamic style

			this.RandomGlucoseNormalWidth = {
				width: this.findDynamicWidth(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucosePreDiabetesValue'], this.getXaisPoint(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue']))+"%"
			}

			this.RandomGlucosePreDiabeticWidth = {
				width: this.findDynamicWidth(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucosePreDiabetesValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseDiabetesValue'], this.getXaisPoint(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue']))+"%"
			}

			this.RandomGlucoseDiabeticWidth = {
				width: this.findDynamicWidth(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseDiabetesValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue'], this.getXaisPoint(vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseNormalValue'], vitalDynamicScalBar['RandomGlucoseNewReferenceRanges']['RandomGlucoseEndValue']))+"%"
			}

			if(this.RandomGlucoseScalebar >= 100){
				this.RandomGlucoseScalebar = 100
			}

			this.RandomGlucoseArrow = {
				marginLeft : this.RandomGlucoseScalebar+"%"
			};

			// For A4 Printout Functionality
			this.DynamicRandomGlucoseValueMovement = {
				marginLeft : this.RandomGlucoseScalebar+"%"
			};

			this.glucoseTestTaken = true;
		}
		// else{
		// 	this.glucose_random = 'Not Taken';
		// }

		if(invasiveParameters['glucose_fasting'] && invasiveParameters['glucose_fasting'].toString().trim().length > 0 && !isNaN(invasiveParameters['glucose_fasting'])){
			this.glucose_fasting = invasiveParameters['glucose_fasting'];
			this.glucose_randomUnits = "g/dl";
			this.glucoseNR = "(< 100)";

			// This is for A4 Invasive Data Binding
			this.GlucoseFastingTestStatus = obj.invasiveTestStatus['glucose_fasting_class'];


			// Ranges for Glucose Fasting

			this.FastingGlucoseStartValue = vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseStartValue'];
			this.FastingGlucoseNormalValue = vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'];
			this.FastingGlucoseAcceptableValue  = vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseAcceptableValue'];
			this.FastingGlucoseHighValue  = vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseHighValue'];
			this.FastingGlucoseEndValue  = vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue'];

			// This is for Fasting Glucose Width

			this.FastingGlucoseWidthInd = this.findDynamicWidth(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'],this.glucose_fasting,this.getXaisPoint(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'],vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue']));

			// Health Indicator Dynamic Width
			this.FastingGlucoseNormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseAcceptableValue'], this.getXaisPoint(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue']))+"%"
			}

			this.FastingGlucosePreDiabetic = {
				width: this.findDynamicWidth(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseAcceptableValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseHighValue'], this.getXaisPoint(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue']))+"%"
			}

			this.FastingGlucoseDiabetic = {
				width: this.findDynamicWidth(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseHighValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue'], this.getXaisPoint(vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseNormalValue'], vitalDynamicScalBar['FastingGlucoseNewReferenceRanges']['FastingGlucoseEndValue']))+"%"
			}

			if(this.FastingGlucoseWidthInd >= 100){
				this.FastingGlucoseWidthInd = 100
			}


			this.FastingGlucoseArrow = {
				marginLeft : this.FastingGlucoseWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicFastingGlucoseValueMovement = {
				marginLeft : this.FastingGlucoseWidthInd + "%"
			}

			this.glucoseTestTaken = true;
		}

		if(invasiveParameters['glucose_post_prandial'] && invasiveParameters['glucose_post_prandial'].toString().trim().length > 0 && !isNaN(invasiveParameters['glucose_post_prandial'])){

			this.glucose_post_prandial = invasiveParameters['glucose_post_prandial'];
			this.glucose_randomUnits = "g/dl";
			this.glucoseNR = "(< 140)";

			// This is for A4 Invasive Data Binding
			this.GlucosePostPrandialTestStatus = obj.invasiveTestStatus['glucose_post_prandial_class'];

			// Ranges for Glucose Post Prandial

			this.PostPrandialGlucoseStartValue = vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseStartValue'];
			this.PostPrandialGlucoseNormalValue = vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'];
			this.PostPrandialGlucosePreDiabetesValue  = vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucosePreDiabetesValue'];
			this.PostPrandialGlucoseDiabetesValue  = vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseDiabetesValue'];
			this.PostPrandialGlucoseEndValue  = vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue'];



			// This is for Post Prandial Glucose Width

			this.PostPrandialGlucoseWidthInd = this.findDynamicWidth(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'],this.glucose_post_prandial,this.getXaisPoint(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'],vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue']));

			// Health Indicator Dynamic Width
			this.PostPrandialNormal = {
				width: this.findDynamicWidth(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucosePreDiabetesValue'], this.getXaisPoint(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue']))+"%"
			}

			this.PostPrandialPreDiabetic = {
				width: this.findDynamicWidth(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucosePreDiabetesValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseDiabetesValue'], this.getXaisPoint(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue']))+"%"
			}

			this.PostPrandialDiabetic = {
				width: this.findDynamicWidth(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseDiabetesValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue'], this.getXaisPoint(vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseNormalValue'], vitalDynamicScalBar['PostPrandialGlucoseNewReferenceRanges']['PostPrandialGlucoseEndValue']))+"%"
			}

			if(this.PostPrandialGlucoseWidthInd >= 100){
				this.PostPrandialGlucoseWidthInd = 100
			}


			this.PostPrandialArrow = {
				marginLeft : this.PostPrandialGlucoseWidthInd + "%"
			}

			// For A4 Printout Functionality
			this.DynamicPostPrandialValueMovement = {
				marginLeft : this.PostPrandialGlucoseWidthInd + "%"
			}

			this.glucoseTestTaken = true;
		}

		if(invasiveParameters['dengue_IgG'] && invasiveParameters['dengue_IgM']){
			this.dengue_IgG = invasiveParameters['dengue_IgG'];
			this.dengue_IgM = invasiveParameters['dengue_IgM'];
			this.dengueTestTaken = true;
		}else{
			this.dengue_IgG = 'Not Taken';
			this.dengue_IgM = 'Not Taken';
		}

		if(invasiveParameters['malaria_p_v'] && invasiveParameters['malaria_p_f']){
			this.malaria_p_v = invasiveParameters['malaria_p_v'];
			this.malaria_p_f = invasiveParameters['malaria_p_f'];
			this.malariaTestTaken = true;
		}else{
			this.malaria_p_v = 'Not Taken';
			this.malaria_p_f = 'Not Taken';
		}

		if(invasiveParameters['hiv_I'] && invasiveParameters['hiv_II']){
			this.hiv_I = invasiveParameters['hiv_I'];
			this.hiv_II = invasiveParameters['hiv_II'];
			this.hivTestTaken = true;
		}else{
			this.hiv_I = 'Not Taken';
			this.hiv_II = 'Not Taken';		
		}

		if(invasiveParameters['hcv']){
			this.hcv = invasiveParameters['hcv'];
			this.hcvTestTaken = true;
		}else{
			this.hcv = 'Not Taken';
		}

		if(invasiveParameters['troponin']){
			this.troponin = invasiveParameters['troponin'];
			this.troponinTestTaken = true;
		}else{
			this.troponin = 'Not Taken';
		}

		if(invasiveParameters['syphilis']){
			this.syphilis = invasiveParameters['syphilis'];
			this.syphilisTestTaken = true;
		}else{
			this.syphilis = 'Not Taken';
		}

		if(invasiveParameters['pregnancy']){
			this.pregnancy = invasiveParameters['pregnancy'];
			this.pregnancyTestTaken = true;
		}else{
			this.pregnancy = 'Not Taken';
		}

		if(invasiveParameters['lipid_profile_tc'] && invasiveParameters['lipid_profile_hg'] && invasiveParameters['lipid_profile_ldl'] && invasiveParameters['lipid_profile_tg'] && invasiveParameters['lipid_profile_tc'].toString().trim().length > 0 && invasiveParameters['lipid_profile_hg'].toString().trim().length > 0 && invasiveParameters['lipid_profile_ldl'].toString().trim().length > 0 && invasiveParameters['lipid_profile_tg'].toString().trim().length > 0){//&& invasiveParameters['lipid_profile_tc'] && invasiveParameters['lipid_profile_hg'] && invasiveParameters['lipid_profile_ldl'] && invasiveParameters['lipid_profile_tg']

			// This is for A4 Invasive Data Binding
			this.TotalCholesterolTestStatus = obj.invasiveTestStatus['lipid_profile_tc_class'];
			
			this.HDLTestStatus = obj.invasiveTestStatus['lipid_profile_hgl_class'];
			
			this.LDLTestStatus = obj.invasiveTestStatus['lipid_profile_ldl_class'];
			
			this.TriglyceridesTestStatus = obj.invasiveTestStatus['lipid_profile_tg_class'];

			// This Code Below is USed For Kolors A4 and will be used for All Templates in Future

			// TC
			this.TcStartValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcStartValue'];
			this.TcNormalValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcNormalValue'];
			this.TcAcceptableValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcAcceptableValue'];
			this.TcBorderlineHighValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcBorderlineHighValue'];
			this.TcHighValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcHighValue'];
			this.TcEndValue =  obj.vitalDynamicScalBar['TCNewReferenceRanges']['TcEndValue'];

			// HDL
			this.HDLStartValue =  obj.vitalDynamicScalBar['HDLNewReferenceRanges']['HDLStartValue'];
			this.HDLLowValue =  obj.vitalDynamicScalBar['HDLNewReferenceRanges']['HDLLowValue'];
			this.HDLBorderlineLowValue =  obj.vitalDynamicScalBar['HDLNewReferenceRanges']['HDLBorderlineLowValue'];
			this.HDLNormalValue =  obj.vitalDynamicScalBar['HDLNewReferenceRanges']['HDLNormalValue'];
			this.HDLEndValue =  obj.vitalDynamicScalBar['HDLNewReferenceRanges']['HDLEndValue'];

			// LDL

			this.LDLStartValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLStartValue'];
			this.LDLNormalValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLNormalValue'];
			this.LDLAcceptableValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLAcceptableValue'];
			this.LDLBorderlineHighValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLBorderlineHighValue'];
			this.LDLHighValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLHighValue'];
			this.LDLEndValue =  obj.vitalDynamicScalBar['LDLNewReferenceRanges']['LDLEndValue'];

			// TG

			this.TGStartValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGStartValue'];
			this.TGNormalValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGNormalValue'];
			this.TGAcceptableValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGAcceptableValue'];
			this.TGBorderlineHighValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGBorderlineHighValue'];
			this.TGHighValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGHighValue'];
			this.TGEndValue =  obj.vitalDynamicScalBar['TGNewReferenceRanges']['TGEndValue'];
			

			console.log(this.lipid_profileTestTaken,invasiveParameters);
			this.lipid_profile_tc = invasiveParameters['lipid_profile_tc'];
			this.lipid_profile_hg = invasiveParameters['lipid_profile_hg'];
			this.lipid_profile_ldl = invasiveParameters['lipid_profile_ldl'];
			this.lipid_profile_tg = invasiveParameters['lipid_profile_tg'];
			this.lipid_profileTestTaken = true;
			this.lipid_profileUnits = "mg/dl";
			this.lipid_profile_tcNR = "(< 200)";
			this.lipid_profile_hgNR = "(> 60)"
			this.lipid_profile_ldlNR = "(< 100)";
			this.lipid_profile_tgNR = "(< 150)";
			// if(this.userGender == 'Male'){ //given by shreemathi
			// 	this.lipid_profile_hgNR = "(> 40)";
			// }else{
			// 	this.lipid_profile_hgNR = "(> 50)";
			// }
		}else{
			console.log(this.lipid_profileTestTaken,invasiveParameters);
		}

		// if(invasiveParameters['urine_leukocytes'] && invasiveParameters['urine_nitrite'] && invasiveParameters['urine_urobilinogen'] && invasiveParameters['urine_protein'] && invasiveParameters['urine_ph'] && invasiveParameters['urine_blood'] && invasiveParameters['urine_specific_gravity'] && invasiveParameters['urine_ketone'] && invasiveParameters['urine_bilirubin'] && invasiveParameters['urine_glucose'] && invasiveParameters['urine_leukocytes'].toString().trim().length > 0 && invasiveParameters['urine_nitrite'].toString().trim().length > 0 && invasiveParameters['urine_urobilinogen'].toString().trim().length > 0 && invasiveParameters['urine_protein'].toString().trim().length > 0 && invasiveParameters['urine_ph'].toString().trim().length > 0 && invasiveParameters['urine_blood'].toString().trim().length > 0 && invasiveParameters['urine_specific_gravity'].toString().trim().length > 0 && invasiveParameters['urine_ketone'].toString().trim().length > 0 && invasiveParameters['urine_bilirubin'].toString().trim().length > 0 && invasiveParameters['urine_glucose'].toString().trim().length > 0){//&& invasiveParameters['urine_leukocytes'] && invasiveParameters['urine_nitrite'] && invasiveParameters['urine_urobilinogen'] && invasiveParameters['urine_protein'] && invasiveParameters['urine_ph'] && invasiveParameters['urine_blood'] && invasiveParameters['urine_specific_gravity'] && invasiveParameters['urine_ketone'] && invasiveParameters['urine_bilirubin'] && invasiveParameters['urine_glucose'] 
		if(invasiveParameters['urine_ph'] && invasiveParameters['urine_ph'].toString().trim().length > 0){
			console.log(this.urineTestTaken,invasiveParameters);

			this.urine_leukocytes = invasiveParameters['urine_leukocytes'];
			if(this.urine_leukocytes === "+"){
				this.urine_leukocytes = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_leukocytes = "Absent";
			}else{
				this.urine_leukocytes = "Nil";
			};

			this.urine_nitrite = invasiveParameters['urine_nitrite'];
			if(this.urine_nitrite === "+"){
				this.urine_nitrite = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_nitrite = "Absent";
			}else{
				this.urine_nitrite = "Nil";
			};

			this.urine_urobilinogen = invasiveParameters['urine_urobilinogen'];
			if(this.urine_urobilinogen === "+"){
				this.urine_urobilinogen = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_urobilinogen = "Absent";
			}else{
				this.urine_urobilinogen = "Nil";
			};

			this.urine_protein = invasiveParameters['urine_protein'];
			if(this.urine_protein === "+"){
				this.urine_protein = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_protein = "Absent";
			}else{
				this.urine_protein = "Nil";
			};

			this.urine_ph = invasiveParameters['urine_ph'];
			
			this.urine_blood = invasiveParameters['urine_blood'];
			if(this.urine_blood === "+"){
				this.urine_blood = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_blood = "Absent";
			}else{
				this.urine_blood = "Nil";
			};

			this.urine_specific_gravity = invasiveParameters['urine_specific_gravity'];
			this.urine_ketone = invasiveParameters['urine_ketone'];
			if(this.urine_ketone === "+"){
				this.urine_ketone = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_ketone = "Absent";
			}else{
				this.urine_ketone = "Nil";
			};

			this.urine_bilirubin = invasiveParameters['urine_bilirubin'];
			if(this.urine_bilirubin === "+"){
				this.urine_bilirubin = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_bilirubin = "Absent";
			}else{
				this.urine_bilirubin = "Nil";
			};

			this.urine_glucose = invasiveParameters['urine_glucose'];
			if(this.urine_glucose === "+"){
				this.urine_glucose = "Present";
			}else if(this.urine_urobilinogen === "-"){
				this.urine_glucose = "Absent";
			}else{
				this.urine_glucose = "Nil";
			};

			this.urineTestTaken = true;

			this.urine_leukocytesUnits = "Leu/µL";
			this.urine_bloodUnits = "Ery/µL";
			this.urineUnits = "mg/dl";
		}else{
			console.log(this.urineTestTaken,invasiveParameters);
		}
	};

}

class PrintChildContants{
	"use strict";
	logo = "data:image/bmp;base64,Qk34EwQAAAAAADYAAAAoAAAAkAEAAKcAAAABACAAAAAAAMITBAASCwAAEgsAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AODe2AC9u7YAqqiiAKikmwCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqaaeAKmmngCppp4AqKSbAKqoogC+vLcA4+HaAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APX08gC6ubYAuLe0AO/v7QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AnpyXAD89OAACAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQCAABAPjoAoJ6ZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ188AAAAAAAAAAADCwLoA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDf3dcAODYxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzYA5OHcAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3NrTAAAAAAAAAAAAx8W/AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDX1M0ADQsGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEPCwDc2tUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDz8vAAFBINAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGhgSAPr49QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AYV5XAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABraGEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5OLdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAObk4AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AImHgQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACSkIoA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBRT0gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWFZPAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APjw2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA+OAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADEvKwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwkEAEpJQgBOTUkATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAExLRABMS0QATEtEAE5NSgBJR0AABAMAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3NzQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAzMi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALy0oAOfl3wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN7b1QAjIR0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMG/uAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ArKmiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADZ2NYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMnHvwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AmpeQAHZ0bQB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAe3lzAHt5cwB7eXMAendyAHl3cQDp6OYA////AP///wD///8A////AP///wD///8A////AOvq5wB8eXMAfHpzAHh2bwCdm5MA////AP///wD///8A////AP///wD///8A////AP///wD///8AzczGAHZzbAB7eXMAdHJrALq4swD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AiYeAAHZzbQB7eXMAe3lzAHt5cwB1c20An5yTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCmpJ0AdHFrAHp4cwBzcWsAraqjAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AO7s5wCAfnkAdXNtAHp4cwB6eHIAaWhkAFNRSQDBvrYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0M/NAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDAvrYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ABwaFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0M7LAP///wD///8A////AP///wD///8A////AP///wDS0c0AAAAAAAAAAAAAAAAAIB0XAP///wD///8A////AP///wD///8A////AP///wD///8A////AJKPiAAAAAAAAAAAAAAAAABlY10A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AUk9HAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACklGgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOTcwAAAAAAAAAAAAAAAAAEpHPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK6spQAXFRAAAAAAAAAAAAAAAAAAAAAAAAAAAABtamMA5+biAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANfW0wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ATUpEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A9/XxAGViXAAAAAAAAAAAAAAAAAAAAAAAAAAAAENBPADc2tYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADRz8wA////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ASEZAAAAAAAAAAAAAAAAAAAAAAAAbGBEAEA8MAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AurewACAeGAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6MhQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAACFgnsAn52XAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJuZlACbmZQAm5mUAJqXkgCZl5IA7u3sAP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///4AQ0A6AAAAAAAAAAAAAAAAAAAAAABfXFgA5uDTAA4NCgAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///sAcW9nAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjcxANTSzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA/fz5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//vsAPTs1AAAAAAAAAAAAAAAAAAAAAABDQToA////APLw6gAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDEwrwAKykjAAAAAAAAAAAAAAAAAAAAAAAAAAAAgX94AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD9/PkAOTczAAAAAAAAAAAAAAAAAAAAAABIRj4A////AP///wDLyMAAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB9e3UAAAAAAAAAAAAAAAAAAAAAAAAAAAAtKyYAyMXAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD9+/gANzUwAAAAAAAAAAAAAAAAAAAAAABNSkIA////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANDOyAA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAB0cm0A///8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+fUANDItAAAAAAAAAAAAAAAAAAAAAABRTkcA////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIqIgQAAAAAAAAAAAAAAAAAAAAAAAAAAACQiHAC9u7UA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD49/IAMS8qAAAAAAAAAAAAAAAAAAAAAABVU00A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A29nTAEI/OQAAAAAAAAAAAAAAAAAAAAAAAAAAAGlnYAD7+vUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD19O8ALiwmAAAAAAAAAAAAAAAAAAAAAABbWVMA////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AlpSPAAUDAAAAAAAAAAAAAAAAAAAAAAAAGhgTALKvqQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDx8OwAKigjAAAAAAAAAAAAAAAAAAAAAABhX1cA////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDk4t0ATEpEAAAAAAAAAAAAAQAAAAAAAAAAAAAAXlxWAPLw7AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDw7+kAJiQfAAAAAAAAAAAAAAAAAAAAAABjYVsA////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJgADgwHAAAAAAAAAAAAAAAAAAAAAAAREAsAp6WeAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDt6+cAJSMdAAAAAAAAAAAAAAAAAAAAAABlY14A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AO/u6QBaV1EAAAAAAAAAAAAAAAAAAAAAAAAAAABRTkkA6ObhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDo5uEAIB4YAAAAAAAAAAAAAAAAAAAAAABoZWAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALCupwAYFhEAAAAAAAAAAAAAAAAAAAAAAAgGAQCamJIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDk4t0AGhkUAAAAAAAAAAAAAAAAAAAAAABsamMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+PbzAGZkXgAAAAAAAAAAAAAAAAAAAAAAAAAAAEVDPQDe3NYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDi39gAFxUQAAAAAAAAAAAAAAAAAAAAAABwbmgA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AureyACEfGgAAAAAAAAAAAAAAAAAAAAAAAAAAAI+MhgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd2tQAFBEMAAAAAAAAAAAAAAAAAAAAAAB0cWwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///wAcm9pAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjgyANTSzQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDY1dEAEA0JAAAAAAAAAAAAAAAAAAAAAAB3dm8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAd3NoAP///wD///8A////AP///wD///8A////AP///wDGxL0ALSokAAAAAAAAAAAAAAAAAAAAAAAAAAAAgoB6AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDX1NAADQsIAAAAAAAAAAAAAAAAAAAAAAB7eXEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAD07NQCgnpsAmJaUAJiWkwCYlpMAmJaTAKCfmwB1c24AAAAAAAAAAAAAAAAAAAAAAAAAAAAwLSgAycfBAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDV1M8ADAoHAAAAAAAAAAAAAAAAAAAAAACBfncA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgXFgCAfngA///+AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADQyLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRz8sACQgFAAAAAAAAAAAAAAAAAAAAAACGhH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXVE0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA0Mi0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC/vbUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk1AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDMysYABwUCAAAAAAAAAAAAAAAAAAAAAACMiYIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEE/OwDU0s0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDItAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Av721AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADo5NQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDJyMIAAwEAAAAAAAAAAAAAAAAAAAAAAACRjoYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAAA8OTIAmpePAJSSjACUkowAlJKMAJSSjACYlY4AkY+JACwqJAAAAAAAAAAAAAAAAAAAAAAAAAAAAIqHggD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADIwLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6OTUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDGxL4AAQEAAAAAAAAAAAAAAAAAAAAAAACVk4oA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAdnNoAP///wD///8A////AP///wD///8A////AP///wD///oAdnNsAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs2ANXTzQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAWEwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyMbDAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC6t64AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKSglAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDCwLgAAAAAAAAAAAAAAAAAAAAAAAAAAACXlY4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wDAvrgAKighAAAAAAAAAAAAAAAAAAAAAAAAAAAAi4iDAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8As7GrAJuZkwChn5kAoZ+ZAKGfmQChn5kAoZ+ZAKGfmQCfnZgAnpyWAOzs6gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AxMK5ABIRDwAVExAAFhQQABYUEAAWFBAAFhQQABYUEAAWFBAAEhEPAElHQgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC9ubIAAAAAAAAAAAAAAAAAAAAAAAAAAACamJEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/++QB0cmsAAAAAAAAAAAAAAAAAAAAAAAAAAAA+PTcA1dPOAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APz8/AD08/EA9vXxAPf18gD39fIA9/XyAPf18gD39fIA9/XyAPTz8AD49/QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wD///8A////AP///wC5tq8AAAAAAAAAAAAAAAAAAAAAAAAAAACcmpQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMG+uAArKCIAAAAAAAAAAAAAAAAAAAAAAAAAAACKiIIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wD///8A////AP///wC0saoAAAAAAAAAAAAAAAAAAAAAAAAAAACioJsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//75AHVzbAAAAAAAAAAAAAAAAAAAAAAAAAAAAD08NwDU0s0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wD///8A////AP///wCvrKQAAAAAAAAAAAAAAAAAAAAAAAAAAACmpaAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Awb+4ACsoIgAAAAAAAAAAAAAAAAAAAAAAAAAAAIqIggD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wD///8A////AP///wCrqKEAAAAAAAAAAAAAAAAAAAAAAAAAAACpp6MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//vkAdHJrAAAAAAAAAAAAAAAAAAAAAAAAAAAAPjw3ANTSzQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB8enQA////AP///wD///8A////AP///wCnpaAAAAAAAAAAAAAAAAAAAAAAAAAAAACsqaQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDAvrgAKigiAAAAAAAAAAAAAAAAAAAAAAAAAAAAiYeBAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAfHp0AP///wD///8A////AP///wCkop4AAAAAAAAAAAAAAAAAAAAAAAAAAACxrqcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP//+QB0cmsAAAAAAAAAAAAAAAAAAAAAAAAAAAA+PDYA1dPOAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAHx6dAD///8A////AP///wChn5oAAAAAAAAAAAAAAAAAAAAAAAAAAAC2tKwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMC+uAAqJyEAAAAAAAAAAAAAAAAAAAAAAAAAAACKiIIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2NjYAJOTkwBiYmIARkZGADw8PABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQABAQEAAQEBAAEBAQAA8PDwAPj4+ALa2tgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKmpqQA+Pj4AQEBAAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAEJCQgBCQkIAQkJCAD8/PwBISEgAZmZmAJqamgDe3t4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAB5eHEA////AP///wCamZMAAAAAAAAAAAAAAAAAAAAAAAAAAAC7uLEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//35AHRyawAAAAAAAAAAAAAAAAAAAAAAAAAAAD07NwDU0s0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDl5eUAXV1dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt7e3AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKioqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAGtrawDx8fEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAhIN/AP///wCXlpEAAAAAAAAAAAAAAAAAAAAAAAAAAAC9u7MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AwL64ACspIwAAAAAAAAAAAAAAAAAAAAAAAAAAAImHgQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+vr4ADw8PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC3t7cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKmpqQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGxsbAM7OzgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APTw3AAAAAAAAAAAAAAAAANnX1AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANnY1QAAAAAAAAAAAAAAAABBPjkA////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAAAAAAAAAAAAAAAAAKelnQC+vLYAAAAAAAAAAAAAAAAAAAAAAAAAAADCwLcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRzsYAAAAAAAAAAAAAAAAASUU8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBXVE8AAAAAAAAAAAAAAAAAZWJZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//vkAdHJrAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs2ANTSzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDMzMwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALa2tgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKqqqgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAwMA3d3dAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD08NwAAAAAAAAAAAAAAAADZ19QA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDZ2NUAAAAAAAAAAAAAAAAAQT45AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKgmgAAAAAAAAAAAAAAAAAqKCIAAAAAAAAAAAAAAAAAAAAAAAMBAADHxbwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0c7GAAAAAAAAAAAAAAAAAElFPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AV1RPAAAAAAAAAAAAAAAAAGViWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDAvrcAKSciAAAAAAAAAAAAAAAAAAAAAAAAAAAAioiCAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+voAERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAt7e3AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKysrAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEhIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA9PDcAAAAAAAAAAAAAAAAA2dfUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2djVAAAAAAAAAAAAAAAAAEE+OQD///8A////AP///wD///8A////AP///wD///8A////AP///wCioJoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMCAADJx8AA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHOxgAAAAAAAAAAAAAAAABJRTwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFdUTwAAAAAAAAAAAAAAAABlYlkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/++QBzcGoAAAAAAAAAAAAAAAAAAAAAAAAAAAA+PDYA1NLNAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AgYGBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4uLgA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK6urgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAmZmZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AHRsWAAAAAAAAAAAAAAAAANLQzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANPRzgAAAAAAAAAAAAAAAAAgHRgA////AP///wD///8A////AP///wD///8A////AP///wD///8AkpCJAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYFAQDMysQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDJxrwAAAAAAAAAAAAAAAAAKiUbAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6NzIAAAAAAAAAAAAAAAAAS0c9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL+9twApJyEAAAAAAAAAAAAAAAAAAAAAAAAAAABfXVgA4eDdAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/f39AA8PDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALm5uQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK6urgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIWDfABbWVQAX11YAF9cWADm5eIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5uMAYF9ZAGFfWgBdW1YAiYZ+AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPBvABbWVQAYF5ZAGBeWgBgXloAXlxYAGBeWQDQz8kA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A4d/ZAF5cVwBfXVkAW1lUAIuIgAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AlJKMAFpYUwBfXlkAWVdTAJ2akwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A//34AH59dwBZV1IAX15ZAF9eWQBRT0wAOzkzAJqWjQD9/f0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL29vQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAurq6AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK6urgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1dXVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/v7+AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCNjY0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC7u7sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK6urgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKOjowD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AfX19AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJiYmAD///8A////AP///wD///8A////AP///wD///8A////AI2NjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHh4eAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACYmJgBBQUEAPT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09AD09PQA9PT0APT09ADAwMAAxMTEA3NzcAP///wD///8A////AP///wD///8A////ANXV1QAuLi4ANTU1AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwA/Pz8APz8/AD8/PwBCQkIAIiIiAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjIyMAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICAgAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APX19QD///8A////AP///wD///8A////AP///wD09PQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBvb28AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC4uLgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACEhIQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABbW1sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBJSUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVVVVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQ0NDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD+/v4A9fX1AO7u7gDz8/MA8fHxAPLy8gD9/f0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+/v7AO/v7wDz8/MA8/PzAO3t7QD39/cA////AP///wD///8A////AP///wD///8A////AP///wD19fUA7OzsAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA7u7uAPT09AD///8A////AP///wD///8A////AOLi4gDq6uoA8/PzAPPz8wDy8vIA7+/vAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APv7+wDu7u4A8/PzAPPz8wDx8fEA3NzcAPf39wD///8A////AP///wD///8A////APj4+ADt7e0A8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA8/PzAPPz8wDz8/MA7+/vAPT09AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APv7+wDv7+8A8vLyAPPz8wDw8PAA8vLyAP39/QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+Pj4AO3t7QDz8/MA8vLyAO7u7gD7+/sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+/v7AO7u7gDy8vIA8/PzAOzs7AD4+PgA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEZGRgAMDAwAEhISABAQEAAREREA39/fAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALu7uwANDQ0AERERABISEgAKCgoAe3t7AP///wD///8A////AP///wD///8A////AP///wD///8AYmJiAAoKCgAREREAERERABEREQAREREAERERABEREQAREREAERERABEREQAREREAERERABEREQAREREAERERABEREQAREREAERERABEREQAREREAERERABEREQAREREAERERAAwMDAA/Pz8A////AP///wD///8A////AP///wChoaEAAAAAABISEgAREREAEBAQAA0NDQCNjY0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APHx8QAfHx8ADAwMABEREQAREREACQkJAC4uLgD19fUA////AP///wD///8A////AP///wCCgoIACgoKABISEgASEhIAEhISABISEgASEhIAEhISABISEgASEhIAEhISABISEgASEhIAEhISABISEgASEhIAEhISABISEgASEhIAEhISABISEgASEhIAEhISAA0NDQAyMjIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDBwcEADQ0NABAQEAAREREADw8PABoaGgDs7OwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AI+PjwAKCgoAEhISABEREQAMDAwAtLS0AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALOzswAMDAwAERERABISEgAKCgoAiYmJAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAqKioAAAAAAAAAAAAAAAAAAAAAANzc3AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCxsbEAAAAAAAAAAAAAAAAAAAAAAGhoaAD///8A////AP///wD///8A////AP///wD///8A////AExMTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAISEhAP///wD///8A////AP///wD///8A////ACgoKAAAAAAAAAAAAAAAAAAAAAAAAAAAAOrq6gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBTU1MAAAAAAAAAAAAAAAAAAAAAAAAAAAC6uroA////AP///wD///8A////AP///wD///8Abm5uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEhISAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aubm5AAAAAAAAAAAAAAAAAAAAAAAAAAAA6urqAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB9fX0AAAAAAAAAAAAAAAAAAAAAAKqqqgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCpqakAAAAAAAAAAAAAAAAAAAAAAHd3dwD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAADe3t4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7e3AAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgoKAD///8A////AP///wD///8A////AP///wDl5eUAAAAAAAAAAAAAAAAAAAAAAAAAAABISEgA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDGxsYAAAAAAAAAAAAAAAAAAAAAAAAAAABqamoA////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkZGQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL6+vgAAAAAAAAAAAAAAAAAAAAAACgoKAOvr6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAACwsLAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ar6+vAAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAAAAAAA3t7eAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe3twAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAuLi4A////AP///wD///8A////AP///wD///8A////AIuLiwAAAAAAAAAAAAAAAAAAAAAAAAAAALq6ugD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AICAgAAAAAAAAAAAAAAAAAAAAAAATExMA////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgICAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+vr4AAAAAAAAAAAAAAAAAAAAAAAoKCgDr6+sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAsLCwAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK+vrwAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6OjoAAAAAAAAAAAAAAAAAAAAAAN7e3gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3t7cAAAAAAAAAAAAAAAAAAAAAAHNzcwD///8A////AP///wD///8A////AP///wD///8A////AFlZWQAAAAAAAAAAAAAAAAAHBwcAxsbGAN/f3wDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDT09MA4ODgAP///wD///8A////AP///wD///8A////AP///wD///8AKSkpAAAAAAAAAAAAAAAAAAAAAAAXFxcAnZ2dAJ6engCbm5sAm5ubAJubmwCbm5sAm5ubAJubmwCbm5sAm5ubAJubmwCbm5sAm5ubAJubmwCmpqYAZGRkAAAAAAAAAAAAAAAAAAAAAAAAAAAAu7u7AP///wD///8A////AP///wD///8A////AP///wD///8AeXl5AAAAAAAAAAAAAAAAAAAAAACXl5cA4eHhANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDa2toA2traANra2gDV1dUA39/fAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Avr6+AAAAAAAAAAAAAAAAAAAAAAAKCgoA6+vrAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHh4cAAAAAAAAAAAAAAAAAAAAAALCwsAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCvr68AAAAAAAAAAAAAAAAAAAAAAIGBgQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCKh4AAPTowAERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjkAREI5AERCOQBEQjoAPTowAJWRiAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAADe3t4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7e3AAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAACAgIAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANbW1gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRUAP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAAwcHBAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL6+vgAAAAAAAAAAAAAAAAAAAAAACgoKAOvr6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAACwsLAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ar6+vAAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AS0lFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcWFIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAAAAAAA3t7eAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe3twAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAcHBwDm5uYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ad3d3AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAgIAPb29gD///8A////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAK6urgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+vr4AAAAAAAAAAAAAAAAAAAAAAAoKCgDr6+sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAsLCwAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK+vrwAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AGJgXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcW1nAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6OjoAAAAAAAAAAAAAAAAAAAAAAPPz8wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDIyMgAAAAAAAAAAAAAAAAAAAAAAHNzcwD///8A////AP///wD///8A////AP///wD///8A////AFlZWQAAAAAAAAAAAAAAAAAICAgA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAbGxsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKqqqgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AeXl5AAAAAAAAAAAAAAAAAAAAAACurq4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Avr6+AAAAAAAAAAAAAAAAAAAAAAAKCgoA6+vrAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHh4cAAAAAAAAAAAAAAAAAAAAAAMvLywD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDKysoAAAAAAAAAAAAAAAAAAAAAAIGBgQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBiYFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFtZwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAADIyMgA6OjoAOXl5QDl5eUA5eXlAOXl5QDl5eUA5eXlAOXl5QDl5eUA5eXlAOXl5QDl5eUA5eXlAOXl5QDp6ekApKSkAAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAABgYGAKOjowC2trYAsrKyALKysgCysrIAsrKyALKysgCysrIAsrKyALKysgCysrIAsrKyALKysgCysrIAsrKyALKysgCysrIAsbGxALKysgDz8/MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ax8fHAAAAAAAAAAAAAAAAAAAAAAAAAAAAS0tLAJSUlACFhYUAhYWFAIWFhQCFhYUAhYWFAIWFhQCFhYUAhoaGAIyMjAAHBwcAAAAAAAAAAAAAAAAAAAAAAENDQwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAArq6uAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL6+vgAAAAAAAAAAAAAAAAAAAAAACgoKAOvr6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAAB9fX0Aubm5ALOzswCzs7MAs7OzALOzswCzs7MAs7OzALOzswCzs7MAs7OzALOzswCzs7MAs7OzALOzswC5ubkAfHx8AAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AYmBcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxbWcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAAAAAAABQUFAAcHBwAFBQUABQUFAAUFBQAFBQUABQUFAAUFBQAFBQUABQUFAAUFBQAFBQUABQUFAAUFBQAFBQUACQkJAAMDAwAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA09PTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBiYmIAAAAAAAAAAAAAAAAAAAAAADY2NgD///8A////AP///wD///8A////AP///wD///8A////AP///wCysrIAAgICAAAAAAAAAAAAAAAAAAAAAADs7OwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAK6urgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+vr4AAAAAAAAAAAAAAAAAAAAAAAoKCgDr6+sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AGJgXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcW1nAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6OjoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHNzcwD///8A////AP///wD///8A////AP///wD///8A////AFlZWQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANjY2AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz8AA8PDwAAAAAAAAAAAAAAAAAAAAAAcHBwAP///wD///8A////AP///wD///8A////AP///wDp6ekAAAAAAAAAAAAAAAAAAAAAAAAAAACVlZUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AeXl5AAAAAAAAAAAAAAAAAAAAAACurq4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Avr6+AAAAAAAAAAAAAAAAAAAAAAAKCgoA6+vrAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHh4cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIGBgQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBiYFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFtZwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADT09MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCzs7MAAAAAAAAAAAAAAAAAAAAAAAAAAADe3t4A////AP///wD///8A////AP///wD///8ASEhIAAAAAAAAAAAAAAAAAAAAAAAwMDAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAArq6uAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL6+vgAAAAAAAAAAAAAAAAAAAAAACgoKAOvr6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AYmBcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABxbWcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAABAQEASkpKAFhYWABTU1MAU1NTAFNTUwBTU1MAU1NTAFNTUwBTU1MAU1NTAFNTUwBTU1MAU1NTAFNTUwBTU1MAWFhYADw8PAAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAICAgAlJSUAKioqACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACYmJgAnJycA3d3dAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AE1NTQAAAAAAAAAAAAAAAAAAAAAAOTk5AP///wD///8A////AP///wD///8Au7u7AAAAAAAAAAAAAAAAAAAAAAAAAAAA3t7eAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAK6urgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+vr4AAAAAAAAAAAAAAAAAAAAAAAoKCgDr6+sA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAHR0dACwsLAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgAKCgoACgoKAAoKCgALCwsABwcHAAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AGJgXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcW1nAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6OjoAAAAAAAAAAAAAAAAAAAAAAPv7+wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDOzs4AAAAAAAAAAAAAAAAAAAAAAHNzcwD///8A////AP///wD///8A////AP///wD///8A////AFlZWQAAAAAAAAAAAAAAAAAICAgA7e3tAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8vIABAQEAAAAAAAAAAAAAAAAAAAAAACsrKwA////AP///wD///8A////ABgYGAAAAAAAAAAAAAAAAAAAAAAAf39/AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AeXl5AAAAAAAAAAAAAAAAAAAAAACurq4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Avr6+AAAAAAAAAAAAAAAAAAAAAAAKCgoA6+vrAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHh4cAAAAAAAAAAAAAAAAAAAAAALa2tgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC0tLQAAAAAAAAAAAAAAAAAAAAAAIGBgQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBGRD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFdTTAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAADh4eEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aurq6AAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAABwcHAPHx8QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKCgoAAAAAAAAAAAAAAAAAAAAAAADg4OAP7+/gD///8A////AH5+fgAAAAAAAAAAAAAAAAAAAAAAICAgAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAArq6uAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AL6+vgAAAAAAAAAAAAAAAAAAAAAACgoKAOvr6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAAC4uLgA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7e3AAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aq6ihAG9sZAB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZtAHl2bQB5dm0AeXZuAG9sZACyr6cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAAAAAAA3t7eAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe3twAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAgICAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APDw8AAAAAAAAAAAAAAAAAAAAAABvb28A////AOXl5QAAAAAAAAAAAAAAAAAAAAAAAAAAAM7OzgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAK6urgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDb29sAAAAAAAAAAAAAAAAAAAAAAAsLCwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAsLCwAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK+vrwAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA6OjoAAAAAAAAAAAAAAAAAAAAAAN7e3gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3t7cAAAAAAAAAAAAAAAAAAAAAAHNzcwD///8A////AP///wD///8A////AP///wD///8A////AFlZWQAAAAAAAAAAAAAAAAAGBgYApKSkALe3twC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC1tbUAtbW1ALGxsQC9vb0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AObm5gAAAAAAAAAAAAAAAAAAAAAAAAAAAN/f3wBlZWUAAAAAAAAAAAAAAAAAAAAAAGtrawD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AeXl5AAAAAAAAAAAAAAAAAAAAAACurq4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDW1tYArq6uALW1tQC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC4uLgAh4eHAAAAAAAAAAAAAAAAAAAAAAAHBwcAp6enALe3twC1tbUAtbW1ALW1tQC1tbUAtbW1ALW1tQC0tLQAsLCwAOjo6AD///8A////AP///wD///8A////AP///wCHh4cAAAAAAAAAAAAAAAAAAAAAALCwsAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCvr68AAAAAAAAAAAAAAAAAAAAAAIGBgQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AOjo6AAAAAAAAAAAAAAAAAAAAAADe3t4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7e3AAAAAAAAAAAAAAAAAAAAAABzc3MA////AP///wD///8A////AP///wD///8A////AP///wBZWVkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACQkJAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AjIyMAAAAAAAAAAAAAAAAAAAAAAAREREAAQEBAAAAAAAAAAAAAAAAABMTEwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAArq6uAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AZ2dnAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACsrKwA////AP///wD///8A////AP///wD///8Ah4eHAAAAAAAAAAAAAAAAAAAAAACwsLAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ar6+vAAAAAAAAAAAAAAAAAAAAAACBgYEA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADo6OgAAAAAAAAAAAAAAAAAAAAAA3t7eAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe3twAAAAAAAAAAAAAAAAAAAAAAc3NzAP///wD///8A////AP///wD///8A////AP///wD///8AWVlZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0dHQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wApKSkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8vLwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB5eXkAAAAAAAAAAAAAAAAAAAAAAK6urgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHR0dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAs7OzAP///wD///8A////AP///wD///8A////AIeHhwAAAAAAAAAAAAAAAAAAAAAAsLCwAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AK+vrwAAAAAAAAAAAAAAAAAAAAAAgYGBAP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAbGxsAAAAAAAAAAAAAAAAAAAAAANnZ2QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCrq6sAAAAAAAAAAAAAAAAAAAAAAF1dXQD///8A////AP///wD///8A////AP///wD///8A////AERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGBgYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2NjYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABWVlYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AaGhoAAAAAAAAAAAAAAAAAAAAAACkpKQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBlZWUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKurqwD///8A////AP///wD///8A////AP///wB4eHgAAAAAAAAAAAAAAAAAAAAAAKampgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wClpaUAAAAAAAAAAAAAAAAAAAAAAHFxcQD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AdXV1AEhISABOTk4ATExMAE1NTQDn5+cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AzMzMAElJSQBOTk4AT09PAEZGRgCdnZ0A////AP///wD///8A////AP///wD///8A////AP///wB2dnYAKysrAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwArKysASEhIAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHh4cAKysrAC4uLgAvLy8ALy8vACsrKwA6OjoA9/f3AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKSkgArKysAMDAwAC8vLwAsLCwAvLy8AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ajo6OACsrKwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALy8vAC8vLwAvLy8ALS0tACsrKwDBwcEA////AP///wD///8A////AP///wD///8AnZ2dACsrKwAvLy8ALy8vACwsLAC+vr4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Avb29ACwsLAAvLy8AMDAwACsrKwCYmJgA////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFNTUwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEJCQgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABTU1MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBCQkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU1NTAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQkJCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFVVVQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AERERAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHt7ewAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABaWloA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBHR0cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjo6OAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB7e3sAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCQkAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AGRkZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ae3t7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABlZWUA6OjoAP///wD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AOXl5QDt7e0A////AP///wD///8A////AP///wD///8A6+vrAOnp6QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/f39AP39/QD9/f0A/v7+AP///wDl5eUAVVVVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACOjo4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHl5eQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkJCQAiIiIAHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAB0dHQAdHR0AHR0dAAoKCgAkJCQA3t7eAP///wD///8A////AP///wD///8A////ANfX1wAcHBwADg4OAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB4eHgAeHh4AHh4eAB8fHwAjIyMABgYGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAjIyMAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB8fHwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwcHBAP///wD///8A////AP///wD///8A////AP///wD///8Atra2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAI6OjgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ai4uLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ0A2NjYAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDLy8sAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAChoaEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALm5uQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ0A2NjYAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMvLywADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0dHRAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD7+/sACwsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANDQ0A2dnZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ay8vLAAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHBwcAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AoqCaAHx8eQCCgXwAgoB7AOzr6QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A2tnUAHx7dwCCgHwAe3p3ALKwqQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Al5WPAHt6dwCDgXwAg4F8AIOBfAB7e3cAm5mUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDIyMQAe3p3AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIOBfACDgXwAg4F8AIB+egCGhX8AmpeQALe1sQDt6+YA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD4+PYAi4mEAIB+egB9fHkAlZOOAP///wD///8A////AP///wD///8A////AP///wCmpJ4AdnVzAIOBfACAfnoAgX95APLx7gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AIuJhAB8e3cAg4F8AHt6dwCLiYMA/v7+AP///wD///8A////AP///wD///8A////AP///wD///8A////AHp6egAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMDAwA2NjYAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDLy8sAAwMDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJKSkgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AB4bFQAAAAAAAAAAAAAAAADT0s4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKqmnAAAAAAAAAAAAAAAAABHRDsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AaGVfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEPCgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Af355AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQsGAFNQSgC7ubQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A7+7rAAAAAAAAAAAAAAAAAAEAAAD///8A////AP///wD///8A////AP///wD///8Aq6iiAAAAAAAAAAAAAAAAAAAAAABkYlsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKShmgAAAAAAAAAAAAAAAAAAAAAAbWtkAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD39/cACwsLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALCwsA1tbWAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMvLywADAwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABgYGAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AZGJdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFJQSgDq6eQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAPEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wBRTkcAAAAAAAAAAAAAAAAAAAAAAOTj3QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///AARDwwAAAAAAAAAAAAAAAAAHhwXAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMTExAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKCgoA1NTUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AysrKAAICAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADV1dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AYmFcAAAAAAAAAAAAAAAAAAAAAAASEAoAFhYVAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFRMPANDPygD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A5OLdAAAAAAAAAAAAAAAAAAAAAABST0gA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCFg3wAAAAAAAAAAAAAAAAAAAAAALKwqgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8As7OzAAYGBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKCgoA1dXVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDIyMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEADDw8MA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AYF5ZAAAAAAAAAAAAAAAAAAAAAAA8OzQA4t/XACEfGwAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAGBfXADCwb0Au7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC7urYAu7q2ALu6tgC8vLgAu7q2AKekngB1c24AKSciAAAAAAAAAAAAAAAAAAAAAAAHBgIA2NfRAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wBlYlsAAAAAAAAAAAAAAAAAAAAAANbVzwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDz8u0ABAMAAAAAAAAAAAAAAAAAAC8sJgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDb29sAVlZWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKCgoA1NTUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMbGxgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGFhYQDn5+cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AW1pUAAAAAAAAAAAAAAAAAAAAAAAqKCEA///7AP///wABAAAAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACUk5EA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///gCamJMABwYCAAAAAAAAAAAAAAAAABwbFgD//vsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A8O/rAAMBAAAAAAAAAAAAAAAAAAA/PTcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AZmNcAAAAAAAAAAAAAAAAAAAAAADJx8AA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDU1NQAiYmJAFRUVAA4ODgAMDAwADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADAwMAA5OTkA1NTUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AxsbGADY2NgAwMDAAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMjIyADIyMgAyMjIAMDAwADs7OwBYWFgAkJCQANnZ2QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AVVROAAAAAAAAAAAAAAAAAAAAAAAvLCUA9vTuAP///wDj4dwABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANrY0wAREAwAAAAAAAAAAAAAAAAAeXVtAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wB/fHQAAAAAAAAAAAAAAAAAAAAAAMbEvQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A4uDaAAAAAAAAAAAAAAAAAAAAAABEQjsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/v//AP///wD///8AUU9JAAAAAAAAAAAAAAAAAAAAAAAzMSoA+fjyAP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A0tDKAAAAAAAAAAAAAAAAAAAAAADs6ucA////AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/Pz4AAwLBwAAAAAAAAAAAAAAAAAuLCYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEdFPgAAAAAAAAAAAAAAAAAAAAAA29rVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ATkxEAAAAAAAAAAAAAAAAAAAAAAA2NC4A/Pv1AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBsamMAAAAAAAAAAAAAAAAAjIqDAP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCVkYsAAAAAAAAAAAAAAAAAAAAAALKwqQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMrIwQAAAAAAAAAAAAAAAAAAAAAAXFlSAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ASkc/AAAAAAAAAAAAAAAAAAAAAAA4NzIA/fz3AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5OHcAAAAAAAAAAAAAAAAAEVDPQD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ABkXEgAAAAAAAAAAAAAAAAAgHhkA0M7IANfVzwDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA09HLANPRywDT0csA1tTOANPRygAuKyYAAAAAAAAAAAAAAAAAAAAAAOzq5gD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ARUI7AAAAAAAAAAAAAAAAAAAAAAA7OTUA//76AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wApJiAAAAAAAAAAAAAXFA8A/Pr2AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCqqKEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHJwaAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///0AQkA4AAAAAAAAAAAAAAAAAAAAAABAPzoA///9AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AT0xGAAAAAAAAAAAABgUCAOro5AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACYkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcGAwD49vIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD//voAPjs0AAAAAAAAAAAAAAAAAAAAAABDQT0A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFtaWAAAAAAAAAAAAAAAAADd3NgA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC+u7QAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACLiYEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e8AyMbBAMzLxQDNzMYAzczGAM3MxgDNzMYAzczGAM3MxgDHxcAA19bRAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD8+vcAODYwAAAAAAAAAAAAAAAAAAAAAABHRUAA////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBZWFUAAAAAAAAAAAAAAAAA3dzXAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADk2MAAAAAAAAAAAAAAAAAAAAAAAY2FcAG1saQBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBnZmMAZ2ZjAGdmYwBsa2gAZ2ZhAAAAAAAAAAAAAAAAAAAAAAAUEg8A///9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AjYuFAGxqZQBxb2oAcW9qAHFvagBxb2oAcW9qAHFvagBvbWkAb21nAOPj4AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AvruzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAuKQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD5+PUAMzAsAAAAAAAAAAAAAAAAAAAAAABLSEIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AWFdUAAAAAAAAAAAAAAAAAN7d2AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDRz8kAAAAAAAAAAAAAAAAAAAAAAJiVjQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKKflgAAAAAAAAAAAAAAAAAAAAAApaKbAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ABMRCgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADHxcMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMG+tgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2NTMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD39vMAMC4rAAAAAAAAAAAAAAAAAAAAAABPTEQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFhXVAAAAAAAAAAAAAAAAADe3dgA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AEtIQgAAAAAAAAAAAAAAAAAAAAAA6+rmAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AO3s6AAAAAAAAAAAAAAAAAAAAAAAJCIeAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD19fEALiwoAAAAAAAAAAAAAAAAAAAAAABSUEcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBYV1QAAAAAAAAAAAAAAAAA3t3YAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDg3tgAAAAAAAAAAAAAAAAAAAAAAFpYUQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBbWFEAAAAAAAAAAAAAAAAAAAAAALq4sgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8ewAKykkAAAAAAAAAAAAAAAAAAAAAABWVEwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AWFdUAAAAAAAAAAAAAAAAAN7d2AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AGJfWAAAAAAAAAAAAAAAAAAAAAAA3NrUAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDa2NIAAAAAAAAAAAAAAAAAAAAAADg1LgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDv7ugAJiUfAAAAAAAAAAAAAAAAAAAAAABaWFEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFhXVAAAAAAAAAAAAAAAAADe3dgA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDu7ekAAAAAAAAAAAAAAAAAAAAAAEVDPQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQD03AAAAAAAAAAAAAAAAAAAAAADRz8kA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDt6+UAIyEbAAAAAAAAAAAAAAAAAAAAAABhXlYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBYV1QAAAAAAAAAAAAAAAAA3t3YAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AHh2bgAAAAAAAAAAAAAAAAAAAAAAy8nDAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Awb+5AAAAAAAAAAAAAAAAAAAAAABNSkQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDr6eIAIB4YAAAAAAAAAAAAAAAAAAAAAABmZFwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AWFdUAAAAAAAAAAAAAAAAAN7d2AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD6+fUACgkFAAAAAAAAAAAAAAAAADIvKgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ACclHwAAAAAAAAAAAAAAAAAAAAAA4uHcAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDo5d8AHhwWAAAAAAAAAAAAAAAAAAAAAABpZ2EA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFhXVAAAAAAAAAAAAAAAAADe3dgA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AI+NhgAAAAAAAAAAAAAAAAAAAAAAuLWuAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKekngAAAAAAAAAAAAAAAAAAAAAAZGJaAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDk4twAHBkUAAAAAAAAAAAAAAAAAAAAAABsamUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBYV1QAAAAAAAAAAAAAAAAA3t3YAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AFRIOAAAAAAAAAAAAAAAAACIgHAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///QAUEw4AAAAAAAAAAAAAAAAAAQAAAPDv6wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDg3tkAFhUQAAAAAAAAAAAAAAAAAAAAAABxb2kA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AWFdUAAAAAAAAAAAAAAAAAN7d2AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AKWimgAAAAAAAAAAAAAAAAAAAAAAo6CZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCKh38AAAAAAAAAAAAAAAAAAAAAAHx5cQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDc2tQAExINAAAAAAAAAAAAAAAAAAAAAAB1c24A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFhXVAAAAAAAAAAAAAAAAADe3dgA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AIyEcAAAAAAAAAAAAAAAAABUSDgD///4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD29fAABQQCAAAAAAAAAAAAAAAAAA0KBwD8+/cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDX1c4ADw0JAAAAAAAAAAAAAAAAAAAAAAB4dnEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBYV1QAAAAAAAAAAAAAAAAA3t3YAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALm3sAAAAAAAAAAAAAAAAAAAAAAAjIqCAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AbGlhAAAAAAAAAAAAAAAAAAAAAACWk4wA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDS0MoACwoEAAAAAAAAAAAAAAAAAAAAAAB6eHMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AWFdUAAAAAAAAAAAAAAAAAN7d2AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANDEsAAAAAAAAAAAAAAAAAAgHBAD5+PUA////AP///wD///8A////AP///wD///8A////AP///wD///8A5uTfAAAAAAAAAAAAAAAAAAAAAAAaGBMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wD///8A////AP///wDPzcgABwYCAAAAAAAAAAAAAAAAAAAAAAB9enQA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFpZVwAAAAAAAAAAAAAAAADd3NcA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AM3LxAAAAAAAAAAAAAAAAAAAAAAAeHVtAP///wD///8A////AP///wD///8A////AP///wD///8A////AE9NRwAAAAAAAAAAAAAAAAAAAAAAr6ykAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wD///8A////AP///wDMy8YABgUCAAAAAAAAAAAAAAAAAAAAAACCf3cA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wBaWFMAAAAAAAAAAAAAAAAA3dzYAP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AR0U/AAAAAAAAAAAAAAAAAAAAAADt7OcA////AP///wD///8A////AP///wD///8A////ANHOyAAAAAAAAAAAAAAAAAAAAAAAKykkAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wD///8A////AP///wDKyMIABAMAAAAAAAAAAAAAAAAAAAAAAACHhHwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AR0Q8AAAAAAAAAAAABgYCAOro5AD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANza1QAAAAAAAAAAAAAAAAAAAAAAYV9YAP///wD///8A////AP///wD///8A////AP///wA2NC8AAAAAAAAAAAAAAAAAAAAAAMTBuwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wD///8A////AP///wDFw74AAgEAAAAAAAAAAAAAAAAAAAAAAACLiYIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ABcWEwAAAAAAAAAAABgWDwD9+/cA////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AXVlSAAAAAAAAAAAAAAAAAAAAAADh39oA////AP///wD///8A////AP///wC3ta4AAAAAAAAAAAAAAAAAAAAAAEA9NwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABjYFkA////AP///wD///8A////AP///wDCwbsAAAAAAAAAAAAAAAAAAAAAAAAAAACQjYYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIGAfQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPBuwAAAAAAAAAAAAAAAABHRT8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOzq5gAAAAAAAAAAAAAAAAAAAAAATElCAP///wD///8A////AP///wD///8AHhwYAAAAAAAAAAAAAAAAAAAAAADY1tEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAY2BZAP///wD///8A////AP///wDAvrkAAAAAAAAAAAAAAAAAAAAAAAAAAACWlI0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACBgH0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA7OTMAAAAAAAAAAAAAAAAAj42GAP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AdHBpAAAAAAAAAAAAAAAAAAAAAADPzcgA////AP///wD///8AnJmRAAAAAAAAAAAAAAAAAAAAAABVU00A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAGNgWQD///8A////AP///wC8urMAAAAAAAAAAAAAAAAAAAAAAAAAAACcmZIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAAgYB9AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCMioMAAAAAAAAAAAAAAAAAAwIAAO/u6QD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APf28wAHBQIAAAAAAAAAAAAAAAAANzUvAP///wD///8A/fv4AA4MCAAAAAAAAAAAAAAAAAAAAAAA6ObhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAABhXlcA////AP///wC3ta4AAAAAAAAAAAAAAAAAAAAAAAAAAACenJYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAIKBfgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCPjYcAAAAAAAAAAAAAAAAAAAAAAH57dAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AiYZ+AAAAAAAAAAAAAAAAAAAAAAC8u7QA////AH57dQAAAAAAAAAAAAAAAAAAAAAAbmtkAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAZWJdAP///wC1sq0AAAAAAAAAAAAAAAAAAAAAAAAAAAChoJkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAACWlZEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A///+AMLAugBMSUIAAAAAAAAAAAAAAAAAAAAAACIgGwD///4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAQEA0AAAAAAAAAAAAnJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///AAQDwwAAAAAAAAAAAAAAAAAREI9AOro4AAEBAEAAAAAAAAAAAAAAAAABAMBAPTz8AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADPzswA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMPAuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8APz04AAAAAAAAAAAAAAAAANrZ1QD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8At7SrAAAAAAAAAAAAAAAAAI6KgADRzsUAAAAAAAAAAAAAAAAAAAAAAAAAAACnpJ4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDn5eAABgUBAAAAAAAAAAAANTMvAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCSkY0AAAAAAAAAAAAAAAAANjUxAHFuZwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGhmXwBoZl8AaGZfAGpoYQBpZl8AU1FMACYkIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwKBQDe3NYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDy8e4AEBANAAAAAAAAAAAAJyUhAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AnpyVAAAAAAAAAAAAAAAAAAEBAAAdGhMAAAAAAAAAAAAAAAAAAAAAAIeDewD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAz87MAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDDwLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AD89OAAAAAAAAAAAAAAAAADa2dUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////ALe0qwAAAAAAAAAAAAAAAAAtKyMACQcCAAAAAAAAAAAAAAAAAAAAAACrqKIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A5+XgAAYFAQAAAAAAAAAAADUzLwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AkpGNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB0bFQDZ188A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8vHuABAQDQAAAAAAAAAAACclIQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAfHRkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABEQDAD//vwA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM/OzAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aw8C4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA/PTgAAAAAAAAAAAAAAAAA2tnVAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wC3tKsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACtq6YA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AOfl4AAGBQEAAAAAAAAAAAA1My8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AJKRjQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFpXUQDz8e0A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APLx7gAPEA0AAAAAAAAAAAAmJSEA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AtrOsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACenJYA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADY0LgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADR0M4A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AMbDuwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9OzkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AIB0ZAAAAAAAAAAAAAAAAANTTzgD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Aq6ieAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACurKcA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDj4dsAAAAAAAAAAAAAAAAAFBIPAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCAf3oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUEg4AWlhSAMPAugD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDv7usAAAAAAAAAAAAAAAAAAgEAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAtKiUAAAAAAAAAAAAAAAAAAAAAAAAAAAAeGxUA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA2NC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3NvZAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDNy8MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPTs5AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AH97cwBST0kAVFFLAFVRSwDl5eIA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AM7LwwBRTkgAVFBLAFVRSwBVUUsAU1BKAFJQSgCzsawA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A7ezpAFhTSwBST0kAUU5IAHZzbAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8Ay8nFAISBeQCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCIhn8AiIZ/AIiGfwCGhHwAioiCAJualwC9u7UA8/LuAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+Pj2AI+MhQCGhHwAhoN7AJiWjwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3NrUAIWCewCIhX8AiIZ/AIiFfwCEgnoA09HLAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8ANjQuAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKmmngD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AlJGKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD07OQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP7+/wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/v//AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/v//AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADUzLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATEQ4Au7mzAPn49AD9/PcA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0APv69AD7+vQA+/r0AP38+AD59/QAsq+pAAwLBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8OjkA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wA1My4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAYFxIAHRsWABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAbGRMAGxkTABsZEwAdGxYAGBYSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOjk2AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8AQ0E7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEVDPAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AFpYUQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABkYlsA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCfnZcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAApqSeAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A8/HuAAUEAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAcEAPTz8AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wCHhH0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJCOiAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDd29QAAAAAAAAAAADIxsAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ADg2MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD89NwD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3dvUAAAAAAAAAAAAyMbAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD39fEANTMtAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADw5MwD8+/YA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AN3b1AAAAAAAAAAAAMjGwAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///QBnZmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG1rZQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDc2tIAAAAAAAAAAADGw70A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////ANHQywBzcWoAKSchAAsJAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsJBAAsKSMAdXNsANPRzQD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A3NnSAAAAAAAAAAAAxsS+AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDp6OMA3NvWANnWzwDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2tjSANrY0gDa2NIA2dXPAN3b1wDr6OMA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APn59wDX1c0A1NLMAPb29AD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wAAAA==";

	constructor(){

	};

	getDietTips(){
		return new Promise((resolve, reject)=>{
			let success = (obj) =>{
				resolve(obj);
				return;
			};
			let error = (err) =>{
				reject(err);
				return;
			};

			fetch("./json/en_us/appResources_global.json")
			.then( response => { 
				return response.json() 
			})
			.then((data) => { 
				//console.log(data);
				success(data);
			})
			.catch((err) => { 
				//console.log(err);
				error(err);
			});
		});
	};

	replaceAll = (str, find, replace)=> {
    	return str.replace(new RegExp(find, 'g'), replace);
    };

	//Diet Recommendation Function.
  	suitableDietRecommendFilter = async function(genderVal, currentBPStat, currentPulseStat, currentBmiStat, currentBmcStat, currentSpo2Stat, currentTempStat)  {
    	let globalJson =  await this.getDietTips().then(function(obj){ return obj; }).catch(function(err) { return err; });
    	let dietData = globalJson['global.diettips'];
	    dietData = this.replaceAll(dietData, '\'', '"');
	    let dietParseData = JSON.parse(dietData);
	    let currentStat = {
	    	'bp': currentBPStat, 
	      	'pulse': currentPulseStat, 
	      	'bmi': currentBmiStat, 
	      	'bmc': currentBmcStat, 
	      	'spo2': currentSpo2Stat, 
	      	'temp': currentTempStat 
	    };
		const filteredCurrentStat = Object.entries(currentStat).reduce((a, [k,v]) => ((v == undefined || v == null || v.trim().length == 0) ? a : (a[k]=v, a)), {});
	    const filteredCurrentStatAllowedKeys = Object.keys(filteredCurrentStat);
	    //console.log(filteredCurrentStat);
	    //console.log(filteredCurrentStatAllowedKeys);
	    let suitableDietRecommendPlanForUser = "";

	    if(filteredCurrentStatAllowedKeys.length > 0){
	      	//check For All Abnormal, Acceptable, Healthy & Normal Scenarios Exact Match.
	    	for(let key in dietParseData){
	       
	        	let filteredDietTipsStat = Object.keys(dietParseData[key]).filter(key => filteredCurrentStatAllowedKeys.includes(key))
	        	.reduce((obj, objKey) => {
	          		obj[objKey] = dietParseData[key][objKey];
	          		return obj;
	        	}, {});
	        	let filteredDietTipsStatAllowedKeys = Object.keys(filteredDietTipsStat);

	        	let dataFromFilteredCurrentStat = filteredCurrentStat;

	        	if(filteredDietTipsStatAllowedKeys.length !== Object.keys(dataFromFilteredCurrentStat).length) {
	          		continue;
	        	};

	        	let exactMatchFound = Object.keys(dataFromFilteredCurrentStat).every(key => filteredDietTipsStat[key] === dataFromFilteredCurrentStat[key]);
	        	if(exactMatchFound){
	          		suitableDietRecommendPlanForUser = dietParseData[key];
	          		//console.log(suitableDietRecommendPlanForUser);
	          		function filterDietPlanFromDietJSON(){
	            		let dietPlanJSON = dietjson;
	            		let suitablePlan = (genderVal != undefined && genderVal != null && genderVal != "male") ? dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["female"] }) : dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["male"] });  
	            		return suitablePlan;
	          		};
	          		return filterDietPlanFromDietJSON();
	        	};
	      	};

	    	//check For Only Abnormal, Acceptable Scenarios. If first Loop Failed.
	      	for(let key in dietParseData){
	        
	        	let dataFromFilteredCurrentStat = filteredCurrentStat;

	        	dataFromFilteredCurrentStat = Object.entries(dataFromFilteredCurrentStat).reduce((a, [k, v]) => ((v == 'Normal' || v == 'Healthy') ? a : (a[k]=v, a)), {});
	        	let dataFromFilteredCurrentStatAllowedKeys = Object.keys(dataFromFilteredCurrentStat);

	        	let filteredDietTipsStat = Object.keys(dietParseData[key]).filter(key => dataFromFilteredCurrentStatAllowedKeys.includes(key))
	        	.reduce((obj, objKey) => {
	          		obj[objKey] = dietParseData[key][objKey];
	          		return obj;
	        	}, {});
	        	let filteredDietTipsStatAllowedKeys = Object.keys(filteredDietTipsStat);

	        	if(filteredDietTipsStatAllowedKeys.length !== dataFromFilteredCurrentStatAllowedKeys.length) {
	          		continue;
	        	};

	        	let nearestMatchFound = dataFromFilteredCurrentStatAllowedKeys.every(key => filteredDietTipsStat[key] === dataFromFilteredCurrentStat[key]);
	        	if(nearestMatchFound){
	          		suitableDietRecommendPlanForUser = dietParseData[key];
	          		//console.log(suitableDietRecommendPlanForUser);
	          		function filterDietPlanFromDietJSON(){
	            		let dietPlanJSON = dietjson;
	            		let suitablePlan = (genderVal != undefined && genderVal != null && genderVal != "male") ? dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["female"] }) : dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["male"] });  
	            		return suitablePlan;
	          		};
	          		return filterDietPlanFromDietJSON();
	        	};
	      	};

	      	//check For Only Abnormal Scenarios. If second Loop Failed.
	    	for(let key in dietParseData){
	        
	        	let dataFromFilteredCurrentStat = filteredCurrentStat;

	        	dataFromFilteredCurrentStat = Object.entries(dataFromFilteredCurrentStat).reduce((a, [k, v]) => ((v == 'Normal' || v == 'Healthy' || v == 'Acceptable') ? a : (a[k]=v, a)), {});
	        	let dataFromFilteredCurrentStatAllowedKeys = Object.keys(dataFromFilteredCurrentStat);

	        	let filteredDietTipsStat = Object.keys(dietParseData[key]).filter(key => dataFromFilteredCurrentStatAllowedKeys.includes(key))
	        	.reduce((obj, objKey) => {
	          		obj[objKey] = dietParseData[key][objKey];
	          		return obj;
	        	}, {});
	        	let filteredDietTipsStatAllowedKeys = Object.keys(filteredDietTipsStat);

	        	if(filteredDietTipsStatAllowedKeys.length !== dataFromFilteredCurrentStatAllowedKeys.length) {
	          		continue;
	        	};

	        	let atleastMatchFound = dataFromFilteredCurrentStatAllowedKeys.every(key => filteredDietTipsStat[key] === dataFromFilteredCurrentStat[key]);
	        	if(atleastMatchFound){
	          		suitableDietRecommendPlanForUser = dietParseData[key];
	          		//console.log(suitableDietRecommendPlanForUser);
	          		function filterDietPlanFromDietJSON(){
	            		let dietPlanJSON = dietjson;
	            		let suitablePlan = (genderVal != undefined && genderVal != null && genderVal != "male") ? dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["female"] }) : dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["male"] });  
	            		return suitablePlan;
	          		};
	          		return filterDietPlanFromDietJSON();
	        	};
	      	};

	      	//check For Any one, two, or some of match.
	      	for(let key in dietParseData){
	       
	        	let filteredDietTipsStat = Object.keys(dietParseData[key]).filter(key => filteredCurrentStatAllowedKeys.includes(key))
	        	.reduce((obj, objKey) => {
	          		obj[objKey] = dietParseData[key][objKey];
	          		return obj;
	        	}, {});
	        	let filteredDietTipsStatAllowedKeys = Object.keys(filteredDietTipsStat);

	        	let dataFromFilteredCurrentStat = filteredCurrentStat;

	        	if(filteredDietTipsStatAllowedKeys.length !== Object.keys(dataFromFilteredCurrentStat).length) {
	          		continue;
	        	};

	        	let someMatchFound = Object.keys(dataFromFilteredCurrentStat).some(key => filteredDietTipsStat[key] === dataFromFilteredCurrentStat[key]);
	        	if(someMatchFound){
	          		suitableDietRecommendPlanForUser = dietParseData[key];
	          		//console.log(suitableDietRecommendPlanForUser);
	          		function filterDietPlanFromDietJSON(){
	            		let dietPlanJSON = dietjson;
	            		let suitablePlan = (genderVal != undefined && genderVal != null && genderVal != "male") ? dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["female"] }) : dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["male"] });  
	            		return suitablePlan;
	          		};
	          		return filterDietPlanFromDietJSON();
	        	};
	      	};
	    };

    	suitableDietRecommendPlanForUser = dietParseData[108];
    	//console.log(suitableDietRecommendPlanForUser);
    	function filterDietPlanFromDietJSON(){
      		let dietPlanJSON = dietjson;
      		let suitablePlan = (genderVal != undefined && genderVal != null && genderVal != "male") ? dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["female"] }) : dietPlanJSON.find((obj) => { return obj.diet_plan == suitableDietRecommendPlanForUser["male"] });  
      		return suitablePlan;
    	};
    	return filterDietPlanFromDietJSON();
  	};
};