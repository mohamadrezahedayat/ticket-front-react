import styled from 'styled-components';
import { setColor, setFontSize } from './functions';

export const Heading = styled.heading1`
  ${(props) => props.fontSize && setFontSize(props.fontSize)}
  ${(props) => props.color && setColor(props.color)}
`;

// export const P = styled(Heading)``;
// export const Span = styled(Heading)``;
// export const Heading1 = styled(Heading)``;
// export const Heading2 = styled(Heading)``;
// export const Heading3 = styled(Heading)``;
// export const Heading4 = styled(Heading)``;
// export const Heading5 = styled(Heading)``;
// export const Heading6 = styled(Heading)``;
