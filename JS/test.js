/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  var arr = [];
  fn(arr, '', 0, 0, n);
  return arr;
};

var fn = function (arr, str, left, right, n) {
  if (str.length == n * 2) {
    arr.push(str)
    return;
  }
  if (left < n) {
    fn(arr, str + '(', left + 1, right, n)
  }
  if (right < left) {
    fn(arr, str + ')', left, right + 1, n)
  }
}