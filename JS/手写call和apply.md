<!-- 手写call和apply.md -->
## 手写call和apply
### call
```js
// call
var obj = {a:123,b:456};

function test(x, y){
	console.log(this.a,this.b);
	return x + y;
}
console.log(test.call(obj,1,2));

// 如果一个函数是某个对象的属性，通过对象的点运算符，this绑定成该对象
Function.prototype.myCall = function(ctx,...args){
	if(typeof this !== 'function'){
		throw new Error('It is not a function');
	}

	// 要绑定上的对象
	ctx = ctx || window;
	// 将函数作为对象的属性
	ctx.fn = this;
	// 执行结果返回
	var result = ctx.fn(...args);
	delete ctx.fn;
	return result;
}

console.log(test.myCall(obj,1,2));
```

### apply
```js
// apply
var obj = {a:123,b:456};

function test(x, y){
	console.log(this.a,this.b);
	return x + y;
}
console.log(test.apply(obj,[1,2]));

// 如果一个函数是某个对象的属性，通过对象的点运算符，this绑定成该对象
Function.prototype.myApply = function(ctx,args){
	if(typeof this !== 'function'){
		throw new Error('It is not a function');
	}

	// 要绑定上的对象
	ctx = ctx || window;
	// 将函数作为对象的属性
	ctx.fn = this;
	// 执行结果返回
	var result = ctx.fn(...args);
	delete ctx.fn;
	return result;
}

console.log(test.myApply(obj,[1,2]));
```

### bind
```js
// bind
var obj = {a:123,b:456};
Function.prototype.myBind = function(ctx,...args){
	if(typeof this !== 'function'){
		throw new Error('It is not a function');
	}
	const that = this;
	return function fn(...args2){
		// 如果被new创建实例，不会改变上下文
		if(this instanceof fn){
			// 多次输入参数列表
			return new that(...args, ...args2);
		}
		return that.apply(ctx, args.concat(...args2));
	}
}
function test(x, y) {
  console.log('x,y', x, y);
  return this.a + this.b;
}
var test2 = test.myBind(obj,1);
console.log(test2(2));
// x,y 1 2
// 579
```
