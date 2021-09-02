import React from 'react';
import styled from 'styled-components';
import Div from '../../shared/styledComponent/Div';
import { Colors } from '../../shared/styledComponent/functions';

const Date = ({ dates }) => {
  return (
    <Wrapper>
      {dates.map((date, i) => (
        <Div
          bgcolor={`${Colors.primaryDark}`}
          borderRadius='2rem'
          height='15rem'
          padding='2rem'
          width='15rem'
          zIndex='40'
          key={i}
        >
          <Div
            border={{
              position: 'bottom',
              style: 'solid',
              color: Colors.white,
              size: '1px',
            }}
            height='50%'
          >
            <p className='top'>{date.split('-')[2].split('T')[0]}</p>
          </Div>
          <Div height='50%'>
            <p className='bottom'>
              {new window.Date(date).toDateString().split(' ')[1]}
            </p>
          </Div>
        </Div>
      ))}
    </Wrapper>
  );
};

export default Date;

const Wrapper = styled.div`
  grid-row-start: 5;
  transform: translateY(-50%);
  align-self: start;
  grid-column: center-start/center-end;
  z-index: 20;
  display: flex;
  justify-content: space-between;

  p {
    color: white;
  }
  p.top {
    font-size: 5rem;
    transform: translateY(-2rem);
  }
  p.bottom {
    font-size: 4.5rem;
    text-align: right;
  }
`;
