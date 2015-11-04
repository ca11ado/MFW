/**
 * Created by tos on 02.11.2015.
 */
'use strict';

var React = require('react');
var InfoSection = require('./InfoSection.react');
var InputSection = require('./InputSection.react');
var SelectionSection = require('./SelectionSection.react');
var OutputSection = require('./OutputSection.react');
var LegendaSection = require('./LegendaSection.react');
var MfwStore = require('../stores/MfwStore');

function getMfwState() {
  // get state from the store
  return {
    getRules: MfwStore.getRules(),
    getInfo: MfwStore.getInformation(),
    getTextHandler: MfwStore.getTextHandler(),
    getSelectedWords: MfwStore.getSelectedWords()
  }
}

var MfwApp = React.createClass({

  getInitialState: function(){
    return getMfwState();
  },

  componentDidMount: function() {
    MfwStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    MfwStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div id='wrapMain'>
        <InfoSection id='wrapInfoField' getInfo={this.state.getInfo} />
        <InputSection id='wrapSearchBar' getHandler={this.state.getTextHandler} />
        <SelectionSection id='wrapStory' getSelected={this.state.getSelectedWords} />
        <OutputSection id='wrapWordsLists' />
        <LegendaSection id='wrapLegend' getRules={this.state.getRules} />
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwState());
  }
});

module.exports = MfwApp;