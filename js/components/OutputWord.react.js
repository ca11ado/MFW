/**
 * Created by tos on 12.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;

var OutputWord = React.createClass({

  getInitialState: function() {
    return {
      firstPart: '',
      firstSymb: '',
      secondPart: '',
      secondSymb: '',
      thirdPart: ''
    };
  },

  render: function() {
    return (
      <li onClick={this._onClickWord}>
        <span>{this.props.firstPart}</span>
        <span className="specialSymb">{this.props.firstSymb}</span>
        <span>{this.props.secondPart}</span>
        <span className="specialSymb">{this.props.secondSymb}</span>
        <span>{this.props.thirdPart}</span>
      </li>
    );
  },

  _onClickWord: function(e) {
    console.log(e.currentTarget.textContent);
  }

});

module.exports = OutputWord;