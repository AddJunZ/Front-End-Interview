## Dom的一些基本操作

### 1. 获得dom的子元素
```js
const dom = document.querySelector('#dom');
console.log(dom.children); // HTMLCollection
console.log(dom.childNodes); // NodeList (包括文本)
```