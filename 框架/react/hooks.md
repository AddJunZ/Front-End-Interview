## hooks
> React中只允许在 React function component 或者 a custom React Hook function中使用hooks。即首字母大写的和use首字母大写的function。

[hooks](https://juejin.cn/post/6916317848386142216#heading-12)

### 1. useState
> 对应类组件的 ths.state.num this.setState({num: 345})

函数组件的每次一次渲染都会生成新的state，因此不允许将useState写在任何具有可能性的if语句中。以保证useState的数量在每次渲染都保持一致。
```js
const [num, setNum] = useState(123);
```
> useState还能带传一个函数作为初始值，state中不要保存能够计算出来的值。

### 2. useEffect
> 对应类组件的：componentDidMount, componentDidUpdate，componentWillUnmount
1. 不接受第二个参数。在第一次渲染和每次更新渲染都会调用该回调函数。
```js
useEffect(() => {
  console.log('init component');
})
```
2. 接受空数组作为第二个参数，表示页面初始化时只执行一次，后面更新渲染也不会执行
```js
useEffect(() => {
  console.log('init component');
}, [])
```
3. 接受依赖项数组作为参数，只有依赖项数组中的值改变才会调用
```js
useEffect(() => {
  console.log('init component');
}, [x, y])
```
4. 清除副作用。有一些操作是要在组件销毁的时候执行，比如一些事件的监听。每次执行
```js
const = checkMouse = (e) => {
  console.log(e.clientX, e.clientY);
}
useEffect(() => {
  document.addEventListener('mousemove', checkMouse);
  return () => {
    // 在每次执行useEffect之前都会执行上一次return中内容
    document.removeEventListener('mousemove', checkMouse);
  }
})
```
5. 每个effect函数都属于一次特定的渲染，每次重新渲染都会生成新的effect。每次渲染触发的```setTimeout```里面的count都是最新渲染出来的count。如果在3000ms内连续点击三次，就会输出```0,1,2,3```，0是首次渲染，点击按钮后count的值立刻变化，立刻重新渲染组件，因此重新触发```setTimeout```函数。因此在点击3s后依次输出```1,2,3```
```js
const [count, setCount] = useState(0);

useEffect(() => {
  setTimeout(() => {
    console.log(`${count}`);
  }, 3000);
});

return (
  <div>
    <p>你点击了{count}次</p>
    <button onClick={() => setCount(count + 1)}>
      点击我
    </button>
  </div>
);
```

6. 与类组件相比：类组件中是共用一个state，因此会输出```3,3,3,3```

### 3. useLayoutEffect
> 对应类组件的：componentWillMount

作用在DOM更新完成之后执行某个操作，执行时间：在**DOM更新之后**

与```useEffect```的区别

- 相同点
  1. 接受一个函数作为第一参数
  2. 接受依赖数组作为第二参数
  3. 返回一个函数，都是**先执行返回函数，再执行参数函数**
- 不同点
  1. 执行时间不同，```useLayoutEffect```发生在DOM更新之后执行，```useEffect```在```render```结束之后执行。
  2. ```useLayoutEffect```的函数永远在```useEffect```的函数之前执行，因为**DOM更新之后，才能渲染**
```js
const [num, setNum] = useState(0)
//在类组件中用componentWillMount生命周期来实现
useLayoutEffect(() => {
  console.log('useLayoutEffect')
  //	也可以在此进行事件绑定
  return () => {
    //	也可以在此进行事件绑定移除
    console.log(1)
  }
}, [num])

useEffect(() => {
  console.log('useEffect')
  return () => {
    console.log(2);
  }
}, [num])

return (
  <div onClick={() => setNum(num => num + 1)}>
    这是一个函数式组件————{num}
  </div>
)
```
### 4. useMemo
可以传递一个函数和依赖项，创建函数会返回一个值，只有在依赖项发生改变时，才会调用此函数，返回一个新的值。作用是让组件中的函数跟随状态更新，用于缓存传入的 props，避免依赖的组件每次都重新渲染。

- 使用
  1. 接受一个函数作为参数
  2. 同样接收第二个参数作为依赖列
  3. 返回的是值，类型可以是任何类型，如函数，对象


#### 1. 复杂计算的优化
更新age，会重复触发getDoubleNum的计算（浪费）
```js
const [num, setNum] = useState(1)
const [age, setAge] = useState(18)

function getDoubleNum() {
  console.log(`获取双倍Num${num}`)
  return 2 * num  //	假设为复杂计算逻辑
}

return (
  <div onClick={() => { setAge(age => age + 1) }}>
    <br></br>
    这是一个函数式组件————{ getDoubleNum() }
    <br></br>
    age的值为————{ age }
    <br></br>
  </div>
)
```
使用useMemo，返回值是一个新的函数，**不需要调用**。效果：更新age重新计算getDouble函数了
```js
const [num, setNum] = useState(1)
const [age, setAge] = useState(18)

const getDoubleNum = useMemo(() => {
  console.log(`获取双倍Num${num}`)
  return 2 * num  //	假设为复杂计算逻辑
}, [num])

return (
  <Fragment>
  <div onClick={() => { setAge(age => age + 1) }}>
    <br></br>
    这是一个函数式组件————{ getDoubleNum }
    <br></br>
    age的值为————{ age }
    <br></br>
  </div>
  <div onClick={() => {setNum(num => num + 1)}}>num + 1</div> 
  </Fragment>
)
```

#### 2. 父子组件重复渲染问题优化使用场景
useMemo() 返回的是一个 memoized 值，只有当依赖项发生变化时，才会重新计算这个 memoized 值
```js
const Child = React.memo(() => {
  console.log('我是子组件')
  return <p>我是子组件</p>
})

function Parent() {
  const [show, setShow] = useState(true)

  // 这种会一直刷新子组件
  // const info = {
  //   name: 'Even',
  //   age: 22
  // }

  // 这个不会
  const info = useMemo(() => ({
    name: 'Even',
    age: 22
  }), [])

  return (
    <div>
      <Child info={info} />
      <button onClick={() => setShow(!show)}>点击更新状态</button>
    </div>
  )
}
```

### 5. useCallback

1. 与```useMemo```的区别

- 相同点
  1. useMemo(() => fn, deps) 相当于useCallback(fn, deps);
- 不同点
  1. useCallback是对传过来对回调函数进行优化，返回的是一个函数；useMemo可以返回任何值

2. useCallback是缓存的是一个函数，deps是空数组，就会复用这个函数。

当useCallback依赖为空[]时，我们连续多次点击div区域，虽然useCallback中的内容会不断执行，但是我们可以看到打印出来的set的长度一直都是2，这就是因为它不断将同一个函数添加进set，所以set的长度不变
而当useCallback的依赖为[num]时，我们连续多次点击div区域，可以看到打印出来的set在不断累加，1、2、3、4、5、6...。因为num在改变，所以每一次缓存的函数都是一个新的函数，所以添加进set的函数是不一样的，所以set的长度点一次加一次
```js
const set = new Set()
export default function StateFunction () {
  const [num, setNum] = useState(1)
  const [age, setAge] = useState(18)

  const getDoubleNum = useMemo( () => {
    console.log(`获取双倍Num${num}`)
    return 2 * num  //	①假设为复杂计算逻辑
  },[] )

  const getDoubleNum = useCallback( () => {
    console.log(`获取双倍Num${num}`)
    return 2 * num  //	②假设为复杂计算逻辑
  },[] )

  set.add(getDoubleNum())  //	③注意set打印的长度变化（设置Callback的依赖为[]、[num]进行对比）
  console.log('set.size：',set.size)

  return (
    <div onClick={ () => { setNum( num => num+1 ) }  }>
      <br></br>
      这是一个函数式组件————num：{  getDoubleNum } //①useMemo情况下
      这是一个函数式组件————num：{  getDoubleNum() } //②useCallback情况下
      <br></br>
      age的值为————{ age }
      <br></br>
    </div>
  )
}

```

3. 使用场景：

- 在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可
- 如果有函数传递给子组件，使用useCallback
- 缓存一个组件内的复杂计算逻辑需要返回值时，使用useMemo
- 如果有值传递给子组件，使用useMemo

### 6. useRef
useRef就是返回一个子元素索引，在整个生命周期保持不变，长久保存数据，之前在定时器用过。。。ref
保存的对象发生改变，**不会主动通知，属性变更不会重新渲染**

1. 未使用useRef
```js
const [num, setNum] = useState(0)

let timer
useEffect( () => {
    timer = setInterval( () => {
        setNum( num => num+1 )
    },400 )
},[] )

useEffect( () => {
  if(num > 10){
    console.log('大于10了，清除定时器')
    console.log('timer：',timer)
    //  因为每一个timer都是独立render的，所以获取不到
    clearTimeout(timer)
  }
},[num] )

return (
  <div>
    这是一个函数式组件————num:{  num }
  </div>
)
```
2. 使用useRef
```js
const [num, setNum] = useState(0)

const ref = useRef()
useEffect( () => {
  ref.current = setInterval( () => {
    setNum( num => num+1 )
  },400 )
  // ref.current = '111'
},[] )

useEffect( () => {
  if(num > 10){
    console.log('大于10了，清除定时器')
    console.log('ref.current',ref.current)
    clearTimeout(ref.current)
  }
},[num] )

return (
  <div>
    这是一个函数式组件————num:{  num }
  </div>
)
```
### 7. useContext
让子组件之间共享父组件传入的状态，当我们有一组子组件都需要用到父组件的一些数据，区别于在每个子组件逐个通过props的方式传递，我们可以使用useContext

- 需要引入useContext，createContext两个内容
- 过createContext创建一个context句柄，这个句柄要写在组件外部，具体项目应该是要做抽离？
- Context.Provider来确定数据共享范围
- 通过value来分发内容
- 在子组件中，通过useContext(Context句柄)来获取数据
- 注意事项，上层数据发生改变，肯定会触发重新渲染（点击button按钮触发父组件更新传入的num值能看到子组件重新渲染）

```js
// 未使用：（虽然可以通过使用整体的props对象传)
function Parent(){
  const [num ,setNum] = useState(2);
  return (
    <Child1 num={num}></Child1>
    <Child2 num={num}></Child2>
  )
}
function Child1(props){
  return <div>{props.num}</div>
}

// 使用后，在自组建使用useContext，但需要从父组件引入Context上下文(不需要刻意将数据通过props传递)
const Context = createContext(null);
function Parent(){
  const [num ,setNum] = useState(2);
  return (
    <Context.Provider value={num}>
      <Child1></Child1>
      <Child2></Child2>
    </Context.Provider>
  )
}
function Child1(props){
  const num = useContext(Context)
  return <div>{props.num}</div>
}
```

### 8. useReducer
作用是可以从状态管理的工具中获取到想要的状态。

Redux必须要有的内容就是仓库```store```和管理者```reducer```。而```useReducer```也是一样的，需要创建数据仓库store和管理者reducer，即示例代码注释处。然后我们就可以通过①处的定义一个数组获取状态和改变状态的动作，触发动作的时候需要传入type类型判断要触发reducer哪个动作，然后进行数据的修改。需要注意的地方是，在reducer中return的对象中，**需要将state解构**，否则状态就剩下一个num值了
```js
const initialState = {count: 0};

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

### 9. useImperativeHandle
作用是将向父组件暴露方法，能在父组件调用自组建的方法，进而控制子组件的变量或者状态。经典的场景是使用在一个页面上有一个modal组件，父组件能通过某些事件触发显示子组件。而对于子组件的显示与否一般只在子组件内部控制，因此需要暴露【显示组件】的方法给父组件使用。

> 子组件Modal
```tsx
import React, { useState, useImperativeHandle, forwardRef } from 'react';
export type Handler = {
  show: () => void;
}
const Modal = forwardRef<Handler>((props, ref) => {
  const [v, setV] = useState(false);
  useImperativeHandle(ref, () => ({
    // 把show方法暴露给父组件
    show: () => setV(true)
  }))
  return <>
    {
      v ? <div>
        modal
      </div> : null
    }
  </>
})
export default Modal;
```

> 父组件
```tsx
import React, { useRef } from "react";
import Modal, { Handler } from './Modal';
const App = () => {
  const modalRef = useRef<Handler>(null);
  return (
    <div>
      <div onClick={() => { modalRef.current?.show() }}>Click me!!!</div>
      <Modal ref={modalRef}/>
    </div>
  )
}
export default App;
```

### 0. 自定义hooks例子
1. debounce的hook
```tsx
// useDebounce.tsx
import { useEffect, useState } from "react";
export const useDebounce: <T>(value: T, delay: number) => T = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // 每次在value改变的时候就重新生成定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完成之后执行
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
};

// App.tsx使用
import React, { useEffect, useState } from "react";
import { useDebounce } from './hooks/useDebounce';
const App = () => {
  const [val, setVal] = useState('');
  const debouncedVal = useDebounce(val, 3000);
  const onChange = (e:any) => setVal(e.target.value);
  useEffect(() => {
    console.log('refetch');
  }, [debouncedVal]);
  return (
    <div className="App">
      <input type="text" value={val} onChange={onChange}/>
    </div>
  );
}
export default App;
```
![image](https://github.com/AddJunZ/Front-End/blob/master/img/useDebounce_20211120.gif)

2. 每次初始化的时候触发的hooks，少些了繁琐的空数组
```tsx
// useMount.tsx
import React, { useEffect } from "react";
export const useMount = (callback) => {
  useEffect(() => {
    callback();
  }, []);
}
// App.tsx
useMount(() => {
  console.log('init data');
});
```


3. 阻止在已卸载的组件上赋值。经典的场景是某些组件的请求还没返回的时候，就已经卸载组件（退出页面）了，后面请求返回之后就会导致组件报错。
```tsx
/**
 * 返回组件的挂载状态
 * 如果还没挂载或者已经卸载，则返回false
 * 反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    }
  })
  return mountedRef;
}

// App.tsx
export const App = () => {
  const [data, setData] = useState([]);
  const mountedRef = useMountedRef();
  useEffect(() => {
    getData().then(res => {
      if (mountedRef.current) {
        // only component loaded or has not destroyed.
        // to set component's data
        setData(res)
      }
    });
  })
}
```

4. react中抽离触底刷新逻辑（使用Ins）
```tsx

```

### 1-1. useState实现原理
> [原理](https://juejin.cn/post/6891577820821061646)

useState返回(变量, 函数)的一个元组，初始值由函数传入。本质是闭包，返回修改函数。useState实现的方式是类似于数组的方式。
```js
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}
let state;
function useState(initialState) {
  state = state || initialState;
  function setState(newState) {
    state = newState;
    render();
  }
  return [state, setState];
}
```