import React from 'react';
import styled from 'styled-components';
import Div from '../../shared/styledComponent/Div';

const Banner = ({ artistName, locationName, startDate }) => {
  return (
    <Wrapper>
      <Div
        boxShadow={{ color: '#000000bb' }}
        bgcolor='rgba(97, 6, 6, 0.71)'
        borderRadius='3rem 3rem 0 3rem'
        className='banner'
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-row-start: 4;
  z-index: 5;
  grid-column: col-start 6 / col-start 8;
  align-self: center;
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
export default Banner;
