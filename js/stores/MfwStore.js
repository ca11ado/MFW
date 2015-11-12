/**
 * Created by tos on 02.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstants = require('../constants/MfwConstants');
var AppDispatcher = require('../dispatcher/MfwDispatcher');
var MfwOutputStore = require('./MfwOutputStore');
var Lib = require('./SmallLib');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _rules = [
    '0 - лн, 1 - рц, 2 - дг, 3 - тз, 4 - чкх, 5 - пб, 6 - шщж, 7 - с, 8 - вф, 9 - м',
    'Вбить число, которое нужно запомнить',
    'Чтобы обновить список слов для пары чисел, удалить и вбить пару чисел заново. Работает только для последней пары цифр набранного числа',
    'Нажать на слово в списке, чтобы использовать его в предложении для запоминания',
    'Максимум 16 пар чисел'
  ],
  _infoSecText = 'Enter number',
  _textHandler = '',
  _selectedWords = [],
  _output = [];

function updateAll(numbers) {
  updateOutput(numbers); // before updateInputNumber()
  updateInputNumber(numbers);
  updateInfo('Enter number');
}

function updateInfo(text) {
  _infoSecText = text;
}

function updateInputNumber(numbers) {
  _textHandler = numbers;
}

function updateOutput(numbers){
  if (numbers > _textHandler) {

  } else if (numbers < _textHandler) {

  }
}

var MfwStore = assign({}, EventEmitter.prototype, {

  getSelectedWords: function(){
    return _selectedWords;
  },

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

MfwStore.dispatchToken = AppDispatcher.register(function (action) {
  AppDispatcher.waitFor([MfwOutputStore.dispatchToken]);
  var error;
  switch (action.actionType) {

    case MfwConstants.MFW_UPDATE_INPUT:
      error = Lib.restrictions(action.text).error;
      if (error) updateInfo(error);
      else updateAll(action.text);

      MfwStore.emitChange();
      break;
    default:
      console.log('Do not know this action');
  }
});

/*setTimeout(function(){
  _selectedWords.push('мама','дед');
 MfwStore.emit(CHANGE_EVENT);
 },2000);*/

module.exports = MfwStore;