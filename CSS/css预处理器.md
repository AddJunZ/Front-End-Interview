## css预处理器
> 常见的有less和sass，还有stylus

### 1. css的缺点
1. 语法不够强大，无法嵌套书写，在模块化开发中需要书写很多重复的选择器。
2. 没有变量和合理的复用机制，使得逻辑上相关的属性值必须以字面量的形式重复输出（重复写某些css样式），导致难以维护。

### 2. 预处理器存在的意义与缺点
1. 可有层次的书写css，减少冗余的css选择器(比如下面的.a的class选择器)
```css
/* 原生css */
.a{
  background-color: red;
}
.a .b{
  color: white;
}
/* 预处理器 */
.a{
  background-color: red;
  .b{
    color: white;
  }
}
```
2. 预编译很容易造成后代选择器的滥用

### 1. less在项目中的配置和使用
