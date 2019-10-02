<!-- 手写call和apply.md -->
## 手写call和apply
### call
```js
Function.prototype.myCall = function(ctx,...args) {
  ctx.fn = this;
  var result = ctx.fn(...args)
  delete ctx.fn;
}
```

### apply
```js
Function.prototype.myApply = function(ctx,argsArr) {
  ctx.fn = this;
  var result = ctx.fn(...argsArr);
  delete ctx.fn;
}
```