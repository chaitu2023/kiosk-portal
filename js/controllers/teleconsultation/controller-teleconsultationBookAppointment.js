
higiKioskControllers.controller('teleconsultationBookAppointmentController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService) {

    $scope.showMsg = true;
    $scope.containerMessage = 'Please wait. Data is being loaded';
    $scope.selectedDoctor = '';
    $scope.selectedDateIndex = '';
    $scope.selectedDate = '';
    $scope.selectedTime = '';
    $scope.selectedDateBtn = '';

    $scope.selectedDoctorTimeSlots = [];

    $scope.doctorRatingsArray = [];
    
    $scope.currentSelectedDoctorTimeSlotsIndex = 0;
    $scope.showTimeSlotsLeftArrow = false;
    $scope.showTimeSlotsRightArrow = false;
    $timeout(function(){
        $scope.prevIsVisible = true;
    },600);
    $scope.nextVisible = false;
    $rootScope.isVisibleLanguageButton = false;
    $scope.init = function () {
        $scope.nextVisible = false;
        let ihl_consultant_id = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'].ihl_consultant_id;
        let vendor_id = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'].vendor_id;
        HigiApiService.getDoctorAvailabilityData(ihl_consultant_id,vendor_id,
            function (resp) {
                console.log(resp);
                if (typeof (resp) === "object") {
                    $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'].consultant_next_30_days_availablity = resp;
                    $scope.initSuccess();
                }
                else {
                    $scope.initError();
                }
            }
        );
    }

    $scope.initError = function () {
        $scope.containerMessage = 'Error loading data';
    }

    $scope.initSuccess = function () {
        $scope.showMsg = false;
        // $scope.selectedDoctor = JSON.parse('{"RMP_ID":"RM2345323","vendor_id":"GENIX","ihl_consultant_id":"34234","name":"Dr Marimuthu","email":"drMarimuthu@gmail.com","contact_number":"9012345678","age":"56","languages_spoken":["english","tamil"],"consultant_speciality":["General","cardiology"],"description":"this is breif description about this doctor Marimuthu .Dr Marimuthu is cardiology speciality in Appolo Hospital","gender":"Male","type":"medical","qualification":"MBBS MS","experience":"13 years","ratings":"4.2","consultant_next_30_days_availablity":[{"today":[]},{"tomorrow":[]},{"18th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"19th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"20th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"21st June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:04 PM"]}]}');
        // let _selectedDoctor = JSON.parse('{"RMP_ID":"RM2345323","vendor_id":"GENIX","ihl_consultant_id":"34234","name":"Dr Marimuthu","email":"drMarimuthu@gmail.com","contact_number":"9012345678","age":"56","languages_spoken":["english","tamil"],"consultant_speciality":["General","cardiology"],"description":"this is breif description about this doctor Marimuthu .Dr Marimuthu is cardiology speciality in Appolo Hospital","gender":"Male","type":"medical","qualification":"MBBS MS","experience":"13 years","ratings":"1","consultant_next_30_days_availablity":[{"today":[]},{"tomorrow":[]},{"18th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"19th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"20th June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:00 PM"]},{"21st June":["9:00 AM","9:30 AM","10:30 AM","12:30 PM","1:00 PM","1:30 PM","2:00 PM","2:20 PM","2:30 PM","3:00 PM","3:30 PM","4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","7:00 PM","8:00 PM","8:15 PM","8:30 PM","9:04 PM"]}]}');
        let _selectedDoctor = $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'];
        console.log(_selectedDoctor['consultant_next_30_days_availablity']);
        $scope.selectedDoctorTimeSlots = $scope.getTimeSlotsArray(_selectedDoctor['consultant_next_30_days_availablity']);
        $scope.showTimeSlotsLeftArrow = false;

        if($scope.selectedDoctorTimeSlots[0] != undefined){
            $scope.bookAppointmentAvaDate = $scope.selectedDoctorTimeSlots[0]['date_title'];            
        } else {
            $scope.bookAppointmentAvaDate = "Availablity slots";
        }

        if($scope.selectedDoctorTimeSlots.length > 1){
            $scope.showTimeSlotsRightArrow = true;
        }
        console.log($scope.selectedDoctorTimeSlots);
        $scope.selectedDoctor = _selectedDoctor;
        $scope.getStars();
        /*$timeout(function(){
            $scope.scroll = new iScroll('book_appointment_ava_slot', {hScroll:false, scrollbarClass:'tele_consultation_book_appointment_slots_scroll_bar', vScroll : true, vScrollbar:true});
            if($scope.scroll['vScrollbarWrapper'] == undefined){
                $timeout(function(){$scope.scroll.refresh()}, 2000);
            }
        },000);*/
        $timeout(function(){ 
            let scroller = new FTScroller(document.getElementById('book_appointment_ava_slot'), {scrollingX: false});
            let profileScroller = new FTScroller(document.querySelector('.book_appointment_doctor_card_inner'), {scrollingX: false});
        },100); 

    }


    $scope.getTimeSlotsArray = function ( availablity_slots) {
        console.log(availablity_slots);
        
        // availablity_slots.map(availablity_slots => {
        //     if ('today' in availablity_slots) {
        //         let curTime = new Date().toLocaleString().split(',')[1];
        //         let curHour = curTime.split(':')[0];
        //         let curMinute = curTime.split(':')[1];
        //         let am_pm = curTime.split(':')[2];
        //         let curMidday = am_pm.split(' ')[1];
        
        //         $scope.day_slots = availablity_slots.today.filter(time_slot => {
        //             let hh_mm = $scope.splitTimeSlot(time_slot);
        //             if (time_slot.split(' ')[1].toUpperCase() === curMidday) {
        //                 if (hh_mm[0] == 12) {
        //                     if (curHour == 12 && hh_mm[1] > curMinute) return true;
        //                     else return false;
        //                 } else {
        //                     if (hh_mm[0] >= curHour) {
        //                         if (hh_mm[0] == curHour && hh_mm[1] > curMinute) return true;
        //                         else if (hh_mm[0] > curHour) return true;
        //                         else return false;
        //                     }
        //                     else return false;
        //                 }
        //             } else if (time_slot.split(' ')[1].toUpperCase() === curMidday) {
        //                 if (hh_mm[0] == 12) {
        //                     if (curHour == 12 && hh_mm[1] > curMinute) return true;
        //                     else return false;
        //                 } else {
        //                     if (hh_mm[0] >= curHour) {
        //                         if (hh_mm[0] == curHour && hh_mm[1] > curMinute) return true;
        //                         else if (hh_mm[0] > curHour) return true;
        //                         else return false;
        //                     }
        //                     else return false;
        //                 }
        //             } else return false;
        //         });
        //         console.log($scope.day_slots);
        //         availablity_slots['today'] = $scope.day_slots;
        //         return availablity_slots;
        //     }
        //     else return availablity_slots;
        // });

        for(let key in availablity_slots){
            if ("today" in availablity_slots[key]) {
              let todayTimings = availablity_slots[key]['today'];
              let availableTime = [];
              if (todayTimings.length > 0) {
                todayTimings.forEach(times => {
                  let todayDate = new Date();
                  let a = new Date();
                  let b = new Date((todayDate.getMonth()+1)+'/'+todayDate.getDate()+'/'+todayDate.getFullYear()+" "+times);
                  if(b.getTime() > a.getTime()){
                    availableTime.push(times);
                  }
                });
              }
              availablity_slots[key]['today'] = availableTime;
              break;
            }
        }

        if(availablity_slots == undefined ) return [];
        let _result = [];
        availablity_slots.forEach(item=>{
            Object.keys(item).forEach(object_key => {
                _result.push({
                    'date_title':object_key,
                    'time_slots': $scope.divideTimeSlotsByDayTime(item[object_key]),
                });
            });
        });
        console.log(_result);
        return _result;
    }

    $scope.splitTimeSlot = function(time_slot) {
        time = time_slot.split(' ')[0];
        hh = time.split(':')[0];
        mm = time.split(':')[1];
        let hh_mm = [parseInt(hh), parseInt(mm)];
        return hh_mm;
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

    $scope.selectAppointmentDate = function(dateIndexValue) {
       $scope.currentSelectedDoctorTimeSlotsIndex = $scope.selectedDoctorTimeSlots.indexOf(dateIndexValue);
       //console.log(dateIndexValue)
       //console.log($scope.currentSelectedDoctorTimeSlotsIndex); 
         if($scope.selectedDateBtn == dateIndexValue['date_title']){
            $scope.selectedDateBtn = '';
            console.log($scope.selectedDateBtn)
            return;
        }
            $scope.selectedDateBtn = dateIndexValue['date_title'];
            console.log($scope.selectedDateBtn)
    }

    $scope.selectedDoctorTimeSlotsMoveRight = function(){
        $scope.currentSelectedDoctorTimeSlotsIndex += 1;
        $scope.bookAppointmentAvaDate = $scope.selectedDoctorTimeSlots[$scope.currentSelectedDoctorTimeSlotsIndex]['date_title'];  
        $scope.updateTimeSlotArrows();
    }
    
    $scope.selectedDoctorTimeSlotsMoveLeft = function(){
        $scope.currentSelectedDoctorTimeSlotsIndex -= 1;
        $scope.bookAppointmentAvaDate = $scope.selectedDoctorTimeSlots[$scope.currentSelectedDoctorTimeSlotsIndex]['date_title'];  
        $scope.updateTimeSlotArrows();
    }

    $scope.updateTimeSlotArrows = function(){
        let len = $scope.selectedDoctorTimeSlots.length;
        if($scope.currentSelectedDoctorTimeSlotsIndex + 1 == len){
            $scope.showTimeSlotsRightArrow = false;
        }else{
            $scope.showTimeSlotsRightArrow = true;
        }

        if($scope.currentSelectedDoctorTimeSlotsIndex - 1 < 0){
            $scope.showTimeSlotsLeftArrow = false;
        }else{
            $scope.showTimeSlotsLeftArrow = true;
        }
    }

    $scope.getStars = function(){
        if('ratings' in $scope.selectedDoctor){
            let ratings = $scope.selectedDoctor['ratings'];
            if(ratings[0] == '.') ratings = "0" + ratings;
            let stars_cnt = parseInt(ratings);
            let a = [0,0,0,0,0];
            let i=0;
            for(i=0; i<stars_cnt; i++){
                a[i] = 1;
            }
            let is_partial_star = parseFloat(ratings) - stars_cnt;
            if(is_partial_star > 0) a[i] = 0.5;
            $scope.doctorRatingsArray = a;
        }
    }
 
    $scope.selectTimeSlot = function (time_slot){
        if($scope.selectedTime == time_slot){
            $scope.selectedDateIndex = '';
            $scope.selectedTime = '';
            $scope.selectedDate = '';
            $rootScope.appmtDate = '';
            $rootScope.appmtTime = '';
            $scope.nextVisible = false;
            return;
        }
        $scope.selectedDateIndex = $scope.currentSelectedDoctorTimeSlotsIndex;
        $scope.selectedDate = $scope.selectedDoctorTimeSlots[$scope.currentSelectedDoctorTimeSlotsIndex]['date_title'];
        $scope.selectedTime = time_slot;
        $rootScope.appmtDate =  $scope.selectedDate;
        $rootScope.appmtTime =  $scope.selectedTime;
        $scope.nextVisible = true;
        
    }

    $scope.prevButtonClick = function(){
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-doctor-list';
        },500);
    }

    $scope.nextButtonClick = function(){
       $(".keyboard_class_close_btn").hide();
        $rootScope.loadModal({id: 'reasonForVisit'});
    }
    $scope.init();


    $scope.slideFrontClick = function () {
        var container = document.getElementById("book_appointment_title_container");
        $scope.sideScroll(container,'right',25,110,10);
    };

    
    $scope.slideBackClick = function () {
        var container = document.getElementById("book_appointment_title_container");;
        $scope.sideScroll(container,'left',15,130,10);
    };

    $scope.sideScroll = function (element,direction,speed,distance,step){
        scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction == 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }

}]);