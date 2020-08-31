/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

// 简便1
var CheckPermutation = function(s1, s2) {
  return s1.split('').sort().join() === s2.split('').sort().join();
}

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