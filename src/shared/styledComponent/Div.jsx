import styled from 'styled-components';

import {
  setFlex,
  setWidth,
  setHeight,
  transform,
  setAbsPos,
  setMargin,
  setZindex,
  setBorder,
  setPadding,
  setflexSelf,
  setOverflow,
  setBoxShadow,
  setBackground,
  setBorderRadius,
  setSingleMargin,
  setSinglePadding,
  setBackgroundColor,
} from './functions';

const Div = styled.div`
  position: relative;
  ${(props) => props.row && setFlex()}
  ${(props) => props.width && setWidth(props.width)}
  ${(props) => props.border && setBorder(props.border)}
  ${(props) => props.zIndex && setZindex(props.zIndex)}
  ${(props) => props.height && setHeight(props.height)} 
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.overflow && setOverflow(props.overflow)}
  ${(props) => props.flexSelf && setflexSelf(props.flexSelf)}
  ${(props) => props.rowWrap && setFlex({ flexWrap: 'wrap' })}
  ${(props) => props.transforms && transform(props.transforms)}
  ${(props) => props.boxShadow && setBoxShadow(props.boxShadow)}
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  ${(props) => props.bgcolor && setBackgroundColor(props.bgcolor)} 
  ${(props) => props.background && setBackground(props.background)}
  ${(props) => props.borderRadius && setBorderRadius(props.borderRadius)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
  ${(props) => props.rowLeft && setFlex({ justifyContent: 'flex-start' })}
  ${(props) =>
    props.rowSpaceAround && setFlex({ justifyContent: 'space-around' })}
  ${(props) =>
    props.rowSpaceEven && setFlex({ justifyContent: 'space-evenly' })}
`;

export default Div;
