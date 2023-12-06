higiKioskControllers.directive('infoboxBp', ['$http' , 'HigiKioskStorageService', function($http, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/infobox/bp.html',
        controller :function($scope, $http, $rootScope){
            $scope.init = function(){
                //Set localization fields

                $rootScope.infoBoxDiastolic = 80;
                $rootScope.infoBoxSystolic = 120;

                $scope.infoboxContentTitle = "infobox.about.bp";
                $scope.infoboxContentSubTitle = "infobox.about.bp.subtitle";
                $scope.infoboxBpUnit = "global.mmHg";
                $scope.infoboxAboutSystolic = "infobox.about.bp.systolic";
                $scope.infoboxAboutDiastolic = "infobox.about.bp.diastolic";

                $scope.infoboxAboutBpPoint1 = "infobox.about.bp.point01";
                $scope.infoboxAboutBpPoint2 = "infobox.about.bp.point02";
                $scope.infoboxAboutBpPoint3 = "infobox.about.bp.point03";
                $scope.infoboxAboutBpPoint4 = "infobox.about.bp.point04";
                $scope.infoboxAboutBpPoint5 = "infobox.about.bp.point05";
                $scope.infoboxAboutBpPoint6 = "infobox.about.bp.point06";
                $scope.infoboxAboutBpPoint7 = "infobox.about.bp.point07";
                $scope.infoboxAboutBpPoint8 = "infobox.about.bp.point08";
                $scope.infoboxAboutBpPoint9 = "infobox.about.bp.point09";
                $scope.infoboxAboutBpPoint10 = "infobox.about.bp.point10";
                $scope.infoboxAboutBpPoint11 = "infobox.about.bp.point11";
                $scope.infoboxAboutBpPoint12 = "infobox.about.bp.point12";
                $scope.infoboxAboutBpPoint13 = "infobox.about.bp.point13";
                $scope.infoboxAboutBpPoint14 = "infobox.about.bp.point14";
                $scope.infoboxAboutBpPoint17 = "infobox.about.bp.point17";
                $scope.infoboxAboutBpPoint20 = "infobox.about.bp.point20";
                $scope.infoboxAboutBpPoint23 = "infobox.about.bp.point23";


                $scope.infoboxAboutBpData1 = "infobox.about.bp.data01";
                $scope.infoboxAboutBpData2 = "infobox.about.bp.data02";
                $scope.infoboxAboutBpData3 = "infobox.about.bp.data03";
                $scope.infoboxAboutBpData4 = "infobox.about.bp.data04";
                $scope.infoboxAboutBpData5 = "infobox.about.bp.data05";
                $scope.infoboxAboutBpData6 = "infobox.about.bp.data06";
                $scope.infoboxAboutBpData7 = "infobox.about.bp.data07";
                $scope.infoboxAboutBpData8 = "infobox.about.bp.data08";
                $scope.infoboxAboutBpData9 = "infobox.about.bp.data09";
                $scope.infoboxAboutBpData10 = "infobox.about.bp.data10";
                $scope.infoboxAboutBpData11 = "infobox.about.bp.data11";
                $scope.infoboxAboutBpData12 = "infobox.about.bp.data12";
                $scope.infoboxAboutBpData13 = "infobox.about.bp.data13";
                $scope.infoboxAboutBpData14 = "infobox.about.bp.data14";
                $scope.infoboxAboutBpData15 = "infobox.about.bp.data15";
                $scope.infoboxAboutBpData16 = "infobox.about.bp.data16";
                $scope.infoboxAboutBpData18 = "infobox.about.bp.data18";
                $scope.infoboxAboutBpData19 = "infobox.about.bp.data19";
                $scope.infoboxAboutBpData21 = "infobox.about.bp.data21";
                $scope.infoboxAboutBpData22 = "infobox.about.bp.data22";
                $scope.infoboxAboutBpData24 = "infobox.about.bp.data24";
                $scope.infoboxAboutBpData25 = "infobox.about.bp.data25";

                //bp info table data
                $scope.infoBoxAboutSbpNormal = "infobox.about.bp.normal_level_sbp";
                $scope.infoBoxAboutDbpNormal = "infobox.about.bp.normal_level_dbp";
                $scope.infoBoxAboutSbpAcceptable = "infobox.about.bp.acceptable_level_sbp";
                $scope.infoBoxAboutDbpAcceptable = "infobox.about.bp.acceptable_level_dbp";
                $scope.infoBoxAboutSbp1stageHyper = "infobox.about.bp.1stage_hyper_level_sbp";
                $scope.infoBoxAboutDbp1stageHyper = "infobox.about.bp.1stage_hyper_level_dbp";
                $scope.infoBoxAboutSbp2stageHyper = "infobox.about.bp.2stage_hyper_level_sbp";
                $scope.infoBoxAboutDbp2stageHyper = "infobox.about.bp.2stage_hyper_level_dbp";
                $scope.infoBoxAbout1stageHyper = "infobox.about.bp.1stage_hyper";
                $scope.infoBoxAbout2stageHyper = "infobox.about.bp.2stage_hyper";
                $scope.infoBoxAbout2_Recheck = "infobox.about.bp.recheck_consult_healthcare_provider";
                $scope.infoBoxAbout2_Recheck_Text = "infobox.about.bp.point20";


                $scope.infoBoxAboutBpOr = "bpModals.or";
                $scope.infoBoxAboutBpAnd = "bpModals.and";


                $scope.infoboxAboutBpHcDisclaimer = "infobox.about.bp.hc.disclaimer";


            };

            $scope.init();
        }

    };
}]);
