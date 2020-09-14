### 性能优化相关

#### 1. 浏览器页面的RAIL规则
1. Response 响应：处理事件应该在50ms以内完成
2. Animation 动画：每10ms产生一帧
3. Idle 空闲：尽可能增加空闲时间
4. Load 加载：在5s内完成内容加载并可以交互

> 性能测试工具 Chrome DevTools  Lighthouse  WebPageTest

#### 2. DCL, L, FP, FCP, FMP, LCP的含义

> 参考 [Chrome Devtool Performance中DCL, L, FP, FCP, FMP, LCP 的含义](https://juejin.im/post/6844904029936418824)

![image](https://github.com/AddJunZ/Front-End/blob/master/img/chrome-devtools-dashboard.png)


##### 1. DCL, L
DCL(DOMContentLoaded)表示HTML加载完成的事件，L(onLoaded)表示页面所有资源都记载完成的事件。具体在network面板最下面可以看到两者需要的时间。

##### 2. Navigation Timing API
W3C在**Navigation Timing API**中定义了一系列页面事件，其中包括fetchStart，DOMContentLoaded，Load等事件。

![image](https://github.com/AddJunZ/Front-End/blob/master/img/page-reload.png)

##### 3. FP, FCP, FMP, LCP

> 1. 发生了吗？

1. FP(First Paint)：页面在导航后首次呈现出不同于导航前内容的时间点
2. FCP(First Contentful Paint)：首次绘制任何文本，图像，非空白canvas或SVG时间点

> FP和FCP可能是相同的时间，也可能FP先于FCP。下图展示了 FP 和 FCP 的区别。

```js
window.performance.getEntriesByType('paint');
```

![image](https://github.com/AddJunZ/Front-End/blob/master/img/performance-paint.png)

> 2. 它有用吗？

1. FMP(First Meaningful Paint)：首次绘制页面“主要内容”的时间点

FMP是由Google工程师引入的一种现代性能指标，本质是通过算法计算某个时间点页面是“有用”的。

2. LCP(Largest Contentful Paint)：可视区域“内容”最大的可见元素开始出现在页面上的时间点

FMP算法负责且不精确，因此出现了**查看页面何时渲染最大元素**的方法。

> 3. 它可以使用吗？

1. TTI(Time To Interactive)：何时可以自由相应用户交互

**重新刷新页面的整个过程**

![image](https://github.com/AddJunZ/Front-End/blob/master/img/performance-lifecycle.png)


#### 3. 影响回流的操作
1. 添加，删除元素
2. 操作styles
3. display:none
4. offsetLeft, scrollTop, clientWidth
5. 移动元素位置
6. 修改浏览器大小，字体大小

#### 4. layout thrashing 布局抖动

> fastdom 

1. 避免回流
2. 读写分离

#### 5. 常见的计算方法

DNS 解析耗时: domainLookupEnd - domainLookupStart

TCP 连接耗时: connectEnd - connectStart

SSL 安全连接耗时: connectEnd - secureConnectionStart

网络请求耗时 (TTFB): responseStart - requestStart

数据传输耗时: responseEnd - responseStart

DOM 解析耗时: domInteractive - responseEnd

资源加载耗时: loadEventStart - domContentLoadedEventEnd

First Byte时间: responseStart - domainLookupStart

白屏时间: responseEnd - fetchStart

首次可交互时间: domInteractive - fetchStart

DOM Ready 时间: domContentLoadEventEnd - fetchStart

页面完全加载时间: loadEventStart - fetchStart

http 头部大小： transferSize - encodedBodySize

重定向次数：performance.navigation.redirectCount

重定向耗时: redirectEnd - redirectStart

#### 6. 



