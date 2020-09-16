// 检测平衡性
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */

var checkheight = function(root){
  return Math.max(checkheight(root.left), checkheight(root.right));
}
var isBalanced = function(root) {
  if(!root)return true;
  return isBalanced(root.left) && isBalanced(root.right);
};