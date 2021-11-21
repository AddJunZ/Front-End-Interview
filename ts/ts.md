### 小知识点
1. 在构造函数中使用public的属性```(public x)```，会直接成为实例的属性，不需要再次```this.x = x```了
2. .tsx文件中，React和ReactDOM不支持default import，需要进行修改为```import * as React from "react";```形式
3. 类型断言
```ts
let a:any = "string";
let len:number = (<string>a).length;

let a:any = "string";
let len:number = (a as string).length;
```

4. 类型
```ts
type C = { a: string, b?: number }
```
5. 接口
```ts
// 接口定义对象
interface LabelledValue {
  label: string;
  [propName: string]: any;
}

//接口定义函数
interface SearchFunc {
  (source: string, subString: string): boolean;
}
```
6. 范型
```ts
// 在.tsx文件中，必须要加上 extends unknown 或者使用【,】才能识别成功
const foo = <T extends unknown>(x: T) => x;
const foo = <T,>(x: T) => x;
// 在.ts文件中，下面这样即可识别成功
const foo = <T>(x: T) => x;
```