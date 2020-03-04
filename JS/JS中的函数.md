<!-- JS中的函数.md -->
## JS中的函数
### 函数作为对象
函数作为对象的时候可以为函数添加方法
```js
function fn(){
  var author = 'AddJunZ';
  console.log(author);
}
fn.author  //undefined
```

### 函数作为构造器
```js
function fn(){
  this.author = 'AddJunZ';
}
let boke = new fn();
boke.author;  //"AddJunZ"
```

### 箭头函数

### 箭头函数与普通函数的区别
1. 格式上：箭头函数相当于简写的匿名函数
2. 参数上：没有自己的this，arguments，super，new.target

> new.target属性允许你检测函数或构造方法是否是通过new运算符被调用的

3. 作用上：不能作为匿名函数

### 什么时候用箭头函数
1. 当你在对象原型上定义的方法，该方法内部的回调函数需要用到对象的属性时，将回调写成箭头函数能方便访问，参考元素拖拽。
