## WeakMap

WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其**键**必须是**对象**，而值可以是任意的。

在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被**弱引用**所引用，则被认为是不可访问（或弱可访问）的，并因此**可能在任何时刻被回收**。


### 1. 强引用
虽然手动将obj释放，但map对obj存在强引用关系，所以这份内存依然无法释放
```js
let obj = { name: 'AddJunZ' };
const map = new Map();
map.set(obj, 'hello');
obj = null;
```

### 2. 弱引用
如果是弱引用的话，则会在下次垃圾回收机制执行时，这块内存就会被释放
```js
let obj = { name: 'AddJunZ' };
const map = new WeakMap();
map.set(obj, 'hello');
obj = null;
```