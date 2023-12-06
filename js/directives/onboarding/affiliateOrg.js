//Onboarding affiliation
angular
    .module("higiKioskUi")
    .directive("affiliateOrg", ['$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', function($rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'components/onboarding/affiliate-org.html',
            scope : {
            affiliateCheck : "="
            },
            link: function(scope, elem, attr) {
                //alert("i am loaded");

                scope.overallAffiliates = $rootScope.overallAffiliates;
                $rootScope.affiliatedOrg = null;
                scope.submitResult = function(result) {

                    $rootScope.affiliatedOrg = result;

                    angular.element("#confirm_btn_aff").addClass("active_btn");
                };
            }
        }
    }]);