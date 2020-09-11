// 分割链表
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
// 1. 交换值，设置双指针，p的左边都是小于x的节点，q去遍历链表（其实我觉得这个有点像快排的partition）
var partition = function(head, x) {
  let p = head, q = head;
  while(q){
    if(q.val < x){
      [q.val, p.val] = [p.val, q.val]
      p = p.next
    }
    q = q.next
  }
  return head;
};

// 2. 头插法，遍历链表，将小于x的节点放置到链表的最前面
var partition = function(head, x) {
  if(!head || !head.next)return head;
  // 可以不用newHead，只是每次添加到头部的时候，重新定义head的指向为新的头节点就可以了
  let newHead = new ListNode(null);
  newHead.next = head;
  // 第一个节点可以忽略
  let pre = head, now = head.next;
  while(now){
    if(now.val < x){
      pre.next = now.next;
      now.next = newHead.next;
      newHead.next = now;
      now = pre.next;
    }else{
      pre = pre.next;
      now = now.next;
    }
  }
  return newHead.next;
};

// 3. 尾插法，添加至末尾的节点可以先用一个临时链表存储起来，这样子可以避免成环，也方便计算
var partition = function(head, x) {
  if(!head || !head.next)return head;
  let tempP = new ListNode(null);
  let tempHead = tempP;
  let newHead = new ListNode(null);
  newHead.next = head;
  let pre = newHead;
  let now = head;
  while(now){
    if(now.val >= x){
      pre.next = now.next;
      tempP.next = now;
      tempP = tempP.next;
      now.next = null;
      now = pre.next;
    }else{
      now = now.next;
      pre = pre.next;
    }
  }
  pre.next = tempHead.next;
  return newHead.next;
};