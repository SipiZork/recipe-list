import {
  FETCH_RECIPES,
  FETCH_RECIPE
} from './types';
import { getAllRecipesFromDb, getARecipeFromDb } from '../firebase/firebase';

export const getAllRecipes = () => async dispatch => {
  try {
    dispatch({
      type: FETCH_RECIPES,
      payload: await getAllRecipesFromDb()
    })
  } catch (error) {
    console.error(error);
  }
};

export const GetARecipe = (id) => async dispatch => {
  try {
    dispatch({
      type: FETCH_RECIPE,
      payload: await getARecipeFromDb(id)
    })
  } catch (error) {
    console.error(error);
  }
}