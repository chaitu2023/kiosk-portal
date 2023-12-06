
higiKioskControllers.controller('teleconsultationClassListController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.currentSelectedTab = '';
    $scope.consultationClassList = [];
    $scope.prevIsVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $rootScope.classIDlist = [];
    $scope.showMsg = true;
    $rootScope.imgLoading = true;
    $scope.containerMessage = 'Please wait. Data is being loaded';
    $rootScope.course_icons = '';

    $scope.init = function () {
        $scope.nextVisible = false;
        $timeout(function(){
            $scope.prevIsVisible = true;
        },600);
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
    }

    $scope.initError = function () {
        $scope.containerMessage = 'Error loading data';
    }

    $scope.initSuccess = function () {
        $scope.showMsg = false;
        $scope.containerMessage = '';
        $scope.doctolistButtonText = 'Subscribe';
        let selectedTeleconsultationTypeTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];
        let selectedTeleconsultationSpecialityTab =  $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'];
        
        let _consultationType = $rootScope.teleconsultationData['consult_type'].find(item => {
            return item['consultation_type_name'] === selectedTeleconsultationTypeTab;
        });

        let _consultationSpeciality = _consultationType['specality'].find(item => {
           
            return item['specality_name'] == selectedTeleconsultationSpecialityTab;  
        });

        $timeout(function(){
            $scope.prevIsVisible = true;
        },600);
        $rootScope.course_icons = _consultationSpeciality['speciality_image_url'];
        $scope.consultationClassList = _consultationSpeciality['courses'];
        $rootScope.classIDlist = $scope.consultationClassList.map(course =>{return course.course_id});
        console.log($rootScope.classIDlist);
        let course_id_obj = {};
        course_id_obj['classIDList'] = $rootScope.classIDlist;
        HigiApiService.getClassImages(course_id_obj, function(imgObj_res){
            console.log(imgObj_res);
            if(Array.isArray(imgObj_res)) {
                if(imgObj_res.length > 0) {
                    imgObj_res.forEach(obj => {
                        let retrivedImg = $scope.consultationClassList.filter(course => course.course_id === obj.course_id);
                        retrivedImg[0].course_img_url = obj.base_64;
                        $rootScope.imgLoading = false;
                    });
                }
            }
        });
        console.log($scope.consultationClassList);
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
        $timeout(function(){
            // $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'iscroll_scrollbar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'tele_consultation_doctor_list_scroll_bar', vScroll : true, vScrollbar:true});
            // $scope.scroll = new iScroll('tele_consultation_doctor_main_container_', {vScroll:true});
            console.log($scope.scroll);
            // $scope.scroll.scrollTo(0, 0, 1000, false);
            // $timeout(function(){ $scope.scroll.refresh();},100);
            // setInterval(function(){$scope.scroll.refresh();},100);
        },1000);
        // $rootScope.refreshIScroll("tele_consultation_doctor_list_scroll");
    }

    $scope.selectTeleconsultationCourseTab = function (tab_name) {
        console.log(tab_name);
        console.log($scope.currentSelectedTab);
        if ($scope.currentSelectedTab == tab_name) {
            $scope.currentSelectedTab = '';
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-course'] = '';
            $scope.nextVisible = false;
            return;
        }
        let selectedCourse = $scope.consultationClassList.find(item=>{
            return item['title'] == tab_name;
        });
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-course'] = selectedCourse;
        $scope.currentSelectedTab = tab_name;
        //$scope.nextVisible = true; 
        $scope.nextButtonClick();        
    }


    $scope.getStars = function(courseObj){
        let a = [0,0,0,0,0];
        if('ratings' in courseObj){
            let ratings = courseObj['ratings'];
            if(ratings[0] == '.') ratings = "0" + ratings;
            let stars_cnt = parseInt(courseObj['ratings']);
            let i=0;
            for(i=0; i<stars_cnt; i++){
                //a.push(i);
                 a[i] = 1;
            }
            let is_partial_star = parseFloat(ratings) - stars_cnt;
            if(is_partial_star > 0) a[i] = 0.5;
            return a;
        }
        return a;
    }


    $scope.nextButtonClick = function () {
        if ($rootScope.teleConsultDashboardOption == 'Fitness Class') {
            $scope.nextVisible = false;
            $scope.prevIsVisible = false;
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-subscribe-class';
            },500);
        }
    }

    $scope.prevButtonClick = function () {
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        let _consultation_type = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];

        let consulation_type = $rootScope.teleconsultationData['consult_type'].find(item=>{ return item['consultation_type_name'] == _consultation_type;});
        if(consulation_type != undefined && consulation_type['specality'].length == 1){
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] = '';
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-type';
            },500);
            return;
        }
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-speciality';
        },500);
    }

    // $scope.callDoctorSelected = function(){
    //     // $rootScope.loadModal({id: 'reasonForVisit'}); 
    // }

    $scope.init();
}]);