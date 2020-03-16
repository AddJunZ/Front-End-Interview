<!-- 基础.md -->
# HTML基础部分
### 1. Doctype作用，标准模式与兼容模式的区别
<!DOCTYPE>声明在HTML文档的第一行，告诉浏览器的解析器用什么文档标准解析文档。


### 2. 获得有两个class名的节点
```
<div class="a"></div>
<div class="a"></div>
<div class="a b">共有两个类</div>
<div class="b"></div>
<div class="b"></div>

var common = document.getElementsByClassName('a b');
```

### 3. HTMLCollection与NodeList
```

```	

### 4. html、css、js的下载和执行顺序
1. 


### 5. requestAnimationFrame
1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来，再一次重绘或者回流中就完成，并且重回或回流的时间间隔紧紧跟随浏览器的刷新帧率
2. 在隐藏或不可见的元素中，requestAnimationFrame讲不会进行重绘或回流，这当然就以为着更少的CPU、GPU和内存使用量
3. requestAnimationFrame是由浏览器专门为动画提供的API，在运行时浏览器会自动优化方法的调用，并且如果页面不是激活状态下的话，动画会自动暂停
4. 它返回一个整数，表示定时器的编号，这个值可以传递给cancelAnimationFrame用于取消这个函数的执行
```js
// requestAnimationFrame实现setInterval定时器
function mySetInterval(callback) {
  return requestAnimationFrame(function () {
    callback && callback()
    mySetInterval(callback);
  })
}
```
5. 兼容性
```js

```
6. 大数据渲染（将后台几万条数据插入表格）