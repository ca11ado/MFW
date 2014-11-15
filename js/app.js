(function() {
    var app = angular.module('mfw', []);

    app.controller('DigitsController', function() {
        this.couple = digits;
    });
    //test push
    var digits = [
        {
            digitCouple: '01',
            description: '(нл)(рц)',
            words: [
                {
                    word: 'Нора',
                    description: 'тоннель под землей с одним или несколькими ходами наружу',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%BE%D1%80%D0%B0'
                },{
                    word: 'Ларец',
                    description: 'большой ящик, дощатый сруб, сундук, закрома; ящик с навесной крышкой, откосом, для зернового хлеба или муки, для продажи припасов на базарах',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D1%80%D1%8C'
                }
            ]
        },
        {
            digitCouple: '02',
            description: '(нл)(дг)',
            words: [
                {
                    word: 'Лагуна',
                    description: 'мелкий водоём, отделённый от моря узкой полосой намытого песка (пересыпью) или коралловыми рифами.',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D0%B3%D1%83%D0%BD%D0%B0'
                },{
                    word: 'Нуга',
                    description: 'кондитерское изделие, традиционно изготовляемое из сахара или мёда и жареных орехов — миндаля, грецких или лесных орехов (но не из арахиса)',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9D%D1%83%D0%B3%D0%B0'
                }
            ]
        }
    ];

})();
