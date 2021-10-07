import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ReservedTicket from './ReservedTicket';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import { H } from '../../shared/styledComponent/Typography';
import Checkbox from '../../shared/styledComponent/Checkbox';
import { Colors } from '../../shared/styledComponent/functions';
import { imageAddress, randomApi } from '../../shared/apis/server';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const RightPanel = ({ width, event }) => {
  const rightPanelWrapper = useRef();

  const [rightPanelWidth, setrightPanelWidth] = useState();
  const [imageUrl, setimageUrl] = useState(randomApi('artgroup'));
  const [addBtnColor, setaddBtnColor] = useState('#3f5e48');

  const {
    addAgain,
    setaddAgain,
    ticketCount,
    selectByGroup,
    setticketCount,
    setselectByGroup,
    deleteUserReservedSeats,
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
        key={ticket._id}
        code={ticket.code}
        price={ticket.price}
        width={rightPanelWidth}
      />
    ));
  const renderReservePanelHeader = () => {
    return (
      <Div flexSelf={{ flex: '70%' }}>
        <H
          as='h3'
          fontWeight='300'
          fontSize='1.5rem'
          textAlign='center'
          lineHeight='4rem'
          letterSpacing='1px'
          color={Colors.white}
          textTransform='capitalize'
          SingleMargin='bottom,.5rem'
        >
          {reservedSeatsOfCurrentUser.length === 0
            ? 'No Reserved Seats!'
            : `#${
                reservedSeatsOfCurrentUser.length
              } Seats, ${calculatePrices()}$`}
        </H>
      </Div>
    );
  };
  const calculatePrices = () => {
    const prices = reservedSeatsOfCurrentUser.map((ticket) => +ticket.price);
    return prices.reduce((ac, a) => ac + a, 0);
  };

  const addAgainClickHandler = () => {
    setaddAgain(!addAgain);
  };
  useEffect(() => {
    !addAgain ? setaddBtnColor('#3f5e48') : setaddBtnColor('#33fc11');
  }, [addAgain]);

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
      {/* main header */}
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
          width='3rem'
          height='3rem'
          borderRadius='100%'
          borderRadius__hover='80%'
          transition='all ease .5s'
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
          fontWeight='300'
          fontSize='1.2rem'
          letterSpacing='1px'
          color={Colors.white}
          SingleMargin='left,.5rem'
          textTransform='capitalize'
        >
          {event &&
            new Date(event.startDate).toLocaleString('en-US', {
              time: 'short',
              day: 'numeric',
              month: 'short',
              weekday: 'short',
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
        {/* ticket count slider gadget */}
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

        {/* selection mode slider checkbox gadget */}
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

        {/* reserves box panel*/}
        <Div
          width='100%'
          margin='2rem 0'
          overflow='y,auto'
          borderRadius='2rem 2rem 1rem 1rem'
          bgcolor={`${Colors.white}3`}
        >
          {/* reserve box panel header */}
          <Div
            row
            padding='0,2rem'
            width='100%'
            height='4rem'
            bgcolor={`${Colors.primaryDark}c0`}
            bgcolor__hover={`${Colors.primaryDark}ff`}
          >
            {/* Delete Icon */}
            <SvgWrapper>
              <svg
                onClick={deleteUserReservedSeats}
                id='icon-trash'
                viewBox='0 0 25 25'
                fill='#df3c3c'
                width='25px'
                height='25px'
              >
                <path d='M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z'></path>
              </svg>
              <svg
                id='icon-circle-with-plus'
                viewBox='0 0 25 25'
                fill={addBtnColor}
                onClick={addAgainClickHandler}
              >
                <path d='M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z'></path>
              </svg>
            </SvgWrapper>
            {renderReservePanelHeader()}
          </Div>
          <Div
            padding='1rem'
            border={{
              width: '1px',
              style: 'dashed',
              color: `${Colors.primaryLight}93`,
            }}
          >
            {renderReservedTickets()}
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default RightPanel;

const SvgWrapper = styled.div`
  transition: all ease 0.5s;
  flex: '20%';
  display: flex;
  flex-direction: row;
  #icon-circle-with-plus {
    fill: ${(props) => props.fill};
  }
  & svg {
    width: 2.5rem;
    height: 2.5rem;
    filter: brightness(0.8);
    box-shadow: 2px 4px 7px 1px rgb(0 0 0 / 20%);
    &:hover {
      filter: brightness(1.3);
      box-shadow: 2px 4px 7px 1px rgb(0 0 0 / 80%);
    }
  }
`;
