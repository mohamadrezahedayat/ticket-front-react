import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Span,
  Heading1,
  Heading3,
  Heading4Dark,
} from '../../shared/styledComponent/Typography';
import singer from '../../img/singer-rec.jpg';
import tickets from '../../img/tickets.jpg';
import {
  setAbsPos,
  setPadding,
  setBoxShadow,
  setGridColumn,
  setBackground,
  setWidthHeight,
  setBorderRadius,
} from '../../shared/styledComponent/functions';
import Div from '../../shared/styledComponent/Div';
import Button from '../../shared/styledComponent/Button';
import concertVideo from '../../img/concert_video_bg.mp4';
import { Colors } from '../../shared/styledComponent/variables';
import { api, baseURL, imageAddress } from '../../shared/apis/server';

const Header = ({ className }) => {
  const [diskImage, setdiskImage] = useState();
  const [eventDates, seteventDates] = useState([]);
  const [currentShow, setcurrentShow] = useState();
  const [freeCapacities, setfreeCapacities] = useState([]);

  useEffect(() => {
    const getLastShowEvent = async () => {
      const res = await api.get(`${baseURL}/shows?limit=1`);
      const show = res.data.data.data[0];
      setcurrentShow(show);
    };
    getLastShowEvent();
  }, []);

  useEffect(() => {
    if (!currentShow) return;
    setdiskImage(`${imageAddress}artists/${currentShow.artGroup.images[0]}`);

    const dates = currentShow.events.map((event) => event.startDate);
    seteventDates(dates);

    const { events } = currentShow;
    // const totalCapacities = events[0].location.totalCapacity;
    const capacities = events.map((event) => event.capacity);
    const freeCapacities = [];
    capacities.forEach((capacity) => {
      let free = 0;
      capacity.forEach((zone) => {
        const seats = zone.seats;
        seats.forEach((seat) => {
          if (seat.status !== 'sold') free++;
        });
      });
      freeCapacities.push(free);
    });

    setfreeCapacities(freeCapacities);
  }, [currentShow]);

  const renderFreeCapacity = (index) => {
    if (freeCapacities[index] !== 0)
      return (
        <Span fontSize='1.2rem'> only {freeCapacities[index]} seats left.</Span>
      );
    return (
      <Span fontSize='1.2rem' color='red'>
        Sold out!
      </Span>
    );
  };

  return (
    <div className={className}>
      <div className='header__card'>
        <video src={concertVideo} loop muted autoPlay />
        <Div
          className='header__disk'
          background={{ img: diskImage ? diskImage : singer }}
        />
        {/* Information Banner */}
        {currentShow && (
          <Div
            padding='2rem'
            width='50%'
            height='calc(100% - 4rem)'
            absPosition={{ x: 'right,2rem', y: 'top,2rem' }}
            borderRadius='4rem'
            bgcolor={`${Colors.white}7`}
            column
            zIndex__hover='3'
          >
            <Heading1 textAlign='center'>
              {currentShow.artGroup.name}
              <Span
                fontSize='3rem'
                SinglePadding='left,1rem'
                textTransform='capitalize'
              >
                lives in
              </Span>
              <Span
                fontSize='4rem'
                SinglePadding='left,1rem'
                textTransform='uppercase'
                color={Colors.tertiary}
              >
                istanbul
              </Span>
            </Heading1>
            <Heading3 margin='2rem 0'>
              <ul className='header__dates'>
                {eventDates.map((date, index) => (
                  <li key={index}>
                    {new Date(date).toLocaleDateString(undefined, {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}
                    {renderFreeCapacity(index)}
                  </li>
                ))}
              </ul>
            </Heading3>
            <Heading4Dark textAlign='center'>
              "{currentShow.description}"
            </Heading4Dark>
            <Heading3 textAlign='center'>
              {currentShow.events[0].location.name}
            </Heading3>
            <Button className='header__more'>
              <Link to={`/eventDetail/${currentShow._id}`}>
                More Information
              </Link>
            </Button>
          </Div>
        )}
      </div>
    </div>
  );
};

export default styled(Header)`
  ${setGridColumn('full-start / col-end 6')}
  ${setBackground({ img: tickets, color: Colors.secondary + '88' })}
  ${setPadding('4rem')}

  .header__card {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 5rem;
    padding: 2rem;

    & video {
      ${setAbsPos({ x: 'top,0', y: 'left,0' })}
      height: 100%;
      width: 100%;
      object-fit: cover;
      opacity: 0.8;
      ${setBorderRadius('5rem')}
    }
  }

  .header__disk {
    ${setAbsPos({ x: 'top,50%', y: 'left,2rem' })}
    transform: translateY(-50%);
    background-attachment: initial;
    opacity: 75%;
    border-radius: 50%;
    z-index: 2;
    ${setWidthHeight('35rem')}
    max-width:calc(100% - 4rem);
    align-self: center;
    ${setBoxShadow()}
    transition: transform 1s ease-in-out;

    &:hover {
      transform: translateY(-50%) rotate(360deg);
    }
  }

  .header__dates {
    color: ${Colors.secondary};
    padding-left: 1rem;
    line-height: 1.3;
    font-size: 2rem;
    text-decoration: none;
    list-style: none;
  }
  .header__more {
    margin-top: 2rem;
    padding: 1rem 3rem;
    font-size: 2rem;
    border-radius: 1.5rem;
    & a {
      text-decoration: none;
      color: white;
    }
  }
`;
