angular
    .module("higiKioskUi")
    .directive("telemediTextArea", ['$rootScope', function($rootScope) {
        return {
            restrict : 'E',
            templateUrl : 'components/tele_medi_fields/tele_medi_textarea.html',
            scope : {
            teletextarea: "="
            },



            link : function (scope, element, attr) {

                scope.interfaceLabels = scope.$parent.interfaceLabels;
                scope.emailTextfieldClearButton = $rootScope.emailTextfieldClearButton;
                scope.enabledCursor = $rootScope.enabledCursor;

                //TODO - text field validation methods
                //Update keyboard and higiTextField to have field validation be triggered in higiTextField instead of keyboard.js
                //scope.onChangeMethod = scope.$watch('field.text', function(newVal, oldVal){
                //     if(typeof(scope.field.callback) === "function"){
                //    scope.field.callback();
                //}
                //});

                scope.setIndex= function(id){
                    $rootScope.textFieldIndex = document.getElementById(id).selectionStart;
                };
                scope.startDrag = function(e){
                    var e = window.event;
                    scope.startDragX = e.pageX;
                    e = null;
                };                
                scope.clearSelected = function(id){
                    var e = window.event;
                    scope.stopDragX = e.pageX;
                    if(scope.stopDragX > scope.startDragX){
                        document.getElementById(id).setSelectionRange(document.getElementById(id).selectionEnd, document.getElementById(id).selectionEnd);
                        $rootScope.textFieldIndex = document.getElementById(id).selectionEnd;
                    }else {
                        document.getElementById(id).setSelectionRange(document.getElementById(id).selectionStart, document.getElementById(id).selectionStart);
                        $rootScope.textFieldIndex = document.getElementById(id).selectionStart;
                    }
                    e = null;
                };
                scope.clearTextField = function(){
                    $rootScope.targetField.text ="";
                    $rootScope.hideEmailExtensionTop();
                    document.getElementById($rootScope.targetField.id).value = $rootScope.targetField.text;
                    if(typeof(scope.field.callback) === "function"){
                        scope.field.callback();
                    }
                };

            

                //Update labels if language is changed.
                scope.enabledCursorWatch = $rootScope.$watch('enabledCursor', function(){
                    scope.enabledCursor = $rootScope.enabledCursor;
                });

                 var maxLength = 3;
 
                scope.lengthMonitor = function (id) {
                     //console.log(maxLength);
                     //console.log(scope.teletextarea.text);
                    if (scope.teletextarea.text.length > maxLength) {
                        scope.teletextarea.text = scope.teletextarea.text.substring(0, maxLength);
                     }
                } 

    

            }
        }
    }]);

    