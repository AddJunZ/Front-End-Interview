### 小知识点
1. 在构造函数中使用public的属性```(public x)```，会直接成为实例的属性，不需要再次```this.x = x```了
2. .tsx文件中，React和ReactDOM不支持default import，需要进行修改为```import * as React from "react";```形式
3. 类型断言
```js
let a:any = "string";
let len:number = (<string>a).length;

let a:any = "string";
let len:number = (a as string).length;
```

4. 类型
```js
type C = { a: string, b?: number }
```
5. 接口
```js
// 接口定义对象
interface LabelledValue {
  label: string;
  [propName: string]: any;
}

//接口定义函数
interface SearchFunc {
  (souce: string, subString: string): boolean;
}
```