import {
  FETCH_SHOPLIST
} from '../actions/types';

const initialState = {
  shoplist: null,
  isLoading: true,
};

const shoplistReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SHOPLIST:
      return {
        ...state,
        shoplist: payload,
        isLoading: false,
      }
    default:
      return {
        ...state
      }
  }
};

export default shoplistReducer;