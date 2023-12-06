higiKioskControllers.directive('shutDownHPodModal', ['$http', '$location', '$timeout', 'HigiApiService', 'JkioskService', 'HigiKioskStorageService', 'HigiKioskUserService', 'HigiKioskUtilitiesService', '$rootScope', 'HigiKioskAnimationService', '$route', '$sce', function ($http, $location, $timeout, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUserService, HigiKioskUtilitiesService, $rootScope, HigiKioskAnimationService, $route, $sce) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/shutdown-hpod.html',
        controller: function ($scope) {
            window.addEventListener('message', async function(event) {
                console.log(event.data);
                let decryptQRCodeVal = $scope.aesDecryption(event.data);
                console.log(decryptQRCodeVal);
                $rootScope.initShutDownHPodByQRCode(decryptQRCodeVal);
            });

            $scope.aesDecryption = function(data) {
                let key = getSettingsValue('kiosk.fkQrCodeSecretKey');
                let decrypted = CryptoJS.AES.decrypt(data, key, 
                    {
                        mode:CryptoJS.mode.CBC,
                        padding:CryptoJS.pad.Pkcs7 
                    }
                );
                return decrypted.toString(CryptoJS.enc.Utf8);
            }
        }
    }
}])