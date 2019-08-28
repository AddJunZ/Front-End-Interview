<!-- vue.md -->
#vue的核心功能
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

#基础知识点
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