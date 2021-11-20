import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import Date from '../components/Date';
import ShowCover from '../components/ShowCover';
import SeatSelection from '../components/SeatSelection';
import Footer from '../../shared/styledComponent/Footer';
import { useSeats } from '../../shared/hooks/manageSeats-hook';
import Sidebar from '../../shared/components/UIElements/Sidebar';
import { api, imageAddress } from '../../shared/apis/server';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const BookEvent = () => {
  const seatHook = useSeats();
  let { showId } = useParams();
  const [date, setdate] = useState();
  const [show, setshow] = useState(false);
  const [events, setevents] = useState(false);

  const getEvents = useCallback(async () => {
    const { data } = await api.get(`/events?show=${showId}`);
    setdate(data.data.data[0].startDate);
    setshow(data.data.data[0].show);
    setevents(data.data.data);
  }, [showId]);

  useEffect(() => {
    getEvents();
  }, [getEvents]);

  return (
    <BookEventWrapper>
      <Sidebar />
      <ShowCover image={show && `${imageAddress}/shows/${show.imageCover}`} />
      {events && (
        <Date
          enable
          className='dates'
          onDateSelect={(date) => setdate(date)}
          dates={events.map((event) => event.startDate)}
        />
      )}
      <manageSeatsContext.Provider value={seatHook}>
        {events && (
          <SeatSelection
            className='seat-selection'
            date={date}
            events={events}
          />
        )}
      </manageSeatsContext.Provider>
      <Footer />
    </BookEventWrapper>
  );
};

export default BookEvent;

const BookEventWrapper = styled.div`
  overflow: hidden;
  display: grid;
  grid-template-rows: 80vh repeat(3, min-content);
  grid-template-columns:
    [sidebar-start] 8rem [sidebar-end full-start] 1fr [center-start] repeat(
      8,
      [col-start] minmax(min-content, 14rem) [col-end]
    )
    [center-end] 1fr [full-end];
  & .dates {
    grid-row-start: 2;
    grid-column: center-start/center-end;
    transform: translateY(-50%);
  }
`;
