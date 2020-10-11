// 求和路径
// 区别参考：剑指 Offer 34. 二叉树中和为某一值的路径
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number}
 */
// 1. 双递归做法
// 从某节点开始计算所有路径的函数
var helper = function(root, sum){
  if(!root)return 0;
  return +(root.val === sum) + helper(root.left, sum-root.val) + helper(root.right, sum-root.val);
};
// 从root树查找求和为sum的所有路径的函数
var pathSum = function(root, sum) {
  if(!root)return 0;
  return helper(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum);
};

// 2. 前缀和
// 主要是利用了二叉树遍历只会从上到下
// 使用一个空间来存储每个节点对应的根节点到本节点的路径和
var pathSum = function(root, sum) {
  let map = new Map();
  // 代表和为0的路径有一条 即是初始值
  map.set(0, 1);
  // 根节点 总和 当前总和 前缀表
  function dfs(node, map, currSum){
    if(node == null)return 0;
    let res = 0;
    // 当前节点计入当前节点的前缀和中
    currSum += node.val;
    res += map.get(currSum - sum) || 0;
    // 当前路径和为
    map.set(currSum, (map.get(currSum) || 0) + 1);
    res += dfs(node.left, map, currSum);
    res += dfs(node.right, map, currSum);
    map.set(currSum, map.get(currSum) - 1);
    return res;
  }
  return dfs(root, map, 0);
}