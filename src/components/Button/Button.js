import styled from "styled-components";
import { orangeColorPalette } from "../../styles/colors";

const Button = ({ children, onClick }) => {
  return (
    <StyledButton onClick={(e) => onClick(e)}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  min-width: 200px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:3rem;
  font-size: 1.6rem;
  outline: none;
  border: none;
  background-color: ${orangeColorPalette.mango};
  transition: all .25s;
  cursor: pointer;

  :hover {
    box-shadow: 3px 3px 10px ${orangeColorPalette.pastelOrange};
    background-color: ${orangeColorPalette.coral};
    color: white;
  }
`;

export default Button;
