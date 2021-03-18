## 通识

> 

全局安装webpack命令
```js
npm install webpack -g
```
打包文件命令
```js
webpack app.js
// webpack <入口文件>
```
打包好的文件会放在dist目录下，webpack.config.js是配置文件
```js
const path = require('path')
module.exports = {
    entry:{
        //入口文件，多个入口就写多个
        app:'./src/app.js',
        //app2:'./src/app2.js
        //....
    },
    output:{
        //从entry打包过来的文件，打包后的命名格式
        filename:"[name].bundle.js",
        //js文件内部引用其他文件的路径（这个一般不变的吧）
        path:path.resolve(__dirname,'dist'),
        //打包到的路径
        publicPath:__dirname + '/dist/',
        //非entry文件的打包文件命名格式
        chunkFilename:"[name].chunk.js"
    },
    module:{
        rules:[
            //放置许多替换规则，每个规则一个对象
            {   
                //规定的特定格式（用正则表示，不能加双引号！！！）
                test:/\.js$/,
                //排除某些模块
                exclude:'/(node_modules)/',
                //执行的替换规则（可以有多个）
                use:[
                    {
                        //利用特定格式的loader进行转化（可以有多个）
                        loader:'babel-loader',
                        //配置
                        options:{
                            //.....
                        }
                    }
                ]
            }
        ]
    }
}
```
## demo1 打包js
webpack支持CommonJs,ES6,AMD标准

es6定义：exports 对应的是 import
commonjs定义：module.exports 对应的是require
AMD定义：
```js
define(function (require,factory){
    return function(...args){
    }
}) 
//对应的是 
require(["<url>"], function (fn) {
    fn
})
```
以下为app.js的不同引入方式
```js
// sum -- ES6
import sum from './vendor/sum'
console.log('sum(1,2) = ', sum(1, 2));

//minus -- CommonJs
let minus = require('./vendor/minus')
console.log('minus(1,2) = ', minus(1, 2));

//multi -- AMD
require(["./vendor/multi"], function (multi) {
    console.log('multi(1,2) = ', multi(1, 2));
})
```


## demo2 编译es6
了解babel相关的技术生态，安装到项目中
```js
babel-loader:负责es6语法转化（比如箭头函数）
bebel-preset-env:负责es6、es7等版本的语法转化
babel-polyfill:es6内置方法和函数转化（比如new Set()）
babel-plugin-transform-runtime:避免polyfill污染全局变量
```
babel的配置写在.babelrc文件里，babel的调用需要写在webpack的配置文件中的module模块里，babel-polyfill需要在文件内引入

版本问题，要求babel-loader和babel的版本要对应（或者全部升级）
```js
{
    "babel": "^6.23.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
}
```

## demo3 多页面 提取公共代码
配置webpack.config.js打包公共代码，```optimization.splitChunks```配置，把需要打包的代码放在```cacheGroups```属性中
```js
//optimization.splitChunks配置中的cacheGroups属性中每一个键值对代表一个打包模块
module.exports = {
    //....(entry,output),
    optimization:{
        splitChunks:{
            cacheGroups:{
                A:{
                    name:"A",
                    chunks:"all",
                    priority:1//优先级
                },
                B:{}
            }
        }
    }
}
```
## demo4 单页面 代码分割和懒加载
单页面的代码分割和懒加载不是通过webpack配置来实现的，而是通过webpack的写法和内置函数实现的。
```js
/*
output:{
    //针对entry文件的打包
    filename:"[name].bundle.js"
    //针对非entry的打包文件
    chunkFilename:"[name].chunk.js"
}
*/
```
1. import()方式编写page.js//自动执行js
2. require()方式编写page.js//不会自动执行js，不给名字的话，chunkFilename: "[name].min.js"中的 [name]是一个自动分配的、可读性很差的id。

## demo5 处理css
需要css-loader,file-loader（将css处理为文件）,style-loader等LOADER
```js
//app.js里面引入css都是需要执行use()方法的吧
//1. 放在link标签里面（老版本IE对css标签的数量是有限制的）
{
    loader: "style-loader/url"
},
{
    loader: "file-loader"
}
//2. 放在style标签里
{
    loader: "style-loader",
    options: {
        singleton: true // 处理为单个style标签
    }
},
{
    loader: "css-loader",
    options: {
        minimize: true // css代码压缩
    }
}
//3. 动态卸载和加载
{
    loader: "style-loader/useable" // 注意此处的style-loader后面的 useable
},
{
    loader: "css-loader"
}

//3. app.js
import base from "./css/base.css";
base.use()
base.unuse()


//4. 页面加载前的transform（并非响应式，二是到达该状态下刷新浏览器才会更新）
{
    loader: "style-loader",
    options: {
        transform: "./css.transform.js" // 创建transform.js 文件
    }
},
{
    loader: "css-loader"
}
```

## demo6 处理scss
所需的组件：css-loader node-sass sass-loader style-loader extract-text-webpack-plugin（webpack v4） webpack

webpack 规则：放在最后的 loader 首先被执行
```js
{
    loader: 'style-loader'//将JS字符串生成style节点
},
{
    loader: 'css-loader'//将css转化成commonjs模块
},
{
    loader: 'sass-loader'//将sass编一成css
}
```

## demo7 scss提取和懒加载
### 使用```ExtractTextPlugin```抽取样式文件(这个插件用来将css导出到单独文件)
使用```extract-text-webpack-plugin```插件，npm 运行如下命令：```npm install --save-dev extract-text-webpack-plugin@next```，需要在webpack.config.js的plugins选项和rules中scss的相关选项进行配置。

ExtractTextPlugin的使用说明
```js
module:{
    rules:[
        {
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                //编译后用什么loader来提取css文件
                fallback:{
                    loader:"style-loader",
                    options:{
                        
                    }
                },
                //需要什么样的loader去编译文件
                use:[
                    {
                        loader:'css-loader'
                    },
                ],
                //用来覆盖项目路径,生成该css文件的文件路径
                publicfile:{}
            })
        }
    ]
}

```
## demo8 JS Tree Shaking
>定义：项目中没有使用的代码会在打包的时候丢掉

1. 只需要配置mode为"production"，即可显式激活 UglifyjsWebpackPlugin 插件

2. js tree shaking 利用的是 es 的模块系统。而 lodash.js 没有使用 CommonJS 或者 ES6 的写法。所以，安装库对应的模块系统即可。(lodash-es)

## demo9 CSS Tree Shaking
1. ```PurifyCSS```来完成CSS Shaking操作。
2. ```glob-all```帮助```PurifyCSS```来完成路径选择


## demo10 图片处理
图片处理 和 Base64编码 ``` url-loader ```
图片压缩 ``` img-loader ```
合成雪碧图 ``` postcss-loader postcss-sprites ```

css-loader可以管理项目中的css，但css中的url（引用的各种类型的图片）需要url-loader（file-loader）协助处理，而mini-css-extract-plugin可以执行css和js分离

图片压缩 ```img-loader```，对于jpg文件使用```imagemin-mozjpeg```，对于png文件使用```imagemin-pngquant```，具体配置最好看最新的官网


## demo11 字体文件处理


## demo12 处理第三方库
由于js变化实在太快，所以出现了多种引入和管理第三方库的方法，常用的有 3 中：

CDN：<script></script>标签引入即可
npm 包管理： 目前最常用和最推荐的方法
本地js文件：一些库由于历史原因，没有提供es6版本，需要手动下载，放入项目目录中，再手动引入。
针对第一种和第二种方法，各有优劣。

针对第三种方法，如果没有webpack，则需要手动引入import或者require来加载文件；但是，webpack提供了alias的配置，配合webpack.ProvidePlugin这款插件，可以跳过手动入，直接使用！

```webpack.ProvidePlugin```参数是键值对形式，键就是我们项目中使用的变量名，值就是键所指向的库。

```webpack.ProvidePlugin```会先从npm安装的包中查找是否有符合的库。

如果webpack配置了```resolve.alias```选项（理解成“别名”），那么```webpack.ProvidePlugin```就会顺着这条链一直找下去。

## demo13 自动生成html
在真实生产环境中，运行webpack进行打包后，完整的index.html应该是被自动生成的。例如静态资源、js 脚本都被自动插入了。而不是像之前的教程那样根据生成的文件手动插入。

为了实现这个功能，需要借助```HtmlWebpackPlugin```根据指定的index.html模板生成对应的 html 文件，还需要配合```html-loader```处理 html 文件中的<img>标签和属性。

```HtmlWebpackPlugin```是在plugin这个选项中配置的。常用参数含义如下：
```js
//webpack的配置
filename：打包后的 html 文件名称
template：模板文件（例子源码中根目录下的 index.html）
chunks：和entry配置中相匹配，支持多页面、多入口
minify.collapseWhitespace：压缩选项
```

## demo14 Clean Plugin and Watch Mode
当再次打包的时候，会把原来dist文件删除，并再次打包，借助 webpack 命令本身的命令参数--```Watch Mode```：监察你的所有文件,任一文件有所变动,立刻重新自动打包

```CleanWebpackPlugin```参数传入数组，其中每个元素是每次需要清空的文件目录。