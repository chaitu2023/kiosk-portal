higiKioskControllers.directive('ivtTwoParaDataEntryModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ivt/ivtTwoParaDataEntryModal.html',
        controller :function($scope){
            $scope.disable_next = "ivtTwoPara_disabled_next";
            $scope.ivtTwoParaData = new Object();


            $scope.resetIVTManulaEntryUI = function(){
                $('.ivtTwoPara1Btn1').css({'background-color': '#fff'});
                $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});


                $('.ivtTwoPara1Btn2').css({'background-color': '#fff'});
                $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});

                $('.ivtTwoPara2Btn1').css({'background-color': '#fff'});
                $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});


                $('.ivtTwoPara2Btn2').css({'background-color': '#fff'});
                $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});

            }

            $scope.ivtTwoParaData.init = function(){
                $scope.ivtTwoParaData.NEXT = "global.next";
                $scope.slideTitle1 = "ivtTwoPara.slideTitle1";
                $scope.slideTitle2 = "ivtTwoPara.slideTitle2";
                $scope.positiveText = "ivtTwoPara.positiveText";
                $scope.negativeText = "ivtTwoPara.negativeText"; 
                $scope.ivtTwoNext = "ivtTwoPara.ivtTwoNext"
                //$rootScope.currentIvtTest = "mal";
                $scope.isIVTtowPara = false;
                $scope.isIVTPara1Valid = false;
                $scope.isIVTPara2Valid = false;
                $scope.disable_next = "ivtTwoPara_disabled_next";
                $scope.ivtPara1Val = "";
                $scope.ivtPara2Val = "";

                $scope.resetIVTManulaEntryUI();

                if($rootScope.currentIvtTest == "mal"){
                    $scope.isIVTtowPara = true;
                    $scope.dataEntryTitle = "Malaria";
                    $scope.para1Title = "Malaria Pf";
                    $scope.para1SubTitle = " - Plasmodium Flaciparum";
                    $scope.para2Title = "Malaria Pv";
                    $scope.para2SubTitle = " - Plasmodium Vivax";
                } else if($rootScope.currentIvtTest == "hiv"){
                    $scope.isIVTtowPara = true;
                    $scope.dataEntryTitle = "HIV";
                    $scope.para1Title = "HIV I";
                    $scope.para1SubTitle = "";
                    $scope.para2Title = "HIV II";
                    $scope.para2SubTitle = "";
                } else if($rootScope.currentIvtTest == "deng"){
                    $scope.isIVTtowPara = true;
                    $scope.dataEntryTitle = "Dengue";
                    $scope.para1Title = "Dengue IgG";
                    $scope.para1SubTitle = " - Immunoglobins G";
                    $scope.para2Title = "Dengue IgM";
                    $scope.para2SubTitle = " - Immunoglobins M";
                } else if($rootScope.currentIvtTest == "trop"){                    
                    $scope.isIVTtowPara = false;
                    $scope.dataEntryTitle = "Troponin";
                    $scope.para1Title = "Troponin";
                    $scope.para1SubTitle = "";
                } else if($rootScope.currentIvtTest == "preg"){                    
                    $scope.isIVTtowPara = false;
                    $scope.dataEntryTitle = "Pregnancy";
                    $scope.para1Title = "Pregnancy";
                    $scope.para1SubTitle = "";
                } else if($rootScope.currentIvtTest == "hcv"){                    
                    $scope.isIVTtowPara = false;
                    $scope.dataEntryTitle = "HCV";
                    $scope.para1Title = "HCV";
                    $scope.para1SubTitle = "";
                } else if($rootScope.currentIvtTest == "syph"){                    
                    $scope.isIVTtowPara = false;
                    $scope.dataEntryTitle = "Syphilis";
                    $scope.para1Title = "Syphilis";
                    $scope.para1SubTitle = "";
                }
            };
            
            $scope.ivtTwoParaData.init();

            $rootScope.ivtTwoParaData = $scope.ivtTwoParaData.init;

            $scope.selectPara1 = function(val){
                $scope.ivtPara1Val = val;
                if(val == 'Positive'){
                    $('.ivtTwoPara1Btn2').css({'background-color': '#3786d6'});
                    $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #fff'});
                    $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder span').css({'color': '#fff'});


                    $('.ivtTwoPara1Btn1').css({'background-color': '#fff'});
                    $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                    $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});

                } else {

                    $('.ivtTwoPara1Btn1').css({'background-color': '#3786d6'});
                    $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #fff'});
                    $('.ivtTwoPara1Btn1 .ivtTwoParaBtnBorder span').css({'color': '#fff'});


                    $('.ivtTwoPara1Btn2').css({'background-color': '#fff'});
                    $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                    $('.ivtTwoPara1Btn2 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});
                }
                //if($rootScope.currentIvtTest == "mal" || $rootScope.currentIvtTest == "hiv" || $rootScope.currentIvtTest == "deng"){
                    $scope.isIVTPara1Valid = true;
                    $scope.ivtNextBtnEnableCheck();
                //}
            }
            $scope.selectPara2 = function(val){
                $scope.ivtPara2Val = val;
                if(val == 'Positive'){
                    $('.ivtTwoPara2Btn2').css({'background-color': '#3786d6'});
                    $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #fff'});
                    $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder span').css({'color': '#fff'});


                    $('.ivtTwoPara2Btn1').css({'background-color': '#fff'});
                    $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                    $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});

                } else {
                    
                    $('.ivtTwoPara2Btn1').css({'background-color': '#3786d6'});
                    $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder').css({'border': '1px solid #fff'});
                    $('.ivtTwoPara2Btn1 .ivtTwoParaBtnBorder span').css({'color': '#fff'});


                    $('.ivtTwoPara2Btn2').css({'background-color': '#fff'});
                    $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder').css({'border': '1px solid #3786d6'});
                    $('.ivtTwoPara2Btn2 .ivtTwoParaBtnBorder span').css({'color': '#3786d6'});
                }
                //if($rootScope.currentIvtTest == "mal" || $rootScope.currentIvtTest == "hiv" || $rootScope.currentIvtTest == "deng"){
                    $scope.isIVTPara2Valid = true;
                    $scope.ivtNextBtnEnableCheck();
                //}
            }

            $scope.ivtNextBtnEnableCheck = function(){
                if($scope.isIVTtowPara){
                    if($scope.isIVTPara1Valid && $scope.isIVTPara2Valid ){
                        $scope.disable_next = "";
                    } else {
                        $scope.disable_next = "ivtTwoPara_disabled_next";
                    }
                } else {
                    if($scope.isIVTPara1Valid){
                        $scope.disable_next = "";
                    } else {
                        $scope.disable_next = "ivtTwoPara_disabled_next";
                    }
                }
            }
    

            $scope.ivtTwoParaValue = function(){
                if($rootScope.currentIvtTest == "deng"){
                    HigiKioskStorageService.saveSessionData('dengue_IgG', $scope.ivtPara1Val);
                    HigiKioskStorageService.saveSessionData('dengue_IgM', $scope.ivtPara2Val);
                } else if($rootScope.currentIvtTest == "hiv"){
                    HigiKioskStorageService.saveSessionData('hiv_I',  $scope.ivtPara1Val);
                    HigiKioskStorageService.saveSessionData('hiv_II', $scope.ivtPara2Val);
                } else if($rootScope.currentIvtTest == "mal"){
                    HigiKioskStorageService.saveSessionData('malaria_p_f', $scope.ivtPara1Val);
                    HigiKioskStorageService.saveSessionData('malaria_p_v', $scope.ivtPara2Val);
                } else if($rootScope.currentIvtTest == "trop"){
                    HigiKioskStorageService.saveSessionData('troponin', $scope.ivtPara1Val);
                } else if($rootScope.currentIvtTest == "hcv"){
                    HigiKioskStorageService.saveSessionData('hcv', $scope.ivtPara1Val);
                } else if($rootScope.currentIvtTest == "syph"){
                    HigiKioskStorageService.saveSessionData('syphilis', $scope.ivtPara1Val);
                } else if($rootScope.currentIvtTest == "preg"){
                    HigiKioskStorageService.saveSessionData('pregnancy', $scope.ivtPara1Val);
                }
                window.location = "#/invasiveResult/forward";
                $rootScope.clearModal();
            }    
        }
    };
}]);
