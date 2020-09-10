<!-- this.md -->
## this的使用
> 在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了

### 构造函数中使用this
```js
function Person(name,age) {
  this.name = name;
  this.age = age;
}
var person = new Person('AddJunZ',18);
console.log(person.name,'--',person.age); //AddJunZ -- 18
```
### 函数作为对象的某个属性
作为对象的一个属性，并且又原来对象调用时，函数中的this指向该对象
```js
var obj = {
  name:"AddJunZ",
  call:function(){
    console.log(this.name);
  }
}
obj.call(); //AddJunZ
```
如果把该对象的属性函数赋值给新的变量，则this重新指向window
```js
name = 'window';
var obj = {
  name:"AddJunZ",
  call:function(){
    console.log(this.name);
  }
}
var fn = obj.call;
fn(); //window
```
### 函数用call或apply调用
this的值绑定为传入的对象
```js
name = "window"
var obj = {
  name:"AddJunZ"
}
var fn = function(){
  console.log(this.name)
}
fn.call(obj); //AddJunZ
```
### 全局和普通函数
```js
console.log('1.',this);
var fn = function(){
  console.log('2.',this);
}
fn();
//1.window
//2.window
```
一些躲得很隐秘的普通函数，对象属性为立即执行函数
```js
name = "window"
var obj = {
  name:"AddJunZ",
  fn:(function(){
    console.log(123)
    console.log(this) //window
    return function(){
      console.log(456)
      console.log(this.name)
    }
  })()
}
//运行输出，123 window

//ex1.
obj.fn(); //AddJunZ
//ex2.
// var fn = obj.fn;
// fn(); //window
```

### 什么地方不能用箭头函数
1. 定义对象方法（最好使用es6简写的方法）
2. 定义原型方法
3. 事件的回调函数
4. 定义构造函数（constructor）

### 在监听事件中使不使用箭头函数，对this的影响
```js
div.addEventListener('click', function() {
  console.log('this', this) // dom节点
})
div.addEventListener('click', () => {
  console.log('this', this) // window对象
})
```
