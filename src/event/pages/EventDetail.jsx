import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { api, baseURL, imageAddress } from '../../shared/apis/server';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import ShowCover from '../components/ShowCover';
import ShowImages from '../components/ShowImages';

const EventDetail = () => {
  let { eventId } = useParams();
  const [event, setevent] = useState([]);

  const getEvent = useCallback(async () => {
    const res = await api.get(`${baseURL}/events/${eventId}`);
    setevent(res.data.data.data);
  }, [eventId]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  return (
    <EventDetailWrapper>
      <Sidebar />
      <ShowCover
        image={event.show && `${imageAddress}shows/${event.show.imageCover}`}
      />
      <ShowImages images={event.show && event.show.images}></ShowImages>
    </EventDetailWrapper>
  );
};

const EventDetailWrapper = styled.div`
  display: grid;
  grid-template-rows: 80vh repeat(5, min-content);
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];
`;

export default EventDetail;
