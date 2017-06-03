import axios from 'axios';

const endpoint = 'http://127.0.0.1:8000'

export default {
  fetchAllEvents(limit, offset) {
    const encodedURI = window.encodeURI(`${endpoint}/list/${limit}/${offset}`);

    return axios.get(encodedURI)
  },

  insertEvent(event) {
    const encodedURI = window.encodeURI(`${endpoint}/list/add`);

    return axios.post(encodedURI, { data: event })
  },

  fetchTotalRecords() {
    const encodedURI = window.encodeURI(`${endpoint}/countData`);

    return axios.get(encodedURI)
  }
}