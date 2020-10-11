// 二进制数转字符串
/**
 * @param {number} num
 * @return {string}
 */
// 小数
var printBin = function(num) {
  let str = '0.';
  while(str.length < 32){
    num *= 2
    if(num > 1){
      str += '1'
      num--
    }else if(num < 1){
      str += '0'
    }else
      return str + '1'
  }
  return 'ERROR'
};