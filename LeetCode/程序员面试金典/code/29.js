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
// 1. 要找中序遍历的p的下一节点，用一个布尔值记录p变量是否访问过
// 访问过后得到的第一个节点就是下一个中序遍历节点了
// 这里还要利用搜索树这个条件
var inorderSuccessor = function(root, p) {
  if(root == null || p == null)return null;
  if(p.val >= root.val){
    return inorderSuccessor(root.right, p);
  }else{
    let left = inorderSuccessor(root.left, p);
    return left ? left : root;
  }
}

// 2. 那如果是普通的树呢
// 使用栈存储中序遍历的节点，然后取目标节点的下一节点

// 3. 二叉树的中序遍历
// 可以使用一个栈，保存父节点，
var inorderSuccessor = function(root, p) {
  const stack = [];
  let prev; // 遍历的上一个节点的值
  while(root != null || stack.length > 0){
    // 收集父亲节点
    while(root != null){
      stack.push(root);
      root = root.left;
    }
    // 取出最尾端的那个“父节点”
    root = stack.pop();
    // 第一个“父节点”其实是根节点的，
    // 刚好匹配prev为空的默认情况
    if(prev === p.val){
      return root;
    }
    prev = root.val;
    // **此时root是左子树最低端的节点**
    // **访问右节点，没有就新一轮循环返回上层父亲节点**
    root = root.right;
  }
  return null;
}