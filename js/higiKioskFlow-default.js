/*
 * Method that accepts as input a slide screen name and returns an object that
 * defines the next/previous screen names based on defined logic.
 */
var slideFinal = "slide_finalresults_points";

function getSlideNavObject(objectName) {
    var higi_slide_nav_object = new Object();

    // defaults
    higi_slide_nav_object["nextButtonText"] = "global.next";
    higi_slide_nav_object["prevButtonText"] = "global.back";
    higi_slide_nav_object["skipButtonText"] = "global.skip";

    // default function that gets triggered by button press
    higi_slide_nav_object["nextButtonAction"] = function () {
        higi_forward();
    }

    higi_slide_nav_object["skipButtonAction"] = function () {
        higi_forward();
    }

    higi_slide_nav_object["prevButtonAction"] = function () {
        higi_back();
    }

    if (objectName == null || objectName == "") {
        // assume slide_gender01 is first
        higi_slide_nav_object["nextObjectName"] = "slide_gender01";
        higi_slide_nav_object["prevObjectName"] = null;
    }

    //This will override the previous actions and push you to the appropriate slides if
    //You're a) not logged in or b)are logged in but without the user data
    if ((returnSessionData('logged_in') != true) ||
        (returnSessionData('logged_in') == true &&
            (returnSessionData('gender') == undefined || returnSessionData('height') == undefined || returnSessionData('birthdate') == undefined)
            )
        ) {
        higi_slide_nav_object["nextObjectName"] = "slide_gender01";
        getSlideNavObject_AboutYou(higi_slide_nav_object, objectName);
    }


    getSlideNavObject_AboutYou(higi_slide_nav_object, objectName);
    getSlideNavObject_BloodPressure(higi_slide_nav_object, objectName);
    getSlideNavObject_Weight(higi_slide_nav_object, objectName);

    if (objectName == slideFinal) {
        higi_slide_nav_object["nextObjectName"] = "slide_comebacksoon01";
        higi_slide_nav_object["prevObjectName"] = "slide_weight03";
    }

    return higi_slide_nav_object;
}

function getSlideNavObject_AboutYou(higi_slide_nav_object, objectName) {
    if (objectName == "slide_gender01") {
        if (returnSessionData('fromPage') == "slide_aboutyou01") {
            higi_slide_nav_object["nextObjectName"] = "slide_aboutyou01";
            higi_slide_nav_object["prevObjectName"] = "slide_aboutyou01";
        }
        else if (returnSessionData('toPage') != null) {
            higi_slide_nav_object["nextObjectName"] = returnSessionData('toPage');
            higi_slide_nav_object["prevObjectName"] = "";
        }
        else {
            higi_slide_nav_object["nextObjectName"] = "slide_height01";
            higi_slide_nav_object["prevObjectName"] = "";
        }
    }

    if (objectName == "slide_height01") {
        if (returnSessionData('fromPage') == "slide_aboutyou01") {
            higi_slide_nav_object["nextObjectName"] = "slide_aboutyou01";
            higi_slide_nav_object["prevObjectName"] = "slide_aboutyou01";
        }
        else if (returnSessionData('toPage') != null) {
            higi_slide_nav_object["nextObjectName"] = returnSessionData('toPage');
            higi_slide_nav_object["prevObjectName"] = "slide_gender01";
        }
        else {
            higi_slide_nav_object["nextObjectName"] = "slide_age01";
            higi_slide_nav_object["prevObjectName"] = "slide_gender01";
        }
    }

    if (objectName == "slide_age01") {
        if (returnSessionData('fromPage') == "slide_aboutyou01") {
            higi_slide_nav_object["nextObjectName"] = "slide_aboutyou01";
            higi_slide_nav_object["prevObjectName"] = "slide_aboutyou01";
        }
        else if (returnSessionData('toPage') != null) {
            higi_slide_nav_object["nextObjectName"] = returnSessionData('toPage');
            higi_slide_nav_object["prevObjectName"] = "slide_height01";
        }
        else {
            higi_slide_nav_object["nextObjectName"] = "slide_aboutyou01";
            higi_slide_nav_object["prevObjectName"] = "slide_height01";
        }
    }

    if (objectName == "slide_aboutyou01") {
        higi_slide_nav_object["nextButtonText"] = "global.confirm";
        if (returnSessionData('toPage') == "slide_gender01") {
            higi_slide_nav_object["prevObjectName"] = "slide_gender01";
        }
        else if (returnSessionData('toPage') == "slide_height01") {
            higi_slide_nav_object["prevObjectName"] = "slide_height01";
        }
        else if (returnSessionData('toPage') == "slide_age01") {
            higi_slide_nav_object["prevObjectName"] = "slide_age01";
        }
        else {
            higi_slide_nav_object["prevObjectName"] = "slide_age01";
        }

        if (returnSessionData('test_bp_selected') == true) {
            higi_slide_nav_object["nextObjectName"] = "slide_bloodpressure01";
        }
        else if (returnSessionData('test_weight_selected') == true) {
            higi_slide_nav_object["nextObjectName"] = "slide_weight01";
        }
//        else if (returnSessionData('test_bmc_selected') == true) {
//            //BMC slide
//        }
        else {
            higi_slide_nav_object["nextObjectName"] = slideFinal;
        }
    }
    return higi_slide_nav_object;
}

function getSlideNavObject_Weight(higi_slide_nav_object, objectName) {

    if (objectName == "slide_weight01") {
        higi_slide_nav_object["nextButtonText"] = "global.begin";
        higi_slide_nav_object["nextObjectName"] = "slide_weight02";
        higi_slide_nav_object["prevObjectName"] = "slide_bloodpressure03";
    }

    if (objectName == "slide_weight02") {
        higi_slide_nav_object["nextObjectName"] = "slide_weight03";
        higi_slide_nav_object["prevObjectName"] = "slide_weight01";

        higi_slide_nav_object["prevButtonText"] = "global.redo";
        higi_slide_nav_object["prevButtonAction"] = function () {
            leftSlideOut("#higi_control_left_btn");
            rightSlideOut("#higi_control_right_btn");
            startWeightScale();
        }
    }

    if (objectName == "slide_weight03") {
//        if (returnSessionData('test_bmc_selected') == true ){
//            higi_slide_nav_object["nextObjectName"] = "slide_weight01";
//        }
//        else {
        higi_slide_nav_object["nextObjectName"] = slideFinal;
//        }

        higi_slide_nav_object["prevObjectName"] = "slide_weight01";
        higi_slide_nav_object["prevButtonText"] = "global.redo";
        higi_slide_nav_object["nextButtonText"] = "global.continue";
    }
    return higi_slide_nav_object;
}

function getSlideNavObject_BloodPressure(higi_slide_nav_object, objectName) {
    if (objectName == "slide_bloodpressure01") {
        higi_slide_nav_object["nextButtonText"] = "global.begin";
        higi_slide_nav_object["nextObjectName"] = "slide_bloodpressure02";
        higi_slide_nav_object["prevObjectName"] = "slide_aboutyou01";
    }

    if (objectName == "slide_bloodpressure02") {
        higi_slide_nav_object["nextObjectName"] = "slide_bloodpressure03";
        higi_slide_nav_object["prevObjectName"] = "slide_bloodpressure01";
        higi_slide_nav_object["prevButtonText"] = "global.redo";
        higi_slide_nav_object["prevButtonAction"] = function () {
            leftSlideOut("#higi_control_left_btn");
            rightSlideOut("#higi_control_right_btn");
            if (!returnSessionData('bpStoppedManually')) {
                startBP();
            }
            else {
                higi_back();
            }
        }
    }

    if (objectName == "slide_bloodpressure03") {

        if (returnSessionData('test_weight_selected') == true) {
            higi_slide_nav_object["nextObjectName"] = "slide_weight01";
        }
        else {
            higi_slide_nav_object["nextObjectName"] = slideFinal;
        }

        higi_slide_nav_object["prevObjectName"] = "slide_bloodpressure01";

        higi_slide_nav_object["prevButtonText"] = "global.redo";
        higi_slide_nav_object["nextButtonText"] = "global.continue";
    }
    return higi_slide_nav_object;
}