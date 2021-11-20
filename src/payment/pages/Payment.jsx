import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import Div from '../../shared/styledComponent/Div';
import { api } from '../../shared/apis/server';
import Button from '../../shared/styledComponent/Button';
import paymentPage from '../../img/payment_page_temp.png';
import { AuthContext } from '../../shared/context/auth-context';

const Payment = () => {
  let history = useHistory();
  const { eventId } = useParams();
  const { userId } = useContext(AuthContext);
  const [reservedSeats, setreservedSeats] = useState([]);

  const getCapacity = useCallback(async () => {
    const { data } = await api.get(`/events/${eventId}`);
    return data.data.data.capacity;
  }, [eventId]);

  const flattenCapacity = (capacity) => {
    let seats = [];
    const seatsCluster = capacity.map((zone) => zone.seats);
    seatsCluster.forEach((cluster) => {
      seats = [...seats, ...cluster];
    });
    return seats;
  };

  const filterSeats = (flatenedCapacity, userId) => {
    const now = new Date();
    const check = (seat) =>
      seat.status === 'reserved' &&
      seat.user === userId &&
      seat.reserveExpirationTime &&
      new Date(seat.reserveExpirationTime) > now;

    return flatenedCapacity.filter(check);
  };

  const getReservedSeats = useCallback(
    async (userId) => {
      const capacity = await getCapacity();
      const flatenedCapacity = flattenCapacity(capacity);
      const resSeats = filterSeats(flatenedCapacity, userId);

      setreservedSeats(resSeats);
    },
    [getCapacity]
  );

  // get reserved seats
  useEffect(() => {
    getReservedSeats(userId);
  }, [userId, getReservedSeats]);

  const completePaymentHandler = async () => {
    if (reservedSeats.length === 0) return;

    // update reservSseats before create booking
    await getReservedSeats(userId);
    const data = { eventId, userId, reservedSeats };

    await api.post(`/bookings`, data);

    history.push('/');
  };

  return (
    <div>
      <Div width='100vw' height='100vh'>
        <Div width='100%' height='100%' background={{ img: paymentPage }}></Div>
        <Button
          width='45%'
          padding='1.2rem'
          fontsize='2rem'
          transform='translateX(-50%)'
          absPosition={{ x: 'bottom,17%', y: 'left,50%' }}
          onClick={completePaymentHandler}
        >
          Confirm Payment
        </Button>
      </Div>
    </div>
  );
};

export default Payment;
