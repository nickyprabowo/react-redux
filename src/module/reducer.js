import { combineReducers } from 'redux';

import auth from './Auth/reducer';
import event from './Event/reducer';
import map from './Map/reducer';

export default combineReducers({
	auth,
  event,
  map
});
