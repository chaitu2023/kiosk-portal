class PrinterServiceClass{
	"use strict";
	kioskMultiPrinterFunctionalityEnable = true;
	printerAvailabilityStatusForInvoice	= "";
	printerAvailabilityStatusForVitalAndPrescription = "";
	thermalPrinterConfiguartionDetails = {};
	a4PrinterConfiguartionDetails = {};
	printerTypeSelected = "";
	printerTemplateObject = {};

	constructor(){

	}

	/*
		@description To get printer hardware configuration & paper details from jkiosk/jkiosk-mock.
	*/
	getMultiPrinterConfigurationDetails(DataToPrint, onSuccessResponse, onErrorResponse){
		const getCallBackResponse = (detail) => {
			console.log("printer details received");
			console.log(detail);
			let printersdetail = detail;
			let thermalPrinterConnectedStatus = false;
			let thermalPrinterPaperStatus = false;
			let a4PrinterConnectedStatus = false;
			let a4PrinterPaperStatus = false;

			if (printersdetail) {

				let thermalPrinterModelDetail = Object.entries(printersdetail).reduce((a, [k, v])=>( ((v.toLowerCase()).indexOf("tm-m30") > -1)?(a[k]=v, a) : a  ), {});
				let a4PrinterModelDetail = Object.entries(printersdetail).reduce((a, [k, v])=>( ((v.toLowerCase()).indexOf("pcl3") > -1)?(a[k]=v, a) : a  ), {});

				if(Object.keys(thermalPrinterModelDetail).length > 0){
					let indexValue = [];
					let thermalPrinterDetail = {};
					let availableThermalPrinters = [];
					for(let keys in thermalPrinterModelDetail){
						indexValue.push(keys.split("_")[1]);
					}

					for(let value of indexValue){
						let obj = {};
						Object.entries(printersdetail).reduce((a, [k, v])=>( ((k.split("_")[1]) == value)?(a[k]=v, a) : a  ), thermalPrinterDetail);
						obj["printerName"] = thermalPrinterDetail["printerName_"+value];
						obj["isInError"] = thermalPrinterDetail["isInError_"+value];
						obj["IsNotAvailable"] = thermalPrinterDetail["IsNotAvailable_"+value];
						obj["isOutOfPaper"] = thermalPrinterDetail["isOutOfPaper_"+value];
						obj["isOffline"] = thermalPrinterDetail["isOffline_"+value];
						obj["isBusy"] = thermalPrinterDetail["isBusy_"+value];
						availableThermalPrinters.push(obj);
					}

					let activeThermalPrinterList = availableThermalPrinters.filter((obj) => {
						return obj["IsNotAvailable"] == "False" && obj["isOffline"] == "False" && obj["isOutOfPaper"] == "False";
					});

					let paperNotAvailableThermalPrinterList = availableThermalPrinters.filter((obj) => {
						return obj["IsNotAvailable"] == "False" && obj["isOffline"] == "False" && obj["isOutOfPaper"] == "True";
					});

					if (activeThermalPrinterList.length > 0) {
						this.thermalPrinterConfiguartionDetails = activeThermalPrinterList[0];
						thermalPrinterConnectedStatus = true;
						thermalPrinterPaperStatus = true;
					}else if (paperNotAvailableThermalPrinterList.length > 0) {
						this.thermalPrinterConfiguartionDetails = paperNotAvailableThermalPrinterList[0];
						thermalPrinterConnectedStatus = true;
					}
					console.log("thermalPrinterConfiguartionDetails");
					console.log(this.thermalPrinterConfiguartionDetails);
				}


				if(Object.keys(a4PrinterModelDetail).length > 0){
					let indexValue = [];
					let a4PrinterDetail = {};
					let availableA4Printers = [];
					for(let keys in a4PrinterModelDetail){
						indexValue.push(keys.split("_")[1]);
					}

					for(let value of indexValue){
						let obj = {};
						Object.entries(printersdetail).reduce((a, [k, v])=>( ((k.split("_")[1]) == value)?(a[k]=v, a) : a  ), a4PrinterDetail);
						obj["printerName"] = a4PrinterDetail["printerName_"+value];
						obj["isInError"] = a4PrinterDetail["isInError_"+value];
						obj["IsNotAvailable"] = a4PrinterDetail["IsNotAvailable_"+value];
						obj["isOutOfPaper"] = a4PrinterDetail["isOutOfPaper_"+value];
						obj["isOffline"] = a4PrinterDetail["isOffline_"+value];
						obj["isBusy"] = a4PrinterDetail["isBusy_"+value];
						availableA4Printers.push(obj);
					}

					let activeA4PrinterList = availableA4Printers.filter((obj) => {
						return obj["IsNotAvailable"] == "False" && obj["isOffline"] == "False" && obj["isOutOfPaper"] == "False";
					});

					let paperNotAvailableA4PrinterList = availableA4Printers.filter((obj) => {
						return obj["IsNotAvailable"] == "False" && obj["isOffline"] == "False" && obj["isOutOfPaper"] == "True";
					});

					if (activeA4PrinterList.length > 0) {
						this.a4PrinterConfiguartionDetails = activeA4PrinterList[0];
						a4PrinterConnectedStatus = true;
						a4PrinterPaperStatus = true;
					}else if (paperNotAvailableA4PrinterList.length > 0) {
						this.a4PrinterConfiguartionDetails = paperNotAvailableA4PrinterList[0];
						a4PrinterConnectedStatus = true;
					}
					console.log("A4PrinterConfiguartionDetails");
					console.log(this.a4PrinterConfiguartionDetails);
				}
			}

			let details = {
          		"thermalPrinterConnectedStatus": thermalPrinterConnectedStatus,
          		"thermalPrinterPaperStatus": thermalPrinterPaperStatus,
          		"a4PrinterConnectedStatus": a4PrinterConnectedStatus,
          		"a4PrinterPaperStatus": a4PrinterPaperStatus
        	};
        	//alert("call");
        	console.log(details);

			this.getAllPrinterDetails(details, DataToPrint, onSuccessResponse, onErrorResponse);
		};
		jkiosk.multiPrinterConfigurationDetails(getCallBackResponse);
	}

	/*
		@description Get overall printer details from jkiosk callback.
		@param  Printer details object.
	*/
	getAllPrinterDetails(printerDetails, DataToPrint, onSuccessResponse, onErrorResponse){
		switch(DataToPrint){
			case "invoice":
				this.populatePrinterAvailabilityStatusForInvoice(printerDetails, DataToPrint, onSuccessResponse, onErrorResponse);
				break;
			case "vitalOrPrescription":
				this.populatePrinterAvailabilityStatusForVitalAndPrescription(printerDetails, DataToPrint, onSuccessResponse, onErrorResponse);
				break;
			default:
				console.error("DataToPrint value for new printer functionality is not valid");
				break;
		}
	}

	/*
		@description Used to initialize printerAvailabilityStatusForInvoice property.
		@param  Printer details object.
	*/
	populatePrinterAvailabilityStatusForInvoice(invoicePrintDetails, DataToPrint, onSuccessResponse, onErrorResponse){
		let detail = invoicePrintDetails;
		if (detail.thermalPrinterConnectedStatus == true && detail.thermalPrinterPaperStatus == true) {
			this.printerAvailabilityStatusForInvoice = "thermal";
		}else if (detail.a4PrinterConnectedStatus == true && detail.a4PrinterPaperStatus == true) {
			this.printerAvailabilityStatusForInvoice = "a4";
		}else if (detail.thermalPrinterConnectedStatus == false && detail.a4PrinterConnectedStatus == false) {
			this.printerAvailabilityStatusForInvoice = "technical_issue";
		}else if (detail.thermalPrinterPaperStatus == false && detail.a4PrinterPaperStatus == false) {
			this.printerAvailabilityStatusForInvoice = "paper_not_available";
		}else if ((detail.thermalPrinterConnectedStatus == true && detail.thermalPrinterPaperStatus == false) && (detail.a4PrinterConnectedStatus == false || detail.a4PrinterConnectedStatus == true)) {
			this.printerAvailabilityStatusForInvoice = "paper_not_available";
		}else if ((detail.thermalPrinterConnectedStatus == false || detail.thermalPrinterConnectedStatus == true) && (detail.a4PrinterConnectedStatus == true && detail.a4PrinterPaperStatus == false)) {
			this.printerAvailabilityStatusForInvoice = "paper_not_available";
		}else{
			this.printerAvailabilityStatusForInvoice = "technical_issue";
		}

		this.getPrinterResponse(DataToPrint, onSuccessResponse, onErrorResponse);
	}

	/*
		@description Used to initialize PrinterAvailabilityStatusForVitalAndPrescription property.
		@param  Printer details object.
	*/
	populatePrinterAvailabilityStatusForVitalAndPrescription(vitalPrintDetails, DataToPrint, onSuccessResponse, onErrorResponse){
		let detail = vitalPrintDetails;

		if (detail.a4PrinterConnectedStatus == true && detail.a4PrinterPaperStatus == true && detail.thermalPrinterConnectedStatus == true && detail.thermalPrinterPaperStatus == true) {
			onSuccessResponse("multiPrinter");
			return;
		}
		
		if (detail.a4PrinterConnectedStatus == true && detail.a4PrinterPaperStatus == true) {
			this.printerAvailabilityStatusForVitalAndPrescription = "a4";
		}else if (detail.thermalPrinterConnectedStatus == true && detail.thermalPrinterPaperStatus == true) {
			this.printerAvailabilityStatusForVitalAndPrescription = "thermal";
		}else if (detail.thermalPrinterConnectedStatus == false && detail.a4PrinterConnectedStatus == false) {
			this.printerAvailabilityStatusForVitalAndPrescription = "technical_issue";
		}else if (detail.thermalPrinterPaperStatus == false && detail.a4PrinterPaperStatus == false) {
			this.printerAvailabilityStatusForVitalAndPrescription = "paper_not_available";
		}else if ((detail.thermalPrinterConnectedStatus == true && detail.thermalPrinterPaperStatus == false) && (detail.a4PrinterConnectedStatus == false || detail.a4PrinterConnectedStatus == true)) {
			this.printerAvailabilityStatusForVitalAndPrescription = "paper_not_available";
		}else if ((detail.thermalPrinterConnectedStatus == false || detail.thermalPrinterConnectedStatus == true) && (detail.a4PrinterConnectedStatus == true && detail.a4PrinterPaperStatus == false)) {
			this.printerAvailabilityStatusForVitalAndPrescription = "paper_not_available";
		}else{
			this.printerAvailabilityStatusForVitalAndPrescription = "technical_issue";
		}

		this.getPrinterResponse(DataToPrint, onSuccessResponse, onErrorResponse);
	}

	/*
		@description receiving the value for which data is to be printed invoice/vital/prescription & then return response.
		@param  value --> invoice/vitalOrPrescription, success --> response to send if printer/paper availability is there, error --> response to send if printer/paper availability is not there.
	*/
	getPrinterResponse(value, success, error){
		switch(value){
			case "invoice":
				if (this.printerAvailabilityStatusForInvoice == "thermal" || this.printerAvailabilityStatusForInvoice == "a4") {
					success(this.printerAvailabilityStatusForInvoice);
				}else{
					error(this.printerAvailabilityStatusForInvoice);
				}
				break;
			case "vitalOrPrescription":
				if (this.printerAvailabilityStatusForVitalAndPrescription == "thermal" || this.printerAvailabilityStatusForVitalAndPrescription == "a4") {
					success(this.printerAvailabilityStatusForVitalAndPrescription);
				}else{
					error(this.printerAvailabilityStatusForVitalAndPrescription);
				}
				break;
			default:
				console.error("value received for new printer functionality is not valid");
				break;
		}
	}

	/*
		@description receiving printer type(a4/thermal) and template object(for thermal and a4 printer) and invoke jkiosk.print function.
		@param  printerType --> a4/thermal, htmlTemplateObj --> Object which containes templates for a4 and thermal printer.
	*/
	invokeJkioskPrinterService(printerType, htmlTemplateObj){
		switch(printerType){
			case "thermal":
				// console.log(htmlTemplateObj['thermalPrinterTemplate']);
				jkiosk.print(htmlTemplateObj['thermalPrinterTemplate'] ,"onJobPrintComplete", "onJobPrintFailed");
				break;
			case "a4":
				//console.log(htmlTemplateObj['a4PrinterTemplate']);
				jkiosk.print(htmlTemplateObj['a4PrinterTemplate'] ,"onJobPrintComplete", "onJobPrintFailed");
				break;
			default:
				console.error("printerType is not valid");
				break;
		}
	}

	closePopup(){
		this.printerTypeSelected = "";
		this.printerTemplateObject = {};
		$('#multiPrinterAvailabilityPopupVisible').hide();
		if (document.getElementById("kiosk_modal_popup") != null && document.getElementById("kiosk_modal_popup") != undefined) {
			document.getElementById("kiosk_modal_popup").style.visibility = "visible";
		}
	}

	printSelectedContents(){
		this.invokeJkioskPrinterService(this.printerTypeSelected, this.printerTemplateObject);
		this.closePopup();
	}
}