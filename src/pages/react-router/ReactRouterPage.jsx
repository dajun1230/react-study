import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, useRouteMatch, useHistory, useLocation, useParams, withRouter, Redirect, Prompt } from 'react-router-dom';

// import { BrowserRouter, Switch, Route, Link, useRouteMatch, useHistory, useLocation, useParams, withRouter, Redirect, Prompt } from './k-react-router-dom';

import HomePage from '../basic/HomePage';
import LoginPage from '../basic/LoginPage';
import UserPage from '../basic/UserPage';
import _404Page from '../basic/_404Page';
import PrivateRoute from '../basic/PrivateRoute';

export default function ReactRouterPage() {
  return (
    <div>
      <BrowserRouter>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登陆</Link>
        <Link to="/product/123">商品</Link>

        <Switch>
          <Route
            exact
            path="/"
            // children={children}
            component={HomePage}
          // render={render}
          />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/product/:id" component={Product} />
          <Route component={_404Page} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

function children(props) {
  console.log("children props", props);
  return <div>children</div>;
}

function render(props) {
  console.log("render props", props);
  return <div>render</div>;
}

@withRouter
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirm: true
    }
  }

  render() {
    console.log("props", this.props);
    const { params, url } = this.props.match;
    const { id } = params;
    return (
      <div>
        <h1>Search - {id}</h1>
        {/* <Link to={url + "/detail"}>详情</Link>
        <Route path={url + "/detail"} component={Detail}></Route> */}
        <button onClick={() => this.setState({ confirm: false })}>change</button>
        <Prompt
          when={this.state.confirm}
          message="Are you sure you want to leave?"
        // message={location => {
        //   return "Are you sure you want to leave-func"
        // }}
        />
      </div>
    )
  }
}

// function Product() {
//   const match = useRouteMatch();
//   const history = useHistory();
//   const location = useLocation();
//   const _params = useParams();

//   console.log("hhhh", history, location, match, _params);

//   const { params, url } = match;
//   const { id } = params;
//   return (
//     <div>
//       <h1>Search - {id}</h1>
//       <Link to={url + "/detail"}>详情</Link>
//       <Route path={url + "/detail"} component={Detail}></Route>
//     </div>
//   )
// }

function Detail() {
  return (
    <div>
      <h3>详情页面</h3>
    </div>
  )
}


// class HomePage extends Component {
//   render() {
//     return (
//       <Redirect
//         to={{
//           pathname: '/user'
//         }}
//       />
//     )
//   }
// }
