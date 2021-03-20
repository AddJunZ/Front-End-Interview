## requestIdleCallback 

> [requestIdleCallback](https://developer.mozilla.org/zh-CN/docs/Web/API/Background_Tasks_API)

浏览器屏幕默认的绘画帧是60Hz，就是16.7ms，在每一帧的绘制过程中，如果又多余的时间就会浪费掉，可以用来执行部分的js代码

requestIdleCallback会在帧结束时并且有空闲时间，或者用户不与网页交互时，执行回调。```window.requestIdleCallback()```允许浏览器告诉您的代码可以安全使用多少时间而不会导致系统延迟，从而有利于确保浏览器的事件循环平稳运行。


### 1. 与requestAnimationFrame的区别
requestIdleCallback实在空闲回调的时候触发的，此时所有布局的更新和计算都已经完成，如果改变会影响布局那么就需要用requestAnimationFrame

### 2. API简介
```js

```