//Global audio
angular
    .module("higiKioskUi")
    .directive("wavingGuy", ['$q', 'HigiKioskUserService', 'JkioskService', 'HigiApiService', 'HigiKioskStorageService', '$sce' , '$rootScope', function($q, HigiKioskUserService, JkioskService, HigiApiService, HigiKioskStorageService,  $sce, $rootScope) {
        return {
            restrict: 'E',
            scope: false,
            templateUrl: 'components/finalresults/comebacksoon-waving-guy.html',
            link: function (scope, element, attr) {
                function animateComebacksoonHigiWave() {
                    $('#comebacksoon01_higiguy_arm').transition({'rotate':'+=12deg'}, 400, 'in-out')
                        .transition({'rotate':'-=12deg'}, 400, 'in-out', animateComebacksoonHigiWave);
                }

                function animateComebacksoonHigiFloat(){
                    $('#comebacksoon01_higiguy').animate({'top':'+=6px'}, 1000, 'easeInOut')
                        .delay(800)
                        .animate({'top':'-=6px'}, 1400, 'easeInOut', animateComebacksoonHigiFloat);
                };

                $('#comebacksoon01_higiguy_arm').transition({'transformOrigin':'34px 93px'});
                animateComebacksoonHigiWave();
                animateComebacksoonHigiFloat();

            }
        }
    }]);



