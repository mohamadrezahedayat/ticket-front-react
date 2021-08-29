import React from 'react';
import styled from 'styled-components';

import Button from '../../shared/styledComponent/Button';
import { Colors, setBackground } from '../../shared/styledComponent/functions';
const ShowCover = (props) => {
  return (
    <Container image={props.image}>
      <Button
        absPosition={{ x: 'right,5rem', y: 'bottom,5rem' }}
        fontsize='2rem'
        borderRadius='3rem'
        padding='1rem 2rem'
      >
        Buy Ticket Now
      </Button>
    </Container>
  );
};

export default ShowCover;

const Container = styled.div`
  grid-column: full-start/full-end;
  position: relative;

  ${(props) =>
    setBackground({
      img: props.image,
      color: `${Colors.primaryLight}3f`,
    })};
`;
