<!-- css.md -->
### 1. bfc
> bfc Block Formatting Context 块格式化上下文 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域

1. 产生条件：
    1. float不为none的浮动元素
    2. position为absolute或fixed的绝对定位元素
    3. 非块级盒子的块级容器（如inline-block,table-cell,table-caption）
    4. overflow不为visiable（默认值）的块级盒子，都会创建bfc

2. bfc的作用：
    1. 利用bfc避免外边距折叠
    2. 清除内部浮动（撑开高度），触发父级的bfc，使得子div都处于同一个bfc之内
    3. 避免文字环绕
    4. 多列布局中使用bfc

3. bfc的布局规则
    1. 内部的盒子回在垂直方向，一个接一个排列
    2. 属于同一个bfc的两个相邻盒子垂直方向的margin会发生重叠
    3. bfc是页面的一个隔离容器，容器内部的元素不会影响到外部的元素。
    4. bfc的区域不会与float box重叠
    5. 计算bfc的高度，浮动元素也参与计算

### 2. 三栏布局

#### 1. 圣杯布局
要求：三列布局，中间宽度自适应，两边内容定宽

优点：主要内容放置在最上方，优先渲染

原理：利用相对定位、浮动、负边距布局，而不添加额外标签

实现方式：

1. 最外面用```container```包裹，左右分别用```padding```流出左右块的宽度，三个块都使用```float: left```和```position: relative```，方便日后布局。
2. ```main```放在最前面，100%宽度占满（并不会占到padding部分的空间）
3. ```left```通过使用```margin-left: -100%```，就能够到达```main```的最左边并发生重叠，使用相对定位的```left: ${自己的宽度}```就可以实现在```main```的左边padding区域了。
4. ```right```通过使用```margin-right: ${自己的宽度}```，就能够到达```main```的最右边并发生重叠，使用相对定位的```right: ${自己的宽度}```就可以实现在```main```的右边padding区域了。

#### 2. 双飞翼布局
原理：主体元素```main-inner```使用```margin```预留两边位置，左右使用浮动和负边距归位。

区别：双飞翼由于没有最外边的```container```，所以不需要position调整位置，反而是多了```main-inner```这一层。


### 3. margin的负值
> 参考[深入理解CSS中的margin负值](https://www.cnblogs.com/xiaohuochai/p/5314289.html)


### 4. 水平垂直居中
> 公共部分样式
```
.wrapper{
  width:800px;
  height: 400px;
  margin: 20px auto;
  background-color: #eee;
}
.center{
  width: 100px;
  height: 100px;
  background-color: pink;
}
```
##### 一、固定宽高
绝对定位，top和left为50%， margin的left和top为本身宽高的一半
```
.wrapper{
  position: relative;
}
.center{
  position: absolute;
  top:50%;
  left:50%;
  margin-top:-50px;
  margin-left:-50px;
}
```
##### 二、不知道宽高
1. 使用CSS3 的 transform将位置在中心点平移自身宽高一半
```
.wrapper{
  position: relative;
}
.center{
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}
```
2. 使用flex
```
.wrapper{
  display:flex;
  justify-content:center;
  align-items:center;
}
```

### 5. 图片与文字同行时，图片下的空隙

img作为行级元素准寻base基线规则，会与底部有一定的空隙，只要使用```vertical-align: bottom```就可以对其底部。或者使用```display: block```，这样图片虽然会换行，但是没有间隙了。

### 6. 将css样式放在首部
把样式表放在文档底部的问题是它阻止了许多浏览器的逐步渲染，包括 IE。这些浏览器阻止渲染来避免在样式更改时需要重绘页面元素。所以用户会卡在白屏。

### 7. 把脚本放到底部

### 8. 使用外部JS和CSS
1. 使用外部js和css可以被浏览器缓存，同样可以减少http请求，因为不需要再请求资源了。
2. 使用内联js可以减少http请求，但增加了文本大小，每次都得下载。

如果网站用户每个会话打开了多个页面，许多页面重复使用相同的 JS 和CSS，那么有很大可能用外部 JS 和 CSS 更好。

### 9. 压缩JS和CSS
压缩就是删除代码中不必要的字符（如空格、换行、tab）。

### 10. 缓存访问过的元素的引用
用个变量存下来

### 11. 获得以下元素的第一个和最后一个

#### :nth-of-type() 与:nth-child()
> :nth-of-type() 是针对一组兄弟节点的第几个，倒序对应的还有```:nth-last-of-type()```
> :nth-child() 是指找出所有当前元素的兄弟元素（包括非同一类别的），然后按照位置先后顺序从一开始排列，也支持“n”的写法，倒序对应的还有```:nth-last-child()```
> 上面两个都是 **元素的第一个子元素的下标为 1**
```html
<div>
  <p>123</p>
  <span>xxx</span>
  <p>345</p>
  <p>567</p>
</div> 
```

```css
p:nth-of-type(1){ /* 第一个 */ }
p:nth-of-type(2n){ /* 偶数个 */ }
/* 👆对应的是345 */
p:nth-of-type(2n + 1){ /* 奇数个 */ }

p:nth-child(2n){ /* 偶数个 */ }
/* 👆对应的是567 ，因为span虽然是偶数个，但不是p*/
```

#### :first-child 和 :last-child
表示一组兄弟节点的第一个和最后一个 ，使用```:first-child```注意前面不能有兄弟节点，使用```:last-child```注意后面不能有兄弟节点

其实原理如同```:nth-child(1)```，相当于选中第一个元素，但第一个元素又不是自己这种类型的，显然出错

```html
<div>
  <p>123</p>
  <b>xxx</b>
  <p>456</p>
  <p>789</p>
</div>
```

> 下面是最经典的错误写法，由于第二个是b元素，而nth-child又是针对改元素的父元素下的所有元素进行统计，因此会失效。选中了b元素 但b元素又不是p元素，因此矛盾。

```css
p:nth-child(2){
  color: red;
}
```

### 12. link和@import的区别
1. link属于HTML范畴——除了加载CSS，还能支持其他事务，且在HTML页面加载的同时加载
2. @import属于CSS范畴——只能加载CSS，且需要页面网页全部载入以后加载
3. link支持使用Javascript控制DOM去改变样式
4. link是css2.1的，没有兼容问题
5. link还可以引入其他类型比如图片等资源文件，import只能引用样式文件

### 13. background的简写含义
#### 1. background的简写顺序分别是
> background 中包含的属性简写的时候与顺序无关，可选择其中的0个或1个
background: background-color || background-image || background-repeat || background-attachment || background-position
```css
{
  background: url('./test.jpg') center / contain no-repeat;
}
```
#### 2. 特殊的规则
> 上面说到的属性，含有某些特殊的规则
```css
/* 1. background-size只能紧跟在background-position后面 比如 center / contain */
{
  background: center / contain;
}
/* 👇等价于 */
{
  background-size: contain;
  background-position: center;
}
```

### 14. flex以及简写含义
> flex简写严格遵守顺序 flex-grow flex-shrink flex-basis

#### 1. flex-wrap
当使用flex的wrapper内的元素有宽度时候，如果需要弹性压缩，是否采用
```css
{
  display: flex;
  flex-wrap: no-wrap;/* 默认弹性布局不换行 */
}
```
#### 2. flex-grow
默认是flex简写的第一项
```css
{
  flex: 1
}
/* 👇等价于 */
{
  flex-grow: 1;
}
```
#### 3. flex-shrink
1. items大小相同时


flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 flex-shrink 的值。flex-shrink实际上表示了压缩时，各个内部方块的压缩比例，数值越大，压缩越大，相对来说宽或者高会更小。
```html
<div class="wrapper">
  <div class="inner1">1</div>
  <div class="inner2">2</div>
  <div class="inner2">3</div>
</div>
```
```css
/* wrapper */
{
  display: flex;
  width: 600px;
  height: 400px;
}
/* inner1 */
{
  width: 300px;
  height: 300px;
  flex-shrink: 2;
}
/* inner2 */
{
  width: 300px;
  height: 300px;
  flex-shrink: 1;
}
```
两个inner本来刚好是wrapper的宽度，多了一个**3**方块后，整个容器需要多压缩300px，计算内部的flex-shrink，总共为（300 / 4）px，flex-shrink为多少则压缩这个值的多少倍。

2. items大小不同时

不能根据第一点简单除以4计算，而要根据items的具体宽度
```css
/* wrapper */
{
  display: flex;
  width: 600px;
  height: 400px;
}
/* inner1 */
{
  width: 400px;
  height: 300px;
  flex-shrink: 2;
}
/* inner2 */
{
  width: 200px;
  height: 300px;
  flex-shrink: 1;
}
```
两个inner本来刚好是wrapper的宽度，多了一个**3**方块后，整个容器需要多压缩300px，计算内部的flex-shrink，**要同元素的具体宽度结合起来**，这个具体的宽度可以又简写的第三个参数**flex-basis**赋予
```
400 * 2 + 200 * 1 + 200 * 1 = 1200
方块1：300 * （400 * 2 / 1200）≈ 132
所以方块1最后的宽度是：400 - 132 = 264
方块2：300 * （200 * 1/ 1200）≈ 33
所以方块1最后的宽度是：200 - 33 = 167
```
#### 4. flex-basis(同上)

#### 5. 关于使用flex的父元素的可用空间的理解
父元素的margin、border、padding，还有子元素的margin、border、padding都会暂用可用空间的计算，计算的时候要减去这些数值，再根据flex-grow进行计算。

### 15. box-sizing
1. content-box: 默认样式
2. border-box: 边框和内边距的值是包含在width内的

### 16. animation
#### 1. animation-timing-function
这个动画会将本来是线性变化的动画转变成关键帧的形式展现
#### 2. animation-fill-mode
目标将保留由执行期间遇到的最后一个关键帧计算值
```css
a:hover{
  color: #fff;
  background: #730bec url(pixel2.png);
  background-size: 180px;
  transition-delay: 0.8s;
  animation: animate 0.8s steps(8) forwards;
}
@keyframes animate
{
  0%
  {
    background-position-y: 0px;
  }
  100%
  {
    background-position-y: -480px;
  }
}
```

### 17. text-transform: uppercase; 可以将字母变成大写的

### 18. -webkit-box-reflect: below 1px linear-gradient(transparent,#0001);


### 19. 单行溢出和多行溢出打点
```css
/* 单行 */
{
  overflow: hidden;
  text-overflow: ellipsis;
  /* 规定连续的空白符会被合并，但文本不进行换行👇 */
  white-space: nowrap; 
}
/* 多行 */
{
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
```

### 20. 纯css实现瀑布流
优点是不需要使用js，缺点是排列方式是每一列从上往下排，不能做到从左往右排列
```css
/* 核心代码 */
.waterfall_container {
  /* 分成几列 */
  column-count: 3;
  /* 列间距 */
  column-gap: 10px;
}
/* 不需要宽度 */
.waterfall_item {
  height: 100px;
  background-color: pink;
  margin-bottom: 10px;
  break-inside: avoid;
}
```

### 21. css变量
带有```--*```的表示css变量，可以通过```var(--*)```在全文档复用，var还可以使用第二个参数，表示变量的默认值。全局的属性可以写在```:root```上。

```css
:root {
  --Color: green;
}

#div {
  /* 绿色 */
  color: var(--Color);
}

#span {
  /* 红色 */
  color: var(--nothing, red);
}
```

### 22. 回流和重绘
> [回流和重绘](https://blog.csdn.net/KongKong_Rac/article/details/108883433)
浏览器渲染页面的过程
![image](https://github.com/AddJunZ/Front-End/blob/master/img/repaint-reflow.png)

减少回流和重绘的方法

1. 通过class来改变样式
2. 一直执行批量的dom操作

### 23. 样式的覆盖问题
以下最后会显示蓝色，因为读取样式是从上往下读，如果是同一权重的话，优先选择最下面的，而**跟元素的className的顺序无关**。
```html
<style>
  .green {
    background-color: green;
  }

  .red {
    background-color: red;
  }

  .blue {
    background-color: blue;
  }
</style>
<body>
  <div class="green blue red">
    hello world
  </div>
</body>
```