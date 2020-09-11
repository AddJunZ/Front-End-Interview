// 返回倒数第 k 个节点
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {number}
 */
// 1. 遍历第一遍获得链表长度，第二遍获得想要的节点
var kthToLast = function(head, k) {
  let p = head, len = 0;
  while(p){
    len++;
    p = p.next;
  }
  let index = len - k;
  let nowIndex = 0;
  p = head;
  while(p){
    if(nowIndex == index){
      return p.val;
    }
    nowIndex++;
    p = p.next;
  }
};

// 2. 能不能只遍历一次呢，快慢指针!!!好像也是
/**
 * 原理：使用快慢指针，求倒数第k个元素
 * 只需要将快指针比慢指针早走k格，之后再同步移动
 * 等到快指针到null时候，慢指针的位置为所求
*/
var kthToLast = function(head, k) {
  let fast = head;
  for(let i = 0; i < k; i++){
    fast = fast.next;
  }
  let slow = head;
  while(fast){
    fast = fast.next;
    slow = slow.next;
  }
  return slow.val;
};

// 3. 也可以用（栈/数组）存储节点，然后（pop出第几个/使用数组下标）就是倒数第几个元素