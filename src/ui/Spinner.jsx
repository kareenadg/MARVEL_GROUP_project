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
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
  &:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 8px;
    box-sizing: border-box;
    border: 32px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
    animation-name: ${breatheAnimation};
  }
`;

const Spinner = () => {
  return <SpinnerStyled></SpinnerStyled>;
};

export default Spinner;
