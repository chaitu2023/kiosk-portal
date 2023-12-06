var flowModule = angular.module("higiKioskUi");

/**
 * The `flowModule` service that takes the current slide and returns
 * the next and previous links for the kiosk.
 * @param {*} message Message to be logged.
 */
flowModule.factory('HigiKioskFlow', ['$http' , '$rootScope', 'HigiKioskUserService', 'JkioskService', 'HigiKioskStorageService', '$timeout', '$interval', 'HigiKioskTesting', '$routeParams', function($http, $rootScope, HigiKioskUserService, JkioskService, HigiKioskStorageService, $timeout, $interval, HigiKioskTesting, $routeParams) {
    return {

//Sumithra Code starts
nextTest: function(mode,currenttest) {
 hardwarelist = [];
if($rootScope.invasiveEnable == true  && $rootScope.ivtServerConnection == true){
    testorder = ["ivt", "Blood Pressure", "Weight Scale", "Body Composition", "ECG", "SPo2","temp"];    
} else {
    testorder = ["Blood Pressure", "Weight Scale", "Body Composition", "ECG", "SPo2","temp"];
}


 if($rootScope.hardwareAvailability["FullBodyCompositionAnalyser"]){
  locationmap = {
    "ivt" : "#/invasiveInstruction/forward",
    "Blood Pressure" : "#/weight1/forward", 
    "Weight Scale": "#/fullbodybmc1/forward",
    "Body Composition": "#/zugecgmode/forward", 
    "ECG": "#/spotwo1/forward", 
    "SPo2": "#/temp1/forward",
    "temperature": "#/finish/forward"
    };  
}
else {
    locationmap = {
    "ivt" : "#/invasiveInstruction/forward",
    "Blood Pressure" : "#/weight1/forward", 
    "Weight Scale": "#/weight4/forward", 
    "Body Composition": "#/zugecgmode/forward", 
    "ECG": "#/spotwo1/forward", 
    "SPo2": "#/temp1/forward",
    "temperature": "#/finish/forward"
    };
}
//alert("Current test   "+currenttest+"   Order   "+testorder.indexOf(currenttest));

if (!$rootScope.hardwareAvailability["SwitchHardware"] && $rootScope.giveMeKioskModel == "a3" && $rootScope.hardwareAvailability["Body Composition"]) {
    testdependencies = {
         "Body Composition": ["Weight Scale"],
         "ECG": ["SwitchHardware"]
    };
}
else{
    testdependencies = {
        "Body Composition": ["Weight Scale", "SwitchHardware"],
        "ECG": ["SwitchHardware"]
    };
}

for(var i in $rootScope.hardwareAvailability){
    hardwarelist.push([i, $rootScope.hardwareAvailability [i]]);
}
var trueVitals = hardwarelist.filter(([, e]) => e).map(([e]) => e);
//alert("Truevitals   "+trueVitals);
if($rootScope.invasiveEnable == true  && $rootScope.ivtServerConnection == true){
    trueVitals[trueVitals.length-1] = 'ivt';
}
HigiKioskStorageService.saveSessionData('availabletestmodules', trueVitals);
for(var i in trueVitals){
  if(trueVitals[i] == "FullBodyCompositionAnalyser"){
    trueVitals[i] = "Body Composition";
  }
}
  if(mode == "bpw" && currenttest == undefined && trueVitals.includes("ivt")  && $rootScope.ivtServerConnection == true && $rootScope.invasiveEnable == true) {
    return "#/invasiveInstruction/forward";
  }
  if(mode == "bpw" && currenttest == undefined && trueVitals.includes("Blood Pressure")) {
    return "#/bloodpressure1/forward";
  }
  else if (mode == "bpw") {
    var currenttestindex = (testorder.indexOf(currenttest));
    console.log("Current test index in TestOrder Array   "+currenttestindex);
    var nextlocation;
    for (var i = currenttestindex+1; i <= testorder.length; i++) {
      
      if (trueVitals.includes(testorder[i])) {
        console.log("True vital is in TestOrder Position   "+trueVitals.includes(testorder[i]))
        var missingDependency = false;
        if (testdependencies[testorder[i]]) {
          var dependencies = testdependencies[testorder[i]];
          console.log("Dependencies   "+dependencies);
          for (var j = 0; j < dependencies.length; j++) {
            if (!trueVitals.includes(dependencies[j])) {
              missingDependency = true;
              console.log("Missing dependency: " + dependencies[j]);
              break; // j loop
            }
          }
        }
        
        if (missingDependency) {
          continue; // i loop
        }
        
        return locationmap[testorder[i-1]];
      }
    }   
    if (nextlocation == undefined) {
      console.log("Next location not found");
      return "#/finish/forward";
    }
  }
  else {

  }
},

UserSelectNextTest: function(){
    var mode=  HigiKioskStorageService.returnSessionData('current_mode');
    var idx = $rootScope.selectedVital.indexOf(mode);
    var nextSlide = "";
    if(idx == $rootScope.selectedVital.length -1){
       nextSlide = "#/finish/forward";
    } else {
        $rootScope.mode = $rootScope.selectedVital[idx+1];
        HigiKioskStorageService.saveSessionData('current_mode', $rootScope.mode);
        //setTimeout(function() {
            if($rootScope.mode == "w") {
                nextSlide = "#/weight1/forward";
            } else if ($rootScope.mode == "bp") {
                 nextSlide = "#/bloodpressure1/forward";
            } else if ($rootScope.mode == "ekg") {
                nextSlide = "#/zugecgmode/forward";
            } else if ($rootScope.mode == "bmc") {
                 nextSlide = "#/weight1/forward";
            } else if ($rootScope.mode == "spo2") {
                 nextSlide = "#/spotwo1/forward";
            } else if ($rootScope.mode == "temp") {
                 nextSlide = "#/temp1/forward";
            } else if ($rootScope.mode == "ivt") {
                 nextSlide = "#/invasiveInstruction/forward";
            }
        //}, 1000);
    }
    return nextSlide;
},
//Sumithra code ends

        slideLinks: function (current, scope) {
            console.log("scope object" + scope);
            //changes starts
           
            if(scope == "bp" || scope=="ekg" || scope=="bmc" || scope=="w" || scope=="bpw" || scope == "spo2" || scope=="temp" || scope=="ivt" || scope=="TC")
            {
                var mode = scope;
            }
            else
            {
                var mode = scope.mode;
            }
            
            //changes end
            //this.setGlobalNav(current, scope.$parent);
            this.setGlobalNav(current);
            if(HigiKioskStorageService.returnSessionData('logged_in')){
                 console.log("logged_in mode");
                //Logged in BP only mode
                var bpOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous:  {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.confirm', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                    'HigiKioskBpController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}}

                };

            } else {
                //Not loogged in BP only mode
                var bpOnlyMode = { // with height flow
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous:  {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.confirm', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                    'HigiKioskBpController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}}
                };
            }


            if(!$rootScope.hardwareAvailability["Body Composition"] && !$rootScope.hardwareAvailability["FullBodyCompositionAnalyser"]){
            console.log("body Composition if part");

                var bpAndWeightMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                  
                      'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/zugecgmode/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                        //'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                        //'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/ecg1/back'}},
                    
                    'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                    'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/spotwo1/forward'}, previous: null},
                    'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                    'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}},


                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'},  previous: null},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}}
                };

                var weightOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}}
                };
                /* Commented for Marks ECG
                 var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/ecg1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                    'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/ecg1/back'}},
                };
                */

                var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/zugecgmode/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                    'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/finish/forward'}, previous: null},
                    'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                    'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}}
                };

                 var bmcMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.continue', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };
                var spo2Mode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': { next: {label: 'global.next', link: '#/spotwo1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'} },
                    'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                    'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                    'HigiKioskspo2Controller3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}}
                };
                var tempMode = {// without hardware thermometer readyness wait page
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/temp1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    // 'HigiKioskTempCountDownController': {next: {label: 'global.next', link: '#/temp1/forward'}, previous: null},
                    'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                    'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                    'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                };
                var ivtMode = {// without hardware thermometer readyness wait page
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/invasiveInstruction/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskInvasiveInstructionController': {next: {label: 'global.next', link: '#/invasiveProcess/forward'}, previous: null},
                    'HigiKioskInvasiveProcessController': {next: {label: 'global.next', link: '#/invasiveResult/forward'}, previous: null},
                    'HigiKioskInvasiveResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/invasiveInstruction/back'}}
                };
                /*var tempMode = {// with hardware thermometer readyness wait page
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/temp0/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskTempController0': {next: {label: 'global.next', link: '#/temp1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                    'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                    'HigiKioskTempController3': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp0/back'}}
                }; */


            } else {
                var bpAndWeightMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                    'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: null},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };

                var weightOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: null},
                    'HigiKioskWeightController5': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };
                
                var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/zugecgmode/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                    'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/finish/forward'}, previous: null},
                    'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                    'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}}
                };

                 var bmcMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.continue', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };
                var spo2Mode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': { next: {label: 'global.next', link: '#/spotwo1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'} },
                    'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                    'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                    'HigiKioskspo2Controller3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}}
                };
                var tempMode = {// without hardware thermometer readyness wait page
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/temp1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    // 'HigiKioskTempCountDownController': {next: {label: 'global.next', link: '#/temp1/forward'}, previous: null},
                    'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                    'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                    'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                };
                var ivtMode = {// without hardware thermometer readyness wait page
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/invasiveInstruction/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskInvasiveInstructionController': {next: {label: 'global.next', link: '#/invasiveProcess/forward'}, previous: null},
                    'HigiKioskInvasiveProcessController': {next: {label: 'global.next', link: '#/invasiveResult/forward'}, previous: null},
                    'HigiKioskInvasiveResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/invasiveInstruction/back'}}
                };
            }

            if($rootScope.hardwareAvailability["ECG"] != true){
               
                if ($rootScope.invasiveEnable  && $rootScope.ivtServerConnection == true) {
                    var bpAndWeightMode = {
                        'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                        'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                        'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/invasiveInstruction/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                        'HigiKioskInvasiveInstructionController': {next: {label: 'global.next', link: '#/invasiveProcess/forward'}, previous: null},
                        'HigiKioskInvasiveProcessController': {next: {label: 'global.next', link: '#/invasiveResult/forward'}, previous: null},
                        'HigiKioskInvasiveResultController': {next: {label: 'global.finalResult', link: '#/bloodpressure1/forward'}, previous: {label: 'global.redo', link: '#/invasiveInstruction/back'}},
                        'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                        'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                        'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/bloodpressure1/back'}},
                        'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                        'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                        'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}},
                        'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                        'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                        'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                        // 'HigiKioskTempCountDownController': {next: {label: 'global.begin', link: '#/temp1/forward'}, previous: null},
                        'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                        'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                        'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                    };
                } 
                else {
                    var bpAndWeightMode = {
                        'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                        'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                        'HigiKioskOnboardingController2': {next: {label: 'global.begin', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                        'HigiKioskBpController1': {next: {label: 'global.next', link: '#/bloodpressure2/forward'}, previous: null},
                        'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                        'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/bloodpressure1/back'}},
                        'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                        'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                        'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}},
                        'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                        'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                        'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                        // 'HigiKioskTempCountDownController': {next: {label: 'global.begin', link: '#/temp1/forward'}, previous: null},
                        'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                        'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                        'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                    };
                }
/*
                 var bpAndWeightMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                    'HigiKioskBpController3': {next: {label: 'global.next', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/bloodpressure1/back'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };
*/
                var bmcOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
               };

                var weightOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' ,  type: 'nobms'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}}
                };
                /* Commented for Marks ECG
                var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/ecg1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                    'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/ecg1/back'}},
                };
                */
                   var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/zugecgmode/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                    'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/finish/forward'}, previous: null},
                    'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                    'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}}
                };
            } else {
                
                
                    /*with ecg flow*/
                    /*var bpAndWeightMode = {
                        'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                        'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                        'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                        'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                        'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                        'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/ecg1/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                        'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                        'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/ecg1/back'}},
                        'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                        'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                        'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}},
                        'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                        'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                        'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                        'HigiKioskTempController1': {next: {label: 'global.begin', link: '#/temp2/forward'}, previous: null},
                        'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                        'HigiKioskTempController3': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                    };*/
                    /*without ecg flow*/
                console.log($rootScope.invasiveEnable);
                if ($rootScope.invasiveEnable  && $rootScope.ivtServerConnection == true) {
                    var bpAndWeightMode = {
                        'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                        'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                        'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/invasiveInstruction/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                        'HigiKioskInvasiveInstructionController': {next: {label: 'global.next', link: '#/invasiveProcess/forward'}, previous: null},
                        'HigiKioskInvasiveProcessController': {next: {label: 'global.next', link: '#/invasiveResult/forward'}, previous: null},
                        'HigiKioskInvasiveResultController': {next: {label: 'global.finalResult', link: '#/bloodpressure1/forward'}, previous: {label: 'global.redo', link: '#/invasiveInstruction/back'}},
                        'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                        'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                        'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/weight1/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                        //'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                        //'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/ecg1/back'}},
                        'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                        'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                        'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/zugecgmode/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}},
                        'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                        'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/spotwo1/forward'}, previous: null},
                        'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                        'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}},


                        
                        'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                        'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                        'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                        // 'HigiKioskTempCountDownController': {next: {label: 'global.begin', link: '#/temp1/forward'}, previous: null},
                        'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                        'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                        'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                    };
                } 
                else {
                    var bpAndWeightMode = {
                        'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                        'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                        'HigiKioskOnboardingController2': {next: {label: 'global.begin', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                        'HigiKioskBpController1': {next: {label: 'global.next', link: '#/bloodpressure2/forward'}, previous: null},
                        'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                        'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/weight1/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                        //'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                        //'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/weight1/forward'}, previous:{label: 'global.redo', link: '#/ecg1/back'}},
                        'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                        'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                        'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                        'HigiKioskWeightController5': {next: {label: 'global.continue', link: '#/zugecgmode/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}},
                        'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                        'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/spotwo1/forward'}, previous: null},
                        'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                        'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}},


                        
                        'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null, secondnext: {label: 'global.begin', link: '#/spotwo3/forward'} },
                        'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                        'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                        // 'HigiKioskTempCountDownController': {next: {label: 'global.begin', link: '#/temp1/forward'}, previous: null},
                        'HigiKioskTempController1': {next: {label: 'global.next', link: '#/temp2/forward'}, previous: null},
                        'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                        'HigiKioskTempController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}
                    };
                }
                
                var weightOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' ,  type: 'bms'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                };
                

                var bmcOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward' }, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/weight4/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController4': {next: {label: 'global.continue', link: '#/weight5/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskWeightController5': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/weight4/back'}}
                };
                /* Commented for Marks ECG
                var ekgOnlyMode = {
                   'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/ecg1/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskEcgController': {next: {label: 'global.next', link: '#/ecg_graph/forward'}, previous: null},
                    'HigiKioskEcgGraphController': {next: {label: 'global.next', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/ecg1/back'}},
                };   
                */
                   var ekgOnlyMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/zugecgmode/forward'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}},
                    'HigiKioskZUGEcgModeController': {next: {label: 'global.next', link: '#/zugecginstruction/forward'}, previous: null},
                    'HigiKioskZUGEcgInstructionController': {next: {label: 'global.next', link: '#/zugecgprogression/forward'}, secondnext: {label: 'global.next', link: '#/zugecgresult/forward'}, skipNext: {label: 'global.next', link: '#/finish/forward'}, previous: null},
                    'HigiKioskZUGEcgProgressionController': {next: {label: 'global.next',link: '#/zugecgresult/forward'}, previous: null},
                    'HigiKioskZUGEcgInterimResultController': {next: {label: 'global.finalResult', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/zugecgmode/back'}}
                };           
                
            }
            //spo2 and temp complete test flow wrote by deepak raja. please don't delete the code. 
                /* var bpAndWeightMode = {
                    'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                    'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/bloodpressure1/forward'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                    'HigiKioskBpController1': {next: {label: 'global.begin', link: '#/bloodpressure2/forward'}, previous: null},
                    'HigiKioskBpController2': {next: {label: 'global.next', link: '#/bloodpressure3/forward'}, previous: null},
                    'HigiKioskBpController3': {next: {label: 'global.continue', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}},
                    'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/weight1/forward'},  previous: null},
                    'HigiKioskWeightController1': {next: {label: 'global.begin', link: '#/weight2/forward'}, previous: null},
                    'HigiKioskWeightController2': {next: {label: 'global.next', link: '#/weight3/forward'}, previous: null},
                    'HigiKioskWeightController3': {next: {label: 'global.continue', link: '#/spotwo1/forward'}, previous: {label: 'global.redo', link: '#/weight1/back'}},
                    'HigiKioskspo2Controller1': {next: {label: 'global.begin', link: '#/spotwo2/forward'}, previous: null},
                    'HigiKioskspo2Controller2': {next: {label: 'global.next', link: '#/spotwo3/forward'}, previous: null},
                    'HigiKioskspo2Controller3': {next: {label: 'global.continue', link: '#/temp1/forward'}, previous: {label: 'global.redo', link: '#/spotwo1/back'}},
                    'HigiKioskTempController1': {next: {label: 'global.begin', link: '#/temp2/forward'}, previous: null},
                    'HigiKioskTempController2': {next: {label: 'global.next', link: '#/temp3/forward'}, previous: null},
                    'HigiKioskTempController3': {next: {label: 'global.continue', link: '#/finish/forward'}, previous: {label: 'global.redo', link: '#/temp1/back'}}

                };
                */

                var tcMode = {
                  'HigiKioskOnboardingController1': {next: {label: 'global.next', link: '#/onboarding3/forward/enter'}, previous: null},
                  'HigiKioskOnboardingController3': {next: {label: 'global.next', link: '#/onboarding2/forward/enter'}, previous: {label: 'global.back', link: '#/onboarding1/back/edit'}},
                  'HigiKioskOnboardingController2': {next: {label: 'global.next', link: '#/ihl-teleconsultation-main-dashboard'}, previous: {label: 'global.back', link: '#/onboarding3/back/edit'}}
                };


            if (mode == 'bp') {
                return bpOnlyMode[current];
            }
            else if (mode == 'bpw') {
                //Determine if height onboarding needed
                //Logged in, on HigiKioskBpController3, has height, skip height question
                if(HigiKioskStorageService.returnSessionData('height') != undefined && current == "HigiKioskBpController3"){
                   // return {next: {label: 'global.continue', link: '#/weight1/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}} // without ecg for bmc
                  //  return {next: {label: 'global.continue', link: '#/zugecgmode/forward'}, previous: {label: 'global.redo', link: '#/bloodpressure1/back'}} // with ecg and bmc
                
  return bpAndWeightMode[current];
                } else {
                    return bpAndWeightMode[current];
                }

            }
            else if (mode == 'w') {
                return weightOnlyMode[current];
            }
            else if (mode == 'ekg') {
                return ekgOnlyMode[current];
            }
            else if (mode == 'bmc') {
                
                return bmcMode[current];
            }
            else if (mode == 'spo2') {
                return spo2Mode[current];
            }
            else if (mode == 'temp') {
                return tempMode[current];
            }
            else if (mode == 'ivt') {
                return ivtMode[current];
            }
            else if (mode == 'TC') {
              return tcMode[current];
            }

        },

       setGlobalNav : function(current){
            //Set testing
            //Add testing var to path
            if($routeParams.testing == "testing" || $rootScope.testingMode){
                $rootScope.testingMode = true;
            }

            /* HIDE E-SANJEEVANI BUTTON */
            if (current != 'HigiKioskWelcomeController')
                $rootScope.enableESanjeevani = false;

            //Set higiPageName for reporting
            HigiKioskStorageService.saveSessionData('higiPageName', current.replace("Controller" , ""));

            $rootScope.newUserNoLastCheckinVisible = false;
            $rootScope.apiNotAvailableTipVisible = false;
            $rootScope.onWelcomeScreen = false;
            $rootScope.homeButtonShow = false;
            $rootScope.welcomeLangSelectClass = "";
            $rootScope.isVisibleLogo = false;
            $rootScope.isVisibleLanguageButton = false;
            $rootScope.telemedicineButtonAvailable = false;
            $rootScope.isVisibleLanguage = false;
            $rootScope.selectLangLabel = false;
            $rootScope.isVisibleAudio = false;
            $rootScope.isVisibleExit = false;
            $rootScope.isVisibleLogin = false;
            $rootScope.isVisibleReg = false;
            $rootScope.selectLangLabel = false;
            $rootScope.isVisibleProfileImage = false;
            $rootScope.welcomeLangSelectClass = "";
            $rootScope.disableExitLogout = false;
            //$rootScope.isVisibleProfileImage = (HigiKioskStorageService.returnSessionData('logged_in') != undefined) ? HigiKioskStorageService.returnSessionData('logged_in') : false;
           //  if($rootScope.isVisibleProfileImage) {
           //     $(".higi_login_btn_profile").show(); 
           // } else {
           //     $(".higi_login_btn_profile").hide(); 
           // }

            if(current == "HigiKioskWelcomeController")
            {
                //welcome screen
                $rootScope.onWelcomeScreen = true;
                $rootScope.isVisibleLanguageButton = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.telemedicineButtonAvailable = true;
                $rootScope.selectLangLabel = true;
                $rootScope.welcomeLangSelectClass = "welcome";
                $rootScope.isVisibleLogin = false;
                $rootScope.isVisibleReg = false;
                $rootScope.isVisibleExit = false;
                $rootScope.showExitButton = false;
                $rootScope.isVisibleLogo = true;                
                $rootScope.triggeredDoctorGem3s = true; // stop gem3s doctor 5 sec set interval call back
                $rootScope.isVisibleProfileImage = false;
                $rootScope.homeButtonShow = false;
            }
            else if(current == "HigiKioskBpController1" ||  current=="HigiKioskZUGEcgInterimResultController" || current == "HigiKioskspo2Controller3" || current == "HigiKioskTempController0" || current == "HigiKioskTempController3")
            {
                //welcome screen
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                //document.getElementById("splash_logo").style.display = "none";
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
             else if(current == "HigiKioskspo2Controller1" || current == "HigiKioskTempController1" || current == "HigiKioskZUGEcgInstructionController"){
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.homeButtonShow = false;
              //  $(".higi_login_btn_profile").hide();
            }
            else  if(current == "HigiKioskBpController2" || current == "IHLHPodFullBodyBMCController" || current == "HigiKioskspo2Controller2" || current == "HigiKioskTempController2")
            {
                //bp screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskBpController3")
            {
                //bp screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "IHLHPodFullBodyBMCResultController")
            {
                //bp screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskZUGEcgModeController")
            {
                //ecg screens
                //document.getElementById("splash_logo").style.display = "none";
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskWeightController1")
            {
                //weight screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskWeightController2" || current == "HigiKioskEcgGraphController" || current == "HigiKioskEcgController")
            {
                //weight screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskWeightController4")
            {
                //weight screens
               /* $('.higi_top_nav_ng').hide();*/
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskWeightController5")
            {
                //weight screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
			else  if(current == "HigiKioskInvasiveInstructionController")
            {
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskInvasiveProcessController")
            {
                $('.higi_top_nav_ng').hide();
            }
            else  if(current == "HigiKioskInvasiveResultController")
            {
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "ivtWarningModalBox")
            {
                $('.higi_top_nav_ng').hide();
                // $rootScope.isVisibleLogo = true;
                // $rootScope.isVisibleAudio = true;
                // $rootScope.isVisibleExit = true;
                // $rootScope.showExitButton = true;
                // $rootScope.disableExitLogout = true;
                // $rootScope.isVisibleLanguageButton = false;
                // $rootScope.telemedicineButtonAvailable = false;
                // $rootScope.isVisibleProfileImage = true;
                // $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskWeightController3")
            {
                //weight screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskZUGEcgProgressionController")
            {
                //weight screens
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
            }
            else  if(current == "HigiKioskOnboardingController1")
            {
                //Onboarding
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
                $rootScope.disableExitLogout = false;
            }
            else  if(current == "HigiKioskOnboardingController2") {
                
                //Onboarding
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
                $rootScope.disableExitLogout = false;
            }
            else  if(current == "HigiKioskOnboardingController3")
            {
                //Onboarding
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.homeButtonShow = false;
                $rootScope.disableExitLogout = false;
            }
            else  if(current == "HigiKioskOnboardingController4")
            {
                //Onboarding
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;  
                $rootScope.isVisibleProfileImage = true; 
                $rootScope.homeButtonShow = false;  
                $rootScope.disableExitLogout = false;        
            }
            else  if(current == "HigiKioskFinishController")
            {
                $('.higi_top_nav_ng').show();
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.disableExitLogout = false;
                $rootScope.isVisibleProfileImage = true;
                $rootScope.isVisibleLanguageButton = false;
                if($rootScope.telemediSetting && (HigiKioskStorageService.returnSessionData('logged_in'))) {
                    $rootScope.telemedicineButtonAvailable = true;
                    $rootScope.homeButtonShow = false;
                }

                $rootScope.homeButtonShow = true;

                //$rootScope.isVisibleProfileImage = (HigiKioskStorageService.returnSessionData('logged_in')) ? true : false;
                $rootScope.isVisibleLogin = false;
                $rootScope.isVisibleReg = false;
                //$rootScope.isVisibleProfileImage = false;
                //  if(HigiKioskStorageService.returnSessionData('logged_in')){          
                //        $(".higi_login_btn_profile").show(); 
                // } else {
                //        $(".higi_login_btn_profile").hide(); 
                // }
                

            } else if(current == "telemedicineprescriptioncontroller"){
                $('.higi_top_nav_ng').hide();
                $("#exitButtonOnTheTop").hide();
                $("#exitButtonOnTheTop").hide();
                $rootScope.triggeredDoctorGem3s = true; // stop gem3s doctor 5 sec set interval call back
                $rootScope.isVisibleAudio = false;
                $rootScope.isVisibleExit = false;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.telemedicineButtonAvailable = false;
                //document.getElementById("splash_logo").style.display = "none";

            } else if(current == "IHLHPodDoctorListController" || current == "IHLHPodSpeciaListController") {
                //TeleMed Specialists screen
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.selectLangLabel = false;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.isVisibleLogo = false;
               $rootScope.telemedicineButtonAvailable = false;
                //document.getElementById("splash_logo").style.display = "none";
            }else if(current == "HigiKioskTempCountDownController") {
                $rootScope.isVisibleLogo = true;
                $rootScope.isVisibleAudio = true;
                $rootScope.isVisibleExit = true;
                $rootScope.showExitButton = true;
                $rootScope.isVisibleLanguageButton = false;
                $rootScope.selectLangLabel = false;
                $rootScope.telemedicineButtonAvailable = false;
            }else {
               $rootScope.isVisibleLanguageButton = false;
               $rootScope.telemedicineButtonAvailable = false;
            }
            if($routeParams.testing == "testing" || $rootScope.testingMode){
                $rootScope.testingMode = true;
                HigiKioskTesting.setTestingData(current);
            }
            JkioskService.logStartScreen(HigiKioskStorageService.returnSessionData('higiPageName'));



        },

        higiExit: function () {
            /*
             * Performs exit actions
             */

            //Prevent audio from playing after coppa fail
            //$rootScope.audio.mute = true;

            exitSessionInProgress = true;
            currentlyPlayingMedia = null;
            //clearAllTimeouts();
            //higi_closeKeyboardDialog();
            JkioskService.endSession();
            HigiKioskUserService.saveUnauthData();

            JkioskService.checkForMaintenance();

        }



    }

}]);

