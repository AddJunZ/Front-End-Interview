## redux
> [redux入门](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
> [redux入门](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)

### 1. redux的应用场景
1. 某个组件的状态需要共享
2. 某个状态需要在其他任何地方可以拿到
3. 一个组件需要改变全局状态
4. 一个组件需要改变另一个组件的状态

### 2. redux的工作流程
1. **React Components**触发store的dispatch请求更新，用户发出action
```js
store.dispatch({
  type: 'ADD'
})
```
2. **Store**自动调用```Reducer```并且传入两个参数```（state、action）```，然后```Reducer```返回新的```state```
3. **state**一旦有变化，就会触发监听函数
```js
store.subscribe(listener);
// listener 理论上可作为state更新的函数
```
4. **listener**可以通过```store.getState()```获得新的state，如果使用的是React，这时可以触发重新渲染 View。
```js
function listener(){
  // let newState = store.getState();
  render();
}
```

### 3. 中间件与异步操作
1. 中间件通过对```store.dispatch```进行改造，在发出action和执行reducer之间进行了额外的操作

2. 中间件的使用，中间件的使用有顺序要求
```js
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
const logger = createLogger();

const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(thunk, promise, logger)  
)
```

3. applyMiddleware的实现
> 作用是将中间件组成一个数组并且依次执行
```js
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    var store = createStore(reducer, preloadedState, enhancer);
    var dispatch = store.dispatch;
    var chain = [];
    // TODO: 中间件内部需要获取getState和dispatch两个方法
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    // 组合函数，嵌套执行，最后执行store.dispatch
    dispatch = compose(...chain)(store.dispatch);

    return {...store, dispatch}
  }
}
```
4. redux-thunk
如果没有redux-thunk，对于异步请求有两种做法。一种是：需要创建两个action，一个代表发送，一个代表接受到返回的数据；另一种是：直接在接受返回数据的时候触发更新的action
```js
const fetchUsers = () => {
  setTimeout(() => {
    store.dispatch({
      type: 'updateUsers',
      payload: [{ id: 1 }, { id: 2 }]
    })
  }, 3000);
}
const reducers = (state, { type, payload }) => {
  if (type === 'fetchUsers') {
    fetchUsers();
    return { ...state, loading: 'loading' };
  } else if (type === 'updateUser') {
    return { ...state, loading: 'loaded', users: payload };
  }

}
```
使用的redux-thunk的核心代码如下
```js
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```
使用thunk后，action可以是一个函数。实际上就是**帮你调用异步函数，并在回调中创建更新数据的action**，跟自己写回调函数没有区别。。。
```js
const action = function(dispatch) {
  return fetchUsers().then(
    (users) => dispatch({ type:'updateUsers', payload: users}),
    (error) => dispatch({ type:'updateUsersError'}),
  );
};
dispatch(action)
```


### 4. react-redux
1. 提供```connect```方法，将UI组件变成容器组件
```js
import { connect } from 'react-redux';

// 1. mapStateToProps会订阅state，当数据变化时重新执行，重新计算UI组件的参数
// 以此触发重新渲染
// 2. 还可以使用第二个参数，代表容器组件的props对象
const mapStateToProps = (state, ownProps) => ({
  list: state.list // 映射到props的属性
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  changeVal: () => {
    handleMouseIn() {
      dispatch(actionCreators.getChangeMouseAction(true));
    },
    dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: ownProps.filter
    })
  }
})

const VisibleTodoList = connect(
  mapStateToProps, // 将redux的数据都放置在props上
  mapDispatchToProps // 将修改redux数据的dispatch方法放置在props上
)(TodoList);
```
2. 在最外层App使用```Provider```组件提供store，这样App的子组件就都可以拿到state了，原理是使用```react```的```context```


### 5. flux - 基于单向数据流的应用架构
举个例子，Controller触发了model改动，从而触发View改动，但同时联动另一个Model改动，又再次触发View改动。

（Controller  -> Model - > View -> Model -> View）

![image](https://github.com/AddJunZ/Front-End/blob/master/img/flux.png)

### 6. redux toolkit
是一个建立在Redux之上的库，其目睹是去除Redux产生的一些复杂性和模版

[redux toolkit](https://www.freecodecamp.org/chinese/news/how-to-manage-state-in-a-react-app/#reduxtoolkit)

