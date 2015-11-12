/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwOutputStore = require('../stores/MfwOutputStore');
var OutputList = require('./OutputList.react');

function getMfwOutputState() {
  return {
    couples: MfwOutputStore.getCouples(),
    lists: MfwOutputStore.getWordsLists()
  }
}

function getOutputList(key, words, symbols) {
  return (
    <OutputList
      class = 'outputCouple'
      key = {key}
      listKey = {key}
      words = {words}
      symbols = {symbols}
    />
  );
}

var OutputSection = React.createClass({

  propTypes: {
    /*couples: ReactPropTypes.array.isRequired,
    lists: ReactPropTypes.array.isRequired*/
  },

  getInitialState: function() {
    return getMfwOutputState();
  },

  componentDidMount: function() {
    MfwOutputStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MfwOutputStore.removeChangeListener(this._onChange)
  },

  render: function() {

    let couples = this.state.couples,
      lists,
      wordsLists = [],
      oneList = [];

    let symbols,
        words;

    for (let key in couples) {
      if (couples.hasOwnProperty(key)) { // couple, firstSymb, [secondSymb]

        lists = React.createElement('ul', {key: key, className: 'list' + key}, oneList);

        words = this.state.lists[key];
        symbols= [couples[key][1],couples[key][2]];
        wordsLists.push(getOutputList('list'+key, words,symbols));
      }
    }
    return (
      <div id={this.props.id}>
        {wordsLists}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = OutputSection;