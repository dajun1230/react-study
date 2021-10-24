import React, { Component } from 'react';
import { observer } from 'mobx-react';

// step2, 创建视图，以响应状态的变化
// @observer
// class TimeView extends Component {

//   onReset = () => {
//     this.props.appState.resetTimer();
//   };

//   render() {
//     return (
//       <div>
//         <h3>TimeView</h3>
//         <button onClick={this.onReset}>{this.props.appState.timer}</button>
//       </div>
//     )
//   }
// }

const TimeView = observer(({ appState }) => {
  function onReset() {
    appState.resetTimer();
  }
  return (
    <div>
      <h3>TimeView</h3>
      <button onClick={onReset}>{appState.timer}</button>
    </div>
  )
})

export default TimeView;
