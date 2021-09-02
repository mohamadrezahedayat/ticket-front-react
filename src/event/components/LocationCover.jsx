import React from 'react';
import styled from 'styled-components';

import { imageAddress } from '../../shared/apis/server';
import { setBoxShadow, setFlex } from '../../shared/styledComponent/functions';
import Div from '../../shared/styledComponent/Div';
import Date from './Date';

const LocationCover = ({
  images,
  artistName,
  locationName,
  startDate,
  dates,
}) => {
  return (
    <Wrapper>
      {images.map((image, i) => (
        <img
          src={`${imageAddress}/locations/${image}`}
          alt='location'
          key={i}
        />
      ))}
      <Div
        absPosition={{ x: 'right,10%', y: 'bottom,50%' }}
        boxShadow={{ color: '#000000bb' }}
        bgcolor='rgba(97, 6, 6, 0.71)'
        borderRadius='3rem 3rem 0 3rem'
        padding='2rem'
        height='20rem'
        width='30rem'
        zIndex='10'
      >
        <h3>{artistName}</h3>
        <h4>Live In</h4>
        <h4>{locationName}</h4>
        <h4>{startDate.toLocaleString().split('T')[0]}</h4>
      </Div>
      <Date dates={dates} />
    </Wrapper>
  );
};

export default LocationCover;

const Wrapper = styled.div`
  grid-column: full-start/full-end;
  position: relative;
  ${setFlex()}

  img {
    transform: translateY(-10%);
    transition: all 1s ease;
    width: 35vw;
    object-fit: cover;
    transform: translateY(-30%);
    margin-right: -10%;
    border-radius: 0.5rem;
    filter: brightness(0.4);
    &:hover {
      border-radius: 3rem;
      transform: translateY(-30%) rotate(7deg) scale(1.05);
      transform-origin: center;
      ${setBoxShadow()}
      z-index: 2;
      filter: brightness(1);
    }
  }
  h3 {
    font-size: 2.5rem;
    color: white;
    font-weight: 100;
    margin-bottom: 2rem;
    text-transform: capitalize;
  }
  h4 {
    text-transform: capitalize;
    margin-bottom: -0.3rem;
    font-size: 1.8rem;
    color: white;
    font-weight: 300;
  }
`;
