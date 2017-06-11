import { injectLoadingStates, startLoading, finishLoading, errorLoading } from 'utils/loadingStates'

const initialState = injectLoadingStates({
  events: [],
  lastItem: null,
  totalData: null
});

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

      return state;
    }

    case 'FILL_POLYLINES': {
      return Object.assign({}, {polylines: action.payload.poly})

    }

    case 'FETCH_SNAP_TO_ROAD': {
      return Object.assign({}, startLoading(state))
    }

    case 'FETCH_SNAP_TO_ROAD_SUCCESS': {
      if (!action.payload) {
        return state
      }

      return Object.assign({}, finishLoading(state), { snappedCoordinates: action.payload.snappedCoordinates, placeIdArray: action.payload.placeIdArray })
    }

    case 'FETCH_SNAP_TO_ROAD_ERROR': {
      if (action.payload.hasError) {
        return Object.assign({}, errorLoading(state))
      }

      return state;
    }

    default: {
      return state;
    }
  }
}