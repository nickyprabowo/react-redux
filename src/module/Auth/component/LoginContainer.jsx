import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loadCred, saveCred } from '../../localStorage';

import * as actions from '../action';
import Login from './Login';

function mapStateToProps(state) {
  const { auth } = state;

  if(auth.isLoggedIn === true){
    // save to localStorage
    saveCred(auth);
  }

  return {
    ...auth,
    userAndPass: `${auth.me.username} ${auth.me.password}`
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

class LoginContainer extends Component {

  constructor(props) {
    super(props);
    
  }
  
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
    return <Login {...this.props}/>
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
