import  {
  ORDER_REQUESTED,
  ORDER_UPDATE,
  ORDER_SUBMIT_REQUESTED,
} from '../constants/order';

export const requestOrder = () => ({ type: ORDER_REQUESTED });
export const updateOrder = order => ({ type: ORDER_UPDATE, order });
export const submitOrder = order => ({ type: ORDER_SUBMIT_REQUESTED, order });
