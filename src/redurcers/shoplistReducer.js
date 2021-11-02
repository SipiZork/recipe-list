import {
  FETCH_SHOPLIST
} from '../actions/types';

const initialState = {
  shoplist: null,
  mainShoplist: null,
  isLoading: true,
};

const shoplistReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SHOPLIST:
      return {
        ...state,
        shoplist: payload.shoplist,
        mainShoplist: payload.mainShoplist,
        isLoading: false,
      }
    default:
      return {
        ...state
      }
  }
};

export default shoplistReducer;