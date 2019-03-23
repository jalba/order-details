import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ORDER_SUBMIT_REQUESTED, ORDER_SUBMITTED } from '../../constants/order';

import loading from '../../images/loading.gif';
import success from '../../images/success.png';

import styles from './SubmitButton.module.css';

export default class SubmitButton extends Component {
  static get propTypes() {
    return {
      isValid: PropTypes.bool.isRequired,
      onSubmit: PropTypes.func.isRequired,
      submitState: PropTypes.string,
    };
  }

  renderContent() {
    const { submitState } = this.props;
    
    switch(submitState) {
      case ORDER_SUBMIT_REQUESTED:
        return (<img src={loading} />);
      case ORDER_SUBMITTED:
        return (<img src={success} />);
      default:
        return 'Submit Order';
    };

  }

  render() {
    const { isValid, onSubmit } = this.props;

    return (
      <button
        className={styles.button}
        disabled={!isValid}
        onClick={onSubmit}
      >
        {this.renderContent()}
      </button>
    );
  }
}