// 字符串轮转
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
// 1. 如果s2符合要求，将s2进行复制拼接，就可以拼出s1
var isFlipedString = function(s1, s2) {
  if(s1.length != s2.length)return false;
  s2 = s2 + s2;
  return s2.indexOf(s1) != -1;
};