/* global google */
import api from './api';

export function fillPolylines(poly) {
  return (dispatch) => {
    dispatch({
      type: 'FILL_POLYLINES',
      payload: {
        poly
      }
    });
  };
}

export function getSnapToRoad(pathValues) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_SNAP_TO_ROAD'
    });

    api.fetchSnapToRoad(pathValues)
      .then(response => {
        dispatch(processSnapToRoadResponse(response.data.snappedPoints));
      }, response => {
        dispatch({
          type: 'FETCH_SNAP_TO_ROAD_ERROR'
        });
      });
  };
}

export function processSnapToRoadResponse(snappedPoints) {
  return (dispatch) => {
  
    var snappedCoordinates = [];
    var placeIdArray = [];

    for (var i = 0; i < snappedPoints.length; i++) {
      var latlng = new google.maps.LatLng(parseFloat(snappedPoints[i].location.latitude),parseFloat(snappedPoints[i].location.longitude));
      snappedCoordinates.push(latlng);
      placeIdArray.push(snappedPoints[i].placeId);
    }

    dispatch({
      type: 'FETCH_SNAP_TO_ROAD_SUCCESS',
      payload: {
        snappedCoordinates,
        placeIdArray
      }
    });
  };
}