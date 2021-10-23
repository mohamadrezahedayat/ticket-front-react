import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import {
  Span,
  Heading1,
  Heading3,
  Heading2,
  Heading4,
} from '../../shared/styledComponent/Typography';
import singer from '../../img/singer-rec.jpg';
import tickets from '../../img/tickets.jpg';
import {
  setColor,
  setAbsPos,
  setPadding,
  setBoxShadow,
  setGridColumn,
  setBackground,
  setWidthHeight,
} from '../../shared/styledComponent/functions';
import Div from '../../shared/styledComponent/Div';
import Button from '../../shared/styledComponent/Button';
import concertVideo from '../../img/concert_video_bg.mp4';
import { Colors } from '../../shared/styledComponent/variables';
import { Screen } from '../../shared/styledComponent/mediaQueries';
import { api, baseURL, imageAddress } from '../../shared/apis/server';

const Header = () => {
  const [diskImage, setdiskImage] = useState();
  const [eventDates, seteventDates] = useState([]);
  const [currentShow, setcurrentShow] = useState();
  const [freeCapacities, setfreeCapacities] = useState([]);

  useEffect(() => {
    const getLastShowEvent = async () => {
      const res = await api.get(`${baseURL}/events?fields=show&limit=1`);
      const showId = res.data.data.data[0].show.id;

      const { data } = await api.get(`${baseURL}/shows?_id=${showId}`);
      const show = data.data.data[0];
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
      return <Span> only {freeCapacities[index]} seats left.</Span>;
    return <Span color='red'>Sold out!</Span>;
  };

  return (
    <HeaderWrapper>
      <div className='header__card'>
        <video src={concertVideo} loop muted autoPlay />
        <Div
          className='header__disk'
          background={{ img: diskImage ? diskImage : singer }}
        />
        {currentShow && (
          <Div className='header__banner'>
            <Heading1 className='header__heading1'>
              {currentShow.artGroup.name}
            </Heading1>
            <Heading2 className='header__heading2'>
              live in
              <span>{currentShow.events[0].location.city}</span>
            </Heading2>
            <Heading3 className='header__heading3'>
              <ul>
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
            <Heading4 className='header__heading4'>
              "{currentShow.description}"
            </Heading4>
            <Heading3 className='header__heading3'>
              {currentShow.events[0].location.name}
            </Heading3>
            <Button className='header__btn'>
              <Link to={`/eventDetail/${currentShow._id}`}>More Detail</Link>
            </Button>
          </Div>
        )}
      </div>
    </HeaderWrapper>
  );
};
export default Header;

const HeaderWrapper = styled.div`
  ${setPadding('2rem')}
  ${setGridColumn('full-start / col-end 6')}
  ${setBackground({ img: tickets, color: Colors.secondary + '88' })}
  ${Screen.tabletLandscape`grid-column: full-start / full-end;padding:0;`}
  ${Screen.phone`grid-column: 1 / -1;`}

  .header__card {
    width: 100%;
    height: 100%;
    padding: 3rem;
    overflow: hidden;
    position: relative;
    border-radius: 5rem;

    ${Screen.tabletLandscape`border-radius: 0;`}

    & video {
      height: 100%;
      width: 100%;
      opacity: 0.8;
      object-fit: cover;
      ${setAbsPos({ x: 'top,0', y: 'left,0' })}
    }
  }

  .header__disk {
    z-index: 2;
    opacity: 75%;
    ${setBoxShadow()}
    border-radius: 50%;
    align-self: center;
    transform: translateY(-50%);
    ${setWidthHeight('35rem')}
    max-width:calc(100% - 4rem);
    background-attachment: initial;
    transition: transform 1s ease-in-out;
    ${setAbsPos({ x: 'top,50%', y: 'left,2rem' })}
    ${Screen.phone`
      top:2rem;
      left:50%;
      transform: translateX(-50%);
    `}
    &:hover {
      transform: translateY(-50%) rotate(360deg);
      ${Screen.phone`
      transform: translateX(-50%) rotate(360deg);
    `}
    }
  }

  .header__banner {
    display: flex;
    flex-direction: column;
    max-width: 50%;
    max-height: 100%;
    overflow-y: auto;
    padding: 2em;
    border-radius: 4em;
    background-color: ${Colors.white}7;
    ${setAbsPos({ x: 'right,2rem', y: 'top,50%' })}
    transform:translateY(-50%);
    transition: transform 1s ease-in-out;
    ${Screen.phone`
      right:50%;
      top:75%;
      min-width:60%;
      transform: translate(50%, -50%);
      max-width: unset;
      max-height: calc( 50% - 4em)
    `}
    & hover {
      z-index: 3;
    }

    & .header__btn {
      font-size: 2rem;
      letter-spacing: 2px;
      margin-top: 1em;
      padding: 0.5em;
      border-radius: 0.7em;
      ${Screen.tabletLandscape`font-size:1.8rem`}
      ${Screen.tabletPortrait`font-size:1.6rem`}
      ${Screen.phone`font-size:1.5rem`}
      ${Screen.bigDesktop`font-size:2.2rem`}
      & a {
        color: white;
        text-decoration: none;
      }
    }
  }

  .header__heading1 {
    font-size: 3.7rem;
    text-align: center;
    text-transform: uppercase;
    ${Screen.tabletLandscape`font-size:3.7rem`}
    ${Screen.tabletPortrait`font-size:3.5rem`}
    ${Screen.phone`font-size:2rem`}
    ${Screen.bigDesktop`font-size:4.5rem`}
    & span {
      ${Screen.tabletLandscape`font-size:3rem`}
      ${Screen.tabletPortrait`font-size:2.5rem`}
      ${Screen.phone`font-size:1.5rem`}
      ${Screen.bigDesktop`font-size:3rem`}
    }
  }

  .header__heading2 {
    font-size: 3rem;
    text-align: center;
    text-transform: capitalize;
    margin-bottom: 0.3em;
    ${Screen.tabletLandscape`font-size:3rem`}
    ${Screen.tabletPortrait`font-size:2.6rem`}
    ${Screen.phone`font-size:2rem`}
    ${Screen.bigDesktop`font-size:3.5rem`}
    & span {
      font-size: 3.7rem;
      padding-left: 0.2em;
      ${setColor(Colors.tertiaryDark)}
      ${Screen.tabletLandscape`font-size:3.5rem`}
      ${Screen.tabletPortrait`font-size:3.2rem`}
      ${Screen.phone`font-size:2.5rem`}
      ${Screen.bigDesktop`font-size:4rem`}
    }
  }

  .header__heading3 {
    text-align: center;
    margin-bottom: 0.3em;
    font-size: 2.2rem;
    letter-spacing: -1px;
    ${Screen.tabletLandscape`font-size:2.1rem`}
    ${Screen.tabletPortrait`font-size:1.9rem`}
    ${Screen.phone`font-size:1.4rem`}
    ${Screen.bigDesktop`font-size:2.2rem`}
    & ul {
      list-style: none;
      line-height: 1.3;
      padding-left: 1rem;
      text-decoration: none;
      color: ${Colors.secondary};
    }
    & span {
      text-transform: lowercase;
    }
  }

  .header__heading4 {
    text-align: center;
    ${setColor(Colors.tertiaryDark)}
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 0.4em;
    ${Screen.tabletLandscape`font-size:2rem`}
    ${Screen.tabletPortrait`font-size:1.8rem`}
    ${Screen.phone`font-size:1.4rem`}
    ${Screen.bigDesktop`font-size:2.3rem`}
  }
`;
