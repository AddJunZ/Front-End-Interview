// 移除重复节点
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
// 1. 使用一个字符的二进制来记录出现过的字符，从而进行过滤操作
var removeDuplicateNodes = function(head) {
  if(!head)return null;
  let map = 1n << BigInt(head.val);
  let pre = head;
  let p = head.next;
  while (p) {
    if(pre.val === p.val || (map & (1n << BigInt(p.val)) > 0n)){
      pre.next = p.next;
    }
    map |= (1n << BigInt(p.val));
    pre = p;
    p = p.next;
  }
  return head;
};

// 2. 其实有时候位数太多，也会占用很多空间的


//3. 不使用额外空间？

