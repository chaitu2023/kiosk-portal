angular
    .module("higiKioskUi")
    .directive("genixtelemediCheckList", ['$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/genix_tele_medi_checkbox.html',
            scope : {
            telecheckgenix : "="
            },



            link : function (scope, element, attr) {
                    
                scope.newLabels = $rootScope.inputAnswer;
                scope.labelArr = [];
                scope.CheckLabels = function(labels){
                    if (scope.newLabels.length != 0 && scope.newLabels != null && scope.newLabels != undefined) {
                       for (var i = 0; i < scope.newLabels.length; i++) {
                            if (labels.Id == scope.newLabels[i].Id) {
                                console.log("label id  "+ scope.newLabels[i].Id);
                                console.log("clicked label id  "+labels.Id);
                                if (document.getElementById(labels.Id).checked) {
                                    scope.labelArr.push(labels.Id); 
                                }else {
                                    for (var k = 0; k < scope.labelArr.length; k++) {
                                        if (scope.labelArr[k] === labels.Id) {
                                            scope.labelArr.splice(k, 1);
                                        }
                                    }
                                }     
                            }
                        }
                         console.log(scope.labelArr);  
                         $rootScope.checkboxAnswerArray = scope.labelArr;
                         console.log($rootScope.checkboxAnswerArray);
                    }
                }
            }
        }
    }]);



