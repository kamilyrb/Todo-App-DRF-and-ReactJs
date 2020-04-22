import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
import {registration} from './registrationReducer'
import {taskReducer} from './taskReducer'

const rootReducer = combineReducers({
  authentication,
  registration,
  taskReducer,
});

export default rootReducer;