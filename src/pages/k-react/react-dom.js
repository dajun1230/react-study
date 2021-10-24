// ！vnode 虚拟dom对象
// ！node 真实dom

import { TEXT } from "./const";

// 下一个单元任务
let nextUnitOfWork = null;
// work in progress fiber root (正在运行的根fiber)
let wipRoot = null;

function render(vnode, container) {
  // vnode => node
  const node = createNode(vnode);
  // 再把node插入到container
  container.appendChild(node);
  // console.log("vnode:", vnode, container);
}

function createNode(vnode) {
  const { type, props } = vnode;
  let node = null;
  // 判断节点类型
  if (type === TEXT) {
    node = document.createTextNode("");
  } else if (typeof type === 'string') {
    node = document.createElement(type);
  } else if (typeof type === 'function') {
    // console.log('type.isReactComponent', type.prototype.isReactComponent);
    // 判断是函数组件还是类组件
    node = type.prototype.isReactComponent ? updateClassComponent(vnode) : updateFunctionComponent(vnode);
  } else {
    node = document.createDocumentFragment();
  }

  // 把props.children遍历，转成真实dom节点，再插入node
  reconcileChildren(props.children, node);

  updateNode(node, props);

  return node;
}

// ! 源码children可以是单个对象或者是数组，我们这里统一处理成了数组（在createElement里处理的）
function reconcileChildren(children, node) {
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    if (Array.isArray(child)) {
      for (let j = 0; j < child.length; j++) {
        render(child[j], node);
      }
    } else {
      render(child, node);
    }
  }
}

function updateClassComponent(vnode) {
  // console.log(vnode);
  const { type, props } = vnode;
  let cmp = new type(props);
  const vvnode = cmp.render();
  // 生成node节点
  const node = createNode(vvnode);
  return node;
}

function updateFunctionComponent(vnode) {
  const { type, props } = vnode;
  console.log(type);
  const vvnode = type(props);
  // 生成node节点
  const node = createNode(vvnode);
  return node;
}

// 更新属性值，如className、nodeValue
function updateNode(node, nextVal) {
  Object.keys(nextVal).filter(k => k !== 'children').forEach(k => {
    node[k] = nextVal[k];
  })
}

function performUnitOfWork(fiber) {
  // 执行当前任务
  // 获取下一个子任务（fiber）
  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    // 找到兄弟
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // 没有兄弟，往祖先上找
    nextFiber = nextFiber.return;
  }
}

function workLoop(deadline) {
  // 有下一个任务，并且当前帧没有结束
  // 这里的时间1是模拟，源码当中用的是过期时间和时间单位相关
  while (nextUnitOfWork && deadline.timeRemaining() > 1) {
    // 执行当前任务
    // 获取下一个子任务（fiber）
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  if (!nextUnitOfWork && wipRoot) {
    // 提交

  }

  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

export default {
  render
};
