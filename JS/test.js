/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  // 1. 初始化t的字符集
  const map = {};
  for (const c of t) {
    if (!map[c]) {
      map[c] = 1;
    } else {
      map[c]++;
    }
  }
  // 2. 左右指针
  let left = 0, right = 0;
  const sLen = s.length, tLen = t.length;
  // 3. 扩张窗口
  for (; right < sLen; right++) {
    const rightChar = s[right];
    
  }
};