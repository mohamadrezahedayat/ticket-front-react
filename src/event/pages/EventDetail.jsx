import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ShowCover from '../components/ShowCover';
import ShowImages from '../components/ShowImages';
import LocationCover from '../components/LocationCover';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import { api, baseURL, imageAddress } from '../../shared/apis/server';
import Map from '../components/Map';
import Footer from '../../shared/styledComponent/Footer';

const EventDetail = () => {
  let { eventId } = useParams();
  const [events, setevents] = useState(false);
  const [show, setshow] = useState(false);
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
      {location && (
        <LocationCover
          dates={events.map((event) => event.startDate)}
          artistName={show.artGroup.name}
          images={location.images}
          locationName={location.name}
          startDate={events[0].startDate}
        />
      )}
      {location && <Map location={location.location.coordinates} />}
      <Footer />
    </EventDetailWrapper>
  );
};

const EventDetailWrapper = styled.div`
  display: grid;
  grid-template-rows: 80vh repeat(3, min-content);
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];
  row-gap: 8rem;
  overflow: hidden;
`;

export default EventDetail;
