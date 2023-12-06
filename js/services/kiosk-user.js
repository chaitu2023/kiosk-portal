var higiServices = angular.module("higiKioskUi");
higiServices.factory('HigiKioskUserService', ['$http' , '$rootScope' , 'HigiApiService' , 'JkioskService', 'HigiKioskStorageService','HigiKioskUtilitiesService', '$route', 'HigiKioskAnimationService','HigiKioskVitalReference', function($http, $rootScope, HigiApiService, JkioskService, HigiKioskStorageService, HigiKioskUtilitiesService, $route, HigiKioskAnimationService,HigiKioskVitalReference) {

           
           var DengueLastCheckinData;
           var MalariaLastCheckinData;
           var HivLastCheckinData;
           var PregLastCheckinData;
           var GlcLastCheckinData;
           var ECGBpmLastCheckinData;
           var Spo2LastCheckinData;
           var systolicLastCheckinData;
           var diastolicLastCheckinData;
           var pulseBpmLastCheckinData;
           var fatRatioLastCheckinData;
           var temperatureLastCheckinData;
           var weightKGLastCheckinData;
           var endpointLastCheckinData = "previousVital";
           var LeadModeLastCheckinData;
           var bmcOhmsLastCheckinData;
          
          



    return {
        writtenGuages : [],

        saveSessionData : function(key, value){
            //Local savesession data in case other non UI is looking at localstorage
            localStorage.setItem(key, value);
            HigiKioskStorageService.saveSessionData(key, value)
        },
        compareUser : function(onServer, getSessionData){
                var user = new HigiUser();
                var boolChanged = false;

                if (onServer.gender != getSessionData('gender')) {
                    user.gender = getSessionData('gender');
                    boolChanged = true;
                }

                if (onServer.heightMeters != getSessionData('height')) {
                    user.heightMeters = getSessionData('height');
                    boolChanged = true;
                } 

                if (!onServer.dateOfBirth) {
                    user.dateOfBirth = getSessionData('birthdate');
                    boolChanged = true;
                }
                if (onServer.lastName != getSessionData('lastName')) {
                    user.lastName = getSessionData('lastName');
                    boolChanged = true;
                }
                if (onServer.firstName != getSessionData('firstName')) {
                    user.firstName = getSessionData('firstName');
                    boolChanged = true;
                }
                if (!boolChanged) {
                    return null;
                }
                return user;

        },
        onboardingDone : function(){
            //if user bp only, allow to skip onboarding if gender and birthdate are set
            
            if(HigiKioskStorageService.returnSessionData('gender') != undefined && HigiKioskStorageService.returnSessionData('birthdate') != undefined  && HigiKioskStorageService.returnSessionData('height') != undefined){
                onboardingDone = true;
            } else {
                onboardingDone = false;
            }
            return onboardingDone;
        },
        confirmTouPP : function(){
            return (this.confirmTou() && this.confirmPP());
        },
        confirmTou : function(){
            console.log( "terms " + (HigiKioskStorageService.returnSessionData('user').terms.termsFileName == HigiKioskStorageService.getSettingsValue('terms.filename')))
            return (HigiKioskStorageService.returnSessionData('user').terms.termsFileName == HigiKioskStorageService.getSettingsValue('terms.filename'));
        },

        confirmPP : function(){
            console.log("ppol " + (HigiKioskStorageService.returnSessionData('user').privacyAgreed.privacyFileName == HigiKioskStorageService.getSettingsValue('privacy.policy.filename')))
            return (HigiKioskStorageService.returnSessionData('user').privacyAgreed.privacyFileName == HigiKioskStorageService.getSettingsValue('privacy.policy.filename'));
        },

        writeGuage : function(id, size, stroke, higiScore, text, fill, playSound) {

            //don't re-write instances of score guages.
            if(this.writtenGuages[id] != undefined){
                return false;
            } else {
                this.writtenGuages[id] = true;
            }

            var archtype = Raphael(document.getElementById(id), size, size);
            archtype.customAttributes.arc = function(centerX, centerY, value, total, radius){
                var
                    angle = value / total * 359.99,
                    absAngle = Math.abs(angle),
                    a = Math.PI / 180 * (90 - angle),
                    x = centerX + radius * Math.cos(a),
                    y = centerY - radius * Math.sin(a),
                    sweep = +(value >= 0),
                    path;

                path = [
                    ['M', centerX, centerY - radius],
                    ['A', radius, radius, 0, +(absAngle > 180), sweep, x, y]
                ];

                return { 'path': path };
            };
            //var profileImg = "url(" +$('#' + id).data('profile-img') + ")" || 'none';
            arc_one = archtype.path().attr({
                "stroke": "#76c045",
                "stroke-width": stroke,
                "stroke-linecap": "round"
            });

            arc_two = archtype.path().attr({
                "stroke": "#eae8e8",
                "stroke-width": stroke,
                "fill" : (typeof(fill) == "undefined" || fill == "") ? "none" : fill
            });
            if(typeof(text) != "undefined" && text != ""){
                archtype.text(size/2, size/4, text).attr({'fill' : '#76c044' , "font-size": 15 });
            }
            //If score not defined, assume fill disc and skip mask.
            bodyPosition = (typeof(higiScore) != 'undefined') ? higiScore : 1000;
            var value = Math.round((bodyPosition/999) * 100);

            var init_arc = 0;
            var arc_animate = function(){
                init_arc++;


                new_arc = arc_one.animate({
                    arc: [size/2, size/2, init_arc, 100, (size - stroke) /2]
                });


                if(init_arc < value){
                    setTimeout(arc_animate, 10);

                }else {

                }
            };

            if(bodyPosition != 1000){
                setTimeout(function(){
                    arc_animate();
                    if(playSound == true){
                        xpBarLevelUpSnd.play();
                    }
                }, 100);
            }else{
                new_arc = arc_one.animate({
                    arc: [size/2, size/2, value, 100, (size - stroke) /2]
                });

            }

            background_arc = arc_two.toBack().animate({
                arc: [size/2, size/2, 100, 100, (size - stroke) /2]
            });

            if(bodyPosition < 999){
                arc_three = archtype.path().attr({
                    "stroke": "#eae8e8",
                    "stroke-width": stroke
                });
                mask_arc = arc_three.animate({
                    arc: [(size/2), (size/2), -5, 100, (size - stroke) /2]
                });

            }
            var applyTransform = function(){
                arc_one.transform("t" + size + "," + size + "r-180");
                mask_arc.transform("t" + size + "," + size + "r-180");
            }
        },


        initSession : function (user, lastCheckin, newUser, userToken, userData, callback) {

            if (newUser) {
                JkioskService.logEvent('keyboardDialog', 'user', 'registered');
                JkioskService.logInfo("", "User Register", "");
            }
            else {
                JkioskService.logEvent('keyboardDialog', 'user', 'authenticated');
                JkioskService.logInfo("", "Logged In", "");
            }

            // set the session token for the user
            HigiUserToken = userToken;
            ihlUserToken = userToken;
            HigiKioskStorageService.saveSessionData('logged_in', true);
            $rootScope.isLoggedInLangClass = "higi_logged_in";
            //$rootScope.loggedIn = true;
            if (user)
            {
                HigiKioskStorageService.saveSessionData('user', user);
                
                if (user.last_checkin_services != undefined && user.last_checkin_services != null) {
                    $rootScope.userPaidServices = user.last_checkin_services;
                }else{
                    $rootScope.userPaidServices = {
                      "weight": false,
                      "bp": false,
                      "bmc": false,
                      "bmc_full": false,
                      "ecg": false,
                      "spo2": false,
                      "temperature": false,
                      "service_provided": false,
                      "invoice_id": ""
                    };
                }
            }

            //transfer saved user data into the session data
            if (user.email != undefined && !HigiKioskStorageService.returnSessionData('email')) {
                HigiKioskStorageService.saveSessionData('email', user.email);
            }
            if ((user.gender == "m" || user.gender == "f") && !HigiKioskStorageService.returnSessionData('gender')) {
                HigiKioskStorageService.saveSessionData('gender', user.gender);
            }
            if (user.heightMeters != undefined && !HigiKioskStorageService.returnSessionData('height')) {
                HigiKioskStorageService.saveSessionData('height', user.heightMeters);
            }
            if (user.dateOfBirth != undefined) {
                HigiKioskStorageService.saveSessionData('birthdate', user.dateOfBirth);
            }
            if (user.lastName != undefined) {
                HigiKioskStorageService.saveSessionData('lastName', user.lastName);
            }
            if (user.firstName != undefined) {
                HigiKioskStorageService.saveSessionData('firstName', user.firstName);
            }
            if ((user.Notifications) && (user.Notifications.EmailCheckins) && (user.Notifications.EmailCheckins == 'true')) {
                HigiKioskStorageService.saveSessionData('email_checkins', true);
            }

            if(user.earndItEnabled){
                $rootScope.earnditEnabled = true;
                var setPoints = function(points){
                    if(points){
                        HigiKioskStorageService.saveSessionData('earnditPoints', points.points);
                    }
                };
                var setPointsError = function(){
                    console.log("Set earndit points error fired.")
                };
                HigiApiService.getEarnditPoints(user.id, setPoints, setPointsError);

            } else {
                $rootScope.earnditEnabled = false;
            }

            if(userData != undefined) {
                if( userData.LastAwards != undefined ){
                    HigiKioskStorageService.saveSessionData('lastAwards', userData.LastAwards );
                }
                if( userData.AllAwards != undefined ){
                    HigiKioskStorageService.saveSessionData('allAwards', userData.AllAwards );
                }
                if( userData.LastActivities != undefined ){
                    HigiKioskStorageService.saveSessionData('lastActivities', userData.LastActivities );
                }
                if( userData.UserLevel != undefined ){
                    HigiKioskStorageService.saveSessionData('userLevel', userData.UserLevel );
                }
                if( userData.LevelDef != undefined ){
                    HigiKioskStorageService.saveSessionData('levelDef', userData.LevelDef );
                }
                if( userData.LevelDef != undefined ){
                    HigiKioskStorageService.saveSessionData('nextLevels', userData.NextLevels );
                }
                if( userData.HigiWatts != undefined ){
                    HigiKioskStorageService.saveSessionData('higiWatts', userData.HigiWatts );
                }
            }

            if (!userToken)
            {
                return;
            }

            currentUserProfileImage = HigiApiService.getProfileImage(user);

            if (lastCheckin != undefined) {
                HigiKioskStorageService.saveSessionData('lastCheckin', lastCheckin);
                HigiKioskStorageService.saveSessionData('nolastCheckin' , false);
                if(this.confirmTouPP()){

                    if(HigiKioskStorageService.returnSessionData('hasChallenge')){
                        if($rootScope.earnditEnabled){
                            if(HigiKioskStorageService.returnSessionData('challengeObject').joinUrl == undefined){
                                HigiKioskStorageService.saveSessionData("userInChallenge", true);
                            }
                            if(!$rootScope.earnditEnabled || $route.current.$$route.originalPath.search("finish") != -1){
                                $rootScope.loadModal({id : 'lastcheckin'});
                            }
                            else {
                                if(HigiKioskStorageService.returnSessionData('challengeObject').joinUrl == undefined && HigiKioskStorageService.returnSessionData('mode') != undefined){
                                    //Has challenge, in challenge, mode set, start test
                                    $rootScope.clearModal();
                                } else {
                                    $rootScope.loadModal({id : 'lastcheckin'});
                                }
                            }
                        } else {
                            //Need to grab join URL. won't have from qlogin bc no earndit
                            var challengeObject = {challengeId : HigiKioskStorageService.returnSessionData('challengeModalAd').challengeId}
                            var success = function(response){
                                console.log(response)
                                var challengeObject = {joinUrl : HigiKioskStorageService.getSettingsValue('kiosk.api.earndit.url') + response.response.joinUrl}
                                HigiKioskStorageService.saveSessionData('challengeObject', challengeObject);
                                $rootScope.loadModal({id : 'lastcheckin'});
                            };
                            var error = function(){
                                JkioskService.logEvent($rootScope.higiPageName + "_register", "error", "error retrieving challenge");
                                HigiKioskStorageService.saveSessionData('hasChallenge', false);
                                HigiKioskStorageService.saveSessionData('challengeModalAd', null);
                                $rootScope.loadModal({id : 'lastcheckin'});
                            };
                            HigiApiService.GetEarnditChallengeAnonymous(challengeObject, success, error);

                        }
                    } else {
                        if($rootScope.mode != "" && $route.current.$$route.originalPath.search("finish") == -1){
                            //Mode set, start test
                            $rootScope.showLoggedInNav();
                            $rootScope.clearModal();
                        } else {
                                if(HigiKioskStorageService.returnSessionData('signup_after_finish') != 'yes'){                          
                                    $rootScope.loadModal({id: 'lastcheckin'});
                                } else {
                                    $rootScope.showLoggedInNav();
                                    $rootScope.clearModal();
                                }
                            //Mode not set, show last checkin
                            //$rootScope.loadModal({id : 'lastcheckin'});
                        }
                    }


                } else {
                    if(this.confirmTou()){
                        var page = "confirmppol";
                    } else if(!this.confirmPP()){

                        var page = "confirmppolterms";
                    } else {

                        var page = "confirmterms";

                    }
                    $rootScope.showLoggedInNav();
                    $rootScope.loadModal({id : page});
                }
            } else {
                HigiKioskStorageService.saveSessionData('nolastCheckin' , true);
                if(newUser){
                    //todo set to use hasChallenge from session data instead of rootscope - HigiKioskStorageService.saveSessionData('hasChallenge', false);
                    //if($rootScope.hasChallenge){
                    if(HigiKioskStorageService.returnSessionData('hasChallenge')){
                        $rootScope.showLoggedInNav();
                        $rootScope.loadModal({id : "accountcreatedchallenge"});
                    }else {
                        mode = new Object();
                        mode.modalAuthDialogTitle = "welcomeModals.success";
                        mode.modalAuthDialogTitleClass = "auth_dialog_success_title";
                        mode.modalAuthDialogContent = "welcomeModals.success.account.created";
                        mode.modalAuthDialogIconClass = "auth_dialog_success";
                        mode.loggedin = true;
                        $rootScope.showLoggedInNav();
                        $rootScope.authDisplay(mode);
                    }
                }
                else {
                    if(this.confirmTouPP()){
                        $rootScope.showLoggedInNav();
                        $rootScope.clearModal();
                    } else {
                        if(this.confirmTou()){
                            var page = "confirmppol";
                        } else if(!this.confirmPP()){

                            var page = "confirmppolterms";
                        } else {

                            var page = "confirmterms";

                        }
                        $rootScope.showLoggedInNav();
                        $rootScope.loadModal({id : page});
                    }

                }

            }

            if(typeof(callback) == "function"){
                callback();
            }
            this.setLastCheckinData();
        },

        setLastCheckinData : function(callback){

            $rootScope.user = HigiKioskStorageService.returnSessionData('user') ;
            if($rootScope.user == undefined){
                $rootScope.user = new Object();
            }

            if($rootScope.user.higiScore != undefined){
                $rootScope.lastCheckin.showHigiScore = true;
                $rootScope.lastCheckin.higiScore = $rootScope.user.higiScore;
                //this.writeGuage("keyboard-point-guage", 105, 15, $rootScope.user.higiScore, "", "none", false);

            } else {
                $rootScope.lastCheckin.higiScore = "";
                $rootScope.lastCheckin.showHigiScore = false;
            }
//.firstName != undefined

            if($rootScope.user.firstName != undefined){
                //$rootScope.lastCheckin.name = $rootScope.user.firstName + " " + $rootScope.user.lastName;
                $rootScope.lastCheckin.firstName = $rootScope.user.firstName;
                $rootScope.lastCheckin.lastName = $rootScope.user.lastName;
                $rootScope.lastCheckin.nameShow = true;
            } else  {

                $rootScope.lastCheckin.name = "";
                $rootScope.lastCheckin.nameShow = false;
            }


            if($rootScope.user.gender != undefined){
                $rootScope.lastCheckin.showGender = true;
                $rootScope.lastCheckin.gender = ($rootScope.user.gender == "m") ? 'welcomeModals.printmalegender' :  (($rootScope.user.gender == "f") ? 'welcomeModals.printfemalegender' : 'global.trans');

                if($rootScope.user.photo != undefined){
                    $rootScope.lastCheckin.userImg = "data:image/"+$rootScope.user.photofmt+";base64," + $rootScope.user.photo;
                    //$rootScope.lastCheckin.userImg = $rootScope.user.photo;
                } else {
                    $rootScope.lastCheckin.userImg = 'images/' + ( ($rootScope.user.gender == "m") ? 'userprofile.png' :  'userprofilefemale.png');
                    $rootScope.disabledUserProfile = 'images/' + ( ($rootScope.user.gender == "m") ? 'disableduserprofile.png' :  'disableduserprofilefemale.png');
                }
                //$rootScope.lastCheckin.userImg = 'images/' + ( ($rootScope.user.gender == "m") ? 'profile_img_male_110x110_20120522.png' :  'profile_img_female_110x110_20120522.png')

            }else {
                $rootScope.lastCheckin.gender = "";
                $rootScope.lastCheckin.showGender = false;
                $rootScope.lastCheckin.userImg = 'images/userprofile.png';
                $rootScope.disabledUserProfile = 'images/disableduserprofile.png';
            }

            if($rootScope.user.affiliate != undefined && $rootScope.user.affiliate != ""){
                $rootScope.lastCheckin.affiliate = $rootScope.user.affiliate;
            }

            if($rootScope.user.heightMeters != undefined){
                $rootScope.lastCheckin.showHeight = true;
                $rootScope.lastCheckin.height = HigiKioskUtilitiesService.convertToFeetFoot($rootScope.user.heightMeters) + "&#146;" + HigiKioskUtilitiesService.convertToFeetInches($rootScope.user.heightMeters) + "&#148;";
            }else {
                $rootScope.lastCheckin.height = "";
                $rootScope.lastCheckin.showHeight = false;
            }
            
            if($rootScope.user.waistCircumference != undefined){
                $rootScope.lastCheckin.showWaistCircumference = true;
                $rootScope.lastCheckin.waistCircumference = $rootScope.user.waistCircumference;
                $rootScope.lastCheckin.showWaistCircumference = true;
            }else {
                $rootScope.lastCheckin.waistCircumference = "";
                $rootScope.lastCheckin.showWaistCircumference = false;
            }


            if($rootScope.user.dateOfBirth != undefined){
                $rootScope.lastCheckin.showAge = true;
                $rootScope.lastCheckin.age = HigiKioskUtilitiesService.getAge($rootScope.user.dateOfBirth);
            }else {
                $rootScope.lastCheckin.age = "";
                $rootScope.lastCheckin.showAge = false;
            }

            if(HigiKioskStorageService.returnSessionData('lastCheckin') != undefined){
                var lastCheckin = HigiKioskStorageService.returnSessionData('lastCheckin');

                console.log("lastCheckin: " + lastCheckin);

                if(lastCheckin.dateTime != undefined){
                    var rawdatetime = lastCheckin.dateTime;
                    rawdatetime = rawdatetime.replace("/Date(", "");
                    rawdatetime = rawdatetime.replace(")/", "");
                    var offsetposition = rawdatetime.indexOf('+');
                    if (offsetposition > 0) {
                        rawdatetime = rawdatetime.substring(0, offsetposition);
                    }
                    var checkindate = new Date(parseInt(rawdatetime));
                    var checkindateformat = dateFormat(checkindate, "longDate");
                    var checkintimeformat = dateFormat(checkindate, "h:MM TT");
                    $rootScope.lastCheckin.resultsDateTime = checkindateformat + ' / ' + checkintimeformat;
                    $rootScope.lastCheckin.resultsShow = true;

                } else{
                    $rootScope.lastCheckin.resultsDateTime = "";
                    $rootScope.lastCheckin.resultsShow = true;
                }

                if( (lastCheckin.systolic != (undefined && 0 ) ) && (lastCheckin.diastolic != (undefined && 0 )) ){
                    var systolicLastCheck = lastCheckin.systolic;
                    var diastolicLastCheck = lastCheckin.diastolic;
                    
                    systolicLastCheckinData = lastCheckin.systolic;
                    diastolicLastCheckinData = lastCheckin.diastolic;

                    $rootScope.lastCheckin.systolicLastCheck = systolicLastCheck;
                    $rootScope.lastCheckin.diastolicLastCheck = diastolicLastCheck;
                    $rootScope.lastCheckin.lastCheckBpNumber = systolicLastCheck + "/" + diastolicLastCheck;
                    
                    /*if (HigiKioskUtilitiesService.calculateBpRisk(systolicLastCheck,diastolicLastCheck) == 'acceptable') {    
                        $rootScope.lastCheckin.resultsRiskClass = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.acceptable';
                    } else if(HigiKioskUtilitiesService.calculateBpRisk(systolicLastCheck, diastolicLastCheck) == 'recheck or consult a healthcare provider'){
                     $rootScope.lastCheckin.resultsRiskClass = 'high';
                        //$rootScope.lastCheckin.resultsRiskLabel = 'global.recheck_consult_healthcare_provider';
                        $rootScope.lastCheckin.resultsRiskLabel = 'finish.recheck_consult_healthcare_provider';   
                    }*/
                    //$rootScope.lastCheckin.resultsShowBp = true; 
                    if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'high') {
                        $rootScope.lastCheckin.resultsRiskClass = 'high';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.highbp';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'atrisk') {
                        $rootScope.lastCheckin.resultsRiskClass = 'atrisk';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.atriskbp';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'Normal') {
                        $rootScope.lastCheckin.resultsRiskClass = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.normalbp';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'low') {
                        $rootScope.lastCheckin.resultsRiskClass = 'low';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.lowbp';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'Acceptable') {
                        $rootScope.lastCheckin.resultsRiskClass = 'bp_acceptable';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.atriskbp';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'isolated diastolic hypertension') {
                        $rootScope.lastCheckin.resultsRiskClass = 'isolated_diastolic_hypertension';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.isolated_diastolic';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'isolated systolic hypertension') {
                        $rootScope.lastCheckin.resultsRiskClass = 'isolated_systolic_hypertension';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.isolated_systolic';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'stage 1 hypertension') {
                        $rootScope.lastCheckin.resultsRiskClass = 'high';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.stage_1_hypertension';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'stage 2 hypertension') {
                        $rootScope.lastCheckin.resultsRiskClass = 'high';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.stage_2_hypertension';

                    }
                    else if (HigiKioskVitalReference.calculateBpRiskForUI(systolicLastCheck, diastolicLastCheck) == 'Clinical Screening Recommended') {                        
                        $rootScope.lastCheckin.resultsRiskClass = 'high';
                        //$rootScope.lastCheckin.resultsRiskLabel = 'global.recheck_consult_healthcare_provider';
                        // $rootScope.lastCheckin.resultsRiskLabel = 'finish.recheck_consult_healthcare_provider';
                        $rootScope.lastCheckin.resultsRiskLabel = 'global.highbp';
                    }
                    $rootScope.lastCheckin.resultsShowBp = true;
                } else {
                    $rootScope.lastCheckin.resultsShowBp = false;

                     systolicLastCheckinData = "";
                     diastolicLastCheckinData = "";
                }

                if(lastCheckin.pulseBpm != (undefined && 0 )) {
                    $rootScope.lastCheckin.lastCheckPulseNumber = lastCheckin.pulseBpm;

                    pulseBpmLastCheckinData = lastCheckin.pulseBpm;

                    /*if (HigiKioskUtilitiesService.calculatePulseRisk(pulseBpmLastCheckinData) == 'acceptable') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.acceptable';
                    } else if (HigiKioskUtilitiesService.calculatePulseRisk(pulseBpmLastCheckinData) == 'check with healthcare provider') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'high';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.check_healthcare_provider';
                    }*/

                    if (HigiKioskVitalReference.calculatePulseRiskForUI($rootScope.lastCheckin.lastCheckPulseNumber) == 'High') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'high';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.highpulse';

                    }
                    else if (HigiKioskVitalReference.calculatePulseRiskForUI($rootScope.lastCheckin.lastCheckPulseNumber) == 'low') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'low';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.lowpulse';
                    }
                    else if (HigiKioskVitalReference.calculatePulseRiskForUI($rootScope.lastCheckin.lastCheckPulseNumber) == 'Normal') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.normalbp';

                    }
                    else if (HigiKioskVitalReference.calculatePulseRiskForUI($rootScope.lastCheckin.lastCheckPulseNumber) == 'acceptable') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'lastcheckin.pulse_status_acceptable';

                    }
                    else if (HigiKioskVitalReference.calculatePulseRiskForUI($rootScope.lastCheckin.lastCheckPulseNumber) == 'Low') {
                        $rootScope.lastCheckin.resultsRiskClassPulse = 'high';
                        // $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.check_healthcare_provider';
                        $rootScope.lastCheckin.resultsRiskLabelPulse = 'global.highpulse';

                    }
                    $rootScope.lastCheckin.resultsShowPulse = true;
                } else {
                    $rootScope.lastCheckin.resultsShowPulse = false;

                    pulseBpmLastCheckinData = "";
                }

                //fatRatio
                if((lastCheckin.fatRatio != (undefined && 0 )) && $rootScope.user.gender != undefined) {
                    $rootScope.lastCheckin.fatRatioNumber = lastCheckin.fatRatio.toFixed(2);
					
                    fatRatioLastCheckinData = lastCheckin.fatRatio.toFixed(2);
                    bmcOhmsLastCheckinData = "";

					var lastcheckin_gender = "";
					if($rootScope.user.gender == "m")
					{
						lastcheckin_gender = "Male";
					}else{
						lastcheckin_gender = "Female";
					}
					
                    var bmcRisk = HigiKioskUtilitiesService.calculateBmcRisk($rootScope.lastCheckin.fatRatioNumber, lastcheckin_gender);
                    if (bmcRisk == 'at-risk') {
                        $rootScope.lastCheckin.resultsRiskClassFatRatio = 'at-risk';
                        $rootScope.lastCheckin.resultsRiskLabelFatRatio = 'lastcheckin.bodyfat_status_atrisk';

                    }
                    else if (bmcRisk == 'acceptable') {
                        $rootScope.lastCheckin.resultsRiskClassFatRatio = 'acceptable';
                        $rootScope.lastCheckin.resultsRiskLabelFatRatio = 'lastcheckin.bodyfat_status_acceptable';
                    }
                    else if (bmcRisk == 'healthy') {
                        $rootScope.lastCheckin.resultsRiskClassFatRatio = 'healthy';
                        $rootScope.lastCheckin.resultsRiskLabelFatRatio = 'lastcheckin.bodyfat_status_healthy';

                    }
                    $rootScope.lastCheckin.resultsShowFatRatio= true;
                } else {
                    $rootScope.lastCheckin.resultsShowFatRatio= false;
                    fatRatioLastCheckinData = "";
                    bmcOhmsLastCheckinData = "";
                }
                //Full Body BMC 
                HigiKioskUtilitiesService.calculateVitalReferences();
                if((lastCheckin.body_fat_mass != (undefined && 0 )) && $rootScope.user.gender != undefined) {
                    $rootScope.lastCheckin.basalMetabolicRateValue = lastCheckin.basal_metabolic_rate;
                    $rootScope.lastCheckin.bodyCellMassValue = lastCheckin.body_cell_mass;
                    $rootScope.lastCheckin.bodyFatMassValue = lastCheckin.body_fat_mass;
                    $rootScope.lastCheckin.boneMineralContentValue = lastCheckin.bone_mineral_content;
                    $rootScope.lastCheckin.extraCellularWaterValue = lastCheckin.extra_cellular_water;
                    $rootScope.lastCheckin.intraCellularWaterValue = lastCheckin.intra_cellular_water;
                    $rootScope.lastCheckin.mineralValue = lastCheckin.mineral;
                    $rootScope.lastCheckin.percentBodyFatValue = lastCheckin.percent_body_fat;
                    $rootScope.lastCheckin.protienValue = lastCheckin.protien;
                    $rootScope.lastCheckin.skeletalMuscleMassValue = lastCheckin.skeletal_muscle_mass;
                    $rootScope.lastCheckin.visceralFatValue = lastCheckin.visceral_fat;
                    $rootScope.lastCheckin.waistHeightRatioValue = lastCheckin.waist_height_ratio;
                    $rootScope.lastCheckin.waistHipRatioValue = lastCheckin.waist_hip_ratio;

                    //$rootScope.lastCheckin.fullBodyBmcStatus
                    let bmcStatus = new Map();

                    $rootScope.lastCheckin.basalMetabolicRateStatus = HigiKioskUtilitiesService.calculateFullBodyBMRStatus($rootScope.lastCheckin.basalMetabolicRateValue);
                    $rootScope.lastCheckin.bodyCellMassStatus = HigiKioskVitalReference.calculateBCMRiskForUI($rootScope.lastCheckin.bodyCellMassValue);
                    $rootScope.lastCheckin.bodyFatMassStatus = HigiKioskVitalReference.calculateBodyFatMassRiskForUI($rootScope.lastCheckin.bodyFatMassValue, (lastCheckin.weightKG).toFixed(2));
                    $rootScope.lastCheckin.boneMineralContentStatus = HigiKioskVitalReference.calculateBMCRiskForUI($rootScope.lastCheckin.boneMineralContentValue);
                    $rootScope.lastCheckin.extraCellularWaterStatus = HigiKioskVitalReference.calculateECWRiskForUI($rootScope.lastCheckin.extraCellularWaterValue);
                    $rootScope.lastCheckin.intraCellularWaterStatus = HigiKioskVitalReference.calculateICWRiskForUI($rootScope.lastCheckin.intraCellularWaterValue);
                    $rootScope.lastCheckin.mineralStatus = HigiKioskVitalReference.calculateMineralsRiskForUI($rootScope.lastCheckin.mineralValue);
                    $rootScope.lastCheckin.percentBodyFatStatus = HigiKioskVitalReference.calculatePBFRiskForUI($rootScope.lastCheckin.percentBodyFatValue);
                    $rootScope.lastCheckin.protienStatus = HigiKioskVitalReference.calculateProteinRiskForUI($rootScope.lastCheckin.protienValue, (lastCheckin.weightKG).toFixed(2));
                    $rootScope.lastCheckin.skeletalMuscleMassStatus = HigiKioskVitalReference.calculateSMMRiskForUI($rootScope.lastCheckin.skeletalMuscleMassValue);
                    $rootScope.lastCheckin.visceralFatStatus = HigiKioskVitalReference.calculateVisceralFatRiskForUI($rootScope.lastCheckin.visceralFatValue);
                    $rootScope.lastCheckin.waistHeightRatioStatus = HigiKioskVitalReference.calculateWHTRRiskForUI($rootScope.lastCheckin.waistHeightRatioValue);
                    $rootScope.lastCheckin.waistHipRatioStatus = HigiKioskVitalReference.calculateWHPRRiskForUI($rootScope.lastCheckin.waistHipRatioValue);                   
                    //full body bmc status
                    if ($rootScope.lastCheckin.basalMetabolicRateStatus == 'Low') {
                        bmcStatus.set("basalMetabolicRateStatus", 'lastcheckin.basal_metabolic_rate_status_low');
                    } else if ($rootScope.lastCheckin.basalMetabolicRateStatus == 'Normal') {
                        bmcStatus.set("basalMetabolicRateStatus", 'lastcheckin.basal_metabolic_rate_status_normal');
                    } else{
                        bmcStatus.set("basalMetabolicRateStatus", "");
                    }

                    if ($rootScope.lastCheckin.bodyCellMassStatus == 'Low') {
                        bmcStatus.set("bodyCellMassStatus", 'lastcheckin.body_cell_mass_status_low');
                    } else if ($rootScope.lastCheckin.bodyCellMassStatus == 'Normal') {
                        bmcStatus.set("bodyCellMassStatus", 'lastcheckin.body_cell_mass_status_normal');
                    }else{
                        bmcStatus.set("bodyCellMassStatus", '');
                    }

                    if ($rootScope.lastCheckin.bodyFatMassStatus == 'Low') {
                        bmcStatus.set("bodyFatMassStatus", 'lastcheckin.body_fat_mass_status_low');
                    } else if ($rootScope.lastCheckin.bodyFatMassStatus == 'Normal') {
                        bmcStatus.set("bodyFatMassStatus", 'lastcheckin.body_fat_mass_status_normal');
                    } else if ($rootScope.lastCheckin.bodyFatMassStatus == 'Acceptable') {
                        bmcStatus.set("bodyFatMassStatus", 'lastcheckin.body_fat_mass_status_acceptable');
                    }else if ($rootScope.lastCheckin.bodyFatMassStatus == 'High') {
                        bmcStatus.set("bodyFatMassStatus", 'lastcheckin.body_fat_mass_status_high');
                    }else{
                        bmcStatus.set("bodyFatMassStatus", '');
                    }

                    if ($rootScope.lastCheckin.boneMineralContentStatus == 'Low') {
                        bmcStatus.set("boneMineralContentStatus", 'lastcheckin.bone_mineral_content_status_low');
                    } else if ($rootScope.lastCheckin.boneMineralContentStatus == 'Normal') {
                        bmcStatus.set("boneMineralContentStatus", 'lastcheckin.bone_mineral_content_status_normal');
                    }else{
                        bmcStatus.set("boneMineralContentStatus", '');
                    }

                    if ($rootScope.lastCheckin.extraCellularWaterStatus == 'Low') {
                        bmcStatus.set("extraCellularWaterStatus", 'lastcheckin.extra_cellular_water_status_low');
                    } else if ($rootScope.lastCheckin.extraCellularWaterStatus == 'Normal') {
                        bmcStatus.set("extraCellularWaterStatus", 'lastcheckin.extra_cellular_water_status_normal');
                    }else if ($rootScope.lastCheckin.extraCellularWaterStatus == 'High') {
                        bmcStatus.set("extraCellularWaterStatus", 'lastcheckin.extra_cellular_water_status_high');
                    }else{
                        bmcStatus.set("extraCellularWaterStatus", '');
                    }

                    if ($rootScope.lastCheckin.intraCellularWaterStatus == 'Low') {
                        bmcStatus.set("intraCellularWaterStatus", 'lastcheckin.intra_cellular_water_status_low');
                    } else if ($rootScope.lastCheckin.intraCellularWaterStatus == 'Normal') {
                        bmcStatus.set("intraCellularWaterStatus", 'lastcheckin.intra_cellular_water_status_normal');
                    }else if ($rootScope.lastCheckin.intraCellularWaterStatus == 'High') {
                        bmcStatus.set("intraCellularWaterStatus", 'lastcheckin.intra_cellular_water_status_high');   
                    }else{
                        bmcStatus.set("intraCellularWaterStatus", '');
                    }

                    if ($rootScope.lastCheckin.mineralStatus == 'Low') {
                        bmcStatus.set("mineralStatus", 'lastcheckin.mineral_status_low');
                    } else if ($rootScope.lastCheckin.mineralStatus == 'Normal') {
                       bmcStatus.set("mineralStatus", 'lastcheckin.mineral_status_normal');
                    }else{
                        bmcStatus.set("mineralStatus", '');
                    }

                    if ($rootScope.lastCheckin.percentBodyFatStatus == 'Low') {
                        bmcStatus.set("percentBodyFatStatus", 'lastcheckin.percent_body_fat_status_low');
                    } else if ($rootScope.lastCheckin.percentBodyFatStatus == 'Normal') {
                        bmcStatus.set("percentBodyFatStatus", 'lastcheckin.percent_body_fat_status_normal');
                    } else if ($rootScope.lastCheckin.percentBodyFatStatus == 'Acceptable') {
                        bmcStatus.set("percentBodyFatStatus", 'lastcheckin.percent_body_fat_status_acceptable');
                    }else if ($rootScope.lastCheckin.percentBodyFatStatus == 'High') {
                        bmcStatus.set("percentBodyFatStatus", 'lastcheckin.percent_body_fat_status_high');
                    }else{
                        bmcStatus.set("percentBodyFatStatus", '');
                    }

                    if ($rootScope.lastCheckin.protienStatus == 'Low') {
                        bmcStatus.set("protienStatus", 'lastcheckin.protien_status_low');
                    } else if ($rootScope.lastCheckin.protienStatus == 'Normal') {
                       bmcStatus.set("protienStatus", 'lastcheckin.protien_status_normal');
                    }else{
                        bmcStatus.set("protienStatus", '');
                    }

                    if ($rootScope.lastCheckin.skeletalMuscleMassStatus == 'Low') {
                        bmcStatus.set("skeletalMuscleMassStatus", 'lastcheckin.skeletal_muscle_mass_status_low');
                    } else if ($rootScope.lastCheckin.skeletalMuscleMassStatus == 'Normal') {
                        bmcStatus.set("skeletalMuscleMassStatus", 'lastcheckin.skeletal_muscle_mass_status_normal');
                    }else{
                        bmcStatus.set("skeletalMuscleMassStatus", '');
                    }

                    if ($rootScope.lastCheckin.visceralFatStatus == 'Low') {
                        bmcStatus.set("visceralFatStatus", 'lastcheckin.visceral_fat_status_low');
                    } else if ($rootScope.lastCheckin.visceralFatStatus == 'Normal') {
                        bmcStatus.set("visceralFatStatus", 'lastcheckin.visceral_fat_status_normal');
                    } else if ($rootScope.lastCheckin.visceralFatStatus == 'Acceptable') {
                        bmcStatus.set("visceralFatStatus", 'lastcheckin.visceral_fat_status_acceptable');
                    }else if ($rootScope.lastCheckin.visceralFatStatus == 'High') {
                        bmcStatus.set("visceralFatStatus", 'lastcheckin.visceral_fat_status_high');
                    }else{
                        bmcStatus.set("visceralFatStatus", '');
                    }
                    
                    if ($rootScope.lastCheckin.waistHeightRatioStatus == 'Low') {
                        bmcStatus.set("waistHeightRatioStatus", 'lastcheckin.waist_height_ratio_status_low');
                    } else if ($rootScope.lastCheckin.waistHeightRatioStatus == 'Normal') {
                        bmcStatus.set("waistHeightRatioStatus", 'lastcheckin.waist_height_ratio_status_normal');
                    }else if ($rootScope.lastCheckin.waistHeightRatioStatus == 'High') {
                        bmcStatus.set("waistHeightRatioStatus", 'lastcheckin.waist_height_ratio_status_high');
                    }else{
                        bmcStatus.set("waistHeightRatioStatus", '');
                    }

                    if ($rootScope.lastCheckin.waistHipRatioStatus == 'Low') {
                        bmcStatus.set("waistHipRatioStatus", 'lastcheckin.waist_hip_ratio_status_low');
                    } else if ($rootScope.lastCheckin.waistHipRatioStatus == 'Normal') {
                        bmcStatus.set("waistHipRatioStatus", 'lastcheckin.waist_hip_ratio_status_normal');
                    }else if ($rootScope.lastCheckin.waistHipRatioStatus == 'High') {
                        bmcStatus.set("waistHipRatioStatus", 'lastcheckin.waist_hip_ratio_status_high');
                    }else{
                        bmcStatus.set("waistHipRatioStatus", '');
                    } 
                    $rootScope.lastCheckin.fullBodyBmcStatus = bmcStatus;

                    bmcOhmsLastCheckinData = "";

                    var lastcheckin_gender = "";
                    if($rootScope.user.gender == "m")
                    {
                        lastcheckin_gender = "Male";
                    }else{
                        lastcheckin_gender = "Female";
                    }     
                    $rootScope.lastCheckin.resultsShowFullBodyBmcFatValues= true;

                } else {
                    $rootScope.lastCheckin.resultsShowFullBodyBmcFatValues= false;
                    fatRatioLastCheckinData = "";
                    bmcOhmsLastCheckinData = "";
                }

                //lastCheckinLastCheckWeightNumber
                //Populate Weight
                if (!isNaN(lastCheckin.weightKG)  && lastCheckin.weightKG != 0) {
                    //$rootScope.lastCheckin.lastCheckWeightNumber = parseInt(HigiKioskUtilitiesService.convertToPounds(lastCheckin.weightKG));
                    $rootScope.lastCheckin.lastCheckWeightNumber = ((lastCheckin.weightKG).toFixed(2));
                    $rootScope.lastCheckin.resultsShowWeight = true;

                    weightKGLastCheckinData = ((lastCheckin.weightKG).toFixed(2));
                }
                else {
                    $rootScope.lastCheckin.resultsShowWeight = false;

                    weightKGLastCheckinData = "";
                }


                //Populate BMI
                //if (!isNaN(HigiKioskUtilitiesService.calculateBmi(lastCheckin.weightKG, lastCheckin.heightMeters, 2))) {
                if (lastCheckin.bmi != undefined && lastCheckin.bmi != 0) {
                    $rootScope.lastCheckin.resultsShowBmi = true;
                    $rootScope.lastCheckin.lastCheckBmiNumber = lastCheckin.bmi.toFixed(2); //HigiKioskUtilitiesService.calculateBmi(lastCheckin.weightKG, lastCheckin.heightMeters, 2);

                    if (HigiKioskVitalReference.calculateBMIRiskForUI($rootScope.lastCheckin.lastCheckBmiNumber) == 'underweight') {
                        $rootScope.lastCheckin.resultsRiskClassBmi = 'atrisk';
                        $rootScope.lastCheckin.resultsRiskLabelBmi = 'global.underweight';

                    }
                    else if (HigiKioskVitalReference.calculateBMIRiskForUI($rootScope.lastCheckin.lastCheckBmiNumber) == 'Normal') {
                        $rootScope.lastCheckin.resultsRiskClassBmi = 'normal';
                        $rootScope.lastCheckin.resultsRiskLabelBmi = 'global.normalweight';

                    }
                    else if (HigiKioskVitalReference.calculateBMIRiskForUI($rootScope.lastCheckin.lastCheckBmiNumber) == 'Low') {
                        $rootScope.lastCheckin.resultsRiskClassBmi = 'atrisk';
                        $rootScope.lastCheckin.resultsRiskLabelBmi = 'global.underweight';

                    }
                    else if (HigiKioskVitalReference.calculateBMIRiskForUI($rootScope.lastCheckin.lastCheckBmiNumber) == 'High') {
                        $rootScope.lastCheckin.resultsRiskClassBmi = 'high';
                        $rootScope.lastCheckin.resultsRiskLabelBmi = 'global.obese';

                    }
                    $rootScope.lastCheckin.resultsShowBmi = true;
                } else {
                    $rootScope.lastCheckin.resultsShowBmi = false;
                }
				//changes for ECG 

				 if (lastCheckin.ECGData != undefined && lastCheckin.ECGData != 0 && lastCheckin.ECGData != null) {
					
                        ECGBpmLastCheckinData = lastCheckin.ECGBpm;
                        LeadModeLastCheckinData = 3;

                      if(lastCheckin.leadTwoStatus == "Normal" || lastCheckin.leadTwoStatus == "Normal Sinus Rhythm" ){
                        if( "सामान्य साइनस लय" || "सामान्य सायनस ताल"){
                        $rootScope.lastCheckin.resultsRiskClassECG = 'ECG_Normal';
                        $rootScope.lastCheckin.resultsRiskLabelECG = 'welcomeModals.status.normal'; 
                        }
                        else{
                             $rootScope.lastCheckin.resultsRiskClassECG = 'ECG_Normal';
                             $rootScope.lastCheckin.resultsRiskLabelECG = 'welcomeModals.status.normal'; 
                        }

                      }else if(lastCheckin.leadTwoStatus == "High Pulse" || lastCheckin.leadTwoStatus == "Low Pulse" || lastCheckin.leadTwoStatus == "Low" || lastCheckin.leadTwoStatus == "High"){
                        $rootScope.lastCheckin.resultsRiskClassECG = 'req_doc_attention';
                        $rootScope.lastCheckin.resultsRiskLabelECG = 'welcomeModals.status.abnormal';

                      }else{
                        
                      if(lastCheckin.leadOneStatus == "Normal" || lastCheckin.leadOneStatus == "Normal Sinus Rhythm" ){
                        if( "सामान्य साइनस लय" || "सामान्य सायनस ताल"){
                        $rootScope.lastCheckin.resultsRiskClassECG = 'ECG_Normal';
                        $rootScope.lastCheckin.resultsRiskLabelECG = 'welcomeModals.status.normal'; 
                        }
                         else{
                             $rootScope.lastCheckin.resultsRiskClassECG = 'ECG_Normal';
                             $rootScope.lastCheckin.resultsRiskLabelECG = 'welcomeModals.status.normal'; 
                        }
                    }
                    else if(lastCheckin.leadOneStatus == "High Pulse" || lastCheckin.leadOneStatus == "Low Pulse"){
                        $rootScope.lastCheckin.resultsRiskClassECG = 'req_doc_attention'; 
                        $rootScope.lastCheckin.resultsRiskLabelECG = "welcomeModals.status.abnormal";
                      }           
                    }
                 
                    //$rootScope.lastCheckin.resultsRiskLabelECG = 'global.ECG.status';
                    //$rootScope.lastCheckin.resultsRiskLabelECG = lastCheckin.leadOneStatus;
                    
                      $rootScope.lastCheckin.ECGBpm = lastCheckin.ECGBpm;
                     $rootScope.lastCheckin.resultsShowECG = true;
					
				  }else {
                     $rootScope.lastCheckin.resultsShowECG = false;

                     ECGBpmLastCheckinData = "";
                     LeadModeLastCheckinData = "";
                 }

                 // Ivt Dengue
                 if (lastCheckin.dengue_IgG != undefined) {
                    $rootScope.lastCheckin.dengue_IgG = lastCheckin.dengue_IgG;
                    $rootScope.lastCheckin.dengue_IgM = lastCheckin.dengue_IgM;
                    $rootScope.lastCheckin.resultsShowDengue = true;
                    
                    DengueLastCheckinData = lastCheckin.dengue_IgG;

                    if(lastCheckin.dengue_IgG ==  'Positive' && lastCheckin.dengue_IgM ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassDengueIgg = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassDengueIgm = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelDengue = 'Positive';
                        $rootScope.lastCheckin.overAllResultsClassDengue = 'den_mal_risk';
                    } else if(lastCheckin.dengue_IgG ==  'Positive' && lastCheckin.dengue_IgM ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassDengueIgg = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassDengueIgm = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelDengue = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassDengue = 'den_mal_consult';
                    } else if(lastCheckin.dengue_IgG ==  'Negative' && lastCheckin.dengue_IgM ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassDengueIgg = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassDengueIgm = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelDengue = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassDengue = 'den_mal_consult'; 
                    }else if(lastCheckin.dengue_IgG ==  'Negative' && lastCheckin.dengue_IgM ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassDengueIgg = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassDengueIgm = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelDengue = 'Negative';
                        $rootScope.lastCheckin.overAllResultsClassDengue = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowDengue = false;
                    DengueLastCheckinData = "";
                }

                // Ivt Malaria
                if (lastCheckin.malaria_p_v != undefined) {
                    $rootScope.lastCheckin.malaria_p_v = lastCheckin.malaria_p_v;
                    $rootScope.lastCheckin.malaria_p_f = lastCheckin.malaria_p_f;
                    $rootScope.lastCheckin.resultsShowMalaria = true;
                    
                    MalariaLastCheckinData = lastCheckin.malaria_p_v;

                    if(lastCheckin.malaria_p_v ==  'Positive' && lastCheckin.malaria_p_f ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassMalariaPv = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassMalariaPf = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelMalaria = 'Positive';
                        $rootScope.lastCheckin.overAllResultsClassMalaria = 'den_mal_risk';
                    } else if(lastCheckin.malaria_p_v ==  'Positive' && lastCheckin.malaria_p_f ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassMalariaPv = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassMalariaPf = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelMalaria = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassMalaria = 'den_mal_consult';
                    } else if(lastCheckin.malaria_p_v ==  'Negative' && lastCheckin.malaria_p_f ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassMalariaPv = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassMalariaPf = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelMalaria = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassMalaria = 'den_mal_consult'; 
                    }else if(lastCheckin.malaria_p_v ==  'Negative' && lastCheckin.malaria_p_f ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassMalariaPv = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassMalariaPf = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelMalaria = 'Negative';
                        $rootScope.lastCheckin.overAllResultsClassMalaria = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowMalaria = false;
                    MalariaLastCheckinData = "";
                }

                // Ivt Hiv
                if (lastCheckin.hiv_I != undefined) {
                    $rootScope.lastCheckin.hiv_I = lastCheckin.hiv_I;
                    $rootScope.lastCheckin.hiv_II = lastCheckin.hiv_II;
                    $rootScope.lastCheckin.resultsShowHiv = true;
                    
                    HivLastCheckinData = lastCheckin.hiv_I;

                    if(lastCheckin.hiv_I ==  'Positive' && lastCheckin.hiv_II ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassHivI = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassHivII = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelHiv = 'Positive';
                        $rootScope.lastCheckin.overAllResultsClassHiv = 'den_mal_risk';
                    } else if(lastCheckin.hiv_I ==  'Positive' && lastCheckin.hiv_II ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassHivI = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassHivII = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelHiv = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassHiv = 'den_mal_consult';
                    } else if(lastCheckin.hiv_I ==  'Negative' && lastCheckin.hiv_II ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassHivI = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassHivII = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelHiv = 'Consult Dr.';
                        $rootScope.lastCheckin.overAllResultsClassHiv = 'den_mal_consult'; 
                    }else if(lastCheckin.hiv_I ==  'Negative' && lastCheckin.hiv_II ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassHivI = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassHivII = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelHiv = 'Negative';
                        $rootScope.lastCheckin.overAllResultsClassHiv = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowHiv = false;
                    HivLastCheckinData = "";
                }

                // Ivt Hcv
                if (lastCheckin.hcv != undefined) {
                    $rootScope.lastCheckin.hcv = lastCheckin.hcv;
                    $rootScope.lastCheckin.resultsShowHcv = true;
                    
                    HcvLastCheckinData = lastCheckin.hcv;

                    if(lastCheckin.hcv ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassHcv = 'den_mal_risk';
                    } else if(lastCheckin.hcv ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassHcv = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowHcv = false;
                    HcvLastCheckinData = "";
                }

                // Ivt Pregnancy
                if (lastCheckin.pregnancy != undefined) {
                    $rootScope.lastCheckin.pregnancy = lastCheckin.pregnancy;
                    $rootScope.lastCheckin.resultsShowPreg = true;
                    
                    PregLastCheckinData = lastCheckin.pregnancy;

                    if(lastCheckin.pregnancy ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassPreg = 'den_mal_healthy';
                    } else if(lastCheckin.pregnancy ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassPreg = 'den_mal_risk';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowPreg = false;
                    PregLastCheckinData = "";
                }

                // Ivt Troponin
                if (lastCheckin.troponin != undefined) {
                    $rootScope.lastCheckin.troponin = lastCheckin.troponin;
                    $rootScope.lastCheckin.resultsShowTrop = true;
                    
                    TropLastCheckinData = lastCheckin.troponin;

                    if(lastCheckin.troponin ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassTrop = 'den_mal_risk';
                    } else if(lastCheckin.troponin ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassTrop = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowTrop = false;
                    TropLastCheckinData = "";
                }

                // Ivt Syphilis
                if (lastCheckin.syphilis != undefined) {
                    $rootScope.lastCheckin.syphilis = lastCheckin.syphilis;
                    $rootScope.lastCheckin.resultsShowSyp = true;
                    
                    SypLastCheckinData = lastCheckin.syphilis;

                    if(lastCheckin.syphilis ==  'Positive'){
                        $rootScope.lastCheckin.resultsRiskClassSyp = 'den_mal_risk';
                    } else if(lastCheckin.syphilis ==  'Negative'){
                        $rootScope.lastCheckin.resultsRiskClassSyp = 'den_mal_healthy';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowSyp = false;
                    SypLastCheckinData = "";
                }

                // Ivt Glucose Random
                if (lastCheckin.glucose_random != undefined) {
                    $rootScope.lastCheckin.glucose = lastCheckin.glucose_random;
                    $rootScope.lastCheckin.glucose_option = 'Glucose Random';
                    $rootScope.lastCheckin.resultsShowGlc = true;
                    
                    GlcLastCheckinData = lastCheckin.glucose_random;

                    if(lastCheckin.glucose_random_class ==  'Normal'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Normal';
                    } else if(lastCheckin.glucose_random_class ==  'Diabetes'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Diabetes';
                    }
                } // Ivt Glucose Fasting
                else if (lastCheckin.glucose_fasting != undefined) {
                    $rootScope.lastCheckin.glucose = lastCheckin.glucose_fasting;
                    $rootScope.lastCheckin.glucose_option = 'Glucose Fasting';
                    $rootScope.lastCheckin.resultsShowGlc = true;
                    
                    GlcLastCheckinData = lastCheckin.glucose_fasting;

                    if(lastCheckin.glucose_fasting_class ==  'Normal'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Normal';
                    } else if(lastCheckin.glucose_fasting_class ==  'Diabetes'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Diabetes';
                    } else if(lastCheckin.glucose_fasting_class ==  'Pre-Diabetes'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_consult';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Pre-Diabetes';
                    }
                } // Ivt Glucose Post prandial
                else if (lastCheckin.glucose_post_prandial != undefined) {
                    $rootScope.lastCheckin.glucose = lastCheckin.glucose_post_prandial;
                    $rootScope.lastCheckin.glucose_option = 'Glucose Post Pardial';
                    $rootScope.lastCheckin.resultsShowGlc = true;
                    
                    GlcLastCheckinData = lastCheckin.glucose_post_prandial;

                    if(lastCheckin.glucose_post_prandial_class ==  'Normal'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Normal';
                    } else if(lastCheckin.glucose_post_prandial_class ==  'Diabetes'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Diabetes';
                    } else if(lastCheckin.glucose_post_prandial_class ==  'Pre-Diabetes'){
                        $rootScope.lastCheckin.resultsRiskClassGlc = 'den_mal_consult';
                        $rootScope.lastCheckin.resultsRiskClassGlcText = 'Pre-Diabetes';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowGlc = false;
                    GlcLastCheckinData = "";
                }

                // Ivt Heamoglobin
                if (lastCheckin.heamoglobin != undefined) {
                    $rootScope.lastCheckin.heamoglobin = lastCheckin.heamoglobin;
                    $rootScope.lastCheckin.resultsShowHeamo = true;
                    
                    HeamoLastCheckinData = lastCheckin.heamoglobin;

                    if(lastCheckin.heamoglobin_class ==  'Normal'){
                        $rootScope.lastCheckin.resultsRiskClassHeamo = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskClassHeamoText = 'Normal';
                    } else if(lastCheckin.heamoglobin_class ==  'High'){
                        $rootScope.lastCheckin.resultsRiskClassHeamo = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskClassHeamoText = 'High';
                    } else if(lastCheckin.heamoglobin_class ==  'Low'){
                        $rootScope.lastCheckin.resultsRiskClassHeamo = 'den_mal_consult';
                        $rootScope.lastCheckin.resultsRiskClassHeamoText = 'Low';
                    } else if(lastCheckin.heamoglobin_class ==  'Acceptable'){
                        $rootScope.lastCheckin.resultsRiskClassHeamo = 'den_mal_consult';
                        $rootScope.lastCheckin.resultsRiskClassHeamoText = 'Acceptable';
                    } else if(lastCheckin.heamoglobin_class ==  'Very Low'){
                        $rootScope.lastCheckin.resultsRiskClassHeamo = 'den_mal_consult';
                        $rootScope.lastCheckin.resultsRiskClassHeamoText = 'Very Low';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowHeamo = false;
                    HeamoLastCheckinData = "";
                }

                // Ivt Lipid
                if (lastCheckin.lipid_profile_tc != undefined) {
                    $rootScope.lastCheckin.lipid_profile_tc = lastCheckin.lipid_profile_tc;
                    $rootScope.lastCheckin.lipid_profile_hg = lastCheckin.lipid_profile_hg;
                    $rootScope.lastCheckin.lipid_profile_tg = lastCheckin.lipid_profile_tg;
                    $rootScope.lastCheckin.lipid_profile_ldl = lastCheckin.lipid_profile_ldl;
                    $rootScope.lastCheckin.resultsShowLipid = true;
                    
                    LipLastCheckinData = lastCheckin.lipid_profile_tc;
                    if(lastCheckin.lipid_profile_tc_class ==  'High'){
                        $rootScope.lastCheckin.resultsRiskClassLipTc = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelLipTc = 'High';
                    }else if(lastCheckin.lipid_profile_tc_class ==  'Borderline High'){
                        $rootScope.lastCheckin.resultsRiskClassLipTc = 'den_mal_borderline';
                        $rootScope.lastCheckin.resultsRiskLabelLipTc = 'Borderline High';
                    }else {
                        $rootScope.lastCheckin.resultsRiskClassLipTc = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelLipTc = 'Normal';
                    }
                    if(lastCheckin.lipid_profile_hg_class ==  'Low'){
                        $rootScope.lastCheckin.resultsRiskClassLipHg = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelLipHg = 'Low';
                    }else if(lastCheckin.lipid_profile_hg_class ==  'Borderline low'){
                        $rootScope.lastCheckin.resultsRiskClassLipHg = 'den_mal_borderline';
                        $rootScope.lastCheckin.resultsRiskLabelLipHg = 'Borderline Low';
                    } else {
                        $rootScope.lastCheckin.resultsRiskClassLipHg = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelLipHg = 'Normal';
                    }
                    if(lastCheckin.lipid_profile_tg_class ==  'High'){
                        $rootScope.lastCheckin.resultsRiskClassLipTg = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelLipTg = 'High';
                    }else if(lastCheckin.lipid_profile_tg_class ==  'Borderline High'){
                        $rootScope.lastCheckin.resultsRiskClassLipTg = 'den_mal_borderline';
                        $rootScope.lastCheckin.resultsRiskLabelLipTg = 'Borderline High';
                    } else {
                        $rootScope.lastCheckin.resultsRiskClassLipTg = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelLipTg = 'Normal';
                    }
                    if(lastCheckin.lipid_profile_ldl_class ==  'High'){
                        $rootScope.lastCheckin.resultsRiskClassLipLdl = 'den_mal_risk';
                        $rootScope.lastCheckin.resultsRiskLabelLipLdl = 'High';
                    }else if(lastCheckin.lipid_profile_ldl_class ==  'Borderline High'){
                        $rootScope.lastCheckin.resultsRiskClassLipLdl = 'den_mal_borderline';
                        $rootScope.lastCheckin.resultsRiskLabelLipLdl = 'Borderline High';
                    } else {
                        $rootScope.lastCheckin.resultsRiskClassLipLdl = 'den_mal_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelLipLdl = 'Normal';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowLipid = false;
                    LipLastCheckinData = "";
                }

                // Ivt Urine
                if (lastCheckin.urine_ph != undefined) {
                    $rootScope.lastCheckin.urine_leukocytes = this.urineTestValueFineTune(lastCheckin.urine_leukocytes);
                    $rootScope.lastCheckin.urine_nitrite = this.urineTestValueFineTune(lastCheckin.urine_nitrite);
                    $rootScope.lastCheckin.urine_urobilinogen = this.urineTestValueFineTune(lastCheckin.urine_urobilinogen);
                    $rootScope.lastCheckin.urine_protein = this.urineTestValueFineTune(lastCheckin.urine_protein);
                    $rootScope.lastCheckin.urine_ph = this.urineTestValueFineTune(lastCheckin.urine_ph);
                    $rootScope.lastCheckin.urine_blood = this.urineTestValueFineTune(lastCheckin.urine_blood);
                    $rootScope.lastCheckin.urine_specific_gravity = this.urineTestValueFineTune(lastCheckin.urine_specific_gravity);
                    $rootScope.lastCheckin.urine_ketone = this.urineTestValueFineTune(lastCheckin.urine_ketone);
                    $rootScope.lastCheckin.urine_bilirubin = this.urineTestValueFineTune(lastCheckin.urine_bilirubin);
                    $rootScope.lastCheckin.urine_glucose = this.urineTestValueFineTune(lastCheckin.urine_glucose);

                    $rootScope.lastCheckin.resultsShowUrn = true;
                    
                    UrnLastCheckinData = lastCheckin.urine_leukocytes;
                } else {
                    $rootScope.lastCheckin.resultsShowUrn = false;
                    UrnLastCheckinData = "";
                }
                //spo2 
                if (lastCheckin.spo2 != undefined) {
                    $rootScope.lastCheckin.lastCheckSpO2Number = lastCheckin.spo2;
                    $rootScope.lastCheckin.resultsShowSpO2 = true;
                    
                    Spo2LastCheckinData = lastCheckin.spo2;

                    /* if (HigiKioskUtilitiesService.calculateSpO2Risk(Spo2LastCheckinData) ==  'Healthy') {
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_healthy';
                        $rootScope.lastCheckin.resultsRiskLabelSpO2 = 'spo2.status.acceptable';
                    } else if (HigiKioskUtilitiesService.calculateSpO2Risk(Spo2LastCheckinData) ==  'Check With Healthcare Provider') {
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_atrisk';
                        $rootScope.lastCheckin.resultsRiskLabelSpO2 ='spo2.status.spo2_check_healthcare_provider';
                    }*/

                    if(HigiKioskVitalReference.calculateSpo2RiskForUI(lastCheckin.spo2) ==  'Normal'){                        
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_healthy';
                      $rootScope.lastCheckin.resultsRiskLabelSpO2 = 'spo2.status.healthy';    
                    } else if(HigiKioskVitalReference.calculateSpo2RiskForUI(lastCheckin.spo2) ==  'Acceptable'){                        
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_acceptable';
                       $rootScope.lastCheckin.resultsRiskLabelSpO2 = 'spo2.status.acceptable'; 
                    }else if(HigiKioskVitalReference.calculateSpo2RiskForUI(lastCheckin.spo2) ==  'At-risk'){                        
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_atrisk';
                        $rootScope.lastCheckin.resultsRiskLabelSpO2 ='spo2.status.atrisk'; 
                    }else if(HigiKioskVitalReference.calculateSpo2RiskForUI(lastCheckin.spo2) ==  'Low'){                        
                        $rootScope.lastCheckin.resultsRiskClassSpO2 = 'spo2_low';
                        $rootScope.lastCheckin.resultsRiskLabelSpO2 ='spo2.status.low';
                    }
                } else {
                    $rootScope.lastCheckin.resultsShowSpO2 = false;

                    Spo2LastCheckinData = "";
                }

                //Temperature
                if (lastCheckin.temperature != undefined) {
                    $rootScope.lastCheckin.lastCheckTempNumber = HigiKioskUtilitiesService.convertToFarrantHeat(lastCheckin.temperature); 
                    $rootScope.lastCheckin.resultsShowTemp = true;
                    var roomTemperature = HigiKioskStorageService.returnSessionData("roomTemperature");
                    temperatureLastCheckinData = HigiKioskUtilitiesService.convertToFarrantHeat(lastCheckin.temperature);
                    lastCheckin.temperatureClass = HigiKioskVitalReference.calculateTempRiskForUI($rootScope.lastCheckin.lastCheckTempNumber);
                    /*if (lastCheckin.temperatureClass =='Acceptable') {
                        $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_acceptable';
                        $rootScope.lastCheckin.resultsRiskLabelTemp =   "temp3.status.accep";
                    }
                    else if (lastCheckin.temperatureClass =='Fever') {
                        $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_fever';
                        $rootScope.lastCheckin.resultsRiskLabelTemp =  "temp3.status.fever";
                    }*/
                    if(lastCheckin.temperatureClass == 'Normal'){
                        $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_normal';

                       $rootScope.lastCheckin.resultsRiskLabelTemp =   "temp3.status.healt";
                    }else if(lastCheckin.temperatureClass =='Acceptable'){
                        $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_acceptable';

                        $rootScope.lastCheckin.resultsRiskLabelTemp =   "temp3.status.accep"; 
                    }else if(lastCheckin.temperatureClass =='Fever'){
                        $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_fever';

                       $rootScope.lastCheckin.resultsRiskLabelTemp =  "temp3.status.fever";  
                   }else if(lastCheckin.temperatureClass =='High'){
                    $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_highfever';

                    $rootScope.lastCheckin.resultsRiskLabelTemp =  "temp3.status.highfever"; 
                   }else if(lastCheckin.temperatureClass =='Low'){
                    $rootScope.lastCheckin.resultsRiskClassTemp = 'temp_highfever';
                    $rootScope.lastCheckin.resultsRiskLabelTemp =  "temp3.status.lowfever"; 
                   }
                }
                else {
                    $rootScope.lastCheckin.resultsShowTemp = false;

                    temperatureLastCheckinData ="";
                }
					
				
                $rootScope.lastCheckin.lastEarnditIsFullCheckin = ( $rootScope.lastCheckin.resultsShowBmi &&  $rootScope.lastCheckin.resultsShowBp);

                if(typeof(callback) == "function"){
                    callback();
                }

                
                $rootScope.PreviousVital = {
                    "dengue": DengueLastCheckinData,
                    "malaria": MalariaLastCheckinData,
                    "hiv": HivLastCheckinData,
                    "preg": PregLastCheckinData,
                    "glc": GlcLastCheckinData,
                    "ECGBpm": ECGBpmLastCheckinData,
                    "LeadMode": LeadModeLastCheckinData,
                    "Spo2": Spo2LastCheckinData,
                    "bmcOhms": bmcOhmsLastCheckinData,
                    "diastolic": diastolicLastCheckinData,
                    "fatRatio": fatRatioLastCheckinData,
                    "pulseBpm": pulseBpmLastCheckinData,
                    "systolic": systolicLastCheckinData,
                    "temperature": temperatureLastCheckinData,
                    "weightKG": weightKGLastCheckinData,
                    "endpoint":"previousVital"
                };

                console.log($rootScope.PreviousVital);
                 
            }
            // alert($rootScope.lastCheckin.resultsShowTemp || $rootScope.lastCheckin.resultsShowSpO2 || $rootScope.lastCheckin.resultsShowFatRatio || $rootScope.lastCheckin.resultsShowFullBodyBmcFatValues || $rootScope.lastCheckin.resultsShowBp || $rootScope.lastCheckin.resultsShowPulse || $rootScope.lastCheckin.resultsShowECG || $rootScope.lastCheckin.resultsShowWeight);
            /*if($rootScope.lastCheckin.resultsShowTemp || $rootScope.lastCheckin.resultsShowSpO2 || $rootScope.lastCheckin.resultsShowFatRatio || $rootScope.lastCheckin.resultsShowFullBodyBmcFatValues || $rootScope.lastCheckin.resultsShowBp || $rootScope.lastCheckin.resultsShowPulse || $rootScope.lastCheckin.resultsShowECG || $rootScope.lastCheckin.resultsShowWeight){
                console.log("Value is there");
            }else{
                $rootScope.checkinCheck();
            }*/
        },
        getAdDataObjectForSlide : function(kioskSlide){

                var kioskBpSystolic = null;
                var kioskBpDiastolic = null;
                var kioskWeight = null;
                var kioskHeight = null;
                var kioskLanguage = HigiKioskStorageService.returnSessionData('langClass');
                var kioskGender = HigiKioskStorageService.returnSessionData('gender');
                var kioskAge = HigiKioskUtilitiesService.getAge(HigiKioskStorageService.returnSessionData('birthdate'));
                var kioskPulse = null;

                if (HigiKioskStorageService.returnSessionData('systolic'))
                {
                    kioskBpSystolic = HigiKioskStorageService.returnSessionData('systolic');
                }
                else if (HigiKioskStorageService.returnSessionData('lastCheckin') && HigiKioskStorageService.returnSessionData('lastCheckin').systolic)
                {
                    kioskBpSystolic = HigiKioskStorageService.returnSessionData('lastCheckin').systolic;
                }

                if (HigiKioskStorageService.returnSessionData('diastolic'))
                {
                    kioskBpDiastolic = HigiKioskStorageService.returnSessionData('diastolic');
                }
                else if (HigiKioskStorageService.returnSessionData('lastCheckin') && HigiKioskStorageService.returnSessionData('lastCheckin').diastolic)
                {
                    kioskBpDiastolic = HigiKioskStorageService.returnSessionData('lastCheckin').diastolic;
                }

                if (HigiKioskStorageService.returnSessionData('weight'))
                {
                    kioskWeight = parseFloat(HigiKioskStorageService.returnSessionData('weight'));
                }
                else if (HigiKioskStorageService.returnSessionData('lastCheckin') && HigiKioskStorageService.returnSessionData('lastCheckin').weightKG)
                {
                    kioskWeight = parseFloat(HigiKioskStorageService.returnSessionData('lastCheckin').weightKG);
                }

                if (HigiKioskStorageService.returnSessionData('height'))
                {
                    kioskHeight = HigiKioskStorageService.returnSessionData('height');
                }
                else if (HigiKioskStorageService.returnSessionData('lastCheckin') && HigiKioskStorageService.returnSessionData('lastCheckin').heightMeters)
                {
                    kioskHeight = HigiKioskStorageService.returnSessionData('lastCheckin').heightMeters;
                }

                if (HigiKioskStorageService.returnSessionData('pulse'))
                {
                    kioskPulse = HigiKioskStorageService.returnSessionData('pulse');
                }
                else if (HigiKioskStorageService.returnSessionData('lastCheckin') && HigiKioskStorageService.returnSessionData('lastCheckin').pulse)
                {
                    kioskPulse = HigiKioskStorageService.returnSessionData('lastCheckin').pulse;
                }

                var kioskBMI = null;
                var kioskBMIRisk = null;
                if (kioskWeight && kioskHeight)
                {
                    kioskBMI = parseFloat(HigiKioskUtilitiesService.calculateBmi(kioskWeight, kioskHeight, 2));
                    kioskBMIRisk = HigiKioskVitalReference.calculateBMIRiskForUI(kioskBMI);
                }

                var kioskBpRisk = null;
                if (kioskBpSystolic && kioskBpDiastolic)
                {
                    kioskBpRisk = HigiKioskUtilitiesService.calculateBpRisk(kioskBpSystolic,kioskBpDiastolic);
                }

                var kioskPulseRisk = null;
                if (kioskPulse)
                {
                    kioskPulseRisk = HigiKioskUtilitiesService.calculatePulseRisk(kioskPulse);
                }

                var isAuthenticated = false;
                if (HigiKioskStorageService.returnSessionData('logged_in') === true)
                {
                    isAuthenticated = true;
                }

                var adDataObject = {
                    'isAuthenticated' : isAuthenticated,
                    'bpSystolic' : kioskBpSystolic,
                    'bpDiastolic' : kioskBpDiastolic,
                    'bpRisk' : kioskBpRisk,
                    'pulse' : kioskPulse,
                    'pulseRisk' : kioskPulseRisk,
                    'weight' : kioskWeight,
                    'bmi' : kioskBMI,
                    'bmiRisk' : kioskBMIRisk,
                    'language' : kioskLanguage,
                    'gender' : kioskGender,
                    'height' : kioskHeight,
                    'age' : kioskAge
                };

                var userTags = null;
                if (HigiKioskStorageService.returnSessionData('user'))
                {
                    userTags = HigiKioskStorageService.returnSessionData('user').tags;
                    for (var key in userTags) {
                        adDataObject[key] = userTags[key];
                    }
                }

                return adDataObject;


        },

        saveUnauthData :function () {
            var user = HigiKioskStorageService.returnSessionData('user');
            //If results already saved, return
            if (HigiKioskStorageService.returnSessionData('resultsSaved') === true){
                return;
            }

            JkioskService.registerKiosk();

            /*var checkin = HigiApiService.CreateCheckin(HigiKioskStorageService.returnSessionData);
            if (HigiKioskStorageService.returnSessionData('logged_in') && ((checkin.diastolic != undefined && checkin.systolic != undefined && checkin.pulseBpm != undefined) || checkin.weightKG != undefined)) {
                JkioskService.logInfo(HigiKioskStorageService.returnSessionData('higiPageName') + "_noFinalResultsAuthSave" , "Checkin ended before final results", "Saving checkin on session exit.");
                HigiApiService.CreateCheckInGameAsync(HigiKioskStorageService.returnSessionData('user').id, checkin, null,
                    function(){},
                    function(){}
                );
            } else {
                //fail silently
                HigiApiService.SaveUnauthCheckInAsync(checkin, function () {
                    HigiKioskStorageService.saveSessionData('results_saved', true);
                }, function () {
                });
            }*/



        },

        urineTestValueFineTune : function(urineTestVal){
            let fintueValue = "";
            if(urineTestVal != undefined){
              if(urineTestVal.includes("+")){
                fintueValue = "Present";
              } else if(urineTestVal.includes("-")){
                fintueValue = "Absent";
              } else if(urineTestVal.trim().length == 0){ 
                fintueValue = "Nil";
              } else {
                fintueValue = urineTestVal;
              }
            }else {
              fintueValue = "Nil";
            }
            return fintueValue;
        },

    }
    


}]);