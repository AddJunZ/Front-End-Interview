## koa

> ```application.js```是```koa```的入口，主要目标是创建服务。
> ```context.js```是```ctx```上下文对象文件
> ```request.js```是对```req```对象进行处理的文件
> ```response.js```是对```res```进行处理的文件

### 1. koa的洋葱模型
> 如何让中间件以洋葱模型的方式运行，就是```koa-compose```的实现的功能，其中主要是**递归调用中间件函数**，每层递归使用promise封装，从而实现外层会等内层执行完成再执行接下来的操作，也就算洋葱模型了。

一般koa调用中间件是这样的
```js
const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
  console.log('enter first middleware');
  await next();
  console.log('out first middleware');
});

app.use(async (ctx, next) => {
  console.log('enter second middleware');
  await next();
  console.log('out second middleware');
});

// 输出如下
/**
 * enter first middleware
 * enter second middleware
 * out second middleware
 * out first middleware
 * / 
```

![image](https://github.com/AddJunZ/Front-End/blob/master/img/koa-compose.png)

> [koa源码](https://juejin.im/post/6844903559364870151)

重点是```next```函数做了什么，next实际上就是一个触发上一个函数的resolve方法的一个节点，想要制造出洋葱模型的效果，可以使用promise递归的写法
