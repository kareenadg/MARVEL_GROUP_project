import styled from 'styled-components';
import { keyframes } from 'styled-components';

const breatheAnimation = keyframes`
 0% {
      transform: rotate(0);
      animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
 50% {
      transform: rotate(900deg);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
 100% { height: 100px; width: 100px; opacity: 0.6; }`;

const SpinnerStyled = styled.span`
  width: 56px;
  height: 56px;
  display: grid;
  border: 4.5px solid #0000;
  border-radius: 50%;
  border-color: #ff0000 #0000;
  animation: spinner-e04l1k 1s infinite linear;
  &::before,
  &::after {
    content: '';
    grid-area: 1/1;
    margin: 2.2px;
    border: inherit;
    border-radius: 50%;
  }
  &::before {
    border-color: #ff0000 #0000;
    animation: inherit;
    animation-duration: 0.5s;
    animation-direction: reverse;
  }

  &::after {
    margin: 8.9px;
  }
  @keyframes spinner-e04l1k {
    100% {
      transform: rotate(1turn);
    }
  }
`;

const Spinner = () => {
  return <SpinnerStyled></SpinnerStyled>;
};

export default Spinner;
