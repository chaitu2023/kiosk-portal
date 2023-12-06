higiKioskControllers.directive('ihlMembershipModal', ['$rootScope', 'HigiKioskFlow', 'HigiKioskUserService', '$q', 'HigiApiService', 'HigiKioskStorageService', 'HigiKioskUtilitiesService', 'JkioskService', '$timeout', '$sce', '$http', function ($rootScope, HigiKioskFlow, HigiKioskUserService, $q, HigiApiService, HigiKioskStorageService, HigiKioskUtilitiesService, JkioskService, $timeout, $sce, $http) {
    return {
        restrict: 'E',
        scope: false,
        templateUrl: 'components/modal/ihl-membership-modal.html',
        link: function ($scope, elem, attrs) {
            $scope.ihlMembership = new Object();
            $scope.ihlMembership.init = function () {
                console.log("Comes to IHL member");

                $scope.ihlMembership.membershipNextBtnClass = '';

                $scope.ihlMembership.membershipPlanArray = [
                    {
                        planName: "Selected Services",
                        planlimit: "Pay per use",
                        amount: "250",
                        valueAddedList: ['BP, ECG, Temperature, BMI(1 time)', 'Dengue, Glucose, HCV, Syphilis(1 time)'],
                        image: 'selected_services'
                    },
                    {
                        planName: "1 Month",
                        planlimit: "31 day",
                        amount: "999",
                        valueAddedList: ['15 diet conditions', 'BP, ECG, Weight & BMI, SpO2(10 time)', 'Lipid Profile, HCV(5 times)'],
                        image: 'one_month_plan'
                    },
                    {
                        planName: "6 Months",
                        planlimit: "182",
                        amount: "3499",
                        valueAddedList: ['40 diet conditions', 'BP, ECG, Weight & BMI, SpO2(20 time)', 'Lipid Profile, Glucose, HCV(20 times)'],
                        image: 'six_months_plan'
                    }
                ];

                $scope.ihlMembership.ihlMembershipListShow = true;

            };

            $rootScope.ihlMembershipModelInit = $scope.ihlMembership.init;

            $scope.selectPackageType = function(item){
                console.log(item);
                $scope.ihlMembership.membershipNextBtnClass = 'membership_next_btn_active';
            }
        }
    }
}]);