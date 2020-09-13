### 性能优化相关

#### 1. RAIL规则
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