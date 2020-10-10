// 检查子树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} t1
 * @param {TreeNode} t2
 * @return {boolean}
 */
// 1. 使用递归，如果根节点相同，则对比各自的左右子树是否相同
// 如果根节点不同，则继续查找t1的左右子树和t2是否相同

// 判断两个数是否是相同结构的
var sameTree = function(m, n){
  // 如果都是空 则是一样的
  if(m == null && n == null)return true;
  // 如果都非空且值相同，则可以继续检验子树是否也相等
  if(m && n && m.val === n.val){
    return sameTree(m.left, n.left) && sameTree(m.right, n.right);
  }else{
    // 其中一个为空或者 值不相等则代表树不相同
    return false;
  }
}
// 校验t2是不是t1的子树
var checkSubTree = function(t1, t2) {
  if(t1 == null)return false;
  if(t1.val === t2.val){
    // 如果值相等则继续判断后面的子树结构是否相等
    return sameTree(t1.left, t2.left) && sameTree(t1.right, t2.right);
  }else{
    // 否则继续检查t1的子树结构中是否包含t2
    return checkSubTree(t1.left, t2) || checkSubTree(t1.right, t2);
  }
};