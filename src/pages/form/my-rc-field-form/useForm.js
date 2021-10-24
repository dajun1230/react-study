import React from 'react'

class FormStore {
  constructor() {
    this.store = {}; // 存储数据，比如说username password
    this.fieldEntities = [];
    this.callbacks = {};
  }

  registerEntity = (entity) => {
    this.fieldEntities.push(entity);
    return () => {
      this.fieldEntities.filter(item => item !== entity);
      delete this.store[entity.props.name];
    }
  }

  setCallback = callback => {
    this.callbacks = {
      ...this.callbacks,
      ...callback
    }
  }

  setFieldValue = (name) => {

  };

  setFieldsValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    console.log(this.store);
    console.log(this.fieldEntities);
    // 对应的组件要进行更新
    // 1. 简单处理，所有的组件都进行更新
    // this.fieldEntities.forEach(entity => {
    //   entity.onStoreChange();
    // })

    // 2. 优化后
    this.fieldEntities.forEach(entity => {
      const { name } = entity.props;
      Object.keys(newStore).forEach(key => {
        if (key === name) {
          entity.onStoreChange();
        }
      })
    })
  };

  getFieldValue = (name) => {
    return this.store[name];
  }

  getFieldsValue = () => {
    return this.store;
  }

  validate = () => {
    let err = [];
    // todo
    this.fieldEntities.forEach(entity => {
      const { name, rules } = entity.props;
      let value = this.getFieldValue(name);
      let rule = rules && rules[0];
      if (rule && rule.required && (value === undefined || value === '')) {
        // 出错
        err.push({
          [name]: rule.message,
          value
        })
      }
    })

    return err;
  }

  submit = () => {
    console.log('submit');
    let err = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      // 成功的，执行onFinish
      onFinish(this.getFieldsValue());
    } else if (err.length > 0) {
      // 失败执行onFinishFailed
      onFinishFailed(err);
    }
  }

  getForm() {
    return {
      registerEntity: this.registerEntity,
      setFieldValue: this.setFieldValue,
      setFieldsValue: this.setFieldsValue,
      getFieldValue: this.getFieldValue,
      submit: this.submit,
      setCallback: this.setCallback
    }
  }
}

// 自定义hook
export default function useForm(form) {
  const formRef = React.useRef();
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      // new 一个
      const formStore = new FormStore();
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
