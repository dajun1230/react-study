import React, { useContext, useLayoutEffect, useReducer } from 'react';
// import { useSelector } from 'react-redux';
import { bindActionCreators } from '../../redux/k-redux/bindActionCreators';

// Provider在index.js，把store传递下来，用到了context
// 所有的子组件都有机会接收到store

const Context = React.createContext();

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps
) => WrappedComponent => props => {
  // 读取store
  const store = useContext(Context);
  const { getState, dispatch, subscribe } = store;
  const stateProps = mapStateToProps(getState());
  // dispatch   object | function 
  let dispatchProps = { dispatch };
  if (typeof mapDispatchToProps === 'function') {
    dispatchProps = mapDispatchToProps(dispatch);
  } else if (typeof mapDispatchToProps === 'object') {
    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
  }
  // 这里实现了函数版本的forceUpdate，可去参考官网
  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => { // 注意这里不使用useEffect是为了避免漏掉更新的情况
    const unsubscribe = subscribe(() => {
      // store state 发生改变 forceUpdate是强制刷新
      forceUpdate();
    })

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [store])

  return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
}

// 提供者 提供store 因为store当中有state dispatch subscribe
export function Provider({ store, children }) {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  );
}

// 以下是hooks方法
export function useSelector(selector) {
  const store = useContext(Context);
  const { getState, subscribe } = store;
  const selectState = selector(getState());

  const [_, forceUpdate] = useReducer(x => x + 1, 0);

  useLayoutEffect(() => { // 注意这里不使用useEffect是为了避免漏掉更新的情况
    const unsubscribe = subscribe(() => {
      // store state 发生改变 forceUpdate是强制刷新
      forceUpdate();
    })

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    }
  }, [store])

  return selectState;
}

export function useDispatch() {
  const { dispatch } = useStore();
  return dispatch;
}

function useStore() {
  const store = useContext(Context);
  return store;
}
