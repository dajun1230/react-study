import isPromise from 'is-promise';

import { createStore, applyMiddleware, combineReducers } from '../k-redux';
// import thunk from 'redux-thunk';
// import logger from 'redux-logger';
// import promise from 'redux-promise';

export function countReducer(state = 0, action) {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

function countReducer2(state = { num: 0 }, { type, payload }) {
  switch (type) {
    case "ADD2":
      return { ...state, num: state.num + payload };
    default:
      return state;
  }
}

const store = createStore(
  // countReducer, 
  combineReducers({
    count: countReducer,
    // 如果还有别的reducer，可以继续在这里添加
    count2: countReducer2
  }),
  applyMiddleware(thunk, promise, logger)
);

export default store;

// next 为聚合函数，第一次是 store.dispatch
function logger({ getState }) {
  return next => action => {
    console.log("************************");

    console.log(action.type + "执行了！");

    let prevState = getState();
    console.log("prev state", prevState);

    const returnValue = next(action);
    let nextState = getState();
    console.log("next state", nextState);

    console.log("************************");
    return returnValue;
  }
}


function thunk({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }

    return next(action);
  }
}

function promise({ dispatch }) {
  return next => action => {
    return isPromise(action) ? action.then(dispatch) : next(action);
  };
};
