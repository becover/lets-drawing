import { combineReducers } from 'redux';
import canvas from './canvas';
import tools from './tools';
import history from './history';
import drag from './drag';
import text from './text';
import nav from './nav';
import auth from './auth';
import portal from './portal';

const rootReducer = combineReducers({
  canvas,
  tools,
  history,
  drag,
  text,
  nav,
  auth,
  portal,
});

export default rootReducer;
