/**
 * @param {number} n
 * @return {number}
 */
var store = {};
var climbStairs = function (n) {
  if(store[n])return store[n];
  if (n <= 2) return n;
  const sum = climbStairs(n - 1) + climbStairs(n - 2);
  store[n] = sum;
  return sum;
};