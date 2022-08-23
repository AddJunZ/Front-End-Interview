## 1. 基本操作
```shell
mkdir -pv /a/b/c # 递归创建(p)并查看(v)文件夹
mkdir -pv ./test/{dir1,dir2} # 递归创建两个文件夹，（中间不能加空格）
cp -r dir/file1 ./aim/dir # 复制文件到指定位置
mv <pre path> <next path> # 移动文件/改名
cat <your file> # 查看你的文件内容
ls -l > log # 重定向，将前面操作符的内容写进特定的文件内
# vim
（1）使用i进入编辑模式，适应esc推出编辑模式
yy # 复制
p # 粘贴
dd #删除
u # 撤销
:set nu # 查看行号
（2）使用v进入可视化模式，可选取特定内容，可视化模式下复制只需要一个y，删除只需要一个d。
（3）光标定位：hjkl表示左下上右，0 $表示行首行尾，gg G表示页首页尾，3G进入第三行，/string（n N 可以循环的）查找还可按n选择下一个
```

## 2. 用户管理
1. 用户和组
```shell
$ cat /etc/passwd
# root:*:0:0:System Administrator:/var/root:/bin/sh
# <用户名>:X:uid:gid:描述:HOME:shell
```
（1）用户名：登录系统的名字；（2）X：密码占位符，具体内容不在这里；（3）uid：用户的身份证号。0:特权用户；1～499系统用户；1000+普通用户。（4）gid：组id。（5）描述。（6）登录系统时所在的目录（7）登录shell，命令解释器