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
    //console.log('Couple %o, Lists %o', Object.keys(this.state.couples).length, this.state.lists.length);
    //console.log('Couples %o', this.state.couples);
    let couples = this.state.couples,
      lists,
      wordsLists = [];

    for (let key in couples) {
      if (couples.hasOwnProperty(key)) { // couples, firstSymb, [secondSymb]
        let words = this.state.lists[key];
        //console.dir(this.state.lists);
        //console.log(words, this.state.lists[key], key);
        //console.log('Couple k0 %o k1 %o k2 %o', couples[key][0],couples[key][1],couples[key][2]);
        //console.log(couples);
        words = markFirstSymbols(couples[key][1],couples[key][2],words);
        //console.log('Words %o', words);
        words = words.map(function (v,index) {
          v = v.map(function(v3,index3){
            return (index3 % 2 === 0)
              ? React.createElement('span', {key: 'span' + index3}, v3)
              : React.createElement('span', {key: 'span' +  index3, className: 'specialSymb'}, v3);
          });
          return React.createElement('li', {key: 'li' + index + key, className: 'wordsInList'+key }, v);
        });
        //console.log('Words %o', words);
        lists = (React.createElement('ul', {key: key, className: 'list' + key}, words));
        wordsLists.push(React.createElement('div', {key: key, className: 'outputCouple'}, lists));
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