import styled from 'styled-components';

import { Colors } from './variables';
import spiral from '../../img/spiral.png';
import { setBoxShadow } from './functions';

export const Checkbox = styled.input.attrs((props) => ({
  id: props.id,
  type: 'checkbox',
  name: props.name,
  value: props.value,
  checked: props.checked,
  onChange: props.onChange,
}))`
  outline: none;
  cursor: pointer;
  appearance: none;
  position: relative;
  display: inline-block;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  /* background */
  &:before {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    text-align: center;
    transition: all 0.3s;
    border: 1px solid black;
    background-color: ${Colors.greyDark};
    color: ${Colors.white};
    content: '${(props) => props.inactive}';
    line-height: ${(props) => props.height}px;
    font-size: ${(props) => props.height / 2}px;
    border-radius: ${(props) => props.height}px;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
  }

  /* spinner */
  &:after {
    top: 1px;
    left: 1px;
    content: '';
    display: block;
    overflow: hidden;
    position: absolute;
    border-radius: 100%;
    transition: all 0.5s;
    background: url(${spiral}) center/cover no-repeat;
    width: ${(props) => props.height - 2}px;
    height: ${(props) => props.height - 2}px;
  }

  /* spinner checked */
  &:checked:after {
    transform: translateX(${(props) => props.width - props.height - 1}px)
      rotate(${(props) => (props.spin ? props.spin * 360 : 3 * 360)}deg);
  }

  &:checked:before {
    color: ${Colors.black};
    content: '${(props) => props.active}';
    background-color: ${Colors.greyLight};
  }
`;

// checkbox2
export const Checkbox2 = styled.input.attrs((props) => ({
  id: props.id,
  type: 'checkbox',
  name: props.name,
  value: props.value,
  checked: props.checked,
  onChange: props.onChange,
}))`
  margin: 5px;
  outline: none;
  cursor: pointer;
  appearance: none;
  position: relative;
  display: inline-block;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  /* background */
  &:before {
    top: 0;
    left: 0;
    content: '';
    display: block;
    border-radius: 5px;
    position: absolute;
    transition: all 0.3s;
    color: ${Colors.white};
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 100%;
    height: 100%;
    background-color: ${Colors.secondary}90;
    box-shadow: inset 3px 0px 12px 3px rgb(0 0 0 / 50%);
  }

  &:checked:before {
    color: ${Colors.black};
    background-color: ${Colors.secondary}40;
  }

  /* spinner */
  &:after {
    top: 1px;
    left: -2px;
    display: block;
    overflow: hidden;
    ${setBoxShadow({
      x: '-5px',
      y: '4px',
      z: '3px',
      color: '#0008',
    })}
    position: absolute;
    text-align: center;
    border-radius: 3px;
    transition: all 0.5s;
    color: ${Colors.white};
    text-transform: uppercase;
    background-color: ${Colors.primaryLight};
    content: '${(props) => props.inactive}';
    height: ${(props) => props.height - 2}px;
    width: ${(props) => props.width * 0.6}px;
    line-height: ${(props) => props.height}px;
    font-size: ${(props) => props.height * 0.5}px;
  }
  &:checked:after {
    color: ${Colors.white};
    content: '${(props) => props.active}';
    background-color: ${Colors.primaryDark};
    transform: translateX(${(props) => props.width * 0.4 + 4}px);
  }
`;
