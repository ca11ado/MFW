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
    var words = this.state.getSelected.map(function(v,index,arr){
      return React.createElement('span', {key:index}, v + ' ');
    });
    let remove = words.length ? React.createElement('img', {onClick: this._clearSelected,className:'removeSelected', src:'img/delete-min.png'}) : '';
    return (
      <div id={this.props.id}>
        {remove}
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