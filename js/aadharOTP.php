<?php

$curl = curl_init();

curl_setopt_array($curl, array(
  CURLOPT_URL => '{{baseUHI}}/v1/registration/aadhaar/generateOtp',
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_ENCODING => '',
  CURLOPT_MAXREDIRS => 10,
  CURLOPT_TIMEOUT => 0,
  CURLOPT_FOLLOWLOCATION => true,
  CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  CURLOPT_CUSTOMREQUEST => 'POST',
  CURLOPT_POSTFIELDS =>'{
    "aadhaar": ""
}',
  CURLOPT_HTTPHEADER => array(
    'accept: */*',
    'Accept-Language: en-US',
    'Content-Type: application/json',
    'Authorization: Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJBbFJiNVdDbThUbTlFSl9JZk85ejA2ajlvQ3Y1MXBLS0ZrbkdiX1RCdkswIn0.eyJleHAiOjE2ODgyMDM0MzQsImlhdCI6MTY4ODIwMjgzNCwianRpIjoiZTgzNWIxMmYtNzBhZC00ZjY4LThiNDAtNWE5MmY1MmI2NjNhIiwiaXNzIjoiaHR0cHM6Ly9kZXYubmRobS5nb3YuaW4vYXV0aC9yZWFsbXMvY2VudHJhbC1yZWdpc3RyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI0MWYwNmEwMi1lMzMzLTRiNzktYmZhMC1hODEzOTM0YTQzNTEiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJTQlhfMDAxMTk3Iiwic2Vzc2lvbl9zdGF0ZSI6ImQ3NGI1YjM3LTFmNDEtNDEyMy1iYzliLWViYWMxZmFiNzNlZSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cDovL2xvY2FsaG9zdDo5MDA3Il0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJoaXUiLCJvZmZsaW5lX2FjY2VzcyIsImhlYWx0aElkIiwicGhyIiwiT0lEQyIsImhpcCJdfSwicmVzb3VyY2VfYWNjZXNzIjp7IlNCWF8wMDExOTciOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iXX0sImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJjbGllbnRJZCI6IlNCWF8wMDExOTciLCJjbGllbnRIb3N0IjoiMTAuMjMzLjY3LjY0IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJzZXJ2aWNlLWFjY291bnQtc2J4XzAwMTE5NyIsImNsaWVudEFkZHJlc3MiOiIxMC4yMzMuNjcuNjQifQ.WDmhwsrxuGNFGAoDuo3xYJ-qpJpj8bC7UuMml5oTUHHmQJxyKXg83-E6CbHYxXvhfg2jbOHoU2IJd59ckBMbhjSzgByGpSZ5_20PSkfzsD10ityUwbUBD6LHWplVzWa6MFYVHwUo8vYlGrNwQFbjU8lQCdbFTOgRwwDuryeUB499BOR8k59xbihUDg3zfaugygXO92boDcLlLYVEE2GOu5UlxQ1nr9uXgc7xFSnkwmiXCekByp1FYDjkp6DSK3nGGGmIZEEftiGufRcYYjJnrbRg_fBYnom-90Wg7HhhBwwY1gWmc_4VQqKWi8C9xXEG9gTxRsOFjqsjVIqMrZDpOA'
  ),
));

$response = curl_exec($curl);

curl_close($curl);
echo $response;
?>