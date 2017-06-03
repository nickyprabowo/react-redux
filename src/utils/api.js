import axios from 'axios';

export default {
  fetchAllEvents(limit,offset) {
    const encodedURI = window.encodeURI("http://127.0.0.1:8000/list/"+limit+"/"+offset+"");
    
    return axios.get(encodedURI)
    .then(response => {
      if(response.status == '200')
      return response.data;
    })
    .catch(error => {
      return error;
    });;
  },

  insertEvent(event) {
    const encodedURI = window.encodeURI("http://127.0.0.1:8000/list/add");
    
    return axios.post(encodedURI,{data:event})
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      return error;
    });
  },

  fetchTotalRecords() {
    const encodedURI = window.encodeURI("http://127.0.0.1:8000/countData");
    
    return axios.get(encodedURI)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      //console.log(error);
      return error;
    });
  },

  checkUser(data) {
    const encodedURI = window.encodeURI("http://127.0.0.1:8000/user");
    
    return axios.post(encodedURI,{data:data})
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      return error;
    });
  },
}