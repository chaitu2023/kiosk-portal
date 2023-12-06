higiKioskControllers.controller('HigiKioskZUGEcgInterimResultController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', function ($scope, $routeParams, $rootScope, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService) {

  $scope.ecgLeadAVLMaximumValue = 0;
  $scope.ecgLeadAVFMaximumValue = 0;
  $scope.ecgLeadAVRMaximumValue = 0;
  $scope.ecgLeadIMaximumValue = 0;
  $scope.ecgLeadIIMaximumValue = 0;
  $scope.ecgLeadIIIMaximumValue = 0;
  $scope.ecgLeadAVFMinimumValue = 0;
  $scope.ecgLeadAVLMinimumValue = 0;
  $scope.ecgLeadAVRMinimumValue = 0;
  $scope.ecgLeadIMinimumValue = 0;
  $scope.ecgLeadIIMinimumValue = 0;
  $scope.ecgLeadIIIMinimumValue = 0;
  var leadModestatus = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
  $scope.pulse = HigiKioskStorageService.returnSessionData('zugECGCurrentBPMNonZero');
  var graphHeight = 80;
  var graphWidth = 470;
  /*Plotting the Three Lead Ecg Graph - thamarai-starting*/
  if (leadModestatus == 3) {
    var xAxisStripLinesArray = [];
    var yAxisStripLinesArray = [];
    var dps = [];
    var dataPointsArray = new Array();
    var maximumPeak;
    var minimumPeak;
    var finalPeak;
    $scope.localResultChart = function (datapoints_in_string) {
      var chart = new CanvasJS.Chart("ecgchartContainer",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead1],
            text:'',
          },
          axisY: {
            stripLines: yAxisStripLinesArray,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLinesArray,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 1,
              dataPoints: dps
            }]
        });
      for (var h = 0; h < datapoints_in_string.length; h++) {
        dataPointsArray.push(parseFloat(datapoints_in_string[h]));
      }
      addDataPoints(chart);
      addStripLines(chart);
    }
    function addDataPoints(chart) {
      for (var i = 0; i < dataPointsArray.length; i++) {
        dps.push({ y: dataPointsArray[i] });
      }

      chart.render();
      maximumPeak = $scope.ecgLeadIMaximumValue;
      minimumPeak = $scope.ecgLeadIMinimumValue;

      if (maximumPeak < 0) {
        maximumPeak = maximumPeak * -1;
      } else {
        maximumPeak = $scope.ecgLeadIMaximumValue;
      }

      if (minimumPeak < 0) {
        minimumPeak = minimumPeak * -1;
      } else {
        minimumPeak = $scope.ecgLeadIMinimumValue;
      }


      if (maximumPeak == minimumPeak) {
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      } else if (maximumPeak > minimumPeak) {
        minimumPeak = maximumPeak;
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      } else {
        maximumPeak = minimumPeak;
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      }
    }

    function addStripLines(chart) {
      //Adding StripLines
      for (var i = chart.axisY[0].minimum; i <= chart.axisY[0].maximum; i = i + (chart.axisY[0].interval / 5)) {
        if (i % chart.axisY[0].interval != 0)
          yAxisStripLinesArray.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart.axisX[0].minimum; i <= chart.axisX[0].maximum; i = i + (chart.axisX[0].interval / 5)) {
        if (i % chart.axisX[0].interval != 0)
          xAxisStripLinesArray.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart.render();
    }



    var xAxisStripLinesArrayt = [];
    var yAxisStripLinesArrayt = [];
    var dpst = [];
    var dataPointsArrayt = new Array();
    var maximumPeakt;
    var minimumPeakt;
    var finalPeakt;

    $scope.localResultChartt = function (datapoints_in_stringt) {
      var chartt = new CanvasJS.Chart("fecgchartContainer",
        {
          height: 100,
          width: 400,
          backgroundColor: "transparent",
          axisY: {
            stripLines: yAxisStripLinesArrayt,
            gridThickness: 0.5,
            gridColor: "#000000",
            tickThickness: 0,
            labelFontColor: "#000000",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLinesArrayt,
            gridThickness: 0.5,
            gridColor: "#000000",
            tickThickness: 0,
            labelFontColor: "#000000",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 2,
              dataPoints: dpst
            }]
        });
      for (var h = 0; h < datapoints_in_stringt.length; h++) {
        dataPointsArrayt.push(parseFloat(datapoints_in_stringt[h]));
      }
      addDataPointst(chartt);
      addStripLinest(chartt);
    }

    function addDataPointst(chartt) {
      for (var i = 0; i < dataPointsArrayt.length; i++) {
        dpst.push({ y: dataPointsArrayt[i] });
      }
      chartt.render();
      maximumPeakt = $scope.ecgLeadIMaximumValue;
      minimumPeakt = $scope.ecgLeadIMinimumValue;

      if (maximumPeakt < 0) {
        maximumPeakt = maximumPeakt * -1;
      } else {
        maximumPeakt = $scope.ecgLeadIMaximumValue;
      }

      if (minimumPeakt < 0) {
        minimumPeakt = minimumPeakt * -1;
      } else {
        minimumPeakt = $scope.ecgLeadIMinimumValue;
      }


      if (maximumPeakt == minimumPeakt) {
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      } else if (maximumPeakt > minimumPeakt) {
        minimumPeakt = maximumPeakt;
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      } else {
        maximumPeakt = minimumPeakt;
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      }
    }

    function addStripLinest(chartt) {
      //Adding StripLines
      for (var i = chartt.axisY[0].minimum; i <= chartt.axisY[0].maximum; i = i + (chartt.axisY[0].interval / 5)) {
        if (i % chartt.axisY[0].interval != 0)
          yAxisStripLinesArrayt.push({ value: i, thickness: 1, color: "#A9A9A9" });
      }
      for (var i = chartt.axisX[0].minimum; i <= chartt.axisX[0].maximum; i = i + (chartt.axisX[0].interval / 5)) {
        if (i % chartt.axisX[0].interval != 0)
          xAxisStripLinesArrayt.push({ value: i, thickness: 1, color: "#A9A9A9" });
      }
      //  chartt.render();
      if ($scope.ThreeLeadOne == true) {

        var can1 = $("#fecgchartContainer canvas");
        var ECGU1 = can1[0].toDataURL();
        //console.log("ThreeLeadECGLeadOneGraphPrint: " + ECGU1);
        HigiKioskStorageService.saveSessionData('ThreeLeadECGLeadOneGraphPrint', ECGU1);
      }
      if ($scope.ThreeLeadTwo == true) {
        var can2 = $("#fecgchartContainer canvas");
        var ECGU2 = can2[0].toDataURL();
        // console.log("ThreeLeadECGLeadTwoGraphPrint: " + ECGU2);
        HigiKioskStorageService.saveSessionData('ThreeLeadECGLeadTwoGraphPrint', ECGU2);

      }
      if ($scope.ThreeLeadThree == true) {
        var can3 = $("#fecgchartContainer canvas");
        var ECGU3 = can3[0].toDataURL();
        //  console.log("ThreeLeadECGLeadThreeGraphPrint: " + ECGU3);
        HigiKioskStorageService.saveSessionData('ThreeLeadECGLeadThreeGraphPrint', ECGU3);
      }

    }





    var xAxisStripLines = [];
    var yAxisStripLines = [];
    var dp = [];
    var dataPoint = new Array();
    var maximumPeakLead2;
    var minimumPeakLead2;
    var finalPeakLead2;

    $scope.localResult = function (datapoints_in_string2) {

      var chart2 = new CanvasJS.Chart("ecg2chartContainer",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead2],
            text:'',
          },
          axisY: {
            stripLines: yAxisStripLines,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLines,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 1,
              dataPoints: dp
            }]
        });
      for (var h = 0; h < datapoints_in_string2.length; h++) {
        dataPoint.push(parseFloat(datapoints_in_string2[h]));
      }

      addDataPointsForLead2(chart2);
      addStripLinesForLead2(chart2);
    }

    function addDataPointsForLead2(chart2) {
      for (var i = 0; i < dataPoint.length; i++) {
        dp.push({ y: dataPoint[i] });
      }
      chart2.render();
      maximumPeakLead2 = $scope.ecgLeadIIMaximumValue;
      minimumPeakLead2 = $scope.ecgLeadIIMinimumValue;

      if (maximumPeakLead2 < 0) {
        maximumPeakLead2 = maximumPeakLead2 * -1;
      } else {
        maximumPeakLead2 = $scope.ecgLeadIIMaximumValue;
      }

      if (minimumPeakLead2 < 0) {
        minimumPeakLead2 = minimumPeakLead2 * -1;
      } else {
        minimumPeakLead2 = $scope.ecgLeadIIMinimumValue;
      }


      if (maximumPeakLead2 == minimumPeakLead2) {
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      } else if (maximumPeakLead2 > minimumPeakLead2) {
        minimumPeakLead2 = maximumPeakLead2;
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      } else {
        maximumPeakLead2 = minimumPeakLead2;
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      }
    }

    function addStripLinesForLead2(chart2) {
      //Adding StripLines
      for (var i = chart2.axisY[0].minimum; i <= chart2.axisY[0].maximum; i = i + (chart2.axisY[0].interval / 5)) {
        if (i % chart2.axisY[0].interval != 0)
          yAxisStripLines.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart2.axisX[0].minimum; i <= chart2.axisX[0].maximum; i = i + (chart2.axisX[0].interval / 5)) {
        if (i % chart2.axisX[0].interval != 0)
          xAxisStripLines.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart2.render();
    }
    function FinalScreenAddStripLinesForLead2(chart2) {
      //Adding StripLines
      for (var i = chart2.axisY[0].minimum; i <= chart2.axisY[0].maximum; i = i + (chart2.axisY[0].interval / 5)) {
        if (i % chart2.axisY[0].interval != 0)
          yAxisStripLines.push({ value: i, thickness: 0.5, color: "#FABDDA" });
      }
      for (var i = chart2.axisX[0].minimum; i <= chart2.axisX[0].maximum; i = i + (chart2.axisX[0].interval / 5)) {
        if (i % chart2.axisX[0].interval != 0)
          xAxisStripLines.push({ value: i, thickness: 0.5, color: "#FABDDA" });
      }
      chart2.render();
    }
    var xAxisStrip = [];
    var yAxisStrip = [];
    var dps3 = [];
    var data3 = new Array();
    var maximumPeakLead3;
    var minimumPeakLead3;
    var finalPeakLead3;

    $scope.localResult3 = function (datapoints_in_string3) {

      var chart3 = new CanvasJS.Chart("ecg3chartContainer",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead3],
            text:'',
          },
          axisY: {
            stripLines: yAxisStrip,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStrip,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 1,
              dataPoints: dps3
            }]
        });
      for (var h = 0; h < datapoints_in_string3.length; h++) {
        data3.push(parseFloat(datapoints_in_string3[h]));
      }

      addDataPointsForLead3(chart3);
      addStripLinesForLead3(chart3);
    }

    function addDataPointsForLead3(chart3) {
      for (var i = 0; i < data3.length; i++) {
        dps3.push({ y: data3[i] });
      }
      chart3.render();
      maximumPeakLead3 = $scope.ecgLeadIIIMaximumValue;
      minimumPeakLead3 = $scope.ecgLeadIIIMinimumValue;

      if (maximumPeakLead3 < 0) {
        maximumPeakLead3 = maximumPeakLead3 * -1;
      } else {
        maximumPeakLead3 = $scope.ecgLeadIIIMaximumValue;
      }

      if (minimumPeakLead3 < 0) {
        minimumPeakLead3 = minimumPeakLead3 * -1;
      } else {
        minimumPeakLead3 = $scope.ecgLeadIIIMinimumValue;
      }


      if (maximumPeakLead3 == minimumPeakLead3) {
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      } else if (maximumPeakLead3 > minimumPeakLead3) {
        minimumPeakLead3 = maximumPeakLead3;
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      } else {
        maximumPeakLead3 = minimumPeakLead3;
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      }
    }

    function addStripLinesForLead3(chart3) {
      //Adding StripLines
      for (var i = chart3.axisY[0].minimum; i <= chart3.axisY[0].maximum; i = i + (chart3.axisY[0].interval / 5)) {
        if (i % chart3.axisY[0].interval != 0)
          yAxisStrip.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart3.axisX[0].minimum; i <= chart3.axisX[0].maximum; i = i + (chart3.axisX[0].interval / 5)) {
        if (i % chart3.axisX[0].interval != 0)
          xAxisStrip.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart3.render();
    }
  }
  /*Plotting the Three Lead Ecg Graph - thamarai-ending*/
  else if (leadModestatus == 6) {

    var xAxisStripLinesArray = [];
    var yAxisStripLinesArray = [];
    var dps = [];
    var dataPointsArray = new Array();
    var maximumPeak;
    var minimumPeak;
    var finalPeak;

    $scope.localResult1 = function (datapoints_in_string) {

      var chart = new CanvasJS.Chart("ecg_result_Graph1",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead1],
            text: '',
          },
          axisY: {
            stripLines: yAxisStripLinesArray,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLinesArray,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dps
            }]
        });
      for (var h = 0; h < datapoints_in_string.length; h++) {
        dataPointsArray.push(parseFloat(datapoints_in_string[h]));
      }

      addDataPointsSixLead(chart);
      addStripLinesSixLead(chart);
    }

    function addDataPointsSixLead(chart) {
      for (var i = 0; i < dataPointsArray.length; i++) {
        dps.push({ y: dataPointsArray[i] });
      }

      chart.render();
      maximumPeak = $scope.ecgLeadIMaximumValue;
      minimumPeak = $scope.ecgLeadIMinimumValue;

      if (maximumPeak < 0) {
        maximumPeak = maximumPeak * -1;
      } else {
        maximumPeak = $scope.ecgLeadIMaximumValue;
      }

      if (minimumPeak < 0) {
        minimumPeak = minimumPeak * -1;
      } else {
        minimumPeak = $scope.ecgLeadIMinimumValue;
      }


      if (maximumPeak == minimumPeak) {
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      } else if (maximumPeak > minimumPeak) {
        minimumPeak = maximumPeak;
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      } else {
        maximumPeak = minimumPeak;
        finalPeak = maximumPeak + minimumPeak;
        chart.axisX[0].set("interval", (chart.axisX[0].get("maximum") - chart.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart.axisY[0].set("maximum", maximumPeak);
        chart.axisY[0].set("minimum", -(minimumPeak));
        chart.axisY[0].set("interval", finalPeak / 4);
      }
    }

    function addStripLinesSixLead(chart) {
      //Adding StripLines
      for (var i = chart.axisY[0].minimum; i <= chart.axisY[0].maximum; i = i + (chart.axisY[0].interval / 5)) {
        if (i % chart.axisY[0].interval != 0)
          yAxisStripLinesArray.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart.axisX[0].minimum; i <= chart.axisX[0].maximum; i = i + (chart.axisX[0].interval / 5)) {
        if (i % chart.axisX[0].interval != 0)
          xAxisStripLinesArray.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart.render();
    }


    $scope.f1localResult1 = function (datapoints_in_stringt) {
      var chartt = new CanvasJS.Chart("f1ecg_result_Graph1",
        {
          height: 100,
          width: 400,
          backgroundColor: "transparent",

          axisY: {
            stripLines: yAxisStripLinesArrayt,
            gridThickness: 0.5,
            gridColor: "#000000",
            tickThickness: 0,
            labelFontColor: "#000000",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLinesArrayt,
            gridThickness: 0.5,
            gridColor: "#000000",
            tickThickness: 0,
            labelFontColor: "#000000",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 2,
              dataPoints: dpst
            }]
        });
      for (var h = 0; h < datapoints_in_stringt.length; h++) {
        dataPointsArrayt.push(parseFloat(datapoints_in_stringt[h]));
      }
      addDataPointst(chartt);
      addStripLinest(chartt);
    }

    function addDataPointst(chartt) {
      for (var i = 0; i < dataPointsArrayt.length; i++) {
        dpst.push({ y: dataPointsArrayt[i] });
      }
      chartt.render();
      maximumPeakt = $scope.ecgLeadIMaximumValue;
      minimumPeakt = $scope.ecgLeadIMinimumValue;

      if (maximumPeakt < 0) {
        maximumPeakt = maximumPeakt * -1;
      } else {
        maximumPeakt = $scope.ecgLeadIMaximumValue;
      }

      if (minimumPeakt < 0) {
        minimumPeakt = minimumPeakt * -1;
      } else {
        minimumPeakt = $scope.ecgLeadIMinimumValue;
      }


      if (maximumPeakt == minimumPeakt) {
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      } else if (maximumPeakt > minimumPeakt) {
        minimumPeakt = maximumPeakt;
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      } else {
        maximumPeakt = minimumPeakt;
        finalPeakt = maximumPeakt + minimumPeakt;
        chartt.axisX[0].set("interval", (chartt.axisX[0].get("maximum") - chartt.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chartt.axisY[0].set("maximum", maximumPeakt);
        chartt.axisY[0].set("minimum", -(minimumPeakt));
        chartt.axisY[0].set("interval", finalPeakt / 4);
      }
    }

    function addStripLinest(chartt) {
      //Adding StripLines
      for (var i = chartt.axisY[0].minimum; i <= chartt.axisY[0].maximum; i = i + (chartt.axisY[0].interval / 5)) {
        if (i % chartt.axisY[0].interval != 0)
          yAxisStripLinesArrayt.push({ value: i, thickness: 1, color: "#A9A9A9" });
      }
      for (var i = chartt.axisX[0].minimum; i <= chartt.axisX[0].maximum; i = i + (chartt.axisX[0].interval / 5)) {
        if (i % chartt.axisX[0].interval != 0)
          xAxisStripLinesArrayt.push({ value: i, thickness: 1, color: "#A9A9A9" });
      }
      // chartt.render();
      if ($scope.SixLeadOne == true) {

        var can1 = $("#f1ecg_result_Graph1 canvas");
        var ECGU1 = can1[0].toDataURL();
        //console.log("ThreeLeadECGLeadOneGraphPrint: " + ECGU1);
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadOneGraphPrint', ECGU1);
      }
      if ($scope.SixLeadTwo == true) {
        var can2 = $("#f1ecg_result_Graph1 canvas");
        var ECGU2 = can2[0].toDataURL();
        // console.log("ThreeLeadECGLeadTwoGraphPrint: " + ECGU2);
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadTwoGraphPrint', ECGU2);

      }
      if ($scope.SixLeadThree == true) {
        var can3 = $("#f1ecg_result_Graph1 canvas");
        var ECGU3 = can3[0].toDataURL();
        //  console.log("ThreeLeadECGLeadThreeGraphPrint: " + ECGU3);
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadThreeGraphPrint', ECGU3);
      }
      if ($scope.SixLeadFour == true) {
        var sixleadcan = $("#f1ecg_result_Graph1 canvas");
        var sixleadECGU = sixleadcan[0].toDataURL();
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadFourGraphPrint', sixleadECGU);

      }
      if ($scope.SixLeadFive == true) {
        var sixleadcan = $("#f1ecg_result_Graph1 canvas");
        var sixleadECGU = sixleadcan[0].toDataURL();
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadFiveGraphPrint', sixleadECGU);

      }
      if ($scope.SixLeadSix == true) {
        var sixleadcan = $("#f1ecg_result_Graph1 canvas");
        var sixleadECGU = sixleadcan[0].toDataURL();
        HigiKioskStorageService.saveSessionData('SixLeadECGLeadSixGraphPrint', sixleadECGU);

      }

    }


    var xAxisStripLines = [];
    var yAxisStripLines = [];
    var dp = [];
    var dataPoint = new Array();
    var maximumPeakLead2;
    var minimumPeakLead2;
    var finalPeakLead2;

    $scope.localResult2 = function (datapoints_in_string2) {

      var chart2 = new CanvasJS.Chart("ecg_result_Graph2",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead2],
            text: '',
          },
          axisY: {
            stripLines: yAxisStripLines,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStripLines,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dp
            }]
        });
      for (var h = 0; h < datapoints_in_string2.length; h++) {
        dataPoint.push(parseFloat(datapoints_in_string2[h]));
      }

      addDataPointsForLead2SixLead(chart2);
      addStripLinesForLead2SixLead(chart2);
    }

    function addDataPointsForLead2SixLead(chart2) {
      for (var i = 0; i < dataPoint.length; i++) {
        dp.push({ y: dataPoint[i] });
      }
      chart2.render();
      maximumPeakLead2 = $scope.ecgLeadIIMaximumValue;
      minimumPeakLead2 = $scope.ecgLeadIIMinimumValue;

      if (maximumPeakLead2 < 0) {
        maximumPeakLead2 = maximumPeakLead2 * -1;
      } else {
        maximumPeakLead2 = $scope.ecgLeadIIMaximumValue;
      }

      if (minimumPeakLead2 < 0) {
        minimumPeakLead2 = minimumPeakLead2 * -1;
      } else {
        minimumPeakLead2 = $scope.ecgLeadIIMinimumValue;
      }


      if (maximumPeakLead2 == minimumPeakLead2) {
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      } else if (maximumPeakLead2 > minimumPeakLead2) {
        minimumPeakLead2 = maximumPeakLead2;
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      } else {
        maximumPeakLead2 = minimumPeakLead2;
        finalPeakLead2 = maximumPeakLead2 + minimumPeakLead2;
        chart2.axisX[0].set("interval", (chart2.axisX[0].get("maximum") - chart2.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart2.axisY[0].set("maximum", maximumPeakLead2);
        chart2.axisY[0].set("minimum", -(minimumPeakLead2));
        chart2.axisY[0].set("interval", finalPeakLead2 / 4);
      }
    }

    function addStripLinesForLead2SixLead(chart2) {
      //Adding StripLines
      for (var i = chart2.axisY[0].minimum; i <= chart2.axisY[0].maximum; i = i + (chart2.axisY[0].interval / 5)) {
        if (i % chart2.axisY[0].interval != 0)
          yAxisStripLines.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart2.axisX[0].minimum; i <= chart2.axisX[0].maximum; i = i + (chart2.axisX[0].interval / 5)) {
        if (i % chart2.axisX[0].interval != 0)
          xAxisStripLines.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart2.render();
    }

    var xAxisStrip = [];
    var yAxisStrip = [];
    var dps3 = [];
    var data3 = new Array();
    var maximumPeakLead3;
    var minimumPeakLead3;
    var finalPeakLead3;

    $scope.localResultIII = function (datapoints_in_string3) {

      var chart3 = new CanvasJS.Chart("ecg_result_Graph3",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLead3],
            text: '',
          },
          axisY: {
            stripLines: yAxisStrip,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStrip,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dps3
            }]
        });
      for (var h = 0; h < datapoints_in_string3.length; h++) {
        data3.push(parseFloat(datapoints_in_string3[h]));
      }

      addDataPointsForLead3SixLead(chart3);
      addStripLinesForLead3SixLead(chart3);
    }

    function addDataPointsForLead3SixLead(chart3) {
      for (var i = 0; i < data3.length; i++) {
        dps3.push({ y: data3[i] });
      }
      chart3.render();
      maximumPeakLead3 = $scope.ecgLeadIIIMaximumValue;
      minimumPeakLead3 = $scope.ecgLeadIIIMinimumValue;

      if (maximumPeakLead3 < 0) {
        maximumPeakLead3 = maximumPeakLead3 * -1;
      } else {
        maximumPeakLead3 = $scope.ecgLeadIIIMaximumValue;
      }

      if (minimumPeakLead3 < 0) {
        minimumPeakLead3 = minimumPeakLead3 * -1;
      } else {
        minimumPeakLead3 = $scope.ecgLeadIIIMinimumValue;
      }


      if (maximumPeakLead3 == minimumPeakLead3) {
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      } else if (maximumPeakLead3 > minimumPeakLead3) {
        minimumPeakLead3 = maximumPeakLead3;
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      } else {
        maximumPeakLead3 = minimumPeakLead3;
        finalPeakLead3 = maximumPeakLead3 + minimumPeakLead3;
        chart3.axisX[0].set("interval", (chart3.axisX[0].get("maximum") - chart3.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart3.axisY[0].set("maximum", maximumPeakLead3);
        chart3.axisY[0].set("minimum", -(minimumPeakLead3));
        chart3.axisY[0].set("interval", finalPeakLead3 / 4);
      }
    }

    function addStripLinesForLead3SixLead(chart3) {
      //Adding StripLines
      for (var i = chart3.axisY[0].minimum; i <= chart3.axisY[0].maximum; i = i + (chart3.axisY[0].interval / 5)) {
        if (i % chart3.axisY[0].interval != 0)
          yAxisStrip.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart3.axisX[0].minimum; i <= chart3.axisX[0].maximum; i = i + (chart3.axisX[0].interval / 5)) {
        if (i % chart3.axisX[0].interval != 0)
          xAxisStrip.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart3.render();
    }


    var xAxisStrip4 = [];
    var yAxisStrip4 = [];
    var dps4 = [];
    var data4 = new Array();
    var maximumPeakLead4;
    var minimumPeakLead4;
    var finalPeakLead4;

    $scope.localResult4 = function (datapoints_in_string4) {

      var chart4 = new CanvasJS.Chart("ecg_result_Graph4",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLeadavr],
            text: '',
          },
          axisY: {
            stripLines: yAxisStrip4,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStrip4,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dps4
            }]
        });
      for (var h = 0; h < datapoints_in_string4.length; h++) {
        data4.push(parseFloat(datapoints_in_string4[h]));
      }

      addDataPointsForLead4SixLead(chart4);
      addStripLinesForLead4SixLead(chart4);
    }

    function addDataPointsForLead4SixLead(chart4) {
      for (var i = 0; i < data4.length; i++) {
        dps4.push({ y: data4[i] });
      }
      chart4.render();
      maximumPeakLead4 = $scope.ecgLeadAVRMaximumValue;
      minimumPeakLead4 = $scope.ecgLeadAVRMinimumValue;

      if (maximumPeakLead4 < 0) {
        maximumPeakLead4 = maximumPeakLead4 * -1;
      } else {
        maximumPeakLead4 = $scope.ecgLeadAVRMaximumValue;
      }

      if (minimumPeakLead4 < 0) {
        minimumPeakLead4 = minimumPeakLead4 * -1;
      } else {
        minimumPeakLead4 = $scope.ecgLeadAVRMinimumValue;
      }


      if (maximumPeakLead4 == minimumPeakLead4) {
        finalPeakLead4 = maximumPeakLead4 + minimumPeakLead4;
        chart4.axisX[0].set("interval", (chart4.axisX[0].get("maximum") - chart4.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart4.axisY[0].set("maximum", maximumPeakLead4);
        chart4.axisY[0].set("minimum", -(minimumPeakLead4));
        chart4.axisY[0].set("interval", finalPeakLead4 / 4);
      } else if (maximumPeakLead4 > minimumPeakLead4) {
        minimumPeakLead4 = maximumPeakLead4;
        finalPeakLead4 = maximumPeakLead4 + minimumPeakLead4;
        chart4.axisX[0].set("interval", (chart4.axisX[0].get("maximum") - chart4.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart4.axisY[0].set("maximum", maximumPeakLead4);
        chart4.axisY[0].set("minimum", -(minimumPeakLead4));
        chart4.axisY[0].set("interval", finalPeakLead4 / 4);
      } else {
        maximumPeakLead4 = minimumPeakLead4;
        finalPeakLead4 = maximumPeakLead4 + minimumPeakLead4;
        chart4.axisX[0].set("interval", (chart4.axisX[0].get("maximum") - chart4.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart4.axisY[0].set("maximum", maximumPeakLead4);
        chart4.axisY[0].set("minimum", -(minimumPeakLead4));
        chart4.axisY[0].set("interval", finalPeakLead4 / 4);
      }
    }

    function addStripLinesForLead4SixLead(chart4) {
      //Adding StripLines
      for (var i = chart4.axisY[0].minimum; i <= chart4.axisY[0].maximum; i = i + (chart4.axisY[0].interval / 5)) {
        if (i % chart4.axisY[0].interval != 0)
          yAxisStrip4.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart4.axisX[0].minimum; i <= chart4.axisX[0].maximum; i = i + (chart4.axisX[0].interval / 5)) {
        if (i % chart4.axisX[0].interval != 0)
          xAxisStrip4.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart4.render();
    }
    var xAxisStrip5 = [];
    var yAxisStrip5 = [];
    var dps5 = [];
    var data5 = new Array();
    var maximumPeakLead5;
    var minimumPeakLead5;
    var finalPeakLead5;

    $scope.localResult5 = function (datapoints_in_string5) {

      var chart5 = new CanvasJS.Chart("ecg_result_Graph5",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLeadavl],
            text: '',
          },
          axisY: {
            stripLines: yAxisStrip5,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStrip5,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dps5
            }]
        });
      for (var h = 0; h < datapoints_in_string5.length; h++) {
        data5.push(parseFloat(datapoints_in_string5[h]));
      }

      addDataPointsForLead5SixLead(chart5);
      addStripLinesForLead5SixLead(chart5);
    }

    function addDataPointsForLead5SixLead(chart5) {
      for (var i = 0; i < data5.length; i++) {
        dps5.push({ y: data5[i] });
      }
      chart5.render();
      maximumPeakLead5 = $scope.ecgLeadAVFMaximumValue;
      minimumPeakLead5 = $scope.ecgLeadAVFMinimumValue;

      if (maximumPeakLead5 < 0) {
        maximumPeakLead5 = maximumPeakLead5 * -1;
      } else {
        maximumPeakLead5 = $scope.ecgLeadAVFMaximumValue;
      }

      if (minimumPeakLead5 < 0) {
        minimumPeakLead5 = minimumPeakLead4 * -1;
      } else {
        minimumPeakLead5 = $scope.ecgLeadAVFMinimumValue;
      }


      if (maximumPeakLead5 == minimumPeakLead5) {
        finalPeakLead5 = maximumPeakLead5 + minimumPeakLead5;
        chart5.axisX[0].set("interval", (chart5.axisX[0].get("maximum") - chart5.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart5.axisY[0].set("maximum", maximumPeakLead5);
        chart5.axisY[0].set("minimum", -(minimumPeakLead5));
        chart5.axisY[0].set("interval", finalPeakLead5 / 4);
      } else if (maximumPeakLead5 > minimumPeakLead5) {
        minimumPeakLead5 = maximumPeakLead5;
        finalPeakLead5 = maximumPeakLead5 + minimumPeakLead5;
        chart5.axisX[0].set("interval", (chart5.axisX[0].get("maximum") - chart5.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart5.axisY[0].set("maximum", maximumPeakLead5);
        chart5.axisY[0].set("minimum", -(minimumPeakLead5));
        chart5.axisY[0].set("interval", finalPeakLead5 / 4);
      } else {
        maximumPeakLead5 = minimumPeakLead5;
        finalPeakLead5 = maximumPeakLead5 + minimumPeakLead5;
        chart5.axisX[0].set("interval", (chart5.axisX[0].get("maximum") - chart5.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart5.axisY[0].set("maximum", maximumPeakLead5);
        chart5.axisY[0].set("minimum", -(minimumPeakLead5));
        chart5.axisY[0].set("interval", finalPeakLead5 / 4);
      }
    }

    function addStripLinesForLead5SixLead(chart5) {
      //Adding StripLines
      for (var i = chart5.axisY[0].minimum; i <= chart5.axisY[0].maximum; i = i + (chart5.axisY[0].interval / 5)) {
        if (i % chart5.axisY[0].interval != 0)
          yAxisStrip5.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart5.axisX[0].minimum; i <= chart5.axisX[0].maximum; i = i + (chart5.axisX[0].interval / 5)) {
        if (i % chart5.axisX[0].interval != 0)
          xAxisStrip5.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart5.render();
    }

    var xAxisStrip6 = [];
    var yAxisStrip6 = [];
    var dps6 = [];
    var data6 = new Array();
    var maximumPeakLead6;
    var minimumPeakLead6;
    var finalPeakLead6;

    $scope.localResult6 = function (datapoints_in_string6) {

      var chart6 = new CanvasJS.Chart("ecg_result_Graph6",
        {
          height: graphHeight,
          width: graphWidth,
          backgroundColor: "transparent",
          title: {
            // text: $scope.interfaceLabels[$scope.ECGLeadavf],
            text: '',
          },
          axisY: {
            stripLines: yAxisStrip6,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          axisX: {
            stripLines: xAxisStrip6,
            gridThickness: 2,
            gridColor: "#FABDDA",
            lineColor: "#FABDDA",
            tickThickness: 0,
            labelFontColor: "#FABDDA",
            labelFormatter: function (e) {
              return "";
            }
          },
          data: [
            {
              type: "spline",
              color: "black",
              lineThickness: 0.8,
              dataPoints: dps6
            }]
        });
      for (var h = 0; h < datapoints_in_string6.length; h++) {
        data6.push(parseFloat(datapoints_in_string6[h]));
      }

      addDataPointsForLead6SixLead(chart6);
      addStripLinesForLead6SixLead(chart6);
    }

    function addDataPointsForLead6SixLead(chart6) {
      for (var i = 0; i < data6.length; i++) {
        dps6.push({ y: data6[i] });
      }
      chart6.render();
      maximumPeakLead6 = $scope.ecgLeadAVLMaximumValue;
      minimumPeakLead6 = $scope.ecgLeadAVLMinimumValue;

      if (maximumPeakLead6 < 0) {
        maximumPeakLead6 = maximumPeakLead6 * -1;
      } else {
        maximumPeakLead6 = $scope.ecgLeadAVLMaximumValue;
      }

      if (minimumPeakLead6 < 0) {
        minimumPeakLead6 = minimumPeakLead4 * -1;
      } else {
        minimumPeakLead6 = $scope.ecgLeadAVLMinimumValue;
      }


      if (maximumPeakLead6 == minimumPeakLead6) {
        finalPeakLead6 = maximumPeakLead6 + minimumPeakLead6;
        chart6.axisX[0].set("interval", (chart6.axisX[0].get("maximum") - chart6.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart6.axisY[0].set("maximum", maximumPeakLead6);
        chart6.axisY[0].set("minimum", -(minimumPeakLead6));
        chart6.axisY[0].set("interval", finalPeakLead6 / 4);
      } else if (maximumPeakLead6 > minimumPeakLead6) {
        minimumPeakLead6 = maximumPeakLead6;
        finalPeakLead6 = maximumPeakLead6 + minimumPeakLead6;
        chart6.axisX[0].set("interval", (chart6.axisX[0].get("maximum") - chart6.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart6.axisY[0].set("maximum", maximumPeakLead6);
        chart6.axisY[0].set("minimum", -(minimumPeakLead6));
        chart6.axisY[0].set("interval", finalPeakLead6 / 4);
      } else {
        maximumPeakLead6 = minimumPeakLead6;
        finalPeakLead6 = maximumPeakLead6 + minimumPeakLead6;
        chart6.axisX[0].set("interval", (chart6.axisX[0].get("maximum") - chart6.axisX[0].get("minimum")) / 30); //Show 30 major grids in axisX
        chart6.axisY[0].set("maximum", maximumPeakLead6);
        chart4.axisY[0].set("minimum", -(minimumPeakLead6));
        chart6.axisY[0].set("interval", finalPeakLead6 / 4);
      }
    }

    function addStripLinesForLead6SixLead(chart6) {
      //Adding StripLines
      for (var i = chart6.axisY[0].minimum; i <= chart6.axisY[0].maximum; i = i + (chart6.axisY[0].interval / 5)) {
        if (i % chart6.axisY[0].interval != 0)
          yAxisStrip6.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      for (var i = chart6.axisX[0].minimum; i <= chart6.axisX[0].maximum; i = i + (chart6.axisX[0].interval / 5)) {
        if (i % chart6.axisX[0].interval != 0)
          xAxisStrip6.push({ value: i, thickness: 1, color: "#FABDDA" });
      }
      chart6.render();
    }
  }

  function arrayMin(arr) {
    return arr.reduce(function (p, v) {
      return (p < v ? p : v);
    });
  }

  function arrayMax(arr) {
    return arr.reduce(function (p, v) {
      return (p > v ? p : v);
    });
  }

  function findMinCealing(dataPoint) {
    // finding minimum and maximum number from array

    var minnum = arrayMin(dataPoint);

    // cealing to nearest max  and min

    var clealedmin = Math.ceil(minnum / 500) * 500;

    //adjusting the ceailing to max and min of 500

    if (clealedmin > minnum) {
      clealedmin = clealedmin - 500;
    } else {
      clealedmin = clealedmin;
    }

    return clealedmin;


  }


  function findMaxCealing(dataPoint) {

    // finding minimum and maximum number from array
    var maxnum = arrayMax(dataPoint);


    // cealing to nearest max  and min
    var clealedmax = Math.ceil(maxnum / 500) * 500;


    //adjusting the ceailing to max and min of 500
    if (clealedmax < maxnum) {
      clealedmax = clealedmax + 500;
    } else {
      clealedmax = clealedmax;
    }
    return clealedmax;
  }

  $scope.audioFiles = [
    { filename: 'zugresults01_audio01' },
    { filename: 'zugresults01_audio02' }

  ];

  $scope.init = function () {
    $("#fecgchartContainer").hide();
    $("#f1ecg_result_Graph1").hide();
    $("#symbol").show();
    $scope.ThreeLeadOne = false;
    $scope.ThreeLeadTwo = false;
    $scope.ThreeLeadThree = false;
    $scope.SixLeadOne = false;
    $scope.SixLeadTwo = false;

    $scope.SixLeadThree = false;

    $scope.SixLeadFour = false;
    $scope.SixLeadFive = false;

    $scope.SixLeadSix = false;

    $rootScope.invalidHR = false;
    $rootScope.invalidPR = false;
    $rootScope.invalidQRS = false;
    $rootScope.invalidQTc = false;
    $scope.ECGLead1 = "zugEcg3.ecglead1";
    $scope.ECGLead2 = "zugEcg3.ecglead2";
    $scope.ECGLead3 = "zugEcg3.ecglead3";
    $scope.ECGLeadavr = "zugEcg3.ecglead4";
    $scope.ECGLeadavl = "zugEcg3.ecglead6";
    $scope.ECGLeadavf = "zugEcg3.ecglead5";
    
    $scope.ecgParameter = "zugECG3.parameter";
    $scope.ecgYourscore = "zugECG3.yourscore";
    $scope.ecgSTATUS = "zugECG3.STATUS";
    $scope.ecgNormalrange = "zugECG3.normalrange";
    $scope.ecgOverallStatus = "zugECG3.OverallStatus";
    $scope.ecgHeartRate = "zugECG3.ecgHeartRate";
    $scope.ecgBpm = "zugECG3.ecgBpm";
    $scope.ecgPrInterval = "zugECG3.ecgPrInterval";
    $scope.ecgMs = "zugECG3.ecgMs";
    $scope.ecgQrs = "zugECG3.ecgQrs";
    $scope.ecgDuration = "zugECG3.ecgDuration";
    $scope.ecgQtc = "zugECG3.ecgQtc";
    $scope.ecgInterval = "zugECG3.ecgInterval";
    $scope.irregularEcgTest = "zugECG3.irregularEcgTest";
    $scope.ecgRedoTask = "zugECG3.ecgRedoTask";

    $scope.ecglead3 = "zugEcg3.Lead3";
    $scope.ecglead6 = "zugEcg3.Lead6";
    $scope.resultsECG = "zugEcg3.results";
    $scope.ecgCheckUpSumm = "zugEcg3.ecgCheckUpSummTitle";
    $scope.grpset1 = "zugEcg3.grpset1";
    $scope.grpset2 = "zugEcg3.grpset2";
    $scope.loadinggraph = "zugEcg3.loadinggraph";
    $scope.checkecgAgain = "zugECG3.checkAgain";

    $scope.normalstatusresultInterimResult = "global.normal";
    $scope.irregularECGInterval = "global.ecgStatus";

    $scope.ecgBadValidation = true;
    $scope.showLoadText = true;
    $scope.redoVisible = false;
    // $scope.nextVisible = false;
    $scope.nextVisible = true;
    $scope.secondnextVisible = false;
    $scope.exitNextVisible = false;
    $scope.prevIsVisible = false;
    $scope.redoECGVisible = false;
    $scope.showGraph = true;
    $scope.irregularECG = false;
    $scope.MinECGBpmValue = 0;
    $scope.MaxECGBpmValue = 0;

    //sending user raw ecg data to ecg_analysis php file starts here 
    if($rootScope.storeECGRawData && $rootScope.StoreECGRawDataForAnalysis != []){
      $.ajax({
        // url: 'C:/xampp/htdocs/gitrepo/ecg_analysis.php',
        url: getSettingsValue('kiosk.port')+'/server/ecg_analysis.php',
        method: 'POST',
        data: {'FunctionName': 'saveData', 'data': JSON.stringify($rootScope.StoreECGRawDataForAnalysis)},
        success: function(data){
          console.log(data);
        },
        error: function(data){
          console.log(data);
        }
      });
    }
    //sending user raw ecg data to ecg_analysis php file ends here

    if(HigiKioskStorageService.returnSessionData('current_mode') != "bpw"){
      HigiKioskStorageService.saveSessionData('current_mode', "ekg");
    }
    $scope.mode=  HigiKioskStorageService.returnSessionData('current_mode');
    var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgInterimResultController', $scope.mode);
    //var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgInterimResultController', $scope);
    $scope.prevSlide = links.previous.link;
    $scope.prevSlideText = "global.back";
    $scope.ECGBpmValue = HigiKioskStorageService.returnSessionData('HeartRate');
	HigiKioskStorageService.saveSessionData('HRforTemp', $scope.ECGBpmValue);
    $scope.PRIntervalValue = HigiKioskStorageService.returnSessionData('PRInterval');
    $scope.QRSDurationValue = HigiKioskStorageService.returnSessionData('QRSDuration');
    $scope.QTCIntervalValue = HigiKioskStorageService.returnSessionData('QTCInterval');
    $scope.PRIntervalValue = $scope.PRIntervalValue * 1000;
    $scope.QRSDurationValue = $scope.QRSDurationValue * 1000;
    $scope.QTCIntervalValue = $scope.QTCIntervalValue * 1000;
    if($rootScope.secondLeadValidation == false){
      console.log("1. Irregular intervals in interim result controller");
      $scope.ecgBadValidation = false;
      $scope.irregularECG = true;
      $rootScope.ecgPoorResult = true;
      $("#symbol").hide();
        HigiKioskStorageService.saveSessionData('MaxHeartRate', "");
        HigiKioskStorageService.saveSessionData('MinHeartRate', "");
    }
  
    if (!($scope.ECGBpmValue >= 60) || !($scope.ECGBpmValue <= 100)) {
      document.getElementById("ecg_heart_rate").style.color = "#f37279";
      $rootScope.invalidHR = true;

    }
    if (!($scope.PRIntervalValue >= 120) || !($scope.PRIntervalValue <= 200)) {
      document.getElementById("ecg_pr_interval").style.color = "#f37279";
      $rootScope.invalidPR = true;

    }
    if (!($scope.QRSDurationValue >= 80) || !($scope.QRSDurationValue <= 120)) {
      document.getElementById("ecg_qrs_interval").style.color = "#f37279";
      $rootScope.invalidQRS = true;

    }
    if ((!($scope.QTCIntervalValue >= 310) || !($scope.QTCIntervalValue <= 450))) {
      document.getElementById("ecg_qtc_interval").style.color = "#f37279";
      $rootScope.invalidQTc = true;

    }

    $scope.ECGBpmRisk = HigiKioskUtilitiesService.calculateEcgHeartRateRisk($scope.ECGBpmValue);
    $scope.ECGPRIntervalRisk = HigiKioskUtilitiesService.calculateEcgPRIntervalRisk($scope.PRIntervalValue);
    $scope.ECGQRSDurationRisk = HigiKioskUtilitiesService.calculateEcgQRSDurationRisk($scope.QRSDurationValue);
    $scope.ECGQTCIntervalRisk = HigiKioskUtilitiesService.calculateEcgQTCIntervalRisk($scope.QTCIntervalValue);

                    if ($scope.ECGBpmRisk == 'Normal' ) {
                        $scope.ECGBpmRiskStatus = 'global.normalbp';
                    }
                    else if ($scope.ECGBpmRisk == 'High' ) {
                        $scope.ECGBpmRiskStatus = 'global.highbp';
                    }
                    else if ($scope.ECGBpmRisk == 'Low' ) {
                        $scope.ECGBpmRiskStatus = 'global.lowbp';
                    }
                    

                    if ($scope.ECGPRIntervalRisk == 'Normal' ) {
                        $scope.ECGPRIntervalRiskStatus = 'global.normalbp';
                    }
                    else if ($scope.ECGPRIntervalRisk == 'High' ) {
                        $scope.ECGPRIntervalRiskStatus = 'global.highbp';
                    }
                    else if ($scope.ECGPRIntervalRisk == 'Low' ) {
                        $scope.ECGPRIntervalRiskStatus = 'global.lowbp';
                    }


                    if ($scope.ECGQRSDurationRisk == 'Normal' ) {
                        $scope.ECGQRSDurationRiskStatus = 'global.normalbp';
                    }
                    else if ($scope.ECGQRSDurationRisk == 'High' ) {
                        $scope.ECGQRSDurationRiskStatus = 'global.highbp';
                    }
                    else if ($scope.ECGQRSDurationRisk == 'Low' ) {
                        $scope.ECGQRSDurationRiskStatus = 'global.lowbp';
                    }


                    if ($scope.ECGQTCIntervalRisk == 'Normal' ) {
                        $scope.ECGQTCIntervalRiskStatus = 'global.normalbp';
                    }
                    else if ($scope.ECGQTCIntervalRisk == 'High' ) {
                        $scope.ECGQTCIntervalRiskStatus = 'global.highbp';
                    }
                    else if ($scope.ECGQTCIntervalRisk == 'Low' ) {
                        $scope.ECGQTCIntervalRiskStatus = 'global.lowbp';
                    }

    $rootScope.showECGEmergencyStopButton = false;
    $rootScope.showExitButton = true;
    $rootScope.RedoTestClicked = false;

    var leadModestatus = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
    setTimeout(function () {
      var datapoints_in_string = HigiKioskStorageService.returnSessionData('ZugECGlead1SmoothGraph');
      var datapoints_in_string2 = HigiKioskStorageService.returnSessionData('ZugECGlead2SmoothGraph');
      var datapoints_in_string3 = HigiKioskStorageService.returnSessionData('ZugECGlead3SmoothGraph');
      //    console.log("threeleaddata1   " + datapoints_in_string);
      //    console.log("threeleaddata2   " + datapoints_in_string2);
      //   console.log("threeleaddata3   " + datapoints_in_string3);
      var datapoints_in_string1 = HigiKioskStorageService.returnSessionData('sixleadZugECGlead1SmoothGraph');
      var datapoints_in_stringII = HigiKioskStorageService.returnSessionData('sixleadZugECGlead2SmoothGraph');
      var datapoints_in_stringIII = HigiKioskStorageService.returnSessionData('sixleadZugECGlead3SmoothGraph');
      var datapoints_in_stringAVR = HigiKioskStorageService.returnSessionData('sixleadZugECGlead4SmoothGraph');
      var datapoints_in_stringAVF = HigiKioskStorageService.returnSessionData('sixleadZugECGlead5SmoothGraph');
      var datapoints_in_stringAVL = HigiKioskStorageService.returnSessionData('sixleadZugECGlead6SmoothGraph');
      /*
      console.log("sixleaddata1   " + datapoints_in_string1);
      console.log("sixleaddata2   " + datapoints_in_stringII);
      console.log("sixleaddata3   " + datapoints_in_stringIII);
      console.log("sixleaddata4   " + datapoints_in_stringAVR);
      console.log("sixleaddata5   " + datapoints_in_stringAVF);
      console.log("sixleaddata6   " + datapoints_in_stringAVL);    
      */



      var ecgLeadIArraySmoothGraph = [];


      if (leadModestatus == 3) {
        ecgLeadIArraySmoothGraph = [];

        for (var h = 0; h < datapoints_in_string.length; h++) {
          ecgLeadIArraySmoothGraph.push(parseFloat(datapoints_in_string[h]));
        }

        $scope.ecgLeadIMaximumValue = findMaxCealing(ecgLeadIArraySmoothGraph);
        $scope.ecgLeadIMinimumValue = findMinCealing(ecgLeadIArraySmoothGraph);
        if (($scope.ecgLeadIMaximumValue) <= 1500 && ($scope.ecgLeadIMinimumValue) >= -500) {
          $scope.ecgLeadIMaximumValue = 1500;
          $scope.ecgLeadIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIMaximumValue) <= 1000 && ($scope.ecgLeadIMinimumValue) >= -1000) {
          $scope.ecgLeadIMaximumValue = 1000;
          $scope.ecgLeadIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIMaximumValue) <= 500 && ($scope.ecgLeadIMinimumValue) >= -1500) {
          $scope.ecgLeadIMaximumValue = 500;
          $scope.ecgLeadIMinimumValue = -1500;
        }
        var ecgLeadIIArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_string2.length; h++) {
          ecgLeadIIArraySmoothGraph.push(parseFloat(datapoints_in_string2[h]));
        }

        $scope.ecgLeadIIMaximumValue = findMaxCealing(ecgLeadIIArraySmoothGraph);
        $scope.ecgLeadIIMinimumValue = findMinCealing(ecgLeadIIArraySmoothGraph);
        if (($scope.ecgLeadIIMaximumValue) <= 1500 && ($scope.ecgLeadIIMinimumValue) >= -500) {
          $scope.ecgLeadIIMaximumValue = 1500;
          $scope.ecgLeadIIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIIMaximumValue) <= 1000 && ($scope.ecgLeadIIMinimumValue) >= -1000) {
          $scope.ecgLeadIIMaximumValue = 1000;
          $scope.ecgLeadIIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIIMaximumValue) <= 500 && ($scope.ecgLeadIIMinimumValue) >= -1500) {
          $scope.ecgLeadIIMaximumValue = 500;
          $scope.ecgLeadIIMinimumValue = -1500;
        }

        var ecgLeadIIIArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_string3.length; h++) {
          ecgLeadIIIArraySmoothGraph.push(parseFloat(datapoints_in_string3[h]));
        }

        $scope.ecgLeadIIIMaximumValue = findMaxCealing(ecgLeadIIIArraySmoothGraph);
        $scope.ecgLeadIIIMinimumValue = findMinCealing(ecgLeadIIIArraySmoothGraph);

        if (($scope.ecgLeadIIIMaximumValue) <= 1500 && ($scope.ecgLeadIIIMinimumValue) >= -500) {
          $scope.ecgLeadIIIMaximumValue = 1500;
          $scope.ecgLeadIIIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIIIMaximumValue) <= 1000 && ($scope.ecgLeadIIIMinimumValue) >= -1000) {
          $scope.ecgLeadIIIMaximumValue = 1000;
          $scope.ecgLeadIIIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIIIMaximumValue) <= 500 && ($scope.ecgLeadIIIMinimumValue) >= -1500) {
          $scope.ecgLeadIIIMaximumValue = 500;
          $scope.ecgLeadIIIMinimumValue = -1500;
        }
        /*
        console.log("Lead I Max  "+$scope.ecgLeadIMaximumValue);
        console.log("Lead II Max  "+$scope.ecgLeadIIMaximumValue);
        console.log("Lead III Max  "+$scope.ecgLeadIIIMaximumValue);
        console.log("Lead I Min  "+$scope.ecgLeadIMinimumValue);
        console.log("Lead II Min  "+$scope.ecgLeadIIMinimumValue);
        console.log("Lead III Min  "+$scope.ecgLeadIIIMinimumValue);
      */
      }

      else {
        ecgLeadIArraySmoothGraph = [];

        for (var h = 0; h < datapoints_in_string1.length; h++) {
          ecgLeadIArraySmoothGraph.push(parseFloat(datapoints_in_string1[h]));
        }
        $scope.ecgLeadIMaximumValue = 0;
        $scope.ecgLeadIMinimumValue = 0;
        $scope.ecgLeadIMaximumValue = findMaxCealing(ecgLeadIArraySmoothGraph);
        $scope.ecgLeadIMinimumValue = findMinCealing(ecgLeadIArraySmoothGraph);
        if (($scope.ecgLeadIMaximumValue) <= 1500 && ($scope.ecgLeadIMinimumValue) >= -500) {
          $scope.ecgLeadIMaximumValue = 1500;
          $scope.ecgLeadIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIMaximumValue) <= 1000 && ($scope.ecgLeadIMinimumValue) >= -1000) {
          $scope.ecgLeadIMaximumValue = 1000;
          $scope.ecgLeadIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIMaximumValue) <= 500 && ($scope.ecgLeadIMinimumValue) >= -1500) {
          $scope.ecgLeadIMaximumValue = 500;
          $scope.ecgLeadIMinimumValue = -1500;
        }

        var ecgLeadIIArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_stringII.length; h++) {
          ecgLeadIIArraySmoothGraph.push(parseFloat(datapoints_in_stringII[h]));
        }
        $scope.ecgLeadIIMaximumValue = 0;
        $scope.ecgLeadIIMinimumValue = 0;
        $scope.ecgLeadIIMaximumValue = findMaxCealing(ecgLeadIIArraySmoothGraph);
        $scope.ecgLeadIIMinimumValue = findMinCealing(ecgLeadIIArraySmoothGraph);
        if (($scope.ecgLeadIIMaximumValue) <= 1500 && ($scope.ecgLeadIIMinimumValue) >= -500) {
          $scope.ecgLeadIIMaximumValue = 1500;
          $scope.ecgLeadIIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIIMaximumValue) <= 1000 && ($scope.ecgLeadIIMinimumValue) >= -1000) {
          $scope.ecgLeadIIMaximumValue = 1000;
          $scope.ecgLeadIIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIIMaximumValue) <= 500 && ($scope.ecgLeadIIMinimumValue) >= -1500) {
          $scope.ecgLeadIIMaximumValue = 500;
          $scope.ecgLeadIIMinimumValue = -1500;
        }

        var ecgLeadIIIArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_stringIII.length; h++) {
          ecgLeadIIIArraySmoothGraph.push(parseFloat(datapoints_in_stringIII[h]));
        }
        $scope.ecgLeadIIIMaximumValue = 0;
        $scope.ecgLeadIIIMinimumValue = 0;
        $scope.ecgLeadIIIMaximumValue = findMaxCealing(ecgLeadIIIArraySmoothGraph);
        $scope.ecgLeadIIIMinimumValue = findMinCealing(ecgLeadIIIArraySmoothGraph);
        if (($scope.ecgLeadIIIMaximumValue) <= 1500 && ($scope.ecgLeadIIIMinimumValue) >= -500) {
          $scope.ecgLeadIIIMaximumValue = 1500;
          $scope.ecgLeadIIIMinimumValue = -500;
        }
        else if (($scope.ecgLeadIIIMaximumValue) <= 1000 && ($scope.ecgLeadIIIMinimumValue) >= -1000) {
          $scope.ecgLeadIIIMaximumValue = 1000;
          $scope.ecgLeadIIIMinimumValue = -1000;
        }
        else if (($scope.ecgLeadIIIMaximumValue) <= 500 && ($scope.ecgLeadIIIMinimumValue) >= -1500) {
          $scope.ecgLeadIIIMaximumValue = 500;
          $scope.ecgLeadIIIMinimumValue = -1500;
        }

        var ecgLeadAVRArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_stringAVR.length; h++) {
          ecgLeadAVRArraySmoothGraph.push(parseFloat(datapoints_in_stringAVR[h]));
        }
        $scope.ecgLeadAVRMaximumValue = 0;
        $scope.ecgLeadAVRMinimumValue = 0;
        $scope.ecgLeadAVRMaximumValue = findMaxCealing(ecgLeadAVRArraySmoothGraph);
        $scope.ecgLeadAVRMinimumValue = findMinCealing(ecgLeadAVRArraySmoothGraph);
        if (($scope.ecgLeadAVRMaximumValue) <= 1500 && ($scope.ecgLeadAVRMinimumValue) >= -500) {
          $scope.ecgLeadAVRMaximumValue = 1500;
          $scope.ecgLeadAVRMinimumValue = -500;
        }
        else if (($scope.ecgLeadAVRMaximumValue) <= 1000 && ($scope.ecgLeadAVRMinimumValue) >= -1000) {
          $scope.ecgLeadAVRMaximumValue = 1000;
          $scope.ecgLeadAVRMinimumValue = -1000;
        }
        else if (($scope.ecgLeadAVRMaximumValue) <= 500 && ($scope.ecgLeadAVRMinimumValue) >= -1500) {
          $scope.ecgLeadAVRMaximumValue = 500;
          $scope.ecgLeadAVRMinimumValue = -1500;
        }
        var ecgLeadAVFArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_stringAVF.length; h++) {
          ecgLeadAVFArraySmoothGraph.push(parseFloat(datapoints_in_stringAVF[h]));
        }
        $scope.ecgLeadAVFMaximumValue = 0;
        $scope.ecgLeadAVFMinimumValue = 0;
        $scope.ecgLeadAVFMaximumValue = findMaxCealing(ecgLeadAVFArraySmoothGraph);
        $scope.ecgLeadAVFMinimumValue = findMinCealing(ecgLeadAVFArraySmoothGraph);
        if ($scope.ecgLeadAVFMaximumValue <= 1500 && $scope.ecgLeadAVFMinimumValue >= -500) {
          $scope.ecgLeadAVFMaximumValue = 1500;
          $scope.ecgLeadAVFMinimumValue = -500;
        }
        else if ($scope.ecgLeadAVFMaximumValue <= 1000 && $scope.ecgLeadAVFMinimumValue >= -1000) {
          $scope.ecgLeadAVFMaximumValue = 1000;
          $scope.ecgLeadAVFMinimumValue = -1000;
        }
        else if ($scope.ecgLeadAVFMaximumValue <= 500 && $scope.ecgLeadAVFMinimumValue >= -1500) {
          $scope.ecgLeadAVFMaximumValue = 500;
          $scope.ecgLeadAVFMinimumValue = -1500;
        }
        var ecgLeadAVLArraySmoothGraph = [];
        for (var h = 0; h < datapoints_in_stringAVL.length; h++) {
          ecgLeadAVLArraySmoothGraph.push(parseFloat(datapoints_in_stringAVL[h]));
        }
        $scope.ecgLeadAVLMaximumValue = 0;
        $scope.ecgLeadAVLMinimumValue = 0;
        $scope.ecgLeadAVLMaximumValue = findMaxCealing(ecgLeadAVLArraySmoothGraph);
        $scope.ecgLeadAVLMinimumValue = findMinCealing(ecgLeadAVLArraySmoothGraph);

        if (($scope.ecgLeadAVLMaximumValue) <= 1500 && ($scope.ecgLeadAVLMinimumValue) >= -500) {
          $scope.ecgLeadAVLMaximumValue = 1500;
          $scope.ecgLeadAVLMinimumValue = -500;
        }
        else if (($scope.ecgLeadAVLMaximumValue) <= 1000 && ($scope.ecgLeadAVLMinimumValue) >= -1000) {
          $scope.ecgLeadAVLMaximumValue = 1000;
          $scope.ecgLeadAVLMinimumValue = -1000;
        }
        else if (($scope.ecgLeadAVLMaximumValue) <= 500 && ($scope.ecgLeadAVLMinimumValue) >= -1500) {
          $scope.ecgLeadAVLMaximumValue = 500;
          $scope.ecgLeadAVLMinimumValue = -1500;
        }
        /*
        console.log("Lead I Max  "+$scope.ecgLeadIMaximumValue);
        console.log("Lead II Max  "+$scope.ecgLeadIIMaximumValue);
        console.log("Lead III Max  "+$scope.ecgLeadIIIMaximumValue);
        console.log("Lead I Min  "+$scope.ecgLeadIMinimumValue);
        console.log("Lead II Min  "+$scope.ecgLeadIIMinimumValue);
        console.log("Lead III Min  "+$scope.ecgLeadIIIMinimumValue);
        console.log("Lead AVR Max  "+$scope.ecgLeadAVRMaximumValue);
        console.log("Lead AVF Max  "+$scope.ecgLeadAVFMaximumValue);
        console.log("Lead AVL Max  "+$scope.ecgLeadAVLMaximumValue);
        console.log("Lead AVR Min  "+$scope.ecgLeadAVRMinimumValue);
        console.log("Lead AVF Min  "+$scope.ecgLeadAVFMinimumValue);
        console.log("Lead AVL Min  "+$scope.ecgLeadAVLMinimumValue);
        */

      }

      if (leadModestatus == 3) {
        if (datapoints_in_string != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;

          $scope.ThreeLeadOne = true;
          $scope.ThreeLeadTwo = false;
          $scope.ThreeLeadTwo = false;
          $scope.localResultChart(datapoints_in_string);
          $scope.localResultChartt(datapoints_in_string);

        }
        if (datapoints_in_string2 != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;

          $scope.ThreeLeadOne = false;
          $scope.ThreeLeadThree = false;

          $scope.ThreeLeadTwo = true;

          $scope.localResult(datapoints_in_string2);
          $scope.localResultChartt(datapoints_in_string2);

        }
        if (datapoints_in_string3 != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;

          $scope.ThreeLeadOne = false;
          $scope.ThreeLeadTwo = false;

          $scope.ThreeLeadThree = true;
          $scope.localResult3(datapoints_in_string3);
          $scope.localResultChartt(datapoints_in_string3);
        }
      }
      else if (leadModestatus == 6) {
        if (datapoints_in_string1 != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = true;
          $scope.SixLeadTwo = false;

          $scope.SixLeadThree = false;

          $scope.SixLeadFour = false;
          $scope.SixLeadFive = false;

          $scope.SixLeadSix = false;
          $scope.localResult1(datapoints_in_string1);
          $scope.f1localResult1(datapoints_in_string1);
        }
        if (datapoints_in_stringII != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = false;
          $scope.SixLeadTwo = true;

          $scope.SixLeadThree = false;

          $scope.SixLeadFour = false;
          $scope.SixLeadFive = false;

          $scope.SixLeadSix = false;

          $scope.localResult2(datapoints_in_stringII);
          $scope.f1localResult1(datapoints_in_stringII);
        }
        if (datapoints_in_stringIII != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = false;
          $scope.SixLeadTwo = false;

          $scope.SixLeadThree = true;

          $scope.SixLeadFour = false;
          $scope.SixLeadFive = false;

          $scope.SixLeadSix = false;

          $scope.localResultIII(datapoints_in_stringIII);
          $scope.f1localResult1(datapoints_in_stringIII);
        }
        if (datapoints_in_stringAVR != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = false;
          $scope.SixLeadTwo = false;

          $scope.SixLeadThree = false;

          $scope.SixLeadFour = true;
          $scope.SixLeadFive = false;

          $scope.SixLeadSix = false;

          $scope.localResult4(datapoints_in_stringAVR);
          $scope.f1localResult1(datapoints_in_stringAVR);
        }
        if (datapoints_in_stringAVF != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = false;
          $scope.SixLeadTwo = false;

          $scope.SixLeadThree = false;

          $scope.SixLeadFour = false;
          $scope.SixLeadFive = true;

          $scope.SixLeadSix = false;

          $scope.localResult5(datapoints_in_stringAVF);
          $scope.f1localResult1(datapoints_in_stringAVF);
        }
        if (datapoints_in_stringAVL != undefined) {
          xAxisStripLinesArrayt = [];
          yAxisStripLinesArrayt = [];
          dpst = [];
          dataPointsArrayt = new Array();
          maximumPeakt = 0;
          minimumPeakt = 0;
          finalPeakt = 0;
          $scope.SixLeadOne = false;
          $scope.SixLeadTwo = false;

          $scope.SixLeadThree = false;

          $scope.SixLeadFour = false;
          $scope.SixLeadFive = false;

          $scope.SixLeadSix = true;

          $scope.localResult6(datapoints_in_stringAVL);
          $scope.f1localResult1(datapoints_in_stringAVL);
        }
        if (datapoints_in_string1 == undefined || datapoints_in_stringII == undefined || datapoints_in_stringIII == undefined || datapoints_in_stringAVR == undefined || datapoints_in_stringAVL == undefined || datapoints_in_stringAVF == undefined) {
          $scope.showGraph = false;
        }
      }
    }, 7000);
    $scope.isGraphLoaded = false;
    $("#bloodpressure_results").show();
    $("#three_lead_mode").css("display", "none");
    $("#five_lead_mode_first_three_graphs").css("display", "none");
    $("#five_lead_mode_next_three_graphs").css("display", "none");
    if ($rootScope.zugECGBadAbortResponse == true) {
      $scope.nextVisible = true;
      $scope.redoVisible = true;
      $scope.showLoadText = false;
      $scope.prevIsVisible = false;
      $scope.secondnextVisible = false;
      $scope.exitNextVisible = false;
    }
    else {
      setTimeout(function () {
        if ($rootScope.lead1PythonSocketSuccess == true && $scope.showGraph == true && $scope.ecgBadValidation == true) {
          $scope.nextVisible = true;
          // $scope.redoVisible = true;
          $scope.secondnextVisible = false;
          $scope.exitNextVisible = false;
          //$scope.prevIsVisible = false;
          // document.getElementById("load_text").innerHTML = $scope.interfaceLabels[$scope.viewECGGraphMessage];
          // $('#ecg_local_result_loading_container').css('display','none');
          // $('#ecg_local_result_loaded_container').css('display','block');
          // $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
          $scope.isGraphLoaded = true;
        }
        else {
          $scope.nextVisible = false;
          $scope.redoVisible = true;
          $scope.secondnextVisible = false;
          $scope.exitNextVisible = false;
          $scope.prevIsVisible = false;
          //document.getElementById("load_text").innerHTML = $scope.interfaceLabels[$scope.viewECGRedoMessage];

        }
      }, 10000);
    }
    $scope.promise = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[0].filename], $scope).promise;
    $timeout(function () {
      $scope.promise2 = HigiKioskAnimationService.playAudioPromise($scope.interfaceLabels[$scope.audioFiles[1].filename], $scope);
    }, 3000);

    if ($rootScope.higiTopNavHidden) {
      $timeout(function () {
        $rootScope.higiTopNavHidden = false;
        $rootScope.slideInNav = "slideIn";
      }, 1000);
    }
    $scope.buttonExitRight = "button-exit-right";
    $scope.buttonEnterRight = "button-enter-right";
    $scope.buttonExitLeft = "button-exit-left";
    $scope.buttonEnterLeft = "button-enter-left";

    var calculatePulseDegrees = function (pulseInput) {
      if (pulseInput > 120) {
        pulseDegrees = 80; //max degrees
      }
      else if (pulseInput < 40) {
        pulseDegrees = -80  //min degrees
      }
      else {
        pulseDegrees = (pulseInput * 2) + -160; // from 60 to 100, degrees -80 to 80
      }
      return pulseDegrees;
    };

    var pulseRisk = HigiKioskUtilitiesService.calculatePulseRisk($scope.pulse);
    if (pulseRisk == 'high') {
      $scope.pulseRiskClass = 'high';
      $scope.pulseRisk = 'global.highpulse';
    }
    else if (pulseRisk == 'low') {
      $scope.pulseRiskClass = 'low';
      $scope.pulseRisk = 'global.lowpulse';

    }
    else if (pulseRisk == 'acceptable') {
      $scope.pulseRiskClass = 'normal';
      $scope.pulseRisk = 'zugECG3.acceptable';

    }
    else if (pulseRisk == 'check with healthcare provider') {
      $scope.pulseRiskClass = 'high';
      $scope.pulseRisk = 'global.check_healthcare_provider';

    }
    else {
      $scope.pulseRiskClass = 'normal';
      $scope.pulseRisk = 'global.normalbp';
    }

    $scope.slideTitle = "global.ecgtitledisp";
    $scope.slideSubTitle = 'global.results';
    $scope.eg03ecg = 'ecg03.ecg';
    $scope.bpPulse = 'global.pulse';
    $scope.bpBpm = 'global.bpm';
    $scope.redoSlideText = 'global.redo';
    $scope.ecgTitle = 'global.ecgtitledisp';
    //$scope.nextSlideText = 'global.continue';
    $scope.normalstatusresult = "global.norm";
    $scope.abnormalstatusresult = "global.requiredoctor";
    $scope.abnormalstatuslowpulse = "global.lowpulseecg";
    $scope.abnormalstatushighpulse = "global.highpulseecg";
    $scope.eg03BeatsPerMinute = 'ecg03.beatsperminute';
    $scope.redoText = 'global.redo';
    $scope.eg03WantAverage = 'ecg03.want.to.average';
    $scope.eg03TapRedo = 'ecg03.tap.redo';
    $scope.bp03AverageMyResults = 'bloodpressure03.average.my.results';
    $scope.bp03ShowAllResults = 'bloodpressure03.show.all.results';
    $rootScope.pulseRiskClassTemp = $scope.pulseRiskClass;
    var leadModestatus = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');

    if (leadModestatus == 3) {

      if ($rootScope.secondLeadValidation == false) {
        $scope.irregularECG = true;
        // $rootScope.ecgPoorResult = true;
        $scope.ecgvalidationstatusresultIrregular = $scope.interfaceLabels[$scope.irregularECGInterval];
        $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.irregularECG];
        HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        HigiKioskStorageService.saveSessionData('IrregularECGStatus', $scope.ecgvalidationstatusresultIrregular);
        $scope.MinECGBpmValue = HigiKioskStorageService.returnSessionData('MinHeartRate');
        $scope.MaxECGBpmValue = HigiKioskStorageService.returnSessionData('MaxHeartRate');

      }
      else if (($rootScope.invalidHR == true) || ($rootScope.invalidHR == true && $rootScope.invalidPR == true && $rootScope.invalidQRS == true && $rootScope.invalidQTc == true)) {
        document.getElementById("ecg_status").style.color = "#f37279";
        if($rootScope.secondLeadHeartRateLessThanThirty == true && $rootScope.lowpulse == true){
            $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.abnormalstatuslowpulse];
            HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        }
        else if($rootScope.secondLeadHeartRateLessThanThirty == true && $rootScope.highpulse == true){
          $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.abnormalstatushighpulse];
          HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        }
      }
      else if ($rootScope.secondLeadValidation == true && $rootScope.invalidHR == false || $rootScope.invalidPR == false || $rootScope.invalidQRS == false || $rootScope.invalidQTc == false && $rootScope.zugECGBadAbortResponse == false && HigiKioskStorageService.returnSessionData('zugEcgValidationResultforLead2') == "Normal") {
        $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.normalstatusresultInterimResult];
        HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
      }
    } else {
      if ($rootScope.secondLeadValidation == false) {
        $scope.irregularECG = true;
        $scope.ecgvalidationstatusresultIrregular = $scope.interfaceLabels[$scope.irregularECGInterval];
        $scope.eCGRedoMessage = $scope.interfaceLabels[$scope.viewECGRedoMessage];
        $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.irregularECG];
        HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        HigiKioskStorageService.saveSessionData('IrregularECGStatus', $scope.ecgvalidationstatusresultIrregular);
        $scope.MinECGBpmValue = HigiKioskStorageService.returnSessionData('MinHeartRate');
        $scope.MaxECGBpmValue = HigiKioskStorageService.returnSessionData('MaxHeartRate');
      }
      else if (($rootScope.invalidHR == true) || ($rootScope.invalidHR == true && $rootScope.invalidPR == true && $rootScope.invalidQRS == true && $rootScope.invalidQTc == true)) {
        document.getElementById("ecg_status").style.color = "#f37279";
        if($rootScope.secondLeadHeartRateLessThanThirty == true && $rootScope.lowpulse == true){
            $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.abnormalstatuslowpulse];
            HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        }
        else if($rootScope.secondLeadHeartRateLessThanThirty == true && $rootScope.highpulse == true){
          $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.abnormalstatushighpulse];
          HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
        }
      }
      else if ($rootScope.secondLeadValidation == true && $rootScope.invalidHR == false || $rootScope.invalidPR == false || $rootScope.invalidQRS == false || $rootScope.invalidQTc == false && $rootScope.zugECGBadAbortResponse == false && HigiKioskStorageService.returnSessionData('SixLeadleadTwoStatusResult') == "Normal") {
        $scope.ecgvalidationstatusresult = $scope.interfaceLabels[$scope.normalstatusresultInterimResult];
        HigiKioskStorageService.saveSessionData('ECGStatus', $scope.ecgvalidationstatusresult);
      }
    }

     if(($scope.ECGBpmValue >= 51 && $scope.ECGBpmValue <= 115) && ($scope.PRIntervalValue >= 102 && $scope.PRIntervalValue <= 230) && ($scope.QRSDurationValue >= 68 && $scope.QRSDurationValue <= 138) && ($scope.QTCIntervalValue >= 264 && $scope.QTCIntervalValue <= 518)){
      //$scope.ecgvalidationstatusresult = "Normal"; // Show default value based on above condition
    }else{
      $scope.ecgvalidationstatusresult = "Clinical Screening Recommended";
    }
    
    $scope.pulseDegrees = calculatePulseDegrees($scope.pulse);
    var links = HigiKioskFlow.slideLinks('HigiKioskZUGEcgInterimResultController', $scope);
    $scope.setSlideDirection($routeParams.direction);
    $scope.isvisible = true;
    if ($rootScope.mode == "bpw") {
      var mode = "bpw";
      var currenttest = "ECG";
      var nextTestPath = HigiKioskFlow.nextTest(mode, currenttest);
      $scope.nextSlide = nextTestPath;
      //$scope.nextSlideText = "global.continue";
    }
    else {
      $scope.nextSlide = "#/finish/forward";
      //$scope.nextSlideText = links.next.label;
    }

    
    $scope.redoSlideText = 'globalecg.redo';
    $scope.redoSlide = '#/zugecgmode/back';
    if (links.previous == null) {
      $scope.prevIsVisible = false;
      $scope.prevSlide = "";
      $scope.prevSlideText = "";
    } else {
      $scope.prevSlide = links.previous.link;
      $scope.prevSlideText = "global.back";
      $scope.prevIsVisible = false;
    }
    $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_ecg_check_up_summary');
  };

  $scope.redoeg = function () {
    console.log("Starting ECG OnClicking REDO");
    $rootScope.RedoTestClicked = true;
    $scope.redoVisible = false;
    $scope.nextVisible = false;
    $scope.secondnextVisible = false;
    $scope.exitNextVisible = false;
    $scope.redoECGVisible = false;
    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + 'redoeg_Button', 'button', 'pressed');
    $scope.pageClass = 'slide back';
    //$("#ecgSwitchOnMessageInstruction").hide();
    window.location = $scope.redoSlide;
  };

  $scope.backButtonOut = function () {
    if(leadModestatus == 3){
      if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_ecg_check_up_summary');
        return;
      }
      // if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
      //   return;
      // }
    }
    if(leadModestatus == 6){
      if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_ecg_check_up_summary');
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_2').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
        return;
      }
      // if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_graph_set_2').hasClass('ecg_local_result_navbar_tab_active')){
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_2');
      //   return;
      // }
    }
    return;
    // --------------------------------------------Existing Code -----------------------
    var leadModeNumber = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
    if (leadModeNumber == 3) {
      $scope.prevIsVisible = false;
      $scope.redoVisible = true;
      $scope.nextVisible = true;
      $scope.exitNextVisible = false;
      $scope.redoECGVisible = false;
      $("#bloodpressure_results").show();
      $("#three_lead_mode").css("display", "none");
      $("#five_lead_mode_first_three_graphs").css("display", "none");
      $("#five_lead_mode_next_three_graphs").css("display", "none");
    }
    else if (leadModeNumber == 6) {
      if ($scope.exitNextVisible == true && $scope.prevIsVisible == true) {
        $scope.exitNextVisible = false;
        $scope.secondnextVisible = true;
        $scope.redoECGVisible = true;

        $("#bloodpressure_results").hide();
        $("#three_lead_mode").css("display", "none");
        $("#five_lead_mode_first_three_graphs").css("display", "block");
        $("#five_lead_mode_next_three_graphs").css("display", "none");
      }
      else if ($scope.secondnextVisible == true && $scope.prevIsVisible == true) {
        $scope.secondnextVisible = false;
        $scope.redoVisible = true;
        $scope.nextVisible = true;
        $scope.prevIsVisible = false;
        $scope.redoECGVisible = false;
        $("#bloodpressure_results").show();
        $("#three_lead_mode").css("display", "none");
        $("#five_lead_mode_first_three_graphs").css("display", "none");
        $("#five_lead_mode_next_three_graphs").css("display", "none");
      }
    }
  }

  $scope.nextButtonOut = function () {
    if(leadModestatus == 3){
      if($rootScope.secondLeadValidation == false){
        $scope.exitNextfunction();
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
        // Move to save result page
        $scope.exitNextfunction();
        return;
      }
      if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
        // Move to summary page
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
        return;
      }
      // if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
      //   // Move to save result page
      //   $scope.exitNextfunction();
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
      //   // Move to summary page
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_ecg_check_up_summary');
      //   return;
      // }
    }
    if(leadModestatus == 6){
      if($rootScope.secondLeadValidation == false){
        $scope.exitNextfunction();
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_2').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.exitNextfunction();
        return;
      }
      if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_2');
        return;
      }
      if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
        $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_1');
        return;
      }

      // if($('#ecg_local_result_navbar_tab_ecg_check_up_summary').hasClass('ecg_local_result_navbar_tab_active')){
      //   // Move to save result page
      //   $scope.exitNextfunction();
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_graph_set_1').hasClass('ecg_local_result_navbar_tab_active')){
      //   // Move to graph set 2
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_graph_set_2');
      //   return;
      // }
      // if($('#ecg_local_result_navbar_tab_graph_set_2').hasClass('ecg_local_result_navbar_tab_active')){
      //   // Move to summary page
      //   $scope.ecgLocalResultNavbarNavigate('ecg_local_result_navbar_tab_ecg_check_up_summary');
      //   return;
      // }
    }
    return;
    // -----------------------------------------------------Existing Code -----------------------
    JkioskService.logEvent(HigiKioskStorageService.returnSessionData('higiPageName') + '_nextButton', 'button', 'pressed');
    $scope.nextVisible = false;
    $scope.prevSlideText = "global.back";
    document.getElementById("load_text").innerHTML = "";
    $("#bloodpressure_results").css("display", "none");
    var leadModeNumber = HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
    if (leadModeNumber == 3) {
      $scope.redoVisible = true;
      $scope.exitNextVisible = true;
      $scope.prevIsVisible = true;
      $scope.redoECGVisible = true;
      $("#three_lead_mode").css("display", "block");
      $("#five_lead_mode_first_three_graphs").css("display", "none");
      $("#five_lead_mode_next_three_graphs").css("display", "none");
    }
    else if (leadModeNumber == 6) {
      $scope.redoVisible = true;
      $scope.prevSlideText = "global.back";
      $scope.secondnextVisible = true;
      $scope.prevIsVisible = true;
      $scope.redoECGVisible = true;
      $("#bloodpressure_results").hide();
      $("#three_lead_mode").css("display", "none");
      $("#five_lead_mode_first_three_graphs").css("display", "block");
      $("#five_lead_mode_next_three_graphs").css("display", "none");
    }
  };
  $scope.nextfunction = function () {
    $scope.redoVisible = true;
    $scope.exitNextVisible = true;
    $scope.prevIsVisible = true;
    $scope.secondnextVisible = false;
    $scope.redoECGVisible = true;
    $scope.prevSlideText = "global.back";
    $("#bloodpressure_results").hide();
    $("#three_lead_mode").css("display", "none");
    $("#five_lead_mode_first_three_graphs").css("display", "none");
    $("#five_lead_mode_next_three_graphs").css("display", "block");
  }
  $scope.exitNextfunction = function () {
    $scope.setSlideDirection('forward');
    $timeout(function () {
      //window.location = $scope.nextSlide

      if($rootScope.selectedVital.length > 1){        
          $scope.nextSlideText = "global.continue";
          var nextTestPath = HigiKioskFlow.UserSelectNextTest();
          window.location = nextTestPath;
      } else {
          $scope.nextSlideText = "global.finalResult";
          window.location = $scope.nextSlide;
      }   

    }, 500);
  }

  $scope.ecgLocalResultNavbarNavigate = function (current_tab) {
    if(leadModestatus == 3){
      if(current_tab == 'ecg_local_result_navbar_tab_graph_set_1'){
        $('#ecg_local_result_navbar_tab_graph_set_1').addClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
        
        $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        $('#ecg_local_result_block_graph_set_1').css('display','grid');
        $scope.prevIsVisible = true;
        $scope.redoVisible = true;
        if($rootScope.mode == "bpw"){
          $scope.nextSlideText = "global.continue";
        } else if($rootScope.selectedVital.length > 1){
            $scope.nextSlideText = "global.continue";
        }
        else{
          $scope.nextSlideText = "global.finalResult";
        }
        // Handle borders
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 00px 10px 00px');
        $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 10px 0px 00px');
        $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','white');
        return;
        // $('#ecg_local_result_navbar_tab_graph_set_1').addClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
        
        // $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        // $('#ecg_local_result_block_graph_set_1').css('display','grid');
        // $scope.prevIsVisible = false;
        // $scope.redoVisible = false;
        // // Handle borders
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','0px 10px 0px 10px');
        // $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 10px 0px 00px');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,242,242)');
        // return;
      }
      if(current_tab == 'ecg_local_result_navbar_tab_ecg_check_up_summary'){
        $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').addClass('ecg_local_result_navbar_tab_active');
        
        $('#ecg_local_result_block_graph_set_1').css('display','none');
        $('#ecg_local_result_block_ecg_check_up_summary').css('display','flex');
        $scope.prevIsVisible = false;
        $scope.redoVisible = true;
        $scope.nextSlideText = "global.nextPageText";
        // Handle Borders
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 10px 0px 0px');
        $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','0px 0px 0px 10px');
        $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','white');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(180,180,180)');
        return;
        // $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').addClass('ecg_local_result_navbar_tab_active');
        
        // $('#ecg_local_result_block_graph_set_1').css('display','none');
        // $('#ecg_local_result_block_ecg_check_up_summary').css('display','flex');
        // $scope.prevIsVisible = true;
        // $scope.redoVisible = true;
        // // Handle Borders
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','0px 0px 10px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(180,180,180)');
        // return;
      }
    }
    if(leadModestatus == 6){
      if(current_tab == 'ecg_local_result_navbar_tab_graph_set_1'){
        $('#ecg_local_result_navbar_tab_graph_set_1').addClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_graph_set_2').removeClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
  
        $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        $('#ecg_local_result_block_graph_set_2').css('display','none');
        $('#ecg_local_result_block_graph_set_1').css('display','grid');
        $scope.prevIsVisible = true;
        $scope.redoVisible = true;
        $scope.nextSlideText = "global.nextPageText";
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 0px 10px 0px');
        $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','0px 10px 0px 10px');
        $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','white');
        $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,180,180)');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','white');
        return;
        // $('#ecg_local_result_navbar_tab_graph_set_1').addClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_graph_set_2').removeClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
  
        // $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        // $('#ecg_local_result_block_graph_set_2').css('display','none');
        // $('#ecg_local_result_block_graph_set_1').css('display','grid');
        // $scope.prevIsVisible = false;
        // $scope.redoVisible = false;
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','0px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','0px 0px 0px 10px');
        // $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 10px 0px 00px');
        // $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(242,242,242)');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,180,180)');
        // return;
      }
      if(current_tab == 'ecg_local_result_navbar_tab_graph_set_2'){
        $('#ecg_local_result_navbar_tab_graph_set_2').addClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
        
        $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        $('#ecg_local_result_block_graph_set_1').css('display','none');
        $('#ecg_local_result_block_graph_set_2').css('display','grid');
        $scope.prevIsVisible = true;
        $scope.redoVisible = true;
        if($rootScope.mode == "bpw"){
          $scope.nextSlideText = "global.continue";
        } else if($rootScope.selectedVital.length > 1){
          /*if ($scope.nextSlide == "#/finish/forward") {
            $scope.nextSlideText = "global.finalResult";
          }else{
            $scope.nextSlideText = "global.continue";
          }    */
          $scope.nextSlideText = "global.continue";
        }
        else{
          $scope.nextSlideText = "global.finalResult";
        }
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 0px 0px 0px');
        $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','0px 0px 10px 0px');
        $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','10px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','white');
        $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(180,180,180)');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,242,242)');
        return;
        // $('#ecg_local_result_navbar_tab_graph_set_2').addClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').removeClass('ecg_local_result_navbar_tab_active');
        
        // $('#ecg_local_result_block_ecg_check_up_summary').css('display','none');
        // $('#ecg_local_result_block_graph_set_1').css('display','none');
        // $('#ecg_local_result_block_graph_set_2').css('display','grid');
        // $scope.prevIsVisible = true;
        // $scope.redoVisible = false;
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','0px 10px 0px 10px');
        // $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 0px 10px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','10px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        // $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(242,242,242)');
        // return;
      }
      if(current_tab == 'ecg_local_result_navbar_tab_ecg_check_up_summary'){
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').addClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        $('#ecg_local_result_navbar_tab_graph_set_2').removeClass('ecg_local_result_navbar_tab_active');
        
        $('#ecg_local_result_block_graph_set_1').css('display','none');
        $('#ecg_local_result_block_graph_set_2').css('display','none');
        $('#ecg_local_result_block_ecg_check_up_summary').css('display','flex');
        $scope.prevIsVisible = false;
        $scope.redoVisible = true;
        $scope.nextSlideText = "global.nextPageText";
        $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','00px 0px 0px 10px');
        $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','0px 10px 0px 00px');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 10px 0px 0px');
        $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','white');
        return;
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').addClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_graph_set_1').removeClass('ecg_local_result_navbar_tab_active');
        // $('#ecg_local_result_navbar_tab_graph_set_2').removeClass('ecg_local_result_navbar_tab_active');
        
        // $('#ecg_local_result_block_graph_set_1').css('display','none');
        // $('#ecg_local_result_block_graph_set_2').css('display','none');
        // $('#ecg_local_result_block_ecg_check_up_summary').css('display','flex');
        // $scope.prevIsVisible = true;
        // $scope.redoVisible = true;
        // $('#ecg_local_result_navbar_tab_graph_set_1').css('border-radius','10px 0px 0px 00px');
        // $('#ecg_local_result_navbar_tab_graph_set_2').css('border-radius','0px 0px 10px 00px');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary').css('border-radius','10px 10px 0px 0px');
        // $('#ecg_local_result_navbar_tab_graph_set_2_parent').css('background','rgb(242,242,242)');
        // $('#ecg_local_result_navbar_tab_ecg_check_up_summary_parent').css('background','rgb(180,180,180)');
        // $('#ecg_local_result_navbar_tab_graph_set_1_parent').css('background','rgb(242,242,242)');
        // return;
      }
    }
  }

  $scope.getLeadStatus = function (){
    return leadModestatus;
    // return HigiKioskStorageService.returnSessionData('zugEcgLeadMode');
  }
  $scope.init();
  
}]);
