import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { bindActionCreators } from '../redux/k-redux/bindActionCreators';
// import { connect } from './k-react-redux';

@connect(
  // mapStateToProps function
  // (state) => ({ count: state.count })
  ({ count }) => ({ count }),
  // mapDispatchToProps object | function
  // object
  // {
  //   add: () => ({ type: "ADD" })
  // },
  // function
  dispatch => {
    // 第一种方式
    // const add = () => dispatch({ type: "ADD" });
    // const minus = () => dispatch({ type: "MINUS" });
    // return { dispatch, add, minus };

    // 第二种方式
    let creators = {
      add: () => ({ type: "ADD" }),
      minus: () => ({ type: "MINUS" })
    }
    creators = bindActionCreators(creators, dispatch);
    return { dispatch, ...creators };
  },
  (stateProps, dispatchProps, ownProps) => {
    return { ...stateProps, ...dispatchProps, ...ownProps, omg: "omg" };
  }
)
class ReactReduxPage extends Component {

  dispatchAdd = () => {
    this.props.dispatch({ type: "ADD" });
  }

  render() {
    console.log('this.props', this.props);
    const { count, add, minus } = this.props;

    return (
      <div>
        <h1>ReduxPage</h1>
        <p>{count}</p>
        <button onClick={this.dispatchAdd}>dispatch add</button>
        <button onClick={add}>add</button>
        <button onClick={minus}>minus</button>
      </div>
    )
  }
}

export default ReactReduxPage;
