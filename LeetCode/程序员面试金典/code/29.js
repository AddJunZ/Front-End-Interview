// 后继者
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
 * @return {TreeNode}
 */
var inorderSuccessor = function(root, p) {
  let bool = false;
  function inorderDFS(r){
    if(!r)return ;
    inorderDFS(r.left);
    if(bool){
      return r;
    }
    if(r === p){
      bool = true
    }
    inorderDFS(r.right);
  }
  inorderDFS(root);
  return null;
};