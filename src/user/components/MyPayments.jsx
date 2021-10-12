import React, { useEffect, useContext, useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import {
  api,
  baseURL,
  imageAddress,
  randomApi,
} from '../../shared/apis/server';
import { AuthContext } from '../../shared/context/auth-context';

const MyPayments = () => {
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
      return <th key={index}>{key.toUpperCase()}</th>;
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
              <button
                className='opration__button'
                // onClick={() => viewTicket(handler)}
              >
                View Ticket
              </button>
              <button
                className='opration__button'
                onClick={() => saveTicketHandler(seatCode)}
              >
                Save Qrcode
              </button>
            </td>
          </tr>
        );
      })
    );
  };

  const renderTable = () => {
    return (
      <table className='table'>
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    );
  };

  return (
    <div>
      <h3 className='heading-3'>My Payments</h3>
      {renderTable()}
    </div>
  );
};

export default MyPayments;
