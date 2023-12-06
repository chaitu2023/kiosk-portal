angular
    .module("higiKioskUi")
    .directive("telemediCheckField", ['$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/tele_medi_checkbox.html',
            scope : {
            telecheck : "="
            },



            link : function (scope, element, attr) {
                //var checkBoxValArr = [];
                scope.focusCheckBox = function(fieldObj, FocusVal){
                    console.log(fieldObj);
                    console.log(FocusVal);
                    for(var i = 0; i < Object.keys($rootScope.telemediSlideQue).length; i++ ){
                        for(var j = 0; j < Object.keys($rootScope.telemediSlideQue[i].questions).length; j++){
                            if($rootScope.telemediSlideQue[i].questions[j].id == fieldObj.id){

                                if (document.getElementById("telemedi_"+FocusVal).checked) {
                                    fieldObj.answer.push(FocusVal); 
                                }
                                else {
                                  for (var k = 0; k < fieldObj.answer.length; k++) {
                                    if (fieldObj.answer[k] === FocusVal) {
                                      fieldObj.answer.splice(k, 1);
                                      if(fieldObj.answer[k] != undefined){
                                      fieldObj.answer.splice(k, 1);  
                                    }
                                    }
                                  }
                                }
                                console.log(fieldObj.answer);
                                $rootScope.telemediSlideQue[i].questions[j].answer = fieldObj.answer;
                            }
                        }
                    }
                    console.log($rootScope.telemediSlideQue);
                }

            }
        }
    }]);