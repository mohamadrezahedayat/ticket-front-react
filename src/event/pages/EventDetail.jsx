import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { api, baseURL } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';

import Zone from '../components/Zone';

const EventDetail = () => {
  const { token } = useContext(AuthContext);
  const [event, setevent] = useState();

  const getEvent = useCallback(async () => {
    const response = await api.get(`${baseURL}/events`, {
      headers: { authentication: `Bearer ${token}` },
    });
    setevent(response.data.data.data[0]);
  }, [token]);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const { eventId } = useParams();
  return (
    <div>
      event detail: {eventId}
      <div className='zones-container'>
        {event &&
          event.capacity.map((cap) => (
            <Zone
              type={cap.type}
              key={cap.type}
              layout={cap.layout}
              seats={cap.seats}
            />
          ))}
      </div>
      <div className='zone-container'></div>
    </div>
  );
};

export default EventDetail;
