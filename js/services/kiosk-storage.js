var higiServices = angular.module("higiKioskUi");
higiServices.factory('HigiKioskStorageService', [ '$http' , '$rootScope' ,'$location', function($http, $rootScope, $location) {
    var data =  $rootScope.$new(true);
    
    return {
        saveSessionData: function (key, value) {
        	
            //if (typeof($rootScope.sessionData) == "undefined") {
            //    $rootScope.sessionData = [];
            //}
        	
            data[key] = value;
            //$rootScope.sessionData[key] = value;
            //$rootScope.sessionData =  $rootScope.sessionData;
            //Can remove after conversion to angular complete
            //store to local storage as well as rootScope
            $('body').removeData(key);
            $('body').data(key, value);
            
            /*if($location.url() == '/finish/forward'){                
                console.log(data);
            }*/
        },
        returnSessionData: function (key) {
            return data[key];
        },
        watchSessionData : function(key,fn){        	
            return data.$watch(key, fn);
        },
        getSettingsValue: function (settingKey) {
            return data["appSettings"][settingKey];
        },
        loadSettings : function () {
            // load settings values synchronously to ensure
            // they are loaded before we attempt to use them
            data["appSettings"] = $.parseJSON(
                $.ajax(
                    {
                        url: "json/appSettings.json",
                        async: false,
                        dataType: 'json'
                    }
                ).responseText
            );

            // Update API URL From Settings
            HigiBaseUrl = this.getSettingsValue('kiosk.api.url');
            HigiProxyBypassUrl = this.getSettingsValue('kiosk.api.proxybypass.url');
            kioskADAMode = true;
            $rootScope.uiTestingEnabled =  this.getSettingsValue('kiosk.ui.testing.enabled');
            //$rootScope.globalAudioVolume = this.getSettingsValue('global.default.audio.volume');
            $rootScope.enabledCursor =  this.getSettingsValue('kiosk.textfield.cursor.enabled') ? "enabled-cursor" : "";
            $rootScope.emailExtensionEnabled = this.getSettingsValue('kiosk.email.extensions.enabled');
            $rootScope.emailExtensionEnabledSplit = this.getSettingsValue('kiosk.email.extensions.enabled.split');
            $rootScope.emailTextfieldClearButton = this.getSettingsValue('kiosk.textfield.clear.textfield.enabled');
            appSettings = data["appSettings"];
        },

        loadPlaceholder : function () {
            // load settings values synchronously to ensure
            // they are loaded before we attempt to use them
            data["placeholder"] = $.parseJSON(
                $.ajax(
                    {
                        url: "json/placeholder.json",
                        async: false,
                        dataType: 'json'
                    }
                ).responseText
            );
            $rootScope.langPlaceholder = data["placeholder"];
        }
    }
}]);



