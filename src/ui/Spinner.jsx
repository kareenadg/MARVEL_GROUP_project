import styled from 'styled-components';
import { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
 
 100% {
    transform: rotate(1turn);
  }`;

const SpinnerStyled = styled.span`
  width: 56px;
  height: 56px;
  display: grid;
  border: 4.5px solid #0000;
  border-radius: 50%;
  border-color: #ff0000;
  animation: spinner-e04l1k 1s infinite linear;
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
    animation-name: ${breatheAnimation};
  }
  &::before {
    border-color: #ff0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }
  &::after {
    margin: 8.9px;
    animation-name: ${breatheAnimation};
  }
`;

const Spinner = () => {
  return <SpinnerStyled></SpinnerStyled>;
};

export default Spinner;
