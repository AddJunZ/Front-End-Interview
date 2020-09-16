// 特定深度节点链表
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */

// 1. 这是广度遍历吗，感觉自己写的乱七八糟的
var listOfDepth = function(tree) {
  // result存储结果, arr作为每一层的节点暂时存放的位置
  let result = [], arr = [tree];
  while(arr.length > 0){
    let t = [], head = new ListNode(null), p = head;
    // 遍历每一层(arr)的节点，同时生成下一层的数据放在t中
    for(let i = 0; i < arr.length; i++){
      p.next = new ListNode(arr[i].val);
      p = p.next;
      if(arr[i].left)t.push(arr[i].left)
      if(arr[i].right)t.push(arr[i].right)
    }
    result.push(head.next);
    // 更新下一层的数据为arr
    arr = t;
  }
  return result
}

// 2. 针对自己写的方法1进行分析
// 为什么自己需要创建一个临时变量t来存储下一层数组呢
// 因为我们这里使用了for循环，里面时刻堆arr的长度重新计算
// 因此不能直接push到arr中
// 使用一个变量t代表长度 就可以省O(n)的空间了
var listOfDepth = function(tree) {
  // result存储结果, arr作为每一层的节点暂时存放的位置
  let result = [], arr = [tree];
  while(arr.length > 0){
    let t = arr.length, head = new ListNode(null), p = head;
    // 遍历每一层(arr)的节点，同时生成下一层的数据放在t中
    while(t--){
      let frontNode = arr.shift();
      p.next = new ListNode(frontNode.val);
      p = p.next;
      if(frontNode.left)arr.push(frontNode.left)
      if(frontNode.right)arr.push(frontNode.right)
    }
    result.push(head.next);
  }
  return result
}