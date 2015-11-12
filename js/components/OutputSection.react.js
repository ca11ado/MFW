/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwOutputStore = require('../stores/MfwOutputStore');
var OutputWord = require('./OutputWord.react');

function getMfwOutputState() {
  return {
    couples: MfwOutputStore.getCouples(),
    lists: MfwOutputStore.getWordsLists()
  }
}

function markFirstSymbols(a,b,wordsArr) {
  let re = b ?
    new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([уеыаоэяйъиюьё]{0,2})(['+b+']{1})([а-я]*)$') :
    new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([а-я]*)$');
  //console.log(wordsArr);
  wordsArr = wordsArr.map(function (v) {
    let p11,p22,p33,p44,p55;
    v.replace(re,function(match, p1, p2, p3, p4,p5){
      //console.log( p1, p2, p3, p4,p5);
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

var OutputSection = React.createClass({

  propTypes: {
    /*couples: ReactPropTypes.array.isRequired,
    lists: ReactPropTypes.array.isRequired*/
  },

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

    let couples = this.state.couples,
      lists,
      wordsLists = [],
      oneList = [];

    for (let key in couples) {
      if (couples.hasOwnProperty(key)) { // couple, firstSymb, [secondSymb]
        let words = this.state.lists[key];

        words = markFirstSymbols(couples[key][1],couples[key][2],words);

        words = words.map(function (v,index) {
          oneList.push(getOutputWord(key+index,v[0], v[1], v[2], v[3], v[4]));
        });

        lists = React.createElement('ul', {key: key, className: 'list' + key}, oneList);
        wordsLists.push(React.createElement('div', {key: key, className: 'outputCouple'}, lists));
        oneList = [];
      }
    }
    return (
      <div id={this.props.id}>
        {wordsLists}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = OutputSection;