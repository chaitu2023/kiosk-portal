 higiKioskControllers.directive('bcWaistCircumstanceModal', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/body-comp-waist-circumstanceInput.html',
        link :function(scope, elem, attr){
            scope.bcWaistCircumstance = new Object();

            scope.bcWaistCircumstance.init = function() {
                //Set localization fields
                scope.bcWaistCircumstance.enterwaistcir = "welcomeModalswelcomeModals.enterwaistcir";
                scope.disabled = true;
                scope.bcWaistCircumstance.activeInches = "";
                    //scope.bcWaistCircumstance.feetLabel = 'height01.ft';
                scope.bcWaistCircumstance.inchesLabel = 'height01.inch';
                    //Modifications here
                scope.bcWaistCircumstance.cmsLabel = 'height01.cms';
                scope.bcWaistCircumstance.begin = "bodycomp.begin";
                scope.bcWaistCircumstance.questionThree = "bodycomp.question.three";
                scope.bcWaistCircumstance.skip = "welcomeModals.skip";
                scope.bcWaistCircumstance.next = "welcomeModals.next";
                scope.bcWaistCircumstance.INCH = 'height01.inch';
                scope.bcWaistCircumstance.CM = 'height01.cm';
                scope.bcWaistCircumstance.Unit = 'height01.inch';
                scope.bcWaistCircumstance.fields = [
                    {id : "waistcir" , defaultText :scope.bcWaistCircumstance.enterwaistcir, text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){scope.bcWaistCircumstance.waistValue(this)}, usesPlaceholder : true}
                ];
                 $rootScope.fields.bcWaistCircumstance = scope.bcWaistCircumstance.fields;

            };


            scope.bcWaistCircumstance.waistValue = function(value){
                console.log(value.text);
                scope.waistCircumstanceValue = value.text;
                if(scope.waistCircumstanceValue >= 26 && scope.waistCircumstanceValue <= 40){
                    scope.disabled = false;
                    document.getElementById("incherrorTxt").innerHTML = "";
                    document.getElementById("cmerrorTxt").innerHTML = "";
                }else if(scope.waistCircumstanceValue == ""){
                    scope.disabled = true;
                    document.getElementById("incherrorTxt").innerHTML = "";
                    document.getElementById("cmerrorTxt").innerHTML = "";
                }else{
                    document.getElementById("incherrorTxt").innerHTML = "Invalid waist Circumstance in inches; [Normal Ranges lies between 26 to 40]";
                    document.getElementById("incherrorTxt").style.color = "red";
                    document.getElementById("cmerrorTxt").innerHTML = "";
                }
            }

                scope.cmChecked = false;
                scope.InchClass = "swith_inch";
                scope.CmClass = "switch_cm_active";
                scope.bcWaistCircumstance.CmInchSlide = function() {
                    //alert("coming");
                    scope.cmChecked = !scope.cmChecked;
                    if (scope.cmChecked) {
                        scope.InchClass = "swith_inch";
                        scope.CmClass = "switch_cm_active";
                        scope.bcWaistCircumstance.showSelectValue("CM");
                    } else {
                        scope.InchClass = "swith_inch_active";
                        scope.CmClass = "switch_cm";
                        scope.bcWaistCircumstance.showSelectValue("INCH");
                    }
                }


                scope.waistValueInINCHES = "";
                scope.waistValueInCMS = "";
                scope.bcWaistCircumstance.showSelectValue = function(select_inch_cms) {

                    //scope.heightCm = new Object();

                    if (select_inch_cms == "CM") {
                        //alert("cm");
                        scope.bcWaistCircumstance.cmORinch = select_inch_cms;
                        /*if(select_inch_cms == "INCH"){
                            scope.waistValueInINCHES = scope.waistCircumstanceValue;
                        }else{
                            scope.waistValueInINCHES = scope.waistValueInINCHES;
                        }*/
                        scope.waistValueInINCHES = scope.waistCircumstanceValue;
                        if(scope.waistValueInINCHES >= 26 && scope.waistValueInINCHES <= 40){
                          scope.waistValueInCMS = scope.waistValueInINCHES * 2.54;
                          document.getElementById('waistcir').value = scope.waistValueInCMS; 
                          document.getElementById("cmerrorTxt").innerHTML = "";
                          document.getElementById("incherrorTxt").innerHTML = "";
                          scope.disabled = false;
                        }else{
                            document.getElementById("cmerrorTxt").innerHTML = "Invalid waist Circumstance for cms; [Normal Ranges lies between 66 to 102]";
                            document.getElementById("cmerrorTxt").style.color = "red";
                            document.getElementById("waistcir").value = ""; 
                            document.getElementById("incherrorTxt").innerHTML = "";
                        }
                        
                        //scope.cmShow = true;
                        scope.bcWaistCircumstance.activeCms = "active";
                        //angular.element("#height_cm").focus();
                        angular.element(".height_cms_label").addClass("height_cms_label_active");

                    } else {
                        //alert("Inch");
                         scope.bcWaistCircumstance.cmORinch = select_inch_cms;
                         /*if(select_inch_cms == "CM"){
                            scope.waistValueInCMS = scope.waistValueInINCHES;
                        }else{
                            scope.waistValueInCMS = scope.waistCircumstanceValue;
                            
                        }*/
                        if(scope.waistValueInCMS >= 66 && scope.waistValueInCMS <= 102){
                          scope.waistValueInINCHES = scope.waistValueInCMS * 0.3937;
                          document.getElementById('waistcir').value = scope.waistValueInINCHES;
                          document.getElementById("incherrorTxt").innerHTML = "";
                          scope.disabled = false;
                        }else{
                            document.getElementById("incherrorTxt").innerHTML = "Invalid waist Circumstance for inches; [Normal Ranges lies between 26 to 40]";
                            document.getElementById("incherrorTxt").style.color = "red";
                            document.getElementById("waistcir").value = "";
                        }

                        
                        //scope.cmShow = false;
                        scope.bcWaistCircumstance.activateInches();

                    }
                };

                scope.bcWaistCircumstance.activateInches = function() {
                    scope.bcWaistCircumstance.activeInches = "active";
                };


            scope.bcWaistCircumstance.showWaistCir = function (defaulting) {  
                    $rootScope.focusField(scope.bcWaistCircumstance.fields[0]);
                    scope.bcWaistCircumstance.waistValue(scope.bcWaistCircumstance.fields[0]);     
                };

                scope.nextButton = function(){
                    console.log(scope.waistCircumstanceValue);
                    //alert(scope.waistCircumstanceValue);
                    //alert("next");
                    //implant and pregnancy if female modals 
                    if(scope.waistCircumstanceValue >= 26 && scope.waistCircumstanceValue <= 40){
                    scope.disabled = false;
                }else if(scope.waistValueInINCHES >= 26 && scope.waistValueInINCHES <= 40){
                    scope.disabled = false;
                }else if(scope.waistValueInCMS >= 66 && scope.waistValueInCMS <= 102){
                    scope.disabled = false;
                }
                    
                    $rootScope.init();
                    $rootScope.clearModal();
                }
                scope.skipButton = function(){
                    console.log("skip");
                    //alert("next");
                    $rootScope.clearModal();
                    //call skip fun in bmc
                }


            $rootScope.bcWaistCircumstanceInit = scope.bcWaistCircumstance.showWaistCir;

            scope.bcWaistCircumstance.init();

        }


    };
}]);

 