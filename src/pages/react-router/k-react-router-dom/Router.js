import React, { Component } from 'react';

import RouterContext from './Context';

export default class Router extends Component {
  static computeRootMatch(pathname) {
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }

  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location
    }
    // location发生变化，要执行这里的回调
    this.unListen = props.history.listen((location) => {
      this.setState({
        location
      })
    })
  }

  componentWillUnmount() {
    if (this.unListen) {
      this.unListen();
    }
  }

  render() {
    const { history, children } = this.props;
    const { location } = this.state;

    return (
      <RouterContext.Provider value={{
        history,
        location,
        match: Router.computeRootMatch(this.state.location.pathname),
      }}>
        {children}
      </RouterContext.Provider>
    )
  }
}

