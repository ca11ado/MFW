/**
 * Created by tos on 03.11.2015.
 */

var AppDispatcher = require('../dispatcher/MfwDispatcher');
var MfwConstants = require('../constants/MfwConstants');

var MfwActions = {

  updateText: function(text) {
    AppDispatcher.dispatch({
      actionType: MfwConstants.MFW_UPDATE_INPUT,
      text: text
    });
  },

  updateWordsList: function(listIndex) {
    AppDispatcher.dispatch({
      actionType: MfwConstants.MFW_UPDATE_LIST,
      index: listIndex
    });
  }

};

module.exports = MfwActions;