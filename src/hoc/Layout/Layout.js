import React, { Component } from 'react';
import Aux from './../../hoc/Aux/Aux';
import styles from './Layout.module.css';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

// Functional component
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    // Use setState() (like below) based on previous state may lead to unexpected problem,
    // because setState() is asynchronous, we may not get newest previous state
    // this.setState({ showSideDrawer: !this.state.showSideDrawer });

    // Safe way
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token != null,
  };
};

export default connect(mapStateToProps)(Layout);
