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
主要不同在于HTMLCollection是元素集合而NodeList是节点集合（即可以包含元素，也可以包含文本节点）。所以 node.childNodes 返回 NodeList，而 node.children 和 node.getElementsByXXX 返回 HTMLCollection
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

> 判断是否到达底部：elem.scrollHeight >= elem.clientHeight + elem.scrollTop;

### 7. DOMContentLoaded与load的区别

> load：当整个页面及所有依赖资源如样式表和图片都已完成加载时，将触发load事件。

> DOMContentLoaded: 当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载。

```js
区别：
window.addEventListener('DOMContentLoaded', function(){
  start = window.performance.now();
  console.log('DOMContentLoaded', start);
})
window.addEventListener('load', function(){
  let cha = window.performance.now() - start;
  console.log('load', cha);
})

// DOMContentLoaded 18.424999998387648
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

### 12. IntersectionObserver
提供一种异步观察目标元素与其祖先元素或者顶级文档视窗（viewport）交叉状态的方法。祖先元素与视窗（viewport）称为根（root）
> 由于是新的API，需要引入polyfill方案```intersection-observer```包

```js
const loadMore = function() {
  console.log('loadMore');// fetch data, and reload view due to vm's data change.
};
const observer = new IntersectionObserver(function(entries) {
  // intersectionRatio 为 0 表示不在视图窗口内
  if (entries[0].intersectionRatio <= 0) return;
  // 在窗口内
  loadMore();
});
const bottom = document.querySelector('#bottom');
observer.observe(bottom);

// 常用接口
/**
 * 1. observer.observe(dom) 监听某个元素
 * 2. observer.unobserve(dom) 取消某个元素的监听
 * 3. observer.disconnect() observer停止监听工作
*/

```

### 13. 自定义标签
> [custom elements](https://developer.mozilla.org/zh-CN/docs/Web/Web_Components/Using_custom_elements)
自定义的标签必须要使用```-```间隔开
```js
// 基于HTML原生input实现类似el-input的功能
// 实现类似<el-input v-model="" placeholder=">
```

### 14. Element.attachShadow
创建一个空的虚拟节点，效果相当于是React的Fragment，可以appendChild等。。

### 15. encodeURIComponent和encodeURI
> [encodeURIComponent和encodeURI](https://juejin.cn/post/6914294180294426632)
encodeURI 自身无法产生能适用于HTTP GET 或 POST 请求的URI，例如对于 XMLHTTPRequests, 因为 "&", "+", 和 "=" 不会被编码，然而在 GET 和 POST 请求中它们是特殊字符。然而```encodeURIComponent```这个方法会对这些字符编码。
```js
const uri = 'http://www.baidu.com';
console.log(encodeURI(uri)); // http://www.baidu.com
console.log(encodeURIComponent(uri)); // http%3A%2F%2Fwww.baidu.com
```

### 16. [Preload，Prefetch 和 Preconnect？](https://juejin.cn/post/6844903646996480007)

- preload: 不会阻塞页面的onload，preload 指令允许预加载在 CSS 和JavaScript 中定义的资源，并允许决定何时应用每个资源。
- prefetch: 允许浏览器在后台（空闲时）获取将来可能用得到的资源，并且将他们存储在浏览器的缓存中。一旦一个页面加载完毕就会开始下载其他的资源，然后当用户点击了一个带有 prefetched 的连接，它将可以立刻从缓存中加载内容。有三种不同的 prefetch 的类型，```link```，```DNS``` 和 ```prerendering```
- prerendering: Prerendering 和 prefetching 非常相似，它们都优化了可能导航到的下一页上的资源的加载，区别是 prerendering 在**后台渲染了整个页面**，整个页面所有的资源
- preconnect: 允许浏览器在一个 HTTP 请求正式发给服务器前预先执行一些操作，这包括 DNS 解析，TLS 协商，TCP 握手，这消除了往返延迟并为用户节省了时间。

![image](https://github.com/AddJunZ/Front-End/blob/master/img/preconnect.jpg)


### 17. onvisibilitychange
```js
document.onvisibilitychange = function(event) {
  console.log("Visibility of page has changed!");
  var hidden = event.target.webkitHidden;
  if (hidden){
    // 页面隐藏，对应触发：音频视频播放暂停，轮训暂停
  } else {
    // 页面显示，对应触发：音频视频播放继续，轮训继续
  }
};
```

### 18. [Web Cache、H5 AppCache、SW Cache的区别](https://blog.csdn.net/u010875425/article/details/50037963)
1. Web Cache：是指资源的缓存策略，包括强缓存和协商缓存那一套。
2. AppCache：基本废弃。。
3. SW Cache：Google的dev tools中的Application中有一项是Cache的，其中就包含了SW的Cache。

### 19. 用户操作对浏览器的缓存的影响
用户操作 | 强缓存(Expires/Cache-Control) | 协商缓存(Last-Modified/Etag)
--- | --- | ---
地址栏回车 | 有效 | 有效
页面链接跳转 | 有效 | 有效
新开窗口 | 有效 | 有效
前进、后退 | 有效 | 有效
正常重新加载(command + R) | 无效 | 有效
硬性重新加载(command + shift + R) | 无效 | 无效