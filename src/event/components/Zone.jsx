import React, { useEffect, useState, useContext } from 'react';

import Seat from './Seat';
import Div from '../../shared/styledComponent/Div';
import { manageSeatsContext } from '../../shared/context/manage-seats-context';

const Zone = ({ zone, unit, offsetX, offsetY }) => {
  const { selectByZone, selectedZones, addZone, removeZone } =
    useContext(manageSeatsContext);
  const { columns, rows, startColumn, startRow } = zone.layout;
  const [selected, setselected] = useState(false);
  const color = selectByZone && selected ? 'rgb(55,200,55)' : 'rgb(55,55,55)';
  const left = `${startColumn * unit + offsetX}rem`;
  const top = `${startRow * unit + offsetY}rem`;
  const width = `${columns * unit + 0.4}rem`;
  const height = `${rows * unit + 0.4}rem`;

  // reset state if selection reset in outside
  useEffect(() => {
    if (!selectedZones) return;
    if (selectedZones.includes(zone._id)) {
      setselected(true);
    } else {
      setselected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZones]);

  // update internal state and context state by selecting each seat
  const onClickHandler = () => {
    if (!selectByZone) return;

    if (!selectedZones.includes(zone._id)) {
      setselected(true);
      addZone(zone._id);
    } else {
      setselected(false);
      removeZone(zone._id);
    }
  };
  return (
    <Div
      width={width}
      padding='2px'
      height={height}
      onClick={onClickHandler}
      background={{ color: color }}
      absPosition={{ x: `left,${left}`, y: `top,${top}` }}
    >
      <Div width='100%' height='100%' rowWrap>
        {zone.seats.map((seat, id) => (
          <Seat unit={unit} seat={seat} key={id} />
        ))}
      </Div>
    </Div>
  );
};

export default Zone;
