// 环路检测
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

// 这种之前做过判断有无环 可以用快慢指针 再判断指向会不会重合
// 但这题需要知道环的起点
// 快指针实际上比慢指针多走了n次**环路部分**
// 假设链头到循环入口的距离为s，循环入口到相遇节点的距离为t，每个循环回路的长度为n
// 那么由快指针走的距离永远是慢指针的两倍，设置快指针走了x圈回路
// 那么有 s + x*n + t = (s + t) * 2;
// 即 s = x*n - t
// 设置两个新指针 一个在链头 一个在相遇点 速度都为1
// 等链头指针走了s到达循环入口节点 相遇点指针走了(x*n)并少了t，刚好就是退回了循环入口节点
// 因此两新指针相遇的节点为循环入口节点
var detectCycle = function(head) {
  if(!head || !head.next)return null;
  let fast = slow = head;
  while(fast && fast.next){
    slow = slow.next;
    fast = fast.next.next;
    if(fast == slow){
      fast = head;
      while(true){
        if(fast == slow){
          return fast;
        }
        fast = fast.next;
        slow = slow.next;
      }
    }
  }
  return null;
};