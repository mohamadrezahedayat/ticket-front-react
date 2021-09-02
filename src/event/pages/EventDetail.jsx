import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { api, baseURL, imageAddress } from '../../shared/apis/server';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import LocationImages from '../components/LocationImages';
import Footer from '../../shared/styledComponent/Footer';
import ShowImages from '../components/ShowImages';
import ShowCover from '../components/ShowCover';
import Banner from '../components/Banner';
import Date from '../components/Date';
import Map from '../components/Map';
import Button from '../../shared/styledComponent/Button';

const EventDetail = () => {
  let { eventId } = useParams();
  const [show, setshow] = useState(false);
  const [events, setevents] = useState(false);
  const [location, setlocation] = useState(false);

  const getEvent = useCallback(async () => {
    const res = await api.get(`${baseURL}/events?show=${eventId}`);
    setevents(res.data.data.data);
    setshow(res.data.data.data[0].show);
    setlocation(res.data.data.data[0].location);
  }, [eventId]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  return (
    <EventDetailWrapper>
      <Sidebar />
      <ShowCover image={show && `${imageAddress}shows/${show.imageCover}`} />
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
      {events && <Date dates={events.map((event) => event.startDate)} />}
      <Button
        className='buy'
        fontsize='3rem'
        borderRadius='2.5rem'
        padding='1.5rem 1.5rem'
      >
        Buy Ticket
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
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];
  & .buy {
    z-index: 20;
    grid-row-start: 6;
    grid-column: col-start 4 / span 2;
    align-self: end;
    transform: translateY(50%);
  }
`;

export default EventDetail;
