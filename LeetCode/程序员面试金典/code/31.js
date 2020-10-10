// 二叉搜索树序列
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
// 1. 回溯
// 类同：1593. 拆分字符串使唯一子字符串的数目最大
// 使用一个queue存储所有可能的节点
// 利用while循环每次都添加一个元素
// 递归直到queue为空，将对应的结果添加进res
var BSTSequences = function(root) {
  if(!root)return [[]];
  let res = [];
  function backTrack(cur, q, path){
    // q 中存放了候选节点
    if(cur.left)q.push(cur.left);
    if(cur.right)q.push(cur.right);
    if(!q.length){
      res.push(path.slice());
      return ;
    }
    let len = q.length;
    // 把q中的节点都遍历一次
    while(len--){
      let cur = q.shift();
      backTrack(cur, q.slice(), [...path, cur.val]);
      // 回归
      q.push(cur);
    }
  }
  backTrack(root, [], [root.val]);
  return res;
};