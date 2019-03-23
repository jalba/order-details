import { createStore, combineReducers, applyMiddleware } from "redux";
import { order } from './order';
import { products } from './products';

import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    order,
    products
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function configureStore() {
  return store;
}
