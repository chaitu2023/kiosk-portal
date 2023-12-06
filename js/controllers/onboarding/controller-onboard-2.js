
higiKioskControllers.controller('HigiKioskOnboardingController2', ['$scope', '$routeParams', '$rootScope' , '$http', 'HigiKioskFlow', 'HigiKioskAnimationService', '$q', '$timeout', 'HigiKioskStorageService', 'HigiKioskUserService', 'JkioskService', 'HigiApiService', function ($scope, $routeParams, $rootScope, $http,  HigiKioskFlow, HigiKioskAnimationService, $q, $timeout, HigiKioskStorageService, HigiKioskUserService, JkioskService, HigiApiService) {

    $scope.init = function () {
        
        $scope.directiveClickable = true;
        
        $scope.setSlideDirection($routeParams.direction);
        
        $scope.slideTitle = "global.about.you";
        $scope.slideSubTitle = "height01.how.tall";
        $scope.slideWhyHeight = "height01.why.height";
        $scope.currentOfTotal = 'onboarding.3.of.3';
        $scope.buttonEnterRight = 'button-enter-right';
        $scope.buttonExitRight = 'button-exit-right';
        $scope.buttonEnterLeft = 'button-enter-left';
        $scope.buttonExitLeft = 'button-exit-left';
        //$scope.showCurrentOfTotal = ($scope.mode == "w");
        $scope.audioFiles = [
            {filename: 'height01_audio01'}
        ];
        console.log("starts here");
        $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode') 
        var links = HigiKioskFlow.slideLinks('HigiKioskOnboardingController2',$scope.mode);
        console.log(links);
        $scope.isvisible = true;
         //Sumithra code starts
        if($rootScope.mode == "bpw"){
        var mode = "bpw";
        var currenttest;
        $scope.nextSlide = HigiKioskFlow.nextTest(mode,currenttest);
        }
        else{
            $scope.nextSlide = links.next.link;
        }
        // alert("$scope.nextSlide : "+$scope.nextSlide);
        //Sumithra code ends
       // $scope.nextSlide = links.next.link;
        //$scope.nextSlideText = links.next.label;
        $scope.nextSlideText = "global.startYourTest";
        if (links.previous == null) {
            $scope.prevSlide = "";
            $scope.prevSlideText = "";
        } else {
            $scope.prevSlide = links.previous.link;
            $scope.prevSlideText = links.previous.label;
        }
        $scope.q = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope);

        if (!$rootScope.eSanjeevaniFlow) {
            $scope.q.promise.
            then(function(){
                    $scope.prevIsVisible = (links.previous != null);
            });
        }
        //Modifications.    
        //$scope.cat_height=['CM','FT'];
    };
    $scope.saveUserInfo = function(){
        if(HigiKioskStorageService.returnSessionData('user') != undefined){
            var user = HigiKioskStorageService.returnSessionData('user');
            var userUpdate = HigiKioskUserService.compareUser(user, HigiKioskStorageService.returnSessionData);
            //Update user if logged in and data has changed
            if(HigiKioskStorageService.returnSessionData('logged_in') && userUpdate != null){
                JkioskService.registerKiosk();
                HigiKioskStorageService.saveSessionData('userBasicInfo', userUpdate);
                HigiApiService.UpdateUserAsync(user.id, userUpdate,
                    function () {
                        console.log('saving user data after onboard exit');
                    },
                    function () {
                        console.log('failed saving user data after onboard exit');
                    });
                /**
                 * HigiApiService.MemoryQueueUpdateUserAsync(user.id, userUpdate,
                 function () {
                        console.log('saving user data after onboard exit');
                    },
                 function () {
                        console.log('failed saving user data after onboard exit');
                    }
                 );
                 */
            }
        }
    };
    $scope.nextButtonOut = function(){
        JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
        HigiKioskAnimationService.audioStop();
        $scope.saveUserInfo();
        $scope.directiveClickable = false;
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide forward';
        if ($rootScope.mehtaFlow && HigiKioskStorageService.returnSessionData('logged_in')) {
            $rootScope.mehtaNextSlide = $scope.nextSlide;
            $rootScope.mehtaFlowInit();
        }

        $timeout(function(){
            window.location = $scope.nextSlide;
            $scope.checkTeleconsultaionServiceProvided($scope.nextSlide);
        }, 500)

    };
    $scope.backButtonOut = function(){
    	JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_backButton', 'button', 'pressed');
        $scope.nextVisible = false;
        $scope.prevIsVisible = false;
        $scope.pageClass = 'slide back';
        $timeout(function(){
            window.location = $scope.prevSlide;
        }, 500)
    };
    $scope.checkTeleconsultaionServiceProvided = function(route){
        if (route == "#/ihl-teleconsultation-main-dashboard") {
            let userData = HigiKioskStorageService.returnSessionData('user');
            if (userData != undefined && userData != null) {
                if (userData['teleconsult_last_checkin_service'] != undefined && userData['teleconsult_last_checkin_service'] != null) {
                    if (userData['teleconsult_last_checkin_service']['service_provided'] == false && userData['teleconsult_last_checkin_service']['vendor_name'] == 'APOLLO') {
                        $rootScope.apolloConsultationLastSessionUncomplete = true;
                        $rootScope.teleModalboxAppearedOneTime = true;
                        $rootScope.invoiceIdForApolloTeleconsultationService = userData['teleconsult_last_checkin_service']['invoice_number'];
                        $(".keyboard_class_close_btn").hide();

                        $timeout(() => {
                            $rootScope.loadModal({id: 'serviceProvider'});
                        },300);
                    }
                }
            }
        }
    };

    $scope.init();
}]);