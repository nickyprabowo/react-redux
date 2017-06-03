import api from 'utils/api';

export function getItems(limit, offset) {
  return (dispatch) => {
    dispatch(itemsCheckLoading(true));

    api.fetchAllEvents(limit,offset)
    .then((response)=>{
      if (response.result) {
        dispatch(itemsCheckLoading(false));
        dispatch(getItemsSuccess(response.data));
        dispatch(countItems());
      } else {
        dispatch(itemsCheckError(true));
      }
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
      if (response.result) {
        dispatch(countData(response.data));
      } else {
        dispatch(itemsCheckError(true));
      }
    });
  };
}

export function countData(count) {
  return {
    type: 'GET_DATA_COUNT',
    payload: {
      totalData: count
    }
  }
}

export function getItemsSuccess(items) {

  return {
    type: 'GET_ITEMS_SUCCESS',
    payload: {
      items
    }
  }
}

export function itemsCheckError(bool) {
  return {
    type: 'ITEMS_HAS_ERROR',
    payload: {
      hasError: bool
    }
  }
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
          dispatch(itemsCheckError(true));
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