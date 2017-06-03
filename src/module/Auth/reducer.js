import { injectLoadingStates, startLoading, finishLoading, errorLoading } from 'utils/loadingStates'

const initialState = injectLoadingStates({
	me : {
    username: ''
  },
  isLoggedIn: false,
  isLoading: false,
  hasError: false
});

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST': {
      return Object.assign({}, startLoading(state))
    }

    case 'LOGIN_SUCCESS': {
      if (!action.payload) {
        return state;
      }

      return Object.assign({}, finishLoading(state), {
        me: {
          username: action.payload.username
        },
        isLoggedIn: true
      })
    }

    case 'LOGIN_ERROR': {
      if (action.payload.hasError) {
        return Object.assign({}, errorLoading(state))
      }

      return state;
    }

    case 'CHECK_PERSISTED_DATA': {
      if (!action.payload.authStatus.isLoggedIn) {
        return state
      }

      return auth(state, {
        type: 'LOGIN_SUCCESS',
        payload: action.payload
      })
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