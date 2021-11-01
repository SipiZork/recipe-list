import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router';
import { Link } from 'react-router-dom';
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

const App = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  return (
    <StyledContent>
      <GlobalStyle />
      <Navbar />
      <Link to='/add-recipe' className="add-recipe-button" onMouseEnter={(e) => changeSettings(e)} onMouseLeave={() => setTooltipSettings({ ...tooltipSettings, show: false })}>
        <button>+</button>
      </Link>
      <ToolTip text="Recept hozzáadása" tooltipSettings={tooltipSettings} />
      <Switch>
        <Route exact path="/">
          <HomePage />
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
      background-color: ${orangeColorPalette.mango};

      cursor: pointer;
      
      &:hover {
        background-color: ${orangeColorPalette.coral};
      }
    }
  }
`;

export default App;
