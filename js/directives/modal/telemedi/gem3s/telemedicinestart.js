higiKioskControllers.directive('telemedicineStartModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/telemedi/gem3s/telemedicine-start.html',
        controller :function($scope) {
            $scope.telemediAgreement = true;
             $scope.telemedicineStart = new Object();

            $scope.telemedicineStart.init = function(){
                //alert("telemedicineStartModal");
                $scope.telemedicinetitles = "global.telemedicine.buttontitle";
                $scope.consultdoctormessage = "global.telemedicine.consultdoctormessage";
                $scope.acceptdoctor = "global.telemedicine.acceptdoctor";
                $scope.declinedoctor = "global.telemedicine.declinedoctor";
                $scope.termscondition = "global.telemedicine.beforestart";
                $scope.agreebutton ="global.agreebutton";
                $scope.disagreebutton = "global.disagreebutton";   
                $scope.submitbutton = "global.submitbutton";         
               
            };

            $scope.telemedicineStart.agreedbuttonclass = '';
            $scope.telemedicineStart.declinedbuttonclass = '';
            $scope.telemedicineStart.submitbuttonclass = '';
                    
            $scope.telemedicineStart.toggleagreed = function(){    
                if($scope.telemedicineStart.agreedbuttonclass == ''){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_agreed', 'checkbox', 'checked');
                    $scope.telemedicineStart.agreedbuttonclass = 'active_btn';
                    $scope.telemedicineStart.submitbuttonclass = 'active_btn';
                    $scope.telemedicineStart.declinedbuttonclass = ''; 
                    $scope.telemedicineStart.agree = true;
                    $scope.telemedicineStart.telemedvaliduser = true;
                } else  if($scope.telemedicineStart.agreedbuttonclass == 'active_btn'){
                   JkioskService.logEvent($rootScope.currentKeyboardState + '_agreed', 'checkbox', 'checkbox', 'unchecked');
                     $scope.telemedicineStart.agreedbuttonclass = '';
                    $scope.telemedicineStart.submitbuttonclass = '';
                    $scope.telemedicineStart.declinedbuttonclass = ''; 
                }

            };

            $scope.telemedicineStart.toggledeclined = function(){  
                if($scope.telemedicineStart.declinedbuttonclass == ''){
                    JkioskService.logEvent( $rootScope.currentKeyboardState + '_disagreed', 'checkbox', 'checked');
                    $scope.telemedicineStart.declinedbuttonclass = 'active_btn';
                    $scope.telemedicineStart.submitbuttonclass = 'active_btn';
                    $scope.telemedicineStart.agreedbuttonclass = '';
                    $scope.telemedicineStart.agree = false;
                    $scope.telemedicineStart.telemedvaliduser = false;
                } else if( $scope.telemedicineStart.declinedbuttonclass == 'active_btn'){
                    JkioskService.logEvent(  $rootScope.currentKeyboardState + '_disagreed', 'checkbox', 'unchecked');
                    $scope.telemedicineStart.declinedbuttonclass = '';
                    $scope.telemedicineStart.agreedbuttonclass = '';
                    $scope.telemedicineStart.submitbuttonclass = '';
                    
                }

            };  

            // Function to list the specialists


            $scope.telemedicineStart.submitBtn = function(){

                $("#teleMedLoad").show();

                if($scope.telemedicineStart.agree) {

                    var teleagreeemail = HigiKioskStorageService.returnSessionData('telemedAuthorizedEmail');
                    var teleagreepassword = $rootScope.logged_pass;
                    var teleagreement = $scope.telemedicineStart.agree;
                    var telemeduser = true;

                    console.log(teleagreeemail);
                    console.log(teleagreepassword);
                    console.log(teleagreement);
                    console.log(telemeduser);
                    
                    var jsontext = '{"email": "'+teleagreeemail+'" , "password": "'+teleagreepassword+'" , "isTeleMedPolicyAgreed":"'+teleagreement+'" ,"isTeleMedUser":"'+telemeduser+'"}';

                    console.log(jsontext);

                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/login/qlogin2",
                        type : "POST", 
                        cache: false,
                        data:jsontext,
                        contentType: 'application/json; charset=UTF-8',
                        dataType: 'json',
                        headers: { 'ApiToken': "32iYJ+Lw/duU/2jiMHf8vQcmtD4SxpuKcwt7n/ej5dgvZPUgvHaYQHPRW3nh+GT+N9bfMEK5fofdt9AfA6T9S3BnDHVe0FvUYuPmnMO0WGQBAA==" },
                        success: function(html){
                            console.log(html);
                            var qlogin = html;
                            $rootScope.userToken = qlogin.Token;
                            $rootScope.UserInfo = qlogin.User;
                        },
                        error : function(xhr, status, error) { 
                            console.log(error);
                        } 
                    
                    });

                    $("#teleMedLoad").hide();
                    $rootScope.clearModal();
                    if($rootScope.telemediApiVendor == "gem3s"){
                        window.location = "#/specialist";     
                    } else if($rootScope.telemediApiVendor == "genix"){
                        window.location = "#/speciality";  
                    }

                } else {
                    $("#teleMedLoad").hide();
                    $rootScope.clearModal();
                }
            }


            $scope.telemedicineStart.init();

            $rootScope.doctorsavailablespecialty =[];

            $scope.Doctoravailabilitylistres = function(Res){
                console.log(Res);
                $scope.doctorsavailables = JSON.parse(Res.response);
                console.log($scope.doctorsavailables);
                console.log($scope.doctorsavailables.data);
                var index = 0;
                for (var i = 0; i < $scope.doctorsavailables.data.length; i++) {
                    if($scope.doctorsavailables.data[i].online_status == "online" ){
                        $rootScope.doctorsavailablespecialty[index] = $scope.doctorsavailables.data[i].specialty;
                        index++;
                    }
                }

                console.log($rootScope.doctorsavailablespecialty);
                $rootScope.clearModal();
                window.location = "#/specialist";                 
            }

            $scope.telemediSlideNxtBtn = function(slide){
                console.log(slide);
                if(slide.slideIndex < slide.slideLength - 1) {
                    $scope.telemedi.queSlide[slide.slideIndex].slideShow = false;
                    var nextslide = slide.slideIndex + 1;
                    $scope.telemedi.queSlide[nextslide].slideShow = true;
                } else {
                    console.log("next slide load faild"+ slide.slideIndex);
                }
            }

            $scope.telemediSlideBckBtn = function(slide){
                console.log(slide);
                if(slide.slideIndex > 0) {
                    $scope.telemedi.queSlide[slide.slideIndex].slideShow = false;
                    var backSlide = slide.slideIndex - 1;
                    $scope.telemedi.queSlide[backSlide].slideShow = true;
                } else {
                    console.log("back slide load faild"+ slide.slideIndex);
                }
            }

            $scope.telemediSlideSubmitBtn = function(slide){
                $scope.modalHide();
                window.location = "#/doctorlist"
            }
        }
    };
}]);


