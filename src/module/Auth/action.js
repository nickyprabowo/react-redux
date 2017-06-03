import { loadCred, saveCred, deleteCred } from '../localStorage';
import api from 'utils/api';

export function getAuthStatus() {
  const authStatus = loadCred();

  return {
    type: 'CHECK_PERSISTED_DATA',
    payload: {
      authStatus
    }
  }
}

export function loginCheck(username, password) {
  const data = {
    username: username,
    password: password
  }

  return dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST'
    });

    api.checkUser(data)
    .then(response => {
      if (response.data.result) {
        saveCred({
          isLoggedIn: true,
          username: response.data.username,
        }, s => {
          // eslint-disable-next-line no-console
          console.info('Saving credentials...', s)
        })

        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: { ...response.data }
        });

        return response;
      }
    }, error => {
      dispatch({
        type: 'LOGIN_ERROR'
      });
    });
  };
}

export function logout(username, password) {
  deleteCred();

  return {
    type: 'LOGOUT',
    payload: {
      username,
      password
    }
  }
}
