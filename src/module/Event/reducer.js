import { injectLoadingStates, startLoading, finishLoading, errorLoading } from 'utils/loadingStates'

const initialState = injectLoadingStates({
  events: [],
  lastItem: null,
  totalData: null,
  editing: false,
  editedData: '',
  optionKey: ''
})

export default function event(state = initialState, action) {
  switch (action.type) {

    case 'FETCH_EVENTS_LIST_REQUEST': {
      return Object.assign({}, startLoading(state))
    }

    case 'FETCH_EVENTS_LIST_SUCCESS': {
      if (!action.payload.data) {
        return state
      }

      return Object.assign({}, finishLoading(state), { events: action.payload.data })
    }

    case 'FETCH_EVENTS_LIST_ERROR': {
      if (action.payload.hasError) {
        return Object.assign({}, errorLoading(state))
      }

      return state
    }

    case 'GET_DATA_COUNT': {
      if (!action.payload.data) {
        return state
      }

      return Object.assign({}, state, {
        totalData: action.payload.data
      })
    }

    case 'SAVE_EVENT_REQUEST': {
      return Object.assign({}, startLoading(state))
    }

    case 'SAVE_EVENT_SUCCESS': {
      if (!action.payload.data) {
        return state
      }

      return Object.assign({}, finishLoading(state))
    }

    case 'SAVE_EVENT_ERROR': {
      if (action.payload.hasError) {
        return Object.assign({}, errorLoading(state))
      }

      return state
    }

    case 'EDITING_DATA': {

      return Object.assign({}, finishLoading(state), { editing: action.payload.editing, editedData: action.payload.item, optionKey: action.payload.kategoriKey })
      
    }

    case 'CANCEL_EDITING_DATA': {

      return Object.assign({}, state, { editing: action.payload.editing, editedData: '' })
      
    }

    default: {
      return state
    }
  }
}