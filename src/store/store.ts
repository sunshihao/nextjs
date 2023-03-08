import { configureStore } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

import {combineReducers} from "redux";

import chatReducer from './reducers/chat'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
  chat: chatReducer,
  user: userReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware]
})