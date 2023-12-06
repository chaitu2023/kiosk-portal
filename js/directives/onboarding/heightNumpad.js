//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("heightNumpad", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/height-numpad.html',
            scope: "=",
            link: function(scope, elem, attr) {
                scope.heightNumberPad = new Object();

                scope.cmChecked = false;
                scope.FtClass = "swith_ft_active";
                scope.CmClass = "switch_cm";
                scope.CmFtSlide = function() {
                    scope.cmChecked = !scope.cmChecked;
                    if (scope.cmChecked) {
                        scope.FtClass = "swith_ft";
                        scope.CmClass = "switch_cm_active";
                        scope.heightNumberPad.showSelectValue("CM");
                    } else {
                        scope.FtClass = "swith_ft_active";
                        scope.CmClass = "switch_cm";
                        scope.heightNumberPad.showSelectValue("FT");
                    }
                }

                scope.heightNumberPad.activateFeet = function() {
                    scope.heightNumberPad.inchesPanel = false;
                    scope.heightNumberPad.feetPanel = true;
                    scope.heightNumberPad.activeField = true;
                    scope.heightFeet = null;
                    scope.heightNumberPad.feetVal = "";
                    scope.heightNumberPad.activeFeet = "active";
                    scope.heightNumberPad.activeInches = (scope.heightInches === null) ? "" : "valid";
                    //Force cursor to end of input
                    var inputEnd = (scope.heightNumberPad.feetVal != undefined) ? scope.heightNumberPad.feetVal.length : 0;
                    document.getElementById("height_ft").setSelectionRange(inputEnd, inputEnd);
                    document.getElementById("height_ft").focus();
                    //Modifications here
                    //angular.element(".height_ft_del button").removeClass("act_inch_btn");
                    //angular.element(".line_for_delete").removeClass("act_inch_line");
                    //angular.element(".line2_for_delete").removeClass("act_inch_line2");
                };
                scope.heightNumberPad.activateInches = function(ele) {
                    //modifications here
                    if (ele === undefined || ele === 'Input') {
                        //here
                        scope.heightNumberPad.inchesPanel = true;
                        scope.heightNumberPad.feetPanel = false;
                        scope.heightNumberPad.activeField = true;
                        scope.heightInches = null;
                        scope.heightNumberPad.inchVal = "";
                        one = "";
                        scope.heightNumberPad.activeFeet = (scope.heightFeet === null) ? "" : "valid";
                        scope.heightNumberPad.activeInches = "active";
                        //Force cursor to end of input
                        var inputEnd = (scope.heightNumberPad.inchVal != undefined) ? scope.heightNumberPad.inchVal.length : 0;
                        document.getElementById("height_in").setSelectionRange(inputEnd, inputEnd);
                        document.getElementById("height_in").focus();
                        //Modifications here
                        // angular.element(".height_ft_del button").addClass("act_inch_btn");
                        // angular.element(".line_for_delete").addClass("act_inch_line");
                        // angular.element(".line2_for_delete").addClass("act_inch_line2");
                    } else {
                        if (scope.heightNumberPad.inchVal != "") {
                            scope.heightNumberPad.activateInches('Input');
                        } else {
                            scope.heightNumberPad.activateFeet();
                        }
                    }
                };
                //Modifications here
                scope.heightNumberPad.showSelectValue = function(select_feet_cms) {

                    scope.heightCm = new Object();

                    if (select_feet_cms == "CM") {
                        scope.heightNumberPad.feet_reference = false;
                        scope.heightNumberPad.cmsData = "";
                        angular.element("#height_ft,#height_in").val("");
                        angular.element("#height_ft,#height_in").removeClass("valid");

                        //angular.element("#higi_control_right_ng_btn").removeClass("button-enter-right");
                        //angular.element("#higi_control_right_ng_btn").addClass("ng-hide button-exit-right");

                        angular.element("#height_ft,#height_in").addClass("element_none");
                        angular.element(".height_ref label").addClass("element_none");
                        angular.element(".height_ref input").removeClass("active");
                        angular.element(".line_for_delete").addClass("cm_del_add");
                        angular.element(".line2_for_delete").addClass("cm_line2_add");
                        //angular.element(".height_ft_del button").removeClass("act_inch_btn");
                        angular.element(".height_ft_del button").addClass("cm_ft_add");
                        angular.element("#height_cm").addClass("cm_input_active");
                        scope.cmShow = true;
                        scope.heightNumberPad.activeCms = "active";
                        //angular.element("#height_cm").focus();
                        angular.element(".height_cms_label").addClass("height_cms_label_active");


                        scope.heightNumberPad.cmPanel = true;
                        scope.heightNumberPad.inchesPanel = false;
                        scope.heightNumberPad.feetPanel = false;
                        scope.heightNumberPad.cmsVal = "";
                        scope.heightFeet = "";
                        scope.heightInches = "";
                        one = "";
                        scope.nextVisible = false;

                        scope.heightNumberPad.activeField = true;

                        scope.heightNumberPad.activeCms = (scope.heightNumberPad.cmsVal == null) ? "" : "valid";


                    } else {
                        scope.cmShow = false;
                        scope.heightNumberPad.activateFeet();
                        angular.element("#height_cm").val("");

                        scope.heightNumberPad.feet_reference = true;

                        angular.element("#height_ft,#height_in").removeClass("element_none");
                        angular.element(".height_ref label").removeClass("element_none");
                        angular.element(".height_ref #height_ft").addClass("active");
                        angular.element(".act_inch_btn").removeClass("cm_del_add");
                        angular.element(".height_ft_del button").removeClass("cm_ft_add");
                        //angular.element(".height_ft_del button").removeClass("act_inch_btn");
                        angular.element("#height_ft").focus();
                        angular.element("#height_cm").removeClass("cm_input_active");
                        angular.element(".height_cms_label").removeClass("height_cms_label_active");
                        scope.heightNumberPad.inchesPanel = false;
                        scope.heightNumberPad.feetPanel = true;
                        scope.heightNumberPad.cmPanel = false;

                    }
                }; //full

                scope.heightNumberPad.feetKeyClick = function($element) {
                    //console.log($element);
                    //scope.heightNumberPad.activeField = true;
                    angular.element("#height_ft").addClass("valid");
                    angular.element("#height_ft").removeClass("active");

                    if (scope.heightNumberPad.activeField) {

                        scope.heightFeet = parseInt($element.target.text);
                        //Modifications here
                        scope.heightNumberPad.feetVal = "";
                        scope.heightNumberPad.feetVal = scope.heightFeet; // + "'";
                        //Modifications here
                        console.log(scope.heightNumberPad.feetVal);
                        scope.heightNumberPad.activateInches();

                        scope.heightNumberPad.validateHeight();
                        JkioskService.logEvent("height01_feetSectionButton", 'button', 'pressed');
                    }


                };


                var one = '';

                scope.heightNumberPad.inchKeyClick = function($element) {
                    if (scope.heightNumberPad.activeField) {          
                        var len = $element.target.text;
                        $("#height_in").css("padding-left", "30px");
                        /*scope.inchVal = scope.inchVal || '';
                        console.log(len);
                        console.log(scope.inchVal);
                        if(len == '0'){
                            if(scope.inchVal == '1'){
                                scope.inchVal += '0';
                                return;
                            }
                            if(scope.inchVal.length != 0) return;
                            scope.inchVal = '0';
                            return;
                        }
                        if(len == '1'){
                            if(scope.inchVal == '1'){
                                scope.inchVal += '1';
                                return;
                            }
                            if(scope.inchVal.length != 0) return;
                            scope.inchVal = '1';
                            return;
                        }
                        if(scope.inchVal.length != 0) return;
                        scope.inchVal = len;*/

                        // if (len.length == 1) {
                            var split = ($element.target.text).split('');   
                            if (split[0] === '1') {
                                // var char = ($element.target.text).split('');
                                // if (one == '') {
                                //     one = char[0];
                                //     scope.heightInches = one;
                                // } else {
                                //     scope.heightInches = '11';
                                // }

                                if(scope.heightNumberPad.inchVal == '1') scope.heightInches = '11';
                                else if(scope.heightNumberPad.inchVal == '11') scope.heightInches = '11';
                                else scope.heightInches = '1';
                            }  else if(split[0] === '0'){
                                
                                if(scope.heightNumberPad.inchVal == '1') {scope.heightInches = '10'; $("#height_in").css("padding-left", "24px");}
                                else scope.heightInches = '0';

                            } else {
                                scope.heightInches = parseInt($element.target.text);
                                $("#height_in").css("padding-left", "30px");
                            }
                        // } else {
                        //     scope.heightInches = parseInt($element.target.text);
                        // }

                        scope.heightNumberPad.inchVal = scope.heightInches; // + "\"";
                        // if (scope.heightInches == '10') {
                        //     scope.heightNumberPad.validateHeight();
                        // } else 
                        if (split[0] == '1') {
                            scope.heightNumberPad.setButtonValid(true);
                            scope.heightNumberPad.activeFeet = "valid";
                            scope.heightNumberPad.activeInches = "valid";
                            scope.heightNumberPad.saveHeight();
                        } else {
                            scope.heightNumberPad.validateHeight();
                        }

                        /*if (len.length == 1) {
                            var split = ($element.target.text).split('');
                            if (split[0] === '1') {
                                var char = ($element.target.text).split('');
                                if (one == '') {
                                    one = char[0];
                                    scope.heightInches = one;
                                } else {
                                    scope.heightInches = '11';
                                }
                            } else {
                                scope.heightInches = parseInt($element.target.text);
                            }
                        } else {
                            scope.heightInches = parseInt($element.target.text);
                        }
                        scope.heightNumberPad.inchVal = scope.heightInches; // + "\"";
                        if (scope.heightInches == '10') {
                            scope.heightNumberPad.validateHeight();
                        } else if (split[0] == '1') {
                            scope.heightNumberPad.setButtonValid(true);
                            scope.heightNumberPad.activeFeet = "valid";
                            scope.heightNumberPad.activeInches = "valid";
                            scope.heightNumberPad.saveHeight();
                        } else {
                            scope.heightNumberPad.validateHeight();
                        }*/
                        JkioskService.logEvent("height01_inchesSectionButton", 'button', 'pressed');
                    }
                };
                // Modifications here
                scope.heightNumberPad.deleteCmsInputs = function() {
                    scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsVal.slice(0, -1);
                    scope.heightNumberPad.cmsData = scope.heightNumberPad.cmsVal;
                    scope.nextVisible = false;
                    scope.heightNumberPad.activeField = true;

                    if (scope.heightNumberPad.cmsData < 91 || scope.heightNumberPad.cmsData > 244) {
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
                }; //full

                //Modifications here newly added function
                scope.heightNumberPad.cmsKeyClick = function($element) {
                    if (scope.heightNumberPad.activeField) {
                        scope.heightNumberPad.cmsVal = parseInt($element.target.text);

                        scope.heightNumberPad.cmsData += scope.heightNumberPad.cmsVal;
                        if (scope.heightNumberPad.cmsData.length < 4) {
                            scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData;
                            var height_cm_value = scope.heightNumberPad.cmsVal;

                            if (height_cm_value.length != 0) {
                                scope.nextVisible = true;
                                // testedddddddd
                                scope.heightNumberPad.saveHeightForCms();
                            }

                            if (height_cm_value.length === 0) {
                                scope.cmValid = false;
                            }

                        }
                        if (scope.heightNumberPad.cmsVal.length < 4 || scope.heightNumberPad.cmsData.length > 3) {

                            if (scope.heightNumberPad.cmsData > 3) {
                                scope.heightNumberPad.cmsVal = scope.heightNumberPad.cmsData.toString().substring(0, 3);

                            }
                            if (scope.heightNumberPad.cmsVal.length == 3) {
                                scope.heightNumberPad.validateHeight();
                            }
                        }
                        if (scope.heightNumberPad.cmsVal === '0' || scope.heightNumberPad.cmsVal === '00' || scope.heightNumberPad.cmsVal === '000' || scope.heightNumberPad.cmsVal < 91 || scope.heightNumberPad.cmsVal > 244) {
                            scope.nextVisible = false;
                            scope.cmValid = true;
							
							angular.element("#confirm_btn_cms").removeClass("active_btn");
                        } else {
							
                            scope.cmValid = false;
							angular.element("#confirm_btn_cms").addClass("active_btn");
                            scope.heightNumberPad.saveHeightForCms();
                        }


                        // JkioskService.logEvent("height01_inchesSectionButton", 'button', 'pressed');
                    }

                }; //full

                scope.heightNumberPad.saveHeight = function() {
                    var feetInches = scope.heightFeet + (scope.heightInches / 12);
                    var heightTotalMeters = feetInches / 3.28;

                    //var heightTotalInches = ( scope.heightFeet * 12) + (  scope.heightInches );
                    //var heightTotalMeters = heightTotalInches * .0254;
                    HigiKioskStorageService.saveSessionData("height", heightTotalMeters);

                };
                //Modifications here
                scope.heightNumberPad.saveHeightForCms = function() {
                    var heightTotalCms = scope.heightNumberPad.cmsVal;
                    var heightTotalMetersFromCms = heightTotalCms / 100;
                    HigiKioskStorageService.saveSessionData("height", heightTotalMetersFromCms);

                }; //full

                scope.heightNumberPad.unsetSessionHeight = function() {
                    HigiKioskStorageService.saveSessionData("height", undefined);
                };
                scope.heightNumberPad.removeFocus = function() {
                    document.getElementById("height_in").blur();
                    document.getElementById("height_ft").blur();
                    scope.heightNumberPad.activeInches = (scope.heightInches === null) ? "" : "valid";
                    scope.heightNumberPad.activeFeet = (scope.heightFeet === null) ? "" : "valid";
                    scope.heightNumberPad.activeField = false;

                };
                //Modifications here
                scope.heightNumberPad.removeFocusForCms = function() {
                    document.getElementById("height_cm").blur();
                    scope.heightNumberPad.activeField = false;
                }; //full

                scope.heightNumberPad.setButtonValid = function(valid) {
                    if (attr.useparent == "true") {
                        scope.$parent[attr.heightset] = valid;
                    } else {
                        scope[attr.heightset] = valid;
                    }
                };

                scope.heightNumberPad.validateHeight = function() {

                    //Modification here
                    if (scope.heightNumberPad.cmsVal !== null && scope.heightNumberPad.cmsVal !== undefined && scope.heightNumberPad.feet_reference !== true) {
						
                        //scope.heightNumberPad.setButtonValid(true);
                        scope.heightNumberPad.activeCms = "valid";
                        scope.heightNumberPad.removeFocusForCms();
                        scope.heightNumberPad.saveHeightForCms();
                    } //here
                    else if (scope.heightFeet !== null && scope.heightInches !== null) {
                        scope.heightNumberPad.setButtonValid(true);
                        scope.heightNumberPad.activeFeet = "valid";
                        scope.heightNumberPad.activeInches = "valid";
                        scope.heightNumberPad.removeFocus();
                        scope.heightNumberPad.saveHeight();
                    } else if (scope.heightFeet === null && scope.heightInches === null) {
                        scope.heightNumberPad.setButtonValid(false);
                        scope.heightNumberPad.activeFeet = "";
                        scope.heightNumberPad.activeInches = "";
                        scope.heightNumberPad.activateFeet();
                    } else if (scope.heightFeet !== null) {
                        scope.heightNumberPad.setButtonValid(false);
                        scope.heightNumberPad.activeFeet = "valid";
                        scope.heightNumberPad.activeInches = "";
                        scope.heightNumberPad.activateInches();
                    } else {
                        scope.heightNumberPad.setButtonValid(false);
                        scope.heightNumberPad.activeInches = "valid";
                        scope.heightNumberPad.activeFeet = "";
                        scope.heightNumberPad.activateFeet();
                    }
                };
                scope.heightNumberPad.init = function() {
                    scope.heightNumberPad.heightData = HigiKioskStorageService.returnSessionData('height');
                    scope.heightNumberPad.activeInches = "";
                    scope.heightNumberPad.feetLabel = 'height01.ft';
                    scope.heightNumberPad.inchesLabel = 'height01.inch';
                    //Modifications here
                    scope.heightNumberPad.cmsLabel = 'height01.cms';
                    scope.heightNumberPad.FT = 'height01.ft';
                    scope.heightNumberPad.CM = 'height01.cm';
                    scope.heightNumberPad.cmValidErrormessage = 'height01.cmValidErrormessage';
                    //
                    scope.heightNumberPad.inchesPanel = false;
                    scope.heightNumberPad.feetPanel = true;

                    scope.heightNumberPad.padEnterLeft = "numpad-enter-left";
                    scope.heightNumberPad.padExitLeft = "numpad-exit-left";
                    scope.heightNumberPad.padEnterRight = "numpad-enter-right";
                    scope.heightNumberPad.padExitRight = "numpad-exit-right";
                    // scope.heightNumberPad.heightData = undefined;

                    if (scope.heightNumberPad.heightData == undefined) {
                        scope.heightFeet = null;
                        scope.heightInches = null;
                        scope.heightNumberPad.activateFeet();
                    } else {
                        scope.heightNumberPad.feetPanel = true;
                        scope.heightFeet = HigiKioskUtilitiesService.convertToFeetFoot(scope.heightNumberPad.heightData);
                        scope.heightInches = HigiKioskUtilitiesService.convertToFeetInches(scope.heightNumberPad.heightData);
                        scope.heightNumberPad.feetVal = scope.heightFeet; //+ "'";
                        scope.heightNumberPad.inchVal = scope.heightInches; //+ "\"";
                        scope.heightNumberPad.validateHeight();
                    }
                    scope.heightNumberPad.inchesWatch = scope.$watch('heightInches', function(newVal, oldVal) {
                        if (newVal === null) {
                            scope.heightNumberPad.setButtonValid(false);
                        }
                    });
                    scope.heightNumberPad.feetWatch = scope.$watch('heightFeet', function(newVal, oldVal) {
                        if (newVal === null) {
                            scope.heightNumberPad.setButtonValid(false);
                        }
                    });
                };
                scope.heightNumberPad.init();

            }
        }
    }]);