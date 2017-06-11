/* global google */

import { default as React, Component } from 'react';
import { withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';

import {Button} from 'semantic-ui-react';

import SearchBox from 'react-google-maps/lib/places/SearchBox';
import DrawingManager from 'react-google-maps/lib/drawing/DrawingManager';
import OverlayMenu from './OverlayMenu';
import PopupWindow from './InfoWindow';
import PolylinePath from './Polyline';

const INPUT_STYLE = {
  boxSizing: `border-box`,
  MozBoxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `300px`,
  height: `35px`,
  marginTop: `20px`,
  padding: `0 12px`,
  borderRadius: `1px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
};

const MapInstance = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
    mapTypeControl='false'
  >

    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_CENTER}
      onPlacesChanged={props.onPlacesChanged}
      inputPlaceholder="Search a place"
      inputStyle={INPUT_STYLE}
    />

    <DrawingManager
      defaultDrawingMode={google.maps.drawing.OverlayType.POLYLINE}
      defaultOptions={{
        drawingControl: true,
        drawingControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
          drawingModes: [
            google.maps.drawing.OverlayType.POLYLINE,
          ],
        },
        polylineOptions: {
          clickable: true,
          geodesic: true
        }
      }}
      onPolylineComplete={props.onPolylineComplete}
      >

    </DrawingManager>

    {props.showMenu && (
      <OverlayMenu setting={props} />
    )}

    {props.showInfo && (
      <PopupWindow {...props} />
    )}    

    <PolylinePath {...props} />

  </GoogleMap>
));

export default class MapEditor extends Component {

  state = {
    bounds: null,
    center: {
      lat: -6.175176,
      lng: 106.828535,
    },
    markers: [],
    routes: [],
    route: '',
    showMenu: false,
    showInfo: false,
    overlay: {
      lat: '',
      lng: ''
    }
  };

  handleMapMounted = this.handleMapMounted.bind(this);
  handleBoundsChanged = this.handleBoundsChanged.bind(this);
  handleSearchBoxMounted = this.handleSearchBoxMounted.bind(this);
  handlePlacesChanged = this.handlePlacesChanged.bind(this);
  getCoordinates = this.getCoordinates.bind(this);
  getPixelPositionOffset = this.getPixelPositionOffset.bind(this);

  handleMapMounted(map) {
    this._map = map;
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this._map.getBounds(),
      center: this._map.getCenter(),
    });
  }

  handleSearchBoxMounted(searchBox) {
    this._searchBox = searchBox;
  }

  handlePlacesChanged() {
    const places = this._searchBox.getPlaces();

    // Add a marker for each place returned from search bar
    const markers = places.map(place => ({
      position: place.geometry.location,
    }));

    // Set markers; set map center to first search result
    const mapCenter = markers.length > 0 ? markers[0].position : this.state.center;

    this.setState({
      center: mapCenter,
    });
  }

  handleOverlayInput = (kategori) => {
    
    // merge kategori and routes 
    var routeInstance = {
      type: kategori,
      position: this.state.route,
    }

    //push to temporary array
    var routeToSave = this.state.routes.concat(routeInstance);

    this.setState({
      showMenu: false,
      showInfo: true,
      routes: routeToSave, //move route Object to routes and then
      route: '' // make route empty
    });

  }

 /* extractCoordinates = (coordinate) => {
    var trim = coordinate.slice(1, -1).replace(' ','');
    var extract = trim.split(',');

    return extract;
  }*/

  getCoordinates(event){
    var loc = event.getPath();
    var len = loc.getLength();
    var location = event.getPath().getAt(len-1).toString();
    var trim = location.slice(1, -1).replace(' ','');
    var extract = trim.split(',');
    /*var coordinates = []; 

    //iterate through array of locations
    for(var i=0; i <= len-1; i++){
      coordinates.push(event.getPath().getAt(i).toString());
    }*/

    //filling in the polylines
    var paths = [];
    paths.push(event);
    this.props.fillPolylines(paths);
    
    this.setState({
      showMenu: true,
      overlay: { // overlay position
        lat: extract[0],
        lng: extract[1]
      },
      /*route: coordinates*/ //store to state
    }, () => {
      this.snapToRoad(loc);
    });
  }

  snapToRoad = (route) => {
    
    var pathValues = [];
    for (var i = 0; i < route.getLength(); i++) {
      pathValues.push(route.getAt(i).toUrlValue());
    }

    this.props.getSnapToRoad(pathValues);
  }

  getPixelPositionOffset(width, height){
    return { x: -(width / 2), y: -(height / 2) };
  }

  onInfoWindowClose = () => {
    this.setState({
      showInfo: false
    })
  }

  check = () => {
    console.log(this.props.snappedCoordinates)
  }

  render() {
    return (
      <div style={{height: `400px`}}>
        <MapInstance
          containerElement={
            <div style={{ height: `100%` }} />
          }
          mapElement={
            <div style={{ height: `100%` }} />
          }
          center={this.state.center}
          onMapMounted={this.handleMapMounted}
          onBoundsChanged={this.handleBoundsChanged}
          onSearchBoxMounted={this.handleSearchBoxMounted}
          bounds={this.state.bounds}
          onPlacesChanged={this.handlePlacesChanged}
          markers={this.state.markers}

          onPolylineComplete={this.getCoordinates}
          showMenu={this.state.showMenu}
          showInfo={this.state.showInfo}
          overlayPosition={this.state.overlay}
          overlayInput={this.handleOverlayInput}

          routes={this.state.routes}
          onCheck = {this.check}
          onInfoWindowClose = {this.onInfoWindowClose}
          snapped = {this.props.snappedCoordinates}
        />
      </div>
    );
  }
}