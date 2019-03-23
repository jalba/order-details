import { calculateTotal } from '../utils/decimal';

import  {
  ORDER_REQUESTED,
  ORDER_RECEIVED,
  ORDER_REQUEST_FAILED,
  ORDER_SUBMIT_REQUESTED,
  ORDER_SUBMIT_FAILED,
  ORDER_SUBMITTED,
  ORDER_UPDATE,
} from '../constants/order';

const initialState = { details: {}, requestState: '' };

export const order = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUESTED:
      return Object.assign({}, state, { requestState: ORDER_REQUESTED });
    case ORDER_RECEIVED:
      return Object.assign({}, state, { requestState: ORDER_RECEIVED }, { details: action.order });
    case ORDER_REQUEST_FAILED:
      return Object.assign({}, state, { requestState: ORDER_REQUEST_FAILED });
    case ORDER_UPDATE:
      action.order.total = calculateTotal(action.order.items).toString();
      return Object.assign(
        {},
        state,
        { requestState: ORDER_UPDATE },
        { details: action.order }
      );
    case ORDER_SUBMIT_REQUESTED:
      return Object.assign({}, state, { requestState: ORDER_SUBMIT_REQUESTED });
    case ORDER_SUBMITTED:
      return Object.assign({}, state, { requestState: ORDER_SUBMITTED });
    case ORDER_SUBMIT_FAILED:
      return Object.assign({}, state, { requestState: ORDER_SUBMIT_FAILED })
    default:
      return state;
  }
};
