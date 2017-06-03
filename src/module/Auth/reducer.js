import { loadState, saveState } from '../../module/localStorage';

const initialState = {
	me : {
    username: '',
    password: ''
  },
  isLoggedIn: false,
  isLoading: false,
  hasError: false
};

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return Object.assign({}, state, { isLoading: true })
    }

    case 'LOGIN_SUCCESS': {

      if (!action.payload) {
        return state;
      }

      return Object.assign({}, state, {
        me: {
          username: action.payload.username
        },
        isLoggedIn: true
      })

    }

    case 'LOGIN_HAS_ERROR': {
      if(action.payload.hasError){
        return Object.assign({}, state, {
          hasError: true
        })
      }else{
        return state;
      }
    }

    case 'IS_LOADING': {

      if(action.payload.isLoading){
        return Object.assign({}, state, {
          isLoading: true
        })
      }else{
        return state
      }
      
    }

    case 'CHECK_PERSISTED_DATA': {
      if(action.payload.authStatus === true){
        return Object.assign({}, state, { isLoggedIn: true })
      }
      else return state;
      
    }

    case 'LOGOUT': {
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        me: {
          username: '',
          password: ''
        },
        isLoggedIn: false
      })
    }

    default: {
      return state;
    }
  }
}