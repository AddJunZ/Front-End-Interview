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

### 3. 