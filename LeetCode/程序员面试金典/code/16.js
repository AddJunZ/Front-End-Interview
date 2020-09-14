// 链表相交
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
// 1. 这道题和leetcode52很像，先计算两个链表的长度，将长的链表先向前移动两者长度的差值
// 再将两个链表进行遍历，能访问到同一个链表节点就是共同节点
var getIntersectionNode = function(headA, headB) {
  let lenA = 0, lenB = 0, p = headA, q = headB;
  while(p){
    lenA++;
    p = p.next;
  }
  while(q){
    lenB++;
    q = q.next;
  }
  let dis = Math.abs(lenA - lenB);
  if(lenA > lenB){
    while(dis--){
      headA = headA.next;
    }
  }
  if(lenA < lenB){
    while(dis--){
      headB = headB.next;
    }
  }
  while(headA){
    if(headA == headB){
      return headA;
    }
    headA = headA.next;
    headB = headB.next;
  }
  return null;
};