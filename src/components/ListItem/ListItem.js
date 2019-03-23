import React, { Component } from 'react';
import PropTypes from 'prop-types';
import big from 'big.js';

import edit from '../../images/edit.png';
import remove from '../../images/remove.png';

import styles from './ListItem.module.css';

export default class ListItem extends Component {
  static get propTypes() {
    return {
      editOptions: PropTypes.array.isRequired,
      item: PropTypes.object,
      products: PropTypes.array.isRequired,
      removeItem: PropTypes.func.isRequired,
      updateItem: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.findProduct = this.findProduct.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.updateItem = this.updateItem.bind(this);

    this.state = { editMode: !Boolean(props.item['product-id']) };
  }

  findProduct(id) {
    const { products } = this.props;
    // could use Array.prototype.find here
    // but not supported by IE
    return products.reduce((acc, product) => {
       if (product.id === id) return product;
       return acc;
    });
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  updateItem(e) {
    const { item } = this.props;
    const value = e.target.value;
    const field = e.target.name;
    let product;
    if (field === 'qty') {
      item.quantity = value;
      item['total'] = big(item['unit-price']).times(item.quantity).toFixed(2).toString();
    } else {
      product = this.findProduct(value);
      item['product-id'] = value;
      item['unit-price'] = product.price;
      item['total'] = big(product.price).times(item.quantity).toString();
    }
    this.props.updateItem(item);
  }

  renderQuantity() {
    const { item } = this.props;
    const { editMode } = this.state;

    return (
      <span className={styles['add-qty']} >
          <label htmlFor="qty">Qty</label>
          {
            editMode && item['product-id'] ?
              (
                <input
                  name="qty"
                  onChange={this.updateItem}
                  required
                  type="number"
                  value={item.quantity || 1}
                />
              ) :
              (
                <span className={styles.quantity}>{item.quantity}</span>
              )
          }
        </span>
    );
  }

  renderDescription() {
    const { item, editOptions } = this.props;
    const { editMode } = this.state;
    const details = this.findProduct(item['product-id']);
   
    if (!item['product-id']) {
      editOptions.unshift({
        description: 'Please select a product',
        id: '',
      });
    }
    
    return (
      editMode ?
        (
          <select value={item['product-id']} onChange={this.updateItem}>
            {
              editOptions.map(op => {
                return (
                  <option key={op.id} value={op.id}>
                    {op.description}
                  </option>
                );
              })
            }
          </select>
        ) :
        (details.description)

    );
  }

  renderEdit() {
    const { item, removeItem } = this.props;
    const { editMode } = this.state;
    const disabled = !Boolean(item['product-id']);
    const textClasses = `${styles['edit-text']} ${disabled ? styles.disabled : ''}`;
    const clickHandler = disabled ? () => {} : this.toggleEditMode;

    return (
      <span className={styles.edit}>
        <span className={styles['edit-button']} onClick={clickHandler}>
         {
           editMode ?
             (<span className={textClasses}>done</span>) :
             (<img src={edit} />)
         }
        </span>
        <span onClick={() => removeItem(item['product-id'])}>
          <img src={remove} />
        </span>
      </span>
    );
  }

  render() {
    const { item } = this.props;

    return (
      <li className={styles['list-item']}>
        {this.renderDescription()}
        <span className={styles.total}>
          {item.total}
        </span>
        {this.renderEdit()}
        {this.renderQuantity()}
      </li>
    );
  }
}