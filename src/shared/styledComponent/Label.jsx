import styled from 'styled-components';

import { Colors, setMargin, setPadding } from './functions';

export const Label = styled.label.attrs((props) => ({
  htmlFor: props.htmlFor,
}))`
  color: ${(props) => props.color || Colors.primary || 'black'};
  text-transform: capitalize;
  font-size: ${(props) => props.fontSize || ' 1.3rem'};
  font-weight: ${(props) => props.fontWeight || 400};
  ${(props) => props.margin && setMargin(props.margin)};
  ${(props) => props.padding && setPadding(props.padding)};
`;
export default Label;
