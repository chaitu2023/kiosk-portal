//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("ageNumpad", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'HigiApiService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, HigiApiService, JkioskService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/age-numpad.html',
            controller: function ($scope) {
                $scope.validClass = "valid";
                $scope.activeClass = "active";
                $scope.dateMM = "";
                $scope.dateDD = "";
                $scope.dateYYYY = "";
                $scope.dateMMClass = "";
                $scope.dateDDClass = "";
                $scope.dateYYYYClass = "";
                $scope.clearButtonClass = "";
                $scope.nextButtonClass = "";
                $scope.dateSubmitted = "";
                $scope.activeBox = 0;
                $scope.throughOnce = false;
                $scope.validated = false;
                $scope.buttons_active = true;
                $scope.ageErrorVisible = false;
                $scope.ageInvalidVisible = false;
                $scope.ageErrorMessge = "age01.warning.under13";
                $scope.ageInvalidErrorMessage = "age01.error";

                $scope.showAgeError = function(){
                    $scope.ageErrorVisible = true;
                    $scope.ageInvalidVisible = false;
                    $scope.nextVisible = false;
                    $scope.throughOnce = false;
                };
                $scope.removeFieldFocus = function(){
                    document.getElementById("age_mm").blur();
                    document.getElementById("age_dd").blur();
                    document.getElementById("age_yyyy").blur();
                };
                $scope.showAgeInvalid = function(){
                    $scope.ageInvalidVisible = true;
                    $scope.ageErrorVisible = false;
                    $scope.invalidateDate();
                };

                $scope.hideAgeErrors = function(){
                    $scope.ageInvalidVisible = false;
                    $scope.ageErrorVisible = false;
                };
                $scope.invalidateDate = function(){
                    $scope.nextTransitionStyle = "button-exit-right";
                    $scope.invalidateTimeout = $timeout(function(){
                        $timeout(function(){
                            $scope.nextTransitionStyle = "button-enter-right";
                        },200);
                        $scope.nextVisible = false;
                    },500);
                };
                $scope.startDrag = function(e){
                    var e = window.event;
                    e = null;
                };

                $scope.clearSelected = function(id){
                    var e = window.event;
                    document.getElementById(id).setSelectionRange(document.getElementById(id).selectionEnd, document.getElementById(id).selectionEnd);
                    e = null;
                };

                $scope.age_mmActive = function() {
                    $timeout.cancel($scope.introTimeout);
                    $scope.dateMMClass = $scope.activeClass;
                    $scope.dateDDClass = ($scope.dateDD.length != 2) ? "" : $scope.validClass;
                    $scope.dateYYYYClass = ($scope.dateYYYY.length != 4) ? "" : $scope.validClass;
                    $scope.activeBox = 2;
                    $scope.buttons_active = true;
                    $scope.clearButtonClass = "";
                    document.getElementById("age_mm").focus();
                    document.getElementById("age_mm").setSelectionRange($scope.dateMM.length,$scope.dateMM.length);
                };
               $scope.age_ddActive = function() {
                    $timeout.cancel($scope.introTimeout);
                    $scope.dateMMClass = ($scope.dateMM.length != 2) ? "" : $scope.validClass;
                    $scope.dateDDClass = $scope.activeClass;
                    $scope.dateYYYYClass = ($scope.dateYYYY.length != 4) ? "" : $scope.validClass;
                    $scope.activeBox = 1;
                    $scope.buttons_active = true;
                    $scope.clearButtonClass = "";
                    document.getElementById("age_dd").focus();
                    document.getElementById("age_dd").setSelectionRange($scope.dateDD.length,$scope.dateDD.length);
                };

                $scope.age_yyyyActive =function() {
                    $timeout.cancel($scope.introTimeout);
                    $scope.dateMMClass = ($scope.dateMM.length != 2) ? "" : $scope.validClass;
                    $scope.dateDDClass = ($scope.dateDD.length != 2) ? "" : $scope.validClass;
                    $scope.dateYYYYClass = $scope.activeClass;
                    $scope.activeBox = 3;
                    $scope.buttons_active = true;
                    $scope.clearButtonClass = "";
                    document.getElementById("age_yyyy").focus();
                    document.getElementById("age_yyyy").setSelectionRange($scope.dateYYYY.length,$scope.dateYYYY.length);
                };


                $scope.isDate = function(txtDate) {
                    // ensures the entered date isn't in the future
                    var today = new Date();
                    var birthDate = new Date(txtDate);
                    if (today < birthDate)
                        return false;

                    var currVal = txtDate;
                    if (currVal == '')
                        return false;

                    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
                    var dtArray = currVal.match(rxDatePattern); // is format OK?

                    if (dtArray == null)
                        return false;

                    //Checks for mm/dd/yyyy format.
                    dtMonth = dtArray[1];
                    dtDay = dtArray[3];
                    dtYear = dtArray[5];

                    if (dtMonth < 1 || dtMonth > 12)
                        return false;
                    else if (dtDay < 1 || dtDay > 31)
                        return false;
                    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
                        return false;
                    else if (dtMonth == 2) {
                        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
                        if (dtDay > 29 || (dtDay == 29 && !isleap))
                            return false;
                    }
                    return true;
                };

                $scope.validateAge = function() {
                    var fulldate = ( $scope.dateMM.length == 2) && ( $scope.dateDD.length == 2) && ( $scope.dateYYYY.length == 4);
                    $scope.dateSubmitted = $scope.dateMM + "/" + $scope.dateDD + "/" + $scope.dateYYYY;
                    if (fulldate) {
                        console.log("Date inside agenumpad directive"  + $scope.dateSubmitted);
                        //Validate -- Where all the action happens!
                        if(HigiKioskUtilitiesService.getAge($scope.dateSubmitted) < 13 && !$scope.throughOnce){
                            $scope.throughOnce = true;
                            $scope.showAgeError();
                            $scope.resetDate();
                        }
                        else if ($scope.isDate($scope.dateSubmitted) && ($scope.dateSubmitted)) {
                            $timeout.cancel( $scope.invalidateTimeout);
                            if ($scope.validated != true) {
                                //$scope.nextVisible = true;
                                $scope.hideAgeErrors();
                            }
                            $scope.activeBox = 0;
                            $scope.dateMMClass = $scope.validClass;
                            $scope.dateDDClass = $scope.validClass;
                            $scope.dateYYYYClass = $scope.validClass;
                            $scope.removeFieldFocus();
                            $scope.nextVisible = true;
                            $scope.nextTransitionStyle = "button-enter-right";
                            $scope.clearButtonClass = "off";
                            $scope.nextButtonClass = "off";
                            $scope.buttons_active = false;
                            $scope.validated = true;
                        }
                        else {
                            // date is wrong
                            $scope.validated = false;
                            $scope.showAgeInvalid();
                            $scope.nextButtonClass = "";
                        }
                    }
                    else if ($scope.validated) {
                        $scope.validated = false;
                        $scope.showAgeInvalid();
                        $scope.nextButtonClass = "";
                    }
                };

                $scope.resetDate = function(){
                    $scope.dateDD = "";
                    $scope.dateMM = "";
                    $scope.dateYYYY = "";
                    $scope.activeBox = 1;
                     $scope.age_ddActive();
                   
                };
                $scope.dateClearClick = function(){
                    JkioskService.logEvent('age01_clearButton', 'button', 'pressed');
                    if($scope.activeBox == 2){
                        $scope.dateMM = "";
                    } else if($scope.activeBox == 1){
                        $scope.dateDD = "";
                    } if($scope.activeBox == 3){
                        $scope.dateYYYY = "";
                    }
                    $scope.invalidateDate();
                };
                $scope.dateNextClick = function(){
                    JkioskService.logEvent('age01_nextFieldButton', 'button', 'pressed');
                    if ($scope.activeBox == 2 && $scope.buttons_active) {
                        var numChar = parseInt($scope.dateMM);
                        if (numChar == 1) {
                            $scope.dateMM = "0" + numChar;
                        }
                        if ($scope.dateMM.length == 1 && $scope.dateMM == "0") {
                            $scope.dateMM = "01";
                           // $scope.age_ddActive();
                              $scope.age_yyyyActive();
                        }
                        if ($scope.dateMM.length == 2) {
                              $scope.age_yyyyActive();
                           // $scope.age_ddActive();
                        }
                        $scope.age_ddActive();
                    } else if ($scope.activeBox == 1 && $scope.buttons_active) {
                        var numChar = parseInt($scope.dateDD);
                        if (numChar < 4 && numChar > 0) {
                            $scope.dateDD = "0" + numChar.toString();
                        }
                        if ($scope.dateDD.length == 1 && $scope.dateDD == "0") {
                            $scope.dateDD = "01";
                             $scope.age_mmActive();
                           // $scope.age_yyyyActive();
                        }
                        if ($scope.dateDD == 2) {
                             $scope.age_mmActive();
                          // $scope.age_yyyyActive();
                        }
                        $scope.age_yyyyActive();
                    } else if ($scope.activeBox == 3 && $scope.buttons_active) {
                        if ($scope.dateYYYY.length == 1) {
                            $scope.dateYYYY = "190" + $scope.dateYYYY;
                        }
                        if (($scope.dateYYYY.length == 2) && !( numChar == 00 || numChar == 19 || numChar == 20)) {
                            $scope.dateYYYY = "19" + $scope.dateYYYY;
                        }
                        if (($scope.dateYYYY.length == 2) && numChar == 00) {
                            $scope.dateYYYY = "20" + $scope.dateYYYY;
                        }
                        if (($scope.dateYYYY.length == 4) && numChar > 2012) {
                            $scope.dateYYYY = "2012";
                        }
                      
                         $scope.age_ddActive();
                    }
                    $scope.validateAge();
                };
                $scope.setTargetNumPadValue = function(character){
                    if($scope.activeBox == 2){
                        if($scope.dateMM.length < 2){
                            $scope.dateMM += character;
                        } else {
                            $scope.dateMM = character;
                        }
                    } else if($scope.activeBox == 1){
                        if($scope.dateDD.length < 2){
                            $scope.dateDD += character;
                        } else {
                            $scope.dateDD = character;
                        }
                    } if($scope.activeBox == 3){
                        if($scope.dateYYYY.length < 4){
                            $scope.dateYYYY += character;
                        } else {
                            $scope.dateYYYY = character;
                        }
                    }
                };
                //This is Modification here
                $scope.removeTagOnBackspace = function (event) {
                	if($scope.dateDDClass === "active") {
                		$scope.dateDD = $scope.dateDD.slice(0, -1);                	
                	
                	} else if($scope.dateMMClass === "active") {
                		
                		if($scope.dateMM.length != 0) {
                    		$scope.dateMM = $scope.dateMM.slice(0, -1);
                		} else {
                			$scope.dateMMClass = "";
                			$scope.dateDDClass = "active";
                            $scope.age_ddActive();
                			$scope.removeTagOnBackspace();                			
                		}
                		
                		
                	} else {              		
                		if($scope.dateYYYY.length != 0){
                    		$scope.dateYYYY = $scope.dateYYYY.slice(0, -1);
                    		$scope.age_yyyyActive();
                		} else {
                			$scope.dateYYYYClass = "";
                			$scope.dateMMClass = "active";
                			$scope.age_mmActive();
                			$scope.removeTagOnBackspace();
                		}
                	}
                    $scope.validateAge();
                	
                	
                    /*var numpad_entry=angular.element("#numpad_entry");
                    var numpad_entry_length=numpad_entry.children().length;
                    var numpad_entry_children=numpad_entry.children();
                    var i=0;
                    var j=0;
                    var k=0;
                    for(j; j < numpad_entry_length; j++) 
                    {
                        var active_input=numpad_entry_children[j].placeholder;
                        //checking the dd mm yyyy placeholder empty or not. If it is empty which is active input. we can delete.
                        if(active_input==="(DD)" || active_input==="(MM)" || active_input==="(YYYY)")
                        {
                            
                        }
                        else
                        {
                            var active_input_id=numpad_entry_children[j].id;
                            var active_input_val=angular.element("#"+active_input_id).val();
                            var input_length=active_input_val.length;
                                
                                if(input_length > 0)
                                {   
                                    var bal_text=active_input_val.substring(0,input_length-1);
                                    angular.element("#"+active_input_id).val(bal_text);
                                    
                                }
                                else{
                                    k=1;
                                }

                            i=-1;
                        }    
                    }
    
                   if(i !=-1)
                   {
                        //Loop children elements of #numpad_entry to get placeholder.so that we can check which one is empty or not.
                        for(var i=numpad_entry_length-1; i >= 0; i--)
                        {
                            
                                var active_input_id=numpad_entry_children[i].id;
                                var active_input_val=angular.element("#"+active_input_id).val();
                                var input_length=active_input_val.length;
                                
                                if(input_length > 0)
                                {   
                                    var bal_text=active_input_val.substring(0,input_length-1);
                                    angular.element("#"+active_input_id).val(bal_text);
                                    i=-1;
                                }       
                        }
                    }  */
                  
                };//full

				
				
				
                $scope.dateNumClick = function($element){
                    //console.log($element);
                    var character = $element.target.text;
                    
                    $scope.setTargetNumPadValue(character);


                    $rootScope.resetSessionTimeout();
                    JkioskService.logEvent('age01_keypadButton', 'button', 'pressed');
					

                    /*if($scope.dateMM.length === 2 && $scope.dateDD === 2){
                    	if($scope.dateYYYY.length  === 3 ||  $scope.dateYYYY.length  === 2 || $scope.dateYYYY.length === 1){
                    		$scope.activeBox = 3;
                    	}
                    }
                    if($scope.dateMM.length === 2 && $scope.dateMM != '00'){
                    	if($scope.dateYYYY.length  === 0){
                    		$scope.activeBox = 3;
                    	}
                    }*/
                    if($scope.activeBox == 0){
                		$scope.activeBox = 3;
                        //If not thing is active, don't enter values
                       // $scope.resetDate();
                       // return false;
                    }
                    if ($scope.activeBox == 2) {
                        var numChar = parseInt($scope.dateMM);
                        if ($scope.dateMM.length >= 2) {
                            $scope.age_ddActive();
                        }
                        if (numChar >= 2 && numChar <= 9) {
                            $scope.dateMM = "0" + numChar.toString();
                            $scope.age_ddActive();
                        }
                        if (numChar >= 10 && numChar <= 12) {
                            $scope.age_ddActive();
                        }
                       if ($scope.dateMM.length == 2 && $scope.dateMM == "00") {
                            $scope.dateMM = "01";
                       }
                        if ($scope.dateMM.length == 2) {
                            
                            $scope.age_yyyyActive();
                        }

                    } else if ($scope.activeBox == 1) {
                        var numChar = parseInt($scope.dateDD);
                        if (numChar > 3 && numChar < 10) {
                            $scope.dateDD ="0" + numChar.toString();
                            $scope.age_yyyyActive();
                        }
                        if ($scope.dateDD.length == 2 && $scope.dateDD == "00") {
                            $scope.dateDD = "01";
                        }
                        if ($scope.dateDD.length == 2) {
                            
                            //console.log("$scope.age_mmActive() is commented for issue");
                              $scope.age_mmActive();
                        }

                    } else if ($scope.activeBox == 3) {
                        var numChar = parseInt($scope.dateYYYY);
                        if (($scope.dateYYYY.length == "2") && !( numChar == 00 || numChar == 19 || numChar == 20)) {
                            $scope.dateYYYY = "19" + $scope.dateYYYY;
                        }
                        if (($scope.dateYYYY.length == "2") && numChar == 00) {
                            $scope.dateYYYY = "20" + $scope.dateYYYY;
                        }
                    }
                    //ensures the month isnt > 12 and day isnt > 31. if it is, throw up an error.
                    if (parseInt($scope.dateMM) > 12 || parseInt($scope.dateDD) > 31) {
                        //$('#numpad_error').fadeIn();
                        $scope.showAgeInvalid();
                    } else {
                        //$('#numpad_error').fadeOut();
                    }
                    if ($scope.buttons_active){
                        $scope.validateAge();
                    }

                };


                $scope.age_mmValidate =function() {
                
                    var numChar = parseInt($scope.dateMM);
                    
                    if (numChar == 0 && $scope.dateMM.length < 2) {
                        $scope.dateMM = "01";
                    }
                    if (numChar == 1) {
                        $scope.dateMM = "0" + numChar;
                    }
                    if ($scope.buttons_active){
                        $scope.validateAge();
                    }
                };

                $scope.age_ddValidate = function () {
                    var numChar = parseInt($scope.dateDD);
                    if (numChar == 0 && $scope.dateDD.length < 2) {
                        $scope.dateDD = "01";
                    }
                    if (numChar <= 4 && numChar >= 1) {
                        $scope.dateDD = "0" + numChar;
                    }
                    if ($scope.buttons_active){
                        $scope.validateAge();
                    }
                };

                $scope.age_yyyyValidate = function() {
                    var numChar = parseInt($scope.dateYYYY);
                    if ($scope.buttons_active){
                        $scope.validateAge();
                    }
                };

                $scope.dateValFieldClicked = function(field){
                    $rootScope.resetSessionTimeout();
                    if(field == "mm"){
                        var event = "age01_monthSectionButton";                       
                        $scope.age_ddValidate();
                        $scope.age_yyyyValidate();
                        $scope.age_mmActive();
                    } else if(field == "yyyy"){
                        var event = "age01_yearSectionButton";
                        $scope.age_mmValidate();
                        $scope.age_ddValidate();
                        $scope.age_yyyyActive();
                    } else {
                        var event = "age01_daySectionButton";                        
                        $scope.age_mmValidate();
                        $scope.age_yyyyValidate();
                        $scope.age_ddActive();
                    }
                    JkioskService.logEvent(event, 'button', 'pressed');
                };

                if (HigiKioskStorageService.returnSessionData('birthdate') != undefined) {
                    //parse data
                    var savedBirthdate = HigiKioskStorageService.returnSessionData('birthdate');
                    var dateParts = savedBirthdate.split("/");
                    var date = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
                    $scope.dateMM = dateParts[0];
                    $scope.dateDD = dateParts[1];
                    $scope.dateYYYY = dateParts[2];
                    $scope.clearButtonClass = "off";
                    $scope.nextButtonClass = "off";
                }
                else {
                    $scope.invalidateDate();
                    $scope.introTimeout = $timeout(function(){
                       $scope.age_ddActive();
                       // $scope.age_ddValidate();
                        document.getElementById("age_dd").focus();
                    }, 1000);
                }


            }

        }
    }]);



