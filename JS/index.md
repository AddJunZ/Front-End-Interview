## 琐碎的js知识

### 1. 自定义事件的创建和触发
```js
let event = new Event('build');
elem.addEventListener('build', function(e){ ... }, false)
elem.dispatchEvent(event);
```

### 2. addEventListener的第三个参数

DOM事件流包含3个阶段，分别是捕获阶段、目标阶段和冒泡阶段，第三个参数可以是options或者直接布尔值。布尔值表示是否在**捕获阶段触发事件**，默认会是false，即默认在冒泡阶段触发。

```html
<div id="a">
  <div id="b"></div>
</div>
```

```css
#a{
  width: 100px;
  height: 100px;
  background-color: pink;
}
#b{
  width: 50px;
  height: 50px;
  background-color: yellow;
}
```

![image](https://github.com/AddJunZ/Front-End-Interview/blob/master/img/dom-event.png)


实例代码
```js
let div1 = document.getElementById('a'); // 大div
let div2 = document.getElementById('b'); // 小div
div1.addEventListener('click', function(){
  console.log('big div')
}, true)
div2.addEventListener('click', function(){
  console.log('small div')
})
// big div 行为：点小div
// small div
```

关于第三个参数 上面的效果也可以写成这样
```js
div1.addEventListener('click', function(){
  console.log('big div')
}, {
  capture: true
})
```

第三个参数的配置
```js
{
  capture ==> 是否在捕获阶段触发
  once ==> 是否只触发一次
  passive ===> 表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
}
```



### 3. addEventListener和onClick的区别
1. addEventListener支持监听多个函数，重复挂载的监听函数（引用地址要一致）会去重，但需要第三个参数的```capture```（代表是否在捕获阶段触发的布尔值）要一致，否则会调用两次。onclick只允许在冒泡阶段触发，click 事件的运行顺序在 mousedown 和 mouseup 事件之后。。
```js
let fn = function(){
  console.log('big div')
}
let div1 = document.getElementById('a');
let div2 = document.getElementById('b');
div1.addEventListener('click', fn, {
  capture: true,
})

// 👇会去重
div1.addEventListener('click',fn, {
  capture: false,
})
div1.addEventListener('click',fn , {
  capture: false,
})
// 👆会去重

div2.addEventListener('click', function(){
  console.log('small div')
})
```

2. addEventListener对任何DOM都是有效的，而onclick仅限于HTML
3. onclick事件在同一时间只能指向唯一对象

### 4. e.target和e.currentTarget的区别
e.target每次都指向你触发事件对应的节点，但currentTarget则是绑定事件的节点
```js
div1.addEventListener('click', function(e){
  console.log('big div', e.target, e.currentTarget);
})
div2.addEventListener('click', function(e){
  console.log('small div', e.target, e.currentTarget);
})

点击小的div后，输出

small div    b节点 b节点
big div      b节点 a节点
```

### 5. 字符串无法通过下标修改
所以一般用操作字符串的方法替代，但好像有点麻烦。。。
```js
let t = '123';
t[0] = '4';
console.log(t); // 123 修改无效

const tail = t.slice(1);
console.log('4' + tail); // 423
```

### 6. valueOf和toString
> 非基本类型对象转化成基本类型会

1. valueOf
```js
var t = [], k = 123
t.valueOf = () => 123; // 更改valueOf方法
k == t // true

var t = {}, k = 123
t.valueOf = () => 123; // 更改valueOf方法
k == t // true
```

2. toString
```js
var m = {
  a: 123
};
var k = 123, n = {};
n.toString = () => 'a';
m[n] === 123 // true
```

3. a==1&&a==2&&a==3 为true，可重写valueOf实现；a===1&&a===2&&a===3 为true，可以通过拦截器
```js

// 1. a==1&&a==2&&a==3，会自动调用valueOf方法
a = {
  value: 1,
  valueOf: function(){
    console.log(this.value)
    return this.value++;
  }
}
console.log(a==1&&a==2&&a==3) // true

// 2. a===1&&a===2&&a===3
let value = 1;
Object.defineProperty(window, 'a', {
  get() {
    return value++;
  }
})
console.log(a===1&&a===2&&a===3) // true
```

### 7. Map()巧用generator
> 在看leetcode146答案的时候获得的启发，从下面例子可以看到keys的generator是跟推进的顺序有关的！！直接可以实现LRU的核心逻辑
```js
const map = new Map();
map.set('1','1');
map.set('2','2');
console.log(map.keys().next()); // { value: '1', done: false }
map.delete('1');
map.set('1','1');
console.log(map.keys().next()); // { value: '2', done: false }
console.log(map);               // Map(2) { '2' => '2', '1' => '1'}
```

![image](https://github.com/AddJunZ/Front-End/blob/master/img/map-generator.jpg)
