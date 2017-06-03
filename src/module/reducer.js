import { combineReducers } from 'redux';

import auth from './Auth/reducer';
import event from './Event/reducer';

export default combineReducers({
	auth,
  event
});
