<!-- for in for of.md -->
## for in for of的区别
> 通常用```for in```遍历对象，```for of```遍历对象的键名
### for in
1. 以任意顺序遍历一个对象的除Symbol以外的可枚举属性，如果用在数组上，不一定会按迭代顺序循环，因此不用于迭代一个数组
```js
var obj = {a:1,b:2,c:3};
for(let prop in obj){
  console.log(`obj.${prop} = ${obj[prop]}`);
}
//obj.a = 1 obj.b = 2 obj.c = 3
```
2. 如果是数组，则会把索引值当成字符串的属性，全按对象进行处理
```js
var arr = [1,2,3];
arr.name = 'AddJunZ';
for(let prop in arr){
  console.log(arr[prop]);
}
// 1 2 3 AddJunZ
```

### for of
1. 在迭代对象上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句，**需要是可迭代的**，具有**Symbol.iterator**
```js
const arr = [1,2,3];
for(let item of arr){
  console.log(`item is ${item}`);
}
// item is 1
// item is 2
// item is 3
```
2. 对象默认是不可迭代的
```js
var obj = {
  a:1,
  b:2,
  c:3
}
for(let item of obj){
  console.log(`item is ${item}`);
}
//TypeError: obj is not iterable
```

## 为什么要使用iterable类型
因为数组可以使用下标迭代，但是es6新增的Map和Set不行，为了统一集合类型，才有的iterable类型
