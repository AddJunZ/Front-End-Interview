// 删除中间节点
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
// 1. 题目竟然给的是想删除的那个节点。。。直接移位
var deleteNode = function(node) {
  let next = node.next;
  if(next){
    node.val = next.val;
    node.next = next.next; 
  }else{
    node = null;
  }
};