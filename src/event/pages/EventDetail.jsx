import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Map from '../components/Map';
import Date from '../components/Date';
import Banner from '../components/Banner';
import ShowCover from '../components/ShowCover';
import ShowImages from '../components/ShowImages';
import Footer from '../../shared/styledComponent/Footer';
import Button from '../../shared/styledComponent/Button';
import LocationImages from '../components/LocationImages';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import { api, baseURL, imageAddress } from '../../shared/apis/server';
import {
  Screen,
  setMediaQuery,
} from '../../shared/styledComponent/mediaQueries';

const EventDetail = () => {
  let { showId } = useParams();
  const [show, setshow] = useState(false);
  const [events, setevents] = useState(false);
  const [location, setlocation] = useState(false);

  const getEvents = useCallback(async () => {
    const { data } = await api.get(`${baseURL}/events?show=${showId}`);
    setevents(data.data.data);
    setshow(data.data.data[0].show);
    setlocation(data.data.data[0].location);
  }, [showId]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <EventDetailWrapper>
      <Sidebar />
      <ShowCover image={show && `${imageAddress}shows/${show.imageCover}`} />
      <Button className='buy1'>
        <Link className='link' to={`/bookEvent/${showId}`}>
          Buy Ticket
        </Link>
      </Button>
      {show && <ShowImages images={show && show.images}></ShowImages>}
      {location && <LocationImages images={location.images} />}

      {events && location && (
        <Banner
          startDate={events[0].startDate}
          artistName={show.artGroup.name}
          locationName={location.name}
        />
      )}

      {location && <Map location={location.location.coordinates} />}
      {events && (
        <Date
          className='date'
          dates={events.map((event) => event.startDate)}
          onDateSelect={() => {}}
        />
      )}
      <Button
        className='buy2'
        fontsize='3rem'
        borderRadius='2.5rem'
        padding='1.5rem 1.5rem'
      >
        <Link className='link' to={`/bookEvent/${showId}`}>
          Buy Ticket
        </Link>
      </Button>
      <Footer />
    </EventDetailWrapper>
  );
};

const EventDetailWrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 80vh min-content 8rem min-content 8rem repeat(
      4,
      min-content
    );
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] 12rem [col-end]
    )
    [center-end] 1fr [full-end];
  ${Screen.tabletPortrait`
    grid-template-columns:[sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] 
    repeat(8, [col-start] 8rem [col-end] ) [center-end] 1fr [full-end];
    `}
  ${Screen.phone`
    grid-template-columns:[sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] 
    repeat(8, [col-start] 4rem [col-end])[center-end] 1fr [full-end];
    `}
  & .buy1 {
    z-index: 20;
    grid-column: col-start 7 / col-end 8;
    transform: translateY(-50%);
    grid-row-start: 1;
    align-self: end;
    z-index: 30;
    font-size: 2rem;
    border-radius: 3rem;
    padding: 1rem 2rem;
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '65.38em' },
      'grid-column: col-start 6 / col-end 7;'
    )}
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '57.75em' },
      'grid-column: col-start 2 / col-end 3;'
    )}
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '30em' },
      'grid-column: col-start 2 / col-end 4; font-size:1.5rem;'
    )}
  }
  & .buy2 {
    z-index: 20;
    font-size: 2rem;
    grid-row-start: 6;
    grid-column: 6 / span 2;
    align-self: end;
    transform: translateY(50%);
    ${setMediaQuery(
      { isMinWidth: false, breakPoint: '43.75em' },
      'grid-column: 5 / span 4;'
    )}
  }
  & .date {
    grid-row-start: 5;
    grid-column: center-start/center-end;
    transform: translateY(-50%);
    align-self: start;

    justify-content: center;
  }
  & .link {
    color: white;
    text-decoration: none;
  }
`;

export default EventDetail;
