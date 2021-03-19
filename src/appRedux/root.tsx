import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer/authReducer';
import appStateReducer from './reducers/appStateReducer/index';


export const rootReducer = combineReducers({
  auth: authReducer,
  appState: appStateReducer,
});

