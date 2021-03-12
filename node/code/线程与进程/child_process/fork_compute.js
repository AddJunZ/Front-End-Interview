const computation = () => {
  let sum = 0;
  console.info('计算开始');
  console.time('计算耗时');

  for (let i = 0; i < 1e10; i++) {
    sum += 1;    
  }

  console.info('计算结束');
  console.timeEnd('计算耗时');
  return sum;
}

process.on('message', msg => {
  console.log(msg, 'process.pid', process.pid, process.ppid); // 子进程id 父进程id
  const sum = computation();

  // 如果node进程是通过进程通信产生
  // 那么 process.send() 方法可以用来给父进程发送消息
  process.send(sum);
})