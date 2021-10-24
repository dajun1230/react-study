import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { Input } from 'antd';

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

@createForm()
class MyRcForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  componentDidMount() {
    this.props.form.setFieldsValue({ username: 'default' });
  }

  submit = () => {
    const { getFieldsValue, validateFields } = this.props.form;
    // console.log('submit', getFieldsValue());
    validateFields((err, val) => {
      if (err) {
        console.log('err', err);
      } else {
        console.log('校验成功', val);
      }
    })
  }

  render() {
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <h3>MyRcForm</h3>
        {getFieldDecorator('username', {
          rules: [nameRules]
        })(<Input placeholder="Username" />)}
        {getFieldDecorator('password', {
          rules: [passwordRules]
        })(<Input placeholder="Password" />)}
        <button onClick={this.submit}>submit</button>
      </div>
    )
  }
}

export default MyRcForm;
