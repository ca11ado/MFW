/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var MfwOutputStore = require('../stores/MfwOutputStore');

function getMfwOutputState() {
  return {
    couples: MfwOutputStore.getCouples()
  }
}

var OutputSection = React.createClass({

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
    var couples = this.state.couples.map(function(v,index,arr) {
      return React.createElement('div', {key:index, className: 'outputCouples'}, v);
    });
    return (
      <div>
        {couples}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = OutputSection;