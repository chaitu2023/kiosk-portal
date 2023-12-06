higiKioskControllers.controller('teleconsultationSubscribeClassController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.showMsg = true;
    $scope.containerMessage = 'Please wait. Data is being loaded';
    $scope.selectedCourse = '';
    $scope.course_time = '';
    $scope.calendar_obj = {};
    $scope.calendar_obj.minDate = [];
    $scope.calendar_obj.maxDate = [];
    $scope.calendar_obj.course_duration = [];
    $scope.calendar_obj.time_slot = [];
    $scope.calendar_obj.available_days = [];
    $scope.calendar_obj.course_days = [];
    $scope.selectedDate = null;
    $scope.endDate = null;
    $scope.today = new Date();
    $scope.selectedCourseTimeSlots = [];
    $scope.doctorRatingsArray = [];
    $rootScope.course_obj = {};
    $scope.imgLoading = $rootScope.imgLoading;
    $scope.course_icons = $rootScope.course_icons;
    $scope._isDateSelected = false;

    $timeout(function() {
        $scope.prevIsVisible = true;
    }, 600);
    $scope.nextVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $scope.init = function() {
        $scope.nextVisible = false;
        $scope.initSuccess();
    }

    $scope.initError = function() {
        $scope.containerMessage = 'Error loading data';
    }

    $scope.initSuccess = function() {
        let _selectedCourse = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-course'];
        console.log(_selectedCourse);
        //$scope.selectedCourseTimeSlots = _selectedCourse['course_time'];
        $scope.calendar_obj.time_slot = $scope.selectedCourseTimeSlots;
        $scope.calendar_obj.course_duration = _selectedCourse['course_duration'];
        $scope.calendar_obj.course_days = _selectedCourse['course_on'];
        $scope.calendar_obj.subscribe_term = _selectedCourse['course_type']
        $scope.setMinMaxDatesInCalender($scope.calendar_obj.course_duration);
        let date = new Date();
        $scope.disableDays(date);
        console.log($scope.calendar_obj)
        $scope.selectedCourseTimeSlots = $scope.divideTimeSlotsByDayTime(_selectedCourse['course_time']);
        console.log($scope.selectedCourseTimeSlots)

        if ($scope.selectedCourseTimeSlots[0] != undefined) {

        } else {
            $scope.bookAppointmentAvaDate = "Availablity slots";
        }

        $scope.showMsg = false;
        $scope.containerMessage = '';
        $scope.selectedCourse = _selectedCourse;
        $scope.getStars();
        $timeout(function() {
            $scope.scroll = new iScroll('book_appointment_ava_slot', { hScroll: false, scrollbarClass: 'tele_consultation_book_appointment_slots_scroll_bar', vScroll: true, vScrollbar: true });
            if ($scope.scroll['vScrollbarWrapper'] == undefined) {
                $timeout(function() { $scope.scroll.refresh() }, 1000);
            }
        }, 5000);
    }

    $scope.setMinMaxDatesInCalender = function(param) {
        let param_date_obj = param.split(' - ');
        let minDate = param_date_obj[0].split('-');
        let maxDate = param_date_obj[1].split('-');
        let today = $scope.today.toLocaleString();
        let current_date = today.split('/')[1];
        let current_month = today.split('/')[0];
        let current_year = today.split('/')[2].split(',')[0];
        console.log($scope.today);
        if(minDate[1] > parseInt(current_date) && minDate[2] > parseInt(current_month) && minDate[2] > parseInt(current_year)) {
            $scope.calendar_obj.minDate = [parseInt(minDate[2]),parseInt(minDate[1]),parseInt(minDate[0])];
        }
        else {
            $scope.calendar_obj.minDate = [parseInt(current_year), parseInt(current_month), parseInt(current_date)];
        }
        $scope.calendar_obj.maxDate = [parseInt(maxDate[2]),parseInt(maxDate[1]),parseInt(maxDate[0])];
    }

    $scope.selectTimeSlot = function(time_slot) {
        if ($scope.course_time == time_slot) {
            $scope.course_time = '';
            $scope.course_duration = '';
            $scope.nextVisible = false;
            return;
        }
        $scope.course_time = time_slot;
        let start_date = $scope.formatDate($scope.selectedDate);
        let end_date = $scope.formatDate($scope.endDate);
        $scope.course_duration = start_date + " - " + end_date;
        console.log($scope.course_duration);
        console.log($scope.course_time);
        $rootScope.courseDatePeriod = $scope.course_duration;
        $rootScope.timeSelected = $scope.course_time;
        $scope.nextVisible = true;

        $rootScope.course_obj = $scope.selectedCourse;
    }

    $scope.formatDate = function(param_date_obj) {
        let year = param_date_obj.getFullYear();
        let month = (param_date_obj.getMonth() + 1 < 10) ? "0" + (param_date_obj.getMonth() + 1) : (param_date_obj.getMonth() + 1);
        let date = (param_date_obj.getDate() < 10) ? "0" + (param_date_obj.getDate()) : param_date_obj.getDate();
        //let formatted_date = year + "-" + month + "-" + date;
        let formatted_date = month + "/" + date + "/" + year;
        return formatted_date
    }

    $scope.divideTimeSlotsByDayTime = function( day_slots ){
        console.log(day_slots)
        let result = {
            'morning':[], 'afternoon': [], 'evening': [], 'night': [],
        };
        day_slots.forEach(item=>{
            item = item.trim();
            if($scope.isMorningSlot(item) != false){result['morning'].push(item);}
            else if($scope.isAfternoonSlot(item) != false) {result['afternoon'].push(item);}
            else if($scope.isEveningSlot(item) != false) { result['evening'].push(item);}
            else if($scope.isNightSlot(item) != false) {result['night'].push(item);}
        });

        return result;
    }

    $scope.isMorningSlot = function(time_){
        if(time_.includes('AM') || time_.includes('am')) return true;
        return false;
    }
    $scope.isAfternoonSlot = function (time_){
        time_ = time_.split(' ')[0];
        time__ = time_.split(':');
        let hrs = parseInt(time__[0]);
        let mins = parseInt(time__[1]);
        if(hrs == 12 || hrs == 1 || hrs == 2) return true;
        if(hrs == 3 && mins <= 59) return true;
        return false;
    }
    
    $scope.isEveningSlot = function (time_){
        time_ = time_.split(' ')[0];
        time__ = time_.split(':');
        let hrs = parseInt(time__[0]);
        let mins = parseInt(time__[1]);
        if(hrs == 4 || hrs == 5) return true;
        if(hrs == 6 && mins <= 59) return true;
        return false;
    }
    $scope.isNightSlot = function (time_){
        time_ = time_.split(' ')[0];
        time__ = time_.split(':');
        let hrs = parseInt(time__[0]);
        let mins = parseInt(time__[1]);
        if(hrs == 7 || hrs == 8 || hrs == 9 || hrs == 10) return true;
        if(hrs == 11 && mins <= 59) return true;
        return false;
    }

    $scope.calculateEndDate = function(selected_date) {
        $scope.endDate = new Date(selected_date);
        let subscribe_term = $scope.calendar_obj.subscribe_term;
        let term = subscribe_term .split(' ')[1].toLowerCase();
        let duration = parseInt(subscribe_term.split(' ')[0]);
        if(term == 'month' || term == 'months') {
            let count = duration*30;
            $scope.endDate.setDate(selected_date.getDate()+count-1);
        }
        console.log($scope.selectedDate+"\n"+$scope.endDate);
    }

    $scope.getStars = function() {
        if ('ratings' in $scope.selectedCourse) {
            let ratings = $scope.selectedCourse['ratings'];
            if (ratings[0] == '.') ratings = "0" + ratings;
            let stars_cnt = parseInt(ratings);
            let a = [0, 0, 0, 0, 0];
            let i = 0;
            for (i = 0; i < stars_cnt; i++) {
                a[i] = 1;
            }
            let is_partial_star = parseFloat(ratings) - stars_cnt;
            if (is_partial_star > 0) a[i] = 0.5;
            $scope.doctorRatingsArray = a;
        }
    }

    $scope.prevButtonClick = function() {
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        $timeout(function() {
            window.location = '#/ihl-teleconsultation-class-list';
        }, 500);
    }

    $scope.nextButtonClick = function() {
        $rootScope.loadModal({ id: 'reasonForVisit' });
    }

    // $scope.okButtonClick = function() {
    //     if($scope.selectedDate == null) {
    //         window.alert('Please select valid date!');
    //     }
    //     else { 
    //         $scope._isDateSelected = true; 
    //         $scope.calculateEndDate($scope.selectedDate);
    //         console.log($scope.selectedDate+" "+$scope.endDate);
    //     }
    // }

    $scope.changeDateBtnClick = function() {
        $scope._isDateSelected = false;
        $scope.nextVisible = false;
        $scope.course_time = '';
    }

    $timeout(function(){
        $(function() {
        $( "#datepicker" ).datepicker({
            minDate: new Date($scope.calendar_obj.minDate[0],$scope.calendar_obj.minDate[1]-1,$scope.calendar_obj.minDate[2]),
            maxDate: new Date($scope.calendar_obj.maxDate[0],$scope.calendar_obj.maxDate[1]-1,$scope.calendar_obj.maxDate[2]),
            beforeShowDay: function(date) {
                //disable unavailable dates
                if($.inArray(date.getDay(),$scope.calendar_obj.available_days) == -1) {
                    return [false, ''];
                }
                else { return [true, '']}
            },
            onSelect: function() {
                let selected_date = $( "#datepicker" ).datepicker( "getDate" );
                $scope.selectedDate = selected_date;
                console.log($scope.selectedDate);
                $scope._isDateSelected = true; 
                $scope.calculateEndDate(selected_date);
            }
        });
    });
    },0000);

    $scope.disableDays = function(date) {
        date = new Date();
        let days = $scope.calendar_obj.course_days;
        $scope.calendar_obj.available_days = days.map(day => {
            switch(day) {
                case 'Sunday': return 0;
                break;
                case 'Monday': return 1;
                break;
                case 'Tuesday': return 2;
                break;
                case 'Wednesday': return 3;
                break;
                case 'Thursday': return 4;
                break;
                case 'Friday': return 5;
                break;
                case 'Saturday': return 6;
                break;
                default: return; break;
            }
        });
    }

    $scope.init();

}]);