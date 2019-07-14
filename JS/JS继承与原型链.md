<!-- JS继承与原型链.md -->
## JS继承与原型链
### 最实用的JS继承
主要思路是在子构造函数中把父构造函数的属性执行了一遍，是的根据子构造函数生成的对象拥有对应的属性。
```js
//es5
function superFn(name,age){
  this.name = name;
  this.age = age;
}
function subFn(name,age,girlfriend){
  superFn.call(this,name,age);
  this.girlfriend = 'HuiHui';
}
subFn.prototype = Object.create(superFn.prototype);
subFn.prototype.constructor = subFn;
```
prototype有一个```constructor```属性指向构造函数，如果直接使用父函数的原型，则会使得子函数构造出的对象的```constructor```属性指向superFn，因此需要改变子构造函数原型的```constructor```属性
>let x = Object.create(obj)创建一个__proto__属性指向obj的x对象
```js
//es6
class superFn{
  constructor(name,age){
    this.name = name;
    this.age = age;
  }
  hello(){
    console.log('hello');
  }
}
class subFn extends superFn{
  constructor(name,age,girlfriend){
    super(name,age);
    this.girlfriend = girlfriend;
  }
  hi(){
    console.log('hi');
  }
}
let a = new subFn('AddJunZ',18,'HuiHui');
```
ts中的类定义与继承
```ts
class superFn{
    //实例属性，默认省略public关键字
    name:string;
    age:number;
    //静态属性
    static author:'AddJunZ';
    //构造函数
    constructor(name:string,age:number){
      this.name = name;
      this.age = age;
    }
    introduce():void{
      console.log('我是' + this.name);
    }
  }

class subFn extends superFn {
    constructor(name: string, age: number) {
        //super这里只是执行调用参数，并没有对参数的类型做出限制
        super(name, age);
    }
}

var a = new superFn('AddJunZ', 21);
var b = new superFn('HuiHui', 22);
console.log(a.name);
console.log(b.name);
console.log(superFn.author);
```