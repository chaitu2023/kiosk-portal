//Onboarding Height Scroller
angular
    .module("higiKioskUi")
    .directive("keyboard" , ['$rootScope', 'JkioskService', '$timeout', 'HigiKioskUtilitiesService', function($rootScope, JkioskService, $timeout, HigiKioskUtilitiesService) {
        return {
            restrict: 'E',
            templateUrl: 'components/keyboard.html',
            controller: function ($scope) {
                    $rootScope.fields = new Object();
                    $rootScope.targetFieldSet = new Object();
                    $rootScope.keyboardEnterActive = false;
                    $rootScope.targetField = null;
                    $rootScope.targetCallback = null;
                    $scope.keyboardVisible = false;
                    $scope.keyboardTransition = '';

                    $scope.offCanvasRow1 = "";
                    $scope.offCanvasRow2 = "";
                    $scope.offCanvasRow3 = "";
                    $scope.offCanvasRow4 = "";

                    $scope.visibleLetter = true;
                    $scope.visibleNumber = false;
                    $scope.visibleSpecial = false;
                    $scope.visibleLetterClass = 'active_toggle';
                    $scope.visibleNumberClass = '';
                    $scope.visibleSpecialClass = '';
                    $scope.shiftKey = false;
                    $scope.shiftKeyKeyClass = '';
                    $scope.domainsNb = [
                        "@gmail.com",
                        "@yahoo.com",
                        "@aol.com",
                        "@hotmail.com",
                        "@comcast.net",
                        "@verizon.net"
                    ];
                    $scope.domains = [
                        "@gmail.com",
                        "@aol.com",
                        "@",
                        "@hotmail.com",
                        "@yahoo.com"
                    ];
                    $scope.domainTimeout = 10000;
                    $scope.keyboardShadowOff = "";
                    $scope.fieldFocus = function (element){
                        //Ignore if cursor not enabled.
                        if($rootScope.enabledCursor){
                            $timeout(function(){
                                element.selectionStart = $rootScope.textFieldIndex;
                                element.setSelectionRange($rootScope.textFieldIndex, $rootScope.textFieldIndex);
                                element.focus();
                            },0);
                        }
                        $scope.showExtensionMenu = false;

                    };
                    
                    $scope.keyboardEnterPressed = function(){

                        JkioskService.logEvent($rootScope.currentKeyboardState + '_keyboardEnterKey', 'button', 'pressed');
                        if(typeof($rootScope.keyboardEnterButtonFunction) == "function"){
                            $rootScope.keyboardEnterButtonFunction();
                            $rootScope.resetSessionTimeout();
                            $rootScope.interfaceSounds.play("typeSnd");
                        }
                    };

                    $scope.toggleShiftKey = function(){
                        $scope.shiftKey = !$scope.shiftKey;
                        $scope.shiftKeyKeyClass = ($scope.shiftKey) ? 'uppercase' : '';

                    };

                    $scope.showEmailExtensionSplit = function() {
                      
                        $rootScope.targetField.text = $rootScope.targetField.text + "@";
                        document.getElementById($rootScope.targetField.id).value = $rootScope.targetField.text;
                        $rootScope.textFieldIndex++;
                        $scope.extensionModalTimeout = $timeout($scope.hideEmailExtension, $scope.domainTimeout);
                        $scope.offCanvasRow1 = "offCanvasVert";
                        $scope.offCanvasRow2 = "offCanvasVert";
                        $scope.offCanvasRow3 = "offCanvasVert";
                        $scope.offCanvasRow4 = "offCanvasInactive";
                        $scope.showExtensionMenu = true;
                        $scope.domainRowAnimationClass = 'rowBottomUpShow'
                    };
                    $scope.hideEmailExtensionSplit = function(){
                        $scope.offCanvasRow1 = "offCanvasVertOff";
                        $scope.offCanvasRow2 = "offCanvasVertOff";
                        $scope.offCanvasRow3 = "offCanvasVertOff";
                        $scope.offCanvasRow4 = "";
                        $scope.domainRowAnimationClass = 'rowTopDownHide';
                        $timeout(function(){$scope.showExtensionMenu = false}, 300);
                    };
                    $rootScope.showAbhaExtension = function(val){
                        console.log(val);
                        $scope.AbhaAddressArray = val;
                        $scope.showAbhaExtensions = true;   
                        $scope.keyboardVisible = true;
                        $scope.keyboardTransition = 'keyboard-enter-up';
                        $scope.nbKeyboardClass = "nb-extensions-in";
                    }
                    $scope.showEmailExtensionTop = function() {
                        
                         // add "@"-character in between text (thamarai-start)
                         var textField = document.getElementById($rootScope.targetField.id);
                         var textVal = textField.value;
                         //console.log(textVal);

                         if(textVal.length -1 >= $rootScope.textFieldIndex){

                            var textVal = textVal.substring(0, $rootScope.textFieldIndex) + "@" + textVal.substring($rootScope.textFieldIndex, textVal.length);
                            $rootScope.targetField.text = textVal;
                            document.getElementById($rootScope.targetField.id).value = $rootScope.targetField.text;
                            $rootScope.textFieldIndex++;
                            $scope.extensionModalTimeout = $timeout($scope.hideEmailExtensionTop, $scope.domainTimeout);
                            $scope.nbKeyboardClass = "nb-extensions-in";
                            $scope.keyboardShadowOff = "shadow-off";
                            $scope.showNbEmailExtensions = true;     
                        }else{
                            $rootScope.targetField.text = $rootScope.targetField.text + "@";
                            document.getElementById($rootScope.targetField.id).value = $rootScope.targetField.text;
                            $rootScope.textFieldIndex++;
                            $scope.extensionModalTimeout = $timeout($scope.hideEmailExtensionTop, $scope.domainTimeout);
                            $scope.nbKeyboardClass = "nb-extensions-in";
                            $scope.keyboardShadowOff = "shadow-off";
                            $scope.showNbEmailExtensions = true;   
                        }
                          // add "@"-character in between text (thamarai - end)

                    };
                    $scope.hideEmailExtensionTop = function(){
                        //Clear hide timeout
                        $timeout.cancel($scope.extensionModalTimeout);
                        $scope.keyboardShadowOff = "";
                        $scope.nbKeyboardClass = "nb-extensions-out";
                        $timeout(function(){$scope.showNbEmailExtensions = false;}, 300);
                    };
                    $rootScope.hideEmailExtensionTop = $scope.hideEmailExtensionTop;
                    $scope.showEmailExtension = function(){
                        if($rootScope.emailExtensionEnabledSplit){
                            $scope.showEmailExtensionSplit();
                        } else {
                            $scope.showEmailExtensionTop();
                        }
                    };
                    $scope.hideEmailExtension = function(){
                        if($rootScope.emailExtensionEnabledSplit){
                            $scope.hideEmailExtensionSplit();
                        } else {
                            $scope.hideEmailExtensionTop();
                        }
                    };
                    $scope.abhakeyExtensionClick = function($element){
                        $scope.selectedAbhaAddress = $element.target.innerHTML;
                        // console.log($scope.selectedAbhaAddress);
                        // console.log($rootScope.targetField.text)
                        $rootScope.sendAbhaAddress($scope.selectedAbhaAddress);  
                        $scope.showAbhaExtensions = false;   
                    }
                    $scope.keyExtensionClick = function($element){
                        //$rootScope.targetField.text = HigiKioskUtilitiesService.replaceAll($rootScope.targetField.text, "@", "");
                        //$rootScope.targetField.text = $rootScope.targetField.text.replace('@', '');
                        JkioskService.logEvent($rootScope.currentKeyboardState, 'emailExtensionShortcut', 'pressed');
                        $rootScope.targetField.text = $rootScope.targetField.text.split('@')[0]; //$rootScope.targetField.text.substring(0, $rootScope.targetField.text.length-1)
                        $rootScope.textFieldIndex =$rootScope.targetField.text.length;
                        document.getElementById($rootScope.targetField.id).value = $rootScope.targetField.text;

                        $timeout.cancel($scope.extensionModalTimeout);
                        $scope.hideEmailExtension();
                        $scope.keyClick($element);
                    };
                    $scope.keyboardSpacePressed = function($element){
                        $rootScope.resetSessionTimeout();
                        $rootScope.interfaceSounds.play("typeSnd");
                        var textField = document.getElementById($rootScope.targetField.id);
                        var textVal = textField.value;

                        $rootScope.textFieldIndex  = $rootScope.textFieldIndex   || textField.selectionStart;
                        var character =  ($scope.visibleLetter && $scope.shiftKey) ? $element.target.innerHTML.toUpperCase() : $element.target.text;
                        if($rootScope.targetField.text == $rootScope.targetField.defaultText){
                            $rootScope.targetField.text = textVal + character;
                            $rootScope.textFieldIndex = $rootScope.textFieldIndex + character.length;
                            textField.value =  $rootScope.targetField.text;
                            textField.selectionStart = $rootScope.textFieldIndex;
                        }
                        else{
                            if($rootScope.enabledCursor){
                                $rootScope.targetField.text = [textVal.slice(0, $rootScope.textFieldIndex ), character, textVal.slice($rootScope.textFieldIndex )].join('');
                            } else {
                                //Cursor feature disabled, just add the last character/key
                                $rootScope.targetField.text = $rootScope.targetField.text + " ";
                            }
                            $rootScope.textFieldIndex = $rootScope.textFieldIndex + character.length;
                            textField.value =  $rootScope.targetField.text;
                            textField.selectionStart =$rootScope.textFieldIndex ;
                        }
                        if(typeof($rootScope.targetField.textMasked) != "undefined" && !$rootScope.targetField.textMaskedDisabled ){
                            var str = "";
                            for(var i= 0; i < $rootScope.targetField.text.length ; i++){
                                str += "&#149;";
                            }
                           $rootScope.targetField.textMasked = str;
                        } else {
                            $rootScope.targetField.textMasked = $rootScope.targetField.text;
                        }
                        //TODO - text field validation methods
                        //Update keyboard and higiTextField to have field validation be triggered in higiTextField instead of keyboard.js
                        if($rootScope.targetField.callback != null){
                            $rootScope.targetField.callback();
                        }
                        //Drop shift key
                        if($scope.shiftKey){
                            $scope.toggleShiftKey();
                        }

                        $scope.fieldFocus(textField);


                    }
                    $scope.keyClick = function($element){
                        $rootScope.resetSessionTimeout();
                        $rootScope.interfaceSounds.play("typeSnd");
                        var textField = document.getElementById($rootScope.targetField.id);
                        var textVal = textField.value;
                        
                       if($rootScope.textFieldIndex != 0){
                        $rootScope.textFieldIndex  = $rootScope.textFieldIndex   || textField.selectionStart;
                        }
                        var character =  ($scope.visibleLetter && $scope.shiftKey) ? $element.target.innerHTML.toUpperCase() : $element.target.text;

                        // add character in between start deepak
                        if(textVal.length -1 >= $rootScope.textFieldIndex){
                            $rootScope.characterEnteredInMiddle = true;
                            var textVal = textVal.substring(0, $rootScope.textFieldIndex) + character + textVal.substring($rootScope.textFieldIndex, textVal.length);
                            $rootScope.targetField.text = textVal;
                            $rootScope.textFieldIndex++;
                            if ($rootScope.targetField.callback != null) {
                                $rootScope.targetField.callback();
                            }

                            if($rootScope.targetField.answer != undefined){
                                $rootScope.targetField.answer = textVal;
                            }
                            
                            return 0;
                        }
                        // add character in between end deepak


                        if($rootScope.targetField.text == $rootScope.targetField.defaultText){
                            $rootScope.targetField.text = textVal + character;
                            $rootScope.textFieldIndex = $rootScope.textFieldIndex + character.length;
                            textField.value =  $rootScope.targetField.text;
                            textField.selectionStart = $rootScope.textFieldIndex;
                        }
                        else{
                            if($rootScope.enabledCursor){
                                $rootScope.targetField.text = [textVal.slice(0, $rootScope.textFieldIndex ), character, textVal.slice($rootScope.textFieldIndex )].join('');
                            } else {
                                //Cursor feature disabled, just add the last character/key
                                $rootScope.targetField.text = $rootScope.targetField.text + character;
                            }
                            $rootScope.textFieldIndex = $rootScope.textFieldIndex + character.length;
                            textField.value =  $rootScope.targetField.text;
                            textField.selectionStart =$rootScope.textFieldIndex ;
                        }
                        if(typeof($rootScope.targetField.textMasked) != "undefined" && !$rootScope.targetField.textMaskedDisabled ){
                            var str = "";
                            for(var i= 0; i < $rootScope.targetField.text.length ; i++){
                                str += "&#149;";
                            }
                           $rootScope.targetField.textMasked = str;
                        } else {
                            $rootScope.targetField.textMasked = $rootScope.targetField.text;
                        }
                        //TODO - text field validation methods
                        //Update keyboard and higiTextField to have field validation be triggered in higiTextField instead of keyboard.js
                        if($rootScope.targetField.callback != null){
                            $rootScope.targetField.callback();
                        }
                        //Drop shift key
                        if($scope.shiftKey){
                            $scope.toggleShiftKey();
                        }

                        if($rootScope.targetField.answer != undefined){
                            $rootScope.targetField.answer = $rootScope.targetField.text;
                        }

                        $scope.fieldFocus(textField);

                    };
//
                    $scope.keyClickDelete = function(){

                        $rootScope.resetSessionTimeout();
                        $rootScope.interfaceSounds.play("typeSnd");
                        var textField = document.getElementById($rootScope.targetField.id);
                        var textVal = textField.value;
                        $rootScope.textFieldIndex  = $rootScope.textFieldIndex   || textField.selectionStart;
                        


                        // delete character in between start deepak
                        if(textVal.length -1 >= $rootScope.textFieldIndex && $rootScope.textFieldIndex > 0){
                            textVal = textVal.slice(0, $rootScope.textFieldIndex-1) + textVal.slice($rootScope.textFieldIndex, textVal.length);                            
                            $rootScope.targetField.text = textVal; 
                            $rootScope.textFieldIndex--;
                            $rootScope.Deletepressed = true;
                            if ($rootScope.targetField.callback != null) {
                                $rootScope.targetField.callback();
                            }
                            return 0;
                        } else if($rootScope.textFieldIndex == 0){
                            return 0;
                        }
                        // delete character in between end deepak


                        if($rootScope.targetField.text == $rootScope.targetField.defaultText){
                            $rootScope.targetField.text = "";
                        }
                        else{
                            if($rootScope.enabledCursor){
                                $rootScope.targetField.text = [textVal.slice(0, ($rootScope.textFieldIndex-1 >=0) ? $rootScope.textFieldIndex - 1 : 0 ), textVal.slice(($rootScope.textFieldIndex > 0) ? $rootScope.textFieldIndex : 1  )].join('');
                            } else {
                                //Cursor feature disabled, just remove the last character
                                $rootScope.targetField.text = textVal.substr(0, textVal.length - 1);
                            }
                            $rootScope.textFieldIndex--;
                            textField.value =  $rootScope.targetField.text;
                            $scope.fieldFocus(textField);
                            textField.selectionStart = $rootScope.textFieldIndex;
                            if(typeof($rootScope.targetField.textMasked) != "undefined"){
                                if($rootScope.targetField.textMaskedDisabled){
                                    $rootScope.targetField.textMasked =  $rootScope.targetField.text;
                                }else {
                                    var str = "";
                                    for(var i= 0; i < $rootScope.targetField.text.length ; i++){
                                        str += "&#149;";
                                    }
                                    $rootScope.targetField.textMasked = str;
                                }
                            }
                            //TODO - text field validation methods
                            //Update keyboard and higiTextField to have field validation be triggered in higiTextField instead of keyboard.js
                            if($rootScope.targetField.callback != null){
                                $rootScope.targetField.callback();
                            }

                            if($rootScope.targetField.answer != undefined){
                                $rootScope.targetField.answer = $rootScope.targetField.text;
                            }
                        }

                    };
                    $scope.keyboardModeToggle = function(mode){
                        $scope.visibleLetter = (mode == "letter") ? true : false;
                        $scope.visibleNumber = (mode == "number") ? true : false;
                        $scope.visibleSpecial = (mode == "special") ? true : false;
                        $scope.visibleLetterClass = (mode == "letter") ? 'active_toggle' : '';
                        $scope.visibleNumberClass = (mode == "number") ? 'active_toggle' : '';
                        $scope.visibleSpecialClass = (mode == "special") ? 'active_toggle' : '';

                    };

                    $rootScope.keyboardShow = function(field){
                        if(typeof(field) == "undefined"){

                            field = $rootScope.targetFieldSet[0];

                        }
                        $timeout.cancel($rootScope.keyboardDisplayTimeout);


                        //var fieldType = (field.type == "password") ? '_passwordInput' : '_emailInput';
                        //JkioskService.logEvent($rootScope.currentKeyboardState + fieldType, 'input', 'selected');
                        $scope.keyboardVisible = true;
                        $scope.keyboardTransition = 'keyboard-enter-up';
                        $rootScope.focusField(field);
                    };
                    $rootScope.setFieldIndexEnd = function(){
                        //if pre-populated, set cursor to the end on init
                        $rootScope.textFieldIndex = ($rootScope.targetFieldSet[0].text != undefined) ? $rootScope.targetFieldSet[0].text.length : 0;
                        document.getElementById($rootScope.targetFieldSet[0].id).setSelectionRange($rootScope.textFieldIndex, $rootScope.textFieldIndex);
                    };
                    $rootScope.focusField = function(field){
                        //console.log(field);
                        if(!$scope.keyboardVisible){
                            $rootScope.keyboardShow(field)
                        }
                        $rootScope.targetField = field;
                        $rootScope.isEmailField = ($rootScope.targetField.id.search("email") != -1);
                        //var fieldType = (field.type == "password") ? '_passwordInput' : '_emailInput';
                        //JkioskService.logEvent($rootScope.currentKeyboardState + fieldType, 'input', 'selected');

                        //console.log($rootScope.targetFieldSet);
                        if(!jQuery.isEmptyObject($rootScope.targetFieldSet)){
                            $rootScope.targetFieldSet.forEach(function(item){
                                item.selectedClass = '';
                            });
                        }

                        //Clear out placeholder text
                        if( field.text ===  field.defaultText && field.usesPlaceholder) {
                            field.text = "";
                        }

                        field.selectedClass = 'login_input_selected';
                        $timeout(function(){
                            document.getElementById(field.id).focus();
                        }, 0, false);

                        if (field.id == "mobile_no_focus_new") {
                            $("#mobile_no_focus_new").css('border' , '2px solid #3787c0');
                            $('.signup_modal_mobile_number_cnt_code').css('border' , '2px solid #3787c0');
                            $("#aadharfield1").css('border' , '2px solid #808080d1');
                            $("#aadharfield2").css('border' , '2px solid #808080d1');
                            $("#aadharfield3").css('border' , '2px solid #808080d1');
                            $("#affiliatestatuss").css('border' , '2px solid #808080d1');
                        }else if (field.id == "aadharfield1" || field.id == "aadharfield2" || field.id == "aadharfield3") {
                            $("#aadharfield1").css('border' , '2px solid #3787c0');
                            $("#aadharfield2").css('border' , '2px solid #3787c0');
                            $("#aadharfield3").css('border' , '2px solid #3787c0');
                            $("#mobile_no_focus_new").css('border' , '2px solid #808080d1');
                            $('.signup_modal_mobile_number_cnt_code').css('border' , '2px solid #808080d1');
                            $("#affiliatestatuss").css('border' , '2px solid #808080d1');
                        }else if (field.id == "firstname") {
                            $('#firstname').css('border' , '2px solid #3787c0');
                            $("#lastname").css('border' , '2px solid #808080d1');
                        }else if (field.id == "lastname") {
                            $('#firstname').css('border' , '2px solid #808080d1');
                            $("#lastname").css('border' , '2px solid #3787c0');
                        }else if (field.id == "passwordReg") {
                            $('#passwordReg').css('border' , '2px solid #3787c0');
                            $("#confirmPassNow").css('border' , '2px solid #808080d1');
                        }else if (field.id == "confirmPassNow") {
                            $('#passwordReg').css('border' , '2px solid #808080d1');
                            $("#confirmPassNow").css('border' , '2px solid #3787c0');
                        }else if (field.id == "emailReset") {
                            $('#emailReset').css('border' , '2px solid #3787c0');
                        }else if (field.id == "passwordTemp") {
                            $('#passwordTemp').css('border' , '2px solid #3787c0');
                        }else if (field.id == "passwordNew") {
                            $('#passwordNew').css('border' , '2px solid #3787c0');
                        }else if (field.id == "emailres") {
                            $('#emailres').css('border' , '2px solid #3787c0');
                        }else if (field.id == "reasonForVis") {
                            $('#reasonForVis').css('border' , '2px solid #3787c0');
                        }else if (field.id == "teleConsultationSummaryRatings") {
                            $('#teleConsultationSummaryRatings').css('border' , '2px solid #3787c0');
                        }else if (field.id == "mobilenum1") {
                            $('#mobilenum1').css('border' , '2px solid #3787c0');
                        }else if (field.id == "authcode") {
                            $('#authcode').css('border' , '2px solid #3787c0');
                        }else if(field.id == "Otp"){
                            $('#Otp').css('border' , '2px solid #3787c0');
                        }else{
                           $("#mobile_no_focus_new").css('border' , '2px solid #808080d1');
                           $('.signup_modal_mobile_number_cnt_code').css('border' , '2px solid #808080d1');
                           $("#aadharfield1").css('border' , '2px solid #808080d1');
                           $("#aadharfield2").css('border' , '2px solid #808080d1');
                           $("#aadharfield3").css('border' , '2px solid #808080d1'); 
                           $("#affiliatestatuss").css('border' , '2px solid #808080d1');
                           $('#firstname').css('border' , '2px solid #808080d1');
                           $("#lastname").css('border' , '2px solid #808080d1');
                           $('#passwordReg').css('border' , '2px solid #808080d1');
                           $("#confirmPassNow").css('border' , '2px solid #808080d1');
                           $('#emailReset').css('border' , '2px solid #808080d1');
                           $('#passwordTemp').css('border' , '2px solid #808080d1');
                           $('#passwordNew').css('border' , '2px solid #808080d1');
                           $('#emailres').css('border' , '2px solid #808080d1');
                           $('#reasonForVis').css('border' , '2px solid #808080d1');
                           $('#mobilenum1').css('border' , '2px solid #808080d1');
                           $('#authcode').css('border' , '2px solid #808080d1');
                        }
                    };

                    $rootScope.keyboardHide = function(){
                        $timeout.cancel($rootScope.keyboardDisplayTimeout);

                        //Remove enter button active class and bound method
                        $rootScope.keyboardEnterButtonFunction = null;
                        $rootScope.keyboardEnterButtonClass = '';
                        $scope.showNbEmailExtensions = false;
                        $rootScope.keyboardDisplayTimeout = $timeout(
                            function(){
                                $scope.keyboardVisible = false;
                                $scope.keyboardModeToggle("letter");
                            },500);
                        $scope.keyboardTransition = 'keyboard-exit-down';
                    };
                    $rootScope.clearTextFields = function(){
                            var clearLoop = function(element, index){
                                element.text = "";
                                element.textMasked = "";
                                try{
                                    document.getElementById(element.id).value = element.text;
                                } catch(e){

                                }
                             };
                            if($rootScope.fields.login != undefined){
                                $rootScope.fields.login.forEach(clearLoop);
                            }
                            if($rootScope.fields.interactiveAdFormFields != undefined) {
                                $rootScope.fields.interactiveAdFormFields.forEach(clearLoop);
                            }
                            if($rootScope.fields.register != undefined) {
                                $rootScope.fields.register.forEach(clearLoop);
                            }
                            if($rootScope.fields.passwordReset != undefined) {
                                $rootScope.fields.passwordReset.forEach(clearLoop);
                            }
                            if($rootScope.fields.reasonForVisit != undefined) {
                                $rootScope.fields.reasonForVisit.forEach(clearLoop);
                            }if($rootScope.fields.paymentModal != undefined) {
                                $rootScope.fields.paymentModal.forEach(clearLoop);
                            }if($rootScope.fields.ratings != undefined) {
                                $rootScope.fields.ratings.forEach(clearLoop);
                            }

                    };
            }
        }
    }]);



