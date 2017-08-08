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
    vm.users = UserService.getUsers();
    vm.user = {};
    vm.catCat = null;
    vm.alertMessage = 'для здійснення покупки необхідно авторизуватися';
    vm.banners = [];
    vm.discount = 0.5;

    vm.start = function () {
        vm.GoodsDB=UserService.getGoodsFromDB();
        vm.getGoods();

        vm.length = vm.goods.length;
        vm.categoryToStart = JSON.parse(sessionStorage.getItem('category'))
        sessionStorage.clear();
        console.log(vm.categoryToStart);
        if (vm.categoryToStart != null || vm.categoryToStart != undefined) {

            vm.filterByCategory(vm.categoryToStart)
        }


    };

    vm.catFromMain = function (x) {
        vm.cat = {};
        vm.cat.cat = x;
        sessionStorage.setItem('category', JSON.stringify(x));
        console.log(JSON.parse(sessionStorage.getItem('category')));

    };
    vm.getDates = function () {
        for (var i = 2017; i >= 1920; i--) {
            vm.year.push(i.toString())
        }
    };


//**********************************************************************************************registration and logIn

    vm.register = function (newUser) {
        vm.newUser = newUser;
        vm.newUser.confirmed = false

        vm.show_registration = !vm.show_registration
        UserService.addUser(vm.newUser)
    };

    vm.logIn = function () {
        for (i in vm.users) {
            if (vm.user.email == vm.users[i].email && vm.user.password == vm.users[i].password) {
                delete vm.user[i].password
                vm.getGoods()

                localStorage.setItem('user', JSON.stringify(vm.users[i]))
                vm.ShowSignIn = !vm.ShowSignIn
                vm.logInButton = false
                vm.logOutButton = true

            }
        }


    }
    vm.logOut = function () {
        vm.logInButton = true
        vm.logOutButton = false
        vm.userLoggedIn = {};
        localStorage.setItem('user', JSON.stringify(vm.userLoggedIn));
        vm.getGoods()

    };

    vm.openNav = function () {
        document.getElementById("mySidenav").style.width = "350px";
    };
    vm.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    };

//************************************************************************************************************get goods

    vm.getGoods = function () {
        vm.goods = vm.GoodsDB;

        console.log(vm.goods);
        vm.pagination()
    };
    vm.getUsers = function () {
        vm.user = UserService.getUsers();
        // for(i in vm.users){
        // delete vm.users[i].password
        // delete vm.users[i].comments
        // }
    };


// **********************************************************************************************FILTERS AND SORTERS
    vm.search1 = function (el) {
        if (vm.search != '')
            return true
    }


    vm.FiltersPrepare = function () {
        vm.price = [];
        vm.volume = [];
        vm.strength = [];
        vm.brand = [];
        vm.state = [];
        vm.category = []
        vm.onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        }
        for (i in vm.goods) {
            vm.category.push(vm.goods[i].category)
            vm.category = vm.category.filter(vm.onlyUnique)
            vm.price.push(parseInt(vm.goods[i].price))
            vm.price = vm.price.filter(vm.onlyUnique).sort()
            vm.brand.push(vm.goods[i].brand)
            vm.brand = vm.brand.filter(vm.onlyUnique)
            vm.state.push(vm.goods[i].country)
            vm.state = vm.state.filter(vm.onlyUnique)
            vm.strength.push(vm.goods[i].strength)
            vm.strength = vm.strength.filter(vm.onlyUnique)
            vm.volume.push(parseInt(vm.goods[i].volume))
            vm.volume = vm.volume.filter(vm.onlyUnique)
        }

        vm.lower_price_bound = vm.price[0];
        vm.upper_price_bound = vm.price[vm.price.length - 1];
        vm.lp = vm.price[0]
        vm.hp = vm.price[vm.price.length - 1]


    }

//**********************************************************************************************filters by category

    vm.filterByCategory = function (x) {
        vm.categoryToStart = ''

        vm.goods = UserService.getByCategory(x)
        vm.FiltersPrepare()
        vm.pagination()
    }

// **********************************************************************************************filtering by PRICE
    vm.priceRange = function (goods) {
        return (parseInt(goods['price']) >= vm.lower_price_bound && parseInt(goods['price']) <= vm.upper_price_bound);
    };
    vm.sortGoods = function (y) {
        vm.myOrderBy = y;
    }
// **********************************************************************************************filtering by VOLUME

    vm.volumeIncludes = []
    vm.includeVolume = function (volume) {
        var i = vm.volumeIncludes.indexOf(volume)
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


//*********************************************************************************************************goods details
    vm.goodsDetails = JSON.parse(sessionStorage.getItem('commodity'))
    vm.detail_of_goods = function (commodity) {
        vm.goodsDetails = commodity
        vm.goodsDetails.count = 1
        sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))


    }
    vm.detail_of_goods_banner = function (id) {
        for (i in vm.goods) {
            if (vm.goods[i].id === id) {
                vm.goodsDetails = vm.goods[i]
                vm.goodsDetails.count = 1
                sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            }
        }
        window.location.href = '#/details'
    }
    vm.detailsOfSearch = function (x) {
        if (location.href.includes("details")) {
            location.href = '#/catalogue'

            vm.goodsDetails = x
            vm.goodsDetails.count = 1
            sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            window.location.href = '#/details'
            my.searchResults = false
            my.search = ''
        } else {

            vm.goodsDetails = x
            vm.goodsDetails.count = 1
            sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            window.location.href = '#/details'
            my.searchResults = false
            my.search = ''

        }


    }
    vm.plus2 = function (count) {
        vm.goodsDetails.count++
        // ocalStorage.setItem('cOrderDetails', JSON.stringify(vm.check))
    }
    vm.minus2 = function (count) {
        if (vm.goodsDetails.count > 1) {
            vm.goodsDetails.count--;
        }

    }


//********************************************************************************************************LOCAL STORAGE
    vm.localStore = function () {
        //traycheck
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        if (vm.tray == null || vm.tray.length == 0) {
            vm.tray = [];
            localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));
        }
        else {
            vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        }


        vm.userLoggedIn = JSON.parse(localStorage.getItem('user'))
        if (vm.userLoggedIn == null) {
            vm.userLoggedIn = {};
            vm.logInButton = true
            localStorage.setItem('user', JSON.stringify(vm.userLoggedIn));
            vm.detailsOfOrder()
        }
        else {
            vm.userLoggedIn = JSON.parse(localStorage.getItem('user'))
            vm.logInButton = false
            vm.logOutButton = true

            vm.detailsOfOrder()
        }

        if (vm.priceType == undefined) {
            if(vm.userLoggedIn.name==undefined){
              vm.priceType=undefined

            }
            else{
                vm.discount=0.5

                for (i in vm.goods) {
                    vm.goods[i].price = vm.goods[i].price * vm.discount
                }
                vm.priceType = true
            }
        }
    };


//*****************************************************************************************************************TRAY
    vm.trayCheck = function () {
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'))
        for (i in vm.tray) {
            if (vm.tray[i].count == 0) {
                vm.tray.splice(i, 1)
            }
        }
        vm.totalOrderSum()
    }
    vm.totalOrderSum = function () {
        vm.totalSum = 0
        for (i in vm.tray) {
            vm.totalSum += vm.tray[i].count * vm.tray[i].price
        }
    }


//**********************************************************************************************goods To Tray from details
    vm.detailsOfOrder = function () {
        vm.order = vm.userLoggedIn
        vm.order.archive = false


    }
    vm.ByGoods2 = function (goods) {

        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'));
        console.log(vm.tray.length);
        vm.tray.push(goods)
        for (x in vm.tray) {
            for (y in vm.tray) {
                if (vm.tray[x].id == vm.tray[y].id && x != y) {
                    vm.tray[x].count += vm.tray[y].count
                    vm.tray.splice(y, 1)
                    y = x
                }
            }
            console.log(vm.tray[x]);
        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));
        console.log(JSON.parse(localStorage.getItem('goodsToBuy')));
        vm.trayCheck()
        location.href = '#/catalogue'

    };

    vm.plus1 = function (id) {
        for (i in vm.tray) {
            if (vm.tray[i].id === id) {
                vm.tray[i].count += 1

            }
        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))
        vm.totalOrderSum()
    }

    vm.minus1 = function (id) {
        for (i in vm.tray) {
            if (vm.tray[i].id === id && vm.tray[i].count > 0) {
                vm.tray[i].count -= 1
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

    //**********************************************************************************************BUY GOODS
    vm.checkLoggedUser = function () {
        vm.userLoggedIn = JSON.parse(localStorage.getItem('user'))
        console.log(vm.userLoggedIn);
    }
    vm.ByGoods = function (goods) {

        vm.GoodsB = goods
        vm.GoodsB.count = 1
        vm.tray = JSON.parse(localStorage.getItem('goodsToBuy'));
        console.log(vm.tray.length);
        vm.tray.push(vm.GoodsB)

        for (x in vm.tray) {
            for (y in vm.tray) {
                if (vm.tray[x].id == vm.tray[y].id && x != y) {
                    vm.tray[x].count += vm.tray[y].count
                    vm.tray.splice(y, 1)
                    y = x
                }
            }
            console.log(vm.tray[x]);
        }
        localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray));
        console.log(JSON.parse(localStorage.getItem('goodsToBuy')));
        vm.trayCheck()
    };

    vm.confirmOrder = function () {
        vm.checkLoggedUser()
        if (vm.userLoggedIn.name == undefined) {
            vm.alertConfirmation = true
            vm.alertMessage = 'для здійснення покупки необхідно авторизуватися'
        } else {

            vm.order.goodsOrdered = vm.tray
            console.log(vm.order);
            vm.order.archive = false
            UserService.addOrder(vm.order)

            vm.tray = []
            localStorage.setItem('goodsToBuy', JSON.stringify(vm.tray))

            vm.alertConfirmation = true

            // location.href="#/catalogue"
        }
    }


//**********************************************************************************************pagination
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


//**********************************************************************************************carousele on main page
    vm.goodsForSlider1 = function () {
        vm.number = []
        for (i in vm.goods) {
            if (i % 5 == 0) {
                vm.number.push(vm.goods[i])
            }
        }
    }
    vm.goodsForSlider2 = function () {
        vm.number2 = []
        for (i in vm.goods) {
            if (i % 3 == 0) {
                vm.number2.push(vm.goods[i])
            }
        }
    }
    // vm.goodsForSlider3 = function () {
    //     vm.number3 = []
    //     for (i in vm.goods) {
    //         if (i % 3 == 0) {
    //             vm.number2.push(vm.goods[i])
    //         }
    //     }
    // }

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
        autoplay: false,
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
        autoplay: false,
        // autoplay: true,
        adaptiveHeight:true,
        initialSlide: 0,
        slidesToShow: 1,
        itemsDesktop : [780,1],
        slidesPerRow:1,
        swipeToSlide:true,
        slidesToScroll: 1,
        infinite: true,
        buttons: true,
        autoplaySpeed: 1000,
        variableWidth:false,
        // fade:true,

        mobileFirst:true,
        method: {},
        event: {}
    };

    // vm.getGoods();
    // vm.getGoods()
    vm.init = function () {
        vm.number1 = UserService.getBanners();
        vm.start()
        // vm.checkCatalogue()
        vm.localStore()
        vm.getDates()
        vm.trayCheck()
        vm.goodsForSlider1()
        vm.goodsForSlider2()
        vm.FiltersPrepare()
        vm.getUsers();


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
    vm.checkUsers = function () {
        for (i in vm.users) {
            if (vm.users[i].confirmed == false) {
                vm.userConfirmed = false
                document.getElementById('newUsers').style.background = 'red'
                break
            } else {
                document.getElementById('newUsers').style.background = 'darkgray'

            }
        }
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
                break

            } else {
                document.getElementById('newOrders').style.background = 'darkgray'

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

        vm.onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        }
        for (i in vm.goods) {
            vm.category.push(vm.goods[i].category)
            vm.category = vm.category.filter(vm.onlyUnique)
        }

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
                image:'../img/111.png',
                product_id: 2

            },{
                id: 3,
                image:'../img/jameson.jpg',
                product_id: 14,

            },{
                id: 2,
                image:'../img/about.png',
                product_id: 25

            },{
                id: 4,
                image:'../img/111.jpg',
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
                price: "60",
                priceReg:55,
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
                price: "50",
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
                , promo: true
            },
            {
                id: 3,
                category: 'beer',
                brand: 'Leffe',
                name: "3",
                country: "Ірландія",
                strength: 2.5,
                volume: 330,
                price: "40",
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 4,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "4",
                country: "Мексика",
                strength: 0.5,
                volume: 250,
                price: "30",
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 5,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "5",
                country: "Німеччина",
                strength: 3,
                volume: 750,
                price: "60",
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 6,
                category: 'beer',
                brand: 'Krombacher',
                name: "5",
                country: "Чехія",
                strength: 0,
                volume: 500,
                price: "50",
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 7,
                category: 'beer',
                brand: 'Leffe',
                name: "5",
                country: "Німеччина",
                strength: 0.5,
                volume: 330,
                price: "40",
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 8,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "6",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30",
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 9,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "7",
                country: "Бельгія",
                strength: 3,
                volume: 750,
                price: "60",
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 10,
                category: 'beer',
                brand: 'Krombacher',
                name: "8",
                country: "Великобританія",
                strength: 0,
                volume: 500,
                price: "50",
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 11,
                category: 'beer',
                brand: 'Leffe',
                name: "9",
                country: "Ірландія",
                strength: 0.5,
                volume: 330,
                price: "40",
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 12,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "10",
                country: "Мексика",
                strength: 0.5,
                volume: 250,
                price: "30",
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 13,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "11",
                country: "Німеччина",
                strength: 3,
                volume: 750,
                price: "60",
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 14,
                category: 'beer',
                brand: 'Krombacher',
                name: "12",
                country: "Чехія",
                strength: 0,
                volume: 500,
                price: "50",
                image: '../img/im-2.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 15,
                category: 'beer',
                brand: 'Leffe',
                name: "13",
                country: "Німеччина",
                strength: 0.5,
                volume: 330,
                price: "40",
                image: '../img/im-3.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 16,
                category: 'beer',
                brand: 'Lowenbrau',
                name: "14",
                country: "Чехія",
                strength: 0.5,
                volume: 250,
                price: "30",
                image: '../img/im-4.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 17,
                category: 'beer',
                brand: 'Hoegaarden',
                name: "15",
                country: "Бельгія",
                strength: 3,
                volume: 750,
                price: "60",
                image: '../img/im-1.png',
                description: 'Дуис омнес детерруиссет но ест, те яуи тритани малуиссет реферрентур. Хис еи аеяуе феугаит. Ех тантас долорум евертитур ест, пробатус суавитате вулпутате вис ан. Цибо персиус ат меа, алиа мовет аетерно ид хас, фалли цаусае апеириан хис ут. Дуо ин нисл плацерат тхеопхрастус, яуас рецусабо мнесарчум вим еа.'
            },
            {
                id: 18,
                category: 'beer',
                brand: 'Krombacher',
                name: "16",
                country: "Великобританія",
                strength: 0,
                volume: 500,
                price: "50",
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
                price: "40",
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
                price: "30",
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
                price: "60",
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
                price: "50",
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
                price: "40",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                price: "30",
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
                confirmed: false


            },

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
            this.goods.push(newGoods)
        },
        addBanner: function (newBanners) {
            this.banners.push(newBanners)
        },

        getDetails: function (x) {
            return x
        }
        ,
        getByCategory: function (x) {
            if (x == 'others') {
                sortedGoods = []
                for (i in this.goods) {
                    if (this.goods[i].category != 'beer' && this.goods[i].category != 'wine' && this.goods[i].category != 'vodka' && this.goods[i].category != 'whiskey' && this.goods[i].category != 'tequila') {
                        sortedGoods.push(this.goods[i])
                    }
                    return sortedGoods
                }
            } else {

                sortedGoods = [];
                for (i in this.goods) {
                    if (this.goods[i].category == x) {
                        sortedGoods.push(this.goods[i])
                    }

                }
                return sortedGoods
            }
        }
        ,
        getCategories: function () {
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
        getBanners:function(){
            return this.banners
        },

        deleteGoods: function (g) {
            for (i in this.goods) {
                if (g.id == this.goods[i].id) {
                    this.goods.splice(i, 1)


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
            for (i in this.goods) {
                if (g.id == this.goods[i].id) {
                    this.goods[i] = g
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
        }


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
// function showMainMenu(){}
// getE('burger_menu').onclick = function () {
//     if (getE("header_navbar_links").style.top == "35px") {
//         var pos1 = 35;
//         var id1 = setInterval(frame1, 5);
//         function frame1() {
//             if (pos1 == -435) {
//                 clearInterval(id1);
//             } else {
//                 pos1 -= 5;
//                 getE("header_navbar_links").style.top = pos1 + 'px';
//             }
//         }
//     }
//     else {
//         var pos = -435;
//         var id = setInterval(frame, 5);
//         function frame() {
//             if (pos == 35) {
//                 clearInterval(id);
//             } else {
//                 pos += 5;
//                 getE("header_navbar_links").style.top = pos + 'px';
//             }
//         }
//     }
// };
//
// getE('header_navbar_links').onclick = function () {
//     if (getE("header_navbar_links").style.top == "35px") {
//         var pos1 = 35;
//         var id1 = setInterval(frame1, 1);
//
//         function frame1() {
//             if (pos1 == -435) {
//                 clearInterval(id1);
//             } else {
//                 pos1 -= 5;
//                 getE("header_navbar_links").style.top = pos1 + 'px';
//             }
//         }
//     }
// };
// getE('sidebar_button').onclick = function () {
//     console.log('klick');
//     if (getE("sbtabm").style.left == "0px") {
//         console.log('if')
//         var pos1 = 0;
//         var id1 = setInterval(frame1, 5);
//
//         function frame1() {
//             if (pos1 == -300) {
//                 clearInterval(id1);
//             } else {
//                 pos1 -= 5;
//                 getE("sbtabm").style.left = pos1 + 'px';
//                 getE("sidebar_button").style.left = 300 + pos1 + 'px';
//             }
//
//
//         }
//     }
//     else {
//         console.log('else')
//         console.log(getE("sbtabm").style.left);
//
//         var pos = -300;
//         var id = setInterval(frame, 5);
//
//         function frame() {
//             if (pos == 0) {
//                 clearInterval(id);
//             } else {
//                 pos += 5;
//                 getE("sbtabm").style.left = pos + 'px';
//             }
//
//
//         }
//     }
// };
// getE('sidebar_button').onclick = function () {
//     if (getE("sbtabm").style.top == "35px") {
//         var pos1 = 35;
//         var id1 = setInterval(frame1, 1);
//
//         function frame1() {
//             if (pos1 == -435) {
//                 clearInterval(id1);
//             } else {
//                 pos1 -= 5;
//                 getE("header_navbar_links").style.top = pos1 + 'px';
//             }
//         }
//     }
// };

var q=222222;