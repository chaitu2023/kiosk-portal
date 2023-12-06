//Utilities methods for overriding ngClick and
angular
    .module("higiKioskUi")
    .directive('repeatDone', function() {
        return function(scope, element, attrs) {
            if (scope.$last) { // all are rendered
                scope.$eval(attrs.repeatDone);
            }
        }
    })
    .directive('ngClick', ['$rootScope', 'JkioskService', function($rootScope, JkioskService) {
        return {
            restrict: 'A',
            priority: 1, // give it higher priority than built-in ng-click
            link: function(scope, element, attr) {
                element.bind('click', function() {
                    JkioskService.beginKioskSession();
                    if(attr.class == 'bodyclick'){

                    }else {
                        $rootScope.interfaceSounds.play("clickSnd");
                    }
                    $rootScope.resetSessionTimeout();
                });
            }
        }
    }]);



