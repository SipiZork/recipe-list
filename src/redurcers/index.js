import { combineReducers } from "redux";
import recipeReducer from './recipeReducer';
import shoplistReducer from "./shoplistReducer";
import userReducer from "./userReducer";

const RootReducer = combineReducers({
  recipe: recipeReducer,
  shoplist: shoplistReducer,
  user: userReducer,
});

export default RootReducer;