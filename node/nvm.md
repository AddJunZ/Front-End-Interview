### nvm（需要安装）
> 为了控制node的版本，package.json只能控制node包的版本

#### 1. 在当前项目中写入node的版本
```js
node -v -> .nvmrc
```

#### 2. 常用命令
1. ```nvm list```，查看当前安装的node版本列表
2. ```nvm install [node版本号]```，默认安装最新的node版本
3. ```nvm uninstall [node版本号]```，在nvm列表中删除对应node版本
4. ```nvm use [node版本号]```，切换使用对应的node版本
5. ```nvm alias default [node版本号]```，只是设置别名，没啥，定义好了后可以用```nvm use default```简化一点。

#### 3. 使用nvm切换版本的时候全局命令小时
当nvm装了不止一个版本的时候，在某个版本全局安装的东西，切换node版本后就找不到对应的全局命令了。
