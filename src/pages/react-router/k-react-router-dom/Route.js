import React, { Component } from 'react';

import RouterContext from './Context';
import matchPath from './matchPath';

export default class Route extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const { location } = context;
          const { children, component, render, path, computedMatch } = this.props;
          // const match = location.pathname === path;
          const match = computedMatch ? computedMatch :
            path ? matchPath(location.pathname, this.props) : context.match;
          const props = {
            ...context,
            match
          }
          // return match ? React.createElement(component, props) : null;

          // match children, component, render, null
          // 不match children (function), null
          return (
            // 这里最外层在嵌套一层RouterContext的原因是，当存在路由嵌套时，能够准确的获得参数，不写则一直都是computeRootMatch所对应的值
            <RouterContext.Provider value={props}>
              {
                match ?
                  (children ?
                    (typeof children === 'function' ? children(props) : children)
                    : component ? React.createElement(component, props)
                      : render ? render(props) : null)
                  : (typeof children === 'function' ? children(props) : null)
              }
            </RouterContext.Provider>
          )
        }
        }
      </RouterContext.Consumer>
    )
  }
}
