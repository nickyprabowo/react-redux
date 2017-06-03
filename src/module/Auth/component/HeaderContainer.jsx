import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../action';
import Header from './Header';

function mapStateToProps(state) {
  const { auth } = state;

  return {
    ...auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class HeaderContainer extends Component {
  
  static propTypes = {
    me: PropTypes.shape({
      username: PropTypes.string,
      password: PropTypes.string,
    }),
    userAndPass: PropTypes.string,
    isLoggedIn: PropTypes.bool,

    login: PropTypes.func,
    logout: PropTypes.func,
  }

  render() {
    return <Header {...this.props}/>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderContainer);
