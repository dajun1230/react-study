import React, { Component } from 'react';

import TimerView from './TimerView';
import appState from './store/appState';
import TodoList from './TodoList';
import todoStore from './store/todoStore';

export default class ReactMobxPage extends Component {
  render() {
    return (
      <div>
        <h3>ReactMobxPage</h3>
        {/* <TimerView appState={appState} /> */}
        <TodoList todoStore={todoStore} />
      </div>
    )
  }
}
