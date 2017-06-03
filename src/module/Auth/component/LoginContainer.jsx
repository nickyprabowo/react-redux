import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../action';
import Login from './Login';

function mapStateToProps(state) {
  const { auth } = state;

  return {
    ...auth,
    userAndPass: `${auth.me.username} ${auth.me.password}`
  };
}

class LoginContainer extends Component {
  static get propTypes() {
    return {
      isLoggedIn: PropTypes.bool,
      isLoading: PropTypes.bool,
      location: PropTypes.object,

      loginCheck: PropTypes.func,
      logout: PropTypes.func,
    }
  }

  handleLogin = (username, password) => {
    this.props.loginCheck(username, password);
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { isLoggedIn } = this.props

    if (isLoggedIn) {
      return <Redirect to={from} />
    }

    return <Login {...this.props} onSubmit={this.handleLogin} />
  }
}

export default connect(
  mapStateToProps,
  { ...actions }
)(LoginContainer);
