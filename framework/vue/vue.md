<!-- vue.md -->
# vue的核心功能
## 一、 访问器属性
读取或者设置访问器属性的值实际上是调用了对应的setter函数和getter函数
```js
var obj = {};
Object.defineProperty(obj,'name',{
  get(){
    console.log('you get it')
  },
  set(val){
    console.log(`you set it as ${val}`)
  }
})
obj.name // you get it
obj.name = '123' // you set it as 123
```
## 二、 DocumentFragment
```DocumentFragment```是一组子节点的“虚拟存储”，表示一个没有父级文件的最小文档对象，不是真实DOM树的一部分，它的变化不会触发 DOM 树的（重新渲染) ，且不会导致性能等问题。比起一个接一个子节点添加进父节点来说这方法比较高效,同时这方法与innerHTML效果一致
> 使用```documentfragment```之后，页面上对应的节点会消失，除非再次append进父节点

## 三、 数据初始化绑定
```js
function compile(node,vm){
  var reg = /\{\{(.*)\}\}/;
  //节点类型
  // 元素节点
  if(node.nodeType === 1){
    var attr = node.attributes;
    //解析属性
    for(let i = 0; i < attr.length; i++){
      if(attr[i].nodeName == 'v-model'){
        var name = attr[i].nodeValue;
        node.
      }
    }
  }
}
```

# 基础知识点
### 1. 为什么要在列表组件内使用key
没有绑定key时遍历简单模板（比如只有简单文本改变）时，会导致虚拟新旧节点对比更快，节点也会复用（原地复用）。
```html
<div id="app">
  <div v-for="item in dataList" >{{ item }}</div>
</div>

<script>
  var vm = new Vue({
    el:"#app",
    data:{
      dataList:[1,2,3,4]
    }
  })
</script>
```
### 父传子的方法
1. props
2. provide和inject ：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
3. Vue.observable
4. bus(生命周期函数问题)
5. vuex
6. .sync语法糖

### vue的$set的原理

### vuex的数据流动
组件->(dispatch)->action->(commit)->mutations->(mutate)->state->(render)->组件

### vue-router
> this.$router 访问路由器，也可以通过 this.$route 访问当前路由
1. hash模式与history的区别：前端引进路由目的是为了改变视图的时候不会向后端发送请求
```js
```


### 观察者模式
1. 在vue中，每当watcher中检测的数据发生变化，都会触发依赖于该数据的所有视图更新，这里就运用到了观察者模式。用到数据的模板或者watcher作为观察者，每当被观察者更新数据，都会遍历所有的观察者，从而重新渲染模板。
```js
class Subject{
  constructor(name){
    this.name = name
    this.state = 'W'
    // 观察者列表
    this.attachList = [];
  }
  // 更新状态(相当于发布)
  setState(state){
    this.state = state
    // 通知
    this.attachList.forEach(x => x.update(this.state))
  }

  // 添加观察者(相当于添加订阅者)
  attach(obj){
    this.attachList.push(obj)
  }
}

class Observer{
  constructor(name){
    this.name = name
  }
  update(newState){
    console.log(`你监测的状态变了，变成${newState}`);
  }
}

let ee = new Subject('baby')
let er1 = new Observer('huihui');
let er2 = new Observer('addjun');
ee.attach(er1)
ee.attach(er2)
ee.setState('F');
```

### vue的双向绑定原理
vue.js是通过数据劫持结合发布订阅者的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时发布消息给订阅者，触发响应的监听回调。

1. 对需要观察的数据对象进行递归遍历，包括子属性对象的属性，使之都变成响应式。
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，就更新视图。
3. watcher订阅者是observe和compile的通信桥梁
    1. 在自身实例化时往订阅器（Dep）里面添加自己
    2. 自身必须有一个update()方法
    3. 待属性变动 dep.notify()通知时，能调用自身的update()方法，并触发compile中绑定的回调
4. 整合Observe、Compile和Watcher三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

### 为什么data需要是一个函数而不能直接返回一个对象呢
组件复用时所有组件实例都会共享一个data，如果data是对象的话，就会造成一个组件修改data以后会影响到其它所有组件，所以需要将data写成函数，每次用到就调用一次函数获得新的数据。而new Vue的实例，是不会被复用的，因此不存在对象引用问题。

### vue的diff算法

1. 首先最其实vue会根据dom结构生成对应的virtual dom，当virtual dom某个节点的数据改变后会生成一个新的vnode，然后新的Vnode和oldVnode作对比，发现有不一样的地方旧直接修改在真实的DOM上，然后使oldVnode的值为Vnode

2. 在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不S会跨层级比较。


### vue的生命周期
