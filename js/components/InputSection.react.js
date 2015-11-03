/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwActions = require('../actions/MfwActions');

var InputSection = React.createClass({

  getInitialState: function() {
    return {
      value: this.props.value || '',
      placeholder : 'Enter number' // ???
    }
  },

  propTypes: {
    id: ReactPropTypes.string,
    placeholder: ReactPropTypes.string,
    value: ReactPropTypes.string
  },

  render: function() {
    return (
      <input
        id={this.props.id}
        placeholder={this.props.placeholder}
        //onBlur={this._save}
        onChange={this._onChange}
        //onKeyDown={this._onKeyDown}
        value={this.state.value}
        autoFocus={true}
        />
    );
  },

  _onChange: function (event) {
    var value = event.target.value;
    this.setState({value: value});
    this._save(value);
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