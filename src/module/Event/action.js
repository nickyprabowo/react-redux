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

export function saveEvent(item) {
  return (dispatch) => {
    dispatch({
      type: 'SAVE_EVENT_REQUEST',
      payload: item
    });

    api.insertEvent(item)
      .then(response => {
        dispatch({
          type: 'SAVE_EVENT_SUCCESS',
          payload: { ...response.data }
        });
      }, response => {
        dispatch({
          type: 'SAVE_EVENT_ERROR'
        });
      });
  };
}

export function editEvent(item, kategoriKey) {
  return (dispatch) => {

    dispatch({
      type: 'EDITING_DATA',
      payload: {
        editing: true,
        kategoriKey,
        item
      }
    });

  };
}

export function cancelEdit() {
  return (dispatch) => {
    dispatch({
      type: 'CANCEL_EDITING_DATA',
      payload: {
        editing: false,
      }
    });

  };
}

export function saveEditEvent(item) {
  return (dispatch) => {
    dispatch({
      type: 'SAVE_EDIT_REQUEST',
      payload: item
    });

    api.insertEvent(item)
      .then(response => {
        dispatch({
          type: 'SAVE_EDIT_SUCCESS',
          payload: { ...response.data }
        });
      }, response => {
        dispatch({
          type: 'SAVE_EDIT_ERROR'
        });
      });
  };
}

