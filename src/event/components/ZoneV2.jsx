import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SeatV2 from './SeatV2';
import Div from '../../shared/styledComponent/Div';
import { api, baseURL } from '../../shared/apis/server';
import { useSeats } from '../../shared/hooks/manageSeats-hook';

const SeatsWrapper = ({ zone, unit, offsetX, offsetY, date }) => {
  const { columns, rows, startColumn, startRow } = zone.layout;
  const left = `${startColumn * unit + offsetX}rem`;
  const top = `${startRow * unit + offsetY}rem`;
  const width = `${columns * unit + 0.4}rem`;
  const height = `${rows * unit + 0.4}rem`;

  const [isSending, setisSending] = useState(false);
  const [clicked, setclicked] = useState(false);
  const { setInitialCapacity } = useSeats();
  let { showId } = useParams();

  useEffect(() => {
    if (isSending) return;
    setisSending(true);
    const updateSeats = async () => {
      const res = await api.get(
        `${baseURL}/events?show=${showId}&startDate=${date}&fields=-show,-location,-__v,-createdAt,-startDate`
      );
      setclicked(false);
      setisSending(false);
      setInitialCapacity(res.data.data.data[0].capacity);
    };

    const timeoutId = setTimeout(updateSeats, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clicked]);
  console.log(unit, offsetX, offsetY, date);
  return (
    <Div
      width={width}
      padding='2px'
      height={height}
      onClick={() => setclicked(true)}
      background={{ color: 'rgb(55,55,55)' }}
      absPosition={{ x: `left,${left}`, y: `top,${top}` }}
    >
      <Div width='100%' height='100%' rowWrap>
        {zone.seats.map((seat, id) => (
          <SeatV2 unit={unit} seat={seat} key={id} />
        ))}
      </Div>
    </Div>
  );
};

export default SeatsWrapper;
