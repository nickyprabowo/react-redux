import React, { Component, PropTypes } from 'react';
import {Form, Button, Input, TextArea} from 'semantic-ui-react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow, Polyline } from 'react-google-maps';

export default class PolylinePath extends Component {
  constructor(props) {
    super(props);
    
  }

  handleClick = () => {
    alert('poly');
  }

  render(){
    //console.log(this.props.snapped)
    return (
      <Polyline
        path={this.props.snapped}
        onClick={this.handleClick}
        options= {{
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 4
        }}
      />
    )
  }
}
