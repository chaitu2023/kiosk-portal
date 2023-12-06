<?php
	header('Content-Type: application/json');

	$Response = array();

	$FunctionName = $_POST['FunctionName'];

	switch($FunctionName) {
		case 'ConvertBase64ToPdf':
			$Response = ConvertBase64ToPdf($_POST['base64'], $_POST['externalPatientId']);
			break;
		case 'SendTestRequestToESanjeevani':
			$Response = SendTestRequestToESanjeevani($_POST['testResult']);
			break;
		case 'UploadECGPdfFile':
			$Response = UploadECGPdfFile($_POST['externalPatientId'], $_POST['fileName']);
			break;
	}

	function ConvertBase64ToPdf($ECGBase64, $ExternalPatientId) {
		if ($ECGBase64) {
			//Decode pdf content
			if (file_exists("ECG.pdf")) {
				unlink("ECG.pdf");
			}

			$CurrentDateTime = date('dmYhms');

			$FileName = $ExternalPatientId.'_'.$CurrentDateTime.'.pdf';

			$PdfDecoded = base64_decode($ECGBase64);
			//Write data back to pdf file
			$Pdf = fopen ($FileName,'w');
			fwrite ($Pdf,$PdfDecoded);
			//close output file
			fclose ($Pdf);
			$Response = array("Status" => "S", "FileName" => $FileName); // Data created successfully
		} else {
			$Response = array("Status" => "E"); // Error from UI
		}
		return $Response;
	}

	function SendTestRequestToESanjeevani($TestResult) {
		$TokenResponse = GetAccessToken();
		$TokenResJson = json_decode($TokenResponse, true);

		if ($TokenResJson['success']) {
			$Token = $TokenResJson['model']['access_token'];

			$curl = curl_init();
			curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://preprod.esanjeevaniopd.xyz/uat/dint/api/v1/Receive/TestRequestResult',
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_ENCODING => '',
				CURLOPT_MAXREDIRS => 10,
				CURLOPT_TIMEOUT => 0,
				CURLOPT_FOLLOWLOCATION => true,
				CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
				CURLOPT_CUSTOMREQUEST => 'POST',
				CURLOPT_POSTFIELDS => $TestResult,
				CURLOPT_HTTPHEADER => array(
					'Authorization: Bearer '.$Token,
					'Content-Type: application/json'
				),
			));
			$TestResultResponse = curl_exec($curl);
			curl_close($curl);

			$JsonResponse = json_decode($TestResultResponse, true);

			if ($JsonResponse['success'])
				$Response = array("Status" => "S", "Msg" => $JsonResponse['message']);
			else
				$Response = array("Status" => "E", "Msg" => $JsonResponse['message']);
		} else {
			$Response = array("Status" => "E", "Msg" => "Authorization failed");
		}
		return $Response;
	}

	function GetAccessToken() {
		$curl = curl_init();
		curl_setopt_array($curl, array(
			CURLOPT_URL => 'https://preprod.esanjeevaniopd.xyz/uat/aus/api/v1/DeviceAuth/getDeviceToken',
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_ENCODING => '',
			CURLOPT_MAXREDIRS => 10,
			CURLOPT_TIMEOUT => 0,
			CURLOPT_FOLLOWLOCATION => true,
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
			CURLOPT_CUSTOMREQUEST => 'POST',
			CURLOPT_POSTFIELDS =>'{
				"vendorId": "8002",
				"client_id": "8002",
				"client_secret": "A540D29B47592797D71AAE81BAB2CF6F8AC5AAB165256B7437F010E54935FABFF885BDEBB65A4D8576E4E57E28167094E134981C2F0162DED9FF8E19C93529D3"
			}',
			CURLOPT_HTTPHEADER => array(
				'Content-Type: application/json'
			),
		));

		$response = curl_exec($curl);
		curl_close($curl);
		return $response;
	}

	function UploadECGPdfFile($ExternalPatientId, $FileName) {
		$TokenResponse = GetAccessToken();
		$TokenResJson = json_decode($TokenResponse, true);
		
		if ($TokenResJson['success']) {
			$Token = $TokenResJson['model']['access_token'];
			$PostData = array();
			$FilePath = __DIR__.'/'.$FileName;
			$FileSize = filesize($FilePath);

			if (!file_exists($FilePath)) {
				$out['status'] = 'error';
				$out['message'] = 'File not found.';
				exit(json_encode($out));
			}

			$FInfo = finfo_open(FILEINFO_MIME_TYPE);
			$FInfo = finfo_file($FInfo, $FilePath);

			$CFile = new CURLFile($FilePath, $FInfo, basename($FilePath));
			$PostData = array( "file" => $CFile);

			$curl = curl_init();
			curl_setopt_array($curl, array(
				CURLOPT_URL => 'https://preprod.esanjeevaniopd.xyz/uat/dint/api/v1/Receive/UploadData',
				CURLOPT_RETURNTRANSFER => true,
				CURLOPT_HTTPHEADER => array(
					'externalPatientId:  '.$ExternalPatientId,
					'Authorization: Bearer '.$Token,
					'Content-Type: multipart/form-data'
				),
				CURLOPT_CUSTOMREQUEST => 'POST',
				CURLOPT_INFILESIZE => $FileSize,
				CURLOPT_POSTFIELDS => $PostData
			));

			$UploadECGResponse = curl_exec($curl);

			if (file_exists($FilePath))
				unlink($FilePath);

			$JsonResponse = json_decode($UploadECGResponse, true);

			if ($JsonResponse['success'])
				$Response = array("Status" => "S", "Msg" => $JsonResponse['message']);
			else
				$Response = array("Status" => "E", "Msg" => $JsonResponse['message']);
		} else {
			$Response = array("Status" => "E", "Msg" => "Authorization failed");
		}
		return $Response;
	}

	echo json_encode($Response);
?>