//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("waistCircumferenceNumpad", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/waist-circumference-numpad.html',
            scope: "=",
            link: function(scope, elem, attr) {
                scope.heightNumberPad = new Object();

                scope.cmChecked = false;
                scope.FtClass = "swith_ft_active";
                scope.CmClass = "switch_cm";
                scope.CmFtSlide = function() {
                    scope.cmChecked = !scope.cmChecked;
                        scope.FtClass = "swith_ft";
                        scope.CmClass = "switch_cm_active";
                        scope.heightNumberPad.showSelectValue("CM");
                }

            
                scope.heightNumberPad.activateInches = function(ele) {
                    if (ele === undefined || ele === 'Input') {
                        scope.heightNumberPad.inchesPanel = false;
                        scope.heightNumberPad.cmsVal = "";
                        scope.heightInches = "";

                        scope.heightNumberPad.cmPanel = true;
                        scope.heightNumberPad.activeField = true;
                        scope.heightInches = null;
                        scope.heightNumberPad.cmVal = "";
                        one = "";
                        scope.heightNumberPad.activeCms = "active";
                        scope.FtClass = "swith_ft";
                        scope.CmClass = "switch_cm_active";
                        scope.heightNumberPad.showSelectValue("CM");
                        var inputEnd = (scope.heightNumberPad.cmVal != undefined) ? scope.heightNumberPad.cmVal.length : 0;
                        document.getElementById("height_cm").setSelectionRange(inputEnd, inputEnd);
                    } else {
                            scope.heightNumberPad.activateInches();
                        
                    }
                };
                //Modifications here
                scope.heightNumberPad.showSelectValue = function(select_feet_cms) {

                    scope.heightCm = new Object();
                        scope.heightNumberPad.feet_reference = false;
                        scope.heightNumberPad.cmsData = "";
                        angular.element("#height_ft,#height_in").val("");
                        angular.element("#height_ft,#height_in").removeClass("valid");
                        angular.element("#height_ft,#height_in").addClass("element_none");
                        angular.element(".height_ref label").addClass("element_none");
                        angular.element(".height_ref input").removeClass("active");
                        angular.element(".line_for_delete").addClass("cm_del_add");
                        angular.element(".line2_for_delete").addClass("cm_line2_add");
                        angular.element(".height_ft_del button").addClass("cm_ft_add");
                        angular.element("#height_cm").addClass("cm_input_active");
                        scope.heightNumberPad.activeCms = "active";
                        angular.element(".height_cms_label").addClass("height_cms_label_active");


                        scope.heightNumberPad.cmPanel = true;
                        scope.heightNumberPad.inchesPanel = false;
                        scope.heightNumberPad.cmsVal = "";
                        scope.heightInches = "";
                        one = "";
                        scope.nextVisible = false;
                        console.log(scope.cmChecked);
                        if(scope.cmChecked == false)
                        {
                            scope.cmShow = false;
                            scope.inchShow = true;
                            //scope.heightNumberPad.inchKeyClick($event);

                        }
                        else{
                            scope.inchShow = false;
                            scope.cmShow = true;

                        }

                        scope.heightNumberPad.activeField = true;

                        scope.heightNumberPad.activeCms = (scope.heightNumberPad.cmsVal == null) ? "" : "valid";


                    
                }; 


                var one = '';

                scope.heightNumberPad.inchKeyClick = function($element) {



                    if (scope.heightNumberPad.activeField) {
                        scope.heightNumberPad.inchVal = parseInt($element.target.text);

                        scope.heightNumberPad.inchData += scope.heightNumberPad.inchVal;
                        if (scope.heightNumberPad.inchData.length < 4) {
                            scope.heightNumberPad.inchVal = scope.heightNumberPad.inchData;
                            var height_inch_value = scope.heightNumberPad.inchVal;

                            if (height_inch_value.length != 0) {
                                scope.nextVisible = true;
                                scope.inchValid = false;
                            }

                            if (height_inch_value.length === 0) {
                                scope.inchValid = false;
                            }

                        }
                        if (scope.heightNumberPad.inchVal.length < 4 || scope.heightNumberPad.inchData.length > 3) {
                            if (scope.heightNumberPad.inchData > 3) {
                                scope.heightNumberPad.inchVal = scope.heightNumberPad.inchData.toString().substring(0, 3);

                            }
                            if (scope.heightNumberPad.inchVal.length == 3) {
                            }
                        }
                        if (scope.heightNumberPad.inchVal === '0' || scope.heightNumberPad.inchVal === '00' || scope.heightNumberPad.inchVal === '000' || scope.heightNumberPad.inchVal < 20 || scope.heightNumberPad.inchVal > 55) {
                            scope.nextVisible = false;
                            scope.inchValid = true;
                            
                        } else {
                            
                        }


                    }
                };
                // Modifications here
                scope.heightNumberPad.deleteCmsInputs = function() {
                    scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsVal.slice(0, -1);
                    scope.heightNumberPad.cmsData = scope.heightNumberPad.cmsVal;
                    scope.nextVisible = false;
                    scope.heightNumberPad.activeField = true;

                    if (scope.heightNumberPad.cmsData < 50 || scope.heightNumberPad.cmsData > 140) {
                        scope.nextVisible = false;
						angular.element("#confirm_btn_cms").removeClass("active_btn");
                        if (scope.heightNumberPad.cmsData.length === 0) {						
                            scope.cmValid = false;
                        } else {
                            scope.cmValid = true;
                        }
                    } else {
						angular.element("#confirm_btn_cms").addClass("active_btn");
                        scope.cmValid = false;
                        scope.nextVisible = true;
                    }
                }; 

                //Modifications here newly added function
                scope.heightNumberPad.cmsKeyClick = function($element) {
                    if(scope.cmChecked == true)
                        {
                    if (scope.heightNumberPad.activeField) {
                        scope.heightNumberPad.cmsVal = parseInt($element.target.text);

                        scope.heightNumberPad.cmsData += scope.heightNumberPad.cmsVal;
                        if (scope.heightNumberPad.cmsData.length < 4) {
                            scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData;
                            var height_cm_value = scope.heightNumberPad.cmsVal;

                            if (height_cm_value.length != 0) {
                                scope.nextVisible = true;
                                scope.heightNumberPad.saveHeightForCms();
                            }

                            if (height_cm_value.length === 0) {
                                scope.cmValid = false;
                            }

                        }
                        if (scope.heightNumberPad.cmsVal.length < 4 || scope.heightNumberPad.cmsData.length > 2) {
                            if (scope.heightNumberPad.cmsData > 3) {
                                scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData.toString().substring(0, 3);

                            }
                            if (scope.heightNumberPad.cmsVal.length == 2) {
                            }
                        }
                        if (scope.heightNumberPad.cmsVal === '0' || scope.heightNumberPad.cmsVal === '00' || scope.heightNumberPad.cmsVal === '000' || scope.heightNumberPad.cmsVal < 50 || scope.heightNumberPad.cmsVal > 140) {
                            scope.nextVisible = false;
                            scope.cmValid = true;
							
							angular.element("#confirm_btn_cms").removeClass("active_btn");
                        } else {
							
                            scope.cmValid = false;
							angular.element("#confirm_btn_cms").addClass("active_btn");
                            scope.heightNumberPad.saveHeightForCms();
                        }


                    }
                }else{
                    if (scope.heightNumberPad.activeField) {
                        scope.heightNumberPad.cmsVal = parseInt($element.target.text);

                        scope.heightNumberPad.cmsData += scope.heightNumberPad.cmsVal;
                        if (scope.heightNumberPad.cmsData.length < 3) {
                            scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData;
                            var height_cm_value = scope.heightNumberPad.cmsVal;

                            if (height_cm_value.length != 0) {
                                scope.nextVisible = true;
                                scope.heightNumberPad.saveHeightForCms();
                            }

                            if (height_cm_value.length === 0) {
                                scope.inchValid = false;
                            }

                        }
                        if (scope.heightNumberPad.cmsVal.length < 3 || scope.heightNumberPad.cmsData.length > 2) {
                            if (scope.heightNumberPad.cmsData > 2) {
                                scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData.toString().substring(0, 2);

                            }
                            if (scope.heightNumberPad.cmsVal.length == 2) {
                            }
                        }
                        if (scope.heightNumberPad.cmsVal === '0' || scope.heightNumberPad.cmsVal === '00' || scope.heightNumberPad.cmsVal === '000' || scope.heightNumberPad.cmsVal < 20 || scope.heightNumberPad.cmsVal > 55) {
                            scope.nextVisible = false;
                            scope.inchValid = true;
                            
                            angular.element("#confirm_btn_cms").removeClass("active_btn");
                        } else {
                            
                            scope.inchValid = false;
                            angular.element("#confirm_btn_cms").addClass("active_btn");
                            scope.heightNumberPad.saveHeightForCms();
                        }


                    }
                }

                }; 

                scope.heightNumberPad.saveHeight = function() {
                    var feetInches = scope.heightInches;
                    if(feetInches.length >1){
                    var heightTotalMeters = feetInches / 0.24;
                    HigiKioskStorageService.saveSessionData("waistcircumference", heightTotalMeters);
}
                };
                //Modifications here
                scope.heightNumberPad.saveHeightForCms = function() {
                    if(scope.cmChecked == false && scope.heightNumberPad.cmsVal.length > 1){
                       var heightTotalCms = scope.heightNumberPad.cmsVal*2.54;
                       HigiKioskStorageService.saveSessionData("waistcircumference", heightTotalCms);
                    }
                    else if(scope.cmChecked == true && scope.heightNumberPad.cmsVal.length > 1){
                    HigiKioskStorageService.saveSessionData("waistcircumference", scope.heightNumberPad.cmsVal);
}
                }; 

                scope.heightNumberPad.unsetSessionHeight = function() {
                    HigiKioskStorageService.saveSessionData("waistcircumference", undefined);
                };
                scope.heightNumberPad.removeFocus = function() {
                    document.getElementById("height_in").blur();
                    document.getElementById("height_ft").blur();
                    scope.heightNumberPad.activeInches = (scope.heightInches === null) ? "" : "valid";
                    scope.heightNumberPad.activeField = false;
                };
                //Modifications here
                scope.heightNumberPad.removeFocusForCms = function() {
                    document.getElementById("height_cm").blur();
                    scope.heightNumberPad.activeField = false;
                }; 

                scope.heightNumberPad.setButtonValid = function(valid) {
                    if (attr.useparent == "true") {
                        scope.$parent[attr.waistCircumferenceset] = valid;
                    } else {
                        scope[attr.waistCircumferenceset] = valid;
                    }
                };

                scope.heightNumberPad.validateHeight = function() {

                    //Modification here
                    if (scope.heightNumberPad.cmsVal !== null && scope.heightNumberPad.cmsVal !== undefined ) {
						
                        scope.heightNumberPad.activeCms = "valid";
                        scope.heightNumberPad.removeFocusForCms();
                        scope.heightNumberPad.saveHeightForCms();
                    } 
                    else if (scope.heightInches !== null) {
                        scope.heightNumberPad.setButtonValid(true);
                        scope.heightNumberPad.activeInches = "valid";
                        scope.heightNumberPad.removeFocus();
                        scope.heightNumberPad.saveHeight();
                    } else {
                        scope.heightNumberPad.setButtonValid(false);
                        scope.heightNumberPad.activeInches = "valid";
                        scope.heightNumberPad.activeInches();
                    }
                };
                scope.heightNumberPad.init = function() {
                    scope.heightNumberPad.heightData = HigiKioskStorageService.returnSessionData('height');
                    scope.heightNumberPad.activeInches = "";
                    scope.heightNumberPad.feetLabel = 'inch';
                    scope.heightNumberPad.inchesLabel = 'height01.inch';
                    //Modifications here
                    scope.heightNumberPad.cmsLabel = 'height01.cms';
                    scope.heightNumberPad.FT = 'height01.ft';
                    scope.heightNumberPad.CM = 'height01.cm';
                    scope.heightNumberPad.cmValidErrormessage = 'height01.cmValidErrormessage';
                    
                    scope.heightNumberPad.cmPanel = true;

                    scope.heightNumberPad.padEnterLeft = "numpad-enter-left";
                    scope.heightNumberPad.padExitLeft = "numpad-exit-left";
                    scope.heightNumberPad.padEnterRight = "numpad-enter-right";
                    scope.heightNumberPad.padExitRight = "numpad-exit-right";
                    scope.heightNumberPad.heightData = undefined;

                    if (scope.heightNumberPad.heightData == undefined) {
                        scope.heightInches = null;
                        scope.heightNumberPad.activateInches();

                    } else {
                        scope.heightNumberPad.cmPanel = true;
                        scope.heightInches = HigiKioskUtilitiesService.convertToFeetInches(scope.heightNumberPad.heightData);
                        scope.heightNumberPad.inchVal = scope.heightInches; //+ "\"";
                    }
                    scope.heightNumberPad.inchesWatch = scope.$watch('heightInches', function(newVal, oldVal) {
                        if (newVal === null) {
                            scope.heightNumberPad.setButtonValid(false);
                        }
                    });
                };
                scope.heightNumberPad.init();

            }
        }
    }]);