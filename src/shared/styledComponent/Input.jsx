import styled from 'styled-components';

import {
  setWidth,
  setHeight,
  setAbsPos,
  setMargin,
  setZindex,
  setBorder,
  setPadding,
  setflexSelf,
  setBoxShadow,
  setSingleMargin,
  setBorderRadius,
  setSinglePadding,
  setBackgroundColor,
} from './functions';

const Input = styled.input.attrs((props) => ({
  type: props.type || 'text',
  onChange: props.onChange,
  value: props.value,
  name: props.name,
  min: props.min,
  max: props.max,
  id: props.id,
}))`
  ${(props) => props.width && setWidth(props.width)}
  ${(props) => props.border && setBorder(props.border)}
  ${(props) => props.zIndex && setZindex(props.zIndex)}
  ${(props) => props.height && setHeight(props.height)} 
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.flexSelf && setflexSelf(props.flexSelf)}
  ${(props) => props.boxShadow && setBoxShadow(props.boxShadow)}
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  ${(props) => props.bgcolor && setBackgroundColor(props.bgcolor)} 
  ${(props) => props.borderRadius && setBorderRadius(props.borderRadius)}
  ${(props) => props.singleMargin && setSingleMargin(props.singleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
`;

export default Input;
