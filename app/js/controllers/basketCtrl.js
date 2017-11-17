angular.module("myapp").controller("basketCtrl",['$scope','UserService', '$rootScope', function ($scope , UserService, $rootScope) {
    var vm = this;
    vm.tray = [];
    vm.wholeSaleNumb=6;
    vm.order = {};
    vm.userLoggedIn = {};
    vm.alertMessage = 'для здійснення покупки необхідно авторизуватися';





    vm.confirmOrder = function () {
        if ($rootScope.userLoggedIn.name == undefined) {
            $rootScope.alertConfirmation = true;
            $rootScope.alertMessage = 'для здійснення покупки необхідно авторизуватися'
        } else {

            $rootScope.order.goodsOrdered = $rootScope.tray;
            $rootScope.order.archive = false
            UserService.addOrder($rootScope.order)

            $rootScope.tray = []
            localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray))

            $rootScope.alertConfirmation = true

            // location.href="#/catalogue"
        }
    };




}]);