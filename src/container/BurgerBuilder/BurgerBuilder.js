import React, { Component } from 'react';
import Aux from './../../hoc/Aux/Aux';
import Burger from './../../components/Burger/Burger';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from './../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from './../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionCreator from './../../store/actions/index';

// const INGREDIENT_PRICE = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

class BurgerBuilder extends Component {
  // We could use constructor to initialize "state"
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  // Initialize "state"
  state = {
    // ingredients: null,
    // totalPrice: 4,
    purchasable: true,
    purchasing: false,
    // loading: false,
    // error: false,
  };

  componentDidMount() {
    // axios
    //   .get('https://burgerbuilder-c97a5.firebaseio.com/ingredients.json')
    //   .then((res) => {
    //     this.setState({ ingredients: res.data });
    //   })
    //   .catch((err) => {
    //     this.setState({ error: true });
    //   });
    this.props.onInitIngredient();
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // // alert('Continue !');
    // // Endpoint firebase "/order" but need add .json to be correct
    // this.setState({ loading: true });
    // const order = {
    //   ingredients: this.state.ingredients,
    //   total: this.state.totalPrice,
    // };
    // axios
    //   .post('/order.json', order)
    //   .then((res) => {
    //     // console.log(res);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((err) => {
    //     this.setState({ loading: false, purchasing: false });
    //   });

    // alert('Continue !');
    // const queryParams = [];
    // queryParams.push(`price=${this.props.price}`);
    // // for..in: loop through attributes of object
    // for (let i in this.state.ingredients) {
    //   queryParams.push(
    //     `${encodeURIComponent(i)}=${encodeURIComponent(
    //       this.state.ingredients[i]
    //     )}`
    //   );
    // }
    // const query = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: `?${query}`,
    // });

    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  };

  updatePurchaseState(ingredients) {
    // turn object into array and sum
    // const ingredients = { ...this.state.ingredients };
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        return ingredients[ingKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      });

    this.setState({ purchasable: sum > 0 });
  }

  // Should write arrow function because "this" in arrow function always point to current
  // location where it was defined. Where as "this" in normal function depends on who call this
  // function

  // // Arrow function allows access correctly "this.state.ingredients"
  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const priceAddition = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;

  //   // setState() does not immediately mutate this.state but creates a pending state transition.
  //   // setState() is asynchronous
  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });

  //   // When we call setState, it doesn't set state immediately
  //   // call this.updatePurchaseState() with updatedIngredients to make sure we updatePurchaseState ;
  //   // with newest state
  //   this.updatePurchaseState(updatedIngredients);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }

  //   const updatedCount = oldCount - 1;
  //   const updatedIngredients = { ...this.state.ingredients };
  //   updatedIngredients[type] = updatedCount;

  //   const priceDeduction = INGREDIENT_PRICE[type];
  //   const oldPrice = this.state.totalPrice;
  //   const newPrice = oldPrice - priceDeduction;

  //   this.setState({
  //     ingredients: updatedIngredients,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchaseState(updatedIngredients);
  // };

  render() {
    const disableInfo = {
      ...this.props.ings,
    };

    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Can't fetch burger data !</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disableInfo={disableInfo}
            purchasable={this.state.purchasable}
            price={this.props.price}
            isAuth={this.props.isAuthenticated}
            order={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    // if (this.state.loading) {
    //   orderSummary = <Spinner />;
    // }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(actionCreator.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(actionCreator.removeIngredient(ingName)),
    onInitIngredient: () => dispatch(actionCreator.initIngredient()),
    onInitPurchase: () => dispatch(actionCreator.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actionCreator.setAuthRedirectPath(path)),
  };
};

// connect()() to connect Redux store to React
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
