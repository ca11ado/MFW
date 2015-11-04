/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwOutputStore = require('../stores/MfwOutputStore');

function getMfwOutputState() {
  return {
    couples: MfwOutputStore.getCouples(),
    lists: MfwOutputStore.getWordsLists()
  }
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
    var words, list, self = this;
    var couples = this.state.couples.map(function(v,index,arr) {
      words = self.state.lists[index];
      words = words.map(function(v2, index2, arr2) {
        return React.createElement('li', {key:index2, className: 'wordsInList'+index }, v2);
      });
      list = React.createElement('ul', {className: 'list' + index}, words);
      return React.createElement('div', {key:index, className: 'outputCouples'}, list);
    });
    return (
      <div id={this.props.id}>
        {couples}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = OutputSection;