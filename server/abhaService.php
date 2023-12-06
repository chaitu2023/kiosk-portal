<?php
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Headers: *");
  header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
  error_reporting(0);
  $FunctionName = "";
  $para = array();
  $response = array();
  // $token = array();
  $hosId = 'ihl_yog34_2023';
  $abahUrl1 = ""; //  https://healthidsbx.abdm.gov.in || https://nha-suma-azb7fa3pfa-el.a.run.app
  $abahUrl2 = ""; //  https://dev.abdm.gov.in || https://nha-suma-azb7fa3pfa-el.a.run.app

  
  if(isset($_POST['method'])){

    $FunctionName = $_POST['method'];
    if(isset($_POST['data'])){
      $para = $_POST['data'];
    }
    // if(isset($_POST['token'])){
    //   $token = $_POST['token'];
    // }
  }

  function getBaseUrl(){    
    $abahUrl1 = "https://healthidsbx.abdm.gov.in/api"; //  https://healthidsbx.abdm.gov.in/api || https://nha-suma-azb7fa3pfa-el.a.run.app
    $abahUrl2 = "https://dev.abdm.gov.in/gateway"; //  https://dev.abdm.gov.in/gateway || https://nha-suma-azb7fa3pfa-el.a.run.app
    $baseUrl = array (array("abahUrl" => $abahUrl1),array("abahUrl" => $abahUrl2));
    return $baseUrl;
  }

  switch($FunctionName) {
      case 'getSession':
        getSession(json_encode($_POST['data']));
        break;
      case 'mobileEmailLoginOtp':
        mobileEmailLoginOtp(json_encode($_POST['data']));
        break;
      case 'mobileEmailOtpResend':
        mobileEmailOtpResend(json_encode($_POST['data']));
        break;
      case 'mobileEmailPreVerf':
        mobileEmailPreVerf(json_encode($_POST['data']));
        break;
      case 'generateAadharOtp':
        generateAadharOtp(json_encode($_POST['data']));
        break;
      case 'aadharOtpPreVerf':
        aadharOtpPreVerf(json_encode($_POST['data']));
        break;
      case 'aadharMobileOtpGenerate':
        aadharMobileOtpGenerate(json_encode($_POST['data']));
        break;
      case 'generateMobileLinkAadharOtp':
        generateMobileLinkAadharOtp(json_encode($_POST['data']));
        break;
      case 'checkAndGenerateMobileOTP':
        checkAndGenerateMobileOTP(json_encode($_POST['data']));
        break;
      case 'generateAadharLinkedOtp':
        generateAadharLinkedOtp(json_encode($_POST['data']));
        break;
      case 'verifyAadharLinkedOtp':
        verifyAadharLinkedOtp(json_encode($_POST['data']));
        break;
      case 'aadharOtpResend':
        aadharOtpResend(json_encode($_POST['data']));
        break;
      case 'getUserTokenForMobEm':
        getUserTokenForMobEm(json_encode($_POST['data']));
        break;
      case 'getProfileDetailsFromMobileToken':
        getProfileDetailsFromMobileToken(json_encode($_POST['data']));
        break;
      case 'getAbhaCardFromMobToken':
        getAbhaCardFromMobToken(json_encode($_POST['data']));
        break;
      case 'getAbhaQrCardCode':
        getAbhaQrCardCode(json_encode($_POST['data']));
        break;
      case 'storeIhlUserAbhaDetails':
        storeIhlUserAbhaDetails(json_encode($_POST['data']));
        break;
      case 'createAbhaNoUsingAadharMob':
        createAbhaNoUsingAadharMob(json_encode($_POST['data']));
        break;
      case 'checkHealthIdExist':
        checkHealthIdExist(json_encode($_POST['data']));
        break;
      case 'fetchAuthModeVerify':
        fetchAuthModeVerify(json_encode($_POST['data']));
        break;
      case 'initAuthModeVerify':
        initAuthModeVerify(json_encode($_POST['data']));
        break;
      case 'confirmAuthModeVerify':
        confirmAuthModeVerify(json_encode($_POST['data']));
        break;
      case 'searchByHealthIdVerify':
        searchByHealthIdVerify(json_encode($_POST['data']));
        break;
      case 'initMobileOtpVerify':
        initMobileOtpVerify(json_encode($_POST['data']));
        break;
      case 'confirmAuthMobileOtpVerify':
        confirmAuthMobileOtpVerify(json_encode($_POST['data']));
        break;
      case 'confirmAuthAadharOtpVerify':
        confirmAuthAadharOtpVerify(json_encode($_POST['data']));
        break;
      case 'abhaDetailFetchIhlId':
        abhaDetailFetchIhlId(json_encode($_POST['data']));
        break;
      case 'abhaCardFetchIhlId':
        abhaCardFetchIhlId(json_encode($_POST['data']));
        break;
      case 'getAbhaCardPng':
        getAbhaCardPng(json_encode($_POST['data']));
        break;
      case 'updateIhlUserAbhaDetails':
        updateIhlUserAbhaDetails(json_encode($_POST['data']));
        break;
      case 'abhaProfileDetailsFetch':
        abhaProfileDetailsFetch(json_encode($_POST['data']));
        break;
      case 'abhaAddressValidation':
        abhaAddressValidation(json_encode($_POST['data']));
        break;
      case 'getRquestIDforQR':
        getRquestIDforQR();
        break;
      // case 'abhaCareContextVitalLink':
      //   abhaCareContextVitalLink(json_encode($_POST['data']));
      //   break;
      case 'PatientSmsNotify':
        PatientSmsNotify(json_encode($_POST['data']));
        break;
      case 'phrAbhaAddressSuggestion':
        phrAbhaAddressSuggestion(json_encode($_POST['data']));
        break;
      case 'createAbhaPhrAddress':
        createAbhaPhrAddress(json_encode($_POST['data']));
        break;
      case 'abhaPhrAddressExist':
        abhaPhrAddressExist(json_encode($_POST['data']));
        break;
      default:
        errorInfo();
        break;
  }


  function getSession($para) {

    //echo($para);
    //exit;
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl2.'/v0.5/sessions',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Accept: application/json',
        'Content-Type: application/json'
      ),
    ));

    $output = curl_exec($curl);
    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = 'Error';
    } else {
      $response = $output;
    }

    
    // echo json_encode($response);
    return $response;
  }

  function getRquestIDforQR(){
    $requestIdRes = fetchRequestId();
    if($requestIdRes != 'Error'){
      $requestID = stripslashes($requestIdRes);
      $requestID = trim($requestID, '"'); 
      $response = array('status' => 'S', 'res' => $requestID);
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');      
    }
    echo json_encode($response);
  }

  function mobileEmailLoginOtp($para){

    $curl = curl_init();

    // echo $token;
    // exit;

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/login/mobileEmail/init',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json;charset=UTF-8',
        'Authorization: Bearer '.$Token
      )
    ));

    $output = curl_exec($curl);

    // echo '<pre>';
    // print_r($output);
    // exit;

    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    
    echo json_encode($response);
  }

  function mobileEmailOtpResend($para){
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/login/resend/otp',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json;charset=UTF-8',
        'Authorization: Bearer '.$Token,
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function mobileEmailPreVerf($para){
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/login/mobileEmail/preVerification',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json;charset=UTF-8',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function generateAadharOtp($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/generateOtp',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Accept: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/generateOtp', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/generateOtp', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function aadharOtpPreVerf($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/verifyOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/verifyOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/verifyOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function aadharMobileOtpGenerate($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/generateMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }


    echo json_encode($response);
  }

  function generateMobileLinkAadharOtp($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/generateMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function checkAndGenerateMobileOTP($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v2/registration/aadhaar/checkAndGenerateMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v2/registration/aadhaar/checkAndGenerateMobileOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v2/registration/aadhaar/checkAndGenerateMobileOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function generateAadharLinkedOtp($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();
    
    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/generateMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function verifyAadharLinkedOtp($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/verifyMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/verifyMobileOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/verifyMobileOTP', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function aadharOtpResend($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/resendAadhaarOtp',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/resendAadhaarOtp', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/resendAadhaarOtp', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function getUserTokenForMobEm($para) {
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/login/mobileEmail/getUserToken',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json;charset=UTF-8',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function getProfileDetailsFromMobileToken($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/account/profile',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
        'accept: application/json',
        'X-Token: Bearer '.json_decode($para),
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function getAbhaCardFromMobToken($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/profile/png/getCard',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'X-Token: Bearer '.$para,
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);
    $output = base64_encode($output);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function getAbhaQrCardCode($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/profile/qrCode',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'X-Token: Bearer '.$para,
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);

  }

  function createAbhaNoUsingAadharMob($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/registration/aadhaar/createHealthIdWithPreVerified',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/createHealthIdWithPreVerified', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/registration/aadhaar/createHealthIdWithPreVerified', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function storeIhlUserAbhaDetails($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/store_ihl_user_abha_detail',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => json_decode($output));
    }

    echo json_encode($response);
  }

  function updateIhlUserAbhaDetails($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/edit_ihl_user_abha_detail',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => json_decode($output));
    }

    echo json_encode($response);
  }

  //********************************************/ Abha M1 Verify ***********************************************

  function checkHealthIdExist($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/search/existsByHealthId',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function fetchRequestId(){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/abha_generate_request_id',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = 'Error';
    } else {
      $response = $output;
    }

    return $response;
  }

  /* function fetchAbhaData($para){
    $curl = curl_init();

    $data = json_decode($para, true);

    $requestId = $data['requestId'];
    $mode = $data['mode'];
    $url = "https://devserver.indiahealthlink.com/ihlabha/fetch_abha_data?request_id=".$requestId."&url_end_point=".$mode;
    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
        $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = 'Error';
    } else {
      if(isset(json_decode($output, true)['status'])){
        $response = json_decode($output, true)['status'];
      }else{
        $response = $output;
      }
    }

    return $response;
  } */

  function fetchAuthModeVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      echo json_encode($response);
      exit;
    }

    $requestIdRes = fetchRequestId();
    if($requestIdRes != 'Error'){
      $requestID = stripslashes($requestIdRes);
      $requestID = trim($requestID, '"'); 
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      echo json_encode($response);
      exit;
    }

    // $timestamp = (new DateTime())->format('Y-m-d\TH:i:s.v\Z');
    $date = new DateTime('now', new DateTimeZone('UTC'));
    $timestamp = $date->format('Y-m-d\TH:i:s.v\Z');

    $jsonData = [
      "requestId" => $requestID,
      "timestamp" => $timestamp,
      "query" => [
        "id" => json_decode($para),
        "purpose" => "KYC_AND_LINK",
        "requester" => [
          "type" => "HIP",
          "id" => "IHLTEST454"
        ]
      ]
    ];

    $jsonData = json_encode($jsonData);


    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl2.'/v0.5/users/auth/fetch-modes',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'X-CM-ID: sbx',
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $fetchDataObj = [
      "mode" => 'on-fetch-modes',
      "requestId" => $requestID
    ];

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/fetch-modes', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      if($httpcode == 202){
        // $fetchedData = fetchAbhaData(json_encode($fetchDataObj));
        // if($fetchedData != 'Error'){
          $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/fetch-modes', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $requestID);
        // }else{
          // $response = array('status' => 'E', 'res' => $fetchedData);
        // }
      } else {
        $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/fetch-modes', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
      }
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function initAuthModeVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $requestIdRes = fetchRequestId();
    if($requestIdRes != 'Error'){
      $requestID = stripslashes($requestIdRes);
      $requestID = trim($requestID, '"'); 
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    // $timestamp = (new DateTime())->format('Y-m-d\TH:i:s.v\Z');
    $date = new DateTime('now', new DateTimeZone('UTC'));
    $timestamp = $date->format('Y-m-d\TH:i:s.v\Z');

    $para = json_decode($para, true);

    $jsonData = [
      "requestId" => $requestID,
      "timestamp" => $timestamp,
      "query" => [
        "id" => $para['abhaAddress'],
        "purpose" => $para['purpose'],
        "authMode" => $para['authMode'],
        "requester" => [
          "type" => "HIP",
          "id" => "ihl_yog12_2022"
        ]
      ]
    ];

    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl2.'/v0.5/users/auth/init',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer '.$Token,
        'X-CM-ID: sbx',
        'Accept: application/json',
        'Content-Type: application/json'
      ),
    ));

    $output = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $fetchDataObj = [
      "mode" => 'on-init',
      "requestId" => $requestID
    ];

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/init', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      if($httpcode == 202){
        // $fetchedData = fetchAbhaData(json_encode($fetchDataObj));
        // if($fetchedData != 'Error'){
          $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/init', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $requestID);
        // }else{
          // $response = array('status' => 'E', 'res' => $fetchedData);
        // }
      } else {
        $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/init', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => $output);
      }
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function confirmAuthModeVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $requestIdRes = fetchRequestId();
    if($requestIdRes != 'Error'){
      $requestID = stripslashes($requestIdRes);
      $requestID = trim($requestID, '"'); 
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    // $timestamp = (new DateTime())->format('Y-m-d\TH:i:s.v\Z');
    $date = new DateTime('now', new DateTimeZone('UTC'));
    $timestamp = $date->format('Y-m-d\TH:i:s.v\Z');

    $para = json_decode($para, true);

    if(isset($para['otp'])){
      $jsonData = [
        "requestId" => $requestID,
        "timestamp" => $timestamp,
        "transactionId" => $para['transactionId'],
        "credential" => [
          "authCode" => $para['authCode']
        ]
      ];
    }else{
      $jsonData = [
        "requestId" => $requestID,
        "timestamp" => $timestamp,
        "transactionId" => $para['transactionId'],
        "credential" => [
          "demographic" => [
            "name" => $para['name'],
            "gender" => $para['gender'],
            "dateOfBirth" => $para['dateOfBirth']
    
          ],
          "identifier"=> [
            "type" =>"MOBILE",
            "value" => $para['mobile']
          ]
        ]
      ];
    }

    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl2.'/v0.5/users/auth/confirm',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array('X-CM-ID: sbx',
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $fetchDataObj = [
      "mode" => 'on-confirm',
      "requestId" => $requestID
    ];

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/confirm', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      if($httpcode == 202){
        // $fetchedData = fetchAbhaData(json_encode($fetchDataObj));
        // if($fetchedData != 'Error'){
          $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/confirm', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $requestID);
        // }else{
          // $response = array('status' => 'E', 'res' => 'Error');
        // }
      } else {
        $response = array('url' => "url: ".$abahUrl2.'/v0.5/users/auth/confirm', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => $output);
      }
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function searchByHealthIdVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $jsonData = [
      "healthId" => trim($para, '"')
    ];

    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/search/searchByHealthId',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'Accept-Language: en-US',
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/search/searchByHealthId', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/search/searchByHealthId', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function initMobileOtpVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $jsonData = json_decode($para);

    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/auth/init',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'Accept-Language: en-US',
        'Content-Type: application/json',
        'X-HIP-ID: IHLTEST454',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/init', 'body' => "payload: ".$jsonData, 'code' => "statusCode".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/init', 'body' => "payload: ".$jsonData, 'code' => "statusCode".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function confirmAuthMobileOtpVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);

    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $jsonData = json_decode($para);
    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/auth/confirmWithMobileOTP',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'Accept-Language: en-US',
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);
    $error_msg = "";

    if (curl_errno($curl)) {

      $error_msg = curl_error($curl);
    }

    curl_close($curl);

      
    if ($error_msg != "") {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/confirmWithMobileOTP', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/confirmWithMobileOTP', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function confirmAuthAadharOtpVerify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $jsonData = json_decode($para);
    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/auth/confirmWithAadhaarOtp',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'accept: */*',
        'Accept-Language: en-US',
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/confirmWithAadhaarOtp', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".$abahUrl1.'/v1/auth/confirmWithAadhaarOtp', 'body' => "payload: ".$jsonData, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function abhaDetailFetchIhlId($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $jsonData = stripslashes($para);
    $jsonData = trim($jsonData, '"'); 

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/view_ihl_user_abha_detail?ihl_user_id='.$jsonData,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function abhaCardFetchIhlId($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $data = json_decode($para);

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/view_ihl_user_abha_card?ihl_user_id='.trim($data->ihl_user_id, "\"").'&abha_address_or_abha_number='.trim($data->abha_address, "\""),
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function getAbhaCardPng($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl1.'/v1/account/getPngCard',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
        // 'accept: */*',
        // 'Accept-Language: en-US',
        'X-Token: Bearer '.json_decode($para),
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);
    
    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }


    if (isset($error_msg)) {
      $response = array('url' => "url: ".$abahUrl1.'/v1/account/getPngCard', 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $contentType = curl_getinfo($curl, CURLINFO_CONTENT_TYPE);
      if($contentType === 'image/png' && $output != ''){
        $response = array('url' => "url: ".$abahUrl1.'/v1/account/getPngCard', 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => base64_encode($output));
      }else{
        $response = array('url' => "url: ".$abahUrl1.'/v1/account/getPngCard', 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
      }
    }

    curl_close($curl);

    logFileCreate($response);
    echo json_encode($response);
  }

  function PatientSmsNotify($para){
    $baseUrl = getBaseUrl();
    $abahUrl1 = $baseUrl[0]['abahUrl'];
    $abahUrl2 = $baseUrl[1]['abahUrl'];

    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $requestIdRes = fetchRequestId();
    if($requestIdRes != 'Error'){
      $requestID = stripslashes($requestIdRes);
      $requestID = trim($requestID, '"'); 
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    // $timestamp = (new DateTime())->format('Y-m-d\TH:i:s.v\Z');
    $date = new DateTime('now', new DateTimeZone('UTC'));
    $timestamp = $date->format('Y-m-d\TH:i:s.v\Z');

    $jsonData = [
      "requestId" => $requestID,
      "timestamp" => $timestamp,
      "notification" => [
        "phoneNo" => '+91-'.trim($para, '"'),
        "hip" => [
          "name" => "yog12 Facility",
          "id" => "ihl_yog12_2022"
        ]
      ]
    ];

    $jsonData = json_encode($jsonData);

    curl_setopt_array($curl, array(
      CURLOPT_URL => $abahUrl2.'/v0.5/patients/sms/notify2',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $jsonData,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer '.$Token,
        'Content-Type: application/json',
        'X-CM-ID: sbx'
      ),
    ));

    $output = curl_exec($curl);
    $httpcode = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      if($httpcode == 202){
        $response = array('status' => 'S', 'res' => $output);
      }else{
        $response = array('status' => 'E', 'res' => $output);
      }
    }

    echo json_encode($response);
  }

  function phrAbhaAddressSuggestion($para){

    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/registration/phr/suggestion',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/registration/phr/suggestion', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/registration/phr/suggestion', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function abhaProfileDetailsFetch($para){
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/profile/link/profileDetails',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json',
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/profile/link/profileDetails', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/profile/link/profileDetails', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function createAbhaPhrAddress($para){
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/create-phr-address',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $para,
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer '.$Token,
        'Content-Type: application/json'
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/create-phr-address', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/registration/hid/create-phr-address', 'body' => "payload: ".$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function abhaPhrAddressExist($para){
    $curl = curl_init();

    $datas = new stdClass();
    $datas->clientId = "SBX_001197";
    $datas->clientSecret = "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5";
    $datas->grantType = "client_credentials";

    $myJSON = json_encode($datas);

    $sessionRes = getSession($myJSON);
    if($sessionRes != 'Error'){
      $newOne = json_decode($sessionRes, true);
      $Token = $newOne['accessToken'];
    }else{
      $response = array('status' => 'E', 'res' => 'Try after sometime');
      exit;
    }

    $para = json_decode($para);

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://phrsbx.abdm.gov.in/api/v1/phr/search/isExist?phrAddress='.$para,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
      CURLOPT_HTTPHEADER => array(
        'Authorization: Bearer '.$Token
      ),
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/search/isExist?phrAddress='.$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('url' => "url: ".'https://phrsbx.abdm.gov.in/api/v1/phr/search/isExist?phrAddress='.$para, 'code' => "statusCode: ".curl_getinfo($curl, CURLINFO_HTTP_CODE), 'status' => 'S', 'res' => $output);
    }

    logFileCreate($response);
    echo json_encode($response);
  }

  function abhaAddressValidation($para){
    $curl = curl_init();

    $para = json_decode($para);

    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/check_and_validate_the_abha_address_or_number?abha_address_or_number='.$para,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'GET',
    ));

    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => $output);
    }

    echo json_encode($response);
  }

  function errorInfo(){
    $response = array('status' => 'E', 'res' => 'method not found');
    // echo("Error");
  }

  /*function logFileCreate($response){
    
    $filePath = "C:/Logs/abhLogs.txt";

    $timestamp = time();
    $formattedDate = date("Y-m-d H:i:s", $timestamp);    
    $newLineText = "[".$formattedDate."]"." ".implode(",", $response);

    $file = fopen($filePath, "a") or die("Unable to open file for appending!");
    fwrite($file, $newLineText . PHP_EOL);
    fclose($file);
  }*/

  function logFileCreate($logMessage, $maxFileSize = 1000000, $maxFileCount = 100) {
    $logDirectory = __DIR__ . '/ABHAlog'; // Directory for log files
    $currentLogFile = $logDirectory . '/log.txt'; // Initial log file

    // Check if the directory exists, if not, create it
    if (!file_exists($logDirectory)) {
        mkdir($logDirectory, 0777, true);
    }

    // Check the number of log files
    $logFiles = glob($logDirectory . '/log*.txt');
    $fileCount = count($logFiles);

    // Overwrite files if file count limit is reached
    if ($fileCount >= $maxFileCount) {
        for ($i = 1; $i <= $maxFileCount; $i++) {
            $currentLogFile = $logDirectory . '/log' . $i . '.txt';
            if (file_exists($currentLogFile)) {
                unlink($currentLogFile);
            }
        }
        $currentLogFile = $logDirectory . '/log.txt';
    }

    // Check if the current log file exists and its size
    if (file_exists($currentLogFile) && filesize($currentLogFile) > $maxFileSize) {
        // Find the next available log file name (incremental order)
        $count = 1;
        do {
            $newLogFile = $logDirectory . '/log' . $count . '.txt';
            $count++;
        } while (file_exists($newLogFile));

        $currentLogFile = $newLogFile;
    }

    // Concatenate key and value for each pair
    $keyValuePairs = array();
    
    foreach ($logMessage as $key => $value) {
        $keyValuePairs[] = "$key: $value";
    }

    // Join the key-value pairs into a single line
    $resultString = implode(', ', $keyValuePairs);

    // Add date and time to the log message
    $logMessage = date('Y-m-d H:i:s') . ' - ' . $resultString . PHP_EOL;

    // Open the file in append mode or create it if it doesn't exist
    $fileHandle = fopen($currentLogFile, 'a') or die("Unable to open file!");

    // Write the log message to the file
    fwrite($fileHandle, $logMessage);

    // Close the file handle
    fclose($fileHandle);

    // Change file permissions to 777 (if needed)
    // chmod($currentLogFile, 0777);
  }

  /*function abhaCareContextVitalLink($para){
    $curl = curl_init();
    curl_setopt_array($curl, array(
      CURLOPT_URL => 'https://devserver.indiahealthlink.com/ihlabha/ihlabha_carecontext_hip_init_edit',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS =>$para,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/json'
      ),
    ));
    $output = curl_exec($curl);

    if (curl_errno($curl)) {
      $error_msg = curl_error($curl);
    }

    curl_close($curl);

    if (isset($error_msg)) {
      $response = array('status' => 'E', 'res' => 'Technical issue');
    } else {
      $response = array('status' => 'S', 'res' => json_decode($output));
    }
    echo json_encode($response);
  } */ 
?>