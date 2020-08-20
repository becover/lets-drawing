import { combineReducers } from 'redux';
import canvas from './canvas';
import history from './history';
import drag from './drag';
import text from './text';

const rootReducer = combineReducers({ canvas, history, drag, text });

export default rootReducer;
