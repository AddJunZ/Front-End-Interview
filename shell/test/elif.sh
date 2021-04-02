#!/bin/bash
# 测试文件类型

echo "input a file name:"
read file_name

if [ -d $file_name ] ; then
	echo " $file_name is a dir"
elif [ -f $file_name ] ; then
	echo " $file_name is file"
elif [ -c $file_name -o -b $file_name ]; then
	echo " $file_name is a device file"
else
	echo " $file_name is an unknow file "
fi

# 终端测试
# /etc => /etc is a dir
# /etc/passwd => /etc/passwd is a file
# /dev/stdin => /dev/stdin is a device file
# /etc/aaa => /etc/aaa is an unknow file