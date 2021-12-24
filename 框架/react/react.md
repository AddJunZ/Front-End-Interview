## react

### 1. setState是同步还是异步
> [react经典面试题之this.setState](https://juejin.cn/post/6920521739453612040)
```js

```

### 2. react的class的高阶组件写法和hooks的区别
> [React中高阶组件的意义是什么](https://www.zhihu.com/question/269715069?sort=created)
class写法的话，当我们要抽离逻辑的时候需要写高阶组件，高阶组件是参数为组件，返回值为新组件的函数。高阶组件是纯函数，不对传入的WrappedComponent作修改，同时高阶组件不对组件本身定义做过多的修改，需要做一下组件props的透传。
```jsx
// 高阶组件 advancedComponent.jsx
const advancedComponent = (WrappedComponent) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        list: []
      }
      componentDidMount() {
        this.calculateList();
      }
      calculateList() {
        // code..
      }
    }
    render() {
      // 公共逻辑的数据 => list
      return <WrapperComponent list={list} {...this.props} />
    }
  }
}
// WrapperComponent.jsx
class MyComponent extends React.Component {
  render() {
    const { list } = this.props;
    // 内部就能访问到list，进而做特殊逻辑...
  }
}
export default advancedComponent(MyComponent); // 高阶组件函数包裹组件
```
我们在抽离公共状态到外部的时候，不得不多定义一层组件，这本身是不优雅和不容易被理解的，因此出现了hooks。
```jsx
// hooks
const useMyHook = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    calculateList().then(res => {
      setList(res);
    })
  })
  return list;
}
// WrapperComponent.jsx
const WrapperComponent = () => {
  const [list] = useMyHook();
  // 内部就能访问到list，进而做特殊逻辑...
}
```
由此看来，从抽离公共数据的优雅程度和组件的结构来看，hook都比高阶组件优秀。

### 3. class组件中使用hooks
有时候需要在class组件内部使用hooks，则最好的方法就是使用高阶组件，在高阶组件内使用hooks获得数据或状态
```jsx
import React from 'react';

// 高阶组件：advancedComponent.jsx
export const advancedComponent = (WrappedComponent) => {
  return props => {
    const list = useMyHooks();
    return <WrappedComponent list={list}/>
  }
}

// class组件：
class MyComponent extends React.Component {
  render() {
    const { list } = this.props;
    // 内部就能访问到list，进而做特殊逻辑...
  }
}
// 通过高阶组件 将从hooks获得的数据传递给 MyComponent组件
export default advancedComponent(MyComponent);
```

### 4. render props 设计模式
针对于纯数据逻辑上的复用，最好的就是使用render props。也不一定是使用children，也可以使用自定义的渲染UI的自定义props。
```jsx
// render props
import { useState, useCallback } from 'react';

function CounterRenderProps({ children }) {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => {
    setCount(count + 1);
  }, [count]);
  const decrement = useCallback(() => {
    setCount(count - 1);
  }, [count]);
  return children({ count, increment, decrement });
}

// 使用render props
function CounterRenderPropsExample() {
  return <CounterRenderProps>
    {
      ({ count, increment, decrement }) => {
        return <div>
          <button onClick={increment}> + </button>
          <span>{ count }</span>
          <button onClick={decrement}> - </button>
        </div>
      }
    }
  <CounterRenderProps/>
}
```
自定义props渲染UI的方式，比如就定义renderItem这个prop来传渲染函数。一般是针对相同的数据有不同的UI展示需求的时候才用。（对部分UI逻辑进行抽象）
```jsx
function RenderProps({ renderItem, data = [] }) {
  const element = data.map((item) => renderItem(item));
  return <>
    { element }
  </>
}

// 外部自己定义想要的样式，通过prop传递即可
function App1() {
  return <RenderProps 
    renderItem={(item) => <span>{ item }</span>}
  />
}
function App2() {
  return <RenderProps 
    renderItem={(item) => <div>{ item }</div>}
  />
}
```

### 5. 