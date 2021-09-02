import React from 'react';
import styled from 'styled-components';
import Div from '../../shared/styledComponent/Div';
import { Colors, setAbsPos } from '../../shared/styledComponent/functions';

const Date = ({ dates }) => {
  return (
    <Wrapper>
      <Div
        absPosition={{ x: 'bottom,0', y: 'left,0' }}
        className='wrapper'
        rowSpaceAround
        width='100%'
        zIndex='20'
      >
        {dates.map((date, i) => (
          <Div
            className='date-wrapper'
            bgcolor={`${Colors.primaryDark}`}
            borderRadius='2rem'
            margin='0 3rem'
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
      </Div>
    </Wrapper>
  );
};

export default Date;

const Wrapper = styled.div`
  .date-wrapper {
    transform: translateY(-3rem);
  }
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
