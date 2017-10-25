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
