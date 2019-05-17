<!-- JS中的函数.md -->
## JS中的函数
### 函数作为对象
函数作为对象的时候可以为函数添加方法
```js
function fn(){
  var author = 'AddJunZ';
  console.log(author);
}
fn.author  //undefined
```

### 函数作为构造器
```js
function fn(){
  this.author = 'AddJunZ';
}
let boke = new fn();
boke.author;  //"AddJunZ"
```

### 箭头函数
