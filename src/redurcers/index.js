import { combineReducers } from "redux";
import recipeReducer from './recipeReducer';
import shoplistReducer from "./shoplistReducer";

const RootReducer = combineReducers({
  recipe: recipeReducer,
  shoplist: shoplistReducer
});

export default RootReducer;