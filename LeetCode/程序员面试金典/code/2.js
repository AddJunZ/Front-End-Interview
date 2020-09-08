// 判定是否互为字符重排
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

// 1: 将两个字符串按字母排序后 判断是否相等
var CheckPermutation = function(s1, s2) {
  return s1.split('').sort().join() === s2.split('').sort().join();
}

// 2: 使用hash，一个用加 一个用减 最后的每一项都是0
var CheckPermutation = function(s1, s2) {
  let map = {};
  let [len1, len2] = [s1, s2].map(s => s.length);
  if(len1 !== len2)return false;
  for(let s of s1){
    map[s] ? map[s]++ : map[s] = 1;
  }
  for(let s of s2){
    if(!map[s]){
      return false;
    }else{
      map[s]--;
    }
  }
  if(Object.values(map).every(v => v === 0 )){
    return true;
  }
  return false;
}