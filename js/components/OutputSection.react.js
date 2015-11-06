/**
 * Created by tos on 02.11.2015.
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MfwOutputStore = require('../stores/MfwOutputStore');

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
    var words, list, self = this;
    var couples = this.state.couples.map(function(v,index) {
      words = self.state.lists[index];
      words = markFirstSymbols('м','м',words);
      words = words.map(function(v2, index2) {
        v2 = v2.map(function(v3,index3){
          return (index3 % 2 === 0)
            ? React.createElement('span', {key: index3}, v3)
            : React.createElement('span', {key: index3, className: 'specialSymb'}, v3);
        });
        return React.createElement('li', {key:index2, className: 'wordsInList'+index }, v2);
      });
      list = React.createElement('ul', {className: 'list' + index}, words);
      return React.createElement('div', {key:index, className: 'outputCouples'}, list);
    });
    return (
      <div id={this.props.id}>
        {couples}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getMfwOutputState());
  }
});

module.exports = OutputSection;