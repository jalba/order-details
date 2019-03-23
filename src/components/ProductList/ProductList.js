import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ListItem from '../ListItem/ListItem';

import { ORDER_REQUESTED } from '../../constants/order';
import { PRODUCTS_REQUESTED } from '../../constants/products';

import loading from '../../images/loading.gif';
import add from '../../images/add.png';

import styles from './ProductList.module.css';

export default class ProductList extends Component {
  static get propTypes() {
    return {
      order: PropTypes.object.isRequired,
      orderRequestState: PropTypes.string.isRequired,
      products: PropTypes.array.isRequired,
      productsRequestState: PropTypes.string.isRequired,
      updateOrder: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.findItemIndex = this.findItemIndex.bind(this);
    this.filterProducts = this.filterProducts.bind(this);
  }

  addItem() {
    const { order, updateOrder } = this.props;
    order.items.push({
      'product-id': '',
      'quantity': '1',
      'unit-price': '0',
      'total': '0',
    });
    updateOrder(order);
  }

  filterProducts(item) {
    const { order, products } = this.props;
    const filteredItems = order.items.filter(el => el['product-id'] !== item['product-id']);
    return products.filter(product => {
      return filteredItems.every(fi => fi['product-id'] !== product.id); 
    })
  }

  findItemIndex(id) {
    const { order } = this.props;
    
    return order.items.reduce((acc, item, index) => {
      if(item['product-id'] === id) {
        return index;
      }
      return acc;
    });
  }

  removeItem(id) {
    const { order, updateOrder } = this.props;
    const index = this.findItemIndex(id);
    order.items.splice(index, 1);
    updateOrder(order);
  }

  updateItem(item) {
    const { order, updateOrder } = this.props;
    order[this.findItemIndex(item['product-id'])] = item;
    updateOrder(order);
  }

  render() {
    const { order, orderRequestState, products, productsRequestState } = this.props;
    const items = order.items || [];
    const orderLoaded = orderRequestState && orderRequestState !== ORDER_REQUESTED;
    const prodLoaded = productsRequestState && productsRequestState !== PRODUCTS_REQUESTED;

    if (!orderLoaded || !prodLoaded) {
      return (
        <img className={styles.loading} src={loading} />
      );
    }

    return (
      <div>
        <ul className={styles.list}>
          {
            items.map((item, idx) => {
              const editOptions = this.filterProducts(item);
              return (
                <ListItem
                  editOptions={editOptions}
                  item={item}
                  key={idx}
                  products={products}
                  removeItem={this.removeItem}
                  updateItem={this.updateItem}
                />
              );
            })
          }
        </ul>
        <div className={styles.add} onClick={this.addItem}>
          <img className={styles['add-icon']} src={add} />
          <span className={styles['add-text']}>Add another item</span>
        </div>
        <div className={styles.total}>
          {`Total: ${order.total}` }
        </div>
      </div>
    );
  }
}
