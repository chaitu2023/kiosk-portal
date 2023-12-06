higiKioskControllers.controller('IHLHPodGenixDoctorListController' , ['$scope', '$routeParams' , '$rootScope', 'HigiKioskFlow' , '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', '$interval', function($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, $interval){

    $scope.triggeredDoctor = false;

    //var tokenid = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImUzMmNlMzE1LTY3OWQtNDE3MS1iMWM3LTAzNjU2OTE4Mzk1OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJJSExEZXZpY2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI3YmM4ODdkNi1hNWU3LTRiYzYtODVhMS1hMzI2OThjMmJiODYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiI1ZWFhMzYzYS04YTdiLTQ5NTAtYjg2Mi1hNzc4ZGQ2NzY1MGNfOTZiMjY4MmMtMjVlOC00MGEyLWEzMzgtOTQ5NjcwYWE1NGMzXzllMTNjMmEwLTNlMTgtNDA5Zi1hMTQ3LWU2NTIwZTI3N2IwNCIsIkZURSI6IjEiLCJuYmYiOjE1NzM0NTEyNDQsImV4cCI6MTU3MzQ3Mjg0NCwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTgyMiIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.EUD1ae5zWudOQsz19Ww361kaVQpsv04JMC2n1lxtJi8";

    $scope.specialistsName  =  HigiKioskStorageService.returnSessionData("specialists_name");
    $scope.init = function(){
        $scope.slideTitle = "TeleMedicine";
        $scope.slideSubTitle = "Doctors List";

        $scope.specialists_id = HigiKioskStorageService.returnSessionData("specialists_id");

       $scope.Provider();
                        
    };
    //end of init func

    $scope.Provider = function(){
      JkioskService.Provider($scope.ProviderRes,HigiKioskStorageService.returnSessionData('genixTokenid'));   
    };

    $scope.ProviderRes= function(Res){
      console.log(Res);
      $scope.jsonData =Res.respose;
      //alert($scope.jsonData.Name);
      HigiKioskStorageService.saveSessionData('genixDoctorName', $scope.jsonData.Name);

      console.log("provider res");
      console.log($scope.jsonData);
      
      if($scope.jsonData != [] || $scope.jsonData != null || $scope.jsonData != undefined)
         {
            console.log($scope.jsonData[0].length);
            $scope.doctorLists = JSON.parse($scope.jsonData); 
            console.log($scope.doctorLists); 
         }   
         else
         {
            alert("[ empty ]");
         }

      

      HigiKioskFlow.setGlobalNav('IHLHPodDoctorListController');
    };


    $scope.Gohome = function(){
        window.location = "#/welcome";
    }

    $scope.CallDoctorsinList = function(doctorId) {
       // alert("calling Doctor"+ doctorId);
        console.log(doctorId);
        $scope.triggeredDoctor = true;

        $scope.genixEncounterType();       
        
    };


    $scope.genixEncounterType = function(){
            JkioskService.genixEncounterType($scope.genixEncounterTypeRes,HigiKioskStorageService.returnSessionData('genixTokenid')); 
          }

        $scope.genixEncounterTypeRes= function(Res){
            if (Res != null && Res != undefined && Res != []) {
              $scope.genixEncounterRes = Res.respose;
              $scope.encounterResId = JSON.parse($scope.genixEncounterRes);
              var videoCallId =$scope.encounterResId.filter(obj => {
                  return obj.Name === "VCV" 
              })
              $scope.genixEncounterTypeId = videoCallId[0].Id;
              //alert($scope.genixEncounterTypeId);
              $scope.genixInitiateEncounter();
            }else{
              //alert("no encounter id generated")
            }
          }

        $scope.genixInitiateEncounter =function(){
            var inputparam = {"PatientId":"9fb31b23-0229-4e83-ae86-a3cc97e828d5","EncounterTypeId":$scope.genixEncounterTypeId}; 
            console.log(inputparam);
            JkioskService.genixInitiateEncounter($scope.genixInitiateEncounterRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));   
        }

        $scope.genixInitiateEncounterRes=function(Res){
            console.log(Res);
            if (Res != null && Res != undefined && Res != []) {
              $scope.genixInitiateRes = Res.respose;
              $scope.genixInitiateId = JSON.parse($scope.genixInitiateRes);
              console.log($scope.genixInitiateId.EncounterId);
              $scope.genixEncounterId = $scope.genixInitiateId.EncounterId;
              $scope.genixConnectProvider();
            }   
          }

        $scope.genixConnectProvider = function(){
            var inputparam = {"EncounterId":$scope.genixEncounterId,"ProviderId":"43058f2b-8579-44ca-a17b-c5d0362aacfe"};   
            console.log(inputparam);
            JkioskService.genixConnectProvider($scope.genixConnectProviderRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));   
        }

        $scope.genixConnectProviderRes= function(Res){
            console.log(Res);
            $scope.genixConnectProviderRes = Res.respose;
            $scope.genixConnectProviderId = JSON.parse($scope.genixConnectProviderRes);
            console.log($scope.genixConnectProviderId.URL);

            $("#telemediIframe").attr("src",$scope.genixConnectProviderId.URL);
            $rootScope.teleMediDoctorcall =  true;
            $rootScope.floatingWindowLoaded = true;
        }


    var triggerDoctorAvaliableApi  = function() {
        if($scope.triggeredDoctor){
            $interval.cancel(stopTriggerDoctorAvaliableApi);
        } else {
            //alert("doctor api trigger every 5sec");
            $scope.init(); 
        }
    };
    var stopTriggerDoctorAvaliableApi =  $interval(triggerDoctorAvaliableApi, 5000);

    $scope.init(); 

    
}]);