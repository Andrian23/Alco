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