higiKioskControllers.directive('genixtelemedicineQuestionnaireModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    

    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/telemedi/genix/genixtelemedicine-questionnaire.html',
        controller :function($scope){

             //var tokenid = "Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImUzMmNlMzE1LTY3OWQtNDE3MS1iMWM3LTAzNjU2OTE4Mzk1OCIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJJSExEZXZpY2UiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL2FjY2Vzc2NvbnRyb2xzZXJ2aWNlLzIwMTAvMDcvY2xhaW1zL2lkZW50aXR5cHJvdmlkZXIiOiJBU1AuTkVUIElkZW50aXR5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiI3YmM4ODdkNi1hNWU3LTRiYzYtODVhMS1hMzI2OThjMmJiODYiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiI1ZWFhMzYzYS04YTdiLTQ5NTAtYjg2Mi1hNzc4ZGQ2NzY1MGNfOTZiMjY4MmMtMjVlOC00MGEyLWEzMzgtOTQ5NjcwYWE1NGMzXzllMTNjMmEwLTNlMTgtNDA5Zi1hMTQ3LWU2NTIwZTI3N2IwNCIsIkZURSI6IjEiLCJuYmYiOjE1NzM1MzM3NDksImV4cCI6MTU3MzU1NTM0OSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1OTgyMiIsImF1ZCI6IjQxNGUxOTI3YTM4ODRmNjhhYmM3OWY3MjgzODM3ZmQxIn0.WwWP1uJYesxANB7ENLLihaB6KVrVHbr97LUWk3nTNLw";
             $scope.inputAlertShow = false;
             $scope.genixtelemedicineQuestionnaire = new Object();

             $scope.genixtelemedicineQuestionnaire.init = function() {
                 $rootScope.genixquestions = new Object();
                 $scope.genixnxtbutton = "global.nxtbutton"; 
                }
           

             $scope.genixQuestionnaireModalBox = function(){     
                 if (HigiKioskStorageService.returnSessionData('genixspeciality')  != undefined ){
                      var json = {};
                      console.log("speciality id"+HigiKioskStorageService.returnSessionData('genixspeciality'));
                      var inputparam = {"SpecialityId":HigiKioskStorageService.returnSessionData('genixspeciality'),"Id":""};   
                      console.log(inputparam);
                      JkioskService.genixQuestionnaireModalBox($scope.genixSpecilalityquestionRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid')); 
                    } 
                }

             $scope.genixSpecilalityquestionRes = function(Res){
                 console.log(Res);
                 var obj = JSON.parse(Res.respose);
                 console.log(obj);
                 $scope.questionAnswerSet = obj;
        
                 console.log($scope.questionAnswerSet.Question);
                 console.log($scope.questionAnswerSet.Answers);

                 $scope.inputQuestions = $scope.questionAnswerSet.Question;
                 $rootScope.inputAnswer = $scope.questionAnswerSet.Answers;

                 $rootScope.newQuestionId = $scope.inputQuestions.Id;  

                 if ($scope.inputQuestions != null && $scope.inputQuestions != undefined && $scope.inputQuestions != "" && $scope.inputQuestions != {}) {
                      $scope.currentQusInputType = $scope.inputQuestions.Type;
                      if ($scope.inputQuestions.Type ==  "Radiolist") {
                           var question = $scope.inputQuestions;
                           $rootScope.genixquestions = {"id":question.Id, "name":question.Name,"is_required": question.IsRequired,"input_type": "radio", "answer": "",isUserAnswer: false};
                           console.log($rootScope.genixquestions);
                        } 

                      if ($scope.inputQuestions.Type ==  "Checkboxlist") {
                           var question = $scope.inputQuestions;
                           $rootScope.genixquestions = {"id":question.Id, "name":question.Name,"is_required": question.IsRequired,"input_type": "checkbox", "answer": "",isUserAnswer: false};
                           console.log($rootScope.genixquestions);
                        } 
                    }  
                }

             
             $scope.genixAnswerSubmit = function(){   
                 $rootScope.questionId = $rootScope.newQuestionId;
                 $rootScope.answerId = $rootScope.genixAnswerId;
                 $scope.checkboxAnswerId = $rootScope.checkboxAnswerArray;
                 var checkboxInputParam = [];
                 if ($scope.currentQusInputType ==  "Radiolist") {
                      if ($rootScope.answerId == undefined || $rootScope.answerId == null) {
                           $scope.inputAlertShow = true;
                           $timeout( function(){
                             $scope.inputAlertShow = false;
                            },3000);   
                        }else{
                           $scope.inputAlertShow = false;
                           var inputparam = '[{"SpecialityId":"'+HigiKioskStorageService.returnSessionData("genixspeciality")+'","PatientId":"92759d2a-1e7f-4800-859e-1a4b9a423a47","QuestionSetId":"'+$rootScope.questionId+'","AnswerId":"'+$rootScope.answerId+'"}]';
                           console.log(inputparam);
                           JkioskService.genixAnswerSubmit($scope.genixAnswerSubmitRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));  
                        }  
                    }

                 if ($scope.currentQusInputType ==  "Checkboxlist") {
                      if ($scope.checkboxAnswerId == [] || $scope.checkboxAnswerId == null || $scope.checkboxAnswerId == undefined) {
                           $scope.inputAlertShow = true;
                           $timeout( function(){
                             $scope.inputAlertShow = false;
                           },3000);
                        }else{
                           $scope.inputAlertShow = false;
                           for (var i = 0; i < $scope.checkboxAnswerId.length; i++) {
                                checkboxInputParam.push({
                                    SpecialityId: HigiKioskStorageService.returnSessionData("genixspeciality"),
                                    PatientId: "92759d2a-1e7f-4800-859e-1a4b9a423a47",
                                    QuestionSetId: $rootScope.questionId,
                                    AnswerId: $scope.checkboxAnswerId[i]
                                });
                            }
                            console.log(checkboxInputParam);
                            var inputparam = JSON.stringify(checkboxInputParam);
                            console.log(inputparam);
                            JkioskService.genixAnswerSubmit($scope.genixAnswerSubmitRes,inputparam,HigiKioskStorageService.returnSessionData('genixTokenid'));
                        }  
                    }
                 //var inputparam = JSON.parse('[{"SpecialityId":"'+HigiKioskStorageService.returnSessionData("genixspeciality")+'","PatientId":"92759d2a-1e7f-4800-859e-1a4b9a423a47","QuestionSetId":"'+questionId+'","AnswerId":"'+answerId+'"}]');   
                 //var inputparam =  [{"SpecialityId":"efb96111-d79a-42de-9db6-a381976ced59","PatientId": "92759d2a-1e7f-4800-859e-1a4b9a423a47","QuestionSetId":"aab02596-5158-4c3f-a713-b2ac05271371","AnswerId":"4ad91e1c-3718-4e0f-bc15-6ea4caa4401d"}];
                }

             $scope.genixAnswerSubmitRes = function(Res){
                 console.log(Res);
                 var obj = JSON.parse(Res.respose);
                 console.log(obj);
                 $scope.newQuestionAnswerSet = obj;
                 if ($scope.newQuestionAnswerSet.Question != null && $scope.newQuestionAnswerSet.Question != undefined && $scope.newQuestionAnswerSet.Answers != [] && $scope.newQuestionAnswerSet.Answers != undefined && $scope.newQuestionAnswerSet.Answers != null){
                      $rootScope.genixAnswerId = null;
                      $rootScope.checkboxAnswerArray = null;
                      console.log($scope.newQuestionAnswerSet.Question);
                      console.log($scope.newQuestionAnswerSet.Answers);

                      $scope.newInputQuestions = $scope.newQuestionAnswerSet.Question;
                      $rootScope.inputAnswer = $scope.newQuestionAnswerSet.Answers;
                 
                      $rootScope.newQuestionId = $scope.newInputQuestions.Id;  
                 
                      if ($scope.newInputQuestions != null && $scope.newInputQuestions != undefined && $scope.newInputQuestions != "" && $scope.newInputQuestions != {}) {
                           $scope.currentQusInputType = $scope.newInputQuestions.Type;
                           if ($scope.newInputQuestions.Type ==  "Radiolist") {
                                var question = $scope.newInputQuestions;
                                $rootScope.genixquestions = {"id":question.Id, "name":question.Name,"is_required": question.IsRequired,"input_type": "radio", "answer": "",isUserAnswer: false};
                                console.log($rootScope.genixquestions);
                            } 

                           if ($scope.newInputQuestions.Type ==  "Checkboxlist") {
                                var question = $scope.newInputQuestions;
                                $rootScope.genixquestions = {"id":question.Id, "name":question.Name,"is_required": question.IsRequired,"input_type": "checkbox", "answer": "",isUserAnswer: false};
                                console.log($rootScope.genixquestions);
                            } 
                        } 
                    } else{
                        //alert("question answer set completed");
                        window.location = "#/providerlist";
                        $rootScope.clearModal();
                    }
                }

                  $rootScope.genixSpecialistIdRes =  $scope.genixQuestionnaireModalBox;

            
                  $scope.genixtelemedicineQuestionnaire.init();         
        }
    };
}]);