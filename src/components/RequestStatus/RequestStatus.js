import React, { Component } from 'react';
import PropTypes from 'prop-types';

import  {
  ORDER_REQUEST_FAILED,
  ORDER_SUBMIT_REQUESTED,
  ORDER_SUBMIT_FAILED,
  ORDER_SUBMITTED,
} from '../../constants/order';
import { PRODUCTS_REQUEST_FAILED } from '../../constants/products';

import remove from '../../images/remove.png';
import success from '../../images/success.png';

import styles from './RequestStatus.module.css';

export default class RequestStatus extends Component {
  static get propTypes() {
    return {
      orderRequestState: PropTypes.string,
      productsRequestState: PropTypes.string,
    };
  }
  render () {
    const { orderRequestState, productsRequestState } = this.props;
    if(
      orderRequestState ===  ORDER_REQUEST_FAILED ||
      orderRequestState === ORDER_SUBMIT_FAILED ||
      productsRequestState === PRODUCTS_REQUEST_FAILED
      ) {
      return (
        <div className={styles['status-container']}>
          <img src={remove} />
          <span>Sorry, there was an error, please try again</span>
        </div>
      );
    }
    if(orderRequestState === ORDER_SUBMIT_REQUESTED) {
      return (
        <div className={styles['status-container']}>
          <span>Placing your order...</span>
        </div>
      );
    }
    if(orderRequestState === ORDER_SUBMITTED) {
      return (
        <div className={styles['status-container']}>
          <img src={success} />
          <span>Success! your order was placed!</span>
        </div>
      );
    }
    
    return null;
  }
}