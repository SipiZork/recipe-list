import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import GlobalStyle from './components/GlobalStyle';
import HomePage from './pages/HomePage/HomePage';
import AddRecipePage from './pages/AddRecipePage/AddRecipePage';
import Recipe from './pages/Recipe/Recipe';
import Navbar from './components/Navbar/Navbar';
import Shoplist from './pages/Shoplist/Shoplist';
import ToolTip from './components/ToolTip/ToolTip';
import { getAllRecipes } from './actions/recipeAction';
import { orangeColorPalette } from './styles/colors';
import styled from 'styled-components';
import SignInSignUp from './pages/SignInSignUp/SignInSignUp';
import { createUserProfileDocument } from './firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { setCurrentUser } from './actions/userAction';
import { onSnapshot } from 'firebase/firestore';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLoggedIn } = useSelector(state => state.user);
  const [tooltipSettings, setTooltipSettings] = useState({
    top: 0,
    left: 0,
    show: false
  });

  const changeSettings = (e) => {
    const { top, left } = e.target.getBoundingClientRect();
    setTooltipSettings({
      ...tooltipSettings,
      top,
      left,
      show: true
    });
  }

  useEffect(async () => {
    dispatch(getAllRecipes());
    (async () => {
      const auth = getAuth();
        onAuthStateChanged(auth, user => {
          if (user) {
            const { currentUser } = auth;
            dispatch(setCurrentUser(currentUser));
            history.push('/');
          } else {
            dispatch(setCurrentUser(null));
          }
        })
      })()
  }, [dispatch]);

  return (
    <StyledContent>
      <GlobalStyle />
      <Navbar />
      {isLoggedIn &&
        <Link to='/add-recipe' className="add-recipe-button" onMouseEnter={(e) => changeSettings(e)} onMouseLeave={() => setTooltipSettings({ ...tooltipSettings, show: false })}>
          <button>+</button>
        </Link>
      }
      <ToolTip text="Recept hozzáadása" tooltipSettings={tooltipSettings} />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/signinsignup">
          <SignInSignUp />
        </Route>
        <Route path="/add-recipe">
          <AddRecipePage />
        </Route>
        <Route path="/recipe/:id">
          <Recipe />
        </Route>
        <Route path="/shoplist">
          <Shoplist />
        </Route>
      </Switch>
    </StyledContent>
  );
}

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  .add-recipe-button {
    position: fixed;
    right: 1rem;
    bottom: 1rem;
    text-decoration: none;
    button {
      font-size: 3rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      outline: none;
      border: none;
      transition: all .25s;
      background-color: ${orangeColorPalette.lightBg};

      cursor: pointer;
      
      &:hover {
        background-color: ${orangeColorPalette.darkBg};
      }
    }
  }
`;

export default App;
