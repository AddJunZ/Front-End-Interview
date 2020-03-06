<!-- webpack.md -->
### webpack打包原理
webpack是一个模块打包工具，将根据文件间的历来关系对其进行静态分析，将模块按照制定规则生成静态资源，当webpack处理程序时会递归地创建一个依赖关系图，包括应用程序需要的每个模块，然后将所有这些模块打包成一个或者多个bundle

### plugins和loader的区别
loader：用于将非js模块解析成js，或者将图片转化成base64格式（css-loader）

### webpack的常用插件
1. 