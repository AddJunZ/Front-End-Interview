// 给定一个长度为n的整数数组 a，实现一个算法，计算出从 a 中选择出多个不相邻元素组成最大的和是多少。

// input:  [1, 4, 5, 3]
// output: 7

// input:  [12, 3, 6, 1, 2, 4]
// output: 22

// 经典打家劫舍问题
function getSum(arr){
  const len = arr.length;
  if(len === 0)return 0;
  if(len === 1)return arr[0];
  const dp = [0, arr[0]];
  for(let i = 2; i <= len; i++){
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i - 1]);
  }
  return dp[len];
}
console.log(getSum([12, 3, 6, 1, 2, 4]));