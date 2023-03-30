## 常用的linux命令
### 1. ps
```ps```的全称是```Process Status```，表示进程状态，可获得当前进程的状态、时间等信息，ps有五种状态

* R (TASK_RUNNING): 可执行
* S (TASK_INTERRUPTIBLE): 可中断的睡眠状态
* D (TASK_UNINTERRUPTIBLE): 不可中断的睡眠状态
* T (TASK_STOPPED or TASK_TRACED): 暂停状态或者跟踪状态
* Z (TASK_DEAD-EXIT_ZOMBIE): 退出状态

> ps不加参数表示当前终端中运行的进程

```bash
ps -a # 展示所有终端的进程
ps -e # 同a
ps -f # 全格式展示进程信息
ps -c # 显示进程的真实名字
ps -x # 显示所有进程无论是否运行在终端
```

### 2. systemctl
```systemctl```是linux用来管理系统的一个程序，```systemctl daemon-reload```重载所有修改过的配置文件，```systemctl enable <service>```开机自启动某个服务

```shell
# 以redis为例子
systemctl enable redis # 开机自启动redis
systemctl start redis
systemctl stop redis
systemctl restart redis
systemctl status redis
```