## 1. 基本操作
```shell
mkdir -pv /a/b/c # 递归创建(p)并查看(v)文件夹
mkdir -pv ./test/{dir1,dir2} # 递归创建两个文件夹，（中间不能加空格）
cp -r dir/file1 ./aim/dir # 复制文件到指定位置
mv <pre path> <next path> # 移动文件/改名
cat <file path> # 查看你的文件内容
head <-3> <file path> # 查看前几（3）行
tail <-3> <file path> # 查看后几（3）行
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
1. 用户基本信息文件
```shell
$ cat /etc/passwd
# root:*:0:0:System Administrator:/var/root:/bin/sh
# <用户名>:X:uid:gid:描述:HOME:shell
```
（1）用户名：登录系统的名字；（2）X：密码占位符，具体内容不在这里；（3）uid：用户的身份证号。0:特权用户；1～499系统用户；1000+普通用户。（4）gid：组id。（5）描述。（6）登录系统时所在的目录（7）登录shell，命令解释器
2. 用户密码信息文件 
```shell
$ cat /etc/shadow
# 
```
（1）用户名；（2）密码加密值；（3）最后一次修改时间，距离1970年1月1日过了多少天的天数；（4）最小间隔【0代表当天可以修改密码】；（5）密码最大时间间隔，99999代表无限期；（6）警告时间；（7）不活动时间【28，用户不登陆系统，超过28天就禁用】；（8）失效时间【30，到了30天，你的账号就不能用了】；（9）保留
3. 组信息文件
```shell
$ cat /etc/group
# nobody:*:-2:
# nogroup:*:-1:
# wheel:*:0:root <- 多留意这个
# daemon:*:1:root
# kmem:*:2:root
```
（1）组名；（2）组密码；（3）组ID；（4）组成员

4. 用户管理
* ```useradd <user name>``` 增加用户
* ```id <user name>``` 查看用户
* ```passwd <user name>``` 更新用户密码
* ```userdel -r <user name>``` 删除用户
* 将用户加入组
* ```usermod <配置参数> <参数>```修改用户属性

```shell
$ id AddJunZ
# uid=501(addjunz) gid=20(staff) .....
```

## 3. 组管理
可以将文件权限归纳到组内的维度，这样可以将用户加入或者删除组，以此来简易操作用户获得权限，这样就不需要用户对每个文件权限进行操作。

1. 组的基本操作
* ```groupadd <group name> -g <group id>``` 增加组
* ```cat /etc/group | grep <group name> ``` 查看组
* ```groupdel <group name>``` 删除组
* ```gpasswd -d <user name> <group name>``` 把用户从组中删除

2. 组的类别：组的类别是相对**用户**而言的，
* （1）基本组```-g```：随用户而创建，组名同用户名，基本组只有一个，附加组可以有多个
* （2）附加组```-G```：某用户加入到和自己不同名的组，那么这个组就叫这个用户的附加组

## 4. 提权
Switching users with su
* ```su - root``` 切换到root权限。普通用户没有特权，尽量少用root。
* ```sudo ``` 使用普通用户登录服务器时完全部分特权指令。

使用sudo提权的前提是在root权限下，已经允许该普通用户在不输入用户密码的情况下使用所有命令。

```shell
# vim /etc/sudoers
wheel ALL=(ALL) NOPASSWD:ALL

useradd <user-name> -G wheel
```

## 5. 权限
1. 基本权限UGO(User Group Other)

* 权限对象：（1）属主 u；（2）属组 g；（3）其它人 o；（4）特殊对象 a[u+g+o]，是一种统称。
* 权限类型：（1）读 r=4；（2）写 w=2；（3）执行 x=1。 

授权一般是采用赋值的方法，如：```U=5```就代表了同时拥有读和执行的权限，权限类型是用二进制做区分的。实际上是二进制位上的值代表特定的权限类型。

2. 设置权限

* 更改权限：```chmod <权限对象(u/g/o/a)><赋值符号(+/-/=)><权限类型(r/w/x)> <文件/目录>```，eg：```chmod u+r 1.txt```。```-R```命令参数一般用于文件夹。
* 更改属主、属组

```shell
# $ ll
-rw-r--r--    1    addjunz  staff    4.3K Dec 11 18:48 linux.md
 类型和权限    链接   属主     属组      大小  创建时间      文件名
 属主属组其他人
```
