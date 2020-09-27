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
2. toRefs可以将属性变成响应式
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
3. watch computed(不需要toRef了)
```js
import { reactive, toRefs, watch, computed } from 'vue';
import { useRoute } from 'vue-router';
export default {
  setup(props, context){// context中有attr slots emit
    // 定义响应式变量
    const routr = useRoute();
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
4. 使用vuex
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
5. 
