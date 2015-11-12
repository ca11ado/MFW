/**
 * Created by tos on 04.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstants = require('../constants/MfwConstants');
var MfwWordsService = require('./MfwWordService');
var AppDispatcher = require('../dispatcher/MfwDispatcher');
var Lib = require('./SmallLib');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _digitsCouples = {}, // { digitCouple,firstSymbol,secondSymbol }
  _wordsLists = [],
  _lastInput = '';

function updateLastInput(txt) {
  _lastInput = txt;
}

function updateCouples(numbers){
  let re = /\d{1,2}/g;
  _digitsCouples = {};
  if (numbers) {
    let match = numbers.match(re);
    match.map(function(v,index) {
      _digitsCouples[index] = [v,MfwWordsService.getSymbsForDigit(v[0]),MfwWordsService.getSymbsForDigit(v[1]) || '']
    });
  } else {
    _digitsCouples = {};
  }
  updateLastInput(numbers);
}

function updateWordsLists () {
  if (Object.keys(_digitsCouples).length) {
    _wordsLists = new Array(Object.keys(_digitsCouples).length);
    for (let key in _digitsCouples) {
      if (_digitsCouples.hasOwnProperty(key)) _wordsLists[key] = MfwWordsService.findCoupleFromDict(_digitsCouples[key][0]);
    }
  } else {
    _wordsLists = [];
  }
}

function updateWordList (coupleIndex) {
  _wordsLists[coupleIndex] = [];
  if (_digitsCouples[coupleIndex]) _wordsLists[coupleIndex] = MfwWordsService.findCoupleFromDict(_digitsCouples[coupleIndex][0]);
}

var MfwOutputStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getCouples: function() {
    return _digitsCouples;
  },

  getWordsLists: function() {
    return _wordsLists;
  }

});

MfwOutputStore.dispatchToken = AppDispatcher.register(function(action){
  var error;

  switch (action.actionType) {
    case MfwConstants.MFW_UPDATE_INPUT:
      let editedCouples;
      //console.log('lastInput %o and currentInput %o', _lastInput, action.text);
      if (action.text == '') {
        updateCouples(action.text);
        updateWordsLists();
      } else {
        error = Lib.restrictions(action.text).error;
        if (!error) {
          editedCouples = Lib.getEditedCouples(_lastInput,action.text);
          //console.log('Edited couples %o', editedCouples);
          if (editedCouples.length > 0) {
            updateCouples(action.text);
            editedCouples.map((v,index) => updateWordList(v));
          }
        } else {
          //console.log('Error', error);
        }
      }
      MfwOutputStore.emitChange();
      break;
    default:
      //nothing
  }

});

module.exports = MfwOutputStore;