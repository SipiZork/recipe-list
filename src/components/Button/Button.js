import styled from "styled-components";
import { orangeColorPalette } from "../../styles/colors";

const Button = ({ children, onClick, ...props }) => {
  return (
    <StyledButton onClick={(e) => onClick(e)} {...props}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  min-width: ${props => props.widthA ? 0 : 200}px;
  border-radius: .25rem;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height:3rem;
  font-size: 1.6rem;
  outline: none;
  border: none;
  background-color: ${orangeColorPalette.lightBg};
  transition: all .25s;
  cursor: pointer;

  :hover {
    box-shadow: 3px 3px 10px ${orangeColorPalette.darkBg};
    background-color: ${orangeColorPalette.darkBg};
    color: white;
  }
`;

export default Button;
