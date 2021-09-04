import React, { useState } from 'react';

import chairs from '../../img/chairs.jpg';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import Checkbox from '../../shared/styledComponent/Checkbox';
import { Colors } from '../../shared/styledComponent/functions';

const SeatSelection = ({ className, events, date }) => {
  const [ticketCount, setticketCount] = useState(1);
  return (
    <Div
      row
      height='100vh'
      className={className}
      background={{ img: chairs, color: `${Colors.primaryLight}3f` }}
    >
      {/* left panel */}
      <Div
        boxShadow
        borderRadius='3rem'
        bgcolor={`${Colors.white}5`}
        margin='3rem 1.5rem 3rem 3rem'
        flexSelf={{ flex: '7', alignSelf: 'stretch' }}
      ></Div>
      {/* right panel */}
      <Div
        boxShadow
        padding='2rem'
        borderRadius='3rem'
        bgcolor={`${Colors.white}5`}
        margin='3rem 3rem 3rem 1.5rem'
        flexSelf={{ flex: '3', alignSelf: 'stretch' }}
      >
        <Div rowWrap>
          <Div SingleMargin='bottom,2rem'>
            <Label SingleMargin='right,1rem' fontSize='1.7rem'>
              {`Ticket Counts: ${ticketCount}`}
            </Label>
            <Slider
              SingleMargin='top,1rem'
              min={1}
              max={10}
              id='count'
              name='count'
              value={ticketCount}
              onChange={(e) => setticketCount(e.target.value)}
            />
          </Div>
          <Div id='group' row>
            <Label
              fontSize='1.7rem'
              htmlFor='selectMode'
              SingleMargin='right,1rem'
            >
              Mode:
            </Label>
            <Checkbox
              spin={5}
              width='15rem'
              height='3rem'
              id='selectMode'
              active='Group'
              inactive='One by One '
            />
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default SeatSelection;
