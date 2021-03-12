const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/plan'
  })
  res.end(`I am worker, pid: ${process.pid}, ppid: ${process.ppid} `);
  throw new Error('worker process exception!'); // 测试异常进程退出、重启
})

// 子进程的全局worker
// 是由父进程通过send传过来的？
let worker;
process.title = 'node-worker';

// 这里 回调函数 的参数
// 都是父进程的 send 的参数
process.on('message', (message, sendHandle) => {
  if (message === 'server') {
    worker = sendHandle;
    worker.on('connection', socket => {
      server.emit('connection', socket);
    })
  }
})

process.on('uncaughtException', err => {
  console.log(err);
  process.send({
    act: 'suicide'
  })
  worker.close(() => {
    process.exit(1);
  })
})

