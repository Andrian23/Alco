var app=angular.module("myapp", ['ngRoute'
    , 'ngAnimate'
    ,'uiSlider'
    ,'slickCarousel',
    'naif.base64'
]);

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
app.controller('myCtrl', ['UserService', function (UserService, $timeout) {
    var vm = this;
    vm.show_registration = false;
    vm.show_sign_in = false;
    vm.selectdays = '';
    vm.selectmonth = '';
    vm.selectyear = '';
    vm.month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    vm.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    vm.year = [];
    vm.NewUser = [];
    vm.ConfirmOrder = [];
    vm.Orders = [];
    vm.order = {};
    vm.detorder = [];
    vm.CountGood = 'В корзині немає товарів';
    vm.items = [];
    vm.page_count = 0;
    vm.search = '';
    vm.show_basket = false;
    vm.show_map = false;
    vm.tray = [];
    vm.user = {};
    vm.catCat = null;
    vm.alertMessage = 'для здійснення покупки необхідно авторизуватися';
    vm.banners = [];
    vm.discount = 1;
    vm.wholesale = false;
    vm.priceRegister = false;
    vm.PriceCount = 0;
    vm.userLoggedIn = {};
    vm.discountSize=0.3
    vm.wholeSaleNumb=6;
    vm.start = function () {
        vm.goodsDB = UserService.getGoodsFromDB();
        vm.getGoods();

        vm.length = vm.goodsDB.length;
        vm.categoryToStart = JSON.parse(localStorage.getItem('category'));
        // localStorage.clear();

        if (vm.categoryToStart != null || vm.categoryToStart != undefined) {

            vm.filterByCategory(vm.categoryToStart)
        }


    };
    vm.catFromMain = function (x) {
        vm.cat = {};
        vm.cat.cat = x;
        localStorage.setItem('category', JSON.stringify(x));


    };
    vm.getDates = function () {
        for (var i = 2017; i >= 1920; i--) {
            vm.year.push(i.toString())
        }
    };


//**********************************************************************************************registration and logIn

    vm.register = function (newUser) {
        vm.newUser = newUser;
        vm.newUser.confirmed = false;

        vm.show_registration = !vm.show_registration;
        UserService.addUser(vm.newUser)
    };
    vm.getUsers = function () {
        vm.users = UserService.getUsers();

        // vm.loggedUserCheck()
    };

    vm.logIn = function () {
        vm.users = UserService.getUsers();
        for (i in vm.users) {
            if (vm.user.email == vm.users[i].email && vm.user.password == vm.users[i].password) {
                vm.user = vm.users[i];
                vm.users=[]
                delete vm.user.password;
                vm.discount = vm.discountSize;
                vm.getGoods()
                vm.logInButton = false;
                vm.logOutButton = true;
                localStorage.setItem('user', JSON.stringify(vm.user));
                vm.ShowSignIn = !vm.ShowSignIn;
                vm.logInButton = false;
                vm.logOutButton = true;
                vm.user = {};
                break
            }
        }
    };
    vm.loggedUserCheck = function () {
        vm.userLoggedIn = JSON.parse(localStorage.getItem('user'));
        if (vm.userLoggedIn == null || vm.userLoggedIn==undefined) {
            vm.userLoggedIn = {};
            vm.logInButton = true
            localStorage.setItem('user', JSON.stringify(vm.userLoggedIn));
        }
        else {
            vm.logInButton = false;
            vm.logOutButton=true
                vm.discount=vm.discountSize
        }
        vm.registeredUserCheck()


    };
    vm.logOut = function () {
        vm.logInButton = true;
        vm.logOutButton = false;
        vm.userLoggedIn = {};
        localStorage.setItem('user', JSON.stringify(vm.userLoggedIn));
        vm.PriceCount = 0;
        vm.discount = 1;
        vm.getGoods()

    };

    vm.registeredUserCheck = function () {
        vm.userLoggedIn = JSON.parse(localStorage.getItem('user'))
        if(typeof vm.userLoggedIn.name=="string"){
            vm.logInButton = false;
            vm.logOutButton = true;
            vm.discount=vm.discountSize
        }else{
            vm.discount=1
            vm.logInButton = true;
            vm.logOutButton = false;
        }

    }
    vm.openNav = function () {
        document.getElementById("mySidenav").style.width = "350px";
    };
    vm.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
//***********************************************************************************************************get goods
    vm.getGoods = function () {
        vm.goods = vm.goodsDB;
        for(i in vm.goods) {
            vm.goods[i].priceC = vm.goods[i].price
        }

        vm.pagination()
    };
//*********************************************************************************************************goods details
    vm.goodsDetails = JSON.parse(localStorage.getItem('commodity'));
    vm.detail_of_goods = function (commodity) {
        vm.goodsDetails = commodity;
        vm.goodsDetails.count = 1;
        localStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))


    };
    vm.detail_of_goods_banner = function (id) {
        for (i in vm.goods) {
            if (vm.goods[i].id === id) {
                vm.goodsDetails = vm.goods[i];
                vm.goodsDetails.count = 1;
                localStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            }
        }
        ;
        window.location.href = '#/details'
    };
    vm.detailsOfSearch = function (x) {
        if (location.href.includes("details")) {
            location.href = '#/catalogue';

            vm.goodsDetails = x;
            vm.goodsDetails.count = 1;
            localStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            window.location.href = '#/details';
            my.searchResults = false;
            my.search = ''
        } else {

            vm.goodsDetails = x;
            vm.goodsDetails.count = 1;
            localStorage.setItem("commodity", JSON.stringify(vm.goodsDetails));
            window.location.href = '#/details';
            my.searchResults = false;
            my.search = ''

        }


    };
    vm.plus2 = function (count) {
        vm.goodsDetails.count++
        if(vm.goodsDetails.count>=vm.wholeSaleNumb){
            vm.messageDiscount=true
            vm.goodsDetails.price=vm.goodsDetails.price2
        }else {
            vm.goodsDetails.price = vm.goodsDetails.priceC
            vm.messageDiscount = false
        }
    };
    vm.minus2 = function (count) {
        if (vm.goodsDetails.count > 1) {
            vm.goodsDetails.count--;

        }
        if (vm.goodsDetails.count < 6) {
            vm.messageDiscount=false
            vm.goodsDetails.price=vm.goodsDetails.priceC
        }

    };
    vm.detailsOfOrder = function () {
        vm.order = vm.userLoggedIn
        vm.order.archive = false


    }
    vm.ByGoods2 = function (goods) {

        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'));

        vm.tray.push(goods)
        for (x in vm.tray) {
            for (y in vm.tray) {
                if (vm.tray[x].id == vm.tray[y].id && x != y) {
                    vm.tray[x].count += vm.tray[y].count
                    vm.tray.splice(y, 1)
                    y = x
                }
            }

        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));

        vm.trayCheck()
        location.href = '#/catalogue'

    };
    vm.plus1 = function (id) {
        for (i in vm.tray) {
            if (vm.tray[i].id === id) {
                vm.tray[i].count += 1
                if(vm.tray[i].count>=vm.wholeSaleNumb){
                    vm.tray[i].price=vm.tray[i].price2
                }


            }

        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))
        vm.totalOrderSum()
    }
    vm.minus1 = function (id) {
        for (i in vm.tray) {
            if (vm.tray[i].id === id && vm.tray[i].count > 1) {
                vm.tray[i].count -= 1
                if(vm.tray[i].count<vm.wholeSaleNumb){
                    vm.tray[i].price=vm.tray[i].priceC
                    console.log(vm.tray[i])
                }

            }else if(vm.tray[i].id === id && vm.tray[i].count ==1){
                alert()
            }

        }

        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))
        vm.totalOrderSum()

    }
    vm.delete_order = function (id) {
        for (i in vm.tray) {
            if (vm.tray[i].id == id) {
                vm.tray.splice(i, 1)
                localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))
                vm.totalOrderSum()
            }
        }
    };

    //********************************************************************************************************LOCAL STORAGE
    vm.localStore = function () {
        //traycheck
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'));
        if (vm.tray == null || vm.tray.length == 0) {
            vm.tray = [];

            localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));
        }
        else {
            vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        }
        vm.commodity = JSON.parse(localStorage.getItem('commodity'));
        if (vm.commodity == null || vm.commodity.length == 0) {
            vm.commodity = [];

            localStorage.setItem('commodity', JSON.stringify(vm.commodity));
        }
        else {
            vm.commodity = JSON.parse(localStorage.getItem('commodity'))
        }


    };
    vm.trayCheck = function () {
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        for (i in vm.tray) {
            if (vm.tray[i].count == 0) {
                vm.tray.splice(i, 1)
            }
        }
        vm.totalOrderSum()
    }

//*****************************************************************************************************************TRAY

    vm.totalOrderSum = function () {
        vm.totalSum = 0
        for (i in vm.tray) {
            vm.totalSum += vm.tray[i].count * vm.tray[i].price
        }
    }
//**********************************************************************************************goods To Tray from details

    //**********************************************************************************************BUY GOODS

    vm.ByGoods = function (goods) {

        vm.GoodsB = goods
        vm.GoodsB.count = 1
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'));

        vm.tray.push(vm.GoodsB)

        for (x in vm.tray) {
            for (y in vm.tray) {
                if (vm.tray[x].id == vm.tray[y].id && x != y) {
                    vm.tray[x].count += vm.tray[y].count
                    vm.tray.splice(y, 1)
                    y = x
                }
            }

        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));

        vm.trayCheck()
    };
    vm.confirmOrder = function () {
        vm.checkLoggedUser()
        if (vm.userLoggedIn.name == undefined) {
            vm.alertConfirmation = true
            vm.alertMessage = 'для здійснення покупки необхідно авторизуватися'
        } else {

            vm.order.goodsOrdered = vm.tray

            vm.order.archive = false
            UserService.addOrder(vm.order)

            vm.tray = []
            localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))

            vm.alertConfirmation = true

            // location.href="#/catalogue"
        }
    }


//***********************************************************************************************************pagination
    vm.startingItem = 0
    vm.goToPage = function (x) {
        vm.startingItem = x * vm.itemsPerPage - vm.itemsPerPage;
    }
    vm.pagination = function () {
        vm.startingItem = 0
        vm.pages = []
        vm.currentPage = 0;
        vm.itemsPerPage = 16;
        vm.items = vm.page_count;
        vm.num = Math.ceil(vm.goods.length / vm.itemsPerPage)
        vm.page = 0
        for (i = 1; i <= vm.num; i++)

            vm.pages.push(i)


    };

// **********************************************************************************************FILTERS AND SORTERS
    vm.search1 = function (el) {
        if (vm.search != '')
            return true
    };

    vm.FiltersPrepare = function () {
        vm.price = [];
        vm.volume = [];
        vm.strength = [];
        vm.brand = [];
        vm.state = [];
        vm.category = [];
        vm.onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        for (i in vm.goods) {
            vm.category.push(vm.goods[i].category);
            vm.category = vm.category.filter(vm.onlyUnique);
            vm.price.push(parseInt(vm.goods[i].price));
            vm.price = vm.price.filter(vm.onlyUnique).sort();
            vm.brand.push(vm.goods[i].brand);
            vm.brand = vm.brand.filter(vm.onlyUnique);
            vm.state.push(vm.goods[i].country);
            vm.state = vm.state.filter(vm.onlyUnique);
            vm.strength.push(vm.goods[i].strength);
            vm.strength = vm.strength.filter(vm.onlyUnique);
            vm.volume.push(parseInt(vm.goods[i].volume));
            vm.volume = vm.volume.filter(vm.onlyUnique);
        }
        vm.lower_price_bound = vm.price[0];
        vm.upper_price_bound = vm.price[vm.price.length - 1];
        vm.lp = vm.price[0]
        vm.hp = vm.price[vm.price.length - 1]


    };

//**********************************************************************************************filters by category

    vm.filterByCategory = function (x) {
        vm.categoryToStart = '';

        vm.goods = UserService.getByCategory(x);
        vm.FiltersPrepare();
        vm.pagination()
    };

// **********************************************************************************************filtering by PRICE
    vm.priceRange = function (goods) {
        return (parseInt(goods['price']) >= vm.lower_price_bound && parseInt(goods['price']) <= vm.upper_price_bound);
    };
    vm.sortGoods = function (y) {
        vm.myOrderBy = y;
    }
// **********************************************************************************************filtering by VOLUME

    vm.volumeIncludes = [];
    vm.includeVolume = function (volume) {
        var i = vm.volumeIncludes.indexOf(volume);
        if (i > -1) {
            vm.volumeIncludes.splice(i, 1);
        } else {
            vm.volumeIncludes.push(volume);
        }
    };
    vm.volumeFilter = function (volume) {
        if (vm.volumeIncludes.length > 0) {
            if (vm.volumeIncludes.indexOf(volume.volume) < 0)
                return;
        }
        return volume;
    };

// **********************************************************************************************filtering by BRAND

    vm.brandIncludes = []
    vm.includeBrand = function (brand) {
        var i = vm.brandIncludes.indexOf(brand)
        if (i > -1) {
            vm.brandIncludes.splice(i, 1);
        } else {
            vm.brandIncludes.push(brand);
        }
    };
    vm.brandFilter = function (brand) {
        if (vm.brandIncludes.length > 0) {
            if (vm.brandIncludes.indexOf(brand.brand) < 0)
                return;
        }
        return brand;
    };

// ************************************************************************************************filtering by COUNTRY

    vm.countryIncludes = []
    vm.includeCountry = function (country) {
        var i = vm.countryIncludes.indexOf(country)
        if (i > -1) {
            vm.countryIncludes.splice(i, 1);
        } else {
            vm.countryIncludes.push(country);
        }
    };
    vm.countryFilter = function (country) {
        if (vm.countryIncludes.length > 0) {
            if (vm.countryIncludes.indexOf(country.country) < 0)
                return;
        }
        return country;
    };

//********************************************************************************************** filtering by STRENGTH

    vm.strengthIncludes = []
    vm.includeStrength = function (strength) {
        var i = vm.strengthIncludes.indexOf(strength)
        if (i > -1) {

            vm.strengthIncludes.splice(i, 1);
        } else {
            vm.strengthIncludes.push(strength);

        }
    };
    vm.strengthFilter = function (strength) {

        if (vm.strengthIncludes.length > 0) {
            if (vm.strengthIncludes.indexOf(strength.strength) < 0)
                return;
        }
        return strength;
    };
    //******************************************************************************************************main BANNER
    vm.slickConfig1Loaded = true;
    vm.updateNumber1 = function () {
        vm.slickConfig1Loaded = false;
        // vm.number1[2] = '123';
        vm.number1.push(Math.floor((Math.random() * 10) + 100));
        $timeout(function () {
            vm.slickConfig1Loaded = true;
        }, 5);
    };
    vm.slickCurrentIndex = 0;
    vm.slickConfig1 = {
        dots: true,
        // autoplay: false,
        autoplay: true,
        adaptiveHeight: true,
        initialSlide: 0,
        slidesToShow: 1,
        itemsDesktop: [780, 1],
        slidesPerRow: 1,
        swipeToSlide: true,
        slidesToScroll: 1,
        infinite: true,
        buttons: true,
        autoplaySpeed: 2000,
        variableWidth: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 720,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ],
        // fade:true,

        mobileFirst: true,
        method: {},
        event: {}
    };

//**********************************************************************************************carousele on main page
    vm.goodsForSlider1 = function () {
        vm.number = vm.goodsDB

        for (i in vm.goods) {

            if (vm.goodsDB[i].promo == true && i % 2 == 0) {
                vm.number.push(vm.goodsDB[i])
            }

        }
    }
    vm.goodsForSlider2 = function () {
        vm.number2 = []
        for (i in vm.goodsDB) {
            if (vm.goodsDB[i].promo == true && i % 2 == 1) {
                vm.number2.push(vm.goodsDB[i])
            }
        }
    }
    vm.slickConfigLoaded = true;
    vm.updateNumber = function () {
        vm.slickConfigLoaded = false;
        vm.number[2] = 'ggg';
        vm.number.push(Math.floor((Math.random() * 10) + 100));
        $timeout(function () {
            vm.slickConfigLoaded = true;
        });
    };
    vm.slickConfig = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 1500,
        slidesToShow: 5,
        slidesToScroll: 1,
        mobileFirst: false,
        rtl: false,
        method: {}
    };
    vm.slickConfigLoaded2 = true;
    vm.updateNumber2 = function () {
        vm.slickConfigLoaded2 = false;
        vm.number2[2] = 'ggg';
        vm.number2.push(Math.floor((Math.random() * 10) + 100));
        $timeout(function () {
            vm.slickConfigLoaded2 = true;
        });
    };
    vm.slickConfig2 = {
        autoplay: true,
        infinite: true,
        autoplaySpeed: 0,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        // centerMode: true,

        speed: 2000,
        method: {}
    };


    vm.init = function () {
        vm.start()

        vm.localStore()
        vm.loggedUserCheck()
        vm.getDates()
        vm.trayCheck()
        vm.number1 = UserService.getBanners();
        vm.goodsForSlider1()
        vm.goodsForSlider2()
        vm.FiltersPrepare()
        // vm.getUsers();

        console.log(vm.discount);
    }
    vm.init();


}]);

app.controller('adminCtrl', ['UserService', function (UserService) {
    var vm = this;
    vm.category = ['somecat1', 'somecat2'];
    vm.orders = [];

    vm.orderToDel = {};
    vm.userConfirmed = true;
    vm.admOrders = true
    vm.id = 0;
    vm.newCategory = {name: ''}
    vm.addCat = false
    vm.newCommodity = {}
    vm.newCategory = {}
    vm.newUser = {}
    // vm.userEdited={}
    vm.countries = ["Афганістан", "Албанія", "Алжир", "Американське Самоа", "Андорра", "Ангола", "Ангілья", "Антарктида", "Антигуа і Барбуда", "Аргентина", "Вірменія", "Аруба", "Австралія", "Австрія", "Азербайджан", "Багамські острови", "Бахрейн", "Бангладеш", "Барбадос", "Білорусь", "Бельгія", "Беліз", "Бенін", "Бермудські острови", "Бутан", "Болівія", "Боснія і Герцеговина", "Ботсвана", "Буве-Айленд", "Бразилія", "Британські території Індійського океану", "Бруней ", "Болгарія", "Буркіна-Фасо", "Бурунді", "Камбоджа", "Камерун", "Канада", "Кабо-Верде", "Кайманові острови", "Центральноафриканська республіка", "Чад", "Чилі", "Китай", "Різдвяний острів", "Кокосові острови", " Хорватія (Гравця) ", "Острови Кука ", "Коста-Ріка ", " Кот-дІвуар ", " Куба ", " Кіпр ", "Чеська Республіка", "Данія", "Джибуті", "Домініка", "Домініканська Республіка", "Східний Тимор", "Еквадор", "Єгипет", "Сальвадор", "Екваторіальна Гвінея", "Еритрея", "Естонія", "Ефіопія", "Фолклендські (Мальвінські) острови", "Фарерські острови", "Фіджі", "Фінляндія", "Франція", "Французький митрополит", "Французька Гвіана", "Французька Полінезія", "Французькі Південні Території", "Габон", "Гамбія", "Грузія", "Німеччина", "Гана", "Гібралтар", "Греція", "Гренландія", "Гренада", "Гваделупа", "Гуам", "Гватемала", "Гвінея", "Гондурас", "Гонконг", "Угорщина", "Ісландія", "Гвінея-Бісау", "Гвінея-Бісау", "Гайана", "Гаїті", "Острова Херд і Мак-Дональд", "Святий Престол", "Індія", "Індонезія", "Іран (Ісламська Республіка)", "Ірак", "Ірландія", "Ізраїль", "Італія", "Ямайка", "Японія", "Йорданія", "Казахстан", "Кенія", "Кірібаті", "Корея, Народно-Демократична Республіка", "Республіка Корея", "Кувейт", "Киргизстан", "Лаос", "Народна Демократична Республіка", "Латвія", "Ліван", "Лесото", "Ліберія", "Лівійська Арабська Джамахірія", "Ліхтенштейн", "Литва", "Люксембург", "Макау", "Македонія, колишня Югославська Республіка", "Мадагаскар", "Малаві", "Малайзія", "Мальдіви", "Малі", "Мальта", "Маршаллові Острови", "Мартініка", "Мавританія", "Маврикій", "Майотта", "Мексика", "Мікронезія, Федеративні держави", "Республіка Молдова", "Монако", "Монголія", "Монтсеррат", "Марокко", "Мозамбік", "М'янма", "Намібія", "Науру", "Непал", "Нідерланди", "Нідерландські Антильські острови", "Нова Каледонія", "Нова Зеландія", "Нікарагуа", "Нігер", "Нігерія", "Ніуе", "Острів Норфолк", "Північні Маріанські острови", "Норвегія", "Оман", "Пакистан", "Палау", "Панама", "Папуа-Нова Гвінея", "Парагвай", "Перу", "Філіппіни", "Піткейр", "Польща", "Португалія", "Пуерто-Рико", "Катар", "Реюньйон", " Румунія ", "Російська Федерація", " Руанда ", "Сент Кітс і Невіс", "Сент-Люсія", " Сент-Вінсент і Гренадіни", "Самоа ", "Сан-Марино", "Сан-Томе і Принсіпі", "Саудівська Аравія", "Сенегал ", "Сейшельські острови", "Сьєрра-Леоне ", "Сінгапур ", "Словаччина", "Словенія", "Соломонові Острови", "Сомалі", "Південна Африка ", "Південна Джорджія та Південно-Сандвічеві Острови", "Іспанія ", "Шрі-Ланка", "Св. Олени", "Сен-П'єр і Мікелон", "Судан", "Сурінам", "Свальбард", "острови Ян-Маєн", "Свазіленд", "Швеція", "Швейцарія", "Сирійська Арабська Республіка", "Тайвань, провінція Китаю", "Таджикистан", "Танзанія", "Об'єднана Республіка", "Таїланд", "Того", "Токелау", "Тонга", "Тринідад і Тобаго", "Туніс", "Туреччина", "Туркменістан", "Турки і Кайкос", "Тувалу", "Уганда", "Україна", "Об'єднаний араб Емірати ", " Великобританія ", "США ", "Малі віддалені острови Сполучені Штати ", " Уругвай ", " Узбекистан ", " Вануату ", " Венесуела ", "В'єтнам ", "Британські віргінські острови ", "Віргінські острови (США) ", "Острови Уолліс і Футуна ", "Західна Сахара ", "Ємен ", "Югославія ", "Замбія ", "Зімбабве"];


// vm.onLoad = function (e, reader, file, fileList, fileOjects, fileObj) {
//     alert('this is handler for file reader onload event!');

// }
//USERS************************************************************************************************************USERS
    vm.getUsers = function () {
        vm.users = UserService.getUsers()
        vm.checkUsers()
    }
    vm.checkUsers = function () {
        for (i in vm.users) {
            if (vm.users[i].confirmed == false) {
                // vm.orderConfirmation = false

                document.getElementById('newUsers').style.background = 'red'
                document.getElementById('newUsersB').style.background = 'red'
                break

            } else {
                document.getElementById('newUsers').style.background = 'darkgray'
                document.getElementById('newUsersB').style.background = 'darkgray'

            }
        }
    }


    vm.addNewUser = function () {
        vm.newUser.confirmed = false
        UserService.addUser(vm.newUser)
        vm.newUser = {}
        vm.getUsers()

    }
    vm.preEditUser = function (userToEdit) {
        vm.userEdited = userToEdit
        vm.edUser = true
    }
    vm.editUser = function () {
        UserService.editUser(vm.userEdited)
        vm.getUsers()
        vm.userEdited = {}
        console.log(vm.userEdited);
    }
    vm.cancelEditUser = function () {
        vm.userToEd = {}
        vm.userEdited = {}

    }

    vm.confirmUser = function (u) {
        for (i in vm.users) {
            if (vm.users[i].id == u.id) {
                vm.users[i].confirmed = true
            }
        }
        vm.checkUsers()
    }


    vm.userToDelete = function (commodity) {
        vm.delUser = true
        vm.userToDel = commodity
    };
    vm.cancelDeleteUser = function () {
        vm.delUser = false
        vm.userToDel = {}
    };
    vm.deleteUser = function () {
        vm.delUser = false;
        UserService.deleteUser(vm.userToDel);
        vm.getUsers()
        vm.checkUsers()

    };


//ORDERS**********************************************************************************************************ORDERS
    vm.getOrders = function () {
        vm.orders = UserService.getOrders()
        for (i in vm.orders) {
            vm.orders[i].totalOrderSum = 0
            for (j in vm.orders[i].goodsOrdered) {
                vm.orders[i].totalOrderSum += vm.orders[i].goodsOrdered[j].price * vm.orders[i].goodsOrdered[j].count

            }
            console.log(vm.orders[i].totalOrderSum);
        }

    };
    vm.checkOrders = function () {
        for (i in vm.orders) {
            if (vm.orders[i].archive == false) {
                vm.orderConfirmation = false

                document.getElementById('newOrders').style.background = 'red'
                document.getElementById('newOrdersB').style.background = 'red'
                break

            } else {
                document.getElementById('newOrders').style.background = 'darkgray'
                document.getElementById('newOrdersB').style.background = 'darkgray'

            }
        }
    }


    vm.redoOrder = function (id) {
        for (i in vm.orders) {
            if (vm.orders[i].id == id) {
                vm.orders[i].archive = false

            }

        }
        vm.checkOrders()
    };

    vm.preConfirmOrder = function (order) {
        vm.orderToDel = order;

        vm.confOrder = !vm.confOrder;
        vm.sumOrder = 0;
        for (i in order.goodsOrdered) {
            vm.sumOrder += order.goodsOrdered[i].count * order.goodsOrdered[i].price
        }

    };

    vm.confirmOrder = function () {
        vm.id = vm.orderToDel.id;
        vm.confOrder = !vm.confOrder;
        for (i in vm.orders) {
            if (vm.orders[i].id == vm.id) {
                vm.orders[i].archive = true

            }

        }

        vm.checkOrders()
    };

    vm.cancelConfirmation = function () {
        vm.confOrder = !vm.confOrder;
        vm.id = '';
        vm.orderToDel = {};
    };
    vm.preDeleteOrder = function (order) {
        vm.orderToDel = order;

        vm.delOrder = !vm.delOrder;
        vm.sumOrder = 0;
        for (i in order.goodsOrdered) {
            vm.sumOrder += order.goodsOrdered[i].count * order.goodsOrdered[i].price

        }
        ;

    };
    vm.deleteOrder = function () {
        vm.id = vm.orderToDel.id;
        for (i in vm.orders) {
            if (vm.orders[i].id == vm.id) {
                vm.orders.splice(i, 1)

            }
            ;

        }
        ;
        vm.id = '';
        vm.delOrder = !vm.delOrder;
        vm.orderToDel = {};
        vm.checkOrders()
    };
    vm.cancelDeleteOrder = function () {
        vm.delOrder = !vm.delOrder;
        vm.id = '';
        vm.orderToDel = {};
    };


//CATEGORY*****************************************************************************************************CATEGORY
    vm.getCategories = function () {
        vm.category = UserService.getCategories()
    }
    vm.preDeleteCategory = function (c) {
        vm.orderToDel = c;
        vm.delCat = !vm.delCat

    };
    vm.deleteCategory = function () {
        console.log(vm.orderToDel);
        for (i in vm.category) {
            console.log(vm.category[i]);
            if (vm.category[i] == vm.orderToDel) {
                vm.category.splice[i, 1];
                break;
            }
            ;
        }
        ;
        vm.orderToDel = {};
        vm.delCat = !vm.delCat;
    };


    vm.preEditCategory = function (c) {
        vm.editCategory = !vm.editCategory;
        vm.newCategoryName = c
    };


    vm.renameCategory = function () {
        UserService.editCategory(vm.newCategoryName)
        vm.newCategoryName = '';
    };


    vm.cancelRename = function () {
        vm.editCategory = !vm.editCategory
        vm.catToEdit = ''
    }

    vm.addCategory = function () {

        UserService.addCategory(vm.newCategory.name)
        vm.getCategories()
    }

//GOODS**********************************************************************************************************GOODS

    //get goods

    vm.getGoods = function () {
        vm.banners = UserService.getBanners()

        vm.goods = UserService.getGoods();


        // vm.onlyUnique = function (value, index, self) {
        //     return self.indexOf(value) === index;
        // }
        // for (i in vm.goods) {
        //     vm.category.push(vm.goods[i].category)
        //     vm.category = vm.category.filter(vm.onlyUnique)
        // }

    };

    vm.filter = function (x) {
        console.log(x);
        vm.admSearch = ''
        vm.categoryFilter = x

    };


    vm.commodityToDel = {};
    vm.commodityToDelete = function (commodity) {
        vm.delCommodity = true

        vm.commodityToDel = commodity
    };
    vm.cancelDelete = function () {
        vm.delCommodity = false
        vm.commodityToDel = {}
    };
    vm.deleteCommodity = function () {
        vm.delCommodity = false;
        // UserService.deleteCommodity(vm.commodityToDel)
        UserService.deleteGoods(vm.commodityToDel);
        vm.getGoods()

    };


    vm.commodityToE = {};
    vm.commodityToEdit = function (commodity) {
        vm.editCom = true;
        vm.commodityToE = commodity
    };
    vm.cancelEdit = function () {
        vm.editCom = false;
        vm.commodityToE = {}
    };


    vm.newGood = {};
    vm.editCommodity = function () {
        vm.editCom = false;
        UserService.editGoods(vm.commodityToE);
        vm.commodityToE = {}

    };
    vm.goPromo = function (id) {
        console.log(id);
        for (i in vm.goods) {
            if (vm.goods[i].id == id) {
                if (vm.goods[i].promo == true) {
                    vm.goods[i].promo = false
                } else {
                    vm.goods[i].promo = true
                }
                ;

            }
            ;
        }
        ;
    };


    //add commodity
    vm.addCommodity = function () {
        // console.log(vm.newCommodity);
        UserService.addGoods(vm.newCommodity)
        console.log(vm.newCommodity);
        vm.newCommodity = {}
        vm.getGoods()
    }
    vm.cancelAdd = function () {
        vm.newCommodity = {}

    }
    vm.addBanner = function () {
        vm.newBanner.product_id=+vm.newBanner.product_id.split('_')[0]

        UserService.addBanner(vm.newBanner)
        console.log(vm.newBanner);
        vm.newBanner = {}
        vm.getGoods()
    }

    vm.init = function () {
        vm.getOrders();
        vm.checkOrders()
        vm.getGoods();
        vm.getUsers();


    };
    vm.init();


}]);

app.factory("UserService", function ($http) {
    return {
        banners: [
            {
                id: 1,
                image: '../img/111.png',
                product_id: 2

            }, {
                id: 3,
                image: '../img/jameson.jpg',
                product_id: 14,

            }, {
                id: 2,
                image: '../img/about.png',
                product_id: 25

            }, {
                id: 4,
                image: '../img/111.jpg',
                product_id: 13

            }
        ],
        goodsDB: [
            {
                id: 1,
                category: 'aaa',
                brand: 'Hoegaarden',
                name: "qwertyuio plkjhgfdszx",
                country: "Бельгія",
                strength: 3,
                volume: 750,
                price: "60", price2: '1',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фаДуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фаДуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: false
            },
            {
                id: 2,
                category: 'beer',
                brand: 'Krombacher',
                name: "2",
                country: "Великобританія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 3,
                category: 'whiskey',
                brand: 'Leffe',
                name: "3",
                country: "Ірландія",
                strength: 2.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 4,
                category: 'whiskey',
                brand: 'Lowenbrau',
                name: "4",
                country: "Мексика",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 5,
                category: 'whiskey',
                brand: 'Hoegaarden',
                name: "5",
                country: "Німеччина",
                strength: 3,
                volume: 750,
                price: "60", price2: '59.60',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 6,
                category: 'beer',
                brand: 'Krombacher',
                name: "5",
                country: "Чехія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 7,
                category: 'beer',
                brand: 'Leffe',
                name: "5",
                country: "Німеччина",
                strength: 0.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 8,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "6",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 9,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "7",
                country: "Бельгія",
                strength: 3,
                volume: 750,
                price: "60", price2: '59.60',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 10,
                category: 'beer',
                brand: 'Krombacher',
                name: "8",
                country: "Великобританія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 11,
                category: 'beer',
                brand: 'Leffe',
                name: "9",
                country: "Ірландія",
                strength: 0.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 12,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "10",
                country: "Мексика",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 13,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "11",
                country: "Німеччина",
                strength: 3,
                volume: 750,
                price: "60", price2: '59.60',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 14,
                category: 'beer',
                brand: 'Krombacher',
                name: "12",
                country: "Чехія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 15,
                category: 'beer',
                brand: 'Leffe',
                name: "13",
                country: "Німеччина",
                strength: 0.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 16,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "14",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 17,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "15",
                country: "Бельгія",
                strength: 3,
                volume: 750,
                price: "60", price2: '59.60',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 18,
                category: 'beer',
                brand: 'Krombacher',
                name: "16",
                country: "Великобританія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 19,
                category: 'beer',
                brand: 'Leffe',
                name: "17",
                country: "Ірландія",
                strength: 0.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 20,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "18",
                country: "Мексика",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 21,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "19",
                country: "Німеччина",
                strength: 3,
                volume: 750,
                price: "60", price2: '59.60',
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 22,
                category: 'beer',
                brand: 'Krombacher',
                name: "20",
                country: "Чехія",
                strength: 0,
                volume: 500,
                price: "50", price2: '49.60',
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 23,
                category: 'beer',
                brand: 'Leffe',
                name: "21",
                country: "Німеччина",
                strength: 0.5,
                volume: 330,
                price: "40", price2: '39.60',
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 24,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "22",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 25,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            }, {
                id: 26,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine2",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            }, {
                id: 27,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine 3",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            }, {
                id: 28,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine4",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            }, {
                id: 29,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine5",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 30,
                category: 'wine',
                brand: 'Lowenbrau',
                name: "wine6",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 31,
                category: 'vodka',
                brand: 'Lowenbrau',
                name: "beer24",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 32,
                category: 'vodka',
                brand: 'Lowenbrau',
                name: "beer24",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 33,
                category: 'vodka',
                brand: 'Lowenbrau',
                name: "beer24",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 34,
                category: 'vodka',
                brand: 'Lowenbrau',
                name: "beer24",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30", price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 35,
                category: 'vodka',
                brand: 'Lowenbrau',
                name: "beer24",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30",
                price2: '39.60',
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            }
        ],
        users: [
            {
                id: 1,
                name: 'ivan2',
                sname: 'ivanov2',
                phone: '+3890123456789',
                birthday: {
                    day: 15,
                    month: 10,
                    year: 1986
                },
                email: "mail2@gmail.com",
                address: {
                    street: 'zelena',
                    house: '123-a',
                    flat: 123,
                    stair: 4,
                    entrance: '5',
                },
                confirmed: false


            },
            {
                id: 2,
                name: '1ivan2',
                sname: '1ivanov2',
                phone: '+380123456789',

                birthday: {
                    day: 115,
                    month: 210,
                    year: 2986
                },
                email: "qmail2@gmail.com",

                address: {
                    street: '11zelena',
                    house: '11123-a',
                    flat: 11123,
                    stair: 114,
                    entrance: '115',
                },
                confirmed: true


            }, {
                id: 5,
                name: 'yura',
                sname: 'volchak',
                phone: '+3890123456789',
                birthday: {
                    day: 25,
                    month: 5,
                    year: 1987
                },
                email: "q",
                password: "q",
                address: {
                    street: 'zelena',
                    house: '123-a',
                    flat: 123,
                    stair: 4,
                    entrance: '5',
                },
                confirmed: true


            }

        ],
        orders: [
            {
                id: 1,
                archive: false,
                name: 'yura',
                sname: 'volchak',
                email: 'ddd@mail.com',
                phone: '+3801234567890',
                goodsOrdered: [{
                    id: 3,
                    count: 8,
                    name: 'ddddvdvd',
                    price: 56

                }, {
                    id: 4,
                    count: 3,
                    name: 'aaaaaa',
                    price: 44
                }

                ],
                address: {
                    street: 'green',
                    house: "123-A",
                    flat: '234',
                    stair: '3',
                    entrance: '4'

                },
                comments: 'sdjgdfh sdfkhsgd fksgf ksegkse rksyrkse'


            }, {
                id: 2,
                name: 'yura2',
                sname: 'volchak2',
                email: '2ddd@mail.com',
                phone: 'AAA3801234567890',
                archive: false,
                goodsOrdered: [{
                    id: 78,
                    count: 10,
                    name: 'qqqqqqqqdvd',
                    price: 88

                }, {
                    id: 1,
                    count: 1,
                    name: 'f',
                    price: 10
                }

                ],
                address: {
                    street: '2green',
                    house: "2123-A",
                    flat: '2234',
                    stair: '23',
                    entrance: '24'

                }
                ,
                comments: 'ttttttttttttt tttttttttttt ttttttt tttttttt ttttttt tttttttttttttttttttttttt ttttttttttttttt tttttttttttttttttttttttttttttttttt ttttttttttttttt ttttttttttt tttt ttttttttttt ttttttttttttttttttttttt tttttttttttttttttttttttttttt tttttttttttttt ttttttttttttt tttttttttttttttttt tttttttt'


            }, {
                id: 3,
                name: 'yura3',
                sname: 'volchak3',
                email: '3ddd@mail.com',
                phone: 'AAA3801234567890',
                archive: true,
                goodsOrdered: [{
                    id: 78,
                    count: 10,
                    name: 'qqqqqqqqdvd',
                    price: 88

                }, {
                    id: 1,
                    count: 1,
                    name: 'f',
                    price: 10
                }

                ],
                address: {
                    street: '2green',
                    house: "2123-A",
                    flat: '2234',
                    stair: '23',
                    entrance: '24'

                }
                ,
                comments: 'ttttttttttttt tttttttttttt ttttttt tttttttt ttttttt tttttttttttttttttttttttt ttttttttttttttt tttttttttttttttttttttttttttttttttt ttttttttttttttt ttttttttttt tttt ttttttttttt ttttttttttttttttttttttt tttttttttttttttttttttttttttt tttttttttttttt ttttttttttttt tttttttttttttttttt tttttttt'


            }

        ],
        category: [],
        goodsBeer: [],
        getGoodsFromDB: function () {
            return this.goodsDB
        },
        getOrders: function () {
            return this.orders
        },
        addOrder: function (order) {
            this.orders.push(order)
        },

        getGoods: function () {
            return this.goodsDB
        }
        ,
        addGoods: function (newGoods) {
            this.goodsDB.push(newGoods)
        },
        addBanner: function (newBanners) {
            this.banners.push(newBanners)
        },

        getDetails: function (x) {
            return x
        }
        ,
        getByCategory: function (x) {
            goods = this.goodsDB
            if (x == 'others') {
                sortedGoods = []
                for (i in goods) {
                    if (goods[i].category != 'beer' && goods[i].category != 'wine' && goods[i].category != 'vodka' && goods[i].category != 'whiskey' && goods[i].category != 'tequila') {
                        sortedGoods.push(goods[i])
                    }
                    return sortedGoods
                }
            } else if (x == '') {
                sortedGoods = goods
                return sortedGoods
            } else {

                sortedGoods = [];
                for (i in goods) {
                    if (goods[i].category == x) {
                        sortedGoods.push(goods[i])
                    }

                }
                return sortedGoods
            }
        }
        ,
        getCategories: function () {
            goods = this.goodsDB
            for (i in this.goods) {
                this.category.push(this.goods[i].category)
            }
            return this.category
        },

        getUsers: function () {
            return this.users
        },
        addUser: function (newUser) {
            this.users.push(newUser)
        },
        editUser: function (eu) {
            for (i in this.users) {
                if (eu.email == this.users[i].email) {
                    this.users[i] = eu
                }
            }
        },
        getBanners: function () {
            return this.banners
        },

        deleteGoods: function (g) {
            for (i in this.goodsDB) {
                if (g.id == this.goodsDB[i].id) {
                    this.goodsDB.splice(i, 1)


                }
            }
            // $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
            //     .then(function (e) {
            //         goods.map(function (el, index) {
            //             if (el.id === id) {
            //                 goods.splice(index, 1)
            //             }
            //         })
            //     }).catch(function (err) {
            //     console.log(err)
            // })


        }
        ,
        deleteUser: function (u) {
            for (i in this.users) {
                if (u.id == this.users[i].id) {
                    this.users.splice(i, 1)


                }
            }
        }
        ,

        editGoods: function (g) {
            for (i in this.goodsDB) {
                if (g.id == this.goodsDB[i].id) {
                    this.goodsDB[i] = g
                }
            }
        }
        ,

        editCommodity: function (g) {
            var str = JSON.stringify(g);
            $http.put('https://furniture123.herokuapp.com/api/order', str)
        },
        addCategory: function (cat) {
            this.category.push(cat)
        },





        //GET*******************************************************************************************************GET
        // getGoodsFromDB:function(){
        //     return $http({
        //         method: 'get',
        //         url: 'https://furniture123.herokuapp.com/api/commodity'
        //     }).then(function (e) {
        //         goodsDB = e.data;
        //         callback(goodsDB);
        //     });
        // },
        // getGoods: function () {
        //     return $http({
        //                 method: 'get',
        //                 url: 'https://furniture123.herokuapp.com/api/commodity'
        //             }).then(function (e) {
        //                 goods = e.data;
        //                 callback(goods);
        //             });
        // },

        // getOrders: function () {
        //     return $http({
        //         method: 'get',
        //         url: 'https://furniture123.herokuapp.com/api/orders'
        //     }).then(function (e) {
        //         orders = e.data;
        //         callback(orders);
        //     });
        // },
        //
        // getCategories: function () {
        //     return $http({
        //                 method: 'get',
        //                 url: 'https://furniture123.herokuapp.com/api/categories'
        //             }).then(function (e) {
        //                 categories = e.data;
        //                 callback(categories);
        //             });
        // },
        // getBanners: function () {
        //     return $http({
        //                 method: 'get',
        //                 url: 'https://furniture123.herokuapp.com/api/banners'
        //             }).then(function (e) {
        //                 banners = e.data;
        //                 callback(banners);
        //             });
        // },
        // getUsers: function () {
        //     return $http({
        //         method: 'get',
        //         url: 'https://furniture123.herokuapp.com/api/users'
        //     }).then(function (e) {
        //         users = e.data;
        //         callback(users);
        //     });
        // },

        //ADD*******************************************************************************************************ADD

        // addGoods: function (newCommodity) {
        //     var str = JSON.stringify(newCommodity);
        //     $http.post('https://furniture123.herokuapp.com/api/commodity', str).then(function (e) {
        //     })
        // },
        // addOrder: function (order) {
        //     var str = JSON.stringify(order);
        //     $http.post('https://furniture123.herokuapp.com/api/commodity', str).then(function (e) {
        //     })
        // },
        // addBanner: function (newBanners) {
        //     var str = JSON.stringify(newBanners);
        //     $http.post('https://furniture123.herokuapp.com/api/commodity', str).then(function (e) {
        //     })
        // },
        // addUser: function (newUser) {
        //     var str = JSON.stringify(newUser);
        //     $http.post('https://furniture123.herokuapp.com/api/commodity', str).then(function (e) {
        //     })
        // },
        // addCategory: function (cat) {
        //     var str = JSON.stringify(cat);
        //     $http.post('https://furniture123.herokuapp.com/api/commodity', str).then(function (e) {
        //     })
        // },

        //EDIT*****************************************************************************************************EDIT

        // editUser: function (eu) {
        //     var str = JSON.stringify(eu);
        //     $http.put('https://furniture123.herokuapp.com/api/category', str)
        // },
        // editGoods: function (editedCommodity) {
        //     var str = JSON.stringify(editedCommodity);
        //     $http.put('https://furniture123.herokuapp.com/api/category', str)
        // },
        // editCategory:function(editedCategory){
        //     var str=JSON.stringify(editdCategory);
        //     $http.put('https://furniture123.herokuapp.com/api/category',str)
        // },
        // editOrder:function(editedOrder){
        //     var str=JSON.stringify(editedOrder);
        //     $http.put("'https://furniture123.herokuapp.com/api/category",str)
        //
        // }
        //DELETE*************************************************************************************************DELETE

        // deleteUser:function(id) {
        //     $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
        //         .then(function (e) {
        //             users.map(function (el, index) {
        //                 if (el.id === id) {
        //                     users.splice(index, 1)
        //                 }
        //             })
        //         }).catch(function (err) {
        //         console.log(err)
        //     })
        // },
        // deleteOrder:function(id) {
        //     $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
        //         .then(function (e) {
        //             orders.map(function (el, index) {
        //                 if (el.id === id) {
        //                     orders.splice(index, 1)
        //                 }
        //             })
        //         }).catch(function (err) {
        //         console.log(err)
        //     })
        // },
        // deleteGoodsDB:function(id) {
        //     $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
        //         .then(function (e) {
        //             goodsDB.map(function (el, index) {
        //                 if (el.id === id) {
        //                     goodsDB.splice(index, 1)
        //                 }
        //             })
        //         }).catch(function (err) {
        //         console.log(err)
        //     })
        // },
        // deleteCategory:function(id) {
        //     $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
        //         .then(function (e) {
        //             goodsDB.map(function (el, index) {
        //                 if (el.id === id) {
        //                     goodsDB.splice(index, 1)
        //                 }
        //             })
        //         }).catch(function (err) {
        //         console.log(err)
        //     })
        // },
        // deleteBanners:function(id) {
        //     $http.delete('https://furniture123.herokuapp.com/api/commodity/' + id)
        //         .then(function (e) {
        //             banners.map(function (el, index) {
        //                 if (el.id === id) {
        //                     banners.splice(index, 1)
        //                 }
        //             })
        //         }).catch(function (err) {
        //         console.log(err)
        //     })
        // },






    }
})
;
app.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
})
;
window.location.href.split('#')[0];
function getE(id) {
    return document.getElementById(id);
}

