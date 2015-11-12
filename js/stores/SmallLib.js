/**
 * Created by tos on 04.11.2015.
 */

module.exports = {

  restrictions : function (input) {
    var MAX_DIGITS = 32;
    var result = {error: false};
    if (!/^\d*$/.test(input)) {
      result.error = 'Можно использовать только цифры';
    }
    if (input.length > MAX_DIGITS) {
      result.error = MAX_DIGITS + ' maximum digits in input';
    }
    return result;
  },

  /**
   * Возвращает массив с индексами измененных пар
   * @param last
   * @param current
   * @returns {array}
   */
  getEditedCouples: function(last,current) {
    let result = [],
      re = /[\S\s]{1,2}/g,
      last_c = last.match(re) || '',
      current_c = current.match(re);

    current_c.map( (v,index) => {
      if (!last_c[index] || last_c[index] !== current_c[index]) result.push(index);
    });
    if (last_c.length > current_c.length && result.length == 0) result.push(current_c.length); //если удален символ с конца строки
    return result;
  }
};