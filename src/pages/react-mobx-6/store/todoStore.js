import { makeObservable, observable, configure, action, computed, autorun } from 'mobx';

// 不允许在外部修改状态
// configure({ enforceActions: "observed" });

class TodoStore {
  todos = [
    {
      id: "0",
      // 标记任务是否完成
      finished: true,
      // 定义任务名
      title: "任务0"
    },
    {
      id: "1",
      // 标记任务是否完成
      finished: true,
      // 定义任务名
      title: "任务1"
    },
    {
      id: "2",
      // 标记任务是否完成
      finished: false,
      // 定义任务名
      title: "任务2"
    }
  ];

  constructor() {
    makeObservable(this, {
      todos: observable,
      unfinishedCount: computed,
      change: action
    })
  }

  get unfinishedCount() {
    return this.todos.filter(todo => !todo.finished).length;
  }

  change(todo) {
    todo.finished = !todo.finished;
  }
}

const todoStore = new TodoStore();

autorun(() => {
  console.log('剩余任务：' + todoStore.unfinishedCount + "个");
})

export default todoStore;
