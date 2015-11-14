/**
 * Created by tos on 02.11.2015.
 */

let MfwOutputStore = require('../stores/MfwOutputStore'),
    MfwActions = require('../actions/MfwActions');
var React = require('react');
var ReactPropTypes = React.PropTypes;

function getMfwOutputState() {
  return {
    getSelected: MfwOutputStore.getSelectedWords()
  }
}

var SelectionSection = React.createClass({

  getInitialState: function() {
    return getMfwOutputState();
  },

  componentDidMount: function(){
    MfwOutputStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    MfwOutputStore.removeChangeListener(this._onChange);
  },

  render: function() {
    let removeEl = '',
      self = this;
    let words = this.state.getSelected.map(function(v,index,arr){
      if (v) removeEl = React.createElement('img', {onClick: self._clearSelected,className:'removeSelected', src:'img/delete-min.png'});
      else v = '. . .';
      return React.createElement('span', {className:'selectedWords', key:index}, v);
    });
    return (
      <div id={this.props.id}>
        {removeEl}
        {words}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  },

  _clearSelected: function(){
    MfwActions.clearSelectedWords();
  }
});

module.exports = SelectionSection;