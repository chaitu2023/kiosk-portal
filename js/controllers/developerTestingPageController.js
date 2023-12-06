higiKioskControllers.controller('developerTestingPageController' , ['$scope', '$routeParams' , '$rootScope', '$location', '$q' , 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskFlow', '$timeout', 'HigiKioskStorageService', 'JkioskService', function($scope, $routeParams, $rootScope , $location, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskFlow, $timeout, HigiKioskStorageService, JkioskService){

	/*$timeout(function(){
	    $scope.scroll = new iScroll('book_appointment_ava_slot_test', {vScroll:false, scrollbarClass:'.test_slots_scroll_bar', hScroll : true, hScrollbar:true});
	    if($scope.scroll['hScrollbarWrapper'] == undefined){
	        $timeout(function(){$scope.scroll.refresh()}, 2000);
	    }
	},0);*/

}]);

higiKioskControllers.directive('dScrollHorizontally', function(){
	return {
		restrict: 'A',
		link: function(scope, elem, attr){
			scope.scrollToRight = function(){
				elem[0].scrollLeft += Number(attr.dScrollHorizontally);	
			}
			
			scope.scrollToLeft = function(){
				elem[0].scrollLeft -= Number(attr.dScrollHorizontally);	
			}
			
		}
	}
})