/**
 * Created by tos on 12.11.2015.
 */

let React = require('react'),
    ReactPropTypes = React.PropTypes,
    MfwActions = require('../actions/MfwActions');


var OutputWord = React.createClass({

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
    MfwActions.updateSelectedWords(e.currentTarget.textContent,this.props.listIndex);
  }

});

module.exports = OutputWord;