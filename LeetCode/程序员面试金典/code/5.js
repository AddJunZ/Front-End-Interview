// 一次编辑
/**
 * @param {string} first
 * @param {string} second
 * @return {boolean}
 */
// 1. 通过双指针，从左到右和从右到左扫描，遇到不一致的就停下，最后两个指针的位置肯定相差不超过1的距离
var oneEditAway = function(first, second) {
  if(first === second)return true;
  let [flen, slen] = [first, second].map(x => x.length);
  if(Math.abs(flen - slen) > 1)return false;
  let lindex = 0, rindex = Math.min(flen, slen);
  while(lindex < rindex && first[lindex] === second[lindex]){
    ++lindex;
  }
  console.log(lindex);
  let m = flen - 1, n = slen - 1;
  while(m >= 0 && n >= 0 && first[m] === second[n]){
    --m;
    --n;
  }
  return m - lindex < 1 && n - lindex < 1;
};
console.log(oneEditAway('a', 'ab'));


// 2. 首先判断两个的长度，如果一样长，则遇到那个不相等的字符后，剩下的字符串必须相等
// 其次，如果不相等，则遇到不相等的字符后，将长的字符串当下的这位字母不计入等串比对中，再对比两个字符串是否相等
var oneEditAway = function(first, second) {
  let [flen, slen] = [first, second].map(x => x.length);
  if(flen === slen){
    for(let i = 0; i < Math.max(flen, slen); i++){
      if(first[i] === second[i]){
        continue;
      }
      return first.slice(i + 1) === second.slice(i + 1);
    }
    return true;
  }else{
    for(let i = 0; i < Math.max(flen, slen); i++){
      if(first[i] === second[i]){
        continue;
      }
      return flen > slen ? first.slice(i + 1) === second.slice(i) : first.slice(i) === second.slice(i + 1);
    }
  }
};