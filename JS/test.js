var removeNthFromEnd = function (head, n) {
  var node = new ListNode(0);
  node.next = head;
  var fast = node;
  var slow = node;
  for (var i = 1; i <= n + 1; i++) {
    fast = fast.next
  }
  while (fast != null) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return node.next
};