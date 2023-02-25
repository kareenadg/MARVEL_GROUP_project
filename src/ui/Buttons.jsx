import styled from 'styled-components';

//Definir los estilos del Button mediante un template
const ButtonStyled = styled.button`
  background-color: ${({ variant }) => (variant === 'red' ? '#e11b22' : 'transparent')};
  border: ${({ border }) => (border === 'yes' ? '1px solid #e11b22' : 'none')};
  width: fit-content;
  font-family: 'Roboto Condensed';
  font-size: ${({ size }) =>
    size === 'xl'
      ? '2rem'
      : size === 'lg'
      ? '1.5rem'
      : size === 'md'
      ? '1.2rem'
      : '0.9rem'};
  font-weight: 900;
  color: ${({ color }) => (color ? color : 'white')};
  letter-spacing: 3px;
  outline: none;
  padding: 0.9rem 1.6rem;
  text-transform: uppercase;
  transition: 0.5s ease-in-out;
  -webkit-clip-path: polygon(0 0, 0 100%, 100% 100%, 100% 25%, 75% 0);
  clip-path: polygon(3% 0%, 100% 0%, 100% 83%, 96% 100%, 0 100%, 0 15%);
  &:hover {
    background-color: red;
  }
`;

const Button = ({ text, action, variant, color, border, size }) => {
  return (
    <ButtonStyled
      onClick={action}
      variant={variant}
      color={color}
      border={border}
      size={size}
    >
      {text}
    </ButtonStyled>
  );
};

export default Button;
