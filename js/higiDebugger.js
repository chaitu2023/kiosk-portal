function debugModeOptions() {
    if (returnSessionData('debug_mode') == true) {
        if (returnSessionData('debug_options') != undefined) {

            var debugOptions = returnSessionData('debug_options');

            //About You
            if (debugOptions.aboutyou_skip == true) {
                //Skip the About Page page
                if (higi_pageName == 'slide_age01' || higi_pageName == 'slide_height01' || higi_pageName == 'slide_gender01' || higi_pageName == 'slide_aboutyou01') {
                    higi_forward();
                }

                if (higi_pageName == 'slide_aboutyou01') {
                    //Set the appropriate user settings

                    var randM = Math.round((Math.random() * 11 )) + 1;
                    var randD = Math.round((Math.random() * 27 )) + 1;
                    var randY = 1999 - Math.round(Math.random() * 60);

                    var randGender;
                    if (Math.random > .5) {
                        randGender = 'm';
                    }
                    else {
                        randGender = 'f';
                    }

                    var randHeight = ((Math.random() * 1.8) + .8).toFixed(2);

                    saveSessionData('birthdate', randM + '/' + randD + '/' + randY);
                    saveSessionData('gender', randGender);
                    saveSessionData('height', parseFloat(randHeight));
                }
            }

            //Blood Pressure
            if (debugOptions.bp_diastolic != undefined && debugOptions.bp_systolic != undefined && debugOptions.bp_pulse != undefined) {

                //Skip the test page
                if (higi_pageName == 'slide_bloodpressure02') {
                    higi_forward();

                    //Set systolic to appropriate number
                    var randSystolic = 0;
                    var randDiastolic = 0;
                    var randPulse = 0;

                    if (debugOptions.bp_systolic == 'normal') {
                        randSystolic = Math.floor(Math.random() * 19) + 100;
                    }
                    else if (debugOptions.bp_systolic == 'atrisk') {
                        randSystolic = Math.floor(Math.random() * 19) + 120;
                    }
                    else if (debugOptions.bp_systolic == 'high') {
                        randSystolic = Math.floor(Math.random() * 19) + 140;
                    }
                    else if (debugOptions.bp_systolic == 'hypertensive') {
                        randSystolic = Math.floor(Math.random() * 19) + 180;
                    }

                    //set diastolic to appropriate number
                    if (debugOptions.bp_diastolic == 'normal') {
                        randDiastolic = Math.floor(Math.random() * 9) + 70;
                    }
                    else if (debugOptions.bp_diastolic == 'atrisk') {
                        randDiastolic = Math.floor(Math.random() * 9) + 80;
                    }
                    else if (debugOptions.bp_diastolic == 'high') {
                        randDiastolic = Math.floor(Math.random() * 9) + 90;
                    }
                    else if (debugOptions.bp_diastolic == 'hypertensive') {
                        randDiastolic = Math.floor(Math.random() * 9) + 110;
                    }

                    //set pulse to appropriate number
                    if (debugOptions.bp_pulse == 'low') {
                        randPulse = Math.floor(Math.random() * 20) + 40;
                    }
                    else if (debugOptions.bp_pulse == 'normal') {
                        randPulse = Math.floor(Math.random() * 39) + 60;
                    }
                    else if (debugOptions.bp_pulse == 'high') {
                        randPulse = Math.floor(Math.random() * 20) + 100;
                    }

                    var systolicHistory = new Array();
                    var diastolicHistory = new Array();
                    var pulseHistory = new Array();

                    if (debugOptions.bp_average3x == true) {
                        systolicHistory.push(randSystolic + 5);
                        diastolicHistory.push(randDiastolic + 5);
                        pulseHistory.push(randPulse + 5);

                        systolicHistory.push(randSystolic - 5);
                        diastolicHistory.push(randDiastolic - 5);
                        pulseHistory.push(randPulse - 5);

                        systolicHistory.push(randSystolic);
                        diastolicHistory.push(randDiastolic);
                        pulseHistory.push(randPulse);
                    }
                    else {
                        systolicHistory.push(randSystolic);
                        diastolicHistory.push(randDiastolic);
                        pulseHistory.push(randPulse);
                    }

                    saveSessionData('systolic', randSystolic);
                    saveSessionData('systolicHistory', systolicHistory);
                    saveSessionData('diastolic', randDiastolic);
                    saveSessionData('diastolicHistory', diastolicHistory);
                    saveSessionData('pulse', randPulse);
                    saveSessionData('pulseHistory', pulseHistory);
                }

            }

            //Weight
            if (debugOptions.bmi != undefined) {

                //Skip the test page
                if (higi_pageName == 'slide_weight02') {
                    higi_forward();

                    var userHeight = returnSessionData('height');
                    var randBmi = 0;

                    //set pulse to appropriate number
                    if (debugOptions.bmi == 'under') {
                        randWeight = ( ( Math.random() * 5) + 18.5) * Math.pow(returnSessionData('height'), 2);
                    }
                    else if (debugOptions.bmi == 'normal') {
                        randWeight = ( ( Math.random() * 6.49) + 18.5) * Math.pow(returnSessionData('height'), 2);
                    }
                    else if (debugOptions.bmi == 'overweight') {
                        randWeight = ( ( Math.random() * 4.99) + 25) * Math.pow(returnSessionData('height'), 2);
                    }
                    else if (debugOptions.bmi == 'obese') {
                        randWeight = ( ( Math.random() * 5) + 30) * Math.pow(returnSessionData('height'), 2);
                    }

                    saveSessionData('weight', randWeight);
                }

            }

            //Final Results
            if (higi_pageName == 'slide_finalresults01') {
                if (debugOptions.finalresults_ribbon == true) {
                    createNotification('ribbon01', 'ribbon', '', '0', 'Hooray, ribbons!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                    createNotification('ribbon02', 'ribbon', '', '0', 'Hooray, more ribbons!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
//                    createNotification('ribbon03', 'ribbon', '', '0', 'Hooray, the last ribbon!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                }
                if (debugOptions.finalresults_medal == true) {
                    createNotification('medal01', 'medal', '', '0', 'Hooray, medals!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                    createNotification('medal02', 'medal', '', '0', 'Hooray, more medals!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
//                    createNotification('medal03', 'medal', '', '0', 'Hooray, the last medal!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                }
                if (debugOptions.finalresults_trophy == true) {
                    createNotification('trophy01', 'trophy', '', '0', 'Hooray, trophies!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                    createNotification('trophy02', 'trophy', '', '0', 'Hooray, more trophies!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
//                    createNotification('trophy03', 'trophy', '', '0', 'Hooray, the last trophy!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
                }
            }
        }
    }
}


/*
 *
 * These are functions used for testing/creating fake data
 *
 */

var createTestData = {
    fullSession:function () {
        saveSessionData('birthdate', "08/08/1988");
        saveSessionData('bpErrorCount', 0);
        saveSessionData('bpStoppedManually', false);
        saveSessionData('diastolic', 72);
        saveSessionData('diastolicHistory', ["72"]);
        saveSessionData('gender', "f");
        saveSessionData('height', 1.7018);
        saveSessionData('pulse', 70);
        saveSessionData('pulseHistory', [70]);
        saveSessionData('systolic', 110);
        saveSessionData('systolicHistory', [110]);
        saveSessionData('test_bp_selected', true);
        saveSessionData('test_weight_selected', true);
        saveSessionData('weight', 68.1818);
        saveSessionData('weightScaleErrorCount', 0);
    },
    xp:function () {
        createNotification('xp01', 'xp', 'game_hw_icon20121121.png', '5', 'Expect a singing telegram', null);
        createNotification('xp02', 'xp', 'game_hw_icon20121121.png', '10', 'Hooray, points!', null);
        createNotification('xp04', 'xp', 'game_hw_icon20121121.png', '7', 'Get it', null);
        createNotification('xp03', 'xp', 'game_hw_icon20121121.png', '54', 'Yep, thats a lot of points', null);
    },
    badges:function () {
        createNotification('ribbon01', 'ribbon', 'game_hw_icon20121121.png', '0', 'Expect a singing telegram', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
        createNotification('medal01', 'medal', 'game_hw_icon20121121.png', '0', 'Hooray, points!', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
        createNotification('trophy01', 'trophy', 'game_hw_icon20121121.png', '0', 'Get it', 'Lorum ispum dolor. lorum ispum dolor lorum ipsum dolor. Lorum ipsum dolor, lorum ipsum dolor.');
    }
}


/***********************************
Dev functions for skipping adds
setting up terms for testing
showing rulers
***********************************/
function skipAds(){
    if($("#bloodpressure_ad_video, #finalresults_ad_video").length != 0){
        $("#bloodpressure_ad_video, #finalresults_ad_video").trigger('ended').remove();
    }
}

function forceTosPrivacy(terms){
    if(typeof(returnSessionData('user')) != "undefined"){
        var tempUser = returnSessionData('user');
        if(terms !== "terms"){
        tempUser.privacyAgreed.privacyFileName = (tempUser.privacyAgreed.privacyFileName == "privacypolicy_v5_03082013.html") ? "privacypolicy_v4_03082013.html" : "privacypolicy_v5_03082013.html";
        }
        if(terms !== "privacy"){
        tempUser.terms.termsFileName = (tempUser.terms.termsFileName == "termsofuse_v5_03082013.html") ? "termsofuse_v4_03082013.html" : "termsofuse_v5_03082013.html";
        }
        //Log off the user
        //
        
        saveSessionData('user',tempUser);
        var success = function(){
                higi_exit();
        }
        
        HigiApi.UpdateUserAsync(tempUser.id, tempUser, success);
    
        
    }else {
    }
}

function showRulers() {
    removeRulers();
    $('body').append('<div id="ruler-x" style="height:1px;background:#900;width:800px;position:absolute;z-index:2000000"/>');
    $('body').append('<div id="ruler-y" style="width:1px;background:#900;height:600px;position:absolute;z-index:2000000"/>');
    $(document).on('mousemove', function(e){
        $('#ruler-x').css({
           left:  '0px',
           top:   e.pageY - 20
        });
        $('#ruler-y').css({
           left:  e.pageX - 20,
           top:   0
        });
    });
}

function removeRulers(){
    try{
     $('#ruler-x, #ruler-y').remove();   
    }catch (e){}
}


$(document).ready(function(){
    /*
    $( "body" ).keypress(function( event ) {
      console.log(event.which)
      if ( event.which == 113 ) {
        event.preventDefault();
        skipAds();
        console.log('Skipping Ads');
      } 
    else if ( event.which == 97 ) {
        event.preventDefault();
        bpError({stopReason : "UserStop"});
        console.log('firing bpError callback with response: bpError({stopReason : UserStop})');
      }
        else if ( event.which == 98 ) {
        event.preventDefault();
        forceTosPrivacy();
        console.log('voiding both privacy and tos');
      } else if ( event.which == 116 ) {
        event.preventDefault();
        forceTosPrivacy("terms");
        console.log('voiding both privacy and tos');
      } else if ( event.which == 112 ) {
        event.preventDefault();
        forceTosPrivacy("privacy");
        console.log('voiding both privacy and tos');
      }
        else if ( event.which == 114 ) {
        event.preventDefault();
        showRulers();
      } else if ( event.which == 100 ) {
        event.preventDefault();
        removeRulers();
      }
    });
    */
});
