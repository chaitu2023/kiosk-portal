higiKioskControllers.controller('IHLHPodSpeciaListController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService','$interval', '$location', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval, $location){

    var stopDoctorLiveStatus;
    $scope.doctorBusyCheck = false;
    //$rootScope.homeButtonShow = true;
    $scope.specialists = [];

    $("#teleMedLoad").show();    

    HigiKioskFlow.setGlobalNav('IHLHPodSpeciaListController');
    
    $scope.init = function(){
        $scope.telemedTitle = "global.telemedi.Title";
        $scope.specialistSubTitle = "global.telemedi.Subtitle";
        $scope.docnotavail = "global.telemedi.docnotavail";         
        $scope.Gem3slogin();          
    };    

    $scope.Gem3slogin = function(){  
        $("#teleMedLoad").show();                 
        //var payload = {"username": HigiKioskStorageService.returnSessionData('telemedUserEmail'),"password": "Test@123","device_id": $rootScope.telemediDeviceId,"os_id": "82d10438-70e9-4b75-842c-13df79aeb720","time_zone": "America/New_York","is_clinical_user":"no","role_id":"143f37f2-ca38-0ab1-2489-1e47113655fc"};
        var payload = {"username": HigiKioskStorageService.returnSessionData('telemedUserEmail'),"password": "Test@123","device_id": $rootScope.telemediDeviceId,"os_id": "b93a9204-ee21-4cf9-8a94-cf5eeabf7301","time_zone": "America/New_York","is_clinical_user":"no","role_id":"143f37f2-ca38-0ab1-2489-1e47113655fc"};
        console.log("login credentials");
        console.log(payload);
        JkioskService.gen3slogin($scope.gen3sloginRes,  payload);                 
    }

    $scope.gen3sloginRes = function (Res){
        console.log(Res);
        $rootScope.loadingModalVisible = false;
        $rootScope.teleMediLoadingVisible = false;
        if(Res.isApiCallSucess != undefined){
            if(Res.isApiCallSucess){
                var JSONres = JSON.parse(Res.token);
                HigiKioskStorageService.saveSessionData("telemediUserid", JSONres.data.PatientProfile.user_id)
                HigiKioskStorageService.saveSessionData("telemediUserProfileid", JSONres.data.PatientProfile.id)
               
                HigiKioskStorageService.saveSessionData("telemediAccessToken","Bearer "+JSONres.data.access_token);
               // alert(HigiKioskStorageService.returnSessionData("telemediAccessToken"));

                
                console.log(HigiKioskStorageService.returnSessionData("telemediUserid"));
                console.log(HigiKioskStorageService.returnSessionData("telemediUserProfileid"));
                console.log(HigiKioskStorageService.returnSessionData("telemediAccessToken")); 

                stopDoctorLiveStatus = $interval(doctorLiveStatus, 5000);
            } else {
                // register the current user
                if(Res.token == "internet"){
                    console.log("Internet connection not avaliable");
                    $("#teleMedLoad").hide();
                    $("#teleMedGem3sInternet").show();
                    /*$timeout(function() {
                        $("#teleMedGem3sInternet").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000); */        
                } else {
                  $scope.gem3sUserReg();  
                }            
            }
        } else {
            console.log("IHL server side error.. need to check platform code...");            
            $("#teleMedLoad").hide();
            $("#teleMedHpodServer").show();
            /*$timeout(function() {
                $("#teleMedHpodServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000);*/         
        }
    };

    var doctorLiveStatus  = function() {
        var path = $location.path();
        console.log(path);
        
        if(path != "/specialist"){
            $scope.doctorBusyCheck = true;
            $interval.cancel(stopDoctorLiveStatus);
        }

        if($scope.doctorBusyCheck){
            $interval.cancel(stopDoctorLiveStatus);
        } else {           
            var doctoravail={
                         "speciality_id": "",
                         "gender":"",
                         "state":"",
                         "postal_code":"",
                         "rating":"",
                         "available_status":"",
                         "list_for":"alldoc"
                        };
            JkioskService.gem3sDoctorAvailabile($scope.Doctoravailabilitylistres,  doctoravail, HigiKioskStorageService.returnSessionData("telemediAccessToken"));
        }
    };

    $scope.Doctoravailabilitylistres = function(Res){
              //  console.log(Res);
        $rootScope.doctorsavailablespecialty =[];
        if(Res.response != undefined){            
            if(Res.response == "internet"){                        
                console.log("Internet connection not avaliable");
                $("#teleMedGem3sInternet").show();
                $scope.doctorBusyCheck = true;
                /*$timeout(function() {
                    $("#teleMedGem3sInternet").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);   */      

            }  else {
                $scope.doctorsavailables = JSON.parse(Res.response);
                console.log($scope.doctorsavailables);
                console.log($scope.doctorsavailables.data);

                var index = 0;
                for (var i = 0; i < $scope.doctorsavailables.data.length; i++) {
                    console.log("h="+$scope.doctorsavailables.data[i].online_status);
                    if($scope.doctorsavailables.data[i].online_status == "online"){
                      //console.log($scope.doctorsavailables.data[i].specialty);
              
                        $rootScope.doctorsavailablespecialty[index] = $scope.doctorsavailables.data[i].specialty;
                        index++;
                        //console.log($rootScope.doctorsavailablespecialty);
                     }
                }                      
                JkioskService.gem3slistofspecilality($scope.gem3slistofspecilalityRes, HigiKioskStorageService.returnSessionData("telemediAccessToken") );
                     
                console.log($rootScope.doctorsavailablespecialty);

            }     
        } else {
            console.log("Doctoravailabilitylistres api not loaded properly.. check ihl platform code.");
            $("#teleMedGem3sServer").show();
            $scope.doctorBusyCheck = true;
            /*$timeout(function() {
                $("#teleMedGem3sServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000);*/         
        }               
    }

    $scope.gem3slistofspecilalityRes = function(Res){
        console.log(Res);
        $scope.doctoravailabiltylists = [];

        if(Res.status != undefined){
            if(Res.status){
                if(Res.response != undefined){
                    if(Res.response == "internet"){
                        console.log("internet connection not avaliable");   
                        $("#teleMedGem3sInternet").show();
                        $scope.doctorBusyCheck = true;
                        /*$timeout(function() {
                            $("#teleMedGem3sInternet").hide();
                            window.location = "#/comebacksoon";   
                        }, 3000);   */                       
                    } else {
                        console.log("do");  
                        $scope.jSONtEXT1 = JSON.parse(Res.response);
                        $scope.MSG_MSG = $scope.jSONtEXT1.msg.split(":");
                        console.log("$scope.MSG_MSG"+   $scope.MSG_MSG);
                      

                        if( $scope.MSG_MSG[1] > 0)
                        {
                            $scope.specialists = $scope.jSONtEXT1.data;

                            for (var p = 0; p < $scope.specialists.length; p++) {
                                $scope.specialists[p].avaliable = true;
                            }
                          //  console.log($scope.specialists);

                             var k = 0;  

                           for(i=0; i < $rootScope.doctorsavailablespecialty.length ; i++ ) {
                                for(j=0 ; j < $rootScope.doctorsavailablespecialty[i].length; j++){
                                     $scope.doctoravailabiltylists[k] = $rootScope.doctorsavailablespecialty[i][j];
                                     k++;
                                }
                            }
                     
                            console.log($scope.doctoravailabiltylists);
                            console.log($scope.specialists);
                            console.log("$scope.specialists.length = "+ $scope.specialists.length);
                            console.log("$scope.doctoravailabiltylists.length = "+ $scope.doctoravailabiltylists.length);
                            for (var l = 0; l < $scope.specialists.length; l++) { 
                                for (var m = 0; m < $scope.doctoravailabiltylists.length;m++) { 
                                    console.log("list of specialist"+ $scope.specialists[l].id);
                                    console.log("list of doctors available"+ $scope.doctoravailabiltylists[m].id);
                                    if ($scope.specialists[l].id == $scope.doctoravailabiltylists[m].id) {
                                        console.log("enabled");
                                        $scope.specialists[l].avaliable = false;
                                  
                                    }

                                }
                                 
                                
                            }

                            if($scope.specialists.length > 6){
                              $("#specialits_list").css("overflow-x", "hidden");
                              $("#specialits_list").css("overflow-y", "scroll");
                            } else {
                              $("#specialits_list").css("overflow", "hidden");
                            }


                        }
                        else
                        {
                            //alert("No Specialty Category"); 
                            $("#teleMedGem3sServer").show();
                            $scope.doctorBusyCheck = true;
                            /*$timeout(function() {
                                $("#teleMedGem3sServer").hide();
                                window.location = "#/comebacksoon";   
                            }, 3000);  */  
                        }  

                        $timeout(function(){
                         $("#teleMedLoad").hide();
                        },3000); 
                    }
                } else {
                    console.log("need to check platform code");     
                    $("#teleMedHpodServer").show();
                    $scope.doctorBusyCheck = true;
                    /*$timeout(function() {
                        $("#teleMedHpodServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000); */
                }
            } else {
                console.log("gem3s api not response properly");  
                $("#teleMedGem3sServer").show();
                $scope.doctorBusyCheck = true;
                /*$timeout(function() {
                    $("#teleMedGem3sServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);  */
            }

        } else {
            console.log("need to check platform code");
            $("#teleMedHpodServer").show();            
            $scope.doctorBusyCheck = true;
            /*$timeout(function() {
                $("#teleMedHpodServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000);*/
        }
    }


    $scope.gem3sUserReg = function(){ 
        //alert('inside gem3sUserReg');
        $("#teleMedLoad").show();

        var mobileNo = HigiKioskStorageService.returnSessionData('telemedUserMobileNumber');           

        if (mobileNo == "8888888888" || mobileNo == undefined || mobileNo == null || mobileNo == "") {
            //alert('inside mobile modal');

            $rootScope.mobileNumberInit();
            if($("#mobilenum").val() != undefined){
                $("#mobilenum").val("");
            }
            document.getElementById("higi_keyboard_close_btn").style.display = "block";
            $(".keyboard_class_close_btn").show(); 
            $rootScope.loadModal({id : 'mobilenumbermodal'});
            $("#teleMedLoad").hide();
        } else { 
            //alert('inside gem3spatientReg');
           $scope.gem3spatientReg();
        }
    }

    $scope.gem3spatientReg = function(){

        var firstName = HigiKioskStorageService.returnSessionData('telemedUserFirstName');
        var lastName = HigiKioskStorageService.returnSessionData('telemedUserLastName');
        var mobileNo = HigiKioskStorageService.returnSessionData('telemedUserMobileNumber');
        var email = HigiKioskStorageService.returnSessionData('telemedUserEmail');
        var gender = HigiKioskStorageService.returnSessionData('telemedUserGender');
        var dob = HigiKioskStorageService.returnSessionData('telemedUserDOB');             

         var patientreg={
           "saveRecord":true,
           "validationConfig":{
              "User":true,
              "PatientProfile":true,
              "PatientProfileLocation" : true
           },
           "data":{
              "User":{
                 "username": email,
                 "email": email,
                 "confirm_email": email,
                 "password":"Test@123",
                 "password_repeat":"Test@123"
                  },
                  "PatientProfile":{
                        "first_name": firstName,
                        "middle_name": "",
                        "last_name": lastName,
                        "gender": gender,
                        "dob": dob
                  },
                  "PatientProfileLocation" : {
                        "phone1" : mobileNo,
                        "country_id": "4faa4fbc-1d00-4297-b3b0-1f05fbd7849c",
                        "state_id": "a4957d5a-0ee1-47e5-99a4-59561d21b143",
                        "city_id": "20ecd670-d7ed-da7a-c73b-6f762f5ce306",
                        "postal_code": "87456",
                        "street_name": "test"
                  },
                  "Device" : {
                    "device_id": "55c3389cb5ddd720dc0297617f3561c43a36218a277c974c8d43d545a643f45c",
                    "os_id": "82d10438-70e9-4b75-842c-13df79aeb720"
                  }
               }
            };
            console.log(patientreg);
            JkioskService.gem3sPatientReg($scope.gem3sPatientRegRes,  patientreg);
    }

    $rootScope.gem3spatientReg = $scope.gem3spatientReg;

    $scope.gem3sPatientRegRes = function(Res) { 
        console.log("reg response received");
        console.log(Res);
        $rootScope.loadingModalVisible = false;
        $rootScope.teleMediLoadingVisible = false;
        var JSONres;
        console.log(Res.respose);
        if(Res.status != undefined){
            if(Res.status == true){
                if(Res.respose != null && Res.respose != undefined){           
                    if(Res.respose == "internet"){
                        console.log("internet connection not avaliable");
                        $("#teleMedLoad").hide();
                        $("#teleMedGem3sInternet").show();
                        /*$timeout(function() {
                            $("#teleMedGem3sInternet").hide();
                            window.location = "#/comebacksoon";   
                        }, 3000);*/
                    } else {                        
                        JSONres = JSON.parse(Res.respose);
                        if(JSONres.success){
                            $scope.Gem3slogin();
                        } else {
                            console.log("gem3s telemedi registered failed.. gem3s server side error...");
                            $("#teleMedLoad").hide();
                            $("#teleMedGem3sServer").show();
                            /*$timeout(function() {
                                $("#teleMedGem3sServer").hide();
                                window.location = "#/comebacksoon";   
                            }, 3000);*/
                        }
                    }

                } else {
                    console.log("gem3s telemedi registered failed.. ihl platform code check");
                    $("#teleMedLoad").hide();
                    $("#teleMedHpodServer").show();
                    /*$timeout(function() {
                        $("#teleMedHpodServer").hide();
                        window.location = "#/comebacksoon";   
                    }, 3000);*/
                }
            } else {
                console.log("gem3s telemedi registered failed.. gem3s server side error...");
                $("#teleMedLoad").hide();
                $("#teleMedGem3sServer").show();
                /*$timeout(function() {
                    $("#teleMedGem3sServer").hide();
                    window.location = "#/comebacksoon";   
                }, 3000);*/
            } 
        } else {
            console.log("gem3s telemedi registered failed.. ihl platform code check");
            $("#teleMedLoad").hide();
            $("#teleMedHpodServer").show();
            /*$timeout(function() {
                $("#teleMedHpodServer").hide();
                window.location = "#/comebacksoon";   
            }, 3000);*/
        }  
    };
            

   

    $scope.questionnaireModalBox = function(specialists_id, specialists_name){  
        
        $scope.doctorBusyCheck = true;
        $("#teleMedLoad").show();
        HigiKioskStorageService.saveSessionData("specialists_id", specialists_id);
        HigiKioskStorageService.saveSessionData("specialists_name", specialists_name);


         var specialqusion={
          "id": HigiKioskStorageService.returnSessionData("specialists_id"),
          "spec_type" : "precall",
          "spec_type1" : "survey"}; 
         
        JkioskService.gem3sSpecilalityquestion($scope.gem3sSpecilalityquestionRes, specialqusion, HigiKioskStorageService.returnSessionData("telemediAccessToken"));


    }

    $scope.gem3sSpecilalityquestionRes = function(Res){
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
                      }, 3000); */                      
                  } else {
                    console.log("do");  
                    var obj = JSON.parse(Res.response);
                    console.log(obj);
                    $rootScope.preCallQuestion = obj;
                    console.log($rootScope.preCallQuestion);
                    $rootScope.loadModal({id : 'Specialty_question'});
                    $rootScope.telemedicineQuestions();
                    $rootScope.copyPreCallQuestion = $scope.preCallQuestion.data.questionType;
                    console.log($rootScope.copyPreCallQuestion);    
                    $("#teleMedLoad").hide();
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
            }, 3000);*/           
        }
    }

    $scope.init();
}]);