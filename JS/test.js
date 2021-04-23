/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }
  const m = grid.length, n = grid[0].length;
  // 1. dp[i][j] 表示从左上角出发到 (i,j) 位置的最小路径和
  const dp = new Array(m).fill(0).map(x => new Array(n).fill(0));
  // 2. 起点
  dp[0][0] = grid[0][0];
  // 3. 初始化左边缘和上边缘的 “路径和”
  // 先是每一行的第一列
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }
  // 然后是每一列的第一行
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i - 1] + grid[0][i];
  }
  // 4. 动态规划核心
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }
  return dp[m - 1][n - 1];
};