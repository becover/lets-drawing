import { combineReducers } from 'redux';
import canvas from './canvas';
import tools from './tools';
import history from './history';
import drag from './drag';
import text from './text';

const rootReducer = combineReducers({ canvas, tools, history, drag, text });

export default rootReducer;
