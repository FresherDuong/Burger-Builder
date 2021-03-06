import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
// import Checkout from './container/Checkout/Checkout';
// import Orders from './container/Orders/Orders';
// import Auth from './container/Auth/Auth';
import { Route, Switch, Redirect } from 'react-router-dom';
import LogOut from './container/Auth/LogOut/LogOut';
import { connect } from 'react-redux';
import * as actionCreator from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

// Lazy load
const asyncCheckout = asyncComponent(() => {
  return import('./container/Checkout/Checkout');
});

const asyncOrder = asyncComponent(() => {
  return import('./container/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./container/Auth/Auth');
});

// Use Switch to load single Route matched at a time, otherwise React will load
// all the routes that tailored "path" in URL
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact={true} component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrder} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={LogOut} />
          <Route path="/" exact={true} component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoLogin: () => dispatch(actionCreator.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
