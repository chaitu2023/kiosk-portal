higiKioskControllers.controller('HigiKioskInvasiveInstructionController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskUtilitiesService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskUtilitiesService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService){
	
    $scope.init = function(){
        $rootScope.currentIvtTest = '';
        $rootScope.serverCmd = '';
        $rootScope.connectDeviceName = '';
		$scope.showGlcSelectOpt = false;
        $scope.reselectGlcTypeBack = false;
        $rootScope.glcCustomOption = 'glcRan';
        $scope.nextVisible = true;
        $scope.glucose = "ivtInstruct.glucose";
        $scope.urine = "ivtInstruct.urine";
        $scope.hcv = "ivtInstruct.hcv";
        $scope.pregnancy = "ivtInstruct.pregnancy";
        $scope.dengue = "ivtInstruct.dengue";
        $scope.troponin = "ivtInstruct.troponin";
        $scope.heamoglobin = "ivtInstruct.heamoglobin";
        $scope.malaria = "ivtInstruct.malaria";
        $scope.syphilis = "ivtInstruct.syphilis";
        $scope.lipid = "ivtInstruct.lipid";
        $scope.hiv = "ivtInstruct.hiv";
        $scope.glcSubHead = "ivtInstruct.glcSubHeading";
        $scope.glcRandom = "ivtInstruct.glcRandom";
        $scope.glcFasting = "ivtInstruct.glcFasting";
        $scope.glcPost = "ivtInstruct.glcPost";
        $scope.skipTest = 'global.skip';
        $scope.startTest = 'ivtInstruct.startTest';
        $scope.instructBottomHeading = 'ivtInstruct.instructBottomHeading';
        $scope.enterManual = 'ivtInstruct.enterManual';
        $scope.lipiInstructText1 = 'ivtInstruct.lipiInstructText1';
        $scope.lipiInstructText2 = 'ivtInstruct.lipiInstructText2';
        $scope.ivtInstruction = 'ivtInstruct.ivtInstruction';
        $scope.opticalInstructionText1 = 'ivtInstruct.opticalInstructionText1';
        $scope.opticalInstructionText2 = "ivtInstruct.opticalInstructionText2";
        $scope.opticalInstructionText3 = "ivtInstruct.opticalInstructionText3";
        $scope.heamoInstructText1 = "ivtInstruct.heamoInstructText1";
        $scope.heamoInstructText2 = "ivtInstruct.heamoInstructText2";

        $scope.socket = new WebSocket("ws://localhost:8444/paramWS/");
        $scope.mode =  HigiKioskStorageService.returnSessionData('current_mode');
        console.log($scope.mode);
        var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveInstructionController', $scope.mode);
       
        console.log(links);
        $scope.nextSlide = links.next.link;

        $scope.glcSelectOpt = [
            {'label' : $scope.glcRandom, 'id' : 'glcRan'},
            {'label' : $scope.glcFasting, 'id' : 'glcFas'},
            {'label' : $scope.glcPost, 'id' : 'glcpos'}
        ];

        console.log($rootScope.selectedIvtListArray);

        if($rootScope.selectedIvtListArray.length > 0){
            $rootScope.currentIvtTest = $rootScope.selectedIvtListArray[0];
            if($rootScope.currentIvtTest == 'hiv'){
                $rootScope.instructionHeaderImage = 'hiv_logo';
                $rootScope.instructionHeader = $scope.hiv;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'glc'){
                $rootScope.instructionHeaderImage = 'glc_logo';
                $rootScope.instructionHeader = $scope.glucose;
                $rootScope.connectDeviceName = 'Lipid Care';
				$scope.showGlcSelectOpt = true;
                $scope.nextVisible = false;
            }
            if($rootScope.currentIvtTest == 'preg'){
                $rootScope.instructionHeaderImage = 'preg_logo';
                $rootScope.instructionHeader = $scope.pregnancy;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'heamo'){
                $rootScope.instructionHeaderImage = 'heamo_logo';
                $rootScope.instructionHeader = $scope.heamoglobin;
                $rootScope.connectDeviceName = 'Heamoglobin';
            }
            if($rootScope.currentIvtTest == 'lip'){
                $rootScope.instructionHeaderImage = 'lip_logo';
                $rootScope.instructionHeader = $scope.lipid;
                $rootScope.connectDeviceName = 'Lipid Care';
            }
            if($rootScope.currentIvtTest == 'urn'){
                $rootScope.instructionHeaderImage = 'urn_logo';
                $rootScope.instructionHeader = $scope.urine;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'deng'){
                $rootScope.instructionHeaderImage = 'deng_logo';
                $rootScope.instructionHeader = $scope.dengue;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'mal'){
                $rootScope.instructionHeaderImage = 'mal_logo';
                $rootScope.instructionHeader = $scope.malaria;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'hcv'){
                $rootScope.instructionHeaderImage = 'hcv_logo';
                $rootScope.instructionHeader = $scope.hcv;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'trop'){
                $rootScope.instructionHeaderImage = 'trop_logo';
                $rootScope.instructionHeader = $scope.troponin;
                $rootScope.connectDeviceName = 'Optical Reader';
            }
            if($rootScope.currentIvtTest == 'syph'){
                $rootScope.instructionHeaderImage = 'syph_logo';
                $rootScope.instructionHeader = $scope.syphilis;
                $rootScope.connectDeviceName = 'Optical Reader';
            }

            if($rootScope.connectDeviceName == "Optical Reader"){
               $("#optical_reader_instructions_circle1_place_frames").hide();
               $("#optical_reader_instructions_circle1_place_frames_png").show();
               $("#optical_reader_instructions_circle2_place_frames").hide();
               $("#optical_reader_instructions_circle2_place_frames_png").show(); 
               $("#optical_reader_instructions_circle3_place_frames").hide(); 
               $("#optical_reader_instructions_circle3_place_frames_png").show();
               setTimeout(function(){
                   $("#optical_reader_instructions_circle1_place_frames_png").hide();
                   $("#optical_reader_instructions_circle1_place_frames").show(); 
               }, 1 * 1000);
               setTimeout(function(){
                   $("#optical_reader_instructions_circle2_place_frames_png").hide();
                   $("#optical_reader_instructions_circle2_place_frames").show(); 
               }, 6 * 1000);
               setTimeout(function(){
                   $("#optical_reader_instructions_circle3_place_frames_png").hide();
                   $("#optical_reader_instructions_circle3_place_frames").show(); 
               }, 14 * 1000);
            } else if($rootScope.connectDeviceName == 'Lipid Care'){
                
            }
        }
    }

    $scope.ivtManualEntry = function(currentIvtTest){
        $rootScope.invasiveStartTestButtonSelect = false;
        if(currentIvtTest == "heamo"){
            $rootScope.heamoData();
            $rootScope.loadModal({id: 'heamoDataEntry'});
        } else if(currentIvtTest == "glc"){
            $rootScope.glcData();
            $rootScope.loadModal({id: 'glcDataEntry'});
        }else if(currentIvtTest == "lip"){
            $rootScope.lipData();
            $rootScope.loadModal({id: 'lipDataEntry'});
        }else if(currentIvtTest == "urn"){
            $rootScope.urnData();
            $rootScope.loadModal({id: 'urnDataEntry'});
        }else{
            $rootScope.ivtTwoParaData();
            $rootScope.loadModal({id: 'ivtTwoParaDataEntry'});          
        }
    }
	
	$scope.selectedGlcItem = function(item){
        console.log(item);
        $rootScope.glcCustomOption = item.id;
        // document.getElementById('invasive_glc_slc_container').id = 'invasive_glc_slc_container_active';
        $scope.showGlcSelectOpt = false;
        $scope.reselectGlcTypeBack = true;
        $scope.nextVisible = true;
    }

    $scope.reselectGlcType = function(){
        $rootScope.glcCustomOption = '';
        // document.getElementById('invasive_glc_slc_container_active').id = 'invasive_glc_slc_container';
        $scope.showGlcSelectOpt = true;
        $scope.reselectGlcTypeBack = false;
        $scope.nextVisible = false;
    }


    $scope.skipTestClick = function(){
        
        if($scope.mode == "bpw"){
            $timeout(function(){
                if($rootScope.selectedIvtListArray.length == 1){
                    var links = HigiKioskFlow.slideLinks('HigiKioskInvasiveResultController', $scope.mode);
                    window.location = links.next.link;
                }else {
                    var mode = "bpw";
                    var currenttest = "ivt";
                    var nextTestPath = HigiKioskFlow.nextTest(mode,currenttest);
                    console.log(nextTestPath);
                    window.location = nextTestPath;
                    $rootScope.selectedIvtListArray.splice(0, 1);
                    $scope.init();
                }
            },0,false);
        } else if($rootScope.selectedVital.length > 1 && $rootScope.selectedIvtListArray.length == 1){
            var nextTestPath = HigiKioskFlow.UserSelectNextTest();
            $scope.nextSlide = nextTestPath;
            $timeout(function(){
                window.location =  $scope.nextSlide;
            },500);         
        } else if($rootScope.selectedVital.length <= 1 || $rootScope.selectedIvtListArray.length > 1){
            if($rootScope.selectedIvtListArray.length == 1){
                window.location = "#/finish/forward";    
            }else{
                $timeout(function(){
                    window.location = '#/invasiveInstruction/forward';
                    $rootScope.selectedIvtListArray.splice(0, 1);
                    $scope.init();
                },0,false);
            }
        } else{
            console.log("End");
            window.location = "#/finish/forward";
        }
    }

    $scope.startInvasiveTestButton = function(){
        $rootScope.invasiveStartTestButtonSelect = true;
        // let serverCmd = HigiKioskUtilitiesService.getCmd($rootScope.currentIvtTest);
        // console.log(serverCmd);
        // if(serverCmd != ''){
            // $scope.socket.send(serverCmd);
            window.location =  $scope.nextSlide;
        // }
        
    }

    $scope.init();

}]);
