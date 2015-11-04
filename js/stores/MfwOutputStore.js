/**
 * Created by tos on 04.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstants = require('../constants/MfwConstants');
var MfwDictionary = require('../constants/MfwDictionary');
var AppDispatcher = require('../dispatcher/MfwDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _digitsCouples = [],
  _lastInput;

function updateCouples(numbers){
  _digitsCouples = [];
  var str = '';
  for (var i=0; i<numbers.length; i++) {
    str += numbers[i];
    if (i%2 !== 0 || i === numbers.length-1) {
      _digitsCouples.push(str);
      str = '';
    }
  }
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
  }

});

MfwOutputStore.dispatchToken = AppDispatcher.register(function(action){

  switch (action.actionType) {
    case MfwConstants.MFW_UPDATE_INPUT:
      if (/^\d*$/.test(action.text)) { // проверка на число
        updateCouples(action.text);
      }
      MfwOutputStore.emitChange();
      break;
    default:
      //nothing
  }

});

module.exports = MfwOutputStore;