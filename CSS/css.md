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


