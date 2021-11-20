import React from 'react';
import styled from 'styled-components';

import {
  setFlex,
  setBoxShadow,
  setBorderRadius,
} from '../../shared/styledComponent/functions';
import { imageAddress } from '../../shared/apis/server';
import { setMediaQuery } from '../../shared/styledComponent/mediaQueries';

const ShowImages = ({ images }) => {
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
  ${setFlex({ justifyContent: 'center' })}
  position: relative;
  ${setMediaQuery(
    { isMinWidth: false, breakPoint: '65.63rem' },
    'grid-column: 4 / 10;'
  )}
  & img {
    width: 25rem;
    margin: 0 2rem;
    ${setBorderRadius('3rem')}
    ${setBoxShadow()}
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '65.63rem' },
      'width:20rem;margin: 0 1.5rem;'
    )}
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '41rem' },
      'width:14rem;margin: 0 1rem;'
    )}
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '37.5rem' },
      'width:11rem;margin: 0 .5rem;'
    )}
  }
`;
