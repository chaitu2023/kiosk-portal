var higiServices = angular.module("higiKioskUi");
    higiServices.factory('HigiKioskUtilitiesService', ['$http' , '$rootScope' , 'HigiKioskStorageService', function($http, $rootScope, HigiKioskStorageService) {
    return {
        convertToFeetFoot : function(meters) {
            var conversion = Math.round(meters / 0.0254); // in inches
            var feet = Math.floor(conversion / 12.0);
            var inches = Math.round(conversion - (feet * 12));
            return feet;
        },

        convertToFeetInches : function(meters) {
            var conversion = Math.round(meters / 0.0254); // in inches
            var feet = Math.floor(conversion / 12.0);
            var inches = Math.round(conversion - (feet * 12));
            return inches;
        },

        getAge :function (dateString) {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
        },

        getHeightInInches : function(meters,gender){
            var getFeet = this.convertToFeetFoot(meters);
            var getInches = this.convertToFeetInches(meters);
            // var getFeet = convertToFeetFoot(meters);
            // var getInches = convertToFeetInches(meters);
            var heightInInches = (getFeet)*12+(getInches);

            if(gender=="m"){
                var IdealBodyWeightForMale = Math.round(52+1.9*(heightInInches-60));
                return IdealBodyWeightForMale;
            }else if(gender == "f"){
                var IdealBodyWeightForFemale = Math.round(49+1.7*(heightInInches-60));
                return IdealBodyWeightForFemale;
            }else{
                return "N/A"
            }
        },

        isValidEmailAddress :function (emailAddress) {
            var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
            return pattern.test(emailAddress.text);
        },
		/* old bp
        calculateBpRisk : function(systolic, diastolic) {
            if (systolic > 139 || diastolic > 89) {
                return 'high';
            }
            else if ((systolic > 129 && systolic < 140) || (diastolic > 84 && diastolic < 90)) {
                return 'atrisk';
            }
            else {
                return 'normal';
            }
        },
		*/
		getBPNormalRange :function(){
            return "90 - 120 Sys";
        },
        getBPdysNormalRange :function(){
            return "60 - 80 Dys";
        },
	/*  
        calculateBpRisk : function(systolic, diastolic) {
            if (systolic < 90 && diastolic < 60) {
                return 'low';
            }
            else if (systolic < 120 && diastolic <= 80) {
                return 'normal';
            }
            else if (systolic < 129 && diastolic <= 80) {
                return 'acceptable';
            }
            else if (systolic > 130 && diastolic > 80) {
                return 'high';
            }                                                                  
            else if(parseInt(diastolic) >= 80 && parseInt(systolic) <= 130){
                
                return 'isolated diastolic hypertension';
            }
            else if(parseInt(diastolic) <= 80 && parseInt(systolic) >= 130){
                
                return 'isolated systolic hypertension';
            }
        }, 
    */

        //below code to calculate bp status effective from 15-DEC-2021
        calculateBpRisk : function(systolic, diastolic) {
            // if(systolic < 130 && diastolic < 80) return "normal";
            // else if((systolic >= 130 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) return "acceptable";
            // else if((systolic >= 140 && systolic < 160) || (diastolic >= 90 && diastolic < 100)) return "stage 1 hypertension";
            // else if(systolic >= 160 || diastolic >= 100) return "stage 2 hypertension";

            if(systolic <= 139) return "acceptable";
            else if(systolic >= 140) return "recheck or consult a healthcare provider";            
        },

        getPulseNormalRange :function(){
            return " 61bpm - 99bpm ";
        },
		
        calculatePulseRisk : function (pulse){
            // if (pulse >= 100) {
            //     return 'high';
            // }
            // else if (pulse <= 60) {
            //     return 'low';
            // }
            // else {
            //     return 'normal';
            // }

            if(pulse >= 60 && pulse <= 99) return "acceptable";
            else if(pulse >= 100) return "check with healthcare provider";            

        },

        getBmcNormalRange :function(){
            return " 2% - 17.99% ";
        },
        //- BMC normal reference range for female - Sumithra
        getBmcNormalRangeFemale :function(){
            return " 2% - 24.99% ";
        },
        calculateBmcRisk : function (bmc, sex){
            var range = (sex == "Male") ? [25, 18] : [32, 25];
            if (bmc >= range[0]) {
                return 'at-risk';
            }
            else if (bmc >= range[1]) {
                return 'acceptable';
            }
            else {
                return 'healthy';
            }
        },

        getSpO2NormalRange :function(){
            return " 96% - 100% ";
        },

        calculateSpO2Risk : function (pulseOximeter){    
            // if (pulseOximeter < 70) {
            //     return 'Low';
            // } else if (pulseOximeter  >= 70 && pulseOximeter <= 90) {
            //     return 'At-risk';
            // } else if (pulseOximeter  >= 91 && pulseOximeter <= 95) {
            //     return 'Acceptable';
            // } else {
            //     return 'Healthy';
            // }

            if(pulseOximeter >= 95 && pulseOximeter <= 100) return 'Healthy';
            else if(pulseOximeter < 95) return "Check With Healthcare Provider";
        },

        Spo2_Reference_Value : function(){
            return {
                Spo2_Low_Reference_Value: 50,
                Spo2_Healthy_Value: 95,
                Spo2_High_Reference_Value: 100,
                };
        },

        BMI_Reference_Value : function(){
            return{
                BMI_Under_Weight_Value: 10,
                BMI_Normal_Value: 18.5,
                BMI_Over_Weight_Value: 22.99,
                // BMI_Obese_Value: 27.5,
                BMI_High_Reference_Value: 55,
            }
        },

        Body_Temperature_Reference_Value : function(){
            return{
                Body_Temperature_Low_Reference_Value: 70,
                Body_Temperature_Normal_Reference_Value: 95,
                Body_Temperature_High_Value: 99.5,
                // Body_Temperature_High_Value: 100.4,
                Body_Temperature_End_Reference_Value: 115,
            }
        },

        //Bp Have 3 Parameters (Systolic, Diastolic and Pulse)

        //Systolic

        // Systolic_Reference_Value: function () {
        //     return {
        //         Systolic_Low_Reference_Value: 60,
        //         Systolic_Healthy_Value: 139,
        //         Systolic_High_Reference_Value: 350,
        //     }
        // },

        Systolic_Reference_Value: function () {
            return {
                Systolic_Start_Reference_Value: 60,
                Systolic_Acceptable_Value: 130,
                Systolic_High_Reference_Value: 140,
                Systolic_End_Reference_Value: 350,
            }
        },

        // Diastolic

        Diastolic_Reference_Value: function (){
            return {
                Diastolic_Low_Reference_Value: 40,
                Diastolic_Normal_Value: 80,
                Diastolic_High_Reference_Value: 150,
            }
        },

        //Pulse

        // Pulse_Reference_Value: function (){
        //     return {
        //         Pulse_Low_Reference_Value: 20,
        //         Pulse_Normal_Value: 60,
        //         Pulse_High_Reference_Value: 99,
        //     }
        // },

        Pulse_Reference_Value: function (){
            return {
                Pulse_Low_Reference_Value: 20,
                Pulse_Normal_Value: 60,
                Pulse_High_Reference_Value: 99,
                Pulse_End_Reference_Value: 200,      
            }
        },

        Percent_Body_Fat_Reference_Value : function(){
            /*old code common for all gender
            return{
                Percent_Body_Fat_Low_Reference_Value: 0,
                Percent_Body_Fat_Normal_Reference_Value: 18,
                Percent_Body_Fat_High_Value: 23.4,
                Percent_Body_Fat_End_Reference_Value: 60,
            }*/

            //Based on gender validation starts here
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if(gender == "m") {
                return{
                    Percent_Body_Fat_Low_Reference_Value: 0,
                    Percent_Body_Fat_Normal_Reference_Value: $rootScope.lowPbfReference,
                    Percent_Body_Fat_Acceptable_Reference_Value: $rootScope.acceptableHighPbfReference,
                    Percent_Body_Fat_High_Value: $rootScope.highPbfReference,
                    Percent_Body_Fat_End_Reference_Value: 60,
                }
            } else if(gender == "f") {
                return{
                    Percent_Body_Fat_Low_Reference_Value: 0,
                    Percent_Body_Fat_Normal_Reference_Value: $rootScope.lowPbfReference,
                    Percent_Body_Fat_Acceptable_Reference_Value: $rootScope.acceptableHighPbfReference,
                    Percent_Body_Fat_High_Value: $rootScope.highPbfReference,
                    Percent_Body_Fat_End_Reference_Value: 60,
                }
            } else {
                console.log("invalid input");
            }
            //Based on gender validation ends here
        },

        Skeletal_Muscle_Mass_Reference_Value : function(){
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if(gender == "m") {
                return{
                    Skeletal_Muscle_Mass_Low_Reference_Value: 10,
                    Skeletal_Muscle_Mass_Normal_Value: $rootScope.lowSmmReference,
                    Skeletal_Muscle_Mass_High_Reference_Value: 80,
                }
            } else {
                return{
                    Skeletal_Muscle_Mass_Low_Reference_Value: 10,
                    Skeletal_Muscle_Mass_Normal_Value: $rootScope.lowSmmReference,
                    Skeletal_Muscle_Mass_High_Reference_Value: 80,
                }   
            }
        },

        Body_Fat_Mass_Reference_Value : function(){
            return{
                Body_Fat_Mass_Low_Reference_Value: 2,   //Real Value for Low is 5 as per Pooja mam Information
                Body_Fat_Mass_Normal_Reference_Value: $rootScope.lowFatReference,
                Body_Fat_Mass_Acceptable_Reference_Value: $rootScope.acceptableFatReference,
                Body_Fat_Mass_High_Value: $rootScope.highFatReference,
                Body_Fat_Mass_End_Reference_Value: 150,
            }
        },

        Intra_Cellular_Water_Reference_Value : function(){
            return{
                Intra_Cellular_Water_Low_Reference_Value: 8,
                Intra_Cellular_Water_Normal_Reference_Value: $rootScope.icll,
                Intra_Cellular_Water_High_Value: $rootScope.iclh,
                Intra_Cellular_Water_End_Reference_Value: 50,
            }
        },

        Extra_Cellular_Water_Reference_Value : function() {
            return{
                Extra_Cellular_Water_Low_Reference_Value: 5,
                Extra_Cellular_Water_Normal_Reference_Value: $rootScope.ecll,
                Extra_Cellular_Water_High_Value: $rootScope.eclh,
                Extra_Cellular_Water_End_Reference_Value: 18,
            }
        },


        // Protein Content Have Different values for Both Male and Female
        Protein_Content_Reference_Value: function () {
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if (gender == "m") {
                return {
                    Protein_Content_Low_Reference_Value: 2,  //Real Value for Low is 7 as per Pooja mam Information
                    Protein_Content_Healthy_Value: $rootScope.proteinl,
                    Protein_Content_High_Reference_Value: $rootScope.proteinh,
                    Protein_Content_End_Reference_Value: 20,
                }
            } else if (gender == "f") {
                return {
                    Protein_Content_Low_Reference_Value: 2,  //Real Value for Low is 5 as per Pooja mam Information
                    Protein_Content_Healthy_Value: $rootScope.proteinl,
                    Protein_Content_High_Reference_Value: $rootScope.proteinh,
                    Protein_Content_End_Reference_Value: 18,
                }
            } else {
                console.log("invalid input");
            }

        },
 
        Minerals_Content_Reference_Value : function(){
            return{
                Minerals_Content_Low_Reference_Value: 1,
                Minerals_Content_Normal_Value: $rootScope.lowMineral,
                Minerals_Content_High_Reference_Value: 4.05,
            }
        },

        Body_Cell_Mass_Reference_Value : function(){
            return{
                Body_Cell_Mass_Low_Reference_Value: 5,
                Body_Cell_Mass_Normal_Value: $rootScope.bcml,
                Body_Cell_Mass_High_Reference_Value: 28.6,
            }
        },

        Bone_Mineral_Content_Reference_Value : function(){
            return{
                Bone_Mineral_Content_Low_Reference_Value: 1,
                Bone_Mineral_Content_Normal_Reference_Value:  $rootScope.lowBmcReference,
                Bone_Mineral_Content_End_Reference_Value: 5,
            }
        },

        // Waist to Height Ratio have Different Values for Both Male and Female
        Waist_to_Height_Ratio_Reference_Value: function() {
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if(gender == "m") {
                return{
                    Waist_to_Height_Ratio_Low_Reference_Value: 0.2,
                    Waist_to_Height_Ratio_Normal_Reference_Value: $rootScope.waisttoheightratiolow,
                    Waist_to_Height_Ratio_High_Value: $rootScope.waisttoheightratiohigh,
                    Waist_to_Height_Ratio_End_Reference_Value: 3,
                }
            } else if(gender == "f") {
                return{
                    Waist_to_Height_Ratio_Low_Reference_Value: 0.2,
                    Waist_to_Height_Ratio_Normal_Reference_Value: $rootScope.waisttoheightratiolow,
                    Waist_to_Height_Ratio_High_Value: $rootScope.waisttoheightratiohigh,
                    Waist_to_Height_Ratio_End_Reference_Value: 4,
                }
            } else {
                console.log("invalid input");
            }

        },

        // Waist to Height Ratio have Different Values for Both Male and Female

        Waist_to_Hip_Ratio_Reference_Value: function () {
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if (gender == "m") {
                return {
                    Waist_Hip_Ratio_Low_Reference_Value: 0.2,
                    Waist_Hip_Ratio_Normal_Reference_Value: 0.8,
                    Waist_Hip_Ratio_High_Reference_Value: 0.9,
                    Waist_Hip_Ratio_End_Reference_Value: 2.2,  // Previous Original Value for WTHipRatio - 6
                }
            } else if (gender == "f") {
                return {
                    Waist_Hip_Ratio_Low_Reference_Value: 0.2,
                    Waist_Hip_Ratio_Normal_Reference_Value: 0.8,
                    Waist_Hip_Ratio_High_Reference_Value: 0.9,
                    Waist_Hip_Ratio_End_Reference_Value: 2.6,   // Previous Original Value for WTHipRatio - 8
                }
            } else {
                console.log("invalid input");
            }

        },

        Visceral_Fat_Reference_Value : function(){
            return{
                Visceral_Fat_Normal_Value: 1,
                Visceral_Fat_Acceptable_Value: 101,
                Visceral_Fat_High_Reference_Value: 121,
                Visceral_Fat_End_Reference_Value: 200,
            }
        },


        // Json For Invasive Tests
         
        Random_Blood_Glucose_Reference_Value : function(){
            return{
                RandomGlucoseStartValue : 20,
                RandomGlucoseNormalValue : 80,
                RandomGlucosePreDiabetesValue : 140,
                RandomGlucoseDiabetesValue : 200,
                RandomGlucoseEndValue : 700,
            }
        },

        Fasting_Blood_Glucose_Reference_Value : function(){
           return{
            FastingGlucoseStartValue : 20,
            FastingGlucoseNormalValue : 70,
            FastingGlucoseAcceptableValue : 101,
            FastingGlucoseHighValue : 125,
            FastingGlucoseEndValue : 700,
           }
        },

        PostPrandial_Blood_Glucose_Reference_Value : function(){
            return{
                PostPrandialGlucoseStartValue : 20,
                PostPrandialGlucoseNormalValue : 20,
                PostPrandialGlucosePreDiabetesValue : 140,
                PostPrandialGlucoseDiabetesValue : 200,
                PostPrandialGlucoseEndValue : 700,
            }
        },


        // // Json for Heamoglobin Json 

        Heamoglobin_Reference_Value : function() {
            let gender = HigiKioskStorageService.returnSessionData('gender');
            if (gender == "m") {
                return {
                    HemoglobinStartValue : 2,
                    HemoglobinVeryLowValue : 2,
                    HemoglobinLowValue : 8,
                    HemoglobinAcceptableValue : 11,
                    HemoglobinNormalValue : 13.5,
                    HemoglobinHighValue : 18,
                    HemoglobinEndValue : 20
                }
            } else if (gender == "f") {
                return {
                    HemoglobinStartValue : 2,
                    HemoglobinVeryLowValue : 2, 
                    HemoglobinLowValue : 8,
                    HemoglobinAcceptableValue : 11,
                    HemoglobinNormalValue : 12,
                    HemoglobinHighValue : 16,
                    HemoglobinEndValue : 20
                }
            } else {
                console.log("invalid input");
            }
        },


        // // Json For Total Cholesterol, HDL, LDL, Triglycerides

        TotalCholestrolReferenceValues : function() {
            return{
                TcStartValue : 50,
                TcNormalValue : 130,
                TcAcceptableValue : 200,
                TcBorderlineHighValue : 231,
                TcHighValue : 240,
                TcEndValue : 300,
            }
        },

        HDLCholestrolReferenceValues : function() {
            return{
                HDLStartValue : 20,
                HDLLowValue : 20,
                HDLBorderlineLowValue : 36,
                HDLNormalValue : 60,
                HDLEndValue : 100,
            }
        },

        LDLCholestrolReferenceValues : function() {
            return{
                LDLStartValue : 20,
                LDLNormalValue : 20,
                LDLAcceptableValue : 100,
                LDLBorderlineHighValue : 130,
                LDLHighValue : 160,
                LDLEndValue : 200,
            }
        },

        TriglyceridesReferenceValues : function() {
            return{
                TGStartValue : 50,
                TGNormalValue : 50,
                TGAcceptableValue : 150,
                TGBorderlineHighValue : 170,
                TGHighValue : 200,
                TGEndValue : 300,
            }
        },
        
        // This Below Ranges Is For Kolors Template and for all the thermal templates and Will be Used For Future Reference

        TCNewReferenceRanges : function() {
            return{
                TcStartValue : 50,
                TcNormalValue : 130,
                TcAcceptableValue : 200,
                TcBorderlineHighValue : 231,
                TcHighValue : 240,
                TcEndValue : 300,
            }
        },

        HDLNewReferenceRanges : function() {
            return{
                HDLStartValue : 20,
                HDLLowValue : 20,
                HDLBorderlineLowValue : 36,
                HDLNormalValue : 60,
                HDLEndValue : 100,
            }
        },

        LDLNewReferenceRanges : function() {
            return{
                LDLStartValue : 20,
                LDLNormalValue : 20,
                LDLAcceptableValue : 100,
                LDLBorderlineHighValue : 130,
                LDLHighValue : 160,
                LDLEndValue : 200,
            }
        },

        TGNewReferenceRanges : function() {
            return{
                TGStartValue : 50,
                TGNormalValue : 50,
                TGAcceptableValue : 150,
                TGBorderlineHighValue : 170,
                TGHighValue : 200,
                TGEndValue : 300,
            }
        },

        HeamoglobinNewReferenceRanges : function() {

            let gender = HigiKioskStorageService.returnSessionData('gender');
            if (gender == "m") {
                return {
                    HemoglobinStartValue : 2,
                    HemoglobinVeryLowValue : 2,
                    HemoglobinLowValue : 8,
                    HemoglobinAcceptableValue : 11,
                    HemoglobinNormalValue : 13.5,
                    HemoglobinHighValue : 18,
                    HemoglobinEndValue : 20
                }
            } else if (gender == "f") {
                return {
                    HemoglobinStartValue : 2,
                    HemoglobinVeryLowValue : 2, 
                    HemoglobinLowValue : 8,
                    HemoglobinAcceptableValue : 11,
                    HemoglobinNormalValue : 12,
                    HemoglobinHighValue : 16,
                    HemoglobinEndValue : 20
                }
            } else {
                console.log("invalid input");
            }
        },

        RandomGlucoseNewReferenceRanges : function() {
            return{
                RandomGlucoseStartValue : 20,
                RandomGlucoseNormalValue : 80,
                RandomGlucosePreDiabetesValue : 140,
                RandomGlucoseDiabetesValue : 200,
                RandomGlucoseEndValue : 700,
            }
        },


        FastingGlucoseNewReferenceRanges : function() {
            return{
                FastingGlucoseStartValue : 20,
                FastingGlucoseNormalValue : 70,
                FastingGlucoseAcceptableValue : 101,
                FastingGlucoseHighValue : 125,
                FastingGlucoseEndValue : 700,
            }
        },


        PostPrandialGlucoseNewReferenceRanges : function() {
            return{
                PostPrandialGlucoseStartValue : 20,
                PostPrandialGlucoseNormalValue : 20,
                PostPrandialGlucosePreDiabetesValue : 140,
                PostPrandialGlucoseDiabetesValue : 200,
                PostPrandialGlucoseEndValue : 700,
            }
        },
       


        calculateTempRisk : function (roomTempFloat, bodyTemp){// using hand    
            // error: (1) room temperture above 34 and below 22 was not added on below condition. (2) normal body temperature point value veriation is make show wrong status.
            return bodyTempCalculation("",  bodyTemp);

            /*roomTemp = Math.round(roomTempFloat);
            //roomTemp = 34;
            if(roomTemp == 23){
                var normalTemp = 27.5;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 24){
                var normalTemp = 30;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 25){
                var normalTemp = 31.5;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 26){
                var normalTemp = 32;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 27){
                var normalTemp = 33;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 28){
                var normalTemp = 33.5;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 29){
                var normalTemp = 33.75;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 30){
                var normalTemp = 34;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 31){
                var normalTemp = 34.75;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 32){
                var normalTemp = 35;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 33){
                var normalTemp = 35.5;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }
            if(roomTemp == 34){
                var normalTemp = 36;
                return bodyTempCalculation(normalTemp,  bodyTemp);
            }*/
        },
        
        convertToFarrantHeat : function (celsius) {
          return (celsius * 9 / 5 + 32).toFixed(2);
        },

        convertToCelsius : function (farrant) {
          return ((farrant - 32) * 5 / 9).toFixed(2);
        },

        convertToPounds: function (kilograms) {
			/*
			 * Function that converts kg to lbs
			 */		
            result = kilograms * 2.2046226218;
            return result.toString();
        },

        convertToKilograms : function (pounds) {
            /*
             * Function that converts lbs to kg
             */
            result = pounds / 2.2046226218;
            return result.toString();
        },

        convertToMeters : function (inches) {
          return inches * .0254;
        },

        calculateBmi : function (weightInKilograms, heightInMeters, precision){
            /*
             * Function that calculates BMI
             */
			var result = weightInKilograms / Math.pow(heightInMeters, 2);
			return result.toFixed(precision);
        },
		
        getBmiNormalRange :function(){
            return "18.5 - 22.99";
        },
        calculateBmiRisk :function(bmi){
            /*
             * Function that returns BMI Risk as a string
             */
            if (bmi < 18.5) {
                return 'underweight';
            }
            else if (bmi >= 18.5 && bmi <= 22.99) {
                return 'normal';
            }
            else if (bmi >= 23 && bmi <= 27.5) {
                return 'overweight';
            }
            else if (bmi > 27.5) {
                return 'obese';
            }
            else {
                return false;
            }
        },

        calculateWeightRisk : function(height, bmi){
            let weightStatus = bmi * Math.pow(height, 2);
			return weightStatus.toFixed(2);
        },

        calculateTargetWeight : function(height){
            var heightInMeters = height;
            return (Math.pow(heightInMeters, 2) * 22).toFixed(2);  
        }, 
        calculateWeightControl : function(weight, targetWeight){
            var  userWeight = parseFloat(weight);
            return (targetWeight - userWeight).toFixed(2);  
        }, 

         gettemperatureNormalRange :function(){
            return "97 - 99°F";
        },
        getecgbpmNormalRange :function(){
            return "60 - 100bpm";
        },

        averageArray : function(array) {
            //Takes an array, returns an object that has length and average
            var sum = 0;
            array.forEach(function(val){
                 sum += parseInt(val);
            });
            var avg =  Math.round(sum / array.length);
            return {avg : avg, length : array.length}
        },

        generateSessionId :function(){
            var d = new Date().getTime();
            //var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            //    var r = (d + Math.random()*16)%16 | 0;
            //    d = Math.floor(d/16);
            //    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            //});
            return d;
        },
        replaceAll : function (string, find, replace) {
            var escapeRegExp = function(string) {
                return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
            };
            return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        },
        safeApply : function(scope, fn){
                var phase = scope.$root.$$phase;
                if(phase == '$apply' || phase == '$digest') {
                    if(fn && (typeof(fn) === 'function')) {
                        fn();
                    }
                } else {
                    scope.$apply(fn);
                }


        },
        isHigiGreen : function(){
            //ui set to higi green by default if kioskConfigurationResult not set in session data
            //https://higidev.atlassian.net/browse/HC-76

            if(HigiKioskStorageService.returnSessionData('kioskConfigurationResult') === undefined){
                var isGreen = true;
            } else {
                var isGreen = HigiKioskStorageService.returnSessionData('kioskConfigurationResult').series == HigiKioskStorageService.getSettingsValue('kiosk.series.chicago');
            }

            return isGreen
        },
        forceTosPrivacy : function (terms){
            if(typeof(HigiKioskStorageService.returnSessionData('user')) != "undefined"){
                var tempUser = HigiKioskStorageService.returnSessionData('user');
                if(terms !== "terms"){
                    tempUser.privacyAgreed.privacyFileName = "";
                }
                if(terms !== "privacy"){
                    tempUser.terms.termsFileName = "";
                }
                else {
                    tempUser.privacyAgreed.privacyFileName = "";
                    tempUser.terms.termsFileName = "";

                }
                //Log off the user
                //

                HigiKioskStorageService.saveSessionData('user',tempUser);
                var success = function(){
                    //HigiKioskFlow.higiExit();
                }

                HigiApiService.UpdateUserAsync(tempUser.id, tempUser, success);


            }else {
            }
        },

        calculateEcgHeartRateRisk: function(HeartRateBpm){
              if(HeartRateBpm >= 60 && HeartRateBpm <= 100) {
                return "Normal";
              } else if(HeartRateBpm < 60) {
                return "Low";
              }else if(HeartRateBpm > 100) {
                return "High";
              }
        },

        calculateEcgPRIntervalRisk: function(PRIntervalValue){
          if(PRIntervalValue >= 120 && PRIntervalValue <= 200) {
            return "Normal";
          }else if(PRIntervalValue < 120) {
            return "Low";
          }else if(PRIntervalValue > 200) {
            return "High";
          }
        },
        
        calculateEcgQTCIntervalRisk: function(QTCIntervalValue){
          if (QTCIntervalValue >= 310 && QTCIntervalValue <= 450) {
            return "Normal";
          }else if (QTCIntervalValue < 310 ) {
            return "Low";
          }else if (QTCIntervalValue > 450 ) {
            return "High";
          } 
        },

        calculateEcgQRSDurationRisk: function(QRSDurationValue){    
          if (QRSDurationValue >= 80 && QRSDurationValue <= 120) {
            return "Normal";
          }else if (QRSDurationValue < 80 ) {
            return "Low";
          }else if (QRSDurationValue > 120 ) {
            return "High";
          }
        },
          calculateFullBodyBMCStatus: function(FullBodyBMC){
        if (parseFloat(FullBodyBMC) < $rootScope.lowBmcReference) {
            return 'Low';
        }
        else if (parseFloat(FullBodyBMC) >= $rootScope.lowBmcReference) {
            return 'Normal';
        }
    },

    calculateFullBodyProteinStatus: function (FullBodyProtein, weight){
        if (weight != undefined) {
            $rootScope.proteinl=(0.116*weight).toFixed(2);
        }
        
        if (parseFloat(FullBodyProtein) < $rootScope.proteinl) {
            return 'Low';
        }
        else if (parseFloat(FullBodyProtein) >= $rootScope.proteinl && parseFloat(FullBodyProtein) <= $rootScope.proteinh ) {
            return 'Normal';
        }else{
            return 'High'
        }
    },

    calculateFullBodyICWStatus: function (FullBodyICW){
        if (parseFloat(FullBodyICW) < $rootScope.icll ) {
            return 'Low';
        }
        else if (parseFloat(FullBodyICW) >= $rootScope.icll && parseFloat(FullBodyICW) <= $rootScope.iclh) {
            return 'Normal';
        }
        else if(parseFloat(FullBodyICW) > $rootScope.iclh){
            return 'High';
        }
    },

    calculateFullBodyECWStatus: function (FullBodyECW){
        if (parseFloat(FullBodyECW) < $rootScope.ecll) {
            return 'Low';
        }
        else if (parseFloat(FullBodyECW) >= $rootScope.ecll && parseFloat(FullBodyECW) <= $rootScope.eclh) {
            return 'Normal';
        }
        else if (parseFloat(FullBodyECW) > $rootScope.eclh) {
            return 'High';
        }
    },

    calculateFullBodyMineralStatus: function (FullBodyMineral){
        if (parseFloat(FullBodyMineral) < $rootScope.lowMineral) {
            return 'Low';
        }
        else if (parseFloat(FullBodyMineral) >= $rootScope.lowMineral) {
            return 'Normal';
        }
    },

    calculateFullBodySMMStatus: function (FullBodySMM){
        if (parseFloat(FullBodySMM) < $rootScope.lowSmmReference) {
            return 'Low';
        }
        else if (parseFloat(FullBodySMM) >= $rootScope.lowSmmReference) {
            return 'Normal';
        }
    },

    calculateFullBodyPBFStatus: function (FullBodyPBF){
        /*
        if (parseFloat(FullBodyPBF) < $rootScope.lowPbfReference) {
            return 'Low';
        }
        else if (parseFloat(FullBodyPBF) >= $rootScope.lowPbfReference && parseFloat(FullBodyPBF) <= $rootScope.highPbfReference) {
            return 'Normal';
        }
        else if (parseFloat(FullBodyPBF) > $rootScope.highPbfReference) {
            return 'High';
        }
        */
        if (parseFloat(FullBodyPBF) < $rootScope.lowPbfReference) {
            return 'Low';
        }else if (parseFloat(FullBodyPBF) >= $rootScope.lowPbfReference && parseFloat(FullBodyPBF) <= $rootScope.acceptableHighPbfReference) {
            return 'Normal';
        }else if(parseFloat(FullBodyPBF) > $rootScope.acceptableHighPbfReference && parseFloat(FullBodyPBF) <= $rootScope.highPbfReference){
            return 'Acceptable';
        }else if (parseFloat(FullBodyPBF) > $rootScope.highPbfReference) {
            return 'High';
        }
    },

    calculateFullBodyBCMStatus: function (FullBodyBCM){
        if (parseFloat(FullBodyBCM) < $rootScope.bcml) {
            return 'Low';
        }
        else if (parseFloat(FullBodyBCM) >= $rootScope.bcml) {
            return 'Normal';
        }
    },

    calculateFullBodyFATStatus: function (FullBodyFAT, weight){
        if (weight != undefined) {
            // $rootScope.lowFatReference=(0.10*weight).toFixed(2); old code without gender calculations
            // $rootScope.highFatReference=(0.20*weight).toFixed(2);
            if(HigiKioskStorageService.returnSessionData('gender') != "m"){
                $rootScope.lowFatReference=(0.18*weight).toFixed(2);
                $rootScope.acceptableFatReference = (0.28*weight).toFixed(2);
                $rootScope.highFatReference=(0.32*weight).toFixed(2);
            }else{
                $rootScope.lowFatReference=(0.10*weight).toFixed(2);
                $rootScope.acceptableFatReference = (0.20*weight).toFixed(2);
                $rootScope.highFatReference=(0.27*weight).toFixed(2);
            }
        }
        /* old code starts here
        if (parseFloat(FullBodyFAT) < $rootScope.lowFatReference) {
            return 'Low';
        }
        else if (parseFloat(FullBodyFAT) >= $rootScope.lowFatReference && parseFloat(FullBodyFAT) <= $rootScope.highFatReference) {
            return 'Normal';
        }
        else if (parseFloat(FullBodyFAT) > $rootScope.highFatReference) {
            return 'High';
        } old code ends here
        */
        if (parseFloat(FullBodyFAT) < $rootScope.lowFatReference) {
            return 'Low';
        }
        else if (parseFloat(FullBodyFAT) >= $rootScope.lowFatReference && parseFloat(FullBodyFAT) <= $rootScope.acceptableFatReference) {
            return 'Normal';
        }
        else if(parseFloat(FullBodyFAT) > $rootScope.acceptableFatReference && parseFloat(FullBodyFAT) <= $rootScope.highFatReference){
            return 'Acceptable';
        }
        else if (parseFloat(FullBodyFAT) > $rootScope.highFatReference) {
            return 'High';
        }
    },

    calculateFullBodyVFStatus: function (FullBodyVF){
        /* old code1
        if (parseFloat(FullBodyVF) <= 100) {
            return 'Normal';
        }
        else if (parseFloat(FullBodyVF) > 100) {
            return 'High';
        }*/
        // old code2 Denotes Normal,Acceptable,High 
        if (parseFloat(FullBodyVF) >= 1 && parseFloat(FullBodyVF) <= 100) {
            return 'Normal'; 
        }else if(parseFloat(FullBodyVF) > 100 && parseFloat(FullBodyVF) <= 120){
            return 'Acceptable';
        }else if(parseFloat(FullBodyVF) > 120){
            return 'High';
        }
        /*old code3 Denotes Normal, High
        if (parseFloat(FullBodyVF) <= 120) {
            return 'Normal'; 
        }else if(parseFloat(FullBodyVF) > 120){
            return 'High';
        }
        */
    },

    calculateFullBodyBMRStatus: function (FullBodyBMR){
        if (parseFloat(FullBodyBMR) < 1200) {
            return 'Low';
        }
        else if (parseFloat(FullBodyBMR) >= 1200) {
            return 'Normal';
        }
    },

    calculateFullBodyWHPRStatus: function (FullBodyWHPR){
        if ((FullBodyWHPR) < 0.80) {
            return 'Low';
        }
        else if (parseFloat(FullBodyWHPR) >= 0.80 && parseFloat(FullBodyWHPR) <= 0.90) {
            return 'Normal';
        }
        if (parseFloat(FullBodyWHPR) > 0.90) {
            return 'High';
        }
    },

    calculateFullBodyWHTRStatus: function (FullBodyWHTR){
        if (parseFloat(FullBodyWHTR) < $rootScope.waisttoheightratiolow) {
            return 'Low';
        }
        else if (parseFloat(FullBodyWHTR) >= $rootScope.waisttoheightratiolow && parseFloat(FullBodyWHTR) <= $rootScope.waisttoheightratiohigh) {
            return 'Normal';
        }
        if (parseFloat(FullBodyWHTR) > $rootScope.waisttoheightratiohigh) {
            return 'High';
        }
    },


        getPlaceholder: function(key){
            if($rootScope.langPlaceholder != undefined){
                return $rootScope.langPlaceholder[key+"."+$rootScope.currentLangId];
            } else {
                setTimeout(function(){
                    this.getPlaceholder(key);
                }, 100);
            }
        },

    calculateVitalReferences: function() {
        var height = HigiKioskStorageService.returnSessionData("height") * 100;
        var weight = $rootScope.userWeightInKg;
        var i=0;
        $rootScope.bcml="20.00";
        $rootScope.bcmh="25.00";
        $rootScope.lowMineral="2.00";
        $rootScope.highMineral="3.00";
        if (HigiKioskStorageService.returnSessionData('gender') != "m") {
            // $rootScope.lowPbfReference = "18.00";
            // $rootScope.highPbfReference = "28.00";
            // // $rootScope.acceptableLowPbfReference = 28.00;
            // $rootScope.acceptableHighPbfReference = "32.00";
            $rootScope.lowPbfReference = "18.00";
            $rootScope.acceptableHighPbfReference = "28.00";
            $rootScope.highPbfReference = "32.00";
            let female_height_weight = [
                [147 , 45  , 59],
                [150 , 45  , 60],[152 , 46  , 62],[155 , 47  , 63],[157 , 49  , 65],[160 , 50  , 67],[162 , 51  , 69],
                [165 , 53  , 70],[167 , 54  , 72],
                [170 , 55  , 74],[172 , 57  , 75],[175 , 58  , 77],[177 , 60  , 78],[180 , 61  , 80]
            ];
            while(female_height_weight[i][0]<= height)
            {
                i++;
                if(i == 13){
                    break;
                }
            }
            var wtl, wth;
            if(i == 0){
                wtl=female_height_weight[i][1];   
                wth=female_height_weight[i][2];           
            }
            else{
                wtl=female_height_weight[i-1][1];   
                wth=female_height_weight[i-1][2];           
            }
            $rootScope.lowSmmReference = (0.36*wtl).toFixed(2);
            $rootScope.highSmmReference = (0.36*wth).toFixed(2);
            $rootScope.lowFatReference=(0.18*weight).toFixed(2);
            $rootScope.acceptableFatReference = (0.28*weight).toFixed(2);
            $rootScope.highFatReference=(0.32*weight).toFixed(2);
            // $rootScope.highFatReference=(0.28*weight).toFixed(2);
            $rootScope.lowBmcReference = "1.70";
            $rootScope.highBmcReference = "3.00";
            $rootScope.icll=(0.3*wtl).toFixed(2);
            $rootScope.iclh=(0.3*wth).toFixed(2);        
            $rootScope.ecll=(0.2*wtl).toFixed(2);
            $rootScope.eclh=(0.2*wth).toFixed(2);
            $rootScope.proteinl=(0.116*weight).toFixed(2);
            $rootScope.proteinh=(0.141*weight).toFixed(2);    
            $rootScope.waisttoheightratiolow= "0.35";
            $rootScope.waisttoheightratiohigh= "0.53";                
        }
        else{
            // $rootScope.lowPbfReference = "10.00";
            // $rootScope.highPbfReference = "20.00";
            // // $rootScope.acceptableLowPbfReference = 21.00;
            // $rootScope.acceptableHighPbfReference = "27.00";
            $rootScope.lowPbfReference = "10.00";
            $rootScope.acceptableHighPbfReference = "20.00";
            $rootScope.highPbfReference = "27.00";
            let male_height_weight = [
                [155,55,66],
                [157,56,67],[160,57,68],[162,58,70],[165,59,72],[167,60,74],[170,61,75],[172,62,77],[175,63,79],
                [177,64,81],[180,65,83],[182,66,85],[185,68,87],[187,69,89],[190,71,91]
            ];
            var i =0;
            while(male_height_weight[i][0]<= height){
                i++;
                if(i==14){
                    break;
                }
            }
            var wtl, wth;
            if(i == 0){
                wtl=male_height_weight[i][1];
                wth=male_height_weight[i][2];   
            }
            else{
                wtl=male_height_weight[i-1][1];
                wth=male_height_weight[i-1][2];   
            }
            $rootScope.lowSmmReference = (0.42*wtl).toFixed(2);
            $rootScope.higSmmhReference = (0.42*wth).toFixed(2);    
            $rootScope.lowFatReference=(0.10*weight).toFixed(2);
            // $rootScope.highFatReference=(0.20*weight).toFixed(2);
            $rootScope.acceptableFatReference = (0.20*weight).toFixed(2);
            $rootScope.highFatReference=(0.27*weight).toFixed(2);
            $rootScope.lowBmcReference = "2.00";
            $rootScope.highBmcReference = "3.70";
            $rootScope.icll=(0.3*wtl).toFixed(2);
            $rootScope.iclh=(0.3*wth).toFixed(2);            
            $rootScope.ecll=(0.2*wtl).toFixed(2);
            $rootScope.eclh=(0.2*wth).toFixed(2);
            $rootScope.proteinl=(0.109*weight).toFixed(2);
            $rootScope.proteinh=(0.135*weight);
            $rootScope.waisttoheightratiolow= "0.35";
            $rootScope.waisttoheightratiohigh= "0.57";

        }
    },
	calculateInvasiveGlucoseRandom(glucoseResult){
        if (glucoseResult >= 80 && glucoseResult <= 140) {
            return "Normal";
        } else if (glucoseResult > 140 && glucoseResult <= 200) {
            return "Pre-Diabetes";
        } else {
            return "Diabetic";
        }
        // if(glucoseResult < 140 || glucoseResult == 140){
        //    // alert("Normal");
        //     return "Normal";
        // }else{
        //   //  alert("Consult with doctor");
        //     // return "Consult with doctor";//"Diabetes"
        //     return "Diabetes";
        // }
    },
    calculateInvasiveGlucoseFasting(glucoseResult){
        if (glucoseResult >= 70 && glucoseResult <= 100) {
            return "Normal";
        } else if (glucoseResult >= 101 && glucoseResult <= 125) {
            return "Acceptable";
        }else {
            return "High";
        }
        // if(glucoseResult < 100 || glucoseResult == 100){
        //    // alert("Normal");
        //     return "Normal";
        // }else if(glucoseResult > 100 && glucoseResult < 126){
        //   //  alert("PreDiabetes");
        //     return "Pre-Diabetes";
        // }else{
        //   //  alert("Consult with doctor");
        //     // return "Consult with doctor";//"Diabetes"
        //     return "Diabetes";
        // }
    },

    calculateInvasiveGlucosePrandial(glucoseResult){
        if(glucoseResult < 140 || glucoseResult == 140){
           // alert("Normal");
            return "Normal";
        }else if(glucoseResult > 140 && glucoseResult < 200){
           // alert("PreDiabetes");
            return "Pre-Diabetes";
        }else{
           // alert("Consult with doctor");
            // return "Consult with doctor";//"Diabetes"
            return "Diabetic";
        }
    },

    calculateInvasiveHeamoglobin(gender,hemoglobinResult){
        if(gender == 'm' || gender == 'male'){
            if (hemoglobinResult > 18) {
                return "High";
            } else if (hemoglobinResult >= 13.5 && hemoglobinResult <= 18) {
                return "Normal";
            } else if (hemoglobinResult >= 11 && hemoglobinResult <= 12.9) {
                return "Acceptable";
            } else if (hemoglobinResult >= 8 && hemoglobinResult <= 10.9) {
                return "Low";
            }else {
                return "Very Low";
            }
            // if(hemoglobinResult < 13.5){
            //     return "Low";
            // }else if((hemoglobinResult > 13.5 || hemoglobinResult == 13.5) && (hemoglobinResult < 18 || hemoglobinResult == 18)){
            //     return "Normal";
            // }else{
            //    // alert("consult with doctor abnormal High");
            //     return "High";
            // }
        }else{
            if (hemoglobinResult > 16) {
                return "High";
            } else if (hemoglobinResult >= 12 && hemoglobinResult <= 16) {
                return "Normal";
            } else if (hemoglobinResult >= 11 && hemoglobinResult <= 11.9) {
                return "Acceptable";
            } else if (hemoglobinResult >= 8 && hemoglobinResult <= 10.9) {
                return "Low";
            }else {
                return "Very Low";
            }
            // if(hemoglobinResult < 12){
            //     return "Low";
            // }else if((hemoglobinResult > 12 || hemoglobinResult == 12) && (hemoglobinResult < 16 || hemoglobinResult == 16)){
            //     return "Normal";
            // }else{
            //    // alert("consult with doctor abnormal High");
            //     return "High";
            // }
        }
    },

    calculateInvasiveTotalCholestrol(tcResult){
        if (tcResult < 200) {
            return "Normal";
        } else if (tcResult >= 200 && tcResult <= 230) {
            return "Acceptable";
        } else if (tcResult >= 231 && tcResult <= 239) {
            return "Borderline High";
        } else {
            return "High";
        }
        // if(tcResult < 200){
        //     return "Normal";
        // }else{
        //     return "High";
        // }
    },

    findUserTestTakenOrNot(){
        let jsonObjAllTest = {
            "ecg":HigiKioskStorageService.returnSessionData('ECGStatus'),
            "spo2":HigiKioskStorageService.returnSessionData('oxygen'),
            "systolic":HigiKioskStorageService.returnSessionData('systolic'),
            "diastolic":HigiKioskStorageService.returnSessionData('diastolic'),
            "pulse":HigiKioskStorageService.returnSessionData('pulse'),
            "w":HigiKioskStorageService.returnSessionData('weight'),
            "intraCellularWater":HigiKioskStorageService.returnSessionData('ICW'),
            "extraCellularWater" : HigiKioskStorageService.returnSessionData('ECW'),
            "bodyFatMass" : HigiKioskStorageService.returnSessionData('Fat'),
            "percentBodyFat" : HigiKioskStorageService.returnSessionData('PBF'),
            "skeletalMuscleMass" : HigiKioskStorageService.returnSessionData('SMM'),
            "bodyCellMass" : HigiKioskStorageService.returnSessionData('BCM'),
            "boneMineralContent" : HigiKioskStorageService.returnSessionData('bmc'),
            "proteinContent" : HigiKioskStorageService.returnSessionData('Protein'),
            "mineralContent" : HigiKioskStorageService.returnSessionData('Mineral'),
            "waistToHipRatio" : HigiKioskStorageService.returnSessionData('whpr'),
            "waistToHeightRatio" : HigiKioskStorageService.returnSessionData('whtr'),
            "basalMetabolicRate" : HigiKioskStorageService.returnSessionData('BMR'),
            "visceralFat" : HigiKioskStorageService.returnSessionData('VF'),
            "roomTemperature":HigiKioskStorageService.returnSessionData('roomTemperature'),
            "bodyTemperature" : HigiKioskStorageService.returnSessionData("temperaturFarrant"),
            "PRInterval" : HigiKioskStorageService.returnSessionData('PRInterval'),
            "QRSInterval" : HigiKioskStorageService.returnSessionData('QRSDuration'),
            "QTCInterval" : HigiKioskStorageService.returnSessionData('QTCInterval'),
            //"heartRate" : HigiKioskStorageService.returnSessionData("HeartRate"),
            "glucose_random" : HigiKioskStorageService.returnSessionData('glucose_random'),
            "glucose_fasting" :HigiKioskStorageService.returnSessionData('glucose_fasting'),
            "glucose_post_prandial" :HigiKioskStorageService.returnSessionData('glucose_post_prandial'),
            "hemoglobin" : HigiKioskStorageService.returnSessionData('heamoglobin'),
            "lipid_profile_tc" : HigiKioskStorageService.returnSessionData('lipid_profile_tc'),
            "lipid_profile_hg" : HigiKioskStorageService.returnSessionData('lipid_profile_hg'),
            "lipid_profile_ldl" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl'),
            "lipid_profile_tg" : HigiKioskStorageService.returnSessionData('lipid_profile_tg'),
            "urine_leukocytes" : HigiKioskStorageService.returnSessionData('urine_leukocytes'),
            "urine_nitrite" : HigiKioskStorageService.returnSessionData('urine_nitrite'),
            "urine_urobilinogen" : HigiKioskStorageService.returnSessionData('urine_urobilinogen'),
            "urine_protein" : HigiKioskStorageService.returnSessionData('urine_protein'),
            "urine_ph" : HigiKioskStorageService.returnSessionData('urine_ph'),
            "urine_blood" : HigiKioskStorageService.returnSessionData('urine_blood'),
            "urine_specific_gravity" : HigiKioskStorageService.returnSessionData('urine_specific_gravity'),
            "urine_ketone" : HigiKioskStorageService.returnSessionData('urine_ketone'),
            "urine_bilirubin" : HigiKioskStorageService.returnSessionData('urine_bilirubin'),
            "urine_glucose" : HigiKioskStorageService.returnSessionData('urine_glucose '),
            "dengue_IgG" : HigiKioskStorageService.returnSessionData('dengue_IgG'),
            "dengue_IgM" : HigiKioskStorageService.returnSessionData('dengue_IgM'),
            "malaria_p_v" : HigiKioskStorageService.returnSessionData('malaria_p_v'),
            "malaria_p_f" : HigiKioskStorageService.returnSessionData('malaria_p_f'),
            "hiv_I" : HigiKioskStorageService.returnSessionData('hiv_I'),
            "hiv_II" : HigiKioskStorageService.returnSessionData('hiv_II'),
            "hcv" : HigiKioskStorageService.returnSessionData('hcv'),
            "troponin" : HigiKioskStorageService.returnSessionData('troponin'),
            "syphilis" : HigiKioskStorageService.returnSessionData('syphilis'),
            "pregnancy" : HigiKioskStorageService.returnSessionData('pregnancy')
        }
        // return true - Test Not taken, false - Test taken

        return Object.values(jsonObjAllTest).every((k) => k === undefined);
    },

    checkInvasiveTestResult() {
        let jsonObjAllTest = {
            "glucose_random" : HigiKioskStorageService.returnSessionData('glucose_random'),
            "glucose_fasting" :HigiKioskStorageService.returnSessionData('glucose_fasting'),
            "glucose_post_prandial" :HigiKioskStorageService.returnSessionData('glucose_post_prandial'),
            "hemoglobin" : HigiKioskStorageService.returnSessionData('heamoglobin'),
            "lipid_profile_tc" : HigiKioskStorageService.returnSessionData('lipid_profile_tc'),
            "lipid_profile_hg" : HigiKioskStorageService.returnSessionData('lipid_profile_hg'),
            "lipid_profile_ldl" : HigiKioskStorageService.returnSessionData('lipid_profile_ldl'),
            "lipid_profile_tg" : HigiKioskStorageService.returnSessionData('lipid_profile_tg'),
            "urine_leukocytes" : HigiKioskStorageService.returnSessionData('urine_leukocytes'),
            "urine_nitrite" : HigiKioskStorageService.returnSessionData('urine_nitrite'),
            "urine_urobilinogen" : HigiKioskStorageService.returnSessionData('urine_urobilinogen'),
            "urine_protein" : HigiKioskStorageService.returnSessionData('urine_protein'),
            "urine_ph" : HigiKioskStorageService.returnSessionData('urine_ph'),
            "urine_blood" : HigiKioskStorageService.returnSessionData('urine_blood'),
            "urine_specific_gravity" : HigiKioskStorageService.returnSessionData('urine_specific_gravity'),
            "urine_ketone" : HigiKioskStorageService.returnSessionData('urine_ketone'),
            "urine_bilirubin" : HigiKioskStorageService.returnSessionData('urine_bilirubin'),
            "urine_glucose" : HigiKioskStorageService.returnSessionData('urine_glucose '),
            "dengue_IgG" : HigiKioskStorageService.returnSessionData('dengue_IgG'),
            "dengue_IgM" : HigiKioskStorageService.returnSessionData('dengue_IgM'),
            "malaria_p_v" : HigiKioskStorageService.returnSessionData('malaria_p_v'),
            "malaria_p_f" : HigiKioskStorageService.returnSessionData('malaria_p_f'),
            "hiv_I" : HigiKioskStorageService.returnSessionData('hiv_I'),
            "hiv_II" : HigiKioskStorageService.returnSessionData('hiv_II'),
            "hcv" : HigiKioskStorageService.returnSessionData('hcv'),
            "troponin" : HigiKioskStorageService.returnSessionData('troponin'),
            "syphilis" : HigiKioskStorageService.returnSessionData('syphilis'),
            "pregnancy" : HigiKioskStorageService.returnSessionData('pregnancy')
        }
        // return true - Test Not taken, false - Test taken

        return Object.values(jsonObjAllTest).every((k) => k === undefined);
    },

    checkNonInvasiveTestResult() {
        let jsonObjAllTest = {
            "ecg":HigiKioskStorageService.returnSessionData('ECGStatus'),
            "spo2":HigiKioskStorageService.returnSessionData('oxygen'),
            "systolic":HigiKioskStorageService.returnSessionData('systolic'),
            "diastolic":HigiKioskStorageService.returnSessionData('diastolic'),
            "pulse":HigiKioskStorageService.returnSessionData('pulse'),
            "w":HigiKioskStorageService.returnSessionData('weight'),
            "intraCellularWater":HigiKioskStorageService.returnSessionData('ICW'),
            "extraCellularWater" : HigiKioskStorageService.returnSessionData('ECW'),
            "bodyFatMass" : HigiKioskStorageService.returnSessionData('Fat'),
            "percentBodyFat" : HigiKioskStorageService.returnSessionData('PBF'),
            "skeletalMuscleMass" : HigiKioskStorageService.returnSessionData('SMM'),
            "bodyCellMass" : HigiKioskStorageService.returnSessionData('BCM'),
            "boneMineralContent" : HigiKioskStorageService.returnSessionData('bmc'),
            "proteinContent" : HigiKioskStorageService.returnSessionData('Protein'),
            "mineralContent" : HigiKioskStorageService.returnSessionData('Mineral'),
            "waistToHipRatio" : HigiKioskStorageService.returnSessionData('whpr'),
            "waistToHeightRatio" : HigiKioskStorageService.returnSessionData('whtr'),
            "basalMetabolicRate" : HigiKioskStorageService.returnSessionData('BMR'),
            "visceralFat" : HigiKioskStorageService.returnSessionData('VF'),
            "roomTemperature":HigiKioskStorageService.returnSessionData('roomTemperature'),
            "bodyTemperature" : HigiKioskStorageService.returnSessionData("temperaturFarrant"),
            "PRInterval" : HigiKioskStorageService.returnSessionData('PRInterval'),
            "QRSInterval" : HigiKioskStorageService.returnSessionData('QRSDuration'),
            "QTCInterval" : HigiKioskStorageService.returnSessionData('QTCInterval')
        }
        // return true - Test Not taken, false - Test taken

        return Object.values(jsonObjAllTest).every((k) => k === undefined);
    },

    calculateInvasiveHDL(hdlResult){
        if (hdlResult >= 60) {
            return "Normal";
        } else if (hdlResult >= 36 && hdlResult <= 59) {
            return "Borderline low";
        } else{
            return "Low";
        }
        // if(hdlResult > 40){
        //     return "Normal";
        // }else{
        //     return "Low";
        // }
    },

    calculateInvasiveLDL(ldlResult){
        if (ldlResult < 100) {
            return "Normal";
        } else if (ldlResult >= 100 && ldlResult <= 129) {
            return "Acceptable";
        } else if (ldlResult >= 130 && ldlResult <= 159) {
            return "Borderline High";
        } else {
            return "High";
        }
        // if(ldlResult < 100){
        //     return "Normal";
        // }else{
        //     return "High";
        // }
    },

    calculateInvasiveTriglycerides(tgResult){
        if (tgResult < 150) {
            return "Normal";
        } else if (tgResult >= 150 && tgResult <= 170) {
            return "Acceptable";
        } else if (tgResult >= 170 && tgResult <= 199) {
            return "Borderline High";
        } else {
            return "High";
        }
        // if(tgResult < 150){
        //     return "Normal";
        // }else{
        //     return "High";
        // }
    },

    getCmd(cmd){
        if(cmd == 'heamo'){
            // return "getTestResultFromLib~C:/TestImages/~MALERIA_P.f_P.v_46629_6861.png~46629_6861~MALERIA_P.f_P.v~null";
			//$rootScope.batchCode = 137;
            if($rootScope.batchCode != ''){
                //request sent to server
                return "ReadHemoglobinValue~"+$rootScope.batchCode;
            }else{
                console.log("batch number is empty or not mtching.. received batch No is = " + $rootScope.batchCode);
                //For Heamoglobin alone batchcode needed , here batchcode not matched error
                // alert("Please check your batch code");
            }
        }else if(cmd == "lip"){
            return "ReadGlucoseORLipidValue~Lipid";
        }else if(cmd == "glc"){
            return "ReadGlucoseORLipidValue~glucose";
        }else if(cmd == "deng"){
			return "getTestResultFromLib~C:/TestImages/~DENGUE_IgG_IgM(SD_Standard)_46629_6861.png~46629_6861~DENGUE_IgG_IgM(SD_Standard)~null";
        }else if(cmd == "mal"){
            return "getTestResultFromLib~C:/TestImages/~MALERIA_P.f_P.v_46629_6861.png~46629_6861~MALERIA_P.f_P.v~null";
        }else if(cmd == "hiv"){
            return "getTestResultFromLib~C:/TestImages/~HIV_TRILINE_46629_6861.png~46629_6861~HIV_TRILINE~null";
        }else if(cmd == "hcv"){
            return "getTestResultFromLib~C:/TestImages/~HEPA_SCAN_HCV_46629_6861.png~46629_6861~HEPA_SCAN_HCV~null";
        }else if(cmd == "trop"){
            return "getTestResultFromLib~C:/TestImages/~TROPONIN_I_46629_6861.png~46629_6861~TROPONIN_I~null";
        }else if(cmd == "syph"){
            return "getTestResultFromLib~C:/TestImages/~SYPHILIS_46629_6861.png~46629_6861~SYPHILIS~null";
        }else if(cmd == "preg"){
            return "getTestResultFromLib~C:/TestImages/~PREGNANCY_HCG_46629_6861.png~46629_6861~PREGNANCY_HCG~null";
        }else if(cmd == "urn"){
            return "getUrineTestInitFromLib~urinetest";
        }else if(cmd == "urnCmdForResult"){
            return "getUrineTestResultFromLib~urinetest";
        }
    },

    getRes(cmd,msg){
        console.log(msg);
		console.log(cmd);
        let res = msg;

        if(res.split('~')[0] == 'urine_test_result_from_jar' && res.split('~')[1] == "ERROR: Time Over. Please insert tray/strip in less than 30 seconds"){
			return "S-ON";//Time Over. Please insert tray/strip in less than 30 seconds
        }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Invalid Test'){
            return "IT";
        }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Time Over. Please insert tray/strip in less than 30 seconds'){
            return "RD";
        }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Result cannot be determined'){
            return "RD";
        }else if(cmd == 'heamo'){
            if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'error1008'){
               // alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'Device is incompitable'){
               // alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }
            else if(res.split('~')[0] == 'hemoglobinResult' && res.split('~')[1] != '' ){
               // alert(res.split('~')[1]);
                return "heamo " + res.split('~')[1]; //Got result
            } else if(res.split('~')[0] == "resultUpdate" && res.split('~')[1] == "error1022"){
				return "PP"; // Press the power button once batch code is display then follow the device intruction
			}
				
        }else if(cmd == "lip"){
            if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'error1008'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'Please TURN ON the device'){
                //alert("Please TURN ON the device");
                return "T_ON"; //T_ON -> Hardware connected but to turn on device
            }else if(res.split('~')[0] == 'LipidResult'){// && Array.isArray(res.split('~')[1]) && res.split('~')[1] != ''){
                //alert(res.split('~')[1]);
                return "lip " + (res.split('~')[1]); //Got result
            } else {
				//alert("lip else part");
				//alert(res);
				console.log("else part");
				console.log(res);
			}
        }else if(cmd == "glc"){
            if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'error1008'){
               // alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'resultUpdate' && res.split('~')[1] == 'Please TURN ON the device'){
                //alert("Please TURN ON the device");
                // alert(res.split('~')[1]);
                return "T_ON"; //T_ON -> Hardware connected but to turn on device
            }else if(res.split('~')[0] == 'otherResult'){// && Array.isArray(res.split('~')[1]) && res.split('~')[1] != ''){
                //alert(res.split('~')[1]);
                return "glc " + res.split('~')[1]; //Got result
            }
        }else if(cmd == "deng"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
               // res = "rapidTestResultcallingFromJar~Result is Dengue_IgG & Dengue_IgM Positive~data:image/png;base64,iVBOR"
                if(res.split('~')[1].includes('Dengue_IgG & Dengue_IgM')){
                    if(res.split('~')[1].includes('Positive')){
                        //alert("Dengue_IgG & Dengue_IgM is Positive");
                        return "Dengue_IgG Positive & Dengue_IgM Positive" + " img:" + res.split('~')[2];
                    }else{
                        //alert("Dengue_IgG & Dengue_IgM is Negative");
                        return "Dengue_IgG Negative & Dengue_IgM Negative" + " img:" + res.split('~')[2];
                    }
                }else if(res.split('~')[1].includes('Dengue_IgG Positive & Dengue_IgM Negative')){
                   // alert("Dengue_IgG Positive & Dengue_IgM Negative");
                    return "Dengue_IgG Positive & Dengue_IgM Negative" + " img:" + res.split('~')[2];
                }else{
                    //alert("Dengue_IgG Negative & Dengue_IgM Positive");
                    return "Dengue_IgG Negative & Dengue_IgM Positive" + " img:" + res.split('~')[2];
                }
            }
        }else if(cmd == "mal"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
               // alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
               // alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "rapidTestResultcallingFromJar~Result is P.v & P.f Negative~data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd4AAACBCAIAAADhU"
                if(res.split('~')[1].includes('P.v & P.f')){
                    if(res.split('~')[1].includes('Positive')){
                       // alert("P.v Positive & P.f Positive");
                        return "P.v Positive & P.f Positive" + " img:" + res.split('~')[2];
                    }else{
                       // alert("P.v Negative & P.f Negative");
                        return "P.v Negative & P.f Negative" + " img:" + res.split('~')[2];
                    }
                }else if(res.split('~')[1].includes('P.v Positive & P.f Negative')){
                  //  alert("P.v Positive & P.f Negative");
                    return "P.v Positive & P.f Negative" + " img:" + res.split('~')[2];
                }else{
                  //  alert("P.v Negative & P.f Positive");
                    return "P.v Negative & P.f Positive" + " img:" + res.split('~')[2];
                }
            }        
        }else if(cmd == "hiv"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
               // alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "rapidTestResultcallingFromJar~Result is HIV-I Positive & HIV-II Negative~data:image/png;base64,iVBO"
                if(res.split('~')[1].includes('HIV-I & HIV-II') || res.split('~')[1].includes('HIV-I & HIV-I')){
                    if(res.split('~')[1].includes('Positive')){
                        //alert("HIV-I Positive & HIV-II Positive");
                        return "HIV-I Positive & HIV-II Positive" + " img:" + res.split('~')[2];
                    }else{
                        //alert("HIV-I Negative & HIV-II Negative");
                        return "HIV-I Negative & HIV-II Negative" + " img:" + res.split('~')[2];
                    }
                }else if(res.split('~')[1].includes('HIV-I Positive & HIV-II Negative')){
                    //alert("HIV-I Positive & HIV-II Negative");
                    return "HIV-I Positive & HIV-II Negative" + " img:" + res.split('~')[2];
                }else if(res.split('~')[1].includes('HIV-I Negative & HIV-II Positive')){
                    //alert("HIV-I Negative & HIV-II Positive");
                    return "HIV-I Negative & HIV-II Positive" + " img:" + res.split('~')[2];
                } else {
					//alert("cmd not handle in utility server - " + res);
				}
            }    
        }else if(cmd == "hcv"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "rapidTestResultcallingFromJar~Result is HEPA_HCV Positive~data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAd4AAACBCAIAAADhU"
                if(res.split('~')[1].includes('Positive')){
                   //alert("HEPA_HCV is Positive");
                   return "HEPA_HCV is Positive" + " img:" + res.split('~')[2];
                }else{
                    //alert("HEPA_HCV is Negative");
                    return "HEPA_HCV is Negative" + " img:" + res.split('~')[2];
                }
            }        
        }else if(cmd == "trop"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "rapidTestResultcallingFromJar~Result is TROPONIN Negative~data:image/png;base64,iVBORw0K"
                if(res.split('~')[1].includes('Positive')){
                   //alert("Troponin is Positive")
                   return "Troponin is Positive" + " img:" + res.split('~')[2];
                }else{
                    //alert("Troponin is Negative");
                    return "Troponin is Negative" + " img:" + res.split('~')[2];
                }
            }
        }else if(cmd == "syph"){
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "getTestResultFromLib~C:/TestImages/~SYPHILIS_46629_6861.png~46629_6861~SYPHILIS~null"
                if(res.split('~')[1].includes('Positive')){
                   //alert("Syphilis is Positive")
                   return "Syphilis is Positive" + " img:" + res.split('~')[2];
                }else{
                    //alert("Syphilis is Negative");
                    return "Syphilis is Negative" + " img:" + res.split('~')[2];
                }
            }
        }else if(cmd == "preg"){
			//alert("condition satusfied");
            if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res.split('~')[1] != ''){
                // res = "rapidTestResultcallingFromJar~Result is PREGNANCY_HCG Positive~data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAbsAAAB"
                if(res.split('~')[1].includes('Positive')){
                   //alert("Pregnancy is Positive")
                   return "Pregnancy is Positive" + " img:" + res.split('~')[2];
                }else{
                    //alert("Pregnancy is Negative");
                    return "Pregnancy is Negative" + " img:" + res.split('~')[2];
                }
            }        
        }else if(cmd == "urn"){
            // console.log(res);
            //alert(res);
            if(res == 'urine_test_init_from_jar~Success'){
                console.log("urine_test_init_from_jar~Success");
				return res;
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is not connected!'){
                //alert("please connect the device");
                return "DE"; //DE = 'Device not connected'-> please connect the device
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Device is incompitable'){
                //alert("Plug out and plug-in the device if it is connected");
                return "DC"; //DC = 'Device is incompitable'-> Plug out and plug-in the device if it is connected
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Could Not Open Source Image'){
                //alert("Some technical Error");
                return "NO_IMG";//NO_IMG = 'Could Not Open Source Image' ->There is no previous dummy image on the folder before starting the test.
            }else if(res.split('~')[0] == 'rapidTestResultcallingFromJar' && res.split('~')[1] == 'Slide Not inserted Properly'){
                //alert("The Optical Reader Tray is not fixed properly");
                return "PPR_SLIDEIN";//PPR_SLIDEIN = 'The Optical Reader Tray is not fixed properly
            }else if(res.split('~')[1] == 'Computing result'){
                //alert("Computing result");
                return "CR";//CR = 'Computing Result' -> Getting result please wait
            }else if(res == 'urine_test_init_from_jar~ERROR' || res == 'urine_test_init_from_jar~Error'){
                return "S-ON";//Time Over. Please insert tray/strip in less than 30 seconds
            }
        }else if(cmd == "urnCmdForResult"){
            let intermediateRes = res.replace(/<br\s*\/?>/gi,' ').replace(/"/g,'').split('~')[1].split(',')[1].replace('Result:','').split('_');
            //alert(intermediateRes);
            return "urn " + intermediateRes; //	 urine test result
        }
    }
    }

    function bodyTempCalculation(normalTemp, bodyTemp){
       	
        // if(bodyTemp <= 98.5){
        //     return "Normal";
        // } else if(bodyTemp <= 99.0){
        //     return "Acceptable";
        // } else if(bodyTemp <= 99.9){
        //     return "Fever";
        // } else if(bodyTemp >= 100.0){
        //     return "High Fever";
        // }

        //if(bodyTemp >= 97.7 && bodyTemp <= 99.5) return "Normal";
        if(bodyTemp <= 99.5) return "Normal";
        else if(bodyTemp > 99.5) return "Fever";
		
    }

}]);
