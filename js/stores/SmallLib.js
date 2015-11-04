/**
 * Created by tos on 04.11.2015.
 */

module.exports = {

  restrictions : function (input) {
    var MAX_DIGITS = 18;
    var result = {error: false};
    if (!/^\d*$/.test(input)) {
      result.error = 'Можно использовать только цифры';
    }
    if (input.length >= MAX_DIGITS) {
      result.error = MAX_DIGITS + ' maximum digits in input';
    }
    return result;
  }
};