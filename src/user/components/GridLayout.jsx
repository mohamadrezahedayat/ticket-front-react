import React from 'react';
import styled from 'styled-components';

import userImage from '../../img/user.jpg';
import { Colors } from '../../shared/styledComponent/variables';
import { setBackground } from '../../shared/styledComponent/functions';

const GridLayout = ({ children, className }) => {
  return <Container className={className}>{children}</Container>;
};

export default GridLayout;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  ${setBackground({ img: userImage, color: `${Colors.primary}70` })}

  display: grid;
  grid-template-columns: 8rem repeat(10, 1fr) 8rem;
  grid-template-rows: 8rem repeat(8, max-content) 1fr 8rem;
`;
