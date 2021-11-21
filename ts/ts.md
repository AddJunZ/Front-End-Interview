### 小知识点
> ts是鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
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
> type和interface的区别，type相比interface，type能支持【联合类型】和【utility type】的定义
6. 范型
```ts
// 在.tsx文件中，必须要加上 extends unknown 或者使用【,】才能识别成功
const foo = <T extends unknown>(x: T) => x;
const foo = <T,>(x: T) => x;
// 在.ts文件中，下面这样即可识别成功
const foo = <T>(x: T) => x;
```
7. utility type
```ts
type RequestParams = {
  name: string;
  age: number;
}
const params1: RequestParams = { name: 'AddJunZ', age: 21 }; // 默认需要带上所有参数
const params2: Partial<RequestParams> = { name: 'AddJunZ' }; // 可以包含任何的参数字段
const params3: Omit<RequestParams, 'name'> = { age: 21 }; // 在原来的类型除去某个字段
```