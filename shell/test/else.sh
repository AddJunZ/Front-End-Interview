#!/bin/bash
# test -x file # 是否可执行
if [ -x /etc/passwd ] ; then
	/bin/ls
else
	pwd
fi
