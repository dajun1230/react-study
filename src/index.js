// 第一阶段：学习书写react相关插件
// import React, { Component, useState } from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';

// import App from './app';
// // import store from './pages/redux/store';
// import store from './pages/redux/store/sagaIndex'; // saga
// // import { Provider } from './pages/react-redux/k-react-redux';

// import './index.css';

// ReactDOM.render(
//   // <Provider store={store}>
//   <App />,
//   // </Provider>, 
//   document.getElementById('root'));

// 第二阶段：学习书写react
import React from './pages/k-react';
import ReactDOM, { useState } from './pages/k-react/react-dom';
import Component from './pages/k-react/Component';
import './border.css';

class ClassComponent extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {}
  // }

  render() {
    return (
      <div className="border">class组件 - {this.props.name}</div>
    );
  }
}

function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  return (<div className="border">
    函数组件 - {props.name}
    <button onClick={() => setCount(count + 1)}>{count}</button>
    {count % 2 ? <button>click</button> : <span>omg</span>}
  </div>)
}

const jsx = (
  <div className="border">
    <p>全栈</p>
    <a href="https://www.baidu.com">百度</a>
    <ClassComponent name="class" />
    <FunctionComponent name="function" />
    {/* <>
      <p>aaa</p>
      <p>bbb</p>
    </>
    {
      [1, 2].map(item => <div key={item}>{item}</div>)
    } */}
  </div>
);

ReactDOM.render(jsx, document.getElementById('root'));
// 文本节点
// html元素节点
// 类组件
// 函数组件
// 数组
// Fragment
// 补充：<></>与Fragment的区别
