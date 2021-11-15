import { getUserDatas } from '../firebase/firebase';
import {
  SET_CURRENT_USER
} from './types';

export const setCurrentUser = (user) => async dispatch => {
  let currentUser = user;
  let isLoggedIn = false;
  let username = null;
  let rank = null;
  if (currentUser !== null) {
    let datas = await getUserDatas(user.uid)
    username = datas.username;
    rank = datas.rank;
    isLoggedIn = true;
  }
  try {
    dispatch({
      type: SET_CURRENT_USER,
      payload: {currentUser, isLoggedIn, username, rank}
    })
  } catch (error) {
    console.error(error);
  }
}  