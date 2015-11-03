/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

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
    value: ReactPropTypes.string
  },

  render: function() {
    return (
      <input
        id={this.props.id}
        placeholder={this.props.placeholder}
        onBlur={this._save}
        onChange={this._onChange}
        onKeyDown={this._onKeyDown}
        //value={this.state.value}
        autoFocus={false}
        />
    );
  },

  _onChange: function () {
    this._save();
  },

  _onKeyDown: function (event) {
    if (event.keyCode === 13) {
      this._save();
    }
  },

  _save: function () {
    console.log('save');
  }
});

module.exports = InputSection;