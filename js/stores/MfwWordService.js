/**
 * Created by tos on 04.11.2015.
 */

var words = require('../constants/MfwDictionary');

var MfwWordsService =  {

  findById: function (id) {
    var deferred = $.Deferred();
    var employee = null;
    var l = words.length;
    for (var i = 0; i < l; i++) {
      if (words[i].id == id) {
        employee = words[i];
        break;
      }
    }
    deferred.resolve(employee === null ? [] : employee);
    return deferred.promise();
  },

  findByName: function (searchKey) {
    var deferred = $.Deferred();
    var results = words.filter(function (element) {
      var fullName = element.firstName + " " + element.lastName;
      return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
    });
    deferred.resolve(results);
    return deferred.promise();
  },

  findByManager: function (managerId) {
    var deferred = $.Deferred();
    var results = words.filter(function (element) {
      return managerId === element.managerId;
    });
    deferred.resolve(results);
    return deferred.promise();
  },

  findByCifrMethod: function(number, currentResult, lastNumber){
    var deferred = $.Deferred();
    var couple,
      error,
      result = [],
      inputDigitLen = number.length,
      charToPage={
        'л':'Z_171',
        'р':'Z_224',
        'д':'Z_164',
        'т':'Z_226',
        'ч':'Z_231',
        'п':'Z_175',
        'ш':'Z_232',
        'с':'Z_225',
        'в':'Z_162',
        'м':'Z_172'
      };
    if (/^\d{1,18}$/.test(number) || number == ''){
      //console.log('number %o', number);
      if (number && inputDigitLen%2 === 0){
        couple = number[inputDigitLen-2] +''+ number[inputDigitLen-1];
        //lastNumber = lastNumber.substring(0,lastNumber.length-1);
        //console.log('Couple %o number %o lastNumber %o', couple, number, lastNumber);

        // number difference
        if (lastNumber.length < number.length){ // add couple
          currentResult[currentResult.length] = findCoupleFromDict(couple);
        } else if(number.length === lastNumber.length){ // usually need to renew last couple
          currentResult[currentResult.length-1] = findCoupleFromDict(couple);
        } else {
          currentResult.pop();
        }

      } else {
        error = 'Last digit does not have a couple';
        if (!number) {
          error = 'Empty input field';
          currentResult = [];

        }
      }
    } else if (/^\d*$/.test(number)) {
      error = 'Maximum eighteen (18) digits';
    } else {
      error = 'Not a number in search bar';
    }
    result = currentResult;
    deferred.resolve(error,result);
    return deferred.promise();
  },

  findCoupleFromDict: function(coupleOfDigit){
    var re,
      regexp,
      couple,
      firstDigit,
      secondDigit,
      wordsetResult,
      digitToChar = {
        0:'лн',
        1:'рц',
        2:'дг',
        3:'тз',
        4:'чкх',
        5:'пб',
        6:'шщж',
        7:'с',
        8:'вф',
        9:'м'
      };
    couple = coupleOfDigit;
    firstDigit = digitToChar[couple[0]];
    secondDigit = digitToChar[couple[1]];
    re = new RegExp (/[а-я]{4,16}\s{1}\d{1}\s{1}[м]{1}/g);
    regexp = new RegExp('^[уеыайъоэяиюьё]{0,2}['+firstDigit+']{1}[уеыаоэяйъиюьё]{0,2}['+secondDigit+']{1}[а-я]*$');

    wordsetResult = words.filter(function (element) {
      return regexp.test(element);
    });
    wordsetResult.sort(MfwWordsService.randOrd);
    wordsetResult.length = 10;
    return wordsetResult;

  },

  randOrd: function (){
    return (Math.round(Math.random())-0.5);
  }

};

module.exports = MfwWordsService;