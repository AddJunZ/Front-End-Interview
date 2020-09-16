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
// 1. 创建一个获得深度的函数
// 其中同时判断是否为平衡树 不是的话返回-1 是的话返回深度
var getDepth = function(t) {
  if(t === null){
    return 0;
  }
  let leftDepth = getDepth(t.left), rightDepth = getDepth(t.right);
  if(leftDepth === -1 || rightDepth === -1 || Math.abs(leftDepth - rightDepth) > 1)return -1;
  else return Math.max(leftDepth + 1, rightDepth + 1);
}
var isBalanced = function(root) {
  return getDepth(root) != -1;
};

// 2. 换一种写法
// getDepth只是做单纯的获取深度函数
// 不做平衡的合理性校验
// 逻辑都在isBalanced中识别
// 没有上一种快
var dfsGetDepth = function(t){
  if(!t){
    return 0;
  }
  return 1 + Math.max(dfsGetDepth(t.left), dfsGetDepth(t.right));
}
var isBalanced = function(root){
  if(!root){
    return true;
  }
  if(Math.abs(dfsGetDepth(root.left) - dfsGetDepth(root.right)) > 1){
    return false
  }
  return isBalanced(root.left) && isBalanced(root.right);
}