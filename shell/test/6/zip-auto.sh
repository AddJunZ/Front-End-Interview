#!/bin/bash
#auto zip package
#Define Path

#####test######
# mkdir -p /root/shell/test1 /root/shell/test2
# cd /root/shell/test1; zip passwd.zip /etc/passwd

######test#####
PATH1=/root/shell/test1
PATH2=/root/shell/test2
#Print welcome info

cat <<EOF
++-----------------------------------------++
++----welcome to use auto zip scripts------++
++-----------------------------------------++
EOF

#Find Dir all ZIP packages 查找目录PATH1下所有的zip包，并创建解压目录PATH2

cd $PATH1
# awk -F . 指定输入文件分隔符
for i in `find . -name "*.zip"|awk -F . '{print $2}' `
do
  unzip -o .$i.zip -d $PATH2$i
done