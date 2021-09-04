import styled, { keyframes } from 'styled-components';

import spiral from '../../img/spiral.png';
import {
  setMargin,
  setPadding,
  setSingleMargin,
  setSinglePadding,
} from './functions';

export const rotate = keyframes`
0% {transform:rotate(0deg)}
100% {transform:rotate(720deg)}`;

const Slider = styled.input.attrs((props) => ({
  id: props.id,
  type: 'range',
  min: props.min,
  max: props.max,
  name: props.name,
  value: props.value,
  onChange: props.onChange,
}))`
  width: 100%;
  opacity: 0.8;
  height: 1rem;
  outline: none;
  cursor: pointer;
  appearance: none;
  border-radius: 0.5rem;
  background: #d3d3d3;
  transition: opacity 0.2s, transform 1s;

  ${(props) => props.margin && setMargin(props.margin)};
  ${(props) => props.padding && setPadding(props.padding)};
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}

  &:hover {
    opacity: 1;
  }
  &:hover::-webkit-slider-thumb {
    transform: rotate(720deg);
  }
  &:hover::-moz-range-thumb {
    transform: rotate(720deg);
  }
  &::-webkit-slider-thumb {
    appearance: none;
    border: 0;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    border-radius: 100%;
    transition: transform 1s;
    background: url(${spiral}) center/cover no-repeat;
  }

  &::-moz-range-thumb {
    border: 0;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    appearance: none;
    border-radius: 100%;
    transition: transform 1s;
    -webkit-appearance: none;
    background: url(${spiral}) center/cover no-repeat;
  }
`;

export default Slider;
