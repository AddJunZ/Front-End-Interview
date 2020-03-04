```js
// 导出构造函数
try {
  module.exports = Promise
} catch (e) { }

function Promise(executor) {
  var self = this;
  self.status = 'pending'; // 当前状态
  self.data = undefined; // 当前数据
  self.onResolvedCallback = []; // 成功回调
  self.onRejectedCallback = []; // 失败回调

  function resolve(value) {
    if (value instanceof Promise) { // 如果是promise则直接依赖后面的promise的状态
      return value.then(resolve, reject);
    }
    setTimeout(function () { // 异步调用，promise的标准要求的
      if (self.status === 'pending') {
        self.status = 'resolved'; // 更新状态
        self.data = value; // 更新数据
        for (let i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value); // promise可能有多组回调
        }
      }
    })
  }

  function reject(reason) {
    setTimeout(function () {
      if (self.status === 'pending') {
        self.status = 'rejected';
        self.data = reason;
        for (let i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason);
        }
      }
    })
  }

  try {
    executor(resolve, reject);
  } catch (reason) {
    reject(reason);
  }
}


function resolvePromise(promise2, x, resolve, reject) {
  var then = undefined
  var thenCalledOrThrow = false

  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }

  // 外层promise依赖内层的promise
  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }

  // 
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then;
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true;
          return resolvePromise(promise2, y, resolve, reject);
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true;
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true;
      return reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2 = undefined;

  // then后的参数做穿透处理
  onResolved = typeof onResolved === 'function' ? onResolved : function (value) { return value }
  onRejected = typeof onRejected === 'function' ? onRejected : function (reason) { throw reason }

  if (self.status === 'resolved') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () { // 异步调用
        try {
          var x = onResolved(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      })
    })
  }

  if (self.status === 'rejected') {
    return promise2 = new Promise(function (resolve, reject) {
      setTimeout(function () {
        try {
          var x = onRejected(self.data);
          resolvePromise(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason);
        }
      })
    })
  }

  // 不能确定状态，将回调函数分别存在对应的数组中等待调用
  // 这里不需要异步调用，因为最终都会调用resolve或reject函数，其中已经是异步调用了
  if (self.status === 'pending') {
    return promise2 = new Promise(function (resolve, reject) {
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(value);
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(reason);
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
}




Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
}

Promise.deferred = Promise.defer = function () {
  var dfd = {}
  dfd.promise = new Promise(function (resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
```
