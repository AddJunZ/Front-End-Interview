<!-- 你不知道的JS.md -->
## 你不知道的JS

### 浏览器线程
> js引擎线程和GUI线程是互斥的，js运行UI冻结
1. js引擎线程（解释执行js代码、用户输入、网络请求）
2. GUI线程（绘制用户界面、于js主线程是互斥的）
3. http网络请求线程（处理用户的get、poet等请求，等返回结果后将回调函数推入任务队列）
4. 定时触发器线程（setTimeout、setInterval等时间结束后，把执行函数推入任务队列中）
5. 浏览器事件处理线程（将click、mouse等交互事件发生后将这些事件放入事件队列中）

### JS执行机制
> js是单线程并且允许异步执行
同步和异步任务分开执行，同步任务进入主线程，异步任务进入Event Table注册函数，当指定任务被完成时，异步任务进入Event Queue。当主线程任务为空，回去查看Event Queue读取函数，并将已有的事件队列中的函数**全都**放在主线程中执行，该过程不断循环，便是Event Loop（事件循环）
![image](https://github.com/AddJunZ/Front-End/blob/master/img/js-work.png)




