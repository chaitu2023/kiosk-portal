higiKioskControllers.controller('teleconsultationMemberServiceController', ['$scope', '$routeParams', '$rootScope', 'HigiKioskFlow', '$q', 'HigiKioskAnimationService', 'HigiKioskPromiseService', 'HigiKioskUserService', '$timeout', 'JkioskService', 'HigiKioskStorageService', 'HigiApiService',  '$interval', function ($scope, $routeParams, $rootScope, HigiKioskFlow, $q, HigiKioskAnimationService, HigiKioskPromiseService, HigiKioskUserService, $timeout, JkioskService, HigiKioskStorageService, HigiApiService, $interval) {

    $scope.prevIsVisible = true;

    $scope.initSuccess = function() {
        $scope.currentSelectedTab = '';
        $scope.containerMessage = 'Please wait. Data is being loaded';
        $scope.nextVisible = false;
        $scope.showTabs = true;
        $scope.prevIsVisible = true;
        $scope.getAffiliationLogo();
        $scope.affiliationCategoryList = [{category_name:"Physical Wellbeing"}, {category_name:"Emotional Wellbeing"}, {category_name:"Financial Wellbeing"}, {category_name:"Social Wellbeing"}];
        $scope.showAffiliationList = true;
        $scope.enableCategoryList = false;
        $rootScope.selectedCategory = '';
    }

    $scope.initError = function() {
        $scope.containerMessage = "Error Loading Data";
        $scope.showTabs = false;        
    }

    $scope.openTab = function(affiliation) {
        if($scope.currentSelectedTab == affiliation.affilate_name){
            $scope.currentSelectedTab = '';            
            $scope.nextVisible = false;
            $rootScope.selectedAffiliation = {};
            return;
        } else {
            $scope.currentSelectedTab = affiliation.affilate_name;
            $scope.nextVisible = true;      
            $rootScope.selectedAffiliation = affiliation;                  
        }        
    }

    $scope.nextButtonClick = function() {
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        $timeout(function(){
            window.location = '#/ihl-teleconsultation-dashboard';
        },500);

        //setting member service booking and direct call options enabled or not
        $rootScope.hpodAffiliations.map(affiliation => {
            if($scope.currentSelectedTab == affiliation.affilate_name) {
                if(affiliation.book_appointment_enabled == "true" || affiliation.book_appointment_enabled == true) $rootScope.enableGeneralServiceBookAppointmentOption = true;
                else $rootScope.enableGeneralServiceBookAppointmentOption = false;

                if(affiliation.direct_call_enabled == "true" || affiliation.direct_call_enabled == true) $rootScope.enableGeneralServiceDirectCallOption = true;
                else $rootScope.enableGeneralServiceDirectCallOption = false;
            }
        });
    }

    $scope.backButtonOut = function() {
        $timeout(()=>{
            window.location = "#/ihl-teleconsultation-main-dashboard";
        }, 500);
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
    }

    /* uncomment for 4 pillar category starts here
    $scope.nextButtonClick = function() {
        $scope.prevIsVisible = false;
        $scope.nextVisible = false;
        if($scope.showAffiliationList == true){
            $scope.showAffiliationList = false;
            $scope.enableCategoryList = true;
        }
        if($scope.enableCategoryList == true){
            $scope.prevIsVisible = true;
        }
        if($scope.enableCategoryList == true && $rootScope.selectedCategory != ''){
            $timeout(()=>{
                window.location = "#/ihl-teleconsultation-dashboard";
            }, 500);
        }
    }

    $scope.selectCategory = function(category){
        if($scope.currentSelectedTab == category.category_name){
            $scope.currentSelectedTab = '';            
            $scope.nextVisible = false;
            $rootScope.selectedCategory = '';
            return;
        } else {
            $scope.currentSelectedTab = category.category_name;
            $scope.nextVisible = true;      
            $rootScope.selectedCategory = category.category_name;
        }

    }

    $scope.backButtonOut = function() {

        if($scope.showAffiliationList == true){
            $timeout(()=>{
                window.location = "#/ihl-teleconsultation-main-dashboard";
            }, 500);
            $scope.prevIsVisible = false;
            $scope.nextVisible = false;
        }else if($scope.enableCategoryList == true){
            $rootScope.selectedCategory = '';
            $scope.enableCategoryList = false;
            $scope.showAffiliationList = true;
            $scope.prevIsVisible = true;
        }
    }
    
    uncomment for 4 pillar category ends here */

    $scope.getAffiliationLogo = function() {
        console.log($rootScope.hpodAffiliations);
        $rootScope.hpodAffiliations.forEach(data => {
            let affiliationLogo = $rootScope.affiliateListFech.find(x => x.company_name === data.affilate_name);
            console.log(affiliationLogo);
            if (affiliationLogo != undefined && affiliationLogo['brand_image_url'].includes('https')) {
                data['logo_available'] = true;
                data['affiliation_logo'] = affiliationLogo['brand_image_url'];
            }
            else {
                data['logo_available'] = false;
            }
        });
    }

    $scope.initSuccess();

}]);