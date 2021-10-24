import React, { Component } from 'react';

import store from './k-store';

export default class ReduxPage extends Component {

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => { // 订阅数据变化，更新页面
      // store 改变
      this.forceUpdate();
    })
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }


  add = () => {
    store.dispatch({ type: "ADD" });
    console.log('state', store.getState()); // 值已经发生变化，但是页面并为更新
  }

  add2 = () => {
    store.dispatch({ type: "ADD2", payload: 100 });
  }

  asyAdd = () => {
    store.dispatch(() => {
      setTimeout(() => {
        store.dispatch({ type: "ADD" });
        console.log("getState", store.getState());
      }, 1000);
    })
  }

  promiseMinus = () => {
    store.dispatch(
      Promise.resolve({
        type: "MINUS",
        payload: 100
      })
    )
  }

  render() {
    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{store.getState().count}</p>
        <button onClick={this.add}>add</button>
        <button onClick={this.asyAdd}>asyAdd</button>
        <button onClick={this.promiseMinus}>promise minus</button>

        <button onClick={this.add2}>{store.getState().count2.num}</button>
      </div>
    )
  }
}
