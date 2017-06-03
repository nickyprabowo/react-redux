import api from './api';

export function getEventsList(limit, offset) {
  return (dispatch) => {
    dispatch({
      type: 'FETCH_EVENTS_LIST_REQUEST'
    });

    api.fetchAllEvents(limit, offset)
      .then(response => {
        dispatch({
          type: 'FETCH_EVENTS_LIST_SUCCESS',
          payload: { ...response.data }
        });
      }, response => {
        dispatch({
          type: 'FETCH_EVENTS_LIST_ERROR'
        });
      });
  };
}

//belum kepake mau coba local state dulu
export function setLimit(limit) {
  return {
    type: 'SET_LIMIT',
    payload: {
      limit
    }
  }
}

//belum kepake mau coba local state dulu
export function setOffset(offset) {
  return {
    type: 'SET_OFFSET',
    payload: {
      offset
    }
  }
}

export function countItems() {
  return (dispatch) => {
    api.fetchTotalRecords()
      .then(response => {
        dispatch({
          type: 'GET_DATA_COUNT',
          payload: { ...response.data }
        });
      }, response => {
        dispatch({
          type: 'GET_DATA_COUNT_ERROR'
        });
      });
  };
}

export function itemsCheckLoading(bool) {
  return {
    type: 'ITEMS_IS_LOADING',
    payload: {
      isLoading: bool
    }
  }
}

export function saveItem(item) {
  return (dispatch) => {
    dispatch(itemsCheckLoading(true));

    api.checkUser(item)
      .then(response => {
        if (response.data.result) {
          dispatch(itemsCheckLoading(false));
          dispatch(saveItemSuccess(true));

          return response;
        } else {
          // dispatch(itemsCheckError(true));
        }
      });
  };
}

export function saveItemSuccess(bool) {
  return {
    type: 'SAVE_ITEM_SUCCESS',
    payload: {
      saveSuccess: bool
    }
  }
}