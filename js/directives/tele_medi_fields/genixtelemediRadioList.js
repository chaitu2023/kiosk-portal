angular
    .module("higiKioskUi")
    .directive("genixtelemediRadioList", ['$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/genix_tele_medi_radiobtn.html',
            scope : {
            teleradiogenix : "="
            },



            link : function (scope, element, attr) {
                    
              scope.focusFieldYes = function(result){
                 console.log(result);
                 console.log($rootScope.inputAnswer);
                 var finalAnswerId = $rootScope.inputAnswer.filter(obj => {
                      return obj.Name === "Yes" 
                   })
                 $rootScope.genixAnswerId = finalAnswerId[0].Id;
                 console.log($rootScope.genixAnswerId);
                }

              scope.focusFieldNo = function(result){
                 console.log(result);
                 console.log($rootScope.inputAnswer);
                 var finalAnswerId = $rootScope.inputAnswer.filter(obj => {
                      return obj.Name === "No"
                    })
                 $rootScope.genixAnswerId = finalAnswerId[0].Id;
                 console.log($rootScope.genixAnswerId);
                } 
            }
        }
    }]);



