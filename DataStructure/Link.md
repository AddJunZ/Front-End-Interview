<!-- Link.md -->
### JS实现链表
构造函数生成本节点和下一个节点的引用。
```js
class LinkNode{
  constructor(node,next = null){
    this.node = node;
    this.next = next;    
  }
}
let str = 'ABCD';
let Link = temp = new LinkNode(null);
str.split('').map(x => {
  temp.next = new LinkNode(x);
  temp = temp.next;
})
Link = Link.next;
console.log(Link);
```
