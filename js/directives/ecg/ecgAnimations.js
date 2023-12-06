angular.module("higiKioskUi")
.directive("ecgGauge", ['$q', '$rootScope', 'HigiKioskStorageService', '$timeout' , 'HigiKioskUtilitiesService', function($q, $rootScope, HigiKioskStorageService, $timeout, HigiKioskUtilitiesService) {
        //Weight Guage
        return {
            restrict : 'E',
            scope : false,
            templateUrl : 'components/ecg/ecg-gauge.html',
            link : function(scope, elem, attr){


                /*$rootScope.ecgAnimateReplay= function() {
                    alert('inside click');*/
                    /*var path =  '../images/ecgloader.gif';
                    replayGif(path);
                    $('#ecg_ad_video').css("display", "none");
                    $timeout(function(){
                        $('#ecg_ad_video').css("display", "block");
                    }, 5000); */   
                
                //}
                   /* $timeout(function(){
                       // $rootScope.ecgAnimateReplay();
                       //$rootScope.loadModal({id: 'ecgdisplay'});    
                        document.getElementById('exit_confirmss25').style.display="block";
                        document.getElementById('save_results').style.display="none";
                        //$rootScope.loadModal({id: 'ecgdisplay'});  
                        console.log('Hnot got in javascript');
                        window.setInterval($rootScope.placehand(),1000);
                    }, 14000); */



            	$('#ecg_ad_video').css("display", "none");
            	$timeout(function(){
            		$('#ecg_ad_video').css("display", "block");
            	}, 5000);            	
            }
        }
}]);


function replayGif(path){
    var img = new Image();
    img.src = path;
    var gifRefresh = img.src + '?x=' + Date.now();
    document.getElementById('ecgAnimation').style.backgroundImage = 'url("' + gifRefresh + '")';
    document.getElementById('ecgAnimation').style.display='block';
}