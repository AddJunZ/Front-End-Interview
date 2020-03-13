<!-- css.md -->
### bfc
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


### margin的负值
> 参考[深入理解CSS中的margin负值](https://www.cnblogs.com/xiaohuochai/p/5314289.html)


### 水平垂直居中
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

### 图片与文字同行是，图片下的空隙

img作为行级元素准寻base基线规则，会与底部有一定的空隙，只要使用```vertical-align: bottom```就可以对其底部。或者使用```display: block```，这样图片虽然会换行，但是没有间隙了。

### 将css样式放在首部
把样式表放在文档底部的问题是它阻止了许多浏览器的逐步渲染，包括 IE。这些浏览器阻止渲染来避免在样式更改时需要重绘页面元素。所以用户会卡在白屏。

### 把脚本放到底部

### 使用外部JS和CSS
1. 使用外部js和css可以被浏览器缓存，同样可以减少http请求，因为不需要再请求资源了。
2. 使用内联js可以减少http请求，但增加了文本大小，每次都得下载。

如果网站用户每个会话打开了多个页面，许多页面重复使用相同的 JS 和CSS，那么有很大可能用外部 JS 和 CSS 更好。

### 压缩JS和CSS
压缩就是删除代码中不必要的字符（如空格、换行、tab）。

### 缓存访问过的元素的引用
用个变量存下来