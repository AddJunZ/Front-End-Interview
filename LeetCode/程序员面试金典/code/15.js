// 回文链表
// 你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 1. 通过**快慢指针**，根据奇偶个节点区分中间位置
// slow指针一遍遍历，一遍翻转链表，最后对 翻转后的链表 和 后半段链表进行比较
// 最后得出是否回文链表
var isPalindrome = function(head) {
  if(!head || !head.next)return true;
  let fast = slow = head;
  // 创建一个新链表节点，接收slow指针走过的链表节点并倒序
  let newSlowHead = new ListNode(null);
  while(fast && fast.next){
    let temp = slow;
    slow = slow.next;
    fast = fast.next.next;
    temp.next = newSlowHead.next;
    newSlowHead.next = temp;
  }
  let frontHead = newSlowHead.next, backHead;
  if(fast){ // 奇数个节点
    backHead = slow.next;
  }else{ // 偶数个节点
    backHead = slow;
  }
  while(backHead){
    if(backHead.val != frontHead.val){
      return false
    }
    backHead = backHead.next;
    frontHead = frontHead.next;
  }
  return true;
};

// 2. 当然也可以使用一个数组去存储所有的节点值，再用数组下标从两天向中间进行比较
// 这样就会使用到O(n)空间，但比较容易理解哈