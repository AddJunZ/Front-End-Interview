#!/bin/bash

# 这个例子就不执行了。。

# auto backup mysql
# Define PATH 定义变量

BACKDIR=/data/backup/mysql/`date +%Y-%m-%d`
MYSQLDB=test
#MYSQLDB=webapp #要备份的数据名
#MYSQLPW=backup # mysql数据库密码
MYSQLUSR=root
#MYSQLUSR=backup
# must use root user run scripts 必须使用root用户运行，$UID为系统变量
if
  [ $UID -ne 0 ];then
  echo "This script must use the root user!!!"
  sleep 2
  exit 0
fi

#Define DIR and mkdir DIR 判断目录是否存在，不存在则新建
if
  [ ! -d $BACKDIR ];then
  mkdir -p $BACKDIR
else
  echo "This is $BACKDIR exists..."
fi

#Use mysqldump backup mysql 使用mysqlump 备份数据库
/usr/bin/mysqldump -u$MYSQLUSR -d $MYSQLDB >$BACKDIR/webapp_db.sql

cd $BACKDIR ; tar -czf webapp_mysql_db.tar.gz *.sql
# 查找备份目录下.sql结尾的文件并删除
#find . -type f -name *.sql |xargs rm -rf
#或
find . -type f -name *.sql -exec rm -rf {} \;

#如果数据库备份成功，则打印成功，并删除备份目录30天以前的目录
[ $? -eq 0 ] && echo "This `date +%Y-%m-%d` MYSQL BACKUP is SUCCESS"
cd /data/backup/mysql/ ; find . -type d -mtime +30 | xargs rm -rf
echo "The mysql backup successfully"
