
higiKioskControllers.controller('MvmController' , ['$scope', '$routeParams' , '$rootScope', '$location', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $location, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){
	
	$scope.Check = "Good";
	$scope.dispenseMediAllObj = {};	
	$scope.dispenseMediAllBtnEnable = false;
	var medi_Id;
	$scope.mvmStatus = false;
	$scope.progressTxt = false;
	$scope.checkStockBtn = false;
	$scope.offlineInfo = false;
	$(".offlineInfoTxt").text(""); 
	$scope.goHomeShow = false; 
	$scope.nostock = true;
	$scope.homePageBtnShow = false;
/*
    var data = {"username": "667455759988"};
    var dummy = {data  : JSON.stringify(data)};            
    var drugsName;
    var drugsInfo;*/
	
	$scope.init = function(){
		//alert("ihl_machineid = " + ihl_machineid);
		alert($rootScope.MVMAvailable);
		if(!$rootScope.MVMAvailable)
		{
			$("#mvm_available").hide();
			$("#mvm_not_available").show();
		}
		else{
			$("#mvm_not_available").hide();
			$("#mvm_available").show();

		$(".dispenseAll").css("color", "#0261c2");
		
		$scope.prescriptionListSync = false;
		$(".higi_top_container").hide();
		$scope.internetConnectionCheck();

		$timeout(function() {
			if($scope.offlineInfo) {
	         	$scope.offlineInfo = false;
	         	$(".offlineInfoTxt").text(""); 
	         }  else {
	            $scope.offlineInfo = true;
	            $(".offlineInfoTxt").text("You are in offline"); 
	            return false;
        	 }
     	}, 1000);
		
		console.log("medicien prescription fetch from global navigation");
		console.log($rootScope.mediDescr);

		$scope.mediDescr = $rootScope.mediDescr;
	    $timeout(function() { $scope.getMvmStock(); }, 3000);
	    	
		 /*$scope.mediDescr =   [{"ProductName":"medicine 1","medicineId":"0000001", "preQuantity": "1"},		
						 {"ProductName":"medicine 2","medicineId":"0000002", "preQuantity": "1"},
						 {"ProductName":"medicine 3","medicineId":"0000003", "preQuantity": "1"},
						 {"ProductName":"medicine 4","medicineId":"0000004", "preQuantity": "1"},
						 {"ProductName":"medicine 5","medicineId":"0000005", "preQuantity": "1"},		
						 {"ProductName":"medicine 6","medicineId":"0000006", "preQuantity": "1"},
						 {"ProductName":"medicine 7","medicineId":"0000007", "preQuantity": "1"},
						 {"ProductName":"medicine 8","medicineId":"0000008", "preQuantity": "1"}
						];  
	    $timeout(function() { $scope.getMvmStock(); }, 3000);  
		}*/
		
	}

	/*$scope.prescriptionAjaxCall = function(){

                $.ajax({
                    url: " https://idoctor.persistent.co.in/api/patient/getLatestPrescription",
                    type : "POST", 
                    cache: false,
                    data: dummy,                
                    "content-Type": 'application/json; charset=UTF-8',  
                    
                    success: function(res){
                        console.log(res.updated.diagnosis[0].prognosis.drugs);
                        console.log(res.updated.diagnosis[0].prognosis.primary_drugs);
                        drugsName = res.updated.diagnosis[0].prognosis.drugs
                        drugsInfo = res.updated.diagnosis[0].prognosis.primary_drugs;

                        merge_drug_name_and_info();
                    },
                    error : function(xhr, status, error) { 
                        console.log('failures 3');
                        console.log(xhr);
                        console.log(status);
                    } 
                });
	}
	 function merge_drug_name_and_info(){
	    for(var i in drugsName){
	        $scope.mediDescr[i] = {};
	        $scope.mediDescr[i].ProductName = drugsName[i];
	        $scope.mediDescr[i].medicineId = drugIdFineTune(drugsInfo[i].drugId);
	        $scope.mediDescr[i].preQuantity = drugsInfo[i].quantity;
	    }
	    console.log($scope.mediDescr);

	    $timeout(function() { $scope.getMvmStock(); }, 3000);
	 }   
	 function drugIdFineTune(drugId){
	    var drugIdStr = drugId.toString();
	    if(drugIdStr.length < 6){
	        for(var i = drugIdStr.length; i < 5; i++ ){
	            drugIdStr = "0"+drugIdStr;
	        }
	        return drugIdStr;
	    }
	 } */

	$scope.internetConnectionCheck = function(){		
          $.ajax({
            url: getSettingsValue('kiosk.api.url') +"/",
             type: 'GET',
             crossDomain: true,
             success: function(result) {
             	$scope.offlineInfo = true;
             	$(".offlineInfoTxt").text("You are in offline"); 
             },
             error: function(res) {
                $scope.offlineInfo = false;
                $(".offlineInfoTxt").text(""); 
             }
         });
	}

	$scope.mvmStockResonse = function(Res){
		console.log(Res);
		$scope.mediDescrCopy = $scope.mediDescr;
		console.log($scope.mediDescrCopy);
		$scope.stockList = JSON.parse(Res['mvmStockListRes']);
		$("#mvmSyncTxt").text("");
		
		$scope.mergeUnionList = [];
		$scope.prescriptionMedi = [];
		$scope.medicine = [];

		for (var i in $scope.mediDescrCopy){
			var obj = {Id: $scope.mediDescrCopy[i].Id, ProductName: $scope.mediDescrCopy[i].ProductName, preQuantity: $scope.mediDescrCopy[i].preQuantity}; // dynamic generate perscription list

			//var obj = {Id: $scope.mediDescrCopy[i].medicineId, ProductName: $scope.mediDescrCopy[i].ProductName, preQuantity: $scope.mediDescrCopy[i].preQuantity}; // hard code medicine_id list


			for (var j in $scope.stockList) {
				// if ($scope.mediDescrCopy[i].medicineId == $scope.stockList[j].medicineId) {// hard code perscription data avaliable check
		        if ($scope.mediDescrCopy[i].Id == $scope.stockList[j].medicineId) {// dynamic generate perscription data avaliable check
		            obj.Rotator = $scope.stockList[j].rotatorNumber;
		            obj.ProductCost = $scope.stockList[j].productCost;
		            obj.ProductUnit = $scope.stockList[j].productUnit;
		            obj.MaterialType = $scope.stockList[j].materialType;
		            obj.ExpiryDate = $scope.stockList[j].expiryDate;
		            obj.StockLevel = $scope.stockList[j].stockLevel;
		            obj.quantity = Math.ceil($scope.mediDescrCopy[i].preQuantity / $scope.stockList[j].productUnit);
		            obj.quantityDispenseCount =  1; 
		            obj.quantityDispenseStatus = "initialize";
		            obj.Dispense = true;
		            obj.ProductName = $scope.textFinetune(obj.ProductName);	    			
		            $scope.medicine.push(obj);
		        } 
		    }
		    
		    $scope.prescriptionMedi.push(obj);
		}


		if($scope.prescriptionMedi.length == $scope.medicine.length){
			$scope.mergeUnionList = $scope.medicine;
			$scope.mediDescr = $scope.mergeUnionList;		
		} else {
			$scope.mergeMedicineList();	
		}

		for(var i in $scope.mediDescr) {
			if($scope.mediDescr[i].Dispense == true && $scope.mediDescr[i].StockLevel > 0){
            	$scope.nostock = false;			
			}
		}

		//$scope.mediDescr = $scope.mergeUnionList;

		// scroll bar show and hide based on prescription list start
		if($scope.mediDescr.length < 5){
			$("#scrollBarShowHide").css('overflow-y','hidden');
		} else {
			$("#scrollBarShowHide").css('overflow-y','scroll');
		} 
		// scroll bar show and hide based on prescription list end

		if($scope.mergeUnionList.length != 0 && $scope.mergeUnionList[0].Dispense != undefined){ // prescrtipion medicine is and DB medicine id any one is equal
			$scope.dispenseMediAllBtnEnable = true;
			$scope.prescriptionListSync = true;

			var index = 0;
			for(var i in $scope.mergeUnionList){
				if($scope.mergeUnionList[i].StockLevel== 0 || $scope.mergeUnionList[i].StockLevel == undefined){
					index++;
				} 
			}
			if($scope.mergeUnionList.length == index){
				$scope.dispenseMediAllBtnEnable = true;	
				$(".dispenseAllBtnShadow").css("opacity", "0.6");
				$(".dispenseAll").css("color", "#c2c2c2");
				$("#mvmSyncTxt").text("medicines are not avaliable");
				setTimeout(function(){
					$scope.goHome();
				}, 9000);				
			}
			
		} else if($scope.mediDescrCopy.length != 0) { // No one is equal in perscription_medicine_id and DB_medicine_ID
			$scope.prescriptionListSync = true;
			$scope.dispenseMediAllBtnEnable = true;	
			$scope.mediDescr = $scope.mediDescrCopy;
			console.log($scope.mediDescr);
			$(".dispenseAllBtnShadow").css("opacity", "0.6");
			$(".dispenseAll").css("color", "#c2c2c2");
			$("#mvmSyncTxt").text("medicines are not avaliable");
			setTimeout(function(){
				$scope.goHome();
			}, 9000);
		} else { // DB sync connection problem
			$scope.prescriptionListSync = false;
			$("#mvmSyncTxt").text("Prescription list was not received");
			setTimeout(function(){
				$scope.goHome();
			}, 9000);
		}		
	}

	$scope.mergeMedicineList = function(){
		$scope.unavailableMedi = [];
		var index = 0;
		for(var i in $scope.prescriptionMedi){
			var findID = false;
			jIndex = 0;
			for(var j in $scope.medicine){
				if($scope.medicine[j].Id == $scope.prescriptionMedi[i].Id){
					findID = true;
					break;
				}
				jIndex++;
			}

			if(findID != true){
				$scope.unavailableMedi[index] = $scope.prescriptionMedi[i];
				index++;
			}
		}

		console.log($scope.medicine);
		console.log($scope.unavailableMedi);


		for (var i in $scope.unavailableMedi){
				var obj = {Id: $scope.unavailableMedi[i].Id, ProductName: $scope.unavailableMedi[i].ProductName, preQuantity: $scope.unavailableMedi[i].preQuantity};

				$scope.medicine.push(obj);
		}
		console.log("finish");
		console.log($scope.medicine);

		$scope.mergeUnionList = $scope.medicine;
		$scope.mediDescr = $scope.mergeUnionList;		

	}

	$scope.textFinetune = function(name){
		var strNameLength = name.length;

		if(strNameLength >= 15){
			var res = name.substring(0, 12)+"...";
			return res;
		} else {
			return name;
		}
	}

	$scope.postMediDescrRes = function(Res){
		console.log("inside $scope.postMediDescrRes fn");
		console.log(Res);
		$scope.dispensiveResponse = JSON.parse(Res['dispensiveResponse']);
		
		$scope.mvmStatus = true;
		$scope.progressTxt = false;
		medi_Id = $scope.dispensiveResponse[0].mediId;
		
		$("#dispenseMedi_"+medi_Id).attr("disabled", "disabled");
		$("#dispensiveAllBtn").attr("disabled", "disabled");
		$("#medi_"+medi_Id).text($scope.dispensiveResponse[0].Status);
		if($scope.dispensiveResponse[0].Status == "Abort"){
			
			//QR python socket close start
			JkioskService.QRSocketRequest($scope.QRSocketResponse, "QRpySocketClose");
			//QR python socket close end

			console.log("MVM H/W issue");
			setTimeout(function(){
				$scope.goHome();
			}, 9000);
			// home button enable or come back soon
			$scope.goHomeShow = true;
			return 0;
		} else if($scope.dispensiveResponse[0].Status == "faild"){
			$scope.dispensiveResponse[0].Status = "Fail";
		}

		
		if(!jQuery.isEmptyObject($scope.dispenseMediAllObj)) {
			//dispense all medicine flow based on quantity
			for (var i in $scope.dispenseMediAllObj) {
			  if ($scope.dispenseMediAllObj[i].Id ==  medi_Id && $scope.dispenseMediAllObj[i].ResReceiveClient == false) {
			  	if($scope.dispenseMediAllObj[i].StockLevel == 0){
			  		$scope.dispenseMediAllObj[i].StockLevel = $scope.dispenseMediAllObj[i].StockLevel;	
			  	}
			  	
			  	$scope.medicineObjectIndex = i;
			  	if($scope.dispenseMediAllObj[i].StockLevel > 0){
			  		$scope.dispenseMediAllObj[i].quantityDispenseCount = $scope.dispenseMediAllObj[i].quantityDispenseCount + 1; 
			  		
			  		if($scope.dispenseMediAllObj[i].quantityDispenseCount <= $scope.dispenseMediAllObj[i].quantity){
			  			$scope.dispenseMediAllObj[i].quantityDispenseStatus="progress";	
			  		} else {
			  			//$scope.dispenseMediAllObj[i].ResReceiveClient = true;		
			  			$scope.dispenseMediAllObj[i].quantityDispenseStatus="completed";
			  			$scope.dispenseMediAllObj[i].ResReceiveClient = true;
			  		}
			  	} else {
			  		$scope.dispenseMediAllObj[i].ResReceiveClient = true;
					$scope.dispenseMediAllObj[i].quantityDispenseStatus="completed";			  			
			  	}
			  } else {
			  //	console.log("wrong medicine id faild");
			  	//console.log($scope.dispenseMediAllObj[i].Id);
			  }
			} 

			if($scope.dispenseMediAllObj[$scope.medicineObjectIndex].quantityDispenseStatus=="completed"){
				$scope.CheckNextMediDispense();
			} else {
				$scope.dispenseMedicineBasedOnQuanityInAllMedicine(); 	
			}
			
		} else {
			//single medicine dispense based on quantity
			for (var i in $scope.mergeUnionList) {
			  if ($scope.mergeUnionList[i].Id ==  medi_Id) {
			  		$scope.mergeUnionList[i].StockLevel = $scope.mergeUnionList[i].StockLevel-1;
			  		if($scope.mergeUnionList[i].StockLevel > 0){
				  		$scope.mergeUnionList[i].quantityDispenseCount = $scope.mergeUnionList[i].quantityDispenseCount + 1; 
				  		if($scope.mergeUnionList[i].quantityDispenseCount <= $scope.mergeUnionList[i].quantity){
				  			$scope.mergeUnionList[i].quantityDispenseStatus="progress";	
				  		} else {
				  			//$scope.mergeUnionList[i].ResReceiveClient = true;		
				  			$scope.mergeUnionList[i].quantityDispenseStatus="completed";

				  		}
			  		} else {
						$scope.mergeUnionList[i].quantityDispenseStatus="completed";			  			
			  		}
			  } else {
			  	//console.log($scope.mergeUnionList[i].Id);
			  }
			} 
			$scope.dispenseMedicineBasedOnQuanity(); 
		}
	

		$scope.$apply();
	}

		$scope.dispenseMedicineBasedOnQuanityInAllMedicine = function(){

			for(var i in $scope.dispenseMediAllObj){
				if($scope.dispenseMediAllObj[i].quantityDispenseStatus == "progress"){
					$scope.nextQuanityDispenseInAllMedicine = i;
				} else {
					//console.log("dispense status ="+ i +" = " + $scope.dispenseMediAllObj[i]);
				}
			}

			if($scope.nextQuanityDispenseInAllMedicine != undefined){
				if($scope.dispenseMediAllObj[$scope.nextQuanityDispenseInAllMedicine].quantityDispenseStatus=="progress"){
					$scope.dispenseMedi($scope.dispenseMediAllObj[$scope.nextQuanityDispenseInAllMedicine]);
				} else {
					//QR python socket close start
					JkioskService.QRSocketRequest($scope.QRSocketResponse, "QRpySocketClose");
					//QR python socket close end

					console.log("single medicine dispense flow stop = ");
					setTimeout(function(){
						$scope.goHome();
					}, 9000);
				}
			}
		}

		$scope.dispenseMedicineBasedOnQuanity = function(){

			for(var i in $scope.mergeUnionList){
				if($scope.mergeUnionList[i].quantityDispenseStatus == "progress"){
					$scope.nextQuanityDispense = i;
				} else {
				//	console.log("dispense status ="+ i +" = " + $scope.mergeUnionList[i]);
				}
			}

			if($scope.nextQuanityDispense != undefined){
				if($scope.mergeUnionList[$scope.nextQuanityDispense].quantityDispenseStatus=="progress"){
					$scope.dispenseMedi($scope.mergeUnionList[$scope.nextQuanityDispense]);
				} else {
					// button enable and diable flow
					for(var i in $scope.mergeUnionList){
						if($scope.mergeUnionList[i].quantityDispenseStatus == "completed"){

                             //QR python socket close start
							JkioskService.QRSocketRequest($scope.QRSocketResponse, "QRpySocketClose");
							//QR python socket close end

							//disable button
							$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', true);							
							// home button show 
							$scope.homePageBtnShow = true;
						} else if($scope.mergeUnionList[i].quantityDispenseStatus == "initialize"){
							//enable button
							$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', false);
						} else {
							//disable button
							$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', true);
						}
					}
				}
			} else {
				for(var i in $scope.mergeUnionList){
					if($scope.mergeUnionList[i].quantityDispenseStatus == "completed"){
                        

                          //QR python socket close start
						JkioskService.QRSocketRequest($scope.QRSocketResponse, "QRpySocketClose");
						//QR python socket close end


						//disable button
						$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', true);
						// home button show 
						$scope.homePageBtnShow = true;
					} else if($scope.mergeUnionList[i].quantityDispenseStatus == "initialize"){
						//enable button
						$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', false);
					} else {
						//disable button
						$("#dispenseMedi_"+$scope.mergeUnionList[i].Id).prop('disabled', true);
					}
				}
			}
		}



	$scope.CheckNextMediDispense = function(){	
		$scope.nextMedicine = {};
		var index = 0;
		for (var i in $scope.dispenseMediAllObj) {
		  if(!$scope.dispenseMediAllObj[i].ResReceiveClient){
		  	$scope.nextMedicine[index] = $scope.dispenseMediAllObj[i];	
		  	index++;
		  }		  
		} 

		if(index > 0){
			$scope.dispenseMedi($scope.nextMedicine[0]);	
		} else {
			// home button enable or come back soon
			$scope.goHomeShow = true;
             //QR python socket close start
			JkioskService.QRSocketRequest($scope.QRSocketResponse, "QRpySocketClose");
			//QR python socket close end

			console.log("all medicine are dispensed successfully");
			setTimeout(function(){
				$scope.goHome();
			}, 9000);
		}
	}

	$scope.SingleMedicineRequest = function(medi){

		$scope.homePageBtnShow = false;

		$(".dispenseBtn").prop('disabled', true);
		$(".dispenseAllBtnShadow").css("opacity", "0.6");
		$(".dispenseAll").css("color", "#c2c2c2");
		$(".dispenseAll").prop('disabled', true);

  		var transactionId = new Date().getTime();
	

  		$scope.singleMedicineDetails = {"machineId": ihl_machineid.toString(),"transactionId": transactionId, "transactionType": "single", "name": "abhiram", "address": "chennai", "medicine_list": medi};            

  		$scope.singleMediTransApi($scope.singleMedicineDetails);

  		console.log("$scope.singleMedicineDetails");
  		console.log($scope.singleMedicineDetails);

		JkioskService.medicineDetailsJson($scope.singleMedicineDetails);	
		$scope.dispenseMedi(medi);
	}

	$scope.dispenseMedi = function(medi){
		JkioskService.rotatorRequest($scope.postMediDescrRes, medi);
	}

	$scope.getMvmStock = function(){
		$scope.checkStockBtn = true;
		JkioskService.getMvmStockList($scope.mvmStockResonse, ihl_machineid);
	}


	$scope.dispenseMediAll = function(){		
		$(".dispenseAllBtnShadow").css("opacity", "0.6");
		$(".dispenseAll").css("color", "#c2c2c2");
		$(".dispenseAll").prop('disabled', true);
		$(".dispenseBtn").prop('disabled', true);
		//$scope.dispenseAllEanble = true;
		if($scope.nostock == true){
			setTimeout(function(){
				$scope.goHome();
			}, 9000);
			return 0;
		}
		
		var count = 0;
		for (var i = 0; $scope.mergeUnionList.length > i; i++) {
			if($scope.mergeUnionList[i].Dispense != undefined && $scope.mergeUnionList[i].Dispense == true && $scope.mergeUnionList[i].StockLevel > 0){
				$scope.dispenseMediAllObj[count] = $scope.mergeUnionList[i];	
				$scope.dispenseMediAllObj[count].ResReceiveClient = false;
				count++;		
			}
		}


  		var transactionId = new Date().getTime();

  		$scope.AllMedicineDetails = {"machineId": ihl_machineid.toString(),"transactionId": transactionId, "transactionType": "multiple", "name": "abhiram", "address": "chennai", "medicine_list": $scope.dispenseMediAllObj};
  		
  		$scope.multiMediTransApi($scope.AllMedicineDetails);
  		console.log("$scope.AllMedicineDetails");
  		console.log($scope.AllMedicineDetails);
		JkioskService.medicineDetailsJson($scope.AllMedicineDetails);	

		//for(var i = 0; count > i; i++){
			if(count > 0){
				$scope.dispenseMedi($scope.dispenseMediAllObj[0]);	
			} else {
				//console.log("medincine is not avaliavle");
			}			
		//}

	}


	$scope.singleMediTransApi = function(transationData){

		$scope.singleMediTransData = transationData;

		var medicine_list = $scope.singleMediTransData.medicine_list;

		$scope.mediDetail = [{"Id": medicine_list.Id.toString(),
		"ProductName": medicine_list.ProductName,
		"quantity": medicine_list.quantity.toString(),
		"Rotator": medicine_list.Rotator,
		"ProductCost": medicine_list.ProductCost,
		"ProductUnit": medicine_list.ProductUnit.toString(),
		"MaterialType": medicine_list.MaterialType,
		"ExpiryDate": medicine_list.ExpiryDate,
		"StockLevel": medicine_list.StockLevel}];

		var status = [{"transactionId": $scope.singleMediTransData.transactionId,"quantity": medicine_list.quantity.toString(),"medi_id":  medicine_list.Id.toString(),"quantityDispenseCountSuccess": 0,"quantityDispenseCountFiled": 0,"Remark": "","comment": ""}];
				
		$scope.FinalSingleTransData = {"machineId": $scope.singleMediTransData.machineId.toString(), "transactionId": $scope.singleMediTransData.transactionId.toString(), "transactionType": "single", "name": "abhiram", "address": "chennai","medicine_list": $scope.mediDetail, "status": status};
		
		$scope.transactionAPI($scope.FinalSingleTransData);
	}
	$scope.multiMediTransApi = function(transationData){
		$scope.multiMediTransData = transationData;
		var medicine_count = Object.keys($scope.multiMediTransData.medicine_list).length; 
		$scope.medicineDetailData = $scope.multiMediTransData.medicine_list;
		$scope.mediDetailData = [];
		$scope.mediDetailStatus = [];
		for(var i in $scope.medicineDetailData){
			$scope.mediDetailData[i] = {};
			$scope.mediDetailData[i].Id = $scope.medicineDetailData[i].Id.toString();
			$scope.mediDetailData[i].ProductName = $scope.medicineDetailData[i].ProductName;
			$scope.mediDetailData[i].quantity = $scope.medicineDetailData[i].quantity.toString();
			$scope.mediDetailData[i].Rotator = $scope.medicineDetailData[i].Rotator;
			$scope.mediDetailData[i].ProductCost = $scope.medicineDetailData[i].ProductCost;
			$scope.mediDetailData[i].ProductUnit = $scope.medicineDetailData[i].ProductUnit.toString();
			$scope.mediDetailData[i].MaterialType = $scope.medicineDetailData[i].MaterialType;
			$scope.mediDetailData[i].ExpiryDate = $scope.medicineDetailData[i].ExpiryDate;
			$scope.mediDetailData[i].StockLevel = $scope.medicineDetailData[i].StockLevel;

			$scope.mediDetailStatus[i] = {};
			$scope.mediDetailStatus[i].transactionId =  $scope.multiMediTransData.transactionId.toString();
			$scope.mediDetailStatus[i].quantity =  $scope.medicineDetailData[i].quantity.toString();
			$scope.mediDetailStatus[i].medi_id =  $scope.medicineDetailData[i].Id.toString();
			$scope.mediDetailStatus[i].quantityDispenseCountSuccess =  0;
			$scope.mediDetailStatus[i].quantityDispenseCountFiled =  0;
			$scope.mediDetailStatus[i].Remark =  "";
			$scope.mediDetailStatus[i].comment =  "";
		}

		$scope.FinalMultiTransData = {
				machineId: $scope.multiMediTransData.machineId.toString(),
				transactionId: $scope.multiMediTransData.transactionId.toString(),
				transactionType: "multiple",
				machineId: ihl_machineid.toString(),
				name: "abhiram",
				address: "chennai",
				medicine_list:$scope.mediDetailData,
				status: $scope.mediDetailStatus
			};
		$scope.transactionAPI($scope.FinalMultiTransData);
	}

	$scope.transactionAPI = function(data){
		$.ajax({
		      url: getSettingsValue('kiosk.api.url') + "/data/mvmTransactionDetailStore",
		      type : "POST", 
		      cache: false,
		      data:JSON.stringify(data), 
		      dataType: "json",
		      headers:{"ApiToken":'hZH2vKcf1BPjROFM/DY0XAt89wo/09DXqsAzoCQC5QHYpXttcd5DNPOkFuhrPWcyT57DFFR9MnAdRAXoVw1j5yupkl+ps7+Z1UoM6uOrTxUBAA=='}, 
		      contentType: "application/json; charset=utf-8", 
		      success: function(html){
		      console.log(html);
		      },
		      error : function(xhr, status, error) { 
		      console.log('failures 3'+xhr.responseText);
		      } 
		});
	}
	
	$scope.init();

   $scope.goHome = function(){
	 window.location = "#/comebacksoon";
   }

}

}]);
