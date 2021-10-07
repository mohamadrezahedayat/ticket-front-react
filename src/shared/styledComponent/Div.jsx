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
  setTransitions,
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
${(props) => props.transform && transform(props.transform)}

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
${(props) => props.column && setFlex({ flexDirection: 'column' })}
${(props) => props.flexSelf && setflexSelf(props.flexSelf)}
${(props) => props.rowWrap && setFlex({ flexWrap: 'wrap' })}
${(props) => props.rowLeft && setFlex({ justifyContent: 'flex-start' })}
${(props) =>
    props.rowSpaceAround && setFlex({ justifyContent: 'space-around' })}
${(props) => props.rowSpaceEven && setFlex({ justifyContent: 'space-evenly' })} 

/* Grid */
${(props) => props.grid && setGrid()}
${(props) => props.gridColumn && setGridColumn(props.gridColumn)}
${(props) => props.gridRowStart && setGridRowStart(props.gridRowStart)}
${(props) =>
    props.gridTemplateRows && setGridTemplateRows(props.gridTemplateRows)}
${(props) =>
    props.gridTemplateColumns &&
    setGridTemplateColumns(props.gridTemplateColumns)}
/* transition */
${(props) => props.transition && setTransitions(props.transition)}


/* hover */
&:hover {
    /* size */
    ${(props) => props.width__hover && setWidth(props.width__hover)}
    ${(props) => props.height__hover && setHeight(props.height__hover)} 
    /* box model */
    ${(props) => props.margin__hover && setMargin(props.margin__hover)}
    ${(props) => props.padding__hover && setPadding(props.padding__hover)}
    ${(props) =>
      props.SingleMargin__hover && setSingleMargin(props.SingleMargin__hover)}
    ${(props) =>
      props.SinglePadding__hover &&
      setSinglePadding(props.SinglePadding__hover)}

    /* bg */
    ${(props) =>
      props.bgcolor__hover && setBackgroundColor(props.bgcolor__hover)}
    ${(props) =>
      props.background__hover && setBackground(props.background__hover)}

    /* transform */
    ${(props) => props.transform__hover && transform(props.transform__hover)}

    /* shadow */
    ${(props) => props.boxShadow__hover && setBoxShadow(props.boxShadow__hover)}

    /* border */
    ${(props) => props.border__hover && setBorder(props.border__hover)}
    ${(props) =>
      props.borderRadius__hover && setBorderRadius(props.borderRadius__hover)}
  }
`;

export default Div;
