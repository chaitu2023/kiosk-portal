
higiKioskControllers.controller('teleconsultationTypeController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.currentSelectedTab = '';
    $scope.consultationTypes = [];
    $scope.prevIsVisible = false;
    $scope.nextVisible = false;
    $rootScope.isVisibleLanguageButton = false;
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

    $scope.initSuccess = function (resp) {

        //var validConsultationTypes = ['Medical Consultation', 'Ayurvedic Consultation', 'Diet Consultation'];
        $scope.consultationTypes = $rootScope.teleconsultationData['consult_type'].filter(item => {
            
            //filter health consultation if the vendor id array doesn't includes ihl
            if(!$rootScope.availableVendorList.includes('ihl') && item.consultation_type_name == 'Health Consultation') return false; 

            //filter medical consultation if the vendor id array doesn't includes genix and apollo
            if(!$rootScope.availableVendorList.includes('genix') && !$rootScope.availableVendorList.includes('apollo') && item.consultation_type_name == 'Medical Consultation') return false; 
            
            if (item.consultation_type_name == 'Fitness Class'){
                return false;
            } else {
                return true;
            }
        });
        //console.log($scope.consultationTypes);
        // for (i = 10; i < 30; i++) {
        //     let a = {};
        //     a['consultation_type_name'] = i;
        //     a['consultation_type_image_url'] = i;
        //     $scope.consultationTypes.push(a);
        // }
        if ($scope.consultationTypes.length == 0) {
            $scope.containerMessage = 'No valid data';
            return;
        }
       /* if('tele-consultation-selected-type' in $rootScope.teleconsultationUserSelectedData){
            $scope.currentSelectedTab = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'];
            //$timeout(function(){
                $scope.nextVisible = true;
            //},600);
            
        }*/
        $scope.currentSelectedTab = '';
        $timeout(function(){
            /*$scope.scroll = new iScroll('tele_consultation_doctor_main_container', {hScroll:false, scrollbarClass:'iscroll_scrollbar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_type_main_container', {hScroll:false, scrollbarClass:'tele_consultation_consultation_type_scroll_bar', vScroll : true, vScrollbar:true});
            $scope.scroll = new iScroll('tele_consultation_doctor_main_container_', {vScroll:true});
            console.log($scope.scroll);
            $scope.scroll.scrollTo(0, 0, 1000, false);
            $timeout(function(){ $scope.scroll.refresh();},100);
            setInterval(function(){$scope.scroll.refresh();},100);*/
            let scroller = new FTScroller(document.getElementById('tele_consultation_type_main_container'), {scrollingX: false});
        },100);


    }

    
    $scope.selectTeleconsultationTypeTab = function (tab_name) {
        if ($scope.currentSelectedTab == tab_name) {
            $scope.currentSelectedTab = '';
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = '';
            $scope.nextVisible = false;
            return;
        }
        $scope.currentSelectedTab = tab_name;
        $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = tab_name;
        //console.log($rootScope.teleconsultationUserSelectedData);
        // $timeout(function(){
            $scope.nextVisible = true;
        //},600);
    }

    $scope.nextButtonClick = function () {
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        // If selected consultation has only one speciality, then move to doctor list by selecting that speciality directly
        let consulation_type = $scope.consultationTypes.find(item=>{ return item['consultation_type_name'] == $scope.currentSelectedTab;});
        if(consulation_type != undefined && consulation_type['specality'].length == 1){
            $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-speciality'] = consulation_type['specality'][0]['specality_name'];
            $timeout(function(){
                window.location = '#/ihl-teleconsultation-doctor-list';
            },500); 
            return;
        }
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-speciality';
        },500);  
    }

    $scope.prevButtonClick = function () {
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-dashboard';
        },500);
        
    }

    $scope.init();
}]);