/**
 * Created by tos on 02.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstans = require('../constants/MfwConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _rules = [
    '0 - лн, 1 - рц, 2 - дг, 3 - тз, 4 - чкх, 5 - пб, 6 - шщж, 7 - с, 8 - вф, 9 - м',
    'Вбить число, которое нужно запомнить',
    'Чтобы обновить список слов для пары чисел, удалить и вбить пару чисел заново. Работает только для последней пары цифр набранного числа',
    'Нажать на слово в списке, чтобы использовать его в предложении для запоминания',
    'Максимум 9 пар чисел'
];

var MfwStore = assign({}, EventEmitter.prototype, {

    getRules: function() {
        return _rules;
    }

});

module.exports = MfwStore;