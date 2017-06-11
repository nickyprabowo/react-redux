/* global google */
import React, { Component, PropTypes } from 'react';
import {Form, Button, Input, TextArea} from 'semantic-ui-react';

import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

export default class PopupWindow extends Component {

  constructor(props) {
    super(props)

  }

  render(){
    return (
      <InfoWindow 
        position={new google.maps.LatLng(this.props.overlayPosition.lat,this.props.overlayPosition.lng)}
        onCloseClick={this.props.onInfoWindowClose}>
        <div>hahalalsadkimkaenm</div>
      </InfoWindow>
    )
  }
}