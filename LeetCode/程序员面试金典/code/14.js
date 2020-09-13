// 链表求和
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
// 1. 用一个变量记录进位，用一个新的链表存储结果
var addTwoNumbers = function(l1, l2) {
  let jinwei = 0;
  let newHead = new ListNode(null);
  let p = newHead;
  while(l1 && l2){
    let sum = l1.val + l2.val + jinwei;
    jinwei = sum >= 10 ? 1 : 0;
    sum = sum % 10;
    p.next = new ListNode(sum);
    p = p.next;
    l1 = l1.next;
    l2 = l2.next;
  }
  if(!l1 && !l2){
    if(jinwei){
      p.next = new ListNode(1);
    }
  }
  while(l2){
    let sum = l2.val + jinwei;
    jinwei = sum >= 10 ? 1 : 0;
    p.next = new ListNode(sum % 10);
    p = p.next;
    l2 = l2.next;
  }
  if(jinwei){
    p.next = new ListNode(1);
  }
  while(l1){
    let sum = l1.val + jinwei;
    jinwei = sum >= 10 ? 1 : 0;
    p.next = new ListNode(sum % 10);
    p = p.next;
    l1 = l1.next;
  }
  if(jinwei){
    p.next = new ListNode(1);
  }
  return newHead.next;
};

// 2. 直接将结果放在其中一个链表中
