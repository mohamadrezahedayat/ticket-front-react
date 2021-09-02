import React from 'react';
import styled from 'styled-components';
import Div from './Div';
import { Colors } from './functions';

const Footer = () => {
  return (
    <Wrapper>
      <Div className='footer' bgcolor={Colors.tertiaryDark}>
        Footer
      </Div>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.div`
  grid-column: full-start/full-end;
  .footer {
    width: 100%;
    height: 100%;
  }
`;
