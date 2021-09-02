import styled from 'styled-components';
import {
  setBackgroundColor,
  setBorderRadius,
  setAbsPos,
  setZindex,
  setHeight,
  setMargin,
  setWidth,
  setFlex,
  setBoxShadow,
  setPadding,
  setBorder,
} from './functions';

const Div = styled.div`
  ${(props) =>
    props.rowSpaceAround && setFlex({ justifyContent: 'space-around' })}
  ${(props) =>
    props.rowSpaceEven && setFlex({ justifyContent: 'space-evenly' })}
  ${(props) => props.rowLeft && setFlex({ justifyContent: 'flex-start' })}
  ${(props) => props.borderRadius && setBorderRadius(props.borderRadius)}
  ${(props) => props.bgcolor && setBackgroundColor(props.bgcolor)} 
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  ${(props) => props.boxShadow && setBoxShadow(props.boxShadow)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.height && setHeight(props.height)} 
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.zIndex && setZindex(props.zIndex)}
  ${(props) => props.border && setBorder(props.border)}
  ${(props) => props.width && setWidth(props.width)}
  ${(props) => props.row && setFlex()}
`;

export default Div;
