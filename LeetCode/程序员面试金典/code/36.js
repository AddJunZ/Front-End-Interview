// 翻转数位
/**
 * @param {number} num
 * @return {number}
 */
// 知识科普：
// >> : 右移操作符，num >> 2，相当于num / 2，高位的空位补符号位
// >>> : 二进制右移补零操作符，无论num的正负，都在高位插入0
// -3 >> 1 === -1
// -3 >>> 1 === 2147483646，即"01111111111111111111111111111110"(32位)
var reverseBits = function(num) {
  if(num == -1) return 32;
  //right为0右边串1的长度，left为0左边连续串1的长度
  let max = 1, right = 0, left = 0;
  while(num != 0){
    // 最低位
    if((num & 1) == 1) left++;
    //出现一个0后，就可以把当前left的值赋给right
    else{
      right = left;
      left = 0;
    }
    max = Math.max(max, left + right + 1);
    // >>> 运算符 最后num变成0即遍历完所有的有效1
    num >>>= 1;
  }
  return max;
};