<!-- webpack.md -->
## webpack
> webpack是一个模块打包工具，在webpack中一切文件都是模块，通过loader转换文件，plugin注入钩子，最后输出多个模块组合成的文件。

### 1. webpack打包原理
webpack是一个模块打包工具，将根据文件间的历来关系对其进行静态分析，将模块按照制定规则生成静态资源，当webpack处理程序时会递归地创建一个依赖关系图，包括应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个bundle

### 2. plugins和loader的区别
loader：用于将非js模块解析成js，或者将图片转化成base64格式（css-loader）

### 3. 常见的loader
> [常用webpack](https://juejin.cn/post/6942322281913778206)

1. babel-loader：将es6转换为es5
- babel-loader 是使babel和webpack协同工作的模块
- @babel/core 是babel编译器核心模块
- @babel/preset-env 是babel官方推荐的预置器，可根据用户的环境自动添加所需的插件和补丁来编译es6代码
```js
// npm install babel-loader @babel/core @babel/preset-env -D

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
}
```
2. style-loader：将JS字符串生成style节点，通过dom操作去加载css，放在第一位
3. css-loader：将css转换成commonjs模块
4. image-loader：加载并压缩图片文件
5. file-loader：把文件类型资源```.jpg .png```等图片输出到一个文件夹中，在代码中通过相对url```publicPath```去引用输出的文件
```js
// npm install file-loader -D

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              publicPath: "https://www.baidu.com"
            }
          }
        ]
      }
    ]
  }
}

// index.js
import img from "./pic.img"
console.log(img) // https://www.baidu.com/pic_600eca23.png
```

6. url-loader：和file-loader类似，但是能把文件很小的情况以base64的方式把文件内容注入到代码中
```js
// npm install url-loader -D

// index.js

import img from "./pic.png"

// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name]_[hash:8].[ext]",
              limit: 10240, // 这里的单位为(b) 1024 => 1024b
              // 这里如果小于10kb则转换为base64打包进js文件
              // 如果大于10kb则打包到dist目录
            }
          }
        ]
      }
    ]
  }
}
```
7. sass-loader：css预处理器
8. postcss-loader：用于补充css样式各种浏览器内核前缀
```js
// npm install postcss-loader autoprefixer -D

// postcss.config.js
module.exports = {
  plugins: [
    require("autoprefixer")({
      overrideBrowserslist: ["> 1%", "last 3 versions", "ie 8"]
    })
  ]
}

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader"
        ],
        include: /src/,
      }
    ]
  }
}
```
9. ts-loader：用于配置项目typescript
```js
// npm install ts-loader typescript -D

// webpack.config.js
module.exports = {
  entry: "./src/index.ts",
  output: {
    path: __dirname + "/dist",
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  }
}

// tsconfig.json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true, // 开启map文件调试使用
    "sourceMap": true,
    "target": "es5", // 转换为es5语法
  }
}
```
10. html-loader：引入一个html页面代码片段赋值给DOM元素内容使用
```js
// npm install html-loader@0.5.5 -D

// index.js
import Content from "../template.html"
document.body.innerHTML = Content

// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  }
}
```


### 4. webpack的常用插件
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
3. happypack、thread-loader：实现多线程加速编译
4. CommonsChunkPlugin：为每个页面间的应用程序共享代码创建 bundle
5. speed-measure-webpack-plugin：在控制台输出各个loader的打包耗时，可根据耗时进一步优化打包速度
```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); //引入插件
const smp = new SpeedMeasurePlugin(); //创建插件对象

// 使用wrap包裹
module.exports = smp.wrap({
  entry: {
    index: './src/index.js',
    search: './src/search.js',
  }, 
  output: {
    path: path.join(__dirname, 'dist'), //__dirname(当前模块的目录名) + dist
    filename: '[name]_[chunkhash:8].js', //打包后输出的文件名,添加文件指纹 chunkhash
  },
  plugins: [],
});
```
6. webpack-bundle-analyzer：打包完成后访问 http://127.0.0.1:8888/ 查看打包后的体积分析
```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
plugins: [
  new BundleAnalyzerPlugin()
],
```
7. terser-webpack-plugin：代码压缩（压缩es6代码），在v5版本已经默认加入了
```js
const TerserPlugin = require('terser-webpack-plugin');
optimization: {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      //代码压缩插件
      parallel: 4, //开启并行压缩
    }),
  ],
},
```
8. filemanager-webpack-plugin：管理打包后的文件路径，一般做文件搬运，换目录的，允许您在构建之前和之后复制，存档（.zip / .tar / .tar.gz），移动，删除文件和目录
9. copy-webpack-plugin：将单个文件或整个目录（已存在）复制到构建目录。相对于上面而言，**不是**等待构建完成再进行的操作，是构建中的转换


### 5. Tree Shaking
> 项目中没有用到的代码会在打包的时候丢弃，js tree shaking 利用的是 es 的模块系统

1. 内部代码

webpack4只需要配置mode为"production"，即可显式激活 UglifyjsWebpackPlugin 插件。

2. 第三方库

比如在使用lodash的时候，导入lodash-es模块能减少打包体积。
```js
let webpackDeepScopePlugin = require('webpack-deep-scope-plugin').default

module.exports = {
  plugins: [
    new webpackDeepScopePlugin()
  ]
}
```

### 6. CSS Tree Shaking
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
### 7. webpack和rollup的区别
> Use webpack for apps, and Rollup for libraries

### 8. webpack热更新逻辑
> 1. 热更新解决的问题

在应用程序开发的时候，开发人员不需要刷新页面，就可以看到最新代码修改后的页面。

> 2. 热更新配置

启动热重启需要使用插件```HotModuleReplacementPlugin```，同时打开```webpack-dev-server```的热开关。

```js
// webpack.config.js
module.exports = {
  // ...
  devServer: {
    hot: true,
    // ...
  },
  plugins: [
    webpack.HotModuleReplacementPlugin(),
   // ...
  ]
}
```