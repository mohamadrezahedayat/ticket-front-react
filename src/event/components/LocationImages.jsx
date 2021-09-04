import React from 'react';
import styled from 'styled-components';

import { imageAddress } from '../../shared/apis/server';
import { setBoxShadow, setFlex } from '../../shared/styledComponent/functions';

const LocationImages = ({ images }) => {
  return (
    <Wrapper>
      {images.map((image, i) => (
        <img
          className='img'
          src={`${imageAddress}/locations/${image}`}
          alt='location'
          key={i}
        />
      ))}
    </Wrapper>
  );
};

export default LocationImages;

const Wrapper = styled.div`
  grid-column: full-start/full-end;
  grid-row: 3 / span 2;
  position: relative;
  ${setFlex({ justifyContent: 'center' })}
  position: relative;
  & .img {
    transition: all 1s ease;
    width: 50%;
    object-fit: cover;

    margin-right: -25%;
    border-radius: 0.5rem;
    filter: brightness(0.4);
    &:hover {
      border-radius: 3rem;
      transform: scale(1.05);
      transform-origin: center;
      ${setBoxShadow()}
      z-index: 2;
      filter: brightness(1);
    }
  }
`;
