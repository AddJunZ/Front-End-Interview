## babel
> [babel原理](https://juejin.cn/post/6921529698686074887)
### 1. 核心包
- babel-core：babel转译器本身，提供babel的转译API，如babel.transform等，用于代码进行转译。像webpack就是调用这些API来完成转译工作的。
- babylon：js的词法解析器，AST生成
- babel-traverse：用于对AST（抽象语法树）的遍历，主要给plugin用
- babel-generator：根据AST生成代码

### 2. 功能包
- babel-types：用于检验、构建和改变AST树的节点
- babel-template：辅助函数，用于从字符串形式的代码来构建AST树节点
- babel-helpers：一系列预定制的babel-template函数，用于提供给一些plugins使用
- babel-code-frames：用于生成错误信息，打印错误点源代码帧以及指出出错的位置
- babel-plugin-xxx：babel转译过程中使用到的插件，其中使用到的插件，其中babel-plugin-transform-xxx是transform步骤实现的
- babel-preset-xxx：transform阶段使用到的一些plugin
- babel-polyfill：js标准新增的原生对象和API的shim，实现上仅仅是core-js和regenerator-runtime两个包的封装
- babel-runtime：功能类似babel-polyfill，一般用于library或pluginzhong，因为它不会污染全局作用域

### 3. 工具包

- babel-cli：babel的命令行工具，通过命令行对js代码进行转译
- babel-register：通过绑定node.js的require来自动转译require引用的js文件
- babel8将包名变成了@babel

### 4. babel转换成js代码的三大步骤
- Parse（解析）：此过程接收转换之前的源码，输出AST（抽象语法树）。在babel中负责此过程的包为babel/parse
- Transform（转换）：在过程接收Parse输出的AST（抽象语法树），输出转换后的AST（抽象语法树）。在babel中负责此过程的包为@babel/traverse
- Generator（生成）：此过程接收Transform输出的新AST，输出转换后的源码。在Babel中负责此过程的包为
@babel/generator

### 5. AST相关知识
babel是一个转译器，感觉相对于编译器complier，叫编译器transpiler更准确，因为它只是把同种语言的高版本规则转译成低版本规则，从而不像编译器那样，输出的是另一种更低级的语言代码。但是和编译器类似，babel的转译过程也分成三个阶段：**parsing、transforming、generating**，以ES6代码转译成ES5代码为例，babel转译的具体过程如下：

- 1. es6代码输入
- 2. babylon进行解析
- 3. 得到AST
- 4. plugin使用babel-traverse对AST树进行遍历转译
- 5. 得到新的AST树
- 6. 用babel-generator通过AST树生成ES5代码


