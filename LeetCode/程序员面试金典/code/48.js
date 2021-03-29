// https://leetcode-cn.com/problems/permutation-ii-lcci/
// 有重复字符串的排列组合

/**
 * @param {string} S
 * @return {string[]}
 */
// 1. 利用set最后去重
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

// 2. 排序 排序后剪枝简单
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

// 3. 直接使用set在遍历的时候去除相同节点
var permutation = S => {
  const arr = S.split('');
  const res = [];
  function backTrack(index) {
    const set = new Set();
    if(index === arr.length){
      res.push(arr.slice());
      return ;
    }
    for(let i = index; i < arr.length; i++){
      if(set.has(arr[i]))continue ;
      set.add(arr[i]);
      [arr[index], arr[i]] = [arr[i], arr[index]];
      backTrack(index + 1);
      [arr[index], arr[i]] = [arr[i], arr[index]];
    }
  }
  backTrack(0);
  return res.map(r => r.join(''));
}