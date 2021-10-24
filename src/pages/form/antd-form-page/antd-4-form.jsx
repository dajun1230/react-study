import React, { Component, useEffect } from 'react';
import { Input, Button } from 'antd';
import Form, { Field } from 'rc-field-form';

const nameRules = { required: true, message: "请输入姓名！" };
const passwordRules = { required: true, message: "请输入密码！" };

export default class AntdFormPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    console.log(this.formRef)
    this.formRef.current.setFieldsValue({ username: 'default' });
  }

  onReset = () => {
    this.formRef.current.resetFields();
  }

  onFinish = val => {
    console.log('onFinish', val);
  }

  onFinishFailed = val => {
    console.log('onFinishFailed', val);
  }

  render() {
    return (
      <div>
        <h3>AntdFormPage</h3>
        <Form
          ref={this.formRef}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
          onReset={this.onReset}
        >
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="username input placeHolder" />
          </Field>
          <Field name="password" rules={[passwordRules]}>
            <Input placeholder="password input placeHolder" />
          </Field>
          <Field>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Field>
          <Field>
            <Button type="default" htmlType="reset">
              Reset
            </Button>
          </Field>
        </Form>
      </div>
    )
  }
}

// export default function AntdFormPage() {
//   const [form] = Form.useForm();

//   useEffect(() => {
//     form.setFieldsValue({ username: 'default' });
//   }, [])

//   const onReset = () => {
//     this.formRef.current.resetFields();
//   }

//   const onFinish = val => {
//     console.log('onFinish', val);
//   }

//   const onFinishFailed = val => {
//     console.log('onFinishFailed', val);
//   }

//   return (
//     <div>
//       <h3>AntdFormPage</h3>
//       <Form
//         form={form}
//         onFinish={onFinish}
//         onFinishFailed={onFinishFailed}
//         onReset={onReset}
//       >
//         <Field name="username" rules={[nameRules]} >
//           <Input placeholder="username input placeHolder" />
//         </Field>
//         <Field name="password" rules={[passwordRules]}>
//           <Input placeholder="password input placeHolder" />
//         </Field>
//         <Field>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Field>
//         <Field>
//           <Button type="default" htmlType="reset">
//             Reset
//           </Button>
//         </Field>
//       </Form>
//     </div>
//   )
// }
