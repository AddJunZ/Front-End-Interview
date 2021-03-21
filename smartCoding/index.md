## js语言的一些小问题

### 1. 字符串无法通过下标修改
所以一般用操作字符串的方法替代，但好像有点麻烦。。。
```js
let t = '123';
t[0] = '4';
console.log(t); // 123 修改无效

const tail = t.slice(1);
console.log('4' + tail); // 423
```

### 2. valueOf和toString
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

### 3. 多数累加
> 
```js

```