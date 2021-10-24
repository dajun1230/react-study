import React from 'react';
import { Button } from 'antd';

import Antd3Form from './antd-form-page/antd-3-form';
import Antd4Form from './antd-form-page/antd-4-form';
import MyRcFormField from './my-rc-field-form/MyRcFieldForm';
import MyRcForm from './my-rc-form/MyRcForm';

export default function App() {
  return (
    <div>
      <h1>表单模块</h1>
      {/* antd 4.x表单 */}
      {/* <Antd4Form /> */}
      {/* 自定义 4.x 表单 */}
      {/* <MyRcFormField /> */}

      {/* antd 3.x表单 */}
      {/* <Antd3Form /> */}
      {/* 自定义 3.x 表单 */}
      <MyRcForm />
    </div>
  )
}
