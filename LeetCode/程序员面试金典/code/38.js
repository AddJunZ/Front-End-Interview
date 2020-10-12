// 整数转换
/**
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
var convertInteger = function(A, B) {
  let res = A ^ B;
  let time = 0;
  while(res != 0){
    if(res & 1 == 1){
      time++;
    }
    res >>>= 1;
  }
  return time;
};