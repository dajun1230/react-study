import React, { Component } from 'react';
import { observer } from 'mobx-react';

// @observer
class TodoList extends Component {
  render() {
    return (
      <div>
        <h3>TodoList</h3>
        {
          this.props.todoStore.todos.map(todo => (
            <Todo key={todo.id} todo={todo} change={this.props.todoStore.change} />
          ))
        }
        <p>未完成任务：{this.props.todoStore.unfinishedCount}</p>
      </div>
    )
  }
}

const Todo = observer(({ todo, change }) => {
  return (
    <div>
      <input type="checkbox" checked={todo.finished} onChange={() => change(todo)} />
      {/* <input type="checkbox" checked={todo.finished} onChange={() => (todo.finished = !todo.finished)} /> */}
      {todo.title}
    </div>
  )
})

export default TodoList;
