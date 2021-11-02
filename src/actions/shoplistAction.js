import {
  FETCH_SHOPLIST
} from './types';
import { getShopListFromUser, getMainShopListFromUser } from '../firebase/firebase';

export const getShoplist = (id) => async dispatch => {
  try {
    dispatch({
      type: FETCH_SHOPLIST,
      payload: await getShopListFromUser(id)
    })
  } catch (e) {
    console.error(e);
  }
};