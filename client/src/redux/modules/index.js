import { combineReducers } from 'redux';
import canvas from './canvas';
import history from './history';

const rootReducer = combineReducers({ canvas, history });

export default rootReducer;
