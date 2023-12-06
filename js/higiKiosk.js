//// globals
//// objects to store global app settings and resource strings
//var appSettings = null;
//var appResources = null;
//
//function registerKiosk() {
//    if (!HigiApiKey) {
//		jkiosk.higiLogin(function(loginResponse) {
//			HigiApiResponse = JSON.parse(loginResponse.serverResponse);
//
//			if (HigiApiResponse.ApiKey) {
//				HigiApiKey = HigiApiResponse.ApiKey;
//			}
//			if (typeof(HigiApiResponse.Organizations) != 'undefined' && HigiApiResponse.Organizations != null) {
//				localStorage.setItem("KioskOrganizations", HigiApiResponse.Organizations);
//			}
//			if (typeof(HigiApiResponse.printingEnabled) != 'undefined' && HigiApiResponse.printingEnabled != null) {
//				localStorage.setItem('printEnabled', HigiApiResponse.printingEnabled);
//			}
//			if (typeof(HigiApiResponse.printingCost) != 'undefined' && HigiApiResponse.printingCost != null) {
//				localStorage.setItem('printPrice', HigiApiResponse.printingCost);
//			}
//            if (typeof(HigiApiResponse.earndItPointsForCheckin) != 'undefined' && HigiApiResponse.earndItPointsForCheckin != null) {
//				localStorage.setItem('earndItPointsForCheckin', HigiApiResponse.earndItPointsForCheckin);
//			} else {
//                 localStorage.setItem('earndItPointsForCheckin',appSettings["kiosk.earndIt.earndItPointsForCheckin"]);
//            }
//			if (typeof(HigiApiResponse.printingCurrency) != 'undefined' && HigiApiResponse.printingCurrency != null) {
//				localStorage.setItem('printCurrency', HigiApiResponse.printingCurrency);
//			}
//            if (HigiApiResponse.appUiConfig != null && typeof(HigiApiResponse.appUiConfig.bpTestSkipRegPrompt) != 'undefined' && HigiApiResponse.appUiConfig.bpTestSkipRegPrompt != null) {
//				localStorage.setItem('bpTestSkipRegPrompt', HigiApiResponse.appUiConfig.bpTestSkipRegPrompt);
//			}
//			else {
//				localStorage.removeItem('bpTestSkipRegPrompt');
//			}
//
//			if (HigiApiKey) {
//
//				HigiApi.GetPrinterSettings(HigiApiKey,
//					function (response) {
//						if (response) {
//							if (response.printingEnabled) {
//								localStorage.setItem('printEnabled', response.printingEnabled);
//							}
//							if (response.printingCost) {
//								localStorage.setItem('printPrice', response.printingCost);
//							}
//							if (response.printingCurrency) {
//								localStorage.setItem('printCurrency', response.printingCurrency);
//							}
//						}
//					},
//					function (response) {
//						if (localStorage.getItem('printEnabled') == undefined) {
//							localStorage.setItem('printEnabled', false);
//						}
//					}
//				)
//			}
//		});
//    }
//}
//
//function getAdDataObjectForSlide(kioskSlide)
//{
//    var kioskBpSystolic = null;
//    var kioskBpDiastolic = null;
//    var kioskWeight = null;
//    var kioskHeight = null;
//    var kioskLanguage = globalLanguage;
//    var kioskGender = returnSessionData('gender');
//    var kioskAge = getAge(returnSessionData('birthdate'));
//    var kioskPulse = null;
//
//    if (returnSessionData('systolic'))
//    {
//        kioskBpSystolic = returnSessionData('systolic');
//    }
//    else if (returnSessionData('lastCheckin') && returnSessionData('lastCheckin').systolic)
//    {
//        kioskBpSystolic = returnSessionData('lastCheckin').systolic;
//    }
//
//    if (returnSessionData('diastolic'))
//    {
//        kioskBpDiastolic = returnSessionData('diastolic');
//    }
//    else if (returnSessionData('lastCheckin') && returnSessionData('lastCheckin').diastolic)
//    {
//        kioskBpDiastolic = returnSessionData('lastCheckin').diastolic;
//    }
//
//    if (returnSessionData('weight'))
//    {
//        kioskWeight = parseFloat(returnSessionData('weight'));
//    }
//    else if (returnSessionData('lastCheckin') && returnSessionData('lastCheckin').weightKG)
//    {
//        kioskWeight = parseFloat(returnSessionData('lastCheckin').weightKG);
//    }
//
//    if (returnSessionData('height'))
//    {
//        kioskHeight = returnSessionData('height');
//    }
//    else if (returnSessionData('lastCheckin') && returnSessionData('lastCheckin').heightMeters)
//    {
//        kioskHeight = returnSessionData('lastCheckin').heightMeters;
//    }
//
//	if (returnSessionData('pulse'))
//    {
//        kioskPulse = returnSessionData('pulse');
//    }
//    else if (returnSessionData('lastCheckin') && returnSessionData('lastCheckin').pulse)
//    {
//        kioskPulse = returnSessionData('lastCheckin').pulse;
//    }
//
//	var kioskBMI = null;
//	var kioskBMIRisk = null;
//    if (kioskWeight && kioskHeight)
//    {
//        kioskBMI = parseFloat(calculateBmi(kioskWeight, kioskHeight, 2));
//		kioskBMIRisk = calculateBmiRisk(kioskBMI);
//    }
//
//	var kioskBpRisk = null;
//	if (kioskBpSystolic && kioskBpDiastolic)
//	{
//		kioskBpRisk = calculateBpRisk(kioskBpSystolic,kioskBpDiastolic);
//	}
//
//	var kioskPulseRisk = null;
//	if (kioskPulse)
//	{
//		kioskPulseRisk = calculatePulseRisk(kioskPulse);
//	}
//
//	var isAuthenticated = false;
//	if (returnSessionData('logged_in') === true)
//	{
//		isAuthenticated = true;
//	}
//
//    var adDataObject = {
//		'isAuthenticated' : isAuthenticated,
//        'bpSystolic' : kioskBpSystolic,
//        'bpDiastolic' : kioskBpDiastolic,
//		'bpRisk' : kioskBpRisk,
//		'pulse' : kioskPulse,
//		'pulseRisk' : kioskPulseRisk,
//		'weight' : kioskWeight,
//        'bmi' : kioskBMI,
//		'bmiRisk' : kioskBMIRisk,
//        'language' : kioskLanguage,
//        'gender' : kioskGender,
//        'height' : kioskHeight,
//        'age' : kioskAge
//     };
//
//	var userTags = null;
//	if (returnSessionData('user'))
//	{
//		userTags = returnSessionData('user').tags;
//		for (var key in userTags) {
//			adDataObject[key] = userTags[key];
//		}
//	}
//
//     return adDataObject;
//}
//
//function onSeatOpen() {
//    $(document).trigger('seatOpen');
//}
//
//function onSeatClose() {
//    $(document).trigger('seatClose');
//}
//
//function onUserSit() {
//    $(document).trigger('userSit');
//}
//
//function onUserStand() {
//    $(document).trigger('userStand');
//}
//
//function enableSplashScreen() {
//    //Select a random splash screen message
//    var rand = (Math.floor(Math.random() * 3) + 1);
//    kioskSplashMessageVersion = rand;
//    $('#splash_message0' + rand).fadeIn();
//
//    $('#splash_btn_box').fadeIn();
//}
//
//function authDisplay(authType, authText, fadeOutDelayMs) {
//    if (fadeOutDelayMs == undefined) {
//        if (authType == 'success' || authType == 'failure') {
//            fadeOutDelayMs = 2500;
//        }
//        else if (authType == 'print' || authType == 'coppa' || authType == 'email') {
//            fadeOutDelayMs = 4900;
//        }
//    }
//    //reset
//    $('#auth_dialog').off();
//    $('#auth_dialog_title').attr('class', '');
//    $('#auth_dialog_icon').attr('class', '');
//    $('#auth_dialog_content').attr('class', '');
//
//    if (authType == "success") {
//        $('#auth_dialog_title').attr('class', 'auth_dialog_success_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.success'));
//        $('#auth_dialog_content').text(getResourceValue(authText));
//        $('#auth_dialog_icon').attr('class', 'auth_dialog_success');
//    }
//    else if (authType == "failure") {
//        $('#auth_dialog_title').attr('class', 'auth_dialog_failure_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.failure'));
//        $('#auth_dialog_content').text(getResourceValue(authText));
//        $('#auth_dialog_icon').attr('class', 'auth_dialog_failure');
//    }
//    else if (authType == "loading") {
//        $('#auth_dialog_title').attr('class', 'auth_dialog_loading_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.loading'));
//        $('#auth_dialog_content').text("");
//        $('#auth_dialog_content').attr('class', 'auth_dialog_loading_spinner');
//        $('#auth_dialog_icon').attr('class', 'auth_dialog_loading');
//    }
//    else if (authType == "print") {
//        $('#auth_dialog').on('click', function () {
//            $('#auth_dialog').stop(false, true);
//        });
//        $('#auth_dialog_title').attr('class', 'auth_dialog_loading_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.print.unavailable.title'));
//        $('#auth_dialog_content').text(getResourceValue(authText));
//        $('#auth_dialog_content').attr('class', 'auth_dialog_content_print');
//        $('#auth_dialog_icon').attr('class', '');
//    }
//    else if (authType == "email") {
//        $('#auth_dialog').on('click', function () {
//            $('#auth_dialog').stop(false, true);
//        });
//        $('#auth_dialog_title').attr('class', 'auth_dialog_loading_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.email.unavailable.title'));
//        $('#auth_dialog_content').text(getResourceValue(authText));
//        $('#auth_dialog_content').attr('class', 'auth_dialog_content_print');
//        $('#auth_dialog_icon').attr('class', '');
//    }
//    else if (authType == "coppa") {
//        $('#auth_dialog_title').attr('class', 'auth_dialog_failure_title');
//        $('#auth_dialog_title').text(getResourceValue('auth.coppa'));
//        $('#auth_dialog_content').text(' ');
//
//        $('#auth_dialog_icon').attr('class', 'auth_dialog_failure');
//    }
//    else if (authType == "calculating") {
//        $('#auth_dialog_title').attr('class', 'auth_dialog_loading_title');
//        $('#auth_dialog_title').text(getResourceValue('global.calculating.results'));
//        $('#auth_dialog_content').text("");
//        $('#auth_dialog_content').attr('class', 'auth_dialog_loading_spinner');
//        $('#auth_dialog_icon').attr('class', 'auth_dialog_loading');
//    }
//
//    if (authType == 'success' || authType == 'failure') {
//        $('#auth_dialog').fadeIn(500).delay(fadeOutDelayMs).fadeOut(500);
//    } else if (authType == 'print') {
//        $('#auth_dialog').fadeIn(300).delay(fadeOutDelayMs).fadeOut(300);
//    } else if (authType == 'email') {
//        $('#auth_dialog').fadeIn(300).delay(fadeOutDelayMs).fadeOut(300);
//    } else if (authType == 'loading') {
//        $('#auth_dialog').fadeIn(500).delay(500);
//    } else if (authType == 'calculating') {
//        $('#auth_dialog').fadeIn(500).delay(500);
//    } else if (authType == 'coppa') {
//        $('#auth_dialog').fadeIn(300).delay(fadeOutDelayMs).fadeOut(300, function () {
//            //Prevent refade by removine self after fadout
//            $('#auth_dialog').remove();
//            higi_exit();
//        });
//    }
//}
//
///*
// * Functions for button and keyboard sliding
// *
// */
////Variables for bounce and sliding
//slideSpeed = 460;
//bounceSpeed = 90;
//frameSpeed = 1000;
//
//function leftSlideIn(elementId) {
//    updateResourcesForContainer(elementId);
//    var eWidth = $(elementId).width();
//    if ($(elementId).css('left') != '-5px') {
//        $(elementId).finish()
//            .show()
//            .css({"left": -(eWidth) + "px" })
//            .animate({'opacity': 1}, 1, function () {
//                disableButton(elementId);
//            })
//            .animate({"left": "0px"}, slideSpeed)
//            .animate({"left": "-5px" }, bounceSpeed, function () {
//                enableButton(elementId);
//            });
//    }
//}
//function leftSlideOut(elementId) {
//    var eWidth = $(elementId).width();
//    $(elementId).finish()
//        .animate({'opacity': 1}, 1, function () {
//            disableButton(elementId);
//        })
//        .animate({"left": -(eWidth) + "px" }, slideSpeed, function () {
//            enableButton(elementId);
//            $(elementId).hide();
//        });
//}
//function rightSlideIn(elementId) {
//    updateResourcesForContainer(elementId);
//    var eWidth = $(elementId).width();
//    if ($(elementId).css('left') != screenWidth - eWidth + 5 + 'px') {
//        $(elementId).finish()
//            .show()
//            .css({"left": screenWidth + "px"})
//            .animate({'opacity': 1}, 1, function () {
//                disableButton(elementId);
//            })
//            .animate({"left": (screenWidth - eWidth) + "px" }, slideSpeed)
//            .animate({"left": (screenWidth - eWidth + 5) + "px" }, bounceSpeed, function () {
//                enableButton(elementId);
//            });
//    }
//}
//function rightSlideOut(elementId) {
//    var eWidth = $(elementId).width();
//    $(elementId).finish()
//        .animate({'opacity': 1}, 1, function () {
//            disableButton(elementId);
//        })
//        .animate({"left": screenWidth + "px"}, slideSpeed, function () {
//            enableButton(elementId);
//            $(elementId).hide();
//        });
//}
//function bottomSlideIn(elementId) {
//    var eHeight = $(elementId).height();
//    if ($(elementId).css('bottom') == (-(eHeight) + 'px')) {
//        $(elementId).show().css({"bottom": -(eHeight) + "px"}).animate({"bottom": "0px" }, slideSpeed * 1.5).animate({"bottom": "-5px" }, bounceSpeed);
//    }
//}
//function bottomSlideOut(elementId) {
//    var eHeight = $(elementId).height();
//    if ($(elementId).css('bottom') == '-5px') {
//        $(elementId).animate({"bottom": -(eHeight) + "px"}, slideSpeed);
//    }
//}
//
///*
// * Performs exit actions
// */
//function higi_exit() {
//
//    //Prevent audio from playing after coppa fail
//    muteAllAudio();
//
//    exitSessionInProgress = true;
//    currentlyPlayingMedia = null;
//    clearAllTimeouts();
//    higi_closeKeyboardDialog();
//    saveUnauthData();
//    endSession();
//    checkForMaintenance();
//}
//function muteAllAudio(){
//    $('audio').each(function(i){
//        $(this).prop('muted',true);
//    })
//}
//function checkForMaintenance() {
//    var numWeightScaleGlobalErrors = localStorage.getItem("weightScaleGlobalErrorCount");
//    if (numWeightScaleGlobalErrors == undefined) {
//        numWeightScaleGlobalErrors = 0;
//    }
//    var numBpGlobalErrors = localStorage.getItem("bpGlobalErrorCount");
//    if (numBpGlobalErrors == undefined) {
//        numBpGlobalErrors = 0;
//    }
//    if (numBpGlobalErrors >= 3 || numWeightScaleGlobalErrors >= 3) {
//        displayMaintenance();
//    }
//    else {
//        hideMaintenance();
//    }
//}
//
///*
// * Opens Keyboard Dialog
// */
//function higi_openKeyboardDialog(dialog) {
//    saveSessionData('toDialog', dialog)
//    $("#higi_keyboard_dialog").load("keyboard_dialog.html", function () {
//        $("#higi_keyboard_box").fadeIn(800);
//    });
//}
//
//
//
//
///*
// * Closes Keyboard Dialog
// */
//function higi_closeKeyboardDialog() {
//    $("#higi_keyboard_box").fadeOut(800, function () {
//        // after closing dialog, empty the container and reload it to ensure a fresh start
//        $("#higi_keyboard_dialog").empty();
//    });
//}
//
//
//
///*
// * Opens Keyboard Dialog
// */
//function higi_showInfoboxWide(content_html) {
//    if (content_html != null) {
//        $('#info_box_scroll').load(content_html, function () {
//            updateResourcesForContainer("#info_box_content");
//            infoboxScroll = null;
//            infoboxScroll = new iScroll('info_box_content', {hScroll: false, scrollbarClass: 'iscroll_scrollbar' });
//            infoboxScroll.scrollTo(0, 0, 1000, false);
//
//        });
//    }
//    else {
//        infoboxScroll = null;
//        infoboxScroll = new iScroll('info_box_content', {hScroll: false, scrollbarClass: 'iscroll_scrollbar' });
//        infoboxScroll.scrollTo(0, 0, 1000, false);
//
//    }
//    $('#info_box').fadeIn(1000)
//}
//
///*
// * Sets up the infobox
// */
//
//function higi_showInfobox(content_html) {
//    if (content_html != null) {
//        $('#info_box_scroll').load(content_html, function () {
//            updateResourcesForContainer("#info_box_content");
//            infoboxScroll = null;
//            infoboxScroll = new iScroll('info_box_content', {hScroll: false, scrollbarClass: 'iscroll_scrollbar' });
//            infoboxScroll.scrollTo(0, 0, 1000, false);
//        });
//    }
//    else {
//        infoboxScroll = null;
//        infoboxScroll = new iScroll('info_box_content', {hScroll: false, scrollbarClass: 'iscroll_scrollbar' });
//        infoboxScroll.scrollTo(0, 0, 1000, false);
//    }
//    $('#info_box').fadeIn(1000)
//}
///*
// * Closes infobox
// */
//function higi_closeInfobox() {
//    $("#info_box").fadeOut(1000, function () {
//        $('#info_box_scroll').empty();
//        if (infoboxScroll != null) {
//            infoboxScroll.destroy();
//            infoboxScroll = null;
//        }
//    });
//}
//
///*
// * Sets up the adbox
// */
//function higi_showAdbox(content_img) {
//    var img = $("<img />").attr('src', content_img)
//        .load(function () {
//            if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
//               
//            }
//            else {
//                $("#ad_box_scroll").append(img);
//                if (this.naturalHeight > 640) {
//                    infoboxScroll = null;
//                    infoboxScroll = new iScroll('ad_box_content', {hScroll: false, scrollbarClass: 'iscroll_scrollbar' });
//                    infoboxScroll.scrollTo(0, 0, 1000, false);
//                }
//            }
//        });
//    $('#ad_box').fadeIn(1000);
//}
//
///*
// * Closes adbox
// */
//function higi_closeAdbox() {
//    $("#ad_box").fadeOut(1000, function () {
//        $('#ad_box_scroll').empty();
//        if (adboxScroll != null) {
//            adboxScroll.destroy();
//            adboxScroll = null;
//        }
//    });
//}
//
///*
// * Disables the session timeout
// */
//function disableExitTimeout() {
//    console.log('Exit timeout disabled');
//    isTimerEnabled = false;
//    try {
//        clearTimeout(sessionExitTimeoutHandle);
//        exitTimeoutHandle = null;
//    }
//    catch (err) {
//        //error here
//    }
//}
//
///*
// * Sets/resets the session timeout
// */
//function setExitTimeout() {
//    isTimerEnabled = true;
//    try {
//        clearTimeout(sessionExitTimeoutHandle);
//        exitTimeoutHandle = null;
//        console.log('Exit timeout set');
//    }
//    catch (err) {
//        //error here
//        console.log('Error setting exit timeout');
//    }
//
//    if ($('#timeout_dialog').css('display') == 'block') {
//        try {
//            clearTimeout(countDownTimeoutHandle);
//            countDownTimeoutHandle = null;
//        }
//        catch (err) {
//            //error here
//        }
//
//        try {
//            clearInterval(countDownIntervalHandle);
//            countDownIntervalHandle = null;
//        }
//        catch (err) {
//            //error here
//        }
//    }
//    stopExitTimeout();
//
//    if (kioskADAMode == true && higi_pageName != "") {
//        console.log("Timeout in " + sessionTimeoutStartWarningTimeADA + " seconds");
//        sessionExitTimeoutHandle = setTimeout("startExitTimeout()", sessionTimeoutStartWarningTimeADA);
//    }
//    else {
//        console.log("Timeout in " + sessionTimeoutStartWarningTime + " seconds");
//        sessionExitTimeoutHandle = setTimeout("startExitTimeout()", sessionTimeoutStartWarningTime);
//    }
//}
//
///*
// * Starts the timeout dialog and the countdown animation
// */
//function startExitTimeout() {
//    isTimerEnabled = true;
//    keyboardDialogDisplay = $('#higi_keyboard_box').css('display');
//    higiSplashDisplay = $('#higi_start').css('display');
//
//    /*
//     * Last ditch effort to check if the User is sitting or not.
//     * In the case something occurs and the user WAS sitting at the moment of timeout
//     * let's just recursively reset the timeout and not show the timeout dialog
//     */
//    if (sessionUserSitting == false) {
//        if (currentlyPlayingMedia != null) {
//            currentlyPlayingMedia.pause();
//        }
//
//        if (higi_pageIndex != 0 || (higi_pageIndex == 0 && keyboardDialogDisplay == 'block') || (higi_pageIndex == 0 && returnSessionData('session_active') == true)) {
//            startCountDownTime = getSettingsValue('session.timeout.warning.time');
//            //show the timeout screen and start the final countdown
//            $('#higi_timeout_dialog').load('component_timeout_dialog.html').fadeIn(500);
//            countAnimation('#timeout_dialog_content #timeout_countdown', startCountDownTime / 1000, 0, startCountDownTime, "doExitTimeout()", 0);
//        }
//    }
//    else {
//        setExitTimeout();
//    }
//}
//
///*
// * Hides and unloads the timeout dialog and resets the session timeout
// *
// */
//function stopExitTimeout() {
//    if ($('#higi_timeout_dialog').css('display') != 'none') {
//        $('#higi_timeout_dialog').fadeOut(500, function () {
//            $(this).empty();
//        })
//
//
//        if (!($('#higi_keyboard_box').is(':visible'))) {
//            if (currentlyPlayingMedia != null && currentlyPlayingMedia.paused) {
//                currentlyPlayingMedia.play();
//            }
//
//            try {
//                eval(higi_pageName + '_willAppearAfterDialog()');
//            }
//            catch (err) {
//                console.log('Missing ' + higi_pageName + '_willAppearAfterDialog()')
//            }
//        }
//    }
//}
//
///*
// * Performs the exit actions after the timeout dialog countdown finishes
// */
//function doExitTimeout() {
//    logEvent(higi_pageName, 'session', 'timed out');
//    higi_exit();
//    stopExitTimeout();
//}
//
///*
// * Method to load resource strings for a particular language into the <a id="app_resources"/> element data
// */
//function loadResourcesForLocale(locale) {
//    app_locale = locale;
//
//    // load settings values synchronously to ensure
//    // they are loaded before we attempt to use them
//    appResources = $.parseJSON(
//        $.ajax(
//            {
//                url: "json/appResources_" + app_locale + ".json",
//                async: false,
//                dataType: 'json'
//            }
//        ).responseText
//    );
//}
//
/*
* Method to load application settings into the <a id="app_settings"/> element data
*/
function loadSettings() {
    // load settings values synchronously to ensure
    // they are loaded before we attempt to use them
    appSettings = $.parseJSON(
        $.ajax(
            {
                url: "json/appSettings.json",
                async: false,
                dataType: 'json'
            }
        ).responseText
    );
}

///*
// * Method to iterate over container's descendants and replace the html and src values
// * where higi_resource_html and higi_resource_src attributes are used to reference
// * a resource key.
// */
//function updateResourcesForContainer(selector) {
//    // apply the current locale as a class name to all elements in the container
//    $(selector).find('*').each(function () {
//        for (var i = 0; i < app_locale_array.length; i++) {
//            var currentLocale = app_locale_array[i];
//            $(this).removeClass(currentLocale);
//        }
//        $(this).addClass(app_locale);
//    });
//
//
//    $(selector).find('*[higi_resource_html]').each(function (index) {
//        var paramObj = null;
//        try {
//            if ($(this).attr("higi_resource_params") != null) {
//                paramObj = jQuery.parseJSON($(this).attr("higi_resource_params"));
//            }
//        }
//        catch (e) {
//            console.error("Error extracting params for object: " + e.message);
//        }
//
//        if (paramObj == null) {
//            $(this).html(getResourceValue($(this).attr('higi_resource_html')));
//        }
//        else {
//            $(this).html(getResourceValueWithParams($(this).attr('higi_resource_html'), paramObj));
//        }
//    });
//
//    $(selector).find('*[higi_resource_src]').each(function (index) {
//
//        var paramObj = null;
//        try {
//            if ($(this).attr("higi_resource_params") != null) {
//                paramObj = jQuery.parseJSON($(this).attr("higi_resource_params"));
//            }
//        }
//        catch (e) {
//            console.error("Error extracting params for object: " + e.message);
//        }
//
//        if (paramObj == null) {
//            $(this).attr('src', getResourceValue($(this).attr('higi_resource_src')));
//        }
//        else {
//            $(this).html(getResourceValueWithParams($(this).attr('higi_resource_src'), paramObj));
//        }
//    });
//}
//
///*
// * Sets the value associated with a resource key in either an element
// * attribute or the inner html of an element.
// * If no attributeName is provided in the input parameters, the inner
// * html will be modified. Otherwise the value of the associated attribute
// * shall be modified
// */
//function setResourceValue(elementSelector, attributeName, resourceKey) {
//    if (attributeName == null) {
//        // assume we're changing the html if no attribute is defined
//        $(elementSelector).html(getResourceValue(resourceKey));
//    }
//    else {
//        $(elementSelector).attr(attributeName, getResourceValue(resourceKey));
//    }
//}
//
///*
// * Returns value associated with resource key with params replaced with appropriate text.
// * paramObj parameter is expected to be a json object
// */
//function getResourceValueWithParams(resourceKey, paramObj) {
//    // get resource string
//    var resourceValue = getResourceValue(resourceKey);
//
//    for (var prop in paramObj) {
//        if (paramObj.hasOwnProperty(prop)) {
//            //doSomethingWith(obj[prop]);
//            resourceValue = resourceValue.replace("{" + prop + "}", paramObj[prop]);
//        }
//    }
//    return resourceValue;
//}
//
///*
// * Returns value associated with the resource key
// */
//function getResourceValue(resourceKey) {
//    return appResources[resourceKey];
//}
//
///*
// * Returns the value associated with an app settings key
// */
function getSettingsValue(settingKey) {
    return appSettings[settingKey];
}

///*
// * Function that switches languages for the selected file choice
// */
//
//function changeKioskLanguage(lang) {
//
//    //remove old language from class to prevent conflict
//    var previousLanguage = globalLanguage;
//    $('body').find('*').each(function () {
//        for (var i = 0; i < app_locale_array.length; i++) {
//            var currentLocale = app_locale_array[i];
//            $(this).removeClass(previousLanguage);
//        }
//        $(this).addClass(lang);
//    });
//    //
//
//
//    loadResourcesForLocale(lang);
//    loadItemsForScreenDescr();
//    updateResourcesForContainer('body');
//    globalLanguage = lang;
//    $('#splash_audio01 source').attr('src', getResourceValue('splash_selectoneofthree'));
//    $('#splash_audio01').trigger('load');
//}
//
///*
// * Function that calculates BMI
// */
//function calculateBmi(weightInKilograms, heightInMeters, precision) {
//    result = weightInKilograms / Math.pow(heightInMeters, 2);
//    return result.toFixed(precision);
//}
//
///*
// * Function that returns BMI Risk as a string
// */
//function calculateBmiRisk(bmi) {
//    if (bmi < 18.5) {
//        return 'underweight';
//    }
//    else if (bmi >= 18.5 && bmi <= 24.99) {
//        return 'normal';
//    }
//    else if (bmi > 25 && bmi <= 29.99) {
//        return 'overweight';
//    }
//    else if (bmi >= 30) {
//        return 'obese';
//    }
//    else {
//        return false;
//    }
//}
//
///*
// * Function that returns Blood Pressure Risk as a string
// */
//function calculateBpRisk(systolic, diastolic) {
//    if (systolic >= 140 || diastolic >= 90) {
//        return 'high';
//    }
//    else if ((systolic >= 120 && systolic < 140) || (diastolic >= 80 && diastolic < 90)) {
//        return 'atrisk';
//    }
//    else {
//        return 'normal';
//    }
//}
//
///*
// * Function that returns Pulse speed as a string
// */
//function calculatePulseRisk(pulse) {
//    if (pulse >= 100) {
//        return 'high';
//    }
//    else if (pulse <= 60) {
//        return 'low';
//    }
//    else {
//        return 'normal';
//    }
//}
//
///*
// * Function that converts kg to lbs
// */
//function convertToPounds(kilograms) {
//	result = kilograms * 2.2046226218;
//	return result.toString();
//}
//
///*
// * Function that converts lbs to kg
// */
//function convertToKilograms(pounds) {
//	result = pounds / 2.2046226218;
//	return result.toString();
//}
//
///*
// * Function that converts meters to feet, and only returns the feet variable (e.g. 5'2 will return 5)
// */
//function convertToFeetFoot(meters) {
//	var conversion = Math.round(meters / 0.0254); // in inches
//	var feet = Math.floor(conversion / 12.0);
//	var inches = Math.round(conversion - (feet * 12));
//	return feet;
//}
//
///*
// * Function that converts meters to feet, and only returns the inches variable (e.g. 5'2 will return 2)
// */
//function convertToFeetInches(meters) {
//	var conversion = Math.round(meters / 0.0254); // in inches
//	var feet = Math.floor(conversion / 12.0);
//	var inches = Math.round(conversion - (feet * 12));
//	return inches;
//}
//
///*
// * Function that converts a date and returns the age at the time the function is called
// */
//function getAge(dateString) {
//    var today = new Date();
//    var birthDate = new Date(dateString);
//    var age = today.getFullYear() - birthDate.getFullYear();
//    var m = today.getMonth() - birthDate.getMonth();
//    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
//        age--;
//    }
//    return age;
//}
//
///*
// * Method that checks if the argument is an actual valid email address
// * Checks loosely based on regex only.
// */
//function isValidEmailAddress(emailAddress) {
//    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
//    return pattern.test(emailAddress);
//}
//
///*
// * Function that controls animation of counting up (or counting down) of numbers
// */
//function countAnimation(elementId, startNumber, endNumber, totalTime, endFunction, numbersOfDigits, countby) {
//    var currentNumber;
//    var counting;
//    var numberDifference;
//    var countInterval;
//
//    currentNumber = startNumber;
//    numberDifference = (Math.abs(startNumber - endNumber));
//
//    //ensure there's at least a countby number if none is provided
//    if (countby == null) {
//        countby = 1;
//    }
//
//    //in the event that the interval can't actually count faster than the time given (e.g. count by 1 from 1 to 1000 in 500ms), we speed up the count
//    if (numberDifference >= totalTime) {
//        countby = Math.ceil(numberDifference / totalTime);
//    }
//
//    if (totalTime / numberDifference < 1) {
//        countInterval = 1
//    }
//    else {
//        countInterval = Math.round(totalTime / numberDifference);
//    }
//
//    counting = setInterval(function () {
//        writeNumber = currentNumber + "";
//        if (numbersOfDigits != null) {
//            while (writeNumber.length < numbersOfDigits) {
//                writeNumber = "0" + writeNumber;
//            }
//        }
//
//        $(elementId).html(writeNumber);
//
//        if (countby > numberDifference) {
//            currentNumber = endNumber;
//        }
//        else if (startNumber > endNumber && currentNumber > (endNumber + (numberDifference % countby))) {
//            currentNumber -= countby;
//            if ((currentNumber - countby) < endNumber) {
//                currentNumber = endNumber;
//            }
//        }
//        else if (startNumber < endNumber && currentNumber < (endNumber - (numberDifference % countby ))) {
//            currentNumber += countby;
//            if ((currentNumber + countby) > endNumber) {
//                currentNumber = endNumber;
//            }
//        }
//        else {
//            clearInterval(counting);
//            var handle = setTimeout("eval(" + endFunction + ")", 600);
//            countDownTimeoutHandle = handle;
//            timeout_handle_array[timeout_handle_array.length] = handle;
//        }
//    }, countInterval);
//    countDownIntervalHandle = counting;
//    interval_handle_array[interval_handle_array.length] = counting;
//}
//
//function animateRightControlBtnAttn() {
//    $('#higi_control_right_btn')
//        .finish()
//        .animate({'left': '-=5px'}, 200)
//        .animate({'left': '+=5px'}, 1000)
//        .animate({'left': '-=5px'}, 200)
//        .animate({'left': '+=5px'}, 1000)
//        .animate({'left': '-=5px'}, 200)
//        .animate({'left': '+=5px'}, 1000)
//}
//
//function clearAllTimeouts() {
//    for (var i = 0; i < timeout_handle_array.length; i++) {
//        clearTimeout(timeout_handle_array[i]);
//    }
//    timeout_handle_array = new Array();
//}
//
//function clearAllIntervals() {
//    for (var i = 0; i < interval_handle_array.length; i++) {
//        clearInterval(interval_handle_array[i]);
//    }
//    interval_handle_array = new Array();
//}
//
//function loadItemsForScreenDescr() {
//    var screenDescr = getSlideNavObject(higi_pageName);
//    $('#higi_control_left_btn span').html(getResourceValue(screenDescr["prevButtonText"]));
//    $('#higi_control_right_btn span').html(getResourceValue(screenDescr["nextButtonText"]));
//}
//
///*
// *
// * Notifications Bar Functions
// *
// */
//
////Creates the notification and loads it into the globalRewardsArray
//function createNotification(id, type, img, value, title, desc, viewed, cback) {
//    var tempObject = new Object();
//    var arrayLength = globalRewardsArray.length;
//    var found = false;
//    for (var i = 0; i < arrayLength; i++) {
//        if (globalRewardsArray[i].id == id) {
//            found = true;
//            break;
//        }
//    }
//
//    if (!found) {
//        tempObject.id = id;
//        tempObject.type = type;
//        tempObject.img = img;
//        tempObject.value = value;
//        tempObject.title = title;
//        tempObject.desc = desc;
//        tempObject.cback = cback;
//        if (viewed == undefined) {
//            tempObject.viewed = false;
//        }
//        else {
//            tempObject.viewed = viewed;
//        }
//        globalRewardsArray.push(tempObject);
//
//    }
//}
//
////resetPointNotification
////Unpins the notification bar, resets the notification viewed state and refires notificationBar
//function resetPointNotification(id){
//    if(returnSessionData('animatedPointsAuthenticated') != true){
//    if(checkRepeatCheckin()){
//        $('#notifications_bar').animate({'top': '600px'}, function () {
//
//        });
//        return 0;
//    }
//    saveSessionData('animatedPointsAuthenticated' , true);
//
//    $("body").on('scoreRendered' , function(){
//        $("body").unbind('scoreRendered');
//        $('#notifications_bar').delay(1500).animate({'top': '600px'} , function(){
//            $('#notifications_bar_title').removeClass('notifications_bar_title_pinned');
//            for(var num=0; num < globalRewardsArray.length; num++){
//                if(globalRewardsArray[num].id == id){
//                    medalEarnedSnd.play();
//                    $('#notifications_bar_content')
//                    .animate({'top': 0}, 1, function () {
//                        if ($('#notifications_bar').position().top != screenHeight - $('#notifications_bar').height()) {
//                            $('#notifications_bar').animate({'top': screenHeight - $('#notifications_bar').height() }, 300, 'swing', function(){
//                                //animate the icon
//                                // will probably end up being custom html added to notification instead of actual icon
//                                if(typeof(globalRewardsArray[num].cback) == "function"){
//                                    globalRewardsArray[num].cback();
//                                }
//                            });
//                        }
//                        populateNotificationBar(num);
//                    })
//                    .fadeIn(150)
//                    .delay(2500)
//                    .fadeOut(150, function () {
//                            $('#notifications_bar').animate({'top': '600px'}, function () {
//
//                            });
//                    });
//                    break;
//                }
//            }
//        });
//    });
//    }
//}
//
////Animates the actual Notifications Bar
//function animateNotificationsBar(num, trigger) {
//
//    //Sets the defaults if there's anything missing
//    var triggerPagename;
//    var delayTimer = 2500;
//    if (!num) {
//        num = 0;
//    }
//
//    if (!trigger) {
//        triggerPagename = higi_pageName;
//    }
//
//    //Check if the notification bar is even enabled, and that we have something to show
//    if (getSettingsValue('kiosk.notifications.bar') && checkNotificationsBarUnviewed() > 0) {
//        //if it wasn't viewed before, it is now
//        if (globalRewardsArray[num].viewed != true && globalRewardsArray[num].type == 'points') {
//            globalRewardsArray[num].viewed = true;
//            medalEarnedSnd.play();
//            $('#notifications_bar_content')
//                .animate({'top': 0}, 1, function () {
//                    if ($('#notifications_bar').position().top != screenHeight - $('#notifications_bar').height()) {
//                        $('#notifications_bar').animate({'top': screenHeight - $('#notifications_bar').height() }, 300, 'swing' , function(){
//                            if(typeof(globalRewardsArray[num].cback) == "function"){
//                                globalRewardsArray[num].cback();
//                            }
//                        });
//                    }
//                    populateNotificationBar(num);
//
//                })
//                .fadeIn(150)
//                .delay(delayTimer)
//                .fadeOut(150, function () {
//                    if (checkNotificationsBarUnviewed() >= 1) {
//                        animateNotificationsBar(num + 1, triggerPagename);
//                    }
//                    else {
//                        $('#notifications_bar').animate({'top': '600px'}, function () {
//                            $('#notifications_bar').trigger('completed');
//                            $('#notifications_bar').trigger('completed_' + triggerPagename);
//                            console.log('Notifications Bar was triggered on: ', triggerPagename);
//                        });
//                    }
//                })
//        }
//        else {
//            if (checkNotificationsBarUnviewed() >= 1) {
//                animateNotificationsBar(num + 1);
//            }
//        }
//    }
//    else {
//        //If the notifications bar wasn't enabled or there just wasn't anything to show but the notifications bar was called, so it's waiting for a trigger
//        $('#notifications_bar').trigger('completed');
//        $('#notifications_bar').trigger('completed_' + triggerPagename);
//        console.log('Notifications Bar was triggered on: ', triggerPagename);
//    }
//}
//
//
//function populateNotificationBar(n) {
//    //Content loading
//    if (globalRewardsArray[n].type == 'ribbon') {
//        $('#notifications_bar_icon').attr('class', 'ribbon_icon');
//        $('#notifications_bar').trigger('ribbon_earned');
//    }
//    else if (globalRewardsArray[n].type == 'medal') {
//        $('#notifications_bar_icon').attr('class', 'medal_icon');
//        $('#notifications_bar').trigger('medal_earned');
//    }
//    else if (globalRewardsArray[n].type == 'trophy') {
//        $('#notifications_bar_icon').attr('class', 'trophy_icon');
//        $('#notifications_bar').trigger('trophy_earned');
//    }
//    else if (globalRewardsArray[n].type == 'xp') {
//        $('#notifications_bar_icon').attr('class', 'hw_icon');
//        $('#notifications_bar').trigger('xp_earned');
//    }
//    else if (globalRewardsArray[n].type == 'levelup') {
//        $('#notifications_bar_icon').attr('class', 'levelup_icon');
//        $('#notifications_bar').trigger('levelup_earned');
//    }
//    else if (globalRewardsArray[n].type == 'points') {
//        $('#notifications_bar_icon').attr('class', 'points_icon');
//        $('#notifications_bar').trigger('points_earned');
//    }
//
//    if (globalRewardsArray[n].type == 'xp') {
//        $('#notifications_bar_value span').addClass('notifications_bar_hw');
//        $('#notifications_bar_value span').html('+' + globalRewardsArray[n].value + ' higiWatts');
//    }
//    else {
//        $('#notifications_bar_value span').html('');
//    }
//
//    $('#notifications_bar_title span').html(globalRewardsArray[n].title);
//    $('#notifications_bar_descrition span').html(globalRewardsArray[n].desc);
//
//}
//
//function overrideNotificationsViewedList() {
//    for (i = 0; i < globalRewardsArray.length; i++) {
//        n = i;
//        globalRewardsArray[n].viewed = true;
//    }
//    $('#notifications_bar').finish();
//    $('#notifications_bar_content').finish();
//}
//
//function checkNotificationsBarUnviewed() {
//    //Only allowing point notifications to render
//    var totalUnviewed = 0;
//    //Count the unviewed rewards
//    for (var i = 0; i < globalRewardsArray.length; i++) {
//        var n = i;
//        if (globalRewardsArray[n].viewed == false && globalRewardsArray[n].type == "points") {
//            totalUnviewed++;
//        }
//    }
//    return totalUnviewed;
//}
//
//function higi_forward() {
//    forwardToScreen(null);
//}
//
//function forwardToScreen(screenName) {
//    currentlyPlayingMedia = null;
//    clearAllTimeouts();
//    clearAllIntervals();
//
//    disableButton("#higi_control_left_btn");
//    disableButton("#higi_control_right_btn");
//
//    $('#notifications_bar').finish();
//
//    var nextScreenName = screenName;
//    if (nextScreenName == null)
//    {
//        var slideNavObject = getSlideNavObject(higi_pageName);
//        nextScreenName = slideNavObject["nextObjectName"];
//    }
//
//    if (nextScreenName != null) {
//        if ($("#higi_" + (higi_pageIndex + 1)).length == 0) {
//            $("#higi_slides").append("<div class=\"higi_slide_content\" id=\"higi_" + (higi_pageIndex + 1) + "\"></div>");
//        }
//
//        //Evaluates _goingForward for the /current/ slide
//        try {
//            eval(higi_pageName + "_goingForward()");
//        }
//        catch (err) {
//            console.log('Missing ' + higi_pageName + "_goingForward()")
//        }
//
//        $("#higi_" + (higi_pageIndex + 1)).load(nextScreenName + ".html", function () {
//
//            // update resource values
//            updateResourcesForContainer("#higi_" + (higi_pageIndex + 1));
//
//            $("#higi_" + (higi_pageIndex + 1) + " audio").each(function () {
//                this.volume = getGlobalVolume();
//                registerAudioObject(this);
//            });
//
//            $("#higi_" + (higi_pageIndex + 1) + " video").each(function () {
//                this.volume = getGlobalVolume();
//                registerVideoObject(this);
//            });
//
//            var leftValue = -(screenWidth) * (higi_pageIndex + 1);
//            $("#higi_slides").css("left", leftValue.toString() + "px");
//            // indicate to page that it is visible and hidden
//
//            try {
//                eval(nextScreenName + "_willAppear()");
//            }
//            catch (err) {
//                console.log('Missing ' + nextScreenName + "_willAppear()")
//            }
//
//            higi_pageIndex++;
//            higi_pageName = nextScreenName;
//
//            // log screen load
//            logStartScreen(higi_pageName);
//
//            var handle = setTimeout(function () {
//                $('#higi_' + (higi_pageIndex - 1)).html('');
//                enableButton('#higi_control_left_btn');
//                enableButton('#higi_control_right_btn');
//                loadItemsForScreenDescr();
//            }, frameSpeed);
//
//            //Debugger
//            if (returnSessionData('debug_mode') == true) {
//                debugModeOptions();
//            }
//
//        });
//    }
//    $('body').removeData('toPage');
//
//}
//
//function higi_back() {
//    currentlyPlayingMedia = null;
//    clearAllTimeouts();
//    clearAllIntervals();
//
//    disableButton("#higi_control_left_btn");
//    disableButton("#higi_control_right_btn");
//
//    $('#notifications_bar').finish();
//
//    var slideNavObject = getSlideNavObject(higi_pageName);
//
//    try {
//        eval(higi_pageName + "_goingBack()");
//    }
//    catch (err) {
//        console.log('Missing ' + higi_pageName + "_goingBack()")
//    }
//
//    if (slideNavObject["prevObjectName"] != null) {
//        $("#higi_" + (higi_pageIndex - 1)).load(slideNavObject["prevObjectName"] + ".html", function () {
//
//            // update resource values
//            updateResourcesForContainer("#higi_" + (higi_pageIndex - 1));
//
//            $("#higi_" + (higi_pageIndex - 1) + " audio").each(function () {
//                this.volume = getGlobalVolume();
//                registerAudioObject(this);
//            });
//
//            $("#higi_" + (higi_pageIndex - 1) + " video").each(function () {
//                this.volume = getGlobalVolume();
//                registerVideoObject(this);
//            });
//
//
//            var leftValue = -(screenWidth) * (higi_pageIndex - 1);
//            $("#higi_slides").css("left", leftValue.toString() + "px");
//
//            // indicate to page that it is visible and hidden
//            try {
//                eval(slideNavObject["prevObjectName"] + "_willAppear()");
//            }
//            catch (err) {
//                console.log('Missing ' + slideNavObject["prevObjectName"] + "_willAppear()")
//            }
//
//            higi_pageIndex--;
//            higi_pageName = slideNavObject["prevObjectName"];
//
//            // log screen load
//            logStartScreen(higi_pageName);
//
//            var handle = setTimeout(function () {
//                $('#higi_' + (higi_pageIndex + 1)).html('');
//                enableButton("#higi_control_left_btn");
//                enableButton("#higi_control_right_btn");
//                loadItemsForScreenDescr();
//            }, frameSpeed);
//
//            if (returnSessionData('debug_mode') == true) {
//                debugModeOptions();
//            }
//
//        });
//    }
//    $('body').removeData('toPage');
//}
//
//function saveSessionData(key, value) {
//    $('body').removeData(key);
//    $('body').data(key, value);
//}
//
//function returnSessionData(key, elementId) {
//    savedata = $('body').data(key);
//    if (savedata == undefined) {
//        return(undefined);
//    }
//    else {
//        return $('body').data(key);
//    }
//}
//
//function saveUnauthData() {
//    var user = returnSessionData('user');
//    if (user != undefined) return;
//    if (returnSessionData('results_saved') == true) return;
//
//    registerKiosk();
//
//    //Don't create the checkin if the user is logged in. it creates an empty check if the user exists kiosk before session finish
//    if (returnSessionData('logged_in') != true) {
//        var checkin = CreateCheckin(returnSessionData);
//    }
//
//    //fail silently
//    HigiApi.SaveUnauthCheckInAsync(checkin, function () {
//        saveSessionData('results_saved', true);
//    }, function () {
//    });
//}
//
//function addScrollWheel(wheelContainer, wheelList, wheelArray) {
//    var wheel = document.getElementById(wheelContainer);
//    var list = document.getElementById(wheelList);
//    for (var i = 0; i < wheelArray.length; ++i) {
//        var item = document.createElement('li');
//        item.className = 'item';
//        item.id = wheelList + '_' + i;
//        item.innerHTML = wheelArray[i % wheelArray.length];
//        list.appendChild(item);
//        if (list.offsetHeight > wheel.offsetHeight * 7) {
//            break;
//        }
//    }
//    $(document).trigger(wheelContainer + '_loaded');
//}
//
//function enableButton(elementId) {
//    higi_buttonsEnabled[elementId] = true;
//}
//
//function disableButton(elementId) {
//    higi_buttonsEnabled[elementId] = false;
//}
//
//function isButtonEnabled(elementId) {
//    return higi_buttonsEnabled[elementId];
//}
//
//function getGlobalVolume() {
//    if (isAudioMuted) {
//        return 0;
//    }
//    else {
//        return globalAudioVolume;
//    }
//}
//
//function registerAudioObject(audioObject) {
//    audioObjects[audioObjects.length] = audioObject;
//}
//
//function unregisterAudioObject(audioObject) {
//    for (var i = 0; i < audioObjects.length; i++) {
//        if (audioObject == audioObjects[i]) {
//            audioObjects.splice(i, 1);
//        }
//    }
//}
//
//function registerVideoObject(videoObject) {
//    videoObjects[videoObjects.length] = videoObject;
//}
//
//function unregisterVideoObject(videoObject) {
//    for (var i = 0; i < videoObjects.length; i++) {
//        if (videoObject == videoObjects[i]) {
//            videoObjects.splice(i, 1);
//        }
//    }
//}
//
//function updateAllVolume() {
//    for (var aix = 0; aix < audioObjects.length; aix++) {
//        audioObjects[aix].volume = getGlobalVolume();
//    }
//
//    for (var vix = 0; vix < videoObjects.length; vix++) {
//        videoObjects[vix].volume = getGlobalVolume();
//    }
//}
//
//function beginKioskSession() {
//    if (!returnSessionData('sessionId'))
//    {
//        saveSessionData('sessionId', new Date().getTime());
//
//        // register the kiosk with the api
//        registerKiosk();
//        logStartSession();
//
//        //Log if the kiosk is in ADA Mode
//        if (kioskADAMode == true) {
//            logEvent('Kiosk_ADA_Mode', 'hardware', 'active');
//        }
//
//        //Register ALL sound effects to be affected by volume
//        registerAudioObject(typeSnd);
//        registerAudioObject(clickSnd);
//        registerAudioObject(xpEarnedSnd);
//        registerAudioObject(xpBarLevelUpSnd);
//        registerAudioObject(ribbonLevelUpSnd);
//        registerAudioObject(ribbonEarnedSnd);
//        registerAudioObject(medalEarnedSnd);
//        registerAudioObject(trophyEarnedSnd);
//
//        $("body audio").each(function() {
//            this.volume = getGlobalVolume();
//            registerAudioObject(this);
//        });
//
//        $("body video").each(function() {
//            this.volume = getGlobalVolume();
//            registerVideoObject(this);
//        });
//        saveSessionData('session_active', true);
//
//        if (kioskADAMode == true || sessionUserSitting == false) {
//            setExitTimeout();
//        }
//    }
//}
//
///*
// * Function that handles the kiosk on log out or the end of a session
// */
//
//function endSession() {
//    logEvent(higi_pageName, 'session', 'ended');
//
//    currentlyPlayingMedia = null;
//    logEndSession();
//    higi_pageIndex = 0;
//    $('body').removeData();
//    currentUserProfileImage = null;
//    HigiUserToken = null;
//
//    rightSlideOut("#higi_control_right_btn");
//    leftSlideOut("#higi_control_left_btn");
//
//    $('#higi_error_dialog').fadeOut(function () {
//        $("#higi_error_dialog").empty();
//    });
//
//    $('#exit_confirm').fadeOut();
//    $("#higi_audio_box").fadeOut();
//
//    higi_closeInfobox();
//
//    // remove authenticated classes from necessary elements
//    $('.higi_top_nav').removeClass('higi_top_nav_authenticated');
//    $('.audio_slider_container').removeClass('audio_slider_container_authenticated');
//
//    setDefaultVolume();
//
//    // clear out the audio and video items
//    audioObjects = null;
//    audioObjects = new Array();
//    videoObjects = null;
//    videoObjects = new Array();
//
//    enableButton("#higi_control_left_btn");
//    enableButton("#higi_control_right_btn");
//
//    $(document).trigger('kioskSessionEnded');
//
//    $('body').fadeOut(1000, function () {
//        location.reload();
//    });
//}
//
//function CreateCheckin(getSessionData) {
//    var checkin = new HigiCheckin();
//    checkin.heightMeters = getSessionData('height');
//    checkin.weightKG = getSessionData('weight');
//    checkin.pulseBpm = getSessionData('pulse');
//    checkin.systolic = getSessionData('systolic');
//    checkin.diastolic = getSessionData('diastolic');
//    checkin.score = getSessionData('higi_points');
//	checkin.adToken = getSessionData('adToken');
//
//    if (getSessionData('averageBPResults') == true) {
//        checkin.bloodPressures = new Array();
//        for (var i = 0; i < getSessionData('systolicHistory').length; i++) {
//            var bpObject = new Object();
//            bpObject.systolic = getSessionData('systolicHistory')[i];
//            bpObject.diastolic = getSessionData('diastolicHistory')[i];
//            checkin.bloodPressures.push(bpObject);
//        }
//    }
//
//    if (getSessionData('user') == undefined) {
//        checkin.gender = getSessionData('gender');
//        checkin.dateOfBirth = getSessionData('birthdate');
//    }
//
//    return checkin;
//}
//
//function CompareUser(onServer, getSessionData) {
//    var user = new HigiUser();
//    var boolChanged = false;
//    if (onServer.gender != getSessionData('gender')) {
//        user.gender = getSessionData('gender');
//        boolChanged = true;
//    }
//    if (onServer.heightMeters != getSessionData('height')) {
//        user.heightMeters = getSessionData('height');
//        boolChanged = true;
//    }
//    if (onServer.dateOfBirth != getSessionData('birthdate')) {
//        user.dateOfBirth = getSessionData('birthdate');
//        boolChanged = true;
//    }
//    if (!boolChanged) {
//        return null;
//    }
//    return user;
//}
//
//function checkFileExists(filepath) {
//    var response = $.ajax({
//        url: filepath,
//        type: 'HEAD',
//        async: false
//    }).status;
//    return (response != "200") ? false : true;
//}
//
///*
// *
// * Logging and Analytics
// *
// */
//function logStartScreen(screenName) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        screenName = 'ADA_' + screenName;
//    }
//    console.log("start screen: " + screenName);
//
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), 'app', 'screenDisplayed', screenName);
//}
//
//function logStartSession() {
//    console.log("start session");
//    jkiosk.startSession();
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), 'app', 'session', 'started');
//
//}
//
//function logEndSession() {
//    console.log("end session");
//    jkiosk.endSession();
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), 'app', 'session', 'ended');
//}
//
//function logEvent(senderId, eventCategory, eventName) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        senderId = 'ADA_' + senderId;
//    }
//
//    //Send everything else to our API
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, eventCategory, eventName);
//
//}
//
//function logInfo(senderId, actionName, message) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        senderId = 'ADA_' + senderId;
//    }
//    jkiosk.logInfo(senderId, actionName, message);
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, 'info', actionName);
//}
//
//function logWarn(senderId, actionName, message) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        senderId = 'ADA_' + senderId;
//    }
//    jkiosk.logWarn(senderId, actionName, message);
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, 'warn', actionName);
//}
//
//function logError(senderId, actionName, message) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        senderId = 'ADA_' + senderId;
//    }
//    jkiosk.logError(senderId, actionName, message);
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, 'error', actionName);
//}
//
//function logFatal(senderId, actionName, message) {
//    //Prefix 'ADA_' if the kiosk is in ADA Mode
//    if (kioskADAMode == true) {
//        senderId = 'ADA_' + senderId;
//    }
//    jkiosk.logFatal(senderId, actionName, message);
//    HigiApi.LogEventAsync(returnSessionData('sessionId'), senderId, 'fatal', actionName);
//}
//
//function displayErrorDialog(onContinueCallback) {
//    $('#higi_error_dialog').load('component_error_dialog.html', function () {
//        errorDialogContinueCallback = onContinueCallback;
//        $('#higi_error_dialog').fadeIn();
//
//        $("#higi_error_dialog video").each(function () {
//            this.volume = getGlobalVolume();
//            registerVideoObject(this);
//        });
//    });
//}
//
///*
// *
// *   Handlers for maintenance screen
// *
// */
//function displayMaintenance() {
//    $('#higi_maintenance').load('maintenance.html', function () {
//        updateResourcesForContainer('#higi_maintenance');
//        $('#higi_maintenance').fadeIn();
//    });
//
//    logFatal('application', 'Maintenance Mode', 'Kiosk has entered maintenance mode');
//}
//
//function hideMaintenance() {
//    $('#higi_maintenance').empty();
//    $('#higi_maintenance').hide();
//}
//
////Takes element id, size attrs and the score
////if score is > 1000 or undefined assumes full circle and drops mask
//var writeGuage = function(id, size, stroke, higiScore, text, fill, playSound) {
//    // remove instances incase this is a reload
//    var archtype = Raphael(document.getElementById(id), size, size);
//    archtype.customAttributes.arc = function(centerX, centerY, value, total, radius){
//    var
//        angle = value / total * 359.99,
//        absAngle = Math.abs(angle),
//        a = Math.PI / 180 * (90 - angle),
//        x = centerX + radius * Math.cos(a),
//        y = centerY - radius * Math.sin(a),
//        sweep = +(value >= 0),
//        path;
//
//        path = [
//            ['M', centerX, centerY - radius],
//            ['A', radius, radius, 0, +(absAngle > 180), sweep, x, y]
//        ];
//
//        return { 'path': path };
//    };
//    //var profileImg = "url(" +$('#' + id).data('profile-img') + ")" || 'none';
//    arc_one = archtype.path().attr({
//        "stroke": "#76c045",
//        "stroke-width": stroke,
//        "stroke-linecap": "round"
//    });
//
//    arc_two = archtype.path().attr({
//        "stroke": "#eae8e8",
//        "stroke-width": stroke,
//        "fill" : (typeof(fill) == "undefined" || fill == "") ? "none" : fill
//    });
//    if(typeof(text) != "undefined" && text != ""){
//     archtype.text(size/2, size/4, text).attr({'fill' : '#76c044' , "font-size": 15 });
//    }
//    //If score not defined, assume fill disc and skip mask.
//    bodyPosition = (typeof(higiScore) != 'undefined') ? higiScore : 1000;
//    var value = Math.round((bodyPosition/999) * 100);
//
//    var init_arc = 0;
//    var arc_animate = function(){
//        init_arc++;
//
//
//        new_arc = arc_one.animate({
//            arc: [size/2, size/2, init_arc, 100, (size - stroke) /2]
//        });
//
//
//        if(init_arc < value){
//            setTimeout(arc_animate, 10);
//
//        }else {
//            //applyTransform();
//
//             $("body").trigger('scoreRendered');
//        }
//    }
//
//    if(bodyPosition != 1000){
//        setTimeout(function(){
//            arc_animate();
//            if(playSound == true){
//                xpBarLevelUpSnd.play();
//            }
//        }, 100);
//    }else{
//         new_arc = arc_one.animate({
//            arc: [size/2, size/2, value, 100, (size - stroke) /2]
//        });
//
//    }
//
//    background_arc = arc_two.toBack().animate({
//        arc: [size/2, size/2, 100, 100, (size - stroke) /2]
//    });
//
//    if(bodyPosition < 1000){
//        arc_three = archtype.path().attr({
//          "stroke": "#eae8e8",
//          "stroke-width": stroke
//        });
//        mask_arc = arc_three.animate({
//          arc: [(size/2), (size/2), -5, 100, (size - stroke) /2]
//        });
//
//    }
//    var applyTransform = function(){
//        arc_one.transform("t" + size + "," + size + "r-180");
//        mask_arc.transform("t" + size + "," + size + "r-180");
//    }
//}
//
//var returnRewardPoints = function(){
//
//    var finalResultsLogin = ( typeof(returnSessionData('lastCheckin')) == "undefined" ) ? true : false;
//
//    var earndItEnabled = returnSessionData('user').earndItEnabled;
//    if(!earndItEnabled) {
//        //user does not have earndit enabled
//        //repeat checkin doesn't matter bc checkins are de-duped
//        var points = new rewardPoints(true, simulateEarnditPointTotal(finalResultsLogin));
//    }
//    else if(typeof(returnSessionData('earnditPoints')) == "undefined"){
//        //user does not have earndit enabled
//        //repeat checkin doesn't matter bc checkins are de-duped
//        var points = new rewardPoints(false, 0);
//    } else if(checkRepeatCheckin()){
//        //does have an earndit enabled
//        //point balance is available
//        //but is doing a second checkin today
//        var points = new rewardPoints(false, (returnSessionData('earnditPoints') ? returnSessionData('earnditPoints') : 0));
//    } else {
//        //does have an earndit enabled not a repeat checkin
//        var points = new rewardPoints(true, returnSessionData('earnditPoints'));
//    }
//    return points;
//}
//
////If earndit points not available, count through
////checkins and create simulated point total
//function simulateEarnditPointTotal (finalResultsLogin){
//    var checkins = HigiApi.GetCheckIns(returnSessionData('user').id);
//    var unDupedCheckins = new Object();
//    checkins.forEach(function(i, index){
//     var dateTime = new Date(parseInt(i.dateTime.replace('/Date(', '').replace(')/', '')));
//     unDupedCheckins [dateTime.getFullYear() + "-" + dateTime.getMonth() + "-" + dateTime.getDate()] = 1;
//    });
//    var checkinTotal = (finalResultsLogin && !checkRepeatCheckin()) ? Object.keys(unDupedCheckins).length - 1 : Object.keys(unDupedCheckins).length;
//    var earnditPoints = checkinTotal * (typeof(returnSessionData("earndItPointsForCheckin")) != "undefined" ? returnSessionData("earndItPointsForCheckin") : appSettings["kiosk.earndIt.earndItPointsForCheckin"]);
//    return earnditPoints;
//}
//
//
////Compare current date with
////last checkin, if same day
////skip point animation
//function checkRepeatCheckin(){
//    if(typeof(returnSessionData('lastCheckin')) != "undefined"){
//    var a = new Date(parseInt(returnSessionData('lastCheckin').dateTime.replace('/Date(', '').replace(')/', '')));
//    var b = new Date();
//    var msDateA = Date.UTC(a.getFullYear(), a.getMonth()+1, a.getDate());
//    var msDateB = Date.UTC(b.getFullYear(), b.getMonth()+1, b.getDate());
//    return (parseFloat(msDateA) == parseFloat(msDateB));
//    } else {
//        return false;
//    }
//}
//
//function rewardPoints(available, value) {
//    return {
//        available : available,
//        value: value,
//        formatted: value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
//    };
//}
//
//function checkPediatricMode(){
//    return (returnSessionData('birthdate') && getAge(returnSessionData('birthdate')) < 13);
//}
//
//
//
//$.event.special.tripleclick = {
//    setup: function (data, namespaces) {
//        var elem = this, $elem = jQuery(elem);
//        $elem.bind('click', jQuery.event.special.tripleclick.handler);
//    },
//
//    teardown: function (namespaces) {
//        var elem = this, $elem = jQuery(elem);
//        $elem.unbind('click', jQuery.event.special.tripleclick.handler)
//    },
//
//    handler: function (event) {
//        var elem = this;
//        var $elem = jQuery(elem);
//        var clicks = $elem.data('clicks') || 0;
//        var firstClickTime = $elem.data('firstclicktime');
//        clicks += 1;
//
//        if (firstClickTime == undefined || firstClickTime == 0) {
//            firstClickTime = new Date().getTime();
//        }
//
//        if (clicks === 3) {
//            var timestampNow = new Date().getTime();
//
//            // If time between first and last click is lass than 5secs, we fire tripleclick event :
//            if (timestampNow - firstClickTime <= 2000) {
//                // Set event type to 'tripleclick'
//                event.type = 'tripleclick';
//                // Let jQuery handle the triggering of 'tripleclick' event handlers
//                console.log(this);
//                jQuery.event.dispatch.apply(this, arguments);
//            }
//            clicks = 0;
//            firstClickTime = 0;
//        }
//        $elem.data('clicks', clicks);
//        $elem.data('firstclicktime', firstClickTime);
//    }
//};