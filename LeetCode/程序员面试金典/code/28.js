// 合法二叉搜索树
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
// 二叉树要求左树的所有节点都比根节点小 右树的所有节点都比根节点大
// 不仅仅是判断根节点的左右节点噢
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
// 1. 二叉搜索树的中序遍历序列是严格递增的
// 使用一个数组存储中序遍历得到的节点，判断数组与排序后的数组是否相同
var isValidBST = function(root) {
  let arr = [];
  function inorderDfs(r){
    if(!r)return ;
    inorderDfs(r.left);
    // 中序遍历 记录遍历节点
    arr.push(r.val);
    inorderDfs(r.right);
  }
  inorderDfs(root);
  // 对比排序前和后
  return arr.toString() === [...new Set(arr.sort((a,b) => a - b))].toString();
};

// 2. 其实在遍历的时候我们就知道
// 使用一个checkBST函数，在遍历的是否就判断是否合理
// 保证每个节点在允许范围内(最小, 最大)。
// 首先，这个范围是无限的
// 当我们遍历左边，最小的是负无穷大，最大的是root.value
var isValidBST = function(root) {
  let small = -Infinity, big = Infinity;
  function checkBST(r, s, b){
    if(!r)return true;
    // 节点要在规定范围内，不满足直接返回
    if(r.val >= b || r.val <= s)return false;
    // 校验左右子树 左树的最大值和右树的最小值都是r.val
    return checkBST(r.left, s, r.val) && checkBST(r.right, r.val, b);
  }
  return checkBST(root, small, big);
}