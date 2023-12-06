<?php
if (isset($_POST["index"])) {
    $index = $_POST["index"];
    $index = intval($index); // Convert the index to an integer

    $uniqueKioskId = $_POST['uniqueKioskId'];
    $cleanString = str_replace('"', '', $uniqueKioskId);
    // var_dump($cleanString);
    $filename = "C:\\offline_data\\" . $cleanString . ".json";
    if (file_exists($filename)) {
        // Read the existing parameters from the file
        $existingParametersJson = file_get_contents($filename);
        $existingParameters = json_decode($existingParametersJson, true);

        // Check if the index is within the bounds of the existing parameters array
        if ($index >= 0 && $index < count($existingParameters)) {
            // Remove the parameter at the given index
            array_splice($existingParameters, $index, 1);

            // Save the updated parameters back to the file
            $updatedParametersJson = json_encode($existingParameters);
            file_put_contents($filename, $updatedParametersJson);

            echo "Parameter at index $index deleted successfully!";
        } else {
            echo "Invalid index!";
        }
    } else {
        echo "File not found!";
    }
}
else {
    echo "Invalid Response!";
}
?>
