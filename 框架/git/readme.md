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

### 3. git stash
1. 这个操作主要是对此时的代码进行保存，可能是为了去更改线上的代码而存在的操作。
2. 当```git stash pop [stash名]```代码吐出来之后发生冲突了，代码既会继续在stash里面也会出现在当前的代码里，但会展示出stash被pop出来的冲突情况。
3. ```git stash list```，查看stash列表。
4. ```git stash save [你的提示]``` ，附带message的暂存，方便查看。
5. ```git stash clear```，清楚所有的stash信息
6. ```git stash apply [stash名]```，应用某个stash
7. stash的命名跟正常逻辑不一样，最新推入的叫```stash@{0}```，以此类推。
8. ```git stash --include-untracked```能将所有未跟踪的文件都stash进去，因为默认的stash命令是不会跟踪一些新创建的文件夹和文件的，默认会随着分支切换一起带出去，因此需要用这个命令保证stash了所有更改。
```
stash@{0}: On master: test3
stash@{1}: On master: test2
stash@{2}: On master: test
```

### 4. git revert 回退单次commit
1. 使用git revert <commit-hash>，便可以撤回单次commit操作
2. git revert B^..D，撤销[B,D]之间的所有commit记录。
```
假设commit记录为 A -> B -> C -> D
使用 git revert B^..D 后就会产生 A -> B -> C -> D -> D' -> C' -> B'这样带多个逆向操作的commit
```
3. 如果想要不产生三个逆向操作commit，而是只用一个commit表示三个逆向的总操作
```
假设commit记录为 A -> B -> C -> D
使用 git revert -n B^..D
再用 git commit -m "<your revert message>"即可
```

### 5. 回退到特定的commit位置
1. ```git reset --hard <commit-hash>```，将本地head切换到这个commit节点上
2. ```git push -f -u origin master```，将本地代码强行覆盖远程代码，此次操作同时会删除最新的commit记录
3. 试验过了，重置后，你本地的代码并不会回退，你撤回的代码在此时变成了未commit的代码变更记录，你可以选择使用vscode的源代码管理进行修改撤回。或者你直接新拉一个新仓库```git pull```。

### 6. 在错误分支上进行开发
1. 可以使用stash进行修改的迁移
2. 如果已经产生commit记录了，则如下
```
git log --oneline 先获取本次commit的hash
git cherry-pick <commit hash> 切到目标分支后将本次commit的修改merge到目标分支
git reset <commit hash> 切回错误分支，回退到之前版本
git checkout -- . 清空修改
```

### 7. git merge和git rebase的区别
1. 比如你要把dev的代码合并到master上，假设你在dev上有commit1和commit2，当你用merge的时候，master是不会用commit1和commit2的历史记录的。但是使用rebase则在master上会有两个commit的记录。

### 8. git默认不会提交空的文件夹
一般约定是在空的文件夹下创建一个```.gitkeep```文件。它不像```.gitignore```一样，并没有git带来的而外功能。仅仅是一种约定。

### 9. git简化命令工具基础命令
> [参考](https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/README.md)
```
ga - git add
gb - git branch
gcmsg - git commit -m
gco - git checkout
gl - git pull
gp - git push
gm - git merge
```

### 10. 对github/gitlab平台的tag的理解
> 我理解的是对某个版本的代码做一次暂时存储与记录，相比于commit纬度会更大一点，而tag我认为一般是对release分支的某个代码版本的记录。
1. ```git tag```，查看当前tag列表
2. ```git tag [tag名称] -m "备注信息"```，增加tag
3. ```git push origin [tag名称]```，推送到远程tag
4. ```git push origin :refs/tags/[tag名称]```，删除远程tag
5. ```git checkout [tag名称]```，将head切换到某个tag下

### 11. git describe
```git describe <ref>```配合tag使用，输出```<tag>-<numCommits>-g<hash>```，距离哪个tag有多少个commit并且当前的hash code

### 12. git squash
1. ```git merge --squash <branch name>```，合并对应的分支的最新提交但不产生commit，需要重新设置commit
