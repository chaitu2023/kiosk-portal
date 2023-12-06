higiKioskControllers.controller('esanjeevaniPatientListController' , ['$interval', '$scope', '$http' , '$rootScope', 'HigiKioskStorageService', 'HigiKioskFlow', 'JkioskService', 'HigiKioskUserService', '$controller', 'HigiKioskUtilitiesService', 'HigiKioskAnimationService', '$timeout', 'HigiApiService', function($interval, $scope, $http, $rootScope, HigiKioskStorageService, HigiKioskFlow, JkioskService, HigiKioskUserService, $controller, HigiKioskUtilitiesService, HigiKioskAnimationService, $timeout, HigiApiService){
			 


			 $scope.patientList = [];
				$scope.loadingForDataFetch = false;
				$rootScope.hideESanjeevaniBtn = false;
				$rootScope.languageEnable = false;
				$rootScope.showExitButton = true;
				$rootScope.isVisibleExit = true;
                $scope.eSanPatientList = "eSanjeevani.eSanPatientList";
                $scope.fetchPatientListText = "eSanjeevani.fetchPatientListText";
                $scope.patientIdText = "eSanjeevani.patientIdText";
                $scope.dobText = "eSanjeevani.dobText";
                $scope.genderText = "eSanjeevani.genderText";
                $scope.noPatientAvail = "eSanjeevani.noPatientAvail";
                $scope.refreshPatientListText = "eSanjeevani.refreshPatientListText";
                $scope.startTestText = "eSanjeevani.startTestText";


			$scope.enableScroll = function(){
			 	$timeout(function(){ 
			        $scope.scroll = new FTScroller(document.getElementById('san_patient_main_container'), {scrollingX: false});
			    },100);
			}
		

            /* E-SANJEEVANI TEST REQUEST LIST FUNCTIONALITY START */
            $scope.eSanjeevaniTestRequestList = function() {
            	$scope.patientList = [];
            	$scope.loadingForDataFetch = true;
                if(localStorage.getItem("flow") == "E-Sanjeevani"){
                    let loginDetails = JSON.parse(localStorage.getItem("op_lo"));
                    $rootScope.operatorPhoneNumber = loginDetails.ulo;
                }
                var formData = {operatorPhoneNumber: $rootScope.operatorPhoneNumber};
            	
                HigiApiService.eSanjeevaniTestRequestList(formData,
                    function (resp) {
                        console.log(resp);
                        $scope.loadingForDataFetch = false;

                        if (resp['success'] == 'true') {
                            angular.forEach(resp['response'], function(val) {
                                val['dob'] = $scope.epochToDate(val['dob']);
                                val['esanjeevaniPatientId'] = val['externalPatientId'].split("-")[0];
                                $scope.patientList.push(val);
                            });
                            $scope.checkInvasiveSocketConnection();
                            $timeout(function(){ 
                                $scope.enableScroll();
                            }, 2000);
                        } else {
                            $scope.noPatientForOperator = true;
                        }

                        $rootScope.patientList = $scope.patientList
                        console.log($scope.patientList);
                    }
                );
            }

            $scope.eSanjeevaniTestRequestList();
            /* E-SANJEEVANI TEST REQUEST LIST FUNCTIONALITY END */

			$scope.fineTunePatientName = function(name) {
                let patientName = name;
                
                if (patientName.search(/&amp;/ig) > -1)
                    patientName =  patientName.replace(/&amp;/ig, " & ").toLowerCase();
                else
                    patientName = patientName.toLowerCase();
                
                if (patientName.length > 27 )
                   return `<span>${patientName}</span>`;
                else
                    return patientName;
            }

            $scope.startTest = function(patientId) {
                $scope.testList = [
                    {name: 'BLOOD_GLUCOSE', label: 'BLOOD GLUCOSE', isSelected: false},
                    {name: 'BLOOD_PRESSURE', label: 'BLOOD PRESSURE', isSelected: false},
                    {name: 'BMI', label: 'BMI', isSelected: false},
                    {name: 'DENGUE', label: 'DENGUE', isSelected: false},
                    {name: 'ECG', label: 'ECG', isSelected: false},
                    {name: 'HCV', label: 'HCV', sSelected: false},
                    {name: 'HEART_RATE', label: 'HEART RATE', isSelected: false},
                    {name: 'HEIGHT', label: 'HEIGHT', isSelected: false},
                    {name: 'HEMOGLOBIN', label: 'HEMOGLOBIN', isSelected: false},
                    {name: 'HIV', label: 'HIV', isSelected: false},
                    {name: 'LIPID_PROFILE', label: 'LIPID PROFILE', isSelected: false},
                    {name: 'MALARIA', label: 'MALARIA', isSelected: false},
                    {name: 'PREGNANCY', label: 'PREGNANCY', isSelected: false},
                    {name: 'PULSE_OXIMETER', label: 'PULSE OXIMETER', isSelected: false},
                    {name: 'TEMPERATURE', label: 'TEMPERATURE', isSelected: false},
                    {name: 'URINE_CHECKUP', label: 'URINE CHECKUP', isSelected: false},
                    {name: 'WEIGHT', label: 'WEIGHT', isSelected: false}
                ];
                $rootScope.externalPatientId = patientId;
                let testRequestListInfo = $scope.patientList.find(x => x.externalPatientId === patientId);
                $rootScope.esanjeevaniPatientId = testRequestListInfo.esanjeevaniPatientId;
                
                angular.forEach(testRequestListInfo['testList'], function(val) {
                    /* WE HAVE RESTRICT THE BMC BECAUSE OF NOT GETTING JSON REQUEST DATA FROM E-SANJEEVANI TEAM */
                    if (val != 'BMC') {
                        let testListData = $scope.testList.find(x => x.name === val);
                        testListData['isSelected'] = true;
                    }
                });
				
                $rootScope.eSanjjevaniTestReq = $scope.testList; 
				$rootScope.loadModal({id:"esanjeevaniReqTestList"});              
            }

            $scope.epochToDate = function(epoch) {
                if (epoch < 10000000000)
                    epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
                var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone
                let dt = new Date(epoch);
                return dt.getDate() + '/' + (dt.getMonth()+1) + '/' + dt.getFullYear();
            }

            $scope.checkInvasiveSocketConnection = function() {
                const socket = new WebSocket("ws://localhost:8444/paramWS/");
                socket.onopen = function(e) {
                    $rootScope.ivtServerConnection = true;
                };
            
                socket.onerror = function(error) {
                    if ($rootScope.invasiveMock == true)
                        $rootScope.ivtServerConnection = true;
                    else
                        $rootScope.ivtServerConnection = false;
                }
            }

}])