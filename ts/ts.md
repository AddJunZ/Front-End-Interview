### 小知识点

> ts 是鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程

1. 在构造函数中使用 public 的属性`(public x)`，会直接成为实例的属性，不需要再次`this.x = x`了
2. .tsx 文件中，React 和 ReactDOM 不支持 default import，需要进行修改为`import * as React from "react";`形式
3. 类型断言

```ts
let a: any = 'string';
let len: number = (<string>a).length;

let a: any = 'string';
let len: number = (a as string).length;
```

4. 类型

```ts
type C = { a: string; b?: number };
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

> type 和 interface 的区别，type 相比 interface，type 能支持【联合类型】和【utility type】的定义 6. 范型

```ts
// 在.tsx文件中，必须要加上 extends unknown 或者使用【,】才能识别成功
const foo = <T extends unknown>(x: T) => x;
const foo = <T>(x: T) => x;
// 在.ts文件中，下面这样即可识别成功
const foo = <T>(x: T) => x;
```

7. utility type

```ts
// 具体的真实情景就是。当有一个筛选的组件里面有很多参数，但在某些页面并不需要那么多参数筛选的时候
// 针对搜索项我们可以通过是否展示的bool来判断
// 针对数据我们就需要utility type来帮我们修正对参数的类型定义
// 如果是单纯的将属性变成可选操作符，就会遇到值可能是undefined类型的问题【待在真实业务上验证可行性】
type RequestParams = {
  name: string;
  age: number;
};
type RequestKeys = keyof RequestParams;
type RequestOnlyName = Pick<RequestParams, 'name'>;
type Age = Exclude<RequestKeys, 'name'>;
const params1: RequestParams = { name: 'AddJunZ', age: 21 }; // 默认需要带上所有参数
const params2: Partial<RequestParams> = { name: 'AddJunZ' }; // 可以包含任何的参数字段
const params3: Omit<RequestParams, 'name'> = { age: 21 }; // 在原来的类型除去某个字段
```

8. ts-node
   可以使用 ts-node 来运行 ts 文件，使用`tsc --init`初始化`tsconfig.json`文件。如果配置了 alias，需要额外安装`tsconfig-paths`这个包，保证项目运行。

   ```json
   "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    }
   ```

9.
