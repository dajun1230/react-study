import React, { Component, useEffect } from 'react';
import { Input } from 'antd';

import Form, { Field } from '.';

const nameRules = { required: true, message: '请输入姓名' };
const passwordRules = { required: true, message: '请输入密码' };

// export default function MyRcFieldForm(props) {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     console.log("form", form);
//     form.setFieldsValue({ username: 'default' });
//   }, [])

//   const onFinish = (val) => {
//     console.log('onFinish', val);
//   }

//   const onFinishFailed = (val) => {
//     console.log('onFinishFailed', val);
//   }

//   return (
//     <div>
//       <h3>MyRcFieldForm</h3>
//       <Form
//         form={form}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//       >
//         <Field label="姓名" name="username" rules={[nameRules]}>
//           <Input placeholder="username input placeHolder" />
//           {/* <input type="text" /> */}
//         </Field>
//         <Field label="密码" name="password" rules={[passwordRules]}>
//           <Input placeholder="password input placeHolder" />
//           {/* <input type="text" /> */}
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   )
// }

export default class MyRcFieldForm extends Component {
  formRef = React.createRef();

  componentDidMount() {
    console.log(this.formRef);
    this.formRef.current.setFieldsValue({ username: 'default' });
  }

  onFinish = (val) => {
    console.log('onFinish', val);
  }

  onFinishFailed = (val) => {
    console.log('onFinishFailed', val);
  }

  render() {
    return (
      <div>
        <h3>MyRcFieldForm</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Field label="姓名" name="username" rules={[nameRules]}>
            <Input placeholder="username input placeHolder" />
          </Field>
          <Field label="密码" name="password" rules={[passwordRules]}>
            <Input placeholder="password input placeHolder" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    )
  }
}
