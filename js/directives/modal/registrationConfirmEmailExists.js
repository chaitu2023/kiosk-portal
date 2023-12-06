 higiKioskControllers.directive('registrationConfirmEmailExists', ['$rootScope' , 'HigiKioskStorageService' , function($rootScope, HigiKioskStorageService) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/registration-confirm-email-exists.html',
        link :function(scope, elem, attr){
            scope.emailExistsWarning = new Object();
            scope.emailExistsWarning.init = function() {
                //Set localization fields
                scope.emailExistsWarning.title = "register.email.exists.title";
                scope.emailExistsWarning.instructions = "register.email.exists.instruction";
                scope.emailExistsWarning.emailEdit = "register.email.exists.edit";
                scope.emailExistsWarning.login = "global.login";
                scope.emailExistsWarning.loginMode = {id : 'login'};
            };
            scope.emailExistsWarning.editEmail = function(){
				angular.element("#login_create_submit_btn").removeClass("active_btn");
                $rootScope.modalEmailUsedVisible = false;
                $rootScope.targetFieldSet[0].text = "";
                $rootScope.keyboardShow();
            };
            scope.emailExistsWarning.loginWithEmail = function() {
                $rootScope.modalEmailUsedVisible = false;
                //Set email on login page to email on reg page
                $rootScope.fields.login[0].text = $rootScope.targetFieldSet[0].text;
                $rootScope.loadModal(scope.emailExistsWarning.loginMode);
            };
            scope.emailExistsWarning.init();
        }

    };
}]);
