import React from 'react';

import SeatV2 from './SeatV2';
import Div from '../../shared/styledComponent/Div';

const SeatsWrapper = ({ zone, unit, offsetX, offsetY }) => {
  const { columns, rows, startColumn, startRow } = zone.layout;
  const left = `${startColumn * unit + offsetX}px`;
  const top = `${startRow * unit + offsetY}px`;
  const width = `${columns * unit + 4}px`;
  const height = `${rows * unit + 4}px`;

  return (
    <Div
      width={width}
      padding='2px'
      height={height}
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
