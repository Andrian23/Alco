angular.module("myapp").controller("catalogCtrl",['$scope','UserService','$rootScope', function ($scope , UserService,$rootScope) {
    var vm = this;
    vm.CountGood = 'В корзині немає товарів';

     vm.init = function () {
         vm.goods = UserService.getGoodsFromDB();
         vm.length = vm.goods.length;
         vm.categoryToStart = JSON.parse(localStorage.getItem('category'));
         // localStorage.clear();

         if (vm.categoryToStart != null || vm.categoryToStart != undefined) {

             vm.filterByCategory(vm.categoryToStart)
         }

         vm.FiltersPrepare()
         // vm.getUsers();

     }
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
    vm.init()

}]);