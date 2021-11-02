import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { orangeColorPalette } from "../../styles/colors";
import { changeDone, deleteRecipeFromShoplist } from "../../firebase/firebase";

const Shoplist = () => {

  const { shoplist } = useSelector(state => state.shoplist);
  return (
    <StyledShoplist>
      <h3>Bevásárló lista</h3>
      {shoplist !== null ? shoplist.map((recipe, i) => (
        <div className="recipe" key={i}>
          <h5 className="name">
            <Link to={`recipe/${recipe.recipeId}`}>
              <p>{recipe.recipeName.toUpperCase()} - {recipe.dose} adag</p>
            </Link>
            <div className="close" onClick={() => deleteRecipeFromShoplist(recipe.recipeId)}>X</div>
          </h5>
          <ul className="peices">
            {recipe.pieces.filter(p => !p.done).map((piece, x) => (
              <li className="piece undone" key={x} onClick={() => changeDone(i,piece.name)}>{piece.name}</li>
            ))}
            {recipe.pieces.filter(p => p.done).map((piece, x) => (
              <li className="piece done" key={x} onClick={() => changeDone(i,piece.name)}>{piece.name}</li>
            ))}
          </ul>
        </div>
      )) :
    <p>A bevásárló lista üres</p>}
    </StyledShoplist>
  )
}

const StyledShoplist = styled.div`
  width: 80vw;
  display: flex;
  flex-direction: column;
  gap: .5rem;

  h3 {
    text-align: center;
    font-size: 1.5rem;
  }

  .name {
    font-size: 1.4rem;
    width: 100%;
    padding: .5rem;
    background-color: ${orangeColorPalette.peach};
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
      &:nth-child(even) {
        background-color: ${orangeColorPalette.pastelOrange};
      }
      &:nth-child(odd) {
        background-color: ${orangeColorPalette.brightOramge};
      }
      &.done {
        background-color: rgba(0,170,0,.6);
      }
    }
  }
`;

export default Shoplist;
