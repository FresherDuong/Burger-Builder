import * as actionTypes from './actionTypes';
import axios from './../../axios-order';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  };
};

export const setIngredient = (ingredient) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredient,
  };
};

export const fetchIngredientFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get('https://burgerbuilder-c97a5.firebaseio.com/ingredients.json')
      .then((res) => {
        dispatch(setIngredient(res.data));
      })
      .catch((err) => {
        dispatch(fetchIngredientFailed());
      });
  };
};
