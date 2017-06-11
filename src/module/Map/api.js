import axios from 'axios';

export default {
  fetchSnapToRoad(pathValues) {
    const encodedURI = window.encodeURI('https://roads.googleapis.com/v1/snapToRoads');

    return axios.get(encodedURI, {
      params: {
        interpolate: true,
        key: 'AIzaSyCZAwTj4LKlmBGwch-4JisDdMKjcTLRbn0',
        path: pathValues.join('|')
      }
    })
  }
}