import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from './../../UI/Button/Button';

class OrderSumary extends Component {
  // Check for rerendering
  // componentDidUpdate() {
  //   console.log('[OrderSummary]: componentDidUpdate()');
  // }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingKey) => (
        <li key={ingKey}>
          <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>:{' '}
          {this.props.ingredients[ingKey]}
        </li>
      )
    );

    return (
      <Aux>
        <h3>Your order</h3>
        <p>Delicious burger with following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total price: <strong>{this.props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout ?</p>
        <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
          CANCEL
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

export default OrderSumary;
