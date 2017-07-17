app.controller('myCtrl', ['UserService', function (UserService, $timeout) {
    var vm = this;
    vm.show_registration = false;
    vm.show_sign_in = false;

    vm.selectdays = '';
    vm.selectmonth = '';
    vm.selectyear = '';
    vm.month = [1,2,3,4,5,6,7,8,9,10,11,12];
    vm.days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    vm.year = [];
    vm.NewUser = [];
    vm.ConfirmOrder = [];
    vm.Orders = [];
    vm.order = {}
    vm.detorder = [];
    vm.CountGood = 'В корзині немає товарів';
    vm.items = [];
    vm.page_count = 0;
    vm.search = '';
    vm.show_basket = false;
    vm.show_map = false;
    vm.tray = [];
    vm.users = UserService.getUsers()
    vm.user = {};
    vm.catCat=null
    vm.alertMessage = 'для здійснення покупки необхідно авторизуватися';



    vm.start=function(){
        UserService.getGoodsFromDB()
        vm.getGoods()
        vm.length=vm.goods.length
        vm.categoryToStart=JSON.parse(sessionStorage.getItem('category'))
        sessionStorage.clear()
        console.log(vm.categoryToStart);
        if(vm.categoryToStart!=null||vm.categoryToStart!=undefined){

            vm.filterByCategory(vm.categoryToStart)
            }


        }




    vm.catFromMain=function (x) {
        vm.cat={}
        vm.cat.cat=x
        sessionStorage.setItem('category', JSON.stringify(x))
        console.log(JSON.parse(sessionStorage.getItem('category')));

    }
    vm.getDates = function () {
        for (var i = 2017; i >= 1920; i--) {
            vm.year.push(i.toString())
        }
    }
    
    

//registration and logIn

    vm.register = function (newUser) {
        vm.newUser = newUser
        vm.newUser.confirmed = false

        vm.show_registration = !vm.show_registration
        UserService.addUser(vm.newUser)
    }

    vm.logIn = function () {
        for (i in vm.users) {
            if (vm.user.email == vm.users[i].email && vm.user.password == vm.users[i].password) {
                delete vm.user[i].password
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
    }

    vm.openNav = function () {
        document.getElementById("mySidenav").style.width = "350px";
    }
    vm.closeNav = function () {
        document.getElementById("mySidenav").style.width = "0";
    }

//get goods

    vm.getGoods = function () {
        vm.goods = UserService.getGoods();
        vm.pagination()
    };
    vm.getUsers = function () {
        vm.user = UserService.getUsers();
        // for(i in vm.users){
            // delete vm.users[i].password
            // delete vm.users[i].comments
        // }
    };


// FILTERS AND SORTERS
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

//filters by category

    vm.filterByCategory=function(x){
        vm.categoryToStart=''

       vm.goods=UserService.getByCategory(x)
        vm.FiltersPrepare()
        vm.pagination()
    }

// filtering by PRICE
    vm.priceRange = function (goods) {
        return (parseInt(goods['price']) >= vm.lower_price_bound && parseInt(goods['price']) <= vm.upper_price_bound);
    };
    vm.sortGoods = function (y) {
        vm.myOrderBy = y;
    }
// filtering by VOLUME

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

// filtering by BRAND

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

// filtering by COUNTRY

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

// filtering by STRENGTH

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


//goods details
    vm.goodsDetails = JSON.parse(sessionStorage.getItem('commodity'))
    vm.detail_of_goods = function (commodity) {
        vm.goodsDetails = commodity
        vm.goodsDetails.count = 1
        sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))


    }
    vm.detailsOfSearch = function (x) {
        if (location.href.includes("details")) {
            location.href = '#/catalogue'

            vm.goodsDetails = x
            vm.goodsDetails.count = 1
            sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            window.location.href = '#/details'
            my.searchResults = false
            my.search=''
        } else {

            vm.goodsDetails = x
            vm.goodsDetails.count = 1
            sessionStorage.setItem("commodity", JSON.stringify(vm.goodsDetails))
            window.location.href = '#/details'
            my.searchResults = false
            my.search=''

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


//LOCAL STORAGE
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



        vm.userLoggedIn=JSON.parse(localStorage.getItem('user'))
        if (vm.userLoggedIn.name == null) {
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

    };


//TRAY
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


//goods To Tray from details
    vm.detailsOfOrder=function () {
        vm.order=vm.userLoggedIn
        vm.order.archive=false


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
    // vm.userAutoUpdate = function () {
    //     if (vm.order.name != vm.userLoggedIn.name ||
    //         vm.order.sname != vm.userLoggedIn.sname ||
    //         vm.order.phone != vm.userLoggedIn.phone ||
    //         vm.order.address.street != vm.userLoggedIn.address.street ||
    //         vm.order.address.house != vm.userLoggedIn.address.house ||
    //         vm.order.address.flat != vm.userLoggedIn.address.flat ||
    //         vm.order.address.stair != vm.userLoggedIn.address.stair ||
    //         vm.order.address.entrance != vm.userLoggedIn.address.entrance) {
    //         vm.userUpdate = true
    //     }
    // }
    // vm.autoUpdate = function () {
    //     vm.upUser = {
    //         address:{}
    //     }
    //     if (vm.order.name != null)
    //         vm.upUser.id = vm.userLoggedIn.id
    //     if (vm.order.name != null)
    //         vm.upUser.name = vm.order.name
    //     if (vm.order.sname != null)
    //         vm.upUser.sname = vm.order.sname
    //     if (vm.order.phone != null)
    //         vm.upUser.phone = vm.order.phone
    //     if (vm.order.address.street != null)
    //         vm.upUser.address.street = vm.order.address.street
    //     if (vm.order.address.house != null)
    //         vm.upUser.address.house = vm.order.address.house
    //     if (vm.order.address.flat != null)
    //         vm.upUser.address.flat = vm.order.address.flat
    //     if (vm.order.address.stair != null)
    //         vm.upUser.address.stair = vm.order.address.stair
    //     if (vm.order.address.entrance != null)
    //         vm.upUser.address.entrance = vm.order.address.entrance
    //     console.log(vm.upUser);
    //     UserService.updateUser(vm.upUser)
    // }

    //BUY GOODS
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
        if (vm.userLoggedIn.name==undefined) {
            vm.alertConfirmation = true
            vm.alertMessage = 'для здійснення покупки необхідно авторизуватися'
        }else{

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


//pagination
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


//carousele on main page
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
        mobileFirst:false,
        rtl:false,
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
        autoplaySpeed: 1500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        // centerMode: true,

        // speed: 2000,
        method: {}
    };


    // vm.getGoods();
    // vm.getGoods()
    vm.init = function () {
        vm.start()
        // vm.checkCatalogue()
        vm.getDates()
        vm.localStore()
        vm.trayCheck()
        vm.goodsForSlider1()
        vm.goodsForSlider2()
        vm.FiltersPrepare()
        vm.getUsers();



    }
    vm.init();


}]);
