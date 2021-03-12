## node的进程与线程

[深入理解Node.js 中的进程与线程](https://juejin.cn/post/6844903908385488903)


### 1. cluster与child_process的区别
1. cluster一只主进程只能管理一组相同的工作进程，本质是主进程创建了一个TCP服务器
2. child_process操作子进程时，能控制多组进程，本质是可以隐式创建多个TCP服务器

### 2. IPC
> Inter-Process Communication 进程间通信

### 3. 进程的exit和close的区别
1. exit()是退出应用程序
2. close()只是关闭窗体

### 4. 关于node是单线程的理解
Node中最核心的就是 v8 引擎，在Node启动后，会创建v8的实例，这个实例是多线程的。

- 主线程：编译、执行代码 **一般说的node是单线程，只是js的执行是单线程的**
- 编译/优化线程：在主线程执行的时候，可以优化代码
- 分析器线程：记录分析代码运行时间，为 Crankshaft 优化代码执行提供依据
- 垃圾回收的几个线程



