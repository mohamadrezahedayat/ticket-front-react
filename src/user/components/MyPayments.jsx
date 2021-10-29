import React, { useEffect, useContext, useState } from 'react';

import {
  api,
  baseURL,
  randomApi,
  imageAddress,
} from '../../shared/apis/server';
import { QRCode } from 'react-qrcode-logo';
import { Heading3 } from '../../shared/styledComponent/Typography';
import { SaveIcon, ViewIcon } from '../../shared/components/UIElements/Svgs';
import { AuthContext } from '../../shared/context/auth-context';
import Table from './Table';

const MyPayments = () => {
  const { token } = useContext(AuthContext);
  const [tickets, settickets] = useState([]);

  useEffect(() => {
    const getUserTickets = async () => {
      const { data } = await api.get(`${baseURL}/bookings/myTickets`, {
        headers: { authorization: `Bearer ${token}` },
      });
      settickets(data.data.data);
    };
    getUserTickets();
  }, [token]);

  const renderHeader = () => {
    let headerElement = [
      '#',
      'Show Name',
      'Event Date',
      'Purchase Date',
      'Seat Code',
      'Paid Amount',
      'Location Name',
      'Image',
      'QrCode',
      'Operation',
    ];

    return headerElement.map((key, index) => {
      return <th key={index}>{key}</th>;
    });
  };
  const downloadImage = (data, filename = 'ticket.jpeg') => {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  };

  const saveTicketHandler = (seatCode) => {
    const td = document.querySelector(`.${seatCode}`);
    const canvas = td.querySelector('canvas');
    const dataURL = canvas.toDataURL('image/jpeg', 1.0);
    downloadImage(dataURL, `ticket-${seatCode}.jpeg`);
  };

  const renderBody = () => {
    return (
      tickets &&
      tickets.map((ticket, i) => {
        const { event, createdAt, seatCode, paidAmount, currency, barcode } =
          ticket;
        const { show, location, startDate } = event;

        return (
          <tr key={i}>
            <td>{i}</td>
            <td>{show.name}</td>
            <td>{new Date(startDate).toDateString()}</td>
            <td>{new Date(createdAt).toDateString()}</td>
            <td>{seatCode}</td>
            <td>
              {paidAmount}
              {currency}
            </td>
            <td>{location.name}</td>
            <td>
              <img
                src={
                  show.images !== 0
                    ? `${imageAddress}/shows/${show.images[0]}`
                    : randomApi(event._id)
                }
                alt='show'
              />
            </td>
            <td className={seatCode}>
              <QRCode value={barcode} size='100' />
            </td>

            <td className='opration'>
              <ViewIcon className='edit__button' />
              <SaveIcon
                className='delete__button'
                onClick={() => saveTicketHandler(seatCode)}
              />
            </td>
          </tr>
        );
      })
    );
  };

  const renderTable = () => {
    return (
      <Table
        className='table'
        headers={renderHeader()}
        body={renderBody()}
      ></Table>
    );
  };

  return (
    <>
      <Heading3>My Payments</Heading3>
      {renderTable()}
    </>
  );
};

export default MyPayments;
