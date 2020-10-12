// 配对交换
/**
 * @param {number} num
 * @return {number}
 */
var exchangeBits = function(num) {
  // 0xaaaaaaaa === 0b101010101010101010
  // 通过下面操作可以获得num的偶数位并且右移一位
  let even = (num & 0xaaaaaaaa) >> 1;
  // 0xaaaaaaaa === 0b010101010101010101
  // 同理
  let odd = (num & 0x55555555) << 1;
  // 偶数奇数位置重合
  return even | odd;
};