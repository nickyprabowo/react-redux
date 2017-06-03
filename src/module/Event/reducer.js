import { injectLoadingStates, startLoading, finishLoading, errorLoading } from 'utils/loadingStates'

const initialState = injectLoadingStates({
  events: [],
  lastItem: null,
  saveSuccess: false,
  totalData: null,
  tableLimit: 5,
  tableOffset: 0
});

export default function event(state = initialState, action) {
  switch (action.type) {
    case 'SET_LIMIT': {
      return Object.assign({}, state, {
        tableLimit: action.payload.limit
      });
    }

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

      return state;
    }

    case 'GET_DATA_COUNT': {
      if (!action.payload.data) {
        return state
      }

      return Object.assign({}, state, {
        totalData: action.payload.data
      });
    }

    /*case 'SET_OFFSET': {
        return Object.assign({}, state, {
            tableOffset: action.payload.offset
          });
    }

    case 'ITEMS_HAS_ERROR': {
        return Object.assign({}, state, {
            itemsHasError: true
          });
    }*/

    case 'SAVE_ITEM_SUCCESS': {
      return Object.assign({}, state, {
        saveSuccess: action.payload.saveSuccess
      });
    }

    default: {
      return state;
    }
  }
}