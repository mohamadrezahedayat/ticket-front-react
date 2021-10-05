import React, { useContext, useEffect, useRef, useState } from 'react';

import ReservedTicket from './ReservedTicket';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import Checkbox from '../../shared/styledComponent/Checkbox';
import { Colors } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const RightPanel = () => {
  const rightPanelWrapper = useRef();

  const [rightPanelWidth, setrightPanelWidth] = useState();

  const {
    ticketCount,
    setticketCount,
    selectByGroup,
    setselectByGroup,
    reservedSeatsOfCurrentUser,
  } = useContext(manageSeatsContext);

  useEffect(() => {
    setrightPanelWidth(rightPanelWrapper.current.clientWidth);
  }, []);

  const renderReservedTickets = () => {
    if (reservedSeatsOfCurrentUser.length === 0)
      return <Label>There is no reserved seat</Label>;

    return reservedSeatsOfCurrentUser.map((ticket) => (
      <ReservedTicket
        code={ticket.code}
        price={ticket.price}
        key={ticket._id}
      />
    ));
  };

  return (
    <Div
      boxShadow
      padding='2rem'
      borderRadius='3rem'
      ref={rightPanelWrapper}
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
            min={1}
            max={10}
            id='count'
            name='count'
            value={ticketCount}
            SingleMargin='top,1rem'
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
            id='selectMode'
            active='Group'
            inactive='One by One '
            value={selectByGroup}
            checked={selectByGroup}
            width={`${rightPanelWidth * 0.5 * 0.1}rem`}
            height={`${rightPanelWidth * 0.5 * 0.1 * 0.2}rem`}
            onChange={() => setselectByGroup(!selectByGroup)}
          />
        </Div>
        <Div
          width='100%'
          height='100rem'
          padding='1rem'
          margin='2rem 0'
          overflow='y,auto'
          border={{ width: '1px', style: 'dashed', color: 'purple' }}
          borderRadius='2rem'
          bgcolor={`${Colors.white}3`}
        >
          <Label>Your Reserved Seats:</Label>
          {renderReservedTickets()}
        </Div>
      </Div>
    </Div>
  );
};

export default RightPanel;
