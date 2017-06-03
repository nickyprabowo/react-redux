import React, { Component, PropTypes } from 'react'

import createAuthGuardContainer from 'module/Auth/component/createAuthGuardContainer'
import * as AuthActions from 'module/Auth/action'
import * as EventActions from '../action'

import EventPage from './EventPage'

function mapStateToProps(state) {
  const { auth, event } = state

  return {
    ...auth,
    ...event,
  }
}

class Container extends Component {
  static displayName = 'EventContainer'

  static propTypes = {
    //
  }

  render() {
    return (
      <EventPage {...this.props} />
    )
  }
}

export default createAuthGuardContainer(
  mapStateToProps,
  { ...AuthActions, ...EventActions },
)(Container)
