import styled from 'styled-components';

import spiral from '../../img/spiral.png';
import { setHeight, setWidth } from './functions';
import { Colors } from './variables';

const Checkbox = styled.input.attrs((props) => ({
  id: props.id,
  type: 'checkbox',
  name: props.name,
  value: props.value,
  checked: props.checked,
  onChange: props.onChange,
}))`
  outline: 'none';
  cursor: pointer;
  appearance: none;
  position: relative;
  display: inline-block;
  width: calc(${(props) => props.width} + 2px);
  height: calc(${(props) => props.height} + 2px);

  &:before {
    top: 0;
    left: 0;
    display: block;
    position: absolute;
    text-align: center;
    text-justify: center;
    transition: all 0.3s;
    border: 1px solid black;
    background-color: ${Colors.grey};
    content: '${(props) => props.inactive}';
    line-height: ${(props) => props.height};
    border-radius: ${(props) => props.height};
    width: calc(${(props) => props.width} + 2px);
    height: calc(${(props) => props.height} + 2px);
    padding: 0 calc(${(props) => props.height} + 2px);
  }

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
    ${(props) => props.height && setWidth(props.height)}
    ${(props) => props.height && setHeight(props.height)}
  }

  &:checked:after {
    transform: translateX(
        calc(${(props) => props.width} - ${(props) => props.height})
      )
      rotate(${(props) => props.spin * 360}deg);
  }

  &:checked:before {
    content: '${(props) => props.active}';
    background-color: ${Colors.greyLight};
  }
`;

export default Checkbox;
