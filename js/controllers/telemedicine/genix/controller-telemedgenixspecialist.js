higiKioskControllers.controller('IHLHPodGenixSpeciaListController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService','$interval', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval){
    
        
            //var tokenid = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImUzMmNlMzE1LTY3OWQtNDE3MS1iMWM3LTAzNjU2OTE4Mzk1OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJJSExEZXZpY2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI3YmM4ODdkNi1hNWU3LTRiYzYtODVhMS1hMzI2OThjMmJiODYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiI1ZWFhMzYzYS04YTdiLTQ5NTAtYjg2Mi1hNzc4ZGQ2NzY1MGNfOTZiMjY4MmMtMjVlOC00MGEyLWEzMzgtOTQ5NjcwYWE1NGMzXzllMTNjMmEwLTNlMTgtNDA5Zi1hMTQ3LWU2NTIwZTI3N2IwNCIsIkZURSI6IjEiLCJuYmYiOjE1NzMwMTY4MDEsImV4cCI6MTU3MzAzODQwMSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTgyMiIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.9UoEsJDDML0unvrt1ah6crEXV3Bdmeng9mxZ6IPWLEA";
            HigiKioskFlow.setGlobalNav('IHLHPodGenixSpeciaListController');

        $scope.init = function(){
              $scope.slideTitle = "TeleMedicine";
              $scope.slideSubTitle = "Specialists";  
              $scope.GenixAuthentication();
         };


        $scope.GenixAuthentication = function(){
              var inputparam = {"Username":"IHLDevice","Password":"IHLDevice@123","grant_type":"password"};
              console.log(inputparam);
              JkioskService.GenixAuthentication($scope.AuthenticationRes,inputparam);   
        }

        $scope.AuthenticationRes = function(Res){
              //alert("res received");
              console.log(Res);
              if(Res.isApiCallSucess){
                  var response = JSON.parse(Res.token);
                  HigiKioskStorageService.saveSessionData('genixTokenid', "Bearer "+response.access_token);     

                  $scope.UserLogin();

                  //$scope.genixSpeciality(); 
              }
        }

       $scope.UserLogin = function(){
    //alert("UserLogin call");
    /*if(HigiKioskStorageService.returnSessionData('telemedUserMobileNumber') == "8888888888" || HigiKioskStorageService.returnSessionData('telemedUserMobileNumber') == ""){
      $scope.Addpatient();
    }else{
      var inputparam = HigiKioskStorageService.returnSessionData('telemedUserMobileNumber');   
      console.log(inputparam);
      JkioskService.UserLogin($scope.UserLoginRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));
    }   */

    var inputparam = "9894599498";   
      console.log(inputparam);
      JkioskService.UserLogin($scope.UserLoginRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));
  }

     $scope.UserLoginRes= function(Res){
   // alert("UserLogin calling")
    console.log(Res);
    if(Res.status){
      var response = JSON.parse(Res.respose);
      $scope.GenixUserData(response);
      //alert("genix user login successfully");
    } else {
      //alert("registeration flow start");
      $scope.Addpatient();
    }
  }

  $scope.Addpatient = function(){
    //alert("$scope.Addpatient fn callled");
    //var inputparam = {"FirstName":"test4","MiddleName":"","LastName":"1s","DOB":"09/07/1999","Gender":"M","ContactNumber":"9824631375"};
    if(HigiKioskStorageService.returnSessionData('telemedUserMobileNumber') == "8888888888" || HigiKioskStorageService.returnSessionData('telemedUserMobileNumber') == "") {
       $rootScope.loadModal({id : 'mobilenumbermodal'});
    }else{
      if (HigiKioskStorageService.returnSessionData('telemedUserGender') == 'male') {
        $scope.newGender = "M";
      }else{
        $scope.newGender = "F";
      }
     var inputparam = {"FirstName":HigiKioskStorageService.returnSessionData('telemedUserFirstName'),"MiddleName":"","LastName":HigiKioskStorageService.returnSessionData('telemedUserLastName'),"DOB":HigiKioskStorageService.returnSessionData('telemedUserDOB'),"Gender": $scope.newGender,"ContactNumber":HigiKioskStorageService.returnSessionData('telemedUserMobileNumber')};
     
     //alert(HigiKioskStorageService.returnSessionData('telemedUserGender'));
    // alert(HigiKioskStorageService.returnSessionData('telemedUserDOB'));
     //alert(HigiKioskStorageService.returnSessionData('telemedUserLastName'));

     //var inputparam = {"FirstName":"Dharmadurai1","MiddleName":"","LastName":"Selvan","DOB":"09-07-2999","Gender":"M","ContactNumber":"8978651236"};
      console.log(inputparam);
      console.log("acces token =" + HigiKioskStorageService.returnSessionData('genixTokenid'));
      JkioskService.Addpatient($scope.AddpatientRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));   
    }  
  }
   $rootScope.Addpatient = $scope.Addpatient;

  $scope.AddpatientRes= function(Res){
    //alert("AddpatientRes calling")
    console.log(Res);
    if(Res.status){
      var response = JSON.parse(Res.respose);
      $scope.GenixUserData(response);
    } else {
      alert("we regret, unable to move to telemedi flow");
    }
  }

  $scope.GenixUserData = function(response){
      HigiKioskStorageService.saveSessionData('genixPatientId', response.Id); 
      HigiKioskStorageService.saveSessionData('genixFirstName', response.FirstName); 
      HigiKioskStorageService.saveSessionData('genixMiddleName', response.MiddleName); 
      HigiKioskStorageService.saveSessionData('genixLastName', response.LastName); 
      HigiKioskStorageService.saveSessionData('genixDOB', response.DOB); 
      HigiKioskStorageService.saveSessionData('genixGender', response.Gender); 
      HigiKioskStorageService.saveSessionData('genixContactNumber', response.ContactNumber);
      HigiKioskStorageService.saveSessionData('genixMaritalStatus', response.MaritalStatus);
      HigiKioskStorageService.saveSessionData('genixMemberId', response.MemberId); 
      HigiKioskStorageService.saveSessionData('genixModifiedBy', response.ModifiedBy);
      HigiKioskStorageService.saveSessionData('genixModifiedOn', response.ModifiedOn); 
      HigiKioskStorageService.saveSessionData('genixContacts', response.Contacts); 

      $scope.genixSpeciality();
  }

          
          $scope.genixSpeciality = function (){
              JkioskService.genixSpeciality($scope.genixListofSpecilalityRes,HigiKioskStorageService.returnSessionData('genixTokenid'));    
          };
    
          $scope.genixListofSpecilalityRes = function(Res){
              console.log(Res);
              console.log(Res.respose);
              $scope.genixspecialist = Res.respose;
              $scope.genixspecialisty = JSON.parse(Res.respose);
              console.log($scope.genixspecialisty[0].Name);
              var arrt = [];
              for (var i = 0; i < $scope.genixspecialisty.length; i++) {
               arrt[i] =  $scope.genixspecialisty[i].Name;
              }
              console.log(arrt);
              $rootScope.Speciality_name = arrt;
              HigiKioskStorageService.saveSessionData('genixSpecialist', $scope.genixspecialist.Name); 
               
              if($scope.genixspecialist[0].length > 0){
                console.log($scope.genixspecialist[0].length);
                $scope.specialities = JSON.parse($scope.genixspecialist);
              }else{
                alert("No Specialty Category");
              }  
          };

          $scope.genixSpecialistsList = function(specialisties_id){  
              console.log(specialisties_id);
              HigiKioskStorageService.saveSessionData("genixspeciality",  specialisties_id);
              $rootScope.loadModal({id : 'genix_Specialty_question'});
              $rootScope.genixSpecialistIdRes();
          }
    
            $scope.init();
}]);