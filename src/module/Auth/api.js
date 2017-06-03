import axios from 'axios';

const endpoint = 'http://127.0.0.1:8000'

export default {
  checkUser(data) {
    const encodedURI = window.encodeURI(`${endpoint}/user`);

    return axios.post(encodedURI, { data })
  },
}