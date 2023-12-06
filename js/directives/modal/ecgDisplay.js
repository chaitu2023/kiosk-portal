 higiKioskControllers.directive('ecgDisplayModal', ['$rootScope' , 'HigiKioskStorageService' , 'JkioskService' , function($rootScope, HigiKioskStorageService, JkioskService) {
   
   
    return{
        restrict: 'E',
        scope: true,
        templateUrl: 'components/modal/ecg-display.html',
        link :function(scope, elem, attr){


            scope.ecgDisplay = new Object();

             //$rootScope.toggleEcgModalVisible();

scope.ecgDisplay.Redo = function(item) {

 // document.getElementById('exit_confirmss2').style.display="block";
 



     $rootScope.toggleEcgModalVisible();

    
 

}

scope.ecgDisplay.Exit = function(item) {
    
     $rootScope.toggleEcgModalVisible();
if($rootScope.mode=='bpw'){
   document.getElementById('higi_slide_container').style.display="block";
     window.location= '#/weight1/forward';
  }else{
  //   document.getElementById('higi_slide_container').style.display="block";
    window.location = "#/comebacksoon"
  }
  
 


}
 
  
            //scope.ecgDisplay.init();
        }

    };
}]);

