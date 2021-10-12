import React, { useEffect, useContext, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';
import Ticket from '../../event/components/Ticket';

import { api, baseURL } from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';
import Div from '../../shared/styledComponent/Div';
import { Colors } from '../../shared/styledComponent/functions';
import { H } from '../../shared/styledComponent/Typography';
const MyTickets = () => {
  const { token } = useContext(AuthContext);
  const [tickets, settickets] = useState([]);

  useEffect(() => {
    const getUserTickets = async () => {
      const data = await api.get(`${baseURL}/bookings/myTickets`, {
        headers: { authorization: `Bearer ${token}` },
      });
      settickets(data.data.data.data);
    };
    getUserTickets();
  }, [token]);

  return (
    <div>
      <h3 className='heading-3'>My Tickets</h3>
      {tickets.map((ticket) => (
        <Div>
          <Ticket />
          <Div
            absPosition={{ x: 'top,50%', y: 'left,8%' }}
            transform='translateY(-50%)'
          >
            <QRCode
              value={ticket.barcode}
              size='100'
              quietZone='3'
              bgColor='rgba(255,255,255,.3)'
            />
          </Div>
          <H
            as='h3'
            fontSize='2.5rem'
            fontWeight='100'
            color='white'
            textTransform='capitalize'
            letterSpacing='1px'
            absPosition={{ x: 'left,55%', y: 'top,20%' }}
          >
            {ticket.seatCode}
          </H>
          <H
            as='h3'
            fontSize='2.5rem'
            fontWeight='100'
            color='white'
            letterSpacing='1px'
            absPosition={{ x: 'left,55%', y: 'top,40%' }}
          >
            {ticket.event.show.name}
          </H>
          <H
            as='h3'
            fontSize='2.5rem'
            fontWeight='100'
            color='white'
            absPosition={{ x: 'left,28%', y: 'top,40%' }}
          >
            {ticket.event.show.name}
          </H>
          <H
            as='h3'
            fontSize='1.5rem'
            fontWeight='100'
            color='silver'
            absPosition={{ x: 'left,55%', y: 'top,60%' }}
          >
            {ticket.event.location.name}
          </H>
          <H
            as='h3'
            fontSize='1.5rem'
            fontWeight='100'
            color='silver'
            absPosition={{ x: 'left,55%', y: 'top,70%' }}
          >
            {new Date(ticket.event.startDate).toLocaleString()}
          </H>
          <H
            as='h3'
            fontSize='2rem'
            color='white'
            textTransform='capitalize'
            letterSpacing='2px'
            absPosition={{ x: 'left,28%', y: 'top,60%' }}
          >
            {ticket.seatCode}
          </H>
          <Div
            absPosition={{ x: 'top,40%', y: 'right,8%' }}
            transform='translateY(-50%)'
          >
            <QRCode
              value={ticket.barcode}
              size='70'
              quietZone='2'
              bgColor={`${Colors.primaryLight}1b`}
            />
          </Div>
        </Div>
      ))}
    </div>
  );
};

export default MyTickets;
