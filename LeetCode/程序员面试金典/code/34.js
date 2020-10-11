//  插入
/**
 * @param {number} N
 * @param {number} M
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
// 不想多说
var insertBits = function(N, M, i, j) {
  var a = N.toString(2).split('').reverse();
  var b = M.toString(2).split('').reverse();
  let o = 0;
  for(let k = i; k <= j; k++){
    a[k] = (b[o] != undefined ? b[o] : '0');
    o++;
  }
  return parseInt(a.reverse().join(''), 2);
};