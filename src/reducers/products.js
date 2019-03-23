import {
  PRODUCTS_REQUESTED,
  PRODUCTS_RECEIVED,
  PRODUCTS_REQUEST_FAILED,
} from '../constants/products';

const initialState = { list: [], requestState: '' };

export const products = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCTS_REQUESTED:
      return Object.assign({}, state, { requestState: PRODUCTS_REQUESTED });
    case PRODUCTS_RECEIVED:
      return Object.assign(
        {},
        state,
        { requestState: PRODUCTS_RECEIVED },
        { list: action.products }
      );
    case PRODUCTS_REQUEST_FAILED:
      return Object.assign({}, state, { requestState: PRODUCTS_REQUEST_FAILED });
    default:
      return state;
  }
};
