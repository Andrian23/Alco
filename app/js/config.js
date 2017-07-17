app.config(function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "../components/main.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/catalogue', {
        templateUrl: "../components/catalogue.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/basket', {
        templateUrl: "../components/basket.html"
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/details', {
        templateUrl: '../components/details.html'
        , controller: 'myCtrl'
        , controllerAs: 'my'
    }).when('/admin', {
        templateUrl: '../components/admin.html'
        , controller: 'adminCtrl'
        , controllerAs: 'ad'
    }).otherwise({
        redirectTo: '/'
    })
});