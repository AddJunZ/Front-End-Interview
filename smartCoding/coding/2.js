// 2

// 实现一个函数`countLongest(tree)`
// 输入一棵二叉树，返回二叉树中距离最长的两个叶子节点之间的距离

class ListNode {
  constructor(val = undefined, left = null ,right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const tree = new ListNode(1);


function countLongest(tree) {
  return getDeep(tree.left) + getDeep(tree.right);
}

function getDeep(tree) {
  if(tree == null) {
    return 0;
  }
  return Math.max(getDeep(tree.left), getDeep(tree.right)) + 1;
}