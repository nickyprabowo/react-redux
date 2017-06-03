import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createAuthGuardContainer from 'module/Auth/component/createAuthGuardContainer'
import * as EventActions from '../action'

import EventPage from './EventPage'

function mapStateToProps(state) {
  const { event } = state

  return {
    ...event,
  }
}

class Container extends Component {
  static displayName = 'EventContainer'

  render() {
    return (
      <EventPage {...this.props} />
    )
  }
}

export default createAuthGuardContainer(
  mapStateToProps,
  { ...EventActions },
)(Container)
