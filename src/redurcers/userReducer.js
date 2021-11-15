import {
  SET_CURRENT_USER
} from '../actions/types';

const initialState = {
  currentUser: null,
  username: null,
  isLoggedIn: false,
  rank: null,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload.currentUser,
        username: payload.username,
        isLoggedIn: payload.isLoggedIn,
        rank: payload.rank
      }
    default:
      return {
        ...state
      }
  }
}

export default userReducer;