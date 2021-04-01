## vue3

> 首先安装vue3的时候， ```npm install -g @vue/cli```，使用镜像吧避免报错，学习地址**[vue3API](https://composition-api.vuejs.org/zh/api.html#setup)**

### 1. compositionApi
```html
<template>
  <h>{{selectedKeys}}</h>
</template>
```
1. state是一个Proxy代理对象
```js
import { reactive, toRefs } from 'vue';
export default {
  setup(props, context){
    // 定义响应式变量

    const state = reactive({
      selectedKeys: ['/','/plan']
    })
    return {
      // 这下面的属性就都可以在模板中使用
      selectedKeys: state.selectedKeys,
    }
  }
}
```
### 2. toRefs可以将属性变成响应式
```js
import { reactive, toRefs } from 'vue';
export default {
  setup(props, context){// context中有attr slots emit
    // 定义响应式变量

    const state = reactive({
      selectedKeys: ['/','/plan'],
      a: 0
    })
    return {
      // 保证数据是响应式的，还有结构的功能
      ...toRefs(state)
    }
  }
}
```
### 3. watch computed(不需要toRef了)
```js
import { reactive, toRefs, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup(props, context){// context中有attr slots emit
    // 定义响应式变量
    const route = useRoute();
    const state = reactive({
      selectedKeys: [],
    })
    // watch
    watch(() => route.path, (newValue) => {
      state.selectedKeys = [newValue]
    },{ immediate: true })
    // computed
    const selectedKeys = computed(() => {
      return [route.path];
    })
    return {
      // 保证数据是响应式的，还有结构的功能
      ...toRefs(state)
    }
  }
}
```
### 4. 使用vuex
```js
import { useStore } from 'vuex';
setup(){
  const store = useStore();
  onMounted(() => {
    store.dispatch(types.SET_PLAN_LIST);
    // types.SET_PLAN_LIST 外部写好的字符串 唯一表示action
  });
  return {
    ...toRefs(store.state),
  }
}
```
### 5. vue2和vue3的对比

1. vue2把所有熟悉感都放在this上，难以推断组件类型
2. vue2大量的API挂载在Vue对象的原型上，难以实现TreeShaking
3. vue3对虚拟dom进行重写，对模板编译进行优化
4. vue3使用proxy只是做了一层代理，也不需要递归整个对象的所有属性，设置他们的getter和setter


### 6. reactive实现响应式
> 默认返回第一层
1. 依赖收集要确定的是 某个属性变了 要更新， 而不是整个对象 一个属性要手机对应的effect（watcher就是现在的effect）
2. 使用```WeakMap```，自动垃圾回收
3. 只有在页面中使用时，才会使用getter，触发依赖收集
