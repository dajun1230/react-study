import React from 'react';

// 表单
import CustomForm from './pages/form';
// redux
import ReduxPage from './pages/redux/ReduxPage';
// react-redux
import ReactReduxPage from './pages/react-redux/ReactReduxPage';
// react-redux-hook
import ReactReduxHookPage from './pages/react-redux/ReactReduxHookPage';
// redux-hooks-page
import ReduxHooksPage from './pages/react-redux/ReduxHooksPage';
// react-router-page
import ReactRouterPage from './pages/react-router/ReactRouterPage';
// react-mobx-6-page
// import ReactMobx6Page from './pages/react-mobx-6/ReactMobxPage';
// react-mobx-5-page
import ReactMobx5Page from './pages/react-mobx-5/ReactMobxPage';

export default function App() {
  return (
    <div>
      {/* <CustomForm /> */}
      {/* <ReduxPage /> */}
      {/* <ReactReduxPage /> */}
      {/* <ReactReduxHookPage /> */}
      {/* <ReduxHooksPage /> */}
      {/* <ReactRouterPage /> */}
      {/* <ReactMobx6Page /> */}
      <ReactMobx5Page />
    </div>
  )
}
