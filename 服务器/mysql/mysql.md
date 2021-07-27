## mysql

### 0. 基本操作


### 1. mysql的基本架构
基本架构主要由两部分构成。第一部分是Server层，主要是由于连接器（管理连接，权限验证）、分析器（词法分析，语法分析）、优化器（执行计划生成，索引选择）、执行器（操作引擎，返回结果）和缓存查询（命中则直接返回结果）构成的。第二部分是存储引擎（存储数据，提供读写接口）。

![image](https://github.com/AddJunZ/Front-End/blob/master/img/mysql-structure.png)

### 2. mysql的两个重要日志模块（redo log与bin log）
1. redo log: 针对mysql执行更新，并不是每次都会马上写入磁盘。MySQL里经常说到的WAL技术，WAL的全称是Write-Ahead Logging，它的关键点就是先写日志，再写磁盘。每当有一条记录需要更新，就会先写进redo log中同时修改内存，就算是完成更新了。等到适当的时候再将该操作记录更新到磁盘中。

2. bin log: Server层的执行器操作的。

3. 两者的不同: 
(1) redo log是InnoDB引擎特有的，而bin log是Mysql的Server提供的，对所有引擎都适用。
(2) redo log是物理日志，记录的是”在某个数据页做了什么修改“，而bin log是逻辑日志，主要记录了语句的原始逻辑。
(3) redo log是固定空间的，用完后会重新覆盖；而bin log是可以追加写入，直接选择下一个文件来继续写入。

### 3. 事务隔离
> mysql的默认隔离级别是RR(Repeatable Read)，[MySQL默认隔离级别为什么是RR](https://zhuanlan.zhihu.com/p/137879633)

1. 读未提交(Read Uncommitted): 一个事务【还未提交】，其他事务就能读取到该事务的变更
2. 读提交(Read Committed): 一个事务【提交之后】，其他事务才能读取到该事务到变更
3. 可重复读(Repeated Read): 一个事务执行过程中看到的数据，总是和事务【启动时候的数据】保持一致。其他事务同样得等到【该事务提交后】才能读取到变更
4. 串行化(Serializable): 对同一行记录，写和读都会加锁。后一个事务要等前一个事务执行完成才能开始。

### 4. 索引
索引的常用三种结构：哈希表、有序数组、搜索树

#### 1. 哈希表
适用于只有等值查找的情况，比如Memcached及其他一些NoSQL引擎。

#### 2. 有序数组
在等值查找和区间查找的性能都比较优秀。