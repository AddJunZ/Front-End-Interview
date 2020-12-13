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

### 6. 位置字段的含义
1. clientX、clientY：点击位置距离当前body可视区域的x，y坐标
2. screenX、screenY：点击位置距离当前电脑屏幕的x，y位置
3. offsetLeft、offsetTop：相对于最近的祖先定位元素
4. clientLeft、clientTop：表示内容区域的左上角相对于整个元素左上角的位置（包括边框）
5. clientWidth、clientHeight：内容区域的宽高，不包括边框宽度值
6. scrollLeft、scrollTop：元素滚动的距离大小
7. scrollWidth、scrollHeight：整个内容区域的宽度（包括需要拉动滚动条隐藏起来的那部分）
8. pageX、pageY：对于整个页面来说，包括了被卷去的body部分的长度

### 7. DOMContentLoaded与load的区别

> load：当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件。

> domcontentloaded: 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。

```js
区别：
window.addEventListener('DOMContentLoaded', function(){
  start = window.performance.now();
  console.log('domcontentloaded', start);
})
window.addEventListener('load', function(){
  let cha = window.performance.now() - start;
  console.log('load', cha);
})

// domcontentloaded 18.424999998387648
// load 29.399999999441206
```

### 8. 手动写动画的最小时间间隔
显示器默认频率60hz,既美妙刷新60次，所以时间是1/60秒，即16.7ms

### 9. data-*
```js
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>John Doe
</div>

var el = document.querySelector('#user');

// el.id == 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''

el.dataset.dateOfBirth = '1960-10-03'; // set the DOB.

// 'someDataAttr' in el.dataset === false

el.dataset.someDataAttr = 'mydata';
// 'someDataAttr' in el.dataset === true
```

### 10. 前端路由
前端路由本质是检测url的变化，解析地址匹配路由规则。

#### 1. hash mode
同个在url后面的```#```，区分hash值。hash的变化不会导致轮流去发出请求，因此不会刷新页面。更新hash值会触发```hashChange```事件。这是最早期的路由实现，且不需要服务器支持。检测到hash变化，替换DOM来实现界面刷新。

#### 2. history mode
html5标准发布后，增加了```pushState```和```replaceState```两个API，同个这两个API可以改变url地址并且不发送请求。同时还有```onpopstate```事件。
history路由是真实的地址路径，后端需要同步配置访问文件，如果没有则会出现404，在webpack配置的```devServer.historyApiFallback```为true时，能够帮助我们把所有的路由地址访问重定向到根的index.html。

### 11. 同源与跨域
协议 主机 端口都相同才是同源。一个页面的源可以通过```document.domain```修改的。

