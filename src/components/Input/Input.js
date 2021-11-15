import styled from "styled-components";
import { orangeColorPalette } from "../../styles/colors";

const Input = ({ children, onChange, ElementUseRef, ...props}) => {
  return (
    <StyledInput className="input-group">
      <input {...props} ref={ElementUseRef} onChange={(e) => onChange(e)} />
      <p>{children}</p>
    </StyledInput>
  )
}

const StyledInput = styled.div`
  position: relative;
  height: 2rem;
  width: 100%;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    border: 1px solid ${orangeColorPalette.lightBg};
    padding: 0 1rem;

    &:hover,
    &:focus,
    &:valid {
      border: 2px solid ${orangeColorPalette.darkBg};

      +p {
        top: -.65rem;
        font-size: 1.1rem;
        left: .5rem;
        background-color: white;
      }
    }
  }
  p {
    position: absolute;
    top: .25rem;
    display: flex;
    padding: 0 .25rem;
    left: 1rem;
    font-size: 1.4rem;
    transition: .25s all;
    user-select: none;
    pointer-events: none;
  }
`;

export default Input;
