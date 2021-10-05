import styled from 'styled-components';

import {
  setGrid,
  setFlex,
  setWidth,
  setBorder,
  setHeight,
  transform,
  setAbsPos,
  setMargin,
  setZindex,
  setPadding,
  setflexSelf,
  setOverflow,
  setBoxShadow,
  setGridColumn,
  setBackground,
  setSingleMargin,
  setGridRowStart,
  setBorderRadius,
  setSinglePadding,
  setBackgroundColor,
  setGridTemplateRows,
  setGridTemplateColumns,
} from './functions';

const Div = styled.div`
  /* general */
  position: relative;

  /* size */
  ${(props) => props.width && setWidth(props.width)}
  ${(props) => props.height && setHeight(props.height)} 
  
  /* overflow */
  ${(props) => props.overflow && setOverflow(props.overflow)}

  /* box model */
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}

  /* position */
  ${(props) => props.zIndex && setZindex(props.zIndex)}
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  
  /* transform */
  ${(props) => props.transforms && transform(props.transforms)}
  
  /* bg */
  ${(props) => props.bgcolor && setBackgroundColor(props.bgcolor)} 
  ${(props) => props.background && setBackground(props.background)}
  
  /* border */
  ${(props) => props.border && setBorder(props.border)}
  ${(props) => props.borderRadius && setBorderRadius(props.borderRadius)}
  
  /* shadow */
  ${(props) => props.boxShadow && setBoxShadow(props.boxShadow)}
  
  /* flex */
  ${(props) => props.row && setFlex()}
  ${(props) => props.flexSelf && setflexSelf(props.flexSelf)}
  ${(props) => props.rowWrap && setFlex({ flexWrap: 'wrap' })}
  ${(props) => props.rowLeft && setFlex({ justifyContent: 'flex-start' })}
  ${(props) =>
    props.rowSpaceAround && setFlex({ justifyContent: 'space-around' })}
  ${(props) =>
    props.rowSpaceEven && setFlex({ justifyContent: 'space-evenly' })} 
    
  /* Grid */
  ${(props) => props.grid && setGrid()}
  ${(props) => props.gridColumn && setGridColumn(props.gridColumn)}
  ${(props) => props.gridRowStart && setGridRowStart(props.gridRowStart)}
  ${(props) =>
    props.gridTemplateRows && setGridTemplateRows(props.gridTemplateRows)}
  ${(props) =>
    props.gridTemplateColumns &&
    setGridTemplateColumns(props.gridTemplateColumns)}
`;

export default Div;
