import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';

import LoginUser from './loginReducer';
import loginSaga from "../action/loginSaga";

const sagaMiddleware = createSagaMiddleware();

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
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(loginSaga);

export default store;
