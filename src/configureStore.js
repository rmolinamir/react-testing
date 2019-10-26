// Libraries
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

export const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware(...middlewares);

export default createStore(rootReducer, createStoreWithMiddleware);
