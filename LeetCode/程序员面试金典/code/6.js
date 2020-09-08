// 字符串压缩
/**
 * @param {string} S
 * @return {string}
 */

// 1. 简单遍历，每次更换字母就添加进目标字符串
var compressString = function(S) {
  let aim = '';
  let nowLetter = null;
  let nowCount = 0;
  for(let letter of S){
    if(letter != nowLetter){
      if(nowLetter)aim += nowLetter + nowCount;
      nowLetter = letter;
      nowCount = 1;
    }else{
      nowCount++;
    }
  }
  aim += nowLetter + nowCount;
  return aim.length < S.length ? aim : S;
};