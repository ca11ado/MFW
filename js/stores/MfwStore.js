/**
 * Created by tos on 02.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstans = require('../constants/MfwConstants');
var AppDispatcher = require('../dispatcher/MfwDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _rules = [
    '0 - лн, 1 - рц, 2 - дг, 3 - тз, 4 - чкх, 5 - пб, 6 - шщж, 7 - с, 8 - вф, 9 - м',
    'Вбить число, которое нужно запомнить',
    'Чтобы обновить список слов для пары чисел, удалить и вбить пару чисел заново. Работает только для последней пары цифр набранного числа',
    'Нажать на слово в списке, чтобы использовать его в предложении для запоминания',
    'Максимум 9 пар чисел'
  ],
  _infoSecText = 'Enter number',
  _textHandler = '';

function updateAll(numbers) {
  updateInfo('Enter number');
  _textHandler = numbers;
}

function updateInfo(text) {
  return _infoSecText = text;
}

var MfwStore = assign({}, EventEmitter.prototype, {

  getRules: function() {
    return _rules;
  },

  getInformation: function() {
    return _infoSecText;
  },

  getTextHandler: function() {
    return _textHandler;
  },

  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callaback) {
    this.removeListener(CHANGE_EVENT, callaback);
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }

});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case MfwConstans.MFW_UPDATE_TEXT:
      if (/^\d*$/.test(action.text)) { // проверка на число
        updateAll(action.text);
      } else {
        updateInfo('Вы можете вводить только цифры');
      }
      MfwStore.emitChange();
      break;
    default:
      console.log('Do not know this action');
  }
});

/*setTimeout(function(){
 _infoSecText = 'Test';
 MfwStore.emit(CHANGE_EVENT);
 },2000);*/

module.exports = MfwStore;