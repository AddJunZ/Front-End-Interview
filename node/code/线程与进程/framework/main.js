const fork = require('child_process').fork;
const cpus = require('os').cpus();

const server = require('net').createServer();
server.listen(3000);
// 父进程 名
process.title = 'node-master';

// 所有子进程
const workers = {};
const createWorker = () => {
  // 每个进程都是同一任务？ 可以是不同任务？
  const worker = fork('./worker.js');
  // message.act 是自定义格式
  worker.on('message', message => {
    if (message.act === 'suicide') {
      createWorker();
    }
  })

  // exit 和 close的区别？ 效果一样 exit包含code
  worker.on('exit', (code, signal) => {
    console.log(`worker process exited, code: ${code} signal: ${signal}`);
    delete workers[worker.pid];
  })
  worker.send('server', server);
  workers[worker.pid] = worker;
  console.log(`worker process created, pid: ${worker.pid}, ppid: ${process.pid}`);
}

for (let i = 0; i < cpus.length; i++) {
  // 每个核都创建一个进程
  createWorker();
}

// 进程退出
function close (code) {
  console.log('进程退出！', code);
  if (code !== 0) {
    for (const pid in workers) {
      console.log('master process exited, kill worker pid: ', pid);
      workers[pid].kill('SIGINT');
    }
  }
  process.exit(0);
}

// 父进程监听signal
process.once('SIGINT', close.bind(this, 'SIGINT'));
process.once('SIGQUIT', close.bind(this, 'SIGQUIT'));
process.once('SIGTERM', close.bind(this, 'SIGTERM'));
process.once('exit', close.bind(this));
