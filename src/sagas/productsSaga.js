import { call, put, takeEvery } from 'redux-saga/effects';

import {
  PRODUCTS_REQUESTED,
  PRODUCTS_RECEIVED,
  PRODUCTS_REQUEST_FAILED,
} from '../constants/products';

const delay = (ms) => new Promise(res => setTimeout(res, ms));
const throwError = () => new Promise(() => { throw new Error('Something went wrong') });

// Simulate api call
export function* fetchProducts() {
  const products = [
    {
      "id": "A101",
      "description": "Screwdriver",
      "category": "1",
      "price": "9.75"
    },
    {
      "id": "A102",
      "description": "Electric screwdriver",
      "category": "1",
      "price": "49.50"
    },
    {
      "id": "B101",
      "description": "Basic on-off switch",
      "category": "2",
      "price": "4.99"
    },
    {
      "id": "B102",
      "description": "Press button",
      "category": "2",
      "price": "4.99"
    },
    {
      "id": "B103",
      "description": "Switch with motion detector",
      "category": "2",
      "price": "12.95"
    }
  ];

  try {
    yield call(delay, 1000);
    // uncomment code below to see the error handling
    // yield call(throwError);
    yield put({ type: PRODUCTS_RECEIVED, products });
  } catch(error) {
    yield put({ type: PRODUCTS_REQUEST_FAILED, error });
  }
}

export function* watchProductsRequest() {
  yield takeEvery(PRODUCTS_REQUESTED, fetchProducts);
}
