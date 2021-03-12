const http = require('http');
const numCPUs = require('os').cpus().length;
console.log('numCPUs', numCPUs);
const cluster = require('cluster');

// cluster模块一个主进程只能管理一组工作进程
if (cluster.isMaster) {
  console.log('Master process is ', process.pid);
  // fork workers
  for (let i = 0; i < numCPUs; i++) {
    // 根据你指定的数量复制出多个子进程
    // numCPUs 会被打印8次（核数）
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log('worder process died, id ', worker.process.pid);
  })
} else {
  // worker可以共享同一个TCP连接
  // 这里是一个http服务器
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world');
  }).listen(8000);
}

// 多个node进程不能监听同一个端口
// 但master进程内部启动一个tcp服务器，真正监听端口
// 当来自前端的请求触发服务器的connection事件后
// master会将对应的socket具柄发送给子进程