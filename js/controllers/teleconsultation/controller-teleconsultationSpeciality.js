
higiKioskControllers.controller('teleconsultationSpecialityController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.currentSelectedTab = '';
    $scope.consultationSpecialities = [];
    $scope.prevIsVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $rootScope.consultationSpecialitiesNewFlowArr = [];
    $scope.init = function () {
        $scope.nextVisible = false;
        $timeout(function(){
            $scope.prevIsVisible = true;
        },600);
        $scope.initSuccess();
        // HigiApiService.getTeleConsultData("ihl_user_id",
        //     function (resp) {
        //         console.log(resp);
        //         if (typeof (resp) === "object") {
        //             $rootScope.teleconsultationData = resp;
        //             $scope.initSuccess(resp);
        //         }
        //         else {
        //             $scope.initError();
        //         }
        //     });

    }

    $scope.initError = function () {
    }

    $scope.initSuccess = function () {
        $scope.consultationSpecialities = [];
        let optionSelectedByUser = $rootScope.teleconsultationUserSelectedData;
        // let selectedTeleconsultationTypeTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];
        let selectedTeleconsultationTypeTab = '';
        let overAllConsultationData = $rootScope.teleconsultationData;
        let _consultationSpecialities;
        if($rootScope.teleconsultationNewFlow){
            let specalityListArr = [];
            overAllConsultationData['consult_type'].forEach(function (val){
                if(val['consultation_type_name'] != 'Fitness Class'){
                    val['specality'].forEach(function(specalityArr){
                        // if(specalityArr['consultant_list'].length != 0){ 
                            //speciality show even there is no doctor available so commeneted if condition
                            specalityListArr.push(specalityArr);
                        // }
                    })
                }
            })
            _consultationSpecialities = specalityListArr;
            // $scope.consultationSpecialities = specalityListArr;
        }else if ((optionSelectedByUser['tele-consultation-selected-dashboard'] == "Book Appointment" && optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation")) {

           let retrieveAllMedicalConsultationSpecialities = overAllConsultationData['consult_type'].find(item => {
                return item['consultation_type_name'] === "Medical Consultation";
            }); 

           if (retrieveAllMedicalConsultationSpecialities != undefined) {
                retrieveAllMedicalConsultationSpecialities['specality'] = retrieveAllMedicalConsultationSpecialities['specality'].filter(obj => {
                    let isOtherVendorsAvailable = obj['consultant_list'].some(element => {
                        return element.vendor_id != 'APOLLO' && $rootScope.availableVendorList.includes('genix');
                    });

                    if (isOtherVendorsAvailable) {
                        return obj;
                    }
                });
                _consultationSpecialities = retrieveAllMedicalConsultationSpecialities;
            }else{
                return;
            }
        }
        // Comment/Uncomment the below block to show/hide the genix speciality in direct call.
        /*else if (optionSelectedByUser['tele-consultation-selected-dashboard'] == "Start Call Now" && optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation") {

           let retrieveAllMedicalConsultationSpecialities = overAllConsultationData['consult_type'].find(item => {
                return item['consultation_type_name'] === "Medical Consultation";
            }); 

           if (retrieveAllMedicalConsultationSpecialities != undefined) {
                retrieveAllMedicalConsultationSpecialities['specality'] = retrieveAllMedicalConsultationSpecialities['specality'].filter(obj => {
                    let isOtherVendorsAvailable = obj['consultant_list'].some(element => {
                        return element.vendor_id != 'GENIX';
                    });

                    if (isOtherVendorsAvailable) {
                        return obj;
                    }
                });
                _consultationSpecialities = retrieveAllMedicalConsultationSpecialities;
            }else{
                return;
            }
        }*/
        else{
            _consultationSpecialities = overAllConsultationData['consult_type'].find(item => {
                return item['consultation_type_name'] === selectedTeleconsultationTypeTab;
                //return true;
            });

            //filter speciality based on the available vendor list value. Filtering apollo & genix specialities
            if (_consultationSpecialities != undefined) {
                if(_consultationSpecialities['consultation_type_name'] == 'Medical Consultation') {
                    _consultationSpecialities['specality'] = _consultationSpecialities['specality'].filter(obj => {
                        let isOtherVendorsAvailable = obj['consultant_list'].some(element => {
                            if($rootScope.availableVendorList.includes('genix') && $rootScope.availableVendorList.includes('apollo')) {
                                return element;
                            }
                            else if($rootScope.availableVendorList.includes('genix')) return element.vendor_id == 'GENIX';                                                
                            else if($rootScope.availableVendorList.includes('apollo')) return element.vendor_id == 'APOLLO';                            
                        });

                        if (isOtherVendorsAvailable) {
                            return obj;
                        }
                    });
                }
            }else{
                return;
            }            
        }

        if (_consultationSpecialities == undefined && $rootScope.teleconsultationNewFlow == false) {
            return;
        }
        // for (i = 10; i < 30; i++) {
        //     _consultationSpecialities['specality'].push({ 'specality_name': _consultationSpecialities['specality'][0]['specality_name'], 'speciality_image_url': _consultationSpecialities['specality'][0]['speciality_image_url'] });
        // }
        /*if('tele-consultation-selected-speciality' in $rootScope.teleconsultationUserSelectedData
            && $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] != ''){
                $scope.currentSelectedTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'];
                 //$timeout(function(){
                    $scope.nextVisible = true;
                //},600);
        }*/
        $scope.currentSelectedTab = '';
        // $scope.consultationSpecialities = _consultationSpecialities['specality'];
        // console.log("$scope.consultationSpecialities : ",$scope.consultationSpecialities)

        // /* WE HAVE REMOVE THE SPECIALITY, IF SPECIALITY HAVE NO CONSULTANTS */
        // angular.forEach($scope.consultationSpecialities, function(Item, Index) {
        //     if (Item['consultant_list'].length == 0)
        //         $scope.consultationSpecialities.splice(Index, 1);
        // });

        if($rootScope.teleconsultationNewFlow){
            $scope.consultationSpecialities = _consultationSpecialities;
            $rootScope.consultationSpecialitiesNewFlowArr = $scope.consultationSpecialities;
        }else{
            $scope.consultationSpecialities = _consultationSpecialities['specality']; 

            /* WE HAVE REMOVE THE SPECIALITY, IF SPECIALITY HAVE NO CONSULTANTS */
            angular.forEach($scope.consultationSpecialities, function(Item, Index) {
                if (Item['consultant_list'].length == 0)
                    $scope.consultationSpecialities.splice(Index, 1);
            });
        }
        $timeout(function(){
            $scope.prevIsVisible = true;
        },600);

        $timeout(function(){
            /*$scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'iscroll_scrollbar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_speciality_main_container', {hScroll:false, scrollbarClass:'tele_consultation_speciality_type_scroll_bar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_doctor_main_container_', {vScroll:true});
            console.log($scope.scroll);
            $scope.scroll.scrollTo(0, 0, 1000, false);
            $timeout(function(){ $scope.scroll.refresh();},100);
            setInterval(function(){$scope.scroll.refresh();},100);*/
            let scroller = new FTScroller(document.getElementById('tele_consultation_speciality_main_container'), {scrollingX: false});
        },100);


    }

    $scope.selectTeleconsultationSpecialityTab = function (tab_name) {
        $rootScope.selected_speciality = tab_name;
        if ($scope.currentSelectedTab == tab_name) {
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] = '';
            $scope.currentSelectedTab = '';
            $scope.nextVisible = false;
            return;
        }
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] = tab_name;
        $scope.currentSelectedTab = tab_name;

        //$timeout(function(){
            $scope.nextVisible = true;
        //},600);
        //console.log($rootScope.teleconsultationUserSelectedData)
    }

    $scope.nextButtonClick = function () {
        //console.log($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'])
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $timeout(function(){
            if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] === "Fitness Class") {
                //console.log('true')
                window.location = '#/ihl-teleconsultation-class-list';
            }
            else {window.location = '#/ihl-teleconsultation-doctor-list';}
        },500);
    }

    $scope.prevButtonClick = function () {
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        if($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] === 'Fitness Class') {
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-dashboard';
            },500);
        }
        else {
            $timeout(function(){
                // window.location = '#/ihl-teleconsultation-type';
                window.location = '#/ihl-teleconsultation-main-dashboard'; 
            },500);
        }
    }

    $scope.fineTunedSpecialityName = function(name){
        let specilityName = name;
        if (specilityName.search(/&amp;/ig) > -1) {
            return specilityName.replace(/&amp;/ig, " & ").toLowerCase();
        }else{
            return specilityName.toLowerCase();
        }
    }
    $scope.init();
}]);