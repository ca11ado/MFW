/**
 * Created by tos on 12.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var OutputWord = require('./OutputWord.react');


function markFirstSymbols(a,b,wordsArr) {
  let re = b ?
    new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([уеыаоэяйъиюьё]{0,2})(['+b+']{1})([а-я]*)$') :
    new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([а-я]*)$');

  wordsArr = wordsArr.map(function (v) {
    let p11,p22,p33,p44,p55;
    v.replace(re,function(match, p1, p2, p3, p4,p5){
      if (b) { p11 = p1; p22=p2; p33=p3; p44=p4; p55=p5;
      } else { p11=p1; p22=p2; p33=p3; }
      return '';
    });
    return b ? [p11,p22,p33,p44,p55] : [p11,p22,p33];
  });
  return wordsArr;
}

function getOutputWord(index, firstPart, firstSymb, secondPart = '', secondSymb = '', thirdPart = '') {
  return (
    <OutputWord
      key = {'word' + index}
      firstPart = {firstPart}
      firstSymb = {firstSymb}
      secondPart = {secondPart}
      secondSymb = {secondSymb}
      thirdPart = {thirdPart}
      />
  );
}

var OutputList = React.createClass({

  render: function() {
    let words = this.props.words,
        symbols = this.props.symbols,
        wordKey = this.props.listKey;
    words = markFirstSymbols(symbols[0],symbols[1],words);
    words = words.map(function(v,index){
      return getOutputWord(wordKey+index, v[0], v[1], v[2], v[3], v[4]);
    });
    return (
      <ul className = {this.props.class}>
        {words}
      </ul>
    );
  }

});

module.exports = OutputList;