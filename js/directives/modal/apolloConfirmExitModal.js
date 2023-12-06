 higiKioskControllers.directive('apolloConfirmExitModal', ['$rootScope' , 'HigiKioskStorageService' , 'JkioskService' , 'HigiKioskAnimationService', '$location', '$timeout', function($rootScope, HigiKioskStorageService, JkioskService, HigiKioskAnimationService, $location, $timeout) {
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/apollo-confirm-exit.html',
        link :function(scope, elem, attr){
            scope.apolloConfirmExit = new Object();
            scope.apolloConfirmExit.consultationEndText = "global.consultationEndText";
            scope.apolloConfirmExit.goHomePageText = "global.goHomePageText";
            scope.apolloConfirmExit.LastconsultationNotEndText = "global.LastconsultationNotEndText";
            scope.apolloConfirmExit.wishToContinuePreviousConsultationText = "global.wishToContinuePreviousConsultationText";
            scope.apolloConfirmExit.wishToContinuePreviousSessionButtonYes = "global.wishToContinuePreviousSessionButtonYes";
            scope.apolloConfirmExit.wishToContinuePreviousSessionButtonNo = "global.wishToContinuePreviousSessionButtonNo";
            scope.apolloConfirmExit.init = function() {
            };

            scope.apolloConfirmExit.stayInCall = function() {
                $rootScope.clearModal();
                $(".keyboard_class_close_btn").show();
                document.getElementById("apolloMainIframeContainer").style.visibility = "visible";
            };

            scope.apolloConfirmExit.noGoHome = function() {
               $rootScope.apolloCofirmGoHomeButtonClicked = true;
               $rootScope.apolloTeleConsultationPopup = {
                    'videoCallIframe': false
                };
                $rootScope.apolloTeleConsultationSourceDetails.apolloTeleConsultationVideoCallUrl = "";
               document.getElementById("apolloMainIframeContainer").style.visibility = "visible";
            };

            scope.apolloConfirmExit.noStartNewConsultation = function(){
                $rootScope.apolloTeleConsultationPopup = {
                    'videoCallIframe': false
                };

                $rootScope.apolloTeleConsultationSourceDetails = {
                  'userBasicDetails': null,
                  'specialityId': undefined,
                  'appointmentId': undefined,
                  'apolloTeleConsultationVideoCallUrl':"",
                  'message':"",
                  'casesheetId': "",
                  'doctorInformation': null
                };
                $rootScope.apolloCofirmGoHomeButtonClicked = false;
                $rootScope.clearModal();
                $(".keyboard_class_close_btn").show();
                $rootScope.teleConsultationVideoCallServiceProvided();
            }

            scope.apolloConfirmExit.yesCotinuePreviousConsultation = function(){
                $rootScope.clearModal();
                $(".keyboard_class_close_btn").show();
                console.log($rootScope.apolloTeleConsultationSourceDetails['doctorInformation']);
                let consultantDetail = {
                    'consultant_name':  $rootScope.apolloTeleConsultationSourceDetails['doctorInformation']['name'],
                    'ihl_consultant_id':  $rootScope.apolloTeleConsultationSourceDetails['doctorInformation']['ihl_consultant_id'],
                    'vendor_consultant_id':  $rootScope.apolloTeleConsultationSourceDetails['doctorInformation']['vendor_consultant_id'],
                    'vendor_id': ( $rootScope.apolloTeleConsultationSourceDetails['doctorInformation']['vendor_id'] || "")
                };
                $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-doctor'] = consultantDetail;
                $rootScope.teleconsultationUserSelectedData['tele-consultation-selected-type'] = 'Medical Consultation';
                $rootScope.apolloCofirmGoHomeButtonClicked = false;
                $rootScope.useralredyinTeleflow = false; //to reset(to be visible) the "consult Doctor Now" button in ApolloTelecall of Take Test flow
                window.location = '#/apollo-teleconsultation-video-call';
            }

            scope.apolloConfirmExit.init();
        }

    };
}]);

