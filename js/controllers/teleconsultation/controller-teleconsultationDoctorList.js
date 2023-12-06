
higiKioskControllers.controller('teleconsultationDoctorListController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', 'fireStore', 'HigiKioskUtilitiesService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, fireStore, HigiKioskUtilitiesService) {

    $scope.currentSelectedTab = '';
    $scope.consultationDoctorList = [];
    $scope.prevIsVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $scope.containerMessage = 'Please wait. Data is being loaded';
    $scope.shwMsg = true;
    $scope.langObjUndefined = false;
    $scope.showDoctorFilter = false;
    $scope.showClearBtn = false;
    $scope.showNoDoctorAvailable = false;
    $scope.showFilterBtn = false;
    $scope.selected_speciality = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality']

    $scope.doctorStatusMapping = {};
    $scope.onlineDoctorList = [];
    $scope.appoloConsultationDoctorList = [];
    $scope.copyConsultationDoctorList = [];
    $scope.copyOnlineDoctorList = [];
    $scope.filterDoctorArr = [];
    $scope.todayAppointmentArr = [];
    $scope.enableStartCallButton = '';
    $scope.init = function () {
        $scope.nextVisible = false;
        $timeout(function () {
            $scope.prevIsVisible = true;
        }, 600);
        // HigiApiService.getTeleConsultData("ihl_user_id",
        //     function (resp) {
        //         console.log(resp);
        //         if (typeof (resp) === "object") {
        //             $rootScope.teleconsultationData = resp;
        //             $scope.initSuccess();
        //         }
        //         else {
        //             $scope.initError();
        //         }
        //     }
        // );
        $scope.initSuccess();

        $scope.$on("$destroy", function () {
            // TODO: Shift this to another functions
            if ($rootScope.Crossbar != undefined) {
                $rootScope.Crossbar.unSubscribeToChannel('ihl_update_doctor_status_channel');
            }

        });

        $scope.searchFields = [
            { id: "search-doctor", placeholder: HigiKioskUtilitiesService.getPlaceholder('welcomeModals.searchDoctorByName'), defaultText: "", text: "", type: 'text', visible: true, selectedClass: '', callback: function () { $scope.validateSearch(this) }, focus: function () { $rootScope.focusField(this) }, usesPlaceholder: true },
        ];
    }

    $scope.initError = function () {
        $scope.containerMessage = 'Error loading data';
    }

    $scope.initSuccess = function () {
        $scope.containerMessage = '';
        $scope.shwMsg = false;
        $scope.optionSelectedByUser = $rootScope.teleconsultationUserSelectedData;
        if ($rootScope.teleConsultDashboardOption == 'Start Call Now') {
            $scope.doctolistButtonText = 'Start Call';
        } else {
            $scope.doctolistButtonText = 'Book Now';
        }
        //execution of member service if condition
        // let selectedTeleconsultationTypeTab = 'Health Consultation' || $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];
        let selectedTeleconsultationTypeTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];
        // let selectedTeleconsultationSpecialityTab =  'Diet Consultation' || $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'];
        let selectedTeleconsultationSpecialityTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'];

        let _consultationType = $rootScope.teleconsultationData['consult_type'].find(item => {
            // let _consultationType = api_response_obj['consultation_platfrom_data']['consult_type'].find(item => {
            return item['consultation_type_name'] === selectedTeleconsultationTypeTab;
        });
        let _consultationSpeciality = '';
        if ($rootScope.teleconsultationNewFlow) {
            _consultationSpeciality = $rootScope.consultationSpecialitiesNewFlowArr.find(item => {
                return item['specality_name'] == selectedTeleconsultationSpecialityTab;
            });
        }
        /* uncomment for 4 pillar category starts here
        else if($rootScope.selectedTeleconsultationService == "Member Service"){
            let arrList = {
                'consultant_list' : $rootScope.affConsultantListWithCategory
            }
            _consultationSpeciality = arrList;
        }
        uncomment for 4 pillar category ends here */
        else {
            _consultationSpeciality = _consultationType['specality'].find(item => {
                return item['specality_name'] == selectedTeleconsultationSpecialityTab;
            });
        }

        $timeout(function () {
            $scope.prevIsVisible = true;
        }, 600);

        _consultationSpeciality['consultant_list'].map(consultant => {
            if (consultant.affilation_excusive_data != null) {
                if (consultant.affilation_excusive_data.affilation_array != null) {
                    if (consultant.affilation_excusive_data.affilation_array.length != 0) {
                        consultant.availableAffiliationList = [];
                        consultant.affilation_excusive_data.affilation_array.map(affiliation => {
                            consultant.availableAffiliationList.push(affiliation.affilation_unique_name);
                        });
                    } else {
                        consultant.availableAffiliationList = [];
                    }
                } else {
                    consultant.availableAffiliationList = [];
                }
            } else {
                consultant.availableAffiliationList = [];
            }
        });
        console.log($rootScope.currentSelectedTab);
        // console.log(getSettingsValue('superAdminConsultantId'));
        console.log(_consultationSpeciality['consultant_list']);
        _consultationSpeciality['consultant_list'] = _consultationSpeciality['consultant_list'].filter(consultList => {
            if (consultList.ihl_consultant_id != "b82fd0384bba473086aaae70a7222a17" && consultList.ihl_consultant_id != "b82fd0384bba473086aaae70a7222a55") {
                if ($rootScope.currentSelectedTab == 'Global Service') {
                    if (consultList.exclusive_only != true) {
                        return consultList;
                    }
                } else {
                    return consultList;
                }
            }
        });
        // _consultationSpeciality['consultant_list'] = _consultationSpeciality['consultant_list'].filter(consultList => {
        //     for (let i=0; i < getSettingsValue('superAdminConsultantId').length; i++) {
        //         console.log(getSettingsValue('superAdminConsultantId')[i]);
        //         if(consultList.ihl_consultant_id != getSettingsValue('superAdminConsultantId')[i]) {
        //             if($rootScope.currentSelectedTab == 'Global Service') {
        //                 if(consultList.exclusive_only != true) {
        //                     return consultList;
        //                 }
        //             } else {
        //                 return consultList;
        //             }
        //         }
        //     }
        // });

        console.log(_consultationSpeciality['consultant_list']);

        if ($rootScope.selectedAffiliation != null) {
            _consultationSpeciality['consultant_list'] = _consultationSpeciality['consultant_list'].filter(consultant => {
                if (consultant.availableAffiliationList.includes($rootScope.selectedAffiliation.affilate_unique_name)) {
                    console.log($rootScope.selectedAffiliation.affilate_unique_name);
                    return consultant;
                }
            });

            if (_consultationSpeciality['consultant_list'].length > 0) {

                let retriveOnlySelectedAfilliation = _consultationSpeciality['consultant_list'].map((element, index, arr) => {

                    let removeNonMatchAffiliates = element.affilation_excusive_data.affilation_array.filter(obj => {
                        return obj.affilation_unique_name == $rootScope.selectedAffiliation.affilate_unique_name;
                    });
                    element.affilation_excusive_data.affilation_array = removeNonMatchAffiliates;

                    return element;
                });
                //console.log(retriveOnlySelectedAfilliation);

                _consultationSpeciality['consultant_list'] = retriveOnlySelectedAfilliation;
            }
        }

        console.log(_consultationSpeciality['consultant_list'])

        if ($scope.optionSelectedByUser['tele-consultation-selected-dashboard'] == "Book Appointment" && $scope.optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation") {
            if (_consultationSpeciality['consultant_list'].length > 0) {
                $scope.consultationDoctorList = _consultationSpeciality['consultant_list'].filter(obj => {
                    return obj.vendor_id != 'APOLLO';
                });
                if ($scope.consultationDoctorList.length > 0) {
                    if (typeof ($scope.consultationDoctorList[0]['languages_Spoken']) == 'undefined') { $scope.langObjUndefined = true; }
                    //console.log($scope.consultationDoctorList);
                }
            }
        } else if ($scope.optionSelectedByUser['tele-consultation-selected-dashboard'] == "Start Call Now" && $scope.optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation") {
            if (_consultationSpeciality['consultant_list'].length > 0) {
                $scope.consultationDoctorList = _consultationSpeciality['consultant_list'].filter(obj => {
                    //return obj.vendor_id != 'APOLLO' && obj.vendor_id != 'GENIX';
                    return obj.vendor_id != 'APOLLO';
                });

                $scope.appoloConsultationDoctorList = _consultationSpeciality['consultant_list'].filter(obj => {
                    return obj.vendor_id == 'APOLLO';
                });

                $scope.appoloConsultationDoctorList = $scope.appoloConsultationDoctorList.map(obj => {
                    if ('languages_Spoken' in obj) {
                        return obj;
                    } else {
                        return Object.assign(obj, { languages_Spoken: ['English'] });
                    }
                });

                if ($scope.consultationDoctorList.length > 0) {
                    if (typeof ($scope.consultationDoctorList[0]['languages_Spoken']) == 'undefined') { $scope.langObjUndefined = true; }
                    //console.log($scope.consultationDoctorList);
                }

                if ($scope.consultationDoctorList.length == 0) {
                    $scope.onlineDoctorList = $scope.appoloConsultationDoctorList;
                }
            }
        } else {
            if ($rootScope.teleconsultationNewFlow) {
                $scope.consultationDoctorList = _consultationSpeciality['consultant_list'];
            }
            /* uncomment for 4 pillar category starts here
            else if($rootScope.selectedTeleconsultationService == "Member Service"){
                let filteredCategoryArrList = [];
                console.log("$scope.consultationDoctorList : ",$scope.consultationDoctorList);
                _consultationSpeciality['consultant_list'].forEach(element => {
                    if(element['affilation_excusive_data'] && element['affilation_excusive_data'].affilation_array.length != 0 
                    && element['category'] && element['category'] != '' && element['category'] != null){
                        console.log(element)
                        filteredCategoryArrList.push(element)
                        if(element['category'] == $rootScope.selectedCategory){
                            console.log(element);
                            $scope.consultationDoctorList.push(element);
                        }
                    } 
                });
                console.log("filteredCategoryArrList : ",filteredCategoryArrList);
                console.log("$scope.selected_speciality : ",$scope.selected_speciality);
                // if($scope.selected_speciality == ""){
                //     //check with data 
                //     $scope.selected_speciality = ""
                // }
                if($rootScope.selectedCategory != ''){
                    console.log($rootScope.selectedCategory);
                    $scope.selected_speciality = $rootScope.selectedCategory
                }
            }
            uncomment for 4 pillar category ends here */
            if ($scope.consultationDoctorList[0] != undefined) {
                if (typeof ($scope.consultationDoctorList[0]['languages_Spoken']) === 'undefined') { $scope.langObjUndefined = true; }
            }

            console.log($scope.consultationDoctorList);
        }
        /*if( 'tele-consultation-selected-doctor' in $rootScope.teleconsultationUserSelectedData
            && $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] != ''){
            $scope.currentSelectedTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'];
            //$timeout(function(){
                $scope.nextVisible = true;
            //},600);
        }
        else{
            $scope.currentSelectedTab = '';
        }*/
        $scope.currentSelectedTab = '';
        $timeout(function () {
            /*// $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'iscroll_scrollbar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'tele_consultation_doctor_list_scroll_bar', vScroll : true, vScrollbar:true});
            // $scope.scroll = new iScroll('tele_consultation_doctor_main_container_', {vScroll:true});
            console.log($scope.scroll);
            // $scope.scroll.scrollTo(0, 0, 1000, false);
            // $timeout(function(){ $scope.scroll.refresh();},100);
            // setInterval(function(){$scope.scroll.refresh();},100);*/
            $scope.scroll = new FTScroller(document.getElementById('tele_consultation_doctor_main_container'), { scrollingX: false });
        }, 100);

        $scope.initiateDoctorStatus();
        // $rootScope.refreshIScroll("tele_consultation_doctor_list_scroll");

        //get consultant profile image
        if ($scope.consultationDoctorList.length != 0) $scope.getConsultantsProfileImages($scope.consultationDoctorList);

        if (($rootScope.teleConsultDashboardOption == 'Start Call Now' || $rootScope.teleconsultationNewFlow) && $scope.onlineDoctorList.length != 0)
            $scope.showFilterBtn = true;
        if (($rootScope.teleConsultDashboardOption != 'Start Call Now' || $rootScope.teleconsultationNewFlow) && $scope.consultationDoctorList.length != 0)
            $scope.showFilterBtn = true;
    }

    //get consultant profile images - API call
    $scope.getConsultantsProfileImages = function () {
        let ihlConsultants = $scope.consultationDoctorList.filter(obj => obj.vendor_id.toLowerCase() === 'ihl').map(obj => obj.ihl_consultant_id);
        let genixConsultants = $scope.consultationDoctorList.filter(obj => obj.vendor_id.toLowerCase() === 'genix').map(obj => obj.vendor_consultant_id);

        let jsonData = { consultantIdList: ihlConsultants, vendorIdList: genixConsultants };
        //console.log(jsonData);

        //calling func where API implemented
        $scope.CallgetConsultantProfileImageApi(jsonData);
    }

    $scope.CallgetConsultantProfileImageApi = function (jsonData) {
        HigiApiService.getConsultantsProfilePicList(jsonData, function (res) {

            let objIhlList = [], objGenixList = [], imageList = [];
            objIhlList = res.ihlbase64list.filter(obj => {
                return obj.base_64.trim().length > 0;
            });

            objGenixList = res.genixbase64list.filter(obj => {
                return obj.base_64.trim().length > 0;
            });

            imageList = [...objIhlList, ...objGenixList];

            $scope.consultationDoctorList.map(doctor => {
                imageList.map(imageObj => {
                    if (doctor.vendor_id.toLowerCase() === 'ihl') {
                        if (imageObj.consultant_ihl_id === doctor.ihl_consultant_id) doctor['consultantProfileImage'] = imageObj.base_64;
                    } else if (doctor.vendor_id.toLowerCase() === 'genix') {
                        if (imageObj.consultant_ihl_id === doctor.vendor_consultant_id) doctor['consultantProfileImage'] = imageObj.base_64;
                    } else {
                        doctor['consultantProfileImage'] = '';
                    }
                });
            });
            //console.log(res);console.log(imageList);
        });
    }

    $scope.formatDate = function (param_date_obj) {
        let year = param_date_obj.getFullYear();
        let month = (param_date_obj.getMonth() + 1 < 10) ? "0" + (param_date_obj.getMonth() + 1) : (param_date_obj.getMonth() + 1);
        let date = (param_date_obj.getDate() < 10) ? "0" + (param_date_obj.getDate()) : param_date_obj.getDate();
        let formatted_date = year + "-" + month + "-" + date;
        // let formatted_date = month + "/" + date + "/" + year;
        return formatted_date
    }

    $scope.selectTeleconsultationDoctorTab = function (tab_name, callFlow) {
        $rootScope.teleConsultDashboardOption = callFlow;
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] = callFlow;
        if ($scope.currentSelectedTab == tab_name) {
            $scope.currentSelectedTab = '';
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = '';
            $scope.nextVisible = false;
            return;
        }

        if ($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-dashboard'] === "Start Call Now") {
            let doctor_id = tab_name;
            $("#doctorAvailabilityCheck").show();
            let startIndex = 1;
            let endIndex = 10;
            $scope.getDoctorAvailability(doctor_id, startIndex, endIndex);
            /*
            HigiApiService.getDoctorAppointmentDetails(doctor_id,function (resp) {
                //var res = JSON.parse(resp.replace(/&quot;/g,'"'));
                var res = JSON.parse(resp.json.replaceAll("\\\\\\&quot;",'').replaceAll("\\&quot;",'"').replaceAll("&quot;",''));
                //console.log(res);

                let appointmentArray = [];
                let getTodayDate = new Date();
                let todayDate = $scope.formatDate(getTodayDate)
                let todayDate2 = new Date();
                let loopRepeat = false;
                $scope.todayAppointmentArr = [];    
                // for (var key in res) {
                //     //appointmentArray.push(JSON.parse(res[key]));
                //     appointmentArray.push(res[key]);
                // }

                res.forEach(function(val, key) {
                    //appointmentArray.push(JSON.parse(res[key]));
            
                    // CHECK TODAY APPOINTMENT 
                    let appointmentDateTime = val['Book_Apointment']['appointment_start_time'];
            
                    if (appointmentDateTime.includes(todayDate))
                      appointmentArray.push(val);
            
                    if (appointmentDateTime.includes(todayDate) && key == 9)
                      loopRepeat = true;
                });


                $scope.todayAppointmentArr = $scope.todayAppointmentArr.concat(appointmentArray);
                appointmentArray = $scope.todayAppointmentArr;
                appointmentArray = appointmentArray.map(item=>{return item['Book_Apointment'];})
                // if (appointmentArray.length !== 0) {
                if($scope.todayAppointmentArr.length != 0 && !loopRepeat){
                    appointmentArray = appointmentArray.filter(item=>{
                        if(item.call_status == null || item.call_status == undefined) item['call_status'] = 'requested';
                        if(item.call_status.toLowerCase() == 'completed') return false;
                        if(item.appointment_status == undefined || item.appointment_status == null) return false;
                        if(item.appointment_status.toLowerCase() == 'approved'){
                            return true;
                        }
                        return false;
                    });
    
                    let can_make_call = true;
                    const TIME_INTERVAL = 15*60*1000;
                    let _len = appointmentArray.length;
                    let now_time = (new Date()).getTime();
    
                    for(let i=0; i<_len; ++i){
                        let end_date = (new Date(appointmentArray[i].appointment_end_time)).getTime();
                        if(end_date <= now_time) continue;
                        let start_date = (new Date(appointmentArray[i].appointment_start_time)).getTime();
                        if(start_date <= now_time){
                            can_make_call = false;
                            break;
                        }
                        if(start_date >= now_time && (start_date-now_time) < TIME_INTERVAL){
                            can_make_call = false;
                            break;
                        }
                        if(appointmentArray[i].call_status != undefined && appointmentArray[i].call_status.toLowerCase() == 'on_going'){
                            //console.log('Ongoing' , appointmentArray[i]);
                            can_make_call = false;
                            break;
                        }
                    }
                    
                    if(can_make_call == false){
                        $scope.currentSelectedTab = '';
                        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = '';
                        $scope.nextVisible = false;
                        $rootScope.checkingAvailabilitiyWait = "global.sorry";
                        $rootScope.checkingAvailabilitiy = "global.notAvailable";
                        $("#doctorAvailabilityCheck").show();
                        $timeout(function(){
                            $("#doctorAvailabilityCheck").hide();
                            $rootScope.checkingAvailabilitiyWait = "global.plwait";
                            $rootScope.checkingAvailabilitiy = "global.checkDoctorAvail";
                        },5000);
                        return;
                    }
                    if(can_make_call == true){
                        $("#doctorAvailabilityCheck").hide();
                        let selectedDoctor = $scope.consultationDoctorList.find(item=>{
                            return item['ihl_consultant_id'] == tab_name;
                        });
                        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
                        $scope.currentSelectedTab = tab_name;
                        //$scope.nextVisible = true;
                        $scope.nextButtonClick();
                    }
                }else{
                    $("#doctorAvailabilityCheck").hide();
                    let selectedDoctor = $scope.consultationDoctorList.find(item=>{
                        return item['ihl_consultant_id'] == tab_name;
                    });
                    $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
                    $scope.currentSelectedTab = tab_name;
                    //$timeout(function(){
                        //$scope.nextVisible = true;
                    //},600);
                    // $scope.callDoctorSelected();
                    $scope.nextButtonClick(); 
                }
            });
            */
        } else {
            let selectedDoctor = $scope.consultationDoctorList.find(item => {
                return item['ihl_consultant_id'] == tab_name;
            });
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
            $scope.currentSelectedTab = tab_name;
            //$timeout(function(){
            //$scope.nextVisible = true;
            //},600);
            // $scope.callDoctorSelected();
            $scope.nextButtonClick();
        }
    }

    $scope.getDoctorAvailability = function (doctor_id, startIndex, endIndex) {
        let success = function (resp) {
            var res = JSON.parse(resp.json.replaceAll("\\\\\\&quot;", '').replaceAll("\\&quot;", '"').replaceAll("&quot;", ''));
            let appointmentArray = [];
            let getTodayDate = new Date();
            let todayDate = $scope.formatDate(getTodayDate);
            let loopRepeat = false;
            $scope.todayAppointmentArr = [];
            res.forEach(function (val, key) {

                /*CHECK TODAY APPOINTMENT */
                let appointmentDateTime = val['Book_Apointment']['appointment_start_time'];

                if (appointmentDateTime.includes(todayDate))
                    appointmentArray.push(val);

                if (appointmentDateTime.includes(todayDate) && key == 9)
                    loopRepeat = true;
            });

            $scope.todayAppointmentArr = $scope.todayAppointmentArr.concat(appointmentArray);
            appointmentArray = $scope.todayAppointmentArr;
            if ($scope.todayAppointmentArr.length != 0 && !loopRepeat) {
                appointmentArray = appointmentArray.map(item => { return item['Book_Apointment']; })

                appointmentArray = appointmentArray.filter(item => {
                    if (item.call_status == null || item.call_status == undefined) item['call_status'] = 'requested';
                    if (item.call_status.toLowerCase() == 'completed') return false;
                    if (item.appointment_status == undefined || item.appointment_status == null) return false;
                    if (item.appointment_status.toLowerCase() == 'approved') {
                        return true;
                    }
                    return false;
                });

                let can_make_call = true;
                const TIME_INTERVAL = 15 * 60 * 1000;
                let _len = appointmentArray.length;
                let now_time = (new Date()).getTime();

                for (let i = 0; i < _len; ++i) {
                    let end_date = (new Date(appointmentArray[i].appointment_end_time)).getTime();
                    if (end_date <= now_time) continue;
                    let start_date = (new Date(appointmentArray[i].appointment_start_time)).getTime();
                    if (start_date <= now_time) {
                        can_make_call = false;
                        break;
                    }
                    if (start_date >= now_time && (start_date - now_time) < TIME_INTERVAL) {
                        can_make_call = false;
                        break;
                    }
                    if (appointmentArray[i].call_status != undefined && appointmentArray[i].call_status.toLowerCase() == 'on_going') {
                        //console.log('Ongoing' , appointmentArray[i]);
                        can_make_call = false;
                        break;
                    }
                }

                if (can_make_call == false) {
                    $scope.currentSelectedTab = '';
                    $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = '';
                    $scope.nextVisible = false;
                    $rootScope.checkingAvailabilitiyWait = "global.sorry";
                    $rootScope.checkingAvailabilitiy = "global.notAvailable";
                    $("#doctorAvailabilityCheck").show();
                    $timeout(function () {
                        $("#doctorAvailabilityCheck").hide();
                        $rootScope.checkingAvailabilitiyWait = "global.plwait";
                        $rootScope.checkingAvailabilitiy = "global.checkDoctorAvail";
                    }, 5000);
                    return;
                }
                if (can_make_call == true) {
                    $("#doctorAvailabilityCheck").hide();
                    let selectedDoctor = $scope.consultationDoctorList.find(item => {
                        return item['ihl_consultant_id'] == doctor_id;
                    });
                    $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
                    $scope.currentSelectedTab = doctor_id;
                    //$scope.nextVisible = true;
                    $scope.nextButtonClick();
                }
            } else {
                if (startIndex == 1) {
                    $("#doctorAvailabilityCheck").hide();
                    let selectedDoctor = $scope.consultationDoctorList.find(item => {
                        return item['ihl_consultant_id'] == doctor_id;
                    });
                    $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
                    $scope.currentSelectedTab = doctor_id;
                    $scope.nextButtonClick();
                } else {
                    startIndex = startIndex + 10;
                    endIndex = endIndex + 10;
                    $scope.getDoctorAvailability(doctor_id, startIndex, endIndex)
                }
            }
        }

        let error = function (resp) {
            // console.log(resp)
        }
        HigiApiService.getDoctorAppointmentDetails(doctor_id, startIndex, endIndex, success, error);
    }

    $scope.appoloTeleconsultationStartCall = function (selectedAppoloDoctor) {
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = '';

        let selectedDoctor = $scope.appoloConsultationDoctorList.find(item => {
            return item['ihl_consultant_id'] == selectedAppoloDoctor['ihl_consultant_id'];
        });

        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = selectedDoctor;
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['vendor_name'] = 'APOLLO';
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']['consultant_speciality'] = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'];
        $(".keyboard_class_close_btn").hide();
        $rootScope.loadModal({ id: 'reasonForVisit' });

        //console.log($rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor']);
    }


    $scope.getStars = function (doctorObj) {
        let a = [0, 0, 0, 0, 0];
        if ('ratings' in doctorObj) {
            let ratings = doctorObj['ratings'];
            if (ratings[0] == '.') ratings = "0" + ratings;
            let stars_cnt = parseInt(doctorObj['ratings']);
            let i = 0;
            for (i = 0; i < stars_cnt; i++) {
                //a.push(i);
                a[i] = 1;
            }
            let is_partial_star = parseFloat(ratings) - stars_cnt;
            if (is_partial_star > 0) a[i] = 0.5;
            return a;
        }
        return a;
    }
    /* $scope.isPartialStar = function(doctorObj){
         if('ratings' in doctorObj){
             let stars_cnt = parseFloat(doctorObj['ratings']) - parseInt(doctorObj['ratings']);
             return stars_cnt > 0;
         }
         return false;
     }*/



    $scope.nextButtonClick = function () {

        if ($rootScope.teleConsultDashboardOption == 'Start Call Now') {
            if ($rootScope.teleConsultationNamespace._isOngoingCall == true) {
                //console.log('Already in call');
                return;
            }
            $(".keyboard_class_close_btn").hide();
            $rootScope.loadModal({ id: 'reasonForVisit' });
        } else {
            $scope.nextVisible = false;
            $scope.prevIsVisible = false;
            $timeout(function () {
                window.location = '#/ihl-teleconsultation-book-appointment';
            }, 500);
        }

        // $rootScope.loadModal({id: 'reasonForVisit'});
    }

    $scope.prevButtonClick = function () {
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        let _consultation_type = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];

        let consulation_type = $rootScope.teleconsultationData['consult_type'].find(item => { return item['consultation_type_name'] == _consultation_type; });
        if (consulation_type != undefined && consulation_type['specality'].length == 1) {
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] = '';
            $timeout(function () {
                window.location = '#/ihl-teleconsultation-type';
            }, 500);
            return;
        }

        /* uncomment for 4 pillar category starts here
        if($rootScope.selectedTeleconsultationService == "Member Service"){
            $timeout(function(){
                console.log("inisde if ms -> naviagting to welcome page with logined user flow")
                window.location = '##/ihl-teleconsultation-memberService';
            },500);
        }
        uncomment for 4 pillar category ends here */
        else {
            $timeout(function () {
                window.location = '#/ihl-teleconsultation-speciality';
            }, 500);
        }
    }

    // $scope.callDoctorSelected = function(){
    //     // $rootScope.loadModal({id: 'reasonForVisit'}); 
    // }

    $scope.updateDoctorStatusChannelSubscription = function (param, sender_id, sender_session_id) {
        if ('status' in param == false) return;
        if (sender_id in $scope.doctorStatusMapping == false) return;
        $scope.doctorStatusMapping[sender_id] = param['status'];
        let selectedDoctor = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'];
        if (selectedDoctor && selectedDoctor.ihl_consultant_id == sender_id && param['status'] != 'Online') {
            this.nextVisible = false;
            $scope.currentSelectedTab = '';
            //$rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = undefined;
        }


        let vendorId = '';
        $scope.consultationDoctorList.forEach(data => {
            if (data['ihl_consultant_id'] == sender_id) {
                vendorId = data.vendor_id;
            }
            console.log("vendorId", vendorId);
        })
        console.log("param['status']", param['status']);
        if (param['status'].toLowerCase() == 'offline' || param['status'].toLowerCase() == 'busy') {
            console.log("Inside param == 'Offline' || param == 'Busy' Condition");
            /* IMPLEMENT NEW API FOR CHECKING DOCTOR NEXT AVAILABILITY */

            HigiApiService.doctorNextAvailabilityNew(sender_id, vendorId, param, function (success) {
                console.log("success", success);
                if (typeof success == "object") {
                    //{  "responce": "no slot found"}
                    if (success.hasOwnProperty('responce')) {
                        if (success['responce'] == "no slot found") {
                            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "No slot Available";
                        } else {
                            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Not Available";
                        }
                    } else if (success.hasOwnProperty('previous_slot')) {
                        console.log("success.hasOwnProperty('previous_slot')", success.hasOwnProperty('previous_slot'));
                        if (success['previous_slot'] == 'NA' && success['next_slot'] == 'NA') {
                            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Not Available";
                        } else if (success['previous_slot'].includes('Today') && success['next_slot'].includes('Today')) {
                            let currentTimestamp = Date.now();
                            const date = new Date();
                            let day = date.getDate();
                            let month = date.getMonth() + 1;
                            let year = date.getFullYear();
                            let todayDate = `${month}-${day}-${year}`;
                            console.log(todayDate);
                            let getPrvSlotStartTime = success['previous_slot'].split(" ");
                            let prvSlotStartDateTime = todayDate + " " + getPrvSlotStartTime[1] + " " + getPrvSlotStartTime[2];
                            console.log("todayDateTime = " + prvSlotStartDateTime);
                            const prvSlotStartTimestamp = new Date(prvSlotStartDateTime).getTime(); //'09/19/2022 12:58 PM';
                            console.log("prvSlotStartTimestamp = " + prvSlotStartTimestamp);
                            const prvSlotEndTimestamp = new Date(prvSlotStartDateTime).getTime() + 30 * 60 * 1000;
                            console.log("prvSlotEndTimestamp = " + prvSlotEndTimestamp);
                            let getNxtSlotStartTime = success['next_slot'].split(" ");
                            let nxtSlotStartDateTime = todayDate + " " + getNxtSlotStartTime[1] + " " + getNxtSlotStartTime[2];
                            const nxtSlotEndTimestamp = new Date(nxtSlotStartDateTime).getTime() + 30 * 60 * 1000;
                            console.log("nxtSlotEndTimestamp = " + nxtSlotEndTimestamp);
                            console.log("doctorStatusMapping", $scope.doctorStatusMapping);
                            if ((prvSlotStartTimestamp < currentTimestamp && prvSlotEndTimestamp >= currentTimestamp) || (nxtSlotEndTimestamp < currentTimestamp)) {                  // yet to be arrive
                                $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Yet to be arrived";
                            } else {
                                $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Available at " + success['next_slot'];
                            }
                        } else {
                            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Available at " + success['next_slot'];
                        }
                    } else {
                        $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Not Available";
                    }
                } else {
                    $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Not Available";
                }
            }, function (error) {
                console.error(err);
            });
        } else if (param['status'].toLowerCase() == 'online') {
            console.log("Inside param == 'Online' Else If Condition");
            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Available Now";
        } else {
            console.log("Inside Else Condition");
            $scope.doctorStatusMapping[sender_id + "consultant_next_availability"] = "Not Available";
        }


        //filter online doctors for start call flow
        if ($rootScope.teleConsultDashboardOption == 'Start Call Now' || $rootScope.teleconsultationNewFlow) {
            let onlineDoctors = [];
            $scope.onlineDoctorList = [];
            onlineDoctors = $scope.consultationDoctorList.filter(obj => {
                if ($scope.doctorStatusMapping[obj.ihl_consultant_id] && $scope.doctorStatusMapping[obj.ihl_consultant_id] == "Online") {
                    return obj;
                }
            });
            //console.log(onlineDoctors);
            if ($scope.optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation") {
                $scope.onlineDoctorList = onlineDoctors.concat($scope.appoloConsultationDoctorList);
            } else {
                $scope.onlineDoctorList = onlineDoctors;
            }

            console.log($scope.onlineDoctorList);

            /*document.querySelectorAll('.tele_consultation_doctor_list_scroll_barV').forEach(function(element) {
                element.remove()
            });*/
            // delete $scope.scroll;

            /*$timeout(function(){ 
                $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'tele_consultation_doctor_list_scroll_bar', vScroll : true, vScrollbar:true}); 
            },1500);*/

            // $timeout(function(){ 
            //     $scope.scroll = new FTScroller(document.getElementById('tele_consultation_doctor_main_container'), {scrollingX: false});
            // },100);   
        }
    }

    $scope.onCrossbarConnectionEstablished = function () {
        //console.log('Connection established');
        // Subcribe to channels here
        let channel_subscription_list = [
            {
                'channel_name': 'ihl_update_doctor_status_channel',
                'subscription_handler': (param, sender_id, sender_session_id) => { $scope.updateDoctorStatusChannelSubscription(param, sender_id, sender_session_id); }
            }
        ];
        // Need to think: Do we need to diconnect from the not required subscription
        // First check if already exist
        channel_subscription_list.forEach(async (item) => {
            let res = $rootScope.Crossbar.updateSubscriptionFunctionHandler(item.channel_name, item.subscription_handler);
            if (res == false) {
                await $rootScope.Crossbar.subscribeToChannels([item]);
            }
        });
    }

    $scope.validateStatusFromApi = function (res) {
        console.log(res);
        let n = res.length;
        for (let i = 0; i < n; i++) {
            try {
                let _api_date = new Date(res[i]['timestamp']);
                let cur_date = new Date();
                if ((cur_date - _api_date) >= (15 * 60 * 1000)) continue;
                let doctor_id = res[i]['consultant_id'];
                // let doctor_obj = this.doctorStatusMappingList.find(item=>{return item.ihl_consultant_id == doctor_id});
                let doctor_obj = $scope.doctorStatusMapping[doctor_id];
                // console.log(doctor_id);

                let vendorId = '';
                $scope.consultationDoctorList.forEach(data => {
                    if (data['ihl_consultant_id'] == doctor_id) {
                        vendorId = data.vendor_id;
                    }
                })

                if (doctor_obj != undefined) {
                    let _status = res[i]['status'];
                    console.log(_status);
                    if (_status == null || _status == undefined) _status = 'Offline';
                    if (_status.toLowerCase() != 'offline' && _status.toLowerCase() != 'online') _status = 'Offline';
                    // doctor_obj.doctor_status = api_res[i]['status'];
                    $scope.doctorStatusMapping[doctor_id] = _status;

                    if (_status.toLowerCase() == 'offline' || _status.toLowerCase() == 'busy') {
                        /* IMPLEMENT NEW API FOR CHECKING DOCTOR NEXT AVAILABILITY */

                        HigiApiService.doctorNextAvailabilityNew(doctor_id, vendorId, _status, function (success) {
                            console.log(success);
                            if (typeof success == "object") {
                                //{  "responce": "no slot found"}
                                if (success.hasOwnProperty('responce')) {
                                    if (success['responce'] == "no slot found") {
                                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "No slot Available";
                                    } else {
                                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Not Available";
                                    }
                                } else if (success.hasOwnProperty('previous_slot')) {
                                    console.log("success.hasOwnProperty('previous_slot')", success.hasOwnProperty('previous_slot'));
                                    if (success['previous_slot'] == 'NA' && success['next_slot'] == 'NA') {
                                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Not Available";
                                    } else if (success['previous_slot'].includes('Today') && success['next_slot'].includes('Today')) {
                                        let currentTimestamp = Date.now();
                                        const date = new Date();
                                        let day = date.getDate();
                                        let month = date.getMonth() + 1;
                                        let year = date.getFullYear();
                                        let todayDate = `${month}-${day}-${year}`;
                                        console.log(todayDate);
                                        let getPrvSlotStartTime = success['previous_slot'].split(" ");
                                        let prvSlotStartDateTime = todayDate + " " + getPrvSlotStartTime[1] + " " + getPrvSlotStartTime[2];
                                        console.log("todayDateTime = " + prvSlotStartDateTime);
                                        const prvSlotStartTimestamp = new Date(prvSlotStartDateTime).getTime(); //'09/19/2022 12:58 PM';
                                        console.log("prvSlotStartTimestamp = " + prvSlotStartTimestamp);
                                        const prvSlotEndTimestamp = new Date(prvSlotStartDateTime).getTime() + 30 * 60 * 1000;
                                        console.log("prvSlotEndTimestamp = " + prvSlotEndTimestamp);
                                        let getNxtSlotStartTime = success['next_slot'].split(" ");
                                        let nxtSlotStartDateTime = todayDate + " " + getNxtSlotStartTime[1] + " " + getNxtSlotStartTime[2];
                                        const nxtSlotEndTimestamp = new Date(nxtSlotStartDateTime).getTime() + 30 * 60 * 1000;
                                        console.log("nxtSlotEndTimestamp = " + nxtSlotEndTimestamp);
                                        console.log("doctorStatusMapping", $scope.doctorStatusMapping);
                                        if ((prvSlotStartTimestamp < currentTimestamp && prvSlotEndTimestamp >= currentTimestamp) || (nxtSlotEndTimestamp < currentTimestamp)) {                  // yet to be arrive
                                            $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Yet to be arrived";
                                        } else {
                                            $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Available at " + success['next_slot'];
                                        }
                                    } else {
                                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Available at " + success['next_slot'];
                                    }
                                } else {
                                    $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Not Available";
                                }
                            } else {
                                $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Not Available";
                            }
                        }, function (error) {
                            console.error(err);
                        });
                    } else if (_status.toLowerCase() == 'online') {
                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Available Now";
                    } else {
                        $scope.doctorStatusMapping[doctor_id + "consultant_next_availability"] = "Not Available";
                    }
                }

            }
            catch (err) {
                //console.log(err);
                continue;
            }
        }

        //filter online doctors for start call flow
        if ($rootScope.teleConsultDashboardOption == 'Start Call Now' || $rootScope.teleconsultationNewFlow) {
            let onlineDoctors = [];
            $scope.onlineDoctorList = [];
            onlineDoctors = $scope.consultationDoctorList.filter(obj => {
                if ($scope.doctorStatusMapping[obj.ihl_consultant_id] && $scope.doctorStatusMapping[obj.ihl_consultant_id] == "Online") {
                    $scope.enableStartCallButton = 'call_doctor_active_btn';
                    return obj;
                } else {
                    $scope.enableStartCallButton = '';
                }
            });

            //console.log(onlineDoctors);
            if ($scope.optionSelectedByUser['tele-consultation-selected-type'] == "Medical Consultation") {
                $scope.onlineDoctorList = onlineDoctors.concat($scope.appoloConsultationDoctorList);
                //console.log($scope.onlineDoctorList);
                $scope.copyOnlineDoctorList = $scope.onlineDoctorList;
            } else {
                $scope.onlineDoctorList = onlineDoctors;
                $scope.copyOnlineDoctorList = $scope.onlineDoctorList;
                //console.log($scope.onlineDoctorList);
            }
            /*document.querySelectorAll('.tele_consultation_doctor_list_scroll_barV').forEach(function(element) {
                 element.remove()
             });*/
            //delete $scope.scroll;


            /*$timeout(function(){
                $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'tele_consultation_doctor_list_scroll_bar', vScroll : true, vScrollbar:true}); 
            },1500);*/

            /*$timeout(function(){ 
                $scope.scroll = new FTScroller(document.getElementById('tele_consultation_doctor_main_container'), {scrollingX: false});
            },100);*/
        }

    }

    $scope.getDoctorStatusFromApi = function () {
        $scope.copyConsultationDoctorList = angular.copy($scope.consultationDoctorList);
        let doctor_ids = Object.keys($scope.doctorStatusMapping);
        //console.log(HigiApiService);
        HigiApiService.getDoctorStatus(doctor_ids, function (res) {
            let _res = { 'data': JSON.parse((res).replace(/(&quot\;)/g, "\"")) };
            $scope.validateStatusFromApi(_res['data']);
        }, function (err) {
            //console.error(err);
        });
    }

    $scope.initiateDoctorStatus = () => {
        if ($rootScope.fireStore) {
            if ($scope.consultationDoctorList.length == 0) return;

            $scope.consultationDoctorList.forEach(item => {
                $scope.doctorStatusMapping[item.ihl_consultant_id] = 'Offline';
                $scope.doctorStatusMapping[item.ihl_consultant_id + "consultant_next_availability"] = "Checking Availability";
            });
            $scope.getDoctorStatusFromApi();
            $scope.initiateFireStore();
        } else {
            if ('Crossbar' in $rootScope == false) return;
            if ($rootScope.Crossbar instanceof CrossbarClass == false) return;
            // Prepare Doctor Status Mapping
            if ($scope.consultationDoctorList.length == 0) return;

            $scope.consultationDoctorList.forEach(item => {
                $scope.doctorStatusMapping[item.ihl_consultant_id] = 'Offline';
                $scope.doctorStatusMapping[item.ihl_consultant_id + "consultant_next_availability"] = "Checking Availability";
            });
            $scope.getDoctorStatusFromApi();
            $rootScope.Crossbar.updateUserId($rootScope.user.id);
            $rootScope.Crossbar.on_connection_established = () => { $scope.onCrossbarConnectionEstablished(); }
            if ($rootScope.Crossbar.is_connected == true) {
                // Already Connected
                // Update Handlers and subscribe to needed channels
                $scope.onCrossbarConnectionEstablished();
            } else {
                $rootScope.Crossbar.connect();
            }
        }
    }

    $scope.initiateFireStore = function () {
        fireStore.getAll($rootScope.consultantOnlineCollectionName).onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => {
                const res = doc.data();
                $scope.updateDoctorStatusChannelSubscription(res, res['consultantId'], '');
            });
        });
    }

    $scope.fineTuneConsultantName = function (name) {
        let doctorName = name;

        if (doctorName.search(/&amp;/ig) > -1) {
            doctorName = doctorName.replace(/&amp;/ig, " & ").toLowerCase();
        } else {
            doctorName = doctorName.toLowerCase();
        }

        if (doctorName.length > 27) {
            //return doctorName =  doctorName.slice(0, 28) +"...";          
            return `<span>${doctorName}</span>`;
        } else {
            return doctorName;
        }
    }

    $scope.fineTunedSpeciality = function (name) {
        let specialityName = name;

        if (specialityName.search(/&amp;/ig) > -1) {
            return specialityName = specialityName.replace(/&amp;/ig, " & ").toLowerCase();
        } else {
            return specialityName = specialityName.toLowerCase();
        }
    }

    $scope.fineTunedExperience = function (exp) {
        let experience = exp;
        if (experience == undefined || experience == null || experience.trim().length == 0) {
            return 'N/A';
        } else {
            return experience
        }
    }

    /* DOCTOR FILTER FUNCTIONALITY START */

    $scope.searchDoctor = function () {
        $scope.showNoDoctorAvailable = false;
        let doctorName = $scope.searchFields[0].text.trim().toLowerCase();
        $scope.filterDoctorArr = [];

        if ($rootScope.teleConsultDashboardOption == 'Start Call Now') {
            angular.forEach($scope.copyOnlineDoctorList, function (val) {
                let docName = val['name'].trim().toLowerCase();
                if (docName.includes(doctorName)) {
                    $scope.filterDoctorArr.push(val);
                }
            });
            $scope.onlineDoctorList = $scope.filterDoctorArr;
        } else {
            angular.forEach($scope.copyConsultationDoctorList, function (val) {
                let docName = val['name'].trim().toLowerCase();
                if (docName.includes(doctorName)) {
                    $scope.filterDoctorArr.push(val);
                }
            });
            $scope.consultationDoctorList = $scope.filterDoctorArr;
        }

        if ($scope.filterDoctorArr.length == 0)
            $scope.showNoDoctorAvailable = true;
        $rootScope.keyboardHide();
    }

    $scope.showFilterBox = function () {
        $scope.showDoctorFilter = true;
        $rootScope.keyboardShow();
    }

    $scope.clearSearch = function () {
        $scope.searchFields[0].text = '';
        $scope.showClearBtn = false;
        $scope.showNoDoctorAvailable = false;

        if ($rootScope.teleConsultDashboardOption == 'Start Call Now')
            $scope.onlineDoctorList = $scope.copyOnlineDoctorList;
        else
            $scope.consultationDoctorList = $scope.copyConsultationDoctorList;

        $timeout(function () {
            $scope.showDoctorFilter = false;
        }, 1000);
        $rootScope.keyboardHide();
    }

    $scope.validateSearch = function () {
        $scope.showNoDoctorAvailable = false;
        if ($scope.searchFields[0].text.trim().length != 0) {
            $scope.showClearBtn = true;
        }
        else {
            $scope.showClearBtn = false;
            if ($rootScope.teleConsultDashboardOption == 'Start Call Now')
                $scope.onlineDoctorList = $scope.copyOnlineDoctorList;
            else
                $scope.consultationDoctorList = $scope.copyConsultationDoctorList;
            $rootScope.keyboardHide();
        }
    }

    /* DOCTOR FILTER FUNCTIONALITY END */

    $scope.init();
}]);