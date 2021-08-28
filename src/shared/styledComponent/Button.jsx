import styled from 'styled-components';
import {
  Colors,
  setBorder,
  setBoxShadow,
  setMargin,
  setPadding,
} from './functions';
const Button = styled.button`
  font: inherit;
  font-size: ${(props) => (props.fontsize ? props.fontsize : '1.2rem')};
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) =>
    props.padding ? setPadding(props.padding) : setPadding('.5rem,1.5rem')}
    ${(props) =>
    props.border
      ? setBorder({ width: '1px', color: props.border })
      : setBorder({ width: '1px', color: props.bgcolor })};
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) =>
    props.boxShadow ? setBoxShadow() : setBoxShadow(props.boxShadow)}
  border-radius: 4px;
  background: ${(props) => props.bgcolor || Colors.primary};
  color: ${(props) => props.color || Colors.white};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;

  &:focus {
    outline: none;
  }
  &:hover,
  &:active {
    background: ${(props) => props.activecolor || Colors.primaryLight};
    ${setBorder({ width: '1px', color: Colors.primaryDark })};
  }

  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: ${Colors.grey};
    ${setBorder({ width: '1px', color: Colors.greyDark })};
    cursor: not-allowed;
  }
`;

export default Button;
