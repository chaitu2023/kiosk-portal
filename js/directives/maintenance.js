//Global audio

angular
    .module("higiKioskUi")
    .directive("maintenanceMode", ['$q', function($q) {
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/maintenance.html',
            link : function(scope, element, attr) {
                scope.maintMessage = 'maintenance.message';
                scope.maintSupport = 'maintenance.support.personnel.only';
                scope.maintEnterPw = 'maintenance.enter.password.to.reset';
                scope.maintInvalidCreds = 'maintenance.invalid.credentials';
            }
        }
    }]);



