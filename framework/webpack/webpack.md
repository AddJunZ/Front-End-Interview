<!-- webpack.md -->
## webpack
> webpack是一个模块打包工具，在webpack中一切文件都是模块，通过loader转换文件，plugin注入钩子，最后输出多个模块组合成的文件。

### webpack打包原理
webpack是一个模块打包工具，将根据文件间的历来关系对其进行静态分析，将模块按照制定规则生成静态资源，当webpack处理程序时会递归地创建一个依赖关系图，包括应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个bundle

### plugins和loader的区别
loader：用于将非js模块解析成js，或者将图片转化成base64格式（css-loader）

### 常见的loader
1. babel-loader：将es6转换为es5
2. css-loader：将css转换成commonjs模块
3. style-loader：将JS字符串生成style节点，通过dom操作去加载css
4. image-loader：加载并压缩图片文件
5. file-loader：把文件输出到一个文件夹中，在代码中通过相对url去引用输出的文件
6. url-loader：和file-loader类似，但是能把文件很小的情况以base64的方式把文件内容注入到代码中

### webpack的常用插件
1. html-webpack-plugin：为html文件中引入的外部资源，可以生成创建html入口。根目录下的index.html会被html-webpack-plugin作为最终生成的 html 文件的模板
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins:[
  new HtmlWebpackPlugin({
    filename:"index.html",
    template:"./index.html",
    chunks:["app"], //entry中的app入口才会被打包
    minify:{
      //压缩选项
      collapseWhitespace:true
    }
  })
]
```
2. clean-webpack-plugin：删除打包文件
```js
plugins: [
  new CleanWebpackPlugin(["dist"])
]
```
3. happypack：实现多线程加速编译
4. CommonsChunkPlugin：为每个页面间的应用程序共享代码创建 bundle


### Tree Shaking
> 项目中没有用到的代码会在打包的时候丢弃，js tree shaking 利用的是 es 的模块系统

1. 内部代码

webpack4只需要配置mode为"production"，即可显式激活 UglifyjsWebpackPlugin 插件。

2. 第三方库

比如在使用loadsh的时候，导入loash-es模块能减少打包体积。
```js
let webpackDeepScopePlugin = require('webpack-deep-scope-plugin').default

module.exports = {
  plugins: [
    new webpackDeepScopePlugin()
  ]
}
```

### CSS Tree Shaking
> 使用PurifyCSS，glob-all对PurifyCSS进行路径处理，定位Tree Shaking的路径文件。

```js
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");

let purifyCSS = new PurifyCSS({
    paths: glob.sync([
        // 要做CSS Tree Shaking的路径文件
        path.resolve(__dirname, "./*.html"),
        path.resolve(__dirname, "./src/*.js")
    ])
});
```