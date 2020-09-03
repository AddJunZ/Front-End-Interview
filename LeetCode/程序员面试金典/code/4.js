/**
 * @param {string} s
 * @return {boolean}
 */

// 1. 使用map记录每个字母出现的次数，如果出现奇数的字母超过两个则不存在（这里同样可以像方法3一样通过delete，就不用再遍历一次了）
var canPermutePalindrome = function(s) {
  if(s.length < 2)return true;
  let map = {};
  for(let i = 0; i < s.length; i++){
    map[s[i]] = map[s[i]] ? map[s[i]] + 1 : 1;
  }
  let valueArr = Object.values(map);
  let OddCount = 0;
  for(let item of valueArr){
    if(item % 2 === 1){
      OddCount++;
    }
    if(OddCount > 1)return false;
  }
  return true;
};

// 2. 位运算，用一个数的每一位代表每个字母出现次数是否为奇数，最后将这个数转为二进制字符串，判断字符1是否出现两次
var canPermutePalindrome = function(s) {
  let map = 0n;
  for(let letter of s){
    let move_bite = letter.charCodeAt() - 'A'.charCodeAt();
    map ^= (1n << BigInt(move_bite));
  }
  let biteStr = map.toString(2);
  let arr = biteStr.split('1');
  if(arr.length > 2)return false;
  return true;
};
console.log(canPermutePalindrome("AaBb//a"));


//3. 使用set集合，当奇数次出现则添加，偶数次则删除，最后求集合set的大小，小于等于1为所求
var canPermutePalindrome = function(s) {
  let set = new Set();
  for(let letter of s){
    set.has(letter) ? set.delete(letter) : set.add(letter);
  }
  return set.size <= 1;
};