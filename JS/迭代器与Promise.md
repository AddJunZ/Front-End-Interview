<!-- 迭代器.md -->
## 迭代器
### 传统迭代器
任何数据接口只要有```Iterator```接口就能完成遍历操作（由```for...of```操作），通过```Symbol.iterator```可访问迭代函数获得迭代器，迭代器有```value```和```done```属性。
```js
var arr = [1,2,3];
const iterator = arr[Symbol.iterator]();
iterator.next() //{value: 1, done: false}
```

利用```Symbol.iterator```属性对普通对象进行迭代
```js
var obj = {
  a:1,
  b:2,
  [Symbol.iterator](){
    const arr = Object.keys(this);
    let i = 0;
    return {
      next(){
        return{
          value:arr[i++],
          done:i == arr.length
        }
      }
    }
  }
}
const iterator = obj[Symbol.iterator]();
iterator.next();
```

使用```generator```简化
```js
var obj = {
  a:1,
  b:2,
  [Symbol.iterator]:function*() {
    for(let key in this){
      yield this[key]
    }
  }
}
const iterator = obj[Symbol.iterator]();
iterator.next();
```

### 迭代器的缺点
它不适合表示异步数据源

### 异步迭代器和异步迭代
它没有返回{value, done}形式的普通对象，而是返回一个Promise，其resolve返回{value, done}对象。一个可异步迭代对象中包含```Symbol.asyncIterator```属性（而不是```Symbol.iterator```），其功能为返回一个异步迭代器。
```js
var obj = {
  a:1,
  b:2,
  [Symbol.asyncIterator](){
    const values = Object.keys(this);
    let i = 0;
    return{
      next:()=>{
        console.log(this[values])
        return Promise.resolve({
          value:this[values[i++]],
          done:i > values.length
        })
      }
    }
  }
}
const iterator = obj[Symbol.asyncIterator]();
iterator.next().then(x=>console.log('x',x));
```

使用```generator```简化
```js
var obj = {
  a:1,
  b:2,
  [Symbol.asyncIterator]:async function*(){
    for(let key in this){
      yield this[key]
    }
  }
}

```

### 探究异步迭代实际应用
通过迭代实现异步操作
```js
//让异步操作的回调函数中实现迭代器的next操作
function getData(url){
  ajax(url,function(res){
    iterator.next(res);
  })
}

//迭代函数
function *main(){
  let data = yield getData('xxx');
  let information = yield getData(`yyy?id=${data}`);
}
//迭代器
var iterator = main();
iterator.next();
```

### Promise改进
```js
function getData(url){
  return new Promise(resolve,reject){
    ajax(url,function(err,data){
      if(err)reject(err);
      else resolve(data);
    })
  }
}
```