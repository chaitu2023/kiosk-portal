AbhaApi = (function () {

    this.encodeAbhaText = function(success, error){
        var url = 'https://phr.abdm.gov.in/api/v1/phr/public/certificate';
        jkiosk.abhaApiProxy(url, 'GET', '', success, error);
    }

    // this.abhaSessionToken = function(success, error){
    //     let data = JSON.stringify({
    //         "clientId": "SBX_001197",
    //         "clientSecret": "1bc7860a-c42e-4cb2-85e0-f8606c22b1c5",
    //         "grantType": "client_credentials"
    //     });
    //     var url = 'https://dev.abdm.gov.in/gateway/v0.5/sessions';
    //     jkiosk.abhaApiProxy(url, 'POST', data, success, error,{'Content-Type':'application/json'
    // });
    // };

    this.getABHASession = function(data, success, error){
        //var url = getSettingsValue('kiosk.port')+"/server/abhaService.php";
        //var url = "https://dashboard.indiahealthlink.com/abhaKioskCallBack/abhaService.php"; // suma soft certification
        //var url = "https://dashboard.indiahealthlink.com/abhaKioskCallBack/abhaServiceLocal.php"; // ABHA SBX base utl 
        var url = "https://indiahealthlink.com/abhaServiceLocal.php";
        //var url = "http://xampp.indiahealthlink.com:9000/abhaKioskCallBack/abhaServiceLocal.php";
        jkiosk.abhaApiProxy(url, 'POST', data, success, error);
    };

    return this;
})();