import styled from 'styled-components';
import React, { useState } from 'react';

import {
  Colors,
  setBackgroundColor,
} from '../../shared/styledComponent/functions';
import Div from '../../shared/styledComponent/Div';

const Date = ({ dates, className, onDateSelect, enable }) => {
  const [selected, setselected] = useState(0);
  const onClickHandler = (date, i) => {
    onDateSelect(date);
    if (enable) setselected(i);
  };
  return (
    <Wrapper className={className} enable={enable}>
      {dates.map((date, i) => (
        <Div
          onClick={() => onClickHandler(date, i)}
          bgcolor={
            selected === i || !enable
              ? `${Colors.primaryDark}`
              : `${Colors.secondaryDark}`
          }
          borderRadius='2rem'
          height='15rem'
          padding='2rem'
          width='15rem'
          key={i}
        >
          <Div
            border={{
              size: '1px',
              style: 'solid',
              position: 'bottom',
              color: Colors.white,
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
  z-index: 20;
  display: flex;
  justify-content: space-between;

  & > div {
    ${(props) => props.enable && 'cursor: pointer;'};

    &:hover {
      ${(props) => props.enable && setBackgroundColor(Colors.tertiary)};
    }
  }

  & p {
    color: white;
  }

  & p.top {
    font-size: 5rem;
    transform: translateY(-2rem);
  }

  & p.bottom {
    font-size: 4.5rem;
    text-align: right;
  }
`;
