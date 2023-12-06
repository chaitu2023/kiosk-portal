<?php
if (isset($_POST["parameters"])) {

    // Data to be encrypted
    $data = $_POST["parameters"];

    // Encryption key (must be a 16, 24, or 32 character string)
    $key = 'lQMWFIT6J2';

    // Initialization vector (must be a 16 character string)
    // $iv = openssl_random_pseudo_bytes(16);
    $iv = 'Ev36qB6avMEyIKks';

    // echo $iv;
    // Encrypt the data
    $encryptedData = openssl_encrypt($data, 'AES-256-CBC', $key, OPENSSL_RAW_DATA, $iv);

    // Encode the encrypted data to base64 for storage or transmission
    $encodedData = base64_encode($encryptedData);
    // echo $encodedData;

    $string = json_decode($data); // Convert the JSON string to an object
    $file_name = $string->file_name; // Access the value of the "file_name" property

    $parameters = $encodedData;
    echo $parameters;
    if ($parameters) {
        $folder_path = "C:\\offline_data";

        // Check if the folder exists, if not, create it
        if (!is_dir($folder_path)) {
            mkdir($folder_path);
        }

        $filepath = $folder_path . "\\" . $file_name . ".json";

        // $filepath = "C:\\offline_data\\" . $file_name . ".json";

        // Merge the existing parameters with the new parameters
        if (file_exists($filepath)) {
            $existingParametersJson = file_get_contents($filepath);
            $existingParameters = json_decode($existingParametersJson, true);

            if (is_array($existingParameters)) {
                $existingParameters[] = $parameters;
            } else {
                $existingParameters = [$existingParameters, $parameters];
            }
        } else {
            $existingParameters = [$parameters];
        }
        
        // Convert the updated parameters array to a JSON string
        $updatedParametersJson = json_encode($existingParameters, JSON_UNESCAPED_UNICODE);
        
        // Save the updated parameters JSON to the file
        file_put_contents($filepath, $updatedParametersJson);

        echo "Parameters saved successfully!";
    } else {
        echo "No parameters received.";
    }
}
?>
