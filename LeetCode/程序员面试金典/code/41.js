// 三步问题
/**
 * @param {number} n
 * @return {number}
 */
var waysToStep = function(n) {
  let MOD = 1000000007;
  // 结束条件
  if(n <= 2)return n;
  if(n === 3)return 4;// 1 1 1, 1 2, 2 1, 3 
  let dp = [1, 2, 4];
  // dp
  for(let i = 3; i < n; i++){
    dp[i] = (dp[i - 1] + dp[i - 2] + dp[i - 3]) % MOD
  }
  return dp[n - 1];
};