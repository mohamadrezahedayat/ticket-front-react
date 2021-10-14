import styled from 'styled-components';

import {
  setMargin,
  setPadding,
  setSingleMargin,
  setSinglePadding,
} from './functions';
import { Colors } from './variables';

export const Label = styled.label.attrs((props) => ({
  htmlFor: props.htmlFor,
}))`
  user-select: none;
  text-transform: capitalize;
  ${(props) => props.htmlFor && 'cursor:pointer;'};
  font-weight: ${(props) => props.fontWeight || 400};
  font-size: ${(props) => props.fontSize || ' 1.3rem'};
  ${(props) => props.margin && setMargin(props.margin)};
  ${(props) => props.padding && setPadding(props.padding)};
  color: ${(props) => props.color || Colors.primary || 'black'};
  ${(props) => props.SingleMargin && setSingleMargin(props.SingleMargin)}
  ${(props) => props.SinglePadding && setSinglePadding(props.SinglePadding)}
`;
export default Label;
