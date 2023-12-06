higiKioskControllers.directive('infoboxWeightBmcModal', ['$http', '$timeout','HigiApiService' ,'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService' , '$rootScope' , function($http, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/weight-body-mass-comp.html',
        controller :function($scope, $http, $rootScope){

            $scope.showInfoboxWeightBodyMassComp = function(){
                $rootScope.loadModal({id : 'infoboxweightbodymasscomp'});
            };

            $scope.watchIsMale = $rootScope.$watch('isMale', function(newVal, oldVal){
                $scope.isFemale = ($rootScope.isMale) ? "" : "female";
                /* code for table value starts here
                if((HigiKioskStorageService.returnSessionData('weight')) != undefined){                    
                    $scope.weight = Number(HigiKioskStorageService.returnSessionData('weight'));
                    $scope.gender = HigiKioskStorageService.returnSessionData('gender');
                    // body fat mass
                    $scope.body_fat_mass_male_min_calculation = (0.10*$scope.weight).toFixed(2).toString();                 
                    $scope.body_fat_mass_male_max_calculation = (0.20*$scope.weight).toFixed(2).toString();                   
                    $scope.body_fat_mass_female_min_calculation = (0.18*$scope.weight).toFixed(2).toString();                                       
                    $scope.body_fat_mass_female_max_calculation = (0.28*$scope.weight).toFixed(2).toString();

                    //skeletal muscle mass-->wtl,wth
                    $scope.skeletal_muscle_mass_male_min_calculation = (0.42*$scope.weight).toFixed(2).toString();
                    $scope.skeletal_muscle_mass_male_max_calculation = (0.42*$scope.weight).toFixed(2).toString();
                    $scope.skeletal_muscle_mass_female_min_calculation = (0.36*$scope.weight).toFixed(2).toString();
                    $scope.skeletal_muscle_mass_female_max_calculation = (0.36*$scope.weight).toFixed(2).toString();
                    
                    //Protein content
                    $scope.protein_content_male_min_calculation = (0.109*$scope.weight).toFixed(2).toString();
                    $scope.protein_content_male_max_calculation = (0.135*$scope.weight).toFixed(2).toString();
                    $scope.protein_content_female_min_calculation = (0.116*$scope.weight).toFixed(2).toString();
                    $scope.protein_content_female_max_calculation = (0.141*$scope.weight).toFixed(2).toString();

                    //icw-->wtl,wth
                    $scope.intracellularWater_male_min_calculation = (0.3*$scope.weight).toFixed(2).toString();
                    $scope.intracellularWater_male_max_calculation = (0.3*$scope.weight).toFixed(2).toString();
                    $scope.intracellularWater_female_min_calculation = (0.3*$scope.weight).toFixed(2).toString();
                    $scope.intracellularWater_female_max_calculation = (0.3*$scope.weight).toFixed(2).toString();
                    
                    //ecw-->wtl,wth
                    $scope.extracellularWater_male_min_calculation = (0.2*$scope.weight).toFixed(2).toString();
                    $scope.extracellularWater_male_max_calculation = (0.2*$scope.weight).toFixed(2).toString();
                    $scope.extracellularWater_female_min_calculation = (0.2*$scope.weight).toFixed(2).toString();
                    $scope.extracellularWater_female_max_calculation = (0.2*$scope.weight).toFixed(2).toString();                   
                }
                code for table value starts here*/
            });

            $scope.init = function(){
                //Set localization fields
                /* old bmc info details starts here
                $scope.infoboxContentTitle = "infobox.about.bmc";
                $scope.infoboxContentSubTitle = "infobox.about.bmc.subtitle";
                $scope.infoboxContentMiniTitleMale = "infobox.about.bmc.title.mini.male";
                $scope.infoboxContentMiniTitleFemale = "infobox.about.bmc.title.mini.female";
                $scope.infoboxContentMiniSubtitle = "infobox.about.bmc.subtitle.mini";

                $scope.infoboxBodyFatPercentageTitle = "bodycomp.bmc.body.fat.percentage";
                $scope.infoboxBodyFatPercentageDescription = "bodycomp.bmc.body.fat.percentage.description";
                $scope.infoboxBodyLeanMassTitle = "bodycomp.bmc.lean.mass";
                $scope.infoboxBodyLeanMassDescription = "bodycomp.bmc.lean.mass.description";


                $scope.infoboxAboutBmcPoint1 = "infobox.about.bmc.point01"; // Male Fat
                $scope.infoboxAboutBmcPoint2 = "infobox.about.bmc.point02";
                $scope.infoboxAboutBmcPoint3 = "infobox.about.bmc.point03";
                $scope.infoboxAboutBmcPoint4 = "infobox.about.bmc.point04";
                $scope.infoboxAboutBmcPoint5 = "infobox.about.bmc.point05";
                $scope.infoboxAboutBmcPoint6 = "infobox.about.bmc.point06"; // Female Fat

                $scope.infoboxCitation = "infobox.about.bmc.citation";
                $scope.globalWeightClass = "bodycomp.class";
                $scope.globalWeightPercent = "bodycomp.percent";
                $scope.globalPercentLabel = "global.abbv.percent";

                $scope.globalWeightObese = "bodycomp.obese";
                $scope.globalBMCAtRisk = "bodycomp.bmc.at.risk";
                $scope.globalBMCAcceptable = "bodycomp.bmc.acceptable";
                $scope.globalBMCHealthy = "bodycomp.bmc.healthy";
                old bmc info details ends here */

                $scope.body_comp_bca_Title = "infobox.about.bca.Title",
                $scope.body_comp_bca_content = "infobox.bca.definition";
                $scope.body_comp_body_fat_mass_title = "infobox.bca_bfm_title";
                $scope.body_comp_body_fat_mass_definition = "infobox.bca_bfm_content";
                $scope.body_comp_skeletal_muscle_mass_title = "infobox.bca_smm_title";
                $scope.body_comp_skeletal_muscle_mass_definition = "infobox.bca_smm_content";
                $scope.body_comp_body_cell_mass_title = "infobox.bca_bodyCellMass_title";
                $scope.body_comp_body_cell_mass_definition = "infobox.bca_bodyCellMass_content";
                $scope.body_comp_body_cell_mass_min_value = "infobox.bca_bodyCellMass_minValue";
                $scope.body_comp_body_cell_mass_max_value = "infobox.bca_bodyCellMass_maxValue";
                $scope.body_comp_vf_title = "infobox.bca_vf_title";
                $scope.body_comp_vf_definition = "infobox.bca_vf_content";
                $scope.body_comp_vf_min_value = "infobox.bca_vf_minValue";
                $scope.body_comp_vf_max_value = "infobox.bca_vf_maxValue";
                $scope.body_comp_bone_mineral_content_title = "infobox.bca_boneMineralContent_title";
                $scope.body_comp_bone_mineral_content_definition = "infobox.bca_boneMineralContent_content";
                $scope.body_comp_bone_mineral_content_male_minVal = "infobox.bca_boneMineralContent_male_minValue";
                $scope.body_comp_bone_mineral_content_male_maxVal = "infobox.bca_boneMineralContent_male_maxValue";
                $scope.body_comp_bone_mineral_content_female_minVal = "infobox.bca_boneMineralContent_female_minValue";
                $scope.body_comp_bone_mineral_content_female_maxVal = "infobox.bca_boneMineralContent_female_maxValue";
                $scope.body_comp_protein_content_title = "infobox.bca_protein_content_title";
                $scope.body_comp_protein_content_definition = "infobox.bca_protein_content_content";
                $scope.body_comp_mineral_content_title = "infobox.bca_mineral_content_title";
                $scope.body_comp_mineral_content_definition = "infobox.bca_mineral_content_content";
                $scope.body_comp_mineral_content_min_value = "infobox.bca_mineral_content_minValue";
                $scope.body_comp_mineral_content_max_value = "infobox.bca_mineral_content_maxValue";
                $scope.body_comp_pbf_title = "infobox.bca_pbf_title";
                $scope.body_comp_pbf_definition = "infobox.bca_pbf_content";
                $scope.body_comp_pbf_male_minVal = "infobox.bca_pbf_male_minValue";
                $scope.body_comp_pbf_male_maxVal = "infobox.bca_pbf_male_maxValue";
                $scope.body_comp_pbf_female_minVal = "infobox.bca_pbf_female_minValue";
                $scope.body_comp_pbf_female_maxVal = "infobox.bca_pbf_female_maxValue";
                $scope.body_comp_icw_title = "infobox.bca_icw_title";
                $scope.body_comp_icw_definition = "infobox.bca_icw_content";
                $scope.body_comp_ecw_title = "infobox.bca_ecw_title";
                $scope.body_comp_ecw_definition = "infobox.bca_ecw_content";
                $scope.body_comp_waistToHipRatio_title = "infobox.bca_waistToHipRatio_title";
                $scope.body_comp_waistToHipRatio_definition = "infobox.bca_waistToHipRatio_content";
                $scope.body_comp_waistToHipRatio_min_value = "infobox.bca_waistToHipRatio_minValue";
                $scope.body_comp_waistToHipRatio_max_value = "infobox.bca_waistToHipRatio_maxValue";
                $scope.body_comp_waistToHeightRatio_title = "infobox.bca_waistToHeightRatio_title";
                $scope.body_comp_waistToHeightRatio_definition = "infobox.bca_waistToHeightRatio_content";
                $scope.body_comp_waistToHeightRatio_male_minVal = "infobox.bca_waistToHeightRatio_male_minValue";
                $scope.body_comp_waistToHeightRatio_male_maxVal = "infobox.bca_waistToHeightRatio_male_maxValue";
                $scope.body_comp_waistToHeightRatio_female_minVal = "infobox.bca_waistToHeightRatio_female_minValue";
                $scope.body_comp_waistToHeightRatio_female_maxVal = "infobox.bca_waistToHeightRatio_female_maxValue";
                $scope.body_comp_basalMetabolicRate_title = "infobox.bca_basalMetabolicRate_title";
                $scope.body_comp_basalMetabolicRate_definition = "infobox.bca_basalMetabolicRate_content";
                $scope.body_comp_table_male_gender = "infobox.bca.table_male_gender";
                $scope.body_comp_table_female_gender = "infobox.bca.table_female_gender";
                $scope.body_comp_table_minimum = "infobox.bca.table_min";
                $scope.body_comp_table_maximum = "infobox.bca.table_max";
                $scope.body_comp_table_parameter = "infobox.bca.table_parameter";
                $scope.body_comp_table_ranges = "infobox.bca.table_ranges";
            };

            $scope.init();
        }

    };
}]);
