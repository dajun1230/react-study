import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { login } from "../redux/action/user";

export default connect(
  ({ user }) => ({ isLogin: user.isLogin, loading: user.loading, err: user.err }),
  // {
  //   login: () => ({ type: "LOGIN_SUCCESS" })
  // }
  {
    login
  }
)(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = { name: "" };
    }

    nameChange = e => {
      this.setState({ name: e.target.value });
    };

    render() {
      const { isLogin, location, login, loading, err } = this.props;
      if (isLogin) {
        // 已经登陆的话，从哪儿来的 回哪儿去；找不到从哪儿来，一般情况就回去首页
        const { from = "/" } = location.state || {};
        return <Redirect to={from} />
      }
      // 如果没有登录
      const { name } = this.state;

      return (
        <div>
          <h3>LoginPage</h3>
          <input onChange={this.nameChange} value={name} />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({ name })}>
            {loading ? "loading..." : "click"}
          </button>
        </div>
      )
    }
  }
)

