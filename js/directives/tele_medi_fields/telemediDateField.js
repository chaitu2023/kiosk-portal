angular
    .module("higiKioskUi")
    .directive("telemediDateField", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiApiService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, HigiApiService, JkioskService, $timeout) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/tele_medi_date.html',
            scope : {
            teledate : "="
            },



            link : function (scope, element, attr) {
                
                scope.interfaceLabels = scope.$parent.interfaceLabels;
                scope.emailTextfieldClearButton = $rootScope.emailTextfieldClearButton;
                scope.enabledCursor = $rootScope.enabledCursor;
                scope.selctanswer = "global.telemedi.selctanswer";

               scope.arrlist = [{

                            "id": 1,

                            "name": "Before a Week",
                            "value": "before_a_week"

                            }, {

                            "id": 2,

                            "name": "Before a Month",
                            "value": "before_a_month"

                            }, {

                            "id": 3,

                            "name": "Before six Months",
                            "value": "before_six_months"

                            },{

                            "id": 4,

                            "name": "More than a year",
                            "value": "more_than_a_year"

                        }];

                        scope.showSelectValue = function(mySelect,teledate) {
                            console.log(mySelect);
                            console.log(teledate.id);

                            scope.datestring = mySelect;

                            var today = new Date();

                            //var date = today.getDate()+'-'+(today.getMonth() < 9 ? '0': '') + (today.getMonth()+1)+'-'+today.getFullYear();
                            
                            if(scope.datestring == "before_a_week"){
                                today.setDate(today.getDate() - 7);
                                var weekbeforedate;
                                 if(today.getMonth() == 0){
                                  weekbeforedate = ('0' + today.getDate()).slice(-2)+'/'+12+'/'+today.getFullYear();
                                 }else{
                                  weekbeforedate = ('0' + today.getDate()).slice(-2)+'/'+(today.getMonth() < 9 ? '0': '') + (today.getMonth()+1)+'/'+today.getFullYear();  
                                 }
                                console.log(weekbeforedate);
                                scope.dateinteger = weekbeforedate;
                            }else if(scope.datestring == "before_a_month"){
                                today.setMonth(today.getMonth()+1-1);
                                var monthbeforedate;
                                if(today.getMonth() == 0){
                                  monthbeforedate = ('0' + today.getDate()).slice(-2)+'/'+12+'/'+today.getFullYear();  
                                } else
                                {
                                 monthbeforedate = ('0' + today.getDate()).slice(-2)+'/'+(today.getMonth() < 9 ? '0': '') + (today.getMonth())+'/'+today.getFullYear();   
                                }  
                                console.log(monthbeforedate);
                                scope.dateinteger = monthbeforedate;
                            }else if(scope.datestring == "before_six_months"){
                                today.setMonth(today.getMonth()+1-6);
                                var sixmonthbeforedate;
                                if(today.getMonth() == 0){   
                                 sixmonthbeforedate = ('0' + today.getDate()).slice(-2)+'/'+12+'/'+today.getFullYear();
                                } else
                                {
                                 sixmonthbeforedate = ('0' + today.getDate()).slice(-2)+'/'+(today.getMonth() < 9 ? '0': '') + (today.getMonth())+'/'+today.getFullYear();   
                                }
                                console.log(sixmonthbeforedate);
                                scope.dateinteger = sixmonthbeforedate;
                            }else if(scope.datestring == "more_than_a_year"){
                                today.setFullYear(today.getFullYear()-1);
                                var ayearbefore;
                                 if(today.getMonth() == 0){
                                  ayearbefore = ('0' + today.getDate()).slice(-2)+'/'+12+'/'+today.getFullYear();
                                }else{
                                  ayearbefore = ('0' + today.getDate()).slice(-2)+'/'+(today.getMonth() < 9 ? '0': '') + (today.getMonth()+1)+'/'+today.getFullYear();  
                                }
                                console.log(ayearbefore);
                                scope.dateinteger = ayearbefore;
                            } else {
                                scope.dateinteger = "";
                            }


                            for(var i = 0; i < Object.keys($rootScope.telemediSlideQue).length; i++ ){
                                for(var j = 0; j < Object.keys($rootScope.telemediSlideQue[i].questions).length; j++){
                                    if($rootScope.telemediSlideQue[i].questions[j].id == teledate.id){
                                       $rootScope.telemediSlideQue[i].questions[j].answer =  scope.dateinteger;
                                        console.log("final output"+  $rootScope.telemediSlideQue[i].questions[j].answer);
                                    }
                                }
                            }
                        }

            }
        }
    }]);


