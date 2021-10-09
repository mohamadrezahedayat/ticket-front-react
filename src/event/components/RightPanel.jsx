import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import ReservedTicket from './ReservedTicket';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Slider from '../../shared/styledComponent/Slider';
import { H } from '../../shared/styledComponent/Typography';
import { Colors } from '../../shared/styledComponent/functions';
import { imageAddress, randomApi } from '../../shared/apis/server';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';
import Button from '../../shared/styledComponent/Button';
import { Link } from 'react-router-dom';

const RightPanel = ({ width, event }) => {
  const rightPanelWrapper = useRef();
  const [paymentLink, setpaymentLink] = useState('');
  const [vertical, setvertical] = useState(true);
  const [percent, setpercent] = useState(false);
  const [timerFillColor, settimerFillColor] = useState('rgb(20,255,20)');
  const [remainingTime, setremainingTime] = useState('15\':00"');
  const [rightPanelWidth, setrightPanelWidth] = useState();
  const [addBtnColor, setaddBtnColor] = useState('#3f5e48');
  const [imageUrl, setimageUrl] = useState(randomApi('artgroup'));

  const {
    addAgain,
    setaddAgain,
    ticketCount,
    setticketCount,
    deleteUserReservedSeats,
    reservedSeatsOfCurrentUser,
  } = useContext(manageSeatsContext);

  // timer text ,timer percent handler
  useEffect(() => {
    if (
      !reservedSeatsOfCurrentUser ||
      reservedSeatsOfCurrentUser.length === 0 ||
      percent === 0
    )
      return;
    const calcPercent = () => {
      // set percent
      const totalSecondRemaining =
        (new Date(reservedSeatsOfCurrentUser[0].reserveExpirationTime) -
          Date.now()) /
        1000;
      if (totalSecondRemaining < 0) {
        setpercent(0);
        return;
      }
      const remainingTimePercent = totalSecondRemaining / (60 * 15);
      const newPercent = Math.round(remainingTimePercent * 31.4);
      if (percent !== newPercent) setpercent(newPercent);

      // set timer text
      let MinutesRemaining = Math.floor(totalSecondRemaining / 60);
      if (MinutesRemaining < 9) MinutesRemaining = `0${MinutesRemaining}`;
      let secondsRemaining = Math.round(totalSecondRemaining % 60);
      if (secondsRemaining < 9) secondsRemaining = `0${secondsRemaining}`;
      setremainingTime(`${MinutesRemaining}':${secondsRemaining}"`);
    };

    const interval = setInterval(calcPercent, 1000);
    if (percent === 0) clearInterval(interval);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reservedSeatsOfCurrentUser, event]);

  // set color
  useEffect(() => {
    const color = `rgb(${Math.round(255 - (255 * percent) / 31)},${Math.round(
      (255 * percent) / 31
    )},20)`;
    settimerFillColor(color);
  }, [percent]);

  // fetch artgroup image
  useEffect(() => {
    if (
      !event ||
      !event.show ||
      (event.show.artGroup.images.length === 0) | imageUrl
    )
      return;
    setpaymentLink(`/payment/${event._id}`);
    setimageUrl(`${imageAddress}/artists/${event.show.artGroup.images[0]}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  // width event handler
  useEffect(() => {
    setrightPanelWidth(rightPanelWrapper.current.clientWidth);
  }, [width]);

  // add again color selector
  useEffect(() => {
    !addAgain ? setaddBtnColor('#3f5e48') : setaddBtnColor('#33fc11');
  }, [addAgain]);

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
          fontSize='1.4rem'
          textAlign='center'
          lineHeight='2rem'
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

  const addAgainClickHandler = (e) => {
    setaddAgain(!addAgain);
    e.stopPropagation();
  };

  const reserveDeleteClickHandler = (e) => {
    deleteUserReservedSeats();
    e.stopPropagation();
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
      {/* main header */}
      <Div
        row
        width='100%'
        height='5rem'
        bgcolor={`${Colors.primaryDark}c0`}
        bgcolor__hover={`${Colors.primaryDark}ff`}
      >
        <Div
          width='3rem'
          height='3rem'
          background={{
            img: imageUrl,
          }}
          cursor='pointer'
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
          SingleMargin='left,.5rem'
          textTransform='capitalize'
        >
          {event && new Date(event.startDate).toLocaleTimeString('tr-TR')}
        </H>
      </Div>
      {/* panel body */}
      <Div rowWrap margin='0 2rem'>
        {/* ticket count slider gadget */}
        <Div margin='2rem,0'>
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
        <Link to={paymentLink}>
          <Button
            borderRadius='1rem'
            bgcolor='#2f9723'
            border='#1e4419'
            boxShadow
          >
            Payment
          </Button>
        </Link>

        {/* reserves box panel*/}
        <Div
          width='100%'
          margin='2rem 0'
          overflow='y,auto'
          bgcolor={`${Colors.white}3`}
          borderRadius='2rem 2rem 1rem 1rem'
        >
          {/* reserve box panel header */}
          <Div
            row
            width='100%'
            height='4rem'
            cursor='pointer'
            padding='0,2rem'
            bgcolor={`${Colors.primaryDark}c0`}
            onClick={() => setvertical(!vertical)}
            bgcolor__hover={`${Colors.primaryDark}ff`}
          >
            {/* Icons */}
            <SvgWrapper>
              {/* delete icon */}
              <svg
                onClick={(e) => reserveDeleteClickHandler(e)}
                id='icon-trash'
                viewBox='0 0 25 25'
                fill='#df3c3c'
                width='25px'
                height='25px'
              >
                <path d='M3.389 7.113l1.101 10.908c0.061 0.461 2.287 1.977 5.51 1.979 3.225-0.002 5.451-1.518 5.511-1.979l1.102-10.908c-1.684 0.942-4.201 1.387-6.613 1.387-2.41 0-4.928-0.445-6.611-1.387zM13.168 1.51l-0.859-0.951c-0.332-0.473-0.692-0.559-1.393-0.559h-1.831c-0.7 0-1.061 0.086-1.392 0.559l-0.859 0.951c-2.57 0.449-4.434 1.64-4.434 2.519v0.17c0 1.547 3.403 2.801 7.6 2.801 4.198 0 7.601-1.254 7.601-2.801v-0.17c0-0.879-1.863-2.070-4.433-2.519zM12.070 4.34l-1.070-1.34h-2l-1.068 1.34h-1.7c0 0 1.862-2.221 2.111-2.522 0.19-0.23 0.384-0.318 0.636-0.318h2.043c0.253 0 0.447 0.088 0.637 0.318 0.248 0.301 2.111 2.522 2.111 2.522h-1.7z'></path>
              </svg>
              {/* add again icon */}
              <svg
                cursor='cell'
                id='icon-circle-with-plus'
                viewBox='0 0 25 25'
                fill={addBtnColor}
                onClick={(e) => addAgainClickHandler(e)}
              >
                <path d='M10 1.6c-4.639 0-8.4 3.761-8.4 8.4s3.761 8.4 8.4 8.4 8.4-3.761 8.4-8.4c0-4.639-3.761-8.4-8.4-8.4zM15 11h-4v4h-2v-4h-4v-2h4v-4h2v4h4v2z'></path>
              </svg>
              {/* timer */}
              {reservedSeatsOfCurrentUser.length !== 0 &&
                percent &&
                percent !== 0 && (
                  <>
                    <svg id='expiration' viewBox='0 0 20 20'>
                      <circle r='10' cx='10' cy='10' fill='tomato' />
                      <circle
                        r='5'
                        cx='10'
                        cy='10'
                        stroke='green'
                        strokeWidth='10'
                        fill='transparent'
                        strokeDasharray={`${percent} 31.4`}
                      />
                    </svg>
                    <Div
                      className='timer'
                      boxShadow
                      zIndex='3'
                      padding='5px'
                      bgcolor={timerFillColor}
                      borderRadius='1rem'
                      absPosition={{ x: 'top,.5rem', y: 'left,1.5rem' }}
                    >
                      <H as='h4' fontSize='1.5rem'>
                        {remainingTime}
                      </H>
                    </Div>
                  </>
                )}
            </SvgWrapper>
            {/* header text */}
            {renderReservePanelHeader()}
          </Div>
          {/* reserve box panel body */}
          <Div
            rowLeft={!vertical}
            column={vertical}
            padding='1rem'
            border={{
              width: '1px',
              style: 'dashed',
              color: `${Colors.primaryLight}93`,
            }}
            overflow='auto'
          >
            {/* tickets */}
            {renderReservedTickets()}
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default RightPanel;

const SvgWrapper = styled.div`
  flex: '20%';
  display: flex;
  flex-direction: row;
  transition: all ease 0.5s;
  #icon-circle-with-plus {
    fill: ${(props) => props.fill};
  }
  #expiration {
    transform: scale(0.8);
  }
  #expiration:hover {
    transform: scale(1.1);
  }
  & .timer {
    visibility: hidden;
    transition: all ease 0.5s;
  }
  #expiration:hover + .timer {
    visibility: visible;
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
