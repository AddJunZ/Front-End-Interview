/**
 * @param {string} astr
 * @return {boolean}
 */
// 位运算
var isUnique = function(astr) {
  let mark = 0;
  for(let letter of astr){
    let move_bite = letter.charCodeAt() - 'a'.charCodeAt();
    if((mark & (1 << move_bite)) != 0){
      return false;
    }else{
      mark |= (1 << move_bite);
    }
  }
  return true;
};
console.log(isUnique('leetcode'));

// 位运算，兼容所有ascll码
var isUnique = function(astr) {
  let mark = 0n;
  for(let letter of astr){
    let move_bite = letter.charCodeAt() - 'a'.charCodeAt();
    if((mark & (1n << BigInt(move_bite))) !== 0n){
      return false;
    }else{
      mark |= 1n << BigInt(move_bite);
    }
  }
  return true;
};
console.log(isUnique('leetcode'));

// note: 位运算优先级低于等于和不等于