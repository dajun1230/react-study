import React, { Component, useReducer } from 'react';
// import { observer, Observer, useObserver } from 'mobx-react';

import UseLocalStore from './UseLocalStore';
import { useObserver, Observer, observer } from './k-mobx-react-lite';

// @observer
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      count: 0,
      countInit: -1
    }
  }

  inputRef = React.createRef();

  render() {
    const { input, count, countInit } = this.state;
    return (
      <div>
        <h3>TodoList</h3>
        <input value={input} onChange={e => this.setState({ input: e.target.value })} />
        <input type="text" ref={this.inputRef} />
        <button onClick={() => this.setState({ count: count + 1 })}>add click {count}</button>
        <UseLocalStore init={countInit} />
        <button onClick={() => this.setState({ countInit: countInit + 1 })}>add countInit {countInit}</button>
        {
          this.props.todoStore.todos.map(todo => (
            <Todo key={todo.id} todo={todo} change={this.props.todoStore.change} ref={this.inputRef} />
          ))
        }
        <p>未完成任务：{this.props.todoStore.unfinishedCount}</p>
        <Child count={{ count }} />
      </div>
    )
  }
}

// 如何给组件添加响应式
// 方法1: observer hoc （高阶组件：接收组件为参数并且返回一个新组件的函数）
const Todo = observer(({ todo, change }, ref) => {
  console.log("todo props");
  console.log("input value", ref.current && ref.current.value)
  return (
    <div>
      <input type="checkbox" checked={todo.finished} onChange={() => change(todo)} />
      {/* <input type="checkbox" checked={todo.finished} onChange={() => (todo.finished = !todo.finished)} /> */}
      {todo.title}
    </div>
  )
}, { forwardRef: true })

// 方法2: Observer Component
// const Todo = observer(({ todo, change }) => {
//   return (
//     <Observer>
//       {() => {
//         return (
//           <div>
//             <input type="checkbox" checked={todo.finished} onChange={() => change(todo)} />
//             {/* <input type="checkbox" checked={todo.finished} onChange={() => (todo.finished = !todo.finished)} /> */}
//             {todo.title}
//           </div>
//         )
//       }}
//     </Observer>
//   )
// })

// 方法3: useObserver hook
// const Todo = observer(({ todo, change }) => {
//   const [_, forceUpdate] = useReducer(x => x + 1, 0);
//   return useObserver(() => {
//     return (
//       <div>
//         <input type="checkbox" checked={todo.finished} onChange={() => change(todo)} />
//         {/* <input type="checkbox" checked={todo.finished} onChange={() => (todo.finished = !todo.finished)} /> */}
//         {todo.title + '-00'}
//       </div>
//     )
//   }, undefined, { useForceUpdate: () => forceUpdate })
// })

const Child = React.memo(props => {
  console.log("child props");
  return <div>child</div>;
}, (prevProps, nextProps) => prevProps.count.count === nextProps.count.count)

export default TodoList;
