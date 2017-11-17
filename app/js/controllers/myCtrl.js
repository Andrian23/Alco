app.controller('myCtrl', ['UserService', '$timeout', '$scope','$rootScope', function (UserService, $timeout, $scope,$rootScope) {
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
    vm.search1 = function (el) {
        if (vm.search != '')
            return true
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

        $rootScope.trayCheck();
        location.href = '#/catalogue'

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
        vm.goodsDB = UserService.getGoodsFromDB();
        vm.length = vm.goodsDB.length;
        vm.number1 = UserService.getBanners();

        vm.getGoods();
        vm.goodsForSlider1();
        vm.goodsForSlider2();
        vm.loggedUserCheck();
        vm.getDates();
        $rootScope.trayCheck();

    };
    vm.init();


}]);
