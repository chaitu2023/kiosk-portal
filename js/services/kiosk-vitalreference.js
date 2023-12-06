var higiServices = angular.module("higiKioskUi");
    higiServices.factory('HigiKioskVitalReference', ['$http' , '$rootScope' , 'HigiKioskStorageService', function($http, $rootScope, HigiKioskStorageService) {
    return {
        calculateBpRiskForUI : function(systolic, diastolic) {
            if (typeof systolic == "string")
                systolic = parseInt(systolic);

            if (systolic <=129)
                return "Normal";
            else if (systolic >= 130 && systolic <= 139)
                return "Acceptable";
            else // >=140
                return "Clinical Screening Recommended";
        },

        calculateBpRiskForDB : function(systolic, diastolic) {
            if (systolic <=129)
                return "Normal";
            else if (systolic >= 130 && systolic <= 139)
                return "Acceptable";
            else // >=140
                return "High";
        },

        calculateBMIRiskForUI : function(bmi) {
            if (typeof bmi == "string")
                bmi = parseInt(bmi);

            if (bmi < 18.5)
                return "Low";
            else if (bmi >= 18.5 && bmi <= 22.9)
                return "Normal";
            else
                return "High";
        },

        calculateBMIRiskForDB : function(bmi) {
            if (bmi < 18.5)
                return "Low";
            else if (bmi >= 18.5 && bmi <= 22.9)
                return "Normal";
            else
                return "High";
        },

        calculateTempRiskForUI : function(temperature) {
            if (typeof temperature == "string")
                temperature = parseInt(temperature);

            if (temperature < 95)
                return "Low";
            else if (temperature >= 95 && temperature <= 99.5)
                return "Normal";
            else
                return "High";
        },

        calculateTempRiskForDB : function(temperature) {
            if (temperature < 95 )
                return "Low";
            else if (temperature >= 95 && temperature <= 99.5)
                return "Normal";
            else
                return "High";
        },

        calculatePulseRiskForUI : function(pulse) {
            if (typeof pulse == "string")
                pulse = parseInt(pulse);
        
            if (pulse < 60 )
                return "Low";
            else if (pulse >= 60 && pulse <= 99)
                return "Normal";
            else
                return "High";
        },

        calculatePulseRiskForDB : function(pulse) {
            if (pulse < 60 )
                return "Low";
            else if (pulse >= 60 && pulse <= 99)
                return "Normal";
            else
                return "High";
        },

        calculateSpo2RiskForUI : function(Spo2) {
            if (typeof Spo2 == "string")
                Spo2 = parseInt(Spo2);
    
            if (Spo2 < 95 )
                return "Low";
            else
                return "Normal";
        },

        calculateSpo2RiskForDB : function(Spo2) {
            if (Spo2 < 95 )
                return "Low";
            else
                return "Normal";
        },

        calculateVisceralFatRiskForUI : function(visceralFat) {
            if (typeof visceralFat == "string")
                visceralFat = parseInt(visceralFat);
        
            if (visceralFat >= 1 &&  visceralFat <= 100)
                return "Normal";
            else if (visceralFat >= 101 && visceralFat <= 120)
                return "Acceptable";
            else
                return "High";
        },

        calculateVisceralFatRiskForDB : function(visceralFat) {
            if (visceralFat >= 1 &&  visceralFat <= 100)
                return "Normal";
            else if (visceralFat >= 101 && visceralFat <= 120)
                return "Acceptable";
            else
                return "High";
        },

        calculateBodyFatMassRiskForUI : function(bodyFatMass, weight) {
            if (weight != undefined) {
                if (HigiKioskStorageService.returnSessionData('gender') != "m") {
                    $rootScope.lowFatReference=(0.18*weight).toFixed(2);
                    $rootScope.acceptableFatReference = (0.28*weight).toFixed(2);
                    $rootScope.highFatReference=(0.32*weight).toFixed(2);
                } else {
                    $rootScope.lowFatReference=(0.10*weight).toFixed(2);
                    $rootScope.acceptableFatReference = (0.20*weight).toFixed(2);
                    $rootScope.highFatReference=(0.27*weight).toFixed(2);
                }
            }

            if (parseFloat(bodyFatMass) < $rootScope.lowFatReference)
                return 'Low';
            else if (parseFloat(bodyFatMass) >= $rootScope.lowFatReference && parseFloat(bodyFatMass) <= $rootScope.acceptableFatReference)
                return 'Normal';
            else if (parseFloat(bodyFatMass) > $rootScope.acceptableFatReference && parseFloat(bodyFatMass) <= $rootScope.highFatReference)
                return 'Acceptable';
            else if (parseFloat(bodyFatMass) > $rootScope.highFatReference)
                return 'High';
        },

        calculateBodyFatMassRiskForDB : function(bodyFatMass, weight) {
            if (weight != undefined) {
                if (HigiKioskStorageService.returnSessionData('gender') != "m") {
                    $rootScope.lowFatReference=(0.18*weight).toFixed(2);
                    $rootScope.acceptableFatReference = (0.28*weight).toFixed(2);
                    $rootScope.highFatReference=(0.32*weight).toFixed(2);
                } else {
                    $rootScope.lowFatReference=(0.10*weight).toFixed(2);
                    $rootScope.acceptableFatReference = (0.20*weight).toFixed(2);
                    $rootScope.highFatReference=(0.27*weight).toFixed(2);
                }
            }

            if (parseFloat(bodyFatMass) < $rootScope.lowFatReference)
                return 'Low';
            else if (parseFloat(bodyFatMass) >= $rootScope.lowFatReference && parseFloat(bodyFatMass) <= $rootScope.acceptableFatReference)
                return 'Normal';
            else if (parseFloat(bodyFatMass) > $rootScope.acceptableFatReference && parseFloat(bodyFatMass) <= $rootScope.highFatReference)
                return 'Acceptable';
            else if (parseFloat(bodyFatMass) > $rootScope.highFatReference)
                return 'High';
        },

        calculatePBFRiskForUI : function(percentBodyFat) {
            if (parseFloat(percentBodyFat) < $rootScope.lowPbfReference)
                return 'Low';
            else if (parseFloat(percentBodyFat) >= $rootScope.lowPbfReference && parseFloat(percentBodyFat) <= $rootScope.acceptableHighPbfReference)
                return 'Normal';
            else if(parseFloat(percentBodyFat) > $rootScope.acceptableHighPbfReference && parseFloat(percentBodyFat) <= $rootScope.highPbfReference)
                return 'Acceptable';
            else if (parseFloat(percentBodyFat) > $rootScope.highPbfReference)
                return 'High';
        },

        calculatePBFRiskForDB : function(percentBodyFat) {
            if (parseFloat(percentBodyFat) < $rootScope.lowPbfReference)
                return 'Low';
            else if (parseFloat(percentBodyFat) >= $rootScope.lowPbfReference && parseFloat(percentBodyFat) <= $rootScope.acceptableHighPbfReference)
                return 'Normal';
            else if(parseFloat(percentBodyFat) > $rootScope.acceptableHighPbfReference && parseFloat(percentBodyFat) <= $rootScope.highPbfReference)
                return 'Acceptable';
            else if (parseFloat(percentBodyFat) > $rootScope.highPbfReference)
                return 'High';
        },

        calculateProteinRiskForUI : function(protein, weight) {
            if (weight != undefined) {
                if (HigiKioskStorageService.returnSessionData('gender') != "m") {
                    $rootScope.proteinl = (0.116*weight).toFixed(2);
                    $rootScope.proteinh = (0.141*weight).toFixed(2);
                } else {
                    $rootScope.proteinl = (0.109*weight).toFixed(2);
                    $rootScope.proteinh = (0.135*weight).toFixed(2);
                }
            }
            
            if (parseFloat(protein) < $rootScope.proteinl)
                return 'Low';
            else if (parseFloat(protein) >= $rootScope.proteinl && parseFloat(protein) <= $rootScope.proteinh)
                return 'Normal';
            else if (parseFloat(protein) > $rootScope.proteinh)
                return 'High';
        },

        calculateProteinRiskForDB : function(protein, weight) {
            if (weight != undefined) {
                if (HigiKioskStorageService.returnSessionData('gender') != "m") {
                    $rootScope.proteinl = (0.116*weight).toFixed(2);
                    $rootScope.proteinh = (0.141*weight).toFixed(2);
                } else {
                    $rootScope.proteinl = (0.109*weight).toFixed(2);
                    $rootScope.proteinh = (0.135*weight).toFixed(2);
                }
            }
            
            if (parseFloat(protein) < $rootScope.proteinl)
                return 'Low';
            else if (parseFloat(protein) >= $rootScope.proteinl && parseFloat(protein) <= $rootScope.proteinh)
                return 'Normal';
            else if (parseFloat(protein) > $rootScope.proteinh)
                return 'High';
        },

        calculateMineralsRiskForUI : function(mineral) {
            if (parseFloat(mineral) < $rootScope.lowMineral)
                return 'Low';
            else if (parseFloat(mineral) >= $rootScope.lowMineral)
                return 'Normal';
        },

        calculateMineralsRiskForDB : function(mineral) {
            if (parseFloat(mineral) < $rootScope.lowMineral)
                return 'Low';
            else if (parseFloat(mineral) >= $rootScope.lowMineral)
                return 'Normal';
        },

        calculateICWRiskForUI : function(intraCellulatWater) {
            if (parseFloat(intraCellulatWater) < $rootScope.icll)
                return 'Low';
            else if (parseFloat(intraCellulatWater) >= $rootScope.icll && parseFloat(intraCellulatWater) <= $rootScope.iclh)
                return 'Normal';
            else if(parseFloat(intraCellulatWater) > $rootScope.iclh)
                return 'High';
        },

        calculateICWRiskForDB : function(intraCellulatWater) {
            if (parseFloat(intraCellulatWater) < $rootScope.icll)
                return 'Low';
            else if (parseFloat(intraCellulatWater) >= $rootScope.icll && parseFloat(intraCellulatWater) <= $rootScope.iclh)
                return 'Normal';
            else if(parseFloat(intraCellulatWater) > $rootScope.iclh)
                return 'High';
        },

        calculateECWRiskForUI : function(extraCellulatWater) {
            if (parseFloat(extraCellulatWater) < $rootScope.ecll)
                return 'Low';
            else if (parseFloat(extraCellulatWater) >= $rootScope.ecll && parseFloat(extraCellulatWater) <= $rootScope.eclh)
                return 'Normal';
            else if (parseFloat(extraCellulatWater) > $rootScope.eclh)
                return 'High';
        },

        calculateECWRiskForDB : function(extraCellulatWater) {
            if (parseFloat(extraCellulatWater) < $rootScope.ecll)
                return 'Low';
            else if (parseFloat(extraCellulatWater) >= $rootScope.ecll && parseFloat(extraCellulatWater) <= $rootScope.eclh)
                return 'Normal';
            else if (parseFloat(extraCellulatWater) > $rootScope.eclh)
                return 'High';
        },

        calculateWHPRRiskForUI : function(waistHipRatio) {
            if ((waistHipRatio) < 0.80)
                return 'Low';
            else if (parseFloat(waistHipRatio) >= 0.80 && parseFloat(waistHipRatio) <= 0.90)
                return 'Normal';
            else if (parseFloat(waistHipRatio) > 0.90)
                return 'High';
        },

        calculateWHPRRiskForDB : function(waistHipRatio) {
            if ((waistHipRatio) < 0.80)
                return 'Low';
            else if (parseFloat(waistHipRatio) >= 0.80 && parseFloat(waistHipRatio) <= 0.90)
                return 'Normal';
            else if (parseFloat(waistHipRatio) > 0.90)
                return 'High';
        },

        calculateWHTRRiskForUI : function(waistHeightRatio) {
            if (parseFloat(waistHeightRatio) < $rootScope.waisttoheightratiolow)
                return 'Low';
            else if (parseFloat(waistHeightRatio) >= $rootScope.waisttoheightratiolow && parseFloat(waistHeightRatio) <= $rootScope.waisttoheightratiohigh)
                return 'Normal';
            else if (parseFloat(waistHeightRatio) > $rootScope.waisttoheightratiohigh)
                return 'High';
        },

        calculateWHTRRiskForDB : function(waistHeightRatio) {
            if (parseFloat(waistHeightRatio) < $rootScope.waisttoheightratiolow)
                return 'Low';
            else if (parseFloat(waistHeightRatio) >= $rootScope.waisttoheightratiolow && parseFloat(waistHeightRatio) <= $rootScope.waisttoheightratiohigh)
                return 'Normal';
            else if (parseFloat(waistHeightRatio) > $rootScope.waisttoheightratiohigh)
                return 'High';
        },

        calculateBCMRiskForUI : function(bodyCellMass) {
            if (parseFloat(bodyCellMass) < $rootScope.bcml)
                return 'Low';
            else if (parseFloat(bodyCellMass) >= $rootScope.bcml)
                return 'Normal';
        },

        calculateBCMRiskForDB : function(bodyCellMass) {
            if (parseFloat(bodyCellMass) < $rootScope.bcml)
                return 'Low';
            else if (parseFloat(bodyCellMass) >= $rootScope.bcml)
                return 'Normal';
        },

        calculateBMCRiskForUI : function(boneMineralContent) {
            if (parseFloat(boneMineralContent) < $rootScope.lowBmcReference)
                return 'Low';
            else if (parseFloat(boneMineralContent) >= $rootScope.lowBmcReference)
                return 'Normal';
        },

        calculateBMCRiskForDB : function(boneMineralContent) {
            if (parseFloat(boneMineralContent) < $rootScope.lowBmcReference)
                return 'Low';
            else if (parseFloat(boneMineralContent) >= $rootScope.lowBmcReference)
                return 'Normal';
        },

        calculateSMMRiskForUI : function(skeletalMuscleMass) {
            if (parseFloat(skeletalMuscleMass) < $rootScope.lowSmmReference)
                return 'Low';
            else if (parseFloat(skeletalMuscleMass) >= $rootScope.lowSmmReference)
                return 'Normal';
        },

        calculateSMMRiskForDB : function(skeletalMuscleMass) {
            if (parseFloat(skeletalMuscleMass) < $rootScope.lowSmmReference)
                return 'Low';
            else if (parseFloat(skeletalMuscleMass) >= $rootScope.lowSmmReference)
                return 'Normal';
        },

        findStatusColorCode : function(status){
            status = ((status.toLowerCase()).trim()).replaceAll(" ", "_");
            if(status == "low"){
                return "#000";
            } else if(status == "normal"){
                
            } else if(status == "acceptable"){
                
            } else if(status == "high"){
                
            } else if(status == "clinical_screening_recommended"){
                
            } else if(status == "check_with_healthcare_provider"){
                
            }
        },

        getStatusColorCodeForFinalResultPage : function(status) {
            if (status == 'Clinical Screening Recommended' || status == 'Check with healthcare provider' || status == 'High')
                return '#f0555b';
            else if (status == 'Low')
                return '#ef940f';
            else if (status == 'Normal')
                return '#2e8b57';
            else if (status == 'Acceptable')
                return '#ef940f';
        }
    }
}]);
