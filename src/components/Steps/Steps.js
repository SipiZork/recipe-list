import { useState } from 'react';
import styled from "styled-components";
import { orangeColorPalette } from "../../styles/colors";

const Steps = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(1);

  const changeActiveStep = (step) => {
    setActiveStep(step);
  }
  return (
    <StyledSteps>
      {steps.map((step, i) => (
        <li key={i} onClick={() => changeActiveStep(i+1)} className={activeStep === i+1 ? 'active' : ''}>{`${i+1}. ${step}`}</li>
      ))}
    </StyledSteps>
  )
}

const StyledSteps = styled.ul`
  li {
    padding: 1rem;
    font-size: 1.1rem;
    list-style: none;
    user-select: none;
    transition: .25s all;
    &:nth-child(even) {
      background-color: ${orangeColorPalette.pastelOrange};
    }
    &:nth-child(odd) {
      background-color: ${orangeColorPalette.brightOramge};
    }
    &:hover,
    &.active {
      background-color: ${orangeColorPalette.neonOrange};
      color: white;
      padding: 1rem 1.25rem;
    }
  }
`;

export default Steps;