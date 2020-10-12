// 绘制直线
/**
 * @param {number} length
 * @param {number} w
 * @param {number} x1
 * @param {number} x2
 * @param {number} y
 * @return {number[]}
 */
// 也不想说话
var drawLine = function(length, w, x1, x2, y) {
  let res = [];
  let arr = new Array(32 * length).fill('0')
  for(let i = x1 + y * w; i <= x2 + y * w; i++) {
    arr[i] = '1'
  }
  for(let i = 0; i < length; i++) {
    let str = arr.slice(i * 32, i * 32 + 32).join('');
    // 如果是负数
    if(str[0] === '1') {
      res[i] = -(parseInt(str.split('').map(e => e === '1' ? '0' : '1').join(''), 2) + 1)
    } else {
      res[i] = parseInt(str, 2)
    }
  }
  return res
};