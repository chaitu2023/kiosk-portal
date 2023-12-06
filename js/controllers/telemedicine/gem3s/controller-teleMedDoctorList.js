higiKioskControllers.controller('IHLHPodDoctorListController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', '$interval', '$location', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval, $location){

    
    $scope.consultationIsPublished = false;    
    $rootScope.triggerBeforeStartCall = false;
    $scope.doctorLists = [];
    $scope.doctorDetails = [];
    var doctor_list = null;
    var doctor_details = null;
    //$rootScope.homeButtonShow = true;
    $rootScope.triggeredLiveCallFinal = false;
    $scope.triggeredLiveCall = false;
    $scope.callRangCount  = 0;    
    $rootScope.triggeredDoctorGem3s = false;
    $scope.callStatus = "on_going";
    $("#teleMedLoad").show();    
    $scope.doctorLeftAlreadyTriggered = false;
    var stopTriggerDoctorAvaliableApi;

    $scope.specialistsName  =  HigiKioskStorageService.returnSessionData("specialists_name");

    HigiKioskFlow.setGlobalNav('IHLHPodDoctorListController');

    $scope.init = function(){
        //$("#teleMedLoad").show(); 
        $scope.telemedTitle = "global.telemedi.Title";
        $scope.specialistSubTitle = "global.telemedi.Subtitle";
        $scope.calldoc = "global.telemedi.calldoc";
        $scope.specialistTitle = "doctor.specialist";
        $scope.doctorExperience = "doctor.experience";
        $scope.doctorLanguage = "doctor.language";
        $scope.doctorQualification = "doctor.qualification";
        $scope.callRangCount  = 0;
        $scope.doctorLeftAlreadyTriggered = false;
        $scope.specialists_id = HigiKioskStorageService.returnSessionData("specialists_id");

        var doctorspecial={
          "speciality_id": $scope.specialists_id,
          "gender":"",
          "state":"",
          "postal_code":"",
          "rating":"",
          "available_status":"",
          "list_for":"alldoc"
        };

        console.log(doctorspecial);
        JkioskService.gem3sDoctorBasedSapeciality($scope.gem3sDoctorBasedSapecialityRes,  doctorspecial, HigiKioskStorageService.returnSessionData("telemediAccessToken"));

                        
    };
    //end of init func


    $scope.gem3sDoctorBasedSapecialityRes = function(Res){
        console.log(Res);
        if(Res.status != undefined){
            if(Res.status){
              if(Res.response != undefined){
                  if(Res.response == "internet"){
                    console.log("internet connection not avaliable");
                    $("#teleMedLoad").hide();  
                    $("#teleMedGem3sInternet").show();

                    /*$timeout(function() {
                        $("#teleMedGem3sInternet").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000);    */                     
                  } else {
                    console.log("do");   

                    $scope.jSONtEXT = JSON.parse(Res.response);
                    $scope.MSG = $scope.jSONtEXT.msg.split(":");                 

                    $scope.showDoctorList();

                  }
              } else {
                    console.log("need to check platform code");  
                    $("#teleMedLoad").hide();   
                    $("#teleMedHpodServer").show();
                    /*$timeout(function() {
                        $("#teleMedHpodServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000);  */                   
              }
            } else {
                console.log("gem3s api not response properly");  
                $("#teleMedLoad").hide();  
                $("#teleMedGem3sServer").show();
                /*$timeout(function() {
                    $("#teleMedGem3sServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);  */       
            }

        } else {
            console.log("need to check platform code");
            $("#teleMedLoad").hide(); 
            $("#teleMedHpodServer").show();
            /*$timeout(function() {
                $("#teleMedHpodServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000);*/         
        }
    }

    $scope.showDoctorList = function () {
        $("#doctor_list").show();
        $scope.doctorList = "modal-slide-in-right";

        if( $scope.MSG[1] > 0)
        {
           doctor_list = $scope.jSONtEXT.data;
           console.log(doctor_list);
           var speciality_name = doctor_list[0].name;
           var speciality_id = doctor_list[0].id;
           var NumberofStarRating = 5;

            for(var i=0; i<doctor_list.length; i++) {
            
                $scope.doctorLists[i] = {};
                $scope.doctorLists[i].name = doctor_list[i].name;
                $scope.doctorLists[i].id   = doctor_list[i].id;
                $scope.doctorLists[i].email  = doctor_list[i].email;
                $scope.doctorLists[i].first_name =  doctor_list[i].first_name;
                $scope.doctorLists[i].profile_picture =  doctor_list[i].profile_picture;
                $scope.doctorLists[i].online_status =  doctor_list[i].online_status;
                $scope.doctorLists[i].busy_on =  doctor_list[i].busy_on;
                $scope.doctorLists[i].rating =  doctor_list[i].rating;
                $scope.doctorLists[i].fixed_charge =  doctor_list[i].fixed_charge;
                $scope.doctorLists[i].additional_minutes =  doctor_list[i].additional_minutes;
                $scope.doctorLists[i].fixed_duration =  doctor_list[i].fixed_duration;
                $scope.doctorLists[i].favourite =  doctor_list[i].favourite;
                $scope.doctorLists[i].speciality_id =  speciality_id;
                $scope.doctorLists[i].speciality_name =  doctor_list[i].name;

                $scope.doctorLists[i].stars = [];
                for (var j = 0; j < NumberofStarRating; j++) {
                    
                    $scope.doctorLists[i].stars[j] = {};
                    if (doctor_list[i].rating > j) {

                        $scope.doctorLists[i].stars[j].starClass = "checked";
                    }else{
                        $scope.doctorLists[i].stars[j].starClass = "unchecked";
                    }
                }
            }

        }
        else
        {
            //alert("No Doctor is available Now");
        }

        $("#teleMedLoad").hide();

        console.log($scope.doctorLists);
        
    }


    $scope.CallDoctorsinList = function(doctors_lists_id) {
        // loading image show
        // api call for live call doctor window url generate
        // hide the loading image
        // show the iframe        
        // jkiosk call send id=> c# 

        // step 1: Answer submission
        // step 2: call to doctor 

        
        HigiKioskStorageService.saveSessionData("doctors_lists_id", doctors_lists_id);

        $("#teleMedLoad").show();

        console.log(HigiKioskStorageService.returnSessionData("telemediUserid"));
        console.log(HigiKioskStorageService.returnSessionData("telemediUserProfileid"));
        console.log(HigiKioskStorageService.returnSessionData("telemediAccessToken")); 

        for (var i = 0; i < Object.keys($rootScope.telemediSlideQue).length; i++) {
            for(var j = 0; j < Object.keys($rootScope.telemediSlideQue[i].questions).length; j++){
                if($rootScope.telemediSlideQue[i].questions[j].id == $rootScope.copyPreCallQuestion[i].questions[j].id){
                    if(Array.isArray($rootScope.telemediSlideQue[i].questions[j].answer)){
                        $rootScope.copyPreCallQuestion[i].questions[j].answer = $rootScope.telemediSlideQue[i].questions[j].answer.join(",");                            
                    } else {
                        $rootScope.copyPreCallQuestion[i].questions[j].answer = $rootScope.telemediSlideQue[i].questions[j].answer;    
                    }                                                      
                }       
            }
        }
                
        console.log($rootScope.copyPreCallQuestion); 
        var answersubmission = { 
               "CallDetail" : {
               "to_user_id": doctors_lists_id,
               "patient_user_id" : HigiKioskStorageService.returnSessionData("telemediUserid"),
               "patient_profile_id" : HigiKioskStorageService.returnSessionData("telemediUserProfileid"),
               "hos_speciality_data" : [  
                 {
                    "id": HigiKioskStorageService.returnSessionData("specialists_id"),
                    "name": HigiKioskStorageService.returnSessionData("specialists_name")           
                 }
                ], 
               "pre_call" : { 
               "questionType": $rootScope.copyPreCallQuestion
                } 
                             }              
         
                       };
        console.log("data check for answer dynamic");
        console.log(answersubmission); 

        JkioskService.gem3sanswersubmission($scope.gem3sanswersubmissionRes, answersubmission,HigiKioskStorageService.returnSessionData("telemediAccessToken"));

       
    }
    var stoptriggerLiveCallStatusApi;
    $scope.gem3sanswersubmissionRes=function(Res){
        console.log(Res);


        if(Res.status != undefined){
            if(Res.status){
                if(Res.response != undefined){
                    if(Res.response == "internet"){
                        console.log("internet connection not avaliable");   
                        $("#teleMedLoad").hide();
                        $("#teleMedGem3sInternet").show();
                        /*$timeout(function() {
                            $("#teleMedGem3sInternet").hide();
                            window.location = "#/comebacksoon";   
                        }, 3000);    */                            
                    } else {
                        console.log("do");      

                        $scope.callDetails  = JSON.parse(Res.response);

                        if($scope.callDetails.success) {
                            HigiKioskStorageService.saveSessionData("telecallId", $scope.callDetails.data.CallDetail[0].id);
                             if($scope.callDetails.data.CallDetail[0].id == "https://www.youtube.com/embed/tgbNymZ7vqY"){
                                $("#telemediIframe").attr("src",$scope.callDetails.data.CallDetail[0].id);
                            } else {   
                                $("#telemediIframe").attr("src"," https://ihl.instapract.com/web/front/video/tele-conf?id="+HigiKioskStorageService.returnSessionData("telecallId"));
                            } 
                            
                            $rootScope.teleMediDoctorcall =  true;
                            $rootScope.floatingWindowLoaded = true;
                            $rootScope.triggeredDoctorGem3s = true;

                            $rootScope.triggerBeforeStartCall = false;
                            
                            $timeout(function() {
                                $("#teleMedLoad").hide();                                
                            }, 3000);

                            BeforeStartCallGem3sApi = $interval(triggerBeforeStartCallGem3sApi, 5000);

                        } else {
                            console.log("unable to connect to the doctor");  
                            $("#teleMedLoad").hide();
                            $("#teleMedGem3sServer").show();
                            /*$timeout(function() {
                                $("#teleMedGem3sServer").hide();
                                window.location = "#/comebacksoon";   
                            }, 3000); */        
                        } 
                    }
                } else {
                    console.log("need to check platform code"); 
                    $("#teleMedLoad").hide();
                    $("#teleMedHpodServer").show();
                   /* $timeout(function() {
                        $("#teleMedHpodServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000); */      
                }
            } else {
                console.log("gem3s api not response properly");                 
                $("#teleMedLoad").hide();   
                $("#teleMedGem3sServer").show();
                /*$timeout(function() {
                    $("#teleMedGem3sServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000); */ 
            }

        } else {
            console.log("need to check platform code");
            $("#teleMedLoad").hide();
            $("#teleMedHpodServer").show();
            /*$timeout(function() {
                $("#teleMedHpodServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000); */    
        }

    }

    
    var triggerBeforeStartCallGem3sApi  = function() {
        var path = $location.path();
        if(path != "/doctorlist") {   
            $rootScope.triggerBeforeStartCall = true;
            $interval.cancel(BeforeStartCallGem3sApi);
        }

        if($rootScope.triggerBeforeStartCall){
            $interval.cancel(BeforeStartCallGem3sApi);
        } else {
           // alert("LIVE CALL api trigger every 5sec");
            var startcal = { id : HigiKioskStorageService.returnSessionData("telecallId") };
            JkioskService.BeforeStartCallGem3sApi($scope.beforeStartCallGem3sApiRes, startcal,HigiKioskStorageService.returnSessionData("telemediAccessToken")); 
        }
    };

    $scope.beforeStartCallGem3sApiRes = function(Res){
        console.log(Res);

        var path = $location.path();

        if(path == "/doctorlist") {   
            $rootScope.triggerBeforeStartCallFinal = $rootScope.triggerBeforeStartCall;     
            if(Res.status != undefined){
                if(Res.status){
                    if(Res.response != undefined){
                        if(Res.response == "internet"){
                            console.log("internet connection not avaliable");   
                            $("#teleMedGem3sInternet").show();
                            $rootScope.triggerBeforeStartCall = true;
                            $scope.callRangCount = 0;
                           /* $timeout(function() {
                                $("#teleMedGem3sInternet").hide();
                                window.location = "#/comebacksoon";   
                            }, 3000); */                           
                        } else {
                            console.log("do");      
                            console.log(JSON.parse(Res.response));
                            var dataRes = JSON.parse(Res.response);

                            if(dataRes.data.CallDetail.call_status == "terminated"){
                               // step1: check how is terminated the call 
                               // step2: if doctor terminate the call, redirect to doctor list page and dispable the "call doctor " button who cut the call.
                               // step3: if patient cut the call, redirect to doctor list page and listed the avaliable doctors.
                                $rootScope.triggerBeforeStartCall = true;
                                $rootScope.teleMediDoctorcall =  false;
                                $rootScope.floatingWindowLoaded = false;
                                $rootScope.triggeredDoctorGem3s = false;
                                $scope.recallInitTriger();
                                $scope.callRangCount = 0;
                                window.location = "#/doctorlist";
                            } else if(dataRes.data.CallDetail.call_status == "missed_call"){
                                // nothing going to do.. patient is wait for doctor peek th call...
                                // check call rang time (60 sec) based on that we can show the dialog box to user
                                // if rang time limit(60 sec) is exists. Rediect to doctor list page.

                                if($scope.callRangCount >= 24) {
                                    $rootScope.triggerBeforeStartCall = true;
                                    $rootScope.teleMediDoctorcall =  false;
                                    $rootScope.floatingWindowLoaded = false;
                                    $scope.callRangCount = 0;
                                    $rootScope.triggeredDoctorGem3s = false;
                                    $("#teleMedGem3sCallAgain").show();
                                    $scope.recallInitTriger();
                                    window.location = "#/doctorlist";
                                } else {
                                    $scope.callRangCount++;
                                }

                            } else if(dataRes.data.CallDetail.call_status == "on_going") {
                                $rootScope.triggerBeforeStartCallFinal = true;
                                $rootScope.triggerBeforeStartCall = true;
                                $scope.callRangCount = 0;
                                stoptriggerLiveCallStatusApi = $interval(triggerLiveCallStatusApi, 5000);

                            } else if(dataRes.data.CallDetail.call_status == "completed") {
                                // not possible for "completed" status receiving in this logic flow.
                            } else {
                                console.log("beforeStartCallGem3sApiRes else = " + dataRes.data.CallDetail.call_status);
                            }
                        }
                    } else {
                        console.log("need to check platform code");     
                        $("#teleMedHpodServer").show();
                        $rootScope.triggerBeforeStartCall = true;
                        $scope.callRangCount = 0;
                        /*$timeout(function() {
                            $("#teleMedHpodServer").hide();
                            window.location = "#/comebacksoon";   
                        }, 3000);  */     
                    }
                } else {
                    console.log("gem3s api not response properly");    
                    $("#teleMedGem3sServer").show();
                    $rootScope.triggerBeforeStartCall = true;
                    $scope.callRangCount = 0;
                   /* $timeout(function() {
                        $("#teleMedGem3sServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000); */   
                }

            } else {
                console.log("need to check platform code");
                $("#teleMedHpodServer").show();
                $scope.callRangCount = 0;            
                $rootScope.triggerBeforeStartCall = true;
                /*$timeout(function() {
                    $("#teleMedHpodServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);*/    
            }
        } else {
            console.log("brfore call api terminated");
            $scope.callRangCount = 0;
            $rootScope.triggerBeforeStartCall = true;
        }
    }    

    var triggerLiveCallStatusApi  = function() {

        var path = $location.path();
        if(path != "/doctorlist") {   
            $scope.triggeredLiveCall = true;
            $interval.cancel(stoptriggerLiveCallStatusApi);
        }
        if($scope.triggeredLiveCall){
            $interval.cancel(stoptriggerLiveCallStatusApi);
        } else {
            // alert("LIVE CALL api trigger every 5sec");
            var startcal = { id : HigiKioskStorageService.returnSessionData("telecallId"), "status":"online"};
            JkioskService.gem3sStartcallStatus($scope.startcallRes, startcal,HigiKioskStorageService.returnSessionData("telemediAccessToken")); 
        }
    };

    var stopGem3sConsultationDetails;

    $scope.startcallRes=function(Res){
      // alert("got response from c# for start call")
        console.log(Res);

        var path = $location.path();
        if(path == "/doctorlist") {                             
            $rootScope.triggeredLiveCallFinal = $scope.triggeredLiveCall;

            if(Res.status != undefined){
                if(Res.status){
                    if(Res.response != undefined){
                        if(Res.response == "internet"){
                            console.log("internet connection not avaliable"); 
                            $("#teleMedGem3sInternet").show();
                            $scope.triggeredLiveCall = true;
                            $scope.callStatus = "internet";
                            /*$timeout(function() {
                                $("#teleMedGem3sInternet").hide();
                                window.location = "#/comebacksoon";   
                            }, 3000);   */                          
                        } else {
                            console.log("do");   console.log(JSON.parse(Res.response));
                            var dataRes = JSON.parse(Res.response);
                            // alert(dataRes.data.CallDetail[0].call_status);
                            $rootScope.callDuration = $scope.callDetails.data.CallDetail[0].endCall;
                            if(dataRes.data.CallDetail[0].call_status == "terminated"){
                                $timeout(function() { // 3 sec delay for doctor termianted info show inside the iframe                                    
                                    $scope.triggeredLiveCall = true;
                                    $rootScope.teleMediDoctorcall =  false;
                                    $rootScope.floatingWindowLoaded = false;
                                    $rootScope.triggeredDoctorGem3s = false;
                                    $scope.callStatus = "terminated";
                                    $scope.recallInitTriger();
                                    window.location = "#/doctorlist";
                                }, 2500);
                            } else if(dataRes.data.CallDetail[0].call_status == "completed"){
                                // consultation details callback        
                                //startInterval 

                                //waiting for doctor prescription generate
                                //1. loading icon design with content text(Please wait your prescription is generate shortly)
                                //2. if not provide moving show the dialog prescription not generated thanks for consult the doctor.
                                //3. moving to prescription page or clear the session.

                               // stopGem3sConsultationDetails =  $interval(triggerLiveCallConsultationDetails, 5000);

                                $scope.triggeredLiveCall = true;
                                $rootScope.teleMediDoctorcall =  false;
                                $rootScope.floatingWindowLoaded = false;
                                $rootScope.triggeredDoctorGem3s = true;                              
                                $scope.callStatus = "completed";

                                window.location = "#/telemedicine";

                            } else if(dataRes.data.CallDetail[0].call_status == "missed_call"){
                                // check call ring timing based on that implemented the logic

                            } else if(dataRes.data.CallDetail[0].call_status == "on_going"){
                                // waiting for the completed and termoinated response.
                            } else {
                                console.log("wrong input received = "+ dataRes.data.CallDetail[0].call_status);                        
                                $("#teleMedGem3sServer").show();
                                $scope.triggeredLiveCall = true;
                                /*$timeout(function() {
                                    $("#teleMedGem3sServer").hide();
                                    window.location = "#/comebacksoon";   
                                }, 3000);  */      
                            }    
                        }
                    } else {
                        console.log("need to check platform code"); 
                        $("#teleMedHpodServer").show();
                        $scope.triggeredLiveCall = true;
                        /*$timeout(function() {
                            $("#teleMedHpodServer").hide();
                            window.location = "#/comebacksoon";   
                        }, 3000);   */       
                    }
                } else {
                    console.log("gem3s api not response properly");   
                    $("#teleMedGem3sServer").show();
                    $scope.triggeredLiveCall = true;
                    /*$timeout(function() {
                        $("#teleMedGem3sServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000);  */      
                }

            } else {
                console.log("need to check platform code"); 
                $("#teleMedHpodServer").show();            
                $scope.triggeredLiveCall = true;
                /*$timeout(function() {
                    $("#teleMedHpodServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);*/         
            }

            // doctor close the browser or internet connection is disabled logic start
            var doctor_available  = $('#telemediIframe').contents().find('#doctor_available').val();
            console.log("doctor_available = "+ doctor_available);

            $timeout(function() {                
                if(doctor_available == "Yes"){

                } else if(doctor_available == "No"){

                } else if(doctor_available == "Left" && $scope.callStatus == "on_going" && $scope.doctorLeftAlreadyTriggered == false){
                    $scope.doctorLeftAlreadyTriggered = true;
                    $("#teleMedGem3sDoctorUnava").show();
                    $timeout(function(){
                        $("#teleMedGem3sDoctorUnava").hide();
                        $scope.triggeredLiveCall = true;
                        $rootScope.teleMediDoctorcall =  false;
                        $rootScope.floatingWindowLoaded = false;
                        $rootScope.triggeredDoctorGem3s = false;
                        $scope.recallInitTriger();
                        window.location = "#/doctorlist";
                    }, 3000);
                } else {
                    console.log("doctor_available flag is not decalated in gem3s side... contact gem3s support person");
                }
            }, 3000);
            // doctor close the browser or internet connection is disabled logic end


        } else {
            console.log("During call (start call) api terminated");          
            $scope.triggeredLiveCall = true;        
        }

    }

  
    $scope.loadprescription = function() {
        $rootScope.teleMediDoctorcall =  true;
    }
    
    $scope.OpenBigFloatWindow = function(){    
        JkioskService.openTeleMedBigWindow($scope.OpenBigFloatWindowConfirmationCallBack);
    }
    
    $scope.OpenBigFloatWindowConfirmationCallBack = function(response){   
        //alert("big window opened");        
            $rootScope.floatingWindowLoaded = true;
    };

    $scope.CloseFloatWindow = function(){
        // hide the iframe
        // doctor consultaion api call
        // if prescription is avaliable show the prescription page, otherwise close the session.        
        $rootScope.teleMediDoctorcall =  false;
        $rootScope.floatingWindowLoaded = false;
        window.location = "#/telemedicine";
    }

    $scope.CloseFloatWindowConfirmationCallBack = function(response){     
        console.log("closed the float window done");
    };
    
    $rootScope.teleMediDoctorcallAbort = $scope.CloseFloatWindow;
    
    var triggerDoctorAvaliableApi  = function() {
        var path = $location.path();
        
        if(path != "/doctorlist"){
            $rootScope.triggeredDoctorGem3s = true;  
            $interval.cancel(stopTriggerDoctorAvaliableApi);
        }

        if($rootScope.triggeredDoctorGem3s){
            $interval.cancel(stopTriggerDoctorAvaliableApi);
        } else {
            //alert("doctoe api trigger every 5sec");
            $scope.init();   
        }
    };
    stopTriggerDoctorAvaliableApi = $interval(triggerDoctorAvaliableApi, 5000);
    stopTriggerDoctorAvaliableApi;

    $scope.recallInitTriger = function(){
        stopTriggerDoctorAvaliableApi = $interval(triggerDoctorAvaliableApi, 5000);
    }

    $scope.init(); 

    
}]);