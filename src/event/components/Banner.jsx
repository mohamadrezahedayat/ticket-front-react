import React from 'react';
import styled from 'styled-components';
import Div from '../../shared/styledComponent/Div';
import {
  Screen,
  setMediaQuery,
} from '../../shared/styledComponent/mediaQueries';

const Banner = ({ artistName, locationName, startDate }) => {
  return (
    <Wrapper>
      <Div
        boxShadow={{ color: '#000000bb' }}
        bgcolor='rgba(97, 6, 6, 0.71)'
        borderRadius='1.5em 1.5em 0 1.5em'
        className='banner'
        padding='1em'
        height='10em'
        width='13em'
        zIndex='10'
      >
        <h3>{artistName}</h3>
        <h4>Live In</h4>
        <h4>{locationName}</h4>
        <h4>{startDate.toLocaleString().split('T')[0]}</h4>
      </Div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-row-start: 4;
  font-size: 2.5rem;
  z-index: 5;

  grid-column: col-start 6 / col-start 8;
  align-self: center;
  ${setMediaQuery(
    { isMinWidth: false, breakPoint: '61.5rem' },
    `grid-column: col-start 1 / span3;
    transform:translateY(-1em);font-size:2rem;`
  )}

  ${setMediaQuery(
    { isMinWidth: false, breakPoint: '47.5rem' },
    `grid-column: full-start / span3;
    font-size:1.6rem;`
  )}
  ${Screen.phone`visibility: hidden;`}
  h3 {
    font-size: 1em;
    color: white;
    font-weight: 100;
    margin-bottom: 0.15em;
    text-transform: capitalize;
  }
  h4 {
    text-transform: capitalize;
    margin-bottom: -0.15em;
    font-size: 0.9em;
    color: white;
    font-weight: 300;
  }
`;
export default Banner;
