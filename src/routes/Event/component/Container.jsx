import React, { Component, PropTypes } from 'react'

import * as DataActions from 'module/Data/action'
import * as AuthActions from 'module/Auth/action'
import createAuthGuardContainer from 'module/Auth/component/createAuthGuardContainer'

import EventPage from './EventPage'

function mapStateToProps(state) {
  const { auth, data } = state

  return {
    ...auth,
    ...data,
  }
}

class Container extends Component {
  static displayName = 'EventContainer'

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
    return (
      <EventPage {...this.props} />
    )
  }
}

export default createAuthGuardContainer(
  mapStateToProps,
  { ...AuthActions, ...DataActions },
)(Container)
