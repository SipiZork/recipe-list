import React from 'react';
import styled from 'styled-components';

const ToolTip = ({ text, tooltipSettings }) => {
  return (
    <StyledToolTip className={tooltipSettings.show ? 'show' : 'hide'} top={tooltipSettings.top} left={tooltipSettings.left}>
      <p>{text}</p>
    </StyledToolTip>
  )
}

const StyledToolTip = styled.div`
  background-color: black;
  color: white;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  position: fixed;
  display: none;
  width: 10rem;
  height: 1rem;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  transform: translate(-70%, -110%);
  pointer-events: none;

  &.show {
    display: flex;
  }
`;

export default ToolTip;