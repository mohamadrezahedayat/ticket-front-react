import styled from 'styled-components';
import {
  setColor,
  setWidth,
  setCursor,
  setBorder,
  setHeight,
  setAbsPos,
  setMargin,
  setZindex,
  setDisplay,
  setPadding,
  setBoxShadow,
  setTransform,
  setTransitions,
  setSingleMargin,
  setBorderRadius,
  setSinglePadding,
  setBackgroundColor,
} from './functions';
import { Colors } from './variables';

const Button = styled.button`
  /* general */
  position: relative;

  /* cursor */
  ${(props) => (props.cursor ? setCursor(props.cursor) : setCursor())}

  /* display */
  ${(props) =>
    props.display ? setDisplay(props.display) : setDisplay('inline-block')}
  
  /* size */
  ${(props) => props.width && setWidth(props.width)}
  ${(props) => props.height && setHeight(props.height)} 
  
  /* box model */
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) =>
    props.padding ? setPadding(props.padding) : setPadding('.5rem,1.5rem')};
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}

  /* position */
  ${(props) => props.zIndex && setZindex(props.zIndex)}
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  
  /* transform */
  ${(props) => props.transform && setTransform(props.transform)}
  
  /* transition */
  ${(props) => props.transition && setTransitions(props.transition)}

  /* bg */
  ${(props) =>
    props.bgcolor
      ? setBackgroundColor(props.bgcolor)
      : setBackgroundColor(Colors.primary)} 
  
  /* color */
  ${(props) => (props.color ? setColor(props.color) : setColor(Colors.white))}
  
  /* font */
  font: inherit;
  text-decoration: none;
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.2rem')};
  letter-spacing: ${(props) =>
    props.letterSpacing ? props.letterSpacing : '0'};

  /* border */
  ${(props) =>
    props.border
      ? setBorder({ width: '1px', color: props.border })
      : setBorder({ width: '1px', color: props.bgcolor })}
  ${(props) =>
    props.borderRadius
      ? setBorderRadius(props.borderRadius)
      : setBorderRadius('4px')};

  /* box shadow */
  ${(props) => props.boxShadow && setBoxShadow(props.boxShadow)}

  /* focus */
  &:focus {
    outline: none;
  }

  /* hover , active */
  &:hover,
  &:active {
    background: ${(props) => props.activecolor || Colors.primaryLight};
    ${setBorder({ width: '1px', color: Colors.primaryDark })};
  }

  /* disabled */
  &:disabled,
  &:hover:disabled,
  &:active:disabled {
    background: ${Colors.grey};
    ${setBorder({ width: '1px', color: Colors.greyDark })};
    cursor: not-allowed;
  }
`;

export default Button;
