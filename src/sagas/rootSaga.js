import { all } from 'redux-saga/effects';

import { watchOrderRequest, watchOrderSubmit } from './orderSaga';
import { watchProductsRequest } from './productsSaga';

export default function* rootSaga() {
  yield all([
    watchOrderRequest(),
    watchOrderSubmit(),
    watchProductsRequest()
  ]);
}