import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom';

import * as authActions from '../action.js'

const combineMapStateToProps = mapStateToProps => state => {
  const { auth } = state
  const newProps = {
    ...auth,
    rawAuthObject: auth,
  }

  return Object.assign({}, newProps, mapStateToProps(state))
}

export default function createAuthGuardContainer(
  mapStateToProps,
  actionCreators,
  options = {}
) {
  return (DecoratedComponent) => {
    class AuthGuardContainer extends Component {
      static get propTypes() {
        return {
          getAuthStatus: PropTypes.func,
          isLoggedIn: PropTypes.bool,
          location: PropTypes.object,
          rawAuthObject: PropTypes.object,
        }
      }

      componentWillMount() {
        this.props.getAuthStatus()
      }

      render() {
        const { isLoggedIn } = this.props;

        if (!isLoggedIn) {
          return <Redirect to={{
            pathname: '/login',
            state: { from: this.props.location }
          }} />;
        }

        return (
          <div>
            <DecoratedComponent {...this.props} />
          </div>
        );
      }
    }

    return withRouter(connect(
      combineMapStateToProps(mapStateToProps),
      { ...actionCreators, ...authActions }
    )(AuthGuardContainer))
  }
}
