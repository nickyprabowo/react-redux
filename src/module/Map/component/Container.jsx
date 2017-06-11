import React, { Component } from 'react'
import PropTypes from 'prop-types'

import createAuthGuardContainer from 'module/Auth/component/createAuthGuardContainer'
import * as MapActions from '../action'

import MapEditor from './MapEditor'

function mapStateToProps(state) {
  const { map } = state

  return {
    ...map,
  }
}

class Container extends Component {
  static displayName = 'MapContainer'

  render() {
    return (
      <MapEditor {...this.props} />
    )
  }
}

export default createAuthGuardContainer(
  mapStateToProps,
  { ...MapActions },
)(Container)
