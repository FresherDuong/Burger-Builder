import * as actionTypes from './../actions/actionTypes';
import { updateObject } from './../../shared/utility';

// Reducer only run sync task, not perform async here !

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
  purchasable: false,
};

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const updatePurchaseState = (ingredients) => {
  // turn object into array and sum
  // const ingredients = { ...this.state.ingredients };
  const sum = Object.keys(ingredients)
    .map((ingKey) => {
      return ingredients[ingKey];
    })
    .reduce((sum, el) => {
      return sum + el;
    });

  return sum > 0;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredients = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
      });
      const updatedProperties = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true,
        purchasable: updatePurchaseState(updatedIngredients),
      };

      return updateObject(state, updatedProperties);

    case actionTypes.REMOVE_INGREDIENT:
      const updatedIngs = updateObject(state.ingredients, {
        [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
      });
      const updatedProps = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName],
        building: true,
        purchasable: updatePurchaseState(updatedIngs),
      };

      return updateObject(state, updatedProps);

    case actionTypes.SET_INGREDIENT:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese,
          meat: action.ingredients.meat,
        },
        error: false,
        totalPrice: 4,
        building: false,
      });

    case actionTypes.FETCH_INGREDIENT_FAILED:
      return updateObject(state, { error: true });

    default:
      return state;
  }
};

export default reducer;
