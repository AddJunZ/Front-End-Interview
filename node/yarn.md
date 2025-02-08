## yarn

### 1. 如何知道`yarn link`后的全局命令，该命令由哪个本地文件link的
假设yarn link仓库后，仓库注册的bin是`mmc`

- `which mmc`: 可以查看bin的注册位置。本身`which`更注重于查找全局可执行文件，即在`PATH`中定义好的命令
```shell
/usr/local/bin/mmc
```
- `whereis mmc`: 可以查看bin的注册位置。本身`whereis`用于查找命令的二进制文件、源代码文件和手册页的路径。应该说`whereis`包含了`which`
```shell
mmc: /usr/local/bin/mmc
```
- `realpath /usr/local/bin/mmc`: 可以查找二进制文件的实际路径
```shell
/Users/jiajun.zheng/Desktop/projects/multi-module-cli/bin/index.js
```