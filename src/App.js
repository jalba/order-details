import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductList from './components/ProductList/ProductList';
import SubmitButton from './components/SubmitButton/SubmitButton';
import RequestStatus from './components/RequestStatus/RequestStatus';

import { requestOrder, updateOrder, submitOrder } from './actions/order';
import { requestProducts } from './actions/products';

import { validateItems } from './utils/validationUtils';

import styles from './App.module.css';

class App extends Component {
  static get propTypes() {
    return {
      fetchOrder: PropTypes.func.isRequired,
      fetchProducts: PropTypes.func.isRequired,
      order: PropTypes.object.isRequired,
      orderRequestState: PropTypes.string.isRequired,
      placeOrder: PropTypes.func.isRequired,
      products: PropTypes.array.isRequired,
      productsRequestState: PropTypes.string.isRequired,
      updateOrder: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.handleUpdate = this.handleUpdate.bind(this);

    this.state = { isOrderValid: true };
  }

  componentDidMount() {
    const { fetchOrder, fetchProducts } = this.props;

    fetchOrder();
    fetchProducts();
  }

  handleUpdate(order) {
    const isOrderValid = validateItems(order.items);
    this.setState({ isOrderValid }, () => {
      this.props.updateOrder(order);
    });
  }

  render() {
    const {
      order,
      orderRequestState,
      placeOrder,
      products,
      productsRequestState,
    } = this.props;

    return (
      <div className={styles.app}>
        <header className={styles['app-header']}>
         <h1>Order Details</h1>
        </header>
        <div className={styles['order-status']}>
          <RequestStatus
            orderRequestState={orderRequestState}
            productsRequestState={productsRequestState}
          />
          <SubmitButton
            isValid={this.state.isOrderValid}
            onSubmit={placeOrder}
            submitState={orderRequestState}
          />
        </div>
        <div>
          <ProductList
            order={order}
            orderRequestState={orderRequestState}
            products={products}
            productsRequestState={productsRequestState}
            updateOrder={this.handleUpdate}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  order: state.order.details,
  orderRequestState: state.order.requestState,
  products: state.products.list,
  productsRequestState: state.products.requestState,
});

const mapDispatchToProps = dispatch => ({
  fetchOrder: () => dispatch(requestOrder()),
  fetchProducts: () => dispatch(requestProducts()),
  placeOrder: order => dispatch(submitOrder(order)),
  updateOrder: order => dispatch(updateOrder(order)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
