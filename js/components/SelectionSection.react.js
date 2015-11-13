/**
 * Created by tos on 02.11.2015.
 */

let MfwOutputStore = require('../stores/MfwOutputStore');
var React = require('react');
var ReactPropTypes = React.PropTypes;

function getMfwOutputState() {
  return {
    getSelected: MfwOutputStore.getSelectedWords()
  }
}

var SelectionSection = React.createClass({

  componentDidMount: function(){
    MfwOutputStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    MfwOutputStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var words = this.props.getSelected.map(function(v,index,arr){
      return React.createElement('span', {key:index}, v + ' ');
    });
    return (
      <div id={this.props.id}>
        {words}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = SelectionSection;