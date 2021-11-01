import {
  FETCH_RECIPES,
  FETCH_RECIPE
} from '../actions/types';

const initialState = {
  allRecipes: [],
  actualRecipe: null
};

const recipeReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_RECIPES:
      return {
        ...state,
        allRecipes: payload
      }
    case FETCH_RECIPE:
      return {
        ...state,
        actualRecipe: payload
      }
    default:
      return {
        ...state
      }
  }
};

export default recipeReducer;