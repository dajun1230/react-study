export default function applyMiddleware(...middlewares) {
  return createStore => reducer => {
    const store = createStore(reducer);
    let dispatch = store.dispatch;

    // 加强dispatch
    const midApi = {
      getState: store.getState,
      // 此处不能直接取 store.dispatch，是因为存在多个中间件的时候dispatch会相互影响，所以写成函数形式
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const middlewareChain = middlewares.map(middleware => middleware(midApi));

    // dispatch被加强了
    dispatch = compose(...middlewareChain)(store.dispatch);

    return {
      ...store,
      // 返回加强之后的dispatch
      dispatch
    }
  }
}

function compose(...funcs) {
  if (funcs.length === 0) {
    return args => args;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
