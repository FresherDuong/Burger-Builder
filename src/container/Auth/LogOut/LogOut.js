import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreator from './../../../store/actions/index';

class LogOut extends Component {
  componentDidMount() {
    this.props.onLogOut();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => dispatch(actionCreator.logOut()),
  };
};

export default connect(null, mapDispatchToProps)(LogOut);
