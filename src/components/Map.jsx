import React, { Component } from 'react';

const SEARCH_BOX = 

export default class Map extends Component {

  constructor(props){
    super();
    this.state = { 
      zoom: 10 ,
      initialCenter: { lng: -90.1056957, lat: 29.9717272 }
    };
  }

  static propTypes() {
    initialCenter: React.PropTypes.objectOf(React.PropTypes.number).isRequired
  }

  render() {
    return (
      <div id='map' style={{height: `400px`}}>

      </div>
    )
  }

  componentDidMount() {
    new window.google.maps.Map(document.getElementById('map'),{
     center: this.state.initialCenter,
     zoom: this.state.zoom,
     zoomControl: true,
     zoomControlOptions: {
      position: window.google.maps.ControlPosition.RIGHT_BOTTOM
     },
     scrollwheel: true,
     streetViewControl: false,
     mapTypeControl: false,
     mapTypeId: 'roadmap',
    });
  }

  
}


