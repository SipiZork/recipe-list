import { useState, useRef } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { orangeColorPalette } from "../../styles/colors";
import Input from "../../components/Input/Input";
import Button from '../../components/Button/Button';
import { changeDone, deleteRecipeFromShoplist, giveToMainShoplist, changeDoneInMainlist, deleteItemFromMainlist } from "../../firebase/firebase";

const Shoplist = () => {

  const ElementUseRef = useRef(null);
  const [piece, setPiece] = useState('');

  const { shoplist, mainShoplist } = useSelector(state => state.shoplist);
  const { currentUser } = useSelector(state => state.user);
  
  const addToMainList = (e, button = false) => {
    if ((e.keyCode === 13 || button) && e.target.value !== '') {
      giveToMainShoplist(piece, currentUser.uid);
      setPiece('');
      ElementUseRef.current.focus();
    }
  }
  
  const filterIt = (name) => {
    deleteItemFromMainlist(mainShoplist.filter(piece => piece.name !== name), currentUser.uid);
  }

  return (
    <StyledShoplist>
      <h3>Bevásárló lista</h3>
      {shoplist !== null ? shoplist.map((recipe, i) => (
        <div className="recipe" key={i}>
          <h5 className="name">
            <Link to={`recipe/${recipe.recipeId}`}>
              <p>{recipe.recipeName.toUpperCase()} - {recipe.dose} adag</p>
            </Link>
            <div className="close" onClick={() => deleteRecipeFromShoplist(recipe.recipeId, currentUser.uid)}>X</div>
          </h5>
          <ul className="peices">
            {recipe.pieces.filter(p => !p.done).map((piece, x) => (
              <li className="piece undone" key={x} onClick={() => changeDone(i,piece.name, currentUser.uid)}>{piece.name}</li>
            ))}
            {recipe.pieces.filter(p => p.done).map((piece, x) => (
              <li className="piece done" key={x} onClick={() => changeDone(i,piece.name, currentUser.uid)}>{piece.name}</li>
            ))}
          </ul>
        </div>
      )) :
      <p>A receptes bevásárló lista üres</p>}
      <div className="main-shoplist">
        <h5 className="name">Recept nélküli beáváslólista</h5>
        {mainShoplist !== null && (
          <ul className="peices">
            {mainShoplist.filter(p => !p.done).map((piece, i) => (
              <li className="piece undone" key={i} onClick={() => changeDoneInMainlist(piece.name, currentUser.uid)}>
                {piece.name}
                <p className="close" onClick={() => filterIt(piece.name) }>X</p>
              </li>
            ))}
            {mainShoplist.filter(p => p.done).map((piece, i) => (
              <li className="piece done" key={i} onClick={() => changeDoneInMainlist(piece.name, currentUser.uid)}>
                {piece.name}
                <p className="close" onClick={() => filterIt(piece.name) }>X</p>
              </li>
            ))}
          </ul>
        )}
      </div>
        <Input type="text" name="piece" value={piece} ElementUseRef={ElementUseRef} required autoComplete="off" onChange={(e) => setPiece(e.target.value)} onKeyDown={(e) => addToMainList(e)}>
          Lista elem
        </Input>
      <Button onClick={(e) => addToMainList(e, true)}>Elem hozzáadása a listához</Button>
    </StyledShoplist>
  )
}

const StyledShoplist = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    text-align: center;
    font-size: 1.5rem;
  }

  .name {
    font-size: 1.4rem;
    width: 100%;
    padding: 1rem 3rem 1rem 1rem;
    background-color: ${orangeColorPalette.lightBg};
    position: relative;

    a {
      text-decoration: none;
      color: black;

      &:hover {
        text-decoration: underline;
      }
    }
    
    .close {
      position: absolute;
      right: 0;
      display:flex;
      justify-content: center;
      align-items: center;
      font-size: 2rem;
      top: 0;
      height: 100%;
      width: 3rem;

      &:hover {
        color: red;
        cursor: pointer;
        user-select: none;
      }
    }
  }
  ul{

    li {
      list-style: none;
      padding: 1rem;
      font-size: 1.1rem;
      user-select: none;
      position: relative;
      &:nth-child(even) {
        background-color: ${orangeColorPalette.lightBg};
      }
      &:nth-child(odd) {
        background-color: ${orangeColorPalette.otherLightBg};
      }
      &.done {
        background-color: rgba(0,170,0,.6);
      }
      .close {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 1.5rem;
        width: 3rem;
        height: 100%;
        justify-content: center;
        align-items: center;
        display: flex;
        cursor: pointer;
        &:hover {
          color: red;
        }
      }
    }
  }
`;

export default Shoplist;
