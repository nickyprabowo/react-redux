const initialState = {
    items: [],  
    lastItem: null,
    itemsHasError: false,
    itemsIsLoading: false,
    itemsIsLoaded: false,
    saveSuccess: false,
    totalData: null,
    tableLimit: 5,
    tableOffset: 0
};

export default function Data(state = initialState, action) {
    switch (action.type) {

        case 'SET_LIMIT': {
            return Object.assign({}, state, {
                tableLimit: action.payload.limit
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

        case 'ITEMS_IS_LOADING': {
            if(action.payload.itemsIsLoading){
                return Object.assign({}, state, {
                    itemsIsLoading: true
                });
            }else{
                return state;
            }
        }

        case 'GET_ITEMS_SUCCESS': {
            
            return Object.assign({}, state, {
                itemsIsLoaded: true,
                items: action.payload.items
            });
            
        }

        case 'GET_DATA_COUNT': {
            if(action.payload.totalData != null){
                return Object.assign({}, state, {
                    totalData: action.payload.totalData
                });
            }
        }

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