## shell

> [shell学习教程](https://edu.aliyun.com/lesson_155_1963#_1963)

### 0. 先看一个简单的shell程序
> vim example01.sh 创建并书写sh
```shell
#!/bin/bash
#This is to show what a example looks like.
echo "Our first example"
echo # This inserts an empty line in output.
echo "We are currently in the following directory."
pwd
echo
echo "This directory contains the following files"
ls
```

### 1. shell的基本语法-变量使用
#### 1. shell基本语法
1. ```#!/bin/bash``` #!根shell命令的完全路径.作用: 显示后期命令以哪种shell来执行这些命令。如果不指定shell，以当前的shell作为执行的shell

```shell
# sh 实际上是 bash 的软链接
ll /bin/sh ==> -rwxr-xr-x 1 asus 197121 1963639 12月  7  2018 /bin/sh*
ll /bin/bash ==> -rwxr-xr-x 1 asus 197121 1963639 12月  7  2018 /bin/bash*

```

2. ```#This is to show what a example looks like.``` shell中以#开头表示整行作为一个注释,执行时被忽略。

3. shell程序一般以```.sh```结尾

#### 2. 如何运行sh文件
1. 相对路径，直接在bash上输入```./example01.sh```，就会自动执行
2. 使用绝对路径，```/f/前端面试/Front-End-Interview/shell/test/example01.sh```
3. 使用bash，```bash example01.sh```

#### 3. shell变量(带$符号)
> 变量是shell传递数据的一种方法。变量是用来代表每个值的符号名

1. 临时变量：是shell程序内部定义的，其使用范围仅限于定义它的程序，其他程序不可见。

2. 永久变量：是环境变量，其值不随shell脚本的执行结束而消失。例如 **$PATH**，用作运行某个命令时候，本地查找不到某个命令文件，会到这个声明的目录中去查找。
```shell
echo $PATH
/c/Users/asus/bin:/mingw64/bin:/usr/local/bin:/usr/bin:/bin:/mingw64/bin:/usr/bin:/c/Users/asus/bin:/c/PROGRA~2/Borland/CBUILD~1/Bin:/c/PROGRA~2/Borland/CBUILD~1/Projects/Bpl:/c/Program Files (x86)/Common Files/Oracle/Java/javapath:/f/web/mysql-8.0.18-winx64/bin:/c/Program Files (x86)/Common Files/Intel/Shared Libraries/redist/intel64/compiler:/c/Program Files/Java/jdk-9.0.4/bin:/c/Program Files/Java/jre-9.0.4/bin:/d/tools:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/f/软件:%:YSTEMROOT%/System32/OpenSSH:/c/Program Files/NVIDIA Corporation/NVIDIA NvDLISR:/cmd:/c/WINDOWS/system32:/c/WINDOWS:/c/WINDOWS/System32/Wbem:/c/WINDOWS/System32/WindowsPowerShell/v1.0:/c/WINDOWS/System32/OpenSSH:/c/Program Files/Microsoft SQL Server/Client SDK/ODBC/130/Tools/Binn:/c/Program Files (x86)/Microsoft SQL Server/140/Tools/Binn:/c/Program Files/Microsoft SQL Server/140/Tools/Binn:/c/Program Files/Microsoft SQL Server/140/DTS/Binn:/c/Program Files (x86)/Microsoft SQL Server/150/DTS/Binn:/f/apache-tomcat-8.5.55/lib:/c/Users/asus/AppData/Roaming/nvm:/c/Program Files/nodejs:/d/node:/d/cmder:/c/Users/asus/AppData/Local/Programs/Python/Python37/Scripts:/c/Users/asus/AppData/Local/Programs/Python/Python37:/c/Users/asus/AppData/Local/Programs/Python/Python36/Scripts:/c/Users/asus/AppData/Local/Programs/Python/Python36:/c/Users/asus/AppData/Local/Microsoft/WindowsApps:/e/MongoDB/Server/4.0/bin:/c/Program Files/Java/jdk-12.0.2/bin:/c/Users/asus/AppData/Roaming/npm:/d/AddJunZ/Microsoft VS Code/bin:/d/apache-tomcat-8.5.59/bi:/d/apache-tomcat-8.5.59/lib":/c/Users/asus/AppData/Roaming/nvm:/c/Program Files/nodejs:/usr/bin/vendor_perl:/usr/bin/core_perl
```

3. 用户定义变量：由字母或下划线打头。由字母、数字或下划线组成，并且大小写字母意义不同。变量名长度没有限制。

4. 使用变量值时，要在变量名前加上前缀"$"。

5. 变量赋值，"=" 两边应没有空格。例如：
```shell
A=aaa
A = aaa # bash: A: command not found
```
6. 将一个命令的执行结果赋值给变量；如果是命令，则输出的该变量相当于输出对应命令的返回结果
```shell
# 例1
date # 2020年12月17日 22:30:00
A=`date`
echo $A # 2020年12月17日 22:30:11

# 例2
B=$(ls -l) # 这里也有$符号噢！！
echo $B # total 1 -rwxr-xr-x 1 asus 197121 240 12月 17 22:06 example01.sh
```