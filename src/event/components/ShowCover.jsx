import React from 'react';
import styled from 'styled-components';

import { setBackground } from '../../shared/styledComponent/functions';
import { Colors } from '../../shared/styledComponent/variables';
const ShowCover = (props) => {
  return <Container image={props.image}></Container>;
};

export default ShowCover;

const Container = styled.div`
  grid-column: full-start/full-end;
  grid-row-start: 1;
  ${(props) =>
    setBackground({
      img: props.image,
      color: `${Colors.primaryLight}3f`,
    })};
`;
