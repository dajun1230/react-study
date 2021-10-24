import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise';

import LoginUser from './loginReducer';

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
    count2: countReducer2,
    user: LoginUser,
  }),
  applyMiddleware(thunk, promise, logger)
);

export default store;
