import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import Button from '../../components/Button/Button';
import { addRecipeToDb } from '../../firebase/firebase';
import { getAllRecipes } from '../../actions/recipeAction';

const AddRecipePage = () => {

  const dispatch = useDispatch();

  const [recipeElements, setRecipeElements] = useState([{ name: 'só', unit: 'kg', quantity: '1' }]);
  const [recipeName, setRecipeName] = useState('');
  const [addElement, setAddElement] = useState({
    name: '',
    unit: '',
    quantity: ''
  });

  const changeElementSettings = (e) => {
    setAddElement({
      ...addElement,
      [e.target.name]: e.target.value
    });
  }

  const addElementToRecipe = (e) => {
    e.preventDefault();
    const { name, unit, quantity } = addElement;
    setRecipeElements([...recipeElements, { name, unit, quantity }]);
    setAddElementSettingsToZero();
  }

  const setAddElementSettingsToZero = () => {
    setAddElement({
      name: '',
      unit: '',
      quantity: ''
    });
  }

  const changeRecipeName = (e) => {
    setRecipeName(e.target.value);
  }

  const addRecipe = () => {
    addRecipeToDb(recipeName, recipeElements);
    dispatch(getAllRecipes());
  }

  return (
    <StyledAddRecipe>
      <input type="text" name="recipeName" value={recipeName} onChange={(e) => changeRecipeName(e)} />
      <p>Hozzávalók:</p>
      <ul className="element-list">
        {recipeElements.map((element, i) => (
          <li key={i}>
            <p>{element.name}</p>
            <p>{`${element.quantity} ${element.unit}`}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={(e) => addElementToRecipe(e)}>
        <input type="text" name="name" onChange={(e) => changeElementSettings(e)} value={addElement.name} />
        <input type="text" name="quantity" onChange={(e) => changeElementSettings(e)} value={addElement.quantity} />
        <input type="text" name="unit" onChange={(e) => changeElementSettings(e)} value={addElement.unit} />
        <button type="submit">Elemet hozzáadása</button>
      </form>
      <Button onClick={() => addRecipe()}>Recept hozzáadása</Button>
    </StyledAddRecipe>
  )
}

const StyledAddRecipe = styled.div`
  .element-list {
    li {
      display: flex;
      width: 100px;
      justify-content: space-between;
    }
  }
`;

export default AddRecipePage;
