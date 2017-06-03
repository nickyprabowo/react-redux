import { combineReducers } from 'redux';

import auth from './Auth/reducer';
import data from './Data/reducer';

export default combineReducers({
	auth,
  data
});
