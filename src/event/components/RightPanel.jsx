import React, { useContext, useEffect, useRef, useState } from 'react';

import ReservedTicket from './ReservedTicket';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import { H } from '../../shared/styledComponent/Typography';
import Checkbox from '../../shared/styledComponent/Checkbox';
import { Colors } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import { imageAddress, randomApi } from '../../shared/apis/server';

const RightPanel = ({ width, event }) => {
  const rightPanelWrapper = useRef();

  const [rightPanelWidth, setrightPanelWidth] = useState();
  const [imageUrl, setimageUrl] = useState(randomApi('artgroup'));

  const {
    ticketCount,
    setticketCount,
    selectByGroup,
    setselectByGroup,
    reservedSeatsOfCurrentUser,
  } = useContext(manageSeatsContext);

  useEffect(() => {
    if (!event || !event.show || event.show.artGroup.images.length === 0)
      return;

    setimageUrl(`${imageAddress}/artists/${event.show.artGroup.images[0]}`);
  }, [event]);

  useEffect(() => {
    setrightPanelWidth(rightPanelWrapper.current.clientWidth);
  }, [width]);

  const renderReservedTickets = () =>
    reservedSeatsOfCurrentUser.map((ticket) => (
      <ReservedTicket
        code={ticket.code}
        price={ticket.price}
        key={ticket._id}
        width={rightPanelWidth}
      />
    ));

  const calculatePrices = () => {
    const prices = reservedSeatsOfCurrentUser.map((ticket) => +ticket.price);
    console.log(prices);
    return prices.reduce((ac, a) => ac + a, 0);
  };
  return (
    <Div
      boxShadow
      overflow='x,auto'
      borderRadius='3rem'
      ref={rightPanelWrapper}
      bgcolor={`${Colors.white}5`}
      margin='3rem 3rem 3rem 1.5rem'
      flexSelf={{ flex: '3', alignSelf: 'stretch' }}
    >
      {/* header */}
      <Div
        row
        width='100%'
        height='5rem'
        bgcolor={`${Colors.primaryDark}c0`}
        bgcolor__hover={`${Colors.primaryDark}ff`}
      >
        <Div
          background={{
            img: imageUrl,
          }}
          transition='all ease .5s'
          width='3rem'
          height='3rem'
          borderRadius='100%'
          borderRadius__hover='80%'
          transform__hover='scale(1.3) rotate(360deg)'
          style={{ backgroundAttachment: 'initial' }}
        />
        <H
          as='h3'
          fontWeight='300'
          fontSize='1.2rem'
          letterSpacing='1px'
          color={Colors.white}
          SingleMargin='left,.5rem'
          textTransform='capitalize'
        >
          {event && event.show.name},
        </H>
        <H
          as='h3'
          color={Colors.white}
          textTransform='capitalize'
          letterSpacing='1px'
          SingleMargin='left,.5rem'
          fontSize='1.2rem'
          fontWeight='300'
        >
          {event &&
            new Date(event.startDate).toLocaleString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              time: 'short',
            })}
          ,
        </H>
        <H
          as='h3'
          fontWeight='300'
          fontSize='1.2rem'
          letterSpacing='1px'
          color={Colors.white}
          textTransform='capitalize'
          SingleMargin='left,.5rem'
        >
          {event && new Date(event.startDate).toLocaleTimeString('tr-TR')}
        </H>
      </Div>

      <Div rowWrap margin='0 2rem'>
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

        {/* reserves box */}
        <Div
          width='100%'
          padding='1rem'
          margin='2rem 0'
          overflow='y,auto'
          border={{ width: '1px', style: 'dashed', color: Colors.primaryLight }}
          borderRadius='2rem'
          bgcolor={`${Colors.white}3`}
        >
          <H
            as='h2'
            color={Colors.primary}
            textTransform='capitalize'
            letterSpacing='1px'
            textAlign='center'
            SingleMargin='bottom,.5rem'
            fontSize='1.5rem'
            fontWeight='300'
          >
            {reservedSeatsOfCurrentUser.length === 0
              ? 'There is no reserved seats'
              : 'Your reserved seats are:'}
          </H>
          {reservedSeatsOfCurrentUser.length !== 0 && (
            <H
              as='h3'
              color={Colors.primaryDark}
              textAlign='center'
              SingleMargin='bottom,.5rem'
              fontSize='1.1rem'
              fontWeight='300'
            >
              Seats Counts= {reservedSeatsOfCurrentUser.length} and Total price=
              {calculatePrices()}$
            </H>
          )}
          {renderReservedTickets()}
        </Div>
      </Div>
    </Div>
  );
};

export default RightPanel;
