import { call, put, takeEvery } from 'redux-saga/effects';

import  {
  ORDER_REQUESTED,
  ORDER_RECEIVED,
  ORDER_REQUEST_FAILED,
  ORDER_UPDATE,
  ORDER_SUBMIT_REQUESTED,
  ORDER_SUBMITTED,
  ORDER_SUBMIT_FAILED,
} from '../constants/order';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const throwError = () => new Promise(() => { throw new Error('Something went wrong') });

// Simulate api call
export function* fetchOrder() {
  const order = {
    "id": "3",
    "customer-id": "3",
    "items": [
      {
        "product-id": "A101",
        "quantity": "2",
        "unit-price": "9.75",
        "total": "19.50"
      },
      {
        "product-id": "A102",
        "quantity": "1",
        "unit-price": "49.50",
        "total": "49.50"
      }
    ],
    "total": "69.00"
  };

  try {
    yield call(delay, 1000);
    // uncomment code below to see the error handling
    // yield call(throwError);
    yield put({ type: ORDER_RECEIVED, order });
  } catch(error) {
    yield put({ type: ORDER_REQUEST_FAILED, error });
  }
}

export function* submitOrder() {
  try {
    yield call(delay, 1000);
    yield put({ type: ORDER_SUBMITTED });
    // uncomment code below to see the error handling
    // yield call(throwError);
  } catch(error) {
    yield put({ type: ORDER_SUBMIT_FAILED, error });
  }
}

export function* watchOrderRequest() {
  yield takeEvery(ORDER_REQUESTED, fetchOrder);
}

export function* watchOrderSubmit() {
  yield takeEvery(ORDER_SUBMIT_REQUESTED, submitOrder);
}
