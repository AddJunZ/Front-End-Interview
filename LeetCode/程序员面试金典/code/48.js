// https://leetcode-cn.com/problems/permutation-ii-lcci/
// 有重复字符串的排列组合

/**
 * @param {string} S
 * @return {string[]}
 */
var permutation = function (s) {
  if (!s.length) return [];

  const result = [];
  fn(s.split(''), 0, result)
  // 去重
  return Array.from(new Set(result))
};
// 每次递归都把某一个替换成 在它之后的其他字符（遍历index之后的索引）
function fn(s, index, result) {
  if (s.length == index) {
    result.push(s.join(''));
    return
  }
  for (var i = index; i < s.length; i++) {
    // 这里可以判断 s[index]和s[i]的值是否相等
    // 是的话可以直接 continue 跳过
    [s[index], s[i]] = [s[i], s[index]];// 选定index个数的值
    fn(s, index + 1, result);// 处理index之后的字符
    [s[index], s[i]] = [s[i], s[index]];// 撤销操作
  }
}


var permutation = function (S) {
  let res = []
  backtrack('', S.split('').sort().join(''))
  function backtrack(path, S) {
    if (S === '') {
      return res.push(path)
    }
    for (let i = 0; i < S.length; i++) {
      if (i > 0 && S[i - 1] === S[i]) continue
      path += (S[i])
      backtrack(path, S.slice(0, i).concat(S.slice(i + 1)))
      path = path.slice(0, -1)
    }

  }
  return res
};
