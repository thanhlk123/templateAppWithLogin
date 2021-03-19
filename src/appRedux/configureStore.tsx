import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

import {rootReducer} from './root';
import sagaMiddleware from "@middleware/sagaMiddleware";
import rootSaga from "../sagas/rootSaga";
import authReducer from "./reducers/authReducer/authReducer";


const logger = createLogger({
  collapsed: true,
  timestamp: false,
  duration: true,
  log: "info",
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
  ],
  timeout: 100000,
  keyPrefix: "",
};

// https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-middleware-to-enable-async-logic
const asyncFunctionMiddleware = storeAPI => next => action => {
  // If the "action" is actually a function instead...
  if (typeof action === 'function') {
    // then call the function and pass `dispatch` and `getState` as arguments
    return action(storeAPI.dispatch, storeAPI.getState)
  }

  // Otherwise, it's a normal action - send it onwards
  return next(action)
}

const middlewareProduction = [sagaMiddleware, asyncFunctionMiddleware];

// const middleware = [
//   ...getDefaultMiddleware({
//     thunk: false,
//     immutableCheck: false,
//     serializableCheck: false,
//   }),
//   epicMiddleware,
//   triggerErrorMiddleware,
// ];

if (__DEV__) {
  middlewareProduction.push(logger);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(
  persistReducer(persistConfig, rootReducer),
  applyMiddleware(...middlewareProduction)
);


sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export {store, persistor};
