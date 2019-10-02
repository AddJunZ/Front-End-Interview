<!-- setTimeout与setInterval.md -->
## setTimeout
> setTimeout是隔一段时间把任务丢进队列里
```js
// 0ms是实现不到的，最低为4ms
setTimeout(function() {},0)
```

## setInterval
> setInterval是每隔一段时间把任务丢进队列里，如果任务队列中有任务残留，则不会继续推进任务
1. 标准中，setInterval()如果前一次代码没有执行完，则会跳过此次代码的执行。
2. 浏览器中，setInterval()如果前一次代码没有执行完，不会跳过此次代码，而是将其插在队列中，等待前一次代码执行完后立即执行。
3. Node中，setInterval()会严格按照间隔时间执行：一直等待完成上一次代码函数后，再经过时间间隔，才会进行下一次调用。

## setTimeout实现setInterval
```js
let fn = () => {
  console.log('fn')
}
let timer = 2000;
function mySetInterval(fn,timer){
  mySetInterval._timer = setTimeout(() => {
    fn.call(this)
    mySetInterval(fn,timer)
  },timer)
}
mySetInterval.clear = function() {
  clearTimeout(this._timer);
}
mySetInterval(fn,timer);
```