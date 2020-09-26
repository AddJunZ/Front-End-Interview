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
### 2. 父传子的方法
1. props, $emit
2. provide和inject ：允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效
3. Vue.observable
4. bus(生命周期函数问题)：新建一个vue的实例，作为事件中心
```js
// utils
import Vue from 'vue';
export default new Vue({
  name: 'EventBus'
})

// 组件1：触发
import eventsBus from './utils.js';
eventBus.$emit('xxx', data);

// 组件2：监听
import eventsBus from './utils.js';
eventBus.$on('xxx', data => {
  // code
});
```
5. vuex
6. .sync语法糖

### 3. vue的$set的原理

### 4. vuex的数据流动  
组件->(dispatch)->action->(commit)->mutations->(mutate)->state->(render)->组件

### 5. vue-router
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

### 6. vue的双向绑定原理
vue.js是通过数据劫持结合发布订阅者的方式，通过Object.defineProperty()来劫持各个属性的setter和getter，在数据变动时发布消息给订阅者，触发响应的监听回调。

> Observer： 数据监听器，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者，内部采用Object.defineProperty的getter和setter来实现。

> Dep：消息订阅器，内部维护了一个数组，用来收集订阅者（Watcher），数据变动触发notify 函数，再调用订阅者的 update 方法。

> Watcher：订阅者,作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数。

> Compile：指令解析器，它的作用对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数。

1. 对需要观察的数据对象进行递归遍历，包括子属性对象的属性，使之都变成响应式。
2. compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，就更新视图。
3. watcher订阅者是observe和compile的通信桥梁
    1. 在自身实例化时往订阅器（Dep）里面添加自己
    2. 自身必须有一个update()方法
    3. 待属性变动 dep.notify()通知时，能调用自身的update()方法，并触发compile中绑定的回调
4. 整合Observe、Compile和Watcher三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

![image](https://github.com/AddJunZ/Front-End/blob/master/img/vue-mvvm.jpg)

### 7. 为什么data需要是一个函数而不能直接返回一个对象呢
组件复用时所有组件实例都会共享一个data，如果data是对象的话，就会造成一个组件修改data以后会影响到其它所有组件，所以需要将data写成函数，每次用到就调用一次函数获得新的数据。而new Vue的实例，是不会被复用的，因此不存在对象引用问题。

### 8. vue的diff算法

1. 首先最其实vue会根据dom结构生成对应的virtual dom，当virtual dom某个节点的数据改变后会生成一个新的vnode，然后新的Vnode和oldVnode作对比，发现有不一样的地方就直接修改在真实的DOM上，然后使oldVnode的值为Vnode

2. 在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不S会跨层级比较。

> [vue的diff算法](https://www.cnblogs.com/dojo-lzz/p/8047742.html)

### 9. vue的生命周期
> var vm = new Vue({}) 开始创建vue实例对象
> init Events & Lifecycle 初始化vue空的实例对象
1. beforeCreate：组件实例被创建之初，组件的属性生效之前
> 准备data和methods，可操作数据
2. created：组件实例已经被完成创建，属性以及绑定，真实的dom还未生成，$el还不可用
> vue开始编辑模板，在内存中生成编译好的模板字符串，渲染好为内存中dom，还未挂载
3. beforeMount：在挂载开始之前被调用，相关的render函数首次被调用
> 创建vm.$el并且替代当前的el节点，替换到真实的浏览器页面中
4. mounted：el被新创建的vm.$el替换，并挂载到实例上
> 组件脱离创建状态进入运行状态
5. beforeUpdate：组件数据更新之前调用，发生在虚拟dom打补丁之前
> data数据是最新的，但页面的数据时旧的
> virtual dom的re-render和patch
6. updated：组件数据更新之后
7. activited：keep-alive专属，组件被激活时调用
8. deactivated：keep-alive专属，组件被销毁时调用
9. beforeDestory：组件销毁前调用
> 数据方法依然存在
10. destoryed：组件销毁后调用
> 所有数据方法都不可用了

### 10. vue-router的原理机制
1. hash模式，早期的前端路由实现就是基于```location.hash```实现的，通过修改地址url中的#后的内容实现跳转。

实现原理：

    1. url的hash值表示客户点的一种状态，向后端发生请求时不会带上该部分内容
    2. hash值的改变会在浏览器的访问历史中增加一个记录，因此可以通过浏览器的前进后退按钮对hash切换
    3. 通过a标签并设置href属性，用户点击标签url的hash值就会变化，活着手动对location.hash赋值，改变url的hash值
    4. 对hashchange事件进行监听（window.onhashchange），监听hash的变化，从而对页面进行跳转或渲染。

```js
window.addEventListener('hashchange', function() {
  console.log('The hash has changed!')
  // location.hash
}, false);
```

2. history模式，html5提供了history api来实现url的变化。最重要的两个是：新增历史的```history.pushState()```和替换当前历史的```history.replaceState()```

```js
window.addEventListener('popstate', (event) => {
  console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));
});
```

### 11. vue的单向数据流
> 是指数据只能从父组件流入子组件，子组件修改父组件的数据需要通过emit触发事件的方式更改
