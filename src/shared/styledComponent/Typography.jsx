import styled, { css } from 'styled-components';
import {
  setColor,
  setMargin,
  setZindex,
  setAbsPos,
  setPadding,
  setFontSize,
  setTransform,
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
import { Colors, Fonts } from './variables';

// dynamic heading
const allProps = css`
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
  ${(props) => props.transforms && setTransform(props.transforms)}

  /* box model */
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
`;

const heading = css`
  font-family: ${(props) =>
    props.fontFamily ? props.fontFamily : Fonts.displayFamily};
  font-weight: ${(props) =>
    props.fontWeight ? props.fontWeight : Fonts.defaultWeight};
  color: ${(props) => (props.color ? props.color : Colors.primary)};
  text-transform: ${(props) =>
    props.textTransform ? props.textTransform : 'capitalize'};
`;

// departed
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
  ${(props) => props.transforms && setTransform(props.transforms)}

  /* box model */
  ${(props) => props.margin && setMargin(props.margin)}
  ${(props) => props.padding && setPadding(props.padding)}
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
`;

export const Heading1 = styled.h1`
  ${allProps}
  ${heading}
  font-size: ${(props) => (props.fontSize ? props.fontSize : '4.5rem')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1')};
`;

export const Heading2 = styled.h2`
  ${allProps}
  ${heading}
  font-size: ${(props) => (props.fontSize ? props.fontSize : '4rem')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1')};
`;

export const Heading2Light = styled(Heading2)`
  color: ${(props) => (props.color ? props.color : Colors.primaryLight)};
`;

export const Heading2Dark = styled(Heading2)`
  color: ${(props) => (props.color ? props.color : Colors.primaryDark)};
`;

export const Heading3 = styled.h3`
  ${allProps}
  ${heading}
  font-size: ${(props) => (props.fontSize ? props.fontSize : '2.5rem')};
`;

export const Heading4 = styled.h4`
  ${allProps}
  ${heading}
  font-size: ${(props) => (props.fontSize ? props.fontSize : '1.7rem')};
`;

export const Heading4Light = styled(Heading4)`
  color: ${(props) => (props.color ? props.color : Colors.greyLight)};
`;

export const Heading4Dark = styled(Heading4)`
  color: ${(props) => (props.color ? props.color : Colors.greyDark)};
`;

export const Span = styled.span`
  ${allProps}
  ${heading}
`;
