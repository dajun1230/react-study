import React from 'react';

class LifeCycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) {
      this.props.onMount.call(this, this);
    }
  }

  componentWillUnmount() {
    if (this.props.onUnmount) {
      this.props.onUnmount.call(this, this);
    }
  }

  render() {
    return null;
  }
}

export default LifeCycle;
