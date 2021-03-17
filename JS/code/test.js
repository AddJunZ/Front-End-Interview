function multiRequest(urls = [], maxNum) {
  // 总请求数
  const len = urls.length;
  // 请求结果数组
  const result = new Array(len).fill(false);
  // 当前完成的请求数，也是下一次发送请求的index，即urls[index]
  let count = 0;
  return new Promise((resolve, reject) => {
    // 1. 直接请求maxNum个异步请求
    while (count < maxNum) {
      next();
    }

    // 2. 发送一次异步请求
    function next() {
      // 3. 当前的异步任务序列
      const index = count++;
      // 4. 边界：完成所有任务
      if (index >= len) {
        !result.includes(false) && resolve(result);
        return ;
      }

      const url = urls[index];
      // 5. 请求接口，在每个请求结束后都可以继续请求下一个
      fetch(url)
        .then(res => {
          result[index] = res;
        })
        .catch(err => {
          result[index] = err;
        })
        .finally(() => {
          // 请求没有全部完成，递归
          if (index < len) {
            next();
          }
        })
    }
  })
}

multiRequest(['http://localhost:3000','http://localhost:3000','http://localhost:3000','http://localhost:3000','http://localhost:3000','http://localhost:3000','http://localhost:3000'], 3);