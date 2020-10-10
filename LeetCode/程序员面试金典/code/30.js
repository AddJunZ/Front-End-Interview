// 首个共同祖先
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */

// 1. 题目表示存在，那么有三种情况
// 第一：p、q位于根节点的左右子树上
// 第二：p、q位于左子树或右子树上
// 第三：p、q其中一个就是根节点
var lowestCommonAncestor = function(root, p, q) {
  // 第三
  if(!root || root === p || root === q)return root;
  let left = lowestCommonAncestor(root.left, p, q);
  let right = lowestCommonAncestor(root.right, p, q);
  // 第一
  if(left && right)return root;
  // 第二
  return left ? left : right;
};