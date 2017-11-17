app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider

        .state('home', {
            url: "/",
            templateUrl: "../components/main.html"
            , controller: 'myCtrl'
            , controllerAs: 'my'
        }).state('catalogue', {
            url: "/catalogue",
            templateUrl: "../components/catalogue.html"
            , controller: 'catalogCtrl'
            , controllerAs: 'cat'
        }).state('basket', {
            url: "/basket",
            templateUrl: "../components/basket.html"
            , controller: 'basketCtrl'
            , controllerAs: 'basket'
        }).state('details', {
            url: "/details",
            templateUrl: "../components/details.html"
            , controller: 'myCtrl'
            , controllerAs: 'my'
        }).state( 'admin', {
            url: '/admin',
        templateUrl: '../components/admin.html'
        , controller: 'adminCtrl'
        , controllerAs: 'ad'
    })
}).run(["$rootScope", function ($rootScope) {

    $rootScope.tray = [];
    $rootScope.wholeSaleNumb=6;
    $rootScope.order = {};
    $rootScope.userLoggedIn = {};
    $rootScope.alertMessage = 'для здійснення покупки необхідно авторизуватися';


    $rootScope.minus1 = function (id) {
        for (i in $rootScope.tray) {
            if ($rootScope.tray[i].id === id && $rootScope.tray[i].count > 1) {
                $rootScope.tray[i].count -= 1
                if($rootScope.tray[i].count<$rootScope.wholeSaleNumb){
                    $rootScope.tray[i].price=$rootScope.tray[i].priceC;
                }
            }else if($rootScope.tray[i].id === id && $rootScope.tray[i].count == 1){
                $rootScope.tray.splice(i, 1);
            }

        }

        localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray));
        $rootScope.totalOrderSum()

    };




    $rootScope.plus1 = function (id) {
        for (i in $rootScope.tray) {
            if ($rootScope.tray[i].id === id) {
                $rootScope.tray[i].count += 1;
                if($rootScope.tray[i].count>=$rootScope.wholeSaleNumb){
                    $rootScope.tray[i].price=$rootScope.tray[i].price2
                }


            }

        }
        localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray));
        $rootScope.totalOrderSum()
    };

    $rootScope.totalOrderSum = function () {
        $rootScope.totalSum = 0;
        for (i in $rootScope.tray) {
            $rootScope.totalSum += $rootScope.tray[i].count * $rootScope.tray[i].price
        }
    };

    $rootScope.delete_order = function (id) {
        for (i in $rootScope.tray) {
            if ($rootScope.tray[i].id == id) {
                $rootScope.tray.splice(i, 1);
                localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray));
                $rootScope.totalOrderSum()
            }
        }
    };


    $rootScope.ByGoods = function (goods) {

        $rootScope.GoodsB = goods;
        $rootScope.GoodsB.count = 1
        $rootScope.tray = JSON.parse(localStorage.getItem('goodsToBuy'));

        $rootScope.tray.push($rootScope.GoodsB)

        for (x in $rootScope.tray) {
            for (y in $rootScope.tray) {
                if ($rootScope.tray[x].id == $rootScope.tray[y].id && x != y) {
                    $rootScope.tray[x].count += $rootScope.tray[y].count
                    $rootScope.tray.splice(y, 1)
                    y = x
                }
            }

        }
        localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray));

        $rootScope.trayCheck()
    };
    $rootScope.trayCheck = function () {
        $rootScope.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        for (i in $rootScope.tray) {
            if ($rootScope.tray[i].count == 0) {
                $rootScope.tray.splice(i, 1)
            }
        }
        $rootScope.totalOrderSum()
    }


    //********************************************************************************************************LOCAL STORAGE
    $rootScope.localStore = function () {
        //traycheck
        $rootScope.tray = JSON.parse(localStorage.getItem('goodsToBuy'));
        if ($rootScope.tray == null || $rootScope.tray.length == 0) {
            $rootScope.tray = [];

            localStorage.setItem('goodsToBuy', JSON.stringify($rootScope.tray));
        }
        else {
            $rootScope.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        }
        $rootScope.commodity = JSON.parse(localStorage.getItem('commodity'));
        if ($rootScope.commodity == null || $rootScope.commodity.length == 0) {
            $rootScope.commodity = [];

            localStorage.setItem('commodity', JSON.stringify($rootScope.commodity));
        }
        else {
            $rootScope.commodity = JSON.parse(localStorage.getItem('commodity'))
        }


    };
    $rootScope.initRoot = function () {
        $rootScope.localStore();
        $rootScope.trayCheck();

    }


}]);