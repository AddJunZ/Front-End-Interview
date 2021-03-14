<!-- 你不知道的JS.md -->
## 你不知道的JS

### 浏览器进程
> 标准一个tab对应一个进程。
1. Browser进程：浏览器的主进程，主要负责浏览器的交互，打开关闭页面、前进后退，网站资源下载等。将渲染结果展示给用户
2. 插件进程：每个浏览器插件对应一个进程
3. GPU进程：用于3D绘制等，最多只有一个

### 浏览器线程
> js引擎线程和GUI线程是互斥的，js运行UI冻结
1. js引擎线程（解释执行js代码、用户输入、网络请求）
2. GUI线程（绘制用户界面、与js主线程是互斥的）
3. http网络请求线程（处理用户的get、poet等请求，等返回结果后将回调函数推入任务队列）
4. 定时触发器线程（setTimeout、setInterval等时间结束后，把执行函数推入任务队列中）
5. 浏览器事件处理线程（将click、mouse等交互事件发生后将这些事件放入事件队列中）

### JS执行机制
> js是单线程并且允许异步执行
同步和异步任务分开执行，同步任务进入主线程，异步任务进入Event Table注册函数，当指定任务被完成时，异步任务进入Event Queue。当主线程任务为空，回去查看Event Queue读取函数，并将已有的事件队列中的函数**全都**放在主线程中执行，该过程不断循环，便是Event Loop（事件循环）
![image](https://github.com/AddJunZ/Front-End/blob/master/img/js-work.png)

### 惰性函数
> 惰性函数是防止我们对一些只需要判断一次的条件进行多次不必要的判断。
```js
// 创建一个兼容的函数，根据对addEventListener的支持选择特定的函数，每次都需要再判断一次。处理方式：第一次做出判断的同时，改变函数的内容，使之不再进行判断。
function addEvent(dom,type,handler) {
  if(dom.addEventListener){
    dom.addEventListener(type,handler,false);
    addEvent = function(dom,type,handler) {
      dom.addEventListener(type,handler,false);
    }
  }else{
    dom.attachEvent('on' + type,handler);
    addEvent = function(dom,type,handler) {
      dom.attachEvent('on' + type,handler,false);
    }
  }
}
addEvent();
```

### 组合函数
三种书写方式，组合函数的目的是，制造f(g(x))的这种多次处理形式的函数
```js
function compose1() {
  let args = [].slice.call(arguments);
  let len = arguments.length - 1;
  return function(x) {
    let result = args[len](x);
    while(len--){
      result = args[len](result);
    }
    return result;
  }
}
function compose2() {
  let args = [].slice.call(arguments);
  return function(x) {
    return args.reduce((acc,curr)=>curr(acc),x)
  }
}
// 浓缩版
const compose3 = (...args) => x => args.reduce((acc,curr)=>curr(acc),x);
const reverse = x => x.split('').reverse().join('');
const split = str => str.split('');
const toUpperCase = x => x.toUpperCase();
var fn = compose3(reverse, toUpperCase, split);
console.log(fn('time'))
//["E", "M", "I", "T"]
```
