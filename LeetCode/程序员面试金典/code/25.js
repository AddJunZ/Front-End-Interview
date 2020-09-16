// 最小高度树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
// 二叉搜索树（又称二叉查找树、二叉排序树）
// 要么是一棵空树
// 要么具有以下性质：左子树上所有节点的值小于根节点，右子树上所有节点的值大于根节点
// 且左、右子树也均为二叉搜索树

// 1. 由于数组排好序
// 通过找到数组的中间节点作为树的根
// 递归遍历左右子树
// 最后返回根节点 就可以了
var sortedArrayToBST = function(nums) {
  // 尝试用递归
  // 首先找到头节点
  if(nums.length === 0)return null;
  let midIndex = Math.floor(nums.length / 2);
  let top = new TreeNode(nums[midIndex]);
  top.left = sortedArrayToBST(nums.slice(0, midIndex));
  top.right = sortedArrayToBST(nums.slice(midIndex + 1, nums.length));
  return top;
};