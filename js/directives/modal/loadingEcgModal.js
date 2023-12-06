higiKioskControllers.directive("loadingEcgModal", ['$rootScope', '$timeout', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', function($rootScope, $timeout, HigiKioskStorageService, HigiKioskUtilitiesService) {
        return {
            restrict : 'E',
            templateUrl: 'components/modal/ecg-page-loading.html',
            scope : false,
            link : function(scope, element, attr){
                scope.loadingModalReadyVisibleTimer = $timeout(function(){
                    scope.loadingModalReadyVisible = true;
                }, HigiKioskStorageService.getSettingsValue('page.load.show.loader.delay'));
                $rootScope.loadingModalTimeout = $timeout(function(){
                    scope.pageLoadErrorMessageOne = "page.load.error.message.one";

                    console.log('Loading timeout fired '  + HigiKioskUtilitiesService.generateSessionId())
                    //Set up reload timeout
                    $rootScope.loadingModalTimeoutReloadTimeout = $timeout(
                        function(){
                            window.location = "index.html";
                        },
                        HigiKioskStorageService.getSettingsValue('session.maintenance.retry.time')
                    );
                }, HigiKioskStorageService.getSettingsValue('page.load.error.timeout'));
            }
        }
    }]);