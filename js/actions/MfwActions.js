/**
 * Created by tos on 03.11.2015.
 */

var AppDispatcher = require('../dispatcher/MfwDispatcher');
var MfwConstants = require('../constants/MfwConstants');

var MfwActions = {

  updateText: function(text) {
    AppDispatcher.dispatch({
      actionType: MfwConstants.MFW_UPDATE_TEXT,
      text: text
    });
  }

};

module.exports = MfwActions;