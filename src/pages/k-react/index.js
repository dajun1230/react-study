import { TEXT } from './const';

// 创建react element
function createElement(type, config, ...children) {
  if (config) {
    delete config.__self;
    delete config.__source;
  }

  // 这个地方我们自己写的没有考虑细节，如果key、ref等
  const props = {
    ...config,
    children: children.map(child => typeof child === 'object' ? child : createTextNode(child))
  }

  return {
    type,
    props
  }
}

function createTextNode(text) {
  return {
    type: TEXT,
    props: {
      children: [],
      nodeValue: text
    }
  }
}

export default {
  createElement
};
