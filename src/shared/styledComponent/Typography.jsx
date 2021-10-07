import styled from 'styled-components';
import {
  setColor,
  setMargin,
  setZindex,
  transform,
  setAbsPos,
  setPadding,
  setFontSize,
  setFontStyle,
  setTextAlign,
  setDirection,
  setFontFamily,
  setFontWeight,
  setLineHeight,
  setWordSpacing,
  setSingleMargin,
  setSinglePadding,
  setLetterSpacing,
  setTextTransform,
} from './functions';

export const H = styled.h1`
  ${(props) => props.color && setColor(props.color)}
  ${(props) => props.fontSize && setFontSize(props.fontSize)}
  ${(props) => props.direction && setDirection(props.direction)}
  ${(props) => props.fontStyle && setFontStyle(props.fontStyle)}
  ${(props) => props.textAlign && setTextAlign(props.textAlign)}
  ${(props) => props.fontWeight && setFontWeight(props.fontWeight)}
  ${(props) => props.fontFamily && setFontFamily(props.fontFamily)}
  ${(props) => props.lineHeight && setLineHeight(props.lineHeight)}
  ${(props) => props.wordSpacing && setWordSpacing(props.wordSpacing)}
  ${(props) => props.letterSpacing && setLetterSpacing(props.letterSpacing)}
  ${(props) => props.textTransform && setTextTransform(props.textTransform)}
  
  /* position */
  ${(props) => props.absPosition && setAbsPos(props.absPosition)}
  ${(props) => props.zIndex && setZindex(props.zIndex)}

  /* transform */
  ${(props) => props.transforms && transform(props.transforms)}

  /* box model */
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
`;

// export const P = styled(H)``;
// export const Span = styled(H)``;
// export const H1 = styled(H)``;
// export const H2 = styled(H)``;
// export const H3 = styled(H)``;
// export const H4 = styled(H)``;
// export const H5 = styled(H)``;
// export const H6 = styled(H)``;
