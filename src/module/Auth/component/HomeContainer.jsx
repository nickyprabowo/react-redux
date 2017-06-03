import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Route } from 'react-router-dom';

import * as AuthActions from '../action';
import * as DataActions from '../../Data/action';
import Home from '../../../components/Home';
import AddReport from '../../../components/AddReport';
import ReportList from '../../../components/ReportList';

function mapStateToProps(state) {
  const { auth,data } = state;

  return {
    ...auth,
    ...data,
    position: 'home'
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, AuthActions, DataActions), dispatch)
}

class HomeContainer extends Component {
  
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

  componentDidMount() {

  }

  render() {
    return (
      <Home {...this.props} />
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer);
