// 下一个数
/**
 * @param {number} num
 * @return {number[]}
 */
// 1. 首先计算num中二进制位1的个数
// 然后分别向上向下暴力遍历
var countOne = function(num){
  return num.toString(2).split('').filter(x => x == 1).length;
}
var findClosedNumbers = function(num) {
  let t = countOne(num);
  let res = [];
  let cur = num + 1;
  while(countOne(cur) != t)cur++;
  res[0] = cur;
  cur = num - 1;
  while(countOne(cur) != t)cur--;
  res[1] = cur;
  return res;
};

// 2. 