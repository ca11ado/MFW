/**
 * Created by tos on 04.11.2015.
 */

var EventEmitter = require('events').EventEmitter;
var MfwConstants = require('../constants/MfwConstants');
var MfwDictionary = require('../constants/MfwDictionary');
var AppDispatcher = require('../dispatcher/MfwDispatcher');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _digitsCouples = [];

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

  console.log('dispatch MfwOutputStore');

  switch (action.actionType) {
    case MfwConstants.MFW_UPDATE_INPUT:

      break;
    default:
      //nothing
  }

});

module.exports = MfwOutputStore;