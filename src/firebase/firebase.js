import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, getDoc, doc, updateDoc, setDoc, onSnapshot } from 'firebase/firestore';

const { REACT_APP_FIREBASE_API_KEY } = process.env;

const firebaseApp = initializeApp({
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: "recipe-book-da4b8.firebaseapp.com",
  projectId: "recipe-book-da4b8",
  storageBucket: "recipe-book-da4b8.appspot.com",
  messagingSenderId: "759631470408",
  appId: "1:759631470408:web:c125ca0472a3b186655d7d",
  measurementId: "G-RZM8NYX8MG"
});

export const getAllRecipesFromDb = async () => {
  const recipes = [];
  try {
    const querySnapshot = await getDocs(collection(db, 'recipes'));
    querySnapshot.forEach((doc) => {
      recipes.push({ data: doc.data(), id: doc.id });
    });
  } catch (e) {
    console.error(e);
  }

  return recipes;
}

export const getARecipeFromDb = async (id) => {
  let recipe = null;
  try {
    const querySnapshot = await getDoc(doc(db, 'recipes', id));
    recipe = { data: querySnapshot.data(), id: id };
  } catch (e) {
    console.error(e);
  }
  return recipe;
}

export const addRecipeToDb = async (name, pieces, steps) => {
  const newRecipeRef = doc(collection(db, 'recipes'));
  await setDoc(newRecipeRef, { name, pieces, steps });
}

export const getShopListFromUser = async (id) => {
  let shoplist = null;
  let mainShoplist = null;
  let returnValues = {
    shoplist: null,
    mainShoplist: null,
  };
  try {
    const querySnapshot = await getDoc(doc(db, 'users', id));
    shoplist = querySnapshot.data().shoplist;
    mainShoplist = querySnapshot.data().mainShoplist;
  } catch (e) {
    console.error(e);
  }
  if (shoplist.length > 0) {
    returnValues.shoplist = shoplist;
  }
  if (mainShoplist.length > 0) {
    returnValues.mainShoplist = mainShoplist;
  }
  return returnValues;
}

export const getMainShopListFromUser = async (id) => {
  let mainShoplist = null;
  try {
    const querySnapshot = await getDoc(doc(db, 'users', id));
    mainShoplist = querySnapshot.data().mainShoplist;
  } catch (e) {
    console.error(e);
  }
  if (mainShoplist.length > 0 && mainShoplist[0] !== "") {
    return mainShoplist;
  } else {
    return null;
  }
}

export const changeDone = async (i, name, id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const shoplistRef = doc(db, 'users', id);
  let { shoplist } = querySnapshot.data();
  shoplist[i].pieces.map(piece => {
    if (piece.name === name) {
      piece.done = !piece.done;
    }
  });
  /*shoplist[i].pieces[x].done = !shoplist[i].pieces[x].done;*/
  updateDoc(shoplistRef, {shoplist});
}

export const changeDoneInMainlist = async (name, id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const shoplistRef = doc(db, 'users', id);
  let { mainShoplist } = querySnapshot.data();
  mainShoplist.map(piece => {
    if (piece.name === name) {
      piece.done = !piece.done;
    }
  });
  updateDoc(shoplistRef, {mainShoplist});
}

export const deleteItemFromMainlist = async (newList, id) => {
  const shoplistRef = doc(db, 'users', id);
  updateDoc(shoplistRef, {mainShoplist: newList});
}

export const deleteRecipeFromShoplist = async (deleteId, id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const shoplistRef = doc(db, 'users', id);
  let { shoplist } = querySnapshot.data();
  updateDoc(shoplistRef, { shoplist: shoplist.filter(recipe => recipe.recipeId !== deleteId) });
}

export const giveToShopList = async (pieces, recipeId, recipeName, dose, id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const shoplistRef = doc(db, 'users', id);
  let { shoplist } = querySnapshot.data();
  let newPieces = [];
  pieces.map(element => {
    newPieces.push({
      name: ` ${element.quantity * (dose / 4)} ${element.unit} ${element.name}`,
      done: false
    })
  })
  if (shoplist.some(e => e.recipeId === recipeId)) {
    for (let i = 0; i < shoplist.length; i++) {
      if (shoplist[i].recipeId === recipeId) {
        shoplist[i].pieces = newPieces;
      } 
    } 
  } else {
    shoplist.push({ recipeId, recipeName, dose, pieces: newPieces})
  }
  updateDoc(shoplistRef, {shoplist});
}

export const giveToMainShoplist = async (piece, id) => {
  const querySnapshot = await getDoc(doc(db, 'users', id));
  const shoplistRef = doc(db, 'users', id);
  let { mainShoplist } = querySnapshot.data();
  mainShoplist.push({name: piece, done: false});
  updateDoc(shoplistRef, { mainShoplist });
}

export const getUserDatas = async (id) => {
  try {
    const userRef = doc(db, 'users', id);
    const snapShot = await getDoc(userRef);
    return {
      username: snapShot.data().name,
      rank: snapShot.data().rank
    }
  } catch (e) {
    console.error(e);
  }
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  const userRef = doc(db, 'users', userAuth.uid);
  const snapShot = await getDoc(userRef);
  if (!snapShot.exists) {
    const { email, username } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.setDoc({
        username,
        email,
        createdAt,
        shoplist: [],
        mainShoplist: [],
        ...additionalData
      });
    } catch (e) {
      return e.message;
    }
  }
  return userRef;
}

export const db = getFirestore();

export default firebaseApp;