import React from 'react';
import styled from 'styled-components';
import Div from './Div';
import { Colors } from './functions';

const Footer = () => {
  return (
    <Wrapper>
      <Div className='footer' bgcolor={Colors.tertiaryDark} padding='10rem 0'>
        Footer
      </Div>
    </Wrapper>
  );
};

export default Footer;
const Wrapper = styled.div`
  grid-column: full-start/full-end;
  .footer {
    padding: 10rem 5rem;
  }
`;
