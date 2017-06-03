import { dispatch } from '../../store';
import { loadCred, deleteCred } from '../localStorage';
import api from '../../utils/api';

export function getAuthStatus(){

  const authStatus = loadCred();

  return {
    type: 'CHECK_PERSISTED_DATA',
    payload: {
      authStatus
    }
  }
}

export function AuthIsLoading(bool){

  return {
    type: 'IS_LOADING',
    payload: {
      isLoading: bool
    }
  }
}

export function loginCheck(username, password) {

  var data = {
    username: username,
    password: password
  }

  return (dispatch) => {
        //dispatch(AuthIsLoading(true));

        api.checkUser(data)
        .then((response)=>{
          if (response.data.result) {
            dispatch(AuthIsLoading(false));
            dispatch(loginSuccess(response.data.username));
            return response;
          }else{
            dispatch(loginHasError(true));
          }
        });
    };
}

export function loginSuccess(item) {

  return {
    type: 'LOGIN_SUCCESS',
    payload: {
      username: item
    }
  }
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

export function loginHasError(bool) {

  return {
    type: 'LOGIN_HAS_ERROR',
    payload: {
      hasError: bool
    }
  }
}
