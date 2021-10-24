import React, { Component } from 'react';

import FieldContext from './FieldContext';

export default class Field extends Component {
  static contextType = FieldContext;

  componentDidMount() {
    const { registerEntity } = this.context;
    this.cancelRegister = registerEntity(this);
  }

  componentWillUnmount() {
    if (this.cancelRegister) {
      this.cancelRegister();
    }
  }

  onStoreChange = () => {
    this.forceUpdate();
  }

  getControlled = () => {
    const { name } = this.props;
    const { setFieldsValue, getFieldValue } = this.context;
    return {
      value: getFieldValue(name),
      onChange: event => {
        const newValue = event.target.value;
        setFieldsValue({
          [name]: newValue
        })
        console.log('newValue', newValue);
      }
    }
  }

  render() {
    const { children, label } = this.props;
    const returnChildNode = React.cloneElement(children, this.getControlled())
    return (
      <div>
        {label}
        {returnChildNode}
      </div>
    );
  }
}
