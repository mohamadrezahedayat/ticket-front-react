import React, { useEffect, useContext, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import Ticket from '../../event/components/Ticket';
import Div from '../../shared/styledComponent/Div';
import { api, baseURL } from '../../shared/apis/server';
import { H, Heading3 } from '../../shared/styledComponent/Typography';
import { AuthContext } from '../../shared/context/auth-context';
import { Colors } from '../../shared/styledComponent/variables';

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
            absPosition={{ x: 'top,50%', y: 'left,5%' }}
            transform='translateY(-50%)'
          >
            <QRCode
              value={ticket.barcode}
              size='100'
              quietZone='3'
              bgColor='rgba(255,255,255,.3)'
            />
          </Div>
          <Heading3
            as='h3'
            fontSize='2.5rem'
            fontWeight='100'
            color='white'
            textTransform='capitalize'
            absPosition={{ x: 'left,55%', y: 'top,20%' }}
          >
            {ticket.seatCode}
          </Heading3>
          <Heading3
            fontSize='2rem'
            fontWeight='100'
            color='white'
            absPosition={{ x: 'left,55%', y: 'top,40%' }}
          >
            {ticket.event.show.name.slice(0, 12)}
          </Heading3>
          <Heading3
            fontSize='2rem'
            fontWeight='100'
            color='white'
            absPosition={{ x: 'left,27%', y: 'top,40%' }}
          >
            {ticket.event.show.name.slice(0, 8)}
          </Heading3>
          <Heading3
            fontSize='1.5rem'
            fontWeight='100'
            color='silver'
            absPosition={{ x: 'left,55%', y: 'top,60%' }}
          >
            {ticket.event.location.name}
          </Heading3>
          <Heading3
            fontSize='1.5rem'
            fontWeight='100'
            color='silver'
            absPosition={{ x: 'left,55%', y: 'top,70%' }}
          >
            {new Date(ticket.event.startDate).toLocaleString()}
          </Heading3>
          <Heading3
            fontSize='2rem'
            color='white'
            textTransform='capitalize'
            absPosition={{ x: 'left,27%', y: 'top,60%' }}
          >
            {ticket.seatCode}
          </Heading3>
          <Div
            absPosition={{ x: 'top,35%', y: 'right,5%' }}
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
