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
  console.log('mark a %o b %o arr %o', a,b,wordsArr);
  let re = b ? new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([уеыаоэяйъиюьё]{0,2})(['+b+']{1})([а-я]*)$') :
      new RegExp('^([уеыайъоэяиюьё]{0,2})(['+a+']{1})([а-я]*)$');
  if (b) return wordsArr.map(function(v){
    return v.replace(re,function(match, p1, p2, p3, p4,p5){
      return p1 + ' ' + p2 + ' ' + p3 + ' ' + p4 + ' ' + p5;
    });
  });
  else return wordsArr.map(function(v){
    return v.replace(re,function(match, p1, p2, p3){
      return p1 + '<b>' + p2 + '</b>' + p3;
    });
  });
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
    var couples = this.state.couples.map(function(v,index,arr) {
      words = self.state.lists[index];
      //console.log(words);
      words = markFirstSymbols('м','м',words);
      //console.log(words);
      words = words.map(function(v2, index2, arr2) {
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