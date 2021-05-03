/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const res = [];
  const now = [];
  const dfs = curr => {
    if(curr === nums.length){
      res.push(now.slice());
      return ;
    }
    now.push(nums[curr]);
    // 1. 添加当前字符后递归
    dfs(curr + 1);
    now.pop();
    // 2. 不添加当前字符递归
    dfs(curr + 1);
  }
  dfs(0);
  return res;
};