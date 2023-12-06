angular
    .module("higiKioskUi")
    .directive("telemediRadioField", ['$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/tele_medi_radiobtn.html',
            scope : {
            teleradio : "="
            },



            link : function (scope, element, attr) {

                scope.NO ="global.no";
                scope.YES ="global.yes";
                
                scope.focusRadioYes = function(fieldObj){
                    for(var i = 0; i < Object.keys($rootScope.telemediSlideQue).length; i++ ){
                        for(var j = 0; j < Object.keys($rootScope.telemediSlideQue[i].questions).length; j++){
                            if($rootScope.telemediSlideQue[i].questions[j].id == fieldObj.id){
                                $rootScope.telemediSlideQue[i].questions[j].answer = "yes";
                            }
                        }
                    }
                  //  console.log($rootScope.telemediSlideQue);
                }

                scope.focusRadioNo = function(fieldObj){
                    for(var i = 0; i < Object.keys($rootScope.telemediSlideQue).length; i++ ){
                        for(var j = 0; j < Object.keys($rootScope.telemediSlideQue[i].questions).length; j++){
                            if($rootScope.telemediSlideQue[i].questions[j].id == fieldObj.id){
                                $rootScope.telemediSlideQue[i].questions[j].answer = "no";
                            }
                        }
                    }
                    //console.log($rootScope.telemediSlideQue);
                }

            }
        }
    }]);



