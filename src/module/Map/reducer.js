import { injectLoadingStates, startLoading, finishLoading, errorLoading } from 'utils/loadingStates'

const initialState = injectLoadingStates({
  polylines: [],
  snappedCoordinates: [],
});

export default function event(state = initialState, action) {
  switch (action.type) {

    case 'FILL_POLYLINES': {
      return Object.assign({}, state, {polylines: action.payload.poly})

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