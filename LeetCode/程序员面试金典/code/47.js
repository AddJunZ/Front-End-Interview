// https://leetcode-cn.com/problems/permutation-i-lcci/
// 无重复字符串的排列组合

/**
 * @param {string} S
 * @return {string[]}
 */

// 1. 本质上还是很暴力。。。
var permutation = function (S) {
  const res = [];
  function backTrack(cur) {
    if (cur.length === S.length) {
      res.push(cur);
    }
    for (let i = 0; i < S.length; i++) {
      if (cur.indexOf(S[i]) !== -1) continue;
      cur += S[i];
      backTrack(cur);
      cur = cur.slice(0, -1);
    }
  }
  backTrack('');
  return res;
};


// 2. 选过的元素去掉
var permutation = function (S) {
  const res = [];
  dfs('', S);
  function dfs(cur, str){
    if(str === ''){
      res.push(cur);
    }
    for(let i = 0; i < str.length; i++){
      cur += str[i];
      dfs(cur, str.slice(0, i).concat(str.slice(i + 1)));
      cur = cur.slice(0, -1);
    }
  }
  return res;
}

