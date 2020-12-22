import { combineReducers } from 'redux';
import * as auth from './auth/authRedux';
import { all } from 'redux-saga/effects';
import { customersSlice } from './customers/customersSlice';
import { roomsSlice } from './rooms/roomsSlice';

export const rootReducer = combineReducers({
  auth: auth.reducer,
  customers: customersSlice.reducer,
  rooms: roomsSlice.reducer
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
