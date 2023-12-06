<?php
	
	$Response = array();

	$FunctionName = $_POST['FunctionName'];

	switch($FunctionName) {
		case 'PatientRegistrationWithMehta':
			$Response = PatientRegistrationWithMehta($_POST['data'], $_POST['url']);
			break;
		case 'GetPatientData':
			$Response = GetPatientData($_POST['data'], $_POST['url']);
			break;
		case 'GetAreaByPincode':
			$Response = GetAreaByPincode($_POST['data'], $_POST['url']);
			break;
		case 'sendTestResultToMehta':
			$Response = sendTestResultToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendRadiologyToMehta':
			$Response = sendRadiologyToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendDiagnosisToMehta':
			$Response = sendDiagnosisToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendMediPrescriptionToMehta':
			$Response = sendMediPrescriptionToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendLabToMehta':
			$Response = sendLabToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendAllergyToMehta':
			$Response = sendAllergyToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendNotesToMehta':
			$Response = sendNotesToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendPrescriptionToMehta':
			$Response = sendPrescriptionToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendConsultantDetailToMehta':
			$Response = sendConsultantDetailToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendUserDetailToMehta':
			$Response = sendUserDetailToMehta($_POST['data'], $_POST['url']);
			break;
		case 'sendKioskDtlToMehta':
			$Response = sendKioskDtlToMehta($_POST['data'], $_POST['url']);
			break;
	}

	function PatientRegistrationWithMehta($Data, $url) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url.'?requesttype=0&webformid=wf4661&data='.$Data,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));

		$Result = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($Result, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function GetAreaByPincode($Data, $url) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url.'?requesttype=0&webformid=wf4650&data='.$Data,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));

		$Result = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Data" => json_decode($Result, true));
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Unable to connect server');
		}
		logFileCreate($Response);
		return $Response;
	}

	function GetPatientData($Data, $url) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url.'?requesttype=0&webformid=wf4647&data='.$Data,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));

		$Result = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Data" => json_decode($Result, true));
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Unable to connect server');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendTestResultToMehta($Data, $url) {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => $url.'?requesttype=0&webformid=wf4651&data='.$Data,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/x-www-form-urlencoded'
			),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendRadiologyToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4657&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendDiagnosisToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4658&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendMediPrescriptionToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4656&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendLabToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4652&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendAllergyToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4655&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendUserDetailToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4654&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);
			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendNotesToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4653&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;

	}

	function sendPrescriptionToMehta($Data, $url){	
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4659&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendConsultantDetailToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4660&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);
			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function sendKioskDtlToMehta($Data, $url){
		$curl = curl_init();
		curl_setopt_array($curl, array(
		CURLOPT_URL => $url.'?requesttype=0&webformid=wf4663&data='.$Data,
		CURLOPT_RETURNTRANSFER => true,
		CURLOPT_ENCODING => '',
		CURLOPT_MAXREDIRS => 10,
		CURLOPT_TIMEOUT => 0,
		CURLOPT_FOLLOWLOCATION => true,
		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
		CURLOPT_CUSTOMREQUEST => 'POST',
		CURLOPT_HTTPHEADER => array(
			'Content-Type: application/json'
		),
		));

		$TestResultResponse = curl_exec($curl);
		$HttpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);

		if ($HttpCode == 200) {
			$JsonResponse = json_decode($TestResultResponse, true);
			if ($JsonResponse[0]['MSG'] == 'success')
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "S", "Msg" => $JsonResponse[0]['CNT']);
			else
				$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => $JsonResponse[0]['ERRORMSG']);
		} else {
			$Response = array("url&payload" => curl_getinfo($curl, CURLINFO_EFFECTIVE_URL), "statusCode" => curl_getinfo($curl, CURLINFO_HTTP_CODE), "Status" => "E", "Msg" => 'Invalid Input');
		}
		logFileCreate($Response);
		return $Response;
	}

	function logFileCreate($Response){    
		$filePath = "C:/Logs/mehtaLogs.txt";	
		$timestamp = time();
		$formattedDate = date("Y-m-d H:i:s", $timestamp);    
		// $newLineText = "[".$formattedDate."]"." ".implode(",", $Response);
		$newLineText = "[".$formattedDate."]"." " . json_encode($Response);
	
		$file = fopen($filePath, "a") or die("Unable to open file for appending!");
		fwrite($file, $newLineText . PHP_EOL);
		fclose($file);
	  }

	echo json_encode($Response);
?>