/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwActions = require('../actions/MfwActions');

var InputSection = React.createClass({

  getInitialState: function() {
    return {
      //value: '',
      placeholder : 'Enter number' // ???
    }
  },

  propTypes: {
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    //value: ReactPropTypes.string,
    getHandler: ReactPropTypes.string
  },

  render: function() {
    return (
      <input
        id={this.props.id}
        placeholder={this.props.placeholder}
        onChange={this._onChange}
        //value={this.state.getHandler}
        autoFocus={true}
        />
    );
  },

  _onChange: function (event) {
    /*var value = event.target.value;
    this._save(value);
    console.log(this.state);*/
    console.log(this.props.value);
  },

  _onKeyDown: function (event) {
    if (event.keyCode === 13) {
    }
  },

  _save: function (value) {
    MfwActions.updateText(value);
  }
});

module.exports = InputSection;