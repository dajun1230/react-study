import React from 'react';

import FieldContext from './FieldContext';
import useForm from './useForm';

const InternalForm = (props, ref) => {
  // console.log('ref:', ref); // ref: {current: null}
  const { form, children, onFinish, onFinishFailed } = props;

  const [formInstance] = useForm(form);
  formInstance.setCallback({
    onFinish,
    onFinishFailed
  });

  React.useImperativeHandle(ref, () => formInstance);

  return (
    <form onSubmit={event => {
      event.preventDefault();
      formInstance.submit();
    }}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  )
}

// 最开始不考虑类组件中初始化值的写法
// export default function Form({ form, children, onFinish, onFinishFailed }) {
//   const [formInstance] = useForm(form);
//   formInstance.setCallback({
//     onFinish,
//     onFinishFailed
//   });

//   return (
//     <form onSubmit={event => {
//       event.preventDefault();
//       formInstance.submit();
//     }}>
//       <FieldContext.Provider value={formInstance}>
//         {children}
//       </FieldContext.Provider>
//     </form>
//   )
// }

const Form = React.forwardRef(InternalForm);

export default Form;
