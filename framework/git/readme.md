## git的一些常用操作

### 1. 关联本地git和github账号
1. 创建本地ssh key
```
$ ssh-keygen -t rsa -C "youremail@example.com"
```
2. 在c盘的用户(User)目录下找到```.ssh```中的```id_rsa.pub```文件，并上传到github上的ssh设置那里。

### 2. 初始化项目并推送到github上
```
git init
git add .
git commit -m "project init"
git remote add origin "yourgithubproject's link"
git push -u origin master
``` 