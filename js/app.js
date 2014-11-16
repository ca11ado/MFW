(function() {
    var app = angular.module('mfw', []);

    app.controller('DigitsController', function() {
        this.couple = digits;
        this.selected = selectedDigitsCouples;

    });
    app.controller('InputController', function () {
        this.inputDigits = {};

        //console.log('changes');
    });
    var INTEGER_REGEXP = /^\-?\d+$/;
    app.directive('integer', function() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.integer = function(modelValue, viewValue) {
                    //console.log('checked!');
                    if (ctrl.$isEmpty(modelValue)) {
                        // consider empty models to be valid
                        return true;
                    }

                    if (INTEGER_REGEXP.test(viewValue) && viewValue.length%2 == 0) {
                        console.log('true');
                        selectedDigitsCouples = [];
                        var couple = ''; // {string}
                        for (var i=0; i<viewValue.length;i++) {
                            couple += viewValue[i];
                            if (i%2 != 0) {
                                selectedDigitsCouples.push(couple);
                                couple = '';
                            }
                        }
                        return true;
                    }

                    // it is invalid
                    return false;
                };
            }
        };
    });

    var selectedDigitsCouples = [
        '01',
        '02'
    ];

    var digits = {
        '01': {
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
        '02': {
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
        },
        '03': {
            digitCouple: '03',
            description: '(нл)(тз)',
            words: [
                {
                    word: 'Нить',
                    description: ' гибкий, тонкий и продолговатый объект, чья длина в разы превосходит толщину',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9D%D0%B8%D1%82%D1%8C'
                },{
                    word: 'Латы',
                    description: ' доспех из крупных металлических пластин, откованных по форме тела воина',
                    link: 'https://ru.wikipedia.org/wiki/%D0%9B%D0%B0%D1%82%D1%8B'
                }
            ]
        }
    };


})();
