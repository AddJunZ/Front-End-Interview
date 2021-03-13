## js语言的一些小问题

### 1. 字符串无法通过下标修改
所以一般用操作字符串的方法替代，但好像有点麻烦。。。
```js
let t = '123';
t[0] = '4';
console.log(t); // 123 修改无效

const tail = t.slice(1);
console.log('4' + tail); // 423
```