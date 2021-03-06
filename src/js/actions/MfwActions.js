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
  },

  updateSelectedWords: function(word,listIndex) {
    AppDispatcher.dispatch({
      actionType: MfwConstants.MFW_UPDATE_SELECTED_WORDS,
      word: word,
      listIndex: listIndex
    });
  },

  clearSelectedWords: function() {
    AppDispatcher.dispatch({
      actionType: MfwConstants.MFW_CLEAR_SELECTED_WORDS
    });
  }

};

module.exports = MfwActions;