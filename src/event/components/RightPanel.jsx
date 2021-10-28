import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  PieChart,
  DeleteIcon,
  AddAgainIcon,
} from '../../shared/components/UIElements/Svgs';
import ReservedTicket from './ReservedTicket';
import Div from '../../shared/styledComponent/Div';
import Label from '../../shared/styledComponent/Label';
import Button from '../../shared/styledComponent/Button';
import Slider from '../../shared/styledComponent/Slider';
import { Colors } from '../../shared/styledComponent/variables';
import { imageAddress, randomApi } from '../../shared/apis/server';
import { Heading4Light } from '../../shared/styledComponent/Typography';
import { setBackgroundColor } from '../../shared/styledComponent/functions';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const RightPanel = ({ width, event, className }) => {
  const rightPanelWrapper = useRef();

  const [percent, setpercent] = useState(false);
  const [vertical, setvertical] = useState(false);
  const [paymentLink, setpaymentLink] = useState('');
  const [rightPanelWidth, setrightPanelWidth] = useState();
  const [addBtnColor, setaddBtnColor] = useState('#3f5e48');
  const [imageUrl, setimageUrl] = useState(randomApi('artgroup'));
  const [remainingTime, setremainingTime] = useState('15\':00"');
  const [timerFillColor, settimerFillColor] = useState('#00ff00');

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
    <Div className={className} ref={rightPanelWrapper}>
      {/* main header */}
      <MainHeader>
        <Div
          className='icon'
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
        {event && (
          <>
            <Heading4Light>
              {new Date(event.startDate).toLocaleString('en-US', {
                time: 'short',
                day: 'numeric',
                month: 'short',
                weekday: 'short',
              })}
            </Heading4Light>
            <Heading4Light>
              {new Date(event.startDate).toLocaleTimeString()}
            </Heading4Light>
          </>
        )}
      </MainHeader>
      {/* panel body */}
      <Div column margin='0 2rem'>
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
            fontSize='1.5rem'
            letterSpacing='1px'
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
          <ReservePanelHeader onClick={() => setvertical(!vertical)}>
            {/* Icons */}
            <div class='svg-wrapper'>
              <DeleteIcon
                onClick={(e) => reserveDeleteClickHandler(e)}
                className='delete'
              />
              <AddAgainIcon
                addBtnColor={addBtnColor}
                onClick={(e) => addAgainClickHandler(e)}
              />

              {/* timer */}
              {reservedSeatsOfCurrentUser.length !== 0 && percent && (
                <>
                  <PieChart percent={percent} />
                  <Div
                    className='timer'
                    boxShadow
                    zIndex='3'
                    padding='5px'
                    bgcolor={timerFillColor}
                    borderRadius='1rem'
                    absPosition={{ x: 'top,.5rem', y: 'left,1.5rem' }}
                  >
                    <Heading4Light fontSize='1.5rem' color={Colors.white}>
                      {remainingTime}
                    </Heading4Light>
                  </Div>
                </>
              )}
            </div>
            <Heading4Light
              className='header-text'
              fontWeight='100'
              fontSize='1.3rem'
              textAlign='center'
              lineHeight='2rem'
              color={Colors.white}
            >
              {reservedSeatsOfCurrentUser.length === 0
                ? 'No Reserved Seats!'
                : `#${
                    reservedSeatsOfCurrentUser.length
                  } Seats, ${calculatePrices()}$`}
            </Heading4Light>
          </ReservePanelHeader>
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
            {reservedSeatsOfCurrentUser.map((ticket) => (
              <ReservedTicket
                key={ticket._id}
                code={ticket.code}
                price={ticket.price}
                width={rightPanelWidth}
              />
            ))}
          </Div>
        </Div>
      </Div>
    </Div>
  );
};

export default RightPanel;

const MainHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  width: 100%;
  height: 5rem;
  ${setBackgroundColor(`${Colors.primaryDark}c0`)}
  &:hover {
    ${setBackgroundColor(`${Colors.primaryDark}ff`)}
  }
  & .icon {
    width: 3rem;
    height: 3rem;
  }
`;

const ReservePanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 4rem;
  cursor: pointer;
  padding: 0 1rem;
  ${setBackgroundColor(`${Colors.primaryDark}c0`)}

  &:hover {
    ${setBackgroundColor(`${Colors.primaryDark}ff`)}
  }

  & .svg-wrapper {
    flex: 30%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    transition: all ease 0.5s;

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

    #icon-circle-with-plus {
      fill: ${(props) => props.fill};
      transform: translateY(2px);
    }

    & .delete {
      transform: translateY(2px);
    }

    #expiration {
      transform: scale(0.8);
      &:hover {
        transform: scale(1.1);
      }
    }

    & .timer {
      visibility: hidden;
      transition: all ease 0.5s;
    }

    #expiration:hover + .timer {
      visibility: visible;
    }
  }
  & .header-text {
    flex: 70%;
  }
`;
