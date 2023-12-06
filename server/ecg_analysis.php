<?php

    header('Content-Type: application/json');
	$Response = array();
	$FunctionName = $_POST['FunctionName'];

	switch($FunctionName) {
		case 'saveData':
			$Response = saveECGDataContent($_POST['data']);
			break;
	}

    // Save ECG data content
    function saveECGDataContent($ecgTestResult) {

        $folderPath = 'C:/storeECGData'; // Specify the folder path on the C: drive
        $baseFileName = 'ecgData';   // Specify the base file name (without the index)
        $extension = 'txt';         // Specify the file extension

        // Check if the folder exists or create it if it doesn't
        if (!file_exists($folderPath)) {
            if (mkdir($folderPath, 0777, true)) {
                echo "Folder '$folderPath' created successfully.";
            } else {
                echo "Failed to create folder '$folderPath'";
                exit;
            }
        }

        // Read the current index from a file or a database
        $indexFile = $folderPath . '/index.txt';
        $index = 0;
        if (file_exists($indexFile)) {
            $index = intval(file_get_contents($indexFile));
        }

        // Increment the index for the next file
        $index++;

        // Update the index file
        file_put_contents($indexFile, $index);

        // Create the full file path
        $fileName = $baseFileName . '_' . $index . '.' . $extension;
        $filePath = $folderPath . '/' . $fileName;

        // Write the content to the file
        if (file_put_contents($filePath, $ecgTestResult) !== false)
            $Response = array('Status' => 'S'); // File created successfully.
        else
            $Response = array('Status' => 'E'); // File not created.
        
        return $Response;
    }
    echo json_encode($Response);
?>