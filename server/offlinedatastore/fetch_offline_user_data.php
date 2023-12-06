<?php
  if (isset($_GET['uniqueKioskId'])) {
    $filename = $_GET['uniqueKioskId'];
    $cleanString = str_replace('"', '', $filename);
    // var_dump($cleanString);
    $directoryPath = "C:\\offline_data";

    $filepath = $directoryPath . "\\" . $cleanString . ".json";

    if (!file_exists($directoryPath)) {
      mkdir($directoryPath, 0777, true); // Creates the directory if it doesn't exist
    }

    $fileContents = file_get_contents($filepath);

    $array = explode(',', str_replace(['[', ']', '"'], '', $fileContents));

    // echo gettype($array);
    // var_dump ($array);

    $decryptedArray = [];

    // Decryption key or method
    $key = "lQMWFIT6J2";

    // Decrypt each item in the array
    foreach ($array as $item) {
        $decryptedItem = openssl_decrypt(base64_decode($item), "AES-256-CBC", $key, OPENSSL_RAW_DATA);
        $decryptedArray[] = $decryptedItem;
    }
    
    $cleanedData = [];
    foreach ($decryptedArray as $string) {
      $cleanedString = preg_replace('/^.*(?="LeadMode")/', '{', $string);
      $cleanedData[] = $cleanedString;
    }
    
    $jsonArray = [];
    foreach ($cleanedData as $string) {
      $jsonArray[] = json_decode($string, true);
    }

    $output = json_encode($jsonArray);

    $array = json_decode($output, true);

    $jsonArray = json_encode($array);

    echo $jsonArray;
   
} else {
  echo 'Invalid request';
}

?>
