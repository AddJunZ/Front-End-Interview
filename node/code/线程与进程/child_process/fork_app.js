const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
  if (req.url == '/compute') {
    const compute = fork('./fork_compute.js');
    compute.send('开启一个新的子进程');

    // 当子进程使用process.send() 发送消息时会触发 'message' 事件
    compute.on('message', sum => {
      res.end(`Sum is ${sum}`);
      // 父进程 得到相应后 主动 杀死子进程
      compute.kill();
    })

    // 子进程监听到一些错误消息退出
    compute.on('close', (code, signal) => {
      // signal => SIGTERM 终止进程
      console.log(`收到close事件，子进程收到信号${signal}而终止，退出码${code}`);
      compute.kill();
    })
  } else {
    res.end('ok');
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log(`server started at http://127.0.0.1:3000`, process.pid);
})
