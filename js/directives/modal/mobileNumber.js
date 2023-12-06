higiKioskControllers.directive('mobileNumberModal', ['$rootScope','HigiKioskUserService', 'HigiKioskUtilitiesService', 'HigiKioskStorageService', 'HigiApiService', '$timeout', 'JkioskService', function( $rootScope, HigiKioskUserService, HigiKioskUtilitiesService, HigiKioskStorageService, HigiApiService, $timeout, JkioskService) {
    return {
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/mobile-number.html',
        controller :function($scope){
            $scope.disable_next = "disabled_next";
            $scope.mobvalidmessage = "";
            $scope.mobileNumber = new Object();

            $scope.mobileNumber.init = function(){
                $scope.mobileNumber.entermobnum = "welcomeModals.payment.entermobnum";
                $scope.mobileNumber.NEXT = "global.next";
                $scope.mobileNumber.fields = [
                    {id : "mobilenum" , placeholder : $scope.mobileNumber.entermobnum, defaultText :$scope.mobileNumber.entermobnum, text : '', type :'text' ,visible : true , selectedClass : '', focus : function(){$rootScope.focusField(this)} ,callback : function(){$scope.mobileNumber.mobilenumLengthCheck(this)}, usesPlaceholder : true}
                ];
            };
            
            $scope.mobileNumber.init();

            $rootScope.mobileNumberInit = $scope.mobileNumber.init;

            $scope.mobileNumber.mobilenumLengthCheck = function(field){
                if(field.text.length == 10 && field.text != "" && !(isNaN(field.text)) && field.text != null) {
                    var emailIsThis = "";
                    var mobileIsThis = field.text;
                    var aadhaarIsThis = "";
                    $.ajax({
                        url: getSettingsValue('kiosk.api.url') + "/login/kioskLogin?id=2936",
                        type: "GET",
                        cache: false,
                        dataType: 'json',
                        headers: { 'ApiToken': 'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA==' },
                        success: function (html) {
                            var json = JSON.parse(JSON.stringify(html));
                            var jss = JSON.stringify(json);
                            console.log(json);
                            var token = json.ApiKey;
                            $.ajax({
                                url: getSettingsValue('kiosk.api.url') + "/login/emailormobileused?email=" + emailIsThis + "&mobile=" + mobileIsThis + "&aadhaar=" + aadhaarIsThis,
                                type: "GET",
                                cache: false,
                                contentType: 'application/json; charset=UTF-8',
                                headers: { "ApiToken": token },
                                success: function (html) {
                                    console.log(JSON.stringify(html));
                                    emailOrMobileExist = JSON.stringify(html);
                                    //alert(emailOrMobileExist);
                                    var finalString = emailOrMobileExist.replace(/['"]+/g, '');

                                    if (finalString == "You never registered with this Mobile number") {                                        
                                        $scope.disable_next = "";
                                        $scope.mobvalidmessage = "";
                                    }
                                    else if (finalString == "") {
                                        $scope.disable_next = "disabled_next";
                                        $("#MobileNoAlreadyExists").show();                                        
                                        $scope.MobileNoAlreadyExists = "welcomeModals.MobileNoAlreadyExists";
                                        $scope.mobvalidmessage = "";
                                        $timeout(function() {
                                            $("#MobileNoAlreadyExists").hide();
                                        }, 3000);
                                    }
                                },
                                error: function (xhr, status, error) {
                                    console.log('failures 3' + xhr.responseText);
                                }
                            });
                        }
                    });
                } else if(field.text.length == 0){
                    $scope.disable_next = "disabled_next";
                    $scope.mobvalidmessage = "";
                } else{
                    $scope.disable_next = "disabled_next";
                    $scope.mobvalidmessage = "welcomeModals.payment.mobvalidmessage";
                }
            };

            $scope.mobileNumberValue = function(){
                //alert("called");
                console.log( $scope.mobileNumber.fields[0].text);
                $rootScope.newMobileNumber = $scope.mobileNumber.fields[0].text;
                $rootScope.mobileNumberValidate = false;
                HigiKioskStorageService.saveSessionData('telemedUserMobileNumber', $scope.mobileNumber.fields[0].text);
                // developement code
                //alert("$scope.Addpatient fn callled after click submit btn");


                var userId = HigiKioskStorageService.returnSessionData('telemedloginUserId');
                var json = HigiKioskStorageService.returnSessionData('qlogin');
                console.log(json);
                json.User.mobileNumber = $scope.mobileNumber.fields[0].text;
                $("#teleMedLoad").show();
                $.ajax({
                    url: getSettingsValue('kiosk.api.url') + "/data/user/"+userId+"",
                    type : "POST", 
                    cache: false,
                    data:JSON.stringify(json.User),
                    contentType: 'application/json; charset=UTF-8',  
                    dataType: 'json',
                    headers: { 'ApiToken': HigiApiKey , 'Token': json.Token},
                    success: function(html){
                        //alert("success DELTEE Completed");
                        console.log(html); 

                        $timeout(function(){
                           $("#teleMedLoad").hide();
                        },2000);
                        // alert("delete completed");                          
                    },
                    error : function(xhr, status, error) { 
                        console.log(error);
                        console.log(status);
                        console.log('failures 3'+xhr.responseText);  

                        $timeout(function(){
                           $("#teleMedLoad").hide();
                        },2000);
                    } 
                });

                if($rootScope.telemediApiVendor == "gem3s"){
                    $rootScope.gem3spatientReg();
                } else if($rootScope.telemediApiVendor == "genix"){
                    $rootScope.Addpatient();
                } else {
                    console.log("not proper data received from")
                }
                $rootScope.clearModal();
            }    
        }
    };
}]);