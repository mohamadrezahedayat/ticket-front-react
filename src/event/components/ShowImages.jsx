import React from 'react';

import {
  setBorderRadius,
  setBoxShadow,
  setFlex,
} from '../../shared/styledComponent/functions';
import { imageAddress } from '../../shared/apis/server';
import styled from 'styled-components';

const ShowImages = ({ images, baseUrl }) => {
  return (
    <Wrapper>
      {images.map(
        (image, i) =>
          i < 3 && (
            <img src={`${imageAddress}/shows/${image}`} key={i} alt='artist' />
          )
      )}
    </Wrapper>
  );
};

export default ShowImages;

const Wrapper = styled.div`
  z-index: 3;
  margin-top: 8rem;
  grid-column: center-start/center-end;
  grid-row: 2 / span 2;
  ${setFlex({ justifyContent: 'space-between' })}
  position: relative;
  & img {
    width: 25rem;
    ${setBorderRadius('3rem')}
    ${setBoxShadow()}
  }
`;
