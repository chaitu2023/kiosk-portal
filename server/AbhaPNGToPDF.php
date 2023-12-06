<?php	
	
	$response = array();
	if($_POST['base64']){
		//Decode pdf content
		if(file_exists("abhacard.pdf")){
			unlink("abhacard.pdf");
		}

		$pdf_decoded = base64_decode ($_POST['base64']);
		//Write data back to pdf file
		$pdf = fopen ('abhacard.pdf','w');
		fwrite ($pdf,$pdf_decoded);
		//close output file
		fclose ($pdf);
		$response = array("status" => "S"); // Data created successfully
		//echo json_encode($response);
	} else {
		$response = array("status" => "E"); // Error from UI
		//echo json_encode($response);
		
	}

	echo json_encode($response);

?>