import { createStore } from 'redux';
import chatReducer from './reducers/chatReducer';

const store = createStore(chatReducer);
export default store;
